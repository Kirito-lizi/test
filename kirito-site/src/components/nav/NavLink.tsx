import Link from "next/link";
import { type ReactNode } from "react";

export function NavLink({ href, children }: { href: string; children: ReactNode }) {
  return (
    <Link
      href={href}
      className="rounded-full px-3 py-1.5 text-white/75 transition hover:bg-white/10 hover:text-white"
    >
      {children}
    </Link>
  );
}

