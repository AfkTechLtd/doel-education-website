import { ReactNode } from "react";
import { cn } from "@/lib/utils";

type InquiryFormFieldProps = {
  label: string;
  className?: string;
  children: ReactNode;
};

export default function InquiryFormField({
  label,
  className,
  children,
}: InquiryFormFieldProps) {
  return (
    <div className={cn("space-y-2", className)}>
      <label className="text-sm font-semibold text-slate-700">{label}</label>
      {children}
    </div>
  );
}
