"use client";

import Image from "next/image";
import { S, Callout, ComparisonTable } from "../shared";
import TopicLink from "@/components/TopicLink";

export default function Basics() {
  return (
    <>
      <h2 id="what-is-access-control" style={S.h2}>What Is Access Control?</h2>

      <p style={S.p}>
        Access control ek physical security system hai jo decide karta hai ki kaunn, kab, aur kahan
        enter kar sakta hai. Data center context mein ye ek electronic system hai jisme credential
        (card, PIN, biometric) present karne pe controller authenticate karta hai, policy check karta
        hai, aur agar authorized hai to door lock release karta hai. Har access attempt log hoti hai —
        entry, exit, denied attempts, door alarms sab recorded rehte hain.
      </p>

      <p style={S.p}>
        Traditional lock-and-key se access control fundamentally alag hai — ek physical key copy ho
        sakti hai, kisi ko de sakte ho, ya khoni bhi, aur koi audit trail nahi hota. Electronic
        access control credentials centrally manage hoti hain, immediately revoke ya modify ki ja
        sakti hain, aur har use logged hoti hai. Is auditability ki wajah se ye compliance frameworks
        jaise ISO 27001, SOC 2 aur PCI-DSS ke liye essential hai.
      </p>

      <figure style={{ margin: "2rem 0" }}>
        <div style={{ border: "1px solid #e2e8f0", borderRadius: "12px", overflow: "hidden" }}>
          <Image
            src="/images/articles/access-control/access-control-datacenter.svg"
            alt="Data center access control system showing card reader at server room door with electromagnetic lock and access controller panel"
            width={1200}
            height={675}
            style={{ width: "100%", height: "auto", display: "block" }}
            priority
          />
        </div>
        <figcaption style={{ fontSize: "0.85rem", color: "#4b5563", marginTop: "0.6rem", textAlign: "center", fontStyle: "italic" }}>
          Data Center access control — server room door pe card reader, EM lock aur door contact sensor.
        </figcaption>
      </figure>

      <h2 id="why-required" style={S.h2}>Why Access Control Is Required in a Data Center</h2>

      <p style={S.p}>
        Data center mein servers, storage aur network equipment hote hain jo clients ka critical data
        hold karte hain. Unauthorized physical access — ek rogue USB plug in karna, ek hard drive
        remove karna, ek cable disconnect karna — software security ko bypass kar sakta hai. Physical
        access control is risk ki pehli aur most critical line hai.
      </p>

      <p style={S.p}>
        Beyond security, compliance bhi drive karta hai. ISO 27001 Annex A physical security controls
        mandate karta hai. PCI-DSS Requirement 9 physical access restriction aur monitoring require
        karta hai. SOC 2 Trust Services Criteria physical access management include karta hai.
        Practically sab enterprise data center standards mein granular access control with audit logging
        explicitly required hai — actual requirements applicable framework aur AHJ pe depend karte hain.
      </p>

      <Callout type="important" title="Principle of Least Privilege — Physical Version">
        Every person ko sirf wahi physical access milni chahiye jo unke role ke liye necessary ho —
        kuch bhi zyada nahi. Cleaning staff ka server hall mein koi kaam nahi, vendor ka battery room
        mein unaccompanied access nahi hona chahiye. Access zones aur schedules carefully define karo
        aur regularly review karo — role changes pe access update karo.
      </Callout>

      <h2 id="working-principle" style={S.h2}>Working Principle</h2>

      <p style={S.p}>
        Access control ka basic cycle simple hai: <strong>Present credential → Reader reads → Controller
        authenticates → Policy check → Lock release or deny → Event logged.</strong> Ye cycle ek second
        se kam mein complete hoti hai. Har step mein failure possible hai — isliye har component samajhna
        zaroori hai.
      </p>

      <p style={S.p}>
        Jab koi card reader ke paas laata hai, reader card ka data read karke controller ko bhejta hai.
        Controller apne local database mein credential check karta hai — valid hai? Is door pe is time
        pe authorized hai? Access schedule active hai? Agar sab checks pass hote hain, controller lock
        ko release signal deta hai — typically relay output se — aur event log karta hai. Door contact
        sensor confirm karta hai ki door actually open hua. Request-to-Exit (REX) sensor exit side pe
        hota hai — andar se bahar aane ke liye credential ki zaroorat nahi hoti, REX press karne pe
        lock release hota hai.
      </p>

      <h2 id="system-architecture" style={S.h2}>System Architecture</h2>

      <p style={S.p}>
        Typical enterprise access control architecture mein teen tiers hoti hain:{" "}
        <strong>Field devices</strong> (readers, locks, sensors, REX) →{" "}
        <strong>Controllers</strong> (edge intelligence, decision making) →{" "}
        <strong>Software/Server</strong> (central management, reporting, integrations).
      </p>

      <figure style={{ margin: "2rem 0" }}>
        <div style={{ border: "1px solid #e2e8f0", borderRadius: "12px", overflow: "hidden" }}>
          <Image
            src="/images/articles/access-control/access-control-architecture.svg"
            alt="Access control system architecture diagram showing credential readers and door hardware connecting to access controller which connects to access management server"
            width={1200}
            height={600}
            style={{ width: "100%", height: "auto", display: "block" }}
          />
        </div>
        <figcaption style={{ fontSize: "0.85rem", color: "#4b5563", marginTop: "0.6rem", textAlign: "center", fontStyle: "italic" }}>
          Access control architecture: Readers/Locks/Sensors → Controller → Management Server → Reporting/Integration
        </figcaption>
      </figure>

      <p style={S.p}>
        Controllers typically RS-485 ya TCP/IP network pe connect hote hain. Modern IP-based controllers
        directly Ethernet pe connect hote hain. Legacy systems RS-485 bus pe multiple controllers daisy-chain
        karte hain. Software server central management, credential enrollment, schedule configuration,
        reporting aur integrations handle karta hai. Readers typically Wiegand ya OSDP protocol pe
        controller se communicate karte hain — OSDP modern aur more secure hai (encrypted communication).
      </p>

      <Callout type="best-practice" title="OSDP vs Wiegand — Modern Deployments mein OSDP Prefer Karo">
        Wiegand protocol 1970s ka hai — unencrypted, no authentication, easily interceptable. OSDP
        (Open Supervised Device Protocol) encrypted communication, tamper detection aur bidirectional
        communication support karta hai. New deployments aur high-security areas mein OSDP readers
        specify karo.
      </Callout>
    </>
  );
}
