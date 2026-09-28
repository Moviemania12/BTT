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
        The BMS architecture can be understood in three or five layers. Five layers give a more accurate picture because the network layer and the server layer are separately important. The field layer has the actual equipment and sensors. The controller layer has DDC or integration modules that collect data from field devices and talk in protocols. The network layer has the Ethernet backbone on which controllers and the server communicate. The server layer has the BMS application software and the database/historian. The presentation layer has operator workstations, dashboards, alarm monitors and remote access.
      </p>

      <h3 style={S.h3}>Field Layer — Sensors, Actuators and Equipment</h3>
      <p style={S.p}>
        This layer contains the physical world. Temperature sensors, humidity sensors, pressure transducers, current transformers, energy meters, dry contact relays, flow meters — these are all field devices. Some equipment (such as UPS, PAC, chiller) has its own onboard controller that calculates local parameters and exposes a communication interface (Modbus port, BACnet/IP, SNMP). Simpler devices — such as a door contact or water leak strip — give only a binary signal.
      </p>

      <h3 style={S.h3}>Controller Layer — DDC, PLC and Integration Modules</h3>
      <p style={S.p}>
        Controllers collect data from field devices, do local processing, and communicate with the BMS server over the network. A DDC controller can connect field devices on multiple analog inputs (AI), analog outputs (AO), digital inputs (DI/BI) and digital outputs (DO/BO). Some controllers are proprietary controllers of a specific BMS vendor; others are open-protocol capable. In some projects a protocol gateway or integration server is used in place of a dedicated controller — especially when existing equipment is on Modbus RTU and the BMS expects BACnet/IP.
      </p>

      <h3 style={S.h3}>Network Layer — Communication Backbone</h3>
      <p style={S.p}>
        The BMS network is dedicated Ethernet infrastructure — separate from the production IT network (different VLAN or physical network). Controllers communicate with the BMS server over the network. An RS-485 serial field bus can also exist on the field side of controllers — it sits below the controller, not the BMS backbone. Network redundancy can be designed in critical facilities.
      </p>

      <h3 style={S.h3}>Server Layer — BMS Server and Database/Historian</h3>
      <p style={S.p}>
        The BMS server runs the application software — point database, alarm engine, scheduler, trend logger, reporting engine, user management. The historian database stores long-term point values with timestamps — this is used for analysis, reporting and root cause investigation. Server redundancy (primary + standby) is common in larger deployments. Cloud-based BMS platforms are also available that use cloud storage in place of an on-premise historian.
      </p>

      <h3 style={S.h3}>Presentation Layer — HMI, Workstation and Dashboards</h3>
      <p style={S.p}>
        HMI (Human-Machine Interface) graphic pages run on the operator workstation — floor plans, single line diagrams, equipment screens, alarm summaries, trend graphs. From here operators see live data, acknowledge alarms, and (where permitted) issue commands. Web-based interfaces allow remote access — through secured authentication. Mobile apps are also available on some platforms.
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
        Analog sensors measure continuous physical quantities and output a proportional electrical signal. The most common analog signal standard in a data center is the{" "} <strong>4–20 mA current loop</strong> — 4 mA minimum (0% of range) and 20 mA maximum (100% of range). The advantage of the current loop is that voltage drop does not affect it on long cable runs.{" "} <strong>0–10 V DC</strong> voltage signals are also used — but are preferred for shorter runs. Temperature sensors come as NTC/PTC thermistors, RTD (Pt100/Pt1000) or 4-20 mA transmitters. Humidity sensors are typically 4-20 mA or 0-10V combined temperature/humidity transmitters.
      </p>

      <h3 style={S.h3}>Digital/Binary Points — Status, Alarms, Contacts</h3>
      <p style={S.p}>
        Binary points represent only an ON/OFF or OPEN/CLOSED state. A dry contact (volt-free contact) — the equipment's output relay — connects to a digital input of the BMS. The UPS "Common Alarm" contact, the generator "Running" contact, the ATS "Position" contact — these are all dry contacts. On the BMS end the controller applies a small voltage (typically 24V DC) and detects the contact close or open state. This is the simplest form of hardwired integration — no protocol, only wiring.
      </p>

      <h3 style={S.h3}>Pulse/Counter Inputs — Energy Meters</h3>
      <p style={S.p}>
        Energy meters often give a pulse output — each pulse represents a fixed energy unit (e.g., 1 pulse = 1 Wh or 1 kWh, depending on meter configuration). The BMS controller counts pulses and accumulates energy. Modern meters also support Modbus RTU or Modbus TCP — in this case no pulse wiring is needed; kWh, kW, voltage, current can all be read directly over the protocol.
      </p>

      <h3 style={S.h3}>Sensor Accuracy, Calibration and Loop Power</h3>
      <p style={S.p}>
        Verify sensor accuracy from the specification — especially temperature sensors in critical areas. For a 4-20 mA loop, loop power (typically 24V DC) must come from the controller or a dedicated power supply. 2-wire sensors run on loop power; 3-wire and 4-wire sensors from a separate power supply. There is potential for calibration drift over time — especially humidity sensors — verify scheduled calibration against a NIST-traceable reference. A wrong sensor reading means a wrong alarm, a wrong trend — and a wrong operational decision.
      </p>

      <Callout type="warning" title="Sensor Placement Matters">
        The location of the temperature sensor is critically important. If there is no sensor at a hot spot in the cold aisle, the BMS will show "all normal" while the actual server inlet temperature may be high. In a data center temperature sensors must be placed in the cold aisle, hot aisle, return air and at the top/middle/bottom of racks — according to the project specification and cooling design.
      </Callout>

      {/* ═══════════════════════════════════════════════════════════════
          SECTION 6 — DDC AND PLC
      ═══════════════════════════════════════════════════════════════ */}
      <h2 id="ddc-plc" style={S.h2}>DDC Controllers and PLCs</h2>

      <h3 style={S.h3}>What Is a DDC (Direct Digital Controller)?</h3>
      <p style={S.p}>
        DDC — Direct Digital Controller — is the building automation industry's term for the edge controller. It is a microprocessor-based device that connects directly to field sensors and actuators and executes control sequences locally. A DDC typically communicates with the BMS network over BACnet or a proprietary protocol. HVAC systems — air handling units, fan coil units, chiller plants — are primarily controlled by DDC. A DDC typically handles 4 to 32 I/O points, and multiple DDCs sit on a BMS network in a daisy-chain or star topology.
      </p>

      <h3 style={S.h3}>DDC vs PLC — When Each Is Used</h3>
      <p style={S.p}>
        PLC — Programmable Logic Controller — comes from the industrial automation heritage. Faster scan cycles, more deterministic, broader I/O range, harder environment tolerance. In data centers PLCs are typically used in high-reliability control applications — generator AMF/ATS panel, large chiller plant sequencing, custom automation requirements. A PLC typically communicates with the BMS over Modbus or OPC UA. The DDC is optimized for building HVAC applications and is typically part of a BMS vendor-specific ecosystem.
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
        Controller I/O types and typical connections:
      </p>
      <ul style={S.ul}>
        <li><strong>AI (Analog Input):</strong> Receives a 4-20 mA or 0-10V signal from a sensor. Temperature, humidity, pressure, current readings.</li>
        <li><strong>DI / BI (Digital Input / Binary Input):</strong> Receives dry contact status. Equipment running, fault, door open, alarm.</li>
        <li><strong>AO (Analog Output):</strong> Sends a 0-10V or 4-20 mA signal to an actuator/VFD. Fan speed, valve position control.</li>
        <li><strong>DO / BO (Digital Output / Binary Output):</strong> Closes/opens a relay contact. Equipment start/stop, valve open/close command.</li>
        <li><strong>Communication port:</strong> RS-485 (for field bus), Ethernet (for BMS network). Some controllers are dual-port.</li>
      </ul>

      <h3 style={S.h3}>Standalone vs Networked Controllers</h3>
      <p style={S.p}>
        Some controllers can also operate in standalone mode — local control sequences continue even when the BMS server is offline. This is critical for HVAC control — CRAC units must not stop during server maintenance. Networked operation allows configuration, alarm acknowledgement and remote override from the server. Small standalone controllers (and their sensors) can also be integrated into the BMS for read-only monitoring — even if they're not under BMS control.
      </p>
    </>
  );
}
