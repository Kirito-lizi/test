import Link from "next/link";
import { Card } from "@/components/ui/Card";

export default function NotFound() {
  return (
    <div className="mx-auto max-w-xl">
      <Card>
        <h1 className="text-lg font-semibold text-white/95">页面不存在</h1>
        <p className="mt-2 text-sm text-white/65">
          你访问的地址可能已移动或拼写错误。
        </p>
        <div className="mt-5">
          <Link
            href="/"
            className="inline-flex items-center justify-center rounded-full bg-white/90 px-5 py-2 text-sm font-semibold text-black transition hover:bg-white"
          >
            返回首页
          </Link>
        </div>
      </Card>
    </div>
  );
}

