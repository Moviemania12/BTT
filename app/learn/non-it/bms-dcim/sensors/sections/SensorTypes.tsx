"use client";
import { S, Callout, ComparisonTable } from "../shared";

export default function SensorTypes() {
  return (
    <>
      <h2 id="temperature" style={S.h2}>Temperature Sensors</h2>
      <p style={S.p}>Temperature measurement data center mein sabse critical monitoring parameter hai. Common sensor types: <strong>RTD (Resistance Temperature Detector)</strong> — Pt100 (100 ohm at 0°C) aur Pt1000 (1000 ohm at 0°C) sabse common industrial standards hain. Resistance temperature ke saath predictably increase karta hai — accurate, stable, slow drift. 2-wire, 3-wire ya 4-wire configurations mein available — 4-wire best accuracy deta hai (lead resistance eliminate hoti hai). <strong>NTC/PTC Thermistors</strong> — non-linear resistance vs temperature, simpler circuits mein use hote hain. <strong>4-20 mA Temperature Transmitters</strong> — sensor + transmitter combined unit, directly 4-20 mA output deta hai — BMS mein sabse easy integration. <strong>PT100 ya 4-20 mA transmitters</strong> most common data center choices hain.</p>
      <Callout type="important" title="Temperature Sensor Placement — Location Is Everything">
        Cold aisle mein sensors server inlet height pe laga (typical: 1U from bottom, 1U from middle, 1U from top of rack — project specification per). Return air temperature alag hoti hai inlet temperature se — both matter. A single room ambient sensor adequate nahi hai granular monitoring ke liye. ASHRAE TC9.9 guidelines temperature monitoring recommendations provide karte hain — reference karo project design mein.
      </Callout>

      <h2 id="humidity" style={S.h2}>Humidity Sensors</h2>
      <p style={S.p}>Relative Humidity (RH) sensors data center mein temperature ke saath combined transmitters mein aate hain — ek single unit temperature aur humidity dono measure karta hai, 4-20 mA ya 0-10V signals (ek per parameter) output karta hai. Capacitive humidity sensors most common hain — dielectric material humidity absorb karta hai aur capacitance change hoti hai.</p>
      <p style={S.p}>Humidity sensors temperature sensors se faster drift karte hain — annual calibration generally recommended hai lekin frequency OEM recommendation aur criticality pe depend karta hai. Contamination (dust, chemicals, condensation exposure) sensitivity aur calibration shift cause karta hai. ASHRAE A1 class recommendation: 20-80% RH range — extremes low humidity (static risk) aur high humidity (condensation risk) create karte hain. Actual limits project specification se verify karo.</p>

      <h2 id="differential-pressure" style={S.h2}>Differential Pressure Sensors</h2>
      <p style={S.p}>Differential pressure (DP) sensors do pressure points ka difference measure karte hain — "high pressure" port aur "low pressure" port. Data center mein multiple applications: (1) <strong>Raised floor plenum:</strong> Plenum pe positive pressure server racks ko adequate airflow deta hai — sensor plenum aur room mein laga kar DP measure karo. Typical range: 5-50 Pa (depends on design). (2) <strong>CRAC/CRAH filter:</strong> Fresh filter pe low DP; clogged filter pe DP badhta hai — BMS filter change alert generate karta hai threshold pe. (3) <strong>Containment systems:</strong> Hot aisle/cold aisle containment mein pressure differential. (4) <strong>Clean rooms ya special areas</strong> mein.</p>
      <p style={S.p}>DP sensor typically 4-20 mA ya 0-10V output deta hai — range project-specific hai (e.g., 0-250 Pa). High pressure port (+) high pressure side se aur low pressure port (-) low pressure side se connect karo — reversed connection negative reading deta hai. Tubing connections clean aur kink-free honi chahiye — blocked tubing wrong readings deta hai.</p>

      <h2 id="water-leak" style={S.h2}>Water Leak Detection Sensors</h2>
      <p style={S.p}>Water leak detection data center mein critical hai — ek undetected leak equipment damage, slip hazard aur electrical fault cause kar sakti hai. Common types: <strong>Point sensor (probe type):</strong> Ek specific location pe water presence detect karta hai — typically float switch ya conductive probe. Dry contact output — alarm jab water detected. <strong>Rope/cable sensor:</strong> Ek long conductive rope ya sensing cable deploy karo — kahan bhi rope pe water aaye, position identify hota hai (zone ya exact location depending on system). Raised floor under CRAC units, near plumbing, around chilled water connections ke areas cover hote hain.</p>
      <Callout type="warning" title="Water Leak Alarm — Take Seriously, Investigate Immediately">
        False alarms rare hain — water leak alarm ane pe immediately physical investigation karo. Source identify karo (CRAC condensate line, chilled water valve/connection, plumbing, external). Sensor sirf water presence detect karta hai — source independent investigation se milta hai. Reset karo sirf jab area dry aur source rectified ho. Recurring false alarms investigate karo — sensor fault ya actual intermittent moisture.
      </Callout>

      <h2 id="fuel-level" style={S.h2}>Fuel and Tank Level Sensors</h2>
      <p style={S.p}>Diesel generator fuel tank level monitoring important hai — low fuel ne generator fail kia toh backup power gone. Common level sensing methods: <strong>Float sensor (level switch):</strong> Simple — float rises/falls with fuel level, reed switch at specific levels close/open karta hai. High/low level alarm dry contacts deta hai. <strong>Ultrasonic level sensor:</strong> Tank top se ultrasonic pulse bhejta hai — fluid surface se reflect hota hai, time se distance calculate hoti hai. Non-contact, no moving parts. 4-20 mA output. <strong>Pressure/hydrostatic level sensor:</strong> Tank bottom pe laga — fluid pressure = fluid height × density. 4-20 mA output. Fuel type aur density correctly programmed hona chahiye.</p>
      <p style={S.p}>Fuel level typically percentage (0-100%) ya liters/gallons mein BMS pe display hota hai. Low level alarm threshold project requirement, DG runtime requirement aur operational policy pe depend karta hai — specific percentages project design se define hote hain. Remote monitoring fuel delivery scheduling support karta hai.</p>

      <h2 id="airflow" style={S.h2}>Airflow Sensors</h2>
      <p style={S.p}>Airflow velocity ya volume measurement specific applications mein use hota hai — AHU duct airflow, clean room airflow, raised floor tile airflow. <strong>Pitot tube</strong> differential pressure se velocity calculate karta hai — simple, no moving parts, calibration periodic chahiye. <strong>Thermal (hot wire) anemometer</strong> — heated element se heat loss rate airflow velocity se proportional hota hai — fast response, good for low velocities. <strong>Vane anemometer</strong> — rotating vane, good for higher velocities, moving parts. <strong>Ultrasonic flow meter</strong> — ducts mein high accuracy, no intrusion, typically higher cost. Output typically 4-20 mA ya 0-10V. Data centers mein typically CRAC/AHU discharge velocity ya raised floor plenum assessment ke liye use hota hai.</p>

      <h2 id="current-voltage" style={S.h2}>Current and Voltage Measurement</h2>
      <p style={S.p}><strong>Current Transformers (CT)</strong> data center mein most common current measurement device hain. AC primary conductor ke around CT core fit hota hai (clamp-on ya split-core for retrofit, solid core new installation). CT ratio (e.g., 200:5 A) primary current ko secondary safe range (typically 5A or 1A) mein transform karta hai. CT secondary ek compatible energy meter, power analyzer ya dedicated current transducer pe connect hoti hai — standard 1A/5A CT secondary ko generic BMS analog input se directly connect nahi karte; input circuit ki compatibility aur safety rating zaroori hai. Transducer ya meter phir 4-20 mA ya Modbus output BMS ko deta hai.</p>
      <p style={S.p}>Critical CT rules: <strong>Never open-circuit a CT secondary</strong> — dangerous high voltage generate hoti hai. Agar meter disconnect karna ho to pehle CT secondary short-circuit (shorting switch) karo. CT ratio meter/BMS mein correctly program karo — wrong ratio = proportionally wrong current/power readings. Polarity (P1/P2 primary, S1/S2 secondary) correctly connect karo — reversed polarity negative current reading deta hai.</p>
      <p style={S.p}><strong>Voltage measurement</strong> typically direct connection (low voltage systems) ya Voltage Transformers (VT/PT) through (high voltage systems). Voltmeter/power meter directly line ya VT secondary pe connect hota hai. Phase-to-neutral (L-N) aur phase-to-phase (L-L) voltages measure hote hain — three-phase systems mein typically sab teen phases monitor karo.</p>

      <h2 id="power-energy" style={S.h2}>Power and Energy Measurement</h2>
      <p style={S.p}><strong>Power (kW)</strong> = Voltage × Current × Power Factor × (√3 for three-phase). Dedicated energy meters voltage aur current simultaneously sample karte hain aur power calculate karte hain — simple V × A calculation accurate nahi hota (power factor missing). <strong>Energy (kWh)</strong> accumulated power over time — billing ka basis. <strong>Reactive power (kVAR)</strong> aur <strong>power factor</strong> bhi modern meters measure karte hain.</p>
      <p style={S.p}>Modern multifunction power analyzers/meters (e.g., Schneider PowerLogic, ABB, Chint, Siemens SENTRON series — illustrative examples) typically Modbus RTU/TCP natively support karte hain — comprehensive electrical parameters single device se milte hain. BACnet support model aur firmware pe depend karta hai; kuch meters gateway ke through BACnet expose karte hain. Protocol support verify karo specific meter model ke OEM documentation se. Data center mein typically incomer, UPS, CRAC/AHU, PDU circuits pe energy metering hoti hai — sub-metering granularity project design pe depend karta hai.</p>

      <h2 id="door-contact" style={S.h2}>Door and Contact Sensors</h2>
      <p style={S.p}>Magnetic contact sensors (door/window switches) data centers mein widely use hote hain — server room doors, external doors, access panels, cage doors. Sensor do parts ka hota hai: magnet (door pe) aur reed switch (frame pe). Door closed hone pe magnet reed switch attract karta hai — circuit close. Door open hone pe magnetic field break — circuit open. BMS controller digital input (DI) pe connect hota hai — closed/open state detect karta hai.</p>
      <p style={S.p}>Contact sensors binary hai — sirf open/closed, no measurement. Supervised contact loops (end-of-line resistors) tamper detection allow karte hain — wire cut ya short circuit detect hota hai. Supervision requirement project design, applicable security standards, codes aur client policy pe depend karta hai — universal mandatory nahi hai lekin high-security applications mein typically specified hoti hai. Alignment critical hai — door aur frame pe sensor properly aligned hona chahiye — minor misalignment false "door open" alarms create karta hai.</p>

      <h2 id="occupancy" style={S.h2}>Occupancy and Presence Sensors</h2>
      <p style={S.p}>PIR (Passive Infrared) occupancy sensors body heat detect karte hain — motion trigger karta hai. Data centers mein mantrap vestibule mein, server hall entries mein use hote hain. Lighting control aur security applications mein also common. Microwave ya dual-technology (PIR + microwave) sensors more reliable hain for detecting stationary persons. BMS pe digital output — occupied/unoccupied state. PIR range aur sensitivity adjustable — dead zones avoid karo high-security areas mein.</p>

      <h2 id="smoke-vibration" style={S.h2}>Smoke and Vibration Sensors</h2>
      <p style={S.p}><strong>Smoke sensors</strong> fire detection ke liye primary instruments hain — data center mein dedicated fire alarm system handle karta hai (VESDA, ionization, photoelectric detectors). BMS typically fire alarm system se status point receive karta hai — alarm ya normal — lekin BMS fire alarm system ka replacement nahi hai. Refer <strong>VESDA article</strong> for detailed fire detection coverage.</p>
      <p style={S.p}><strong>Vibration sensors</strong> rotating equipment — chillers, cooling tower fans, generators, pumps — ki mechanical health monitor karne ke liye use hote hain. Vibration acceleration (m/s² ya g) measure karta hai — bearing wear, imbalance, misalignment early detect hota hai. Typically 4-20 mA ya IEPE output. Vibration monitoring typically dedicated vibration monitoring systems use karte hain (Brüel & Kjær, SKF, Emerson) jo then BMS se integrate ho sakte hain via Modbus ya relay outputs. Data center building mein specialized equipment pe applicable — not standard in every deployment.</p>

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
