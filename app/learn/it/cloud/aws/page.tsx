import ArticleLayout from "@/components/ArticleLayout";
import { HEADINGS } from "./headings";
import { articleSchema, breadcrumbSchema, faqSchema } from "./metadata";
import { awsMetadata } from "@/content/aws/metadata";
import Content from "./sections/Content";

export { metadata } from "./metadata";

export default function AwsArticlePage() {
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
        slug="aws"
        headings={HEADINGS}
        readingTimeMinutes={awsMetadata.readingTimeMinutes}
      >
        <Content />
      </ArticleLayout>
    </>
  );
}
