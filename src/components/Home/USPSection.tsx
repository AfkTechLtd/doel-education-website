"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Check, X, Sparkles, Briefcase, GraduationCap, ArrowRight } from "lucide-react";
import Link from "next/link";

// ─── Comparison data from PDF ──────────────────────────────────────────────────

const rows: {
  label: string;
  other: string | null; // null = not provided / doesn't exist
  dgs: string;
  exclusive?: boolean; // highlight badge on DGS side
}[] = [
  {
    label: "University Destinations",
    other: "10–15 countries, scattered focus",
    dgs: "USA focused only",
    exclusive: true,
  },
  {
    label: "University Authorization",
    other: "Unofficial tie-ups, unverified claims",
    dgs: "Direct authorization from ranked US universities",
    exclusive: true,
  },
  {
    label: "Visa Preparation",
    other: "One generic mock session",
    dgs: "Multiple rounds, real embassy questions",
    exclusive: true,
  },
  {
    label: "Post-Visa Support",
    other: "File closed after visa approval",
    dgs: "Full support until you settle in America",
    exclusive: true,
  },
  {
    label: "Housing Support",
    other: "\u201cFigure it out yourself\u201d",
    dgs: "Confirmed housing before departure",
    exclusive: true,
  },
  {
    label: "Free Assessment",
    other: "Paid consultation",
    dgs: "100% free, no obligation",
    exclusive: true,
  },
  {
    label: "Transparent Pricing",
    other: "Hidden fees at every stage",
    dgs: "One fee, zero surprises",
    exclusive: true,
  },
  {
    label: "I-20 Guarantee",
    other: null,
    dgs: "Guaranteed in writing",
    exclusive: true,
  },

  {
    label: "Airport Pickup",
    other: null,
    dgs: "Arranged before you land",

    exclusive: true,
  },

  {
    label: "Global SIM Card",
    other: null,
    dgs: "Ready on arrival",
    exclusive: true,
  },
  {
    label: "Health Insurance",
    other: null,
    dgs: "Active from day one",
    exclusive: true,
  },
  {
    label: "Bank Account Support",
    other: null,
    dgs: "Full guidance included",
    exclusive: true,
  },
  {
    label: "Part-Time Job Assistance",
    other: null,
    dgs: "Legal opportunities arranged",
    exclusive: true,
  },
  {
    label: "Internship Placement",
    other: null,
    dgs: "Connected before you graduate",
    exclusive: true,
  },
  {
    label: "Job Within 6 Months",
    other: null,
    dgs: "CPT & work authorization guidance included",
    exclusive: true,
  },
  {
    label: "Departure Gift",
    other: null,
    dgs: "Because you deserve a proper send-off",
    exclusive: true,
  },
];

export default function USPSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section className="py-16 sm:py-20 lg:py-24">
      {/* ── Header ─────────────────────────────────────────────────────────── */}
      <div ref={ref} className="text-center mb-14">
        <motion.div
          className="flex items-center justify-center gap-3 mb-4"
          initial={{ opacity: 0, y: 10 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.45 }}
        >
          <span className="h-px w-8 bg-secondary block" />
          <span className="text-xs font-semibold uppercase tracking-[0.25em] font-inter text-primary">
            Why DGS
          </span>
          <span className="h-px w-8 bg-secondary block" />
        </motion.div>

        <motion.h2
          className="font-poppins text-3xl sm:text-4xl font-bold tracking-tight text-slate-900"
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.08 }}
        >
          Why students who went elsewhere{" "}
          <span className="text-primary relative inline-block">
            came back to us.
            <motion.span
              className="absolute -bottom-1 left-0 h-[2.5px] bg-secondary rounded-full"
              style={{ width: "100%", originX: 0 }}
              initial={{ scaleX: 0 }}
              animate={inView ? { scaleX: 1 } : {}}
              transition={{ duration: 0.5, delay: 0.42 }}
            />
          </span>
        </motion.h2>

        <motion.p
          className="mt-3 text-sm text-slate-500 font-inter max-w-md mx-auto"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.45, delay: 0.18 }}
        >
          We&apos;re not the only study abroad agency in Bangladesh. But here&apos;s an honest
          look at what most agencies offer &mdash; and what they quietly don&apos;t.
        </motion.p>
      </div>

      {/* ── Two cards ──────────────────────────────────────────────────────── */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">

        {/* ── Left: Other Agencies ───────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, x: -28 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.55, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="rounded-3xl border border-slate-200 bg-white overflow-hidden shadow-sm"
        >
          {/* Card header */}
          <div className="px-7 py-5 border-b border-slate-100 flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center flex-shrink-0">
              <Briefcase size={18} className="text-slate-400" />
            </div>
            <div>
              <p className="font-poppins font-bold text-slate-700 text-base">Other Agencies</p>
              <p className="text-xs text-slate-400 font-inter mt-0.5">Standard offering</p>
            </div>
            <span className="ml-auto flex-shrink-0 text-xs font-semibold font-inter text-slate-400 bg-slate-100 rounded-full px-3 py-1">
              {rows.filter((r) => r.other !== null).length} services
            </span>
          </div>

          {/* Rows */}
          <div className="px-7 py-6 space-y-3">
            {rows.map((row, i) => (
              <motion.div
                key={row.label}
                initial={{ opacity: 0, y: 8 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.3, delay: 0.3 + i * 0.04 }}
                className="flex items-start gap-3"
              >
                {row.other !== null ? (
                  <>
                    <span className="mt-0.5 flex-shrink-0 w-5 h-5 rounded-full bg-emerald-500/15 flex items-center justify-center">
                      <Check size={11} className="text-emerald-600" />
                    </span>
                    <div className="min-w-0">
                      <p className="text-xs font-semibold font-inter text-slate-400 uppercase tracking-wide mb-0.5">
                        {row.label}
                      </p>
                      <p className="text-sm font-inter text-slate-600 leading-snug">{row.other}</p>
                    </div>
                  </>
                ) : (
                  <>
                    <span className="mt-0.5 flex-shrink-0 w-5 h-5 rounded-full bg-rose-500/10 flex items-center justify-center">
                      <X size={11} className="text-rose-400" />
                    </span>
                    <div className="min-w-0 opacity-45">
                      <p className="text-xs font-semibold font-inter text-slate-400 uppercase tracking-wide mb-0.5 line-through decoration-slate-300">
                        {row.label}
                      </p>
                      <p className="text-sm font-inter text-slate-400 leading-snug line-through decoration-slate-300">
                        Not provided
                      </p>
                    </div>
                  </>
                )}
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* ── Right: DGS ─────────────────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, x: 28 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.55, delay: 0.28, ease: [0.22, 1, 0.36, 1] }}
          className="rounded-3xl overflow-hidden shadow-2xl shadow-primary/15 relative"
          style={{ background: "var(--color-primary)" }}
        >
          {/* Dot texture */}
          <div
            className="pointer-events-none absolute inset-0 opacity-[0.06]"
            style={{
              backgroundImage: "radial-gradient(circle, white 1px, transparent 1px)",
              backgroundSize: "22px 22px",
            }}
          />
          {/* Glow */}
          <div className="pointer-events-none absolute -top-16 -right-16 w-48 h-48 rounded-full bg-secondary/20 blur-3xl" />

          {/* Card header */}
          <div className="relative px-7 py-5 border-b border-white/10 flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-white/15 flex items-center justify-center flex-shrink-0">
              <GraduationCap size={18} className="text-white" />
            </div>
            <div>
              <p className="font-poppins font-bold text-white text-base">DGS Education</p>
              <p className="text-xs text-white/50 font-inter mt-0.5">Complete package</p>
            </div>
            <span className="ml-auto flex-shrink-0 text-xs font-bold font-poppins bg-secondary text-slate-900 rounded-full px-3 py-1 flex items-center gap-1.5">
              <Sparkles size={11} />
              {rows.length} services
            </span>
          </div>

          {/* Rows */}
          <div className="relative px-7 py-6 space-y-3">
            {rows.map((row, i) => (
              <motion.div
                key={row.label}
                initial={{ opacity: 0, y: 8 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.3, delay: 0.35 + i * 0.04 }}
                className={`flex items-start gap-3 rounded-xl px-3 py-2 -mx-3 transition-colors ${
                  row.exclusive
                    ? "bg-white/10 border border-white/15"
                    : "hover:bg-white/5"
                }`}
              >
                <span
                  className={`mt-0.5 flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center ${
                    row.exclusive ? "bg-secondary/25" : "bg-white/15"
                  }`}
                >
                  <Check
                    size={11}
                    className={row.exclusive ? "text-secondary" : "text-white"}
                  />
                </span>
                <div className="min-w-0 flex-1">
                  <p
                    className={`text-xs font-semibold font-inter uppercase tracking-wide mb-0.5 ${
                      row.exclusive ? "text-secondary/80" : "text-white/50"
                    }`}
                  >
                    {row.label}
                  </p>
                  <p
                    className={`text-sm font-inter leading-snug ${
                      row.exclusive ? "text-white font-medium" : "text-white/75"
                    }`}
                  >
                    {row.dgs}
                  </p>
                </div>
                {row.exclusive && (
                  <span className="flex-shrink-0 self-center text-[9px] font-bold font-inter uppercase tracking-wider text-secondary/90 bg-secondary/10 rounded-full px-2 py-0.5">
                    Exclusive
                  </span>
                )}
              </motion.div>
            ))}
          </div>

          {/* CTA */}
          <div className="relative px-7 pb-7 pt-2">
            <Link
              href="/consultation"
              className="flex items-center justify-center gap-2 w-full rounded-xl bg-secondary text-slate-900 font-poppins font-bold text-sm py-3.5 transition-all duration-200 hover:brightness-110 hover:-translate-y-0.5"
            >
              Get Started with DGS
              <ArrowRight size={15} />
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}