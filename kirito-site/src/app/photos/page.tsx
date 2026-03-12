import Image from "next/image";
import { photos } from "@/content/data";
import { Card } from "@/components/ui/Card";
import { SectionHeader } from "@/components/ui/SectionHeader";

export const metadata = {
  title: "相册",
};

export default function PhotosPage() {
  return (
    <div className="flex flex-col gap-6">
      <SectionHeader title="相册" desc="你可以把图片放到 `public/photos/`。" />

      <div className="grid gap-4 md:grid-cols-2">
        {photos.map((p) => (
          <Card key={p.src} className="p-0 overflow-hidden">
            <div className="relative aspect-[3/2] w-full">
              <Image
                src={p.src}
                alt={p.alt}
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover"
                priority={false}
              />
            </div>
            <div className="p-4 text-sm text-white/70">{p.alt}</div>
          </Card>
        ))}
      </div>
    </div>
  );
}

