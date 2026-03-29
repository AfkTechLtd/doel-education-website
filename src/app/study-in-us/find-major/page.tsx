"use client";

import { motion } from "framer-motion";
import PopularMajors from "@/components/StudyPopularMajorsSection";
import CourseBrowser from "@/components/StudyUSFilteredSection";
import HeroSection, {
  HeroContent,
  HeroCTAs,
  HeroSubTitle,
  HeroTitle,
  HeroTopTitle,
} from "@/components/common/HeroSection";
import PrimaryButton from "@/components/common/PrimaryButton";
import OutlineButton from "@/components/common/OutlineButton";

const easeOut = [0.22, 1, 0.36, 1] as const;

/** Opacity-only motion avoids translateY paint overflow that can flash scrollbars on load. */
const fadeInUp = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.55, ease: easeOut },
  },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.12 },
  },
};

/** Scroll-in reveal for sections below the hero (no y — same scrollbar fix). */
const sectionReveal = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.5, ease: easeOut },
  },
};

const sectionRevealDelayed = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.5, ease: easeOut, delay: 0.08 },
  },
};

const viewportOpts = {
  once: true as const,
  margin: "-72px 0px" as const,
  amount: 0.12 as const,
};

export default function FindMajorPage() {
  return (
    <main className="bg-white overflow-x-hidden">
      {/* ── HERO ── */}
      <HeroSection
        align="left"
        imageSrc="/study/hero-campus.png"
        imageAlt="Students exploring majors"
        minHeightClassName="min-h-[70vh]"
      >
        <motion.div
          className="relative py-24 text-white"
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
        >
          <motion.div variants={fadeInUp} className="mb-5">
            <HeroTopTitle>Explore Majors &amp; Courses</HeroTopTitle>
          </motion.div>

          <HeroContent>
            <motion.div variants={fadeInUp}>
              <HeroTitle className="text-3xl sm:text-4xl lg:text-5xl">
                Find the Right Major
                <span className="text-secondary"> for Your Future.</span>
              </HeroTitle>
            </motion.div>

            <motion.div variants={fadeInUp}>
              <HeroSubTitle>
                Browse hundreds of programs across top US universities. Filter
                by field, degree level, and more to discover the perfect fit for
                your goals.
              </HeroSubTitle>
            </motion.div>

            <motion.div variants={fadeInUp}>
              <HeroCTAs className="mt-8">
                <PrimaryButton href="/consultation">
                  Get Free Guidance
                </PrimaryButton>
                <OutlineButton href="/study-in-us">
                  Everything About US
                </OutlineButton>
              </HeroCTAs>
            </motion.div>
          </HeroContent>
        </motion.div>
      </HeroSection>

      {/* ── COURSE BROWSER ── */}
      <motion.div
        variants={sectionReveal}
        initial="hidden"
        whileInView="visible"
        viewport={viewportOpts}
      >
        <CourseBrowser />
      </motion.div>

      {/* ── POPULAR MAJORS ── */}
      <motion.div
        variants={sectionRevealDelayed}
        initial="hidden"
        whileInView="visible"
        viewport={viewportOpts}
      >
        <PopularMajors />
      </motion.div>
    </main>
  );
}
