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
  Clock,
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
import Logo from "./Logo";

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
  hours: Clock,
};

export default function Footer() {
  return (
    <footer className="bg-white border-t border-gray-100">
      {/* ── Main grid ─────────────────────────────────────────────── */}
      <div className="max-w-7xl mx-auto px-6 py-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12">
        {/* Brand column */}
        <div>
          <Logo showName={false} className="" />

          <p className="text-gray-500 font-inter text-sm leading-7">
            Bangladesh&apos;s trusted study-abroad partner since 2008.
            We&apos;ve helped over 10,000 students build careers in the United
            States through honest, personalised guidance.
          </p>

          {/* Social icons */}
          <div className="mt-7 flex items-center gap-2">
            {socialItems.map((item) => {
              const Icon = socialIconMap[item.platform];
              return (
                <Link
                  key={item.platform}
                  href={item.href}
                  aria-label={item.label}
                  className="w-9 h-9 rounded-full border border-gray-200 text-gray-400 hover:border-primary hover:text-primary transition-colors duration-200 flex items-center justify-center"
                >
                  <Icon
                    className="w-4 h-4"
                    strokeWidth={2}
                    aria-hidden="true"
                  />
                </Link>
              );
            })}
          </div>
        </div>

        {/* Link columns */}
        {footerSections.map((section) => (
          <section key={section.title}>
            <h3 className="text-xs font-semibold uppercase tracking-widest text-gray-400 mb-5 font-inter">
              {section.title}
            </h3>
            <ul className="space-y-3">
              {section.links.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm font-inter text-gray-500 hover:text-primary transition-colors duration-200"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        ))}

        {/* Contact column */}
        <section>
          <h3 className="text-xs font-semibold uppercase tracking-widest text-gray-400 mb-5 font-inter">
            Contact Us
          </h3>
          <ul className="space-y-4">
            {contactItems.map((item) => {
              const Icon = contactIconMap[item.type];
              const isLink = item.href !== "#";
              const content = (
                <span className="flex items-start gap-3 text-sm text-gray-500 hover:text-primary transition-colors duration-200">
                  <Icon
                    className="w-4 h-4 text-primary/60 shrink-0 mt-0.5"
                    strokeWidth={1.9}
                  />
                  <span className="leading-snug">{item.label}</span>
                </span>
              );
              return (
                <li key={item.type}>
                  {isLink ? <Link href={item.href}>{content}</Link> : content}
                </li>
              );
            })}
          </ul>
        </section>
      </div>

      {/* ── Bottom bar ────────────────────────────────────────────── */}
      <div className="border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-6 py-5 flex flex-col md:flex-row gap-4 md:items-center md:justify-between">
          <p className="font-inter text-gray-400 text-sm">
            &copy; {new Date().getFullYear()} DOEL Education Consultancy. All
            rights reserved.
          </p>

          <div className="flex items-center gap-6">
            {legalLinks.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="font-inter text-sm text-gray-400 hover:text-primary transition-colors duration-200"
              >
                {item.label}
              </Link>
            ))}

            <button
              type="button"
              aria-label="Back to top"
              className="w-9 h-9 rounded-full border border-gray-200 text-gray-400 hover:border-primary hover:text-primary hover:bg-primary/5 transition-colors duration-200 flex items-center justify-center"
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            >
              <ArrowUp
                className="w-4 h-4"
                strokeWidth={2.2}
                aria-hidden="true"
              />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
