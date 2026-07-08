"use client";
import { S, Callout, ComparisonTable, Figure } from "../shared";
import FallOfPotentialDiagram from "../svg/FallOfPotentialDiagram";

export default function Testing() {
  return (
    <>
      <h2 id="earth-resistance-testing" style={S.h2}>Earth Resistance Testing</h2>
      <p style={S.p}><strong>Quick Summary:</strong> Earth resistance testing verify karta hai ki earth electrode ground se kitni achhi tarah connected hai. Low resistance = effective fault current path. Yeh Data Center ka sabse critical periodic test hai.</p>
      <ul style={S.ul}>
        <li>Earth resistance — electrode se ground tak ka opposition</li>
        <li>Lower value = better (typically &lt;1Ω for Data Center)</li>
        <li>Multiple testing methods available — application-specific</li>
        <li>Seasonal variation hoti hai — moisture pe depend karta hai</li>
      </ul>
      <p style={S.p}><strong>Engineer Tip:</strong> Earth resistance sirf earth pit ki quality nahi batata — poore earthing system ki health indicate karta hai. High resistance reading ka matlab ho sakta hai loose connection, corroded strip, ya dry soil — root cause investigate karna zaroori hai, sirf reading record mat karo.</p>

      <h3 id="testing-parameters" style={S.h3}>Testing Parameters & Acceptable Values</h3>
      <ComparisonTable
        headers={["Parameter", "What It Measures", "Data Center Acceptable Value", "Standard Reference"]}
        rows={[
          ["Earth Resistance", "Electrode-to-ground opposition", "< 1Ω (critical systems), < 5Ω (general)", "IS 3043"],
          ["Earth Impedance", "AC resistance including reactance", "Similar to resistance for LF systems", "IEC 61557"],
          ["Continuity", "Conductor path integrity", "< 0.1Ω typically for bonding", "IS 3043 / IEC 60364"],
          ["Neutral-Earth Voltage", "Voltage between N and E", "< 2V typically, ideally < 1V", "Site-specific"],
          ["Leakage Current", "Unintended current to earth", "< 30mA (RCD threshold reference)", "IEC 60364"],
          ["Touch Voltage", "Voltage accessible to human contact", "< 50V AC (safety limit)", "IEC 60479"],
          ["Step Voltage", "Voltage difference over 1m step", "< 50V AC typically", "IEEE 80"],
          ["Ground Potential Rise (GPR)", "Voltage rise during fault", "Design-dependent, must stay below touch/step limits", "IEEE 80"],
        ]}
      />
      <Callout type="important" title="Pass/Fail Criteria">
        Data Center critical systems (UPS, Battery Bank, Server Rack earthing) ke liye &lt;1Ω target hai. General building earthing ke liye &lt;5Ω acceptable hai IS 3043 ke according. Agar reading threshold se zyada hai, immediate investigation aur corrective action mandatory hai — yeh cosmetic issue nahi hai.
      </Callout>

      <h3 id="fall-of-potential" style={S.h3}>Fall of Potential — 3 Pole Method</h3>
      <Figure caption="Fig 3 — Fall of Potential (3 Pole) Test Method: Earth electrode (E), current electrode (C), aur potential electrode (P) specific distances pe placed, resistance measure karne ke liye.">
        <FallOfPotentialDiagram />
      </Figure>
      <p style={S.p}>3-pole method sabse accurate aur widely used earth resistance test hai. Current electrode (C) earth electrode se 30-40m door place hota hai; potential electrode (P) beech mein, typically 62% distance pe (61.8% rule).</p>
      <div style={S.formula}>
        R = V ÷ I<br/>
        Where: V = potential difference measured (Volts), I = test current injected (Amperes)
      </div>
      <p style={S.p}><strong>Procedure:</strong> (1) Disconnect earth electrode from system via test link. (2) Drive C and P auxiliary electrodes at specified distances. (3) Inject known test current between E and C. (4) Measure voltage between E and P. (5) Calculate resistance. (6) Repeat at 52%, 62%, 72% of C-distance to verify a flat curve (confirms valid reading, not influenced by electrode interference).</p>
      <Callout type="common-mistake" title="Common Mistake — Auxiliary Electrodes Too Close">
        Agar C aur P electrodes earth electrode ke bahut paas place kiye jaayein, unka resistance zone overlap kar jaata hai — result artificially low ya inconsistent aata hai. Standard practice: C electrode kam se kam 5x earth electrode depth ki distance pe hona chahiye, ideally 30-40m ground space available ho toh.
      </Callout>

      <h3 id="four-pole-method" style={S.h3}>4 Pole Test</h3>
      <p style={S.p}>4-pole method soil resistivity measure karne ke liye use hoti hai (Wenner method), na ki directly earth resistance. Four probes equal spacing pe ground mein insert kiye jaate hain.</p>
      <div style={S.formula}>
        ρ = 2πaR<br/>
        Where: ρ = soil resistivity (Ω-m), a = probe spacing (m), R = measured resistance (Ω)
      </div>
      <p style={S.p}><strong>Worked Example:</strong> Probe spacing (a) = 5m, measured resistance (R) = 45Ω. ρ = 2 × 3.14159 × 5 × 45 = 1,413.7 Ω-m. Yeh value naye earth pit design ke liye input hoti hai — kitne electrodes chahiye target resistance achieve karne ke liye.</p>

      <h3 id="clamp-method" style={S.h3}>Clamp Method</h3>
      <p style={S.p}>Clamp-on earth tester ek non-invasive method hai — koi auxiliary electrode nahi lagane padte. Clamp meter earth loop ke around clamp hota hai aur induced current measure karta hai. Fast aur convenient — Data Center routine testing mein widely used.</p>
      <ComparisonTable
        headers={["Aspect", "3-Pole (Fall of Potential)", "Clamp Method"]}
        rows={[
          ["Accuracy", "Highest — reference method", "Good, but requires parallel earth paths"],
          ["Auxiliary electrodes", "Required (C and P)", "None — non-invasive"],
          ["Disconnection needed", "Yes, via test link", "No — measures without disconnection"],
          ["Space required", "30-40m open ground", "None"],
          ["Best use", "New installation, annual verification", "Routine monthly/quarterly checks"],
          ["Limitation", "Requires space, time-consuming", "Needs multiple parallel earth return paths to be accurate"],
        ]}
      />

      <h3 id="soil-resistivity" style={S.h3}>Soil Resistivity — Wenner Method</h3>
      <p style={S.p}>Soil resistivity naye earth pit design se pehle measure ki jaati hai — yeh batata hai kitni electrodes aur kaunsa earthing type (plate/rod/chemical) suitable hoga. Wenner 4-pole method standard technique hai.</p>
      <ComparisonTable
        headers={["Soil Type", "Typical Resistivity (Ω-m)", "Earthing Recommendation"]}
        rows={[
          ["Wet marshy soil", "5–40", "Simple rod/plate sufficient"],
          ["Clay", "20–100", "Standard plate/rod earthing"],
          ["Sandy clay/loam", "100–300", "May need multiple electrodes or chemical"],
          ["Dry sandy soil", "300–800", "Chemical earthing recommended"],
          ["Rocky/gravel soil", "1000–3000+", "Chemical earthing + enhancement compound essential"],
        ]}
      />

      <h3 id="continuity-bonding-test" style={S.h3}>Continuity & Bonding Test</h3>
      <p style={S.p}>Continuity test verify karta hai ki bonding conductor (rack frame, cable tray, panel body) actually electrically continuous hai — koi break, loose joint, ya corrosion nahi hai path mein.</p>
      <p style={S.p}><strong>Method:</strong> Low-resistance ohmmeter (micro-ohmmeter) do points ke beech connect karo — typically equipment body se main earth bar tak. Reading &lt;0.1Ω honi chahiye typically for bonding conductors per IS 3043 guidance. Higher reading = investigate joint/connection.</p>
      <Callout type="best-practice" title="Best Practice — Test Every Bonding Point Annually">
        Rack-to-rack bonding, cable tray sections, aur panel body connections — sab annually continuity test karo. Yeh connections physically hidden hote hain aur visual inspection se corrosion ya loosening detect nahi hoti. Micro-ohmmeter test hi definitive answer deta hai.
      </Callout>

      <h2 id="testing-instruments" style={S.h2}>Testing Instruments</h2>
      <p style={S.p}><strong>Quick Summary:</strong> Har testing instrument specific purpose ke liye designed hai. Galat instrument use karna galat/misleading reading de sakta hai.</p>
      <ComparisonTable
        headers={["Instrument", "Purpose", "Typical Reading", "Data Center Use"]}
        rows={[
          ["Digital Earth Tester", "Earth resistance measurement (3/4-pole)", "0.1Ω – 2000Ω range", "New installation verification, annual test"],
          ["Clamp Earth Tester", "Non-invasive earth resistance", "0.01Ω – 1500Ω typically", "Routine monthly/quarterly checks"],
          ["Megger (Insulation Tester)", "Insulation resistance between conductor and earth", "MΩ to GΩ range", "Cable/equipment insulation verification"],
          ["Digital Multimeter", "Voltage, continuity, basic resistance", "General purpose", "Quick voltage checks (N-E voltage)"],
          ["Clamp Meter (AC/DC)", "Current measurement without circuit break", "mA to hundreds of Amps", "Leakage current, load current checks"],
          ["Leakage Clamp Meter", "Sensitive low-level leakage current", "μA to mA resolution", "Detecting insulation degradation trends"],
          ["Power Quality Analyzer", "Voltage, current, harmonics, transients", "Multi-parameter logging", "Comprehensive power quality + earthing analysis"],
        ]}
      />
      <p style={S.p}><strong>For every instrument — connection method aur common mistakes:</strong></p>
      <ul style={S.ul}>
        <li><strong>Digital Earth Tester:</strong> Test link disconnect karo pehle, phir C/P electrodes connect karo per manufacturer diagram. Mistake: test link disconnect kiye bina reading lena — system-parallel paths se galat reading aati hai.</li>
        <li><strong>Clamp Earth Tester:</strong> Clamp ko earth conductor ke around close karo bina koi cable pinch kiye. Mistake: sirf ek hi earth path hone pe clamp method use karna — accuracy compromise hoti hai without parallel return paths.</li>
        <li><strong>Megger:</strong> Test se pehle equipment completely de-energize aur isolate karo. Mistake: live circuit pe megger use karna — dono instrument aur equipment damage ho sakta hai.</li>
        <li><strong>Power Quality Analyzer:</strong> CT clamps correct phase orientation mein lagao. Mistake: CT direction reverse lagana — power factor aur harmonics reading galat aati hai.</li>
      </ul>
      <Callout type="warning" title="Common Mistake — Calibration Expiry">
        Testing instruments periodic calibration require karte hain (typically annual) — expired calibration certificate wale instrument se liya gaya reading legally aur technically questionable hai. Calibration sticker aur certificate hamesha verify karo before using any test instrument for official records.
      </Callout>

      <h2 id="earthing-formulas" style={S.h2}>Engineering Formulas</h2>
      <p style={S.p}><strong>Quick Summary:</strong> Earthing design aur verification mein 6 core formulas use hote hain — resistance calculation se lekar ground potential rise tak.</p>
      <div style={S.formula}>
        1. Earth Resistance: R = V ÷ I<br/><br/>
        2. Soil Resistivity (Wenner): ρ = 2πaR<br/><br/>
        3. Rod Electrode Resistance: R = (ρ ÷ 2πL) × [ln(8L/d) − 1]<br/>
        &nbsp;&nbsp;Where L = rod length, d = rod diameter<br/><br/>
        4. Fault Current: I_fault = V ÷ (R_source + R_earth)<br/><br/>
        5. Ground Potential Rise (GPR): GPR = I_fault × R_earth<br/><br/>
        6. Touch Voltage (approx): V_touch = GPR × (surface factor, typically 0.3–0.7 depending on gradient)
      </div>
      <p style={S.p}><strong>Worked Example — Rod Electrode Resistance:</strong> ρ = 100 Ω-m, L (rod length) = 3m, d (rod diameter) = 0.016m (16mm).</p>
      <p style={S.p}>R = (100 ÷ (2π × 3)) × [ln(8×3/0.016) − 1] = (100 ÷ 18.85) × [ln(1500) − 1] = 5.31 × (7.31 − 1) = 5.31 × 6.31 ≈ 33.5Ω for single rod.</p>
      <p style={S.p}>Single rod insufficient for Data Center (&lt;1Ω target) — multiple rods in parallel required, or chemical earthing to reduce effective resistivity.</p>
      <Callout type="important" title="Fault Current Worked Example">
        System voltage 415V, source impedance negligible, earth resistance measured 2Ω. Fault current = 415 ÷ 2 ≈ 207A flowing through earth path during a line-to-earth fault. GPR = 207A × 2Ω = 414V — this must be evaluated against touch/step voltage limits at the fault location, especially near battery rooms or occupied areas.
      </Callout>
    </>
  );
}
