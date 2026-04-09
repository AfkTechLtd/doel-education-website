import {
  Files,
  GraduationCap,
  LayoutDashboard,
  Settings,
  University,
  Users2,
  type LucideIcon,
} from "lucide-react";

export type DashboardNavItem = {
  label: string;
  icon: LucideIcon;
  href?: string;
  comingSoon?: boolean;
};

export const dashboardNavItems: DashboardNavItem[] = [
  { label: "Overview", icon: LayoutDashboard, href: "/dashboard" },
  { label: "Students", icon: GraduationCap, comingSoon: true },
  { label: "Documents", icon: Files, comingSoon: true },
  { label: "Applications", icon: University, comingSoon: true },
  { label: "Counselors", icon: Users2, comingSoon: true },
  { label: "Settings", icon: Settings, comingSoon: true },
];
