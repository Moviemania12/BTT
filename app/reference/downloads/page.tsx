import type { Metadata } from "next";
import { buildSocialMeta } from "@/lib/schemas";
import { DOWNLOAD_ITEMS, DOWNLOAD_CATEGORIES } from "@/content/reference/downloads";
import DownloadsClient from "@/components/reference/DownloadsClient";

export const metadata: Metadata = {
  title: "Data Center Templates and Downloads — Behind The Tech",
  description:
    "Free Data Center engineering templates — UPS maintenance reports, DG test records, battery inspection forms, rack audit sheets, incident report templates, RCA templates, change management forms, capacity planning worksheets. Print-ready PDF generation.",
  alternates: {
    canonical: "https://behindthetech.in/reference/downloads",
  },
  ...buildSocialMeta({
    title: "Data Center Templates and Downloads — Behind The Tech",
    description:
      "Free Data Center engineering templates — UPS maintenance reports, DG test records, battery inspection forms, rack audit sheets, incident report templates, RCA templates, change management forms, capacity planning worksheets. Print-ready PDF generation.",
    url: "https://behindthetech.in/reference/downloads",
  }),
};

export default function DownloadsPage() {
  const totalFields = DOWNLOAD_ITEMS.reduce(
    (sum, item) => sum + item.sections.reduce((s2, sec) => s2 + sec.rows.length, 0),
    0
  );

  return (
    <main data-homepage-theme="light" style={{ background: "#ffffff", minHeight: "100vh", paddingTop: "2.5rem" }}>
      <div style={{ maxWidth: "960px", margin: "0 auto", padding: "0 1.5rem 5rem" }}>
        <p style={{ fontSize: "0.8rem", color: "#94a3b8", marginBottom: "0.5rem", textTransform: "uppercase", letterSpacing: "0.1em", fontWeight: 700 }}>
          REFERENCE → Downloads
        </p>
        <h1 style={{ fontSize: "2.2rem", fontWeight: 800, color: "#111827", marginBottom: "0.5rem", letterSpacing: "-0.01em" }}>
          Engineering Templates and Forms
        </h1>
        <p style={{ fontSize: "1.1rem", color: "#475569", marginBottom: "2rem", maxWidth: "700px" }}>
          {DOWNLOAD_ITEMS.length} templates, {totalFields} total fields — production-ready forms for DC operations, maintenance, and management. Every template is print-ready — save it directly as a PDF from your browser.
        </p>
        <DownloadsClient items={DOWNLOAD_ITEMS} categories={DOWNLOAD_CATEGORIES} />
      </div>
    </main>
  );
}
