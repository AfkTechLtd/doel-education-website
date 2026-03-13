import Link from "next/link";

export default function ConsultationButton() {
  return (
    <div className="hidden md:block shrink-0">
      <Link
        href="/contact"
        className="inline-flex items-center px-5 py-2.5 rounded-full text-sm font-semibold text-white bg-primary transition-all duration-200 hover:bg-primary/90 hover:shadow-md hover:shadow-primary/25"
      >
        Get Free Consultation
      </Link>
    </div>
  );
}
