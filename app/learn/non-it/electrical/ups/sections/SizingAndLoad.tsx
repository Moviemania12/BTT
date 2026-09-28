"use client";

// ═══════════════════════════════════════════════════════════════════════════
// app/learn/non-it/electrical/ups/sections/SizingAndLoad.tsx
//
// Sections 10-13: Capacity Selection, UPS Sizing Methodology, Load Calculation (4 worked examples), plus UPS Types decision guide (Section 11 supplement)
//
// Extracted unchanged from Phase 1-3 monolithic page.tsx as part of the
// folder restructure. Content is byte-identical to the original — only the
// file location and import paths have changed.
// ═══════════════════════════════════════════════════════════════════════════

import { S, Callout, ComparisonTable, Figure } from "../shared";
import UpsSizingFlowDiagram from "../svg/UpsSizingFlowDiagram";
import { CalculatorLink } from "@/components/engineering/CalculatorLink";
import { getCalculator } from "@/lib/engineering/registry";

export default function SizingAndLoad() {
  return (
    <>
        <h2 id="capacity-selection" style={S.h2}>Capacity Selection (VA/kVA/kW/PF)</h2>

        <p style={S.p}>
          Before understanding UPS sizing, the relationship between three units must be clear — <strong>VA (Volt-Ampere)</strong>, <strong>kW (kiloWatt)</strong>, and <strong>Power Factor (PF)</strong>.
        </p>

        <Callout type="important" title="Important — The Core Formula">
          <strong>kW = kVA × PF</strong> <br /> That is, kVA is apparent power (the UPS is rated on this), and kW is the real/usable power that actually does the work. PF is typically between 0.8 and 0.99 for modern IT equipment.
        </Callout>

        <ComparisonTable
          headers={["Term", "Symbol", "Definition", "Typical Range (IT Load)"]}
          rows={[
            ["Apparent Power", "VA / kVA", "Total power the UPS has to deliver (V × A)", "Used for UPS rating"],
            ["Real Power", "W / kW", "Actually consumed/usable power", "kW = kVA × PF"],
            ["Power Factor", "PF", "Ratio of real power to apparent power", "0.8 (legacy) to 0.99 (modern servers)"],
            ["Reactive Power", "VAR / kVAR", "Non-working power (inductive/capacitive)", "Higher in older equipment"],
          ]}
        />

        <p style={S.p}>
          Example: If your load is 80 kW and the PF is 0.8, the UPS kVA rating needed is:
        </p>

        <div style={{ background: "#f1f5f9", borderRadius: "8px", padding: "1rem 1.3rem", margin: "1rem 0", fontFamily: "monospace", fontSize: "1rem" }}>
          kVA = kW ÷ PF = 80 ÷ 0.8 = <strong>100 kVA</strong>
        </div>

        <p style={S.p}>
          To convert kVA/kW, use our dedicated calculator:
        </p>

        <Callout type="best-practice" title="Best Practice — Always Size in kVA">
          UPS are always rated in kVA, not kW — because the UPS has to handle apparent power whatever the PF of the load. While sizing, never treat kW directly as the UPS rating — always divide by PF to get kVA.
        </Callout>

        <p style={S.p}>
          This article comes with 7 interactive calculators — each has its own dedicated tool page. You can see the first calculator right here below; the rest are linked in Section 16 (Battery & Runtime) and Section 18 (Data Center UPS Designer).
        </p>

        {(() => {
          const loadCalc = getCalculator("ups.load-calculator");
          return loadCalc ? <CalculatorLink calculator={loadCalc} /> : null;
        })()}

        {/* ═══════════════════════════════════════════════════════════════
            SECTION 11 — UPS TYPES (COMPLETE) — supplementary depth
        ═══════════════════════════════════════════════════════════════ */}
        <h3 style={S.h3}>Choosing the Right UPS Type — Quick Decision Guide</h3>

        <p style={S.p}>
          In Section 9 we covered all 5 types. Here is a practical decision guide that simplifies real-world selection:
        </p>

        <ComparisonTable
          headers={["Scenario", "Recommended Type", "Why"]}
          rows={[
            ["Home PC / single workstation", "Offline (Standby)", "Lowest cost, occasional short outages only"],
            ["Small office, 5-10 PCs", "Line Interactive", "AVR handles brownouts common in Indian grid"],
            ["Server room, < 50 kVA", "Online Double Conversion", "Zero transfer time, clean power mandatory"],
            ["Data Center, 100-800 kVA", "Online Double Conversion (Modular preferred)", "Scalability + built-in N+1"],
            ["Data Center, > 500 kVA single unit", "Delta Conversion", "Higher efficiency at scale reduces OPEX significantly"],
            ["Growing Data Center (uncertain final load)", "Modular UPS", "Add capacity incrementally as racks fill up"],
          ]}
        />

        <Callout type="common-mistake" title="Common Mistake — Mixing UPS Types in Same Bus">
          Never mix different UPS topologies on the same DC bus or parallel bus (for example one Online and one Delta Conversion in parallel). The synchronization and load-sharing logic may be incompatible — keeping the same OEM and same model series is best practice for parallel systems.
        </Callout>

        {/* ═══════════════════════════════════════════════════════════════
            SECTION 12 — UPS SIZING METHODOLOGY
        ═══════════════════════════════════════════════════════════════ */}
        <h2 id="ups-sizing" style={S.h2}>UPS Sizing Methodology</h2>

        <p style={S.p}>
          UPS sizing is a structured 5-step process. Skipping steps can cause both under-sizing and wasteful over-sizing — both are costly mistakes.
        </p>

        <ol style={S.ul}>
          <li><strong>Step 1 — Load Inventory:</strong> List the nameplate kW/kVA of every piece of equipment (servers, storage, network, PDU losses).</li>
          <li><strong>Step 2 — Apply Demand Factor:</strong> Actual load is lower than nameplate — typically a 70-85% demand factor is applied.</li>
          <li><strong>Step 3 — Apply Power Factor:</strong> Convert kW into kVA (kVA = kW ÷ PF).</li>
          <li><strong>Step 4 — Add Future Growth:</strong> Add 20-30% headroom for expansion — replacing a UPS is costly.</li>
          <li><strong>Step 5 — Apply Redundancy:</strong> Decide the final module count according to the N, N+1 or 2N architecture.</li>
        </ol>

        <Callout type="important" title="Important — Never Size at 100% Capacity">
          Never load a UPS continuously at 100% rated capacity. Industry best practice: <strong>do not load a UPS above 80%</strong> under normal operating conditions — this preserves thermal headroom and transient spike absorption capacity.
        </Callout>

        <h3 style={S.h3}>UPS Sizing Methodology — At a Glance</h3>

        <Figure caption="Fig 8 — UPS sizing flow: from raw load to final kVA decision">
          <UpsSizingFlowDiagram />
        </Figure>

        {/* ═══════════════════════════════════════════════════════════════
            SECTION 13 — LOAD CALCULATION (worked examples ×4)
        ═══════════════════════════════════════════════════════════════ */}
        <h2 id="load-calculation" style={S.h2}>Load Calculation</h2>

        <p style={S.p}>
          Load calculation is the foundation of UPS sizing. Below are 4 real-world worked examples — a 100-rack Data Center, an office building, a hospital and an industrial plant.
        </p>

        <h3 style={S.h3}>Example 1 — 100 Rack Data Center</h3>

        <ComparisonTable
          headers={["Component", "Load (kW)", "Notes"]}
          rows={[
            ["Servers (100 racks × 4kW avg)", "400", "Compute load — biggest share"],
            ["Storage", "60", "SAN/NAS arrays"],
            ["Network", "25", "Core/leaf switches, routers"],
            ["PDU losses", "15", "~3% distribution loss"],
            ["Lighting", "8", "LED, occupancy-sensor controlled"],
            ["Security (CCTV, access control)", "5", "Low but mandatory load"],
            ["Total Connected Load", "513", "Sum of above"],
          ]}
        />

        <div style={{ background: "#f1f5f9", borderRadius: "8px", padding: "1rem 1.3rem", margin: "1rem 0", fontFamily: "monospace", fontSize: "0.95rem", lineHeight: 1.8 }}>
          Demand Factor (80%): 513 × 0.8 = 410.4 kW
          <br />
          Power Factor (0.9): 410.4 ÷ 0.9 = 456 kVA
          <br />
          Future Growth (25%): 456 × 1.25 = 570 kVA
          <br />
          <strong>Final UPS Size (Tier III, N+1): ~600 kVA (2 × 300 kVA modules + 1 redundant)</strong>
        </div>

        <h3 style={S.h3}>Example 2 — Office Building (Mixed IT + Common Area)</h3>

        <ComparisonTable
          headers={["Component", "Load (kW)"]}
          rows={[
            ["Small server room (10 racks)", "25"],
            ["Workstations (200 PCs)", "30"],
            ["Network equipment", "5"],
            ["Total Connected Load", "60"],
          ]}
        />

        <div style={{ background: "#f1f5f9", borderRadius: "8px", padding: "1rem 1.3rem", margin: "1rem 0", fontFamily: "monospace", fontSize: "0.95rem", lineHeight: 1.8 }}>
          Demand Factor (75%): 60 × 0.75 = 45 kW
          <br />
          Power Factor (0.85): 45 ÷ 0.85 = 53 kVA
          <br />
          <strong>Final UPS Size: 60 kVA standard unit</strong>
        </div>

        <h3 style={S.h3}>Example 3 — Hospital Critical Power</h3>

        <ComparisonTable
          headers={["Component", "Load (kW)"]}
          rows={[
            ["ICU + OT equipment", "80"],
            ["HIS (Hospital Information System) servers", "20"],
            ["Imaging (CT/MRI support systems)", "40"],
            ["Emergency lighting", "10"],
            ["Total Connected Load", "150"],
          ]}
        />

        <div style={{ background: "#f1f5f9", borderRadius: "8px", padding: "1rem 1.3rem", margin: "1rem 0", fontFamily: "monospace", fontSize: "0.95rem", lineHeight: 1.8 }}>
          Demand Factor (90% — hospital loads less diversifiable): 150 × 0.9 = 135 kW
          <br />
          Power Factor (0.9): 135 ÷ 0.9 = 150 kVA
          <br />
          <strong>Final UPS Size (2N — life-safety critical): 2 × 200 kVA fully redundant paths</strong>
        </div>

        <Callout type="warning" title="Warning — Hospital UPS is Life-Safety Critical">
          Hospital critical power design must be verified against IEC/NFPA life-safety guidelines by a qualified consultant — this is only an illustrative example; actual hospital electrical design is done with strict regulatory compliance (NABH, local fire & electrical authority).
        </Callout>

        <h3 style={S.h3}>Example 4 — Industrial Plant (Control Systems Only)</h3>

        <ComparisonTable
          headers={["Component", "Load (kW)"]}
          rows={[
            ["PLC/SCADA panels", "15"],
            ["HMI workstations", "5"],
            ["Instrumentation power", "10"],
            ["Total Connected Load", "30"],
          ]}
        />

        <div style={{ background: "#f1f5f9", borderRadius: "8px", padding: "1rem 1.3rem", margin: "1rem 0", fontFamily: "monospace", fontSize: "0.95rem", lineHeight: 1.8 }}>
          Demand Factor (95% — control systems run continuously): 30 × 0.95 = 28.5 kW
          <br />
          Power Factor (0.95 — modern PLC power supplies): 28.5 ÷ 0.95 = 30 kVA
          <br />
          <strong>Final UPS Size: 30 kVA, N (single path acceptable for non-critical control loop)</strong>
        </div>

        <Callout type="interview" title="Interview Tip">
          In an interview, if a load calculation example is given, always follow this order: Connected Load → Demand Factor → kW to kVA (PF) → Future Growth → Redundancy multiplier. Never change this sequence — order matters for correct results.
        </Callout>

        {/* ═══════════════════════════════════════════════════════════════
            SECTION 14 — BATTERY TYPES
        ═══════════════════════════════════════════════════════════════ */}
    </>
  );
}
