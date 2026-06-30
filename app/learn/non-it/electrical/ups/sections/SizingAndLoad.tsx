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
          UPS sizing samajhne se pehle, teen units ka relationship clear hona chahiye —{" "}
          <strong>VA (Volt-Ampere)</strong>, <strong>kW (kiloWatt)</strong>, aur{" "}
          <strong>Power Factor (PF)</strong>.
        </p>

        <Callout type="important" title="Important — The Core Formula">
          <strong>kW = kVA × PF</strong>
          <br />
          Yaani, kVA apparent power hai (UPS isi pe rated hota hai), kW real/usable power hai jo
          actually kaam karta hai. PF typically 0.8 to 0.99 ke beech hota hai modern IT equipment ke
          liye.
        </Callout>

        <ComparisonTable
          headers={["Term", "Symbol", "Definition", "Typical Range (IT Load)"]}
          rows={[
            ["Apparent Power", "VA / kVA", "Total power UPS ko deliver karna hai (V × A)", "Used for UPS rating"],
            ["Real Power", "W / kW", "Actually consumed/usable power", "kW = kVA × PF"],
            ["Power Factor", "PF", "Ratio of real power to apparent power", "0.8 (legacy) to 0.99 (modern servers)"],
            ["Reactive Power", "VAR / kVAR", "Non-working power (inductive/capacitive)", "Higher in older equipment"],
          ]}
        />

        <p style={S.p}>
          Example: Agar tumhara load 80 kW hai aur PF 0.8 hai, toh UPS kVA rating chahiye:
        </p>

        <div style={{ background: "#f1f5f9", borderRadius: "8px", padding: "1rem 1.3rem", margin: "1rem 0", fontFamily: "monospace", fontSize: "1rem" }}>
          kVA = kW ÷ PF = 80 ÷ 0.8 = <strong>100 kVA</strong>
        </div>

        <p style={S.p}>
          kVA/kW convert karna ho toh hamara dedicated calculator use karo:
        </p>

        <Callout type="best-practice" title="Best Practice — Always Size in kVA">
          UPS hamesha kVA mein rated hote hain, kW mein nahi — kyunki UPS ko apparent power handle karna
          padta hai chahe load ka PF kuch bhi ho. Sizing karte waqt kabhi kW ko directly UPS rating na
          samjho — hamesha PF se divide karke kVA nikaalo.
        </Callout>

        <p style={S.p}>
          Is article ke saath 7 interactive calculators hain — har ek apna dedicated tool page hai.
          Pehla calculator yahin neeche dekh sakte ho, baaki Section 16 (Battery & Runtime) aur Section
          18 (Data Center UPS Designer) mein link milega.
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
          Section 9 mein humne saare 5 types cover kiye. Yahan ek practical decision guide hai jo
          real-world selection ko simplify karta hai:
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
          Kabhi bhi ek hi DC bus ya parallel bus pe different UPS topologies mix mat karo (jaise ek
          Online aur ek Delta Conversion parallel mein). Synchronization aur load-sharing logic
          incompatible ho sakti hai — same OEM, same model series rakhna best practice hai parallel
          systems ke liye.
        </Callout>

        {/* ═══════════════════════════════════════════════════════════════
            SECTION 12 — UPS SIZING METHODOLOGY
        ═══════════════════════════════════════════════════════════════ */}
        <h2 id="ups-sizing" style={S.h2}>UPS Sizing Methodology</h2>

        <p style={S.p}>
          UPS sizing ek structured 5-step process hai. Skip karne se under-sizing ya wasteful
          over-sizing dono ho sakte hain — dono hi costly mistakes hain.
        </p>

        <ol style={S.ul}>
          <li><strong>Step 1 — Load Inventory:</strong> Har equipment ka nameplate kW/kVA list karo (servers, storage, network, PDU losses).</li>
          <li><strong>Step 2 — Apply Demand Factor:</strong> Actual load nameplate se kam hota hai — typically 70-85% demand factor apply hota hai.</li>
          <li><strong>Step 3 — Apply Power Factor:</strong> kW ko kVA mein convert karo (kVA = kW ÷ PF).</li>
          <li><strong>Step 4 — Add Future Growth:</strong> 20-30% headroom add karo expansion ke liye — UPS replace karna costly hai.</li>
          <li><strong>Step 5 — Apply Redundancy:</strong> N, N+1, ya 2N architecture ke according final module count decide karo.</li>
        </ol>

        <Callout type="important" title="Important — Never Size at 100% Capacity">
          UPS ko kabhi bhi 100% rated capacity pe continuously load mat karo. Industry best practice:
          UPS ko <strong>80% se zyada load na karo</strong> normal operating condition mein — yeh
          thermal headroom aur transient spike absorption capacity preserve karta hai.
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
          Load calculation hi UPS sizing ka foundation hai. Neeche 4 real-world worked examples hain —
          ek 100-rack Data Center, ek office building, ek hospital, aur ek industrial plant.
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
          Hospital critical power design IEC/NFPA life-safety guidelines ke against verify hona chahiye
          by a qualified consultant — yeh sirf ek illustrative example hai, actual hospital electrical
          design strict regulatory compliance (NABH, local fire & electrical authority) ke saath hota
          hai.
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
          Interview mein agar load calculation example diya jaaye, hamesha yeh order follow karo:
          Connected Load → Demand Factor → kW to kVA (PF) → Future Growth → Redundancy multiplier.
          Yeh sequence kabhi mat badlo — order matters for correct results.
        </Callout>

        {/* ═══════════════════════════════════════════════════════════════
            SECTION 14 — BATTERY TYPES
        ═══════════════════════════════════════════════════════════════ */}
    </>
  );
}
