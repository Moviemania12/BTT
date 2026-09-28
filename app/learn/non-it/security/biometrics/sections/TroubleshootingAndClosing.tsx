"use client";

import { S, Callout, ComparisonTable } from "../shared";
import TopicLink from "@/components/TopicLink";
import { faqs } from "../metadata";

export default function TroubleshootingAndClosing() {
  return (
    <>
      <h2 id="troubleshooting" style={S.h2}>Engineer Troubleshooting — Step-by-Step</h2>

      <h3 style={S.h3}>Fault 1: User Cannot Authenticate — Repeated Rejection</h3>
      <p style={S.p}>
        <strong>First check:</strong> Is the sensor clean? Dust, oil or smudges on the fingerprint sensor? Clean it and retry.
      </p>
      <p style={S.p}>
        <strong>Next check:</strong> User enrollment quality — was the template captured properly? Verify the enrollment record in the system. Is the user presenting the finger properly (angle, pressure)?
      </p>
      <p style={S.p}>
        <strong>Isolate:</strong> Try another enrolled user on the same sensor — are they getting rejected too? If all users fail — sensor or system issue. If only a specific user — enrollment quality issue.
      </p>
      <p style={S.p}>
        <strong>Corrective action:</strong> Re-enroll the user properly in controlled conditions. If recurring — consider alternative biometric (face/iris) or fallback credential. Consider a threshold adjustment — carefully, after evaluating the FAR impact.
      </p>

      <h3 style={S.h3}>Fault 2: Biometric Reader Not Responding</h3>
      <p style={S.p}>
        <strong>First check:</strong> Reader power — LED status? Is it on? Check the power supply.
      </p>
      <p style={S.p}>
        <strong>Next check:</strong> Network connectivity — ping the reader IP (for IP-based readers). Check the RS-485/Wiegand connection.
      </p>
      <p style={S.p}>
        <strong>Corrective action:</strong> Power cycle it. Inspect the cable connection. Check the reader firmware — corrupt firmware can cause a reader deadlock. Replace if hardware fault.
      </p>

      <h3 style={S.h3}>Fault 3: Biometric Match Successful But Door Does Not Open</h3>
      <p style={S.p}>
        <strong>First check:</strong> Event log in the access control system — was the biometric match event received? Access granted or denied?
      </p>
      <p style={S.p}>
        <strong>Next check:</strong> Is the biometric-to-access-control integration working? Was the signal properly received?
      </p>
      <p style={S.p}>
        <strong>Corrective action:</strong> Verify the integration configuration — are the Wiegand output, relay output or API call correctly configured? Is the biometric credential properly mapped for the user on the access control side? Check the door hardware independently.
      </p>

      <h3 style={S.h3}>Fault 4: High FRR — Many Users Complaining of Rejection</h3>
      <p style={S.p}>
        <strong>First check:</strong> Sensor cleanliness — after heavy usage the sensor gets dirty. Check the sensor lighting conditions (face recognition).
      </p>
      <p style={S.p}>
        <strong>Next check:</strong> Enrollment quality — was a recent batch of users poorly enrolled? Are template quality scores available in the system?
      </p>
      <p style={S.p}>
        <strong>Corrective action:</strong> Clean the sensor. Re-enroll affected users. Adjust the threshold carefully — a lower threshold reduces FRR but increases FAR. Improve environmental conditions (lighting, temperature).
      </p>

      <h3 style={S.h3}>Fault 5: Face Recognition Failing in Certain Conditions</h3>
      <p style={S.p}>
        <strong>First check:</strong> Lighting — backlighting (strong light behind user), insufficient
        light, or flickering light source?
      </p>
      <p style={S.p}>
        <strong>Next check:</strong> Camera positioning — from which angle should the user approach? Is the camera height appropriate?
      </p>
      <p style={S.p}>
        <strong>Corrective action:</strong> Improve lighting — dedicated illumination in the reader area. Adjust the camera angle. If masks/glasses are causing it — configure a mask-compatible model or use the fallback. Re-enroll users with current appearance if significantly changed.
      </p>

      <h3 style={S.h3}>Fault 6: Biometric Server/Software Not Accessible</h3>
      <p style={S.p}>
        <strong>First check:</strong> Server network ping. Are the server services running?
      </p>
      <p style={S.p}>
        <strong>Next check:</strong> Database connectivity, disk space, memory.
      </p>
      <p style={S.p}>
        <strong>Corrective action:</strong> Restore services by restarting the server. Check database health. Free up disk space. If the readers support local matching — verify that they can authenticate locally when the server is down (degraded mode).
      </p>

      <ComparisonTable
        title="Biometrics Troubleshooting Quick Reference"
        headers={["Symptom", "First Check", "Next Check", "Likely Cause", "Corrective Action"]}
        rows={[
          ["User consistently rejected", "Sensor cleanliness", "Enrollment quality/template", "Poor enrollment or dirty sensor", "Clean sensor, re-enroll user"],
          ["All users failing", "Sensor power/LED", "System/server connectivity", "Sensor fault or server down", "Power cycle, fix server, replace sensor"],
          ["Match OK, door won't open", "Access control event log", "Integration configuration", "Integration misconfiguration", "Fix Wiegand/relay/API integration"],
          ["High FRR complaints", "Sensor dirty / lighting", "Threshold setting", "Environmental or threshold issue", "Clean, adjust threshold carefully"],
          ["Face recognition fails at entry", "Lighting conditions", "Camera angle/height", "Backlighting or poor positioning", "Add dedicated lighting, adjust camera"],
          ["Server not accessible", "Ping server, services status", "DB, disk space, memory", "Server fault or resource exhaustion", "Restart services, fix resources"],
        ]}
      />

      <h2 id="advantages-limitations" style={S.h2}>Advantages and Limitations</h2>

      <h3 style={S.h3}>Advantages</h3>
      <ul style={S.ul}>
        <li>Credential cannot be shared or forgotten — "who you are" is always with you</li>
        <li>Higher assurance than card/PIN alone — significantly harder to impersonate</li>
        <li>Audit trail includes biometric verification event — stronger evidence</li>
        <li>Multi-factor with card — requirement of two independent factors</li>
        <li>Contactless options (face, iris) — hygienic, convenient high-traffic use</li>
      </ul>

      <h3 style={S.h3}>Limitations</h3>
      <ul style={S.ul}>
        <li>Enrollment quality dependent — poor enrollment = high FRR in daily use</li>
        <li>Environmental sensitivity — dirty sensor, lighting, physical changes affect accuracy</li>
        <li>Biometric cannot be revoked if compromised — unlike password or card</li>
        <li>Privacy implications — sensitive data, regulatory compliance required</li>
        <li>Higher cost than card-only readers</li>
        <li>Accessibility concerns — users with certain physical conditions may not authenticate reliably</li>
      </ul>

      <h2 id="illustrative-scenario" style={S.h2}>Illustrative Scenario</h2>

      <Callout type="interview" title="Note: This is an illustrative scenario — not a reference to any documented real facility">
        The scenario given below is meant to demonstrate the practical challenges of a biometric system.
      </Callout>

      <p style={S.p}>
        In a data center the NOC team was receiving daily complaints that engineers of one specific shift were consistently failing at the fingerprint readers. The investigation found that those engineers also did cooling plant maintenance — their hands were typically contaminated with machine oil. The fingerprint readers could not reliably read their worn, oily fingerprints.
      </p>
      <p style={S.p}>
        Solution: face recognition readers were installed in parallel for those engineers, and a card + face combination was configured in their access profile. The fingerprint FRR complaints stopped for that group. Lesson: a single biometric modality is not suitable for every user — include flexibility in planning.
      </p>

      <h2 id="interview-questions" style={S.h2}>Interview Questions</h2>

      <h3 style={S.h3}>Q1: What are FAR and FRR and how are they balanced?</h3>
      <p style={S.p}>
        <strong>Answer:</strong> FAR = the rate of an unauthorized person being accepted by mistake. FRR = the rate of an authorized person being rejected by mistake. The two are inversely related — they are balanced through the matching threshold. High security (low FAR) = stricter threshold = more FRR. The optimal threshold depends on site conditions, enrollment quality and security requirements — there is no universal value.
      </p>

      <h3 style={S.h3}>Q2: Why is enrollment quality so important?</h3>
      <p style={S.p}>
        <strong>Answer:</strong> The enrollment template determines field performance. A poor quality template — wrong angle, partial capture, on a dirty sensor — causes consistently high FRR. Do enrollment in a controlled environment, with a trained operator, on a clean sensor. Capture multiple samples. Keep a re-enrollment option for users who consistently fail.
      </p>

      <h3 style={S.h3}>Q3: What is the risk if biometric data is compromised?</h3>
      <p style={S.p}>
        <strong>Answer:</strong> If a password is compromised you can change it. Biometric data compromise is a permanent risk — a fingerprint or iris cannot be changed. Store templates encrypted, in an access-controlled database. Consider the on-card storage option. Biometric template theft is a serious long-term security and privacy risk — server security is essential.
      </p>

      <h2 id="key-takeaways" style={S.h2}>Key Takeaways</h2>
      <ul style={S.ul}>
        <li>Biometrics verify "who you are" — stronger assurance than a card or PIN, but not perfect.</li>
        <li>FAR and FRR are inversely related — the threshold setting balances security and convenience.</li>
        <li>Enrollment quality directly determines field FRR — a trained operator, clean sensor and controlled environment are essential.</li>
        <li>Liveness detection is an important countermeasure against spoofing attacks.</li>
        <li>Biometric data is sensitive — encrypted storage, access control and privacy regulation compliance are essential.</li>
        <li>Plan fallback authentication — but track fallback events.</li>
        <li>A single modality is not suitable for every user — plan for flexibility.</li>
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
        <li><TopicLink slug="access-control" variant="inline" /> — the access control system that biometrics integrate with.</li>
        <li><TopicLink slug="mantrap" variant="inline" /> — biometric authentication is a critical component of the mantrap.</li>
        <li><TopicLink slug="cctv" variant="inline" /> — visual verification that combines with biometrics.</li>
        <li><TopicLink slug="visitor-management" variant="inline" /> — the role of biometrics in visitor identity verification.</li>
      </ul>
    </>
  );
}
