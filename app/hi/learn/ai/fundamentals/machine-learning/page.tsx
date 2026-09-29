import ArticleLayout from "@/components/ArticleLayout";
import { HEADINGS } from "@/app/learn/ai/fundamentals/machine-learning/headings";
import { articleSchema, breadcrumbSchema, faqSchema } from "./metadata";
import { mlMetadata } from "@/content/machine-learning/metadata.hi";
import Content from "./sections/Content";

export { metadata } from "./metadata";

export default function MachineLearningPage() {
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
        slug="machine-learning"
        headings={HEADINGS}
        readingTimeMinutes={mlMetadata.readingTimeMinutes}
       lang="hi" alternateHref="/learn/ai/fundamentals/machine-learning">
        <Content />
      </ArticleLayout>
    </>
  );
}
