"use client";

// ═══════════════════════════════════════════════════════════════════════════
// app/learn/non-it/electrical/battery-bank/sections/ElectricalFundamentals.tsx
//
// Part 3 — Electrical Fundamentals (3.0–3.11)
// Part 4 — Battery Life Calculator Inputs (4.0–4.10)
// ═══════════════════════════════════════════════════════════════════════════

import { S, Callout, ComparisonTable, SectionIntro } from "../shared";
import SeriesParallelBankDiagram from "../svg/SeriesParallelBankDiagram";
import { Figure } from "../shared";

export default function ElectricalFundamentals() {
  return (
    <>
      {/* ═══════════════════════════════════════════════════════════════
          PART 3 — ELECTRICAL FUNDAMENTALS
      ═══════════════════════════════════════════════════════════════ */}

      <h2 id="electrical-fundamentals" style={S.h2}>Electrical Fundamentals</h2>

      <SectionIntro
        quickAnswer="For battery sizing, 10 concepts must be understood: Ah, Wh, C-rate, DoD, SoC, SoH, internal resistance, float voltage, Peukert's Law and ripple current. Miss even one of them and the sizing can go wrong."
        engineerTip="The most common sizing mistake: using rated Ah without C-rate correction. If a battery is rated at C10 = 100Ah and you discharge it at the C3 rate (which happens at high loads), the actual available Ah will be only 70–80Ah. Always check what the OEM datasheet gives as the C-rate at your discharge rate."
        keyTakeaway="Ah tells how much current can be delivered; Wh tells how much energy there is — in Data Center sizing Ah is more directly useful because the bus voltage is fixed."
      />

      <h3 id="ah-explained" style={S.h3}>Ah (Ampere-Hour) — What It Really Means</h3>

      <p style={S.p}>
        Ah = Amperes × Hours. A 100Ah battery can deliver 100 Amperes for 1 hour, or 50 Amperes for 2 hours, or 10 Amperes for 10 hours — <em>ideally</em>. In reality, because of the Peukert effect, drawing more current gives you less total Ah.
      </p>

      <p style={S.p}>
        Battery capacity is usually rated at the <strong>C10 or C20 rate</strong>: <em>C10 means complete discharge in 10 hours; C20 in 20 hours</em>. Data Center backup is typically 10–15 minutes — this is the C0.17 to C0.25 rate. The Ah available at this high rate will be significantly less than the C10 rated Ah. Always check the OEM's high-rate discharge table.
      </p>

      <ComparisonTable
        headers={["Discharge Rate", "Discharge Time", "Available Ah (example, 100Ah @ C10)", "Application"]}
        rows={[
          ["C20", "20 hours", "110–120 Ah (more than rated)", "Solar, telecom long backup"],
          ["C10", "10 hours", "100 Ah (rated value)", "Baseline reference"],
          ["C5", "5 hours", "85–90 Ah", "Moderate backup"],
          ["C1", "1 hour", "65–75 Ah", "Short UPS backup"],
          ["C0.5", "30 minutes", "55–65 Ah", "Typical Data Center backup"],
          ["C0.17", "10 minutes", "45–55 Ah", "Standard DC UPS bridge"],
        ]}
      />

      <h3 id="wh-explained" style={S.h3}>Wh (Watt-Hour) — Energy vs Capacity</h3>

      <p style={S.p}>
        Wh = Watt × Hour = (Voltage × Current) × Hour = Voltage × Ah.
      </p>

      <p style={S.p}>
        Formula: <strong>Energy (Wh) = Ah × Voltage</strong>
      </p>

      <p style={S.p}>
        Example: A 100Ah battery bank at 192V DC = 100 × 192 = 19,200 Wh = 19.2 kWh of energy stored. It can sustain a 500kW load for 19,200 ÷ 500,000 = 0.0384 hours = 2.3 minutes (without losses, DoD correction, etc.).
      </p>

      <Callout type="important" title="Important — kWh vs Ah: Which to Use for Sizing?">
        Use <strong>Ah</strong> in battery sizing, not kWh — because the DC bus voltage is fixed and the charger/inverter handles Ah directly. kWh is useful for energy cost calculations, TCO comparisons and grid-level BESS sizing. Both are ultimately the same information, just in a different unit.
      </Callout>

      <h3 id="c-rate" style={S.h3}>C-Rate — Charge and Discharge Rate</h3>

      <p style={S.p}>
        C-rate = Current ÷ Rated Ah. The C1 rate means the battery will discharge its full Ah capacity in 1 hour. C0.1 = in 10 hours. C10 = in 6 minutes (very fast, very harsh).
      </p>

      <p style={S.p}>
        <strong>Charge C-rate:</strong> The typical maximum charge rate of VRLA batteries is 0.1C to 0.25C — charge faster and there is an overcharge risk. After a full discharge, VRLA typically recharges fully in 8–12 hours at the 0.1C rate. LFP accepts faster charge (0.5C–1C common), so a recharge time of 2–4 hours is possible.
      </p>

      <h3 id="depth-of-discharge" style={S.h3}>Depth of Discharge (DoD)</h3>

      <p style={S.p}>
        DoD = percentage of battery capacity that was discharged. 100% DoD = completely empty;
        50% DoD = half empty; 20% DoD = barely used.
      </p>

      <p style={S.p}>
        Higher DoD = more energy used per cycle, but fewer total cycles. Lower DoD = less energy per cycle, but far more cycles. In Data Center sizing we typically use <strong>80% DoD for VRLA, 90% DoD for LFP</strong> as the maximum design limit.
      </p>

      <ComparisonTable
        headers={["DoD Used", "VRLA Cycles", "LFP Cycles", "Implication"]}
        rows={[
          ["20%", "1500–2000", "8000+", "Very conservative — rarely needed"],
          ["50%", "600–700", "4000–5000", "Moderate — extended life"],
          ["80%", "250–350", "2000–3000", "Standard for VRLA design limit"],
          ["90%", "150–200", "1500–2000", "Standard for LFP design limit"],
          ["100%", "100–150", "800–1000", "Never design to this — permanent damage risk"],
        ]}
      />

      <Callout type="best-practice" title="Best Practice — Design DoD vs Actual DoD">
        Design DoD (the one you use in the sizing formula) is different from actual DoD. Designing for 80% DoD means: size it so the battery uses 80% of rated capacity to provide the required runtime. The remaining 20% is a buffer for unexpected longer outages. In actual discharge events the load lasts only 10–15 minutes — the battery almost never hits 80% DoD in practice.
      </Callout>

      <h3 id="state-of-charge" style={S.h3}>State of Charge (SoC)</h3>

      <p style={S.p}>
        SoC = how charged the battery is, from 0–100%. SoC = 100% means fully charged; SoC = 0% means completely discharged. In lead acid it is difficult to measure SoC accurately — there is the open circuit voltage method, but if the battery was recently charged or discharged, the voltage takes time to settle. The BMS uses sophisticated algorithms to estimate SoC accurately (Coulomb counting + voltage cross-check).
      </p>

      <h3 id="state-of-health" style={S.h3}>State of Health (SoH)</h3>

      <p style={S.p}>
        SoH = the battery's actual capacity compared to its original rated capacity. SoH = 100% means brand new; SoH = 80% means the battery has lost 20% of its original capacity — according to IEEE 450/1188 this is the <strong>end-of-life threshold</strong> for stationary batteries.
      </p>

      <p style={S.p}>
        To measure SoH, an actual capacity discharge test has to be done (against rated Ah). Impedance testing is a surrogate for SoH — not accurate, but useful for non-intrusive tracking.
      </p>

      <Callout type="important" title="Important — SoH = 80% Means Replace">
        IEEE 450 and IEEE 1188 both say: if the measured capacity is less than 80% of rated capacity, the battery is at end-of-life — replace it. This 80% threshold exists because after this point capacity degradation becomes exponential. 79% today could mean 60% in 6 months.
      </Callout>

      <h3 id="internal-resistance" style={S.h3}>Internal Resistance & Impedance</h3>

      <p style={S.p}>
        The battery's internal resistance causes power loss (P = I²R) and a terminal voltage drop under load. Internal resistance increases with aging — it is a key indicator of battery health.
      </p>

      <p style={S.p}>
        <strong>Impedance testing</strong> measures internal resistance by injecting an AC signal — compare it with the baseline. IEEE 1188 guideline: if impedance is {">"}2× the baseline, replace the battery. This is a non-intrusive test — the battery stays on float during the test.
      </p>

      <ComparisonTable
        headers={["Impedance Ratio (vs Baseline)", "Status", "Action"]}
        rows={[
          ["< 1.25×", "GREEN — healthy", "Continue normal maintenance schedule"],
          ["1.25× – 1.5×", "MONITOR — slight degradation", "Increase monitoring frequency, plan replacement"],
          ["1.5× – 2.0×", "AMBER — significant degradation", "Schedule replacement within 6–12 months"],
          ["> 2.0×", "RED — end of life", "Replace immediately — IEEE 1188 threshold"],
        ]}
      />

      <h3 id="float-vs-equalisation" style={S.h3}>Float Voltage vs Equalisation Voltage vs Boost Voltage</h3>

      <p style={S.p}>
        There are three different charge voltages — each for a different purpose:
      </p>

      <ul style={S.ul}>
        <li>
          <strong>Float Voltage:</strong> The normal operating voltage when the battery is fully charged and on maintenance charge. VRLA AGM: 2.25–2.27V per cell. LFP: 3.4–3.5V per cell. It is always on.
        </li>
        <li>
          <strong>Boost/Equalisation Voltage:</strong> A higher voltage applied periodically to balance cells and remove early sulphation. VRLA AGM: 2.33–2.40V per cell. Scheduled, not continuous.
        </li>
        <li>
          <strong>Temperature Compensation:</strong> Float voltage should be adjusted with temperature. Typical coefficient: −3 to −4 mV per cell per °C above 25°C. Reduce float voltage in a hot ambient; increase it in cold. Wrong compensation = overcharge or undercharge = premature failure.
        </li>
      </ul>

      <Callout type="danger" title="Danger — Overcharge is the #1 Killer of VRLA">
        If float voltage is set {">"}0.05V per cell higher than the OEM spec: electrolyte gassing increases → the AGM mat dries out → capacity is permanently reduced → heat increases → positive plate corrosion accelerates → premature death. Turn on temperature compensation in the charger and verify the float voltage exactly against the OEM datasheet before commissioning.
      </Callout>

      <h3 id="peukerts-law" style={S.h3}>Peukert&apos;s Law — Why Rated Ah Is Not Always Available</h3>

      <p style={S.p}>
        Peukert&apos;s Law: <strong>Ah_actual = C × (I_rated ÷ I_actual)^(n−1)</strong>
      </p>

      <p style={S.p}>
        Where: C = rated capacity, I_rated = rated current (at C10 typically), I_actual = actual
        discharge current, n = Peukert exponent (1.1–1.3 for VRLA, ~1.05 for LFP).
      </p>

      <p style={S.p}>
        Simplified: <strong>discharge faster, and less Ah is available</strong>. This is especially important in Data Center sizing, where a 10-minute backup at high current means you are at a high C-rate. Always use the OEM&apos;s high-rate discharge table instead of rated Ah.
      </p>

      <ComparisonTable
        headers={["Scenario", "Load", "Bus Voltage", "Discharge Current", "C-Rate", "Available Ah (100Ah battery)"]}
        rows={[
          ["C10 (reference)", "19.2 kW", "192V", "100A", "C10", "100 Ah"],
          ["30-min backup", "38.4 kW", "192V", "200A", "C5", "88 Ah (−12%)"],
          ["10-min backup", "115.2 kW", "192V", "600A", "C1.67", "72 Ah (−28%)"],
          ["5-min backup", "230.4 kW", "192V", "1200A", "C0.83", "62 Ah (−38%)"],
        ]}
      />

      <h3 id="ripple-current" style={S.h3}>Ripple Current — The Hidden Battery Killer</h3>

      <p style={S.p}>
        DC power coming from the charger or UPS rectifier is actually not perfectly smooth — it has an AC component called <strong>ripple current</strong>. This ripple flows through the battery and causes I²R heating internally.
      </p>

      <p style={S.p}>
        IEEE 1187 recommends ripple current &lt; 5% of rated Ah (in amperes) for VRLA batteries. Higher ripple = higher internal heating = accelerated aging = premature failure. Modern IGBT-based chargers produce much lower ripple compared to older SCR-based chargers — this is one reason the batteries of a modern UPS should last longer.
      </p>

      <Callout type="important" title="Important — Verify Ripple at Installation">
        At commissioning, measure ripple current at the charger output with a clamp meter. If you find {">"}5% of rated Ah, check the charger filter or consult the OEM. Record this measurement in the documentation and repeat it in annual maintenance.
      </Callout>

      {/* ═══════════════════════════════════════════════════════════════
          PART 4 — BATTERY LIFE CALCULATOR INPUTS
      ═══════════════════════════════════════════════════════════════ */}

      <h2 id="battery-life-inputs" style={S.h2}>Battery Life Calculator Inputs</h2>

      <SectionIntro
        quickAnswer="Battery life is not just the years written in the OEM datasheet — actual life is the product of multiple factors. Temperature, DoD, float voltage accuracy, ripple current and cycling together decide the actual life."
        engineerTip="In India, the most common underestimate of battery life is that the OEM's rated life assumes 25°C. Data Center battery rooms often run at a 30–35°C average (especially in AC failure scenarios). At 35°C, VRLA life is halved. Calculate the actual expected life at your operating temperature and plan the replacement budget accordingly."
        keyTakeaway="Adjusted Life = Rated Life × Temperature Factor × DoD Factor × Float Factor × Ripple Factor — each factor multiplies independently."
      />

      <p style={S.p}>
        Battery life estimation is a multi-variable problem. The OEM datasheet's rated life assumes 25°C, standard float voltage and low C-rate cycling. Real-world conditions are different everywhere. This section explains each input variable.
      </p>

      <h3 style={S.h3}>Life Estimation Formula</h3>

      <p style={S.p}>
        <strong>Adjusted Life (years) = Rated Life × T_factor × DoD_factor × Float_factor × Ripple_factor</strong>
      </p>

      <h3 style={S.h3}>Input 1 — Ambient Temperature</h3>

      <ComparisonTable
        headers={["Ambient Temperature", "VRLA Life Multiplier", "LFP Life Multiplier", "Notes"]}
        rows={[
          ["15°C", "1.5×", "1.1×", "Cooler than reference — longer life"],
          ["20°C", "1.2×", "1.05×", "Slightly above ideal"],
          ["25°C", "1.0×", "1.0×", "OEM rated life reference point"],
          ["30°C", "0.67×", "0.9×", "VRLA life reduces significantly"],
          ["35°C", "0.50×", "0.75×", "VRLA life halved — common Indian DC room temp"],
          ["40°C", "0.33×", "0.60×", "VRLA at severe risk — 1/3 of rated life"],
          ["45°C", "0.20×", "0.40×", "Indian summer worst case — critical situation"],
        ]}
      />

      <Callout type="danger" title="Danger — Indian Summer Impact on VRLA Battery Life">
        In India, many Data Centers, especially Tier I/II, do not treat battery room cooling as critical. If the ambient is regularly 40°C, VRLA life from a 5-year rating stays only ~1.5–2 years actual. This causes both surprise replacement cost and runtime risk. Battery room HVAC N+1 redundancy is mandatory, not optional.
      </Callout>

      <h3 style={S.h3}>Input 2 — Depth of Discharge (DoD Factor)</h3>

      <ComparisonTable
        headers={["Design DoD", "VRLA DoD Factor", "LFP DoD Factor"]}
        rows={[
          ["20%", "2.5×", "3.0×"],
          ["40%", "1.8×", "2.0×"],
          ["60%", "1.2×", "1.4×"],
          ["80%", "1.0×", "1.0×"],
          ["90%", "0.6×", "0.9×"],
          ["100%", "0.3×", "0.5×"],
        ]}
      />

      <h3 style={S.h3}>Input 3 — Charge Cycles</h3>

      <p style={S.p}>
        Discharge events are rare for Data Center batteries — real grid failures. Typical Data Center: 1–4 significant discharge events per year. Cycle life is rarely the limiting factor for VRLA; temperature and float accuracy are more critical. For sites with frequent power cuts (common in India at DG-dependent sites), cycle count matters more.
      </p>

      <h3 style={S.h3}>Input 4 — Float Voltage Accuracy</h3>

      <ComparisonTable
        headers={["Float Voltage Deviation", "Life Impact", "Failure Mode"]}
        rows={[
          ["+0.1V/cell above OEM spec", "Life −40% to −60%", "Dry-out (VRLA), thermal runaway risk"],
          ["+0.05V/cell above spec", "Life −15% to −25%", "Gradual dry-out, accelerated corrosion"],
          ["Exactly at OEM spec", "Rated life", "Normal operation"],
          ["−0.05V/cell below spec", "Life −10% to −20%", "Chronic undercharge, sulphation"],
          ["−0.1V/cell below spec", "Life −30% to −50%", "Progressive sulphation — irreversible"],
        ]}
      />

      <h3 style={S.h3}>Input 5 — Ripple Current</h3>

      <ComparisonTable
        headers={["Ripple Current (% of Ah)", "Life Impact"]}
        rows={[
          ["< 2%", "No measurable impact"],
          ["2–5%", "Slight heating — minor life reduction"],
          ["5–10%", "Life −10% to −20%"],
          ["> 10%", "Significant heating — life −30%+"],
        ]}
      />

      <h3 style={S.h3}>Input 6 — Age Factor</h3>

      <p style={S.p}>
        IEEE 485 recommends sizing with an ageing factor. If you want the battery bank to still
        provide required runtime at end of design life, size for 125% of calculated Ah (i.e., divide
        by 0.80). This accounts for 20% capacity loss at end of life.
      </p>

      <h3 style={S.h3}>Battery Life Calculator Input Table</h3>

      <ComparisonTable
        headers={["Input Parameter", "Your Value", "Unit", "Where to Find"]}
        rows={[
          ["Rated battery life (OEM)", "—", "Years", "OEM datasheet — usually at 25°C"],
          ["Ambient temperature", "—", "°C", "Battery room HVAC design / actual measurement"],
          ["Temperature life factor", "—", "Multiplier", "Table above"],
          ["Design Depth of Discharge", "—", "%", "Your sizing calculation"],
          ["DoD life factor", "—", "Multiplier", "Table above"],
          ["Float voltage deviation", "—", "±V/cell", "Charger setting vs OEM spec"],
          ["Float voltage life factor", "—", "Multiplier", "Table above"],
          ["Ripple current", "—", "% of Ah", "Measured at commissioning"],
          ["Ripple life factor", "—", "Multiplier", "Table above"],
          ["Adjusted Life", "= All factors multiplied", "Years", "Your expected real battery life"],
        ]}
      />

      <Figure caption="Fig 3 — Series-Parallel Battery Bank: 3 strings × 4 cells = 48V / 300Ah bank. Voltage from series, Ah from parallel strings.">
        <SeriesParallelBankDiagram />
      </Figure>

      <h3 style={S.h3}>Worked Example — Indian Summer Conditions (45°C Ambient)</h3>

      <p style={S.p}>
        VRLA AGM battery, rated 5-year life at 25°C. Battery room operates at 40°C average (AC
        not perfectly maintained). Float voltage +0.03V/cell over OEM spec (common misconfiguration).
        Ripple 3%. Design DoD 80%.
      </p>

      <ComparisonTable
        headers={["Factor", "Value", "Multiplier"]}
        rows={[
          ["Rated life", "5 years", "—"],
          ["Temperature @ 40°C", "40°C", "0.33×"],
          ["DoD @ 80%", "Design limit", "1.0×"],
          ["Float +0.03V/cell", "Slight overcharge", "0.88×"],
          ["Ripple @ 3%", "Minor", "0.95×"],
          ["Adjusted Life", "5 × 0.33 × 1.0 × 0.88 × 0.95", "≈ 1.4 years"],
        ]}
      />

      <p style={S.p}>
        Result: battery rated at 5 years actually only lasts ~1.4 years in this scenario. This
        is why Indian Data Centers often see VRLA replacement every 2–3 years instead of 4–5.
        Fix: bring temperature to 25°C, set correct float voltage, measure and fix ripple.
      </p>

      <h3 style={S.h3}>Worked Example — Ideal Conditions (25°C, 40% DoD)</h3>

      <ComparisonTable
        headers={["Factor", "Value", "Multiplier"]}
        rows={[
          ["Rated life", "5 years", "—"],
          ["Temperature @ 25°C", "Reference", "1.0×"],
          ["DoD @ 40%", "Conservative", "1.8×"],
          ["Float exactly at OEM spec", "Perfect", "1.0×"],
          ["Ripple < 2%", "Negligible", "1.0×"],
          ["Adjusted Life", "5 × 1.0 × 1.8 × 1.0 × 1.0", "= 9 years"],
        ]}
      />

      <p style={S.p}>
        Same battery, ideal conditions: 9 years. The difference between 1.4 years and 9 years is purely operational discipline — temperature control and correct voltage settings. This calculation is the strongest argument for justifying HVAC investment.
      </p>
    </>
  );
}
