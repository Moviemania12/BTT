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
        quickAnswer="Battery vendor selection is a long-term commitment — a battery bank's life is 3–15 years, and during that time the OEM's service network, spare parts availability and technical support are critical. The cheapest battery is not always the most economical choice."
        engineerTip="In India there is a lot of variation in quality in the VRLA battery market. For Tier III/IV Data Center projects, always verify the OEM's BIS certification, test reports (independent third-party) and India-specific warranty terms. Behind an 'international brand' label there can also be Chinese generic cells — ask for a factory audit or a certified test report."
        keyTakeaway="OEM selection = battery life, India service support and warranty enforceability — evaluate the combination of all three, not just price."
      />

      <Callout type="important" title="Important — OEM Disclaimer">
        The OEM descriptions given here are general industry observations based on publicly available information. Actual specifications, pricing, product lines and India support change frequently. Before finalizing any vendor, verify current datasheets, the India sales team and independent references. This article is not an endorsement of any OEM.
      </Callout>

      {/* ─── Indian OEMs ─────────────────────────────────────────── */}
      <h3 id="indian-oems" style={S.h3}>Indian OEMs — VRLA</h3>

      <p style={S.p}>
        In India there are established VRLA manufacturers who have been serving telecom, railways and the power sector for decades. For the Data Center, both their high-rate discharge capability and service network should be verified.
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
        Specifically verify for an Indian OEM: (1) IS 1651 certification for VRLA, (2) an independent third-party test report for high-rate discharge at your C-rate, (3) on-site service response time in your city, (4) battery replacement stock availability — if a string has to be replaced after 3 years, will the same batch be available? Explicitly include these questions in the vendor RFQ.
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
        There is significant variation in quality among Chinese VRLA brands — different factories of the same brand produce different quality. Narada and Leoch are established brands, but ask for batch-specific test reports on the order. Avoid small unknown Chinese brands for Data Center applications — warranty enforcement is practically impossible in India.
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
        An important distinction in the Li-ion market: some OEMs provide their own integrated solution (Huawei), where the UPS and battery are one package; other OEMs provide open battery modules that work with multiple UPS brands (Schneider, Delta). An integrated solution gives simpler commissioning but creates vendor lock-in.
      </p>

      {/* ═══════════════════════════════════════════════════════════════
          PART 14 — COMMON ENGINEERING MISTAKES
      ═══════════════════════════════════════════════════════════════ */}

      <h2 id="common-mistakes" style={S.h2}>Common Engineering Mistakes</h2>

      <SectionIntro
        quickAnswer="80% of battery bank failures are preventable — they are not random failures, they are the consequences of engineering and operational mistakes. This section explains every common mistake, with its real impact, so that you never make these mistakes."
        engineerTip="The most important lesson from field experience: battery failure always happens at the worst time — during an actual grid failure. That is when you find out the annual capacity test was missed, or the float voltage was set wrong, or there was a mixed-age string. Prevention is the only strategy — by the time failure happens, it is too late."
        keyTakeaway="90% of a battery bank's reliability depends on commissioning and maintenance quality — only 10% on hardware quality."
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
        The three mistakes that cause catastrophic, unrecoverable failure: (1) <strong>No per-string fusing</strong> — one fault can destroy the whole bank. (2) <strong>Skipping the annual capacity test</strong> — the bank silently degrades and fails during a real outage. (3) <strong>Mixed age strings in parallel</strong> — compounding degradation accelerates total bank failure. All three are non-negotiable.
      </Callout>

      <h3 style={S.h3}>Mistake Deep-Dive — Why Mixed Age Is So Dangerous</h3>

      <p style={S.p}>
        Engineers often think: &quot;One string failed — replace it and put a new string in parallel. Done.&quot; This is the wrong approach.
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
        In project planning, include a battery bank replacement budget every 4–5 years (VRLA) or 10–12 years (LFP). A surprise replacement becomes a financial emergency — a planned replacement is a routine capital expenditure. EOL planning should start 12 months before expected replacement date.
      </Callout>
    </>
  );
}
