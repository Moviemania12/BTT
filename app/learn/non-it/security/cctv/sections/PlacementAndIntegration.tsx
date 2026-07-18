"use client";

import { S, Callout, ComparisonTable } from "../shared";
import TopicLink from "@/components/TopicLink";

export default function PlacementAndIntegration() {
  return (
    <>
      {/* ═══════════════════════════════════════════════════════════════
          SECTION 12 — CAMERA PLACEMENT
      ═══════════════════════════════════════════════════════════════ */}
      <h2 id="camera-placement" style={S.h2}>Camera Placement in a Data Center</h2>

      <p style={S.p}>
        Camera placement data center ka most project-specific design decision hai — koi universal
        template nahi hai. Floor plan, threat model, compliance requirement, aur client preference
        sab factor karte hain. Neeche general principles hain jo experienced practitioners follow karte
        hain, lekin actual placement qualified security consultant ya integrator ke saath finalize karo.
      </p>

      <h3 style={S.h3}>Perimeter & External</h3>
      <p style={S.p}>
        Building ke saare entry/exit points cover karo — main gate, secondary gates, emergency exits,
        loading docks. Parking areas aur building perimeter wall pe cameras lagao. Blind spots avoid
        karo — har external entry point pe kam se kam do cameras from different angles preferred hai.
        Outdoor cameras weatherproof (IP66 minimum), vandal-resistant, aur adequate IR range wali honi
        chahiye.
      </p>

      <h3 style={S.h3}>Main Entry / Reception / Lobby</h3>
      <p style={S.p}>
        Reception desk ko face karne wali camera har aane-jaane wale visitor ka clear face capture kare.
        WDR important hai — bahar se aane wali bright light aur andar ki controlled light ka contrast
        hai. Turnstile ya reception counter pe overhead aur face-level cameras combine karo.
      </p>

      <h3 style={S.h3}>Mantrap / Airlock</h3>
      <p style={S.p}>
        Mantrap ka har door cover karo — entry door aur exit door dono. Person ka face clearly capture
        hona chahiye — entry pe aur exit pe. WDR critical hai. High resolution (4MP+) specify karo
        kyunki footage forensic evidence ke roop mein use ho sakti hai. Camera angle aise rakho ki
        tailgating attempts clearly visible hon.
      </p>

      <h3 style={S.h3}>Server Hall / Data Hall</h3>
      <p style={S.p}>
        Har aisle ka entry point cover karo. Cold aisle/hot aisle containment pe mounted cameras aisles
        ke end-to-end view deti hain. Server room ke saare doors pe cameras lagao — door face karne
        wali, door ke andar ki. Ceiling-mounted dome cameras racks pe kaam karne wale personnel monitor
        karne ke liye. Raised floor access panels pe bhi consider karo — especially high-value areas mein.
      </p>

      <h3 style={S.h3}>Electrical & Mechanical Rooms</h3>
      <p style={S.p}>
        UPS room, battery room, MDB room, generator area — ye sab critical infrastructure areas hain.
        Entry pe cameras mandatory hain. Internal monitoring bhi valuable hai especially for remote
        facilities. Vibration aur heat environment me camera specs verify karo.
      </p>

      <h3 style={S.h3}>NOC / Security Operations Room</h3>
      <p style={S.p}>
        Monitoring room ke bahar entry camera. Andar ke cameras operations log ke liye useful hai lekin
        privacy policy ke hisaab se decide karo — staff monitoring requirements review karo.
      </p>

      <Callout type="best-practice" title="No Blind Spots — Overlap is Better Than Gap">
        Jab doubt ho, cameras overlap karo rather than leave gaps. Adjacent cameras ka field of view
        overlap karna ensure karta hai ki camera failure ya vandalism pe bhi coverage bani rahe. Especially
        critical entry points pe single camera single point of failure hai.
      </Callout>

      {/* ═══════════════════════════════════════════════════════════════
          SECTION 13 — TIME SYNCHRONIZATION
      ═══════════════════════════════════════════════════════════════ */}
      <h2 id="time-sync" style={S.h2}>Time Synchronization & NTP</h2>

      <p style={S.p}>
        CCTV footage ka timestamp forensically valid hone ke liye sab cameras, NVR/VMS, aur switches
        synchronized time pe hone chahiye. Agar camera ka clock 5 minutes off hai, to footage ek
        incident ke saath correlate karna bahut difficult ho jaata hai — aur legal proceedings mein
        footage ke admissibility pe question uthta hai.
      </p>

      <p style={S.p}>
        <strong>NTP (Network Time Protocol)</strong> use karo — cameras aur NVR/VMS ko authoritative
        NTP server se sync karo. Data center mein typically NTP server already hota hai jiske saath
        IT infrastructure sync hoti hai — CCTV system bhi same NTP source use kare. Cameras mein NTP
        server address configure karo aur sync status periodically verify karo.
      </p>

      <Callout type="important" title="Timezone Configuration — Common Error">
        Sab cameras aur NVR/VMS same timezone pe configure karo. Multi-country operations mein ya
        India-specific deployments mein IST (UTC+5:30) correctly set hona chahiye. Daylight saving
        time India mein applicable nahi hai lekin imported equipment pe DST settings check karo —
        inadvertently enabled hone pe time off ho jaata hai.
      </Callout>

      {/* ═══════════════════════════════════════════════════════════════
          SECTION 14 — INTEGRATION
      ═══════════════════════════════════════════════════════════════ */}
      <h2 id="integration" style={S.h2}>Integration with Access Control & Other Systems</h2>

      <p style={S.p}>
        CCTV sirf standalone surveillance nahi hai — data center mein ye broader physical security
        ecosystem ka part hai. Integration zyada value deta hai.
      </p>

      <h3 style={S.h3}>Access Control Integration</h3>
      <p style={S.p}>
        Jab access control event trigger ho — door open, badge swipe, failed authentication — CCTV
        automatically us door ki camera pe recording start kare aur event-linked snapshot save kare.
        Operator ek unified interface se both systems dekh sake — access log aur corresponding video
        simultaneously. <TopicLink slug="access-control" variant="inline" /> VMS ke saath SDK ya
        protocol-level integration se ye possible hota hai.
      </p>

      <h3 style={S.h3}>Biometric System Integration</h3>
      <p style={S.p}>
        <TopicLink slug="biometrics" variant="inline" /> reader pe authentication event hone pe camera
        footage automatically tagged ho — kab, kahan, kiska biometric verify hua. Failed attempts pe
        alert generate ho aur corresponding video clip security team ko jaaye.
      </p>

      <h3 style={S.h3}>BMS Integration</h3>
      <p style={S.p}>
        BMS (Building Management System) se alarms — fire alarm, door forced open, equipment fault —
        CCTV ko trigger kar sakti hain. Relevant area ki cameras automatically pop up ho security
        operator ke screen pe. Ye manual monitoring ko augment karta hai.
      </p>

      <h3 style={S.h3}>Video Analytics</h3>
      <p style={S.p}>
        Modern VMS platforms built-in ya third-party video analytics support karte hain — line crossing
        detection (perimeter breach), loitering detection, crowd detection, abandoned object detection,
        intrusion detection. Advanced systems mein AI-based face recognition bhi available hai. Analytics
        false alarms bhi generate kar sakti hain — threshold tuning aur operator training important hai.
      </p>

      <Callout type="maintenance" title="Integration Testing — Commission karo, Assume mat karo">
        Integration ke saath ek common mistake hai ki install ke time test kiya, phir kabhi verify
        nahi kiya. Access control change hone pe, VMS upgrade hone pe, ya network change hone pe
        integration break ho sakta hai. Quarterly integration tests schedule karo aur results log karo.
      </Callout>

      {/* ═══════════════════════════════════════════════════════════════
          SECTION 15 — CYBERSECURITY
      ═══════════════════════════════════════════════════════════════ */}
      <h2 id="cybersecurity" style={S.h2}>Cybersecurity for IP CCTV</h2>

      <p style={S.p}>
        IP CCTV cameras network-connected devices hain — iska matlab hai ye attack surface bhi hain.
        Poorly secured cameras historically botnets (Mirai), unauthorized access, aur corporate network
        lateral movement ke liye use hue hain. Data center CCTV ke liye cybersecurity controls essential hain.
      </p>

      <h3 style={S.h3}>Credential Management</h3>
      <p style={S.p}>
        Default credentials — "admin/admin", "admin/12345" — kabhi nahi chhodne chahiye. Installation
        pe hi strong, unique credentials set karo. Password management system mein store karo. Periodic
        rotation schedule define karo. CCTV system ke credentials IT infrastructure credentials se alag
        rakho.
      </p>

      <h3 style={S.h3}>Network Isolation</h3>
      <p style={S.p}>
        CCTV cameras aur NVR dedicated VLAN pe isolated karo — production IT network se separate. Cameras
        ko internet access directly nahi chahiye — agar remote access chahiye to VPN through route karo.
        Firewall rules define karo ki CCTV VLAN se sirf authorized hosts (VMS server, monitoring
        workstations) communicate kar sakein.
      </p>

      <h3 style={S.h3}>Firmware Management</h3>
      <p style={S.p}>
        Camera aur NVR firmware regularly update karo — CVEs aur security patches address hote hain.
        Manufacturer security advisories subscribe karo. End-of-life cameras replace karo — firmware
        updates band hone ke baad security risk significantly badhta hai. Firmware update schedule
        quarterly maintenance ke part mein rakho.
      </p>

      <h3 style={S.h3}>Encryption & Protocols</h3>
      <p style={S.p}>
        HTTPS for camera web interface, encrypted RTSP (RTSPS), aur TLS for VMS communication
        configure karo. HTTP aur unencrypted RTSP disable karo jahan possible ho. VMS access ke liye
        role-based access control configure karo — operators sirf assigned cameras dekh sakein, full
        admin access limited ho.
      </p>

      <ComparisonTable
        title="CCTV Cybersecurity Hardening Checklist"
        headers={["Action", "Why", "Priority"]}
        rows={[
          ["Change default credentials on all cameras, NVR, VMS", "Default creds = instant compromise", "Critical"],
          ["Dedicated VLAN for CCTV network", "Isolate from production network", "Critical"],
          ["Disable direct internet access to cameras", "Prevent external exploitation", "Critical"],
          ["Enable HTTPS / encrypted RTSP", "Prevent credential sniffing", "High"],
          ["Regular firmware updates", "Patch known vulnerabilities", "High"],
          ["Role-based access in VMS", "Limit blast radius of compromised account", "High"],
          ["Disable unused services (telnet, HTTP, UPnP)", "Reduce attack surface", "Medium"],
          ["Log access and review regularly", "Detect unauthorized access", "Medium"],
          ["Physical security for NVR/server", "Prevent local tampering", "Medium"],
          ["VPN for remote access", "Secure remote viewing", "High"],
        ]}
      />

      <Callout type="danger" title="Cameras from Certain Vendors — Government Regulations Apply">
        Kuch countries aur government-aligned facilities ne specific CCTV manufacturers pe restrictions
        lagayi hain security concerns ki wajah se. Government facilities, defense-adjacent sites, aur
        certain compliance frameworks mein approved vendor list mandatory hai. Project specification ke
        time applicable regulations aur client requirements verify karo.
      </Callout>
    </>
  );
}
