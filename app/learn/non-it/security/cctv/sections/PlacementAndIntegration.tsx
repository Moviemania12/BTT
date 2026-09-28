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
        Camera placement is the most project-specific design decision in a data center — there is no universal template. Floor plan, threat model, compliance requirement and client preference all factor in. Below are general principles that experienced practitioners follow, but finalize the actual placement with a qualified security consultant or integrator.
      </p>

      <h3 style={S.h3}>Perimeter & External</h3>
      <p style={S.p}>
        Cover all entry/exit points of the building — main gate, secondary gates, emergency exits, loading docks. Install cameras in parking areas and on the building perimeter wall. Avoid blind spots — at least two cameras from different angles at every external entry point is preferred. Outdoor cameras must be weatherproof (IP66 minimum), vandal-resistant and have adequate IR range.
      </p>

      <h3 style={S.h3}>Main Entry / Reception / Lobby</h3>
      <p style={S.p}>
        A camera facing the reception desk should capture a clear face of every visitor coming and going. WDR is important — there is contrast between the bright light coming from outside and the controlled light inside. Combine overhead and face-level cameras at the turnstile or reception counter.
      </p>

      <h3 style={S.h3}>Mantrap / Airlock</h3>
      <p style={S.p}>
        Cover every door of the mantrap — both the entry door and the exit door. The person's face must be clearly captured — at entry and at exit. WDR is critical. Specify high resolution (4MP+) because the footage may be used as forensic evidence. Keep the camera angle such that tailgating attempts are clearly visible.
      </p>

      <h3 style={S.h3}>Server Hall / Data Hall</h3>
      <p style={S.p}>
        Cover the entry point of every aisle. Cameras mounted on cold aisle/hot aisle containment give an end-to-end view of the aisles. Install cameras at all doors of the server room — facing the door, and inside the door. Ceiling-mounted dome cameras to monitor personnel working on racks. Consider raised floor access panels too — especially in high-value areas.
      </p>

      <h3 style={S.h3}>Electrical & Mechanical Rooms</h3>
      <p style={S.p}>
        UPS room, battery room, MDB room, generator area — these are all critical infrastructure areas. Cameras at the entry are mandatory. Internal monitoring is also valuable, especially for remote facilities. Verify camera specs for vibration and heat environments.
      </p>

      <h3 style={S.h3}>NOC / Security Operations Room</h3>
      <p style={S.p}>
        An entry camera outside the monitoring room. Cameras inside are useful for the operations log, but decide according to the privacy policy — review staff monitoring requirements.
      </p>

      <Callout type="best-practice" title="No Blind Spots — Overlap is Better Than Gap">
        When in doubt, overlap cameras rather than leave gaps. Overlapping the field of view of adjacent cameras ensures coverage stays in place even on camera failure or vandalism. Especially at critical entry points, a single camera is a single point of failure.
      </Callout>

      {/* ═══════════════════════════════════════════════════════════════
          SECTION 13 — TIME SYNCHRONIZATION
      ═══════════════════════════════════════════════════════════════ */}
      <h2 id="time-sync" style={S.h2}>Time Synchronization & NTP</h2>

      <p style={S.p}>
        For CCTV footage timestamps to be forensically valid, all cameras, the NVR/VMS and switches must be on synchronized time. If a camera's clock is 5 minutes off, correlating the footage with an incident becomes very difficult — and in legal proceedings the admissibility of the footage gets questioned.
      </p>

      <p style={S.p}>
        Use <strong>NTP (Network Time Protocol)</strong> — sync the cameras and NVR/VMS with an authoritative NTP server. A data center typically already has an NTP server that the IT infrastructure syncs with — the CCTV system should use the same NTP source. Configure the NTP server address in the cameras and periodically verify the sync status.
      </p>

      <Callout type="important" title="Timezone Configuration — Common Error">
        Configure all cameras and the NVR/VMS to the same timezone. In multi-country operations or India-specific deployments IST (UTC+5:30) must be set correctly. Daylight saving time is not applicable in India, but check DST settings on imported equipment — if it is inadvertently enabled the time goes off.
      </Callout>

      {/* ═══════════════════════════════════════════════════════════════
          SECTION 14 — INTEGRATION
      ═══════════════════════════════════════════════════════════════ */}
      <h2 id="integration" style={S.h2}>Integration with Access Control & Other Systems</h2>

      <p style={S.p}>
        CCTV is not just standalone surveillance — in a data center it is part of the broader physical security ecosystem. Integration gives more value.
      </p>

      <h3 style={S.h3}>Access Control Integration</h3>
      <p style={S.p}>
        When an access control event triggers — door open, badge swipe, failed authentication — CCTV should automatically start recording on that door's camera and save an event-linked snapshot. The operator should be able to see both systems from one unified interface — the access log and the corresponding video simultaneously. This is possible through SDK or protocol-level integration of <TopicLink slug="access-control" variant="inline" /> with the VMS.
      </p>

      <h3 style={S.h3}>Biometric System Integration</h3>
      <p style={S.p}>
        When an authentication event happens at a <TopicLink slug="biometrics" variant="inline" /> reader, the camera footage should be automatically tagged — when, where, whose biometric was verified. On failed attempts an alert should be generated and the corresponding video clip should go to the security team.
      </p>

      <h3 style={S.h3}>BMS Integration</h3>
      <p style={S.p}>
        Alarms from the BMS (Building Management System) — fire alarm, door forced open, equipment fault — can trigger CCTV. The cameras of the relevant area should automatically pop up on the security operator's screen. This augments manual monitoring.
      </p>

      <h3 style={S.h3}>Video Analytics</h3>
      <p style={S.p}>
        Modern VMS platforms support built-in or third-party video analytics — line crossing detection (perimeter breach), loitering detection, crowd detection, abandoned object detection, intrusion detection. AI-based face recognition is also available in advanced systems. Analytics can also generate false alarms — threshold tuning and operator training are important.
      </p>

      <Callout type="maintenance" title="Integration Testing — Commission It, Don't Assume">
        A common mistake with integration is testing it at install time and then never verifying it again. The integration can break when access control changes, when the VMS is upgraded, or when the network changes. Schedule quarterly integration tests and log the results.
      </Callout>

      {/* ═══════════════════════════════════════════════════════════════
          SECTION 15 — CYBERSECURITY
      ═══════════════════════════════════════════════════════════════ */}
      <h2 id="cybersecurity" style={S.h2}>Cybersecurity for IP CCTV</h2>

      <p style={S.p}>
        IP CCTV cameras are network-connected devices — which means they are also an attack surface. Poorly secured cameras have historically been used for botnets (Mirai), unauthorized access and lateral movement into corporate networks. Cybersecurity controls are essential for data center CCTV.
      </p>

      <h3 style={S.h3}>Credential Management</h3>
      <p style={S.p}>
        Default credentials — "admin/admin", "admin/12345" — must never be left in place. Set strong, unique credentials at installation itself. Store them in a password management system. Define a periodic rotation schedule. Keep the CCTV system credentials separate from IT infrastructure credentials.
      </p>

      <h3 style={S.h3}>Network Isolation</h3>
      <p style={S.p}>
        Isolate CCTV cameras and the NVR on a dedicated VLAN — separate from the production IT network. Cameras do not need direct internet access — if remote access is needed, route it through a VPN. Define firewall rules so that only authorized hosts (VMS server, monitoring workstations) can communicate with the CCTV VLAN.
      </p>

      <h3 style={S.h3}>Firmware Management</h3>
      <p style={S.p}>
        Update camera and NVR firmware regularly — CVEs and security patches get addressed. Subscribe to manufacturer security advisories. Replace end-of-life cameras — once firmware updates stop, the security risk increases significantly. Keep the firmware update schedule as part of quarterly maintenance.
      </p>

      <h3 style={S.h3}>Encryption & Protocols</h3>
      <p style={S.p}>
        Configure HTTPS for the camera web interface, encrypted RTSP (RTSPS), and TLS for VMS communication. Disable HTTP and unencrypted RTSP wherever possible. Configure role-based access control for VMS access — operators should be able to see only assigned cameras, and full admin access should be limited.
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
        Some countries and government-aligned facilities have placed restrictions on specific CCTV manufacturers due to security concerns. In government facilities, defense-adjacent sites and certain compliance frameworks an approved vendor list is mandatory. Verify applicable regulations and client requirements at the time of project specification.
      </Callout>
    </>
  );
}
