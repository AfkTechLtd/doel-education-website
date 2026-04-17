import type { ReactNode } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import InquiryModalProvider from "@/components/common/InquiryModalProvider";

export default function PublicLayout({ children }: { children: ReactNode }) {
  return (
    <InquiryModalProvider>
      <Navbar />
      {children}
      <Footer />
    </InquiryModalProvider>
  );
}
