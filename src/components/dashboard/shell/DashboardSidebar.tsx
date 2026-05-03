"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { LogOut, X } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  getNavItems,
  getSidebarLabel,
  getRoleLabel,
} from "./dashboard-nav";
import { createClient } from "@/lib/supabase/client";

interface DashboardSidebarProps {
  role: string;
  userName: string;
  userEmail: string;
  hasCounselor?: boolean;
  className?: string;
  onClose?: () => void;
}

function getInitials(name: string): string {
  return name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
}

export default function DashboardSidebar({
  role,
  userName,
  userEmail,
  hasCounselor = true,
  className,
  onClose,
}: DashboardSidebarProps) {
  const pathname = usePathname();
  const router = useRouter();
  const navItems = getNavItems(role);
  const sidebarLabel = getSidebarLabel(role);
  const roleLabel = getRoleLabel(role);
  const initials = getInitials(userName);

  async function handleLogout() {
    const supabase = createClient();
    await supabase.auth.signOut();
    // Clear role cookie so middleware doesn't redirect on next visit
    document.cookie = "doel-role=; path=/; max-age=0";
    const dest = role === "STUDENT" ? "/login" : "/staff-login";
    router.push(dest);
    router.refresh();
  }

  return (
    <aside
      className={cn(
        "flex h-full w-72 flex-col border-r border-slate-200 bg-white px-5 py-5 shadow-sm",
        className,
      )}
    >
      {/* Logo + portal label */}
      <div className="flex items-start justify-between gap-3">
        <Link href={navItems.find((i) => i.href)?.href ?? "/"} className="flex items-center gap-3">
          <div className="relative h-11 w-11 overflow-hidden rounded-2xl border border-slate-100 bg-slate-50">
            <Image
              src="/logo.svg"
              alt="Doel Education"
              fill
              className="object-cover object-top"
            />
          </div>
          <div>
            <p className="font-poppins text-lg font-semibold text-primary">Doel</p>
            <p className="font-inter text-[11px] uppercase tracking-[0.18em] text-slate-400">
              {sidebarLabel}
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

      {/* Navigation */}
      <nav className="mt-8 flex-1 space-y-1 overflow-y-auto">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = item.href ? pathname === item.href : false;
          const isLocked = item.requiresCounselor && !hasCounselor;

          return (
            <div key={item.label}>
              {/* Section divider */}
              {item.sectionLabel ? (
                <p className="mb-1 mt-4 px-4 font-inter text-[10px] font-semibold uppercase tracking-[0.2em] text-slate-400">
                  {item.sectionLabel}
                </p>
              ) : null}

              {item.href && !isLocked ? (
                <Link
                  href={item.href}
                  className={cn(
                    "flex items-center justify-between rounded-2xl px-4 py-3 font-inter text-sm font-medium transition-all duration-200",
                    isActive
                      ? "bg-primary/8 text-primary shadow-sm"
                      : "text-slate-600 hover:bg-slate-50 hover:text-slate-900",
                  )}
                >
                  <span className="flex items-center gap-3">
                    <Icon className="h-4 w-4 shrink-0" strokeWidth={2} aria-hidden="true" />
                    {item.label}
                  </span>
                </Link>
              ) : (
                <div
                  className={cn(
                    "flex items-center justify-between rounded-2xl px-4 py-3 font-inter text-sm font-medium",
                    isLocked ? "cursor-not-allowed text-slate-300" : "text-slate-400",
                  )}
                  title={isLocked ? "A counselor must be assigned before you can access this section" : undefined}
                >
                  <span className="flex items-center gap-3">
                    <Icon className="h-4 w-4 shrink-0" strokeWidth={2} aria-hidden="true" />
                    {item.label}
                  </span>
                  {item.comingSoon && !isLocked ? (
                    <span className="rounded-full border border-slate-200 bg-slate-50 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-[0.16em] text-slate-400">
                      Soon
                    </span>
                  ) : null}
                </div>
              )}
            </div>
          );
        })}
      </nav>

      {/* User card + logout */}
      {/* User card + logout */}
      <div className="mt-auto border-t border-slate-200 pt-4">
        <div className="flex items-center justify-between gap-2 rounded-2xl p-2 transition-colors hover:bg-slate-50">
          <div className="flex min-w-0 items-center gap-3">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary font-inter text-xs font-semibold text-white shadow-sm">
              {initials}
            </div>
            <div className="min-w-0">
              <p className="truncate font-inter text-sm font-semibold text-slate-900">
                {userName}
              </p>
              <p className="truncate font-inter text-xs text-slate-500">
                {userEmail}
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={handleLogout}
            title="Log out"
            className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-xl text-slate-400 transition-colors hover:bg-red-50 hover:text-red-600"
          >
            <LogOut className="h-4 w-4" strokeWidth={2} aria-hidden="true" />
          </button>
        </div>
      </div>


    </aside>
  );
}
