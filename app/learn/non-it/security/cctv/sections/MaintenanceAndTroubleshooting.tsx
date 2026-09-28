"use client";

import { S, Callout, ComparisonTable } from "../shared";

export default function MaintenanceAndTroubleshooting() {
  return (
    <>
      {/* ═══════════════════════════════════════════════════════════════
          SECTION 16 — PREVENTIVE MAINTENANCE
      ═══════════════════════════════════════════════════════════════ */}
      <h2 id="preventive-maintenance" style={S.h2}>Preventive Maintenance</h2>

      <p style={S.p}>
        CCTV maintenance can look unnecessary — the cameras are just running. But without maintenance the lenses get dirty, storage HDDs degrade, RAID arrays go into a degraded state (with disk failures or rebuild risks), and integration breaks. You find out when a security incident happens and the footage is not there.
      </p>

      <p style={S.p}>
        Below is an example maintenance schedule — adjust the actual frequency according to OEM recommendations, client security policy, site conditions and applicable compliance requirements.
      </p>

      <h3 style={S.h3}>Monthly Checks (Example Frequency)</h3>
      <ul style={S.ul}>
        <li>Open the VMS/NVR dashboard — are all cameras online? Is any "Disconnected" or "No Signal"?</li>
        <li>Storage health check — NVR/NAS disk status, RAID health (if it is RAID 5/6 it must not be in a degraded state)</li>
        <li>Verify retention — is the oldest recorded footage available up to the required retention period?</li>
        <li>Verify NTP sync status — is the time of the cameras and NVR accurate?</li>
        <li>Check the video quality of sample cameras — blur, artifacts, or distortion?</li>
        <li>Check PoE switch port status — is the power draw in the expected range?</li>
        <li>UPS health check — is backup power functional for the CCTV equipment?</li>
      </ul>

      <h3 style={S.h3}>Quarterly Checks (Example Frequency)</h3>
      <ul style={S.ul}>
        <li>Physical camera inspection — lens cleaning (microfiber cloth, lens cleaner), housing check, tighten mounting bolts</li>
        <li>Check the weatherproofing seal on outdoor cameras — look for signs of moisture ingress</li>
        <li>Are the IR LEDs functional — test at night or in low light</li>
        <li>PTZ cameras — test pan, tilt, zoom functions; verify preset positions</li>
        <li>Firmware version check — are updates available? Schedule them</li>
        <li>Access control integration test — is the camera popup happening on a badge event?</li>
        <li>Alarm integration test — generate a test alarm, verify the camera response</li>
        <li>VMS user access audit — disable inactive accounts</li>
        <li>Review storage drive health SMART data — replace failing drives early</li>
      </ul>

      <h3 style={S.h3}>Annual Checks (Example Frequency)</h3>
      <ul style={S.ul}>
        <li>Generate a complete system health report — from the VMS or manually</li>
        <li>All cameras physical walkthrough — mounting, direction, coverage still adequate?</li>
        <li>HDD health review — check SMART data, workload rating and OEM warranty; base replacement on drive health, SMART alerts and failure trends, not on a fixed calendar cycle</li>
        <li>NVR/VMS server hardware health — RAM, CPU, power supply</li>
        <li>Disaster recovery test — test the footage access process on an NVR failure</li>
        <li>Security audit — credentials, VLAN configuration, firewall rules review</li>
        <li>End-of-life camera assessment — identify cameras whose manufacturer support is ending</li>
      </ul>

      <Callout type="best-practice" title="Maintenance Log — Evidence and Trend Analysis">
        Log every maintenance activity — date, technician, checks performed, findings, actions taken. This log provides evidence at audit time and helps in trend analysis — recurring issues get caught early. Both a CMMS and a simple spreadsheet are acceptable — consistency is what matters.
      </Callout>

      {/* ═══════════════════════════════════════════════════════════════
          SECTION 17 — TROUBLESHOOTING
      ═══════════════════════════════════════════════════════════════ */}
      <h2 id="troubleshooting" style={S.h2}>CCTV Troubleshooting — Engineer Step-by-Step</h2>

      <p style={S.p}>
        A systematic approach is essential in CCTV troubleshooting — random steps waste time and the real cause gets missed. For every fault: first check the most likely simple cause, isolate whether the problem is in the camera, the network or the NVR, then take corrective action.
      </p>

      {/* ─── Fault 1 ─── */}
      <h3 style={S.h3}>Fault 1: Camera Offline / No Video in VMS</h3>
      <p style={S.p}>
        <strong>First check:</strong> Check that port on the PoE switch — what is the port's LED status? Is the port online?
      </p>
      <p style={S.p}>
        <strong>Next check:</strong> Look at the port statistics in the switch management interface — is PoE power being delivered? Are there any port errors?
      </p>
      <p style={S.p}>
        <strong>Isolate:</strong> Plug a laptop or test device into that port — does it get a DHCP address? Is the network reachable? If yes, it is a camera issue. If no, it is a switch port or cable issue.
      </p>
      <p style={S.p}>
        <strong>Corrective action:</strong> Do a cable continuity test. Power cycle the camera (PoE port cycle). Ping the camera web interface. If the camera does not respond — try a factory reset. If the cable is faulty, replace it.
      </p>

      {/* ─── Fault 2 ─── */}
      <h3 style={S.h3}>Fault 2: Camera Powered But Not Visible in NVR/VMS</h3>
      <p style={S.p}>
        <strong>First check:</strong> Ping the camera IP address from the VMS server — does a response come back?
      </p>
      <p style={S.p}>
        <strong>Next check:</strong> Open the camera web interface in a browser — are the credentials correct? Is the camera video stream active?
      </p>
      <p style={S.p}>
        <strong>Isolate:</strong> Check the camera configuration in the VMS — are the IP address, port (typically 554 RTSP), credentials and stream URL correct?
      </p>
      <p style={S.p}>
        <strong>Corrective action:</strong> Re-add the camera in the NVR/VMS with the correct parameters. If the camera IP has changed, update it. Check VLAN routing — is the VMS reachable from the camera VLAN? Are firewall rules blocking it?
      </p>

      {/* ─── Fault 3 ─── */}
      <h3 style={S.h3}>Fault 3: Camera Online But No Recording</h3>
      <p style={S.p}>
        <strong>First check:</strong> Check the NVR/VMS storage status — is storage full? Is there an HDD error?
      </p>
      <p style={S.p}>
        <strong>Next check:</strong> Check the camera's recording schedule — is recording enabled and is the schedule correct?
      </p>
      <p style={S.p}>
        <strong>Isolate:</strong> Check the VMS event log — since when did the recording failure start? Is there a specific error message?
      </p>
      <p style={S.p}>
        <strong>Corrective action:</strong> If storage is full, check whether the age-based deletion policy for old footage is active or not. If there is an HDD error, replace the drive. Fix the recording schedule. Restart the NVR/VMS service.
      </p>

      {/* ─── Fault 4 ─── */}
      <h3 style={S.h3}>Fault 4: Playback Unavailable / Footage Not Found</h3>
      <p style={S.p}>
        <strong>First check:</strong> Select the date/time range and camera of the playback request — was the correct camera selected?
      </p>
      <p style={S.p}>
        <strong>Next check:</strong> Verify storage health — is the NVR/NAS storage accessible?
      </p>
      <p style={S.p}>
        <strong>Isolate:</strong> Try playback of another camera in the same time range — do you get footage? If yes, the original camera's recording was off at that time. Check the VMS recording logs.
      </p>
      <p style={S.p}>
        <strong>Corrective action:</strong> Identify the root cause of the recording gap — power failure, network outage, storage error? If the footage is permanently lost, document it and prevent future recurrence. Verify the retention settings in the NVR/VMS — footage must be available for the required period.
      </p>

      {/* ─── Fault 5 ─── */}
      <h3 style={S.h3}>Fault 5: Poor or Blurry Image Quality</h3>
      <p style={S.p}>
        <strong>First check:</strong> Physically check the camera lens — dust, smudges, spider web? Clean it.
      </p>
      <p style={S.p}>
        <strong>Next check:</strong> Check the focus settings in the camera — if it is an autofocus camera, trigger a refocus. If it is manual focus, adjust it.
      </p>
      <p style={S.p}>
        <strong>Isolate:</strong> Check the camera image settings — reset sharpness, brightness, contrast to default. Check bitrate/resolution settings — too low a bitrate causes compression artifacts.
      </p>
      <p style={S.p}>
        <strong>Corrective action:</strong> Clean the lens, adjust the focus. If it is an IR camera and the daytime image looks overexposed — the IR cut filter may be malfunctioning. Check the IR illuminators. Increase the bitrate if bandwidth is available.
      </p>

      {/* ─── Fault 6 ─── */}
      <h3 style={S.h3}>Fault 6: IR Night Vision Not Working</h3>
      <p style={S.p}>
        <strong>First check:</strong> IR LEDs are off in the daytime — test in a dark condition or force the camera's IR cut filter into night mode.
      </p>
      <p style={S.p}>
        <strong>Next check:</strong> Check the IR mode in camera settings — Auto/On/Off? In Auto mode, is the light sensor detecting correctly?
      </p>
      <p style={S.p}>
        <strong>Isolate:</strong> IR LED status — on some cameras the IR LEDs are visible (faint red glow) — is there a glow or not? Look at the camera's night image from the VMS.
      </p>
      <p style={S.p}>
        <strong>Corrective action:</strong> Fix the IR mode settings. If there is an IR LED failure, replace the camera — IR LEDs are typically not repairable in the field. When an object is very close within IR range, overexposure happens — review the camera placement.
      </p>

      {/* ─── Fault 7 ─── */}
      <h3 style={S.h3}>Fault 7: Intermittent Camera Disconnection</h3>
      <p style={S.p}>
        <strong>First check:</strong> Look at the error counters in the PoE switch port statistics — CRC errors, flapping? Cable quality issue?
      </p>
      <p style={S.p}>
        <strong>Next check:</strong> Monitor the camera power draw — is the PoE budget being exceeded? Is the switch overloaded?
      </p>
      <p style={S.p}>
        <strong>Isolate:</strong> Temporarily move the camera to another switch port — does the problem resolve? Swap the cable.
      </p>
      <p style={S.p}>
        <strong>Corrective action:</strong> Replace the bad cable. Re-terminate the connector. If the PoE switch is overloaded, redistribute the load or upgrade the switch. Update the camera firmware — some disconnection bugs are fixed in firmware.
      </p>

      {/* ─── Fault 8 ─── */}
      <h3 style={S.h3}>Fault 8: NVR HDD Error / No Disk / Disk Failure Alert</h3>
      <p style={S.p}>
        <strong>First check:</strong> Check the HDD status on the NVR front panel or web interface — SMART errors? Is the HDD not being detected?
      </p>
      <p style={S.p}>
        <strong>Next check:</strong> Is there a loose HDD connection? Are the power and SATA cables firmly connected?
      </p>
      <p style={S.p}>
        <strong>Isolate:</strong> If it is a RAID system — check the RAID array status. One disk fails = RAID degraded, two disks fail = RAID offline (in RAID 5). If there are multiple HDDs, identify the failed disk.
      </p>
      <p style={S.p}>
        <strong>Corrective action:</strong> Replace the failed HDD — same capacity and surveillance-grade. The RAID rebuild will start automatically. A second disk failure during rebuild is catastrophic — verify the backup first. In a non-RAID NVR, footage may be lost after replacement — inform the client.
      </p>

      {/* ─── Fault 9 ─── */}
      <h3 style={S.h3}>Fault 9: Storage Full / Low Retention</h3>
      <p style={S.p}>
        <strong>First check:</strong> Check the VMS/NVR storage usage percentage — is it actually full or is the alert setting triggering too early?
      </p>
      <p style={S.p}>
        <strong>Next check:</strong> Does old footage get overwritten or is manual deletion required? Is the overwrite policy correctly configured?
      </p>
      <p style={S.p}>
        <strong>Isolate:</strong> Which cameras are consuming more storage? Is the bitrate unexpectedly high on any camera?
      </p>
      <p style={S.p}>
        <strong>Corrective action:</strong> Enable the overwrite policy (oldest footage first). Optimize high bitrate cameras — enable H.265, reduce resolution/FPS where possible. Long-term: add a NAS or expand existing storage. Enable motion-based recording on low-activity cameras.
      </p>

      {/* ─── Fault 10 ─── */}
      <h3 style={S.h3}>Fault 10: Network / PoE Switch Issue — Multiple Cameras Offline</h3>
      <p style={S.p}>
        <strong>First check:</strong> How many cameras are offline and where are they? Are they connected to the same switch?
      </p>
      <p style={S.p}>
        <strong>Next check:</strong> Ping the PoE switch — is it reachable? Switch power status?
      </p>
      <p style={S.p}>
        <strong>Isolate:</strong> Power cycle the switch — do the cameras come back? Is the switch management interface accessible? Uplink port status?
      </p>
      <p style={S.p}>
        <strong>Corrective action:</strong> If there is a switch power issue, check the power supply. If the switch has completely failed, replace it — keeping a spare switch ready is good practice. Check the uplink cable/SFP. Restore the switch configuration from backup.
      </p>

      {/* ─── Fault 11 ─── */}
      <h3 style={S.h3}>Fault 11: Wrong Camera Time / Date</h3>
      <p style={S.p}>
        <strong>First check:</strong> Is the NTP server address configured in the camera? Is it the correct NTP server IP?
      </p>
      <p style={S.p}>
        <strong>Next check:</strong> Is the NTP server reachable from the camera? Is a VLAN/firewall blocking it?
      </p>
      <p style={S.p}>
        <strong>Isolate:</strong> Check the NVR/VMS time — is the NVR time wrong too? If the NVR is also wrong, it is an upstream NTP issue.
      </p>
      <p style={S.p}>
        <strong>Corrective action:</strong> Reconfigure the NTP settings in the camera. Verify NTP server reachability. Check the timezone settings — is IST +5:30 set correctly? Disable DST. Sync the NVR/VMS with NTP too.
      </p>

      {/* ─── Fault 12 ─── */}
      <h3 style={S.h3}>Fault 12: Multiple Cameras Offline Simultaneously</h3>
      <p style={S.p}>
        <strong>First check:</strong> Are the offline cameras on a common switch or in a common area? Has a core network event happened — outage, maintenance?
      </p>
      <p style={S.p}>
        <strong>Next check:</strong> Is the NVR/VMS server online? Has the NVR/VMS service crashed?
      </p>
      <p style={S.p}>
        <strong>Isolate:</strong> Connect one camera directly to a laptop — is it reachable? Restart the NVR/VMS service.
      </p>
      <p style={S.p}>
        <strong>Corrective action:</strong> If it is a core network issue, coordinate with the network team. If the NVR/VMS service crashed, restart it — identify the root cause (disk full? software bug?). If there was a power outage, verify UPS coverage — is backup power adequate for the CCTV equipment?
      </p>

      {/* ─── Fault 13 ─── */}
      <h3 style={S.h3}>Fault 13: NAS / Network Storage Unreachable</h3>
      <p style={S.p}>
        <strong>First check:</strong> Ping the NAS from the NVR/VMS server — is it reachable? Is the NAS powered on?
      </p>
      <p style={S.p}>
        <strong>Next check:</strong> Open the NAS management interface — is there any hardware alert? Disk failure?
      </p>
      <p style={S.p}>
        <strong>Isolate:</strong> Verify the network path — are the NAS and NVR/VMS on the same VLAN or is routing required? Switch port status?
      </p>
      <p style={S.p}>
        <strong>Corrective action:</strong> Power cycle the NAS. Check the network connection. Verify the NAS credentials — has the password changed? Check the CIFS/NFS mount settings in the NVR. If there is a NAS disk failure, replace the failed disk.
      </p>

      {/* ─── Fault 14 ─── */}
      <h3 style={S.h3}>Fault 14: NVR/VMS Connected to NAS But Recording Fails</h3>
      <p style={S.p}>
        <strong>First check:</strong> Check the available space on the NAS — is it full?
      </p>
      <p style={S.p}>
        <strong>Next check:</strong> Check the NAS share permissions — does the NVR/VMS account have write access?
      </p>
      <p style={S.p}>
        <strong>Isolate:</strong> Look for storage error messages in the NVR/VMS event log — note the specific error code.
      </p>
      <p style={S.p}>
        <strong>Corrective action:</strong> Explicitly set write permission on the NAS share for the NVR/VMS account. Is the path correctly configured in the NVR? Check SMB/NFS version compatibility. Is antivirus or security software on the NAS blocking the recording? Free up space or expand capacity.
      </p>

      {/* ─── Fault 15 ─── */}
      <h3 style={S.h3}>Fault 15: RAID Degraded / Disk Failure Alert on NAS</h3>
      <p style={S.p}>
        <strong>First check:</strong> Identify the exact RAID status and failed disk in the NAS management interface — one or two disks failed in RAID 5/6?
      </p>
      <p style={S.p}>
        <strong>Next check:</strong> Is recording continuing in the RAID degraded state? The data is at risk — replacement before a second failure is urgent.
      </p>
      <p style={S.p}>
        <strong>Isolate:</strong> Note the failed disk model/serial. The replacement disk must be the same capacity or larger, same or better speed.
      </p>
      <p style={S.p}>
        <strong>Corrective action:</strong> Order a same-capacity surveillance-grade HDD immediately. In a hot-swap capable NAS — it can be replaced in running condition. For non-hot-swap, schedule a maintenance window. After replacement the RAID rebuild will start automatically — NAS performance will be reduced during the rebuild. Monitor closely until the rebuild is complete. Set a notification for RAID rebuild completion.
      </p>

      <Callout type="warning" title="RAID Rebuild During Active Recording — Caution">
        During a RAID rebuild there is additional load on the NAS/NVR. In large arrays a rebuild can take hours to days. During this period there is a risk of an additional disk failure — if two disks fail in RAID 5, all data is gone. Do extra monitoring during the rebuild period and avoid unnecessary load.
      </Callout>

      {/* Troubleshooting Summary Table */}
      <ComparisonTable
        title="CCTV Troubleshooting Quick Reference"
        headers={["Symptom", "First Check", "Next Check", "Likely Cause", "Corrective Action"]}
        rows={[
          ["Camera offline", "PoE switch port LED/status", "Network ping to camera IP", "Cable fault / PoE issue", "Cable test, port cycle, camera reset"],
          ["Camera powered, not in VMS", "Ping camera IP from VMS server", "Camera web interface", "IP/credential mismatch in VMS", "Re-add camera with correct params"],
          ["No recording", "Storage status in VMS/NVR", "Recording schedule config", "Storage full / schedule error", "Fix storage policy or schedule"],
          ["Playback unavailable", "Correct camera+date selected?", "Storage health check", "Recording gap or HDD failure", "Check recording logs, replace HDD"],
          ["Blurry image", "Lens physically dirty?", "Focus and bitrate settings", "Dirty lens / low bitrate", "Clean lens, adjust focus/bitrate"],
          ["IR not working", "Dark condition test", "IR mode settings in camera", "IR LEDs failed / wrong mode", "Fix IR mode, replace camera if LEDs failed"],
          ["Intermittent disconnect", "Switch port error counters", "Cable test / power budget", "Bad cable / PoE overload", "Replace cable, redistribute PoE load"],
          ["NVR HDD error", "NVR front panel / web status", "SMART data, cable check", "HDD failure", "Replace surveillance-grade HDD, rebuild RAID"],
          ["Storage full quickly", "Bitrate per camera check", "Overwrite policy config", "High bitrate / no overwrite", "Enable H.265, reduce bitrate, enable overwrite"],
          ["Multiple cameras offline", "Common switch status", "NVR/VMS service status", "Switch failure / VMS crash", "Restart switch/VMS, check UPS"],
          ["Wrong time on camera", "NTP config in camera", "NTP server reachability", "NTP not configured / unreachable", "Fix NTP settings, check firewall"],
          ["NAS unreachable", "Ping NAS from NVR server", "NAS management interface", "NAS power/network issue", "Power cycle NAS, check network path"],
          ["NAS connected, recording fails", "NAS free space", "Share write permissions", "Permissions / space issue", "Fix permissions, free space"],
          ["RAID degraded alert", "NAS RAID status, failed disk ID", "Is recording still working?", "Disk failure", "Replace failed HDD immediately, monitor rebuild"],
        ]}
      />
    </>
  );
}
