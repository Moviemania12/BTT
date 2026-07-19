import ArticleLayout from "@/components/ArticleLayout";
import { HEADINGS } from "./headings";
import { faqSchema } from "./metadata";
import Content from "./sections/Content";
export { metadata } from "./metadata";

export default function BladeServerPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <ArticleLayout slug="blade-server" headings={HEADINGS} readingTimeMinutes={18}>
        <Content />
      </ArticleLayout>
    </>
  );
}
