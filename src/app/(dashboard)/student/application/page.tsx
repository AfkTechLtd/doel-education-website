"use client";

import { useState, useEffect, useRef, useCallback, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import {
    CheckCircle2, ChevronRight, ChevronLeft, FileText, User, GraduationCap,
    ClipboardCheck, Send, Users, Award, PenTool, HelpCircle, FileCheck,
    Activity, Shield, MessageSquare, X, AlertTriangle, Info, XCircle, Loader2,
    Banknote,
} from "lucide-react";
import { cn } from "@/lib/utils";
import StepIndicator from "@/components/dashboard/pages/application/StepIndicator";
import InputField from "@/components/dashboard/pages/application/InputField";
import FormSection from "@/components/dashboard/pages/application/FormSection";

// ─── TOAST SYSTEM ─────────────────────────────────────────────────────────────
type ToastType = "error" | "success" | "warning" | "info";
interface ToastItem {
    id: string;
    type: ToastType;
    title: string;
    messages?: string[];
}

const TOAST_CONFIG: Record<ToastType, { icon: React.ReactNode; bar: string; bg: string; title: string }> = {
    error: { icon: <XCircle className="h-5 w-5" />, bar: "bg-red-500", bg: "bg-white", title: "text-red-700" },
    success: { icon: <CheckCircle2 className="h-5 w-5" />, bar: "bg-emerald-500", bg: "bg-white", title: "text-emerald-700" },
    warning: { icon: <AlertTriangle className="h-5 w-5" />, bar: "bg-amber-500", bg: "bg-white", title: "text-amber-700" },
    info: { icon: <Info className="h-5 w-5" />, bar: "bg-blue-500", bg: "bg-white", title: "text-blue-700" },
};

const ICON_COLOR: Record<ToastType, string> = {
    error: "text-red-500", success: "text-emerald-500", warning: "text-amber-500", info: "text-blue-500",
};

function ToastContainer({ toasts, onRemove }: { toasts: ToastItem[]; onRemove: (id: string) => void }) {
    return (
        <div className="fixed top-6 right-6 z-[9999] flex flex-col gap-3 w-[360px] max-w-[calc(100vw-2rem)] pointer-events-none">
            {toasts.map((toast) => {
                const cfg = TOAST_CONFIG[toast.type];
                return (
                    <div
                        key={toast.id}
                        className={cn(
                            "pointer-events-auto flex items-start gap-0 rounded-2xl shadow-2xl shadow-slate-200/80 border border-slate-100 overflow-hidden",
                            "animate-in slide-in-from-right-5 fade-in duration-300",
                            cfg.bg,
                        )}
                    >
                        {/* Colored left bar */}
                        <div className={cn("w-1 self-stretch shrink-0 rounded-l-2xl", cfg.bar)} />

                        <div className="flex items-start gap-3 px-4 py-4 flex-1 min-w-0">
                            {/* Icon */}
                            <span className={cn("mt-0.5 shrink-0", ICON_COLOR[toast.type])}>
                                {cfg.icon}
                            </span>

                            {/* Content */}
                            <div className="flex-1 min-w-0">
                                <p className={cn("text-sm font-bold leading-snug", cfg.title)}>{toast.title}</p>
                                {toast.messages && toast.messages.length > 0 && (
                                    <ul className="mt-2 space-y-1">
                                        {toast.messages.map((msg, i) => (
                                            <li key={i} className="flex items-start gap-1.5 text-xs text-slate-600">
                                                <span className="mt-1 h-1.5 w-1.5 rounded-full bg-slate-400 shrink-0" />
                                                {msg}
                                            </li>
                                        ))}
                                    </ul>
                                )}
                            </div>

                            {/* Close */}
                            <button
                                onClick={() => onRemove(toast.id)}
                                className="shrink-0 ml-1 p-1 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors"
                            >
                                <X className="h-3.5 w-3.5" />
                            </button>
                        </div>
                    </div>
                );
            })}
        </div>
    );
}

// ─── TYPES ────────────────────────────────────────────────────────────────────
type ApplicationStatus = "NOT_STARTED" | "IN_PROGRESS" | "UNDER_REVIEW" | "APPROVED" | "REJECTED" | "ON_HOLD";
type FormData = Record<string, string | undefined>;

interface StepProps {
    formData: FormData;
    onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
    errors: Record<string, string>;
}

interface ApplicationSectionData {
    sectionNumber: string;
    data: FormData;
}

// --- LOCAL FORM HELPERS ---

const SelectField = ({ label, name, value, options, error, onChange }: {
    label: string; name: string; value?: string;
    options: { value: string; label: string }[];
    error?: string;
    onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}) => (
    <div className="space-y-2">
        <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400 ml-1">{label}</label>
        <select
            name={name} value={value || ""} onChange={onChange}
            className={cn(
                "w-full px-5 py-4 bg-slate-50 border-none rounded-2xl focus:ring-2 focus:ring-teal-500 transition-all outline-none",
                error ? "ring-2 ring-red-500 bg-red-50" : ""
            )}
        >
            <option value="">Select...</option>
            {options.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
        </select>
        {error && <p className="text-[10px] font-bold text-red-500 ml-1">{error}</p>}
    </div>
);

const TextareaField = ({ label, name, value, placeholder, rows = 6, error, hint, onChange }: {
    label: string; name: string; value?: string; placeholder?: string;
    rows?: number; error?: string; hint?: string;
    onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
}) => (
    <div className="space-y-2">
        <div className="flex items-center justify-between px-1">
            <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400">{label}</label>
            {hint && <span className="text-[10px] text-slate-400">{hint}</span>}
        </div>
        <textarea
            name={name} value={value || ""} onChange={onChange} rows={rows} placeholder={placeholder}
            className={cn(
                "w-full px-5 py-4 bg-slate-50 border-none rounded-2xl focus:ring-2 transition-all outline-none resize-none",
                error ? "ring-2 ring-red-500 bg-red-50" : "focus:ring-teal-500"
            )}
        />
        {error && <p className="text-[10px] font-bold text-red-500 ml-1">{error}</p>}
    </div>
);

const CheckboxField = ({ label, name, description, checked, onChange }: {
    label: string; name: string; description?: string; checked: boolean;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) => (
    <label className="flex items-start gap-4 p-5 bg-slate-50 rounded-2xl cursor-pointer hover:bg-slate-100 transition-colors group">
        <input name={name} type="checkbox" checked={checked} onChange={onChange}
            className="mt-0.5 h-5 w-5 rounded border-slate-300 text-teal-600 focus:ring-teal-600 shrink-0" />
        <div>
            <p className="text-sm font-semibold text-slate-800 group-hover:text-teal-700">{label}</p>
            {description && <p className="text-xs text-slate-500 mt-0.5">{description}</p>}
        </div>
    </label>
);

// Synthetic event factory for checkbox → onChange pipeline
function checkboxEvent(name: string, checked: boolean): React.ChangeEvent<HTMLInputElement> {
    return { target: { name, value: String(checked) } } as unknown as React.ChangeEvent<HTMLInputElement>;
}

const EDUCATION_LEVELS = [
    { value: "none", label: "No formal education" },
    { value: "primary", label: "Primary School" },
    { value: "secondary", label: "Secondary / High School" },
    { value: "bachelor", label: "Bachelor's Degree" },
    { value: "master", label: "Master's Degree" },
    { value: "phd", label: "PhD / Doctorate" },
];

// ─── STEP 1 — Sections 1, 2, 3 ───────────────────────────────────────────────
const Step1Foundations = ({ formData, onChange, errors }: StepProps) => (
    <div className="space-y-4">
        <div className="mb-10">
            <h1 className="text-4xl font-bold tracking-tight text-slate-900">Start Your Journey.</h1>
            <p className="text-slate-500 mt-2">Please provide accurate information as it appears on your official documents.</p>
        </div>

        {/* Section 1 — Personal Information */}
        <FormSection icon={User} title="Personal Information">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <InputField name="name" value={formData.name} onChange={onChange} label="Legal Full Name" placeholder="e.g. Jane Doe" error={errors.name} />
                <InputField name="email" value={formData.email} onChange={onChange} label="Email Address" placeholder="jane.doe@example.com" type="email" error={errors.email} />
                <InputField name="dateOfBirth" value={formData.dateOfBirth} onChange={onChange} label="Date of Birth" type="date" error={errors.dateOfBirth} />
                <InputField name="phone" value={formData.phone} onChange={onChange} label="Phone Number (with country code)" placeholder="+880 1XXX-XXXXXX" error={errors.phone} />
                <InputField name="nationality" value={formData.nationality} onChange={onChange} label="Nationality" placeholder="e.g. Bangladeshi" error={errors.nationality} />
                <SelectField
                    name="gender" label="Gender" value={formData.gender} onChange={onChange}
                    options={[
                        { value: "male", label: "Male" },
                        { value: "female", label: "Female" },
                        { value: "other", label: "Other" },
                        { value: "prefer_not", label: "Prefer not to say" },
                    ]}
                />
                <div className="md:col-span-2">
                    <InputField name="address" value={formData.address} onChange={onChange} label="Primary Address" placeholder="Street Address, City, State, ZIP" error={errors.address} />
                </div>
            </div>
        </FormSection>

        {/* Section 2 — Academic History */}
        <FormSection icon={GraduationCap} title="Academic History">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <InputField name="schoolName" value={formData.schoolName} onChange={onChange} label="Institution Name" placeholder="University of Excellence" error={errors.schoolName} />
                <InputField name="schoolCity" value={formData.schoolCity} onChange={onChange} label="Institution City" placeholder="Dhaka" />
                <InputField name="schoolCountry" value={formData.schoolCountry} onChange={onChange} label="Institution Country" placeholder="Bangladesh" />
                <SelectField
                    name="degreeObtained" label="Highest Degree Obtained" value={formData.degreeObtained}
                    onChange={onChange} error={errors.degreeObtained}
                    options={[
                        { value: "high_school", label: "High School Diploma / HSC" },
                        { value: "associate", label: "Associate Degree" },
                        { value: "bachelor", label: "Bachelor's Degree" },
                        { value: "master", label: "Master's Degree" },
                        { value: "other", label: "Other" },
                    ]}
                />
                <InputField name="graduationDate" value={formData.graduationDate} onChange={onChange} label="Graduation Date" type="date" error={errors.graduationDate} />
                <InputField name="fieldOfStudy" value={formData.fieldOfStudy} onChange={onChange} label="Field of Study / Major" placeholder="Computer Science" error={errors.fieldOfStudy} />
                <InputField name="gpa" value={formData.gpa} onChange={onChange} label="Cumulative GPA (0.0 – 4.0)" placeholder="3.75" error={errors.gpa} />
            </div>
        </FormSection>

        {/* Section 3 — Program Selection */}
        <FormSection icon={FileText} title="Program Selection">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <InputField name="targetUniversity" value={formData.targetUniversity} onChange={onChange} label="Target University" placeholder="e.g. University of Texas at Dallas" error={errors.targetUniversity} />
                <InputField name="degreeProgram" value={formData.degreeProgram} onChange={onChange} label="Desired Degree Program" placeholder="e.g. M.S. Computer Science" error={errors.degreeProgram} />
                <SelectField
                    name="startTerm" label="Intended Start Term" value={formData.startTerm}
                    onChange={onChange} error={errors.startTerm}
                    options={[
                        { value: "Fall", label: "Fall" },
                        { value: "Spring", label: "Spring" },
                        { value: "Summer", label: "Summer" },
                    ]}
                />
                <SelectField
                    name="targetYear" label="Target Year" value={formData.targetYear}
                    onChange={onChange} error={errors.targetYear}
                    options={[
                        { value: "2025", label: "2025" },
                        { value: "2026", label: "2026" },
                        { value: "2027", label: "2027" },
                        { value: "2028", label: "2028" },
                    ]}
                />
            </div>
        </FormSection>
    </div>
);

// ─── STEP 2 — Sections 4, 5, 6, 7 ───────────────────────────────────────────
const Step2Requirements = ({ formData, onChange, errors }: StepProps) => (
    <div className="space-y-4">
        <div className="mb-10">
            <h1 className="text-4xl font-bold tracking-tight text-slate-900">Testing & Achievements</h1>
            <p className="text-slate-500 mt-2">Indicate program requirements, provide your scores, statement, and extracurricular activities.</p>
        </div>

        {/* Section 4 — Test Requirements by Program */}
        <FormSection icon={ClipboardCheck} title="Test Requirements by Program">
            <p className="text-sm text-slate-500 mb-5">Select all standardized tests required by your target program.</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                {[
                    { name: "requiresSAT", label: "SAT" },
                    { name: "requiresACT", label: "ACT" },
                    { name: "requiresTOEFL", label: "TOEFL" },
                    { name: "requiresIELTS", label: "IELTS" },
                    { name: "requiresGRE", label: "GRE" },
                    { name: "requiresGMAT", label: "GMAT" },
                ].map(({ name, label }) => (
                    <CheckboxField key={name} name={name} label={label}
                        checked={formData[name] === "true"}
                        onChange={(e) => onChange(checkboxEvent(name, e.target.checked))}
                    />
                ))}
            </div>
        </FormSection>

        {/* Section 5 — Test Information / Scores (dynamic based on Section 4 selections) */}
        <FormSection icon={FileCheck} title="Test Information / Scores">
            {(() => {
                const anySelected = ["requiresSAT", "requiresACT", "requiresTOEFL", "requiresIELTS", "requiresGRE", "requiresGMAT"]
                    .some(k => formData[k] === "true");

                if (!anySelected) {
                    return (
                        <p className="text-sm text-slate-400 italic py-4 text-center">
                            No tests selected above. Select the required tests in the section above to enter your scores.
                        </p>
                    );
                }

                return (
                    <>
                        <p className="text-sm text-slate-500 mb-5">Enter your scores for the selected tests.</p>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                            {formData.requiresSAT === "true" && (
                                <>
                                    <InputField name="satMath" value={formData.satMath} onChange={onChange} label="SAT Math (200–800)" placeholder="750" error={errors.satMath} />
                                    <InputField name="satReading" value={formData.satReading} onChange={onChange} label="SAT Reading (200–800)" placeholder="710" error={errors.satReading} />
                                </>
                            )}
                            {formData.requiresACT === "true" && (
                                <InputField name="actComposite" value={formData.actComposite} onChange={onChange} label="ACT Composite (1–36)" placeholder="32" error={errors.actComposite} />
                            )}
                            {formData.requiresTOEFL === "true" && (
                                <InputField name="toeflScore" value={formData.toeflScore} onChange={onChange} label="TOEFL (0–120)" placeholder="110" error={errors.toeflScore} />
                            )}
                            {formData.requiresIELTS === "true" && (
                                <InputField name="ieltsScore" value={formData.ieltsScore} onChange={onChange} label="IELTS (0.0–9.0)" placeholder="7.5" error={errors.ieltsScore} />
                            )}
                            {formData.requiresGRE === "true" && (
                                <>
                                    <InputField name="greVerbal" value={formData.greVerbal} onChange={onChange} label="GRE Verbal (130–170)" placeholder="160" error={errors.greVerbal} />
                                    <InputField name="greQuantitative" value={formData.greQuantitative} onChange={onChange} label="GRE Quantitative (130–170)" placeholder="165" error={errors.greQuantitative} />
                                </>
                            )}
                            {formData.requiresGMAT === "true" && (
                                <InputField name="gmatScore" value={formData.gmatScore} onChange={onChange} label="GMAT (200–800)" placeholder="700" error={errors.gmatScore} />
                            )}
                            <InputField name="testDate" value={formData.testDate} onChange={onChange} label="Most Recent Test Date" type="date" error={errors.testDate} />
                        </div>
                    </>
                );
            })()}
        </FormSection>

        {/* Section 6 — Personal Statement / SOP */}
        <FormSection icon={PenTool} title="Personal Statement / Statement of Purpose">
            <div className="space-y-4">
                <div className="flex justify-end">
                    <Link href="/student/resources/sop"
                        className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-teal-700 hover:text-teal-800 transition-colors bg-teal-50 px-3 py-1 rounded-full border border-teal-100"
                    >
                        <HelpCircle className="h-3 w-3" />
                        Writing Guide
                    </Link>
                </div>
                <TextareaField
                    name="personalStatement" label="Statement of Purpose (max 500 words)"
                    placeholder="Describe your academic background, research interests, career goals, and why you are applying to this program..."
                    rows={15} error={errors.personalStatement} onChange={onChange} value={formData.personalStatement}
                />
            </div>
        </FormSection>

        {/* Section 6b — Asset Valuation */}
        <FormSection icon={Banknote} title="Asset Valuation & Financial Standing">
            {/* Info banner */}
            <div className="flex items-start gap-3 rounded-2xl border border-blue-100 bg-blue-50 px-5 py-4 mb-6">
                <Info className="h-4 w-4 text-blue-500 mt-0.5 shrink-0" />
                <p className="text-xs text-blue-700 leading-relaxed">
                    US universities and the USCIS require proof of sufficient funds to cover tuition and living expenses before issuing an I-20 or F-1 visa. This section documents your financial capacity. All values should be reported in <strong>USD equivalent</strong>.
                </p>
            </div>

            <div className="space-y-8">
                {/* Sponsor Information */}
                <div>
                    <h3 className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-4">Primary Financial Sponsor</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <InputField
                            name="sponsorFullName" value={formData.sponsorFullName} onChange={onChange}
                            label="Sponsor's Full Name" placeholder="e.g. Mohammad Rahman"
                            error={errors.sponsorFullName}
                        />
                        <SelectField
                            name="sponsorRelationship" label="Relationship to Applicant"
                            value={formData.sponsorRelationship} onChange={onChange}
                            options={[
                                { value: "self", label: "Self" },
                                { value: "father", label: "Father" },
                                { value: "mother", label: "Mother" },
                                { value: "spouse", label: "Spouse" },
                                { value: "sibling", label: "Sibling" },
                                { value: "relative", label: "Other Relative" },
                                { value: "employer", label: "Employer / Organization" },
                                { value: "government", label: "Government / Scholarship Body" },
                            ]}
                        />
                        <InputField
                            name="sponsorOccupation" value={formData.sponsorOccupation} onChange={onChange}
                            label="Sponsor's Occupation / Employer" placeholder="e.g. Business Owner, Government Officer"
                        />
                        <InputField
                            name="sponsorAnnualIncome" value={formData.sponsorAnnualIncome} onChange={onChange}
                            label="Sponsor's Annual Income (USD equivalent)" placeholder="e.g. 45000"
                            error={errors.sponsorAnnualIncome}
                        />
                    </div>
                </div>

                <div className="border-t border-slate-100" />

                {/* Liquid Assets */}
                <div>
                    <h3 className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-4">Liquid Assets</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <InputField
                            name="bankBalance" value={formData.bankBalance} onChange={onChange}
                            label="Total Bank Balance (USD equivalent)" placeholder="e.g. 30000"
                            error={errors.bankBalance}
                        />
                        <SelectField
                            name="primaryCurrency" label="Primary Currency of Assets"
                            value={formData.primaryCurrency} onChange={onChange}
                            options={[
                                { value: "BDT", label: "Bangladeshi Taka (BDT)" },
                                { value: "USD", label: "US Dollar (USD)" },
                                { value: "GBP", label: "British Pound (GBP)" },
                                { value: "EUR", label: "Euro (EUR)" },
                                { value: "CAD", label: "Canadian Dollar (CAD)" },
                                { value: "AUD", label: "Australian Dollar (AUD)" },
                                { value: "other", label: "Other" },
                            ]}
                        />
                        <InputField
                            name="fixedDepositAmount" value={formData.fixedDepositAmount} onChange={onChange}
                            label="Fixed Deposits / Savings Certificates (USD equivalent)" placeholder="e.g. 15000"
                        />
                        <InputField
                            name="investmentAssets" value={formData.investmentAssets} onChange={onChange}
                            label="Stocks, Bonds & Investment Accounts (USD equivalent)" placeholder="e.g. 5000"
                        />
                    </div>
                </div>

                <div className="border-t border-slate-100" />

                {/* Non-Liquid / Fixed Assets */}
                <div>
                    <h3 className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-4">Fixed / Non-Liquid Assets</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <InputField
                            name="realEstateValue" value={formData.realEstateValue} onChange={onChange}
                            label="Real Estate / Land Value (USD equivalent)" placeholder="e.g. 80000"
                        />
                        <InputField
                            name="businessAssets" value={formData.businessAssets} onChange={onChange}
                            label="Business / Commercial Assets (USD equivalent)" placeholder="e.g. 20000"
                        />
                        <InputField
                            name="otherAssets" value={formData.otherAssets} onChange={onChange}
                            label="Other Assets (vehicles, jewelry, etc.) (USD equivalent)" placeholder="e.g. 5000"
                        />
                        <InputField
                            name="totalLiabilities" value={formData.totalLiabilities} onChange={onChange}
                            label="Total Liabilities / Outstanding Loans (USD equivalent)" placeholder="e.g. 10000"
                        />
                    </div>
                </div>

                <div className="border-t border-slate-100" />

                {/* Funds Available for Education */}
                <div>
                    <h3 className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-4">Funds Available for Education</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <InputField
                            name="fundsAvailableForStudy" value={formData.fundsAvailableForStudy} onChange={onChange}
                            label="Total Funds Available for Study (USD)" placeholder="e.g. 50000"
                            error={errors.fundsAvailableForStudy}
                        />
                        <SelectField
                            name="fundingSource" label="Primary Funding Source"
                            value={formData.fundingSource} onChange={onChange}
                            options={[
                                { value: "personal_savings", label: "Personal Savings" },
                                { value: "family_support", label: "Family Support" },
                                { value: "scholarship", label: "Scholarship / Grant" },
                                { value: "bank_loan", label: "Education Bank Loan" },
                                { value: "employer_sponsor", label: "Employer Sponsorship" },
                                { value: "government", label: "Government Funding" },
                                { value: "mixed", label: "Mixed / Multiple Sources" },
                            ]}
                        />
                        <InputField
                            name="annualTuitionBudget" value={formData.annualTuitionBudget} onChange={onChange}
                            label="Estimated Annual Tuition Budget (USD)" placeholder="e.g. 20000"
                        />
                        <InputField
                            name="annualLivingBudget" value={formData.annualLivingBudget} onChange={onChange}
                            label="Estimated Annual Living Expenses (USD)" placeholder="e.g. 12000"
                        />
                    </div>
                </div>

                <div className="border-t border-slate-100" />

                {/* Financial Documents Availability */}
                <div>
                    <h3 className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-4">Supporting Financial Documents</h3>
                    <p className="text-xs text-slate-500 mb-4">Select all financial documents you currently have available. These will be required during the I-20 / visa stage.</p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {[
                            { name: "hasBankStatement", label: "Bank Statement (last 3–6 months)", description: "Official statement from your bank showing balance history" },
                            { name: "hasSolvencyLetter", label: "Bank Solvency Letter", description: "Letter from bank confirming funds are available and unencumbered" },
                            { name: "hasIncomeTaxReturn", label: "Income Tax Return / Certificate", description: "Sponsor's latest tax return or tax certificate" },
                            { name: "hasPropertyDocuments", label: "Property / Land Documents", description: "Title deed or valuation certificate for real estate assets" },
                            { name: "hasSponsorLetter", label: "Financial Sponsor Affidavit", description: "Notarized letter from sponsor guaranteeing financial support" },
                            { name: "hasLoanApprovalLetter", label: "Education Loan Approval Letter", description: "Bank or lending institution approval letter (if applicable)" },
                        ].map(({ name, label, description }) => (
                            <CheckboxField key={name} name={name} label={label} description={description}
                                checked={formData[name] === "true"}
                                onChange={(e) => onChange(checkboxEvent(name, e.target.checked))}
                            />
                        ))}
                    </div>
                </div>

                <TextareaField
                    name="financialNotes" label="Additional Financial Notes (optional)"
                    placeholder="Describe any additional financial circumstances, ongoing scholarship applications, or context the counselor should be aware of..."
                    rows={4} onChange={onChange} value={formData.financialNotes}
                />
            </div>
        </FormSection>

        {/* Section 7 — Extracurricular Activities */}
        <FormSection icon={Activity} title="Extracurricular Activities">
            <div className="space-y-6">
                <TextareaField name="activities" label="Extracurricular Activities"
                    placeholder="List clubs, sports, arts, or other organized activities you participated in..." rows={4}
                    onChange={onChange} value={formData.activities} />
                <TextareaField name="leadershipRoles" label="Leadership Roles & Positions"
                    placeholder="Describe any leadership positions held (e.g. Club President, Team Captain, Student Council)..." rows={4}
                    onChange={onChange} value={formData.leadershipRoles} />
                <TextareaField name="awardsHonors" label="Awards & Honors"
                    placeholder="List academic, extracurricular, or professional awards and honors received..." rows={4}
                    onChange={onChange} value={formData.awardsHonors} />
                <TextareaField name="communityService" label="Community Service & Volunteering"
                    placeholder="Describe volunteer work or community service activities, including organization name and hours..." rows={4}
                    onChange={onChange} value={formData.communityService} />
            </div>
        </FormSection>
    </div>
);

// ─── STEP 3 — Sections 8, 9, 10, 11 ─────────────────────────────────────────
const Step3Support = ({ formData, onChange, errors }: StepProps) => {
    const recsRequired = parseInt(formData.recommendationsRequired || "0");
    return (
        <div className="space-y-4">
            <div className="mb-10">
                <h1 className="text-4xl font-bold tracking-tight text-slate-900">Family & Support</h1>
                <p className="text-slate-500 mt-2">Provide family background, recommender contacts, and financial aid information.</p>
            </div>

            {/* Section 8 — Family Information */}
            <FormSection icon={Users} title="Family Information">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <InputField name="fatherName" value={formData.fatherName} onChange={onChange} label="Father's Full Name" placeholder="e.g. Mohammad Rahman" />
                    <InputField name="fatherOccupation" value={formData.fatherOccupation} onChange={onChange} label="Father's Occupation" placeholder="e.g. Engineer" />
                    <SelectField name="fatherEducation" label="Father's Education Level" value={formData.fatherEducation} onChange={onChange} options={EDUCATION_LEVELS} />
                    <InputField name="motherName" value={formData.motherName} onChange={onChange} label="Mother's Full Name" placeholder="e.g. Fatema Begum" />
                    <InputField name="motherOccupation" value={formData.motherOccupation} onChange={onChange} label="Mother's Occupation" placeholder="e.g. Teacher" />
                    <SelectField name="motherEducation" label="Mother's Education Level" value={formData.motherEducation} onChange={onChange} options={EDUCATION_LEVELS} />
                    <InputField name="guardianName" value={formData.guardianName} onChange={onChange} label="Primary Guardian Full Name" placeholder="If different from parents" error={errors.guardianName} />
                    <InputField name="guardianPhone" value={formData.guardianPhone} onChange={onChange} label="Guardian Phone Number" placeholder="+880 1XXX-XXXXXX" />
                    <InputField name="guardianRelationship" value={formData.guardianRelationship} onChange={onChange} label="Guardian's Relationship to Applicant" placeholder="e.g. Father, Uncle" />
                </div>
            </FormSection>

            {/* Section 9 — Recommendation Requirements */}
            <FormSection icon={ClipboardCheck} title="Recommendation Requirements by Program">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <SelectField
                        name="recommendationsRequired" label="Number of Recommendations Required"
                        value={formData.recommendationsRequired} onChange={onChange} error={errors.recommendationsRequired}
                        options={[
                            { value: "0", label: "None required" },
                            { value: "1", label: "1 Recommendation" },
                            { value: "2", label: "2 Recommendations" },
                            { value: "3", label: "3 Recommendations" },
                        ]}
                    />
                    <TextareaField name="requirementNotes" label="Program-Specific Requirements (optional)"
                        placeholder="Any specific instructions from the program regarding recommenders..."
                        rows={3} onChange={onChange} value={formData.requirementNotes} />
                </div>
            </FormSection>

            {/* Section 10 — Recommendations / LOR */}
            <FormSection icon={MessageSquare} title="Recommendations / Letters of Recommendation">
                <p className="text-sm text-slate-500 mb-6">Provide contact details for each recommender. They will be contacted by your counselor.</p>
                <div className="space-y-8">
                    {/* Recommender 1 — always shown */}
                    <div>
                        <h3 className="text-sm font-bold text-slate-700 mb-4 flex items-center gap-2">
                            <span className="h-6 w-6 rounded-full bg-teal-50 border border-teal-200 text-teal-700 text-xs font-bold flex items-center justify-center">1</span>
                            Recommender 1
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <InputField name="rec1Name" value={formData.rec1Name} onChange={onChange} label="Full Name" placeholder="Dr. John Smith" error={errors.rec1Name} />
                            <InputField name="rec1Title" value={formData.rec1Title} onChange={onChange} label="Title / Position" placeholder="Professor of Computer Science" />
                            <InputField name="rec1Email" value={formData.rec1Email} onChange={onChange} label="Email Address" placeholder="j.smith@university.edu" type="email" error={errors.rec1Email} />
                            <InputField name="rec1Institution" value={formData.rec1Institution} onChange={onChange} label="Institution / Organization" placeholder="MIT" />
                        </div>
                    </div>

                    {/* Recommender 2 — shown when ≥ 2 required */}
                    {recsRequired >= 2 && (
                        <div>
                            <h3 className="text-sm font-bold text-slate-700 mb-4 flex items-center gap-2">
                                <span className="h-6 w-6 rounded-full bg-teal-50 border border-teal-200 text-teal-700 text-xs font-bold flex items-center justify-center">2</span>
                                Recommender 2
                            </h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <InputField name="rec2Name" value={formData.rec2Name} onChange={onChange} label="Full Name" placeholder="Prof. Jane Lee" />
                                <InputField name="rec2Title" value={formData.rec2Title} onChange={onChange} label="Title / Position" placeholder="Associate Professor" />
                                <InputField name="rec2Email" value={formData.rec2Email} onChange={onChange} label="Email Address" placeholder="j.lee@university.edu" type="email" />
                                <InputField name="rec2Institution" value={formData.rec2Institution} onChange={onChange} label="Institution / Organization" placeholder="Stanford University" />
                            </div>
                        </div>
                    )}

                    {/* Recommender 3 — shown when 3 required */}
                    {recsRequired >= 3 && (
                        <div>
                            <h3 className="text-sm font-bold text-slate-700 mb-4 flex items-center gap-2">
                                <span className="h-6 w-6 rounded-full bg-teal-50 border border-teal-200 text-teal-700 text-xs font-bold flex items-center justify-center">3</span>
                                Recommender 3
                            </h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <InputField name="rec3Name" value={formData.rec3Name} onChange={onChange} label="Full Name" placeholder="Mr. Alex Johnson" />
                                <InputField name="rec3Title" value={formData.rec3Title} onChange={onChange} label="Title / Position" placeholder="Industry Mentor" />
                                <InputField name="rec3Email" value={formData.rec3Email} onChange={onChange} label="Email Address" placeholder="a.johnson@company.com" type="email" />
                                <InputField name="rec3Institution" value={formData.rec3Institution} onChange={onChange} label="Institution / Organization" placeholder="Google" />
                            </div>
                        </div>
                    )}
                </div>
            </FormSection>

            {/* Section 11 — Scholarships / Financial Aid */}
            <FormSection icon={Award} title="Scholarships / Financial Aid">
                <div className="space-y-4">
                    <CheckboxField name="applyingForScholarship" label="I am applying for a scholarship"
                        description="Check if you wish to be considered for any merit or need-based scholarship programs."
                        checked={formData.applyingForScholarship === "true"}
                        onChange={(e) => onChange(checkboxEvent("applyingForScholarship", e.target.checked))} />
                    {formData.applyingForScholarship === "true" && (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pl-4 pt-2 border-l-2 border-teal-100">
                            <SelectField name="scholarshipType" label="Scholarship Type" value={formData.scholarshipType} onChange={onChange}
                                options={[
                                    { value: "merit", label: "Merit-Based" },
                                    { value: "need", label: "Need-Based" },
                                    { value: "athletic", label: "Athletic" },
                                    { value: "other", label: "Other" },
                                ]} />
                            <InputField name="sponsorName" value={formData.sponsorName} onChange={onChange}
                                label="Sponsor / Funding Source (if any)" placeholder="e.g. Government Scholarship, Self-funded" />
                        </div>
                    )}
                    <CheckboxField name="financialAidRequired" label="I require financial aid"
                        description="Check if you need financial assistance beyond scholarships."
                        checked={formData.financialAidRequired === "true"}
                        onChange={(e) => onChange(checkboxEvent("financialAidRequired", e.target.checked))} />
                </div>
            </FormSection>
        </div>
    );
};

// ─── STEP 4 — Sections 12, 13, 14 ────────────────────────────────────────────
const Step4Finalization = ({ formData, onChange, errors }: StepProps) => {
    const hasDisclosure =
        formData.hasCriminalRecord === "true" ||
        formData.hasAcademicViolation === "true" ||
        formData.hasDisciplinaryAction === "true";

    const isReadyToSubmit =
        formData.agreeToTerms === "true" &&
        formData.agreeToAccuracy === "true" &&
        formData.agreeToConduct === "true" &&
        !!formData.signature;

    return (
        <div className="space-y-4">
            <div className="mb-10">
                <h1 className="text-4xl font-bold tracking-tight text-slate-900">Finalization</h1>
                <p className="text-slate-500 mt-2">Complete the final sections and submit your application.</p>
            </div>

            {/* Section 12 — Additional / Supplemental Questions */}
            <FormSection icon={HelpCircle} title="Additional / Supplemental Questions">
                <div className="space-y-6">
                    <TextareaField name="whyThisUniversity" label="Why this university?"
                        placeholder="Explain what specifically attracts you to this institution..."
                        rows={5} onChange={onChange} value={formData.whyThisUniversity} error={errors.whyThisUniversity} />
                    <TextareaField name="whyThisProgram" label="Why this program?"
                        placeholder="Describe how this program aligns with your academic and career goals..."
                        rows={5} onChange={onChange} value={formData.whyThisProgram} error={errors.whyThisProgram} />
                    <SelectField name="hearAboutUs" label="How did you hear about us?" value={formData.hearAboutUs} onChange={onChange}
                        options={[
                            { value: "counselor", label: "School Counselor" },
                            { value: "friend", label: "Friend / Family" },
                            { value: "social_media", label: "Social Media" },
                            { value: "event", label: "Education Fair / Event" },
                            { value: "search", label: "Web Search" },
                            { value: "other", label: "Other" },
                        ]} />
                    <TextareaField name="additionalInfo" label="Additional Information (optional)"
                        placeholder="Any other information you would like to share with the admissions committee..."
                        rows={4} onChange={onChange} value={formData.additionalInfo} />
                </div>
            </FormSection>

            {/* Section 13 — Community Standards / Conduct Disclosure */}
            <FormSection icon={Shield} title="Community Standards / Conduct Disclosure">
                <p className="text-sm text-slate-500 mb-6">
                    Please answer the following honestly. A Yes does not automatically disqualify your application.
                </p>
                <div className="space-y-3">
                    <CheckboxField name="hasCriminalRecord"
                        label="Have you ever been convicted of a felony or criminal offense?"
                        checked={formData.hasCriminalRecord === "true"}
                        onChange={(e) => onChange(checkboxEvent("hasCriminalRecord", e.target.checked))} />
                    <CheckboxField name="hasAcademicViolation"
                        label="Have you ever been found responsible for academic dishonesty?"
                        checked={formData.hasAcademicViolation === "true"}
                        onChange={(e) => onChange(checkboxEvent("hasAcademicViolation", e.target.checked))} />
                    <CheckboxField name="hasDisciplinaryAction"
                        label="Have you ever been subject to disciplinary action at an academic institution?"
                        checked={formData.hasDisciplinaryAction === "true"}
                        onChange={(e) => onChange(checkboxEvent("hasDisciplinaryAction", e.target.checked))} />
                </div>
                {hasDisclosure && (
                    <div className="mt-6">
                        <TextareaField name="conductExplanation" label="Please explain the circumstances"
                            placeholder="Provide details about the incident(s) above, including dates, institutions, and outcomes..."
                            rows={5} onChange={onChange} value={formData.conductExplanation} error={errors.conductExplanation} />
                    </div>
                )}
                <div className="mt-6">
                    <CheckboxField name="agreeToConduct"
                        label="I agree to uphold the community standards and code of conduct"
                        description="By checking this box, you certify that you will abide by the institution's community standards."
                        checked={formData.agreeToConduct === "true"}
                        onChange={(e) => onChange(checkboxEvent("agreeToConduct", e.target.checked))} />
                    {errors.agreeToConduct && <p className="text-[10px] font-bold text-red-500 ml-1 mt-1">{errors.agreeToConduct}</p>}
                </div>
            </FormSection>

            {/* Section 14 — Signature & Final Review */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2">
                    <FormSection icon={PenTool} title="Signature & Final Review">
                        <div className="space-y-4">
                            <CheckboxField name="agreeToTerms"
                                label="I agree to the terms and conditions of this application"
                                description="By submitting, you agree to all terms, policies, and requirements of the application process."
                                checked={formData.agreeToTerms === "true"}
                                onChange={(e) => onChange(checkboxEvent("agreeToTerms", e.target.checked))} />
                            {errors.agreeToTerms && <p className="text-[10px] font-bold text-red-500 ml-1">{errors.agreeToTerms}</p>}

                            <CheckboxField name="agreeToAccuracy"
                                label="I certify that all information provided is true and accurate"
                                description="You understand that false or misleading information may result in disqualification."
                                checked={formData.agreeToAccuracy === "true"}
                                onChange={(e) => onChange(checkboxEvent("agreeToAccuracy", e.target.checked))} />
                            {errors.agreeToAccuracy && <p className="text-[10px] font-bold text-red-500 ml-1">{errors.agreeToAccuracy}</p>}

                            <div className="pt-4">
                                <InputField name="signature" value={formData.signature} onChange={onChange}
                                    label="Digital Signature — Type your full legal name"
                                    placeholder="Type full legal name as it appears on your ID"
                                    error={errors.signature} />
                            </div>
                        </div>
                    </FormSection>
                </div>

                {/* Submission checklist panel */}
                <div className="bg-slate-50 rounded-[2.5rem] p-8 border border-slate-100 h-fit">
                    <h3 className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-6">Submission Checklist</h3>
                    <div className="space-y-3 text-xs text-slate-600">
                        {[
                            { label: "Terms agreed", key: "agreeToTerms" },
                            { label: "Accuracy certified", key: "agreeToAccuracy" },
                            { label: "Conduct agreed", key: "agreeToConduct" },
                        ].map(({ label, key }) => (
                            <div key={key} className="flex items-center justify-between">
                                <span>{label}</span>
                                <span>{formData[key] === "true" ? "✅" : "❌"}</span>
                            </div>
                        ))}
                        <div className="flex items-center justify-between">
                            <span>Signature</span>
                            <span>{formData.signature ? "✅" : "❌"}</span>
                        </div>
                        <div className="mt-4 pt-4 border-t border-slate-200">
                            <span className={cn("font-bold text-sm", isReadyToSubmit ? "text-emerald-600" : "text-slate-400")}>
                                {isReadyToSubmit ? "Ready to submit!" : "Please complete all fields"}
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

// ─── SUBMITTED VIEW ──────────────────────────────────────────────────────────────────────────────────────────────────────────────────────
const SubmittedView = () => (
    <div className="space-y-8 animate-in zoom-in duration-500 max-w-4xl mx-auto mt-10">
        <div className="bg-teal-50 border border-teal-100 rounded-[2.5rem] p-10 text-center">
            <div className="h-20 w-20 bg-[#0f766e] rounded-3xl flex items-center justify-center text-white shadow-xl mx-auto mb-6">
                <ClipboardCheck className="h-10 w-10" />
            </div>
            <h2 className="text-3xl font-bold text-[#0f766e] mb-4">Application Submitted</h2>
            <p className="text-teal-700 text-lg">Your application is currently under review. You can no longer edit your responses.</p>
            <Link href="/student/application/history" className="mt-8 inline-block bg-[#0f766e] text-white px-8 py-3 rounded-xl font-bold">
                Application History
            </Link>
        </div>
    </div>
);

// ─── MAIN COMPONENT ───────────────────────────────────────────────────────────
function ApplicationContent() {
    const router = useRouter();
    const searchParams = useSearchParams();

    const currentStep = parseInt(searchParams.get("step") || "1");
    const isSubmittedView = searchParams.get("view") === "submitted";

    const [status, setStatus] = useState<ApplicationStatus>("NOT_STARTED");
    const [formData, setFormData] = useState<FormData>({});
    const [errors, setErrors] = useState<Record<string, string>>({});
    const [isLoading, setIsLoading] = useState(true);
    const [isSaving, setIsSaving] = useState(false);
    const [toasts, setToasts] = useState<ToastItem[]>([]);
    const hasInitialized = useRef(false);

    const removeToast = useCallback((id: string) => {
        setToasts(prev => prev.filter(t => t.id !== id));
    }, []);

    const addToast = useCallback((type: ToastType, title: string, messages?: string[], duration = 6000) => {
        const id = crypto.randomUUID();
        setToasts(prev => [...prev, { id, type, title, messages }]);
        if (duration > 0) setTimeout(() => removeToast(id), duration);
    }, [removeToast]);

    useEffect(() => {
        if (hasInitialized.current) return;
        hasInitialized.current = true;

        const initApplication = async () => {
            try {
                const res = await fetch('/api/student/application');
                const data = await res.json();

                if (!data.application) {
                    setStatus("NOT_STARTED");
                    if (!searchParams.get("step")) router.replace("?step=1");
                    try {
                        const studentRes = await fetch('/api/student/details');
                        const studentData = await studentRes.json();
                        if (studentData.student) {
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

                // --- NEW TRANSLATOR: Convert Nested DB Models back to flat strings ---
                const flatData: FormData = {};

                // Helper: safely format dates for inputs (YYYY-MM-DD)
                const formatDate = (isoString?: string) => isoString ? new Date(isoString).toISOString().split('T')[0] : undefined;
                // Helper: convert booleans/numbers back to strings
                const castStr = (val?: string | number | boolean | null) => (val !== null && val !== undefined) ? String(val) : undefined;

                // Hub
                flatData.targetUniversity = castStr(app.targetUniversity);
                flatData.degreeProgram = castStr(app.degreeProgram);
                flatData.startTerm = castStr(app.startTerm);
                flatData.targetYear = castStr(app.targetYear);

                // Personal Info
                if (app.personalInfo) {
                    Object.assign(flatData, {
                        name: app.personalInfo.name || "",
                        email: app.personalInfo.email || "",
                        dateOfBirth: formatDate(app.personalInfo.dateOfBirth),
                        phone: app.personalInfo.phone || "",
                        nationality: app.personalInfo.nationality || "",
                        gender: app.personalInfo.gender || "",
                        address: app.personalInfo.address || ""
                    });
                }

                // Academic Record
                if (app.academicRecord) {
                    Object.assign(flatData, {
                        schoolName: app.academicRecord.schoolName || "",
                        schoolCity: app.academicRecord.schoolCity || "",
                        schoolCountry: app.academicRecord.schoolCountry || "",
                        degreeObtained: app.academicRecord.degreeObtained || "",
                        graduationDate: formatDate(app.academicRecord.graduationDate),
                        fieldOfStudy: app.academicRecord.fieldOfStudy || "",
                        gpa: castStr(app.academicRecord.gpa)
                    });
                }

                // Test Scores
                if (app.testScores) {
                    const ts = app.testScores;
                    Object.assign(flatData, {
                        requiresSAT: castStr(ts.requiresSAT), requiresACT: castStr(ts.requiresACT),
                        requiresTOEFL: castStr(ts.requiresTOEFL), requiresIELTS: castStr(ts.requiresIELTS),
                        requiresGRE: castStr(ts.requiresGRE), requiresGMAT: castStr(ts.requiresGMAT),
                        satMath: castStr(ts.satMath), satReading: castStr(ts.satReading),
                        actComposite: castStr(ts.actComposite), toeflScore: castStr(ts.toeflScore),
                        ieltsScore: castStr(ts.ieltsScore), greVerbal: castStr(ts.greVerbal),
                        greQuantitative: castStr(ts.greQuantitative), gmatScore: castStr(ts.gmatScore),
                        testDate: formatDate(ts.testDate)
                    });
                }

                // Extracurriculars
                if (app.extracurriculars) {
                    Object.assign(flatData, {
                        activities: app.extracurriculars.activities || "",
                        leadershipRoles: app.extracurriculars.leadershipRoles || "",
                        awardsHonors: app.extracurriculars.awardsHonors || "",
                        communityService: app.extracurriculars.communityService || ""
                    });
                }

                // Family Info
                if (app.familyInfo) {
                    Object.assign(flatData, {
                        fatherName: app.familyInfo.fatherName || "", fatherOccupation: app.familyInfo.fatherOccupation || "", fatherEducation: app.familyInfo.fatherEducation || "",
                        motherName: app.familyInfo.motherName || "", motherOccupation: app.familyInfo.motherOccupation || "", motherEducation: app.familyInfo.motherEducation || "",
                        guardianName: app.familyInfo.guardianName || "", guardianPhone: app.familyInfo.guardianPhone || "", guardianRelationship: app.familyInfo.guardianRelationship || ""
                    });
                }

                // Financial Standing
                if (app.financialStanding) {
                    const fs = app.financialStanding;
                    Object.assign(flatData, {
                        sponsorFullName: fs.sponsorFullName || "", sponsorRelationship: fs.sponsorRelationship || "", sponsorOccupation: fs.sponsorOccupation || "", sponsorAnnualIncome: castStr(fs.sponsorAnnualIncome),
                        bankBalance: castStr(fs.bankBalance), primaryCurrency: fs.primaryCurrency || "", fixedDepositAmount: castStr(fs.fixedDepositAmount), investmentAssets: castStr(fs.investmentAssets),
                        realEstateValue: castStr(fs.realEstateValue), businessAssets: castStr(fs.businessAssets), otherAssets: castStr(fs.otherAssets), totalLiabilities: castStr(fs.totalLiabilities),
                        fundsAvailableForStudy: castStr(fs.fundsAvailableForStudy), fundingSource: fs.fundingSource || "", annualTuitionBudget: castStr(fs.annualTuitionBudget), annualLivingBudget: castStr(fs.annualLivingBudget),
                        applyingForScholarship: castStr(fs.applyingForScholarship), scholarshipType: fs.scholarshipType || "", financialAidRequired: castStr(fs.financialAidRequired),
                        hasBankStatement: castStr(fs.hasBankStatement), hasSolvencyLetter: castStr(fs.hasSolvencyLetter), hasIncomeTaxReturn: castStr(fs.hasIncomeTaxReturn),
                        hasPropertyDocuments: castStr(fs.hasPropertyDocuments), hasSponsorLetter: castStr(fs.hasSponsorLetter), hasLoanApprovalLetter: castStr(fs.hasLoanApprovalLetter),
                        financialNotes: fs.financialNotes || ""
                    });
                }

                // Supplemental
                if (app.supplemental) {
                    Object.assign(flatData, {
                        personalStatement: app.supplemental.personalStatement || "", whyThisUniversity: app.supplemental.whyThisUniversity || "",
                        whyThisProgram: app.supplemental.whyThisProgram || "", hearAboutUs: app.supplemental.hearAboutUs || "",
                        additionalInfo: app.supplemental.additionalInfo || "", requirementNotes: app.supplemental.requirementNotes || ""
                    });
                }

                // Conduct
                if (app.conductAgreement) {
                    Object.assign(flatData, {
                        hasCriminalRecord: castStr(app.conductAgreement.hasCriminalRecord), hasAcademicViolation: castStr(app.conductAgreement.hasAcademicViolation),
                        hasDisciplinaryAction: castStr(app.conductAgreement.hasDisciplinaryAction), conductExplanation: app.conductAgreement.conductExplanation || "",
                        agreeToConduct: castStr(app.conductAgreement.agreeToConduct), agreeToTerms: castStr(app.conductAgreement.agreeToTerms),
                        agreeToAccuracy: castStr(app.conductAgreement.agreeToAccuracy), signature: app.conductAgreement.signature || ""
                    });
                }

                // Recommenders Array (1:M)
                if (app.recommenders && app.recommenders.length > 0) {
                    flatData.recommendationsRequired = String(app.recommenders.length);
                    app.recommenders.forEach((rec: any, idx: number) => {
                        const i = idx + 1;
                        flatData[`rec${i}Name`] = rec.name;
                        flatData[`rec${i}Email`] = rec.email;
                        flatData[`rec${i}Title`] = rec.title || "";
                        flatData[`rec${i}Institution`] = rec.institution || "";
                    });
                }

                // Clean up undefined values
                Object.keys(flatData).forEach(key => flatData[key] === undefined && delete flatData[key]);

                setFormData(prev => ({ ...prev, ...flatData }));
                // --- END NEW TRANSLATOR ---

                const hasSubmitted = !["NOT_STARTED", "IN_PROGRESS"].includes(appStatus);
                if (hasSubmitted || searchParams.get("view") === "submitted") {
                    router.replace("?view=submitted");
                } else if (!searchParams.get("step")) {
                    router.replace(`?step=1`);
                }
            } catch (err) {
                console.error("Failed to load application data:", err);
            } finally {
                setIsLoading(false);
            }
        };

        initApplication();
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    const validateStep = (): boolean => {
        const e: Record<string, string> = {};

        if (currentStep === 1) {
            if (!formData.name) e.name = "Legal full name is required";
            if (!formData.email) e.email = "Email address is required";
            if (!formData.dateOfBirth) e.dateOfBirth = "Date of birth is required";
            if (!formData.phone) e.phone = "Phone number is required";
            if (!formData.nationality) e.nationality = "Nationality is required";
            if (!formData.address) e.address = "Address is required";
            if (!formData.schoolName) e.schoolName = "Institution name is required";
            if (!formData.degreeObtained) e.degreeObtained = "Highest degree obtained is required";
            if (!formData.graduationDate) e.graduationDate = "Graduation date is required";
            if (!formData.fieldOfStudy) e.fieldOfStudy = "Field of study is required";
            if (!formData.gpa) {
                e.gpa = "GPA is required";
            } else {
                const gpa = parseFloat(formData.gpa);
                if (isNaN(gpa) || gpa < 0 || gpa > 4.0) e.gpa = "GPA must be between 0.0 and 4.0";
            }
            if (!formData.targetUniversity) e.targetUniversity = "Target university is required";
            if (!formData.degreeProgram) e.degreeProgram = "Desired degree program is required";
            if (!formData.startTerm) e.startTerm = "Intended start term is required";
            if (!formData.targetYear) e.targetYear = "Target year is required";
        }

        if (currentStep === 2) {
            if (formData.satMath) {
                const v = parseInt(formData.satMath);
                if (isNaN(v) || v < 200 || v > 800) e.satMath = "SAT Math must be 200–800";
            }
            if (formData.satReading) {
                const v = parseInt(formData.satReading);
                if (isNaN(v) || v < 200 || v > 800) e.satReading = "SAT Reading must be 200–800";
            }
            if (formData.actComposite) {
                const v = parseInt(formData.actComposite);
                if (isNaN(v) || v < 1 || v > 36) e.actComposite = "ACT Composite must be 1–36";
            }
            if (formData.toeflScore) {
                const v = parseInt(formData.toeflScore);
                if (isNaN(v) || v < 0 || v > 120) e.toeflScore = "TOEFL must be 0–120";
            }
            if (formData.ieltsScore) {
                const v = parseFloat(formData.ieltsScore);
                if (isNaN(v) || v < 0 || v > 9.0) e.ieltsScore = "IELTS must be 0.0–9.0";
            }
            if (formData.greVerbal) {
                const v = parseInt(formData.greVerbal);
                if (isNaN(v) || v < 130 || v > 170) e.greVerbal = "GRE Verbal must be 130–170";
            }
            if (formData.greQuantitative) {
                const v = parseInt(formData.greQuantitative);
                if (isNaN(v) || v < 130 || v > 170) e.greQuantitative = "GRE Quantitative must be 130–170";
            }
            if (formData.gmatScore) {
                const v = parseInt(formData.gmatScore);
                if (isNaN(v) || v < 200 || v > 800) e.gmatScore = "GMAT must be 200–800";
            }
            if (!formData.personalStatement) e.personalStatement = "Statement of Purpose is required";
        }

        if (currentStep === 3) {
            const recsNeeded = parseInt(formData.recommendationsRequired || "0");
            if (recsNeeded > 0) {
                if (!formData.rec1Name) e.rec1Name = "Recommender 1 name is required";
                if (!formData.rec1Email) e.rec1Email = "Recommender 1 email is required";
            }
        }

        if (currentStep === 4) {
            if (!formData.whyThisUniversity) e.whyThisUniversity = "Please explain why you chose this university";
            if (!formData.whyThisProgram) e.whyThisProgram = "Please explain why you chose this program";
            const hasDisclosure =
                formData.hasCriminalRecord === "true" ||
                formData.hasAcademicViolation === "true" ||
                formData.hasDisciplinaryAction === "true";
            if (hasDisclosure && !formData.conductExplanation) {
                e.conductExplanation = "Please provide an explanation for the checked items";
            }
            if (formData.agreeToConduct !== "true") e.agreeToConduct = "You must agree to uphold community standards";
            if (formData.agreeToTerms !== "true") e.agreeToTerms = "You must agree to the terms and conditions";
            if (formData.agreeToAccuracy !== "true") e.agreeToAccuracy = "You must certify the accuracy of your information";
            if (!formData.signature) e.signature = "Digital signature is required";
        }

        const messages = Object.values(e);
        if (messages.length > 0) {
            setErrors(e);
            addToast(
                "error",
                `${messages.length} issue${messages.length > 1 ? "s" : ""} found — please review`,
                messages,
                8000,
            );
            return false;
        }
        setErrors({});
        return true;
    };

    const updateFormData = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        if (errors[name]) setErrors(prev => { const n = { ...prev }; delete n[name]; return n; });
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleNext = async () => {
        if (!validateStep()) return;
        await fetch('/api/student/application', {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ step: currentStep, data: formData }),
        });
        window.scrollTo({ top: 0, behavior: 'smooth' });
        router.push(`?step=${currentStep + 1}`);
    };

    const handleBack = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
        router.push(`?step=${currentStep - 1}`);
    };

    const handleSubmit = async () => {
        if (!validateStep()) return;
        setIsSaving(true);
        try {
            await fetch('/api/student/application', {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ step: currentStep, data: formData }),
            });
            const response = await fetch('/api/student/application', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || 'Submission failed');
            }

            setStatus("UNDER_REVIEW");
            router.push("?view=submitted");
        } catch (err) {
            console.error("Submission Error:", err);
            addToast("error", "Submission failed", ["There was an error submitting your application. Please try again."]);
        } finally {
            setIsSaving(false); // Stop loading
        }
    };

    if (isLoading) {
        return (
            <div className="flex min-h-[60vh] flex-col items-center justify-center gap-4">
                <Loader2 className="h-10 w-10 animate-spin text-primary" />
                <p className="animate-pulse font-inter text-sm font-medium text-slate-500">Loading application...</p>
            </div>
        );
    }

    if (isSubmittedView || ["UNDER_REVIEW", "APPROVED", "REJECTED", "ON_HOLD"].includes(status)) {
        return <SubmittedView />;
    }

    return (
        <>
            <ToastContainer toasts={toasts} onRemove={removeToast} />
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
                    <button onClick={handleBack} disabled={currentStep === 1}
                        className="flex items-center gap-2 px-8 py-4 rounded-2xl font-bold text-slate-500 hover:bg-slate-100 disabled:opacity-20 transition-all">
                        <ChevronLeft className="h-5 w-5" /> Previous
                    </button>
                    <button
                        onClick={currentStep === 4 ? handleSubmit : handleNext}
                        className="bg-[#0f766e] text-white px-5 py-3 md:px-10 md:py-4 rounded-2xl font-bold shadow-xl shadow-teal-100 hover:scale-[1.02] active:scale-95 transition-all flex items-center gap-2"
                    >
                        {currentStep === 4
                            ? <><Send className="h-5 w-5" /> Final Submit</>
                            : <>Next Step <ChevronRight className="h-5 w-5" /></>}
                    </button>
                </div>
            </div>
        </>
    );
}

export default function ApplicationPage() {
    return (
        <Suspense fallback={
            <div className="flex min-h-[60vh] flex-col items-center justify-center gap-4">
                <Loader2 className="h-10 w-10 animate-spin text-primary" />
                <p className="animate-pulse font-inter text-sm font-medium text-slate-500">Loading application...</p>
            </div>
        }>
            <ApplicationContent />
        </Suspense>
    );
}
