import { Calendar } from "lucide-react";
import { BaseField } from "./BaseField";
import { FieldLayout, FieldShell, FieldStatusIcon } from "./FieldPrimitives";

interface DateFieldProps {
  name: string;
  label: string;
  error?: string;
  required?: boolean;
  optional?: boolean;
  defaultValue?: string;
  minDate?: string;
  maxDate?: string;
  showModified?: boolean;
  validate?: (value: string) => string | undefined;
}

export function DateField({
  name,
  label,
  error,
  required = false,
  optional = false,
  defaultValue,
  minDate,
  maxDate,
  showModified = false,
  validate,
}: DateFieldProps) {
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
        handleChange,
        setIsFocused,
        showModified,
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
                  <Calendar className="h-4 w-4 text-slate-400" strokeWidth={2} aria-hidden="true" />
                </>
              }
            >
              <input
                id={name}
                type="date"
                value={value}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
                onChange={handleChange}
                min={minDate}
                max={maxDate}
                required={required}
                className="w-full cursor-pointer bg-transparent px-5 py-4 font-inter text-sm text-slate-800 outline-none
                [&::-webkit-calendar-picker-indicator]:absolute
                [&::-webkit-calendar-picker-indicator]:right-0
                [&::-webkit-calendar-picker-indicator]:w-full
                [&::-webkit-calendar-picker-indicator]:h-full
                [&::-webkit-calendar-picker-indicator]:opacity-0
                [&::-webkit-calendar-picker-indicator]:cursor-pointer"
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
