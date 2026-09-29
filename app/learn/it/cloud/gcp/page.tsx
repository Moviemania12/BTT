import ArticleLayout from "@/components/ArticleLayout";
import { HEADINGS } from "./headings";
import { articleSchema, breadcrumbSchema, faqSchema } from "./metadata";
import { gcpMetadata } from "@/content/gcp/metadata";
import Content from "./sections/Content";

export { metadata } from "./metadata";

export default function GcpArticlePage() {
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
        slug="gcp"
        headings={HEADINGS}
        readingTimeMinutes={gcpMetadata.readingTimeMinutes}
       lang="en" alternateHref="/hi/learn/it/cloud/gcp">
        <Content />
      </ArticleLayout>
    </>
  );
}
