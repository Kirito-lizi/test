export const profile = {
  name: "Kirito",
  title: "全栈开发 / Java & Web",
  bio: "我喜欢把复杂问题拆成清晰的系统：稳定、好用、可持续演进。",
  location: "China",
  email: "you@example.com",
  links: {
    github: "https://github.com/",
  },
};

export type Project = {
  name: string;
  desc: string;
  tags: string[];
  href?: string;
  year?: string;
};

export const projects: Project[] = [
  {
    name: "Project A",
    desc: "一个用于展示个人作品的高性能静态站点（Next.js + Tailwind）。",
    tags: ["Next.js", "Tailwind", "SEO"],
    href: "#",
    year: "2026",
  },
  {
    name: "Project B",
    desc: "面向业务的后台服务：可观测、可扩展、可维护。",
    tags: ["Java", "Spring", "MySQL"],
    href: "#",
    year: "2025",
  },
];

export type Post = {
  slug: string;
  title: string;
  date: string; // YYYY-MM-DD
  summary: string;
  tags: string[];
  content: string[];
};

export const posts: Post[] = [
  {
    slug: "hello",
    title: "你好，世界：为什么我要写博客",
    date: "2026-03-12",
    summary: "记录一些工程实践、学习笔记与思考。",
    tags: ["随笔", "工程"],
    content: [
      "这是一个静态博客示例：你可以把内容放在 `src/content/data.ts`，也可以后续替换为 MD/MDX。",
      "我偏好：少废话、可复现、能落地的文章结构。",
    ],
  },
];

export type TimelineItem = {
  time: string;
  title: string;
  org?: string;
  desc?: string;
  highlights?: string[];
};

export const timeline: TimelineItem[] = [
  {
    time: "2026 - 至今",
    title: "开发者",
    org: "你的公司 / 学校",
    desc: "做一些有挑战的项目。",
    highlights: ["负责模块设计与落地", "关注性能与体验", "持续迭代与重构"],
  },
  {
    time: "2024 - 2026",
    title: "学习与探索",
    desc: "打磨基础与工程能力。",
    highlights: ["Java / Web", "数据库与中间件", "工程化与测试"],
  },
];

export type PhotoItem = {
  src: string;
  alt: string;
};

export const photos: PhotoItem[] = [
  { src: "/photos/p1.svg", alt: "示例照片 1" },
  { src: "/photos/p2.svg", alt: "示例照片 2" },
  { src: "/photos/p3.svg", alt: "示例照片 3" },
  { src: "/photos/p4.svg", alt: "示例照片 4" },
];

