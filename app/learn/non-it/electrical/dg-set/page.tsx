// ─── TODO: Future articles ─────────────────────────────────────────────────────
// TODO: app/learn/non-it/electrical/ups/page.tsx
// TODO: app/learn/non-it/electrical/battery-bank/page.tsx
// TODO: app/learn/non-it/electrical/earthing/page.tsx
// ─────────────────────────────────────────────────────────────────────────────

import type { Metadata } from "next";
import Image from "next/image";
import ArticleLayout from "@/components/ArticleLayout";
import { type ArticleHeading } from "@/components/ArticlePage";
import TopicLink from "@/components/TopicLink";

// ─── Metadata ─────────────────────────────────────────────────────────────────

export const metadata: Metadata = {
  title: "DG Set in Data Centers — Behind The Tech",
  description:
    "What is a DG Set, AMF panel, sync room, PLC automation, fuel system, A/B/C/D maintenance, Tier III/IV — the complete engineer guide to Data Center backup power.",
  alternates: {
    canonical: "https://behindthetech.in/learn/non-it/electrical/dg-set",
    languages: {
      en: "https://behindthetech.in/learn/non-it/electrical/dg-set",
      hi: "https://behindthetech.in/hi/learn/non-it/electrical/dg-set",
      "x-default": "https://behindthetech.in/learn/non-it/electrical/dg-set",
    },
  },
};

// ─── TOC (QuickSummary + FAQ excluded) ────────────────────────────────────────

const HEADINGS: ArticleHeading[] = [
  { id: "what-is-dg-set",       text: "What Is a DG Set?",               level: 2 },
  { id: "why-required",         text: "Why Is DG Set Required?",         level: 2 },
  { id: "how-dg-works",         text: "How DG Set Works",                level: 2 },
  { id: "key-components",       text: "Key Components",                  level: 2 },
  { id: "amf-panel",            text: "AMF Panel",                       level: 2 },
  { id: "dg-sync-room",         text: "DG Sync Room",                    level: 2 },
  { id: "plc-automation",       text: "PLC Automation",                  level: 2 },
  { id: "load-calculation",     text: "Load Calculation",                level: 2 },
  { id: "fuel-system",          text: "Fuel System",                     level: 2 },
  { id: "lubrication-cooling",  text: "Lubrication & Cooling",           level: 2 },
  { id: "exhaust-system",       text: "Exhaust System",                  level: 2 },
  { id: "dg-room-design",       text: "DG Room Design",                  level: 2 },
  { id: "maintenance-abcd",     text: "Maintenance — A/B/C/D Checks",    level: 2 },
  { id: "safety-standards",     text: "Safety Standards",                level: 2 },
  { id: "scada-bms-monitoring", text: "SCADA & BMS Monitoring",          level: 2 },
  { id: "common-faults",        text: "Common Faults",                   level: 2 },
  { id: "troubleshooting",      text: "Troubleshooting",                 level: 2 },
  { id: "failure-scenario",     text: "Failure Scenario",                level: 2 },
  { id: "oems-vendors",         text: "OEMs & Vendors",                  level: 2 },
  { id: "tier-3-design",        text: "Tier III Design",                 level: 2 },
  { id: "tier-4-design",        text: "Tier IV Design",                  level: 2 },
  { id: "future-trends",        text: "Future Trends",                   level: 2 },
  { id: "key-takeaways",        text: "Key Takeaways",                   level: 2 },
];

// ─── Shared styles ────────────────────────────────────────────────────────────

const S = {
  h1: { fontFamily: "var(--font-display)", fontSize: "clamp(1.5rem,2.5vw,1.9rem)", letterSpacing: "0.04em", color: "#111827", lineHeight: 1.15, marginTop: 64, marginBottom: 16 } as React.CSSProperties,
  h2: { fontFamily: "var(--font-display)", fontSize: "clamp(1.2rem,2vw,1.5rem)", letterSpacing: "0.04em", color: "#111827", lineHeight: 1.2, marginTop: 56, marginBottom: 14 } as React.CSSProperties,
  h3: { fontFamily: "var(--font-body)", fontSize: "1rem", fontWeight: 600, color: "#111827", lineHeight: 1.3, marginTop: 28, marginBottom: 10 } as React.CSSProperties,
  p: { marginBottom: 16, color: "#1f2937" } as React.CSSProperties,
  ul: { paddingLeft: 20, marginBottom: 16, display: "flex", flexDirection: "column" as const, gap: 6 } as React.CSSProperties,
  li: { color: "#1f2937", lineHeight: 1.65 } as React.CSSProperties,
  divider: { border: "none", borderTop: "1px solid rgba(37,99,235,0.08)", margin: "12px 0" } as React.CSSProperties,
  learnMore: { margin: "10px 0 4px", display: "flex", alignItems: "center", flexWrap: "wrap" as const, gap: 6 } as React.CSSProperties,
  articleImage: { position: "relative", width: "100%", aspectRatio: "16 / 9", borderRadius: 10, overflow: "hidden", margin: 0, border: "1px solid rgba(37,99,235,0.12)" } as React.CSSProperties,
  imageFigure: { margin: "8px 0 24px" } as React.CSSProperties,
  imageCaption: { fontFamily: "var(--font-body)", fontSize: 12.5, color: "#1f2937", textAlign: "center" as const, marginTop: 8 } as React.CSSProperties,
  noteText: { fontFamily: "var(--font-body)", fontSize: 13, fontStyle: "italic" as const, color: "#1f2937", marginBottom: 16, lineHeight: 1.6 } as React.CSSProperties,
  cardWrap: { position: "relative" as const, borderRadius: 10, overflow: "hidden" as const, margin: "28px 0" } as React.CSSProperties,
  cardAccentBlue: { height: 2, background: "#2563EB" } as React.CSSProperties,
  cardBodyInsight: { background: "rgba(37,99,235,0.035)", border: "1px solid rgba(37,99,235,0.16)", borderTop: "none", padding: "18px 22px 20px" } as React.CSSProperties,
  cardLabel: { display: "block", fontFamily: "var(--font-mono)", fontSize: 9, letterSpacing: "0.22em", fontWeight: 600, marginBottom: 10 } as React.CSSProperties,
  cardContent: { fontFamily: "var(--font-body)", fontSize: 15, lineHeight: 1.7, color: "#1f2937" } as React.CSSProperties,
} as const;

// ─── QuickSummary ─────────────────────────────────────────────────────────────

function QuickSummary() {
  const pts = [
    { label: "What it is, in one line", text: "A DG Set is a backup power machine — when the grid fails, it generates electricity from a diesel engine so that the Data Center does not shut down." },
    { label: "Why in a Data Center", text: "UPS batteries run for only 10–15 minutes. In that time the DG starts and takes the full load — the Data Center keeps running continuously until the grid comes back." },
    { label: "What is inside", text: "Three main parts: Diesel Engine (mechanical power), Alternator (generates electricity), and AMF/Control Panel (automatic operation, protection, monitoring)." },
    { label: "How it is automatic", text: "The AMF Panel (Automatic Main Failure) detects grid failure, starts the engine, and transfers the load as soon as voltage is stable — without any operator, in 10–30 seconds." },
    { label: "How much fuel is needed", text: "Industry best practice: Tier III minimum 12 hours, Tier IV minimum 24–72 hours. Plan fuel storage — without diesel, the DG stops within a few hours." },
    { label: "What is different in Tier IV", text: "Tier IV is 2N — two completely independent DG systems. No shared components. If one fails, the other takes the full load — zero IT impact guaranteed." },
  ];
  return (
    <div style={{ position: "relative", borderRadius: 12, overflow: "hidden", margin: "8px 0 32px" }}>
      <div style={{ height: 2, background: "linear-gradient(90deg,#2563EB,#2563EB)" }} />
      <div style={{ background: "rgba(37,99,235,0.03)", border: "1px solid rgba(37,99,235,0.14)", borderTop: "none", padding: "20px 22px 22px" }}>
        <span style={{ display: "inline-flex", alignItems: "center", gap: 8, fontFamily: "var(--font-mono)", fontSize: 9, letterSpacing: "0.26em", color: "#2563EB", fontWeight: 600, marginBottom: 16 }}>⚡ QUICK SUMMARY — 2 MINUTE READ</span>
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          {pts.map((pt, i) => (
            <div key={i} style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
              <span style={{ flexShrink: 0, fontFamily: "var(--font-mono)", fontSize: 9, letterSpacing: "0.1em", textTransform: "uppercase", color: "#2563EB", paddingTop: 3, minWidth: 130 }}>{pt.label}</span>
              <span style={{ fontFamily: "var(--font-body)", fontSize: 14, lineHeight: 1.65, color: "#1f2937" }}>{pt.text}</span>
            </div>
          ))}
        </div>
        <div style={{ marginTop: 16, paddingTop: 14, borderTop: "1px solid rgba(37,99,235,0.08)", fontFamily: "var(--font-body)", fontSize: 13, color: "#1f2937" }}>
          If you have understood this much, the DG Set concept is clear. If you want to go deeper, the full article is below.
        </div>
      </div>
    </div>
  );
}

// ─── InsightCard ──────────────────────────────────────────────────────────────

function InsightCard({ children }: { children: React.ReactNode }) {
  return (
    <div style={S.cardWrap}>
      <div style={S.cardAccentBlue} />
      <div style={S.cardBodyInsight}>
        <span style={{ ...S.cardLabel, color: "#2563EB" }}>INSIGHT</span>
        <div style={S.cardContent}>{children}</div>
      </div>
    </div>
  );
}

// ─── EngineerTip ──────────────────────────────────────────────────────────────

function EngineerTip({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ position: "relative", borderRadius: 10, overflow: "hidden", margin: "20px 0 24px" }}>
      <div style={{ height: 2, background: "#ffa500", boxShadow: "0 0 8px rgba(255,165,0,0.4)" }} />
      <div style={{ background: "rgba(255,165,0,0.04)", border: "1px solid rgba(255,165,0,0.16)", borderTop: "none", padding: "16px 20px 18px" }}>
        <span style={{ display: "block", fontFamily: "var(--font-mono)", fontSize: 9, letterSpacing: "0.2em", textTransform: "uppercase", color: "#ffa500", fontWeight: 600, marginBottom: 9 }}>Engineer's Tip</span>
        <div style={{ fontFamily: "var(--font-body)", fontSize: 14, lineHeight: 1.65, color: "#1f2937" }}>{children}</div>
      </div>
    </div>
  );
}

// ─── WhyThisMatters ───────────────────────────────────────────────────────────

function WhyThisMatters({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ position: "relative", borderRadius: 10, overflow: "hidden", margin: "20px 0 24px" }}>
      <div style={{ height: 2, background: "#2563EB", boxShadow: "0 0 8px rgba(0,255,204,0.4)" }} />
      <div style={{ background: "rgba(0,255,204,0.04)", border: "1px solid rgba(0,255,204,0.18)", borderTop: "none", padding: "16px 20px 18px" }}>
        <span style={{ display: "block", fontFamily: "var(--font-mono)", fontSize: 9, letterSpacing: "0.2em", textTransform: "uppercase", color: "#2563EB", fontWeight: 600, marginBottom: 9 }}>Why This Matters In A Data Center</span>
        <div style={{ fontFamily: "var(--font-body)", fontSize: 14, lineHeight: 1.65, color: "#1f2937" }}>{children}</div>
      </div>
    </div>
  );
}

// ─── WhatYouAreLooking ────────────────────────────────────────────────────────

function WhatYouAreLooking({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ borderRadius: 8, background: "rgba(37,99,235,0.025)", border: "1px dashed rgba(37,99,235,0.2)", padding: "12px 16px", margin: "0 0 24px" }}>
      <span style={{ display: "block", fontFamily: "var(--font-mono)", fontSize: 8.5, letterSpacing: "0.18em", textTransform: "uppercase", color: "#2563EB", fontWeight: 600, marginBottom: 6 }}>What You Are Looking At</span>
      <div style={{ fontFamily: "var(--font-body)", fontSize: 13, lineHeight: 1.6, color: "#1f2937" }}>{children}</div>
    </div>
  );
}

// ─── DCMapNote ────────────────────────────────────────────────────────────────

function DCMapNote({ components }: { components: string[] }) {
  return (
    <div style={{ margin: "16px 0 24px" }}>
      <span style={{ display: "block", fontFamily: "var(--font-mono)", fontSize: 8.5, letterSpacing: "0.18em", textTransform: "uppercase", color: "#1f2937", marginBottom: 8 }}>On The Data Center Map</span>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
        {components.map((c) => (
          <span key={c} style={{ fontFamily: "var(--font-body)", fontSize: 12, padding: "4px 10px", borderRadius: 980, background: "rgba(37,99,235,0.05)", border: "1px solid rgba(37,99,235,0.16)", color: "#1f2937" }}>{c}</span>
        ))}
      </div>
    </div>
  );
}

// ─── KeyTakeawayCard ──────────────────────────────────────────────────────────

function KeyTakeawayCard({ items }: { items: string[] }) {
  return (
    <div style={{ position: "relative", borderRadius: 12, background: "linear-gradient(135deg,rgba(37,99,235,0.05),rgba(0,255,204,0.03))", border: "1px solid rgba(37,99,235,0.16)", overflow: "hidden", margin: "32px 0" }}>
      <div style={{ height: 2, background: "linear-gradient(90deg,#2563EB,#2563EB)" }} />
      <div style={{ padding: "22px 24px 24px" }}>
        <span style={{ display: "inline-block", fontFamily: "var(--font-mono)", fontSize: 9, letterSpacing: "0.26em", color: "#2563EB", fontWeight: 600, marginBottom: 16 }}>KEY TAKEAWAYS</span>
        <ul style={{ listStyle: "none", margin: 0, padding: 0, display: "flex", flexDirection: "column", gap: 12 }}>
          {items.map((item, i) => (
            <li key={i} style={{ display: "flex", alignItems: "flex-start", gap: 10 }}>
              <span style={{ flexShrink: 0, width: 18, height: 18, borderRadius: 4, background: "rgba(0,255,204,0.12)", border: "1px solid rgba(0,255,204,0.4)", display: "flex", alignItems: "center", justifyContent: "center", marginTop: 1 }}>
                <svg width="10" height="10" viewBox="0 0 24 24" fill="none"><path d="M4 13l5 5L20 6" stroke="#2563EB" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
              </span>
              <span style={{ fontFamily: "var(--font-body)", fontSize: 14.5, lineHeight: 1.6, color: "#1f2937" }}>{item}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

// ─── FlowDiagram ──────────────────────────────────────────────────────────────

function FlowDiagram({ caption, steps }: { caption: string; steps: { icon: string; label: string; sublabel?: string }[] }) {
  return (
    <figure style={{ margin: "20px 0 24px" }}>
      <div style={{ borderRadius: 10, background: "rgba(37,99,235,0.025)", border: "1px solid rgba(37,99,235,0.10)", padding: "22px 20px" }}>
        <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: 4, justifyContent: "center" }}>
          {steps.map((step, i) => (
            <div key={i} style={{ display: "flex", alignItems: "center" }}>
              <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 6, minWidth: 82, textAlign: "center" }}>
                <span style={{ width: 38, height: 38, borderRadius: "50%", background: "rgba(37,99,235,0.08)", border: "1px solid rgba(37,99,235,0.25)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 17 }}>{step.icon}</span>
                <span style={{ fontFamily: "var(--font-body)", fontSize: 11.5, fontWeight: 600, color: "#1f2937", lineHeight: 1.3 }}>{step.label}</span>
                {step.sublabel && <span style={{ fontFamily: "var(--font-mono)", fontSize: 9.5, color: "#1f2937" }}>{step.sublabel}</span>}
              </div>
              {i < steps.length - 1 && <span style={{ fontFamily: "var(--font-mono)", fontSize: 14, color: "#2563EB", margin: "0 4px", opacity: 0.7 }}>→</span>}
            </div>
          ))}
        </div>
      </div>
      <figcaption style={{ fontFamily: "var(--font-body)", fontSize: 12.5, color: "#1f2937", textAlign: "center", marginTop: 8 }}>{caption}</figcaption>
    </figure>
  );
}

// ─── ComparisonCard ───────────────────────────────────────────────────────────

function ComparisonCard({ tag, leftTitle, leftItems, rightTitle, rightItems }: {
  tag: string; leftTitle: string; leftItems: string[]; rightTitle: string; rightItems: string[];
}) {
  return (
    <div style={{ position: "relative", borderRadius: 10, background: "rgba(37,99,235,0.03)", border: "1px solid rgba(37,99,235,0.12)", overflow: "hidden", margin: "20px 0 32px" }}>
      <div style={{ height: 2, background: "#2563EB", opacity: 0.5 }} />
      <div style={{ padding: "20px 22px 22px" }}>
        <span style={{ display: "inline-block", fontFamily: "var(--font-mono)", fontSize: 9, letterSpacing: "0.2em", textTransform: "uppercase", color: "#2563EB", fontWeight: 600, marginBottom: 14 }}>{tag}</span>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
          <div>
            <span style={{ display: "block", fontFamily: "var(--font-mono)", fontSize: 9, letterSpacing: "0.1em", textTransform: "uppercase", color: "#2563EB", marginBottom: 8 }}>{leftTitle}</span>
            <ul style={{ listStyle: "none", margin: 0, padding: 0, display: "flex", flexDirection: "column", gap: 6 }}>
              {leftItems.map((a, i) => <li key={i} style={{ fontFamily: "var(--font-body)", fontSize: 13, lineHeight: 1.5, color: "#1f2937" }}>{a}</li>)}
            </ul>
          </div>
          <div>
            <span style={{ display: "block", fontFamily: "var(--font-mono)", fontSize: 9, letterSpacing: "0.1em", textTransform: "uppercase", color: "#2563EB", marginBottom: 8 }}>{rightTitle}</span>
            <ul style={{ listStyle: "none", margin: 0, padding: 0, display: "flex", flexDirection: "column", gap: 6 }}>
              {rightItems.map((d, i) => <li key={i} style={{ fontFamily: "var(--font-body)", fontSize: 13, lineHeight: 1.5, color: "#1f2937" }}>{d}</li>)}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── AMFProtectionTable ───────────────────────────────────────────────────────

const AMF_ROWS = [
  { protection: "Overcurrent",        detects: "Overload or short circuit on DG output" },
  { protection: "Earth Fault",        detects: "Ground fault on distribution system" },
  { protection: "Undervoltage",       detects: "Output voltage below set limit" },
  { protection: "Overvoltage",        detects: "AVR failure or voltage surge" },
  { protection: "Underfrequency",     detects: "Engine speed drop — overload or governor issue" },
  { protection: "Overfrequency",      detects: "Engine overspeed — governor failure" },
  { protection: "Reverse Power",      detects: "Generator is turning into a motor — dangerous" },
  { protection: "Loss of Excitation", detects: "AVR failure — alternator field loss" },
];

function AMFProtectionTable() {
  return (
    <div style={{ margin: "20px 0 28px", borderRadius: 10, border: "1px solid rgba(37,99,235,0.12)", overflow: "hidden" }}>
      <div style={{ overflowX: "auto" }}>
        <table style={{ width: "100%", borderCollapse: "collapse", minWidth: 480 }}>
          <thead>
            <tr style={{ background: "rgba(37,99,235,0.06)" }}>
              {["Protection", "What It Detects"].map((h) => (
                <th key={h} style={{ textAlign: "left", padding: "12px 16px", fontFamily: "var(--font-mono)", fontSize: 10.5, letterSpacing: "0.08em", textTransform: "uppercase", color: "#2563EB", borderBottom: "1px solid rgba(37,99,235,0.14)", whiteSpace: "nowrap" }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {AMF_ROWS.map((row, i) => (
              <tr key={row.protection} style={{ background: i % 2 === 0 ? "transparent" : "rgba(37,99,235,0.015)" }}>
                <td style={{ padding: "12px 16px", fontFamily: "var(--font-body)", fontSize: 13.5, fontWeight: 600, color: "#1f2937", borderBottom: "1px solid rgba(255,255,255,0.04)", whiteSpace: "nowrap" }}>{row.protection}</td>
                <td style={{ padding: "12px 16px", fontFamily: "var(--font-body)", fontSize: 13, color: "#1f2937", borderBottom: "1px solid rgba(255,255,255,0.04)" }}>{row.detects}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// ─── FuelConsumptionTable ─────────────────────────────────────────────────────

const FUEL_ROWS = [
  { rating: "500 kVA",  lph: "~110 L/hr",  hrs12: "~1,320 L",  hrs24: "~2,640 L",  hrs48: "~5,280 L"  },
  { rating: "750 kVA",  lph: "~165 L/hr",  hrs12: "~1,980 L",  hrs24: "~3,960 L",  hrs48: "~7,920 L"  },
  { rating: "1000 kVA", lph: "~220 L/hr",  hrs12: "~2,640 L",  hrs24: "~5,280 L",  hrs48: "~10,560 L" },
  { rating: "1500 kVA", lph: "~330 L/hr",  hrs12: "~3,960 L",  hrs24: "~7,920 L",  hrs48: "~15,840 L" },
  { rating: "2000 kVA", lph: "~440 L/hr",  hrs12: "~5,280 L",  hrs24: "~10,560 L", hrs48: "~21,120 L" },
  { rating: "2500 kVA", lph: "~550 L/hr",  hrs12: "~6,600 L",  hrs24: "~13,200 L", hrs48: "~26,400 L" },
];

function FuelConsumptionTable() {
  return (
    <div style={{ margin: "20px 0 28px", borderRadius: 10, border: "1px solid rgba(37,99,235,0.12)", overflow: "hidden" }}>
      <div style={{ overflowX: "auto" }}>
        <table style={{ width: "100%", borderCollapse: "collapse", minWidth: 560 }}>
          <thead>
            <tr style={{ background: "rgba(37,99,235,0.06)" }}>
              {["DG Rating", "Full Load L/hr", "12 Hours", "24 Hours", "48 Hours"].map((h) => (
                <th key={h} style={{ textAlign: "left", padding: "12px 16px", fontFamily: "var(--font-mono)", fontSize: 10.5, letterSpacing: "0.08em", textTransform: "uppercase", color: "#2563EB", borderBottom: "1px solid rgba(37,99,235,0.14)", whiteSpace: "nowrap" }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {FUEL_ROWS.map((row, i) => (
              <tr key={row.rating} style={{ background: i % 2 === 0 ? "transparent" : "rgba(37,99,235,0.015)" }}>
                <td style={{ padding: "12px 16px", fontFamily: "var(--font-body)", fontSize: 13.5, fontWeight: 600, color: "#1f2937", borderBottom: "1px solid rgba(255,255,255,0.04)", whiteSpace: "nowrap" }}>{row.rating}</td>
                <td style={{ padding: "12px 16px", fontFamily: "var(--font-body)", fontSize: 13, color: "#2563EB", borderBottom: "1px solid rgba(255,255,255,0.04)", whiteSpace: "nowrap" }}>{row.lph}</td>
                <td style={{ padding: "12px 16px", fontFamily: "var(--font-body)", fontSize: 13, color: "#1f2937", borderBottom: "1px solid rgba(255,255,255,0.04)" }}>{row.hrs12}</td>
                <td style={{ padding: "12px 16px", fontFamily: "var(--font-body)", fontSize: 13, color: "#1f2937", borderBottom: "1px solid rgba(255,255,255,0.04)" }}>{row.hrs24}</td>
                <td style={{ padding: "12px 16px", fontFamily: "var(--font-body)", fontSize: 13, color: "#1f2937", borderBottom: "1px solid rgba(255,255,255,0.04)" }}>{row.hrs48}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// ─── MaintenanceTable ─────────────────────────────────────────────────────────

const MAINT_ROWS = [
  { check: "A Check", freq: "Daily / Weekly", key: "Oil, coolant, fuel level. Belt visual. Exercise run. Smoke color check. No-alarm confirm." },
  { check: "B Check", freq: "Monthly / 250 hr", key: "Oil + filter change. Air filter. Battery test. Load test 30 min. Full AMF cycle test." },
  { check: "C Check", freq: "6-Monthly / 500–1000 hr", key: "Injector inspection. Turbocharger check. All protections test. Load bank 2 hrs. Fuel polishing run." },
  { check: "D Check", freq: "Annual / 2000–3000 hr", key: "Major engine service. Alternator overhaul. PLC update. Foundation bolts. Load bank 4+ hrs. Full test cert." },
];

function MaintenanceTable() {
  return (
    <div style={{ margin: "20px 0 28px", borderRadius: 10, border: "1px solid rgba(37,99,235,0.12)", overflow: "hidden" }}>
      <div style={{ overflowX: "auto" }}>
        <table style={{ width: "100%", borderCollapse: "collapse", minWidth: 520 }}>
          <thead>
            <tr style={{ background: "rgba(37,99,235,0.06)" }}>
              {["Check", "Frequency", "Key Activities"].map((h) => (
                <th key={h} style={{ textAlign: "left", padding: "12px 16px", fontFamily: "var(--font-mono)", fontSize: 10.5, letterSpacing: "0.08em", textTransform: "uppercase", color: "#2563EB", borderBottom: "1px solid rgba(37,99,235,0.14)", whiteSpace: "nowrap" }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {MAINT_ROWS.map((row, i) => (
              <tr key={row.check} style={{ background: i % 2 === 0 ? "transparent" : "rgba(37,99,235,0.015)" }}>
                <td style={{ padding: "12px 16px", fontFamily: "var(--font-body)", fontSize: 13.5, fontWeight: 600, color: "#2563EB", borderBottom: "1px solid rgba(255,255,255,0.04)", whiteSpace: "nowrap" }}>{row.check}</td>
                <td style={{ padding: "12px 16px", fontFamily: "var(--font-body)", fontSize: 13, color: "#1f2937", borderBottom: "1px solid rgba(255,255,255,0.04)", whiteSpace: "nowrap" }}>{row.freq}</td>
                <td style={{ padding: "12px 16px", fontFamily: "var(--font-body)", fontSize: 13, color: "#1f2937", borderBottom: "1px solid rgba(255,255,255,0.04)" }}>{row.key}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// ─── SCADATable ───────────────────────────────────────────────────────────────

const SCADA_ROWS = [
  { param: "Engine Oil Pressure",     type: "Analog + Digital", purpose: "Critical protection — low = automatic shutdown" },
  { param: "Coolant Temperature",     type: "Analog",           purpose: "Overheating protection" },
  { param: "Engine Speed / RPM",      type: "Analog",           purpose: "Overspeed protection, frequency confirm" },
  { param: "Output Voltage (3-ph)",   type: "Analog",           purpose: "Power quality monitoring" },
  { param: "Output Frequency",        type: "Analog",           purpose: "Stability — must be 50 Hz" },
  { param: "Output Current (3-ph)",   type: "Analog",           purpose: "Load monitoring" },
  { param: "Active Power (kW)",       type: "Analog",           purpose: "Load sharing between DGs" },
  { param: "Fuel Level — Day Tank",   type: "Analog",           purpose: "Immediate fuel monitoring" },
  { param: "Fuel Level — Main Tank",  type: "Analog",           purpose: "Replenishment alert" },
  { param: "Alternator Temperature",  type: "Analog",           purpose: "Winding health" },
  { param: "Battery Voltage",         type: "Analog",           purpose: "Start readiness" },
  { param: "DG Status",               type: "Digital",          purpose: "Running / Stop / Fault" },
  { param: "AMF Mode",                type: "Digital",          purpose: "Auto / Manual / Test" },
  { param: "ATS Position",            type: "Digital",          purpose: "Mains / DG" },
  { param: "Running Hours",           type: "Counter",          purpose: "Maintenance scheduling" },
];

function SCADATable() {
  return (
    <div style={{ margin: "20px 0 28px", borderRadius: 10, border: "1px solid rgba(37,99,235,0.12)", overflow: "hidden" }}>
      <div style={{ overflowX: "auto" }}>
        <table style={{ width: "100%", borderCollapse: "collapse", minWidth: 520 }}>
          <thead>
            <tr style={{ background: "rgba(37,99,235,0.06)" }}>
              {["Parameter", "Type", "Purpose"].map((h) => (
                <th key={h} style={{ textAlign: "left", padding: "12px 16px", fontFamily: "var(--font-mono)", fontSize: 10.5, letterSpacing: "0.08em", textTransform: "uppercase", color: "#2563EB", borderBottom: "1px solid rgba(37,99,235,0.14)", whiteSpace: "nowrap" }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {SCADA_ROWS.map((row, i) => (
              <tr key={row.param} style={{ background: i % 2 === 0 ? "transparent" : "rgba(37,99,235,0.015)" }}>
                <td style={{ padding: "12px 16px", fontFamily: "var(--font-body)", fontSize: 13, fontWeight: 600, color: "#1f2937", borderBottom: "1px solid rgba(255,255,255,0.04)", whiteSpace: "nowrap" }}>{row.param}</td>
                <td style={{ padding: "12px 16px", fontFamily: "var(--font-body)", fontSize: 12, color: "#2563EB", borderBottom: "1px solid rgba(255,255,255,0.04)", whiteSpace: "nowrap" }}>{row.type}</td>
                <td style={{ padding: "12px 16px", fontFamily: "var(--font-body)", fontSize: 13, color: "#1f2937", borderBottom: "1px solid rgba(255,255,255,0.04)" }}>{row.purpose}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// ─── OEMTable ─────────────────────────────────────────────────────────────────

const OEM_ROWS = [
  { component: "Engine",            oems: "Cummins, CAT (Caterpillar), Perkins, Volvo Penta, MTU (Rolls-Royce Power Systems)" },
  { component: "Alternator",        oems: "Stamford (Cummins Co.), Leroy Somer (Nidec), Mecc Alte, Marathon" },
  { component: "Complete DG Set",   oems: "Cummins India, KOEL (Kirloskar), Gmmco (CAT), Sudhir Gensets" },
  { component: "Indian OEMs",       oems: "KOEL, Ashok Leyland (LEYPOWER), Greaves Power, Mahindra Powerol" },
  { component: "AMF / Control",     oems: "DSE (Deep Sea Electronics), ComAp, Deif, Woodward" },
  { component: "Fuel Polishing",    oems: "Parker, Algae-X, KC International" },
  { component: "Load Banks",        oems: "Simplex, Crestchic, Avtron, Shorepower" },
];

function OEMTable() {
  return (
    <div style={{ margin: "20px 0 28px", borderRadius: 10, border: "1px solid rgba(37,99,235,0.12)", overflow: "hidden" }}>
      <div style={{ overflowX: "auto" }}>
        <table style={{ width: "100%", borderCollapse: "collapse", minWidth: 480 }}>
          <thead>
            <tr style={{ background: "rgba(37,99,235,0.06)" }}>
              {["Component", "Common OEMs"].map((h) => (
                <th key={h} style={{ textAlign: "left", padding: "12px 16px", fontFamily: "var(--font-mono)", fontSize: 10.5, letterSpacing: "0.08em", textTransform: "uppercase", color: "#2563EB", borderBottom: "1px solid rgba(37,99,235,0.14)", whiteSpace: "nowrap" }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {OEM_ROWS.map((row, i) => (
              <tr key={row.component} style={{ background: i % 2 === 0 ? "transparent" : "rgba(37,99,235,0.015)" }}>
                <td style={{ padding: "12px 16px", fontFamily: "var(--font-body)", fontSize: 13.5, fontWeight: 600, color: "#1f2937", borderBottom: "1px solid rgba(255,255,255,0.04)", whiteSpace: "nowrap" }}>{row.component}</td>
                <td style={{ padding: "12px 16px", fontFamily: "var(--font-body)", fontSize: 13, color: "#1f2937", borderBottom: "1px solid rgba(255,255,255,0.04)" }}>{row.oems}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// ─── ContinueLearning ─────────────────────────────────────────────────────────

function ContinueLearning() {
  const slugs = ["transformer", "ups", "battery-bank", "ht-yard", "rmu", "earthing"];
  return (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(220px,1fr))", gap: 12, margin: "20px 0 8px" }}>
      {slugs.map((slug) => <TopicLink key={slug} slug={slug} variant="card" />)}
    </div>
  );
}

// ─── PrevNextNav ──────────────────────────────────────────────────────────────
// prev: transformer (order 4) | curr: dg-set (order 5) | next: ups (order 6)

function PrevNextNav() {
  return (
    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, margin: "24px 0 8px" }}>
      <div style={{ borderRadius: 10, background: "rgba(37,99,235,0.03)", border: "1px solid rgba(37,99,235,0.12)", padding: "14px 16px" }}>
        <span style={{ display: "block", fontFamily: "var(--font-mono)", fontSize: 8.5, letterSpacing: "0.18em", textTransform: "uppercase", color: "#1f2937", marginBottom: 8 }}>← Previous</span>
        <TopicLink slug="transformer" label="Transformer" variant="inline" />
      </div>
      <div style={{ borderRadius: 10, background: "rgba(37,99,235,0.03)", border: "1px solid rgba(37,99,235,0.12)", padding: "14px 16px", textAlign: "right" }}>
        <span style={{ display: "block", fontFamily: "var(--font-mono)", fontSize: 8.5, letterSpacing: "0.18em", textTransform: "uppercase", color: "#1f2937", marginBottom: 8 }}>Next →</span>
        <TopicLink slug="ups" label="UPS System" variant="inline" />
      </div>
    </div>
  );
}

// ─── FAQ ──────────────────────────────────────────────────────────────────────

const FAQS = [
  { q: "What is the difference between a DG Set and a Generator?", a: "A generator is only the alternator — it produces electricity from mechanical energy. DG Set = Diesel Engine + Generator + Control Panel — a complete packaged backup power unit." },
  { q: "How many seconds does a DG Set take to start?", a: "The engine typically reaches rated speed and voltage in 10–20 seconds. Including load transfer, 15–30 seconds total. That is why a UPS battery is mandatory — to cover this gap." },
  { q: "Why does black smoke come out?", a: "From overloading, a rich fuel mixture, or a blocked air filter. A little black smoke is normal when load suddenly increases. Continuous black smoke = investigate — it could be an injector or air filter issue." },
  { q: "Why does a DG Set need a cooldown?", a: "At full load, engine parts stay very hot. If you suddenly remove the load and stop the engine — coolant circulation stops but the metal stays hot — heat soak happens, and cylinder head damage is possible. A 5–10 min no-load run lets the coolant cool the engine properly." },
  { q: "How long does fuel take to go bad?", a: "Un-polished diesel typically degrades in 6–12 months — bacteria, water contamination, sediment. With a fuel polishing system, quality can be maintained for 2–3 years. Stale fuel is a common root cause of DG start failure." },
  { q: "Why is the DG Set different in Tier IV?", a: "Tier IV must have zero shared components — two completely independent DG systems, independent sync panels, independent fuel storage, independent AMF panels. If one system fails, the other carries the full load with zero impact." },
];

function FAQSection() {
  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      {FAQS.map((item, i) => (
        <div key={i} style={{ padding: "18px 0", borderBottom: i === FAQS.length - 1 ? "none" : "1px solid rgba(37,99,235,0.08)" }}>
          <p style={{ fontFamily: "var(--font-body)", fontSize: 15, fontWeight: 600, color: "#1f2937", marginBottom: 8 }}>{item.q}</p>
          <p style={{ fontFamily: "var(--font-body)", fontSize: 14, lineHeight: 1.65, color: "#1f2937", margin: 0 }}>{item.a}</p>
        </div>
      ))}
    </div>
  );
}

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: FAQS.map((item) => ({ "@type": "Question", name: item.q, acceptedAnswer: { "@type": "Answer", text: item.a } })),
};

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function DgSetPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <ArticleLayout slug="dg-set" headings={HEADINGS} readingTimeMinutes={22} lang="en" alternateHref="/hi/learn/non-it/electrical/dg-set">

        {/* ── Hero ── */}
        <figure style={S.imageFigure}>
          <div style={S.articleImage}>
            <Image src="/images/articles/dg-set/dg-set-overview.svg" alt="Complete DG Set unit in Indian Data Center — engine, alternator, acoustic canopy, control panel" fill sizes="(max-width:768px) 100vw,740px" style={{ objectFit: "cover" }} unoptimized />
          </div>
          <figcaption style={S.imageCaption}>DG Set — the backup power backbone of the Data Center. When the grid fails, it takes the full load in 10–30 seconds.</figcaption>
        </figure>

        <WhatYouAreLooking>
          This is a complete DG Set unit — enclosed in an acoustic canopy. From outside it looks like a metal box; inside are the diesel engine and alternator. The exhaust silencer comes out from the top. The control panel is on the side.
        </WhatYouAreLooking>

        <QuickSummary />

        <hr style={S.divider} />

        {/* ── Intro ── */}
        <p style={S.p}>After the <TopicLink slug="transformer" label="Transformer" variant="inline" />, 433V LV power has reached the LVMDB. The <TopicLink slug="ups" label="UPS" variant="inline" /> has stored the power.</p>
        <p style={S.p}>Now the most important question: <strong>If the grid fails — at 2 AM, without warning — what happens?</strong></p>
        <p style={S.p}>The UPS battery runs for a few minutes. In that time, something is needed that can provide full power.</p>
        <p style={S.p}>That is exactly the job of — <strong>the DG Set (Diesel Generator Set).</strong></p>

        <hr style={S.divider} />

        {/* ── SECTION 1 ── */}
        <h2 id="what-is-dg-set" style={S.h1}>What Is a DG Set?</h2>

        <p style={S.p}><strong>DG Set = Diesel Generator Set.</strong> A complete packaged backup power unit with three main parts:</p>
        <ul style={S.ul}>
          <li style={S.li}><strong>Diesel Engine</strong> — burns fuel and produces mechanical energy</li>
          <li style={S.li}><strong>Alternator</strong> — converts mechanical energy into 3-phase AC electricity</li>
          <li style={S.li}><strong>Control Panel</strong> — AMF, protection, monitoring, PLC — all automation is here</li>
        </ul>
        <p style={S.p}><strong>Output:</strong> 3-phase AC, 415V/433V, 50 Hz — same as grid supply. IT equipment does not even know that the supply source has changed.</p>
        <p style={S.p}><strong>Speed:</strong> 1500 RPM at 50 Hz (4-pole alternator) — f = NP/120 = 1500×4/120 = 50 Hz.</p>

        <DCMapNote components={["DG Set", "AMF Panel", "ATS/ATSS", "Fuel Storage", "Sync Panel"]} />

        <hr style={S.divider} />

        {/* ── SECTION 2 ── */}
        <h2 id="why-required" style={S.h1}>Why Is DG Set Required?</h2>

        <p style={S.p}>Grid supply is reliable — but 100% uptime is not guaranteed. Utility failures, transformer faults, cable cuts, storms, planned maintenance — all are possible.</p>
        <p style={S.p}><strong>The limitation of UPS batteries:</strong> Typically 10–15 minutes. It only covers the time for the DG to start — not more than that.</p>

        <WhyThisMatters>
          Without a DG Set: UPS battery drain → servers shutdown → business impact → SLA breach → financial penalty. The DG Set prevents exactly this catastrophe. That is why no Data Center — from Tier II to Tier IV — operates without a DG Set.
        </WhyThisMatters>

        <InsightCard>
          <strong>The DG Set and UPS work like a team.</strong> The UPS is a bridge — it gives power immediately when the grid fails. The DG Set crosses that bridge and takes over as the permanent power. Each is incomplete without the other. A UPS without a DG is dead in 10–15 min. A DG without a UPS — servers crash in the gap while it starts.
        </InsightCard>

        <hr style={S.divider} />

        {/* ── SECTION 3 ── */}
        <h2 id="how-dg-works" style={S.h1}>How DG Set Works — Step by Step</h2>

        <FlowDiagram caption="Complete DG Set automatic start sequence — from grid failure to load transfer" steps={[
          { icon: "⚡", label: "Grid Fails" },
          { icon: "🔍", label: "AMF Detects", sublabel: "2–5 sec delay" },
          { icon: "🔑", label: "Start Signal" },
          { icon: "🔥", label: "Engine Fires" },
          { icon: "📈", label: "V+F Builds", sublabel: "10–20 sec" },
          { icon: "✅", label: "DG Ready" },
          { icon: "🔄", label: "Load Transfer" },
          { icon: "🏃", label: "DG Running" },
          { icon: "❄️", label: "Cooldown", sublabel: "5–10 min" },
        ]} />

        <h3 style={S.h3}>Step 1–2: Grid Failure Detection</h3>
        <p style={S.p}>The AMF Panel continuously monitors grid voltage and frequency. When a failure is detected, there is a 2–5 second settling delay — to filter out momentary dips.</p>

        <h3 style={S.h3}>Step 3–5: Engine Start and Build-up</h3>
        <p style={S.p}>The battery crank motor starts the engine. The engine fires and speed increases. The governor regulates frequency (50 Hz), the AVR regulates voltage (415/433V). Rated parameters typically stabilize in 10–20 seconds.</p>

        <h3 style={S.h3}>Step 6–7: Load Transfer</h3>
        <p style={S.p}>As soon as the DG "ready" status comes, the ATS opens the mains breaker and closes the DG breaker. The load transfers to the DG. The UPS current source changes — seamlessly.</p>

        <h3 style={S.h3}>Step 8: Running Mode</h3>
        <p style={S.p}>The DG runs at full load. Monitoring is continuous. It waits for grid restoration. When the grid comes back — confirm it is stable, then transfer the load back.</p>

        <h3 style={S.h3}>Step 9: Cooldown Run</h3>
        <p style={S.p}>After the load is removed, the DG runs at no-load for 5–10 minutes — this <strong>cooldown run</strong> is critical. Abruptly stopping a hot engine causes heat soak — cylinder head damage is possible. During cooldown, the coolant circulates properly and cools the engine.</p>

        <EngineerTip>
          Never skip the cooldown run — not even in an emergency. If the grid comes back and you stop the DG immediately, there is a risk of engine damage. Set the cooldown timer in the AMF Panel — the DG will stop automatically by itself after cooldown.
        </EngineerTip>

        <hr style={S.divider} />

        {/* ── SECTION 4 ── */}
        <h2 id="key-components" style={S.h1}>Key Components</h2>

        <figure style={S.imageFigure}>
          <div style={S.articleImage}>
            <Image src="/images/articles/dg-set/dg-engine-alternator.svg" alt="DG Set engine and alternator — labeled components, coupling, radiator, exhaust manifold" fill sizes="(max-width:768px) 100vw,740px" style={{ objectFit: "cover" }} unoptimized />
          </div>
          <figcaption style={S.imageCaption}>Diesel Engine and Alternator — the two main functional parts of a DG Set, mounted on a common baseframe.</figcaption>
        </figure>

        <WhatYouAreLooking>
          On the left is the diesel engine — turbocharger on top, exhaust manifold on the side, radiator fan visible. On the right is the alternator — winding housing, terminal box. Both are connected by a rigid coupling — the engine's rotation directly drives the alternator shaft.
        </WhatYouAreLooking>

        <h3 style={S.h3}>Diesel Engine</h3>
        <p style={S.p}>A turbocharged, water-cooled diesel engine burns fuel and produces mechanical power. It typically runs at 1500 RPM for 50 Hz.</p>
        <p style={S.p}><strong>Rating types — a wrong choice here can impact the Data Center:</strong></p>
        <ul style={S.ul}>
          <li style={S.li}><strong>ESP (Emergency Standby Power)</strong> — for emergency backup. Variable load. Limited overload as per OEM specification. Always use the ESP rating in Data Centers.</li>
          <li style={S.li}><strong>PRP (Prime Rating)</strong> — main power source for variable load applications. Used at remote sites.</li>
          <li style={S.li}><strong>COP (Continuous Power)</strong> — 24/7 continuous, no overload. Used in baseload applications.</li>
        </ul>

        <InsightCard>
          <strong>Always specify the DG Set at the ESP (Emergency Standby Power) rating in Data Centers.</strong> A DG specified at Prime or Continuous rating will have a higher output than ESP — you get more kVA in the same physical size — but that rating is not intended for emergency backup. Clearly confirm the rating with the OEM in the project spec.
        </InsightCard>

        <h3 style={S.h3}>Alternator (Generator)</h3>
        <p style={S.p}>It converts the engine's mechanical rotation into 3-phase AC electricity.</p>
        <ul style={S.ul}>
          <li style={S.li}><strong>AVR (Automatic Voltage Regulator)</strong> — keeps the output voltage stable during load changes</li>
          <li style={S.li}><strong>PMG (Permanent Magnet Generator)</strong> — gives self-excitation power to the AVR</li>
          <li style={S.li}><strong>IP Rating:</strong> Minimum IP23 indoor, IP44 outdoor</li>
        </ul>

        <hr style={S.divider} />

        {/* ── SECTION 5 ── */}
        <h2 id="amf-panel" style={S.h1}>AMF Panel</h2>

        <figure style={S.imageFigure}>
          <div style={S.articleImage}>
            <Image src="/images/articles/dg-set/amf-panel-control.svg" alt="AMF panel interior showing DSE or ComAp controller, protection relays, circuit breakers, indicators" fill sizes="(max-width:768px) 100vw,740px" style={{ objectFit: "cover" }} unoptimized />
          </div>
          <figcaption style={S.imageCaption}>AMF Panel interior — controller (DSE/ComAp), protection relays, breakers, alarm annunciator. The brain of the DG Set.</figcaption>
        </figure>

        <WhatYouAreLooking>
          This is the interior of an AMF panel. At the top is the controller with an LCD display (DSE or ComAp) — that is the main brain. Below are breakers, protection relays and terminal blocks. Indicator lights show alarm states.
        </WhatYouAreLooking>

        <p style={S.p}>The AMF Panel (Automatic Main Failure Panel) is the brain of the DG Set. It detects grid failure, controls the engine start sequence, monitors DG parameters and gives commands to the ATS.</p>

        <h3 style={S.h3}>AMF Protection Functions</h3>
        <AMFProtectionTable />

        <WhyThisMatters>
          Reverse Power protection is very important. If the DG breaker is closed and the engine unexpectedly stops — the alternator starts being driven by the grid or another DG — "motoring" mode. This can damage the alternator and create a dangerous situation. The reverse power relay detects this condition immediately and opens the DG breaker.
        </WhyThisMatters>

        <hr style={S.divider} />

        {/* ── SECTION 6 ── */}
        <h2 id="dg-sync-room" style={S.h1}>DG Sync Room — Parallel Operation</h2>

        <figure style={S.imageFigure}>
          <div style={S.articleImage}>
            <Image src="/images/articles/dg-set/sync-room-paralleling.svg" alt="DG synchronizing panel room — multiple DGs connected to common bus, auto synchronizer, load sharing" fill sizes="(max-width:768px) 100vw,740px" style={{ objectFit: "cover" }} unoptimized />
          </div>
          <figcaption style={S.imageCaption}>DG Sync Room — multiple DGs run in parallel on a common bus. Load sharing, auto synchronizing and protection are all managed here.</figcaption>
        </figure>

        <p style={S.p}>To run multiple DG sets in parallel, there is a dedicated <strong>DG Synchronizing Room</strong>. Multiple smaller DGs are more reliable than one big DG — if one fails, the rest keep running.</p>

        <h3 style={S.h3}>Synchronizing — Why Is It Necessary?</h3>
        <p style={S.p}>To connect two electricity sources in parallel, the parameters must match exactly. If they do not match and the breaker is closed — <strong>circulating current, mechanical shock, equipment damage.</strong></p>

        <ComparisonCard
          tag="Synchronizing Parameters — Data Center Standard"
          leftTitle="Parameter"
          leftItems={["Voltage", "Frequency", "Phase Angle", "Phase Sequence"]}
          rightTitle="Required Match"
          rightItems={["±1% (conservative for DC)", "±0.2 Hz", "±10°", "RYB = RYB (exactly same)"]}
        />

        <h3 style={S.h3}>Auto Synchronizer (PLC Based)</h3>
        <p style={S.p}>Modern Data Centers do not use a manual synchroscope — they have a PLC-based auto synchronizer. The PLC continuously compares voltage, frequency and phase angle. As soon as they are within tolerance, it closes the breaker automatically.</p>
        <p style={S.p}>The human operator only "arms" it — the PLC does the closing. Human error is eliminated.</p>

        <h3 style={S.h3}>Load Sharing — Isochronous vs Droop</h3>

        <ComparisonCard
          tag="Load Sharing Methods"
          leftTitle="Isochronous (Preferred in Data Centers)"
          leftItems={["Maintains exactly 50.00 Hz", "Master controller manages load share", "Tight frequency — better for IT equipment", "Standard in modern PLC systems"]}
          rightTitle="Droop Mode (Older systems)"
          rightItems={["Frequency slightly droops under load", "DGs naturally balance themselves", "Simple, no master controller needed", "In older/simpler parallel systems"]}
        />

        <hr style={S.divider} />

        {/* ── SECTION 7 ── */}
        <h2 id="plc-automation" style={S.h1}>PLC Automation</h2>

        <p style={S.p}>Modern Data Center DG Sets are fully PLC controlled — no manual intervention is required in normal operation.</p>

        <h3 style={S.h3}>PLC Auto Start Sequence Logic</h3>
        <FlowDiagram caption="PLC controlled DG start sequence — from grid failure to service restore" steps={[
          { icon: "⚠️", label: "Grid Failure", sublabel: "AMF detects" },
          { icon: "⏱️", label: "Settling Delay", sublabel: "2–5 sec" },
          { icon: "🔄", label: "Crank Attempt 1" },
          { icon: "📊", label: "Monitor V+F" },
          { icon: "🔁", label: "Sync Logic" },
          { icon: "⚙️", label: "Breaker Close" },
          { icon: "📡", label: "SCADA Alert" },
        ]} />

        <p style={S.p}>The PLC makes 3 crank attempts. If the engine does not run even after three attempts — a <strong>Start Failure Alarm</strong> is generated and the next available DG is attempted.</p>

        <h3 style={S.h3}>Load Management</h3>
        <p style={S.p}>It measures real-time kW per DG. It runs the load sharing algorithm. When load increases it automatically adds an additional DG, and when load decreases it sheds one. It optimizes efficiency — more DGs at full load, fewer at light load.</p>

        <h3 style={S.h3}>Event Logging</h3>
        <p style={S.p}>Start/stop timestamps, fault history, running hours, fuel consumption — all are stored in the PLC. It syncs with SCADA/BMS through Modbus or BACnet. Email/SMS alerts can be configured.</p>

        <hr style={S.divider} />

        {/* ── SECTION 8 ── */}
        <h2 id="load-calculation" style={S.h1}>Load Calculation</h2>

        <h3 style={S.h3}>Basic Sizing</h3>
        <p style={S.p}>Follow this formula:</p>
        <ul style={S.ul}>
          <li style={S.li}>Total IT Load + Non-IT Load (cooling, lighting, misc) = Total Facility Load</li>
          <li style={S.li}>Add future growth (typically 20–25%)</li>
          <li style={S.li}>Required kVA = Total kW ÷ Power Factor (typically 0.8)</li>
          <li style={S.li}>Select the next standard rating</li>
        </ul>

        <InsightCard>
          <strong>Example:</strong> IT Load 1000 kW + Cooling 400 kW = 1400 kW. Future growth 20% = 280 kW. Design Load = 1680 kW. At 0.8 PF: 1680 ÷ 0.8 = 2100 kVA. Select 2250 kVA DG Set (standard rating).
        </InsightCard>

        <h3 style={S.h3}>Derating Factors — Essential in India</h3>
        <ul style={S.ul}>
          <li style={S.li}><strong>High Ambient Temperature:</strong> In 45°C+ summers, DG output is derated. Check the OEM derating chart.</li>
          <li style={S.li}><strong>Altitude:</strong> At high altitude sites, air density is lower — engine output is lower. Apply derating above 1000m.</li>
          <li style={S.li}><strong>Harmonics:</strong> UPS loads generate high harmonics — typically apply 15–20% derating. Use a K-rated DG or harmonic filter.</li>
          <li style={S.li}><strong>Starting Current:</strong> Large motors (AHUs, chillers) draw high current while starting — the DG can be momentarily overloaded. Stagger the starting sequence.</li>
        </ul>

        <hr style={S.divider} />

        {/* ── SECTION 9 ── */}
        <h2 id="fuel-system" style={S.h1}>Fuel System</h2>

        <figure style={S.imageFigure}>
          <div style={S.articleImage}>
            <Image src="/images/articles/dg-set/fuel-system-day-tank.svg" alt="DG Set day tank with fuel transfer pump, level gauge, bund wall in Indian Data Center" fill sizes="(max-width:768px) 100vw,740px" style={{ objectFit: "cover" }} unoptimized />
          </div>
          <figcaption style={S.imageCaption}>Day Tank — a small service tank near the DG. The fuel transfer pump keeps filling it automatically from the main tank.</figcaption>
        </figure>

        <WhatYouAreLooking>
          This is a day tank installation — typically a steel tank of 500L to 2000L capacity. Fuel level gauge on the side, outlet pipe at the bottom going into the DG's fuel line. There is a concrete bund around the tank — for spill containment. The fuel transfer pump is connected with the pipe.
        </WhatYouAreLooking>

        <h3 style={S.h3}>Day Tank (Service Tank)</h3>
        <p style={S.p}>A small tank near the DG — the DG takes fuel directly from it. The fuel transfer pump automatically keeps refilling it from the main tank when the level drops. It ensures a stable, nearby fuel supply.</p>

        <figure style={S.imageFigure}>
          <div style={S.articleImage}>
            <Image src="/images/articles/dg-set/underground-fuel-tank.svg" alt="Underground diesel storage tank with vent pipes, fill point, overfill protection at Indian facility" fill sizes="(max-width:768px) 100vw,740px" style={{ objectFit: "cover" }} unoptimized />
          </div>
          <figcaption style={S.imageCaption}>Underground fuel storage tank — UST preferred for fire safety. Vent pipes, fill point, level sensor visible above ground.</figcaption>
        </figure>

        <h3 style={S.h3}>Main Storage Tank</h3>
        <p style={S.p}><strong>UST (Underground Storage Tank)</strong> — preferred for fire safety, space saving, temperature stability.</p>
        <p style={S.p}><strong>AST (Above-Ground Storage Tank)</strong> — easier inspection, maintenance, but higher fire risk, needs larger bund.</p>

        <h3 style={S.h3}>Fuel Storage — How Much Is Needed?</h3>
        <p style={S.p}><em>Note: This is industry best practice — fuel duration is not specified in the Uptime Institute Tier definitions.</em></p>

        <FuelConsumptionTable />

        <h3 style={S.h3}>Fuel Polishing System</h3>
        <p style={S.p}>Diesel degrades in long-term storage — bacteria, water contamination, sediment, wax formation.</p>
        <p style={S.p}>A Fuel Polisher draws diesel from the tank, passes it through fine filters + a water separator, and returns clean diesel — continuously or periodically.</p>

        <EngineerTip>
          Stale fuel is the most common root cause of DG start failure in Data Centers. A fuel polishing system is mandatory — also do a quarterly fuel quality test (water content, sediment, bacteria). Diesel stored for more than 6 months without polishing is at risk.
        </EngineerTip>

        <h3 style={S.h3}>PESO License — Diesel Storage</h3>
        <p style={S.p}>Diesel (HSD — High Speed Diesel) in India is <strong>Class C petroleum</strong> (flash point above 65°C) — not Class A. Class A is petrol/gasoline.</p>
        <p style={S.p}>Under the Petroleum Act 1934 and Petroleum Rules 2002: storage above prescribed limits requires a license from <strong>PESO (Petroleum and Explosives Safety Organisation)</strong>. Confirm the exact thresholds and requirements with the local PESO office — there can be state-wise variation.</p>

        <h3 style={S.h3}>Spill Containment</h3>
        <p style={S.p}>Concrete bund around the tank (110% of tank capacity), impervious lining, drainage valve (normally closed), spill kit nearby. Follow IS 1115 and MOEF guidelines.</p>

        <hr style={S.divider} />

        {/* ── SECTION 10 ── */}
        <h2 id="lubrication-cooling" style={S.h1}>Lubrication & Cooling</h2>

        <h3 style={S.h3}>Lubrication Oil System</h3>
        <p style={S.p}>Engine oil is stored in the sump. The oil pump circulates it continuously. The oil filter removes particles. The oil cooler controls temperature.</p>
        <p style={S.p}><strong>Oil Grade:</strong> As per OEM specification — typically 15W-40 CI-4 or 10W-40 in modern engines.</p>
        <p style={S.p}><strong>Low Oil Pressure Shutdown:</strong> Critical protection — if oil pressure falls below minimum, the engine shuts down automatically. <strong>Never bypass this protection</strong> — the engine can seize.</p>
        <p style={S.p}><strong>Oil Analysis:</strong> Send an oil sample to the lab — it identifies metal particles, contamination and viscosity degradation. Like transformer DGA — oil analysis predicts engine wear before failure.</p>

        <h3 style={S.h3}>Cooling System</h3>
        <p style={S.p}>Engine coolant → radiator → fan cools → back to engine. Ethylene glycol + water (50:50) with corrosion inhibitor. Remote radiator option: on the roof or outside, connected with hoses — preferred in DG rooms with acoustic canopies.</p>
        <p style={S.p}><strong>High Coolant Temperature Protection:</strong> Engine overheating → alarm → shutdown. Daily coolant level check mandatory.</p>

        <hr style={S.divider} />

        {/* ── SECTION 11 ── */}
        <h2 id="exhaust-system" style={S.h1}>Exhaust System</h2>

        <figure style={S.imageFigure}>
          <div style={S.articleImage}>
            <Image src="/images/articles/dg-set/dg-exhaust-stack.svg" alt="DG exhaust system — silencer, flexible bellows connector, vertical exhaust stack with rain cowl" fill sizes="(max-width:768px) 100vw,740px" style={{ objectFit: "cover" }} unoptimized />
          </div>
          <figcaption style={S.imageCaption}>Exhaust system — silencer (sound dampening), flexible bellows (vibration isolation), vertical stack with rain cowl.</figcaption>
        </figure>

        <WhatYouAreLooking>
          Hot gases come out of the exhaust manifold. Flexible bellows absorb vibration (the engine vibrates — a rigid connection would damage the stack). The silencer/muffler reduces sound. The vertical stack releases exhaust from the top — its height is calculated with the CPCB formula.
        </WhatYouAreLooking>

        <h3 style={S.h3}>CPCB Stack Height Formula</h3>
        <p style={S.p}>Central Pollution Control Board mandatory formula:</p>
        <p style={S.p}><strong>H = h + 0.2 × √kVA</strong></p>
        <p style={S.p}>Where H = stack height (meters), h = DG building height (meters).</p>
        <p style={S.p}><strong>Example:</strong> 500 kVA DG, 5 meter building: H = 5 + 0.2 × √500 = 5 + 4.5 = <strong>9.5 meters minimum.</strong></p>
        <p style={S.p}>CPCB emission norms (current applicable notification), acoustic standards (≤75 dB(A) at 1 meter from canopy), and a CPCB compliance plate on the DG set — all are mandatory in India.</p>

        <hr style={S.divider} />

        {/* ── SECTION 12 ── */}
        <h2 id="dg-room-design" style={S.h1}>DG Room Design</h2>

        <p style={S.p}>Following NBC 2016, CPCB guidelines and fire safety codes is mandatory in DG room design.</p>
        <ul style={S.ul}>
          <li style={S.li}><strong>Location:</strong> Ground floor preferred (heavy equipment), away from occupied areas</li>
          <li style={S.li}><strong>Structure:</strong> RCC floor, anti-vibration mounting pads, minimum 600mm clearance all sides, overhead lifting beam</li>
          <li style={S.li}><strong>Fire Safety:</strong> 2-hour fire-rated walls, self-closing fire-rated doors. FM200 or Novec 1230 preferred (CO₂ can damage the alternator — avoid it)</li>
          <li style={S.li}><strong>Ventilation:</strong> 25–30 air changes/hour. Combustion air inlet (lower), radiator heat exhaust (upper). Motorized dampers.</li>
          <li style={S.li}><strong>Acoustic:</strong> Acoustic doors and panels, flexible exhaust connections, anti-vibration mounts. Target: &lt;85 dB outside DG room</li>
          <li style={S.li}><strong>Fuel Room:</strong> A separate 1-hour fire-rated compartment for the day tank</li>
        </ul>

        <hr style={S.divider} />

        {/* ── SECTION 13 ── */}
        <h2 id="maintenance-abcd" style={S.h1}>Maintenance — A/B/C/D Checks</h2>

        <p style={S.p}>DG Set maintenance is a formal documented process. Based on running hours and calendar time — whichever comes first.</p>

        <MaintenanceTable />

        {/* A Check */}
        <figure style={S.imageFigure}>
          <div style={S.articleImage}>
            <Image src="/images/articles/dg-set/dg-maintenance-check.svg" alt="Technician performing DG Set inspection — checking oil level, belt condition, control panel" fill sizes="(max-width:768px) 100vw,740px" style={{ objectFit: "cover" }} unoptimized />
          </div>
          <figcaption style={S.imageCaption}>A Check — daily/weekly inspection. Oil level, coolant, fuel, belt, alarms — everything is checked.</figcaption>
        </figure>

        <h3 style={S.h3}>A Check — Daily / Weekly</h3>
        <ul style={S.ul}>
          <li style={S.li}>Engine oil level (dipstick), coolant level, fuel level (day tank + main tank)</li>
          <li style={S.li}>Belt visual — cracks, fraying, tension</li>
          <li style={S.li}>Battery condition — visual, terminal clean</li>
          <li style={S.li}>Exhaust smoke color: <strong>Black</strong> = rich mixture/overload, <strong>White</strong> = coolant leak, <strong>Blue</strong> = oil burning</li>
          <li style={S.li}>Leaks check: oil, coolant, fuel</li>
          <li style={S.li}>Control panel: no alarms, all indicators normal</li>
          <li style={S.li}>Weekly: 5–10 minutes no-load exercise run + sound check</li>
        </ul>

        <h3 style={S.h3}>B Check — Monthly / 250 Hours</h3>
        <ul style={S.ul}>
          <li style={S.li}>Engine oil change + new oil filter</li>
          <li style={S.li}>Fuel pre-filter and main filter replacement (if due)</li>
          <li style={S.li}>Air filter cleaning or replacement</li>
          <li style={S.li}>Battery capacity test</li>
          <li style={S.li}>Alternator IR test (Megger)</li>
          <li style={S.li}>AMF panel lamp test, simulate all alarms</li>
          <li style={S.li}><strong>Full AMF cycle test — monthly mandatory:</strong> Grid failure simulate, DG auto start, load transfer, mains restore, cooldown verify</li>
          <li style={S.li}>Load test: minimum 30 minutes at 50–75% rated load</li>
        </ul>

        <h3 style={S.h3}>C Check — 6-Monthly / 500–1000 Hours</h3>
        <ul style={S.ul}>
          <li style={S.li}>Complete oil change + all filters replacement</li>
          <li style={S.li}>Coolant flush and fresh fill with inhibitor</li>
          <li style={S.li}>V-belt set replacement</li>
          <li style={S.li}>Injector inspection (remove, inspect, clean — calibration at D check)</li>
          <li style={S.li}>Turbocharger inspection — bearing clearance, shaft play, blade condition</li>
          <li style={S.li}>Verify AVR and Governor calibration</li>
          <li style={S.li}>Complete protection testing: low oil pressure, high temp, overspeed, underspeed, overcurrent, earth fault, reverse power — simulate all of them</li>
          <li style={S.li}>Fuel polishing run + fuel quality test</li>
          <li style={S.li}><strong>Load bank test: 2 hours minimum.</strong> Step loading: 25% → 50% → 75% → 100%</li>
        </ul>

        <h3 style={S.h3}>D Check — Annual / 2000–3000 Hours</h3>
        <ul style={S.ul}>
          <li style={S.li}>Engine major service: cylinder head inspection, valve clearance, injector calibration on test bench, fuel injection pump calibration</li>
          <li style={S.li}>Turbocharger complete overhaul — bearings, seals replace</li>
          <li style={S.li}>Alternator: complete winding test, polarization index test, bearing replacement, AVR calibration</li>
          <li style={S.li}>PLC firmware update (if available from OEM)</li>
          <li style={S.li}>All sensor calibrations: temperature, pressure, level</li>
          <li style={S.li}>Battery replacement (mandatory at D check)</li>
          <li style={S.li}>Foundation bolt torque check (OEM specified values)</li>
          <li style={S.li}>Anti-vibration mount condition</li>
          <li style={S.li}>Fuel tank interior inspection (drain, enter, inspect coating)</li>
          <li style={S.li}><strong>Load bank test: 4+ hours at full rated load.</strong> Complete acceptance test — same as commissioning. Performance certificate from licensed agency.</li>
        </ul>

        <figure style={S.imageFigure}>
          <div style={S.articleImage}>
            <Image src="/images/articles/dg-set/load-bank-testing.svg" alt="Portable load bank connected to DG Set for capacity testing — Indian Data Center facility" fill sizes="(max-width:768px) 100vw,740px" style={{ objectFit: "cover" }} unoptimized />
          </div>
          <figcaption style={S.imageCaption}>Load Bank Testing — a resistive load bank connects to the DG. A 2-hour full load test at C check and 4+ hours at D check are mandatory.</figcaption>
        </figure>

        <EngineerTip>
          A load bank test is not only for verifying kVA. Engine performance, cooling capacity, governor response, AVR stability, fuel consumption — all are tested together. A quarterly load bank test is recommended even if only annual is mandatory.
        </EngineerTip>

        <hr style={S.divider} />

        {/* ── SECTION 14 ── */}
        <h2 id="safety-standards" style={S.h1}>Safety Standards (India)</h2>

        <ul style={S.ul}>
          <li style={S.li}><strong>IS 10000</strong> — DG Set testing and installation</li>
          <li style={S.li}><strong>IS 4722</strong> — Rotating electrical machines</li>
          <li style={S.li}><strong>IS 1460</strong> — HSD (High Speed Diesel) quality standard</li>
          <li style={S.li}><strong>IS 1115</strong> — Petroleum storage</li>
          <li style={S.li}><strong>NBC 2016</strong> — National Building Code, DG room design</li>
          <li style={S.li}><strong>CPCB norms</strong> — Emission standards, acoustic standards, CPCB plate mandatory on DG</li>
          <li style={S.li}><strong>CEA Technical Standards</strong> — Captive generation requirements</li>
          <li style={S.li}><strong>Petroleum Act 1934 + Petroleum Rules 2002</strong> — Fuel storage compliance, PESO license</li>
        </ul>

        <p style={S.p}><strong>Arc Flash:</strong> Full arc flash PPE is mandatory while working on DG output terminals — HRC suit, face shield, insulated gloves.</p>
        <p style={S.p}><strong>Before Any Work:</strong> PTW mandatory. Stop the DG manually, keep the AMF in manual mode, disconnect the battery, complete LOTO. The exhaust contains toxic gases — ventilate before going near the exhaust.</p>
        <p style={S.p}><strong>Fire:</strong> Do not keep a CO₂ extinguisher in the DG room (alternator damage). Use dry powder or an FM200/Novec system.</p>

        <hr style={S.divider} />

        {/* ── SECTION 15 ── */}
        <h2 id="scada-bms-monitoring" style={S.h1}>SCADA & BMS Monitoring</h2>

        <SCADATable />

        <h3 style={S.h3}>Alarm Hierarchy</h3>
        <ul style={S.ul}>
          <li style={S.li}><strong>Level 1 — Shutdown (Immediate):</strong> Low oil pressure, overspeed, high coolant temperature, overcurrent trip</li>
          <li style={S.li}><strong>Level 2 — Warning (Investigate):</strong> Low fuel, high alternator temperature, battery charger fault, coolant level low</li>
          <li style={S.li}><strong>Level 3 — Indication (Information):</strong> DG running, load transfer occurred, exercise complete</li>
        </ul>

        <hr style={S.divider} />

        {/* ── SECTION 16 ── */}
        <h2 id="common-faults" style={S.h1}>Common Faults</h2>

        <p style={S.p}><strong>DG Fails to Start:</strong> Dead/weak battery (most common). Stale or contaminated fuel. Air lock in fuel system. Excessive crank time without firing.</p>
        <p style={S.p}><strong>Starts But Trips Immediately:</strong> Low oil pressure (real or sensor fault). Overcrank lockout (too many attempts). Control panel wiring fault.</p>
        <p style={S.p}><strong>High Coolant Temperature:</strong> Low coolant level. Radiator blockage. Fan belt failure. Coolant pump failure. DG overloaded.</p>
        <p style={S.p}><strong>Voltage Unstable:</strong> AVR failure. PMG fault. Loose alternator connections. Governor hunting (frequency oscillating).</p>
        <p style={S.p}><strong>Black Smoke:</strong> Overloading. Poor fuel. Blocked air filter. Injector issue.</p>
        <p style={S.p}><strong>White Smoke:</strong> Coolant entering combustion — head gasket failure. Serious fault.</p>
        <p style={S.p}><strong>Excessive Oil Consumption:</strong> Worn piston rings. Valve stem seals.</p>

        <hr style={S.divider} />

        {/* ── SECTION 17 ── */}
        <h2 id="troubleshooting" style={S.h1}>Troubleshooting</h2>

        <FlowDiagram caption="DG fails to start — step-by-step troubleshooting" steps={[
          { icon: "❌", label: "No Start" },
          { icon: "🔋", label: "Battery Check", sublabel: "Voltage OK?" },
          { icon: "⛽", label: "Fuel Check", sublabel: "Level + quality" },
          { icon: "🌬️", label: "Air System", sublabel: "Filter OK?" },
          { icon: "🔧", label: "Manual Crank", sublabel: "Engine turns?" },
          { icon: "📞", label: "OEM Support" },
        ]} />

        <p style={S.p}><strong>High Temperature Alarm:</strong> Load check → Cooling fans running → Coolant level → Radiator blockage → Overload check.</p>
        <p style={S.p}><strong>Voltage Unstable:</strong> AVR connections check → PMG output check → Governor stability → Load harmonics measure.</p>
        <p style={S.p}><strong>Fuel Level Drop Fast:</strong> External leakage → Internal leakage (injector) → Fuel consumption log vs actual compare.</p>

        <hr style={S.divider} />

        {/* ── SECTION 18 ── */}
        <h2 id="failure-scenario" style={S.h1}>Real Failure Scenario</h2>

        <p style={S.p}>2 AM — grid outage. DG A started. DG B failed to start.</p>

        <FlowDiagram caption="3 AM grid failure — DG B start failure + recovery" steps={[
          { icon: "🌙", label: "Grid Fails", sublabel: "2 AM" },
          { icon: "✅", label: "DG A Starts" },
          { icon: "❌", label: "DG B Fails", sublabel: "Battery dead" },
          { icon: "🔋", label: "UPS Battery", sublabel: "Supports load" },
          { icon: "🔧", label: "Engineer Fix", sublabel: "Jump start" },
          { icon: "✅", label: "DG B Online" },
          { icon: "🌅", label: "Grid Restore", sublabel: "4 AM" },
        ]} />

        <p style={S.p}>The investigation found: DG B's battery charger had been faulty for 3 months. The alarm had been acknowledged — no work order had been created.</p>
        <p style={S.p}>The UPS battery supported the load until an engineer started DG B manually. Total exposure: 8 minutes on battery — uncomfortable but manageable.</p>

        <WhyThisMatters>
          In this failure, the battery charger fault was the root cause — there was no issue with the DG engine. That is why the battery charger test and battery capacity test are mandatory in the B check. Alarm acknowledge ≠ Alarm resolve — that is the most important lesson of DG Set maintenance.
        </WhyThisMatters>

        <hr style={S.divider} />

        {/* ── SECTION 19 ── */}
        <h2 id="oems-vendors" style={S.h1}>OEMs & Vendors</h2>

        <OEMTable />

        <p style={S.noteText}>In Data Centers, Cummins and CAT are the most common — because of their global service network, parts availability and Data Center references. KOEL has a strong presence in the Indian market and is used in many large facilities.</p>

        <hr style={S.divider} />

        {/* ── SECTION 20 ── */}
        <h2 id="tier-3-design" style={S.h1}>Tier III Design</h2>

        <figure style={S.imageFigure}>
          <div style={S.articleImage}>
            <Image src="/images/articles/dg-set/tier3-dg-room.svg" alt="Tier III Data Center DG room — multiple DG sets in row, sync panel, common bus" fill sizes="(max-width:768px) 100vw,740px" style={{ objectFit: "cover" }} unoptimized />
          </div>
          <figcaption style={S.imageCaption}>Tier III DG Room — N+1 DG sets, common sync panel, load sharing. Maintain one, the rest keep running.</figcaption>
        </figure>

        <p style={S.p}><strong>Objective: Concurrent Maintainability.</strong> Maintain any DG — the remaining DGs carry the full IT load.</p>
        <p style={S.p}><strong>Architecture:</strong> Typically 3 DGs (N=2 + 1 standby). All parallel on common sync panel. Isochronous load sharing. Any one DG offline — remaining two carry full load.</p>
        <p style={S.p}><strong>Fuel System:</strong> Common main tank acceptable — N+1 fuel transfer pumps. Minimum 12 hours at full load (industry best practice).</p>
        <p style={S.p}><strong>Important rule:</strong> Each DG must have the capacity to carry the full Data Center load independently — a design for only 50-50 sharing is insufficient.</p>

        <hr style={S.divider} />

        {/* ── SECTION 21 — TIER IV (PRIORITY SECTION) ── */}
        <h2 id="tier-4-design" style={S.h1}>Tier IV Design</h2>

        <InsightCard>
          <strong>Tier IV is not just "double Tier III" — it is a completely different design philosophy.</strong> In Tier III: maintain one DG — the rest keep running. ✓ In Tier IV: even if one DG unexpectedly FAILS — zero IT impact is still guaranteed. ✓✓ This is not concurrent maintainability — this is fault tolerance.
        </InsightCard>

        <ComparisonCard
          tag="Tier III vs Tier IV — Fundamental Difference"
          leftTitle="Tier III"
          leftItems={["Goal: Concurrent Maintainability", "N+1 parallel DGs", "1 common sync panel", "Common fuel tank OK", "1 DG room acceptable", "Shared AMF possible", "Service may impact during fault"]}
          rightTitle="Tier IV"
          rightItems={["Goal: Fault Tolerance", "2N — two independent systems", "2 separate sync panels", "Independent fuel zones/tanks", "2 fire-rated DG rooms (ideal)", "Completely independent AMF", "Zero IT impact — guaranteed"]}
        />

        <h3 style={S.h3}>Tier IV Core Principle — Zero Shared Components</h3>
        <p style={S.p}>There must be no shared component between Path A and Path B. Here is a checklist:</p>
        <ul style={S.ul}>
          <li style={S.li}><strong>DG Sets</strong> — Independent A sets + Independent B sets</li>
          <li style={S.li}><strong>Sync Panel</strong> — Separate Sync Panel A + Sync Panel B</li>
          <li style={S.li}><strong>AMF Panel</strong> — Independent AMF A + AMF B</li>
          <li style={S.li}><strong>ATS/ATSS</strong> — Separate per path</li>
          <li style={S.li}><strong>Day Tanks</strong> — Independent Day Tank A + Day Tank B</li>
          <li style={S.li}><strong>Main Fuel Storage</strong> — Physically separate zones minimum, separate tanks ideal</li>
          <li style={S.li}><strong>Fuel Transfer Pumps</strong> — Independent pump sets A + B</li>
          <li style={S.li}><strong>PLC/Controllers</strong> — Independent per system</li>
          <li style={S.li}><strong>DC Control Supply</strong> — Separate UPS-backed batteries per system</li>
          <li style={S.li}><strong>DG Rooms</strong> — 2 separate fire-rated rooms (ideal) or 1 room with a fire-rated partition</li>
        </ul>

        <InsightCard>
          <strong>Even one shared component = Single Point of Failure = NOT Tier IV.</strong>
        </InsightCard>

        <h3 style={S.h3}>Tier IV Architecture — Complete Picture</h3>

        <FlowDiagram caption="Tier IV System A — independent path from DG to server" steps={[
          { icon: "⛽", label: "Fuel Tank A", sublabel: "Independent" },
          { icon: "🛢️", label: "DG A1+A2+A3", sublabel: "N+1 set" },
          { icon: "🔄", label: "Sync Panel A", sublabel: "Independent" },
          { icon: "⚡", label: "ATS A" },
          { icon: "📋", label: "LVMDB A" },
          { icon: "🔌", label: "UPS A → PDU A" },
          { icon: "🖥️", label: "Server PSU A" },
        ]} />

        <FlowDiagram caption="Tier IV System B — fully independent path (zero crossover until server PSU)" steps={[
          { icon: "⛽", label: "Fuel Tank B", sublabel: "Independent" },
          { icon: "🛢️", label: "DG B1+B2+B3", sublabel: "N+1 set" },
          { icon: "🔄", label: "Sync Panel B", sublabel: "Independent" },
          { icon: "⚡", label: "ATS B" },
          { icon: "📋", label: "LVMDB B" },
          { icon: "🔌", label: "UPS B → PDU B" },
          { icon: "🖥️", label: "Server PSU B" },
        ]} />

        <p style={S.p}><strong>Server dual PSU = first crossover point.</strong> If DG A fails — the server continues on PSU B. If DG B fails — the server continues on PSU A. Zero IT impact.</p>

        <h3 style={S.h3}>Tier IV DG Room Design</h3>
        <p style={S.p}><strong>Ideal: Two separate fire-rated DG rooms.</strong></p>
        <p style={S.p}>Room A: DG A1, A2, A3 + Sync Panel A + AMF A + Day Tank A + Independent ventilation + Independent fire suppression.</p>
        <p style={S.p}>Room B: DG B1, B2, B3 + Sync Panel B + AMF B + Day Tank B + Independent ventilation + Independent fire suppression.</p>
        <p style={S.p}><strong>Why 2 rooms?</strong> If there is a fire in Room A — FM200 discharges — Room A's DGs go offline. Room B is completely unaffected. This is Tier IV fault isolation.</p>
        <p style={S.p}><strong>Practical minimum:</strong> One room with a fire-rated partition between zone A and zone B. Separate doors, separate ventilation, separate fire suppression. Most Tier IV certifications accept this.</p>

        <h3 style={S.h3}>Tier IV Fuel System — True Independence</h3>
        <p style={S.p}><strong>Worst case test:</strong> A problem in DG A's fuel line. Will DG B be affected? With a common tank, potentially yes. With independent tanks — definitely NO.</p>

        <ComparisonCard
          tag="Tier IV Fuel Storage Options"
          leftTitle="Option 1 — Purist 2N (Best)"
          leftItems={["Completely separate tanks", "Tank A: System A only", "Tank B: System B only", "No cross-connection", "Maximum independence", "More space + cost"]}
          rightTitle="Option 2 — Common Tank (Practical)"
          rightItems={["Physically divided zones in 1 tank", "Zone A: System A pumps only", "Zone B: System B pumps only", "No cross-pump connections", "Accepted by most Tier IV auditors", "More practical for space-constrained sites"]}
        />

        <h3 style={S.h3}>Tier IV Fuel Storage Target</h3>
        <ul style={S.ul}>
          <li style={S.li}><strong>Industry standard Tier IV:</strong> 24–48 hours (industry best practice)</li>
          <li style={S.li}><strong>Critical national infrastructure:</strong> 72 hours</li>
          <li style={S.li}><strong>Mission-critical (financial, healthcare):</strong> 7–14 days with guaranteed refueling contract</li>
          <li style={S.li}><strong>Hyperscale facilities:</strong> 5–7 days some cases</li>
        </ul>

        <EngineerTip>
          A refueling contract is a must along with fuel storage numbers. "72 hours storage" is useless if the fuel supplier itself is not available during an extended grid outage. Primary + backup fuel supplier SLAs — "Y kL guaranteed delivery within X hours" — are part of the Tier IV fuel strategy.
        </EngineerTip>

        <h3 style={S.h3}>Tier IV PLC & Control Redundancy</h3>
        <p style={S.p}><strong>System A Controls:</strong> PLC A (dedicated DG A1, A2, A3), AMF A with independent UPS-backed DC supply, independent communication to SCADA, independent alarm outputs.</p>
        <p style={S.p}><strong>System B Controls:</strong> PLC B (dedicated DG B1, B2, B3), AMF B with independent UPS-backed DC supply, independent communication, independent alarms.</p>
        <p style={S.p}><strong>Critical point:</strong> The AMF Panel's control power supply must be UPS backed — if the grid fails and the DG is starting, control power must not be lost in between. This is an overlooked requirement that is sometimes missed in Tier III but is mandatory in Tier IV.</p>

        <h3 style={S.h3}>Tier IV — Real Failure Walkthrough</h3>

        <FlowDiagram caption="Tier IV fault tolerance — DG A2 catastrophic failure during extended outage" steps={[
          { icon: "⛅", label: "Extended Grid Outage" },
          { icon: "💥", label: "DG A2 Fails" },
          { icon: "✅", label: "DG A1+A3 Run", sublabel: "System A OK" },
          { icon: "✅", label: "DG B1+B2+B3", sublabel: "System B OK" },
          { icon: "🖥️", label: "Servers Continue", sublabel: "PSU A+B both" },
          { icon: "🔧", label: "Engineers Mobilize", sublabel: "No rush — IT safe" },
        ]} />

        <p style={S.p}><strong>System A:</strong> DG A1 + A3 running (N+1 minus 1 = N — still adequate for full load).</p>
        <p style={S.p}><strong>System B:</strong> DG B1+B2+B3 running (full N+1 — completely unaffected).</p>
        <p style={S.p}><strong>IT impact: ZERO.</strong> Engineers repair or replace DG A2 at the next maintenance window.</p>

        <h3 style={S.h3}>Tier IV — DG Room Fire Scenario</h3>
        <p style={S.p}>Fire in DG Room A → FM200 discharge → Room A DGs offline.</p>
        <p style={S.p}>Room B: Completely unaffected — DG B1+B2+B3 running.</p>
        <p style={S.p}>Server PSU B: Full power. Server PSU A drops.</p>
        <p style={S.p}><strong>Servers with dual PSU: Zero IT impact. Continue on PSU B.</strong></p>
        <p style={S.p}>Fire suppression works. Once Room A is safe to enter, inspect it and restore.</p>
        <p style={S.p}>This is Tier IV fault tolerance — it survives an individual component failure and even a room-level failure.</p>

        <h3 style={S.h3}>Tier IV Testing — Concurrent Fault Simulation</h3>
        <p style={S.p}><strong>Method 1 — Individual System Test:</strong> Test System A while System B carries the full IT load. Simulate a grid failure in A, verify DG A start, verify load transfer. Then the reverse. Zero IT impact throughout.</p>
        <p style={S.p}><strong>Method 2 — Concurrent Fault Simulation (True Tier IV Validation):</strong> Take System A offline intentionally. System B carries 100% load automatically. The IT team monitors — zero impact visible. Restore System A. This test proves Tier IV fault tolerance.</p>
        <p style={S.p}><strong>Method 3 — Split Load Bank Test:</strong> System A: Full load bank = full rated load → test complete. System B: Full load bank = full rated load → test complete. Both simultaneously → total plant capacity verified.</p>

        <h3 style={S.h3}>Tier IV Common Mistakes — That Actually Make It Tier III</h3>
        <ul style={S.ul}>
          <li style={S.li}><strong>Single sync panel for all DGs:</strong> Sync panel fail = entire DG plant offline. NOT Tier IV.</li>
          <li style={S.li}><strong>Single fuel tank with independent pumps:</strong> Tank fail/contaminate = both systems affected. NOT Tier IV.</li>
          <li style={S.li}><strong>Shared AMF panel (redundant cards):</strong> Common chassis fail = complete AMF loss. NOT Tier IV.</li>
          <li style={S.li}><strong>DG rooms sharing common corridor:</strong> Fire in corridor = both rooms impacted. NOT Tier IV.</li>
          <li style={S.li}><strong>Common PLC for both systems:</strong> Single software fault = both systems affected. NOT Tier IV.</li>
        </ul>

        <WhyThisMatters>
          Tier IV = <strong>physical independence</strong> at every layer — not just redundancy, but complete isolation. Redundancy means "backup exists." Independence means "backup cannot be affected by the primary's failure." This distinction is critical both in Tier IV certification and in field reality.
        </WhyThisMatters>

        <hr style={S.divider} />

        {/* ── SECTION 22 ── */}
        <h2 id="future-trends" style={S.h1}>Future Trends</h2>

        <p style={S.p}><strong>Gas Generators:</strong> Generators running on natural gas or biogas — lower emissions, easier refueling (piped gas). They may replace diesel in urban Data Centers.</p>
        <p style={S.p}><strong>Hybrid DG + Battery:</strong> The battery buffers during the time the DG takes to start — the UPS battery can be smaller. Better frequency stability.</p>
        <p style={S.p}><strong>Fuel Cell Backup:</strong> Hydrogen fuel cells — zero emissions, quiet, high reliability. Microsoft has already tested them in some Data Centers. Currently expensive.</p>
        <p style={S.p}><strong>AI-Based Predictive Maintenance:</strong> Vibration sensors, oil analysis sensors, exhaust temperature analytics — predict failure before it happens.</p>
        <p style={S.p}><strong>Online DGA for Engine Oil:</strong> Real-time oil analysis — metal particle detection. Same concept as transformer DGA — detect engine wear early.</p>
        <p style={S.p}><strong>AI Data Centers:</strong> Extreme power density → larger DG sets, faster response times, tighter frequency control required. The power factor and harmonic profile of GPU clusters differ from standard IT.</p>

        <hr style={S.divider} />

        {/* ── Key Takeaways ── */}
        <h2 id="key-takeaways" style={S.h1}>Key Takeaways</h2>

        <KeyTakeawayCard items={[
          "The DG Set provides the Data Center's backup power during grid failure — automatically, in 10–30 seconds.",
          "Engine + Alternator + AMF/PLC — three main parts. Use the ESP rating in Data Centers, not PRP/COP.",
          "Never skip the cooldown run — heat soak can damage the engine.",
          "Stale fuel is the most common root cause of DG start failure — fuel polishing is mandatory.",
          "Diesel is Class C petroleum — a PESO license is required above prescribed limits (Petroleum Act 1934).",
          "Follow A/B/C/D checks strictly — always track calendar time along with the OEM schedule.",
          "Tier III: N+1 parallel, concurrent maintainability. Tier IV: 2N independent systems, fault tolerance.",
          "Tier IV has zero shared components between A and B — sync panel, AMF, fuel, DG room all independent.",
          "Tier IV fault tolerance = one system fails completely — zero IT impact. This is the fundamental difference from Tier III.",
          "Alarm acknowledge ≠ Alarm resolve — this is the most common root cause of DG maintenance failures.",
        ]} />

        <hr style={S.divider} />

        {/* ── What's Next ── */}
        <div style={S.cardWrap}>
          <div style={{ height: 2, background: "linear-gradient(90deg,#2563EB,#2563EB)" }} />
          <div style={S.cardBodyInsight}>
            <span style={{ ...S.cardLabel, color: "#2563EB" }}>WHAT&apos;S NEXT</span>
            <div style={S.cardContent}>The DG Set covers grid failure. But during the 10–30 seconds the DG takes to start — who provides power? That is exactly the job of the UPS and Battery Bank.</div>
            <div style={{ marginTop: 14, display: "flex", gap: 8, flexWrap: "wrap" }}>
              <TopicLink slug="ups" label="Next: UPS System →" variant="inline" />
              <TopicLink slug="battery-bank" label="Also: Battery Bank →" variant="inline" />
            </div>
          </div>
        </div>

        <hr style={S.divider} />

        <h2 style={S.h1}>Continue Learning</h2>
        <p style={S.p}>The electrical learning path beyond the DG Set — every topic is the next logical step in the Data Center power chain.</p>
        <ContinueLearning />

        <hr style={S.divider} />

        <PrevNextNav />

        <hr style={S.divider} />

        <h2 style={S.h1}>Frequently Asked Questions</h2>
        <FAQSection />

      </ArticleLayout>
    </>
  );
}
