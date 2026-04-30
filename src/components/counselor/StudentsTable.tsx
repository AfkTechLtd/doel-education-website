"use client";

import { useState } from "react";
import Link from "next/link";
import { Search, ChevronRight, FileText, CheckCircle2, XCircle, Clock } from "lucide-react";
import { cn } from "@/lib/utils";
import { KANBAN_STAGE_LABELS, APPLICATION_STATUS_LABELS } from "@/lib/constants";
import DashboardStatusBadge from "@/components/dashboard/shared/DashboardStatusBadge";
import type { getMyStudents } from "@/actions/counselor";

type Student = NonNullable<Awaited<ReturnType<typeof getMyStudents>>["data"]>[number];

interface StudentsTableProps {
  students: Student[];
}

function DocumentSummary({ documents }: { documents: Student["documents"] }) {
  if (documents.length === 0) {
    return <span className="font-inter text-xs text-slate-400">No documents</span>;
  }

  return (
    <div className="flex items-center gap-2">
      <span className="flex items-center gap-1 font-inter text-xs text-slate-500">
        <FileText className="h-3.5 w-3.5" />
        {documents.length} docs
      </span>
    </div>
  );
}

export default function StudentsTable({ students }: StudentsTableProps) {
  const [query, setQuery] = useState("");
  const [stageFilter, setStageFilter] = useState("ALL");

  const filtered = students.filter((s) => {
    const matchesQuery =
      query === "" ||
       s.user.name.toLowerCase().includes(query.toLowerCase()) ||
       s.user.email.toLowerCase().includes(query.toLowerCase()) ||
       (s.application?.degreeProgram ?? "").toLowerCase().includes(query.toLowerCase());

    const matchesStage = stageFilter === "ALL" || s.kanbanStage === stageFilter;

    return matchesQuery && matchesStage;
  });

  return (
    <div className="rounded-[1.75rem] border border-slate-200 bg-white shadow-sm">
      {/* Toolbar */}
      <div className="flex flex-wrap items-center gap-3 border-b border-slate-100 px-6 py-4">
        <div className="relative min-w-0 flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Search by name, email, or program…"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full rounded-xl border border-slate-200 bg-slate-50 py-2 pl-9 pr-4 font-inter text-sm text-slate-900 placeholder:text-slate-400 focus:border-primary/40 focus:outline-none focus:ring-2 focus:ring-primary/15"
          />
        </div>
        <select
          value={stageFilter}
          onChange={(e) => setStageFilter(e.target.value)}
          className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 font-inter text-sm text-slate-700 focus:border-primary/40 focus:outline-none focus:ring-2 focus:ring-primary/15"
          aria-label="Filter by kanban stage"
        >
          <option value="ALL">All Stages</option>
          {Object.entries(KANBAN_STAGE_LABELS).map(([value, label]) => (
            <option key={value} value={value}>
              {label}
            </option>
          ))}
        </select>
        <span className="whitespace-nowrap font-inter text-xs text-slate-400">
          {filtered.length} of {students.length} students
        </span>
      </div>

      {/* Table */}
      {filtered.length === 0 ? (
        <div className="flex flex-col items-center justify-center gap-3 py-16 text-center">
          <FileText className="h-10 w-10 text-slate-300" />
          <p className="font-inter text-sm text-slate-500">No students match your search.</p>
        </div>
      ) : (
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
                  Documents
                </th>
                <th className="px-4 py-3 font-inter text-[10px] font-semibold uppercase tracking-widest text-slate-400">
                  Program
                </th>
                <th className="px-4 py-3" />
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {filtered.map((student) => (
                <tr
                  key={student.id}
                  className="group transition-colors hover:bg-slate-50/70"
                >
                  <td className="px-6 py-4">
                    <div>
                      <p className="font-inter text-sm font-medium text-slate-900">
                        {student.user.name}
                      </p>
                      <p className="font-inter text-xs text-slate-400">{student.user.email}</p>
                    </div>
                  </td>
                  <td className="px-4 py-4">
                    <DashboardStatusBadge
                      status={KANBAN_STAGE_LABELS[student.kanbanStage] ?? student.kanbanStage}
                    />
                  </td>
                  <td className="px-4 py-4">
                    {student.application ? (
                      <div className="space-y-1">
                        <DashboardStatusBadge
                          status={
                            APPLICATION_STATUS_LABELS[student.application.status] ??
                            student.application.status
                          }
                        />
                        <p className="font-inter text-[11px] text-slate-400">
                          {APPLICATION_STATUS_LABELS[student.application.status] ?? student.application.status}
                        </p>
                      </div>
                    ) : (
                      <span className="font-inter text-xs text-slate-400">Not started</span>
                    )}
                  </td>
                  <td className="px-4 py-4">
                    <DocumentSummary documents={student.documents} />
                  </td>
                  <td className="px-4 py-4">
                    <p className="max-w-[160px] truncate font-inter text-xs text-slate-600">
                       {student.application?.degreeProgram ?? (
                        <span className="text-slate-400">—</span>
                      )}
                    </p>
                  </td>
                  <td className="px-4 py-4">
                    <Link
                      href={`/counselor/students/${student.id}`}
                      className={cn(
                        "flex h-8 w-8 items-center justify-center rounded-xl bg-slate-100 text-slate-500 transition-colors",
                        "hover:bg-primary/10 hover:text-primary",
                      )}
                      aria-label={`View details for ${student.user.name}`}
                    >
                      <ChevronRight className="h-4 w-4" />
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
