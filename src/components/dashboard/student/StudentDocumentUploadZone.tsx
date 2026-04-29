"use client";

import { useCallback, useMemo, useState } from "react";
import { useDropzone, type FileRejection } from "react-dropzone";
// REMOVED: setRequiredDocumentLink
import { createStudentDocumentRecord } from "@/actions/documents";
import { useToast } from "@/components/common/feedback/ToastProvider";
import { STORAGE_BUCKETS } from "@/lib/constants";
import { buildStudentDocumentStoragePath, inferDocumentType } from "@/lib/documents/paths";
import type { DocumentUploadConfig, FileRequirementMap, SelectedDocumentReference } from "@/lib/documents/types";
import { createClient as createSupabaseBrowserClient } from "@/lib/supabase/client";
import FileDropZone from "./upload/FileDropZone";
import RejectionList from "./upload/RejectionList";
import SelectedFileItem from "./upload/SelectedFileItem";
import UploadFooter from "./upload/UploadFooter";

type StudentDocumentUploadZoneProps = {
  onCancel: () => void;
  onUploadComplete?: (documents: SelectedDocumentReference[]) => void;
  showCancel?: boolean;
  submitLabel?: string;
  uploadConfig?: DocumentUploadConfig;
  requirements?: any[]; // Typed as any[] temporarily to match your new schema
};

const DEFAULT_MAX_FILE_SIZE_BYTES = 10 * 1024 * 1024;
const DEFAULT_ACCEPT = {
  "application/pdf": [".pdf"],
  "image/jpeg": [".jpg", ".jpeg"],
  "image/png": [".png"],
  "application/msword": [".doc"],
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document": [".docx"],
};

function getFileKey(file: File) {
  return `${file.name}-${file.size}-${file.lastModified}`;
}

function getRejectionMessage(rejection: FileRejection, maxBytes: number) {
  const firstError = rejection.errors[0];
  if (!firstError) return "This file could not be added.";
  if (firstError.code === "file-too-large") {
    const mb = maxBytes >= 1024 * 1024 ? `${(maxBytes / (1024 * 1024)).toFixed(1)} MB` : `${Math.max(1, Math.round(maxBytes / 1024))} KB`;
    return `${rejection.file.name} is larger than ${mb}.`;
  }
  if (firstError.code === "file-invalid-type") {
    return `${rejection.file.name} is not a supported file type.`;
  }
  return `${rejection.file.name}: ${firstError.message}`;
}

export default function StudentDocumentUploadZone({
  onCancel,
  onUploadComplete,
  showCancel = true,
  submitLabel = "Upload Files",
  uploadConfig,
  requirements = [],
}: StudentDocumentUploadZoneProps) {
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [rejectedFiles, setRejectedFiles] = useState<FileRejection[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  const [fileRequirementMap, setFileRequirementMap] = useState<FileRequirementMap>({});

  const { showToast } = useToast();

  const maxFileSizeBytes = uploadConfig?.maxFileSizeBytes ?? DEFAULT_MAX_FILE_SIZE_BYTES;
  const multiple = uploadConfig?.multiple ?? true;
  const maxFiles = uploadConfig?.maxFiles ?? 0;
  const accept = uploadConfig?.accept ?? DEFAULT_ACCEPT;

  const selectedRequirementIds = useMemo(() => {
    return new Set(Object.values(fileRequirementMap));
  }, [fileRequirementMap]);

  // A file can ONLY be uploaded if it has an assigned requirement ID
  const canUpload = selectedFiles.length > 0 && selectedFiles.every((file) => Boolean(fileRequirementMap[getFileKey(file)]));

  const onDrop = useCallback(
    (acceptedFiles: File[], fileRejections: FileRejection[]) => {
      setSelectedFiles((currentFiles) => {
        const existingKeys = new Set(currentFiles.map((file) => getFileKey(file)));
        const uniqueNewFiles = acceptedFiles.filter((file) => !existingKeys.has(getFileKey(file)));
        const nextFiles = [...currentFiles, ...uniqueNewFiles];
        if (!multiple) return nextFiles.slice(-1);
        if (maxFiles > 0) return nextFiles.slice(0, maxFiles);
        return nextFiles;
      });

      setRejectedFiles(fileRejections);

      if (fileRejections.length) {
        const firstMessage = getRejectionMessage(fileRejections[0], maxFileSizeBytes);
        showToast({
          variant: "error",
          title: "Some files were not added",
          description: firstMessage,
        });
      }
    },
    [maxFileSizeBytes, multiple, maxFiles, showToast],
  );

  const { getRootProps, getInputProps, isDragActive, isDragReject, open } = useDropzone({
    onDrop,
    multiple,
    noClick: true,
    maxFiles: maxFiles > 0 ? maxFiles : undefined,
    maxSize: maxFileSizeBytes,
    accept,
  });

  const rejectionMessages = useMemo(
    () => rejectedFiles.map((rejection) => getRejectionMessage(rejection, maxFileSizeBytes)),
    [maxFileSizeBytes, rejectedFiles],
  );

  function handleRemoveFile(fileToRemove: File) {
    const key = getFileKey(fileToRemove);
    setSelectedFiles((currentFiles) =>
      currentFiles.filter(
        (file) => !(file.name === fileToRemove.name && file.size === fileToRemove.size && file.lastModified === fileToRemove.lastModified),
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

    const supabase = createSupabaseBrowserClient();
    const { data: { user }, error: userError } = await supabase.auth.getUser();

    if (userError || !user) {
      showToast({ variant: "error", title: "Upload failed", description: "You must be signed in to upload documents." });
      setIsUploading(false);
      return;
    }

    const successfulUploads: SelectedDocumentReference[] = [];
    const failedUploads: string[] = [];
    const failedFileKeys = new Set<string>();

    for (const file of selectedFiles) {
      const fileKey = getFileKey(file);
      const requirementId = fileRequirementMap[fileKey];

      if (!requirementId) {
        failedUploads.push(`${file.name}: No requirement selected.`);
        failedFileKeys.add(fileKey);
        continue;
      }

      const documentId = crypto.randomUUID();
      const storagePath = buildStudentDocumentStoragePath(user.id, documentId, file.name);

      const { error: uploadError } = await supabase.storage
        .from(STORAGE_BUCKETS.DOCUMENTS)
        .upload(storagePath, file, { upsert: false });

      if (uploadError) {
        failedUploads.push(`${file.name}: ${uploadError.message}`);
        failedFileKeys.add(fileKey);
        continue;
      }

      // --- THE NEW 1-STEP DATABASE SAVE ---
      const documentResult = await createStudentDocumentRecord({
        id: documentId,
        requirementId: requirementId, // Directly attach to requirement
        name: file.name,
        type: inferDocumentType(file.name, file.type),
        bucket: STORAGE_BUCKETS.DOCUMENTS,
        storagePath,
        mimeType: file.type || null,
        sizeBytes: file.size,
        source: "VAULT_UPLOAD",
        // Note: 'status' was removed because it now lives on the Requirement itself!
      });

      if (!documentResult.success || !documentResult.data) {
        failedUploads.push(documentResult.error ?? `${file.name}: Failed to save the uploaded document.`);
        failedFileKeys.add(fileKey);
        await supabase.storage.from(STORAGE_BUCKETS.DOCUMENTS).remove([storagePath]);
        continue;
      }

      successfulUploads.push(documentResult.data);
    }

    setIsUploading(false);

    if (failedUploads.length) {
      showToast({
        variant: "error",
        title: "Upload failed for some files",
        description: failedUploads[0],
      });
      setSelectedFiles((currentFiles) =>
        currentFiles.filter((file) => failedFileKeys.has(getFileKey(file))),
      );
    } else if (successfulUploads.length) {
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
        <div className="space-y-3 rounded-[1.5rem] border border-slate-200 bg-white p-4 shadow-sm">
          <div className="flex items-center justify-between gap-3">
            <p className="font-poppins text-lg font-semibold text-slate-900">Selected Files</p>
            <p className="font-inter text-sm text-slate-400">{selectedFiles.length} {selectedFiles.length === 1 ? "file" : "files"}</p>
          </div>
          <div className="max-h-60 space-y-3 overflow-y-auto pr-1">
            {selectedFiles.map((file) => (
              <SelectedFileItem
                key={getFileKey(file)}
                file={file}
                chosenRequirementId={fileRequirementMap[getFileKey(file)]}
                requirements={requirements}
                existingLinkMap={{}} // Unused now
                selectedRequirementIds={selectedRequirementIds}
                onRequirementChange={handleRequirementChange}
                onRemove={handleRemoveFile}
              />
            ))}
          </div>
        </div>
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
