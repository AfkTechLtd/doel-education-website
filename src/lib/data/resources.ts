import { unstable_cache } from "next/cache";
import { prisma } from "@/lib/prisma";
import {
  normalizeStudentResourceTemplateType,
  type StudentResourceCategoryRecord,
  type StudentResourceCategoryTemplatesPayload,
  type StudentResourceTemplateRecord,
} from "@/lib/resources/types";

// ─── Mappers ──────────────────────────────────────────────────────────────────

type ResourceRow = {
  id: string;
  slug: string;
  name: string;
  description: string | null;
  type: string;
};

type TemplateRow = {
  id: string;
  slug: string | null;
  title: string;
  description: string | null;
  type: string;
  content: string | null;
  fileUrl: string | null;
  isPublic: boolean;
  createdAt: Date;
  updatedAt: Date;
};

function mapResource(r: ResourceRow): StudentResourceCategoryRecord {
  return {
    id: r.id,
    slug: r.slug,
    title: r.name,
    description: r.description ?? "",
    type: r.type as StudentResourceCategoryRecord["type"],
  };
}

function mapTemplate(
  t: TemplateRow,
  resource: ResourceRow,
): StudentResourceTemplateRecord {
  return {
    id: t.id,
    slug: t.slug ?? t.id,
    categoryId: resource.slug,
    resourceId: resource.id,
    title: t.title,
    description: t.description,
    type: normalizeStudentResourceTemplateType(t.type, resource.type as StudentResourceCategoryRecord["type"]),
    content: t.content,
    fileUrl: t.fileUrl,
    isPublic: t.isPublic,
    createdAt: t.createdAt.toISOString(),
    updatedAt: t.updatedAt.toISOString(),
  };
}

// ─── Cached fetchers ───────────────────────────────────────────────────────────

/**
 * All active resource categories. Shared across all students.
 * Cached for 1 hour; tag: `resources`.
 */
export const getCachedStudentResources = unstable_cache(
  async (): Promise<StudentResourceCategoryRecord[]> => {
    const rows = await prisma.resource.findMany({
      where: { isActive: true },
      select: { id: true, slug: true, name: true, description: true, type: true },
      orderBy: [{ name: "asc" }],
    });
    return rows.map(mapResource);
  },
  ["student-resources"],
  { revalidate: 3600, tags: ["resources"] },
);

/**
 * All public templates for a given resource category slug.
 * Cached per category for 1 hour; tag: `resources`.
 */
export const getCachedResourceTemplatesByCategory = unstable_cache(
  async (
    categorySlug: string,
  ): Promise<StudentResourceCategoryTemplatesPayload | null> => {
    const resource = await prisma.resource.findFirst({
      where: { slug: categorySlug.trim().toLowerCase(), isActive: true },
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
            fileUrl: true,
            isPublic: true,
            createdAt: true,
            updatedAt: true,
          },
          orderBy: [{ updatedAt: "desc" }, { title: "asc" }],
        },
      },
    });

    if (!resource) return null;

    return {
      resource: mapResource(resource),
      templates: resource.templates.map((t) => mapTemplate(t, resource)),
    };
  },
  ["resource-templates-by-category"],
  { revalidate: 3600, tags: ["resources"] },
);

/**
 * Single template detail (template + resource category). Does NOT include the
 * student's linked document — fetch that separately with a user-keyed query.
 * Cached per (category, template) for 1 hour; tag: `resources`.
 */
export const getCachedResourceTemplateDetail = unstable_cache(
  async (
    categorySlug: string,
    templateSlug: string,
  ): Promise<{
    resource: StudentResourceCategoryRecord;
    template: StudentResourceTemplateRecord;
  } | null> => {
    const row = await prisma.resourceTemplate.findFirst({
      where: {
        slug: templateSlug.trim().toLowerCase(),
        isPublic: true,
        resource: { is: { slug: categorySlug.trim().toLowerCase(), isActive: true } },
      },
      select: {
        id: true,
        slug: true,
        title: true,
        description: true,
        type: true,
        content: true,
        fileUrl: true,
        isPublic: true,
        createdAt: true,
        updatedAt: true,
        resource: {
          select: { id: true, slug: true, name: true, description: true, type: true },
        },
      },
    });

    if (!row?.resource) return null;

    return {
      resource: mapResource(row.resource),
      template: mapTemplate(row, row.resource),
    };
  },
  ["resource-template-detail"],
  { revalidate: 3600, tags: ["resources"] },
);
