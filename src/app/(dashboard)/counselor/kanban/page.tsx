import { requireRole } from "@/lib/auth";
import { ROLES } from "@/lib/constants";
import { getMyStudents } from "@/actions/counselor";
import DashboardPageHeader from "@/components/dashboard/shared/DashboardPageHeader";
import KanbanBoardClient from "@/components/counselor/KanbanBoardClient";

export default async function CounselorKanbanPage() {
  await requireRole([ROLES.COUNSELOR]);
  const result = await getMyStudents();

  const students = result.success ? result.data : [];

  return (
    <div className="space-y-8">
      <DashboardPageHeader
        title="Kanban Board"
        description="Drag and drop students between stages to track their progress through the pipeline."
      />

      {/* Legend */}
      <div className="flex flex-wrap gap-3 font-inter text-xs text-slate-500">
        <span className="flex items-center gap-1.5">
          <span className="h-2.5 w-2.5 rounded-full bg-blue-400" />
          New Docs — student has unreviewed uploads
        </span>
        <span className="flex items-center gap-1.5">
          <span className="h-2.5 w-2.5 rounded-full bg-amber-400" />
          Pending — application incomplete
        </span>
        <span className="flex items-center gap-1.5">
          <span className="h-2.5 w-2.5 rounded-full bg-violet-400" />
          Applied — final submission locked
        </span>
        <span className="flex items-center gap-1.5">
          <span className="h-2.5 w-2.5 rounded-full bg-emerald-400" />
          Admitted — accepted by university
        </span>
        <span className="flex items-center gap-1.5">
          <span className="h-2.5 w-2.5 rounded-full bg-teal-400" />
          Visa Stage — visa processing
        </span>
      </div>

      {students.length === 0 ? (
        <div className="flex flex-col items-center justify-center gap-3 rounded-[1.75rem] border border-slate-200 bg-white py-20 text-center shadow-sm">
          <p className="font-poppins text-lg font-semibold text-slate-700">No students assigned</p>
          <p className="font-inter text-sm text-slate-400">
            Students will appear here once they are assigned to you by an admin.
          </p>
        </div>
      ) : (
        <KanbanBoardClient initialStudents={students} />
      )}

      {!result.success && (
        <p className="font-inter text-sm text-red-600">
          Error loading students. Please refresh the page.
        </p>
      )}
    </div>
  );
}
