import type { BlogPost } from "@/types/blog";
import BlogFeaturedCard from "./BlogFeaturedCard";
import BlogSectionHeader from "./BlogSectionHeader";

interface BlogStartSectionProps {
  post: BlogPost;
}

export default function BlogStartSection({ post }: BlogStartSectionProps) {
  return (
    <section className="mx-auto max-w-7xl px-6 pb-8 pt-12 md:pb-10 md:pt-16">
      <div className="mb-6">
        <BlogSectionHeader
          eyebrow="Start here"
          title="A good first read if you are just getting started"
          description="This guide gives new students a calm starting point before they move into scholarships, SOPs, or visa preparation."
        />
      </div>

      <BlogFeaturedCard post={post} />
    </section>
  );
}
