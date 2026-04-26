"use server";

import type { Resource, ResourceTemplate } from "@prisma/client";
import { createClient as createSupabaseServerClient } from "@/lib/supabase/server";
import { requireRole } from "@/lib/auth";
import { ROLES } from "@/lib/constants";
import { getCurrentStudentContext } from "@/lib/documents/ownership";
import type { SelectedDocumentReference } from "@/lib/documents/types";
import { prisma } from "@/lib/prisma";
import {
  normalizeStudentResourceTemplateType,
  type StudentResourceCategoryRecord,
  type StudentResourceCategoryTemplatesPayload,
  type StudentResourceTemplateDetailPayload,
  type StudentResourceTemplateRecord,
} from "@/lib/resources/types";

type ActionResult<T> = {
  success: boolean;
  error?: string;
  data?: T;
};

type ResourceSummary = Pick<Resource, "id" | "slug" | "name" | "description" | "type">;

type ResourceTemplateSummary = Pick<
  ResourceTemplate,
  "id" | "slug" | "title" | "description" | "type" | "content" | "isPublic" | "createdAt" | "updatedAt"
>;

function mapResource(resource: ResourceSummary): StudentResourceCategoryRecord {
  return {
    id: resource.id,
    slug: resource.slug,
    title: resource.name,
    description: resource.description ?? "",
    type: resource.type,
  };
}

function mapTemplate(
  template: ResourceTemplateSummary,
  resource: ResourceSummary,
): StudentResourceTemplateRecord {
  return {
    id: template.id,
    slug: template.slug ?? template.id,
    categoryId: resource.slug,
    resourceId: resource.id,
    title: template.title,
    description: template.description,
    type: normalizeStudentResourceTemplateType(template.type, resource.type),
    content: template.content,
    fileUrl: null, // Never expose raw fileUrl; use getResourceTemplateSignedUrl
    isPublic: template.isPublic,
    createdAt: template.createdAt.toISOString(),
    updatedAt: template.updatedAt.toISOString(),
  };
}

function mapLinkedDocument(document: {
  id: string;
  name: string;
  type: string;
  bucket: string | null;
  storagePath: string | null;
  mimeType: string | null;
  sizeBytes: number | null;
  status: string;
}): SelectedDocumentReference {
  return {
    id: document.id,
    name: document.name,
    type: document.type,
    bucket: document.bucket,
    storagePath: document.storagePath,
    mimeType: document.mimeType,
    sizeBytes: document.sizeBytes,
    status: document.status as SelectedDocumentReference["status"],
  };
}

/**
 * Attempts to extract a Supabase storage bucket and path from a fileUrl.
 * Supports public and signed object URLs.
 */
function extractSupabaseStoragePath(fileUrl: string): { bucket: string; path: string } | null {
  try {
    const url = new URL(fileUrl);
    const pathname = url.pathname;

    // Pattern: /storage/v1/object/public/{bucket}/{path}
    const publicMatch = pathname.match(/\/storage\/v1\/object\/public\/([^/]+)\/(.+)/);
    if (publicMatch) {
      return { bucket: publicMatch[1], path: publicMatch[2] };
    }

    // Pattern: /storage/v1/object/sign/{bucket}/{path}
    const signMatch = pathname.match(/\/storage\/v1\/object\/sign\/([^/]+)\/(.+)/);
    if (signMatch) {
      return { bucket: signMatch[1], path: signMatch[2] };
    }

    return null;
  } catch {
    return null;
  }
}

export async function listStudentResources(): Promise<ActionResult<StudentResourceCategoryRecord[]>> {
  await requireRole([ROLES.STUDENT]);

  try {
    const resources = await prisma.resource.findMany({
      where: { isActive: true },
      select: {
        id: true,
        slug: true,
        name: true,
        description: true,
        type: true,
      },
      orderBy: [{ name: "asc" }],
    });

    return {
      success: true,
      data: resources.map(mapResource),
    };
  } catch (error) {
    console.error("[resources:listStudentResources]", error);
    return {
      success: false,
      error: "Failed to load resource categories.",
    };
  }
}

export async function listStudentResourceTemplatesByCategory(
  categorySlug: string,
): Promise<ActionResult<StudentResourceCategoryTemplatesPayload>> {
  await requireRole([ROLES.STUDENT]);

  const normalizedCategorySlug = categorySlug.trim().toLowerCase();

  if (!normalizedCategorySlug) {
    return {
      success: false,
      error: "Resource category is missing.",
    };
  }

  try {
    const resource = await prisma.resource.findFirst({
      where: {
        slug: {
          equals: normalizedCategorySlug,
          mode: "insensitive",
        },
        isActive: true,
      },
      select: {
        id: true,
        slug: true,
        name: true,
        description: true,
        type: true,
        templates: {
          where: { isPublic: true },
          select: {
            id: true,
            slug: true,
            title: true,
            description: true,
            type: true,
            content: true,
            isPublic: true,
            createdAt: true,
            updatedAt: true,
          },
          orderBy: [{ updatedAt: "desc" }, { title: "asc" }],
        },
      },
    });

    if (!resource) {
      return {
        success: false,
        error: "Resource category not found.",
      };
    }

    return {
      success: true,
      data: {
        resource: mapResource(resource),
        templates: resource.templates.map((template) => mapTemplate(template, resource)),
      },
    };
  } catch (error) {
    console.error("[resources:listStudentResourceTemplatesByCategory]", error);
    return {
      success: false,
      error: "Failed to load resource templates.",
    };
  }
}

export async function getStudentResourceTemplateDetail(
  categorySlug: string,
  templateSlug: string,
): Promise<ActionResult<StudentResourceTemplateDetailPayload>> {
  await requireRole([ROLES.STUDENT]);

  const normalizedCategorySlug = categorySlug.trim().toLowerCase();
  const normalizedTemplateSlug = templateSlug.trim().toLowerCase();

  if (!normalizedCategorySlug || !normalizedTemplateSlug) {
    return {
      success: false,
      error: "Resource template details are missing.",
    };
  }

  try {
    const { studentProfile } = await getCurrentStudentContext();

    // First resolve the resource by slug (case-insensitive)
    const resource = await prisma.resource.findFirst({
      where: {
        slug: {
          equals: normalizedCategorySlug,
          mode: "insensitive",
        },
        isActive: true,
      },
      select: { id: true, slug: true, name: true, description: true, type: true },
    });

    if (!resource) {
      return {
        success: false,
        error: "Resource template not found.",
      };
    }

    const template = await prisma.resourceTemplate.findFirst({
      where: {
        slug: {
          equals: normalizedTemplateSlug,
          mode: "insensitive",
        },
        isPublic: true,
        resourceId: resource.id,
      },
      select: {
        id: true,
        slug: true,
        title: true,
        description: true,
        type: true,
        content: true,
        isPublic: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    if (!template) {
      return {
        success: false,
        error: "Resource template not found.",
      };
    }

    const resourceTemplateLink = await prisma.documentLink.findUnique({
      where: {
        studentId_contextType_contextKey: {
          studentId: studentProfile.id,
          contextType: "RESOURCE_TEMPLATE",
          contextKey: template.id,
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
            status: true,
          },
        },
      },
    });

    return {
      success: true,
      data: {
        resource: mapResource(resource),
        template: mapTemplate(template, resource),
        linkedDocument: resourceTemplateLink?.document
          ? mapLinkedDocument(resourceTemplateLink.document)
          : null,
      },
    };
  } catch (error) {
    console.error("[resources:getStudentResourceTemplateDetail]", error);
    return {
      success: false,
      error: "Failed to load resource template details.",
    };
  }
}

/**
 * Generates a short-lived signed URL for a resource template file.
 * Validates the template is public and its parent resource is active.
 */
export async function getResourceTemplateSignedUrl(
  categorySlug: string,
  templateSlug: string,
  ttlSeconds: number = 3600,
): Promise<ActionResult<{ signedUrl: string }>> {
  await requireRole([ROLES.STUDENT]);

  const normalizedCategorySlug = categorySlug.trim().toLowerCase();
  const normalizedTemplateSlug = templateSlug.trim().toLowerCase();

  if (!normalizedCategorySlug || !normalizedTemplateSlug) {
    return {
      success: false,
      error: "Resource template details are missing.",
    };
  }

  try {
    const resource = await prisma.resource.findFirst({
      where: {
        slug: {
          equals: normalizedCategorySlug,
          mode: "insensitive",
        },
        isActive: true,
      },
      select: { id: true },
    });

    if (!resource) {
      return {
        success: false,
        error: "Resource template not found.",
      };
    }

    const template = await prisma.resourceTemplate.findFirst({
      where: {
        slug: {
          equals: normalizedTemplateSlug,
          mode: "insensitive",
        },
        isPublic: true,
        resourceId: resource.id,
      },
      select: { fileUrl: true },
    });

    if (!template || !template.fileUrl) {
      return {
        success: false,
        error: "Resource file not found.",
      };
    }

    const extracted = extractSupabaseStoragePath(template.fileUrl);

    if (extracted) {
      const supabase = await createSupabaseServerClient();
      const { data, error } = await supabase.storage
        .from(extracted.bucket)
        .createSignedUrl(extracted.path, ttlSeconds);

      if (error || !data?.signedUrl) {
        console.error("[resources:getResourceTemplateSignedUrl:storage]", error);
        return {
          success: false,
          error: "Failed to generate file access link.",
        };
      }

      return {
        success: true,
        data: { signedUrl: data.signedUrl },
      };
    }

    // Fallback for non-Supabase URLs (external links)
    return {
      success: true,
      data: { signedUrl: template.fileUrl },
    };
  } catch (error) {
    console.error("[resources:getResourceTemplateSignedUrl]", error);
    return {
      success: false,
      error: "Failed to generate file access link.",
    };
  }
}
