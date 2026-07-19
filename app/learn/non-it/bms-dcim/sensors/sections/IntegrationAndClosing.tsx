"use client";
import { S, Callout, ComparisonTable, Figure } from "../shared";
import TopicLink from "@/components/TopicLink";
import SensorTroubleshootingFlow from "../svg/SensorTroubleshootingFlow";
import { faqs } from "../metadata";

export default function IntegrationAndClosing() {
  return (
    <>
      <h2 id="sensor-integration" style={S.h2}>Sensor Integration with BMS and DCIM</h2>
      <p style={S.p}>Sensor data BMS ya DCIM mein aane ke liye do paths hain. <strong>Direct hardwired:</strong> Sensor directly BMS/DCIM controller ke input pe wire hota hai — 4-20 mA AI, 0-10V AI, ya dry contact DI. Simple, reliable, no protocol needed. Limitation: ek sensor per wiring pair, distances limited (4-20 mA ke liye longer distances better tolerated). <strong>Protocol-based (Modbus/BACnet):</strong> Smart meter, network sensor ya equipment controller Modbus RTU/TCP ya BACnet pe multiple parameters expose karta hai — BMS driver poll karta hai. One cable/connection se multiple values. Requires protocol configuration aur driver.</p>
      <p style={S.p}>BMS mein sensor integrate karne ke steps: (1) Controller I/O type confirm karo — analog input 4-20 mA ya voltage? DI contact type? (2) Sensor ko correct controller terminal pe wire karo — polarity verify karo. (3) BMS point create karo — input type, range configure karo. (4) Scaling: raw input (0-100% ya raw mA) ko engineering unit mein convert karo — temperature transmitter 4-20 mA = 0-50°C means formula: T°C = (mA - 4) × 50 / 16. (5) Engineering unit configure karo. (6) Alarm limits add karo. (7) Verify — live value vs physical measurement compare karo.</p>
      <Callout type="best-practice" title="Loop Power — Who Provides It?">
        4-20 mA sensors typically external loop power require karte hain — 24V DC. 2-wire sensors loop current se khud power ho sakte hain (controller 24V provide karta hai loop mein). 3-wire sensors separate power supply chahiye. 4-wire sensors alag power supply aur alag signal pair. Sensor datasheet se wire configuration verify karo aur controller ka loop power availability check karo before wiring.
      </Callout>

      <h2 id="calibration" style={S.h2}>Calibration and Accuracy</h2>
      <p style={S.p}>Sensor accuracy calibration se maintain hoti hai — calibration ek known reference ke against sensor reading verify aur adjust karna hai. Different sensors differently drift karte hain. Temperature sensors (RTD) relatively stable hain — drift slow hota hai. Humidity sensors faster drift karte hain — contaminants accelerate drift. Pressure sensors mechanical stress se shift ho sakte hain. Energy/CT-based measurements CT condition, installation aur ratio accuracy pe depend karte hain.</p>
      <p style={S.p}>Calibration process: As-found reading record karo (sensor current output vs reference measurement). Agar within tolerance hai to no adjustment needed — still record karo. Agar out of tolerance — adjust (agar field adjustable) ya replace karo. As-left reading record karo. As-found/as-left records maintain karo — drift history visible hota hai. Calibration certificate reference instrument ke liye maintain karo (NIST-traceable).</p>
      <Callout type="important" title="Calibration Frequency — No Universal Schedule">
        Calibration frequency sensor type, criticality, accuracy class, OEM recommendation, applicable standards (ISO 9001, ISO 17025, ISO 50001) aur application pe depend karta hai — koi universal mandatory schedule nahi hai. Start with OEM recommendation. High-criticality measurements (billing meters, safety limits) more frequent. Track as-found readings — frequent out-of-tolerance indicates recalibrate more often or replace sensor.
      </Callout>

      <h2 id="preventive-maintenance" style={S.h2}>Preventive Maintenance</h2>
      <p style={S.p}><strong>Monthly (example):</strong> All sensors online in BMS — any offline or fault? Sample 10-15 sensors physical vs BMS value compare. Water leak sensors — visual inspection, no debris covering probe. Door contacts — spot check alignment. Alarm log — sensor-related alarms review.</p>
      <p style={S.p}><strong>Quarterly (example):</strong> Temperature/humidity sensors clean karo (compressed air, soft cloth per OEM). Sensor wiring terminals inspect — loose connections retighten. CT connections inspect — no loose secondary, no corrosion. Fuel level sensor verify — cross-check with dip stick or sight glass. Calibration check — spot check critical sensors against reference.</p>
      <p style={S.p}><strong>Annual (example):</strong> Full calibration cycle per project schedule. Replace sensors pe calibration history showing consistent drift. RTD resistance verify (reference ohmmeter). Energy meters — accuracy class verification. As-built sensor locations update agar moved. Sensor datasheet archive maintain karo.</p>

      <h2 id="troubleshooting" style={S.h2}>Engineer Troubleshooting — Sensor Issues</h2>
      <Figure caption="Fig 2 — Sensor troubleshooting systematic approach: start with physical, check signal/wiring, verify controller input, confirm scaling and BMS config."><SensorTroubleshootingFlow/></Figure>

      <h3 style={S.h3}>Fault 1: Sensor Reading Zero or Minimum</h3>
      <p style={S.p}><strong>First:</strong> 4-20 mA — multimeter ammeter mode mein series mein loop mein measure karo. 4 mA aur above hai? 0 mA = wire break ya sensor power failed. <strong>Next:</strong> Sensor power check karo (24V DC). Cable continuity check karo. <strong>Fix:</strong> Power restore. Cable repair. Sensor replace karo agar defective.</p>

      <h3 style={S.h3}>Fault 2: Wrong / Stuck Value</h3>
      <p style={S.p}><strong>First:</strong> BMS raw input value dekho — signal correct range mein hai? mA reading expected hai physical condition ke hisaab se? <strong>Next:</strong> Scaling formula correct hai? Min/max engineering value correct hai? Physical measurement karo calibrated instrument se — BMS se compare. <strong>Fix:</strong> Scaling formula correct karo per OEM spec. Sensor calibrate karo. Agar extreme drift — replace karo.</p>

      <h3 style={S.h3}>Fault 3: Excessive Noise / Fluctuating Value</h3>
      <p style={S.p}><strong>First:</strong> Cable shielding check karo — shielded cable use ho raha hai? Shield properly grounded hai (one end only)? <strong>Next:</strong> Ground loops — multiple ground points? Cable routing near power cables? <strong>Fix:</strong> Cable re-route separate from power cables. Shield single-point ground karo. Filter/averaging in BMS configure karo.</p>

      <h3 style={S.h3}>Fault 4: Temperature Reading Too High or Low (Offset)</h3>
      <p style={S.p}><strong>First:</strong> Calibrated reference thermometer se actual temperature measure karo same location pe. BMS value compare karo. <strong>Next:</strong> Consistent offset? Calibration shift indicate karta hai. Scaling aur zero offset check karo. <strong>Fix:</strong> Agar consistent offset — calibration adjustment karo (agar field adjustable). Otherwise replace sensor.</p>

      <h3 style={S.h3}>Fault 5: Door Contact False Alarm</h3>
      <p style={S.p}><strong>First:</strong> Physical — door fully closed aur latched? Magnet aur switch aligned? Gap too large? <strong>Next:</strong> Sensor mounting shifted? Door hinge wear causing misalignment? <strong>Fix:</strong> Realign magnet aur switch. Adjust mounting. Check door closer.</p>

      <h3 style={S.h3}>Fault 6: Water Leak Alarm — Verify Before Reset</h3>
      <p style={S.p}><strong>Always:</strong> Physical inspection — area dekho. Agar wet — source identify karo before reset. Dry karo area. Source fix karo. Sensor reset karo. Agar no water found — condensation? High humidity? Sensor fault? Investigate root cause before dismissing alarm.</p>

      <h3 style={S.h3}>Fault 7: CT / Energy Meter Wrong Reading</h3>
      <p style={S.p}><strong>First:</strong> CT ratio correct in meter AND in BMS/EMS scaling? (Both must match.) <strong>Next:</strong> CT polarity correct? Secondary connection tight? <strong>Fix:</strong> CT ratio enter karo. Polarity correct karo. Secondary retighten. Calibrated clamp meter se field current verify karo — compare with meter reading.</p>

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
        Ek data center mein BMS pe "Row C, Cold Aisle Temperature High" alarm aa gayi — 28°C showing tha jabki 25°C expected tha. On-site check mein actual temperature 25.2°C tha (handheld thermometer se measured). Investigation: BMS temperature transmitter ke wiring mein loose terminal tha — slight contact resistance causing 4-20 mA signal ka minor drop, which BMS interpreted as higher temperature (wrong scaling assumption). Terminal retighten karne pe BMS reading 25.1°C pe settle ho gayi. Lesson: Physical measurement always do — BMS value automatically believe mat karo without verification.
      </Callout>

      <h2 id="interview-questions" style={S.h2}>Interview Questions</h2>
      <h3 style={S.h3}>Q1: 4-20 mA signal ka live zero concept explain karo.</h3>
      <p style={S.p}><strong>Answer:</strong> 4-20 mA mein 4 mA = 0% of measurement range (minimum), 20 mA = 100% (maximum). "Live zero" ka matlab hai minimum signal 0 mA nahi 4 mA hai. Agar circuit mein koi wire break ya power failure ho to current zero ho jaati hai — controller detect karta hai ki 4 mA nahi aa rahi, fault condition flag karta hai. Agar 0-20 mA use karo to zero current ambiguous hai (range minimum ya fault?) — 4-20 mA is problem solve karta hai. Data centers mein 4-20 mA analog signals standard hai field sensors ke liye.</p>
      <h3 style={S.h3}>Q2: CT secondary open circuit kyun hazardous hai?</h3>
      <p style={S.p}><strong>Answer:</strong> CT primary mein high AC current flow hoti hai — secondary winding ek step-down transformer ki tarah kaam karta hai jo safely 5A ya 1A pe reduce karta hai jab secondary pe load (meter) connected ho. Agar secondary circuit open circuit ho (meter disconnect) — primary current magnetizing flux saturate karta hai aur secondary mein extremely high voltage induce ho sakti hai — insulation damage, equipment damage aur personnel injury ka risk. Rule: CT secondary circuit ko hamesha closed rakho (meter connected). Meter disconnect karna ho to pehle CT secondary short circuit karo (shorting switch se), phir meter disconnect karo.</p>
      <h3 style={S.h3}>Q3: Sensor calibration mein as-found aur as-left record kyun important hai?</h3>
      <p style={S.p}><strong>Answer:</strong> As-found = sensor reading before any calibration adjustment. As-left = reading after adjustment. Dono records maintenance history build karte hain. As-found data drift rate dikhata hai over time — agar sensor consistently fast drift kare to replacement consider karo ya calibration frequency increase karo. Quality management systems (ISO 9001) aur metrological traceability as-found/as-left records require karte hain. Compliance audits mein calibration records important evidence hain. Data ke bina "was this sensor accurate during the last month?" answerable nahi hai.</p>

      <h2 id="key-takeaways" style={S.h2}>Key Takeaways</h2>
      <ul style={S.ul}>
        <li>Sensors physical world ko BMS/DCIM ke liye electrical signals mein convert karte hain — sensor accuracy = monitoring system accuracy.</li>
        <li>4-20 mA standard analog signal hai — live zero (4 mA = 0%) wire break detect karta hai. Long cable runs ke liye preferred.</li>
        <li>Temperature sensor placement location critical hai — wrong location "all normal" show karti hai even if hot spots exist.</li>
        <li>CT secondary never open circuit karo — hazardous high voltage. Shorting switch use karo before meter disconnect.</li>
        <li>CT ratio and meter scaling both correct hone chahiye — mismatch proportionally wrong energy readings deta hai.</li>
        <li>Calibration drift normal hai — as-found/as-left records rakhna is drift ko track karna allow karta hai.</li>
        <li>Troubleshoot layer by layer: physical → signal/wiring → controller input → scaling/BMS config.</li>
        <li>Water leak alarm serious lo — physical investigation before reset, root cause verify karo.</li>
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
        <li><TopicLink slug="bms" variant="inline"/> — BMS mein sensors ka data integrate hota hai — alarms aur trends.</li>
        <li><TopicLink slug="ems" variant="inline"/> — Energy sensors (CT, meters) EMS ki foundation hain.</li>
        <li><TopicLink slug="dcim" variant="inline"/> — DCIM environmental sensors se data receive karta hai.</li>
        <li><TopicLink slug="vesda" variant="inline"/> — Specialized smoke detection sensors — early warning.</li>
        <li><TopicLink slug="access-control" variant="inline"/> — Door contact sensors access control mein bhi use hote hain.</li>
      </ul>
    </>
  );
}
