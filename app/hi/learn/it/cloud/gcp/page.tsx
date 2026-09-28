import ArticleLayout from "@/components/ArticleLayout";
import { HEADINGS } from "@/app/learn/it/cloud/gcp/headings";
import { articleSchema, breadcrumbSchema, faqSchema } from "./metadata";
import { gcpMetadata } from "@/content/gcp/metadata.hi";
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
        slug="gcp"
        headings={HEADINGS}
        readingTimeMinutes={gcpMetadata.readingTimeMinutes}
       lang="hi" alternateHref="/learn/it/cloud/gcp">
        <Content />
      </ArticleLayout>
    </>
  );
}
