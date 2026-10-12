import type { Metadata } from "next";
import JsonLd from "@/components/JsonLd";
import { buildSocialMeta, buildOrganizationSchema } from "@/lib/schemas";
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
const HOME_TITLE = "Data Center Engineering Guides & Calculators | Behind The Tech";
const HOME_DESCRIPTION =
  "Learn data center engineering in English and Hindi: UPS, cooling, electrical, servers, networking and AI infrastructure — with free engineering calculators.";

export const metadata: Metadata = {
  title: HOME_TITLE,
  description: HOME_DESCRIPTION,
  alternates: { canonical: "https://behindthetech.in" },
  ...buildSocialMeta({ title: HOME_TITLE, description: HOME_DESCRIPTION, url: "https://behindthetech.in" }),
};

const ORGANIZATION_SCHEMA = {
  ...buildOrganizationSchema({
    name: "Behind The Tech",
    url: "https://behindthetech.in",
    logoUrl: "https://behindthetech.in/apple-touch-icon.png",
  }),
  sameAs: [
    "https://youtube.com/@behindthe_tech",
    "https://instagram.com/_behindthetech",
    "https://linkedin.com/company/behindthetech",
  ],
};

const WEBSITE_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "Behind The Tech",
  url: "https://behindthetech.in",
  inLanguage: ["en", "hi"],
  description: HOME_DESCRIPTION,
  publisher: { "@type": "Organization", name: "Behind The Tech", url: "https://behindthetech.in" },
};

export default function Home() {
  return (
    <>
      <JsonLd data={ORGANIZATION_SCHEMA} />
      <JsonLd data={WEBSITE_SCHEMA} />
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
