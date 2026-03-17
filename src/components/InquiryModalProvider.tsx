"use client";

import { Send, X } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

type InquiryModalContextValue = {
  openModal: () => void;
  closeModal: () => void;
};

const InquiryModalContext = createContext<InquiryModalContextValue | null>(null);

export function useInquiryModal() {
  const context = useContext(InquiryModalContext);
  if (!context) {
    throw new Error("useInquiryModal must be used within InquiryModalProvider");
  }
  return context;
}

function InquiryModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
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
            className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-3xl bg-white border border-gray-100 p-6 md:p-10 shadow-2xl transform-gpu will-change-transform bg-[radial-gradient(circle_at_bottom_right,_#fffbeb_0%,_transparent_40%)]"
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

            <div className="mb-8 pr-10">
              <h3 className="text-2xl font-bold text-slate-900">Quick Inquiry</h3>
              <p className="mt-2 text-gray-500">
                Fill out the form below and{" "}
                <span className="font-semibold text-primary">
                  we&apos;ll reply within 24 hours.
                </span>
              </p>
            </div>

            <form className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-700">Full Name</label>
                <input
                  type="text"
                  className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none transition-all focus:border-primary focus:ring-1 focus:ring-primary"
                  placeholder="John Doe"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-700">Phone Number</label>
                <input
                  type="text"
                  className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none transition-all focus:border-primary focus:ring-1 focus:ring-primary"
                  placeholder="+880"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-700">Email</label>
                <input
                  type="email"
                  className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none transition-all focus:border-primary focus:ring-1 focus:ring-primary"
                  placeholder="you@example.com"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-700">Program Interest</label>
                <select className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none focus:border-primary">
                  <option>Undergraduate</option>
                  <option>Postgraduate</option>
                  <option>PhD</option>
                </select>
              </div>

              <div className="space-y-2 md:col-span-2">
                <label className="text-sm font-semibold text-slate-700">Message (Optional)</label>
                <textarea
                  className="h-32 w-full rounded-xl border border-gray-200 px-4 py-3 outline-none focus:border-primary"
                  placeholder="Tell us about your goals..."
                />
              </div>

              <button className="md:col-span-2 flex items-center justify-center gap-2 rounded-xl bg-primary px-8 py-4 font-bold text-white transition-all hover:bg-primary/90 shadow-lg shadow-blue-100">
                <Send size={18} />
                Send Inquiry
              </button>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
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
