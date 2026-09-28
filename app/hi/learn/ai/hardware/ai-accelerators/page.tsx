import ArticleLayout from "@/components/ArticleLayout";
import { HEADINGS } from "@/app/learn/ai/hardware/ai-accelerators/headings";
import { articleSchema, breadcrumbSchema, faqSchema } from "./metadata";
import { aiAcceleratorsMetadata } from "@/content/ai-accelerators/metadata.hi";
import Content from "./sections/Content";

export { metadata } from "./metadata";

export default function AiAcceleratorsPage() {
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
        slug="ai-accelerators"
        headings={HEADINGS}
        readingTimeMinutes={aiAcceleratorsMetadata.readingTimeMinutes}
       lang="hi" alternateHref="/learn/ai/hardware/ai-accelerators">
        <Content />
      </ArticleLayout>
    </>
  );
}
