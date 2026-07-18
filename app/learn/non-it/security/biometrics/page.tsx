import ArticleLayout from "@/components/ArticleLayout";
import { HEADINGS } from "./headings";
import { faqSchema } from "./metadata";
import Basics from "./sections/Basics";
import EnrollmentAndIntegration from "./sections/EnrollmentAndIntegration";
import TroubleshootingAndClosing from "./sections/TroubleshootingAndClosing";

export { metadata } from "./metadata";

export default function BiometricsPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <ArticleLayout slug="biometrics" headings={HEADINGS} readingTimeMinutes={18}>
        <Basics />
        <EnrollmentAndIntegration />
        <TroubleshootingAndClosing />
      </ArticleLayout>
    </>
  );
}
