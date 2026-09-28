"use client";
import { S, Callout, ComparisonTable, Figure } from "../shared";
import TopicLink from "@/components/TopicLink";
import SensorTroubleshootingFlow from "../svg/SensorTroubleshootingFlow";
import { faqs } from "../metadata";

export default function IntegrationAndClosing() {
  return (
    <>
      <h2 id="sensor-integration" style={S.h2}>Sensor Integration with BMS and DCIM</h2>
      <p style={S.p}>There are two paths for sensor data to come into the BMS or DCIM. <strong>Direct hardwired:</strong> The sensor is wired directly to an input of the BMS/DCIM controller — 4-20 mA AI, 0-10V AI, or dry contact DI. Simple, reliable, no protocol needed. Limitation: one sensor per wiring pair, distances limited (longer distances are better tolerated for 4-20 mA). <strong>Protocol-based (Modbus/BACnet):</strong> A smart meter, network sensor or equipment controller exposes multiple parameters over Modbus RTU/TCP or BACnet — the BMS driver polls it. Multiple values from one cable/connection. Requires protocol configuration and a driver.</p>
      <p style={S.p}>Steps to integrate a sensor into the BMS: (1) Confirm the controller I/O type — analog input 4-20 mA or voltage? DI contact type? (2) Wire the sensor to the correct controller terminal — verify polarity. (3) Create the BMS point — configure input type, range. (4) Scaling: convert the raw input (0-100% or raw mA) to the engineering unit — a temperature transmitter 4-20 mA = 0-50°C means the formula: T°C = (mA - 4) × 50 / 16. (5) Configure the engineering unit. (6) Add alarm limits. (7) Verify — compare the live value vs a physical measurement.</p>
      <Callout type="best-practice" title="Loop Power — Who Provides It?">
        4-20 mA sensors typically require external loop power — 24V DC. 2-wire sensors can power themselves from the loop current (the controller provides 24V in the loop). 3-wire sensors need a separate power supply. 4-wire sensors have a separate power supply and a separate signal pair. Verify the wire configuration from the sensor datasheet and check the controller's loop power availability before wiring.
      </Callout>

      <h2 id="calibration" style={S.h2}>Calibration and Accuracy</h2>
      <p style={S.p}>Sensor accuracy is maintained through calibration — calibration means verifying and adjusting the sensor reading against a known reference. Different sensors drift differently. Temperature sensors (RTD) are relatively stable — drift is slow. Humidity sensors drift faster — contaminants accelerate drift. Pressure sensors can shift from mechanical stress. Energy/CT-based measurements depend on CT condition, installation and ratio accuracy.</p>
      <p style={S.p}>Calibration process: record the as-found reading (sensor current output vs reference measurement). If it is within tolerance no adjustment is needed — still record it. If it is out of tolerance — adjust (if field adjustable) or replace. Record the as-left reading. Maintain as-found/as-left records — the drift history becomes visible. Maintain the calibration certificate for the reference instrument (NIST-traceable).</p>
      <Callout type="important" title="Calibration Frequency — No Universal Schedule">
        Calibration frequency depends on sensor type, criticality, accuracy class, OEM recommendation, applicable standards (ISO 9001, ISO 17025, ISO 50001) and application — there is no universal mandatory schedule. Start with OEM recommendation. High-criticality measurements (billing meters, safety limits) more frequent. Track as-found readings — frequent out-of-tolerance indicates recalibrate more often or replace sensor.
      </Callout>

      <h2 id="preventive-maintenance" style={S.h2}>Preventive Maintenance</h2>
      <p style={S.p}><strong>Monthly (example):</strong> All sensors online in BMS — any offline or fault? Sample 10-15 sensors physical vs BMS value compare. Water leak sensors — visual inspection, no debris covering probe. Door contacts — spot check alignment. Alarm log — sensor-related alarms review.</p>
      <p style={S.p}><strong>Quarterly (example):</strong> Clean temperature/humidity sensors (compressed air, soft cloth per OEM). Inspect sensor wiring terminals — retighten loose connections. Inspect CT connections — no loose secondary, no corrosion. Verify the fuel level sensor — cross-check with dip stick or sight glass. Calibration check — spot check critical sensors against reference.</p>
      <p style={S.p}><strong>Annual (example):</strong> Full calibration cycle per project schedule. Replace sensors whose calibration history shows consistent drift. Verify RTD resistance (reference ohmmeter). Energy meters — accuracy class verification. Update as-built sensor locations if moved. Maintain a sensor datasheet archive.</p>

      <h2 id="troubleshooting" style={S.h2}>Engineer Troubleshooting — Sensor Issues</h2>
      <Figure caption="Fig 2 — Sensor troubleshooting systematic approach: start with physical, check signal/wiring, verify controller input, confirm scaling and BMS config."><SensorTroubleshootingFlow/></Figure>

      <h3 style={S.h3}>Fault 1: Sensor Reading Zero or Minimum</h3>
      <p style={S.p}><strong>First:</strong> 4-20 mA — measure in series in the loop with a multimeter in ammeter mode. Is it 4 mA and above? 0 mA = wire break or sensor power failed. <strong>Next:</strong> Check sensor power (24V DC). Check cable continuity. <strong>Fix:</strong> Restore power. Repair the cable. Replace the sensor if defective.</p>

      <h3 style={S.h3}>Fault 2: Wrong / Stuck Value</h3>
      <p style={S.p}><strong>First:</strong> Look at the BMS raw input value — is the signal in the correct range? Is the mA reading as expected for the physical condition? <strong>Next:</strong> Is the scaling formula correct? Are min/max engineering values correct? Take a physical measurement with a calibrated instrument — compare with the BMS. <strong>Fix:</strong> Correct the scaling formula per OEM spec. Calibrate the sensor. If extreme drift — replace it.</p>

      <h3 style={S.h3}>Fault 3: Excessive Noise / Fluctuating Value</h3>
      <p style={S.p}><strong>First:</strong> Check the cable shielding — is shielded cable being used? Is the shield properly grounded (one end only)? <strong>Next:</strong> Ground loops — multiple ground points? Cable routing near power cables? <strong>Fix:</strong> Re-route the cable separate from power cables. Ground the shield at a single point. Configure filter/averaging in the BMS.</p>

      <h3 style={S.h3}>Fault 4: Temperature Reading Too High or Low (Offset)</h3>
      <p style={S.p}><strong>First:</strong> Measure the actual temperature at the same location with a calibrated reference thermometer. Compare the BMS value. <strong>Next:</strong> Consistent offset? That indicates a calibration shift. Check scaling and zero offset. <strong>Fix:</strong> If consistent offset — do a calibration adjustment (if field adjustable). Otherwise replace the sensor.</p>

      <h3 style={S.h3}>Fault 5: Door Contact False Alarm</h3>
      <p style={S.p}><strong>First:</strong> Physical — is the door fully closed and latched? Are the magnet and switch aligned? Gap too large? <strong>Next:</strong> Has the sensor mounting shifted? Is door hinge wear causing misalignment? <strong>Fix:</strong> Realign the magnet and switch. Adjust mounting. Check the door closer.</p>

      <h3 style={S.h3}>Fault 6: Water Leak Alarm — Verify Before Reset</h3>
      <p style={S.p}><strong>Always:</strong> Physical inspection — look at the area. If wet — identify the source before reset. Dry the area. Fix the source. Reset the sensor. If no water found — condensation? High humidity? Sensor fault? Investigate the root cause before dismissing the alarm.</p>

      <h3 style={S.h3}>Fault 7: CT / Energy Meter Wrong Reading</h3>
      <p style={S.p}><strong>First:</strong> Is the CT ratio correct in the meter AND in the BMS/EMS scaling? (Both must match.) <strong>Next:</strong> Is CT polarity correct? Secondary connection tight? <strong>Fix:</strong> Enter the CT ratio. Correct the polarity. Retighten the secondary. Verify field current with a calibrated clamp meter — compare with the meter reading.</p>

      <ComparisonTable
        title="Sensor Troubleshooting Quick Reference"
        headers={["Symptom","First Check","Next Check","Likely Cause","Corrective Action"]}
        rows={[
          ["4-20mA reading zero","mA in loop (multimeter)","Sensor power (24V DC)","Wire break or no power","Repair cable or restore power"],
          ["Wrong value (offset)","Calibrated reference measurement","Scaling formula, zero offset","Calibration drift or wrong scaling","Recalibrate or fix scaling"],
          ["Noisy / fluctuating","Cable shielding","Cable routing near power","EMI, ground loop","Re-route, fix shield ground"],
          ["Stuck / frozen value","Physical condition changed?","Signal still changing at controller?","Sensor failed mechanically","Replace sensor"],
          ["Door contact false alarm","Physical door closed/latched?","Magnet-switch alignment","Misalignment","Realign sensor parts"],
          ["Water leak alarm, no water","Visual inspection area","Condensation, humidity, sensor fault","False trigger","Investigate, check sensor"],
          ["CT wrong energy reading","CT ratio in meter and BMS?","CT polarity, secondary connection","Ratio mismatch or reversed CT","Fix ratio, correct CT polarity"],
          ["Humidity reading drifting","Sensor clean? Contamination?","Calibration history","Contamination or age drift","Clean or replace sensor"],
        ]}
      />

      <h2 id="illustrative-scenario" style={S.h2}>Illustrative Scenario</h2>
      <Callout type="interview" title="Note: Illustrative scenario — not a documented real facility event">
        In a data center a "Row C, Cold Aisle Temperature High" alarm came on the BMS — it was showing 28°C while 25°C was expected. In the on-site check the actual temperature was 25.2°C (measured with a handheld thermometer). Investigation: there was a loose terminal in the wiring of the BMS temperature transmitter — slight contact resistance causing a minor drop in the 4-20 mA signal, which the BMS interpreted as a higher temperature (wrong scaling assumption). After retightening the terminal, the BMS reading settled at 25.1°C. Lesson: Always do a physical measurement — do not automatically believe the BMS value without verification.
      </Callout>

      <h2 id="interview-questions" style={S.h2}>Interview Questions</h2>
      <h3 style={S.h3}>Q1: Explain the live zero concept of the 4-20 mA signal.</h3>
      <p style={S.p}><strong>Answer:</strong> In 4-20 mA, 4 mA = 0% of measurement range (minimum), 20 mA = 100% (maximum). "Live zero" means the minimum signal is 4 mA, not 0 mA. If there is a wire break or power failure in the circuit, the current goes to zero — the controller detects that 4 mA is not coming and flags a fault condition. If you use 0-20 mA, zero current is ambiguous (range minimum or fault?) — 4-20 mA solves this problem. 4-20 mA analog signals are the standard for field sensors in data centers.</p>
      <h3 style={S.h3}>Q2: Why is a CT secondary open circuit hazardous?</h3>
      <p style={S.p}><strong>Answer:</strong> High AC current flows in the CT primary — the secondary winding works like a step-down transformer that safely reduces it to 5A or 1A when a load (meter) is connected on the secondary. If the secondary circuit is open (meter disconnected) — the primary current saturates the magnetizing flux and an extremely high voltage can be induced in the secondary — risk of insulation damage, equipment damage and personnel injury. Rule: always keep the CT secondary circuit closed (meter connected). If the meter has to be disconnected, first short-circuit the CT secondary (with a shorting switch), then disconnect the meter.</p>
      <h3 style={S.h3}>Q3: Why are as-found and as-left records important in sensor calibration?</h3>
      <p style={S.p}><strong>Answer:</strong> As-found = sensor reading before any calibration adjustment. As-left = reading after adjustment. Both records build the maintenance history. As-found data shows the drift rate over time — if a sensor consistently drifts fast, consider replacement or increase the calibration frequency. Quality management systems (ISO 9001) and metrological traceability require as-found/as-left records. Calibration records are important evidence in compliance audits. Without the data, "was this sensor accurate during the last month?" is not answerable.</p>

      <h2 id="key-takeaways" style={S.h2}>Key Takeaways</h2>
      <ul style={S.ul}>
        <li>Sensors convert the physical world into electrical signals for the BMS/DCIM — sensor accuracy = monitoring system accuracy.</li>
        <li>4-20 mA is the standard analog signal — the live zero (4 mA = 0%) detects a wire break. Preferred for long cable runs.</li>
        <li>Temperature sensor placement location is critical — a wrong location shows "all normal" even if hot spots exist.</li>
        <li>Never open-circuit a CT secondary — hazardous high voltage. Use a shorting switch before meter disconnect.</li>
        <li>The CT ratio and meter scaling must both be correct — a mismatch gives proportionally wrong energy readings.</li>
        <li>Calibration drift is normal — keeping as-found/as-left records allows this drift to be tracked.</li>
        <li>Troubleshoot layer by layer: physical → signal/wiring → controller input → scaling/BMS config.</li>
        <li>Take water leak alarms seriously — physical investigation before reset, verify the root cause.</li>
      </ul>

      <h2 style={{...S.h2,marginTop:"3rem"}}>Frequently Asked Questions</h2>
      {faqs.map((item,i)=>(
        <div key={i} style={{marginBottom:"1.5rem",paddingBottom:"1.5rem",borderBottom:i<faqs.length-1?"1px solid #e5e7eb":"none"}}>
          <p style={{...S.p,fontWeight:700,marginBottom:"0.4rem"}}>{item.q}</p>
          <p style={{...S.p,marginBottom:0}}>{item.a}</p>
        </div>
      ))}

      <h2 style={{...S.h2,marginTop:"3rem"}}>Related Topics</h2>
      <ul style={S.ul}>
        <li><TopicLink slug="bms" variant="inline"/> — sensor data is integrated in the BMS — alarms and trends.</li>
        <li><TopicLink slug="ems" variant="inline"/> — energy sensors (CT, meters) are the foundation of EMS.</li>
        <li><TopicLink slug="dcim" variant="inline"/> — DCIM receives data from environmental sensors.</li>
        <li><TopicLink slug="vesda" variant="inline"/> — Specialized smoke detection sensors — early warning.</li>
        <li><TopicLink slug="access-control" variant="inline"/> — door contact sensors are also used in access control.</li>
      </ul>
    </>
  );
}
