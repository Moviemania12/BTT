"use client";
import { S, Callout, ComparisonTable, Figure } from "../shared";
import TopicLink from "@/components/TopicLink";
import DcimArchitecture from "../svg/DcimArchitecture";

export default function Basics() {
  return (
    <>
      <div style={{background:"#e0f2fe",border:"1px solid #7dd3fc",borderRadius:"10px",padding:"1.2rem 1.4rem",marginBottom:"2rem"}}>
        <p style={{fontWeight:700,color:"#0c4a6e",marginBottom:"0.6rem",fontSize:"1rem"}}>📋 Quick Summary — DCIM in 2 Minutes</p> <ul style={{...S.ul,marginBottom:0}}> <li><strong>What DCIM is:</strong> Data Center Infrastructure Management — a platform that centrally manages and monitors IT assets (servers, racks, network), the power chain, cooling capacity and connectivity.</li> <li><strong>Different from BMS:</strong> BMS covers building M&E (HVAC, electrical, environment). DCIM covers IT infrastructure — rack level, asset level, per-outlet power. The two are complementary.</li> <li><strong>Core functions:</strong> Asset inventory, rack elevation, power chain visualization, space/power/cooling capacity planning, SNMP/Modbus/API device monitoring, MAC workflows.</li> <li><strong>Integration:</strong> Southbound, DCIM takes data from UPS, intelligent PDU, CRAC, sensors, access control. Northbound, it gives data to BMS, EMS, NMS, CMMS, ITSM.</li> <li><strong>Platforms:</strong> Vertiv Trellis, Athenta, Schneider EcoStruxure IT, Sunbird dcTrack, Nlyte — capabilities vary significantly by edition and version.</li> </ul>
      </div>

      <h2 id="what-is-dcim" style={S.h2}>What Is DCIM?</h2>
      <p style={S.p}>DCIM — Data Center Infrastructure Management — is a software platform that manages the physical IT infrastructure and supporting systems of a data center end-to-end. The scope of DCIM is fundamentally different from BMS — instead of building systems it focuses on IT assets: which server is in which rack, how much power a rack is consuming, how much space is available, which PDU outlet is connected to which server, and when the next rack will overflow on capacity.</p>
      <p style={S.p}>DCIM aims to become a single source of truth for data center operations — asset records, real-time power data, capacity projections and change management all in one tool. In large enterprise data centers without DCIM, accurate capacity planning happens manually on spreadsheets — inaccurate and time-consuming. DCIM automates and centralizes this process.</p>

      <h2 id="dcim-vs-bms-ems" style={S.h2}>DCIM vs BMS vs EMS vs NMS vs CMMS</h2>
      <ComparisonTable
        title="DCIM vs Related Systems"
        headers={["System","Full Name","Primary Focus","DC Use Case"]}
        rows={[
          ["DCIM","Data Center Infrastructure Management","IT assets, racks, power chain, capacity","Asset tracking, capacity planning, power monitoring"],
          ["BMS","Building Management System","Building M&E — HVAC, electrical, environment","Operational monitoring, alarms, control"],
          ["EMS","Energy Management System","Energy consumption, kWh, PUE, cost","Energy reporting, optimization, ISO 50001"],
          ["NMS","Network Management System","Network devices — switches, routers, firewalls","Network topology, bandwidth, fault management"],
          ["CMMS","Computerized Maintenance Management","Maintenance work orders, PM schedules","Equipment maintenance tracking, spare parts"],
          ["ITSM","IT Service Management","IT service desk, incident/change management","Incident tracking, change requests, SLA management"],
        ]}
        caption="These are separate disciplines often integrated in enterprise environments. One platform sometimes covers multiple roles."
      />
      <Callout type="maintenance" title="DCIM Scope Varies Widely By Vendor and Edition">
        DCIM is a broad category — some platforms primarily focus on asset management, some on power monitoring, some on capacity planning. When comparing, verify specific capabilities: is SNMP monitoring included? Is there intelligent PDU support? What is the reporting like? Is an API available? There is no single "standard" DCIM feature set.
      </Callout>

      <h2 id="dcim-architecture" style={S.h2}>DCIM Architecture and Data Flow</h2>
      <p style={S.p}>The DCIM architecture has a physical infrastructure layer (actual equipment), a data acquisition layer (protocols and agents), the DCIM core engine (processing, asset database, analytics), and a presentation layer (dashboards, reports, API). Data acquisition happens through multiple paths: power data from intelligent PDUs and UPS over SNMP, from energy meters over Modbus, from smart devices over REST APIs, from CRAC units over BACnet, from environmental sensor controllers, and from manual asset import (spreadsheet or discovery scan).</p>
      <Figure caption="Fig 1 — DCIM architecture from physical infrastructure through data acquisition to core engine and presentation dashboards."><DcimArchitecture/></Figure>
    </>
  );
}
