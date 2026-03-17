import Link from "next/link";
import { GraduationCap, CheckCircle2, Globe, ArrowRight } from "lucide-react";

const Hero = () => {
  return (
    <section className="relative flex flex-col justify-center py-12 md:py-16 overflow-hidden">
      {/* ── Soft background blobs ── */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -top-24 right-0 w-[500px] h-[500px] rounded-full bg-primary/4 blur-3xl" />
        <div className="absolute bottom-0 left-0 w-72 h-72 rounded-full bg-secondary/8 blur-3xl" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-4 items-center">
        {/* ── LEFT: Copy ── */}
        <div className="space-y-7 order-2 md:order-1">
          {/* Eyebrow pill */}
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5">
              <span className="h-1.5 w-1.5 rounded-full bg-secondary animate-pulse" />
              <span className="text-xs font-semibold tracking-widest uppercase font-inter text-primary">
                Est. 2008
              </span>
            </div>
            <span className="hidden sm:block text-xs text-slate-400 font-inter">
              16 years of excellence
            </span>
          </div>

          {/* Headline */}
          <div className="space-y-4">
            <h1 className="font-poppins text-4xl sm:text-5xl lg:text-[3.5rem] font-semibold leading-[1.08] tracking-tight text-slate-900">
              Your Gateway
              <br />
              <span className="text-primary">to Global</span>
              <br />
              Education.
            </h1>
            <p className="max-w-md text-base sm:text-lg text-slate-500 font-inter leading-relaxed">
              Personalized guidance from university shortlisting to visa success
              — making your study-abroad journey smoother, smarter, and
              stress-free.
            </p>
          </div>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-3">
            <Link
              href="/consultation"
              className="inline-flex items-center justify-center gap-2 rounded-2xl bg-primary px-7 py-3.5 text-sm font-semibold text-white font-inter shadow-lg shadow-primary/20 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-primary/25"
            >
              Book a Free Session
              <ArrowRight size={16} />
            </Link>
            <Link
              href="/universities"
              className="inline-flex items-center justify-center gap-2 rounded-2xl border border-slate-200 bg-white px-7 py-3.5 text-sm font-semibold text-slate-700 font-inter transition-all duration-200 hover:-translate-y-0.5 hover:border-primary/30 hover:text-primary"
            >
              Explore Universities
            </Link>
          </div>

          {/* Social proof row */}
          <div className="flex flex-wrap gap-5 pt-2 border-t border-slate-100">
            {[
              { icon: CheckCircle2, label: "98% Visa Success" },
              { icon: GraduationCap, label: "15,000+ Students" },
              { icon: Globe, label: "50+ Universities" },
            ].map(({ icon: Icon, label }) => (
              <div
                key={label}
                className="flex items-center gap-2 text-xs font-medium text-slate-600 font-inter"
              >
                <Icon size={15} className="text-secondary flex-shrink-0" />
                {label}
              </div>
            ))}
          </div>
        </div>

        {/* ── RIGHT: Illustration image — no frame, no crop ── */}
        <div className="order-1 md:order-2 flex items-center justify-center md:justify-end">
          <img
            src="/home/hero.png"
            alt="Global university partners and consultation services"
            className="w-full max-w-[520px] md:max-w-full h-auto object-contain "
          />
        </div>
      </div>
    </section>
  );
};

export default Hero;
