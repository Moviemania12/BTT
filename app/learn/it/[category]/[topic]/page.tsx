import { notFound } from "next/navigation";
import { getTopic, ALL_TOPICS } from "@/lib/topics";
import type { Topic, ItCategory } from "@/lib/topics";
import ComingSoonPage from "@/components/ComingSoonPage";
import ArticleLayout from "@/components/ArticleLayout";

type PageParams = {
  category: string;
  topic: string;
};

type PageProps = {
  params: Promise<PageParams>;
};

// â”€â”€â”€ Static article slugs â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
// Topics that have their own dedicated static page.tsx under
// app/learn/it/<category>/<slug>/page.tsx must NOT be served by this
// dynamic catch-all. Adding a slug here causes Next.js to fall through to
// the static file instead of rendering the placeholder below.
//
// Why: Next.js dynamic routes ([category]/[topic]) take precedence over
// static nested folders at build time via generateStaticParams(). Excluding
// a slug from generateStaticParams() AND returning notFound() at runtime
// forces Next.js to resolve the static page.tsx instead.
//
// Add every new article slug here as it is published.
const STATIC_ARTICLE_SLUGS = new Set([
  "server-basics",
  "cpu",
  "ram",
  "gpu",
  "blade-server",
  "virtualization",
  // IT Storage track â€” static articles
  "das",
  "nas",
  "san",
  "backup",
  "disaster-recovery",
  // IT Networking track — static articles
  "switch",
]);

export default async function ItTopicPage(props: PageProps) {
  const params = await props.params;

  // Delegate to static page.tsx for articles that have their own implementation
  if (STATIC_ARTICLE_SLUGS.has(params.topic)) {
    notFound();
  }

  const topic = getTopic("it", params.category as ItCategory, params.topic);

  if (!topic) {
    notFound();
  }

  if (topic.status !== "published") {
    return <ComingSoonPage topic={topic} />;
  }

  return (
    <ArticleLayout slug={topic.slug} headings={[]} readingTimeMinutes={5}>
      <h2
        style={{
          fontFamily: "var(--font-display)",
          fontSize: "1.5rem",
          color: "var(--color-text-primary)",
          marginBottom: 16,
        }}
      >
        {topic.title}
      </h2>
      <p
        style={{
          fontFamily: "var(--font-body)",
          fontSize: 15,
          lineHeight: 1.8,
          color: "var(--color-text-secondary)",
        }}
      >
        {topic.description}
      </p>
      <p
        style={{
          fontFamily: "var(--font-mono)",
          fontSize: 11,
          color: "var(--color-text-muted)",
          marginTop: 24,
        }}
      >
        Full article content for this topic is being written. Check back soon.
      </p>
    </ArticleLayout>
  );
}

export async function generateStaticParams(): Promise<PageParams[]> {
  const topics: Topic[] = ALL_TOPICS;
  return topics
    .filter((t) => t.track === "it")
    // Exclude slugs that have their own static page.tsx â€” they handle their own routing
    .filter((t) => !STATIC_ARTICLE_SLUGS.has(t.slug))
    .map((t) => ({ category: t.category, topic: t.slug }));
}

export async function generateMetadata(props: PageProps) {
  const params = await props.params;

  // Static articles export their own metadata â€” return empty here
  if (STATIC_ARTICLE_SLUGS.has(params.topic)) {
    return {};
  }

  const topic = getTopic("it", params.category as ItCategory, params.topic);

  if (!topic) {
    return {};
  }

  return {
    title: `${topic.title} â€” Behind The Tech`,
    description: topic.description,
  };
}


