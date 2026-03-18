"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Check, X, Sparkles, Briefcase, GraduationCap, ArrowRight } from "lucide-react";
import Link from "next/link";

const shared = [
  { label: "Authorized by International Universities" },
  { label: "Free Assessment" },
  { label: "Gift Hamper" },
];

const doelOnly = [
  { label: "Global SIM Card" },
  { label: "Part-time Job Assistance" },
  { label: "Airport Pickup" },
  { label: "Health Insurance" },
  { label: "Internship Placement" },
  { label: "International Payment Services" },
  { label: "UK Bank Account Support" },
  { label: "Cheap Air Ticket" },
  { label: "IELTS Registration Cashback" },
];

function CheckItem({ label, muted = false }: { label: string; muted?: boolean }) {
  return (
    <div className={`flex items-start gap-3 ${muted ? "opacity-50" : ""}`}>
      <span className="mt-0.5 flex-shrink-0 w-5 h-5 rounded-full bg-emerald-500/15 flex items-center justify-center">
        <Check size={11} className="text-emerald-600" />
      </span>
      <span className="text-sm font-inter text-slate-700 leading-snug">{label}</span>
    </div>
  );
}

function CrossItem({ label }: { label: string }) {
  return (
    <div className="flex items-start gap-3 opacity-45">
      <span className="mt-0.5 flex-shrink-0 w-5 h-5 rounded-full bg-rose-500/10 flex items-center justify-center">
        <X size={11} className="text-rose-500" />
      </span>
      <span className="text-sm font-inter text-slate-400 leading-snug line-through decoration-slate-300">
        {label}
      </span>
    </div>
  );
}

export default function USPSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section className="py-20">
      {/* Header */}
      <div ref={ref} className="text-center mb-14">
        <motion.div
          className="flex items-center justify-center gap-3 mb-4"
          initial={{ opacity: 0, y: 10 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.45 }}
        >
          <span className="h-px w-8 bg-secondary block" />
          <span className="text-xs font-semibold uppercase tracking-[0.25em] font-inter text-primary">
            Why Doel
          </span>
          <span className="h-px w-8 bg-secondary block" />
        </motion.div>

        <motion.h2
          className="font-poppins text-3xl sm:text-4xl font-bold tracking-tight text-slate-900"
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.08 }}
        >
          Your{" "}
          <span className="text-primary relative inline-block">
            All-in-One
            <motion.span
              className="absolute -bottom-1 left-0 h-[2.5px] bg-secondary rounded-full"
              style={{ width: "100%", originX: 0 }}
              initial={{ scaleX: 0 }}
              animate={inView ? { scaleX: 1 } : {}}
              transition={{ duration: 0.5, delay: 0.42 }}
            />
          </span>{" "}
          Study Abroad Partner
        </motion.h2>

        <motion.p
          className="mt-3 text-sm text-slate-500 font-inter max-w-md mx-auto"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.45, delay: 0.18 }}
        >
          See exactly what sets Doel Education apart from every other consultancy.
        </motion.p>
      </div>

      {/* Two cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">

        {/* ── Left: Other Consultancies ── */}
        <motion.div
          initial={{ opacity: 0, x: -28 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.55, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="rounded-3xl border border-slate-200 bg-white overflow-hidden shadow-sm"
        >
          {/* Card header */}
          <div className="px-7 py-5 border-b border-slate-100 flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center">
              <Briefcase size={18} className="text-slate-400" />
            </div>
            <div>
              <p className="font-poppins font-bold text-slate-700 text-base">Other Consultancies</p>
              <p className="text-xs text-slate-400 font-inter mt-0.5">Standard offering</p>
            </div>
            <span className="ml-auto text-xs font-semibold font-inter text-slate-400 bg-slate-100 rounded-full px-3 py-1">
              {shared.length} services
            </span>
          </div>

          {/* Features */}
          <div className="px-7 py-6 space-y-4">
            {/* Shared items — available */}
            {shared.map((s, i) => (
              <motion.div
                key={s.label}
                initial={{ opacity: 0, y: 8 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.3, delay: 0.3 + i * 0.05 }}
              >
                <CheckItem label={s.label} />
              </motion.div>
            ))}

            {/* Doel-only items — crossed out */}
            {doelOnly.map((d, i) => (
              <motion.div
                key={d.label}
                initial={{ opacity: 0, y: 8 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.3, delay: 0.3 + (shared.length + i) * 0.04 }}
              >
                <CrossItem label={d.label} />
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* ── Right: Doel Education ── */}
        <motion.div
          initial={{ opacity: 0, x: 28 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.55, delay: 0.28, ease: [0.22, 1, 0.36, 1] }}
          className="rounded-3xl overflow-hidden shadow-2xl shadow-primary/15 relative"
          style={{ background: "var(--color-primary, #1a6b3c)" }}
        >
          {/* Dot texture */}
          <div
            className="pointer-events-none absolute inset-0 opacity-[0.06]"
            style={{
              backgroundImage: "radial-gradient(circle, white 1px, transparent 1px)",
              backgroundSize: "22px 22px",
            }}
          />
          {/* Glow top-right */}
          <div className="pointer-events-none absolute -top-16 -right-16 w-48 h-48 rounded-full bg-secondary/20 blur-3xl" />

          {/* Card header */}
          <div className="relative px-7 py-5 border-b border-white/10 flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-white/15 flex items-center justify-center">
              <GraduationCap size={18} className="text-white" />
            </div>
            <div>
              <p className="font-poppins font-bold text-white text-base">Doel Education</p>
              <p className="text-xs text-white/50 font-inter mt-0.5">Complete package</p>
            </div>
            {/* Badge */}
            <span className="ml-auto text-xs font-bold font-poppins bg-secondary text-slate-900 rounded-full px-3 py-1 flex items-center gap-1.5">
              <Sparkles size={11} />
              {shared.length + doelOnly.length} services
            </span>
          </div>

          {/* Features */}
          <div className="relative px-7 py-6 space-y-4">
            {/* Shared */}
            {shared.map((s, i) => (
              <motion.div
                key={s.label}
                initial={{ opacity: 0, y: 8 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.3, delay: 0.35 + i * 0.05 }}
                className="flex items-start gap-3"
              >
                <span className="mt-0.5 flex-shrink-0 w-5 h-5 rounded-full bg-white/15 flex items-center justify-center">
                  <Check size={11} className="text-white" />
                </span>
                <span className="text-sm font-inter text-white/80 leading-snug">{s.label}</span>
              </motion.div>
            ))}

            {/* Doel-only — highlighted */}
            {doelOnly.map((d, i) => (
              <motion.div
                key={d.label}
                initial={{ opacity: 0, y: 8 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.3, delay: 0.35 + (shared.length + i) * 0.045 }}
                className="flex items-start gap-3 rounded-xl px-3 py-2 -mx-3"
                style={{ background: "rgba(255,255,255,0.07)", border: "1px solid rgba(255,255,255,0.10)" }}
              >
                <span className="mt-0.5 flex-shrink-0 w-5 h-5 rounded-full bg-secondary/25 flex items-center justify-center">
                  <Check size={11} className="text-secondary" />
                </span>
                <span className="text-sm font-inter text-white font-medium leading-snug">{d.label}</span>
                {/* Exclusive tag on first few */}
                {i < 3 && (
                  <span className="ml-auto flex-shrink-0 text-[9px] font-bold font-inter uppercase tracking-wider text-secondary/80 bg-secondary/10 rounded-full px-2 py-0.5 self-center">
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
              Get Started with Doel
              <ArrowRight size={15} />
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}