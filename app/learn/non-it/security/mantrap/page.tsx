import ArticleLayout from "@/components/ArticleLayout";
import { HEADINGS } from "./headings";
import { faqSchema } from "./metadata";
import Basics from "./sections/Basics";
import OperationsAndMaintenance from "./sections/OperationsAndMaintenance";
import TroubleshootingAndClosing from "./sections/TroubleshootingAndClosing";

export { metadata } from "./metadata";

export default function MantrapPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <ArticleLayout slug="mantrap" headings={HEADINGS} readingTimeMinutes={17}>
        <Basics />
        <OperationsAndMaintenance />
        <TroubleshootingAndClosing />
      </ArticleLayout>
    </>
  );
}
