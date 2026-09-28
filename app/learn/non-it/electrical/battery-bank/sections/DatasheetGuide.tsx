"use client";

// ═══════════════════════════════════════════════════════════════════════════
// app/learn/non-it/electrical/battery-bank/sections/DatasheetGuide.tsx
//
// Part 5 — OEM Datasheet Reading Guide (Blueprint v3.0 Part 5)
// 14 parameters every engineer must read before selecting a battery.
// ═══════════════════════════════════════════════════════════════════════════

import { S, Callout, ComparisonTable, SectionIntro } from "../shared";

export default function DatasheetGuide() {
  return (
    <>
      {/* ═══════════════════════════════════════════════════════════════
          PART 5 — OEM DATASHEET READING GUIDE
      ═══════════════════════════════════════════════════════════════ */}

      <h2 id="datasheet-guide" style={S.h2}>OEM Datasheet Reading Guide</h2>

      <SectionIntro
        quickAnswer="A battery datasheet is not just a sheet of numbers — it is an engineering contract between the OEM and the engineer. Every parameter is valid for a specific condition. Using a number without understanding that condition will make the sizing wrong."
        engineerTip="In the datasheet, look at the 'test conditions' column first. If it says 100Ah at the C10 rate but your actual discharge will be at the C0.5 rate, you must use the OEM's high-rate discharge table — not the rated Ah. This difference can be 30-40%."
        keyTakeaway="One wrong datasheet reading = an undersized battery bank = servers down in a real outage."
      />

      <p style={S.p}>
        Exide, Amara Raja, EnerSys, Narada, Huawei — every OEM's datasheet format is slightly different. But there are 14 core parameters you will find in every battery's datasheet.
      </p>

      <p style={S.p}>
        Understanding these 14 parameters = making the right battery selection. Miss any one = a gap in the design.
      </p>

      {/* ─── Parameter 1: Ah Rating ──────────────────────────────────── */}
      <h3 style={S.h3}>1. Ah Rating — Ampere-Hour Capacity</h3>

      <p style={S.p}>
        This is the most basic number but also the most misread. &quot;100Ah&quot; means the battery is rated to store 100Ah of capacity — <strong>at a specific C-rate and temperature</strong>.
      </p>

      <ComparisonTable
        headers={["Datasheet Notation", "Meaning", "Actual Runtime"]}
        rows={[
          ["C10 = 100Ah", "100A for 10 hours", "10 hours at 10A discharge"],
          ["C20 = 120Ah", "120A for 20 hours (more Ah at slower rate)", "20 hours at 6A discharge"],
          ["C3 = 80Ah", "80Ah available at 3-hour discharge rate", "3 hours at ~26A discharge"],
          ["C0.5 = 60Ah", "Only 60Ah at 2× rated current (30-min backup)", "30 min at ~120A discharge"],
        ]}
      />

      <Callout type="danger" title="Danger — Never Use C20 Ah for 10-Min UPS Sizing">
        If the datasheet shows C20 = 150Ah and you are sizing a 10-minute backup, do not use the C20 Ah. A 10-minute discharge ≈ the C0.17 rate — the actual available Ah will be ~85-95Ah. Get the actual Ah from the OEM's high-rate discharge curve or table. This difference can be 30-40% — it translates directly into a runtime shortfall during a real outage.
      </Callout>

      {/* ─── Parameter 2: C10/C20 Rating ─────────────────────────────── */}
      <h3 style={S.h3}>2. C10 / C20 / C8 Rating — Discharge Rate Reference</h3>

      <p style={S.p}>
        The &apos;n&apos; in Cn notation = discharge time in hours. C10 = full discharge in 10 hours. C20 = in 20 hours. This is only a rating reference point — the actual application's C-rate can be different.
      </p>

      <p style={S.p}>
        Data Center UPS applications are typically in the C0.17 to C0.5 range (10 to 30 minute backup). Most datasheets use a C10 or C20 reference. The engineer's job is to find the actual available Ah by interpolation or from the OEM table.
      </p>

      <Callout type="best-practice" title="Best Practice — Always Ask for the OEM's High-Rate Discharge Table">
        At procurement time, explicitly ask the vendor: &quot;Please provide high-rate discharge table at C0.5, C0.25, C0.17 rates.&quot; If the vendor cannot provide this, the battery's design life and actual performance are uncertain. Top-tier vendors (EnerSys, Exide, Amara Raja, Narada) provide this data.
      </Callout>

      {/* ─── Parameter 3: Float Voltage ───────────────────────────────── */}
      <h3 style={S.h3}>3. Float Voltage — Normal Operating Voltage</h3>

      <p style={S.p}>
        Float voltage is the voltage at which the battery is fully charged and which the UPS charger continuously maintains. It is the battery's &quot;resting, ready state&quot;.
      </p>

      <ComparisonTable
        headers={["Battery Type", "Float Voltage per Cell", "Notes"]}
        rows={[
          ["VRLA AGM", "2.25–2.27V/cell", "Most common — Exide, Amara Raja, EnerSys"],
          ["VRLA Gel", "2.23–2.25V/cell", "Slightly lower — mixing AGM/Gel charger setting is dangerous"],
          ["VLA (Flooded)", "2.23–2.25V/cell", "Depends on electrolyte specific gravity"],
          ["LFP (Lithium Iron Phosphate)", "3.40–3.45V/cell", "Completely different — dedicated BMS controls"],
          ["NMC Lithium", "4.15–4.20V/cell", "High voltage — strict BMS required"],
        ]}
      />

      <Callout type="danger" title="Danger — Setting Float Voltage Wrong = Guaranteed Premature Failure">
        Set the charger at 2.35V/cell for a VRLA AGM battery — the battery will fail from dry-out in 6-12 months. Set it at 2.20V/cell — chronic undercharge will cause sulphation. Use the exact float voltage from the OEM datasheet. After commissioning, verify the actual charger output voltage every 6 months — charger components drift.
      </Callout>

      {/* ─── Parameter 4: Boost/Equalisation Voltage ──────────────────── */}
      <h3 style={S.h3}>4. Boost / Equalisation Voltage — When and Why</h3>

      <p style={S.p}>
        It is higher than float voltage — typically 2.30–2.40V/cell for VRLA AGM. It is applied periodically to balance cells, remove early sulphation and recover from deep discharge.
      </p>

      <ComparisonTable
        headers={["Voltage Type", "VRLA AGM", "Purpose", "Frequency"]}
        rows={[
          ["Float (continuous)", "2.25–2.27V/cell", "Maintain full charge, compensate self-discharge", "Always on"],
          ["Boost/Equalisation", "2.33–2.40V/cell", "Balance cells, remove sulphation", "Monthly or after deep discharge"],
          ["Absorption (after discharge)", "2.40–2.45V/cell (for limited time)", "Fast recharge after discharge", "Per discharge event, time-limited"],
        ]}
      />

      <Callout type="warning" title="Warning — Equalisation Frequency: VRLA vs VLA Is Different">
        VLA (flooded) batteries benefit from regular equalisation. In VRLA AGM, more frequent equalisation increases dry-out risk — it is sealed and gas cannot escape easily. OEM recommendation for VRLA: monthly or after deep discharge only. Never equalize a VRLA battery without OEM-specified voltage limits.
      </Callout>

      {/* ─── Parameter 5: Design Life vs Cycle Life ───────────────────── */}
      <h3 style={S.h3}>5. Design Life vs Cycle Life — Two Different Numbers</h3>

      <p style={S.p}>
        These are two completely different specifications that are often confused.
      </p>

      <ComparisonTable
        headers={["Specification", "Definition", "Limiting Condition", "Typical VRLA", "Typical LFP"]}
        rows={[
          ["Design Life (Float Life)", "Continuous float service life at reference temp", "Temperature (halves every 10°C above 25°C)", "3–5 years at 25°C", "10–15 years at 25°C"],
          ["Cycle Life", "Number of complete charge-discharge cycles before 80% capacity", "Depth of Discharge per cycle", "300–500 cycles at 80% DoD", "3000–5000 cycles at 80% DoD"],
        ]}
      />

      <p style={S.p}>
        Data Center UPS batteries are mostly in float service — discharge events are rare. That is why <strong>Design Life</strong> is the more relevant specification for Data Center battery selection.
      </p>

      <p style={S.p}>
        Cycle life is relevant for BESS (Battery Energy Storage Systems), where daily cycling happens, or for unstable grid sites where there are frequent power cuts.
      </p>

      {/* ─── Parameter 6: Internal Resistance ────────────────────────── */}
      <h3 style={S.h3}>6. Internal Resistance — Battery Health Indicator</h3>

      <p style={S.p}>
        Internal resistance (mΩ) measures how efficiently the battery can deliver current. A new battery has low resistance — it increases with ageing.
      </p>

      <ComparisonTable
        headers={["Battery Condition", "Internal Resistance (typical VRLA 100Ah cell)", "Implication"]}
        rows={[
          ["New (baseline)", "3–8 mΩ", "Reference — measure at commissioning, document"],
          ["Healthy aging", "Up to 1.25× baseline", "Normal — continue monitoring"],
          ["Moderate degradation", "1.25–2.0× baseline", "Monitor closely, plan replacement"],
          ["End of life", "> 2.0× baseline (IEEE 1188 threshold)", "Replace immediately"],
        ]}
      />

      <Callout type="important" title="Important — Baseline Measurement Non-Negotiable">
        At commissioning, <strong>measure and record the impedance of every cell</strong>. This baseline is the reference for future comparison. Without a baseline, future test values are meaningless — you do not know what healthy was. A BMS can track this automatically; it can also be done with a standalone impedance tester.
      </Callout>

      {/* ─── Parameter 7: Max Discharge Current ──────────────────────── */}
      <h3 style={S.h3}>7. Maximum Discharge Current — The Hard Limit</h3>

      <p style={S.p}>
        Every battery cell has a maximum continuous discharge current rating. Drawing more current than this causes internal heating, plate damage and permanent capacity loss.
      </p>

      <p style={S.p}>
        It is typically <strong>2C to 5C</strong> — 200A to 500A maximum continuous for a 100Ah battery. In UPS sizing, verify that the worst-case discharge current (at minimum bus voltage) does not exceed the cell's maximum rating.
      </p>

      <Callout type="best-practice" title="Best Practice — Check Short Circuit Current Too">
        The datasheet also gives short circuit current — typically 1000A to 5000A+ for large cells. This value is used for protection sizing. The fuse rating should be somewhat above this value to clear a fault, but should not trip at normal current. DC-rated fuses are mandatory — do not use AC fuses in DC systems.
      </Callout>

      {/* ─── Parameter 8: Short Circuit Current ──────────────────────── */}
      <h3 style={S.h3}>8. Short Circuit Current — Protection Sizing Reference</h3>

      <p style={S.p}>
        The short circuit current of a battery bank is very high. Formula: <strong>I_SC = V_bank ÷ R_total_cable</strong>. A 192V bank with 2mΩ total cable resistance = 192 ÷ 0.002 = 96,000A — nearly 100kA fault current.
      </p>

      <p style={S.p}>
        That is why DC-rated fuses are mandatory. Standard AC MCBs cannot interrupt DC fault current — a DC arc has no zero crossing, the arc burns continuously, and catastrophic damage happens.
      </p>

      {/* ─── Parameter 9: Weight ──────────────────────────────────────── */}
      <h3 style={S.h3}>9. Weight — Floor Loading and Handling</h3>

      <p style={S.p}>
        VRLA batteries are very heavy. Large 2V stationary cells come from 100Ah to 3000Ah — weight can range from 15kg to 300kg+ per cell.
      </p>

      <ComparisonTable
        headers={["Battery Type", "Weight per kWh", "Example: 100kWh Bank", "Floor Loading"]}
        rows={[
          ["VRLA (2V large cells)", "30–40 kg/kWh", "3000–4000 kg", "High — structural engineer consultation needed"],
          ["VRLA (12V monobloc)", "25–35 kg/kWh", "2500–3500 kg", "Moderate to high"],
          ["LFP (Li-ion)", "8–12 kg/kWh", "800–1200 kg", "Much lower — 70% weight saving"],
        ]}
      />

      <Callout type="important" title="Important — Floor Loading Calculation Before Room Finalization">
        Verify the battery room floor loading (kN/m²) with a structural engineer <strong>before ordering batteries</strong>. Standard office floor: 2.5 kN/m². VRLA battery bank: easily 10-15 kN/m² or more. Strengthening the structure post-construction is expensive. LFP selection is sometimes justified only because of the floor loading constraint.
      </Callout>

      {/* ─── Parameter 10: Temperature Rating ────────────────────────── */}
      <h3 style={S.h3}>10. Temperature Rating — Operating vs Storage vs Optimum</h3>

      <ComparisonTable
        headers={["Temperature Parameter", "Typical Range", "Critical Point"]}
        rows={[
          ["Operating range", "−15°C to +50°C (VRLA)", "Battery operates but not at optimal capacity"],
          ["Optimal performance", "20–25°C", "Rated capacity and life at this range"],
          ["Storage (no charge)", "−20°C to +40°C", "Self-discharge increases with temperature"],
          ["Life derating", "Every 10°C above 25°C = half the life", "At 45°C: life is ~20% of rated life"],
        ]}
      />

      {/* ─── Parameter 11: Warranty ───────────────────────────────────── */}
      <h3 style={S.h3}>11. Warranty — What Is and Is NOT Covered</h3>

      <p style={S.p}>
        Battery warranty is typically 1–3 years for VRLA and 5–10 years for LFP. But read the warranty conditions carefully — in most cases the warranty is void if:
      </p>

      <ul style={S.ul}>
        <li>Temperature stayed consistently above 25°C (usually {">"}30°C voids warranty)</li>
        <li>Float voltage deviated from the OEM spec</li>
        <li>Battery room ventilation was against the OEM requirement</li>
        <li>Mixing of old and new batteries in same string</li>
        <li>Annual capacity testing records not maintained</li>
      </ul>

      <Callout type="interview" title="Interview Tip — Warranty Question">
        If asked in an interview &quot;When does a battery warranty claim fail?&quot; — answer: &quot;Most warranties require documented proof of: correct float voltage maintained (charging records), temperature within spec (HVAC logs), annual testing (capacity test reports), and no mixing of batteries. Without this documentation, warranty claim almost always rejected. That is why documentation should start right from commissioning.&quot;
      </Callout>

      {/* ─── Parameter 12: BMS Specifications ────────────────────────── */}
      <h3 style={S.h3}>12. BMS Specifications (Li-ion Only)</h3>

      <p style={S.p}>
        In a Li-ion battery, the BMS is a mandatory built-in component — in VRLA, monitoring is optional and external. For a Li-ion BMS, check in the datasheet:
      </p>

      <ComparisonTable
        headers={["BMS Parameter", "What to Check", "Why It Matters"]}
        rows={[
          ["Cell balancing method", "Passive vs Active balancing", "Active balancing more efficient, less heat, better string health"],
          ["Communication protocol", "Modbus / CAN / SNMP", "Must match your UPS and DCIM system"],
          ["Overcharge cutoff", "Voltage threshold (V/cell)", "Must trigger before thermal damage — typically 3.65V for LFP"],
          ["Over-temperature cutoff", "°C threshold", "Must protect against thermal runaway"],
          ["SoC accuracy", "±2% or better", "Determines how accurately runtime is predicted"],
          ["DCIM integration", "API / protocol support", "Critical for Data Center management visibility"],
        ]}
      />

      {/* ─── Parameter 13: Datasheet Red Flags ───────────────────────── */}
      <h3 style={S.h3}>13. Datasheet Red Flags — What to Watch For</h3>

      <ul style={S.ul}>
        <li>
          <strong>No high-rate discharge table</strong> — the vendor is giving only C10/C20 data, not high-rate data. For a UPS application this is a serious gap.
        </li>
        <li>
          <strong>Unrealistic cycle life claims</strong> — a claim of 2000+ cycles at 80% DoD for VRLA is suspicious. Industry-verified VRLA: 300–500 cycles at 80% DoD.
        </li>
        <li>
          <strong>No IEC/IS certification</strong> — unverified batteries may fail prematurely and can pose a fire/safety risk. Check for IS 1651 (India) or IEC 60896 certification.
        </li>
        <li>
          <strong>Vague temperature specs</strong> — if a very wide operating temperature range is claimed without derating data, actual performance will be lower than claimed.
        </li>
        <li>
          <strong>Missing internal resistance baseline</strong> — if the vendor does not provide baseline impedance data, future health monitoring is blind.
        </li>
      </ul>

      {/* ─── Parameter 14: Datasheet Comparison Worksheet ────────────── */}
      <h3 style={S.h3}>14. Datasheet Comparison Worksheet</h3>

      <p style={S.p}>
        While comparing multiple vendors, use this table for an apples-to-apples comparison. Compare the same parameters under the same conditions for every vendor.
      </p>

      <ComparisonTable
        headers={["Parameter", "Vendor A", "Vendor B", "Vendor C", "Winner?"]}
        rows={[
          ["Ah rating (C10)", "—", "—", "—", "—"],
          ["Ah at C0.5 (30-min rate)", "—", "—", "—", "—"],
          ["Float voltage (V/cell)", "—", "—", "—", "—"],
          ["Design life at 25°C", "—", "—", "—", "—"],
          ["Internal resistance (new)", "—", "—", "—", "—"],
          ["Weight per cell (kg)", "—", "—", "—", "—"],
          ["Warranty (years)", "—", "—", "—", "—"],
          ["India certification (IS 1651)", "—", "—", "—", "—"],
          ["After-sales support (India)", "—", "—", "—", "—"],
          ["Price per Ah (INR)", "—", "—", "—", "—"],
        ]}
      />
    </>
  );
}
