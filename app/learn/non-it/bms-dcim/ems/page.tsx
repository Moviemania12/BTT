import ArticleLayout from "@/components/ArticleLayout";
import { HEADINGS } from "./headings";
import { faqSchema } from "./metadata";
import Basics from "./sections/Basics";
import MetersAndKPIs from "./sections/MetersAndKPIs";
import TroubleshootingAndClosing from "./sections/TroubleshootingAndClosing";
export { metadata } from "./metadata";
export default function EmsPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <ArticleLayout slug="ems" headings={HEADINGS} readingTimeMinutes={20}>
        <Basics />
        <MetersAndKPIs />
        <TroubleshootingAndClosing />
      </ArticleLayout>
    </>
  );
}
