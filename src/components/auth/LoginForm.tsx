"use client";

import Link from "next/link";
import { type FormEvent, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { FormProvider, useFormContext } from "@/context/FormContext";
import { FormField } from "@/components/FormField/FormField";
import { PasswordField } from "@/components/FormField/FormPasswordField";
import AuthCard from "./AuthCard";
import { consumeResetSuccess } from "./auth-flow-storage";
import { validateEmail } from "./auth-utils";

function LoginFormContent() {
  const router = useRouter();
  const { errors, validateAllFields } = useFormContext();
  const [loading, setLoading] = useState(false);
  const [resetSuccess, setResetSuccess] = useState(false);

  useEffect(() => {
    setResetSuccess(consumeResetSuccess());
  }, []);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!validateAllFields()) {
      return;
    }

    setLoading(true);

    window.setTimeout(() => {
      router.push("/");
    }, 700);
  }

  return (
    <AuthCard
      title="Login"
      description="Welcome back. Sign in with your email and password to continue."
      banner={
        resetSuccess ? (
          <p className="rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 font-inter text-sm font-medium text-emerald-700">
            Password updated successfully. Please log in.
          </p>
        ) : null
      }
    >
      <form className="space-y-5" onSubmit={handleSubmit}>
          <FormField
            name="email"
            label="Email Address"
            type="email"
            required
            error={errors.email}
            validate={validateEmail}
          />

          <PasswordField
            name="password"
            label="Password"
            required
            error={errors.password}
            validate={(value) =>
              value.trim() ? undefined : "Password is required"
            }
          />

          <div className="flex justify-end">
            <Link
              href="/forgot-password"
              className="font-inter text-sm font-semibold text-primary transition-colors hover:text-primary/80"
            >
              Forgot password?
            </Link>
          </div>

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
                Logging in...
              </>
            ) : (
              "Login"
            )}
          </button>
      </form>
    </AuthCard>
  );
}

export default function LoginForm() {
  return (
    <FormProvider>
      <LoginFormContent />
    </FormProvider>
  );
}
