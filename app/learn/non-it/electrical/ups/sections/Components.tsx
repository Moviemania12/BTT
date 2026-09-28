"use client";

// ═══════════════════════════════════════════════════════════════════════════
// app/learn/non-it/electrical/ups/sections/Components.tsx
//
// Section 8: Core Components (Rectifier, Inverter, Static Switch, Battery Charger), Section 9: UPS Types (Offline, Line Interactive, Online, Delta, Modular)
//
// Extracted unchanged from Phase 1-3 monolithic page.tsx as part of the
// folder restructure. Content is byte-identical to the original — only the
// file location and import paths have changed.
// ═══════════════════════════════════════════════════════════════════════════

import { S, Callout, ComparisonTable, Figure } from "../shared";
import RectifierDiagram from "../svg/RectifierDiagram";
import InverterDiagram from "../svg/InverterDiagram";
import StaticSwitchDiagram from "../svg/StaticSwitchDiagram";
import OfflineUpsDiagram from "../svg/OfflineUpsDiagram";
import OnlineUpsDiagram from "../svg/OnlineUpsDiagram";

export default function Components() {
  return (
    <>
        <h2 id="components" style={S.h2}>Core Components Overview</h2>

        <p style={S.p}>
          A UPS system has 8 major components. In the following sub-sections we will explain the four most important — Rectifier, Inverter, Static Switch and Battery Charger — in depth.
        </p>

        <ComparisonTable
          headers={["Component", "Function", "Failure Impact"]}
          rows={[
            ["Rectifier", "AC → DC conversion + battery charging", "No DC bus power — UPS runs only on existing battery charge"],
            ["Inverter", "DC → AC conversion for clean output", "Triggers static switch bypass — load on raw mains"],
            ["Static Switch", "Sub-4ms transfer between inverter and bypass", "Loss of automatic fault protection"],
            ["Battery Charger", "Maintains battery at float voltage", "Battery undercharges, reduced backup time"],
            ["Battery", "Stores DC energy for backup", "Zero backup time on grid failure"],
            ["Controller", "Microprocessor logic, monitoring, protection", "Loss of intelligent control, manual operation only"],
            ["Cooling Fans", "Thermal management of power electronics", "Overheating, automatic shutdown to protect components"],
            ["Capacitors (DC Link)", "Smooth DC bus ripple, filter noise", "Increased harmonics, voltage instability"],
          ]}
        />

        <h3 id="rectifier" style={S.h3}>Rectifier</h3>

        <p style={S.p}>
          The rectifier is the "entry gate" of the UPS. It converts the incoming AC supply into DC using power electronics (typically IGBT-based PWM rectifiers in modern UPS; earlier they were thyristor-based).
        </p>

        <Figure caption="Fig 3 — Rectifier converting 3-phase AC input to regulated DC output">
          <RectifierDiagram />
        </Figure>

        <p style={S.p}>
          Older UPS had <strong>SCR (Thyristor) based rectifiers</strong> that used bulky transformers and had a poor input power factor (0.7-0.8). Modern UPS use <strong>IGBT-based PWM rectifiers</strong> that give a near-unity power factor (0.99) and allow a transformerless design — smaller footprint, better efficiency.
        </p>

        <h3 id="inverter" style={S.h3}>Inverter</h3>

        <p style={S.p}>
          The inverter does the opposite of the rectifier — it takes power from the DC bus and converts it into clean, regulated, pure sine wave AC that goes directly to the load.
        </p>

        <Figure caption="Fig 4 — Inverter converting DC bus voltage to clean sine wave AC output">
          <InverterDiagram />
        </Figure>

        <h3 id="static-switch" style={S.h3}>Static Switch</h3>

        <p style={S.p}>
          The Static Switch is the "safety valve" of the UPS. It continuously monitors both the inverter output and the bypass (raw mains) source. If a fault occurs in the inverter, there is an overload, or maintenance is needed — the static switch shifts the load to bypass in <strong>sub-4 milliseconds</strong> using thyristors (SCRs) — there is no mechanical moving part, which is why it is so fast.
        </p>

        <Figure caption="Fig 5 — Static Switch logic between inverter output and bypass source">
          <StaticSwitchDiagram />
        </Figure>

        <Callout type="danger" title="Danger — Static Switch ≠ Isolation">
          The static switch is for fault transfer, not for electrical isolation. Before maintenance, always use the <strong>Maintenance Bypass</strong> (Section 28), which gives proper mechanical isolation. Following the LOTO (Lock Out Tag Out) procedure is mandatory while working on the static switch.
        </Callout>

        <h3 id="battery-charger" style={S.h3}>Battery Charger</h3>

        <p style={S.p}>
          The Battery Charger is a dedicated circuit (sometimes part of the rectifier itself, sometimes separate) that maintains the battery at <strong>float voltage</strong> when the grid is available. It ensures the battery always stays in a fully charged state, ready for the next outage.
        </p>

        <ComparisonTable
          headers={["Charging Stage", "Voltage Behavior", "Purpose"]}
          rows={[
            ["Boost/Bulk Charge", "Higher voltage, high current", "Fast recharge after a discharge event"],
            ["Absorption", "Constant voltage, tapering current", "Top off battery without overcharging"],
            ["Float Charge", "Steady ~2.27V/cell (VRLA)", "Maintain full charge indefinitely, compensate self-discharge"],
            ["Equalize Charge (flooded only)", "Slightly higher voltage, periodic", "Balance individual cell voltages in a string"],
          ]}
        />

        <Callout type="maintenance" title="Maintenance Tip">
          Float voltage drift seriously affects battery life. Too high a float voltage causes battery dry-out (in VRLA); too low causes sulfation. Quarterly float voltage verification should be a non-negotiable maintenance task.
        </Callout>

        {/* ═══════════════════════════════════════════════════════════════
            SECTION 9 — UPS TYPES OVERVIEW
        ═══════════════════════════════════════════════════════════════ */}
        <h2 id="ups-types" style={S.h2}>UPS Types Overview</h2>

        <p style={S.p}>
          There are 5 major categories of UPS, each optimized for its own specific use-case: Offline, Line Interactive, Online Double Conversion, Delta Conversion and Modular. In the Data Center, <strong>Online Double Conversion is the almost universal standard</strong> — we will understand the other types in detail ahead.
        </p>

        <ComparisonTable
          headers={["Type", "Transfer Time", "Output Quality", "Efficiency", "Typical Use"]}
          rows={[
            ["Offline (Standby)", "2–10 ms", "Raw mains (with surge protection)", "~98%", "Home PC, small office"],
            ["Line Interactive", "2–4 ms", "Stabilized via AVR", "~97%", "Small server room, branch office"],
            ["Online Double Conversion", "0 ms (continuous)", "Always clean, regulated", "94–96% (99% Eco mode)", "Data Center, hospital, critical infra"],
            ["Delta Conversion", "0 ms (continuous)", "Always clean, regulated", "Up to 97%", "Large Data Center, high-power installs"],
            ["Modular UPS", "0 ms (continuous)", "Always clean, regulated", "94–97%", "Scalable Data Center, N+1 built-in"],
          ]}
        />

        <h3 id="offline-ups" style={S.h3}>Offline (Standby) UPS</h3>

        <p style={S.p}>
          An Offline UPS normally keeps the load connected <strong>directly to the mains</strong> — the battery and inverter stay in standby. When the grid fails, a transfer switch switches the load to the inverter within milliseconds.
        </p>

        <Figure caption="Fig 6 — Offline UPS: load normally on mains, switches to inverter on failure">
          <OfflineUpsDiagram />
        </Figure>

        <p style={S.p}>
          <strong>Advantages:</strong> The cheapest, the highest efficiency (battery/inverter mostly idle). <strong>Disadvantages:</strong> The transfer gap (2-10ms) can affect sensitive equipment; no voltage regulation during normal operation. In the Data Center it is <strong>never used</strong> — it is suitable only for small office/home setups.
        </p>

        <h3 id="line-interactive-ups" style={S.h3}>Line Interactive UPS</h3>

        <p style={S.p}>
          A Line Interactive UPS is an upgraded version of offline — it has an <strong>AVR (Automatic Voltage Regulator)</strong> that corrects minor voltage fluctuations without activating the inverter, so battery life is better preserved.
        </p>

        <ComparisonTable
          headers={["Feature", "Offline UPS", "Line Interactive UPS"]}
          rows={[
            ["Voltage regulation", "None — direct passthrough", "AVR corrects minor sags/surges"],
            ["Battery usage", "Only on full failure", "Only on failure (AVR handles minor issues)"],
            ["Cost", "Lowest", "Slightly higher"],
            ["Typical rating", "< 2 kVA", "1–5 kVA"],
            ["Data Center suitable?", "No", "No (small branch office only)"],
          ]}
        />

        <h3 id="online-double-conversion" style={S.h3}>Online Double Conversion UPS</h3>

        <p style={S.p}>
          This is <strong>the Data Center standard</strong>. The name itself explains the working — power is converted twice: AC → DC (rectifier) → AC (inverter). The load <em>always</em> takes power from the inverter, never directly from the mains (in normal operation) — which is why there is <strong>zero transfer time</strong>; whether the grid fails or not, the load does not notice any difference.
        </p>

        <Figure caption="Fig 7 — Online Double Conversion: load always powered by inverter, grid only charges battery">
          <OnlineUpsDiagram />
        </Figure>

        <Callout type="best-practice" title="Best Practice — Data Center Standard">
          Online Double Conversion (IEC 62040 classification: <strong>VFI — Voltage and Frequency Independent</strong>) is the industry standard because it completely isolates the output from the input — no voltage sag, surge, frequency variation or harmonics reach the load.
        </Callout>

        <h3 id="delta-conversion" style={S.h3}>Delta Conversion UPS</h3>

        <p style={S.p}>
          Delta Conversion is an advanced variant used in very large UPS (typically &gt;300kVA). It has an additional "delta converter" that works in parallel with the rectifier — it gives higher efficiency (up to 97%) without compromising output quality.
        </p>

        <ComparisonTable
          headers={["Aspect", "Double Conversion", "Delta Conversion"]}
          rows={[
            ["Efficiency", "94–96%", "Up to 97%"],
            ["Input current harmonics", "Low", "Very Low"],
            ["Typical rating range", "10 kVA – 800 kVA", "300 kVA – 1.6 MVA"],
            ["Complexity", "Standard", "Higher (additional converter stage)"],
            ["Output quality", "VFI grade", "VFI grade"],
          ]}
        />

        <h3 id="modular-ups" style={S.h3}>Modular UPS</h3>

        <p style={S.p}>
          A Modular UPS is a "building block" design — multiple power modules (typically 25-50 kVA each) work in parallel in one frame. If capacity needs to increase, just add a new module; the whole system does not have to be replaced.
        </p>

        <ComparisonTable
          headers={["Benefit", "Why It Matters"]}
          rows={[
            ["Hot-swappable modules", "Replace a faulty module without shutting down the whole UPS"],
            ["Built-in N+1", "One extra module automatically provides redundancy"],
            ["Scalability", "Add modules as load grows; capex is spread in phases"],
            ["Smaller footprint per kVA", "More capacity fits in the same room"],
          ]}
        />

        <Callout type="interview" title="Interview Tip">
          If asked "Why is a Modular UPS better than a traditional UPS for Data Centers?" — key points: <em>hot-swappable maintenance without downtime, built-in N+1 redundancy by design, and incremental capex scaling that CFOs also like.</em>
        </Callout>

        {/* ═══════════════════════════════════════════════════════════════
            SECTION 10 — CAPACITY SELECTION (VA/kVA/kW/PF)
        ═══════════════════════════════════════════════════════════════ */}
    </>
  );
}
