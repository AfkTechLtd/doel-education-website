"use client";

import { motion } from "framer-motion";
import {
  Clock,
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
  socialItems,
  type ContactItem,
  type SocialItem,
} from "@/data/footerData";
import { fadeInUp } from "./motion";

const contactIconMap: Record<ContactItem["type"], LucideIcon> = {
  location: MapPin,
  phone: Phone,
  email: Mail,
  hours: Clock,
};

const contactLabelMap: Record<ContactItem["type"], string> = {
  location: "Office Address",
  phone: "Phone",
  email: "Email",
  hours: "Consultation Hours",
};

const socialIconMap: Record<SocialItem["platform"], LucideIcon> = {
  facebook: Facebook,
  x: Twitter,
  instagram: Instagram,
  linkedin: Linkedin,
  youtube: Youtube,
};

function ContactLink({ item }: { item: ContactItem }) {
  const Icon = contactIconMap[item.type];

  return (
    <a
      href={item.href}
      target={item.href.startsWith("http") ? "_blank" : undefined}
      rel={item.href.startsWith("http") ? "noreferrer" : undefined}
      className="group flex items-start gap-4"
    >
      <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-primary/8 text-primary transition-colors duration-200 group-hover:bg-primary group-hover:text-white">
        <Icon size={20} strokeWidth={2} />
      </span>

      <div>
        <p className="font-inter text-[11px] font-semibold uppercase tracking-[0.22em] text-slate-400">
          {contactLabelMap[item.type]}
        </p>
        <p className="mt-1 font-inter text-sm font-medium leading-relaxed text-slate-700 transition-colors duration-200 group-hover:text-primary sm:text-base">
          {item.label}
        </p>
      </div>
    </a>
  );
}

export default function ContactInfoCard() {
  const visibleContactItems = contactItems.filter((item) => item.type !== "hours");
  const hoursItem = contactItems.find((item) => item.type === "hours");

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={fadeInUp}
      className="rounded-[2.5rem] border border-slate-100 bg-white p-8 shadow-sm md:p-10"
    >
      <h2 className="font-poppins text-3xl font-semibold tracking-tight text-slate-900">
        Reach Out
      </h2>

      <div className="mt-8 space-y-7">
        {visibleContactItems.map((item) => (
          <ContactLink key={item.type} item={item} />
        ))}
      </div>

      {hoursItem ? (
        <div className="mt-10 border-t border-slate-100 pt-8">
          <div className="flex items-center gap-2 text-secondary">
            <Clock size={18} strokeWidth={2} />
            <span className="font-inter text-[11px] font-semibold uppercase tracking-[0.22em] text-slate-500">
              {contactLabelMap.hours}
            </span>
          </div>
          <p className="mt-3 font-inter text-sm font-medium text-slate-700">
            {hoursItem.label}
          </p>
          <p className="mt-2 font-inter text-xs leading-relaxed text-slate-400">
            Appointments are recommended for a more focused counseling session.
          </p>
        </div>
      ) : null}

      <div className="mt-8 flex flex-wrap gap-3">
        {socialItems.map((item) => {
          const Icon = socialIconMap[item.platform];

          return (
            <a
              key={item.platform}
              href={item.href}
              aria-label={item.label}
              className="flex h-11 w-11 items-center justify-center rounded-2xl bg-slate-50 text-slate-400 transition-all duration-200 hover:-translate-y-0.5 hover:bg-primary hover:text-white"
            >
              <Icon size={18} strokeWidth={2} />
            </a>
          );
        })}
      </div>
    </motion.div>
  );
}
