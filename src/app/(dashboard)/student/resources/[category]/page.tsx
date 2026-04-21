import { notFound } from "next/navigation";
import StudentCategoryTemplateGallery from "@/components/dashboard/student/StudentCategoryTemplateGallery";
import DashboardPageHeader from "@/components/dashboard/shared/DashboardPageHeader";
import { requireRole } from "@/lib/auth";
import { ROLES } from "@/lib/constants";
import { getResourceCategoryById } from "@/data/student-resource-categories";
import { getResourcesByCategory } from "@/data/student-resource-templates";

export default async function StudentResourceCategoryPage({
  params,
}: {
  params: Promise<{ category: string }>;
}) {
  await requireRole([ROLES.STUDENT]);

  const { category } = await params;
  const resourceCategory = getResourceCategoryById(category);

  if (!resourceCategory) {
    notFound();
  }

  const templates = getResourcesByCategory(resourceCategory.id);

  return (
    <div className="space-y-8">
      <DashboardPageHeader
        title={`${resourceCategory.title} Templates`}
        description={resourceCategory.description}
      />

      <StudentCategoryTemplateGallery
        templates={templates}
        placeholder={`Search ${resourceCategory.title} templates`}
      />
    </div>
  );
}
