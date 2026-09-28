import ArticleLayout from "@/components/ArticleLayout";
import { HEADINGS } from "@/app/learn/it/cloud/hybrid-cloud/headings";
import { articleSchema, breadcrumbSchema, faqSchema } from "./metadata";
import { hybridCloudMetadata } from "@/content/hybrid-cloud/metadata.hi";
import Content from "./sections/Content";

export { metadata } from "./metadata";

export default function HybridCloudArticlePage() {
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
        slug="hybrid-cloud"
        headings={HEADINGS}
        readingTimeMinutes={hybridCloudMetadata.readingTimeMinutes}
       lang="hi" alternateHref="/learn/it/cloud/hybrid-cloud">
        <Content />
      </ArticleLayout>
    </>
  );
}
