"use client";

// ═══════════════════════════════════════════════════════════════════════════
// app/learn/non-it/electrical/battery-bank/sections/BmsMonitoring.tsx
//
// Part 10 — Battery Management System (Blueprint v3.0 Part 10)
// Heading IDs: bms
// ═══════════════════════════════════════════════════════════════════════════

import { S, Callout, ComparisonTable, SectionIntro } from "../shared";

export default function BmsMonitoring() {
  return (
    <>
      {/* ═══════════════════════════════════════════════════════════════
          PART 10 — BATTERY MANAGEMENT SYSTEM (BMS)
      ═══════════════════════════════════════════════════════════════ */}

      <h2 id="bms" style={S.h2}>Battery Management System (BMS)</h2>

      <SectionIntro
        quickAnswer="The BMS is the brain of the battery bank — it continuously monitors every cell's voltage, temperature and health, triggers alarms, and in the case of Li-ion also performs an emergency cutoff. For VRLA a BMS was optional — for Li-ion it is mandatory."
        engineerTip="The most common BMS mistake in VRLA installations: doing per-string monitoring but skipping per-cell monitoring. String voltage can look normal when one cell is internally shorted and another cell is overcharged — the two cancel out at the string level. Per-cell monitoring is mandatory in production Data Centers."
        keyTakeaway="A modern battery bank without a BMS is 'flying blind' — you do not know when failure is coming until a catastrophic failure actually happens."
      />

      <h3 style={S.h3}>BMS — What It Actually Does</h3>

      <p style={S.p}>
        A BMS is a dedicated monitoring and protection system. In simple installations it is a standalone unit; in complex Li-ion installations it is a multi-level hierarchy — cell level, module level, pack level.
      </p>

      <ComparisonTable
        headers={["BMS Function", "What It Measures/Does", "Why It Matters"]}
        rows={[
          ["Voltage monitoring", "Per-cell voltage continuously", "Detect weak cell, overcharge, undercharge"],
          ["Temperature monitoring", "Per-cell or per-block temperature", "Thermal runaway early detection"],
          ["Current monitoring", "Charge and discharge current", "Protect against overcurrent"],
          ["SoC calculation", "State of Charge estimation", "Know actual available runtime"],
          ["SoH tracking", "Capacity fade over time", "Plan replacement before failure"],
          ["Cell balancing", "Active or passive balancing between cells", "Prevent single cell becoming weak link"],
          ["Alarm generation", "Threshold violations → alerts", "Notify operators before damage"],
          ["Emergency cutoff (Li-ion)", "Disconnect battery on critical fault", "Prevent thermal runaway propagation"],
          ["Communication", "Modbus, CAN, SNMP, BACnet to UPS/DCIM", "Integrate with facility monitoring"],
        ]}
      />

      <h3 style={S.h3}>BMS Architecture Levels</h3>

      <ComparisonTable
        headers={["Level", "Monitors", "VRLA", "Li-ion"]}
        rows={[
          ["Cell BMS", "Individual cell voltage + temperature", "External sensors, manual reading typical", "Mandatory — integrated in every module"],
          ["Module BMS", "Group of cells (one rack or cabinet)", "Optional — string-level voltage OK for small banks", "Mandatory — module-level protection"],
          ["Pack BMS", "Entire battery bank", "Recommended for Tier III/IV", "Mandatory — bank-level coordination"],
          ["System Integration", "UPS + DCIM + Building BMS", "Via Modbus or SNMP typically", "Via CAN or Modbus + SNMP gateway"],
        ]}
      />

      <h3 style={S.h3}>BMS Alarm Thresholds — Typical Settings</h3>

      <ComparisonTable
        headers={["Parameter", "Warning Threshold", "Critical Threshold", "Action"]}
        rows={[
          ["Cell voltage (VRLA 2V cell)", "< 2.10V or > 2.35V per cell", "< 1.90V or > 2.45V per cell", "Warning: notify ops; Critical: charger adjust/alarm"],
          ["String voltage (192V bank)", "< 185V or > 198V", "< 178V or > 204V", "Warning: log; Critical: investigate immediately"],
          ["Cell temperature", "> 35°C", "> 45°C", "Warning: check HVAC; Critical: reduce load or disconnect"],
          ["Discharge current", "> 90% of max rated", "> 100% of max rated", "Warning: check load; Critical: cutoff (Li-ion)"],
          ["Impedance rise (VRLA)", "> 1.5× baseline", "> 2.0× baseline", "Warning: schedule replacement; Critical: replace immediately"],
          ["Earth fault (floating DC)", "Insulation < 10 kΩ to earth", "Insulation < 1 kΩ to earth", "Warning: locate fault; Critical: isolate and repair"],
        ]}
      />

      <Callout type="important" title="Important — Update BMS Thresholds After Replacement">
        After installing a new battery bank, updating the BMS thresholds and baseline values is mandatory. Applying the old batteries' baseline to the new ones causes both false alarms and missed real alarms. Set and document a new impedance baseline at commissioning.
      </Callout>

      <h3 style={S.h3}>Communication Protocols</h3>

      <ComparisonTable
        headers={["Protocol", "Type", "Best For", "Data Center Use"]}
        rows={[
          ["Modbus RTU/TCP", "Industry standard, serial/ethernet", "UPS to BMS, SCADA integration", "Most common for VRLA BMS"],
          ["CAN Bus", "Automotive-derived, fast, reliable", "Li-ion module-level communication", "Standard in Li-ion battery packs"],
          ["SNMP (v2c/v3)", "Network management protocol", "UPS to NMS/DCIM", "IT integration, monitoring dashboards"],
          ["BACnet", "Building automation protocol", "Building BMS integration", "Facilities team monitoring"],
          ["Proprietary", "OEM-specific protocols", "Tightly integrated OEM systems", "Huawei iPack, Vertiv Li-ion, etc."],
        ]}
      />

      <Callout type="best-practice" title="Best Practice — Open Protocol Priority">
        When selecting a BMS, prefer an open protocol (Modbus or SNMP) over a proprietary one. Proprietary protocols create vendor lock-in — future DCIM integration or BMS replacement becomes expensive. The Modbus TCP + SNMP v3 combination is the most interoperable approach for Indian Data Centers.
      </Callout>

      <h3 style={S.h3}>VRLA BMS vs Li-ion BMS — Key Differences</h3>

      <ComparisonTable
        headers={["Feature", "VRLA BMS", "Li-ion BMS"]}
        rows={[
          ["Location", "External to battery — add-on unit", "Integrated inside battery module — mandatory"],
          ["Cell balancing", "Not required (cells self-balance during equalisation)", "Mandatory — passive or active balancing circuit"],
          ["Emergency cutoff", "Alarm only — human response required", "Automatic contactors — can disconnect in milliseconds"],
          ["Thermal runaway detection", "Temperature alarm — indirect", "Direct cell temp + voltage anomaly detection"],
          ["Complexity", "Simple — voltage + temp + current", "Complex — SoC estimation, cell balancing, multi-level protection"],
          ["Cost", "Low — simple external sensor unit", "Significant — integrated, sophisticated electronics"],
          ["Failure consequence of BMS fault", "Loss of monitoring — still safe (manual monitoring)", "Critical — loss of BMS protection = major risk"],
        ]}
      />

      <h3 style={S.h3}>BMS Integration with DCIM</h3>

      <p style={S.p}>
        In modern Data Centers, BMS data is integrated into the DCIM (Data Center Infrastructure Management) platform. DCIM aggregates battery bank data alongside cooling, power and server infrastructure.
      </p>

      <ComparisonTable
        headers={["DCIM Integration Point", "Data Provided", "Use Case"]}
        rows={[
          ["Real-time capacity", "Current Ah available, estimated runtime", "Operations team situational awareness"],
          ["Health trending", "SoH over time, impedance trend", "Predictive replacement planning"],
          ["Alarm escalation", "Critical BMS alarms → ticket creation", "Automated NOC notification"],
          ["Energy metering", "Charge/discharge energy, efficiency", "PUE calculation, cost allocation"],
          ["Maintenance scheduling", "Next test due dates, maintenance alerts", "Proactive PM scheduling"],
        ]}
      />

      <Callout type="interview" title="Interview Tip — BMS Question">
        Common senior engineer interview question: &quot;Is a BMS mandatory or optional for a VRLA battery bank?&quot; — Correct answer: IEEE 1188 per se does not mandate a comprehensive BMS for VRLA, but Tier III/IV Data Center best practice dictates per-cell monitoring at minimum. For Li-ion, a BMS is absolutely mandatory — without a BMS, a Li-ion battery cannot be safely operated. Always distinguish VRLA vs Li-ion when answering.
      </Callout>
    </>
  );
}
