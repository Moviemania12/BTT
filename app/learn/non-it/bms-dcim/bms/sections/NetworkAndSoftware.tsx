"use client";

import { S, Callout, ComparisonTable } from "../shared";
import BacnetVsModbusObjectModel from "../svg/BacnetVsModbusObjectModel";
import { Figure } from "../shared";

export default function NetworkAndSoftware() {
  return (
    <>
      {/* ═══════════════════════════════════════════════════════════════
          SECTION 16 — NETWORK ARCHITECTURE
      ═══════════════════════════════════════════════════════════════ */}
      <h2 id="network-architecture" style={S.h2}>BMS Network Architecture</h2>

      <h3 style={S.h3}>Dedicated BMS Network vs Shared IT Network</h3>
      <p style={S.p}>
        BMS network ko IT production network se logically aur preferably physically separate karo.
        Reasons: security (BMS network compromise se IT network attack surface protect karo aur vice
        versa), reliability (IT network congestion ya maintenance BMS ko affect na kare), bandwidth
        predictability (BMS polling traffic guaranteed bandwidth mile). VLAN separation minimum
        requirement hai — physical separation higher security environments mein.
      </p>

      <h3 style={S.h3}>Segmentation, VLANs and Security</h3>
      <p style={S.p}>
        BMS VLAN mein typically: BMS server, controllers, integration modules, operator workstations.
        Equipment (UPS, PDU, CRAC) dedicated BMS VLAN ya separate equipment VLAN pe. Firewall rules
        define karo ki kaunsa traffic allowed hai BMS VLAN aur IT VLAN ke beech — typically minimal
        (specific reporting API only). Internet-facing access avoid karo directly — remote access ke
        liye VPN. Intrusion detection where applicable.
      </p>

      <h3 style={S.h3}>Redundancy in BMS Network and Servers</h3>
      <p style={S.p}>
        Critical data centers mein BMS server redundancy implement karo — primary aur standby server,
        failover configured. Network switch redundancy — dual uplinks, spanning tree. Controller ke
        liye dual power supplies where available. BMS downtime matlab koi monitoring nahi — redundancy
        level project criticality pe depend karta hai. Full N+1 BMS infrastructure major facilities
        mein standard hai.
      </p>

      <h3 style={S.h3}>Remote Access and Cybersecurity</h3>
      <p style={S.p}>
        Remote access typically VPN through secure jump host — direct internet exposure of BMS server
        avoid karo. SSL/TLS for all web-based interfaces. Firmware aur software patches regularly
        apply karo — BMS components bhi CVEs have karte hain. Network monitoring — anomalous traffic
        to BMS VLAN flag karo. Physical security — BMS server room locked hona chahiye, controller
        cabinets physically secured.
      </p>

      <Figure caption="Fig 8 — BACnet Object Model vs Modbus Data Model — how the same UPS point appears in each protocol framework.">
        <BacnetVsModbusObjectModel />
      </Figure>

      {/* ═══════════════════════════════════════════════════════════════
          SECTION 17 — SOFTWARE PLATFORMS
      ═══════════════════════════════════════════════════════════════ */}
      <h2 id="software-platforms" style={S.h2}>BMS Software Platforms — OEM Overview</h2>

      <p style={S.p}>
        BMS market mein kuch major players hain. Ye overview engineering context ke liye hai —
        actual capabilities, licensing, protocol support aur integration ki details software version,
        controller hardware, installed drivers, purchased licenses aur project configuration pe depend
        karti hain. Hamesha specific project requirements ke liye vendor se verify karo.
      </p>

      <h3 style={S.h3}>Schneider Electric EcoStruxure Building Operation</h3>
      <p style={S.p}>
        Schneider Electric ka building automation platform hai — previously known as StruxureWare
        Building Operation aur before that Andover Continuum aur TAC Vista. EcoStruxure Building
        Operation mein SmartX servers, field controllers, WorkStation software aur Web Station
        client include hain. BACnet aur Modbus natively supported hain. Schneider EcoStruxure
        platform broader ecosystem ka part hai jo power management (EcoStruxure Power) aur IT
        infrastructure (EcoStruxure IT) se bhi integrate hota hai — relevant for data center
        convergence. Data center mein Schneider BMS often alongside their APC UPS aur Cooling
        products integrated hote hain — OEM-to-OEM integration typically smoother hoti hai.
      </p>

      <h3 style={S.h3}>Siemens Desigo CC</h3>
      <p style={S.p}>
        Siemens ka Desigo CC (Collaborative Command and Control) ek integrated building management
        platform hai — HVAC, fire safety, security, lighting sab ek platform pe. Desigo CC MR/RX
        controller range BACnet aur Modbus support karta hai. Data center environments mein Desigo CC
        large facilities mein — airports, hospitals, campuses — commonly deployed hai. Open
        integration capability hai via BACnet, Modbus aur OPC server. Siemens Gamma aur S7 PLCs Desigo
        CC se OPC ke through integrate ho sakte hain — relevant for chiller plant control.
      </p>

      <h3 style={S.h3}>Honeywell Enterprise Buildings Integrator and Other Platforms</h3>
      <p style={S.p}>
        Honeywell multiple BMS platforms have karta hai — Enterprise Buildings Integrator (EBI) large
        campuses ke liye, Niagara Framework (originally Tridium, acquired by Honeywell) jo open
        platform hai multiple protocols support karta hai. Niagara (Niagara 4) data center integration
        mein particularly relevant hai kyunki ye virtually any protocol integrate kar sakta hai via
        drivers — BACnet, Modbus, SNMP, LonWorks, OPC, MQTT sab available hain. Ye "integration
        middleware" approach customization flexibility deti hai.
      </p>

      <h3 style={S.h3}>Johnson Controls Metasys</h3>
      <p style={S.p}>
        Johnson Controls Metasys ek mature, widely deployed BMS platform hai. Network Automation
        Engines (NAE), System Configuration Tool (SCT) aur site controllers BACnet aur Modbus
        support karte hain. Metasys data center mein large colocation aur enterprise deployments mein
        common hai. Open Application Server (OAS) extended integration aur OPC connectivity deta
        hai. Johnson Controls Metasys pe UPS integration typically Modbus TCP ya SNMP se hoti hai.
      </p>

      <Callout type="interview" title="Platform Selection Criteria">
        BMS platform selection mein consider karo: existing installed base (extending same platform
        simpler hai), required protocol support (kya platform required drivers ya gateways include
        karta hai), IT integration requirements (REST API, MQTT, cloud connectivity), scalability
        (point count, sites), support aur training availability, lifecycle (vendor support timeline),
        aur total cost of ownership. No single platform is universally best — project context matter
        karta hai.
      </Callout>

      <ComparisonTable
        title="BMS Platform Overview — Data Center Context (Verify with Current Vendor Documentation)"
        headers={["Platform", "Vendor", "Key Protocols", "DC Strength", "Note"]}
        rows={[
          ["EcoStruxure Building Operation", "Schneider Electric", "BACnet, Modbus, KNX", "APC UPS/PDU OEM integration", "Part of broader EcoStruxure ecosystem"],
          ["Desigo CC", "Siemens", "BACnet, Modbus, OPC", "Large multi-system facilities", "Integrated fire/security option"],
          ["Niagara 4 (Tridium / Honeywell)", "Honeywell", "BACnet, Modbus, SNMP, MQTT, OPC, LonWorks, 200+ drivers", "Protocol flexibility, open platform", "Used by many system integrators"],
          ["Metasys", "Johnson Controls", "BACnet, Modbus, OPC, SNMP", "Mature platform, large installations", "OAS for advanced integration"],
          ["i-Vu / Carrier Controls", "Carrier", "BACnet, Modbus", "HVAC-centric", "Acquired, ecosystem evolving"],
          ["EBI (Enterprise Buildings Integrator)", "Honeywell", "BACnet, Modbus, proprietary", "Large enterprise/campus", "Different from Niagara"],
        ]}
        caption="Capability, protocol support and features depend on platform version, controller model and installed options. Verify current specifications with vendor."
      />
    </>
  );
}
