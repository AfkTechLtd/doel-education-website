"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

const faqs = [
  {
    q: "Is the consultation really free?",
    a: "Yes  100% free, no strings attached. We believe every student deserves honest guidance before committing to anything.",
  },
  {
    q: "Who will I be speaking with?",
    a: "You'll be paired with a senior Doel Education advisor who has direct experience placing students in US universities.",
  },
  {
    q: "What if I'm not ready to apply yet?",
    a: "That's perfectly fine. Many students book a session 1–2 years before their intended intake just to plan ahead. We'll help you build a timeline.",
  },
  {
    q: "How long is the session?",
    a: "Each consultation is 30 minutes. If you need a follow-up, we can schedule an extended session.",
  },
  {
    q: "Do I need to prepare anything beforehand?",
    a: "No preparation required. Just bring your questions. It helps to roughly know your target country, but even that isn't necessary.",
  },
];

function FAQItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);

  return (
    <li className="border-b border-gray-100 last:border-0">
      <button
        onClick={() => setOpen((v) => !v)}
        className="w-full flex items-center justify-between gap-4 py-5 text-left group"
        aria-expanded={open}
      >
        <span className="font-semibold text-gray-900 group-hover:text-primary transition-colors duration-150">
          {q}
        </span>
        <ChevronDown
          className={`w-4 h-4 text-gray-400 shrink-0 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
          strokeWidth={2}
        />
      </button>
      <div
        style={{ maxHeight: open ? "200px" : "0px" }}
        className="overflow-hidden transition-[max-height] duration-300 ease-in-out"
      >
        <p className="pb-5 text-sm text-gray-500 leading-relaxed">{a}</p>
      </div>
    </li>
  );
}

export default function FAQStrip() {
  return (
    <section className="py-10 space-y-6 pt-14 pb-4">
      <div>
        <span className="text-secondary tracking-widest text-sm font-bold uppercase">
          FAQ
        </span>
        <h2 className="mt-3 text-4xl font-semibold font-inter text-slate-900">
          Common questions
        </h2>
      </div>
      <ul className="bg-white border border-gray-200 shadow-lg rounded-2xl px-6">
        {faqs.map((faq) => (
          <FAQItem key={faq.q} {...faq} />
        ))}
      </ul>
    </section>
  );
}
