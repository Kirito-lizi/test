"use client";

import { useEffect, useState, useRef } from "react";

interface Photo {
  id: number;
  url: string;
  description: string;
  uploadTime: string;
}

const API_BASE = "/api";

export default function AdminPhotosPage() {
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [desc, setDesc] = useState("");
  const [msg, setMsg] = useState("");
  const fileRef = useRef<HTMLInputElement>(null);

  const loadPhotos = () => {
    fetch(`${API_BASE}/admin/photos?page=0&size=100`)
      .then((r) => r.json())
      .then((json) => {
        if (json.code === 200) setPhotos(json.data.content);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  };

  useEffect(() => {
    loadPhotos();
  }, []);

  const handleUpload = async () => {
    const file = fileRef.current?.files?.[0];
    if (!file) {
      setMsg("请先选择文件");
      return;
    }

    setUploading(true);
    setMsg("");

    try {
      const formData = new FormData();
      formData.append("file", file);

      const uploadRes = await fetch(`${API_BASE}/admin/upload`, {
        method: "POST",
        body: formData,
      });
      const uploadJson = await uploadRes.json();

      if (uploadJson.code !== 200) {
        setMsg("上传失败: " + uploadJson.message);
        setUploading(false);
        return;
      }

      const url = uploadJson.data;

      const createRes = await fetch(`${API_BASE}/admin/photos`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url, description: desc || "" }),
      });
      const createJson = await createRes.json();

      if (createJson.code === 200) {
        setMsg("上传成功!");
        setDesc("");
        if (fileRef.current) fileRef.current.value = "";
        loadPhotos();
      } else {
        setMsg("保存失败: " + createJson.message);
      }
    } catch (err) {
      setMsg("上传出错: " + String(err));
    }

    setUploading(false);
  };

  const handleDelete = async (id: number) => {
    if (!confirm("确定删除这张照片?")) return;

    await fetch(`${API_BASE}/admin/photos/${id}`, { method: "DELETE" });
    loadPhotos();
  };

  return (
    <div className="mx-auto max-w-3xl p-6 text-white">
      <h1 className="text-2xl font-semibold mb-6">相册管理</h1>

      {/* 上传区域 */}
      <div className="mb-8 rounded-xl border border-white/10 bg-white/[0.03] p-5">
        <h2 className="text-base font-medium mb-4">上传照片</h2>
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <input
            ref={fileRef}
            type="file"
            accept="image/*"
            className="text-sm text-white/70 file:mr-3 file:rounded-lg file:border-0 file:bg-white/10 file:px-3 file:py-1.5 file:text-sm file:text-white hover:file:bg-white/20"
          />
          <input
            type="text"
            placeholder="照片描述 (可选)"
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
            className="rounded-lg border border-white/10 bg-white/[0.05] px-3 py-1.5 text-sm text-white placeholder:text-white/30 focus:border-white/30 focus:outline-none"
          />
          <button
            onClick={handleUpload}
            disabled={uploading}
            className="rounded-lg bg-white/90 px-4 py-1.5 text-sm font-medium text-black transition hover:bg-white disabled:opacity-50"
          >
            {uploading ? "上传中..." : "上传"}
          </button>
        </div>
        {msg && (
          <p className={`mt-3 text-sm ${msg.includes("成功") ? "text-green-400" : "text-red-400"}`}>
            {msg}
          </p>
        )}
      </div>

      {/* 照片列表 */}
      <h2 className="text-base font-medium mb-4">已有照片 ({photos.length})</h2>
      {loading ? (
        <p className="text-white/50">加载中...</p>
      ) : photos.length === 0 ? (
        <p className="text-white/50">暂无照片</p>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2">
          {photos.map((photo) => (
            <div
              key={photo.id}
              className="group relative overflow-hidden rounded-xl border border-white/10 bg-white/[0.03]"
            >
              <img
                src={photo.url}
                alt={photo.description}
                className="aspect-[3/2] w-full object-cover"
              />
              <div className="p-3">
                <p className="text-sm text-white/70 truncate">{photo.description}</p>
                <p className="text-xs text-white/40 mt-1">
                  {photo.uploadTime?.replace("T", " ").slice(0, 19)}
                </p>
              </div>
              <button
                onClick={() => handleDelete(photo.id)}
                className="absolute top-2 right-2 rounded-lg bg-red-500/80 px-2.5 py-1 text-xs text-white opacity-0 transition group-hover:opacity-100 hover:bg-red-500"
              >
                删除
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
