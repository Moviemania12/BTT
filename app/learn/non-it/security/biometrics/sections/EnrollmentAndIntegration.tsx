"use client";

import { S, Callout, ComparisonTable } from "../shared";
import TopicLink from "@/components/TopicLink";
import Image from "next/image";

export default function EnrollmentAndIntegration() {
  return (
    <>
      <h2 id="enrollment" style={S.h2}>Enrollment — Getting It Right</h2>

      <p style={S.p}>
        Enrollment wo process hai jisme user ki biometric data capture hokar template create hoti hai.
        Enrollment quality directly field performance pe impact karti hai — poor enrollment = high FRR
        in daily use. Enrollment controlled environment mein hona chahiye: clean sensor, proper lighting,
        trained operator, multiple sample captures.
      </p>

      <p style={S.p}>
        Fingerprint enrollment ke liye: finger clean hona chahiye, proper placement (full contact, correct
        pressure, consistent angle), multiple fingers enroll karo (index + middle typically), aur multiple
        samples per finger. Face enrollment ke liye: neutral expression, front-facing, adequate lighting,
        glasses on/off both consider karo agar person daily glasses wear karta hai. Iris enrollment ke
        liye: steady eye position, correct distance, no blinking during capture.
      </p>

      <Callout type="best-practice" title="Enrollment Operator Training — Often Overlooked">
        Enrollment quality directly system performance determine karta hai. Untrained operators poor
        templates enroll karte hain — constant FRR complaints aate hain. Enrollment ke liye dedicated
        trained staff ya security system integrator assistance le lo. Re-enrollment option rakho —
        poor templates users ke request pe replace ho sakni chahiye.
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
        Biometric integration ke do primary approaches hain. <strong>Reader-controller direct
        integration:</strong> Biometric reader apne onboard processor mein match karta hai aur result
        (match/no-match) access controller ko Wiegand ya OSDP pe bhejta hai — controller door control
        karta hai. Template reader pe ya local server pe stored hoti hai. <strong>Biometric server
        integration:</strong> Reader capture karta hai, server match karta hai, result access control
        software ko jaata hai — centralized management, scalability better.
      </p>

      <p style={S.p}>
        <TopicLink slug="access-control" variant="inline" /> system ke saath integration typical data
        center deployment mein essential hai — biometric standalone door control rarely use hota hai.
        Multi-factor: card tap karo, phir fingerprint present karo — dono verify hone pe controller
        door open karta hai. Integration OEM SDK, API ya standard protocols se hoti hai — specific
        approach OEM aur project pe depend karta hai.
      </p>

      <h2 id="liveness" style={S.h2}>Liveness Detection</h2>

      <p style={S.p}>
        Liveness detection ensure karta hai ki biometric genuine live person se aa rahi hai — fake
        (printed photo, silicone fingerprint, video replay) se nahi. Without liveness detection,
        spoofing attacks easier hain. Modern face recognition systems typically liveness detection
        include karte hain — micro-expressions, depth sensing (3D camera), random action prompts
        (blink, turn head). Fingerprint liveness detection pulse, conductivity ya subcutaneous details
        check karta hai (ultrasonic sensors mein better).
      </p>

      <p style={S.p}>
        Liveness detection effectiveness OEM aur implementation pe heavily depend karta hai — vendor
        claims verify karo, third-party testing reports dekho. High-security deployments ke liye
        certified liveness detection prefer karo.
      </p>

      <h2 id="fallback-authentication" style={S.h2}>Fallback Authentication</h2>

      <p style={S.p}>
        Biometric systems fail ho sakte hain — sensor dirty, user ko injury hui, enrollment quality
        poor. Fallback authentication — typically PIN ya card — critical hai taaki authorized users
        locked out na ho jaayen. Fallback ko carefully manage karo: it should be available but not
        circumvent the security purpose. Fallback events log honi chahiye aur periodically review honi
        chahiye — frequent fallback use indicate karta hai ki biometric system properly performing
        nahi kar raha.
      </p>

      <Callout type="warning" title="Fallback as Security Bypass — Prevent Karo">
        Agar fallback (PIN) too easy hai ya widely known hai, users biometric avoid karke hamesha
        fallback use karte hain — biometric ka security purpose defeat ho jaata hai. Fallback PIN
        per-user unique honi chahiye, regularly changed honi chahiye, aur fallback use tracked hona
        chahiye.
      </Callout>

      <h2 id="cybersecurity-privacy" style={S.h2}>Cybersecurity and Privacy Considerations</h2>

      <p style={S.p}>
        Biometric templates sensitive data hain — passwords replace kar sakte ho, biometrics nahi.
        Template theft ya compromise serious long-term risk hai. Storage security essential hai:
        encrypted templates, access-controlled database, network segmentation. On-card template storage
        ek approach hai — template server pe nahi, user ke card pe rehti hai; server compromise pe
        templates at risk nahi hote.
      </p>

      <p style={S.p}>
        Biometric template compromise may have long-term privacy and security consequences — templates unlike passwords, cannot be changed. Requirements related to consent, lawful processing, retention, deletion, encryption, access control aur data residency applicable jurisdiction, organization policy aur contractual/regulatory obligations pe depend karte hain. Local legal counsel se project-specific requirements verify karo — regulations jurisdiction aur sector pe vary karte hain.
      </p>

      <h2 id="preventive-maintenance" style={S.h2}>Preventive Maintenance</h2>

      <p style={S.p}>
        Neeche example maintenance activities hain — actual schedule OEM recommendations, site conditions
        aur client policy ke hisaab se adjust karo.
      </p>

      <ul style={S.ul}>
        <li><strong>Regular sensor cleaning:</strong> Fingerprint sensors dust, oil aur fingerprints accumulate karte hain — manufacturer-specified cleaning method use karo. High-traffic sensors daily cleaning chahte hain.</li>
        <li><strong>Face recognition camera:</strong> Lens clean karo, lighting conditions check karo, camera positioning verify karo.</li>
        <li><strong>Template database backup:</strong> Enrollment data backup karo — loss hone pe sab users re-enroll karne padte hain.</li>
        <li><strong>Performance monitoring:</strong> FRR trend monitor karo — increasing FRR sensor degradation ya template quality issue indicate karta hai.</li>
        <li><strong>Firmware updates:</strong> Reader aur server firmware update karo — security patches aur performance improvements.</li>
        <li><strong>Enrollment audit:</strong> Terminated employees ki biometric templates promptly delete karo — access control credential revoke karne se biometric template automatically delete nahi hota — verify karo.</li>
      </ul>
    </>
  );
}
