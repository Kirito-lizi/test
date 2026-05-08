"use client";

import { useEffect, useState } from "react";
import { api } from "@/lib/api";

export default function LikeButton({ postId }: { postId: number }) {
  const [liked, setLiked] = useState(false);
  const [count, setCount] = useState(0);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!postId) return;
    api.likes.status(postId).then((data) => {
      setLiked(data.liked);
      setCount(Number(data.count));
    });
  }, [postId]);

  const handleClick = async () => {
    if (loading) return;
    setLoading(true);
    try {
      const data = await api.likes.toggle(postId);
      setLiked(data.liked);
      setCount(Number(data.count));
    } catch {
      // ignore
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handleClick}
      disabled={loading}
      className={`flex items-center gap-2 rounded-full border px-4 py-2 text-sm transition ${
        liked
          ? "border-[#ff8c42]/40 bg-[#ff8c42]/10 text-[#ff8c42]"
          : "border-white/10 bg-white/[0.04] text-white/60 hover:border-[#7c8cfd]/30 hover:text-white/85"
      }`}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill={liked ? "currentColor" : "none"}
        stroke="currentColor"
        strokeWidth={2}
        className="h-4 w-4"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
        />
      </svg>
      <span>{liked ? "已点赞" : "点赞"}</span>
      <span className="text-xs opacity-70">{count}</span>
    </button>
  );
}
