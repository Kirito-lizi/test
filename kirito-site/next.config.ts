import type { NextConfig } from "next";

function normalizeBasePath(raw: string | undefined): string {
  const v = (raw ?? "").trim();
  if (!v || v === "/") return "";
  return v.startsWith("/") ? v : `/${v}`;
}

const basePath = normalizeBasePath(process.env.NEXT_PUBLIC_BASE_PATH);

const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  basePath,
  assetPrefix: basePath || undefined,
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
