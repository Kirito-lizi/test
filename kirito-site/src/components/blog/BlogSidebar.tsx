"use client";

import Link from "next/link";
import { profile, projects } from "@/content/data";
import { api, type Category, type Tag, type Stats } from "@/lib/api";
import { useEffect, useState } from "react";

export function BlogSidebar() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [tags, setTags] = useState<Tag[]>([]);
  const [stats, setStats] = useState<Stats | null>(null);
  const [postCount, setPostCount] = useState(0);

  useEffect(() => {
    api.categories.list().then((data) => setCategories(data));
    api.tags.list().then((data) => setTags(data));
    api.stats.get().then((data) => {
      setStats(data);
      setPostCount(Number(data.postCount));
    });
  }, []);

  return (
    <aside className="flex flex-col gap-5">
      {/* User Card */}
      <div className="rounded-2xl border border-white/10 bg-[linear-gradient(145deg,rgba(20,25,45,0.7),rgba(15,20,40,0.5))] p-5 shadow-[0_8px_40px_rgba(5,10,35,0.35)] backdrop-blur-2xl">
        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-[#7c8cfd] to-[#ff8c42] text-lg font-bold text-white shadow-lg shadow-[#7c8cfd]/20">
            {profile.name[0]}
          </div>
          <div>
            <h3 className="font-semibold text-white/95">{profile.name}</h3>
            <p className="text-xs text-white/50">{profile.title}</p>
          </div>
        </div>
        <p className="mt-3 text-sm leading-relaxed text-white/60">{profile.bio}</p>
        <div className="mt-4 flex gap-3 border-t border-white/10 pt-4 text-center">
          <div className="flex-1">
            <div className="text-lg font-semibold text-white/90">{postCount}</div>
            <div className="text-xs text-white/45">文章</div>
          </div>
          <div className="flex-1 border-l border-white/10">
            <div className="text-lg font-semibold text-white/90">{projects.length}</div>
            <div className="text-xs text-white/45">项目</div>
          </div>
          <div className="flex-1 border-l border-white/10">
            <div className="text-lg font-semibold text-white/90">{tags.length}</div>
            <div className="text-xs text-white/45">标签</div>
          </div>
        </div>
      </div>

      {/* Stats Card */}
      <div className="rounded-2xl border border-white/10 bg-[linear-gradient(145deg,rgba(20,25,45,0.7),rgba(15,20,40,0.5))] p-5 shadow-[0_8px_40px_rgba(5,10,35,0.35)] backdrop-blur-2xl">
        <h4 className="mb-3 text-sm font-semibold text-white/80">网站资讯</h4>
        <div className="space-y-2.5 text-sm">
          <div className="flex justify-between text-white/60">
            <span>文章数目</span>
            <span className="text-white/85">{stats?.postCount ?? "-"}</span>
          </div>
          <div className="flex justify-between text-white/60">
            <span>运行时间</span>
            <span className="text-white/85">{stats ? `${stats.runningDays} 天` : "-"}</span>
          </div>
          <div className="flex justify-between text-white/60">
            <span>博客访问</span>
            <span className="text-white/85">{stats?.totalVisits ?? "-"}</span>
          </div>
        </div>
      </div>

      {/* Categories */}
      {categories.length > 0 && (
        <div className="rounded-2xl border border-white/10 bg-[linear-gradient(145deg,rgba(20,25,45,0.7),rgba(15,20,40,0.5))] p-5 shadow-[0_8px_40px_rgba(5,10,35,0.35)] backdrop-blur-2xl">
          <h4 className="mb-3 text-sm font-semibold text-white/80">分类</h4>
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <span
                key={cat.id}
                className="rounded-full border border-white/10 bg-white/[0.04] px-2.5 py-1 text-xs text-white/60 transition hover:border-[#7c8cfd]/30 hover:text-white/85"
              >
                {cat.name}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Tag Cloud */}
      {tags.length > 0 && (
        <div className="rounded-2xl border border-white/10 bg-[linear-gradient(145deg,rgba(20,25,45,0.7),rgba(15,20,40,0.5))] p-5 shadow-[0_8px_40px_rgba(5,10,35,0.35)] backdrop-blur-2xl">
          <h4 className="mb-3 text-sm font-semibold text-white/80">标签云</h4>
          <div className="flex flex-wrap gap-2">
            {tags.map((tag) => (
              <span
                key={tag.id}
                className="rounded-full border border-white/10 bg-white/[0.04] px-2.5 py-1 text-xs text-white/60 transition hover:border-[#7c8cfd]/30 hover:text-white/85"
              >
                {tag.name}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Links */}
      <div className="rounded-2xl border border-white/10 bg-[linear-gradient(145deg,rgba(20,25,45,0.7),rgba(15,20,40,0.5))] p-5 shadow-[0_8px_40px_rgba(5,10,35,0.35)] backdrop-blur-2xl">
        <h4 className="mb-3 text-sm font-semibold text-white/80">导航</h4>
        <nav className="flex flex-col gap-2 text-sm">
          <Link href="/projects" className="text-white/55 transition hover:text-white/85">项目展示</Link>
          <Link href="/photos" className="text-white/55 transition hover:text-white/85">摄影作品</Link>
          <Link href="/resume" className="text-white/55 transition hover:text-white/85">个人经历</Link>
          <Link href="/contact" className="text-white/55 transition hover:text-white/85">联系我</Link>
        </nav>
      </div>
    </aside>
  );
}
