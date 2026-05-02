import type { SelectedDocumentReference } from "@/lib/documents/types";

/**
 * Shared success/error envelope used by document actions and API routes.
 */
export type ActionResult<T> = {
  success: boolean;
  error?: string;
  data?: T;
};

/**
 * Payload used when a client has uploaded a file to storage and needs to
 * finalize it into a persistent `Document` record.
 */
export type FinalizeDocumentUploadPayload = {
  id: string;
  name: string;
  type: string;
  requirementId: string;
  bucket?: string | null;
  storagePath?: string | null;
  mimeType?: string | null;
  sizeBytes?: number | null;
  source?: string | null;
};

/** Payload for soft deletion of a single document row. */
export type DeleteDocumentPayload = {
  documentId: string;
};

/** Payload for hard deletion of a document and all links. */
export type HardDeleteDocumentPayload = {
  documentId: string;
};

/** Successful response body for soft delete. */
export type DeleteDocumentResult = {
  id: string;
};

/** Successful response body for hard delete. */
export type HardDeleteDocumentResult = {
  id: string;
  removedLinks: number;
};

/** Successful response body for upload finalization. */
export type FinalizeDocumentUploadResult = SelectedDocumentReference;
