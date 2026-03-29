"use client";

import { easeInOut, motion } from "framer-motion";
import HeroSection, {
  HeroContent,
  HeroSubTitle,
  HeroTitle,
  HeroTopTitle,
} from "@/components/common/HeroSection";

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: easeInOut } },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.14 },
  },
};

export default function BlogHero() {
  return (
    <HeroSection
      align="left"
      minHeightClassName="min-h-[56vh]"
      imageAlt="Blog hero"
    >
      <motion.div
        initial="hidden"
        animate="visible"
        variants={staggerContainer}
        className="relative z-10"
      >
        <motion.div variants={fadeInUp}>
          <HeroTopTitle className="mb-4">Blog & Resources</HeroTopTitle>
        </motion.div>

        <HeroContent>
          <motion.div variants={fadeInUp}>
            <HeroTitle className="max-w-4xl md:text-6xl">
              Answers for the questions students actually struggle with
            </HeroTitle>
          </motion.div>
          <motion.div variants={fadeInUp}>
            <HeroSubTitle className="max-w-2xl text-base md:text-lg text-white/85">
              From SOP writing and visa interviews to scholarships and
              university shortlisting, this page is built to help you find the
              right guidance faster.
            </HeroSubTitle>
          </motion.div>
        </HeroContent>
      </motion.div>
    </HeroSection>
  );
}
