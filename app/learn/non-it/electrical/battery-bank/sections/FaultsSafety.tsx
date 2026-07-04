"use client";

// ═══════════════════════════════════════════════════════════════════════════
// app/learn/non-it/electrical/battery-bank/sections/FaultsSafety.tsx
//
// Part 20 — Common Faults & Troubleshooting (Blueprint v3.0 Part 20)
// Part 21 — Safety (Blueprint v3.0 Part 21)
// Heading IDs: common-faults, safety
// ═══════════════════════════════════════════════════════════════════════════

import { S, Callout, ComparisonTable, SectionIntro } from "../shared";

export default function FaultsSafety() {
  return (
    <>
      {/* ═══════════════════════════════════════════════════════════════
          PART 20 — COMMON FAULTS & TROUBLESHOOTING
      ═══════════════════════════════════════════════════════════════ */}

      <h2 id="common-faults" style={S.h2}>Common Faults & Troubleshooting</h2>

      <SectionIntro
        quickAnswer="Battery bank faults do categories mein aate hain: gradual degradation faults (months mein develop hote hain) aur sudden acute faults (real outage ke dauraan discover hote hain). Gradual faults testing se catch hote hain — acute faults failure se."
        engineerTip="Jab bhi battery fault investigate karo, pehle string level pe isolate karo — UPS se disconnect karo woh string. Tab cell-by-cell check karo. Kabhi bhi live string pe kaam mat karo. Even VRLA 192V DC bank se DC arc flash lethal ho sakti hai."
        keyTakeaway="Troubleshooting ka golden rule: problem ko isolate karo → diagnose karo → root cause fix karo → tab replace karo. Sirf replace karna bina root cause fix kiye same failure fir se hogi."
      />

      <ComparisonTable
        headers={["Fault", "Symptoms", "Likely Cause", "Troubleshooting Steps", "Resolution"]}
        rows={[
          [
            "Battery overheating",
            "Cell temperature > 35°C on BMS, IR camera shows hotspot",
            "Overcharge, high ambient, internal resistance rise, loose connection",
            "1. Check HVAC — room temp? 2. Check float voltage — overcharge? 3. Thermal scan — connection or cell?",
            "Fix ventilation/float voltage; if cell: isolate and replace",
          ],
          [
            "Sulphation",
            "High impedance but normal voltage; reduced capacity on test",
            "Deep discharge left unrectified, PSOC operation",
            "1. Run equalisation charge per OEM spec. 2. Re-test capacity after 48 hrs",
            "Early: equalisation may recover. Advanced: replace battery",
          ],
          [
            "Thermal runaway (VRLA)",
            "Rapid temperature rise, gassing smell, cell swelling",
            "Overcharge, charger fault, high ambient + high charge current combined",
            "1. Disconnect charger immediately. 2. Monitor temperature. 3. Evacuate if not stabilising",
            "Emergency: evacuate + fire department. Post-incident: replace bank + fix charger",
          ],
          [
            "String voltage imbalance",
            "BMS shows one string at different voltage than others",
            "One weak cell in string, mixed age, bad connection",
            "1. Per-cell voltage measurement. 2. Impedance test all cells. 3. Thermal imaging connections",
            "Fix connection if found; else identify weak cell and replace entire string",
          ],
          [
            "High impedance cell",
            "Impedance test: one cell > 1.5× baseline",
            "Plate corrosion, dry-out, sulphation, age",
            "1. Verify with second impedance measurement. 2. Check voltage under partial load",
            "If > 2× baseline: replace entire string per IEEE 1188",
          ],
          [
            "Battery not accepting charge",
            "Charge current near zero but battery at low voltage; charger shows fault",
            "Internal open circuit, BMS fault (Li-ion), severely sulphated cell",
            "1. Check BMS status (Li-ion). 2. Per-cell OCV. 3. Try controlled boost charge",
            "If Li-ion BMS fault: OEM firmware reset. If lead-acid irreversible: replace",
          ],
          [
            "DC cable short circuit",
            "String fuse blown, arc damage on cable or terminal",
            "Insulation failure, tool drop, animal ingress, improper work",
            "1. Isolate affected string via remaining fuse. 2. Inspect cable routing. 3. Hi-pot test cables",
            "Replace damaged cable; replace blown fuse only after root cause confirmed fixed",
          ],
          [
            "BMS fault codes",
            "BMS alarm: over-voltage / under-voltage / over-temp / comms loss",
            "Varies by code — see OEM manual",
            "1. Log exact code. 2. Check OEM fault code table. 3. Isolate if critical code",
            "Follow OEM fault resolution table exactly — do not reset alarms without fixing root cause",
          ],
        ]}
      />

      <Callout type="danger" title="Danger — Thermal Runaway Response Protocol">
        Thermal runaway signs: rapid temperature rise, hissing gas sound, burning smell, swelling.
        Protocol: (1) Evacuate everyone immediately. (2) Activate Emergency Battery Disconnect if
        safe to reach. (3) Call fire department — do NOT attempt to fight battery fire yourself.
        (4) Do NOT re-enter until fire department clears. (5) Preserve evidence for post-incident
        analysis — insurance aur OEM warranty investigation ke liye.
      </Callout>

      <h3 style={S.h3}>BMS Fault Code Quick Reference</h3>

      <ComparisonTable
        headers={["BMS Alarm", "Priority", "First Action"]}
        rows={[
          ["Cell over-voltage", "HIGH — immediate", "Check charger — float voltage above spec?"],
          ["Cell under-voltage", "HIGH — immediate", "Check if discharge event in progress; isolate if not"],
          ["Over-temperature (cell)", "CRITICAL — emergency", "Check HVAC, reduce load, monitor — evacuate if rising"],
          ["Communication fault", "MEDIUM", "Check Modbus/CAN cable — sensor hardware fault possible"],
          ["Earth fault", "HIGH", "Locate earth fault before second fault develops — two faults = short circuit"],
          ["Impedance high", "MEDIUM-HIGH", "Schedule inspection within 2 weeks — verify with physical test"],
          ["SoH below threshold", "MEDIUM", "Plan replacement — schedule capacity test to confirm"],
          ["Charge current high", "HIGH", "Check charger output — current limiter fault?"],
        ]}
      />

      {/* ═══════════════════════════════════════════════════════════════
          PART 21 — SAFETY
      ═══════════════════════════════════════════════════════════════ */}

      <h2 id="safety" style={S.h2}>Safety</h2>

      <SectionIntro
        quickAnswer="Battery room safety teen hazard categories cover karta hai: electrical (DC high voltage, arc flash), chemical (sulfuric acid, hydrogen gas), aur thermal (thermal runaway, fire). Teenon ke liye alag PPE, alag response, aur alag training chahiye."
        engineerTip="Battery room safety ka sabse commonly ignored element: DC arc flash. Engineers AC arc flash se familiar hote hain lekin DC arc flash ke baare mein sochte nahi. DC 192V bank se arc flash AC 230V se more dangerous ho sakta hai — DC current zero crossing pe naturally quench nahi hota. Before any battery room work, always do a DC arc flash hazard assessment."
        keyTakeaway="Battery room mein enter karne se pehle: PPE on, H₂ sensor status check, no open flames/sparks — yeh three steps non-negotiable hain."
      />

      <h3 style={S.h3}>Electrical Hazards — DC Battery Systems</h3>

      <p style={S.p}>
        192V DC bus — yeh direct contact se lethal hai. AC ke unlike, DC current continuously
        flow karta hai — muscle lock-up AC se zyada likely hai. Additionally, DC arc flash
        at battery terminals extremely energetic hoti hai kyunki battery bank virtually
        unlimited current source hai for a short circuit.
      </p>

      <ComparisonTable
        headers={["DC Electrical Hazard", "Risk", "Prevention"]}
        rows={[
          ["Direct contact with terminals", "Electrocution — DC current causes muscle lock-up", "Insulated tools only; PPE; LOTO before work"],
          ["Arc flash at terminals", "Severe burns — DC arc does not self-extinguish", "Face shield, arc-rated gloves; never short terminals"],
          ["Tool drop on live bus bar", "Short circuit → massive arc flash", "Remove metal jewelry/watch; use insulated mat; one hand rule"],
          ["Wrong fuse rating", "Fuse cannot interrupt fault current → sustained arc", "Always use DC-rated fuses of correct interrupt capacity"],
          ["Reverse polarity connection", "Immediate short circuit on battery connection", "Verify polarity with voltmeter BEFORE inserting fuse"],
        ]}
      />

      <h3 style={S.h3}>Chemical Hazards</h3>

      <ComparisonTable
        headers={["Chemical Hazard", "Source", "Risk", "Response"]}
        rows={[
          ["Sulfuric acid (H₂SO₄)", "VRLA internal electrolyte — released if case cracks/leaks", "Severe chemical burns to skin, eyes, respiratory tract", "Flush with copious water 15+ minutes; neutralize with baking soda; medical attention"],
          ["Hydrogen gas (H₂)", "VRLA during charging — especially overcharge/equalisation", "Explosion if > 4% concentration (LEL) with ignition source", "Maintain ventilation; no sparks/flames; H₂ sensor monitoring"],
          ["Thermal decomposition gases (Li-ion)", "LFP/NMC battery during thermal runaway or fault", "Toxic gases including HF (hydrofluoric acid) possible", "Evacuate; SCBA for emergency responders; specialist hazmat"],
        ]}
      />

      <Callout type="danger" title="Danger — Hydrogen Explosion Risk Is Real">
        H₂ gas invisible aur odorless hai. Agar H₂ sensor alarm kare: (1) Immediately stop all
        work, (2) No electrical switching — sparks prohibited, (3) Evacuate room, (4) Increase
        ventilation from outside control panel, (5) Do not re-enter until sensor reads normal.
        H₂ explosion from battery room fire incidents globally recorded hain — yeh theoretical
        risk nahi hai.
      </Callout>

      <h3 style={S.h3}>LOTO for Battery Systems</h3>

      <p style={S.p}>
        Battery LOTO AC LOTO se different hai — aur zyada complex. Battery continuously energized
        rehti hai (koi ON/OFF switch nahi jaise AC circuit breaker). Proper isolation sequence
        mandatory hai.
      </p>

      <ComparisonTable
        headers={["LOTO Step", "Action", "Verify"]}
        rows={[
          ["1 — Notify", "NOC aur shift supervisor ko inform karo — battery maintenance planned", "Written permit issued"],
          ["2 — UPS to bypass", "UPS maintenance bypass activate karo — load bypass pe shift karo", "Bypass confirmed on UPS display"],
          ["3 — String isolation", "String fuse(s) remove karo ya string MCCB open karo", "Voltmeter confirm — fuse-out side zero current"],
          ["4 — Battery disconnect", "Main battery disconnect switch open karo", "Voltmeter confirm — DC bus side isolated"],
          ["5 — Lockout", "Lock on each isolation point — each technician apna lock lagaao", "All locks physically present"],
          ["6 — Tagout", "Danger tag on each isolation point — name, date, contact", "Tags readable and secure"],
          ["7 — Verify zero energy", "Voltmeter verify: battery terminals at zero relative to each other", "Documented measurement"],
          ["8 — Work proceeds", "Work done under LOTO", "Continuous awareness of adjacent live sections"],
        ]}
      />

      <h3 style={S.h3}>PPE Requirements</h3>

      <ComparisonTable
        headers={["Activity", "Minimum PPE Required"]}
        rows={[
          ["Visual inspection (no contact)", "Safety glasses, closed-toe shoes, hi-vis vest"],
          ["Terminal voltage measurement", "Insulated gloves (Class 0 minimum), safety glasses, no metal jewelry"],
          ["Physical battery work (connections, replacement)", "Acid-resistant gloves, face shield, arc-rated jacket, insulated tools, safety shoes"],
          ["Emergency response (battery fire)", "SCBA (Self-Contained Breathing Apparatus), fire-rated suit — specialist only"],
          ["Electrolyte spill cleanup", "Chemical-resistant gloves, face shield, acid-resistant apron, eye wash within 10 seconds reach"],
        ]}
      />

      <h3 style={S.h3}>Emergency Response — Battery Room Fire</h3>

      <ol style={S.ol}>
        <li>Activate fire alarm immediately — do not try to fight battery fire yourself</li>
        <li>Evacuate all personnel from battery room and adjacent areas</li>
        <li>If safe, activate Emergency Battery Disconnect (EBD) from outside the room</li>
        <li>Call fire department — brief them: battery chemistry (VRLA or Li-ion), room location, approximate bank size</li>
        <li>Do not re-enter — battery room mein toxic gases accumulate hote hain during fire</li>
        <li>Post-incident: preserve all evidence, notify insurance, initiate OEM investigation</li>
      </ol>

      <Callout type="important" title="Important — First Aid: Acid Burns">
        VRLA battery acid contact pe: immediate action = flush with large amounts of water
        minimum 15 minutes — do not waste time removing clothing first, flush over clothing.
        Remove affected clothing during flushing. Eye contact: immediate eyewash station —
        15 minutes continuous flush. Always seek medical attention after any acid exposure —
        symptoms can be delayed.
      </Callout>
    </>
  );
}
