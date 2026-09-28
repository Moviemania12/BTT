"use client";

import { S, Callout, ComparisonTable } from "../shared";
import TopicLink from "@/components/TopicLink";
import { faqs } from "../metadata";

export default function TroubleshootingAndClosing() {
  return (
    <>
      <h2 id="troubleshooting" style={S.h2}>Engineer Troubleshooting — Step-by-Step</h2>

      <Callout type="warning" title="Mantrap Troubleshooting — Safety First">
        Before any mantrap troubleshooting, verify that no person is stuck in the vestibule. Before disabling the interlock logic, an alternate security measure must be in place — monitor the single door or keep security staff physically present.
      </Callout>

      <h3 style={S.h3}>Fault 1: Inner Door Does Not Open After Outer Door Closes</h3>
      <p style={S.p}>
        <strong>First check:</strong> Is the outer door completely closed and latched? Is the door contact sensor on the outer door reporting "closed" status? Look at the controller status.
      </p>
      <p style={S.p}>
        <strong>Next check:</strong> Occupancy sensor status — is more than one person being detected? Is the occupancy sensor giving a false positive?
      </p>
      <p style={S.p}>
        <strong>Isolate:</strong> Manually override the controller logic (maintenance mode) — trigger the inner door manually. Does the door release? If yes, it is a controller logic or sensor input issue. If no, it is an inner door lock/wiring issue.
      </p>
      <p style={S.p}>
        <strong>Corrective action:</strong> Realign the outer door contact sensor. Calibrate or clean the occupancy sensor. Inspect the inner door lock wiring. Check the controller logic/firmware.
      </p>

      <h3 style={S.h3}>Fault 2: Outer Door Does Not Release on Card Presentation</h3>
      <p style={S.p}>
        <strong>First check:</strong> Event log in the access control system — was the credential accepted? What is the status of the inner door? (If the inner door is open, the outer door will be locked by design.)
      </p>
      <p style={S.p}>
        <strong>Next check:</strong> Reader power and communication — same as access control reader troubleshooting.</p> <p style={S.p}> <strong>Corrective action:</strong> If the inner door is open — wait or close the inner door (trigger an exit from the inner side). If the inner door is closed but the outer won't open — check the access control configuration, verify the door schedule, inspect the lock wiring.
      </p>

      <h3 style={S.h3}>Fault 3: Both Doors Open Simultaneously — Interlock Failure</h3>
      <p style={S.p}>
        <strong>First check:</strong> This is a serious fault — immediately generate a security alert and monitor the area. Check the controller/PLC log — what triggered both releases?
      </p>
      <p style={S.p}>
        <strong>Next check:</strong> Was there a power supply issue? Was the emergency release accidentally triggered? Controller software/firmware fault? Wiring fault (both relays incorrectly wired)?
      </p>
      <p style={S.p}>
        <strong>Corrective action:</strong> Do NOT continue operating until root cause identified and fixed. Put manual security oversight in place. Engage certified integrator for interlock controller inspection. Firmware update or replacement per OEM guidance.
      </p>

      <h3 style={S.h3}>Fault 4: Tailgating Alarm — Person Stuck in Vestibule</h3>
      <p style={S.p}>
        <strong>First check:</strong> CCTV footage — how many people are in the vestibule? Is it an authorized person or a security threat?
      </p>
      <p style={S.p}>
        <strong>Next check:</strong> Contact them through the intercom — is communication possible?
      </p>
      <p style={S.p}>
        <strong>Corrective action:</strong> If the extra person is unauthorized — follow the security protocol, do not remotely open. If it is a misunderstanding (both were authorized persons) — do a remote release on the security supervisor's decision and log the incident. If it is an emergency — do a remote release and respond.
      </p>

      <h3 style={S.h3}>Fault 5: Mantrap Not Releasing on Fire Alarm</h3>
      <p style={S.p}>
        <strong>First check:</strong> Fire alarm signal — is the controller receiving it? Check the fire alarm panel output contact.
      </p>
      <p style={S.p}>
        <strong>Next check:</strong> Wiring between the fire alarm panel and the mantrap controller — check continuity. Controller input terminal status.
      </p>
      <p style={S.p}>
        <strong>Corrective action:</strong> This is a life-safety relevant fault — immediate investigation is essential. In the interim: verify the emergency release mechanism is operational per the approved design. Inspect the fire alarm interface wiring and controller input configuration. After rectification, do a full integration test with the fire/life-safety engineer and per AHJ requirements — close out before returning to normal operation.
      </p>

      <h3 style={S.h3}>Fault 6: Occupancy Sensor False Positives — Inner Door Not Opening</h3>
      <p style={S.p}>
        <strong>First check:</strong> Check the sensor field of view in the vestibule — is some object inadvertently triggering it? Air movement? Reflections?
      </p>
      <p style={S.p}>
        <strong>Next check:</strong> Sensor sensitivity setting — too sensitive? Is the sensor dirty or misaligned?
      </p>
      <p style={S.p}>
        <strong>Corrective action:</strong> Adjust sensor sensitivity carefully — balance between false positives and actual tailgating detection. Clean the sensor. Reposition the sensor to reduce interference. If weight-based — check the floor mat condition, recalibrate the sensor.
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

      <Callout type="interview" title="Note: This is an illustrative scenario — not a reference to any documented real facility">
        The scenario below demonstrates the practical value of the mantrap and the importance of maintenance.
      </Callout>

      <p style={S.p}>
        During a security audit the auditor tested the mantrap entry — went in through the outer door, then later a maintenance person held the outer door and tried to come in along with another person. The mantrap occupancy sensor triggered — inner door locked, alarm generated, the security operator was alerted. Audit result: the mantrap technical function passed, but an occupancy sensor sensitivity review was recommended because in the test the sensor had triggered slightly late.
      </p>
      <p style={S.p}>
        Lesson: The mantrap mechanical interlock was effective, but sensor calibration and regular testing ensure it is reliable even in edge cases.
      </p>

      <h2 id="interview-questions" style={S.h2}>Interview Questions</h2>

      <h3 style={S.h3}>Q1: Explain the mantrap interlock logic.</h3>
      <p style={S.p}>
        <strong>Answer:</strong> There are two doors — outer and inner. Only one door can be open at a time. If the outer door is open, the inner is mechanically/electrically locked. If the inner door is open, the outer is locked. Entry sequence: outer door credential → outer opens → outer closes and latches → occupancy check (one person?) → inner door credential → inner opens. If the condition fails at any step, the sequence stops.
      </p>

      <h3 style={S.h3}>Q2: How should a mantrap behave on a fire alarm?</h3>
      <p style={S.p}>
        <strong>Answer:</strong> Life-safety egress must be maintained according to the applicable fire/life-safety code, approved design and AHJ requirements. Required egress doors and locked arrangements respond according to the fire alarm/access control approved sequence of operations — the exact behavior is determined by the project-specific approved design. Verify with the fire/life-safety engineer and test at the time of commissioning.
      </p>

      <h3 style={S.h3}>Q3: Why is an occupancy sensor essential and which types are preferred?</h3>
      <p style={S.p}>
        <strong>Answer:</strong> The occupancy sensor detects tailgating — with more than one person in the vestibule, the inner door stays locked. Without it, the interlock gives a physical door interlock but nothing verifies that only one person is inside. IR beam-break sensors and overhead camera-based counting are the most accurate. PIR only detects presence (not count) — tailgating can be missed if both people enter closely timed.
      </p>

      <h2 id="key-takeaways" style={S.h2}>Key Takeaways</h2>
      <ul style={S.ul}>
        <li>Mantrap = two interlocked doors — only one can be open at a time. The strongest anti-tailgating physical measure.</li>
        <li>Without occupancy detection, tailgating detection is impossible.</li>
        <li>Life-safety egress must be maintained according to the applicable code, AHJ requirements and approved design — the fire alarm/access control interface and lock behavior depend on the project-specific approved sequence of operations.</li>
        <li>Emergency release provisions (per approved design) and emergency communication in the vestibule are important safety elements — the exact requirements are determined by the applicable code and AHJ.</li>
        <li>Integrate with CCTV + biometrics + access control — maximum security value.</li>
        <li>Regular testing is essential — test interlock, occupancy, emergency release, fire integration all monthly or quarterly.</li>
        <li>Both-door simultaneous open = serious fault — immediately secure and investigate.</li>
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
        <li><TopicLink slug="access-control" variant="inline" /> — the credential authentication backbone of the mantrap.</li>
        <li><TopicLink slug="biometrics" variant="inline" /> — multi-factor authentication in the mantrap.</li>
        <li><TopicLink slug="cctv" variant="inline" /> — Mantrap surveillance — entry documentation.</li>
        <li><TopicLink slug="visitor-management" variant="inline" /> — Visitor mantrap entry process.</li>
      </ul>
    </>
  );
}
