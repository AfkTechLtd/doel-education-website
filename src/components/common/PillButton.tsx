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

/*************  ✨ Windsurf Command ⭐  *************/
/**
 * A pill button component with a glassmorphism effect.
 *
 * @param {ReactNode} [children] - The content of the button.
 * @param {boolean} [isLink=true] - Whether the button is a link or not.
 * @param {string} [href="/consultation"] - The href of the link if isLink is true.
 * @param {string} [label="Get Free Consultation"] - The label of the button.
 * @param {MouseEventHandler<HTMLButtonElement>} [onClick] - The click handler of the button.
 * @param {"button" | "submit" | "reset"} [type="button"] - The type of the button.
 * @param {boolean} [disabled=false] - Whether the button is disabled or not.
 * @param {ReactNode} [leftIcon] - The left icon of the button.
 * @param {ReactNode} [rightIcon] - The right icon of the button.
 * @param {string} [wrapperClassName="hidden md:block shrink-0"] - The class name of the wrapper element.
 * @param {string} [className] - The class name of the button.

/*******  ee80cb4b-ac1c-4f90-9326-4f626e55e68d  *******/
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
