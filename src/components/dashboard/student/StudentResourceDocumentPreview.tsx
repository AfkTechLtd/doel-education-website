import type { LocalResourceTemplate } from "@/data/student-resource-templates";
import StudentTemplatePreview from "./StudentTemplatePreview";

type StudentResourceDocumentPreviewProps = {
  resource: LocalResourceTemplate;
};

export default function StudentResourceDocumentPreview({
  resource,
}: StudentResourceDocumentPreviewProps) {
  return (
    <div
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
        <div className="h-full w-full transition-transform duration-300 group-hover:scale-[1.04]">
          <StudentTemplatePreview type={resource.type} title={resource.title} />
        </div>
      </div>
    </div>
  );
}
