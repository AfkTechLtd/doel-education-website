import {
  BookOpen,
  ClipboardList,
  FileCheck2,
  FolderOpen,
  GitBranch,
  Globe,
  History,
  Kanban,
  LayoutDashboard,
Plane,
  Settings,
  UserCog,
  Users,
  type LucideIcon,
} from "lucide-react";

export type DashboardNavItem = {
  label: string;
  icon: LucideIcon;
  href?: string;
  comingSoon?: boolean;
  /** Renders a small divider + label above this item to start a new group */
  sectionLabel?: string;
  /** Grey out and disable this item if the student has no counselor assigned */
  requiresCounselor?: boolean;
};

// ── Student ────────────────────────────────────────────────────────────────
// PRD §3.1: Home, My Application, Document Vault, Resources, History, Messages
// PRD §3.3: Post-Admission — I-20, Visa Preparation, Pre-Departure

export const studentNavItems: DashboardNavItem[] = [
  {
    label: "Home",
    icon: LayoutDashboard,
    href: "/student",
  },
  {
    label: "My Application",
    icon: ClipboardList,
    href: "/student/application",
    comingSoon: true,
    requiresCounselor: true,
  },
  {
    label: "Document Vault",
    icon: FolderOpen,
    href: "/student/documents",
    requiresCounselor: true,
  },
  {
    label: "Resources",
    icon: BookOpen,
    href: "/student/resources",
    requiresCounselor: true,
  },
  {
    label: "Application History",
    icon: History,
    href: "/student/application/history",
    requiresCounselor: true,
  },
  // ── Post-Admission ──────────────────────────────────────────────────────
  {
    label: "I-20 Processing",
    icon: FileCheck2,
    comingSoon: true,
    sectionLabel: "Post-Admission",
  },
  {
    label: "Visa Preparation",
    icon: Globe,
    comingSoon: true,
  },
  {
    label: "Pre-Departure",
    icon: Plane,
    comingSoon: true,
  },
];

// ── Counselor ──────────────────────────────────────────────────────────────
// PRD §5.1: Dashboard (KPIs + Alert Feed)
// PRD §5.2: My Students (List + Kanban)
// PRD §5.3: Student Detail View (accessed from student list, not top-nav)
// Kanban columns: New Docs → Pending → Applied → Admitted → Visa Stage

export const counselorNavItems: DashboardNavItem[] = [
  {
    label: "Dashboard",
    icon: LayoutDashboard,
    href: "/counselor",
  },
  {
    label: "My Students",
    icon: Users,
    href: "/counselor/students",
  },
  {
    label: "Kanban Board",
    icon: Kanban,
    href: "/counselor/kanban",
  },
];

// ── Admin ──────────────────────────────────────────────────────────────────
// PRD §6.1: Analytics Dashboard (Total Students, Conversion Rate, Visa Success)
// PRD §6.2: Users & Role Management (Moderator provisioning, RBAC)
// PRD §6.3: Counselor Assignment Tools (Manual + Automated)

export const adminNavItems: DashboardNavItem[] = [
  {
    label: "Dashboard",
    icon: LayoutDashboard,
    href: "/admin",
  },
  {
    label: "Users",
    icon: UserCog,
    href: "/admin/users",
  },
  {
    label: "Assignments",
    icon: GitBranch,
    href: "/admin/assignments",
  },
  {
    label: "Settings",
    icon: Settings,
    comingSoon: true,
  },
];

// ── Helpers ────────────────────────────────────────────────────────────────

export function getNavItems(role: string): DashboardNavItem[] {
  switch (role) {
    case "STUDENT":
      return studentNavItems;
    case "COUNSELOR":
      return counselorNavItems;
    case "ADMIN":
      return adminNavItems;
    default:
      return [];
  }
}

export function getSidebarLabel(role: string): string {
  switch (role) {
    case "STUDENT":
      return "Student Portal";
    case "COUNSELOR":
      return "Counselor Portal";
    case "ADMIN":
      return "Admin Panel";
    default:
      return "Dashboard";
  }
}

export function getRoleLabel(role: string): string {
  switch (role) {
    case "STUDENT":
      return "Student";
    case "COUNSELOR":
      return "Counselor";
    case "ADMIN":
      return "Administrator";
    default:
      return role;
  }
}
