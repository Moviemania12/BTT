"use client";

import Image from "next/image";
import { S, Callout, ComparisonTable } from "../shared";
import TopicLink from "@/components/TopicLink";

export default function Basics() {
  return (
    <>
      <h2 id="what-is-mantrap" style={S.h2}>What Is a Mantrap (Airlock)?</h2>

      <p style={S.p}>
        Mantrap — engineering literature mein "airlock" ya "security vestibule" bhi kaha jaata hai —
        ek small enclosed room hai jisme do interlocked doors hoti hain. Outer door se andar jaao,
        controlled space mein authenticate karo, phir inner door khulti hai. Core rule: sirf ek door
        ek waqt mein open ho sakti hai — ye mechanical ya electronic interlock ensure karta hai. Is
        arrangement se tailgating practically impossible ho jaati hai — authorized person ke saath andar
        ghusna because second door tabhi open hoti hai jab vestibule secure ho.
      </p>

      <p style={S.p}>
        Mantrap ek physical security measure hai jo access control ki limitation address karta hai —
        ki ek person door hold kar sakta hai ya rush karke andar ghus sakta hai jab authorized person
        enter karta hai. Mantrap ensure karta hai ki har person individually controlled space mein jaata
        hai, authenticate karta hai, aur tabhi inner area mein allow hota hai.
      </p>

      <figure style={{ margin: "2rem 0" }}>
        <div style={{ border: "1px solid #e2e8f0", borderRadius: "12px", overflow: "hidden" }}>
          <Image
            src="/images/articles/mantrap/mantrap-datacenter.svg"
            alt="Data center mantrap airlock showing two interlocked glass doors with card readers and occupancy detection at server room entrance"
            width={1200}
            height={675}
            style={{ width: "100%", height: "auto", display: "block" }}
            priority
          />
        </div>
        <figcaption style={{ fontSize: "0.85rem", color: "#4b5563", marginTop: "0.6rem", textAlign: "center", fontStyle: "italic" }}>
          Data Center mantrap — two interlocked doors with card readers, occupancy sensors aur CCTV cameras at server room entry.
        </figcaption>
      </figure>

      <h2 id="why-required" style={S.h2}>Why Mantraps Are Required in Data Centers</h2>

      <p style={S.p}>
        Standard access control doors ka weakest point tailgating hai — ek authorized person door
        open kare aur unauthorized person saath andar ghus jaaye. Social engineering attacks mein ye
        common technique hai. Data center mein ek tailgating attempt server access, equipment theft
        ya sabotage lead kar sakta hai.
      </p>

      <p style={S.p}>
        High-security data centers mein — financial sector, government, colocation providers — mantrap entry common practice hai. Mantrap deployment primarily physical security risk assessment, client requirements, security policy, threat model aur facility design se drive hota hai. Uptime Institute Tier classification directly mantrap require nahi karta — actual requirement project-specific security design se determine hoti hai. Client contracts aur security audits mantrap ka evidence expect karte hain. Beyond
        compliance, mantrap genuinely effective hai — CCTV recordings ke saath combined, har entry
        attempt documented aur verified hoti hai.
      </p>

      <Callout type="important" title="Mantrap — Layer, Not Standalone Solution">
        Mantrap ek layer hai — physical interlock tailgating prevent karta hai lekin compromised
        credentials se protect nahi karta. Mantrap + biometric + CCTV + access control = multi-layer
        defense. Koi bhi single measure complete nahi hota.
      </Callout>

      <h2 id="working-principle" style={S.h2}>Working Principle — Interlock Sequence</h2>

      <p style={S.p}>
        Normal entry sequence: Person outer door pe credential present karta hai → controller authenticate
        karta hai → outer door release hoti hai → person vestibule mein enters → outer door closes
        aur latches → system confirm karta hai outer door locked hai → inner door pe credential present
        karo → system occupancy verify karta hai (sirf ek person?) → inner door release hoti hai →
        person server hall mein enters → inner door closes.
      </p>

      <p style={S.p}>
        Agar occupancy sensor ek se zyada person detect kare vestibule mein — inner door nahi khulti,
        alarm generate hoti hai, aur security operator alert hota hai. Agar outer door properly close
        nahi hui — inner door nahi khulti jab tak outer door completely latched na ho. Ye sequential
        interlock logic mantrap ka core function hai.
      </p>

      <figure style={{ margin: "2rem 0" }}>
        <div style={{ border: "1px solid #e2e8f0", borderRadius: "12px", overflow: "hidden" }}>
          <Image
            src="/images/articles/mantrap/mantrap-interlock-diagram.svg"
            alt="Mantrap interlock sequence diagram showing outer door and inner door states with authentication and occupancy verification steps"
            width={1200}
            height={600}
            style={{ width: "100%", height: "auto", display: "block" }}
          />
        </div>
        <figcaption style={{ fontSize: "0.85rem", color: "#4b5563", marginTop: "0.6rem", textAlign: "center", fontStyle: "italic" }}>
          Mantrap interlock sequence — outer door authentication → vestibule → occupancy check → inner door release
        </figcaption>
      </figure>

      <h2 id="system-architecture" style={S.h2}>System Architecture and Components</h2>

      <p style={S.p}>
        Mantrap system ke core components: do doors (outer aur inner), per door ek reader (entry side)
        aur REX (exit side), per door ek door contact sensor, ek ya zyada occupancy sensors vestibule
        mein, ek dedicated interlock controller ya PLC (programmable logic controller) jo interlock logic
        run karta hai, aur CCTV cameras. Interlock controller access control server se bhi communicate
        karta hai — credential verification ke liye.
      </p>

      <h3 style={S.h3}>Interlock Controller / PLC</h3>
      <p style={S.p}>
        Interlock logic ka brain. Door contact sensors, occupancy sensors aur access control signals
        receive karta hai aur lock relay outputs control karta hai. Real-time logic decisions: outer
        door open hai to inner door lock karo, occupancy one se zyada hai to inner door lock karo,
        life-safety release logic per approved sequence of operations implement karo. Dedicated interlock controller better response time aur
        simpler logic audit deta hai — kuch deployments access control controller ka extended logic
        use karte hain.
      </p>

      <h2 id="lock-door-types" style={S.h2}>Lock and Door Types</h2>

      <p style={S.p}>
        Mantrap doors typically tempered glass ya steel frame construction mein hote hain — visibility
        important hai (vestibule mein kya ho raha hai monitor ho sake) aur forced entry resistance bhi.
        EM locks ya electric strikes dono use ho sakte hain — selection security policy aur fire code
        pe depend karta hai. Life-safety egress applicable fire/life-safety code, approved design aur AHJ requirements ke hisaab se maintain honi chahiye — exact lock behavior aur release sequence project-specific approved design se determine hota hai.
      </p>

      <Callout type="warning" title="Life-Safety Egress — Approved Design ke Hisaab Se">
        Mantrap doors ki life-safety release behavior applicable fire/life-safety code, approved system design, AHJ requirements aur approved sequence of operations ke hisaab se configure honi chahiye. Lock type selection, egress requirements aur fire alarm interface project-specific decisions hain — fire/life-safety engineer aur AHJ se verify karo aur commissioning ke time test karo.
      </Callout>
    </>
  );
}
