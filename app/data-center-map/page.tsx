import type { Metadata } from "next";
import DcMapExperience from "@/components/dc-map/DcMapExperience";
import "@/components/dc-map/dc-map.css";
import DcMapPlateActivator from "@/components/dc-map/DcMapPlateActivator";

// ═══════════════════════════════════════════════════════════════════════════
// app/data-center-map/page.tsx
//
// The Interactive Data Center Map — flagship learning experience of
// Behind The Tech. A complete facility modelled outside-in: utility
// grid to server racks, with animated power / cooling / network / fire
// flows, learning modes, instant search, discipline filters, minimap
// and a per-component learning panel.
//
// This page is a Server Component: static header + SEO here, all
// interactivity inside <DcMapExperience /> (client). Scene data lives
// in components/dc-map/map-data.ts; educational copy in map-content.ts.
// ═══════════════════════════════════════════════════════════════════════════

const PAGE_URL = "https://behindthetech.in/data-center-map";
const PAGE_TITLE = "Interactive Data Center Map — Explore Every System | Behind The Tech";
const PAGE_DESCRIPTION =
  "Ek complete data center ko andar se explore karein — utility grid se server racks tak. Power, cooling, network, fire, security aur monitoring systems ke animated flows ke saath, har component par click karke seekhein.";

export const metadata: Metadata = {
  title: PAGE_TITLE,
  description: PAGE_DESCRIPTION,
  alternates: { canonical: PAGE_URL },
  openGraph: {
    title: PAGE_TITLE,
    description: PAGE_DESCRIPTION,
    url: PAGE_URL,
    siteName: "Behind The Tech",
    type: "website",
    locale: "en_IN",
  },
  twitter: {
    card: "summary_large_image",
    title: PAGE_TITLE,
    description: PAGE_DESCRIPTION,
  },
};

const LEARNING_RESOURCE_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "LearningResource",
  name: "Interactive Data Center Map",
  description: PAGE_DESCRIPTION,
  url: PAGE_URL,
  learningResourceType: "Interactive diagram",
  educationalLevel: "Beginner to Advanced",
  inLanguage: "en-IN",
  teaches: [
    "Data center power infrastructure",
    "Data center cooling systems",
    "Fire detection and suppression",
    "Physical security systems",
    "Data center networking",
    "Infrastructure monitoring (BMS, DCIM, NOC)",
  ],
  provider: {
    "@type": "Organization",
    name: "Behind The Tech",
    url: "https://behindthetech.in",
  },
};

export default function DataCenterMapPage() {
  return (
    <main className="dcm-page" data-homepage-theme="light">
      {/* Activates plate mode: hides SVG artwork, shows PNG master plate */}
      <DcMapPlateActivator />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(LEARNING_RESOURCE_SCHEMA) }}
      />

      <header className="dcm-page-head">
        <span className="dcm-page-eyebrow">Interactive Learning</span>
        <h1 className="dcm-page-title">Interactive Data Center Map</h1>
        <p className="dcm-page-sub">
          Ek poora data center — bahar ke utility grid se lekar andar ke server racks tak. Har
          equipment clickable hai: uska purpose, working principle aur failure impact seekhein.
          Learning modes se ek-ek system ko isolate karke follow karein.
        </p>
      </header>

      <DcMapExperience />
    </main>
  );
}
