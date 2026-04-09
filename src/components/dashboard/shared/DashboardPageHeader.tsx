import type { ReactNode } from "react";

interface DashboardPageHeaderProps {
  title: string;
  description: string;
  action?: ReactNode;
}

export default function DashboardPageHeader({
  title,
  description,
  action,
}: DashboardPageHeaderProps) {
  return (
    <div className="flex flex-wrap items-start justify-between gap-4">
      <div className="space-y-2">
        <p className="font-inter text-[11px] font-semibold uppercase tracking-[0.22em] text-slate-400">
          Admin Overview
        </p>
        <h1 className="font-poppins text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">
          {title}
        </h1>
        <p className="max-w-2xl font-inter text-sm leading-relaxed text-slate-500 sm:text-base">
          {description}
        </p>
      </div>

      {action ? <div>{action}</div> : null}
    </div>
  );
}
