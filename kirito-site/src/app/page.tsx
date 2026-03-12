import Link from "next/link";
import { profile, posts, projects } from "@/content/data";
import { Card } from "@/components/ui/Card";
import { SectionHeader } from "@/components/ui/SectionHeader";

export default function Home() {
  return (
    <div className="flex flex-col gap-10">
      <section className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 p-8 shadow-[0_0_0_1px_rgba(130,170,255,0.12),0_30px_80px_rgba(0,0,0,0.45)] backdrop-blur md:p-12">
        <div className="pointer-events-none absolute -top-24 right-[-120px] h-72 w-72 rounded-full bg-cyan-400/20 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-24 left-[-90px] h-72 w-72 rounded-full bg-fuchsia-400/15 blur-3xl" />

        <p className="text-sm text-white/60">
          {profile.location} · {profile.title}
        </p>
        <h1 className="mt-3 text-3xl font-semibold tracking-tight text-white/95 md:text-5xl">
          {profile.name}
        </h1>
        <p className="mt-4 max-w-2xl text-base leading-7 text-white/70 md:text-lg">
          {profile.bio}
        </p>

        <div className="mt-7 flex flex-wrap gap-3">
          <Link
            href="/projects"
            className="inline-flex items-center justify-center rounded-full bg-white/90 px-5 py-2 text-sm font-semibold text-black transition hover:bg-white"
          >
            看作品
          </Link>
          <Link
            href="/contact"
            className="inline-flex items-center justify-center rounded-full border border-white/15 bg-white/5 px-5 py-2 text-sm font-semibold text-white/85 transition hover:bg-white/10 hover:text-white"
          >
            联系我
          </Link>
          <Link
            href="/leetcode"
            className="inline-flex items-center justify-center rounded-full border border-cyan-300/50 bg-cyan-400/10 px-5 py-2 text-sm font-semibold text-cyan-100 hover:bg-cyan-400/20"
          >
            刷 LeetCode 100
          </Link>
        </div>
      </section>

      <section>
        <SectionHeader
          title="精选项目"
          desc="可快速替换为你的真实项目与链接。"
          right={
            <Link className="text-sm text-white/70 hover:text-white" href="/projects">
              查看全部 →
            </Link>
          }
        />
        <div className="grid gap-4 md:grid-cols-2">
          {projects.slice(0, 2).map((p) => (
            <Card key={p.name} className="group">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h3 className="text-base font-semibold text-white/95 group-hover:text-white">
                    {p.name}
                  </h3>
                  <p className="mt-2 text-sm leading-6 text-white/65">{p.desc}</p>
                </div>
                {p.year ? (
                  <span className="rounded-full border border-white/10 bg-black/20 px-2 py-1 text-xs text-white/60">
                    {p.year}
                  </span>
                ) : null}
              </div>
              <div className="mt-4 flex flex-wrap gap-2">
                {p.tags.map((t) => (
                  <span
                    key={t}
                    className="rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-xs text-white/70"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </Card>
          ))}
        </div>
      </section>

      <section>
        <SectionHeader
          title="最新博客"
          desc="轻量静态内容，适合 GitHub Pages。"
          right={
            <Link className="text-sm text-white/70 hover:text-white" href="/blog">
              查看全部 →
            </Link>
          }
        />
        <div className="grid gap-4">
          {posts.slice(0, 2).map((post) => (
            <Card key={post.slug} className="group">
              <Link href={`/blog/${post.slug}`} className="block">
                <div className="flex flex-col gap-2 md:flex-row md:items-baseline md:justify-between">
                  <h3 className="text-base font-semibold text-white/95 group-hover:text-white">
                    {post.title}
                  </h3>
                  <span className="text-xs text-white/55">{post.date}</span>
                </div>
                <p className="mt-2 text-sm leading-6 text-white/65">{post.summary}</p>
              </Link>
            </Card>
          ))}
        </div>
      </section>
    </div>
  );
}
