"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
    FileText,
    Clock,
    CheckCircle2,
    AlertCircle,
    ChevronRight,
    ArrowRight,
    Calendar,
    Search,
    Filter,
    Loader2,
    AlertTriangle,
    PauseCircle,
    XCircle,
    type LucideIcon
} from "lucide-react";
import { cn } from "@/lib/utils";

// --- TYPES ---
// Matches your Prisma ApplicationStatus enum
type ApplicationStatus = "NOT_STARTED" | "IN_PROGRESS" | "UNDER_REVIEW" | "APPROVED" | "REJECTED" | "ON_HOLD";

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

interface RawApplication {
    id: string;
    status: string;
    submittedAt: string | null;
    updatedAt: string;
    intendedProgram?: string;
    intendedUniversity?: string;
}

// --- COMPONENTS ---
const StatusBadge = ({ status }: { status: ApplicationStatus }) => {
    const styles: Record<ApplicationStatus, string> = {
        NOT_STARTED: "bg-slate-50 text-slate-700 border-slate-200",
        IN_PROGRESS: "bg-orange-50 text-orange-700 border-orange-100",
        UNDER_REVIEW: "bg-blue-50 text-blue-700 border-blue-100",
        APPROVED: "bg-teal-50 text-[#0f766e] border-teal-100",
        REJECTED: "bg-red-50 text-red-700 border-red-100",
        ON_HOLD: "bg-yellow-50 text-yellow-700 border-yellow-100",
    };

    const labels: Record<ApplicationStatus, string> = {
        NOT_STARTED: "Not Started",
        IN_PROGRESS: "In Progress",
        UNDER_REVIEW: "Under Review",
        APPROVED: "Approved",
        REJECTED: "Rejected",
        ON_HOLD: "On Hold",
    };

    const IconMap: Record<ApplicationStatus, LucideIcon> = {
        NOT_STARTED: Clock,
        IN_PROGRESS: Clock,
        UNDER_REVIEW: Search,
        APPROVED: CheckCircle2,
        REJECTED: XCircle,
        ON_HOLD: PauseCircle,
    };

    const Icon = IconMap[status] || AlertCircle;

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
    const isDraft = app.status === "IN_PROGRESS" || app.status === "NOT_STARTED";
    const destinationUrl = isDraft ? "/student/application" : `/student/application/details/${app.id}`;

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
                    <Link href={destinationUrl}>
                        {isDraft ? (
                            <button className="bg-[#0f766e] text-white px-8 py-3.5 rounded-2xl font-bold text-sm shadow-lg shadow-teal-100 hover:scale-[1.02] active:scale-95 transition-all flex items-center gap-2">
                                Continue Application <ArrowRight className="h-4 w-4" />
                            </button>
                        ) : (
                            <button className="bg-white text-slate-600 border border-slate-200 px-8 py-3.5 rounded-2xl font-bold text-sm hover:bg-slate-50 hover:border-[#0f766e] hover:text-[#0f766e] transition-all flex items-center gap-2">
                                View Details <ChevronRight className="h-4 w-4" />
                            </button>
                        )}
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default function ApplicationHistoryPage() {
    const [applications, setApplications] = useState<Application[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchApplications = async () => {
            try {
                const response = await fetch('/api/student/application/list');
                if (!response.ok) {
                    throw new Error("Failed to load applications");
                }
                const data = await response.json();

                // Transform DB data into frontend UI format
                const formattedApps = data.applications.map((app: RawApplication) => {
                    const hasSubmitted = app.submittedAt !== null;
                    const dateToUse = app.submittedAt ?? app.updatedAt;

                    // Fallback title if intended program/university is empty
                    const title = app.intendedProgram && app.intendedUniversity
                        ? `${app.intendedProgram} at ${app.intendedUniversity}`
                        : "General Admission Application";

                    return {
                        id: app.id,
                        title: title,
                        type: "UNIVERSITY", // You can update this later if you add scholarship types to DB
                        status: app.status as ApplicationStatus,
                        dateLabel: hasSubmitted ? "Submitted" : "Last edited",
                        dateValue: new Date(dateToUse).toLocaleDateString(undefined, {
                            year: 'numeric',
                            month: 'short',
                            day: 'numeric'
                        }),
                    };
                });

                setApplications(formattedApps);
            } catch (err: unknown) {
                console.error("Fetch Error:", err);
                setError(err instanceof Error ? err.message : "An unexpected error occurred.");
            } finally {
                setIsLoading(false);
            }
        };

        fetchApplications();
    }, []);

    if (isLoading) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[60vh] space-y-4">
                <Loader2 className="h-12 w-12 text-[#0f766e] animate-spin" />
                <p className="text-slate-500 font-medium animate-pulse">Loading your applications...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="max-w-xl mx-auto py-20 text-center">
                <div className="h-20 w-20 bg-red-50 text-red-500 rounded-full flex items-center justify-center mx-auto mb-6">
                    <AlertTriangle className="h-10 w-10" />
                </div>
                <h2 className="text-2xl font-bold text-slate-900 mb-2">Failed to load history</h2>
                <p className="text-slate-500 mb-8">{error}</p>
                <button
                    onClick={() => window.location.reload()}
                    className="bg-[#0f766e] text-white px-8 py-3 rounded-2xl font-bold shadow-lg shadow-teal-100 hover:scale-[1.02] transition-all inline-block"
                >
                    Try Again
                </button>
            </div>
        );
    }

    return (
        <div className="max-w-6xl mx-auto py-8 px-4 sm:px-6 lg:px-8 bg-slate-50 min-h-screen">
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
                {applications.length > 0 ? (
                    applications.map((app) => (
                        <ApplicationCard key={app.id} app={app} />
                    ))
                ) : (
                    <div className="text-center py-12 bg-white rounded-[2rem] border border-slate-100 shadow-sm">
                        <FileText className="h-12 w-12 text-slate-300 mx-auto mb-4" />
                        <h3 className="text-lg font-bold text-slate-900">No applications found</h3>
                        <p className="text-slate-500 mt-1">You have not started any applications yet.</p>
                    </div>
                )}
            </div>

            {/* Only show the 'Start New Application' block if they don't have an active one */}
            {applications.length === 0 && (
                <div className="mt-16 text-center py-12 border-2 border-dashed border-slate-200 rounded-[3rem]">
                    <div className="h-16 w-16 bg-slate-50 rounded-2xl flex items-center justify-center text-slate-300 mx-auto mb-4">
                        <FileText className="h-8 w-8" />
                    </div>
                    <h3 className="text-lg font-bold text-slate-900">Ready to begin?</h3>
                    <p className="text-slate-500 mt-1 mb-6">Start your application journey today.</p>
                    <Link href="/student/application">
                        <button className="bg-[#0f766e] text-white px-10 py-4 rounded-2xl font-bold shadow-xl shadow-teal-100 hover:scale-[1.02] transition-all">
                            Start Application
                        </button>
                    </Link>
                </div>
            )}
        </div>
    );
}
