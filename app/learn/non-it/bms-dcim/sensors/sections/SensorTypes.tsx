"use client";
import { S, Callout, ComparisonTable } from "../shared";

export default function SensorTypes() {
  return (
    <>
      <h2 id="temperature" style={S.h2}>Temperature Sensors</h2>
      <p style={S.p}>Temperature measurement is the most critical monitoring parameter in a data center. Common sensor types: <strong>RTD (Resistance Temperature Detector)</strong> — Pt100 (100 ohm at 0°C) and Pt1000 (1000 ohm at 0°C) are the most common industrial standards. Resistance increases predictably with temperature — accurate, stable, slow drift. Available in 2-wire, 3-wire or 4-wire configurations — 4-wire gives the best accuracy (lead resistance is eliminated). <strong>NTC/PTC Thermistors</strong> — non-linear resistance vs temperature, used in simpler circuits. <strong>4-20 mA Temperature Transmitters</strong> — sensor + transmitter combined unit, gives a 4-20 mA output directly — the easiest integration in the BMS. <strong>PT100 or 4-20 mA transmitters</strong> are the most common data center choices.</p>
      <Callout type="important" title="Temperature Sensor Placement — Location Is Everything">
        In the cold aisle, install sensors at server inlet height (typical: 1U from bottom, 1U from middle, 1U from top of rack — per project specification). Return air temperature is different from inlet temperature — both matter. A single room ambient sensor is not adequate for granular monitoring. ASHRAE TC9.9 guidelines provide temperature monitoring recommendations — refer to them in the project design.
      </Callout>

      <h2 id="humidity" style={S.h2}>Humidity Sensors</h2>
      <p style={S.p}>Relative Humidity (RH) sensors in the data center come in combined transmitters with temperature — a single unit measures both temperature and humidity and outputs 4-20 mA or 0-10V signals (one per parameter). Capacitive humidity sensors are the most common — a dielectric material absorbs humidity and the capacitance changes.</p>
      <p style={S.p}>Humidity sensors drift faster than temperature sensors — annual calibration is generally recommended, but the frequency depends on OEM recommendation and criticality. Contamination (dust, chemicals, condensation exposure) causes sensitivity and calibration shift. ASHRAE A1 class recommendation: 20-80% RH range — extremes create low humidity (static risk) and high humidity (condensation risk). Verify actual limits from the project specification.</p>

      <h2 id="differential-pressure" style={S.h2}>Differential Pressure Sensors</h2>
      <p style={S.p}>Differential pressure (DP) sensors measure the difference between two pressure points — a "high pressure" port and a "low pressure" port. Multiple applications in a data center: (1) <strong>Raised floor plenum:</strong> Positive pressure in the plenum gives server racks adequate airflow — measure DP by placing the sensor between the plenum and the room. Typical range: 5-50 Pa (depends on design). (2) <strong>CRAC/CRAH filter:</strong> Low DP on a fresh filter; DP increases on a clogged filter — the BMS generates a filter change alert at the threshold. (3) <strong>Containment systems:</strong> Pressure differential in hot aisle/cold aisle containment. (4) In <strong>clean rooms or special areas</strong>.</p>
      <p style={S.p}>A DP sensor typically gives a 4-20 mA or 0-10V output — the range is project-specific (e.g., 0-250 Pa). Connect the high pressure port (+) to the high pressure side and the low pressure port (-) to the low pressure side — a reversed connection gives a negative reading. Tubing connections must be clean and kink-free — blocked tubing gives wrong readings.</p>

      <h2 id="water-leak" style={S.h2}>Water Leak Detection Sensors</h2>
      <p style={S.p}>Water leak detection is critical in a data center — an undetected leak can cause equipment damage, a slip hazard and an electrical fault. Common types: <strong>Point sensor (probe type):</strong> Detects water presence at one specific location — typically a float switch or conductive probe. Dry contact output — alarm when water is detected. <strong>Rope/cable sensor:</strong> Deploy a long conductive rope or sensing cable — wherever water touches the rope, the position is identified (zone or exact location depending on the system). Areas under the raised floor below CRAC units, near plumbing, around chilled water connections are covered.</p>
      <Callout type="warning" title="Water Leak Alarm — Take Seriously, Investigate Immediately">
        False alarms are rare — when a water leak alarm comes, do a physical investigation immediately. Identify the source (CRAC condensate line, chilled water valve/connection, plumbing, external). The sensor only detects water presence — the source comes from independent investigation. Reset only when the area is dry and the source is rectified. Investigate recurring false alarms — sensor fault or actual intermittent moisture.
      </Callout>

      <h2 id="fuel-level" style={S.h2}>Fuel and Tank Level Sensors</h2>
      <p style={S.p}>Diesel generator fuel tank level monitoring is important — if the generator fails due to low fuel, backup power is gone. Common level sensing methods: <strong>Float sensor (level switch):</strong> Simple — the float rises/falls with the fuel level, a reed switch closes/opens at specific levels. Gives high/low level alarm dry contacts. <strong>Ultrasonic level sensor:</strong> Sends an ultrasonic pulse from the tank top — it reflects from the fluid surface, distance is calculated from time. Non-contact, no moving parts. 4-20 mA output. <strong>Pressure/hydrostatic level sensor:</strong> Installed at the tank bottom — fluid pressure = fluid height × density. 4-20 mA output. Fuel type and density must be correctly programmed.</p>
      <p style={S.p}>Fuel level is typically displayed on the BMS as a percentage (0-100%) or in liters/gallons. The low level alarm threshold depends on project requirement, DG runtime requirement and operational policy — specific percentages are defined by the project design. Remote monitoring supports fuel delivery scheduling.</p>

      <h2 id="airflow" style={S.h2}>Airflow Sensors</h2>
      <p style={S.p}>Airflow velocity or volume measurement is used in specific applications — AHU duct airflow, clean room airflow, raised floor tile airflow. A <strong>Pitot tube</strong> calculates velocity from differential pressure — simple, no moving parts, needs periodic calibration. <strong>Thermal (hot wire) anemometer</strong> — the rate of heat loss from a heated element is proportional to airflow velocity — fast response, good for low velocities. <strong>Vane anemometer</strong> — rotating vane, good for higher velocities, moving parts. <strong>Ultrasonic flow meter</strong> — high accuracy in ducts, no intrusion, typically higher cost. Output typically 4-20 mA or 0-10V. In data centers it is typically used for CRAC/AHU discharge velocity or raised floor plenum assessment.</p>

      <h2 id="current-voltage" style={S.h2}>Current and Voltage Measurement</h2>
      <p style={S.p}><strong>Current Transformers (CT)</strong> are the most common current measurement device in a data center. The CT core fits around the AC primary conductor (clamp-on or split-core for retrofit, solid core for new installation). The CT ratio (e.g., 200:5 A) transforms the primary current into the secondary safe range (typically 5A or 1A). The CT secondary connects to a compatible energy meter, power analyzer or dedicated current transducer — a standard 1A/5A CT secondary is not connected directly to a generic BMS analog input; compatibility and safety rating of the input circuit are essential. The transducer or meter then gives a 4-20 mA or Modbus output to the BMS.</p>
      <p style={S.p}>Critical CT rules: <strong>Never open-circuit a CT secondary</strong> — dangerous high voltage is generated. If the meter has to be disconnected, first short-circuit the CT secondary (shorting switch). Program the CT ratio correctly in the meter/BMS — wrong ratio = proportionally wrong current/power readings. Connect polarity (P1/P2 primary, S1/S2 secondary) correctly — reversed polarity gives a negative current reading.</p>
      <p style={S.p}><strong>Voltage measurement</strong> is typically by direct connection (low voltage systems) or through Voltage Transformers (VT/PT) (high voltage systems). The voltmeter/power meter connects directly to the line or the VT secondary. Phase-to-neutral (L-N) and phase-to-phase (L-L) voltages are measured — in three-phase systems typically monitor all three phases.</p>

      <h2 id="power-energy" style={S.h2}>Power and Energy Measurement</h2>
      <p style={S.p}><strong>Power (kW)</strong> = Voltage × Current × Power Factor × (√3 for three-phase). Dedicated energy meters sample voltage and current simultaneously and calculate power — a simple V × A calculation is not accurate (power factor missing). <strong>Energy (kWh)</strong> is accumulated power over time — the basis of billing. Modern meters also measure <strong>reactive power (kVAR)</strong> and <strong>power factor</strong>.</p>
      <p style={S.p}>Modern multifunction power analyzers/meters (e.g., Schneider PowerLogic, ABB, Chint, Siemens SENTRON series — illustrative examples) typically natively support Modbus RTU/TCP — comprehensive electrical parameters come from a single device. BACnet support depends on the model and firmware; some meters expose BACnet through a gateway. Verify protocol support from the OEM documentation of the specific meter model. In a data center energy metering is typically on the incomer, UPS, CRAC/AHU, PDU circuits — sub-metering granularity depends on the project design.</p>

      <h2 id="door-contact" style={S.h2}>Door and Contact Sensors</h2>
      <p style={S.p}>Magnetic contact sensors (door/window switches) are widely used in data centers — server room doors, external doors, access panels, cage doors. The sensor has two parts: a magnet (on the door) and a reed switch (on the frame). When the door is closed the magnet attracts the reed switch — the circuit closes. When the door opens the magnetic field breaks — the circuit opens. It connects to a digital input (DI) of the BMS controller — detects the closed/open state.</p>
      <p style={S.p}>Contact sensors are binary — only open/closed, no measurement. Supervised contact loops (end-of-line resistors) allow tamper detection — a wire cut or short circuit is detected. The supervision requirement depends on project design, applicable security standards, codes and client policy — it is not universally mandatory but is typically specified in high-security applications. Alignment is critical — the sensor must be properly aligned on the door and frame — minor misalignment creates false "door open" alarms.</p>

      <h2 id="occupancy" style={S.h2}>Occupancy and Presence Sensors</h2>
      <p style={S.p}>PIR (Passive Infrared) occupancy sensors detect body heat — motion triggers them. In data centers they are used in the mantrap vestibule and at server hall entries. Also common in lighting control and security applications. Microwave or dual-technology (PIR + microwave) sensors are more reliable for detecting stationary persons. Digital output to the BMS — occupied/unoccupied state. PIR range and sensitivity are adjustable — avoid dead zones in high-security areas.</p>

      <h2 id="smoke-vibration" style={S.h2}>Smoke and Vibration Sensors</h2>
      <p style={S.p}><strong>Smoke sensors</strong> are the primary instruments for fire detection — in a data center the dedicated fire alarm system handles this (VESDA, ionization, photoelectric detectors). The BMS typically receives a status point from the fire alarm system — alarm or normal — but the BMS is not a replacement for the fire alarm system. Refer to the <strong>VESDA article</strong> for detailed fire detection coverage.</p>
      <p style={S.p}><strong>Vibration sensors</strong> are used to monitor the mechanical health of rotating equipment — chillers, cooling tower fans, generators, pumps. They measure vibration acceleration (m/s² or g) — bearing wear, imbalance, misalignment are detected early. Typically 4-20 mA or IEPE output. Vibration monitoring typically uses dedicated vibration monitoring systems (Brüel & Kjær, SKF, Emerson) that can then integrate with the BMS via Modbus or relay outputs. Applicable on specialized equipment in a data center building — not standard in every deployment.</p>

      <ComparisonTable
        title="Data Center Sensors — Quick Reference"
        headers={["Sensor Type","Measured Parameter","Typical Signal","BMS Integration","Key Concern"]}
        rows={[
          ["Temperature (4-20mA transmitter)","°C / °F","4–20 mA","Analog Input (AI)","Placement, calibration drift"],
          ["Temperature (RTD Pt100)","°C","Resistance (3 or 4-wire)","Dedicated RTD input","Lead resistance (use 4-wire)"],
          ["Humidity (combined T+RH)","% RH","4–20 mA (2 signals)","Analog Input (AI) ×2","Faster drift, clean sensor"],
          ["Differential Pressure","Pa / mmWG","4–20 mA or 0-10V","Analog Input (AI)","Correct H/L port, clean tubes"],
          ["Water Leak (point)","Water presence","Dry contact (NC/NO)","Digital Input (DI)","Placement under equipment"],
          ["Water Leak (rope/cable)","Water location","Zoned or addressed","DI + zone panel","Coverage area layout"],
          ["Fuel Level (ultrasonic)","%, m, litres","4–20 mA","Analog Input (AI)","Mounting position, density"],
          ["Current Transformer","Amps AC","Secondary 5A or 1A → meter","Energy meter → Modbus","CT ratio, never open secondary"],
          ["Energy Meter","kW, kWh, PF","Modbus RTU/TCP","Protocol driver","CT ratio, byte order (32-bit)"],
          ["Door Contact","Open / Closed","Volt-free dry contact","Digital Input (DI)","Alignment, supervision"],
          ["PIR Occupancy","Presence","Dry contact","Digital Input (DI)","Coverage, dead zones"],
          ["Airflow Velocity","m/s","4–20 mA or 0-10V","Analog Input (AI)","Zero offset, calibration"],
        ]}
        caption="Actual sensor type, signal and integration method depends on project specification, equipment selection and site conditions."
      />
    </>
  );
}
