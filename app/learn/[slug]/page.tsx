import { notFound } from "next/navigation";
import { getTopic, ALL_TOPICS } from "@/lib/topics";
import type { Topic } from "@/lib/topics";
import ComingSoonPage from "@/components/ComingSoonPage";
import ArticleLayout from "@/components/ArticleLayout";

type PageParams = {
  slug: string;
};

type PageProps = {
  params: Promise<PageParams>;
};

export default async function LearnBasicsPage(props: PageProps) {
  const params = await props.params;
  const slug = params.slug;

  if (slug === "what-is-a-data-center") {
    notFound();
  }

  const topic = getTopic("learn", "basics", slug);

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
    .filter((t) => t.track === "learn" && t.category === "basics")
    .filter((t) => t.slug !== "what-is-a-data-center")
    .map((t) => ({ slug: t.slug }));
}

export async function generateMetadata(props: PageProps) {
  const params = await props.params;
  const topic = getTopic("learn", "basics", params.slug);

  if (!topic) {
    return {};
  }

  return {
    title: `${topic.title} — Behind The Tech`,
    description: topic.description,
  };
}
