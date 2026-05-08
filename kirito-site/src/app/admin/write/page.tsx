"use client";

import { useEffect, useState } from "react";
import { api, type Category, type Tag } from "@/lib/api";
import { MdEditor } from "md-editor-rt";
import "md-editor-rt/lib/style.css";

const API_BASE =
  process.env.NEXT_PUBLIC_API_URL || "http://47.110.134.77";

function autoSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9一-鿿]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export default function WriteBlogPage() {
  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [summary, setSummary] = useState("");
  const [content, setContent] = useState("");
  const [categoryId, setCategoryId] = useState<number | "">("");
  const [selectedTags, setSelectedTags] = useState<number[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [tags, setTags] = useState<Tag[]>([]);
  const [coverImage, setCoverImage] = useState("");
  const [status, setStatus] = useState<"draft" | "published">("published");
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    api.categories.list().then(setCategories);
    api.tags.list().then(setTags);
  }, []);

  const handleTitleChange = (value: string) => {
    setTitle(value);
    if (!slug || slug === autoSlug(title)) {
      setSlug(autoSlug(value));
    }
  };

  const onUploadImg = async (
    files: File[],
    callback: (urls: string[]) => void
  ) => {
    const urls = await Promise.all(
      files.map(async (file) => {
        const url = await api.admin.upload(file);
        return url.startsWith("http") ? url : `${API_BASE}${url}`;
      })
    );
    callback(urls);
  };

  const toggleTag = (id: number) => {
    setSelectedTags((prev) =>
      prev.includes(id) ? prev.filter((t) => t !== id) : [...prev, id]
    );
  };

  const handleSubmit = async () => {
    if (!title || !slug || !content || !categoryId) {
      setMessage("请填写标题、slug、内容和分类");
      return;
    }
    setSubmitting(true);
    setMessage("");
    try {
      await api.admin.posts.create({
        title,
        slug,
        summary,
        content,
        coverImage: coverImage || undefined,
        category: { id: categoryId as number },
        tags: selectedTags.map((id) => ({ id })),
        status,
      });
      setMessage("发布成功！");
    } catch (err: unknown) {
      setMessage(err instanceof Error ? err.message : "发布失败");
    } finally {
      setSubmitting(false);
    }
  };

  const inputCls =
    "w-full rounded-lg border border-white/10 bg-white/[0.05] px-3 py-2 text-sm text-white/90 outline-none focus:border-[#7c8cfd]/50";
  const labelCls = "block text-sm text-white/70 mb-1";

  return (
    <div className="flex flex-col gap-6 max-w-4xl">
      <h1 className="text-2xl font-semibold text-white/90">写博客</h1>

      {/* Basic Info */}
      <div className="rounded-2xl border border-white/10 bg-[linear-gradient(145deg,rgba(20,25,45,0.7),rgba(15,20,40,0.5))] p-5 backdrop-blur-2xl">
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className={labelCls}>标题</label>
            <input
              type="text"
              value={title}
              onChange={(e) => handleTitleChange(e.target.value)}
              placeholder="文章标题"
              className={inputCls}
            />
          </div>
          <div>
            <label className={labelCls}>Slug</label>
            <input
              type="text"
              value={slug}
              onChange={(e) => setSlug(e.target.value)}
              placeholder="url-slug"
              className={inputCls}
            />
          </div>
        </div>
        <div className="mt-4">
          <label className={labelCls}>摘要</label>
          <textarea
            value={summary}
            onChange={(e) => setSummary(e.target.value)}
            placeholder="文章摘要（可选）"
            rows={2}
            className={inputCls}
          />
        </div>
        <div className="mt-4">
          <label className={labelCls}>封面图 URL（可选）</label>
          <input
            type="text"
            value={coverImage}
            onChange={(e) => setCoverImage(e.target.value)}
            placeholder="https://..."
            className={inputCls}
          />
        </div>
      </div>

      {/* Category & Tags */}
      <div className="rounded-2xl border border-white/10 bg-[linear-gradient(145deg,rgba(20,25,45,0.7),rgba(15,20,40,0.5))] p-5 backdrop-blur-2xl">
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className={labelCls}>分类</label>
            <select
              value={categoryId}
              onChange={(e) =>
                setCategoryId(
                  e.target.value ? Number(e.target.value) : ""
                )
              }
              className={inputCls}
            >
              <option value="">选择分类</option>
              {categories.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.name}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className={labelCls}>状态</label>
            <select
              value={status}
              onChange={(e) =>
                setStatus(e.target.value as "draft" | "published")
              }
              className={inputCls}
            >
              <option value="published">发布</option>
              <option value="draft">草稿</option>
            </select>
          </div>
        </div>
        <div className="mt-4">
          <label className={labelCls}>标签</label>
          <div className="flex flex-wrap gap-2">
            {tags.map((tag) => {
              const selected = selectedTags.includes(tag.id);
              return (
                <button
                  key={tag.id}
                  type="button"
                  onClick={() => toggleTag(tag.id)}
                  className={[
                    "rounded-full border px-3 py-1 text-xs transition",
                    selected
                      ? "border-[#7c8cfd]/50 bg-[#7c8cfd]/20 text-white"
                      : "border-white/10 bg-white/[0.04] text-white/60 hover:border-[#7c8cfd]/30 hover:text-white/85",
                  ].join(" ")}
                >
                  {tag.name}
                </button>
              );
            })}
            {tags.length === 0 && (
              <span className="text-xs text-white/40">暂无标签</span>
            )}
          </div>
        </div>
      </div>

      {/* Markdown Editor */}
      <div className="rounded-2xl border border-white/10 bg-[linear-gradient(145deg,rgba(20,25,45,0.7),rgba(15,20,40,0.5))] p-5 backdrop-blur-2xl overflow-hidden">
        <label className={labelCls}>内容</label>
        <MdEditor
          modelValue={content}
          onChange={setContent}
          onUploadImg={onUploadImg}
          theme="dark"
          language="zh-CN"
          style={{ height: "500px" }}
        />
      </div>

      {/* Submit */}
      <div className="flex items-center gap-4">
        <button
          onClick={handleSubmit}
          disabled={submitting}
          className="rounded-lg bg-[#7c8cfd]/80 px-6 py-2.5 text-sm font-medium text-white transition hover:bg-[#7c8cfd] disabled:opacity-50"
        >
          {submitting ? "发布中..." : "发布博文"}
        </button>
        {message && (
          <span
            className={[
              "text-sm",
              message.includes("成功") ? "text-green-400" : "text-red-400",
            ].join(" ")}
          >
            {message}
          </span>
        )}
      </div>
    </div>
  );
}
