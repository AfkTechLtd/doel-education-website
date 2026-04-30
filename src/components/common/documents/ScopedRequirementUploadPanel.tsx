"use client";

import { useCallback, useMemo, useState } from "react";
import { UploadCloud, X } from "lucide-react";
import { useDropzone, type FileRejection } from "react-dropzone";
import { createStudentDocumentRecord } from "@/actions/documents";
import { useToast } from "@/components/common/feedback/ToastProvider";
import { STORAGE_BUCKETS } from "@/lib/constants";
import { buildStudentDocumentStoragePath, inferDocumentType } from "@/lib/documents/paths";
import type { DocumentUploadConfig, SelectedDocumentReference } from "@/lib/documents/types";
import { createClient as createSupabaseBrowserClient } from "@/lib/supabase/client";
import { cn } from "@/lib/utils";

type ScopedRequirementUploadPanelProps = {
  requirementId: string;
  onSelect: (document: SelectedDocumentReference) => void;
  uploadConfig?: DocumentUploadConfig;
};

const DEFAULT_MAX_FILE_SIZE_BYTES = 10 * 1024 * 1024;
const DEFAULT_ACCEPT = {
  "application/pdf": [".pdf"],
  "image/jpeg": [".jpg", ".jpeg"],
  "image/png": [".png"],
  "application/msword": [".doc"],
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document": [".docx"],
};

function formatFileSize(bytes: number) {
  if (bytes >= 1024 * 1024) {
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  }

  return `${Math.max(1, Math.round(bytes / 1024))} KB`;
}

function getRejectionMessage(rejection: FileRejection, maxBytes: number) {
  const firstError = rejection.errors[0];
  if (!firstError) return "This file could not be added.";
  if (firstError.code === "file-too-large") {
    return `${rejection.file.name} is larger than ${formatFileSize(maxBytes)}.`;
  }
  if (firstError.code === "file-invalid-type") {
    return `${rejection.file.name} is not a supported file type.`;
  }
  return `${rejection.file.name}: ${firstError.message}`;
}

export default function ScopedRequirementUploadPanel({
  requirementId,
  onSelect,
  uploadConfig,
}: ScopedRequirementUploadPanelProps) {
  const [file, setFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [rejections, setRejections] = useState<FileRejection[]>([]);
  const { showToast } = useToast();

  const maxFileSizeBytes = uploadConfig?.maxFileSizeBytes ?? DEFAULT_MAX_FILE_SIZE_BYTES;
  const accept = uploadConfig?.accept ?? DEFAULT_ACCEPT;

  const onDrop = useCallback((acceptedFiles: File[], fileRejections: FileRejection[]) => {
    setRejections(fileRejections);
    if (acceptedFiles.length > 0) {
      setFile(acceptedFiles[acceptedFiles.length - 1]);
    }
    if (fileRejections.length > 0) {
      showToast({
        variant: "error",
        title: "File not added",
        description: getRejectionMessage(fileRejections[0], maxFileSizeBytes),
      });
    }
  }, [maxFileSizeBytes, showToast]);

  const { getRootProps, getInputProps, isDragActive, isDragReject, open } = useDropzone({
    onDrop,
    multiple: false,
    noClick: true,
    maxFiles: 1,
    maxSize: maxFileSizeBytes,
    accept,
  });

  const rejectionMessages = useMemo(() => {
    return rejections.map((rejection) => getRejectionMessage(rejection, maxFileSizeBytes));
  }, [maxFileSizeBytes, rejections]);

  async function handleUpload() {
    if (!file || isUploading) return;

    setIsUploading(true);
    const supabase = createSupabaseBrowserClient();
    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser();

    if (userError || !user) {
      showToast({
        variant: "error",
        title: "Upload failed",
        description: "You must be signed in to upload documents.",
      });
      setIsUploading(false);
      return;
    }

    const documentId = crypto.randomUUID();
    const storagePath = buildStudentDocumentStoragePath(user.id, documentId, file.name);

    const { error: uploadError } = await supabase.storage
      .from(STORAGE_BUCKETS.DOCUMENTS)
      .upload(storagePath, file, { upsert: false });

    if (uploadError) {
      showToast({
        variant: "error",
        title: "Upload failed",
        description: uploadError.message,
      });
      setIsUploading(false);
      return;
    }

    const result = await createStudentDocumentRecord({
      id: documentId,
      requirementId,
      name: file.name,
      type: inferDocumentType(file.name, file.type),
      bucket: STORAGE_BUCKETS.DOCUMENTS,
      storagePath,
      mimeType: file.type || null,
      sizeBytes: file.size,
      source: "VAULT_UPLOAD",
    });

    setIsUploading(false);

    if (!result.success || !result.data) {
      await supabase.storage.from(STORAGE_BUCKETS.DOCUMENTS).remove([storagePath]);
      showToast({
        variant: "error",
        title: "Upload failed",
        description: result.error ?? "Failed to save the uploaded document.",
      });
      return;
    }

    showToast({ variant: "success", title: "Document replaced" });
    onSelect(result.data);
  }

  return (
    <div className="space-y-5">
      <div
        {...getRootProps()}
        className={cn(
          "rounded-[1.5rem] border border-dashed px-6 py-7 text-center transition",
          isDragReject
            ? "border-red-300 bg-red-50"
            : isDragActive
              ? "border-primary bg-primary/5"
              : "border-slate-300 bg-slate-50",
        )}
      >
        <input {...getInputProps()} />
        <div className="mx-auto flex max-w-xl flex-col items-center">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/5 text-primary ring-1 ring-primary/10">
            <UploadCloud className="h-5 w-5" aria-hidden="true" />
          </div>
          <p className="mt-4 font-poppins text-xl font-semibold text-slate-900">
            {isDragActive ? "Drop your file here" : "Upload replacement file"}
          </p>
          <p className="mt-2 font-inter text-sm text-slate-500">
            This will replace the currently linked document for this requirement.
          </p>
          <button
            type="button"
            onClick={open}
            disabled={isUploading}
            className="mt-5 inline-flex items-center justify-center rounded-2xl bg-primary px-5 py-2.5 font-inter text-sm font-semibold text-white transition hover:bg-primary/90"
          >
            Choose File
          </button>
        </div>
      </div>

      {file ? (
        <div className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3">
          <div className="flex items-center justify-between gap-3">
            <div className="min-w-0">
              <p className="truncate font-inter text-sm font-semibold text-slate-800">{file.name}</p>
              <p className="mt-1 font-inter text-xs text-slate-500">{formatFileSize(file.size)}</p>
            </div>
            <button
              type="button"
              onClick={() => setFile(null)}
              className="inline-flex h-9 w-9 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-500 transition hover:border-slate-300 hover:text-slate-900"
              aria-label={`Remove ${file.name}`}
            >
              <X className="h-4 w-4" aria-hidden="true" />
            </button>
          </div>
        </div>
      ) : null}

      {rejectionMessages.length > 0 ? (
        <div className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3">
          <p className="font-inter text-sm text-red-700">{rejectionMessages[0]}</p>
        </div>
      ) : null}

      <div className="flex justify-end">
        <button
          type="button"
          onClick={handleUpload}
          disabled={!file || isUploading}
          className="inline-flex items-center justify-center rounded-2xl bg-primary px-5 py-2.5 font-inter text-sm font-semibold text-white transition hover:bg-primary/90 disabled:cursor-not-allowed disabled:bg-slate-300"
        >
          {isUploading ? "Uploading..." : "Upload New"}
        </button>
      </div>
    </div>
  );
}
