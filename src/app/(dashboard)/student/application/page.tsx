"use client";

import { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import {
    CheckCircle2, ChevronRight, ChevronLeft, FileText, User, GraduationCap,
    ClipboardCheck, Send, Download, AlertCircle, Plus, BookOpen, Users,
    Award, PenTool, History, Mail, HelpCircle, FileCheck
} from "lucide-react";
import { cn } from "@/lib/utils";
import StepIndicator from "@/components/dashboard/pages/application/StepIndicator";
import InputField from "@/components/dashboard/pages/application/InputField";
import FormSection from "@/components/dashboard/pages/application/FormSection";

// --- TYPES ---
type ApplicationStatus = "NOT_STARTED" | "IN_PROGRESS" | "UNDER_REVIEW" | "APPROVED" | "REJECTED" | "ON_HOLD";
interface AppState {
    currentStep: number;
    status: ApplicationStatus;
    formData: Record<string, any>;
}

interface StepProps {
    student?: any;
    formData: any;
    onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
    errors: Record<string, string>; // Added this}
}
// --- STEP COMPONENTS ---

// --- STEP 1: FOUNDATIONS ---
const Step1Foundations = ({ formData, onChange, errors }: StepProps) => (
    <div className="space-y-4">
        <div className="mb-10">
            <h1 className="text-4xl font-bold tracking-tight text-slate-900">Start Your Journey.</h1>
            <p className="text-slate-500 mt-2">Please provide accurate information as it appears on your official documents.</p>
        </div>
        <FormSection icon={User} title="Personal Information">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <InputField name="name" value={formData.name} onChange={onChange} label="Legal Full Name" placeholder="e.g. Jane Doe" error={errors.name} />
                <InputField name="email" value={formData.email} onChange={onChange} label="Email Address" placeholder="jane.doe@example.com" type="email" error={errors.email} />
                <div className="md:col-span-2">
                    <InputField name="address" value={formData.address} onChange={onChange} label="Primary Address" placeholder="Street Address, City, State, ZIP" error={errors.address} />
                </div>
            </div>
        </FormSection>
        <FormSection icon={GraduationCap} title="Academic History">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <InputField name="schoolName" value={formData.schoolName} onChange={onChange} label="High School / College Name" placeholder="University of Excellence" error={errors.schoolName} />
                <InputField name="gpa" value={formData.gpa} onChange={onChange} label="Cumulative GPA" placeholder="4.0" error={errors.gpa} />
            </div>
        </FormSection>
        <FormSection icon={FileText} title=" Selection">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <InputField name="degreeProgram" value={formData.degreeProgram} onChange={onChange} label="Desired Degree Program" placeholder="B.S. Computer Science" error={errors.degreeProgram} />
                <InputField name="startTerm" value={formData.startTerm} onChange={onChange} label="Intended Start Term" placeholder="Fall 2024" error={errors.startTerm} />
            </div>
        </FormSection>
    </div>
);

// --- STEP 2: REQUIREMENTS ---
const Step2Requirements = ({ formData, onChange, errors }: StepProps) => (
    <div className="space-y-4">
        <div className="mb-10">
            <h1 className="text-4xl font-bold tracking-tight text-slate-900">Testing & Achievements</h1>
            <p className="text-slate-500 mt-2">Provide standardized scores and your personal statement.</p>
        </div>
        <FormSection icon={FileCheck} title="Test Scores">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <InputField name="satMath" value={formData.satMath} onChange={onChange} label="SAT Math" placeholder="750" error={errors.satMath} />
                <InputField name="satReading" value={formData.satReading} onChange={onChange} label="SAT Reading" placeholder="710" error={errors.satReading} />
                <InputField name="actComposite" value={formData.actComposite} onChange={onChange} label="ACT Composite" placeholder="32" error={errors.actComposite} />
                <InputField name="testDate" value={formData.testDate} onChange={onChange} label="Test Date" type="date" error={errors.testDate} />
            </div>
        </FormSection>
        <FormSection icon={PenTool} title="Personal Statement">
            <div className="space-y-2">
                <div className="flex items-center justify-between px-1">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400">
                        Statement of Purpose (MAX 500 words)
                    </label>

                    <Link
                        href="/student/resources/sop"
                        className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-[#0f766e] hover:text-teal-800 transition-colors bg-teal-50 px-3 py-1 rounded-full border border-teal-100"
                    >
                        <HelpCircle className="h-3 w-3" />
                        Writing Guide
                    </Link>
                </div>
                <textarea
                    name="personalStatement"
                    value={formData.personalStatement || ""}
                    onChange={onChange}
                    rows={15}
                    placeholder="Your Statement of Purpose (SoP)"
                    className={cn(
                        "w-full px-5 py-4 bg-slate-50 border-none rounded-2xl focus:ring-2 transition-all outline-none resize-none",
                        errors.personalStatement ? "ring-2 ring-red-500 bg-red-50" : "focus:ring-teal-500"
                    )}
                />
                {errors.personalStatement && (
                    <p className="text-[10px] font-bold text-red-500 ml-1">{errors.personalStatement}</p>
                )}
            </div>
        </FormSection>
    </div>
);

// --- STEP 3: SUPPORT ---
const Step3Support = ({ formData, onChange, errors }: StepProps) => (
    <div className="space-y-4">
        <div className="mb-10">
            <h1 className="text-4xl font-bold tracking-tight text-slate-900">Family & Support</h1>
        </div>
        <FormSection icon={Users} title="Family Information">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <InputField name="guardianName" value={formData.guardianName} onChange={onChange} label="Guardian Full Name" error={errors.guardianName} />
                <InputField name="guardianEducation" value={formData.guardianEducation} onChange={onChange} label="Education Level" error={errors.guardianEducation} />
            </div>
        </FormSection>
        <FormSection icon={BookOpen} title="Financial Aid">
            <label className="flex items-center gap-4 p-5 bg-slate-50 rounded-2xl cursor-pointer hover:bg-slate-100 transition-colors group">
                <input
                    name="meritScholarship"
                    type="checkbox"
                    checked={!!formData.meritScholarship}
                    onChange={(e) => {
                        const event = { target: { name: 'meritScholarship', value: e.target.checked } } as any;
                        onChange(event);
                    }}
                    className="h-5 w-5 rounded-lg border-slate-300 text-[#0f766e] focus:ring-[#0f766e]"
                />
                <div>
                    <p className="text-sm font-bold group-hover:text-[#0f766e]">Merit-Based Scholarship</p>
                    <p className="text-xs text-slate-500">Check to apply for the Excellence award.</p>
                </div>
            </label>
        </FormSection>
    </div>
);

// --- STEP 4: FINALIZATION ---
const Step4Finalization = ({ formData, onChange, errors }: StepProps) => (
    <div className="space-y-4">
        <div className="mb-10">
            <h1 className="text-4xl font-bold tracking-tight text-slate-900">Finalization</h1>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-4">
                <FormSection icon={PenTool} title="Electronic Signature">
                    <InputField name="signature" value={formData.signature} onChange={onChange} label="Digital Signature" placeholder="Type full legal name" error={errors.signature} />
                </FormSection>
            </div>
            <div className="bg-slate-50 rounded-[2.5rem] p-8 border border-slate-100 h-fit">
                <h3 className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-6">Review Status</h3>
                <div className="space-y-2">
                    <p className="text-xs font-medium text-slate-600">Ready to submit: {formData.signature ? "✅ Yes" : "❌ No"}</p>
                    {errors.signature && <p className="text-[10px] font-bold text-red-500 italic">Signature required to finish.</p>}
                </div>
            </div>
        </div>
    </div>
);

const SubmittedView = () => (
    <div className="space-y-8 animate-in zoom-in duration-500 max-w-4xl mx-auto mt-10">
        <div className="bg-teal-50 border border-teal-100 rounded-[2.5rem] p-10 text-center">
            <div className="h-20 w-20 bg-[#0f766e] rounded-3xl flex items-center justify-center text-white shadow-xl mx-auto mb-6">
                <ClipboardCheck className="h-10 w-10" />
            </div>
            <h2 className="text-3xl font-bold text-[#0f766e] mb-4">Application Submitted</h2>
            <p className="text-teal-700 text-lg">Your application is currently under review. You can no longer edit your responses.</p>
            <Link href="/student/dashboard" className="mt-8 inline-block bg-[#0f766e] text-white px-8 py-3 rounded-xl font-bold">
                Return to Dashboard
            </Link>
        </div>
    </div>
);

function ApplicationContent() {
    const router = useRouter();
    const searchParams = useSearchParams();

    // URL State
    const currentStep = parseInt(searchParams.get("step") || "1");
    const isSubmittedView = searchParams.get("view") === "submitted";

    const [status, setStatus] = useState<ApplicationStatus>("NOT_STARTED");
    const [formData, setFormData] = useState<Record<string, any>>({});
    const [errors, setErrors] = useState<Record<string, string>>({});
    const [isLoading, setIsLoading] = useState(true);
    const [student, setStudent] = useState<any>(null);
    useEffect(() => {
        const initApplication = async () => {
            try {
                const res = await fetch('/api/student/application');
                const data = await res.json();

                // If no application exists yet (404 or specific status from your API)
                if (!data.application) {
                    setStatus("NOT_STARTED");

                    if (!searchParams.get("step")) {
                        router.replace("?step=1");
                    }

                    // FIX: Await the details fetch so we can use the result immediately
                    try {
                        const studentRes = await fetch('/api/student/details');
                        const studentData = await studentRes.json();

                        if (studentData.student) {
                            setStudent(studentData.student); // Update state for other uses

                            // Hydrate form directly from the fetched result, not the state variable
                            setFormData(prev => ({
                                ...prev,
                                name: studentData.student.user.name || "",
                                email: studentData.student.user.email || "",
                            }));
                        }
                    } catch (err) {
                        console.error("Failed to fetch student details:", err);
                    }
                    return;
                }

                const app = data.application;
                const appStatus = app.status as ApplicationStatus;
                setStatus(appStatus);

                // 1. Process FormData: Merge all section JSON data into one object
                // Your API returns 'sections' as an array of { sectionNumber: 'ONE', data: {...} }
                const mergedData: Record<string, any> = {};

                if (app.sections && Array.isArray(app.sections)) {
                    app.sections.forEach((section: any) => {
                        // Spread the JSON 'data' field from each section into our flat formData
                        Object.assign(mergedData, section.data);
                    });
                }

                setFormData(prev => ({
                    ...prev,
                    ...mergedData
                }));

                // 2. Routing Logic
                const hasSubmitted = !["NOT_STARTED", "IN_PROGRESS"].includes(appStatus);

                if (hasSubmitted || searchParams.get("view") === "submitted") {
                    router.replace("?view=submitted");

                } else if (!searchParams.get("step")) {
                    // If they just arrived at the page, resume at their last saved step
                    // 'completedSections' is an Int in your schema (e.g., 2)
                    const resumeStep = (app.completedSections || 0) + 1;
                    router.replace(`?step=${Math.min(resumeStep, 4)}`);
                }
            } catch (err) {
                console.error("Failed to load application data:", err);
            } finally {
                setIsLoading(false);
            }
        };

        initApplication();
    }, [router, searchParams]); // Added dependencies for stability

    const validateStep = () => {
        const newErrors: Record<string, string> = {};
        if (currentStep === 1) {
            if (!formData.name) newErrors.name = "Full Name is required";
            if (!formData.email) newErrors.email = "Email is required";
            if (!formData.address) newErrors.address = "Address is required";
            if (!formData.schoolName) newErrors.schoolName = "School Name is required";
            if (!formData.degreeProgram) newErrors.degreeProgram = "Program Name is required";
            if (!formData.startTerm) newErrors.startTerm = "Start of Term is required";
        }
        if (currentStep === 2) {
            if (!formData.satMath) newErrors.satMath = "SAT Math score is required";
            if (!formData.personalStatement) newErrors.personalStatement = "Statement cannot be blank";
        }
        if (currentStep === 4) {
            if (!formData.signature) newErrors.signature = "Please sign your application";
        }

        const errorMessages = Object.values(newErrors);
        if (errorMessages.length > 0) {
            setErrors(newErrors);
            alert(`Please fix the following:\n\n${errorMessages.join("\n")}`);
            return false;
        }
        setErrors({});
        return true;
    };

    const updateFormData = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        if (errors[name]) setErrors(prev => {
            const n = { ...prev }; delete n[name]; return n;
        });
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleNext = async () => {
        if (validateStep()) {
            // PATCH API call to save current progress
            await fetch('/api/student/application', {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    step: currentStep,
                    data: formData // The JSON object containing field values
                })
            });

            window.scrollTo({ top: 0, behavior: 'smooth' });
            router.push(`?step=${currentStep + 1}`);
        }
    };

    const handleBack = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
        router.push(`?step=${currentStep - 1}`);
    };

    const handleSubmit = async () => {
        if (!validateStep()) return;
        try {
            const response = await fetch('/api/student/application', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });
            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || 'Submission failed');
            }
            setStatus("UNDER_REVIEW");
            router.push("?view=submitted");
            console.log("Application submitted successfully");

        } catch (err) {
            console.error("Submission Error:", err);
            alert("There was an error submitting your application. Please try again.");
        }
    };

    if (isLoading) return <div className="min-h-screen flex items-center justify-center font-bold text-slate-400">Loading Application...</div>;

    if (isSubmittedView || status === "UNDER_REVIEW" || status === "APPROVED" || status === "REJECTED" || status === "ON_HOLD") {
        return <SubmittedView />;
    }

    return (
        <div className="max-w-6xl mx-auto py-8 px-2 md:px-6 lg:px-8 bg-slate-50 min-h-screen">
            <StepIndicator currentStep={currentStep} status="IN_PROGRESS" />

            <main className="min-h-[70vh]">
                <div className="transition-all duration-300">
                    {currentStep === 1 && <Step1Foundations formData={formData} onChange={updateFormData} errors={errors} />}
                    {currentStep === 2 && <Step2Requirements formData={formData} onChange={updateFormData} errors={errors} />}
                    {currentStep === 3 && <Step3Support formData={formData} onChange={updateFormData} errors={errors} />}
                    {currentStep === 4 && <Step4Finalization formData={formData} onChange={updateFormData} errors={errors} />}
                </div>
            </main>

            <div className="mt-16 flex items-center justify-between border-t border-slate-200 pt-10 pb-20">
                <button
                    onClick={handleBack}
                    disabled={currentStep === 1}
                    className="flex items-center gap-2 px-8 py-4 rounded-2xl font-bold text-slate-500 hover:bg-slate-100 disabled:opacity-20 transition-all"
                >
                    <ChevronLeft className="h-5 w-5" /> Previous
                </button>

                <div className="flex gap-4">
                    <button
                        onClick={currentStep === 4 ? handleSubmit : handleNext}
                        className="bg-[#0f766e] text-white px-5 py-3 md:px-10 md:py-4 rounded-2xl font-bold shadow-xl shadow-teal-100 hover:scale-[1.02] active:scale-95 transition-all flex items-center gap-2"
                    >
                        {currentStep === 4 ? <><Send className="h-5 w-5" /> Final Submit</> : <>Next Step <ChevronRight className="h-5 w-5" /></>}
                    </button>
                </div>
            </div>
        </div>
    );
}

// Next.js requires Suspense for useSearchParams
export default function ApplicationPage() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <ApplicationContent />
        </Suspense>
    );
}
