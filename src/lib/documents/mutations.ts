import { prisma } from "@/lib/prisma";
import { createClient as createSupabaseServerClient } from "@/lib/supabase/server";
import { STORAGE_BUCKETS } from "@/lib/constants";
import { mapDocumentToReference } from "@/lib/documents/mappers";
import type {
  ActionResult,
  FinalizeDocumentUploadPayload,
  DeleteDocumentResult,
  HardDeleteDocumentResult,
} from "@/lib/documents/contracts";
import type { SelectedDocumentReference } from "@/lib/documents/types";

/**
 * Creates the database record for a file that has already been uploaded to
 * Supabase Storage.
 *
 * If the target `DocumentRequirement` already has a document, the old one is
 * atomically replaced:
 *   1) Remove the old storage object.
 *   2) Delete the old `Document` row.
 *   3) Create the new `Document` row.
 *
 * This keeps the requirement → document relationship strictly 1:1 as enforced
 * by the Prisma `@unique` on `Document.requirementId`.
 */
export async function finalizeStudentDocumentUpload(
  studentProfileId: string,
  input: FinalizeDocumentUploadPayload,
): Promise<ActionResult<SelectedDocumentReference>> {
  try {
    // Verify the requirement belongs to this student before mutating.
    const requirement = await prisma.documentRequirement.findFirst({
      where: { id: input.requirementId, studentId: studentProfileId },
      select: { id: true },
    });

    if (!requirement) {
      return {
        success: false,
        error: "Document requirement not found.",
      };
    }

    const supabase = await createSupabaseServerClient();

    // Auto-replace: if this requirement already has a document, delete it first.
    const existingDocument = await prisma.document.findUnique({
      where: { requirementId: input.requirementId },
    });

    if (existingDocument) {
      if (existingDocument.bucket && existingDocument.storagePath) {
        await supabase.storage
          .from(existingDocument.bucket)
          .remove([existingDocument.storagePath]);
      }
      await prisma.document.delete({
        where: { id: existingDocument.id },
      });
    }

    const document = await prisma.document.create({
      data: {
        id: input.id,
        studentId: studentProfileId,
        requirementId: input.requirementId,
        name: input.name,
        type: input.type,
        source: input.source ?? null,
        bucket: input.bucket ?? STORAGE_BUCKETS.DOCUMENTS,
        storagePath: input.storagePath ?? null,
        mimeType: input.mimeType ?? null,
        sizeBytes: input.sizeBytes ?? null,
        uploadedAt: new Date(),
      },
    });

    return {
      success: true,
      data: mapDocumentToReference(document),
    };
  } catch (error) {
    console.error("[mutations:finalizeStudentDocumentUpload]", error);
    return {
      success: false,
      error: "Failed to save the uploaded document.",
    };
  }
}

/**
 * Soft-deletes a vault document for the given student.
 *
 * A document can only be deleted when it is **not** linked to any application
 * context via `DocumentLink`.  Required-document relationships are handled by
 * the `Document.requirementId` relation and do **not** block this operation.
 */
export async function deleteStudentDocument(
  studentProfileId: string,
  documentId: string,
): Promise<ActionResult<DeleteDocumentResult>> {
  try {
    const document = await prisma.document.findFirst({
      where: { id: documentId, studentId: studentProfileId },
    });

    if (!document) {
      return { success: false, error: "Document not found." };
    }

    const linkedCount = await prisma.documentLink.count({
      where: { studentId: studentProfileId, documentId: document.id },
    });

    if (linkedCount > 0) {
      return {
        success: false,
        error: "This file is currently used in your application.",
      };
    }

    const supabase = await createSupabaseServerClient();

    if (document.bucket && document.storagePath) {
      const { error } = await supabase.storage
        .from(document.bucket)
        .remove([document.storagePath]);

      if (error) {
        console.error("[mutations:deleteStudentDocument:storage]", error);
        return {
          success: false,
          error: "Failed to remove the file from storage.",
        };
      }
    }

    await prisma.document.delete({ where: { id: document.id } });

    return { success: true, data: { id: document.id } };
  } catch (error) {
    console.error("[mutations:deleteStudentDocument]", error);
    return { success: false, error: "Failed to delete the document." };
  }
}

/**
 * Hard-deletes a vault document and **all** its `DocumentLink` rows.
 *
 * This is used when a document is actively linked to application fields or
 * resource templates and the user explicitly wants to unlink and delete it.
 */
export async function hardDeleteStudentDocument(
  studentProfileId: string,
  documentId: string,
): Promise<ActionResult<HardDeleteDocumentResult>> {
  try {
    const document = await prisma.document.findFirst({
      where: { id: documentId, studentId: studentProfileId },
    });

    if (!document) {
      return { success: false, error: "Document not found." };
    }

    const removedLinks = await prisma.documentLink.deleteMany({
      where: { studentId: studentProfileId, documentId: document.id },
    });

    const supabase = await createSupabaseServerClient();

    if (document.bucket && document.storagePath) {
      const { error } = await supabase.storage
        .from(document.bucket)
        .remove([document.storagePath]);

      if (error) {
        console.error("[mutations:hardDeleteStudentDocument:storage]", error);
        return {
          success: false,
          error: "Failed to remove the file from storage.",
        };
      }
    }

    await prisma.document.delete({ where: { id: document.id } });

    return {
      success: true,
      data: { id: document.id, removedLinks: removedLinks.count },
    };
  } catch (error) {
    console.error("[mutations:hardDeleteStudentDocument]", error);
    return {
      success: false,
      error: "Failed to hard delete the document.",
    };
  }
}
