import ArticleLayout from "@/components/ArticleLayout";
import { HEADINGS } from "./headings";
import { articleSchema, breadcrumbSchema, faqSchema } from "./metadata";
import { aiGpuMetadata } from "@/content/ai-gpu/metadata";
import Content from "./sections/Content";

export { metadata } from "./metadata";

export default function AiGpuPage() {
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
        slug="ai-gpu"
        headings={HEADINGS}
        readingTimeMinutes={aiGpuMetadata.readingTimeMinutes}
      >
        <Content />
      </ArticleLayout>
    </>
  );
}
