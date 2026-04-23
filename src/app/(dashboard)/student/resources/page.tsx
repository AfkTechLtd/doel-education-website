import { requireRole } from "@/lib/auth";
import { ROLES } from "@/lib/constants";
import { listStudentResources } from "@/actions/resources";
import StudentResourcesGallery from "@/components/dashboard/student/StudentResourcesGallery";
import DashboardPageHeader from "@/components/dashboard/shared/DashboardPageHeader";

export default async function StudentResourcesPage() {
  await requireRole([ROLES.STUDENT]);
  const resourcesResult = await listStudentResources();

  if (!resourcesResult.success) {
    throw new Error(resourcesResult.error ?? "Failed to load student resources.");
  }

  return (
    <div className="space-y-8">
      <DashboardPageHeader
        title="Student Resources"
        description="Browse resource categories to explore template collections for SOPs, recommendation letters, and affidavit documents."
      />

      <StudentResourcesGallery categories={resourcesResult.data ?? []} />
    </div>
  );
}
