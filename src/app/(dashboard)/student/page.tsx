import {
  ArrowRight,
  Edit3,
  FolderOpen,
  Bell,
  ListChecks,
  Target
} from "lucide-react";
import { cn } from "@/lib/utils";
import { requireRole } from "@/lib/auth";
import { ROLES } from "@/lib/constants";
import Link from "next/link";

const CHECKLIST_ITEMS = [
  { status: "Received", details: "Official Transcript (High School)", date: "Oct 12, 2023", type: "success" },
  { status: "Received", details: "Letters of Recommendation (2/2)", date: "Oct 14, 2023", type: "success" },
  { status: "In Review", details: "Personal Essay Draft", date: "Oct 18, 2023", type: "warning" },
  { status: "Action Required", details: "SAT Scores (Official Report)", date: "Pending", type: "error" },
];

const NOTIFICATIONS = [
  {
    id: 1,
    title: "Financial Aid Update",
    message: "Your FAFSA application has been successfully processed by the office.",
    time: "2 hours ago",
    unread: true,
  },
  {
    id: 2,
    title: "Action Required",
    message: "Please submit your official SAT scores by Nov 1st.",
    time: "1 day ago",
    unread: true,
  },
  {
    id: 3,
    title: "Essay Reviewed",
    message: "Your counselor has left preliminary comments on your personal essay draft.",
    time: "3 days ago",
    unread: false,
  }
];

const StatusBadge = ({ status, type }: { status: string; type: string }) => {
  const styles = {
    success: "bg-teal-50 text-[#0f766e] border-teal-100",
    warning: "bg-orange-50 text-orange-700 border-orange-100",
    error: "bg-red-50 text-red-700 border-red-100",
  };

  return (
    <span className={cn(
      "flex items-center gap-1.5 px-2.5 py-0.5 rounded-full border text-[9px] font-bold uppercase tracking-wider whitespace-nowrap",
      styles[type as keyof typeof styles]
    )}>
      <div className={cn("h-1.5 w-1.5 rounded-full", type === 'success' ? 'bg-[#0f766e]' : type === 'warning' ? 'bg-orange-500' : 'bg-red-500')} />
      {status}
    </span>
  );
};

const DashboardCard = ({ title, value, subtext, icon: Icon, actionLabel, actionHref }: any) => (
  <div className="bg-white rounded-3xl border border-slate-100 p-5 shadow-sm hover:shadow-md transition-all group">
    <div className="flex items-start justify-between mb-3">
      <div className="p-2 bg-teal-50 rounded-xl text-[#0f766e]">
        <Icon className="h-5 w-5" />
      </div>
      {value && <span className="text-2xl font-bold text-slate-900">{value}</span>}
    </div>
    <h3 className="text-lg font-bold text-slate-900 mb-1">{title}</h3>
    <p className="text-slate-500 text-xs mb-3 leading-relaxed">{subtext}</p>
    {actionLabel && (
      <Link href={actionHref ? actionHref : ""} className="flex items-center gap-1.5 text-[#0f766e] font-bold text-xs group-hover:gap-2 transition-all">
        {actionLabel} <ArrowRight className="h-3 w-3" />
      </Link>
    )}
  </div>
);

// --- MAIN PAGE ---

export default async function StudentDashboardPage() {
  const user = await requireRole([ROLES.STUDENT]);

  return (
    <div className="max-w-7xl mx-auto space-y-6 py-2">
      {/* Header Section */}
      <div className="space-y-1 text-center">
        <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#0f766e]">Dashboard</p>
        <h1 className="text-2xl font-bold tracking-tighter text-slate-900">
          Welcome back, <span className="text-3xl text-[#0f766e]">{user.name}.</span>
        </h1>
      </div>

      {/* Left/Main Column */}
      {/* Left/Main Column & Sidebar Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">

        {/* Left Column (2 Cards) */}
        <div className="lg:col-span-2 space-y-5 flex flex-col">
          {/* Progress Tracker Card */}
          <div className="bg-white rounded-3xl border border-slate-100 p-6 shadow-sm relative overflow-hidden">
            <div className="flex justify-between items-end mb-5">
              <div>
                <div className="flex items-center gap-2">
                  <Target className="h-5 w-5 text-[#0f766e]" strokeWidth={2.5} />
                  <h2 className="text-lg font-bold text-slate-900">Application Progress</h2>
                </div>
                <p className="text-slate-500 mt-1 text-xs max-w-sm">You are on track to complete your primary application by Nov 1st.</p>
                {90 < 100 && (
                  <Link
                    href="/student/application"
                    className="mt-4 inline-flex items-center gap-2 bg-[#0f766e] text-white px-4 py-2 rounded-xl font-bold text-xs shadow-md shadow-teal-100 hover:scale-[1.02] active:scale-95 transition-all"
                  >
                    <Edit3 className="h-3.5 w-3.5" /> Continue Application
                  </Link>
                )}
              </div>
              <div className="text-5xl font-black text-[#0f766e] tracking-tighter leading-none">
                65<span className="text-2xl opacity-40">%</span>
              </div>
            </div>

            <div className="space-y-2">
              <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                <div className="h-full bg-[#0f766e] rounded-full transition-all duration-1000" style={{ width: '65%' }} />
              </div>
              <div className="flex justify-between text-[9px] font-bold uppercase tracking-widest text-slate-400">
                <span>Started</span>
                <span>Submission Goal</span>
              </div>
            </div>
          </div>

          <DashboardCard
            title="Document Vault"
            value="4"
            subtext="4 documents successfully verified and securely stored."
            icon={FolderOpen}
            actionLabel="View all documents"
            actionHref={"/student/documents"}
          />
        </div>

        {/* Sidebar Column: Notification Center */}
        <div className="bg-white rounded-3xl border border-slate-100 p-5 shadow-sm flex flex-col h-full hover:shadow-md transition-shadow">
          {/* Header */}
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-teal-50 rounded-xl text-[#0f766e]">
              <Bell className="h-5 w-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-slate-900">Notifications</h3>
              <p className="text-slate-500 text-xs">2 unread updates</p>
            </div>
          </div>

          {/* List of Notifications (Limited to 2 items!) */}
          <div className="flex-1 space-y-2 mb-4">
            {NOTIFICATIONS.slice(0, 2).map((note) => (
              <div key={note.id}
                className="shadow-sm shadow-[#438580] group relative flex gap-2.5 items-start p-2 -mx-2 rounded-xl hover:bg-slate-50 transition-colors mb-2 pb-4 last:mb-0 last:pb-2 after:absolute after:bottom-0 after:left-1/2 after:-translate-x-1/2 after:w-1/2 after:h-px after:bg-gradient-to-r after:from-transparent after:via-slate-200 after:to-transparent last:after:hidden"
              >
                <div className={cn(
                  "mt-1.5 h-1.5 w-1.5 rounded-full shrink-0",
                  note.unread ? "bg-[#0f766e]" : "bg-slate-200"
                )} />
                <div>
                  <h4 className={cn(
                    "text-xs font-bold",
                    note.unread ? "text-slate-900" : "text-slate-600"
                  )}>
                    {note.title}
                  </h4>
                  <p className="text-slate-500 text-[11px] mt-0.5 leading-relaxed line-clamp-2">
                    {note.message}
                  </p>
                  <span className="text-slate-400 text-[9px] font-bold uppercase tracking-wider mt-1 block">
                    {note.time}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Action Button */}
          <Link
            href="/student/notifications"
            className="flex items-center justify-center gap-2 text-[#0f766e] bg-teal-50/50 hover:bg-teal-50 py-2.5 rounded-xl font-bold text-xs transition-all group mt-auto"
          >
            View All <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

      </div>
      {/* Requirement Checklist (Status Table) */}
      <div className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden">
        <div className="p-5 border-b border-slate-50 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-teal-50 rounded-xl text-[#0f766e]">
              <ListChecks className="h-5 w-5" />
            </div>
            <h2 className="text-lg font-bold text-slate-900">Requirement Checklist</h2>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="text-[9px] font-bold uppercase tracking-widest text-slate-400 bg-slate-50/50">
                <th className="px-5 py-3">Status</th>
                <th className="px-5 py-3">Details</th>
                <th className="px-5 py-3 text-right">Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {CHECKLIST_ITEMS.map((item, idx) => (
                <tr key={idx} className="group hover:bg-slate-50/50 transition-colors">
                  <td className="px-5 py-3">
                    <StatusBadge status={item.status} type={item.type} />
                  </td>
                  <td className="px-5 py-3 text-xs font-medium text-slate-700">{item.details}</td>
                  <td className="px-5 py-3 text-right text-xs text-slate-400 font-medium">{item.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
