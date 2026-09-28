"use client";
import { S, Callout, ComparisonTable, Figure } from "../shared";
import TopicLink from "@/components/TopicLink";
import SensorSignalTypes from "../svg/SensorSignalTypes";

export default function Basics() {
  return (
    <>
      <div style={{background:"#fef3c7",border:"1px solid #f59e0b",borderRadius:"10px",padding:"1.2rem 1.4rem",marginBottom:"2rem"}}>
        <p style={{fontWeight:700,color:"#78350f",marginBottom:"0.6rem",fontSize:"1rem"}}>📋 Quick Summary — Sensors in 2 Minutes</p> <ul style={{...S.ul,marginBottom:0}}> <li><strong>Foundation:</strong> Sensors convert the physical world into electrical signals — the BMS/DCIM reads them and generates data, alarms and trends.</li> <li><strong>Signal types:</strong> 4-20 mA (most common analog, cable-length tolerant), 0-10V (short runs), dry contact (binary), RTD (precision temperature), pulse (energy/flow), Modbus/BACnet (digital protocol, multiple values per device).</li> <li><strong>Key sensors:</strong> Temperature, humidity, differential pressure, water leak, fuel level, airflow, current (CT), energy meter, door contact, occupancy.</li> <li><strong>Common faults:</strong> Wrong signal type configured, loop power missing, CT ratio wrong, sensor drift, wrong placement, calibration overdue.</li> <li><strong>Troubleshoot:</strong> Physical → Signal/wiring (multimeter) → Controller input → Scaling/BMS config. Layer by layer.</li> </ul>
      </div>

      <h2 id="what-are-sensors" style={S.h2}>What Are Sensors in a Data Center?</h2>
      <p style={S.p}>Sensors convert the physical world into measurable electrical signals — the BMS, EMS, DCIM and SCADA read them to display data, generate alarms and store trends. Without sensors any monitoring system is blind — dashboards and alarms are only as accurate as the underlying sensors. In a data center the sensor variety is very broad: temperature, humidity, pressure, water, fuel level, air movement, current, power, door status, occupancy, smoke — each measures a specific physical parameter.</p>
      <p style={S.p}>Understanding the sensor chain is important: Physical phenomenon → Sensor (measurement) → Signal (electrical output) → Wiring (field to controller) → Controller input (raw value) → Scaling (engineering unit) → BMS point (named tag) → HMI/Alarm/Trend. An error is possible at every step — one wrong CT ratio or wrong scaling formula misleads the entire power monitoring system. Knowledge of this chain is essential for accurate integration and efficient troubleshooting.</p>

      <h2 id="signal-types" style={S.h2}>Sensor Signal Types</h2>
      <p style={S.p}>Multiple signal types are used in a data center — each has its own characteristics, wiring requirements and BMS controller input type. Select the correct signal type and configure exactly the same in the BMS — a mismatch gives wrong values or no reading.</p>
      <Figure caption="Fig 1 — Sensor signal types used in data centers — from dry contact and 4-20mA to Modbus/BACnet — with hardware, BMS connection and key notes."><SensorSignalTypes/></Figure>
      <Callout type="warning" title="4-20 mA Live Zero — Critical Safety Feature">
        In a 4-20 mA current loop, 4 mA is the minimum (0% of measurement range) and 20 mA the maximum (100%). A signal below 4 mA — especially near 0 mA — typically indicates a wire break or sensor power failure, but the exact fault band interpretation depends on the controller, BMS implementation and instrument specification (standards like NAMUR NE43 define specific underrange/fault bands for advanced instrumentation). If you use a 0-20 mA sensor, zero current is ambiguous — range minimum or circuit fault? In data centers prefer 4-20 mA wherever possible — you get diagnostic benefits.
      </Callout>
    </>
  );
}
