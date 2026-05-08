"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Card } from "@/components/ui/Card";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { BlogSidebar } from "@/components/blog/BlogSidebar";
import SearchBox from "@/components/blog/SearchBox";
import { api, type Post } from "@/lib/api";

export default function BlogPage() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.posts
      .list(0, 20)
      .then((page) => {
        setPosts(page.content);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  }, []);

  return (
    <div className="flex flex-col gap-6">
      <SectionHeader
        title="博客"
        desc="记录我对前端设计、工程实现、视觉表达和 Web 体验的思考。"
        revealOrder={0}
      />

      <SearchBox />

      <div className="grid gap-6 lg:grid-cols-[1fr_280px]">
        <div className="flex flex-col gap-4">
          {loading && (
            <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-8 text-center text-white/50">
              加载中...
            </div>
          )}
          {!loading && posts.length === 0 && (
            <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-8 text-center text-white/50">
              暂无文章
            </div>
          )}
          {posts.map((post) => (
            <Card
              key={post.id}
              className="group hover:-translate-y-0.5"
              reveal={false}
            >
              <Link href={`/blog/${post.slug}`} className="block">
                <div className="flex flex-col gap-2 md:flex-row md:items-baseline md:justify-between">
                  <h1 className="text-base font-semibold text-white/90 group-hover:text-white">
                    {post.title}
                  </h1>
                  <span className="text-xs text-white/50">
                    {post.createdAt ? post.createdAt.split("T")[0] : ""}
                  </span>
                </div>
                <p className="mt-2 text-sm leading-6 text-white/55">{post.summary}</p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {post.tags?.map((tag) => (
                    <span
                      key={tag.id}
                      className="rounded-full border border-white/10 bg-white/[0.04] px-2.5 py-1 text-xs text-white/60"
                    >
                      {tag.name}
                    </span>
                  ))}
                </div>
                <div className="mt-3 flex items-center gap-4 text-xs text-white/40">
                  <span>{post.category?.name}</span>
                  <span>阅读 {post.viewCount}</span>
                  <span>点赞 {post.likeCount}</span>
                </div>
              </Link>
            </Card>
          ))}
        </div>

        <div className="hidden lg:block">
          <div className="sticky top-24">
            <BlogSidebar />
          </div>
        </div>
      </div>
    </div>
  );
}
