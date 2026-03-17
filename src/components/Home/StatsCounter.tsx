import React from "react";

const stats = [
  { value: "15+", label: "Years of Experience", sub: "Est. 2008" },
  { value: "500+", label: "University Partners", sub: "Across 25+ countries" },
  { value: "10,000+", label: "Students Guided", sub: "And counting" },
  { value: "98%", label: "Visa Success Rate", sub: "Industry leading" },
];

const StatsCounter = () => {
  return (
    <section className="py-6">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
        {stats.map(({ value, label, sub }, index) => (
          <div
            key={label}
            className={`
              group
              relative flex flex-col items-center justify-center text-center
              rounded-2xl px-4 py-8 sm:py-10 overflow-hidden
              border transition-all duration-300 hover:-translate-y-1 hover:shadow-lg
              ${
                index === 0
                  ? "bg-primary border-primary text-white"
                  : "bg-white border-slate-100 shadow-sm"
              }
            `}
          >
            {/* Decorative circle */}
            <div
              className={`
                absolute -top-6 -right-6 w-20 h-20 rounded-full opacity-10
                transition-transform duration-300 group-hover:scale-125 group-hover:rotate-6
                ${index === 0 ? "bg-white" : "bg-primary"}
              `}
            />

            <p
              className={`
                font-poppins text-3xl sm:text-4xl font-bold leading-none
                ${index === 0 ? "text-white" : "text-primary"}
              `}
            >
              {value}
            </p>

            <p
              className={`
                font-poppins text-sm font-semibold mt-2 leading-snug
                ${index === 0 ? "text-white/90" : "text-slate-800"}
              `}
            >
              {label}
            </p>

            <p
              className={`
                font-inter text-xs mt-1
                ${index === 0 ? "text-white/55" : "text-slate-400"}
              `}
            >
              {sub}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default StatsCounter;
