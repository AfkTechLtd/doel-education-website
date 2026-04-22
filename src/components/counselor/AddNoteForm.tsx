"use client";

import { useState, useTransition } from "react";
import { Send, Loader2 } from "lucide-react";
import { addCounselorNote } from "@/actions/counselor";
import type { CounselorNoteStage } from "@prisma/client";

const STAGE_OPTIONS: { value: CounselorNoteStage; label: string }[] = [
  { value: "INITIAL_CONSULTATION", label: "Initial Consultation" },
  { value: "DOCUMENT_COLLECTION", label: "Document Collection" },
  { value: "APPLICATION_PREP", label: "Application Prep" },
  { value: "SUBMISSION", label: "Submission" },
  { value: "VISA_PREP", label: "Visa Prep" },
  { value: "POST_ADMISSION", label: "Post Admission" },
  { value: "COMPLETED", label: "Completed" },
];

interface AddNoteFormProps {
  studentProfileId: string;
}

export default function AddNoteForm({ studentProfileId }: AddNoteFormProps) {
  const [stage, setStage] = useState<CounselorNoteStage>("DOCUMENT_COLLECTION");
  const [content, setContent] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [isPending, startTransition] = useTransition();

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!content.trim()) return;

    setError(null);
    setSuccess(false);

    startTransition(async () => {
      const res = await addCounselorNote(studentProfileId, stage, content.trim());
      if (res.success) {
        setContent("");
        setSuccess(true);
        setTimeout(() => setSuccess(false), 3000);
      } else {
        setError(res.error ?? "Failed to save note");
      }
    });
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <div className="flex gap-3">
        <div className="flex-1">
          <label htmlFor="note-stage" className="mb-1 block font-inter text-xs font-semibold text-slate-500">
            Stage
          </label>
          <select
            id="note-stage"
            value={stage}
            onChange={(e) => setStage(e.target.value as CounselorNoteStage)}
            className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 font-inter text-sm text-slate-700 focus:border-primary/40 focus:outline-none focus:ring-2 focus:ring-primary/15"
          >
            {STAGE_OPTIONS.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div>
        <label htmlFor="note-content" className="mb-1 block font-inter text-xs font-semibold text-slate-500">
          Note
        </label>
        <textarea
          id="note-content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          rows={3}
          placeholder="Add a note about this student's progress…"
          className="w-full resize-none rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 font-inter text-sm text-slate-900 placeholder:text-slate-400 focus:border-primary/40 focus:outline-none focus:ring-2 focus:ring-primary/15"
          required
        />
      </div>

      {error && <p className="font-inter text-xs text-red-600">{error}</p>}
      {success && (
        <p className="font-inter text-xs font-semibold text-emerald-600">Note saved.</p>
      )}

      <div className="flex justify-end">
        <button
          type="submit"
          disabled={isPending || !content.trim()}
          className="flex items-center gap-2 rounded-xl bg-primary px-4 py-2 font-inter text-sm font-semibold text-white transition-colors hover:bg-primary/90 disabled:opacity-50"
        >
          {isPending ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
          Save Note
        </button>
      </div>
    </form>
  );
}
