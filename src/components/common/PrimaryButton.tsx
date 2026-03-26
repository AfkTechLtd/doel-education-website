import Link from "next/link";
import { CSSProperties, MouseEventHandler, ReactNode } from "react";
import { cn } from "@/lib/utils";

interface PrimaryButtonProps {
  children: ReactNode;
  isLink?: boolean;
  href?: string;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  fullWidth?: boolean;
  className?: string;
  style?: CSSProperties;
}

export default function PrimaryButton({
  children,
  isLink = true,
  href,
  onClick,
  type = "button",
  disabled = false,
  leftIcon,
  rightIcon,
  fullWidth = false,
  className,
  style,
}: PrimaryButtonProps) {
  const classes = cn(
    "inline-flex items-center justify-center gap-2 rounded-2xl px-8 py-4 text-sm font-bold font-inter transition-all duration-200 hover:-translate-y-0.5 hover:brightness-110 shadow-lg",
    "disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:translate-y-0 disabled:hover:brightness-100",
    fullWidth && "w-full",
    className,
  );

  const mergedStyle: CSSProperties = {
    backgroundColor: "var(--color-secondary,#f5c842)",
    color: "#1a1a1a",
    ...style,
  };

  if (isLink) {
    return (
      <Link href={href ?? "#"} className={classes} style={mergedStyle}>
        {leftIcon}
        {children}
        {rightIcon}
      </Link>
    );
  }

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={classes}
      style={mergedStyle}
    >
      {leftIcon}
      {children}
      {rightIcon}
    </button>
  );
}
