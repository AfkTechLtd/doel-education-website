import Link from "next/link";
import { CSSProperties, MouseEventHandler, ReactNode } from "react";
import { cn } from "@/lib/utils";

interface PillButtonProps {
  children?: ReactNode;
  label?: string;
  isLink?: boolean;
  href?: string;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  wrapperClassName?: string;
  className?: string;
  style?: CSSProperties;
}

export default function PillButton({
  children,
  isLink = true,
  href = "/consultation",
  label = "Get Free Consultation",
  onClick,
  type = "button",
  disabled = false,
  leftIcon,
  rightIcon,
  wrapperClassName = "hidden md:block shrink-0",
  className,
  style,
}: PillButtonProps) {
  const classes = cn(
    "inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold text-white bg-primary transition-all duration-200 hover:bg-primary/90 hover:shadow-md hover:shadow-primary/25",
    "disabled:opacity-60 disabled:cursor-not-allowed",
    className,
  );

  const content = (
    <>
      {leftIcon}
      {children ?? label}
      {rightIcon}
    </>
  );

  return (
    <div className={wrapperClassName}>
      {isLink ? (
        <Link href={href} className={classes} style={style}>
          {content}
        </Link>
      ) : (
        <button
          type={type}
          onClick={onClick}
          disabled={disabled}
          className={classes}
          style={style}
        >
          {content}
        </button>
      )}
    </div>
  );
}
