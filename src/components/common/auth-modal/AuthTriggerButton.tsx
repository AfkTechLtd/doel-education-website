"use client";

import { ButtonHTMLAttributes, MouseEvent } from "react";
import { useAuthModal } from "./AuthModalProvider";

type AuthView = "login" | "register";

type AuthTriggerButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  view?: AuthView;
  onBeforeOpen?: () => void;
};

export default function AuthTriggerButton({
  type = "button",
  onClick,
  onBeforeOpen,
  view = "login",
  ...props
}: AuthTriggerButtonProps) {
  const { openModal } = useAuthModal();

  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
    onClick?.(event);

    if (event.defaultPrevented) {
      return;
    }

    onBeforeOpen?.();
    openModal(view);
  };

  return <button {...props} type={type} onClick={handleClick} />;
}
