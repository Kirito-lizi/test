"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { type ReactNode } from "react";

const navItems = [
  { href: "/admin/write", label: "写博客" },
  { href: "/admin/album", label: "相册管理" },
];

export default function AdminLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname();

  return (
    <div className="flex min-h-screen">
      <aside className="w-56 shrink-0 border-r border-white/10 bg-white/[0.03] backdrop-blur-xl p-4">
        <div className="mb-6">
          <Link
            href="/"
            className="text-sm text-white/50 hover:text-white/80 transition"
          >
            ← 返回首页
          </Link>
        </div>
        <h2 className="mb-4 text-lg font-semibold text-white/90">管理后台</h2>
        <nav className="flex flex-col gap-1">
          {navItems.map((item) => {
            const isActive =
              pathname === item.href ||
              pathname.startsWith(item.href + "/");
            return (
              <Link
                key={item.href}
                href={item.href}
                className={[
                  "rounded-lg px-3 py-2 text-sm transition",
                  isActive
                    ? "bg-white/15 text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.15)]"
                    : "text-white/60 hover:bg-white/[0.08] hover:text-white/85",
                ].join(" ")}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>
      </aside>

      <main className="flex-1 overflow-auto p-6 md:p-8">{children}</main>
    </div>
  );
}
