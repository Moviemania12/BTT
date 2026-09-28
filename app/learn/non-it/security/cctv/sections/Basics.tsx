"use client";

import Image from "next/image";
import { S, Callout, ComparisonTable } from "../shared";
import TopicLink from "@/components/TopicLink";

export default function Basics() {
  return (
    <>
      {/* ═══════════════════════════════════════════════════════════════
          SECTION 1 — WHAT IS CCTV
      ═══════════════════════════════════════════════════════════════ */}
      <h2 id="what-is-cctv" style={S.h2}>What is CCTV?</h2>

      <p style={S.p}>
        CCTV — <strong>Closed Circuit Television</strong> — is a surveillance system in which video from the cameras goes only to authorized viewers and is not broadcast publicly. "Closed circuit" means the signal travels on a controlled, private network — whether that is coaxial cable or an IP network. In today's data centers we primarily talk about IP-based CCTV, where cameras send a digital video stream over an Ethernet network.
      </p>

      <p style={S.p}>
        In traditional analog CCTV, cameras sent an analog signal over coaxial cable and the DVR (Digital Video Recorder) digitized and recorded that signal. In modern IP CCTV the camera itself does the digital compression — using the H.264 or H.265 codec — and sends a compressed stream over the network. The NVR (Network Video Recorder) or VMS (Video Management Software) receives this stream and records and manages it.
      </p>

      <Callout type="important" title="IP Camera ≠ Analog Camera — Architecture Fundamentally Different">
        An IP camera connects directly to the network — no coaxial cable is needed. A single Cat6 cable carries both power (PoE) and video. Because of this, installation is flexible, cable routing is easy, and there is practically no distance limitation (through switches). IP-based systems are standard in data centers.
      </Callout>

      {/* ═══════════════════════════════════════════════════════════════
          SECTION 2 — WHY CCTV IN DATA CENTER
      ═══════════════════════════════════════════════════════════════ */}
      <h2 id="why-cctv-in-dc" style={S.h2}>Why CCTV is Required in a Data Center</h2>

      <p style={S.p}>
        In a data center, the first layer of physical security is deterrence — when people know there are cameras, the probability of unauthorized activity goes down. The second layer is evidence — if an incident happens, the recorded footage establishes what happened, when it happened and who was involved. The third layer is real-time monitoring — the NOC or security team can watch the live feed and respond immediately to suspicious activity.
      </p>

      <p style={S.p}>
        Beyond security, CCTV also gives operational visibility in data centers. Someone physically accessing a rack without authorization in the server hall, how far the maintenance team's work has progressed, equipment delivery happening in the loading area — all of this is monitored remotely. Providing footage access at the time of client audits has become a standard deliverable.
      </p>

      <p style={S.p}>
        Regulatory and compliance requirements also drive CCTV. ISO 27001, SOC 2, PCI-DSS and similar frameworks mandate physical security controls in which CCTV is explicitly or implicitly included. Insurance and SLA agreements can also specify CCTV and retention policies. Actual requirements depend on the project, client, jurisdiction and applicable compliance framework.
      </p>

      <figure style={{ margin: "2rem 0" }}>
        <div style={{ border: "1px solid #e2e8f0", borderRadius: "12px", overflow: "hidden" }}>
          <Image
            src="/images/articles/cctv/cctv-datacenter-installation.png"
            alt="Enterprise data center CCTV camera installation showing dome cameras mounted on ceiling above server racks with monitoring workstation in background"
            width={1200}
            height={675}
            style={{ width: "100%", height: "auto", display: "block" }}
            priority
          />
        </div>
        <figcaption style={{ fontSize: "0.85rem", color: "#4b5563", marginTop: "0.6rem", textAlign: "center", fontStyle: "italic" }}>
          Enterprise Data Center CCTV — dome cameras monitoring server aisles, mantrap entry and perimeter areas.
        </figcaption>
      </figure>

      {/* ═══════════════════════════════════════════════════════════════
          SECTION 3 — CCTV ARCHITECTURE
      ═══════════════════════════════════════════════════════════════ */}
      <h2 id="cctv-architecture" style={S.h2}>CCTV System Architecture</h2>

      <p style={S.p}>
        The flow of modern IP CCTV is straightforward:{" "} <strong>IP Cameras → PoE Switch → Network → NVR / VMS → Storage (Local HDD / NAS) → Monitoring Workstation</strong>. Every component plays a specific role in this chain, and a failure at any point can affect the whole system — that is why redundancy and monitoring are essential.
      </p>

      <figure style={{ margin: "2rem 0" }}>
        <div style={{ border: "1px solid #e2e8f0", borderRadius: "12px", overflow: "hidden" }}>
          <Image
            src="/images/articles/cctv/cctv-architecture-diagram.png"
            alt="CCTV architecture diagram showing IP Cameras connecting to PoE Switch then to Network then to NVR/VMS with Local HDD and NAS storage, finally to Monitoring Workstation"
            width={1200}
            height={600}
            style={{ width: "100%", height: "auto", display: "block" }}
          />
        </div>
        <figcaption style={{ fontSize: "0.85rem", color: "#4b5563", marginTop: "0.6rem", textAlign: "center", fontStyle: "italic" }}>
          IP CCTV architecture: Cameras → PoE Switch → Network → NVR/VMS → Local HDD + NAS → Monitoring Workstation
        </figcaption>
      </figure>

      <p style={S.p}>
        The <strong>IP Camera</strong> captures video and sends a compressed stream over the network.{" "} The <strong>PoE Switch</strong> gives the cameras power (Power over Ethernet) and network connectivity — both over one cable. The <strong>Network</strong> (typically on a dedicated VLAN) routes the video traffic.{" "} The <strong>NVR/VMS</strong> receives and records the streams and provides the management interface.{" "} <strong>Storage</strong> holds the actual recorded footage — the NVR's internal HDDs, an external NAS, or both. The <strong>Monitoring Workstation</strong> gives the security/NOC team live view and playback access.
      </p>

      <Callout type="best-practice" title="Dedicated VLAN for CCTV Traffic">
        Logically separate CCTV traffic from the production IT network. A dedicated VLAN guarantees bandwidth, improves security isolation and simplifies troubleshooting. In large deployments consider physical network separation too.
      </Callout>
    </>
  );
}
