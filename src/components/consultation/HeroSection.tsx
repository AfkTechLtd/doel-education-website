import Image from "next/image";
import Link from "next/link";

export default function HeroSection() {
  return (
    <section className="relative min-h-[88vh] flex items-center overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <Image
          src="/study/hero-campus.png"
          alt="University campus"
          fill
          priority
          className="object-cover"
        />
        {/* Primary overlay — same as study-in-us */}
        <div className="absolute inset-0 bg-primary/65" />
      </div>

      {/* Content */}
      <div className="relative max-w-8xl mx-auto  py-24 text-white">
        <span className="inline-block text-secondary tracking-widest text-sm font-bold uppercase mb-5">
          Free Consultation
        </span>
        <h1 className="text-5xl md:text-6xl font-bold leading-tight max-w-3xl">
          Talk to an Advisor,{" "}
          <span className="text-secondary">Free of Charge</span>
        </h1>
        <p className="mt-6 text-lg max-w-xl text-white/85 font-semibold">
          Get a straight answer on which US universities fit your profile,
          budget, and timeline — in a single 30-minute session.
        </p>
      </div>
    </section>
  );
}
