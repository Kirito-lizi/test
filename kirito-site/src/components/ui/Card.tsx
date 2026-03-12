import { type ReactNode } from "react";

export function Card({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={[
        "rounded-2xl border border-white/10 bg-white/5 p-5 shadow-[0_0_0_1px_rgba(130,170,255,0.12),0_18px_50px_rgba(0,0,0,0.35)] backdrop-blur",
        className,
      ].join(" ")}
    >
      {children}
    </div>
  );
}

