import type {
  ResourceCategoryId,
  ResourceTemplateType,
} from "./student-resource-categories";

export type LocalResourceTemplate = {
  id: string;
  categoryId: ResourceCategoryId;
  title: string;
  description: string | null;
  type: ResourceTemplateType;
  content: string | null;
  fileUrl: string | null;
  isPublic: boolean;
  createdBy: string | null;
  createdAt: string;
  updatedAt: string;
};

export const studentResourceTemplates: LocalResourceTemplate[] = [
  {
    id: "research-focused-sop",
    categoryId: "sop",
    title: "Research-Focused SOP",
    description:
      "Designed for applicants who need to highlight research interests, faculty fit, and academic depth.",
    type: "SOP",
    content:
      "Opening with a clear research motivation and the question that shaped your academic path.\n\nAcademic preparation section covering coursework, thesis work, and lab exposure relevant to the target discipline.\n\nResearch experience section focused on methods, results, and how those projects refined your intended specialization.\n\nProgram fit section connecting your interests with faculty, labs, and the practical direction of the degree.\n\nClosing section outlining long-term academic and professional goals after graduation.",
    fileUrl: null,
    isPublic: true,
    createdBy: null,
    createdAt: "2026-04-19T00:00:00.000Z",
    updatedAt: "2026-04-19T00:00:00.000Z",
  },
  {
    id: "career-transition-sop",
    categoryId: "sop",
    title: "Career Transition SOP",
    description:
      "Structured for students moving from one discipline or industry into a new academic path.",
    type: "SOP",
    content:
      "Introduction explaining the turning point that led to a change in academic or career direction.\n\nBackground section summarizing prior studies or work and identifying the limits of that path.\n\nBridge section showing how transferable skills, projects, and self-driven learning support the transition.\n\nProgram choice section explaining why graduate study is the right next step for the pivot.\n\nCareer vision section defining how the new field aligns with long-term professional impact.",
    fileUrl: null,
    isPublic: true,
    createdBy: null,
    createdAt: "2026-04-19T00:00:00.000Z",
    updatedAt: "2026-04-19T00:00:00.000Z",
  },
  {
    id: "leadership-and-impact-sop",
    categoryId: "sop",
    title: "Leadership and Impact SOP",
    description:
      "Best suited for applicants centering leadership, teamwork, and measurable community or workplace outcomes.",
    type: "SOP",
    content:
      "Opening narrative centered on a leadership moment that reveals motivation and character.\n\nAcademic and extracurricular section explaining how initiatives, organizations, or projects built leadership capacity.\n\nImpact section focused on outcomes, collaboration, and decision-making examples.\n\nProgram relevance section connecting those experiences to the academic training you now need.\n\nClosing section describing the scale of impact you want to create after the degree.",
    fileUrl: null,
    isPublic: true,
    createdBy: null,
    createdAt: "2026-04-19T00:00:00.000Z",
    updatedAt: "2026-04-19T00:00:00.000Z",
  },
  {
    id: "scholarship-oriented-sop",
    categoryId: "sop",
    title: "Scholarship-Oriented SOP",
    description:
      "A goal-driven format that emphasizes merit, impact potential, and alignment with funding opportunities.",
    type: "SOP",
    content:
      "Opening section stating academic purpose and why financial support would amplify your trajectory.\n\nBackground section summarizing achievements, academic consistency, and relevant distinctions.\n\nNeed-and-merit section balancing financial context with evidence of discipline and potential.\n\nProgram fit section explaining how the degree and the funding align with your contribution goals.\n\nFinal paragraph connecting scholarship support to future service, innovation, or leadership outcomes.",
    fileUrl: null,
    isPublic: true,
    createdBy: null,
    createdAt: "2026-04-19T00:00:00.000Z",
    updatedAt: "2026-04-19T00:00:00.000Z",
  },
  {
    id: "stem-graduate-sop",
    categoryId: "sop",
    title: "STEM Graduate SOP",
    description:
      "A technical structure for applicants applying to engineering, computing, data, or research-intensive STEM programs.",
    type: "SOP",
    content:
      "Technical introduction framing a concrete problem space or research interest.\n\nPreparation section covering core coursework, tools, and technical projects.\n\nExperience section highlighting analysis, experimentation, coding, or system-building work.\n\nProgram alignment section identifying specialization areas and the training needed next.\n\nConclusion outlining research, industry, or innovation plans after the degree.",
    fileUrl: null,
    isPublic: true,
    createdBy: null,
    createdAt: "2026-04-19T00:00:00.000Z",
    updatedAt: "2026-04-19T00:00:00.000Z",
  },
  {
    id: "academic-performance-lor",
    categoryId: "lor",
    title: "Academic Performance LOR",
    description:
      "A professor-led recommendation format focused on classroom achievement, discipline, and intellectual growth.",
    type: "LOR",
    content:
      "Opening recommendation from a professor who taught the student in a rigorous course.\n\nRelationship section defining how long the recommender has known the student and in what academic context.\n\nEvaluation section highlighting analytical ability, writing, participation, and academic consistency.\n\nSpecific examples section citing performance on projects, presentations, or final assessments.\n\nClosing endorsement confirming readiness for advanced study.",
    fileUrl: null,
    isPublic: true,
    createdBy: null,
    createdAt: "2026-04-19T00:00:00.000Z",
    updatedAt: "2026-04-19T00:00:00.000Z",
  },
  {
    id: "research-assistant-lor",
    categoryId: "lor",
    title: "Research Assistant LOR",
    description:
      "A recommendation structure for students who worked on faculty research, labs, or applied academic projects.",
    type: "LOR",
    content:
      "Introduction from a research supervisor or faculty advisor.\n\nContext section explaining the project, lab, or study where the student contributed.\n\nPerformance section describing initiative, technical ability, reliability, and problem-solving.\n\nEvidence section detailing the student's role in experiments, reports, coding, or analysis.\n\nClosing recommendation confirming research readiness and graduate potential.",
    fileUrl: null,
    isPublic: true,
    createdBy: null,
    createdAt: "2026-04-19T00:00:00.000Z",
    updatedAt: "2026-04-19T00:00:00.000Z",
  },
  {
    id: "workplace-supervisor-lor",
    categoryId: "lor",
    title: "Workplace Supervisor LOR",
    description:
      "Built for students using a manager or employer recommendation to support professional maturity and readiness.",
    type: "LOR",
    content:
      "Opening endorsement from a line manager or team supervisor.\n\nProfessional relationship section outlining reporting structure and duration.\n\nEvaluation section discussing initiative, accountability, communication, and work quality.\n\nExample section describing leadership in tasks, projects, or client-facing responsibilities.\n\nFinal paragraph recommending the applicant for further study based on professional growth and potential.",
    fileUrl: null,
    isPublic: true,
    createdBy: null,
    createdAt: "2026-04-19T00:00:00.000Z",
    updatedAt: "2026-04-19T00:00:00.000Z",
  },
  {
    id: "leadership-recommendation-lor",
    categoryId: "lor",
    title: "Leadership Recommendation LOR",
    description:
      "A format that highlights student initiative, community work, and leadership through clubs, teams, or service roles.",
    type: "LOR",
    content:
      "Introduction from a mentor, advisor, or organizational supervisor.\n\nContext section explaining the leadership environment and the student's role.\n\nStrengths section highlighting initiative, collaboration, judgment, and consistency.\n\nExamples section focusing on event management, team coordination, or program outcomes.\n\nClosing section recommending the student for their maturity, influence, and growth potential.",
    fileUrl: null,
    isPublic: true,
    createdBy: null,
    createdAt: "2026-04-19T00:00:00.000Z",
    updatedAt: "2026-04-19T00:00:00.000Z",
  },
  {
    id: "parent-sponsorship-affidavit",
    categoryId: "affidavit",
    title: "Parent Sponsorship Affidavit",
    description:
      "A declaration format for students whose tuition and living expenses are supported by a parent.",
    type: "AFFIDAVIT",
    content:
      "Sponsor declaration identifying the parent as the primary financial supporter.\n\nStudent details section including study destination and educational purpose.\n\nCommitment section specifying tuition, living, and associated academic expenses.\n\nIncome section summarizing source of earnings and supporting financial capacity.\n\nClosing statement for signature, date, and notarization.",
    fileUrl: null,
    isPublic: true,
    createdBy: null,
    createdAt: "2026-04-19T00:00:00.000Z",
    updatedAt: "2026-04-19T00:00:00.000Z",
  },
  {
    id: "guardian-support-affidavit",
    categoryId: "affidavit",
    title: "Guardian Support Affidavit",
    description:
      "A funding declaration for students supported by a legal guardian or close family sponsor.",
    type: "AFFIDAVIT",
    content:
      "Opening declaration identifying the guardian and the nature of support.\n\nRelationship section confirming the sponsor's legal or family relationship to the student.\n\nExpense coverage section listing tuition, living costs, travel, and emergency support.\n\nFinancial evidence section referring to savings, salary, or other verifiable income sources.\n\nSignature and attestation section for official use.",
    fileUrl: null,
    isPublic: true,
    createdBy: null,
    createdAt: "2026-04-19T00:00:00.000Z",
    updatedAt: "2026-04-19T00:00:00.000Z",
  },
  {
    id: "family-sponsor-affidavit",
    categoryId: "affidavit",
    title: "Family Sponsor Affidavit",
    description:
      "Useful for sponsorship cases involving siblings, relatives, or extended family support.",
    type: "AFFIDAVIT",
    content:
      "Sponsor introduction explaining the family relationship and willingness to provide support.\n\nStudent identity section outlining academic purpose and institution context.\n\nFunding declaration section stating the scope of financial support in clear terms.\n\nProof section summarizing source of funds and supporting records.\n\nCertification block for signatures and legal affirmation.",
    fileUrl: null,
    isPublic: true,
    createdBy: null,
    createdAt: "2026-04-19T00:00:00.000Z",
    updatedAt: "2026-04-19T00:00:00.000Z",
  },
  {
    id: "self-funding-declaration",
    categoryId: "affidavit",
    title: "Self-Funding Declaration",
    description:
      "A personal declaration format for applicants financing their own studies through savings or income.",
    type: "AFFIDAVIT",
    content:
      "Personal declaration confirming the applicant is self-funding the study plan.\n\nEducation section naming the target degree or institution.\n\nFinancial commitment section describing which expenses will be covered directly by the applicant.\n\nFunds section identifying savings, income, or business revenue supporting the declaration.\n\nClosing statement for signature, date, and supporting verification.",
    fileUrl: null,
    isPublic: true,
    createdBy: null,
    createdAt: "2026-04-19T00:00:00.000Z",
    updatedAt: "2026-04-19T00:00:00.000Z",
  },
];

export function getResourcesByCategory(categoryId: ResourceCategoryId) {
  return studentResourceTemplates.filter(
    (resource) => resource.categoryId === categoryId && resource.isPublic,
  );
}

export function getResourceById(resourceId: string) {
  return studentResourceTemplates.find((resource) => resource.id === resourceId && resource.isPublic) ?? null;
}
