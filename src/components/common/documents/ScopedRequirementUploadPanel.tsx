"use client";

import { useCallback, useMemo, useState } from "react";
import { UploadCloud, X } from "lucide-react";
import { useDropzone, type FileRejection } from "react-dropzone";
import { performDocumentUploads } from "@/lib/documents/client-upload";
import { useToast } from "@/components/common/feedback/ToastProvider";
import {
  DEFAULT_MAX_FILE_SIZE_BYTES,
  DEFAULT_ACCEPT,
  getFileKey,
  getUploadRejectionMessage,
  formatFileSize,
} from "@/lib/documents/upload-helpers";
import type { DocumentUploadConfig, SelectedDocumentReference } from "@/lib/documents/types";
import { cn } from "@/lib/utils";

type ScopedRequirementUploadPanelProps = {
  requirementId: string;
  onSelect: (document: SelectedDocumentReference) => void;
  uploadConfig?: DocumentUploadConfig;
};

/**
 * Single-file replacement uploader for a specific requirement.
 *
 * When a student uses "Change Document" the requirement is fixed; only one
 * file is accepted and it is automatically linked to that requirement.
 */
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

  const onDrop = useCallback(
    (acceptedFiles: File[], fileRejections: FileRejection[]) => {
      setRejections(fileRejections);
      if (acceptedFiles.length > 0) {
        setFile(acceptedFiles[acceptedFiles.length - 1]);
      }
      if (fileRejections.length > 0) {
        showToast({
          variant: "error",
          title: "File not added",
          description: getUploadRejectionMessage(
            { file: fileRejections[0].file, errors: fileRejections[0].errors },
            maxFileSizeBytes,
          ),
        });
      }
    },
    [maxFileSizeBytes, showToast],
  );

  const { getRootProps, getInputProps, isDragActive, isDragReject, open } = useDropzone({
    onDrop,
    multiple: false,
    noClick: true,
    maxFiles: 1,
    maxSize: maxFileSizeBytes,
    accept,
  });

  const rejectionMessages = useMemo(
    () =>
      rejections.map((r) =>
        getUploadRejectionMessage({ file: r.file, errors: r.errors }, maxFileSizeBytes),
      ),
    [maxFileSizeBytes, rejections],
  );

  async function handleUpload() {
    if (!file || isUploading) return;

    setIsUploading(true);

    const fileKey = getFileKey(file);
    const { successfulUploads, authError } = await performDocumentUploads({
      files: [file],
      fileRequirementMap: { [fileKey]: requirementId },
      isRequirementScopedUpload: true,
      targetRequirementId: requirementId,
    });

    setIsUploading(false);

    if (authError) {
      showToast({ variant: "error", title: "Upload failed", description: authError });
      return;
    }

    if (!successfulUploads.length) {
      showToast({
        variant: "error",
        title: "Upload failed",
        description: "Failed to save the uploaded document.",
      });
      return;
    }

    showToast({ variant: "success", title: "Document replaced" });
    onSelect(successfulUploads[0]);
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
