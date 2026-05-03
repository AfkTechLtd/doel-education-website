"use client";

import { useEffect, useState } from "react";
import PillButton from "@/components/common/PillButton";
import { useAuthRedirect } from "@/components/common/auth-modal/useAuthRedirect";
import { createClient } from "@/lib/supabase/client";

export default function ConsultationButton() {
  const { handleAuthAction } = useAuthRedirect();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const supabase = createClient();

    supabase.auth.getSession().then(({ data }) => {
      setIsAuthenticated(!!data.session);
    });

    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setIsAuthenticated(!!session);
    });

    return () => listener.subscription.unsubscribe();
  }, []);

  return (
    <PillButton isLink={false} onClick={() => handleAuthAction()}>
      {isAuthenticated ? "Access your Portal" : "Start Your Application"}
    </PillButton>
  );
}
