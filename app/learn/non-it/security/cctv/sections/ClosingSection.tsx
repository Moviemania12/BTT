"use client";

import { S, Callout } from "../shared";
import TopicLink from "@/components/TopicLink";
import { faqs } from "../metadata";

export default function ClosingSection() {
  return (
    <>
      {/* ═══════════════════════════════════════════════════════════════
          SECTION 18 — ADVANTAGES & LIMITATIONS
      ═══════════════════════════════════════════════════════════════ */}
      <h2 id="advantages-limitations" style={S.h2}>Advantages and Limitations</h2>

      <h3 style={S.h3}>Advantages</h3>
      <ul style={S.ul}>
        <li><strong>Deterrence:</strong> Visible cameras reduce the probability of unauthorized activity.</li>
        <li><strong>Forensic evidence:</strong> Recorded footage is critical for investigation after incidents.</li>
        <li><strong>Remote monitoring:</strong> The NOC and security team can watch the live feed from anywhere.</li>
        <li><strong>Integration:</strong> With access control, biometrics and BMS you get a unified security picture.</li>
        <li><strong>Compliance:</strong> Provides evidence for ISO 27001, SOC 2, PCI-DSS and similar frameworks.</li>
        <li><strong>Operational visibility:</strong> Maintenance activity, delivery tracking and unauthorized access are monitored remotely.</li>
        <li><strong>Scalability:</strong> An IP CCTV system can gradually expand camera count and storage without full replacement.</li>
      </ul>

      <h3 style={S.h3}>Limitations</h3>
      <ul style={S.ul}>
        <li><strong>Reactive, not preventive:</strong> CCTV gives evidence after an incident happens — <TopicLink slug="access-control" variant="inline" /> and <TopicLink slug="mantrap" variant="inline" /> are essential for preventing physical intrusion.</li>
        <li><strong>Camera blind spots:</strong> Coverage gaps are always possible — planning and regular walk-throughs needed.</li>
        <li><strong>Storage management overhead:</strong> Retention policies, disk health, RAID management need ongoing attention.</li>
        <li><strong>Cybersecurity risk:</strong> IP cameras are an attack surface — unsecured cameras create serious risk.</li>
        <li><strong>Privacy considerations:</strong> Compliance with employee monitoring policies, local laws and data protection regulations is required.</li>
        <li><strong>Operator dependence:</strong> Without 24/7 monitoring, real-time response is limited — alerts and analytics reduce operator workload.</li>
        <li><strong>Image quality in challenging conditions:</strong> Backlighting, extreme temperatures and occlusion affect image quality.</li>
      </ul>

      {/* ═══════════════════════════════════════════════════════════════
          SECTION 19 — ILLUSTRATIVE SCENARIO
      ═══════════════════════════════════════════════════════════════ */}
      <h2 id="illustrative-scenario" style={S.h2}>Illustrative Scenario</h2>

      <Callout type="interview" title="Note: This is an illustrative scenario — not a reference to any documented real facility">
        The scenario given below is meant to demonstrate the practical value of a CCTV system. It is not a description of any specific facility.
      </Callout>

      <p style={S.p}>
        In a mid-size colocation data center, at 2 AM the NOC operator gets an alert in the VMS — motion detection triggered in server hall Zone 3. The operator checks the live feed — a technician is working near a rack. The operator checks the access control log — there is no log of anyone's access card at that time.
      </p>

      <p style={S.p}>
        The operator contacts him over the intercom — the technician says he had come to do maintenance but had not checked in. The security supervisor is informed. The footage is downloaded as evidence. The technician is properly identified and the incident is documented.
      </p>

      <p style={S.p}>
        What CCTV did in this scenario: real-time monitoring detected the unauthorized presence, it was cross-referenced with the access control log, and a documented response became possible. If there had been only access control — the tailgated entry would not have been detected. If there had been only CCTV without monitoring — nobody would have seen the alert in real time. The integration of both systems demonstrates the practical value.
      </p>

      {/* ═══════════════════════════════════════════════════════════════
          SECTION 20 — INTERVIEW QUESTIONS
      ═══════════════════════════════════════════════════════════════ */}
      <h2 id="interview-questions" style={S.h2}>Interview Questions</h2>

      <h3 style={S.h3}>Q1: What is the fundamental difference between IP CCTV and analog CCTV?</h3>
      <p style={S.p}>
        <strong>Answer:</strong> Analog cameras send an analog video signal over coaxial cable and the DVR decodes it. IP cameras send an already compressed digital stream over the network — the NVR or VMS receives it. IP cameras take power from PoE (single Cat6 cable), support higher resolution, give remote access, and deep integration with a VMS is possible. IP-based systems are standard in data centers.
      </p>

      <h3 style={S.h3}>Q2: What should you choose between an NVR and a VMS, and why?</h3>
      <p style={S.p}>
        <strong>Answer:</strong> An NVR is a dedicated hardware appliance — easy deployment, fixed channel count, lower cost. A VMS is a software platform — it runs on a standard server, highly scalable, deep integration with access control/BMS/analytics, multi-site management. For small deployments an NVR can be adequate. Architecture selection — dedicated NVR, VMS or hybrid — depends on scale, integration requirements, redundancy needs and the project specification.
      </p>

      <h3 style={S.h3}>Q3: What is RAID and why is it not a backup?</h3>
      <p style={S.p}>
        <strong>Answer:</strong> RAID combines multiple HDDs to give protection against disk hardware failure — the data stays available when one or two disks fail. But RAID does not protect against accidental deletion, ransomware, file corruption or a site disaster. A backup means an independent copy at a different location — RAID and backup are complementary, not substitutes. In CCTV, RAID ensures availability; the backup strategy has to be defined separately.
      </p>

      <h3 style={S.h3}>Q4: What are the top 3 most critical actions for CCTV cybersecurity?</h3>
      <p style={S.p}>
        <strong>Answer:</strong> First — change default credentials immediately on every camera, NVR and VMS — default creds = instant compromise. Second — isolate CCTV on a dedicated VLAN — separate from the production network. Third — do not give cameras direct internet access — use a VPN for remote access. These three actions cover the most common attack vectors.
      </p>

      <h3 style={S.h3}>Q5: A camera is offline — troubleshoot it step by step.</h3>
      <p style={S.p}>
        <strong>Answer:</strong> Step 1: Check the port status on the PoE switch — LED, power delivery in the management interface. Step 2: Ping the camera IP from the VMS server — is it reachable? Step 3: If not reachable — do a cable continuity test, try an alternate port. If reachable — open the camera web interface, is the stream active? Step 4: Check the camera configuration in the VMS — are the IP, port, credentials correct? Step 5: Re-add the camera in the NVR/VMS. If it still fails — consider a factory reset of the camera or replacement.
      </p>

      <h3 style={S.h3}>Q6: How is storage planning done — what factors should be considered?</h3>
      <p style={S.p}>
        <strong>Answer:</strong> Camera count, resolution per camera, frame rate (FPS), codec (H.264 vs H.265 — H.265 can use significantly less storage than H.264 at comparable quality, the actual saving varies), bitrate per camera, recording hours per day (continuous or motion-based), and retention period in days. Estimate with the VMS built-in calculator or manufacturer tools — manual calculation is an approximation. Add 25-30% overhead for the filesystem and safety margin. Also consider RAID overhead if a NAS is being used.
      </p>

      {/* ═══════════════════════════════════════════════════════════════
          SECTION 21 — KEY TAKEAWAYS
      ═══════════════════════════════════════════════════════════════ */}
      <h2 id="key-takeaways" style={S.h2}>Key Takeaways</h2>

      <ul style={S.ul}>
        <li>
          <strong>IP CCTV = network-based system.</strong> Camera → PoE Switch → Network → NVR/VMS → Storage → Monitoring. Every link in this chain is a point of failure — monitoring and redundancy are essential.
        </li>
        <li>
          <strong>The NVR is a hardware appliance, the VMS is a software platform.</strong> In enterprise data centers the architecture — NVR, VMS or hybrid — depends on scale, integration and project requirements.
        </li>
        <li>
          <strong>RAID gives availability, not backup.</strong> It protects against disk failure — not against accidental deletion, ransomware or a site disaster. Define the backup strategy separately.
        </li>
        <li>
          <strong>Cybersecurity controls are essential.</strong> Change default credentials, do VLAN isolation, avoid direct internet exposure. IP cameras are an attack surface.
        </li>
        <li>
          <strong>Time sync is critical.</strong> Configure NTP on all cameras and the NVR/VMS — a wrong timestamp destroys forensic value.
        </li>
        <li>
          <strong>CCTV integration multiplies physical security.</strong> An integrated system with access control, biometrics and BMS is far more effective than standalone.
        </li>
        <li>
          <strong>Systematic troubleshooting is essential.</strong> Isolate where the problem is — camera, cable, switch, network, NVR, or storage — random steps waste time.
        </li>
        <li>
          <strong>Do storage planning with the VMS calculator.</strong> Camera count, resolution, codec, FPS, recording mode and retention all factor in — verify the manual approximation with tools.
        </li>
      </ul>

      {/* ═══════════════════════════════════════════════════════════════
          FAQ SECTION (excluded from TOC per architecture)
      ═══════════════════════════════════════════════════════════════ */}
      <h2 style={{ ...S.h2, marginTop: "3rem" }}>Frequently Asked Questions</h2>

      {faqs.map((item, i) => (
        <div key={i} style={{ marginBottom: "1.5rem", paddingBottom: "1.5rem", borderBottom: i < faqs.length - 1 ? "1px solid #e5e7eb" : "none" }}>
          <p style={{ ...S.p, fontWeight: 700, marginBottom: "0.4rem" }}>{item.q}</p>
          <p style={{ ...S.p, marginBottom: 0 }}>{item.a}</p>
        </div>
      ))}

      {/* ═══════════════════════════════════════════════════════════════
          RELATED TOPICS
      ═══════════════════════════════════════════════════════════════ */}
      <h2 style={{ ...S.h2, marginTop: "3rem" }}>Related Learning Topics</h2>

      <p style={S.p}>
        CCTV is one layer of physical security. To understand the complete physical security system:
      </p>
      <ul style={S.ul}>
        <li>
          <TopicLink slug="access-control" variant="inline" /> — authentication-based access management of doors and zones. It integrates with CCTV for event-linked recording.
        </li>
        <li>
          <TopicLink slug="biometrics" variant="inline" /> — fingerprint, iris, face recognition — stronger authentication that, together with CCTV, gives verified identity evidence.
        </li>
        <li>
          <TopicLink slug="mantrap" variant="inline" /> — a two-door airlock that prevents tailgating. CCTV is critical in the mantrap — every attempt must be recorded.
        </li>
        <li>
          <TopicLink slug="visitor-management" variant="inline" /> — visitor check-in, badge, escort policy — CCTV supports visitor accountability.
        </li>
      </ul>
    </>
  );
}
