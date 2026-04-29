/** Canonical review lifecycle used across the student document system. */
export type StudentDocumentStatus =
  | "PENDING"
  | "UNDER_REVIEW"
  | "RECEIVED"
  | "VERIFIED"
  | "REJECTED"
  | "WAIVED";

export type DocumentLinkContext = "REQUIRED_DOCUMENT" | "APPLICATION_FIELD" | "RESOURCE_TEMPLATE";

/** Single usage record describing where a document is linked. */
export type DocumentLinkUsageItem = {
  contextType: DocumentLinkContext;
  contextKey: string;
};

export type DocumentLinkUsage = {
  documentId: string;
  total: number;
  items: DocumentLinkUsageItem[];
};

export type DocumentMatchState = "MATCHED" | "UNASSIGNED";

/**
 * Reusable upload/picker configuration passed through the document trigger,
 * picker, uploader, and upload zone.
 *
 * `accept`, `multiple`, `maxFiles`, and `maxFileSizeBytes` control local file
 * upload behavior. `allowedDocumentTypes` controls which existing vault files
 * appear in the picker's "From Vault" tab.
 */
export type DocumentUploadConfig = {
  multiple?: boolean;
  maxFiles?: number;
  maxFileSizeBytes?: number;
  accept?: Record<string, string[]>;
  allowedDocumentTypes?: string[];
};

/**
 * Minimal document payload shared between the uploader, picker, and field link
 * flows. Callers should persist `id` as the canonical reference.
 */
export type SelectedDocumentReference = {
  id: string;
  name: string;
  type: string;
  bucket: string | null;
  storagePath: string | null;
  mimeType: string | null;
  sizeBytes: number | null;
  status: StudentDocumentStatus;
};

/** Student vault list item used by the All Files view. */
export type VaultDocumentListItem = SelectedDocumentReference & {
  notes: string | null;
  uploadedAt: string | null;
  source: string | null;
  matchState: DocumentMatchState;
  matchedLabel: string | null;
};

/** Persisted required-document link returned from the server. */
export type RequiredDocumentLinkItem = {
  contextKey: string;
  document: SelectedDocumentReference;
};

/** Persisted application-field link returned from the server. */
export type ApplicationFieldDocumentLinkItem = {
  contextKey: string;
  document: SelectedDocumentReference;
};

/** Persisted resource-template link returned from the server. */
export type ResourceTemplateDocumentLinkItem = {
  contextKey: string;
  document: SelectedDocumentReference;
};

/** Maps a composite file key to the chosen required-document context key. */
export type FileRequirementMap = Record<string, string>;
