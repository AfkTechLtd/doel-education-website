import type { ComponentType } from "react";

export type ServicesIcon = ComponentType<{ size?: number; className?: string }>;

export type ServicesOverviewStage = {
  stage: string;
  title: string;
  description: string;
  icon: ServicesIcon;
  accent: string;
  accentText: string;
  count: string;
  href: string;
};

export type JourneyItem = {
  icon: ServicesIcon;
  title: string;
  description: string;
};

export type JourneyGroup = {
  label: string;
  items: JourneyItem[];
};

export type JourneyStage = {
  id: string;
  stage: string;
  title: string;
  blurb: string;
  color: string;
  accent: string;
  outcome: string;
  items?: JourneyItem[];
  groups?: JourneyGroup[];
};
