import Link from "next/link";
import { posts } from "@/content/data";
import { Card } from "@/components/ui/Card";
import { SectionHeader } from "@/components/ui/SectionHeader";

export const metadata = {
  title: "博客",
};

export default function BlogPage() {
  const sorted = [...posts].sort((a, b) => (a.date < b.date ? 1 : -1));

  return (
    <div className="flex flex-col gap-6">
      <SectionHeader title="博客" desc="工程笔记、思考与复盘。" />
      <div className="grid gap-4">
        {sorted.map((post) => (
          <Card key={post.slug} className="group">
            <Link href={`/blog/${post.slug}`} className="block">
              <div className="flex flex-col gap-2 md:flex-row md:items-baseline md:justify-between">
                <h1 className="text-base font-semibold text-white/95 group-hover:text-white">
                  {post.title}
                </h1>
                <span className="text-xs text-white/55">{post.date}</span>
              </div>
              <p className="mt-2 text-sm leading-6 text-white/65">
                {post.summary}
              </p>
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
            </Link>
          </Card>
        ))}
      </div>
    </div>
  );
}

