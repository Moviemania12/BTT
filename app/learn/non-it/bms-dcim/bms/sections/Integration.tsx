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
        Sabse simple integration method hai hardwired connection. Equipment ka relay output (dry contact)
        BMS controller ke digital input se directly wire hota hai. UPS ka "Common Alarm" contact close
        hone pe BMS detect karta hai aur alarm generate karta hai. Ye sirf binary information deta hai —
        ON ya OFF. Rich parametric data (voltage, current, load percentage) nahi milta.
      </p>

      <p style={S.p}>
        Analog hardwired integration mein field sensor (4-20 mA ya 0-10V) directly BMS controller ke
        analog input pe wire hoti hai. Ye continuous measurement data deta hai — temperature,
        humidity, pressure. Ye bhi koi protocol use nahi karta. Limitations: ek sensor per wire pair
        (no bus sharing), cable length limitations, aur koi remote diagnostics nahi.
      </p>

      <h3 style={S.h3}>Serial Protocol Integration — RS-485, Modbus RTU, BACnet MS/TP</h3>
      <p style={S.p}>
        RS-485 ek physical layer standard hai — two-wire differential bus jis pe multiple devices
        daisy-chain ho sakte hain. RS-485 pe Modbus RTU ya BACnet MS/TP protocol run hota hai. Is
        architecture mein ek single cable run pe multiple devices connect ho sakte hain — ek UPS,
        ek PDU, aur ek energy meter sab same RS-485 bus pe. BMS controller master hai, baaki sab
        slaves hain.
      </p>

      <p style={S.p}>
        RS-485 mein polarity critical hai — A wire aur B wire sahi jagah connect hone chahiye. Bus
        ke dono ends pe 120 ohm termination resistor chahiye. Ground (shield) carefully handle karo
        — ground loops noise create karte hain. Maximum devices without repeater typically 32 electrical
        loads hain. Cable length device count aur baud rate pe depend karta hai.
      </p>

      <h3 style={S.h3}>Network Protocol Integration — Modbus TCP, BACnet/IP, SNMP, OPC UA, MQTT</h3>
      <p style={S.p}>
        Network-based integration standard Ethernet infrastructure use karta hai. Equipment aur
        controllers ko IP address milta hai. BMS server network pe directly ya IP-enabled controller
        through devices se communicate karta hai. Ye significantly easier deployment deta hai for
        distributed facilities — koi dedicated serial wiring nahi, existing network infrastructure
        use hoti hai. Lekin network design, VLAN segmentation aur firewall rules properly configure
        karne padte hain.
      </p>

      <h3 style={S.h3}>Choosing an Integration Method</h3>
      <p style={S.p}>
        Simple status/alarm points — generator running contact, ATS position — ke liye hardwired dry
        contact often simplest aur most reliable hai. Parametric data — UPS load %, output voltage,
        battery SOC — ke liye protocol integration zaroori hai. Protocol selection depend karta hai
        equipment ki available interface pe — kya UPS Modbus RTU support karta hai, ya BACnet/IP, ya
        SNMP? Network-capable equipment ke liye Modbus TCP ya BACnet/IP prefer karo — simpler wiring.
        Legacy RS-485-only equipment ke liye Modbus RTU use karo, ya gateway se convert karo.
      </p>

      {/* ═══════════════════════════════════════════════════════════════
          SECTION 8 — PROTOCOLS IN DEPTH
      ═══════════════════════════════════════════════════════════════ */}
      <h2 id="protocols-in-depth" style={S.h2}>Protocols in Depth</h2>

      <h3 style={S.h3}>Modbus RTU / RS-485</h3>
      <p style={S.p}>
        Modbus RTU 1979 mein Modicon ne develop kiya tha aur aaj bhi most widely supported industrial
        protocol hai. RTU (Remote Terminal Unit) binary encoding use karta hai — compact, efficient.
        RS-485 physical layer pe chalta hai — half-duplex (ek time pe ek hi direction mein data).
        Master (BMS) ek request bhejta hai with slave address, function code aur register range. Slave
        respond karta hai data ke saath.
      </p>

      <p style={S.p}>
        Key Modbus function codes: <strong>FC 01</strong> — Read Coils; <strong>FC 02</strong> — Read
        Discrete Inputs; <strong>FC 03</strong> — Read Holding Registers; <strong>FC 04</strong> —
        Read Input Registers; <strong>FC 05/06</strong> — Write single Coil/Register;{" "}
        <strong>FC 15/16</strong> — Write multiple Coils/Registers. Most equipment only FC 03 aur
        FC 04 expose karta hai — read only.
      </p>

      <Callout type="warning" title="Modbus Addressing — 0-Based vs 1-Based Offset">
        Modbus specification internally 0-based addressing use karta hai (register 0 se shuru). Lekin
        bahut OEM documentation 1-based addresses publish karta hai — "Holding Register 1" actually
        internal address 0 hota hai. Ye ek bahut common integration error hai. Hamesha OEM register
        map carefully read karo aur agar BMS mein value wrong aa rahi hai to offset check karo — register
        address mein 1 minus karo ya 1 add karo as needed, aur test karo.
      </Callout>

      <h3 style={S.h3}>Modbus TCP</h3>
      <p style={S.p}>
        Modbus TCP same register model aur function codes use karta hai — lekin RS-485 ki jagah
        standard Ethernet pe chalta hai. TCP/IP wrapper Modbus RTU frame ke around hota hai. Default
        port 502 hai (verify per OEM — kuch non-standard ports use karte hain). Ek important difference:
        Modbus TCP mein Unit ID field hota hai jo originally multi-drop gateway ke liye tha — modern
        devices typically Unit ID 1 ya 255 use karte hain, lekin OEM documentation verify karo.
        Multiple BMS clients ek Modbus TCP device simultaneously poll kar sakte hain — RTU serial bus
        mein sirf ek master possible hai.
      </p>

      <h3 style={S.h3}>BACnet MS/TP</h3>
      <p style={S.p}>
        BACnet MS/TP (Master-Slave/Token-Passing) BACnet protocol ka RS-485 physical layer pe version
        hai. Token-passing mechanism ensure karta hai ki ek time pe sirf ek device transmit kare.
        Building automation mein DDC controllers aur BMS server ke beech commonly use hota hai. Object
        model use karta hai — device, analog input, binary output, etc. — Modbus ke register-centric
        model se fundamentally different approach hai.
      </p>

      <h3 style={S.h3}>BACnet/IP</h3>
      <p style={S.p}>
        BACnet ka Ethernet/IP version hai — data center BMS mein most common protocol for building
        automation equipment. ASHRAE Standard 135 define karta hai BACnet/IP. Default UDP port 47808
        use hota hai — ye conventional/default hai lekin BACnet/IP configurable port support karta hai;
        actual port device aur system configuration pe depend karta hai. Discovery service (Who-Is / I-Am)
        se BACnet devices network pe respond karte hain — BMS driver/platform ki discovery capability
        par depend karta hai ki auto-import hoga ya manual configuration lagegi. Services: ReadProperty,
        WriteProperty, COV Subscription, Subscribe-COV. COV (Change of Value) bandwidth efficient hai —
        device BMS ko notify karta hai jab value configured COV Increment se change ho, continuous polling
        ki zaroorat nahi.
      </p>

      <h3 style={S.h3}>SNMP</h3>
      <p style={S.p}>
        Simple Network Management Protocol — IT equipment management ke liye designed, lekin data
        center mein UPS, PDU aur network equipment monitoring ke liye broadly use hota hai. SNMP v1/v2c
        mein community string authentication hoti hai (plaintext — security limitation). SNMP v3 mein
        proper encryption aur authentication (USM — User-based Security Model) hai — lekin not every
        UPS ya device SNMPv3 support karta hai; actual version support equipment model aur installed
        communication card pe depend karta hai. OID (Object Identifier) ek hierarchical numeric path hai
        jo specific MIB leaf node identify karta hai — OEM MIB file se OIDs milte hain. SNMP Traps
        equipment-initiated alerts hain — BMS ko proactively notify karta hai. Get/GetNext BMS-initiated
        polls hain. SNMP auto-discovery BMS platform aur driver capability pe depend karta hai — typically
        OID list manually configure karne padti hain OEM MIB ke reference se.
      </p>

      <h3 style={S.h3}>OPC UA</h3>
      <p style={S.p}>
        OPC Unified Architecture — industrial automation ka modern standard. Machine-to-machine
        communication ke liye designed, built-in security (TLS encryption, certificate-based auth).
        Data center mein large chiller plants, custom automation aur industrial-grade equipment mein
        OPC UA increasingly common hai. BMS vendors OPC UA server/client support add kar rahe hain.
        Ye SCADA-to-BMS integration ke liye bhi relevant hai.
      </p>

      <h3 style={S.h3}>MQTT</h3>
      <p style={S.p}>
        MQTT (Message Queuing Telemetry Transport) ek lightweight publish-subscribe protocol hai —
        IoT applications ke liye designed. Edge devices MQTT broker pe topics publish karte hain, BMS
        subscribe karta hai. Data center mein MQTT primarily remote sites, IoT sensors aur cloud
        integration ke liye relevant hai. Traditional building automation applications mein BACnet aur
        Modbus dominant hain. MQTT Sparkplug B extension industrial MQTT ke liye semantic data model
        add karta hai.
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
