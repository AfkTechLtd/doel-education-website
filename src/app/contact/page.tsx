import ContactHero from "@/components/contact/ContactHero";
import ContactInfoCard from "@/components/contact/ContactInfoCard";
import ContactInquiryForm from "@/components/contact/ContactInquiryForm";
import ContactMapSection from "@/components/contact/ContactMapSection";

export default function ContactPage() {
  return (
    <main className="overflow-x-hidden bg-[#fcfdfd]">
      <ContactHero />

      <section className="mx-auto max-w-7xl px-6 pb-24 pt-14 lg:pt-20">
        <div className="grid gap-8 lg:grid-cols-3">
          <ContactInfoCard />

          <div className="lg:col-span-2">
            <ContactInquiryForm />
          </div>
        </div>

        <ContactMapSection />
      </section>
    </main>
  );
}
