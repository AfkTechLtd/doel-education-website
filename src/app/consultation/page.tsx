import HeroSection from "@/components/consultation/HeroSection";
import UrgencyBanner from "@/components/consultation/UrgencyBanner";
import WhatToExpect from "@/components/consultation/WhatToExpect";
import BookingForm from "@/components/consultation/BookingForm";
import Testimonials from "@/components/consultation/Testimonials";
import WhatsAppCTA from "@/components/consultation/WhatsAppCTA";
import FAQStrip from "@/components/consultation/FAQStrip";

export const metadata = {
  title: "Free Consultation — Doel Education",
  description:
    "Book your free 30-minute consultation with a Doel Education advisor and take the first step toward studying in the US.",
};

export default function ConsultationPage() {
  return (
    <main>
      <HeroSection />
      <UrgencyBanner />
      <div className="max-w-7xl mx-auto px-6 py-16 grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
        <WhatToExpect />
        <BookingForm />
      </div>
      <Testimonials />
      <WhatsAppCTA />
      <FAQStrip />
    </main>
  );
}
