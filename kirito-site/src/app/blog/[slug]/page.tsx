import PostContent from "./PostContent";

export async function generateStaticParams() {
  return [
    { slug: "hello-world" },
    { slug: "rag-intro" },
    { slug: "spring-boot-redis-login" },
    { slug: "redis-cache-problems" },
  ];
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  return <PostContent slug={slug} />;
}
