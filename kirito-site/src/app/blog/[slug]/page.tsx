import Link from "next/link";
import { notFound } from "next/navigation";
import { posts } from "@/content/data";
import { Card } from "@/components/ui/Card";

export function generateStaticParams() {
  return posts.map((p) => ({ slug: p.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }) {
  const post = posts.find((p) => p.slug === params.slug);
  if (!post) return { title: "文章不存在" };
  return { title: post.title, description: post.summary };
}

export default function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = posts.find((p) => p.slug === params.slug);
  if (!post) notFound();

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <Link className="text-sm text-white/70 hover:text-white" href="/blog">
          ← 返回博客
        </Link>
        <span className="text-xs text-white/55">{post.date}</span>
      </div>

      <Card>
        <h1 className="text-xl font-semibold tracking-tight text-white/95 md:text-2xl">
          {post.title}
        </h1>
        <p className="mt-2 text-sm text-white/60">{post.summary}</p>
        <div className="mt-4 flex flex-wrap gap-2">
          {post.tags.map((t) => (
            <span
              key={t}
              className="rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-xs text-white/70"
            >
              {t}
            </span>
          ))}
        </div>

        <div className="mt-6 space-y-4 text-sm leading-7 text-white/75">
          {post.content.map((p, idx) => (
            <p key={idx}>{p}</p>
          ))}
        </div>
      </Card>
    </div>
  );
}

