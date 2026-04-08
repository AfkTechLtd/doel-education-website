"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { type FormEvent, useEffect, useMemo, useState } from "react";
import { PasswordField } from "@/components/FormField/FormPasswordField";
import { FormProvider, useFormContext } from "@/context/FormContext";
import AuthCard from "./AuthCard";
import {
  clearRecoverySession,
  getRecoverySession,
  markResetSuccess,
} from "./auth-flow-storage";
import { maskEmail, MIN_PASSWORD_LENGTH, validatePassword } from "./auth-utils";

function ResetPasswordFormContent() {
  const router = useRouter();
  const { errors, values, validateAllFields } = useFormContext();
  const [email, setEmail] = useState("");
  const [sessionReady, setSessionReady] = useState(false);
  const [loading, setLoading] = useState(false);

  const maskedEmail = useMemo(() => (email ? maskEmail(email) : "your account"), [email]);

  useEffect(() => {
    const session = getRecoverySession();

    if (!session?.email) {
      router.replace("/forgot-password");
      return;
    }

    if (session.step !== "reset") {
      router.replace("/forgot-password/otp");
      return;
    }

    setEmail(session.email);
    setSessionReady(true);
  }, [router]);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!validateAllFields()) {
      return;
    }

    setLoading(true);

    window.setTimeout(() => {
      clearRecoverySession();
      markResetSuccess();
      router.push("/login");
    }, 700);
  }

  if (!sessionReady) {
    return null;
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
      title="Set a new password"
      description={`Create a new password with at least ${MIN_PASSWORD_LENGTH} characters.`}
      contextNote={`Resetting password for ${maskedEmail}`}
    >
      <form className="space-y-5" onSubmit={handleSubmit}>
        <PasswordField
          name="newPassword"
          label="New Password"
          required
          error={errors.newPassword}
          placeholder="Enter a new password"
          validate={validatePassword}
        />

        <PasswordField
          name="confirmPassword"
          label="Confirm Password"
          required
          error={errors.confirmPassword}
          placeholder="Re-enter your password"
          validate={(value) => {
            if (!value.trim()) return "Confirm your password";
            const newPassword =
              typeof values.newPassword === "string" ? values.newPassword : "";
            if (value !== newPassword) return "Passwords do not match";
            return undefined;
          }}
        />

        <button
          type="submit"
          disabled={loading}
          className="flex w-full items-center justify-center gap-2 rounded-2xl bg-primary px-5 py-4 font-inter text-sm font-semibold text-white transition-colors duration-200 hover:bg-primary/90 disabled:cursor-not-allowed disabled:opacity-70"
        >
          {loading ? "Saving password..." : "Save new password"}
        </button>
      </form>
    </AuthCard>
  );
}

export default function ResetPasswordForm() {
  return (
    <FormProvider>
      <ResetPasswordFormContent />
    </FormProvider>
  );
}
