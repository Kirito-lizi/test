export type LeetCodeProblem = {
  id: number;
  slug: string;
  title: string;
  level: "简单" | "中等" | "困难";
  url: string;
  tags: string[];
};

export const leetcodeProblems: LeetCodeProblem[] = [
  {
    id: 1,
    slug: "two-sum",
    title: "1. 两数之和",
    level: "简单",
    url: "https://leetcode.cn/problems/two-sum/",
    tags: ["数组", "哈希表"],
  },
  {
    id: 2,
    slug: "add-two-numbers",
    title: "2. 两数相加",
    level: "中等",
    url: "https://leetcode.cn/problems/add-two-numbers/",
    tags: ["链表", "数学"],
  },
  {
    id: 3,
    slug: "longest-substring-without-repeating-characters",
    title: "3. 无重复字符的最长子串",
    level: "中等",
    url: "https://leetcode.cn/problems/longest-substring-without-repeating-characters/",
    tags: ["滑动窗口", "哈希表", "字符串"],
  },
  {
    id: 4,
    slug: "median-of-two-sorted-arrays",
    title: "4. 寻找两个正序数组的中位数",
    level: "困难",
    url: "https://leetcode.cn/problems/median-of-two-sorted-arrays/",
    tags: ["二分", "数组"],
  },
  {
    id: 5,
    slug: "longest-palindromic-substring",
    title: "5. 最长回文子串",
    level: "中等",
    url: "https://leetcode.cn/problems/longest-palindromic-substring/",
    tags: ["字符串", "动态规划"],
  },
  {
    id: 15,
    slug: "3sum",
    title: "15. 三数之和",
    level: "中等",
    url: "https://leetcode.cn/problems/3sum/",
    tags: ["排序", "双指针"],
  },
];
