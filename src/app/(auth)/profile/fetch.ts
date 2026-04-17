type InterestRecord = {
  id: string;
  name: string;
  slug: string;
};

const mockInterests: InterestRecord[] = [
  { id: "1", name: "Business", slug: "business" },
  { id: "2", name: "Computer Science", slug: "computer-science" },
  { id: "3", name: "Data Science", slug: "data-science" },
  { id: "4", name: "Engineering", slug: "engineering" },
  { id: "5", name: "Public Health", slug: "public-health" },
  { id: "6", name: "Design", slug: "design" },
];

export async function fetchAllInterests() {
  return mockInterests;
}
