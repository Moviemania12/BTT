import ArticleLayout from "@/components/ArticleLayout";
import { HEADINGS } from "./headings";
import { faqSchema } from "./metadata";
import Basics from "./sections/Basics";
import SensorTypes from "./sections/SensorTypes";
import IntegrationAndClosing from "./sections/IntegrationAndClosing";
export { metadata } from "./metadata";
export default function SensorsPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <ArticleLayout slug="sensors" headings={HEADINGS} readingTimeMinutes={22}>
        <Basics />
        <SensorTypes />
        <IntegrationAndClosing />
      </ArticleLayout>
    </>
  );
}
