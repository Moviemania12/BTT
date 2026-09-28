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
        Separate the BMS network from the IT production network logically and preferably physically. Reasons: security (protect the IT network attack surface from a BMS network compromise and vice versa), reliability (IT network congestion or maintenance should not affect the BMS), bandwidth predictability (BMS polling traffic gets guaranteed bandwidth). VLAN separation is the minimum requirement — physical separation in higher security environments.
      </p>

      <h3 style={S.h3}>Segmentation, VLANs and Security</h3>
      <p style={S.p}>
        The BMS VLAN typically has: BMS server, controllers, integration modules, operator workstations. Equipment (UPS, PDU, CRAC) on the dedicated BMS VLAN or a separate equipment VLAN. Define firewall rules for which traffic is allowed between the BMS VLAN and the IT VLAN — typically minimal (specific reporting API only). Avoid direct internet-facing access — VPN for remote access. Intrusion detection where applicable.
      </p>

      <h3 style={S.h3}>Redundancy in BMS Network and Servers</h3>
      <p style={S.p}>
        In critical data centers implement BMS server redundancy — primary and standby server, failover configured. Network switch redundancy — dual uplinks, spanning tree. Dual power supplies for controllers where available. BMS downtime means no monitoring — the redundancy level depends on project criticality. Full N+1 BMS infrastructure is standard in major facilities.
      </p>

      <h3 style={S.h3}>Remote Access and Cybersecurity</h3>
      <p style={S.p}>
        Remote access typically through a secure jump host over VPN — avoid direct internet exposure of the BMS server. SSL/TLS for all web-based interfaces. Apply firmware and software patches regularly — BMS components also have CVEs. Network monitoring — flag anomalous traffic to the BMS VLAN. Physical security — the BMS server room must be locked, controller cabinets physically secured.
      </p>

      <Figure caption="Fig 8 — BACnet Object Model vs Modbus Data Model — how the same UPS point appears in each protocol framework.">
        <BacnetVsModbusObjectModel />
      </Figure>

      {/* ═══════════════════════════════════════════════════════════════
          SECTION 17 — SOFTWARE PLATFORMS
      ═══════════════════════════════════════════════════════════════ */}
      <h2 id="software-platforms" style={S.h2}>BMS Software Platforms — OEM Overview</h2>

      <p style={S.p}>
        There are some major players in the BMS market. This overview is for engineering context — actual capabilities, licensing, protocol support and integration details depend on software version, controller hardware, installed drivers, purchased licenses and project configuration. Always verify with the vendor for specific project requirements.
      </p>

      <h3 style={S.h3}>Schneider Electric EcoStruxure Building Operation</h3>
      <p style={S.p}>
        Schneider Electric's building automation platform — previously known as StruxureWare Building Operation and before that Andover Continuum and TAC Vista. EcoStruxure Building Operation includes SmartX servers, field controllers, WorkStation software and the Web Station client. BACnet and Modbus are natively supported. The Schneider EcoStruxure platform is part of a broader ecosystem that also integrates with power management (EcoStruxure Power) and IT infrastructure (EcoStruxure IT) — relevant for data center convergence. In data centers Schneider BMS is often integrated alongside their APC UPS and Cooling products — OEM-to-OEM integration is typically smoother.
      </p>

      <h3 style={S.h3}>Siemens Desigo CC</h3>
      <p style={S.p}>
        Siemens' Desigo CC (Collaborative Command and Control) is an integrated building management platform — HVAC, fire safety, security, lighting all on one platform. The Desigo CC MR/RX controller range supports BACnet and Modbus. In data center environments Desigo CC is commonly deployed in large facilities — airports, hospitals, campuses. There is open integration capability via BACnet, Modbus and OPC server. Siemens Gamma and S7 PLCs can integrate with Desigo CC through OPC — relevant for chiller plant control.
      </p>

      <h3 style={S.h3}>Honeywell Enterprise Buildings Integrator and Other Platforms</h3>
      <p style={S.p}>
        Honeywell has multiple BMS platforms — Enterprise Buildings Integrator (EBI) for large campuses, and the Niagara Framework (originally Tridium, acquired by Honeywell), which is an open platform supporting multiple protocols. Niagara (Niagara 4) is particularly relevant in data center integration because it can integrate virtually any protocol via drivers — BACnet, Modbus, SNMP, LonWorks, OPC, MQTT are all available. This "integration middleware" approach gives customization flexibility.
      </p>

      <h3 style={S.h3}>Johnson Controls Metasys</h3>
      <p style={S.p}>
        Johnson Controls Metasys is a mature, widely deployed BMS platform. Network Automation Engines (NAE), the System Configuration Tool (SCT) and site controllers support BACnet and Modbus. Metasys is common in large colocation and enterprise data center deployments. The Open Application Server (OAS) gives extended integration and OPC connectivity. UPS integration on Johnson Controls Metasys typically happens through Modbus TCP or SNMP.
      </p>

      <Callout type="interview" title="Platform Selection Criteria">
        Consider in BMS platform selection: existing installed base (extending the same platform is simpler), required protocol support (does the platform include the required drivers or gateways), IT integration requirements (REST API, MQTT, cloud connectivity), scalability (point count, sites), support and training availability, lifecycle (vendor support timeline), and total cost of ownership. No single platform is universally best — project context matters.
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
