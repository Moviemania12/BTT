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
        <strong>First check:</strong> Sensor clean hai? Fingerprint sensor pe dust, oil ya smudges?
        Clean karo aur retry karo.
      </p>
      <p style={S.p}>
        <strong>Next check:</strong> User enrollment quality — template properly captured tha? System
        mein enrollment record verify karo. User ka finger properly present kar raha hai (angle, pressure)?
      </p>
      <p style={S.p}>
        <strong>Isolate:</strong> Doosra enrolled user try karo same sensor pe — unhe bhi reject ho raha
        hai? Agar sab users fail — sensor ya system issue. Agar sirf specific user — enrollment quality
        issue.
      </p>
      <p style={S.p}>
        <strong>Corrective action:</strong> Re-enroll the user properly in controlled conditions. If
        recurring — consider alternative biometric (face/iris) or fallback credential. Threshold adjustment
        consider karo — carefully, FAR impact evaluate karke.
      </p>

      <h3 style={S.h3}>Fault 2: Biometric Reader Not Responding</h3>
      <p style={S.p}>
        <strong>First check:</strong> Reader power — LED status? On hai? Power supply check karo.
      </p>
      <p style={S.p}>
        <strong>Next check:</strong> Network connectivity — reader IP ping karo (IP-based readers mein).
        RS-485/Wiegand connection check karo.
      </p>
      <p style={S.p}>
        <strong>Corrective action:</strong> Power cycle karo. Cable connection inspect karo. Reader
        firmware check karo — corrupt firmware reader deadlock cause kar sakta hai. Replace if hardware fault.
      </p>

      <h3 style={S.h3}>Fault 3: Biometric Match Successful But Door Does Not Open</h3>
      <p style={S.p}>
        <strong>First check:</strong> Access control system mein event log — biometric match event
        received? Access granted ya denied?
      </p>
      <p style={S.p}>
        <strong>Next check:</strong> Biometric-to-access-control integration working hai? Signal properly
        received?
      </p>
      <p style={S.p}>
        <strong>Corrective action:</strong> Integration configuration verify karo — Wiegand output,
        relay output ya API call correctly configured? Access control side mein biometric credential
        properly mapped hai user ke liye? Door hardware check karo independently.
      </p>

      <h3 style={S.h3}>Fault 4: High FRR — Many Users Complaining of Rejection</h3>
      <p style={S.p}>
        <strong>First check:</strong> Sensor cleanliness — heavy usage ke baad sensor dirty ho jaata hai.
        Sensor lighting conditions (face recognition) check karo.
      </p>
      <p style={S.p}>
        <strong>Next check:</strong> Enrollment quality — recent batch of users poorly enrolled? Template
        quality scores available hai system mein?
      </p>
      <p style={S.p}>
        <strong>Corrective action:</strong> Clean sensor. Re-enroll affected users. Threshold carefully
        adjust karo — lower threshold FRR reduce karta hai lekin FAR badhata hai. Environmental
        conditions improve karo (lighting, temperature).
      </p>

      <h3 style={S.h3}>Fault 5: Face Recognition Failing in Certain Conditions</h3>
      <p style={S.p}>
        <strong>First check:</strong> Lighting — backlighting (strong light behind user), insufficient
        light, or flickering light source?
      </p>
      <p style={S.p}>
        <strong>Next check:</strong> Camera positioning — user ko kaunse angle se approach karna chahiye?
        Camera height appropriate hai?
      </p>
      <p style={S.p}>
        <strong>Corrective action:</strong> Lighting improve karo — dedicated illumination reader area
        pe. Camera angle adjust karo. Agar masks/glasses cause kar rahe hain — mask-compatible model
        configure karo ya fallback use karo. Re-enroll users with current appearance if significantly changed.
      </p>

      <h3 style={S.h3}>Fault 6: Biometric Server/Software Not Accessible</h3>
      <p style={S.p}>
        <strong>First check:</strong> Server network ping. Server services running hain?
      </p>
      <p style={S.p}>
        <strong>Next check:</strong> Database connectivity, disk space, memory.
      </p>
      <p style={S.p}>
        <strong>Corrective action:</strong> Server restart karke services restore karo. Database health
        check karo. Disk space free karo. Agar readers local matching support karte hain — verify karo
        ki server down hone pe locally authenticate ho sakte hain (degraded mode).
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
        <li>Multi-factor with card — two independent factors ki requirement</li>
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

      <Callout type="interview" title="Note: Ye ek illustrative scenario hai — kisi documented real facility ka reference nahi">
        Neeche diya hua scenario biometric system ke practical challenges demonstrate karne ke liye hai.
      </Callout>

      <p style={S.p}>
        Ek data center mein NOC team receive kar rahi thi daily complaints ki fingerprint readers pe
        ek specific shift ke engineers consistently fail ho rahe the. Investigation se pata chala ki
        wo engineers cooling plant maintenance bhi karte the — unke haath typically machine oil se
        contaminated hote the. Fingerprint readers unke worn, oily fingerprints reliably read nahi
        kar pa rahe the.
      </p>
      <p style={S.p}>
        Solution: un engineers ke liye face recognition readers parallel mein install kiye gaye, aur
        card + face combination unke access profile mein configure kiya gaya. Fingerprint FRR complaints
        us group ke liye band ho gayi. Lesson: single biometric modality har user ke liye suitable nahi
        hoti — flexibility planning mein include karo.
      </p>

      <h2 id="interview-questions" style={S.h2}>Interview Questions</h2>

      <h3 style={S.h3}>Q1: FAR aur FRR kya hain aur kaise balance karte hain?</h3>
      <p style={S.p}>
        <strong>Answer:</strong> FAR = unauthorized person galti se accept hone ka rate. FRR = authorized
        person galti se reject hone ka rate. Dono inversely related hain — matching threshold se balance
        hota hai. High security (low FAR) = stricter threshold = more FRR. Optimal threshold site
        conditions, enrollment quality aur security requirements pe depend karta hai — koi universal
        value nahi hai.
      </p>

      <h3 style={S.h3}>Q2: Enrollment quality kyun itni important hai?</h3>
      <p style={S.p}>
        <strong>Answer:</strong> Enrollment template field performance determine karta hai. Poor quality
        template — galat angle, partial capture, dirty sensor pe — consistently high FRR cause karta hai.
        Controlled environment mein, trained operator se, clean sensor pe enrollment karo. Multiple samples
        capture karo. Re-enrollment option rakho for users who consistently fail.
      </p>

      <h3 style={S.h3}>Q3: Biometric data agar compromise ho to kya risk hai?</h3>
      <p style={S.p}>
        <strong>Answer:</strong> Password compromise ho to change kar sakte hain. Biometric data compromise
        permanent risk hai — fingerprint ya iris change nahi ho sakti. Template encrypted store karo,
        access-controlled database mein. On-card storage option consider karo. Biometric template theft
        serious long-term security aur privacy risk hai — server security essential hai.
      </p>

      <h2 id="key-takeaways" style={S.h2}>Key Takeaways</h2>
      <ul style={S.ul}>
        <li>Biometrics "who you are" verify karta hai — card ya PIN se stronger assurance, lekin perfect nahi.</li>
        <li>FAR aur FRR inversely related hain — threshold setting security aur convenience balance karta hai.</li>
        <li>Enrollment quality directly field FRR determine karta hai — trained operator, clean sensor, controlled environment zaroori hai.</li>
        <li>Liveness detection spoofing attacks ke against important countermeasure hai.</li>
        <li>Biometric data sensitive hai — encrypted storage, access control aur privacy regulation compliance zaroori hai.</li>
        <li>Fallback authentication plan karo — lekin fallback events track karo.</li>
        <li>Single modality har user ke liye suitable nahi — flexibility plan karo.</li>
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
        <li><TopicLink slug="access-control" variant="inline" /> — Access control system jiske saath biometrics integrate hota hai.</li>
        <li><TopicLink slug="mantrap" variant="inline" /> — Biometric authentication mantrap ka critical component hai.</li>
        <li><TopicLink slug="cctv" variant="inline" /> — Visual verification jo biometric ke saath combine hoti hai.</li>
        <li><TopicLink slug="visitor-management" variant="inline" /> — Visitor identity verification mein biometrics ka role.</li>
      </ul>
    </>
  );
}
