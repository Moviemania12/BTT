"use client";

import { S, Callout, ComparisonTable, Figure } from "../shared";
import BmsDataFlow from "../svg/BmsDataFlow";

export default function Architecture() {
  return (
    <>
      {/* ═══════════════════════════════════════════════════════════════
          SECTION 4 — BMS ARCHITECTURE
      ═══════════════════════════════════════════════════════════════ */}
      <h2 id="bms-architecture" style={S.h2}>Complete BMS System Architecture</h2>

      <p style={S.p}>
        BMS architecture ko teen ya paanch layers mein samjha ja sakta hai. Paanch layers zyada
        accurate picture deta hai kyunki network layer aur server layer separately important hain. Field
        layer pe actual equipment aur sensors hain. Controller layer pe DDC ya integration modules hain
        jo field devices se data collect karte hain aur protocols mein baat karte hain. Network layer pe
        Ethernet backbone hai jis pe controllers aur server communicate karte hain. Server layer pe BMS
        application software aur database/historian hai. Presentation layer pe operator workstations,
        dashboards, alarm monitors aur remote access hain.
      </p>

      <h3 style={S.h3}>Field Layer — Sensors, Actuators and Equipment</h3>
      <p style={S.p}>
        Is layer mein physical world hota hai. Temperature sensors, humidity sensors, pressure
        transducers, current transformers, energy meters, dry contact relays, flow meters — ye sab
        field devices hain. Kuch equipment (jaise UPS, PAC, chiller) mein apna onboard controller
        hota hai jo local parameters calculate karta hai aur communication interface (Modbus port,
        BACnet/IP, SNMP) expose karta hai. Simpler devices — jaise door contact ya water leak strip —
        sirf binary signal dete hain.
      </p>

      <h3 style={S.h3}>Controller Layer — DDC, PLC and Integration Modules</h3>
      <p style={S.p}>
        Controllers field devices se data collect karte hain, local processing karte hain, aur BMS
        server se network pe communicate karte hain. Ek DDC controller multiple analog inputs (AI),
        analog outputs (AO), digital inputs (DI/BI) aur digital outputs (DO/BO) pe field devices
        connect kar sakta hai. Some controllers ek specific BMS vendor ke proprietary controllers hote
        hain; others are open-protocol capable. Protocol gateway ya integration server kuch projects
        mein dedicated controller ki jagah use hota hai — especially jab existing equipment Modbus RTU
        pe hai aur BMS BACnet/IP expect karta hai.
      </p>

      <h3 style={S.h3}>Network Layer — Communication Backbone</h3>
      <p style={S.p}>
        BMS network dedicated Ethernet infrastructure hoti hai — production IT network se separate
        (different VLAN ya physical network). Controllers network pe communicate karte hain BMS server
        ke saath. RS-485 serial field bus bhi exist kar sakta hai controllers ke field side pe — ye
        controller ke neeche hoti hai, not the BMS backbone. Network redundancy critical facilities
        mein design kiya ja sakta hai.
      </p>

      <h3 style={S.h3}>Server Layer — BMS Server and Database/Historian</h3>
      <p style={S.p}>
        BMS server application software run karta hai — point database, alarm engine, scheduler,
        trend logger, reporting engine, user management. Historian database long-term point values
        store karta hai timestamp ke saath — ye analysis, reporting aur root cause investigation ke
        liye use hoti hai. Server redundancy (primary + standby) larger deployments mein common hai.
        Cloud-based BMS platforms bhi available hain jo on-premise historian ki jagah cloud storage
        use karte hain.
      </p>

      <h3 style={S.h3}>Presentation Layer — HMI, Workstation and Dashboards</h3>
      <p style={S.p}>
        Operator workstation pe HMI (Human-Machine Interface) graphic pages run hote hain — floor plans,
        single line diagrams, equipment screens, alarm summaries, trend graphs. Operators yahan se live
        data dekhte hain, alarms acknowledge karte hain, aur (where permitted) commands issue karte
        hain. Web-based interfaces remote access allow karte hain — secured authentication ke through.
        Mobile apps bhi kuch platforms pe available hain.
      </p>

      <Figure caption="Fig 2 — BMS data flow from physical equipment through communication layers to HMI display and alarm/trend outputs.">
        <BmsDataFlow />
      </Figure>

      {/* ═══════════════════════════════════════════════════════════════
          SECTION 5 — SENSORS AND FIELD DEVICES
      ═══════════════════════════════════════════════════════════════ */}
      <h2 id="sensors-field-devices" style={S.h2}>Sensors and Field Devices</h2>

      <h3 style={S.h3}>Analog Sensors — Temperature, Humidity, Pressure, Current, Voltage</h3>
      <p style={S.p}>
        Analog sensors continuous physical quantities measure karte hain aur ek proportional electrical
        signal output karte hain. Data center mein most common analog signal standard hai{" "}
        <strong>4–20 mA current loop</strong> — 4 mA minimum (0% of range) aur 20 mA maximum (100% of
        range). Current loop ka advantage hai ki long cable runs pe voltage drop affect nahi karta.{" "}
        <strong>0–10 V DC</strong> voltage signals bhi use hote hain — lekin shorter runs ke liye preferred.
        Temperature sensors NTC/PTC thermistors, RTD (Pt100/Pt1000) ya 4-20 mA transmitters ke roop
        mein aate hain. Humidity sensors typically 4-20 mA ya 0-10V combined temperature/humidity
        transmitters hote hain.
      </p>

      <h3 style={S.h3}>Digital/Binary Points — Status, Alarms, Contacts</h3>
      <p style={S.p}>
        Binary points sirf ON/OFF ya OPEN/CLOSED state represent karte hain. Dry contact (volt-free
        contact) — equipment ka output relay — BMS ka digital input pe connect hota hai. UPS ka "Common
        Alarm" contact, generator ka "Running" contact, ATS ka "Position" contact — ye sab dry contacts
        hain. BMS end pe controller ek small voltage apply karta hai (typically 24V DC) aur contact
        close ya open state detect karta hai. Ye hardwired integration ka simplest form hai — koi
        protocol nahi, sirf wiring.
      </p>

      <h3 style={S.h3}>Pulse/Counter Inputs — Energy Meters</h3>
      <p style={S.p}>
        Energy meters often pulse output dete hain — har pulse ek fixed energy unit represent karta hai
        (e.g., 1 pulse = 1 Wh ya 1 kWh, depending on meter configuration). BMS controller pulse count
        karta hai aur energy accumulate karta hai. Modern meters Modbus RTU ya Modbus TCP bhi support
        karte hain — is case mein pulse wiring ki zaroorat nahi, protocol se directly kWh, kW, voltage,
        current sab read ho sakta hai.
      </p>

      <h3 style={S.h3}>Sensor Accuracy, Calibration and Loop Power</h3>
      <p style={S.p}>
        Sensor accuracy specification se verify karo — especially temperature sensors in critical areas.
        4-20 mA loop ke liye loop power (typically 24V DC) controller ya dedicated power supply se milni
        chahiye. 2-wire sensors loop power se chalta hai; 3-wire aur 4-wire sensors separate power supply
        se. Calibration drift potential hoti hai over time — especially humidity sensors — scheduled
        calibration verify karo against NIST-traceable reference. Wrong sensor reading ka matlab hai wrong
        alarm, wrong trend — aur wrong operational decision.
      </p>

      <Callout type="warning" title="Sensor Placement Matters">
        Temperature sensor ka location critically important hai. Cold aisle mein ek hot spot pe sensor
        nahi hai to BMS "all normal" show karega aur actual server inlet temperature high ho sakti hai.
        Data center mein temperature sensors cold aisle pe, hot aisle pe, return air pe aur racks ke
        top/middle/bottom pe placed hone chahiye — project specification aur cooling design ke hisaab se.
      </Callout>

      {/* ═══════════════════════════════════════════════════════════════
          SECTION 6 — DDC AND PLC
      ═══════════════════════════════════════════════════════════════ */}
      <h2 id="ddc-plc" style={S.h2}>DDC Controllers and PLCs</h2>

      <h3 style={S.h3}>What Is a DDC (Direct Digital Controller)?</h3>
      <p style={S.p}>
        DDC — Direct Digital Controller — building automation industry ka term hai edge controller ke
        liye. Ye microprocessor-based device hai jo field sensors aur actuators se directly connect hota
        hai aur control sequences locally execute karta hai. DDC typically BACnet ya proprietary protocol
        pe BMS network se communicate karta hai. HVAC systems — air handling units, fan coil units,
        chiller plants — primarily DDC se control hote hain. DDC typically 4 se 32 I/O points handle
        karta hai, aur multiple DDCs ek BMS network pe daisy-chain ya star topology mein hote hain.
      </p>

      <h3 style={S.h3}>DDC vs PLC — When Each Is Used</h3>
      <p style={S.p}>
        PLC — Programmable Logic Controller — industrial automation heritage se hai. Faster scan cycles,
        more deterministic, broader I/O range, harder environment tolerance. Data centers mein PLCs
        typically high-reliability control applications pe use hote hain — generator AMF/ATS panel,
        large chiller plant sequencing, custom automation requirements. PLC typically Modbus ya OPC UA
        pe BMS se communicate karta hai. DDC building HVAC applications ke liye optimized hai aur
        typically BMS vendor-specific ecosystem ka part hota hai.
      </p>

      <ComparisonTable
        title="DDC vs PLC — Data Center Context"
        headers={["Feature", "DDC", "PLC"]}
        rows={[
          ["Primary domain", "Building automation (HVAC, BMS)", "Industrial process / machinery control"],
          ["Typical protocol", "BACnet MS/TP, BACnet/IP, proprietary", "Modbus RTU/TCP, OPC UA, DNP3"],
          ["Scan cycle", "100–500 ms typical", "1–10 ms typical (faster)"],
          ["I/O count", "4–32 points typically", "Hundreds to thousands"],
          ["DC application", "HVAC, AHU, FCU, environmental", "DG/ATS, chiller plant, custom sequences"],
          ["Programming", "Graphical HVAC-specific tools", "Ladder, Function Block, Structured Text"],
          ["Integration to BMS", "Native — same vendor ecosystem", "Via Modbus/OPC gateway typically"],
        ]}
        caption="Selection depends on application requirements, existing infrastructure and project design."
      />

      <h3 style={S.h3}>Controller Inputs and Outputs</h3>
      <p style={S.p}>
        Controller I/O types aur typical connections:
      </p>
      <ul style={S.ul}>
        <li><strong>AI (Analog Input):</strong> 4-20 mA ya 0-10V signal receive karta hai sensor se. Temperature, humidity, pressure, current readings.</li>
        <li><strong>DI / BI (Digital Input / Binary Input):</strong> Dry contact status receive karta hai. Equipment running, fault, door open, alarm.</li>
        <li><strong>AO (Analog Output):</strong> 0-10V ya 4-20 mA signal send karta hai actuator/VFD ko. Fan speed, valve position control.</li>
        <li><strong>DO / BO (Digital Output / Binary Output):</strong> Relay contact close/open karta hai. Equipment start/stop, valve open/close command.</li>
        <li><strong>Communication port:</strong> RS-485 (for field bus), Ethernet (for BMS network). Some controllers dual-port hote hain.</li>
      </ul>

      <h3 style={S.h3}>Standalone vs Networked Controllers</h3>
      <p style={S.p}>
        Kuch controllers standalone mode mein bhi operate kar sakte hain — BMS server offline hone pe
        bhi local control sequences continue hote hain. Ye critical hai HVAC control ke liye —  server
        maintenance pe CRAC units band nahi hone chahiye. Networked operation server se configuration,
        alarm acknowledgement aur remote override allow karta hai. Small standalone controllers (aur unke
        sensors) bhi BMS mein integrate ho sakte hain read-only monitoring ke liye — even if they're not
        under BMS control.
      </p>
    </>
  );
}
