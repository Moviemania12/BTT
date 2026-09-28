"use client";

// ═══════════════════════════════════════════════════════════════════════════
// app/learn/non-it/electrical/battery-bank/sections/ClosingSection.tsx
//
// Part 24 — Future Trends (Blueprint v3.0 Part 24)
// Part 25 — Closing / Key Takeaways (Blueprint v3.0 Part 25)
// Heading IDs: future-trends, key-takeaways
// ═══════════════════════════════════════════════════════════════════════════

import { S, Callout, ComparisonTable, SectionIntro } from "../shared";
import { CalculatorLink, CalculatorLinkList } from "../shared";
import { getCalculator, getCalculatorsForTopic } from "@/lib/engineering/registry";
import TopicLink from "@/components/TopicLink";

export default function ClosingSection() {
  const ahCalc       = getCalculator("ups.battery-ah-calculator");
  const qtyCalc      = getCalculator("ups.battery-quantity-calculator");
  const stringCalc   = getCalculator("ups.battery-string-calculator");
  const runtimeCalc  = getCalculator("ups.runtime-calculator");
  const loadCalc     = getCalculator("ups.load-calculator");
  const redunCalc    = getCalculator("ups.redundancy-calculator");
  const designerCalc = getCalculator("ups.data-center-ups-designer");

  return (
    <>
      {/* ═══════════════════════════════════════════════════════════════
          PART 24 — FUTURE TRENDS
      ═══════════════════════════════════════════════════════════════ */}

      <h2 id="future-trends" style={S.h2}>Future Trends</h2>

      <SectionIntro
        quickAnswer="Battery technology is in a significant transition in 2024–2030. LFP adoption is accelerating, AI-driven health prediction is becoming mainstream, and entirely new chemistries (sodium-ion, solid-state) are coming close to commercial viability."
        engineerTip="The best time to invest in future trends is when a technology is in the 'crossing the chasm' phase — early majority adoption. LFP is there. Sodium-ion is still in the early adopters phase. Solid-state will not be Data Center relevant until 2027–2030. Battery-as-a-Service will gain traction in India in 2026–2028 — keep the financial modeling ready."
        keyTakeaway="LFP is today's decision, sodium-ion is a 2027+ decision — for current projects choose between VRLA and LFP; watch the roadmap for the other technologies."
      />

      <h3 style={S.h3}>LFP Adoption Acceleration</h3>

      <p style={S.p}>
        Lithium Iron Phosphate (LFP) is shifting into the Data Center mainstream — hyperscalers (Google, Meta, Microsoft) have started adopting LFP as the standard battery chemistry in their new builds globally.
      </p>

      <p style={S.p}>
        In India this transition will be significant between 2024–2027. Driving factors: LFP cost per kWh is falling (CATL scale effect), the total cost of VRLA replacement cycles is increasingly higher than LFP at a 10-year horizon, and space constraints in Tier III/IV retrofits are making LFP the preferred choice.
      </p>

      <ComparisonTable
        headers={["Factor", "2023 Status", "2027 Projection"]}
        rows={[
          ["LFP cost vs VRLA (upfront per kWh)", "~2.5–3× more expensive", "~1.5–2× more expensive — gap narrowing"],
          ["India LFP product availability", "Limited OEM options, mostly imported", "Multiple options including some domestic assembly"],
          ["10-year TCO comparison", "LFP competitive in large installations", "LFP clearly better across most application sizes"],
          ["Warranty confidence", "5–7 year common", "10+ year warranties emerging"],
          ["India regulatory for LFP rooms", "No clear standard — NFPA 855 referenced", "India-specific Li-ion energy storage standard expected"],
        ]}
      />

      <h3 style={S.h3}>AI-Driven Battery Health Prediction</h3>

      <p style={S.p}>
        Traditional battery health monitoring is reactive — an alarm triggers when a threshold is crossed. AI/ML-based prediction systems analyze battery degradation patterns and predict the replacement need 3–6 months in advance.
      </p>

      <p style={S.p}>
        Implementation: BMS data (per-cell impedance trends, temperature patterns, cycle data) feeds machine learning models. Output: probability of failure in the next 90 days per string — maintenance teams get actionable advance notice.
      </p>

      <h3 style={S.h3}>Solid-State Batteries — Timeline</h3>

      <p style={S.p}>
        Solid-state batteries (solid electrolyte instead of liquid) theoretically offer: higher energy density, no liquid electrolyte leak risk, lower thermal runaway probability. Commercial reality: in 2024 solid-state is still being developed for the premium EV market — estimated timeline for Data Center stationary use is 2028–2032.
      </p>

      <Callout type="important" title="Important — Do Not Delay Projects for Solid-State">
        Do not delay current projects waiting for solid-state. Technology timelines always slip. Decide between VRLA and LFP based on current economics — solid-state will become relevant only when the first reliable Data Center installations are deployed and there is a 3–5 year operational track record.
      </Callout>

      <h3 style={S.h3}>Second-Life EV Batteries</h3>

      <p style={S.p}>
        EV batteries that have been retired from vehicle use (typically at 70–80% SoH) can be used for stationary storage. In India this market will start developing in 2025–2028 as EV volumes reach scale.
      </p>

      <p style={S.p}>
        Practical challenges right now: SOH verification difficult (each pack has a different history), warranty void, mixed cell batches create imbalance, insurance coverage unclear. Watch this space — commercial pilots are happening globally but India deployment is still 3–5 years away at scale.
      </p>

      <h3 style={S.h3}>Battery-as-a-Service (BaaS)</h3>

      <p style={S.p}>
        In the BaaS model, ownership of the battery bank does not stay with the operator — a service provider deploys, monitors, maintains and replaces the batteries. The customer pays a per-kWh or per-month fee. Capital expenditure is converted into OPEX.
      </p>

      <p style={S.p}>
        In India this model may gain traction in the hyperscale and co-location segments in 2026–2028. Advantage: battery replacement risk shifts to the service provider. Challenge: long-term contracts, service level definitions and exit provisions have to be negotiated carefully.
      </p>

      <h3 style={S.h3}>Flow Batteries for Long-Duration Storage</h3>

      <p style={S.p}>
        Vanadium Redox Flow Batteries (VRFB) are becoming economical for 4–12 hour storage as scale increases. In India they are becoming relevant for renewable energy integration and grid balancing — expect commercial projects in Data Center BESS applications from 2026+.
      </p>

      {/* ═══════════════════════════════════════════════════════════════
          PART 25 — KEY TAKEAWAYS
      ═══════════════════════════════════════════════════════════════ */}

      <h2 id="key-takeaways" style={S.h2}>Key Takeaways</h2>

      <p style={S.p}>
        After reading this complete battery bank guide — here is a structured summary that will be useful to you in the field.
      </p>

      <ul style={S.ul}>
        <li>
          <strong>Battery bank = Series (voltage) + Parallel (Ah).</strong> Combining these two operations creates a complete energy storage system — design both independently.
        </li>
        <li>
          <strong>VRLA is the standard now, LFP is the future.</strong> Budget-first = VRLA. TCO-first and space-constrained = LFP. Both are valid choices in different contexts.
        </li>
        <li>
          <strong>Sizing formula: Ah = (Load_W × Runtime_hr) ÷ (V_bus × DoD × η × Temp_f × Age_f).</strong> Not just Load, Voltage, DoD — apply both the temperature factor and the age factor for a production-ready design.
        </li>
        <li>
          <strong>Temperature = battery life's #1 enemy.</strong> In India, a 40°C battery room = VRLA life of 1.5–2 years actual vs 5 years rated. Battery room HVAC N+1 is mandatory, not optional.
        </li>
        <li>
          <strong>The annual capacity test is non-negotiable.</strong> Visual inspection and voltage checks do not detect the battery's actual SoH. IEEE 450/1188: SoH &lt;80% = replace immediately.
        </li>
        <li>
          <strong>Mixed-age strings = accelerated failure.</strong> When replacing a string — replace the whole string, not one cell. If the other strings are close to EOL, replace the entire bank.
        </li>
        <li>
          <strong>Per-string fusing is mandatory.</strong> Without individual string fuses, one fault can destroy the whole bank. Use DC-rated fuses, never AC fuses.
        </li>
        <li>
          <strong>Float voltage must be temperature-compensated.</strong> Without temperature compensation there will be chronic overcharge in the Indian summer — the most common cause of VRLA failure in Indian Data Centers.
        </li>
        <li>
          <strong>Tier III = N+1 strings, Tier IV = 2N independent banks.</strong> Physical separation is mandatory in Tier IV — separate rooms, separate HVAC, separate earthing, separate cable routes.
        </li>
        <li>
          <strong>Documentation = engineering memory.</strong> Document every discharge event, every maintenance visit, every test result. Without records, warranty claims and replacement decisions become anecdotal.
        </li>
        <li>
          <strong>DC arc flash is a real risk in a VRLA battery room.</strong> A 192V DC bank is a virtually unlimited short circuit current source. Insulated tools, face shield and arc-rated PPE are mandatory for any physical battery work.
        </li>
        <li>
          <strong>Actual implementation always depends on project requirements.</strong> There is no single universal battery bank design — utility requirements, OEM design, Data Center architecture and budget together decide the final design.
        </li>
      </ul>

      {/* ─── Live Calculator Toolkit ──────────────────────────────── */}
      <h3 style={S.h3}>Live Calculators — Battery Bank Design Toolkit</h3>

      <p style={S.p}>
        These calculators directly implement the formulas in this article. Use them to size your own project — no signup required.
      </p>

      {ahCalc && <CalculatorLink calculator={ahCalc} />}
      {qtyCalc && <CalculatorLink calculator={qtyCalc} />}
      {stringCalc && <CalculatorLink calculator={stringCalc} />}
      {runtimeCalc && <CalculatorLink calculator={runtimeCalc} />}
      {loadCalc && <CalculatorLink calculator={loadCalc} />}
      {redunCalc && <CalculatorLink calculator={redunCalc} />}
      {designerCalc && <CalculatorLink calculator={designerCalc} />}

      {/* ─── Related Articles ─────────────────────────────────────── */}
      <h3 style={S.h3}>What to Learn Next</h3>

      <p style={S.p}>
        Natural next steps after the battery bank:
      </p>

      <ul style={S.ul}>
        <li>
          <TopicLink slug="ups" variant="inline" /> — understand the complete architecture of the UPS that the battery bank is part of
        </li>
        <li>
          <TopicLink slug="dg-set" variant="inline" /> — after the battery bank, the DG Set starts — understand this coordination
        </li>
        <li>
          <TopicLink slug="sts" variant="inline" /> — the role of the STS alongside the battery bank in a dual bus architecture
        </li>
        <li>
          <TopicLink slug="pdu" variant="inline" /> — the power distribution chain from the UPS output to the rack
        </li>
      </ul>

      <Callout type="best-practice" title="Final Thought — Engineering is a Discipline">
        There are no shortcuts in battery bank engineering — every skipped test, every missed maintenance visit, every ignored alarm accumulates a risk. This risk is realized when an actual power failure happens. At that moment no remediation is possible. The only winning strategy is consistent, documented, standards-based maintenance — every time, without exception.
      </Callout>
    </>
  );
}
