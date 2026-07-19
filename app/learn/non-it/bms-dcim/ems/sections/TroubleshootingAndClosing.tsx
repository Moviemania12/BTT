"use client";
import { S, Callout, ComparisonTable } from "../shared";
import TopicLink from "@/components/TopicLink";
import { faqs } from "../metadata";

export default function TroubleshootingAndClosing() {
  return (
    <>
      <h2 id="dashboards-alarms" style={S.h2}>Dashboards, Alarms, Trends and Reports</h2>
      <p style={S.p}>EMS dashboard real-time energy consumption per circuit/zone dikhata hai, historical trends, PUE, demand curve aur cost estimate. Alarms configure karo: demand approaching threshold, power factor below minimum, kWh consumption exceeds daily budget, meter communication failure. Trend logging interval-based hota hai — 15-minute intervals utility billing aligned hoti hain. Reports: daily consumption, monthly summary, PUE trend, carbon footprint (agar CO2 factor configured), load profile.</p>
      <p style={S.p}>EMS reports compliance ke liye critical hain — ISO 50001 energy management standard documented energy performance evidence require karta hai. Client sustainability reporting ke liye monthly/annual energy data exports zaroori hote hain. Report format aur frequency project requirements se define karo.</p>

      <h2 id="data-validation" style={S.h2}>Data Validation and Incorrect Meter Data</h2>
      <p style={S.p}>Energy data validation EMS ka important function hai. Common validation checks: range validation (kW reading expected range mein hai?), rate-of-change (kWh accumulation realistic rate pe ho rahi hai?), comparison validation (sub-meter sum ≈ main meter — unaccounted difference investigate karo), zero-value detection (meter offline?). Validation failures flag karo aur manual review trigger karo — inaccurate energy data incorrect decisions lead karta hai.</p>
      <Callout type="warning" title="Sub-Meter Sum ≠ Main Meter — Common Discrepancy">
        Sub-meters ka sum main meter reading se match nahi karta toh investigate karo: unmetered loads (lighting, security, UPS cooling fans), measurement timing mismatch, CT ratio errors, meter accuracy class differences, ya genuinely lost/gained energy (losses). Document the expected discrepancy level and flag when it exceeds threshold.
      </Callout>

      <h2 id="optimization" style={S.h2}>Load Analysis and Energy Optimization</h2>
      <p style={S.p}>EMS trend data se load profile analyze karo — peak periods identify karo, demand valleys identify karo, cooling-IT load correlation check karo. Optimization opportunities: peak demand reduction (load shifting where possible), power factor correction (capacitor banks where applicable), cooling setpoint optimization, idle equipment identification, stranded capacity identification. Actual optimization strategy site-specific hai — EMS data analysis provide karta hai, engineering judgment action guide karta hai.</p>

      <h2 id="preventive-maintenance" style={S.h2}>Preventive Maintenance</h2>
      <p style={S.p}>Monthly: all meters online — communication status check. Sample meter readings vs local display (spot check 5-10%). Alarm log review — meter comm failures, threshold breaches. Quarterly: CT connections inspect (visual — no loose terminations), meter accuracy spot check (calibrated reference instrument se compare), historian gaps review, report generation test. Annual: full meter calibration (per meter class and project requirements), CT ratio verify, EMS software updates, retention policy compliance review.</p>

      <h2 id="troubleshooting" style={S.h2}>Engineer Troubleshooting — Energy Data Issues</h2>
      <h3 style={S.h3}>Fault 1: Energy Reading Zero or Null</h3>
      <p style={S.p}><strong>First check:</strong> Meter local display — kya meter khud reading show kar raha hai? Agar meter display correct hai — communication issue. Agar meter bhi zero — meter power, CT connections, voltage input check karo.</p>
      <p style={S.p}><strong>Next:</strong> Communication — Modbus device online? Ping karo. Slave ID/baud match? Register address correct? Driver service running?</p>
      <p style={S.p}><strong>Fix:</strong> Communication restore karo. Register address OEM doc se re-verify karo. Historian backfill possible nahi hoti for missed intervals — document the gap.</p>

      <h3 style={S.h3}>Fault 2: Energy Value Wrong / Incorrect Scale</h3>
      <p style={S.p}><strong>First check:</strong> 32-bit energy register — two 16-bit Holding Registers combined? High word / Low word order correct? OEM doc se byte order verify karo.</p>
      <p style={S.p}><strong>Next:</strong> CT ratio correctly programmed in meter AND in EMS scaling? E.g., CT 200:5 A means multiply by 40 — agar ye missing hai to value 40x wrong hogi.</p>
      <p style={S.p}><strong>Fix:</strong> Scaling formula correct karo. Historical wrong data flag karo — manual correction typically not possible in historian, document the period.</p>

      <h3 style={S.h3}>Fault 3: Frozen / Stale Energy Reading</h3>
      <p style={S.p}><strong>First check:</strong> kWh accumulator frozen? Load actually running hai? Meter local display change ho raha hai?</p>
      <p style={S.p}><strong>Next:</strong> Communication timeout — polling working? Driver reconnecting repeatedly? Meter response time within timeout?</p>
      <p style={S.p}><strong>Fix:</strong> Timeout value increase karo. Polling interval adjust karo. Meter firmware update check karo (some meters have Modbus response time issues).</p>

      <h3 style={S.h3}>Fault 4: Negative Power Factor or Negative kW</h3>
      <p style={S.p}><strong>First check:</strong> CT polarity — current transformer connection reversed hai? INT16 signed value correctly interpreted?</p>
      <p style={S.p}><strong>Fix:</strong> CT physically reverse karo (swap S1/S2 terminals) ya software negate karo per OEM guidance. Verify with local meter display.</p>

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
        Monthly energy report mein ek colocation DC ne notice kiya ki Hall B ka PUE last week 1.9 tha jabki Hall A ka 1.4 tha. EMS trend dekha — Hall B ka cooling consumption flat nahi tha, raat ko bhi daytime jaisa chal raha tha jabki IT load significantly drop hoti thi. Investigation: Hall B mein ek CRAC unit ka supply air setpoint accidentally 18°C pe set tha (was 22°C) — overcooling hoti thi unnecessary energy use se. Setpoint correct kiya — next week PUE Hall B ka 1.45 pe aa gaya. Without EMS granular sub-metering aur trend data ye issue invisible rehta.
      </Callout>

      <h2 id="interview-questions" style={S.h2}>Interview Questions</h2>
      <h3 style={S.h3}>Q1: PUE kya hai aur kaise calculate karte hain?</h3>
      <p style={S.p}><strong>Answer:</strong> PUE = Total Facility Power / IT Equipment Power. Ideal 1.0 — sirf IT power, zero overhead. Practical: 1.2 excellent, 1.5 average, 2.0+ poor. Metering boundary define karo: total facility meter (utility incomer ya generator output) aur IT load meter (UPS output ya PDU level). Different methodologies different PUE values deti hain — Green Grid guidelines follow karo comparison ke liye. PUE calculation mein meter accuracy critical hai.</p>
      <h3 style={S.h3}>Q2: Energy meter Modbus se zero value aa rahi hai — troubleshoot karo.</h3>
      <p style={S.p}><strong>Answer:</strong> Step 1: Meter local display check — meter khud reading show kar raha hai? Agar yes — comm issue. Agar no — meter power/CT/voltage input check karo. Step 2: Modbus comm — slave ID, baud rate, parity match? Register address OEM doc se verify? FC 03 ya 04 correct? Step 3: Data type — 32-bit value ke liye 2 registers read ho rahe hain? Word order correct? Step 4: Scaling — CT ratio included? Step 5: EMS driver device status?</p>
      <h3 style={S.h3}>Q3: EMS aur BMS mein kya fundamental difference hai?</h3>
      <p style={S.p}><strong>Answer:</strong> BMS building M&E operational monitoring aur control pe focus karta hai — HVAC, alarms, status. EMS energy accounting pe focus karta hai — kWh, kW, demand, power factor, PUE, cost, sustainability reporting. BMS typically operational alarms aur control sequences handle karta hai; EMS energy trends, reports aur optimization insights. Many platforms dono functions combine karte hain — distinction platform-specific hoti hai.</p>

      <h2 id="key-takeaways" style={S.h2}>Key Takeaways</h2>
      <ul style={S.ul}>
        <li>EMS foundation meters hain — bina accurate metering ke EMS meaningless hai. CT ratio, polarity aur scaling verify karo.</li>
        <li>32-bit energy registers mein word order OEM-specific hai — verify karo nahi to value completely wrong aayegi.</li>
        <li>PUE metering boundary define karo precisely — different boundaries different values deti hain.</li>
        <li>Sub-meter sum ≠ main meter discrepancy expect karo — document threshold aur investigate if exceeded.</li>
        <li>EMS data provides visibility; optimization requires engineering judgment, not just software.</li>
        <li>Data retention policy project requirements, billing dispute resolution aur ISO 50001 needs se define karo.</li>
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
        <li><TopicLink slug="bms" variant="inline"/> — BMS mein EMS module ya integration hoti hai.</li>
        <li><TopicLink slug="dcim" variant="inline"/> — DCIM platforms often EMS energy data consume karte hain.</li>
        <li><TopicLink slug="ups" variant="inline"/> — UPS output metering IT load ke liye critical hai.</li>
        <li><TopicLink slug="sensors" variant="inline"/> — Current sensors aur power transducers EMS ke field layer hain.</li>
      </ul>
    </>
  );
}
