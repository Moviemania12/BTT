"use client";

import Image from "next/image";
import { S, Callout, ComparisonTable } from "../shared";
import TopicLink from "@/components/TopicLink";

export default function Basics() {
  return (
    <>
      <h2 id="what-is-biometrics" style={S.h2}>What Is Biometric Authentication?</h2>

      <p style={S.p}>
        Biometric authentication verifies identity through a person's unique physiological or behavioral characteristics. "Who you are" — not "what you have" (card) or "what you know" (PIN). Fingerprint, face, iris, palm vein — these are all physiological biometrics. Gait, voice, typing pattern — these are behavioral biometrics. In data centers mainly physiological biometrics are used — fingerprint, face recognition and iris recognition are the most common.
      </p>

      <p style={S.p}>
        The fundamental advantage of biometrics is that the credential is not physically separate — nobody forgets a card, nobody shares a PIN. But biometrics are not perfect either — false accepts, false rejects, enrollment quality, sensor conditions and privacy concerns are all real challenges. In data centers biometrics are typically combined with a card or PIN — multi-factor authentication that gives significantly higher assurance.
      </p>

      <figure style={{ margin: "2rem 0" }}>
        <div style={{ border: "1px solid #e2e8f0", borderRadius: "12px", overflow: "hidden" }}>
          <Image
            src="/images/articles/biometrics/biometrics-datacenter.svg"
            alt="Biometric fingerprint and face recognition readers installed at data center server room entrance"
            width={1200}
            height={675}
            style={{ width: "100%", height: "auto", display: "block" }}
            priority
          />
        </div>
        <figcaption style={{ fontSize: "0.85rem", color: "#4b5563", marginTop: "0.6rem", textAlign: "center", fontStyle: "italic" }}>
          Biometric readers in a Data Center — fingerprint scanner and face recognition terminal at the server room entry.
        </figcaption>
      </figure>

      <h2 id="why-required" style={S.h2}>Why Biometrics Is Required in a Data Center</h2>

      <p style={S.p}>
        Card-based access control is strong but has inherent limitations — a card can be shared, and unauthorized access is possible with a stolen card. A PIN can be shared or observed. Biometric authentication addresses these weaknesses — sharing or duplicating a fingerprint or iris is significantly harder.
      </p>

      <p style={S.p}>
        In high-security zones — server halls, NOC, colocation cages — multi-factor authentication (card + biometric) gives higher assurance. Multi-factor or higher-assurance authentication is selected according to the risk assessment, client security policy, regulatory requirements and the criticality of the protected area — biometrics are not universally mandatory but are a strong choice for high-security zones.
      </p>

      <h2 id="far-frr" style={S.h2}>FAR and FRR — Understanding Accuracy</h2>

      <p style={S.p}>
        The accuracy of a biometric system is measured by two metrics. <strong>FAR (False Acceptance Rate)</strong> — the rate of accepting an unauthorized person by mistake. <strong>FRR (False Rejection Rate)</strong> — the rate of rejecting an authorized person by mistake. The two are inversely related — when one goes down the other goes up, depending on the matching threshold setting.
      </p>

      <p style={S.p}>
        If you need high security (low FAR), keep the threshold strict — but authorized users will get more false rejects. If you need user convenience (low FRR), loosen the threshold — but FAR increases. The optimal threshold depends on site conditions, enrollment quality and security objectives — there is no universal correct value. <strong>EER (Equal Error Rate)</strong> is the point where FAR = FRR — useful for comparison but not a deployment target.
      </p>

      <Callout type="important" title="FAR/FRR Values — Evaluate Vendor Claims Carefully">
        Vendors often quote FAR/FRR under controlled laboratory conditions — real-world performance depends on environmental conditions, sensor cleanliness, enrollment quality and population diversity. Verify real-world performance through field testing and a pilot deployment before large-scale deployment.
      </Callout>

      <h2 id="technologies" style={S.h2}>Biometric Technologies</h2>

      <ComparisonTable
        title="Biometric Technology Comparison — Data Center Context"
        headers={["Technology", "How It Works", "Strengths", "Challenges", "DC Suitability"]}
        rows={[
          ["Fingerprint", "Ridge/minutiae pattern matching", "Cost-effective, mature, fast", "Dirty/wet hands, skin wear, age", "Very common — standard zones"],
          ["Face Recognition", "Facial geometry/feature matching", "Contactless, fast, camera-based", "Lighting, angle, mask/glasses, spoofing", "Entry, lobby, mantrap — growing adoption"],
          ["Iris Recognition", "Iris pattern (unique, stable)", "High accuracy, contactless, stable over time", "Cost, distance, eye conditions", "High-security vaults, critical areas"],
          ["Palm Vein", "Subcutaneous vein pattern (IR)", "Contactless, hard to spoof, hygienic", "Cost, less common", "Healthcare-adjacent, high hygiene areas"],
          ["Multi-modal", "Combines two+ biometrics", "Higher accuracy, harder to spoof", "Cost, complexity", "Highest-security zones"],
        ]}
      />

      <h2 id="fingerprint" style={S.h2}>Fingerprint Recognition</h2>

      <p style={S.p}>
        Fingerprint recognition is the most widely deployed biometric technology. Optical sensors capture an image; capacitive sensors map the fingerprint through an electric field; ultrasonic sensors capture subcutaneous detail — they give better performance even with wet/dirty fingers. The matching algorithm compares minutiae points (ridge endings, bifurcations) with the enrollment template.
      </p>

      <p style={S.p}>
        Practical challenges: workers whose fingerprints are worn (frequent manual work, aging), wet or dirty hands, cut fingers. At high-traffic entry points the fingerprint sensor can get dirty quickly — regular cleaning is necessary. If specific users consistently fail, consider an alternative biometric or a fallback credential.
      </p>

      <h2 id="face-recognition" style={S.h2}>Face Recognition</h2>

      <p style={S.p}>
        Modern face recognition extracts facial geometry from a 2D camera or uses a 3D depth sensor — more spoofing-resistant. Its contactless nature is convenient for high-traffic areas. Challenges: lighting changes (backlit entry, dim areas), accessories (masks, glasses, hats), significant appearance changes. Mask detection and mask-compatible models became common in the COVID era and are still used.
      </p>

      <h2 id="iris-recognition" style={S.h2}>Iris Recognition</h2>

      <p style={S.p}>
        The iris — the colored ring around the pupil — is a highly unique pattern that stays stable lifelong. It is captured with near-infrared illumination. Accuracy is typically higher than fingerprint. Contact lenses can cause interference — some systems detect them with specialized lighting. Higher cost and specific reader hardware make it more appropriate for high-security zones.
      </p>
    </>
  );
}
