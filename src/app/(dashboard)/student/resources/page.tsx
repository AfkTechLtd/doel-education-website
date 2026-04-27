import { requireRole } from "@/lib/auth";
import { ROLES } from "@/lib/constants";
import { getCachedStudentResources } from "@/lib/data/resources";
import StudentResourcesGallery from "@/components/dashboard/student/StudentResourcesGallery";
import DashboardPageHeader from "@/components/dashboard/shared/DashboardPageHeader";

export default async function StudentResourcesPage() {
  await requireRole([ROLES.STUDENT]);
  const categories = await getCachedStudentResources();

  return (
    <div className="space-y-8">
      <DashboardPageHeader
        title="Student Resources"
        description="Browse resource categories to explore template collections for SOPs, recommendation letters, and affidavit documents."
      />

      <StudentResourcesGallery categories={categories} />
    </div>
  );
}
