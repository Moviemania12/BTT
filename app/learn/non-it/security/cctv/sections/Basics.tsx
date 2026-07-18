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
        CCTV — <strong>Closed Circuit Television</strong> — ek surveillance system hai jisme cameras
        se video sirf authorized viewers ko jaati hai, public broadcast nahi hoti. "Closed circuit"
        ka matlab hai ki signal ek controlled, private network pe hota hai — chahe wo coaxial cable
        ho ya IP network. Aaj ke data centers mein hum primarily IP-based CCTV ki baat karte hain
        jahan cameras Ethernet network pe digital video stream bhejte hain.
      </p>

      <p style={S.p}>
        Traditional analog CCTV mein cameras coaxial cable pe analog signal bhejte the aur DVR
        (Digital Video Recorder) us signal ko digitize karke record karta tha. Modern IP CCTV mein
        camera khud digital compression karta hai — H.264 ya H.265 codec use karke — aur network pe
        compressed stream bhejta hai. NVR (Network Video Recorder) ya VMS (Video Management Software)
        is stream ko receive karke record aur manage karta hai.
      </p>

      <Callout type="important" title="IP Camera ≠ Analog Camera — Architecture Fundamentally Different">
        IP camera network pe directly connect hoti hai — coaxial cable nahi chahiye. Ek single Cat6
        cable power (PoE) aur video dono carry karta hai. Is wajah se installation flexible hai, cable
        routing asan hai, aur distance limitation practically nahi hoti (switches ke through). Data
        centers mein IP-based systems standard hain.
      </Callout>

      {/* ═══════════════════════════════════════════════════════════════
          SECTION 2 — WHY CCTV IN DATA CENTER
      ═══════════════════════════════════════════════════════════════ */}
      <h2 id="why-cctv-in-dc" style={S.h2}>Why CCTV is Required in a Data Center</h2>

      <p style={S.p}>
        Data center mein physical security ki pehli layer deterrence hai — jab log jaante hain ki
        cameras hain, unauthorized activity ki probability kam ho jaati hai. Doosri layer evidence hai
        — koi incident ho jaaye to recorded footage se kya hua, kab hua, aur kaun involved tha ye
        establish hota hai. Teesri layer real-time monitoring hai — NOC ya security team live feed dekh
        ke suspicious activity pe immediately respond kar sakti hai.
      </p>

      <p style={S.p}>
        Beyond security, CCTV data centers mein operational visibility bhi deta hai. Server hall mein
        koi physically unauthorized rack access kar raha hai, maintenance team ka kaam kahan tak pahuncha,
        loading area mein equipment delivery ho rahi hai — ye sab remotely monitor hota hai. Client
        audits ke time footage access provide karna ek standard deliverable ban gaya hai.
      </p>

      <p style={S.p}>
        Regulatory aur compliance requirements bhi CCTV ko drive karte hain. ISO 27001, SOC 2, PCI-DSS,
        aur similar frameworks physical security controls mandate karte hain jisme CCTV explicitly ya
        implicitly included hota hai. Insurance aur SLA agreements bhi CCTV aur retention policies
        specify kar sakte hain. Actual requirements project, client, jurisdiction aur applicable
        compliance framework pe depend karte hain.
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
          Enterprise Data Center CCTV — dome cameras monitoring server aisles, mantrap entry, aur perimeter areas.
        </figcaption>
      </figure>

      {/* ═══════════════════════════════════════════════════════════════
          SECTION 3 — CCTV ARCHITECTURE
      ═══════════════════════════════════════════════════════════════ */}
      <h2 id="cctv-architecture" style={S.h2}>CCTV System Architecture</h2>

      <p style={S.p}>
        Modern IP CCTV ka flow straightforward hai:{" "}
        <strong>IP Cameras → PoE Switch → Network → NVR / VMS → Storage (Local HDD / NAS) → Monitoring Workstation</strong>.
        Har component is chain mein ek specific role play karta hai, aur kisi bhi point pe failure poore
        system ko affect kar sakta hai — isliye redundancy aur monitoring zaroori hai.
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
        <strong>IP Camera</strong> video capture karti hai aur compressed stream network pe bhejti hai.{" "}
        <strong>PoE Switch</strong> cameras ko power (Power over Ethernet) aur network connectivity deta hai —
        ek cable se dono. <strong>Network</strong> (typically dedicated VLAN pe) video traffic route karta hai.{" "}
        <strong>NVR/VMS</strong> streams receive karke record karta hai aur management interface provide karta hai.{" "}
        <strong>Storage</strong> actual recorded footage hold karta hai — NVR ke internal HDDs, external NAS,
        ya dono. <strong>Monitoring Workstation</strong> security/NOC team ko live view aur playback access deta hai.
      </p>

      <Callout type="best-practice" title="Dedicated VLAN for CCTV Traffic">
        CCTV traffic ko production IT network se logically separate karo. Dedicated VLAN bandwidth
        guarantee karta hai, security isolation improve karta hai, aur troubleshooting simplify karta
        hai. Large deployments mein physical network separation bhi consider karo.
      </Callout>
    </>
  );
}
