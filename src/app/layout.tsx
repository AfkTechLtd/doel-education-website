import type { Metadata } from "next";
import "../styles/globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import InquiryModalProvider from "@/components/InquiryModalProvider";

export const metadata: Metadata = {
  title: "Doel Education",
  description: "Education consultancy helping students study abroad",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <InquiryModalProvider>
          <Navbar />
          {children}
          <Footer />
        </InquiryModalProvider>
      </body>
    </html>
  );
}
