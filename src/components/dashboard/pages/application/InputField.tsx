// src/components/dashboard/pages/application/InputField.tsx
interface InputProps {
    label: string;
    name: string; // Added to identify which field is changing
    value?: string;
    placeholder?: string;
    type?: string;
    error?: string;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const InputField = ({ value, label, placeholder, name, type = "text", onChange, error }: InputProps) => (
    <div className="space-y-2">
        <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400 ml-1">
            {label}
        </label>
        <input
            name={name}
            type={type}
            placeholder={placeholder}
            value={value || ""}
            onChange={onChange}
            className="w-full px-5 py-4 bg-slate-50 border-none rounded-2xl focus:ring-2 focus:ring-teal-500 transition-all outline-none"
        />
        {error && (
            <p className="text-[10px] font-bold text-red-500 ml-1 animate-in fade-in slide-in-from-top-1">
                {error}
            </p>
        )}
    </div>
);

export default InputField;
