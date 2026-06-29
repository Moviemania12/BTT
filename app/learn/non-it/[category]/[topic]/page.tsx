import { notFound } from "next/navigation";
import { getTopic, ALL_TOPICS } from "@/lib/topics";
import type { Topic, NonItCategory } from "@/lib/topics";
import ComingSoonPage from "@/components/ComingSoonPage";
import ArticleLayout from "@/components/ArticleLayout";

type PageParams = {
  category: string;
  topic: string;
};

type PageProps = {
  params: Promise<PageParams>;
};

export default async function NonItTopicPage(props: PageProps) {
  const params = await props.params;

  const topic = getTopic("non-it", params.category as NonItCategory, params.topic);

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
    .filter((t) => t.track === "non-it")
    .map((t) => ({ category: t.category, topic: t.slug }));
}

export async function generateMetadata(props: PageProps) {
  const params = await props.params;
  const topic = getTopic("non-it", params.category as NonItCategory, params.topic);

  if (!topic) {
    return {};
  }

  return {
    title: `${topic.title} — Behind The Tech`,
    description: topic.description,
  };
}
