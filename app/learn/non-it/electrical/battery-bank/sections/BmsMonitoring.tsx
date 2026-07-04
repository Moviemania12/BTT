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
        quickAnswer="BMS battery bank ka brain hai — har cell ki voltage, temperature, aur health continuously monitor karta hai, alarms trigger karta hai, aur Li-ion ke case mein emergency cutoff bhi karta hai. VRLA ke liye BMS optional tha — Li-ion ke liye mandatory hai."
        engineerTip="VRLA installations mein BMS ki sabse common galti: per-string monitoring karna lekin per-cell monitoring skip karna. String voltage normal lag sakti hai jab ek cell internally shorted ho aur doosra cell overcharged ho — dono cancel out ho jaate hain string level pe. Per-cell monitoring mandatory hai production Data Centers mein."
        keyTakeaway="BMS bina modern battery bank 'flying blind' hai — aap nahi jaante kab failure aane waali hai jab tak catastrophic failure actually ho."
      />

      <h3 style={S.h3}>BMS — What It Actually Does</h3>

      <p style={S.p}>
        BMS ek dedicated monitoring aur protection system hai. Simple installations mein yeh ek
        standalone unit hoti hai; complex Li-ion installations mein yeh multi-level hierarchy
        hoti hai — cell level, module level, pack level.
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

      <Callout type="important" title="Important — BMS Thresholds Update Karo After Replacement">
        Naya battery bank install karne ke baad, BMS thresholds aur baseline values update karna
        mandatory hai. Puranay batteries ka baseline naye pe apply karna false alarms ya missed
        real alarms dono cause karta hai. Commissioning ke time naya impedance baseline set karo
        aur document karo.
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
        BMS select karte waqt open protocol (Modbus ya SNMP) prefer karo over proprietary.
        Proprietary protocols vendor lock-in create karte hain — future DCIM integration ya
        BMS replacement expensive ho jaata hai. Modbus TCP + SNMP v3 combination most
        interoperable approach hai for Indian Data Centers.
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
        Modern Data Centers mein BMS data DCIM (Data Center Infrastructure Management) platform
        mein integrate hota hai. DCIM battery bank data aggregates karta hai alongside cooling,
        power, aur server infrastructure.
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
        Common senior engineer interview question: &quot;VRLA battery bank mein BMS mandatory hai ya
        optional?&quot; — Correct answer: IEEE 1188 per se mandate nahi karta comprehensive BMS for
        VRLA, lekin Tier III/IV Data Center best practice dictates per-cell monitoring minimum.
        Li-ion ke liye BMS absolutely mandatory hai — without BMS, Li-ion battery cannot be
        safely operated. Always distinguish VRLA vs Li-ion when answering.
      </Callout>
    </>
  );
}
