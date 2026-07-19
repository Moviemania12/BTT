"use client";
import { S, Callout, ComparisonTable, Figure } from "../shared";
import TopicLink from "@/components/TopicLink";
import SensorSignalTypes from "../svg/SensorSignalTypes";

export default function Basics() {
  return (
    <>
      <div style={{background:"#fef3c7",border:"1px solid #f59e0b",borderRadius:"10px",padding:"1.2rem 1.4rem",marginBottom:"2rem"}}>
        <p style={{fontWeight:700,color:"#78350f",marginBottom:"0.6rem",fontSize:"1rem"}}>📋 Quick Summary — Sensors in 2 Minutes</p>
        <ul style={{...S.ul,marginBottom:0}}>
          <li><strong>Foundation:</strong> Sensors physical world ko electrical signals mein convert karte hain — BMS/DCIM inhe read karke data, alarms aur trends generate karte hain.</li>
          <li><strong>Signal types:</strong> 4-20 mA (most common analog, cable-length tolerant), 0-10V (short runs), dry contact (binary), RTD (precision temperature), pulse (energy/flow), Modbus/BACnet (digital protocol, multiple values per device).</li>
          <li><strong>Key sensors:</strong> Temperature, humidity, differential pressure, water leak, fuel level, airflow, current (CT), energy meter, door contact, occupancy.</li>
          <li><strong>Common faults:</strong> Wrong signal type configured, loop power missing, CT ratio wrong, sensor drift, wrong placement, calibration overdue.</li>
          <li><strong>Troubleshoot:</strong> Physical → Signal/wiring (multimeter) → Controller input → Scaling/BMS config. Layer by layer.</li>
        </ul>
      </div>

      <h2 id="what-are-sensors" style={S.h2}>What Are Sensors in a Data Center?</h2>
      <p style={S.p}>Sensors physical world ko measurable electrical signals mein convert karte hain — BMS, EMS, DCIM aur SCADA inhe read karke data display karte hain, alarms generate karte hain, aur trends store karte hain. Sensor ke bina koi bhi monitoring system blind hai — dashboards aur alarms sirf utne accurate hain jitne underlying sensors accurate hain. Data center mein sensor variety bahut broad hai: temperature, humidity, pressure, water, fuel level, air movement, current, power, door status, occupancy, smoke — har ek specific physical parameter measure karta hai.</p>
      <p style={S.p}>Sensor chain ko samajhna important hai: Physical phenomenon → Sensor (measurement) → Signal (electrical output) → Wiring (field to controller) → Controller input (raw value) → Scaling (engineering unit) → BMS point (named tag) → HMI/Alarm/Trend. Har step mein error possible hai — ek galat CT ratio ya wrong scaling formula poore power monitoring system ko mislead kar deta hai. Is chain ka knowledge accurate integration aur efficient troubleshooting ke liye essential hai.</p>

      <h2 id="signal-types" style={S.h2}>Sensor Signal Types</h2>
      <p style={S.p}>Data center mein multiple signal types use hote hain — har ek ki apni characteristics, wiring requirements aur BMS controller input type hain. Correct signal type select karo aur BMS mein exactly same configure karo — mismatch se wrong values ya no reading aata hai.</p>
      <Figure caption="Fig 1 — Sensor signal types used in data centers — from dry contact and 4-20mA to Modbus/BACnet — with hardware, BMS connection and key notes."><SensorSignalTypes/></Figure>
      <Callout type="warning" title="4-20 mA Live Zero — Critical Safety Feature">
        4-20 mA current loop mein 4 mA minimum (0% of measurement range) aur 20 mA maximum (100%) hota hai. 4 mA se neeche signal — especially 0 mA ke karib — typically wire break ya sensor power failure indicate karta hai, lekin exact fault band interpretation controller, BMS implementation aur instrument specification pe depend karta hai (NAMUR NE43 jaise standards specific underrange/fault bands define karte hain advanced instrumentation ke liye). Agar 0-20 mA sensor use karo to zero current ambiguous hai — range minimum ya circuit fault? Data centers mein 4-20 mA prefer karo wherever possible — diagnostic benefits milte hain.
      </Callout>
    </>
  );
}
