export const profile = {
  name: "Kirito",
  title: "Java / Web 全栈开发者",
  bio: "喜欢把复杂系统拆成清晰、稳定、顺滑的体验，从后端架构到前端动效都追求完整度。",
  location: "Shanghai, China",
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
    name: "Nature Motion Blog",
    desc: "以 Next.js 打造的个人站点，重点在液态玻璃质感、动态背景、沉浸式导航和流畅交互。",
    tags: ["Next.js", "React", "Motion", "Tailwind"],
    href: "#",
    year: "2026",
  },
  {
    name: "Java Judge Service",
    desc: "面向刷题场景的在线判题服务，负责代码编译、沙箱执行、结果归档与接口设计。",
    tags: ["Java", "Spring Boot", "Docker", "API"],
    href: "#",
    year: "2025",
  },
  {
    name: "Visual Component Lab",
    desc: "沉淀高质量前端组件与视觉实验，覆盖玻璃拟态、响应式排版与微交互方案。",
    tags: ["TypeScript", "Design System", "UX"],
    href: "#",
    year: "2024",
  },
];

export type Post = {
  slug: string;
  title: string;
  date: string;
  summary: string;
  tags: string[];
  content: string[];
};

export const posts: Post[] = [
  {
    slug: "build-a-better-landing",
    title: "把首页做成真正的入口，而不是内容堆叠",
    date: "2026-03-15",
    summary: "首页不一定要信息最多，但一定要气质最强、方向最明确。",
    tags: ["设计", "前端", "博客"],
    content: [
      "我更喜欢把首页当成一扇门，而不是把所有内容都一次性抛给访问者。真正有效的首页，应该先建立氛围，再给出清晰路径。",
      "当视觉、动效和交互统一之后，用户会在几秒内理解这个站点的气质，这比堆很多解释性文案更有效。",
    ],
  },
  {
    slug: "natural-motion-ui",
    title: "自然系动态背景的关键，不是炫，而是呼吸感",
    date: "2026-03-13",
    summary: "好的动态背景应该像环境一样存在，让页面有生命力，但不打断阅读。",
    tags: ["CSS", "动效", "审美"],
    content: [
      "我会优先使用层次、雾感、光影和缓动来塑造自然氛围，而不是依赖大量复杂素材。这样更轻、更稳，也更容易和玻璃质感融合。",
      "动态效果真正的难点，是节奏控制。动画应该是呼吸，不应该是噪音。",
    ],
  },
  {
    slug: "frontend-detail-sense",
    title: "能体现前端功底的，往往是那些不显眼的细节",
    date: "2026-03-12",
    summary: "布局层次、状态反馈、响应式节奏和性能控制，决定了页面是不是高级。",
    tags: ["工程", "体验", "前端"],
    content: [
      "真正拉开差距的，通常不是某一个大特效，而是很多细节一起生效：标题的气口、按钮的悬停、卡片的层次、滚动时的稳定感。",
      "如果一个页面能在桌面端和移动端都保持克制又有表现力，那它基本已经具备了成熟的产品气质。",
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
    title: "全栈开发",
    org: "个人项目 / 技术博客",
    desc: "持续打磨个人网站、内容体系和交互表现，聚焦 Web 体验与工程质量。",
    highlights: ["负责前后端联调与页面设计", "强调视觉表达与代码可维护性", "持续迭代博客与刷题系统"],
  },
  {
    time: "2025 - 2026",
    title: "后端与平台能力建设",
    desc: "围绕 Java 服务、接口稳定性和判题执行链路做实践。",
    highlights: ["Spring Boot 服务设计", "数据建模与接口抽象", "部署与调试流程优化"],
  },
  {
    time: "2024 - 2025",
    title: "前端体验探索",
    desc: "系统学习现代前端开发，重点关注视觉层次、响应式设计与交互细节。",
    highlights: ["React / Next.js", "TypeScript", "动效与组件抽象"],
  },
];

export type PhotoItem = {
  src: string;
  alt: string;
};

export const photos: PhotoItem[] = [
  { src: "/photos/p1.svg", alt: "山间晨雾" },
  { src: "/photos/p2.svg", alt: "湖面微光" },
  { src: "/photos/p3.svg", alt: "林间薄雾" },
  { src: "/photos/p4.svg", alt: "风里的草坡" },
];
