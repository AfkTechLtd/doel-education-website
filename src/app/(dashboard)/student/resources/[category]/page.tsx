import { notFound } from "next/navigation";
import { getCachedResourceTemplatesByCategory } from "@/lib/data/resources";
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
  const payload = await getCachedResourceTemplatesByCategory(category);

  if (!payload) notFound();

  const { resource, templates } = payload;

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
