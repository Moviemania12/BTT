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
    "DG Set kya hai, AMF panel, sync room, PLC automation, fuel system, A/B/C/D maintenance, Tier III/IV — Data Center backup power ka complete engineer guide.",
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
    { label: "Kya hai ek line me", text: "DG Set ek backup power machine hai — jab grid fail ho to diesel engine se bijli banata hai taaki Data Center band na ho." },
    { label: "Data Center me kyun", text: "UPS battery sirf 10–15 minutes chalti hai. Us beech DG start hokar full load le leta hai — grid waapis aane tak Data Center continuously chalta rehta hai." },
    { label: "Andar kya hota hai", text: "Teen main parts: Diesel Engine (mechanical power), Alternator (electricity generate karta hai), aur AMF/Control Panel (automatic operation, protection, monitoring)." },
    { label: "Automatic kaise", text: "AMF Panel (Automatic Main Failure) grid failure detect karta hai, engine start karta hai, voltage stable hote hi load transfer karta hai — bina kisi operator ke, 10–30 seconds me." },
    { label: "Fuel kitna chahiye", text: "Industry best practice: Tier III minimum 12 hours, Tier IV minimum 24–72 hours. Fuel storage plan karo — bina diesel ke DG kuch ghante me band." },
    { label: "Tier IV me kya alag", text: "Tier IV me 2N — do completely independent DG systems. Koi shared component nahi. Ek fail ho to doosra poora load le — zero IT impact guaranteed." },
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
          Bas itna samajh gaye to DG Set ka concept clear hai. Deeper jaana ho to neeche poora article hai.
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
        <span style={{ display: "block", fontFamily: "var(--font-mono)", fontSize: 9, letterSpacing: "0.2em", textTransform: "uppercase", color: "#ffa500", fontWeight: 600, marginBottom: 9 }}>Engineer Ki Tip</span>
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
  { protection: "Overcurrent",        detects: "Overload ya short circuit on DG output" },
  { protection: "Earth Fault",        detects: "Ground fault on distribution system" },
  { protection: "Undervoltage",       detects: "Output voltage below set limit" },
  { protection: "Overvoltage",        detects: "AVR failure ya voltage surge" },
  { protection: "Underfrequency",     detects: "Engine speed drop — overload ya governor issue" },
  { protection: "Overfrequency",      detects: "Engine overspeed — governor failure" },
  { protection: "Reverse Power",      detects: "Generator motor ban raha hai — dangerous" },
  { protection: "Loss of Excitation", detects: "AVR failure — alternator field loss" },
];

function AMFProtectionTable() {
  return (
    <div style={{ margin: "20px 0 28px", borderRadius: 10, border: "1px solid rgba(37,99,235,0.12)", overflow: "hidden" }}>
      <div style={{ overflowX: "auto" }}>
        <table style={{ width: "100%", borderCollapse: "collapse", minWidth: 480 }}>
          <thead>
            <tr style={{ background: "rgba(37,99,235,0.06)" }}>
              {["Protection", "Kya Detect Karta Hai"].map((h) => (
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
  { q: "DG Set aur Generator me kya difference hai?", a: "Generator sirf alternator hota hai — mechanical energy se electricity banata hai. DG Set = Diesel Engine + Generator + Control Panel — complete packaged backup power unit." },
  { q: "DG Set kitne seconds me start hota hai?", a: "Engine typically 10–20 seconds me rated speed aur voltage tak pahunch jata hai. Load transfer milake 15–30 seconds total. Isi liye UPS battery mandatory hai — is gap ko cover karne ke liye." },
  { q: "Black smoke kyun aata hai?", a: "Overloading, rich fuel mixture, ya blocked air filter se. Load suddenly badhne par thoda black smoke normal hai. Continuous black smoke = investigate karo — injector ya air filter issue ho sakta hai." },
  { q: "DG Set ko cooldown kyun chahiye?", a: "Full load par engine parts bahut garam rehte hain. Load suddenly remove karo aur engine band karo — coolant circulation ruk jaati hai lekin metal hot rehta hai — heat soak hota hai, cylinder head damage possible. 5–10 min no-load run se coolant cool karta hai properly." },
  { q: "Fuel kitne time baad kharab ho jaata hai?", a: "Un-polished diesel typically 6–12 months me degrade hoti hai — bacteria, water contamination, sediment. Fuel polishing system se 2–3 saal tak quality maintain kar sakte hain. Stale fuel DG start failure ka common root cause hai." },
  { q: "Tier IV me DG Set alag kyun hota hai?", a: "Tier IV me zero shared components hone chahiye — do completely independent DG systems, independent sync panels, independent fuel storage, independent AMF panels. Ek system fail ho to doosra zero impact ke saath full load carry karta hai." },
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
      <ArticleLayout slug="dg-set" headings={HEADINGS} readingTimeMinutes={22}>

        {/* ── Hero ── */}
        <figure style={S.imageFigure}>
          <div style={S.articleImage}>
            <Image src="/images/articles/dg-set/dg-set-overview.svg" alt="Complete DG Set unit in Indian Data Center — engine, alternator, acoustic canopy, control panel" fill sizes="(max-width:768px) 100vw,740px" style={{ objectFit: "cover" }} unoptimized />
          </div>
          <figcaption style={S.imageCaption}>DG Set — Data Center ka backup power backbone. Grid fail hone par 10–30 seconds me full load leta hai.</figcaption>
        </figure>

        <WhatYouAreLooking>
          Ye ek complete DG Set unit hai — acoustic canopy me enclosed. Bahar se metal box dikhta hai, andar diesel engine aur alternator hote hain. Exhaust silencer upar se nikalti hai. Control panel side me hota hai.
        </WhatYouAreLooking>

        <QuickSummary />

        <hr style={S.divider} />

        {/* ── Intro ── */}
        <p style={S.p}><TopicLink slug="transformer" label="Transformer" variant="inline" /> ke baad 433V LV power LVMDB tak pahunch gayi. <TopicLink slug="ups" label="UPS" variant="inline" /> ne power store kar li.</p>
        <p style={S.p}>Ab ek sabse important sawal: <strong>Agar grid fail ho jaye — raat ke 2 baje, bina warning ke — to kya hoga?</strong></p>
        <p style={S.p}>UPS battery kuch minutes chalti hai. Us beech kuch toh chahiye jo full power de sake.</p>
        <p style={S.p}>Yahi kaam karta hai — <strong>DG Set (Diesel Generator Set).</strong></p>

        <hr style={S.divider} />

        {/* ── SECTION 1 ── */}
        <h2 id="what-is-dg-set" style={S.h1}>What Is a DG Set?</h2>

        <p style={S.p}><strong>DG Set = Diesel Generator Set.</strong> Ek complete packaged backup power unit jisme teen main parts hote hain:</p>
        <ul style={S.ul}>
          <li style={S.li}><strong>Diesel Engine</strong> — fuel jalata hai, mechanical energy produce karta hai</li>
          <li style={S.li}><strong>Alternator</strong> — mechanical energy ko 3-phase AC electricity me convert karta hai</li>
          <li style={S.li}><strong>Control Panel</strong> — AMF, protection, monitoring, PLC — automation sab yahan</li>
        </ul>
        <p style={S.p}><strong>Output:</strong> 3-phase AC, 415V/433V, 50 Hz — same as grid supply. IT equipment ko pata bhi nahi chalta ki supply source badal gaya.</p>
        <p style={S.p}><strong>Speed:</strong> 1500 RPM at 50 Hz (4-pole alternator) — f = NP/120 = 1500×4/120 = 50 Hz.</p>

        <DCMapNote components={["DG Set", "AMF Panel", "ATS/ATSS", "Fuel Storage", "Sync Panel"]} />

        <hr style={S.divider} />

        {/* ── SECTION 2 ── */}
        <h2 id="why-required" style={S.h1}>Why Is DG Set Required?</h2>

        <p style={S.p}>Grid supply reliable hai — lekin 100% uptime guaranteed nahi. Utility failures, transformer faults, cable cuts, storms, planned maintenance — sab possible hain.</p>
        <p style={S.p}><strong>UPS battery ka limitation:</strong> Typically 10–15 minutes. Ye sirf DG start hone ka time cover karta hai — isse zyada nahi.</p>

        <WhyThisMatters>
          Bina DG Set ke: UPS battery drain → servers shutdown → business impact → SLA breach → financial penalty. DG Set isi catastrophe ko prevent karta hai. Isliye no Data Center — Tier II se Tier IV tak — bina DG Set ke operate karta hai.
        </WhyThisMatters>

        <InsightCard>
          <strong>DG Set aur UPS ek team ki tarah kaam karte hain.</strong> UPS ek bridge hai — grid fail hone par turant power deta hai. DG Set woh bridge cross karta hai aur permanent power leta hai. Dono ek doosre ke bina incomplete hain. UPS bina DG ke 10–15 min me dead. DG bina UPS ke start hone ke beech servers crash.
        </InsightCard>

        <hr style={S.divider} />

        {/* ── SECTION 3 ── */}
        <h2 id="how-dg-works" style={S.h1}>How DG Set Works — Step by Step</h2>

        <FlowDiagram caption="Complete DG Set automatic start sequence — grid fail se load transfer tak" steps={[
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
        <p style={S.p}>AMF Panel grid voltage aur frequency continuously monitor karta hai. Failure detect hone par 2–5 seconds ki settling delay hoti hai — momentary dips ko filter karne ke liye.</p>

        <h3 style={S.h3}>Step 3–5: Engine Start aur Build-up</h3>
        <p style={S.p}>Battery crank motor engine ko start karta hai. Engine fire hota hai, speed badhti hai. Governor frequency regulate karta hai (50 Hz), AVR voltage regulate karta hai (415/433V). Typically 10–20 seconds me rated parameters stable ho jaate hain.</p>

        <h3 style={S.h3}>Step 6–7: Load Transfer</h3>
        <p style={S.p}>DG "ready" status aate hi ATS mains breaker open karta hai aur DG breaker close karta hai. Load DG par transfer ho jaata hai. UPS ka current source change hota hai — seamlessly.</p>

        <h3 style={S.h3}>Step 8: Running Mode</h3>
        <p style={S.p}>DG full load par run karta hai. Monitoring continuous hoti hai. Grid restoration ka wait hota hai. Jab grid waapis aaye — stable confirm karo, phir load wapis transfer karo.</p>

        <h3 style={S.h3}>Step 9: Cooldown Run</h3>
        <p style={S.p}>Load hatne ke baad DG 5–10 minutes no-load par run karta hai — ye <strong>cooldown run</strong> critical hai. Hot engine ko abruptly band karne se heat soak hoti hai — cylinder head damage possible. Cooldown me coolant properly circulate karke engine cool karta hai.</p>

        <EngineerTip>
          Cooldown run kabhi skip mat karo — chahe emergency me bhi. Agar grid waapis aaye aur turant DG band karo to engine damage ka risk hota hai. AMF Panel me cooldown timer set karo — DG khud automatically cooldown ke baad band hoga.
        </EngineerTip>

        <hr style={S.divider} />

        {/* ── SECTION 4 ── */}
        <h2 id="key-components" style={S.h1}>Key Components</h2>

        <figure style={S.imageFigure}>
          <div style={S.articleImage}>
            <Image src="/images/articles/dg-set/dg-engine-alternator.svg" alt="DG Set engine and alternator — labeled components, coupling, radiator, exhaust manifold" fill sizes="(max-width:768px) 100vw,740px" style={{ objectFit: "cover" }} unoptimized />
          </div>
          <figcaption style={S.imageCaption}>Diesel Engine aur Alternator — DG Set ke do main functional parts, common baseframe par mounted.</figcaption>
        </figure>

        <WhatYouAreLooking>
          Left side diesel engine hai — turbocharger upar, exhaust manifold side me, radiator fan visible. Right side alternator hai — winding housing, terminal box. Dono ek rigid coupling se connected hain — engine ki rotation directly alternator shaft chalata hai.
        </WhatYouAreLooking>

        <h3 style={S.h3}>Diesel Engine</h3>
        <p style={S.p}>Turbocharged, water-cooled diesel engine fuel jalata hai aur mechanical power produce karta hai. Typically 1500 RPM par run karta hai 50 Hz ke liye.</p>
        <p style={S.p}><strong>Rating types — yahan galat choice Data Center ko impact kar sakti hai:</strong></p>
        <ul style={S.ul}>
          <li style={S.li}><strong>ESP (Emergency Standby Power)</strong> — emergency backup ke liye. Variable load. Limited overload as per OEM specification. Data Centers me hamesha ESP rating use karo.</li>
          <li style={S.li}><strong>PRP (Prime Rating)</strong> — main power source for variable load applications. Remote sites me.</li>
          <li style={S.li}><strong>COP (Continuous Power)</strong> — 24/7 continuous, no overload. Baseload applications me.</li>
        </ul>

        <InsightCard>
          <strong>Hamesha ESP (Emergency Standby Power) rating par DG Set specify karo Data Centers me.</strong> Prime ya Continuous rating par specified DG ka output ESP se zyada hoga — same physical size me zyada kVA milenge — lekin ye rating emergency backup ke liye intended nahi hai. OEM ke saath rating clearly confirm karo project spec me.
        </InsightCard>

        <h3 style={S.h3}>Alternator (Generator)</h3>
        <p style={S.p}>Engine ki mechanical rotation ko 3-phase AC electricity me convert karta hai.</p>
        <ul style={S.ul}>
          <li style={S.li}><strong>AVR (Automatic Voltage Regulator)</strong> — output voltage stable rakhta hai load changes me</li>
          <li style={S.li}><strong>PMG (Permanent Magnet Generator)</strong> — AVR ko self-excitation power deta hai</li>
          <li style={S.li}><strong>IP Rating:</strong> Minimum IP23 indoor, IP44 outdoor</li>
        </ul>

        <hr style={S.divider} />

        {/* ── SECTION 5 ── */}
        <h2 id="amf-panel" style={S.h1}>AMF Panel</h2>

        <figure style={S.imageFigure}>
          <div style={S.articleImage}>
            <Image src="/images/articles/dg-set/amf-panel-control.svg" alt="AMF panel interior showing DSE or ComAp controller, protection relays, circuit breakers, indicators" fill sizes="(max-width:768px) 100vw,740px" style={{ objectFit: "cover" }} unoptimized />
          </div>
          <figcaption style={S.imageCaption}>AMF Panel interior — controller (DSE/ComAp), protection relays, breakers, alarm annunciator. DG Set ka dimaag.</figcaption>
        </figure>

        <WhatYouAreLooking>
          Ye ek AMF panel ka interior hai. Upar LCD display wala controller (DSE ya ComAp) hota hai — wahi main brain hai. Neeche breakers, protection relays, terminal blocks hote hain. Indicator lights alarm states dikhate hain.
        </WhatYouAreLooking>

        <p style={S.p}>AMF Panel (Automatic Main Failure Panel) DG Set ka dimaag hai. Grid failure detect karta hai, engine start sequence control karta hai, DG parameters monitor karta hai, ATS ko command deta hai.</p>

        <h3 style={S.h3}>AMF Protection Functions</h3>
        <AMFProtectionTable />

        <WhyThisMatters>
          Reverse Power protection bahut important hai. Agar DG ka breaker close ho aur engine unexpectedly band ho jaye — alternator grid se ya doosre DG se driven hone lagta hai — "motoring" mode. Ye alternator ko damage kar sakta hai aur dangerous situation create kar sakta hai. Reverse power relay is condition ko turant detect karke DG breaker open kar deta hai.
        </WhyThisMatters>

        <hr style={S.divider} />

        {/* ── SECTION 6 ── */}
        <h2 id="dg-sync-room" style={S.h1}>DG Sync Room — Parallel Operation</h2>

        <figure style={S.imageFigure}>
          <div style={S.articleImage}>
            <Image src="/images/articles/dg-set/sync-room-paralleling.svg" alt="DG synchronizing panel room — multiple DGs connected to common bus, auto synchronizer, load sharing" fill sizes="(max-width:768px) 100vw,740px" style={{ objectFit: "cover" }} unoptimized />
          </div>
          <figcaption style={S.imageCaption}>DG Sync Room — multiple DGs ek common bus par parallel run karte hain. Load sharing, auto synchronizing, protection sab yahan manage hota hai.</figcaption>
        </figure>

        <p style={S.p}>Multiple DG sets parallel me chalane ke liye dedicated <strong>DG Synchronizing Room</strong> hota hai. Ek bade DG ki jagah multiple chhote DGs reliable hote hain — ek fail ho to baaki chalta rehta hai.</p>

        <h3 style={S.h3}>Synchronizing — Kyun Zaruri Hai?</h3>
        <p style={S.p}>Do electricity sources parallel connect karne ke liye parameters bilkul match karne chahiye. Agar match nahi kiya aur breaker close kiya — <strong>circulating current, mechanical shock, equipment damage.</strong></p>

        <ComparisonCard
          tag="Synchronizing Parameters — Data Center Standard"
          leftTitle="Parameter"
          leftItems={["Voltage", "Frequency", "Phase Angle", "Phase Sequence"]}
          rightTitle="Required Match"
          rightItems={["±1% (conservative for DC)", "±0.2 Hz", "±10°", "RYB = RYB (exactly same)"]}
        />

        <h3 style={S.h3}>Auto Synchronizer (PLC Based)</h3>
        <p style={S.p}>Modern Data Centers me manual synchroscope nahi — PLC-based auto synchronizer hota hai. PLC continuously voltage, frequency, phase angle compare karta hai. Tolerance ke andar aate hi automatically breaker close karta hai.</p>
        <p style={S.p}>Human operator sirf "arm" karta hai — closing PLC karta hai. Human error eliminate hota hai.</p>

        <h3 style={S.h3}>Load Sharing — Isochronous vs Droop</h3>

        <ComparisonCard
          tag="Load Sharing Methods"
          leftTitle="Isochronous (Data Centers me preferred)"
          leftItems={["Exactly 50.00 Hz maintain karte hain", "Master controller load share manage karta hai", "Tight frequency — IT equipment ke liye better", "Modern PLC systems me standard"]}
          rightTitle="Droop Mode (Older systems)"
          rightItems={["Frequency slightly droops under load", "DGs naturally balance themselves", "Simple, no master controller needed", "Older/simpler parallel systems me"]}
        />

        <hr style={S.divider} />

        {/* ── SECTION 7 ── */}
        <h2 id="plc-automation" style={S.h1}>PLC Automation</h2>

        <p style={S.p}>Modern Data Center DG Sets fully PLC controlled hote hain — koi bhi manual intervention required nahi hoti normal operation me.</p>

        <h3 style={S.h3}>PLC Auto Start Sequence Logic</h3>
        <FlowDiagram caption="PLC controlled DG start sequence — grid failure se service restore tak" steps={[
          { icon: "⚠️", label: "Grid Failure", sublabel: "AMF detects" },
          { icon: "⏱️", label: "Settling Delay", sublabel: "2–5 sec" },
          { icon: "🔄", label: "Crank Attempt 1" },
          { icon: "📊", label: "Monitor V+F" },
          { icon: "🔁", label: "Sync Logic" },
          { icon: "⚙️", label: "Breaker Close" },
          { icon: "📡", label: "SCADA Alert" },
        ]} />

        <p style={S.p}>PLC 3 crank attempts karta hai. Teen attempts ke baad bhi engine na chale — <strong>Start Failure Alarm</strong> generate hota hai aur next available DG ka attempt kiya jata hai.</p>

        <h3 style={S.h3}>Load Management</h3>
        <p style={S.p}>Real-time kW per DG measure karta hai. Load sharing algorithm run karta hai. Load badhne par additional DG automatically add karta hai, load kam hone par shed karta hai. Efficiency optimize karta hai — full load me zyada DGs, light load me kam.</p>

        <h3 style={S.h3}>Event Logging</h3>
        <p style={S.p}>Start/stop timestamps, fault history, running hours, fuel consumption — sab PLC me store hota hai. SCADA/BMS me Modbus ya BACnet se sync hota hai. Email/SMS alerts configured ho sakte hain.</p>

        <hr style={S.divider} />

        {/* ── SECTION 8 ── */}
        <h2 id="load-calculation" style={S.h1}>Load Calculation</h2>

        <h3 style={S.h3}>Basic Sizing</h3>
        <p style={S.p}>Ye formula follow karo:</p>
        <ul style={S.ul}>
          <li style={S.li}>Total IT Load + Non-IT Load (cooling, lighting, misc) = Total Facility Load</li>
          <li style={S.li}>Future growth add karo (typically 20–25%)</li>
          <li style={S.li}>Required kVA = Total kW ÷ Power Factor (typically 0.8)</li>
          <li style={S.li}>Next standard rating select karo</li>
        </ul>

        <InsightCard>
          <strong>Example:</strong> IT Load 1000 kW + Cooling 400 kW = 1400 kW. Future growth 20% = 280 kW. Design Load = 1680 kW. At 0.8 PF: 1680 ÷ 0.8 = 2100 kVA. Select 2250 kVA DG Set (standard rating).
        </InsightCard>

        <h3 style={S.h3}>Derating Factors — India Me Zaroori</h3>
        <ul style={S.ul}>
          <li style={S.li}><strong>High Ambient Temperature:</strong> 45°C+ summers me DG output derate hoti hai. OEM derating chart check karo.</li>
          <li style={S.li}><strong>Altitude:</strong> High altitude sites me air density kam — engine output kam. 1000m se upar derating apply karo.</li>
          <li style={S.li}><strong>Harmonics:</strong> UPS loads high harmonics generate karte hain — typically 15–20% derating apply karo. K-rated DG ya harmonic filter use karo.</li>
          <li style={S.li}><strong>Starting Current:</strong> Large motors (AHUs, chillers) starting me high current lete hain — DG momentarily overload ho sakta hai. Starting sequence stagger karo.</li>
        </ul>

        <hr style={S.divider} />

        {/* ── SECTION 9 ── */}
        <h2 id="fuel-system" style={S.h1}>Fuel System</h2>

        <figure style={S.imageFigure}>
          <div style={S.articleImage}>
            <Image src="/images/articles/dg-set/fuel-system-day-tank.svg" alt="DG Set day tank with fuel transfer pump, level gauge, bund wall in Indian Data Center" fill sizes="(max-width:768px) 100vw,740px" style={{ objectFit: "cover" }} unoptimized />
          </div>
          <figcaption style={S.imageCaption}>Day Tank — DG ke paas chhota service tank. Fuel transfer pump automatically main tank se fill karta rehta hai.</figcaption>
        </figure>

        <WhatYouAreLooking>
          Ye ek day tank installation hai — typically 500L to 2000L capacity ka steel tank. Fuel level gauge side me, outlet pipe neeche DG ki fuel line me. Concrete bund tank ke around hota hai — spill containment ke liye. Fuel transfer pump pipe ke saath connected.
        </WhatYouAreLooking>

        <h3 style={S.h3}>Day Tank (Service Tank)</h3>
        <p style={S.p}>DG ke paas chhota tank — DG directly isi se fuel leta hai. Fuel transfer pump automatically main tank se refill karta rehta hai when level drops. Stable, nearby fuel supply ensure karta hai.</p>

        <figure style={S.imageFigure}>
          <div style={S.articleImage}>
            <Image src="/images/articles/dg-set/underground-fuel-tank.svg" alt="Underground diesel storage tank with vent pipes, fill point, overfill protection at Indian facility" fill sizes="(max-width:768px) 100vw,740px" style={{ objectFit: "cover" }} unoptimized />
          </div>
          <figcaption style={S.imageCaption}>Underground fuel storage tank — UST preferred for fire safety. Vent pipes, fill point, level sensor visible above ground.</figcaption>
        </figure>

        <h3 style={S.h3}>Main Storage Tank</h3>
        <p style={S.p}><strong>UST (Underground Storage Tank)</strong> — preferred for fire safety, space saving, temperature stability.</p>
        <p style={S.p}><strong>AST (Above-Ground Storage Tank)</strong> — easier inspection, maintenance, but higher fire risk, needs larger bund.</p>

        <h3 style={S.h3}>Fuel Storage — Kitna Chahiye?</h3>
        <p style={S.p}><em>Note: Ye industry best practice hai — Uptime Institute Tier definitions me fuel duration specified nahi hai.</em></p>

        <FuelConsumptionTable />

        <h3 style={S.h3}>Fuel Polishing System</h3>
        <p style={S.p}>Diesel long-term storage me degrade hota hai — bacteria, water contamination, sediment, wax formation.</p>
        <p style={S.p}>Fuel Polisher tank se diesel nikalke fine filters + water separator se pass karta hai aur clean diesel waapis dalta hai — continuously ya periodically.</p>

        <EngineerTip>
          Stale fuel DG start failure ka most common root cause hai Data Centers me. Fuel polishing system mandatory hai — quarterly fuel quality test bhi karo (water content, sediment, bacteria). 6 months se zyada stored diesel bina polishing ke risk me hai.
        </EngineerTip>

        <h3 style={S.h3}>PESO License — Diesel Storage</h3>
        <p style={S.p}>Diesel (HSD — High Speed Diesel) India me <strong>Class C petroleum</strong> hai (flash point above 65°C) — Class A nahi. Class A petrol/gasoline hota hai.</p>
        <p style={S.p}>Petroleum Act 1934 aur Petroleum Rules 2002 ke under: prescribed limits se zyada storage ke liye <strong>PESO (Petroleum and Explosives Safety Organisation)</strong> se license required hai. Exact thresholds aur requirements local PESO office se confirm karo — state-wise variation ho sakti hai.</p>

        <h3 style={S.h3}>Spill Containment</h3>
        <p style={S.p}>Concrete bund around tank (110% of tank capacity), impervious lining, drainage valve (normally closed), spill kit nearby. IS 1115 aur MOEF guidelines follow karo.</p>

        <hr style={S.divider} />

        {/* ── SECTION 10 ── */}
        <h2 id="lubrication-cooling" style={S.h1}>Lubrication & Cooling</h2>

        <h3 style={S.h3}>Lubrication Oil System</h3>
        <p style={S.p}>Engine oil sump me stored rehta hai. Oil pump continuously circulate karta hai. Oil filter particles remove karta hai. Oil cooler temperature control karta hai.</p>
        <p style={S.p}><strong>Oil Grade:</strong> OEM specification ke anusar — typically 15W-40 CI-4 ya 10W-40 modern engines me.</p>
        <p style={S.p}><strong>Low Oil Pressure Shutdown:</strong> Critical protection — agar oil pressure below minimum ho, engine automatically shutdown ho jata hai. <strong>Ye protection kabhi bypass nahi karna</strong> — engine seize ho sakta hai.</p>
        <p style={S.p}><strong>Oil Analysis:</strong> Lab me oil sample bhejo — metal particles, contamination, viscosity degradation identify karta hai. Transformer DGA ki tarah — oil analysis engine wear ko failure se pehle predict karta hai.</p>

        <h3 style={S.h3}>Cooling System</h3>
        <p style={S.p}>Engine coolant → radiator → fan cools → back to engine. Ethylene glycol + water (50:50) with corrosion inhibitor. Remote radiator option: roof ya bahar, hoses se connected — acoustic canopy wale DG rooms me preferred.</p>
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
          Exhaust manifold se hot gases nikalte hain. Flexible bellows vibration absorb karta hai (engine vibrate karta hai — rigid connection se stack damage hoga). Silencer/muffler sound reduce karta hai. Vertical stack upar se exhaust release karta hai — height CPCB formula se calculate hoti hai.
        </WhatYouAreLooking>

        <h3 style={S.h3}>CPCB Stack Height Formula</h3>
        <p style={S.p}>Central Pollution Control Board mandatory formula:</p>
        <p style={S.p}><strong>H = h + 0.2 × √kVA</strong></p>
        <p style={S.p}>Jahan H = stack height (meters), h = DG building height (meters).</p>
        <p style={S.p}><strong>Example:</strong> 500 kVA DG, 5 meter building: H = 5 + 0.2 × √500 = 5 + 4.5 = <strong>9.5 meters minimum.</strong></p>
        <p style={S.p}>CPCB emission norms (current applicable notification), acoustic standards (≤75 dB(A) at 1 meter from canopy), aur CPCB compliance plate on DG set — sab mandatory hain India me.</p>

        <hr style={S.divider} />

        {/* ── SECTION 12 ── */}
        <h2 id="dg-room-design" style={S.h1}>DG Room Design</h2>

        <p style={S.p}>DG room design me NBC 2016, CPCB guidelines aur fire safety codes follow karna mandatory hai.</p>
        <ul style={S.ul}>
          <li style={S.li}><strong>Location:</strong> Ground floor preferred (heavy equipment), away from occupied areas</li>
          <li style={S.li}><strong>Structure:</strong> RCC floor, anti-vibration mounting pads, minimum 600mm clearance all sides, overhead lifting beam</li>
          <li style={S.li}><strong>Fire Safety:</strong> 2-hour fire-rated walls, self-closing fire-rated doors. FM200 ya Novec 1230 preferred (CO₂ alternator damage kar sakta hai — avoid karo)</li>
          <li style={S.li}><strong>Ventilation:</strong> 25–30 air changes/hour. Combustion air inlet (lower), radiator heat exhaust (upper). Motorized dampers.</li>
          <li style={S.li}><strong>Acoustic:</strong> Acoustic doors aur panels, flexible exhaust connections, anti-vibration mounts. Target: &lt;85 dB outside DG room</li>
          <li style={S.li}><strong>Fuel Room:</strong> Day tank ke liye separate 1-hour fire-rated compartment</li>
        </ul>

        <hr style={S.divider} />

        {/* ── SECTION 13 ── */}
        <h2 id="maintenance-abcd" style={S.h1}>Maintenance — A/B/C/D Checks</h2>

        <p style={S.p}>DG Set maintenance ek formal documented process hai. Running hours aur calendar time — whichever comes first par based.</p>

        <MaintenanceTable />

        {/* A Check */}
        <figure style={S.imageFigure}>
          <div style={S.articleImage}>
            <Image src="/images/articles/dg-set/dg-maintenance-check.svg" alt="Technician performing DG Set inspection — checking oil level, belt condition, control panel" fill sizes="(max-width:768px) 100vw,740px" style={{ objectFit: "cover" }} unoptimized />
          </div>
          <figcaption style={S.imageCaption}>A Check — daily/weekly inspection. Oil level, coolant, fuel, belt, alarms sab check hote hain.</figcaption>
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
          <li style={S.li}>Fuel pre-filter aur main filter replacement (if due)</li>
          <li style={S.li}>Air filter cleaning ya replacement</li>
          <li style={S.li}>Battery capacity test</li>
          <li style={S.li}>Alternator IR test (Megger)</li>
          <li style={S.li}>AMF panel lamp test, all alarm simulate karo</li>
          <li style={S.li}><strong>Full AMF cycle test — monthly mandatory:</strong> Grid failure simulate, DG auto start, load transfer, mains restore, cooldown verify</li>
          <li style={S.li}>Load test: minimum 30 minutes at 50–75% rated load</li>
        </ul>

        <h3 style={S.h3}>C Check — 6-Monthly / 500–1000 Hours</h3>
        <ul style={S.ul}>
          <li style={S.li}>Complete oil change + all filters replacement</li>
          <li style={S.li}>Coolant flush aur fresh fill with inhibitor</li>
          <li style={S.li}>V-belt set replacement</li>
          <li style={S.li}>Injector inspection (remove, inspect, clean — calibration at D check)</li>
          <li style={S.li}>Turbocharger inspection — bearing clearance, shaft play, blade condition</li>
          <li style={S.li}>AVR aur Governor calibration verify</li>
          <li style={S.li}>Complete protection testing: low oil pressure, high temp, overspeed, underspeed, overcurrent, earth fault, reverse power — sab simulate karo</li>
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
          <figcaption style={S.imageCaption}>Load Bank Testing — resistive load bank DG se connect hota hai. C check me 2 hours, D check me 4+ hours full load test mandatory.</figcaption>
        </figure>

        <EngineerTip>
          Load bank test sirf kVA verify karne ke liye nahi hota. Engine performance, cooling capacity, governor response, AVR stability, fuel consumption — sab ek saath test hote hain. Quarterly load bank test recommended hai even if only annual is mandatory.
        </EngineerTip>

        <hr style={S.divider} />

        {/* ── SECTION 14 ── */}
        <h2 id="safety-standards" style={S.h1}>Safety Standards (India)</h2>

        <ul style={S.ul}>
          <li style={S.li}><strong>IS 10000</strong> — DG Set testing aur installation</li>
          <li style={S.li}><strong>IS 4722</strong> — Rotating electrical machines</li>
          <li style={S.li}><strong>IS 1460</strong> — HSD (High Speed Diesel) quality standard</li>
          <li style={S.li}><strong>IS 1115</strong> — Petroleum storage</li>
          <li style={S.li}><strong>NBC 2016</strong> — National Building Code, DG room design</li>
          <li style={S.li}><strong>CPCB norms</strong> — Emission standards, acoustic standards, CPCB plate mandatory on DG</li>
          <li style={S.li}><strong>CEA Technical Standards</strong> — Captive generation requirements</li>
          <li style={S.li}><strong>Petroleum Act 1934 + Petroleum Rules 2002</strong> — Fuel storage compliance, PESO license</li>
        </ul>

        <p style={S.p}><strong>Arc Flash:</strong> DG output terminals par kaam karte waqt full arc flash PPE mandatory — HRC suit, face shield, insulated gloves.</p>
        <p style={S.p}><strong>Before Any Work:</strong> PTW mandatory. DG manually stop karo, AMF manual mode me rakho, battery disconnect karo, LOTO complete karo. Exhaust me toxic gases hoti hain — ventilate karo before entering near exhaust.</p>
        <p style={S.p}><strong>Fire:</strong> DG room me CO₂ extinguisher mat rakho (alternator damage). Dry powder ya FM200/Novec system use karo.</p>

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

        <p style={S.p}><strong>DG Fails to Start:</strong> Dead/weak battery (most common). Stale ya contaminated fuel. Air lock in fuel system. Excessive crank time without firing.</p>
        <p style={S.p}><strong>Starts But Trips Immediately:</strong> Low oil pressure (real ya sensor fault). Overcrank lockout (too many attempts). Control panel wiring fault.</p>
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

        <p style={S.p}>Raat 2 baje — grid outage. DG A start ho gaya. DG B start fail hua.</p>

        <FlowDiagram caption="3 AM grid failure — DG B start failure + recovery" steps={[
          { icon: "🌙", label: "Grid Fails", sublabel: "2 AM" },
          { icon: "✅", label: "DG A Starts" },
          { icon: "❌", label: "DG B Fails", sublabel: "Battery dead" },
          { icon: "🔋", label: "UPS Battery", sublabel: "Supports load" },
          { icon: "🔧", label: "Engineer Fix", sublabel: "Jump start" },
          { icon: "✅", label: "DG B Online" },
          { icon: "🌅", label: "Grid Restore", sublabel: "4 AM" },
        ]} />

        <p style={S.p}>Investigation me pata chala: DG B ki battery charger 3 months se fault me thi. Alarm acknowledge hua tha — work order create nahi hua tha.</p>
        <p style={S.p}>UPS battery ne load support kiya jab tak engineer ne DG B ko manually start kiya. Total exposure: 8 minutes on battery — uncomfortable lekin manageable.</p>

        <WhyThisMatters>
          Is failure me battery charger fault root cause tha — DG engine ka koi issue nahi tha. Isliye B check me battery charger test aur battery capacity test mandatory hai. Alarm acknowledge ≠ Alarm resolve — wahi DG Set maintenance ka sabse important lesson hai.
        </WhyThisMatters>

        <hr style={S.divider} />

        {/* ── SECTION 19 ── */}
        <h2 id="oems-vendors" style={S.h1}>OEMs & Vendors</h2>

        <OEMTable />

        <p style={S.noteText}>Data Centers me Cummins aur CAT most common hain — global service network, parts availability, aur Data Center references ki wajah se. KOEL Indian market me strong presence rakhta hai aur many large facilities me use hota hai.</p>

        <hr style={S.divider} />

        {/* ── SECTION 20 ── */}
        <h2 id="tier-3-design" style={S.h1}>Tier III Design</h2>

        <figure style={S.imageFigure}>
          <div style={S.articleImage}>
            <Image src="/images/articles/dg-set/tier3-dg-room.svg" alt="Tier III Data Center DG room — multiple DG sets in row, sync panel, common bus" fill sizes="(max-width:768px) 100vw,740px" style={{ objectFit: "cover" }} unoptimized />
          </div>
          <figcaption style={S.imageCaption}>Tier III DG Room — N+1 DG sets, common sync panel, load sharing. Ek maintain karo, baaki chalta rehta hai.</figcaption>
        </figure>

        <p style={S.p}><strong>Objective: Concurrent Maintainability.</strong> Koi bhi DG maintain karo — baki DGs full IT load carry karte hain.</p>
        <p style={S.p}><strong>Architecture:</strong> Typically 3 DGs (N=2 + 1 standby). All parallel on common sync panel. Isochronous load sharing. Any one DG offline — remaining two carry full load.</p>
        <p style={S.p}><strong>Fuel System:</strong> Common main tank acceptable — N+1 fuel transfer pumps. Minimum 12 hours at full load (industry best practice).</p>
        <p style={S.p}><strong>Important rule:</strong> Har DG ko independently full Data Center load carry karne ki capacity honi chahiye — sirf 50-50 sharing design insufficient hai.</p>

        <hr style={S.divider} />

        {/* ── SECTION 21 — TIER IV (PRIORITY SECTION) ── */}
        <h2 id="tier-4-design" style={S.h1}>Tier IV Design</h2>

        <InsightCard>
          <strong>Tier IV sirf "Tier III ka double" nahi hai — ye ek completely different design philosophy hai.</strong> Tier III me: ek DG maintain karo — baaki chalte hain. ✓ Tier IV me: ek DG unexpectedly FAIL ho jaye — phir bhi zero IT impact guaranteed. ✓✓ Ye concurrent maintainability nahi — ye fault tolerance hai.
        </InsightCard>

        <ComparisonCard
          tag="Tier III vs Tier IV — Fundamental Difference"
          leftTitle="Tier III"
          leftItems={["Goal: Concurrent Maintainability", "N+1 parallel DGs", "1 common sync panel", "Common fuel tank OK", "1 DG room acceptable", "Shared AMF possible", "Service may impact during fault"]}
          rightTitle="Tier IV"
          rightItems={["Goal: Fault Tolerance", "2N — two independent systems", "2 separate sync panels", "Independent fuel zones/tanks", "2 fire-rated DG rooms (ideal)", "Completely independent AMF", "Zero IT impact — guaranteed"]}
        />

        <h3 style={S.h3}>Tier IV Core Principle — Zero Shared Components</h3>
        <p style={S.p}>Path A aur Path B ke beech koi bhi shared component nahi hona chahiye. Yahan ek checklist hai:</p>
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
          <li style={S.li}><strong>DG Rooms</strong> — 2 separate fire-rated rooms (ideal) ya 1 room with fire-rated partition</li>
        </ul>

        <InsightCard>
          <strong>Ek bhi shared component = Single Point of Failure = NOT Tier IV.</strong>
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

        <p style={S.p}><strong>Server dual PSU = first crossover point.</strong> DG A fail ho — Server PSU B se continue. DG B fail ho — Server PSU A se continue. Zero IT impact.</p>

        <h3 style={S.h3}>Tier IV DG Room Design</h3>
        <p style={S.p}><strong>Ideal: Do alag fire-rated DG rooms.</strong></p>
        <p style={S.p}>Room A: DG A1, A2, A3 + Sync Panel A + AMF A + Day Tank A + Independent ventilation + Independent fire suppression.</p>
        <p style={S.p}>Room B: DG B1, B2, B3 + Sync Panel B + AMF B + Day Tank B + Independent ventilation + Independent fire suppression.</p>
        <p style={S.p}><strong>Kyun 2 rooms?</strong> Agar Room A me fire ho — FM200 discharge ho — Room A ke DGs offline ho jaate hain. Room B completely unaffected. Ye Tier IV fault isolation hai.</p>
        <p style={S.p}><strong>Practical minimum:</strong> Ek room with fire-rated partition between A zone aur B zone. Separate doors, separate ventilation, separate fire suppression. Most Tier IV certifications accept this.</p>

        <h3 style={S.h3}>Tier IV Fuel System — True Independence</h3>
        <p style={S.p}><strong>Worst case test:</strong> DG A ki fuel line me problem. Kya DG B affected hoga? Common tank ho to potentially yes. Independent tanks ho to — definitely NO.</p>

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
          Fuel storage numbers ke saath ek refueling contract bhi must hai. "72 hours storage" is useless agar extended grid outage me fuel supplier khud available na ho. Primary + backup fuel supplier SLAs — "X hours me Y kL guaranteed delivery" — ye Tier IV fuel strategy ka hissa hai.
        </EngineerTip>

        <h3 style={S.h3}>Tier IV PLC & Control Redundancy</h3>
        <p style={S.p}><strong>System A Controls:</strong> PLC A (dedicated DG A1, A2, A3), AMF A with independent UPS-backed DC supply, independent communication to SCADA, independent alarm outputs.</p>
        <p style={S.p}><strong>System B Controls:</strong> PLC B (dedicated DG B1, B2, B3), AMF B with independent UPS-backed DC supply, independent communication, independent alarms.</p>
        <p style={S.p}><strong>Critical point:</strong> AMF Panel ki control power supply UPS backed honi chahiye — grid fail ho aur DG start ho raha ho, us beech control power nahi jaani chahiye. Ye overlooked requirement hai jo Tier III me sometimes miss hoti hai but Tier IV me mandatory hai.</p>

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
        <p style={S.p}><strong>IT impact: ZERO.</strong> Engineers repair ya replace DG A2 at next maintenance window.</p>

        <h3 style={S.h3}>Tier IV — DG Room Fire Scenario</h3>
        <p style={S.p}>DG Room A me fire → FM200 discharge → Room A DGs offline.</p>
        <p style={S.p}>Room B: Completely unaffected — DG B1+B2+B3 running.</p>
        <p style={S.p}>Server PSU B: Full power. Server PSU A drops.</p>
        <p style={S.p}><strong>Servers with dual PSU: Zero IT impact. Continue on PSU B.</strong></p>
        <p style={S.p}>Fire suppression kaam karta hai. Room A safe entry ke baad inspect karo, restore karo.</p>
        <p style={S.p}>Yahi Tier IV fault tolerance hai — individual component failure aur even room-level failure survive karta hai.</p>

        <h3 style={S.h3}>Tier IV Testing — Concurrent Fault Simulation</h3>
        <p style={S.p}><strong>Method 1 — Individual System Test:</strong> System A ko test karo, System B carries full IT load. A me grid fail simulate karo, DG A start verify, load transfer verify. Phir reverse. Zero IT impact throughout.</p>
        <p style={S.p}><strong>Method 2 — Concurrent Fault Simulation (True Tier IV Validation):</strong> System A intentionally offline karo. System B carries 100% load automatically. IT team monitors — zero impact visible. System A restore karo. Ye test Tier IV fault tolerance prove karta hai.</p>
        <p style={S.p}><strong>Method 3 — Split Load Bank Test:</strong> System A: Full load bank = full rated load → test complete. System B: Full load bank = full rated load → test complete. Both simultaneously → total plant capacity verified.</p>

        <h3 style={S.h3}>Tier IV Common Mistakes — Jo Actually Tier III Bana Dete Hain</h3>
        <ul style={S.ul}>
          <li style={S.li}><strong>Single sync panel for all DGs:</strong> Sync panel fail = entire DG plant offline. NOT Tier IV.</li>
          <li style={S.li}><strong>Single fuel tank with independent pumps:</strong> Tank fail/contaminate = both systems affected. NOT Tier IV.</li>
          <li style={S.li}><strong>Shared AMF panel (redundant cards):</strong> Common chassis fail = complete AMF loss. NOT Tier IV.</li>
          <li style={S.li}><strong>DG rooms sharing common corridor:</strong> Fire in corridor = both rooms impacted. NOT Tier IV.</li>
          <li style={S.li}><strong>Common PLC for both systems:</strong> Single software fault = both systems affected. NOT Tier IV.</li>
        </ul>

        <WhyThisMatters>
          Tier IV = <strong>physical independence</strong> at every layer — not just redundancy, but complete isolation. Redundancy means "backup exists." Independence means "backup cannot be affected by the primary's failure." Ye distinction Tier IV certification aur field reality dono me critical hai.
        </WhyThisMatters>

        <hr style={S.divider} />

        {/* ── SECTION 22 ── */}
        <h2 id="future-trends" style={S.h1}>Future Trends</h2>

        <p style={S.p}><strong>Gas Generators:</strong> Natural gas ya biogas pe chalne wale generators — emissions less, refueling easier (piped gas). Urban Data Centers me diesel replace ho sakta hai.</p>
        <p style={S.p}><strong>Hybrid DG + Battery:</strong> DG start hone ke time me battery buffer karta hai — UPS battery smaller ho sakti hai. Frequency stability better.</p>
        <p style={S.p}><strong>Fuel Cell Backup:</strong> Hydrogen fuel cells — zero emissions, quiet, high reliability. Microsoft ne already kuch Data Centers me test kiya hai. Abhi expensive hai.</p>
        <p style={S.p}><strong>AI-Based Predictive Maintenance:</strong> Vibration sensors, oil analysis sensors, exhaust temperature analytics — failure predict karo before it happens.</p>
        <p style={S.p}><strong>Online DGA for Engine Oil:</strong> Real-time oil analysis — metal particle detection. Same concept as transformer DGA — engine wear early detect karo.</p>
        <p style={S.p}><strong>AI Data Centers:</strong> Extreme power density → larger DG sets, faster response times, tighter frequency control required. GPU clusters ka power factor aur harmonic profile standard IT se alag hai.</p>

        <hr style={S.divider} />

        {/* ── Key Takeaways ── */}
        <h2 id="key-takeaways" style={S.h1}>Key Takeaways</h2>

        <KeyTakeawayCard items={[
          "DG Set grid failure ke time Data Center ka backup power provide karta hai — 10–30 seconds me automatically.",
          "Engine + Alternator + AMF/PLC — teen main parts. ESP rating Data Centers me use karo, not PRP/COP.",
          "Cooldown run kabhi skip mat karo — heat soak se engine damage possible hai.",
          "Stale fuel DG start failure ka most common root cause hai — fuel polishing mandatory hai.",
          "Diesel Class C petroleum hai — PESO license required above prescribed limits (Petroleum Act 1934).",
          "A/B/C/D checks strictly follow karo — hamesha OEM schedule ke saath calendar time bhi track karo.",
          "Tier III: N+1 parallel, concurrent maintainability. Tier IV: 2N independent systems, fault tolerance.",
          "Tier IV me zero shared components between A and B — sync panel, AMF, fuel, DG room sab independent.",
          "Tier IV fault tolerance = ek system completely fail ho — zero IT impact. Ye Tier III se fundamental difference hai.",
          "Alarm acknowledge ≠ Alarm resolve — DG maintenance failures ka sabse common root cause yahi hai.",
        ]} />

        <hr style={S.divider} />

        {/* ── What's Next ── */}
        <div style={S.cardWrap}>
          <div style={{ height: 2, background: "linear-gradient(90deg,#2563EB,#2563EB)" }} />
          <div style={S.cardBodyInsight}>
            <span style={{ ...S.cardLabel, color: "#2563EB" }}>WHAT&apos;S NEXT</span>
            <div style={S.cardContent}>DG Set grid failure cover karta hai. Lekin DG start hone ke 10–30 seconds — us beech kaun power deta hai? Yahi kaam karta hai UPS aur Battery Bank.</div>
            <div style={{ marginTop: 14, display: "flex", gap: 8, flexWrap: "wrap" }}>
              <TopicLink slug="ups" label="Next: UPS System →" variant="inline" />
              <TopicLink slug="battery-bank" label="Also: Battery Bank →" variant="inline" />
            </div>
          </div>
        </div>

        <hr style={S.divider} />

        <h2 style={S.h1}>Continue Learning</h2>
        <p style={S.p}>DG Set ke aage ka electrical learning path — har topic Data Center power chain ka agla logical step hai.</p>
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
