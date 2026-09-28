"use client";
import { S, Callout, ComparisonTable, Figure } from "../shared";
import TopicLink from "@/components/TopicLink";
import DcPowerFlowDiagram from "../svg/DcPowerFlowDiagram";
import PduInternalDiagram from "../svg/PduInternalDiagram";
import RackPduDistributionDiagram from "../svg/RackPduDistributionDiagram";

export default function Foundation() {
  return (
    <>
      <h2 id="what-is-pdu" style={S.h2}>What is a PDU?</h2>
      <p style={S.p}>PDU means Power Distribution Unit. In simple words — it is the device that takes the power coming from the UPS or STS and distributes it to individual servers, switches and storage devices.</p>
      <p style={S.p}>Imagine a building has a main electrical panel from which every room gets power. In a Data Center, the PDU does that job — but only for servers, and with much more precision.</p>
      <p style={S.p}>A simple PDU is just a board of outlets. An <strong>Intelligent PDU (iPDU)</strong> is a complete network device in which every outlet's current, voltage, power, temperature and humidity are all monitored in real time — and it can also be controlled remotely.</p>
      <Callout type="important" title="PDU ≠ Power Strip">
        A home or office power strip and a Data Center PDU are completely different. A PDU has certified circuit breakers, industrial-grade connectors (IEC C13/C19), phase balancing, optional metering, and a guarantee of 24/7 continuous operation. Never use a power strip in a Data Center.
      </Callout>

      <h2 id="why-pdu-required" style={S.h2}>Why PDU is Required</h2>
      <p style={S.p}>A UPS gives a large AC output — typically 3-phase 415V or single-phase 230V. But individual servers need 230V single-phase, and one server consumes only 1-3 Amperes at a time.</p>
      <p style={S.p}>Connecting all servers directly to the UPS is not possible — cable management nightmare, no protection, no visibility. The PDU solves this problem: it takes one input and provides 20-40 individual outlets with proper circuit protection.</p>
      <ComparisonTable
        headers={["Without a PDU", "With a PDU"]}
        rows={[
          ["Run cables directly from the UPS — everything on one circuit", "Organized per-rack distribution — independent circuits"],
          ["One fault = everyone loses power", "Branch circuit breaker trips only the affected circuit"],
          ["No visibility of how much load there is", "Per-outlet or per-phase metering available"],
          ["Cable management impossible", "Clean vertical or horizontal installation in the rack"],
          ["No remote management", "Centralized monitoring via SNMP/Modbus"],
        ]}
      />

      <h2 id="power-flow-architecture" style={S.h2}>Complete Data Center Power Flow</h2>
      <p style={S.p}>To understand the PDU, first it is essential to understand the whole power flow. From the grid to the server, this is the sequence:</p>
      <Figure caption="Fig 1 — Complete Data Center Power Flow: Grid → Transformer → UPS → STS → PDU → Rack PDU → Server. PDU and Rack PDU are highlighted — this article is about them.">
        <DcPowerFlowDiagram />
      </Figure>
      <p style={S.p}>The output of the <TopicLink slug="ups" variant="inline" /> passes through the <TopicLink slug="sts" variant="inline" /> and reaches the Floor-level PDU (or Main PDU). Multiple Rack PDUs are fed from the Floor PDU. The Rack PDU is connected directly to the servers' PSU cables.</p>
      <Callout type="best-practice" title="Floor PDU vs Rack PDU">
        Large Data Centers have two levels: (1) <strong>Floor PDU / RPP</strong> — receives the UPS/STS output, feeds multiple rack PDUs, typically 3-phase 63A-250A. (2) <strong>Rack PDU</strong> — inside a rack, feeds individual equipment, typically single-phase 16A-32A. In small setups the floor PDU is skipped and the UPS feeds the rack PDU directly.
      </Callout>

      <h2 id="pdu-types-overview" style={S.h2}>Types of PDU</h2>
      <p style={S.p}>The PDU market has 5 levels — from basic to intelligent. Each level adds more features, and the cost also increases. The right choice depends on project requirements.</p>
      <ComparisonTable
        headers={["Type", "What It Does", "Monitoring", "Remote Control", "Best For"]}
        rows={[
          ["Basic PDU", "Distributes power, nothing else", "None", "None", "Small setups, low budget"],
          ["Metered PDU", "Measures input current/voltage", "Input level only", "None", "When load visibility is needed"],
          ["Monitored PDU", "Per-outlet current monitoring", "Per-outlet", "None", "Detailed load tracking"],
          ["Switched PDU", "Remote outlet on/off", "Basic", "Per-outlet switching", "Remote reboot needed"],
          ["Intelligent PDU (iPDU)", "Full monitoring + switching + sensors + protocols", "Complete", "Full", "Enterprise Data Center"],
        ]}
      />

      <h3 id="basic-pdu" style={S.h3}>Basic PDU</h3>
      <p style={S.p}>This is the simplest form — one input (typically IEC C20 or hardwire) and multiple outlets (IEC C13/C19). No display, no metering, no network port.</p>
      <p style={S.p}>When to use: small server rooms where the budget is tight and load monitoring is not needed. Acceptable in Tier I/II installations. In Tier III/IV, a metered PDU is the recommended minimum.</p>

      <h3 id="metered-pdu" style={S.h3}>Metered PDU</h3>
      <p style={S.p}>A metered PDU has a display of input current, voltage, power (kW), energy (kWh) and power factor — usually an LED display or a small LCD. Some models also support SNMP.</p>
      <p style={S.p}>Advantage: if an operator walks by manually, they can check the load immediately. Disadvantage: metering is only at the input level — individual outlet load is not known.</p>

      <h3 id="monitored-pdu" style={S.h3}>Monitored PDU</h3>
      <p style={S.p}>A monitored PDU provides per-outlet current measurement — every C13/C19 outlet has an individual current sensor. This data is readable remotely over the network.</p>
      <p style={S.p}>This means: from DCIM or the NMS you can see exactly how much load is on which outlet. It is very useful for server hardware changes and capacity planning.</p>

      <h3 id="switched-pdu" style={S.h3}>Switched PDU</h3>
      <p style={S.p}>In a switched PDU every outlet can be switched on/off remotely — via the web interface, SNMP or CLI. A server is hung and the network is not responding? A remote power cycle is possible without physically going to the rack.</p>
      <p style={S.p}>A real Data Center use case of a switched PDU: a remote server reboot from the NOC at 3 AM, without dispatching a field engineer. It saves both time and cost.</p>
      <Callout type="warning" title="Warning — Outlet Switching Caution">
        In a switched PDU, an accidental outlet-off can take a production server down. Always configure role-based access control — only authorized personnel should have outlet switching permission. An audit log is mandatory so it can be tracked who turned off which outlet and when.
      </Callout>

      <h3 id="intelligent-pdu" style={S.h3}>Intelligent PDU (iPDU)</h3>
      <p style={S.p}>The iPDU is the most advanced form of PDU. It is essentially a network device with power distribution built in. Features:</p>
      <ul style={S.ul}>
        <li>Per-outlet metering: current, voltage, power, energy, power factor</li>
        <li>Per-outlet remote switching (on/off/reboot sequence)</li>
        <li>Environmental sensors: temperature, humidity at rack level</li>
        <li>Multiple protocols: SNMP v3, Modbus TCP/RTU, MQTT, REST API</li>
        <li>DCIM integration: asset mapping, capacity planning data</li>
        <li>Dual network ports (some models): redundant management connectivity</li>
        <li>RBAC (Role-Based Access Control): granular permission management</li>
        <li>Historical data logging: trend analysis, peak load tracking</li>
        <li>Alarm management: email, SNMP trap, syslog notifications</li>
      </ul>
      <p style={S.p}>Example: Vertiv Geist iPDU, Rack R-21. Every outlet individually monitored. Temperature probe at front door. Connected to management LAN. DCIM dashboard shows real-time kW per outlet, total rack power, inlet temperature, and historical load trend.</p>

      <h2 id="internal-construction" style={S.h2}>Internal Construction</h2>
      <p style={S.p}>Knowing what is inside a PDU is important — for fault diagnosis and maintenance. Structural breakdown:</p>
      <Figure caption="Fig 2 — PDU Internal Block Diagram: Input section, Bus Bar + Circuit Breakers, Controller (iPDU only), and Outlet section. The Controller is absent in a Basic PDU.">
        <PduInternalDiagram />
      </Figure>
      <ComparisonTable
        headers={["Component", "Function", "Basic PDU", "iPDU"]}
        rows={[
          ["Input connector", "IEC C20 or hardwire terminal", "✓", "✓"],
          ["Main input breaker", "Complete PDU protection", "✓", "✓"],
          ["Input CT/PT sensors", "V, A, W, kWh measurement", "Optional", "✓"],
          ["SPD (Surge Protection)", "Transient voltage protection", "Optional", "✓"],
          ["Bus bar", "L1/L2/L3/N/PE distribution", "✓", "✓"],
          ["Branch circuit breakers", "Per-circuit protection (10A/16A)", "✓", "✓"],
          ["Per-outlet CT sensors", "Individual outlet current", "✗", "✓"],
          ["Relay/solid-state switch", "Remote outlet control", "✗", "✓"],
          ["Microcontroller/SoC", "Data processing + logic", "✗", "✓"],
          ["Network interface", "RJ45, dual NIC option", "✗", "✓"],
          ["Environmental sensor port", "T/H probe connection", "✗", "✓"],
          ["Display", "LCD/LED indicators", "Optional", "✓"],
        ]}
      />

      <h2 id="connectors-standards" style={S.h2}>Input & Output Connectors — IEC Standards</h2>
      <p style={S.p}>Data Center PDUs use IEC 60320 standard connectors. These are standardized worldwide — which is why a server from any country connects with the same cable.</p>
      <ComparisonTable
        headers={["Connector", "Type", "Rating", "Common Use"]}
        rows={[
          ["IEC C13 (socket)", "Standard server outlet", "10A, 250V", "1U/2U servers, network equipment, KVMs"],
          ["IEC C14 (plug)", "Mating plug for C13 socket", "10A, 250V", "Server PSU cable end"],
          ["IEC C19 (socket)", "High-power outlet", "16A/20A, 250V", "High-density servers, storage arrays, blade chassis"],
          ["IEC C20 (plug)", "Mating plug for C19 socket", "16A/20A, 250V", "High-power device PSU cable"],
          ["Hardwire (terminal block)", "Direct cable connection", "Per design", "Floor PDU input, permanent installation"],
          ["Type B (India/US)", "NEMA 5-15/5-20 style", "15A/20A", "Older installations — avoid in new DC design"],
        ]}
      />
      <Callout type="important" title="C13 vs C19 — Load Planning Impact">
        C13 outlets are typically limited to 10A per outlet. C19 outlets allow 16-20A. High-density servers (GPU servers, storage arrays, blade chassis) require C19 — if you use C13, the breaker will trip or the cable will overheat. When ordering a PDU, review the expected devices per rack and select the C13/C19 ratio accordingly.
      </Callout>

      <h2 id="single-phase-three-phase" style={S.h2}>Single Phase vs Three Phase</h2>
      <p style={S.p}>PDUs come in both configurations. The right choice depends on rack density and available supply.</p>
      <ComparisonTable
        headers={["Parameter", "Single Phase PDU", "Three Phase PDU"]}
        rows={[
          ["Input supply", "230V single phase + N + PE", "415V 3-phase + N + PE (India)"],
          ["Typical input current", "16A, 32A", "16A, 32A, 63A per phase"],
          ["Max power per PDU", "~7.4 kW (32A × 230V)", "~27 kW (63A × 415V × 1.73 × 0.8 PF)"],
          ["Phase balancing needed?", "No — single phase", "Yes — balance L1/L2/L3"],
          ["Typical rack power", "Up to 10 kW", "10–30+ kW (high density)"],
          ["Complexity", "Simple", "Requires phase planning"],
          ["Best for", "Standard racks, small DC", "High-density racks, large DC"],
        ]}
      />
      <Callout type="best-practice" title="Three Phase — 80% Rule">
        In a three phase PDU, the per-phase load should not exceed 80% of rated current for continuous operation. 32A rated phase = max 25.6A continuous. Monitor phase imbalance — more than 10% imbalance increases neutral current and creates a risk of cable heating.
      </Callout>

      <h2 id="rack-pdu-vs-floor-pdu" style={S.h2}>Rack PDU vs Floor PDU</h2>
      <ComparisonTable
        headers={["Parameter", "Rack PDU", "Floor PDU / RPP"]}
        rows={[
          ["Location", "Inside server rack", "On data center floor, near racks"],
          ["Input power", "Single phase 16-32A typically", "3-phase 63-250A typically"],
          ["Output", "20-42 outlets (C13/C19)", "Multiple circuits to rack PDUs"],
          ["What it feeds", "Individual servers, switches", "Multiple rack PDUs"],
          ["Form factor", "Vertical (0U) or Horizontal (1-2U)", "Floor-standing cabinet"],
          ["Monitoring", "Per-outlet (iPDU)", "Per-circuit"],
          ["Example", "APC AP7900, Vertiv MPDU", "APC InfraStruXure PDU, Legrand RPP"],
        ]}
      />

      <h2 id="horizontal-vs-vertical" style={S.h2}>Horizontal vs Vertical Rack PDU</h2>
      <p style={S.p}>The physical form factor of a rack PDU matters — especially for space and cable management.</p>
      <ComparisonTable
        headers={["Aspect", "Horizontal PDU (1U/2U)", "Vertical PDU (0U)"]}
        rows={[
          ["Rack space used", "1U or 2U rack space", "Zero rack units — side mount"],
          ["Outlet count", "Typically 8-16 outlets", "Typically 16-42 outlets"],
          ["Cable management", "Front-to-back cable management", "Vertical — cables drop naturally"],
          ["Preferred for", "Short racks, low density", "Standard 42U racks, high density"],
          ["Accessibility", "Easy front access", "Requires side access or rear door open"],
          ["Most common in DC?", "Older installs, small setups", "Yes — standard choice today"],
        ]}
      />
      <p style={S.p}>In modern Data Centers the vertical 0U PDU is the standard choice — zero rack space wasted, better cable management and more outlets in the same footprint.</p>

      <h2 id="power-capacity" style={S.h2}>Power Capacity & Load Planning</h2>
      <p style={S.p}>There is one important rule in PDU capacity planning: <strong>apply 80% derating for design</strong>. Do not give a 32A input PDU more than 25.6A of continuous load.</p>
      <ComparisonTable
        headers={["PDU Rating", "Max Continuous Load (80%)", "Approx kW (230V, PF 0.9)"]}
        rows={[
          ["16A single phase", "12.8A", "~2.6 kW"],
          ["32A single phase", "25.6A", "~5.3 kW"],
          ["16A × 3-phase", "12.8A per phase", "~8.0 kW total"],
          ["32A × 3-phase", "25.6A per phase", "~15.9 kW total"],
          ["63A × 3-phase", "50.4A per phase", "~31.3 kW total"],
        ]}
      />
      <Callout type="important" title="80% Rule — Why?">
        NEC (National Electrical Code) and good engineering practice: continuous loads (24/7 operation) should not exceed 80% of circuit capacity. Reason: cable heating at sustained high current — insulation degradation, potential fire risk, nuisance breaker trips at peaks. Everything in a Data Center is continuous load — the 80% rule is non-negotiable.
      </Callout>

      <h2 id="circuit-breakers" style={S.h2}>Circuit Breakers in PDU</h2>
      <p style={S.p}>Circuit breakers in a PDU are at two levels:</p>
      <ul style={S.ul}>
        <li><strong>Main input breaker:</strong> Protects the whole PDU — trips on an input feeder fault or a PDU internal fault. Trip = the whole PDU loses power.</li>
        <li><strong>Branch circuit breakers:</strong> Protect each circuit/branch — typically 10A or 16A per branch. Trip = only that branch loses power; the other outlets continue.</li>
      </ul>
      <ComparisonTable
        headers={["Breaker Type", "Rating", "Protects", "Trip Impact"]}
        rows={[
          ["Main input", "32A/63A/125A (per design)", "Entire PDU", "Full PDU power loss"],
          ["Branch circuit", "10A, 16A, 20A", "2-4 outlets per branch", "Branch only — partial PDU"],
          ["Per-outlet (rare)", "10A individual", "Single outlet", "Single outlet only"],
        ]}
      />
      <Callout type="best-practice" title="Branch Breaker Reset — On-Site Only">
        Branch circuit breakers have to be reset physically — it cannot be done remotely (except in a switched PDU that has electronic circuit protection). That is why a field engineer has to be dispatched in case of a breaker trip. Investigate the trip cause before resetting the breaker — do not simply reset it without fixing the overcurrent condition.
      </Callout>

      <h2 id="metering" style={S.h2}>Metering — What Gets Measured</h2>
      <p style={S.p}>Understanding what PDU metering measures and why — this is essential for capacity planning.</p>
      <ComparisonTable
        headers={["Parameter", "Unit", "What It Tells You", "Available In"]}
        rows={[
          ["Current (A)", "Amperes", "Actual load on circuit/outlet", "Metered, Monitored, iPDU"],
          ["Voltage (V)", "Volts", "Supply quality — sag/surge detect", "Metered+"],
          ["Active Power (W/kW)", "Watts", "Actual power consumed", "Metered+"],
          ["Energy (kWh)", "Kilowatt-hours", "Billing, PUE calculation", "Metered+"],
          ["Power Factor", "0-1", "Load efficiency, reactive power", "Metered+"],
          ["Apparent Power (VA)", "Volt-Amperes", "UPS/PDU sizing reference", "Metered+"],
          ["Peak current", "Amperes (logged)", "Startup surge — capacity headroom", "iPDU"],
          ["Per-outlet current", "Amperes per outlet", "Individual device load", "Monitored/iPDU"],
          ["Phase balance", "% imbalance", "Neutral current risk", "3-phase iPDU"],
        ]}
      />

      <h2 id="sensors" style={S.h2}>Sensors</h2>
      <p style={S.p}>External sensors can be connected to an iPDU — to monitor the rack's physical environment.</p>
      <ComparisonTable
        headers={["Sensor Type", "Measures", "Typical Placement", "Alert Threshold"]}
        rows={[
          ["Temperature probe", "Air temperature (°C)", "Rack front door intake", "> 27°C (ASHRAE A2 limit)"],
          ["Humidity sensor", "Relative humidity (%RH)", "Same as temp probe", "< 20% or > 80% RH"],
          ["Combo T/H probe", "Both temperature + humidity", "Rack inlet/outlet", "Both above thresholds"],
          ["Dry contact input", "External relay/alarm signal", "Door sensor, smoke, water", "Any contact change"],
          ["Water/leak detector", "Liquid presence", "Under floor tiles, near cooling", "Any detection = critical"],
          ["Door switch", "Rack door open/close", "Rack front/rear door", "Unauthorized open"],
        ]}
      />

      <h2 id="environmental-monitoring" style={S.h2}>Environmental Monitoring</h2>
      <p style={S.p}>According to the ASHRAE standard, server inlet temperature should stay below 80.6°F (27°C) for IT equipment reliability. The iPDU's temperature probe measures this directly — at the rack level, in real time.</p>
      <p style={S.p}>Practical benefit: the iPDU triggers a temperature alarm even before a cooling system failure. The operations team can fix the cooling before server hardware is damaged.</p>
      <Callout type="important" title="Rack Inlet vs Rack Outlet Temperature">
        Ideally the temperature probe goes on the front door of the rack — this is the inlet air temperature. The outlet temperature (hot exhaust) will always be higher. In DCIM, the thermal map is built from the inlet temperature — hotspots are identified. The outlet temperature is only useful for calculating the rack-level delta (ΔT), not for compliance monitoring.
      </Callout>
    </>
  );
}
