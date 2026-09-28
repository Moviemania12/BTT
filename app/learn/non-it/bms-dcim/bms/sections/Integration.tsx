"use client";

import { S, Callout, ComparisonTable, Figure } from "../shared";
import ModbusRtuVsTcp from "../svg/ModbusRtuVsTcp";

export default function Integration() {
  return (
    <>
      {/* ═══════════════════════════════════════════════════════════════
          SECTION 7 — INTEGRATION METHODS
      ═══════════════════════════════════════════════════════════════ */}
      <h2 id="integration-methods" style={S.h2}>Integration Methods — Hardwired and Protocol-Based</h2>

      <h3 style={S.h3}>Hardwired Integration — Dry Contacts and Analog Signals</h3>
      <p style={S.p}>
        The simplest integration method is a hardwired connection. The equipment's relay output (dry contact) is wired directly to a digital input of the BMS controller. When the UPS "Common Alarm" contact closes, the BMS detects it and generates an alarm. This gives only binary information — ON or OFF. Rich parametric data (voltage, current, load percentage) is not available.
      </p>

      <p style={S.p}>
        In analog hardwired integration the field sensor (4-20 mA or 0-10V) is wired directly to an analog input of the BMS controller. This gives continuous measurement data — temperature, humidity, pressure. This also uses no protocol. Limitations: one sensor per wire pair (no bus sharing), cable length limitations, and no remote diagnostics.
      </p>

      <h3 style={S.h3}>Serial Protocol Integration — RS-485, Modbus RTU, BACnet MS/TP</h3>
      <p style={S.p}>
        RS-485 is a physical layer standard — a two-wire differential bus on which multiple devices can be daisy-chained. The Modbus RTU or BACnet MS/TP protocol runs on RS-485. In this architecture multiple devices can connect on a single cable run — a UPS, a PDU, and an energy meter all on the same RS-485 bus. The BMS controller is the master, all the rest are slaves.
      </p>

      <p style={S.p}>
        Polarity is critical in RS-485 — the A wire and B wire must be connected in the right place. A 120 ohm termination resistor is needed at both ends of the bus. Handle ground (shield) carefully — ground loops create noise. Maximum devices without a repeater is typically 32 electrical loads. Cable length depends on device count and baud rate.
      </p>

      <h3 style={S.h3}>Network Protocol Integration — Modbus TCP, BACnet/IP, SNMP, OPC UA, MQTT</h3>
      <p style={S.p}>
        Network-based integration uses standard Ethernet infrastructure. Equipment and controllers get an IP address. The BMS server communicates with devices over the network directly or through an IP-enabled controller. This gives significantly easier deployment for distributed facilities — no dedicated serial wiring, existing network infrastructure is used. But network design, VLAN segmentation and firewall rules have to be configured properly.
      </p>

      <h3 style={S.h3}>Choosing an Integration Method</h3>
      <p style={S.p}>
        For simple status/alarm points — generator running contact, ATS position — a hardwired dry contact is often simplest and most reliable. For parametric data — UPS load %, output voltage, battery SOC — protocol integration is essential. Protocol selection depends on the equipment's available interface — does the UPS support Modbus RTU, or BACnet/IP, or SNMP? For network-capable equipment prefer Modbus TCP or BACnet/IP — simpler wiring. For legacy RS-485-only equipment use Modbus RTU, or convert through a gateway.
      </p>

      {/* ═══════════════════════════════════════════════════════════════
          SECTION 8 — PROTOCOLS IN DEPTH
      ═══════════════════════════════════════════════════════════════ */}
      <h2 id="protocols-in-depth" style={S.h2}>Protocols in Depth</h2>

      <h3 style={S.h3}>Modbus RTU / RS-485</h3>
      <p style={S.p}>
        Modbus RTU was developed by Modicon in 1979 and is still the most widely supported industrial protocol today. RTU (Remote Terminal Unit) uses binary encoding — compact, efficient. It runs on the RS-485 physical layer — half-duplex (data in only one direction at a time). The master (BMS) sends a request with slave address, function code and register range. The slave responds with data.
      </p>

      <p style={S.p}>
        Key Modbus function codes: <strong>FC 01</strong> — Read Coils; <strong>FC 02</strong> — Read Discrete Inputs; <strong>FC 03</strong> — Read Holding Registers; <strong>FC 04</strong> — Read Input Registers; <strong>FC 05/06</strong> — Write single Coil/Register;{" "} <strong>FC 15/16</strong> — Write multiple Coils/Registers. Most equipment exposes only FC 03 and FC 04 — read only.
      </p>

      <Callout type="warning" title="Modbus Addressing — 0-Based vs 1-Based Offset">
        The Modbus specification uses 0-based addressing internally (starting from register 0). But a lot of OEM documentation publishes 1-based addresses — "Holding Register 1" is actually internal address 0. This is a very common integration error. Always read the OEM register map carefully, and if the value in the BMS is coming out wrong, check the offset — subtract 1 or add 1 to the register address as needed, and test.
      </Callout>

      <h3 style={S.h3}>Modbus TCP</h3>
      <p style={S.p}>
        Modbus TCP uses the same register model and function codes — but runs on standard Ethernet instead of RS-485. A TCP/IP wrapper sits around the Modbus RTU frame. The default port is 502 (verify per OEM — some use non-standard ports). One important difference: Modbus TCP has a Unit ID field that was originally for multi-drop gateways — modern devices typically use Unit ID 1 or 255, but verify the OEM documentation. Multiple BMS clients can poll a Modbus TCP device simultaneously — on an RTU serial bus only one master is possible.
      </p>

      <h3 style={S.h3}>BACnet MS/TP</h3>
      <p style={S.p}>
        BACnet MS/TP (Master-Slave/Token-Passing) is the version of the BACnet protocol on the RS-485 physical layer. The token-passing mechanism ensures that only one device transmits at a time. It is commonly used in building automation between DDC controllers and the BMS server. It uses an object model — device, analog input, binary output, etc. — a fundamentally different approach from the register-centric model of Modbus.
      </p>

      <h3 style={S.h3}>BACnet/IP</h3>
      <p style={S.p}>
        This is the Ethernet/IP version of BACnet — the most common protocol for building automation equipment in data center BMS. ASHRAE Standard 135 defines BACnet/IP. Default UDP port 47808 is used — this is conventional/default, but BACnet/IP supports a configurable port; the actual port depends on device and system configuration. Through the discovery service (Who-Is / I-Am) BACnet devices respond on the network — whether it will auto-import or need manual configuration depends on the discovery capability of the BMS driver/platform. Services: ReadProperty, WriteProperty, COV Subscription, Subscribe-COV. COV (Change of Value) is bandwidth efficient — the device notifies the BMS when the value changes by the configured COV Increment, no need for continuous polling.
      </p>

      <h3 style={S.h3}>SNMP</h3>
      <p style={S.p}>
        Simple Network Management Protocol — designed for IT equipment management, but in data centers it is broadly used for UPS, PDU and network equipment monitoring. SNMP v1/v2c has community string authentication (plaintext — security limitation). SNMP v3 has proper encryption and authentication (USM — User-based Security Model) — but not every UPS or device supports SNMPv3; actual version support depends on the equipment model and installed communication card. An OID (Object Identifier) is a hierarchical numeric path that identifies a specific MIB leaf node — OIDs come from the OEM MIB file. SNMP Traps are equipment-initiated alerts — they notify the BMS proactively. Get/GetNext are BMS-initiated polls. SNMP auto-discovery depends on BMS platform and driver capability — typically the OID list has to be configured manually with reference to the OEM MIB.
      </p>

      <h3 style={S.h3}>OPC UA</h3>
      <p style={S.p}>
        OPC Unified Architecture — the modern standard of industrial automation. Designed for machine-to-machine communication, built-in security (TLS encryption, certificate-based auth). In data centers OPC UA is increasingly common in large chiller plants, custom automation and industrial-grade equipment. BMS vendors are adding OPC UA server/client support. It is also relevant for SCADA-to-BMS integration.
      </p>

      <h3 style={S.h3}>MQTT</h3>
      <p style={S.p}>
        MQTT (Message Queuing Telemetry Transport) is a lightweight publish-subscribe protocol — designed for IoT applications. Edge devices publish topics to the MQTT broker, the BMS subscribes. In data centers MQTT is primarily relevant for remote sites, IoT sensors and cloud integration. In traditional building automation applications BACnet and Modbus are dominant. The MQTT Sparkplug B extension adds a semantic data model for industrial MQTT.
      </p>

      <ComparisonTable
        title="Protocol Comparison — Data Center BMS Context"
        headers={["Protocol", "Physical/Network Layer", "Typical DC Use", "Key Config Params", "Common Fault"]}
        rows={[
          ["Modbus RTU", "RS-485 serial", "UPS, meters, PAC", "Baud, parity, slave ID, FC", "A/B polarity swap, termination missing"],
          ["Modbus TCP", "Ethernet", "UPS, meters, smart PDU", "IP, port (502), unit ID", "Wrong unit ID, firewall block"],
          ["BACnet MS/TP", "RS-485 serial", "DDC, AHU controllers", "MAC address, baud, max master", "Duplicate MAC, termination"],
          ["BACnet/IP", "Ethernet/UDP", "DDC, HVAC equipment", "IP, port (default 47808 — configurable), device ID", "BBMD where applicable, firewall UDP block"],
          ["SNMP v1/v2c", "UDP port 161/162", "UPS, PDU monitoring", "Community string, OID", "Wrong community, MIB version"],
          ["SNMP v3", "UDP port 161/162", "Secure UPS/PDU monitoring (where v3 supported by device)", "Username, auth/priv protocol+key", "Auth key mismatch, v3 not supported by device"],
          ["OPC UA", "Ethernet/TCP", "Industrial equipment, chiller", "Endpoint URL, security policy", "Certificate, security mode"],
          ["MQTT", "Ethernet/TCP", "IoT sensors, cloud, edge", "Broker IP, port, topic, QoS", "Broker unreachable, auth fail"],
          ["Dry Contact / DI", "Direct wiring", "Status, alarm, run signal", "Wire polarity, voltage level", "Open circuit, wrong terminal"],
          ["4-20 mA / 0-10V", "Direct wiring", "Temperature, humidity, pressure", "Range config, loop power", "Wire open = 4mA gone, value fault"],
        ]}
        caption="Protocol support depends on equipment model and firmware version. Verify with OEM documentation."
      />

      <Figure caption="Fig 3 — Modbus RTU over RS-485 versus Modbus TCP over Ethernet — physical setup and configuration parameters.">
        <ModbusRtuVsTcp />
      </Figure>
    </>
  );
}
