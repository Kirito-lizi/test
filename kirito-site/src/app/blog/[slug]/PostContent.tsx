"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Card } from "@/components/ui/Card";
import { api, type Post } from "@/lib/api";
import CommentSection from "@/components/blog/CommentSection";
import LikeButton from "@/components/blog/LikeButton";

export default function PostContent({ slug }: { slug: string }) {
  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!slug) return;
    api.posts
      .get(slug)
      .then((data) => {
        setPost(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to load post:", err);
        setError(err.message || "文章不存在");
        setLoading(false);
      });
  }, [slug]);

  if (loading) {
    return (
      <div className="flex flex-col gap-6">
        <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-8 text-center text-white/50">
          加载中...
        </div>
      </div>
    );
  }

  if (error || !post) {
    return (
      <div className="flex flex-col gap-6">
        <Link className="text-sm text-white/72 transition hover:text-white" href="/blog">
          返回博客
        </Link>
        <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-8 text-center text-white/50">
          {error || "文章不存在"}
        </div>
      </div>
    );
  }

  return (
    <article className="flex flex-col gap-6">
      <div className="flex items-center justify-between gap-4">
        <Link
          className="text-sm text-white/72 transition hover:text-white"
          href="/blog"
        >
          返回博客
        </Link>
        <span className="text-xs text-white/55">
          {post.createdAt ? post.createdAt.split("T")[0] : ""}
        </span>
      </div>

      <Card className="p-6 md:p-8" reveal={false}>
        <h1 className="font-display text-3xl font-semibold tracking-tight text-white/95 md:text-4xl">
          {post.title}
        </h1>
        <p className="mt-3 text-sm text-white/60 md:text-base">{post.summary}</p>

        <div className="mt-5 flex flex-wrap gap-2">
          {post.tags?.map((tag) => (
            <span
              key={tag.id}
              className="rounded-full border border-white/10 bg-white/6 px-2.5 py-1 text-xs text-white/70"
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

        <div className="mt-8 space-y-5 text-sm leading-8 text-white/78 md:text-base">
          {post.content?.split("\n").map((paragraph, index) =>
            paragraph.startsWith("#") ? (
              <h2 key={index} className="text-xl font-semibold text-white/90">
                {paragraph.replace(/^#+\s*/, "")}
              </h2>
            ) : paragraph.trim() ? (
              <p key={index}>{paragraph}</p>
            ) : null
          )}
        </div>
      </Card>

      <div className="flex justify-end">
        <LikeButton postId={post.id} />
      </div>

      <CommentSection postId={post.id} />
    </article>
  );
}
