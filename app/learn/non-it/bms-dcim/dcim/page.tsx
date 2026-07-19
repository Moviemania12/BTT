import ArticleLayout from "@/components/ArticleLayout";
import { HEADINGS } from "./headings";
import { faqSchema } from "./metadata";
import Basics from "./sections/Basics";
import CoreFunctions from "./sections/CoreFunctions";
import SoftwareAndClosing from "./sections/SoftwareAndClosing";
export { metadata } from "./metadata";
export default function DcimPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <ArticleLayout slug="dcim" headings={HEADINGS} readingTimeMinutes={25}>
        <Basics />
        <CoreFunctions />
        <SoftwareAndClosing />
      </ArticleLayout>
    </>
  );
}
