import { BaseField } from "./BaseField";
import { FieldLayout, FieldShell, FieldStatusIcon } from "./FieldPrimitives";

interface TextAreaFieldProps {
  name: string;
  label: string;
  placeholder?: string;
  error?: string;
  required?: boolean;
  optional?: boolean;
  defaultValue?: string;
  rows?: number;
  maxLength?: number;
  showModified?: boolean; // New prop to enable/disable edit highlighting
  validate?: (value: string) => string | undefined;
}

export function TextAreaField({
  name,
  label,
  placeholder,
  error,
  required = false,
  optional = false,
  defaultValue,
  rows = 4,
  maxLength,
  showModified = false, // Default to false
  validate,
}: TextAreaFieldProps) {
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
        isEdited,
        showModified,
        handleChange,
        setIsFocused,
      }) => {
        // Only show green highlight if showModified is true AND field is edited
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
            counter={
              maxLength ? (
                <span className="font-inter text-xs text-slate-400">
                  {value.length}/{maxLength}
                </span>
              ) : null
            }
          >
            <FieldShell
              state={fieldState}
              textarea
              rightAddon={<FieldStatusIcon state={fieldState} />}
            >
              <textarea
                id={name}
                value={value}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
                onChange={handleChange}
                placeholder={placeholder ?? `Write ${label.toLowerCase()}`}
                required={required}
                rows={rows}
                maxLength={maxLength}
                className="min-h-[140px] w-full resize-y bg-transparent px-5 py-4 font-inter text-sm text-slate-800 outline-none placeholder:text-slate-400"
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
