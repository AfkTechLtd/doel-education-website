import navLinks from "@/data/navData";

export type FooterLink = {
  label: string;
  href: string;
};

export type FooterSection = {
  title: string;
  links: FooterLink[];
};

export type ContactItem = {
  type: "location" | "phone" | "email";
  label: string;
  href: string;
};

export type SocialItem = {
  platform: "facebook" | "x" | "instagram" | "linkedin" | "youtube";
  href: string;
  label: string;
};

export const footerSections: FooterSection[] = [
  {
    title: "Quick Links",
    links: navLinks,
  },
  {
    title: "Study Destinations",
    links: [{ label: "Study in US", href: "/study-in-us" }],
  },
];

export const contactItems: ContactItem[] = [
  {
    type: "location",
    label: "123 Education Street, Global City, 10001",
    href: "https://maps.google.com",
  },
  {
    type: "phone",
    label: "+1 (234) 567-890",
    href: "tel:+1234567890",
  },
  {
    type: "email",
    label: "info@doeleducation.com",
    href: "mailto:info@doeleducation.com",
  },
];

export const socialItems: SocialItem[] = [
  { platform: "facebook", href: "#", label: "Facebook" },
  { platform: "x", href: "#", label: "X" },
  { platform: "instagram", href: "#", label: "Instagram" },
  { platform: "linkedin", href: "#", label: "LinkedIn" },
  { platform: "youtube", href: "#", label: "YouTube" },
];

export const legalLinks: FooterLink[] = [
  { label: "Privacy Policy", href: "/privacy-policy" },
  { label: "Terms of Service", href: "/terms-of-service" },
];
