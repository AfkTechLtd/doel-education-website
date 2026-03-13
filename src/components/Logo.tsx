import Link from "next/link";

export default function Logo() {
  return (
    <Link href="/" className="flex items-center gap-2.5 shrink-0 group">
      <div className="w-9 h-9 rounded-full bg-primary flex items-center justify-center transition-transform duration-200 group-hover:scale-105">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
          <path d="M12 3L2 8l10 5 10-5-10-5Z" fill="white" />
          <path d="M2 12l10 5 10-5" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M2 16l10 5 10-5" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>
      <div className="flex flex-col leading-tight">
        <span className="text-[15px] font-bold tracking-wide text-primary font-poppins">
          DOEL
        </span>
        <span className="text-[9px] font-medium tracking-[0.18em] uppercase text-gray-400 font-inter">
          Education
        </span>
      </div>
    </Link>
  );
}
