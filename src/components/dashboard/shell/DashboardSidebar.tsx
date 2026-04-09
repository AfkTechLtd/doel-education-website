"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { LogOut, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { dashboardNavItems } from "./dashboard-nav";
import { clearDashboardSession } from "@/lib/dashboard/session";

const adminProfile = {
  name: "Afnan Ferdousi",
  email: "afnanferdousi99@gmail.com",
  role: "Operations Admin",
  initials: "AF",
};

interface DashboardSidebarProps {
  className?: string;
  onClose?: () => void;
}

export default function DashboardSidebar({
  className,
  onClose,
}: DashboardSidebarProps) {
  const pathname = usePathname();
  const router = useRouter();

  return (
    <aside
      className={cn(
        "flex h-full w-72 flex-col border-r border-slate-200 bg-white px-5 py-5 shadow-sm",
        className,
      )}
    >
      <div className="flex items-start justify-between gap-3">
        <Link href="/dashboard" className="flex items-center gap-3">
          <div className="relative h-11 w-11 overflow-hidden rounded-2xl border border-slate-100 bg-slate-50">
            <Image src="/logo.svg" alt="Doel Education" fill className="object-cover object-top" />
          </div>
          <div>
            <p className="font-poppins text-lg font-semibold text-primary">Doel</p>
            <p className="font-inter text-[11px] uppercase tracking-[0.18em] text-slate-400">
              Admin Dashboard
            </p>
          </div>
        </Link>

        {onClose ? (
          <button
            type="button"
            onClick={onClose}
            className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 text-slate-500 transition-colors hover:bg-slate-50 lg:hidden"
            aria-label="Close dashboard menu"
          >
            <X className="h-5 w-5" strokeWidth={2} aria-hidden="true" />
          </button>
        ) : null}
      </div>

      <nav className="mt-8 flex-1 space-y-2">
        {dashboardNavItems.map((item) => {
          const Icon = item.icon;
          const isActive = item.href === pathname;

          if (item.href) {
            return (
              <Link
                key={item.label}
                href={item.href}
                className={cn(
                  "flex items-center justify-between rounded-2xl px-4 py-3 font-inter text-sm font-medium transition-all duration-200",
                  isActive
                    ? "bg-primary/8 text-primary shadow-sm"
                    : "text-slate-600 hover:bg-slate-50 hover:text-slate-900",
                )}
              >
                <span className="flex items-center gap-3">
                  <Icon className="h-4 w-4" strokeWidth={2} aria-hidden="true" />
                  {item.label}
                </span>
              </Link>
            );
          }

          return (
            <div
              key={item.label}
              className="flex items-center justify-between rounded-2xl px-4 py-3 font-inter text-sm font-medium text-slate-500"
            >
              <span className="flex items-center gap-3">
                <Icon className="h-4 w-4" strokeWidth={2} aria-hidden="true" />
                {item.label}
              </span>
              {item.comingSoon ? (
                <span className="rounded-full border border-slate-200 bg-slate-50 px-2 py-1 text-[10px] font-semibold uppercase tracking-[0.16em] text-slate-400">
                  Soon
                </span>
              ) : null}
            </div>
          );
        })}
      </nav>

      <div className="mt-6 border-t border-slate-200 pt-5">
        <div className="rounded-[1.5rem] border border-slate-200 bg-slate-50 p-4">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-primary text-sm font-semibold text-white">
              {adminProfile.initials}
            </div>
            <div className="min-w-0">
              <p className="truncate font-inter text-sm font-semibold text-slate-900">
                {adminProfile.name}
              </p>
              <p className="truncate font-inter text-xs text-slate-500">
                {adminProfile.email}
              </p>
              <p className="mt-1 font-inter text-[11px] uppercase tracking-[0.16em] text-slate-400">
                {adminProfile.role}
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={() => {
              clearDashboardSession();
              router.push("/login");
            }}
            className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-2xl border border-slate-200 bg-white px-4 py-3 font-inter text-sm font-semibold text-slate-600 transition-colors hover:border-red-200 hover:bg-red-50 hover:text-red-700"
          >
            <LogOut className="h-4 w-4" strokeWidth={2} aria-hidden="true" />
            Log out
          </button>
        </div>
      </div>

    </aside>
  );
}
