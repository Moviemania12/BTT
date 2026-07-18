import ArticleLayout from "@/components/ArticleLayout";
import { HEADINGS } from "./headings";
import { faqSchema } from "./metadata";
import Basics from "./sections/Basics";
import AccessAndIntegration from "./sections/AccessAndIntegration";
import TroubleshootingAndClosing from "./sections/TroubleshootingAndClosing";

export { metadata } from "./metadata";

export default function VisitorManagementPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <ArticleLayout slug="visitor-management" headings={HEADINGS} readingTimeMinutes={16}>
        <Basics />
        <AccessAndIntegration />
        <TroubleshootingAndClosing />
      </ArticleLayout>
    </>
  );
}
