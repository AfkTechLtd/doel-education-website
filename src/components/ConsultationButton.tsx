"use client";

import PillButton from "@/components/common/PillButton";
import { useInquiryModal } from "@/components/common/InquiryModalProvider";

export default function ConsultationButton() {
  const { openModal } = useInquiryModal();

  return (
    <PillButton isLink={false} onClick={openModal}>
      Free Consultation
    </PillButton>
  );
}
