"use client";

import { useCallback, useMemo, useState } from "react";
import { FileWarning, UploadCloud, X } from "lucide-react";
import { useDropzone, type FileRejection } from "react-dropzone";
import {
  autoLinkRequiredDocumentByFileName,
  createStudentDocumentRecord,
} from "@/actions/documents";
import { useToast } from "@/components/common/feedback/ToastProvider";
import { STORAGE_BUCKETS } from "@/lib/constants";
import { buildStudentDocumentStoragePath, inferDocumentType } from "@/lib/documents/paths";
import type { SelectedDocumentReference } from "@/lib/documents/types";
import { createClient as createSupabaseBrowserClient } from "@/lib/supabase/client";
import { cn } from "@/lib/utils";

type StudentDocumentUploadZoneProps = {
  onCancel: () => void;
  onUploadComplete?: (documents: SelectedDocumentReference[]) => void;
  showCancel?: boolean;
  submitLabel?: string;
};

const MAX_FILE_SIZE_BYTES = 10 * 1024 * 1024;

function formatFileSize(bytes: number) {
  if (bytes >= 1024 * 1024) {
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  }

  return `${Math.max(1, Math.round(bytes / 1024))} KB`;
}

function getFileExtension(fileName: string) {
  const parts = fileName.split(".");
  return parts.length > 1 ? parts.at(-1)?.toUpperCase() ?? "FILE" : "FILE";
}

function getRejectionMessage(rejection: FileRejection) {
  const firstError = rejection.errors[0];

  if (!firstError) {
    return "This file could not be added.";
  }

  if (firstError.code === "file-too-large") {
    return `${rejection.file.name} is larger than 10 MB.`;
  }

  if (firstError.code === "file-invalid-type") {
    return `${rejection.file.name} is not a supported file type.`;
  }

  return `${rejection.file.name}: ${firstError.message}`;
}

export default function StudentDocumentUploadZone({
  onCancel,
  onUploadComplete,
  showCancel = true,
  submitLabel = "Upload Files",
}: StudentDocumentUploadZoneProps) {
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [rejectedFiles, setRejectedFiles] = useState<FileRejection[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  const { showToast } = useToast();

  const onDrop = useCallback(
    (acceptedFiles: File[], fileRejections: FileRejection[]) => {
      setSelectedFiles((currentFiles) => {
        const existingKeys = new Set(
          currentFiles.map((file) => `${file.name}-${file.size}-${file.lastModified}`),
        );

        const uniqueNewFiles = acceptedFiles.filter((file) => {
          const key = `${file.name}-${file.size}-${file.lastModified}`;
          return !existingKeys.has(key);
        });

        const nextFiles = [...currentFiles, ...uniqueNewFiles];
        return nextFiles;
      });

      setRejectedFiles(fileRejections);

      if (fileRejections.length) {
        const firstMessage = getRejectionMessage(fileRejections[0]);
        showToast({
          variant: "error",
          title: "Some files were not added",
          description: firstMessage,
        });
      }
    },
    [showToast],
  );

  const {
    getRootProps,
    getInputProps,
    isDragActive,
    isDragReject,
    open,
  } = useDropzone({
    onDrop,
    multiple: true,
    noClick: true,
    maxSize: MAX_FILE_SIZE_BYTES,
    accept: {
      "application/pdf": [".pdf"],
      "image/jpeg": [".jpg", ".jpeg"],
      "image/png": [".png"],
      "application/msword": [".doc"],
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document": [".docx"],
    },
  });

  const rejectionMessages = useMemo(
    () => rejectedFiles.map((rejection) => getRejectionMessage(rejection)),
    [rejectedFiles],
  );

  function handleRemoveFile(fileToRemove: File) {
    setSelectedFiles((currentFiles) => {
      return currentFiles.filter(
        (file) =>
          !(
            file.name === fileToRemove.name &&
            file.size === fileToRemove.size &&
            file.lastModified === fileToRemove.lastModified
          ),
      );
    });
  }

  async function handleUploadFiles() {
    if (!selectedFiles.length || isUploading) {
      return;
    }

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

    const successfulUploads: SelectedDocumentReference[] = [];
    const failedUploads: string[] = [];
    let autoLinkedCount = 0;
    const failedFileKeys = new Set<string>();

    for (const file of selectedFiles) {
      const fileKey = `${file.name}-${file.size}-${file.lastModified}`;
      const documentId = crypto.randomUUID();
      const storagePath = buildStudentDocumentStoragePath(user.id, documentId, file.name);

      const { error: uploadError } = await supabase.storage
        .from(STORAGE_BUCKETS.DOCUMENTS)
        .upload(storagePath, file, { upsert: false });

      if (uploadError) {
        failedUploads.push(`${file.name}: ${uploadError.message}`);
        failedFileKeys.add(fileKey);
        continue;
      }

      const documentResult = await createStudentDocumentRecord({
        id: documentId,
        name: file.name,
        type: inferDocumentType(file.name, file.type),
        bucket: STORAGE_BUCKETS.DOCUMENTS,
        storagePath,
        mimeType: file.type || null,
        sizeBytes: file.size,
        source: "VAULT_UPLOAD",
        status: "PENDING",
      });

      if (!documentResult.success || !documentResult.data) {
        failedUploads.push(
          documentResult.error ?? `${file.name}: Failed to save the uploaded document.`,
        );
        failedFileKeys.add(fileKey);

        await supabase.storage.from(STORAGE_BUCKETS.DOCUMENTS).remove([storagePath]);
        continue;
      }

      const autoLinkResult = await autoLinkRequiredDocumentByFileName(
        file.name,
        documentResult.data.id,
      );

      if (autoLinkResult.success && autoLinkResult.data?.contextKey) {
        autoLinkedCount += 1;
      }

      successfulUploads.push(documentResult.data);
    }

    setIsUploading(false);

    if (failedUploads.length) {
      showToast({
        variant: "error",
        title: "Upload failed for some files",
        description: failedUploads[0],
      });
    }

    if (successfulUploads.length) {
      showToast({
        variant: "success",
        title: `${successfulUploads.length} ${successfulUploads.length === 1 ? "file" : "files"} uploaded`,
        description:
          autoLinkedCount > 0
            ? `${autoLinkedCount} ${autoLinkedCount === 1 ? "file was" : "files were"} auto-linked.`
            : "Files were added to your vault.",
      });
    }

    if (failedUploads.length) {
      setSelectedFiles((currentFiles) =>
        currentFiles.filter((file) =>
          failedFileKeys.has(`${file.name}-${file.size}-${file.lastModified}`),
        ),
      );
    } else if (successfulUploads.length) {
      setSelectedFiles([]);
      setRejectedFiles([]);
      onUploadComplete?.(successfulUploads);
    }
  }

  return (
    <section className="space-y-5">
      <div
        {...getRootProps()}
        className={cn(
          "rounded-[1.75rem] border border-dashed px-6 py-8 text-center transition",
          isDragReject
            ? "border-red-300 bg-red-50"
            : isDragActive
              ? "border-primary bg-primary/5"
              : "border-slate-300 bg-slate-50",
        )}
      >
        <input {...getInputProps()} />
        <div className="mx-auto flex max-w-xl flex-col items-center">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/5 text-primary ring-1 ring-primary/10">
            <UploadCloud className="h-6 w-6" aria-hidden="true" />
          </div>

          <h2 className="mt-5 font-poppins text-xl font-semibold text-slate-900 sm:text-2xl">
            {isDragActive
              ? "Drop your files here"
              : "Drop files here or browse from your device"}
          </h2>
          <p className="mt-2 max-w-lg font-inter text-sm leading-relaxed text-slate-500">
            Add one or more files to your vault for review and tracking. PDF, JPG, PNG, and DOCX are supported.
          </p>
          <p className="mt-2 font-inter text-sm text-slate-400">
            Use clear file names like <span className="font-medium text-slate-500">passport.pdf</span> or <span className="font-medium text-slate-500">sop.docx</span> for easier matching later.
          </p>

          <button
            type="button"
            onClick={open}
            disabled={isUploading}
            className="mt-6 inline-flex items-center justify-center rounded-2xl bg-primary px-5 py-2.5 font-inter text-sm font-semibold text-white transition hover:bg-primary/90"
          >
            Add Files
          </button>
        </div>
      </div>

      {selectedFiles.length ? (
        <div className="space-y-3 rounded-[1.5rem] border border-slate-200 bg-white p-4 shadow-sm">
          <div className="flex items-center justify-between gap-3">
            <p className="font-poppins text-lg font-semibold text-slate-900">
              Selected Files
            </p>
            <p className="font-inter text-sm text-slate-400">
              {selectedFiles.length} {selectedFiles.length === 1 ? "file" : "files"}
            </p>
          </div>

          <div className="space-y-3">
            {selectedFiles.map((file) => (
              <div
                key={`${file.name}-${file.size}-${file.lastModified}`}
                className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3"
              >
                <div className="min-w-0 flex-1">
                  <p className="truncate font-inter text-sm font-semibold text-slate-800">
                    {file.name}
                  </p>
                  <p className="mt-1 font-inter text-xs text-slate-500">
                    {getFileExtension(file.name)} • {formatFileSize(file.size)}
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => handleRemoveFile(file)}
                  className="inline-flex h-9 w-9 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-500 transition hover:border-slate-300 hover:text-slate-900"
                  aria-label={`Remove ${file.name}`}
                >
                  <X className="h-4 w-4" aria-hidden="true" />
                </button>
              </div>
            ))}
          </div>
        </div>
      ) : null}

      {rejectionMessages.length ? (
        <div className="space-y-3 rounded-[1.5rem] border border-red-200 bg-red-50 p-4">
          <div className="flex items-center gap-2 text-red-700">
            <FileWarning className="h-4 w-4" aria-hidden="true" />
            <p className="font-inter text-sm font-semibold">Some files were not added</p>
          </div>

          <div className="space-y-2">
            {rejectionMessages.map((message) => (
              <p key={message} className="font-inter text-sm leading-relaxed text-red-700">
                {message}
              </p>
            ))}
          </div>
        </div>
      ) : null}

      <div className="flex items-center justify-end gap-3">
        {showCancel ? (
          <button
            type="button"
            onClick={onCancel}
            disabled={isUploading}
            className="inline-flex items-center justify-center rounded-2xl border border-slate-200 bg-white px-4 py-2.5 font-inter text-sm font-semibold text-slate-600 transition hover:border-slate-300 hover:text-slate-900"
          >
            Cancel
          </button>
        ) : null}
        <button
          type="button"
          onClick={handleUploadFiles}
          disabled={!selectedFiles.length || isUploading}
          className="inline-flex items-center justify-center rounded-2xl bg-primary px-5 py-2.5 font-inter text-sm font-semibold text-white transition hover:bg-primary/90 disabled:cursor-not-allowed disabled:bg-slate-300"
        >
          {isUploading ? "Uploading..." : submitLabel}
        </button>
      </div>
    </section>
  );
}
