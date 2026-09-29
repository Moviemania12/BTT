import ArticleLayout from "@/components/ArticleLayout";
import { HEADINGS } from "@/app/learn/ai/hardware/amd-ai-platforms/headings";
import { articleSchema, breadcrumbSchema, faqSchema } from "./metadata";
import { amdAiMetadata } from "@/content/amd-ai-platforms/metadata.hi";
import Content from "./sections/Content";

export { metadata } from "./metadata";

export default function AmdAiPlatformsPage() {
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
        slug="amd-ai-platforms"
        headings={HEADINGS}
        readingTimeMinutes={amdAiMetadata.readingTimeMinutes}
       lang="hi" alternateHref="/learn/ai/hardware/amd-ai-platforms">
        <Content />
      </ArticleLayout>
    </>
  );
}
