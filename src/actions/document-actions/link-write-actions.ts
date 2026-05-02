import { prisma } from "@/lib/prisma";
import { getCurrentStudentContext } from "@/lib/documents/ownership";
import type { ActionResult } from "@/lib/documents/contracts";

/**
 * Links a vault document to a reusable application-field context such as an
 * SOP or LOR field.
 *
 * Uses `upsert` so repeated selections overwrite the previous link rather than
 * creating duplicates.
 */
export async function setApplicationFieldDocumentLink(
  contextKey: string,
  documentId: string,
): Promise<ActionResult<{ contextKey: string; documentId: string }>> {
  try {
    const { studentProfile } = await getCurrentStudentContext();

    if (!contextKey.trim()) {
      return { success: false, error: "Application field context is missing." };
    }
    if (!documentId.trim()) {
      return { success: false, error: "Selected document is missing." };
    }

    const document = await prisma.document.findFirst({
      where: { id: documentId, studentId: studentProfile.id },
      select: { id: true },
    });

    if (!document) {
      console.error("[links:setApplicationFieldDocumentLink:not-found]", {
        contextKey,
        documentId,
        studentProfileId: studentProfile.id,
      });
      return {
        success: false,
        error: "Selected document was not found in your vault.",
      };
    }

    await prisma.documentLink.upsert({
      where: {
        studentId_contextType_contextKey: {
          studentId: studentProfile.id,
          contextType: "APPLICATION_FIELD",
          contextKey,
        },
      },
      update: { documentId: document.id },
      create: {
        studentId: studentProfile.id,
        documentId: document.id,
        contextType: "APPLICATION_FIELD",
        contextKey,
      },
    });

    return {
      success: true,
      data: { contextKey, documentId: document.id },
    };
  } catch (error) {
    console.error("[links:setApplicationFieldDocumentLink]", { error, contextKey, documentId });
    return {
      success: false,
      error: "Could not save the application field document link.",
    };
  }
}

/**
 * Links a vault document to a resource template so students can keep their
 * working draft associated with the sample they used.
 *
 * Uses `upsert` so repeated selections overwrite the previous link.
 */
export async function setResourceTemplateDocumentLink(
  contextKey: string,
  documentId: string,
): Promise<ActionResult<{ contextKey: string; documentId: string }>> {
  try {
    const { studentProfile } = await getCurrentStudentContext();

    if (!contextKey.trim()) {
      return { success: false, error: "Resource template context is missing." };
    }
    if (!documentId.trim()) {
      return { success: false, error: "Selected document is missing." };
    }

    const document = await prisma.document.findFirst({
      where: { id: documentId, studentId: studentProfile.id },
      select: { id: true },
    });

    if (!document) {
      console.error("[links:setResourceTemplateDocumentLink:not-found]", {
        contextKey,
        documentId,
        studentProfileId: studentProfile.id,
      });
      return {
        success: false,
        error: "Selected document was not found in your vault.",
      };
    }

    await prisma.documentLink.upsert({
      where: {
        studentId_contextType_contextKey: {
          studentId: studentProfile.id,
          contextType: "RESOURCE_TEMPLATE",
          contextKey,
        },
      },
      update: { documentId: document.id },
      create: {
        studentId: studentProfile.id,
        documentId: document.id,
        contextType: "RESOURCE_TEMPLATE",
        contextKey,
      },
    });

    return {
      success: true,
      data: { contextKey, documentId: document.id },
    };
  } catch (error) {
    console.error("[links:setResourceTemplateDocumentLink]", { error, contextKey, documentId });
    return {
      success: false,
      error: "Could not save the resource template document link.",
    };
  }
}
