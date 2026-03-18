"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const universities = [
  {
    name: "University of Oxford",
    location: "Oxford, UK",
    logoText: "Ox",
    color: "#002147",
  },
  { name: "MIT", location: "Cambridge, MA", logoText: "MIT", color: "#A31F34" },
  {
    name: "Stanford University",
    location: "Stanford, CA",
    logoText: "SU",
    color: "#8C1515",
  },
  {
    name: "University of Melbourne",
    location: "Melbourne, AU",
    logoText: "UoM",
    color: "#003087",
  },
  {
    name: "TU Munich",
    location: "Munich, Germany",
    logoText: "TUM",
    color: "#0065BD",
  },
  {
    name: "ETH Zurich",
    location: "Zurich, Switzerland",
    logoText: "ETH",
    color: "#1a1a1a",
  },
  {
    name: "Harvard University",
    location: "Cambridge, MA",
    logoText: "HU",
    color: "#A51C30",
  },
  {
    name: "Yale University",
    location: "New Haven, CT",
    logoText: "Yale",
    color: "#00356B",
  },
  {
    name: "Columbia University",
    location: "New York, NY",
    logoText: "CU",
    color: "#003087",
  },
  {
    name: "UCLA",
    location: "Los Angeles, CA",
    logoText: "UCLA",
    color: "#2D68C4",
  },
];

const scrollList = [...universities, ...universities, ...universities];

const stats = [
  { value: "50+", label: "Partner Universities" },
  { value: "15+", label: "Countries Covered" },
  { value: "10K+", label: "Students Placed" },
];

const Partners = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section className="relative bg-primary overflow-hidden my-16 py-32">
      {/* ── Background texture dots ── */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage:
            "radial-gradient(circle, white 1px, transparent 1px)",
          backgroundSize: "28px 28px",
        }}
      />

      {/* ── Top-right glow ── */}
      <div className="pointer-events-none absolute -top-32 -right-32 w-[420px] h-[420px] rounded-full bg-white/5 blur-3xl" />
      {/* ── Bottom-left glow ── */}
      <div className="pointer-events-none absolute -bottom-24 -left-24 w-[320px] h-[320px] rounded-full bg-secondary/10 blur-3xl" />

      {/* ── Header ── */}
      <div
        ref={ref}
        className="relative z-10 flex flex-col items-center text-center gap-3 mb-14 px-4"
      >
        <motion.div
          className="flex items-center gap-3"
          initial={{ opacity: 0, y: 10 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.45 }}
        >
          <span className="h-px w-8 bg-secondary/70 block" />
          <span className="text-xs font-semibold uppercase tracking-[0.25em] text-white/60 font-inter">
            Our Partners
          </span>
          <span className="h-px w-8 bg-secondary/70 block" />
        </motion.div>

        <motion.h2
          className="font-poppins text-3xl sm:text-4xl font-bold tracking-tight text-white"
          initial={{ opacity: 0, y: 18 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          Partnered with the World&apos;s{" "}
          <span className="relative inline-block text-secondary">
            Top Universities
            <motion.span
              className="absolute -bottom-1 left-0 h-[2.5px] bg-secondary/50 rounded-full"
              style={{ width: "100%", originX: 0 }}
              initial={{ scaleX: 0 }}
              animate={inView ? { scaleX: 1 } : {}}
              transition={{ duration: 0.5, delay: 0.5 }}
            />
          </span>
        </motion.h2>

        <motion.p
          className="text-white/50 font-inter text-sm sm:text-base max-w-md"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.45, delay: 0.2 }}
        >
          Active partnerships with 50+ universities across the US, UK, Europe,
          and Australia — all working to get you there.
        </motion.p>
      </div>

      {/* ── Scrolling carousel ── */}
      <div className="relative w-full overflow-hidden">
        {/* Fade masks — blend into primary */}
        <div
          className="pointer-events-none absolute inset-y-0 left-0 w-24 sm:w-48 z-10"
          style={{
            background:
              "linear-gradient(to right, var(--color-primary, #1a6b3c), transparent)",
          }}
        />
        <div
          className="pointer-events-none absolute inset-y-0 right-0 w-24 sm:w-48 z-10"
          style={{
            background:
              "linear-gradient(to left, var(--color-primary, #1a6b3c), transparent)",
          }}
        />

        {/* Track */}
        <div className="flex items-center gap-4 animate-infinite-scroll py-3">
          {scrollList.map((uni, i) => (
            <div
              key={i}
              className="flex items-center gap-3.5 shrink-0 px-4 py-3.5 rounded-2xl min-w-[220px] transition-all duration-200 hover:-translate-y-0.5"
              style={{
                background: "rgba(255,255,255,0.07)",
                border: "1px solid rgba(255,255,255,0.12)",
                backdropFilter: "blur(8px)",
              }}
            >
              {/* Logo mark */}
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center font-black text-[10px] shrink-0 font-poppins text-white"
                style={{ backgroundColor: uni.color }}
              >
                {uni.logoText}
              </div>

              <div>
                <p className="text-sm font-semibold text-white font-poppins whitespace-nowrap leading-tight">
                  {uni.name}
                </p>
                <p className="text-[11px] text-white/45 font-inter mt-0.5">
                  {uni.location}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── Stats strip ── */}
      <motion.div
        className="relative z-10 mt-14 flex flex-wrap justify-center gap-0 divide-x divide-white/10 px-4"
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5, delay: 0.35 }}
      >
        {stats.map(({ value, label }) => (
          <div key={label} className="text-center px-10 sm:px-16 py-2">
            <p className="text-3xl font-bold text-secondary font-poppins leading-none">
              {value}
            </p>
            <p className="text-xs text-white/45 font-inter mt-1.5 uppercase tracking-wider">
              {label}
            </p>
          </div>
        ))}
      </motion.div>
    </section>
  );
};

export default Partners;
