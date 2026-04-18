"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { type FormEvent, useEffect, useState } from "react";
import { FormField } from "@/components/FormField/FormField";
import { FormProvider, useFormContext } from "@/context/FormContext";
import AuthCard from "./AuthCard";
import { clearRecoverySession, setRecoverySession } from "./auth-flow-storage";
import { validateEmail } from "./auth-utils";

function ForgotPasswordFormContent() {
  const router = useRouter();
  const { errors, values, validateAllFields } = useFormContext();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    clearRecoverySession();
  }, []);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!validateAllFields()) {
      return;
    }

    setLoading(true);

    window.setTimeout(() => {
      const email = typeof values.email === "string" ? values.email : "";
      setRecoverySession(email, "otp");
      router.push("/forgot-password/otp");
    }, 700);
  }

  return (
    <AuthCard
      topAction={
        <Link
          href="/login"
          onClick={clearRecoverySession}
          className="inline-flex items-center gap-2 font-inter text-sm font-semibold text-slate-600 transition-colors hover:text-slate-900"
        >
          <ArrowLeft className="h-4 w-4" strokeWidth={2} aria-hidden="true" />
          Back to login
        </Link>
      }
      title="Forgot password"
      description="Enter your email to receive a verification code."
    >
      <form className="space-y-5" onSubmit={handleSubmit}>
        <FormField
          name="email"
          label="Email Address"
          type="email"
          required
          error={errors.email}
          validate={validateEmail}
          placeholder="you@example.com"
        />

        <button
          type="submit"
          disabled={loading}
          className="flex w-full items-center justify-center gap-2 rounded-2xl bg-primary px-5 py-4 font-inter text-sm font-semibold text-white transition-colors duration-200 hover:bg-primary/90 disabled:cursor-not-allowed disabled:opacity-70"
        >
          {loading ? "Sending code..." : "Send verification code"}
        </button>
      </form>
    </AuthCard>
  );
}

export default function ForgotPasswordForm() {
  return (
    <FormProvider>
      <ForgotPasswordFormContent />
    </FormProvider>
  );
}
