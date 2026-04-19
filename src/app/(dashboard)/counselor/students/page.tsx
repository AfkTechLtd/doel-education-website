import { Users } from "lucide-react";
import { requireRole } from "@/lib/auth";
import { ROLES } from "@/lib/constants";
import { getMyStudents } from "@/actions/counselor";
import DashboardPageHeader from "@/components/dashboard/shared/DashboardPageHeader";
import StudentsTable from "@/components/counselor/StudentsTable";

export default async function CounselorStudentsPage() {
  await requireRole([ROLES.COUNSELOR]);
  const result = await getMyStudents();

  const students = result.success ? result.data : [];

  return (
    <div className="space-y-8">
      <DashboardPageHeader
        title="My Students"
        description="View and manage all students assigned to you."
      />

      {/* Summary row */}
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
        {[
          { label: "Total", value: students.length, color: "text-slate-900" },
          {
            label: "New Docs",
            value: students.filter((s) => s.kanbanStage === "NEW_DOCS").length,
            color: "text-blue-700",
          },
          {
            label: "Applied",
            value: students.filter((s) => s.kanbanStage === "APPLIED").length,
            color: "text-violet-700",
          },
          {
            label: "Admitted",
            value: students.filter((s) => s.kanbanStage === "ADMITTED").length,
            color: "text-emerald-700",
          },
        ].map((stat) => (
          <div
            key={stat.label}
            className="rounded-2xl border border-slate-200 bg-white px-5 py-4 shadow-sm"
          >
            <p className="font-inter text-[10px] font-semibold uppercase tracking-widest text-slate-400">
              {stat.label}
            </p>
            <p className={`mt-1 font-poppins text-3xl font-semibold tabular-nums ${stat.color}`}>
              {stat.value}
            </p>
          </div>
        ))}
      </div>

      {students.length === 0 ? (
        <div className="flex flex-col items-center justify-center gap-4 rounded-[1.75rem] border border-slate-200 bg-white py-20 text-center shadow-sm">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-slate-100">
            <Users className="h-7 w-7 text-slate-400" />
          </div>
          <div>
            <p className="font-poppins text-lg font-semibold text-slate-700">No students yet</p>
            <p className="mt-1 font-inter text-sm text-slate-400">
              Students will appear here once an admin assigns them to you.
            </p>
          </div>
        </div>
      ) : (
        <StudentsTable students={students} />
      )}

      {!result.success && (
        <p className="font-inter text-sm text-red-600">
          Error loading students. Please refresh the page.
        </p>
      )}
    </div>
  );
}
