import ArticleLayout from "@/components/ArticleLayout";
import { HEADINGS } from "@/app/learn/it/cloud/azure/headings";
import { articleSchema, breadcrumbSchema, faqSchema } from "./metadata";
import { azureMetadata } from "@/content/azure/metadata.hi";
import Content from "./sections/Content";

export { metadata } from "./metadata";

export default function AzureArticlePage() {
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
        slug="azure"
        headings={HEADINGS}
        readingTimeMinutes={azureMetadata.readingTimeMinutes}
       lang="hi" alternateHref="/learn/it/cloud/azure">
        <Content />
      </ArticleLayout>
    </>
  );
}
