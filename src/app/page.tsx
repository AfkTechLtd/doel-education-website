import Hero from "@/components/Home/Hero";
import HomeAbout from "@/components/Home/HomeAbout";
import StatsCounter from "@/components/Home/StatsCounter";
import Partners from "@/components/Home/Partners";
import Support from "@/components/Home/Support";
import VisaSupport from "@/components/Home/VisaSupport";
import VideoTestimonial from "@/components/Home/VideoTestimonial";
import HomeCTA from "@/components/Home/HomeCTA";

export default function Home() {
  return (
    <main>
      <div className="mx-auto max-w-7xl md:px-0 px-6 space-y-20">
        <Hero />
        <HomeAbout />
        <StatsCounter />
        <VideoTestimonial />
        <Partners />
        <Support />
        <VisaSupport />
        <HomeCTA />
      </div>
    </main>
  );
}
