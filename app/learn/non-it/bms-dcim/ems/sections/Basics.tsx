"use client";
import { S, Callout, ComparisonTable, Figure } from "../shared";
import TopicLink from "@/components/TopicLink";
import EmsArchitecture from "../svg/EmsArchitecture";
import EmsDataFlow from "../svg/EmsDataFlow";

export default function Basics() {
  return (
    <>
      <div style={{background:"#fef9c3",border:"1px solid #f59e0b",borderRadius:"10px",padding:"1.2rem 1.4rem",marginBottom:"2rem"}}>
        <p style={{fontWeight:700,color:"#78350f",marginBottom:"0.6rem",fontSize:"1rem"}}>📋 Quick Summary — EMS in 2 Minutes</p>
        <ul style={{...S.ul,marginBottom:0}}>
          <li><strong>EMS kya hai:</strong> Energy Management System — ek platform jo facility ki energy consumption measure, monitor, analyze aur report karta hai for optimization aur compliance.</li>
          <li><strong>Foundation:</strong> Energy meters — utility incomer, UPS output, CRAC/chiller, PDU — inhe BMS/EMS mein Modbus ya BACnet se integrate karo. Bina metering ke EMS blind hai.</li>
          <li><strong>Key KPIs:</strong> kW (instantaneous), kWh (consumed energy), kVA, power factor, peak demand, PUE (Power Usage Effectiveness).</li>
          <li><strong>EMS vs BMS:</strong> BMS operational monitoring (alarm, HVAC control). EMS energy accounting, cost tracking, efficiency reporting. Kuch platforms dono combine karte hain.</li>
          <li><strong>Troubleshooting:</strong> Zero ya wrong energy values — meter comm check karo → register address → data type/scaling → byte order (32-bit values) → historian gaps.</li>
        </ul>
      </div>

      <h2 id="what-is-ems" style={S.h2}>What Is an Energy Management System?</h2>
      <p style={S.p}>Energy Management System — ya EMS — ek software platform hai jo kisi facility mein energy consumption ko systematically measure, collect, analyze aur report karta hai. Goal hai energy use understand karna, waste identify karna, efficiency improve karna, aur regulatory ya sustainability reporting ke liye evidence provide karna. EMS sirf monitoring se aage jaata hai — ye energy data ko actionable intelligence mein convert karta hai.</p>
      <p style={S.p}>Data center context mein EMS particularly important hai kyunki energy cost operations ka largest ongoing expense hota hai. Server halls 24/7 chal rahe hain, cooling systems continuously run ho rahi hain — har kWh ka hisaab lagana both cost management aur sustainability commitments ke liye zaroori hai. Many enterprise clients aur regulators documented energy performance data expect karte hain.</p>
      <p style={S.p}>EMS sirf large enterprise facilities ke liye nahi hai. Commercial buildings, hospitals, manufacturing plants, campuses — kahi bhi meaningful energy consumption ho aur efficiency track karna zaroori ho, EMS value deta hai. Data centers mein ye specifically utility metering, IT load tracking, PUE calculation aur energy reporting ke liye use hota hai.</p>

      <h2 id="ems-vs-bms-dcim" style={S.h2}>EMS vs BMS vs DCIM</h2>
      <ComparisonTable
        title="EMS vs BMS vs DCIM — Functional Comparison"
        headers={["Aspect","EMS","BMS","DCIM"]}
        rows={[
          ["Primary purpose","Energy consumption measurement, analysis, reporting","Building M&E system monitoring and control","IT infrastructure asset and capacity management"],
          ["Core data","kWh, kW, demand, power factor, PUE","Temperature, HVAC, alarms, equipment status","Rack power, assets, capacity, environment"],
          ["Protocols","Modbus, BACnet, pulse, DLMS/COSEM, API","BACnet, Modbus, LON, proprietary","SNMP, Modbus, REST API, IPMI"],
          ["IT asset awareness","No","No","Yes — core function"],
          ["Energy optimization","Core feature","Can contribute data","Can calculate PUE"],
          ["Alarm management","Energy threshold alerts","Operational alarms — core","IT and facility alarms"],
          ["Regulatory use","ISO 50001, sustainability reporting","ISO 27001 physical environment","Data center capacity planning"],
          ["Overlap","May be module inside BMS or DCIM","May include EMS module","May include EMS + BMS data"],
        ]}
        caption="Many commercial platforms blend these functions. Verify specific capabilities per vendor and product version."
      />
      <Callout type="maintenance" title="EMS Is Often a Module, Not a Standalone System">
        Data center mein EMS often BMS ke andar ek module hota hai, ya DCIM platform ka energy analytics component hota hai, ya standalone energy monitoring software hota hai. Platform selection project requirements pe depend karta hai. Koi single "correct" architecture nahi hai.
      </Callout>

      <h2 id="ems-architecture" style={S.h2}>EMS Architecture and Data Flow</h2>
      <p style={S.p}>EMS architecture mein four primary layers hain: metering layer (physical measurement), data acquisition layer (communication interface), EMS server/application layer (processing, KPI calculation, validation), aur presentation layer (dashboards, reports, alarms). Historian database time-series energy data store karta hai jo analysis aur reporting ke liye essential hai.</p>
      <Figure caption="Fig 1 — EMS architecture showing metering layer through data acquisition to EMS server, historian and presentation."><EmsArchitecture/></Figure>
      <Figure caption="Fig 2 — EMS data flow from physical load through meter, protocol interface, server, scaling to KPI dashboard and reports."><EmsDataFlow/></Figure>
    </>
  );
}
