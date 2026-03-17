/**
 * REQUIRED — add this to your globals.css for the scroll animation:
 *
 * @keyframes infinite-scroll {
 *   from { transform: translateX(0); }
 *   to   { transform: translateX(-33.333%); }
 * }
 * @theme {
 *   --animate-infinite-scroll: infinite-scroll 28s linear infinite;
 * }
 */

import React from "react";

const universities = [
  {
    name: "University of Oxford",
    location: "Oxford, UK",
    logoText: "Oxford",
    color: "bg-[#002147]/10 text-[#002147]",
  },
  {
    name: "MIT",
    location: "Cambridge, MA",
    logoText: "MIT",
    color: "bg-[#A31F34]/10 text-[#A31F34]",
  },
  {
    name: "Stanford University",
    location: "Stanford, CA",
    logoText: "SU",
    color: "bg-[#8C1515]/10 text-[#8C1515]",
  },
  {
    name: "University of Melbourne",
    location: "Melbourne, AU",
    logoText: "UoM",
    color: "bg-primary/10 text-primary",
  },
  {
    name: "TU Munich",
    location: "Munich, Germany",
    logoText: "TUM",
    color: "bg-blue-100 text-blue-700",
  },
  {
    name: "ETH Zurich",
    location: "Zurich, Switzerland",
    logoText: "ETH",
    color: "bg-slate-100 text-slate-700",
  },
  {
    name: "Harvard University",
    location: "Cambridge, MA",
    logoText: "HU",
    color: "bg-[#A51C30]/10 text-[#A51C30]",
  },
  {
    name: "Yale University",
    location: "New Haven, CT",
    logoText: "Yale",
    color: "bg-[#00356B]/10 text-[#00356B]",
  },
];

const Partners = () => {
  const scrollList = [...universities, ...universities, ...universities];

  return (
    <section className="py-20 overflow-hidden">
      {/* Header */}
      <div className="flex flex-col items-center text-center gap-3 mb-14 px-4">
        <div className="flex items-center gap-3">
          <span className="h-px w-8 bg-secondary block" />
          <span className="text-xs font-semibold uppercase tracking-[0.25em] text-primary font-inter">
            Our Partners
          </span>
          <span className="h-px w-8 bg-secondary block" />
        </div>
        <h2 className="font-poppins text-3xl sm:text-4xl font-semibold tracking-tight text-slate-900">
          Partnered with Top
          <br />
          <span className="text-primary">Global Universities</span>
        </h2>
        <p className="text-slate-500 font-inter text-sm sm:text-base max-w-md">
          We have active partnerships with over 50 universities across the US,
          UK, Europe, and Australia.
        </p>
      </div>

      {/* Carousel */}
      <div className="relative w-full overflow-hidden">
        {/* Fade masks */}
        <div className="pointer-events-none absolute inset-y-0 left-0 w-24 sm:w-40 bg-gradient-to-r from-white to-transparent z-10" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-24 sm:w-40 bg-gradient-to-l from-white to-transparent z-10" />

        {/* Scrolling track */}
        <div className="flex items-stretch animate-infinite-scroll">
          {scrollList.map((uni, index) => (
            <div
              key={index}
              className="group flex items-center gap-3.5 mx-3 px-5 py-4 bg-white border border-slate-100 shadow-sm rounded-2xl min-w-[240px] shrink-0 hover:-translate-y-0.5 hover:border-primary/20 hover:shadow-md transition-all duration-200"
            >
              {/* Logo mark */}
              <div
                className={`w-11 h-11 rounded-xl flex items-center justify-center font-bold text-xs shrink-0 font-poppins transition-transform duration-300 group-hover:scale-110 ${uni.color}`}
              >
                {uni.logoText}
              </div>

              {/* Text */}
              <div>
                <p className="text-sm font-semibold text-slate-800 font-poppins whitespace-nowrap leading-tight">
                  {uni.name}
                </p>
                <p className="text-xs text-slate-400 font-inter mt-0.5">
                  {uni.location}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom stat strip */}
      <div className="mt-12 flex flex-wrap justify-center gap-8 sm:gap-16 px-4">
        {[
          { value: "50+", label: "Partner universities" },
          { value: "15+", label: "Countries covered" },
          { value: "10K+", label: "Students placed" },
        ].map(({ value, label }) => (
          <div key={label} className="text-center">
            <p className="text-2xl font-bold text-primary font-poppins">
              {value}
            </p>
            <p className="text-xs text-slate-400 font-inter mt-0.5">{label}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Partners;
