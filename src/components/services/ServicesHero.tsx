"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import ScrollRevealSection from "@/components/common/ScrollRevealSection";

export default function ServicesHero() {
  return (
    <section className="bg-[radial-gradient(circle_at_top_right,_#f0f9ff_0%,_transparent_55%)] pb-16  md:pb-24 pt-10 ">
      <div className="mx-auto max-w-7xl px-4 md:px-6">
        <ScrollRevealSection>
          <div className="relative overflow-hidden rounded-[2rem] border border-slate-800/60 bg-gradient-to-br from-slate-950 via-[#0d2d2b] to-primary px-7 py-12 shadow-2xl md:px-12 md:py-16">
            <div className="absolute -right-28 -top-28 h-64 w-64 rounded-full bg-secondary/20 blur-3xl" />
            <div className="absolute -bottom-24 -left-20 h-56 w-56 rounded-full bg-white/10 blur-3xl" />

            <div className="relative z-10">
              <p className="mb-4 font-inter text-xs font-semibold uppercase tracking-[0.22em] text-secondary">
                Services
              </p>
              <h1 className="max-w-4xl font-poppins text-4xl font-bold leading-tight text-white md:text-6xl">
                We&apos;re with you every step of the way.
              </h1>
              <p className="mt-5 max-w-2xl font-inter text-base leading-relaxed text-white/80 md:text-lg">
                Most agencies stop at the visa. We&apos;re just getting started.
              </p>

              <div className="mt-8 flex flex-wrap gap-4">
                <Link
                  href="/consultation"
                  style={{
                    backgroundColor: "var(--color-secondary,#f5c842)",
                    color: "#1a1a1a",
                  }}
                  className="inline-flex items-center gap-2 rounded-xl  px-6 py-3 font-inter text-sm font-semibold  transition-opacity hover:opacity-90"
                >
                  Book Free Consultation
                  <ArrowRight size={16} />
                </Link>
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 rounded-xl border border-white/30 px-6 py-3 font-inter text-sm font-semibold text-white transition-colors hover:bg-white/10"
                >
                  Talk to an Advisor
                </Link>
              </div>
            </div>
          </div>
        </ScrollRevealSection>
      </div>
    </section>
  );
}
