import { ChevronDown } from "lucide-react";
import { BaseField } from "./BaseField";
import { useState } from "react";
import { FieldLayout, FieldShell, FieldStatusIcon } from "./FieldPrimitives";

interface CountryCode {
  code: string;
  country: string;
}

interface PhoneFieldProps {
  name: string;
  label: string;
  error?: string;
  required?: boolean;
  optional?: boolean;
  defaultValue?: string;
  defaultCountryCode?: string;
  showModified?: boolean; // New prop to enable/disable edit highlighting
  validate?: (value: string) => string | undefined;
}

const countryCodes: CountryCode[] = [
  { code: "+880", country: "Bangladesh" },
  { code: "+91", country: "India" },
  { code: "+1", country: "United States" },
];

export function PhoneField({
  name,
  label,
  error,
  required = false,
  optional = false,
  defaultValue,
  defaultCountryCode = "+880",
  showModified = false, // Default to false
  validate,
}: PhoneFieldProps) {
  const [countryCode, setCountryCode] = useState(defaultCountryCode);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

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
        handleValueChange,
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
            helperText="Choose a country code, then enter digits only."
          >
            <div className="relative">
              <FieldShell
                state={fieldState}
                rightAddon={<FieldStatusIcon state={fieldState} />}
                leftAddon={
                  <div className="relative">
                    <button
                      type="button"
                      onClick={() => setIsDropdownOpen((prev) => !prev)}
                      className="flex items-center gap-2 font-inter text-sm font-medium text-slate-700"
                    >
                      <span>{countryCode}</span>
                      <ChevronDown
                        className={`h-4 w-4 text-slate-400 transition-transform ${isDropdownOpen ? "rotate-180" : ""}`}
                        strokeWidth={2}
                        aria-hidden="true"
                      />
                    </button>
                  </div>
                }
              >
                <input
                  id={name}
                  type="tel"
                  value={value}
                  onFocus={() => setIsFocused(true)}
                  onBlur={() => setIsFocused(false)}
                  onChange={(event) => {
                    const numericValue = event.target.value.replace(/[^0-9]/g, "");
                    handleValueChange(numericValue);
                  }}
                  placeholder="1712345678"
                  required={required}
                  className="w-full bg-transparent px-5 py-4 font-inter text-sm text-slate-800 outline-none placeholder:text-slate-400"
                  aria-invalid={hasError}
                  aria-describedby={hasError ? `${name}-error` : undefined}
                  maxLength={15}
                />
              </FieldShell>

              {isDropdownOpen ? (
                <div className="absolute left-0 top-[calc(100%+0.5rem)] z-20 w-60 rounded-2xl border border-slate-200 bg-white p-2 shadow-xl shadow-slate-200/60">
                  {countryCodes.map((country) => (
                    <button
                      key={country.code}
                      type="button"
                      onClick={() => {
                        setCountryCode(country.code);
                        setIsDropdownOpen(false);
                      }}
                      className="flex w-full items-center justify-between rounded-xl px-3 py-2 text-left transition-colors hover:bg-slate-50"
                    >
                      <div>
                        <p className="font-inter text-sm font-medium text-slate-800">
                          {country.country}
                        </p>
                        <p className="font-inter text-xs text-slate-500">
                          {country.code}
                        </p>
                      </div>
                      <span className="font-inter text-xs font-semibold uppercase tracking-[0.16em] text-slate-400">
                        {countryCode === country.code ? "Selected" : "Use"}
                      </span>
                    </button>
                  ))}
                </div>
              ) : null}
            </div>
          </FieldLayout>
        );
      }}
    </BaseField>
  );
}
