import ServicesHero from "@/components/services/ServicesHero";
import ServicesSupport from "@/components/services/ServicesSupport";
import ServicesJourney from "@/components/services/ServicesJourney";

export default function ServicesPage() {
  return (
    <main className="bg-white overflow-x-hidden">
      <ServicesHero />
      <ServicesSupport />
      <ServicesJourney />
    </main>
  );
}