"use client";

import { usePathname, useRouter } from "next/navigation";
import { useEffect, type ReactNode } from "react";

interface StudentPortalGuardProps {
  hasCounselor: boolean;
  children: ReactNode;
}

export default function StudentPortalGuard({ hasCounselor, children }: StudentPortalGuardProps) {
  const pathname = usePathname();
  const router = useRouter();
  const isHomePage = pathname === "/student";

  useEffect(() => {
    if (!hasCounselor && !isHomePage) {
      router.replace("/student");
    }
  }, [hasCounselor, isHomePage, router]);

  // Block rendering sub-pages if no counselor assigned
  if (!hasCounselor && !isHomePage) {
    return null;
  }

  return <>{children}</>;
}
