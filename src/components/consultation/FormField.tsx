import type { ChangeEvent } from "react";

interface FormFieldProps {
  id: string;
  label: string;
  type: string;
  placeholder?: string;
  required?: boolean;
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

export default function FormField({ id, label, type, placeholder, required, value, onChange }: FormFieldProps) {
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={id} className="text-sm font-semibold text-gray-700">
        {label}
      </label>
      <input
        id={id}
        name={id}
        type={type}
        placeholder={placeholder}
        required={required}
        value={value}
        onChange={onChange}
        className="w-full px-4 py-2.5 rounded-lg border border-gray-200 text-sm text-slate-800 placeholder:text-gray-400 focus:outline-none focus:border-primary hover:border-gray-300 transition-colors duration-150"
      />
    </div>
  );
}
