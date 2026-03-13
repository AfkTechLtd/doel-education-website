"use client";

import navLinks from "@/data/navData";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function DesktopNav() {
  const pathname = usePathname();

  return (
    <nav className="hidden md:flex items-center gap-1 flex-1 justify-center">
      {navLinks.map((link) => {
        const isActive = pathname === link.href;
        return (
          <Link
            key={link.href}
            href={link.href}
            className={`px-4 py-2 rounded-md text-sm font-inter transition-colors duration-200 font-medium ${
              isActive
                ? "text-primary "
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
