import type { LucideIcon } from "lucide-react";
import DashboardAnimatedNumber from "./DashboardAnimatedNumber";

interface DashboardStatCardProps {
  label: string;
  value: number;
  note: string;
  trend: string;
  icon: LucideIcon;
}

export default function DashboardStatCard({
  label,
  value,
  note,
  trend,
  icon: Icon,
}: DashboardStatCardProps) {
  return (
    <article className="relative overflow-hidden rounded-[1.75rem] border border-slate-200 bg-white p-5 shadow-sm">
      <div className="absolute right-0 top-0 h-28 w-28 rounded-full bg-primary/5 blur-2xl" />

      <div className="relative z-10 space-y-4">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="font-inter text-[11px] font-semibold uppercase tracking-[0.2em] text-slate-400">
              {label}
            </p>
            <p className="mt-3 font-poppins text-3xl font-semibold tracking-tight text-slate-900">
              <span className="tabular-nums">
                <DashboardAnimatedNumber value={value} duration={1100} />
              </span>
            </p>
          </div>

          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/8 text-primary">
            <Icon className="h-5 w-5" strokeWidth={2} aria-hidden="true" />
          </div>
        </div>

        <div className="space-y-1.5">
          <p className="font-inter text-sm text-slate-500">{note}</p>
          <p className="font-inter text-sm font-semibold text-primary">{trend}</p>
        </div>
      </div>
    </article>
  );
}
