"use client";

// ═══════════════════════════════════════════════════════════════════════════
// app/learn/non-it/electrical/battery-bank/sections/TestingMaintenance.tsx
//
// Part 18 — Testing & Maintenance (Blueprint v3.0 Part 18)
// Part 19 — Real Maintenance Documentation (Blueprint v3.0 Part 19)
// Heading IDs: testing-maintenance, maintenance-documentation
// ═══════════════════════════════════════════════════════════════════════════

import { S, Callout, ComparisonTable, SectionIntro } from "../shared";

export default function TestingMaintenance() {
  return (
    <>
      {/* ═══════════════════════════════════════════════════════════════
          PART 18 — TESTING & MAINTENANCE
      ═══════════════════════════════════════════════════════════════ */}

      <h2 id="testing-maintenance" style={S.h2}>Testing & Maintenance</h2>

      <SectionIntro
        quickAnswer="Battery maintenance has one simple rule: whatever has not been tested can stop working. Visual inspection and voltage checks do not tell the battery's actual health — only the impedance test and capacity test do. Both are mandatory; both detect different things."
        engineerTip="Schedule the annual capacity test in October-November — by October the Indian summer is over (temperature stress on the battery is reduced), and the winter grid-failure peak season starts. Worst time for a capacity test: July-August (battery already thermally stressed). Best time: October-November (battery recovered, winter protection window before next summer)."
        keyTakeaway="IEEE 450/1188 are clear: SoH ≥ 80% = serviceable. Below 80% = replace immediately — no exceptions, no 'monitor for another 6 months'."
      />

      <h3 style={S.h3}>Why Testing Is Non-Negotiable</h3>

      <p style={S.p}>
        A common misconception: &quot;The battery string voltage is normal — the battery is fine.&quot; This is wrong. String voltage can be normal when one cell is internally short-circuited and the adjacent cell is overcharged — the two offset each other at the string level.
      </p>

      <p style={S.p}>
        To detect a single cell failure, per-cell voltage measurement, impedance testing and ultimately a capacity discharge test are required. String voltage monitoring alone is insufficient for Tier III/IV Data Centers.
      </p>

      <h3 style={S.h3}>Maintenance Schedule</h3>

      <ComparisonTable
        headers={["Frequency", "Tasks"]}
        rows={[
          ["Daily", "BMS alarm review, float voltage check per string, room temperature check, visual inspection for leaks/swelling, H₂ sensor status"],
          ["Weekly", "Per-string voltage log, charger output check, H₂ sensor function test, ventilation fan operation check"],
          ["Monthly", "Per-cell voltage measurement, thermal scan of terminals, connection torque spot-check (10%), BMS log download, electrolyte level check (VLA only)"],
          ["Quarterly", "Partial discharge test if load bank available, intercell connector resistance check, specific gravity test (VLA only), HVAC filter check"],
          ["Half-Yearly", "Full thermal imaging of all connections, string current balance test, BMS calibration verification, charger CV/CC threshold verification, earth resistance spot check"],
          ["Annually", "Full capacity discharge test (IEEE 450/1188), full impedance test + baseline update, room civil inspection, fire suppression system inspection, documentation review"],
        ]}
      />

      <h3 style={S.h3}>Testing Procedures — Critical Tests</h3>

      <ComparisonTable
        headers={["Test", "Standard", "Method", "Pass Criterion"]}
        rows={[
          ["Visual Inspection", "IEEE 450/1188", "Physical inspection of each cell", "No cracks, swelling, leaks, terminal damage"],
          ["Float Voltage per Cell", "IEEE 450/1188", "Calibrated voltmeter, per cell", "Within OEM spec ±0.05V per cell"],
          ["Internal Resistance Test", "IEEE 1188", "AC impedance tester (e.g., Midtronics)", "≤ 2× baseline value for each cell"],
          ["Intercell Connector Resistance", "IEEE 450", "Micro-ohmmeter on each connector", "Within 20% of baseline, or per OEM spec"],
          ["Thermal Imaging", "Good practice", "IR camera, all terminals + connections", "No cell > 3°C above neighbours; no hotspots"],
          ["Full Capacity Discharge", "IEEE 450/1188", "Discharge at rated C-rate to cutoff voltage", "≥ 80% of rated Ah delivered"],
          ["String Current Balance", "Internal procedure", "Clamp meter on each string during discharge", "All strings within ±5% of average"],
          ["Earth Fault Test", "IEC 60364/IS 3043", "Earth resistance measurement", "< 1 Ohm per IS 3043"],
        ]}
      />

      <Callout type="important" title="Important — Capacity Test Requires Load Bank">
        A full capacity discharge test needs a dedicated load bank — it connects at the UPS output and provides a controlled discharge. Renting a load bank is expensive (~₹50,000–2,00,000 per day depending on size) — include it in the budget. Some large Data Centers keep their own permanent load bank. During the test, the UPS stays in maintenance mode — the ops team has to coordinate.
      </Callout>

      <h3 style={S.h3}>Impedance Test vs Capacity Test — Which Is Better?</h3>

      <ComparisonTable
        headers={["Aspect", "Impedance Test", "Capacity Discharge Test"]}
        rows={[
          ["Method", "AC signal injection, non-intrusive", "Actual discharge — intrusive"],
          ["Battery state during test", "On float — fully operational", "Discharged — reduced backup during test"],
          ["Load bank required?", "No", "Yes"],
          ["Time required", "2–4 hours for full bank", "Discharge time + recharge time (10–24 hours total)"],
          ["What it detects", "Cell resistance rise — indirect SoH indicator", "Actual capacity delivered — direct SoH measurement"],
          ["Accuracy", "Surrogate — good correlation but not direct", "Definitive — actual Ah measured"],
          ["Cost", "Low (tester + technician time)", "High (load bank + extended UPS offline risk)"],
          ["Frequency", "Half-yearly or annually", "Annually per IEEE 450/1188"],
          ["Conclusion", "Do both — impedance half-yearly, capacity annually", "Definitive test for SoH determination"],
        ]}
      />

      <h3 style={S.h3}>When to Replace vs When to Repair</h3>

      <ComparisonTable
        headers={["Condition", "Decision", "Rationale"]}
        rows={[
          ["SoH < 80% (IEEE criterion)", "Replace immediately", "IEEE 450/1188 mandatory threshold"],
          ["Single cell swollen/cracked", "Replace entire string", "Adjacent cells likely stressed — partial replacement creates mixed-age problem"],
          ["Impedance > 2× baseline (one cell)", "Replace string within 3 months", "Cell is at or near end of life"],
          ["Impedance 1.5–2× baseline", "Monitor monthly, plan replacement", "Degrading but not at IEEE threshold yet"],
          ["Terminal corroded", "Clean + re-torque first", "Repair if cell itself healthy"],
          ["Capacity 80–90%", "Monitor — plan replacement in 12–18 months", "Still serviceable but declining"],
          ["Capacity 60–80%", "Replace within 6 months", "Below IEEE threshold — operating on borrowed time"],
          ["Bank age > design life", "Replace regardless of test results", "Statistical failure probability becomes unacceptable"],
        ]}
      />

      {/* ═══════════════════════════════════════════════════════════════
          PART 19 — REAL MAINTENANCE DOCUMENTATION
      ═══════════════════════════════════════════════════════════════ */}

      <h2 id="maintenance-documentation" style={S.h2}>Real Maintenance Documentation</h2>

      <SectionIntro
        quickAnswer="Documentation is not just for compliance — it is engineering memory. Without documentation, the battery bank's history lives in someone's personal memory — and people keep changing. With documentation, every replacement decision is data-driven."
        engineerTip="The most important documentation practice: record every discharge event — date, duration, depth of discharge, reason. Patterns emerge from this data. A site that experiences 5 discharge events in 2 months vs a site that experiences 2 in a year — the battery replacement timeline will be completely different. Without records, this distinction is invisible."
        keyTakeaway="Battery documentation = warranty evidence + maintenance trending + replacement planning + audit compliance — all of this comes from one systematic record-keeping habit."
      />

      <h3 style={S.h3}>Daily Battery Log Sheet — Key Fields</h3>

      <ComparisonTable
        headers={["Field", "What to Record", "Why Important"]}
        rows={[
          ["Date + Time + Shift", "DD/MM/YYYY, time, Day/Night/Evening", "Audit trail, accountability"],
          ["Ambient Temperature (°C)", "Battery room thermometer reading", "Life calculation, overcharge risk detection"],
          ["Float Voltage per String", "String 1, String 2, String N in Volts", "Daily health check, trend detection"],
          ["BMS Alarm Status", "Normal / Active — describe if active", "Prompt response tracking"],
          ["Charger Output (V, A)", "Charger voltmeter and ammeter reading", "Verify charger operating correctly"],
          ["H₂ Sensor Status", "Normal / Pre-Alarm / Alarm", "Safety compliance"],
          ["Ventilation Status", "All fans running / Fault", "H₂ safety compliance"],
          ["Visual Abnormality", "Y/N — describe if Y", "Field observation record"],
          ["Observer Name + Signature", "Technician who performed check", "Accountability"],
        ]}
      />

      <h3 style={S.h3}>Monthly PM Checklist — Key Fields</h3>

      <ComparisonTable
        headers={["Field", "What to Record"]}
        rows={[
          ["Per-cell voltage table", "All cells — tabular format with cell ID, measured voltage, deviation from nominal"],
          ["Per-terminal temperature", "Thermal gun reading °C for each terminal connection"],
          ["Terminal condition", "Clean / Corroded / Loose — action taken"],
          ["BMS log summary", "Alarm count since last PM, any patterns"],
          ["Impedance spot check (10% of cells)", "Impedance reading vs baseline value"],
          ["HVAC temperatures", "Inlet and outlet temperatures, fan status"],
          ["H₂ sensor calibration due date", "If due, calibrate and record"],
          ["Technician + Supervisor signatures", "Accountability chain"],
        ]}
      />

      <h3 style={S.h3}>Battery Capacity Test Report — Key Fields</h3>

      <ComparisonTable
        headers={["Field", "Details"]}
        rows={[
          ["Test identification", "Date, UPS ID, Battery Bank ID, Test Standard (IEEE 450/1188)"],
          ["Battery details", "Type, rated Ah, rated C-rate, age at test"],
          ["Test parameters", "Load applied (A), discharge rate (C-rate), cutoff voltage set"],
          ["Discharge curve data", "Voltage readings at: Start, 25%, 50%, 75%, End-of-discharge"],
          ["Total discharge time", "Minutes from start to cutoff voltage"],
          ["Calculated Ah delivered", "From current × time integration"],
          ["% of rated capacity", "Measured Ah ÷ Rated Ah × 100%"],
          ["Pass/Fail determination", "IEEE criterion: ≥ 80% = Pass, < 80% = Replace"],
          ["Recommended action", "Continue / Schedule replacement / Replace immediately"],
          ["Attachments", "Discharge curve chart, per-string voltage table, technician + witness signatures"],
        ]}
      />

      <h3 style={S.h3}>Battery Commissioning Report — Key Fields</h3>

      <ComparisonTable
        headers={["Field", "Details"]}
        rows={[
          ["Project identification", "Project name, site, date, UPS ID, Battery Bank ID"],
          ["Battery details", "Brand, model, type, rated Ah, cells per string, number of strings"],
          ["Charger settings verified", "Float V/cell, boost V/cell, temperature compensation, max charge current"],
          ["BMS settings verified", "Over/under voltage alarms, over-temperature alarm, impedance baseline recorded"],
          ["Initial capacity test", "Measured Ah vs rated Ah, % achieved"],
          ["Earthing verification", "Earth resistance measured (Ω), pass criterion met Y/N"],
          ["Safety systems", "H₂ sensor commissioned Y/N, EBD tested Y/N"],
          ["Sign-off", "Commissioning engineer + client representative signatures — this is a contractual milestone"],
        ]}
      />

      <Callout type="best-practice" title="Best Practice — Digital Records + Physical Records">
        Maintain both: digital records (Excel/CSV or a DCIM system) and physical signed copies. For digital: cloud backup is mandatory — do not risk having only one copy on a local PC. Physical signed copies: original signatures required for warranty claims and legal disputes. Most OEM warranty claims require physical maintenance records with authorized signatures.
      </Callout>
    </>
  );
}
