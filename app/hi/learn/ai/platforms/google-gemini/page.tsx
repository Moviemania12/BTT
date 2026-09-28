import ArticleLayout from "@/components/ArticleLayout";
import { HEADINGS } from "@/app/learn/ai/platforms/google-gemini/headings";
import { articleSchema, breadcrumbSchema, faqSchema } from "./metadata";
import { googleGeminiMetadata } from "@/content/google-gemini/metadata.hi";
import Content from "./sections/Content";

export { metadata } from "./metadata";

export default function GoogleGeminiPage() {
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
        slug="google-gemini"
        headings={HEADINGS}
        readingTimeMinutes={googleGeminiMetadata.readingTimeMinutes}
       lang="hi" alternateHref="/learn/ai/platforms/google-gemini">
        <Content />
      </ArticleLayout>
    </>
  );
}
