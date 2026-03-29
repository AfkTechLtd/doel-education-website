import type { BlogPost } from "@/types/blog";
import BlogPostCard from "./BlogPostCard";
import BlogSectionHeader from "./BlogSectionHeader";

interface BlogPostsSectionProps {
  posts: BlogPost[];
}

export default function BlogPostsSection({ posts }: BlogPostsSectionProps) {
  return (
    <section className="mx-auto max-w-7xl px-6 pb-20 pt-6 md:pb-24">
      <div className="border-t border-slate-100 pt-10 md:pt-12">
        <div className="mb-6">
          <BlogSectionHeader
            eyebrow="Keep reading"
            title="More articles you may find useful"
            description="A shorter list of practical reads on visas, university choices, scholarships, and application documents."
          />
        </div>

        {posts.length === 0 ? (
          <div className="rounded-[24px] border border-dashed border-slate-300 bg-white px-6 py-14 text-center shadow-sm">
            <h3 className="font-poppins text-xl font-semibold text-slate-900 md:text-2xl">
              No articles available right now
            </h3>
            <p className="mx-auto mt-3 max-w-xl font-inter text-sm leading-relaxed text-slate-600">
              We will add more practical guides here soon.
            </p>
          </div>
        ) : (
          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {posts.map((post) => (
              <BlogPostCard key={post.title} post={post} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
