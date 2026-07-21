import ArticleLayout from "@/components/ArticleLayout";
import { HEADINGS } from "./headings";
import { faqSchema } from "./metadata";
import Content from "./sections/Content";
export { metadata } from "./metadata";

export default function DisasterRecoveryPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <ArticleLayout
        slug="disaster-recovery"
        headings={HEADINGS}
        readingTimeMinutes={40}
      >
        <Content />
      </ArticleLayout>
    </>
  );
}
