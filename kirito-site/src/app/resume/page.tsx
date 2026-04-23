import { timeline } from "@/content/data";
import { Card } from "@/components/ui/Card";
import { SectionHeader } from "@/components/ui/SectionHeader";

export const metadata = {
  title: "经历",
};

export default function ResumePage() {
  return (
    <div className="flex flex-col gap-6">
      <SectionHeader
        title="经历"
        desc="我更在意持续积累的能力：设计判断、工程质量、交互表达和问题拆解。"
        revealOrder={0}
      />

      <div className="grid gap-4">
        {timeline.map((item, index) => (
          <Card key={`${item.time}-${item.title}`} revealOrder={index + 1}>
            <div className="flex flex-col gap-2 md:flex-row md:items-baseline md:justify-between">
              <div>
                <h1 className="text-base font-semibold text-white/95">
                  {item.title}
                  {item.org ? <span className="text-white/60"> · {item.org}</span> : null}
                </h1>
                {item.desc ? (
                  <p className="mt-2 text-sm leading-6 text-white/65">{item.desc}</p>
                ) : null}
              </div>
              <span className="text-xs text-white/55">{item.time}</span>
            </div>

            {item.highlights?.length ? (
              <ul className="mt-4 list-disc space-y-1 pl-5 text-sm text-white/72">
                {item.highlights.map((highlight) => (
                  <li key={highlight}>{highlight}</li>
                ))}
              </ul>
            ) : null}
          </Card>
        ))}
      </div>
    </div>
  );
}
