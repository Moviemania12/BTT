import type { Metadata } from "next";
import Footer from "@/components/Footer";
import HeroV2 from "@/components/homepage/HeroV2";
import LearningTracks from "@/components/homepage/LearningTracks";
import PopularTopics from "@/components/homepage/PopularTopics";
import ContinueLearning from "@/components/homepage/ContinueLearning";
import EngineeringTools from "@/components/homepage/EngineeringTools";
import WhyBehindTheTech from "@/components/homepage/WhyBehindTheTech";
import HowItWorks from "@/components/homepage/HowItWorks";
import LearningRoadmapSimple from "@/components/homepage/LearningRoadmapSimple";
import StatsBar from "@/components/homepage/StatsBar";
import FeaturedProduct from "@/components/btt-employee-manager/FeaturedProduct";

// ═══════════════════════════════════════════════════════════════════════════
// app/page.tsx — Homepage V2
//
// HowItWorks and StatsBar are new sections, added per explicit instruction.
// LearningRoadmapSimple (the subject-matter timeline) is KEPT alongside
// HowItWorks (the process explainer) — both exist, neither replaces the
// other. All other sections and their import names are unchanged from V1.
// ═══════════════════════════════════════════════════════════════════════════

// Canonical for the homepage (the root layout does not set one; child pages that
// define their own `alternates` override it entirely).
export const metadata: Metadata = {
  alternates: { canonical: "https://behindthetech.in" },
};

export default function Home() {
  return (
    <>
      <main>
        <HeroV2 />
        {/* Featured product: BTT Employee Manager (components/btt-employee-manager/FeaturedProduct) */}
        <FeaturedProduct />
        <LearningTracks />
        <PopularTopics />
        <ContinueLearning />
        <WhyBehindTheTech />
        <HowItWorks />
        <EngineeringTools />
        <LearningRoadmapSimple />
        <StatsBar />
      </main>
      <Footer />
    </>
  );
}
