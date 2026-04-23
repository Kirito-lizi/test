import { type CSSProperties, type ReactNode } from "react";

export function Card({
  children,
  className = "",
  reveal = true,
  revealOrder,
  style,
}: {
  children: ReactNode;
  className?: string;
  reveal?: boolean;
  revealOrder?: number;
  style?: CSSProperties;
}) {
  const motionStyle =
    reveal && revealOrder !== undefined
      ? ({ ...style, "--reveal-order": revealOrder } as CSSProperties)
      : style;

  return (
    <div
      data-reveal={reveal ? "up" : undefined}
      className={[
        "rounded-[28px] border border-white/14 bg-[linear-gradient(145deg,rgba(255,255,255,0.16),rgba(255,255,255,0.05))] p-5 shadow-[0_18px_60px_rgba(6,30,22,0.22)] backdrop-blur-2xl transition duration-300",
        className,
      ].join(" ")}
      style={motionStyle}
    >
      {children}
    </div>
  );
}
