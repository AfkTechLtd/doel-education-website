import type { ReactNode } from "react";

interface DashboardPanelProps {
  title: string;
  description?: string;
  action?: ReactNode;
  children: ReactNode;
}

export default function DashboardPanel({
  title,
  description,
  action,
  children,
}: DashboardPanelProps) {
  return (
    <section className="rounded-[1.75rem] border border-slate-200 bg-white p-6 shadow-sm">
      <div className="mb-5 flex flex-wrap items-start justify-between gap-4">
        <div>
          <h2 className="font-poppins text-xl font-semibold text-slate-900">
            {title}
          </h2>
          {description ? (
            <p className="mt-1 font-inter text-sm leading-relaxed text-slate-500">
              {description}
            </p>
          ) : null}
        </div>

        {action ? <div>{action}</div> : null}
      </div>

      {children}
    </section>
  );
}
