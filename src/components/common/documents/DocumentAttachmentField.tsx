"use client";

import { FileText, X } from "lucide-react";
import DashboardStatusBadge from "@/components/dashboard/shared/DashboardStatusBadge";
import type {
  SelectedDocumentReference,
  StudentDocumentStatus,
} from "@/lib/documents/types";

type DocumentAttachmentFieldProps = {
  linkedDocument: SelectedDocumentReference | null;
  status: StudentDocumentStatus;
  helperText: string;
  onChoose: () => void;
  onUnlink: () => void;
  disabled?: boolean;
};

/**
 * Shared field-level document UI used by required-document cards and
 * application fields.
 *
 * Unlink removes only the field/context link. It does not delete the document
 * from the vault.
 */
export default function DocumentAttachmentField({
  linkedDocument,
  status,
  helperText,
  onChoose,
  onUnlink,
  disabled = false,
}: DocumentAttachmentFieldProps) {
  const isLinked = Boolean(linkedDocument);

  return (
    <div className="mt-4 space-y-3">
      {isLinked && linkedDocument ? (
        <div className="flex items-center justify-between gap-3 rounded-2xl border border-slate-200 bg-slate-50 px-3.5 py-3">
          <div className="min-w-0 flex items-center gap-2">
            <FileText
              className="h-4 w-4 shrink-0 text-slate-500"
              aria-hidden="true"
            />
            <p className="truncate font-inter text-sm font-medium text-slate-700">
              {linkedDocument.name}
            </p>
          </div>

          <button
            type="button"
            onClick={onUnlink}
            disabled={disabled}
            className="inline-flex h-8 w-8 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-500 transition hover:border-red-200 hover:text-red-600 disabled:cursor-not-allowed disabled:opacity-60"
            aria-label={`Unlink ${linkedDocument.name}`}
          >
            <X className="h-4 w-4" aria-hidden="true" />
          </button>
        </div>
      ) : (
        <p className="font-inter text-sm text-slate-500">
          No document linked yet
        </p>
      )}

      <p className="font-inter text-sm leading-relaxed text-slate-500">
        {helperText}
      </p>

      <div className="pt-1">
        <button
          type="button"
          onClick={onChoose}
          disabled={disabled}
          className="inline-flex items-center justify-center rounded-2xl border border-slate-200 bg-white px-4 py-2.5 font-inter text-sm font-semibold text-slate-700 transition hover:border-slate-300 hover:text-slate-900 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isLinked ? "Change Document" : "Choose Document"}
        </button>
      </div>
    </div>
  );
}
