import ArticleLayout from "@/components/ArticleLayout";
import { HEADINGS } from "./headings";
import { faqSchema } from "./metadata";
import Basics from "./sections/Basics";
import ComponentsAndTypes from "./sections/ComponentsAndTypes";
import IntegrationAndMaintenance from "./sections/IntegrationAndMaintenance";
import TroubleshootingAndClosing from "./sections/TroubleshootingAndClosing";

export { metadata } from "./metadata";

export default function AccessControlPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <ArticleLayout slug="access-control" headings={HEADINGS} readingTimeMinutes={20}>
        <Basics />
        <ComponentsAndTypes />
        <IntegrationAndMaintenance />
        <TroubleshootingAndClosing />
      </ArticleLayout>
    </>
  );
}
