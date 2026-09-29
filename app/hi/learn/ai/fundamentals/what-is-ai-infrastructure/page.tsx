import ArticleLayout from "@/components/ArticleLayout";
import { HEADINGS } from "@/app/learn/ai/fundamentals/what-is-ai-infrastructure/headings";
import { articleSchema, breadcrumbSchema, faqSchema } from "./metadata";
import { aiInfraMetadata } from "@/content/what-is-ai-infrastructure/metadata.hi";
import Content from "./sections/Content";

export { metadata } from "./metadata";

export default function WhatIsAiInfrastructurePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      {faqSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
      )}
      <ArticleLayout
        structuredData={false}
        slug="what-is-ai-infrastructure"
        headings={HEADINGS}
        readingTimeMinutes={aiInfraMetadata.readingTimeMinutes}
       lang="hi" alternateHref="/learn/ai/fundamentals/what-is-ai-infrastructure">
        <Content />
      </ArticleLayout>
    </>
  );
}
