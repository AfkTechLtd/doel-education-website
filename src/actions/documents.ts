"use server";

import type { Document } from "@prisma/client";
import { createClient as createSupabaseServerClient } from "@/lib/supabase/server";
import { STORAGE_BUCKETS } from "@/lib/constants";
import { studentDocumentRequirements } from "@/data/student-document-requirements";
import { findBestRequiredDocumentMatch } from "@/lib/documents/matching";
import { prisma } from "@/lib/prisma";
import { getCurrentStudentContext } from "@/lib/documents/ownership";
import type {
  ApplicationFieldDocumentLinkItem,
  DocumentLinkUsage,
  DocumentLinkContext,
  RequiredDocumentLinkItem,
  SelectedDocumentReference,
  StudentDocumentStatus,
  VaultDocumentListItem,
} from "@/lib/documents/types";

type ActionResult<T> = {
  success: boolean;
  error?: string;
  data?: T;
};

type CreateStudentDocumentRecordInput = {
  id: string;
  name: string;
  type: string;
  bucket?: string | null;
  storagePath?: string | null;
  mimeType?: string | null;
  sizeBytes?: number | null;
  source?: string | null;
  status?: StudentDocumentStatus;
};

function mapDocumentToVaultItem(document: Document): VaultDocumentListItem {
  const documentWithSource = document as Document & { source?: string | null };

  return {
    id: document.id,
    name: document.name,
    type: document.type,
    status: document.status as StudentDocumentStatus,
    bucket: document.bucket,
    storagePath: document.storagePath,
    mimeType: document.mimeType,
    sizeBytes: document.sizeBytes,
    notes: document.notes,
    uploadedAt: document.uploadedAt?.toISOString() ?? null,
    source: documentWithSource.source ?? null,
    matchState: "UNASSIGNED",
    matchedLabel: null,
  };
}

function mapDocumentToReference(document: Document): SelectedDocumentReference {
  return {
    id: document.id,
    name: document.name,
    type: document.type,
    bucket: document.bucket,
    storagePath: document.storagePath,
    mimeType: document.mimeType,
    sizeBytes: document.sizeBytes,
    status: document.status as StudentDocumentStatus,
  };
}

export async function listStudentDocuments(): Promise<ActionResult<VaultDocumentListItem[]>> {
  try {
    const { studentProfile } = await getCurrentStudentContext();

    const documents = await prisma.document.findMany({
      where: { studentId: studentProfile.id },
      orderBy: [{ uploadedAt: "desc" }, { createdAt: "desc" }],
    });

    return {
      success: true,
      data: documents.map(mapDocumentToVaultItem),
    };
  } catch (error) {
    console.error("[documents:listStudentDocuments]", error);
    return {
      success: false,
      error: "Failed to load your documents.",
    };
  }
}

export async function createStudentDocumentRecord(
  input: CreateStudentDocumentRecordInput,
): Promise<ActionResult<SelectedDocumentReference>> {
  try {
    const { studentProfile } = await getCurrentStudentContext();

    const document = await prisma.document.create({
      data: {
        id: input.id,
        studentId: studentProfile.id,
        name: input.name,
        type: input.type,
        status: (input.status ?? "PENDING") as never,
        ...(input.source ? ({ source: input.source } as object) : {}),
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
    console.error("[documents:createStudentDocumentRecord]", error);
    return {
      success: false,
      error: "Failed to save the uploaded document.",
    };
  }
}

export async function deleteStudentDocument(documentId: string): Promise<ActionResult<{ id: string }>> {
  try {
    const { studentProfile } = await getCurrentStudentContext();

    const document = await prisma.document.findFirst({
      where: {
        id: documentId,
        studentId: studentProfile.id,
      },
    });

    if (!document) {
      return {
        success: false,
        error: "Document not found.",
      };
    }

    const linkedCount = await prisma.documentLink.count({
      where: {
        studentId: studentProfile.id,
        documentId: document.id,
      },
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
        console.error("[documents:deleteStudentDocument:storage]", error);
        return {
          success: false,
          error: "Failed to remove the file from storage.",
        };
      }
    }

    await prisma.document.delete({
      where: { id: document.id },
    });

    return {
      success: true,
      data: { id: document.id },
    };
  } catch (error) {
    console.error("[documents:deleteStudentDocument]", error);
    return {
      success: false,
      error: "Failed to delete the document.",
    };
  }
}

export async function getDocumentLinkUsage(
  documentId: string,
): Promise<ActionResult<DocumentLinkUsage>> {
  try {
    const { studentProfile } = await getCurrentStudentContext();

    const document = await prisma.document.findFirst({
      where: {
        id: documentId,
        studentId: studentProfile.id,
      },
      select: { id: true },
    });

    if (!document) {
      return {
        success: false,
        error: "Document not found.",
      };
    }

    const links = await prisma.documentLink.findMany({
      where: {
        studentId: studentProfile.id,
        documentId: document.id,
      },
      select: {
        contextType: true,
        contextKey: true,
      },
      orderBy: {
        createdAt: "asc",
      },
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
    console.error("[documents:getDocumentLinkUsage]", error);
    return {
      success: false,
      error: "Failed to inspect document links.",
    };
  }
}

export async function hardDeleteStudentDocument(
  documentId: string,
): Promise<ActionResult<{ id: string; removedLinks: number }>> {
  try {
    const { studentProfile } = await getCurrentStudentContext();

    const document = await prisma.document.findFirst({
      where: {
        id: documentId,
        studentId: studentProfile.id,
      },
    });

    if (!document) {
      return {
        success: false,
        error: "Document not found.",
      };
    }

    const removedLinks = await prisma.documentLink.deleteMany({
      where: {
        studentId: studentProfile.id,
        documentId: document.id,
      },
    });

    const supabase = await createSupabaseServerClient();

    if (document.bucket && document.storagePath) {
      const { error } = await supabase.storage
        .from(document.bucket)
        .remove([document.storagePath]);

      if (error) {
        console.error("[documents:hardDeleteStudentDocument:storage]", error);
        return {
          success: false,
          error: "Failed to remove the file from storage.",
        };
      }
    }

    await prisma.document.delete({
      where: { id: document.id },
    });

    return {
      success: true,
      data: {
        id: document.id,
        removedLinks: removedLinks.count,
      },
    };
  } catch (error) {
    console.error("[documents:hardDeleteStudentDocument]", error);
    return {
      success: false,
      error: "Failed to hard delete the document.",
    };
  }
}

export async function listRequiredDocumentLinks(): Promise<ActionResult<RequiredDocumentLinkItem[]>> {
  try {
    const { studentProfile } = await getCurrentStudentContext();

    const links = await prisma.documentLink.findMany({
      where: {
        studentId: studentProfile.id,
        contextType: "REQUIRED_DOCUMENT",
      },
      include: {
        document: true,
      },
    });

    return {
      success: true,
      data: links.map((link) => ({
        contextKey: link.contextKey,
        document: {
          id: link.document.id,
          name: link.document.name,
          bucket: link.document.bucket,
          storagePath: link.document.storagePath,
          mimeType: link.document.mimeType,
          sizeBytes: link.document.sizeBytes,
          status: link.document.status as StudentDocumentStatus,
          type: link.document.type,
        },
      })),
    };
  } catch (error) {
    console.error("[documents:listRequiredDocumentLinks]", error);
    return {
      success: false,
      error: "Failed to load required document links.",
    };
  }
}

export async function setRequiredDocumentLink(
  contextKey: string,
  documentId: string,
): Promise<ActionResult<{ contextKey: string; documentId: string }>> {
  try {
    const { studentProfile } = await getCurrentStudentContext();

    const document = await prisma.document.findFirst({
      where: {
        id: documentId,
        studentId: studentProfile.id,
      },
      select: { id: true },
    });

    if (!document) {
      return {
        success: false,
        error: "Selected document was not found in your vault.",
      };
    }

    await prisma.documentLink.upsert({
      where: {
        studentId_contextType_contextKey: {
          studentId: studentProfile.id,
          contextType: "REQUIRED_DOCUMENT",
          contextKey,
        },
      },
      update: {
        documentId: document.id,
      },
      create: {
        studentId: studentProfile.id,
        documentId: document.id,
        contextType: "REQUIRED_DOCUMENT",
        contextKey,
      },
    });

    return {
      success: true,
      data: {
        contextKey,
        documentId: document.id,
      },
    };
  } catch (error) {
    console.error("[documents:setRequiredDocumentLink]", error);
    return {
      success: false,
      error: "Failed to link required document.",
    };
  }
}

export async function autoLinkRequiredDocumentByFileName(
  fileName: string,
  documentId: string,
): Promise<ActionResult<{ contextKey: string } | null>> {
  try {
    const { studentProfile } = await getCurrentStudentContext();

    const matchedRequirementId = findBestRequiredDocumentMatch(
      fileName,
      studentDocumentRequirements,
    );

    if (!matchedRequirementId) {
      return {
        success: true,
        data: null,
      };
    }

    const existingLink = await prisma.documentLink.findUnique({
      where: {
        studentId_contextType_contextKey: {
          studentId: studentProfile.id,
          contextType: "REQUIRED_DOCUMENT",
          contextKey: matchedRequirementId,
        },
      },
      select: { id: true },
    });

    if (existingLink) {
      return {
        success: true,
        data: null,
      };
    }

    await prisma.documentLink.create({
      data: {
        studentId: studentProfile.id,
        documentId,
        contextType: "REQUIRED_DOCUMENT",
        contextKey: matchedRequirementId,
      },
    });

    return {
      success: true,
      data: {
        contextKey: matchedRequirementId,
      },
    };
  } catch (error) {
    console.error("[documents:autoLinkRequiredDocumentByFileName]", error);
    return {
      success: false,
      error: "Failed to auto-link uploaded document.",
    };
  }
}

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
      include: {
        document: true,
      },
    });

    return {
      success: true,
      data: links.map((link) => ({
        contextKey: link.contextKey,
        document: mapDocumentToReference(link.document),
      })),
    };
  } catch (error) {
    console.error("[documents:listApplicationFieldDocumentLinks]", error);
    return {
      success: false,
      error: "Failed to load application field document links.",
    };
  }
}

export async function setApplicationFieldDocumentLink(
  contextKey: string,
  documentId: string,
): Promise<ActionResult<{ contextKey: string; documentId: string }>> {
  try {
    const { studentProfile } = await getCurrentStudentContext();

    const document = await prisma.document.findFirst({
      where: {
        id: documentId,
        studentId: studentProfile.id,
      },
      select: { id: true },
    });

    if (!document) {
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
      update: {
        documentId: document.id,
      },
      create: {
        studentId: studentProfile.id,
        documentId: document.id,
        contextType: "APPLICATION_FIELD",
        contextKey,
      },
    });

    return {
      success: true,
      data: {
        contextKey,
        documentId: document.id,
      },
    };
  } catch (error) {
    console.error("[documents:setApplicationFieldDocumentLink]", error);
    return {
      success: false,
      error: "Failed to link application field document.",
    };
  }
}

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
    console.error("[documents:removeDocumentLink]", error);
    return {
      success: false,
      error: "Failed to unlink document.",
    };
  }
}
