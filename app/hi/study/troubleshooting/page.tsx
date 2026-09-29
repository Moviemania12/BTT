import type { Metadata } from "next";
import { buildSocialMeta } from "@/lib/schemas";
import { TROUBLESHOOTING_GUIDES, TROUBLESHOOTING_CATEGORIES } from "@/content/study/troubleshooting.hi";
import TroubleshootingClient from "@/components/study/TroubleshootingClient";

export const metadata: Metadata = {
  title: "Data Center Troubleshooting Guides — Behind The Tech",
  description:
    "Practical Data Center troubleshooting guides — Power, Cooling, UPS, DG, Networking, Storage, Cloud. Real symptoms, root causes, step-by-step resolution, aur prevention. DC engineer ke liye field-ready reference.",
  alternates: {
    canonical: "https://behindthetech.in/hi/study/troubleshooting",
    languages: {
      "en": "https://behindthetech.in/study/troubleshooting",
      "hi": "https://behindthetech.in/hi/study/troubleshooting",
      "x-default": "https://behindthetech.in/study/troubleshooting",
    },
  },
  ...buildSocialMeta({ title: "Data Center Troubleshooting Guides — Behind The Tech", description: "Practical Data Center troubleshooting guides — Power, Cooling, UPS, DG, Networking, Storage, Cloud. Real symptoms, root causes, step-by-step resolution, aur prevention. DC engineer ke liye field-ready reference.", url: "https://behindthetech.in/hi/study/troubleshooting" }),
};

export default function TroubleshootingPage() {
  return (
    <main data-homepage-theme="light" style={{ background: "#ffffff", minHeight: "100vh", paddingTop: "2.5rem" }}>
      <div style={{ maxWidth: "980px", margin: "0 auto", padding: "0 1.5rem 5rem" }}>
        <p style={{ fontSize: "0.8rem", color: "#94a3b8", marginBottom: "0.5rem", textTransform: "uppercase", letterSpacing: "0.1em", fontWeight: 700 }}>
          STUDY → Troubleshooting Guides
        </p>
        <h1 style={{ fontSize: "2.2rem", fontWeight: 800, color: "#111827", marginBottom: "0.5rem", letterSpacing: "-0.01em" }}>
          Data Center Troubleshooting Guides
        </h1>
        <p style={{ fontSize: "1.1rem", color: "#475569", marginBottom: "2rem", maxWidth: "700px" }}>
          {TROUBLESHOOTING_GUIDES.length} production-tested guides — real symptoms, verified steps, root causes, aur prevention. Search karo ya category filter use karo.
        </p>
        <TroubleshootingClient
          guides={TROUBLESHOOTING_GUIDES}
          categories={TROUBLESHOOTING_CATEGORIES}
        />
      </div>
    </main>
  );
}
