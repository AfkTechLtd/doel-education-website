"use client";

import { ButtonHTMLAttributes, MouseEvent } from "react";
import { useAuthRedirect } from "@/components/common/auth-modal/useAuthRedirect";

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
  const { handleAuthAction, checking } = useAuthRedirect();

  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
    onClick?.(event);

    if (event.defaultPrevented) {
      return;
    }

    onBeforeOpen?.();
    handleAuthAction();
  };

  return (
    <button
      {...props}
      type={type}
      onClick={handleClick}
      disabled={disabled || checking}
    />
  );
}
