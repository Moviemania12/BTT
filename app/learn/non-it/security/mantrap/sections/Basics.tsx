"use client";

import Image from "next/image";
import { S, Callout, ComparisonTable } from "../shared";
import TopicLink from "@/components/TopicLink";

export default function Basics() {
  return (
    <>
      <h2 id="what-is-mantrap" style={S.h2}>What Is a Mantrap (Airlock)?</h2>

      <p style={S.p}>
        A mantrap — also called an "airlock" or "security vestibule" in engineering literature — is a small enclosed room with two interlocked doors. Go in through the outer door, authenticate in the controlled space, then the inner door opens. Core rule: only one door can be open at a time — a mechanical or electronic interlock ensures this. This arrangement makes tailgating practically impossible — slipping in with an authorized person fails because the second door opens only when the vestibule is secure.
      </p>

      <p style={S.p}>
        A mantrap is a physical security measure that addresses a limitation of access control — that one person can hold the door or rush in when an authorized person enters. The mantrap ensures that every person goes individually into the controlled space, authenticates, and only then is allowed into the inner area.
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
          Data Center mantrap — two interlocked doors with card readers, occupancy sensors and CCTV cameras at the server room entry.
        </figcaption>
      </figure>

      <h2 id="why-required" style={S.h2}>Why Mantraps Are Required in Data Centers</h2>

      <p style={S.p}>
        The weakest point of standard access control doors is tailgating — an authorized person opens the door and an unauthorized person slips in with them. This is a common technique in social engineering attacks. In a data center a tailgating attempt can lead to server access, equipment theft or sabotage.
      </p>

      <p style={S.p}>
        In high-security data centers — financial sector, government, colocation providers — mantrap entry is common practice. Mantrap deployment is primarily driven by the physical security risk assessment, client requirements, security policy, threat model and facility design. The Uptime Institute Tier classification does not directly require a mantrap — the actual requirement is determined by the project-specific security design. Client contracts and security audits expect evidence of a mantrap. Beyond compliance, the mantrap is genuinely effective — combined with CCTV recordings, every entry attempt is documented and verified.
      </p>

      <Callout type="important" title="Mantrap — Layer, Not Standalone Solution">
        The mantrap is one layer — the physical interlock prevents tailgating but does not protect against compromised credentials. Mantrap + biometric + CCTV + access control = multi-layer defense. No single measure is complete.
      </Callout>

      <h2 id="working-principle" style={S.h2}>Working Principle — Interlock Sequence</h2>

      <p style={S.p}>
        Normal entry sequence: The person presents a credential at the outer door → the controller authenticates → the outer door releases → the person enters the vestibule → the outer door closes and latches → the system confirms the outer door is locked → present the credential at the inner door → the system verifies occupancy (only one person?) → the inner door releases → the person enters the server hall → the inner door closes.
      </p>

      <p style={S.p}>
        If the occupancy sensor detects more than one person in the vestibule — the inner door does not open, an alarm is generated, and the security operator is alerted. If the outer door did not close properly — the inner door does not open until the outer door is completely latched. This sequential interlock logic is the core function of the mantrap.
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
        Core components of the mantrap system: two doors (outer and inner), one reader per door (entry side) and REX (exit side), one door contact sensor per door, one or more occupancy sensors in the vestibule, a dedicated interlock controller or PLC (programmable logic controller) that runs the interlock logic, and CCTV cameras. The interlock controller also communicates with the access control server — for credential verification.
      </p>

      <h3 style={S.h3}>Interlock Controller / PLC</h3>
      <p style={S.p}>
        The brain of the interlock logic. It receives door contact sensors, occupancy sensors and access control signals and controls the lock relay outputs. Real-time logic decisions: if the outer door is open, lock the inner door; if occupancy is more than one, lock the inner door; implement life-safety release logic per the approved sequence of operations. A dedicated interlock controller gives better response time and a simpler logic audit — some deployments use the extended logic of the access control controller.
      </p>

      <h2 id="lock-door-types" style={S.h2}>Lock and Door Types</h2>

      <p style={S.p}>
        Mantrap doors are typically of tempered glass or steel frame construction — visibility is important (so what is happening in the vestibule can be monitored) and so is forced entry resistance. Both EM locks and electric strikes can be used — selection depends on the security policy and fire code. Life-safety egress must be maintained according to the applicable fire/life-safety code, approved design and AHJ requirements — the exact lock behavior and release sequence are determined by the project-specific approved design.
      </p>

      <Callout type="warning" title="Life-Safety Egress — As Per the Approved Design">
        The life-safety release behavior of mantrap doors must be configured according to the applicable fire/life-safety code, approved system design, AHJ requirements and approved sequence of operations. Lock type selection, egress requirements and the fire alarm interface are project-specific decisions — verify with the fire/life-safety engineer and AHJ and test at the time of commissioning.
      </Callout>
    </>
  );
}
