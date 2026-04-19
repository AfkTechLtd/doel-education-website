"use client";

import { useState } from "react";
import { DragDropContext, Droppable, Draggable, type DropResult } from "@hello-pangea/dnd";
import Link from "next/link";
import {
  CheckCircle2,
  Clock,
  XCircle,
  GripVertical,
  ExternalLink,
  Loader2,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { updateKanbanStage } from "@/actions/counselor";
import type { getMyStudents } from "@/actions/counselor";

type Student = NonNullable<Awaited<ReturnType<typeof getMyStudents>>["data"]>[number];

type KanbanStage = "NEW_DOCS" | "PENDING" | "APPLIED" | "ADMITTED" | "VISA_STAGE";

const COLUMNS: { id: KanbanStage; label: string; color: string; bg: string; border: string }[] = [
  {
    id: "NEW_DOCS",
    label: "New Docs",
    color: "text-blue-700",
    bg: "bg-blue-50",
    border: "border-blue-200",
  },
  {
    id: "PENDING",
    label: "Pending",
    color: "text-amber-700",
    bg: "bg-amber-50",
    border: "border-amber-200",
  },
  {
    id: "APPLIED",
    label: "Applied",
    color: "text-violet-700",
    bg: "bg-violet-50",
    border: "border-violet-200",
  },
  {
    id: "ADMITTED",
    label: "Admitted",
    color: "text-emerald-700",
    bg: "bg-emerald-50",
    border: "border-emerald-200",
  },
  {
    id: "VISA_STAGE",
    label: "Visa Stage",
    color: "text-teal-700",
    bg: "bg-teal-50",
    border: "border-teal-200",
  },
];

function StudentCard({
  student,
  index,
}: {
  student: Student;
  index: number;
}) {
  const pendingDocs = student.documents.filter(
    (d) => d.status === "PENDING" || d.status === "UPLOADED",
  ).length;
  const verifiedDocs = student.documents.filter((d) => d.status === "VERIFIED").length;
  const rejectedDocs = student.documents.filter((d) => d.status === "REJECTED").length;

  return (
    <Draggable draggableId={student.id} index={index}>
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          className={cn(
            "group relative rounded-2xl border border-slate-200 bg-white p-4 shadow-sm transition-shadow",
            snapshot.isDragging && "rotate-1 shadow-xl",
          )}
        >
          {/* Drag handle */}
          <div
            {...provided.dragHandleProps}
            className="absolute right-3 top-3 cursor-grab text-slate-300 opacity-0 transition-opacity group-hover:opacity-100 active:cursor-grabbing"
            aria-label="Drag to reorder"
          >
            <GripVertical className="h-4 w-4" />
          </div>

          <div className="space-y-3">
            {/* Student name + link */}
            <div className="pr-5">
              <p className="font-inter text-sm font-semibold text-slate-900 leading-snug">
                {student.user.name}
              </p>
              <p className="font-inter text-xs text-slate-400 truncate">{student.user.email}</p>
            </div>

            {/* Program */}
            {student.application?.intendedProgram && (
              <p className="truncate font-inter text-xs text-slate-600">
                {student.application.intendedProgram}
              </p>
            )}

            {/* Document counts */}
            {student.documents.length > 0 && (
              <div className="flex items-center gap-3 text-xs">
                {verifiedDocs > 0 && (
                  <span className="flex items-center gap-1 text-emerald-700">
                    <CheckCircle2 className="h-3.5 w-3.5" />
                    {verifiedDocs}
                  </span>
                )}
                {pendingDocs > 0 && (
                  <span className="flex items-center gap-1 text-amber-600">
                    <Clock className="h-3.5 w-3.5" />
                    {pendingDocs}
                  </span>
                )}
                {rejectedDocs > 0 && (
                  <span className="flex items-center gap-1 text-red-600">
                    <XCircle className="h-3.5 w-3.5" />
                    {rejectedDocs}
                  </span>
                )}
              </div>
            )}

            {/* App progress + link */}
            <div className="flex items-center justify-between">
              {student.application ? (
                <span className="font-inter text-[10px] text-slate-400">
                  {student.application.completedSections}/14 sections
                </span>
              ) : (
                <span className="font-inter text-[10px] text-slate-400">No application</span>
              )}
              <Link
                href={`/counselor/students/${student.id}`}
                className="flex items-center gap-1 font-inter text-[10px] font-semibold text-primary hover:underline"
                aria-label={`View details for ${student.user.name}`}
              >
                View <ExternalLink className="h-3 w-3" />
              </Link>
            </div>
          </div>
        </div>
      )}
    </Draggable>
  );
}

interface KanbanBoardProps {
  initialStudents: Student[];
}

type BoardState = Record<KanbanStage, Student[]>;

function buildBoard(students: Student[]): BoardState {
  const board: BoardState = {
    NEW_DOCS: [],
    PENDING: [],
    APPLIED: [],
    ADMITTED: [],
    VISA_STAGE: [],
  };
  for (const s of students) {
    const stage = s.kanbanStage as KanbanStage;
    if (board[stage]) board[stage].push(s);
    else board.PENDING.push(s);
  }
  return board;
}

export default function KanbanBoard({ initialStudents }: KanbanBoardProps) {
  const [board, setBoard] = useState<BoardState>(() => buildBoard(initialStudents));
  const [saving, setSaving] = useState<string | null>(null);

  async function handleDragEnd(result: DropResult) {
    const { source, destination, draggableId } = result;
    if (!destination) return;
    if (source.droppableId === destination.droppableId && source.index === destination.index) return;

    const srcCol = source.droppableId as KanbanStage;
    const dstCol = destination.droppableId as KanbanStage;

    // Optimistic update
    setBoard((prev) => {
      const next = {
        NEW_DOCS: [...prev.NEW_DOCS],
        PENDING: [...prev.PENDING],
        APPLIED: [...prev.APPLIED],
        ADMITTED: [...prev.ADMITTED],
        VISA_STAGE: [...prev.VISA_STAGE],
      };
      const [moved] = next[srcCol].splice(source.index, 1);
      next[dstCol].splice(destination.index, 0, moved);
      return next;
    });

    // Persist
    setSaving(draggableId);
    const res = await updateKanbanStage(draggableId, dstCol);
    setSaving(null);

    if (!res.success) {
      // Revert on error
      setBoard(buildBoard(initialStudents));
    }
  }

  return (
    <div className="relative">
      {saving && (
        <div className="absolute -top-8 right-0 flex items-center gap-1.5 font-inter text-xs text-slate-400">
          <Loader2 className="h-3 w-3 animate-spin" />
          Saving…
        </div>
      )}

      <DragDropContext onDragEnd={handleDragEnd}>
        <div className="flex gap-4 overflow-x-auto pb-4">
          {COLUMNS.map((col) => {
            const cards = board[col.id];
            return (
              <div key={col.id} className="flex w-72 flex-none flex-col gap-3">
                {/* Column header */}
                <div
                  className={cn(
                    "flex items-center justify-between rounded-2xl border px-4 py-2.5",
                    col.bg,
                    col.border,
                  )}
                >
                  <span className={cn("font-poppins text-sm font-semibold", col.color)}>
                    {col.label}
                  </span>
                  <span
                    className={cn(
                      "flex h-5 w-5 items-center justify-center rounded-full font-inter text-[11px] font-bold",
                      col.bg,
                      col.color,
                    )}
                  >
                    {cards.length}
                  </span>
                </div>

                {/* Droppable */}
                <Droppable droppableId={col.id}>
                  {(provided, snapshot) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.droppableProps}
                      className={cn(
                        "min-h-[120px] flex-1 space-y-3 rounded-2xl p-2 transition-colors",
                        snapshot.isDraggingOver && "bg-slate-100/80",
                      )}
                    >
                      {cards.length === 0 && !snapshot.isDraggingOver && (
                        <div className="flex items-center justify-center py-8">
                          <p className="font-inter text-xs text-slate-300">Drop students here</p>
                        </div>
                      )}
                      {cards.map((student, index) => (
                        <StudentCard key={student.id} student={student} index={index} />
                      ))}
                      {provided.placeholder}
                    </div>
                  )}
                </Droppable>
              </div>
            );
          })}
        </div>
      </DragDropContext>
    </div>
  );
}
