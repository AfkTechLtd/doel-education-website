import { FileCheck2 } from "lucide-react";
import ScrollRevealSection from "@/components/common/ScrollRevealSection";
import ServicesOverviewCard from "@/components/services/ServicesOverviewCard";
import ServicesSectionIntro from "@/components/services/ServicesSectionIntro";
import { servicesOverviewStages } from "@/components/services/services.data";

export default function ServicesSupport() {
  return (
    <div className="mx-auto max-w-7xl 2xl:px-6 px-6 md:px-20 pb-20 pt-6 md:pb-24 md:pt-10">
      <ScrollRevealSection>
        <section id="services-roadmap" className="space-y-8 scroll-mt-28">
          <ServicesSectionIntro
            badge={<><FileCheck2 size={14} />Standard Service</>}
            title="EVERYTHING YOU NEED. ALL IN ONE PLACE."
            description="We keep the process simple: 3 stages, clear support, and no confusion about what happens next."
          />

          <div className="grid gap-5 lg:grid-cols-3">
            {servicesOverviewStages.map((stage) => (
              <ServicesOverviewCard key={stage.stage} stage={stage} />
            ))}
          </div>
        </section>
      </ScrollRevealSection>
    </div>
  );
}
