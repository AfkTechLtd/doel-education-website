"use client";

import DocumentInputField from "@/components/common/documents/DocumentInputField";
import type { StudentDocumentRequirement } from "@/data/student-document-requirements";
import type {
  SelectedDocumentReference,
  StudentDocumentStatus,
} from "@/lib/documents/types";

type StudentRequiredDocumentCardProps = {
  requirement: StudentDocumentRequirement;
  linkedDocument: SelectedDocumentReference | null;
  effectiveStatus: StudentDocumentStatus;
  onSelectDocument: (requirement: StudentDocumentRequirement, document: SelectedDocumentReference) => Promise<void> | void;
  onUnlinkDocument: (requirement: StudentDocumentRequirement) => Promise<void> | void;
  disabled?: boolean;
};

export default function StudentRequiredDocumentCard({
  requirement,
  linkedDocument,
  effectiveStatus,
  onSelectDocument,
  onUnlinkDocument,
  disabled = false,
}: StudentRequiredDocumentCardProps) {
  return (
    <article className="rounded-[1.6rem] border border-slate-200 bg-white p-5 shadow-sm transition hover:border-slate-300 hover:shadow-md">
      <DocumentInputField
        label={requirement.label}
        description={requirement.helperText}
        linkedDocument={linkedDocument}
        status={effectiveStatus}
        pickerTitle={`Choose Document for ${requirement.label}`}
        onSelect={(document) => onSelectDocument(requirement, document)}
        onUnlink={() => onUnlinkDocument(requirement)}
        disabled={disabled}
      />
    </article>
  );
}
