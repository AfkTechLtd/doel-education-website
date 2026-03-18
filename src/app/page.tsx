import Hero from "@/components/Home/Hero";
import HomeAbout from "@/components/Home/HomeAbout";
import StatsCounter from "@/components/Home/StatsCounter";
import USPSection from "@/components/Home/USPSection";
import Partners from "@/components/Home/Partners";
import Support from "@/components/Home/Support";
import VisaSupport from "@/components/Home/VisaSupport";
import VideoTestimonial from "@/components/Home/VideoTestimonial";
import HomeCTA from "@/components/Home/HomeCTA";
import ScrollRevealSection from "@/components/common/ScrollRevealSection";
import StakeHolderTestimonials from "@/components/Home/HomeTestimonial";
import VisaSuccess from "@/components/Home/VisaSuccessSection";
import CostCalculator from "@/components/Home/HomeCostCalculator";

export default function Home() {
  return (
    <main>
      <Hero />
      <div className="mx-auto max-w-7xl md:px-20 2xl:px-6 px-6 space-y-16">
        <ScrollRevealSection>
          <HomeAbout />
          <StatsCounter />
        </ScrollRevealSection>
      </div>
      <ScrollRevealSection>
          <Partners />
      </ScrollRevealSection>
      <div className="mx-auto max-w-7xl md:px-20 2xl:px-6 px-6 space-y-16">
        <ScrollRevealSection>
          <USPSection />
          </ScrollRevealSection>
        <ScrollRevealSection>
          <VisaSuccess />
        </ScrollRevealSection>
        <ScrollRevealSection>
          <CostCalculator />
        </ScrollRevealSection>
        <ScrollRevealSection>
          <VideoTestimonial />
          <StakeHolderTestimonials />
        </ScrollRevealSection>
        <ScrollRevealSection>
          <Support />
        </ScrollRevealSection>
        <ScrollRevealSection>
          <VisaSupport />
        </ScrollRevealSection>
        <ScrollRevealSection>
          <HomeCTA />
        </ScrollRevealSection>
      </div>
    </main>
  );
}
