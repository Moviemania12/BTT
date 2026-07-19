import ArticleLayout from "@/components/ArticleLayout";
import { HEADINGS } from "./headings";
import { faqSchema } from "./metadata";
import Content from "./sections/Content";
export { metadata } from "./metadata";

export default function VirtualizationPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <ArticleLayout slug="virtualization" headings={HEADINGS} readingTimeMinutes={24}>
        <Content />
      </ArticleLayout>
    </>
  );
}
