"use client";

import { useCallback, useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { useAuthModal } from "@/components/common/modal";

/**
 * Shared hook for CTA buttons that should either redirect an authenticated
 * student to their dashboard or open the auth modal for unauthenticated
 * visitors.
 *
 * Uses `supabase.auth.getUser()` (not `getSession()`) to validate the JWT
 * with the Supabase server, preventing redirects on stale sessions.
 */
export function useAuthRedirect() {
  const router = useRouter();
  const { openModal } = useAuthModal();
  const [checking, setChecking] = useState(false);

  const handleAuthAction = useCallback(async () => {
    setChecking(true);
    try {
      const supabase = createClient();
      const { data, error } = await supabase.auth.getUser();
      if (error || !data.user) {
        openModal("login");
        return;
      }
      router.push("/student");
      router.refresh();
    } catch {
      // Network or unexpected error — fall back to auth modal
      openModal("login");
    } finally {
      setChecking(false);
    }
  }, [openModal, router]);

  return { handleAuthAction, checking };
}
