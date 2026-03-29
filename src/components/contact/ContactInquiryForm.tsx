"use client";

import { type ChangeEvent, type FormEvent, useState } from "react";
import { motion } from "framer-motion";
import { fadeInUp } from "./motion";
import PillButton from "../common/PillButton";

const intakeOptions = ["Fall 2026", "Spring 2027", "Fall 2027"];
const programOptions = [
  "Undergraduate",
  "Graduate (Master's)",
  "PhD / Research",
  "Still exploring",
];

const initialForm = {
  name: "",
  phone: "",
  intake: intakeOptions[0],
  program: programOptions[0],
  message: "",
};

const fieldClassName =
  "w-full rounded-2xl border border-slate-200 bg-slate-50 px-5 py-4 font-inter text-sm text-slate-800 placeholder:text-slate-400 outline-none transition-all duration-200 focus:border-primary focus:bg-white focus:ring-4 focus:ring-primary/10";

export default function ContactInquiryForm() {
  const [form, setForm] = useState(initialForm);
  const [submitted, setSubmitted] = useState(false);

  function handleChange(
    event: ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >,
  ) {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitted(true);
  }

  function resetForm() {
    setForm(initialForm);
    setSubmitted(false);
  }

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={fadeInUp}
      className="relative overflow-hidden rounded-[2.8rem] border border-slate-100 bg-white p-8 shadow-sm md:p-12"
    >
      <div className="absolute right-0 top-0 h-52 w-52 rounded-full bg-primary/5 blur-3xl" />

      <div className="relative z-10">
        <div className="mb-10">
          <h2 className="font-poppins text-3xl font-semibold tracking-tight text-slate-900">
            Quick Inquiry
          </h2>
          <p className="mt-3 max-w-2xl font-inter text-sm leading-relaxed text-slate-500 sm:text-base">
            Complete the form and our team will get back to you within 24 hours.
          </p>
        </div>

        {submitted ? (
          <div className="rounded-[2rem] border border-primary/10 bg-[linear-gradient(180deg,#ffffff_0%,#f5fbfb_100%)] p-8 text-center">
            <h3 className="font-poppins text-2xl font-semibold text-slate-900">
              Inquiry received
            </h3>
            <p className="mt-3 font-inter text-sm leading-relaxed text-slate-500 sm:text-base">
              Thanks for reaching out. A counselor will contact you soon.
            </p>
            <button
              type="button"
              onClick={resetForm}
              className="mt-5 font-inter text-sm font-semibold text-primary transition-colors hover:text-primary/80"
            >
              Send another inquiry
            </button>
          </div>
        ) : (
          <form
            className="grid grid-cols-1 gap-6 md:grid-cols-2"
            onSubmit={handleSubmit}
          >
            <div className="space-y-2">
              <label
                htmlFor="name"
                className="font-inter text-[11px] font-semibold uppercase tracking-[0.22em] text-slate-400"
              >
                Full Name
              </label>
              <input
                id="name"
                name="name"
                type="text"
                value={form.name}
                onChange={handleChange}
                className={fieldClassName}
                placeholder="e.g. Abdullah Al Mamun"
                required
              />
            </div>

            <div className="space-y-2">
              <label
                htmlFor="phone"
                className="font-inter text-[11px] font-semibold uppercase tracking-[0.22em] text-slate-400"
              >
                Phone Number
              </label>
              <input
                id="phone"
                name="phone"
                type="tel"
                value={form.phone}
                onChange={handleChange}
                className={fieldClassName}
                placeholder="+880"
                required
              />
            </div>

            <div className="space-y-2">
              <label
                htmlFor="intake"
                className="font-inter text-[11px] font-semibold uppercase tracking-[0.22em] text-slate-400"
              >
                Desired Intake
              </label>
              <select
                id="intake"
                name="intake"
                value={form.intake}
                onChange={handleChange}
                className={fieldClassName}
              >
                {intakeOptions.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>

            <div className="space-y-2">
              <label
                htmlFor="program"
                className="font-inter text-[11px] font-semibold uppercase tracking-[0.22em] text-slate-400"
              >
                Program Level
              </label>
              <select
                id="program"
                name="program"
                value={form.program}
                onChange={handleChange}
                className={fieldClassName}
              >
                {programOptions.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>

            <div className="space-y-2 md:col-span-2">
              <label
                htmlFor="message"
                className="font-inter text-[11px] font-semibold uppercase tracking-[0.22em] text-slate-400"
              >
                Your Career Goals
              </label>
              <textarea
                id="message"
                name="message"
                value={form.message}
                onChange={handleChange}
                className={`${fieldClassName} min-h-[160px] resize-none py-4`}
                placeholder="Briefly describe your dream university or course..."
                required
              />
            </div>

            <PillButton
              isLink={false}
              type="submit"
              wrapperClassName="md:col-span-2 block"
              className="flex w-full justify-center rounded-2xl py-4 font-inter text-sm font-bold shadow-lg shadow-primary/20"
            >
              Send Inquiry
            </PillButton>
          </form>
        )}
      </div>
    </motion.div>
  );
}
