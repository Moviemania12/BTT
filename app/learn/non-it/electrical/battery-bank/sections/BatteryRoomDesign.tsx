"use client";

// ═══════════════════════════════════════════════════════════════════════════
// app/learn/non-it/electrical/battery-bank/sections/BatteryRoomDesign.tsx
//
// Part 12 — Battery Room Design (Blueprint v3.0 Part 12)
// Heading IDs: battery-room-design
// ═══════════════════════════════════════════════════════════════════════════

import { S, Callout, ComparisonTable, SectionIntro } from "../shared";
import TopicLink from "@/components/TopicLink";

export default function BatteryRoomDesign() {
  return (
    <>
      {/* ═══════════════════════════════════════════════════════════════
          PART 12 — BATTERY ROOM DESIGN
      ═══════════════════════════════════════════════════════════════ */}

      <h2 id="battery-room-design" style={S.h2}>Battery Room Design</h2>

      <SectionIntro
        quickAnswer="A battery room is not just a room where you put batteries — it is an engineered space with specific HVAC, ventilation, safety, access and fire protection requirements. Wrong battery room design = shortened battery life, safety hazards and compliance issues."
        engineerTip="The most often missed item in battery room design: the interlock between the H₂ sensor and the exhaust fan. If the H₂ alarm triggers, the HVAC exhaust fan should automatically go to maximum speed and the fresh air inlet should open — do not depend on a manual response. Explicitly verify this interlock in the commissioning checklist."
        keyTakeaway="Battery room design directly controls battery life and safety — it is not a passive infrastructure element, it is an active life-safety system."
      />

      <h3 style={S.h3}>Room Location — Where in the Building</h3>

      <p style={S.p}>
        Selecting the battery room location is governed by its position relative to the UPS room, structural loading and fire safety considerations.
      </p>

      <ComparisonTable
        headers={["Location Option", "Pros", "Cons", "Recommended?"]}
        rows={[
          ["Ground floor, adjacent to UPS room", "Short DC cable run, good floor loading, easy delivery access", "May conflict with other ground floor uses", "Best choice — always try this first"],
          ["Basement", "Good floor loading, temperature stable, away from solar gain", "Flood risk, H₂ accumulation harder to ventilate, emergency egress", "Acceptable with proper flood protection + ventilation"],
          ["Upper floor", "May be only option in existing buildings", "Floor loading concern, H₂ venting challenge, heavy battery delivery logistics", "Last resort — requires structural analysis"],
          ["External (containerized)", "No building modification, flexible placement", "Weather exposure, long DC cable run possible", "Acceptable for large banks or remote sites"],
        ]}
      />

      <Callout type="important" title="Important — DC Cable Length Directly Impacts Battery Room Location">
        The longer the DC cable run between the battery room and the UPS, the greater the voltage drop. Target: less than 10m. With a cable run above 30m, the cable cross-section has to be significantly larger (expensive copper) and losses increase. Cable run length is a primary constraint in the location decision.
      </Callout>

      <h3 style={S.h3}>Temperature Control — HVAC Requirements</h3>

      <p style={S.p}>
        Target temperature: <strong>20–25°C year-round</strong>. Higher than this = reduced battery life. Lower than this (below 10°C) = reduced available capacity. Both are harmful.
      </p>

      <ComparisonTable
        headers={["Temperature", "Impact on VRLA", "Impact on LFP", "Action Required"]}
        rows={[
          ["< 10°C", "Capacity reduction 20-30%", "BMS may limit discharge", "Add heating — especially for outdoor/basement"],
          ["10–20°C", "Slight capacity reduction, extended life", "Normal operation", "Acceptable — monitor"],
          ["20–25°C", "Rated conditions — optimal", "Optimal", "Maintain — this is the target"],
          ["25–35°C", "Life reduction 33–50%", "Moderate impact", "Improve cooling — common Indian problem"],
          ["> 35°C", "Life halved or worse", "BMS may cut off", "Critical — immediate action"],
          ["> 45°C", "Severe risk — fire/thermal runaway", "BMS emergency cutoff", "Emergency — evacuate, isolate bank"],
        ]}
      />

      <h3 style={S.h3}>Ventilation Design</h3>

      <p style={S.p}>
        Battery room ventilation has two requirements: H₂ dilution (safety) and heat removal (battery life). Sometimes both are handled by the same HVAC system; sometimes separate systems are needed.
      </p>

      <ComparisonTable
        headers={["Ventilation Type", "Purpose", "Design Requirement"]}
        rows={[
          ["Forced exhaust (ceiling)", "H₂ removal — H₂ rises to ceiling", "Explosion-proof fan, continuous or thermostat-controlled"],
          ["Fresh air inlet (low level)", "Replace exhausted air, cool the room", "Filtered, at floor level — H₂ dilution requires low-to-high airflow"],
          ["Recirculating HVAC", "Temperature control", "Recirculation acceptable for temperature — but must NOT recirculate H₂ back to room"],
          ["Dedicated exhaust duct to outside", "H₂ must exit to atmosphere, not to adjoining spaces", "Duct directly to outside — not to return air plenum"],
        ]}
      />

      <Callout type="danger" title="Danger — H₂ Exhaust Must Go Outside, Not to Common Areas">
        Do not discharge the H₂ exhaust duct into any common area, return air plenum or adjacent room. H₂ is lighter than air — it can accumulate in a ceiling plenum or stairwell. Direct outside discharge is mandatory, above roof level preferred. Fire Authority requires this verification before NOC issuance.
      </Callout>

      <h3 style={S.h3}>Gas Detection — H₂ Sensors</h3>

      <ComparisonTable
        headers={["H₂ Sensor Parameter", "Requirement", "Standard"]}
        rows={[
          ["Sensor type", "Electrochemical or catalytic bead", "ATEX-certified for Zone 1 or Zone 2"],
          ["Sensor location", "Ceiling level — within 300mm of ceiling", "H₂ rises — ceiling mounting essential"],
          ["Alarm level 1 (warning)", "10% LEL = 0.4% H₂ in air", "Notify operations, increase ventilation"],
          ["Alarm level 2 (critical)", "20–25% LEL = 0.8–1.0% H₂ in air", "Activate emergency ventilation, evacuation"],
          ["Number of sensors", "Minimum 1 per 50 m² of floor area, minimum 2 per room", "Redundancy for detector failure"],
          ["Calibration", "6-monthly", "With certified calibration gas"],
        ]}
      />

      <h3 style={S.h3}>Fire Suppression</h3>

      <ComparisonTable
        headers={["Battery Type", "Suppression System", "Why", "Standard"]}
        rows={[
          ["VRLA AGM/Gel", "Clean agent (FM-200, Novec 1230, CO₂)", "Non-conductive, effective on electrical fires", "NFPA 1, local fire authority"],
          ["VLA Flooded", "Clean agent — same as VRLA", "Same fire characteristics", "NFPA 1"],
          ["LFP Li-ion", "Clean agent + cooling water for cell cooling", "LFP fire needs suppression AND cell cooling to stop propagation", "NFPA 855 — specialized requirements"],
          ["NMC Li-ion", "Specialized system per AHJ requirements", "Thermal runaway propagation risk higher", "NFPA 855 — AHJ approval required"],
        ]}
      />

      <Callout type="important" title="Important — NFPA 855 for Li-ion">
        If you are designing a Li-ion battery room in India, NFPA 855 compliance is increasingly being required — especially for international operators, insurance underwriters and export-oriented clients. Get pre-approval from the local fire authority before finalizing the Li-ion room design. Requirements vary by Authority Having Jurisdiction (AHJ).
      </Callout>

      <h3 style={S.h3}>Earthing System for Battery Room</h3>

      <p style={S.p}>
        Two earthing systems are maintained in the battery room:
      </p>

      <ul style={S.ul}>
        <li>
          <strong>Protective Earth (PE):</strong> Battery racks, cabinets and metalwork are all connected to protective earth — as per IS 3043. This is for shock protection.
        </li>
        <li>
          <strong>DC Functional Earth (floating monitor):</strong> An Earth Fault Monitor (EFM) stays connected with the floating DC bus — but the DC bus itself is not directly connected to earth. The EFM monitors insulation resistance.
        </li>
      </ul>

      <p style={S.p}>
        For detailed coverage of earthing, see the <TopicLink slug="earthing" variant="inline" /> article.
      </p>

      <h3 style={S.h3}>Safety Signage and Access Control</h3>

      <ComparisonTable
        headers={["Safety Item", "Requirement", "Standard"]}
        rows={[
          ["Danger sign — High Voltage DC", "At entry door, visible from outside", "IEC 60417, IS 2551"],
          ["No Smoking / No Open Flame sign", "At entry and inside room", "Mandatory — H₂ fire risk"],
          ["H₂ hazard sign", "At entry — Explosive Gas Warning", "ATEX, local fire authority"],
          ["Battery acid warning (VRLA)", "Corrosive material — even VRLA has internal acid", "COSHH, IS standards"],
          ["Emergency contact", "NOC number, facility manager, emergency services", "Posted inside room"],
          ["LOTO station", "Lockout/Tagout board at battery disconnect", "NFPA 70E, IS 5216"],
          ["PPE station", "Acid-resistant gloves, face shield, insulated tools", "Adjacent to room entry"],
          ["Access control", "Biometric or card-key — authorized personnel only", "Tier III/IV requirement"],
        ]}
      />

      <h3 style={S.h3}>Li-ion Battery Room — Additional Requirements vs VRLA</h3>

      <ComparisonTable
        headers={["Requirement", "VRLA Room", "LFP Li-ion Room"]}
        rows={[
          ["Fire suppression", "Clean agent sufficient", "Clean agent + cooling strategy per NFPA 855"],
          ["Gas detection", "H₂ sensor (ceiling)", "H₂ + CO monitoring recommended — Li-ion can also produce CO on fault"],
          ["Ventilation rate", "Per H₂ calculation", "Higher — per NFPA 855 guidance (also CO dilution)"],
          ["Rack inter-distance", "Standard (cooling)", "Increased for thermal runaway propagation mitigation"],
          ["Fire rating of room", "1-hour rated walls standard", "2-hour rated walls may be required per AHJ"],
          ["Emergency disconnect", "Recommended", "Mandatory — Battery Energy Disconnect (BED) per NFPA 855"],
          ["BMS requirement", "Optional (recommended)", "Mandatory — with alarm output to fire panel"],
          ["Insurance", "Standard", "Specialized endorsement may be required — verify with underwriter"],
        ]}
      />

      <h3 style={S.h3}>Battery Rack / Shelf Selection</h3>

      <p style={S.p}>
        Battery rack structural integrity is critical — heavy VRLA cells falling creates a catastrophic failure (battery acid spill + electrical fault + structural damage).
      </p>

      <ComparisonTable
        headers={["Rack Type", "Description", "Best For"]}
        rows={[
          ["Single-tier platform/step rack", "Large cells laid flat, single level access", "2V large cells (600Ah+)"],
          ["Two-tier step rack", "Two levels, step access, most common", "2V medium cells, 12V monobloc"],
          ["Three-tier step rack", "Three levels — height increases significantly", "12V monobloc — space-efficient but access careful"],
          ["Cabinet (enclosed)", "Steel enclosed, front access only", "12V batteries, office/small DC environments"],
          ["Li-ion standard rack (19\")", "Standard EIA 19-inch rack — Li-ion modules slide in", "LFP rack modules — clean, organized"],
        ]}
      />

      <Callout type="best-practice" title="Best Practice — Seismic Considerations for India">
        In some zones of India (Zone III, IV, V — Maharashtra coast, Northeast, Himalayan belt), seismic considerations are mandatory. Battery racks must be properly anchored to the floor and cells must be secured on the racks. Without seismic bracing, a battery rack can topple in an earthquake — creating a catastrophic acid spill, electrical short and fire risk. Specify the seismic zone with the structural engineer and design appropriate anchoring.
      </Callout>
    </>
  );
}
