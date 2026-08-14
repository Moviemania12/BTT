import ArticleLayout from "@/components/ArticleLayout";
import { HEADINGS } from "./headings";
import { articleSchema, breadcrumbSchema, faqSchema } from "./metadata";
import { anthropicMetadata } from "@/content/anthropic/metadata";
import Content from "./sections/Content";

export { metadata } from "./metadata";

export default function AnthropicPage() {
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
        slug="anthropic"
        headings={HEADINGS}
        readingTimeMinutes={anthropicMetadata.readingTimeMinutes}
      >
        <Content />
      </ArticleLayout>
    </>
  );
}
