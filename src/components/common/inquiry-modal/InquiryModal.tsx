"use client";

import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import { useEffect } from "react";
import InquiryModalForm from "./InquiryModalForm";
import InquiryModalHeader from "./InquiryModalHeader";

type InquiryModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

export default function InquiryModal({
  isOpen,
  onClose,
}: InquiryModalProps) {
  useEffect(() => {
    if (!isOpen) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };

    document.addEventListener("keydown", onKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "";
    };
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-[120] flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
        >
          <motion.button
            type="button"
            aria-label="Close inquiry form"
            onClick={onClose}
            className="absolute inset-0 bg-slate-900/50 backdrop-blur-[2px]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35, ease: "easeOut" }}
          />

          <motion.div
            className="relative max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-3xl border border-gray-100 bg-white p-6 shadow-2xl will-change-transform bg-[radial-gradient(circle_at_bottom_right,_#fffbeb_0%,_transparent_40%)] md:p-10"
            initial={{ opacity: 0, y: 16, scale: 0.985 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.99 }}
            transition={{
              type: "spring",
              stiffness: 210,
              damping: 24,
              mass: 0.9,
            }}
          >
            <button
              type="button"
              onClick={onClose}
              className="absolute right-4 top-4 inline-flex h-9 w-9 items-center justify-center rounded-full border border-gray-200 text-gray-500 transition-colors hover:bg-gray-100 hover:text-gray-700"
              aria-label="Close modal"
            >
              <X size={16} />
            </button>

            <InquiryModalHeader />
            <InquiryModalForm />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
