"use client";

// ═══════════════════════════════════════════════════════════════════════════
// app/learn/non-it/electrical/ups/sections/Basics.tsx
//
// Sections 1-7: What is UPS, Why Required, History, Standards, Working Principle, Internal Block Diagram, Single Line Diagram
//
// Extracted unchanged from Phase 1-3 monolithic page.tsx as part of the
// folder restructure. Content is byte-identical to the original — only the
// file location and import paths have changed.
// ═══════════════════════════════════════════════════════════════════════════

import { S, Callout, ComparisonTable, Figure } from "../shared";
import TopicLink from "@/components/TopicLink";
import UpsInternalBlockDiagram from "../svg/UpsInternalBlockDiagram";
import UpsSingleLineDiagram from "../svg/UpsSingleLineDiagram";

export default function Basics() {
  return (
    <>
        <h2 id="what-is-ups" style={S.h2}>What is a UPS?</h2>

        <p style={S.p}>
          Imagine you are working in an office and suddenly the power goes out. Your laptop switches to battery — it makes no difference. But the big servers in the server room do not have an internal battery. If power is cut suddenly, the server will crash and data can get corrupted.
        </p>

        <p style={S.p}>
          This is where the <strong>UPS — Uninterruptible Power Supply</strong> comes in. In simple words, a UPS is a device that continues the power supply from the battery at the <em>exact</em> moment grid power fails (with zero gap, or within a few milliseconds). The IT equipment never even knows that the grid went out.
        </p>

        <p style={S.p}>
          In a Data Center, a UPS is not just a "backup battery" — it is also the <strong>guardian of power quality</strong> for the entire facility. Power coming from the grid is never perfectly clean — voltage spikes, sags and harmonics keep happening. The UPS cleans all of this and gives the server a stable, pure sine wave.
        </p>

        <Callout type="important" title="Important — UPS ≠ Battery">
          Many people think a UPS and a battery are the same. A battery only stores energy. A UPS is a complete <em>system</em> in which the rectifier, inverter, static switch and control logic all work together — the battery is just one component of this system.
        </Callout>

        <p style={S.p}>
          Technical definition: A UPS is an electrical apparatus that gives continuous, regulated AC power to the load (server, network equipment) — whether the input supply is available or not, as long as the battery has charge.
        </p>

        {/* ═══════════════════════════════════════════════════════════════
            SECTION 2 — WHY UPS IS REQUIRED
        ═══════════════════════════════════════════════════════════════ */}
        <h2 id="why-ups-required" style={S.h2}>Why UPS is Required</h2>

        <p style={S.p}>
          The question is — if the <TopicLink slug="dg-set" variant="inline" /> already provides backup power, why is a UPS needed? The answer is — the <strong>timing gap</strong>.
        </p>

        <p style={S.p}>
          When the grid fails, the DG Set typically takes <strong>10 to 30 seconds</strong> to start, build voltage and transfer the load. During this gap the server needs power — otherwise it crashes. The UPS covers exactly this gap from the battery.
        </p>

        <ComparisonTable
          headers={["Power Issue", "Duration", "Without UPS Impact", "With UPS"]}
          rows={[
            ["Voltage Sag", "Milliseconds", "Server reboot, data loss", "Instantly corrected"],
            ["Power Surge", "Microseconds", "Hardware damage", "Filtered out"],
            ["Brief Outage", "< 1 second", "Server crash", "Seamless, no impact"],
            ["Full Grid Failure", "10–30 sec (DG startup)", "Total downtime", "Battery bridges the gap"],
            ["Harmonics/Noise", "Continuous", "Equipment overheating, efficiency loss", "Clean sine wave output"],
          ]}
        />

        <p style={S.p}>
          Beyond grid failures, UPS solves five core problems: <strong>voltage fluctuation</strong> (sag/surge), <strong>frequency variation</strong>, <strong>harmonic distortion</strong>, <strong>complete blackouts</strong>, and <strong>transient spikes</strong> (caused by lightning or switching).
        </p>

        <Callout type="interview" title="Interview Tip">
          If you are asked in an interview "UPS and DG Set are both backup, so why are both needed?" — answer: <em>UPS is for instant transfer (zero downtime), DG Set is for extended runtime (UPS battery typically runs only 10-15 min, a DG can run for hours).</em>
        </Callout>

        {/* ═══════════════════════════════════════════════════════════════
            SECTION 3 — HISTORY OF UPS TECHNOLOGY
        ═══════════════════════════════════════════════════════════════ */}
        <h2 id="history-of-ups" style={S.h2}>History of UPS Technology</h2>

        <p style={S.p}>
          The concept of UPS technology started in the 1930s, when telephone exchanges needed continuous power. But the modern UPS we know today was developed in the 1960s-70s, when mainframe computers became common in industries.
        </p>

        <ComparisonTable
          headers={["Era", "Development", "Key Characteristic"]}
          rows={[
            ["1930s–40s", "Motor-generator (M-G) sets", "Mechanical flywheel based, bulky"],
            ["1960s", "First static (solid-state) UPS", "Thyristor-based rectifiers introduced"],
            ["1970s–80s", "Mainframe-era UPS", "Online double conversion becomes standard for critical loads"],
            ["1990s", "Microprocessor control", "Digital monitoring, better efficiency"],
            ["2000s", "Modular UPS", "Hot-swappable power modules, N+1 built-in"],
            ["2010s–Present", "Lithium-ion + Eco-mode", "Higher efficiency (up to 99%), smaller footprint, IoT monitoring"],
          ]}
        />

        <p style={S.p}>
          Today's UPS is not just a backup box — it is an <strong>intelligent power management system</strong> that supports SNMP, cloud monitoring and predictive battery analytics. We will cover all of this in detail ahead.
        </p>

        {/* ═══════════════════════════════════════════════════════════════
            SECTION 4 — UPS STANDARDS & CODES
        ═══════════════════════════════════════════════════════════════ */}
        <h2 id="ups-standards" style={S.h2}>UPS Standards & Codes</h2>

        <p style={S.p}>
          Professional Data Center design is never done by "guesswork" — every decision is verified against some standard or code. These standards are the most important for UPS:
        </p>

        <ComparisonTable
          headers={["Standard", "Governs", "Why It Matters"]}
          rows={[
            ["IEC 62040", "UPS performance, safety, EMC requirements", "International benchmark for UPS testing and classification (VFD/VI/VFI categories)"],
            ["IEEE 1188", "Maintenance, testing & replacement of VRLA batteries", "Defines battery inspection frequency and end-of-life criteria"],
            ["IEEE 450", "Maintenance, testing of vented lead-acid batteries", "Used for flooded battery banks in larger installations"],
            ["IEEE 485", "Sizing of lead-acid battery banks", "Reference for Ah and string sizing calculations"],
            ["IEC 60364", "Electrical installations of buildings", "Covers earthing, cable sizing, protection coordination"],
            ["TIA-942", "Data Center infrastructure standard", "Defines Tier ratings, redundancy classes for telecom/DC facilities"],
            ["Uptime Institute Tiers", "Tier I–IV classification", "Defines redundancy and concurrent maintainability requirements"],
            ["NFPA 70 (NEC)", "National Electrical Code (US)", "Wiring, grounding, and overcurrent protection rules"],
          ]}
        />

        <Callout type="important" title="Important — Standards Vary by Region">
          In India, CEA (Central Electricity Authority) guidelines and IS codes also apply alongside international standards. Actual implementation depends on project requirements, utility requirements, OEM design and Data Center architecture — these standards are a baseline reference; every project has its own specific compliance requirements.
        </Callout>

        {/* ═══════════════════════════════════════════════════════════════
            SECTION 5 — WORKING PRINCIPLE
        ═══════════════════════════════════════════════════════════════ */}
        <h2 id="working-principle" style={S.h2}>Working Principle</h2>

        <p style={S.p}>
          The core working principle of a UPS is simple to understand if we look at it like a "relay race". There are three main players: <strong>Rectifier</strong>, <strong>Battery</strong>, and <strong>Inverter</strong>.
        </p>

        <ol style={S.ul}>
          <li><strong>Step 1:</strong> AC power comes into the UPS from the grid.</li>
          <li><strong>Step 2:</strong> The rectifier converts this AC into DC.</li>
          <li><strong>Step 3:</strong> This DC charges the battery (and in the online topology also feeds the inverter at the same time).</li>
          <li><strong>Step 4:</strong> The inverter converts the DC back into clean AC — this output goes to the load (server).</li>
          <li><strong>Step 5:</strong> If the grid fails, the battery seamlessly continues the DC supply — the inverter does not care where the source is coming from.</li>
        </ol>

        <p style={S.p}>
          This is the reason an Online Double Conversion UPS has <strong>zero transfer time</strong> — the load always takes power from the inverter, whether from the grid or the battery. We will cover this topology in detail in Section 16.
        </p>

        {/* ═══════════════════════════════════════════════════════════════
            SECTION 6 — INTERNAL BLOCK DIAGRAM (SVG #1)
        ═══════════════════════════════════════════════════════════════ */}
        <h2 id="internal-block-diagram" style={S.h2}>Internal Block Diagram</h2>

        <p style={S.p}>
          The block diagram below shows every major component inside the UPS and their power flow — this is the foundation that will be referenced in every section ahead.
        </p>

        <Figure caption="Fig 1 — UPS Internal Block Diagram showing power flow from input to output">
          <UpsInternalBlockDiagram />
        </Figure>

        <p style={S.p}>
          Notice — the <strong>Static Switch</strong> is a critical safety net. If the inverter ever fails or gets overloaded, the static switch shifts the load directly onto the bypass path (raw grid power) within milliseconds. We will cover this component in detail in Section 11.
        </p>

        {/* ═══════════════════════════════════════════════════════════════
            SECTION 7 — UPS SINGLE LINE DIAGRAM (SVG #31)
        ═══════════════════════════════════════════════════════════════ */}
        <h2 id="ups-single-line-diagram" style={S.h2}>UPS Single Line Diagram (SLD)</h2>

        <p style={S.p}>
          A Single Line Diagram (SLD) is a simplified electrical drawing that shows the entire power distribution path in single lines — it is the standard reference document for both design engineers and site electricians.
        </p>

        <Figure caption="Fig 2 — Typical UPS Single Line Diagram from incoming supply to rack PDU">
          <UpsSingleLineDiagram />
        </Figure>

        <Callout type="important" title="Important — SLD is Project-Specific">
          This is a simplified, single-path SLD just for understanding. A real Tier III/IV Data Center has a dual-path (A/B feed) SLD in which every component is redundant. We will cover this in detail in Section 31 (Dual Bus & A-B Feed).
        </Callout>

        {/* ═══════════════════════════════════════════════════════════════
            SECTION 8 — CORE COMPONENTS OVERVIEW
        ═══════════════════════════════════════════════════════════════ */}
    </>
  );
}
