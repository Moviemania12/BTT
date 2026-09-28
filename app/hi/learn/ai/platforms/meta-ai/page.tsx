import ArticleLayout from "@/components/ArticleLayout";
import { HEADINGS } from "@/app/learn/ai/platforms/meta-ai/headings";
import { articleSchema, breadcrumbSchema, faqSchema } from "./metadata";
import { metaAiMetadata } from "@/content/meta-ai/metadata.hi";
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
        slug="meta-ai"
        headings={HEADINGS}
        readingTimeMinutes={metaAiMetadata.readingTimeMinutes}
       lang="hi" alternateHref="/learn/ai/platforms/meta-ai">
        <Content />
      </ArticleLayout>
    </>
  );
}
