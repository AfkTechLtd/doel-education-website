import { prisma } from "@/lib/prisma";
import { getCurrentStudentContext } from "@/lib/documents/ownership";
import { mapDocumentToReference } from "@/lib/documents/mappers";
import type { ActionResult } from "@/lib/documents/contracts";
import type {
  ApplicationFieldDocumentLinkItem,
  ResourceTemplateDocumentLinkItem,
} from "@/lib/documents/types";

/**
 * Lists persisted application-field document links for the current student.
 *
 * Each link pairs a `contextKey` (e.g. "sop_1") with the actual `Document`
 * stored in the vault.
 */
export async function listApplicationFieldDocumentLinks(): Promise<
  ActionResult<ApplicationFieldDocumentLinkItem[]>
> {
  try {
    const { studentProfile } = await getCurrentStudentContext();

    const links = await prisma.documentLink.findMany({
      where: {
        studentId: studentProfile.id,
        contextType: "APPLICATION_FIELD",
      },
      include: { document: true },
    });

    return {
      success: true,
      data: links.map((link) => ({
        contextKey: link.contextKey,
        document: mapDocumentToReference(link.document),
      })),
    };
  } catch (error) {
    console.error("[links:listApplicationFieldDocumentLinks]", error);
    return {
      success: false,
      error: "Failed to load application field document links.",
    };
  }
}

/**
 * Lists persisted resource-template document links for the current student.
 */
export async function listResourceTemplateDocumentLinks(): Promise<
  ActionResult<ResourceTemplateDocumentLinkItem[]>
> {
  try {
    const { studentProfile } = await getCurrentStudentContext();

    const links = await prisma.documentLink.findMany({
      where: {
        studentId: studentProfile.id,
        contextType: "RESOURCE_TEMPLATE",
      },
      include: { document: true },
    });

    return {
      success: true,
      data: links.map((link) => ({
        contextKey: link.contextKey,
        document: mapDocumentToReference(link.document),
      })),
    };
  } catch (error) {
    console.error("[links:listResourceTemplateDocumentLinks]", error);
    return {
      success: false,
      error: "Failed to load resource template document links.",
    };
  }
}
