import { projects } from "@/content/data";
import { Card } from "@/components/ui/Card";
import { SectionHeader } from "@/components/ui/SectionHeader";

export const metadata = {
  title: "项目",
};

export default function ProjectsPage() {
  return (
    <div className="flex flex-col gap-6">
      <SectionHeader
        title="项目"
        desc="一些我重点打磨过的方向，既看重技术实现，也重视最终体验。"
        revealOrder={0}
      />

      <div className="grid gap-4 md:grid-cols-2">
        {projects.map((project, index) => (
          <Card
            key={project.name}
            className="group hover:-translate-y-0.5"
            revealOrder={index + 1}
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <h1 className="text-base font-semibold text-white/95 group-hover:text-white">
                  {project.name}
                </h1>
                <p className="mt-2 text-sm leading-6 text-white/65">{project.desc}</p>
              </div>
              {project.year ? (
                <span className="rounded-full border border-white/10 bg-black/15 px-2 py-1 text-xs text-white/60">
                  {project.year}
                </span>
              ) : null}
            </div>

            <div className="mt-4 flex flex-wrap gap-2">
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full border border-white/10 bg-white/6 px-2.5 py-1 text-xs text-white/70"
                >
                  {tag}
                </span>
              ))}
            </div>

            {project.href ? (
              <div className="mt-4">
                <a
                  className="text-sm text-emerald-100/85 transition hover:text-emerald-50"
                  href={project.href}
                  target="_blank"
                  rel="noreferrer"
                >
                  查看链接
                </a>
              </div>
            ) : null}
          </Card>
        ))}
      </div>
    </div>
  );
}
