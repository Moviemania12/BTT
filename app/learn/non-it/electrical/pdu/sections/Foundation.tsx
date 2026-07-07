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
      <p style={S.p}>PDU matlab Power Distribution Unit. Simple words mein — yeh woh device hai jo UPS ya STS se aane wala power leti hai aur individual servers, switches, aur storage devices tak distribute karti hai.</p>
      <p style={S.p}>Socho ek building mein main electrical panel hota hai jahan se har room ko power milta hai. Data Center mein woh kaam PDU karta hai — lekin sirf servers ke liye, aur bahut zyada precision ke saath.</p>
      <p style={S.p}>Simple PDU sirf outlets ka board hoti hai. <strong>Intelligent PDU (iPDU)</strong> ek complete network device hoti hai jisme har outlet ka current, voltage, power, temperature, aur humidity sab real-time monitor hota hai — aur remotely control bhi kiya ja sakta hai.</p>
      <Callout type="important" title="PDU ≠ Power Strip">
        Ghar ya office ka power strip aur Data Center PDU bilkul alag hain. PDU ke paas certified circuit breakers, industrial-grade connectors (IEC C13/C19), phase balancing, optional metering, aur 24/7 continuous operation ki guarantee hoti hai. Power strip kabhi Data Center mein use mat karo.
      </Callout>

      <h2 id="why-pdu-required" style={S.h2}>Why PDU is Required</h2>
      <p style={S.p}>UPS ek large AC output deta hai — typically 3-phase 415V ya single-phase 230V. Lekin individual servers ko 230V single-phase chahiye hoti hai, aur ek time pe ek server sirf 1-3 Amperes consume karta hai.</p>
      <p style={S.p}>Directly UPS se sab servers connect karna possible nahi — cable management nightmare, no protection, no visibility. PDU yeh problem solve karta hai: ek input leti hai, aur 20-40 individual outlets provide karti hai with proper circuit protection.</p>
      <ComparisonTable
        headers={["PDU Ke Bina", "PDU Ke Saath"]}
        rows={[
          ["UPS se directly cables run karo — sab ek circuit pe", "Organized per-rack distribution — independent circuits"],
          ["Ek fault = sabka power gaya", "Branch circuit breaker sirf affected circuit trip karta hai"],
          ["Koi visibility nahi ki kitna load hai", "Per-outlet ya per-phase metering available"],
          ["Cable management impossible", "Rack mein vertical ya horizontal clean installation"],
          ["No remote management", "SNMP/Modbus se centralized monitoring"],
        ]}
      />

      <h2 id="power-flow-architecture" style={S.h2}>Complete Data Center Power Flow</h2>
      <p style={S.p}>PDU samajhne ke liye pehle poora power flow samajhna zaroori hai. Grid se server tak yeh sequence hoti hai:</p>
      <Figure caption="Fig 1 — Complete Data Center Power Flow: Grid → Transformer → UPS → STS → PDU → Rack PDU → Server. PDU aur Rack PDU highlighted hain — yeh article inhi ke baare mein hai.">
        <DcPowerFlowDiagram />
      </Figure>
      <p style={S.p}><TopicLink slug="ups" variant="inline" /> ka output <TopicLink slug="sts" variant="inline" /> se hota hua Floor-level PDU (ya Main PDU) pe aata hai. Floor PDU se multiple Rack PDUs feed hoti hain. Rack PDU directly servers ke PSU cables se connected hoti hai.</p>
      <Callout type="best-practice" title="Floor PDU vs Rack PDU">
        Bade Data Centers mein do levels hote hain: (1) <strong>Floor PDU / RPP</strong> — UPS/STS output receive karta hai, multiple rack PDUs feed karta hai, typically 3-phase 63A-250A. (2) <strong>Rack PDU</strong> — ek rack ke andar, individual equipment feed karta hai, typically single-phase 16A-32A. Chote setups mein floor PDU skip hoti hai aur UPS directly rack PDU feed karta hai.
      </Callout>

      <h2 id="pdu-types-overview" style={S.h2}>Types of PDU</h2>
      <p style={S.p}>PDU market mein 5 levels hain — basic se intelligent tak. Har level zyada features add karta hai, aur cost bhi badhti hai. Right choice project requirements pe depend karti hai.</p>
      <ComparisonTable
        headers={["Type", "What It Does", "Monitoring", "Remote Control", "Best For"]}
        rows={[
          ["Basic PDU", "Power distribute karta hai, kuch nahi", "None", "None", "Small setups, low budget"],
          ["Metered PDU", "Input current/voltage measure karta hai", "Input level only", "None", "Load visibility chahiye"],
          ["Monitored PDU", "Per-outlet current monitoring", "Per-outlet", "None", "Detailed load tracking"],
          ["Switched PDU", "Remote outlet on/off", "Basic", "Per-outlet switching", "Remote reboot needed"],
          ["Intelligent PDU (iPDU)", "Full monitoring + switching + sensors + protocols", "Complete", "Full", "Enterprise Data Center"],
        ]}
      />

      <h3 id="basic-pdu" style={S.h3}>Basic PDU</h3>
      <p style={S.p}>Yeh simplest form hai — ek input (typically IEC C20 ya hardwire) aur multiple outlets (IEC C13/C19). Koi display nahi, koi metering nahi, koi network port nahi.</p>
      <p style={S.p}>Use kab karein: small server rooms jahan budget tight ho aur load monitoring ki zaroorat nahi. Tier I/II installations mein acceptable hai. Tier III/IV mein minimum metered PDU recommended hai.</p>

      <h3 id="metered-pdu" style={S.h3}>Metered PDU</h3>
      <p style={S.p}>Metered PDU mein input current, voltage, power (kW), energy (kWh), aur power factor ka display hota hai — usually LED display ya small LCD. Some models SNMP bhi support karte hain.</p>
      <p style={S.p}>Advantage: operator manually walk kare toh turant load check kar sakta hai. Disadvantage: sirf input level metering hoti hai — individual outlet load nahi pata chalta.</p>

      <h3 id="monitored-pdu" style={S.h3}>Monitored PDU</h3>
      <p style={S.p}>Monitored PDU per-outlet current measurement provide karta hai — har C13/C19 outlet ka individual current sensor hota hai. Yeh data network se remotely readable hota hai.</p>
      <p style={S.p}>Iska matlab: DCIM ya NMS se dekh sakte ho ki exactly kaunse outlet pe kitna load hai. Server hardware changes aur capacity planning mein bahut useful hota hai.</p>

      <h3 id="switched-pdu" style={S.h3}>Switched PDU</h3>
      <p style={S.p}>Switched PDU mein har outlet remotely on/off kiya ja sakta hai — web interface, SNMP, ya CLI se. Server hung ho gaya aur network respond nahi kar raha? Remote power cycle possible hai bina physically rack ke paas jaaye.</p>
      <p style={S.p}>Switched PDU ka real Data Center use case: NOC se remote server reboot at 3 AM, bina field engineer dispatch kiye. Time aur cost dono bachta hai.</p>
      <Callout type="warning" title="Warning — Outlet Switching Caution">
        Switched PDU mein accidental outlet-off ek production server down kar sakta hai. Always role-based access control configure karo — only authorized personnel ko outlet switching permission honi chahiye. Audit log mandatory hai jisse track ho sake ki kisne kab kaunsa outlet off kiya.
      </Callout>

      <h3 id="intelligent-pdu" style={S.h3}>Intelligent PDU (iPDU)</h3>
      <p style={S.p}>iPDU PDU ka most advanced form hai. Yeh essentially ek network device hai jisme power distribution bhi built-in hoti hai. Features:</p>
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
      <p style={S.p}>PDU ke andar kya hota hai yeh jaanna important hai — fault diagnosis aur maintenance ke liye. Structural breakdown:</p>
      <Figure caption="Fig 2 — PDU Internal Block Diagram: Input section, Bus Bar + Circuit Breakers, Controller (iPDU only), and Outlet section. Basic PDU mein Controller absent hota hai.">
        <PduInternalDiagram />
      </Figure>
      <ComparisonTable
        headers={["Component", "Function", "Basic PDU", "iPDU"]}
        rows={[
          ["Input connector", "IEC C20 ya hardwire terminal", "✓", "✓"],
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
      <p style={S.p}>Data Center PDU IEC 60320 standard connectors use karti hai. Yeh worldwide standardized hain — isliye kisi bhi country ka server same cable se connect ho jaata hai.</p>
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
        C13 outlets typically limit 10A per outlet. C19 outlets allow 16-20A. High-density servers (GPU servers, storage arrays, blade chassis) require C19 — agar C13 laga do toh breaker trip hoga ya cable overheat hoga. PDU order karte waqt per-rack expected devices ka review karo aur C13/C19 ratio accordingly select karo.
      </Callout>

      <h2 id="single-phase-three-phase" style={S.h2}>Single Phase vs Three Phase</h2>
      <p style={S.p}>PDU dono configurations mein aate hain. Right choice rack density aur available supply pe depend karti hai.</p>
      <ComparisonTable
        headers={["Parameter", "Single Phase PDU", "Three Phase PDU"]}
        rows={[
          ["Input supply", "230V single phase + N + PE", "415V 3-phase + N + PE (India)"],
          ["Typical input current", "16A, 32A", "16A, 32A, 63A per phase"],
          ["Max power per PDU", "~7.4 kW (32A × 230V)", "~27 kW (63A × 415V × 1.73 × 0.8 PF)"],
          ["Phase balancing needed?", "No — single phase", "Yes — L1/L2/L3 balanced karo"],
          ["Typical rack power", "Up to 10 kW", "10–30+ kW (high density)"],
          ["Complexity", "Simple", "Requires phase planning"],
          ["Best for", "Standard racks, small DC", "High-density racks, large DC"],
        ]}
      />
      <Callout type="best-practice" title="Three Phase — 80% Rule">
        Three phase PDU mein per-phase load 80% rated current se zyada nahi honi chahiye continuous operation ke liye. 32A rated phase = max 25.6A continuous. Phase imbalance monitor karo — 10% se zyada imbalance neutral current badhaata hai aur cable heating ka risk create karta hai.
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
      <p style={S.p}>Rack PDU ka physical form factor matter karta hai — especially space aur cable management ke liye.</p>
      <ComparisonTable
        headers={["Aspect", "Horizontal PDU (1U/2U)", "Vertical PDU (0U)"]}
        rows={[
          ["Rack space used", "1U ya 2U rack space", "Zero rack units — side mount"],
          ["Outlet count", "Typically 8-16 outlets", "Typically 16-42 outlets"],
          ["Cable management", "Front-to-back cable management", "Vertical — cables drop naturally"],
          ["Preferred for", "Short racks, low density", "Standard 42U racks, high density"],
          ["Accessibility", "Easy front access", "Requires side access or rear door open"],
          ["Most common in DC?", "Older installs, small setups", "Yes — standard choice today"],
        ]}
      />
      <p style={S.p}>Modern Data Centers mein vertical 0U PDU standard choice hai — zero rack space waste, better cable management, aur more outlets in same footprint.</p>

      <h2 id="power-capacity" style={S.h2}>Power Capacity & Load Planning</h2>
      <p style={S.p}>PDU capacity planning mein ek important rule hai: <strong>design ke liye 80% derating apply karo</strong>. 32A input PDU ko 25.6A se zyada continuous load mat do.</p>
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
      <Callout type="important" title="80% Rule — Yeh Kyun?">
        NEC (National Electrical Code) aur good engineering practice: continuous loads (24/7 operation) circuit capacity ke 80% se zyada nahi honi chahiye. Reason: cable heating at sustained high current — insulation degradation, potential fire risk, nuisance breaker trips at peaks. Data Center sab continuous load hai — 80% rule non-negotiable hai.
      </Callout>

      <h2 id="circuit-breakers" style={S.h2}>Circuit Breakers in PDU</h2>
      <p style={S.p}>PDU mein circuit breakers do levels pe hote hain:</p>
      <ul style={S.ul}>
        <li><strong>Main input breaker:</strong> Poori PDU protect karta hai — input feeder fault ya PDU internal fault pe trip karta hai. Trip = poori PDU power lose karti hai.</li>
        <li><strong>Branch circuit breakers:</strong> Har circuit/branch protect karta hai — typically 10A ya 16A per branch. Trip = sirf woh branch lose power karta hai, baaki outlets continue karte hain.</li>
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
        Branch circuit breakers physically reset karne padte hain — remotely nahi kiya ja sakta (except switched PDU mein jisme electronic circuit protection hoti hai). Isliye field engineer dispatch karna padta hai breaker trip ke case mein. Breaker reset se pehle trip cause investigate karo — simply reset mat karo overcurrent condition fix kiye bina.
      </Callout>

      <h2 id="metering" style={S.h2}>Metering — What Gets Measured</h2>
      <p style={S.p}>PDU metering kya measure karta hai aur kyun — yeh samajhna capacity planning ke liye essential hai.</p>
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
      <p style={S.p}>iPDU mein external sensors connect ki ja sakti hain — rack ke physical environment monitor karne ke liye.</p>
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
      <p style={S.p}>ASHRAE standard ke according server inlet temperature 80.6°F (27°C) se neeche rehni chahiye for IT equipment reliability. iPDU ka temperature probe yeh directly measure karta hai — rack level pe, real time mein.</p>
      <p style={S.p}>Practical benefit: cooling system failure se pehle hi iPDU temperature alarm trigger karta hai. Operations team cooling fix kar sakti hai server hardware damage se pehle.</p>
      <Callout type="important" title="Rack Inlet vs Rack Outlet Temperature">
        Temperature probe ideally rack ke front door pe — yeh inlet air temperature hai. Outlet temperature (hot exhaust) always higher hogi. DCIM mein inlet temperature se thermal map banta hai — hotspots identify hote hain. Outlet temperature sirf rack-level delta (ΔT) calculate karne ke kaam aati hai, not for compliance monitoring.
      </Callout>
    </>
  );
}
