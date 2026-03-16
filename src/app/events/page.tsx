import type { Metadata } from "next";
import EventsHero from "@/components/events/EventsHero";
import FeaturedEvent from "@/components/events/FeaturedEvent";
import EventsFilterSection from "@/components/events/EventsFilterSection";
import EventHighlights from "@/components/events/EventHighlights";

export const metadata: Metadata = {
  title: "Events & Webinars — Doel Education",
  description:
    "Join free webinars, visa briefings, and in-person seminars hosted by Doel Education Consultancy. Knowledge sessions for students planning to study in the USA.",
};

export default function EventsPage() {
  return (
    <main className="bg-white overflow-x-hidden pb-20">
      <EventsHero />
      <FeaturedEvent />
      <EventsFilterSection />
      <EventHighlights />
    </main>
  );
}
