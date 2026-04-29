"use client";

import { useState, useTransition } from "react";
import DocumentAttachmentField from "@/components/common/documents/DocumentAttachmentField";
import DocumentPickerModal from "@/components/common/documents/DocumentPickerModal";
import type {
  SelectedDocumentReference,
  StudentDocumentStatus,
} from "@/lib/documents/types";
import DashboardStatusBadge from "@/components/dashboard/shared/DashboardStatusBadge";

type DocumentInputFieldProps = {
  label: string;
  description?: string;
  linkedDocument: SelectedDocumentReference | null;
  status?: StudentDocumentStatus;
  disabled?: boolean;
  pickerTitle?: string;
  allowedTypes?: string[];
  targetRequirementId?: string;
  onSelect: (document: SelectedDocumentReference) => Promise<void> | void;
  onUnlink?: () => Promise<void> | void;
};

/**
 * Standard reusable document field used across the app.
 *
 * This component owns the picker open/close state and busy state for linking
 * and unlinking, while the parent owns persistence through `onSelect` and
 * `onUnlink`. Use it anywhere a form field needs to attach a vault document.
 */
export default function DocumentInputField({
  label,
  description,
  linkedDocument,
  status = "PENDING",
  disabled = false,
  pickerTitle,
  allowedTypes,
  targetRequirementId,
  onSelect,
  onUnlink,
}: DocumentInputFieldProps) {
  const [isPickerOpen, setIsPickerOpen] = useState(false);
  const [isBusy, startTransition] = useTransition();

  function handleSelect(document: SelectedDocumentReference) {
    startTransition(async () => {
      await onSelect(document);
      setIsPickerOpen(false);
    });
  }

  function handleUnlink() {
    if (!onUnlink) {
      return;
    }

    startTransition(async () => {
      await onUnlink();
    });
  }
  const isLinked = Boolean(linkedDocument);
  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <h3 className="font-poppins text-lg font-semibold text-slate-900">
          {label}
        </h3>

        <div className="flex flex-wrap items-center gap-2 sm:justify-end">
          <span
            className={
              isLinked
                ? "rounded-full border border-emerald-200 bg-emerald-50 px-2.5 py-1 font-inter text-[10px] font-semibold uppercase tracking-[0.14em] text-emerald-700"
                : "rounded-full border border-slate-200 bg-slate-100 px-2.5 py-1 font-inter text-[10px] font-semibold uppercase tracking-[0.14em] text-slate-500"
            }
          >
            {isLinked ? "Linked" : "Not Linked"}
          </span>
          <DashboardStatusBadge status={status.replaceAll("_", " ")} />
        </div>
      </div>

      <DocumentAttachmentField
        linkedDocument={linkedDocument}
        status={status}
        helperText={
          description ??
          "Select a document from your vault or upload a new file."
        }
        onChoose={() => setIsPickerOpen(true)}
        onUnlink={handleUnlink}
        disabled={disabled || isBusy}
      />

      <DocumentPickerModal
        open={isPickerOpen}
        onClose={() => setIsPickerOpen(false)}
        title={pickerTitle ?? `Choose ${label}`}
        onSelect={handleSelect}
        targetRequirementId={targetRequirementId}
      />
    </div>
  );
}
