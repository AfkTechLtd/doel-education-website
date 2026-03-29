"use client";

import { motion } from "framer-motion";
import HeroSection, {
  HeroContent,
  HeroSubTitle,
  HeroTitle,
  HeroTopTitle,
} from "@/components/common/HeroSection";
import { fadeInUp, staggerContainer } from "./motion";

export default function ContactHero() {
  return (
    <HeroSection align="left" minHeightClassName="min-h-[56vh]" imageAlt="Contact hero">
      <motion.div
        initial="hidden"
        animate="visible"
        variants={staggerContainer}
        className="relative z-10"
      >
        <motion.div variants={fadeInUp}>
          <HeroTopTitle className="mb-4">Contact Us</HeroTopTitle>
        </motion.div>

        <HeroContent>
          <motion.div variants={fadeInUp}>
            <HeroTitle className="max-w-3xl md:text-6xl">
              Let&apos;s Start Your
              <br />
              <span className="text-secondary">Journey.</span>
            </HeroTitle>
          </motion.div>

          <motion.div variants={fadeInUp}>
            <HeroSubTitle className="max-w-2xl text-base md:text-lg text-white/85">
              Whether you have a question about universities, visas, or next
              steps, our team in Dhaka is ready to guide you.
            </HeroSubTitle>
          </motion.div>
        </HeroContent>
      </motion.div>
    </HeroSection>
  );
}
