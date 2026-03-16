"use client";

import { useState } from "react";
import EventTypeChips from "./EventTypeChips";
import UpcomingEventsGrid, { events, type EventType } from "./UpcomingEventsGrid";

export default function EventsFilterSection() {
  const [active, setActive] = useState<EventType>("All");

  const visibleCount =
    active === "All" ? events.length : events.filter((e) => e.type === active).length;

  return (
    <>
      <EventTypeChips
        active={active}
        onSelect={setActive}
        totalCount={visibleCount}
      />
      <UpcomingEventsGrid filter={active} />
    </>
  );
}
