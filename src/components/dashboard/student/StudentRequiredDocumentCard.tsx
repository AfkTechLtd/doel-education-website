"use client";

import DocumentAttachmentField from "@/components/common/documents/DocumentAttachmentField";
import type { StudentDocumentRequirement } from "@/data/student-document-requirements";
import type {
  SelectedDocumentReference,
  StudentDocumentStatus,
} from "@/lib/documents/types";
import DashboardStatusBadge from "../shared/DashboardStatusBadge";

type StudentRequiredDocumentCardProps = {
  requirement: StudentDocumentRequirement;
  linkedDocument: SelectedDocumentReference | null;
  effectiveStatus: StudentDocumentStatus;
  onChooseDocument: (requirement: StudentDocumentRequirement) => void;
  onUnlinkDocument: (requirement: StudentDocumentRequirement) => void;
  disabled?: boolean;
};

export default function StudentRequiredDocumentCard({
  requirement,
  linkedDocument,
  effectiveStatus,
  onChooseDocument,
  onUnlinkDocument,
  disabled = false,
}: StudentRequiredDocumentCardProps) {
  const isLinked = Boolean(linkedDocument);
  return (
    <article className="rounded-[1.6rem] border border-slate-200 bg-white p-5 shadow-sm transition hover:border-slate-300 hover:shadow-md">
      <div className="flex justify-between gap-4">
        <h3 className="font-poppins text-lg font-semibold text-slate-900">
          {requirement.label}
        </h3>
        <div className="flex flex-wrap items-center justify-between gap-2">
          <span
            className={
              isLinked
                ? "rounded-full border border-emerald-200 bg-emerald-50 px-2.5 py-1 font-inter text-[10px] font-semibold uppercase tracking-[0.14em] text-emerald-700"
                : "rounded-full border border-slate-200 bg-slate-100 px-2.5 py-1 font-inter text-[10px] font-semibold uppercase tracking-[0.14em] text-slate-500"
            }
          >
            {isLinked ? "Linked" : "Not Linked"}
          </span>

          <DashboardStatusBadge status={effectiveStatus.replaceAll("_", " ")} />
        </div>
        {/* <p className="mt-1 font-inter text-sm text-slate-500">{requirement.type}</p> */}
      </div>

      <DocumentAttachmentField
        linkedDocument={linkedDocument}
        status={effectiveStatus}
        helperText={requirement.helperText}
        onChoose={() => onChooseDocument(requirement)}
        onUnlink={() => onUnlinkDocument(requirement)}
        disabled={disabled}
      />
    </article>
  );
}
