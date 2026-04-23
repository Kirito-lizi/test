import { profile } from "@/content/data";
import { Card } from "@/components/ui/Card";
import { SectionHeader } from "@/components/ui/SectionHeader";

export const metadata = {
  title: "联系",
};

export default function ContactPage() {
  return (
    <div className="flex flex-col gap-6">
      <SectionHeader
        title="联系"
        desc="如果你想聊项目、博客、动效设计或者 Java / Web 方向的实践，可以从这里找到我。"
        revealOrder={0}
      />

      <div className="grid gap-4 md:grid-cols-2">
        <Card revealOrder={1}>
          <h1 className="text-base font-semibold text-white/95">邮箱</h1>
          <p className="mt-2 text-sm text-white/65">
            <a
              className="text-emerald-100/85 transition hover:text-emerald-50"
              href={`mailto:${profile.email}`}
            >
              {profile.email}
            </a>
          </p>
        </Card>

        <Card revealOrder={2}>
          <h1 className="text-base font-semibold text-white/95">GitHub</h1>
          <p className="mt-2 text-sm text-white/65">
            <a
              className="text-emerald-100/85 transition hover:text-emerald-50"
              href={profile.links.github}
              target="_blank"
              rel="noreferrer"
            >
              {profile.links.github}
            </a>
          </p>
        </Card>
      </div>
    </div>
  );
}
