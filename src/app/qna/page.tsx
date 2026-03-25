"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import ScrollRevealSection from "@/components/common/ScrollRevealSection";

const faqs = [
  {
    id: "01",
    question: "Do I need IELTS to study in the US?",
    answer:
      "Most universities require it, yes. A score of 6.0-6.5 is the standard minimum for Master's programs. Some universities accept TOEFL or PTE instead.",
  },

  {
    id: "02",
    question: "Can I work while studying?",
    answer:
      "Yes. On-campus jobs allow up to 20 hours per week from day one. After your first semester, CPT opens up paid internships directly related to your field. After graduation, OPT gives you 12 months, and STEM graduates can get up to 36 months.",
  },
  {
    id: "03",
    question: "What is an I-20 and why does it matter?",
    answer:
      "The I-20 is the document your university issues after you are admitted. Without it, you cannot apply for your F-1 student visa. DGS ensures yours is issued correctly and on time.",
  },
  {
    id: "04",
    question: "Is it possible to get a scholarship as a Bangladeshi student?",
    answer:
      "Absolutely. Merit scholarships, graduate assistantships, and need-based aid are all available to international students. The key is applying to the right universities with a strong profile. We identify every scholarship you are eligible for before you apply.",
  },
  {
    id: "05",
    question: "What if my GPA is not great?",
    answer:
      "GPA matters, but it is not the only factor. A strong SOP, relevant work experience, good test scores, and the right university strategy can compensate. We have helped students with average GPAs get into solid, ranked US programs.",
  },
  {
    id: "06",
    question: "How long does the whole process take?",
    answer:
      "From your first consultation to boarding your flight, expect 9 to 12 months for a smooth process. Rushing creates document gaps. Starting early gives you stronger university options, better scholarship opportunities, and less stress.",
  },
  {
    id: "07",
    question: "Will I get a job after graduating in the US?",
    answer:
      "With the right degree, the right university, and proper CPT experience during your studies, yes. DGS career support guides you through CPT, OPT, and work authorization so you are job-ready before graduation. Our target is employment within 6 months of completing your degree.",
  },
  {
    id: "08",
    question: "What happens if my visa gets rejected?",
    answer:
      "It happens, but rarely when preparation is thorough. If a visa is rejected, we analyze exactly why and rebuild the file. A rejection is not the end; it is a gap we fix together.",
  },
  {
    id: "09",
    question: "How much money do I need in my bank account for the visa?",
    answer:
      "You need to show enough to cover at least your first-year tuition plus living expenses. That typically means $25,000-$40,000 in a six-month bank statement. It does not have to be your money alone; a sponsor's account works too.",
  },
];

const splitIndex = Math.ceil(faqs.length / 2);
const leftFaqs = faqs.slice(0, splitIndex);
const rightFaqs = faqs.slice(splitIndex);

function FaqCard({
  item,
  isOpen,
  onToggle,
}: {
  item: (typeof faqs)[number];
  isOpen: boolean;
  onToggle: () => void;
}) {
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
            className={`font-poppins text-base font-semibold  text-slate-900  ${
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

export default function QnaPage() {
  const [openLeftId, setOpenLeftId] = useState<string | null>(null);
  const [openRightId, setOpenRightId] = useState<string | null>(null);
  const [openMobileId, setOpenMobileId] = useState<string | null>(null);

  return (
    <main className="min-h-screen overflow-x-hidden bg-[#fcfdfd]">
      <section className="bg-[radial-gradient(circle_at_top_right,_#f0f9ff_0%,_transparent_55%)] pb-16 pt-10 md:pb-24">
        <div className="mx-auto max-w-7xl px-4 md:px-6">
          <ScrollRevealSection>
            <div className="relative overflow-hidden rounded-[2rem] border border-slate-800/60 bg-gradient-to-br from-slate-950 via-[#0d2d2b] to-primary px-7 py-12 shadow-2xl md:px-12 md:py-16">
              <div className="absolute -right-28 -top-28 h-64 w-64 rounded-full bg-secondary/20 blur-3xl" />
              <div className="absolute -bottom-24 -left-20 h-56 w-56 rounded-full bg-white/10 blur-3xl" />

              <div className="relative z-10">
                <p className="mb-4 font-inter text-xs font-semibold uppercase tracking-[0.22em] text-secondary">
                  Q&A
                </p>
                <h1 className="max-w-4xl font-poppins text-4xl font-bold leading-tight text-white md:text-6xl">
                  Questions Students Ask Us Every Day
                </h1>
                <p className="mt-5 max-w-2xl font-inter text-base leading-relaxed text-white/80 md:text-lg">
                  Honest answers about admissions, visas, scholarships, and
                  career outcomes so you can plan your journey with confidence.
                </p>
              </div>
            </div>
          </ScrollRevealSection>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 pb-20 md:px-20 md:pb-24 2xl:px-6">
        <div className="space-y-4 md:hidden">
          {faqs.map((item) => (
            <FaqCard
              key={item.id}
              item={item}
              isOpen={openMobileId === item.id}
              onToggle={() =>
                setOpenMobileId((prev) => (prev === item.id ? null : item.id))
              }
            />
          ))}
        </div>

        <div className="hidden md:grid md:grid-cols-2 md:gap-5">
          <div className="space-y-4">
            {leftFaqs.map((item) => (
              <FaqCard
                key={item.id}
                item={item}
                isOpen={openLeftId === item.id}
                onToggle={() =>
                  setOpenLeftId((prev) => (prev === item.id ? null : item.id))
                }
              />
            ))}
          </div>

          <div className="space-y-4">
            {rightFaqs.map((item) => (
              <FaqCard
                key={item.id}
                item={item}
                isOpen={openRightId === item.id}
                onToggle={() =>
                  setOpenRightId((prev) => (prev === item.id ? null : item.id))
                }
              />
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
