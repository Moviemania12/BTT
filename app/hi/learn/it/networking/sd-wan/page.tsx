import ArticleLayout from "@/components/ArticleLayout";
import { HEADINGS } from "@/app/learn/it/networking/sd-wan/headings";
import { articleSchema, breadcrumbSchema, faqSchema } from "./metadata";
import { sdWanMetadata } from "@/content/sd-wan/metadata.hi";
import Content from "./sections/Content";

export { metadata } from "./metadata";

export default function SdWanArticlePage() {
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
        slug="sd-wan"
        headings={HEADINGS}
        readingTimeMinutes={sdWanMetadata.readingTimeMinutes}
       lang="hi" alternateHref="/learn/it/networking/sd-wan">
        <Content />
      </ArticleLayout>
    </>
  );
}
