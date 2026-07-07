"use client";
import { S, Callout, ComparisonTable, Figure } from "../shared";
import TopicLink from "@/components/TopicLink";
import IpduCommunicationDiagram from "../svg/IpduCommunicationDiagram";
import RackPduDistributionDiagram from "../svg/RackPduDistributionDiagram";

export default function OperationsAndClosing() {
  return (
    <>
      <h2 id="remote-monitoring" style={S.h2}>Remote Monitoring</h2>
      <p style={S.p}>iPDU ki killer feature hai remote monitoring — kisi bhi jagah se, browser ya management system se, real-time rack power status dekhna.</p>
      <p style={S.p}>Practical example: NOC engineer raat 2 baje Delhi mein baith ke Mumbai Data Center ke Rack R-21 ka outlet-level power consumption dekh sakta hai. Koi field trip required nahi.</p>
      <Figure caption="Fig 3 — iPDU Communication Architecture: SNMP se DCIM integration (IT team), Modbus se BMS integration (Facilities team), Environmental sensors, aur Outlet monitoring — sab ek iPDU se.">
        <IpduCommunicationDiagram />
      </Figure>
      <p style={S.p}>Remote monitoring ka data multiple systems ko simultaneously serve karta hai — DCIM, BMS, NMS, ticketing systems, capacity planning tools. iPDU ek source of truth ban jaata hai rack-level power ke liye.</p>

      <h2 id="bms-integration" style={S.h2}>BMS Integration</h2>
      <p style={S.p}>BMS (Building Management System) facility team ka monitoring platform hai. PDU se BMS integration typically Modbus TCP ya BACnet ke through hoti hai.</p>
      <p style={S.p}>BMS ko kya chahiye PDU se:</p>
      <ul style={S.ul}>
        <li>Total power per PDU (kW)</li>
        <li>Input current per phase (Amperes)</li>
        <li>Input voltage</li>
        <li>Over-temperature alarm</li>
        <li>Over-current alarm</li>
        <li>PDU online/offline status</li>
      </ul>
      <p style={S.p}>BMS yeh data aggregate karta hai across all PDUs — total Data Center power consumption calculate karta hai, PUE monitor karta hai, aur facility-level alarms generate karta hai.</p>
      <Callout type="best-practice" title="BMS vs DCIM — Different Consumers, Same Data">
        Facilities team BMS use karti hai: &quot;Is Data Center ka total power kitna hai? Cooling efficiency kaisi hai? Generator load kya hai?&quot; IT/Operations team DCIM use karti hai: &quot;Rack R-21 mein kitna headroom hai? Outlet 14 pe kaunsa server hai? Is rack ki average load trend kya hai?&quot; Dono ke questions alag hain — dono valid hain — isliye dono systems maintain karo.
      </Callout>

      <h2 id="dcim-integration" style={S.h2}>DCIM Integration</h2>
      <p style={S.p}>DCIM (Data Center Infrastructure Management) platform iPDU ka primary consumer hai. DCIM mein iPDU data se yeh sab visible hota hai:</p>
      <ComparisonTable
        headers={["DCIM Feature", "iPDU Data Used", "Business Value"]}
        rows={[
          ["Rack power map", "Per-rack kW from all PDUs", "Visual heat map of power density"],
          ["Capacity planning", "Current load vs rated capacity", "When to add more racks / circuits"],
          ["Asset mapping", "Per-outlet asset association", "Physical location of every server"],
          ["Stranded capacity", "Low-utilization racks identified", "Consolidation opportunities"],
          ["Change management", "Power available before adding server", "Pre-check before deployment"],
          ["Historical trending", "kWh, peak current over time", "Forecasting, anomaly detection"],
          ["Alarm management", "iPDU alerts → DCIM tickets", "Automated incident creation"],
          ["PUE calculation", "IT load from PDU data + total facility", "Efficiency reporting"],
        ]}
      />
      <p style={S.p}>Real example: Engineers Rack R-21 mein naya GPU server deploy karna chahte hain jisme 3kW power hai. DCIM se check karo: PDU-A current load 18A, PDU-B current load 19A, rated 32A each. Available headroom: PDU-A 7.6A (1.75 kW), PDU-B 6.6A (1.52 kW). New GPU server 3kW require karta hai — PDU-A headroom insufficient hai. Action: circuit upgrade ya load redistribution required before deployment.</p>

      <h2 id="snmp-modbus-mqtt" style={S.h2}>SNMP, Modbus & MQTT</h2>
      <p style={S.p}>iPDU teen primary communication protocols support karta hai. Har protocol ka alag use case hai.</p>
      <ComparisonTable
        headers={["Protocol", "Type", "Primary Use", "Data Center Application"]}
        rows={[
          ["SNMP v1/v2c/v3", "UDP-based, polling/trap", "IT network management", "DCIM, NMS integration — IT team"],
          ["Modbus RTU", "Serial RS-485", "Industrial automation", "Legacy BMS, SCADA — Facilities team"],
          ["Modbus TCP", "Ethernet-based Modbus", "Industrial over LAN", "Modern BMS integration"],
          ["BACnet", "Building automation", "HVAC, facility systems", "Integrated facility management"],
          ["MQTT", "Publish-subscribe, lightweight", "IoT, cloud monitoring", "Edge infrastructure, cloud DCIM"],
          ["REST API / JSON", "HTTP-based", "Modern integration", "Custom dashboards, cloud platforms"],
          ["SSH / CLI", "Secure shell", "Direct management", "Configuration, troubleshooting"],
        ]}
      />
      <h3 style={S.h3}>SNMP — Network Management Protocol</h3>
      <p style={S.p}>SNMP sabse commonly used protocol hai iPDU monitoring ke liye. PDU ek SNMP agent hota hai — MIB (Management Information Base) file define karti hai kaunse OIDs (data points) available hain. NMS ya DCIM in OIDs ko poll karta hai.</p>
      <p style={S.p}>SNMP v3 use karo — authentication aur encryption ke saath. SNMP v1/v2c plain text mein data send karta hai — security risk hai production environments mein.</p>
      <h3 style={S.h3}>Modbus — Industrial Protocol</h3>
      <p style={S.p}>Modbus TCP BMS ke saath integration ke liye standard choice hai. Register map per OEM alag hota hai — integration ke time vendor Modbus register document maango. Modbus polling-based hai — BMS har minute ya 5 minutes pe data read karta hai.</p>
      <h3 style={S.h3}>MQTT — Modern Lightweight Protocol</h3>
      <p style={S.p}>MQTT emerging protocol hai modern infrastructure ke liye. PDU data broker pe publish karta hai — DCIM ya cloud platform subscribe karta hai aur instantly data receive karta hai. SNMP polling se better for high-frequency monitoring — lower bandwidth, lower latency.</p>

      <h2 id="asset-identification" style={S.h2}>RFID & Asset Identification</h2>
      <p style={S.p}>Advanced iPDU mein per-outlet asset tagging capability hoti hai. Physical audit mein har rack check karne ki jagah digital asset map maintain hota hai.</p>
      <ComparisonTable
        headers={["Method", "How It Works", "Advantage"]}
        rows={[
          ["Manual tagging", "DCIM mein manually enter karo outlet → server mapping", "Simple, no extra hardware"],
          ["USB barcode scanner", "Server asset tag scan karo directly on PDU", "Fast, reduces manual errors"],
          ["RFID on cables", "Smart patch cord with RFID chip — PDU auto-detects", "Fully automated, no manual entry"],
          ["QR code per outlet", "PDU app se QR scan karo", "Mobile-friendly auditing"],
        ]}
      />
      <p style={S.p}>Practical benefit: maintenance team physically jaata hai Rack R-21 ke paas, DCIM app open karta hai — instantly dikhta hai Outlet 14 pe kaunsa server hai, last month ka power consumption kya tha, aur kaunsa ticket last time raise hua tha. Zero guesswork.</p>

      <h2 id="oem-comparison" style={S.h2}>OEM Comparison</h2>
      <p style={S.p}>PDU market mein kai established players hain. Har OEM ki apni strength aur typical use case hai.</p>
      <ComparisonTable
        headers={["OEM", "Key Product Line", "Strengths", "India Presence", "Note"]}
        rows={[
          ["APC (Schneider)", "AP7xxx, AP86xx series", "Widest range, most deployed globally, good ecosystem", "Excellent — direct + partners", "Most common in Indian DCs"],
          ["Schneider Electric", "Galaxy PDU, floor PDUs", "Premium quality, integrated EcoStruxure DCIM", "Excellent", "High-end enterprise choice"],
          ["Vertiv", "Geist PDU series", "High accuracy metering, flexible configurations", "Good", "Popular for iPDU features"],
          ["Eaton", "ePDU series", "Strong North America presence, good reliability", "Moderate", "Growing India footprint"],
          ["Raritan", "PX3, PX4 series", "Very detailed per-outlet monitoring, good DCIM", "Limited India direct", "Popular in managed DC environments"],
          ["Server Technology", "PRO2 series", "High density, per-outlet accuracy", "Limited India", "Niche but respected brand"],
          ["Delta Electronics", "PDU series", "Competitive pricing, growing DC market", "Growing", "Good value proposition"],
        ]}
      />
      <Callout type="important" title="OEM Selection Criteria">
        OEM select karte waqt dekho: (1) Existing DCIM platform compatibility — kya PDU ka MIB aur driver available hai? (2) India service support — replacement parts aur on-site support kitni quickly milti hai? (3) Firmware update track record — security patches kitni regularly aate hain? (4) Warranty terms — advance replacement available hai ya repair-based? Cheapest PDU always best choice nahi hoti.
      </Callout>

      <h2 id="failure-modes" style={S.h2}>Failure Modes</h2>
      <ComparisonTable
        headers={["Failure Mode", "Symptoms", "Root Cause", "Impact", "Resolution"]}
        rows={[
          ["Branch circuit breaker trip", "Some outlets lose power, others work", "Overload, short circuit, faulty device", "Partial rack power loss", "Find cause first, then reset breaker"],
          ["Main input breaker trip", "All outlets lose power", "Input overload, PDU internal fault", "Full rack power loss", "Investigate input side — check UPS output"],
          ["Outlet physical damage", "Plug won't seat properly, sparking", "Mechanical damage, poor connection", "Individual outlet unusable", "Replace PDU or specific outlet module if modular"],
          ["Controller/comms failure", "SNMP not responding, no DCIM data", "Network issue, controller fault, firmware", "Monitoring blind — power still works", "Check management LAN → reboot controller → firmware update"],
          ["Metering drift", "Readings inconsistent with actual load", "Calibration loss, sensor failure", "Inaccurate capacity data", "Calibrate or replace PDU"],
          ["Overheating", "High temperature alarm, possible trip", "Overloading, poor ventilation", "PDU damage, fire risk", "Reduce load, improve airflow"],
          ["Ground fault", "Earth leakage, MCB trips", "Insulation failure in connected equipment", "Safety hazard", "Identify faulted device, isolate"],
        ]}
      />
      <Callout type="danger" title="Danger — Partial Power Loss Worst Case">
        Branch breaker trip ka worst case: ek dual-corded server jo both PSUs ko same PDU ke same branch pe connect kare. Agar branch trip ho toh server ko lagta hai single point of failure toh PSU-A pe jaao — lekin woh bhi same branch pe hai. Server crash. Isliye dual-corded server ke PSU-A aur PSU-B ko different PDUs pe (A path aur B path) connect karo — aur different branches pe.
      </Callout>

      <h2 id="preventive-maintenance" style={S.h2}>Preventive Maintenance</h2>
      <ComparisonTable
        headers={["Frequency", "Task"]}
        rows={[
          ["Monthly", "Visual inspection — outlet damage, cable pull, display status, alarm log review"],
          ["Quarterly", "Thermal imaging — hotspots at input terminals, internal bus bars; load review vs capacity"],
          ["Half-yearly", "Physical cleaning — dust on vents, display; torque check on input terminals; firmware update check"],
          ["Annually", "Full PDU health check — calibration verify, SNMP connectivity test, breaker operation test (controlled); update asset mapping in DCIM"],
          ["Event-based", "After any breaker trip — root cause analysis before reset; after power outage — review logs for anomalies"],
        ]}
      />
      <Callout type="maintenance" title="Maintenance Tip — Never Skip Thermal Imaging">
        PDU input terminals aur bus bar connections thermal hotspots develop karte hain over time — loose connections, oxidation, aur high-resistance joints se. Yeh hotspots visual inspection se catch nahi hote lekin IR camera se clearly visible hote hain. Annual ya half-yearly thermal imaging PDU fire incidents prevent karta hai.
      </Callout>

      <h2 id="pdu-vs-ipdu" style={S.h2}>PDU vs iPDU</h2>
      <ComparisonTable
        headers={["Parameter", "Basic/Metered PDU", "Intelligent PDU (iPDU)"]}
        rows={[
          ["Monitoring", "Input level only", "Per-outlet: A, W, kWh, PF"],
          ["Remote control", "None", "Per-outlet on/off/reboot"],
          ["Protocols", "SNMP basic (metered)", "SNMP v3, Modbus, MQTT, REST"],
          ["Environmental", "None", "T/H sensor, door, leak"],
          ["DCIM integration", "Limited", "Full — asset mapping, capacity"],
          ["Security", "Basic", "RBAC, audit log, encrypted comms"],
          ["Cost", "Low (₹15,000–50,000)", "High (₹1.5L–5L+)"],
          ["ROI", "Low", "High — remote ops, capacity planning"],
          ["Tier recommendation", "Tier I/II", "Tier III/IV mandatory"],
        ]}
      />
      <p style={S.p}>Tier III aur IV Data Centers ke liye iPDU essentially mandatory hai — not optional. Remote operations, capacity planning accuracy, aur outlet-level visibility bina iPDU ke possible nahi hai at scale.</p>

      <h2 id="pdu-vs-rpp" style={S.h2}>PDU vs RPP</h2>
      <p style={S.p}>RPP (Remote Power Panel) aur PDU dono distribution devices hain — lekin hierarchy mein alag level pe hain.</p>
      <ComparisonTable
        headers={["Parameter", "PDU (Rack Power Distribution)", "RPP (Remote Power Panel)"]}
        rows={[
          ["Location", "Inside server rack", "Data Center floor — standalone unit"],
          ["Input", "Single phase 16-32A", "3-phase 100-400A (large input)"],
          ["Output", "Individual server outlets (C13/C19)", "Multiple circuit breakers → Rack PDUs"],
          ["Feeds", "Servers, switches, storage", "10-20+ rack PDUs"],
          ["Monitoring", "Per-outlet (iPDU)", "Per-circuit breaker"],
          ["Analogy", "Distribution board in a room", "Main electrical panel in a building"],
          ["When used", "Always — every rack needs one", "Large DC with centralized distribution"],
          ["Replaces", "Nothing — always needed", "Long cable runs from UPS to racks"],
        ]}
      />
      <Figure caption="Fig 4 — Rack PDU Dual Distribution: PDU-A (A path, blue) aur PDU-B (B path, red) ek hi rack ke left aur right side pe. Dual-corded servers dono se simultaneously powered hain.">
        <RackPduDistributionDiagram />
      </Figure>

      <h2 id="key-takeaways" style={S.h2}>Key Takeaways</h2>
      <ul style={S.ul}>
        <li><strong>PDU Data Center ka last-mile power distribution device hai</strong> — UPS/STS se individual servers tak organized, protected, aur monitored power delivery.</li>
        <li><strong>5 types hain</strong> — Basic, Metered, Monitored, Switched, Intelligent. Tier III/IV ke liye minimum Monitored, ideally iPDU.</li>
        <li><strong>80% derating rule non-negotiable hai</strong> — 32A PDU ko 25.6A se zyada continuous load nahi dena chahiye.</li>
        <li><strong>Dual-corded servers — PSU-A aur PSU-B alag PDUs pe</strong> — aur alag branches pe. Same branch pe dono connect karna redundancy nullify kar deta hai.</li>
        <li><strong>iPDU per-outlet current, voltage, kWh, power factor, peak load sab track karta hai</strong> — yeh DCIM capacity planning ka foundation hai.</li>
        <li><strong>BMS aur DCIM dono iPDU se data lete hain — alag purposes ke liye</strong> — Facilities team total power dekhti hai, IT team rack-level detail dekhti hai.</li>
        <li><strong>SNMP v3 for IT integration, Modbus TCP for BMS integration</strong> — dono simultaneously configure karo modern iPDU mein.</li>
        <li><strong>Temperature probe at rack inlet mandatory hai Tier III/IV mein</strong> — ASHRAE 27°C limit real-time monitor honi chahiye per rack.</li>
        <li><strong>Thermal imaging annually mandatory hai</strong> — PDU input terminals aur bus connections fire hazard ban sakte hain bina visible damage ke.</li>
        <li><strong>iPDU khareedne se pehle DCIM compatibility verify karo</strong> — MIB file, driver, aur API support jo tumhara existing DCIM platform support kare.</li>
      </ul>
      <p style={S.p}>PDU article padhne ke baad natural next step hai <TopicLink slug="ups" variant="inline" /> aur <TopicLink slug="sts" variant="inline" /> ko poori picture mein samajhna — yeh teeno mila ke Data Center ka complete power distribution chain banate hain.</p>
      <p style={S.p}>Battery backup samajhne ke liye <TopicLink slug="battery-bank" variant="inline" /> article detailed coverage deta hai.</p>
    </>
  );
}
