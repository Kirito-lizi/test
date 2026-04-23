import Link from "next/link";
import { notFound } from "next/navigation";
import { type CSSProperties } from "react";
import { posts } from "@/content/data";
import { Card } from "@/components/ui/Card";

export function generateStaticParams() {
  return posts.map((post) => ({ slug: post.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }) {
  const post = posts.find((item) => item.slug === params.slug);
  if (!post) return { title: "文章不存在" };

  return {
    title: post.title,
    description: post.summary,
  };
}

export default function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = posts.find((item) => item.slug === params.slug);
  if (!post) notFound();

  return (
    <article className="flex flex-col gap-6">
      <div className="flex items-center justify-between gap-4">
        <Link
          className="text-sm text-white/72 transition hover:text-white"
          href="/blog"
          data-reveal="side"
          style={{ "--reveal-order": 0 } as CSSProperties}
        >
          返回博客
        </Link>
        <span
          className="text-xs text-white/55"
          data-reveal="soft"
          style={{ "--reveal-order": 1 } as CSSProperties}
        >
          {post.date}
        </span>
      </div>

      <Card className="p-6 md:p-8" revealOrder={2}>
        <h1 className="font-display text-3xl font-semibold tracking-tight text-white/95 md:text-4xl">
          {post.title}
        </h1>
        <p className="mt-3 text-sm text-white/60 md:text-base">{post.summary}</p>

        <div className="mt-5 flex flex-wrap gap-2">
          {post.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full border border-white/10 bg-white/6 px-2.5 py-1 text-xs text-white/70"
            >
              {tag}
            </span>
          ))}
        </div>

        <div className="mt-8 space-y-5 text-sm leading-8 text-white/78 md:text-base">
          {post.content.map((paragraph, index) => (
            <p
              key={paragraph}
              data-reveal="soft"
              style={{ "--reveal-order": index + 3 } as CSSProperties}
            >
              {paragraph}
            </p>
          ))}
        </div>
      </Card>
    </article>
  );
}
