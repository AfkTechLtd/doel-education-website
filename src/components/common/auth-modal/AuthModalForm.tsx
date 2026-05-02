"use client";

import { type FormEvent, useEffect, useState } from "react";
import Link from "next/link";
import { CheckCircle2 } from "lucide-react";
import { FormProvider, useFormContext } from "@/context/FormContext";
import { FormField } from "@/components/FormField/FormField";
import { PasswordField } from "@/components/FormField/FormPasswordField";
import { useAuthModal } from "./AuthModalProvider";

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

type AuthModalFormProps = {
  onClose: () => void;
};

function AuthModalFormContent({ onClose }: AuthModalFormProps) {
  const { view, toggleView } = useAuthModal();
  const { errors, validateAllFields, values, resetForm } = useFormContext();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const isLogin = view === "login";

  // Reset form whenever the view switches or modal re-opens
  useEffect(() => {
    resetForm();
    setSuccess(false);
    setLoading(false);
  }, [view, resetForm]);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!validateAllFields()) {
      return;
    }

    setLoading(true);
    setSuccess(false);

    // Simulate network delay — no API call
    setTimeout(() => {
      setLoading(false);
      setSuccess(true);
    }, 1500);
  }

  if (success) {
    return (
      <div className="flex flex-col items-center gap-5 py-8 text-center">
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-emerald-50">
          <CheckCircle2 className="h-8 w-8 text-emerald-500" strokeWidth={2} />
        </div>
        <div className="space-y-1">
          <h4 className="font-poppins text-xl font-semibold text-slate-900">
            {isLogin ? "Welcome back!" : "Account created!"}
          </h4>
          <p className="font-inter text-sm text-slate-500">
            {isLogin
              ? "You have successfully signed in."
              : "Your account has been created successfully."}
          </p>
        </div>
        <button
          type="button"
          onClick={onClose}
          className="flex w-full items-center justify-center gap-2 rounded-2xl bg-primary px-5 py-4 font-inter text-sm font-semibold text-white transition-colors duration-200 hover:bg-primary/90"
        >
          Close
        </button>
      </div>
    );
  }

  return (
    <form className="space-y-5" onSubmit={handleSubmit}>
      {!isLogin && (
        <FormField
          name="name"
          label="Full Name"
          type="text"
          required
          error={errors.name}
          validate={validateName}
        />
      )}

      <FormField
        name="email"
        label="Email Address"
        type="email"
        required
        error={errors.email}
        validate={validateEmail}
      />

      {!isLogin && (
        <FormField
          name="phone"
          label="Phone Number"
          type="tel"
          required
          error={errors.phone}
          validate={validatePhone}
        />
      )}

      <PasswordField
        name="password"
        label="Password"
        required
        error={errors.password}
        validate={validatePassword}
      />

      {isLogin && (
        <div className="flex justify-end">
          <Link
            href="/forgot-password"
            target="_blank"
            className="font-inter text-sm font-semibold text-primary transition-colors hover:text-primary/80"
          >
            Forgot password?
          </Link>
        </div>
      )}

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
            {isLogin ? "Logging in..." : "Creating account..."}
          </>
        ) : isLogin ? (
          "Login"
        ) : (
          "Create Account"
        )}
      </button>

      <p className="text-center text-sm text-slate-500">
        {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
        <button
          type="button"
          onClick={toggleView}
          className="font-semibold text-primary transition-colors hover:text-primary/80"
        >
          {isLogin ? "Register" : "Log in"}
        </button>
      </p>
    </form>
  );
}

export default function AuthModalForm({ onClose }: AuthModalFormProps) {
  return (
    <FormProvider>
      <AuthModalFormContent onClose={onClose} />
    </FormProvider>
  );
}
