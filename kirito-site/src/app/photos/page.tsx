"use client";

import { useEffect, useState } from "react";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { PhotosGrid } from "@/components/photos/PhotosGrid";
import { api, type Photo } from "@/lib/api";

export default function PhotosPage() {
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.admin.photos
      .list(0, 100)
      .then((page) => {
        setPhotos(page.content);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  return (
    <div className="flex flex-col gap-6">
      <SectionHeader
        title="相册"
        desc="记录生活中的美好瞬间。"
        revealOrder={0}
      />

      {loading ? (
        <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-12 text-center text-white/50">
          加载中...
        </div>
      ) : photos.length === 0 ? (
        <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-12 text-center text-white/50">
          <p className="text-lg mb-2">📷</p>
          <p>暂无照片，去管理后台上传吧</p>
        </div>
      ) : (
        <PhotosGrid photos={photos} />
      )}
    </div>
  );
}
