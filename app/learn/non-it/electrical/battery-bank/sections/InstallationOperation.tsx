"use client";

// ═══════════════════════════════════════════════════════════════════════════
// app/learn/non-it/electrical/battery-bank/sections/InstallationOperation.tsx
//
// Part 15 — Battery Failure Gallery (Blueprint v3.0 Part 15)
// Part 16 — Installation & Commissioning (Blueprint v3.0 Part 16)
// Part 17 — Operation (Blueprint v3.0 Part 17)
// Heading IDs: failure-gallery, installation-commissioning, operation
// ═══════════════════════════════════════════════════════════════════════════

import { S, Callout, ComparisonTable, SectionIntro } from "../shared";

export default function InstallationOperation() {
  return (
    <>
      {/* ═══════════════════════════════════════════════════════════════
          PART 15 — BATTERY FAILURE GALLERY
      ═══════════════════════════════════════════════════════════════ */}

      <h2 id="failure-gallery" style={S.h2}>Battery Failure Gallery</h2>

      <SectionIntro
        quickAnswer="Battery failures are not always sudden — there are physical signs that warn weeks and months in advance. This section explains every common failure mode — what it looks like, what causes it, and what should be done."
        engineerTip="In the monthly visual inspection routine, use a flashlight and deliberately spend 3 seconds on each cell. A swollen case, corrosion and leakage are initially very subtle — rushing through the inspection means missing early warning signs. Take photos for comparison over time."
        keyTakeaway="Visual inspection is free and takes 30 minutes — the consequence of one missed early warning sign can be a 200,000+ rupee emergency replacement."
      />

      <ComparisonTable
        headers={["Failure Sign", "What It Looks Like", "Likely Cause", "Immediate Action"]}
        rows={[
          ["Swollen / Bloated Case", "Battery case visibly distorted, sides bulging outward", "Overcharge, overtemperature, internal gas buildup", "DO NOT charge/discharge — isolate string, contact OEM, safe disposal"],
          ["Terminal Corrosion", "White/blue crystalline deposits on terminals or intercell connectors", "Electrolyte vapour, poor connection, humidity", "Clean with baking soda solution + distilled water, dry, re-torque, seal with anti-corrosion compound"],
          ["Loose Lug", "Cable lug not fully seated on terminal, visible gap or movement", "Under-torque during installation, vibration", "Re-crimp if possible, replace lug if damaged, re-torque to spec"],
          ["Melted Terminal", "Terminal post discoloured, deformed, plastic housing burnt", "Sustained high-resistance joint from loose connection or overcurrent", "Replace affected cell immediately — internal damage likely"],
          ["Burnt / Blown Fuse", "Fuse element melted, visual blackening on fuse body", "String fault, short circuit, sustained overcurrent", "Find and fix root cause BEFORE replacing fuse — fuse did its job"],
          ["Thermal Hotspot (IR)", "Infrared camera shows one cell significantly hotter than neighbours", "High internal resistance, loose connection, developing internal short", "Investigate immediately — schedule replacement if cell, check torque if connection"],
          ["Cracked Case", "Physical crack in battery plastic housing", "Physical impact, over-torquing, thermal stress", "Isolate immediately — acid leak risk even in VRLA"],
          ["Leaking Battery", "Acid residue on rack/shelf below battery, white deposits, corrosion on metal", "Cracked case, over-filled VLA, VRLA pushed beyond PRV limit", "PPE on, isolate, neutralize with baking soda, dispose per hazardous waste protocol"],
          ["Arc Damage", "Carbon scoring on terminal or bus bar, melted copper", "Arcing from loose connection during high current, wrong tool used", "Complete electrical inspection of affected section — may need bus bar replacement"],
          ["Carbon Tracking", "Black carbon deposit trails on battery cabinet surfaces", "Repeated low-level arcing, contaminated surfaces", "Deep clean, inspect for recurring arc source, check insulation"],
          ["Sulphation (Lead-Acid)", "White crystalline deposits visible if VLA vent cap opened; high impedance with normal voltage in VRLA", "Deep discharge, PSOC operation, undercharge", "Early stage: equalisation charge may help. Advanced: replace battery"],
          ["Plate Shedding (VLA)", "Dark sediment visible at bottom of cell through transparent case", "Deep cycling, age, plate corrosion", "Reduced capacity — plan replacement, avoid agitation of sediment"],
        ]}
      />

      <Callout type="danger" title="Danger — Never Use Water on Lithium Battery Fire">
        In a VRLA fire, use CO₂ or a clean agent — water reacts with the electrolyte. In a Li-ion fire, water can produce hydrogen gas in some cases — use specialized Li-ion suppression or a controlled cooling approach per NFPA 855 and fire department guidance. Do not fight a battery fire yourself — evacuate, call the fire department.
      </Callout>

      {/* ═══════════════════════════════════════════════════════════════
          PART 16 — INSTALLATION & COMMISSIONING
      ═══════════════════════════════════════════════════════════════ */}

      <h2 id="installation-commissioning" style={S.h2}>Installation & Commissioning</h2>

      <SectionIntro
        quickAnswer="Battery bank installation is not just placing batteries on a rack — it is a structured 8-step process in which everything from receiving inspection to the commissioning capacity test must be documented. This documentation is essential for future warranty claims and maintenance."
        engineerTip="The most important commissioning step that mostly gets skipped: formation charge (initial charge). New VRLA batteries ship from the factory at partial charge. If you connect them directly to the UPS without a proper initial charge, the battery will never achieve its rated capacity. Always follow OEM's initial charge procedure before connecting to UPS."
        keyTakeaway="Commissioning documentation = warranty evidence + maintenance baseline + future replacement planning — without documentation, all of this becomes anecdotal."
      />

      <h3 style={S.h3}>Step 1 — Battery Receiving & Inspection</h3>

      <p style={S.p}>
        When batteries arrive, do a visual inspection first, before accepting delivery. Shipping damage is common — internal damage is possible in heavy VRLA cells even if there is no visible external damage.
      </p>

      <ComparisonTable
        headers={["Receiving Checklist Item", "Check", "If Failed"]}
        rows={[
          ["Packing damage", "External packing intact, no crushing, no moisture", "Photograph, document, raise with supplier before accepting"],
          ["Battery count", "Count matches delivery note and PO", "Document discrepancy immediately"],
          ["Date code check", "Manufacturing date within 6 months (VRLA) or per OEM spec (Li-ion)", "Old stock can have reduced initial capacity — negotiate with supplier"],
          ["Open circuit voltage (OCV)", "Measure each cell. VRLA AGM 2V: typically 2.05–2.15V if recently charged", "Low OCV = over-discharged during storage — get OEM guidance"],
          ["Physical damage inspection", "Check each cell: no cracks, no bulging, terminal intact", "Reject damaged cells before installation"],
          ["Documentation", "Datasheet, test certificates, warranty card", "Do not proceed without documentation"],
        ]}
      />

      <h3 style={S.h3}>Step 2 — Battery Room Readiness</h3>

      <p style={S.p}>
        The room must be ready before the batteries go into it — this seems like common sense, but it is frequently violated in the field.
      </p>

      <ul style={S.ul}>
        <li>HVAC commissioned and at the target temperature — the batteries' first week is temperature sensitive</li>
        <li>Ventilation working and H₂ sensor commissioned</li>
        <li>Rack anchoring verified by structural/civil team</li>
        <li>Earthing system verified — earth resistance measured and documented</li>
        <li>DC cabling routed and terminated (but battery side disconnected)</li>
        <li>PPE available at room entry — gloves, face shield, insulated tools</li>
      </ul>

      <h3 style={S.h3}>Step 3 — Installation Sequence — Safe Energisation Order</h3>

      <Callout type="danger" title="Danger — Always Start from Negative Terminal">
        Battery installation sequence: connect the negative terminal first, the positive terminal after. For removal, the opposite — disconnect positive first, negative after. This is different from AC work. In DC systems, an accidental path from the positive terminal to earth causes severe arcing — the negative-first sequence minimizes this risk.
      </Callout>

      <ComparisonTable
        headers={["Installation Step", "Action", "Verify"]}
        rows={[
          ["1", "Place batteries on rack — handle with proper equipment (battery trolley for large cells)", "No cell dropped, proper orientation (vent up for VLA)"],
          ["2", "Connect intercell connectors within each string — torque to OEM spec", "Torque wrench used, values recorded per IEEE 1187"],
          ["3", "Negative terminal of string to negative bus — DO NOT connect to UPS yet", "String isolated from UPS DC bus"],
          ["4", "Positive terminal of string to positive bus", "String still isolated from UPS via string fuse out"],
          ["5", "Verify string polarity with voltmeter before inserting fuse", "String voltage = N_cells × OCV (tolerance ±2%)"],
          ["6", "Insert string fuse (one string at a time)", "Fuse inserted only after polarity verified"],
          ["7", "Repeat for all strings", "All strings verified and fused"],
          ["8", "Initial formation charge — DO NOT connect to UPS inverter yet", "Per OEM initial charge procedure"],
        ]}
      />

      <h3 style={S.h3}>Step 4 — Formation Charge (VRLA)</h3>

      <p style={S.p}>
        VRLA batteries ship from the factory partially discharged. The formation charge (initial charge) achieves rated capacity and brings the battery into an active state.
      </p>

      <ComparisonTable
        headers={["Formation Charge Step", "Typical Parameters", "Duration"]}
        rows={[
          ["Constant Current (CC) phase", "0.1C rate (e.g., 10A for 100Ah battery)", "Until voltage reaches boost voltage"],
          ["Constant Voltage (CV) phase", "At boost voltage (2.33–2.40V/cell)", "Until current drops to < 0.02C"],
          ["Float voltage", "Switch to float (2.25–2.27V/cell)", "24 hours minimum before load connection"],
          ["Total formation time", "Typically 16–24 hours", "Per OEM datasheet exactly"],
        ]}
      />

      <Callout type="important" title="Important — Li-ion Formation Is Different">
        Li-ion batteries typically ship fully charged and do not require formation charging. Follow OEM procedure exactly — some Li-ion systems require a specific commissioning sequence through the BMS before connecting to UPS. Never assume lead-acid procedure applies to Li-ion.
      </Callout>

      <h3 style={S.h3}>Step 5 — Commissioning Tests</h3>

      <ComparisonTable
        headers={["Commissioning Test", "Method", "Pass Criterion"]}
        rows={[
          ["DC bus voltage verification", "Voltmeter across UPS DC bus terminals", "Within ±0.5% of OEM specified bus voltage"],
          ["Float voltage per string", "Voltmeter across each string", "Within OEM spec ±0.02V/cell"],
          ["Float voltage per cell (sample)", "Spot check 20% of cells", "All within ±0.05V of string average"],
          ["Initial capacity test", "Discharge at rated C-rate to cutoff voltage, measure Ah", "≥ 100% of rated Ah (new batteries should give full capacity)"],
          ["BMS alarm test", "Simulate threshold violations", "All alarms trigger at configured values"],
          ["Earthing verification", "Earth resistance measurement", "Per IS 3043 — typically < 1 Ohm"],
          ["H₂ sensor test", "Introduce calibration gas at sensor", "Alarm triggers at 10% LEL"],
          ["Emergency disconnect test", "Test EBD operation", "Disconnects within specified time"],
        ]}
      />

      {/* ═══════════════════════════════════════════════════════════════
          PART 17 — OPERATION
      ═══════════════════════════════════════════════════════════════ */}

      <h2 id="operation" style={S.h2}>Operation</h2>

      <SectionIntro
        quickAnswer="Normal operation of a battery bank looks deceptively simple — batteries stay on float, no action required. This is not true. Even in normal operation, monitoring, charging parameter verification, temperature management and periodic equalisation are required."
        engineerTip="The operator should build one simple habit: a weekly 15-minute walk-through of the battery room. Look, smell, listen. An overcharging battery gives off a slight acid smell. A swollen cell will be visible. A cooling fan will make an unusual noise. This 15-minute walk-through can give more early-warning value than an annual capacity test."
        keyTakeaway="Battery operation = maintaining float voltage + temperature control + monthly monitoring + prompt response to abnormal events — everything else is secondary."
      />

      <h3 style={S.h3}>Normal Float Operation</h3>

      <p style={S.p}>
        When the grid is available, the rectifier continuously powers the DC bus and maintains the battery's float charge. The battery is fully charged, but a small float current (typically &lt;0.5% of Ah rating) keeps flowing — this is normal.
      </p>

      <p style={S.p}>
        The job of the float current is: to compensate for self-discharge, and to sustain the oxygen recombination cycle (in VRLA). This current is not zero — if it is zero, check for a charger fault.
      </p>

      <h3 style={S.h3}>Discharge Event — What Actually Happens</h3>

      <p style={S.p}>
        On grid failure, the rectifier output instantly goes to zero. DC bus voltage drops slightly — the battery bank automatically starts supporting this voltage. No switching is needed — in an online double conversion UPS this transition is completely seamless.
      </p>

      <ComparisonTable
        headers={["Phase", "Duration", "What Happens"]}
        rows={[
          ["Initial surge (0–100ms)", "Milliseconds", "Battery provides full load current — largest current draw"],
          ["Stable discharge", "Minutes", "Current stabilizes at load-dependent level — voltage slowly drops"],
          ["End of discharge warning", "When battery reaches 80% DoD", "BMS alarm, UPS alarm — if DG not started yet, this is critical"],
          ["DG start + transfer", "10–30 seconds from grid failure", "DG output synchronized, rectifier restores DC bus, battery stops discharging"],
          ["Recharge begins", "Immediately after rectifier restores", "CC charge at 0.1–0.25C until battery full — typically 8–16 hours for full recharge"],
        ]}
      />

      <h3 style={S.h3}>Recharge After Discharge</h3>

      <p style={S.p}>
        The recharge time after a discharge event is important. After a 10-minute discharge, VRLA takes 8–12 hours to fully recharge at the standard 0.1C charge rate. If another grid failure happens in these 8–12 hours, the battery will not give full capacity.
      </p>

      <Callout type="important" title="Important — Second Outage Risk Window">
        For 8–12 hours after a discharge event, the battery is only partially charged. In this window: (1) DG Set must be kept running even if grid restores, (2) Notify NOC that battery is in recharge — reduced backup time available, (3) Consider load reduction if possible during recharge. Many sites have SOPs for &quot;battery recharge watch period&quot;.
      </Callout>

      <h3 style={S.h3}>Equalisation Charging — When and How</h3>

      <p style={S.p}>
        An equalisation charge is applied periodically at a voltage higher than float to balance cells. For VRLA AGM: 2.33–2.40V/cell for 1–4 hours maximum, as per OEM schedule (typically monthly or quarterly).
      </p>

      <Callout type="warning" title="Warning — Over-Equalisation Damages VRLA">
        Never leave equalisation unmonitored. Do not exceed the duration in the OEM specification — there is a risk of electrolyte dry-out in the AGM mat if equalisation continues too long. The equalisation procedure is different for Gel batteries — specifically follow the Gel OEM datasheet. LFP does not need equalisation.
      </Callout>

      <h3 style={S.h3}>Temperature Compensation of Charge Voltage</h3>

      <p style={S.p}>
        Charger float voltage should adjust with temperature. Typical coefficient for VRLA: <strong>−3 to −4 mV per cell per °C above 25°C</strong>.
      </p>

      <ComparisonTable
        headers={["Ambient Temperature", "Adjustment (per cell)", "Effect on 192V Bank (96 cells 2V)"]}
        rows={[
          ["15°C (10°C below ref)", "+30–40 mV per cell", "+2.88–3.84V increase on total bank voltage"],
          ["25°C (reference)", "0", "No adjustment — nominal float"],
          ["35°C (10°C above ref)", "−30–40 mV per cell", "−2.88–3.84V reduction — prevents overcharge"],
          ["45°C (20°C above ref)", "−60–80 mV per cell", "−5.76–7.68V reduction — critical for India summer"],
        ]}
      />

      <p style={S.p}>
        If the charger has no temperature compensation module, or it is disabled, there will be chronic overcharge in the Indian summer (40–45°C battery room) — the most common premature failure cause for Indian Data Centers.
      </p>
    </>
  );
}
