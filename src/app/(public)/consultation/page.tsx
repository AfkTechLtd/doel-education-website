import HeroSection from "@/components/consultation/HeroSection";
import WhatToExpect from "@/components/consultation/WhatToExpect";
import BookingForm from "@/components/consultation/BookingForm";
import Testimonials from "@/components/consultation/Testimonials";
import WhatsAppCTA from "@/components/consultation/WhatsAppCTA";
import FAQStrip from "@/components/consultation/FAQStrip";

export const metadata = {
  title: "Free Consultation  Doel Education",
  description:
    "Book your free 30-minute consultation with a Doel Education advisor and take the first step toward studying in the US.",
};

export default function ConsultationPage() {
  return (
    <main>
      {/* Full-bleed hero  no horizontal padding */}
      <HeroSection />

      {/* All remaining sections use the same px-10 md:px-15 pattern as the home page */}
      <div className="px-10  space-y-15 py-16 max-w-7xl mx-auto">
        <div
          id="booking"
          className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start"
        >
          <WhatToExpect />
          <div className="lg:sticky lg:top-24">
            <BookingForm />
          </div>
        </div>
        <Testimonials />
        <WhatsAppCTA />
        <FAQStrip />
      </div>
    </main>
  );
}
