"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { type ReactNode } from "react";

export function NavLink({ href, children, onClick }: { href: string; children: ReactNode; onClick?: () => void }) {
  const pathname = usePathname();
  const isActive =
    pathname === href || (href !== "/" && pathname.startsWith(`${href}/`));

  return (
    <Link
      href={href}
      onClick={onClick}
      className={[
        "rounded-full px-3 py-1.5 transition",
        isActive
          ? "bg-white/18 text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.22)]"
          : "text-white/75 hover:bg-white/10 hover:text-white",
      ].join(" ")}
    >
      {children}
    </Link>
  );
}
