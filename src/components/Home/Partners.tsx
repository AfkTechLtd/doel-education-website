"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Image from "next/image";

const universities = [
  {
    name: "Harvard University",
    location: "Cambridge, MA",
    logo: "/home/unis/harvard.svg",
  },
  {
    name: "MIT",
    location: "Cambridge, MA",
    logo: "/home/unis/mit.svg",
  },
  {
    name: "Stanford University",
    location: "Stanford, CA",
    logo: "/home/unis/stanford.svg",
  },
  {
    name: "Yale University",
    location: "New Haven, CT",
    logo: "/home/unis/yale.svg",
  },
  {
    name: "Columbia University",
    location: "New York, NY",
    logo: "/home/unis/columbia.svg",
  },
  {
    name: "UCLA",
    location: "Los Angeles, CA",
    logo: "/home/unis/ucla.svg",
  },
  {
    name: "New York University",
    location: "New York, NY",
    logo: "/home/unis/nyu.svg",
  },
  {
    name: "Univ. of Michigan",
    location: "Ann Arbor, MI",
    logo: "/home/unis/umich.svg",
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
    <section className="relative bg-primary overflow-hidden py-16 sm:py-20 lg:py-24">
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
          and Australia all working to get you there.
        </motion.p>
      </div>

      {/* ── Scrolling carousel ── */}
      <div className="relative w-full overflow-hidden">
        {/* Fade masks  blend into primary */}
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
        <div className="flex items-stretch gap-4 animate-infinite-scroll py-3">
          {scrollList.map((uni, i) => (
            <div
              key={i}
              className="group shrink-0 flex flex-col items-center justify-between gap-3 w-[188px] px-5 pt-5 pb-4 rounded-2xl bg-white border border-white/10 shadow-md shadow-black/20 cursor-default transition-all duration-250 hover:-translate-y-1.5 hover:shadow-xl hover:shadow-black/30"
            >
              {/* Logo area */}
              <div className="w-full flex items-center justify-center h-[52px]">
                <Image
                  src={uni.logo}
                  alt={uni.name}
                  width={140}
                  height={52}
                  className="w-auto max-w-[140px] h-full object-contain transition-opacity duration-200 group-hover:opacity-90"
                  unoptimized
                />
              </div>

              {/* Divider */}
              <div className="w-full h-px bg-gray-100" />

              {/* Text */}
              <div className="w-full text-center">
                <p className="text-[12px] font-semibold text-gray-800 font-poppins leading-snug">
                  {uni.name}
                </p>
                <p className="text-[10px] text-gray-400 font-inter mt-0.5">
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
          <div key={label} className="text-center px-4 sm:px-8 lg:px-12 py-2">
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
