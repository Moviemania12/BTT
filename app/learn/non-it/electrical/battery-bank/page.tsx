import ArticleLayout from "@/components/ArticleLayout";
import { HEADINGS } from "./headings";
import { articleSchema, breadcrumbSchema, faqSchema } from "./metadata";
import { batteryBankMetadata } from "@/content/battery-bank/metadata";
import Foundation from "./sections/Foundation";
import ElectricalFundamentals from "./sections/ElectricalFundamentals";
import DatasheetGuide from "./sections/DatasheetGuide";
import BatterySizing from "./sections/BatterySizing";
import DcBusIntegration from "./sections/DcBusIntegration";
import BmsMonitoring from "./sections/BmsMonitoring";
import RoomCalculations from "./sections/RoomCalculations";
import BatteryRoomDesign from "./sections/BatteryRoomDesign";
import OemVendors from "./sections/OemVendors";
import InstallationOperation from "./sections/InstallationOperation";
import TestingMaintenance from "./sections/TestingMaintenance";
import FaultsSafety from "./sections/FaultsSafety";
import TierDesignStandards from "./sections/TierDesignStandards";
import ClosingSection from "./sections/ClosingSection";

export { metadata } from "./metadata";

// ═══════════════════════════════════════════════════════════════════════════
// BATTERY BANK ARTICLE PAGE — ALL 25 PARTS COMPLETE
//
// Batch 1: Foundation + ElectricalFundamentals (Parts 1–4)  ✅
// Batch 2: DatasheetGuide + BatterySizing + DcBusIntegration (Parts 5–9) ✅
// Batch 3: BmsMonitoring + RoomCalculations + BatteryRoomDesign (Parts 10–12) ✅
// Batch 4: OemVendors + InstallationOperation + TestingMaintenance (Parts 13–19) ✅
// Batch 5: FaultsSafety + TierDesignStandards + ClosingSection (Parts 20–25) ✅
// ═══════════════════════════════════════════════════════════════════════════

export default function BatteryBankPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      {faqSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
      )}
      <ArticleLayout
        slug="battery-bank"
        headings={HEADINGS}
        readingTimeMinutes={batteryBankMetadata.readingTimeMinutes}
      >
        <Foundation />
        <ElectricalFundamentals />
        <DatasheetGuide />
        <BatterySizing />
        <DcBusIntegration />
        <BmsMonitoring />
        <RoomCalculations />
        <BatteryRoomDesign />
        <OemVendors />
        <InstallationOperation />
        <TestingMaintenance />
        <FaultsSafety />
        <TierDesignStandards />
        <ClosingSection />
      </ArticleLayout>
    </>
  );
}
