"use client";

import { useState, useTransition } from "react";
import { CheckCircle2, XCircle, Clock, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { updateDocumentStatus } from "@/actions/counselor";
import type { DocumentStatus } from "@prisma/client";

interface DocumentStatusUpdaterProps {
  documentId: string;
  currentStatus: DocumentStatus;
  documentName: string;
}

const STATUS_CONFIG: Record<
  DocumentStatus,
  { label: string; icon: typeof CheckCircle2; classes: string }
> = {
  PENDING: {
    label: "Pending",
    icon: Clock,
    classes: "border-amber-200 bg-amber-50 text-amber-700",
  },
  UPLOADED: {
    label: "Uploaded",
    icon: Clock,
    classes: "border-blue-200 bg-blue-50 text-blue-700",
  },
  VERIFIED: {
    label: "Verified",
    icon: CheckCircle2,
    classes: "border-emerald-200 bg-emerald-50 text-emerald-700",
  },
  REJECTED: {
    label: "Rejected",
    icon: XCircle,
    classes: "border-red-200 bg-red-50 text-red-700",
  },
};

export default function DocumentStatusUpdater({
  documentId,
  currentStatus,
  documentName,
}: DocumentStatusUpdaterProps) {
  const [status, setStatus] = useState<DocumentStatus>(currentStatus);
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  function handleChange(newStatus: DocumentStatus) {
    if (newStatus === status) return;
    setError(null);

    startTransition(async () => {
      const res = await updateDocumentStatus(documentId, newStatus);
      if (res.success) {
        setStatus(newStatus);
      } else {
        setError(res.error ?? "Failed to update");
      }
    });
  }

  const config = STATUS_CONFIG[status];
  const Icon = config.icon;

  return (
    <div className="flex items-center gap-2">
      {/* Current badge */}
      <span
        className={cn(
          "inline-flex shrink-0 items-center gap-1 whitespace-nowrap rounded-full border px-2 py-1 font-inter text-[10px] font-semibold leading-none",
          config.classes,
        )}
      >
        {isPending ? (
          <Loader2 className="h-3 w-3 animate-spin" />
        ) : (
          <Icon className="h-3 w-3" />
        )}
        {config.label}
      </span>

      {/* Action buttons */}
      {status !== "VERIFIED" && (
        <button
          type="button"
          onClick={() => handleChange("VERIFIED")}
          disabled={isPending}
          className="rounded-lg border border-emerald-200 bg-emerald-50 px-2 py-1 font-inter text-[10px] font-semibold text-emerald-700 transition-colors hover:bg-emerald-100 disabled:opacity-50"
          aria-label={`Verify document ${documentName}`}
        >
          Verify
        </button>
      )}
      {status !== "REJECTED" && status !== "VERIFIED" && (
        <button
          type="button"
          onClick={() => handleChange("REJECTED")}
          disabled={isPending}
          className="rounded-lg border border-red-200 bg-red-50 px-2 py-1 font-inter text-[10px] font-semibold text-red-700 transition-colors hover:bg-red-100 disabled:opacity-50"
          aria-label={`Reject document ${documentName}`}
        >
          Reject
        </button>
      )}
      {(status === "VERIFIED" || status === "REJECTED") && (
        <button
          type="button"
          onClick={() => handleChange("PENDING")}
          disabled={isPending}
          className="rounded-lg border border-slate-200 bg-slate-50 px-2 py-1 font-inter text-[10px] font-semibold text-slate-600 transition-colors hover:bg-slate-100 disabled:opacity-50"
          aria-label={`Reset status for document ${documentName}`}
        >
          Reset
        </button>
      )}

      {error && <p className="font-inter text-[10px] text-red-600">{error}</p>}
    </div>
  );
}
