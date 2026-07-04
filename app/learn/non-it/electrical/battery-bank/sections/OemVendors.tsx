"use client";

// ═══════════════════════════════════════════════════════════════════════════
// app/learn/non-it/electrical/battery-bank/sections/OemVendors.tsx
//
// Part 13 — OEM & Vendor Landscape (Blueprint v3.0 Part 13)
// Part 14 — Common Engineering Mistakes (Blueprint v3.0 Part 14)
// Heading IDs: oem-vendors, indian-oems, global-oems-vrla,
//              global-oems-liion, common-mistakes
// ═══════════════════════════════════════════════════════════════════════════

import { S, Callout, ComparisonTable, SectionIntro } from "../shared";

export default function OemVendors() {
  return (
    <>
      {/* ═══════════════════════════════════════════════════════════════
          PART 13 — OEM & VENDOR LANDSCAPE
      ═══════════════════════════════════════════════════════════════ */}

      <h2 id="oem-vendors" style={S.h2}>OEM & Vendor Landscape</h2>

      <SectionIntro
        quickAnswer="Battery vendor selection ek long-term commitment hai — battery bank ki life 3–15 years hoti hai aur us dauraan OEM ki service network, spare parts availability, aur technical support critical hoti hai. Sabse sasti battery hamesha sabse economical choice nahi hoti."
        engineerTip="India mein VRLA battery market mein bahut zyada variation hai quality mein. Tier III/IV Data Center projects ke liye hamesha OEM ka BIS certification, test reports (independent third-party), aur India-specific warranty terms verify karo. 'International brand' label ke peeche Chinese generic cells bhi ho sakti hain — factory audit ya certified test report maango."
        keyTakeaway="OEM selection = battery life, India service support, aur warranty enforceability — teeno ka combination evaluate karo, sirf price nahi."
      />

      <Callout type="important" title="Important — OEM Disclaimer">
        Yahan diye gaye OEM descriptions general industry observations hain based on publicly
        available information. Actual specifications, pricing, product lines, aur India support
        frequently change karte hain. Koi bhi vendor finalize karne se pehle current datasheets,
        India sales team, aur independent references verify karo. Yeh article kisi bhi OEM ka
        endorsement nahi hai.
      </Callout>

      {/* ─── Indian OEMs ─────────────────────────────────────────── */}
      <h3 id="indian-oems" style={S.h3}>Indian OEMs — VRLA</h3>

      <p style={S.p}>
        India mein established VRLA manufacturers hain jo decades se telecom, railways, aur power
        sector serve kar rahe hain. Data Center ke liye inke high-rate discharge capability
        aur service network dono verify karna chahiye.
      </p>

      <ComparisonTable
        headers={["OEM", "Key Focus", "India Presence", "Notable"]}
        rows={[
          ["Exide Industries", "VRLA AGM, VLA — long history in India", "Pan-India manufacturing + service", "Established brand, telecom + DC experience, BIS certified"],
          ["Amara Raja Batteries (Amaron)", "VRLA AGM — Amaron brand well known", "Strong South India + pan-India", "OEM to major UPS brands, consistent quality reports"],
          ["HBL Power Systems", "VRLA + NiCd — niche industrial + critical", "Hyderabad-based, specialized", "Railway + defense experience — high-reliability products"],
          ["Okaya Power", "VRLA AGM + inverter batteries", "North India strong", "Value segment + Data Center range growing"],
          ["Livguard Energy", "VRLA + emerging Li-ion", "Growing pan-India", "Newer entrant, competitive pricing, verify track record"],
        ]}
      />

      <Callout type="best-practice" title="Best Practice — India OEM Evaluation">
        Indian OEM ke liye specifically verify karo: (1) IS 1651 certification for VRLA,
        (2) independent third-party test report for high-rate discharge at your C-rate,
        (3) on-site service response time in your city, (4) battery replacement stock
        availability — agar 3 saal baad ek string replace karni ho toh same batch available
        hogi kya? Yeh questions vendor RFQ mein explicitly include karo.
      </Callout>

      {/* ─── Global OEMs — VRLA ──────────────────────────────────── */}
      <h3 id="global-oems-vrla" style={S.h3}>Global OEMs — VRLA</h3>

      <ComparisonTable
        headers={["OEM", "Country/Region", "India Presence", "Data Center Relevance"]}
        rows={[
          ["EnerSys", "USA", "Direct + distributor network", "Premium VRLA — DataSafe, PowerSafe ranges — widely used in Tier III/IV globally"],
          ["Narada (CSIC)", "China", "Strong India distribution", "Value-premium VRLA — widely used in Indian Data Centers — verify batch consistency"],
          ["Vision Battery", "Taiwan", "Distributor network", "VRLA AGM — mid-tier market, consistent quality"],
          ["Leoch International", "China", "Growing India presence", "VRLA + Li-ion — telecom + DC focus"],
          ["FIAMM (Enersys brand now)", "Italy/Global", "Limited India direct", "Premium European VRLA — specialized applications"],
          ["CSB Battery", "Taiwan", "Good India presence", "Reliable mid-tier VRLA — UPS OEM supplier"],
        ]}
      />

      <Callout type="important" title="Important — Chinese VRLA: Quality Varies Significantly">
        Chinese VRLA brands quality mein significant variation hoti hai — same brand ke
        different factories se alag quality aati hai. Narada aur Leoch established brands
        hain but order pe batch-specific test reports maango. Small unknown Chinese brands
        Data Center applications ke liye avoid karo — warranty enforcement India mein
        practically impossible hai.
      </Callout>

      {/* ─── Global OEMs — Li-ion ─────────────────────────────────── */}
      <h3 id="global-oems-liion" style={S.h3}>Global OEMs — Lithium-Ion / LFP</h3>

      <ComparisonTable
        headers={["OEM", "Product", "India Status", "Key Note"]}
        rows={[
          ["Huawei Digital Power", "SmartLi iPack — integrated Li-ion UPS+battery", "Active India presence", "Tightly integrated — UPS + battery from same OEM, good DCIM integration"],
          ["Schneider Electric", "Galaxy series Li-ion — modular", "Strong India presence", "Open ecosystem — compatible with multiple battery suppliers"],
          ["Vertiv (Liebert)", "Li-ion series", "Strong India presence", "Established Data Center brand — Li-ion range growing"],
          ["Delta Electronics", "Li-ion UPS + battery modules", "Growing India", "Competitive pricing, good India support"],
          ["CATL", "LFP cells — OEM supplier", "Supplies many branded products", "World's largest battery maker — cells inside many branded products"],
          ["BYD Battery", "LFP modules + packs", "Limited India direct", "Strong in BESS — Data Center UPS integration growing"],
          ["Saft (TotalEnergies)", "NiCd + Li-ion — specialized", "Limited India", "Premium — nuclear, railway, critical infrastructure"],
        ]}
      />

      <p style={S.p}>
        Li-ion market mein important distinction: kuch OEMs apna integrated solution dete hain
        (Huawei) jahan UPS aur battery ek package hai; doosre OEMs open battery modules dete
        hain jo multiple UPS brands ke saath work karte hain (Schneider, Delta). Integrated
        solution simpler commissioning deta hai lekin vendor lock-in create karta hai.
      </p>

      {/* ═══════════════════════════════════════════════════════════════
          PART 14 — COMMON ENGINEERING MISTAKES
      ═══════════════════════════════════════════════════════════════ */}

      <h2 id="common-mistakes" style={S.h2}>Common Engineering Mistakes</h2>

      <SectionIntro
        quickAnswer="Battery bank failures ka 80% preventable hai — yeh random failures nahi hain, yeh engineering aur operational mistakes ke consequences hain. Yeh section har common mistake explain karta hai, real impact ke saath, taaki tum yeh galtiyan karte hi mat karo."
        engineerTip="Field experience se sabse important lesson: battery failure hamesha worst time pe hoti hai — actual grid failure ke dauraan. Tab pata chalta hai ki annual capacity test miss kiya tha, ya float voltage galat set tha, ya mixed age string thi. Prevention is the only strategy — by the time failure happens, it is too late."
        keyTakeaway="Battery bank ki reliability 90% commissioning aur maintenance quality pe depend karti hai — hardware quality pe sirf 10%."
      />

      <ComparisonTable
        headers={["Mistake", "What Happens", "Timeline to Failure"]}
        rows={[
          ["Mixing old + new batteries in same string", "Old cells discharge first, over-discharge new cells; new cells try to compensate, over-charge old cells", "3–6 months to string failure"],
          ["Different Ah ratings in same string", "Capacity limited to lowest Ah cell — rest wasted; imbalance during discharge", "Immediate capacity loss from Day 1"],
          ["Different brands in same string", "Float voltage mismatch, impedance mismatch — constant cell imbalance", "6–18 months degradation"],
          ["Wrong terminal torque", "Too loose: resistance hotspot → terminal melt → arc flash risk. Too tight: cracked terminal → internal short", "Loose: months; Tight: weeks"],
          ["Skipping impedance testing", "Weak cell undetected → fails during actual outage — worst possible moment", "No warning — fails when needed"],
          ["Float voltage +0.05V/cell above spec", "Chronic overcharge → electrolyte dry-out in VRLA → capacity loss → thermal risk", "1–2 years early EOL"],
          ["No temperature compensation", "India summer: overcharge at high ambient. Winter: undercharge. Both damage", "2–3 years early EOL"],
          ["Skipping formation charge", "Battery never reaches rated capacity — permanently undersized from Day 1", "Permanent — never at 100%"],
          ["No per-string fusing", "One string fault → entire bank short circuit → catastrophic", "Single event — no warning"],
          ["Skipping annual capacity test", "SoH unknown → fails during real outage with zero warning", "Unknown until critical moment"],
          ["No BMS baseline update after replacement", "False alarms or missed real alarms from Day 1 of new batteries", "Immediate operational impact"],
          ["Wrong DC cable sizing", "Excess voltage drop → reduced runtime; cable heating → fire risk", "Progressive — gets worse"],
          ["Battery room at 35–40°C", "VRLA life halved every 10°C above 25°C → 2-year life instead of 5-year", "2–3 years early replacement"],
          ["Running PSOC (never fully recharged)", "Sulphation builds up → capacity loss → irreversible damage", "6–24 months"],
          ["Skipping H₂ sensor commissioning", "H₂ accumulates undetected → explosion risk from any ignition source", "Continuous risk"],
        ]}
      />

      <Callout type="danger" title="Danger — Top 3 Mistakes That Cause Catastrophic Failure">
        Teeno mistakes jo catastrophic, unrecoverable failure cause karte hain:
        (1) <strong>No per-string fusing</strong> — ek fault poore bank ko destroy kar sakta hai.
        (2) <strong>Skipping annual capacity test</strong> — bank silently degrades, fails during
        real outage.
        (3) <strong>Mixed age strings parallel</strong> — compounding degradation, accelerates
        total bank failure. Yeh teeno non-negotiable hain.
      </Callout>

      <h3 style={S.h3}>Mistake Deep-Dive — Why Mixed Age Is So Dangerous</h3>

      <p style={S.p}>
        Engineers often socha karte hain: &quot;Ek string fail hui — replace karke new string
        parallel mein lagao. Done.&quot; Yeh wrong approach hai.
      </p>

      <p style={S.p}>
        When a new string is paralleled with old strings: new string has lower impedance →
        it carries more current during discharge → ages faster than it should. Old strings
        carry less current → under-utilised during discharge → over-charged as new string
        charges them back. Net result: new string ages in 18 months what should take 5 years.
      </p>

      <p style={S.p}>
        <strong>Correct approach:</strong> When one string fails, assess entire bank. If other
        strings are at 60%+ SoH, replace failed string only — but document it and plan full
        bank replacement within 12–18 months. If other strings are at 40–60% SoH, replace
        entire bank now. Mixed-age is acceptable as a temporary measure, never as a long-term design.
      </p>

      <Callout type="best-practice" title="Best Practice — Battery Bank Procurement Planning">
        Project planning mein battery bank replacement budget every 4–5 years (VRLA) ya
        10–12 years (LFP) include karo. Surprise replacement ek financial emergency ban
        jaata hai — planned replacement ek routine capital expenditure hai. EOL planning
        should start 12 months before expected replacement date.
      </Callout>
    </>
  );
}
