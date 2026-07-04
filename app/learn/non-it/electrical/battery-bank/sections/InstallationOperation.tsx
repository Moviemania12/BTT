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
        quickAnswer="Battery failures hamesha sudden nahi hoti — physical signs hote hain jo weeks aur months pehle warn karte hain. Yeh section har common failure mode explain karta hai — kaise dikhti hai, kya cause karta hai, aur kya karna chahiye."
        engineerTip="Monthly visual inspection routine mein ek flashlight use karo aur har cell pe deliberately 3 seconds spend karo. Swollen case, corrosion, aur leakage initially very subtle hote hain — rushing through inspection means missing early warning signs. Take photos for comparison over time."
        keyTakeaway="Visual inspection free hai aur 30 minutes leta hai — ek missed early warning sign ka consequence 200,000+ rupee emergency replacement ho sakti hai."
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
        VRLA fire mein CO₂ ya clean agent use karo — pani electrolyte ke saath react karta hai.
        Li-ion fire mein pani kuch cases mein hydrogen gas produce kar sakta hai — specialized
        Li-ion suppression ya controlled cooling approach use karo per NFPA 855 aur fire
        department guidance. Battery fire mein khud mat laro — evacuate, call fire department.
      </Callout>

      {/* ═══════════════════════════════════════════════════════════════
          PART 16 — INSTALLATION & COMMISSIONING
      ═══════════════════════════════════════════════════════════════ */}

      <h2 id="installation-commissioning" style={S.h2}>Installation & Commissioning</h2>

      <SectionIntro
        quickAnswer="Battery bank installation sirf batteries rack pe rakhna nahi hai — ek structured 8-step process hai jisme receiving inspection se commissioning capacity test tak sab kuch documented hona chahiye. Yeh documentation future warranty claims aur maintenance ke liye essential hai."
        engineerTip="Sabse important commissioning step jo mostly skip hota hai: formation charge (initial charge). New VRLA batteries factory mein partial charge pe ship hoti hain. Agar tum direct UPS se connect karo bina proper initial charge ke, battery rated capacity kabhi achieve nahi karegi. Always follow OEM's initial charge procedure before connecting to UPS."
        keyTakeaway="Commissioning documentation = warranty evidence + maintenance baseline + future replacement planning — bina documentation ke, yeh sab anecdotal ho jaata hai."
      />

      <h3 style={S.h3}>Step 1 — Battery Receiving & Inspection</h3>

      <p style={S.p}>
        Batteries arrive karne pe pehle visual inspection karo before accepting delivery.
        Shipping damage common hai — heavy VRLA cells mein internal damage possible hai even
        agar external visible damage na ho.
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
        Batteries room mein jaane se pehle room ready hona chahiye — yeh common sense lagta hai
        lekin field mein frequently violated hota hai.
      </p>

      <ul style={S.ul}>
        <li>HVAC commissioned aur temperature target pe — batteries ka first week temperature sensitive hai</li>
        <li>Ventilation working aur H₂ sensor commissioned</li>
        <li>Rack anchoring verified by structural/civil team</li>
        <li>Earthing system verified — earth resistance measured aur documented</li>
        <li>DC cabling routed aur terminated (but battery side disconnected)</li>
        <li>PPE available at room entry — gloves, face shield, insulated tools</li>
      </ul>

      <h3 style={S.h3}>Step 3 — Installation Sequence — Safe Energisation Order</h3>

      <Callout type="danger" title="Danger — Always Start from Negative Terminal">
        Battery installation sequence: negative terminal pehle connect karo, positive terminal
        baad mein. Removal mein opposite — positive pehle disconnect karo, negative baad mein.
        Yeh AC work se different hai. DC systems mein positive terminal se earth tak accidental
        path se severe arcing hoti hai — negative-first sequence yeh risk minimize karta hai.
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
        VRLA batteries factory se partially discharged ship hoti hain. Formation charge (initial
        charge) rated capacity achieve karti hai aur battery ko active state mein laati hai.
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
        Li-ion batteries typically ship fully charged aur do not require formation charging.
        Follow OEM procedure exactly — some Li-ion systems require a specific commissioning
        sequence through the BMS before connecting to UPS. Never assume lead-acid procedure
        applies to Li-ion.
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
        quickAnswer="Battery bank ka normal operation deceptively simple lagta hai — batteries float pe rehti hain, koi action required nahi. Yeh sach nahi hai. Normal operation mein bhi monitoring, charging parameter verification, temperature management, aur periodic equalisation required hoti hai."
        engineerTip="Operator ko ek simple habit banana chahiye: battery room mein weekly 15-minute walk-through karo. Look, smell, listen. Overcharging battery se slight acid smell aati hai. Swollen cell visible hogi. Cooling fan unusual noise karega. Yeh 15-minute walk-through ek annual capacity test se zyada early-warning value de sakta hai."
        keyTakeaway="Battery operation = float voltage maintain + temperature control + monthly monitoring + prompt response to abnormal events — baaki sab secondary hai."
      />

      <h3 style={S.h3}>Normal Float Operation</h3>

      <p style={S.p}>
        Grid available hone pe rectifier continuously DC bus ko power karta hai aur battery ko
        float charge maintain karta hai. Battery fully charged hai lekin small float current
        (typically &lt;0.5% of Ah rating) flow karta rehta hai — yeh normal hai.
      </p>

      <p style={S.p}>
        Float current ka kaam hai: self-discharge compensate karna, aur
        oxygen recombination cycle (VRLA mein) ko sustain karna. Yeh current zero nahi
        hota — agar zero ho toh charger fault check karo.
      </p>

      <h3 style={S.h3}>Discharge Event — What Actually Happens</h3>

      <p style={S.p}>
        Grid failure pe rectifier output zero ho jaata hai instantly. DC bus voltage slightly
        drop hoti hai — battery bank automatically yeh voltage support karna shuru karti hai.
        Koi switch karne ki zaroorat nahi — online double conversion UPS mein yeh transition
        completely seamless hai.
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
        Discharge event ke baad recharge time important hai. VRLA 10-minute discharge ke
        baad fully recharge hone mein 8–12 hours lagti hai at standard 0.1C charge rate.
        In 8–12 hours mein agar doosra grid failure hoti hai, battery full capacity nahi degi.
      </p>

      <Callout type="important" title="Important — Second Outage Risk Window">
        Discharge event ke baad 8–12 hours tak battery only partially charged hai. Is window
        mein: (1) DG Set must be kept running even if grid restores, (2) Notify NOC that
        battery is in recharge — reduced backup time available, (3) Consider load reduction if
        possible during recharge. Many sites have SOPs for &quot;battery recharge watch period&quot;.
      </Callout>

      <h3 style={S.h3}>Equalisation Charging — When and How</h3>

      <p style={S.p}>
        Equalisation charge float se higher voltage pe periodically apply ki jaati hai to balance
        cells. VRLA AGM ke liye: 2.33–2.40V/cell for 1–4 hours maximum, as per OEM schedule
        (typically monthly or quarterly).
      </p>

      <Callout type="warning" title="Warning — Over-Equalisation Damages VRLA">
        Equalisation kabhi bhi unmonitored mat chodo. Duration OEM specification se exceed
        mat karo — AGM mat mein electrolyte dry-out ka risk hai agar equalisation too long
        continue kare. Gel batteries ke liye equalisation procedure different hoti hai —
        Gel OEM datasheet specifically follow karo. LFP ko equalisation ki zaroorat nahi.
      </Callout>

      <h3 style={S.h3}>Temperature Compensation of Charge Voltage</h3>

      <p style={S.p}>
        Charger float voltage temperature ke saath adjust hona chahiye. Typical coefficient
        for VRLA: <strong>−3 to −4 mV per cell per °C above 25°C</strong>.
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
        Agar charger mein temperature compensation module nahi hai ya disabled hai, toh
        India summer (40–45°C battery room) mein chronic overcharge hogi — sabse common
        premature failure cause for Indian Data Centers.
      </p>
    </>
  );
}
