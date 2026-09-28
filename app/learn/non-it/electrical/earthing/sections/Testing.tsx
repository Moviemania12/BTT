"use client";
import { S, Callout, ComparisonTable, Figure } from "../shared";
import FallOfPotentialDiagram from "../svg/FallOfPotentialDiagram";

export default function Testing() {
  return (
    <>
      <h2 id="earth-resistance-testing" style={S.h2}>Earth Resistance Testing</h2>
      <p style={S.p}><strong>Quick Summary:</strong> Earth resistance testing verifies how well the earth electrode is connected to the ground. Low resistance = an effective fault current path. It is the most critical periodic test in a Data Center.</p>
      <ul style={S.ul}>
        <li>Earth resistance — the opposition from the electrode to the ground</li>
        <li>Lower value = better (typically &lt;1Ω for Data Center)</li>
        <li>Multiple testing methods available — application-specific</li>
        <li>There is seasonal variation — it depends on moisture</li>
      </ul>
      <p style={S.p}><strong>Engineer Tip:</strong> Earth resistance does not only tell the quality of the earth pit — it indicates the health of the whole earthing system. A high resistance reading can mean a loose connection, corroded strip or dry soil — investigating the root cause is essential; do not just record the reading.</p>

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
        The target for Data Center critical systems (UPS, Battery Bank, Server Rack earthing) is &lt;1Ω. For general building earthing, &lt;5Ω is acceptable as per IS 3043. If the reading is above the threshold, immediate investigation and corrective action are mandatory — this is not a cosmetic issue.
      </Callout>

      <h3 id="fall-of-potential" style={S.h3}>Fall of Potential — 3 Pole Method</h3>
      <Figure caption="Fig 3 — Fall of Potential (3 Pole) Test Method: Earth electrode (E), current electrode (C) and potential electrode (P) placed at specific distances to measure resistance.">
        <FallOfPotentialDiagram />
      </Figure>
      <p style={S.p}>The 3-pole method is the most accurate and widely used earth resistance test. The current electrode (C) is placed 30-40m away from the earth electrode; the potential electrode (P) in between, typically at 62% of the distance (61.8% rule).</p>
      <div style={S.formula}>
        R = V ÷ I<br/>
        Where: V = potential difference measured (Volts), I = test current injected (Amperes)
      </div>
      <p style={S.p}><strong>Procedure:</strong> (1) Disconnect earth electrode from system via test link. (2) Drive C and P auxiliary electrodes at specified distances. (3) Inject known test current between E and C. (4) Measure voltage between E and P. (5) Calculate resistance. (6) Repeat at 52%, 62%, 72% of C-distance to verify a flat curve (confirms valid reading, not influenced by electrode interference).</p>
      <Callout type="common-mistake" title="Common Mistake — Auxiliary Electrodes Too Close">
        If the C and P electrodes are placed very close to the earth electrode, their resistance zones overlap — the result comes out artificially low or inconsistent. Standard practice: the C electrode should be at a distance of at least 5x the earth electrode depth, ideally 30-40m if ground space is available.
      </Callout>

      <h3 id="four-pole-method" style={S.h3}>4 Pole Test</h3>
      <p style={S.p}>The 4-pole method is used to measure soil resistivity (Wenner method), not directly earth resistance. Four probes are inserted into the ground at equal spacing.</p>
      <div style={S.formula}>
        ρ = 2πaR<br/>
        Where: ρ = soil resistivity (Ω-m), a = probe spacing (m), R = measured resistance (Ω)
      </div>
      <p style={S.p}><strong>Worked Example:</strong> Probe spacing (a) = 5m, measured resistance (R) = 45Ω. ρ = 2 × 3.14159 × 5 × 45 = 1,413.7 Ω-m. This value is the input for a new earth pit design — how many electrodes are needed to achieve the target resistance.</p>

      <h3 id="clamp-method" style={S.h3}>Clamp Method</h3>
      <p style={S.p}>The clamp-on earth tester is a non-invasive method — no auxiliary electrodes have to be installed. The clamp meter clamps around the earth loop and measures the induced current. Fast and convenient — widely used in Data Center routine testing.</p>
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
      <p style={S.p}>Soil resistivity is measured before a new earth pit design — it tells how many electrodes and which earthing type (plate/rod/chemical) will be suitable. The Wenner 4-pole method is the standard technique.</p>
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
      <p style={S.p}>The continuity test verifies that the bonding conductor (rack frame, cable tray, panel body) is actually electrically continuous — there is no break, loose joint or corrosion in the path.</p>
      <p style={S.p}><strong>Method:</strong> Connect a low-resistance ohmmeter (micro-ohmmeter) between two points — typically from the equipment body to the main earth bar. The reading should typically be &lt;0.1Ω for bonding conductors per IS 3043 guidance. Higher reading = investigate the joint/connection.</p>
      <Callout type="best-practice" title="Best Practice — Test Every Bonding Point Annually">
        Rack-to-rack bonding, cable tray sections and panel body connections — continuity test all of them annually. These connections are physically hidden and corrosion or loosening is not detected by visual inspection. Only the micro-ohmmeter test gives a definitive answer.
      </Callout>

      <h2 id="testing-instruments" style={S.h2}>Testing Instruments</h2>
      <p style={S.p}><strong>Quick Summary:</strong> Every testing instrument is designed for a specific purpose. Using the wrong instrument can give a wrong/misleading reading.</p>
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
      <p style={S.p}><strong>For every instrument — connection method and common mistakes:</strong></p>
      <ul style={S.ul}>
        <li><strong>Digital Earth Tester:</strong> Disconnect the test link first, then connect the C/P electrodes per the manufacturer diagram. Mistake: taking a reading without disconnecting the test link — system-parallel paths give a wrong reading.</li>
        <li><strong>Clamp Earth Tester:</strong> Close the clamp around the earth conductor without pinching any cable. Mistake: using the clamp method when there is only a single earth path — accuracy is compromised without parallel return paths.</li>
        <li><strong>Megger:</strong> Completely de-energize and isolate the equipment before the test. Mistake: using a megger on a live circuit — both the instrument and the equipment can be damaged.</li>
        <li><strong>Power Quality Analyzer:</strong> Fit the CT clamps in the correct phase orientation. Mistake: fitting the CT direction reversed — power factor and harmonics readings come out wrong.</li>
      </ul>
      <Callout type="warning" title="Common Mistake — Calibration Expiry">
        Testing instruments require periodic calibration (typically annual) — a reading taken with an instrument with an expired calibration certificate is legally and technically questionable. Always verify the calibration sticker and certificate before using any test instrument for official records.
      </Callout>

      <h2 id="earthing-formulas" style={S.h2}>Engineering Formulas</h2>
      <p style={S.p}><strong>Quick Summary:</strong> 6 core formulas are used in earthing design and verification — from resistance calculation to ground potential rise.</p>
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
