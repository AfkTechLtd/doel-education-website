import { unstable_cache } from "next/cache";
import type { Document } from "@prisma/client";
import { prisma } from "@/lib/prisma";
import type {
  RequiredDocumentLinkItem,
  SelectedDocumentReference,
  StudentDocumentStatus,
  VaultDocumentListItem,
} from "@/lib/documents/types";

// ─── Mappers ──────────────────────────────────────────────────────────────────

function mapDocumentToVaultItem(doc: Document): VaultDocumentListItem {
  return {
    id: doc.id,
    name: doc.name,
    type: doc.type,
    status: "PENDING" as StudentDocumentStatus,
    bucket: doc.bucket,
    storagePath: doc.storagePath,
    mimeType: doc.mimeType,
    sizeBytes: doc.sizeBytes,
    notes: doc.notes,
    uploadedAt: doc.uploadedAt?.toISOString() ?? null,
    source: doc.source ?? null,
    matchState: "UNASSIGNED",
    matchedLabel: null,
  };
}

function mapDocumentToReference(doc: {
  id: string;
  name: string;
  type: string;
  bucket: string | null;
  storagePath: string | null;
  mimeType: string | null;
  sizeBytes: number | null;
}): SelectedDocumentReference {
  return {
    id: doc.id,
    name: doc.name,
    type: doc.type,
    bucket: doc.bucket,
    storagePath: doc.storagePath,
    mimeType: doc.mimeType,
    sizeBytes: doc.sizeBytes,
    status: "PENDING" as StudentDocumentStatus,
  };
}

// ─── Cache tag helpers ─────────────────────────────────────────────────────────

/** Cache tag for a specific student's documents. Use with `revalidateTag`. */
export function studentDocumentsCacheTag(studentProfileId: string) {
  return `documents:${studentProfileId}`;
}

// ─── Cached fetchers ───────────────────────────────────────────────────────────

/**
 * All vault documents owned by a student.
 * Cached per student profile for 60 s; tag: `documents:<profileId>`.
 */
export const getCachedStudentDocuments = unstable_cache(
  async (studentProfileId: string): Promise<VaultDocumentListItem[]> => {
    const rows = await prisma.document.findMany({
      where: { studentId: studentProfileId },
      orderBy: [{ uploadedAt: "desc" }, { createdAt: "desc" }],
    });
    return rows.map(mapDocumentToVaultItem);
  },
  ["student-documents"],
  { revalidate: 60 },
);

/**
 * Required document links for a student.
 * Cached per student profile for 60 s; tag: `documents:<profileId>`.
 */
export const getCachedRequiredDocumentLinks = unstable_cache(
  async (studentProfileId: string): Promise<RequiredDocumentLinkItem[]> => {
    const links = await prisma.documentLink.findMany({
      where: {
        studentId: studentProfileId,
        contextType: "REQUIRED_DOCUMENT",
      },
      include: {
        document: {
          select: {
            id: true,
            name: true,
            type: true,
            bucket: true,
            storagePath: true,
            mimeType: true,
            sizeBytes: true,
          },
        },
      },
    });

    return links.map((link) => ({
      contextKey: link.contextKey,
      document: mapDocumentToReference(link.document),
    }));
  },
  ["required-document-links"],
  { revalidate: 60 },
);

/**
 * The linked document for a resource template (student-specific).
 * Cached per (studentProfileId, templateId) for 60 s.
 */
export const getCachedResourceTemplateLinkedDocument = unstable_cache(
  async (
    studentProfileId: string,
    templateId: string,
  ): Promise<SelectedDocumentReference | null> => {
    const link = await prisma.documentLink.findUnique({
      where: {
        studentId_contextType_contextKey: {
          studentId: studentProfileId,
          contextType: "RESOURCE_TEMPLATE",
          contextKey: templateId,
        },
      },
      select: {
        document: {
          select: {
            id: true,
            name: true,
            type: true,
            bucket: true,
            storagePath: true,
            mimeType: true,
            sizeBytes: true,
          },
        },
      },
    });

    return link?.document ? mapDocumentToReference(link.document) : null;
  },
  ["resource-template-linked-document"],
  { revalidate: 60 },
);
