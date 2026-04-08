import type { LucideIcon } from "lucide-react";
import {
  Briefcase,
  Code2,
  Database,
  GraduationCap,
  HeartPulse,
  Palette,
} from "lucide-react";

type InterestRecord = {
  id: string;
  name: string;
  slug: string;
};

export type MergedInterest = InterestRecord & {
  icon?: LucideIcon;
};

const iconMap: Record<string, LucideIcon> = {
  business: Briefcase,
  "computer-science": Code2,
  "data-science": Database,
  engineering: GraduationCap,
  "public-health": HeartPulse,
  design: Palette,
};

export function mergeInterestsWithIcons(
  interests: InterestRecord[],
): MergedInterest[] {
  return interests.map((interest) => ({
    ...interest,
    icon: iconMap[interest.slug],
  }));
}
