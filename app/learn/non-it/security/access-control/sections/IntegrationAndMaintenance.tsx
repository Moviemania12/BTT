"use client";

import { S, Callout, ComparisonTable } from "../shared";
import TopicLink from "@/components/TopicLink";

export default function IntegrationAndMaintenance() {
  return (
    <>
      <h2 id="integration" style={S.h2}>Integration with CCTV, Biometrics and BMS</h2>

      <p style={S.p}>
        Access control is not just standalone door management — it is the backbone of the integrated physical security system. When an access event triggers (valid entry, denied attempt, door alarm), integrated systems can respond automatically.
      </p>

      <p style={S.p}>
        <strong>CCTV integration:</strong> On an access event, <TopicLink slug="cctv" variant="inline" /> starts recording on the relevant camera, saves a snapshot, and an event-linked thumbnail appears in the VMS. The security operator can see the access log and video simultaneously from one screen. An automatic camera popup on denied attempts is very useful in critical areas.
      </p>

      <p style={S.p}>
        <strong>Biometrics integration:</strong> The <TopicLink slug="biometrics" variant="inline" /> reader integrates with the access control controller — when the biometric matches, a "valid credential" signal goes to the controller. For multi-factor authentication a card + biometric combination can be configured — the door opens only when both are verified.
      </p>

      <p style={S.p}>
        <strong>BMS integration:</strong> The BMS can receive access control events — for HVAC zone control, lighting automation and facility status monitoring. Life-safety lock release logic is implemented through the fire alarm/access control interface and approved control hardware per the approved sequence of operations — the BMS is typically not the primary life-safety release path. The BMS can participate in non-life-safety integration where designed. Integration capability depends on the OEM and project.
      </p>

      <p style={S.p}>
        <strong>Visitor Management integration:</strong> The <TopicLink slug="visitor-management" variant="inline" /> system creates temporary credentials that are provisioned in the access control system — the visitor gets access to specific doors for a specified time, and the credential automatically expires when the visit is complete.
      </p>

      <h2 id="cybersecurity" style={S.h2}>Cybersecurity Considerations</h2>

      <p style={S.p}>
        IP-based access control systems are network-connected devices — cybersecurity controls are essential. If the access control server is compromised, an attacker can add/modify credentials, delete audit logs, or unlock doors remotely.
      </p>

      <ul style={S.ul}>
        <li><strong>Network segmentation:</strong> Keep the access control network on a VLAN separate from the IT production network.</li>
        <li><strong>Encrypted communication:</strong> Controller-to-server and reader-to-controller (OSDP) communication must be encrypted.</li>
        <li><strong>Firmware updates:</strong> Update controller and reader firmware regularly — known vulnerabilities get patched.</li>
        <li><strong>Strong authentication for software:</strong> Admin accounts of the access management software should use multi-factor authentication.</li>
        <li><strong>Audit log integrity:</strong> Forward logs to tamper-evident storage or a SIEM — local-only logs can be deleted post-compromise.</li>
        <li><strong>Physical protection of controllers:</strong> There must be a physical lock on the controller cabinet — unauthorized persons must not get controller access.</li>
      </ul>

      <h2 id="preventive-maintenance" style={S.h2}>Preventive Maintenance</h2>

      <p style={S.p}>
        Below is an example maintenance schedule — adjust the actual frequency according to OEM recommendations, client policy, site conditions and applicable compliance requirements.
      </p>

      <h3 style={S.h3}>Monthly Checks (Example)</h3>
      <ul style={S.ul}>
        <li>All doors — present a card and verify access is granted/denied correctly</li>
        <li>Door contact sensors — do an open/close test, is the alarm generated correctly?</li>
        <li>REX sensors — test from the exit side, does the lock release and is the event logged?</li>
        <li>DFO/DOTL alarms — test by forcing the door briefly</li>
        <li>Controller PSU — test the battery backup (disconnect mains, verify the battery kicks in)</li>
        <li>Software — review pending credential changes, inactive accounts, expired schedules</li>
      </ul>

      <h3 style={S.h3}>Quarterly Checks (Example)</h3>
      <ul style={S.ul}>
        <li>EM lock holding force check — test at the manufacturer specified force (pull test)</li>
        <li>Reader cleaning — clean the lens/sensor surface, inspect the housing</li>
        <li>Wiring inspect — terminal screws, cable routing, any damage</li>
        <li>Access levels audit — was unnecessary access revoked after role changes?</li>
        <li>Anti-passback violations review — frequent violations indicate process gaps</li>
        <li>Integration test — verify CCTV popup, BMS signals</li>
      </ul>

      <h3 style={S.h3}>Annual Checks (Example)</h3>
      <ul style={S.ul}>
        <li>Battery replacement — controller PSU batteries per OEM recommendation and health data</li>
        <li>Full user access audit — review every credential, remove unnecessary ones</li>
        <li>Firmware updates — controller, readers, server software</li>
        <li>Complete end-to-end test — enroll test card, test all doors, verify logs, test alarms</li>
        <li>Disaster recovery test — verify controller standalone mode on server failure</li>
      </ul>
    </>
  );
}
