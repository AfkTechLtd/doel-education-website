"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import {
    User,
    GraduationCap,
    FileText,
    Award,
    CheckCircle2,
    Calendar,
    Mail,
    MapPin,
    School,
    ClipboardCheck,
    ChevronLeft,
    Loader2,
    AlertTriangle
} from "lucide-react";
import { cn } from "@/lib/utils";
import Link from "next/link";

// --- TYPES BASED ON YOUR SCHEMA ---

interface ApplicationData {
    gpa: string;
    name: string;
    email: string;
    address: string;
    satMath: string;
    signature: string;
    startTerm: string;
    satReading: string;
    schoolName: string;
    actComposite: string;
    guardianName: string;
    degreeProgram: string;
    meritScholarship: boolean;
    personalStatement: string;
}

interface ApplicationSection {
    id: string;
    sectionNumber: string;
    data: ApplicationData;
    isComplete: boolean;
}

interface Application {
    id: string;
    status: string;
    submittedAt: string | null;
    sections: ApplicationSection[];
}

// --- SUB-COMPONENTS ---

const DetailSection = ({ icon: Icon, title, children }: { icon: any, title: string, children: React.ReactNode }) => (
    <section className="bg-white rounded-[2.5rem] border border-slate-100 p-8 shadow-sm mb-8">
        <div className="flex items-center gap-4 mb-8">
            <div className="p-3 bg-teal-50 rounded-2xl text-[#0f766e]"><Icon className="h-6 w-6" /></div>
            <h2 className="text-xl font-bold text-slate-900">{title}</h2>
        </div>
        {children}
    </section>
);

const InfoField = ({ label, value }: { label: string, value?: string | boolean }) => (
    <div className="space-y-1">
        <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400">{label}</p>
        <p className="font-bold text-slate-900 text-lg">
            {typeof value === 'boolean' ? (value ? "Yes" : "No") : (value || "—")}
        </p>
    </div>
);

// --- MAIN PAGE ---

export default function ApplicationDetailsPage() {
    const params = useParams();
    const id = params?.id as string;

    const [application, setApplication] = useState<Application | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (!id) return;

        const fetchApplicationDetails = async () => {
            setLoading(true);
            setError(null);
            try {
                // Replace with your actual API endpoint
                const response = await fetch(`/api/student/application/details/${id}`);
                if (!response.ok) {
                    throw new Error("Failed to fetch application details");
                }
                const data = await response.json();
                setApplication(data);
            } catch (err: any) {
                console.error("Fetch error:", err);
                setError(err.message || "An unexpected error occurred");
            } finally {
                setLoading(false);
            }
        };

        fetchApplicationDetails();
    }, [id]);

    if (loading) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[60vh] space-y-4">
                <Loader2 className="h-12 w-12 text-[#0f766e] animate-spin" />
                <p className="text-slate-500 font-medium animate-pulse">Loading application details...</p>
            </div>
        );
    }

    if (error || !application) {
        return (
            <div className="max-w-xl mx-auto py-20 text-center">
                <div className="h-20 w-20 bg-red-50 text-red-500 rounded-full flex items-center justify-center mx-auto mb-6">
                    <AlertTriangle className="h-10 w-10" />
                </div>
                <h2 className="text-2xl font-bold text-slate-900 mb-2">Something went wrong</h2>
                <p className="text-slate-500 mb-8">{error || "We couldn't find the application you're looking for."}</p>
                <Link
                    href="/student/application/history"
                    className="bg-[#0f766e] text-white px-8 py-3 rounded-2xl font-bold shadow-lg shadow-teal-100 hover:scale-[1.02] transition-all inline-block"
                >
                    Back to History
                </Link>
            </div>
        );
    }

    // Assuming Section 4 (or the dumped JSON) contains the main form data
    const mainData = application.sections.find(s => s.sectionNumber === "SECTION_4")?.data || ({} as ApplicationData);

    return (
        <div className="max-w-6xl mx-auto py-8 px-4 sm:px-6 lg:px-8 bg-slate-50 min-h-screen">
            {/* Header Section */}
            <div className="mb-12">
                <Link
                    href="/student/application/history"
                    className="inline-flex items-center gap-2 text-sm font-bold text-slate-400 hover:text-[#0f766e] transition-colors mb-6 group"
                >
                    <ChevronLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
                    Back to History
                </Link>

                <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                    <div>
                        <h1 className="text-5xl font-bold tracking-tight text-slate-900">Application Details</h1>
                        <div className="flex items-center gap-4 mt-3 text-slate-500 font-medium">
                            <span>ID: {application.id}</span>
                            <span className="h-1 w-1 bg-slate-300 rounded-full" />
                            <span>Submitted: {application.submittedAt ? new Date(application.submittedAt).toLocaleDateString() : "Pending"}</span>
                        </div>
                    </div>
                    <div className="flex items-center gap-3 bg-teal-50 text-[#0f766e] px-6 py-3 rounded-2xl border border-teal-100">
                        <CheckCircle2 className="h-5 w-5" />
                        <span className="font-bold uppercase tracking-wider text-sm">{application.status.replace(/_/g, ' ')}</span>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Left Column: Core Data */}
                <div className="lg:col-span-2">
                    <DetailSection icon={User} title="Personal Information">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-y-8 gap-x-12">
                            <InfoField label="Legal Full Name" value={mainData.name} />
                            <InfoField label="Email Address" value={mainData.email} />
                            <div className="md:col-span-2">
                                <InfoField label="Mailing Address" value={mainData.address} />
                            </div>
                            <InfoField label="Parent/Guardian Name" value={mainData.guardianName} />
                        </div>
                    </DetailSection>

                    <DetailSection icon={GraduationCap} title="Academic Background">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-y-8 gap-x-12">
                            <InfoField label="School Name" value={mainData.schoolName} />
                            <InfoField label="Cumulative GPA" value={mainData.gpa} />
                            <InfoField label="Intended Program" value={mainData.degreeProgram} />
                            <InfoField label="Start Term" value={mainData.startTerm} />
                        </div>
                    </DetailSection>

                    <DetailSection icon={Award} title="Test Scores">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-y-8 gap-x-12">
                            <InfoField label="SAT Math" value={mainData.satMath} />
                            <InfoField label="SAT Reading" value={mainData.satReading} />
                            <InfoField label="ACT Composite" value={mainData.actComposite} />
                        </div>
                    </DetailSection>

                    <DetailSection icon={FileText} title="Statement of Purpose">
                        <div className="prose prose-teal max-w-none">
                            <p className="text-slate-600 leading-relaxed italic">
                                &quot;{mainData.personalStatement || "No statement provided."}&quot;
                            </p>
                        </div>
                    </DetailSection>
                </div>

                {/* Right Column: Status & Sidebar Info */}
                <div className="space-y-8">
                    {/* Financial Aid Card */}
                    <div className="bg-[#0f766e] rounded-[2.5rem] p-8 text-white shadow-xl shadow-teal-100/20">
                        <div className="flex items-center gap-3 mb-6">
                            <ClipboardCheck className="h-6 w-6 opacity-80" />
                            <h3 className="font-bold uppercase tracking-widest text-xs opacity-80">Scholarship Status</h3>
                        </div>
                        <div className="space-y-4">
                            <p className="text-2xl font-bold leading-tight">Merit-Based Excellence Scholarship</p>
                            <div className="flex items-center gap-2">
                                <span className={cn(
                                    "px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-tighter",
                                    mainData.meritScholarship ? "bg-teal-400/20 text-teal-100" : "bg-white/10 text-white/60"
                                )}>
                                    {mainData.meritScholarship ? "Applied" : "Not Requested"}
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Verification & Signature */}
                    <div className="bg-white rounded-[2.5rem] p-8 border border-slate-100 shadow-sm">
                        <h3 className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-6">Submission Verification</h3>
                        <div className="space-y-6">
                            <div>
                                <p className="text-[10px] font-bold text-slate-400 uppercase mb-2">Digital Signature</p>
                                <p className="font-serif text-2xl text-slate-900 border-b border-slate-200 pb-2 italic">
                                    {mainData.signature || "Pending Signature"}
                                </p>
                            </div>
                            <div className="flex items-center gap-2 text-teal-600 font-bold text-sm">
                                <CheckCircle2 className="h-4 w-4" />
                                Verified Record
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
