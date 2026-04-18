"use client";

import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type ChangeEvent,
  type ReactNode,
} from "react";
import { useFormContext } from "../FormContext";

interface BaseFieldProps {
  name: string;
  label: string;
  error?: string;
  required?: boolean;
  optional?: boolean;
  defaultValue?: string;
  showModified?: boolean;
  validate?: (value: string) => string | undefined;
  children: (fieldState: {
    value: string;
    hasError: boolean;
    hasValue: boolean;
    isFocused: boolean;
    isOptional: boolean;
    isEdited: boolean;
    showModified: boolean;
    handleChange: (
      e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
    ) => void;
    handleValueChange: (value: string) => void;
    setIsFocused: (focused: boolean) => void;
  }) => ReactNode;
}

export function BaseField({
  name,
  label,
  error,
  required = false,
  optional = false,
  defaultValue = "",
  showModified = false, // Default to false
  validate,
  children,
}: BaseFieldProps) {
  const {
    values,
    setValue,
    setFieldError,
    clearFieldError,
    registerField,
    unregisterField,
  } = useFormContext();

  const rawValue = values[name];
  const value = typeof rawValue === "string" ? rawValue : defaultValue;
  const hasError = Boolean(error);
  const hasValue = Boolean(value);
  const isOptional = optional;
  const [isFocused, setIsFocused] = useState<boolean>(false);

  const [originalValue] = useState<unknown>(() => rawValue ?? defaultValue);
  const defaultSetRef = useRef(false);

  useEffect(() => {
    if (!defaultSetRef.current && defaultValue && values[name] === undefined) {
      setValue(name, defaultValue);
      defaultSetRef.current = true;
    } else if (!defaultSetRef.current) {
      defaultSetRef.current = true;
    }
  }, [name, defaultValue, setValue, values]);

  const currentValue = values[name] ?? defaultValue;
  const isEdited = (() => {
    if (Array.isArray(originalValue) && Array.isArray(currentValue)) {
      return (
        originalValue.length !== currentValue.length ||
        JSON.stringify([...originalValue].sort()) !==
          JSON.stringify([...currentValue].sort())
      );
    }

    return currentValue !== originalValue;
  })();

  // ✅ unified validator function
  const validateField = useCallback((nextValue?: string) => {
    const currentValue = nextValue ?? (values[name] || "");
    const stringValue = typeof currentValue === "string" ? currentValue : "";

    if (!currentValue && required) {
      setFieldError(name, `${label} is required`);
      return false;
    }

    if (validate && stringValue) {
      const validationError = validate(stringValue);
      if (validationError) {
        setFieldError(name, validationError);
        return false;
      }
    }

    clearFieldError(name);
    return true;
  }, [clearFieldError, label, name, required, setFieldError, validate, values]);

  // register for form-level validation
  useEffect(() => {
    registerField(name, validateField);
    return () => unregisterField(name);
  }, [name, registerField, unregisterField, validateField]);

  // ✅ Debounced validation on change
  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const newValue = e.target.value;
    setValue(name, newValue);

    // ✅ Revalidate on change if there was an error
    if (error) {
      validateField(newValue);
    }
  };

  const handleValueChange = (newValue: string) => {
    setValue(name, newValue);

    if (error) {
      validateField(newValue);
    }
  };

  const handleBlur = () => {
    setIsFocused(false);
    validateField();
  };

  return (
    <>
      {children({
        value,
        hasError,
        hasValue,
        isFocused,
        isOptional,
        isEdited,
        showModified,
        handleChange,
        handleValueChange,
        setIsFocused: (focused) => {
          setIsFocused(focused);
          if (!focused) handleBlur();
        },
      })}
    </>
  );
}
