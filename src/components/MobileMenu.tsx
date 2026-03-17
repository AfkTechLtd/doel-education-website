"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import navLinks from "@/data/navData";
import { useInquiryModal } from "@/components/InquiryModalProvider";

interface MobileMenuProps {
  isOpen: boolean;
  onToggle: () => void;
}

export default function MobileMenu({ isOpen, onToggle }: MobileMenuProps) {
  const pathname = usePathname();
  const { openModal } = useInquiryModal();

  return (
    <>
      {/* Hamburger */}
      <button
        id="hamburger-btn"
        onClick={onToggle}
        aria-label={isOpen ? "Close menu" : "Open menu"}
        aria-expanded={isOpen}
        aria-controls="mobile-menu"
        className="md:hidden flex flex-col justify-center items-center w-9 h-9 rounded-md gap-[5px] transition-colors duration-150 "
      >
        <span
          className={`block h-[2px] w-5 rounded-full transition-all duration-250 origin-center bg-gray-700 ${
            isOpen ? "translate-y-[7px] rotate-45" : ""
          }`}
        />
        <span
          className={`block h-[2px] w-5 rounded-full transition-all duration-200 bg-gray-700 ${
            isOpen ? "opacity-0 scale-x-0" : ""
          }`}
        />
        <span
          className={`block h-[2px] w-5 rounded-full transition-all duration-250 origin-center bg-gray-700 ${
            isOpen ? "-translate-y-[7px] -rotate-45" : ""
          }`}
        />
      </button>

      {/* Backdrop */}
      <div
        aria-hidden="true"
        onClick={onToggle}
        className={`md:hidden fixed top-16 inset-x-0 bottom-0 z-40 bg-black/10 transition-opacity duration-300 ${
          isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
      />

      {/* Panel */}
      <div
        id="mobile-menu"
        aria-hidden={!isOpen}
        className={`md:hidden fixed top-16 left-0 right-0 z-50 bg-white overflow-hidden border-b border-gray-100 transition-all duration-300 ease-in-out ${
          isOpen ? "max-h-[400px] shadow-lg shadow-black/10" : "max-h-0 shadow-none"
        }`}
      >
        <nav className="flex flex-col px-4 pt-3 pb-5">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`px-4 py-3 text-sm font-medium rounded-lg transition-colors duration-150 font-inter ${
                  isActive
                    ? "text-primary bg-primary/5 font-semibold"
                    : "text-gray-700 hover:bg-primary/5"
                }`}
              >
                {link.label}
              </Link>
            );
          })}

          <div className="mt-3 px-4">
            <button
              type="button"
              onClick={() => {
                onToggle();
                openModal();
              }}
              className="flex items-center justify-center w-full py-3 rounded-xl text-sm font-semibold text-white bg-primary transition-all duration-200 hover:brightness-110"
            >
              Get Free Consultation
            </button>
          </div>
        </nav>
      </div>
    </>
  );
}
