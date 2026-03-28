import Image from "next/image";
import { ArrowRight } from "lucide-react";
import type { BlogPost } from "@/types/blog";
import BlogMetaRow from "./BlogMetaRow";

interface BlogPostCardProps {
  post: BlogPost;
}

export default function BlogPostCard({ post }: BlogPostCardProps) {
  return (
    <article className="overflow-hidden rounded-[24px] border border-slate-200 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-md">
      <div className="relative h-32 overflow-hidden sm:h-36">
        <Image
          src={post.image}
          alt={post.title}
          fill
          sizes="(min-width: 1280px) 24vw, (min-width: 768px) 42vw, 100vw"
          className="object-cover transition duration-500 hover:scale-105"
        />
      </div>

      <div className="p-4 md:p-5">
        <div className="mb-2.5">
          <BlogMetaRow
            category={post.category}
            date={post.date}
            readTime={post.readTime}
          />
        </div>

        <h3 className="overflow-hidden font-poppins text-base font-semibold leading-snug text-slate-900 md:text-lg [display:-webkit-box] [-webkit-box-orient:vertical] [-webkit-line-clamp:2]">
          {post.title}
        </h3>

        <p className="mt-2.5 overflow-hidden font-inter text-sm leading-6 text-slate-600 [display:-webkit-box] [-webkit-box-orient:vertical] [-webkit-line-clamp:2]">
          {post.excerpt}
        </p>

        <div className="mt-4 flex items-center justify-end">
          <button className="inline-flex items-center gap-2 font-inter text-sm font-semibold text-primary transition hover:text-primary/80">
            Read more
            <ArrowRight size={16} />
          </button>
        </div>
      </div>
    </article>
  );
}
