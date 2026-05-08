const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://47.110.134.77/api";

async function fetchApi<T>(path: string, options?: RequestInit): Promise<T> {
  const res = await fetch(`${BASE_URL}${path}`, {
    headers: {
      "Content-Type": "application/json",
      ...options?.headers,
    },
    ...options,
  });
  const json = await res.json();
  if (json.code !== 200) {
    throw new Error(json.message || "请求失败");
  }
  return json.data as T;
}

export interface Post {
  id: number;
  title: string;
  slug: string;
  summary: string;
  content: string;
  coverImage: string | null;
  category: Category;
  tags: Tag[];
  status: string;
  isTop: boolean;
  viewCount: number;
  likeCount: number;
  createdAt: string;
  updatedAt: string;
}

export interface Category {
  id: number;
  name: string;
  description: string;
  sortOrder: number;
}

export interface Tag {
  id: number;
  name: string;
}

export interface Comment {
  id: number;
  nickname: string;
  email: string;
  content: string;
  isAdmin: boolean;
  createdAt: string;
  replies: Comment[];
}

export interface Link {
  id: number;
  name: string;
  url: string;
  description: string;
}

export interface Page<T> {
  content: T[];
  totalElements: number;
  totalPages: number;
  size: number;
  number: number;
}

export interface Stats {
  postCount: number;
  commentCount: number;
  runningDays: number;
  totalVisits: number;
}

export interface Photo {
  id: number;
  url: string;
  description: string;
  uploadTime: string;
}

export const api = {
  posts: {
    list: (page = 0, size = 10) =>
      fetchApi<Page<Post>>(`/posts?page=${page}&size=${size}`),
    get: (slug: string) => fetchApi<Post>(`/posts/${slug}`),
    prevNext: (slug: string) =>
      fetchApi<{ prev: Post | null; next: Post | null }>(`/posts/${slug}/prev-next`),
    search: (keyword: string, page = 0, size = 10) =>
      fetchApi<Page<Post>>(`/posts/search?keyword=${encodeURIComponent(keyword)}&page=${page}&size=${size}`),
  },
  categories: {
    list: () => fetchApi<Category[]>("/categories"),
    posts: (id: number, page = 0, size = 10) =>
      fetchApi<Page<Post>>(`/categories/${id}/posts?page=${page}&size=${size}`),
  },
  tags: {
    list: () => fetchApi<Tag[]>("/tags"),
    posts: (id: number, page = 0, size = 10) =>
      fetchApi<Page<Post>>(`/tags/${id}/posts?page=${page}&size=${size}`),
  },
  comments: {
    list: (postId: number) => fetchApi<Comment[]>(`/posts/${postId}/comments`),
    create: (postId: number, data: { nickname: string; email: string; content: string }) =>
      fetchApi<Comment>(`/comments?postId=${postId}`, {
        method: "POST",
        body: JSON.stringify(data),
      }),
  },
  likes: {
    toggle: (postId: number) =>
      fetchApi<{ liked: boolean; count: number }>(`/posts/${postId}/like`, { method: "POST" }),
    status: (postId: number) =>
      fetchApi<{ liked: boolean; count: number }>(`/posts/${postId}/like-status`),
  },
  stats: {
    get: () => fetchApi<Stats>("/stats"),
  },
  links: {
    list: () => fetchApi<Link[]>("/links"),
  },
  admin: {
    upload: async (file: File): Promise<string> => {
      const formData = new FormData();
      formData.append("file", file);
      const res = await fetch(`${BASE_URL}/admin/upload`, {
        method: "POST",
        body: formData,
      });
      const json = await res.json();
      if (json.code !== 200) {
        throw new Error(json.message || "上传失败");
      }
      return json.data as string;
    },
    posts: {
      create: (data: {
        title: string;
        slug: string;
        summary: string;
        content: string;
        coverImage?: string;
        category: { id: number };
        tags: { id: number }[];
        status: "draft" | "published";
      }) =>
        fetchApi<Post>("/posts/admin/posts", {
          method: "POST",
          body: JSON.stringify(data),
        }),
    },
    photos: {
      list: (page = 0, size = 20) =>
        fetchApi<Page<Photo>>(`/admin/photos?page=${page}&size=${size}`),
      create: (data: { url: string; description: string }) =>
        fetchApi<Photo>("/admin/photos", {
          method: "POST",
          body: JSON.stringify(data),
        }),
      delete: (id: number) =>
        fetchApi<void>(`/admin/photos/${id}`, { method: "DELETE" }),
    },
  },
};
