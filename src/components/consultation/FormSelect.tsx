import { ChevronDown } from "lucide-react";
import type { ChangeEvent } from "react";

interface FormSelectProps {
  id: string;
  label: string;
  options: string[];
  required?: boolean;
  value: string;
  onChange: (e: ChangeEvent<HTMLSelectElement>) => void;
}

export default function FormSelect({ id, label, options, required, value, onChange }: FormSelectProps) {
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={id} className="text-sm font-semibold text-gray-700">
        {label}
      </label>
      <div className="relative">
        <select
          id={id}
          name={id}
          required={required}
          value={value}
          onChange={onChange}
          className="w-full px-4 py-2.5 pr-10 rounded-lg border border-gray-200 text-sm text-slate-800 bg-white focus:outline-none focus:border-primary hover:border-gray-300 transition-colors duration-150 appearance-none cursor-pointer"
        >
          <option value="" disabled className="text-gray-400">Select an option</option>
          {options.map((opt) => (
            <option key={opt} value={opt}>{opt}</option>
          ))}
        </select>
        <ChevronDown
          className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400"
          strokeWidth={2}
        />
      </div>
    </div>
  );
}
