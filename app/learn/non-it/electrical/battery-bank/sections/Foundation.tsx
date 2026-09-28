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
        quickAnswer="A battery bank is an organized collection of batteries connected in series and parallel — to deliver a specific DC voltage and capacity. In a Data Center it is the energy reservoir of the UPS."
        engineerTip="A single battery does not make a bank. We call it a 'battery bank' only when multiple batteries are in an intentional architecture — with a specific voltage (series) and a specific runtime capacity (parallel). A 12V monobloc is a battery; 16 of them in series at 192V DC is a string; 3 such strings in parallel is a battery bank."
        keyTakeaway="Battery bank = Series (voltage) + Parallel (capacity) — combining these two operations creates a complete energy storage system."
      />

      <p style={S.p}>
        Imagine 500 servers are running in a Data Center. Grid power is suddenly cut. The DG Set takes 15–20 seconds to start. In those 15–20 seconds the servers need power — otherwise crash, data loss, SLA breach. This exact gap is covered by the <strong>battery bank</strong>.
      </p>

      <p style={S.p}>
        A battery bank is not simply a collection of batteries — it is an engineered system. Every battery's position, orientation, connection torque, fusing and monitoring is deliberately designed. In a wrong design, one weak cell can make the whole bank fail exactly when it is needed.
      </p>

      <Callout type="important" title="Important — Battery Bank ≠ UPS Battery">
        Many people think the battery inside a UPS and a battery bank are different things. Actually, what is inside the UPS is also a battery bank — only the terminology and scale differ. A small UPS has an internal battery bank. A large Data Center UPS has an <strong>external battery bank</strong> — in a separate room, engineered and monitored. This article is about that external battery bank.
      </Callout>

      {/* ═══════════════════════════════════════════════════════════════
          1.2 — WHY BATTERY BANK EXISTS
      ═══════════════════════════════════════════════════════════════ */}
      <h2 id="why-battery-bank-exists" style={S.h2}>Why Battery Bank Exists in a Data Center</h2>

      <p style={S.p}>
        A simple question — if the <TopicLink slug="dg-set" variant="inline" /> already provides backup power, why is a battery bank needed?
      </p>

      <p style={S.p}>
        Answer: <strong>timing</strong>. The DG Set takes 10–30 seconds to start. Even more time to stabilize. In this window the <TopicLink slug="ups" variant="inline" /> provides power from the battery. The battery bank is the energy reservoir that covers this window.
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
        Battery bank runtime is typically sized for 10–15 minutes — more than the DG startup time (30 sec). The buffer is so that if the DG fails, there is time for manual intervention, or a second DG can be started. In hospitals and critical facilities, 30–60 minute runtime is standard.
      </Callout>

      {/* ═══════════════════════════════════════════════════════════════
          1.3 — POWER CHAIN POSITION
      ═══════════════════════════════════════════════════════════════ */}
      <h2 id="power-chain-position" style={S.h2}>Where It Sits in the Power Chain</h2>

      <Figure caption="Fig 1 — Data Center Power Chain: Battery Bank is connected to the UPS DC Bus, bridging grid failure and DG startup">
        <PowerChainDiagram />
      </Figure>

      <p style={S.p}>
        The battery bank is connected to the DC Bus inside the UPS. When the grid is available, the <strong>rectifier</strong> converts AC into DC — this powers the DC bus and float-charges the battery simultaneously. When the grid fails, the battery bank instantly powers the DC bus — the inverter converts it into AC and the load continues. The transition is so fast that the servers do not even notice.
      </p>

      <p style={S.p}>
        Power chain order: <strong>Grid → Transformer → UPS Rectifier → DC Bus (← Battery Bank) → UPS Inverter → PDU → Rack → Servers</strong>. The battery bank is always connected to the DC Bus — it is not "parked". It stays on float charge, ready to supply the moment the grid drops.
      </p>

      {/* ═══════════════════════════════════════════════════════════════
          1.4 — BATTERY BANK vs UPS BATTERY
      ═══════════════════════════════════════════════════════════════ */}
      <h2 id="battery-bank-vs-ups-battery" style={S.h2}>Battery Bank vs UPS Battery — Same or Different?</h2>

      <p style={S.p}>
        Short answer: same concept, different scale and location. Both have batteries, both store DC power, both are connected to the UPS DC bus.
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
        The evolution of Data Center battery technology has a direct relationship with IT load growth. As Data Centers grew larger, battery requirements also evolved.
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
        Common question: &quot;Main difference between VRLA and VLA?&quot; Answer: VRLA is sealed — valve regulated, electrolyte absorbed in glass mat (AGM) or gel. No free electrolyte. No water topping. No dedicated acid-resistant floor. Less H₂ in normal operation. Maintenance-free = lower OPEX. VLA is still used where very long life or high temperature tolerance is needed (telecom, railways), but in the Data Center VRLA is the standard.
      </Callout>

      {/* ═══════════════════════════════════════════════════════════════
          PART 2 — BATTERY TECHNOLOGIES
      ═══════════════════════════════════════════════════════════════ */}

      <h2 id="battery-technology-overview" style={S.h2}>Battery Technology Landscape</h2>

      <SectionIntro
        quickAnswer="In the Data Center only VRLA and LFP are relevant right now — the other technologies are either niche use cases or still emerging. Understanding the chemistry, strengths and tradeoffs of both is the foundation for the selection decision."
        engineerTip="Technology selection should always be driven by total cost of ownership (TCO), not just upfront cost. VRLA looks cheap upfront, but has to be replaced in 3–5 years. LFP is expensive upfront but should last 10–15 years. Over 10 years, TCO is often in favour of LFP — show this calculation in the project proposal."
        keyTakeaway="For Data Centers today: VRLA for budget-constrained or regulated applications; LFP for TCO-optimised, space-constrained, or high-cycle applications."
      />

      <h3 id="lead-acid-chemistry" style={S.h3}>Lead Acid Chemistry — How It Works</h3>

      <p style={S.p}>
        The basic electrochemistry of the lead acid battery has been in use since 1859 — the invention of Gaston Planté. The principle is simple: lead (Pb) and lead dioxide (PbO₂) plates are immersed in sulfuric acid electrolyte (H₂SO₄).
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
        If a battery stays deeply discharged or operates in PSOC (Partial State of Charge), PbSO₄ crystals become large and hard — they do not dissolve on recharge. This is sulphation — the most common premature failure mode of VRLA. Prevention: never leave a battery deeply discharged; always recharge promptly after any discharge event.
      </Callout>

      <h3 id="vrla-agm" style={S.h3}>VRLA AGM — Absorbed Glass Mat</h3>

      <Figure caption="Fig 2 — VRLA AGM Cell Anatomy: plates, AGM separator, pressure relief valve, and the oxygen recombination cycle that makes it maintenance-free">
        <VrlaAgmAnatomyDiagram />
      </Figure>

      <p style={S.p}>
        AGM = Absorbed Glass Mat. A fine glass fibre mat absorbs the electrolyte — there is no free liquid. This is the reason VRLA is sealed and spillproof.
      </p>

      <p style={S.p}>
        The key innovation of AGM is the <strong>oxygen recombination cycle</strong>: during charging, O₂ gas is generated at the positive plate → diffuses through the glass mat to the negative plate → recombines at the negative plate → back to water. This cycle is ~95–99% efficient in normal conditions — which is why water topping is not needed.
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
        In a gel battery, silica (SiO₂) is mixed into the electrolyte — it becomes a thick gel that does not leak. It is more robust than AGM in high-temperature environments and better for deep cycling.
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
        The float voltages of AGM and Gel are different. Charging a Gel battery at AGM voltage overcharges it — irreversible damage. Always verify the OEM datasheet for the exact float voltage before connecting to an existing charger. A mixed string (AGM + Gel) is never allowed.
      </Callout>

      <h3 id="vla-flooded" style={S.h3}>VLA — Vented / Flooded Lead Acid</h3>

      <p style={S.p}>
        VLA (Vented Lead Acid) — the oldest technology. It has free liquid electrolyte, and H₂ and O₂ gas can escape through the vent caps. This is deliberate — for overcharge control and plate longevity.
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
        VLA is relatively rare in the Data Center because dedicated acid management, ventilation and maintenance overhead increase OPEX. But where very long life (15+ years) is needed and maintenance resources are available, VLA is still viable.
      </p>

      <h3 id="lithium-chemistry" style={S.h3}>Lithium Chemistry — How It Works</h3>

      <p style={S.p}>
        In Lithium-ion batteries, lithium ions move between the cathode and anode during charge/discharge. Unlike lead acid, there is no electrolyte consumption, no gassing in normal operation, and energy density is significantly higher.
      </p>

      <p style={S.p}>
        Two main lithium chemistries are relevant in the Data Center: <strong>LFP (Lithium Iron Phosphate)</strong> and <strong>NMC (Nickel Manganese Cobalt)</strong>. Their characteristics are significantly different — the selection matters.
      </p>

      <h3 id="lfp-battery" style={S.h3}>LFP — Lithium Iron Phosphate</h3>

      <p style={S.p}>
        LFP chemistry is the most suitable lithium option for data centers — excellent safety profile (no thermal runaway propagation in most scenarios), long cycle life, wide temperature range and growing commercial availability.
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
        Sodium-ion technology uses sodium ions in place of lithium. Potential advantages: sodium is abundant and cheap (unlike lithium), no cobalt, potentially lower cost at scale. Commercial examples exist (CATL started commercial production in 2023), but energy density is currently lower than LFP.
      </p>

      <Callout type="important" title="Important — Sodium-Ion: Watch List, Not Buy List Yet">
        In 2025–2026, sodium-ion is not ready for Data Center backup power — insufficient track record, limited Data Center-specific products, uncertain 10-year warranties. This technology may become relevant in 2028–2032. For now: monitor it, use VRLA or LFP.
      </Callout>

      <h3 id="flow-batteries" style={S.h3}>Flow Batteries — Vanadium Redox & Zinc-Bromine</h3>

      <p style={S.p}>
        In flow batteries, energy is stored in liquid electrolyte (pumped from separate tanks through an electrochemical cell). Power and energy are completely decoupled — need more runtime? Add bigger tanks. More power? A bigger electrochemical stack.
      </p>

      <p style={S.p}>
        The Vanadium Redox Flow Battery (VRFB) is the most mature technology. Advantages: theoretically unlimited cycles, economical for long duration (4–12 hours), no capacity degradation. Disadvantages: large footprint, complex plumbing, high upfront cost, low energy density.
      </p>

      <Callout type="best-practice" title="Best Practice — Flow Battery: Only for Long-Duration BESS">
        A flow battery is not for UPS bridging — a response time in milliseconds is needed there. The application of flow batteries is long-duration energy storage (BESS) — peak shaving, renewable integration, grid services. If a Data Center needs 4+ hours of backup (generator-free operation), then a flow battery becomes relevant. Short-duration UPS: VRLA or LFP.
      </Callout>

      <h3 id="supercapacitors" style={S.h3}>Supercapacitors (Ultracapacitors)</h3>

      <p style={S.p}>
        Supercapacitors do not store energy like batteries — they store electrostatic charge. They charge and discharge extremely fast (milliseconds) and give near-infinite cycle life, but energy density is very low — seconds, not minutes, of backup.
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
        In the Data Center, supercapacitors are typically used as a supplement to the battery — they handle very fast transients while the battery voltage stabilizes. They are not sufficient for standalone UPS backup.
      </p>

      <h3 id="flywheel-vs-battery" style={S.h3}>Flywheel Energy Storage vs Battery</h3>

      <p style={S.p}>
        A flywheel is a mechanical energy storage device — a motor/generator assembly rotates a heavy rotating mass (flywheel) at high speed. Energy is stored as kinetic energy. On power failure, the flywheel switches to generator mode and delivers electrical power.
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
        &quot;Is a flywheel UPS better than a battery UPS?&quot; — Answer: it depends on the requirement. A flywheel is excellent for short-duration (sub-1 minute) bridging — no batteries to replace, very long life, no temperature issues. But if 10+ minutes of runtime is needed, the battery bank is the solution. Many large Data Centers use both: flywheel for immediate response, battery bank for extended runtime.
      </Callout>

      {/* ═══════════════════════════════════════════════════════════════
          2.10 — TECHNOLOGY COMPARISON MASTER TABLE
      ═══════════════════════════════════════════════════════════════ */}
      <h2 id="technology-comparison" style={S.h2}>Technology Comparison Master Table</h2>

      <p style={S.p}>
        Comparing all technologies in one place is essential for the implementation decision. This table is Blueprint v3.0 Table #1 — 15 parameters across all major technologies.
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
