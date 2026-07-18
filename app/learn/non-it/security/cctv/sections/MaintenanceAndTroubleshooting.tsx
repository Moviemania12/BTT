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
        CCTV maintenance alag dikh sakta hai — cameras to bas chal rahi hain. Lekin bina maintenance ke
        lens dirty ho jaate hain, storage HDDs degrade hote hain, RAID arrays degraded state mein aa
        jaati hain (disk failures ya rebuild risks ke saath), aur integration break ho jaati hai. Jab ek security incident hota hai aur footage
        nahi milti — tab pata chalta hai.
      </p>

      <p style={S.p}>
        Neeche ek example maintenance schedule hai — actual frequency OEM recommendations, client security
        policy, site conditions aur applicable compliance requirements ke hisaab se adjust karo.
      </p>

      <h3 style={S.h3}>Monthly Checks (Example Frequency)</h3>
      <ul style={S.ul}>
        <li>VMS/NVR dashboard open karo — saari cameras online hain? Koi "Disconnected" ya "No Signal" hai?</li>
        <li>Storage health check — NVR/NAS disk status, RAID health (agar RAID 5/6 hai to degraded state nahi hona chahiye)</li>
        <li>Retention verify karo — oldest recorded footage required retention period tak available hai?</li>
        <li>NTP sync status verify karo — cameras aur NVR ka time accurate hai?</li>
        <li>Sample cameras ki video quality check karo — blur, artifacts, ya distortion?</li>
        <li>PoE switch port status check karo — power draw expected range mein hai?</li>
        <li>UPS health check — CCTV equipment pe backup power functional hai?</li>
      </ul>

      <h3 style={S.h3}>Quarterly Checks (Example Frequency)</h3>
      <ul style={S.ul}>
        <li>Physical camera inspection — lens cleaning (microfiber cloth, lens cleaner), housing check, mounting bolts tighten karo</li>
        <li>Outdoor cameras pe weatherproofing seal check karo — moisture ingress sign dekhte hain</li>
        <li>IR LEDs functional hain — raat ko ya low-light mein test karo</li>
        <li>PTZ cameras — pan, tilt, zoom functions test karo; preset positions verify karo</li>
        <li>Firmware version check — updates available hain? Schedule karo</li>
        <li>Access control integration test — badge event pe camera popup ho raha hai?</li>
        <li>Alarm integration test — test alarm generate karo, camera response verify karo</li>
        <li>VMS user access audit — inactive accounts disable karo</li>
        <li>Storage drive health SMART data review — failing drives early replace karo</li>
      </ul>

      <h3 style={S.h3}>Annual Checks (Example Frequency)</h3>
      <ul style={S.ul}>
        <li>Complete system health report generate karo — VMS se ya manual</li>
        <li>All cameras physical walkthrough — mounting, direction, coverage still adequate?</li>
        <li>HDD health review — SMART data, workload rating aur OEM warranty check karo; replacement drive health, SMART alerts aur failure trends pe base karo, kisi fixed calendar cycle pe nahi</li>
        <li>NVR/VMS server hardware health — RAM, CPU, power supply</li>
        <li>Disaster recovery test — NVR failure pe footage access process test karo</li>
        <li>Security audit — credentials, VLAN configuration, firewall rules review</li>
        <li>End-of-life camera assessment — manufacturer support band hone wale cameras identify karo</li>
      </ul>

      <Callout type="best-practice" title="Maintenance Log — Evidence aur Trend Analysis">
        Har maintenance activity log karo — date, technician, checks performed, findings, actions taken.
        Ye log audit ke time evidence deta hai aur trend analysis mein help karta hai — recurring issues
        early catch hote hain. CMMS ya simple spreadsheet dono acceptable hain — consistency important hai.
      </Callout>

      {/* ═══════════════════════════════════════════════════════════════
          SECTION 17 — TROUBLESHOOTING
      ═══════════════════════════════════════════════════════════════ */}
      <h2 id="troubleshooting" style={S.h2}>CCTV Troubleshooting — Engineer Step-by-Step</h2>

      <p style={S.p}>
        CCTV troubleshooting mein ek systematic approach zaroori hai — random steps se time waste hota
        hai aur real cause miss ho jaata hai. Har fault ke liye: pehle most likely simple cause check
        karo, isolate karo ki problem camera mein hai ya network mein ya NVR mein, phir corrective action lo.
      </p>

      {/* ─── Fault 1 ─── */}
      <h3 style={S.h3}>Fault 1: Camera Offline / No Video in VMS</h3>
      <p style={S.p}>
        <strong>First check:</strong> PoE switch pe wo port check karo — port ka LED status kya hai?
        Port online hai?
      </p>
      <p style={S.p}>
        <strong>Next check:</strong> Switch management interface mein port statistics dekho — PoE power
        deliver ho rahi hai? Koi port errors hain?
      </p>
      <p style={S.p}>
        <strong>Isolate:</strong> Laptop ya test device wo port pe plug karo — DHCP address milta hai?
        Network reachable hai? Agar yes, to camera issue hai. Agar no, to switch port ya cable issue hai.
      </p>
      <p style={S.p}>
        <strong>Corrective action:</strong> Cable continuity test karo. Camera power cycle karo (PoE
        port cycle). Camera web interface ping karo. Agar camera respond nahi karta — factory reset
        try karo. Cable fault ho to replace karo.
      </p>

      {/* ─── Fault 2 ─── */}
      <h3 style={S.h3}>Fault 2: Camera Powered But Not Visible in NVR/VMS</h3>
      <p style={S.p}>
        <strong>First check:</strong> Camera IP address ping karo VMS server se — response aata hai?
      </p>
      <p style={S.p}>
        <strong>Next check:</strong> Camera web interface browser mein open karo — credentials correct
        hain? Camera video stream active hai?
      </p>
      <p style={S.p}>
        <strong>Isolate:</strong> VMS mein camera configuration check karo — IP address, port (typically
        554 RTSP), credentials aur stream URL correct hain?
      </p>
      <p style={S.p}>
        <strong>Corrective action:</strong> NVR/VMS mein camera re-add karo with correct parameters.
        Camera IP change hua ho to update karo. VLAN routing check karo — camera VLAN se VMS reachable
        hai? Firewall rules block kar rahi hain?
      </p>

      {/* ─── Fault 3 ─── */}
      <h3 style={S.h3}>Fault 3: Camera Online But No Recording</h3>
      <p style={S.p}>
        <strong>First check:</strong> NVR/VMS storage status check karo — storage full hai? HDD error hai?
      </p>
      <p style={S.p}>
        <strong>Next check:</strong> Camera ki recording schedule check karo — recording enabled hai aur
        schedule correct hai?
      </p>
      <p style={S.p}>
        <strong>Isolate:</strong> VMS event log check karo — recording failure kab se shuru hua? Koi
        specific error message hai?
      </p>
      <p style={S.p}>
        <strong>Corrective action:</strong> Storage full hai to old footage age-based deletion policy
        active hai ya nahi check karo. HDD error hai to drive replace karo. Recording schedule fix karo.
        NVR/VMS service restart karo.
      </p>

      {/* ─── Fault 4 ─── */}
      <h3 style={S.h3}>Fault 4: Playback Unavailable / Footage Not Found</h3>
      <p style={S.p}>
        <strong>First check:</strong> Playback request ki date/time range aur camera select karo — correct
        camera select hua hai?
      </p>
      <p style={S.p}>
        <strong>Next check:</strong> Storage health verify karo — NVR/NAS storage accessible hai?
      </p>
      <p style={S.p}>
        <strong>Isolate:</strong> Dusri camera ka playback try karo same time range mein — kya footage
        milti hai? Agar yes, to original camera ka recording us time pe band tha. VMS recording logs check karo.
      </p>
      <p style={S.p}>
        <strong>Corrective action:</strong> Recording gap ka root cause identify karo — power failure,
        network outage, storage error? Agar footage permanently lost hai, document karo aur future
        recurrence prevent karo. NVR/VMS me retention settings verify karo — required period tak footage
        available honi chahiye.
      </p>

      {/* ─── Fault 5 ─── */}
      <h3 style={S.h3}>Fault 5: Poor or Blurry Image Quality</h3>
      <p style={S.p}>
        <strong>First check:</strong> Camera lens physically check karo — dust, smudges, spider web?
        Clean karo.
      </p>
      <p style={S.p}>
        <strong>Next check:</strong> Camera mein focus settings check karo — autofocus camera hai to
        refocus trigger karo. Manual focus hai to adjust karo.
      </p>
      <p style={S.p}>
        <strong>Isolate:</strong> Camera image settings check karo — sharpness, brightness, contrast
        default pe reset karo. Bitrate/resolution settings check karo — too low bitrate compression
        artifacts cause karta hai.
      </p>
      <p style={S.p}>
        <strong>Corrective action:</strong> Lens clean karo, focus adjust karo. Agar IR camera hai aur
        daytime image overexposed lag raha hai — IR cut filter malfunction ho sakta hai. IR illuminators
        check karo. Bitrate increase karo agar bandwidth available ho.
      </p>

      {/* ─── Fault 6 ─── */}
      <h3 style={S.h3}>Fault 6: IR Night Vision Not Working</h3>
      <p style={S.p}>
        <strong>First check:</strong> Daytime mein IR LEDs band hoti hain — dark condition mein test karo
        ya camera ke IR cut filter ko force karo night mode mein.
      </p>
      <p style={S.p}>
        <strong>Next check:</strong> Camera settings mein IR mode check karo — Auto/On/Off? Auto mode
        mein light sensor correctly detect kar raha hai?
      </p>
      <p style={S.p}>
        <strong>Isolate:</strong> IR LED status — kuch cameras pe IR LEDs visible hoti hain (faint red
        glow) — glow hai ya nahi? VMS se camera's night image dekho.
      </p>
      <p style={S.p}>
        <strong>Corrective action:</strong> IR mode settings fix karo. IR LED failure hai to camera
        replace karo — IR LEDs typically repairable nahi hoti field mein. IR range object ke bahut paas
        hone pe overexposure hota hai — camera placement review karo.
      </p>

      {/* ─── Fault 7 ─── */}
      <h3 style={S.h3}>Fault 7: Intermittent Camera Disconnection</h3>
      <p style={S.p}>
        <strong>First check:</strong> PoE switch port statistics mein error counters dekho — CRC errors,
        flapping? Cable quality issue?
      </p>
      <p style={S.p}>
        <strong>Next check:</strong> Camera power draw monitor karo — PoE budget exceed ho raha hai?
        Switch overloaded hai?
      </p>
      <p style={S.p}>
        <strong>Isolate:</strong> Camera temporarily dusre switch port pe move karo — problem resolve
        hoti hai? Cable swap karo.
      </p>
      <p style={S.p}>
        <strong>Corrective action:</strong> Bad cable replace karo. Connector re-terminate karo. PoE
        switch overload hai to load redistribute karo ya switch upgrade karo. Camera firmware update
        karo — some disconnection bugs firmware mein fix hote hain.
      </p>

      {/* ─── Fault 8 ─── */}
      <h3 style={S.h3}>Fault 8: NVR HDD Error / No Disk / Disk Failure Alert</h3>
      <p style={S.p}>
        <strong>First check:</strong> NVR front panel ya web interface mein HDD status check karo —
        SMART errors? HDD detected nahi ho raha?
      </p>
      <p style={S.p}>
        <strong>Next check:</strong> Koi loose HDD connection hai? Power aur SATA cables firmly
        connected hain?
      </p>
      <p style={S.p}>
        <strong>Isolate:</strong> Agar RAID system hai — RAID array status check karo. Ek disk fail =
        RAID degraded, do disk fail = RAID offline (RAID 5 mein). Multiple HDDs hai to failed disk
        identify karo.
      </p>
      <p style={S.p}>
        <strong>Corrective action:</strong> Failed HDD replace karo — same capacity aur surveillance-grade.
        RAID rebuild start hoga automatically. Rebuild ke time second disk failure catastrophic hota hai —
        backup verify karo pehle. Non-RAID NVR mein replacement ke baad footage lost ho sakti hai —
        client ko inform karo.
      </p>

      {/* ─── Fault 9 ─── */}
      <h3 style={S.h3}>Fault 9: Storage Full / Low Retention</h3>
      <p style={S.p}>
        <strong>First check:</strong> VMS/NVR storage usage percentage check karo — actually full hai ya
        alert setting too early trigger hai?
      </p>
      <p style={S.p}>
        <strong>Next check:</strong> Old footage overwrite hoti hai ya manual deletion required hai?
        Overwrite policy correctly configured hai?
      </p>
      <p style={S.p}>
        <strong>Isolate:</strong> Konsi cameras zyada storage consume kar rahi hain? Bitrate unexpected
        high hai kisi camera pe?
      </p>
      <p style={S.p}>
        <strong>Corrective action:</strong> Overwrite policy enable karo (oldest footage first). High
        bitrate cameras optimize karo — H.265 enable karo, resolution/FPS reduce karo jahan possible.
        Long-term: NAS add karo ya existing storage expand karo. Motion-based recording low-activity
        cameras pe enable karo.
      </p>

      {/* ─── Fault 10 ─── */}
      <h3 style={S.h3}>Fault 10: Network / PoE Switch Issue — Multiple Cameras Offline</h3>
      <p style={S.p}>
        <strong>First check:</strong> Kitni cameras offline hain aur kahan hain? Ek hi switch se
        connected hain?
      </p>
      <p style={S.p}>
        <strong>Next check:</strong> PoE switch ko ping karo — reachable hai? Switch power status?
      </p>
      <p style={S.p}>
        <strong>Isolate:</strong> Switch power cycle karo — cameras wapas aa jaati hain? Switch management
        interface accessible hai? Uplink port status?
      </p>
      <p style={S.p}>
        <strong>Corrective action:</strong> Switch power issue hai to power supply check karo. Switch
        completely failed hai to replacement karo — spare switch ready rakhna good practice hai.
        Uplink cable/SFP check karo. Switch configuration backup se restore karo.
      </p>

      {/* ─── Fault 11 ─── */}
      <h3 style={S.h3}>Fault 11: Wrong Camera Time / Date</h3>
      <p style={S.p}>
        <strong>First check:</strong> NTP server address camera mein configured hai? Correct NTP server
        IP hai?
      </p>
      <p style={S.p}>
        <strong>Next check:</strong> NTP server reachable hai camera se? VLAN/firewall block kar raha hai?
      </p>
      <p style={S.p}>
        <strong>Isolate:</strong> NVR/VMS ka time check karo — NVR ka bhi time wrong hai? Agar NVR bhi
        wrong hai to upstream NTP issue hai.
      </p>
      <p style={S.p}>
        <strong>Corrective action:</strong> Camera mein NTP settings reconfigure karo. NTP server
        reachability verify karo. Timezone settings check karo — IST +5:30 correct set hai? DST disable
        karo. NVR/VMS bhi NTP sync karo.
      </p>

      {/* ─── Fault 12 ─── */}
      <h3 style={S.h3}>Fault 12: Multiple Cameras Offline Simultaneously</h3>
      <p style={S.p}>
        <strong>First check:</strong> Offline cameras common switch ya common area pe hain? Core network
        event hua hai — outage, maintenance?
      </p>
      <p style={S.p}>
        <strong>Next check:</strong> NVR/VMS server online hai? NVR/VMS service crash hua hai?
      </p>
      <p style={S.p}>
        <strong>Isolate:</strong> Ek camera directly laptop se connect karo — reachable hai? NVR/VMS
        service restart karo.
      </p>
      <p style={S.p}>
        <strong>Corrective action:</strong> Core network issue hai to network team coordinate karo. NVR/VMS
        service crashed hai to restart karo — root cause identify karo (disk full? software bug?). Power
        outage tha to UPS coverage verify karo — CCTV equipment pe backup power adequate hai?
      </p>

      {/* ─── Fault 13 ─── */}
      <h3 style={S.h3}>Fault 13: NAS / Network Storage Unreachable</h3>
      <p style={S.p}>
        <strong>First check:</strong> NAS ping karo NVR/VMS server se — reachable hai? NAS power on hai?
      </p>
      <p style={S.p}>
        <strong>Next check:</strong> NAS management interface open karo — koi hardware alert hai? Disk
        failure?
      </p>
      <p style={S.p}>
        <strong>Isolate:</strong> Network path verify karo — NAS aur NVR/VMS same VLAN pe hain ya routing
        required hai? Switch port status?
      </p>
      <p style={S.p}>
        <strong>Corrective action:</strong> NAS power cycle karo. Network connection check karo. NAS
        credentials verify karo — password change hua hai? CIFS/NFS mount settings NVR mein check karo.
        NAS disk failure hai to failed disk replace karo.
      </p>

      {/* ─── Fault 14 ─── */}
      <h3 style={S.h3}>Fault 14: NVR/VMS Connected to NAS But Recording Fails</h3>
      <p style={S.p}>
        <strong>First check:</strong> NAS pe available space check karo — full hai?
      </p>
      <p style={S.p}>
        <strong>Next check:</strong> NAS share permissions check karo — NVR/VMS account ko write access
        hai?
      </p>
      <p style={S.p}>
        <strong>Isolate:</strong> NVR/VMS event log mein storage error messages dekho — specific error code
        note karo.
      </p>
      <p style={S.p}>
        <strong>Corrective action:</strong> NAS share pe write permission explicitly set karo NVR/VMS
        account ke liye. Path correctly configured hai NVR mein? SMB/NFS version compatibility check
        karo. Antivirus ya security software NAS pe recording block kar rahi hai? Space free karo ya
        capacity expand karo.
      </p>

      {/* ─── Fault 15 ─── */}
      <h3 style={S.h3}>Fault 15: RAID Degraded / Disk Failure Alert on NAS</h3>
      <p style={S.p}>
        <strong>First check:</strong> NAS management interface mein exact RAID status aur failed disk
        identify karo — RAID 5/6 mein ek ya do disks failed?
      </p>
      <p style={S.p}>
        <strong>Next check:</strong> RAID degraded state mein recording continue ho rahi hai? Data at
        risk hai — second failure ke before replacement urgent hai.
      </p>
      <p style={S.p}>
        <strong>Isolate:</strong> Failed disk model/serial note karo. Replacement disk same capacity ya
        larger, same or better speed chahiye.
      </p>
      <p style={S.p}>
        <strong>Corrective action:</strong> Same capacity surveillance-grade HDD order karo immediately.
        Hot-swap capable NAS mein — running condition mein replace kar sakte hain. Non-hot-swap mein
        maintenance window schedule karo. Replacement ke baad RAID rebuild automatically start hoga —
        rebuild ke time NAS performance reduced hogi. Rebuild complete hone tak closely monitor karo.
        RAID rebuild complete hone ki notification set karo.
      </p>

      <Callout type="warning" title="RAID Rebuild During Active Recording — Caution">
        RAID rebuild ke dauraan NAS/NVR pe additional load hoti hai. Large arrays mein rebuild ghanton
        se dino tak le sakta hai. Is period mein additional disk failure ka risk hota hai — do disks
        fail hoti hain RAID 5 mein to sab data gone. Rebuild period mein extra monitoring karo aur
        unnecessary load avoid karo.
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
