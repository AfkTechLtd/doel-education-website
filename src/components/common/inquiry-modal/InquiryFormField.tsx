import { ReactNode } from "react";
import { cn } from "@/lib/utils";

type InquiryFormFieldProps = {
  label: string;
  className?: string;
  error?: string;
  children: ReactNode;
};

export default function InquiryFormField({
  label,
  className,
  error,
  children,
}: InquiryFormFieldProps) {
  return (
    <div className={cn("space-y-1.5", className)}>
      <label className="text-sm font-semibold text-slate-700">{label}</label>
      {children}
      {error && (
        <p className="text-xs font-medium text-red-600 font-inter">{error}</p>
      )}
    </div>
  );
}
