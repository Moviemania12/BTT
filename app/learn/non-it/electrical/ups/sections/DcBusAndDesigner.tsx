"use client";

// ═══════════════════════════════════════════════════════════════════════════
// app/learn/non-it/electrical/ups/sections/DcBusAndDesigner.tsx
//
// Sections 18-20: DC Bus, Input & Output Supply, Data Center UPS Designer (comprehensive sizing tool)
//
// Extracted unchanged from Phase 1-3 monolithic page.tsx as part of the
// folder restructure. Content is byte-identical to the original — only the
// file location and import paths have changed.
// ═══════════════════════════════════════════════════════════════════════════

import { S, Callout, ComparisonTable, Figure } from "../shared";
import DcBusDiagram from "../svg/DcBusDiagram";
import { CalculatorLinkList } from "@/components/engineering/CalculatorLink";
import { getCalculatorsForTopic } from "@/lib/engineering/registry";

export default function DcBusAndDesigner() {
  return (
    <>
        <h2 id="dc-bus" style={S.h2}>DC Bus</h2>

        <p style={S.p}>
          The DC Bus is the internal electrical backbone that connects the rectifier output, battery bank and inverter input — all three. It is the "heart" of the UPS, where power converted from AC to DC is stored and distributed.
        </p>

        <Figure caption="Fig 14 — DC Bus connecting rectifier, battery, and inverter">
          <DcBusDiagram />
        </Figure>

        <ComparisonTable
          headers={["DC Bus Voltage", "Typical UPS Size Range", "Battery String Length"]}
          rows={[
            ["48V", "< 10 kVA (small/telecom)", "4 × 12V batteries"],
            ["96V", "10-40 kVA", "8 × 12V batteries"],
            ["192V", "40-200 kVA (most common)", "16 × 12V batteries"],
            ["240V / 360V / 410V", "200 kVA+", "20-34 × 12V batteries"],
          ]}
        />

        <Callout type="danger" title="Danger — DC Bus is Lethal Voltage">
          DC Bus voltage (192V-410V) is even more dangerous than AC mains, because DC current flows through the body continuously without the natural interruption that AC's sine wave zero-crossing gives. Never work on the DC bus without proper LOTO, insulated tools and qualified electrician supervision.
        </Callout>

        {/* ═══════════════════════════════════════════════════════════════
            SECTION 19 — INPUT & OUTPUT SUPPLY
        ═══════════════════════════════════════════════════════════════ */}
        <h2 id="input-output-supply" style={S.h2}>Input & Output Supply</h2>

        <p style={S.p}>
          Understanding UPS input and output specifications is essential for both installation and troubleshooting.
        </p>

        <ComparisonTable
          headers={["Parameter", "Typical Input Spec", "Typical Output Spec"]}
          rows={[
            ["Voltage", "380-415V ±15-20%, 3-phase", "400/415V ±1%, regulated"],
            ["Frequency", "50Hz ±5-10%", "50Hz ±0.1% (independent of input)"],
            ["Power Factor", "0.99 (input, modern PWM rectifier)", "0.8-1.0 (output, depends on load)"],
            ["THD (Harmonic Distortion)", "< 3-5% (input current)", "< 2-3% (output voltage)"],
            ["Overload capability", "N/A", "125% for 10 min, 150% for 1 min (typical)"],
          ]}
        />

        <Callout type="important" title="Important — Wide Input Window Matters in India">
          Indian grid voltage fluctuations of more than ±20% are common, especially in rural/semi-urban industrial areas. While selecting a UPS, confirm a wide input voltage window — so the rectifier does not have to make unnecessary battery-mode transfers on minor sags.
        </Callout>

        {/* ═══════════════════════════════════════════════════════════════
            SECTION 20 — Related Calculators (closing the article)
        ═══════════════════════════════════════════════════════════════ */}
        <h2 style={S.h2}>UPS Calculators — Complete Toolkit</h2>

        <p style={S.p}>
          So far we have explained every individual calculation (load, battery, runtime, string, redundancy). Below is the full calculator toolkit — each has its own dedicated tool page, where you can enter your data and get real numbers. The most comprehensive is the <strong>Data Center UPS Designer</strong> — input racks and Tier level, and you get the whole system sizing at once.
        </p>

        <CalculatorLinkList calculators={getCalculatorsForTopic("ups")} />
    </>
  );
}
