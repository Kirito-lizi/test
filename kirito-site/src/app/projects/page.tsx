import { projects } from "@/content/data";
import { Card } from "@/components/ui/Card";
import { SectionHeader } from "@/components/ui/SectionHeader";

export const metadata = {
  title: "项目",
};

export default function ProjectsPage() {
  return (
    <div className="flex flex-col gap-6">
      <SectionHeader title="项目 / 作品集" desc="一些我做过的东西（可替换为真实链接）。" />
      <div className="grid gap-4 md:grid-cols-2">
        {projects.map((p) => (
          <Card key={p.name} className="group">
            <div className="flex items-start justify-between gap-4">
              <div>
                <h1 className="text-base font-semibold text-white/95 group-hover:text-white">
                  {p.name}
                </h1>
                <p className="mt-2 text-sm leading-6 text-white/65">{p.desc}</p>
              </div>
              {p.year ? (
                <span className="rounded-full border border-white/10 bg-black/20 px-2 py-1 text-xs text-white/60">
                  {p.year}
                </span>
              ) : null}
            </div>
            <div className="mt-4 flex flex-wrap gap-2">
              {p.tags.map((t) => (
                <span
                  key={t}
                  className="rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-xs text-white/70"
                >
                  {t}
                </span>
              ))}
            </div>
            {p.href ? (
              <div className="mt-4">
                <a
                  className="text-sm text-cyan-200/80 hover:text-cyan-200"
                  href={p.href}
                  target="_blank"
                  rel="noreferrer"
                >
                  查看链接 →
                </a>
              </div>
            ) : null}
          </Card>
        ))}
      </div>
    </div>
  );
}

