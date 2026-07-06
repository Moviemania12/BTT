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
        STS ke andar SCR modules, control board, aur power electronics fail ho sakte hain
        ya replace karne pad sakte hain. Without maintenance bypass, STS service karna
        load ko power off kiye bina impossible hai.
      </p>

      <p style={S.p}>
        Maintenance bypass ek separate switch hai jo load ko directly preferred source se
        connect karta hai, completely STS ko bypassing karte hue. Bypass mode mein:
      </p>

      <ul style={S.ul}>
        <li>Load continues to receive power — no interruption during STS maintenance</li>
        <li>Automatic transfer between sources NO LONGER available — single source only</li>
        <li>Source A failure in bypass mode = load power loss (manual action required)</li>
        <li>Keep bypass window minimal — treat as elevated risk period</li>
      </ul>

      <Callout type="danger" title="Bypass Mode is Not Normal Operation">
        Maintenance bypass mode mein STS ka protective function completely disabled hota hai.
        Kabhi bhi bypass mode mein unnecessary time spend mat karo. Transfer operations
        tabhi karo jab absolutely required ho, aur NOC ko notify karo ki site is in
        elevated risk state during bypass.
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
        SCR failure mein sabse dangerous scenario hai &quot;stuck closed&quot; — SCR permanently
        conduct karta rehta hai. Is case mein STS transfer nahi kar sakta — Source A
        fail hone par load bhi fail ho jaayega. Thermal imaging aur regular impedance
        testing se early degradation detect kar sakte hain before catastrophic failure.
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
        STS commissioning aur periodic testing ensure karta hai ki device actual fault pe
        expected behavior show kare. Testing schedule:
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
        Actual load pe transfer test karte waqt: agar sources synchronized hain toh
        make-before-break mode mein transfer completely invisible hoga. Servers continue
        running — no reboot, no interruption. Verify karo ki STS log mein transfer event
        recorded hua aur NMS ne alarm receive kiya. Successful transfer + no load impact
        = STS healthy aur operational.
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
        STS market mein limited OEMs hain jo specialized, high-reliability products offer
        karte hain. Yeh general industry observations hain — always verify current OEM
        datasheets aur India availability before selection.
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
        STS select karte waqt verify karo: (1) Transfer time specification (must be ≤ 4 ms),
        (2) SCR type aur interrupt rating for your fault current level, (3) Current rating
        with derating at your ambient temperature, (4) SNMP/Modbus support for your DCIM,
        (5) Maintenance bypass built-in or available, (6) India spare parts aur service
        availability. Cheapest STS for mission-critical load is false economy.
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
        Rule of thumb: IT equipment ke liye hamesha STS. Generator ya mains changeover
        ke liye jahan brief interruption acceptable ho, ATS cost-effective choice hai.
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
        STS aur <TopicLink slug="ups" variant="inline" /> complementary technologies hain.
        UPS grid failure se protect karta hai (with battery). STS single-corded equipment
        ko dual-path protection deta hai. Dono mila ke complete protection architecture
        banata hai.
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
        STS specify karte waqt IEC 62310-3 ke according performance specification maango —
        transfer time, voltage window, frequency window, synchronization requirements sab
        defined hone chahiye. Generic &quot;4ms transfer&quot; claim kaafi nahi — exact conditions
        under which 4ms is guaranteed specify karo (synchronized sources, load range, temperature).
      </Callout>

      <h2 id="real-dc-example" style={S.h2}>Real Data Center Example</h2>

      <p style={S.p}>
        <strong>Scenario:</strong> 500-rack Tier IV Data Center, dual UPS architecture.
        450 racks dual-corded servers. 50 racks mein legacy single-corded network switches.
      </p>

      <p style={S.p}>
        <strong>Problem:</strong> 50 racks ke switches sirf single power input support karte hain.
        Dual-bus architecture hai lekin yeh switches sirf Path A se connected hain.
        UPS-A failure pe 50 racks complete network connectivity lose kar denge — potential
        for entire data center connectivity outage even though servers are fine.
      </p>

      <p style={S.p}>
        <strong>Solution:</strong> 50 rack-mount STS units install kiye — ek per rack,
        each STS serving the single-corded switch in that rack. STS Input A from PDU-A
        (UPS-A path), STS Input B from PDU-B (UPS-B path). Output to network switch.
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
          ["STS aur ATS mein kya difference hai?", "SCR vs mechanical; 2–4ms vs 100–500ms; make-before-break possible vs not; IT load suitability"],
          ["STS 4ms mein transfer kyun karta hai?", "Detection time + zero crossing wait + SCR commutation — pure SCR switching microseconds mein hota hai"],
          ["Phase synchronization STS ke liye kyun important hai?", "Make-before-break ke liye required; out-of-phase connection = circulating currents = equipment damage"],
          ["Single-corded server ke liye alternatives kya hain?", "STS (external switching), dual PSU upgrade, or accept single-path risk"],
          ["STS failure modes kya hain?", "SCR open/closed failure, control logic failure, both sources simultaneous failure"],
          ["Tier IV mein STS ka role kya hai?", "Single-corded loads ko 2N path redundancy deta hai; dual-corded loads ko STS ki zaroorat nahi"],
          ["STS overload pe kya hoga?", "Alarm + possible manual bypass; upstream breaker trips on short circuit; STS khud circuit breaker nahi"],
          ["Make-before-break aur break-before-make mein farak?", "Synchronized sources: seamless MBB. Out-of-sync: brief BBM interruption. Both transfer in 2–4ms total"],
        ]}
      />

      <h2 id="key-takeaways" style={S.h2}>Key Takeaways</h2>

      <ul style={S.ul}>
        <li>
          <strong>STS = solid-state source switching in 2–4 ms</strong> — single-corded
          loads ko dual-path protection deta hai without IT equipment awareness.
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
          Annual transfer testing mandatory — commissioning pe sahi tha ka matlab operations
          mein bhi sahi hai guarantee nahi karta. Verify annually.
        </li>
        <li>
          <strong>Actual STS implementation always depends on project requirements,
          utility specifications, OEM design, and Data Center architecture.</strong>
        </li>
      </ul>

      <p style={S.p}>
        Aage padhne ke liye:{" "}
        <TopicLink slug="ups" variant="inline" /> (power source that feeds STS),{" "}
        <TopicLink slug="battery-bank" variant="inline" /> (energy storage behind the UPS),{" "}
        <TopicLink slug="pdu" variant="inline" /> (distribution downstream of UPS/STS).
      </p>
    </>
  );
}
