"use client";

import { motion } from "framer-motion";
import { revealScale } from "./motion";

export default function ContactMapSection() {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={revealScale}
      className="mt-10 overflow-hidden rounded-[2.8rem] border border-slate-100 bg-white shadow-sm"
    >
      <div className="h-[420px] w-full md:h-[500px]">
        <iframe
          src="https://www.google.com/maps?q=Dhanmondi%20Dhaka%201205&z=14&output=embed"
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen={true}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title="Doel Education office map"
        />
      </div>
    </motion.div>
  );
}
