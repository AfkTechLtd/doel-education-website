import { Quote } from "lucide-react";

const testimonials = [
  {
    name: "Tasnim Akter",
    intake: "Fall 2024 — University of Texas",
    text: "I came in with zero idea where to start. In 30 minutes my advisor laid out exactly which schools fit my GPA and budget. That one session saved me months of confusion.",
    initials: "TA",
  },
  {
    name: "Rafiul Hasan",
    intake: "Spring 2025 — Arizona State University",
    text: "I was scared the process was too complicated. The consultant broke it down step by step. Honest, no pressure — just real guidance. I applied to 3 schools and got into 2.",
    initials: "RH",
  },
];

function TestimonialCard({ name, intake, text, initials }: (typeof testimonials)[0]) {
  return (
    <div className="group bg-white border border-slate-200 rounded-2xl p-8 flex flex-col gap-5 transition-all duration-200 hover:-translate-y-1 hover:shadow-md">
      <Quote className="w-8 h-8 text-primary/25 transition-colors duration-200 group-hover:text-primary/50" strokeWidth={1.5} />
      <p className="text-slate-700 font-inter leading-relaxed text-[15px]">{text}</p>
      <div className="flex items-center gap-3 mt-auto pt-4 border-t border-slate-100">
        <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-white text-sm font-semibold font-inter shrink-0">
          {initials}
        </div>
        <div>
          <p className="text-sm font-semibold text-slate-900 font-inter">{name}</p>
          <p className="text-xs text-slate-400 font-inter">{intake}</p>
        </div>
      </div>
    </div>
  );
}

export default function Testimonials() {
  return (
    <section className="bg-slate-50 border-y border-slate-100">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="text-center mb-12">
          <span className="text-xs font-semibold tracking-widest uppercase text-primary font-inter">Student stories</span>
          <h2 className="mt-2 text-3xl font-bold text-slate-900 font-poppins">What students say about their session</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {testimonials.map((t) => <TestimonialCard key={t.name} {...t} />)}
        </div>
      </div>
    </section>
  );
}
