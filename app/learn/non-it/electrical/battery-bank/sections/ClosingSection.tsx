"use client";

// ═══════════════════════════════════════════════════════════════════════════
// app/learn/non-it/electrical/battery-bank/sections/ClosingSection.tsx
//
// Part 24 — Future Trends (Blueprint v3.0 Part 24)
// Part 25 — Closing / Key Takeaways (Blueprint v3.0 Part 25)
// Heading IDs: future-trends, key-takeaways
// ═══════════════════════════════════════════════════════════════════════════

import { S, Callout, ComparisonTable, SectionIntro } from "../shared";
import { CalculatorLink, CalculatorLinkList } from "../shared";
import { getCalculator, getCalculatorsForTopic } from "@/lib/engineering/registry";
import TopicLink from "@/components/TopicLink";

export default function ClosingSection() {
  const ahCalc       = getCalculator("ups.battery-ah-calculator");
  const qtyCalc      = getCalculator("ups.battery-quantity-calculator");
  const stringCalc   = getCalculator("ups.battery-string-calculator");
  const runtimeCalc  = getCalculator("ups.runtime-calculator");
  const loadCalc     = getCalculator("ups.load-calculator");
  const redunCalc    = getCalculator("ups.redundancy-calculator");
  const designerCalc = getCalculator("ups.data-center-ups-designer");

  return (
    <>
      {/* ═══════════════════════════════════════════════════════════════
          PART 24 — FUTURE TRENDS
      ═══════════════════════════════════════════════════════════════ */}

      <h2 id="future-trends" style={S.h2}>Future Trends</h2>

      <SectionIntro
        quickAnswer="Battery technology 2024–2030 mein significant transition mein hai. LFP adoption accelerate ho rahi hai, AI-driven health prediction mainstream ho raha hai, aur entirely new chemistries (sodium-ion, solid-state) commercial viability ke kareeb aa rahi hain."
        engineerTip="Future trends pe invest karne ka best time tab hota hai jab technology 'crossing the chasm' phase mein ho — early majority adoption. LFP wahan hai. Sodium-ion abhi early adopters phase mein hai. Solid-state 2027–2030 tak Data Center relevant nahi hoga. Battery-as-a-Service India mein 2026–2028 mein traction pakadega — financial modeling ready rakho."
        keyTakeaway="LFP aaj decision hai, sodium-ion 2027+ ka decision hai — abhi ke projects ke liye VRLA vs LFP choice karo; baki technologies ke liye roadmap pe watch karo."
      />

      <h3 style={S.h3}>LFP Adoption Acceleration</h3>

      <p style={S.p}>
        Lithium Iron Phosphate (LFP) Data Center mainstream mein shift ho raha hai —
        hyperscalers (Google, Meta, Microsoft) ne apne new builds mein LFP standard as
        their battery chemistry adopt karna shuru kar diya hai globally.
      </p>

      <p style={S.p}>
        India mein yeh transition 2024–2027 ke beech significant hoga. Driving factors:
        LFP cost per kWh gir raha hai (CATL scale effect), VRLA replacement cycles ka
        total cost increasingly LFP se higher ho raha hai at 10-year horizon, aur space
        constraints in Tier III/IV retrofits LFP ko preferred choice bana rahe hain.
      </p>

      <ComparisonTable
        headers={["Factor", "2023 Status", "2027 Projection"]}
        rows={[
          ["LFP cost vs VRLA (upfront per kWh)", "~2.5–3× more expensive", "~1.5–2× more expensive — gap narrowing"],
          ["India LFP product availability", "Limited OEM options, mostly imported", "Multiple options including some domestic assembly"],
          ["10-year TCO comparison", "LFP competitive in large installations", "LFP clearly better across most application sizes"],
          ["Warranty confidence", "5–7 year common", "10+ year warranties emerging"],
          ["India regulatory for LFP rooms", "No clear standard — NFPA 855 referenced", "India-specific Li-ion energy storage standard expected"],
        ]}
      />

      <h3 style={S.h3}>AI-Driven Battery Health Prediction</h3>

      <p style={S.p}>
        Traditional battery health monitoring reactive hai — alarm trigger hoti hai jab threshold
        cross ho. AI/ML-based prediction systems battery degradation patterns analyze karte hain
        aur replacement need predict karte hain 3–6 months pehle.
      </p>

      <p style={S.p}>
        Implementation: BMS data (per-cell impedance trends, temperature patterns, cycle data)
        machine learning models ko feed hota hai. Output: probability of failure in next 90
        days per string — maintenance teams ko actionable advance notice milta hai.
      </p>

      <h3 style={S.h3}>Solid-State Batteries — Timeline</h3>

      <p style={S.p}>
        Solid-state batteries (solid electrolyte instead of liquid) theoretically offer:
        higher energy density, no liquid electrolyte leak risk, lower thermal runaway probability.
        Commercial reality: 2024 mein solid-state abhi premium EV market ke liye develop ho raha
        hai — Data Center stationary use ke liye 2028–2032 estimated timeline.
      </p>

      <Callout type="important" title="Important — Do Not Delay Projects for Solid-State">
        Solid-state ki wait mein current projects delay mat karo. Technology timeline always
        slip karta hai. VRLA ya LFP decide karo based on current economics — solid-state
        tabhi relevant hoga jab first reliable Data Center installations deploy ho jayein
        aur 3–5 years ka operational track record mile.
      </Callout>

      <h3 style={S.h3}>Second-Life EV Batteries</h3>

      <p style={S.p}>
        EV batteries jo vehicle use ke liye retire ho gayi hain (typically at 70–80% SoH)
        stationary storage ke liye use ho sakti hain. India mein yeh market 2025–2028 mein
        develop hona shuru hoga as EV volumes reach scale.
      </p>

      <p style={S.p}>
        Practical challenges abhi: SOH verification difficult (each pack has different history),
        warranty void, mixed cell batches create imbalance, insurance coverage unclear.
        Watch this space — commercial pilots are happening globally but India deployment
        is still 3–5 years away at scale.
      </p>

      <h3 style={S.h3}>Battery-as-a-Service (BaaS)</h3>

      <p style={S.p}>
        BaaS model mein battery bank ka ownership operator ke paas nahi hota — ek service
        provider battery deploy, monitor, maintain, aur replace karta hai. Customer per-kWh
        ya per-month fee pay karta hai. Capital expenditure OPEX mein convert ho jaati hai.
      </p>

      <p style={S.p}>
        India mein yeh model hyperscale aur co-location segments mein 2026–2028 mein traction
        pakad sakta hai. Advantage: battery replacement risk service provider ke paas shift
        ho jaata hai. Challenge: long-term contracts, service level definitions, aur exit
        provisions carefully negotiate karne padte hain.
      </p>

      <h3 style={S.h3}>Flow Batteries for Long-Duration Storage</h3>

      <p style={S.p}>
        Vanadium Redox Flow Batteries (VRFB) 4–12 hour storage ke liye economical hote jaate
        hain as scale increases. India mein renewable energy integration aur grid balancing ke
        liye yeh relevant ho raha hai — Data Center BESS applications mein 2026+ mein
        commercial projects expect karo.
      </p>

      {/* ═══════════════════════════════════════════════════════════════
          PART 25 — KEY TAKEAWAYS
      ═══════════════════════════════════════════════════════════════ */}

      <h2 id="key-takeaways" style={S.h2}>Key Takeaways</h2>

      <p style={S.p}>
        Yeh complete battery bank guide padhne ke baad — ek structured summary jo tumhare
        saath field mein kaam aayegi.
      </p>

      <ul style={S.ul}>
        <li>
          <strong>Battery bank = Series (voltage) + Parallel (Ah).</strong>{" "}
          Yeh do operations mila ke complete energy storage system banta hai — dono ko
          independently design karo.
        </li>
        <li>
          <strong>VRLA abhi standard hai, LFP future hai.</strong>{" "}
          Budget-first = VRLA. TCO-first aur space-constrained = LFP. Dono valid choices
          hain different contexts mein.
        </li>
        <li>
          <strong>Sizing formula: Ah = (Load_W × Runtime_hr) ÷ (V_bus × DoD × η × Temp_f × Age_f).</strong>{" "}
          Sirf Load, Voltage, DoD nahi — temperature factor aur age factor dono apply karo
          for production-ready design.
        </li>
        <li>
          <strong>Temperature = battery life ka #1 enemy.</strong>{" "}
          India mein 40°C battery room = VRLA life 1.5–2 years actual vs 5 years rated.
          Battery room HVAC N+1 mandatory hai, not optional.
        </li>
        <li>
          <strong>Annual capacity test non-negotiable hai.</strong>{" "}
          Visual inspection aur voltage check battery ki actual SoH detect nahi karte.
          IEEE 450/1188: SoH &lt;80% = replace immediately.
        </li>
        <li>
          <strong>Mixed-age strings = accelerated failure.</strong>{" "}
          Ek string replace karte waqt — pura string replace karo, ek cell nahi. Agar
          doosri strings close to EOL hain, replace entire bank.
        </li>
        <li>
          <strong>Per-string fusing mandatory hai.</strong>{" "}
          Bina individual string fuses ke, ek fault puri bank destroy kar sakti hai.
          DC-rated fuses use karo, AC fuses kabhi nahi.
        </li>
        <li>
          <strong>Float voltage temperature-compensated honi chahiye.</strong>{" "}
          India summer mein bina temperature compensation ke chronic overcharge hogi —
          sabse common Indian Data Center VRLA failure cause.
        </li>
        <li>
          <strong>Tier III = N+1 strings, Tier IV = 2N independent banks.</strong>{" "}
          Tier IV mein physical separation mandatory hai — separate rooms, separate HVAC,
          separate earthing, separate cable routes.
        </li>
        <li>
          <strong>Documentation = engineering memory.</strong>{" "}
          Har discharge event, har maintenance visit, har test result document karo. Bina
          records ke, warranty claims aur replacement decisions anecdotal ho jaate hain.
        </li>
        <li>
          <strong>DC arc flash VRLA battery room mein real risk hai.</strong>{" "}
          192V DC bank virtually unlimited short circuit current source hai. Insulated tools,
          face shield, arc-rated PPE mandatory hai for any physical battery work.
        </li>
        <li>
          <strong>Actual implementation always depends on project requirements.</strong>{" "}
          Koi ek universal battery bank design nahi hoti — utility requirements, OEM design,
          Data Center architecture, aur budget sab mila ke final design decide hota hai.
        </li>
      </ul>

      {/* ─── Live Calculator Toolkit ──────────────────────────────── */}
      <h3 style={S.h3}>Live Calculators — Battery Bank Design Toolkit</h3>

      <p style={S.p}>
        Yeh calculators directly is article ke formulas implement karte hain. Apna project
        size karne ke liye use karo — koi signup required nahi.
      </p>

      {ahCalc && <CalculatorLink calculator={ahCalc} />}
      {qtyCalc && <CalculatorLink calculator={qtyCalc} />}
      {stringCalc && <CalculatorLink calculator={stringCalc} />}
      {runtimeCalc && <CalculatorLink calculator={runtimeCalc} />}
      {loadCalc && <CalculatorLink calculator={loadCalc} />}
      {redunCalc && <CalculatorLink calculator={redunCalc} />}
      {designerCalc && <CalculatorLink calculator={designerCalc} />}

      {/* ─── Related Articles ─────────────────────────────────────── */}
      <h3 style={S.h3}>Aage Kya Seekhein</h3>

      <p style={S.p}>
        Battery bank ke baad natural next steps:
      </p>

      <ul style={S.ul}>
        <li>
          <TopicLink slug="ups" variant="inline" /> — Battery bank jis UPS ka hissa hai
          uski complete architecture samjho
        </li>
        <li>
          <TopicLink slug="dg-set" variant="inline" /> — Battery bank ke baad DG Set
          start hota hai — yeh coordination samjho
        </li>
        <li>
          <TopicLink slug="sts" variant="inline" /> — Dual bus architecture mein STS
          ka role battery bank ke saath
        </li>
        <li>
          <TopicLink slug="pdu" variant="inline" /> — UPS output se rack tak power
          distribution chain
        </li>
      </ul>

      <Callout type="best-practice" title="Final Thought — Engineering is a Discipline">
        Battery bank engineering mein shortcut nahi hota — har skipped test, har missed
        maintenance visit, har ignored alarm ek risk accumulate karta hai. Yeh risk tab
        realize hota hai jab actual power failure hoti hai. Uss moment pe no remediation
        is possible. The only winning strategy is consistent, documented, standards-based
        maintenance — every time, without exception.
      </Callout>
    </>
  );
}
