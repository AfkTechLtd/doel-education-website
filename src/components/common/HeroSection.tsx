import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface HeroSectionProps {
  children: ReactNode;
  imageSrc?: string;
  imageAlt?: string;
  overlayClassName?: string;
  containerClassName?: string;
  contentClassName?: string;
  align?: "left" | "center";
  minHeightClassName?: string;
}

/**
 * A HeroSection component which provides a full-width, full-height,
 * absolutely positioned section with a background image, overlay, and
 * content.
 *
 * @param {ReactNode} children - The content to render inside the hero section.
 * @param {string} [imageSrc="/study/hero-campus.png"] - The source URL of the background image.
 * @param {string} [imageAlt=""] - The alt text of the background image.
 * @param {string} [overlayClassName] - Additional CSS classes to apply to the overlay element.
 * @param {string} [containerClassName] - Additional CSS classes to apply to the container element.
 * @param {string} [contentClassName] - Additional CSS classes to apply to the content element.
 * @param {"left" | "center"} [align="left"] - The alignment of the content.
 * @param {string} [minHeightClassName="min-h-[56vh]"] - The minimum height of the section.
 *
 * @returns {JSX.Element} - A <section> element with the hero section.
 */
export default function HeroSection({
  children,
  imageSrc = "/study/hero-campus.png",
  imageAlt = "",
  overlayClassName,
  containerClassName,
  contentClassName,
  align = "left",
  minHeightClassName = "min-h-[56vh]",
}: HeroSectionProps) {
  const isCenter = align === "center";

  return (
    <section
      className={cn(
        "relative w-full flex items-center overflow-hidden",
        minHeightClassName,
      )}
    >
      <img
        src={imageSrc}
        alt={imageAlt}
        aria-hidden={imageAlt === ""}
        className="absolute inset-0 w-full h-full object-cover object-center"
        style={{ zIndex: 0 }}
      />

      <div
        className={cn("absolute inset-0", overlayClassName)}
        style={{
          zIndex: 1,
          background:
            "linear-gradient(120deg, color-mix(in srgb, var(--color-primary,#1a6b3c) 90%, transparent) 0%, color-mix(in srgb, var(--color-primary,#1a6b3c) 68%, transparent) 55%, color-mix(in srgb, var(--color-primary,#1a6b3c) 48%, transparent) 100%)",
        }}
      />

      <div
        className="absolute inset-x-0 bottom-0 h-48 pointer-events-none"
        style={{
          zIndex: 2,
          background:
            "linear-gradient(to top, rgba(0,0,0,0.30) 0%, transparent 100%)",
        }}
      />

      <div className="relative w-full" style={{ zIndex: 10 }}>
        <div
          className={cn("mx-auto max-w-7xl px-6 lg:px-12", containerClassName)}
        >
          <div
            className={cn(
              "py-16 md:py-20 flex items-center",
              isCenter ? "justify-center" : "justify-start",
            )}
          >
            <div
              className={cn(
                "space-y-8 w-full",
                isCenter ? "max-w-3xl text-center" : "max-w-2xl text-left",
                contentClassName,
              )}
            >
              {children}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}



/**
 * A top title component for the hero section.
 *
 * @param {ReactNode} children - The text content of the top title.
 * @param {string} [className] - Additional CSS classes to apply to the top title.
 *
 * @returns {JSX.Element} - A <div> element with the top title text.
 */
export const HeroTopTitle = ({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) => {
  return (
    <div
      className={cn(
        "font-inter text-xs font-semibold tracking-[0.2em] uppercase text-secondary",
        className,
      )}
    >
      {children}
    </div>
  );
};


/**
 * A content component for the hero section.
 *
 * @param {ReactNode} children - The text content of the content.
 * @param {string} [className] - Additional CSS classes to apply to the content.
 * @returns {JSX.Element} - A <div> element with the content text.
 */
export const HeroContent = ({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) => {
  return <div className={cn("space-y-4", className)}>{children}</div>;
};


/**
 * A title component for the hero section.
 *
 * @param {ReactNode} children - The text content of the title.
 * @param {string} [className] - Additional CSS classes to apply to the title.
 *
 * @returns {JSX.Element} - A <h1> element with the title text.
 */
export const HeroTitle = ({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) => {
  return (
    <h1
      className={cn(
        "font-poppins text-4xl sm:text-5xl lg:text-6xl font-bold leading-[1.06] tracking-tight text-white drop-shadow-md",
        className,
      )}
    >
      {children}
    </h1>
  );
};


/**
 * A subtitle component for the hero section.
 *
 * @param {ReactNode} children - The text content of the subtitle.
 * @param {string} [className] - Additional CSS classes to apply to the subtitle.
 *
 * @returns {JSX.Element} - A <p> element with the subtitle text.
 */
export const HeroSubTitle = ({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) => {
  return (
    <p
      className={cn(
        "text-sm text-white/80 font-inter leading-relaxed",
        className,
      )}
    >
      {children}
    </p>
  );
};


/**
 * A container component for the call-to-action (CTA) elements in the hero section.
 *
 * @param {ReactNode} children - The CTAs to render.
 * @param {string} [className] - Additional CSS classes to apply to the container.
 * @param {"left" | "center"} [align="left"] - The alignment of the CTAs.
 *
 * @returns {JSX.Element} - A <div> element with the CTAs.
 */
export const HeroCTAs = ({
  children,
  className,
  align = "left",
}: {
  children: ReactNode;
  className?: string;
  align?: "left" | "center";
}) => {
  return (
    <div
      className={cn(
        "flex flex-col sm:flex-row gap-3",
        align === "center" ? "justify-center" : "justify-start",
        className,
      )}
    >
      {children}
    </div>
  );
};
