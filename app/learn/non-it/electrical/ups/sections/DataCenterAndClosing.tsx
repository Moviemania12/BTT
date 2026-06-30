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
        Data Center mein UPS sirf ek standalone device nahi hai — yeh poore electrical power chain ka
        ek critical link hai: Grid → <TopicLink slug="transformer" variant="inline" /> → UPS →{" "}
        <TopicLink slug="pdu" variant="inline" /> → Rack. Tier level decide karta hai kitna redundant
        yeh chain hoga.
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
        UPS aur battery room design mein safety, accessibility, aur thermal management teeno equally
        important hain.
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
        Bade installations mein UPS aur battery ko separate rooms mein rakhna best practice hai —
        battery room ki specific ventilation/temperature needs UPS room se different hoti hain, aur
        separation fault containment bhi improve karta hai.
      </Callout>

      <h2 id="earthing-cable-sizing" style={S.h2}>Earthing & Cable Sizing</h2>

      <p style={S.p}>
        UPS installation mein proper <TopicLink slug="earthing" variant="inline" /> aur cable sizing
        dono safety aur performance ke liye critical hain.
      </p>

      <p style={S.p}>
        Cable sizing voltage drop, current carrying capacity, aur derating factors pe depend karta
        hai — use the <strong>Cable Size Calculator</strong> aur <strong>Voltage Drop Calculator</strong>{" "}
        (linked in this article&apos;s calculator toolkit) for project-specific sizing.
      </p>

      <Callout type="warning" title="Warning — Never Skip Earthing Verification">
        UPS DC bus voltage (192V-410V typical) dangerous hai — proper earthing system fault current
        ke liye safe path provide karta hai. Earth resistance verification (target &lt;1 Ohm per IS
        3043) installation ke baad aur periodically dono verify karna chahiye.
      </Callout>

      <h2 id="ups-efficiency-harmonics" style={S.h2}>Efficiency, Power Factor & Harmonics</h2>

      <p style={S.p}>
        Modern UPS efficiency aur power quality dono optimize karte hain — lekin trade-offs samajhna
        zaroori hai.
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
        Efficiency aur harmonic figures OEM aur model ke according vary karte hain — yeh ranges
        industry-typical hain, actual datasheet verify karna chahiye specific UPS model ke liye.
      </Callout>

      <h2 id="ups-monitoring-protocols" style={S.h2}>Monitoring: SNMP, Modbus, BACnet, DCIM, BMS, EMS</h2>

      <p style={S.p}>
        Modern UPS standalone device nahi hai — yeh facility-wide monitoring ecosystem ka hissa hai.
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
        Deeper coverage of <TopicLink slug="bms" variant="inline" /> aur{" "}
        <TopicLink slug="dcim" variant="inline" /> dedicated articles mein milega.
      </p>

      <h2 id="ups-alarms-troubleshooting" style={S.h2}>Alarms & Troubleshooting</h2>

      <p style={S.p}>
        UPS alarms early warning system hain — samajhna ki kaunsa alarm kya indicate karta hai,
        downtime prevent karne mein critical hai.
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
        Alarm troubleshoot karte waqt kabhi bhi safety interlocks ya protection circuits ko bypass
        mat karo &quot;temporarily fix karne ke liye.&quot; Qualified technician se hi UPS internals pe kaam
        karwao, aur OEM troubleshooting guide follow karo.
      </Callout>

      <h2 id="maintenance" style={S.h2}>Preventive & Corrective Maintenance</h2>

      <p style={S.p}>
        UPS reliability planned maintenance pe directly depend karti hai — yeh sirf battery replace
        karne tak limited nahi hai.
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
        Battery annual capacity test sabse critical maintenance task hai — visual inspection battery
        ki internal degradation detect nahi karti. String jo 80% rated capacity se neeche gir jaaye,
        replace karna chahiye before it becomes a runtime risk during an actual outage.
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
        Yeh dono complementary hain, competing nahi — deeper coverage{" "}
        <TopicLink slug="dg-set" variant="inline" /> article mein milega.
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
        UPS applications Data Centers se kahin zyada wide hain — har critical-infrastructure sector
        mein UPS life-safety ya business-continuity role play karta hai.
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
        Hospital aur airport UPS installations life-safety regulations ke against design hote hain
        (local fire/electrical authority, healthcare accreditation bodies) — yeh sector-specific
        compliance requirements is article ke general guidance se zyada strict ho sakte hain. Qualified
        consultant verify karna mandatory hai in sectors mein.
      </Callout>

      <h2 id="oem-comparison" style={S.h2}>OEM Comparison</h2>

      <p style={S.p}>
        UPS market mein kai established global aur Indian OEMs hain — Schneider Electric, Vertiv,
        Eaton, Delta, ABB, Socomec, Riello, Huawei, aur others. Har vendor ki apni product line,
        topology focus, aur India support presence hai.
      </p>

      <Callout type="important" title="Important — Vendor Specs Change Frequently">
        OEM-specific specifications, pricing, aur model availability frequently update hote rehte
        hain. Yeh article specific vendor comparisons nahi karta kyunki yeh data verify karna
        zaroori hai current OEM datasheets aur India sales team se directly — generic guidance hi
        durable rehta hai is tarah ke fast-changing market mein.
      </Callout>

      <h2 id="real-project-examples" style={S.h2}>Real Project Examples</h2>

      <p style={S.p}>
        Is article ke <strong>Load Calculation</strong> section mein already 4 worked examples cover
        kiye gaye hain — 100-Rack Data Center, Office Building, Hospital Critical Power, aur
        Industrial Plant. Wahan complete step-by-step sizing calculations available hain.
      </p>

      <p style={S.p}>
        Apna khud ka project size karne ke liye, use the <strong>Data Center UPS Designer</strong>{" "}
        calculator (linked in this article&apos;s toolkit) — rack count aur Tier level input karo,
        poora system sizing milega.
      </p>

      <h2 id="interview-questions" style={S.h2}>Interview Questions</h2>

      <p style={S.p}>
        UPS interview preparation ke liye structured practice chahiye toh hamara{" "}
        <strong>BTT Assistant</strong> &quot;mock interview karo&quot; mode support karta hai — ek
        question at a time, evaluated answers, progressively harder. Dedicated 100-question interview
        bank (50 beginner + 50 advanced) is article ka agla update hoga.
      </p>

      <Callout type="interview" title="Interview Tip — Core Concepts to Master">
        Most-asked UPS interview topics: Online vs Offline vs Line Interactive difference, DoD aur
        battery sizing formula, N+1 vs 2N, static bypass vs maintenance bypass, aur kVA/kW/PF
        relationship. In sab ka strong grasp interview success ke liye sufficient hai.
      </Callout>

      <h2 id="key-takeaways" style={S.h2}>Key Takeaways</h2>

      <ul style={S.ul}>
        <li>UPS instant transfer ke liye hai, DG Set extended runtime ke liye — dono complementary hain</li>
        <li>Online Double Conversion Data Center standard hai — zero transfer time, output isolated from input quality</li>
        <li>Battery sizing formula: Ah = (Load_W × Runtime_hr) ÷ (V × DoD × η) — har variable matter karta hai</li>
        <li>N+1 ek extra module hai, 2N do completely independent paths hai — inko mix mat karo</li>
        <li>Static bypass automatic fault response hai, maintenance bypass complete isolation deta hai for servicing</li>
        <li>Battery annual capacity testing non-negotiable hai — visual inspection internal degradation detect nahi karti</li>
        <li>Actual implementation hamesha project requirements, utility requirements, OEM design, aur Data Center architecture pe depend karta hai</li>
      </ul>

      <p style={S.p}>
        Agla step: <TopicLink slug="battery-bank" variant="inline" /> ka deeper dive, ya{" "}
        <TopicLink slug="sts" variant="inline" /> aur <TopicLink slug="pdu" variant="inline" /> ki
        dedicated coverage explore karo.
      </p>
    </>
  );
}
