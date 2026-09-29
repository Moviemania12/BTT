import ArticleLayout from "@/components/ArticleLayout";
import { HEADINGS } from "./headings";
import { articleSchema, breadcrumbSchema, faqSchema } from "./metadata";
import { dlMetadata } from "@/content/deep-learning/metadata";
import Content from "./sections/Content";

export { metadata } from "./metadata";

export default function DeepLearningPage() {
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
        slug="deep-learning"
        headings={HEADINGS}
        readingTimeMinutes={dlMetadata.readingTimeMinutes}
       lang="en" alternateHref="/hi/learn/ai/fundamentals/deep-learning">
        <Content />
      </ArticleLayout>
    </>
  );
}
