"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import {
  BookOpen, Building2, Award, Mail, CreditCard,
  FileCheck, Stethoscope, CalendarCheck, Fingerprint, CheckCircle2,
  ChevronDown,
} from "lucide-react";

const steps = [
  { n: "01", label: "Select a Course",                     icon: BookOpen,      color: "#e07b54" },
  { n: "02", label: "Apply to a University",               icon: Building2,     color: "#7b9cce" },
  { n: "03", label: "Apply for Scholarship",               icon: Award,         color: "#d16abf" },
  { n: "04", label: "Receive the Offer Letter",            icon: Mail,          color: "#c97dbf" },
  { n: "05", label: "Pay Tuition Fee & Receive Receipt",   icon: CreditCard,    color: "#4db8a0" },
  { n: "06", label: "Receive LOA (Letter of Acceptance)",  icon: FileCheck,     color: "#4db8a0" },
  { n: "07", label: "Schedule IME (Medical Examination)",  icon: Stethoscope,   color: "#b87bc8" },
  { n: "08", label: "Prepare for Visa Filing",             icon: CalendarCheck, color: "#9fbe45" },
  { n: "09", label: "Biometrics & Interview",              icon: Fingerprint,   color: "#e06060" },
  { n: "10", label: "Visa Outcome",                        icon: CheckCircle2,  color: "#4a7dbf" },
];

const row1 = steps.slice(0, 5);   // 01–05 → left to right
const row2 = [...steps.slice(5, 10)].reverse(); // visually: 10,09,08,07,06 → left to right on screen = right-to-left flow

// ── Arrow connector (SVG) ─────────────────────────────────────────────────────
// "right" = arrowhead on RIGHT end (row 1)
// "left"  = arrowhead on LEFT end  (row 2, since flow is visually right-to-left)
function Arrow({
  color,
  dir,
  delay,
  inView,
}: {
  color: string;
  dir: "right" | "left";
  delay: number;
  inView: boolean;
}) {
  return (
    <motion.div
      className="flex-shrink-0 self-start mt-[44px]"
      initial={{ opacity: 0 }}
      animate={inView ? { opacity: 1 } : {}}
      transition={{ duration: 0.35, delay }}
    >
      <svg width="64" height="22" viewBox="0 0 64 22" fill="none" xmlns="http://www.w3.org/2000/svg">
        {dir === "right" ? (
          <>
            <line x1="2" y1="11" x2="52" y2="11" stroke={color} strokeWidth="2.5" strokeOpacity="0.55" />
            {/* Arrowhead pointing right */}
            <polyline
              points="44,4 58,11 44,18"
              stroke={color}
              strokeWidth="2.5"
              strokeOpacity="0.85"
              strokeLinecap="round"
              strokeLinejoin="round"
              fill="none"
            />
          </>
        ) : (
          <>
            <line x1="12" y1="11" x2="62" y2="11" stroke={color} strokeWidth="2.5" strokeOpacity="0.55" />
            {/* Arrowhead pointing left */}
            <polyline
              points="20,4 6,11 20,18"
              stroke={color}
              strokeWidth="2.5"
              strokeOpacity="0.85"
              strokeLinecap="round"
              strokeLinejoin="round"
              fill="none"
            />
          </>
        )}
      </svg>
    </motion.div>
  );
}

// ── Step node ─────────────────────────────────────────────────────────────────
function StepNode({
  step,
  delay,
  inView,
}: {
  step: (typeof steps)[0];
  delay: number;
  inView: boolean;
}) {
  const Icon = step.icon;
  return (
    <motion.div
      className="flex flex-col items-center w-[160px] flex-shrink-0"
      initial={{ opacity: 0, y: 28 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.55, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {/* Outer ring + circle */}
      <motion.div
        className="w-[100px] h-[100px] rounded-full flex items-center justify-center shadow-xl"
        style={{
          backgroundColor: step.color,
          boxShadow: `0 8px 28px -6px ${step.color}88, 0 0 0 6px white, 0 0 0 8px ${step.color}22`,
        }}
        initial={{ scale: 0.35 }}
        animate={inView ? { scale: 1 } : {}}
        transition={{ type: "spring", stiffness: 180, damping: 15, delay }}
      >
        <Icon size={38} strokeWidth={1.4} className="text-white" />
      </motion.div>

      {/* Step number */}
      <span
        className="mt-3 text-[11px] font-black font-poppins tracking-[0.2em] uppercase"
        style={{ color: step.color }}
      >
        Step {step.n}
      </span>

      {/* Label card */}
      <div
        className="mt-2 rounded-2xl border border-slate-100 bg-white shadow-sm px-4 py-4 w-full text-center
                   hover:shadow-md hover:-translate-y-1 transition-all duration-200 min-h-[72px]
                   flex items-center justify-center"
      >
        <p className="font-poppins font-semibold text-slate-800 text-[13px] leading-snug">
          {step.label}
        </p>
      </div>
    </motion.div>
  );
}

// ── Down-turn connector ───────────────────────────────────────────────────────
function TurnConnector({ inView }: { inView: boolean }) {
  return (
    <motion.div
      className="hidden lg:flex justify-end pr-[80px] my-1"
      initial={{ opacity: 0 }}
      animate={inView ? { opacity: 1 } : {}}
      transition={{ duration: 0.4, delay: 0.65 }}
    >
      <div className="flex flex-col items-center gap-0.5">
        <div className="w-[2.5px] h-10 rounded-full bg-slate-300" />
        <ChevronDown size={22} strokeWidth={2.5} className="text-slate-400 -mt-2" />
      </div>
    </motion.div>
  );
}

// ── Section ───────────────────────────────────────────────────────────────────
export default function ApplicationProcess() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section className="py-20 overflow-x-hidden" ref={ref}>
      {/* Header */}
      <div className="text-center mb-16">
        <motion.div
          className="flex items-center justify-center gap-3 mb-4"
          initial={{ opacity: 0, y: 10 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.45 }}
        >
          <span className="h-px w-8 bg-secondary block" />
          <span className="text-xs font-semibold uppercase tracking-[0.25em] font-inter text-primary">
            How It Works
          </span>
          <span className="h-px w-8 bg-secondary block" />
        </motion.div>

        <motion.h2
          className="font-poppins text-3xl sm:text-4xl font-bold tracking-tight text-slate-900"
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          Your{" "}
          <span className="text-primary relative inline-block">
            Application Journey
            <motion.span
              className="absolute -bottom-1 left-0 h-[2.5px] bg-secondary rounded-full"
              style={{ width: "100%", originX: 0 }}
              initial={{ scaleX: 0 }}
              animate={inView ? { scaleX: 1 } : {}}
              transition={{ duration: 0.45, delay: 0.5 }}
            />
          </span>
        </motion.h2>

        <motion.p
          className="mt-3 text-sm text-slate-400 font-inter max-w-md mx-auto"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.4, delay: 0.2 }}
        >
          10 clear steps from choosing your course all the way to your visa outcome.
        </motion.p>
      </div>

      {/* ── Desktop: snake layout ── */}
      <div className="hidden lg:block">

        {/* Row 1 — 01→02→03→04→05 (left to right, arrows point RIGHT) */}
        <div className="flex items-start justify-center gap-0 px-4">
          {row1.map((step, i) => (
            <div key={step.n} className="flex items-start">
              <StepNode step={step} delay={0.1 + i * 0.1} inView={inView} />
              {i < row1.length - 1 && (
                <Arrow
                  color={step.color}
                  dir="right"
                  delay={0.2 + i * 0.1}
                  inView={inView}
                />
              )}
            </div>
          ))}
        </div>

        {/* Down-turn on right side */}
        <TurnConnector inView={inView} />

        {/*
          Row 2 visual layout: 10 — 09 — 08 — 07 — 06
          (right-to-left flow, so step 06 is on the far RIGHT, step 10 on the far LEFT)
          row2 array = [10,09,08,07,06] (reversed above)
          Arrows between pairs: 10→09, 09→08, 08→07, 07→06
          Each arrow points LEFT (toward the next step which is to the right in the array
          but to the right on screen = direction of flow which is rightward toward 06).
          
          Wait — flow is: 05 finishes (top-right), turns down, then goes RIGHT-TO-LEFT:
          06 is under 05 (far right), 10 is far left.
          So on screen: 10 | 09 | 08 | 07 | 06
          The flow direction is 06→07→08→09→10, i.e. RIGHT→LEFT on screen.
          Arrows must point LEFT (the direction the student travels).
          
          row2 = [10,09,08,07,06] displayed left to right on screen.
          Between node[i] and node[i+1]:
            node[0]=10, node[1]=09: arrow between them points LEFT (toward 09 which is to the right in flow... 
            
          Actually simpler: arrow tip always points toward the NEXT step in the journey.
          06→07: 07 is to the LEFT of 06 on screen → arrow points LEFT ✓
          07→08: 08 is to the LEFT of 07 on screen → arrow points LEFT ✓
          ... all arrows point LEFT ✓
          
          In our array [10,09,08,07,06], the arrow between index i and i+1 connects
          step (10-i) → step (10-i-1), i.e. from a higher number to a lower, pointing RIGHT on screen.
          No wait: index 0=10, index 1=09. The journey goes 09→10 visually (left, since 10 is more left).
          
          Cleanest solution: render row2 in REVERSE order on screen = [06,07,08,09,10] left-to-right
          using flex-row-reverse, and use LEFT-pointing arrows, since those nodes will appear
          right-to-left on the actual screen.
        */}
        <div className="flex items-start justify-center gap-0 px-4 flex-row-reverse">
          {steps.slice(5, 10).map((step, i, arr) => (
            <div key={step.n} className="flex items-start flex-row-reverse">
              <StepNode step={step} delay={0.7 + i * 0.1} inView={inView} />
              {i < arr.length - 1 && (
                <Arrow
                  color={step.color}
                  dir="left"
                  delay={0.78 + i * 0.1}
                  inView={inView}
                />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* ── Mobile: vertical timeline ── */}
      <div className="lg:hidden flex flex-col px-2">
        {steps.map((step, i) => {
          const Icon = step.icon;
          const isLast = i === steps.length - 1;
          return (
            <motion.div
              key={step.n}
              className="flex items-start gap-5 relative"
              initial={{ opacity: 0, x: -16 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.4, delay: 0.05 + i * 0.06 }}
            >
              {/* Vertical line */}
              {!isLast && (
                <div
                  className="absolute left-[35px] top-[72px] w-[2.5px] z-0"
                  style={{
                    height: "calc(100%)",
                    background: `linear-gradient(to bottom, ${step.color}66, ${steps[i + 1].color}44)`,
                  }}
                />
              )}
              {/* Chevron midpoint indicator */}
              {!isLast && (
                <div
                  className="absolute left-[24px] z-10"
                  style={{ top: "calc(50% + 12px)" }}
                >
                  <ChevronDown
                    size={22}
                    strokeWidth={2.5}
                    style={{ color: `${step.color}cc` }}
                  />
                </div>
              )}

              {/* Circle */}
              <div
                className="relative z-10 w-[72px] h-[72px] rounded-full flex-shrink-0 flex items-center justify-center shadow-lg"
                style={{
                  backgroundColor: step.color,
                  boxShadow: `0 6px 20px -4px ${step.color}77, 0 0 0 4px white, 0 0 0 6px ${step.color}22`,
                }}
              >
                <Icon size={28} className="text-white" strokeWidth={1.4} />
              </div>

              {/* Text */}
              <div className="flex-1 pb-10 pt-1">
                <span
                  className="text-[10px] font-black font-poppins tracking-[0.18em] uppercase"
                  style={{ color: step.color }}
                >
                  Step {step.n}
                </span>
                <p className="font-poppins font-semibold text-slate-800 text-base leading-snug mt-0.5">
                  {step.label}
                </p>
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}