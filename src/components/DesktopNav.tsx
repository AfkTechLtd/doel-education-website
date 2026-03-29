"use client";

import navLinks from "@/data/navData";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronDown } from "lucide-react";
import { useState } from "react";

export default function DesktopNav() {
  const pathname = usePathname();
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  return (
    <nav className="hidden md:flex items-center gap-1 flex-1 justify-center">
      {navLinks.map((link) => {
        if (link.children) {
          const isActive = link.children.some((c) => pathname === c.href);
          const isOpen = openDropdown === link.href;

          return (
            <div
              key={link.href}
              className="relative"
              onMouseEnter={() => setOpenDropdown(link.href)}
              onMouseLeave={() => setOpenDropdown(null)}
            >
              <button
                className={`px-4 py-2 rounded-md text-sm font-inter transition-colors duration-200 font-medium flex items-center gap-1 cursor-pointer ${
                  isActive
                    ? "text-primary"
                    : "text-gray-500 hover:text-primary hover:bg-gray-50"
                }`}
              >
                {link.label}
                <ChevronDown
                  size={14}
                  className={`transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
                />
              </button>

              {/* Invisible bridge to keep dropdown open while moving mouse */}
              {isOpen && (
                <div className="absolute top-full left-0 right-0 h-2" />
              )}

              <div
                className={`absolute top-[calc(100%+8px)] left-1/2 -translate-x-1/2 z-50 transition-all duration-200 ${
                  isOpen
                    ? "opacity-100 pointer-events-auto translate-y-0"
                    : "opacity-0 pointer-events-none -translate-y-1"
                }`}
              >
                <div className="bg-white rounded-xl shadow-lg shadow-black/10 border border-gray-100 overflow-hidden min-w-[200px] py-1.5">
                  {link.children.map((child) => {
                    const isChildActive = pathname === child.href;
                    return (
                      <Link
                        key={child.href}
                        href={child.href}
                        className={`block px-4 py-2.5 text-sm font-inter font-medium transition-colors duration-150 whitespace-nowrap ${
                          isChildActive
                            ? "text-primary bg-primary/5"
                            : "text-gray-600 hover:text-primary hover:bg-gray-50"
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
            className={`px-4 py-2 rounded-md text-sm font-inter transition-colors duration-200 font-medium ${
              isActive
                ? "text-primary"
                : "text-gray-500 hover:text-primary hover:bg-gray-50"
            }`}
          >
            {link.label}
          </Link>
        );
      })}
    </nav>
  );
}
