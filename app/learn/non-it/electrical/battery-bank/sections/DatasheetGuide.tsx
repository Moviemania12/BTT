"use client";

// ═══════════════════════════════════════════════════════════════════════════
// app/learn/non-it/electrical/battery-bank/sections/DatasheetGuide.tsx
//
// Part 5 — OEM Datasheet Reading Guide (Blueprint v3.0 Part 5)
// 14 parameters every engineer must read before selecting a battery.
// ═══════════════════════════════════════════════════════════════════════════

import { S, Callout, ComparisonTable, SectionIntro } from "../shared";

export default function DatasheetGuide() {
  return (
    <>
      {/* ═══════════════════════════════════════════════════════════════
          PART 5 — OEM DATASHEET READING GUIDE
      ═══════════════════════════════════════════════════════════════ */}

      <h2 id="datasheet-guide" style={S.h2}>OEM Datasheet Reading Guide</h2>

      <SectionIntro
        quickAnswer="Battery datasheet sirf ek number sheet nahi hai — yeh ek engineering contract hai OEM aur engineer ke beech. Har parameter ek specific condition ke liye valid hai. Woh condition samajhe bina number use karna sizing galat kar dega."
        engineerTip="Datasheet mein sabse pehle 'test conditions' column dekho. Agar C10 rate pe 100Ah likha hai lekin tumhara actual discharge C0.5 rate pe hoga, tumhe OEM ka high-rate discharge table use karna hoga — rated Ah nahi. Yeh difference 30-40% ho sakta hai."
        keyTakeaway="Ek galat datasheet reading = undersized battery bank = real outage mein servers down."
      />

      <p style={S.p}>
        Exide, Amara Raja, EnerSys, Narada, Huawei — har OEM ka datasheet format thoda alag hota
        hai. Lekin 14 core parameters hain jo har battery ke datasheet mein milenge.
      </p>

      <p style={S.p}>
        In 14 parameters ko samajhna = sahi battery selection karna. Miss karo kisi ek ko = design
        mein gap.
      </p>

      {/* ─── Parameter 1: Ah Rating ──────────────────────────────────── */}
      <h3 style={S.h3}>1. Ah Rating — Ampere-Hour Capacity</h3>

      <p style={S.p}>
        Yeh sabse basic number hai lekin sabse zyada misread hota hai. &quot;100Ah&quot; ka matlab hai
        battery 100Ah capacity store karne ki rated hai — <strong>ek specific C-rate aur temperature
        pe</strong>.
      </p>

      <ComparisonTable
        headers={["Datasheet Notation", "Meaning", "Actual Runtime"]}
        rows={[
          ["C10 = 100Ah", "100A for 10 hours", "10 hours at 10A discharge"],
          ["C20 = 120Ah", "120A for 20 hours (more Ah at slower rate)", "20 hours at 6A discharge"],
          ["C3 = 80Ah", "80Ah available at 3-hour discharge rate", "3 hours at ~26A discharge"],
          ["C0.5 = 60Ah", "Only 60Ah at 2× rated current (30-min backup)", "30 min at ~120A discharge"],
        ]}
      />

      <Callout type="danger" title="Danger — Never Use C20 Ah for 10-Min UPS Sizing">
        Agar datasheet C20 = 150Ah dikhata hai aur tum 10-minute backup size kar rahe ho, C20 Ah
        use mat karo. 10-minute discharge ≈ C0.17 rate hai — actual available Ah ~85-95Ah hogi.
        OEM ke high-rate discharge curve ya table se actual Ah nikalo. Yeh fark 30-40% ho sakta
        hai — directly translate hota hai runtime shortfall mein real outage ke time.
      </Callout>

      {/* ─── Parameter 2: C10/C20 Rating ─────────────────────────────── */}
      <h3 style={S.h3}>2. C10 / C20 / C8 Rating — Discharge Rate Reference</h3>

      <p style={S.p}>
        Cn notation ka &apos;n&apos; = hours mein discharge time. C10 = 10 hours mein full discharge.
        C20 = 20 hours mein. Yeh sirf rating reference point hai — actual application
        ka C-rate alag ho sakta hai.
      </p>

      <p style={S.p}>
        Data Center UPS applications typically C0.17 to C0.5 range mein hote hain (10 to 30
        minute backup). Most datasheets C10 ya C20 reference use karte hain. Engineer ka kaam
        hai interpolation ya OEM table se actual available Ah find karna.
      </p>

      <Callout type="best-practice" title="Best Practice — Hamesha OEM Ki High-Rate Discharge Table Maango">
        Procurement ke time vendor se explicitly maango: &quot;Please provide high-rate discharge table
        at C0.5, C0.25, C0.17 rates.&quot; Agar vendor yeh nahi de sakta, battery ka design life
        aur actual performance uncertain hai. Top-tier vendors (EnerSys, Exide, Amara Raja, Narada)
        yeh data provide karte hain.
      </Callout>

      {/* ─── Parameter 3: Float Voltage ───────────────────────────────── */}
      <h3 style={S.h3}>3. Float Voltage — Normal Operating Voltage</h3>

      <p style={S.p}>
        Float voltage woh voltage hai jis pe battery fully charged hoti hai aur UPS charger
        continuously maintain karta hai. Yeh battery ka &quot;resting, ready state&quot; hai.
      </p>

      <ComparisonTable
        headers={["Battery Type", "Float Voltage per Cell", "Notes"]}
        rows={[
          ["VRLA AGM", "2.25–2.27V/cell", "Most common — Exide, Amara Raja, EnerSys"],
          ["VRLA Gel", "2.23–2.25V/cell", "Slightly lower — mixing AGM/Gel charger setting is dangerous"],
          ["VLA (Flooded)", "2.23–2.25V/cell", "Depends on electrolyte specific gravity"],
          ["LFP (Lithium Iron Phosphate)", "3.40–3.45V/cell", "Completely different — dedicated BMS controls"],
          ["NMC Lithium", "4.15–4.20V/cell", "High voltage — strict BMS required"],
        ]}
      />

      <Callout type="danger" title="Danger — Float Voltage Galat Set Karna = Guaranteed Premature Failure">
        VRLA AGM battery ke liye charger 2.35V/cell set karo — battery 6-12 months mein dry-out se
        fail ho jaayegi. 2.20V/cell set karo — chronic undercharge se sulphation aayegi. OEM
        datasheet ka exact float voltage use karo. Ek bar commission ke baad har 6 months mein
        actual charger output voltage verify karo — charger components drift karte hain.
      </Callout>

      {/* ─── Parameter 4: Boost/Equalisation Voltage ──────────────────── */}
      <h3 style={S.h3}>4. Boost / Equalisation Voltage — When and Why</h3>

      <p style={S.p}>
        Float voltage se zyada hota hai — typically 2.30–2.40V/cell for VRLA AGM. Yeh periodic
        apply kiya jaata hai to balance cells, remove early sulphation, aur recover from
        deep discharge.
      </p>

      <ComparisonTable
        headers={["Voltage Type", "VRLA AGM", "Purpose", "Frequency"]}
        rows={[
          ["Float (continuous)", "2.25–2.27V/cell", "Maintain full charge, compensate self-discharge", "Always on"],
          ["Boost/Equalisation", "2.33–2.40V/cell", "Balance cells, remove sulphation", "Monthly or after deep discharge"],
          ["Absorption (after discharge)", "2.40–2.45V/cell (for limited time)", "Fast recharge after discharge", "Per discharge event, time-limited"],
        ]}
      />

      <Callout type="warning" title="Warning — Equalisation Frequency: VRLA vs VLA Different Hai">
        VLA (flooded) batteries regular equalisation benefit karte hain. VRLA AGM mein zyada
        frequent equalisation dry-out risk badhata hai — yeh sealed hai aur gas escape nahi kar
        sakta easily. VRLA ke liye OEM recommendation: monthly ya after deep discharge only.
        Never equalize a VRLA battery without OEM-specified voltage limits.
      </Callout>

      {/* ─── Parameter 5: Design Life vs Cycle Life ───────────────────── */}
      <h3 style={S.h3}>5. Design Life vs Cycle Life — Do Different Numbers</h3>

      <p style={S.p}>
        Yeh two completely different specifications hain jo often confuse hote hain.
      </p>

      <ComparisonTable
        headers={["Specification", "Definition", "Limiting Condition", "Typical VRLA", "Typical LFP"]}
        rows={[
          ["Design Life (Float Life)", "Continuous float service life at reference temp", "Temperature (halves every 10°C above 25°C)", "3–5 years at 25°C", "10–15 years at 25°C"],
          ["Cycle Life", "Number of complete charge-discharge cycles before 80% capacity", "Depth of Discharge per cycle", "300–500 cycles at 80% DoD", "3000–5000 cycles at 80% DoD"],
        ]}
      />

      <p style={S.p}>
        Data Center UPS batteries mostly float service mein hoti hain — discharge events rare
        hote hain. Isliye <strong>Design Life</strong> zyada relevant specification hai
        Data Center battery selection ke liye.
      </p>

      <p style={S.p}>
        Cycle life relevant hota hai BESS (Battery Energy Storage Systems) ke liye jahan daily
        cycling hoti hai, ya unsteady grid sites pe jahan frequent power cuts hain.
      </p>

      {/* ─── Parameter 6: Internal Resistance ────────────────────────── */}
      <h3 style={S.h3}>6. Internal Resistance — Battery Health Indicator</h3>

      <p style={S.p}>
        Internal resistance (mΩ) measure karta hai ki battery kaise efficiently current deliver
        kar sakti hai. New battery ki resistance kam hoti hai — ageing ke saath badhti hai.
      </p>

      <ComparisonTable
        headers={["Battery Condition", "Internal Resistance (typical VRLA 100Ah cell)", "Implication"]}
        rows={[
          ["New (baseline)", "3–8 mΩ", "Reference — measure at commissioning, document"],
          ["Healthy aging", "Up to 1.25× baseline", "Normal — continue monitoring"],
          ["Moderate degradation", "1.25–2.0× baseline", "Monitor closely, plan replacement"],
          ["End of life", "> 2.0× baseline (IEEE 1188 threshold)", "Replace immediately"],
        ]}
      />

      <Callout type="important" title="Important — Baseline Measurement Non-Negotiable">
        Commissioning ke time <strong>har cell ka impedance measure karo aur record karo</strong>.
        Yeh baseline future comparison ke liye reference hai. Bina baseline ke, future test values
        meaningless hain — tum nahi jaante healthy kya tha. BMS isko automatically track kar
        sakta hai; standalone impedance tester se bhi kiya ja sakta hai.
      </Callout>

      {/* ─── Parameter 7: Max Discharge Current ──────────────────────── */}
      <h3 style={S.h3}>7. Maximum Discharge Current — The Hard Limit</h3>

      <p style={S.p}>
        Har battery cell ki ek maximum continuous discharge current rating hoti hai. Isse
        zyada current draw karo toh internal heating, plate damage, aur permanent capacity
        loss hota hai.
      </p>

      <p style={S.p}>
        Typically <strong>2C to 5C</strong> hoti hai — 100Ah battery ke liye 200A to 500A
        maximum continuous. UPS sizing mein verify karo ki worst-case discharge current
        (at minimum bus voltage) cell ki maximum rating se exceed na kare.
      </p>

      <Callout type="best-practice" title="Best Practice — Short Circuit Current bhi Check Karo">
        Datasheet mein short circuit current bhi hoti hai — typically 1000A to 5000A+ for large
        cells. Yeh value protection sizing ke liye use hoti hai. Fuse rating is value se kuch
        zyada honi chahiye to clear fault, lekin normal current pe trip na kare. DC-rated fuses
        mandatory hain — AC fuses DC systems mein use mat karo.
      </Callout>

      {/* ─── Parameter 8: Short Circuit Current ──────────────────────── */}
      <h3 style={S.h3}>8. Short Circuit Current — Protection Sizing Reference</h3>

      <p style={S.p}>
        Battery bank ka short circuit current bahut high hota hai. Formula:{" "}
        <strong>I_SC = V_bank ÷ R_total_cable</strong>. 192V bank with 2mΩ total cable
        resistance = 192 ÷ 0.002 = 96,000A — nearly 100kA fault current.
      </p>

      <p style={S.p}>
        Isliye DC-rated fuses mandatory hain. Standard AC MCBs DC fault current interrupt
        nahi kar sakte — DC arc non-zero crossing hoti hai, arc continuously burn karta hai,
        catastrophic damage hota hai.
      </p>

      {/* ─── Parameter 9: Weight ──────────────────────────────────────── */}
      <h3 style={S.h3}>9. Weight — Floor Loading and Handling</h3>

      <p style={S.p}>
        VRLA batteries bohot bhaari hoti hain. Large 2V stationary cells 100Ah se 3000Ah
        tak aati hain — weight 15kg se 300kg+ per cell tak ho sakti hai.
      </p>

      <ComparisonTable
        headers={["Battery Type", "Weight per kWh", "Example: 100kWh Bank", "Floor Loading"]}
        rows={[
          ["VRLA (2V large cells)", "30–40 kg/kWh", "3000–4000 kg", "High — structural engineer consultation needed"],
          ["VRLA (12V monobloc)", "25–35 kg/kWh", "2500–3500 kg", "Moderate to high"],
          ["LFP (Li-ion)", "8–12 kg/kWh", "800–1200 kg", "Much lower — 70% weight saving"],
        ]}
      />

      <Callout type="important" title="Important — Floor Loading Calculation Before Room Finalization">
        Battery room ka floor loading (kN/m²) structural engineer se verify karo{" "}
        <strong>before ordering batteries</strong>. Standard office floor: 2.5 kN/m². VRLA battery
        bank: easily 10-15 kN/m² ya zyada. Structure strengthen karna expensive hai post-construction.
        LFP selection sometimes sirf floor loading constraint ki wajah se justified hoti hai.
      </Callout>

      {/* ─── Parameter 10: Temperature Rating ────────────────────────── */}
      <h3 style={S.h3}>10. Temperature Rating — Operating vs Storage vs Optimum</h3>

      <ComparisonTable
        headers={["Temperature Parameter", "Typical Range", "Critical Point"]}
        rows={[
          ["Operating range", "−15°C to +50°C (VRLA)", "Battery operates but not at optimal capacity"],
          ["Optimal performance", "20–25°C", "Rated capacity and life at this range"],
          ["Storage (no charge)", "−20°C to +40°C", "Self-discharge increases with temperature"],
          ["Life derating", "Every 10°C above 25°C = half the life", "At 45°C: life is ~20% of rated life"],
        ]}
      />

      {/* ─── Parameter 11: Warranty ───────────────────────────────────── */}
      <h3 style={S.h3}>11. Warranty — What Is and Is NOT Covered</h3>

      <p style={S.p}>
        Battery warranty typically 1–3 years hoti hai for VRLA, 5–10 years for LFP. Lekin
        warranty conditions carefully read karo — zyada cases mein warranty void hoti hai agar:
      </p>

      <ul style={S.ul}>
        <li>Temperature 25°C se consistently zyada rahi (usually {">"}30°C voids warranty)</li>
        <li>Float voltage OEM spec se deviate hua</li>
        <li>Battery room ventilation OEM requirement ke against rahi</li>
        <li>Mixing of old and new batteries in same string</li>
        <li>Annual capacity testing records not maintained</li>
      </ul>

      <Callout type="interview" title="Interview Tip — Warranty Question">
        Interview mein agar poocha jaaye &quot;Battery warranty claim kab fail hoti hai?&quot; — answer:
        &quot;Most warranties require documented proof of: correct float voltage maintained (charging
        records), temperature within spec (HVAC logs), annual testing (capacity test reports),
        and no mixing of batteries. Without this documentation, warranty claim almost always
        rejected. Isliye commissioning se hi documentation shuru karo.&quot;
      </Callout>

      {/* ─── Parameter 12: BMS Specifications ────────────────────────── */}
      <h3 style={S.h3}>12. BMS Specifications (Li-ion Only)</h3>

      <p style={S.p}>
        Li-ion battery mein BMS ek mandatory built-in component hai — VRLA mein optional
        external monitoring hoti hai. Li-ion BMS ke liye datasheet mein check karo:
      </p>

      <ComparisonTable
        headers={["BMS Parameter", "What to Check", "Why It Matters"]}
        rows={[
          ["Cell balancing method", "Passive vs Active balancing", "Active balancing more efficient, less heat, better string health"],
          ["Communication protocol", "Modbus / CAN / SNMP", "Must match your UPS and DCIM system"],
          ["Overcharge cutoff", "Voltage threshold (V/cell)", "Must trigger before thermal damage — typically 3.65V for LFP"],
          ["Over-temperature cutoff", "°C threshold", "Must protect against thermal runaway"],
          ["SoC accuracy", "±2% or better", "Determines how accurately runtime is predicted"],
          ["DCIM integration", "API / protocol support", "Critical for Data Center management visibility"],
        ]}
      />

      {/* ─── Parameter 13: Datasheet Red Flags ───────────────────────── */}
      <h3 style={S.h3}>13. Datasheet Red Flags — What to Watch For</h3>

      <ul style={S.ul}>
        <li>
          <strong>No high-rate discharge table</strong> — vendor sirf C10/C20 data de raha hai,
          high-rate data nahi. For UPS application yeh serious gap hai.
        </li>
        <li>
          <strong>Unrealistic cycle life claims</strong> — VRLA ke liye 2000+ cycles at 80% DoD
          ka claim suspicious hai. Industry-verified VRLA: 300–500 cycles at 80% DoD.
        </li>
        <li>
          <strong>No IEC/IS certification</strong> — unverified batteries may fail prematurely
          aur fire/safety risk pose kar sakte hain. IS 1651 (India) ya IEC 60896 certification
          check karo.
        </li>
        <li>
          <strong>Vague temperature specs</strong> — agar operating temperature range bahut wide
          claim ki jaaye bina derating data ke, actual performance claimed se kam hogi.
        </li>
        <li>
          <strong>Missing internal resistance baseline</strong> — agar vendor baseline impedance
          data provide nahi karta, future health monitoring blind hai.
        </li>
      </ul>

      {/* ─── Parameter 14: Datasheet Comparison Worksheet ────────────── */}
      <h3 style={S.h3}>14. Datasheet Comparison Worksheet</h3>

      <p style={S.p}>
        Multiple vendors compare karte waqt apples-to-apples comparison ke liye yeh table use karo.
        Har vendor ke liye same parameters same conditions pe compare karo.
      </p>

      <ComparisonTable
        headers={["Parameter", "Vendor A", "Vendor B", "Vendor C", "Winner?"]}
        rows={[
          ["Ah rating (C10)", "—", "—", "—", "—"],
          ["Ah at C0.5 (30-min rate)", "—", "—", "—", "—"],
          ["Float voltage (V/cell)", "—", "—", "—", "—"],
          ["Design life at 25°C", "—", "—", "—", "—"],
          ["Internal resistance (new)", "—", "—", "—", "—"],
          ["Weight per cell (kg)", "—", "—", "—", "—"],
          ["Warranty (years)", "—", "—", "—", "—"],
          ["India certification (IS 1651)", "—", "—", "—", "—"],
          ["After-sales support (India)", "—", "—", "—", "—"],
          ["Price per Ah (INR)", "—", "—", "—", "—"],
        ]}
      />
    </>
  );
}
