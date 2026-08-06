import ArticleLayout from "@/components/ArticleLayout";
import { HEADINGS } from "./headings";
import { articleSchema, breadcrumbSchema, faqSchema } from "./metadata";
import { tpuMetadata } from "@/content/tpu/metadata";
import Content from "./sections/Content";

export { metadata } from "./metadata";

export default function TpuPage() {
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
        slug="tpu"
        headings={HEADINGS}
        readingTimeMinutes={tpuMetadata.readingTimeMinutes}
      >
        <Content />
      </ArticleLayout>
    </>
  );
}
