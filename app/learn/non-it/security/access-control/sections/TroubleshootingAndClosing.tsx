"use client";

import { S, Callout, ComparisonTable } from "../shared";
import TopicLink from "@/components/TopicLink";
import { faqs } from "../metadata";

export default function TroubleshootingAndClosing() {
  return (
    <>
      <h2 id="troubleshooting" style={S.h2}>Engineer Troubleshooting — Step-by-Step</h2>

      <h3 style={S.h3}>Fault 1: Card Presented — No Response / Door Does Not Open</h3>
      <p style={S.p}>
        <strong>First check:</strong> Look at the reader LED/beep response — was the card read? Does the LED change or is it silent? If there is no response at all, check the reader power.
      </p>
      <p style={S.p}>
        <strong>Next check:</strong> Reader power — Wiegand readers are typically powered from the controller (12V DC). Check the controller PE LED status. If the reader is powered but there is no read — is the card type compatible with the reader? A 125 kHz card will not work on a 13.56 MHz reader.
      </p>
      <p style={S.p}>
        <strong>Isolate:</strong> Use a test card (known good). If the test card works — it is an issue with the original card (damaged, demagnetized, wrong format). If the test card also fails — reader or wiring issue.
      </p>
      <p style={S.p}>
        <strong>Corrective action:</strong> Replace the reader. Check cable continuity (Wiegand D0/D1 lines). If the controller port is damaged, replace the controller or use an alternate port. If it is a card issue, re-encode or replace it.
      </p>

      <h3 style={S.h3}>Fault 2: Card Read (Green LED) But Door Does Not Unlock</h3>
      <p style={S.p}>
        <strong>First check:</strong> Look at the event log in the access software — is access granted or denied? If "Access Denied" — note the reason: invalid credential, schedule restriction, APB violation, door not configured for this card.
      </p>
      <p style={S.p}>
        <strong>Next check:</strong> If "Access Granted" is in the log but the door did not open — check the lock wiring. Is the controller relay output properly connected to the lock?
      </p>
      <p style={S.p}>
        <strong>Isolate:</strong> Trigger the controller relay manually (from software or test mode) — does the lock release? If yes, the controller relay-to-lock wiring is OK. If no — check the lock power supply, check the lock itself.
      </p>
      <p style={S.p}>
        <strong>Corrective action:</strong> In the denied case — fix the credential schedule, reset APB, fix the door assignment. In the granted-but-locked case — tighten the lock terminal wiring, replace the lock if faulty, verify the PSU voltage.
      </p>

      <h3 style={S.h3}>Fault 3: Door Forced Open Alarm — Frequent/Recurring</h3>
      <p style={S.p}>
        <strong>First check:</strong> Check the door contact sensor alignment — when the door is fully closed, are the magnet and sensor properly aligned?
      </p>
      <p style={S.p}>
        <strong>Next check:</strong> Check the door hinge and closer — is the door closing and latching properly? Is the auto-closer adjusted? Is the door frame warped or settled?
      </p>
      <p style={S.p}>
        <strong>Corrective action:</strong> Realign the sensor. Adjust/replace the door closer. If it recurs at specific times — check CCTV, investigate potential actual unauthorized access.
      </p>

      <h3 style={S.h3}>Fault 4: Controller Offline / Not Communicating with Server</h3>
      <p style={S.p}>
        <strong>First check:</strong> Network connectivity — ping the controller IP from the server. Is it reachable? Switch port status?
      </p>
      <p style={S.p}>
        <strong>Next check:</strong> Check the controller power — are the LEDs normal? Is the controller web interface or display accessible?
      </p>
      <p style={S.p}>
        <strong>Isolate:</strong> Ping the controller locally — does it respond? If yes, it is a software/server side issue. If no — network cable, switch port, or controller network interface.
      </p>
      <p style={S.p}>
        <strong>Corrective action:</strong> Replace the network cable. Cycle the switch port. Verify the controller IP settings — DHCP lease expired? Static IP conflict? Is the server firewall blocking it? Reboot the controller. Note: modern controllers keep taking local decisions in standalone mode — the doors typically stay functional.
      </p>

      <h3 style={S.h3}>Fault 5: Access Granted But Door Physically Cannot Open</h3>
      <p style={S.p}>
        <strong>First check:</strong> EM lock — is the armature plate properly aligned? Is the armature plate dirty or rusty?
      </p>
      <p style={S.p}>
        <strong>Next check:</strong> Lock power — measure the voltage at the lock with a multimeter when the lock is released.
      </p>
      <p style={S.p}>
        <strong>Corrective action:</strong> Clean the armature plate and adjust the alignment. If the EM lock is getting insufficient release current — check for PSU voltage drop (voltage drop can be an issue on long cable runs). Replace the lock if it is mechanically stuck.
      </p>

      <h3 style={S.h3}>Fault 6: Controller PSU / Battery Failure</h3>
      <p style={S.p}>
        <strong>First check:</strong> Controller PSU LED status — fault indicator? Battery LED status?
      </p>
      <p style={S.p}>
        <strong>Next check:</strong> Disconnect mains and measure the battery on-load voltage — is it adequate? Is the battery holding nominal voltage under load?
      </p>
      <p style={S.p}>
        <strong>Corrective action:</strong> Replace the battery — per OEM specification and observed health data, not calendar-based replacement. Check the PSU output voltage — is the regulated output within spec? If the PSU is faulty, replace it. Commission the new battery and verify full charge.
      </p>

      <h3 style={S.h3}>Fault 7: Anti-Passback Violation — Person Locked Out</h3>
      <p style={S.p}>
        <strong>First check:</strong> Look at the person's access log in the software — what is the APB state? What are the last entry/exit records?
      </p>
      <p style={S.p}>
        <strong>Corrective action:</strong> Reset APB for this person in the software — allow the next access. Investigate the root cause: was the exit reader bypassed? Tailgated exit? Exited using REX without a card swipe? Is the APB configuration correct? Is the exit reader working?
      </p>

      <h3 style={S.h3}>Fault 8: All Doors on a Controller Not Working</h3>
      <p style={S.p}>
        <strong>First check:</strong> Controller power — completely dead? LEDs off?
      </p>
      <p style={S.p}>
        <strong>Next check:</strong> Check the PSU mains input and output. Fuse blown?
      </p>
      <p style={S.p}>
        <strong>Corrective action:</strong> Replace the PSU fuse (with the correct rating). Replace the PSU itself. If it is a controller hardware failure, replace it. Note: after controller replacement, restore the credential database from backup — or re-sync from the server.
      </p>

      <ComparisonTable
        title="Access Control Troubleshooting Quick Reference"
        headers={["Symptom", "First Check", "Next Check", "Likely Cause", "Corrective Action"]}
        rows={[
          ["Card read, door won't open", "Access log — granted or denied?", "Relay output / lock wiring", "Denied: schedule/config; Granted: lock/wiring fault", "Fix config or wiring/lock"],
          ["No reader response", "Reader power (12V DC)", "Card type compatibility", "Power loss or card mismatch", "Check wiring, replace reader/card"],
          ["Door forced alarm", "Door contact sensor alignment", "Door closer/latch mechanism", "Misaligned sensor or door not latching", "Realign sensor, adjust closer"],
          ["Controller offline", "Network ping to controller", "Controller power/display", "Network issue or controller fault", "Fix network/cable, reboot, replace if faulty"],
          ["APB lockout", "APB state in software", "Last entry/exit records", "Exit not recorded", "Reset APB, fix exit reader"],
          ["Door won't release (EM lock)", "Armature plate alignment", "PSU voltage at lock", "Misalignment or voltage drop", "Realign plate, check PSU/cable"],
          ["PSU/battery fault", "PSU LED indicators", "Battery voltage under load", "Battery degraded or PSU fault", "Replace battery/PSU per health data"],
          ["All controller doors dead", "Controller LEDs/power", "PSU mains input, fuse", "PSU failure or blown fuse", "Replace fuse/PSU, restore database"],
        ]}
      />

      <h2 id="advantages-limitations" style={S.h2}>Advantages and Limitations</h2>

      <h3 style={S.h3}>Advantages</h3>
      <ul style={S.ul}>
        <li>Centralized credential management — instant revoke, modify, schedule</li>
        <li>Complete audit trail — who accessed where, when, denied attempts</li>
        <li>Granular control — zone, schedule, multi-factor, anti-passback</li>
        <li>Integration capability — CCTV, biometrics, BMS, visitor management</li>
        <li>Scalability — from a small facility to enterprise multi-site</li>
        <li>Compliance evidence — ISO 27001, SOC 2, PCI-DSS audit support</li>
      </ul>

      <h3 style={S.h3}>Limitations</h3>
      <ul style={S.ul}>
        <li>A single-factor card alone — does not prevent tailgating and card sharing</li>
        <li>Power dependency — without PSU/battery backup, fail-safe locks can open</li>
        <li>Software/server single point of failure — plan proper redundancy</li>
        <li>Credential hygiene — stale accounts, unchanged schedules degrade security over time</li>
        <li>Cybersecurity risk — IP-based systems are a network attack surface</li>
        <li>Cost — multi-door, multi-site deployments significant upfront investment</li>
      </ul>

      <h2 id="illustrative-scenario" style={S.h2}>Illustrative Scenario</h2>

      <Callout type="interview" title="Note: This is an illustrative scenario — not a reference to any documented real facility">
        The scenario given below is meant to demonstrate the practical value of access control.
      </Callout>

      <p style={S.p}>
        In a data center the NOC operator gets an alert in the access management software — a technician's badge took access in the server hall at 2 AM, which is outside their approved schedule (approved: 8 AM – 8 PM weekdays only). The operator immediately checks the CCTV footage — confirmed, it is the same person. The security supervisor is contacted. Clarification is taken from the technician — their work was urgent and they had informed their supervisor, but the schedule had not been updated.
      </p>
      <p style={S.p}>
        What access control did in this scenario: it generated an after-hours access alert, cross-referencing with CCTV became possible, and a documented response became possible. Root cause — schedule not updated for approved overtime — a process gap was identified and fixed.
      </p>

      <h2 id="interview-questions" style={S.h2}>Interview Questions</h2>

      <h3 style={S.h3}>Q1: What is the difference between an access controller and an access server?</h3>
      <p style={S.p}>
        <strong>Answer:</strong> The controller is an edge device — readers, locks and sensors connect to it directly. The controller takes local decisions and stores credentials and rules in onboard memory. The server is the central management platform — credential enrollment, policy configuration, reporting and integrations. The controller syncs with the server but can take local decisions even when the server is offline (in modern controllers).
      </p>

      <h3 style={S.h3}>Q2: What is the difference between fail-safe and fail-secure, and when should each be used?</h3>
      <p style={S.p}>
        <strong>Answer:</strong> A fail-safe lock opens on power failure — the evacuation path stays clear. Fail-secure stays locked on power failure — higher security, but checking fire code compliance is essential. EM locks are always fail-safe. Electric strikes are available in both options. Required egress doors and electrically locked arrangements must respond according to the approved fire alarm/access control sequence of operations, applicable fire/life-safety code and AHJ requirements. In high-security areas lock selection and behavior are determined by the project-specific approved design — verify with fire code requirements and the AHJ.
      </p>

      <h3 style={S.h3}>Q3: What is anti-passback and how is it configured?</h3>
      <p style={S.p}>
        <strong>Answer:</strong> APB prevents the same credential from being used consecutively in the same direction. After an entry, a second entry before an exit is recorded is denied or alarmed. Soft APB — alarm on violation, access allowed. Hard APB — access denied. To configure: readers are needed on both entry and exit doors, define zones, apply APB rules per zone per access level. Hard APB is appropriate for data center server halls.
      </p>

      <h2 id="key-takeaways" style={S.h2}>Key Takeaways</h2>

      <ul style={S.ul}>
        <li>Access control = credential authentication + policy check + lock control + audit log. Every step matters.</li>
        <li>125 kHz proximity cards are legacy and low-security — prefer smart cards or mobile credentials.</li>
        <li>The OSDP protocol is significantly more secure than Wiegand — specify it in new deployments.</li>
        <li>The controller takes local decisions in standalone mode — doors typically stay functional when the server is offline.</li>
        <li>Anti-passback discourages tailgating and credential sharing — hard APB for high-security zones.</li>
        <li>DFO and DOTL alarms are meaningful with a response process — avoid alarm fatigue.</li>
        <li>Cybersecurity controls are essential — network segmentation, encrypted comms, firmware updates.</li>
        <li>Do regular access audits — remove stale accounts, verify schedules.</li>
      </ul>

      <h2 style={{ ...S.h2, marginTop: "3rem" }}>Frequently Asked Questions</h2>
      {faqs.map((item, i) => (
        <div key={i} style={{ marginBottom: "1.5rem", paddingBottom: "1.5rem", borderBottom: i < faqs.length - 1 ? "1px solid #e5e7eb" : "none" }}>
          <p style={{ ...S.p, fontWeight: 700, marginBottom: "0.4rem" }}>{item.q}</p>
          <p style={{ ...S.p, marginBottom: 0 }}>{item.a}</p>
        </div>
      ))}

      <h2 style={{ ...S.h2, marginTop: "3rem" }}>Related Learning Topics</h2>
      <ul style={S.ul}>
        <li><TopicLink slug="cctv" variant="inline" /> — visual surveillance that integrates with access control.</li>
        <li><TopicLink slug="biometrics" variant="inline" /> — Higher-assurance authentication for critical zones.</li>
        <li><TopicLink slug="mantrap" variant="inline" /> — a two-door airlock that prevents tailgating.</li>
        <li><TopicLink slug="visitor-management" variant="inline" /> — Temporary access provisioning workflow.</li>
      </ul>
    </>
  );
}
