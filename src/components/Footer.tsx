"use client";

import Link from "next/link";
import {
  ArrowUp,
  Facebook,
  Instagram,
  Linkedin,
  Mail,
  MapPin,
  Phone,
  Twitter,
  Youtube,
  type LucideIcon,
} from "lucide-react";
import {
  contactItems,
  footerSections,
  legalLinks,
  socialItems,
  type ContactItem,
  type SocialItem,
} from "@/data/footerData";

const sectionTitleClass = "text-lg font-semibold text-slate-900 font-poppins";
const linkClass =
  "font-inter text-slate-600 hover:text-primary transition-colors duration-200";

const socialIconMap: Record<SocialItem["platform"], LucideIcon> = {
  facebook: Facebook,
  x: Twitter,
  instagram: Instagram,
  linkedin: Linkedin,
  youtube: Youtube,
};

const contactIconMap: Record<ContactItem["type"], LucideIcon> = {
  location: MapPin,
  phone: Phone,
  email: Mail,
};

export default function Footer() {
  return (
    <footer className="mt-20 bg-slate-50 border-t border-slate-200">
      <div className="h-1 w-full bg-primary" />

      <div className="max-w-7xl mx-auto px-6 py-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12">
        <section>
          <h2 className="text-3xl font-bold text-slate-900 font-poppins tracking-wide">
            DOEL
          </h2>
          <p className="text-slate-600 mt-1 font-inter">
            Education Consultancy
          </p>
          <p className="mt-6 text-slate-600 leading-7 font-inter max-w-xs">
            Empowering students to achieve their global education dreams through
            personalized guidance, ethical practices, and comprehensive support.
          </p>

          <div className="mt-7 flex items-center gap-3">
            {socialItems.map((item) => {
              const Icon = socialIconMap[item.platform];

              return (
                <Link
                  key={item.platform}
                  href={item.href}
                  aria-label={item.label}
                  className="w-10 h-10 rounded-full border border-slate-300 bg-white text-slate-500 hover:border-primary hover:bg-primary hover:text-white transition-colors duration-200 flex items-center justify-center"
                >
                  <Icon className="w-4 h-4" strokeWidth={2} aria-hidden="true" />
                </Link>
              );
            })}
          </div>
        </section>

        {footerSections.map((section) => (
          <section key={section.title}>
            <h3 className={sectionTitleClass}>{section.title}</h3>
            <ul className="mt-6 space-y-3">
              {section.links.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className={linkClass}>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        ))}

        <section>
          <h3 className={sectionTitleClass}>Contact Us</h3>
          <ul className="mt-6 space-y-4">
            {contactItems.map((item) => {
              const Icon = contactIconMap[item.type];

              return (
                <li key={item.type}>
                  <Link
                    href={item.href}
                    className="group flex items-start gap-3 font-inter text-slate-600 hover:text-primary transition-colors duration-200"
                  >
                    <Icon className="w-5 h-5 text-primary shrink-0 mt-0.5" strokeWidth={1.9} aria-hidden="true" />
                    <span className="leading-6 text-slate-600 group-hover:text-primary transition-colors duration-200">
                      {item.label}
                    </span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </section>
      </div>

      <div className="border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-6 py-6 flex flex-col md:flex-row gap-4 md:items-center md:justify-between">
          <p className="font-inter text-slate-500 text-sm">
            &copy; {new Date().getFullYear()} DOEL Education Consultancy. All
            rights reserved.
          </p>

          <div className="flex items-center gap-6">
            {legalLinks.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="font-inter text-sm text-slate-500 hover:text-primary transition-colors duration-200"
              >
                {item.label}
              </Link>
            ))}

            <button
              type="button"
              aria-label="Back to top"
              className="w-9 h-9 rounded-full bg-primary text-white hover:bg-primary/90 transition-colors duration-200 flex items-center justify-center"
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            >
              <ArrowUp className="w-4 h-4" strokeWidth={2.2} aria-hidden="true" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
