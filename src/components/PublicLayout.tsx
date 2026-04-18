"use client";

import { usePathname } from "next/navigation";
import type { ReactNode } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import InquiryModalProvider from "@/components/common/InquiryModalProvider";

export default function PublicLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const isDashboardRoute = pathname?.startsWith("/dashboard");

  if (isDashboardRoute) {
    return <>{children}</>;
  }

  return (
    <InquiryModalProvider>
      <Navbar />
      {children}
      <Footer />
    </InquiryModalProvider>
  );
}
