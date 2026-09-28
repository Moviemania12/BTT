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
        FAT happens at the vendor's facility before delivery — verify software configuration, graphics, point list, alarm configuration against simulated inputs. SAT happens on site after installation — do the integration test with actual equipment, verify all points with live data. FAT identifies problems early — cheaper to fix before site delivery. SAT provides the final commissioning evidence.
      </p>

      <h3 style={S.h3}>Points List and Point Schedule</h3>
      <p style={S.p}>
        The points list is a comprehensive table that documents all BMS points — tag name, description, equipment ID, protocol, device address, register/object, data type, scaling, engineering unit, alarm limits, trend configuration. This document captures the as-built state and is essential for future maintenance. An undocumented BMS is a liability — after one engineer leaves, nobody knows how it works.
      </p>

      <h3 style={S.h3}>Loop Diagrams and Network Drawings</h3>
      <p style={S.p}>
        Loop diagrams show sensor-to-controller wiring — terminal numbers, cable types, conduit routes. Network drawings show the BMS network topology — switches, servers, controllers, VLANs, IP addresses. As-built versions — reflect actual changes after installation — finalize field redlines. These drawings guide the field team in future changes and troubleshooting.
      </p>

      {/* ═══════════════════════════════════════════════════════════════
          SECTION 19 — PREVENTIVE MAINTENANCE
      ═══════════════════════════════════════════════════════════════ */}
      <h2 id="preventive-maintenance" style={S.h2}>Preventive Maintenance</h2>

      <p style={S.p}>
        Below is an example maintenance schedule — adjust the actual frequency according to OEM recommendations, site conditions, contract requirements and criticality.
      </p>

      <h3 style={S.h3}>Monthly Checks (Example)</h3>
      <ul style={S.ul}>
        <li>All devices online — investigate if any device is offline or in communication failure</li>
        <li>Alarm log review — identify unacknowledged alarms, recurring nuisance alarms</li>
        <li>Sample point verification — compare 10–20 points BMS value vs local equipment display/OEM software</li>
        <li>Trend data logging — no gaps, data logging continuously</li>
        <li>Server health — disk space, CPU/RAM, application logs for errors</li>
        <li>Network connectivity — ping key devices, network latency check</li>
      </ul>

      <h3 style={S.h3}>Quarterly Checks (Example)</h3>
      <ul style={S.ul}>
        <li>Full alarm test — simulate key alarms and verify generation + notification</li>
        <li>User access audit — inactive accounts, privilege review</li>
        <li>Database backup test — do a backup restore test</li>
        <li>Sensor calibration check — compare against a calibrated reference where accessible</li>
        <li>BMS software — updates available? Apply per change management process</li>
        <li>Integration test — UPS, CRAC, chiller key points verify</li>
        <li>Report generation test — generate standard reports and verify content</li>
      </ul>

      <h3 style={S.h3}>Annual Checks (Example)</h3>
      <ul style={S.ul}>
        <li>Full points list walkthrough — verify all points with live values</li>
        <li>As-built documentation update — if any changes happened</li>
        <li>Controller firmware update review — check OEM advisories</li>
        <li>Network drawing update</li>
        <li>Security audit — VPN access, firewall rules, open ports review</li>
        <li>Historian capacity planning — storage and performance review</li>
        <li>Alarm rationalization — review and tune stale, nuisance alarms</li>
      </ul>

      {/* ═══════════════════════════════════════════════════════════════
          SECTION 20 — TROUBLESHOOTING
      ═══════════════════════════════════════════════════════════════ */}
      <h2 id="troubleshooting" style={S.h2}>Engineer Troubleshooting — BMS Data Not Updating</h2>

      <p style={S.p}>
        The most important rule in BMS troubleshooting is: <strong>isolate at each layer before moving up</strong>. Random steps waste time and the real cause gets missed. This 10-layer model systematically covers every possible failure point — from field to HMI.
      </p>

      <Figure caption="Fig 6 — 10-layer BMS troubleshooting model. Start at Layer 1 (field equipment) and work upward. Each layer must pass before the next can work correctly.">
        <BmsTroubleshootingLayers />
      </Figure>

      <h3 style={S.h3}>Layer 1 — Field Equipment</h3>
      <p style={S.p}>
        First verify that the equipment is actually running and showing the correct value locally. What is the output load % on the UPS front panel? What is the supply air temperature on the CRAC unit local display? What does the fuel level gauge show on the generator AMF panel? If the local display is also showing a wrong value — it is an equipment problem, not a BMS problem. The BMS only shows what the equipment reports.
      </p>

      <h3 style={S.h3}>Layer 2 — Sensor and Equipment Controller</h3>
      <p style={S.p}>
        Is the value available on the communication interface from the equipment controller? Open the UPS web interface or OEM software — does the same point's value show there? If the OEM software also does not show the correct value (or there is a communication error) — it is an equipment controller issue, not a BMS one. Engage OEM support for equipment-side issues.
      </p>

      <h3 style={S.h3}>Layer 3 — Physical Communication</h3>
      <p style={S.p}>
        For RS-485: cable continuity — verify A and B wire continuity with a multimeter. Polarity — are A (positive, typically data+) and B (negative, data−) correctly connected? Termination — 120 ohm at both ends of the bus? Shielding — properly grounded? Link LED — if the RS-485 converter has an LED, is there an activity indicator? For Ethernet: is the RJ45 link LED on? Any physical damage?
      </p>

      <h3 style={S.h3}>Layer 4 — Communication Configuration</h3>
      <p style={S.p}>
        Do the configuration parameters of the BMS and equipment match? For Modbus RTU: baud rate same? Parity same? Stop bits same? Is the slave ID in the BMS the same as set on the equipment? For Modbus TCP: IP address correct? Port 502 (or OEM-specified)? Unit ID correct? For BACnet: Device ID unique? IP and UDP port correct (default 47808 — configurable; verify per device/system config)? For SNMP: community string correct? SNMP version (v1/v2c/v3 — match device supported version) correct? IP address correct?
      </p>

      <h3 style={S.h3}>Layer 5 — Protocol and Register/Object</h3>
      <p style={S.p}>
        Is the correct function code being used? FC 03 (Holding Registers) or FC 04 (Input Registers) — using the wrong FC gives an exception response. Does the register address match the OEM documentation? Check the 0-based vs 1-based offset. Is the data type correct — UINT16 vs INT16 vs FLOAT32? Is the byte order correct for 32-bit values? For BACnet: object type and instance correct? Is the property (Present_Value) accessible? For SNMP: OID correct? MIB version match?
      </p>

      <h3 style={S.h3}>Layer 6 — Gateway</h3>
      <p style={S.p}>
        If a protocol gateway is being used (Modbus RTU to BACnet/IP or similar): is the gateway powered on and online? Gateway configuration — are both the source protocol (Modbus) and target protocol (BACnet) correctly configured? Do both sides communicate? Check point status on the gateway's diagnostic page. Restart the gateway if the configuration was recently changed.
      </p>

      <h3 style={S.h3}>Layer 7 — BMS Driver and Integration Server</h3>
      <p style={S.p}>
        What is the device status in the BMS — online/offline/faulted? Is the driver service running? Are there errors for the device in the BMS event log? Is the timeout configured correctly — with a very short timeout intermittent offline can occur. Has the license limit been reached? Some BMS platforms keep a license limit on point count — additional points beyond the limit do not come through. Try a driver update or restart.
      </p>

      <h3 style={S.h3}>Layer 8 — Point Mapping and Binding</h3>
      <p style={S.p}>
        Check the point's live value in the backend — from the BMS diagnostic tool or point detail view. Is the value updating in the backend? If yes — mapping is correct, it is a binding issue. Is the register address correct? Does the data type match? Is the scaling formula correct? Engineering unit configured? Result of wrong scaling: the value can come out extremely high/low or zero. A simple test: manually calculate the expected engineering value from the raw value — verify the formula.
      </p>

      <h3 style={S.h3}>Layer 9 — HMI and Graphics</h3>
      <p style={S.p}>
        The value is updating in the backend but not in the graphic — it is a binding issue. Is the graphic element correctly bound? Does the tag name match exactly? Is the graphic page showing a cached version — clear the browser cache or reload the page. Is the HMI animation correct — numeric display, color change, indicator state? Publish if changes are unpublished in draft mode in the BMS.
      </p>

      <h3 style={S.h3}>Layer 10 — Alarm, Trend and Historian</h3>
      <p style={S.p}>
        The live value is available but the alarm is not generating: is the alarm limit correctly configured? Is a deadband or delay configured? Is alarm suppression active? Is the point engineering unit consistent with the alarm threshold? Trend data not coming: is the trend log configured? Is the log service running? Historian connection? Disk space available? Buffer overflow?
      </p>

      {/* Fault-specific troubleshooting */}
      <h3 style={S.h3}>Fault-Specific Troubleshooting</h3>

      <p style={S.p}><strong>Complete Device Offline:</strong> Start L3 (physical comms). Cable issue or power issue. Then L4 (config mismatch). Then L7 (driver/service). Most common: someone made a config change and the BMS was not updated.</p>

      <p style={S.p}><strong>One Point Not Updating (Others OK):</strong> Other points of the same device are OK → L5 (register address, data type, FC). If only one point — the register is wrong. Re-check from the OEM doc.</p>

      <p style={S.p}><strong>Wrong Value:</strong> L5 — data type wrong (UINT16 vs INT16 — negative values wrong). L8 — scaling formula wrong. Read the raw value and calculate manually.</p>

      <p style={S.p}><strong>Frozen/Stale Value:</strong> The value is not changing but communication is OK. L2 — equipment sensor freeze? L5 — is polling working? L7 — point communication timeout incorrectly shows OK. Test: manually change the UPS load and see if the BMS updates.</p>

      <p style={S.p}><strong>Intermittent Communication:</strong> L3 — RS-485 bus noise, grounding issue, cable damage. L4 — timeout too short. L7 — polling interval too fast for device capability. Systematic cable inspection. RS-485 analyser tool helpful.</p>

      <p style={S.p}><strong>Incorrect Scaling:</strong> L8 — check the formula. Multiplier or divisor wrong. Unit mismatch (register in decivolts but BMS configured for volts). Fix: read the raw register value, calculate manually, compare with the equipment display.</p>

      <p style={S.p}><strong>Wrong Engineering Unit:</strong> L8 — unit string configured wrong — the value is correct but displays "kW" instead of "%" for load. Fix in point configuration.</p>

      <p style={S.p}><strong>Modbus Timeout:</strong> L3 — RS-485 termination missing. L4 — baud/parity mismatch. L4 — slave ID conflict (two devices same ID). Systematic: connect laptop with Modbus utility directly to RS-485 bus and test device individually.</p>

      <p style={S.p}><strong>RS-485 Bus Failure:</strong> All devices on bus offline. L3 — short circuit, open circuit, or A/B reversed. Disconnect all slaves except one — test. Systematic reconnection to isolate faulty segment or device.</p>

      <p style={S.p}><strong>BACnet Device Not Discovered:</strong> L3 — network connectivity. L4 — UDP port open (default 47808 — configurable; verify per system)? BBMD (BACnet Broadcast Management Device) configured where devices are on different subnets (not always required)? Device ID unique on the network? Who-Is broadcast reaching device subnet?</p>

      <p style={S.p}><strong>SNMP Data Not Received:</strong> L3 — UDP port 161 open (firewall). L4 — community string wrong, SNMP version mismatch. L5 — OID wrong, MIB version mismatch. Test with SNMP walk tool (snmpwalk) from BMS server.</p>

      <p style={S.p}><strong>Gateway Offline:</strong> L3 — gateway power, network connectivity. L7 — is the gateway management interface accessible? Both protocol sides configured? Check the gateway logs. Restart the gateway. Verify both-side connectivity separately.</p>

      <p style={S.p}><strong>Graphic Not Updating:</strong> L8 — is the backend value updating? (Check via BMS point detail view). If yes, L9 — binding wrong or graphic draft unpublished. If backend not updating, go back to L1–L7.</p>

      <p style={S.p}><strong>Alarm Not Generated:</strong> L8 — verify live value is actually crossing limit. L10 — alarm limit correctly configured? Deadband too large? Alarm suppression/inhibition active? Engineering unit mismatch — value in wrong unit vs limit?</p>

      <p style={S.p}><strong>Trend/History Missing:</strong> L10 — trend log enabled on point? Log service running? Historian connected? Disk space? Review BMS event log for storage errors. Check historian database connection.</p>

      <p style={S.p}><strong>Time Synchronization Issues:</strong> Are the BMS server and controllers NTP configured? Is the NTP server reachable? A timestamp mismatch between the BMS and an external system causes alarm correlation issues. Verify time sync status on all components.</p>

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
        <li><strong>Centralized visibility:</strong> Real-time status of the whole facility from one screen — without the operator leaving the room.</li>
        <li><strong>Alarm management:</strong> Structured alarm priorities, escalation and acknowledgement — critical events will not be missed.</li>
        <li><strong>Historical trending:</strong> Time-series data for root cause analysis — "what happened and when" becomes answerable.</li>
        <li><strong>Energy reporting:</strong> Consumption trends, PUE tracking, capacity planning support.</li>
        <li><strong>Compliance evidence:</strong> Documented operational history for ISO 27001, Tier certification, client audits.</li>
        <li><strong>Integration:</strong> Multiple systems (UPS, cooling, environment, fire status) correlated view.</li>
        <li><strong>Remote monitoring:</strong> Secure remote access through VPN — 24/7 visibility without on-site presence.</li>
      </ul>

      <h3 style={S.h3}>Limitations</h3>
      <ul style={S.ul}>
        <li><strong>Complexity:</strong> Proper configuration, integration and maintenance require significant expertise.</li>
        <li><strong>Integration effort:</strong> Protocol integration requires documentation, wiring, configuration and testing for every piece of equipment.</li>
        <li><strong>Not a replacement:</strong> The BMS does not prevent equipment failures — it only gives visibility. Equipment must be maintained independently.</li>
        <li><strong>Single point of risk:</strong> BMS server failure means no centralized monitoring — local equipment monitoring still needed.</li>
        <li><strong>Alarm fatigue risk:</strong> With poorly configured alarms operator response gets slow — alarm management discipline required.</li>
        <li><strong>Cybersecurity surface:</strong> The BMS is a network-connected system — vulnerabilities exist and maintenance is required.</li>
        <li><strong>Cost:</strong> Licensing, hardware, integration engineering, commissioning and ongoing maintenance — a significant investment.</li>
      </ul>

      {/* ═══════════════════════════════════════════════════════════════
          SECTION 22 — ILLUSTRATIVE SCENARIO
      ═══════════════════════════════════════════════════════════════ */}
      <h2 id="illustrative-scenario" style={S.h2}>Illustrative Scenario</h2>

      <Callout type="interview" title="Note: This is an illustrative scenario — not a documented real facility event">
        The scenario given below is meant to demonstrate the practical value of BMS. It is not a reference to any specific documented incident or facility.
      </Callout>

      <p style={S.p}>
        In a mid-size colocation facility, at 11 PM the NOC engineer saw an amber alert on the BMS dashboard — CRAC Unit 4's return air temperature trend had been rising for 30 minutes at a rate of 0.3°C per 10 minutes. The alarm had not come yet because the high alarm limit was set at 27°C and the current value was 25.8°C — but the trend was clearly abnormal.
      </p>

      <p style={S.p}>
        The engineer opened CRAC Unit 4's detail screen in the BMS. He looked at the filter differential pressure trend — there had been a gradual increase over the last 2 days, indicating filter loading. Compressor current was normal — the compressor is running. The difference between supply air temperature setpoint and actual was within normal range. Conclusion: likely clogged air filter reducing airflow capacity, causing gradual temperature rise.
      </p>

      <p style={S.p}>
        The engineer notified the on-call maintenance team. The team physically checked the CRAC unit — confirmed blocked primary filter. Filter replaced in 20 minutes. In the BMS trend the return air temperature turn immediately reversed. No server thermal event occurred. Without BMS trend visibility, they would either have reacted to the alarm (much later, and the temperature would have been higher), or discovered it in the next morning's physical walkthrough.
      </p>

      {/* ═══════════════════════════════════════════════════════════════
          SECTION 23 — INTERVIEW QUESTIONS
      ═══════════════════════════════════════════════════════════════ */}
      <h2 id="interview-questions" style={S.h2}>Interview Questions</h2>

      <h3 style={S.h3}>Q1: What is the fundamental difference between BMS and DCIM?</h3>
      <p style={S.p}>
        <strong>Answer:</strong> The BMS monitors building infrastructure — HVAC, electrical, environment. It typically uses BACnet and Modbus protocols. DCIM focuses on IT infrastructure — rack-level power, IT assets, capacity planning, PUE calculation. DCIM takes data from PDUs and servers through IT protocols (SNMP, IPMI). Both coexist in the data center — the BMS gives the floor-level environment, DCIM gives rack-level IT data. Many enterprise data centers maintain both separately, or define integration points.
      </p>

      <h3 style={S.h3}>Q2: What is the practical issue with 0-based and 1-based addressing in Modbus?</h3>
      <p style={S.p}>
        <strong>Answer:</strong> The Modbus specification is 0-based internally — the first register address is 0. But OEM register maps typically publish 1-based — they write "Holding Register 1". If you enter "Register 1" in the BMS configuration, address 0 will actually be read (if the BMS also expects 1-based). Or "Register 1" will read address 1 if the BMS is 0-based — the wrong register. This mismatch causes a wrong value or "no response". Fix: read the OEM documentation carefully — it should state 1-based or 0-based. Test it and cross-check with the OEM software. Typically adjust the register address up or down by one.
      </p>

      <h3 style={S.h3}>Q3: When should COV vs polling be preferred in the BMS?</h3>
      <p style={S.p}>
        <strong>Answer:</strong> COV (Change of Value) is available in the BACnet protocol — the device notifies the BMS only when the value changes by the configured increment. It is bandwidth efficient, faster response for rapid changes. In polling the BMS reads at a fixed interval — predictable, simpler to configure. Prefer COV when: BACnet support is available, network bandwidth is a concern, rapid alarm response is needed. Prefer polling when: Modbus is being used (there is no COV), a simple reliable integration is needed, or COV subscription management overhead has to be avoided.
      </p>

      <h3 style={S.h3}>Q4: How are life-safety systems integrated into the BMS and what are the boundaries?</h3>
      <p style={S.p}>
        <strong>Answer:</strong> Fire alarm, VESDA, access control operate on their own dedicated systems. The BMS can receive selected status/alarm points — for monitoring — typically through dry contact or protocol. This gives the BMS visibility: whether the fire alarm is active or not, what the alarm level of a VESDA zone is. But the BMS is not a replacement for these systems and must not be the primary life-safety control. Fire suppression release, evacuation sequence, access door control — all of these are handled by dedicated systems. The BMS boundary must be clearly defined — monitor only, no life-safety commands through the BMS.
      </p>

      <h3 style={S.h3}>Q5: What is the systematic approach when troubleshooting an RS-485 bus?</h3>
      <p style={S.p}>
        <strong>Answer:</strong> First, verify the physical layer: cable continuity, A/B polarity (most common error — swap and test), termination resistors (120 ohm at both ends — only ends, not middle). Then configuration: do baud rate, parity and slave IDs all match? Duplicate slave IDs? Then isolation: connect the BMS to one slave — does it work? Add devices to the bus one by one — see when it fails. The faulty device or cable segment gets isolated. Tools are helpful: Modbus utility software on a laptop, RS-485 analyzer.
      </p>

      {/* ═══════════════════════════════════════════════════════════════
          SECTION 24 — KEY TAKEAWAYS
      ═══════════════════════════════════════════════════════════════ */}
      <h2 id="key-takeaways" style={S.h2}>Key Takeaways</h2>

      <ul style={S.ul}>
        <li><strong>BMS is broadly used in buildings</strong> — hospitals, hotels, airports, malls, campuses. In the data center its use is more critical — continuous operation, alarm management, compliance.</li>
        <li><strong>BMS ≠ DCIM ≠ EMS ≠ SCADA</strong> — they have different focus areas. In the data center both BMS and DCIM coexist, in complementary roles.</li>
        <li><strong>Data chain: Equipment → Protocol → BMS → Tag → HMI → Alarm/Trend</strong> — every step must be configured, and failure is possible at every step.</li>
        <li><strong>Modbus addressing offset (0-based vs 1-based)</strong> — this is a very common integration error. Always verify from OEM documentation.</li>
        <li><strong>BACnet COV is bandwidth efficient</strong> — the device proactively notifies on change. Modbus only supports polling.</li>
        <li><strong>Correct scaling and data type are essential</strong> — wrong scaling gives a wrong alarm, wrong trend, wrong operational decision.</li>
        <li><strong>Monitoring ≠ Control</strong> — the majority of points are read-only. Control requires design, authorization, interlocks. Life-safety systems must not be controlled from the BMS.</li>
        <li><strong>UPS integration: Always get OEM register map</strong> — register addresses, data types and scaling differ from model to model.</li>
        <li><strong>Alarm management discipline is essential</strong> — alarm fatigue is a real risk. Rationalize, tune, and make every alarm actionable.</li>
        <li><strong>Troubleshooting: Layer-by-layer approach</strong> — isolate systematically from field to HMI. Random steps waste time.</li>
        <li><strong>Documentation is critical</strong> — an undocumented BMS is a liability. Maintain the points list, as-built drawings, commissioning records.</li>
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
      <p style={S.p}>The BMS interacts with the entire data center ecosystem. Deepen these topics:</p>
      <ul style={S.ul}>
        <li><TopicLink slug="ups" variant="inline" /> — the most common integration target of the BMS. Monitor UPS parameters on the BMS.</li>
        <li><TopicLink slug="vesda" variant="inline" /> — early fire detection — provides status points to the BMS.</li>
        <li><TopicLink slug="cctv" variant="inline" /> — a physical security system that can share event-linked alerts with the BMS.</li>
        <li><TopicLink slug="access-control" variant="inline" /> — door status and access events can be monitored on the BMS.</li>
        <li><TopicLink slug="dcim" variant="inline" /> — data center infrastructure management alongside the BMS.</li>
      </ul>
    </>
  );
}
