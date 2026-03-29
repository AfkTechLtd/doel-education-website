import {
  BanknoteArrowUp,
  Briefcase,
  Building2,
  FileBadge2,
  FileText,
  Gift,
  Home,
  Landmark,
  PlaneLanding,
  PlaneTakeoff,
  ScrollText,
  ShieldCheck,
  Smartphone,
  Stethoscope,
  Ticket,
  University,
  UserRoundCheck,
  Users,
} from "lucide-react";
import type { JourneyStage, ServicesOverviewStage } from "@/components/services/services.types";

export const servicesOverviewStages: ServicesOverviewStage[] = [
  {
    stage: "Stage 1",
    title: "Admission & University",
    description: "Apply with clarity and get your university documents ready.",
    icon: University,
    accent: "border-primary/15 bg-primary/5",
    accentText: "text-primary",
    count: "4 services",
    href: "#stage-1",
  },
  {
    stage: "Stage 2",
    title: "Visa & Departure",
    description: "Get visa ready, travel ready, and fully confident before takeoff.",
    icon: PlaneTakeoff,
    accent: "border-slate-200 bg-white",
    accentText: "text-primary",
    count: "3 services",
    href: "#stage-2",
  },
  {
    stage: "Stage 3",
    title: "Life in the US",
    description: "Settle faster with help for housing, banking, jobs, and career steps.",
    icon: Briefcase,
    accent: "border-secondary/25 bg-secondary/8",
    accentText: "text-primary",
    count: "9 services",
    href: "#stage-3",
  },
];

export const servicesJourneyStages: JourneyStage[] = [
  {
    id: "01",
    stage: "Stage 1",
    title: "Admission & University",
    blurb:
      "We help you choose the right universities and complete every admission requirement properly.",
    color: "bg-white text-slate-900 border-slate-200",
    accent: "text-primary",
    outcome: "You finish this stage with your admits and I20 ready.",
    items: [
      {
        icon: UserRoundCheck,
        title: "Free Profile Assessment",
        description:
          "We understand your academics, work experience, budget, and long term career goals before recommending a path.",
      },
      {
        icon: Building2,
        title: "University Selection & Application",
        description:
          "We shortlist best fit universities and manage your application process from start to finish.",
      },
      {
        icon: FileBadge2,
        title: "I20 Guarantee",
        description:
          "After admission, we make sure your I20 is issued correctly and reaches you on time.",
      },
      {
        icon: FileText,
        title: "SOP & Document Preparation",
        description:
          "We write, review, and refine your SOP, recommendation letters, and supporting documents.",
      },
    ],
  },
  {
    id: "02",
    stage: "Stage 2",
    title: "Visa & Departure",
    blurb:
      "After admission, we prepare you for the embassy and help you get ready to fly.",
    color: "bg-white text-slate-900 border-slate-200",
    accent: "text-primary",
    outcome: "You finish this stage visa ready and departure ready.",
    items: [
      {
        icon: ShieldCheck,
        title: "Visa Application Support",
        description:
          "We prepare your visa file, coach you for embassy questions, and stay involved until approval.",
      },
      {
        icon: Ticket,
        title: "Cheapest Air Ticket",
        description:
          "We help source affordable flights to your university city so you do not overpay before you even begin.",
      },
      {
        icon: Gift,
        title: "Gift Hamper",
        description:
          "A small but meaningful send off from the DGS family before your journey begins.",
      },
    ],
  },
  {
    id: "03",
    stage: "Stage 3",
    title: "Life in the US",
    blurb:
      "Our support continues after landing so you can settle in and build your life with less stress.",
    color:
      "bg-[linear-gradient(180deg,#fffaf0_0%,#ffffff_100%)] text-slate-900 border-secondary/25",
    accent: "text-primary",
    outcome: "You finish this stage settled, supported, and career focused.",
    groups: [
      {
        label: "Arrival",
        items: [
          {
            icon: PlaneLanding,
            title: "Airport Pickup & Arrival Guidance",
            description:
              "We coordinate your pickup and guide you through your first 48 hours after landing.",
          },
          {
            icon: Home,
            title: "Housing Facility",
            description:
              "We help secure safe, affordable housing near your university before you board the plane.",
          },
          {
            icon: Smartphone,
            title: "Global SIM Card",
            description:
              "Stay connected from the moment you land without roaming stress or local setup confusion.",
          },
        ],
      },
      {
        label: "Settling In",
        items: [
          {
            icon: Stethoscope,
            title: "Health Insurance",
            description:
              "We connect you with the right student health plan so you are covered from the start.",
          },
          {
            icon: Landmark,
            title: "Bank Account Support",
            description:
              "We guide you through opening a US bank account as a new international student.",
          },
          {
            icon: BanknoteArrowUp,
            title: "International Payment Services",
            description:
              "We make tuition, rent, and daily money transfers between Bangladesh and the US smoother.",
          },
        ],
      },
      {
        label: "Career Growth",
        items: [
          {
            icon: Users,
            title: "Part Time Job Assistance",
            description:
              "We help you find legal on campus or authorized part time work while you study.",
          },
          {
            icon: Briefcase,
            title: "Internship Placement",
            description:
              "We connect you with internship opportunities in your field before graduation.",
          },
          {
            icon: ScrollText,
            title: "Job Within 6 Months, CPT & Work Authorization",
            description:
              "We guide you through CPT, OPT, and work authorization so you can build a career in the US within 6 months of completing your degree.",
          },
        ],
      },
    ],
  },
];
