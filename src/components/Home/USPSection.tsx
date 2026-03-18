"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Check, X, Sparkles, Briefcase, GraduationCap } from "lucide-react";

type Row = {
  label: string;
  other: boolean;
  doel: boolean;
};

const rows: Row[] = [
  { label: "Authorized by International Universities", other: true, doel: true },
  { label: "Global SIM Card", other: false, doel: true },
  { label: "Part-time Job Assistance", other: false, doel: true },
  { label: "Airport Pickup", other: false, doel: true },
  { label: "Health Insurance", other: false, doel: true },
  { label: "Internship Placement", other: false, doel: true },
  { label: "International Payment Services (Card/Bank Transfer)", other: false, doel: true },
  { label: "UK Bank Account Support", other: false, doel: true },
  { label: "Cheap Air Ticket", other: false, doel: true },
  { label: "IELTS Registration Cashback", other: false, doel: true },
  { label: "Gift Hamper", other: true, doel: true },
  { label: "Free Assessment", other: true, doel: true },
];

function CellIcon({ ok }: { ok: boolean }) {
  return (
    <span
      className={[
        "inline-flex items-center justify-center w-6 h-6 rounded-full",
        ok ? "bg-emerald-500" : "bg-rose-500",
      ].join(" ")}
      aria-hidden="true"
    >
      {ok ? <Check size={14} className="text-white" /> : <X size={14} className="text-white" />}
    </span>
  );
}

export default function USPSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section className="py-20">
      <div className="mx-auto max-w-7xl px-6">
        {/* Header */}
        <div ref={ref} className="text-center mb-10">
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
                transition={{ duration: 0.5, delay: 0.4 }}
              />
            </span>{" "}
            Study Abroad Partner
          </motion.h2>

          <motion.p
            className="mt-3 text-sm text-slate-500 font-inter max-w-2xl mx-auto"
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.45, delay: 0.18 }}
          >
            A quick comparison of what you typically get elsewhere vs. what you get with Doel.
          </motion.p>
        </div>

        {/* Table shell (scrolls horizontally on small screens) */}
        <motion.div
          initial={{ opacity: 0, y: 22 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.55, delay: 0.18, ease: [0.22, 1, 0.36, 1] }}
          className="-mx-2 px-2 overflow-x-auto"
        >
          <div className="min-w-[680px] rounded-3xl border border-slate-200 overflow-hidden shadow-sm bg-white">
            {/* Header row */}
            <div className="grid grid-cols-[1.3fr_.55fr_.55fr] bg-primary text-white">
              <div className="px-5 py-4 flex items-center gap-2.5">
                <Sparkles size={16} className="text-secondary" />
                <span className="font-poppins font-semibold">Services</span>
              </div>
              <div className="px-5 py-4 flex items-center justify-center gap-2 border-l border-white/10">
                <Briefcase size={16} className="text-white/85" />
                <span className="font-inter text-xs font-semibold tracking-wide uppercase">
                  Other Consultancy
                </span>
              </div>
              <div className="px-5 py-4 flex items-center justify-center gap-2 border-l border-white/10">
                <GraduationCap size={16} className="text-secondary" />
                <span className="font-inter text-xs font-semibold tracking-wide uppercase">
                  Doel Education
                </span>
              </div>
            </div>

            {/* Rows */}
            <div className="divide-y divide-slate-200">
              {rows.map((r, i) => (
                <motion.div
                  key={r.label}
                  initial={{ opacity: 0, y: 10 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.35, delay: 0.22 + i * 0.03 }}
                  className="grid grid-cols-[1.3fr_.55fr_.55fr] items-center bg-white hover:bg-slate-50/60 transition-colors"
                >
                  <div className="px-5 py-4">
                    <p className="text-[13px] sm:text-sm font-semibold font-inter text-slate-800 leading-snug">
                      {r.label}
                    </p>
                  </div>
                  <div className="px-5 py-4 flex justify-center border-l border-slate-200">
                    <motion.div
                      whileHover={{ scale: 1.08 }}
                      transition={{ type: "spring", stiffness: 280, damping: 18 }}
                    >
                      <CellIcon ok={r.other} />
                    </motion.div>
                  </div>
                  <div className="px-5 py-4 flex justify-center border-l border-slate-200">
                    <motion.div
                      whileHover={{ scale: 1.08 }}
                      transition={{ type: "spring", stiffness: 280, damping: 18 }}
                    >
                      <CellIcon ok={r.doel} />
                    </motion.div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

