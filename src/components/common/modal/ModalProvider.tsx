"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import AuthModal from "@/components/common/auth-modal/AuthModal";
import InquiryModal from "@/components/common/inquiry-modal/InquiryModal";

/* ── Types ─────────────────────────────────────────────────────────────── */

export type AuthView = "login" | "register";

type ModalContextValue = {
  /* Auth modal */
  authOpen: boolean;
  authView: AuthView;
  openAuth: (view?: AuthView) => void;
  closeAuth: () => void;
  toggleAuthView: () => void;

  /* Inquiry modal */
  inquiryOpen: boolean;
  openInquiry: () => void;
  closeInquiry: () => void;
};

/* ── Context ───────────────────────────────────────────────────────────── */

const ModalContext = createContext<ModalContextValue | null>(null);

function useModalContext() {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error("Modal hooks must be used within ModalProvider");
  }
  return context;
}

/* ── Hooks ─────────────────────────────────────────────────────────────── */

export function useAuthModal() {
  const { authOpen, authView, openAuth, closeAuth, toggleAuthView } =
    useModalContext();
  return {
    isOpen: authOpen,
    view: authView,
    openModal: openAuth,
    closeModal: closeAuth,
    toggleView: toggleAuthView,
  };
}

export function useInquiryModal() {
  const { inquiryOpen, openInquiry, closeInquiry } = useModalContext();
  return {
    isOpen: inquiryOpen,
    openModal: openInquiry,
    closeModal: closeInquiry,
  };
}

/* ── Provider ──────────────────────────────────────────────────────────── */

export default function ModalProvider({ children }: { children: ReactNode }) {
  const [authOpen, setAuthOpen] = useState(false);
  const [authView, setAuthView] = useState<AuthView>("register");

  const [inquiryOpen, setInquiryOpen] = useState(false);

  const openAuth = useCallback((nextView: AuthView = "register") => {
    setAuthView(nextView);
    setAuthOpen(true);
  }, []);

  const closeAuth = useCallback(() => setAuthOpen(false), []);

  const toggleAuthView = useCallback(() => {
    setAuthView((v) => (v === "login" ? "register" : "login"));
  }, []);

  const openInquiry = useCallback(() => setInquiryOpen(true), []);
  const closeInquiry = useCallback(() => setInquiryOpen(false), []);

  const value = useMemo(
    () => ({
      authOpen,
      authView,
      openAuth,
      closeAuth,
      toggleAuthView,
      inquiryOpen,
      openInquiry,
      closeInquiry,
    }),
    [authOpen, authView, openAuth, closeAuth, toggleAuthView, inquiryOpen, openInquiry, closeInquiry],
  );

  return (
    <ModalContext.Provider value={value}>
      {children}
      <AuthModal isOpen={authOpen} onClose={closeAuth} />
      <InquiryModal isOpen={inquiryOpen} onClose={closeInquiry} />
    </ModalContext.Provider>
  );
}
