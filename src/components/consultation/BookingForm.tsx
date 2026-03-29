"use client";

import { useState, type FormEvent, type ChangeEvent } from "react";
import FormField from "./FormField";
import FormSelect from "./FormSelect";

const intakeYears = [
  "Fall 2026",
  "Spring 2027",
  "Fall 2027",
  "Spring 2028",
  "Fall 2028",
];
const programs = [
  "Undergraduate",
  "Graduate (Master's)",
  "PhD",
  "Community College",
  "Language Program",
  "Not sure yet",
];
const budgets = [
  "Under $15,000/yr",
  "$15,000–$25,000/yr",
  "$25,000–$40,000/yr",
  "Above $40,000/yr",
  "Need scholarship guidance",
];

const initialForm = {
  name: "",
  phone: "",
  email: "",
  intake: "",
  program: "",
  budget: "",
};

export default function BookingForm() {
  const [form, setForm] = useState(initialForm);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  function handleChange(e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    // TODO: replace with real API call  form data is in `form`
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 1200);
  }

  if (submitted) {
    return (
      <div className="border border-gray-200 shadow-lg rounded-2xl p-10 flex flex-col items-center justify-center text-center gap-4 min-h-[300px] bg-[linear-gradient(180deg,#ffffff_0%,#FFF6E0_100%)]">
        <div className="w-14 h-14 rounded-full bg-primary flex items-center justify-center">
          <svg
            className="w-7 h-7 text-white"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2.5}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M5 13l4 4L19 7"
            />
          </svg>
        </div>
        <h3 className="text-xl font-semibold text-slate-900 font-inter">
          You&apos;re booked!
        </h3>
        <p className="text-gray-500 font-semibold">
          We&apos;ll reach out within 24 hours to confirm your session time.
        </p>
        <button
          onClick={() => {
            setSubmitted(false);
            setForm(initialForm);
          }}
          className="mt-2 text-sm text-primary font-semibold hover:underline underline-offset-2"
        >
          Submit another request
        </button>
      </div>
    );
  }

  return (
    <div className="bg-white border border-gray-200 shadow-lg rounded-2xl p-8">
      <h2 className="text-2xl font-semibold font-inter text-slate-900 mb-1">
        Reserve Your Slot
      </h2>
      <p className="text-gray-500 text-sm font-semibold mb-7">
        Fill in your details and we&apos;ll confirm within 24 hours.
      </p>

      <form onSubmit={handleSubmit} className="flex flex-col gap-5">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <FormField
            id="name"
            label="Full Name"
            type="text"
            placeholder="e.g. Arif Rahman"
            required
            value={form.name}
            onChange={handleChange}
          />
          <FormField
            id="phone"
            label="Phone Number"
            type="tel"
            placeholder="+880 1xxx-xxxxxx"
            required
            value={form.phone}
            onChange={handleChange}
          />
        </div>
        <FormField
          id="email"
          label="Email Address"
          type="email"
          placeholder="you@example.com"
          required
          value={form.email}
          onChange={handleChange}
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <FormSelect
            id="intake"
            label="Target Intake"
            options={intakeYears}
            required
            value={form.intake}
            onChange={handleChange}
          />
          <FormSelect
            id="program"
            label="Program of Interest"
            options={programs}
            required
            value={form.program}
            onChange={handleChange}
          />
        </div>
        <FormSelect
          id="budget"
          label="Annual Budget"
          options={budgets}
          required
          value={form.budget}
          onChange={handleChange}
        />

        <button
          type="submit"
          disabled={loading}
          className="mt-2 w-full py-4 rounded-xl bg-primary text-white font-semibold hover:bg-primary/90 transition-colors duration-200 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          {loading ? (
            <>
              <svg
                className="w-4 h-4 animate-spin"
                viewBox="0 0 24 24"
                fill="none"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="3"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                />
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
