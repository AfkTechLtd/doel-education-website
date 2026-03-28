"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import navLinks from "@/data/navData";
import { ChevronDown } from "lucide-react";
import { useState } from "react";

interface MobileMenuProps {
  isOpen: boolean;
  onToggle: () => void;
}

export default function MobileMenu({ isOpen, onToggle }: MobileMenuProps) {
  const pathname = usePathname();
  const [openGroup, setOpenGroup] = useState<string | null>(null);

  function toggleGroup(href: string) {
    setOpenGroup((prev) => (prev === href ? null : href));
  }

  return (
    <>
      {/* Hamburger */}
      <button
        id="hamburger-btn"
        onClick={onToggle}
        aria-label={isOpen ? "Close menu" : "Open menu"}
        aria-expanded={isOpen}
        aria-controls="mobile-menu"
        className="md:hidden flex flex-col justify-center items-center w-9 h-9 rounded-md gap-[5px] transition-colors duration-150"
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
          isOpen ? "max-h-[520px] shadow-lg shadow-black/10" : "max-h-0 shadow-none"
        }`}
      >
        <nav className="flex flex-col px-4 pt-3 pb-5">
          {navLinks.map((link) => {
            if (link.children) {
              const isGroupActive = link.children.some((c) => pathname === c.href);
              const isGroupOpen = openGroup === link.href;

              return (
                <div key={link.href}>
                  <button
                    onClick={() => toggleGroup(link.href)}
                    className={`w-full flex items-center justify-between px-4 py-3 text-sm font-medium rounded-lg transition-colors duration-150 font-inter ${
                      isGroupActive
                        ? "text-primary bg-primary/5 font-semibold"
                        : "text-gray-700 hover:bg-primary/5"
                    }`}
                  >
                    <span>{link.label}</span>
                    <ChevronDown
                      size={14}
                      className={`text-gray-400 transition-transform duration-200 ${
                        isGroupOpen ? "rotate-180" : ""
                      }`}
                    />
                  </button>

                  <div
                    className={`overflow-hidden transition-all duration-300 ease-in-out ${
                      isGroupOpen ? "max-h-48" : "max-h-0"
                    }`}
                  >
                    <div className="ml-4 pl-4 border-l-2 border-primary/20 mt-1 mb-1 flex flex-col gap-0.5">
                      {link.children.map((child) => {
                        const isChildActive = pathname === child.href;
                        return (
                          <Link
                            key={child.href}
                            href={child.href}
                            onClick={onToggle}
                            className={`block px-3 py-2.5 text-sm font-inter font-medium rounded-lg transition-colors duration-150 ${
                              isChildActive
                                ? "text-primary bg-primary/5 font-semibold"
                                : "text-gray-600 hover:text-primary hover:bg-primary/5"
                            }`}
                          >
                            {child.label}
                          </Link>
                        );
                      })}
                    </div>
                  </div>
                </div>
              );
            }

            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={onToggle}
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
            <Link
              href="/consultation"
              onClick={onToggle}
              className="flex items-center justify-center w-full py-3 rounded-xl text-sm font-semibold text-white bg-primary transition-all duration-200 hover:brightness-110"
            >
              Get Free Consultation
            </Link>
          </div>
        </nav>
      </div>
    </>
  );
}
