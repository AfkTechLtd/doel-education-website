"use client";

import StudentDocumentUploadZone from "@/components/dashboard/student/StudentDocumentUploadZone";
import type { RequirementWithDocuments } from "@/lib/documents/types";
import type {
  DocumentUploadConfig,
  SelectedDocumentReference,
} from "@/lib/documents/types";

type DocumentUploaderProps = {
  onCancel: () => void;
  onUploadComplete?: (documents: SelectedDocumentReference[]) => void;
  showCancel?: boolean;
  submitLabel?: string;
  uploadConfig?: DocumentUploadConfig;
  requirements?: RequirementWithDocuments[];
  targetRequirementId?: string;
};

/**
 * Shared uploader wrapper for the document system.
 *
 * Use this component anywhere a local-machine upload should create real vault
 * documents. It delegates the actual upload logic to the student document
 * upload zone, but keeps the public API small and reusable for the rest of the
 * app.
 */
export default function DocumentUploader({
  onCancel,
  onUploadComplete,
  showCancel,
  submitLabel,
  uploadConfig,
  requirements,
  targetRequirementId,
}: DocumentUploaderProps) {
  return (
    <StudentDocumentUploadZone
      onCancel={onCancel}
      onUploadComplete={onUploadComplete}
      showCancel={showCancel}
      submitLabel={submitLabel}
      uploadConfig={uploadConfig}
      requirements={requirements}
      targetRequirementId={targetRequirementId}
    />
  );
}
