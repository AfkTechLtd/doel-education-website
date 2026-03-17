"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode } from "swiper/modules";
import "swiper/css";
import { Play } from "lucide-react";

// ── Data — replace with real Shorts URLs ─────────────────────────────────────
const testimonials = [
  {
    id: 1,
    shortsUrl: "https://youtube.com/shorts/jVmyKXf14Z8?si=bm7fjZucDPbNunbF",
    caption: "From Dhaka to",
    highlight: "Harvard",
    name: "Nadia Rahman",
    tag: "MS Computer Science",
  },
  {
    id: 2,
    shortsUrl: "https://youtube.com/shorts/EflPbxaKhA0?si=2-09BQox2uGZZRSJ",
    caption: "Got my",
    highlight: "F-1 Visa",
    name: "Tanvir Ahmed",
    tag: "MBA · Fall 2024",
  },
  {
    id: 3,
    shortsUrl: "https://youtube.com/shorts/dYmX0TqNT7A?si=Ae7ORN-f7KgraK3i",
    caption: "Fully funded at",
    highlight: "UC Berkeley",
    name: "Sumaiya Akter",
    tag: "PhD · 2024",
  },
  {
    id: 4,
    shortsUrl: "https://youtube.com/shorts/WIUXJw2q7YE?si=AvTBCAoi6oiv3xqA",
    caption: "Best decision —",
    highlight: "NYU",
    name: "Rifat Hossain",
    tag: "BS Economics · 2023",
  },
];

function extractId(shortsUrl: string): string {
  return shortsUrl.split("/shorts/")[1]?.split("?")[0] ?? "";
}

// ── Single card ───────────────────────────────────────────────────────────────
function TestimonialCard({
  t,
  index,
}: {
  t: (typeof testimonials)[0];
  index: number;
}) {
  const [playing, setPlaying] = useState(false);
  const id = extractId(t.shortsUrl);

  const previewSrc = `https://www.youtube.com/embed/${id}?rel=0&controls=0&modestbranding=1&playsinline=1&mute=1`;
  const playSrc = `https://www.youtube.com/embed/${id}?autoplay=1&rel=0&playsinline=1`;

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{
        duration: 0.5,
        delay: index * 0.1,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="group w-full"
    >
      {/* Portrait shell — 9:16 */}
      <div
        className="relative w-full overflow-hidden rounded-2xl shadow-xl border border-slate-100"
        style={{ aspectRatio: "9/16" }}
      >
        {/* iframe — switches src on play */}
        <iframe
          key={playing ? "play" : "preview"}
          className="absolute inset-0 w-full h-full scale-[1.02]"
          src={playing ? playSrc : previewSrc}
          title={t.name}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          loading="lazy"
        />

        {/* Overlays — hidden once playing */}
        {!playing && (
          <>
            {/* Click capture + gradient overlays */}
            <div
              className="absolute inset-0 z-10 cursor-pointer"
              onClick={() => setPlaying(true)}
            />
            <div className="absolute inset-x-0 top-0 h-16 bg-gradient-to-b from-black/35 to-transparent z-10 pointer-events-none" />
            <div className="absolute inset-x-0 bottom-0 h-2/5 bg-gradient-to-t from-black/80 to-transparent z-10 pointer-events-none" />

            {/* Brand badge */}
            <div className="absolute top-3 left-3 z-20 flex items-center gap-1.5 pointer-events-none">
              <span className="w-4 h-4 rounded-full bg-primary flex items-center justify-center ring-1 ring-white/30">
                <span className="w-1.5 h-1.5 rounded-full bg-secondary" />
              </span>
              <span className="text-[9px] font-semibold text-white/80 font-inter">
                SHEC
              </span>
            </div>

            {/* Play button */}
            <div className="absolute inset-0 z-20 flex items-center justify-center pointer-events-none">
              <motion.div
                className="w-12 h-12 rounded-full bg-white/20 backdrop-blur border border-white/40 flex items-center justify-center shadow-lg"
                whileHover={{ scale: 1.14 }}
                transition={{ type: "spring", stiffness: 300, damping: 18 }}
              >
                <Play size={17} className="text-white fill-white ml-0.5" />
              </motion.div>
            </div>

            {/* Caption */}
            <div className="absolute bottom-0 inset-x-0 px-3 pb-4 z-20 pointer-events-none">
              <p className="text-white font-poppins font-bold text-[12px] leading-snug">
                {t.caption}{" "}
                <span className="text-secondary">{t.highlight}</span>
              </p>
              <p className="text-white/50 font-inter text-[10px] mt-0.5">
                {t.tag}
              </p>
            </div>
          </>
        )}
      </div>

      {/* Name */}
      <p className="mt-2.5 px-0.5 text-sm font-semibold font-poppins text-slate-800 group-hover:text-primary transition-colors duration-200">
        {t.name}
      </p>
      <p className="px-0.5 text-xs text-slate-400 font-inter">{t.tag}</p>
    </motion.div>
  );
}

// ── Section ───────────────────────────────────────────────────────────────────
const VideoTestimonials = () => {
  const headingRef = useRef(null);
  const inView = useInView(headingRef, { once: true, margin: "-80px" });

  return (
    <section className="py-20 overflow-hidden">
      {/* Header */}
      <div ref={headingRef} className="text-center mb-14">
        <motion.div
          className="flex items-center justify-center gap-3 mb-4"
          initial={{ opacity: 0, y: 10 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.45 }}
        >
          <span className="h-px w-8 bg-secondary block" />
          <span className="text-xs font-semibold uppercase tracking-[0.25em] font-inter text-primary">
            Student Stories
          </span>
          <span className="h-px w-8 bg-secondary block" />
        </motion.div>

        <motion.h2
          className="font-poppins text-3xl sm:text-4xl font-bold tracking-tight text-slate-900"
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          Explore the{" "}
          <span className="text-primary relative inline-block">
            Opportunities
            <motion.span
              className="absolute -bottom-1 left-0 h-[2.5px] bg-secondary rounded-full"
              style={{ width: "100%", originX: 0 }}
              initial={{ scaleX: 0 }}
              animate={inView ? { scaleX: 1 } : {}}
              transition={{ duration: 0.5, delay: 0.45 }}
            />
          </span>
        </motion.h2>

        <motion.p
          className="mt-3 text-sm text-slate-400 font-inter"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.4, delay: 0.2 }}
        >
          Hear directly from students who made it.
        </motion.p>
      </div>

      {/* ── Mobile: Swiper ── */}
      <div className="block lg:hidden px-4">
        <Swiper
          modules={[FreeMode]}
          freeMode
          slidesPerView={1.6}
          spaceBetween={16}
          breakpoints={{
            480: { slidesPerView: 2.2 },
            640: { slidesPerView: 2.6 },
          }}
          className="!overflow-visible"
        >
          {testimonials.map((t, i) => (
            <SwiperSlide key={t.id} className="!h-auto">
              <TestimonialCard t={t} index={i} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* ── Desktop: static grid ── */}
      <div className="hidden lg:grid grid-cols-4 gap-5 px-0">
        {testimonials.map((t, i) => (
          <TestimonialCard key={t.id} t={t} index={i} />
        ))}
      </div>
    </section>
  );
};

export default VideoTestimonials;
