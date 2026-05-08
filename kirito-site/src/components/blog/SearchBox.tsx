"use client";

import { useState } from "react";
import Link from "next/link";
import { api, type Post } from "@/lib/api";

export default function SearchBox() {
  const [keyword, setKeyword] = useState("");
  const [results, setResults] = useState<Post[]>([]);
  const [showResults, setShowResults] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!keyword.trim()) return;
    setLoading(true);
    try {
      const page = await api.posts.search(keyword.trim());
      setResults(page.content);
      setShowResults(true);
    } catch {
      setResults([]);
      setShowResults(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative">
      <form onSubmit={handleSearch} className="flex gap-2">
        <input
          type="text"
          placeholder="搜索文章..."
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          className="flex-1 rounded-xl border border-white/10 bg-white/[0.04] px-4 py-2.5 text-sm text-white/85 placeholder:text-white/30 outline-none focus:border-[#7c8cfd]/40"
        />
        <button
          type="submit"
          disabled={loading}
          className="rounded-xl bg-gradient-to-r from-[#7c8cfd] to-[#a8b4ff] px-4 py-2.5 text-sm font-medium text-white transition hover:opacity-90 disabled:opacity-50"
        >
          {loading ? "搜索中..." : "搜索"}
        </button>
      </form>

      {showResults && (
        <div className="absolute z-20 mt-2 w-full rounded-2xl border border-white/10 bg-[#0f1729] p-4 shadow-[0_8px_40px_rgba(5,10,35,0.5)]">
          <div className="mb-2 flex items-center justify-between">
            <span className="text-xs text-white/50">
              找到 {results.length} 条结果
            </span>
            <button
              onClick={() => setShowResults(false)}
              className="text-xs text-white/40 hover:text-white/70"
            >
              关闭
            </button>
          </div>
          {results.length === 0 ? (
            <p className="py-4 text-center text-sm text-white/40">
              没有找到相关文章
            </p>
          ) : (
            <div className="flex max-h-64 flex-col gap-2 overflow-y-auto">
              {results.map((post) => (
                <Link
                  key={post.id}
                  href={`/blog/${post.slug}`}
                  onClick={() => {
                    setShowResults(false);
                    setKeyword("");
                  }}
                  className="rounded-xl border border-white/5 bg-white/[0.02] p-3 transition hover:border-white/15 hover:bg-white/[0.05]"
                >
                  <h4 className="text-sm font-medium text-white/80">
                    {post.title}
                  </h4>
                  <p className="mt-1 line-clamp-1 text-xs text-white/45">
                    {post.summary}
                  </p>
                </Link>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
