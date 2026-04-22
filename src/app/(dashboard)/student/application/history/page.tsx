"use client";

import {
    FileText,
    Clock,
    CheckCircle2,
    AlertCircle,
    ChevronRight,
    ArrowRight,
    Calendar,
    Search,
    Filter
} from "lucide-react";
import { cn } from "@/lib/utils";

// --- TYPES & MOCK DATA ---
type ApplicationStatus = "UNDER_REVIEW" | "DRAFT" | "APPROVED" | "ACTION_REQUIRED";

interface Application {
    id: string;
    title: string;
    type: string;
    status: ApplicationStatus;
    dateLabel: string;
    dateValue: string;
    requiresAttention?: boolean;
    dueDate?: string;
}

const APPLICATIONS: Application[] = [
    {
        id: "1",
        title: "Fall 2024 Undergraduate Admission",
        type: "UNDERGRADUATE",
        status: "UNDER_REVIEW",
        dateLabel: "Submitted",
        dateValue: "Oct 24, 2023",
    },
    {
        id: "2",
        title: "Merit Excellence Scholarship 2024",
        type: "SCHOLARSHIP",
        status: "DRAFT",
        dateLabel: "Last edited",
        dateValue: "Nov 12, 2023",
        requiresAttention: true,
        dueDate: "5 days",
    },
    {
        id: "3",
        title: "On-Campus Residence Fall 2023",
        type: "HOUSING",
        status: "APPROVED",
        dateLabel: "Completed",
        dateValue: "Aug 15, 2023",
    }
];

// --- COMPONENTS ---
const StatusBadge = ({ status }: { status: ApplicationStatus }) => {
    const styles = {
        UNDER_REVIEW: "bg-teal-50 text-[#0f766e] border-teal-100",
        DRAFT: "bg-orange-50 text-orange-700 border-orange-100",
        APPROVED: "bg-teal-50 text-[#0f766e] border-teal-100",
        ACTION_REQUIRED: "bg-red-50 text-red-700 border-red-100",
    };

    const labels = {
        UNDER_REVIEW: "Under Review",
        DRAFT: "Draft",
        APPROVED: "Approved",
        ACTION_REQUIRED: "Action Required",
    };

    const Icon = status === "APPROVED" || status === "UNDER_REVIEW" ? CheckCircle2 : status === "DRAFT" ? Clock : AlertCircle;

    return (
        <span className={cn(
            "flex items-center gap-1.5 px-3 py-1 rounded-full border text-[10px] font-bold uppercase tracking-wider",
            styles[status]
        )}>
            <Icon className="h-3 w-3" />
            {labels[status]}
        </span>
    );
};

const ApplicationCard = ({ app }: { app: Application }) => {
    return (
        <div className="bg-white rounded-[2rem] border border-slate-100 p-8 shadow-sm hover:shadow-md transition-all duration-300 group">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div className="space-y-4">
                    <div className="flex flex-wrap items-center gap-3">
                        <span className="bg-slate-50 text-slate-500 px-3 py-1 rounded-lg text-[10px] font-bold uppercase tracking-widest border border-slate-100">
                            {app.type}
                        </span>
                        <StatusBadge status={app.status} />
                    </div>
                    <div>
                        <h3 className="text-xl font-bold text-slate-900 group-hover:text-[#0f766e] transition-colors">
                            {app.title}
                        </h3>
                        <div className="flex items-center gap-4 mt-2 text-slate-400">
                            <div className="flex items-center gap-1.5 text-xs font-medium">
                                <Calendar className="h-3.5 w-3.5" />
                                {app.dateLabel}: {app.dateValue}
                            </div>
                        </div>
                    </div>
                </div>
                <div className="flex flex-col md:items-end gap-4">
                    {app.requiresAttention && (
                        <div className="flex items-center gap-2 text-red-600">
                            <span className="text-[10px] font-bold uppercase tracking-tighter">Requires Attention</span>
                            <span className="text-xs font-medium text-slate-500">Due in {app.dueDate}</span>
                        </div>
                    )}
                    {app.status === "DRAFT" ? (
                        <button className="bg-[#0f766e] text-white px-8 py-3.5 rounded-2xl font-bold text-sm shadow-lg shadow-teal-100 hover:scale-[1.02] active:scale-95 transition-all flex items-center gap-2">
                            Continue Application <ArrowRight className="h-4 w-4" />
                        </button>
                    ) : (
                        <button className="bg-white text-slate-600 border border-slate-200 px-8 py-3.5 rounded-2xl font-bold text-sm hover:bg-slate-50 hover:border-[#0f766e] hover:text-[#0f766e] transition-all flex items-center gap-2">
                            {app.status === "APPROVED" ? "View Details" : "View Application"} <ChevronRight className="h-4 w-4" />
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};

export default function ApplicationHistoryPage() {
    return (
        <div className="max-w-6xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
            <div className="mb-12 space-y-4">
                <h1 className="text-5xl font-bold tracking-tight text-slate-900">Application History</h1>
                <p className="text-slate-500 text-lg max-w-2xl">
                    Review and track the status of your current and past academic submissions.
                </p>
            </div>

            <div className="mb-8 flex flex-col sm:flex-row gap-4">
                <div className="relative flex-1">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                    <input
                        type="text"
                        placeholder="Search applications..."
                        className="w-full pl-11 pr-4 py-4 bg-white border border-slate-100 rounded-2xl focus:ring-2 focus:ring-teal-500 outline-none transition-all shadow-sm"
                    />
                </div>
                <button className="flex items-center justify-center gap-2 px-6 py-4 bg-white border border-slate-100 rounded-2xl font-bold text-slate-600 hover:bg-slate-50 transition-all shadow-sm">
                    <Filter className="h-4 w-4" /> Filter
                </button>
            </div>

            <div className="space-y-6">
                {APPLICATIONS.map((app) => (
                    <ApplicationCard key={app.id} app={app} />
                ))}
            </div>

            <div className="mt-16 text-center py-12 border-2 border-dashed border-slate-200 rounded-[3rem]">
                <div className="h-16 w-16 bg-slate-50 rounded-2xl flex items-center justify-center text-slate-300 mx-auto mb-4">
                    <FileText className="h-8 w-8" />
                </div>
                <h3 className="text-lg font-bold text-slate-900">Looking for something else?</h3>
                <p className="text-slate-500 mt-1 mb-6">Start a new application for a different program or term.</p>
                <button className="bg-[#0f766e] text-white px-10 py-4 rounded-2xl font-bold shadow-xl shadow-teal-100 hover:scale-[1.02] transition-all">
                    Start New Application
                </button>
            </div>
        </div>
    );
}
