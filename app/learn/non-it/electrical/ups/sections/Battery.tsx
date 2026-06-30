"use client";

// ═══════════════════════════════════════════════════════════════════════════
// app/learn/non-it/electrical/ups/sections/Battery.tsx
//
// Sections 14-17: Battery Types, Battery Bank Configuration (Series/Parallel/Series-Parallel), Battery & Runtime Calculation, Battery Monitoring System (BMS)
//
// Extracted unchanged from Phase 1-3 monolithic page.tsx as part of the
// folder restructure. Content is byte-identical to the original — only the
// file location and import paths have changed.
// ═══════════════════════════════════════════════════════════════════════════

import { S, Callout, ComparisonTable, Figure } from "../shared";
import TopicLink from "@/components/TopicLink";
import BatteryTypesDiagram from "../svg/BatteryTypesDiagram";
import BatterySeriesDiagram from "../svg/BatterySeriesDiagram";
import BatteryParallelDiagram from "../svg/BatteryParallelDiagram";
import BatterySeriesParallelDiagram from "../svg/BatterySeriesParallelDiagram";
import BatteryMonitoringDiagram from "../svg/BatteryMonitoringDiagram";
import { CalculatorLink } from "@/components/engineering/CalculatorLink";
import { getCalculator } from "@/lib/engineering/registry";

export default function Battery() {
  return (
    <>
        <h2 id="battery-types" style={S.h2}>Battery Types</h2>

        <p style={S.p}>
          UPS battery selection ek long-term decision hai — wrong choice se either backup time
          compromise hota hai ya total cost of ownership (TCO) badh jaata hai. 5 major battery
          technologies hain jo Data Center mein use hoti hain.
        </p>

        <Figure caption="Fig 9 — Visual comparison of common UPS battery form factors">
          <BatteryTypesDiagram />
        </Figure>

        <ComparisonTable
          headers={["Type", "Lifespan", "Maintenance", "Energy Density", "Typical Cost"]}
          rows={[
            ["VRLA (AGM/Gel)", "3-5 years", "Minimal", "Medium", "Lowest upfront"],
            ["Flooded (Vented Lead Acid)", "15-20 years", "High (water topping, equalize charge)", "Medium", "Low upfront, high labor"],
            ["Tubular", "10-15 years", "Moderate", "Medium-High", "Moderate"],
            ["Lithium-ion (LFP)", "10-15 years", "Very low", "High (smaller footprint)", "Highest upfront, lowest TCO"],
            ["Nickel Cadmium (NiCd)", "20+ years", "Low", "Low-Medium", "High upfront, niche use (extreme temps)"],
          ]}
        />

        <h3 style={S.h3}>VRLA vs Lithium-ion — Detailed Comparison</h3>

        <ComparisonTable
          headers={["Parameter", "VRLA", "Lithium-ion (LFP)"]}
          rows={[
            ["Weight (per kWh)", "Heavy — ~30-40 kg/kWh", "Light — ~8-12 kg/kWh"],
            ["Footprint", "Large — needs more room", "Compact — up to 70% smaller"],
            ["Cycle life", "300-500 cycles", "3000-5000 cycles"],
            ["Temperature sensitivity", "High (life halves every 8-10°C rise)", "Lower sensitivity, wider operating range"],
            ["Upfront cost", "Lower", "2-3× higher"],
            ["Total cost of ownership (10yr)", "Higher (multiple replacements)", "Often lower despite higher upfront"],
            ["Fire risk profile", "Lower thermal runaway risk", "Requires BMS + thermal management"],
          ]}
        />

        <h3 style={S.h3}>Flooded vs SMF (Sealed Maintenance Free)</h3>

        <ComparisonTable
          headers={["Parameter", "Flooded (Vented)", "SMF / VRLA"]}
          rows={[
            ["Electrolyte", "Liquid, visible, toppable", "Gel/absorbed, sealed"],
            ["Maintenance", "Regular water topping required", "None — sealed for life"],
            ["Ventilation requirement", "Dedicated battery room with H2 venting", "Standard room ventilation sufficient"],
            ["Lifespan", "Longer (15-20 yrs)", "Shorter (3-5 yrs)"],
            ["Best use case", "Large utility/telecom installations", "Data Centers, commercial UPS"],
          ]}
        />

        <h3 style={S.h3}>2V Cells vs 12V Blocks</h3>

        <ComparisonTable
          headers={["Parameter", "2V Cells (Flooded)", "12V Blocks (VRLA)"]}
          rows={[
            ["Individual cell monitoring", "Easier — each cell visible", "Harder — internal cells not individually accessible"],
            ["String assembly", "More connections needed", "Fewer connections, faster install"],
            ["Typical application", "Large telecom/utility plants", "Data Center, commercial UPS"],
            ["Failure isolation", "Single bad cell easy to spot/replace", "Whole 12V block must be replaced"],
          ]}
        />

        <Callout type="best-practice" title="Best Practice — Match Battery to Use Case">
          Agar Data Center 24×7 critical hai aur space premium hai → Lithium-ion consider karo despite
          higher upfront. Agar budget-constrained, standard commercial DC hai → VRLA industry default
          rehta hai. Telecom/utility installations with space available → Flooded/Tubular better TCO
          dete hain long-term.
        </Callout>

        {/* ═══════════════════════════════════════════════════════════════
            SECTION 15 — BATTERY BANK CONFIGURATION
        ═══════════════════════════════════════════════════════════════ */}
        <h2 id="battery-bank-config" style={S.h2}>Battery Bank: Series / Parallel / Series-Parallel</h2>

        <p style={S.p}>
          Individual batteries kaam nahi karti standalone — unhe ek <strong>bank</strong> mein arrange
          kiya jaata hai. Teen configurations possible hain, har ek ka different purpose hai.
        </p>

        <Figure caption="Fig 10 — Series connection: voltage adds up, capacity (Ah) stays same">
          <BatterySeriesDiagram />
        </Figure>

        <Figure caption="Fig 11 — Parallel connection: capacity (Ah) adds up, voltage stays same">
          <BatteryParallelDiagram />
        </Figure>

        <Figure caption="Fig 12 — Series-Parallel: both voltage and capacity scaled together">
          <BatterySeriesParallelDiagram />
        </Figure>

        <ComparisonTable
          headers={["Configuration", "Voltage Effect", "Capacity (Ah) Effect", "Use Case"]}
          rows={[
            ["Series", "Adds up (4 × 12V = 48V)", "Stays same as single battery", "Achieving required DC bus voltage"],
            ["Parallel", "Stays same", "Adds up (3 × 100Ah = 300Ah)", "Achieving required runtime/capacity"],
            ["Series-Parallel", "Adds up per string", "Adds up across strings", "Most real Data Center battery banks"],
          ]}
        />

        <Callout type="warning" title="Warning — Never Mix Battery Ages in Same String">
          Ek string mein kabhi old aur new battery mix mat karo. Weaker battery poori string ki
          performance degrade kar degi aur reverse-charge ho sakti hai backup ke time, jo permanent
          damage kar sakta hai. Pura string ek saath replace karo, individual batteries nahi.
        </Callout>

        <p style={S.p}>
          String aur quantity calculate karne ke liye dedicated calculators use karo:
        </p>

        {(() => {
          const stringCalc = getCalculator("ups.battery-string-calculator");
          const qtyCalc = getCalculator("ups.battery-quantity-calculator");
          return (
            <>
              {stringCalc && <CalculatorLink calculator={stringCalc} />}
              {qtyCalc && <CalculatorLink calculator={qtyCalc} />}
            </>
          );
        })()}

        {/* ═══════════════════════════════════════════════════════════════
            SECTION 16 — BATTERY & RUNTIME CALCULATION
        ═══════════════════════════════════════════════════════════════ */}
        <h2 id="battery-calculation" style={S.h2}>Battery & Runtime Calculation</h2>

        <p style={S.p}>
          Battery calculation ke peeche ka core formula simple hai, lekin har variable ka real impact
          samajhna zaroori hai — voltage, current, Ah, Wh, runtime, efficiency, depth of discharge,
          temperature, aur battery ageing.
        </p>

        <ComparisonTable
          headers={["Term", "Formula / Definition", "Why It Matters"]}
          rows={[
            ["Ah (Ampere-hour)", "Battery's charge capacity", "Defines how much current for how long"],
            ["Wh (Watt-hour)", "Ah × Voltage", "Total energy stored — comparable across voltages"],
            ["kWh", "Wh ÷ 1000", "Used for larger bank energy comparisons"],
            ["Depth of Discharge (DoD)", "% of capacity safely usable", "VRLA: 80% typical; Lithium: up to 90-95%"],
            ["Efficiency (η)", "Round-trip energy loss factor", "Accounts for conversion + internal losses, typically 0.85-0.92"],
            ["Battery Ageing", "Capacity degrades ~20% by end of life", "Always size for end-of-life capacity, not day-1 capacity"],
          ]}
        />

        <Callout type="important" title="Important — Temperature Effects on Battery Life">
          VRLA battery life manufacturer rating hamesha 25°C pe based hota hai. Every 8-10°C rise
          battery life ko roughly <strong>half</strong> kar deta hai. Yeh ek reason hai ki battery room
          dedicated cooling critical hai — Section 30 mein hum yeh detail se cover karenge.
        </Callout>

        <h3 style={S.h3}>Numerical Examples — Multiple Backup Durations</h3>

        <p style={S.p}>
          Neeche ek consistent 50kW load ke liye different backup durations ka Ah requirement
          dikhaya gaya hai (192V DC bus, 0.8 DoD, 0.9 efficiency assume karke):
        </p>

        <ComparisonTable
          headers={["Backup Duration", "Runtime (hr)", "Required Ah", "Typical Use Case"]}
          rows={[
            ["30 minutes", "0.5", "180.6 Ah", "Standard Data Center (DG backup available)"],
            ["60 minutes", "1.0", "361.1 Ah", "Extended bridge time, slower DG start"],
            ["90 minutes", "1.5", "541.7 Ah", "Critical facility with DG redundancy concerns"],
            ["120 minutes", "2.0", "722.2 Ah", "No DG available, grid-only backup design"],
            ["240 minutes", "4.0", "1444.4 Ah", "Remote site, extended grid outage tolerance"],
          ]}
        />

        <p style={{ ...S.p, fontSize: "0.85rem", color: "#94a3b8" }}>
          Calculation basis: Ah = (50,000W × Runtime_hr) ÷ (192V × 0.8 × 0.9)
        </p>

        <p style={S.p}>
          Apna khud ka load aur runtime calculate karna ho, toh in calculators ko use karo:
        </p>

        {(() => {
          const ahCalc = getCalculator("ups.battery-ah-calculator");
          const runtimeCalc = getCalculator("ups.runtime-calculator");
          return (
            <>
              {ahCalc && <CalculatorLink calculator={ahCalc} />}
              {runtimeCalc && <CalculatorLink calculator={runtimeCalc} />}
            </>
          );
        })()}

        <Callout type="interview" title="Interview Tip">
          Agar poocha jaaye "Battery sizing mein DoD kyun important hai?" — answer: <em>Battery ko 100%
          discharge karna permanently capacity damage karta hai. DoD limit (jaise 80% for VRLA) battery
          life preserve karta hai by avoiding deep discharge cycles — yeh trade-off hai usable capacity
          vs battery longevity ke beech.</em>
        </Callout>

        {/* ═══════════════════════════════════════════════════════════════
            SECTION 17 — BATTERY MONITORING SYSTEM (BMS)
        ═══════════════════════════════════════════════════════════════ */}
        <h2 id="battery-monitoring-system" style={S.h2}>Battery Monitoring System (BMS)</h2>

        <p style={S.p}>
          Battery failure aksar <strong>silent</strong> hoti hai — koi visible warning nahi, jab tak
          actual outage na aaye aur battery deliver na kar paaye. Battery Monitoring System (BMS) is
          blind spot ko khatam karta hai by continuously tracking individual cell health.
        </p>

        <Figure caption="Fig 13 — Battery Monitoring System architecture across a string">
          <BatteryMonitoringDiagram />
        </Figure>

        <ComparisonTable
          headers={["Parameter Monitored", "Why It Matters", "Early Warning Sign"]}
          rows={[
            ["Cell voltage", "Detects weak/failing cells before total failure", "Voltage drifts >5% from string average"],
            ["Internal impedance", "Rising impedance = capacity loss", "Impedance trend increasing over months"],
            ["Temperature", "Heat accelerates ageing exponentially", "Cell running hotter than neighbors"],
            ["Float current", "Indicates charge health", "Abnormally high float current = possible short"],
            ["Ripple current", "Excess ripple stresses battery", "Ripple exceeding OEM spec"],
          ]}
        />

        <Callout type="best-practice" title="Best Practice — Predictive vs Reactive Maintenance">
          BMS predictive maintenance ko enable karta hai — weak battery ko replace karo before failure,
          not after. Yeh approach unplanned outages ko dramatically reduce karta hai aur battery
          replacement ko scheduled maintenance window mein plan karne deta hai.
        </Callout>

        <p style={S.p}>
          BMS data typically <TopicLink slug="dcim" variant="inline" /> ya facility{" "}
          <TopicLink slug="bms" variant="inline" /> system ko feed hota hai centralized monitoring ke
          liye — hum is integration ko Section 37 (Monitoring Protocols) mein detail se cover karenge.
        </p>

        {/* ═══════════════════════════════════════════════════════════════
            SECTION 18 — DC BUS
        ═══════════════════════════════════════════════════════════════ */}
    </>
  );
}
