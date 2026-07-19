"use client";
import { S, Callout, ComparisonTable, Figure } from "../shared";
import TopicLink from "@/components/TopicLink";
import DcimArchitecture from "../svg/DcimArchitecture";

export default function Basics() {
  return (
    <>
      <div style={{background:"#e0f2fe",border:"1px solid #7dd3fc",borderRadius:"10px",padding:"1.2rem 1.4rem",marginBottom:"2rem"}}>
        <p style={{fontWeight:700,color:"#0c4a6e",marginBottom:"0.6rem",fontSize:"1rem"}}>📋 Quick Summary — DCIM in 2 Minutes</p>
        <ul style={{...S.ul,marginBottom:0}}>
          <li><strong>DCIM kya hai:</strong> Data Center Infrastructure Management — ek platform jo IT assets (servers, racks, network), power chain, cooling capacity aur connectivity ko centrally manage aur monitor karta hai.</li>
          <li><strong>BMS se alag:</strong> BMS building M&E (HVAC, electrical, environment). DCIM IT infrastructure — rack level, asset level, per-outlet power. Dono complementary hain.</li>
          <li><strong>Core functions:</strong> Asset inventory, rack elevation, power chain visualization, space/power/cooling capacity planning, SNMP/Modbus/API device monitoring, MAC workflows.</li>
          <li><strong>Integration:</strong> DCIM southbound se UPS, intelligent PDU, CRAC, sensors, access control se data lete hain. Northbound BMS, EMS, NMS, CMMS, ITSM ko data dete hain.</li>
          <li><strong>Platforms:</strong> Vertiv Trellis, Athenta, Schneider EcoStruxure IT, Sunbird dcTrack, Nlyte — capabilities vary significantly by edition and version.</li>
        </ul>
      </div>

      <h2 id="what-is-dcim" style={S.h2}>What Is DCIM?</h2>
      <p style={S.p}>DCIM — Data Center Infrastructure Management — ek software platform hai jo data center ki physical IT infrastructure aur supporting systems ko end-to-end manage karta hai. DCIM ka scope BMS se fundamentally different hai — ye building systems ki jagah IT assets pe focus karta hai: kaunsa server kaunse rack mein hai, ek rack pe kitna power consume ho raha hai, kitni space available hai, kaunsi PDU outlet kaunse server pe connected hai, aur kab next rack overflow hogi capacity pe.</p>
      <p style={S.p}>DCIM ek single source of truth banana chahta hai data center operations ke liye — asset records, real-time power data, capacity projections aur change management sab ek tool mein. Large enterprise data centers mein DCIM ke bina accurate capacity planning manually spreadsheets pe hoti hai — inaccurate aur time-consuming. DCIM is process ko automate aur centralize karta hai.</p>

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
        DCIM ek broad category hai — kuch platforms primarily asset management pe focus karte hain, kuch power monitoring pe, kuch capacity planning pe. Compare karte time specific capabilities verify karo: kya SNMP monitoring include hai? Intelligent PDU support hai? Reporting kaise hai? API available hai? Koi single "standard" DCIM feature set nahi hai.
      </Callout>

      <h2 id="dcim-architecture" style={S.h2}>DCIM Architecture and Data Flow</h2>
      <p style={S.p}>DCIM architecture mein physical infrastructure layer (actual equipment), data acquisition layer (protocols aur agents), DCIM core engine (processing, asset database, analytics), aur presentation layer (dashboards, reports, API) hoti hain. Data acquisition multiple paths se hoti hai: SNMP intelligent PDUs aur UPS se power data, Modbus energy meters se, REST APIs smart devices se, BACnet CRAC units se, environmental sensor controllers se, aur manual asset import (spreadsheet ya discovery scan) se.</p>
      <Figure caption="Fig 1 — DCIM architecture from physical infrastructure through data acquisition to core engine and presentation dashboards."><DcimArchitecture/></Figure>
    </>
  );
}
