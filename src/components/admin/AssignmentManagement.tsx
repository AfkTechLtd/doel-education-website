"use client";

import { useState, useTransition, useMemo } from "react";
import { Search, RefreshCw, Loader2 } from "lucide-react";
import { assignCounselor, unassignCounselor, autoAssignCounselors } from "@/actions/admin";
import { KANBAN_STAGE_LABELS, APPLICATION_STATUS_LABELS } from "@/lib/constants";
import DashboardStatusBadge from "@/components/dashboard/shared/DashboardStatusBadge";
import type { getStudentsForAssignment, getCounselors } from "@/actions/admin";

type StudentRow = NonNullable<
  Awaited<ReturnType<typeof getStudentsForAssignment>>["data"]
>[number];
type CounselorOption = NonNullable<Awaited<ReturnType<typeof getCounselors>>["data"]>[number];

interface AssignmentManagementProps {
  students: StudentRow[];
  counselors: CounselorOption[];
}

function CounselorSelector({
  student,
  counselors,
}: {
  student: StudentRow;
  counselors: CounselorOption[];
}) {
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);

  function handleAssign(counselorId: string) {
    setError(null);
    startTransition(async () => {
      const res =
        counselorId === "NONE"
          ? await unassignCounselor(student.id)
          : await assignCounselor(student.id, counselorId);

      if (!res.success) setError(res.error ?? "Failed");
    });
  }

  return (
    <div className="flex items-center gap-2">
      <select
        defaultValue={student.counselor?.id ?? "NONE"}
        onChange={(e) => handleAssign(e.target.value)}
        disabled={isPending}
        className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-1.5 font-inter text-sm text-slate-700 focus:border-primary/40 focus:outline-none focus:ring-2 focus:ring-primary/15 disabled:opacity-50"
        aria-label={`Assign counselor to ${student.user.name}`}
      >
        <option value="NONE">Unassigned</option>
        {counselors.map((c) => (
          <option key={c.id} value={c.id}>
            {c.name} ({c.counselorStudents.length})
          </option>
        ))}
      </select>
      {isPending && <Loader2 className="h-4 w-4 animate-spin text-slate-400" />}
      {error && <span className="font-inter text-[10px] text-red-600">{error}</span>}
    </div>
  );
}

export default function AssignmentManagement({
  students,
  counselors,
}: AssignmentManagementProps) {
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState<"ALL" | "ASSIGNED" | "UNASSIGNED">("ALL");
  const [autoIsPending, startAutoTransition] = useTransition();
  const [autoMessage, setAutoMessage] = useState<string | null>(null);

  const filtered = useMemo(() => {
    return students.filter((s) => {
      const matchesQuery =
        query === "" ||
        s.user.name.toLowerCase().includes(query.toLowerCase()) ||
        s.user.email.toLowerCase().includes(query.toLowerCase());

      const matchesFilter =
        filter === "ALL" ||
        (filter === "ASSIGNED" && s.counselor !== null) ||
        (filter === "UNASSIGNED" && s.counselor === null);

      return matchesQuery && matchesFilter;
    });
  }, [students, query, filter]);

  const unassignedCount = students.filter((s) => !s.counselor).length;

  function handleAutoAssign() {
    setAutoMessage(null);
    startAutoTransition(async () => {
      const res = await autoAssignCounselors();
      if (res.success) {
        setAutoMessage(
          res.count === 0
            ? "All students already assigned."
            : `Assigned ${res.count} student${res.count !== 1 ? "s" : ""}.`,
        );
      } else {
        setAutoMessage(res.error ?? "Failed to auto-assign");
      }
    });
  }

  return (
    <div className="space-y-4">
      {/* Toolbar */}
      <div className="flex flex-wrap items-center gap-3">
        <div className="relative min-w-0 flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Search students…"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full rounded-xl border border-slate-200 bg-slate-50 py-2 pl-9 pr-4 font-inter text-sm text-slate-900 placeholder:text-slate-400 focus:border-primary/40 focus:outline-none focus:ring-2 focus:ring-primary/15"
          />
        </div>

        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value as typeof filter)}
          className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 font-inter text-sm text-slate-700 focus:border-primary/40 focus:outline-none focus:ring-2 focus:ring-primary/15"
          aria-label="Filter by assignment status"
        >
          <option value="ALL">All Students</option>
          <option value="ASSIGNED">Assigned</option>
          <option value="UNASSIGNED">Unassigned ({unassignedCount})</option>
        </select>

        <button
          type="button"
          onClick={handleAutoAssign}
          disabled={autoIsPending || unassignedCount === 0}
          className="flex items-center gap-2 rounded-xl bg-primary px-4 py-2 font-inter text-sm font-semibold text-white transition-colors hover:bg-primary/90 disabled:opacity-50"
        >
          {autoIsPending ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <RefreshCw className="h-4 w-4" />
          )}
          Auto-assign ({unassignedCount})
        </button>
      </div>

      {autoMessage && (
        <p className="font-inter text-sm font-medium text-primary">{autoMessage}</p>
      )}

      {/* Table */}
      <div className="overflow-hidden rounded-[1.75rem] border border-slate-200 bg-white shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-slate-100">
                <th className="px-6 py-3 font-inter text-[10px] font-semibold uppercase tracking-widest text-slate-400">
                  Student
                </th>
                <th className="px-4 py-3 font-inter text-[10px] font-semibold uppercase tracking-widest text-slate-400">
                  Stage
                </th>
                <th className="px-4 py-3 font-inter text-[10px] font-semibold uppercase tracking-widest text-slate-400">
                  Application
                </th>
                <th className="px-4 py-3 font-inter text-[10px] font-semibold uppercase tracking-widest text-slate-400">
                  Docs
                </th>
                <th className="px-4 py-3 font-inter text-[10px] font-semibold uppercase tracking-widest text-slate-400">
                  Assigned Counselor
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={5} className="py-12 text-center font-inter text-sm text-slate-400">
                    No students found.
                  </td>
                </tr>
              ) : (
                filtered.map((student) => (
                  <tr key={student.id} className="transition-colors hover:bg-slate-50/70">
                    <td className="px-6 py-4">
                      <p className="font-inter text-sm font-medium text-slate-900">
                        {student.user.name}
                      </p>
                      <p className="font-inter text-xs text-slate-400">{student.user.email}</p>
                    </td>
                    <td className="px-4 py-4">
                      <DashboardStatusBadge
                        status={KANBAN_STAGE_LABELS[student.kanbanStage] ?? student.kanbanStage}
                      />
                    </td>
                    <td className="px-4 py-4">
                      {student.application ? (
                        <div className="space-y-0.5">
                          <DashboardStatusBadge
                            status={
                              APPLICATION_STATUS_LABELS[student.application.status] ??
                              student.application.status
                            }
                          />
                          <p className="font-inter text-[10px] text-slate-400">
                            {student.application.completedSections}/14 sections
                          </p>
                        </div>
                      ) : (
                        <span className="font-inter text-xs text-slate-400">—</span>
                      )}
                    </td>
                    <td className="px-4 py-4">
                      <span className="font-inter text-sm text-slate-600">
                        {student.documents.length}
                        <span className="ml-1 text-slate-400">
                          ({student.documents.filter((d) => d.status === "VERIFIED").length}✓)
                        </span>
                      </span>
                    </td>
                    <td className="px-4 py-4">
                      <CounselorSelector student={student} counselors={counselors} />
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
