/* eslint-disable react-hooks/set-state-in-effect */
"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import Logo from "./Logo";
import DesktopNav from "./DesktopNav";
import ConsultationButton from "./ConsultationButton";
import MobileMenu from "./MobileMenu";

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    function onClickOutside(e: MouseEvent) {
      const menu = document.getElementById("mobile-menu");
      const btn = document.getElementById("hamburger-btn");
      if (
        menu?.contains(e.target as Node) === false &&
        btn?.contains(e.target as Node) === false
      ) {
        setMobileOpen(false);
      }
    }
    document.addEventListener("mousedown", onClickOutside);
    return () => document.removeEventListener("mousedown", onClickOutside);
  }, []);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setMobileOpen(false);
    }
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  return (
    <>
      <header className="w-full bg-white/95 backdrop-blur-sm border-b border-gray-100 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between gap-8">
          <Logo showName={false} />
          <DesktopNav />
          <ConsultationButton />
          <MobileMenu
            isOpen={mobileOpen}
            onToggle={() => setMobileOpen((v) => !v)}
          />
        </div>
      </header>
    </>
  );
}
