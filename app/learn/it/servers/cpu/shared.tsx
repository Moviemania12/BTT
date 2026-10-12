export { Callout, type CalloutProps } from "@/components/engineering/Callout";
export { EngineeringTable as ComparisonTable } from "@/components/engineering/EngineeringTable";
export { SvgFigure as Figure } from "@/components/engineering/SvgFigure";
export { CodeBlock } from "@/components/engineering/CodeBlock";
export type { CalloutType } from "@/lib/engineering/core/colors";
export const S = {
  h2: { fontSize: "1.9rem", fontWeight: 800, color: "#111827", marginTop: "3rem", marginBottom: "1rem", letterSpacing: "-0.01em" } as const,
  h3: { fontSize: "1.35rem", fontWeight: 700, color: "#111827", marginTop: "2rem", marginBottom: "0.75rem" } as const,
  p:  { fontSize: "1.05rem", lineHeight: 1.75, color: "#1f2937", marginBottom: "1rem" } as const,
  ul: { fontSize: "1.05rem", lineHeight: 1.8,  color: "#1f2937", marginBottom: "1rem", paddingLeft: "1.4rem" } as const,
};

/** "How to read this diagram" walkthrough shown under a figure. */
export function DiagramGuide({ title, steps }: { title: string; steps: string[] }) {
  return (
    <div style={{ background: "#f8fafc", border: "1px solid #e2e8f0", borderLeft: "4px solid #2563eb", borderRadius: 8, padding: "1rem 1.2rem", margin: "0.5rem 0 1.5rem" }}>
      <p style={{ fontWeight: 700, color: "#1e40af", marginBottom: "0.5rem", fontSize: "0.98rem" }}>{title}</p>
      <ol style={{ ...S.ul, marginBottom: 0, fontSize: "0.98rem", lineHeight: 1.7 }}>
        {steps.map((s, i) => <li key={i} style={{ marginBottom: "0.35rem" }}>{s}</li>)}
      </ol>
    </div>
  );
}
