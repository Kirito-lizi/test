"use client";

import { useEffect, useState } from "react";
import { api, type Comment } from "@/lib/api";

export default function CommentSection({ postId }: { postId: number }) {
  const [comments, setComments] = useState<Comment[]>([]);
  const [nickname, setNickname] = useState("");
  const [email, setEmail] = useState("");
  const [content, setContent] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [msg, setMsg] = useState("");

  useEffect(() => {
    if (!postId) return;
    api.comments.list(postId).then((data) => setComments(data));
  }, [postId]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!nickname.trim() || !content.trim()) return;
    setSubmitting(true);
    setMsg("");
    try {
      const newComment = await api.comments.create(postId, {
        nickname: nickname.trim(),
        email: email.trim(),
        content: content.trim(),
      });
      setComments((prev) => [newComment, ...prev]);
      setContent("");
      setMsg("评论成功！");
      setTimeout(() => setMsg(""), 2000);
    } catch (err: any) {
      setMsg(err.message || "评论失败");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="mt-8 flex flex-col gap-6">
      <h3 className="text-lg font-semibold text-white/85">
        评论 ({comments.length})
      </h3>

      {/* 评论表单 */}
      <form
        onSubmit={handleSubmit}
        className="rounded-2xl border border-white/10 bg-white/[0.03] p-5"
      >
        <div className="mb-3 grid gap-3 sm:grid-cols-2">
          <input
            type="text"
            placeholder="昵称 *"
            required
            value={nickname}
            onChange={(e) => setNickname(e.target.value)}
            className="rounded-xl border border-white/10 bg-white/[0.04] px-4 py-2.5 text-sm text-white/85 placeholder:text-white/30 outline-none focus:border-[#7c8cfd]/40"
          />
          <input
            type="email"
            placeholder="邮箱（选填）"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="rounded-xl border border-white/10 bg-white/[0.04] px-4 py-2.5 text-sm text-white/85 placeholder:text-white/30 outline-none focus:border-[#7c8cfd]/40"
          />
        </div>
        <textarea
          placeholder="写下你的评论..."
          required
          rows={3}
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="w-full rounded-xl border border-white/10 bg-white/[0.04] px-4 py-2.5 text-sm text-white/85 placeholder:text-white/30 outline-none focus:border-[#7c8cfd]/40 resize-none"
        />
        <div className="mt-3 flex items-center justify-between">
          {msg && (
            <span className="text-xs text-[#7c8cfd]">{msg}</span>
          )}
          <button
            type="submit"
            disabled={submitting}
            className="ml-auto rounded-xl bg-gradient-to-r from-[#7c8cfd] to-[#a8b4ff] px-5 py-2 text-sm font-medium text-white transition hover:opacity-90 disabled:opacity-50"
          >
            {submitting ? "提交中..." : "发表评论"}
          </button>
        </div>
      </form>

      {/* 评论列表 */}
      <div className="flex flex-col gap-4">
        {comments.length === 0 && (
          <p className="text-center text-sm text-white/40">暂无评论，来抢沙发吧~</p>
        )}
        {comments.map((comment) => (
          <div
            key={comment.id}
            className="rounded-2xl border border-white/10 bg-white/[0.03] p-5"
          >
            <div className="flex items-center gap-3">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-[#7c8cfd] to-[#ff8c42] text-xs font-bold text-white">
                {comment.nickname[0]}
              </div>
              <div>
                <span className="text-sm font-medium text-white/80">
                  {comment.nickname}
                  {comment.isAdmin && (
                    <span className="ml-2 rounded bg-[#7c8cfd]/20 px-1.5 py-0.5 text-xs text-[#a8b4ff]">
                      博主
                    </span>
                  )}
                </span>
                <p className="text-xs text-white/35">
                  {comment.createdAt?.split("T")[0]}
                </p>
              </div>
            </div>
            <p className="mt-3 text-sm leading-relaxed text-white/65">
              {comment.content}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
