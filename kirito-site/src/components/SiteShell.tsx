import Link from "next/link";
import { type ReactNode } from "react";
import { NavLink } from "@/components/nav/NavLink";

export function SiteShell({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-dvh bg-tech text-foreground">
      <div className="pointer-events-none fixed inset-0 grid-overlay opacity-60" />
      <div className="mx-auto flex w-full max-w-6xl flex-col px-5">
        <header className="sticky top-0 z-20 -mx-5 border-b border-white/10 bg-black/30 px-5 backdrop-blur">
          <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between">
            <Link
              href="/"
              className="group inline-flex items-center gap-2 font-semibold tracking-tight"
            >
              <span className="h-2.5 w-2.5 rounded-full bg-cyan-300 shadow-[0_0_18px_rgba(34,211,238,0.75)]" />
              <span className="text-white/95 group-hover:text-white">Kirito</span>
            </Link>

            <nav className="hidden items-center gap-1 text-sm text-white/80 md:flex">
              <NavLink href="/">首页</NavLink>
              <NavLink href="/leetcode">刷题</NavLink>
              <NavLink href="/projects">项目</NavLink>
              <NavLink href="/blog">博客</NavLink>
              <NavLink href="/resume">经历</NavLink>
              <NavLink href="/photos">相册</NavLink>
              <NavLink href="/contact">联系</NavLink>
            </nav>
          </div>
        </header>

        <main className="w-full flex-1 py-10">{children}</main>

        <footer className="w-full border-t border-white/10 py-8 text-sm text-white/60">
          <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
            <p>© {new Date().getFullYear()} Kirito. 保留所有权利。</p>
            <div className="flex flex-wrap gap-x-4 gap-y-2">
              <a
                className="hover:text-white/85"
                href="https://github.com/"
                target="_blank"
                rel="noreferrer"
              >
                GitHub
              </a>
              <a className="hover:text-white/85" href="mailto:you@example.com">
                you@example.com
              </a>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}
