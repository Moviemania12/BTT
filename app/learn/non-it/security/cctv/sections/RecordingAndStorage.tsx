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
        <strong>DVR (Digital Video Recorder)</strong> analog CCTV systems ke saath use hota hai —
        analog signal receive karke digitize karta hai aur HDDs pe store karta hai. Modern data
        centers mein DVR outdated hai aur generally IP-based systems use karte hain.
      </p>

      <p style={S.p}>
        <strong>NVR (Network Video Recorder)</strong> ek dedicated hardware appliance hai. IP cameras
        se already compressed stream receive karta hai aur internal HDDs pe store karta hai. Ek fixed
        form factor mein integrated solution hai — easy to deploy, limited scalability. Entry to
        mid-level data center CCTV deployments ke liye common hai. Typically 4, 8, 16, 32 ya 64
        channel options available hain.
      </p>

      <p style={S.p}>
        <strong>VMS (Video Management Software)</strong> ek software platform hai jo standard server pe
        install hota hai. Highly scalable hai — hundreds ya thousands of cameras manage kar sakta hai.
        Access control systems ke saath integration, advanced analytics (motion detection, line crossing,
        loitering, face recognition), multi-site management, aur role-based access sab VMS mein available
        hain. Architecture selection — dedicated NVR, VMS ya hybrid approach — scale, integration requirements, redundancy needs aur project specification pe depend karta hai.
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
        Popular VMS platforms mein Milestone XProtect, Genetec Security Center, Avigilon Control Center,
        Hanwha Wisenet WAVE aur Hikvision iVMS/HikCentral include hain. Platform selection project size,
        integration requirements, client preference aur budget pe depend karta hai.
      </p>

      {/* ═══════════════════════════════════════════════════════════════
          SECTION 8 — POE SWITCH
      ═══════════════════════════════════════════════════════════════ */}
      <h2 id="poe-switch" style={S.h2}>PoE Switch & Network Connectivity</h2>

      <p style={S.p}>
        PoE — <strong>Power over Ethernet</strong> — ek IEEE standard hai (802.3af, 802.3at, 802.3bt)
        jo Ethernet cable ke through data ke saath power bhi deliver karta hai. IP cameras ke liye ye
        critical feature hai — single Cat6 cable se camera ko network connectivity aur power dono milti
        hai. Separate power supply aur outlet har camera location pe chahiye hi nahi.
      </p>

      <p style={S.p}>
        PoE standards power budget mein differ karte hain:
      </p>
      <ul style={S.ul}>
        <li><strong>802.3af (PoE)</strong> — 15.4W per port, 12.95W at device. Basic IP cameras ke liye sufficient.</li>
        <li><strong>802.3at (PoE+)</strong> — 30W per port, 25.5W at device. PTZ cameras, cameras with heaters ya blowers ke liye.</li>
        <li><strong>802.3bt (PoE++)</strong> — 60W (Type 3) ya 100W (Type 4) per port. High-power PTZ, multi-sensor cameras ke liye.</li>
      </ul>

      <p style={S.p}>
        <strong>Switch selection ke liye key considerations:</strong> Total PoE budget — switch ka total
        power budget sab cameras ki aggregate power supply se zyada hona chahiye. Port count — future
        expansion ke liye extra ports plan karo. <strong>Managed switch</strong> data center mein
        mandatory hai — VLAN configuration, port monitoring, port-level power control, SNMP monitoring
        sab managed switch se milte hain. Uplink ports — NVR/VMS server tak Gigabit ya 10G uplinks for
        adequate bandwidth.
      </p>

      <Callout type="important" title="PoE Switch Total Power Budget — Common Oversight">
        Ek 24-port PoE+ switch mein 30W per port hoti hai — lekin total switch power budget typically
        total port power se kam hoti hai. Example: 24-port × 30W = 720W theoretical, lekin switch ka
        actual PoE budget 370W ho sakta hai. Sab ports simultaneously full power pe nahi chalenge —
        lekin worst-case planning karo aur actual PoE budget verify karo datasheet se.
      </Callout>

      {/* ═══════════════════════════════════════════════════════════════
          SECTION 9 — STORAGE: LOCAL HDD, NAS & RAID
      ═══════════════════════════════════════════════════════════════ */}
      <h2 id="storage" style={S.h2}>Storage: Local HDD, NAS & RAID</h2>

      <p style={S.p}>
        CCTV recordings typically do jagah store hoti hain — <strong>NVR ke internal HDDs</strong> (primary,
        immediate access) aur <strong>NAS (Network Attached Storage)</strong> (extended retention, backup).
      </p>

      <p style={S.p}>
        <strong>Surveillance-grade HDDs</strong> use karo — Western Digital Purple, Seagate SkyHawk, ya
        similar. Standard desktop HDDs CCTV ke continuous 24/7 write workload ke liye designed nahi hote
        — premature failure ka risk hota hai. Surveillance HDDs higher workload ratings, vibration
        compensation, aur ATA streaming command optimization ke saath aate hain.
      </p>

      <p style={S.p}>
        <strong>NAS (Network Attached Storage)</strong> ek dedicated network storage device hai jisme
        multiple HDDs lagti hain. NVR ya VMS network ke through NAS pe footage offload karta hai.
        Extended retention ke liye, multi-NVR environments mein centralized storage ke liye, aur
        redundant storage ke liye NAS use hota hai.
      </p>

      <p style={S.p}>
        <strong>RAID (Redundant Array of Independent Disks)</strong> multiple HDDs ko combine karke
        performance ya redundancy (ya dono) provide karta hai. Common RAID levels:
      </p>
      <ul style={S.ul}>
        <li><strong>RAID 0 (Striping)</strong> — performance better, lekin zero redundancy. Ek disk fail = sab data gone. CCTV ke liye avoid karo.</li>
        <li><strong>RAID 1 (Mirroring)</strong> — dono disks identical copies. Ek fail = doosri se continue. 50% capacity overhead. Small NAS/NVR ke liye suitable.</li>
        <li><strong>RAID 5</strong> — minimum 3 disks, one disk equivalent parity data. Ek disk fail tolerate kar sakta hai. Read performance good. Rebuild time pe data risk hota hai.</li>
        <li><strong>RAID 6</strong> — minimum 4 disks, two disk equivalent parity. Do disks simultaneously fail tolerate karta hai. Large NAS deployments ke liye recommended.</li>
        <li><strong>RAID 10 (1+0)</strong> — mirroring + striping. Good performance aur redundancy. 50% capacity overhead. NAS performance environments ke liye.</li>
      </ul>

      <Callout type="warning" title="RAID Backup Nahi Hai — Ye Samajhna Critical Hai">
        RAID disk hardware failure se protect karta hai — sirf. RAID accidental deletion protect nahi
        karta. RAID ransomware ya malware se protect nahi karta. RAID site disaster se protect nahi
        karta. RAID silent data corruption always catch nahi karta. Actual backup ka matlab hai data ka
        separate independent copy — different location pe. CCTV systems mein RAID availability ensure
        karta hai — backup strategy alag define karo.
      </Callout>

      <p style={S.p}>
        Surveillance-grade NAS OEMs mein Synology, QNAP, Milestone Arcus, aur NetApp entry-level include
        hain. Enterprise deployments mein EMC, NetApp, Isilon jaisi enterprise storage bhi use hoti hai.
        Selection project requirements, capacity, redundancy needs aur VMS compatibility pe depend karta hai.
      </p>

      {/* ═══════════════════════════════════════════════════════════════
          SECTION 10 — STORAGE PLANNING & RETENTION
      ═══════════════════════════════════════════════════════════════ */}
      <h2 id="storage-planning" style={S.h2}>Recording Retention & Capacity Planning</h2>

      <p style={S.p}>
        Storage requirement camera count, resolution, FPS, bitrate, recording hours per day, aur
        retention period pe depend karti hai. Accurate planning ke liye manufacturer-provided bandwidth
        calculators ya VMS built-in calculators use karo — ye camera-specific bitrates consider karte
        hain. Neeche ek approximate calculation framework hai:
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
        Continuous recording maximum storage consume karta hai. Motion detection recording — sirf jab
        movement ho — storage significantly reduce karta hai, especially areas jo mostly idle rehte hain
        (storage rooms, non-critical corridors). Critical areas (server halls, entry points, mantrap) pe
        continuous recording specify karo aur motion recording sirf low-risk areas pe use karo.
      </Callout>

      {/* ═══════════════════════════════════════════════════════════════
          SECTION 11 — RECORDING MODES & RELIABILITY
      ═══════════════════════════════════════════════════════════════ */}
      <h2 id="recording-modes" style={S.h2}>Recording Modes & Reliability</h2>

      <p style={S.p}>
        <strong>Continuous Recording</strong> — 24/7 bina rok ke record hota rehta hai. Maximum storage
        aur bandwidth, lekin koi gap nahi. Critical areas ke liye recommended.
      </p>

      <p style={S.p}>
        <strong>Motion Detection Recording</strong> — camera ya VMS motion detect karne pe recording
        shuru karta hai, motion band hone ke baad kuch seconds baad stop karta hai. Storage save hoti
        hai lekin motion detection algorithm missed events ya false triggers cause kar sakta hai.
        Post-event buffer configure karo — motion end hone ke baad bhi kuch seconds record karo.
      </p>

      <p style={S.p}>
        <strong>Schedule-Based Recording</strong> — specific hours pe record karo. Business hours mein
        full recording, off-hours mein motion-only — ya reverse. Useful for offices but data centers
        typically need 24/7 recording.
      </p>

      <p style={S.p}>
        <strong>Edge Recording</strong> — camera ke SD card pe directly record karta hai. NVR/network
        failure mein backup footage available rehta hai. Important cameras pe edge storage enable karo
        as a fallback. SD card capacity limited hoti hai — sirf short-term buffer.
      </p>

      <Callout type="important" title="UPS for CCTV — Non-Negotiable">
        CCTV system ko UPS pe connect karo — power failure mein recording gap create nahi honi chahiye.
        Power cut hone ka waqt exactly wahi hota hai jab footage most critical hoti hai. NVR/VMS server,
        PoE switches, aur monitoring workstation sab UPS backup pe hone chahiye. Battery runtime project
        requirements ke hisaab se design karo.
      </Callout>
    </>
  );
}
