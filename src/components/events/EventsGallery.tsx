import Image from "next/image";

const galleryItems = [
  {
    src: "/study/hero-campus.png",
    alt: "Students gathering in a campus-inspired event space",
    className: "aspect-[4/3]",
    sizes: "(min-width: 1024px) 33vw, 100vw",
  },
  {
    src: "/home/Gemini_2.jpg",
    alt: "Counselor-led workshop setting",
    className: "aspect-[4/3]",
    sizes: "(min-width: 1024px) 33vw, 100vw",
  },
  {
    src: "/Blog2.jpg",
    alt: "Students connecting after an event session",
    className: "aspect-[4/3]",
    sizes: "(min-width: 1024px) 33vw, 100vw",
  },
];

export default function EventsGallery() {
  return (
    <section
      id="event-gallery"
      className="bg-[linear-gradient(180deg,#ffffff_0%,#f8fafc_100%)] py-16 md:py-20"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-8 md:px-14">
        <div className="mb-8 max-w-2xl md:mb-10">
          <div className="mb-4 flex items-center gap-4">
            <p className="shrink-0 text-sm font-bold uppercase tracking-widest text-secondary">
              Event Pictures
            </p>
            <div className="h-px flex-1 bg-gray-200" />
          </div>

          <h2 className="font-poppins text-2xl font-semibold leading-tight text-primary md:text-3xl">
            A few moments from our seminars, workshops, and student sessions.
          </h2>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {galleryItems.map((item) => (
            <div
              key={item.src}
              className="relative overflow-hidden rounded-[24px] border border-slate-200 bg-slate-100 shadow-sm"
            >
              <div className={`relative ${item.className}`}>
                <Image
                  src={item.src}
                  alt={item.alt}
                  fill
                  sizes={item.sizes}
                  className="object-cover"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
