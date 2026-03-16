import {
  BookOpen,
  BookText,
  CheckCircle2,
  FileCheck,
  FileText,
  Plane,
  ShieldCheck,
  Users,
} from "lucide-react";

const preVisa = [
  { icon: BookText, title: "DS-160 Form Walkthrough" },
  { icon: FileText, title: "I-20 and SEVIS Guidance" },
  { icon: ShieldCheck, title: "Mock Embassy Interview" },
  { icon: CheckCircle2, title: "Financial Document Review" },
];

const postVisa = [
  { icon: Plane, title: "Pre-Departure Orientation" },
  { icon: FileCheck, title: "Housing & Accommodation Help" },
  { icon: BookOpen, title: "Banking and SIM Card Setup" },
  { icon: Users, title: "Airport Arrival Coordination" },
];

export default function VisaPrep() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-6xl mx-auto px-10 md:px-14">
        <div className="text-center mb-14">
          <h5 className="text-secondary font-bold tracking-widest uppercase text-sm mb-3">
            Visa & Pre-Departure
          </h5>
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-5">
            Embassy prep to arrival — we stay with you
          </h2>
          <p className="text-gray-500 max-w-2xl mx-auto text-lg">
            A US student visa is not hard if you prepare correctly. We walk
            through every document, mock the interview, and make sure you land
            with zero surprises.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Pre-Visa card */}
          <div className="relative overflow-hidden bg-white border border-gray-100 rounded-[32px] p-8 md:p-12 shadow-sm bg-[radial-gradient(circle_at_top_right,_#f0f9ff_0%,_transparent_50%)]">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-semibold mb-8">
              <ShieldCheck size={14} />
              Pre-Visa Support
            </div>
            <h3 className="text-2xl font-bold text-slate-900 mb-8 text-left">
              Before Your Visa Appointment
            </h3>
            <div className="space-y-4">
              {preVisa.map((item) => {
                const Icon = item.icon;
                return (
                  <div
                    key={item.title}
                    className="flex items-center gap-4 p-4 bg-white/60 backdrop-blur-sm border border-gray-50 rounded-2xl shadow-sm"
                  >
                    <div className="p-2 rounded-lg bg-primary/10 text-primary shrink-0">
                      <Icon size={18} />
                    </div>
                    <span className="font-medium text-slate-700">
                      {item.title}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Post-Visa card */}
          <div className="relative overflow-hidden bg-white border border-gray-100 rounded-[32px] p-8 md:p-12 shadow-sm bg-[radial-gradient(circle_at_bottom_left,_#f0f9ff_0%,_transparent_50%)]">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-semibold mb-8">
              <Plane size={14} />
              Pre-Departure
            </div>
            <h3 className="text-2xl font-bold text-slate-900 mb-8 text-left">
              After Your Visa is Approved
            </h3>
            <div className="space-y-4">
              {postVisa.map((item) => {
                const Icon = item.icon;
                return (
                  <div
                    key={item.title}
                    className="flex items-center gap-4 p-4 bg-white/60 backdrop-blur-sm border border-gray-50 rounded-2xl shadow-sm"
                  >
                    <div className="p-2 rounded-lg bg-primary/10 text-primary shrink-0">
                      <Icon size={18} />
                    </div>
                    <span className="font-medium text-slate-700">
                      {item.title}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
