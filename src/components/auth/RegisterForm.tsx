"use client";

import Link from "next/link";
import { type FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { FormProvider, useFormContext } from "@/context/FormContext";
import { FormField } from "@/components/FormField/FormField";
import { PasswordField } from "@/components/FormField/FormPasswordField";
import AuthCard from "./AuthCard";
import { createClient } from "@/lib/supabase/client";

function validateEmail(value: string): string | undefined {
  const trimmed = value.trim();
  if (!trimmed) return "Email is required";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed)) return "Invalid email address";
  return undefined;
}

function validatePassword(value: string): string | undefined {
  if (!value.trim()) return "Password is required";
  if (value.trim().length < 6) return "Password must be at least 6 characters";
  return undefined;
}

function validateName(value: string): string | undefined {
  if (!value.trim()) return "Full name is required";
  if (value.trim().length < 2) return "Name must be at least 2 characters";
  return undefined;
}

function validatePhone(value: string): string | undefined {
  if (!value.trim()) return "Phone number is required";
  if (!/\d{7,}/.test(value)) return "Phone must contain at least 7 digits";
  return undefined;
}

function RegisterFormContent() {
  const router = useRouter();
  const { errors, validateAllFields, values } = useFormContext();
  const [loading, setLoading] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!validateAllFields()) {
      return;
    }

    const name = String(values.name ?? "");
    const email = String(values.email ?? "");
    const phone = String(values.phone ?? "");
    const password = String(values.password ?? "");

    setLoading(true);
    setServerError(null);

    try {
      const supabase = createClient();

      const { data, error: signUpError } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: { name, phone },
          emailRedirectTo: `${window.location.origin}/api/auth/callback`,
        },
      });

      if (signUpError) {
        setServerError(signUpError.message);
        return;
      }

      if (!data.user) {
        setServerError("Registration failed. Please try again.");
        return;
      }

      // Create the Prisma user record immediately
      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          supabaseId: data.user.id,
          email,
          name,
          phone,
        }),
      });

      if (!response.ok) {
        const body = await response.json().catch(() => ({}));
        setServerError(body.error ?? "Failed to complete registration. Please try again.");
        return;
      }

      // Redirect to the email verification page
      router.push(`/verify-email?email=${encodeURIComponent(email)}`);
    } catch {
      setServerError("An unexpected error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <AuthCard
      title="Create Account"
      description="Register as a student to begin your US study journey."
      banner={
        serverError ? (
          <p className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 font-inter text-sm font-medium text-red-700">
            {serverError}
          </p>
        ) : null
      }
      footer={
        <p className="text-center font-inter text-sm text-slate-500">
          Already have an account?{" "}
          <Link
            href="/login"
            className="font-semibold text-primary transition-colors hover:text-primary/80"
          >
            Log in
          </Link>
        </p>
      }
    >
      <form className="space-y-5" onSubmit={handleSubmit}>
        <FormField
          name="name"
          label="Full Name"
          type="text"
          required
          error={errors.name}
          validate={validateName}
        />

        <FormField
          name="email"
          label="Email Address"
          type="email"
          required
          error={errors.email}
          validate={validateEmail}
        />

        <FormField
          name="phone"
          label="Phone Number"
          type="tel"
          required
          error={errors.phone}
          validate={validatePhone}
        />

        <PasswordField
          name="password"
          label="Password"
          required
          error={errors.password}
          validate={validatePassword}
        />

        <button
          type="submit"
          disabled={loading}
          className="mt-3 flex w-full items-center justify-center gap-2 rounded-2xl bg-primary px-5 py-4 font-inter text-sm font-semibold text-white transition-colors duration-200 hover:bg-primary/90 disabled:cursor-not-allowed disabled:opacity-70"
        >
          {loading ? (
            <>
              <svg
                className="h-4 w-4 animate-spin"
                viewBox="0 0 24 24"
                fill="none"
                aria-hidden="true"
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
              Creating account...
            </>
          ) : (
            "Create Account"
          )}
        </button>
      </form>
    </AuthCard>
  );
}

export default function RegisterForm() {
  return (
    <FormProvider>
      <RegisterFormContent />
    </FormProvider>
  );
}
