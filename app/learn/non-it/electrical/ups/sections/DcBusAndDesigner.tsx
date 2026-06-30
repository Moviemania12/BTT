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
          DC Bus woh internal electrical backbone hai jo rectifier output, battery bank, aur inverter
          input — teeno ko connect karta hai. Yeh UPS ka "heart" hai, jahan AC se DC mein convert hua
          power store aur distribute hota hai.
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
          DC Bus voltage (192V-410V) AC mains se bhi zyada dangerous hota hai kyunki DC current body se
          continuously flow karta hai without natural interruption jo AC ke sine wave zero-crossing
          deta hai. DC bus pe kabhi kaam mat karo bina proper LOTO, insulated tools, aur qualified
          electrician supervision ke.
        </Callout>

        {/* ═══════════════════════════════════════════════════════════════
            SECTION 19 — INPUT & OUTPUT SUPPLY
        ═══════════════════════════════════════════════════════════════ */}
        <h2 id="input-output-supply" style={S.h2}>Input & Output Supply</h2>

        <p style={S.p}>
          UPS input aur output specifications samajhna installation aur troubleshooting dono ke liye
          zaroori hai.
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
          Indian grid voltage fluctuations ±20% se zyada common hain especially rural/semi-urban
          industrial areas mein. UPS select karte waqt wide input voltage window confirm karo —
          isse rectifier ko unnecessary battery-mode transfers nahi karne padte minor sags pe.
        </Callout>

        {/* ═══════════════════════════════════════════════════════════════
            SECTION 20 — Related Calculators (closing the article)
        ═══════════════════════════════════════════════════════════════ */}
        <h2 style={S.h2}>UPS Calculators — Complete Toolkit</h2>

        <p style={S.p}>
          Ab tak humne har individual calculation (load, battery, runtime, string, redundancy) explain
          kiya hai. Neeche poora calculator toolkit hai — har ek apna dedicated tool page hai, jahan
          tum apna data daal ke real numbers nikaal sakte ho. Sabse comprehensive hai{" "}
          <strong>Data Center UPS Designer</strong> — racks aur Tier level input karo, poora system
          sizing ek saath milega.
        </p>

        <CalculatorLinkList calculators={getCalculatorsForTopic("ups")} />
    </>
  );
}
