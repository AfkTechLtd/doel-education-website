export type FaqItem = {
  id: string;
  question: string;
  answer: string;
};

export const faqs: FaqItem[] = [
  {
    id: "01",
    question: "Do I need IELTS to study in the US?",
    answer:
      "Most universities require it, yes. A score of 6.0-6.5 is the standard minimum for Master's programs. Some universities accept TOEFL or PTE instead.",
  },
  {
    id: "02",
    question: "Can I work while studying?",
    answer:
      "Yes. On-campus jobs allow up to 20 hours per week from day one. After your first semester, CPT opens up paid internships directly related to your field. After graduation, OPT gives you 12 months, and STEM graduates can get up to 36 months.",
  },
  {
    id: "03",
    question: "What is an I-20 and why does it matter?",
    answer:
      "The I-20 is the document your university issues after you are admitted. Without it, you cannot apply for your F-1 student visa. DGS ensures yours is issued correctly and on time.",
  },
  {
    id: "04",
    question: "Is it possible to get a scholarship as a Bangladeshi student?",
    answer:
      "Absolutely. Merit scholarships, graduate assistantships, and need-based aid are all available to international students. The key is applying to the right universities with a strong profile. We identify every scholarship you are eligible for before you apply.",
  },
  {
    id: "05",
    question: "What if my GPA is not great?",
    answer:
      "GPA matters, but it is not the only factor. A strong SOP, relevant work experience, good test scores, and the right university strategy can compensate. We have helped students with average GPAs get into solid, ranked US programs.",
  },
  {
    id: "06",
    question: "How long does the whole process take?",
    answer:
      "From your first consultation to boarding your flight, expect 9 to 12 months for a smooth process. Rushing creates document gaps. Starting early gives you stronger university options, better scholarship opportunities, and less stress.",
  },
  {
    id: "07",
    question: "Will I get a job after graduating in the US?",
    answer:
      "With the right degree, the right university, and proper CPT experience during your studies, yes. DGS career support guides you through CPT, OPT, and work authorization so you are job-ready before graduation. Our target is employment within 6 months of completing your degree.",
  },
  {
    id: "08",
    question: "What happens if my visa gets rejected?",
    answer:
      "It happens, but rarely when preparation is thorough. If a visa is rejected, we analyze exactly why and rebuild the file. A rejection is not the end; it is a gap we fix together.",
  },
  {
    id: "09",
    question: "How much money do I need in my bank account for the visa?",
    answer:
      "You need to show enough to cover at least your first-year tuition plus living expenses. That typically means $25,000-$40,000 in a six-month bank statement. It does not have to be your money alone; a sponsor's account works too.",
  },
];

const splitIndex = Math.ceil(faqs.length / 2);

export const faqColumns = {
  left: faqs.slice(0, splitIndex),
  right: faqs.slice(splitIndex),
};
