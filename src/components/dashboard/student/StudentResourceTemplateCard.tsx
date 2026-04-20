import Link from "next/link";
import type { LocalResourceTemplate } from "@/data/student-resource-templates";
import StudentTemplatePreview from "./StudentTemplatePreview";

type StudentResourceTemplateCardProps = {
  template: LocalResourceTemplate;
};

export default function StudentResourceTemplateCard({
  template,
}: StudentResourceTemplateCardProps) {
  return (
    <Link
      href={`/student/resources/${template.categoryId}/${template.id}`}
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
      <div className="aspect-[5/4.5] overflow-hidden">
        {/* Inner zoom layer */}
        <div className="h-full w-full transition-transform duration-300 group-hover:scale-[1.01]">
          <StudentTemplatePreview type={template.type} title={template.title} />
        </div>
      </div>
    </Link>
  );
}
