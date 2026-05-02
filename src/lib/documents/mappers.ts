import type { Document } from "@prisma/client";
import type {
  SelectedDocumentReference,
  StudentDocumentStatus,
  VaultDocumentListItem,
} from "@/lib/documents/types";

/**
 * Maps a raw Prisma `Document` row into the list item shape used by the vault UI.
 *
 * The document itself no longer stores `status`; the effective status is pulled
 * from its parent `DocumentRequirement` so that the UI stays consistent with
 * the review lifecycle managed by counselors.
 */
export function mapDocumentToVaultItem(
  document: Document & { requirement?: { status: string } | null },
): VaultDocumentListItem {
  return {
    id: document.id,
    name: document.name,
    type: document.type,
    status: (document.requirement?.status ?? "PENDING") as StudentDocumentStatus,
    bucket: document.bucket,
    storagePath: document.storagePath,
    mimeType: document.mimeType,
    sizeBytes: document.sizeBytes,
    notes: document.notes,
    uploadedAt: document.uploadedAt?.toISOString() ?? null,
    source: document.source ?? null,
    matchState: "UNASSIGNED",
    matchedLabel: null,
  };
}

/**
 * Maps a Prisma `Document` row into the normalized reference returned by the
 * shared document picker and uploader system.
 *
 * Status is temporarily set to `"PENDING"` because the document row itself no
 * longer stores status. The UI will refresh from the server to get the
 * authoritative `DocumentRequirement` status.
 */
export function mapDocumentToReference(
  document: Document,
): SelectedDocumentReference {
  return {
    id: document.id,
    name: document.name,
    type: document.type,
    bucket: document.bucket,
    storagePath: document.storagePath,
    mimeType: document.mimeType,
    sizeBytes: document.sizeBytes,
    status: "PENDING",
  };
}
