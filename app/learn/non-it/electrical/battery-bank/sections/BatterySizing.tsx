"use client";

// ═══════════════════════════════════════════════════════════════════════════
// app/learn/non-it/electrical/battery-bank/sections/BatterySizing.tsx
//
// Part 6 — Battery Sizing Methodology (Blueprint v3.0 Part 6)
// Part 7 — String Architecture (Blueprint v3.0 Part 8)
// ═══════════════════════════════════════════════════════════════════════════

import { S, Callout, ComparisonTable, Figure, SectionIntro } from "../shared";
import { CalculatorLink, CalculatorLinkList } from "@/components/engineering/CalculatorLink";
import { getCalculator, getCalculatorsForTopic } from "@/lib/engineering/registry";
import BatterySizingFlowDiagram from "../svg/BatterySizingFlowDiagram";
import StringFusingDiagram from "../svg/StringFusingDiagram";

export default function BatterySizing() {
  const ahCalc = getCalculator("ups.battery-ah-calculator");
  const runtimeCalc = getCalculator("ups.runtime-calculator");
  const stringCalc = getCalculator("ups.battery-string-calculator");
  const qtyCalc = getCalculator("ups.battery-quantity-calculator");

  return (
    <>
      {/* ═══════════════════════════════════════════════════════════════
          PART 6 — BATTERY SIZING METHODOLOGY
      ═══════════════════════════════════════════════════════════════ */}

      <h2 id="battery-sizing" style={S.h2}>Battery Sizing Methodology</h2>

      <SectionIntro
        quickAnswer="Battery sizing ek 13-step engineering process hai — sirf ek formula apply karna nahi. Load correction, temperature derating, ageing factor, redundancy architecture — sab ek sequence mein apply karne padte hain. Koi ek step miss karo toh final bank undersized ya oversized ho sakta hai."
        engineerTip="Indian Data Centers mein sabse common sizing mistake: temperature factor ignore karna. Designer assume karta hai 25°C lekin actual battery room 35-40°C average run karta hai. 40°C pe VRLA ka 80% DoD target assume karo lekin actually 65-70% available hoti hai after temp derating. Result: battery bank designed for 15 minutes actual mein 10 minutes deti hai."
        keyTakeaway="Sizing formula mein sirf Load, Voltage, DoD nahi — Temperature Factor aur Age Factor dono apply karna mandatory hai for production-ready design."
      />

      <Figure caption="Fig 4 — Battery Sizing Methodology: 13-step flow from load determination to final bank design">
        <BatterySizingFlowDiagram />
      </Figure>

      {/* ─── Step-by-step sizing ──────────────────────────────────────── */}
      <h3 style={S.h3}>Step 1 — Load Determination</h3>

      <p style={S.p}>
        Pehla step hai actual load calculate karna. UPS ko power karna wale sab loads sum karo.
        Sirf IT load nahi — PDU losses, lighting, security systems sab include karo.
      </p>

      <ComparisonTable
        headers={["Load Category", "Example", "Typical % of Total"]}
        rows={[
          ["IT Load (servers, storage, network)", "100 racks × 5kW avg", "85–90%"],
          ["PDU & cable losses", "~3% of IT load", "2–4%"],
          ["Lighting (battery room + DC room)", "LED, emergency", "0.5–1%"],
          ["Security (CCTV, access control)", "Always-on systems", "0.5–1%"],
          ["Building management (BMS panels)", "Control panels, sensors", "0.5–1%"],
        ]}
      />

      <h3 style={S.h3}>Step 2 — Runtime Requirement</h3>

      <p style={S.p}>
        Runtime requirement project specification se aata hai — typically:
      </p>

      <ul style={S.ul}>
        <li><strong>Standard Data Center:</strong> 10–15 minutes (DG startup ka bridge time)</li>
        <li><strong>Financial/Banking DC:</strong> 20–30 minutes (regulatory + double DG redundancy)</li>
        <li><strong>Hospital critical power:</strong> 30–60 minutes (life safety + generator startup redundancy)</li>
        <li><strong>Tier IV DC:</strong> 15 minutes minimum + 2N battery bank (each path independently capable)</li>
      </ul>

      <h3 style={S.h3}>Step 3 — Bus Voltage Selection</h3>

      <ComparisonTable
        headers={["Bus Voltage", "Typical Application", "Cells in Series (12V)", "Cells in Series (2V)"]}
        rows={[
          ["48V DC", "Telecom, small UPS, server rack power", "4 × 12V", "24 × 2V"],
          ["96V DC", "Small to medium UPS (10–100 kVA)", "8 × 12V", "48 × 2V"],
          ["192V DC", "Medium UPS (100–500 kVA) — most common in India", "16 × 12V", "96 × 2V"],
          ["240V DC", "Large UPS, modular UPS systems", "20 × 12V", "120 × 2V"],
          ["384V DC", "Large UPS (1 MVA+), Li-ion systems", "32 × 12V", "192 × 2V"],
          ["800V+ DC", "Modern LFP modular systems, hyperscale", "Li-ion specific", "Li-ion specific"],
        ]}
      />

      <Callout type="important" title="Important — Bus Voltage Fixed by UPS OEM">
        Bus voltage tumhara choice nahi hai — yeh UPS OEM ne design time pe fix kiya hua hai.
        Battery bank ki series string design hamesha UPS ke exact DC bus voltage ke liye honi
        chahiye. Kisi bhi variation se rectifier/charger malfunction ya battery overcharge ho
        sakta hai. UPS datasheet mein &quot;DC Bus Voltage&quot; parameter confirm karo.
      </Callout>

      <h3 style={S.h3}>Steps 4–8 — The Core Sizing Formula</h3>

      <p style={S.p}>
        Sabse important formula. Yeh IEEE 485 approach pe based hai lekin India-specific factors
        add kiye gaye hain:
      </p>

      <div style={{ background: "rgba(0,212,255,0.04)", border: "1px solid rgba(0,212,255,0.2)", borderRadius: "8px", padding: "1rem 1.25rem", margin: "1rem 0", fontFamily: "var(--font-mono)", fontSize: "0.95rem" }}>
        <div style={{ color: "var(--color-neon-blue)", fontWeight: 700, marginBottom: "0.5rem" }}>
          Core Sizing Formula:
        </div>
        <div style={{ color: "var(--color-text-primary)", lineHeight: 1.8 }}>
          Ah = (Load_W × Runtime_hr)
          <br />
          &nbsp;&nbsp;&nbsp;&nbsp;÷ (V_bus × DoD × η × Temp_factor × Age_factor)
        </div>
        <div style={{ color: "var(--color-text-secondary)", fontSize: "0.8rem", marginTop: "0.75rem" }}>
          Where: η = system efficiency (0.92–0.96) | Temp_factor = 0.75–0.85 at Indian ambient
          | Age_factor = 0.80 (replace at 80% SoH)
        </div>
      </div>

      <h3 style={S.h3}>Steps 9–11 — String Design</h3>

      <p style={S.p}>
        Required Ah mil jaaye toh string design karo:
      </p>

      <ul style={S.ul}>
        <li>
          <strong>Cells per string =</strong> ⌈Bus Voltage ÷ Per-Cell Voltage⌉
          (ceiling function — round up)
        </li>
        <li>
          <strong>Parallel strings =</strong> ⌈Required Ah ÷ Per-Cell Ah⌉
          (ceiling function — round up, minimum 1)
        </li>
        <li>
          <strong>Total cells =</strong> Cells per string × Parallel strings
        </li>
      </ul>

      <h3 style={S.h3}>Step 12 — Redundancy Architecture</h3>

      <ComparisonTable
        headers={["Architecture", "Extra Strings", "Fault Tolerance", "Typical Application"]}
        rows={[
          ["N (exact)", "0", "Zero — any string failure = runtime reduced", "Non-critical, very small installations"],
          ["N+1", "1 extra string", "1 string can fail — others carry load", "Tier II/III standard"],
          ["2N", "Full duplicate bank", "Entire bank can fail — second bank takes over", "Tier IV — physically separate rooms"],
          ["N+2", "2 extra strings", "2 strings can fail simultaneously", "High-availability Tier III"],
        ]}
      />

      {/* ─── Worked Example 1 ─────────────────────────────────────────── */}
      <h2 id="sizing-worked-examples" style={S.h2}>Sizing Worked Examples</h2>

      <SectionIntro
        quickAnswer="Theory samajhna enough nahi hai — actual numbers nikalna aata hona chahiye. Teen examples: standard Data Center, hospital, aur edge DC. Har ek mein step-by-step calculation."
        engineerTip="Calculation spreadsheet mein rakho aur every input assumption document karo. Project review mein jab koi pooche 'kyun yeh sizing ki?' — documented assumptions se answer milega. Undocumented assumptions = design risk."
        keyTakeaway="Every sizing calculation ke saath 3 chize document karo: actual input assumptions, correction factors applied, aur final design with redundancy."
      />

      <h3 style={S.h3}>Worked Example 1 — 100-Rack Tier III Data Center</h3>

      <p style={S.p}>
        <strong>Project:</strong> Tier III Data Center, 100 racks, Mumbai. Battery room ambient
        35°C average. VRLA AGM 12V/100Ah cells. 15-minute runtime requirement. N+1 redundancy.
      </p>

      <ComparisonTable
        headers={["Step", "Parameter", "Calculation", "Value"]}
        rows={[
          ["1", "Total IT Load", "100 racks × 5kW avg + 10% overhead", "550 kW"],
          ["2", "Runtime", "15 minutes = 0.25 hours", "0.25 hr"],
          ["3", "Bus Voltage", "192V DC (given by UPS OEM)", "192 V"],
          ["4", "DoD", "80% (VRLA standard)", "0.80"],
          ["5", "Efficiency η", "UPS inverter + cable: 0.94", "0.94"],
          ["6", "Temperature factor", "35°C ambient → 0.80 (from derating table)", "0.80"],
          ["7", "Age factor", "Design for 80% SoH at EOL → ÷ 0.80 = ×1.25", "1.25"],
          ["8", "Required Ah", "= (550,000 × 0.25) ÷ (192 × 0.80 × 0.94 × 0.80 × 0.80)", "≈ 707 Ah"],
          ["9", "Cell chosen", "12V / 150Ah VRLA AGM monobloc (next standard size above 707/N)", "150 Ah"],
          ["10", "Cells per string", "⌈192 ÷ 12⌉ = 16 cells/string", "16 cells"],
          ["11", "Parallel strings (N)", "⌈707 ÷ 150⌉ = ⌈4.71⌉ = 5 strings", "5 strings"],
          ["12", "N+1 redundancy", "5 + 1 = 6 strings total", "6 strings"],
          ["13", "Total cells", "16 × 6 = 96 cells", "96 cells"],
          ["Final", "Bank capacity at EOL", "5 strings × 150Ah × 0.80 (SoH) × 0.80 (DoD) = 480Ah available", "480 Ah usable"],
        ]}
      />

      <Callout type="best-practice" title="Best Practice — Verify Runtime at EOL Conditions">
        Final verification: Runtime = (Available Ah × V_bus × η) ÷ Load_W = (480 × 192 × 0.94)
        ÷ 550,000 = 86,630 ÷ 550,000 = 0.158 hr = 9.4 minutes. This is below the 15-minute
        target! Recalculate with larger cell or more strings. This is exactly why end-of-life
        verification matters — design looks fine at beginning of life but fails at EOL.
      </Callout>

      <p style={S.p}>
        Corrected design: increase to 200Ah cells. Recalculation: Available Ah at EOL = 5 × 200
        × 0.80 × 0.80 = 640 Ah. Runtime = (640 × 192 × 0.94) ÷ 550,000 = 0.210 hr = 12.6
        minutes. Better — but still tight for 15 min. Add 7th string (N+2) or choose 250Ah cells.
      </p>

      <p style={S.p}>
        <strong>Final answer:</strong> Use 16 × 250Ah cells per string, 6 strings (N+1).
        Runtime at EOL = 5 usable strings × (250 × 0.80 × 0.80) = 800Ah usable.
        Runtime = (800 × 192 × 0.94) ÷ 550,000 = 0.263 hr = 15.8 minutes. ✓
      </p>

      <h3 style={S.h3}>Worked Example 2 — Hospital Critical Power (30-minute runtime)</h3>

      <p style={S.p}>
        <strong>Project:</strong> Hospital, ICU + OT + Imaging backup. 150 kW critical load.
        LFP battery. 30-minute runtime. 25°C controlled room (hospital has good HVAC). 2N architecture.
      </p>

      <ComparisonTable
        headers={["Step", "Parameter", "Calculation", "Value"]}
        rows={[
          ["1", "Critical Load", "ICU + OT + Imaging + BMS", "150 kW"],
          ["2", "Runtime", "30 min = 0.50 hours", "0.50 hr"],
          ["3", "Bus Voltage", "192V DC", "192 V"],
          ["4", "DoD", "90% (LFP, better cycling)", "0.90"],
          ["5", "Efficiency η", "0.95 (LFP more efficient)", "0.95"],
          ["6", "Temperature factor", "25°C controlled room = 1.0 (no derating)", "1.00"],
          ["7", "Age factor", "LFP 10-yr life — factor 0.85 (less degradation)", "1/0.85 = 1.18"],
          ["8", "Required Ah (per bank)", "= (150,000 × 0.50) ÷ (192 × 0.90 × 0.95 × 1.00 × 0.85)", "≈ 256 Ah per bank"],
          ["9", "Cell chosen", "LFP 3.2V / 100Ah cells", "100 Ah LFP"],
          ["10", "Cells per string", "⌈192 ÷ 3.2⌉ = 60 cells/string", "60 cells"],
          ["11", "Strings per bank", "⌈256 ÷ 100⌉ = 3 strings per bank", "3 strings"],
          ["12", "2N architecture", "2 completely independent banks: Bank A + Bank B", "2 × 3 strings"],
          ["13", "Total cells", "2 banks × 3 strings × 60 cells = 360 cells", "360 LFP cells"],
        ]}
      />

      <h3 style={S.h3}>Worked Example 3 — Edge Data Center (10 racks, Unmanned)</h3>

      <p style={S.p}>
        <strong>Project:</strong> Edge DC, 10 racks, Rajasthan (hot climate, 45°C peak ambient).
        VRLA, 10-minute runtime (DG available on site). N+1. Remote monitoring via BMS.
      </p>

      <ComparisonTable
        headers={["Step", "Parameter", "Value"]}
        rows={[
          ["Load", "10 racks × 3kW avg", "30 kW"],
          ["Runtime", "10 min = 0.167 hr", "0.167 hr"],
          ["Bus Voltage", "96V DC (smaller UPS)", "96 V"],
          ["DoD", "VRLA: 80%", "0.80"],
          ["Efficiency η", "0.93", "0.93"],
          ["Temperature factor", "45°C ambient → 0.65 (very harsh — from derating table)", "0.65"],
          ["Age factor", "1.25 (÷ 0.80)", "1.25"],
          ["Required Ah", "(30,000 × 0.167) ÷ (96 × 0.80 × 0.93 × 0.65 × 0.80)", "≈ 154 Ah"],
          ["Cell chosen", "12V / 100Ah monobloc", "100 Ah VRLA"],
          ["Cells per string", "⌈96 ÷ 12⌉ = 8 cells", "8 cells"],
          ["Strings (N)", "⌈154 ÷ 100⌉ = 2 strings", "2 strings"],
          ["N+1", "2 + 1 = 3 strings", "3 strings total"],
          ["Total cells", "8 × 3 = 24 cells", "24 cells"],
        ]}
      />

      <Callout type="danger" title="Danger — 45°C Ambient: Critical Design Consideration">
        Rajasthan edge site pe 45°C ambient mein VRLA design life 5-year rated se sirf ~1 year
        actual reh jaata hai. Is case mein seriously evaluate karo: (1) LFP battery — better
        temp tolerance, longer life. (2) Insulated battery cabinet with dedicated cooling.
        (3) More frequent replacement budget planning. At 45°C, VRLA is a high-risk choice
        without dedicated temperature control.
      </Callout>

      {/* ─── Calculator Links ──────────────────────────────────────────── */}
      <p style={S.p}>
        In calculations ke liye yeh live calculators use karo:
      </p>

      {ahCalc && <CalculatorLink calculator={ahCalc} />}
      {stringCalc && <CalculatorLink calculator={stringCalc} />}
      {qtyCalc && <CalculatorLink calculator={qtyCalc} />}
      {runtimeCalc && <CalculatorLink calculator={runtimeCalc} />}

      {/* ═══════════════════════════════════════════════════════════════
          PART 7 — BATTERY SELECTION GUIDE
      ═══════════════════════════════════════════════════════════════ */}

      <h2 id="battery-selection-guide" style={S.h2}>Battery Selection Guide</h2>

      <SectionIntro
        quickAnswer="Sahi battery select karna 6 factors pe depend karta hai: budget, space, temperature, cycle count, TCO horizon, aur regulatory requirements. Ek factor miss karo toh wrong selection ho sakta hai — even if price sahi lag raha ho."
        engineerTip="Budget-first selection ek trap hai. VRLA cheapest lagti hai Day 1 pe, lekin agar 5 saal mein 2 baar replace karni pade (Indian summer conditions mein common hai) toh total cost LFP se zyada hogi. Procurement team ko 10-year TCO dikhao, not just unit price."
        keyTakeaway="Battery selection = Application + Environment + Budget + TCO — inme se sirf ek maximize karna wrong design deta hai."
      />

      <ComparisonTable
        headers={["Application", "Primary Recommendation", "Alternative", "Key Decision Factor"]}
        rows={[
          ["Small Server Room (< 20 kVA)", "VRLA AGM 12V monobloc", "—", "Cost — VRLA cheapest, sufficient for small load"],
          ["Medium Office DC (20–100 kVA)", "VRLA AGM", "LFP if space constrained", "Cost vs space trade-off"],
          ["Tier II Data Center", "VRLA AGM (2V large cells)", "LFP for 10+ year horizon", "Proven technology, wide service network"],
          ["Tier III Data Center", "VRLA AGM or LFP", "Depends on TCO analysis", "Space, temperature, replacement cycle count"],
          ["Tier IV Data Center", "LFP", "VRLA 2N (very expensive + heavy)", "2N doubles cost — LFP saves space and weight"],
          ["Hospital Critical Power", "VRLA AGM", "LFP (if fire suppression updated)", "Regulatory acceptance, proven reliability"],
          ["Telecom Tower (outdoor/hot)", "LFP", "VRLA with cooling (expensive)", "Temperature tolerance, cycle life"],
          ["Solar Hybrid / BESS", "LFP", "Flow battery for very long duration", "PSOC tolerance, cycle life"],
          ["Edge DC (unmanned, remote)", "LFP + BMS remote monitoring", "VRLA (higher replacement visits)", "Remote monitoring capability, longer life"],
          ["Indian DC with poor cooling", "LFP (preferred) or VRLA with enhanced cooling", "—", "Temperature — VRLA life collapses at 40°C+"],
        ]}
      />

      <h3 style={S.h3}>Selection Decision Tree</h3>

      <p style={S.p}>
        Ek systematic approach har project ke liye:
      </p>

      <ol style={S.ol}>
        <li>
          <strong>Kya budget primary constraint hai?</strong>
          → Haan: VRLA AGM. Lekin 10-year TCO calculate karo pehle.
        </li>
        <li>
          <strong>Kya space seriously constrained hai?</strong>
          → Haan: LFP (70% weight/space saving).
        </li>
        <li>
          <strong>Kya ambient temperature regularly 35°C se zyada hai?</strong>
          → Haan: LFP strongly preferred; VRLA only with dedicated battery room cooling.
        </li>
        <li>
          <strong>Kya high cycle count expected hai (daily discharge)?</strong>
          → Haan: LFP mandatory — VRLA cycle life insufficient.
        </li>
        <li>
          <strong>Kya regulatory approval required hai (hospital, airport)?</strong>
          → VRLA — established regulatory track record, easier approval.
        </li>
        <li>
          <strong>Kya 10-year horizon pe TCO optimize karna hai?</strong>
          → LFP preferred — fewer replacements, lower maintenance.
        </li>
      </ol>

      {/* ═══════════════════════════════════════════════════════════════
          PART 8 — STRING ARCHITECTURE
      ═══════════════════════════════════════════════════════════════ */}

      <h2 id="string-architecture" style={S.h2}>String Architecture</h2>

      <SectionIntro
        quickAnswer="String architecture decide karta hai ki batteries physically kaise connect hongi — series string voltage ke liye, parallel strings Ah capacity ke liye. Yeh ek design decision hai jo safety, redundancy, aur maintainability directly affect karta hai."
        engineerTip="String architecture galat ho toh ek battery fault puri bank le sakta hai. Common mistake: no per-string fusing. Always fuse each string independently — yeh single rule most catastrophic battery bank failures prevent karta hai."
        keyTakeaway="Series = voltage; Parallel = Ah capacity; Per-string fusing = mandatory — yeh teen rules string architecture ka core hai."
      />

      <h3 id="series-vs-parallel" style={S.h3}>Series vs Parallel — Core Concept</h3>

      <ComparisonTable
        headers={["Connection", "Effect on Voltage", "Effect on Ah Capacity", "Use Case"]}
        rows={[
          ["Series (+ to − chain)", "Voltages ADD: n × V_cell", "Remains same as single cell", "Build required bus voltage"],
          ["Parallel (+ to +, − to −)", "Remains same as single string", "Ah ADDS: n × Ah_per_string", "Build required total capacity"],
          ["Series + Parallel combined", "Series builds voltage", "Parallel builds Ah", "Real battery bank — both needed"],
        ]}
      />

      <p style={S.p}>
        Example: 192V bus, 100Ah required (simplified).
      </p>

      <ul style={S.ul}>
        <li>Using 12V / 50Ah cells</li>
        <li>Series string: 192 ÷ 12 = 16 cells per string = 192V, 50Ah</li>
        <li>Parallel: Need 100Ah → 2 strings = 100Ah total</li>
        <li>Final bank: 2 strings × 16 cells = 32 cells total → 192V, 100Ah</li>
      </ul>

      <h3 style={S.h3}>Parallel Strings — Maximum Recommended</h3>

      <p style={S.p}>
        IEEE 1187 ek important guideline hai parallel strings ke baare mein. Theory mein jitni
        strings chahiye parallel karo — lekin practice mein problems aate hain:
      </p>

      <ul style={S.ul}>
        <li>
          <strong>Current imbalance:</strong> Strings electrically identical nahi hoti — internal
          resistance differences se current unequally distribute hota hai.
        </li>
        <li>
          <strong>Fault propagation:</strong> Ek string fault hoti hai toh baaki strings high
          current supply karti hain — cascade failure risk.
        </li>
        <li>
          <strong>Individual fusing complexity:</strong> Zyada strings → more fuses → more
          maintenance points.
        </li>
      </ul>

      <p style={S.p}>
        IEEE guidance: generally <strong>3 strings maximum in parallel</strong> per IEEE 1187
        recommendations. Zyada capacity chahiye toh larger Ah per cell use karo — strings
        badhana avoid karo.
      </p>

      <Callout type="important" title="Important — 3 Strings Max Guideline ka Real World Application">
        IEEE 1187 ki 3-string guidance ek starting point hai, hard rule nahi. Large Tier IV DCs
        mein 4–6 parallel strings common hain with proper protection coordination. Key requirements
        if exceeding 3 strings: (1) Individual fusing per string, (2) Per-string current
        monitoring in BMS, (3) Documented justification in design. Never exceed without these.
      </Callout>

      <h3 id="string-fusing" style={S.h3}>String Fusing & Protection</h3>

      <Figure caption="Fig 5 — String Fusing: Every string needs its own DC-rated fuse before the DC bus bar. Without this, a single string fault can cascade to all strings.">
        <StringFusingDiagram />
      </Figure>

      <p style={S.p}>
        String fusing battery bank design ki sabse important safety requirement hai — lekin
        surprisingly zyada installations mein yeh miss hota hai ya improperly done hota hai.
      </p>

      <ComparisonTable
        headers={["Protection Type", "Location", "Purpose", "Rating"]}
        rows={[
          ["String fuse (per string)", "Between each string and DC bus", "Isolate faulty string — prevent cascade", "125% of string rated current, DC-rated"],
          ["Main battery disconnect", "Between whole bank and UPS", "Emergency isolation of entire bank", "DC-rated switch/breaker"],
          ["Battery room MCCB", "At room entry, DC bus", "Manual isolation for maintenance", "DC-rated, lockable"],
          ["Cell-level protection", "BMS in Li-ion systems", "Cell overcharge/overdischarge protection", "BMS software-controlled"],
        ]}
      />

      <Callout type="danger" title="Danger — AC Fuses DC Circuits Mein KABHI Mat Use Karo">
        DC fault current non-zero crossing hoti hai — AC fuse mein designed interrupting arc-quench
        mechanism DC pe kaam nahi karta. AC fuse DC fault current interrupt karne ki koshish mein
        explode ya melt ho sakta hai — fire risk, injury risk. Hamesha DC-rated fuses use karo
        with adequate DC breaking capacity rating. Check: voltage rating (must be ≥ bus voltage),
        current rating, AND DC interrupting capacity.
      </Callout>

      <h3 style={S.h3}>String Balancing — Why Strings Age Differently</h3>

      <p style={S.p}>
        Parallel strings theoretically equal share karte hain — lekin reality mein hamesha kuch
        imbalance hoti hai. Causes:
      </p>

      <ul style={S.ul}>
        <li>Slightly different cable lengths → different resistance → different current</li>
        <li>Different internal resistance within cells → unequal current distribution</li>
        <li>Different temperature exposure (cells near cooling inlet vs near wall)</li>
        <li>Manufacturing tolerances between cells</li>
      </ul>

      <p style={S.p}>
        String ki current imbalance monitor karo. 5% se zyada imbalance investigate karo —
        yeh string problem ya connection issue indicate karta hai.
      </p>

      <h3 style={S.h3}>Mixed-Age String Problem</h3>

      <p style={S.p}>
        Yeh Data Center mein ek bahut common aur expensive mistake hai. Ek string mein old aur
        new batteries mix karna sabse avoidable way hai premature bank failure ka.
      </p>

      <ComparisonTable
        headers={["Scenario", "What Happens", "Timeline"]}
        rows={[
          ["1 old + 15 new (same string)", "Old battery: high impedance, discharges first → over-discharges → new batteries over-charged to compensate", "3–6 months to string failure"],
          ["Old string + new string (parallel)", "New string carries more current (lower impedance) → ages faster → both degrade prematurely", "6–12 months impact visible"],
          ["Different Ah rating in same string", "Higher Ah cell can't discharge fully at same rate — capacity mismatch → shorter life for both", "Immediate capacity loss from Day 1"],
          ["Different brand in same string", "Float voltage mismatch, impedance mismatch → constant imbalance → both age faster", "6–18 months"],
        ]}
      />

      <Callout type="best-practice" title="Best Practice — String Replacement Rule">
        Rule: Ek string mein <strong>sab batteries same batch, same brand, same age</strong> honi
        chahiye. Agar ek cell bad ho, pura string replace karo — ek cell replace karna wrong hai.
        Agar ek string bad ho, ideally pura bank evaluate karo. If other strings are close to
        EOL, replace entire bank — not just the failed string. Partial replacement creates
        mixed-age problem immediately.
      </Callout>

      <h3 style={S.h3}>Redundant String Architecture — Tier III vs Tier IV</h3>

      <ComparisonTable
        headers={["Architecture", "String Configuration", "Tier Applicability", "Key Requirement"]}
        rows={[
          ["N", "Exact strings needed, no spare", "Tier I (non-critical)", "Zero string tolerance"],
          ["N+1", "One extra string in same battery room", "Tier II / III standard", "One string can be removed for maintenance without reducing runtime"],
          ["N+2", "Two extra strings", "High-availability Tier III", "Two simultaneous string failures tolerated"],
          ["2N", "Two completely independent banks", "Tier IV mandatory", "Each bank in separate room — completely independent path"],
          ["2(N+1)", "Two independent N+1 banks", "Tier IV highest resilience", "Path failure + string failure simultaneously tolerated"],
        ]}
      />
    </>
  );
}
