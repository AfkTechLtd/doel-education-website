import type { Metadata } from "next";
import "../styles/globals.css";
import { Inter, Poppins } from "next/font/google";
import { ToastProvider } from "@/components/common/feedback/ToastProvider";
import AuthModalProvider from "@/components/common/auth-modal/AuthModalProvider";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

const poppins = Poppins({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-poppins",
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

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
      <body className={`${inter.variable} ${poppins.variable}`}>
        <AuthModalProvider>
          <ToastProvider>{children}</ToastProvider>
        </AuthModalProvider>
      </body>
    </html>
  );
}
