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
} from "lucide-react";
import { cn } from "@/lib/utils";
import { requireRole } from "@/lib/auth";
import { ROLES } from "@/lib/constants";
import { prisma } from "@/lib/prisma";

// --- TYPES ---

type SectionData = Record<string, string | undefined>;

// --- HELPERS ---

const DetailSection = ({ icon: Icon, title, children }: { icon: LucideIcon; title: string; children: React.ReactNode }) => (
    <section className="bg-white rounded-[2.5rem] border border-slate-100 p-8 shadow-sm mb-8">
        <div className="flex items-center gap-4 mb-8">
            <div className="p-3 bg-teal-50 rounded-2xl text-[#0f766e]"><Icon className="h-6 w-6" /></div>
            <h2 className="text-xl font-bold text-slate-900">{title}</h2>
        </div>
        {children}
    </section>
);

const Field = ({ label, value }: { label: string; value?: string | null }) => (
    <div className="space-y-1">
        <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400">{label}</p>
        <p className="font-semibold text-slate-800 text-base">{value || "—"}</p>
    </div>
);

const BoolField = ({ label, value }: { label: string; value?: string }) => (
    <div className="space-y-1">
        <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400">{label}</p>
        <p className={cn("font-semibold text-base", value === "true" ? "text-teal-700" : "text-slate-400")}>
            {value === "true" ? "Yes" : "No"}
        </p>
    </div>
);

const LongField = ({ label, value }: { label: string; value?: string }) => (
    <div className="space-y-2">
        <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400">{label}</p>
        <p className="text-slate-700 text-sm leading-relaxed whitespace-pre-wrap">{value || "—"}</p>
    </div>
);

function getSectionData(sections: { sectionNumber: string; data: SectionData }[], sectionNumber: string): SectionData {
    return sections.find(s => s.sectionNumber === sectionNumber)?.data ?? {};
}

// --- DATA FETCHING ---

async function getApplication(id: string, userId: string) {
    const application = await prisma.application.findUnique({
        where: { id },
        include: {
            sections: { select: { sectionNumber: true, data: true, isComplete: true } },
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

    const sections = application.sections as { sectionNumber: string; data: SectionData; isComplete: boolean }[];
    const s1 = getSectionData(sections, "SECTION_1");
    const s2 = getSectionData(sections, "SECTION_2");
    const s3 = getSectionData(sections, "SECTION_3");
    const s4 = getSectionData(sections, "SECTION_4");

    const recsRequired = parseInt(s3.recommendationsRequired ?? "0");
    const hasDisclosure =
        s4.hasCriminalRecord === "true" ||
        s4.hasAcademicViolation === "true" ||
        s4.hasDisciplinaryAction === "true";

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
                    <Field label="Legal Full Name" value={s1.name} />
                    <Field label="Email Address" value={s1.email} />
                    <Field label="Date of Birth" value={s1.dateOfBirth} />
                    <Field label="Phone Number" value={s1.phone} />
                    <Field label="Nationality" value={s1.nationality} />
                    <Field label="Gender" value={s1.gender} />
                    <div className="md:col-span-2">
                        <Field label="Primary Address" value={s1.address} />
                    </div>
                </div>
            </DetailSection>

            <DetailSection icon={GraduationCap} title="Academic History">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-y-8 gap-x-12">
                    <Field label="Institution Name" value={s1.schoolName} />
                    <Field label="Institution City" value={s1.schoolCity} />
                    <Field label="Institution Country" value={s1.schoolCountry} />
                    <Field label="Highest Degree Obtained" value={s1.degreeObtained} />
                    <Field label="Graduation Date" value={s1.graduationDate} />
                    <Field label="Field of Study / Major" value={s1.fieldOfStudy} />
                    <Field label="Cumulative GPA" value={s1.gpa} />
                </div>
            </DetailSection>

            <DetailSection icon={FileText} title="Program Selection">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-y-8 gap-x-12">
                    <Field label="Target University" value={s1.targetUniversity} />
                    <Field label="Desired Degree Program" value={s1.degreeProgram} />
                    <Field label="Intended Start Term" value={s1.startTerm} />
                    <Field label="Target Year" value={s1.targetYear} />
                </div>
            </DetailSection>

            {/* ── STEP 2 ── */}
            <DetailSection icon={ClipboardCheck} title="Test Requirements by Program">
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
                    {(["SAT", "ACT", "TOEFL", "IELTS", "GRE", "GMAT"] as const).map((test) => {
                        const key = `requires${test}`;
                        return (
                            <div key={test} className={cn(
                                "flex flex-col items-center gap-2 p-4 rounded-2xl border text-sm font-bold",
                                s2[key] === "true"
                                    ? "bg-teal-50 border-teal-200 text-teal-700"
                                    : "bg-slate-50 border-slate-100 text-slate-400"
                            )}>
                                <CheckCircle2 className={cn("h-5 w-5", s2[key] === "true" ? "text-teal-500" : "text-slate-300")} />
                                {test}
                            </div>
                        );
                    })}
                </div>
            </DetailSection>

            <DetailSection icon={Award} title="Test Scores">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-y-8 gap-x-12">
                    <Field label="SAT Math" value={s2.satMath} />
                    <Field label="SAT Reading" value={s2.satReading} />
                    <Field label="ACT Composite" value={s2.actComposite} />
                    <Field label="TOEFL" value={s2.toeflScore} />
                    <Field label="IELTS" value={s2.ieltsScore} />
                    <Field label="GRE Verbal" value={s2.greVerbal} />
                    <Field label="GRE Quantitative" value={s2.greQuantitative} />
                    <Field label="Most Recent Test Date" value={s2.testDate} />
                </div>
            </DetailSection>

            <DetailSection icon={PenTool} title="Personal Statement / Statement of Purpose">
                <LongField label="Statement of Purpose" value={s2.personalStatement} />
            </DetailSection>

            <DetailSection icon={Activity} title="Extracurricular Activities">
                <div className="space-y-8">
                    <LongField label="Extracurricular Activities" value={s2.activities} />
                    <LongField label="Leadership Roles & Positions" value={s2.leadershipRoles} />
                    <LongField label="Awards & Honors" value={s2.awardsHonors} />
                    <LongField label="Community Service & Volunteering" value={s2.communityService} />
                </div>
            </DetailSection>

            {/* ── STEP 3 ── */}
            <DetailSection icon={Users} title="Family Information">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-y-8 gap-x-12">
                    <Field label="Father's Full Name" value={s3.fatherName} />
                    <Field label="Father's Occupation" value={s3.fatherOccupation} />
                    <Field label="Father's Education Level" value={s3.fatherEducation} />
                    <Field label="Mother's Full Name" value={s3.motherName} />
                    <Field label="Mother's Occupation" value={s3.motherOccupation} />
                    <Field label="Mother's Education Level" value={s3.motherEducation} />
                    <Field label="Primary Guardian Name" value={s3.guardianName} />
                    <Field label="Guardian Phone" value={s3.guardianPhone} />
                    <Field label="Guardian's Relationship" value={s3.guardianRelationship} />
                </div>
            </DetailSection>

            <DetailSection icon={MessageSquare} title="Recommendations / Letters of Recommendation">
                <div className="space-y-2 mb-8">
                    <Field label="Number of Recommendations Required" value={s3.recommendationsRequired} />
                    {s3.requirementNotes && <LongField label="Program-Specific Requirements" value={s3.requirementNotes} />}
                </div>
                <div className="space-y-8">
                    {s3.rec1Name && (
                        <div className="p-6 bg-slate-50 rounded-2xl">
                            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">Recommender 1</p>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-y-6 gap-x-10">
                                <Field label="Full Name" value={s3.rec1Name} />
                                <Field label="Title / Position" value={s3.rec1Title} />
                                <Field label="Email Address" value={s3.rec1Email} />
                                <Field label="Institution / Organization" value={s3.rec1Institution} />
                            </div>
                        </div>
                    )}
                    {recsRequired >= 2 && s3.rec2Name && (
                        <div className="p-6 bg-slate-50 rounded-2xl">
                            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">Recommender 2</p>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-y-6 gap-x-10">
                                <Field label="Full Name" value={s3.rec2Name} />
                                <Field label="Title / Position" value={s3.rec2Title} />
                                <Field label="Email Address" value={s3.rec2Email} />
                                <Field label="Institution / Organization" value={s3.rec2Institution} />
                            </div>
                        </div>
                    )}
                    {recsRequired >= 3 && s3.rec3Name && (
                        <div className="p-6 bg-slate-50 rounded-2xl">
                            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">Recommender 3</p>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-y-6 gap-x-10">
                                <Field label="Full Name" value={s3.rec3Name} />
                                <Field label="Title / Position" value={s3.rec3Title} />
                                <Field label="Email Address" value={s3.rec3Email} />
                                <Field label="Institution / Organization" value={s3.rec3Institution} />
                            </div>
                        </div>
                    )}
                    {!s3.rec1Name && <p className="text-slate-400 text-sm">No recommenders provided.</p>}
                </div>
            </DetailSection>

            <DetailSection icon={Award} title="Scholarships / Financial Aid">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-y-8 gap-x-12">
                    <BoolField label="Applying for Scholarship" value={s3.applyingForScholarship} />
                    {s3.applyingForScholarship === "true" && (
                        <>
                            <Field label="Scholarship Type" value={s3.scholarshipType} />
                            <Field label="Sponsor / Funding Source" value={s3.sponsorName} />
                        </>
                    )}
                    <BoolField label="Financial Aid Required" value={s3.financialAidRequired} />
                </div>
            </DetailSection>

            {/* ── STEP 4 ── */}
            <DetailSection icon={HelpCircle} title="Additional / Supplemental Questions">
                <div className="space-y-8">
                    <LongField label="Why this university?" value={s4.whyThisUniversity} />
                    <LongField label="Why this program?" value={s4.whyThisProgram} />
                    <Field label="How did you hear about us?" value={s4.hearAboutUs} />
                    {s4.additionalInfo && <LongField label="Additional Information" value={s4.additionalInfo} />}
                </div>
            </DetailSection>

            <DetailSection icon={Shield} title="Community Standards / Conduct Disclosure">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-y-8 gap-x-12 mb-6">
                    <BoolField label="Felony / Criminal Offense" value={s4.hasCriminalRecord} />
                    <BoolField label="Academic Dishonesty" value={s4.hasAcademicViolation} />
                    <BoolField label="Disciplinary Action" value={s4.hasDisciplinaryAction} />
                </div>
                {hasDisclosure && s4.conductExplanation && (
                    <LongField label="Explanation" value={s4.conductExplanation} />
                )}
                <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
                    <BoolField label="Agreed to Terms" value={s4.agreeToTerms} />
                    <BoolField label="Certified Accuracy" value={s4.agreeToAccuracy} />
                    <BoolField label="Agreed to Conduct" value={s4.agreeToConduct} />
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
                            {s4.signature || "—"}
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
