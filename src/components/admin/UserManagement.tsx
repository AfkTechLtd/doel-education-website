"use client";

import { useState, useTransition, useMemo } from "react";
import { Search, Shield, ShieldOff, Loader2 } from "lucide-react";
import { toggleUserActive } from "@/actions/admin";
import DashboardStatusBadge from "@/components/dashboard/shared/DashboardStatusBadge";
import type { getUsers } from "@/actions/admin";

type UserRow = NonNullable<Awaited<ReturnType<typeof getUsers>>["data"]>[number];

const ROLE_LABELS: Record<string, string> = {
  STUDENT: "Student",
  COUNSELOR: "Counselor",
  ADMIN: "Admin",
};

function ToggleActiveButton({ user }: { user: UserRow }) {
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);

  function handleToggle() {
    setError(null);
    startTransition(async () => {
      const res = await toggleUserActive(user.id, !user.isActive);
      if (!res.success) setError(res.error ?? "Failed");
    });
  }

  return (
    <div className="flex items-center gap-2">
      <button
        type="button"
        onClick={handleToggle}
        disabled={isPending}
        className={
          user.isActive
            ? "flex items-center gap-1.5 rounded-xl border border-red-200 bg-red-50 px-3 py-1.5 font-inter text-xs font-semibold text-red-700 transition-colors hover:bg-red-100 disabled:opacity-50"
            : "flex items-center gap-1.5 rounded-xl border border-emerald-200 bg-emerald-50 px-3 py-1.5 font-inter text-xs font-semibold text-emerald-700 transition-colors hover:bg-emerald-100 disabled:opacity-50"
        }
        aria-label={user.isActive ? `Deactivate ${user.name}` : `Activate ${user.name}`}
      >
        {isPending ? (
          <Loader2 className="h-3.5 w-3.5 animate-spin" />
        ) : user.isActive ? (
          <ShieldOff className="h-3.5 w-3.5" />
        ) : (
          <Shield className="h-3.5 w-3.5" />
        )}
        {user.isActive ? "Deactivate" : "Activate"}
      </button>
      {error && <span className="font-inter text-[10px] text-red-600">{error}</span>}
    </div>
  );
}

interface UserManagementProps {
  users: UserRow[];
}

export default function UserManagement({ users }: UserManagementProps) {
  const [query, setQuery] = useState("");
  const [roleFilter, setRoleFilter] = useState("ALL");
  const [statusFilter, setStatusFilter] = useState("ALL");

  const filtered = useMemo(() => {
    return users.filter((u) => {
      const matchesQuery =
        query === "" ||
        u.name.toLowerCase().includes(query.toLowerCase()) ||
        u.email.toLowerCase().includes(query.toLowerCase());

      const matchesRole = roleFilter === "ALL" || u.role === roleFilter;

      const matchesStatus =
        statusFilter === "ALL" ||
        (statusFilter === "ACTIVE" && u.isActive) ||
        (statusFilter === "INACTIVE" && !u.isActive);

      return matchesQuery && matchesRole && matchesStatus;
    });
  }, [users, query, roleFilter, statusFilter]);

  const counts = {
    total: users.length,
    students: users.filter((u) => u.role === "STUDENT").length,
    counselors: users.filter((u) => u.role === "COUNSELOR").length,
    admins: users.filter((u) => u.role === "ADMIN").length,
  };

  return (
    <div className="space-y-4">
      {/* Summary */}
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
        {[
          { label: "Total Users", value: counts.total, color: "text-slate-900" },
          { label: "Students", value: counts.students, color: "text-primary" },
          { label: "Counselors", value: counts.counselors, color: "text-violet-700" },
          { label: "Admins", value: counts.admins, color: "text-amber-700" },
        ].map((stat) => (
          <div
            key={stat.label}
            className="rounded-2xl border border-slate-200 bg-white px-5 py-4 shadow-sm"
          >
            <p className="font-inter text-[10px] font-semibold uppercase tracking-widest text-slate-400">
              {stat.label}
            </p>
            <p className={`mt-1 font-poppins text-3xl font-semibold tabular-nums ${stat.color}`}>
              {stat.value}
            </p>
          </div>
        ))}
      </div>

      {/* Toolbar */}
      <div className="flex flex-wrap items-center gap-3">
        <div className="relative min-w-0 flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Search by name or email…"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full rounded-xl border border-slate-200 bg-slate-50 py-2 pl-9 pr-4 font-inter text-sm text-slate-900 placeholder:text-slate-400 focus:border-primary/40 focus:outline-none focus:ring-2 focus:ring-primary/15"
          />
        </div>
        <select
          value={roleFilter}
          onChange={(e) => setRoleFilter(e.target.value)}
          className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 font-inter text-sm text-slate-700 focus:border-primary/40 focus:outline-none focus:ring-2 focus:ring-primary/15"
          aria-label="Filter by role"
        >
          <option value="ALL">All Roles</option>
          <option value="STUDENT">Students</option>
          <option value="COUNSELOR">Counselors</option>
          <option value="ADMIN">Admins</option>
        </select>
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 font-inter text-sm text-slate-700 focus:border-primary/40 focus:outline-none focus:ring-2 focus:ring-primary/15"
          aria-label="Filter by status"
        >
          <option value="ALL">All Status</option>
          <option value="ACTIVE">Active</option>
          <option value="INACTIVE">Inactive</option>
        </select>
        <span className="whitespace-nowrap font-inter text-xs text-slate-400">
          {filtered.length} of {users.length}
        </span>
      </div>

      {/* Table */}
      <div className="overflow-hidden rounded-[1.75rem] border border-slate-200 bg-white shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-slate-100">
                <th className="px-6 py-3 font-inter text-[10px] font-semibold uppercase tracking-widest text-slate-400">
                  User
                </th>
                <th className="px-4 py-3 font-inter text-[10px] font-semibold uppercase tracking-widest text-slate-400">
                  Role
                </th>
                <th className="px-4 py-3 font-inter text-[10px] font-semibold uppercase tracking-widest text-slate-400">
                  Status
                </th>
                <th className="px-4 py-3 font-inter text-[10px] font-semibold uppercase tracking-widest text-slate-400">
                  Details
                </th>
                <th className="px-4 py-3 font-inter text-[10px] font-semibold uppercase tracking-widest text-slate-400">
                  Joined
                </th>
                <th className="px-4 py-3 font-inter text-[10px] font-semibold uppercase tracking-widest text-slate-400">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {filtered.length === 0 ? (
                <tr>
                  <td
                    colSpan={6}
                    className="py-12 text-center font-inter text-sm text-slate-400"
                  >
                    No users found.
                  </td>
                </tr>
              ) : (
                filtered.map((user) => (
                  <tr key={user.id} className="transition-colors hover:bg-slate-50/70">
                    <td className="px-6 py-4">
                      <p className="font-inter text-sm font-medium text-slate-900">{user.name}</p>
                      <p className="font-inter text-xs text-slate-400">{user.email}</p>
                    </td>
                    <td className="px-4 py-4">
                      <DashboardStatusBadge status={ROLE_LABELS[user.role] ?? user.role} />
                    </td>
                    <td className="px-4 py-4">
                      <span
                        className={
                          user.isActive
                            ? "font-inter text-xs font-semibold text-emerald-700"
                            : "font-inter text-xs font-semibold text-slate-400"
                        }
                      >
                        {user.isActive ? "Active" : "Inactive"}
                      </span>
                    </td>
                    <td className="px-4 py-4">
                      {user.role === "STUDENT" && user.studentProfile && (
                        <div className="space-y-0.5">
                          <p className="font-inter text-xs text-slate-600">
                            Counselor:{" "}
                            {user.studentProfile.counselor?.name ?? (
                              <span className="text-amber-600">Unassigned</span>
                            )}
                          </p>
                        </div>
                      )}
                      {user.role === "COUNSELOR" && (
                        <p className="font-inter text-xs text-slate-600">
                          {user.counselorStudents.length} student
                          {user.counselorStudents.length !== 1 ? "s" : ""}
                        </p>
                      )}
                    </td>
                    <td className="px-4 py-4">
                      <span className="font-inter text-xs text-slate-500">
                        {new Date(user.createdAt).toLocaleDateString("en-US", {
                          month: "short",
                          year: "numeric",
                        })}
                      </span>
                    </td>
                    <td className="px-4 py-4">
                      <ToggleActiveButton user={user} />
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
