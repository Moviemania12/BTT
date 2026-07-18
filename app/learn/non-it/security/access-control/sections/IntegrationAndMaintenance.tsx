"use client";

import { S, Callout, ComparisonTable } from "../shared";
import TopicLink from "@/components/TopicLink";

export default function IntegrationAndMaintenance() {
  return (
    <>
      <h2 id="integration" style={S.h2}>Integration with CCTV, Biometrics and BMS</h2>

      <p style={S.p}>
        Access control sirf standalone door management nahi hai — integrated physical security system
        ka backbone hai. Jab ek access event trigger hota hai (valid entry, denied attempt, door alarm),
        integrated systems automatically respond kar sakte hain.
      </p>

      <p style={S.p}>
        <strong>CCTV integration:</strong> Access event pe <TopicLink slug="cctv" variant="inline" /> relevant
        camera pe recording start karti hai, snapshot save karti hai, aur VMS mein event-linked thumbnail
        dikhta hai. Security operator ek screen se access log aur video simultaneously dekh sakta hai.
        Denied attempts pe automatic camera popup critical areas mein very useful hai.
      </p>

      <p style={S.p}>
        <strong>Biometrics integration:</strong> <TopicLink slug="biometrics" variant="inline" /> reader
        access control controller ke saath integrate hota hai — biometric match hone pe controller ko
        "valid credential" signal jaata hai. Multi-factor authentication ke liye card + biometric
        combination configure kiya ja sakta hai — dono verify hone pe hi door open hoti hai.
      </p>

      <p style={S.p}>
        <strong>BMS integration:</strong> BMS access control events receive kar sakta hai — HVAC zone control, lighting automation aur facility status monitoring ke liye. Life-safety lock release logic fire alarm/access control interface aur approved control hardware se implement hota hai per approved sequence of operations — BMS typically primary life-safety release path nahi hota. BMS non-life-safety integration mein participate kar sakta hai where designed. Integration capability OEM aur project pe depend karti hai.
      </p>

      <p style={S.p}>
        <strong>Visitor Management integration:</strong> <TopicLink slug="visitor-management" variant="inline" /> system
        temporary credentials create karta hai jo access control system mein provisioned hote hain —
        visitor specific doors pe specified time ke liye access pata hai aur visit complete hone pe
        credential automatically expire ho jaata hai.
      </p>

      <h2 id="cybersecurity" style={S.h2}>Cybersecurity Considerations</h2>

      <p style={S.p}>
        IP-based access control systems network-connected devices hain — cybersecurity controls essential
        hain. Access control server compromise hone pe attacker credentials add/modify kar sakta hai,
        audit logs delete kar sakta hai, ya doors remotely unlock kar sakta hai.
      </p>

      <ul style={S.ul}>
        <li><strong>Network segmentation:</strong> Access control network ko IT production network se separate VLAN pe rakho.</li>
        <li><strong>Encrypted communication:</strong> Controller-to-server aur reader-to-controller (OSDP) communication encrypted honi chahiye.</li>
        <li><strong>Firmware updates:</strong> Controller aur reader firmware regularly update karo — known vulnerabilities patch hote hain.</li>
        <li><strong>Strong authentication for software:</strong> Access management software ke admin accounts multi-factor authentication use karein.</li>
        <li><strong>Audit log integrity:</strong> Logs tamper-evident storage ya SIEM pe forward karo — local-only logs delete kiye ja sakte hain post-compromise.</li>
        <li><strong>Physical protection of controllers:</strong> Controller cabinet pe physical lock hona chahiye — controller access unauthorized persons ko nahi milni chahiye.</li>
      </ul>

      <h2 id="preventive-maintenance" style={S.h2}>Preventive Maintenance</h2>

      <p style={S.p}>
        Neeche ek example maintenance schedule hai — actual frequency OEM recommendations, client
        policy, site conditions aur applicable compliance requirements ke hisaab se adjust karo.
      </p>

      <h3 style={S.h3}>Monthly Checks (Example)</h3>
      <ul style={S.ul}>
        <li>All doors — card present karo aur verify karo access granted/denied correctly</li>
        <li>Door contact sensors — open/close test karo, alarm correctly generated?</li>
        <li>REX sensors — exit side se test karo, lock releases aur event logged?</li>
        <li>DFO/DOTL alarms — test karo by forcing door briefly</li>
        <li>Controller PSU — battery backup test karo (mains disconnect, verify battery kicking in)</li>
        <li>Software — pending credential changes, inactive accounts, expired schedules review karo</li>
      </ul>

      <h3 style={S.h3}>Quarterly Checks (Example)</h3>
      <ul style={S.ul}>
        <li>EM lock holding force check — manufacturer specified force pe test karo (pull test)</li>
        <li>Reader cleaning — lens/sensor surface clean karo, housing inspect karo</li>
        <li>Wiring inspect — terminal screws, cable routing, any damage</li>
        <li>Access levels audit — role changes ke baad unnecessary access revoke hua?</li>
        <li>Anti-passback violations review — frequent violations indicate process gaps</li>
        <li>Integration test — CCTV popup, BMS signals verify karo</li>
      </ul>

      <h3 style={S.h3}>Annual Checks (Example)</h3>
      <ul style={S.ul}>
        <li>Battery replacement — controller PSU batteries per OEM recommendation aur health data</li>
        <li>Full user access audit — every credential review karo, remove unnecessary</li>
        <li>Firmware updates — controller, readers, server software</li>
        <li>Complete end-to-end test — enroll test card, test all doors, verify logs, test alarms</li>
        <li>Disaster recovery test — server failure pe controller standalone mode verify karo</li>
      </ul>
    </>
  );
}
