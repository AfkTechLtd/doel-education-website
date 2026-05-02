"use client";

import PillButton from "@/components/common/PillButton";
import { useAuthRedirect } from "@/components/common/auth-modal/useAuthRedirect";

export default function ConsultationButton() {
  const { handleAuthAction } = useAuthRedirect();

  return (
    <PillButton isLink={false} onClick={() => handleAuthAction()}>
      Student Portal
    </PillButton>
  );
}
