/**
 * Default upload configuration constants shared across all document upload
 * surfaces so the client and UI rules stay in sync.
 */
export const DEFAULT_MAX_FILE_SIZE_BYTES = 10 * 1024 * 1024;

/** MIME type whitelist for document uploads. */
export const DEFAULT_ACCEPT = {
  "application/pdf": [".pdf"],
  "image/jpeg": [".jpg", ".jpeg"],
  "image/png": [".png"],
  "application/msword": [".doc"],
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document": [
    ".docx",
  ],
};

/**
 * Creates a deterministic composite key for a {@link File} so the same
 * physical file can be identified across re-renders.
 */
export function getFileKey(
  file: Pick<File, "name" | "size" | "lastModified">,
): string {
  return `${file.name}-${file.size}-${file.lastModified}`;
}

/**
 * Formats a byte count into a human-readable string (KB or MB).
 */
export function formatFileSize(bytes: number): string {
  if (bytes >= 1024 * 1024) {
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  }
  return `${Math.max(1, Math.round(bytes / 1024))} KB`;
}

/**
 * Describes a file rejection error without depending on react-dropzone types
 * so this helper can be imported by any client code.
 */
export type UploadRejectionLike = {
  file: { name: string };
  errors: Array<{ code: string; message: string }>;
};

/**
 * Builds a user-facing rejection message from the first error in a
 * {@link UploadRejectionLike}.
 *
 * Recognizes `file-too-large` and `file-invalid-type` for friendlier copy;
 * everything else falls back to the raw error text.
 */
export function getUploadRejectionMessage(
  rejection: UploadRejectionLike,
  maxBytes: number,
): string {
  const firstError = rejection.errors[0];
  if (!firstError) return "This file could not be added.";

  if (firstError.code === "file-too-large") {
    return `${rejection.file.name} is larger than ${formatFileSize(maxBytes)}.`;
  }
  if (firstError.code === "file-invalid-type") {
    return `${rejection.file.name} is not a supported file type.`;
  }
  return `${rejection.file.name}: ${firstError.message}`;
}
