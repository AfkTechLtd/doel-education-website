export type FooterLink = {
  label: string;
  href: string;
};

export type FooterSection = {
  title: string;
  links: FooterLink[];
};

export type ContactItem = {
  type: "location" | "phone" | "email" | "hours";
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
    links: [
      { label: "Home", href: "/" },
      { label: "Study in the US", href: "/study-in-us" },
      { label: "Contact Us", href: "/contact" },
    ],
  },
  {
    title: "Our Services",
    links: [
      { label: "University Shortlisting", href: "/consultation#booking" },
      { label: "Application Assistance", href: "/consultation#booking" },
      { label: "Visa Guidance", href: "/consultation#booking" },
      { label: "Scholarship Support", href: "/consultation#booking" },
      { label: "Pre-Departure Briefing", href: "/consultation#booking" },
    ],
  },
];

export const contactItems: ContactItem[] = [
  {
    type: "location",
    label: "House 12, Road 4, Dhanmondi, Dhaka 1205",
    href: "https://maps.google.com",
  },
  {
    type: "phone",
    label: "+880 1700-000000",
    href: "tel:+8801700000000",
  },
  {
    type: "email",
    label: "info@doeleducation.com",
    href: "mailto:info@doeleducation.com",
  },
  {
    type: "hours",
    label: "Sat – Thu: 9:00 AM – 7:00 PM",
    href: "#",
  },
];

export const socialItems: SocialItem[] = [
  { platform: "facebook", href: "#", label: "Facebook" },
  { platform: "x", href: "#", label: "X (Twitter)" },
  { platform: "instagram", href: "#", label: "Instagram" },
  { platform: "linkedin", href: "#", label: "LinkedIn" },
  { platform: "youtube", href: "#", label: "YouTube" },
];

export const legalLinks: FooterLink[] = [
  { label: "Privacy Policy", href: "/privacy-policy" },
  { label: "Terms of Service", href: "/terms-of-service" },
];
