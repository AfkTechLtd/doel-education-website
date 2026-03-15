"use client";

import { useState, type FormEvent } from "react";
import FormField from "./FormField";
import FormSelect from "./FormSelect";

const intakeYears = ["Fall 2025", "Spring 2026", "Fall 2026", "Spring 2027", "Fall 2027"];
const programs = ["Undergraduate", "Graduate (Master's)", "PhD", "Community College", "Language Program", "Not sure yet"];
const budgets = ["Under $15,000/yr", "$15,000–$25,000/yr", "$25,000–$40,000/yr", "Above $40,000/yr", "Need scholarship guidance"];

export default function BookingForm() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 1200);
  }

  if (submitted) {
    return (
      <div className="bg-primary/5 border border-primary/20 rounded-2xl p-10 flex flex-col items-center justify-center text-center gap-4 min-h-[300px]">
        <div className="w-14 h-14 rounded-full bg-primary flex items-center justify-center">
          <svg className="w-7 h-7 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h3 className="text-xl font-semibold text-slate-900 font-poppins">You&apos;re booked!</h3>
        <p className="text-slate-600 font-inter">We&apos;ll reach out within 24 hours to confirm your session time.</p>
      </div>
    );
  }

  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-8 shadow-sm">
      <h2 className="text-2xl font-bold text-slate-900 font-poppins mb-1">Reserve Your Slot</h2>
      <p className="text-slate-500 font-inter text-sm mb-7">Fill in your details and we&apos;ll confirm within 24 hours.</p>

      <form onSubmit={handleSubmit} className="flex flex-col gap-5">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <FormField id="name" label="Full Name" type="text" placeholder="e.g. Arif Rahman" required />
          <FormField id="phone" label="Phone Number" type="tel" placeholder="+880 1xxx-xxxxxx" required />
        </div>
        <FormField id="email" label="Email Address" type="email" placeholder="you@example.com" required />
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <FormSelect id="intake" label="Target Intake" options={intakeYears} required />
          <FormSelect id="program" label="Program of Interest" options={programs} required />
        </div>
        <FormSelect id="budget" label="Annual Budget" options={budgets} required />

        <button
          type="submit"
          disabled={loading}
          className="mt-2 w-full py-3.5 rounded-xl bg-primary text-white text-sm font-semibold font-inter hover:bg-primary/90 transition-colors duration-200 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          {loading ? (
            <>
              <svg className="w-4 h-4 animate-spin" viewBox="0 0 24 24" fill="none">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
              </svg>
              Booking…
            </>
          ) : (
            "Book My Free Consultation"
          )}
        </button>
      </form>
    </div>
  );
}
