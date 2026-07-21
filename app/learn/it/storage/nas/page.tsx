import ArticleLayout from "@/components/ArticleLayout";
import { HEADINGS } from "./headings";
import { faqSchema } from "./metadata";
import Content from "./sections/Content";
export { metadata } from "./metadata";

export default function NasPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <ArticleLayout slug="nas" headings={HEADINGS} readingTimeMinutes={45}>
        <Content />
      </ArticleLayout>
    </>
  );
}
