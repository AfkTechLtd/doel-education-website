import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import { BaseField } from "./BaseField";
import { FieldLayout, FieldShell, FieldStatusIcon } from "./FieldPrimitives";

interface PasswordFieldProps {
  name: string;
  label: string;
  placeholder?: string;
  error?: string;
  required?: boolean;
  showModified?: boolean;
  validate?: (value: string) => string | undefined;
}

export function PasswordField({
  name,
  label,
  placeholder,
  error,
  required = false,
  showModified = false,
  validate,
}: PasswordFieldProps) {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <BaseField
      name={name}
      label={label}
      error={error}
      required={required}
      showModified={showModified}
      validate={validate}
    >
      {({
        value,
        hasError,
        hasValue,
        isEdited,
        handleChange,
        setIsFocused,
      }) => {
        const fieldState = hasError
          ? "error"
          : showModified && isEdited && hasValue
            ? "success"
            : "default";

        return (
          <FieldLayout label={label} htmlFor={name} required={required} error={error}>
            <FieldShell
              state={fieldState}
              rightAddon={
                <>
                  <FieldStatusIcon state={fieldState} />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="text-slate-400 transition-colors duration-200 hover:text-slate-700"
                    aria-label={showPassword ? "Hide password" : "Show password"}
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4" strokeWidth={2} />
                    ) : (
                      <Eye className="h-4 w-4" strokeWidth={2} />
                    )}
                  </button>
                </>
              }
            >
              <input
                id={name}
                type={showPassword ? "text" : "password"}
                value={value}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
                onChange={handleChange}
                placeholder={placeholder ?? "Enter your password"}
                required={required}
                className="w-full bg-transparent px-5 py-4 font-inter text-sm text-slate-800 outline-none placeholder:text-slate-400"
                aria-invalid={hasError}
                aria-describedby={hasError ? `${name}-error` : undefined}
              />
            </FieldShell>
          </FieldLayout>
        );
      }}
    </BaseField>
  );
}
