export interface NavChild {
  label: string;
  href: string;
}

export interface NavLink {
  label: string;
  href: string;
  children?: NavChild[];
}

const navLinks: NavLink[] = [
  { label: "Home", href: "/" },
  {
    label: "Study in US",
    href: "/study-in-us",
    children: [
      { label: "Everything about US", href: "/study-in-us" },
      { label: "Find Major", href: "/study-in-us/find-major" },
    ],
  },
  { label: "Services", href: "/services" },
  { label: "Success Stories", href: "/about" },
  { label: "Events", href: "/events" },
  { label: "Blog", href: "/blog" },
  // { label: "Q&A", href: "/qna" },
  // { label: "Contact", href: "/contact" },
];

export default navLinks;
