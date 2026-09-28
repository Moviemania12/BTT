"use client";

import { S, Callout, ComparisonTable } from "../shared";
import TopicLink from "@/components/TopicLink";
import Image from "next/image";

export default function EnrollmentAndIntegration() {
  return (
    <>
      <h2 id="enrollment" style={S.h2}>Enrollment — Getting It Right</h2>

      <p style={S.p}>
        Enrollment is the process in which the user's biometric data is captured and a template is created. Enrollment quality directly impacts field performance — poor enrollment = high FRR in daily use. Enrollment should happen in a controlled environment: clean sensor, proper lighting, trained operator, multiple sample captures.
      </p>

      <p style={S.p}>
        For fingerprint enrollment: the finger must be clean, proper placement (full contact, correct pressure, consistent angle), enroll multiple fingers (index + middle typically), and multiple samples per finger. For face enrollment: neutral expression, front-facing, adequate lighting, consider both glasses on/off if the person wears glasses daily. For iris enrollment: steady eye position, correct distance, no blinking during capture.
      </p>

      <Callout type="best-practice" title="Enrollment Operator Training — Often Overlooked">
        Enrollment quality directly determines system performance. Untrained operators enroll poor templates — constant FRR complaints come in. Get dedicated trained staff or security system integrator assistance for enrollment. Keep a re-enrollment option — poor templates should be replaceable at the user's request.
      </Callout>

      <h2 id="system-architecture" style={S.h2}>System Architecture and Integration</h2>

      <figure style={{ margin: "2rem 0" }}>
        <div style={{ border: "1px solid #e2e8f0", borderRadius: "12px", overflow: "hidden" }}>
          <Image
            src="/images/articles/biometrics/biometrics-architecture.svg"
            alt="Biometric system architecture showing biometric reader connecting to access controller or biometric server which integrates with access management software"
            width={1200}
            height={600}
            style={{ width: "100%", height: "auto", display: "block" }}
          />
        </div>
        <figcaption style={{ fontSize: "0.85rem", color: "#4b5563", marginTop: "0.6rem", textAlign: "center", fontStyle: "italic" }}>
          Biometric architecture: Reader → Controller/Biometric Server → Access Management Software → Door Hardware
        </figcaption>
      </figure>

      <p style={S.p}>
        There are two primary approaches to biometric integration. <strong>Reader-controller direct integration:</strong> The biometric reader does the match in its onboard processor and sends the result (match/no-match) to the access controller over Wiegand or OSDP — the controller controls the door. The template is stored on the reader or a local server. <strong>Biometric server integration:</strong> The reader captures, the server matches, the result goes to the access control software — better centralized management and scalability.
      </p>

      <p style={S.p}>
        Integration with the <TopicLink slug="access-control" variant="inline" /> system is essential in a typical data center deployment — biometric standalone door control is rarely used. Multi-factor: tap the card, then present the fingerprint — the controller opens the door when both are verified. Integration happens through the OEM SDK, API or standard protocols — the specific approach depends on the OEM and project.
      </p>

      <h2 id="liveness" style={S.h2}>Liveness Detection</h2>

      <p style={S.p}>
        Liveness detection ensures that the biometric is coming from a genuine live person — not from a fake (printed photo, silicone fingerprint, video replay). Without liveness detection, spoofing attacks are easier. Modern face recognition systems typically include liveness detection — micro-expressions, depth sensing (3D camera), random action prompts (blink, turn head). Fingerprint liveness detection checks pulse, conductivity or subcutaneous details (better in ultrasonic sensors).
      </p>

      <p style={S.p}>
        Liveness detection effectiveness depends heavily on the OEM and implementation — verify vendor claims, look at third-party testing reports. For high-security deployments prefer certified liveness detection.
      </p>

      <h2 id="fallback-authentication" style={S.h2}>Fallback Authentication</h2>

      <p style={S.p}>
        Biometric systems can fail — dirty sensor, the user got injured, poor enrollment quality. Fallback authentication — typically a PIN or card — is critical so that authorized users do not get locked out. Manage the fallback carefully: it should be available but not circumvent the security purpose. Fallback events must be logged and periodically reviewed — frequent fallback use indicates that the biometric system is not performing properly.
      </p>

      <Callout type="warning" title="Fallback as Security Bypass — Prevent It">
        If the fallback (PIN) is too easy or widely known, users avoid the biometric and always use the fallback — the security purpose of the biometric is defeated. The fallback PIN must be unique per user, changed regularly, and fallback use must be tracked.
      </Callout>

      <h2 id="cybersecurity-privacy" style={S.h2}>Cybersecurity and Privacy Considerations</h2>

      <p style={S.p}>
        Biometric templates are sensitive data — you can replace passwords, not biometrics. Template theft or compromise is a serious long-term risk. Storage security is essential: encrypted templates, access-controlled database, network segmentation. On-card template storage is one approach — the template stays on the user's card, not on the server; on a server compromise the templates are not at risk.
      </p>

      <p style={S.p}>
        Biometric template compromise may have long-term privacy and security consequences — templates unlike passwords, cannot be changed. Requirements related to consent, lawful processing, retention, deletion, encryption, access control and data residency depend on the applicable jurisdiction, organization policy and contractual/regulatory obligations. Verify project-specific requirements with local legal counsel — regulations vary by jurisdiction and sector.
      </p>

      <h2 id="preventive-maintenance" style={S.h2}>Preventive Maintenance</h2>

      <p style={S.p}>
        Below are example maintenance activities — adjust the actual schedule according to OEM recommendations, site conditions and client policy.
      </p>

      <ul style={S.ul}>
        <li><strong>Regular sensor cleaning:</strong> Fingerprint sensors accumulate dust, oil and fingerprints — use the manufacturer-specified cleaning method. High-traffic sensors need daily cleaning.</li>
        <li><strong>Face recognition camera:</strong> Clean the lens, check lighting conditions, verify camera positioning.</li>
        <li><strong>Template database backup:</strong> Back up enrollment data — if it is lost, all users have to re-enroll.</li>
        <li><strong>Performance monitoring:</strong> Monitor the FRR trend — increasing FRR indicates sensor degradation or a template quality issue.</li>
        <li><strong>Firmware updates:</strong> Update reader and server firmware — security patches and performance improvements.</li>
        <li><strong>Enrollment audit:</strong> Promptly delete biometric templates of terminated employees — revoking the access control credential does not automatically delete the biometric template — verify it.</li>
      </ul>
    </>
  );
}
