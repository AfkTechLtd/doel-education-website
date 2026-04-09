import { cn } from "@/lib/utils";

export default function DashboardStatusBadge({ status }: { status: string }) {
  const normalized = status.toLowerCase();

  const classes =
    normalized.includes("reject")
      ? "border-red-200 bg-red-50 text-red-700"
      : normalized.includes("verify") ||
          normalized.includes("admit") ||
          normalized.includes("enroll")
        ? "border-emerald-200 bg-emerald-50 text-emerald-700"
        : normalized.includes("review") ||
            normalized.includes("pending") ||
            normalized.includes("await") ||
            normalized.includes("visa")
          ? "border-amber-200 bg-amber-50 text-amber-700"
          : "border-primary/15 bg-primary/5 text-primary";

  return (
    <span
      className={cn(
        "inline-flex shrink-0 items-center whitespace-nowrap rounded-full border px-2 py-1 font-inter text-[10px] font-semibold leading-none",
        classes,
      )}
    >
      {status}
    </span>
  );
}
