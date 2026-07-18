import ArticleLayout from "@/components/ArticleLayout";
import { HEADINGS } from "./headings";
import { faqSchema } from "./metadata";
import Basics from "./sections/Basics";
import Architecture from "./sections/Architecture";
import Integration from "./sections/Integration";
import DataFlow from "./sections/DataFlow";
import WhatBmsMonitors from "./sections/WhatBmsMonitors";
import UpsIntegration from "./sections/UpsIntegration";
import AlarmsTrends from "./sections/AlarmsTrends";
import NetworkAndSoftware from "./sections/NetworkAndSoftware";
import TroubleshootingAndClosing from "./sections/TroubleshootingAndClosing";

export { metadata } from "./metadata";

export default function BmsArticlePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <ArticleLayout slug="bms" headings={HEADINGS} readingTimeMinutes={30}>
        <Basics />
        <Architecture />
        <Integration />
        <DataFlow />
        <WhatBmsMonitors />
        <UpsIntegration />
        <AlarmsTrends />
        <NetworkAndSoftware />
        <TroubleshootingAndClosing />
      </ArticleLayout>
    </>
  );
}
