"use client";

import { S, Callout, ComparisonTable } from "../shared";

export default function RecordingAndStorage() {
  return (
    <>
      {/* ═══════════════════════════════════════════════════════════════
          SECTION 7 — NVR, DVR AND VMS
      ═══════════════════════════════════════════════════════════════ */}
      <h2 id="nvr-dvr-vms" style={S.h2}>NVR, DVR and VMS</h2>

      <p style={S.p}>
        The <strong>DVR (Digital Video Recorder)</strong> is used with analog CCTV systems — it receives the analog signal, digitizes it and stores it on HDDs. In modern data centers the DVR is outdated and IP-based systems are generally used.
      </p>

      <p style={S.p}>
        The <strong>NVR (Network Video Recorder)</strong> is a dedicated hardware appliance. It receives the already compressed stream from IP cameras and stores it on internal HDDs. It is an integrated solution in a fixed form factor — easy to deploy, limited scalability. It is common for entry to mid-level data center CCTV deployments. Typically 4, 8, 16, 32 or 64 channel options are available.
      </p>

      <p style={S.p}>
        <strong>VMS (Video Management Software)</strong> is a software platform installed on a standard server. It is highly scalable — it can manage hundreds or thousands of cameras. Integration with access control systems, advanced analytics (motion detection, line crossing, loitering, face recognition), multi-site management and role-based access are all available in a VMS. Architecture selection — dedicated NVR, VMS or a hybrid approach — depends on scale, integration requirements, redundancy needs and the project specification.
      </p>

      <ComparisonTable
        title="NVR vs VMS — Data Center Perspective"
        headers={["Feature", "NVR (Hardware Appliance)", "VMS (Software Platform)"]}
        rows={[
          ["Hardware", "Dedicated appliance", "Standard server (Windows/Linux)"],
          ["Scalability", "Fixed channel count", "Highly scalable — hundreds of cameras"],
          ["Cost (upfront)", "Lower", "Higher (server + licenses)"],
          ["Integration", "Basic access control", "Deep integration — AC, BMS, analytics"],
          ["Analytics", "Basic motion detection", "Advanced — AI, face recognition, etc."],
          ["Management", "Single site typically", "Multi-site centralized"],
          ["Redundancy", "Single point of failure unless HA setup", "Can be clustered/redundant"],
          ["Data Center fit", "Small to mid-size", "Mid to large / enterprise"],
        ]}
      />

      <p style={S.p}>
        Popular VMS platforms include Milestone XProtect, Genetec Security Center, Avigilon Control Center, Hanwha Wisenet WAVE and Hikvision iVMS/HikCentral. Platform selection depends on project size, integration requirements, client preference and budget.
      </p>

      {/* ═══════════════════════════════════════════════════════════════
          SECTION 8 — POE SWITCH
      ═══════════════════════════════════════════════════════════════ */}
      <h2 id="poe-switch" style={S.h2}>PoE Switch & Network Connectivity</h2>

      <p style={S.p}>
        PoE — <strong>Power over Ethernet</strong> — is an IEEE standard (802.3af, 802.3at, 802.3bt) that delivers power along with data through the Ethernet cable. This is a critical feature for IP cameras — a single Cat6 cable gives the camera both network connectivity and power. A separate power supply and outlet at every camera location is simply not needed.
      </p>

      <p style={S.p}>
        PoE standards differ in power budget:
      </p>
      <ul style={S.ul}>
        <li><strong>802.3af (PoE)</strong> — 15.4W per port, 12.95W at device. Sufficient for basic IP cameras.</li>
        <li><strong>802.3at (PoE+)</strong> — 30W per port, 25.5W at device. For PTZ cameras, cameras with heaters or blowers.</li>
        <li><strong>802.3bt (PoE++)</strong> — 60W (Type 3) or 100W (Type 4) per port. For high-power PTZ, multi-sensor cameras.</li>
      </ul>

      <p style={S.p}>
        <strong>Key considerations for switch selection:</strong> Total PoE budget — the switch's total power budget must be more than the aggregate power supply of all cameras. Port count — plan extra ports for future expansion. A <strong>managed switch</strong> is mandatory in a data center — VLAN configuration, port monitoring, port-level power control, SNMP monitoring all come with a managed switch. Uplink ports — Gigabit or 10G uplinks to the NVR/VMS server for adequate bandwidth.
      </p>

      <Callout type="important" title="PoE Switch Total Power Budget — Common Oversight">
        A 24-port PoE+ switch has 30W per port — but the total switch power budget is typically less than the total port power. Example: 24-port × 30W = 720W theoretical, but the switch's actual PoE budget may be 370W. All ports will not run at full power simultaneously — but do worst-case planning and verify the actual PoE budget from the datasheet.
      </Callout>

      {/* ═══════════════════════════════════════════════════════════════
          SECTION 9 — STORAGE: LOCAL HDD, NAS & RAID
      ═══════════════════════════════════════════════════════════════ */}
      <h2 id="storage" style={S.h2}>Storage: Local HDD, NAS & RAID</h2>

      <p style={S.p}>
        CCTV recordings are typically stored in two places — the <strong>NVR's internal HDDs</strong> (primary, immediate access) and <strong>NAS (Network Attached Storage)</strong> (extended retention, backup).
      </p>

      <p style={S.p}>
        Use <strong>surveillance-grade HDDs</strong> — Western Digital Purple, Seagate SkyHawk, or similar. Standard desktop HDDs are not designed for the continuous 24/7 write workload of CCTV — there is a risk of premature failure. Surveillance HDDs come with higher workload ratings, vibration compensation and ATA streaming command optimization.
      </p>

      <p style={S.p}>
        <strong>NAS (Network Attached Storage)</strong> is a dedicated network storage device with multiple HDDs installed. The NVR or VMS offloads footage to the NAS over the network. NAS is used for extended retention, for centralized storage in multi-NVR environments, and for redundant storage.
      </p>

      <p style={S.p}>
        <strong>RAID (Redundant Array of Independent Disks)</strong> combines multiple HDDs to provide performance or redundancy (or both). Common RAID levels:
      </p>
      <ul style={S.ul}>
        <li><strong>RAID 0 (Striping)</strong> — better performance, but zero redundancy. One disk fails = all data gone. Avoid it for CCTV.</li>
        <li><strong>RAID 1 (Mirroring)</strong> — both disks are identical copies. One fails = continue from the other. 50% capacity overhead. Suitable for small NAS/NVR.</li>
        <li><strong>RAID 5</strong> — minimum 3 disks, one disk equivalent of parity data. Can tolerate one disk failure. Good read performance. There is data risk during rebuild time.</li>
        <li><strong>RAID 6</strong> — minimum 4 disks, two disk equivalent of parity. Tolerates two disks failing simultaneously. Recommended for large NAS deployments.</li>
        <li><strong>RAID 10 (1+0)</strong> — mirroring + striping. Good performance and redundancy. 50% capacity overhead. For NAS performance environments.</li>
      </ul>

      <Callout type="warning" title="RAID Is Not a Backup — Understanding This Is Critical">
        RAID protects against disk hardware failure — only that. RAID does not protect against accidental deletion. RAID does not protect against ransomware or malware. RAID does not protect against a site disaster. RAID does not always catch silent data corruption. An actual backup means a separate independent copy of the data — at a different location. In CCTV systems RAID ensures availability — define the backup strategy separately.
      </Callout>

      <p style={S.p}>
        Surveillance-grade NAS OEMs include Synology, QNAP, Milestone Arcus and NetApp entry-level. In enterprise deployments enterprise storage like EMC, NetApp, Isilon is also used. Selection depends on project requirements, capacity, redundancy needs and VMS compatibility.
      </p>

      {/* ═══════════════════════════════════════════════════════════════
          SECTION 10 — STORAGE PLANNING & RETENTION
      ═══════════════════════════════════════════════════════════════ */}
      <h2 id="storage-planning" style={S.h2}>Recording Retention & Capacity Planning</h2>

      <p style={S.p}>
        The storage requirement depends on camera count, resolution, FPS, bitrate, recording hours per day and the retention period. For accurate planning use manufacturer-provided bandwidth calculators or VMS built-in calculators — they consider camera-specific bitrates. Below is an approximate calculation framework:
      </p>

      <p style={S.p}>
        <strong>Approximate formula:</strong>
      </p>
      <p style={S.p}>
        Storage (GB) = Bitrate (Mbps) ÷ 8 × 3600 × Recording hours per day × Retention days × Camera count ÷ 1000
      </p>
      <p style={S.p}>
        The ÷ 8 converts Mbps to MB/s; × 3600 gives MB per hour; the final ÷ 1000 converts MB to GB.
      </p>

      <p style={S.p}>
        <strong>Example (illustrative only):</strong> 50 cameras, continuous 24 h, 30 days retention,
        estimated ~2 Mbps per camera (actual bitrate varies widely with scene activity, resolution, GOP
        structure, codec and camera settings — use VMS/manufacturer calculators for real planning).
      </p>
      <p style={S.p}>
        Raw storage = 2 ÷ 8 × 3600 × 24 × 30 × 50 ÷ 1000 ≈ <strong>~32,400 GB ≈ ~32 TB</strong>.
        Add 20–30 % overhead for filesystem, indexing and safety margin — roughly 40–42 TB usable
        storage target for this scenario. Actual numbers will differ — always verify with VMS calculator
        and camera-specific bitrate data.
      </p>

      <Callout type="best-practice" title="Motion-Based Recording — Storage Optimization">
        Continuous recording consumes maximum storage. Motion detection recording — only when there is movement — significantly reduces storage, especially in areas that mostly stay idle (storage rooms, non-critical corridors). Specify continuous recording for critical areas (server halls, entry points, mantrap) and use motion recording only for low-risk areas.
      </Callout>

      {/* ═══════════════════════════════════════════════════════════════
          SECTION 11 — RECORDING MODES & RELIABILITY
      ═══════════════════════════════════════════════════════════════ */}
      <h2 id="recording-modes" style={S.h2}>Recording Modes & Reliability</h2>

      <p style={S.p}>
        <strong>Continuous Recording</strong> — keeps recording 24/7 without stopping. Maximum storage and bandwidth, but no gaps. Recommended for critical areas.
      </p>

      <p style={S.p}>
        <strong>Motion Detection Recording</strong> — the camera or VMS starts recording when it detects motion and stops a few seconds after the motion ends. Storage is saved, but the motion detection algorithm can cause missed events or false triggers. Configure a post-event buffer — keep recording for a few seconds even after the motion ends.
      </p>

      <p style={S.p}>
        <strong>Schedule-Based Recording</strong> — record during specific hours. Full recording during business hours, motion-only during off-hours — or the reverse. Useful for offices but data centers typically need 24/7 recording.
      </p>

      <p style={S.p}>
        <strong>Edge Recording</strong> — records directly to the camera's SD card. Backup footage stays available during an NVR/network failure. Enable edge storage on important cameras as a fallback. SD card capacity is limited — only a short-term buffer.
      </p>

      <Callout type="important" title="UPS for CCTV — Non-Negotiable">
        Connect the CCTV system to UPS — a power failure must not create a recording gap. The moment of a power cut is exactly when footage is most critical. The NVR/VMS server, PoE switches and monitoring workstation must all be on UPS backup. Design the battery runtime according to project requirements.
      </Callout>
    </>
  );
}
