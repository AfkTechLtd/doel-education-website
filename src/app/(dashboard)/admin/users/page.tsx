import { requireRole } from "@/lib/auth";
import { ROLES } from "@/lib/constants";
import { getUsers } from "@/actions/admin";
import DashboardPageHeader from "@/components/dashboard/shared/DashboardPageHeader";
import UserManagement from "@/components/admin/UserManagement";

export default async function AdminUsersPage() {
  await requireRole([ROLES.ADMIN]);

  const result = await getUsers();
  const users = result.success ? result.data : [];

  return (
    <div className="space-y-8">
      <DashboardPageHeader
        title="User Management"
        description="View all accounts, filter by role, and manage active status."
      />

      <UserManagement users={users} />

      {!result.success && (
        <p className="font-inter text-sm text-red-600">
          Error loading users. Please refresh the page.
        </p>
      )}
    </div>
  );
}
