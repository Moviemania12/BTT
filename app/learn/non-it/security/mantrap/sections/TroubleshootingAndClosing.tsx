"use client";

import { S, Callout, ComparisonTable } from "../shared";
import TopicLink from "@/components/TopicLink";
import { faqs } from "../metadata";

export default function TroubleshootingAndClosing() {
  return (
    <>
      <h2 id="troubleshooting" style={S.h2}>Engineer Troubleshooting — Step-by-Step</h2>

      <Callout type="warning" title="Mantrap Troubleshooting — Safety First">
        Kisi bhi mantrap troubleshooting se pehle verify karo ki koi person vestibule mein phase nahi
        hai. Interlock logic disable karne se pehle alternate security measure in place ho — single
        door monitor karo ya security staff physically present rakho.
      </Callout>

      <h3 style={S.h3}>Fault 1: Inner Door Does Not Open After Outer Door Closes</h3>
      <p style={S.p}>
        <strong>First check:</strong> Outer door completely closed aur latched hai? Door contact sensor
        outer door pe "closed" status report kar raha hai? Controller status dekho.
      </p>
      <p style={S.p}>
        <strong>Next check:</strong> Occupancy sensor status — ek se zyada person detect ho raha hai?
        Occupancy sensor false positive de raha hai?
      </p>
      <p style={S.p}>
        <strong>Isolate:</strong> Controller logic manually override karo (maintenance mode) — inner
        door manually trigger karo. Door releases? Agar yes, controller logic ya sensor input issue.
        Agar no, inner door lock/wiring issue.
      </p>
      <p style={S.p}>
        <strong>Corrective action:</strong> Outer door contact sensor realign karo. Occupancy sensor
        calibrate ya clean karo. Inner door lock wiring inspect karo. Controller logic/firmware check karo.
      </p>

      <h3 style={S.h3}>Fault 2: Outer Door Does Not Release on Card Presentation</h3>
      <p style={S.p}>
        <strong>First check:</strong> Access control system mein event log — credential accepted? Inner
        door ka status kya hai? (Agar inner door open hai to outer door will be locked by design.)
      </p>
      <p style={S.p}>
        <strong>Next check:</strong> Reader power aur communication — same as access control reader troubleshooting.</p>
      <p style={S.p}>
        <strong>Corrective action:</strong> Agar inner door open hai — wait karo ya inner door close karo
        (inner side se exit trigger karo). Agar inner door closed lekin outer won't open — access control
        configuration check karo, door schedule verify karo, lock wiring inspect karo.
      </p>

      <h3 style={S.h3}>Fault 3: Both Doors Open Simultaneously — Interlock Failure</h3>
      <p style={S.p}>
        <strong>First check:</strong> Ye serious fault hai — immediately security alert generate karo
        aur area monitor karo. Controller/PLC log check karo — what triggered both releases?
      </p>
      <p style={S.p}>
        <strong>Next check:</strong> Power supply issue tha? Emergency release accidentally triggered?
        Controller software/firmware fault? Wiring fault (both relays incorrectly wired)?
      </p>
      <p style={S.p}>
        <strong>Corrective action:</strong> Do NOT continue operating until root cause identified aur
        fixed. Manual security oversight place karo. Engage certified integrator for interlock controller
        inspection. Firmware update ya replacement per OEM guidance.
      </p>

      <h3 style={S.h3}>Fault 4: Tailgating Alarm — Person Stuck in Vestibule</h3>
      <p style={S.p}>
        <strong>First check:</strong> CCTV footage — kitne log hain vestibule mein? Authorized person
        hai ya security threat?
      </p>
      <p style={S.p}>
        <strong>Next check:</strong> Intercom se contact karo — communication possible hai?
      </p>
      <p style={S.p}>
        <strong>Corrective action:</strong> Agar extra person unauthorized hai — security protocol
        follow karo, do not remotely open. Agar misunderstanding hai (authorized person tha dono) —
        security supervisor decision pe remote release karo aur incident log karo. Agar emergency —
        remote release karo aur respond karo.
      </p>

      <h3 style={S.h3}>Fault 5: Mantrap Not Releasing on Fire Alarm</h3>
      <p style={S.p}>
        <strong>First check:</strong> Fire alarm signal — controller receiving hai? Fire alarm panel
        output contact check karo.
      </p>
      <p style={S.p}>
        <strong>Next check:</strong> Wiring between fire alarm panel aur mantrap controller — continuity
        check karo. Controller input terminal status.
      </p>
      <p style={S.p}>
        <strong>Corrective action:</strong> Ye life-safety relevant fault hai — immediate investigation zaroori hai. Interim mein: emergency release mechanism operational hai verify karo per approved design. Fire alarm interface wiring aur controller input configuration inspect karo. Rectification ke baad full integration test karo with fire/life-safety engineer aur AHJ requirements ke hisaab se — close out before returning to normal operation.
      </p>

      <h3 style={S.h3}>Fault 6: Occupancy Sensor False Positives — Inner Door Not Opening</h3>
      <p style={S.p}>
        <strong>First check:</strong> Vestibule mein sensor field of view check karo — koi object
        inadvertently triggering? Air movement? Reflections?
      </p>
      <p style={S.p}>
        <strong>Next check:</strong> Sensor sensitivity setting — too sensitive? Sensor dirty ya misaligned?
      </p>
      <p style={S.p}>
        <strong>Corrective action:</strong> Sensor sensitivity carefully adjust karo — balance between
        false positives aur actual tailgating detection. Sensor clean karo. Reposition sensor to reduce
        interference. Agar weight-based — floor mat condition check karo, sensor recalibrate karo.
      </p>

      <ComparisonTable
        title="Mantrap Troubleshooting Quick Reference"
        headers={["Symptom", "First Check", "Next Check", "Likely Cause", "Corrective Action"]}
        rows={[
          ["Inner door won't open", "Outer door contact sensor status", "Occupancy sensor reading", "Outer door not latched or false occupancy", "Realign door sensor, calibrate occupancy sensor"],
          ["Outer door won't release", "Access log — credential accepted?", "Inner door open?", "Inner open (by design) or config issue", "Wait or close inner; fix config"],
          ["Both doors open (interlock fail)", "Controller log, power supply", "Emergency release triggered?", "Serious fault — controller/wiring", "Security alert, stop operation, engage integrator"],
          ["Person stuck in vestibule", "CCTV — how many people?", "Intercom communication", "Tailgating alert or misunderstanding", "Protocol-based remote release or security response"],
          ["Fire alarm — mantrap not releasing", "Fire panel output signal", "Wiring continuity to controller", "Integration wiring fault", "LIFE SAFETY — immediate fix, verify manual release"],
          ["Occupancy sensor false positives", "Sensor FoV, objects in path", "Sensitivity setting", "Dirty/misaligned sensor or too sensitive", "Clean, reposition, adjust sensitivity"],
        ]}
      />

      <h2 id="advantages-limitations" style={S.h2}>Advantages and Limitations</h2>

      <h3 style={S.h3}>Advantages</h3>
      <ul style={S.ul}>
        <li>Physically prevents tailgating — strongest available measure against this attack vector</li>
        <li>Forces individual authentication — each person separately verified</li>
        <li>Controlled entry point — CCTV + biometric + access control combination highly effective</li>
        <li>Documented evidence — every entry logged and photographed</li>
        <li>Compliance demonstrable — auditors can physically verify the control</li>
      </ul>

      <h3 style={S.h3}>Limitations</h3>
      <ul style={S.ul}>
        <li>Space requirement — vestibule needs physical footprint, retrofitting existing facilities challenging</li>
        <li>Throughput — sequential entry slows down high-traffic entry points</li>
        <li>Maintenance — more components than a single door = more potential failure points</li>
        <li>Emergency considerations — must be carefully designed for evacuation compliance</li>
        <li>Cost — higher than standard doors</li>
        <li>Does not prevent authorized insider threats — a valid credential still gets through</li>
      </ul>

      <h2 id="illustrative-scenario" style={S.h2}>Illustrative Scenario</h2>

      <Callout type="interview" title="Note: Ye ek illustrative scenario hai — kisi documented real facility ka reference nahi">
        Neeche scenario mantrap ke practical value aur maintenance importance demonstrate karta hai.
      </Callout>

      <p style={S.p}>
        Ek security audit ke time auditor ne mantrap entry ka test kiya — outer door se andar gaye,
        phir maintenance person ne baad mein outer door hold ki aur doosre person ke saath andar aane
        ki koshish ki. Mantrap occupancy sensor triggered — inner door locked, alarm generated, security
        operator alert hua. Audit result: mantrap technical function pass, lekin occupancy sensor
        sensitivity review recommended tha kyunki test mein sensor thoda late triggered hua tha.
      </p>
      <p style={S.p}>
        Lesson: Mantrap mechanical interlock effective tha, lekin sensor calibration aur regular testing
        ensure karta hai ki wo edge cases mein bhi reliable ho.
      </p>

      <h2 id="interview-questions" style={S.h2}>Interview Questions</h2>

      <h3 style={S.h3}>Q1: Mantrap interlock logic explain karo.</h3>
      <p style={S.p}>
        <strong>Answer:</strong> Do doors hain — outer aur inner. Sirf ek baar ek door open ho sakti
        hai. Outer door open hai to inner mechanically/electrically locked hai. Inner door open hai to
        outer locked hai. Entry sequence: outer door credential → outer opens → outer closes aur latches
        → occupancy check (ek person?) → inner door credential → inner opens. Kisi bhi step mein
        condition fail ho to sequence rok jaati hai.
      </p>

      <h3 style={S.h3}>Q2: Fire alarm pe mantrap kaise behave karna chahiye?</h3>
      <p style={S.p}>
        <strong>Answer:</strong> Life-safety egress applicable fire/life-safety code, approved design aur AHJ requirements ke hisaab se maintain honi chahiye. Required egress doors aur locked arrangements fire alarm/access control approved sequence of operations ke hisaab se respond karte hain — exact behavior project-specific approved design se determine hota hai. Fire/life-safety engineer se verify karo aur commissioning ke time test karo.
      </p>

      <h3 style={S.h3}>Q3: Occupancy sensor kyun zaroori hai aur kaunse type prefer karte hain?</h3>
      <p style={S.p}>
        <strong>Answer:</strong> Occupancy sensor tailgating detect karta hai — ek se zyada person
        vestibule mein pe inner door lock rehti hai. Without it, interlock physical door interlock
        deta hai lekin koi verify nahi karta ki sirf ek person andar hai. IR beam-break sensors aur
        overhead camera-based counting most accurate hain. PIR sirf presence detect karta hai (count
        nahi) — tailgating miss ho sakta hai agar dono log closely timed enter karein.
      </p>

      <h2 id="key-takeaways" style={S.h2}>Key Takeaways</h2>
      <ul style={S.ul}>
        <li>Mantrap = two interlocked doors — sirf ek baar ek open ho sakti hai. Strongest anti-tailgating physical measure.</li>
        <li>Occupancy detection without which tailgating detection impossible hai.</li>
        <li>Life-safety egress applicable code, AHJ requirements aur approved design ke hisaab se maintain honi chahiye — fire alarm/access control interface aur lock behavior project-specific approved sequence of operations pe depend karta hai.</li>
        <li>Emergency release provisions (per approved design) aur emergency communication vestibule mein important safety elements hain — exact requirements applicable code aur AHJ determine karta hai.</li>
        <li>CCTV + biometrics + access control ke saath integrate karo — maximum security value.</li>
        <li>Regular testing zaroori hai — interlock, occupancy, emergency release, fire integration sab monthly ya quarterly test karo.</li>
        <li>Both-door simultaneous open = serious fault — immediately secure aur investigate karo.</li>
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
        <li><TopicLink slug="access-control" variant="inline" /> — Mantrap ka credential authentication backbone.</li>
        <li><TopicLink slug="biometrics" variant="inline" /> — Multi-factor authentication mantrap mein.</li>
        <li><TopicLink slug="cctv" variant="inline" /> — Mantrap surveillance — entry documentation.</li>
        <li><TopicLink slug="visitor-management" variant="inline" /> — Visitor mantrap entry process.</li>
      </ul>
    </>
  );
}
