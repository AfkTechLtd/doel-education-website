import Link from "next/link";
import Image from "next/image";

type LogoProps = {
  showName?: boolean;
  className?: string;
};

export default function Logo({ showName = true, className = "" }: LogoProps) {
  const iconMark = (
    <div className="relative h-24 w-24 shrink-0 overflow-hidden rounded-sm">
      <Image src="/logo.svg" alt="" fill className="object-cover object-top" />
    </div>
  );

  if (showName) {
    return (
      <Link href="/" className={`shrink-0 flex flex-col gap-2 ${className}`}>
        {iconMark}
        <div className="leading-none">
          <span className="block font-poppins text-lg font-bold text-primary">
            Doel
          </span>
          <span className="block font-inter text-[10px] uppercase tracking-[0.14em] text-gray-500">
            Education Consultancy
          </span>
        </div>
      </Link>
    );
  }

  return (
    <Link
      href="/"
      className={`shrink-0 inline-flex items-center ${className}`}
      aria-label="Doel Education Consultancy"
    >
      {iconMark}
    </Link>
  );
}
