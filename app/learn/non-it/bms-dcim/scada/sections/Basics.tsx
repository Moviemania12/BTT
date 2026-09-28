"use client";
import { S, Callout, ComparisonTable, Figure } from "../shared";
import TopicLink from "@/components/TopicLink";
import ScadaArchitecture from "../svg/ScadaArchitecture";
import { faqs } from "../metadata";

export default function Basics() {
  return (
    <>
      <div style={{background:"#f0fdf4",border:"1px solid #bbf7d0",borderRadius:"10px",padding:"1.2rem 1.4rem",marginBottom:"2rem"}}>
        <p style={{fontWeight:700,color:"#14532d",marginBottom:"0.6rem",fontSize:"1rem"}}>📋 Quick Summary — SCADA in 2 Minutes</p> <ul style={{...S.ul,marginBottom:0}}> <li><strong>What SCADA is:</strong> Supervisory Control and Data Acquisition — an industrial process monitoring and supervisory control system. Collect data from field devices (PLCs, RTUs), display it on the HMI, store it in the historian, and issue supervisory commands.</li> <li><strong>In the Data Center:</strong> Typical commercial data centers use BMS, not SCADA. SCADA is relevant where there is high-voltage substation automation, large industrial cooling, utility interconnection or hyperscale custom automation.</li> <li><strong>Key components:</strong> Field devices → RTU/PLC → Communication network → SCADA server → Historian → HMI/Operator workstation.</li> <li><strong>Protocols:</strong> Modbus RTU/TCP, DNP3, IEC 61850, OPC UA, Profibus, proprietary — depends on the application. A fundamentally different protocol landscape from BMS/DCIM.</li> <li><strong>Security:</strong> Keeping the OT network segmented from the IT network is critical — SCADA systems use legacy protocols that are vulnerable to cyber attacks.</li> </ul>
      </div>

      <h2 id="what-is-scada" style={S.h2}>What Is SCADA?</h2>
      <p style={S.p}>SCADA — Supervisory Control and Data Acquisition — is an industrial automation system that collects real-time data from geographically distributed field devices, displays it in a central control room, stores it in a historian, and gives operators supervisory control capabilities. The word "supervisory" is important — SCADA operators issue high-level setpoints and commands; the actual control logic runs locally on PLCs or RTUs.</p>
      <p style={S.p}>SCADA originated in the 1960s-1970s for monitoring oil pipelines and power grids. Even today the primary applications are industrial: oil and gas pipelines, electrical power grids (transmission and distribution), water treatment plants, wastewater systems, manufacturing plants, chemical processing. In the data center context SCADA is used primarily in high-voltage utility interconnections, custom industrial automation and hyperscale facilities — not in typical commercial or enterprise data centers.</p>

      <h2 id="scada-vs-bms-dcim" style={S.h2}>SCADA vs BMS vs DCIM vs DCS</h2>
      <ComparisonTable
        title="SCADA vs Related Systems"
        headers={["System","Primary Domain","Control Capability","Typical Protocols","DC Relevance"]}
        rows={[
          ["SCADA","Industrial process, utility, pipeline","Supervisory — setpoints, start/stop","Modbus, DNP3, IEC 61850, OPC UA","Utility interconnection, hyperscale custom automation"],
          ["DCS","Continuous industrial process (refinery, chemical)","Closed-loop continuous control","Fieldbus, OPC, proprietary","Rare in DC — specialized chiller/cooling automation"],
          ["BMS","Building M&E — HVAC, electrical, environment","Limited — setpoints, scheduling","BACnet, Modbus, LON","Very common in data centers"],
          ["DCIM","IT infrastructure — assets, racks, power chain","Monitoring primarily","SNMP, Modbus, API","Common in enterprise data centers"],
          ["PLC standalone","Machine/process control","Full control logic locally","Modbus, Profibus, EtherNet/IP","DG/ATS control, chiller sequencing"],
        ]}
        caption="Selection depends on application complexity, scale, safety requirements and industry standards."
      />

      <h2 id="scada-architecture" style={S.h2}>SCADA Architecture and Components</h2>
      <p style={S.p}>The SCADA architecture has five layers. The field layer has physical equipment and sensors. The controller layer has PLCs or RTUs that collect I/O from field devices and run local logic. The communication layer connects controllers to the SCADA server — serial or Ethernet, on a dedicated OT network. The SCADA server is the central brain — tag database, alarm engine, trend logger, script execution. The HMI/Operator workstation layer gives operators a real-time view and command capability.</p>
      <Figure caption="Fig 1 — SCADA architecture from field layer through RTU/PLC and communication network to SCADA server, historian and HMI."><ScadaArchitecture/></Figure>

      <h2 id="plc-rtu" style={S.h2}>PLC and RTU — Field Controllers</h2>
      <p style={S.p}>The <strong>PLC (Programmable Logic Controller)</strong> is primarily designed for control logic. Fast deterministic scan cycles (1-10 ms typical), complex program execution (Ladder Diagram, Function Block, Structured Text — IEC 61131-3 standard), multiple I/O modules. It is the standard device in industrial manufacturing and automation. In data centers PLCs are typically used in DG/ATS control panels, in chiller plant sequencing, and in custom automation applications.</p>
      <p style={S.p}>The <strong>RTU (Remote Terminal Unit)</strong> was primarily designed for remote monitoring — at geographically distributed field sites (pipeline pump stations, remote substations). Collect field data and send it to the SCADA master over a protocol. DNP3, Modbus or IEC 60870 protocols are common. Often low-power, battery-backed, harsh environment rated. Modern RTUs considerably overlap the capabilities of PLCs — the distinction is blurring.</p>

      <h2 id="hmi-scada-server" style={S.h2}>HMI, SCADA Server and Historian</h2>
      <p style={S.p}>The <strong>HMI (Human-Machine Interface)</strong> is the operator's primary interface — mimic diagrams (P&ID style), process values, alarm list, trend graphs. Both local HMI (panel-mounted touchscreen) and SCADA HMI (PC-based) exist. Good HMI design gives operators fast, accurate situational awareness — poor HMI design causes fatigue and errors. HMI Design guidelines: refer to ISA 101.</p>
      <p style={S.p}>The <strong>SCADA server</strong> is the central application — tag database (a named entry for each monitored value), alarm engine (threshold monitoring, notification), trend logger (time-series storage in memory buffer), script/sequence engine (automated responses). Common SCADA platforms: Schneider Electric EcoStruxure Geo SCADA Expert (formerly Citect), AVEVA System Platform (Wonderware), Rockwell FactoryTalk, Inductive Automation Ignition (web-based, modern). Platform selection depends on the application, industry and existing ecosystem.</p>
      <p style={S.p}>The <strong>Historian</strong> stores long-term time-series data. AVEVA PI (previously OSIsoft PI) is a widely-used example of an industrial historian — millions of tags, compressed storage, query capabilities. The historian can be separate from or integrated with SCADA. Long-term data retention, report generation and regulatory compliance evidence come from the historian.</p>

      <h2 id="protocols" style={S.h2}>Industrial Communication Protocols</h2>
      <ComparisonTable
        title="SCADA Protocols — Overview"
        headers={["Protocol","Physical/Network","Primary Use","Key Feature","Common in DC?"]}
        rows={[
          ["Modbus RTU","RS-485 serial","PLCs, meters, sensors","Simple, widely supported","Yes — BMS/DCIM also use it"],
          ["Modbus TCP","Ethernet","Same devices, IP network","Ethernet version of Modbus","Yes — very common"],
          ["DNP3","Serial or Ethernet","Utility SCADA, RTUs, substations","Time-stamped, reliable delivery, SOE","Utility interconnect, not typical DC"],
          ["IEC 61850","Ethernet","Substation automation, protection IEDs","Standardized data model, GOOSE, MMS","High-voltage substation in DC utility area"],
          ["OPC UA","Ethernet TCP","SCADA/DCS/MES integration, modern IIoT","Secure, cross-platform, semantic model","Growing — BMS-SCADA integration"],
          ["Profibus","Serial (RS-485 based)","Industrial automation, drives","Deterministic, European standard","Rare in DC — industrial plants"],
          ["EtherNet/IP","Ethernet","Rockwell/Allen-Bradley PLCs","CIP protocol over Ethernet","Rare in DC — manufacturing"],
          ["BACnet MS/TP + IP","RS-485 / Ethernet","Building automation (DDC)","Building-specific standard","Yes — BMS domain, not SCADA"],
        ]}
        caption="Protocol selection depends on equipment, application requirements and existing infrastructure. These protocols use fundamentally different communication models — they have different data representations, discovery mechanisms and security capabilities. They are not interchangeable; each is designed for a specific application context. Not every SCADA platform supports all of these — verify the platform documentation."
      />

      <h2 id="monitoring-control" style={S.h2}>Monitoring vs Supervisory Control</h2>
      <p style={S.p}>In SCADA, "supervisory" control means: the SCADA operator can change setpoints, start sequences, or enable/disable equipment — but the actual low-level control (PID loop, interlock logic) runs locally on the PLC/RTU. SCADA issues a remote command — the PLC executes it. If SCADA/communication fails, the PLC maintains a safe state in standalone mode.</p>
      <Callout type="danger" title="Critical Process Control — Safety Architecture Essential">
        Remote SCADA commands on critical process equipment (high-voltage switchgear, industrial processes, safety systems) require safety analysis, approval, interlock protection and fail-safe design. SIL (Safety Integrity Level) requirements may be applicable. The requirements are more stringent than for BMS. Refer to IEC 61508 / IEC 61511 functional safety standards where applicable.
      </Callout>

      <h2 id="alarms-trends" style={S.h2}>Alarms, Trends and Historian</h2>
      <p style={S.p}>SCADA alarm management is similar to BMS but typically more complex — more devices, more tags, faster-changing values. The alarm philosophy document (APD) defines alarm types, priorities, setpoints, response times, rationalization criteria. The ISA 18.2 alarm management standard is the reference for SCADA and DCS applications. Historian trend queries are essential for engineering analysis — process improvements, root cause, regulatory reporting.</p>

      <h2 id="dc-applications" style={S.h2}>Data Center and Utility Applications</h2>
      <p style={S.p}>Traditional SCADA is not required in typical commercial and enterprise data centers — the BMS manages effectively. SCADA is relevant: (1) High-voltage utility interconnection — where IEC 61850 or DNP3 protection relays and substation automation are involved. (2) Large custom chiller plants or industrial cooling with PLC-based sequencing that needs a centralized supervisory view. (3) Hyperscale facilities (Meta, Google, Amazon-scale) that develop custom automation platforms — a SCADA-heritage and building-automation hybrid. (4) Campus power distribution monitoring where utility-grade SCADA infrastructure exists.</p>
      <Callout type="important" title="SCADA Is Not Required in Most Data Centers">
        This is commonly misunderstood. Standard commercial or enterprise data centers operate successfully with a BMS without SCADA. The complexity, cost and cybersecurity requirements of SCADA are unjustified where a BMS is adequate. Assess the requirement based on the actual application — do not make assumptions.
      </Callout>

      <h2 id="integration" style={S.h2}>Integration with Other Systems</h2>
      <p style={S.p}>SCADA northbound integration typically happens through OPC DA/UA — SCADA exposes an OPC server that BMS, DCIM or enterprise systems can consume. OPC UA is the modern standard — secure, platform-independent. Historian APIs give long-term data access. REST APIs are available in modern SCADA platforms. When designing bidirectional integration, carefully define data ownership, control authority and failsafe behavior.</p>

      <h2 id="cybersecurity" style={S.h2}>SCADA Cybersecurity Basics</h2>
      <p style={S.p}>SCADA cybersecurity presents different challenges from IT cybersecurity. Legacy systems: SCADA components often have an old OS (Windows XP/7), proprietary protocols, no built-in encryption. Patching is difficult: patch testing on industrial systems is extensive — availability requirements are strict. Air gap / segmentation: keeping the OT network separated from the IT network is a core principle — avoid internet exposure. DMZ architecture: an IT-OT DMZ where data must cross boundaries — one-way data diodes for critical systems.</p>
      <p style={S.p}>Key principles: remote access only through a secure VPN/jump host; role-based access control; firmware updates when validated; vendor remote access strictly controlled with session recording; an incident response plan specifically for OT; regular vulnerability assessment. The IEC 62443 standard provides a comprehensive framework for industrial cybersecurity.</p>

      <h2 id="preventive-maintenance" style={S.h2}>Preventive Maintenance</h2>
      <p style={S.p}>Monthly: all field devices communicating — status check. Alarm log review. Historian gap check. Communication link health. Quarterly: PLC/RTU backup — control program backup. Battery backup (UPS for SCADA server, RTU batteries). Software license expiry check. Annual: SCADA server OS updates (per OEM-validated patch process). PLC firmware review. Field instrument calibration. Communication cable inspection. Cybersecurity review — access logs, open ports, vendor access audit.</p>

      <h2 id="troubleshooting" style={S.h2}>Engineer Troubleshooting — SCADA Issues</h2>
      <h3 style={S.h3}>PLC/RTU Offline</h3>
      <p style={S.p}><strong>First:</strong> Physical — is the PLC powered? LEDs normal? Communication port connected? <strong>Next:</strong> Communication — do the protocol settings match (baud, parity, slave ID / IP, port)? Cable/link OK? <strong>Fix:</strong> Resolve the power, cable, config mismatch. Check PLC standalone mode — is it running locally?</p>
      <h3 style={S.h3}>Tag Not Updating</h3>
      <p style={S.p}><strong>First:</strong> Is the PLC online? Are other tags from the same PLC updating? <strong>Next:</strong> Is the register address correct? Function code correct? Scan group configured? <strong>Fix:</strong> Re-verify the register from the OEM manual. Check scaling and data type.</p>
      <h3 style={S.h3}>Wrong Value</h3>
      <p style={S.p}>Scaling error? Data type mismatch (INT16 vs UINT16 for sensor readings that should be positive)? Engineering unit wrong? Check the field instrument calibration.</p>
      <h3 style={S.h3}>HMI Not Updating</h3>
      <p style={S.p}>Is the HMI connection to the SCADA server alive? Is the tag binding correct? Is the HMI display refresh rate configured? Check the server-side tag quality.</p>
      <h3 style={S.h3}>Alarm Not Generated</h3>
      <p style={S.p}>Is the alarm limit correctly configured? Is the tag quality Good? Is the alarm suppressed? Engineering unit vs limit mismatch? Alarm delay/deadband too large?</p>
      <ComparisonTable
        title="SCADA Troubleshooting Quick Reference"
        headers={["Symptom","First Check","Next Check","Likely Cause","Corrective Action"]}
        rows={[
          ["PLC/RTU offline","Power and comms LED","Protocol config (baud/IP)","Power loss or config mismatch","Restore power/comms, fix config"],
          ["Tag not updating","PLC online? Other tags OK?","Register address, scan group","Wrong address or scan not configured","Fix address from OEM manual"],
          ["Wrong value","Scaling formula","Field instrument reading","Scaling error or calibration drift","Fix scaling, recalibrate field device"],
          ["HMI stale","Server-HMI connection?","Tag binding on HMI graphic","Binding lost or connection drop","Reconnect, fix binding"],
          ["Historian gap","Historian service running?","Network to historian","Service stopped or network break","Restart service, fix network"],
          ["Alarm not firing","Tag quality Good?","Limit config, suppression","Wrong limit or suppressed","Fix limit/suppression config"],
          ["OPC connection fail","OPC server running?","Firewall/DCOM config","Service stopped or port blocked","Restart OPC server, fix firewall"],
        ]}
      />

      <h2 id="illustrative-scenario" style={S.h2}>Illustrative Scenario</h2>
      <Callout type="interview" title="Note: Illustrative scenario — not a documented real facility event">
        The high-voltage utility interconnection of a large data center campus was based on IEC 61850 substation automation. The campus BMS managed building M&E. A separate SCADA system was installed for the utility substation — it received data from IEC 61850 protection relays, monitored switchgear status, and allowed operators supervisory commands (with proper authorization). The BMS and SCADA were integrated through OPC UA — campus power events from SCADA were visible to the BMS. This is a clear example of where SCADA is genuinely needed (utility HV interconnect) and where the BMS operates (building M&E) — separate systems, specific roles.
      </Callout>

      <h2 id="interview-questions" style={S.h2}>Interview Questions</h2>
      <h3 style={S.h3}>Q1: What is the key difference between SCADA and BMS?</h3>
      <p style={S.p}><strong>Answer:</strong> BMS monitors and controls building M&E — HVAC, electrical, environment — using BACnet/Modbus protocols, primarily for building automation applications. SCADA is for industrial processes — power grids, pipelines, water treatment — with a broader protocol range (DNP3, IEC 61850, OPC UA) and faster control cycles. Data centers typically use BMS. SCADA is relevant in specific applications — utility interconnect, custom industrial automation, hyperscale.</p>
      <h3 style={S.h3}>Q2: What is the difference between a PLC and an RTU?</h3>
      <p style={S.p}><strong>Answer:</strong> A PLC executes control logic — deterministic fast scan, complex program. The standard for industrial manufacturing and automation. An RTU is primarily for remote monitoring — collect field data, send it to SCADA. It uses DNP3, Modbus, often at remote sites (pipelines, substations). The boundaries are blurring in modern systems — RTUs increasingly have PLC-like capabilities.</p>
      <h3 style={S.h3}>Q3: Why is network segmentation critical in SCADA cybersecurity?</h3>
      <p style={S.p}><strong>Answer:</strong> SCADA/OT systems use legacy protocols and OSes whose patching is difficult — internet exposure can be catastrophic. Network segmentation isolates OT from IT and from the internet — the attack surface reduces dramatically. An OT-IT DMZ is used for data crossing. One-way data diodes for critical systems. Remote access only through a secure VPN/jump host. The IEC 62443 framework gives comprehensive guidance for industrial cybersecurity.</p>

      <h2 id="key-takeaways" style={S.h2}>Key Takeaways</h2>
      <ul style={S.ul}>
        <li>SCADA is for industrial process monitoring and supervisory control — utility, pipeline, manufacturing. Traditional SCADA is not required in typical data centers.</li>
        <li>Key components: Field devices → RTU/PLC → Communication → SCADA server → Historian → HMI.</li>
        <li>The PLC runs control logic locally — SCADA issues supervisory commands. Local control continues if SCADA is offline.</li>
        <li>Industrial protocols — DNP3, IEC 61850, OPC UA — are different from BMS protocols. Select according to the application.</li>
        <li>OT cybersecurity: network segmentation, no direct internet, secure remote access, legacy system awareness. Refer to IEC 62443.</li>
        <li>SCADA is relevant in a data center for: HV utility substation, custom large-scale industrial cooling, hyperscale automation.</li>
        <li>Troubleshoot: field → PLC → comm → config → tag/register → HMI binding → historian — layer by layer.</li>
      </ul>

      <h2 style={{...S.h2,marginTop:"3rem"}}>Frequently Asked Questions</h2>
      {faqs.map((item,i)=>(
        <div key={i} style={{marginBottom:"1.5rem",paddingBottom:"1.5rem",borderBottom:i<faqs.length-1?"1px solid #e5e7eb":"none"}}>
          <p style={{...S.p,fontWeight:700,marginBottom:"0.4rem"}}>{item.q}</p>
          <p style={{...S.p,marginBottom:0}}>{item.a}</p>
        </div>
      ))}

      <h2 style={{...S.h2,marginTop:"3rem"}}>Related Topics</h2>
      <ul style={S.ul}>
        <li><TopicLink slug="bms" variant="inline"/> — Building automation system — BMS typically replaces SCADA for DC M&E.</li>
        <li><TopicLink slug="dcim" variant="inline"/> — DCIM IT infrastructure management — a different domain from SCADA.</li>
        <li><TopicLink slug="sensors" variant="inline"/> — field sensors that feed SCADA/BMS.</li>
      </ul>
    </>
  );
}
