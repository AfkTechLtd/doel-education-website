"use client";

import { useRef, type ClipboardEvent, type KeyboardEvent } from "react";
import { cn } from "@/lib/utils";

interface OtpCodeInputProps {
  value: string;
  length?: number;
  invalid?: boolean;
  onChange: (value: string) => void;
}

export default function OtpCodeInput({
  value,
  length = 6,
  invalid = false,
  onChange,
}: OtpCodeInputProps) {
  const inputRefs = useRef<Array<HTMLInputElement | null>>([]);
  const digits = Array.from({ length }, (_, index) => value[index] ?? "");

  function focusInput(index: number) {
    inputRefs.current[index]?.focus();
    inputRefs.current[index]?.select();
  }

  function updateDigits(startIndex: number, rawValue: string) {
    const sanitized = rawValue.replace(/\D/g, "");
    if (!sanitized) {
      const nextDigits = [...digits];
      nextDigits[startIndex] = "";
      onChange(nextDigits.join(""));
      return;
    }

    const nextDigits = [...digits];
    let cursor = startIndex;

    for (const digit of sanitized) {
      if (cursor >= length) break;
      nextDigits[cursor] = digit;
      cursor += 1;
    }

    onChange(nextDigits.join(""));

    if (cursor < length) {
      focusInput(cursor);
    } else {
      focusInput(length - 1);
    }
  }

  function handleKeyDown(index: number, event: KeyboardEvent<HTMLInputElement>) {
    if (event.key === "Backspace" && !digits[index] && index > 0) {
      const nextDigits = [...digits];
      nextDigits[index - 1] = "";
      onChange(nextDigits.join(""));
      focusInput(index - 1);
      event.preventDefault();
    }

    if (event.key === "ArrowLeft" && index > 0) {
      focusInput(index - 1);
      event.preventDefault();
    }

    if (event.key === "ArrowRight" && index < length - 1) {
      focusInput(index + 1);
      event.preventDefault();
    }
  }

  function handlePaste(event: ClipboardEvent<HTMLInputElement>) {
    const pasted = event.clipboardData.getData("text");
    if (!pasted) return;

    event.preventDefault();
    updateDigits(0, pasted);
  }

  return (
    <div className="space-y-2.5">
      <div className="flex items-center justify-between gap-3">
        <label className="font-inter text-[11px] font-semibold uppercase tracking-[0.22em] text-slate-400">
          Verification Code
        </label>
        <span className="font-inter text-xs text-slate-400">{length} digits</span>
      </div>

      <div className="grid grid-cols-6 gap-3">
        {digits.map((digit, index) => (
          <input
            key={index}
            ref={(element) => {
              inputRefs.current[index] = element;
            }}
            inputMode="numeric"
            autoComplete={index === 0 ? "one-time-code" : "off"}
            maxLength={1}
            value={digit}
            onChange={(event) => updateDigits(index, event.target.value)}
            onKeyDown={(event) => handleKeyDown(index, event)}
            onPaste={handlePaste}
            className={cn(
              "h-14 w-full rounded-2xl border bg-slate-50 text-center font-inter text-lg font-semibold text-slate-900 outline-none transition-all duration-200",
              invalid
                ? "border-red-300 bg-red-50/60 focus:border-red-400 focus:ring-4 focus:ring-red-100"
                : "border-slate-200 hover:border-slate-300 focus:border-primary focus:bg-white focus:ring-4 focus:ring-primary/10",
            )}
            aria-label={`OTP digit ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
