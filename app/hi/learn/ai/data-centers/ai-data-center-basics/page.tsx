import ArticleLayout from "@/components/ArticleLayout";
import { HEADINGS } from "@/app/learn/ai/data-centers/ai-data-center-basics/headings";
import { articleSchema, breadcrumbSchema, faqSchema } from "./metadata";
import { aiDcMetadata } from "@/content/ai-data-center-basics/metadata.hi";
import Content from "./sections/Content";

export { metadata } from "./metadata";

export default function AiDataCenterBasicsPage() {
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
        slug="ai-data-center-basics"
        headings={HEADINGS}
        readingTimeMinutes={aiDcMetadata.readingTimeMinutes}
       lang="hi" alternateHref="/learn/ai/data-centers/ai-data-center-basics">
        <Content />
      </ArticleLayout>
    </>
  );
}
