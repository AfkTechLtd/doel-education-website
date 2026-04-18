"use client";

import { Menu } from "lucide-react";

interface DashboardTopbarProps {
  onOpenSidebar: () => void;
}

export default function DashboardTopbar({
  onOpenSidebar,
}: DashboardTopbarProps) {
  return (
    <header className="sticky top-0 z-30 border-b border-slate-200 bg-white/90 backdrop-blur-sm">
      <div className="flex h-16 items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={onOpenSidebar}
            className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 text-slate-600 transition-colors hover:bg-slate-50 lg:hidden"
            aria-label="Open dashboard menu"
          >
            <Menu className="h-5 w-5" strokeWidth={2} aria-hidden="true" />
          </button>

          <div>
            <p className="font-inter text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">
              Dashboard
            </p>
          </div>
        </div>

        <div className="hidden h-10 w-10 rounded-xl bg-slate-50 lg:block" aria-hidden="true" />
      </div>
    </header>
  );
}
