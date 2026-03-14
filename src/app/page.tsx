import Hero from "@/components/Home/Hero";
import HomeAbout from "@/components/Home/HomeAbout";
import StatsCounter from "@/components/Home/StatsCounter";
import Partners from "@/components/Home/Partners";
import Support from "@/components/Home/Support";
import VisaSupport from "@/components/Home/VisaSupport";
export default function Home() {
  return (
    <div className="px-10 md:px-15 space-y-15">
      <Hero />
      <HomeAbout />
      <StatsCounter />
      <Partners />
      <Support />
      <VisaSupport />
    </div>
  );
}
