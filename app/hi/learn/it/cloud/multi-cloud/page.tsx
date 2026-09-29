import ArticleLayout from "@/components/ArticleLayout";
import { HEADINGS } from "@/app/learn/it/cloud/multi-cloud/headings";
import { articleSchema, breadcrumbSchema, faqSchema } from "./metadata";
import { multiCloudMetadata } from "@/content/multi-cloud/metadata.hi";
import Content from "./sections/Content";

export { metadata } from "./metadata";

export default function MultiCloudArticlePage() {
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
        slug="multi-cloud"
        headings={HEADINGS}
        readingTimeMinutes={multiCloudMetadata.readingTimeMinutes}
       lang="hi" alternateHref="/learn/it/cloud/multi-cloud">
        <Content />
      </ArticleLayout>
    </>
  );
}
