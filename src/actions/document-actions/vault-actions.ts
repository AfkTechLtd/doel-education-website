import { prisma } from "@/lib/prisma";
import { getCurrentStudentContext } from "@/lib/documents/ownership";
import { mapDocumentToVaultItem } from "@/lib/documents/mappers";
import {
  finalizeStudentDocumentUpload,
  deleteStudentDocument as deleteStudentDocumentService,
  hardDeleteStudentDocument as hardDeleteStudentDocumentService,
} from "@/lib/documents/mutations";
import type { ActionResult } from "@/lib/documents/contracts";
import type {
  VaultDocumentListItem,
  SelectedDocumentReference,
} from "@/lib/documents/types";

/**
 * Lists all vault documents owned by the currently authenticated student.
 *
 * The result is ordered by upload date (newest first) so the vault UI feels
 * chronological.
 */
export async function listStudentDocuments(): Promise<
  ActionResult<VaultDocumentListItem[]>
> {
  try {
    const { studentProfile } = await getCurrentStudentContext();

    const documents = await prisma.document.findMany({
      where: { studentId: studentProfile.id },
      include: { requirement: { select: { status: true } } },
      orderBy: [{ uploadedAt: "desc" }, { createdAt: "desc" }],
    });

    return {
      success: true,
      data: documents.map(mapDocumentToVaultItem),
    };
  } catch (error) {
    console.error("[vault:listStudentDocuments]", error);
    return {
      success: false,
      error: "Failed to load your documents.",
    };
  }
}

/**
 * Thin wrapper around the shared mutation service.
 *
 * Keeps the legacy action signature alive while the heavy DB work lives in
 * `src/lib/documents/mutations.ts` so API routes can reuse it.
 */
export async function createStudentDocumentRecord(
  input: Parameters<typeof finalizeStudentDocumentUpload>[1],
): Promise<ActionResult<SelectedDocumentReference>> {
  const { studentProfile } = await getCurrentStudentContext();
  return finalizeStudentDocumentUpload(studentProfile.id, input);
}

/**
 * Soft-deletes a vault document for the current student.
 *
 * Delegates to the shared mutation service so API routes stay in sync.
 */
export async function deleteStudentDocument(
  documentId: string,
): Promise<ActionResult<{ id: string }>> {
  const { studentProfile } = await getCurrentStudentContext();
  return deleteStudentDocumentService(studentProfile.id, documentId);
}

/**
 * Hard-deletes a vault document and **all** its `DocumentLink` rows.
 *
 * Delegates to the shared mutation service so API routes stay in sync.
 */
export async function hardDeleteStudentDocument(
  documentId: string,
): Promise<ActionResult<{ id: string; removedLinks: number }>> {
  const { studentProfile } = await getCurrentStudentContext();
  return hardDeleteStudentDocumentService(studentProfile.id, documentId);
}
