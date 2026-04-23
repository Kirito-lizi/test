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

function saveProgress(progress: Progress) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
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
  const [judgeOutput, setJudgeOutput] = useState("");
  const [judgeLoading, setJudgeLoading] = useState(false);
  const [judgeError, setJudgeError] = useState<string | null>(null);

  useEffect(() => {
    setProgress(loadProgress());
  }, []);

  const stats = useMemo(() => {
    const total = leetcodeProblems.length;
    let done = 0;
    let doing = 0;

    for (const problem of leetcodeProblems) {
      const status = progress[problem.id];
      if (status === "done") done += 1;
      if (status === "doing") doing += 1;
    }

    return { total, done, doing, todo: total - done - doing };
  }, [progress]);

  const filtered = useMemo(
    () =>
      [...leetcodeProblems]
        .filter((problem) =>
          filterLevel === "全部" ? true : problem.level === filterLevel,
        )
        .filter((problem) =>
          filterStatus === "全部"
            ? true
            : (progress[problem.id] ?? "todo") === filterStatus,
        )
        .sort((a, b) => a.id - b.id),
    [filterLevel, filterStatus, progress],
  );

  function cycleStatus(id: number) {
    setProgress((previous) => {
      const current = previous[id] ?? "todo";
      const next = { ...previous };

      if (current === "todo") next[id] = "doing";
      else if (current === "doing") next[id] = "done";
      else delete next[id];

      saveProgress(next);
      return next;
    });
  }

  function badgeForStatus(id: number) {
    const status = progress[id] ?? "todo";

    if (status === "done") {
      return (
        <span className="rounded-full bg-emerald-500/20 px-2.5 py-1 text-xs text-emerald-200">
          已完成
        </span>
      );
    }

    if (status === "doing") {
      return (
        <span className="rounded-full bg-amber-500/20 px-2.5 py-1 text-xs text-amber-200">
          进行中
        </span>
      );
    }

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
      const response = await fetch(JUDGE_API, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          problemId: "two-sum",
          code: currentCode,
        }),
      });
      const data = await response.json();

      if (!response.ok) {
        setJudgeError(
          typeof data?.message === "string" ? data.message : "判题服务异常",
        );
        return;
      }

      const detail = (data.detail ?? [])
        .map(
          (item: {
            index: number;
            input: string;
            expected: string;
            output: string;
            passed: boolean;
          }) =>
            `用例 ${item.index}: 输入 ${item.input} | 期望 ${item.expected} | 输出 ${item.output} | ${
              item.passed ? "通过" : "未通过"
            }`,
        )
        .join("\n");

      if (data.status === "AC") {
        setJudgeOutput(`通过: ${data.message}\n${detail}`.trim());
      } else {
        setJudgeOutput(`未通过: ${data.message ?? "结果不正确"}\n${detail}`.trim());
      }
    } catch (error) {
      setJudgeError(error instanceof Error ? error.message : "网络错误");
    } finally {
      setJudgeLoading(false);
    }
  }

  return (
    <div className="flex flex-col gap-6">
      <SectionHeader
        title="LeetCode 100 刷题进度"
        desc="进度只保存在当前浏览器的本地存储中，不会上传。"
        revealOrder={0}
      />

      <Card
        className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between"
        revealOrder={1}
      >
        <div className="space-y-1 text-sm text-white/75">
          <p>
            总数 {stats.total} · 已完成 {stats.done} · 进行中 {stats.doing} · 待做{" "}
            {stats.todo}
          </p>
          <p className="text-xs text-white/55">
            建议把题单和自己的计划对齐，比如 Top 100 Liked、剑指 Offer
            或者某个专项训练。
          </p>
        </div>

        <div className="flex flex-wrap gap-2 text-xs">
          {(["全部", "简单", "中等", "困难"] as const).map((level) => (
            <button
              key={level}
              type="button"
              onClick={() =>
                setFilterLevel(
                  level === "全部" ? "全部" : (level as LeetCodeProblem["level"]),
                )
              }
              className={[
                "rounded-full border px-3 py-1",
                filterLevel === level
                  ? "border-emerald-200/70 bg-emerald-300/16 text-emerald-50"
                  : "border-white/10 bg-white/5 text-white/75 hover:border-white/25",
              ].join(" ")}
            >
              {level}
            </button>
          ))}

          {(["全部", "todo", "doing", "done"] as const).map((status) => (
            <button
              key={status}
              type="button"
              onClick={() => setFilterStatus(status)}
              className={[
                "rounded-full border px-3 py-1",
                filterStatus === status
                  ? "border-emerald-200/70 bg-emerald-300/16 text-emerald-50"
                  : "border-white/10 bg-white/5 text-white/75 hover:border-white/25",
              ].join(" ")}
            >
              {status === "todo"
                ? "待做"
                : status === "doing"
                  ? "进行中"
                  : status === "done"
                    ? "已完成"
                    : "全部状态"}
            </button>
          ))}
        </div>
      </Card>

      <Card className="space-y-3" revealOrder={2}>
        <SectionHeader
          title="在线编写 · Java"
          desc="代码会发送到你的判题服务进行编译与执行，这里默认用两数之和作为示例。"
          revealOrder={0}
        />

        <textarea
          value={currentCode}
          onChange={(event) => setCurrentCode(event.target.value)}
          className="h-64 w-full resize-y rounded-2xl border border-white/15 bg-black/45 p-3 font-mono text-xs text-emerald-100 outline-none focus:border-emerald-200/70 focus:ring-1 focus:ring-emerald-200/40"
        />

        <div className="flex items-center justify-between gap-3 text-xs text-white/60">
          <span>题目: 1. 两数之和，仅验证 twoSum 方法逻辑。</span>
          <button
            type="button"
            onClick={runJudge}
            disabled={judgeLoading}
            className="inline-flex items-center justify-center rounded-full border border-emerald-200/70 bg-emerald-400/18 px-4 py-1.5 text-xs font-semibold text-emerald-50 transition hover:bg-emerald-300/24 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {judgeLoading ? "运行中" : "运行代码"}
          </button>
        </div>

        {judgeError ? (
          <pre className="whitespace-pre-wrap rounded-2xl border border-rose-400/50 bg-rose-500/10 p-3 text-xs text-rose-100">
            {judgeError}
          </pre>
        ) : null}

        {judgeOutput ? (
          <pre className="whitespace-pre-wrap rounded-2xl border border-emerald-400/40 bg-emerald-500/10 p-3 text-xs text-emerald-100">
            {judgeOutput}
          </pre>
        ) : null}
      </Card>

      <div className="grid gap-3">
        {filtered.map((problem, index) => (
          <Card
            key={problem.id}
            className="flex flex-col gap-3 border-white/8 bg-white/5 md:flex-row md:items-center md:justify-between"
            revealOrder={(index % 6) + 1}
          >
            <div className="space-y-1">
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-xs text-white/45">#{problem.id}</span>
                <Link
                  href={problem.url}
                  target="_blank"
                  rel="noreferrer"
                  className="text-sm font-semibold text-emerald-100 hover:text-emerald-50"
                >
                  {problem.title}
                </Link>
              </div>

              <div className="flex flex-wrap gap-2 text-xs text-white/70">
                <span
                  className={[
                    "rounded-full border px-2 py-0.5",
                    problem.level === "简单"
                      ? "border-emerald-400/60 text-emerald-200"
                      : problem.level === "中等"
                        ? "border-amber-400/60 text-amber-200"
                        : "border-rose-400/70 text-rose-200",
                  ].join(" ")}
                >
                  {problem.level}
                </span>

                {problem.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full border border-white/12 bg-white/5 px-2 py-0.5"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            <button
              type="button"
              onClick={() => cycleStatus(problem.id)}
              className="self-start rounded-full border border-white/15 bg-black/20 px-3 py-1 text-xs text-white/80 transition hover:border-emerald-200/70 hover:bg-emerald-300/12"
            >
              {badgeForStatus(problem.id)}
            </button>
          </Card>
        ))}

        {filtered.length === 0 ? (
          <p data-reveal="soft" className="text-sm text-white/60">
            当前筛选条件下没有题目。
          </p>
        ) : null}
      </div>
    </div>
  );
}
