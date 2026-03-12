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
        title="联系我"
        desc="GitHub Pages 纯静态不适合直接发邮件表单；建议放邮箱/社媒/二维码。"
      />

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <h1 className="text-base font-semibold text-white/95">邮箱</h1>
          <p className="mt-2 text-sm text-white/65">
            <a className="text-cyan-200/80 hover:text-cyan-200" href={`mailto:${profile.email}`}>
              {profile.email}
            </a>
          </p>
        </Card>

        <Card>
          <h1 className="text-base font-semibold text-white/95">GitHub</h1>
          <p className="mt-2 text-sm text-white/65">
            <a
              className="text-cyan-200/80 hover:text-cyan-200"
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

