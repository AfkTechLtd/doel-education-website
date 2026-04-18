export type ResourceCategoryId = "sop" | "lor" | "affidavit";
export type ResourceTemplateType = "SOP" | "LOR" | "AFFIDAVIT";

export type StudentResourceCategory = {
  id: ResourceCategoryId;
  title: string;
  description: string;
  type: ResourceTemplateType;
};

export const studentResourceCategories: StudentResourceCategory[] = [
  {
    id: "sop",
    title: "SOP",
    description:
      "Browse multiple statement of purpose formats for research, career goals, leadership stories, and scholarship-focused applications.",
    type: "SOP",
  },
  {
    id: "lor",
    title: "LOR",
    description:
      "Explore recommendation letter styles for academic performance, workplace evaluation, research roles, and leadership endorsements.",
    type: "LOR",
  },
  {
    id: "affidavit",
    title: "Affidavit",
    description:
      "Review affidavit and sponsorship declaration templates for family support, guardian funding, and self-funding cases.",
    type: "AFFIDAVIT",
  },
];

export function getResourceCategoryById(categoryId: string) {
  return studentResourceCategories.find((category) => category.id === categoryId) ?? null;
}
