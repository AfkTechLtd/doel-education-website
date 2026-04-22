"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { AlertCircle, CheckCircle2, Info, X } from "lucide-react";

type ToastVariant = "success" | "error" | "info";

type ToastOptions = {
  id?: string;
  title: string;
  description?: string;
  variant?: ToastVariant;
  durationMs?: number;
};

type ToastItem = {
  id: string;
  title: string;
  description?: string;
  variant: ToastVariant;
  durationMs: number;
};

type ToastContextValue = {
  showToast: (options: ToastOptions) => string;
  dismissToast: (id: string) => void;
};

const ToastContext = createContext<ToastContextValue | null>(null);

function generateId() {
  return `toast_${Math.random().toString(36).slice(2, 10)}`;
}

function getDefaultDuration(variant: ToastVariant) {
  if (variant === "error") return 6000;
  if (variant === "success") return 4000;
  return 4500;
}

function variantClasses(variant: ToastVariant) {
  if (variant === "success") {
    return {
      wrapper: "border-emerald-200 bg-emerald-50 text-emerald-800",
      icon: "text-emerald-600",
    };
  }

  if (variant === "error") {
    return {
      wrapper: "border-red-200 bg-red-50 text-red-800",
      icon: "text-red-600",
    };
  }

  return {
    wrapper: "border-slate-200 bg-white text-slate-800",
    icon: "text-slate-500",
  };
}

function ToastIcon({ variant }: { variant: ToastVariant }) {
  if (variant === "success") return <CheckCircle2 className="h-4 w-4" aria-hidden="true" />;
  if (variant === "error") return <AlertCircle className="h-4 w-4" aria-hidden="true" />;
  return <Info className="h-4 w-4" aria-hidden="true" />;
}

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<ToastItem[]>([]);
  const timersRef = useRef<Map<string, number>>(new Map());

  const dismissToast = useCallback((id: string) => {
    const existingTimer = timersRef.current.get(id);
    if (existingTimer) {
      window.clearTimeout(existingTimer);
      timersRef.current.delete(id);
    }

    setToasts((currentToasts) => currentToasts.filter((toast) => toast.id !== id));
  }, []);

  const showToast = useCallback(
    ({ id, title, description, variant = "info", durationMs }: ToastOptions) => {
      const toastId = id ?? generateId();
      const resolvedDuration = durationMs ?? getDefaultDuration(variant);

      setToasts((currentToasts) => {
        const withoutExisting = currentToasts.filter((toast) => toast.id !== toastId);
        return [
          ...withoutExisting,
          {
            id: toastId,
            title,
            description,
            variant,
            durationMs: resolvedDuration,
          },
        ];
      });

      const existingTimer = timersRef.current.get(toastId);
      if (existingTimer) {
        window.clearTimeout(existingTimer);
      }

      const timeoutId = window.setTimeout(() => {
        dismissToast(toastId);
      }, resolvedDuration);

      timersRef.current.set(toastId, timeoutId);
      return toastId;
    },
    [dismissToast],
  );

  useEffect(() => {
    const timers = timersRef.current;

    return () => {
      timers.forEach((timerId) => window.clearTimeout(timerId));
      timers.clear();
    };
  }, []);

  const contextValue = useMemo(
    () => ({ showToast, dismissToast }),
    [showToast, dismissToast],
  );

  return (
    <ToastContext.Provider value={contextValue}>
      {children}

      <div className="pointer-events-none fixed right-4 top-4 z-[70] flex w-full max-w-sm flex-col gap-2">
        {toasts.map((toast) => {
          const classes = variantClasses(toast.variant);

          return (
            <div
              key={toast.id}
              className={`pointer-events-auto rounded-2xl border px-4 py-3 shadow-lg ${classes.wrapper}`}
              role="status"
              aria-live="polite"
            >
              <div className="flex items-start gap-3">
                <div className={`mt-0.5 ${classes.icon}`}>
                  <ToastIcon variant={toast.variant} />
                </div>

                <div className="min-w-0 flex-1">
                  <p className="font-inter text-sm font-semibold">{toast.title}</p>
                  {toast.description ? (
                    <p className="mt-1 font-inter text-sm opacity-90">{toast.description}</p>
                  ) : null}
                </div>

                <button
                  type="button"
                  onClick={() => dismissToast(toast.id)}
                  className="inline-flex h-7 w-7 items-center justify-center rounded-lg border border-transparent transition hover:border-slate-300 hover:bg-white/60"
                  aria-label="Dismiss notification"
                >
                  <X className="h-3.5 w-3.5" aria-hidden="true" />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </ToastContext.Provider>
  );
}

/**
 * Accessor for the global toast system.
 *
 * Use this for user-facing event feedback such as upload success, link errors,
 * delete failures, and other short-lived status messages.
 */
export function useToast() {
  const context = useContext(ToastContext);

  if (!context) {
    throw new Error("useToast must be used within ToastProvider");
  }

  return context;
}
