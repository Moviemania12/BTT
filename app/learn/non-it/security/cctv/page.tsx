import ArticleLayout from "@/components/ArticleLayout";
import { HEADINGS } from "./headings";
import { faqSchema } from "./metadata";
import Basics from "./sections/Basics";
import Cameras from "./sections/Cameras";
import RecordingAndStorage from "./sections/RecordingAndStorage";
import PlacementAndIntegration from "./sections/PlacementAndIntegration";
import MaintenanceAndTroubleshooting from "./sections/MaintenanceAndTroubleshooting";
import ClosingSection from "./sections/ClosingSection";

export { metadata } from "./metadata";

export default function CCTVArticlePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <ArticleLayout slug="cctv" headings={HEADINGS} readingTimeMinutes={22}>
        <Basics />
        <Cameras />
        <RecordingAndStorage />
        <PlacementAndIntegration />
        <MaintenanceAndTroubleshooting />
        <ClosingSection />
      </ArticleLayout>
    </>
  );
}
