"use client";

import React, { useEffect, useRef, useState } from "react";
import AnimatedNumber from "./HomeAnimationNumber";

const stats = [
  { value: 15, suffix: "+", label: "Years of Experience", sub: "Est. 2008" },
  {
    value: 500,
    suffix: "+",
    label: "University Partners",
    sub: "Across 25+ countries",
  },
  { value: 10000, suffix: "+", label: "Students Guided", sub: "And counting" },
  {
    value: 98,
    suffix: "%",
    label: "Visa Success Rate",
    sub: "Industry leading",
  },
];

// ── Single animated number ──────────────────────────────────────────────────
// function AnimatedNumber({
//   target,
//   suffix,
//   duration = 1800,
//   started,
// }: {
//   target: number;
//   suffix: string;
//   duration?: number;
//   started: boolean;
// }) {
//   const [display, setDisplay] = useState(0);
//   const rafRef = useRef<number | null>(null);
//   const startTs = useRef<number | null>(null);

//   useEffect(() => {
//     if (!started) return;

//     startTs.current = null;

//     function tick(ts: number) {
//       if (startTs.current === null) startTs.current = ts;
//       const elapsed = ts - startTs.current;
//       const progress = Math.min(elapsed / duration, 1);
//       const eased = easeOutQuart(progress);

//       setDisplay(Math.floor(eased * target));

//       if (progress < 1) {
//         rafRef.current = requestAnimationFrame(tick);
//       } else {
//         setDisplay(target); // ensure exact final value
//       }
//     }

//     rafRef.current = requestAnimationFrame(tick);
//     return () => {
//       if (rafRef.current) cancelAnimationFrame(rafRef.current);
//     };
//   }, [started, target, duration]);

//   // Format with commas for numbers >= 1000
//   const formatted =
//     display >= 1000 ? display.toLocaleString("en-US") : String(display);

//   return (
//     <>
//       {formatted}
//       {suffix}
//     </>
//   );
// }

// ── Section ─────────────────────────────────────────────────────────────────
const StatsCounter = () => {
  const [hasStarted, setHasStarted] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setHasStarted(true);
          observer.disconnect(); // only trigger once
        }
      },
      { threshold: 0.25 }, // start when 25% of the section is visible
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="py-6">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
        {stats.map(({ value, suffix, label, sub }, index) => (
          <div
            key={label}
            className={`
              relative flex flex-col items-center justify-center text-center
              rounded-2xl px-4 py-8 sm:py-10 overflow-hidden
              border transition-all duration-300 hover:-translate-y-1 hover:shadow-lg
              ${
                index === 0
                  ? "bg-primary border-primary text-white"
                  : "bg-white border-slate-100 shadow-sm"
              }
            `}
          >
            {/* Decorative circle */}
            <div
              className={`
                absolute -top-6 -right-6 w-20 h-20 rounded-full opacity-10
                ${index === 0 ? "bg-white" : "bg-primary"}
              `}
            />

            <p
              className={`
                font-poppins text-3xl sm:text-4xl font-bold leading-none tabular-nums
                ${index === 0 ? "text-white" : "text-primary"}
              `}
            >
              <AnimatedNumber
                target={value}
                suffix={suffix}
                duration={1800}
                started={hasStarted}
              />
            </p>

            <p
              className={`
                font-poppins text-sm font-semibold mt-2 leading-snug
                ${index === 0 ? "text-white/90" : "text-slate-800"}
              `}
            >
              {label}
            </p>

            <p
              className={`
                font-inter text-xs mt-1
                ${index === 0 ? "text-white/55" : "text-slate-400"}
              `}
            >
              {sub}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default StatsCounter;
