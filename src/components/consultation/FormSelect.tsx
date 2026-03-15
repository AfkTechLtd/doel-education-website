interface FormSelectProps {
  id: string;
  label: string;
  options: string[];
  required?: boolean;
}

export default function FormSelect({ id, label, options, required }: FormSelectProps) {
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={id} className="text-sm font-medium text-slate-700 font-inter">
        {label}
      </label>
      <select
        id={id}
        name={id}
        required={required}
        defaultValue=""
        className="w-full px-4 py-2.5 rounded-lg border border-slate-200 text-sm text-slate-800 font-inter bg-white focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary hover:border-slate-300 transition-colors duration-150 appearance-none"
      >
        <option value="" disabled className="text-slate-400">Select an option</option>
        {options.map((opt) => (
          <option key={opt} value={opt}>{opt}</option>
        ))}
      </select>
    </div>
  );
}
