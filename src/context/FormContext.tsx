"use client";

import {
  createContext,
  useContext,
  useState,
  ReactNode,
  useCallback,
  useRef,
} from "react";

type FormValue =
  | string
  | string[]
  | File
  | null
  | undefined
  | Array<Record<string, unknown>>;

type FormValues = Record<string, FormValue>;
type FormErrors = Record<string, string>;

interface FormContextType {
  values: FormValues;
  errors: FormErrors;
  setValue: (name: string, value: FormValue) => void;
  setFieldError: (name: string, error: string) => void;
  clearFieldError: (name: string) => void;
  resetForm: () => void;
  registerField: (name: string, validate: () => boolean) => void;
  unregisterField: (name: string) => void;
  validateAllFields: () => boolean;
  globalError: string;
  setGlobalError: (error: string) => void;
}

const FormContext = createContext<FormContextType | null>(null);

export function FormProvider({ children }: { children: ReactNode }) {
  const [values, setValues] = useState<FormValues>({});
  const [errors, setErrors] = useState<FormErrors>({});
  const [globalError, setGlobalError] = useState("");

  // Use useRef to store validators to avoid triggering re-renders
  const fieldValidatorsRef = useRef<Record<string, () => boolean>>({});

  // Memoize setValue to prevent unnecessary re-renders
  const setValue = useCallback((name: string, value: FormValue) => {
    setValues((prev) => ({ ...prev, [name]: value }));
  }, []);

  // Memoize setFieldError
  const setFieldError = useCallback((name: string, error: string) => {
    setErrors((prev) => ({ ...prev, [name]: error }));
  }, []);

  // Memoize clearFieldError
  const clearFieldError = useCallback((name: string) => {
    setErrors((prev) => {
      const newErrors = { ...prev };
      delete newErrors[name];
      return newErrors;
    });
  }, []);
  const resetForm = useCallback(() => {
    setValues({});
    setErrors({});
  }, []);

  // Use useRef instead of state to avoid triggering re-renders
  const registerField = useCallback((name: string, validate: () => boolean) => {
    fieldValidatorsRef.current[name] = validate;
  }, []);

  // Add unregisterField to clean up when fields unmount
  const unregisterField = useCallback((name: string) => {
    delete fieldValidatorsRef.current[name];
  }, []);

  const validateAllFields = useCallback(() => {
    let isValid = true;

    // Don't clear errors here - let each validator handle its own error state
    // Run all validators from the ref
    Object.entries(fieldValidatorsRef.current).forEach(([, validate]) => {
      const fieldIsValid = validate();
      if (!fieldIsValid) {
        isValid = false;
      }
    });

    return isValid;
  }, []);

  return (
    <FormContext.Provider
      value={{
        values,
        errors,
        setValue,
        setFieldError,
        clearFieldError,
        resetForm,
        registerField,
        unregisterField,
        validateAllFields,
        globalError,
        setGlobalError,
      }}
    >
      {children}
    </FormContext.Provider>
  );
}

export function useFormContext() {
  const context = useContext(FormContext);
  if (!context) {
    throw new Error("useFormContext must be used inside FormProvider");
  }
  return context;
}
