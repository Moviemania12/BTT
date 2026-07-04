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
        quickAnswer="Battery room sirf ek room nahi hai jisme batteries rakh do — yeh ek engineered space hai specific HVAC, ventilation, safety, access, aur fire protection requirements ke saath. Galat battery room design = shortened battery life, safety hazards, aur compliance issues."
        engineerTip="Battery room design mein sabse often missed item: H₂ sensor aur exhaust fan ka interlock. Agar H₂ alarm trigger ho toh HVAC exhaust fan automatically maximum speed pe jaana chahiye aur fresh air inlet open hona chahiye — manual response pe depend mat karo. Yeh interlock commissioning checklist mein explicitly verify karo."
        keyTakeaway="Battery room ka design directly battery life aur safety ko control karta hai — yeh ek passive infrastructure element nahi, yeh ek active life-safety system hai."
      />

      <h3 style={S.h3}>Room Location — Where in the Building</h3>

      <p style={S.p}>
        Battery room location select karna UPS room ke relative position, structural loading,
        aur fire safety dono considerations se governed hota hai.
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
        Battery room aur UPS ke beech DC cable run jitna lamba hoga, voltage drop utna zyada.
        Target: 10m se kam. 30m se zyada cable run mein cable cross-section significantly
        larger karna padta hai (expensive copper) aur losses increase hoti hain. Location
        decision pe cable run length ek primary constraint hai.
      </Callout>

      <h3 style={S.h3}>Temperature Control — HVAC Requirements</h3>

      <p style={S.p}>
        Target temperature: <strong>20–25°C year-round</strong>. Isse zyada = reduced battery life.
        Isse kam (below 10°C) = reduced available capacity. Both are harmful.
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
        Battery room ventilation ke do requirements hain: H₂ dilution (safety) aur heat removal
        (battery life). Yeh dono sometimes same HVAC system se handle hote hain, sometimes
        alag systems chahiye.
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
        H₂ exhaust duct kisi bhi common area, return air plenum, ya adjacent room mein
        discharge mat karo. H₂ lighter than air hai — ceiling plenum ya stairwell mein
        accumulate ho sakta hai. Direct outside discharge mandatory hai, above roof level
        preferred. Fire Authority requires this verification before NOC issuance.
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
        Agar Li-ion battery room India mein design kar rahe ho, NFPA 855 compliance increasingly
        required ho rahi hai — especially for international operators, insurance underwriters,
        aur export-oriented clients. Local fire authority se pre-approval lo before finalizing
        Li-ion room design. Requirements vary by Authority Having Jurisdiction (AHJ).
      </Callout>

      <h3 style={S.h3}>Earthing System for Battery Room</h3>

      <p style={S.p}>
        Battery room mein do earthing systems maintain hote hain:
      </p>

      <ul style={S.ul}>
        <li>
          <strong>Protective Earth (PE):</strong> Battery racks, cabinets, metalwork sab
          protective earth se connected hote hain — IS 3043 ke according. Yeh shock protection
          ke liye hai.
        </li>
        <li>
          <strong>DC Functional Earth (floating monitor):</strong> Floating DC bus ke saath Earth
          Fault Monitor (EFM) connected rehta hai — lekin DC bus itself earth se directly
          connected nahi hota. EFM insulation resistance monitor karta hai.
        </li>
      </ul>

      <p style={S.p}>
        Earthing ke detailed coverage ke liye <TopicLink slug="earthing" variant="inline" /> article
        dekho.
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
        Battery rack structural integrity critical hai — heavy VRLA cells par aana ek catastrophic
        failure create karta hai (battery acid spill + electrical fault + structural damage).
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
        India ke kuch zones (Zone III, IV, V — Maharashtra coast, Northeast, Himalayan belt)
        mein seismic considerations mandatory hain. Battery racks ko floor se properly anchored
        hona chahiye aur cells racks pe secured hone chahiye. Seismic bracing ke bina, earthquake
        pe battery rack topple ho sakta hai — catastrophic acid spill, electrical short, aur
        fire risk create karta hai. Structural engineer se seismic zone specify karo aur
        appropriate anchoring design karo.
      </Callout>
    </>
  );
}
