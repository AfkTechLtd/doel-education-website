import { cn } from "@/lib/utils";
import { CheckCircle2 } from "lucide-react";
const STEPS = [
    { id: 1, title: "Foundations", sections: ["Personal Info", "Academic History", "Program Selection"] },
    { id: 2, title: "Requirements", sections: ["Test Requirements", "Scores", "Statement", "Activities"] },
    { id: 3, title: "Support", sections: ["Family", "Recommendations", "Scholarships"] },
    { id: 4, title: "Finalization", sections: ["Supplemental", "Conduct", "Review & Sign"] },
];
type ApplicationStatus = "IN_PROGRESS" | "SUBMITTED";

const StepIndicator = ({ currentStep, status }: { currentStep: number; status: ApplicationStatus }) => {
    if (status === "SUBMITTED") return null;

    return (
        <div className="mb-12">
            {/* The Indicator Bar */}
            <div className="flex items-center justify-between overflow-x-hidden pt-2">
                {STEPS.map((step, idx) => {
                    const isActive = currentStep === step.id;
                    const isCompleted = currentStep > step.id;

                    return (
                        <div key={step.id} className={cn(
                            "flex items-center",
                            idx < STEPS.length - 1 ? "flex-1" : "flex-none"
                        )}>
                            {/* Circle & Title Group */}
                            <div className="flex flex-col items-center gap-3">
                                <div className={cn(
                                    "flex h-10 w-10 md:h-12 md:w-12 items-center justify-center rounded-full border-2 transition-all duration-300 shrink-0",
                                    isActive ? "border-[#0f766e] bg-[#0f766e] text-white shadow-lg shadow-teal-100" :
                                        isCompleted ? "border-[#0f766e] bg-[#0f766e] text-white" :
                                            "border-slate-200 bg-white text-slate-400"
                                )}>
                                    {isCompleted ? <CheckCircle2 className="h-5 w-5 md:h-6 md:w-6" /> : <span className="text-xs md:text-sm font-bold">{step.id}</span>}
                                </div>

                                {/* Hide title on tiny screens, show on md+ */}
                                <span className={cn(
                                    "text-[9px] md:text-[10px] font-bold uppercase tracking-widest hidden sm:block whitespace-nowrap",
                                    isActive ? "text-[#0f766e]" : "text-slate-400"
                                )}>
                                    {step.title}
                                </span>
                            </div>

                            {/* The Line */}
                            {idx < STEPS.length - 1 && (
                                <div className="mx-2 md:mx-6 h-[2px] flex-1 bg-slate-100 self-start mt-5 md:mt-6">
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

            {/* Mobile-only Active Step Label */}
            <div className="mt-4 text-center sm:hidden">
                <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#0f766e] bg-teal-50 px-3 py-1 rounded-full border border-teal-100">
                    Step {currentStep}: {STEPS[currentStep - 1].title}
                </span>
            </div>
        </div>
    );
};
export default StepIndicator;
