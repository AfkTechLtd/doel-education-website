import {
  ArrowRight,
  Edit3,
  FolderOpen,
  Bell,
  ListChecks,
  Target,
  Mail,
  Phone,
  UserCheck,
  Clock,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { requireRole } from "@/lib/auth";
import { ROLES } from "@/lib/constants";
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import RequestCounselorButton from "@/components/dashboard/student/RequestCounselorButton";

// --- HELPERS ---

const StatusBadge = ({ status, type }: { status: string; type: string }) => {
  const styles = {
    success: "bg-teal-50 text-[#0f766e] border-teal-100",
    warning: "bg-orange-50 text-orange-700 border-orange-100",
    error: "bg-red-50 text-red-700 border-red-100",
  };

  return (
    <span className={cn(
      "inline-flex w-fit items-center gap-1.5 px-2.5 py-0.5 rounded-full border text-[9px] font-bold uppercase tracking-wider whitespace-nowrap",
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
      {value !== undefined && <span className="text-2xl font-bold text-slate-900">{value}</span>}
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

// MOCK DATA (For Notifications only, since that table isn't built yet)
const NOTIFICATIONS = [
  {
    id: 1,
    title: "Welcome to Doel",
    message: "Your student profile has been created successfully. Start your application whenever you're ready.",
    time: "Just now",
    unread: true,
  }
];

// --- AWAITING COUNSELOR VIEW ---

function AwaitingCounselorView({ userName }: { userName: string }) {
  return (
    <div className="max-w-2xl mx-auto space-y-6 py-8">
      {/* Header */}
      <div className="space-y-1 text-center">
        <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#0f766e]">Welcome</p>
        <h1 className="text-2xl font-bold tracking-tighter text-slate-900">
          Hi, <span className="text-3xl text-[#0f766e]">{userName}!</span>
        </h1>
        <p className="text-slate-500 text-sm mt-2">
          Your account is active. You're one step away from starting your US study journey.
        </p>
      </div>

      {/* Status Card */}
      <div className="bg-white rounded-3xl border border-amber-100 p-6 shadow-sm">
        <div className="flex items-start gap-4">
          <div className="p-3 bg-amber-50 rounded-2xl shrink-0">
            <Clock className="h-6 w-6 text-amber-600" />
          </div>
          <div>
            <h2 className="font-bold text-slate-900 text-lg">Awaiting Counselor Assignment</h2>
            <p className="text-slate-500 text-sm mt-1 leading-relaxed">
              A dedicated counselor will be assigned to guide you through every step of your
              application process. Once assigned, you'll have full access to all portal features.
            </p>
          </div>
        </div>
      </div>

      {/* Contact Card */}
      <div className="bg-white rounded-3xl border border-slate-100 p-6 shadow-sm space-y-5">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-teal-50 rounded-xl text-[#0f766e]">
            <UserCheck className="h-5 w-5" />
          </div>
          <h2 className="text-lg font-bold text-slate-900">Contact Us</h2>
        </div>

        <p className="text-slate-500 text-sm">
          Have questions? Reach out to our team directly — we're here to help.
        </p>

        <div className="space-y-3">
          <a
            href="tel:+8801234567890"
            className="flex items-center gap-3 rounded-2xl border border-slate-100 bg-slate-50 px-4 py-3 text-sm font-medium text-slate-700 transition-colors hover:bg-teal-50 hover:border-teal-100 hover:text-[#0f766e]"
          >
            <Phone className="h-4 w-4 shrink-0 text-[#0f766e]" />
            +880 1234-567890
          </a>
          <a
            href="mailto:counseling@doeleducation.com"
            className="flex items-center gap-3 rounded-2xl border border-slate-100 bg-slate-50 px-4 py-3 text-sm font-medium text-slate-700 transition-colors hover:bg-teal-50 hover:border-teal-100 hover:text-[#0f766e]"
          >
            <Mail className="h-4 w-4 shrink-0 text-[#0f766e]" />
            counseling@doeleducation.com
          </a>
        </div>

        <div className="border-t border-slate-100 pt-5">
          <p className="text-slate-500 text-xs mb-3">
            Or click below to notify our team — we'll assign a counselor and reach out shortly.
          </p>
          <RequestCounselorButton />
        </div>
      </div>

      {/* What happens next */}
      <div className="bg-gradient-to-br from-teal-50 to-white rounded-3xl border border-teal-100 p-6 space-y-4">
        <h3 className="font-bold text-slate-900 text-sm">What happens next?</h3>
        <div className="space-y-3">
          {[
            { step: "1", text: "Our admin reviews your registration and assigns you a counselor." },
            { step: "2", text: "You'll receive a notification when your counselor is assigned." },
            { step: "3", text: "Full portal access unlocks — application, documents, resources, and more." },
          ].map(({ step, text }) => (
            <div key={step} className="flex items-start gap-3">
              <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#0f766e] text-[10px] font-bold text-white">
                {step}
              </span>
              <p className="text-slate-600 text-sm">{text}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// --- MAIN PAGE ---

export default async function StudentDashboardPage() {
  const user = await requireRole([ROLES.STUDENT]);

  // 1. Fetch the Student Profile
  const profile = await prisma.studentProfile.findUnique({
    where: { userId: user.id }
  });

  if (!profile) return <div>Profile not found</div>;

  // 2. If no counselor assigned, show the awaiting view
  if (!profile.counselorId) {
    return <AwaitingCounselorView userName={user.name} />;
  }

  // 3. Calculate Application Progress %
  const application = await prisma.application.findUnique({
    where: { studentId: profile.id },
    include: {
      personalInfo: true,
      academicRecord: true,
      testScores: true,
      financialStanding: true,
      extracurriculars: true,
      familyInfo: true,
      supplemental: true,
      conductAgreement: true,
    }
  });

  let progressPercentage = 0;
  if (application) {
    const sectionCompletion = [
      Boolean(application.personalInfo?.name),
      Boolean(application.academicRecord?.schoolName),
      Boolean(application.testScores?.testDate),
      Boolean(application.financialStanding?.fundingSource),
      Boolean(application.extracurriculars?.activities),
      Boolean(application.familyInfo?.fatherName),
      Boolean(application.supplemental?.personalStatement),
      Boolean(application.conductAgreement?.agreeToTerms)
    ];

    const filledSections = sectionCompletion.filter(isComplete => isComplete === true).length;
    progressPercentage = Math.round((filledSections / 8) * 100);
  }

  // 4. Get Verified Document Count
  const documentCount = await prisma.document.count({
    where: { studentId: profile.id }
  });

  // 5. Fetch and Format Document Requirements Checklist
  const dbRequirements = await prisma.documentRequirement.findMany({
    where: { studentId: profile.id },
    orderBy: { updatedAt: 'desc' }
  });

  const checklistItems = dbRequirements.map((req) => {
    let type = "warning";
    let statusLabel = "In Review";

    switch (req.status) {
      case "VERIFIED":
      case "RECEIVED":
      case "WAIVED":
        type = "success";
        statusLabel = req.status === "WAIVED" ? "Waived" : req.status === "VERIFIED" ? "Verified" : "Received";
        break;
      case "PENDING":
      case "REJECTED":
        type = "error";
        statusLabel = req.status === "REJECTED" ? "Rejected" : "Action Required";
        break;
      case "UNDER_REVIEW":
        type = "warning";
        statusLabel = "In Review";
        break;
    }

    return {
      id: req.id,
      status: statusLabel,
      details: req.name,
      date: new Intl.DateTimeFormat("en-US", { month: "short", day: "numeric", year: "numeric" }).format(req.updatedAt),
      type,
    };
  });

  return (
    <div className="max-w-7xl mx-auto space-y-6 py-2">
      {/* Header Section */}
      <div className="space-y-1 text-center">
        <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#0f766e]">Dashboard</p>
        <h1 className="text-2xl font-bold tracking-tighter text-slate-900">
          Welcome back, <span className="text-3xl text-[#0f766e]">{user.name}.</span>
        </h1>
      </div>

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
                {progressPercentage < 100 && (
                  <Link
                    href="/student/application"
                    className="mt-4 inline-flex items-center gap-2 bg-[#0f766e] text-white px-4 py-2 rounded-xl font-bold text-xs shadow-md shadow-teal-100 hover:scale-[1.02] active:scale-95 transition-all"
                  >
                    <Edit3 className="h-3.5 w-3.5" /> Continue Application
                  </Link>
                )}
              </div>
              <div className="text-5xl font-black text-[#0f766e] tracking-tighter leading-none">
                {progressPercentage}<span className="text-2xl opacity-40">%</span>
              </div>
            </div>

            <div className="space-y-2">
              <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                <div
                  className="h-full bg-[#0f766e] rounded-full transition-all duration-1000"
                  style={{ width: `${progressPercentage}%` }}
                />
              </div>
              <div className="flex justify-between text-[9px] font-bold uppercase tracking-widest text-slate-400">
                <span>Started</span>
                <span>Submission Goal</span>
              </div>
            </div>
          </div>

          <DashboardCard
            title="Document Vault"
            value={documentCount}
            subtext={`${documentCount} documents currently uploaded and securely stored.`}
            icon={FolderOpen}
            actionLabel="Manage your vault"
            actionHref={"/student/documents"}
          />
        </div>

        {/* Sidebar Column: Notification Center */}
        <div className="bg-white rounded-3xl border border-slate-100 p-5 shadow-sm flex flex-col h-full hover:shadow-md transition-shadow">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-teal-50 rounded-xl text-[#0f766e]">
              <Bell className="h-5 w-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-slate-900">Notifications</h3>
              <p className="text-slate-500 text-xs">{NOTIFICATIONS.filter(n => n.unread).length} unread updates</p>
            </div>
          </div>

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
        <div className="p-5 border-b border-slate-50 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-teal-50 rounded-xl text-[#0f766e]">
              <ListChecks className="h-5 w-5" />
            </div>
            <h2 className="text-lg font-bold text-slate-900">Requirement Checklist</h2>
          </div>

          <Link
            href="/student/documents"
            className="inline-flex items-center gap-2 text-[#0f766e] bg-teal-50 hover:bg-teal-100 px-4 py-2.5 rounded-xl font-bold text-xs transition-colors group"
          >
            Manage Vault <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
        <div className="overflow-x-auto">
          {checklistItems.length > 0 ? (
            <table className="w-full text-left">
              <thead>
                <tr className="text-[9px] font-bold uppercase tracking-widest text-slate-400 bg-slate-50/50">
                  <th className="px-5 py-3">Status</th>
                  <th className="px-5 py-3">Details</th>
                  <th className="px-5 py-3 text-right">Last Updated</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {checklistItems.map((item) => (
                  <tr key={item.id} className="group hover:bg-slate-50/50 transition-colors">
                    <td className="px-5 py-3">
                      <StatusBadge status={item.status} type={item.type} />
                    </td>
                    <td className="px-5 py-3 text-xs font-medium text-slate-700">{item.details}</td>
                    <td className="px-5 py-3 text-right text-xs text-slate-400 font-medium">{item.date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <div className="p-10 text-center text-sm text-slate-500">
              No document requirements have been assigned to your profile yet.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
