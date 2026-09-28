"use client";
import { S, Callout, ComparisonTable, Figure } from "../shared";
import TopicLink from "@/components/TopicLink";
import IpduCommunicationDiagram from "../svg/IpduCommunicationDiagram";
import RackPduDistributionDiagram from "../svg/RackPduDistributionDiagram";

export default function OperationsAndClosing() {
  return (
    <>
      <h2 id="remote-monitoring" style={S.h2}>Remote Monitoring</h2>
      <p style={S.p}>The iPDU's killer feature is remote monitoring — seeing real-time rack power status from anywhere, via a browser or management system.</p>
      <p style={S.p}>Practical example: a NOC engineer sitting in Delhi at 2 AM can see the outlet-level power consumption of Rack R-21 in the Mumbai Data Center. No field trip required.</p>
      <Figure caption="Fig 3 — iPDU Communication Architecture: DCIM integration via SNMP (IT team), BMS integration via Modbus (Facilities team), Environmental sensors and Outlet monitoring — all from one iPDU.">
        <IpduCommunicationDiagram />
      </Figure>
      <p style={S.p}>Remote monitoring data serves multiple systems simultaneously — DCIM, BMS, NMS, ticketing systems, capacity planning tools. The iPDU becomes a source of truth for rack-level power.</p>

      <h2 id="bms-integration" style={S.h2}>BMS Integration</h2>
      <p style={S.p}>The BMS (Building Management System) is the facility team's monitoring platform. PDU-to-BMS integration typically happens through Modbus TCP or BACnet.</p>
      <p style={S.p}>What the BMS needs from the PDU:</p>
      <ul style={S.ul}>
        <li>Total power per PDU (kW)</li>
        <li>Input current per phase (Amperes)</li>
        <li>Input voltage</li>
        <li>Over-temperature alarm</li>
        <li>Over-current alarm</li>
        <li>PDU online/offline status</li>
      </ul>
      <p style={S.p}>The BMS aggregates this data across all PDUs — calculates total Data Center power consumption, monitors PUE and generates facility-level alarms.</p>
      <Callout type="best-practice" title="BMS vs DCIM — Different Consumers, Same Data">
        The facilities team uses the BMS: &quot;What is the total power of this Data Center? How is the cooling efficiency? What is the generator load?&quot; The IT/Operations team uses DCIM: &quot;How much headroom is in Rack R-21? Which server is on Outlet 14? What is the average load trend of this rack?&quot; Their questions are different — both are valid — so maintain both systems.
      </Callout>

      <h2 id="dcim-integration" style={S.h2}>DCIM Integration</h2>
      <p style={S.p}>The DCIM (Data Center Infrastructure Management) platform is the primary consumer of the iPDU. In DCIM, all of this becomes visible from iPDU data:</p>
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
      <p style={S.p}>Real example: engineers want to deploy a new GPU server of 3kW in Rack R-21. Check in DCIM: PDU-A current load 18A, PDU-B current load 19A, rated 32A each. Available headroom: PDU-A 7.6A (1.75 kW), PDU-B 6.6A (1.52 kW). The new GPU server requires 3kW — PDU-A headroom is insufficient. Action: circuit upgrade or load redistribution required before deployment.</p>

      <h2 id="snmp-modbus-mqtt" style={S.h2}>SNMP, Modbus & MQTT</h2>
      <p style={S.p}>An iPDU supports three primary communication protocols. Each protocol has a different use case.</p>
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
      <p style={S.p}>SNMP is the most commonly used protocol for iPDU monitoring. The PDU is an SNMP agent — the MIB (Management Information Base) file defines which OIDs (data points) are available. The NMS or DCIM polls these OIDs.</p>
      <p style={S.p}>Use SNMP v3 — with authentication and encryption. SNMP v1/v2c sends data in plain text — a security risk in production environments.</p>
      <h3 style={S.h3}>Modbus — Industrial Protocol</h3>
      <p style={S.p}>Modbus TCP is the standard choice for integration with the BMS. The register map differs per OEM — ask the vendor for the Modbus register document at integration time. Modbus is polling-based — the BMS reads data every minute or every 5 minutes.</p>
      <h3 style={S.h3}>MQTT — Modern Lightweight Protocol</h3>
      <p style={S.p}>MQTT is an emerging protocol for modern infrastructure. The PDU publishes data to a broker — the DCIM or cloud platform subscribes and receives data instantly. Better than SNMP polling for high-frequency monitoring — lower bandwidth, lower latency.</p>

      <h2 id="asset-identification" style={S.h2}>RFID & Asset Identification</h2>
      <p style={S.p}>Advanced iPDUs have per-outlet asset tagging capability. Instead of checking every rack in a physical audit, a digital asset map is maintained.</p>
      <ComparisonTable
        headers={["Method", "How It Works", "Advantage"]}
        rows={[
          ["Manual tagging", "Manually enter the outlet → server mapping in DCIM", "Simple, no extra hardware"],
          ["USB barcode scanner", "Scan the server asset tag directly on the PDU", "Fast, reduces manual errors"],
          ["RFID on cables", "Smart patch cord with RFID chip — PDU auto-detects", "Fully automated, no manual entry"],
          ["QR code per outlet", "Scan the QR with the PDU app", "Mobile-friendly auditing"],
        ]}
      />
      <p style={S.p}>Practical benefit: the maintenance team physically goes to Rack R-21 and opens the DCIM app — they instantly see which server is on Outlet 14, what its power consumption was last month, and which ticket was raised last time. Zero guesswork.</p>

      <h2 id="oem-comparison" style={S.h2}>OEM Comparison</h2>
      <p style={S.p}>There are many established players in the PDU market. Each OEM has its own strength and typical use case.</p>
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
        When selecting an OEM, look at: (1) Existing DCIM platform compatibility — is the PDU's MIB and driver available? (2) India service support — how quickly are replacement parts and on-site support available? (3) Firmware update track record — how regularly do security patches come? (4) Warranty terms — is advance replacement available or is it repair-based? The cheapest PDU is not always the best choice.
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
        The worst case of a branch breaker trip: a dual-corded server that connects both PSUs to the same branch of the same PDU. If the branch trips, the server thinks there is a single point of failure, so it moves to PSU-A — but that is also on the same branch. Server crash. That is why PSU-A and PSU-B of a dual-corded server should be connected to different PDUs (A path and B path) — and on different branches.
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
        PDU input terminals and bus bar connections develop thermal hotspots over time — from loose connections, oxidation and high-resistance joints. These hotspots are not caught by visual inspection but are clearly visible with an IR camera. Annual or half-yearly thermal imaging prevents PDU fire incidents.
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
      <p style={S.p}>For Tier III and IV Data Centers an iPDU is essentially mandatory — not optional. Remote operations, capacity planning accuracy and outlet-level visibility are not possible at scale without an iPDU.</p>

      <h2 id="pdu-vs-rpp" style={S.h2}>PDU vs RPP</h2>
      <p style={S.p}>The RPP (Remote Power Panel) and the PDU are both distribution devices — but they sit at different levels in the hierarchy.</p>
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
      <Figure caption="Fig 4 — Rack PDU Dual Distribution: PDU-A (A path, blue) and PDU-B (B path, red) on the left and right side of the same rack. Dual-corded servers are powered from both simultaneously.">
        <RackPduDistributionDiagram />
      </Figure>

      <h2 id="key-takeaways" style={S.h2}>Key Takeaways</h2>
      <ul style={S.ul}>
        <li><strong>The PDU is the Data Center's last-mile power distribution device</strong> — organized, protected and monitored power delivery from the UPS/STS to individual servers.</li>
        <li><strong>There are 5 types</strong> — Basic, Metered, Monitored, Switched, Intelligent. For Tier III/IV the minimum is Monitored, ideally an iPDU.</li>
        <li><strong>The 80% derating rule is non-negotiable</strong> — a 32A PDU should not be given more than 25.6A of continuous load.</li>
        <li><strong>Dual-corded servers — PSU-A and PSU-B on separate PDUs</strong> — and on separate branches. Connecting both on the same branch nullifies redundancy.</li>
        <li><strong>An iPDU tracks per-outlet current, voltage, kWh, power factor and peak load</strong> — this is the foundation of DCIM capacity planning.</li>
        <li><strong>BMS and DCIM both take data from the iPDU — for different purposes</strong> — the Facilities team looks at total power, the IT team looks at rack-level detail.</li>
        <li><strong>SNMP v3 for IT integration, Modbus TCP for BMS integration</strong> — configure both simultaneously in a modern iPDU.</li>
        <li><strong>A temperature probe at the rack inlet is mandatory in Tier III/IV</strong> — the ASHRAE 27°C limit should be monitored in real time per rack.</li>
        <li><strong>Thermal imaging annually is mandatory</strong> — PDU input terminals and bus connections can become a fire hazard without visible damage.</li>
        <li><strong>Verify DCIM compatibility before buying an iPDU</strong> — MIB file, driver and API support that your existing DCIM platform supports.</li>
      </ul>
      <p style={S.p}>After reading the PDU article, the natural next step is to understand the <TopicLink slug="ups" variant="inline" /> and <TopicLink slug="sts" variant="inline" /> in the full picture — together these three form the Data Center's complete power distribution chain.</p>
      <p style={S.p}>To understand battery backup, the <TopicLink slug="battery-bank" variant="inline" /> article gives detailed coverage.</p>
    </>
  );
}
