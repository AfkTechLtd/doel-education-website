import type { ReactNode } from "react";
import { AlertCircle, CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";

export type FieldVisualState = "default" | "success" | "error";

interface FieldLayoutProps {
  label: string;
  htmlFor: string;
  required?: boolean;
  optional?: boolean;
  error?: string;
  helperText?: string;
  counter?: ReactNode;
  children: ReactNode;
}

interface FieldShellProps {
  state?: FieldVisualState;
  disabled?: boolean;
  leftAddon?: ReactNode;
  rightAddon?: ReactNode;
  textarea?: boolean;
  className?: string;
  children: ReactNode;
}

export function FieldLayout({
  label,
  htmlFor,
  required,
  optional,
  error,
  helperText,
  counter,
  children,
}: FieldLayoutProps) {
  return (
    <div className="space-y-2.5">
      <div className="flex items-center justify-between gap-3">
        <label
          htmlFor={htmlFor}
          className="font-inter text-[11px] font-semibold uppercase tracking-[0.22em] text-slate-400"
        >
          {label}
          {required ? <span className="ml-1 text-red-500">*</span> : null}
          {optional ? (
            <span className="ml-2 text-[10px] font-medium tracking-[0.12em] text-slate-400">
              optional
            </span>
          ) : null}
        </label>

        {counter ? <div>{counter}</div> : null}
      </div>

      {children}

      {error ? (
        <p className="flex items-center gap-1.5 font-inter text-sm text-red-600">
          <AlertCircle className="h-4 w-4" strokeWidth={2} aria-hidden="true" />
          {error}
        </p>
      ) : helperText ? (
        <p className="font-inter text-sm text-slate-500">{helperText}</p>
      ) : null}
    </div>
  );
}

export function FieldShell({
  state = "default",
  disabled = false,
  leftAddon,
  rightAddon,
  textarea = false,
  className,
  children,
}: FieldShellProps) {
  return (
    <div
      className={cn(
        "group flex w-full overflow-hidden rounded-2xl border bg-slate-50 transition-all duration-200",
        textarea ? "items-start" : "items-center",
        state === "error"
          ? "border-red-300 bg-red-50/60 focus-within:border-red-400 focus-within:ring-4 focus-within:ring-red-100"
          : state === "success"
            ? "border-emerald-300 bg-emerald-50/60 focus-within:border-emerald-400 focus-within:ring-4 focus-within:ring-emerald-100"
            : "border-slate-200 hover:border-slate-300 focus-within:border-primary focus-within:bg-white focus-within:ring-4 focus-within:ring-primary/10",
        disabled && "cursor-not-allowed bg-slate-100 opacity-70",
        className,
      )}
    >
      {leftAddon ? (
        <div
          className={cn(
            "flex shrink-0 items-center border-r border-slate-200 px-4 text-slate-600",
            textarea && "pt-4",
          )}
        >
          {leftAddon}
        </div>
      ) : null}

      <div className="min-w-0 flex-1">{children}</div>

      {rightAddon ? (
        <div
          className={cn(
            "flex shrink-0 items-center gap-2 px-4 text-slate-400",
            textarea && "pt-4",
          )}
        >
          {rightAddon}
        </div>
      ) : null}
    </div>
  );
}

export function FieldStatusIcon({ state }: { state: FieldVisualState }) {
  if (state === "error") {
    return <AlertCircle className="h-4 w-4 text-red-500" strokeWidth={2} aria-hidden="true" />;
  }

  if (state === "success") {
    return <CheckCircle2 className="h-4 w-4 text-emerald-500" strokeWidth={2} aria-hidden="true" />;
  }

  return null;
}
