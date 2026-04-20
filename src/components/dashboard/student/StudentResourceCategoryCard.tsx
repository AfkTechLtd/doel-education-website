import Link from "next/link";
import type { StudentResourceCategory } from "@/data/student-resource-categories";
import StudentTemplatePreview from "./StudentTemplatePreview";

type StudentResourceCategoryCardProps = {
  category: StudentResourceCategory;
};

export default function StudentResourceCategoryCard({
  category,
}: StudentResourceCategoryCardProps) {
  return (
    <Link
      href={`/student/resources/${category.id}`}
      className="
  group block overflow-hidden rounded-[1.45rem]
  border border-slate-200 bg-white
  shadow-sm
  transition-all duration-300 ease-out
  origin-top
  hover:-translate-y-1 hover:scale-[1.01]
  hover:border-primary
  hover:shadow-xl hover:shadow-slate-300/60
  will-change-transform
"
    >
      <div className="aspect-[4/4.4] overflow-hidden">
        {/* Inner zoom layer */}
        <div className="h-full w-full transition-transform duration-300 group-hover:scale-[1.01]">
          <StudentTemplatePreview
            type={category.type}
            title={`${category.title} Templates`}
          />
        </div>
      </div>
    </Link>
  );
}
