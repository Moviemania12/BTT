import ArticleLayout from "@/components/ArticleLayout";
import { HEADINGS } from "./headings";
import { articleSchema, breadcrumbSchema, faqSchema } from "./metadata";
import { hybridCloudMetadata } from "@/content/hybrid-cloud/metadata";
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
        structuredData={false}
        slug="hybrid-cloud"
        headings={HEADINGS}
        readingTimeMinutes={hybridCloudMetadata.readingTimeMinutes}
       lang="en" alternateHref="/hi/learn/it/cloud/hybrid-cloud">
        <Content />
      </ArticleLayout>
    </>
  );
}
