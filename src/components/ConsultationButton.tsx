"use client";

import { useInquiryModal } from "@/components/InquiryModalProvider";

export default function ConsultationButton() {
  const { openModal } = useInquiryModal();

  return (
    <div className="hidden md:block shrink-0">
      <button
        type="button"
        onClick={openModal}
        className="inline-flex items-center px-5 py-2.5 rounded-full text-sm font-semibold text-white bg-primary transition-all duration-200 hover:bg-primary/90 hover:shadow-md hover:shadow-primary/25"
      >
        Get Free Consultation
      </button>
    </div>
  );
}
