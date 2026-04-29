import Link from "next/link";
import { notFound } from "next/navigation";
import {
    User,
    GraduationCap,
    FileText,
    Award,
    CheckCircle2,
    ClipboardCheck,
    ChevronLeft,
    Activity,
    Users,
    MessageSquare,
    HelpCircle,
    Shield,
    PenTool,
    type LucideIcon,
    Banknote
} from "lucide-react";
import { cn } from "@/lib/utils";
import { requireRole } from "@/lib/auth";
import { ROLES } from "@/lib/constants";
import { prisma } from "@/lib/prisma";

// --- UI COMPONENTS ---

const DetailSection = ({ icon: Icon, title, children }: { icon: LucideIcon; title: string; children: React.ReactNode }) => (
    <section className="bg-white rounded-[2.5rem] border border-slate-100 p-8 shadow-sm mb-8">
        <div className="flex items-center gap-4 mb-8">
            <div className="p-3 bg-teal-50 rounded-2xl text-[#0f766e]"><Icon className="h-6 w-6" /></div>
            <h2 className="text-xl font-bold text-slate-900">{title}</h2>
        </div>
        {children}
    </section>
);

const Field = ({ label, value }: { label: string; value?: string | number | null }) => (
    <div className="space-y-1">
        <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400">{label}</p>
        <p className="font-semibold text-slate-800 text-base">{value !== null && value !== undefined ? String(value) : "—"}</p>
    </div>
);

const DateField = ({ label, value }: { label: string; value?: Date | null }) => {
    const formatted = value ? new Date(value).toLocaleDateString(undefined, { year: "numeric", month: "long", day: "numeric" }) : "—";
    return (
        <div className="space-y-1">
            <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400">{label}</p>
            <p className="font-semibold text-slate-800 text-base">{formatted}</p>
        </div>
    );
};

const BoolField = ({ label, value }: { label: string; value?: boolean | null }) => (
    <div className="space-y-1">
        <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400">{label}</p>
        <p className={cn("font-semibold text-base", value ? "text-teal-700" : "text-slate-400")}>
            {value ? "Yes" : "No"}
        </p>
    </div>
);

const LongField = ({ label, value }: { label: string; value?: string | null }) => (
    <div className="space-y-2">
        <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400">{label}</p>
        <p className="text-slate-700 text-sm leading-relaxed whitespace-pre-wrap">{value || "—"}</p>
    </div>
);

// --- DATA FETCHING ---

async function getApplication(id: string, userId: string) {
    const application = await prisma.application.findUnique({
        where: { id },
        include: {
            personalInfo: true,
            academicRecord: true,
            testScores: true,
            financialStanding: true,
            extracurriculars: true,
            familyInfo: true,
            supplemental: true,
            conductAgreement: true,
            recommenders: true,
            student: { select: { userId: true } },
        },
    });

    if (!application) return null;

    // IDOR check — student may only view their own application
    if (application.student.userId !== userId) return null;

    return application;
}

// --- PAGE ---

export default async function ApplicationDetailsPage({
    params,
}: {
    params: Promise<{ id: string }>;
}) {
    const [user, { id }] = await Promise.all([
        requireRole([ROLES.STUDENT]),
        params,
    ]);

    const application = await getApplication(id, user.id);
    if (!application) notFound();

    // Safely destructure the modules (falling back to empty objects if missing)
    const personalInfo = application.personalInfo || {};
    const academicRecord = application.academicRecord || {};
    const testScores = application.testScores || {};
    const financials = application.financialStanding || {};
    const extracurriculars = application.extracurriculars || {};
    const familyInfo = application.familyInfo || {};
    const supplemental = application.supplemental || {};
    const conduct = application.conductAgreement || {};
    const recommenders = application.recommenders || [];

    const hasDisclosure = conduct.hasCriminalRecord || conduct.hasAcademicViolation || conduct.hasDisciplinaryAction;

    return (
        <div className="max-w-6xl mx-auto py-8 px-4 sm:px-6 lg:px-8 bg-slate-50 min-h-screen">

            {/* Header */}
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
                        <div className="flex flex-wrap items-center gap-4 mt-3 text-slate-500 font-medium text-sm">
                            <span>ID: {application.id}</span>
                            <span className="h-1 w-1 bg-slate-300 rounded-full" />
                            <span>
                                Submitted: {application.submittedAt
                                    ? new Date(application.submittedAt).toLocaleDateString(undefined, { year: "numeric", month: "long", day: "numeric" })
                                    : "Pending"}
                            </span>
                        </div>
                    </div>
                    <div className="flex items-center gap-3 bg-teal-50 text-[#0f766e] px-6 py-3 rounded-2xl border border-teal-100">
                        <CheckCircle2 className="h-5 w-5" />
                        <span className="font-bold uppercase tracking-wider text-sm">{application.status.replace(/_/g, " ")}</span>
                    </div>
                </div>
            </div>

            {/* ── STEP 1 ── */}
            <DetailSection icon={User} title="Personal Information">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-y-8 gap-x-12">
                    <Field label="Legal Full Name" value={personalInfo.name} />
                    <Field label="Email Address" value={personalInfo.email} />
                    <DateField label="Date of Birth" value={personalInfo.dateOfBirth} />
                    <Field label="Phone Number" value={personalInfo.phone} />
                    <Field label="Nationality" value={personalInfo.nationality} />
                    <Field label="Gender" value={personalInfo.gender} />
                    <div className="md:col-span-2">
                        <Field label="Primary Address" value={personalInfo.address} />
                    </div>
                </div>
            </DetailSection>

            <DetailSection icon={GraduationCap} title="Academic History">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-y-8 gap-x-12">
                    <Field label="Institution Name" value={academicRecord.schoolName} />
                    <Field label="Institution City" value={academicRecord.schoolCity} />
                    <Field label="Institution Country" value={academicRecord.schoolCountry} />
                    <Field label="Highest Degree Obtained" value={academicRecord.degreeObtained} />
                    <DateField label="Graduation Date" value={academicRecord.graduationDate} />
                    <Field label="Field of Study / Major" value={academicRecord.fieldOfStudy} />
                    <Field label="Cumulative GPA" value={academicRecord.gpa} />
                </div>
            </DetailSection>

            <DetailSection icon={FileText} title="Program Selection">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-y-8 gap-x-12">
                    <Field label="Target University" value={application.targetUniversity} />
                    <Field label="Desired Degree Program" value={application.degreeProgram} />
                    <Field label="Intended Start Term" value={application.startTerm} />
                    <Field label="Target Year" value={application.targetYear} />
                </div>
            </DetailSection>

            {/* ── STEP 2 ── */}
            <DetailSection icon={ClipboardCheck} title="Test Requirements by Program">
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
                    {[
                        { label: "SAT", key: "requiresSAT" },
                        { label: "ACT", key: "requiresACT" },
                        { label: "TOEFL", key: "requiresTOEFL" },
                        { label: "IELTS", key: "requiresIELTS" },
                        { label: "GRE", key: "requiresGRE" },
                        { label: "GMAT", key: "requiresGMAT" },
                    ].map((test) => {
                        const isRequired = testScores[test.key as keyof typeof testScores] === true;
                        return (
                            <div key={test.label} className={cn(
                                "flex flex-col items-center gap-2 p-4 rounded-2xl border text-sm font-bold",
                                isRequired
                                    ? "bg-teal-50 border-teal-200 text-teal-700"
                                    : "bg-slate-50 border-slate-100 text-slate-400"
                            )}>
                                <CheckCircle2 className={cn("h-5 w-5", isRequired ? "text-teal-500" : "text-slate-300")} />
                                {test.label}
                            </div>
                        );
                    })}
                </div>
            </DetailSection>

            <DetailSection icon={Award} title="Test Scores">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-y-8 gap-x-12">
                    <Field label="SAT Math" value={testScores.satMath} />
                    <Field label="SAT Reading" value={testScores.satReading} />
                    <Field label="ACT Composite" value={testScores.actComposite} />
                    <Field label="TOEFL" value={testScores.toeflScore} />
                    <Field label="IELTS" value={testScores.ieltsScore} />
                    <Field label="GRE Verbal" value={testScores.greVerbal} />
                    <Field label="GRE Quantitative" value={testScores.greQuantitative} />
                    <DateField label="Most Recent Test Date" value={testScores.testDate} />
                </div>
            </DetailSection>

            <DetailSection icon={PenTool} title="Personal Statement / Statement of Purpose">
                <LongField label="Statement of Purpose" value={supplemental.personalStatement} />
            </DetailSection>

            <DetailSection icon={Banknote} title="Asset Valuation & Financial Standing">
                <div className="space-y-8">
                    {/* Sponsor Info */}
                    <div>
                        <h3 className="text-sm font-bold text-slate-700 mb-4 border-b pb-2">Primary Financial Sponsor</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-y-6 gap-x-12">
                            <Field label="Sponsor's Full Name" value={financials.sponsorFullName} />
                            <Field label="Relationship to Applicant" value={financials.sponsorRelationship} />
                            <Field label="Sponsor's Occupation" value={financials.sponsorOccupation} />
                            <Field label="Sponsor's Annual Income (USD)" value={financials.sponsorAnnualIncome} />
                        </div>
                    </div>

                    {/* Assets */}
                    <div>
                        <h3 className="text-sm font-bold text-slate-700 mb-4 border-b pb-2">Declared Assets & Liabilities</h3>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-y-6 gap-x-8">
                            <Field label="Primary Currency" value={financials.primaryCurrency} />
                            <Field label="Bank Balance (USD)" value={financials.bankBalance} />
                            <Field label="Fixed Deposits (USD)" value={financials.fixedDepositAmount} />
                            <Field label="Investment Assets (USD)" value={financials.investmentAssets} />
                            <Field label="Real Estate Value (USD)" value={financials.realEstateValue} />
                            <Field label="Business Assets (USD)" value={financials.businessAssets} />
                            <Field label="Other Assets (USD)" value={financials.otherAssets} />
                            <Field label="Total Liabilities (USD)" value={financials.totalLiabilities} />
                        </div>
                    </div>

                    {/* Budget & Aid */}
                    <div>
                        <h3 className="text-sm font-bold text-slate-700 mb-4 border-b pb-2">Education Budget & Financial Aid</h3>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-y-6 gap-x-8 mb-6">
                            <Field label="Funds Available for Study (USD)" value={financials.fundsAvailableForStudy} />
                            <Field label="Primary Funding Source" value={financials.fundingSource} />
                            <Field label="Annual Tuition Budget (USD)" value={financials.annualTuitionBudget} />
                            <Field label="Annual Living Budget (USD)" value={financials.annualLivingBudget} />
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-y-6 gap-x-8">
                            <BoolField label="Applying for Scholarship" value={financials.applyingForScholarship} />
                            {financials.applyingForScholarship && <Field label="Scholarship Type" value={financials.scholarshipType} />}
                            <BoolField label="Financial Aid Required" value={financials.financialAidRequired} />
                        </div>
                    </div>

                    {/* Checklists */}
                    <div>
                        <h3 className="text-sm font-bold text-slate-700 mb-4 border-b pb-2">Financial Documents Status</h3>
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                            <BoolField label="Bank Statement" value={financials.hasBankStatement} />
                            <BoolField label="Solvency Letter" value={financials.hasSolvencyLetter} />
                            <BoolField label="Income Tax Return" value={financials.hasIncomeTaxReturn} />
                            <BoolField label="Property Documents" value={financials.hasPropertyDocuments} />
                            <BoolField label="Sponsor Letter" value={financials.hasSponsorLetter} />
                            <BoolField label="Loan Approval Letter" value={financials.hasLoanApprovalLetter} />
                        </div>
                    </div>

                    {financials.financialNotes && (
                        <LongField label="Additional Financial Notes" value={financials.financialNotes} />
                    )}
                </div>
            </DetailSection>

            <DetailSection icon={Activity} title="Extracurricular Activities">
                <div className="space-y-8">
                    <LongField label="Extracurricular Activities" value={extracurriculars.activities} />
                    <LongField label="Leadership Roles & Positions" value={extracurriculars.leadershipRoles} />
                    <LongField label="Awards & Honors" value={extracurriculars.awardsHonors} />
                    <LongField label="Community Service & Volunteering" value={extracurriculars.communityService} />
                </div>
            </DetailSection>

            {/* ── STEP 3 ── */}
            <DetailSection icon={Users} title="Family Information">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-y-8 gap-x-12">
                    <Field label="Father's Full Name" value={familyInfo.fatherName} />
                    <Field label="Father's Occupation" value={familyInfo.fatherOccupation} />
                    <Field label="Father's Education Level" value={familyInfo.fatherEducation} />
                    <Field label="Mother's Full Name" value={familyInfo.motherName} />
                    <Field label="Mother's Occupation" value={familyInfo.motherOccupation} />
                    <Field label="Mother's Education Level" value={familyInfo.motherEducation} />
                    <Field label="Primary Guardian Name" value={familyInfo.guardianName} />
                    <Field label="Guardian Phone" value={familyInfo.guardianPhone} />
                    <Field label="Guardian's Relationship" value={familyInfo.guardianRelationship} />
                </div>
            </DetailSection>

            <DetailSection icon={MessageSquare} title="Recommendations / Letters of Recommendation">
                <div className="space-y-2 mb-8">
                    <Field label="Number of Recommendations Required" value={recommenders.length} />
                    {supplemental.requirementNotes && <LongField label="Program-Specific Requirements" value={supplemental.requirementNotes} />}
                </div>
                <div className="space-y-8">
                    {recommenders.map((rec, index) => (
                        <div key={rec.id} className="p-6 bg-slate-50 rounded-2xl relative">
                            <div className="absolute top-4 right-6 text-[10px] font-bold uppercase tracking-wider text-teal-600 bg-teal-50 px-2 py-1 rounded-full border border-teal-100">
                                {rec.requestStatus}
                            </div>
                            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">Recommender {index + 1}</p>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-y-6 gap-x-10">
                                <Field label="Full Name" value={rec.name} />
                                <Field label="Title / Position" value={rec.title} />
                                <Field label="Email Address" value={rec.email} />
                                <Field label="Institution / Organization" value={rec.institution} />
                            </div>
                        </div>
                    ))}
                    {recommenders.length === 0 && <p className="text-slate-400 text-sm">No recommenders provided.</p>}
                </div>
            </DetailSection>

            {/* ── STEP 4 ── */}
            <DetailSection icon={HelpCircle} title="Additional / Supplemental Questions">
                <div className="space-y-8">
                    <LongField label="Why this university?" value={supplemental.whyThisUniversity} />
                    <LongField label="Why this program?" value={supplemental.whyThisProgram} />
                    <Field label="How did you hear about us?" value={supplemental.hearAboutUs} />
                    {supplemental.additionalInfo && <LongField label="Additional Information" value={supplemental.additionalInfo} />}
                </div>
            </DetailSection>

            <DetailSection icon={Shield} title="Community Standards / Conduct Disclosure">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-y-8 gap-x-12 mb-6">
                    <BoolField label="Felony / Criminal Offense" value={conduct.hasCriminalRecord} />
                    <BoolField label="Academic Dishonesty" value={conduct.hasAcademicViolation} />
                    <BoolField label="Disciplinary Action" value={conduct.hasDisciplinaryAction} />
                </div>
                {hasDisclosure && conduct.conductExplanation && (
                    <LongField label="Explanation" value={conduct.conductExplanation} />
                )}
                <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
                    <BoolField label="Agreed to Terms" value={conduct.agreeToTerms} />
                    <BoolField label="Certified Accuracy" value={conduct.agreeToAccuracy} />
                    <BoolField label="Agreed to Conduct" value={conduct.agreeToConduct} />
                </div>
            </DetailSection>

            {/* Signature */}
            <div className="bg-white rounded-[2.5rem] p-8 border border-slate-100 shadow-sm">
                <div className="flex items-center gap-4 mb-8">
                    <div className="p-3 bg-teal-50 rounded-2xl text-[#0f766e]"><PenTool className="h-6 w-6" /></div>
                    <h2 className="text-xl font-bold text-slate-900">Signature & Verification</h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div>
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">Digital Signature</p>
                        <p className="font-serif text-2xl text-slate-900 border-b border-slate-200 pb-2 italic">
                            {conduct.signature || "—"}
                        </p>
                    </div>
                    <div className="flex items-center gap-3 text-teal-700 font-bold">
                        <CheckCircle2 className="h-5 w-5" />
                        <span>Verified &amp; Submitted</span>
                    </div>
                </div>
            </div>

        </div>
    );
}
