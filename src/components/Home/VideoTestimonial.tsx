"use client";

import { useEffect, useRef, useState } from "react";
import AnimatedNumber from "./HomeAnimationNumber";

// ── Bottom stats config ──────────────────────────────────────────────────────
const bottomStats = [
  { value: 500, suffix: "+", label: "Students placed" },
  { value: 40, suffix: "+", label: "Partner universities" },
  { value: 15, suffix: "+", label: "Countries covered" },
];

// ── Component ────────────────────────────────────────────────────────────────
const VideoTestimonial = () => {
  const [started, setStarted] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setStarted(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="py-16 sm:py-20 lg:py-24 overflow-hidden">
      {/* Section label */}
      <div className="flex items-center gap-3 mb-14">
        <span className="h-px w-10 block bg-secondary" />
        <p className="text-xs font-semibold uppercase tracking-[0.25em] font-inter text-primary">
          Student Stories
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        {/* ── Left  video embed ── */}
        <div className="relative">
          {/* Decorative blocks */}
          <div className="absolute -top-4 -left-4 w-full h-full rounded-3xl bg-primary/8" />
          <div className="absolute -bottom-4 -right-4 w-32 h-32 rounded-2xl bg-secondary/15" />

          {/* Video */}
          <div className="relative rounded-3xl overflow-hidden shadow-2xl aspect-video border border-slate-100">
            <iframe
              className="w-full h-full"
              src="https://www.youtube.com/embed/dQw4w9WgXcQ"
              title="Student video testimonial"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            />
          </div>

          {/* Floating stat card */}
          <div className="absolute bottom-2 right-2 sm:-bottom-6 sm:-right-6 rounded-2xl px-4 sm:px-5 py-3 sm:py-4 shadow-xl border border-white/60 backdrop-blur-sm bg-primary">
            <p className="text-3xl font-bold text-white font-poppins leading-none tabular-nums">
              <AnimatedNumber
                target={96}
                suffix="%"
                started={started}
                duration={1600}
              />
            </p>
            <p className="text-xs text-white/70 font-inter mt-1 leading-tight">
              Visa success
              <br />
              rate
            </p>
          </div>
        </div>

        {/* ── Right  copy ── */}
        <div className="space-y-2 lg:pl-6">
          <h2 className="text-4xl font-semibold leading-[1.15] tracking-tight font-poppins text-primary">
            Real students.
            <br />
            <span className="text-secondary">Real outcomes.</span>
          </h2>

          <p className="text-base leading-relaxed text-slate-500 font-inter max-w-md">
            Discover how we&apos;ve helped hundreds of students secure
            admissions and visas to top universities worldwide with guidance
            that stays with you at every step.
          </p>

          {/* Pull quote */}
          <blockquote className="space-y-1">
            <div className="text-4xl font-serif leading-none text-secondary">
              &ldquo;
            </div>
            <p className="text-slate-700 font-inter text-base leading-relaxed -mt-2">
              The team guided me from day one and made the entire process feel
              simple and achievable. I got into my dream university in the US.
            </p>
            <footer className="flex items-center gap-3 pt-1">
              <div className="w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-bold font-poppins bg-primary">
                R
              </div>
              <div>
                <p className="text-sm font-semibold font-inter text-primary">
                  Rafiq Hossain
                </p>
                <p className="text-xs text-slate-400 font-inter">
                  University of Texas Fall 2024
                </p>
              </div>
            </footer>
          </blockquote>

          {/* Stats row */}
          <div className="grid grid-cols-3 gap-4 pt-4 border-t border-slate-100">
            {bottomStats.map(({ value, suffix, label }, i) => (
              <div key={label}>
                <p className="text-2xl font-bold font-poppins text-primary tabular-nums">
                  <AnimatedNumber
                    target={value}
                    suffix={suffix}
                    started={started}
                    duration={1400 + i * 200} // stagger: 1400 / 1600 / 1800ms
                  />
                </p>
                <p className="text-xs text-slate-400 font-inter mt-0.5 leading-snug">
                  {label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default VideoTestimonial;
