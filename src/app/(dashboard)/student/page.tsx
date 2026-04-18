import { requireRole } from "@/lib/auth";
import { ROLES } from "@/lib/constants";
import DashboardPageHeader from "@/components/dashboard/shared/DashboardPageHeader";
import DashboardPanel from "@/components/dashboard/shared/DashboardPanel";

export default async function StudentDashboardPage() {
  const user = await requireRole([ROLES.STUDENT]);

  return (
    <div className="space-y-8">
      <DashboardPageHeader
        title={`Welcome, ${user.name}`}
        description="Track your application progress and manage your documents."
      />

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">
        <DashboardPanel title="Application Status">
          <p className="font-inter text-sm text-slate-500">
            Your application is not yet started.
          </p>
        </DashboardPanel>

        <DashboardPanel title="Documents">
          <p className="font-inter text-sm text-slate-500">
            No documents uploaded yet.
          </p>
        </DashboardPanel>

        <DashboardPanel title="Messages">
          <p className="font-inter text-sm text-slate-500">
            No messages yet.
          </p>
        </DashboardPanel>
      </div>
    </div>
  );
}
