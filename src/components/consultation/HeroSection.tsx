"use client";


export default function HeroSection() {
  return (
    <section className="bg-primary text-white">
      <div className="max-w-7xl mx-auto px-6 py-20 flex flex-col items-center text-center gap-6">
        <h1 className="text-4xl sm:text-5xl font-bold font-poppins leading-tight max-w-2xl">
          Book Your Free
          <span className="block text-secondary">30-Minute Consultation</span>
        </h1>

        <p className="text-white/80 font-inter text-lg max-w-xl leading-relaxed">
          Speak directly with a Doel Education advisor. Get a clear, honest plan
          for studying in the US — tailored to your goals and budget.
        </p>
      </div>
    </section>
  );
}
