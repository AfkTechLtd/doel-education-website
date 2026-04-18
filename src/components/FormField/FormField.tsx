import { FieldLayout, FieldShell, FieldStatusIcon } from "./FieldPrimitives";
import { BaseField } from "./BaseField";

interface FormFieldProps {
  name: string;
  label: string;
  type?: string;
  placeholder?: string;
  error?: string;
  required?: boolean;
  optional?: boolean;
  disabled?: boolean;
  defaultValue?: string;
  showModified?: boolean;
  validate?: (value: string) => string | undefined;
}

export function FormField({
  name,
  label,
  type = "text",
  placeholder,
  error,
  required = false,
  optional = false,
  defaultValue,
  disabled = false,
  showModified = false,
  validate,
}: FormFieldProps) {
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
            <FieldShell state={fieldState} disabled={disabled} rightAddon={<FieldStatusIcon state={fieldState} />}>
              <input
                id={name}
                type={type}
                value={value}
                disabled={disabled}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
                onChange={handleChange}
                placeholder={placeholder ?? `Enter ${label.toLowerCase()}`}
                required={required}
                className="w-full bg-transparent px-5 py-4 font-inter text-sm text-slate-800 outline-none placeholder:text-slate-400 disabled:cursor-not-allowed"
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
