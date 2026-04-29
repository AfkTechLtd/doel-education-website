"use client";

import { FileWarning, X } from "lucide-react";
import type { RequirementWithDocuments } from "@/lib/documents/types";

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

type SelectedFileItemProps = {
  file: File;
  chosenRequirementId?: string;
  requirements: RequirementWithDocuments[];
  fulfilledRequirementIds: Set<string>;
  selectedRequirementIds: Set<string>;
  hideRequirementSelect?: boolean;
  fixedRequirementLabel?: string;
  onRequirementChange: (fileKey: string, requirementId: string) => void;
  onRemove: (file: File) => void;
};

export default function SelectedFileItem({
  file,
  chosenRequirementId,
  requirements,
  fulfilledRequirementIds,
  selectedRequirementIds,
  hideRequirementSelect = false,
  fixedRequirementLabel,
  onRequirementChange,
  onRemove,
}: SelectedFileItemProps) {
  const fileKey = `${file.name}-${file.size}-${file.lastModified}`;
  const isReplacing = chosenRequirementId ? fulfilledRequirementIds.has(chosenRequirementId) : false;
  const existingDoc = isReplacing
    ? requirements.find((r) => r.id === chosenRequirementId)?.documents
    : null;

  return (
    <div className="space-y-2 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div className="min-w-0 flex-1">
          <p className="truncate font-inter text-sm font-semibold text-slate-800">
            {file.name}
          </p>
          <p className="mt-1 font-inter text-xs text-slate-500">
            {getFileExtension(file.name)} &bull; {formatFileSize(file.size)}
          </p>
        </div>

        <button
          type="button"
          onClick={() => onRemove(file)}
          className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-500 transition hover:border-slate-300 hover:text-slate-900"
          aria-label={`Remove ${file.name}`}
        >
          <X className="h-4 w-4" aria-hidden="true" />
        </button>
      </div>

      <div className="flex flex-col gap-2">
        {hideRequirementSelect ? (
          <div className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 font-inter text-sm text-slate-800">
            {fixedRequirementLabel ?? "Requirement selected"}
          </div>
        ) : (
          <select
            value={chosenRequirementId ?? ""}
            onChange={(e) => onRequirementChange(fileKey, e.target.value)}
            className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 font-inter text-sm text-slate-800 outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/10"
          >
            <option value="" disabled>
              Select required document...
            </option>
            {requirements.map((req) => {
              const isFulfilled = fulfilledRequirementIds.has(req.id);
              const isSelectedElsewhere = selectedRequirementIds.has(req.id) && chosenRequirementId !== req.id;
              const isDisabled = isSelectedElsewhere;
              return (
                <option key={req.id} value={req.id} disabled={isDisabled}>
                  {req.name}
                  {isFulfilled ? " (already uploaded — delete first to replace)" : ""}
                </option>
              );
            })}
          </select>
        )}

        {existingDoc ? (
          <p className="flex items-center gap-1.5 font-inter text-xs text-amber-600">
            <FileWarning className="h-3.5 w-3.5" aria-hidden="true" />
            This will replace the current file: {existingDoc.name}
          </p>
        ) : null}
      </div>
    </div>
  );
}
