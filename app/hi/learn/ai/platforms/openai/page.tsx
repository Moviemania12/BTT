import ArticleLayout from "@/components/ArticleLayout";
import { HEADINGS } from "@/app/learn/ai/platforms/openai/headings";
import { articleSchema, breadcrumbSchema, faqSchema } from "./metadata";
import { openaiMetadata } from "@/content/openai/metadata.hi";
import Content from "./sections/Content";

export { metadata } from "./metadata";

export default function OpenAiPage() {
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
        slug="openai"
        headings={HEADINGS}
        readingTimeMinutes={openaiMetadata.readingTimeMinutes}
       lang="hi" alternateHref="/learn/ai/platforms/openai">
        <Content />
      </ArticleLayout>
    </>
  );
}
