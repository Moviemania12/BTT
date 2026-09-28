"use client";

// ═══════════════════════════════════════════════════════════════════════════
// app/learn/non-it/electrical/ups/sections/DataCenterAndClosing.tsx
//
// Remaining sections from headings.ts: Data Center UPS Architecture, Room
// Layout, Earthing & Cable Sizing, Efficiency/Harmonics, Monitoring
// Protocols, Alarms & Troubleshooting, Maintenance, Common Failures,
// UPS vs Generator, UPS vs Inverter, Critical Applications, OEM Comparison,
// Real Project Examples, Interview Questions, Key Takeaways.
//
// Written to close the gap found during TOC/heading validation.
// ═══════════════════════════════════════════════════════════════════════════

import { S, Callout, ComparisonTable } from "../shared";
import TopicLink from "@/components/TopicLink";

export default function DataCenterAndClosing() {
  return (
    <>
      <h2 id="data-center-ups-architecture" style={S.h2}>Data Center UPS Architecture</h2>

      <p style={S.p}>
        In a Data Center, the UPS is not just a standalone device — it is a critical link in the entire electrical power chain: Grid → <TopicLink slug="transformer" variant="inline" /> → UPS → <TopicLink slug="pdu" variant="inline" /> → Rack. The Tier level decides how redundant this chain will be.
      </p>

      <ComparisonTable
        headers={["Tier", "UPS Architecture", "Power Path"]}
        rows={[
          ["Tier I", "N — single UPS", "Single path, no redundancy"],
          ["Tier II", "N+1", "Single path with module redundancy"],
          ["Tier III", "N+1 minimum, concurrently maintainable", "Single distribution path, maintainable without shutdown"],
          ["Tier IV", "2N or 2(N+1)", "Dual independent distribution paths (A/B feed)"],
        ]}
      />

      <Callout type="important" title="Important — Architecture Depends on Project Requirements">
        Actual implementation depends on project requirements, utility requirements, OEM design and
        Data Center architecture — Tier classification is a baseline framework, not a fixed template.
        Real projects often blend elements based on budget, criticality, and growth plans.
      </Callout>

      <h2 id="ups-battery-room-layout" style={S.h2}>UPS Room & Battery Room Layout</h2>

      <p style={S.p}>
        In UPS and battery room design, safety, accessibility and thermal management are all three equally important.
      </p>

      <ComparisonTable
        headers={["Parameter", "UPS Room", "Battery Room"]}
        rows={[
          ["Temperature target", "20-25°C typical", "20-25°C — critical for VRLA life (every 8-10°C rise halves life)"],
          ["Ventilation", "Standard HVAC", "Dedicated — flooded batteries release hydrogen gas during charging"],
          ["Floor loading", "Moderate — UPS cabinets are heavy but compact", "High — battery racks are very heavy per m²"],
          ["Access", "Restricted, qualified personnel only", "Restricted, qualified personnel only"],
          ["Fire suppression", "Clean agent (non-conductive)", "Clean agent, compatible with battery chemistry"],
        ]}
      />

      <Callout type="best-practice" title="Best Practice — Separate Rooms When Possible">
        In large installations, keeping the UPS and battery in separate rooms is best practice — the battery room's specific ventilation/temperature needs are different from the UPS room, and separation also improves fault containment.
      </Callout>

      <h2 id="earthing-cable-sizing" style={S.h2}>Earthing & Cable Sizing</h2>

      <p style={S.p}>
        In a UPS installation, proper <TopicLink slug="earthing" variant="inline" /> and cable sizing are both critical for safety and performance.
      </p>

      <p style={S.p}>
        Cable sizing depends on voltage drop, current carrying capacity and derating factors — use the <strong>Cable Size Calculator</strong> and <strong>Voltage Drop Calculator</strong> (linked in this article&apos;s calculator toolkit) for project-specific sizing.
      </p>

      <Callout type="warning" title="Warning — Never Skip Earthing Verification">
        UPS DC bus voltage (192V-410V typical) is dangerous — a proper earthing system provides a safe path for fault current. Earth resistance verification (target &lt;1 Ohm per IS 3043) should be done both after installation and periodically.
      </Callout>

      <h2 id="ups-efficiency-harmonics" style={S.h2}>Efficiency, Power Factor & Harmonics</h2>

      <p style={S.p}>
        Modern UPS optimize both efficiency and power quality — but it is essential to understand the trade-offs.
      </p>

      <ComparisonTable
        headers={["Metric", "Typical Range", "Why It Matters"]}
        rows={[
          ["Double Conversion Efficiency", "94-96%", "Energy cost, heat dissipation, cooling load"],
          ["ECO Mode Efficiency", "Up to 99%", "Lower OPEX, but with bypass-mode trade-offs (see ECO Mode section)"],
          ["Input Power Factor", "0.99 (modern PWM rectifiers)", "Reduces reactive power draw from grid, avoids DISCOM penalty"],
          ["Output THD", "Typically below 3%", "Clean power for sensitive IT loads"],
        ]}
      />

      <Callout type="important" title="Important — Verify Against Datasheet">
        Efficiency and harmonic figures vary by OEM and model — these ranges are industry-typical; the actual datasheet should be verified for the specific UPS model.
      </Callout>

      <h2 id="ups-monitoring-protocols" style={S.h2}>Monitoring: SNMP, Modbus, BACnet, DCIM, BMS, EMS</h2>

      <p style={S.p}>
        A modern UPS is not a standalone device — it is part of a facility-wide monitoring ecosystem.
      </p>

      <ComparisonTable
        headers={["Protocol/System", "Purpose", "Typical Integration"]}
        rows={[
          ["SNMP", "Standard network management protocol", "UPS sends traps/alerts to NMS (Network Management System)"],
          ["Modbus", "Industrial communication protocol", "UPS data feeds into BMS/SCADA systems"],
          ["BACnet", "Building automation protocol", "UPS status integrated into building-wide BMS"],
          ["DCIM", "Data Center Infrastructure Management", "Aggregates UPS, PDU, cooling data into single dashboard"],
          ["BMS (Building)", "Facility-wide monitoring", "UPS alarms trigger facility-level notifications"],
          ["EMS", "Energy Management System", "Tracks UPS efficiency, energy consumption trends"],
        ]}
      />

      <p style={S.p}>
        Deeper coverage of <TopicLink slug="bms" variant="inline" /> and <TopicLink slug="dcim" variant="inline" /> is in the dedicated articles.
      </p>

      <h2 id="ups-alarms-troubleshooting" style={S.h2}>Alarms & Troubleshooting</h2>

      <p style={S.p}>
        UPS alarms are an early warning system — understanding which alarm indicates what is critical in preventing downtime.
      </p>

      <ComparisonTable
        headers={["Alarm", "Likely Cause", "First Check"]}
        rows={[
          ["Battery Low", "Extended discharge, weak battery, or grid outage in progress", "Check grid status, battery voltage, runtime remaining"],
          ["Rectifier Fault", "Input power issue, internal rectifier fault", "Check input voltage, rectifier fault codes"],
          ["Inverter Fault", "Internal inverter fault, overload", "Check load %, inverter temperature, fault log"],
          ["Bypass Active", "UPS running on bypass (manual or automatic)", "Confirm if intentional (maintenance) or fault-triggered"],
          ["Over Temperature", "Cooling failure, overload, ambient temp too high", "Check room temperature, airflow, load %"],
          ["DC Bus High/Low", "Battery charging fault, rectifier regulation issue", "Check charger output, battery condition"],
        ]}
      />

      <Callout type="danger" title="Danger — Never Bypass Safety Interlocks">
        While troubleshooting an alarm, never bypass safety interlocks or protection circuits &quot;to fix it temporarily.&quot; Have only a qualified technician work on UPS internals, and follow the OEM troubleshooting guide.
      </Callout>

      <h2 id="maintenance" style={S.h2}>Preventive & Corrective Maintenance</h2>

      <p style={S.p}>
        UPS reliability depends directly on planned maintenance — it is not limited to just replacing batteries.
      </p>

      <ComparisonTable
        headers={["Frequency", "Typical Tasks"]}
        rows={[
          ["Monthly", "Visual inspection, alarm log review, battery voltage spot-check"],
          ["Quarterly", "Load test (partial), thermal imaging of connections, filter cleaning"],
          ["Half-Yearly", "Full battery capacity test, calibration check, firmware review"],
          ["Yearly", "Complete OEM service, full load bank test, battery impedance test"],
        ]}
      />

      <Callout type="maintenance" title="Maintenance Tip — Battery Testing is Non-Negotiable">
        The annual battery capacity test is the most critical maintenance task — visual inspection does not detect a battery's internal degradation. A string that falls below 80% of rated capacity should be replaced before it becomes a runtime risk during an actual outage.
      </Callout>

      <h2 id="common-failures" style={S.h2}>Common Failures</h2>

      <ComparisonTable
        headers={["Failure Mode", "Root Cause (typical)", "Prevention"]}
        rows={[
          ["Battery failure during outage", "Undetected capacity degradation, missed testing", "Annual capacity testing, BMS monitoring"],
          ["Rectifier/inverter component failure", "Component aging, thermal stress, power quality issues", "Preventive maintenance, OEM-recommended component replacement cycles"],
          ["Cooling fan failure", "Dust accumulation, bearing wear", "Regular cleaning, fan replacement per OEM schedule"],
          ["Static switch failure", "Thyristor degradation, thermal stress", "Periodic testing, thermal imaging"],
        ]}
      />

      <h2 id="ups-vs-generator" style={S.h2}>UPS vs Generator</h2>

      <ComparisonTable
        headers={["Aspect", "UPS", "Generator (DG Set)"]}
        rows={[
          ["Transfer time", "Zero (online) or milliseconds (offline/line-interactive)", "10-30 seconds to start and stabilize"],
          ["Runtime", "Minutes (battery-limited, typically 10-15 min)", "Hours (fuel-limited)"],
          ["Role", "Bridges the gap until DG starts", "Extended backup power source"],
          ["Output quality", "Clean, regulated (online double conversion)", "Raw AC, similar quality to grid"],
        ]}
      />

      <p style={S.p}>
        These two are complementary, not competing — deeper coverage is in the <TopicLink slug="dg-set" variant="inline" /> article.
      </p>

      <h2 id="ups-vs-inverter" style={S.h2}>UPS vs Inverter</h2>

      <ComparisonTable
        headers={["Aspect", "UPS", "Home/Commercial Inverter"]}
        rows={[
          ["Transfer time", "Zero to milliseconds", "Often noticeable (hundreds of ms to seconds)"],
          ["Output regulation", "Tightly regulated, isolated from grid quality issues", "Variable, often follows grid quality more closely"],
          ["Typical application", "Data Centers, hospitals, critical commercial loads", "Homes, small offices, non-critical loads"],
          ["Cost per kVA", "Higher — built for reliability and precision", "Lower — built for cost-effectiveness"],
        ]}
      />

      <h2 id="ups-critical-applications" style={S.h2}>UPS in Hospitals, Airports, Banks, Data Centers</h2>

      <p style={S.p}>
        UPS applications are much wider than Data Centers — in every critical-infrastructure sector, the UPS plays a life-safety or business-continuity role.
      </p>

      <ComparisonTable
        headers={["Sector", "Critical Load", "Why UPS Is Mandatory"]}
        rows={[
          ["Hospitals", "ICU, OT, imaging equipment", "Life-safety — power loss can be fatal during procedures"],
          ["Airports", "Air traffic control, runway lighting, security systems", "Safety-critical, regulatory mandate"],
          ["Banks", "Core banking servers, ATMs, transaction systems", "Financial integrity, regulatory compliance"],
          ["Data Centers", "All IT/server infrastructure", "Business continuity, SLA commitments"],
        ]}
      />

      <Callout type="warning" title="Warning — Regulatory Compliance Varies">
        Hospital and airport UPS installations are designed against life-safety regulations (local fire/electrical authority, healthcare accreditation bodies) — these sector-specific compliance requirements can be stricter than this article's general guidance. Verification by a qualified consultant is mandatory in these sectors.
      </Callout>

      <h2 id="oem-comparison" style={S.h2}>OEM Comparison</h2>

      <p style={S.p}>
        The UPS market has many established global and Indian OEMs — Schneider Electric, Vertiv, Eaton, Delta, ABB, Socomec, Riello, Huawei and others. Each vendor has its own product line, topology focus and India support presence.
      </p>

      <Callout type="important" title="Important — Vendor Specs Change Frequently">
        OEM-specific specifications, pricing and model availability keep updating frequently. This article does not make specific vendor comparisons, because that data must be verified directly from current OEM datasheets and the India sales team — only generic guidance stays durable in a fast-changing market like this.
      </Callout>

      <h2 id="real-project-examples" style={S.h2}>Real Project Examples</h2>

      <p style={S.p}>
        The <strong>Load Calculation</strong> section of this article already covers 4 worked examples — 100-Rack Data Center, Office Building, Hospital Critical Power and Industrial Plant. Complete step-by-step sizing calculations are available there.
      </p>

      <p style={S.p}>
        To size your own project, use the <strong>Data Center UPS Designer</strong> calculator (linked in this article&apos;s toolkit) — input the rack count and Tier level, and you get the whole system sizing.
      </p>

      <h2 id="interview-questions" style={S.h2}>Interview Questions</h2>

      <p style={S.p}>
        If you want structured practice for UPS interview preparation, our <strong>BTT Assistant</strong> supports a &quot;mock interview&quot; mode — one question at a time, evaluated answers, progressively harder. A dedicated 100-question interview bank (50 beginner + 50 advanced) will be the next update of this article.
      </p>

      <Callout type="interview" title="Interview Tip — Core Concepts to Master">
        Most-asked UPS interview topics: Online vs Offline vs Line Interactive difference, DoD and the battery sizing formula, N+1 vs 2N, static bypass vs maintenance bypass, and the kVA/kW/PF relationship. A strong grasp of all of these is sufficient for interview success.
      </Callout>

      <h2 id="key-takeaways" style={S.h2}>Key Takeaways</h2>

      <ul style={S.ul}>
        <li>UPS is for instant transfer, DG Set is for extended runtime — the two are complementary</li>
        <li>Online Double Conversion is the Data Center standard — zero transfer time, output isolated from input quality</li>
        <li>Battery sizing formula: Ah = (Load_W × Runtime_hr) ÷ (V × DoD × η) — every variable matters</li>
        <li>N+1 is one extra module, 2N is two completely independent paths — do not mix them up</li>
        <li>Static bypass is an automatic fault response; maintenance bypass gives complete isolation for servicing</li>
        <li>Annual battery capacity testing is non-negotiable — visual inspection does not detect internal degradation</li>
        <li>Actual implementation always depends on project requirements, utility requirements, OEM design and Data Center architecture</li>
      </ul>

      <p style={S.p}>
        Next step: a deeper dive into the <TopicLink slug="battery-bank" variant="inline" />, or explore the dedicated coverage of <TopicLink slug="sts" variant="inline" /> and <TopicLink slug="pdu" variant="inline" />.
      </p>
    </>
  );
}
