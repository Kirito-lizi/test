import { type CSSProperties, type ReactNode } from "react";

export function SectionHeader({
  title,
  desc,
  right,
  revealOrder,
}: {
  title: string;
  desc?: string;
  right?: ReactNode;
  revealOrder?: number;
}) {
  return (
    <div
      data-reveal="soft"
      className="mb-4 flex flex-col gap-2 md:flex-row md:items-end md:justify-between"
      style={
        revealOrder !== undefined
          ? ({ "--reveal-order": revealOrder } as CSSProperties)
          : undefined
      }
    >
      <div>
        <h2 className="font-display text-2xl font-semibold tracking-tight text-white/95 md:text-3xl">
          {title}
        </h2>
        {desc ? <p className="mt-1 text-sm text-white/65 md:text-base">{desc}</p> : null}
      </div>
      {right ? <div className="shrink-0">{right}</div> : null}
    </div>
  );
}
