'use client';

import type { ReactNode } from "react";
import { motion } from "framer-motion";

interface ScrollRevealSectionProps {
  children: ReactNode;
  className?: string;
}

const ScrollRevealSection = ({
  children,
  className = "",
}: ScrollRevealSectionProps) => {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
};

export default ScrollRevealSection;

