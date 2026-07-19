import ArticleLayout from "@/components/ArticleLayout";
import { HEADINGS } from "./headings";
import { faqSchema } from "./metadata";
import Basics from "./sections/Basics";
export { metadata } from "./metadata";
export default function ScadaPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <ArticleLayout slug="scada" headings={HEADINGS} readingTimeMinutes={18}>
        <Basics />
      </ArticleLayout>
    </>
  );
}
