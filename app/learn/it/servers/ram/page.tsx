import ArticleLayout from "@/components/ArticleLayout";
import { HEADINGS } from "./headings";
import { faqSchema } from "./metadata";
import Content from "./sections/Content";
export { metadata } from "./metadata";

export default function RamPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <ArticleLayout slug="ram" headings={HEADINGS} readingTimeMinutes={18}>
        <Content />
      </ArticleLayout>
    </>
  );
}
