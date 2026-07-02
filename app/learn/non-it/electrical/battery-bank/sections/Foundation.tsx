"use client";

// ═══════════════════════════════════════════════════════════════════════════
// app/learn/non-it/electrical/battery-bank/sections/Foundation.tsx
//
// Parts 1–2 of Blueprint v3.0:
//   Part 1 — Foundation (1.0–1.5)
//   Part 2 — Battery Technologies overview and lead-acid section start
// ═══════════════════════════════════════════════════════════════════════════

import { S, Callout, ComparisonTable, Figure, SectionIntro } from "../shared";
import TopicLink from "@/components/TopicLink";
import PowerChainDiagram from "../svg/PowerChainDiagram";
import VrlaAgmAnatomyDiagram from "../svg/VrlaAgmAnatomyDiagram";

export default function Foundation() {
  return (
    <>
      {/* ═══════════════════════════════════════════════════════════════
          PART 1 — FOUNDATION
      ═══════════════════════════════════════════════════════════════ */}

      <h2 id="what-is-battery-bank" style={S.h2}>What Is a Battery Bank?</h2>

      <SectionIntro
        quickAnswer="Battery bank ek organized collection of batteries hai jo series aur parallel mein connect hoti hain — ek specific DC voltage aur capacity deliver karne ke liye. Data Center mein yeh UPS ka energy reservoir hai."
        engineerTip="Akeli battery bank nahi banti. 'Battery bank' tabhi kehte hain jab multiple batteries ek intentional architecture mein hoti hain — specific voltage (series) aur specific runtime capacity (parallel) ke saath. Ek 12V monobloc ek battery hai; 16 of them in series at 192V DC is a string; 3 such strings in parallel is a battery bank."
        keyTakeaway="Battery bank = Series (voltage) + Parallel (capacity) — yeh do operations mila ke ek complete energy storage system banta hai."
      />

      <p style={S.p}>
        Imagine ek Data Center mein 500 servers chal rahe hain. Grid power suddenly cut hoti hai.
        DG Set start hone mein 15–20 seconds lagte hain. In 15–20 seconds mein servers ko power
        chahiye — warna crash, data loss, SLA breach. Yeh exact gap{" "}
        <strong>battery bank</strong> cover karta hai.
      </p>

      <p style={S.p}>
        Battery bank simply ek collection nahi hai batteries ka — yeh ek engineered system hai.
        Har battery ki position, orientation, connection torque, fusing, aur monitoring sab
        deliberately designed hota hai. Galat design mein ek weak cell poori bank fail kara sakti
        hai exactly jab zaroorat ho.
      </p>

      <Callout type="important" title="Important — Battery Bank ≠ UPS Battery">
        Kai log socha hai ki UPS ke andar jo battery hoti hai woh aur battery bank alag cheez hain.
        Actually UPS ke andar jo hota hai woh bhi ek battery bank hi hai — sirf terminology aur scale
        alag hoti hai. Small UPS mein internal battery bank hoti hai. Large Data Center UPS mein{" "}
        <strong>external battery bank</strong> hoti hai — separate room mein, engineered aur monitored.
        Yeh article us external battery bank ke baare mein hai.
      </Callout>

      {/* ═══════════════════════════════════════════════════════════════
          1.2 — WHY BATTERY BANK EXISTS
      ═══════════════════════════════════════════════════════════════ */}
      <h2 id="why-battery-bank-exists" style={S.h2}>Why Battery Bank Exists in a Data Center</h2>

      <p style={S.p}>
        Ek simple question — agar <TopicLink slug="dg-set" variant="inline" /> already backup power
        deta hai, toh battery bank kyun chahiye?
      </p>

      <p style={S.p}>
        Answer: <strong>timing</strong>. DG Set ko start hone mein 10–30 seconds lagte hain.
        Stabilize hone mein aur bhi time. Is window mein <TopicLink slug="ups" variant="inline" />{" "}
        battery se power deta hai. Battery bank woh energy reservoir hai jo yeh window cover karta hai.
      </p>

      <ComparisonTable
        headers={["Scenario", "Without Battery Bank", "With Battery Bank"]}
        rows={[
          ["Grid fails (DG not yet started)", "Server crash in milliseconds", "Battery bridges 10–30 sec gap — seamless"],
          ["Brief grid fluctuation (< 1 sec)", "Potential server reboot", "UPS + battery absorbs it — zero impact"],
          ["DG fails to start", "Data Center goes dark", "Runtime extended — emergency procedures possible"],
          ["Planned maintenance on UPS", "Server downtime required", "Battery bank sustains load during UPS work"],
          ["Power quality issue (harmonics)", "Hardware damage possible", "UPS + battery provides clean regulated output"],
        ]}
      />

      <Callout type="best-practice" title="Best Practice — Size for DG Startup + Buffer">
        Battery bank runtime typically 10–15 minutes ke liye size kiya jaata hai — DG startup time
        (30 sec) se zyada. Buffer isliye ki DG fail ho toh manual intervention time mile, ya second
        DG start kiya ja sake. Hospitals aur critical facilities mein 30–60 minute runtime standard hai.
      </Callout>

      {/* ═══════════════════════════════════════════════════════════════
          1.3 — POWER CHAIN POSITION
      ═══════════════════════════════════════════════════════════════ */}
      <h2 id="power-chain-position" style={S.h2}>Where It Sits in the Power Chain</h2>

      <Figure caption="Fig 1 — Data Center Power Chain: Battery Bank is connected to the UPS DC Bus, bridging grid failure and DG startup">
        <PowerChainDiagram />
      </Figure>

      <p style={S.p}>
        Battery bank UPS ke andar ke DC Bus se connected hoti hai. Jab grid available hoti hai,{" "}
        <strong>rectifier</strong> AC ko DC mein convert karta hai — yeh DC bus ko power karta hai
        aur battery ko float charge karta hai simultaneously. Jab grid fail hoti hai, battery bank
        instantly DC bus ko power karta hai — inverter isko AC mein convert karta hai aur load
        continue karta hai. Transition so fast hoti hai ki servers ko pata hi nahi chalta.
      </p>

      <p style={S.p}>
        Power chain order: <strong>Grid → Transformer → UPS Rectifier → DC Bus (← Battery Bank) →
        UPS Inverter → PDU → Rack → Servers</strong>. Battery bank is always connected to the DC Bus
        — yeh "parked" nahi hoti. Float charge pe rehti hai, ready to supply the moment grid drops.
      </p>

      {/* ═══════════════════════════════════════════════════════════════
          1.4 — BATTERY BANK vs UPS BATTERY
      ═══════════════════════════════════════════════════════════════ */}
      <h2 id="battery-bank-vs-ups-battery" style={S.h2}>Battery Bank vs UPS Battery — Same or Different?</h2>

      <p style={S.p}>
        Short answer: same concept, different scale aur location. Dono mein batteries hain, dono
        DC power store karti hain, dono UPS DC bus se connected hoti hain.
      </p>

      <ComparisonTable
        headers={["Aspect", "Internal UPS Battery", "External Battery Bank"]}
        rows={[
          ["Location", "Inside UPS cabinet", "Separate battery room / cabinet"],
          ["Capacity", "Small — minutes at small loads", "Large — designed for specific runtime"],
          ["Typical use", "Small UPS (< 20 kVA), office, home", "Large UPS (100 kVA+), Data Center"],
          ["Maintenance access", "Limited — open UPS cabinet", "Full access — dedicated room, walkways"],
          ["Monitoring", "Basic BMS in UPS", "Dedicated BMS with per-cell monitoring"],
          ["Scalability", "Fixed — replace whole UPS battery", "Scalable — add strings as load grows"],
          ["Typical battery", "VRLA 12V monobloc, 7–40 Ah", "VRLA 2V/12V large cells, 100–3000+ Ah"],
        ]}
      />

      {/* ═══════════════════════════════════════════════════════════════
          1.5 — HISTORY & EVOLUTION
      ═══════════════════════════════════════════════════════════════ */}
      <h2 id="history-evolution" style={S.h2}>History & Evolution of Data Center Batteries</h2>

      <p style={S.p}>
        Data Center battery technology ki evolution direct relationship hai IT load growth ke saath.
        Jaise Data Centers bade hue, battery requirements bhi evolve huin.
      </p>

      <ComparisonTable
        headers={["Era", "Battery Technology", "Typical Runtime", "Key Limitation"]}
        rows={[
          ["1960s–1970s", "Vented Lead Acid (VLA) — flooded", "30–60 min", "Heavy, large footprint, needs water topping, H₂ management"],
          ["1980s–1990s", "VRLA AGM introduced", "10–30 min", "Maintenance-free but temperature sensitive"],
          ["2000s", "VRLA becomes dominant", "10–15 min (standard)", "Life: 3–5 years, replacement cycles expensive"],
          ["2010s", "VRLA stays dominant; Li-ion pilots begin", "10–15 min", "Li-ion expensive, thermal runaway concerns"],
          ["2020s", "LFP Li-ion mainstream adoption", "10–15 min (same), fewer replacements", "Higher upfront cost, fire suppression changes"],
          ["Future", "Solid-state, flow, second-life EV", "Long-duration possible", "Cost and maturity still being proven"],
        ]}
      />

      <Callout type="interview" title="Interview Tip — Why VRLA Replaced VLA">
        Common question: &quot;VRLA aur VLA mein main difference?&quot; Answer: VRLA sealed hai — valve
        regulated, electrolyte absorbed in glass mat (AGM) ya gel. No free electrolyte. No water
        topping. No dedicated acid-resistant floor. Less H₂ in normal operation. Maintenance-free
        = lower OPEX. VLA abhi bhi use hoti hai jahan very long life ya high temperature tolerance
        chahiye (telecom, railways) but Data Center mein VRLA standard hai.
      </Callout>

      {/* ═══════════════════════════════════════════════════════════════
          PART 2 — BATTERY TECHNOLOGIES
      ═══════════════════════════════════════════════════════════════ */}

      <h2 id="battery-technology-overview" style={S.h2}>Battery Technology Landscape</h2>

      <SectionIntro
        quickAnswer="Data Center mein sirf VRLA aur LFP hi relevant hain abhi — baaki technologies ya niche use cases hain ya still emerging hain. Dono ki chemistry, strengths, aur tradeoffs samajhna selection decision ke liye foundation hai."
        engineerTip="Technology selection always total cost of ownership (TCO) se drive honi chahiye, not just upfront cost. VRLA cheap lagti hai upfront, lekin 3–5 saal mein replace karni padti hai. LFP expensive hai upfront lekin 10–15 saal chalni chahiye. 10 years mein TCO often LFP ke favour mein hoti hai — yeh calculation project proposal mein dikhao."
        keyTakeaway="For Data Centers today: VRLA for budget-constrained or regulated applications; LFP for TCO-optimised, space-constrained, or high-cycle applications."
      />

      <h3 id="lead-acid-chemistry" style={S.h3}>Lead Acid Chemistry — How It Works</h3>

      <p style={S.p}>
        Lead acid battery ka basic electrochemistry 1859 se chal raha hai — Gaston Planté ka
        invention. Principle simple hai: lead (Pb) aur lead dioxide (PbO₂) plates sulfuric acid
        electrolyte (H₂SO₄) mein immersed hain.
      </p>

      <p style={S.p}>
        <strong>Discharge:</strong> Both plates react with H₂SO₄ → Lead sulfate (PbSO₄) forms on
        both plates → electrons flow through external circuit → electrical energy released.
      </p>

      <p style={S.p}>
        <strong>Charge:</strong> External current reverses the reaction → PbSO₄ converts back to
        Pb and PbO₂ → H₂SO₄ reforms → energy stored again.
      </p>

      <Callout type="warning" title="Warning — Sulphation: What Happens When Lead Acid Is Mistreated">
        Agar battery deeply discharged rehti hai ya PSOC (Partial State of Charge) mein operate
        hoti hai, PbSO₄ crystals large aur hard ho jaate hain — yeh recharge pe dissolve nahi hoti.
        Yeh sulphation hai — VRLA ka most common premature failure mode. Prevention: never leave
        battery deeply discharged; always recharge promptly after any discharge event.
      </Callout>

      <h3 id="vrla-agm" style={S.h3}>VRLA AGM — Absorbed Glass Mat</h3>

      <Figure caption="Fig 2 — VRLA AGM Cell Anatomy: plates, AGM separator, pressure relief valve, and the oxygen recombination cycle that makes it maintenance-free">
        <VrlaAgmAnatomyDiagram />
      </Figure>

      <p style={S.p}>
        AGM = Absorbed Glass Mat. Fine glass fibre mat electrolyte absorb karta hai — koi free
        liquid nahi. Yahi reason hai ki VRLA sealed aur spillproof hoti hai.
      </p>

      <p style={S.p}>
        AGM ki key innovation hai <strong>oxygen recombination cycle</strong>: charging ke time
        positive plate pe O₂ gas generate hoti hai → glass mat ke through negative plate tak
        diffuse hoti hai → negative plate pe recombine ho jaati hai → water back. Yeh cycle
        ~95–99% efficient hai normal conditions mein — isliye water topping ki zaroorat nahi.
      </p>

      <ComparisonTable
        headers={["Parameter", "VRLA AGM", "Value / Note"]}
        rows={[
          ["Cell voltage", "2V per cell (standard)", "12V = 6 cells in one monobloc"],
          ["Float voltage", "2.25–2.27V per cell", "Temperature compensation required"],
          ["Boost/Equalisation voltage", "2.33–2.40V per cell", "Use sparingly — risk of dry-out"],
          ["Design life", "3–5 years typical", "At 25°C; halves every 10°C above this"],
          ["Cycle life", "250–500 cycles at 80% DoD", "More cycles at lower DoD"],
          ["Operating temperature", "−15°C to +50°C", "Optimal: 20–25°C"],
          ["Self-discharge", "3–5% per month", "Store in cool location"],
          ["Maintenance", "None (sealed)", "Annual testing still mandatory"],
          ["Typical sizes", "2V large cells (100–3000 Ah), 12V monobloc (7–200 Ah)", ""],
        ]}
      />

      <h3 id="vrla-gel" style={S.h3}>VRLA Gel</h3>

      <p style={S.p}>
        Gel battery mein silica (SiO₂) electrolyte mein mix ki jaati hai — thick gel ban jaata hai
        jo leak nahi karta. AGM se zyada robust hai high-temperature environments mein aur deep
        cycling ke liye better hai.
      </p>

      <ComparisonTable
        headers={["Parameter", "VRLA AGM", "VRLA Gel"]}
        rows={[
          ["Electrolyte state", "Absorbed in glass mat", "Silica gel (immobilised)"],
          ["Deep cycle performance", "Good", "Better — gel withstands deeper cycling"],
          ["High temperature tolerance", "Standard", "Slightly better"],
          ["Charge rate tolerance", "Standard", "Lower — more sensitive to high charge current"],
          ["Cost", "Lower", "5–15% higher than AGM"],
          ["Data Center use", "Dominant choice", "Used in specific high-temp/cyclic applications"],
          ["Float voltage", "2.25–2.27V/cell", "2.23–2.25V/cell (slightly lower — critical)"],
        ]}
      />

      <Callout type="danger" title="Danger — Never Use AGM Float Voltage on Gel Battery">
        AGM aur Gel ke float voltages different hain. Gel battery ko AGM voltage pe charge karna
        overcharge karta hai — irreversible damage. Always verify OEM datasheet for exact float
        voltage before connecting to existing charger. Mixed string (AGM + Gel) never allowed.
      </Callout>

      <h3 id="vla-flooded" style={S.h3}>VLA — Vented / Flooded Lead Acid</h3>

      <p style={S.p}>
        VLA (Vented Lead Acid) — oldest technology. Free liquid electrolyte hoti hai, vent caps
        se H₂ aur O₂ gas bahar nikal sakti hai. Yeh deliberate hai — overcharge control aur plate
        longevity ke liye.
      </p>

      <ComparisonTable
        headers={["Parameter", "VLA (Flooded)", "VRLA (AGM/Gel)"]}
        rows={[
          ["Electrolyte", "Free liquid sulfuric acid", "Absorbed / immobilised"],
          ["Maintenance", "Regular — water topping, electrolyte check", "None (sealed)"],
          ["Venting", "Yes — H₂ release during normal charge", "Minimal — recombination cycle"],
          ["Life", "15–20+ years (with proper maintenance)", "3–5 years typical"],
          ["Cycle life", "Very high", "Lower"],
          ["Cost", "Lower per Wh", "Higher per Wh, but maintenance-free saves OPEX"],
          ["Typical use", "Substation, telecom tower, railway", "Data Center UPS"],
          ["Special room requirement", "Acid-resistant floor, forced ventilation, eyewash", "Standard battery room"],
        ]}
      />

      <p style={S.p}>
        VLA Data Center mein relatively rare hai kyunki dedicated acid management, ventilation,
        aur maintenance overhead OPEX increase karta hai. Lekin jahan very long life (15+ years)
        chahiye aur maintenance resources available hain, VLA still viable hai.
      </p>

      <h3 id="lithium-chemistry" style={S.h3}>Lithium Chemistry — How It Works</h3>

      <p style={S.p}>
        Lithium-ion batteries mein lithium ions cathode aur anode ke beech move karte hain during
        charge/discharge. Lead acid ke unlike, koi electrolyte consumption nahi, koi gassing nahi
        normal operation mein, aur energy density significantly higher hai.
      </p>

      <p style={S.p}>
        Data Center mein do main lithium chemistries relevant hain:{" "}
        <strong>LFP (Lithium Iron Phosphate)</strong> aur{" "}
        <strong>NMC (Nickel Manganese Cobalt)</strong>. In dono ki characteristics significantly
        different hain — selection matter karta hai.
      </p>

      <h3 id="lfp-battery" style={S.h3}>LFP — Lithium Iron Phosphate</h3>

      <p style={S.p}>
        LFP chemistry data centers ke liye sabse suitable lithium option hai — excellent safety
        profile (no thermal runaway propagation in most scenarios), long cycle life, wide
        temperature range, aur growing commercial availability.
      </p>

      <ComparisonTable
        headers={["Parameter", "LFP", "Value / Note"]}
        rows={[
          ["Nominal cell voltage", "3.2V", "Higher than lead acid → fewer cells for same bus voltage"],
          ["Usable DoD", "Up to 90%", "vs 80% for VRLA — more usable capacity per Ah"],
          ["Cycle life", "3000–5000+ cycles at 80% DoD", "vs 300–500 for VRLA at same DoD"],
          ["Design life", "10–15 years", "vs 3–5 for VRLA"],
          ["Weight (per kWh)", "~8–12 kg/kWh", "vs 30–40 kg/kWh for VRLA — 70% lighter"],
          ["Thermal runaway", "Low risk — no propagation in most designs", "Still requires BMS and fire detection"],
          ["Operating temperature", "−20°C to +60°C", "Better high-temp performance than VRLA"],
          ["BMS requirement", "Mandatory", "More complex BMS than VRLA"],
          ["Upfront cost", "2–3× VRLA", "TCO often better over 10 years"],
        ]}
      />

      <h3 id="nmc-battery" style={S.h3}>NMC — Nickel Manganese Cobalt</h3>

      <p style={S.p}>
        NMC offers higher energy density than LFP but with higher thermal runaway risk — it is
        used primarily in EVs, not typically recommended for Data Center battery rooms unless very
        space-constrained and proper NFPA 855-compliant suppression is in place.
      </p>

      <ComparisonTable
        headers={["Parameter", "LFP", "NMC"]}
        rows={[
          ["Energy density", "Moderate (~120–160 Wh/kg)", "High (~200–300 Wh/kg)"],
          ["Safety", "Better — stable cathode, low thermal runaway propagation", "Lower — thermal runaway propagation risk"],
          ["Cycle life", "3000–5000+ cycles", "1000–2000 cycles typically"],
          ["Temperature range", "Better", "More sensitive to high temperature"],
          ["Data Center use", "Recommended", "Possible but requires enhanced fire safety"],
          ["Fire suppression", "Clean agent typically sufficient", "Specialized system per NFPA 855 / AHJ"],
        ]}
      />

      <h3 id="sodium-ion" style={S.h3}>Sodium-Ion Batteries</h3>

      <p style={S.p}>
        Sodium-ion technology lithium ki jagah sodium ions use karta hai. Potential advantages:
        sodium abundant aur cheap hai (unlike lithium), no cobalt, potentially lower cost at scale.
        Commercial examples exist (CATL started commercial production in 2023), lekin energy
        density abhi LFP se kam hai.
      </p>

      <Callout type="important" title="Important — Sodium-Ion: Watch List, Not Buy List Yet">
        2025–2026 mein sodium-ion Data Center backup power ke liye ready nahi hai — insufficient
        track record, limited Data Center-specific products, uncertain 10-year warranties. Yeh
        technology 2028–2032 mein relevant ho sakti hai. Abhi ke liye: monitor karein, VRLA ya
        LFP use karein.
      </Callout>

      <h3 id="flow-batteries" style={S.h3}>Flow Batteries — Vanadium Redox & Zinc-Bromine</h3>

      <p style={S.p}>
        Flow batteries mein energy liquid electrolyte mein stored hoti hai (separate tanks se pump
        ki jaati hai through an electrochemical cell). Power aur energy completely decoupled hain —
        zyada runtime chahiye? Bigger tanks add karo. Zyada power? Bigger electrochemical stack.
      </p>

      <p style={S.p}>
        Vanadium Redox Flow Battery (VRFB) most mature technology hai. Advantages: theoretically
        unlimited cycles, long duration (4–12 hours) economical, no capacity degradation. Disadvantages:
        large footprint, complex plumbing, high upfront cost, low energy density.
      </p>

      <Callout type="best-practice" title="Best Practice — Flow Battery: Only for Long-Duration BESS">
        Flow battery UPS bridging ke liye nahi hai — response time milliseconds mein chahiye wahan.
        Flow battery ka application hai long-duration energy storage (BESS) — peak shaving, renewable
        integration, grid services. Agar Data Center mein 4+ hour backup chahiye (generator-free
        operation), tab flow battery relevant hoti hai. Short-duration UPS: VRLA ya LFP.
      </Callout>

      <h3 id="supercapacitors" style={S.h3}>Supercapacitors (Ultracapacitors)</h3>

      <p style={S.p}>
        Supercapacitors batteries ki tarah energy store nahi karte — woh electrostatic charge store
        karte hain. Yeh extremely fast charge aur discharge karte hain (milliseconds), near-infinite
        cycle life dete hain, lekin energy density bahut kam hai — seconds, not minutes of backup.
      </p>

      <ComparisonTable
        headers={["Parameter", "Supercapacitor", "VRLA Battery", "LFP Battery"]}
        rows={[
          ["Energy density", "Very low (1–10 Wh/kg)", "30–40 Wh/kg", "120–160 Wh/kg"],
          ["Power density", "Very high (1000s W/kg)", "100–300 W/kg", "300–1500 W/kg"],
          ["Response time", "Milliseconds", "Milliseconds (online UPS)", "Milliseconds"],
          ["Discharge duration", "Seconds", "Minutes to hours", "Minutes to hours"],
          ["Cycle life", "500,000+ cycles", "300–500 cycles", "3000–5000 cycles"],
          ["Use in Data Centers", "Bridging (sub-second to seconds)", "Standard UPS backup", "Standard UPS backup"],
        ]}
      />

      <p style={S.p}>
        Supercapacitors Data Center mein typically battery ke supplement ke roop mein use hote hain —
        very fast transients handle karte hain jabki battery voltage stabilize hoti hai. Standalone
        UPS backup ke liye sufficient nahi hain.
      </p>

      <h3 id="flywheel-vs-battery" style={S.h3}>Flywheel Energy Storage vs Battery</h3>

      <p style={S.p}>
        Flywheel ek mechanical energy storage device hai — motor/generator assembly ek heavy rotating
        mass (flywheel) ko high speed pe rotate karta hai. Energy kinetic energy ke roop mein stored
        hoti hai. Power failure pe flywheel generator mode mein switch hoti hai, electrical power
        deliver karta hai.
      </p>

      <ComparisonTable
        headers={["Parameter", "Flywheel UPS", "Battery Bank (VRLA/LFP)"]}
        rows={[
          ["Energy storage", "Kinetic (rotating mass)", "Chemical (electrochemical)"],
          ["Discharge duration", "10–60 seconds", "Minutes to hours"],
          ["Efficiency (round-trip)", "85–95%", "75–85%"],
          ["Life", "20+ years", "VRLA: 3–5 yr; LFP: 10–15 yr"],
          ["Maintenance", "Annual bearing inspection", "Regular testing, battery replacement"],
          ["Temperature sensitivity", "None — mechanical device", "High (VRLA), Moderate (LFP)"],
          ["Footprint", "Compact for energy stored", "Larger for equivalent runtime"],
          ["Best application", "Short-duration bridging (DG startup)", "Short to medium duration backup"],
          ["Typical Data Center use", "Replace UPS battery for short DG-start gap", "Standard UPS backup solution"],
        ]}
      />

      <Callout type="interview" title="Interview Tip — Flywheel vs Battery">
        &quot;Flywheel UPS battery UPS se better hai?&quot; — Answer: depends on requirement.
        Flywheel excellent hai short-duration (sub-1 minute) bridging ke liye — no batteries to
        replace, very long life, no temperature issues. Lekin 10+ minutes of runtime chahiye toh
        battery bank hi solution hai. Kai large Data Centers dono use karte hain: flywheel for
        immediate response, battery bank for extended runtime.
      </Callout>

      {/* ═══════════════════════════════════════════════════════════════
          2.10 — TECHNOLOGY COMPARISON MASTER TABLE
      ═══════════════════════════════════════════════════════════════ */}
      <h2 id="technology-comparison" style={S.h2}>Technology Comparison Master Table</h2>

      <p style={S.p}>
        Sab technologies ek jagah compare karna implementation decision ke liye essential hai.
        Yeh table Blueprint v3.0 Table #1 hai — 15 parameters across all major technologies.
      </p>

      <ComparisonTable
        headers={["Parameter", "VRLA AGM", "VRLA Gel", "VLA (Flooded)", "LFP", "NMC", "Supercap", "Flywheel"]}
        rows={[
          ["Nominal voltage (cell)", "2V / 12V mono", "2V / 12V mono", "2V", "3.2V", "3.6V", "2.7V", "N/A — kinetic"],
          ["Energy density (Wh/kg)", "30–40", "25–35", "25–35", "120–160", "200–300", "1–10", "5–30"],
          ["Usable DoD", "80%", "80%", "80%", "90%", "90%", "90%+", "80%"],
          ["Cycle life", "300–500", "400–600", "1500–2000+", "3000–5000+", "1000–2000", "500,000+", "Unlimited"],
          ["Design life", "3–5 years", "4–6 years", "15–20+ years", "10–15 years", "8–12 years", "20+ years", "20+ years"],
          ["Thermal runaway risk", "Low", "Low", "Low (gassing)", "Very low", "Moderate–High", "None", "None"],
          ["Maintenance", "Minimal", "Minimal", "High", "Minimal + BMS", "Minimal + BMS", "None", "Annual bearing"],
          ["Upfront cost (relative)", "1× (baseline)", "1.1×", "0.8×", "2.5–3×", "3–4×", "5–10×", "4–8×"],
          ["10-yr TCO (relative)", "High (replacements)", "High", "Medium", "Lower", "Medium", "Low", "Low"],
          ["Weight (relative)", "Heavy (baseline)", "Heavy", "Heaviest", "70% lighter", "50% lighter", "Light", "Moderate"],
          ["Temperature sensitivity", "High", "Moderate", "Moderate", "Low", "Moderate", "None", "None"],
          ["BMS complexity", "Simple", "Simple", "Simple", "Complex", "Very complex", "None", "None"],
          ["Fire suppression", "Clean agent", "Clean agent", "Clean agent", "Clean agent", "Specialized", "None", "None"],
          ["Data Center readiness", "★★★★★", "★★★★", "★★★", "★★★★★", "★★★", "★★★ (supplement)", "★★★★"],
          ["India availability", "Excellent", "Good", "Good", "Growing", "Limited", "Limited", "Very limited"],
        ]}
      />
    </>
  );
}
