import { GraduationCap, CheckCircle2, Globe, ArrowRight } from "lucide-react";
import PrimaryButton from "@/components/common/PrimaryButton";
import OutlineButton from "@/components/common/OutlineButton";

type University = {
  name: string;
  abbr: string;
  color: string;
};

const universities: University[] = [
  { name: "Harvard University", abbr: "H", color: "#A51C30" },
  { name: "MIT", abbr: "MIT", color: "#A31F34" },
  { name: "Stanford University", abbr: "S", color: "#8C1515" },
  { name: "Yale University", abbr: "Y", color: "#00356B" },
  { name: "Columbia University", abbr: "CU", color: "#003087" },
  { name: "NYU", abbr: "NYU", color: "#57068C" },
  { name: "UCLA", abbr: "UCLA", color: "#2774AE" },
  { name: "University of Michigan", abbr: "UM", color: "#00274C" },
];

const innerRing = universities.slice(0, 4);
const outerRing = universities.slice(4);

interface OrbitRingProps {
  items: University[];
  diameter: number;
  duration: number;
  cw?: boolean;
}

function OrbitRing({ items, diameter, duration, cw = true }: OrbitRingProps) {
  const r = diameter / 2;
  const spinIn = cw ? "orbit-cw" : "orbit-ccw";
  const spinOut = cw ? "orbit-ccw" : "orbit-cw";

  return (
    <div
      className="absolute"
      style={{
        width: diameter,
        height: diameter,
        animation: `${spinIn} ${duration}s linear infinite`,
      }}
    >
      {items.map((uni, i) => {
        const angle = (i / items.length) * 360;
        const rad = (angle * Math.PI) / 180;
        const cx = r + r * Math.sin(rad) - 56;
        const cy = r - r * Math.cos(rad) - 22;
        return (
          <div
            key={uni.name}
            className="absolute"
            style={{
              left: cx,
              top: cy,
              animation: `${spinOut} ${duration}s linear infinite`,
            }}
          >
            <div
              className="flex items-center gap-2 rounded-xl px-3 py-2 shadow-lg"
              style={{
                width: 118,
                background: "rgba(255,255,255,0.13)",
                border: "1px solid rgba(255,255,255,0.28)",
                backdropFilter: "blur(14px)",
                WebkitBackdropFilter: "blur(14px)",
              }}
            >
              <div
                className="flex-shrink-0 w-7 h-7 rounded-lg flex items-center justify-center text-white font-black"
                style={{ backgroundColor: uni.color, fontSize: "8px" }}
              >
                {uni.abbr}
              </div>
              <span className="text-[9px] font-semibold text-white leading-tight line-clamp-2">
                {uni.name}
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
}

const Hero = () => {
  return (
    <>
      <style>{`
        .stat-pill {
          background: rgba(255,255,255,0.10);
          border: 1px solid rgba(255,255,255,0.22);
          backdrop-filter: blur(10px);
          -webkit-backdrop-filter: blur(10px);
          transition: background .2s, transform .2s;
        }
        .stat-pill:hover { background: rgba(255,255,255,0.18); transform: translateY(-2px); }
      `}</style>

      {/* ── Full-viewport section ── */}
      <section className="relative w-full min-h-screen flex items-center overflow-hidden">
        {/* ── Background image ── */}
        <img
          src="/study/hero-campus.png"
          alt=""
          aria-hidden="true"
          className="absolute inset-0 w-full h-full object-cover object-center"
          style={{ zIndex: 0 }}
        />

        {/* ── Primary colour overlay ── */}
        <div
          className="absolute inset-0"
          style={{
            zIndex: 1,
            background:
              "linear-gradient(120deg, color-mix(in srgb, var(--color-primary,#1a6b3c) 90%, transparent) 0%, color-mix(in srgb, var(--color-primary,#1a6b3c) 68%, transparent) 55%, color-mix(in srgb, var(--color-primary,#1a6b3c) 48%, transparent) 100%)",
          }}
        />

        {/* ── Bottom vignette ── */}
        <div
          className="absolute inset-x-0 bottom-0 h-48 pointer-events-none"
          style={{
            zIndex: 2,
            background:
              "linear-gradient(to top, rgba(0,0,0,0.30) 0%, transparent 100%)",
          }}
        />

        {/* ── Content ── */}
        <div className="relative w-full" style={{ zIndex: 10 }}>
          {/* Use your existing container class — adjust if yours differs */}
          <div className="mx-auto max-w-7xl px-6 lg:px-12">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center py-20 md:py-0 md:min-h-screen">
              {/* LEFT */}
              <div className="space-y-8 order-2 md:order-1">
                {/* Eyebrow */}
                <div className="fu d1 flex items-center gap-3">
                  <div
                    className="flex items-center gap-2 rounded-full px-4 py-1.5"
                    style={{
                      background: "rgba(255,255,255,0.12)",
                      border: "1px solid rgba(255,255,255,0.25)",
                      backdropFilter: "blur(8px)",
                    }}
                  >
                    <span className="h-1.5 w-1.5 rounded-full bg-secondary animate-pulse" />
                    <span className="text-xs font-semibold tracking-widest uppercase font-inter text-white/90">
                      Est. 2008
                    </span>
                  </div>
                  <span className="hidden sm:block text-xs text-white/50 font-inter">
                    16 years of excellence
                  </span>
                </div>

                {/* Headline */}
                <div className="fu d2 space-y-4">
                  <h1 className="font-poppins text-4xl sm:text-5xl lg:text-6xl font-bold leading-[1.06] tracking-tight text-white drop-shadow-md max-w-2xl">
                    USA Isn&apos;t Far!
                    <br />
                    <span
                      className="sm:text-5xl text-3xl"
                      style={{ color: "var(--color-secondary,#f5c842)" }}
                    >
                      The Right Guidance
                    </span>{" "}
                    <span className="sm:text-5xl text-3xl">
                      Just Makes It Closer.
                    </span>
                  </h1>
                  <p className="max-w-xl text-sm text-white/80 font-inter leading-relaxed">
                    Every year, thousands of Bangladeshi professionals put their
                    US dream on hold, not because they aren&apos;t good enough,
                    but because they didn&apos;t know who to trust or where to
                    begin.
                  </p>
                  <p className="max-w-xl text-sm text-white/70 font-inter leading-relaxed">
                    At DGS, we&apos;ve walked this road with hundreds of
                    students just like you. We know every step, every document,
                    every question the embassy asks and we&apos;re here so you
                    never have to figure it out alone.
                  </p>
                </div>

                {/* CTAs */}
                <div className="fu d3 flex flex-col sm:flex-row gap-3">
                  <PrimaryButton
                    href="/consultation"
                    rightIcon={<ArrowRight size={16} />}
                  >
                    Book a Free Session
                  </PrimaryButton>
                  <OutlineButton href="/universities">
                    Explore Universities
                  </OutlineButton>
                </div>

                {/* Stats */}
                <div className="fu d4 flex flex-wrap gap-3">
                  {[
                    { icon: CheckCircle2, label: "98% Visa Success" },
                    { icon: GraduationCap, label: "15,000+ Students" },
                    { icon: Globe, label: "50+ Universities" },
                  ].map(({ icon: Icon, label }) => (
                    <div
                      key={label}
                      className="stat-pill flex items-center gap-2 rounded-full px-4 py-2 text-xs font-semibold text-white font-inter cursor-default"
                    >
                      <Icon
                        size={14}
                        className="text-secondary flex-shrink-0"
                      />
                      {label}
                    </div>
                  ))}
                </div>
              </div>

              {/* RIGHT — orbit */}
              <div className="fu d5 order-1 md:order-2 flex items-center justify-center md:justify-end">
                <div
                  className="relative flex items-center justify-center"
                  style={{ width: 520, height: 520 }}
                >
                  {/* Dashed orbit guides */}
                  {[340, 480].map((d) => (
                    <div
                      key={d}
                      className="absolute rounded-full"
                      style={{
                        width: d,
                        height: d,
                        border: "1px dashed rgba(255,255,255,0.18)",
                      }}
                    />
                  ))}

                  {/* Glow halo */}
                  <div
                    className="absolute rounded-full pointer-events-none"
                    style={{
                      width: 280,
                      height: 280,
                      background:
                        "radial-gradient(circle, rgba(255,255,255,0.10) 0%, transparent 70%)",
                    }}
                  />

                  <OrbitRing
                    items={innerRing}
                    diameter={340}
                    duration={22}
                    cw={false}
                  />
                  <OrbitRing
                    items={outerRing}
                    diameter={480}
                    duration={36}
                    cw={true}
                  />

                  {/* Centre photo */}
                  <div
                    className="relative w-96 h-96 -z-10 rounded-full overflow-hidden"
                    style={{
                      border: "4px solid rgba(255,255,255,0.35)",
                      boxShadow:
                        "0 0 0 10px rgba(255,255,255,0.06), 0 24px 60px rgba(0,0,0,0.45)",
                    }}
                  >
                    <img
                      src="/home/graduate.png"
                      alt="Graduate student"
                      className="w-full h-full object-cover object-top"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Hero;
