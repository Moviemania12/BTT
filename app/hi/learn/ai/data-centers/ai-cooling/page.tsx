import ArticleLayout from "@/components/ArticleLayout";
import { HEADINGS } from "@/app/learn/ai/data-centers/ai-cooling/headings";
import { articleSchema, breadcrumbSchema, faqSchema } from "./metadata";
import { aiCoolingMetadata } from "@/content/ai-cooling/metadata.hi";
import Content from "./sections/Content";

export { metadata } from "./metadata";

export default function AiCoolingPage() {
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
        slug="ai-cooling"
        headings={HEADINGS}
        readingTimeMinutes={aiCoolingMetadata.readingTimeMinutes}
       lang="hi" alternateHref="/learn/ai/data-centers/ai-cooling">
        <Content />
      </ArticleLayout>
    </>
  );
}
