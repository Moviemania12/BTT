import { notFound } from "next/navigation";
import { getTopic, ALL_TOPICS } from "@/lib/topics";
import type { Topic, AiCategory } from "@/lib/topics";
import ComingSoonPage from "@/components/ComingSoonPage";
import ArticleLayout from "@/components/ArticleLayout";

type PageParams = {
  category: string;
  topic: string;
};

type PageProps = {
  params: Promise<PageParams>;
};

// â”€â”€â”€ Route configuration â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
// dynamicParams = false: any [category]/[topic] combination NOT returned by
// generateStaticParams() will 404 from this dynamic route, allowing Next.js
// to fall through to a matching static page.tsx (e.g. data-centers/ai-storage).
// Without this, Vercel may serve a pre-rendered dynamic-route page from its
// CDN cache even for URLs that have a dedicated static page.tsx â€” the CDN
// does not re-run route resolution, it just serves the cached HTML file.
export const dynamicParams = false;

// â”€â”€â”€ Static article slugs â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
// Topics that have their own dedicated static page.tsx under
// app/learn/ai/<category>/<slug>/page.tsx must NOT be served by this
// dynamic catch-all. Exclude them from generateStaticParams() so this route
// never pre-renders an HTML file for their URLs â€” the static page.tsx handles
// them exclusively.
//
// Add every new AI article slug here as it is published.
const STATIC_ARTICLE_SLUGS = new Set([
  "what-is-ai-infrastructure",
  "machine-learning",
  "deep-learning",
  "generative-ai",
  "llm",
  "ai-gpu",
  "tpu",
  "ai-accelerators",
  "nvidia-architecture",
  "amd-ai-platforms",
  "ai-data-center-basics",
  "gpu-cluster",
  "ai-cooling",
  "ai-networking",
  "ai-storage",
]);

export default async function AiTopicPage(props: PageProps) {
  const params = await props.params;

  // Delegate to static page.tsx for articles that have their own implementation
  if (STATIC_ARTICLE_SLUGS.has(params.topic)) {
    notFound();
  }

  const topic = getTopic("ai", params.category as AiCategory, params.topic);

  if (!topic) {
    notFound();
  }

  if (topic.status !== "published") {
    return <ComingSoonPage topic={topic} />;
  }

  return (
    <ArticleLayout slug={topic.slug} headings={[]} readingTimeMinutes={5}>
      <h2>{topic.title}</h2>
      <p>{topic.description}</p>
    </ArticleLayout>
  );
}

export async function generateStaticParams(): Promise<PageParams[]> {
  const topics: Topic[] = ALL_TOPICS;

  return topics
    .filter((t) => t.track === "ai")
    // Exclude slugs that have their own static page.tsx â€” they handle their own routing
    .filter((t) => !STATIC_ARTICLE_SLUGS.has(t.slug))
    .map((t) => ({
      category: t.category,
      topic: t.slug,
    }));
}

export async function generateMetadata(props: PageProps) {
  const params = await props.params;

  // Static articles export their own metadata â€” return empty here
  if (STATIC_ARTICLE_SLUGS.has(params.topic)) {
    return {};
  }

  const topic = getTopic(
    "ai",
    params.category as AiCategory,
    params.topic
  );

  if (!topic) {
    return {};
  }

  return {
    title: `${topic.title} â€” Behind The Tech`,
    description: topic.description,
  };
}
