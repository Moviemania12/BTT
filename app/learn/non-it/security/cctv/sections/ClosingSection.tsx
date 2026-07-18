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
        <li><strong>Deterrence:</strong> Visible cameras unauthorized activity ki probability reduce karte hain.</li>
        <li><strong>Forensic evidence:</strong> Incidents ke baad investigation ke liye recorded footage critical hai.</li>
        <li><strong>Remote monitoring:</strong> NOC aur security team live feed anywhere se dekh sakti hai.</li>
        <li><strong>Integration:</strong> Access control, biometrics aur BMS ke saath unified security picture milti hai.</li>
        <li><strong>Compliance:</strong> ISO 27001, SOC 2, PCI-DSS aur similar frameworks ke liye evidence provide karta hai.</li>
        <li><strong>Operational visibility:</strong> Maintenance activity, delivery tracking, aur unauthorized access remotely monitor hota hai.</li>
        <li><strong>Scalability:</strong> IP CCTV system camera count aur storage gradually expand kar sakta hai without full replacement.</li>
      </ul>

      <h3 style={S.h3}>Limitations</h3>
      <ul style={S.ul}>
        <li><strong>Reactive, not preventive:</strong> CCTV incident hone ke baad evidence deta hai — physical intrusion prevention ke liye <TopicLink slug="access-control" variant="inline" /> aur <TopicLink slug="mantrap" variant="inline" /> zaroori hain.</li>
        <li><strong>Camera blind spots:</strong> Coverage gaps hamesha possible hain — planning aur regular walk-throughs needed.</li>
        <li><strong>Storage management overhead:</strong> Retention policies, disk health, RAID management ongoing attention chahti hai.</li>
        <li><strong>Cybersecurity risk:</strong> IP cameras attack surface hain — unsecured cameras serious risk create karte hain.</li>
        <li><strong>Privacy considerations:</strong> Employee monitoring policies, local laws, aur data protection regulations compliance required hai.</li>
        <li><strong>Operator dependence:</strong> 24/7 monitoring ke bina real-time response limited hai — alerts aur analytics operator workload reduce karte hain.</li>
        <li><strong>Image quality in challenging conditions:</strong> Backlighting, extreme temperatures, aur occlusion image quality affect karte hain.</li>
      </ul>

      {/* ═══════════════════════════════════════════════════════════════
          SECTION 19 — ILLUSTRATIVE SCENARIO
      ═══════════════════════════════════════════════════════════════ */}
      <h2 id="illustrative-scenario" style={S.h2}>Illustrative Scenario</h2>

      <Callout type="interview" title="Note: Ye ek illustrative scenario hai — kisi documented real facility ka reference nahi">
        Neeche diya hua scenario CCTV system ke practical value ko demonstrate karne ke liye hai. Kisi specific
        facility ka description nahi hai.
      </Callout>

      <p style={S.p}>
        Ek mid-size colocation data center mein raat ke 2 baje NOC operator ko VMS mein ek alert milta hai —
        server hall Zone 3 mein motion detection triggered hua. Operator live feed check karta hai — ek
        technician rack ke paas kaam kar raha hai. Operator access control log check karta hai — us time
        kisi ke access card ka log nahi milta.
      </p>

      <p style={S.p}>
        Operator intercom se contact karta hai — technician batata hai ki usne maintenance karne aayi thi
        lekin check-in nahi karaya. Security supervisor inform hota hai. Footage download kari jaati hai
        as evidence. Technician ko properly identify kiya jaata hai aur incident documented hota hai.
      </p>

      <p style={S.p}>
        Is scenario mein CCTV ne kya kiya: real-time monitoring se unauthorized presence detect hua, access
        control log se cross-reference kiya gaya, aur documented response possible hua. Agar sirf access
        control hota — tailgated entry detect nahi hoti. Agar sirf CCTV hota without monitoring — nobody
        would have seen the alert in real time. Dono systems ka integration practical value demonstrate karta hai.
      </p>

      {/* ═══════════════════════════════════════════════════════════════
          SECTION 20 — INTERVIEW QUESTIONS
      ═══════════════════════════════════════════════════════════════ */}
      <h2 id="interview-questions" style={S.h2}>Interview Questions</h2>

      <h3 style={S.h3}>Q1: IP CCTV aur analog CCTV mein fundamental difference kya hai?</h3>
      <p style={S.p}>
        <strong>Answer:</strong> Analog cameras coaxial cable pe analog video signal bhejte hain aur DVR
        decode karta hai. IP cameras network pe already compressed digital stream bhejte hain — NVR ya
        VMS receive karta hai. IP cameras PoE se power lete hain (single Cat6 cable), higher resolution
        support karte hain, remote access dete hain, aur VMS ke saath deep integration possible hai. Data
        centers mein IP-based systems standard hain.
      </p>

      <h3 style={S.h3}>Q2: NVR aur VMS mein kya choose karein aur kyun?</h3>
      <p style={S.p}>
        <strong>Answer:</strong> NVR ek dedicated hardware appliance hai — easy deployment, fixed channel
        count, lower cost. VMS software platform hai — standard server pe chalti hai, highly scalable,
        deep integration with access control/BMS/analytics, multi-site management. Small deployments ke
        liye NVR adequate ho sakta hai. Architecture selection — dedicated NVR, VMS ya hybrid — scale,
        integration requirements, redundancy needs aur project specification pe depend karta hai.
      </p>

      <h3 style={S.h3}>Q3: RAID kya hai aur ye backup kyun nahi hai?</h3>
      <p style={S.p}>
        <strong>Answer:</strong> RAID multiple HDDs ko combine karke disk hardware failure se protection
        deta hai — ek ya do disks fail hone pe data available rehta hai. Lekin RAID accidental deletion,
        ransomware, file corruption ya site disaster se protect nahi karta. Backup ka matlab hai independent
        copy different location pe — RAID aur backup complementary hain, substitute nahi. CCTV mein RAID
        availability ensure karta hai, backup strategy separately define karni padti hai.
      </p>

      <h3 style={S.h3}>Q4: CCTV cybersecurity ke liye top 3 most critical actions kya hain?</h3>
      <p style={S.p}>
        <strong>Answer:</strong> Pehla — default credentials immediately change karo on every camera, NVR
        aur VMS — default creds = instant compromise. Doosra — CCTV ko dedicated VLAN pe isolate karo —
        production network se separate. Teesra — cameras ko direct internet access mat do — remote access
        ke liye VPN use karo. Ye teen actions most common attack vectors cover karte hain.
      </p>

      <h3 style={S.h3}>Q5: Camera offline hai — step-by-step troubleshoot karo.</h3>
      <p style={S.p}>
        <strong>Answer:</strong> Step 1: PoE switch pe port status check karo — LED, management interface
        mein power delivery. Step 2: Camera IP ping karo VMS server se — reachable hai? Step 3: Agar
        reachable nahi — cable continuity test karo, alternate port try karo. Agar reachable — camera web
        interface open karo, stream active hai? Step 4: VMS mein camera configuration check karo — IP,
        port, credentials correct hain? Step 5: Camera ko NVR/VMS mein re-add karo. Agar still fail —
        factory reset camera ya replacement consider karo.
      </p>

      <h3 style={S.h3}>Q6: Storage planning kaise karte hain — kya factors consider karne chahiye?</h3>
      <p style={S.p}>
        <strong>Answer:</strong> Camera count, resolution per camera, frame rate (FPS), codec (H.264 vs
        H.265 — H.265 comparable quality pe H.264 se significantly less storage use kar sakta hai, actual saving vary karta hai), bitrate per camera, recording hours per day (continuous
        ya motion-based), aur retention period in days. VMS built-in calculator ya manufacturer tools se
        estimate karo — manual calculation approximation hai. Add 25-30% overhead for filesystem aur safety
        margin. RAID overhead bhi consider karo agar NAS use ho raha hai.
      </p>

      {/* ═══════════════════════════════════════════════════════════════
          SECTION 21 — KEY TAKEAWAYS
      ═══════════════════════════════════════════════════════════════ */}
      <h2 id="key-takeaways" style={S.h2}>Key Takeaways</h2>

      <ul style={S.ul}>
        <li>
          <strong>IP CCTV = network-based system.</strong> Camera → PoE Switch → Network → NVR/VMS →
          Storage → Monitoring. Har link is chain mein point of failure hai — monitoring aur redundancy zaroori hai.
        </li>
        <li>
          <strong>NVR hardware appliance hai, VMS software platform hai.</strong> Enterprise data centers
          Architecture — NVR, VMS ya hybrid — scale, integration aur project requirements pe depend karta hai.
        </li>
        <li>
          <strong>RAID availability deta hai, backup nahi.</strong> Disk failure se protect karta hai —
          accidental deletion, ransomware ya site disaster se nahi. Backup strategy alag define karo.
        </li>
        <li>
          <strong>Cybersecurity controls essential hain.</strong> Default credentials change karo, VLAN isolation karo,
          direct internet exposure avoid karo. IP cameras attack surface hain.
        </li>
        <li>
          <strong>Time sync critical hai.</strong> NTP configure karo sab cameras aur NVR/VMS pe — wrong
          timestamp forensic value destroy karta hai.
        </li>
        <li>
          <strong>CCTV integration physical security multiply karta hai.</strong> Access control, biometrics
          aur BMS ke saath integrated system standalone se far more effective hai.
        </li>
        <li>
          <strong>Systematic troubleshooting zaroori hai.</strong> Isolate karo problem kahaan hai —
          camera, cable, switch, network, NVR, ya storage — random steps se time waste hota hai.
        </li>
        <li>
          <strong>Storage planning VMS calculator se karo.</strong> Camera count, resolution, codec, FPS,
          recording mode aur retention sab factor karte hain — manual approximation tools se verify karo.
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
        CCTV physical security ka ek layer hai. Poora physical security system samjhne ke liye:
      </p>
      <ul style={S.ul}>
        <li>
          <TopicLink slug="access-control" variant="inline" /> — Doors aur zones ka authentication-based
          access management. CCTV ke saath integrate hota hai for event-linked recording.
        </li>
        <li>
          <TopicLink slug="biometrics" variant="inline" /> — Fingerprint, iris, face recognition —
          stronger authentication jo CCTV ke saath verified identity evidence deta hai.
        </li>
        <li>
          <TopicLink slug="mantrap" variant="inline" /> — Two-door airlock jo tailgating prevent karta
          hai. CCTV mantrap mein critical hai — every attempt recorded honi chahiye.
        </li>
        <li>
          <TopicLink slug="visitor-management" variant="inline" /> — Visitor check-in, badge, escort
          policy — CCTV visitor accountability ko support karta hai.
        </li>
      </ul>
    </>
  );
}
