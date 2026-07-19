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

// ═══════════════════════════════════════════════════════════════════════════
// app/page.tsx — Homepage V2
//
// HowItWorks and StatsBar are new sections, added per explicit instruction.
// LearningRoadmapSimple (the subject-matter timeline) is KEPT alongside
// HowItWorks (the process explainer) — both exist, neither replaces the
// other. All other sections and their import names are unchanged from V1.
// ═══════════════════════════════════════════════════════════════════════════

export default function Home() {
  return (
    <>
      <main>
        <HeroV2 />
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
