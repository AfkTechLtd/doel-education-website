import Link from "next/link";
import { CSSProperties, MouseEventHandler, ReactNode } from "react";
import { cn } from "@/lib/utils";

interface OutlineButtonProps {
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

export default function OutlineButton({
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
}: OutlineButtonProps) {
  const classes = cn(
    "inline-flex items-center justify-center gap-2 rounded-2xl px-8 py-4 text-sm font-semibold text-white font-inter transition-all duration-200 hover:-translate-y-0.5",
    "disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:translate-y-0",
    fullWidth && "w-full",
    className,
  );

  const mergedStyle: CSSProperties = {
    border: "1.5px solid rgba(255,255,255,0.35)",
    background: "rgba(255,255,255,0.08)",
    backdropFilter: "blur(8px)",
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
