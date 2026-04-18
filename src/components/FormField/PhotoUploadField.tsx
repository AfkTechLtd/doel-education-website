import { Upload, X, Image as ImageIcon } from "lucide-react";
import { useState, useRef, useEffect, type ChangeEvent, type MouseEvent } from "react";
import { useFormContext } from "../FormContext";
import { FieldLayout } from "./FieldPrimitives";

// Runtime-safe guard for File without assuming global File exists at build/SSR
const isFile = (val: unknown): val is File =>
  typeof File !== "undefined" && val instanceof File;

interface PhotoUploadFieldProps {
  name: string;
  label: string;
  error?: string;
  required?: boolean;
  optional?: boolean;
  defaultValue?: string | File;
  maxSizeMB?: number;
  acceptedFormats?: string[];
  onPhotoChange?: (file: File | null, previewUrl?: string | null) => void;
}

export function PhotoUploadField({
  name,
  label,
  error,
  required = false,
  optional = false,
  defaultValue,
  maxSizeMB = 1,
  acceptedFormats = ["image/jpeg", "image/png", "image/jpg", "image/webp"],
  onPhotoChange,
}: PhotoUploadFieldProps) {
  const {
    values,
    errors,
    setValue,
    setFieldError,
    clearFieldError,
    registerField,
    unregisterField,
  } = useFormContext();
  const initialPreview: string | null =
    typeof defaultValue === "string" ? defaultValue : null;
  const [preview, setPreview] = useState<string | null>(initialPreview);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Set default value on mount/update (supports string URL or File)
  useEffect(() => {
    if (!defaultValue || preview) return;

    if (typeof defaultValue === "string") {
      return;
    }

    // If File object (guarded)
    if (isFile(defaultValue)) {
      const file = defaultValue;
      const reader = new FileReader();
      reader.onloadend = () => {
        const previewUrl = reader.result as string;
        setPreview(previewUrl);
        onPhotoChange?.(file, previewUrl);
      };
      reader.readAsDataURL(file);
    }
  }, [defaultValue, preview, onPhotoChange]);

  useEffect(() => {
    const validateField = () => {
      if (uploadError) {
        setFieldError(name, uploadError);
        return false;
      }

      if (required && !values[name] && !preview) {
        setFieldError(name, `${label} is required`);
        return false;
      }

      clearFieldError(name);
      return true;
    };

    registerField(name, validateField);
    return () => unregisterField(name);
  }, [
    clearFieldError,
    label,
    name,
    preview,
    registerField,
    required,
    setFieldError,
    unregisterField,
    uploadError,
    values,
  ]);

  const handleFileValidation = (file: File): string | null => {
    if (!acceptedFormats.includes(file.type)) {
      return `Invalid format. Use ${acceptedFormats
        .map((f) => f.split("/")[1].toUpperCase())
        .join(", ")}`;
    }

    const fileSizeMB = file.size / (1024 * 1024);
    if (fileSizeMB > maxSizeMB) {
      return `File too large. Max ${maxSizeMB}MB`;
    }

    return null;
  };

  const handleFileChange = (file: File | null) => {
    if (!file) {
      setValue(name, null);
      clearFieldError(name);
      setPreview(null);
      setUploadError(null);
      onPhotoChange?.(null, null);
      return;
    }

    const validationError = handleFileValidation(file);
    if (validationError) {
      setValue(name, null);
      setUploadError(validationError);
      setFieldError(name, validationError);
      setPreview(null);
      onPhotoChange?.(null, null);
      return;
    }

    setUploadError(null);
    clearFieldError(name);
    const reader = new FileReader();
    reader.onloadend = () => {
      const previewUrl = reader.result as string;
      setPreview(previewUrl);
      setValue(name, file);
      onPhotoChange?.(file, previewUrl);
    };
    reader.readAsDataURL(file);
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    handleFileChange(file);
  };

  const handleRemove = (e: MouseEvent) => {
    e.stopPropagation();
    setPreview(null);
    setUploadError(null);
    setValue(name, null);
    clearFieldError(name);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
    onPhotoChange?.(null, null);
  };

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  const hasError = Boolean(error || uploadError || errors[name]);
  const errorMessage = error || uploadError || errors[name];

  return (
    <FieldLayout
      label={label}
      htmlFor={name}
      required={required}
      optional={optional}
      error={errorMessage ?? undefined}
      helperText="Upload JPG, PNG, or WEBP."
    >
      <div
        onClick={handleClick}
        className={`relative h-56 w-full cursor-pointer overflow-hidden rounded-[1.75rem] border border-dashed transition-all duration-200 group ${
          hasError
            ? "border-red-300 bg-red-50/70"
            : preview
              ? "border-primary/30 bg-white"
              : "border-slate-300 bg-slate-50 hover:border-primary/40 hover:bg-white"
        }`}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept={acceptedFormats.join(",")}
          onChange={handleInputChange}
          className="hidden"
          id={name}
          required={required && !preview}
        />

        {preview ? (
          <>
            {/* Image Preview */}
            <img
              src={preview}
              alt="Preview"
              className="w-full h-full object-cover"
            />

            {/* Remove Button */}
            <button
              type="button"
              onClick={handleRemove}
              className="absolute right-3 top-3 z-20 cursor-pointer rounded-xl bg-white/90 p-2 text-slate-600 shadow-lg backdrop-blur-sm opacity-0 transition-all hover:bg-white hover:text-slate-900 group-hover:opacity-100"
              aria-label="Remove photo"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Overlay on hover */}
            <div
              className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100
            transition-opacity flex items-center justify-center"
            >
              <div className="text-white text-center">
                <Upload className="w-8 h-8 mx-auto mb-2" />
                <p className="text-sm font-medium">Click to change photo</p>
              </div>
            </div>
          </>
        ) : (
          <>
            <div className="flex flex-col items-center justify-center h-full text-center p-6">
              <div
                className={`mb-4 flex h-16 w-16 items-center justify-center rounded-full ${hasError ? "bg-red-100 text-red-500" : "bg-primary/10 text-primary"}`}
              >
                <ImageIcon className="w-8 h-8" />
              </div>

              <p className="mb-1 font-poppins text-lg font-semibold text-slate-900">
                Click to upload profile picture
              </p>

              <p className="mb-3 font-inter text-sm text-slate-500">
                or drag and drop your image here
              </p>

              <p className="font-inter text-xs text-slate-400">
                Supported formats:{" "}
                {acceptedFormats
                  .map((f) => f.split("/")[1].toUpperCase())
                  .join(", ")}
              </p>

              <p className="font-inter text-xs text-slate-400">
                Maximum file size: {maxSizeMB}MB
              </p>
            </div>
          </>
        )}
      </div>
    </FieldLayout>
  );
}
