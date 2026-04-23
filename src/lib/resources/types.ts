import type { ResourceType } from "@prisma/client";
import type { SelectedDocumentReference } from "@/lib/documents/types";

export type StudentResourceTemplateType = ResourceType;

export type ResourceTemplateType = StudentResourceTemplateType;

export type StudentResourceCategoryRecord = {
  id: string;
  slug: string;
  title: string;
  description: string;
  type: StudentResourceTemplateType;
};

export type StudentResourceCategory = StudentResourceCategoryRecord;

export type StudentResourceTemplateRecord = {
  id: string;
  slug: string;
  categoryId: string;
  resourceId: string;
  title: string;
  description: string | null;
  type: StudentResourceTemplateType;
  content: string | null;
  fileUrl: string | null;
  isPublic: boolean;
  createdAt: string;
  updatedAt: string;
};

export type LocalResourceTemplate = StudentResourceTemplateRecord;

export type StudentResourceCategoryTemplatesPayload = {
  resource: StudentResourceCategoryRecord;
  templates: StudentResourceTemplateRecord[];
};

export type StudentResourceTemplateDetailPayload = {
  resource: StudentResourceCategoryRecord;
  template: StudentResourceTemplateRecord;
  linkedDocument: SelectedDocumentReference | null;
};

const RESOURCE_TEMPLATE_TYPES = ["SOP", "LOR", "AFFIDAVIT"] as const;

export function normalizeStudentResourceTemplateType(
  value: string,
  fallback: StudentResourceTemplateType,
): StudentResourceTemplateType {
  return RESOURCE_TEMPLATE_TYPES.includes(value as StudentResourceTemplateType)
    ? (value as StudentResourceTemplateType)
    : fallback;
}
