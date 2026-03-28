"use client";

import { motion } from "framer-motion";
import HeroSection, {
  HeroContent,
  HeroSubTitle,
  HeroTitle,
  HeroTopTitle,
} from "@/components/common/HeroSection";
import { fadeInUp, staggerContainer } from "@/components/qna/qnaAnimations";

export default function QnaHero() {
  return (
    <HeroSection minHeightClassName="min-h-[62vh]" imageAlt="Q&A hero">
      <motion.div
        initial="hidden"
        animate="visible"
        variants={staggerContainer}
        className="relative z-10"
      >
        <motion.div variants={fadeInUp}>
          <HeroTopTitle className="mb-4">Q&amp;A</HeroTopTitle>
        </motion.div>

        <HeroContent>
          <motion.div variants={fadeInUp}>
            <HeroTitle className="max-w-4xl md:text-6xl">
              Questions Students Ask Us Every Day
            </HeroTitle>
          </motion.div>
          <motion.div variants={fadeInUp}>
            <HeroSubTitle className="max-w-2xl text-base text-white/85 md:text-lg">
              Honest answers about admissions, visas, scholarships, and career
              outcomes so you can plan your journey with confidence.
            </HeroSubTitle>
          </motion.div>
        </HeroContent>
      </motion.div>
    </HeroSection>
  );
}
