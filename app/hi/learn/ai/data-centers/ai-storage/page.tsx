import ArticleLayout from "@/components/ArticleLayout";
import { HEADINGS } from "@/app/learn/ai/data-centers/ai-storage/headings";
import { articleSchema, breadcrumbSchema, faqSchema } from "./metadata";
import { aiStorageMetadata } from "@/content/ai-storage/metadata.hi";
import Content from "./sections/Content";

export { metadata } from "./metadata";

export default function AiStoragePage() {
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
        slug="ai-storage"
        headings={HEADINGS}
        readingTimeMinutes={aiStorageMetadata.readingTimeMinutes}
       lang="hi" alternateHref="/learn/ai/data-centers/ai-storage">
        <Content />
      </ArticleLayout>
    </>
  );
}
