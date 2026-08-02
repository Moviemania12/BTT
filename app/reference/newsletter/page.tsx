import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "BTT Weekly Newsletter — Behind The Tech",
  description:
    "Behind The Tech weekly newsletter — Data Center engineering insights, incident case studies, new article alerts, industry news, and learning roadmap updates. DC engineers ke liye, DC engineers ke saath.",
  alternates: { canonical: "https://behindthetech.in/reference/newsletter" },
};

const S = {
  card: { border: "1px solid #e2e8f0", borderRadius: "12px", padding: "1.5rem", marginBottom: "1rem" } as const,
  h3: { fontSize: "1.1rem", fontWeight: 700, color: "#111827", marginBottom: "0.5rem", marginTop: 0 } as const,
  p: { fontSize: "0.95rem", color: "#475569", lineHeight: 1.75, margin: 0 } as const,
  li: { fontSize: "0.93rem", color: "#374151", lineHeight: 1.7, marginBottom: "0.3rem" } as const,
};

const PAST_ISSUES = [
  { title: "Why Your DG Set Will Fail When You Need It Most", date: "Issue #12 · Power", desc: "DG starter relay failure — common, predictable, preventable. Deep-dive into test procedures that actually verify auto-start, not just manual start." },
  { title: "The Hidden Cost of Stranded Capacity", date: "Issue #11 · Operations", desc: "How 'allocated vs measured' gap costs DC operators millions. Real data from smart PDU deployments across 5 enterprise DCs." },
  { title: "Understanding Spine-Leaf for DC Engineers", date: "Issue #10 · Networking", desc: "Why 2 hops always matters. ECMP, BGP Unnumbered, and what happens when a spine switch goes into a black hole." },
  { title: "VRLA vs Li-Ion: 10-Year TCO Analysis", date: "Issue #9 · Power", desc: "Mumbai climate, 35°C battery room, 180kW UPS load — which battery chemistry wins on total cost over 10 years?" },
  { title: "FM200 Discharge — A Case Study", date: "Issue #8 · Fire Safety", desc: "How an accidental FM200 discharge exposed a dual-isolation procedural gap. Full timeline, root cause, and the PTW rewrite that followed." },
  { title: "PUE 1.6 → 1.35 Without Major CapEx", date: "Issue #7 · Energy", desc: "Six interventions, one Delhi DC, 14 months. Blanking panels, containment gaps, CRAC setpoints, and scheduled decommissions — actual measured results." },
];

export default function NewsletterPage() {
  return (
    <main data-homepage-theme="light" style={{ background: "#ffffff", minHeight: "100vh", paddingTop: "2.5rem" }}>
      <div style={{ maxWidth: "900px", margin: "0 auto", padding: "0 1.5rem 5rem" }}>

        {/* Breadcrumb */}
        <p style={{ fontSize: "0.8rem", color: "#94a3b8", marginBottom: "0.5rem", textTransform: "uppercase", letterSpacing: "0.1em", fontWeight: 700 }}>
          REFERENCE → Newsletter
        </p>

        {/* Hero */}
        <h1 style={{ fontSize: "2.2rem", fontWeight: 800, color: "#111827", marginBottom: "0.5rem", letterSpacing: "-0.01em" }}>
          BTT Weekly — Engineering Insights
        </h1>
        <p style={{ fontSize: "1.1rem", color: "#475569", marginBottom: "2.5rem", maxWidth: "640px" }}>
          Har hafte ek technical deep-dive: DC incidents, engineering decisions, new content alerts, aur field notes. Textbook-free. No filler. Written for engineers who work in data centers.
        </p>

        {/* Subscribe form */}
        <div style={{ background: "#f8fafc", border: "1.5px solid #e2e8f0", borderRadius: "14px", padding: "2rem", marginBottom: "3rem" }}>
          <h2 style={{ fontSize: "1.4rem", fontWeight: 800, color: "#111827", margin: "0 0 0.5rem" }}>
            Subscribe — It&apos;s Free
          </h2>
          <p style={{ color: "#475569", marginBottom: "1.25rem", lineHeight: 1.65, margin: "0 0 1.5rem" }}>
            Join engineers from Tier III and Tier IV DCs across India who read BTT Weekly every Tuesday morning.
          </p>
          <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap" as const }}>
            <input
              type="email"
              placeholder="your.name@company.com"
              style={{ flex: 1, minWidth: "220px", padding: "0.7rem 1rem", fontSize: "0.95rem", border: "1.5px solid #d1d5db", borderRadius: "8px", outline: "none", color: "#111827", background: "#fff" }}
            />
            <a
              href="https://beehiiv.com"
              target="_blank"
              rel="noopener noreferrer"
              style={{ background: "#155eef", color: "#fff", border: "none", borderRadius: "8px", padding: "0.7rem 1.5rem", fontSize: "0.95rem", fontWeight: 700, cursor: "pointer", textDecoration: "none", display: "inline-flex", alignItems: "center" }}
            >
              Subscribe →
            </a>
          </div>
          <p style={{ margin: "0.75rem 0 0", fontSize: "0.8rem", color: "#94a3b8" }}>
            No spam. Unsubscribe anytime. One email per week, every Tuesday.
          </p>
        </div>

        {/* What you get */}
        <h2 style={{ fontSize: "1.5rem", fontWeight: 800, color: "#111827", marginBottom: "1.25rem" }}>
          What&apos;s in Every Issue
        </h2>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem", marginBottom: "3rem" }}>
          {[
            { icon: "🔍", title: "Incident Deep-Dive", body: "One real DC incident per issue — full timeline, root cause, corrective actions. Anonymised, technically accurate." },
            { icon: "📐", title: "Engineering Concept", body: "One technical concept explained practically — with numbers, field context, and common mistakes to avoid." },
            { icon: "📰", title: "Industry News", body: "What matters this week — new DC openings, hyperscale capex, regulation changes, major vendor moves." },
            { icon: "📚", title: "New BTT Content", body: "Every new article, checklist, case study, and glossary update announced first to newsletter subscribers." },
            { icon: "💡", title: "Field Note", body: "One practical tip from the field — something you can use in your DC this week." },
            { icon: "🗺️", title: "Learning Path Update", body: "Your BTT learning roadmap progress — what to read next based on your track (Power / Cooling / IT / Cloud)." },
          ].map(({ icon, title, body }, i) => (
            <div key={i} style={S.card}>
              <h3 style={S.h3}>{icon} {title}</h3>
              <p style={S.p}>{body}</p>
            </div>
          ))}
        </div>

        {/* Who reads BTT */}
        <h2 style={{ fontSize: "1.5rem", fontWeight: 800, color: "#111827", marginBottom: "1rem" }}>
          Who Reads BTT Weekly
        </h2>
        <div style={{ ...S.card, background: "#f8fafc", marginBottom: "3rem" }}>
          <ul style={{ margin: 0, paddingLeft: "1.4rem" }}>
            {[
              "Data Center operations engineers managing 24x7 Tier III and Tier IV facilities",
              "Freshers and junior engineers building foundational DC knowledge",
              "Electrical and mechanical engineers transitioning into DC-specific roles",
              "Project managers overseeing DC commissioning and capacity expansion",
              "IT infrastructure engineers responsible for servers, networking, and cloud connectivity",
              "DC design consultants and EPC contractors",
            ].map((item, i) => <li key={i} style={S.li}>{item}</li>)}
          </ul>
        </div>

        {/* Archive */}
        <h2 style={{ fontSize: "1.5rem", fontWeight: 800, color: "#111827", marginBottom: "1.25rem" }}>
          Recent Issues
        </h2>
        <div style={{ marginBottom: "3rem" }}>
          {PAST_ISSUES.map((issue, i) => (
            <div key={i} style={{ display: "flex", gap: "1rem", padding: "1rem 0", borderBottom: "1px solid #f1f5f9", alignItems: "flex-start" }}>
              <div style={{ minWidth: "2.5rem", height: "2.5rem", background: "#eff6ff", borderRadius: "8px", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 800, fontSize: "0.85rem", color: "#155eef", flexShrink: 0 }}>#{PAST_ISSUES.length - i}</div>
              <div>
                <div style={{ fontSize: "0.75rem", color: "#94a3b8", marginBottom: "0.15rem" }}>{issue.date}</div>
                <h3 style={{ fontSize: "1rem", fontWeight: 700, color: "#111827", margin: "0 0 0.3rem" }}>{issue.title}</h3>
                <p style={{ ...S.p, fontSize: "0.88rem" }}>{issue.desc}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div style={{ background: "#155eef", borderRadius: "14px", padding: "2rem", textAlign: "center" as const }}>
          <h2 style={{ fontSize: "1.4rem", fontWeight: 800, color: "#fff", margin: "0 0 0.5rem" }}>
            Start Your Week with BTT
          </h2>
          <p style={{ color: "#bfdbfe", marginBottom: "1.5rem", lineHeight: 1.65 }}>
            Every Tuesday. One incident. One insight. One tip. Free forever.
          </p>
          <a
            href="https://beehiiv.com"
            target="_blank"
            rel="noopener noreferrer"
            style={{ background: "#fff", color: "#155eef", borderRadius: "8px", padding: "0.75rem 2rem", fontSize: "1rem", fontWeight: 800, cursor: "pointer", textDecoration: "none", display: "inline-block" }}
          >
            Subscribe Free →
          </a>
        </div>

      </div>
    </main>
  );
}
