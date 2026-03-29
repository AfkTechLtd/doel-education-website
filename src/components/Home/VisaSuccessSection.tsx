"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { ShieldCheck, FileText, GraduationCap, Clock } from "lucide-react";

// ── Visa success rates by visa type ──────────────────────────────────────────
const visaTypes = [
  { label: "F-1 Student Visa", sub: "Full-time degree programs", rate: 98 },
  {
    label: "J-1 Exchange Visitor Visa",
    sub: "Research & exchange programs",
    rate: 96,
  },
  {
    label: "M-1 Vocational Visa",
    sub: "Non-academic & vocational courses",
    rate: 94,
  },
  {
    label: "OPT Extension (STEM)",
    sub: "Post-graduation work authorization",
    rate: 97,
  },
];

// ── Application stage success / completion rates ──────────────────────────────
const stages = [
  {
    label: "Document Preparation",
    sub: "DS-160, financials, transcripts",
    rate: 100,
    icon: FileText,
  },
  {
    label: "University Admission",
    sub: "I-20 & acceptance letter secured",
    rate: 99,
    icon: GraduationCap,
  },
  {
    label: "SEVIS Registration",
    sub: "Fee paid & record activated",
    rate: 100,
    icon: ShieldCheck,
  },
  {
    label: "Visa Interview Prep",
    sub: "Mock sessions & embassy guidance",
    rate: 95,
    icon: Clock,
  },
];

// ── Animated progress bar ─────────────────────────────────────────────────────
function ProgressBar({
  label,
  sub,
  rate,
  icon: Icon,
  index,
  accent = false,
}: {
  label: string;
  sub: string;
  rate: number;
  icon?: React.ElementType;
  index: number;
  accent?: boolean;
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{
        duration: 0.45,
        delay: index * 0.08,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="group"
    >
      {/* Label row */}
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2.5">
          {Icon && (
            <span className="w-6 h-6 rounded-lg bg-primary/8 flex items-center justify-center flex-shrink-0">
              <Icon size={13} className="text-primary" />
            </span>
          )}
          <div>
            <p className="text-sm font-semibold text-slate-800 font-poppins leading-tight">
              {label}
            </p>
            <p className="text-[11px] text-slate-400 font-inter mt-0.5">
              {sub}
            </p>
          </div>
        </div>

        {/* Bubble badge */}
        <div className="relative flex-shrink-0 ml-3">
          <div
            className="w-12 h-12 rounded-full flex items-center justify-center text-sm font-bold font-poppins text-white shadow-md"
            style={{
              background: accent
                ? "var(--color-secondary, #f5c842)"
                : "var(--color-primary, #1a6b3c)",
              color: accent ? "#1a1a1a" : "white",
            }}
          >
            {rate}%
          </div>
          {/* Tiny pointer */}
          <div
            className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-3 h-3 rotate-45 rounded-sm"
            style={{
              background: accent
                ? "var(--color-secondary, #f5c842)"
                : "var(--color-primary, #1a6b3c)",
            }}
          />
        </div>
      </div>

      {/* Track */}
      <div className="relative h-3 rounded-full bg-slate-100 overflow-hidden">
        {/* Fill */}
        <motion.div
          className="absolute inset-y-0 left-0 rounded-full"
          style={{
            background: accent
              ? "linear-gradient(90deg, var(--color-secondary, #f5c842), color-mix(in srgb, var(--color-secondary, #f5c842) 70%, #fff))"
              : "linear-gradient(90deg, var(--color-primary, #1a6b3c), color-mix(in srgb, var(--color-primary, #1a6b3c) 70%, #22c55e))",
          }}
          initial={{ width: 0 }}
          animate={inView ? { width: `${rate}%` } : { width: 0 }}
          transition={{
            duration: 1.1,
            delay: index * 0.08 + 0.2,
            ease: [0.22, 1, 0.36, 1],
          }}
        />
        {/* Shimmer sweep */}
        <motion.div
          className="absolute inset-y-0 w-16 rounded-full"
          style={{
            background:
              "linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent)",
          }}
          initial={{ left: "-10%" }}
          animate={inView ? { left: "110%" } : { left: "-10%" }}
          transition={{
            duration: 1.0,
            delay: index * 0.08 + 0.9,
            ease: "easeOut",
          }}
        />
      </div>
    </motion.div>
  );
}

// ── Section ───────────────────────────────────────────────────────────────────
const VisaSuccess = () => {
  const headingRef = useRef(null);
  const inView = useInView(headingRef, { once: true, margin: "-80px" });

  return (
    <section className="py-16 sm:py-20 lg:py-24">
      {/* ── Header ── */}
      <div ref={headingRef} className="mb-14">
        <motion.div
          className="flex items-center gap-3 mb-4"
          initial={{ opacity: 0, y: 10 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.4 }}
        >
          <span className="h-px w-8 bg-secondary block" />
          <span className="text-xs font-semibold uppercase tracking-[0.25em] font-inter text-primary">
            Visa Success
          </span>
        </motion.div>

        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
          <motion.h2
            className="font-poppins text-3xl sm:text-4xl font-bold tracking-tight text-slate-900 max-w-lg"
            initial={{ opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            Our{" "}
            <span className="text-primary relative inline-block">
              USA Visa
              <motion.span
                className="absolute -bottom-1 left-0 h-[2.5px] bg-secondary rounded-full"
                style={{ width: "100%", originX: 0 }}
                initial={{ scaleX: 0 }}
                animate={inView ? { scaleX: 1 } : {}}
                transition={{ duration: 0.45, delay: 0.5 }}
              />
            </span>{" "}
            Success Rate
          </motion.h2>

          <motion.p
            className="text-sm text-slate-400 font-inter max-w-xs sm:text-right"
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.4, delay: 0.2 }}
          >
            We specialize exclusively in US student visas from F-1 to OPT
            extensions with an industry-leading approval record.
          </motion.p>
        </div>
      </div>

      {/* ── Two-column grid ── */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-16 gap-y-2">
        {/* Left  Visa types */}
        <div>
          <motion.p
            className="text-xs font-semibold uppercase tracking-widest text-slate-400 font-inter mb-6"
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ delay: 0.25 }}
          >
            By Visa Type
          </motion.p>
          <div className="space-y-7">
            {visaTypes.map((v, i) => (
              <ProgressBar
                key={v.label}
                label={v.label}
                sub={v.sub}
                rate={v.rate}
                index={i}
              />
            ))}
          </div>
        </div>

        {/* Divider  vertical on lg, horizontal on mobile */}
        <div className="hidden lg:block absolute left-1/2 top-0 bottom-0 w-px bg-slate-100 pointer-events-none" />
        <div className="lg:hidden h-px bg-slate-100 my-10" />

        {/* Right  Application stages */}
        <div>
          <motion.p
            className="text-xs font-semibold uppercase tracking-widest text-slate-400 font-inter mb-6"
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ delay: 0.3 }}
          >
            By Application Stage
          </motion.p>
          <div className="space-y-7">
            {stages.map((s, i) => (
              <ProgressBar
                key={s.label}
                label={s.label}
                sub={s.sub}
                rate={s.rate}
                icon={s.icon}
                index={i}
                accent={i % 2 === 1}
              />
            ))}
          </div>
        </div>
      </div>

      {/* ── Bottom note ── */}
      <motion.p
        className="mt-14 text-center text-xs text-slate-300 font-inter"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        * Based on applications processed between 2019–2024. Success rate
        defined as visa approval at first interview.
      </motion.p>
    </section>
  );
};

export default VisaSuccess;
