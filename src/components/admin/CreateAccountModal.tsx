"use client";

import { useState, useTransition, useRef, useEffect } from "react";
import { X, UserPlus, Loader2, Eye, EyeOff } from "lucide-react";
import { createAccount } from "@/actions/admin";

interface Props {
  open: boolean;
  onClose: () => void;
}

const ROLE_OPTIONS = [
  {
    value: "STUDENT",
    label: "Student",
    description: "Access to the student portal and application tracker",
  },
  {
    value: "COUNSELOR",
    label: "Counselor",
    description: "Access to the counselor portal and student management",
  },
] as const;

export default function CreateAccountModal({ open, onClose }: Props) {
  const [role, setRole] = useState<"STUDENT" | "COUNSELOR">("STUDENT");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [isPending, startTransition] = useTransition();
  const nameRef = useRef<HTMLInputElement>(null);

  // Focus name field when modal opens
  useEffect(() => {
    if (open) {
      setTimeout(() => nameRef.current?.focus(), 50);
    }
  }, [open]);

  // Reset form on close
  function handleClose() {
    if (isPending) return;
    setName("");
    setEmail("");
    setPassword("");
    setRole("STUDENT");
    setError(null);
    setSuccess(false);
    setShowPassword(false);
    onClose();
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    if (!name.trim() || !email.trim() || !password) {
      setError("All fields are required.");
      return;
    }
    if (password.length < 8) {
      setError("Password must be at least 8 characters.");
      return;
    }

    startTransition(async () => {
      const res = await createAccount({ name: name.trim(), email: email.trim(), password, role });
      if (res.success) {
        setSuccess(true);
        // Auto-close after brief confirmation
        setTimeout(() => handleClose(), 1200);
      } else {
        setError(res.error ?? "Something went wrong.");
      }
    });
  }

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-labelledby="create-account-title"
    >
      <div className="w-full max-w-md rounded-3xl border border-slate-200 bg-white shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-100 px-6 py-5">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary/10">
              <UserPlus className="h-4.5 w-4.5 text-primary" />
            </div>
            <h2
              id="create-account-title"
              className="font-poppins text-base font-semibold text-slate-900"
            >
              Create Account
            </h2>
          </div>
          <button
            type="button"
            onClick={handleClose}
            disabled={isPending}
            aria-label="Close dialog"
            className="rounded-lg p-1.5 text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-700 disabled:opacity-40"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Body */}
        <form onSubmit={handleSubmit} noValidate className="space-y-5 px-6 py-5">
          {/* Role selector */}
          <fieldset>
            <legend className="mb-2 font-inter text-xs font-semibold uppercase tracking-widest text-slate-400">
              Account type
            </legend>
            <div className="grid grid-cols-2 gap-3">
              {ROLE_OPTIONS.map((opt) => (
                <label
                  key={opt.value}
                  className={`flex cursor-pointer flex-col gap-0.5 rounded-2xl border p-3.5 transition-all ${
                    role === opt.value
                      ? "border-primary bg-primary/5 ring-1 ring-primary/30"
                      : "border-slate-200 bg-slate-50 hover:border-slate-300"
                  }`}
                >
                  <input
                    type="radio"
                    name="role"
                    value={opt.value}
                    checked={role === opt.value}
                    onChange={() => setRole(opt.value)}
                    className="sr-only"
                  />
                  <span className="font-inter text-sm font-semibold text-slate-900">
                    {opt.label}
                  </span>
                  <span className="font-inter text-[11px] leading-snug text-slate-500">
                    {opt.description}
                  </span>
                </label>
              ))}
            </div>
          </fieldset>

          {/* Name */}
          <div>
            <label
              htmlFor="create-name"
              className="mb-1.5 block font-inter text-xs font-semibold uppercase tracking-widest text-slate-400"
            >
              Full name
            </label>
            <input
              ref={nameRef}
              id="create-name"
              type="text"
              autoComplete="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Rafi Ahmed"
              disabled={isPending}
              className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 font-inter text-sm text-slate-900 placeholder:text-slate-400 focus:border-primary/40 focus:outline-none focus:ring-2 focus:ring-primary/15 disabled:opacity-50"
            />
          </div>

          {/* Email */}
          <div>
            <label
              htmlFor="create-email"
              className="mb-1.5 block font-inter text-xs font-semibold uppercase tracking-widest text-slate-400"
            >
              Email address
            </label>
            <input
              id="create-email"
              type="email"
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="e.g. rafi@example.com"
              disabled={isPending}
              className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 font-inter text-sm text-slate-900 placeholder:text-slate-400 focus:border-primary/40 focus:outline-none focus:ring-2 focus:ring-primary/15 disabled:opacity-50"
            />
          </div>

          {/* Password */}
          <div>
            <label
              htmlFor="create-password"
              className="mb-1.5 block font-inter text-xs font-semibold uppercase tracking-widest text-slate-400"
            >
              Temporary password
            </label>
            <div className="relative">
              <input
                id="create-password"
                type={showPassword ? "text" : "password"}
                autoComplete="new-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Min. 8 characters"
                disabled={isPending}
                className="w-full rounded-xl border border-slate-200 bg-slate-50 py-2.5 pl-4 pr-10 font-inter text-sm text-slate-900 placeholder:text-slate-400 focus:border-primary/40 focus:outline-none focus:ring-2 focus:ring-primary/15 disabled:opacity-50"
              />
              <button
                type="button"
                onClick={() => setShowPassword((v) => !v)}
                tabIndex={-1}
                aria-label={showPassword ? "Hide password" : "Show password"}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
              >
                {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
            <p className="mt-1 font-inter text-[11px] text-slate-400">
              Share this with the user. They can change it after logging in.
            </p>
          </div>

          {/* Error */}
          {error && (
            <p
              role="alert"
              className="rounded-xl border border-red-200 bg-red-50 px-4 py-2.5 font-inter text-xs font-medium text-red-700"
            >
              {error}
            </p>
          )}

          {/* Success */}
          {success && (
            <p
              role="status"
              className="rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-2.5 font-inter text-xs font-medium text-emerald-700"
            >
              Account created successfully!
            </p>
          )}

          {/* Actions */}
          <div className="flex items-center justify-end gap-3 pt-1">
            <button
              type="button"
              onClick={handleClose}
              disabled={isPending}
              className="rounded-xl border border-slate-200 px-4 py-2 font-inter text-sm font-medium text-slate-600 transition-colors hover:bg-slate-50 disabled:opacity-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isPending || success}
              className="flex items-center gap-2 rounded-xl bg-primary px-5 py-2 font-inter text-sm font-semibold text-white shadow-sm transition-opacity hover:opacity-90 disabled:opacity-50"
            >
              {isPending && <Loader2 className="h-3.5 w-3.5 animate-spin" />}
              {isPending ? "Creating…" : "Create Account"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
