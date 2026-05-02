"use client";

import Link from "next/link";
import { type FormEvent, useState } from "react";
import { CheckCircle2 } from "lucide-react";
import { FormProvider, useFormContext } from "@/context/FormContext";
import { FormField } from "@/components/FormField/FormField";
import { PasswordField } from "@/components/FormField/FormPasswordField";
import AuthCard from "./AuthCard";

// ─── Real auth imports (commented out — will be wired later) ────────────────
// import { validateEmail, validatePassword } from "./auth-utils";
// import { createClient } from "@/lib/supabase/client";

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
  // ─── Real auth hooks (commented out — will be wired later) ────────────────
  // const router = useRouter();

  const { errors, validateAllFields, values } = useFormContext();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  // ─── Server error state for real auth (commented out) ─────────────────────
  // const [serverError, setServerError] = useState<string | null>(null);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!validateAllFields()) {
      return;
    }

    // ─── Real auth flow (commented out — will be wired later) ───────────────
    // const name = String(values.name ?? "");
    // const email = String(values.email ?? "");
    // const password = String(values.password ?? "");
    //
    // setLoading(true);
    // setServerError(null);
    //
    // try {
    //   const supabase = createClient();
    //
    //   // 1. Sign up with Supabase Auth
    //   const { data, error: signUpError } = await supabase.auth.signUp({
    //     email,
    //     password,
    //     options: {
    //       data: { name },
    //     },
    //   });
    //
    //   if (signUpError) {
    //     setServerError(signUpError.message);
    //     return;
    //   }
    //
    //   if (!data.user) {
    //     setServerError("Registration failed. Please try again.");
    //     return;
    //   }
    //
    //   // 2. Create the User row in our database via Server Action
    //   const response = await fetch("/api/auth/register", {
    //     method: "POST",
    //     headers: { "Content-Type": "application/json" },
    //     body: JSON.stringify({
    //       supabaseId: data.user.id,
    //       email,
    //       name,
    //     }),
    //   });
    //
    //   if (!response.ok) {
    //     const body = await response.json().catch(() => ({}));
    //     setServerError(body.error ?? "Failed to complete registration.");
    //     return;
    //   }
    //
    //   router.push("/student");
    // } catch {
    //   setServerError("An unexpected error occurred. Please try again.");
    // } finally {
    //   setLoading(false);
    // }

    // ─── Simulated submit (UI-only, no API) ─────────────────────────────────
    setLoading(true);
    setSuccess(false);

    setTimeout(() => {
      setLoading(false);
      setSuccess(true);
    }, 1500);
  }

  if (success) {
    return (
      <AuthCard
        title="Create Account"
        description="Register as a student to begin your US study journey."
      >
        <div className="flex flex-col items-center gap-5 py-8 text-center">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-emerald-50">
            <CheckCircle2 className="h-8 w-8 text-emerald-500" strokeWidth={2} />
          </div>
          <div className="space-y-1">
            <h4 className="font-poppins text-xl font-semibold text-slate-900">
              Account created!
            </h4>
            <p className="font-inter text-sm text-slate-500">
              Your account has been created successfully.
            </p>
          </div>
          <Link
            href="/login"
            className="flex w-full items-center justify-center gap-2 rounded-2xl bg-primary px-5 py-4 font-inter text-sm font-semibold text-white transition-colors duration-200 hover:bg-primary/90"
          >
            Go to Login
          </Link>
        </div>
      </AuthCard>
    );
  }

  return (
    <AuthCard
      title="Create Account"
      description="Register as a student to begin your US study journey."
      // ─── Real auth banner (commented out) ──────────────────────────────────
      // banner={
      //   serverError ? (
      //     <p className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 font-inter text-sm font-medium text-red-700">
      //       {serverError}
      //     </p>
      //   ) : null
      // }
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
