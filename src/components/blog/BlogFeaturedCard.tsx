import Image from "next/image";
import { ArrowRight } from "lucide-react";
import type { BlogPost } from "@/types/blog";
import BlogMetaRow from "./BlogMetaRow";

interface BlogFeaturedCardProps {
  post: BlogPost;
}

export default function BlogFeaturedCard({ post }: BlogFeaturedCardProps) {
  return (
    <article className="overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-sm">
      <div className="grid md:grid-cols-[200px_1fr] lg:grid-cols-[220px_1fr]">
        <div className="relative min-h-[160px] md:min-h-full">
          <Image
            src={post.image}
            alt={post.title}
            fill
            sizes="(min-width: 1024px) 220px, (min-width: 768px) 200px, 100vw"
            className="object-cover"
          />
        </div>

        <div className="flex flex-col justify-center p-5 sm:p-6 md:p-6 lg:p-7">
          <div className="mb-3">
            <BlogMetaRow
              category={post.category}
              date={post.date}
              readTime={post.readTime}
            />
          </div>

          <h3 className="max-w-xl font-poppins text-lg font-semibold leading-snug text-slate-900 sm:text-xl md:text-[1.45rem]">
            {post.title}
          </h3>

          <p className="mt-3 max-w-2xl overflow-hidden font-inter text-sm leading-6 text-slate-600 [display:-webkit-box] [-webkit-box-orient:vertical] [-webkit-line-clamp:3]">
            {post.excerpt}
          </p>

          <button className="mt-4 inline-flex w-fit items-center gap-2 font-inter text-sm font-semibold text-primary transition hover:text-primary/80">
            Read guide
            <ArrowRight size={16} />
          </button>
        </div>
      </div>
    </article>
  );
}
