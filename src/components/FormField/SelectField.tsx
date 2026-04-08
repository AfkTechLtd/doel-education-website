import { ChevronDown } from "lucide-react";
import { BaseField } from "./BaseField";
import { FieldLayout, FieldShell, FieldStatusIcon } from "./FieldPrimitives";

interface SelectOption {
  value: string;
  label: string;
}

interface SelectFieldProps {
  name: string;
  label: string;
  options: SelectOption[];
  placeholder?: string;
  error?: string;
  required?: boolean;
  optional?: boolean;
  defaultValue?: string;
  showModified?: boolean; // ✅ Added
  validate?: (value: string) => string | undefined;
}

export function SelectField({
  name,
  label,
  options,
  placeholder = "Select an option",
  error,
  required = false,
  optional = false,
  defaultValue,
  showModified = false, // ✅ Added
  validate,
}: SelectFieldProps) {
  return (
    <BaseField
      name={name}
      label={label}
      error={error}
      required={required}
      optional={optional}
      defaultValue={defaultValue}
      showModified={showModified}
      validate={validate}
    >
      {({
        value,
        hasError,
        hasValue,
        isOptional,
        isEdited, // ✅ get this from BaseField
        showModified,
        handleChange,
        setIsFocused,
      }) => {
        const fieldState = hasError
          ? "error"
          : showModified && isEdited && hasValue
            ? "success"
            : "default";

        return (
          <FieldLayout
            label={label}
            htmlFor={name}
            required={required}
            optional={isOptional && !required}
            error={error}
          >
            <FieldShell
              state={fieldState}
              rightAddon={
                <>
                  <FieldStatusIcon state={fieldState} />
                  <ChevronDown className="h-4 w-4 text-slate-400" strokeWidth={2} aria-hidden="true" />
                </>
              }
            >
              <select
                id={name}
                value={value || ""}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
                onChange={handleChange}
                required={required}
                className="w-full cursor-pointer appearance-none bg-transparent px-5 py-4 font-inter text-sm text-slate-800 outline-none"
                aria-invalid={hasError}
                aria-describedby={hasError ? `${name}-error` : undefined}
              >
                <option value="" disabled>
                  {placeholder}
                </option>
                {options.map((option) => (
                  <option
                    key={option.value}
                    value={option.value}
                    className="text-neutral-13"
                  >
                    {option.label}
                  </option>
                ))}
              </select>
            </FieldShell>
          </FieldLayout>
        );
      }}
    </BaseField>
  );
}
