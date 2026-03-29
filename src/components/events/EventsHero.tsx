"use client";

import { easeInOut, motion } from "framer-motion";
import {
  HeroContent,
  HeroSubTitle,
  HeroTitle,
  HeroTopTitle,
} from "@/components/common/HeroSection";
import HeroSection from "@/components/common/HeroSection";

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: easeInOut } },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15 },
  },
};

export default function EventsHero() {
  return (
    <HeroSection
      imageSrc="/study/hero-campus.png"
      imageAlt="Events and webinar hero"
      minHeightClassName="min-h-[56vh]"
    >
      <motion.div
        initial="hidden"
        animate="visible"
        variants={staggerContainer}
        className="relative z-10"
      >
        <motion.div variants={fadeInUp}>
          <HeroTopTitle className="mb-4">Events & Webinars</HeroTopTitle>
        </motion.div>

        <HeroContent>
          <motion.div variants={fadeInUp}>
            <HeroTitle>
              Events, <span className="text-secondary">Webinars</span> & Visa
              Briefings
            </HeroTitle>
          </motion.div>
          <motion.div variants={fadeInUp}>
            <HeroSubTitle className="text-lg text-white/85 max-w-2xl">
              Free knowledge sessions for students, parents, and applicants -
              every topic you need before you apply.
            </HeroSubTitle>
          </motion.div>
        </HeroContent>
      </motion.div>
    </HeroSection>
  );
}
