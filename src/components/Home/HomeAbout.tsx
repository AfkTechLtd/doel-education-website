import type { ComponentType } from "react";
import { Users, Globe, ShieldCheck, Award } from "lucide-react";

interface CardProps {
  content: string;
  heading: string;
  icon: ComponentType<{ size?: number; className?: string }>;
}

const Card = ({ content, heading, icon: IconComponent }: CardProps) => {
  return (
    <div className="group flex items-start gap-4 rounded-2xl border border-slate-100 bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-primary/20 hover:shadow-md">
      <div className="flex-shrink-0 rounded-xl bg-primary/8 p-2.5 transition-colors duration-300 group-hover:bg-primary/15">
        <IconComponent size={20} className="text-primary" />
      </div>
      <div>
        <h5 className="text-sm font-semibold text-slate-800 font-poppins">
          {heading}
        </h5>
        <p className="mt-1 text-xs leading-relaxed text-slate-500 font-inter">
          {content}
        </p>
      </div>
    </div>
  );
};

const CARDS = [
  {
    heading: "Personalized Guidance",
    icon: Users,
    content:
      "One-on-one counseling tailored to your academic and career goals.",
  },
  {
    heading: "Global Network",
    icon: Globe,
    content:
      "Partnerships with leading universities and institutions worldwide.",
  },
  {
    heading: "Proven Success",
    icon: Award,
    content:
      "98% visa approval rate and thousands of successful student journeys.",
  },
  {
    heading: "Ethical Approach",
    icon: ShieldCheck,
    content: "Transparent process with clear guidance and no hidden fees.",
  },
];

const HomeAbout = () => {
  return (
    <section className="py-20 md:py-24">
      <div className="grid items-center gap-14 md:grid-cols-[1fr_1.3fr]">
        {/* ── LEFT: Visual panel ── */}
        <div className="relative mx-auto w-full max-w-sm md:max-w-full">
          {/* Offset decorative block */}
          <div className="absolute -bottom-3 -right-3 w-full h-full rounded-3xl bg-secondary/15 -z-10" />

          {/* Main image */}
          <div className="overflow-hidden rounded-3xl shadow-xl border border-white/60">
            <img
              src="/home/Gemini_2.jpg"
              alt="Doel Education team"
              className="w-full h-[380px] sm:h-[440px] md:h-[520px] object-cover"
            />
          </div>

          {/* Floating chip — bottom left */}
          <div className="absolute -bottom-5 left-5 flex items-center gap-3 rounded-2xl bg-white px-4 py-3 shadow-xl border border-slate-100">
            <span className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-xl bg-primary/10">
              <Users size={16} className="text-primary" />
            </span>
            <div className="font-inter">
              <p className="text-[11px] text-slate-400 leading-none">
                Trusted by
              </p>
              <p className="text-xs font-semibold text-slate-800 mt-0.5">
                10,000+ Students
              </p>
            </div>
          </div>

          {/* Floating chip — top right */}
          <div className="absolute -top-5 right-5 flex items-center gap-3 rounded-2xl bg-primary px-4 py-3 shadow-xl">
            <span className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-xl bg-white/15">
              <Globe size={16} className="text-white" />
            </span>
            <div className="font-inter">
              <p className="text-[11px] text-white/60 leading-none">
                Experience
              </p>
              <p className="text-xs font-semibold text-white mt-0.5">
                15+ Years
              </p>
            </div>
          </div>
        </div>

        {/* ── RIGHT: Content ── */}
        <div className="space-y-8">
          {/* Eyebrow */}
          <div className="flex items-center gap-3">
            <span className="h-px w-8 bg-secondary block" />
            <span className="text-xs font-semibold uppercase tracking-[0.25em] text-primary font-inter">
              About Doel
            </span>
          </div>

          {/* Heading + body */}
          <div className="space-y-4">
            <h2 className="font-poppins text-3xl sm:text-4xl font-semibold leading-[1.15] tracking-tight text-slate-900">
              Who We Are
            </h2>
            <p className="max-w-lg text-sm sm:text-base leading-relaxed text-slate-500 font-inter">
              Doel Education Consultancy is dedicated to transforming
              international education dreams into reality. With years of
              experience, we provide student-focused, ethical guidance that
              prioritizes your aspirations and academic goals.
            </p>
          </div>

          {/* Stat row */}
          <div className="grid grid-cols-3 gap-4 py-5 border rounded-md border-slate-100">
            {[
              { value: "15+", label: "Years active" },
              { value: "10K+", label: "Students placed" },
              { value: "98%", label: "Visa success" },
            ].map(({ value, label }) => (
              <div key={label} className="text-center">
                <p className="text-2xl font-bold text-primary font-poppins">
                  {value}
                </p>
                <p className="text-xs text-slate-400 font-inter mt-0.5">
                  {label}
                </p>
              </div>
            ))}
          </div>

          {/* Feature cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {CARDS.map((card) => (
              <Card key={card.heading} {...card} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HomeAbout;
