"use client";
import { S, Callout, ComparisonTable, Figure } from "../shared";
import TopicLink from "@/components/TopicLink";
import EmsArchitecture from "../svg/EmsArchitecture";
import EmsDataFlow from "../svg/EmsDataFlow";

export default function Basics() {
  return (
    <>
      <div style={{background:"#fef9c3",border:"1px solid #f59e0b",borderRadius:"10px",padding:"1.2rem 1.4rem",marginBottom:"2rem"}}>
        <p style={{fontWeight:700,color:"#78350f",marginBottom:"0.6rem",fontSize:"1rem"}}>📋 Quick Summary — EMS in 2 Minutes</p> <ul style={{...S.ul,marginBottom:0}}> <li><strong>What EMS is:</strong> Energy Management System — a platform that measures, monitors, analyzes and reports a facility's energy consumption for optimization and compliance.</li> <li><strong>Foundation:</strong> Energy meters — utility incomer, UPS output, CRAC/chiller, PDU — integrate them into BMS/EMS over Modbus or BACnet. Without metering, EMS is blind.</li> <li><strong>Key KPIs:</strong> kW (instantaneous), kWh (consumed energy), kVA, power factor, peak demand, PUE (Power Usage Effectiveness).</li> <li><strong>EMS vs BMS:</strong> BMS does operational monitoring (alarm, HVAC control). EMS does energy accounting, cost tracking, efficiency reporting. Some platforms combine both.</li> <li><strong>Troubleshooting:</strong> Zero or wrong energy values — check meter comm → register address → data type/scaling → byte order (32-bit values) → historian gaps.</li> </ul>
      </div>

      <h2 id="what-is-ems" style={S.h2}>What Is an Energy Management System?</h2>
      <p style={S.p}>An Energy Management System — or EMS — is a software platform that systematically measures, collects, analyzes and reports energy consumption in a facility. The goal is to understand energy use, identify waste, improve efficiency, and provide evidence for regulatory or sustainability reporting. EMS goes beyond just monitoring — it converts energy data into actionable intelligence.</p>
      <p style={S.p}>In the data center context EMS is particularly important because energy cost is the largest ongoing expense of operations. Server halls are running 24/7, cooling systems are running continuously — accounting for every kWh is essential for both cost management and sustainability commitments. Many enterprise clients and regulators expect documented energy performance data.</p>
      <p style={S.p}>EMS is not only for large enterprise facilities. Commercial buildings, hospitals, manufacturing plants, campuses — anywhere there is meaningful energy consumption and efficiency needs to be tracked, EMS gives value. In data centers it is used specifically for utility metering, IT load tracking, PUE calculation and energy reporting.</p>

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
        In a data center EMS is often a module inside the BMS, or the energy analytics component of a DCIM platform, or standalone energy monitoring software. Platform selection depends on project requirements. There is no single "correct" architecture.
      </Callout>

      <h2 id="ems-architecture" style={S.h2}>EMS Architecture and Data Flow</h2>
      <p style={S.p}>The EMS architecture has four primary layers: metering layer (physical measurement), data acquisition layer (communication interface), EMS server/application layer (processing, KPI calculation, validation), and presentation layer (dashboards, reports, alarms). The historian database stores time-series energy data, which is essential for analysis and reporting.</p>
      <Figure caption="Fig 1 — EMS architecture showing metering layer through data acquisition to EMS server, historian and presentation."><EmsArchitecture/></Figure>
      <Figure caption="Fig 2 — EMS data flow from physical load through meter, protocol interface, server, scaling to KPI dashboard and reports."><EmsDataFlow/></Figure>
    </>
  );
}
