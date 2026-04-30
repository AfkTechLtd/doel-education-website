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

/** @deprecated Kept for backward compat with other features. Not used for required documents. */
export type DocumentMatchState = "MATCHED" | "UNASSIGNED";

/**
 * Reusable upload/picker configuration passed through the document trigger,
 * picker, uploader, and upload zone.
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

/** @deprecated Kept for backward compat. Required documents now use Document.requirementId directly. */
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

// ─── NEW SCHEMA TYPES ────────────────────────────────────────────────────────

/** A single document as stored in the DB (Document model). */
export type DocumentItem = {
  id: string;
  name: string;
  type: string;
  storagePath: string | null;
  storageUrl: string | null;
  bucket: string | null;
  mimeType: string | null;
  sizeBytes: number | null;
  notes: string | null;
  uploadedAt: string | null;
  verifiedAt: string | null;
  verifiedBy: string | null;
  status: StudentDocumentStatus;
};

/** A DocumentRequirement with its attached single document (1:1 via @unique). */
export type RequirementWithDocuments = {
  id: string;
  name: string;
  description: string;
  status: StudentDocumentStatus;
  documents: DocumentItem | null;
};
