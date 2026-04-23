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
      <SectionHeader
        title="相册"
        desc="这里可以继续扩展成摄影、旅行或者视觉灵感收藏页。"
        revealOrder={0}
      />

      <div className="grid gap-4 md:grid-cols-2">
        {photos.map((photo, index) => (
          <Card
            key={photo.src}
            className="overflow-hidden p-0"
            revealOrder={index + 1}
          >
            <div className="relative aspect-[3/2] w-full">
              <Image
                src={photo.src}
                alt={photo.alt}
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover"
                priority={false}
              />
            </div>
            <div className="p-4 text-sm text-white/70">{photo.alt}</div>
          </Card>
        ))}
      </div>
    </div>
  );
}
