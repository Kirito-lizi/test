"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { api, type Photo } from "@/lib/api";

const API_BASE =
  process.env.NEXT_PUBLIC_API_URL || "http://47.110.134.77";

export default function AlbumPage() {
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [description, setDescription] = useState("");
  const [copiedId, setCopiedId] = useState<number | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const loadPhotos = useCallback(() => {
    setLoading(true);
    api.admin.photos.list(0, 100).then((page) => {
      setPhotos(page.content);
      setLoading(false);
    });
  }, []);

  useEffect(() => {
    loadPhotos();
  }, [loadPhotos]);

  const handleUpload = async (files: FileList | null) => {
    if (!files || files.length === 0) return;
    setUploading(true);
    try {
      for (const file of Array.from(files)) {
        const relativeUrl = await api.admin.upload(file);
        await api.admin.photos.create({
          url: relativeUrl,
          description: description || file.name,
        });
      }
      setDescription("");
      loadPhotos();
    } catch (err) {
      alert(err instanceof Error ? err.message : "上传失败");
    } finally {
      setUploading(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm("确定删除这张照片？")) return;
    try {
      await api.admin.photos.delete(id);
      setPhotos((prev) => prev.filter((p) => p.id !== id));
    } catch (err) {
      alert(err instanceof Error ? err.message : "删除失败");
    }
  };

  const handleCopyLink = (photo: Photo) => {
    const fullUrl = photo.url.startsWith("http") ? photo.url : `${API_BASE}${photo.url}`;
    navigator.clipboard.writeText(fullUrl);
    setCopiedId(photo.id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-2xl font-semibold text-white/90">相册管理</h1>

      {/* Upload Area */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end">
        <div className="flex-1">
          <label className="block text-sm text-white/70 mb-1">
            图片描述（可选）
          </label>
          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="为上传的图片添加描述..."
            className="w-full rounded-lg border border-white/10 bg-white/[0.05] px-3 py-2 text-sm text-white/90 outline-none focus:border-[#7c8cfd]/50"
          />
        </div>
        <button
          onClick={() => fileInputRef.current?.click()}
          disabled={uploading}
          className="rounded-lg bg-[#7c8cfd]/80 px-4 py-2 text-sm font-medium text-white transition hover:bg-[#7c8cfd] disabled:opacity-50"
        >
          {uploading ? "上传中..." : "选择图片"}
        </button>
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          multiple
          className="hidden"
          onChange={(e) => handleUpload(e.target.files)}
        />
      </div>

      {/* Drag & Drop Zone */}
      <div
        className="rounded-2xl border-2 border-dashed border-white/20 bg-white/[0.03] p-8 text-center transition cursor-pointer hover:border-[#7c8cfd]/40"
        onClick={() => fileInputRef.current?.click()}
        onDragOver={(e) => e.preventDefault()}
        onDrop={(e) => {
          e.preventDefault();
          handleUpload(e.dataTransfer.files);
        }}
      >
        <p className="text-white/50 text-sm">
          {uploading ? "上传中..." : "或将图片拖拽到此处"}
        </p>
      </div>

      {/* Photo Grid */}
      {loading ? (
        <p className="text-white/40 text-sm">加载中...</p>
      ) : photos.length === 0 ? (
        <p className="text-white/40 text-sm">还没有照片，上传第一张吧</p>
      ) : (
        <div className="columns-2 md:columns-3 lg:columns-4 gap-4 space-y-4">
          {photos.map((photo) => (
            <div
              key={photo.id}
              className="break-inside-avoid rounded-2xl border border-white/10 bg-[linear-gradient(145deg,rgba(20,25,45,0.7),rgba(15,20,40,0.5))] overflow-hidden backdrop-blur-2xl"
            >
              <img
                src={photo.url.startsWith("http") ? photo.url : `${API_BASE}${photo.url}`}
                alt={photo.description}
                className="w-full object-cover"
                loading="lazy"
              />
              <div className="p-3 flex items-center justify-between gap-2">
                <p className="text-xs text-white/50 truncate flex-1">
                  {photo.description}
                </p>
                <div className="flex gap-1 shrink-0">
                  <button
                    onClick={() => handleCopyLink(photo)}
                    className="rounded-md px-2 py-1 text-xs text-white/60 bg-white/[0.06] hover:bg-white/10 transition"
                  >
                    {copiedId === photo.id ? "已复制" : "复制链接"}
                  </button>
                  <button
                    onClick={() => handleDelete(photo.id)}
                    className="rounded-md px-2 py-1 text-xs text-red-400/70 bg-red-500/[0.08] hover:bg-red-500/15 transition"
                  >
                    删除
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
