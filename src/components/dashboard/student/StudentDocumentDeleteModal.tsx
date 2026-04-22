"use client";

import { X } from "lucide-react";
import type { DocumentLinkUsage } from "@/lib/documents/types";

type StudentDocumentDeleteModalProps = {
  open: boolean;
  documentName: string;
  usage: DocumentLinkUsage | null;
  isLoadingUsage: boolean;
  isSubmitting: boolean;
  onClose: () => void;
  onDelete: () => void;
  onHardDelete: () => void;
};

function formatUsageLabel(contextKey: string) {
  return contextKey.replaceAll("-", " ").replaceAll("_", " ");
}

export default function StudentDocumentDeleteModal({
  open,
  documentName,
  usage,
  isLoadingUsage,
  isSubmitting,
  onClose,
  onDelete,
  onHardDelete,
}: StudentDocumentDeleteModalProps) {
  if (!open) {
    return null;
  }

  const isLinked = (usage?.total ?? 0) > 0;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/35 px-4 py-6">
      <button
        type="button"
        className="absolute inset-0 cursor-default"
        aria-label="Close delete modal"
        onClick={onClose}
      />

      <div className="relative z-10 w-full max-w-lg rounded-[1.75rem] border border-slate-200 bg-white p-6 shadow-2xl sm:p-7">
        <div className="mb-5 flex items-start justify-between gap-4 border-b border-slate-200 pb-5">
          <div>
            <h2 className="font-poppins text-2xl font-semibold text-slate-900">Delete document?</h2>
            <p className="mt-2 font-inter text-sm leading-relaxed text-slate-500">{documentName}</p>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="inline-flex h-10 w-10 items-center justify-center rounded-2xl border border-slate-200 bg-white text-slate-500 transition hover:border-slate-300 hover:text-slate-900"
            aria-label="Close delete modal"
          >
            <X className="h-4 w-4" aria-hidden="true" />
          </button>
        </div>

        {isLoadingUsage ? (
          <div className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 font-inter text-sm text-slate-500">
            Checking document usage...
          </div>
        ) : isLinked ? (
          <div className="space-y-3 rounded-2xl border border-amber-200 bg-amber-50 px-4 py-3">
            <p className="font-inter text-sm font-semibold text-amber-800">
              This document is already linked in your application.
            </p>
            <p className="font-inter text-sm text-amber-700">
              Use Unlink and Delete to remove all links and permanently delete this file from your vault.
            </p>
            {usage?.items.length ? (
              <div className="space-y-2">
                {usage.items.slice(0, 3).map((item) => (
                  <p key={`${item.contextType}:${item.contextKey}`} className="font-inter text-sm text-amber-700">
                    {item.contextType === "REQUIRED_DOCUMENT"
                      ? `Required Document: ${formatUsageLabel(item.contextKey)}`
                      : `Application Field: ${formatUsageLabel(item.contextKey)}`}
                  </p>
                ))}
              </div>
            ) : null}
          </div>
        ) : (
          <div className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 font-inter text-sm text-slate-600">
            This will permanently delete the file from your vault.
          </div>
        )}

        <div className="mt-6 flex flex-wrap items-center justify-end gap-3">
          <button
            type="button"
            onClick={onClose}
            disabled={isSubmitting}
            className="inline-flex items-center justify-center rounded-2xl border border-slate-200 bg-white px-4 py-2.5 font-inter text-sm font-semibold text-slate-700 transition hover:border-slate-300 hover:text-slate-900 disabled:cursor-not-allowed disabled:opacity-60"
          >
            Cancel
          </button>

          {isLinked ? (
            <button
              type="button"
              onClick={onHardDelete}
              disabled={isSubmitting || isLoadingUsage}
              className="inline-flex items-center justify-center rounded-2xl bg-red-600 px-4 py-2.5 font-inter text-sm font-semibold text-white transition hover:bg-red-700 disabled:cursor-not-allowed disabled:bg-slate-300"
            >
              {isSubmitting ? "Deleting..." : "Unlink and Delete"}
            </button>
          ) : (
            <button
              type="button"
              onClick={onDelete}
              disabled={isSubmitting || isLoadingUsage}
              className="inline-flex items-center justify-center rounded-2xl bg-red-600 px-4 py-2.5 font-inter text-sm font-semibold text-white transition hover:bg-red-700 disabled:cursor-not-allowed disabled:bg-slate-300"
            >
              {isSubmitting ? "Deleting..." : "Delete"}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
