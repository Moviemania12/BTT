import ArticleLayout from "@/components/ArticleLayout";
import { HEADINGS } from "./headings";
import { articleSchema, breadcrumbSchema, faqSchema } from "./metadata";
import { sdWanMetadata } from "@/content/sd-wan/metadata";
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
       lang="en" alternateHref="/hi/learn/it/networking/sd-wan">
        <Content />
      </ArticleLayout>
    </>
  );
}
