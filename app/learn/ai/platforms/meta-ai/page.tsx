import ArticleLayout from "@/components/ArticleLayout";
import { HEADINGS } from "./headings";
import { articleSchema, breadcrumbSchema, faqSchema } from "./metadata";
import { metaAiMetadata } from "@/content/meta-ai/metadata";
import Content from "./sections/Content";

export { metadata } from "./metadata";

export default function MetaAiPage() {
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
        slug="meta-ai"
        headings={HEADINGS}
        readingTimeMinutes={metaAiMetadata.readingTimeMinutes}
       lang="en" alternateHref="/hi/learn/ai/platforms/meta-ai">
        <Content />
      </ArticleLayout>
    </>
  );
}
