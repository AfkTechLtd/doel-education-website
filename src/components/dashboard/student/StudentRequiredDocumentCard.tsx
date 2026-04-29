"use client";

import DocumentInputField from "@/components/common/documents/DocumentInputField";
import type {
  SelectedDocumentReference,
  StudentDocumentStatus,
} from "@/lib/documents/types";

// Note: Using 'any' here temporarily since you bypassed the old static mock type,
// or you can update your types file to match the new Prisma schema.
type StudentRequiredDocumentCardProps = {
  requirement: any;
  linkedDocument: SelectedDocumentReference | null;
  effectiveStatus: StudentDocumentStatus;
  onSelectDocument: (requirement: any, document: SelectedDocumentReference) => Promise<void> | void;
  onUnlinkDocument: (requirement: any) => Promise<void> | void;
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
        label={requirement.name} // CHANGED from requirement.label
        description={requirement.description} // CHANGED from requirement.helperText
        linkedDocument={linkedDocument}
        status={effectiveStatus}
        pickerTitle={`Choose Document for ${requirement.name}`} // CHANGED from requirement.label
        onSelect={(document) => onSelectDocument(requirement, document)}
        onUnlink={() => onUnlinkDocument(requirement)}
        disabled={disabled}
      />
    </article>
  );
}
