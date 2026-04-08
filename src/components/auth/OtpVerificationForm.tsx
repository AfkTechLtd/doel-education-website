"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { type FormEvent, useEffect, useMemo, useState } from "react";
import AuthCard from "./AuthCard";
import {
  clearRecoverySession,
  getRecoverySession,
  updateRecoveryStep,
} from "./auth-flow-storage";
import OtpCodeInput from "./OtpCodeInput";
import { maskEmail, OTP_LENGTH } from "./auth-utils";

export default function OtpVerificationForm() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [sessionReady, setSessionReady] = useState(false);
  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [resent, setResent] = useState(false);

  const maskedEmail = useMemo(() => (email ? maskEmail(email) : "your email"), [email]);

  useEffect(() => {
    const session = getRecoverySession();

    if (!session?.email) {
      router.replace("/forgot-password");
      return;
    }

    if (session.step === "reset") {
      router.replace("/forgot-password/reset");
      return;
    }

    setEmail(session.email);
    setSessionReady(true);
  }, [router]);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!/^\d{6}$/.test(otp)) {
      setError(`Enter the ${OTP_LENGTH}-digit verification code.`);
      return;
    }

    setError("");
    setLoading(true);

    window.setTimeout(() => {
      updateRecoveryStep("reset");
      router.push("/forgot-password/reset");
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
      title="Enter OTP"
      description="Enter the 6-digit code to continue."
      contextNote={`Code sent to ${maskedEmail}`}
      footer={
        <div className="flex items-center justify-between gap-3">
          <Link
            href="/forgot-password"
            onClick={clearRecoverySession}
            className="font-inter text-sm font-semibold text-primary transition-colors hover:text-primary/80"
          >
            Change email
          </Link>
          <button
            type="button"
            onClick={() => {
              setResent(true);
              setError("");
            }}
            className="font-inter text-sm font-semibold text-slate-600 transition-colors hover:text-slate-900"
          >
            Resend code
          </button>
        </div>
      }
    >
      <form className="space-y-5" onSubmit={handleSubmit}>
        <OtpCodeInput
          value={otp}
          length={OTP_LENGTH}
          invalid={Boolean(error)}
          onChange={(value) => {
            setOtp(value);
            if (error) {
              setError("");
            }
          }}
        />

        {error ? (
          <p className="font-inter text-sm text-red-600">{error}</p>
        ) : resent ? (
          <p className="font-inter text-sm text-emerald-600">
            A fresh verification code has been sent.
          </p>
        ) : null}

        <button
          type="submit"
          disabled={loading}
          className="flex w-full items-center justify-center gap-2 rounded-2xl bg-primary px-5 py-4 font-inter text-sm font-semibold text-white transition-colors duration-200 hover:bg-primary/90 disabled:cursor-not-allowed disabled:opacity-70"
        >
          {loading ? "Verifying..." : "Verify code"}
        </button>
      </form>
    </AuthCard>
  );
}
