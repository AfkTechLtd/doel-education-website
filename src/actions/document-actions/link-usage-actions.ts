import { prisma } from "@/lib/prisma";
import { getCurrentStudentContext } from "@/lib/documents/ownership";
import type { ActionResult } from "@/lib/documents/contracts";
import type {
  DocumentLinkContext,
  DocumentLinkUsage,
} from "@/lib/documents/types";

/**
 * Returns all link usages for a document so the UI can explain delete blocking
 * and show the impact of a hard delete.
 */
export async function getDocumentLinkUsage(
  documentId: string,
): Promise<ActionResult<DocumentLinkUsage>> {
  try {
    const { studentProfile } = await getCurrentStudentContext();

    const document = await prisma.document.findFirst({
      where: { id: documentId, studentId: studentProfile.id },
      select: { id: true },
    });

    if (!document) {
      return { success: false, error: "Document not found." };
    }

    const links = await prisma.documentLink.findMany({
      where: { studentId: studentProfile.id, documentId: document.id },
      select: { contextType: true, contextKey: true },
      orderBy: { createdAt: "asc" },
    });

    return {
      success: true,
      data: {
        documentId: document.id,
        total: links.length,
        items: links.map((link) => ({
          contextType: link.contextType as DocumentLinkContext,
          contextKey: link.contextKey,
        })),
      },
    };
  } catch (error) {
    console.error("[usage:getDocumentLinkUsage]", error);
    return { success: false, error: "Failed to inspect document links." };
  }
}

/**
 * Removes a document link for the current student without deleting the vault
 * file itself.
 *
 * If the link does not exist this is treated as success (idempotent).
 */
export async function removeDocumentLink(
  contextType: DocumentLinkContext,
  contextKey: string,
): Promise<ActionResult<{ contextType: DocumentLinkContext; contextKey: string }>> {
  try {
    const { studentProfile } = await getCurrentStudentContext();

    const existingLink = await prisma.documentLink.findUnique({
      where: {
        studentId_contextType_contextKey: {
          studentId: studentProfile.id,
          contextType,
          contextKey,
        },
      },
      select: { id: true },
    });

    if (!existingLink) {
      return {
        success: true,
        data: { contextType, contextKey },
      };
    }

    await prisma.documentLink.delete({
      where: {
        studentId_contextType_contextKey: {
          studentId: studentProfile.id,
          contextType,
          contextKey,
        },
      },
    });

    return {
      success: true,
      data: { contextType, contextKey },
    };
  } catch (error) {
    console.error("[usage:removeDocumentLink]", error);
    return { success: false, error: "Failed to unlink document." };
  }
}
