import ArticleLayout from "@/components/ArticleLayout";
import { HEADINGS } from "@/app/learn/ai/fundamentals/llm/headings";
import { articleSchema, breadcrumbSchema, faqSchema } from "./metadata";
import { llmMetadata } from "@/content/llms/metadata.hi";
import Content from "./sections/Content";

export { metadata } from "./metadata";

export default function LargeLanguageModelsPage() {
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
        slug="llm"
        headings={HEADINGS}
        readingTimeMinutes={llmMetadata.readingTimeMinutes}
       lang="hi" alternateHref="/learn/ai/fundamentals/llm">
        <Content />
      </ArticleLayout>
    </>
  );
}
