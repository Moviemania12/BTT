"use client";

import Image from "next/image";
import { S, Callout, ComparisonTable } from "../shared";
import TopicLink from "@/components/TopicLink";

export default function Basics() {
  return (
    <>
      <h2 id="what-is-access-control" style={S.h2}>What Is Access Control?</h2>

      <p style={S.p}>
        Access control is a physical security system that decides who can enter, when, and where. In the data center context it is an electronic system in which, when a credential (card, PIN, biometric) is presented, the controller authenticates it, checks the policy, and if authorized releases the door lock. Every access attempt is logged — entry, exit, denied attempts, door alarms all stay recorded.
      </p>

      <p style={S.p}>
        Access control is fundamentally different from traditional lock-and-key — a physical key can be copied, given to someone, or even lost, and there is no audit trail. Electronic access control credentials are managed centrally, can be revoked or modified immediately, and every use is logged. Because of this auditability it is essential for compliance frameworks like ISO 27001, SOC 2 and PCI-DSS.
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
          Data Center access control — card reader, EM lock and door contact sensor on the server room door.
        </figcaption>
      </figure>

      <h2 id="why-required" style={S.h2}>Why Access Control Is Required in a Data Center</h2>

      <p style={S.p}>
        A data center has servers, storage and network equipment that hold clients' critical data. Unauthorized physical access — plugging in a rogue USB, removing a hard drive, disconnecting a cable — can bypass software security. Physical access control is the first and most critical line against this risk.
      </p>

      <p style={S.p}>
        Beyond security, compliance also drives it. ISO 27001 Annex A mandates physical security controls. PCI-DSS Requirement 9 requires physical access restriction and monitoring. SOC 2 Trust Services Criteria include physical access management. Practically all enterprise data center standards explicitly require granular access control with audit logging — actual requirements depend on the applicable framework and AHJ.
      </p>

      <Callout type="important" title="Principle of Least Privilege — Physical Version">
        Every person should get only the physical access that is necessary for their role — nothing more. Cleaning staff have no work in the server hall, and a vendor must not have unaccompanied access to the battery room. Define access zones and schedules carefully and review them regularly — update access on role changes.
      </Callout>

      <h2 id="working-principle" style={S.h2}>Working Principle</h2>

      <p style={S.p}>
        The basic cycle of access control is simple: <strong>Present credential → Reader reads → Controller authenticates → Policy check → Lock release or deny → Event logged.</strong> This cycle completes in less than a second. Failure is possible at every step — that is why it is essential to understand every component.
      </p>

      <p style={S.p}>
        When someone brings a card near the reader, the reader reads the card data and sends it to the controller. The controller checks the credential in its local database — is it valid? Is it authorized on this door at this time? Is the access schedule active? If all checks pass, the controller gives a release signal to the lock — typically through a relay output — and logs the event. The door contact sensor confirms that the door actually opened. The Request-to-Exit (REX) sensor is on the exit side — no credential is needed to come out from inside; pressing REX releases the lock.
      </p>

      <h2 id="system-architecture" style={S.h2}>System Architecture</h2>

      <p style={S.p}>
        A typical enterprise access control architecture has three tiers:{" "} <strong>Field devices</strong> (readers, locks, sensors, REX) →{" "} <strong>Controllers</strong> (edge intelligence, decision making) →{" "} <strong>Software/Server</strong> (central management, reporting, integrations).
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
        Controllers typically connect over an RS-485 or TCP/IP network. Modern IP-based controllers connect directly to Ethernet. Legacy systems daisy-chain multiple controllers on an RS-485 bus. The software server handles central management, credential enrollment, schedule configuration, reporting and integrations. Readers typically communicate with the controller over the Wiegand or OSDP protocol — OSDP is modern and more secure (encrypted communication).
      </p>

      <Callout type="best-practice" title="OSDP vs Wiegand — Prefer OSDP in Modern Deployments">
        The Wiegand protocol is from the 1970s — unencrypted, no authentication, easily interceptable. OSDP (Open Supervised Device Protocol) supports encrypted communication, tamper detection and bidirectional communication. Specify OSDP readers in new deployments and high-security areas.
      </Callout>
    </>
  );
}
