import BlogHero from "@/components/blog/BlogHero";
import BlogPostsSection from "@/components/blog/BlogPostsSection";
import BlogStartSection from "@/components/blog/BlogStartSection";
import { blogPosts, featuredPost } from "@/data/blogData";

export default function BlogPage() {
  return (
    <main className="min-h-screen overflow-x-hidden bg-[#fcfdfd]">
      <BlogHero />
      <BlogStartSection post={featuredPost} />
      <BlogPostsSection posts={blogPosts} />
    </main>
  );
}
