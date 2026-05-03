"use client";

import { ButtonHTMLAttributes, MouseEvent } from "react";
import { useInquiryModal } from "@/components/common/modal";

type InquiryTriggerButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  onBeforeOpen?: () => void;
};

export default function InquiryTriggerButton({
  type = "button",
  onClick,
  onBeforeOpen,
  disabled,
  ...props
}: InquiryTriggerButtonProps) {
  const { openModal } = useInquiryModal();

  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
    onClick?.(event);

    if (event.defaultPrevented) {
      return;
    }

    onBeforeOpen?.();
    openModal();
  };

  return (
    <button
      {...props}
      type={type}
      onClick={handleClick}
      disabled={disabled}
    />
  );
}
