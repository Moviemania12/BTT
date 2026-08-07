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

// ─── Static article slugs ─────────────────────────────────────────────────────
// Topics that have their own dedicated static page.tsx under
// app/learn/ai/<category>/<slug>/page.tsx must NOT be served by this
// dynamic catch-all. Adding a slug here causes Next.js to fall through to
// the static file instead of rendering the placeholder below.
//
// Why: Next.js dynamic routes ([category]/[topic]) take precedence over
// static nested folders at build time via generateStaticParams(). Excluding
// a slug from generateStaticParams() AND returning notFound() at runtime
// forces Next.js to resolve the static page.tsx instead.
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
    // Exclude slugs that have their own static page.tsx — they handle their own routing
    .filter((t) => !STATIC_ARTICLE_SLUGS.has(t.slug))
    .map((t) => ({
      category: t.category,
      topic: t.slug,
    }));
}

export async function generateMetadata(props: PageProps) {
  const params = await props.params;

  // Static articles export their own metadata — return empty here
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
    title: `${topic.title} — Behind The Tech`,
    description: topic.description,
  };
}
