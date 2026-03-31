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
    <footer
      className="border-t border-white/10 "
      style={{
        backgroundColor:
          "color-mix(in srgb, var(--color-primary,#0b5c59) 20%, #000 80%)",
      }}
    >
      {/* ── Main grid ─────────────────────────────────────────────── */}
      <div className="max-w-7xl mx-auto px-6 py-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12">
        {/* Brand column */}
        <div>
          <Logo showName={false} className="" />

          <p className="font-inter text-sm leading-7 text-slate-300">
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
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-white/20 text-slate-300 transition-colors duration-200 hover:border-secondary hover:text-secondary"
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
            <h3 className="mb-5 font-inter text-xs font-semibold uppercase tracking-widest text-slate-400">
              {section.title}
            </h3>
            <ul className="space-y-3">
              {section.links.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="font-inter text-sm text-slate-300 transition-colors duration-200 hover:text-white"
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
          <h3 className="mb-5 font-inter text-xs font-semibold uppercase tracking-widest text-slate-400">
            Contact Us
          </h3>
          <ul className="space-y-4">
            {contactItems.map((item) => {
              const Icon = contactIconMap[item.type];
              const isLink = item.href !== "#";
              const content = (
                <span className="flex items-start gap-3 text-sm text-slate-300 transition-colors duration-200 hover:text-white">
                  <Icon
                    className="mt-0.5 h-4 w-4 shrink-0 text-secondary/80"
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
      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-6 py-5 flex flex-col md:flex-row gap-4 md:items-center md:justify-between">
          <p className="font-inter text-sm text-slate-400">
            &copy; {new Date().getFullYear()} DOEL Education Consultancy. All
            rights reserved.
          </p>

          <div className="flex items-center gap-6">
            {legalLinks.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="font-inter text-sm text-slate-400 transition-colors duration-200 hover:text-white"
              >
                {item.label}
              </Link>
            ))}

            <button
              type="button"
              aria-label="Back to top"
              className="flex h-9 w-9 items-center justify-center rounded-full border border-white/20 text-slate-300 transition-colors duration-200 hover:border-secondary hover:bg-white/5 hover:text-secondary"
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
