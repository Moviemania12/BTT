"use client";

import { S, Callout, ComparisonTable, Figure } from "../shared";
import TopicLink from "@/components/TopicLink";
import BmsTroubleshootingLayers from "../svg/BmsTroubleshootingLayers";
import { faqs } from "../metadata";

export default function TroubleshootingAndClosing() {
  return (
    <>
      {/* ═══════════════════════════════════════════════════════════════
          SECTION 18 — COMMISSIONING
      ═══════════════════════════════════════════════════════════════ */}
      <h2 id="commissioning" style={S.h2}>BMS Commissioning and Documentation</h2>

      <h3 style={S.h3}>Factory Acceptance Test (FAT) vs Site Acceptance Test (SAT)</h3>
      <p style={S.p}>
        FAT vendor ke facility pe hota hai before delivery — software configuration, graphics, point
        list, alarm configuration verify karo simulated inputs ke against. SAT site pe hota hai after
        installation — actual equipment se integration test karo, sab points live data se verify karo.
        FAT problems identify karta hai early — cheaper to fix before site delivery. SAT final
        commissioning evidence provide karta hai.
      </p>

      <h3 style={S.h3}>Points List and Point Schedule</h3>
      <p style={S.p}>
        Points list ek comprehensive table hai jo sab BMS points document karta hai — tag name, description,
        equipment ID, protocol, device address, register/object, data type, scaling, engineering unit,
        alarm limits, trend configuration. Ye document as-built state capture karta hai aur future
        maintenance ke liye essential hai. Ek undocumented BMS ek liability hai — ek engineer ke
        leave hone ke baad nobody knows how it works.
      </p>

      <h3 style={S.h3}>Loop Diagrams and Network Drawings</h3>
      <p style={S.p}>
        Loop diagrams sensor-to-controller wiring show karte hain — terminal numbers, cable types,
        conduit routes. Network drawings BMS network topology show karte hain — switches, servers,
        controllers, VLANs, IP addresses. As-built versions — after installation actual changes
        reflect karo — field redlines finalize karo. These drawings field team ko future changes aur
        troubleshooting mein guide karte hain.
      </p>

      {/* ═══════════════════════════════════════════════════════════════
          SECTION 19 — PREVENTIVE MAINTENANCE
      ═══════════════════════════════════════════════════════════════ */}
      <h2 id="preventive-maintenance" style={S.h2}>Preventive Maintenance</h2>

      <p style={S.p}>
        Neeche ek example maintenance schedule hai — actual frequency OEM recommendations, site
        conditions, contract requirements aur criticality ke hisaab se adjust karo.
      </p>

      <h3 style={S.h3}>Monthly Checks (Example)</h3>
      <ul style={S.ul}>
        <li>All devices online — koi device offline ya communication failure mein to investigate</li>
        <li>Alarm log review — unacknowledged alarms, recurring nuisance alarms identify karo</li>
        <li>Sample point verification — 10–20 points BMS value vs local equipment display/OEM software compare karo</li>
        <li>Trend data logging — koi gaps nahi, data continuously logging</li>
        <li>Server health — disk space, CPU/RAM, application logs for errors</li>
        <li>Network connectivity — ping key devices, network latency check</li>
      </ul>

      <h3 style={S.h3}>Quarterly Checks (Example)</h3>
      <ul style={S.ul}>
        <li>Full alarm test — key alarms simulate karo aur verify generation + notification</li>
        <li>User access audit — inactive accounts, privilege review</li>
        <li>Database backup test — backup restore test karo</li>
        <li>Sensor calibration check — calibrated reference se compare karo where accessible</li>
        <li>BMS software — updates available? Apply per change management process</li>
        <li>Integration test — UPS, CRAC, chiller key points verify</li>
        <li>Report generation test — standard reports generate karo aur content verify karo</li>
      </ul>

      <h3 style={S.h3}>Annual Checks (Example)</h3>
      <ul style={S.ul}>
        <li>Full points list walkthrough — sab points live value se verify karo</li>
        <li>As-built documentation update — agar koi changes hue</li>
        <li>Controller firmware update review — OEM advisory check karo</li>
        <li>Network drawing update</li>
        <li>Security audit — VPN access, firewall rules, open ports review</li>
        <li>Historian capacity planning — storage aur performance review</li>
        <li>Alarm rationalization — stale, nuisance alarms review aur tune</li>
      </ul>

      {/* ═══════════════════════════════════════════════════════════════
          SECTION 20 — TROUBLESHOOTING
      ═══════════════════════════════════════════════════════════════ */}
      <h2 id="troubleshooting" style={S.h2}>Engineer Troubleshooting — BMS Data Not Updating</h2>

      <p style={S.p}>
        BMS troubleshooting mein sabse important rule hai: <strong>isolate at each layer before
        moving up</strong>. Random steps se time waste hota hai aur real cause miss hoti hai. Ye
        10-layer model systematically har possible failure point cover karta hai — field se HMI tak.
      </p>

      <Figure caption="Fig 6 — 10-layer BMS troubleshooting model. Start at Layer 1 (field equipment) and work upward. Each layer must pass before the next can work correctly.">
        <BmsTroubleshootingLayers />
      </Figure>

      <h3 style={S.h3}>Layer 1 — Field Equipment</h3>
      <p style={S.p}>
        Pehle verify karo ki equipment actually running hai aur correct value locally show kar raha
        hai. UPS front panel pe output load % kya hai? CRAC unit local display pe supply air temperature
        kya hai? Generator AMF panel pe fuel level gauge kya show karta hai? Agar local display bhi
        wrong value show kar raha hai — ye equipment problem hai, BMS problem nahi. BMS sirf jo
        equipment report karta hai wahi dikhata hai.
      </p>

      <h3 style={S.h3}>Layer 2 — Sensor and Equipment Controller</h3>
      <p style={S.p}>
        Equipment controller se communication interface pe value available hai? UPS web interface ya
        OEM software kholo — same point ka value wahan dikhta hai? Agar OEM software bhi correct value
        nahi dikhata (ya communication error hai) — equipment controller ka issue hai, BMS ka nahi.
        OEM support engage karo for equipment-side issues.
      </p>

      <h3 style={S.h3}>Layer 3 — Physical Communication</h3>
      <p style={S.p}>
        RS-485 ke liye: cable continuity — multimeter se A aur B wire continuity verify karo.
        Polarity — A (positive, typically data+) aur B (negative, data−) correctly connected hain?
        Termination — 120 ohm bus ke dono ends pe? Shielding — properly grounded? Link LED — agar
        RS-485 converter pe LED hai, activity indicator hai? Ethernet ke liye: RJ45 link LED on hai?
        Koi physical damage?
      </p>

      <h3 style={S.h3}>Layer 4 — Communication Configuration</h3>
      <p style={S.p}>
        BMS aur equipment ke configuration parameters match karte hain? Modbus RTU ke liye: baud rate
        same? Parity same? Stop bits same? Slave ID BMS mein same jo equipment pe set hai? Modbus TCP
        ke liye: IP address correct? Port 502 (ya OEM-specified)? Unit ID correct? BACnet ke liye:
        Device ID unique? IP aur UDP port correct (default 47808 — configurable; verify per device/system config)? SNMP ke liye: community string correct? SNMP version
        (v1/v2c/v3 — match device supported version) correct? IP address correct?
      </p>

      <h3 style={S.h3}>Layer 5 — Protocol and Register/Object</h3>
      <p style={S.p}>
        Correct function code use ho raha hai? FC 03 (Holding Registers) ya FC 04 (Input Registers)
        — wrong FC use karne pe exception response milti hai. Register address OEM documentation se
        match karta hai? 0-based vs 1-based offset check karo. Data type correct hai — UINT16 vs
        INT16 vs FLOAT32? Byte order correct hai for 32-bit values? BACnet ke liye: Object type aur
        instance correct? Property (Present_Value) accessible hai? SNMP ke liye: OID correct?
        MIB version match?
      </p>

      <h3 style={S.h3}>Layer 6 — Gateway</h3>
      <p style={S.p}>
        Agar protocol gateway use ho raha hai (Modbus RTU to BACnet/IP ya similar): gateway powered on
        aur online hai? Gateway configuration — source protocol (Modbus) aur target protocol (BACnet)
        dono correctly configured? Both sides communicate? Gateway ke diagnostic page pe point status
        check karo. Gateway restart karo agar configuration recently changed.
      </p>

      <h3 style={S.h3}>Layer 7 — BMS Driver and Integration Server</h3>
      <p style={S.p}>
        BMS mein device ka status kya hai — online/offline/faulted? Driver service running hai?
        BMS event log mein device ke liye errors hain? Timeout configured correctly — bahut short
        timeout pe intermittent offline aayi sakti hai. License limit reach ho gayi? Kuch BMS platforms
        point count pe license limit rakhrte hain — additional points beyond limit nahi aate. Driver
        update ya restart try karo.
      </p>

      <h3 style={S.h3}>Layer 8 — Point Mapping and Binding</h3>
      <p style={S.p}>
        Backend mein point ka live value check karo — BMS diagnostic tool ya point detail view se.
        Value update ho rahi hai backend mein? Agar yes — mapping correct hai, binding issue hai.
        Register address correct hai? Data type match karta hai? Scaling formula correct hai?
        Engineering unit configured? Wrong scaling ka result: value extreme high/low ya zero aa sakti
        hai. Ek simple test: raw value manually calculate karo expected engineering value se — formula
        verify karo.
      </p>

      <h3 style={S.h3}>Layer 9 — HMI and Graphics</h3>
      <p style={S.p}>
        Backend mein value update ho rahi hai lekin graphic mein nahi — binding issue hai. Graphic
        element correctly bound hai? Tag name exactly match karta hai? Graphic page cached version show
        kar raha hai — browser cache clear karo ya page reload karo. HMI animation correct hai —
        numeric display, color change, indicator state? Publish karo agar BMS mein draft mode pe
        changes unpublished hain.
      </p>

      <h3 style={S.h3}>Layer 10 — Alarm, Trend and Historian</h3>
      <p style={S.p}>
        Live value available hai lekin alarm generate nahi ho rahi: alarm limit correctly configured?
        Deadband ya delay configured hai? Alarm suppression active? Point engineering unit alarm
        threshold ke saath consistent? Trend data nahi aa rahi: trend log configured? Log service
        running? Historian connection? Disk space available? Buffer overflow?
      </p>

      {/* Fault-specific troubleshooting */}
      <h3 style={S.h3}>Fault-Specific Troubleshooting</h3>

      <p style={S.p}><strong>Complete Device Offline:</strong> Start L3 (physical comms). Cable issue ya power issue. Then L4 (config mismatch). Then L7 (driver/service). Most common: config change kisi ne kiya aur BMS update nahi hua.</p>

      <p style={S.p}><strong>One Point Not Updating (Others OK):</strong> Same device ke dusre points OK hain → L5 (register address, data type, FC). Agar sirf ek point — register wrong hai. OEM doc se re-check karo.</p>

      <p style={S.p}><strong>Wrong Value:</strong> L5 — data type wrong (UINT16 vs INT16 — negative values wrong). L8 — scaling formula wrong. Raw value read karo aur manually calculate karo.</p>

      <p style={S.p}><strong>Frozen/Stale Value:</strong> Value change nahi ho rahi lekin communication OK hai. L2 — equipment sensor freeze? L5 — polling working? L7 — point communication timeout incorrectly shows OK. Test: manually change UPS load aur see if BMS updates.</p>

      <p style={S.p}><strong>Intermittent Communication:</strong> L3 — RS-485 bus noise, grounding issue, cable damage. L4 — timeout too short. L7 — polling interval too fast for device capability. Systematic cable inspection. RS-485 analyser tool helpful.</p>

      <p style={S.p}><strong>Incorrect Scaling:</strong> L8 — check formula. Multiplier ya divisor wrong. Unit mismatch (register in decivolts but BMS configured for volts). Fix: raw register value read karo, manually calculate, compare with equipment display.</p>

      <p style={S.p}><strong>Wrong Engineering Unit:</strong> L8 — unit string wrong configured — value correct hai lekin display "kW" instead of "%" for load. Fix in point configuration.</p>

      <p style={S.p}><strong>Modbus Timeout:</strong> L3 — RS-485 termination missing. L4 — baud/parity mismatch. L4 — slave ID conflict (two devices same ID). Systematic: connect laptop with Modbus utility directly to RS-485 bus and test device individually.</p>

      <p style={S.p}><strong>RS-485 Bus Failure:</strong> All devices on bus offline. L3 — short circuit, open circuit, or A/B reversed. Disconnect all slaves except one — test. Systematic reconnection to isolate faulty segment or device.</p>

      <p style={S.p}><strong>BACnet Device Not Discovered:</strong> L3 — network connectivity. L4 — UDP port open (default 47808 — configurable; verify per system)? BBMD (BACnet Broadcast Management Device) configured where devices are on different subnets (not always required)? Device ID unique on the network? Who-Is broadcast reaching device subnet?</p>

      <p style={S.p}><strong>SNMP Data Not Received:</strong> L3 — UDP port 161 open (firewall). L4 — community string wrong, SNMP version mismatch. L5 — OID wrong, MIB version mismatch. Test with SNMP walk tool (snmpwalk) from BMS server.</p>

      <p style={S.p}><strong>Gateway Offline:</strong> L3 — gateway power, network connectivity. L7 — gateway management interface accessible? Both protocol sides configured? Gateway logs check karo. Restart gateway. Verify both-side connectivity separately.</p>

      <p style={S.p}><strong>Graphic Not Updating:</strong> L8 — backend value update ho rahi hai? (Check via BMS point detail view). If yes, L9 — binding wrong or graphic draft unpublished. If backend not updating, go back to L1–L7.</p>

      <p style={S.p}><strong>Alarm Not Generated:</strong> L8 — verify live value is actually crossing limit. L10 — alarm limit correctly configured? Deadband too large? Alarm suppression/inhibition active? Engineering unit mismatch — value in wrong unit vs limit?</p>

      <p style={S.p}><strong>Trend/History Missing:</strong> L10 — trend log enabled on point? Log service running? Historian connected? Disk space? Review BMS event log for storage errors. Check historian database connection.</p>

      <p style={S.p}><strong>Time Synchronization Issues:</strong> BMS server aur controllers NTP configured hain? NTP server reachable? Timestamp mismatch between BMS aur external system causes alarm correlation issues. Verify time sync status on all components.</p>

      <ComparisonTable
        title="BMS Troubleshooting Quick Reference"
        headers={["Symptom", "First Check", "Next Check", "Likely Cause", "Corrective Action"]}
        rows={[
          ["Device completely offline", "Physical cable/link", "Config params (baud, IP, slave ID)", "Cable fault or config mismatch", "Repair cable or correct config"],
          ["One point wrong/missing", "Register address vs OEM doc", "Data type, FC, byte order", "Wrong register or data type", "Correct mapping from OEM doc"],
          ["Value wrong (not scaled)", "Scaling formula in BMS", "Raw register value manually", "Wrong multiplier/offset", "Fix scaling per OEM specification"],
          ["Intermittent disconnect", "RS-485 cable, grounding, termination", "Timeout setting, polling interval", "Bus noise or timeout too short", "Fix wiring, adjust timeout"],
          ["BACnet device not found", "UDP port open (default 47808)? BBMD where needed?", "Device ID unique? Who-Is broadcast reaching subnet?", "Firewall block, BBMD missing if cross-subnet, duplicate device ID", "Open UDP port, add BBMD where applicable, fix device ID"],
          ["SNMP not working", "Community string, SNMP version", "OID correct? MIB version?", "Auth mismatch or wrong OID", "Verify with snmpwalk tool"],
          ["Graphic stale", "Backend value updating?", "Binding correct? Draft unpublished?", "Binding missing or unpublished", "Fix binding, publish graphic"],
          ["Alarm not generated", "Is value actually crossing limit?", "Limit config, deadband, suppression", "Wrong limit or suppression active", "Fix limit/deadband config"],
          ["Trend gap", "Trend enabled? Log service up?", "Disk space? Historian connected?", "Service stopped or disk full", "Restart service, free disk space"],
          ["Frozen value (stale)", "Is equipment value actually changing?", "Polling working? COV subscription?", "Equipment frozen or poll failing", "Test poll manually, restart driver"],
          ["Wrong engineering unit", "Unit config in point", "Display vs actual unit needed", "Wrong unit string configured", "Correct engineering unit in point"],
          ["Gateway offline", "Gateway power and network", "Gateway logs, both-side config", "Network fault or config error", "Restore network, check gateway config"],
        ]}
      />

      {/* ═══════════════════════════════════════════════════════════════
          SECTION 21 — ADVANTAGES AND LIMITATIONS
      ═══════════════════════════════════════════════════════════════ */}
      <h2 id="advantages-limitations" style={S.h2}>Advantages and Limitations</h2>

      <h3 style={S.h3}>Advantages</h3>
      <ul style={S.ul}>
        <li><strong>Centralized visibility:</strong> Poori facility ka real-time status ek screen se — operator room sa bahar gaye bina.</li>
        <li><strong>Alarm management:</strong> Structured alarm priorities, escalation aur acknowledgement — critical events miss nahi honge.</li>
        <li><strong>Historical trending:</strong> Root cause analysis ke liye time-series data — "what happened and when" answerable.</li>
        <li><strong>Energy reporting:</strong> Consumption trends, PUE tracking, capacity planning support.</li>
        <li><strong>Compliance evidence:</strong> ISO 27001, Tier certification, client audits ke liye documented operational history.</li>
        <li><strong>Integration:</strong> Multiple systems (UPS, cooling, environment, fire status) correlated view.</li>
        <li><strong>Remote monitoring:</strong> VPN ke through secure remote access — 24/7 visibility without on-site presence.</li>
      </ul>

      <h3 style={S.h3}>Limitations</h3>
      <ul style={S.ul}>
        <li><strong>Complexity:</strong> Proper configuration, integration aur maintenance significant expertise require karta hai.</li>
        <li><strong>Integration effort:</strong> Protocol integration har equipment ke liye documentation, wiring, configuration aur testing require karta hai.</li>
        <li><strong>Not a replacement:</strong> BMS equipment failures prevent nahi karta — sirf visibility deta hai. Equipment must be maintained independently.</li>
        <li><strong>Single point of risk:</strong> BMS server failure matlab koi centralized monitoring nahi — local equipment monitoring still needed.</li>
        <li><strong>Alarm fatigue risk:</strong> Poorly configured alarms pe operators response slow hoti hai — alarm management discipline required.</li>
        <li><strong>Cybersecurity surface:</strong> BMS network-connected system hai — vulnerabilities exist aur maintenance required hai.</li>
        <li><strong>Cost:</strong> Licensing, hardware, integration engineering, commissioning aur ongoing maintenance — significant investment.</li>
      </ul>

      {/* ═══════════════════════════════════════════════════════════════
          SECTION 22 — ILLUSTRATIVE SCENARIO
      ═══════════════════════════════════════════════════════════════ */}
      <h2 id="illustrative-scenario" style={S.h2}>Illustrative Scenario</h2>

      <Callout type="interview" title="Note: This is an illustrative scenario — not a documented real facility event">
        Neeche diya hua scenario BMS ke practical value ko demonstrate karne ke liye hai. Kisi specific
        documented incident ya facility ka reference nahi hai.
      </Callout>

      <p style={S.p}>
        Ek mid-size colocation facility mein raat ke 11 baje NOC engineer BMS dashboard pe ek amber
        alert dekhe — CRAC Unit 4 ka return air temperature trend 30 minutes se 0.3°C per 10 minutes
        ki rate se badh raha tha. Alarm nahi aaya tha abhi kyunki high alarm limit 27°C pe set tha
        aur current value 25.8°C tha — lekin trend clearly abnormal tha.
      </p>

      <p style={S.p}>
        Engineer BMS mein CRAC Unit 4 ka detail screen open kiya. Filter differential pressure trend
        dekha — last 2 days mein gradual increase tha, indicating filter loading. Compressor current
        normal tha — compressor running hai. Supply air temperature setpoint aur actual difference
        within normal range tha. Conclusion: likely clogged air filter reducing airflow capacity,
        causing gradual temperature rise.
      </p>

      <p style={S.p}>
        Engineer ne on-call maintenance team ko notify kiya. Team physically CRAC unit check kiya —
        confirmed blocked primary filter. Filter replaced in 20 minutes. BMS trend mein return air
        temperature turn immediately reversed. No server thermal event occurred. Without BMS trend
        visibility, ya to alarm pe react karte (much later, and temperature would have been higher),
        ya next morning physical walkthrough pe discover karte.
      </p>

      {/* ═══════════════════════════════════════════════════════════════
          SECTION 23 — INTERVIEW QUESTIONS
      ═══════════════════════════════════════════════════════════════ */}
      <h2 id="interview-questions" style={S.h2}>Interview Questions</h2>

      <h3 style={S.h3}>Q1: BMS aur DCIM mein kya fundamental difference hai?</h3>
      <p style={S.p}>
        <strong>Answer:</strong> BMS building infrastructure monitor karta hai — HVAC, electrical,
        environment. Typically BACnet aur Modbus protocols use karta hai. DCIM IT infrastructure pe
        focus karta hai — rack-level power, IT assets, capacity planning, PUE calculation. DCIM IT
        protocols (SNMP, IPMI) se PDU aur servers se data leta hai. Dono data center mein coexist
        karte hain — BMS floor-level environment deta hai, DCIM rack-level IT data deta hai. Many
        enterprise data centers dono separately maintain karte hain, ya integration points define
        karte hain.
      </p>

      <h3 style={S.h3}>Q2: Modbus mein 0-based aur 1-based addressing ka kya practical issue hai?</h3>
      <p style={S.p}>
        <strong>Answer:</strong> Modbus specification internally 0-based hai — first register address
        0 hai. Lekin OEM register maps typically 1-based publish karte hain — "Holding Register 1"
        likhte hain. BMS configuration mein "Register 1" enter karo to actually address 0 read hogi
        (agar BMS bhi 1-based expect karta hai). Ya "Register 1" address 1 read hogi agar BMS 0-based
        hai — wrong register. Ye mismatch wrong value ya "no response" cause karta hai. Fix: OEM
        documentation carefully read karo — 1-based ya 0-based likhni chahiye. Test karo aur OEM
        software se cross-check karo. Typically ek register address up ya down adjust karo.
      </p>

      <h3 style={S.h3}>Q3: BMS mein COV aur polling mein kab kya prefer karein?</h3>
      <p style={S.p}>
        <strong>Answer:</strong> COV (Change of Value) BACnet protocol mein available hai —
        device BMS ko notify karta hai sirf jab value configured increment se change ho. Bandwidth
        efficient hai, faster response for rapid changes. Polling mein BMS fixed interval pe read
        karta hai — predictable, simpler to configure. COV prefer karo jab: BACnet support available
        hai, network bandwidth concern hai, rapid alarm response chahiye. Polling prefer karo jab:
        Modbus use ho raha hai (COV nahi hota), simple reliable integration chahiye, ya COV
        subscription management overhead avoid karna ho.
      </p>

      <h3 style={S.h3}>Q4: BMS mein life-safety systems kaise integrate karte hain aur boundaries kya hain?</h3>
      <p style={S.p}>
        <strong>Answer:</strong> Fire alarm, VESDA, access control apne dedicated systems pe operate
        karte hain. BMS selected status/alarm points receive kar sakta hai — monitoring ke liye —
        typically dry contact ya protocol se. Ye BMS ko visibility deta hai: fire alarm active hai ya
        nahi, VESDA zone ka alarm level kya hai. Lekin BMS in systems ka replacement nahi hai aur
        primary life-safety control nahi hona chahiye. Fire suppression release, evacuation sequence,
        access door control — ye sab dedicated systems handle karte hain. BMS boundary clearly
        defined honi chahiye — monitor only, no life-safety commands through BMS.
      </p>

      <h3 style={S.h3}>Q5: RS-485 bus pe troubleshoot karte time kya systematic approach hai?</h3>
      <p style={S.p}>
        <strong>Answer:</strong> First, verify physical layer: cable continuity, A/B polarity (most
        common error — swap karo aur test karo), termination resistors (120 ohm at both ends —
        only ends, not middle). Then configuration: baud rate, parity aur slave IDs sab match karte
        hain? Duplicate slave IDs? Phir isolation: ek slave pe BMS connect karo — works? Ek ek
        device add karo bus pe — kab fail hota hai. Faulty device ya cable segment isolate hoti
        hai. Tools helpful hain: Modbus utility software laptop pe, RS-485 analyzer.
      </p>

      {/* ═══════════════════════════════════════════════════════════════
          SECTION 24 — KEY TAKEAWAYS
      ═══════════════════════════════════════════════════════════════ */}
      <h2 id="key-takeaways" style={S.h2}>Key Takeaways</h2>

      <ul style={S.ul}>
        <li><strong>BMS buildings mein broadly use hota hai</strong> — hospitals, hotels, airports, malls, campuses. Data center mein zyada critical use hai — continuous operation, alarm management, compliance.</li>
        <li><strong>BMS ≠ DCIM ≠ EMS ≠ SCADA</strong> — different focus areas hain. Data center mein dono BMS aur DCIM coexist karte hain, complementary roles mein.</li>
        <li><strong>Data chain: Equipment → Protocol → BMS → Tag → HMI → Alarm/Trend</strong> — har step configure hona chahiye, har step mein failure possible hai.</li>
        <li><strong>Modbus addressing offset (0-based vs 1-based)</strong> — ye ek bahut common integration error hai. Hamesha OEM documentation se verify karo.</li>
        <li><strong>BACnet COV bandwidth efficient hai</strong> — device proactively notify karta hai on change. Modbus sirf polling support karta hai.</li>
        <li><strong>Scaling aur data type correct hona zaroori hai</strong> — wrong scaling se wrong alarm, wrong trend, wrong operational decision.</li>
        <li><strong>Monitoring ≠ Control</strong> — majority points read-only hain. Control requires design, authorization, interlocks. Life-safety systems BMS se control nahi hone chahiye.</li>
        <li><strong>UPS integration: Always get OEM register map</strong> — register addresses, data types aur scaling model se model differ karte hain.</li>
        <li><strong>Alarm management discipline zaroori hai</strong> — alarm fatigue real risk hai. Rationalize, tune, aur make every alarm actionable.</li>
        <li><strong>Troubleshooting: Layer-by-layer approach</strong> — field se HMI tak systematically isolate karo. Random steps time waste karte hain.</li>
        <li><strong>Documentation critical hai</strong> — undocumented BMS liability hai. Points list, as-built drawings, commissioning records maintain karo.</li>
      </ul>

      {/* ═══════════════════════════════════════════════════════════════
          FAQ (excluded from TOC per platform architecture)
      ═══════════════════════════════════════════════════════════════ */}
      <h2 style={{ ...S.h2, marginTop: "3rem" }}>Frequently Asked Questions</h2>
      {faqs.map((item, i) => (
        <div key={i} style={{ marginBottom: "1.5rem", paddingBottom: "1.5rem", borderBottom: i < faqs.length - 1 ? "1px solid #e5e7eb" : "none" }}>
          <p style={{ ...S.p, fontWeight: 700, marginBottom: "0.4rem" }}>{item.q}</p>
          <p style={{ ...S.p, marginBottom: 0 }}>{item.a}</p>
        </div>
      ))}

      {/* Related Topics */}
      <h2 style={{ ...S.h2, marginTop: "3rem" }}>Related Learning Topics</h2>
      <p style={S.p}>BMS poore data center ecosystem se interact karta hai. Ye topics deepen karo:</p>
      <ul style={S.ul}>
        <li><TopicLink slug="ups" variant="inline" /> — BMS ka most common integration target. UPS parameters BMS pe monitor karo.</li>
        <li><TopicLink slug="vesda" variant="inline" /> — Early fire detection — BMS ko status points provide karta hai.</li>
        <li><TopicLink slug="cctv" variant="inline" /> — Physical security system jo BMS se event-linked alerts share kar sakta hai.</li>
        <li><TopicLink slug="access-control" variant="inline" /> — Door status aur access events BMS pe monitored ho sakte hain.</li>
        <li><TopicLink slug="dcim" variant="inline" /> — BMS ke alongside data center infrastructure management.</li>
      </ul>
    </>
  );
}
