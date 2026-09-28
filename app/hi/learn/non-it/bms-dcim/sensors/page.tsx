import ArticleLayout from "@/components/ArticleLayout";
import { HEADINGS } from "@/app/learn/non-it/bms-dcim/sensors/headings";
import { faqSchema } from "./metadata";
import Basics from "./sections/Basics";
import SensorTypes from "./sections/SensorTypes";
import IntegrationAndClosing from "./sections/IntegrationAndClosing";
export { metadata } from "./metadata";
export default function SensorsPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <ArticleLayout slug="sensors" headings={HEADINGS} readingTimeMinutes={22} lang="hi" alternateHref="/learn/non-it/bms-dcim/sensors">
        <Basics />
        <SensorTypes />
        <IntegrationAndClosing />
      </ArticleLayout>
    </>
  );
}
