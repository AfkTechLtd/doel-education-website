import Image from "next/image";

const admissionSteps = [
  {
    iconSrc: "/icons/search.png",
    iconAlt: "Search icon",
    title: "Profile Evaluation",
    description:
      "GPA, test scores, gap year, and budget — we give you an honest target range before you spend a taka on applications.",
    points: ["Academic fit assessment", "Realistic shortlist criteria"],
  },
  {
    iconSrc: "/icons/graduation-hat.png",
    iconAlt: "Graduation hat icon",
    title: "University Selection",
    description:
      "Reach, match, and safety strategy tailored to your major, budget, and scholarship eligibility.",
    points: [
      "Personalised shortlist of 6–12 universities",
      "Funding potential per university",
    ],
  },
  {
    iconSrc: "/icons/docs.png",
    iconAlt: "Documents icon",
    title: "Application Support",
    description:
      "SOP, LOR, resume, and essay editing with multiple review rounds until your documents are ready to submit.",
    points: [
      "Unlimited SOP revision rounds",
      "Deadline and checklist management",
    ],
  },
  {
    iconSrc: "/icons/book.png",
    iconAlt: "Book icon",
    title: "Test Prep Guidance",
    description:
      "GRE, GMAT, IELTS, and TOEFL planning with curated resources and verified coaching links for your intake window.",
    points: ["Score target per university", "Coaching partner referrals"],
  },
  {
    iconSrc: "/icons/credit_card.png",
    iconAlt: "Funding icon",
    title: "Scholarship Hunt",
    description:
      "We identify merit and need-based aid opportunities available to Bangladeshi students and help you position for them.",
    points: [
      "Fulbright, RA/TA, merit aid research",
      "Application timing strategy",
    ],
  },
  {
    iconSrc: "/icons/group.png",
    iconAlt: "Group icon",
    title: "Alumni Network",
    description:
      "Connect with Bangladeshi graduates already at your target universities for insider advice on campus life and jobs.",
    points: ["Current student Q&A sessions", "Pre-departure peer connections"],
  },
];

export default function ServicesGrid() {
  return (
    <section className="py-16 bg-gray-50/50">
      <div className="max-w-7xl mx-auto px-10 md:px-14">
        <div className="text-center mb-14">
          <h5 className="text-secondary font-bold tracking-widest uppercase text-sm mb-3">
            What We Do
          </h5>
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-5">
            Complete Support at Every Step
          </h2>
          <p className="text-gray-500 max-w-2xl mx-auto text-lg">
            From evaluating your profile on day one to walking you through
            pre-departure on the last — every service is part of one plan.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {admissionSteps.map((service) => {
            return (
              <div
                key={service.title}
                className="group bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-lg hover:-translate-y-1 hover:border-primary/20 transition-all duration-300 flex flex-col"
              >
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary mb-5 transition-colors duration-300 group-hover:bg-primary/15">
                  <Image
                    src={service.iconSrc}
                    alt={service.iconAlt}
                    width={22}
                    height={22}
                    className="h-[22px] w-[22px] transition-transform duration-300 group-hover:scale-110 group-hover:-translate-y-0.5"
                  />
                </div>
                <h3 className="text-xl font-bold text-slate-800 mb-2">
                  {service.title}
                </h3>
                <p className="text-gray-500 leading-relaxed text-sm mb-4">
                  {service.description}
                </p>
                <ul className="mt-auto space-y-2">
                  {service.points.map((point) => (
                    <li
                      key={point}
                      className="flex items-center gap-2 text-sm text-gray-600"
                    >
                      <Image
                        src="/icons/success.png"
                        alt="Success icon"
                        width={14}
                        height={14}
                        className="h-3.5 w-3.5 shrink-0"
                      />
                      {point}
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
