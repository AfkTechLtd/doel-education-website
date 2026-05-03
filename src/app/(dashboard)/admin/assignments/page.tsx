import { Bell, GitBranch } from "lucide-react";
import { requireRole } from "@/lib/auth";
import { ROLES } from "@/lib/constants";
import { getStudentsForAssignment, getCounselors } from "@/actions/admin";
import DashboardPageHeader from "@/components/dashboard/shared/DashboardPageHeader";
import AssignmentManagement from "@/components/admin/AssignmentManagement";
import { prisma } from "@/lib/prisma";
import MarkNotificationsRead from "@/components/admin/MarkNotificationsRead";

export default async function AdminAssignmentsPage() {
  const admin = await requireRole([ROLES.ADMIN]);

  const [studentsResult, counselorsResult, pendingNotifications] = await Promise.all([
    getStudentsForAssignment(),
    getCounselors(),
    prisma.notification.findMany({
      where: {
        userId: admin.id,
        type: "SYSTEM",
        isRead: false,
      },
      orderBy: { createdAt: "desc" },
    }),
  ]);

  const students = studentsResult.success ? studentsResult.data : [];
  const counselors = counselorsResult.success ? counselorsResult.data : [];
  const unassignedCount = students.filter((s) => !s.counselor).length;

  return (
    <div className="space-y-8">
      <DashboardPageHeader
        title="Counselor Assignments"
        description="Assign students to counselors manually, or use auto-assign for round-robin distribution."
      />

      {/* New Student Notifications */}
      {pendingNotifications.length > 0 && (
        <div className="rounded-[1.75rem] border border-amber-200 bg-amber-50 p-5">
          <div className="flex items-start justify-between gap-4">
            <div className="flex items-start gap-3">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-amber-100">
                <Bell className="h-4 w-4 text-amber-700" />
              </div>
              <div>
                <p className="font-poppins text-sm font-semibold text-amber-900">
                  {pendingNotifications.length} new student{pendingNotifications.length > 1 ? "s" : ""} awaiting assignment
                </p>
                <ul className="mt-2 space-y-1">
                  {pendingNotifications.slice(0, 5).map((n) => (
                    <li key={n.id} className="font-inter text-xs text-amber-800">
                      • {n.body}
                    </li>
                  ))}
                  {pendingNotifications.length > 5 && (
                    <li className="font-inter text-xs text-amber-700">
                      + {pendingNotifications.length - 5} more
                    </li>
                  )}
                </ul>
              </div>
            </div>
            <MarkNotificationsRead
              notificationIds={pendingNotifications.map((n) => n.id)}
            />
          </div>
        </div>
      )}

      {/* Summary row */}
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
        <div className="rounded-2xl border border-slate-200 bg-white px-5 py-4 shadow-sm">
          <p className="font-inter text-[10px] font-semibold uppercase tracking-widest text-slate-400">
            Total Students
          </p>
          <p className="mt-1 font-poppins text-3xl font-semibold tabular-nums text-slate-900">
            {students.length}
          </p>
        </div>
        <div className="rounded-2xl border border-amber-200 bg-amber-50 px-5 py-4 shadow-sm">
          <p className="font-inter text-[10px] font-semibold uppercase tracking-widest text-amber-600">
            Unassigned
          </p>
          <p className="mt-1 font-poppins text-3xl font-semibold tabular-nums text-amber-700">
            {unassignedCount}
          </p>
        </div>
        <div className="rounded-2xl border border-slate-200 bg-white px-5 py-4 shadow-sm">
          <p className="font-inter text-[10px] font-semibold uppercase tracking-widest text-slate-400">
            Active Counselors
          </p>
          <p className="mt-1 font-poppins text-3xl font-semibold tabular-nums text-primary">
            {counselors.length}
          </p>
        </div>
      </div>

      {counselors.length === 0 ? (
        <div className="flex flex-col items-center justify-center gap-4 rounded-[1.75rem] border border-slate-200 bg-white py-16 text-center shadow-sm">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-slate-100">
            <GitBranch className="h-7 w-7 text-slate-400" />
          </div>
          <div>
            <p className="font-poppins text-lg font-semibold text-slate-700">No counselors yet</p>
            <p className="mt-1 font-inter text-sm text-slate-400">
              Create counselor accounts in the Users section first.
            </p>
          </div>
        </div>
      ) : (
        <AssignmentManagement students={students} counselors={counselors} />
      )}
    </div>
  );
}
