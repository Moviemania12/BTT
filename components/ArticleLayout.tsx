import type { ReactNode } from "react";
import ArticlePage, { type ArticleHeading } from "@/components/ArticlePage";
import { TOPICS, getPrevTopic, getNextTopic } from "@/lib/topics";

interface ArticleLayoutProps {
  slug: string;
  headings: ArticleHeading[];
  readingTimeMinutes: number;
  children: ReactNode;
}

export default function ArticleLayout({
  slug,
  headings,
  readingTimeMinutes,
  children,
}: ArticleLayoutProps) {
  const topic = TOPICS[slug];

  const prev = getPrevTopic(slug);
  const next = getNextTopic(slug);
  const relatedSlugs = topic?.related ?? [];

  return (
    <ArticlePage
      slug={slug}
      prevSlug={prev?.slug}
      nextSlug={next?.slug}
      relatedSlugs={relatedSlugs}
      headings={headings}
      readingTimeMinutes={readingTimeMinutes}
    >
      {children}
    </ArticlePage>
  );
}
