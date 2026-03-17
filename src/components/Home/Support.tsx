import React from "react";

const services = [
  {
    title: "Free Counseling",
    description:
      "Personalized guidance to help you choose the right university and program",
    iconSrc: "/icons/chat.png",
    iconAlt: "Chat icon",
  },
  {
    title: "University Selection",
    description:
      "Expert matching based on your profile, preferences, and career goals",
    iconSrc: "/icons/graduation-hat.png",
    iconAlt: "Graduation hat icon",
  },
  {
    title: "Application Support",
    description:
      "Complete assistance with applications, SOPs, and documentation",
    iconSrc: "/icons/docs.png",
    iconAlt: "Documents icon",
  },
  {
    title: "Visa Assistance",
    description:
      "End-to-end visa guidance with mock interviews and document review",
    iconSrc: "/icons/success.png",
    iconAlt: "Success check icon",
  },
  {
    title: "Scholarship Guidance",
    description: "Help identify and apply for scholarships and financial aid",
    iconSrc: "/icons/credit_card.png",
    iconAlt: "Credit card icon",
  },
  {
    title: "Pre-Departure Support",
    description:
      "Orientation sessions covering travel, accommodation, and culture",
    iconSrc: "/icons/plane.png",
    iconAlt: "Plane icon",
  },
  {
    title: "Accommodation Help",
    description: "Assistance finding safe and affordable housing options",
    iconSrc: "/icons/home.png",
    iconAlt: "Home icon",
  },
  {
    title: "Career Services",
    description: "Resume building, job search strategies, and interview prep",
    iconSrc: "/icons/briefcase.png",
    iconAlt: "Briefcase icon",
  },
];

const Support = () => {
  return (
    <section className="py-20">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header Section */}
        <div className="text-center mb-16">
          <h5 className="text-secondary font-bold tracking-widest uppercase text-sm mb-3">
            Our Services
          </h5>
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">
            Complete Support at Every Step
          </h2>
          <p className="text-gray-500 max-w-2xl mx-auto text-lg">
            From your first consultation to landing your dream job abroad, we
            provide comprehensive support throughout your journey.
          </p>
        </div>

        {/* Grid Section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, index) => (
            <div
              key={index}
              className="group relative bg-white p-8 rounded-2xl shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 border border-gray-100 hover:border-primary/20 flex flex-col items-start"
            >
              <div className="pointer-events-none absolute inset-0 rounded-2xl bg-gradient-to-br from-primary/[0.03] to-secondary/[0.03] opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

              {/* Icon Container */}
              <div className="relative w-12 h-12 rounded-full bg-blue-50 flex items-center justify-center mb-6 transition-colors duration-300 group-hover:bg-primary/10">
                <img
                  src={service.iconSrc}
                  alt={service.iconAlt}
                  width={24}
                  height={24}
                  loading="lazy"
                  decoding="async"
                  className="h-6 w-6 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:scale-110"
                />
              </div>

              <h3 className="relative text-xl font-bold text-slate-800 mb-3 transition-colors duration-300 group-hover:text-primary">
                {service.title}
              </h3>
              <p className="relative text-gray-500 leading-relaxed text-sm">
                {service.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Support;
