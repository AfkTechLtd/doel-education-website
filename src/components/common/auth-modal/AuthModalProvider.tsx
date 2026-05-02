"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import AuthModal from "./AuthModal";

type AuthView = "login" | "register";

type AuthModalContextValue = {
  openModal: (view?: AuthView) => void;
  closeModal: () => void;
  toggleView: () => void;
  view: AuthView;
};

const AuthModalContext = createContext<AuthModalContextValue | null>(null);

export function useAuthModal() {
  const context = useContext(AuthModalContext);
  if (!context) {
    throw new Error("useAuthModal must be used within AuthModalProvider");
  }
  return context;
}

export default function AuthModalProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [view, setView] = useState<AuthView>("register");

  const openModal = useCallback((nextView: AuthView = "register") => {
    setView(nextView);
    setIsOpen(true);
  }, []);

  const closeModal = useCallback(() => setIsOpen(false), []);

  const toggleView = useCallback(() => {
    setView((v) => (v === "login" ? "register" : "login"));
  }, []);

  const value = useMemo(
    () => ({ openModal, closeModal, toggleView, view }),
    [openModal, closeModal, toggleView, view],
  );

  return (
    <AuthModalContext.Provider value={value}>
      {children}
      <AuthModal isOpen={isOpen} onClose={closeModal} />
    </AuthModalContext.Provider>
  );
}
