import { Wifi, MapPin } from "lucide-react";

export default function EventsHero() {
  return (
    <section className="relative pt-10 md:pt-16 pb-0 overflow-hidden">
      {/* Faint ruled lines — editorial feel */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage:
            "repeating-linear-gradient(0deg, transparent, transparent 79px, #e5e7eb 79px, #e5e7eb 80px)",
          opacity: 0.3,
        }}
      />

      {/* Ghost background word — hidden on mobile */}
      <span
        aria-hidden
        className="pointer-events-none select-none hidden sm:block absolute -top-4 left-1/2 -translate-x-1/2 text-[clamp(60px,18vw,220px)] font-bold text-slate-900/[0.03] leading-none whitespace-nowrap"
      >
        EVENTS
      </span>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-8 md:px-14">
        {/* Section label — matches site pattern exactly */}
        <div className="flex items-center gap-3 mb-6 md:mb-8">
          <span className="h-px w-6 md:w-8 bg-secondary" />
          <p className="text-secondary font-bold tracking-widest uppercase text-sm">
            Events & Webinars
          </p>
        </div>

        {/* Two-column: headline left, info pills right */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-8 lg:gap-12 items-end pb-10 md:pb-14 border-b border-gray-200">
          {/* Left — headline */}
          <div>
            <h1 className="text-4xl md:text-7xl font-semibold font-inter text-slate-900 leading-tight">
              Events,{" "}
              <span className="relative inline-block">
                <span className="relative z-10 text-primary">Webinars</span>
                {/* Amber hand-drawn underline */}
                <svg
                  aria-hidden
                  className="absolute -bottom-1 left-0 w-full"
                  viewBox="0 0 300 10"
                  preserveAspectRatio="none"
                  height="7"
                >
                  <path
                    d="M0 8 Q75 0 150 6 Q225 12 300 4"
                    stroke="#ffab17"
                    strokeWidth="3"
                    fill="none"
                    strokeLinecap="round"
                  />
                </svg>
              </span>{" "}
              & Visa Briefings
            </h1>

            <p className="mt-4 md:mt-6 text-gray-500 text-lg max-w-xl leading-relaxed">
              Free knowledge sessions for students, parents, and applicants —
              every topic you need before you apply.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
