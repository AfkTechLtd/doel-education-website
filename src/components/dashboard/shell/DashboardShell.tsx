"use client";

import { useState, type ReactNode } from "react";
import DashboardSidebar from "./DashboardSidebar";
import DashboardTopbar from "./DashboardTopbar";

export default function DashboardShell({ children }: { children: ReactNode }) {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="hidden lg:fixed lg:inset-y-0 lg:flex lg:w-72">
        <DashboardSidebar />
      </div>

      {mobileOpen ? (
        <div className="fixed inset-0 z-40 lg:hidden">
          <button
            type="button"
            onClick={() => setMobileOpen(false)}
            className="absolute inset-0 bg-slate-950/35"
            aria-label="Close dashboard sidebar overlay"
          />
          <div className="relative h-full w-[88vw] max-w-sm">
            <DashboardSidebar onClose={() => setMobileOpen(false)} />
          </div>
        </div>
      ) : null}

      <div className="lg:pl-72">
        <DashboardTopbar onOpenSidebar={() => setMobileOpen(true)} />
        <main className="px-4 py-6 sm:px-6 lg:px-8 lg:py-8">{children}</main>
      </div>
    </div>
  );
}
