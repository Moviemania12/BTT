"use client";

// ═══════════════════════════════════════════════════════════════════════════
// app/learn/non-it/electrical/battery-bank/sections/DcBusIntegration.tsx
//
// Part 9 — DC Bus & System Integration (Blueprint v3.0 Part 9)
// How battery bank connects to UPS, cable sizing, earthing, protection.
// ═══════════════════════════════════════════════════════════════════════════

import { S, Callout, ComparisonTable, SectionIntro } from "../shared";
import TopicLink from "@/components/TopicLink";

export default function DcBusIntegration() {
  return (
    <>
      {/* ═══════════════════════════════════════════════════════════════
          PART 9 — DC BUS & SYSTEM INTEGRATION
      ═══════════════════════════════════════════════════════════════ */}

      <h2 id="dc-bus-integration" style={S.h2}>DC Bus &amp; System Integration</h2>

      <SectionIntro
        quickAnswer="Battery bank akele kaam nahi karti — yeh UPS ke internal DC bus se connected hoti hai. DC bus woh backbone hai jis pe rectifier (grid power in), inverter (load power out), aur battery bank (storage) sab ek saath connected hote hain."
        engineerTip="DC bus voltage precisely maintained honi chahiye. Agar bus voltage kisi bhi wajah se battery float voltage se significantly alag ho, ya toh battery over-discharge hogi ya charger overheat karega. UPS commissioning ke time DC bus voltage OEM spec se match karo — ek voltmeter aur UPS display dono se verify karo."
        keyTakeaway="DC bus = UPS ka internal highway jis pe rectifier, inverter aur battery bank sab connected hain — iska voltage precisely controlled hona zaroori hai."
      />

      <h3 style={S.h3}>DC Bus — What It Is</h3>

      <p style={S.p}>
        UPS ke andar teen main functional blocks hain:
      </p>

      <ul style={S.ul}>
        <li>
          <strong>Rectifier:</strong> AC input (grid ya DG) ko DC mein convert karta hai →
          DC bus ko power karta hai.
        </li>
        <li>
          <strong>Inverter:</strong> DC bus se power leta hai → clean regulated AC output
          banata hai → load ko deta hai.
        </li>
        <li>
          <strong>Battery bank:</strong> DC bus se connected hai — jab rectifier available hai
          toh float charge pe rehti hai; jab rectifier fail hoti hai toh instantly DC bus ko
          power karti hai.
        </li>
      </ul>

      <p style={S.p}>
        Is architecture ki beauty yeh hai ki load ke liye <strong>zero transfer time</strong>
        hoti hai — inverter hamesha DC bus se power le raha hai, chahe woh rectifier se aa
        raha ho ya battery se. Battery aur rectifier seamlessly switch hota hai on DC bus
        — load ko pata bhi nahi chalta.
      </p>

      <h3 style={S.h3}>DC Bus Voltage Standards</h3>

      <ComparisonTable
        headers={["Bus Voltage", "Common UPS Range", "12V Cells in Series", "2V Cells in Series", "Typical India Use"]}
        rows={[
          ["48V DC", "< 10 kVA, telecom, rack PDU", "4 cells", "24 cells", "Telecom towers, small UPS"],
          ["96V DC", "10–100 kVA", "8 cells", "48 cells", "Small to medium office UPS"],
          ["192V DC", "100 kVA – 500 kVA", "16 cells", "96 cells", "Most common in Indian Data Centers"],
          ["240V DC", "200 kVA – 1 MVA", "20 cells", "120 cells", "Large UPS systems"],
          ["384V DC", "500 kVA – 2 MVA", "32 cells", "192 cells", "Large modular UPS, some Li-ion"],
          ["480V DC", "1 MVA+", "40 cells", "240 cells", "Very large UPS"],
          ["800V+ DC", "Li-ion modular UPS", "Li-ion specific", "Li-ion specific", "Hyperscale, emerging"],
        ]}
      />

      <Callout type="important" title="Important — Bus Voltage UPS OEM Ke Saath Match Karna Mandatory">
        Battery bank ka series string voltage exactly UPS OEM specification ke anusaar hona
        chahiye. ±2V deviation bhi unacceptable hai for production systems. Deviation cause
        karta hai: charger overcurrent, rectifier regulation issues, ya battery being driven
        below minimum cut-off voltage during discharge. UPS commissioning report mein actual
        measured DC bus voltage document karo.
      </Callout>

      <h3 style={S.h3}>Battery Room vs Battery Cabinet vs Battery Rack</h3>

      <ComparisonTable
        headers={["Format", "Description", "Typical Application", "Pros", "Cons"]}
        rows={[
          ["Battery Cabinet (enclosed)", "Steel cabinet, batteries inside, front access", "Small UPS (< 100 kVA), confined spaces", "Clean, contained, no dedicated room needed", "Limited capacity, limited ventilation options"],
          ["Battery Rack (open)", "Open steel frame, batteries on shelves, 2-tier or 3-tier", "Medium UPS (100 kVA – 1 MVA), dedicated battery rooms", "Good airflow, easy access, scalable", "Requires dedicated room with ventilation"],
          ["Battery Room (large installation)", "Dedicated room, multiple racks or platforms", "Large UPS (1 MVA+), Tier III/IV Data Centers", "Maximum capacity, full engineering control", "Civil/structural investment, dedicated HVAC"],
          ["Containerized (outdoor)", "ISO container with batteries + cooling", "Remote sites, edge DCs, quick deployment", "Turnkey, pre-tested, weather-proof", "High cost, limited customization"],
        ]}
      />

      <h3 style={S.h3}>DC Battery Cable Sizing</h3>

      <p style={S.p}>
        DC cables battery bank aur UPS ke beech current carry karte hain. Incorrect sizing
        causes excessive voltage drop (reducing available runtime) aur fire risk (from excessive
        heating).
      </p>

      <p style={S.p}>
        DC voltage drop formula:
        <br />
        <strong>V_drop = 2 × ρ × L × I ÷ A</strong>
      </p>

      <p style={S.p}>
        Factor of 2 isliye kyunki current both positive aur negative conductors se flow karta
        hai (total cable length = 2× one-way length).
      </p>

      <ComparisonTable
        headers={["Parameter", "Symbol", "Value", "Note"]}
        rows={[
          ["Resistivity (copper)", "ρ", "0.0175 Ω·mm²/m", "At 20°C; increases with temperature"],
          ["Cable length (one-way)", "L", "Project-specific, meters", "Measure actual run, not straight line"],
          ["Discharge current", "I", "Calculated from load and voltage", "Use worst-case (highest current)"],
          ["Cable cross-section", "A", "mm²", "Standard sizes: 16, 25, 35, 50, 70, 95, 120, 150, 185, 240mm²"],
          ["Allowable voltage drop", "V_drop", "≤ 2% of bus voltage", "For 192V: ≤ 3.84V allowable"],
        ]}
      />

      <Callout type="best-practice" title="Best Practice — DC Cable Length Minimize Karo">
        Battery room UPS se jitna closer ho utna achha — har extra meter of cable voltage drop
        aur energy loss add karta hai. Ideal: battery room adjacent to UPS room, cable runs
        less than 10m. 30m+ runs: cable sizing significantly larger karna padta hai. Project
        planning mein battery room location decide karte waqt yeh factor consider karo.
      </Callout>

      <h3 style={S.h3}>DC Breakers vs DC Fuses</h3>

      <ComparisonTable
        headers={["Feature", "DC Fuse", "DC MCCB/Breaker"]}
        rows={[
          ["Interrupting medium", "Fuse element melts, arc in sand", "Mechanical contacts + arc extinguisher"],
          ["DC interrupting capacity", "Very high (50kA+)", "Lower than AC equivalent — verify DC rating"],
          ["Resettable?", "No — replace after fault", "Yes — reset after fault cleared"],
          ["Cost", "Low (fuse) but replacement cost", "Higher upfront, reusable"],
          ["Speed of operation", "Faster (microseconds to milliseconds)", "Slower (milliseconds to cycles)"],
          ["Battery bank use", "Per-string fusing (strongly recommended)", "Main battery disconnect, room MCCB"],
          ["Critical requirement", "Must be DC-rated for bus voltage", "Must have DC breaking capacity ≥ fault current"],
        ]}
      />

      <Callout type="danger" title="Danger — DC Rating vs AC Rating: Different Specifications">
        Ek 240VAC rated fuse or breaker 192V DC system mein use karna <strong>not acceptable</strong>.
        AC rating ka DC equivalent alag hota hai — typically DC breaking capacity much lower hai.
        Hamesha component ka specific <em>DC voltage rating</em> aur <em>DC interrupting
        capacity</em> verify karo. Manufacturer datasheets mein AC aur DC ratings alag-alag
        listed hoti hain.
      </Callout>

      <h3 style={S.h3}>Battery Disconnect Switch</h3>

      <p style={S.p}>
        Battery room mein do types ke isolation switches hone chahiye:
      </p>

      <ul style={S.ul}>
        <li>
          <strong>Manual Battery Disconnect:</strong> Lockable DC isolator switch jo battery bank
          ko UPS se completely disconnect karta hai maintenance ke liye. LOTO ke saath use hota
          hai. Must be rated for full DC bus voltage aur maximum battery current.
        </li>
        <li>
          <strong>Emergency Battery Disconnect (EBD):</strong> Fire suppression system se
          interlock hota hai — agar battery room fire alarm trigger hoti hai, EBD automatically
          battery bank disconnect karta hai to prevent electrical feed to a battery fire.
          Required per NFPA 855 for Li-ion, recommended for all types.
        </li>
      </ul>

      <h3 style={S.h3}>DC Earthing &amp; Touch Voltage Safety</h3>

      <p style={S.p}>
        DC battery system earthing AC earthing se alag hoti hai — aur often misunderstood.
      </p>

      <ComparisonTable
        headers={["DC Earthing Approach", "Description", "When Used", "Risk"]}
        rows={[
          ["Floating (ungrounded) DC", "Neither + nor − connected to earth", "Telecom DC systems (ITU-T standard)", "First fault doesn't trip — but must be monitored"],
          ["Negative earthed DC", "Negative rail connected to earth", "Some UPS systems, automotive", "Touch voltage on + terminal = full bus voltage from earth"],
          ["Mid-point earthed", "Midpoint of battery string earthed", "Railway, specialized systems", "Complex, ±96V from earth in a 192V system"],
          ["Solid earth (both rails)", "Both connected to earth through impedance", "Specialized designs", "High touch voltage possible — NOT recommended for batteries"],
        ]}
      />

      <p style={S.p}>
        Most Data Center UPS battery systems operate with a <strong>floating DC bus</strong>
        — neither positive nor negative rail directly earthed. This is standard practice.
        UPS chassis and battery racks are earthed separately (protective earth, PE).
      </p>

      <Callout type="important" title="Important — DC Earth Fault Monitoring">
        Floating DC bus mein first earth fault koi immediate trip nahi karta — yeh floating
        system ka advantage hai (high availability). Lekin second earth fault = short circuit.
        Isliye floating DC system mein <strong>Earth Fault Monitor (EFM) mandatory hai</strong>.
        EFM continuously monitor karta hai insulation resistance — agar koi earth fault develop
        ho toh alarm raise karta hai before second fault can cause damage.
      </Callout>

      <p style={S.p}>
        Earthing aur safety ke detailed coverage ke liye <TopicLink slug="earthing" variant="inline" />{" "}
        article dekho.
      </p>
    </>
  );
}
