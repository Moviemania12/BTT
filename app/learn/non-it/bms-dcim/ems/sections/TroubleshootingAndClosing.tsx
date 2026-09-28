"use client";
import { S, Callout, ComparisonTable } from "../shared";
import TopicLink from "@/components/TopicLink";
import { faqs } from "../metadata";

export default function TroubleshootingAndClosing() {
  return (
    <>
      <h2 id="dashboards-alarms" style={S.h2}>Dashboards, Alarms, Trends and Reports</h2>
      <p style={S.p}>The EMS dashboard shows real-time energy consumption per circuit/zone, historical trends, PUE, the demand curve and a cost estimate. Configure alarms: demand approaching threshold, power factor below minimum, kWh consumption exceeds daily budget, meter communication failure. Trend logging is interval-based — 15-minute intervals are aligned with utility billing. Reports: daily consumption, monthly summary, PUE trend, carbon footprint (if a CO2 factor is configured), load profile.</p>
      <p style={S.p}>EMS reports are critical for compliance — the ISO 50001 energy management standard requires documented energy performance evidence. Monthly/annual energy data exports are essential for client sustainability reporting. Define the report format and frequency from project requirements.</p>

      <h2 id="data-validation" style={S.h2}>Data Validation and Incorrect Meter Data</h2>
      <p style={S.p}>Energy data validation is an important function of EMS. Common validation checks: range validation (is the kW reading in the expected range?), rate-of-change (is kWh accumulating at a realistic rate?), comparison validation (sub-meter sum ≈ main meter — investigate unaccounted difference), zero-value detection (meter offline?). Flag validation failures and trigger manual review — inaccurate energy data leads to incorrect decisions.</p>
      <Callout type="warning" title="Sub-Meter Sum ≠ Main Meter — Common Discrepancy">
        If the sum of the sub-meters does not match the main meter reading, investigate: unmetered loads (lighting, security, UPS cooling fans), measurement timing mismatch, CT ratio errors, meter accuracy class differences, or genuinely lost/gained energy (losses). Document the expected discrepancy level and flag when it exceeds threshold.
      </Callout>

      <h2 id="optimization" style={S.h2}>Load Analysis and Energy Optimization</h2>
      <p style={S.p}>Analyze the load profile from EMS trend data — identify peak periods, identify demand valleys, check the cooling-IT load correlation. Optimization opportunities: peak demand reduction (load shifting where possible), power factor correction (capacitor banks where applicable), cooling setpoint optimization, idle equipment identification, stranded capacity identification. The actual optimization strategy is site-specific — EMS provides the data analysis, engineering judgment guides the action.</p>

      <h2 id="preventive-maintenance" style={S.h2}>Preventive Maintenance</h2>
      <p style={S.p}>Monthly: all meters online — communication status check. Sample meter readings vs local display (spot check 5-10%). Alarm log review — meter comm failures, threshold breaches. Quarterly: inspect CT connections (visual — no loose terminations), meter accuracy spot check (compare against a calibrated reference instrument), historian gaps review, report generation test. Annual: full meter calibration (per meter class and project requirements), verify CT ratio, EMS software updates, retention policy compliance review.</p>

      <h2 id="troubleshooting" style={S.h2}>Engineer Troubleshooting — Energy Data Issues</h2>
      <h3 style={S.h3}>Fault 1: Energy Reading Zero or Null</h3>
      <p style={S.p}><strong>First check:</strong> Meter local display — is the meter itself showing a reading? If the meter display is correct — communication issue. If the meter also shows zero — check meter power, CT connections, voltage input.</p>
      <p style={S.p}><strong>Next:</strong> Communication — is the Modbus device online? Ping it. Slave ID/baud match? Register address correct? Driver service running?</p>
      <p style={S.p}><strong>Fix:</strong> Restore communication. Re-verify the register address from the OEM doc. Historian backfill is not possible for missed intervals — document the gap.</p>

      <h3 style={S.h3}>Fault 2: Energy Value Wrong / Incorrect Scale</h3>
      <p style={S.p}><strong>First check:</strong> 32-bit energy register — are two 16-bit Holding Registers combined? Is the High word / Low word order correct? Verify the byte order from the OEM doc.</p>
      <p style={S.p}><strong>Next:</strong> Is the CT ratio correctly programmed in the meter AND in the EMS scaling? E.g., CT 200:5 A means multiply by 40 — if this is missing the value will be 40x wrong.</p>
      <p style={S.p}><strong>Fix:</strong> Correct the scaling formula. Flag the historical wrong data — manual correction is typically not possible in the historian, document the period.</p>

      <h3 style={S.h3}>Fault 3: Frozen / Stale Energy Reading</h3>
      <p style={S.p}><strong>First check:</strong> Is the kWh accumulator frozen? Is the load actually running? Is the meter local display changing?</p>
      <p style={S.p}><strong>Next:</strong> Communication timeout — polling working? Driver reconnecting repeatedly? Meter response time within timeout?</p>
      <p style={S.p}><strong>Fix:</strong> Increase the timeout value. Adjust the polling interval. Check for a meter firmware update (some meters have Modbus response time issues).</p>

      <h3 style={S.h3}>Fault 4: Negative Power Factor or Negative kW</h3>
      <p style={S.p}><strong>First check:</strong> CT polarity — is the current transformer connection reversed? Is the INT16 signed value correctly interpreted?</p>
      <p style={S.p}><strong>Fix:</strong> Physically reverse the CT (swap S1/S2 terminals) or negate in software per OEM guidance. Verify with the local meter display.</p>

      <h3 style={S.h3}>Fault 5: PUE Value Unrealistic (Too High or Too Low)</h3>
      <p style={S.p}><strong>Check:</strong> Metering boundary correct? "Total Facility" meter capturing ALL loads including cooling? "IT load" meter capturing actual server power? Scaling errors in either meter? UPS efficiency losses accounted for? Verify calculation with manual spot check.</p>

      <ComparisonTable
        title="EMS Troubleshooting Quick Reference"
        headers={["Symptom","First Check","Next Check","Likely Cause","Corrective Action"]}
        rows={[
          ["Energy reading zero","Meter local display?","Comm status, slave ID, baud","Meter offline or comm failure","Restore comms, check meter power"],
          ["Wrong energy value","CT ratio in meter AND EMS?","32-bit word order correct?","CT ratio or byte order error","Correct CT ratio/scaling config"],
          ["Frozen kWh accumulator","Load actually running?","Polling timeout, driver status","Stale data / comm issue","Fix timeout, check driver"],
          ["Negative kW/PF","CT polarity reversed?","INT16 sign bit interpretation","CT reversed connection","Reverse CT or software negate"],
          ["PUE unrealistic","Metering boundary correct?","Both IT and facility meter scaling","Wrong meter scope or scaling","Redefine boundary, fix scaling"],
          ["Sub-meter sum ≠ main","Unmetered loads identified?","CT ratio errors per sub-meter","Unmetered load or CT error","Document discrepancy, fix CT"],
          ["Historian gap","Logger service running?","Disk space, DB connection","Service stopped, disk full","Restart service, clear space"],
          ["Report wrong period","Report date range correct?","Timezone configured?","Wrong time config","Fix timezone, rerun report"],
        ]}
      />

      <h2 id="advantages-limitations" style={S.h2}>Advantages and Limitations</h2>
      <ul style={S.ul}>
        <li><strong>Advantages:</strong> Visibility into energy consumption at circuit/zone level; PUE tracking; regulatory compliance evidence; cost allocation per client/zone; optimization opportunities identification; trend analysis for capacity planning.</li>
        <li><strong>Limitations:</strong> Accuracy depends entirely on meter quality and CT/VT calibration; data only as good as metering infrastructure; unmetered loads create blind spots; historian gaps from comm failures; EMS cannot improve efficiency itself — it only provides data for informed decisions.</li>
      </ul>

      <h2 id="illustrative-scenario" style={S.h2}>Illustrative Scenario</h2>
      <Callout type="interview" title="Note: Illustrative scenario — not a documented real facility event">
        In the monthly energy report a colocation DC noticed that last week Hall B's PUE was 1.9 while Hall A's was 1.4. The EMS trend was checked — Hall B's cooling consumption was not flat; at night it was running the same as in the daytime even though the IT load dropped significantly. Investigation: in Hall B the supply air setpoint of one CRAC unit had accidentally been set to 18°C (was 22°C) — overcooling was happening with unnecessary energy use. The setpoint was corrected — the next week Hall B's PUE came to 1.45. Without EMS granular sub-metering and trend data this issue would have stayed invisible.
      </Callout>

      <h2 id="interview-questions" style={S.h2}>Interview Questions</h2>
      <h3 style={S.h3}>Q1: What is PUE and how is it calculated?</h3>
      <p style={S.p}><strong>Answer:</strong> PUE = Total Facility Power / IT Equipment Power. Ideal 1.0 — only IT power, zero overhead. Practical: 1.2 excellent, 1.5 average, 2.0+ poor. Define the metering boundary: total facility meter (utility incomer or generator output) and IT load meter (UPS output or PDU level). Different methodologies give different PUE values — follow Green Grid guidelines for comparison. Meter accuracy is critical in PUE calculation.</p>
      <h3 style={S.h3}>Q2: An energy meter is giving a zero value over Modbus — troubleshoot it.</h3>
      <p style={S.p}><strong>Answer:</strong> Step 1: Check the meter local display — is the meter itself showing a reading? If yes — comm issue. If no — check meter power/CT/voltage input. Step 2: Modbus comm — slave ID, baud rate, parity match? Register address verified from the OEM doc? FC 03 or 04 correct? Step 3: Data type — are 2 registers being read for a 32-bit value? Word order correct? Step 4: Scaling — CT ratio included? Step 5: EMS driver device status?</p>
      <h3 style={S.h3}>Q3: What is the fundamental difference between EMS and BMS?</h3>
      <p style={S.p}><strong>Answer:</strong> BMS focuses on building M&E operational monitoring and control — HVAC, alarms, status. EMS focuses on energy accounting — kWh, kW, demand, power factor, PUE, cost, sustainability reporting. BMS typically handles operational alarms and control sequences; EMS energy trends, reports and optimization insights. Many platforms combine both functions — the distinction is platform-specific.</p>

      <h2 id="key-takeaways" style={S.h2}>Key Takeaways</h2>
      <ul style={S.ul}>
        <li>Meters are the foundation of EMS — without accurate metering EMS is meaningless. Verify CT ratio, polarity and scaling.</li>
        <li>The word order in 32-bit energy registers is OEM-specific — verify it, otherwise the value will come out completely wrong.</li>
        <li>Define the PUE metering boundary precisely — different boundaries give different values.</li>
        <li>Expect a sub-meter sum ≠ main meter discrepancy — document the threshold and investigate if exceeded.</li>
        <li>EMS data provides visibility; optimization requires engineering judgment, not just software.</li>
        <li>Define the data retention policy from project requirements, billing dispute resolution and ISO 50001 needs.</li>
        <li>Troubleshoot systematically: meter → comm → register/scaling → historian — don't skip layers.</li>
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
        <li><TopicLink slug="bms" variant="inline"/> — the BMS has an EMS module or integration.</li>
        <li><TopicLink slug="dcim" variant="inline"/> — DCIM platforms often consume EMS energy data.</li>
        <li><TopicLink slug="ups" variant="inline"/> — UPS output metering is critical for IT load.</li>
        <li><TopicLink slug="sensors" variant="inline"/> — current sensors and power transducers are the field layer of EMS.</li>
      </ul>
    </>
  );
}
