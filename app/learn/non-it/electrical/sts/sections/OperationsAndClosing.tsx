"use client";

import { S, Callout, ComparisonTable, Figure } from "../shared";
import TopicLink from "@/components/TopicLink";
import StsMaintenanceBypassDiagram from "../svg/StsMaintenanceBypassDiagram";

export default function OperationsAndClosing() {
  return (
    <>
      <h2 id="maintenance-bypass" style={S.h2}>Maintenance Bypass</h2>

      <Figure caption="Fig 4 — STS Maintenance Bypass: Normal mode uses STS for automatic switching; bypass mode routes load directly through bypass switch for STS servicing">
        <StsMaintenanceBypassDiagram />
      </Figure>

      <p style={S.p}>
        The SCR modules, control board and power electronics inside an STS can fail or need replacement. Without a maintenance bypass, servicing the STS is impossible without powering off the load.
      </p>

      <p style={S.p}>
        The maintenance bypass is a separate switch that connects the load directly to the preferred source, completely bypassing the STS. In bypass mode:
      </p>

      <ul style={S.ul}>
        <li>Load continues to receive power — no interruption during STS maintenance</li>
        <li>Automatic transfer between sources NO LONGER available — single source only</li>
        <li>Source A failure in bypass mode = load power loss (manual action required)</li>
        <li>Keep bypass window minimal — treat as elevated risk period</li>
      </ul>

      <Callout type="danger" title="Bypass Mode is Not Normal Operation">
        In maintenance bypass mode, the STS's protective function is completely disabled. Never spend unnecessary time in bypass mode. Do transfer operations only when absolutely required, and notify the NOC that the site is in an elevated risk state during bypass.
      </Callout>

      <h2 id="failure-modes" style={S.h2}>Failure Modes</h2>

      <ComparisonTable
        headers={["Failure Mode", "What Happens", "Load Impact", "Response"]}
        rows={[
          ["SCR Set A fails open", "Source A cannot be switched to load; STS transfers to Source B", "Automatic transfer — load unaffected if B available", "Alarm + schedule SCR replacement"],
          ["SCR Set A fails closed (shorted)", "Source A permanently connected; STS cannot transfer away from A", "No redundancy — Source A failure = load failure", "Emergency — replace SCR immediately"],
          ["Control logic failure", "STS may freeze on current source or alarm without transferring", "Load continues on current source; no transfer capability", "Switch to manual bypass, diagnose control board"],
          ["Both sources out-of-spec simultaneously", "STS cannot transfer — no valid source available", "Load loses power regardless", "Common-mode failure — investigate upstream"],
          ["Communication module failure", "Monitoring lost but STS operation continues", "No load impact — only monitoring affected", "Replace communication card, monitor locally"],
          ["Overtemperature", "STS may derate or alarm; severe case may transfer load and shut down", "Possible brief transfer if cooling fails severely", "Check ventilation, ambient temperature"],
        ]}
      />

      <Callout type="important" title="Most Dangerous: SCR Fails Closed">
        The most dangerous SCR failure scenario is &quot;stuck closed&quot; — the SCR keeps conducting permanently. In this case the STS cannot transfer — when Source A fails, the load will also fail. Early degradation can be detected with thermal imaging and regular impedance testing before a catastrophic failure.
      </Callout>

      <h2 id="common-alarms" style={S.h2}>Common Alarms</h2>

      <ComparisonTable
        headers={["Alarm", "Cause", "Priority", "First Action"]}
        rows={[
          ["Source A undervoltage", "UPS-A output low or failing", "HIGH", "Check UPS-A status; verify Source B ready"],
          ["Source A overvoltage", "UPS-A output high (regulator fault)", "HIGH", "Check UPS-A regulator; STS may have transferred"],
          ["Source B not available", "UPS-B offline or out-of-spec", "HIGH", "Investigate UPS-B; no redundancy currently"],
          ["Transfer occurred", "STS transferred from preferred to alternate source", "MEDIUM", "Investigate why preferred failed; plan restoration"],
          ["Overtemperature", "STS internal temp high — cooling issue or overload", "MEDIUM", "Check ambient temp, STS load %, ventilation"],
          ["Communication lost", "SNMP/Modbus link down", "LOW", "Check network cable, management card"],
          ["Maintenance bypass active", "Operator put STS in bypass", "MEDIUM", "Verify intentional; minimize bypass duration"],
          ["SCR fault", "Thyristor module degraded or failed", "CRITICAL", "Switch to bypass, schedule immediate SCR replacement"],
        ]}
      />

      <h2 id="testing-procedure" style={S.h2}>Testing Procedure</h2>

      <p style={S.p}>
        STS commissioning and periodic testing ensure that the device shows the expected behavior on an actual fault. Testing schedule:
      </p>

      <ComparisonTable
        headers={["Test", "Method", "Frequency", "Pass Criterion"]}
        rows={[
          ["Source A undervoltage transfer test", "Simulate Source A undervoltage (use test mode or manually lower UPS-A output)", "Commissioning + annually", "Transfer to Source B in ≤ 4 ms; alarm generated"],
          ["Source A overvoltage transfer test", "Simulate Source A overvoltage", "Commissioning + annually", "Transfer to Source B in ≤ 4 ms"],
          ["Manual transfer test", "Initiate manual transfer via panel/SNMP", "Quarterly", "Transfer completes; load unaffected"],
          ["Retransfer test", "Restore preferred source after transfer; verify retransfer", "Commissioning + annually", "Auto-retransfer per configured setting"],
          ["Maintenance bypass test", "Engage bypass; verify load continues on bypass", "Commissioning + annually", "Load uninterrupted; STS can be isolated"],
          ["Communication test", "Verify SNMP alarms reach NMS during transfer", "Commissioning + semi-annually", "All alarms received at NMS within 30 seconds"],
          ["Phase synchronization verification", "Verify both sources synchronized (oscilloscope or STS display)", "Commissioning", "Phase angle < ±20° between sources"],
        ]}
      />

      <Callout type="best-practice" title="Transfer Test Without Load Interruption">
        While doing a transfer test on actual load: if the sources are synchronized, the transfer will be completely invisible in make-before-break mode. Servers continue running — no reboot, no interruption. Verify that the transfer event was recorded in the STS log and that the NMS received the alarm. Successful transfer + no load impact = STS healthy and operational.
      </Callout>

      <h2 id="preventive-maintenance" style={S.h2}>Preventive Maintenance</h2>

      <ComparisonTable
        headers={["Frequency", "Tasks"]}
        rows={[
          ["Monthly", "Visual inspection (LED indicators, display status), alarm log review, source voltage readings, SNMP connectivity check"],
          ["Quarterly", "Manual transfer test (load simulation), verify auto-retransfer setting, check ambient temperature, clean external vents"],
          ["Half-Yearly", "Full transfer test with actual load, SCR terminal torque verification, thermal imaging of SCR modules and connections, firmware version check"],
          ["Annually", "Complete OEM service, SCR module inspection, control board diagnostics, maintenance bypass operational test, cable insulation resistance test"],
        ]}
      />

      <h2 id="oem-comparison" style={S.h2}>OEM Comparison</h2>

      <p style={S.p}>
        The STS market has limited OEMs offering specialized, high-reliability products. These are general industry observations — always verify current OEM datasheets and India availability before selection.
      </p>

      <ComparisonTable
        headers={["OEM", "Key Strength", "Typical Range", "India Presence"]}
        rows={[
          ["Socomec (France)", "Dedicated STS specialist; SICON STS range widely used in Data Centers", "16A–400A, 1P/3P", "Distributor network"],
          ["Schneider Electric", "Integrated with APC ecosystem; Galaxy series STS", "32A–250A, 3P", "Strong direct presence"],
          ["Eaton", "Integration with UPS ecosystem; broad range", "30A–225A, 3P", "Good India support"],
          ["ABB", "Industrial grade; high reliability for mission-critical", "Wide range", "Direct + partners"],
          ["Vertiv", "Data Center focused; Liebert STS range", "Standard DC sizes", "Strong India presence"],
          ["Cyber Power", "Cost-effective entry range", "16A–100A", "Limited India support"],
        ]}
      />

      <Callout type="important" title="OEM Selection Criteria">
        When selecting an STS, verify: (1) Transfer time specification (must be ≤ 4 ms), (2) SCR type and interrupt rating for your fault current level, (3) Current rating with derating at your ambient temperature, (4) SNMP/Modbus support for your DCIM, (5) Maintenance bypass built-in or available, (6) India spare parts and service availability. Cheapest STS for mission-critical load is false economy.
      </Callout>

      <h2 id="sts-vs-ats" style={S.h2}>STS vs ATS</h2>

      <ComparisonTable
        headers={["Parameter", "STS (Static Transfer Switch)", "ATS (Automatic Transfer Switch)"]}
        rows={[
          ["Switching technology", "SCR / Thyristor (solid-state)", "Mechanical contactors"],
          ["Transfer time", "2–4 milliseconds", "100–500 milliseconds"],
          ["IT load suitability", "Excellent — invisible to servers", "Risky — can cause reboots/glitches"],
          ["Moving parts", "None", "Yes — mechanical wear"],
          ["Parallel conduction", "Yes (make-before-break when synchronized)", "No — always break-before-make"],
          ["Cost", "Higher (premium SCR components)", "Lower (mechanical components)"],
          ["Typical application", "IT equipment, Data Center, single-corded loads", "Generator changeover, building-level switching, non-critical loads"],
          ["Operating noise", "Silent", "Audible click on transfer"],
          ["Maintenance", "Minimal (no moving parts)", "Regular contact inspection"],
          ["Heat generation", "More (on-state SCR losses)", "Less (low contact resistance)"],
        ]}
      />

      <p style={S.p}>
        Rule of thumb: always an STS for IT equipment. For generator or mains changeover, where a brief interruption is acceptable, an ATS is the cost-effective choice.
      </p>

      <h2 id="sts-vs-ups" style={S.h2}>STS vs UPS</h2>

      <ComparisonTable
        headers={["Parameter", "STS", "UPS"]}
        rows={[
          ["Function", "Switch between two live sources", "Convert power + provide battery backup"],
          ["Energy storage", "None", "Battery bank"],
          ["Backup on both sources failing", "No — cannot help", "Yes — battery covers"],
          ["Power conditioning", "Passes source power as-is (no conversion)", "Full conditioning — regulated output"],
          ["Transfer time for source fault", "2–4 ms (between two live sources)", "Zero (already on inverter output)"],
          ["Cost", "Moderate (no batteries)", "High (power electronics + batteries)"],
          ["Role in architecture", "Complement to UPS — handles single-corded protection", "Primary backup power source"],
          ["Works without second source?", "No", "Yes — runs on battery"],
        ]}
      />

      <p style={S.p}>
        The STS and the <TopicLink slug="ups" variant="inline" /> are complementary technologies. The UPS protects against grid failure (with battery). The STS gives single-corded equipment dual-path protection. Together they form a complete protection architecture.
      </p>

      <h2 id="standards" style={S.h2}>Standards & Codes</h2>

      <ComparisonTable
        headers={["Standard", "Body", "Relevance to STS"]}
        rows={[
          ["IEC 62310-1", "IEC", "Static transfer systems — general requirements and test methods"],
          ["IEC 62310-2", "IEC", "Static transfer systems — electromagnetic compatibility requirements"],
          ["IEC 62310-3", "IEC", "Static transfer systems — method of specifying performance"],
          ["IEC 60947-6-1", "IEC", "Low-voltage switchgear — transfer switching equipment"],
          ["IEC 62040-3", "IEC", "UPS performance — applicable where STS integrates with UPS system"],
          ["IEEE 446", "IEEE", "Recommended practice for emergency and standby power systems"],
          ["NFPA 70 (NEC)", "NFPA", "Article 700/701/702 — emergency, legally required, optional standby"],
          ["TIA-942", "TIA", "Data Center tier requirements — Tier III/IV STS usage"],
          ["Uptime Institute Tier Standard", "Uptime", "Fault tolerance requirements driving STS adoption in Tier IV"],
        ]}
      />

      <Callout type="important" title="IEC 62310 for STS Specification">
        When specifying an STS, ask for a performance specification as per IEC 62310-3 — transfer time, voltage window, frequency window and synchronization requirements should all be defined. A generic &quot;4ms transfer&quot; claim is not enough — specify the exact conditions under which 4ms is guaranteed (synchronized sources, load range, temperature).
      </Callout>

      <h2 id="real-dc-example" style={S.h2}>Real Data Center Example</h2>

      <p style={S.p}>
        <strong>Scenario:</strong> 500-rack Tier IV Data Center, dual UPS architecture. 450 racks with dual-corded servers. Legacy single-corded network switches in 50 racks.
      </p>

      <p style={S.p}>
        <strong>Problem:</strong> The switches in 50 racks support only a single power input. There is a dual-bus architecture, but these switches are connected only to Path A. On a UPS-A failure, the 50 racks would lose complete network connectivity — potential for entire data center connectivity outage even though servers are fine.
      </p>

      <p style={S.p}>
        <strong>Solution:</strong> 50 rack-mount STS units were installed — one per rack, each STS serving the single-corded switch in that rack. STS Input A from PDU-A (UPS-A path), STS Input B from PDU-B (UPS-B path). Output to network switch.
      </p>

      <p style={S.p}>
        <strong>Result:</strong> UPS-A failure scenario — 50 STS units simultaneously
        detect Source A undervoltage → transfer to Source B in 2–4 ms → network switches
        continue operating → zero connectivity impact → Tier IV fault tolerance achieved
        for entire infrastructure including single-corded legacy equipment.
      </p>

      <ComparisonTable
        headers={["Parameter", "Value"]}
        rows={[
          ["STS units deployed", "50 (one per rack)"],
          ["STS rating per unit", "32A, 3-phase, 230/400V"],
          ["Transfer time achieved", "2.8 ms average (synchronized UPS outputs)"],
          ["Load impact on transfer", "Zero — make-before-break (sources synchronized)"],
          ["Annual testing method", "Simulated UPS-A shutdown, verified NMS alarms, verified switches operational"],
          ["OEM used", "Application-specific — verify with current OEM"],
        ]}
      />

      <h2 id="interview-questions" style={S.h2}>Interview Questions</h2>

      <ComparisonTable
        headers={["Question", "Key Points in Answer"]}
        rows={[
          ["What is the difference between an STS and an ATS?", "SCR vs mechanical; 2–4ms vs 100–500ms; make-before-break possible vs not; IT load suitability"],
          ["Why does an STS transfer in 4ms?", "Detection time + zero crossing wait + SCR commutation — pure SCR switching happens in microseconds"],
          ["Why is phase synchronization important for an STS?", "Required for make-before-break; out-of-phase connection = circulating currents = equipment damage"],
          ["What are the alternatives for a single-corded server?", "STS (external switching), dual PSU upgrade, or accept single-path risk"],
          ["What are the STS failure modes?", "SCR open/closed failure, control logic failure, both sources simultaneous failure"],
          ["What is the role of the STS in Tier IV?", "Gives single-corded loads 2N path redundancy; dual-corded loads do not need an STS"],
          ["What happens on STS overload?", "Alarm + possible manual bypass; upstream breaker trips on short circuit; the STS itself is not a circuit breaker"],
          ["Difference between make-before-break and break-before-make?", "Synchronized sources: seamless MBB. Out-of-sync: brief BBM interruption. Both transfer in 2–4ms total"],
        ]}
      />

      <h2 id="key-takeaways" style={S.h2}>Key Takeaways</h2>

      <ul style={S.ul}>
        <li>
          <strong>STS = solid-state source switching in 2–4 ms</strong> — gives single-corded loads dual-path protection without IT equipment awareness.
        </li>
        <li>
          <strong>SCR (thyristor) technology</strong> enables fast, no-arc, no-wear
          switching — completely different from mechanical ATS.
        </li>
        <li>
          <strong>Phase synchronization = make-before-break</strong> (zero interruption);
          out-of-sync = brief break-before-make. Most dual-UPS setups are naturally synchronized.
        </li>
        <li>
          <strong>STS does NOT provide battery backup</strong> — it only switches between two
          live sources. If both fail, STS cannot help. Always pair with{" "}
          <TopicLink slug="ups" variant="inline" /> for complete protection.
        </li>
        <li>
          <strong>Maintenance bypass is mandatory</strong> for production STS — it allows
          STS servicing without load interruption, but removes automatic transfer capability.
        </li>
        <li>
          <strong>Tier IV requires 2N architecture</strong> — STS is the enabler for
          single-corded equipment to achieve same redundancy as dual-corded equipment.
        </li>
        <li>
          <strong>Load balancing</strong> — mix preferred source priorities across multiple
          STS units to distribute load evenly between UPS-A and UPS-B.
        </li>
        <li>
          Annual transfer testing is mandatory — being right at commissioning does not guarantee being right in operations. Verify annually.
        </li>
        <li>
          <strong>Actual STS implementation always depends on project requirements,
          utility specifications, OEM design, and Data Center architecture.</strong>
        </li>
      </ul>

      <p style={S.p}>
        For further reading: <TopicLink slug="ups" variant="inline" /> (power source that feeds STS), <TopicLink slug="battery-bank" variant="inline" /> (energy storage behind the UPS), <TopicLink slug="pdu" variant="inline" /> (distribution downstream of UPS/STS).
      </p>
    </>
  );
}
