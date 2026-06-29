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

export default async function AiTopicPage(props: PageProps) {
  const params = await props.params;

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
    .map((t) => ({
      category: t.category,
      topic: t.slug,
    }));
}

export async function generateMetadata(props: PageProps) {
  const params = await props.params;

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
