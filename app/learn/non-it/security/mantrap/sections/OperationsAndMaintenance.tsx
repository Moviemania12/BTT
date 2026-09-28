"use client";

import { S, Callout, ComparisonTable } from "../shared";
import TopicLink from "@/components/TopicLink";

export default function OperationsAndMaintenance() {
  return (
    <>
      <h2 id="occupancy-detection" style={S.h2}>Occupancy and Presence Detection</h2>

      <p style={S.p}>
        Occupancy detection is the technical backbone of the mantrap's anti-tailgating function. When more than one person is detected in the vestibule, the inner door does not open. Common technologies:
      </p>

      <ul style={S.ul}>
        <li><strong>PIR (Passive Infrared) Motion Sensor:</strong> Detects the heat signature. Fast, cost-effective, widely used. Limitation: it does not count — it only detects presence.</li>
        <li><strong>Weight-sensing floor:</strong> Measures actual weight from floor pressure — configure the weight range of one person. More definitive count but maintenance intensive and false positives possible.</li>
        <li><strong>Overhead camera-based people counting:</strong> An overhead IP camera counts persons with AI analytics. Most accurate but higher cost and software dependent.</li>
        <li><strong>IR beam break sensors:</strong> Horizontal beams on the door frame — count persons entering/exiting. Good accuracy, less affected by clothing/luggage.</li>
      </ul>

      <p style={S.p}>
        Sensor selection depends on site requirements, budget and the acceptable false alarm rate. Most data center mantraps use a multi-sensor approach — for redundancy and accuracy. Regular sensor calibration and testing are essential — a dirty or misaligned sensor causes false alarms or missed detections.
      </p>

      <h2 id="anti-tailgating" style={S.h2}>Anti-Tailgating Measures</h2>

      <p style={S.p}>
        The fundamental anti-tailgating mechanism of the mantrap is the interlock — but supplementary measures increase effectiveness. CCTV cameras in the vestibule — every attempt is recorded. Video analytics can automatically detect tailgating attempts. Configure mantrap timing: the outer door should close automatically in a few seconds (forced close timer). Security operator alert for manual override.
      </p>

      <p style={S.p}>
        Staff training is equally important — a culture of authorized users following the mantrap procedure has to be built. Even authorized users should report it when they see a tailgating attempt. Regular security awareness reinforcement complements the technical measures of the mantrap.
      </p>

      <h2 id="emergency-release" style={S.h2}>Emergency Release and Fire Integration</h2>

      <p style={S.p}>
        Emergency release is one of the most critical design elements of a mantrap. If a person gets stuck in the vestibule — both doors locked, power failure, system fault — a rapid release mechanism is essential. Standard approaches:
      </p>

      <ul style={S.ul}>
        <li><strong>Manual emergency release:</strong> Emergency release provision inside and/or outside the vestibule — the exact type, location and behavior are per the approved design and AHJ requirements.</li>
        <li><strong>Remote release:</strong> The security operator should be able to release doors remotely from the NOC or the VMS interface.</li>
        <li><strong>Intercom:</strong> Intercom in the vestibule — so a person stuck inside can communicate with the security team.</li>
        <li><strong>Fire alarm / life-safety interface:</strong> Fire alarm/access control interface per the approved life-safety sequence of operations — the exact behavior is configured per the applicable code, AHJ requirements and approved design.</li>
      </ul>

      <Callout type="danger" title="Emergency Release — Test It, Don't Assume">
        Test emergency release mechanisms regularly — monthly or quarterly. Discovering in a real emergency that the break-glass was not working or the intercom was dead — is catastrophic. Maintain a testing log. Do the fire integration test annually with the fire team.
      </Callout>

      <h2 id="integration" style={S.h2}>Integration with Access Control, CCTV and Biometrics</h2>

      <p style={S.p}>
        The full security value of the mantrap comes from integration. The <TopicLink slug="access-control" variant="inline" /> system provides credential authentication — the outer and inner door readers are connected to the access controller. Access logs record mantrap entry/exit. Anti-passback can also be configured on the mantrap.
      </p>

      <p style={S.p}>
        <TopicLink slug="cctv" variant="inline" /> is essential in the mantrap — cover all three angles: outer entry, vestibule interior and inner entry. WDR cameras handle backlighting. Automatic CCTV recording and snapshot on an access event. Instant CCTV review for the security operator on tailgating detection.
      </p>

      <p style={S.p}>
        <TopicLink slug="biometrics" variant="inline" /> for multi-factor authentication in the mantrap — card swipe at the outer door, fingerprint or face recognition at the inner door. This combination gives very high assurance that the authenticated person is actually authorized.
      </p>

      <h2 id="cybersecurity" style={S.h2}>Cybersecurity Considerations</h2>

      <p style={S.p}>
        The mantrap controller/PLC is network-connected — cybersecurity controls apply. Keep the controller on a dedicated network segment. Change default credentials. Maintain firmware updates. Physical access to the controller cabinet must be restricted — by tampering with the controller, bypassing the interlock logic is possible.
      </p>

      <p style={S.p}>
        Remote management is convenient but needs encrypted, authenticated access — open remote access is a security risk. Keep a controller configuration backup — so a rapid restore is possible on failure.
      </p>

      <h2 id="preventive-maintenance" style={S.h2}>Preventive Maintenance</h2>

      <p style={S.p}>
        Below are example maintenance activities — adjust the actual schedule according to OEM recommendations, site policy and applicable requirements.
      </p>

      <h3 style={S.h3}>Monthly Checks (Example)</h3>
      <ul style={S.ul}>
        <li>Test the full interlock sequence — open the outer door, verify the inner door is locked; outer closed, inner opens; verify a both-open attempt is rejected</li>
        <li>Occupancy sensor test — one person enters, the inner door should open; simulate tailgating (two people), the inner door should stay locked and an alarm should generate</li>
        <li>Emergency release test — activate the emergency release mechanism (per the approved test procedure), verify the behavior matches the approved design and sequence of operations</li>
        <li>Intercom test — verify communication from the vestibule to the security desk</li>
        <li>CCTV coverage check — cameras clean, properly aimed, recording</li>
        <li>Door closer/hinge — proper operation, auto-close timing</li>
      </ul>

      <h3 style={S.h3}>Quarterly Checks (Example)</h3>
      <ul style={S.ul}>
        <li>EM lock holding force test</li>
        <li>Door contact sensor alignment verify</li>
        <li>Occupancy sensor sensitivity calibration</li>
        <li>Fire alarm integration test (coordinate with fire team)</li>
        <li>Controller configuration backup verify</li>
        <li>Full access log review — anomalies, failed attempts</li>
      </ul>
    </>
  );
}
