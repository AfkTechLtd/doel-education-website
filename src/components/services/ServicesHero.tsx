"use client";

import { ArrowRight } from "lucide-react";
import { easeInOut, motion } from "framer-motion";
import HeroSection, {
  HeroContent,
  HeroCTAs,
  HeroSubTitle,
  HeroTitle,
  HeroTopTitle,
} from "@/components/common/HeroSection";
import PrimaryButton from "@/components/common/PrimaryButton";
import OutlineButton from "@/components/common/OutlineButton";

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

export default function ServicesHero() {
  return (
    <HeroSection imageAlt="Services hero" minHeightClassName="min-h-[56vh]">
      <motion.div
        initial="hidden"
        animate="visible"
        variants={staggerContainer}
        className="relative z-10"
      >
        <motion.div variants={fadeInUp}>
          <HeroTopTitle className="mb-4">Services</HeroTopTitle>
        </motion.div>

        <HeroContent>
          <motion.div variants={fadeInUp}>
            <HeroTitle className="max-w-4xl">
              We&apos;re with you every step of the way.
            </HeroTitle>
          </motion.div>
          <motion.div variants={fadeInUp}>
            <HeroSubTitle className="max-w-2xl text-lg text-white/85">
              Most agencies stop at the visa. We&apos;re just getting started.
            </HeroSubTitle>
          </motion.div>
        </HeroContent>

        <motion.div variants={fadeInUp} className="mt-8">
          <HeroCTAs>
            <PrimaryButton
              href="/consultation"
              rightIcon={<ArrowRight size={16} />}
            >
              Book Free Consultation
            </PrimaryButton>
            <OutlineButton href="/contact">Talk to an Advisor</OutlineButton>
          </HeroCTAs>
        </motion.div>
      </motion.div>
    </HeroSection>
  );
}
