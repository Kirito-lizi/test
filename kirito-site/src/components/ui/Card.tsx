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
        "rounded-2xl border border-white/10 bg-[linear-gradient(145deg,rgba(20,25,45,0.7),rgba(15,20,40,0.5))] p-5 shadow-[0_8px_40px_rgba(5,10,35,0.35)] backdrop-blur-2xl transition duration-300",
        className,
      ].join(" ")}
      style={motionStyle}
    >
      {children}
    </div>
  );
}
