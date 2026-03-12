"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { leetcodeProblems, type LeetCodeProblem } from "@/content/leetcode";
import { Card } from "@/components/ui/Card";
import { SectionHeader } from "@/components/ui/SectionHeader";

type Progress = Record<number, "todo" | "doing" | "done">;

const STORAGE_KEY = "kirito.leetcode.progress.v1";
const JUDGE_API =
  process.env.NEXT_PUBLIC_JUDGE_API_URL ?? "http://127.0.0.1:8080/api/judge";

function loadProgress(): Progress {
  if (typeof window === "undefined") return {};
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return {};
    return JSON.parse(raw) as Progress;
  } catch {
    return {};
  }
}

function saveProgress(p: Progress) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(p));
}

export function LeetCodePageClient() {
  const [progress, setProgress] = useState<Progress>({});
  const [filterLevel, setFilterLevel] = useState<LeetCodeProblem["level"] | "全部">(
    "全部",
  );
  const [filterStatus, setFilterStatus] = useState<"全部" | "todo" | "doing" | "done">(
    "全部",
  );

  const [currentCode, setCurrentCode] = useState<string>(() => {
    return (
      "public class Solution {\n" +
      "    public int[] twoSum(int[] nums, int target) {\n" +
      "        for (int i = 0; i < nums.length; i++) {\n" +
      "            for (int j = i + 1; j < nums.length; j++) {\n" +
      "                if (nums[i] + nums[j] == target) {\n" +
      "                    return new int[]{i, j};\n" +
      "                }\n" +
      "            }\n" +
      "        }\n" +
      "        return new int[]{-1, -1};\n" +
      "    }\n" +
      "}\n"
    );
  });
  const [judgeOutput, setJudgeOutput] = useState<string>("");
  const [judgeLoading, setJudgeLoading] = useState(false);
  const [judgeError, setJudgeError] = useState<string | null>(null);

  useEffect(() => {
    setProgress(loadProgress());
  }, []);

  const stats = useMemo(() => {
    const total = leetcodeProblems.length;
    let done = 0;
    let doing = 0;
    for (const p of leetcodeProblems) {
      const s = progress[p.id];
      if (s === "done") done += 1;
      else if (s === "doing") doing += 1;
    }
    return { total, done, doing, todo: total - done - doing };
  }, [progress]);

  const filtered = useMemo(
    () =>
      [...leetcodeProblems]
        .filter((p) => (filterLevel === "全部" ? true : p.level === filterLevel))
        .filter((p) =>
          filterStatus === "全部" ? true : (progress[p.id] ?? "todo") === filterStatus,
        )
        .sort((a, b) => a.id - b.id),
    [filterLevel, filterStatus, progress],
  );

  function cycleStatus(id: number) {
    setProgress((prev) => {
      const current = prev[id] ?? "todo";
      const next: Progress = { ...prev };
      if (current === "todo") next[id] = "doing";
      else if (current === "doing") next[id] = "done";
      else delete next[id];
      saveProgress(next);
      return next;
    });
  }

  function badgeForStatus(id: number) {
    const s = progress[id] ?? "todo";
    if (s === "done")
      return (
        <span className="rounded-full bg-emerald-500/20 px-2.5 py-1 text-xs text-emerald-200">
          已完成
        </span>
      );
    if (s === "doing")
      return (
        <span className="rounded-full bg-amber-500/20 px-2.5 py-1 text-xs text-amber-200">
          进行中
        </span>
      );
    return (
      <span className="rounded-full bg-white/5 px-2.5 py-1 text-xs text-white/70">
        待做
      </span>
    );
  }

  async function runJudge() {
    setJudgeLoading(true);
    setJudgeError(null);
    setJudgeOutput("");
    try {
      const res = await fetch(JUDGE_API, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          problemId: "two-sum",
          code: currentCode,
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        setJudgeError(typeof data?.message === "string" ? data.message : "判题服务错误");
        return;
      }
      if (data.status === "AC") {
        setJudgeOutput(
          `✅ ${data.message}\n` +
            (data.detail ?? [])
              .map(
                (d: any) =>
                  `用例 ${d.index}: 输入 ${d.input} | 期望 ${d.expected} | 输出 ${d.output} | ${
                    d.passed ? "通过" : "未通过"
                  }`,
              )
              .join("\n"),
        );
      } else {
        setJudgeOutput(
          `❌ ${data.message ?? "未通过"}\n` +
            (data.detail ?? [])
              .map(
                (d: any) =>
                  `用例 ${d.index}: 输入 ${d.input} | 期望 ${d.expected} | 输出 ${d.output} | ${
                    d.passed ? "通过" : "未通过"
                  }`,
              )
              .join("\n"),
        );
      }
    } catch (e: any) {
      setJudgeError(e?.message ?? "网络错误");
    } finally {
      setJudgeLoading(false);
    }
  }

  return (
    <div className="flex flex-col gap-6">
      <SectionHeader
        title="LeetCode 100 刷题进度"
        desc="进度只保存在当前浏览器的本地存储里，不会上传。"
      />

      <Card className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <div className="space-y-1 text-sm text-white/75">
          <p>
            总数：{stats.total} · 已完成：{stats.done} · 进行中：{stats.doing} · 待做：
            {stats.todo}
          </p>
          <p className="text-xs text-white/55">
            小技巧：建议把题目顺序和你自己的计划对齐，比如「Top 100
            Liked」「剑指 Offer」等。
          </p>
        </div>
        <div className="flex flex-wrap gap-2 text-xs">
          {(["全部", "简单", "中等", "困难"] as const).map((lv) => (
            <button
              key={lv}
              type="button"
              onClick={() =>
                setFilterLevel(lv === "全部" ? "全部" : (lv as LeetCodeProblem["level"]))
              }
              className={[
                "rounded-full border px-3 py-1",
                filterLevel === lv
                  ? "border-cyan-300/80 bg-cyan-400/20 text-cyan-50"
                  : "border-white/10 bg-white/5 text-white/75 hover:border-white/25",
              ].join(" ")}
            >
              {lv}
            </button>
          ))}
          {(["全部", "todo", "doing", "done"] as const).map((st) => (
            <button
              key={st}
              type="button"
              onClick={() => setFilterStatus(st)}
              className={[
                "rounded-full border px-3 py-1",
                filterStatus === st
                  ? "border-cyan-300/80 bg-cyan-400/20 text-cyan-50"
                  : "border-white/10 bg-white/5 text-white/75 hover:border-white/25",
              ].join(" ")}
            >
              {st === "todo"
                ? "待做"
                : st === "doing"
                  ? "进行中"
                  : st === "done"
                    ? "已完成"
                    : "全部状态"}
            </button>
          ))}
        </div>
      </Card>

      <Card className="space-y-3">
        <SectionHeader
          title="在线编写 · Java（示例：两数之和）"
          desc="代码会在你的云服务器上用 javac + java 编译运行，当前仅支持 Java。"
        />
        <textarea
          value={currentCode}
          onChange={(e) => setCurrentCode(e.target.value)}
          className="h-64 w-full resize-y rounded-xl border border-white/15 bg-black/50 p-3 font-mono text-xs text-emerald-100 outline-none focus:border-cyan-300/80 focus:ring-1 focus:ring-cyan-300/60"
        />
        <div className="flex items-center justify-between gap-3 text-xs text-white/60">
          <span>题目：1. 两数之和（只验证函数 twoSum 的逻辑）</span>
          <button
            type="button"
            onClick={runJudge}
            disabled={judgeLoading}
            className="inline-flex items-center justify-center rounded-full border border-cyan-300/70 bg-cyan-500/20 px-4 py-1.5 text-xs font-semibold text-cyan-50 hover:bg-cyan-400/30 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {judgeLoading ? "运行中…" : "运行代码并判题"}
          </button>
        </div>
        {judgeError ? (
          <pre className="whitespace-pre-wrap rounded-xl border border-rose-400/50 bg-rose-500/10 p-3 text-xs text-rose-100">
            {judgeError}
          </pre>
        ) : null}
        {judgeOutput ? (
          <pre className="whitespace-pre-wrap rounded-xl border border-emerald-400/40 bg-emerald-500/10 p-3 text-xs text-emerald-100">
            {judgeOutput}
          </pre>
        ) : null}
      </Card>

      <div className="grid gap-3">
        {filtered.map((p) => (
          <Card
            key={p.id}
            className="flex flex-col gap-3 border-white/8 bg-white/5 md:flex-row md:items-center md:justify-between"
          >
            <div className="space-y-1">
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-xs text-white/45">#{p.id}</span>
                <Link
                  href={p.url}
                  target="_blank"
                  rel="noreferrer"
                  className="text-sm font-semibold text-cyan-100 hover:text-cyan-50"
                >
                  {p.title}
                </Link>
              </div>
              <div className="flex flex-wrap gap-2 text-xs text-white/70">
                <span
                  className={[
                    "rounded-full border px-2 py-0.5",
                    p.level === "简单"
                      ? "border-emerald-400/60 text-emerald-200"
                      : p.level === "中等"
                        ? "border-amber-400/60 text-amber-200"
                        : "border-rose-400/70 text-rose-200",
                  ].join(" ")}
                >
                  {p.level}
                </span>
                {p.tags.map((t) => (
                  <span
                    key={t}
                    className="rounded-full border border-white/12 bg-white/5 px-2 py-0.5"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>

            <button
              type="button"
              onClick={() => cycleStatus(p.id)}
              className="self-start rounded-full border border-white/15 bg-black/20 px-3 py-1 text-xs text-white/80 hover:border-cyan-300/70 hover:bg-cyan-400/15"
            >
              {badgeForStatus(p.id)}
            </button>
          </Card>
        ))}

        {filtered.length === 0 ? (
          <p className="text-sm text-white/60">当前筛选条件下没有题目。</p>
        ) : null}
      </div>
    </div>
  );
}

