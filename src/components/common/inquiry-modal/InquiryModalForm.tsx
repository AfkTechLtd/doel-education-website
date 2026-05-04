"use client";

import { useState, useCallback, type FormEvent } from "react";
import { Send, CheckCircle2, Loader2 } from "lucide-react";
import InquiryFormField from "./InquiryFormField";
import {
  inquiryFieldClassName,
  inquiryProgramOptions,
  inquiryTextareaClassName,
} from "./inquiryModal.constants";
import { submitInquiry } from "@/lib/api/inquiries";

/* ── Types ─────────────────────────────────────────────────────────────── */

type InquiryFormProps = {
  onClose: () => void;
};

type FormState = {
  studentName: string;
  phone: string;
  email: string;
  programInterest: string;
  message: string;
};

type FormErrors = Partial<Record<keyof FormState, string>>;

const INITIAL_FORM: FormState = {
  studentName: "",
  phone: "",
  email: "",
  programInterest: "",
  message: "",
};

/* ── Validation ────────────────────────────────────────────────────────── */

function validateForm(form: FormState): FormErrors {
  const errors: FormErrors = {};

  if (!form.studentName.trim()) {
    errors.studentName = "Full name is required";
  }

  if (!form.phone.trim()) {
    errors.phone = "Phone number is required";
  }

  if (!form.email.trim()) {
    errors.email = "Email is required";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
    errors.email = "Invalid email address";
  }

  if (!form.programInterest) {
    errors.programInterest = "Please select a program";
  }

  return errors;
}

/* ── Component ─────────────────────────────────────────────────────────── */

export default function InquiryModalForm({ onClose }: InquiryFormProps) {
  const [form, setForm] = useState<FormState>(INITIAL_FORM);
  const [errors, setErrors] = useState<FormErrors>({});
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);

  const handleChange = useCallback(
    (field: keyof FormState) =>
      (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const value = e.target.value;
        setForm((prev) => ({ ...prev, [field]: value }));
        setErrors((prev) => ({ ...prev, [field]: undefined }));
        setServerError(null);
      },
    [],
  );

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setServerError(null);

    const validationErrors = validateForm(form);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setLoading(true);

    try {
      await submitInquiry({
        studentName: form.studentName.trim(),
        phone: form.phone.trim(),
        email: form.email.trim(),
        programInterest: form.programInterest,
        message: form.message.trim() || undefined,
      });

      setSuccess(true);
      // Auto-close after 2.5 seconds
      setTimeout(() => {
        onClose();
      }, 2500);
    } catch (err) {
      const message = err instanceof Error ? err.message : "An unexpected error occurred.";
      setServerError(message);
    } finally {
      setLoading(false);
    }
  }

  if (success) {
    return (
      <div className="flex flex-col items-center gap-5 py-10 text-center">
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-emerald-50">
          <CheckCircle2 className="h-8 w-8 text-emerald-500" strokeWidth={2} />
        </div>
        <div className="space-y-1">
          <h4 className="font-poppins text-xl font-semibold text-slate-900">
            Inquiry sent!
          </h4>
          <p className="font-inter text-sm text-slate-500 max-w-xs mx-auto">
            We will get back to you within 24 hours.
          </p>
        </div>
        <p className="text-xs text-slate-400 font-inter">Closing automatically...</p>
      </div>
    );
  }

  return (
    <form
      className="grid grid-cols-1 gap-6 md:grid-cols-2"
      onSubmit={handleSubmit}
      noValidate
    >
      {serverError && (
        <div className="md:col-span-2 rounded-xl border border-red-200 bg-red-50 px-4 py-3 font-inter text-sm font-medium text-red-700">
          {serverError}
        </div>
      )}

      <InquiryFormField label="Full Name" error={errors.studentName}>
        <input
          type="text"
          className={inquiryFieldClassName}
          placeholder="John Doe"
          value={form.studentName}
          onChange={handleChange("studentName")}
        />
      </InquiryFormField>

      <InquiryFormField label="Phone Number" error={errors.phone}>
        <input
          type="tel"
          className={inquiryFieldClassName}
          placeholder="+880"
          value={form.phone}
          onChange={handleChange("phone")}
        />
      </InquiryFormField>

      <InquiryFormField label="Email" error={errors.email}>
        <input
          type="email"
          className={inquiryFieldClassName}
          placeholder="you@example.com"
          value={form.email}
          onChange={handleChange("email")}
        />
      </InquiryFormField>

      <InquiryFormField label="Program Interest" error={errors.programInterest}>
        <select
          className={inquiryFieldClassName}
          value={form.programInterest}
          onChange={handleChange("programInterest")}
        >
          <option value="" disabled>
            Select a program
          </option>
          {inquiryProgramOptions.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </InquiryFormField>

      <InquiryFormField label="Message (Optional)" className="md:col-span-2">
        <textarea
          className={inquiryTextareaClassName}
          placeholder="Tell us about your goals..."
          value={form.message}
          onChange={handleChange("message")}
        />
      </InquiryFormField>

      <button
        type="submit"
        disabled={loading}
        className="md:col-span-2 flex items-center justify-center gap-2 rounded-xl bg-primary px-8 py-4 font-bold text-white transition-all hover:bg-primary/90 shadow-lg shadow-blue-100 disabled:cursor-not-allowed disabled:opacity-70"
      >
        {loading ? (
          <>
            <Loader2 size={18} className="animate-spin" />
            Sending...
          </>
        ) : (
          <>
            <Send size={18} />
            Send Inquiry
          </>
        )}
      </button>
    </form>
  );
}
