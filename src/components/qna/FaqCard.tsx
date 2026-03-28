"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import type { FaqItem } from "@/components/qna/qnaData";

type FaqCardProps = {
  item: FaqItem;
  isOpen: boolean;
  onToggle: () => void;
};

export default function FaqCard({ item, isOpen, onToggle }: FaqCardProps) {
  return (
    <article className="rounded-3xl border border-slate-100 bg-white p-5 shadow-sm md:p-6">
      <button
        type="button"
        onClick={onToggle}
        className="flex w-full cursor-pointer items-start justify-between gap-4 text-left"
        aria-expanded={isOpen}
      >
        <div className="flex items-start gap-3 md:gap-4">
          <span className="mt-0.5 inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-primary/10 font-inter text-[11px] font-bold text-primary">
            {item.id}
          </span>
          <h2
            className={`font-poppins text-base font-semibold text-slate-900 ${
              isOpen
                ? ""
                : "overflow-hidden [display:-webkit-box] [-webkit-box-orient:vertical] [-webkit-line-clamp:2]"
            }`}
          >
            {item.question}
          </h2>
        </div>
        <ChevronDown
          className={`mt-0.5 shrink-0 text-primary transition-transform duration-300 ${
            isOpen ? "rotate-180" : "rotate-0"
          }`}
        />
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <p className="ml-10 mt-4 border-l border-slate-100 pl-4 font-inter text-sm leading-relaxed text-slate-600">
              {item.answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </article>
  );
}
