"use client";

import Image from "next/image";
import { S, Callout, ComparisonTable } from "../shared";
import TopicLink from "@/components/TopicLink";

export default function Basics() {
  return (
    <>
      <h2 id="what-is-biometrics" style={S.h2}>What Is Biometric Authentication?</h2>

      <p style={S.p}>
        Biometric authentication kisi person ki unique physiological ya behavioral characteristics se
        identity verify karta hai. "Who you are" — not "what you have" (card) ya "what you know" (PIN).
        Fingerprint, face, iris, palm vein — ye sab physiological biometrics hain. Gait, voice, typing
        pattern — behavioral biometrics hain. Data centers mein primarily physiological biometrics use
        hote hain — fingerprint, face recognition aur iris recognition sabse common hain.
      </p>

      <p style={S.p}>
        Biometrics ka fundamental advantage hai ki credential physically separate nahi hai — koi card
        nahi bhoolte, koi PIN share nahi karte. Lekin biometrics bhi perfect nahi hain — false accepts,
        false rejects, enrollment quality, sensor conditions aur privacy concerns sab real challenges hain.
        Data centers mein biometrics typically card ya PIN ke saath combine kiya jaata hai — multi-factor
        authentication jo significantly higher assurance deta hai.
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
          Data Center mein biometric readers — fingerprint scanner aur face recognition terminal server room entry pe.
        </figcaption>
      </figure>

      <h2 id="why-required" style={S.h2}>Why Biometrics Is Required in a Data Center</h2>

      <p style={S.p}>
        Card-based access control strong hai lekin inherent limitations hain — card share ki ja sakti
        hai, stolen card se unauthorized access possible hai. PIN share ya observe ki ja sakti hai.
        Biometric authentication in weaknesses address karta hai — fingerprint ya iris share ya duplicate
        karna significantly harder hai.
      </p>

      <p style={S.p}>
        High-security zones mein — server halls, NOC, colocation cages — multi-factor authentication
        (card + biometric) higher assurance deta hai. Multi-factor ya higher-assurance authentication risk assessment, client security policy, regulatory requirements aur protected area ki criticality ke hisaab se select kiya jaata hai — biometrics universally mandatory nahi hain lekin high-security zones ke liye strong choice hain.
      </p>

      <h2 id="far-frr" style={S.h2}>FAR and FRR — Understanding Accuracy</h2>

      <p style={S.p}>
        Biometric system ki accuracy do metrics se measure hoti hai. <strong>FAR (False Acceptance Rate)</strong>
        — unauthorized person ko galti se accept kar lene ka rate. <strong>FRR (False Rejection Rate)</strong>
        — authorized person ko galti se reject karne ka rate. Dono inversely related hain — ek kam hoti
        hai to doosri badhti hai, depending on matching threshold setting.
      </p>

      <p style={S.p}>
        High security chahiye (low FAR) to threshold strict rakho — lekin authorized users ko zyada
        false rejects milenge. User convenience chahiye (low FRR) to threshold loosen karo — lekin FAR
        badhta hai. Optimal threshold site conditions, enrollment quality aur security objectives pe
        depend karta hai — koi universal correct value nahi hai. <strong>EER (Equal Error Rate)</strong>
        wo point hai jahan FAR = FRR — comparison ke liye useful hai lekin deployment ka target nahi.
      </p>

      <Callout type="important" title="FAR/FRR Values — Vendor Claims Carefully Evaluate Karo">
        Vendors often controlled laboratory conditions mein FAR/FRR quote karte hain — real-world
        performance environmental conditions, sensor cleanliness, enrollment quality aur population
        diversity pe depend karta hai. Field testing aur pilot deployment se real-world performance
        verify karo before large-scale deployment.
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
        Fingerprint recognition sabse widely deployed biometric technology hai. Optical sensors image
        capture karte hain; capacitive sensors electric field se fingerprint map karte hain; ultrasonic
        sensors subcutaneous detail capture karte hain — wet/dirty fingers mein bhi better performance
        dete hain. Matching algorithm enrollment template ke saath minutiae points (ridge endings,
        bifurcations) compare karta hai.
      </p>

      <p style={S.p}>
        Practical challenges: workers whose fingerprints are worn (frequent manual work, aging),
        wet or dirty hands, cut fingers. High-traffic entry points pe fingerprint sensor quickly
        dirty ho sakta hai — regular cleaning necessary hai. Agar specific users consistently fail
        karte hain, alternative biometric ya fallback credential consider karo.
      </p>

      <h2 id="face-recognition" style={S.h2}>Face Recognition</h2>

      <p style={S.p}>
        Modern face recognition 2D camera se facial geometry extract karta hai ya 3D depth sensor
        use karta hai — more spoofing-resistant. Contactless nature high-traffic areas ke liye
        convenient hai. Challenges: lighting changes (backlit entry, dim areas), accessories (masks,
        glasses, hats), significant appearance changes. Mask detection aur mask-compatible models
        COVID-era mein common ho gaye the aur abhi bhi used hain.
      </p>

      <h2 id="iris-recognition" style={S.h2}>Iris Recognition</h2>

      <p style={S.p}>
        Iris — colored ring around pupil — highly unique pattern hai jo lifelong stable rehta hai.
        Near-infrared illumination se capture hoti hai. Accuracy fingerprint se typically higher hai.
        Contact lenses interference cause kar sakte hain — some systems specialized lighting se
        detect karte hain. Higher cost aur specific reader hardware isko high-security zones ke liye
        more appropriate banata hai.
      </p>
    </>
  );
}
