"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { type ReactNode, useState } from "react";
import { profile } from "@/content/data";
import { MotionController } from "@/components/motion/MotionController";
import { NavLink } from "@/components/nav/NavLink";

export function SiteShell({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const isLanding = pathname === "/";
  const isAdmin = pathname.startsWith("/admin");
  const [menuOpen, setMenuOpen] = useState(false);

  if (isLanding || isAdmin) {
    return <div className="nature-app">{children}</div>;
  }

  return (
    <div className="nature-app">
      <MotionController />
      <div aria-hidden="true" className="site-shell-glow site-shell-glow-a" />
      <div aria-hidden="true" className="site-shell-glow site-shell-glow-b" />
      <div aria-hidden="true" className="site-shell-streak site-shell-streak-a" />
      <div aria-hidden="true" className="site-shell-streak site-shell-streak-b" />

      <div className="mx-auto flex w-full max-w-6xl flex-col px-5 pb-8 pt-4 sm:px-6 lg:px-8">
        <header className="site-shell-header sticky top-4 z-20 mb-8 rounded-2xl border border-white/10 bg-white/[0.06] px-5 shadow-[0_8px_40px_rgba(5,10,35,0.3)] backdrop-blur-2xl">
          <div className="mx-auto flex min-h-14 w-full items-center justify-between gap-4">
            <Link
              href="/"
              className="group inline-flex items-center gap-3 font-semibold tracking-tight"
            >
              <span className="site-shell-logo" />
              <span className="text-white/95 transition group-hover:text-white">
                Kirito
              </span>
            </Link>

            <nav className="hidden items-center gap-1 text-sm text-white/75 md:flex">
              <NavLink href="/blog">博客</NavLink>
              <NavLink href="/resume">经历</NavLink>
              <NavLink href="/photos">相册</NavLink>
              <NavLink href="/contact">联系</NavLink>
            </nav>

            <button
              className="flex h-8 w-8 items-center justify-center rounded-lg text-white/75 transition hover:bg-white/10 hover:text-white md:hidden"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="菜单"
            >
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                {menuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>

          {menuOpen && (
            <nav className="flex flex-col gap-1 border-t border-white/10 py-3 text-sm text-white/75 md:hidden">
              <NavLink href="/blog" onClick={() => setMenuOpen(false)}>博客</NavLink>
              <NavLink href="/resume" onClick={() => setMenuOpen(false)}>经历</NavLink>
              <NavLink href="/photos" onClick={() => setMenuOpen(false)}>相册</NavLink>
              <NavLink href="/contact" onClick={() => setMenuOpen(false)}>联系</NavLink>
            </nav>
          )}
        </header>

        <main className="site-shell-main w-full flex-1 py-6 md:py-10">
          <div key={pathname} className="route-stage">
            {children}
          </div>
        </main>

        <footer className="site-shell-footer mt-10 w-full border-t border-white/10 py-8 text-sm text-white/60">
          <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
            <p>{new Date().getFullYear()} Kirito. 清新自然的技术博客。</p>
            <div className="flex flex-wrap gap-x-4 gap-y-2">
              <a
                className="hover:text-white/85"
                href={profile.links.github}
                target="_blank"
                rel="noreferrer"
              >
                GitHub
              </a>
              <a className="hover:text-white/85" href={`mailto:${profile.email}`}>
                {profile.email}
              </a>
            </div>
          </div>
          <div className="mt-4 text-center">
            <a
              href="https://beian.miit.gov.cn/"
              target="_blank"
              rel="noopener"
              className="hover:text-white/85"
            >
              皖ICP备2026006680号-1
            </a>
          </div>
        </footer>
      </div>
    </div>
  );
}
