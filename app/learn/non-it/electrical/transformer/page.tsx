// ─── TODO: Future articles required to complete this learning path ────────────
//
// TODO: app/learn/non-it/electrical/dg-set/page.tsx
//       Diesel Generator Set — AMF panel, load transfer, fuel management
//
// TODO: app/learn/non-it/electrical/ups/page.tsx
//       UPS System — online double-conversion, battery runtime, bypass
//
// TODO: app/learn/non-it/electrical/battery-bank/page.tsx
//       Battery Bank — VRLA, Li-ion, runtime calculation
//
// TODO: app/learn/non-it/electrical/earthing/page.tsx
//       Earthing System — electrode types, resistance testing, Data Center
//
// ─────────────────────────────────────────────────────────────────────────────

import type { Metadata } from "next";
import Image from "next/image";
import ArticleLayout from "@/components/ArticleLayout";
import { type ArticleHeading } from "@/components/ArticlePage";
import TopicLink from "@/components/TopicLink";

// ─── Metadata ─────────────────────────────────────────────────────────────────

export const metadata: Metadata = {
  title: "Transformer in Data Centers — Behind The Tech",
  description:
    "A transformer converts 11kV into 433V — oil vs dry type, Buchholz relay, DGA test, Tier III/IV design, a Data Center engineer guide in English.",
  alternates: {
    canonical: "https://behindthetech.in/learn/non-it/electrical/transformer",
    languages: {
      en: "https://behindthetech.in/learn/non-it/electrical/transformer",
      hi: "https://behindthetech.in/hi/learn/non-it/electrical/transformer",
      "x-default": "https://behindthetech.in/learn/non-it/electrical/transformer",
    },
  },
};

// ─── TOC headings (QuickSummary + FAQ excluded) ───────────────────────────────

const HEADINGS: ArticleHeading[] = [
  { id: "what-is-a-transformer",     text: "What Is a Transformer?",         level: 2 },
  { id: "why-required",              text: "Why Is Transformer Required?",    level: 2 },
  { id: "real-data-center-example",  text: "Real Data Center Example",        level: 2 },
  { id: "types-of-transformers",     text: "Types of Transformers",           level: 2 },
  { id: "key-components",            text: "Key Components",                  level: 2 },
  { id: "working-principle",         text: "Working Principle",               level: 2 },
  { id: "dyn11",                     text: "Dyn11 Configuration",             level: 2 },
  { id: "harmonics",                 text: "Harmonics — Hidden Problem",      level: 2 },
  { id: "installation",              text: "Installation Process",            level: 2 },
  { id: "testing-commissioning",     text: "Testing & Commissioning",         level: 2 },
  { id: "operation",                 text: "Operation",                       level: 2 },
  { id: "scada-bms-monitoring",      text: "SCADA & BMS Monitoring",          level: 2 },
  { id: "maintenance",               text: "Maintenance",                     level: 2 },
  { id: "common-faults",             text: "Common Faults",                   level: 2 },
  { id: "troubleshooting",           text: "Troubleshooting",                 level: 2 },
  { id: "failure-scenario",          text: "Failure Scenario",                level: 2 },
  { id: "safety-practices",          text: "Safety Practices",                level: 2 },
  { id: "oems-vendors",              text: "OEMs & Vendors",                  level: 2 },
  { id: "tier-3-design",             text: "Tier III Design",                 level: 2 },
  { id: "tier-4-design",             text: "Tier IV Design",                  level: 2 },
  { id: "future-trends",             text: "Future Trends",                   level: 2 },
  { id: "key-takeaways",             text: "Key Takeaways",                   level: 2 },
];

// ─── Shared inline styles ─────────────────────────────────────────────────────

const S = {
  h1: {
    fontFamily: "var(--font-display)",
    fontSize: "clamp(1.5rem, 2.5vw, 1.9rem)",
    letterSpacing: "0.04em",
    color: "#111827",
    lineHeight: 1.15,
    marginTop: 64,
    marginBottom: 16,
  } as React.CSSProperties,
  h2: {
    fontFamily: "var(--font-display)",
    fontSize: "clamp(1.2rem, 2vw, 1.5rem)",
    letterSpacing: "0.04em",
    color: "#111827",
    lineHeight: 1.2,
    marginTop: 56,
    marginBottom: 14,
  } as React.CSSProperties,
  h3: {
    fontFamily: "var(--font-body)",
    fontSize: "1rem",
    fontWeight: 600,
    color: "#111827",
    lineHeight: 1.3,
    marginTop: 28,
    marginBottom: 10,
  } as React.CSSProperties,
  p: { marginBottom: 16, color: "#1f2937" } as React.CSSProperties,
  ul: {
    paddingLeft: 20,
    marginBottom: 16,
    display: "flex",
    flexDirection: "column" as const,
    gap: 6,
  } as React.CSSProperties,
  li: { color: "#1f2937", lineHeight: 1.65 } as React.CSSProperties,
  divider: {
    border: "none",
    borderTop: "1px solid rgba(37,99,235,0.08)",
    margin: "12px 0",
  } as React.CSSProperties,
  learnMore: {
    margin: "10px 0 4px",
    display: "flex",
    alignItems: "center",
    flexWrap: "wrap" as const,
    gap: 6,
  } as React.CSSProperties,
  cardWrap: {
    position: "relative" as const,
    borderRadius: 10,
    overflow: "hidden" as const,
    margin: "28px 0",
  } as React.CSSProperties,
  cardAccentBlue: {
    height: 2,
    background: "#2563EB",
  } as React.CSSProperties,
  cardBodyInsight: {
    background: "rgba(37,99,235,0.035)",
    border: "1px solid rgba(37,99,235,0.16)",
    borderTop: "none",
    padding: "18px 22px 20px",
  } as React.CSSProperties,
  cardLabel: {
    display: "block",
    fontFamily: "var(--font-mono)",
    fontSize: 9,
    letterSpacing: "0.22em",
    fontWeight: 600,
    marginBottom: 10,
  } as React.CSSProperties,
  cardContent: {
    fontFamily: "var(--font-body)",
    fontSize: 15,
    lineHeight: 1.7,
    color: "#1f2937",
  } as React.CSSProperties,
  takeawayCard: {
    position: "relative" as const,
    borderRadius: 12,
    background: "linear-gradient(135deg, rgba(37,99,235,0.05), rgba(0,255,204,0.03))",
    border: "1px solid rgba(37,99,235,0.16)",
    overflow: "hidden" as const,
    margin: "32px 0",
  } as React.CSSProperties,
  takeawayAccent: {
    height: 2,
    background: "linear-gradient(90deg, #2563EB, #2563EB)",
  } as React.CSSProperties,
  takeawayBody: { padding: "22px 24px 24px" } as React.CSSProperties,
  takeawayLabel: {
    display: "inline-block",
    fontFamily: "var(--font-mono)",
    fontSize: 9,
    letterSpacing: "0.26em",
    color: "#2563EB",
    fontWeight: 600,
    marginBottom: 16,
  } as React.CSSProperties,
  takeawayList: {
    listStyle: "none",
    margin: 0,
    padding: 0,
    display: "flex",
    flexDirection: "column" as const,
    gap: 12,
  } as React.CSSProperties,
  takeawayItem: { display: "flex", alignItems: "flex-start", gap: 10 } as React.CSSProperties,
  takeawayCheck: {
    flexShrink: 0,
    width: 18,
    height: 18,
    borderRadius: 4,
    background: "rgba(0,255,204,0.12)",
    border: "1px solid rgba(0,255,204,0.4)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 1,
  } as React.CSSProperties,
  takeawayText: {
    fontFamily: "var(--font-body)",
    fontSize: 14.5,
    lineHeight: 1.6,
    color: "#1f2937",
  } as React.CSSProperties,
  articleImage: {
    position: "relative",
    width: "100%",
    aspectRatio: "16 / 9",
    borderRadius: 10,
    overflow: "hidden",
    margin: 0,
    border: "1px solid rgba(37,99,235,0.12)",
  } as React.CSSProperties,
  imageFigure: { margin: "8px 0 24px" } as React.CSSProperties,
  imageCaption: {
    fontFamily: "var(--font-body)",
    fontSize: 12.5,
    color: "#1f2937",
    textAlign: "center" as const,
    marginTop: 8,
  } as React.CSSProperties,
  noteText: {
    fontFamily: "var(--font-body)",
    fontSize: 13,
    fontStyle: "italic" as const,
    color: "#1f2937",
    marginBottom: 16,
    lineHeight: 1.6,
  } as React.CSSProperties,
} as const;

// ─── QuickSummary ─────────────────────────────────────────────────────────────

function QuickSummary() {
  const points = [
    { label: "What it is, in one line", text: "A transformer is an electrical machine that converts high voltage (11kV/33kV) into low voltage (433V) — so that UPS, PDU and servers can operate safely." },
    { label: "Why in a Data Center", text: "Power coming from the grid cannot go directly into a server. The transformer brings it to a usable voltage — without it, the entire downstream chain will not work at all." },
    { label: "Two main types", text: "Oil-cooled (outdoor, economical) and Dry-type cast resin (indoor, fire-safe). Dry-type is preferred in modern Data Centers — no oil, no fire risk." },
    { label: "What is inside", text: "Two copper coils (primary HV side, secondary LV side) with an iron core in between. No moving parts. It works on electromagnetic induction — simple and reliable." },
    { label: "In Tier III / Tier IV", text: "Tier III: N+1 — one extra transformer always ready. Tier IV: 2N — two complete independent paths, both active at the same time, zero downtime even if one fails." },
    { label: "One important point", text: "A transformer works only with AC — not with DC. That is why the transformer comes before the UPS. DC conversion happens later, inside the UPS." },
  ];
  return (
    <div style={{ position: "relative", borderRadius: 12, overflow: "hidden", margin: "8px 0 32px" }}>
      <div style={{ height: 2, background: "linear-gradient(90deg, #2563EB, #2563EB)" }} />
      <div style={{ background: "rgba(37,99,235,0.03)", border: "1px solid rgba(37,99,235,0.14)", borderTop: "none", padding: "20px 22px 22px" }}>
        <span style={{ display: "inline-flex", alignItems: "center", gap: 8, fontFamily: "var(--font-mono)", fontSize: 9, letterSpacing: "0.26em", color: "#2563EB", fontWeight: 600, marginBottom: 16 }}>
          ⚡ QUICK SUMMARY — 2 MINUTE READ
        </span>
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          {points.map((pt, i) => (
            <div key={i} style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
              <span style={{ flexShrink: 0, fontFamily: "var(--font-mono)", fontSize: 9, letterSpacing: "0.1em", textTransform: "uppercase", color: "#2563EB", paddingTop: 3, minWidth: 130 }}>
                {pt.label}
              </span>
              <span style={{ fontFamily: "var(--font-body)", fontSize: 14, lineHeight: 1.65, color: "#1f2937" }}>
                {pt.text}
              </span>
            </div>
          ))}
        </div>
        <div style={{ marginTop: 16, paddingTop: 14, borderTop: "1px solid rgba(37,99,235,0.08)", fontFamily: "var(--font-body)", fontSize: 13, color: "#1f2937" }}>
          If you have understood this much, the transformer concept is clear. If you want to go deeper, the full article is below.
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
        <span style={{ display: "block", fontFamily: "var(--font-mono)", fontSize: 9, letterSpacing: "0.2em", textTransform: "uppercase", color: "#ffa500", fontWeight: 600, marginBottom: 9 }}>
          Engineer's Tip
        </span>
        <div style={{ fontFamily: "var(--font-body)", fontSize: 14, lineHeight: 1.65, color: "#1f2937" }}>
          {children}
        </div>
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
        <span style={{ display: "block", fontFamily: "var(--font-mono)", fontSize: 9, letterSpacing: "0.2em", textTransform: "uppercase", color: "#2563EB", fontWeight: 600, marginBottom: 9 }}>
          Why This Matters In A Data Center
        </span>
        <div style={{ fontFamily: "var(--font-body)", fontSize: 14, lineHeight: 1.65, color: "#1f2937" }}>
          {children}
        </div>
      </div>
    </div>
  );
}

// ─── WhatYouAreLooking ────────────────────────────────────────────────────────

function WhatYouAreLooking({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ borderRadius: 8, background: "rgba(37,99,235,0.025)", border: "1px dashed rgba(37,99,235,0.2)", padding: "12px 16px", margin: "0 0 24px" }}>
      <span style={{ display: "block", fontFamily: "var(--font-mono)", fontSize: 8.5, letterSpacing: "0.18em", textTransform: "uppercase", color: "#2563EB", fontWeight: 600, marginBottom: 6 }}>
        What You Are Looking At
      </span>
      <div style={{ fontFamily: "var(--font-body)", fontSize: 13, lineHeight: 1.6, color: "#1f2937" }}>
        {children}
      </div>
    </div>
  );
}

// ─── DCMapNote ────────────────────────────────────────────────────────────────

function DCMapNote({ components }: { components: string[] }) {
  return (
    <div style={{ margin: "16px 0 24px" }}>
      <span style={{ display: "block", fontFamily: "var(--font-mono)", fontSize: 8.5, letterSpacing: "0.18em", textTransform: "uppercase", color: "#1f2937", marginBottom: 8 }}>
        On The Data Center Map
      </span>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
        {components.map((c) => (
          <span key={c} style={{ fontFamily: "var(--font-body)", fontSize: 12, padding: "4px 10px", borderRadius: 980, background: "rgba(37,99,235,0.05)", border: "1px solid rgba(37,99,235,0.16)", color: "#1f2937" }}>
            {c}
          </span>
        ))}
      </div>
    </div>
  );
}

// ─── KeyTakeawayCard ──────────────────────────────────────────────────────────

function KeyTakeawayCard({ items }: { items: string[] }) {
  return (
    <div style={S.takeawayCard}>
      <div style={S.takeawayAccent} />
      <div style={S.takeawayBody}>
        <span style={S.takeawayLabel}>KEY TAKEAWAYS</span>
        <ul style={S.takeawayList}>
          {items.map((item, i) => (
            <li key={i} style={S.takeawayItem}>
              <span style={S.takeawayCheck}>
                <svg width="10" height="10" viewBox="0 0 24 24" fill="none">
                  <path d="M4 13l5 5L20 6" stroke="#2563EB" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
              <span style={S.takeawayText}>{item}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

// ─── FlowDiagram ──────────────────────────────────────────────────────────────

interface FlowStep { icon: string; label: string; sublabel?: string; }

function FlowDiagram({ caption, steps }: { caption: string; steps: FlowStep[] }) {
  return (
    <figure style={{ margin: "20px 0 24px" }}>
      <div style={{ borderRadius: 10, background: "rgba(37,99,235,0.025)", border: "1px solid rgba(37,99,235,0.10)", padding: "22px 20px" }}>
        <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: 4, justifyContent: "center" }}>
          {steps.map((step, i) => (
            <div key={i} style={{ display: "flex", alignItems: "center" }}>
              <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 6, minWidth: 86, textAlign: "center" }}>
                <span aria-hidden="true" style={{ width: 38, height: 38, borderRadius: "50%", background: "rgba(37,99,235,0.08)", border: "1px solid rgba(37,99,235,0.25)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 17 }}>
                  {step.icon}
                </span>
                <span style={{ fontFamily: "var(--font-body)", fontSize: 12, fontWeight: 600, color: "#1f2937", lineHeight: 1.3 }}>
                  {step.label}
                </span>
                {step.sublabel && (
                  <span style={{ fontFamily: "var(--font-mono)", fontSize: 10, color: "#1f2937" }}>
                    {step.sublabel}
                  </span>
                )}
              </div>
              {i < steps.length - 1 && (
                <span aria-hidden="true" style={{ fontFamily: "var(--font-mono)", fontSize: 14, color: "#2563EB", margin: "0 4px", opacity: 0.7 }}>
                  →
                </span>
              )}
            </div>
          ))}
        </div>
      </div>
      <figcaption style={S.imageCaption}>{caption}</figcaption>
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
        <span style={{ display: "inline-block", fontFamily: "var(--font-mono)", fontSize: 9, letterSpacing: "0.2em", textTransform: "uppercase", color: "#2563EB", fontWeight: 600, marginBottom: 14 }}>
          {tag}
        </span>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
          <div>
            <span style={{ display: "block", fontFamily: "var(--font-mono)", fontSize: 9, letterSpacing: "0.1em", textTransform: "uppercase", color: "#2563EB", marginBottom: 8 }}>
              {leftTitle}
            </span>
            <ul style={{ listStyle: "none", margin: 0, padding: 0, display: "flex", flexDirection: "column", gap: 6 }}>
              {leftItems.map((a, i) => (
                <li key={i} style={{ fontFamily: "var(--font-body)", fontSize: 13, lineHeight: 1.5, color: "#1f2937" }}>{a}</li>
              ))}
            </ul>
          </div>
          <div>
            <span style={{ display: "block", fontFamily: "var(--font-mono)", fontSize: 9, letterSpacing: "0.1em", textTransform: "uppercase", color: "#2563EB", marginBottom: 8 }}>
              {rightTitle}
            </span>
            <ul style={{ listStyle: "none", margin: 0, padding: 0, display: "flex", flexDirection: "column", gap: 6 }}>
              {rightItems.map((d, i) => (
                <li key={i} style={{ fontFamily: "var(--font-body)", fontSize: 13, lineHeight: 1.5, color: "#1f2937" }}>{d}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── TurnsRatioCard — formula visual ─────────────────────────────────────────

function TurnsRatioCard() {
  return (
    <div style={{ borderRadius: 10, background: "rgba(37,99,235,0.03)", border: "1px solid rgba(37,99,235,0.16)", overflow: "hidden", margin: "20px 0 28px" }}>
      <div style={{ height: 2, background: "linear-gradient(90deg, #2563EB, #2563EB)" }} />
      <div style={{ padding: "20px 22px 22px" }}>
        <span style={{ display: "block", fontFamily: "var(--font-mono)", fontSize: 9, letterSpacing: "0.2em", textTransform: "uppercase", color: "#2563EB", fontWeight: 600, marginBottom: 16 }}>
          Turns Ratio — Golden Rule
        </span>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 24, flexWrap: "wrap", marginBottom: 20 }}>
          <div style={{ textAlign: "center" }}>
            <div style={{ fontFamily: "var(--font-mono)", fontSize: 22, color: "#2563EB", fontWeight: 700, lineHeight: 1 }}>N₁</div>
            <div style={{ borderTop: "2px solid rgba(37,99,235,0.4)", margin: "6px 0" }} />
            <div style={{ fontFamily: "var(--font-mono)", fontSize: 22, color: "#2563EB", fontWeight: 700, lineHeight: 1 }}>N₂</div>
          </div>
          <div style={{ fontFamily: "var(--font-mono)", fontSize: 22, color: "#1f2937" }}>=</div>
          <div style={{ textAlign: "center" }}>
            <div style={{ fontFamily: "var(--font-mono)", fontSize: 22, color: "#2563EB", fontWeight: 700, lineHeight: 1 }}>V₁</div>
            <div style={{ borderTop: "2px solid rgba(0,255,204,0.4)", margin: "6px 0" }} />
            <div style={{ fontFamily: "var(--font-mono)", fontSize: 22, color: "#2563EB", fontWeight: 700, lineHeight: 1 }}>V₂</div>
          </div>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
          <div style={{ background: "rgba(37,99,235,0.04)", borderRadius: 8, padding: "12px 14px" }}>
            <span style={{ display: "block", fontFamily: "var(--font-mono)", fontSize: 9, color: "#1f2937", marginBottom: 6 }}>Example</span>
            <span style={{ fontFamily: "var(--font-body)", fontSize: 13, color: "#1f2937" }}>11000 ÷ 433 = <strong style={{ color: "#2563EB" }}>25.4</strong></span>
            <span style={{ display: "block", fontFamily: "var(--font-body)", fontSize: 12, color: "#1f2937", marginTop: 4 }}>25× more turns on the primary</span>
          </div>
          <div style={{ background: "rgba(0,255,204,0.04)", borderRadius: 8, padding: "12px 14px" }}>
            <span style={{ display: "block", fontFamily: "var(--font-mono)", fontSize: 9, color: "#1f2937", marginBottom: 6 }}>Current Reversal</span>
            <span style={{ fontFamily: "var(--font-body)", fontSize: 13, color: "#1f2937" }}>Voltage ↓ → Current <strong style={{ color: "#2563EB" }}>↑</strong></span>
            <span style={{ display: "block", fontFamily: "var(--font-body)", fontSize: 12, color: "#1f2937", marginTop: 4 }}>LV cables are thick</span>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── TestingTable ─────────────────────────────────────────────────────────────

const TESTS = [
  { test: "IR Test (Megger)", checks: "Insulation resistance — HV-to-Earth, LV-to-Earth, HV-to-LV" },
  { test: "Turns Ratio Test (TTR)", checks: "Verify the actual voltage ratio — should match 11000/433" },
  { test: "Polarity Test", checks: "Critical for parallel operation — wrong polarity = severe fault" },
  { test: "Winding Resistance Test", checks: "Detects loose joints and connection problems" },
  { test: "Oil BDV Test", checks: "Oil insulation strength — minimum 60 kV fresh oil (IS 335 / IEC 60296)" },
  { test: "DGA Test", checks: "Analyzes dissolved gases — early detection of internal faults" },
  { test: "Buchholz Relay Test", checks: "Relay correctly responding to gas/surge" },
  { test: "Temperature Calibration", checks: "Verify alarm/trip setpoints — as per OEM specification" },
];

function TestingTable() {
  return (
    <div style={{ margin: "20px 0 28px", borderRadius: 10, border: "1px solid rgba(37,99,235,0.12)", overflow: "hidden" }}>
      <div style={{ overflowX: "auto" }}>
        <table style={{ width: "100%", borderCollapse: "collapse", minWidth: 520 }}>
          <thead>
            <tr style={{ background: "rgba(37,99,235,0.06)" }}>
              {["Test", "What Is Checked"].map((h) => (
                <th key={h} style={{ textAlign: "left", padding: "12px 16px", fontFamily: "var(--font-mono)", fontSize: 10.5, letterSpacing: "0.08em", textTransform: "uppercase", color: "#2563EB", borderBottom: "1px solid rgba(37,99,235,0.14)", whiteSpace: "nowrap" }}>
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {TESTS.map((row, i) => (
              <tr key={row.test} style={{ background: i % 2 === 0 ? "transparent" : "rgba(37,99,235,0.015)" }}>
                <td style={{ padding: "12px 16px", fontFamily: "var(--font-body)", fontSize: 13.5, fontWeight: 600, color: "#1f2937", borderBottom: "1px solid rgba(255,255,255,0.04)", whiteSpace: "nowrap" }}>
                  {row.test}
                </td>
                <td style={{ padding: "12px 16px", fontFamily: "var(--font-body)", fontSize: 13, color: "#1f2937", borderBottom: "1px solid rgba(255,255,255,0.04)" }}>
                  {row.checks}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// ─── MonitoringTable ──────────────────────────────────────────────────────────

const MONITORING = [
  { param: "Winding Temperature", why: "The most critical indicator of overheating" },
  { param: "Oil Temperature", why: "Heat stress indicator in the oil type" },
  { param: "Load Current", why: "Overload detection — against the kVA rating" },
  { param: "Incoming / Outgoing Voltage", why: "Power quality check" },
  { param: "Cooling Fan Status", why: "Cooling health — failure = overheating risk" },
  { param: "Buchholz Relay Status", why: "Early warning of internal faults — never ignore it" },
  { param: "Oil Level", why: "To detect leakage (oil-type)" },
  { param: "Protection Relay Status", why: "Healthy or tripped — real-time visibility" },
];

function MonitoringTable() {
  return (
    <div style={{ margin: "20px 0 28px", borderRadius: 10, border: "1px solid rgba(37,99,235,0.12)", overflow: "hidden" }}>
      <div style={{ overflowX: "auto" }}>
        <table style={{ width: "100%", borderCollapse: "collapse", minWidth: 480 }}>
          <thead>
            <tr style={{ background: "rgba(37,99,235,0.06)" }}>
              {["Parameter", "Why We Monitor It"].map((h) => (
                <th key={h} style={{ textAlign: "left", padding: "12px 16px", fontFamily: "var(--font-mono)", fontSize: 10.5, letterSpacing: "0.08em", textTransform: "uppercase", color: "#2563EB", borderBottom: "1px solid rgba(37,99,235,0.14)" }}>
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {MONITORING.map((row, i) => (
              <tr key={row.param} style={{ background: i % 2 === 0 ? "transparent" : "rgba(37,99,235,0.015)" }}>
                <td style={{ padding: "12px 16px", fontFamily: "var(--font-body)", fontSize: 13.5, fontWeight: 600, color: "#1f2937", borderBottom: "1px solid rgba(255,255,255,0.04)", whiteSpace: "nowrap" }}>
                  {row.param}
                </td>
                <td style={{ padding: "12px 16px", fontFamily: "var(--font-body)", fontSize: 13, color: "#1f2937", borderBottom: "1px solid rgba(255,255,255,0.04)" }}>
                  {row.why}
                </td>
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
  { type: "Dry-Type Cast Resin", oems: "SGB, Voltamp, Schneider Electric, Siemens, ABB (Hitachi Energy), CG Power, Kirloskar" },
  { type: "Oil-Cooled",          oems: "CG Power, BHEL, Siemens, ABB (Hitachi Energy), Kirloskar Electric, Emco" },
  { type: "K-Factor",            oems: "Schneider Electric, ABB, Siemens" },
  { type: "Buchholz Relay",      oems: "Trafag, Qualitrol" },
];

function OEMTable() {
  return (
    <div style={{ margin: "20px 0 28px", borderRadius: 10, border: "1px solid rgba(37,99,235,0.12)", overflow: "hidden" }}>
      <div style={{ overflowX: "auto" }}>
        <table style={{ width: "100%", borderCollapse: "collapse", minWidth: 480 }}>
          <thead>
            <tr style={{ background: "rgba(37,99,235,0.06)" }}>
              {["Type", "Common OEMs"].map((h) => (
                <th key={h} style={{ textAlign: "left", padding: "12px 16px", fontFamily: "var(--font-mono)", fontSize: 10.5, letterSpacing: "0.08em", textTransform: "uppercase", color: "#2563EB", borderBottom: "1px solid rgba(37,99,235,0.14)", whiteSpace: "nowrap" }}>
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {OEM_ROWS.map((row, i) => (
              <tr key={row.type} style={{ background: i % 2 === 0 ? "transparent" : "rgba(37,99,235,0.015)" }}>
                <td style={{ padding: "12px 16px", fontFamily: "var(--font-body)", fontSize: 13.5, fontWeight: 600, color: "#1f2937", borderBottom: "1px solid rgba(255,255,255,0.04)", whiteSpace: "nowrap" }}>
                  {row.type}
                </td>
                <td style={{ padding: "12px 16px", fontFamily: "var(--font-body)", fontSize: 13, color: "#1f2937", borderBottom: "1px solid rgba(255,255,255,0.04)" }}>
                  {row.oems}
                </td>
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
  const slugs = ["rmu", "dg-set", "ups", "battery-bank", "earthing", "ht-yard"];
  return (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 12, margin: "20px 0 8px" }}>
      {slugs.map((slug) => (
        <TopicLink key={slug} slug={slug} variant="card" />
      ))}
    </div>
  );
}

// ─── PrevNextNav ──────────────────────────────────────────────────────────────

function PrevNextNav() {
  return (
    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, margin: "24px 0 8px" }}>
      <div style={{ borderRadius: 10, background: "rgba(37,99,235,0.03)", border: "1px solid rgba(37,99,235,0.12)", padding: "14px 16px" }}>
        <span style={{ display: "block", fontFamily: "var(--font-mono)", fontSize: 8.5, letterSpacing: "0.18em", textTransform: "uppercase", color: "#1f2937", marginBottom: 8 }}>
          ← Previous
        </span>
        <TopicLink slug="rmu" label="RMU" variant="inline" />
      </div>
      <div style={{ borderRadius: 10, background: "rgba(37,99,235,0.03)", border: "1px solid rgba(37,99,235,0.12)", padding: "14px 16px", textAlign: "right" }}>
        <span style={{ display: "block", fontFamily: "var(--font-mono)", fontSize: 8.5, letterSpacing: "0.18em", textTransform: "uppercase", color: "#1f2937", marginBottom: 8 }}>
          Next →
        </span>
        <TopicLink slug="dg-set" label="DG Set" variant="inline" />
      </div>
    </div>
  );
}

// ─── FAQ ──────────────────────────────────────────────────────────────────────

const FAQS = [
  { q: "What is the difference between a Transformer and an Inverter?", a: "A transformer converts AC voltage — AC to AC, without becoming DC. An inverter converts DC into AC. In a Data Center, first comes the transformer (11kV → 433V), then the inverter inside the UPS (DC → AC)." },
  { q: "Why does a transformer 'hum'?", a: "The silicon steel laminations of the core vibrate because of the magnetic field — this causes a gentle humming. It is normal. A sudden louder or unusual sound = indicates a fault or overload." },
  { q: "How many servers can a 1000 kVA transformer handle?", a: "Rough estimate: 1000 kVA × 0.8 PF = 800 kW. Modern servers 200–500W each = 1600 to 4000 servers approximately. The actual calculation depends on IT load, PUE and UPS efficiency." },
  { q: "Can a transformer be bypassed?", a: "Normally no — the voltage will not match. For maintenance it is isolated, not bypassed. That is why there is an N+1 or 2N transformer design." },
  { q: "Dry Type or Oil Type — which is better?", a: "Dry Type is preferred in indoor installations — fire-safe, low maintenance, no oil. In outdoor high-capacity projects, Oil Type can be economical. Selection depends on project requirements." },
  { q: "Why is the DGA test so important?", a: "DGA is the MRI scan of a transformer. If an internal fault is developing, specific gases start dissolving in the oil — hydrogen, methane, acetylene etc. DGA detects these gases before failure happens." },
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
  mainEntity: FAQS.map((item) => ({
    "@type": "Question",
    name: item.q,
    acceptedAnswer: { "@type": "Answer", text: item.a },
  })),
};

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function TransformerPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <ArticleLayout slug="transformer" headings={HEADINGS} readingTimeMinutes={18} lang="en" alternateHref="/hi/learn/non-it/electrical/transformer">

        {/* ── Hero Image ── */}
        <figure style={S.imageFigure}>
          <div style={S.articleImage}>
            <Image src="/images/articles/transformer/transformer-overview.png" alt="Dry-type cast resin transformer installed in an Indian Data Center electrical room" fill sizes="(max-width: 768px) 100vw, 740px" style={{ objectFit: "cover" }} />
          </div>
          <figcaption style={S.imageCaption}>Transformer — the voltage conversion point of the Data Center electrical chain, converting 11kV into 433V.</figcaption>
        </figure>

        <WhatYouAreLooking>
          This is a dry-type cast resin transformer — installed in an indoor electrical room. No oil, no leakage risk. The copper coils are sealed in epoxy resin. From outside it looks like a simple metal box; inside, the whole power conversion magic happens.
        </WhatYouAreLooking>

        {/* ── Quick Summary ── */}
        <QuickSummary />

        <hr style={S.divider} />

        {/* ── Intro ── */}
        <p style={S.p}>So far we have understood <TopicLink slug="grid-supply" label="Grid Supply" variant="inline" />, <TopicLink slug="ht-yard" label="HT Yard" variant="inline" /> and <TopicLink slug="rmu" label="RMU" variant="inline" />.</p>
        <p style={S.p}>Now comes the next and most important component of the electrical chain — <strong>the Transformer.</strong></p>
        <p style={S.p}>The power that reaches the Data Center from the grid is usually at 11 kV or 33 kV. This voltage cannot be given to a server rack. Nor to the UPS. Nor to the PDU.</p>
        <p style={S.p}>The transformer converts high voltage into a low, usable voltage — everything else starts after it.</p>

        <FlowDiagram
          caption="Position of the transformer in the Data Center power chain"
          steps={[
            { icon: "⚡", label: "Grid Supply" },
            { icon: "🔐", label: "HT Yard", sublabel: "VCB + Relay" },
            { icon: "🔁", label: "RMU", sublabel: "Isolation" },
            { icon: "🔋", label: "Transformer", sublabel: "11kV → 433V" },
            { icon: "📋", label: "LVMDB" },
            { icon: "🔌", label: "UPS → PDU" },
            { icon: "🖥️", label: "Server Rack" },
          ]}
        />

        <hr style={S.divider} />

        {/* ── SECTION 1: What Is ── */}
        <h2 id="what-is-a-transformer" style={S.h1}>What Is a Transformer?</h2>

        <p style={S.p}><strong>In one line:</strong> A transformer is a voltage converter.</p>
        <p style={S.p}>Just as a phone charger makes 5V USB from a 220V wall socket — in exactly the same way, a transformer makes 433V from 11,000V. The only difference is size and scale.</p>
        <p style={S.p}><strong>What static means:</strong> It has no moving parts inside. No motor, no shaft. Still, it is the most critical equipment in the power system.</p>
        <p style={S.p}><strong>Works only on AC:</strong> A transformer does not work with DC — only with AC. That is why the transformer comes before the UPS. DC conversion happens later, inside the UPS.</p>

        <DCMapNote components={["Transformer", "LV Switchboard", "HV Feeder"]} />

        <hr style={S.divider} />

        {/* ── SECTION 2: Why ── */}
        <h2 id="why-required" style={S.h1}>Why Is Transformer Required?</h2>

        <p style={S.p}>Imagine the municipal water line outside your house is running at very high pressure. If that same pressure were given directly to the kitchen tap — the pipe would burst. A pressure regulator is installed in between.</p>
        <p style={S.p}><strong>A transformer does exactly this job in the electrical world.</strong></p>
        <p style={S.p}>The grid sends power at high voltage because current stays low and transmission losses are minimized. But end equipment needs a low, safe voltage. The transformer performs this conversion.</p>

        <WhyThisMatters>
          If the transformer fails — the entire downstream electrical chain is impacted. UPS, PDU, servers — everything shuts down. That is why transformer redundancy (N+1 or 2N) is a core principle of Data Center design.
        </WhyThisMatters>

        <hr style={S.divider} />

        {/* ── SECTION 3: Real Example ── */}
        <h2 id="real-data-center-example" style={S.h1}>Real Data Center Example</h2>

        <p style={S.p}>Suppose there is a Tier III Data Center — 11 kV incoming from the utility, total load 1200 kW, transformer rating 1600 kVA.</p>
        <p style={S.p}>Why 1600 kVA — the transformer must have more capacity than the rated load for overload margin. If the transformer were rated at exactly 1200 kW, it would overheat when even a little extra load came.</p>

        <InsightCard>
          <strong>kVA and kW — the two are not the same.</strong> A transformer is rated in kVA, not in kW. kW = kVA × Power Factor. In a Data Center the PF is typically 0.8-0.9. A 1600 kVA transformer at 0.9 PF = 1440 kW usable. That is why the kVA rating is always kept higher than the kW load.
        </InsightCard>

        <hr style={S.divider} />

        {/* ── SECTION 4: Types ── */}
        <h2 id="types-of-transformers" style={S.h1}>Types of Transformers</h2>

        <figure style={S.imageFigure}>
          <div style={S.articleImage}>
            <Image src="/images/articles/transformer/oil-vs-dry-type.png" alt="Oil-cooled transformer outdoor vs dry-type cast resin transformer indoor — side by side comparison" fill sizes="(max-width: 768px) 100vw, 740px" style={{ objectFit: "cover" }} />
          </div>
          <figcaption style={S.imageCaption}>Oil-cooled (outdoor, large and heavy) vs Dry-type cast resin (indoor, compact, fire-safe).</figcaption>
        </figure>

        <WhatYouAreLooking>
          Left side: oil-cooled transformer — conservator tank on top, radiator fins on the side, outdoor installation. Right side: dry-type cast resin — compact, coils visible (sealed in epoxy), installed in an indoor electrical room.
        </WhatYouAreLooking>

        <ComparisonCard
          tag="Oil-Cooled vs Dry-Type"
          leftTitle="Oil-Cooled Transformer"
          leftItems={["Mineral oil — cooling + insulation", "High capacity available", "Economical for large ratings", "Outdoor or dedicated fire-rated room", "Oil leakage + fire risk", "Regular oil testing required"]}
          rightTitle="Dry-Type Cast Resin"
          rightItems={["No oil — epoxy resin sealed", "Fire resistant — indoor safe", "Low maintenance", "Compact — possible near the server room", "Higher initial cost", "Electrical room ventilation critical"]}
        />

        <EngineerTip>
          If the transformer is installed inside an electrical room and there is no oil containment bund — Dry Type Cast Resin is automatically the preferred choice. In outdoor and very high capacity projects, Oil-Cooled is economical. Actual selection depends on project requirements, budget and site constraints.
        </EngineerTip>

        <h3 style={S.h3}>K-Factor Transformer</h3>
        <p style={S.p}>This is a special version of the normal transformer. In Data Centers, servers, UPS and SMPS loads generate harmonics — the waveform gets distorted. These harmonics cause extra heat in the transformer, even at normal load.</p>
        <p style={S.p}>A K-Factor Transformer is specially designed for harmonic-rich environments. Their use is growing rapidly in AI Data Centers and high-density compute.</p>

        <h3 style={S.h3}>Isolation Transformer</h3>
        <p style={S.p}>Its primary purpose is not voltage conversion — it is to provide electrical isolation. Noise reduction, eliminating ground loops, protecting sensitive equipment. It is used in some critical Data Center applications.</p>

        <p style={S.noteText}>Actual transformer selection depends on project requirements, load profile, space availability and OEM recommendation.</p>

        <hr style={S.divider} />

        {/* ── SECTION 5: Components ── */}
        <h2 id="key-components" style={S.h1}>Key Components — What Is Inside?</h2>

        <figure style={S.imageFigure}>
          <div style={S.articleImage}>
            <Image src="/images/articles/transformer/transformer-components.png" alt="Labeled diagram of transformer components — core, windings, bushings, tap changer, conservator tank" fill sizes="(max-width: 768px) 100vw, 740px" style={{ objectFit: "cover" }} />
          </div>
          <figcaption style={S.imageCaption}>Main components of a transformer — primary winding, secondary winding, core, bushings, conservator tank, Buchholz relay.</figcaption>
        </figure>

        <WhatYouAreLooking>
          This is a cross-section diagram of an oil-cooled transformer. On top is the conservator tank (cylindrical), on the side are radiator fins (for cooling), and the primary and secondary windings are wrapped around the core. The Buchholz relay is mounted on the conservator pipe.
        </WhatYouAreLooking>

        <h3 style={S.h3}>Core — The Heart of the Transformer</h3>
        <p style={S.p}>It is made of silicon steel laminations (thin plates). The magnetic field of the primary coil reaches the secondary coil through this core.</p>
        <p style={S.p}><strong>Why not solid iron?</strong> Solid iron would have very high eddy current losses — excessive heat. A laminated core dramatically reduces eddy currents and increases efficiency.</p>

        <InsightCard>
          <strong>The transformer "hum" comes from core vibration.</strong> Silicon steel laminations vibrate because of the magnetic field — this is normal. A sudden louder or unusual sound = indicates loose core clamping or overload. Never ignore it.
        </InsightCard>

        <h3 style={S.h3}>Primary Winding (HV Side)</h3>
        <p style={S.p}>Incoming side — this is where the high voltage from the grid enters (11 kV or 33 kV). The primary winding has more turns — because the voltage is higher.</p>

        <h3 style={S.h3}>Secondary Winding (LV Side)</h3>
        <p style={S.p}>Outgoing side — from here, 433V power goes to the LVMDB. The secondary winding has comparatively fewer turns. This turns ratio is what causes the voltage step-down.</p>

        <TurnsRatioCard />

        <h3 style={S.h3}>Bushings</h3>
        <p style={S.p}>Insulated connection points where cables connect to the transformer. The large porcelain or polymer cylinders you see on an outdoor transformer — those are the bushings.</p>

        <WhyThisMatters>
          Very often a transformer fault does not come from the winding — it comes from loose or overheated bushings. That is why bushings are always scanned in IR thermography. A dirty or damaged bushing = flashover risk.
        </WhyThisMatters>

        <figure style={S.imageFigure}>
          <div style={S.articleImage}>
            <Image src="/images/articles/transformer/buchholz-relay.png" alt="Buchholz relay mounted on conservator pipe of oil-cooled transformer at Indian substation" fill sizes="(max-width: 768px) 100vw, 740px" style={{ objectFit: "cover" }} />
          </div>
          <figcaption style={S.imageCaption}>Buchholz Relay — mounted on the conservator pipe, detects internal gas — the transformer's life-saver.</figcaption>
        </figure>

        <WhatYouAreLooking>
          This cylindrical device is mounted on the pipe between the conservator tank and the main transformer tank. Inside is a gas collection chamber — when a fault occurs, gas collects here and triggers an alarm or trip.
        </WhatYouAreLooking>

        <h3 style={S.h3}>Buchholz Relay (Oil-Type Only)</h3>
        <p style={S.p}>This is the most important protection device of an oil-filled transformer. As soon as an internal fault starts inside the transformer, gas starts being generated. The Buchholz relay detects that gas.</p>
        <ul style={S.ul}>
          <li style={S.li}><strong>Alarm (minor gas):</strong> Alerts the engineer — do an inspection</li>
          <li style={S.li}><strong>Trip (major gas):</strong> Transformer automatically isolated</li>
        </ul>

        <InsightCard>
          <strong>Never ignore a Buchholz alarm.</strong> Experienced engineers know this — many catastrophic transformer failures started with just one Buchholz alarm that was acknowledged but not resolved. Collect a gas sample and get it analyzed.
        </InsightCard>

        <h3 style={S.h3}>Temperature Indicators</h3>
        <p style={S.p}><strong>OTI (Oil Temperature Indicator)</strong> — monitors oil temperature, in oil-type transformers. <strong>WTI (Winding Temperature Indicator)</strong> — estimates winding temperature, a better indicator of actual transformer health.</p>
        <p style={S.p}>Typical alarm ~90°C, trip ~110°C — actual values vary as per OEM specification.</p>

        <h3 style={S.h3}>Tap Changer</h3>
        <p style={S.p}>Utility voltage does not always stay exactly the same — slightly higher or slightly lower. A Tap Changer is used in the transformer to fine-tune it.</p>
        <p style={S.p}><strong>OCTC (Off-Circuit):</strong> Shut down, then change — simple, reliable, low cost. Most common in Data Centers. <strong>OLTC (On-Load):</strong> Adjusts voltage without switching off power — expensive, used in large utility substations.</p>

        <h3 style={S.h3}>Conservator Tank + Breather (Oil-Type)</h3>
        <p style={S.p}>Oil expands with heat and contracts when cool. The conservator tank — the cylindrical tank on top of the transformer — manages this volume change. Breather — it contains silica gel that absorbs moisture so that the oil does not get contaminated.</p>

        <EngineerTip>
          Blue silica gel = healthy. If it turns pink = it has absorbed moisture — replace it soon. If ignored, the oil can get contaminated and the BDV test can fail.
        </EngineerTip>

        <hr style={S.divider} />

        {/* ── SECTION 6: Working Principle ── */}
        <h2 id="working-principle" style={S.h1}>Working Principle</h2>

        <p style={S.p}>Let's understand it very simply — the whole transformer works in three steps:</p>

        <FlowDiagram
          caption="Electromagnetic induction — the core principle of a transformer"
          steps={[
            { icon: "⚡", label: "AC Current", sublabel: "Primary coil" },
            { icon: "🧲", label: "Magnetic Field", sublabel: "Changing (AC)" },
            { icon: "⚙️", label: "Iron Core", sublabel: "Conducts flux" },
            { icon: "💡", label: "EMF Induced", sublabel: "Secondary coil" },
            { icon: "🔌", label: "Output 433V", sublabel: "To LVMDB" },
          ]}
        />

        <p style={S.p}><strong>The most interesting thing:</strong> The primary and secondary coils are not physically connected. Power is transferred through the magnetic field. That is why a transformer also provides electrical isolation.</p>
        <p style={S.p}><strong>Energy conservation:</strong> When voltage goes down, current goes up — that is why the cables on the 433V LV side are much thicker than on the 11kV HV side.</p>

        <DCMapNote components={["Transformer Primary", "Transformer Secondary", "LV Switchboard", "Neutral Earthing"]} />

        <hr style={S.divider} />

        {/* ── SECTION 7: Dyn11 ── */}
        <h2 id="dyn11" style={S.h1}>Dyn11 Configuration</h2>

        <p style={S.p}>Dyn11 is written on the transformer nameplate — it tells the connection type and phase shift:</p>
        <ul style={S.ul}>
          <li style={S.li}><strong>D</strong> = Delta connection (Primary / HV side)</li>
          <li style={S.li}><strong>y</strong> = Star connection (Secondary / LV side)</li>
          <li style={S.li}><strong>n</strong> = Neutral wire available</li>
          <li style={S.li}><strong>11</strong> = 30° phase shift (clock analogy — secondary at 11 o&apos;clock position)</li>
        </ul>
        <p style={S.p}>In India, distribution transformers are Dyn11.</p>

        <WhyThisMatters>
          Because a neutral wire is available, single-phase 230V loads (computers, lighting, small equipment) can also run from the same transformer. Load balancing across the three phases is better. Harmonic handling is improved — important for Data Centers.
        </WhyThisMatters>

        <hr style={S.divider} />

        {/* ── SECTION 8: Harmonics ── */}
        <h2 id="harmonics" style={S.h1}>Harmonics — Hidden Problem</h2>

        <p style={S.p}>This is a very important topic for Data Center engineers — and it is often missed.</p>
        <p style={S.p}><strong>Normal power:</strong> Smooth sine wave — perfect clean AC.</p>
        <p style={S.p}><strong>The actual power in a Data Center:</strong> Servers, UPS and SMPS draw distorted current — the waveform gets distorted. This distortion is called <strong>harmonics</strong>.</p>
        <p style={S.p}><strong>Result:</strong> Extra heating in the transformer, even at normal load. People often think the transformer is overloaded — but the load is normal; harmonics are causing the heating.</p>

        <EngineerTip>
          If the transformer is repeatedly getting hot and the load is normal — definitely measure harmonics. Use a K-factor transformer if harmonics are high. The problem may not be in the current alone; it can also be in the waveform quality.
        </EngineerTip>

        <hr style={S.divider} />

        {/* ── SECTION 9: Installation ── */}
        <h2 id="installation" style={S.h1}>Installation Process</h2>

        <figure style={S.imageFigure}>
          <div style={S.articleImage}>
            <Image src="/images/articles/transformer/transformer-installation.png" alt="Crane lifting large transformer at Indian Data Center site during installation" fill sizes="(max-width: 768px) 100vw, 740px" style={{ objectFit: "cover" }} />
          </div>
          <figcaption style={S.imageCaption}>Transformer installation — large units are lifted by crane or hydra; heavy and precise positioning required.</figcaption>
        </figure>

        <h3 style={S.h3}>Step 1: Civil Foundation</h3>
        <p style={S.p}>Oil-type: Reinforced concrete plinth + oil containment bund + drainage. Dry-type: RCC plinth + adequate ventilation + cable access.</p>

        <h3 style={S.h3}>Step 2: Transformer Positioning</h3>
        <p style={S.p}>Large transformers are very heavy — 500 kg to 5,000 kg+. Lift with a crane or hydra. Level mounting is mandatory — tilt is not allowed.</p>

        <h3 style={S.h3}>Step 3: HV Cable Connection</h3>
        <p style={S.p}>The 11 kV cable coming from the RMU terminates on the primary bushings. Stress cone and cable termination kit — same as RMU installation, no shortcuts.</p>

        <h3 style={S.h3}>Step 4: LV Cable Connection</h3>
        <p style={S.p}>From the secondary to the LVMDB. The current is high — cables and busbars are very thick (~1333A on the LV side at 1000 kVA).</p>

        <h3 style={S.h3}>Step 5: Earthing — Three Separate Connections</h3>
        <ul style={S.ul}>
          <li style={S.li}><strong>Body Earth</strong> — transformer tank grounding</li>
          <li style={S.li}><strong>Neutral Earth</strong> — secondary star point grounding</li>
          <li style={S.li}><strong>Cable Screen Earth</strong> — HV cable shield grounding</li>
        </ul>

        <WhyThisMatters>
          Many transformer failures do not come from the winding — they come from poor earthing. Do not share neutral earthing and body earthing — connect them to separate electrodes. Never take earthing lightly.
        </WhyThisMatters>

        <div style={S.learnMore}>
          <TopicLink slug="earthing" label="Learn More: Earthing" variant="inline" />
        </div>

        <hr style={S.divider} />

        {/* ── SECTION 10: Testing ── */}
        <h2 id="testing-commissioning" style={S.h1}>Testing & Commissioning</h2>

        <p style={S.p}>Multiple tests are performed before energizing a transformer. None are skipped.</p>

        <TestingTable />

        <EngineerTip>
          DGA = the MRI scan of a transformer. Dissolved Gas Analysis can detect internal faults before failure happens. This test is mandatory at commissioning and annually — never skip it.
        </EngineerTip>

        <hr style={S.divider} />

        {/* ── SECTION 11: Operation ── */}
        <h2 id="operation" style={S.h1}>Operation</h2>

        <p style={S.p}>A transformer is fully automatic equipment — in normal operation, just monitor it.</p>
        <p style={S.p}><strong>Daily:</strong> Temperature normal, no leakage, no alarm, no unusual sound, fans healthy.</p>
        <p style={S.p}><strong>Weekly:</strong> Visual inspection, load review, thermography check.</p>
        <p style={S.p}><strong>Monthly:</strong> Alarm history review, earthing inspection, SCADA trends analysis.</p>

        <InsightCard>
          Load management is important — a transformer should not be run continuously above its kVA rating. Continuous overload = overheating = insulation degradation = failure. Load monitoring should be part of the daily routine.
        </InsightCard>

        <hr style={S.divider} />

        {/* ── SECTION 12: SCADA ── */}
        <h2 id="scada-bms-monitoring" style={S.h1}>SCADA & BMS Monitoring</h2>

        <p style={S.p}>In modern Data Centers, the transformer is continuously monitored — through SCADA or BMS.</p>

        <MonitoringTable />

        <p style={S.p}>Through SCADA, an engineer can see transformer health from a remote location. Trend analysis — a gradual rise in temperature over months indicates insulation degradation, so action is possible before failure.</p>

        <hr style={S.divider} />

        {/* ── SECTION 13: Maintenance ── */}
        <h2 id="maintenance" style={S.h1}>Maintenance</h2>

        <h3 style={S.h3}>Oil-Type Transformer (Annual)</h3>
        <p style={S.p}>BDV Test, DGA Test, Buchholz Relay Check, Oil Level Check, Thermography, IR Test.</p>

        <h3 style={S.h3}>Dry-Type Transformer (Annual)</h3>
        <p style={S.p}>Dust cleaning (de-energized only — compressed air), Fan inspection, Resin inspection for cracks, Thermography, IR Test.</p>

        <h3 style={S.h3}>Both Types (Every 3-5 Years)</h3>
        <p style={S.p}>Contact resistance test, Turns ratio test, Full cleaning and inspection, Verify tap changer operation.</p>

        <EngineerTip>
          Do not assume everything is fine just by looking at the transformer. Electrical failures do not show up in visual inspection. Testing is mandatory — record a yearly schedule in a system and follow it.
        </EngineerTip>

        <hr style={S.divider} />

        {/* ── SECTION 14: Common Faults ── */}
        <h2 id="common-faults" style={S.h1}>Common Faults</h2>

        <p style={S.p}><strong>Overheating</strong> — The most common. Reasons: Overload, cooling failure, harmonics, blocked ventilation. Indication: Temperature alarm.</p>
        <p style={S.p}><strong>Oil Leakage</strong> (oil-type) — Due to gasket failure or aging. Visual leakage or oil level low alarm.</p>
        <p style={S.p}><strong>Winding Failure</strong> — Severe. Develops after long-term insulation degradation. Do not re-energize without full inspection.</p>
        <p style={S.p}><strong>Bushing Failure</strong> — Contamination or moisture. Creates flashover risk. Early detection is possible through regular thermography.</p>
        <p style={S.p}><strong>Harmonic Heating</strong> — Increasingly common in Data Centers. The load looks normal but the transformer stays hot. Measure harmonics.</p>
        <p style={S.p}><strong>Buchholz False Alarm</strong> — From vibration or an air bubble. Take a gas sample — if it is combustible gas, it is a real fault; if it is air, it is a false trip.</p>

        <hr style={S.divider} />

        {/* ── SECTION 15: Troubleshooting ── */}
        <h2 id="troubleshooting" style={S.h1}>Troubleshooting</h2>

        <FlowDiagram
          caption="High temperature alarm — step-by-step troubleshooting"
          steps={[
            { icon: "🌡️", label: "High Temp Alarm" },
            { icon: "📊", label: "Load Check", sublabel: "Overloaded?" },
            { icon: "💨", label: "Cooling Check", sublabel: "Fans running?" },
            { icon: "🌬️", label: "Ventilation", sublabel: "Blocked?" },
            { icon: "📉", label: "Harmonics", sublabel: "Measure" },
            { icon: "🔬", label: "DGA Test", sublabel: "If all OK" },
          ]}
        />

        <p style={S.p}><strong>Buchholz Alarm:</strong> Collect a gas sample → Get it analyzed → Combustible gas = fault, schedule an outage → Air = likely false alarm (vibration).</p>
        <p style={S.p}><strong>Transformer Trip:</strong> Do not re-energize. Review the relay event log. Identify the cause. Call an OEM expert if a winding fault is suspected.</p>
        <p style={S.p}><strong>Oil Level Low:</strong> Find the leakage source. Top up with the correct grade of degassed oil. Fast leakage = immediate isolation.</p>

        <hr style={S.divider} />

        {/* ── SECTION 16: Failure Scenario ── */}
        <h2 id="failure-scenario" style={S.h1}>Real Failure Scenario</h2>

        <p style={S.p}>4 AM — transformer high temperature trip.</p>

        <FlowDiagram
          caption="4 AM transformer trip — what happened, step by step"
          steps={[
            { icon: "💨", label: "Fan Failed", sublabel: "1 week ago" },
            { icon: "🔔", label: "Alarm Raised" },
            { icon: "✓", label: "Acknowledged", sublabel: "Not fixed" },
            { icon: "📈", label: "Load Increased" },
            { icon: "🌡️", label: "Overheated" },
            { icon: "❌", label: "Transformer Trip" },
            { icon: "🔋", label: "UPS → DG", sublabel: "Service OK" },
          ]}
        />

        <p style={S.p}>There was a high load in the server room all night — batch processing was running. The transformer was running 110% overloaded. The cooling fan had also failed — the alarm had been coming since last week; it was acknowledged but no repair order was created.</p>
        <p style={S.p}>Combined effect — the winding temperature crossed the trip limit. Transformer isolated. The <TopicLink slug="ups" label="UPS" variant="inline" /> came onto battery, the <TopicLink slug="dg-set" label="DG Set" variant="inline" /> started. Switchover to the standby transformer happened — service continued because of the Tier III N+1 design.</p>

        <WhyThisMatters>
          <strong>Root Cause: Not a transformer failure — an Alarm management failure.</strong> Acknowledging an alarm and resolving an alarm — these are two different things. A work order must be created for every alarm and its close-out must be verified.
        </WhyThisMatters>

        <hr style={S.divider} />

        {/* ── SECTION 17: Safety ── */}
        <h2 id="safety-practices" style={S.h1}>Safety Practices</h2>

        <h3 style={S.h3}>Arc Flash Risk</h3>
        <p style={S.p}>While working on the LV side (433V), the arc flash risk is high — the current is high. Full arc flash PPE is mandatory: HRC suit, face shield, insulated gloves.</p>

        <h3 style={S.h3}>Oil Fire Risk (Oil-Type)</h3>
        <p style={S.p}>Oil can ignite during a fault. A CO₂ or dry powder extinguisher nearby is mandatory. Never water on an oil fire — the oil fire spreads.</p>

        <h3 style={S.h3}>Before Any Work — Mandatory Steps</h3>
        <ul style={S.ul}>
          <li style={S.li}>PTW (Permit to Work) mandatory</li>
          <li style={S.li}>HV side: isolate from the RMU</li>
          <li style={S.li}>LV side: isolate from the LVMDB</li>
          <li style={S.li}>Verify both sides are dead (with a voltage indicator)</li>
          <li style={S.li}>Apply earth on both sides</li>
          <li style={S.li}>Complete LOTO (Lockout/Tagout)</li>
        </ul>

        <p style={S.p}><strong>Oil Disposal:</strong> Used transformer oil is hazardous waste — proper licensed disposal is mandatory.</p>

        <hr style={S.divider} />

        {/* ── SECTION 18: OEMs ── */}
        <h2 id="oems-vendors" style={S.h1}>OEMs & Vendors</h2>

        <p style={S.p}>The transformer market in India is well-established — both local and international OEMs are available. CG Power and Kirloskar Electric are very established in India — commonly used in large Data Center projects.</p>

        <OEMTable />

        <p style={S.noteText}>OEM selection depends on project requirements, utility approvals, delivery timeline and budget.</p>

        <hr style={S.divider} />

        {/* ── SECTION 19: Tier III ── */}
        <h2 id="tier-3-design" style={S.h1}>Tier III Design</h2>

        <figure style={S.imageFigure}>
          <div style={S.articleImage}>
            <Image src="/images/articles/transformer/tier3-transformer-layout.png" alt="Two dry-type transformers side by side in Indian Data Center electrical room — N+1 configuration" fill sizes="(max-width: 768px) 100vw, 740px" style={{ objectFit: "cover" }} />
          </div>
          <figcaption style={S.imageCaption}>Tier III — two independent transformers, N+1 design. Maintain one, the other carries the full load.</figcaption>
        </figure>

        <p style={S.p}><strong>N+1 approach:</strong> Two transformers installed — one active, one standby (or both at partial load). If one fails or needs maintenance — the other takes the full load.</p>

        <InsightCard>
          <strong>Important design rule:</strong> Each transformer must have the capacity to carry the full Data Center load independently. Do not design only for 50-50 sharing — if one transformer fails, the other will not be able to take the whole load alone.
        </InsightCard>

        <div style={S.learnMore}>
          <TopicLink slug="dg-set" label="Learn More: DG Set" variant="inline" />
          <TopicLink slug="ups" label="Learn More: UPS" variant="inline" />
        </div>

        <hr style={S.divider} />

        {/* ── SECTION 20: Tier IV ── */}
        <h2 id="tier-4-design" style={S.h1}>Tier IV Design</h2>

        <p style={S.p}><strong>2N approach — both paths active at the same time:</strong></p>

        <ComparisonCard
          tag="Tier III vs Tier IV — Transformer Level"
          leftTitle="Tier III — N+1"
          leftItems={["Two transformers installed", "One active, one standby", "Survives maintenance", "Manual or auto switchover", "Each transformer full load capable"]}
          rightTitle="Tier IV — 2N"
          rightItems={["Two completely independent paths", "Both active at the same time", "Survives faults too", "Server dual PSU takes power from both paths", "Zero downtime — even one failure is not noticed"]}
        />

        <p style={S.p}>Path A: Transformer A → LVMDB A → UPS A → PDU A → Server PSU A</p>
        <p style={S.p}>Path B: Transformer B → LVMDB B → <TopicLink slug="ups" label="UPS B" variant="inline" /> → PDU B → Server PSU B</p>
        <p style={S.p}>If Transformer A fails — the server continues seamlessly from PSU B. Zero downtime.</p>

        <WhyThisMatters>
          Tier III survives maintenance. Tier IV survives faults too. This is the biggest difference — and this is the core promise of Tier IV.
        </WhyThisMatters>

        <hr style={S.divider} />

        {/* ── SECTION 21: Future Trends ── */}
        <h2 id="future-trends" style={S.h1}>Future Trends</h2>

        <p style={S.p}><strong>Dry-Type as Standard:</strong> Oil-cooled outdoor transformers are gradually being replaced by dry-type — for fire safety and environmental reasons.</p>
        <p style={S.p}><strong>Amorphous Core Transformers:</strong> An amorphous metal core in place of normal silicon steel — no-load losses are significantly reduced. They will be increasingly used in future Data Centers.</p>
        <p style={S.p}><strong>Smart Monitoring + Online DGA:</strong> IoT sensors for real-time DGA — the need for manual sampling will reduce. AI-based predictive maintenance will predict faults before they happen.</p>
        <p style={S.p}><strong>BEE Star Ratings (India):</strong> The Bureau of Energy Efficiency is making transformer efficiency standards mandatory — higher rated transformers will give long-term electricity savings.</p>
        <p style={S.p}><strong>AI Data Centers:</strong> Higher power density = larger transformers + better cooling + better monitoring required — transformer technology is also evolving.</p>

        <hr style={S.divider} />

        {/* ── Key Takeaways ── */}
        <h2 id="key-takeaways" style={S.h1}>Key Takeaways</h2>

        <KeyTakeawayCard
          items={[
            "A transformer converts high voltage (11kV/33kV) into low voltage (433V) — it is a mandatory step.",
            "Works only with AC — not with DC.",
            "Dry-type cast resin is preferred in indoor Data Centers — no oil, no fire risk.",
            "No moving parts — a silent, reliable machine.",
            "Overheating is the most common fault — monitor both cooling and load.",
            "The Buchholz relay (oil-type) gives an early warning of internal faults — never ignore it.",
            "N+1 (one standby) in Tier III, 2N (two complete independent paths) in Tier IV.",
            "Use K-factor rated transformers in Data Centers — they handle harmonic loads.",
            "DGA is the most important health test of an oil-type transformer — the MRI scan of the transformer.",
            "Alarm acknowledge ≠ Alarm resolve — this lesson comes from real failures.",
          ]}
        />

        <hr style={S.divider} />

        {/* ── What's Next ── */}
        <div style={S.cardWrap}>
          <div style={{ height: 2, background: "linear-gradient(90deg, #2563EB, #2563EB)" }} />
          <div style={S.cardBodyInsight}>
            <span style={{ ...S.cardLabel, color: "#2563EB" }}>WHAT&apos;S NEXT</span>
            <div style={S.cardContent}>
              After the transformer, 433V power goes to the LVMDB — and from there to the UPS. But what happens if grid power fails? That is exactly the job of the DG Set.
            </div>
            <div style={{ marginTop: 14 }}>
              <TopicLink slug="dg-set" label="Next: DG Set →" variant="inline" />
            </div>
          </div>
        </div>

        <hr style={S.divider} />

        {/* ── Continue Learning ── */}
        <h2 style={S.h1}>Continue Learning</h2>
        <p style={S.p}>The electrical learning path beyond the Transformer — every topic is the next logical step in the Data Center power chain.</p>
        <ContinueLearning />

        <hr style={S.divider} />

        <PrevNextNav />

        <hr style={S.divider} />

        {/* ── FAQ ── */}
        <h2 style={S.h1}>Frequently Asked Questions</h2>
        <FAQSection />

      </ArticleLayout>
    </>
  );
}
