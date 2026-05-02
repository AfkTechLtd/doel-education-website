"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useState, Suspense } from "react";
import { Mail, RefreshCw, CheckCircle2 } from "lucide-react";
import { createClient } from "@/lib/supabase/client";

function VerifyEmailBody() {
  const searchParams = useSearchParams();
  const email = searchParams.get("email") ?? "";
  const [resending, setResending] = useState(false);
  const [resent, setResent] = useState(false);
  const [resendError, setResendError] = useState<string | null>(null);

  async function handleResend() {
    if (!email) return;
    setResending(true);
    setResendError(null);

    try {
      const supabase = createClient();
      const { error } = await supabase.auth.resend({
        type: "signup",
        email,
        options: {
          emailRedirectTo: `${window.location.origin}/api/auth/callback`,
        },
      });

      if (error) {
        setResendError(error.message);
      } else {
        setResent(true);
      }
    } catch {
      setResendError("Failed to resend. Please try again.");
    } finally {
      setResending(false);
    }
  }

  return (
    <div className="flex flex-col items-center gap-6 py-8 text-center">
      {/* Icon */}
      <div className="flex h-20 w-20 items-center justify-center rounded-full bg-teal-50">
        <Mail className="h-9 w-9 text-primary" strokeWidth={1.5} />
      </div>

      {/* Heading */}
      <div className="space-y-2">
        <h1 className="font-poppins text-2xl font-semibold text-slate-900">
          Check your inbox
        </h1>
        <p className="font-inter text-sm leading-relaxed text-slate-500">
          We sent a verification link to{" "}
          {email ? (
            <span className="font-semibold text-slate-800">{email}</span>
          ) : (
            "your email address"
          )}
          . Click the link in the email to verify your account and access the student portal.
        </p>
      </div>

      {/* Resend section */}
      <div className="w-full rounded-2xl border border-slate-100 bg-slate-50 px-5 py-4">
        {resent ? (
          <div className="flex items-center justify-center gap-2 text-sm font-medium text-emerald-700">
            <CheckCircle2 className="h-4 w-4" />
            Verification email resent successfully.
          </div>
        ) : (
          <>
            <p className="font-inter text-xs text-slate-500">
              Didn&apos;t receive the email? Check your spam folder or
            </p>
            {resendError && (
              <p className="mt-1 font-inter text-xs text-red-600">{resendError}</p>
            )}
            <button
              type="button"
              onClick={handleResend}
              disabled={resending || !email}
              className="mt-2 inline-flex items-center gap-1.5 font-inter text-sm font-semibold text-primary transition-colors hover:text-primary/80 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {resending ? (
                <RefreshCw className="h-3.5 w-3.5 animate-spin" />
              ) : (
                <RefreshCw className="h-3.5 w-3.5" />
              )}
              {resending ? "Sending..." : "Resend verification email"}
            </button>
          </>
        )}
      </div>

      {/* Back to login */}
      <Link
        href="/login"
        className="font-inter text-sm font-semibold text-slate-500 transition-colors hover:text-slate-700"
      >
        Back to login
      </Link>
    </div>
  );
}

export default function VerifyEmailContent() {
  return (
    <Suspense fallback={<div className="py-16 text-center text-slate-400 text-sm">Loading...</div>}>
      <VerifyEmailBody />
    </Suspense>
  );
}
