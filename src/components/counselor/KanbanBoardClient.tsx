"use client";

import dynamic from "next/dynamic";
import { Loader2 } from "lucide-react";
import type { getMyStudents } from "@/actions/counselor";

type Student = NonNullable<Awaited<ReturnType<typeof getMyStudents>>["data"]>[number];

// @hello-pangea/dnd requires browser APIs — must not render on the server
const KanbanBoard = dynamic(() => import("@/components/counselor/KanbanBoard"), {
  ssr: false,
  loading: () => (
    <div className="flex items-center justify-center py-16">
      <Loader2 className="h-6 w-6 animate-spin text-slate-300" />
    </div>
  ),
});

export default function KanbanBoardClient({ initialStudents }: { initialStudents: Student[] }) {
  return <KanbanBoard initialStudents={initialStudents} />;
}
