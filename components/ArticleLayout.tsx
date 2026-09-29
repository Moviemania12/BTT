import type { ReactNode } from "react";
import ArticlePage, { type ArticleHeading } from "@/components/ArticlePage";
import { TOPICS, getPrevTopic, getNextTopic } from "@/lib/topics";
import ArticleStructuredData from "@/components/ArticleStructuredData";

interface ArticleLayoutProps {
  slug: string;
  headings: ArticleHeading[];
  readingTimeMinutes: number;
  lang?: "en" | "hi";
  alternateHref?: string;
  /**
   * Emit TechArticle + BreadcrumbList JSON-LD built from the topic registry.
   * Default true. Pages that render their own article/breadcrumb schema
   * (e.g. the metadata.ts based articles) pass `false` to avoid duplicates.
   */
  structuredData?: boolean;
  children: ReactNode;
}

export default function ArticleLayout({
  slug,
  headings,
  readingTimeMinutes,
  lang,
  alternateHref,
  structuredData = true,
  children,
}: ArticleLayoutProps) {
  const topic = TOPICS[slug];

  const prev = getPrevTopic(slug);
  const next = getNextTopic(slug);
  const relatedSlugs = topic?.related ?? [];

  const schema = structuredData ? <ArticleStructuredData slug={slug} lang={lang} /> : null;

  return (
    <>
      {schema}
      <ArticlePage
        slug={slug}
        prevSlug={prev?.slug}
        nextSlug={next?.slug}
        relatedSlugs={relatedSlugs}
        headings={headings}
        readingTimeMinutes={readingTimeMinutes}
        lang={lang}
        alternateHref={alternateHref}
      >
        {children}
      </ArticlePage>
    </>
  );
}
