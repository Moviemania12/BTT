"use client";

// ═══════════════════════════════════════════════════════════════════════════
// app/learn/non-it/electrical/battery-bank/sections/DcBusIntegration.tsx
//
// Part 9 — DC Bus & System Integration (Blueprint v3.0 Part 9)
// How battery bank connects to UPS, cable sizing, earthing, protection.
// ═══════════════════════════════════════════════════════════════════════════

import { S, Callout, ComparisonTable, SectionIntro } from "../shared";
import TopicLink from "@/components/TopicLink";

export default function DcBusIntegration() {
  return (
    <>
      {/* ═══════════════════════════════════════════════════════════════
          PART 9 — DC BUS & SYSTEM INTEGRATION
      ═══════════════════════════════════════════════════════════════ */}

      <h2 id="dc-bus-integration" style={S.h2}>DC Bus &amp; System Integration</h2>

      <SectionIntro
        quickAnswer="A battery bank does not work alone — it is connected to the UPS's internal DC bus. The DC bus is the backbone on which the rectifier (grid power in), inverter (load power out) and battery bank (storage) are all connected together."
        engineerTip="DC bus voltage must be precisely maintained. If for any reason the bus voltage is significantly different from the battery float voltage, either the battery will over-discharge or the charger will overheat. At UPS commissioning, match the DC bus voltage to the OEM spec — verify with both a voltmeter and the UPS display."
        keyTakeaway="DC bus = the UPS's internal highway on which the rectifier, inverter and battery bank are all connected — its voltage must be precisely controlled."
      />

      <h3 style={S.h3}>DC Bus — What It Is</h3>

      <p style={S.p}>
        Inside a UPS there are three main functional blocks:
      </p>

      <ul style={S.ul}>
        <li>
          <strong>Rectifier:</strong> Converts AC input (grid or DG) into DC → powers the DC bus.
        </li>
        <li>
          <strong>Inverter:</strong> Takes power from the DC bus → produces a clean regulated AC output → gives it to the load.
        </li>
        <li>
          <strong>Battery bank:</strong> Connected to the DC bus — when the rectifier is available it stays on float charge; when the rectifier fails it instantly powers the DC bus.
        </li>
      </ul>

      <p style={S.p}>
        The beauty of this architecture is that there is <strong>zero transfer time</strong> for the load — the inverter is always taking power from the DC bus, whether it comes from the rectifier or the battery. Battery and rectifier switch seamlessly on the DC bus — the load does not even notice.
      </p>

      <h3 style={S.h3}>DC Bus Voltage Standards</h3>

      <ComparisonTable
        headers={["Bus Voltage", "Common UPS Range", "12V Cells in Series", "2V Cells in Series", "Typical India Use"]}
        rows={[
          ["48V DC", "< 10 kVA, telecom, rack PDU", "4 cells", "24 cells", "Telecom towers, small UPS"],
          ["96V DC", "10–100 kVA", "8 cells", "48 cells", "Small to medium office UPS"],
          ["192V DC", "100 kVA – 500 kVA", "16 cells", "96 cells", "Most common in Indian Data Centers"],
          ["240V DC", "200 kVA – 1 MVA", "20 cells", "120 cells", "Large UPS systems"],
          ["384V DC", "500 kVA – 2 MVA", "32 cells", "192 cells", "Large modular UPS, some Li-ion"],
          ["480V DC", "1 MVA+", "40 cells", "240 cells", "Very large UPS"],
          ["800V+ DC", "Li-ion modular UPS", "Li-ion specific", "Li-ion specific", "Hyperscale, emerging"],
        ]}
      />

      <Callout type="important" title="Important — Matching Bus Voltage with the UPS OEM Is Mandatory">
        The battery bank's series string voltage must be exactly as per the UPS OEM specification. Even a ±2V deviation is unacceptable for production systems. Deviation causes: charger overcurrent, rectifier regulation issues, or the battery being driven below the minimum cut-off voltage during discharge. Document the actual measured DC bus voltage in the UPS commissioning report.
      </Callout>

      <h3 style={S.h3}>Battery Room vs Battery Cabinet vs Battery Rack</h3>

      <ComparisonTable
        headers={["Format", "Description", "Typical Application", "Pros", "Cons"]}
        rows={[
          ["Battery Cabinet (enclosed)", "Steel cabinet, batteries inside, front access", "Small UPS (< 100 kVA), confined spaces", "Clean, contained, no dedicated room needed", "Limited capacity, limited ventilation options"],
          ["Battery Rack (open)", "Open steel frame, batteries on shelves, 2-tier or 3-tier", "Medium UPS (100 kVA – 1 MVA), dedicated battery rooms", "Good airflow, easy access, scalable", "Requires dedicated room with ventilation"],
          ["Battery Room (large installation)", "Dedicated room, multiple racks or platforms", "Large UPS (1 MVA+), Tier III/IV Data Centers", "Maximum capacity, full engineering control", "Civil/structural investment, dedicated HVAC"],
          ["Containerized (outdoor)", "ISO container with batteries + cooling", "Remote sites, edge DCs, quick deployment", "Turnkey, pre-tested, weather-proof", "High cost, limited customization"],
        ]}
      />

      <h3 style={S.h3}>DC Battery Cable Sizing</h3>

      <p style={S.p}>
        DC cables carry current between the battery bank and the UPS. Incorrect sizing causes excessive voltage drop (reducing available runtime) and fire risk (from excessive heating).
      </p>

      <p style={S.p}>
        DC voltage drop formula:
        <br />
        <strong>V_drop = 2 × ρ × L × I ÷ A</strong>
      </p>

      <p style={S.p}>
        The factor of 2 is because current flows through both the positive and negative conductors (total cable length = 2× one-way length).
      </p>

      <ComparisonTable
        headers={["Parameter", "Symbol", "Value", "Note"]}
        rows={[
          ["Resistivity (copper)", "ρ", "0.0175 Ω·mm²/m", "At 20°C; increases with temperature"],
          ["Cable length (one-way)", "L", "Project-specific, meters", "Measure actual run, not straight line"],
          ["Discharge current", "I", "Calculated from load and voltage", "Use worst-case (highest current)"],
          ["Cable cross-section", "A", "mm²", "Standard sizes: 16, 25, 35, 50, 70, 95, 120, 150, 185, 240mm²"],
          ["Allowable voltage drop", "V_drop", "≤ 2% of bus voltage", "For 192V: ≤ 3.84V allowable"],
        ]}
      />

      <Callout type="best-practice" title="Best Practice — Minimize DC Cable Length">
        The closer the battery room is to the UPS, the better — every extra meter of cable adds voltage drop and energy loss. Ideal: battery room adjacent to the UPS room, cable runs less than 10m. 30m+ runs: cable sizing has to be significantly larger. Consider this factor when deciding the battery room location in project planning.
      </Callout>

      <h3 style={S.h3}>DC Breakers vs DC Fuses</h3>

      <ComparisonTable
        headers={["Feature", "DC Fuse", "DC MCCB/Breaker"]}
        rows={[
          ["Interrupting medium", "Fuse element melts, arc in sand", "Mechanical contacts + arc extinguisher"],
          ["DC interrupting capacity", "Very high (50kA+)", "Lower than AC equivalent — verify DC rating"],
          ["Resettable?", "No — replace after fault", "Yes — reset after fault cleared"],
          ["Cost", "Low (fuse) but replacement cost", "Higher upfront, reusable"],
          ["Speed of operation", "Faster (microseconds to milliseconds)", "Slower (milliseconds to cycles)"],
          ["Battery bank use", "Per-string fusing (strongly recommended)", "Main battery disconnect, room MCCB"],
          ["Critical requirement", "Must be DC-rated for bus voltage", "Must have DC breaking capacity ≥ fault current"],
        ]}
      />

      <Callout type="danger" title="Danger — DC Rating vs AC Rating: Different Specifications">
        Using a 240VAC rated fuse or breaker in a 192V DC system is <strong>not acceptable</strong>. The DC equivalent of an AC rating is different — typically the DC breaking capacity is much lower. Always verify the component's specific <em>DC voltage rating</em> and <em>DC interrupting capacity</em>. Manufacturer datasheets list AC and DC ratings separately.
      </Callout>

      <h3 style={S.h3}>Battery Disconnect Switch</h3>

      <p style={S.p}>
        The battery room should have two types of isolation switches:
      </p>

      <ul style={S.ul}>
        <li>
          <strong>Manual Battery Disconnect:</strong> A lockable DC isolator switch that completely disconnects the battery bank from the UPS for maintenance. Used with LOTO. Must be rated for the full DC bus voltage and maximum battery current.
        </li>
        <li>
          <strong>Emergency Battery Disconnect (EBD):</strong> Interlocked with the fire suppression system — if the battery room fire alarm triggers, the EBD automatically disconnects the battery bank to prevent electrical feed to a battery fire. Required per NFPA 855 for Li-ion, recommended for all types.
        </li>
      </ul>

      <h3 style={S.h3}>DC Earthing &amp; Touch Voltage Safety</h3>

      <p style={S.p}>
        DC battery system earthing is different from AC earthing — and often misunderstood.
      </p>

      <ComparisonTable
        headers={["DC Earthing Approach", "Description", "When Used", "Risk"]}
        rows={[
          ["Floating (ungrounded) DC", "Neither + nor − connected to earth", "Telecom DC systems (ITU-T standard)", "First fault doesn't trip — but must be monitored"],
          ["Negative earthed DC", "Negative rail connected to earth", "Some UPS systems, automotive", "Touch voltage on + terminal = full bus voltage from earth"],
          ["Mid-point earthed", "Midpoint of battery string earthed", "Railway, specialized systems", "Complex, ±96V from earth in a 192V system"],
          ["Solid earth (both rails)", "Both connected to earth through impedance", "Specialized designs", "High touch voltage possible — NOT recommended for batteries"],
        ]}
      />

      <p style={S.p}>
        Most Data Center UPS battery systems operate with a <strong>floating DC bus</strong> — neither the positive nor the negative rail is directly earthed. This is standard practice. The UPS chassis and battery racks are earthed separately (protective earth, PE).
      </p>

      <Callout type="important" title="Important — DC Earth Fault Monitoring">
        In a floating DC bus, the first earth fault does not cause any immediate trip — this is the advantage of a floating system (high availability). But a second earth fault = short circuit. That is why in a floating DC system an <strong>Earth Fault Monitor (EFM) is mandatory</strong>. The EFM continuously monitors insulation resistance — if any earth fault develops, it raises an alarm before a second fault can cause damage.
      </Callout>

      <p style={S.p}>
        For detailed coverage of earthing and safety, see the <TopicLink slug="earthing" variant="inline" /> article.
      </p>
    </>
  );
}
