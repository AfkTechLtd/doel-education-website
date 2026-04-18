import { requireRole } from "@/lib/auth";
import { ROLES } from "@/lib/constants";
import DashboardPageHeader from "@/components/dashboard/shared/DashboardPageHeader";
import DashboardPanel from "@/components/dashboard/shared/DashboardPanel";

export default async function CounselorDashboardPage() {
  await requireRole([ROLES.COUNSELOR]);

  return (
    <div className="space-y-8">
      <DashboardPageHeader
        title="Counselor Dashboard"
        description="Manage your students, track progress, and review applications."
      />

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-4">
        <DashboardPanel title="Active Students">
          <p className="font-inter text-2xl font-semibold text-slate-900">—</p>
          <p className="font-inter text-sm text-slate-500">Assigned to you</p>
        </DashboardPanel>

        <DashboardPanel title="Pending Reviews">
          <p className="font-inter text-2xl font-semibold text-slate-900">—</p>
          <p className="font-inter text-sm text-slate-500">Documents awaiting review</p>
        </DashboardPanel>

        <DashboardPanel title="Applications In Progress">
          <p className="font-inter text-2xl font-semibold text-slate-900">—</p>
          <p className="font-inter text-sm text-slate-500">Across all students</p>
        </DashboardPanel>

        <DashboardPanel title="Messages">
          <p className="font-inter text-2xl font-semibold text-slate-900">—</p>
          <p className="font-inter text-sm text-slate-500">Unread messages</p>
        </DashboardPanel>
      </div>
    </div>
  );
}
