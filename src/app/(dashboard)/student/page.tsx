import {

  ArrowRight,
  Edit3,
  FolderOpen,
  Bell,
  School,
  Plus
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


const StatusBadge = ({ status, type }: { status: string; type: string }) => {
  const styles = {
    success: "bg-teal-50 text-[#0f766e] border-teal-100",
    warning: "bg-orange-50 text-orange-700 border-orange-100",
    error: "bg-red-50 text-red-700 border-red-100",
  };

  return (
    <span className={cn(
      "flex items-center gap-1.5 px-3 py-1 rounded-full border text-[10px] font-bold uppercase tracking-wider whitespace-nowrap",
      styles[type as keyof typeof styles]
    )}>
      <div className={cn("h-1.5 w-1.5 rounded-full", type === 'success' ? 'bg-[#0f766e]' : type === 'warning' ? 'bg-orange-500' : 'bg-red-500')} />
      {status}
    </span>
  );
};

const DashboardCard = ({ title, value, subtext, icon: Icon, actionLabel, actionHref }: any) => (
  <div className="bg-white rounded-[2.5rem] border border-slate-100 p-8 shadow-sm hover:shadow-md transition-all group">
    <div className="flex items-start justify-between mb-6">
      <div className="p-3 bg-teal-50 rounded-2xl text-[#0f766e]">
        <Icon className="h-6 w-6" />
      </div>
      {value && <span className="text-3xl font-bold text-slate-900">{value}</span>}
    </div>
    <h3 className="text-xl font-bold text-slate-900 mb-2">{title}</h3>
    <p className="text-slate-500 text-sm mb-6 leading-relaxed">{subtext}</p>
    {actionLabel && (
      <Link href={actionHref ? actionHref : ""} className="flex items-center gap-2 text-[#0f766e] font-bold text-sm group-hover:gap-3 transition-all">
        {actionLabel} <ArrowRight className="h-4 w-4" />
      </Link>
    )}
  </div>
);

// --- MAIN PAGE ---

export default async function StudentDashboardPage() {
  const user = await requireRole([ROLES.STUDENT]);

  return (
    <div className="max-w-7xl mx-auto space-y-10 py-6">
      {/* Header Section */}
      <div className="space-y-2 text-center">
        <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#0f766e]">Dashboard</p>
        <h1 className="text-5xl font-bold tracking-tighter text-slate-900">
          Welcome back, <br /><span className="text-6xl text-[#0f766e]">{user.name}.</span>
        </h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left/Main Column */}
        <div className="lg:col-span-2 space-y-8">

          {/* Progress Tracker Card */}
          <div className="bg-white rounded-[2.5rem] border border-slate-100 p-10 shadow-sm relative overflow-hidden">
            <div className="flex justify-between items-end mb-8">
              <div>
                <h2 className="text-3xl font-bold text-slate-900">Application Progress</h2>
                <p className="text-slate-500 mt-2 max-w-md">You are on track to complete your primary application by Nov 1st.</p>
                {/* CONDITIONAL EDIT/CONTINUE BUTTON */}
                {90 < 100 && (
                  <Link
                    href="/student/application"
                    className="mt-6 inline-flex items-center gap-2 bg-[#0f766e] text-white px-6 py-3 rounded-2xl font-bold text-sm shadow-lg shadow-teal-100 hover:scale-[1.02] active:scale-95 transition-all"
                  >
                    <Edit3 className="h-4 w-4" /> Continue Application
                  </Link>
                )}
              </div>
              <div className="text-7xl font-black text-[#0f766e] tracking-tighter">
                65<span className="text-4xl opacity-40">%</span>
              </div>
            </div>

            <div className="space-y-3">
              <div className="h-3 w-full bg-slate-100 rounded-full overflow-hidden">
                <div className="h-full bg-[#0f766e] rounded-full transition-all duration-1000" style={{ width: '65%' }} />
              </div>
              <div className="flex justify-between text-[10px] font-bold uppercase tracking-widest text-slate-400">
                <span>Started</span>
                <span>Submission Goal</span>
              </div>
            </div>
          </div>

          {/* Requirement Checklist (Status Table) */}
          <div className="bg-white rounded-[2.5rem] border border-slate-100 shadow-sm overflow-hidden">
            <div className="p-8 border-b border-slate-50 flex justify-between items-center">
              <h2 className="text-2xl font-bold text-slate-900">Requirement Checklist</h2>
              <button className="text-[#0f766e] font-bold text-sm flex items-center gap-2 hover:opacity-70">

              </button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="text-[10px] font-bold uppercase tracking-widest text-slate-400">
                    <th className="px-8 py-6">Status</th>
                    <th className="px-8 py-6">Details</th>
                    <th className="px-8 py-6 text-right">Date</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50">
                  {CHECKLIST_ITEMS.map((item, idx) => (
                    <tr key={idx} className="group hover:bg-slate-50/50 transition-colors">
                      <td className="px-8 py-6">
                        <StatusBadge status={item.status} type={item.type} />
                      </td>
                      <td className="px-8 py-6 font-medium text-slate-700">{item.details}</td>
                      <td className="px-8 py-6 text-right text-sm text-slate-400 font-medium">{item.date}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Sidebar Column */}
        <div className="space-y-8">
          <DashboardCard
            title="Notification Center"
            value="2"
            subtext="Important updates regarding your financial aid application are waiting."
            icon={Bell}
            actionLabel="View All Notifications"
          />
          <DashboardCard
            title="Document Vault"
            value="4"
            subtext="4 documents successfully verified and securely stored."
            icon={FolderOpen}
            actionLabel="View all documents"
            actionHref={"/student/documents"}
          />



          {/* Quick Action Banner */}
          <div className="bg-[#0f766e] rounded-[2.5rem] p-10 text-white shadow-xl shadow-teal-100 relative overflow-hidden group">
            <div className="relative z-10">
              <h3 className="text-2xl font-bold mb-2">Campus Tour Scheduling Open</h3>
              <p className="text-teal-100 text-sm mb-6 leading-relaxed">Book your fall visit today to meet with admissions counselors in person.</p>
              <button className="bg-white text-[#0f766e] px-8 py-4 rounded-2xl font-bold text-sm hover:scale-[1.02] transition-all">
                Schedule Visit
              </button>
            </div>
            <div className="absolute -right-10 -bottom-10 opacity-10 group-hover:scale-110 transition-transform duration-700">
              <School size={200} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
