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

/**
 * Intersection settings tuned for mobile: a negative rootMargin shrinks the IO
 * root; combined with amount 0.12 on a very tall section, the reveal often
 * never reached threshold (content stayed at opacity 0). Use a slightly
 * expanded root and "some" so any real overlap counts.
 */
const sectionViewportOpts = {
  once: true as const,
  margin: "32px 0px 160px 0px" as const,
  amount: "some" as const,
};

export default function FindMajorPage() {
  return (
    <main className="bg-white overflow-x-hidden">
      {/* ── HERO ── */}
      <HeroSection
        align="left"
        imageSrc="/study/hero-campus.png"
        imageAlt="Students exploring majors"
        minHeightClassName="min-h-[60vh] sm:min-h-[65vh] lg:min-h-[70vh]"
      >
        <motion.div
          className="relative py-10 sm:py-16 md:py-20 lg:py-24 text-white w-full min-w-0"
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
        className="w-full min-w-0"
        variants={sectionReveal}
        initial="hidden"
        whileInView="visible"
        viewport={sectionViewportOpts}
      >
        <CourseBrowser />
      </motion.div>

      {/* ── POPULAR MAJORS ── */}
      <motion.div
        className="w-full min-w-0"
        variants={sectionRevealDelayed}
        initial="hidden"
        whileInView="visible"
        viewport={sectionViewportOpts}
      >
        <PopularMajors />
      </motion.div>
    </main>
  );
}
