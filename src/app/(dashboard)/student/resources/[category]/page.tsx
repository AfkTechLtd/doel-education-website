import { notFound } from "next/navigation";
import { listStudentResourceTemplatesByCategory } from "@/actions/resources";
import StudentCategoryTemplateGallery from "@/components/dashboard/student/StudentCategoryTemplateGallery";
import DashboardPageHeader from "@/components/dashboard/shared/DashboardPageHeader";
import { requireRole } from "@/lib/auth";
import { ROLES } from "@/lib/constants";

export default async function StudentResourceCategoryPage({
  params,
}: {
  params: Promise<{ category: string }>;
}) {
  await requireRole([ROLES.STUDENT]);

  const { category } = await params;
  const resourcesResult = await listStudentResourceTemplatesByCategory(category);

  if (!resourcesResult.success && resourcesResult.error === "Resource category not found.") {
    notFound();
  }

  if (!resourcesResult.success || !resourcesResult.data) {
    throw new Error(resourcesResult.error ?? "Failed to load resource templates.");
  }

  const { resource, templates } = resourcesResult.data;

  return (
    <div className="space-y-8">
      <DashboardPageHeader
        title={`${resource.title} Templates`}
        description={resource.description}
      />

      <StudentCategoryTemplateGallery
        templates={templates}
        placeholder={`Search ${resource.title} templates`}
      />
    </div>
  );
}
