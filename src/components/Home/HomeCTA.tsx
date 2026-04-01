"use client";

import Link from "next/link";
import InquiryTriggerButton from "@/components/common/InquiryTriggerButton";

const HomeCTA = () => {
  return (
    <section className="py-16 sm:py-20 lg:py-24">
    <div className="relative overflow-hidden rounded-3xl bg-primary">
      {/* Subtle dot grid texture */}
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage:
            "radial-gradient(circle, #ffffff 1px, transparent 1px)",
          backgroundSize: "28px 28px",
        }}
      />

      {/* Warm secondary glow  bottom right */}
      <div className="absolute bottom-0 right-0 w-96 h-96 rounded-full blur-3xl opacity-20 pointer-events-none bg-secondary" />

      {/* Top accent line */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-secondary opacity-70" />

      <div className="relative px-8 py-16 sm:px-14 sm:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left  main copy */}
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <span className="h-px w-8 block bg-secondary" />
              <p className="text-xs font-semibold uppercase tracking-[0.25em] font-inter text-secondary">
                Start your journey
              </p>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold leading-[1.1] tracking-tight text-white font-poppins">
              Your global
              <br />
              education
              <br />
              <span className="text-secondary">starts here.</span>
            </h2>

            <p className="text-white/70 text-base leading-relaxed font-inter max-w-sm">
              Book a 1-on-1 session with our expert counselors and get a
              tailored roadmap from shortlisting universities to visa
              preparation.
            </p>

            {/* Trust signals */}
            <ul className="space-y-2.5 pt-2">
              {[
                "Personalized university shortlist",
                "SOP and application review",
                "End-to-end visa support",
              ].map((item) => (
                <li
                  key={item}
                  className="flex items-center gap-3 text-sm font-inter text-white/80"
                >
                  <span className="shrink-0 w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold bg-secondary text-primary">
                    ✓
                  </span>
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* Right  CTA card */}
          <div className="md:block hidden">
            <div className="rounded-2xl p-8 sm:p-10 space-y-7 bg-white/7 border border-white/12">
              {/* Free session badge */}
              <div className="space-y-1">
                <div className="inline-block rounded-full px-3 py-1 text-xs font-semibold font-inter tracking-wide bg-secondary text-primary">
                  Free session
                </div>
                <h3 className="text-2xl font-semibold text-white font-poppins leading-snug pt-2">
                  Book a free
                  <br />
                  30-minute consultation
                </h3>
                <p className="text-white/60 text-sm font-inter leading-relaxed pt-1">
                  Speak with a counselor who has helped hundreds of students
                  just like you.
                </p>
              </div>

              {/* Limited slots indicator */}
              <div className="flex items-center gap-3">
                <div className="flex -space-x-2">
                  {["S", "T", "R"].map((letter, i) => (
                    <div
                      key={i}
                      className="w-7 h-7 rounded-full border-2 border-white/20 flex items-center justify-center text-xs font-bold font-poppins text-white bg-primary"
                    >
                      {letter}
                    </div>
                  ))}
                </div>
                <p className="text-xs text-white/50 font-inter">
                  Limited slots available each week
                </p>
              </div>

              {/* CTA buttons */}
              <div className="space-y-3">
                <InquiryTriggerButton
                  className="w-full flex items-center justify-center gap-2 rounded-xl py-3.5 text-sm font-semibold font-inter transition-all duration-200 hover:opacity-90 hover:-translate-y-px bg-secondary text-primary"
                >
                  Book Free Consultation
                  <span className="text-base">→</span>
                </InquiryTriggerButton>

                <Link
                  href="/services"
                  className="w-full flex items-center justify-center rounded-xl py-3.5 text-sm font-semibold font-inter text-white/70 hover:text-white transition-colors duration-200 border border-white/15"
                >
                  Explore our services
                </Link>
              </div>

              <p className="text-center text-xs text-white/40 font-inter">
                No commitment required. Just honest guidance.
              </p>
            </div>
          </div>
          <div className="md:hidden block space-y-3">
            <InquiryTriggerButton
              className="w-full flex items-center justify-center gap-2 rounded-xl py-3.5 text-sm font-semibold font-inter transition-all duration-200 hover:opacity-90 hover:-translate-y-px bg-secondary text-primary"
            >
              Book Free Consultation
              <span className="text-base">→</span>
            </InquiryTriggerButton>

            <Link
              href="/services"
              className="w-full flex items-center justify-center rounded-xl py-3.5 text-sm font-semibold font-inter text-white/70 hover:text-white transition-colors duration-200 border border-white/15"
            >
              Explore our services
            </Link>
          </div>
        </div>
      </div>
    </div>
    </section>
  );
};

export default HomeCTA;
