import type {
  StudentResourceCategory,
} from "@/lib/resources/types";
import StudentResourceCategoryCard from "./StudentResourceCategoryCard";

type StudentResourcesGalleryProps = {
  categories: StudentResourceCategory[];
};

export default function StudentResourcesGallery({ categories }: StudentResourcesGalleryProps) {
  return (
    <div className="space-y-6">
      {categories.length ? (
        <section className="grid grid-cols-1 gap-5 md:grid-cols-2 2xl:grid-cols-3">
          {categories.map((category) => (
            <StudentResourceCategoryCard key={category.id} category={category} />
          ))}
        </section>
      ) : (
        <section className="rounded-[1.85rem] border border-dashed border-slate-300 bg-white p-10 text-center shadow-sm">
          <p className="font-poppins text-2xl font-semibold text-slate-900">No categories found</p>
          <p className="mt-2 font-inter text-sm leading-relaxed text-slate-500">
            Try another search term or choose a different filter.
          </p>
        </section>
      )}
    </div>
  );
}
