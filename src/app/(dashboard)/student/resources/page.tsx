import { requireRole } from "@/lib/auth";
import { ROLES } from "@/lib/constants";
import StudentResourcesGallery from "@/components/dashboard/student/StudentResourcesGallery";
import DashboardPageHeader from "@/components/dashboard/shared/DashboardPageHeader";
import { studentResourceCategories } from "@/data/student-resource-categories";

export default async function StudentResourcesPage() {
  await requireRole([ROLES.STUDENT]);

  return (
    <div className="space-y-8">
      <DashboardPageHeader
        title="Student Resources"
        description="Browse resource categories to explore template collections for SOPs, recommendation letters, and affidavit documents."
      />

      <StudentResourcesGallery categories={studentResourceCategories} />
    </div>
  );
}
