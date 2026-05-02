"use client";

import { useCallback, useState } from "react";
import { useDropzone, type FileRejection } from "react-dropzone";
import { getFileKey, getUploadRejectionMessage } from "@/lib/documents/upload-helpers";
import type { FileRequirementMap } from "@/lib/documents/types";

export type UseDocumentDropzoneOptions = {
  maxFileSizeBytes: number;
  multiple: boolean;
  maxFiles: number;
  accept: Record<string, string[]>;
  isRequirementScopedUpload: boolean;
  targetRequirementId?: string;
  onRejection: (message: string) => void;
};

export type UseDocumentDropzoneReturn = {
  selectedFiles: File[];
  rejectedFiles: FileRejection[];
  setSelectedFiles: React.Dispatch<React.SetStateAction<File[]>>;
  setRejectedFiles: React.Dispatch<React.SetStateAction<FileRejection[]>>;
  fileRequirementMap: FileRequirementMap;
  setFileRequirementMap: React.Dispatch<React.SetStateAction<FileRequirementMap>>;
  getRootProps: ReturnType<typeof useDropzone>["getRootProps"];
  getInputProps: ReturnType<typeof useDropzone>["getInputProps"];
  isDragActive: boolean;
  isDragReject: boolean;
  open: () => void;
};

/**
 * Encapsulates react-dropzone setup and file deduplication logic for the
 * student document upload zone.
 *
 * Handles:
 *   - File deduplication via composite key.
 *   - Enforcing `multiple` and `maxFiles` caps.
 *   - Auto-binding the requirement ID in scoped (Change Document) mode.
 */
export function useDocumentDropzone(
  options: UseDocumentDropzoneOptions,
): UseDocumentDropzoneReturn {
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [rejectedFiles, setRejectedFiles] = useState<FileRejection[]>([]);
  const [fileRequirementMap, setFileRequirementMap] = useState<FileRequirementMap>({});

  const {
    maxFileSizeBytes,
    multiple,
    maxFiles,
    accept,
    isRequirementScopedUpload,
    targetRequirementId,
    onRejection,
  } = options;

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

      if (isRequirementScopedUpload && targetRequirementId && acceptedFiles.length > 0) {
        const file = acceptedFiles[acceptedFiles.length - 1];
        setFileRequirementMap({ [getFileKey(file)]: targetRequirementId });
      }

      setRejectedFiles(fileRejections);

      if (fileRejections.length) {
        onRejection(
          getUploadRejectionMessage(
            { file: fileRejections[0].file, errors: fileRejections[0].errors },
            maxFileSizeBytes,
          ),
        );
      }
    },
    [isRequirementScopedUpload, maxFileSizeBytes, multiple, maxFiles, onRejection, targetRequirementId],
  );

  const { getRootProps, getInputProps, isDragActive, isDragReject, open } = useDropzone({
    onDrop,
    multiple,
    noClick: true,
    maxFiles: maxFiles > 0 ? maxFiles : undefined,
    maxSize: maxFileSizeBytes,
    accept,
  });

  return {
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
  };
}
