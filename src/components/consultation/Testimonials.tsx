const testimonials = [
  {
    name: "Tasnim Akter",
    intake: "Fall 2024  University of Texas",
    text: "I came in with zero idea where to start. In 30 minutes my advisor laid out exactly which schools fit my GPA and budget. That one session saved me months of confusion.",
    initials: "TA",
  },
  {
    name: "Rafiul Hasan",
    intake: "Spring 2025  Arizona State University",
    text: "I was scared the process was too complicated. The consultant broke it down step by step. Honest, no pressure  just real guidance. I applied to 3 schools and got into 2.",
    initials: "RH",
  },
];

function TestimonialCard({
  name,
  intake,
  text,
  initials,
}: (typeof testimonials)[0]) {
  return (
    <div className="flex flex-col gap-5 p-6 rounded-lg shadow-lg border border-gray-200 bg-white">
      <p className="text-gray-600 text-lg leading-relaxed">
        &ldquo;{text}&rdquo;
      </p>
      <div className="flex items-center gap-3 pt-4 border-t border-gray-100">
        <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-white text-sm font-semibold shrink-0">
          {initials}
        </div>
        <div>
          <p className="text-sm font-semibold text-slate-900">{name}</p>
          <p className="text-xs text-gray-400">{intake}</p>
        </div>
      </div>
    </div>
  );
}

export default function Testimonials() {
  return (
    <section className="space-y-6 py-10 pt-14 pb-4">
      <div>
        <span className="text-secondary tracking-widest text-sm font-bold uppercase">
          Student stories
        </span>
        <h2 className="mt-3 text-4xl font-semibold font-inter text-slate-900">
          What students say
        </h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {testimonials.map((t) => (
          <TestimonialCard key={t.name} {...t} />
        ))}
      </div>
    </section>
  );
}
