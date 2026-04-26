"use client";

import { useState } from "react";
import { FileImage, FileText, Trash2, Download, Loader2 } from "lucide-react";
import DashboardStatusBadge from "@/components/dashboard/shared/DashboardStatusBadge";
import { getStudentDocumentSignedUrl } from "@/actions/documents";
import { useToast } from "@/components/common/feedback/ToastProvider";
import type { VaultDocumentListItem } from "@/lib/documents/types";

type StudentDocumentCardProps = {
  document: VaultDocumentListItem;
  onDeleteRequest: (document: { id: string; name: string }) => void;
  isDeleting: boolean;
};

function formatDate(value: string | null) {
  if (!value) {
    return "Date unavailable";
  }

  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(new Date(value));
}

function formatSize(value: number | null) {
  if (!value) {
    return null;
  }

  if (value >= 1024 * 1024) {
    return `${(value / (1024 * 1024)).toFixed(1)} MB`;
  }

  return `${Math.round(value / 1024)} KB`;
}

export default function StudentDocumentCard({
  document,
  onDeleteRequest,
  isDeleting,
}: StudentDocumentCardProps) {
  const isImage = document.mimeType?.startsWith("image/");
  const sizeLabel = formatSize(document.sizeBytes);
  const { showToast } = useToast();
  const [isDownloading, setIsDownloading] = useState(false);

  async function handleDownload() {
    if (isDownloading) return;
    setIsDownloading(true);

    const result = await getStudentDocumentSignedUrl(document.id);

    if (!result.success || !result.data) {
      showToast({
        variant: "error",
        title: "Download failed",
        description: result.error ?? "Could not generate download link.",
      });
      setIsDownloading(false);
      return;
    }

    // Trigger download via hidden anchor
    const link = window.document.createElement("a");
    link.href = result.data.signedUrl;
    link.download = document.name;
    link.target = "_blank";
    link.rel = "noreferrer";
    window.document.body.appendChild(link);
    link.click();
    window.document.body.removeChild(link);

    setIsDownloading(false);
  }

  return (
    <article className="rounded-[1.6rem] border border-slate-200 bg-white p-5 shadow-sm transition hover:border-slate-300 hover:shadow-md">
      <div className="flex flex-col gap-5 sm:flex-row sm:items-start">
        <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-slate-50 text-slate-500 ring-1 ring-slate-200">
          {isImage ? <FileImage className="h-6 w-6" aria-hidden="true" /> : <FileText className="h-6 w-6" aria-hidden="true" />}
        </div>

        <div className="min-w-0 flex-1 space-y-3">
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div className="min-w-0">
              <h3 className="truncate font-poppins text-lg font-semibold text-slate-900">
                {document.name}
              </h3>
              <p className="mt-1 font-inter text-sm text-slate-500">{document.type}</p>
            </div>

            <div className="flex items-center gap-2">
              <DashboardStatusBadge status={document.status.replaceAll("_", " ")} />
              <button
                type="button"
                onClick={handleDownload}
                disabled={isDownloading || isDeleting}
                className="inline-flex h-9 w-9 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-500 transition hover:border-primary/30 hover:text-primary disabled:cursor-not-allowed disabled:opacity-60"
                aria-label={`Download ${document.name}`}
              >
                {isDownloading ? (
                  <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
                ) : (
                  <Download className="h-4 w-4" aria-hidden="true" />
                )}
              </button>
              <button
                type="button"
                onClick={() => onDeleteRequest({ id: document.id, name: document.name })}
                disabled={isDeleting}
                className="inline-flex h-9 w-9 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-500 transition hover:border-red-200 hover:text-red-600 disabled:cursor-not-allowed disabled:opacity-60"
                aria-label={`Delete ${document.name}`}
              >
                <Trash2 className="h-4 w-4" aria-hidden="true" />
              </button>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-x-5 gap-y-2 font-inter text-sm text-slate-500">
            <span>Uploaded {formatDate(document.uploadedAt)}</span>
            {sizeLabel ? <span>{sizeLabel}</span> : null}
            <span>{document.matchState === "MATCHED" ? document.matchedLabel : "Unassigned in vault"}</span>
          </div>

          {document.notes ? (
            <p className="rounded-2xl bg-slate-50 px-4 py-3 font-inter text-sm leading-relaxed text-slate-500 ring-1 ring-slate-200">
              {document.notes}
            </p>
          ) : null}
        </div>
      </div>
    </article>
  );
}
