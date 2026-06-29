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
    "Transformer 11kV ko 433V me convert karta hai — oil vs dry type, Buchholz relay, DGA test, Tier III/IV design, Data Center engineer guide Hinglish mein.",
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
    color: "var(--color-text-primary)",
    lineHeight: 1.15,
    marginTop: 64,
    marginBottom: 16,
  } as React.CSSProperties,
  h2: {
    fontFamily: "var(--font-display)",
    fontSize: "clamp(1.2rem, 2vw, 1.5rem)",
    letterSpacing: "0.04em",
    color: "var(--color-text-primary)",
    lineHeight: 1.2,
    marginTop: 56,
    marginBottom: 14,
  } as React.CSSProperties,
  h3: {
    fontFamily: "var(--font-body)",
    fontSize: "1rem",
    fontWeight: 600,
    color: "var(--color-text-primary)",
    lineHeight: 1.3,
    marginTop: 28,
    marginBottom: 10,
  } as React.CSSProperties,
  p: { marginBottom: 16, color: "var(--color-text-secondary)" } as React.CSSProperties,
  ul: {
    paddingLeft: 20,
    marginBottom: 16,
    display: "flex",
    flexDirection: "column" as const,
    gap: 6,
  } as React.CSSProperties,
  li: { color: "var(--color-text-secondary)", lineHeight: 1.65 } as React.CSSProperties,
  divider: {
    border: "none",
    borderTop: "1px solid rgba(0,212,255,0.08)",
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
    background: "var(--color-neon-blue)",
    boxShadow: "0 0 8px rgba(0,212,255,0.5)",
  } as React.CSSProperties,
  cardBodyInsight: {
    background: "rgba(0,212,255,0.035)",
    border: "1px solid rgba(0,212,255,0.16)",
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
    color: "var(--color-text-primary)",
  } as React.CSSProperties,
  takeawayCard: {
    position: "relative" as const,
    borderRadius: 12,
    background: "linear-gradient(135deg, rgba(0,212,255,0.05), rgba(0,255,204,0.03))",
    border: "1px solid rgba(0,212,255,0.16)",
    overflow: "hidden" as const,
    margin: "32px 0",
  } as React.CSSProperties,
  takeawayAccent: {
    height: 2,
    background: "linear-gradient(90deg, var(--color-neon-blue), var(--color-neon-cyan))",
  } as React.CSSProperties,
  takeawayBody: { padding: "22px 24px 24px" } as React.CSSProperties,
  takeawayLabel: {
    display: "inline-block",
    fontFamily: "var(--font-mono)",
    fontSize: 9,
    letterSpacing: "0.26em",
    color: "var(--color-neon-blue)",
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
    color: "var(--color-text-primary)",
  } as React.CSSProperties,
  articleImage: {
    position: "relative",
    width: "100%",
    aspectRatio: "16 / 9",
    borderRadius: 10,
    overflow: "hidden",
    margin: 0,
    border: "1px solid rgba(0,212,255,0.12)",
  } as React.CSSProperties,
  imageFigure: { margin: "8px 0 24px" } as React.CSSProperties,
  imageCaption: {
    fontFamily: "var(--font-body)",
    fontSize: 12.5,
    color: "var(--color-text-muted)",
    textAlign: "center" as const,
    marginTop: 8,
  } as React.CSSProperties,
  noteText: {
    fontFamily: "var(--font-body)",
    fontSize: 13,
    fontStyle: "italic" as const,
    color: "var(--color-text-muted)",
    marginBottom: 16,
    lineHeight: 1.6,
  } as React.CSSProperties,
} as const;

// ─── QuickSummary ─────────────────────────────────────────────────────────────

function QuickSummary() {
  const points = [
    { label: "Kya hai ek line me", text: "Transformer ek electrical machine hai jo high voltage (11kV/33kV) ko low voltage (433V) me convert karta hai — taaki UPS, PDU aur servers safely operate kar sakein." },
    { label: "Data Center me kyun", text: "Grid se aane wali bijli seedhe server me nahi ja sakti. Transformer usse usable voltage par laata hai — bina iske poora downstream chain kuch bhi kaam nahi karega." },
    { label: "Do main types", text: "Oil-cooled (outdoor, economical) aur Dry-type cast resin (indoor, fire-safe). Modern Data Centers me dry-type preferred — koi oil nahi, koi fire risk nahi." },
    { label: "Andar kya hota hai", text: "Do copper coils (primary HV side, secondary LV side) aur beech me iron core. Koi moving part nahi. Electromagnetic induction se kaam karta hai — simple aur reliable." },
    { label: "Tier III / Tier IV me", text: "Tier III: N+1 — ek extra transformer hamesha ready. Tier IV: 2N — do complete independent paths, dono ek saath active, ek fail hone par bhi zero downtime." },
    { label: "Ek important baat", text: "Transformer sirf AC ke saath kaam karta hai — DC ke saath nahi. Isliye transformer UPS se pehle lagta hai. UPS ke andar DC conversion baad me hoti hai." },
  ];
  return (
    <div style={{ position: "relative", borderRadius: 12, overflow: "hidden", margin: "8px 0 32px" }}>
      <div style={{ height: 2, background: "linear-gradient(90deg, var(--color-neon-blue), var(--color-neon-cyan))" }} />
      <div style={{ background: "rgba(0,212,255,0.03)", border: "1px solid rgba(0,212,255,0.14)", borderTop: "none", padding: "20px 22px 22px" }}>
        <span style={{ display: "inline-flex", alignItems: "center", gap: 8, fontFamily: "var(--font-mono)", fontSize: 9, letterSpacing: "0.26em", color: "var(--color-neon-blue)", fontWeight: 600, marginBottom: 16 }}>
          ⚡ QUICK SUMMARY — 2 MINUTE READ
        </span>
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          {points.map((pt, i) => (
            <div key={i} style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
              <span style={{ flexShrink: 0, fontFamily: "var(--font-mono)", fontSize: 9, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--color-neon-cyan)", paddingTop: 3, minWidth: 130 }}>
                {pt.label}
              </span>
              <span style={{ fontFamily: "var(--font-body)", fontSize: 14, lineHeight: 1.65, color: "var(--color-text-secondary)" }}>
                {pt.text}
              </span>
            </div>
          ))}
        </div>
        <div style={{ marginTop: 16, paddingTop: 14, borderTop: "1px solid rgba(0,212,255,0.08)", fontFamily: "var(--font-body)", fontSize: 13, color: "var(--color-text-muted)" }}>
          Bas itna samajh gaye to transformer ka concept clear hai. Deeper jaana ho to neeche poora article hai.
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
        <span style={{ ...S.cardLabel, color: "var(--color-neon-blue)" }}>INSIGHT</span>
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
          Engineer Ki Tip
        </span>
        <div style={{ fontFamily: "var(--font-body)", fontSize: 14, lineHeight: 1.65, color: "var(--color-text-primary)" }}>
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
      <div style={{ height: 2, background: "var(--color-neon-cyan)", boxShadow: "0 0 8px rgba(0,255,204,0.4)" }} />
      <div style={{ background: "rgba(0,255,204,0.04)", border: "1px solid rgba(0,255,204,0.18)", borderTop: "none", padding: "16px 20px 18px" }}>
        <span style={{ display: "block", fontFamily: "var(--font-mono)", fontSize: 9, letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--color-neon-cyan)", fontWeight: 600, marginBottom: 9 }}>
          Why This Matters In A Data Center
        </span>
        <div style={{ fontFamily: "var(--font-body)", fontSize: 14, lineHeight: 1.65, color: "var(--color-text-primary)" }}>
          {children}
        </div>
      </div>
    </div>
  );
}

// ─── WhatYouAreLooking ────────────────────────────────────────────────────────

function WhatYouAreLooking({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ borderRadius: 8, background: "rgba(0,212,255,0.025)", border: "1px dashed rgba(0,212,255,0.2)", padding: "12px 16px", margin: "0 0 24px" }}>
      <span style={{ display: "block", fontFamily: "var(--font-mono)", fontSize: 8.5, letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--color-neon-blue)", fontWeight: 600, marginBottom: 6 }}>
        What You Are Looking At
      </span>
      <div style={{ fontFamily: "var(--font-body)", fontSize: 13, lineHeight: 1.6, color: "var(--color-text-secondary)" }}>
        {children}
      </div>
    </div>
  );
}

// ─── DCMapNote ────────────────────────────────────────────────────────────────

function DCMapNote({ components }: { components: string[] }) {
  return (
    <div style={{ margin: "16px 0 24px" }}>
      <span style={{ display: "block", fontFamily: "var(--font-mono)", fontSize: 8.5, letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--color-text-muted)", marginBottom: 8 }}>
        On The Data Center Map
      </span>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
        {components.map((c) => (
          <span key={c} style={{ fontFamily: "var(--font-body)", fontSize: 12, padding: "4px 10px", borderRadius: 980, background: "rgba(0,212,255,0.05)", border: "1px solid rgba(0,212,255,0.16)", color: "var(--color-text-secondary)" }}>
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
                  <path d="M4 13l5 5L20 6" stroke="var(--color-neon-cyan)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
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
      <div style={{ borderRadius: 10, background: "rgba(0,212,255,0.025)", border: "1px solid rgba(0,212,255,0.10)", padding: "22px 20px" }}>
        <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: 4, justifyContent: "center" }}>
          {steps.map((step, i) => (
            <div key={i} style={{ display: "flex", alignItems: "center" }}>
              <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 6, minWidth: 86, textAlign: "center" }}>
                <span aria-hidden="true" style={{ width: 38, height: 38, borderRadius: "50%", background: "rgba(0,212,255,0.08)", border: "1px solid rgba(0,212,255,0.25)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 17 }}>
                  {step.icon}
                </span>
                <span style={{ fontFamily: "var(--font-body)", fontSize: 12, fontWeight: 600, color: "var(--color-text-primary)", lineHeight: 1.3 }}>
                  {step.label}
                </span>
                {step.sublabel && (
                  <span style={{ fontFamily: "var(--font-mono)", fontSize: 10, color: "var(--color-text-muted)" }}>
                    {step.sublabel}
                  </span>
                )}
              </div>
              {i < steps.length - 1 && (
                <span aria-hidden="true" style={{ fontFamily: "var(--font-mono)", fontSize: 14, color: "var(--color-neon-blue)", margin: "0 4px", opacity: 0.7 }}>
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
    <div style={{ position: "relative", borderRadius: 10, background: "rgba(0,212,255,0.03)", border: "1px solid rgba(0,212,255,0.12)", overflow: "hidden", margin: "20px 0 32px" }}>
      <div style={{ height: 2, background: "var(--color-neon-blue)", opacity: 0.5 }} />
      <div style={{ padding: "20px 22px 22px" }}>
        <span style={{ display: "inline-block", fontFamily: "var(--font-mono)", fontSize: 9, letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--color-neon-blue)", fontWeight: 600, marginBottom: 14 }}>
          {tag}
        </span>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
          <div>
            <span style={{ display: "block", fontFamily: "var(--font-mono)", fontSize: 9, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--color-neon-cyan)", marginBottom: 8 }}>
              {leftTitle}
            </span>
            <ul style={{ listStyle: "none", margin: 0, padding: 0, display: "flex", flexDirection: "column", gap: 6 }}>
              {leftItems.map((a, i) => (
                <li key={i} style={{ fontFamily: "var(--font-body)", fontSize: 13, lineHeight: 1.5, color: "var(--color-text-secondary)" }}>{a}</li>
              ))}
            </ul>
          </div>
          <div>
            <span style={{ display: "block", fontFamily: "var(--font-mono)", fontSize: 9, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--color-neon-blue)", marginBottom: 8 }}>
              {rightTitle}
            </span>
            <ul style={{ listStyle: "none", margin: 0, padding: 0, display: "flex", flexDirection: "column", gap: 6 }}>
              {rightItems.map((d, i) => (
                <li key={i} style={{ fontFamily: "var(--font-body)", fontSize: 13, lineHeight: 1.5, color: "var(--color-text-secondary)" }}>{d}</li>
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
    <div style={{ borderRadius: 10, background: "rgba(0,212,255,0.03)", border: "1px solid rgba(0,212,255,0.16)", overflow: "hidden", margin: "20px 0 28px" }}>
      <div style={{ height: 2, background: "linear-gradient(90deg, var(--color-neon-blue), var(--color-neon-cyan))" }} />
      <div style={{ padding: "20px 22px 22px" }}>
        <span style={{ display: "block", fontFamily: "var(--font-mono)", fontSize: 9, letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--color-neon-blue)", fontWeight: 600, marginBottom: 16 }}>
          Turns Ratio — Golden Rule
        </span>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 24, flexWrap: "wrap", marginBottom: 20 }}>
          <div style={{ textAlign: "center" }}>
            <div style={{ fontFamily: "var(--font-mono)", fontSize: 22, color: "var(--color-neon-blue)", fontWeight: 700, lineHeight: 1 }}>N₁</div>
            <div style={{ borderTop: "2px solid rgba(0,212,255,0.4)", margin: "6px 0" }} />
            <div style={{ fontFamily: "var(--font-mono)", fontSize: 22, color: "var(--color-neon-blue)", fontWeight: 700, lineHeight: 1 }}>N₂</div>
          </div>
          <div style={{ fontFamily: "var(--font-mono)", fontSize: 22, color: "var(--color-text-muted)" }}>=</div>
          <div style={{ textAlign: "center" }}>
            <div style={{ fontFamily: "var(--font-mono)", fontSize: 22, color: "var(--color-neon-cyan)", fontWeight: 700, lineHeight: 1 }}>V₁</div>
            <div style={{ borderTop: "2px solid rgba(0,255,204,0.4)", margin: "6px 0" }} />
            <div style={{ fontFamily: "var(--font-mono)", fontSize: 22, color: "var(--color-neon-cyan)", fontWeight: 700, lineHeight: 1 }}>V₂</div>
          </div>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
          <div style={{ background: "rgba(0,212,255,0.04)", borderRadius: 8, padding: "12px 14px" }}>
            <span style={{ display: "block", fontFamily: "var(--font-mono)", fontSize: 9, color: "var(--color-text-muted)", marginBottom: 6 }}>Example</span>
            <span style={{ fontFamily: "var(--font-body)", fontSize: 13, color: "var(--color-text-secondary)" }}>11000 ÷ 433 = <strong style={{ color: "var(--color-neon-blue)" }}>25.4</strong></span>
            <span style={{ display: "block", fontFamily: "var(--font-body)", fontSize: 12, color: "var(--color-text-muted)", marginTop: 4 }}>Primary me 25× zyada turns</span>
          </div>
          <div style={{ background: "rgba(0,255,204,0.04)", borderRadius: 8, padding: "12px 14px" }}>
            <span style={{ display: "block", fontFamily: "var(--font-mono)", fontSize: 9, color: "var(--color-text-muted)", marginBottom: 6 }}>Current Reversal</span>
            <span style={{ fontFamily: "var(--font-body)", fontSize: 13, color: "var(--color-text-secondary)" }}>Voltage ↓ → Current <strong style={{ color: "var(--color-neon-cyan)" }}>↑</strong></span>
            <span style={{ display: "block", fontFamily: "var(--font-body)", fontSize: 12, color: "var(--color-text-muted)", marginTop: 4 }}>LV cables thick hoti hain</span>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── TestingTable ─────────────────────────────────────────────────────────────

const TESTS = [
  { test: "IR Test (Megger)", checks: "Insulation resistance — HV-to-Earth, LV-to-Earth, HV-to-LV" },
  { test: "Turns Ratio Test (TTR)", checks: "Actual voltage ratio verify — 11000/433 match kare" },
  { test: "Polarity Test", checks: "Parallel operation ke liye critical — galat polarity = severe fault" },
  { test: "Winding Resistance Test", checks: "Loose joints, connection problems detect" },
  { test: "Oil BDV Test", checks: "Oil insulation strength — minimum 60 kV fresh oil (IS 335 / IEC 60296)" },
  { test: "DGA Test", checks: "Dissolved gases analyze — internal fault early detection" },
  { test: "Buchholz Relay Test", checks: "Relay correctly responding to gas/surge" },
  { test: "Temperature Calibration", checks: "Alarm/trip setpoints verify — OEM specification ke anusar" },
];

function TestingTable() {
  return (
    <div style={{ margin: "20px 0 28px", borderRadius: 10, border: "1px solid rgba(0,212,255,0.12)", overflow: "hidden" }}>
      <div style={{ overflowX: "auto" }}>
        <table style={{ width: "100%", borderCollapse: "collapse", minWidth: 520 }}>
          <thead>
            <tr style={{ background: "rgba(0,212,255,0.06)" }}>
              {["Test", "Kya Check Hota Hai"].map((h) => (
                <th key={h} style={{ textAlign: "left", padding: "12px 16px", fontFamily: "var(--font-mono)", fontSize: 10.5, letterSpacing: "0.08em", textTransform: "uppercase", color: "var(--color-neon-blue)", borderBottom: "1px solid rgba(0,212,255,0.14)", whiteSpace: "nowrap" }}>
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {TESTS.map((row, i) => (
              <tr key={row.test} style={{ background: i % 2 === 0 ? "transparent" : "rgba(0,212,255,0.015)" }}>
                <td style={{ padding: "12px 16px", fontFamily: "var(--font-body)", fontSize: 13.5, fontWeight: 600, color: "var(--color-text-primary)", borderBottom: "1px solid rgba(255,255,255,0.04)", whiteSpace: "nowrap" }}>
                  {row.test}
                </td>
                <td style={{ padding: "12px 16px", fontFamily: "var(--font-body)", fontSize: 13, color: "var(--color-text-secondary)", borderBottom: "1px solid rgba(255,255,255,0.04)" }}>
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
  { param: "Winding Temperature", why: "Overheating ka sabse critical indicator" },
  { param: "Oil Temperature", why: "Oil-type me heat stress indicator" },
  { param: "Load Current", why: "Overload detection — kVA rating ke against" },
  { param: "Incoming / Outgoing Voltage", why: "Power quality check" },
  { param: "Cooling Fan Status", why: "Cooling health — failure = overheating risk" },
  { param: "Buchholz Relay Status", why: "Internal fault early warning — kabhi ignore mat karo" },
  { param: "Oil Level", why: "Leakage detect karna (oil-type)" },
  { param: "Protection Relay Status", why: "Healthy hai ya trip hua — real-time visibility" },
];

function MonitoringTable() {
  return (
    <div style={{ margin: "20px 0 28px", borderRadius: 10, border: "1px solid rgba(0,212,255,0.12)", overflow: "hidden" }}>
      <div style={{ overflowX: "auto" }}>
        <table style={{ width: "100%", borderCollapse: "collapse", minWidth: 480 }}>
          <thead>
            <tr style={{ background: "rgba(0,212,255,0.06)" }}>
              {["Parameter", "Kyun Monitor Karte Hain"].map((h) => (
                <th key={h} style={{ textAlign: "left", padding: "12px 16px", fontFamily: "var(--font-mono)", fontSize: 10.5, letterSpacing: "0.08em", textTransform: "uppercase", color: "var(--color-neon-blue)", borderBottom: "1px solid rgba(0,212,255,0.14)" }}>
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {MONITORING.map((row, i) => (
              <tr key={row.param} style={{ background: i % 2 === 0 ? "transparent" : "rgba(0,212,255,0.015)" }}>
                <td style={{ padding: "12px 16px", fontFamily: "var(--font-body)", fontSize: 13.5, fontWeight: 600, color: "var(--color-text-primary)", borderBottom: "1px solid rgba(255,255,255,0.04)", whiteSpace: "nowrap" }}>
                  {row.param}
                </td>
                <td style={{ padding: "12px 16px", fontFamily: "var(--font-body)", fontSize: 13, color: "var(--color-text-secondary)", borderBottom: "1px solid rgba(255,255,255,0.04)" }}>
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
    <div style={{ margin: "20px 0 28px", borderRadius: 10, border: "1px solid rgba(0,212,255,0.12)", overflow: "hidden" }}>
      <div style={{ overflowX: "auto" }}>
        <table style={{ width: "100%", borderCollapse: "collapse", minWidth: 480 }}>
          <thead>
            <tr style={{ background: "rgba(0,212,255,0.06)" }}>
              {["Type", "Common OEMs"].map((h) => (
                <th key={h} style={{ textAlign: "left", padding: "12px 16px", fontFamily: "var(--font-mono)", fontSize: 10.5, letterSpacing: "0.08em", textTransform: "uppercase", color: "var(--color-neon-blue)", borderBottom: "1px solid rgba(0,212,255,0.14)", whiteSpace: "nowrap" }}>
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {OEM_ROWS.map((row, i) => (
              <tr key={row.type} style={{ background: i % 2 === 0 ? "transparent" : "rgba(0,212,255,0.015)" }}>
                <td style={{ padding: "12px 16px", fontFamily: "var(--font-body)", fontSize: 13.5, fontWeight: 600, color: "var(--color-text-primary)", borderBottom: "1px solid rgba(255,255,255,0.04)", whiteSpace: "nowrap" }}>
                  {row.type}
                </td>
                <td style={{ padding: "12px 16px", fontFamily: "var(--font-body)", fontSize: 13, color: "var(--color-text-secondary)", borderBottom: "1px solid rgba(255,255,255,0.04)" }}>
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
      <div style={{ borderRadius: 10, background: "rgba(0,212,255,0.03)", border: "1px solid rgba(0,212,255,0.12)", padding: "14px 16px" }}>
        <span style={{ display: "block", fontFamily: "var(--font-mono)", fontSize: 8.5, letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--color-text-muted)", marginBottom: 8 }}>
          ← Previous
        </span>
        <TopicLink slug="rmu" label="RMU" variant="inline" />
      </div>
      <div style={{ borderRadius: 10, background: "rgba(0,212,255,0.03)", border: "1px solid rgba(0,212,255,0.12)", padding: "14px 16px", textAlign: "right" }}>
        <span style={{ display: "block", fontFamily: "var(--font-mono)", fontSize: 8.5, letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--color-text-muted)", marginBottom: 8 }}>
          Next →
        </span>
        <TopicLink slug="dg-set" label="DG Set" variant="inline" />
      </div>
    </div>
  );
}

// ─── FAQ ──────────────────────────────────────────────────────────────────────

const FAQS = [
  { q: "Transformer aur Inverter me kya difference hai?", a: "Transformer AC voltage convert karta hai — AC to AC, bina DC bane. Inverter DC ko AC me convert karta hai. Data Center me pehle transformer (11kV → 433V), phir UPS ke andar inverter (DC → AC)." },
  { q: "Transformer 'hum' kyun karta hai?", a: "Core ki silicon steel laminations magnetic field ki wajah se vibrate karti hain — isi se gentle humming aati hai. Normal hai. Achanak zyada ya unusual sound = fault ya overload indicate karta hai." },
  { q: "1000 kVA transformer kitne servers handle kar sakta hai?", a: "Rough estimate: 1000 kVA × 0.8 PF = 800 kW. Modern servers 200–500W each = 1600 to 4000 servers approximately. Actual calculation IT load, PUE aur UPS efficiency par depend karti hai." },
  { q: "Kya transformer bypass kar sakte hain?", a: "Normally nahi — voltage match nahi hogi. Maintenance ke liye isolate kiya jata hai, bypass nahi. Isliye N+1 ya 2N transformer design hota hai." },
  { q: "Dry Type ya Oil Type — kaunsa better?", a: "Indoor installations me Dry Type preferred — fire-safe, low maintenance, koi oil nahi. Outdoor high-capacity projects me Oil Type economical ho sakta hai. Selection project requirements par depend karta hai." },
  { q: "DGA test itna important kyun hai?", a: "DGA transformer ka MRI scan hai. Internal fault develop ho raha ho to oil me specific gases dissolve hone lagte hain — hydrogen, methane, acetylene etc. DGA ye gases detect karta hai failure hone se pehle." },
];

function FAQSection() {
  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      {FAQS.map((item, i) => (
        <div key={i} style={{ padding: "18px 0", borderBottom: i === FAQS.length - 1 ? "none" : "1px solid rgba(0,212,255,0.08)" }}>
          <p style={{ fontFamily: "var(--font-body)", fontSize: 15, fontWeight: 600, color: "var(--color-text-primary)", marginBottom: 8 }}>{item.q}</p>
          <p style={{ fontFamily: "var(--font-body)", fontSize: 14, lineHeight: 1.65, color: "var(--color-text-secondary)", margin: 0 }}>{item.a}</p>
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
      <ArticleLayout slug="transformer" headings={HEADINGS} readingTimeMinutes={18}>

        {/* ── Hero Image ── */}
        <figure style={S.imageFigure}>
          <div style={S.articleImage}>
            <Image src="/images/articles/transformer/transformer-overview.png" alt="Dry-type cast resin transformer installed in an Indian Data Center electrical room" fill sizes="(max-width: 768px) 100vw, 740px" style={{ objectFit: "cover" }} />
          </div>
          <figcaption style={S.imageCaption}>Transformer — Data Center electrical chain ka voltage conversion point, 11kV ko 433V banata hai.</figcaption>
        </figure>

        <WhatYouAreLooking>
          Ye ek dry-type cast resin transformer hai — indoor electrical room me install hota hai. Koi oil nahi, koi leakage risk nahi. Copper coils epoxy resin me sealed hain. Bahar se simple metal box lagta hai, andar poori power conversion magic hoti hai.
        </WhatYouAreLooking>

        {/* ── Quick Summary ── */}
        <QuickSummary />

        <hr style={S.divider} />

        {/* ── Intro ── */}
        <p style={S.p}>Ab tak humne <TopicLink slug="grid-supply" label="Grid Supply" variant="inline" />, <TopicLink slug="ht-yard" label="HT Yard" variant="inline" /> aur <TopicLink slug="rmu" label="RMU" variant="inline" /> samjha.</p>
        <p style={S.p}>Ab electrical chain ka agla aur sabse important component aata hai — <strong>Transformer.</strong></p>
        <p style={S.p}>Grid se jo power Data Center tak pahunchti hai wo aam taur par 11 kV ya 33 kV par hoti hai. Ye voltage server rack ko nahi di ja sakti. Na UPS ko. Na PDU ko.</p>
        <p style={S.p}>Transformer high voltage ko low, usable voltage me convert karta hai — baaki sab iske baad shuru hota hai.</p>

        <FlowDiagram
          caption="Data Center power chain mein transformer ki position"
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

        <p style={S.p}><strong>Ek line me:</strong> Transformer ek voltage converter hai.</p>
        <p style={S.p}>Jaise phone charger 220V wall socket se 5V USB banata hai — bilkul waise hi transformer 11,000V ko 433V banata hai. Farq sirf size aur scale ka hai.</p>
        <p style={S.p}><strong>Static ka matlab:</strong> Iske andar koi bhi moving part nahi hota. Koi motor nahi, koi shaft nahi. Phir bhi ye power system ka sabse critical equipment hai.</p>
        <p style={S.p}><strong>Sirf AC me kaam karta hai:</strong> Transformer DC ke saath kaam nahi karta — sirf AC se. Isi wajah se transformer UPS se pehle lagta hai. UPS ke andar DC conversion baad me hoti hai.</p>

        <DCMapNote components={["Transformer", "LV Switchboard", "HV Feeder"]} />

        <hr style={S.divider} />

        {/* ── SECTION 2: Why ── */}
        <h2 id="why-required" style={S.h1}>Why Is Transformer Required?</h2>

        <p style={S.p}>Sochiye ghar ke bahar municipality ki water line bahut high pressure par chal rahi hai. Agar wahi pressure seedha kitchen ke tap pe de diya jaye — pipe toot jayegi. Beech me ek pressure regulator lagaya jata hai.</p>
        <p style={S.p}><strong>Transformer electrical duniya me bilkul yahi kaam karta hai.</strong></p>
        <p style={S.p}>Grid high voltage par power bhejti hai kyunki current kam rehti hai aur transmission losses minimize hoti hain. Lekin end equipment ko low, safe voltage chahiye. Transformer isi conversion ko perform karta hai.</p>

        <WhyThisMatters>
          Agar transformer fail ho jaye — poori downstream electrical chain impact ho jati hai. UPS, PDU, servers — sab band ho jaate hain. Isi wajah se transformer redundancy (N+1 ya 2N) Data Center design ka core principle hai.
        </WhyThisMatters>

        <hr style={S.divider} />

        {/* ── SECTION 3: Real Example ── */}
        <h2 id="real-data-center-example" style={S.h1}>Real Data Center Example</h2>

        <p style={S.p}>Maan lo ek Tier III Data Center hai — utility se 11 kV incoming, total load 1200 kW, transformer rating 1600 kVA.</p>
        <p style={S.p}>1600 kVA isliye — transformer ko rated load se zyada capacity rakhni padti hai overload margin ke liye. Agar transformer exactly 1200 kW rated hota to thoda bhi extra load aane par overheat karta.</p>

        <InsightCard>
          <strong>kVA aur kW — dono same nahi hain.</strong> Transformer kVA me rated hota hai, kW me nahi. kW = kVA × Power Factor. Data Center me typically 0.8-0.9 PF hoti hai. 1600 kVA transformer at 0.9 PF = 1440 kW usable. Isliye kVA rating hamesha kW load se zyada rakhte hain.
        </InsightCard>

        <hr style={S.divider} />

        {/* ── SECTION 4: Types ── */}
        <h2 id="types-of-transformers" style={S.h1}>Types of Transformers</h2>

        <figure style={S.imageFigure}>
          <div style={S.articleImage}>
            <Image src="/images/articles/transformer/oil-vs-dry-type.png" alt="Oil-cooled transformer outdoor vs dry-type cast resin transformer indoor — side by side comparison" fill sizes="(max-width: 768px) 100vw, 740px" style={{ objectFit: "cover" }} />
          </div>
          <figcaption style={S.imageCaption}>Oil-cooled (outdoor, bade aur heavy) vs Dry-type cast resin (indoor, compact, fire-safe).</figcaption>
        </figure>

        <WhatYouAreLooking>
          Left side: oil-cooled transformer — conservator tank upar, radiator fins side me, outdoor installation. Right side: dry-type cast resin — compact, coils visible (epoxy me sealed), indoor electrical room me installed.
        </WhatYouAreLooking>

        <ComparisonCard
          tag="Oil-Cooled vs Dry-Type"
          leftTitle="Oil-Cooled Transformer"
          leftItems={["Mineral oil — cooling + insulation", "High capacity available", "Economical for large ratings", "Outdoor ya dedicated fire-rated room", "Oil leakage + fire risk", "Regular oil testing required"]}
          rightTitle="Dry-Type Cast Resin"
          rightItems={["Koi oil nahi — epoxy resin sealed", "Fire resistant — indoor safe", "Low maintenance", "Compact — server room ke paas possible", "Higher initial cost", "Electrical room ventilation critical"]}
        />

        <EngineerTip>
          Agar transformer electrical room ke andar install hai aur oil containment bund nahi hai — Dry Type Cast Resin automatically preferred choice hai. Outdoor aur bahut high capacity projects me Oil-Cooled economical hota hai. Actual selection project requirements, budget aur site constraints par depend karta hai.
        </EngineerTip>

        <h3 style={S.h3}>K-Factor Transformer</h3>
        <p style={S.p}>Ye normal transformer ka special version hai. Data Centers me servers, UPS aur SMPS loads harmonics generate karte hain — waveform distort ho jaati hai. Ye harmonics transformer me extra heat cause karti hain, even normal load par.</p>
        <p style={S.p}>K-Factor Transformer specially harmonic-rich environments ke liye design kiya jata hai. AI Data Centers aur high-density compute me inka use rapidly badh raha hai.</p>

        <h3 style={S.h3}>Isolation Transformer</h3>
        <p style={S.p}>Iska primary purpose voltage conversion nahi — electrical isolation provide karna hai. Noise reduction, ground loops eliminate karna, sensitive equipment protect karna. Kuch critical Data Center applications me use hota hai.</p>

        <p style={S.noteText}>Actual transformer selection project requirements, load profile, space availability aur OEM recommendation par depend karta hai.</p>

        <hr style={S.divider} />

        {/* ── SECTION 5: Components ── */}
        <h2 id="key-components" style={S.h1}>Key Components — Andar Kya Hota Hai?</h2>

        <figure style={S.imageFigure}>
          <div style={S.articleImage}>
            <Image src="/images/articles/transformer/transformer-components.png" alt="Labeled diagram of transformer components — core, windings, bushings, tap changer, conservator tank" fill sizes="(max-width: 768px) 100vw, 740px" style={{ objectFit: "cover" }} />
          </div>
          <figcaption style={S.imageCaption}>Transformer ke main components — primary winding, secondary winding, core, bushings, conservator tank, Buchholz relay.</figcaption>
        </figure>

        <WhatYouAreLooking>
          Ye ek oil-cooled transformer ka cross-section diagram hai. Upar conservator tank (cylindrical), side me radiator fins (cooling ke liye), primary aur secondary windings core ke around wrapped hain. Buchholz relay conservator pipe par laga hota hai.
        </WhatYouAreLooking>

        <h3 style={S.h3}>Core — Transformer Ka Dil</h3>
        <p style={S.p}>Silicon steel ki laminations (patli-patli plates) se bana hota hai. Primary coil ka magnetic field secondary coil tak isi core ke through pahunchta hai.</p>
        <p style={S.p}><strong>Solid iron kyun nahi?</strong> Solid iron me bahut zyada eddy current losses aate — excessive heat. Laminated core eddy currents dramatically reduce karta hai aur efficiency badhata hai.</p>

        <InsightCard>
          <strong>Transformer ka "hum" — core vibration ki wajah se aata hai.</strong> Silicon steel laminations magnetic field ki wajah se vibrate karti hain — ye normal hai. Achanak zyada ya unusual sound = loose core clamping ya overload indicate karta hai. Kabhi ignore mat karo.
        </InsightCard>

        <h3 style={S.h3}>Primary Winding (HV Side)</h3>
        <p style={S.p}>Incoming side — yahan Grid se aane wali high voltage enter karti hai (11 kV ya 33 kV). Primary winding me turns zyada hoti hain — kyunki voltage zyada hoti hai.</p>

        <h3 style={S.h3}>Secondary Winding (LV Side)</h3>
        <p style={S.p}>Outgoing side — yahan se 433V power LVMDB tak jaati hai. Secondary winding me turns comparatively kam hoti hain. Isi turns ratio ki wajah se voltage step-down hoti hai.</p>

        <TurnsRatioCard />

        <h3 style={S.h3}>Bushings</h3>
        <p style={S.p}>Insulated connection points jahan cables transformer se connect hoti hain. Outdoor transformer pe jo bade-bade porcelain ya polymer cylinders dikhte hain — wahi bushings hain.</p>

        <WhyThisMatters>
          Bahut baar transformer fault winding se nahi — loose ya overheated bushings se hota hai. Isi wajah se IR thermography me bushings hamesha scan ki jati hain. Dirty ya damaged bushing = flashover risk.
        </WhyThisMatters>

        <figure style={S.imageFigure}>
          <div style={S.articleImage}>
            <Image src="/images/articles/transformer/buchholz-relay.png" alt="Buchholz relay mounted on conservator pipe of oil-cooled transformer at Indian substation" fill sizes="(max-width: 768px) 100vw, 740px" style={{ objectFit: "cover" }} />
          </div>
          <figcaption style={S.imageCaption}>Buchholz Relay — conservator pipe par mounted, internal gas detect karta hai — transformer ka life-saver.</figcaption>
        </figure>

        <WhatYouAreLooking>
          Ye cylindrical device conservator tank aur main transformer tank ke beech ki pipe par laga hota hai. Andar gas collection chamber hai — fault hone par gas yahaan collect hoti hai aur alarm ya trip trigger hota hai.
        </WhatYouAreLooking>

        <h3 style={S.h3}>Buchholz Relay (Oil-Type Only)</h3>
        <p style={S.p}>Ye oil-filled transformer ka sabse important protection device hai. Transformer ke andar internal fault start hote hi gas generate honi lagti hai. Buchholz relay us gas ko detect karta hai.</p>
        <ul style={S.ul}>
          <li style={S.li}><strong>Alarm (minor gas):</strong> Engineer ko alert — inspection karo</li>
          <li style={S.li}><strong>Trip (major gas):</strong> Transformer automatically isolate</li>
        </ul>

        <InsightCard>
          <strong>Buchholz alarm kabhi ignore mat karo.</strong> Experienced engineers ye jaante hain — kai catastrophic transformer failures ki shuruaat sirf ek Buchholz alarm se hoti thi jo acknowledge hua lekin resolve nahi hua. Gas sample collect karo aur analysis karao.
        </InsightCard>

        <h3 style={S.h3}>Temperature Indicators</h3>
        <p style={S.p}><strong>OTI (Oil Temperature Indicator)</strong> — oil temperature monitor, oil-type transformers me. <strong>WTI (Winding Temperature Indicator)</strong> — winding temperature estimate, actual transformer health ka better indicator.</p>
        <p style={S.p}>Typical alarm ~90°C, trip ~110°C — actual values OEM specification ke anusar vary karte hain.</p>

        <h3 style={S.h3}>Tap Changer</h3>
        <p style={S.p}>Utility voltage hamesha exactly same nahi rehti — thodi zyada ya thodi kam. Transformer me fine-tune karne ke liye Tap Changer use hota hai.</p>
        <p style={S.p}><strong>OCTC (Off-Circuit):</strong> Shutdown karo phir change karo — simple, reliable, low cost. Data Centers me most common. <strong>OLTC (On-Load):</strong> Bijli band kiye bina voltage adjust — expensive, large utility substations me.</p>

        <h3 style={S.h3}>Conservator Tank + Breather (Oil-Type)</h3>
        <p style={S.p}>Oil heat par expand, thandi par contract karti hai. Conservator tank — transformer upar ka cylindrical tank — ye volume change manage karta hai. Breather — silica gel andar hoti hai jo moisture absorb karti hai taaki oil contaminate na ho.</p>

        <EngineerTip>
          Blue silica gel = healthy. Pink ho jaye = moisture absorb ho chuki — replace karo jaldi. Ignore kiya to oil contaminate ho sakti hai aur BDV test fail ho sakta hai.
        </EngineerTip>

        <hr style={S.divider} />

        {/* ── SECTION 6: Working Principle ── */}
        <h2 id="working-principle" style={S.h1}>Working Principle</h2>

        <p style={S.p}>Bilkul simple samajhte hain — teen steps me poora transformer kaam karta hai:</p>

        <FlowDiagram
          caption="Electromagnetic induction — transformer ka core principle"
          steps={[
            { icon: "⚡", label: "AC Current", sublabel: "Primary coil" },
            { icon: "🧲", label: "Magnetic Field", sublabel: "Changing (AC)" },
            { icon: "⚙️", label: "Iron Core", sublabel: "Conducts flux" },
            { icon: "💡", label: "EMF Induced", sublabel: "Secondary coil" },
            { icon: "🔌", label: "Output 433V", sublabel: "To LVMDB" },
          ]}
        />

        <p style={S.p}><strong>Sabse interesting baat:</strong> Primary aur secondary coils physically connected nahi hoti. Power magnetic field ke through transfer hoti hai. Isi wajah se transformer electrical isolation bhi provide karta hai.</p>
        <p style={S.p}><strong>Energy conservation:</strong> Voltage ghatne par current badhti hai — isi wajah se 433V LV side ki cables 11kV HV side se bahut thick hoti hain.</p>

        <DCMapNote components={["Transformer Primary", "Transformer Secondary", "LV Switchboard", "Neutral Earthing"]} />

        <hr style={S.divider} />

        {/* ── SECTION 7: Dyn11 ── */}
        <h2 id="dyn11" style={S.h1}>Dyn11 Configuration</h2>

        <p style={S.p}>Transformer nameplate par Dyn11 likha hota hai — ye connection type aur phase shift batata hai:</p>
        <ul style={S.ul}>
          <li style={S.li}><strong>D</strong> = Delta connection (Primary / HV side)</li>
          <li style={S.li}><strong>y</strong> = Star connection (Secondary / LV side)</li>
          <li style={S.li}><strong>n</strong> = Neutral wire available</li>
          <li style={S.li}><strong>11</strong> = 30° phase shift (clock analogy — secondary at 11 o&apos;clock position)</li>
        </ul>
        <p style={S.p}>India me distribution transformers Dyn11 me hote hain.</p>

        <WhyThisMatters>
          Neutral wire available hone se single-phase 230V loads (computers, lighting, small equipment) bhi usi transformer se run ho sakte hain. Better load balancing across three phases hoti hai. Harmonic handling improved hoti hai — Data Centers ke liye important.
        </WhyThisMatters>

        <hr style={S.divider} />

        {/* ── SECTION 8: Harmonics ── */}
        <h2 id="harmonics" style={S.h1}>Harmonics — Hidden Problem</h2>

        <p style={S.p}>Ye Data Center engineers ke liye bahut important topic hai — aur aksar miss ho jata hai.</p>
        <p style={S.p}><strong>Normal bijli:</strong> Smooth sine wave — perfect clean AC.</p>
        <p style={S.p}><strong>Data Center ki actual bijli:</strong> Servers, UPS, SMPS distorted current lete hain — waveform distort ho jaati hai. Is distortion ko <strong>harmonics</strong> kehte hain.</p>
        <p style={S.p}><strong>Result:</strong> Extra heating transformer me, even normal load par. Aksar log sochte hain transformer overload hua — lekin load normal hota hai, harmonics heating cause kar rahi hoti hain.</p>

        <EngineerTip>
          Agar transformer repeatedly garam ho raha hai aur load normal hai — harmonics measurement zarur karo. K-factor transformer use karo agar harmonics high hain. Problem current me nahi, waveform quality me bhi ho sakti hai.
        </EngineerTip>

        <hr style={S.divider} />

        {/* ── SECTION 9: Installation ── */}
        <h2 id="installation" style={S.h1}>Installation Process</h2>

        <figure style={S.imageFigure}>
          <div style={S.articleImage}>
            <Image src="/images/articles/transformer/transformer-installation.png" alt="Crane lifting large transformer at Indian Data Center site during installation" fill sizes="(max-width: 768px) 100vw, 740px" style={{ objectFit: "cover" }} />
          </div>
          <figcaption style={S.imageCaption}>Transformer installation — large units crane ya hydra se lift kiye jaate hain, heavy aur precise positioning required.</figcaption>
        </figure>

        <h3 style={S.h3}>Step 1: Civil Foundation</h3>
        <p style={S.p}>Oil-type: Reinforced concrete plinth + oil containment bund + drainage. Dry-type: RCC plinth + adequate ventilation + cable access.</p>

        <h3 style={S.h3}>Step 2: Transformer Positioning</h3>
        <p style={S.p}>Large transformers bahut heavy hote hain — 500 kg se 5,000 kg+. Crane ya hydra se lift karo. Level mounting mandatory — tilt allowed nahi.</p>

        <h3 style={S.h3}>Step 3: HV Cable Connection</h3>
        <p style={S.p}>RMU se aane wali 11 kV cable primary bushings par terminate hoti hai. Stress cone aur cable termination kit — same as RMU installation, koi shortcut nahi.</p>

        <h3 style={S.h3}>Step 4: LV Cable Connection</h3>
        <p style={S.p}>Secondary se LVMDB tak. Current zyada hai — cables aur busbars bahut thick hote hain (1000 kVA par LV side ~1333A).</p>

        <h3 style={S.h3}>Step 5: Earthing — Teen Alag Connections</h3>
        <ul style={S.ul}>
          <li style={S.li}><strong>Body Earth</strong> — transformer tank grounding</li>
          <li style={S.li}><strong>Neutral Earth</strong> — secondary star point grounding</li>
          <li style={S.li}><strong>Cable Screen Earth</strong> — HV cable shield grounding</li>
        </ul>

        <WhyThisMatters>
          Kai transformer failures winding se nahi — poor earthing se hote hain. Neutral earthing aur body earthing ko share mat karo — inhe alag electrodes se connect karo. Earthing kabhi lightly nahi lena.
        </WhyThisMatters>

        <div style={S.learnMore}>
          <TopicLink slug="earthing" label="Learn More: Earthing" variant="inline" />
        </div>

        <hr style={S.divider} />

        {/* ── SECTION 10: Testing ── */}
        <h2 id="testing-commissioning" style={S.h1}>Testing & Commissioning</h2>

        <p style={S.p}>Transformer energize karne se pehle multiple tests perform kiye jate hain. Koi bhi skip nahi hota.</p>

        <TestingTable />

        <EngineerTip>
          DGA = Transformer ka MRI scan. Dissolved Gas Analysis internal faults ko failure hone se pehle detect kar sakta hai. Ye test commissioning par aur annually mandatory hai — kabhi skip mat karo.
        </EngineerTip>

        <hr style={S.divider} />

        {/* ── SECTION 11: Operation ── */}
        <h2 id="operation" style={S.h1}>Operation</h2>

        <p style={S.p}>Transformer fully automatic equipment hai — normal operation me sirf monitor karo.</p>
        <p style={S.p}><strong>Daily:</strong> Temperature normal, no leakage, no alarm, no unusual sound, fans healthy.</p>
        <p style={S.p}><strong>Weekly:</strong> Visual inspection, load review, thermography check.</p>
        <p style={S.p}><strong>Monthly:</strong> Alarm history review, earthing inspection, SCADA trends analysis.</p>

        <InsightCard>
          Load management important hai — transformer ko continuously uske kVA rating ke upar nahi chalana chahiye. Continuous overload = overheating = insulation degradation = failure. Load monitoring daily routine ka part hona chahiye.
        </InsightCard>

        <hr style={S.divider} />

        {/* ── SECTION 12: SCADA ── */}
        <h2 id="scada-bms-monitoring" style={S.h1}>SCADA & BMS Monitoring</h2>

        <p style={S.p}>Modern Data Centers me transformer continuously monitor kiya jata hai — SCADA ya BMS ke through.</p>

        <MonitoringTable />

        <p style={S.p}>SCADA se engineer remote location se transformer health dekh sakta hai. Trend analysis — temperature ka gradual rise over months insulation degradation indicate karta hai, failure se pehle action possible hota hai.</p>

        <hr style={S.divider} />

        {/* ── SECTION 13: Maintenance ── */}
        <h2 id="maintenance" style={S.h1}>Maintenance</h2>

        <h3 style={S.h3}>Oil-Type Transformer (Annual)</h3>
        <p style={S.p}>BDV Test, DGA Test, Buchholz Relay Check, Oil Level Check, Thermography, IR Test.</p>

        <h3 style={S.h3}>Dry-Type Transformer (Annual)</h3>
        <p style={S.p}>Dust cleaning (de-energized only — compressed air), Fan inspection, Resin inspection for cracks, Thermography, IR Test.</p>

        <h3 style={S.h3}>Both Types (Every 3-5 Years)</h3>
        <p style={S.p}>Contact resistance test, Turns ratio test, Full cleaning aur inspection, Tap changer operation verify.</p>

        <EngineerTip>
          Sirf transformer dekh kar assume mat karo ki sab theek hai. Electrical failures visual inspection me dikhte nahi. Testing mandatory hai — yearly schedule ek system me record karo aur follow karo.
        </EngineerTip>

        <hr style={S.divider} />

        {/* ── SECTION 14: Common Faults ── */}
        <h2 id="common-faults" style={S.h1}>Common Faults</h2>

        <p style={S.p}><strong>Overheating</strong> — Sabse common. Reasons: Overload, cooling failure, harmonics, blocked ventilation. Indication: Temperature alarm.</p>
        <p style={S.p}><strong>Oil Leakage</strong> (oil-type) — Gasket failure ya aging se. Visual leakage ya oil level low alarm.</p>
        <p style={S.p}><strong>Winding Failure</strong> — Severe. Long-term insulation degradation ke baad develop hota hai. Do not re-energize without full inspection.</p>
        <p style={S.p}><strong>Bushing Failure</strong> — Contamination ya moisture. Flashover risk create karta hai. Regular thermography se early detect possible hai.</p>
        <p style={S.p}><strong>Harmonic Heating</strong> — Data Centers me increasingly common. Load normal dikhta hai lekin transformer garm rehta hai. Harmonics measurement karo.</p>
        <p style={S.p}><strong>Buchholz False Alarm</strong> — Vibration ya air bubble se. Gas sample lo — combustible gas hai to real fault, air hai to false trip.</p>

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

        <p style={S.p}><strong>Buchholz Alarm:</strong> Gas sample collect karo → Analysis karao → Combustible gas = fault hai, schedule outage → Air = likely false alarm (vibration).</p>
        <p style={S.p}><strong>Transformer Trip:</strong> Do not re-energize. Relay event log review karo. Cause identify karo. OEM expert call karo agar winding fault suspect hai.</p>
        <p style={S.p}><strong>Oil Level Low:</strong> Leakage source dhundo. Correct grade degassed oil se top up karo. Fast leakage = immediate isolation.</p>

        <hr style={S.divider} />

        {/* ── SECTION 16: Failure Scenario ── */}
        <h2 id="failure-scenario" style={S.h1}>Real Failure Scenario</h2>

        <p style={S.p}>Subah 4 baje — transformer high temperature trip.</p>

        <FlowDiagram
          caption="4 AM transformer trip — kya hua step by step"
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

        <p style={S.p}>Raat bhar server room me zyada load tha — batch processing chal rahi thi. Transformer 110% overloaded chal raha tha. Cooling fan bhi fail tha — pichle hafte se alarm aa raha tha, acknowledge hua lekin repair order create nahi hua.</p>
        <p style={S.p}>Combined effect — winding temperature trip limit cross kar gaya. Transformer isolate. <TopicLink slug="ups" label="UPS" variant="inline" /> battery pe aaya, <TopicLink slug="dg-set" label="DG Set" variant="inline" /> start hua. Standby transformer switchover hua — Tier III N+1 design ki wajah se service continue.</p>

        <WhyThisMatters>
          <strong>Root Cause: Transformer failure nahi — Alarm management failure.</strong> Alarm acknowledge karna aur alarm resolve karna — dono alag cheezein hain. Har alarm ka work order create hona chahiye aur close-out verify hona chahiye.
        </WhyThisMatters>

        <hr style={S.divider} />

        {/* ── SECTION 17: Safety ── */}
        <h2 id="safety-practices" style={S.h1}>Safety Practices</h2>

        <h3 style={S.h3}>Arc Flash Risk</h3>
        <p style={S.p}>LV side (433V) par kaam karte waqt arc flash risk high hota hai — current zyada hoti hai. Full arc flash PPE mandatory: HRC suit, face shield, insulated gloves.</p>

        <h3 style={S.h3}>Oil Fire Risk (Oil-Type)</h3>
        <p style={S.p}>Fault pe oil ignite ho sakta hai. CO₂ ya dry powder extinguisher nearby mandatory. Kabhi water on oil fire nahi — oil fire spread ho jaata hai.</p>

        <h3 style={S.h3}>Before Any Work — Mandatory Steps</h3>
        <ul style={S.ul}>
          <li style={S.li}>PTW (Permit to Work) mandatory</li>
          <li style={S.li}>HV side: RMU se isolate</li>
          <li style={S.li}>LV side: LVMDB se isolate</li>
          <li style={S.li}>Dono sides dead verify karo (voltage indicator se)</li>
          <li style={S.li}>Earth apply karo dono sides</li>
          <li style={S.li}>LOTO (Lockout/Tagout) complete karo</li>
        </ul>

        <p style={S.p}><strong>Oil Disposal:</strong> Used transformer oil hazardous waste hai — proper licensed disposal mandatory.</p>

        <hr style={S.divider} />

        {/* ── SECTION 18: OEMs ── */}
        <h2 id="oems-vendors" style={S.h1}>OEMs & Vendors</h2>

        <p style={S.p}>India me transformer market well-established hai — local aur international dono OEMs available hain. CG Power aur Kirloskar Electric India me bahut established hain — large Data Center projects me commonly use hote hain.</p>

        <OEMTable />

        <p style={S.noteText}>OEM selection project requirements, utility approvals, delivery timeline aur budget par depend karta hai.</p>

        <hr style={S.divider} />

        {/* ── SECTION 19: Tier III ── */}
        <h2 id="tier-3-design" style={S.h1}>Tier III Design</h2>

        <figure style={S.imageFigure}>
          <div style={S.articleImage}>
            <Image src="/images/articles/transformer/tier3-transformer-layout.png" alt="Two dry-type transformers side by side in Indian Data Center electrical room — N+1 configuration" fill sizes="(max-width: 768px) 100vw, 740px" style={{ objectFit: "cover" }} />
          </div>
          <figcaption style={S.imageCaption}>Tier III — do independent transformers, N+1 design. Ek maintain karo, doosra full load carry karta hai.</figcaption>
        </figure>

        <p style={S.p}><strong>N+1 approach:</strong> Do transformers installed — ek active, ek standby (ya dono partial load par). Ek fail ya maintain karna ho — doosra full load le leta hai.</p>

        <InsightCard>
          <strong>Important design rule:</strong> Har transformer independently full Data Center load carry karne ki capacity honi chahiye. Sirf 50-50 sharing ke liye design mat karo — agar ek transformer fail ho to doosra akele poora load nahi le payega.
        </InsightCard>

        <div style={S.learnMore}>
          <TopicLink slug="dg-set" label="Learn More: DG Set" variant="inline" />
          <TopicLink slug="ups" label="Learn More: UPS" variant="inline" />
        </div>

        <hr style={S.divider} />

        {/* ── SECTION 20: Tier IV ── */}
        <h2 id="tier-4-design" style={S.h1}>Tier IV Design</h2>

        <p style={S.p}><strong>2N approach — dono paths ek saath active:</strong></p>

        <ComparisonCard
          tag="Tier III vs Tier IV — Transformer Level"
          leftTitle="Tier III — N+1"
          leftItems={["Do transformers installed", "Ek active, ek standby", "Maintenance survive karta hai", "Manual ya auto switchover", "Har transformer full load capable"]}
          rightTitle="Tier IV — 2N"
          rightItems={["Do completely independent paths", "Dono ek saath active", "Fault bhi survive karta hai", "Server dual PSU dono paths se power leta hai", "Zero downtime — ek fail bhi nahi dikhta"]}
        />

        <p style={S.p}>Path A: Transformer A → LVMDB A → UPS A → PDU A → Server PSU A</p>
        <p style={S.p}>Path B: Transformer B → LVMDB B → <TopicLink slug="ups" label="UPS B" variant="inline" /> → PDU B → Server PSU B</p>
        <p style={S.p}>Agar Transformer A fail ho — Server PSU B se seamlessly continue. Zero downtime.</p>

        <WhyThisMatters>
          Tier III maintenance survive karta hai. Tier IV faults bhi survive karta hai. Yahi sabse bada difference hai — aur yahi Tier IV ka core promise hai.
        </WhyThisMatters>

        <hr style={S.divider} />

        {/* ── SECTION 21: Future Trends ── */}
        <h2 id="future-trends" style={S.h1}>Future Trends</h2>

        <p style={S.p}><strong>Dry-Type as Standard:</strong> Oil-cooled outdoor transformers gradually dry-type se replace ho rahe hain — fire safety aur environmental reasons se.</p>
        <p style={S.p}><strong>Amorphous Core Transformers:</strong> Normal silicon steel ki jagah amorphous metal core — no-load losses significantly reduce hoti hain. Future Data Centers me increasingly use honge.</p>
        <p style={S.p}><strong>Smart Monitoring + Online DGA:</strong> IoT sensors real-time DGA — manual sampling ki zarurat kam hogi. AI-based predictive maintenance fault predict karega before it happens.</p>
        <p style={S.p}><strong>BEE Star Ratings (India):</strong> Bureau of Energy Efficiency transformer efficiency standards mandatory kar raha hai — higher rated transformers long-term electricity savings denge.</p>
        <p style={S.p}><strong>AI Data Centers:</strong> Higher power density = larger transformers + better cooling + better monitoring required — transformer technology bhi evolve ho rahi hai.</p>

        <hr style={S.divider} />

        {/* ── Key Takeaways ── */}
        <h2 id="key-takeaways" style={S.h1}>Key Takeaways</h2>

        <KeyTakeawayCard
          items={[
            "Transformer high voltage (11kV/33kV) ko low voltage (433V) me convert karta hai — mandatory step hai.",
            "Sirf AC ke saath kaam karta hai — DC ke saath nahi.",
            "Dry-type cast resin indoor Data Centers me preferred — oil nahi, fire risk nahi.",
            "Koi moving parts nahi — silent, reliable machine.",
            "Overheating sabse common fault — cooling aur load dono monitor karo.",
            "Buchholz relay (oil-type) internal fault ka early warning deta hai — kabhi ignore mat karo.",
            "Tier III me N+1 (ek standby), Tier IV me 2N (do complete independent paths).",
            "K-factor rated transformers Data Centers me use karo — harmonic loads handle karte hain.",
            "DGA oil-type transformer ka sabse important health test hai — transformer ka MRI scan.",
            "Alarm acknowledge ≠ Alarm resolve — ye lesson real failures se aata hai.",
          ]}
        />

        <hr style={S.divider} />

        {/* ── What's Next ── */}
        <div style={S.cardWrap}>
          <div style={{ height: 2, background: "linear-gradient(90deg, var(--color-neon-blue), var(--color-neon-cyan))" }} />
          <div style={S.cardBodyInsight}>
            <span style={{ ...S.cardLabel, color: "var(--color-neon-cyan)" }}>WHAT&apos;S NEXT</span>
            <div style={S.cardContent}>
              Transformer ke baad 433V power LVMDB me jaati hai — aur wahan se UPS tak. Lekin agar grid power fail ho jaye to kya hoga? Yehi kaam karta hai DG Set.
            </div>
            <div style={{ marginTop: 14 }}>
              <TopicLink slug="dg-set" label="Next: DG Set →" variant="inline" />
            </div>
          </div>
        </div>

        <hr style={S.divider} />

        {/* ── Continue Learning ── */}
        <h2 style={S.h1}>Continue Learning</h2>
        <p style={S.p}>Transformer ke aage ka electrical learning path — har topic Data Center power chain ka agla logical step hai.</p>
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
