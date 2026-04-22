// web application / stitch / projects / 10257255100198641693 / screens / eafc77e94321429baef11bd2897907f5
"use client";

import { useState, useEffect } from "react";
import {
    CheckCircle2,
    ChevronRight,
    ChevronLeft,
    FileText,
    User,
    GraduationCap,
    ClipboardCheck,
    Send,
    Download,
    AlertCircle,
    Plus,
    BookOpen,
    Users,
    Award,
    PenTool,
    History,
    Mail,
    HelpCircle,
    FileCheck,
    Search,
    Bell,
    Settings,
    LogOut
} from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * Note for Developer: All steps and sub-components are unified in this file
 * for easy copying and testing.
 */

// --- TYPES & CONSTANTS ---

type ApplicationStatus = "IN_PROGRESS" | "SUBMITTED";

interface AppState {
    currentStep: number;
    status: ApplicationStatus;
    formData: any;
}

const STEPS = [
    { id: 1, title: "Foundations", sections: ["Personal Info", "Academic History", "Program Selection"] },
    { id: 2, title: "Requirements", sections: ["Test Requirements", "Scores", "Statement", "Activities"] },
    { id: 3, title: "Support", sections: ["Family", "Recommendations", "Scholarships"] },
    { id: 4, title: "Finalization", sections: ["Supplemental", "Conduct", "Review & Sign"] },
];

// --- SHARED UI COMPONENTS ---

const StepIndicator = ({ currentStep, status }: { currentStep: number; status: ApplicationStatus }) => {
    if (status === "SUBMITTED") return null;

    return (
        <div className="mb-12 flex items-center justify-between overflow-x-auto pb-4 pt-2">
            {STEPS.map((step, idx) => {
                const isActive = currentStep === step.id;
                const isCompleted = currentStep > step.id;

                return (
                    <div key={step.id} className="flex flex-1 items-center last:flex-none">
                        <div className="flex flex-col items-center gap-3">
                            <div
                                className={cn(
                                    "flex h-12 w-12 items-center justify-center rounded-full border-2 transition-all duration-300",
                                    isActive ? "border-[#0f766e] bg-[#0f766e] text-white shadow-lg shadow-teal-100" :
                                        isCompleted ? "border-[#0f766e] bg-[#0f766e] text-white" :
                                            "border-slate-200 bg-white text-slate-400"
                                )}
                            >
                                {isCompleted ? <CheckCircle2 className="h-6 w-6" /> : <span className="text-sm font-bold">{step.id}</span>}
                            </div>
                            <span className={cn("text-[10px] font-bold uppercase tracking-widest", isActive ? "text-[#0f766e]" : "text-slate-400")}>
                                {step.title}
                            </span>
                        </div>
                        {idx < STEPS.length - 1 && (
                            <div className="mx-6 h-[2px] flex-1 bg-slate-100">
                                <div
                                    className="h-full bg-[#0f766e] transition-all duration-500"
                                    style={{ width: isCompleted ? "100%" : isActive ? "50%" : "0%" }}
                                />
                            </div>
                        )}
                    </div>
                );
            })}
        </div>
    );
};

const FormSection = ({ icon: Icon, title, children }: { icon: any, title: string, children: React.ReactNode }) => (
    <section className="bg-white rounded-[2.5rem] border border-slate-100 p-8 shadow-sm mb-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
        <div className="flex items-center gap-4 mb-8">
            <div className="p-3 bg-teal-50 rounded-2xl text-[#0f766e]"><Icon className="h-6 w-6" /></div>
            <h2 className="text-xl font-bold text-slate-900">{title}</h2>
        </div>
        {children}
    </section>
);

const InputField = ({ value, label, placeholder, type = "text" }: { value?: string, label: string, placeholder?: string, type?: string }) => (
    <div className="space-y-2">
        <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400 ml-1">{label}</label>
        <input
            type={type}
            placeholder={placeholder}
            value={value}
            className="w-full px-5 py-4 bg-slate-50 border-none rounded-2xl focus:ring-2 focus:ring-teal-500 transition-all outline-none"
        />
    </div>
);

// --- STEP 1: FOUNDATIONS ---
const Step1Foundations = ({ student }: { student: any }) => (
    <div className="space-y-4">
        <div className="mb-10">
            <h1 className="text-4xl font-bold tracking-tight text-slate-900">Start Your Journey.</h1>
            <p className="text-slate-500 mt-2">Please provide accurate information as it appears on your official documents.</p>
        </div>

        <FormSection icon={User} title="Personal Information">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <InputField value={student?.firstName} label="Legal First Name" placeholder="e.g. Jane" />
                <InputField value={student?.lastName} label="Legal Last Name" placeholder="e.g. Doe" />
                <div className="md:col-span-2">
                    <InputField value={student?.user.email} label="Email Address" placeholder="jane.doe@example.com" type="email" />
                </div>
                <div className="md:col-span-2">
                    <InputField label="Primary Address" placeholder="Street Address, City, State, ZIP" />
                </div>
            </div>
        </FormSection>

        <FormSection icon={GraduationCap} title="Academic History">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <InputField label="High School / College Name" placeholder="University of Excellence" />
                <InputField label="Cumulative GPA" placeholder="4.0" />
            </div>
        </FormSection>

        <FormSection icon={FileText} title="Program Selection">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <InputField label="Desired Degree Program" placeholder="B.S. Computer Science" />
                <InputField label="Intended Start Term" placeholder="Fall 2024" />
            </div>
        </FormSection>
    </div>
);

// --- STEP 2: REQUIREMENTS ---
const Step2Requirements = () => (
    <div className="space-y-4">
        <div className="mb-10">
            <h1 className="text-4xl font-bold tracking-tight text-slate-900">Testing & Achievements</h1>
            <p className="text-slate-500 mt-2">Provide your standardized test scores and craft your personal statement.</p>
        </div>

        <FormSection icon={FileCheck} title="Test Scores (Standardized)">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <InputField label="SAT Math (200-800)" placeholder="750" />
                <InputField label="SAT Reading (200-800)" placeholder="710" />
                <InputField label="ACT Composite (1-36)" placeholder="32" />
                <InputField label="Test Date" type="date" />
            </div>
        </FormSection>

        <FormSection icon={PenTool} title="Personal Statement">
            <div className="space-y-2">
                <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400 ml-1">Statement of Purpose (Max 500 words)</label>
                <textarea
                    rows={8}
                    placeholder="Describe your motivations and goals..."
                    className="w-full px-5 py-4 bg-slate-50 border-none rounded-2xl focus:ring-2 focus:ring-teal-500 transition-all outline-none resize-none"
                />
                <div className="text-right text-[10px] text-slate-400 font-bold uppercase tracking-tighter">0 / 500 Words</div>
            </div>
        </FormSection>

        <FormSection icon={Award} title="Extracurricular Activities">
            <div className="space-y-4">
                <div className="p-6 bg-slate-50 rounded-2xl flex items-center justify-between border border-dashed border-slate-200">
                    <div className="flex items-center gap-4">
                        <div className="h-10 w-10 bg-white rounded-xl flex items-center justify-center text-slate-400 border border-slate-100"><History className="h-5 w-5" /></div>
                        <div>
                            <p className="text-sm font-bold text-slate-900">No activities added yet</p>
                            <p className="text-xs text-slate-500">Add up to 10 significant involvements.</p>
                        </div>
                    </div>
                    <button className="flex items-center gap-2 text-[#0f766e] font-bold text-sm bg-teal-50 px-4 py-2 rounded-xl hover:bg-teal-100 transition-colors">
                        <Plus className="h-4 w-4" /> Add Activity
                    </button>
                </div>
            </div>
        </FormSection>
    </div>
);

// --- STEP 3: SUPPORT ---
const Step3Support = () => (
    <div className="space-y-4">
        <div className="mb-10">
            <h1 className="text-4xl font-bold tracking-tight text-slate-900">Family & Support</h1>
            <p className="text-slate-500 mt-2">Detail your support network and recommendation requirements.</p>
        </div>

        <FormSection icon={Users} title="Family Information">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <InputField label="Parent/Guardian 1 Full Name" />
                <InputField label="Highest Education Level" placeholder="Select Option" />
            </div>
        </FormSection>

        <FormSection icon={Mail} title="Recommendations (LOR)">
            <div className="space-y-4">
                {[
                    { name: "Dr. Sarah Jenkins", status: "Received", type: "Academic" },
                    { name: "Mr. Thomas Reid", status: "Requested", type: "Counselor" }
                ].map((lor) => (
                    <div key={lor.name} className="flex items-center justify-between p-5 bg-slate-50 rounded-2xl">
                        <div className="flex items-center gap-4">
                            <div className="h-10 w-10 bg-white rounded-full flex items-center justify-center font-bold text-[#0f766e] border border-slate-100">{lor.name[0]}</div>
                            <div>
                                <p className="text-sm font-bold">{lor.name}</p>
                                <p className="text-[10px] text-slate-500 uppercase font-bold">{lor.type} Reference</p>
                            </div>
                        </div>
                        <span className={cn(
                            "text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-tighter",
                            lor.status === "Received" ? "bg-teal-100 text-teal-800" : "bg-orange-100 text-orange-800"
                        )}>
                            {lor.status}
                        </span>
                    </div>
                ))}
                <button className="w-full py-4 border-2 border-dashed border-slate-200 rounded-2xl text-slate-400 font-bold text-sm hover:bg-slate-50 transition-colors flex items-center justify-center gap-2">
                    <Plus className="h-4 w-4" /> Request New Recommendation
                </button>
            </div>
        </FormSection>

        <FormSection icon={BookOpen} title="Scholarships & Financial Aid">
            <div className="space-y-4">
                <label className="flex items-center gap-4 p-5 bg-slate-50 rounded-2xl cursor-pointer hover:bg-slate-100 transition-colors group">
                    <input type="checkbox" className="h-5 w-5 rounded-lg border-slate-300 text-[#0f766e] focus:ring-[#0f766e]" />
                    <div>
                        <p className="text-sm font-bold group-hover:text-[#0f766e]">Merit-Based Excellence Scholarship</p>
                        <p className="text-xs text-slate-500">Requires maintaining a 3.8 GPA.</p>
                    </div>
                </label>
            </div>
        </FormSection>
    </div>
);

// --- STEP 4: FINALIZATION ---
const Step4Finalization = () => (
    <div className="space-y-4">
        <div className="mb-10">
            <h1 className="text-4xl font-bold tracking-tight text-slate-900">Finalization & Review</h1>
            <p className="text-slate-500 mt-2">Almost there. Review your responses carefully before submitting.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-4">
                <FormSection icon={HelpCircle} title="Additional Questions">
                    <div className="space-y-6">
                        <InputField label="Have you previously applied to this institution?" />
                        <InputField label="Expected Housing Status" />
                    </div>
                </FormSection>

                <FormSection icon={PenTool} title="Electronic Signature">
                    <div className="space-y-6">
                        <div className="p-6 bg-red-50 rounded-2xl border border-red-100 flex gap-4">
                            <AlertCircle className="h-6 w-6 text-red-500 shrink-0" />
                            <div>
                                <p className="font-bold text-red-900 text-sm">Final Submission Warning</p>
                                <p className="text-red-700 text-xs mt-1">This action is irreversible. All fields will be locked upon submission.</p>
                            </div>
                        </div>
                        <InputField label="Full Legal Name (Digital Signature)" placeholder="Type your full name" />
                    </div>
                </FormSection>
            </div>

            <div className="space-y-6">
                <div className="bg-slate-50 rounded-[2.5rem] p-8 border border-slate-100 sticky top-8">
                    <h3 className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-6">Progress Check</h3>
                    <div className="space-y-4">
                        {[
                            { label: "Profile Info", status: "Verified" },
                            { label: "Academic Record", status: "Complete" },
                            { label: "Test Scores", status: "Complete" },
                            { label: "Final Signature", status: "Pending" },
                        ].map((item) => (
                            <div key={item.label} className="bg-white p-4 rounded-2xl flex justify-between items-center shadow-sm">
                                <span className="text-xs font-bold text-slate-600">{item.label}</span>
                                <span className={cn(
                                    "text-[9px] font-bold px-2 py-1 rounded-lg",
                                    item.status === "Pending" ? "bg-slate-100 text-slate-400" : "bg-teal-50 text-[#0f766e]"
                                )}>{item.status}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    </div>
);

// --- READ-ONLY SUBMITTED VIEW ---
const SubmittedView = () => (
    <div className="space-y-8 animate-in zoom-in duration-500">
        <div className="bg-teal-50 border border-teal-100 rounded-[2.5rem] p-8 flex flex-col md:flex-row items-center gap-6">
            <div className="h-16 w-16 bg-[#0f766e] rounded-2xl flex items-center justify-center text-white shadow-xl shadow-teal-100 shrink-0">
                <ClipboardCheck className="h-8 w-8" />
            </div>
            <div className="text-center md:text-left">
                <h2 className="text-xl font-bold text-[#0f766e]">Application Successfully Submitted</h2>
                <p className="text-teal-700 text-sm">Your files are being reviewed by the admissions board. We will notify you via email.</p>
            </div>
            <button className="md:ml-auto bg-white text-slate-900 px-6 py-4 rounded-2xl font-bold text-sm border border-teal-100 hover:bg-teal-50 transition-all flex items-center gap-2 whitespace-nowrap">
                <Download className="h-4 w-4" /> Download Receipt
            </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 opacity-80 pointer-events-none">
            <FormSection icon={User} title="Submitted Personal Data">
                <div className="space-y-4">
                    <div><p className="text-[10px] font-bold text-slate-400 uppercase">Applicant</p><p className="font-bold text-lg text-slate-900">Eleanor Vance</p></div>
                    <div><p className="text-[10px] font-bold text-slate-400 uppercase">Intended Term</p><p className="font-bold text-lg text-slate-900">Fall 2024</p></div>
                </div>
            </FormSection>
            <div className="bg-[#0f766e] rounded-[2.5rem] p-8 text-white flex flex-col justify-between">
                <div>
                    <h3 className="text-[10px] font-bold uppercase tracking-widest opacity-60 mb-2">Program Selection</h3>
                    <p className="text-3xl font-bold leading-tight">B.S. Computer Science & Engineering</p>
                </div>
                <div className="mt-8 pt-8 border-t border-white/10 flex items-center justify-between">
                    <div><p className="opacity-60 text-[10px] font-bold uppercase">Status</p><p className="font-bold">Under Review</p></div>
                    <div className="h-10 w-10 bg-white/10 rounded-full flex items-center justify-center"><CheckCircle2 className="h-5 w-5" /></div>
                </div>
            </div>
        </div>
    </div>
);

// --- MAIN PAGE COMPONENT ---

export default function ApplicationPage() {
    const [state, setState] = useState<AppState>({
        currentStep: 1,
        status: "IN_PROGRESS",
        formData: {},
    });

    const handleNext = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
        setState(prev => ({ ...prev, currentStep: Math.min(prev.currentStep + 1, 4) }));
    };

    const handleBack = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
        setState(prev => ({ ...prev, currentStep: Math.max(prev.currentStep - 1, 1) }));
    };

    const handleSubmit = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
        setState(prev => ({ ...prev, status: "SUBMITTED" }));
    };

    const [student, setStudent] = useState();

    useEffect(() => {
        fetch('/api/student/details').then(res => res.json()).then(data => {
            console.log("Fetched student details:", data);
            // Here you would typically set the fetched data into your form state
            data.student.firstName = data.student.user.name.split(" ")[0];
            data.student.lastName = data.student.user.name.split(" ")[1] || "";
            setStudent(data.student);
        }).catch(err => {
            console.error("Error fetching student details:", err);
        });
    }, []);

    return (
        <div className="max-w-6xl mx-auto py-8 px-4 sm:px-6 lg:px-8 bg-slate-50 min-h-screen">
            <StepIndicator currentStep={state.currentStep} status={state.status} />

            <main className="min-h-[70vh]">
                {state.status === "SUBMITTED" ? (
                    <SubmittedView />
                ) : (
                    <div className="transition-all duration-300">
                        {state.currentStep === 1 && <Step1Foundations student={student} />}
                        {state.currentStep === 2 && <Step2Requirements />}
                        {state.currentStep === 3 && <Step3Support />}
                        {state.currentStep === 4 && <Step4Finalization />}
                    </div>
                )}
            </main>

            {state.status === "IN_PROGRESS" && (
                <div className="mt-16 flex items-center justify-between border-t border-slate-200 pt-10 pb-20">
                    <button
                        onClick={handleBack}
                        disabled={state.currentStep === 1}
                        className="flex items-center gap-2 px-8 py-4 rounded-2xl font-bold text-slate-500 hover:bg-slate-100 disabled:opacity-20 transition-all"
                    >
                        <ChevronLeft className="h-5 w-5" /> Previous
                    </button>

                    <div className="flex gap-4">
                        <button className="px-8 py-4 font-bold text-slate-400 hover:text-slate-600 transition-all">Save Draft</button>
                        {state.currentStep === 4 ? (
                            <button
                                onClick={handleSubmit}
                                className="bg-[#0f766e] text-white px-10 py-4 rounded-2xl font-bold shadow-xl shadow-teal-100 hover:scale-[1.02] active:scale-95 transition-all flex items-center gap-2"
                            >
                                <Send className="h-5 w-5" /> Final Submit
                            </button>
                        ) : (
                            <button
                                onClick={handleNext}
                                className="bg-[#0f766e] text-white px-10 py-4 rounded-2xl font-bold shadow-xl shadow-teal-100 hover:scale-[1.02] active:scale-95 transition-all flex items-center gap-2"
                            >
                                Next Step <ChevronRight className="h-5 w-5" />
                            </button>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}
