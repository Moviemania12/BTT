import ArticleLayout from "@/components/ArticleLayout";
import { HEADINGS } from "./headings";
import { articleSchema, breadcrumbSchema, faqSchema } from "./metadata";
import { aiNetworkingMetadata } from "@/content/ai-networking/metadata";
import Content from "./sections/Content";

export { metadata } from "./metadata";

export default function AiNetworkingPage() {
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
        slug="ai-networking"
        headings={HEADINGS}
        readingTimeMinutes={aiNetworkingMetadata.readingTimeMinutes}
       lang="en" alternateHref="/hi/learn/ai/data-centers/ai-networking">
        <Content />
      </ArticleLayout>
    </>
  );
}
