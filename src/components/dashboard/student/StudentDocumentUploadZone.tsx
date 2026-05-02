"use client";

import { useMemo, useState } from "react";
import { performDocumentUploads } from "@/lib/documents/client-upload";
import { useToast } from "@/components/common/feedback/ToastProvider";
import {
  DEFAULT_MAX_FILE_SIZE_BYTES,
  DEFAULT_ACCEPT,
  getFileKey,
  getUploadRejectionMessage,
} from "@/lib/documents/upload-helpers";
import type {
  DocumentUploadConfig,
  RequirementWithDocuments,
  SelectedDocumentReference,
} from "@/lib/documents/types";
import FileDropZone from "./upload/FileDropZone";
import RejectionList from "./upload/RejectionList";
import SelectedFilesList from "./upload/SelectedFilesList";
import UploadFooter from "./upload/UploadFooter";
import { useDocumentDropzone } from "./upload/useDocumentDropzone";

type StudentDocumentUploadZoneProps = {
  onCancel: () => void;
  onUploadComplete?: (documents: SelectedDocumentReference[]) => void;
  showCancel?: boolean;
  submitLabel?: string;
  uploadConfig?: DocumentUploadConfig;
  requirements?: RequirementWithDocuments[];
  targetRequirementId?: string;
};

/**
 * Multi-file upload zone for the student document vault.
 *
 * In the general (non-scoped) flow the student must manually assign each file
 * to a `DocumentRequirement`. In the scoped flow (Change Document) the
 * requirement is fixed and only a single file is accepted.
 */
export default function StudentDocumentUploadZone({
  onCancel,
  onUploadComplete,
  showCancel = true,
  submitLabel = "Upload Files",
  uploadConfig,
  requirements = [],
  targetRequirementId,
}: StudentDocumentUploadZoneProps) {
  const { showToast } = useToast();
  const [isUploading, setIsUploading] = useState(false);

  const maxFileSizeBytes = uploadConfig?.maxFileSizeBytes ?? DEFAULT_MAX_FILE_SIZE_BYTES;
  const isRequirementScopedUpload = Boolean(targetRequirementId);
  const multiple = isRequirementScopedUpload ? false : (uploadConfig?.multiple ?? true);
  const maxFiles = uploadConfig?.maxFiles ?? 0;
  const accept = uploadConfig?.accept ?? DEFAULT_ACCEPT;

  const {
    selectedFiles,
    rejectedFiles,
    setSelectedFiles,
    setRejectedFiles,
    fileRequirementMap,
    setFileRequirementMap,
    getRootProps,
    getInputProps,
    isDragActive,
    isDragReject,
    open,
  } = useDocumentDropzone({
    maxFileSizeBytes,
    multiple,
    maxFiles,
    accept,
    isRequirementScopedUpload,
    targetRequirementId,
    onRejection: (message) =>
      showToast({ variant: "error", title: "Some files were not added", description: message }),
  });

  const selectedRequirementIds = useMemo(
    () => new Set(Object.values(fileRequirementMap)),
    [fileRequirementMap],
  );

  const fulfilledRequirementIds = useMemo(
    () => new Set(requirements.filter((r) => r.documents !== null).map((r) => r.id)),
    [requirements],
  );

  // A file can ONLY be uploaded if every selected file has an assigned requirement.
  const canUpload = selectedFiles.length > 0 && selectedFiles.every((file) => {
    if (isRequirementScopedUpload) return Boolean(targetRequirementId);
    return Boolean(fileRequirementMap[getFileKey(file)]);
  });

  const rejectionMessages = useMemo(
    () =>
      rejectedFiles.map((r) =>
        getUploadRejectionMessage({ file: r.file, errors: r.errors }, maxFileSizeBytes),
      ),
    [maxFileSizeBytes, rejectedFiles],
  );

  function handleRemoveFile(fileToRemove: File) {
    const key = getFileKey(fileToRemove);
    setSelectedFiles((current) =>
      current.filter(
        (file) =>
          !(file.name === fileToRemove.name && file.size === fileToRemove.size && file.lastModified === fileToRemove.lastModified),
      ),
    );
    setFileRequirementMap((prev) => {
      const next = { ...prev };
      delete next[key];
      return next;
    });
  }

  function handleRequirementChange(fileKey: string, requirementId: string) {
    setFileRequirementMap((prev) => ({ ...prev, [fileKey]: requirementId }));
  }

  async function handleUploadFiles() {
    if (!selectedFiles.length || isUploading || !canUpload) return;

    setIsUploading(true);
    const { successfulUploads, failedUploads, failedFileKeys, authError } =
      await performDocumentUploads({
        files: selectedFiles,
        fileRequirementMap,
        isRequirementScopedUpload,
        targetRequirementId,
      });

    setIsUploading(false);

    if (authError) {
      showToast({ variant: "error", title: "Upload failed", description: authError });
      return;
    }

    if (failedUploads.length) {
      showToast({
        variant: "error",
        title: "Upload failed for some files",
        description: failedUploads[0],
      });
      setSelectedFiles((current) => current.filter((file) => failedFileKeys.has(getFileKey(file))));
      return;
    }

    if (successfulUploads.length) {
      showToast({
        variant: "success",
        title: `${successfulUploads.length} ${successfulUploads.length === 1 ? "file" : "files"} uploaded and linked`,
      });
      setSelectedFiles([]);
      setRejectedFiles([]);
      setFileRequirementMap({});
      onUploadComplete?.(successfulUploads);
    }
  }

  return (
    <section className="space-y-5">
      <FileDropZone
        getRootProps={getRootProps}
        getInputProps={getInputProps}
        isDragActive={isDragActive}
        isDragReject={isDragReject}
        onBrowse={open}
        disabled={isUploading}
      />
      {selectedFiles.length > 0 && (
        <SelectedFilesList
          files={selectedFiles}
          fileRequirementMap={fileRequirementMap}
          requirements={requirements}
          fulfilledRequirementIds={fulfilledRequirementIds}
          selectedRequirementIds={selectedRequirementIds}
          isRequirementScopedUpload={isRequirementScopedUpload}
          targetRequirementId={targetRequirementId}
          onRequirementChange={handleRequirementChange}
          onRemove={handleRemoveFile}
        />
      )}
      <RejectionList messages={rejectionMessages} />
      <UploadFooter
        showCancel={showCancel}
        submitLabel={submitLabel}
        isUploading={isUploading}
        canUpload={canUpload}
        onCancel={onCancel}
        onUpload={handleUploadFiles}
      />
    </section>
  );
}
