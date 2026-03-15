import ServicesGrid from "@/components/services/ServicesGrid";
import VisaPrep from "@/components/services/VisaPrep";
import ServicePackages from "@/components/services/ServicePackages";

export default function ServicesPage() {
  return (
    <main className="bg-white overflow-x-hidden">
      <ServicesGrid />
      <VisaPrep />
      <ServicePackages />
    </main>
  );
}
