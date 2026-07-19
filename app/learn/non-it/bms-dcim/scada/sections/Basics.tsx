"use client";
import { S, Callout, ComparisonTable, Figure } from "../shared";
import TopicLink from "@/components/TopicLink";
import ScadaArchitecture from "../svg/ScadaArchitecture";
import { faqs } from "../metadata";

export default function Basics() {
  return (
    <>
      <div style={{background:"#f0fdf4",border:"1px solid #bbf7d0",borderRadius:"10px",padding:"1.2rem 1.4rem",marginBottom:"2rem"}}>
        <p style={{fontWeight:700,color:"#14532d",marginBottom:"0.6rem",fontSize:"1rem"}}>📋 Quick Summary — SCADA in 2 Minutes</p>
        <ul style={{...S.ul,marginBottom:0}}>
          <li><strong>SCADA kya hai:</strong> Supervisory Control and Data Acquisition — industrial process monitoring aur supervisory control system. Field devices (PLCs, RTUs) se data collect karo, HMI pe display karo, historian mein store karo, aur supervisory commands issue karo.</li>
          <li><strong>Data Center mein:</strong> Typical commercial data centers BMS use karte hain SCADA nahi. SCADA relevant hai jahan high-voltage substation automation, large industrial cooling, utility interconnection ya hyperscale custom automation ho.</li>
          <li><strong>Key components:</strong> Field devices → RTU/PLC → Communication network → SCADA server → Historian → HMI/Operator workstation.</li>
          <li><strong>Protocols:</strong> Modbus RTU/TCP, DNP3, IEC 61850, OPC UA, Profibus, proprietary — application pe depend karta hai. BMS/DCIM se fundamentally different protocol landscape.</li>
          <li><strong>Security:</strong> OT network ko IT network se segmented rakhna critical hai — SCADA systems legacy protocols use karte hain jo cyber attacks ke vulnerable hain.</li>
        </ul>
      </div>

      <h2 id="what-is-scada" style={S.h2}>What Is SCADA?</h2>
      <p style={S.p}>SCADA — Supervisory Control and Data Acquisition — ek industrial automation system hai jo geographically distributed field devices se real-time data collect karta hai, central control room mein display karta hai, historian mein store karta hai, aur operators ko supervisory control capabilities deta hai. "Supervisory" word important hai — SCADA operators high-level setpoints aur commands issue karte hain; actual control logic PLCs ya RTUs pe locally run hota hai.</p>
      <p style={S.p}>SCADA ka origin 1960s-1970s mein oil pipelines aur power grids mein monitoring ke liye hua. Aaj bhi primary applications industrial hain: oil aur gas pipelines, electrical power grids (transmission aur distribution), water treatment plants, wastewater systems, manufacturing plants, chemical processing. Data center context mein SCADA primarily high-voltage utility interconnections, custom industrial automation aur hyperscale facilities mein use hota hai — not in typical commercial or enterprise data centers.</p>

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
      <p style={S.p}>SCADA architecture mein paanch layers hain. Field layer mein physical equipment aur sensors hain. Controller layer mein PLCs ya RTUs hain jo field devices se I/O collect karte hain aur local logic run karte hain. Communication layer SCADA server se controllers ko connect karta hai — serial ya Ethernet, dedicated OT network pe. SCADA server central brain hai — tag database, alarm engine, trend logger, script execution. HMI/Operator workstation layer operators ko real-time view aur command capability deta hai.</p>
      <Figure caption="Fig 1 — SCADA architecture from field layer through RTU/PLC and communication network to SCADA server, historian and HMI."><ScadaArchitecture/></Figure>

      <h2 id="plc-rtu" style={S.h2}>PLC and RTU — Field Controllers</h2>
      <p style={S.p}><strong>PLC (Programmable Logic Controller)</strong> primarily control logic ke liye design hua hai. Fast deterministic scan cycles (1-10 ms typical), complex program execution (Ladder Diagram, Function Block, Structured Text — IEC 61131-3 standard), multiple I/O modules. Industrial manufacturing aur automation mein standard device hai. Data centers mein PLCs typically DG/ATS control panels mein, chiller plant sequencing mein, aur custom automation applications mein use hote hain.</p>
      <p style={S.p}><strong>RTU (Remote Terminal Unit)</strong> primarily remote monitoring ke liye design hua tha — geographically distributed field sites pe (pipeline pump stations, remote substations). Field data collect karo aur SCADA master ko protocol se bhejo. DNP3, Modbus ya IEC 60870 protocols common hain. Often low-power, battery-backed, harsh environment rated. Modern RTUs PLCs ki capabilities considerably overlap karte hain — distinction blurring ho rahi hai.</p>

      <h2 id="hmi-scada-server" style={S.h2}>HMI, SCADA Server and Historian</h2>
      <p style={S.p}><strong>HMI (Human-Machine Interface)</strong> operator ka primary interface hai — mimic diagrams (P&ID style), process values, alarm list, trend graphs. Local HMI (panel-mounted touchscreen) aur SCADA HMI (PC-based) dono exist karte hain. Good HMI design operators ko fast, accurate situational awareness deta hai — poor HMI design fatigue aur errors cause karta hai. HMI Design guidelines: ISA 101 reference karo.</p>
      <p style={S.p}><strong>SCADA server</strong> central application hai — tag database (each monitored value ka named entry), alarm engine (threshold monitoring, notification), trend logger (time-series storage in memory buffer), script/sequence engine (automated responses). Common SCADA platforms: Schneider Electric EcoStruxure Geo SCADA Expert (formerly Citect), AVEVA System Platform (Wonderware), Rockwell FactoryTalk, Inductive Automation Ignition (web-based, modern). Platform selection application, industry aur existing ecosystem pe depend karta hai.</p>
      <p style={S.p}><strong>Historian</strong> long-term time-series data store karta hai. AVEVA PI (previously OSIsoft PI) industrial historian ka widely-used example hai — millions of tags, compressed storage, query capabilities. Historian SCADA se separate ya integrated ho sakta hai. Long-term data retention, report generation aur regulatory compliance evidence historian se milta hai.</p>

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
        caption="Protocol selection depends on equipment, application requirements and existing infrastructure. Ye protocols fundamentally different communication models use karte hain — different data representations, discovery mechanisms aur security capabilities hain. Ye interchangeable nahi hain; har ek specific application context ke liye design hua hai. Not every SCADA platform supports all of these — platform documentation verify karo."
      />

      <h2 id="monitoring-control" style={S.h2}>Monitoring vs Supervisory Control</h2>
      <p style={S.p}>SCADA mein "supervisory" control ka matlab hai: SCADA operator setpoints change kar sakta hai, sequences start kar sakta hai, ya equipment enable/disable kar sakta hai — lekin actual low-level control (PID loop, interlock logic) PLC/RTU pe locally run hota hai. SCADA remote command issue karta hai — PLC execute karta hai. Agar SCADA/communication fail ho toh PLC standalone mode mein safe state maintain karta hai.</p>
      <Callout type="danger" title="Critical Process Control — Safety Architecture Essential">
        Critical process equipment (high-voltage switchgear, industrial processes, safety systems) pe remote SCADA commands safety analysis, approval, interlock protection aur fail-safe design require karte hain. SIL (Safety Integrity Level) requirements applicable ho sakte hain. BMS se zyada stringent requirements hain. IEC 61508 / IEC 61511 functional safety standards reference karo where applicable.
      </Callout>

      <h2 id="alarms-trends" style={S.h2}>Alarms, Trends and Historian</h2>
      <p style={S.p}>SCADA alarm management BMS se similar hai lekin typically more complex — more devices, more tags, faster-changing values. Alarm philosophy document (APD) define karta hai alarm types, priorities, setpoints, response times, rationalization criteria. ISA 18.2 alarm management standard SCADA aur DCS applications ke liye reference hai. Historian trend queries engineering analysis ke liye essential hain — process improvements, root cause, regulatory reporting.</p>

      <h2 id="dc-applications" style={S.h2}>Data Center and Utility Applications</h2>
      <p style={S.p}>Typical commercial aur enterprise data centers mein traditional SCADA required nahi hai — BMS effectively manage karta hai. SCADA relevant hai: (1) High-voltage utility interconnection — where IEC 61850 or DNP3 protection relays aur substation automation involved hai. (2) Large custom chiller plants ya industrial cooling with PLC-based sequencing that needs centralized supervisory view. (3) Hyperscale facilities (Meta, Google, Amazon-scale) jo custom automation platforms develop karte hain — SCADA-heritage aur building-automation hybrid. (4) Campus power distribution monitoring where utility-grade SCADA infrastructure exists.</p>
      <Callout type="important" title="SCADA Is Not Required in Most Data Centers">
        Ye commonly misunderstood hai. Standard commercial ya enterprise data center BMS se successfully operate hote hain bina SCADA ke. SCADA ki complexity, cost aur cybersecurity requirements unjustified hain jahan BMS adequate hai. Requirement assess karo based on actual application — koi assumption mat karo.
      </Callout>

      <h2 id="integration" style={S.h2}>Integration with Other Systems</h2>
      <p style={S.p}>SCADA northbound integration OPC DA/UA ke through typically hoti hai — SCADA OPC server expose karta hai jo BMS, DCIM ya enterprise systems consume kar sakte hain. OPC UA modern standard hai — secure, platform-independent. Historian APIs long-term data access dete hain. REST APIs modern SCADA platforms mein available hote hain. Bidirectional integration design karte time data ownership, control authority aur failsafe behavior carefully define karo.</p>

      <h2 id="cybersecurity" style={S.h2}>SCADA Cybersecurity Basics</h2>
      <p style={S.p}>SCADA cybersecurity IT cybersecurity se different challenges present karta hai. Legacy systems: SCADA components often old OS (Windows XP/7), proprietary protocols, no built-in encryption. Patching difficult: industrial systems pe patch testing extensive hai — availability requirements strict hain. Air gap / segmentation: OT network ko IT network se separated rakhna core principle hai — internet exposure avoid karo. DMZ architecture: IT-OT DMZ where data must cross boundaries — one-way data diodes for critical systems.</p>
      <p style={S.p}>Key principles: Remote access sirf secure VPN/jump host se; role-based access control; firmware updates when validated; vendor remote access strictly controlled with session recording; incident response plan specifically for OT; regular vulnerability assessment. IEC 62443 standard industrial cybersecurity ke liye comprehensive framework provide karta hai.</p>

      <h2 id="preventive-maintenance" style={S.h2}>Preventive Maintenance</h2>
      <p style={S.p}>Monthly: all field devices communicating — status check. Alarm log review. Historian gap check. Communication link health. Quarterly: PLC/RTU backup — control program backup. Battery backup (UPS for SCADA server, RTU batteries). Software license expiry check. Annual: SCADA server OS updates (per OEM-validated patch process). PLC firmware review. Field instrument calibration. Communication cable inspection. Cybersecurity review — access logs, open ports, vendor access audit.</p>

      <h2 id="troubleshooting" style={S.h2}>Engineer Troubleshooting — SCADA Issues</h2>
      <h3 style={S.h3}>PLC/RTU Offline</h3>
      <p style={S.p}><strong>First:</strong> Physical — PLC powered? LEDs normal? Communication port connected? <strong>Next:</strong> Communication — protocol settings match (baud, parity, slave ID / IP, port)? Cable/link OK? <strong>Fix:</strong> Power, cable, config mismatch resolve karo. PLC standalone mode check karo — local running hai?</p>
      <h3 style={S.h3}>Tag Not Updating</h3>
      <p style={S.p}><strong>First:</strong> PLC online hai? Other tags from same PLC updating? <strong>Next:</strong> Register address correct? Function code correct? Scan group configured? <strong>Fix:</strong> OEM manual se register re-verify karo. Scaling aur data type check karo.</p>
      <h3 style={S.h3}>Wrong Value</h3>
      <p style={S.p}>Scaling error? Data type mismatch (INT16 vs UINT16 for sensor readings that should be positive)? Engineering unit wrong? Field instrument calibration check karo.</p>
      <h3 style={S.h3}>HMI Not Updating</h3>
      <p style={S.p}>SCADA server se HMI connection alive? Tag binding correct? HMI display refresh rate configured? Server-side tag quality check karo.</p>
      <h3 style={S.h3}>Alarm Not Generated</h3>
      <p style={S.p}>Alarm limit correctly configured? Tag quality Good hai? Alarm suppressed? Engineering unit vs limit mismatch? Alarm delay/deadband too large?</p>
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
        Ek large data center campus ka high-voltage utility interconnection IEC 61850 substation automation pe based tha. Campus BMS building M&E manage karta tha. Utility substation ke liye separate SCADA system installed tha — IEC 61850 protection relays se data receive karta tha, switchgear status monitor karta tha, aur operators ko supervisory commands allow karta tha (with proper authorization). BMS aur SCADA integrate the OPC UA ke through — campus power events SCADA se BMS ko visible the. Ye clear example hai kahan SCADA genuinely needed hai (utility HV interconnect) aur BMS kahan operate karta hai (building M&E) — separate systems, specific roles.
      </Callout>

      <h2 id="interview-questions" style={S.h2}>Interview Questions</h2>
      <h3 style={S.h3}>Q1: SCADA aur BMS mein kya key difference hai?</h3>
      <p style={S.p}><strong>Answer:</strong> BMS building M&E — HVAC, electrical, environment — monitor aur control karta hai, BACnet/Modbus protocols use karke, primarily building automation applications ke liye. SCADA industrial processes — power grids, pipelines, water treatment — ke liye hai, broader protocol range (DNP3, IEC 61850, OPC UA) aur faster control cycles ke saath. Data centers typically BMS use karte hain. SCADA specific applications mein relevant hai — utility interconnect, custom industrial automation, hyperscale.</p>
      <h3 style={S.h3}>Q2: PLC aur RTU mein kya difference hai?</h3>
      <p style={S.p}><strong>Answer:</strong> PLC control logic execute karta hai — deterministic fast scan, complex program. Industrial manufacturing aur automation standard. RTU primarily remote monitoring ke liye — field data collect, SCADA ko bhejo. DNP3, Modbus use karta hai, often remote sites pe (pipelines, substations). Modern boundaries blurring — RTUs increasingly PLC-like capabilities have karte hain.</p>
      <h3 style={S.h3}>Q3: SCADA cybersecurity mein network segmentation kyun critical hai?</h3>
      <p style={S.p}><strong>Answer:</strong> SCADA/OT systems legacy protocols aur OSes use karte hain jinka patching difficult hai — internet exposure catastrophic ho sakti hai. Network segmentation OT ko IT se aur internet se isolate karta hai — attack surface dramatically reduce hoti hai. OT-IT DMZ data crossing ke liye use hota hai. One-way data diodes critical systems ke liye. Remote access sirf secure VPN/jump host se. IEC 62443 framework industrial cybersecurity ke liye comprehensive guidance deta hai.</p>

      <h2 id="key-takeaways" style={S.h2}>Key Takeaways</h2>
      <ul style={S.ul}>
        <li>SCADA industrial process monitoring aur supervisory control ke liye hai — utility, pipeline, manufacturing. Typical data centers mein traditional SCADA required nahi hai.</li>
        <li>Key components: Field devices → RTU/PLC → Communication → SCADA server → Historian → HMI.</li>
        <li>PLC control logic locally run karta hai — SCADA supervisory commands issue karta hai. Local control continues agar SCADA offline ho.</li>
        <li>Industrial protocols — DNP3, IEC 61850, OPC UA — BMS protocols se different hain. Application pe select karo.</li>
        <li>OT cybersecurity: network segmentation, no direct internet, secure remote access, legacy system awareness. IEC 62443 reference karo.</li>
        <li>Data center mein SCADA relevant hai: HV utility substation, custom large-scale industrial cooling, hyperscale automation.</li>
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
        <li><TopicLink slug="dcim" variant="inline"/> — DCIM IT infrastructure management — SCADA se different domain.</li>
        <li><TopicLink slug="sensors" variant="inline"/> — Field sensors jo SCADA/BMS ko feed karte hain.</li>
      </ul>
    </>
  );
}
