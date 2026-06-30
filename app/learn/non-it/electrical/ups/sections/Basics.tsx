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
          Socho tum office mein kaam kar rahe ho, suddenly light chali jaati hai. Tumhara laptop battery
          pe chal jaata hai — koi farak nahi padta. Lekin server room mein jo bade servers hote hain,
          unke paas internal battery nahi hoti. Agar power achanak cut ho jaaye, toh server crash ho
          jaayega, data corrupt ho sakta hai.
        </p>

        <p style={S.p}>
          Yahi pe kaam aata hai <strong>UPS — Uninterruptible Power Supply</strong>. Simple words mein,
          UPS ek aisi device hai jo grid power fail hone ke <em>exact</em> moment pe (zero gap ke saath,
          ya kuch milliseconds mein) battery se power supply continue kar deti hai. IT equipment ko
          kabhi pata hi nahi chalta ki grid gaya tha.
        </p>

        <p style={S.p}>
          Data Center mein UPS sirf ek "backup battery" nahi hai — yeh poore facility ki{" "}
          <strong>power quality ka guardian</strong> bhi hai. Grid se aane wala power kabhi perfectly
          clean nahi hota — voltage spikes, sags, harmonics sab hote rehte hain. UPS yeh sab clean
          karke server ko ek stable, pure sine wave deta hai.
        </p>

        <Callout type="important" title="Important — UPS ≠ Battery">
          Bahut log UPS aur battery ko same samajh lete hain. Battery sirf energy store karti hai. UPS
          ek complete <em>system</em> hai jisme rectifier, inverter, static switch, aur control logic
          sab milke kaam karte hain — battery toh ek component hai is system ka.
        </Callout>

        <p style={S.p}>
          Technical definition: UPS ek electrical apparatus hai jo load (server, network equipment) ko
          continuous, regulated AC power deta hai — chahe input supply available ho ya na ho, jab tak
          battery charge hai.
        </p>

        {/* ═══════════════════════════════════════════════════════════════
            SECTION 2 — WHY UPS IS REQUIRED
        ═══════════════════════════════════════════════════════════════ */}
        <h2 id="why-ups-required" style={S.h2}>Why UPS is Required</h2>

        <p style={S.p}>
          Sawal yeh hai — agar <TopicLink slug="dg-set" variant="inline" /> already backup power deta
          hai, toh UPS ki zaroorat kyun? Jawab hai — <strong>timing gap</strong>.
        </p>

        <p style={S.p}>
          Jab grid fail hoti hai, DG Set ko start hone mein, voltage build karne mein, aur load transfer
          hone mein typically <strong>10 se 30 seconds</strong> lagte hain. Is gap mein server ko power
          chahiye — warna crash. UPS yahi gap battery se cover karta hai.
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
          Beyond grid failures, UPS solves five core problems: <strong>voltage fluctuation</strong>{" "}
          (sag/surge), <strong>frequency variation</strong>, <strong>harmonic distortion</strong>,{" "}
          <strong>complete blackouts</strong>, aur <strong>transient spikes</strong> (lightning ya
          switching ki wajah se).
        </p>

        <Callout type="interview" title="Interview Tip">
          Agar interview mein poocha jaaye "UPS aur DG Set dono backup hain, toh dono kyun chahiye?" —
          answer: <em>UPS instant transfer ke liye (zero downtime), DG Set extended runtime ke liye
          (UPS battery sirf 10-15 min chalti hai typically, DG hours chala sakta hai).</em>
        </Callout>

        {/* ═══════════════════════════════════════════════════════════════
            SECTION 3 — HISTORY OF UPS TECHNOLOGY
        ═══════════════════════════════════════════════════════════════ */}
        <h2 id="history-of-ups" style={S.h2}>History of UPS Technology</h2>

        <p style={S.p}>
          UPS technology ka concept 1930s mein shuru hua tha, jab telephone exchanges ko continuous
          power chahiye thi. Lekin modern UPS jo hum aaj jaante hain, woh 1960s-70s mein develop hua
          jab mainframe computers industries mein aam hone lage.
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
          Aaj ka UPS sirf ek backup box nahi — yeh ek <strong>intelligent power management system</strong>{" "}
          hai jo SNMP, cloud monitoring, predictive battery analytics sab support karta hai. Hum yeh
          sab aage detail mein cover karenge.
        </p>

        {/* ═══════════════════════════════════════════════════════════════
            SECTION 4 — UPS STANDARDS & CODES
        ═══════════════════════════════════════════════════════════════ */}
        <h2 id="ups-standards" style={S.h2}>UPS Standards & Codes</h2>

        <p style={S.p}>
          Professional Data Center design kabhi "andaaz" se nahi hota — har decision kisi standard ya
          code ke against verify hota hai. UPS ke liye yeh standards sabse zaroori hain:
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
          India mein CEA (Central Electricity Authority) guidelines aur IS codes bhi apply hote hain
          alongside international standards. Actual implementation depends on project requirements,
          utility requirements, OEM design aur Data Center architecture — yeh standards ek baseline
          reference hain, har project ki apni specific compliance zaroorat hoti hai.
        </Callout>

        {/* ═══════════════════════════════════════════════════════════════
            SECTION 5 — WORKING PRINCIPLE
        ═══════════════════════════════════════════════════════════════ */}
        <h2 id="working-principle" style={S.h2}>Working Principle</h2>

        <p style={S.p}>
          UPS ka core working principle samajhna simple hai agar hum ise ek "relay race" ki tarah
          dekhein. Teen main players hain: <strong>Rectifier</strong>, <strong>Battery</strong>, aur{" "}
          <strong>Inverter</strong>.
        </p>

        <ol style={S.ul}>
          <li><strong>Step 1:</strong> Grid se AC power aata hai UPS mein.</li>
          <li><strong>Step 2:</strong> Rectifier is AC ko DC mein convert karta hai.</li>
          <li><strong>Step 3:</strong> Yeh DC battery ko charge karta hai (aur saath mein inverter ko bhi feed karta hai online topology mein).</li>
          <li><strong>Step 4:</strong> Inverter DC ko wapas clean AC mein convert karta hai — yeh output load (server) ko jaata hai.</li>
          <li><strong>Step 5:</strong> Agar grid fail ho jaaye, battery seamlessly DC supply continue karti hai — inverter ko farak nahi padta source kahan se aa raha hai.</li>
        </ol>

        <p style={S.p}>
          Yahi reason hai ki Online Double Conversion UPS mein <strong>zero transfer time</strong> hota
          hai — load hamesha inverter se hi power leta hai, chahe grid ho ya battery. Hum is topology ko
          detail mein Section 16 mein cover karenge.
        </p>

        {/* ═══════════════════════════════════════════════════════════════
            SECTION 6 — INTERNAL BLOCK DIAGRAM (SVG #1)
        ═══════════════════════════════════════════════════════════════ */}
        <h2 id="internal-block-diagram" style={S.h2}>Internal Block Diagram</h2>

        <p style={S.p}>
          Neeche diya gaya block diagram UPS ke andar ke har major component aur unka power flow dikhata
          hai — yeh foundation hai jo aage har section mein reference hoga.
        </p>

        <Figure caption="Fig 1 — UPS Internal Block Diagram showing power flow from input to output">
          <UpsInternalBlockDiagram />
        </Figure>

        <p style={S.p}>
          Notice karo — <strong>Static Switch</strong> ek critical safety net hai. Agar inverter kabhi
          fail ho jaaye ya overload ho jaaye, static switch milliseconds mein load ko directly bypass
          path (raw grid power) pe shift kar deta hai. Hum is component ko Section 11 mein detail se
          cover karenge.
        </p>

        {/* ═══════════════════════════════════════════════════════════════
            SECTION 7 — UPS SINGLE LINE DIAGRAM (SVG #31)
        ═══════════════════════════════════════════════════════════════ */}
        <h2 id="ups-single-line-diagram" style={S.h2}>UPS Single Line Diagram (SLD)</h2>

        <p style={S.p}>
          Single Line Diagram (SLD) ek simplified electrical drawing hai jo poore power distribution
          path ko single lines mein dikhata hai — yeh design engineers aur site electricians dono ke
          liye standard reference document hota hai.
        </p>

        <Figure caption="Fig 2 — Typical UPS Single Line Diagram from incoming supply to rack PDU">
          <UpsSingleLineDiagram />
        </Figure>

        <Callout type="important" title="Important — SLD is Project-Specific">
          Yeh ek simplified, single-path SLD hai sirf samajhne ke liye. Real Tier III/IV Data Center mein
          dual-path (A/B feed) SLD hota hai jisme har component redundant hota hai. Hum yeh
          Section 31 (Dual Bus & A-B Feed) mein detail se cover karenge.
        </Callout>

        {/* ═══════════════════════════════════════════════════════════════
            SECTION 8 — CORE COMPONENTS OVERVIEW
        ═══════════════════════════════════════════════════════════════ */}
    </>
  );
}
