"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import InquiryModal from "@/components/common/inquiry-modal/InquiryModal";

type InquiryModalContextValue = {
  openModal: () => void;
  closeModal: () => void;
};

const InquiryModalContext = createContext<InquiryModalContextValue | null>(
  null,
);

export function useInquiryModal() {
  const context = useContext(InquiryModalContext);
  if (!context) {
    throw new Error("useInquiryModal must be used within InquiryModalProvider");
  }
  return context;
}

export default function InquiryModalProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [isOpen, setIsOpen] = useState(false);

  const openModal = useCallback(() => setIsOpen(true), []);
  const closeModal = useCallback(() => setIsOpen(false), []);

  const value = useMemo(
    () => ({ openModal, closeModal }),
    [openModal, closeModal],
  );

  return (
    <InquiryModalContext.Provider value={value}>
      {children}
      <InquiryModal isOpen={isOpen} onClose={closeModal} />
    </InquiryModalContext.Provider>
  );
}
