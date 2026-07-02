"use client";

// ═══════════════════════════════════════════════════════════════════════════
// app/learn/non-it/electrical/battery-bank/sections/ElectricalFundamentals.tsx
//
// Part 3 — Electrical Fundamentals (3.0–3.11)
// Part 4 — Battery Life Calculator Inputs (4.0–4.10)
// ═══════════════════════════════════════════════════════════════════════════

import { S, Callout, ComparisonTable, SectionIntro } from "../shared";
import SeriesParallelBankDiagram from "../svg/SeriesParallelBankDiagram";
import { Figure } from "../shared";

export default function ElectricalFundamentals() {
  return (
    <>
      {/* ═══════════════════════════════════════════════════════════════
          PART 3 — ELECTRICAL FUNDAMENTALS
      ═══════════════════════════════════════════════════════════════ */}

      <h2 id="electrical-fundamentals" style={S.h2}>Electrical Fundamentals</h2>

      <SectionIntro
        quickAnswer="Battery sizing ke liye 10 concepts zaroor samajhne chahiye: Ah, Wh, C-rate, DoD, SoC, SoH, internal resistance, float voltage, Peukert's Law, aur ripple current. In mein se ek bhi miss karo toh sizing galat ho sakti hai."
        engineerTip="Sabse common sizing mistake: rated Ah use karna without C-rate correction. Agar battery rated at C10 = 100Ah hai, aur tum C3 rate pe discharge karo (which happens at high loads), actual available Ah sirf 70–80Ah hogi. Hamesha check karo ki OEM datasheet mein C-rate at your discharge rate kya diya hai."
        keyTakeaway="Ah bataati hai kitni current deliver kar sakti hai; Wh bataata hai energy kitni hai — Data Center sizing mein Ah more directly useful hai kyunki bus voltage fixed hoti hai."
      />

      <h3 id="ah-explained" style={S.h3}>Ah (Ampere-Hour) — What It Really Means</h3>

      <p style={S.p}>
        Ah = Amperes × Hours. Ek 100Ah battery 100 Amperes 1 hour tak, ya 50 Amperes 2 hours tak,
        ya 10 Amperes 10 hours tak deliver kar sakti hai — <em>ideally</em>. Reality mein Peukert
        effect ki wajah se zyada current draw karo toh less total Ah milti hai.
      </p>

      <p style={S.p}>
        Battery capacity usually <strong>C10 or C20 rate</strong> pe rated hoti hai:{" "}
        <em>C10 matlab complete discharge in 10 hours; C20 in 20 hours</em>. Data Center backup
        typical 10–15 minutes ka hota hai — yeh C0.17 to C0.25 rate hai. Is high rate pe available
        Ah, C10 rated Ah se significantly less hogi. Hamesha OEM ka high-rate discharge table check karo.
      </p>

      <ComparisonTable
        headers={["Discharge Rate", "Discharge Time", "Available Ah (example, 100Ah @ C10)", "Application"]}
        rows={[
          ["C20", "20 hours", "110–120 Ah (more than rated)", "Solar, telecom long backup"],
          ["C10", "10 hours", "100 Ah (rated value)", "Baseline reference"],
          ["C5", "5 hours", "85–90 Ah", "Moderate backup"],
          ["C1", "1 hour", "65–75 Ah", "Short UPS backup"],
          ["C0.5", "30 minutes", "55–65 Ah", "Typical Data Center backup"],
          ["C0.17", "10 minutes", "45–55 Ah", "Standard DC UPS bridge"],
        ]}
      />

      <h3 id="wh-explained" style={S.h3}>Wh (Watt-Hour) — Energy vs Capacity</h3>

      <p style={S.p}>
        Wh = Watt × Hour = (Voltage × Current) × Hour = Voltage × Ah.
      </p>

      <p style={S.p}>
        Formula: <strong>Energy (Wh) = Ah × Voltage</strong>
      </p>

      <p style={S.p}>
        Example: 100Ah battery bank at 192V DC = 100 × 192 = 19,200 Wh = 19.2 kWh energy stored.
        Yeh 500kW load ko 19,200 ÷ 500,000 = 0.0384 hours = 2.3 minutes sustain kar sakta hai
        (without losses, DoD correction, etc.).
      </p>

      <Callout type="important" title="Important — kWh vs Ah: Which to Use for Sizing?">
        Battery sizing mein <strong>Ah</strong> use karo, kWh nahi — kyunki DC bus voltage fixed
        hoti hai aur charger/inverter Ah handle karta hai directly. kWh useful hai energy cost
        calculations, TCO comparisons, aur grid-level BESS sizing ke liye. Dono ultimately same
        information hain, bas unit alag hai.
      </Callout>

      <h3 id="c-rate" style={S.h3}>C-Rate — Charge and Discharge Rate</h3>

      <p style={S.p}>
        C-rate = Current ÷ Rated Ah. C1 rate matlab battery apni full Ah capacity 1 hour mein
        discharge karega. C0.1 = 10 hours mein. C10 = 6 minutes mein (very fast, very harsh).
      </p>

      <p style={S.p}>
        <strong>Charge C-rate:</strong> VRLA batteries typical maximum charge rate 0.1C to 0.25C hoti
        hai — zyada fast charge karo toh overcharge risk. After a full discharge, VRLA typically 8–12
        hours mein fully recharge hoti hai at 0.1C rate. LFP faster charge accept karti hai (0.5C–1C
        common), isliye recharge time 2–4 hours possible hai.
      </p>

      <h3 id="depth-of-discharge" style={S.h3}>Depth of Discharge (DoD)</h3>

      <p style={S.p}>
        DoD = percentage of battery capacity that was discharged. 100% DoD = completely empty;
        50% DoD = half empty; 20% DoD = barely used.
      </p>

      <p style={S.p}>
        Higher DoD = more energy used per cycle, but fewer total cycles. Lower DoD = less energy
        per cycle, but far more cycles. Data Center sizing mein typically <strong>80% DoD for VRLA,
        90% DoD for LFP</strong> use karte hain as the maximum design limit.
      </p>

      <ComparisonTable
        headers={["DoD Used", "VRLA Cycles", "LFP Cycles", "Implication"]}
        rows={[
          ["20%", "1500–2000", "8000+", "Very conservative — rarely needed"],
          ["50%", "600–700", "4000–5000", "Moderate — extended life"],
          ["80%", "250–350", "2000–3000", "Standard for VRLA design limit"],
          ["90%", "150–200", "1500–2000", "Standard for LFP design limit"],
          ["100%", "100–150", "800–1000", "Never design to this — permanent damage risk"],
        ]}
      />

      <Callout type="best-practice" title="Best Practice — Design DoD vs Actual DoD">
        Design DoD (jo sizing formula mein use karo) alag hai actual DoD se. Design for 80% DoD
        matlab: size karo taaki battery 80% of rated capacity use kare to provide required runtime.
        Remaining 20% buffer hai for unexpected longer outages. Actual discharge events mein toh
        sirf 10–15 minutes ka load hota hai — battery almost never hits 80% DoD in practice.
      </Callout>

      <h3 id="state-of-charge" style={S.h3}>State of Charge (SoC)</h3>

      <p style={S.p}>
        SoC = battery kitna charged hai, 0–100% mein. SoC = 100% means fully charged; SoC = 0%
        means completely discharged. Lead acid mein SoC accurately measure karna mushkil hai —
        open circuit voltage method hai, lekin battery recently charged ya discharged ho toh voltage
        settle hone mein time lagta hai. BMS sophisticated algorithms use karta hai SoC accurately
        estimate karne ke liye (Coulomb counting + voltage cross-check).
      </p>

      <h3 id="state-of-health" style={S.h3}>State of Health (SoH)</h3>

      <p style={S.p}>
        SoH = battery ki actual capacity compared to original rated capacity. SoH = 100% means
        brand new; SoH = 80% means battery has lost 20% of original capacity — yeh IEEE 450/1188
        ke according <strong>end-of-life threshold</strong> hai for stationary batteries.
      </p>

      <p style={S.p}>
        SoH measure karne ke liye actual capacity discharge test karna padta hai (against rated Ah).
        Impedance testing SoH ka surrogate hai — accurate nahi lekin non-intrusive tracking ke liye
        useful.
      </p>

      <Callout type="important" title="Important — SoH = 80% Matlab Replace Karo">
        IEEE 450 aur IEEE 1188 dono kehte hain: agar measured capacity rated capacity ke 80% se kam
        ho toh battery end-of-life hai — replace karo. Yeh 80% threshold isliye hai kyunki is point
        ke baad capacity degradation exponential ho jaati hai. 79% today could mean 60% in 6 months.
      </Callout>

      <h3 id="internal-resistance" style={S.h3}>Internal Resistance & Impedance</h3>

      <p style={S.p}>
        Battery ke internal resistance se power loss hoti hai (P = I²R) aur terminal voltage drop
        hoti hai under load. Aging ke saath internal resistance badhti hai — yeh battery health ka
        key indicator hai.
      </p>

      <p style={S.p}>
        <strong>Impedance testing</strong> AC signal inject karke internal resistance measure karta
        hai — baseline se comparison karo. IEEE 1188 guideline: agar impedance {">"}2× baseline hai
        toh battery replace karo. Yeh non-intrusive test hai — battery float pe rehti hai during
        test.
      </p>

      <ComparisonTable
        headers={["Impedance Ratio (vs Baseline)", "Status", "Action"]}
        rows={[
          ["< 1.25×", "GREEN — healthy", "Continue normal maintenance schedule"],
          ["1.25× – 1.5×", "MONITOR — slight degradation", "Increase monitoring frequency, plan replacement"],
          ["1.5× – 2.0×", "AMBER — significant degradation", "Schedule replacement within 6–12 months"],
          ["> 2.0×", "RED — end of life", "Replace immediately — IEEE 1188 threshold"],
        ]}
      />

      <h3 id="float-vs-equalisation" style={S.h3}>Float Voltage vs Equalisation Voltage vs Boost Voltage</h3>

      <p style={S.p}>
        Teen different charge voltages hain — har ek different purpose ke liye:
      </p>

      <ul style={S.ul}>
        <li>
          <strong>Float Voltage:</strong> Normal operating voltage jab battery fully charged aur
          maintenance charge pe hai. VRLA AGM: 2.25–2.27V per cell. LFP: 3.4–3.5V per cell.
          Hamesha on rehta hai.
        </li>
        <li>
          <strong>Boost/Equalisation Voltage:</strong> Higher voltage jo periodically apply ki jaati
          hai to balance cells aur remove early sulphation. VRLA AGM: 2.33–2.40V per cell.
          Scheduled, not continuous.
        </li>
        <li>
          <strong>Temperature Compensation:</strong> Float voltage temperature ke saath adjust honi
          chahiye. Typical coefficient: −3 to −4 mV per cell per °C above 25°C. Hot ambient mein
          float voltage reduce karo; cold mein increase karo. Galat compensation = overcharge ya
          undercharge = premature failure.
        </li>
      </ul>

      <Callout type="danger" title="Danger — Overcharge is the #1 Killer of VRLA">
        Float voltage agar OEM spec se {">"}0.05V per cell high set karo toh: electrolyte gassing
        badhti hai → AGM mat dries out → capacity permanently reduced → heat increases → positive
        plate corrosion accelerates → premature death. Charger mein temperature compensation on
        karo aur float voltage OEM datasheet exactly verify karo before commissioning.
      </Callout>

      <h3 id="peukerts-law" style={S.h3}>Peukert&apos;s Law — Why Rated Ah Is Not Always Available</h3>

      <p style={S.p}>
        Peukert&apos;s Law: <strong>Ah_actual = C × (I_rated ÷ I_actual)^(n−1)</strong>
      </p>

      <p style={S.p}>
        Where: C = rated capacity, I_rated = rated current (at C10 typically), I_actual = actual
        discharge current, n = Peukert exponent (1.1–1.3 for VRLA, ~1.05 for LFP).
      </p>

      <p style={S.p}>
        Simplified: <strong>faster discharge karo, less Ah available hai</strong>. Yeh especially
        important hai Data Center sizing mein jahan 10-minute backup at high current means you are
        at a high C-rate. Always use OEM&apos;s high-rate discharge table instead of rated Ah.
      </p>

      <ComparisonTable
        headers={["Scenario", "Load", "Bus Voltage", "Discharge Current", "C-Rate", "Available Ah (100Ah battery)"]}
        rows={[
          ["C10 (reference)", "19.2 kW", "192V", "100A", "C10", "100 Ah"],
          ["30-min backup", "38.4 kW", "192V", "200A", "C5", "88 Ah (−12%)"],
          ["10-min backup", "115.2 kW", "192V", "600A", "C1.67", "72 Ah (−28%)"],
          ["5-min backup", "230.4 kW", "192V", "1200A", "C0.83", "62 Ah (−38%)"],
        ]}
      />

      <h3 id="ripple-current" style={S.h3}>Ripple Current — The Hidden Battery Killer</h3>

      <p style={S.p}>
        Charger ya UPS rectifier se aane wali DC power actually perfectly smooth nahi hoti — ismein
        AC component hoti hai jise <strong>ripple current</strong> kehte hain. Yeh ripple battery
        ke through flow karta hai aur I²R heating cause karta hai internally.
      </p>

      <p style={S.p}>
        IEEE 1187 recommends ripple current &lt; 5% of rated Ah (in amperes) for VRLA batteries.
        Higher ripple = higher internal heating = accelerated aging = premature failure. Modern
        IGBT-based chargers much lower ripple produce karte hain compared to older SCR-based
        chargers — yeh ek reason hai ki modern UPS ki batteries zyada chalni chahiye.
      </p>

      <Callout type="important" title="Important — Verify Ripple at Installation">
        Commissioning ke time charger output pe clamp meter se ripple current measure karo. Agar
        {">"}5% of rated Ah mil raha hai, charger filter check karo ya OEM se consult karo. Yeh
        measurement documentation mein record karo aur annual maintenance mein repeat karo.
      </Callout>

      {/* ═══════════════════════════════════════════════════════════════
          PART 4 — BATTERY LIFE CALCULATOR INPUTS
      ═══════════════════════════════════════════════════════════════ */}

      <h2 id="battery-life-inputs" style={S.h2}>Battery Life Calculator Inputs</h2>

      <SectionIntro
        quickAnswer="Battery life sirf OEM ke datasheet mein likhe years nahi hoti — actual life multiple factors ka product hai. Temperature, DoD, float voltage accuracy, ripple current aur cycling sab mila ke actual life decide karte hain."
        engineerTip="India mein battery life ka sabse common underestimate yeh hai ki OEM ka rated life 25°C assume karta hai. Data Center battery rooms often 30–35°C average run karte hain (especially mein AC failure scenarios). 35°C pe VRLA life half ho jaati hai. Calculate karo actual expected life at your operating temperature aur replacement budget accordingly plan karo."
        keyTakeaway="Adjusted Life = Rated Life × Temperature Factor × DoD Factor × Float Factor × Ripple Factor — har ek factor independently multiply hota hai."
      />

      <p style={S.p}>
        Battery life estimation ek multi-variable problem hai. OEM ka datasheet rated life 25°C,
        standard float voltage, aur low C-rate cycling assume karta hai. Real-world conditions
        har jagah different hote hain. Is section mein har input variable explain karte hain.
      </p>

      <h3 style={S.h3}>Life Estimation Formula</h3>

      <p style={S.p}>
        <strong>Adjusted Life (years) = Rated Life × T_factor × DoD_factor × Float_factor × Ripple_factor</strong>
      </p>

      <h3 style={S.h3}>Input 1 — Ambient Temperature</h3>

      <ComparisonTable
        headers={["Ambient Temperature", "VRLA Life Multiplier", "LFP Life Multiplier", "Notes"]}
        rows={[
          ["15°C", "1.5×", "1.1×", "Cooler than reference — longer life"],
          ["20°C", "1.2×", "1.05×", "Slightly above ideal"],
          ["25°C", "1.0×", "1.0×", "OEM rated life reference point"],
          ["30°C", "0.67×", "0.9×", "VRLA life reduces significantly"],
          ["35°C", "0.50×", "0.75×", "VRLA life halved — common Indian DC room temp"],
          ["40°C", "0.33×", "0.60×", "VRLA at severe risk — 1/3 of rated life"],
          ["45°C", "0.20×", "0.40×", "Indian summer worst case — critical situation"],
        ]}
      />

      <Callout type="danger" title="Danger — Indian Summer Impact on VRLA Battery Life">
        India mein many Data Centers, especially Tier I/II, battery room cooling ko critical nahi
        maante. Agar ambient 40°C regular hota hai, VRLA life 5-year rated se sirf ~1.5–2 years
        actual reh jaati hai. Yeh surprise replacement cost aur runtime risk dono ka sabab banta
        hai. Battery room HVAC N+1 redundancy mandatory hai, not optional.
      </Callout>

      <h3 style={S.h3}>Input 2 — Depth of Discharge (DoD Factor)</h3>

      <ComparisonTable
        headers={["Design DoD", "VRLA DoD Factor", "LFP DoD Factor"]}
        rows={[
          ["20%", "2.5×", "3.0×"],
          ["40%", "1.8×", "2.0×"],
          ["60%", "1.2×", "1.4×"],
          ["80%", "1.0×", "1.0×"],
          ["90%", "0.6×", "0.9×"],
          ["100%", "0.3×", "0.5×"],
        ]}
      />

      <h3 style={S.h3}>Input 3 — Charge Cycles</h3>

      <p style={S.p}>
        Data Center batteries mein discharge events rare hote hain — real grid failures. Typical
        Data Center: 1–4 significant discharge events per year. Cycle life rarely the limiting
        factor for VRLA; temperature and float accuracy are more critical. For sites with frequent
        power cuts (DG-dependent sites mein common in India), cycle count matters more.
      </p>

      <h3 style={S.h3}>Input 4 — Float Voltage Accuracy</h3>

      <ComparisonTable
        headers={["Float Voltage Deviation", "Life Impact", "Failure Mode"]}
        rows={[
          ["+0.1V/cell above OEM spec", "Life −40% to −60%", "Dry-out (VRLA), thermal runaway risk"],
          ["+0.05V/cell above spec", "Life −15% to −25%", "Gradual dry-out, accelerated corrosion"],
          ["Exactly at OEM spec", "Rated life", "Normal operation"],
          ["−0.05V/cell below spec", "Life −10% to −20%", "Chronic undercharge, sulphation"],
          ["−0.1V/cell below spec", "Life −30% to −50%", "Progressive sulphation — irreversible"],
        ]}
      />

      <h3 style={S.h3}>Input 5 — Ripple Current</h3>

      <ComparisonTable
        headers={["Ripple Current (% of Ah)", "Life Impact"]}
        rows={[
          ["< 2%", "No measurable impact"],
          ["2–5%", "Slight heating — minor life reduction"],
          ["5–10%", "Life −10% to −20%"],
          ["> 10%", "Significant heating — life −30%+"],
        ]}
      />

      <h3 style={S.h3}>Input 6 — Age Factor</h3>

      <p style={S.p}>
        IEEE 485 recommends sizing with an ageing factor. If you want the battery bank to still
        provide required runtime at end of design life, size for 125% of calculated Ah (i.e., divide
        by 0.80). This accounts for 20% capacity loss at end of life.
      </p>

      <h3 style={S.h3}>Battery Life Calculator Input Table</h3>

      <ComparisonTable
        headers={["Input Parameter", "Your Value", "Unit", "Where to Find"]}
        rows={[
          ["Rated battery life (OEM)", "—", "Years", "OEM datasheet — usually at 25°C"],
          ["Ambient temperature", "—", "°C", "Battery room HVAC design / actual measurement"],
          ["Temperature life factor", "—", "Multiplier", "Table above"],
          ["Design Depth of Discharge", "—", "%", "Your sizing calculation"],
          ["DoD life factor", "—", "Multiplier", "Table above"],
          ["Float voltage deviation", "—", "±V/cell", "Charger setting vs OEM spec"],
          ["Float voltage life factor", "—", "Multiplier", "Table above"],
          ["Ripple current", "—", "% of Ah", "Measured at commissioning"],
          ["Ripple life factor", "—", "Multiplier", "Table above"],
          ["Adjusted Life", "= All factors multiplied", "Years", "Your expected real battery life"],
        ]}
      />

      <Figure caption="Fig 3 — Series-Parallel Battery Bank: 3 strings × 4 cells = 48V / 300Ah bank. Voltage from series, Ah from parallel strings.">
        <SeriesParallelBankDiagram />
      </Figure>

      <h3 style={S.h3}>Worked Example — Indian Summer Conditions (45°C Ambient)</h3>

      <p style={S.p}>
        VRLA AGM battery, rated 5-year life at 25°C. Battery room operates at 40°C average (AC
        not perfectly maintained). Float voltage +0.03V/cell over OEM spec (common misconfiguration).
        Ripple 3%. Design DoD 80%.
      </p>

      <ComparisonTable
        headers={["Factor", "Value", "Multiplier"]}
        rows={[
          ["Rated life", "5 years", "—"],
          ["Temperature @ 40°C", "40°C", "0.33×"],
          ["DoD @ 80%", "Design limit", "1.0×"],
          ["Float +0.03V/cell", "Slight overcharge", "0.88×"],
          ["Ripple @ 3%", "Minor", "0.95×"],
          ["Adjusted Life", "5 × 0.33 × 1.0 × 0.88 × 0.95", "≈ 1.4 years"],
        ]}
      />

      <p style={S.p}>
        Result: battery rated at 5 years actually only lasts ~1.4 years in this scenario. This
        is why Indian Data Centers often see VRLA replacement every 2–3 years instead of 4–5.
        Fix: bring temperature to 25°C, set correct float voltage, measure and fix ripple.
      </p>

      <h3 style={S.h3}>Worked Example — Ideal Conditions (25°C, 40% DoD)</h3>

      <ComparisonTable
        headers={["Factor", "Value", "Multiplier"]}
        rows={[
          ["Rated life", "5 years", "—"],
          ["Temperature @ 25°C", "Reference", "1.0×"],
          ["DoD @ 40%", "Conservative", "1.8×"],
          ["Float exactly at OEM spec", "Perfect", "1.0×"],
          ["Ripple < 2%", "Negligible", "1.0×"],
          ["Adjusted Life", "5 × 1.0 × 1.8 × 1.0 × 1.0", "= 9 years"],
        ]}
      />

      <p style={S.p}>
        Same battery, ideal conditions: 9 years. Difference between 1.4 years and 9 years is
        purely operational discipline — temperature control aur correct voltage settings. Yeh
        calculation HVAC investment justify karne ka strongest argument hai.
      </p>
    </>
  );
}
