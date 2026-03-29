"use client";

import { useState } from "react";
import EventTypeChips from "./EventTypeChips";
import UpcomingEventsGrid, { events, type EventFilter } from "./UpcomingEventsGrid";

export default function EventsFilterSection() {
  const [active, setActive] = useState<EventFilter>("All");

  const visibleCount =
    active === "All"
      ? events.length
      : events.filter((event) => event.status === active).length;

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
