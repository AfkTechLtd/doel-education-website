"use client";

import DashboardStatusBadge from "@/components/dashboard/shared/DashboardStatusBadge";
import type { StudentDocumentRequirement } from "@/data/student-document-requirements";
import type { StudentDocumentStatus } from "@/lib/documents/types";

type StudentRequiredDocumentCardProps = {
  requirement: StudentDocumentRequirement;
  linkedFileName?: string | null;
  linkedStatus?: StudentDocumentStatus;
  onChooseDocument: (requirement: StudentDocumentRequirement) => void;
  disabled?: boolean;
};

export default function StudentRequiredDocumentCard({
  requirement,
  linkedFileName,
  linkedStatus,
  onChooseDocument,
  disabled = false,
}: StudentRequiredDocumentCardProps) {
  const statusLabel = (linkedStatus ?? requirement.status).replaceAll("_", " ");

  return (
    <article className="rounded-[1.6rem] border border-slate-200 bg-white p-5 shadow-sm transition hover:border-slate-300 hover:shadow-md">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <h3 className="font-poppins text-lg font-semibold text-slate-900">
            {requirement.label}
          </h3>
          <p className="mt-1 font-inter text-sm text-slate-500">{requirement.type}</p>
        </div>

        <DashboardStatusBadge status={statusLabel} />
      </div>

      <div className="mt-4 space-y-3">
        <p className="font-inter text-sm text-slate-500">
          {linkedFileName ?? requirement.linkedFileName
            ? `Linked file: ${linkedFileName ?? requirement.linkedFileName}`
            : "No file uploaded yet"}
        </p>
        <p className="font-inter text-sm leading-relaxed text-slate-500">
          {requirement.helperText}
        </p>

        <div className="pt-1">
          <button
            type="button"
            onClick={() => onChooseDocument(requirement)}
            disabled={disabled}
            className="inline-flex items-center justify-center rounded-2xl border border-slate-200 bg-white px-4 py-2.5 font-inter text-sm font-semibold text-slate-700 transition hover:border-slate-300 hover:text-slate-900 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {linkedFileName ?? requirement.linkedFileName
              ? "Change Document"
              : "Choose Document"}
          </button>
        </div>
      </div>
    </article>
  );
}
