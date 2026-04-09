import {
  BarChart3,
  FileBadge2,
  GraduationCap,
  PieChart,
  ShieldCheck,
  UserRoundPlus,
  Users,
  type LucideIcon,
} from "lucide-react";

export type DashboardStat = {
  label: string;
  value: number;
  note: string;
  trend: string;
  icon: LucideIcon;
};

export type PipelineStage = {
  label: string;
  count: number;
  status: string;
};

export type ActivityPoint = {
  label: string;
  value: number;
};

export type ApplicationOutcome = {
  label: string;
  value: number;
  color: string;
};

export type OverviewInsight = {
  label: string;
  value: number;
  suffix: string;
  icon: LucideIcon;
};

export const dashboardStats: DashboardStat[] = [
  {
    label: "Total Students",
    value: 1284,
    note: "Across active and enrolled files",
    trend: "+8.4% this month",
    icon: Users,
  },
  {
    label: "Pending Uploads",
    value: 46,
    note: "Awaiting review or verification",
    trend: "12 urgent today",
    icon: FileBadge2,
  },
  {
    label: "Active Applications",
    value: 73,
    note: "Students currently in submission flow",
    trend: "19 moved this week",
    icon: GraduationCap,
  },
  {
    label: "Offer Letters",
    value: 22,
    note: "Students with recent admission decisions",
    trend: "6 new this month",
    icon: ShieldCheck,
  },
];

export const pipelineStages: PipelineStage[] = [
  { label: "Lead", count: 182, status: "active" },
  { label: "Profile Review", count: 96, status: "In Review" },
  { label: "Document Collection", count: 74, status: "pending" },
  { label: "University Shortlisting", count: 51, status: "Active" },
  { label: "Application Submitted", count: 38, status: "Submitted" },
  { label: "Offer Letter", count: 22, status: "Awaiting" },
  { label: "Visa", count: 17, status: "Visa Prep" },
  { label: "Enrolled", count: 9, status: "Verified" },
];

export const monthlyActivity: ActivityPoint[] = [
  { label: "Jan", value: 42 },
  { label: "Feb", value: 56 },
  { label: "Mar", value: 48 },
  { label: "Apr", value: 61 },
  { label: "May", value: 74 },
  { label: "Jun", value: 68 },
];

export const applicationOutcomes: ApplicationOutcome[] = [
  { label: "Submitted", value: 18, color: "#0b5c59" },
  { label: "Under Review", value: 27, color: "#2d7a77" },
  { label: "Admitted", value: 16, color: "#ffab17" },
  { label: "Rejected", value: 12, color: "#e25d4d" },
];

export const overviewInsights: OverviewInsight[] = [
  {
    label: "Documents verified this week",
    value: 128,
    suffix: "files",
    icon: ShieldCheck,
  },
  {
    label: "New student entries",
    value: 24,
    suffix: "profiles",
    icon: UserRoundPlus,
  },
  {
    label: "Applications moved forward",
    value: 19,
    suffix: "files",
    icon: BarChart3,
  },
  {
    label: "Offer letters issued",
    value: 16,
    suffix: "students",
    icon: PieChart,
  },
];
