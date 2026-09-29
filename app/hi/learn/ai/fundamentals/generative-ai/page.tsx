import ArticleLayout from "@/components/ArticleLayout";
import { HEADINGS } from "@/app/learn/ai/fundamentals/generative-ai/headings";
import { articleSchema, breadcrumbSchema, faqSchema } from "./metadata";
import { genAiMetadata } from "@/content/generative-ai/metadata.hi";
import Content from "./sections/Content";

export { metadata } from "./metadata";

export default function GenerativeAiPage() {
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
        slug="generative-ai"
        headings={HEADINGS}
        readingTimeMinutes={genAiMetadata.readingTimeMinutes}
       lang="hi" alternateHref="/learn/ai/fundamentals/generative-ai">
        <Content />
      </ArticleLayout>
    </>
  );
}
