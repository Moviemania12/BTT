"use client";

// ═══════════════════════════════════════════════════════════════════════════
// app/learn/non-it/electrical/battery-bank/sections/TierDesignStandards.tsx
//
// Part 22 — Tier III & Tier IV Design (Blueprint v3.0 Part 22)
// Part 23 — Standards Mapping Table (Blueprint v3.0 Part 23)
// Heading IDs: tier-iii-iv-design, standards-mapping
// ═══════════════════════════════════════════════════════════════════════════

import { S, Callout, ComparisonTable, SectionIntro } from "../shared";
import TopicLink from "@/components/TopicLink";

export default function TierDesignStandards() {
  return (
    <>
      {/* ═══════════════════════════════════════════════════════════════
          PART 22 — TIER III & TIER IV DESIGN
      ═══════════════════════════════════════════════════════════════ */}

      <h2 id="tier-iii-iv-design" style={S.h2}>Tier III & Tier IV Design</h2>

      <SectionIntro
        quickAnswer="Tier classification directly battery bank architecture ko define karta hai. Tier III mein N+1 strings ek room mein chahiye — concurrent maintainability. Tier IV mein 2N architecture mandatory hai — do completely independent battery banks, physically separated rooms mein."
        engineerTip="Tier IV ka sabse misunderstood requirement: physical separation. 2N matlab sirf do battery banks nahi — do completely independent paths. Ek shared wall bhi acceptable nahi hai per strict interpretation. Separate rooms, separate HVAC, separate cable routes, separate earthing systems. Ek room mein fire se doosre room ka bank survive karna chahiye."
        keyTakeaway="Tier III = N+1 strings in one room. Tier IV = 2N in two separate rooms — physical independence is the differentiator, not just electrical redundancy."
      />

      <h3 style={S.h3}>Tier Classification — Battery Requirements</h3>

      <ComparisonTable
        headers={["Tier", "Battery Redundancy", "Room Design", "Maintainability"]}
        rows={[
          ["Tier I", "N — no spare strings", "Single battery location", "Shutdown required for any maintenance"],
          ["Tier II", "N+1 minimum", "Single battery room acceptable", "Limited concurrent maintainability"],
          ["Tier III", "N+1 strings minimum, concurrently maintainable", "Single room acceptable — but must allow string replacement without downtime", "Full concurrent maintainability — any string maintainable without output interruption"],
          ["Tier IV", "2N — two fully independent banks", "Physically separate rooms mandatory", "Fault tolerant — complete path failure + concurrent maintenance tolerated"],
        ]}
      />

      <h3 style={S.h3}>Tier III — Battery Bank Design</h3>

      <p style={S.p}>
        Tier III ke liye key requirement hai <strong>concurrent maintainability</strong> — koi bhi
        single component maintain ya replace kiya ja sake bina IT load interrupt kiye.
        Battery bank ke context mein: ek string kabhi bhi replace kiya ja sake while remaining
        strings continue providing backup.
      </p>

      <ComparisonTable
        headers={["Design Element", "Tier III Requirement"]}
        rows={[
          ["String redundancy", "N+1 minimum — one spare string always available"],
          ["String isolation", "Each string individually fused + isolatable without affecting other strings"],
          ["Room access", "Sufficient aisle width to remove and replace battery cells/strings without shutdown"],
          ["HVAC redundancy", "N+1 — one unit failure cannot compromise battery room temperature"],
          ["BMS", "Per-string monitoring minimum; per-cell recommended"],
          ["Cable routing", "Single room acceptable — but diverse routing to minimize common failure risk"],
          ["Testing", "Annual capacity test without full outage — load bank on output, string rotation possible"],
        ]}
      />

      <Callout type="important" title="Important — Concurrent Maintainability Must Be Proven">
        Tier III certification require karta hai ki concurrent maintainability operations pe
        demonstrate kiya jaye — not just designed on paper. Battery room mein ek string
        physically replace karne ka SOW (Scope of Work) document karo aur prove karo ki
        remaining strings full load support karte hain during this operation.
      </Callout>

      <h3 style={S.h3}>Tier IV — Battery Bank Design</h3>

      <p style={S.p}>
        Tier IV ka fundamental requirement hai <strong>fault tolerance</strong> — koi bhi
        single failure (equipment, distribution path, ya human error) IT load ko affect
        nahi kar sakta. Battery bank ke liye yeh translates to 2N architecture with physical
        separation.
      </p>

      <ComparisonTable
        headers={["Design Element", "Tier IV Requirement"]}
        rows={[
          ["Bank architecture", "2N — two completely independent banks, each capable of full load alone"],
          ["Physical separation", "Separate rooms mandatory — different fire compartments preferred"],
          ["HVAC", "Independent systems — Bank A room and Bank B room have completely separate HVAC"],
          ["Earthing", "Independent earthing systems — separate earth pits or physically separated earth bars"],
          ["DC cable routing", "Separate cable trays, separate rooms — no shared routing"],
          ["BMS", "Independent BMS systems — Bank A BMS cannot affect Bank B"],
          ["Switchover testing", "Regular scheduled testing — Bank A isolated, Bank B carries full load, and vice versa"],
          ["HVAC redundancy", "2N within each bank room — N+1 per room at minimum"],
        ]}
      />

      <h3 style={S.h3}>Tier IV — Battery Bank Switchover Testing</h3>

      <p style={S.p}>
        Tier IV design ka ek underappreciated operational requirement hai: regular switchover
        testing. Design pe guarantee nahi hoti ki 2N actually works jab zaroorat ho — testing
        se prove hota hai.
      </p>

      <ComparisonTable
        headers={["Switchover Test", "Frequency", "Method"]}
        rows={[
          ["Bank A isolation test", "Quarterly recommended", "Isolate Bank A completely — Bank B carries full load. Monitor 30 minutes. Restore Bank A."],
          ["Bank B isolation test", "Quarterly, offset by 6 weeks from Bank A test", "Same as above, reversed"],
          ["Full capacity test per bank", "Annually", "Each bank independently load-tested to verify N capacity"],
          ["HVAC failure simulation", "Annually", "Shut one HVAC unit — verify other unit maintains temperature"],
          ["Documentation", "Every test", "Pass/fail, temperatures, voltages, load %  — all recorded"],
        ]}
      />

      <p style={S.p}>
        Tier III aur Tier IV ke complete context ke liye{" "}
        <TopicLink slug="ups" variant="inline" /> article mein UPS redundancy architecture
        section dekho — battery bank redundancy UPS redundancy ke saath coordinated hoti hai.
      </p>

      {/* ═══════════════════════════════════════════════════════════════
          PART 23 — STANDARDS MAPPING TABLE
      ═══════════════════════════════════════════════════════════════ */}

      <h2 id="standards-mapping" style={S.h2}>Standards Mapping Table</h2>

      <SectionIntro
        quickAnswer="Battery bank design aur operation multiple standards se governed hoti hai — IEEE for testing aur sizing, IEC for technical specifications, NFPA for fire safety, IS/BIS for India-specific requirements. Kaunsa standard kab apply hota hai — yeh table clearly map karta hai."
        engineerTip="India mein yeh standards mandatory vs recommended ki distinction hamesha clear nahi hoti. IS standards BIS ke through mandatory hain for domestic products. IEC standards Indian market mein typically voluntary hain unless a client contract specifically mandates them. NFPA standards voluntary in India but increasingly required by international clients and insurance underwriters — especially NFPA 855 for Li-ion."
        keyTakeaway="Multiple standards overlap karte hain — jab conflict ho, more stringent requirement follow karo aur project specification pe explicitly document karo which standards govern."
      />

      <ComparisonTable
        headers={["Topic", "Standard", "Body", "Key Requirement"]}
        rows={[
          ["Battery Sizing — Lead Acid", "IEEE 485", "IEEE", "Step-by-step methodology for stationary lead-acid sizing; includes temperature and aging corrections"],
          ["VRLA Maintenance & Testing", "IEEE 1188", "IEEE", "Impedance testing, capacity testing, replacement criteria (80% SoH threshold)"],
          ["VLA Maintenance & Testing", "IEEE 450", "IEEE", "Specific gravity, capacity testing, replacement criteria for flooded batteries"],
          ["Battery Installation Design", "IEEE 1187", "IEEE", "Installation guidance, parallel string limits (≤3 recommended), cable sizing"],
          ["Battery Monitoring", "IEEE 1491", "IEEE", "BMS selection criteria, monitoring parameters for stationary batteries"],
          ["Electrolyte Spill Containment", "IEEE 1578", "IEEE", "Spill management for VLA battery rooms"],
          ["VRLA Technical Specification", "IEC 60896-11", "IEC", "Technical standard for VRLA stationary batteries — European/international"],
          ["VLA Technical Specification", "IEC 60896-21", "IEC", "Technical standard for flooded stationary batteries"],
          ["Li-ion Safety", "IEC 62619", "IEC", "Safety requirements for stationary Li-ion — BMS, thermal management, testing"],
          ["Li-ion Industrial", "IEC 62620", "IEC", "Secondary lithium cells for industrial applications"],
          ["UPS Performance", "IEC 62040-3", "IEC", "UPS battery integration, performance, test requirements"],
          ["LV Electrical Installation", "IEC 60364", "IEC", "Cable sizing, earthing, protection coordination for battery circuits"],
          ["Li-ion Battery Safety Cert", "UL 1973", "UL", "Safety certification for stationary Li-ion — required by many clients"],
          ["Energy Storage System Safety", "UL 9540", "UL", "System-level safety standard for battery energy storage systems"],
          ["Thermal Runaway Propagation", "UL 9540A", "UL", "Test method — AHJ uses this to assess Li-ion room design"],
          ["Fire Code — Battery Storage", "NFPA 1", "NFPA", "Fire safety requirements for battery rooms, H₂ concentration limits"],
          ["Stationary Energy Storage", "NFPA 855", "NFPA", "Li-ion specific installation, fire suppression, ventilation — critical standard"],
          ["Earthing — India", "IS 3043", "BIS", "Code of practice for earthing — earth resistance <1 Ohm typically"],
          ["Stationary Batteries — India", "IS 1651", "BIS", "Indian standard for stationary lead-acid batteries"],
          ["Li-ion Safety — India", "IS 16046", "BIS", "Indian adaptation of IEC 62619"],
          ["Data Center Tiers", "TIA-942", "TIA", "Tier I-IV definitions including battery redundancy requirements"],
          ["Tier Operations", "Uptime Institute", "Uptime", "Concurrent maintainability and fault tolerance requirements"],
          ["Electrical Safety — India", "Indian Electricity Rules", "GoI", "General electrical installation and safety rules"],
          ["Floor Loading — India", "IS 875 Part 2", "BIS", "Imposed loads on structures — battery room floor loading"],
          ["Battery Disposal — India", "E-Waste Rules 2022", "MoEFCC", "Battery disposal, recycling obligations for producers and bulk users"],
          ["DC Arc Flash Safety", "NFPA 70E", "NFPA", "Arc flash hazard assessment and PPE requirements for DC battery work"],
        ]}
      />

      <Callout type="important" title="Important — Priority When Standards Conflict">
        Jab do standards ek topic pe different requirements dete hain, follow karo:
        (1) Project specification mein explicitly listed standard — first priority.
        (2) Client/operator contract requirements — second priority.
        (3) Local statutory requirements (IS/BIS, Indian Electricity Rules) — mandatory.
        (4) More stringent requirement — conservative engineering practice.
        Always document which standards govern your project in the design basis.
      </Callout>
    </>
  );
}
