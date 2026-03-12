import type { Metadata } from "next";
import { LeetCodePageClient } from "@/components/leetcode/LeetCodePageClient";

export const metadata: Metadata = {
  title: "刷题 · LeetCode 100",
};

export default function LeetCodePage() {
  return <LeetCodePageClient />;
}


