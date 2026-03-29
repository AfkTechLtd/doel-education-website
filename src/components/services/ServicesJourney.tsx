import ScrollRevealSection from "@/components/common/ScrollRevealSection";
import ServicesStagePanel from "@/components/services/ServicesStagePanel";
import { servicesJourneyStages } from "@/components/services/services.data";

export default function ServicesJourney() {
  return (
    <div className="mx-auto max-w-7xl 2xl:px-6 px-6 md:px-20 pb-20 md:pb-24">
      <ScrollRevealSection>
        <section className="space-y-5">
          <div className="space-y-6">
            {servicesJourneyStages.map((stage) => (
              <ServicesStagePanel key={stage.id} stage={stage} />
            ))}
          </div>
        </section>
      </ScrollRevealSection>
    </div>
  );
}
