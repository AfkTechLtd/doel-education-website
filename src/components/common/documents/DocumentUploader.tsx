"use client";

import StudentDocumentUploadZone from "@/components/dashboard/student/StudentDocumentUploadZone";
import type { SelectedDocumentReference } from "@/lib/documents/types";

type DocumentUploaderProps = {
  onCancel: () => void;
  onUploadComplete?: (documents: SelectedDocumentReference[]) => void;
  showCancel?: boolean;
  submitLabel?: string;
};

export default function DocumentUploader({
  onCancel,
  onUploadComplete,
  showCancel,
  submitLabel,
}: DocumentUploaderProps) {
  return (
    <StudentDocumentUploadZone
      onCancel={onCancel}
      onUploadComplete={onUploadComplete}
      showCancel={showCancel}
      submitLabel={submitLabel}
    />
  );
}
