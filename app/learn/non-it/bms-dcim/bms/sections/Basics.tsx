"use client";

import { S, Callout, ComparisonTable, Figure } from "../shared";
import TopicLink from "@/components/TopicLink";
import BmsDcArchitecture from "../svg/BmsDcArchitecture";

export default function Basics() {
  return (
    <>
      {/* ── Quick Summary ───────────────────────────────────────────────── */}
      <div style={{ background: "#f0fdf4", border: "1px solid #bbf7d0", borderRadius: "10px", padding: "1.2rem 1.4rem", marginBottom: "2rem" }}>
        <p style={{ fontWeight: 700, color: "#14532d", marginBottom: "0.6rem", fontSize: "1rem" }}>📋 Quick Summary — BMS in 2 Minutes</p> <ul style={{ ...S.ul, marginBottom: 0 }}> <li><strong>What BMS is:</strong> Building Management System — a centralized platform that monitors the building's mechanical and electrical systems and, where designed, also controls them.</li> <li><strong>Not just Data Centers:</strong> BMS is also used in hospitals, hotels, airports, malls, universities, industrial plants. In the Data Center it is simply used more critically and granularly.</li> <li><strong>BMS vs DCIM:</strong> BMS monitors building infrastructure — HVAC, power, environment. DCIM plans IT assets, rack power, PUE and capacity. They overlap but are separate tools.</li> <li><strong>How data flows:</strong> Equipment → Sensor/Controller → Protocol (Modbus/BACnet/SNMP) → BMS Server → Database → Tag → HMI Graphic → Alarm/Trend.</li> <li><strong>Protocols:</strong> Modbus RTU (RS-485), Modbus TCP, BACnet MS/TP, BACnet/IP, SNMP are common. Each protocol has its own addressing, register/object structure and troubleshooting.</li> <li><strong>Monitoring ≠ Control:</strong> Most BMS points are read-only. Control points must be carefully designed, authorized and protected — especially on critical equipment.</li> </ul>
      </div>

      {/* ═══════════════════════════════════════════════════════════════
          SECTION 1 — WHAT IS BMS
      ═══════════════════════════════════════════════════════════════ */}
      <h2 id="what-is-bms" style={S.h2}>What Is a Building Management System?</h2>

      <p style={S.p}>
        A Building Management System — or BMS — is a centralized software and hardware platform that monitors the mechanical, electrical and environmental systems of any large building or facility from one place. When the BMS only monitors, it gives the operator real-time visibility — what is running, when something went wrong, and what the trend is. When the BMS also controls, it can change setpoints, run sequences, and give commands to equipment — but only where it has been specifically designed to.
      </p>

      <p style={S.p}>
        A central principle of BMS is centralization — every piece of equipment has its own local display, but the BMS gives the operator a view of the whole facility from one screen. A NOC engineer can see the diesel level without going to the generator room, check the UPS load, verify the CRAC unit supply air temperature — all from one dashboard.
      </p>

      <h3 style={S.h3}>BMS Across Industries — Not Just Data Centers</h3>

      <p style={S.p}>
        BMS is not just a data center concept. This technology is commercially much broader and is used in many industry verticals:
      </p>

      <ul style={S.ul}>
        <li><strong>Hospitals:</strong> OT temperature/humidity is critical — the BMS ensures continuous monitoring and alarms.</li>
        <li><strong>Hotels:</strong> Per-room HVAC control, energy optimization, lobby environment and kitchen ventilation.</li>
        <li><strong>Airports:</strong> Temperature control of passenger areas, baggage area monitoring, large HVAC plants.</li>
        <li><strong>Shopping Malls:</strong> Central HVAC, lighting schedules, escalators and energy reporting.</li>
        <li><strong>Industrial Plants:</strong> Equipment status monitoring, utility tracking, compressed air, cooling towers.</li>
        <li><strong>Campuses and Government Buildings:</strong> Multi-building energy management, utility sub-metering.</li>
        <li><strong>Data Centers:</strong> Critical infrastructure monitoring — power chain, cooling, environment, alarm management — where continuous operation and fast fault detection are essential.</li>
      </ul>

      <Callout type="important" title="BMS Is a Tool — Not a Replacement">
        The BMS gives visibility and alarms. It is not a replacement for the UPS, PAC, or DG. And the BMS does not replace dedicated fire alarm, life-safety or security systems. The BMS only receives selected status/alarm points from these systems — for monitoring — while those systems operate independently on their own controllers and logic.
      </Callout>

      <h3 style={S.h3}>What Makes a Data Center BMS Different</h3>

      <p style={S.p}>
        In data centers the use of BMS is more critical for some specific reasons. 24/7 continuous operation means that any fault — whether a small temperature drift or a minor alarm on the UPS — must be visible immediately. In a data center multiple critical systems operate together — from the power chain to cooling — and the correlation of all of them comes from the BMS. Client SLAs, compliance audits and insurance requirements also ask for documented monitoring evidence.
      </p>

      <p style={S.p}>
        A data center BMS typically has more points, stricter alarm configurations, longer trend retention and tighter integration requirements compared to a typical commercial building. In high-density DC environments — where 50-100 kW racks are running — operations are blind without real-time temperature and power data.
      </p>

      {/* ═══════════════════════════════════════════════════════════════
          SECTION 2 — WHY DATA CENTERS USE BMS
      ═══════════════════════════════════════════════════════════════ */}
      <h2 id="why-dc-uses-bms" style={S.h2}>Why Data Centers Use BMS</h2>

      <p style={S.p}>
        Every critical system of a data center — UPS, DG, ATS, CRAC, chiller, cooling tower, fuel tank — operates on its own local controller. These systems are independently stable. The problem comes when the engineer needs to find out <em>right now, across the entire facility, what is happening</em> — and in an emergency, when correlated faults have to be pieced together one point at a time. The BMS provides this correlation and centralization.
      </p>

      <p style={S.p}>
        Alarm management is the most important use case of BMS in data centers. A CRAC unit's filter alarm comes silently, is not acknowledged, the temperature drift starts — and you find out when the servers start to thermal throttle. With a BMS, alarm priority, escalation and acknowledgement are tracked. Trend data shows how long the filter replacement had been overdue.
      </p>

      <p style={S.p}>
        Compliance and audit requirements also drive BMS. ISO 27001 requires physical environment monitoring. Tier certification, insurance and client contracts ask for operational monitoring evidence. BMS reports — daily temperature logs, UPS event history, power consumption trends — are all production-ready documents at audit time. Manual logs do not give this guarantee.
      </p>

      <Callout type="best-practice" title="BMS Saves Money Through Trends">
        A large share of data center energy cost is cooling and power conditioning. PUE (Power Usage Effectiveness) is tracked from BMS trend data, cooling inefficiency spots become visible, and over-provisioned capacity is identified. The energy optimization ROI is often greater than the BMS implementation cost over a multi-year horizon.
      </Callout>

      {/* ═══════════════════════════════════════════════════════════════
          SECTION 3 — BMS vs EMS vs DCIM vs SCADA
      ═══════════════════════════════════════════════════════════════ */}
      <h2 id="bms-vs-dcim-ems-scada" style={S.h2}>BMS vs EMS vs DCIM vs SCADA</h2>

      <p style={S.p}>
        These four terms often overlap in the industry and are sometimes loosely interchanged — but technically they are separate domains. This distinction must be clear to a data center engineer.
      </p>

      <h3 style={S.h3}>BMS — Building Management System</h3>
      <p style={S.p}>
        The central monitoring and control platform of building infrastructure. HVAC, electrical systems, environmental sensors, fire alarm integration (status only), lighting — all of these are in the BMS domain. Typically uses BACnet, Modbus, Lon protocol standards. It came from the building automation industry.
      </p>

      <h3 style={S.h3}>EMS — Energy Management System</h3>
      <p style={S.p}>
        It focuses on energy consumption — utility meters, sub-metering, demand response, carbon footprint, energy reporting. EMS capability can be built into the BMS, or a separate EMS platform takes data from the BMS. ISO 50001 energy management systems is a formal standard. Some vendors combine BMS and EMS in one platform.
      </p>

      <h3 style={S.h3}>DCIM — Data Center Infrastructure Management</h3>
      <p style={S.p}>
        DCIM focuses on IT infrastructure — rack-level power consumption, IT asset inventory, capacity planning, PUE calculation, cooling optimization for IT load, cable management. DCIM takes per-rack power data from PDU/UPS and integrates with IT asset databases. DCIM can pull environmental data from the BMS. Both exist together in enterprise data centers — they complement each other.
      </p>

      <h3 style={S.h3}>SCADA — Supervisory Control and Data Acquisition</h3>
      <p style={S.p}>
        It is a term from industrial process control — oil refineries, power plants, water treatment. SCADA focuses on high-speed real-time control, often mission-critical process automation. SCADA is typically not used in data centers — but some large facilities and hyperscalers use SCADA-heritage platforms for electrical and cooling control. Terminologically BMS and SCADA come from different engineering traditions but overlap functionally.
      </p>

      <ComparisonTable
        title="BMS vs EMS vs DCIM vs SCADA — Key Differences"
        headers={["Dimension", "BMS", "EMS", "DCIM", "SCADA"]}
        rows={[
          ["Primary focus", "Building M&E systems", "Energy consumption", "IT infrastructure", "Industrial process control"],
          ["Typical protocols", "BACnet, Modbus, LON", "Modbus, DLMS/COSEM, API", "SNMP, IPMI, Modbus, REST API", "Modbus, DNP3, IEC 61850, OPC"],
          ["Data center use", "Very common", "Often built into BMS", "Common in enterprise DC", "Specialized / hyperscale"],
          ["Alarm management", "Core feature", "Basic / energy focused", "IT-focused alarms", "Core feature"],
          ["IT asset awareness", "No", "No", "Yes — core feature", "No"],
          ["PUE tracking", "Can contribute data", "Can calculate", "Core feature", "Possible"],
          ["Examples", "Schneider EcoStruxure, Siemens Desigo, JCI Metasys", "ISO 50001 platforms", "Vertiv Trellis, Nlyte, Sunbird", "Wonderware, Ignition, Rockwell"],
        ]}
        caption="Actual feature boundaries vary by vendor platform. Many enterprise solutions blend multiple functions."
      />

      <Callout type="maintenance" title="Vendor Marketing Blurs These Lines">
        Many BMS vendors add DCIM-like features to their platforms; DCIM vendors add BMS integration. When evaluating a platform, specify what you actually need — power chain monitoring, cooling monitoring, IT asset management, energy reporting — and verify specific capabilities with the vendor rather than relying on category labels.
      </Callout>

      {/* Architecture Diagram */}
      <Figure caption="Fig 1 — Five-layer BMS architecture for a data center. Actual layer components and protocols depend on project design.">
        <BmsDcArchitecture />
      </Figure>
    </>
  );
}
