import Link from "next/link";
import { profile, posts, projects } from "@/content/data";
import { Card } from "@/components/ui/Card";
import { SectionHeader } from "@/components/ui/SectionHeader";

export default function Home() {
  return (
    <div className="home-flow flex flex-col gap-16">
      <section className="hero-surface relative flex min-h-screen items-center overflow-hidden rounded-3xl border border-white/10 px-8 py-12 shadow-[0_0_0_1px_rgba(130,170,255,0.12),0_30px_90px_rgba(0,0,0,0.55)] backdrop-blur md:px-12">
        <div className="hero-orb hero-orb-cyan" />
        <div className="hero-orb hero-orb-violet" />
        <div className="hero-grid" />
        <div className="hero-shine" />

        <div className="relative z-10 grid w-full gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:items-end">
          <div>
            <span className="inline-flex items-center rounded-full border border-cyan-300/35 bg-cyan-300/10 px-3 py-1 text-xs tracking-[0.2em] text-cyan-100">
              MAIN INTERFACE · 主页
            </span>
            <p className="mt-4 text-sm text-white/60">
              {profile.location} · {profile.title}
            </p>
            <h1 className="mt-3 text-4xl font-semibold tracking-tight text-white/95 md:text-6xl">
              {profile.name}
            </h1>
            <p className="mt-5 max-w-2xl text-base leading-8 text-white/75 md:text-lg">
              {profile.bio}
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="#blog"
                className="inline-flex items-center justify-center rounded-full bg-white/90 px-6 py-2.5 text-sm font-semibold text-black transition hover:bg-white"
              >
                进入博客流 ↓
              </Link>
              <Link
                href="/projects"
                className="inline-flex items-center justify-center rounded-full border border-white/20 bg-white/5 px-6 py-2.5 text-sm font-semibold text-white/85 transition hover:bg-white/10 hover:text-white"
              >
                看作品
              </Link>
              <Link
                href="/leetcode"
                className="inline-flex items-center justify-center rounded-full border border-cyan-300/50 bg-cyan-400/10 px-6 py-2.5 text-sm font-semibold text-cyan-100 transition hover:bg-cyan-400/20"
              >
                刷 LeetCode 100
              </Link>
            </div>
          </div>

          <div className="hero-panel rounded-2xl border border-white/10 bg-black/25 p-5 backdrop-blur">
            <p className="text-xs tracking-[0.2em] text-white/45">NOW READING</p>
            <h2 className="mt-3 text-lg font-semibold text-white/90">博客内容一滑即达</h2>
            <p className="mt-2 text-sm leading-6 text-white/65">
              下滑后会进入博客区块，保持阅读节奏、信息密度和页面视觉统一。
            </p>
            <div className="mt-5 grid gap-2">
              {posts.slice(0, 2).map((post) => (
                <Link
                  key={post.slug}
                  href={`/blog/${post.slug}`}
                  className="rounded-xl border border-white/10 bg-white/[0.03] px-3 py-2 text-sm text-white/75 transition hover:border-cyan-200/40 hover:text-white"
                >
                  {post.title}
                </Link>
              ))}
            </div>
          </div>
        </div>

        <div className="scroll-tip absolute bottom-6 left-1/2 z-10 -translate-x-1/2 text-xs text-white/60">
          向下滚动进入博客
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

      <section id="blog" className="scroll-mt-24">
        <SectionHeader
          title="最新博客"
          desc="继续下滑即可阅读，首页和博客保持同一视觉语言。"
          right={
            <Link className="text-sm text-white/70 hover:text-white" href="/blog">
              查看全部 →
            </Link>
          }
        />
        <div className="grid gap-4">
          {posts.slice(0, 3).map((post) => (
            <Card
              key={post.slug}
              className="group border-white/15 bg-gradient-to-r from-white/[0.05] to-transparent transition duration-300 hover:-translate-y-0.5 hover:border-cyan-200/35"
            >
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
