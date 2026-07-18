"use client";

import { S, Callout, ComparisonTable } from "../shared";
import TopicLink from "@/components/TopicLink";

export default function OperationsAndMaintenance() {
  return (
    <>
      <h2 id="occupancy-detection" style={S.h2}>Occupancy and Presence Detection</h2>

      <p style={S.p}>
        Occupancy detection mantrap ke anti-tailgating function ka technical backbone hai. Ek se zyada
        person vestibule mein detect hone pe inner door nahi khulti. Common technologies:
      </p>

      <ul style={S.ul}>
        <li><strong>PIR (Passive Infrared) Motion Sensor:</strong> Heat signature detect karta hai. Fast, cost-effective, widely used. Limitation: count nahi karta — sirf presence detect karta hai.</li>
        <li><strong>Weight-sensing floor:</strong> Floor pressure se actual weight measure karta hai — ek person ka weight range configure karo. More definitive count lekin maintenance intensive aur false positives possible.</li>
        <li><strong>Overhead camera-based people counting:</strong> Overhead IP camera AI analytics se person count karta hai. Most accurate lekin higher cost aur software dependent.</li>
        <li><strong>IR beam break sensors:</strong> Door frame pe horizontal beams — person entering/exiting count karte hain. Good accuracy, less affected by clothing/luggage.</li>
      </ul>

      <p style={S.p}>
        Sensor selection site requirements, budget aur acceptable false alarm rate pe depend karta hai.
        Most data center mantraps multi-sensor approach use karte hain — redundancy aur accuracy ke liye.
        Sensor regular calibration aur testing zaroori hai — dirty ya misaligned sensor false alarms
        ya missed detections cause karta hai.
      </p>

      <h2 id="anti-tailgating" style={S.h2}>Anti-Tailgating Measures</h2>

      <p style={S.p}>
        Mantrap ka fundamental anti-tailgating mechanism interlock hai — lekin supplementary measures
        effectiveness badhate hain. CCTV cameras vestibule mein —  har attempt recorded hoti hai.
        Video analytics tailgating attempts automatically detect kar sakti hai. Mantrap timing configure
        karo: outer door kuch seconds mein automatically close ho (forced close timer). Manual override
        ke liye security operator alert.
      </p>

      <p style={S.p}>
        Staff training equally important hai — authorized users ko mantrap procedure follow karne ka
        culture banana padta hai. Tailgating attempt dekhne pe even authorized users ko report karna
        chahiye. Regular security awareness reinforcement mantrap ke technical measures ko complement
        karta hai.
      </p>

      <h2 id="emergency-release" style={S.h2}>Emergency Release and Fire Integration</h2>

      <p style={S.p}>
        Emergency release mantrap ke most critical design element mein se ek hai. Ek person vestibule
        mein phase jaaye — both doors locked, power failure, system fault — rapid release mechanism
        essential hai. Standard approaches:
      </p>

      <ul style={S.ul}>
        <li><strong>Manual emergency release:</strong> Vestibule ke andar aur/ya bahar pe emergency release provision — exact type, location aur behavior approved design aur AHJ requirements per hota hai.</li>
        <li><strong>Remote release:</strong> Security operator NOC se ya VMS interface se doors remotely release kar sake.</li>
        <li><strong>Intercom:</strong> Vestibule mein intercom — andar phase person security team se communicate kar sake.</li>
        <li><strong>Fire alarm / life-safety interface:</strong> Approved life-safety sequence of operations per fire alarm/access control interface — exact behavior applicable code, AHJ requirements aur approved design per configured hota hai.</li>
      </ul>

      <Callout type="danger" title="Emergency Release — Test Karo, Assume Mat Karo">
        Emergency release mechanisms regular test karo — monthly ya quarterly. Ek real emergency mein
        discover karna ki break-glass nahi kaam kar raha tha ya intercom dead tha — catastrophic hai.
        Testing log maintain karo. Fire integration test annually karo with fire team.
      </Callout>

      <h2 id="integration" style={S.h2}>Integration with Access Control, CCTV and Biometrics</h2>

      <p style={S.p}>
        Mantrap ka full security value integration se milta hai. <TopicLink slug="access-control" variant="inline" /> system
        credential authentication provide karta hai — outer aur inner door readers access controller se
        connected hote hain. Access logs mantrap entry/exit record karte hain. Anti-passback mantrap
        pe bhi configure kiya ja sakta hai.
      </p>

      <p style={S.p}>
        <TopicLink slug="cctv" variant="inline" /> mantrap mein essential hai — outer entry, vestibule
        interior aur inner entry — teeno angles cover karo. WDR cameras backlighting handle karte hain.
        Access event pe automatic CCTV recording aur snapshot. Tailgating detection pe CCTV instant
        review security operator ke liye.
      </p>

      <p style={S.p}>
        <TopicLink slug="biometrics" variant="inline" /> mantrap mein multi-factor authentication ke
        liye — outer door pe card swipe, inner door pe fingerprint ya face recognition. Ye combination
        very high assurance deta hai ki authenticated person actually authorized hai.
      </p>

      <h2 id="cybersecurity" style={S.h2}>Cybersecurity Considerations</h2>

      <p style={S.p}>
        Mantrap controller/PLC network-connected hai — cybersecurity controls apply hote hain. Controller
        dedicated network segment pe rakho. Default credentials change karo. Firmware updates maintain
        karo. Physical access to controller cabinet restricted hona chahiye — controller tamper karke
        interlock logic bypass possible hai.
      </p>

      <p style={S.p}>
        Remote management convenient hai lekin encrypted, authenticated access chahiye — open remote
        access security risk hai. Controller configuration backup rakho — failure pe rapid restore
        possible ho.
      </p>

      <h2 id="preventive-maintenance" style={S.h2}>Preventive Maintenance</h2>

      <p style={S.p}>
        Neeche example maintenance activities hain — actual schedule OEM recommendations, site policy
        aur applicable requirements ke hisaab se adjust karo.
      </p>

      <h3 style={S.h3}>Monthly Checks (Example)</h3>
      <ul style={S.ul}>
        <li>Full interlock sequence test karo — outer door open karo, verify inner door locked; outer close, inner open; both-open attempt verify rejected</li>
        <li>Occupancy sensor test — ek person enter karo, inner door should open; tailgating simulate karo (two people), inner door should stay locked aur alarm generate</li>
        <li>Emergency release test — emergency release mechanism activate karo (per approved test procedure), verify behavior matches approved design aur sequence of operations</li>
        <li>Intercom test — vestibule se security desk communication verify karo</li>
        <li>CCTV coverage check — cameras clean, properly aimed, recording</li>
        <li>Door closer/hinge — proper operation, auto-close timing</li>
      </ul>

      <h3 style={S.h3}>Quarterly Checks (Example)</h3>
      <ul style={S.ul}>
        <li>EM lock holding force test</li>
        <li>Door contact sensor alignment verify</li>
        <li>Occupancy sensor sensitivity calibration</li>
        <li>Fire alarm integration test (coordinate with fire team)</li>
        <li>Controller configuration backup verify</li>
        <li>Full access log review — anomalies, failed attempts</li>
      </ul>
    </>
  );
}
