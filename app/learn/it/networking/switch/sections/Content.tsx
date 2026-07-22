"use client";

import { S, Callout, ComparisonTable, Figure, CodeBlock } from "../shared";
import TopicLink from "@/components/TopicLink";
import HubBridgeSwitch     from "../svg/HubBridgeSwitch";
import MacLearningFlow     from "../svg/MacLearningFlow";
import PacketJourneySwitch from "../svg/PacketJourneySwitch";
import SwitchBootProcess   from "../svg/SwitchBootProcess";
import SpineLeafArch       from "../svg/SpineLeafArch";
import VlanSegmentation    from "../svg/VlanSegmentation";
import StpElection         from "../svg/StpElection";
import EtherchannelLacp    from "../svg/EtherchannelLacp";
import MlagArchitecture    from "../svg/MlagArchitecture";
import PoeArchitecture     from "../svg/PoeArchitecture";
import QosTrafficClasses   from "../svg/QosTrafficClasses";
import SwitchSecurityArch  from "../svg/SwitchSecurityArch";
import TroubleshootingFlow from "../svg/TroubleshootingFlow";
import { faqs }            from "../metadata";

export default function Content() {
  return (
    <>
      {/* ══ QUICK SUMMARY ══════════════════════════════════════════════════ */}
      <div id="quick-summary" style={{ background:"#f0fdf4", border:"1px solid #bbf7d0", borderRadius:10, padding:"1.2rem 1.4rem", marginBottom:"2rem" }}>
        <p style={{ fontWeight:700, color:"#15803d", marginBottom:"0.6rem", fontSize:"1rem" }}>📋 Quick Summary — Enterprise Switch in 2 Minutes</p>
        <ul style={{ ...S.ul, marginBottom:0 }}>
          <li><strong>Switch kya hai:</strong> Intelligent networking device — MAC address table (CAM table) maintain karta hai, frames sirf correct destination port pe forward karta hai. Hub ke upar: intelligent, dedicated bandwidth, full-duplex.</li>
          <li><strong>CAM Table:</strong> MAC address → Port + VLAN mapping. ASIC hardware mein parallel lookup — nanoseconds. TCAM: ACL/QoS/policy lookups (platform-dependent implementation).</li>
          <li><strong>VLAN:</strong> Virtual LAN — ek physical switch pe multiple isolated broadcast domains. Inter-VLAN: L3 routing required (SVI ya Router-on-a-Stick).</li>
          <li><strong>STP/RSTP:</strong> STP (802.1D) loop prevention — 30-50 sec convergence. RSTP (802.1w) — sub-second via Proposal/Agreement. Root bridge manually configure karo.</li>
          <li><strong>LACP:</strong> Link Aggregation (IEEE 802.1AX) — multiple physical links → one logical. Deterministic hashing (not round-robin). MLAG: dual-switch LAG — switch-level redundancy.</li>
          <li><strong>Spine-Leaf:</strong> DC standard — every leaf connects to every spine. Always 2 hops server-to-server (within a given fabric). ECMP — all paths active simultaneously.</li>
          <li><strong>PoE:</strong> 802.3af (15.4W) · 802.3at/PoE+ (30W) · 802.3bt Type 3/4 (60–100W). Budget plan: sum all devices + 20% headroom.</li>
          <li><strong>QoS:</strong> CoS (L2 802.1p PCP 3-bit) · DSCP (L3 6-bit). Trust boundary critical. Platform/ASIC-dependent implementation.</li>
          <li><strong>Security:</strong> DHCP Snooping → DAI → IP Source Guard → 802.1X → Port Security → Storm Control → CoPP. Defense in depth.</li>
          <li><strong>MTU:</strong> Standard 1500 bytes (L3 payload). Jumbo frames — end-to-end alignment mandatory. Implementation-dependent size.</li>
        </ul>
      </div>

      {/* ══ SECTION 2 — SWITCH KYA HAI ══════════════════════════════════════ */}
      <h2 id="switch-kya-hai" style={S.h2}>Enterprise Network Switch Kya Hai</h2>
      <p style={S.p}><strong>Enterprise Network Switch = ek intelligent hardware device jo network devices ko connect karta hai aur data frames ko selectively forward karta hai — sirf destination tak.</strong></p>
      <p style={S.p}>Switch har received frame ka destination MAC address check karta hai apni CAM Table mein. Match milta hai? Sirf us port pe forward karo. Nahi milta? Flood karo same-VLAN ports pe. Yeh simple intelligence hub ko completely replace kar diya — aur modern networking ka foundation ban gaya.</p>
      <p style={S.p}>Data center mein switches everywhere hain. ToR (Top-of-Rack) switch ek server rack ke ports connect karta hai. Aggregation switches racks ko aapas mein. Spine switches poore DC fabric ki backbone banate hain.</p>
      <Callout type="important" title="Switch is Not a Product — It&apos;s an Ecosystem">
        Enterprise switch sirf ek hardware box nahi hai. Iske saath aate hain: VLANs, STP/RSTP, LACP, QoS, security features, monitoring, automation, licensing. In sab ko samjhna ek engineer ki responsibility hai.
      </Callout>

      {/* ══ SECTION 3 — EVOLUTION ════════════════════════════════════════════ */}
      <h2 id="evolution" style={S.h2}>Network Switch Ka Itihaas — Evolution</h2>
      <p style={S.p}><strong>1970s–80s:</strong> Shared coaxial cable — CSMA/CD. Sab devices ek collision domain mein. Jyada devices = jyada collisions = worse performance.</p>
      <p style={S.p}><strong>Hub era:</strong> Multiport repeater — har port pe aaya signal sab ports pe flood. Intelligence zero. Bandwidth completely shared. Collision domain = entire network.</p>
      <p style={S.p}><strong>Bridge (1980s–90s):</strong> MAC address learning — per-segment collision domain isolation. Software-based, limited port count. Scale nahi hota tha.</p>
      <p style={S.p}><strong>1990 — First Ethernet Switch:</strong> Kalpana Systems ne EtherSwitch launch kiya — bridge ki intelligence, hardware-based, har port pe. Microsegmentation. ASIC-based wire-speed forwarding.</p>
      <p style={S.p}><strong>2000s — Layer 3 Switching:</strong> Traditional routers historically relied more heavily on CPU-based forwarding. Layer 3 switches introduced ASIC-based hardware-accelerated routing — wire-speed inter-VLAN forwarding.</p>
      <p style={S.p}><strong>2010s — Data Center Revolution:</strong> Spine-Leaf, VXLAN/EVPN, 10G/40G/100G. East-West traffic dominance. STP replaced by MLAG/BGP-EVPN in DC fabrics.</p>
      <p style={S.p}><strong>Today:</strong> 400G+ switches, programmable ASICs, white-box switching with open-source NOS (SONiC, DentOS). Enterprise switches use merchant silicon (Broadcom, Marvell) or vendor-designed ASICs — depends on platform and product family.</p>

      {/* ══ SECTION 4 — HUB BRIDGE SWITCH ═══════════════════════════════════ */}
      <h2 id="hub-bridge-switch" style={S.h2}>Hub vs Bridge vs Switch — Fark Samjho</h2>
      <Figure caption="Fig 1 — Hub vs Bridge vs Switch: Collision domain evolution.">
        <HubBridgeSwitch />
      </Figure>
      <p style={S.p}><strong>Hub:</strong> Sabhi devices ek shared collision domain mein. Bandwidth shared — jyada devices = worse performance for all. Layer 1 — zero intelligence.</p>
      <p style={S.p}><strong>Bridge:</strong> Har port apna alag collision domain. Lekin: Broadcast Domain ek hi rehta hai — bridge broadcasts dono segments pe forward karta hai. Collision problem solve, broadcast problem nahi.</p>
      <p style={S.p}><strong>Switch:</strong> Har port dedicated collision domain. Full-duplex. No collisions. VLANs se multiple broadcast domains possible.</p>
      <ComparisonTable
        title="Hub vs Bridge vs Switch"
        headers={["Feature","Hub","Bridge","Switch"]}
        rows={[
          ["OSI Layer",         "Layer 1",             "Layer 2",              "Layer 2 (+ L3)"],
          ["Intelligence",      "None",                 "Basic MAC per segment","Full CAM table per port"],
          ["Collision Domains", "1 shared",             "1 per port/segment",   "1 per port"],
          ["Broadcast Domains", "1",                    "1",                    "1 default; VLANs = more"],
          ["Bandwidth",         "Shared — contention",  "Shared within segment","Dedicated per port"],
          ["Full Duplex",       "No",                   "No",                   "Yes"],
          ["Status",            "Dead in enterprise",   "Replaced by switch",   "Universal standard"],
        ]}
        caption=""
      />
      <h3 style={S.h3}>Switching Modes</h3>
      <p style={S.p}><strong>Store-and-Forward:</strong> Complete frame receive → FCS check → forward. Highest latency, complete error checking. Enterprise aur DC standard.</p>
      <p style={S.p}><strong>Cut-Through:</strong> Forwarding can begin before complete frame received. Exact start point aur behavior platform-dependent. Lowest latency, no FCS check.</p>
      <p style={S.p}><strong>Fragment-Free:</strong> Historical/implementation-specific — not available on all modern switches. Pehle 64 bytes receive, then forward.</p>
      <Callout type="maintenance" title="Auto-Negotiation — Media/PHY/Standard Dependent">
        Auto-negotiation behavior media type, PHY implementation, aur IEEE standard pe depend karta hai. Duplex mismatch = late collisions aur CRC errors. Production mein: ya dono sides auto-negotiate, ya dono sides same speed/duplex manually set karo.
      </Callout>

      {/* ══ SECTION 5 — OSI ══════════════════════════════════════════════════ */}
      <h2 id="osi-layer" style={S.h2}>OSI Model mein Switch Kahaan Hai</h2>
      <p style={S.p}><strong>Standard L2 switch Layer 2 (Data Link) pe operate karta hai</strong> — MAC addresses use karta hai. L3 switch Layer 3 (Network) pe bhi — hardware-accelerated IP routing.</p>
      <ComparisonTable
        title="L2 Switch vs L3 Switch"
        headers={["","L2 Switch","L3 Switch"]}
        rows={[
          ["Forwarding basis", "MAC addresses",          "MAC + IP addresses"],
          ["Routing",          "No",                      "Yes — ASIC-accelerated"],
          ["SVI support",      "Limited or none",         "Yes — Switch Virtual Interface"],
          ["Use case",         "Access layer",            "Distribution, core, data center"],
          ["Cost",             "Lower",                   "Higher"],
        ]}
        caption="Modern ASIC switches inspect L3/L4 headers for ACLs/QoS — even L2 switches peek beyond strictly Layer 2."
      />

      {/* ══ SECTION 6 — ETHERNET MAC ══════════════════════════════════════════ */}
      <h2 id="ethernet-mac" style={S.h2}>Ethernet aur MAC Address — Foundation</h2>
      <CodeBlock lang="text">
{`Ethernet Frame Sizes:
  Standard untagged:  1518 bytes max (6+6+2+1500+4)
  802.1Q tagged:      1522 bytes max (+4 byte VLAN tag)
  Minimum frame:      64 bytes (collision detection)
  Jumbo frame:        9000+ bytes (implementation-dependent — not IEEE universal)

  MTU (L3 payload):   1500 bytes  ← NOT the same as frame size
  Frame size:         1518/1522   ← Includes L2 headers + FCS

802.1Q Tag (4 bytes):
  TPID: 0x8100 — "tagged frame"
  TCI: PCP(3b CoS 0-7) + DEI(1b drop-eligible) + VID(12b VLAN 1-4094)`}
      </CodeBlock>
      <ComparisonTable
        title="CAM Table vs ARP Table"
        headers={["","CAM Table (FDB)","ARP Table"]}
        rows={[
          ["Resides on",  "Switch",                     "Host / Router / L3 Switch"],
          ["Stores",      "MAC Address → Switch Port",  "IP Address → MAC Address"],
          ["Used for",    "L2 forwarding decision",     "L3-to-L2 address resolution"],
          ["Example",     "AA:BB:CC → Port1, VLAN10",  "192.168.1.2 → AA:BB:CC:DD"],
          ["Aging",       "~300 sec default",           "~20 min OS dependent"],
        ]}
        caption="ARP table is on PC/server/router — NOT on switch. CAM/FDB is on switch. Different devices, different purposes."
      />

      {/* ══ SECTION 7 — SWITCHING PROCESS ════════════════════════════════════ */}
      <h2 id="switching-process" style={S.h2}>Switching Process — Andar Kya Hota Hai</h2>
      <Figure caption="Fig 2 — MAC Learning aur CAM Table: Unknown Unicast ≠ Broadcast — destination different, flooding reason different.">
        <MacLearningFlow />
      </Figure>
      <p style={S.p}><strong>CAM Table (Content Addressable Memory):</strong> Hardware parallel search — puri table ek single clock cycle mein. Traditional RAM: address do, value milti hai. CAM: value do, location milti hai. Wire-speed forwarding enable karta hai.</p>
      <Callout type="warning" title="Unknown Unicast ≠ Broadcast">
        Unknown Unicast: specific destination MAC, CAM mein nahi → temporary flood. MAC learn hone ke baad: unicast only. Broadcast (FF:FF:FF:FF:FF:FF): sender ne explicitly sabko bheja → hamesha flood, no learning. Dono flooding karte hain lekin reason alag.
      </Callout>
      <p style={S.p}><strong>TCAM (Ternary CAM):</strong> Wildcards support — 0, 1, X (don&apos;t-care). ACLs, QoS policies, aur platform-dependent routing entries. Exact implementation ASIC/platform-specific. TCAM ≠ CAM/FDB — different storage for different purposes.</p>
      <p style={S.p}><strong>CAM table capacity platform-dependent</strong> — verify hardware datasheet. Exhaust hone pe: unknown unicast flooding, performance degradation. Monitor TCAM/CAM utilization in production.</p>

      {/* ══ SECTION 8 — PACKET JOURNEY ═══════════════════════════════════════ */}
      <h2 id="packet-journey" style={S.h2}>Packet Journey Through a Switch — Ingress to Egress</h2>
      <Figure caption="Fig 3 — Complete packet journey ingress to egress. ASIC fast path = nanoseconds. CPU slow path = control/exception traffic.">
        <PacketJourneySwitch />
      </Figure>
      <ComparisonTable
        title="ASIC Fast Path vs CPU Slow Path"
        headers={["","ASIC Fast Path","CPU Slow Path"]}
        rows={[
          ["Speed",    "Nanoseconds",              "Microseconds to milliseconds"],
          ["Use case", "Normal data forwarding",   "Control/management traffic"],
          ["Examples", "Known unicast, VLAN, ACL", "STP BPDUs, OSPF hellos, SSH, ICMP to switch IP"],
        ]}
        caption="CPU slow path traffic types are platform/architecture-dependent. CoPP protects CPU from rate exhaustion."
      />

      {/* ══ SECTION 9 — HARDWARE ANATOMY ══════════════════════════════════════ */}
      <h2 id="hardware-anatomy" style={S.h2}>Switch Hardware — Andar Ka Anatomy</h2>
      <p style={S.p}><strong>ASIC:</strong> Forwarding engine — wire-speed MAC lookup, VLAN, ACL, QoS. Enterprise switches use merchant silicon (Broadcom Trident/Tomahawk, Marvell) or vendor-designed ASICs — platform and product family specific.</p>
      <p style={S.p}><strong>Buffer Memory:</strong> Burst traffic absorb karo bina dropping ke. Architecture workload, traffic patterns aur ASIC design pe depend karta hai.</p>
      <p style={S.p}><strong>Flash:</strong> NOS image (primary + backup mandatory), startup-config, certificates, logs. NVRAM/Flash: startup-config persistence (platform-dependent).</p>
      <ComparisonTable
        title="Fixed vs Modular Switch"
        headers={["","Fixed Switch","Modular (Chassis) Switch"]}
        rows={[
          ["Port density",  "24–96 ports max",              "Hundreds of ports"],
          ["Flexibility",   "Set at purchase",               "Field-upgradable line cards"],
          ["Redundancy",    "Optional dual PSU",             "Dual supervisors, fabric, PSUs"],
          ["Form factor",   "1U–2U",                         "7U–14U chassis"],
          ["Use case",      "Access layer, ToR",             "Core/aggregation, large DC"],
        ]}
        caption="PSU redundancy models: 1+1, N+1, load-sharing — platform-dependent. Verify hardware documentation."
      />

      {/* ══ SECTION 10 — BOOT PROCESS ════════════════════════════════════════ */}
      <h2 id="boot-process" style={S.h2}>Switch Boot Process</h2>
      <Figure caption="Fig 4 — Boot sequence: Power On → POST → Boot Loader → NOS → Startup-Config → Interfaces → Ready.">
        <SwitchBootProcess />
      </Figure>
      <CodeBlock lang="text">
{`startup-config  → Flash pe saved · persists reboot · loaded at boot
running-config  → Currently active in RAM · lost on reload unless saved

Save running config (syntax varies by platform/vendor):
  copy running-config startup-config
  write memory   ← shorthand on some platforms

Always save immediately after every configuration change.`}
      </CodeBlock>
      <Callout type="danger" title="ROMMON Recovery — Platform-Specific">
        Password recovery aur ROMMON procedures har platform pe different hote hain — vendor documentation strictly follow karo. Some platforms support Secure Boot restricting recovery procedures. Console access mandatory.
      </Callout>

      {/* ══ SECTION 11 — FRONT/REAR PANEL ════════════════════════════════════ */}
      <h2 id="front-rear-panel" style={S.h2}>Front Panel, Rear Panel aur LED Indicators</h2>
      <p style={S.p}><strong>Front Panel:</strong> RJ45 copper ports, SFP/SFP+/QSFP transceiver slots, port LEDs, system LEDs, console port (RJ45/USB/mini-USB — baud rate platform-dependent). Always verify physical numbering from chassis — platform-specific.</p>
      <p style={S.p}><strong>Airflow:</strong> Front-to-back (port-to-PSU) most common. Must match rack hot/cold aisle design — mismatch = thermal failure risk.</p>
      <ComparisonTable
        title="LED Indicators — Representative Examples (Vary by platform — verify documentation)"
        headers={["LED","Normal","Problem","Action"]}
        rows={[
          ["SYS",  "Green",       "Amber/Red",       "Console — check hardware"],
          ["PSU",  "Green",       "Amber/Red/Off",   "Check PSU, power input"],
          ["FAN",  "Green",       "Amber → warning", "Replace fan urgently"],
          ["LINK", "Green",       "Off = no link",   "Cable, SFP, remote device"],
          ["ALM",  "Off",         "Amber = minor",   "SNMP/console for details"],
        ]}
        caption="Maximum stack size, LED behavior, airflow indicators — all platform-specific. Verify vendor documentation."
      />

      {/* ══ SECTION 12 — SWITCH TYPES ════════════════════════════════════════ */}
      <h2 id="switch-types" style={S.h2}>Switch Types — Kaunsa Kab Use Karo</h2>
      <ComparisonTable
        title="Switch Type Comparison"
        headers={["Type","Features","Typical Use"]}
        rows={[
          ["Unmanaged",         "No config, no management",             "Home/lab — never enterprise production"],
          ["Fully Managed",     "SSH CLI, SNMP, full features",         "Enterprise production — always"],
          ["Layer 2",           "MAC, VLANs, STP",                     "Access layer"],
          ["Layer 3",           "L2 + hardware routing, SVIs",          "Distribution, core, DC aggregation"],
          ["Data Center",       "25G/100G/400G, VXLAN, EVPN",          "DC ToR, spine"],
          ["Campus/Enterprise", "PoE, stacking, multi-gig, NAC",       "Office floors"],
          ["PoE",               "802.3af/at/bt power delivery",         "Phones, APs, cameras"],
          ["Stackable",         "Multiple units = one logical switch",  "Enterprise access layer"],
          ["Chassis/Modular",   "Line cards, dual supervisors",         "Large DC, core switching"],
        ]}
        caption=""
      />

      {/* ══ SECTION 13 — SELECTION GUIDE ══════════════════════════════════════ */}
      <h2 id="selection-guide" style={S.h2}>Switch Selection Guide</h2>
      <p style={S.p}><strong>Start with business requirements, not specs.</strong> Device type + count → port speed → PoE requirement → redundancy level → budget.</p>
      <Callout type="best-practice" title="Oversubscription — Design Examples Only">
        Oversubscription ratios are design examples — not universal rules. Actual ratio workload, architecture, aur traffic profile pe depend karta hai. Each deployment apne analysis se evaluate karo.
      </Callout>

      {/* ══ SECTION 14 — PROCUREMENT ════════════════════════════════════════ */}
      <h2 id="procurement-checklist" style={S.h2}>Procurement Checklist</h2>
      <CodeBlock lang="text">
{`Enterprise Switch Procurement:

□ Port count: current + 3yr growth + uplinks
□ PoE load: Σ(device watts) × 1.2 headroom
□ L2 vs L3 requirement: inter-VLAN routing needed?
□ Redundancy: dual PSU, dual uplinks, dual switch?
□ Flash space: 2 NOS images
□ End-of-Sale/End-of-Support dates verified
□ Support contract: NBD / 4-hour / 24×7
□ Vendor supported optics list verified
□ Airflow direction matches rack design
□ Weight within rack capacity
□ Grounding provision in rack
□ Dual PDU circuits for dual PSU
□ MTBF: statistical reliability metric — not operational life guarantee`}
      </CodeBlock>

      {/* ══ SECTIONS 15–31 — ARCHITECTURE ════════════════════════════════════ */}
      <h2 id="network-topologies" style={S.h2}>Network Topologies</h2>
      <p style={S.p}><strong>Star:</strong> Central switch — enterprise LAN standard. Central device = SPOF — mitigate with redundant switches.</p>
      <p style={S.p}><strong>Tree (Hierarchical):</strong> Access → Distribution → Core. Enterprise three-tier exactly yeh hai.</p>
      <p style={S.p}><strong>Full Mesh:</strong> Every device to every other. Maximum redundancy, N² links. Spine layer effectively creates full mesh to all leaves.</p>

      <h2 id="three-tier-arch" style={S.h2}>Enterprise Three-Tier Architecture</h2>
      <ComparisonTable
        title="Three-Tier: Access vs Distribution vs Core"
        headers={["","Access Layer","Distribution Layer","Core Layer"]}
        rows={[
          ["Function",     "End-device connectivity",      "Aggregation + policy",    "High-speed backbone"],
          ["OSI",          "Primarily L2",                 "L2/L3 boundary",          "L3"],
          ["Speed",        "1G/2.5G access",               "10G/25G up",              "100G/400G"],
          ["STP role",     "Edge ports (PortFast)",        "Root bridge placement",   "Above STP domain"],
          ["Security",     "802.1X, DHCP snooping",        "ACLs, zone policy",       "Speed focus"],
          ["PoE",          "Common",                       "Rare",                    "No"],
          ["Failure impact","Single switch",               "Multiple access switches", "Potentially large"],
        ]}
        caption="Core = fast and simple. Policy at Distribution. Collapsed core (2-tier) for smaller networks."
      />

      <h2 id="spine-leaf" style={S.h2}>Spine-Leaf Architecture</h2>
      <Figure caption="Fig 5 — Spine-Leaf: Every leaf to every spine. ECMP hashing. Always 2 hops server-to-server (within given fabric).">
        <SpineLeafArch />
      </Figure>
      <p style={S.p}><strong>Why Spine-Leaf:</strong> Three-tier problems in DC — variable hops, STP blocking, Core bottleneck for East-West. Spine-Leaf solves all three.</p>
      <p style={S.p}><strong>Every leaf → every spine</strong> within a given fabric. Exactly 2 hops server-to-server. ECMP: traffic distribution uses deterministic hashing based on packet/flow headers — not round-robin. All spine paths simultaneously active.</p>
      <p style={S.p}><strong>Scalability:</strong> New servers → new leaf → connect to all spines. More bandwidth → new spine → connect to all leaves. Very large environments may use multiple fabrics or pods.</p>

      <h2 id="clos-network" style={S.h2}>Clos Network Fundamentals</h2>
      <p style={S.p}><strong>Charles Clos (Bell Labs, 1953)</strong> — proved non-blocking multi-stage switching possible without direct point-to-point between every endpoint. O(N log N) connections vs O(N²) for direct mesh. Spine-Leaf IS a 2-level Clos network.</p>

      <h2 id="east-west-north-south" style={S.h2}>East-West vs North-South Traffic</h2>
      <p style={S.p}><strong>North-South:</strong> DC ↔ External (users, internet). HTTP requests, API calls.</p>
      <p style={S.p}><strong>East-West:</strong> Inside DC — server-to-server. Web → App → DB. vMotion. iSCSI/NFS. Microservice API calls.</p>
      <p style={S.p}><strong>Evolution:</strong> Pre-virtualization = North-South dominant. Post-virtualization/microservices = East-West dominant. Spine-Leaf directly optimizes East-West — any leaf to any leaf via any spine, 2 hops.</p>

      <h2 id="access-dist-core" style={S.h2}>Access, Distribution aur Core Layers</h2>
      <p style={S.p}>Root bridge at Distribution (manually configured). ACLs at Distribution/Access, not Core. Core = speed, no complexity. PortFast + BPDU Guard on all access ports. FHRP at Distribution for gateway redundancy.</p>

      <h2 id="dc-switch-arch" style={S.h2}>Data Center Switching Architecture</h2>
      <p style={S.p}><strong>Logical networks per DC:</strong> Production, Storage (iSCSI/NFS), Management/OOB, Backup, vMotion/live migration, BMC/IPMI, PXE provisioning. Separate VLANs, sometimes separate physical infrastructure.</p>
      <p style={S.p}><strong>Dual-homing:</strong> Server dual NICs → two different leaf switches (MLAG) → near-hitless failover on switch failure.</p>

      <h2 id="tor-mor-eor" style={S.h2}>Top-of-Rack, Middle-of-Row aur End-of-Row</h2>
      <ComparisonTable
        title="ToR vs MoR vs EoR"
        headers={["","ToR","MoR","EoR"]}
        rows={[
          ["Switch count",  "Highest (per rack)", "Medium",        "Lowest (per row)"],
          ["Cable length",  "0.5–3m copper",      "Medium",        "Long — fiber needed"],
          ["Failure scope", "One rack only",       "Half row",      "Entire row"],
          ["Modern pref",   "✓ Preferred",         "Niche",         "Legacy"],
        ]}
        caption="ToR = modern DC standard. Short copper patch cables, isolated failure domain."
      />

      <h2 id="uplink-design" style={S.h2}>Uplink Design aur Oversubscription</h2>
      <p style={S.p}><strong>Redundant uplinks mandatory</strong> — dual uplinks to two different distribution/spine switches. Single uplink = SPOF.</p>
      <CodeBlock lang="text">
{`Oversubscription = Total Downlink Bandwidth / Total Uplink Bandwidth
Example: 48×1G downlinks = 48G; 2×10G uplinks = 20G → 2.4:1 ratio

Acceptable ratio depends on workload and architecture requirements.
No universal "correct" ratio — analyze per deployment.`}
      </CodeBlock>

      {/* ══ SECTIONS 24–31 — CABLING ══════════════════════════════════════════ */}
      <h2 id="enterprise-cabling" style={S.h2}>Enterprise Cabling Architecture</h2>
      <p style={S.p}><strong>Structured Cabling (TIA-568):</strong> Horizontal: work area → IDF patch panel max 90m permanent + 10m patch = 100m total. Backbone: IDF → MDF (fiber). Campus: building-to-building (single-mode fiber).</p>
      <p style={S.p}><strong>Labeling:</strong> Both ends of every cable: <code>[SOURCE]:[PORT]—[DEST]:[PORT]</code>. Color coding per policy — labels are authoritative, not color alone.</p>

      <h2 id="copper-cabling" style={S.h2}>Copper Ethernet Cabling</h2>
      <ComparisonTable
        title="Ethernet Cable Categories"
        headers={["Category","Max Speed","Max Distance","Notes"]}
        rows={[
          ["Cat5e",  "1G",     "100m",    "Legacy — adequate for 1G"],
          ["Cat6",   "1G/10G", "100m/55m","10G at full 100m: Cat6A needed"],
          ["Cat6A",  "10G",    "100m",    "Preferred for new installs. High-density bundles: alien crosstalk should be considered."],
          ["Cat8",   "25G/40G","30m",     "DC short runs — IEEE 802.3bq"],
        ]}
        caption="T568B wiring most common. Auto-MDIX eliminates crossover cable need on modern switches."
      />

      <h2 id="fiber-cabling" style={S.h2}>Fiber Optic Cabling</h2>
      <Callout type="danger" title="Fiber Cleanliness — #1 Cause of Optical Failures">
        Dirty optical connectors are among the most common causes of optical link failures. Always inspect and clean fiber connectors using approved cleaning tools before installation. Never exceed the minimum bend radius specified by the cable manufacturer — excessive bending increases attenuation and may permanently damage the fiber.
      </Callout>
      <p style={S.p}><strong>Structure:</strong> Core (light travels) → Cladding (total internal reflection) → Buffer → Strength members → Outer jacket. Wavelength windows: 850nm (MMF short), 1310nm (SMF/MMF), 1550nm (SMF long-haul).</p>

      <h2 id="smf-vs-mmf" style={S.h2}>Single Mode vs Multi-Mode Fiber</h2>
      <ComparisonTable
        title="SMF vs MMF"
        headers={["","Multi-Mode (MMF)","Single-Mode (SMF)"]}
        rows={[
          ["Core size",      "50μm (OM3/4/5) or 62.5μm","9μm"],
          ["Max distance",   "Up to ~400m (OM4/OM5)",   "Kilometers (40–80km+)"],
          ["Transceiver",    "VCSEL — lower cost",        "Laser diode — higher cost"],
          ["DC use case",    "Server-to-ToR, short runs", "Long runs, campus backbone"],
          ["Connector",      "LC duplex most common",     "LC duplex, SC, MPO/MTP"],
        ]}
        caption="OM3/OM4 (aqua/magenta) modern DC standard. OS2 single-mode (yellow). OM5 for SWDM4."
      />

      <h2 id="transceivers" style={S.h2}>Ethernet Transceivers</h2>
      <ComparisonTable
        title="Transceiver Family"
        headers={["Form Factor","Speed","Notes"]}
        rows={[
          ["SFP",      "1G",         "LC fiber or RJ45"],
          ["SFP+",     "10G",        "LC fiber, RJ45, DAC"],
          ["SFP28",    "25G",        "LC fiber, DAC"],
          ["QSFP+",    "40G",        "4×10G lanes, MPO/LC, DAC"],
          ["QSFP28",   "100G",       "4×25G lanes, MPO/LC, DAC"],
          ["QSFP-DD",  "200G/400G",  "Supported speeds depend on platform, hardware, transceiver type"],
          ["OSFP",     "400G+",      "8 lanes, newer format"],
        ]}
        caption="Before installing: verify wavelength, connector type, fiber type, reach, compatibility at both ends. Check vendor supported optics list."
      />
      <p style={S.p}><strong>DOM/DDM:</strong> Digital Optical Monitoring — TX power, RX power, temperature, voltage, laser bias. RX power low → dirty connector, bad fiber, distance issue. TX power low → dying laser.</p>
      <p style={S.p}><strong>Reach designators:</strong> SR (Short Range ~100m MMF), LR (Long Range ~10km SMF), ER (~40km), ZR (~80km+). Calculate optical power budget per link.</p>

      <h2 id="dac-vs-aoc" style={S.h2}>DAC vs AOC</h2>
      <ComparisonTable
        title="DAC vs AOC"
        headers={["","Passive DAC","Active DAC","AOC"]}
        rows={[
          ["Technology", "Copper twinax — no active electronics","Copper + active signal conditioning electronics","Fiber + active electro-optic"],
          ["Distance",   "Vendor/platform/cable-type dependent", "Vendor/platform dependent",                     "Up to ~100m typically"],
          ["Power",      "Lowest",                               "Low",                                           "Higher"],
          ["Cost",       "Lowest",                               "Low-medium",                                    "Higher"],
          ["Best for",   "Same-rack",                            "Moderate cross-rack",                           "Cross-row, EMI environments"],
        ]}
        caption="Passive DAC: no active signal conditioning. Active DAC: electronics improve signal integrity — distinct from distance alone."
      />

      <h2 id="patch-panels" style={S.h2}>Patch Panels aur Structured Cabling</h2>
      <p style={S.p}><strong>Patch Panel:</strong> Passive component — organizes cable terminations but does not switch, regenerate or process network traffic. Permanent infrastructure cables terminate here. Short patch cables switch ports se panel tak.</p>

      <h2 id="physical-installation" style={S.h2}>Physical Installation aur Rack Deployment</h2>
      <p style={S.p}><strong>Grounding:</strong> MANDATORY — chassis ground lug → rack ground bar → building grounding. Personnel safety, ESD protection, EMI reduction. Never skip.</p>
      <p style={S.p}><strong>Power:</strong> PSU-1 → PDU-A, PSU-2 → PDU-B (different feeds). Dual-redundant power paths.</p>
      <p style={S.p}><strong>Cabling:</strong> Velcro ties for patch cables (reusable). Zip ties for permanent infrastructure only. Never over-tighten — cable geometry disturb karta hai (especially Cat6A).</p>

      {/* ══ SECTIONS 32–46 — LAYER 2 ══════════════════════════════════════════ */}
      <h2 id="vlan-fundamentals" style={S.h2}>VLAN Fundamentals</h2>
      <Figure caption="Fig 6 — VLAN Segmentation: HR, Finance, Guest — isolated broadcast domains on one physical switch.">
        <VlanSegmentation />
      </Figure>
      <p style={S.p}><strong>VLAN (Virtual LAN)</strong> = logical network segment — physical infrastructure se independent. Ek physical switch pe multiple isolated virtual networks. Har VLAN = apna broadcast domain. Inter-VLAN: L3 routing required.</p>
      <ComparisonTable
        title="Common Enterprise VLANs"
        headers={["VLAN","Purpose","Devices"]}
        rows={[
          ["Data",       "User workstations",         "PCs, Laptops"],
          ["Voice",      "IP telephony",              "IP Phones — tagged + CoS 5"],
          ["Management", "Network device management", "Switch SVIs, OOB"],
          ["Server",     "Application servers",       "Windows/Linux servers"],
          ["Storage",    "Storage traffic",           "iSCSI initiators, NAS clients"],
          ["Guest",      "Visitor Internet",          "Guest Wi-Fi devices"],
          ["DMZ",        "Public-facing services",    "Web servers, mail servers"],
        ]}
        caption="VLAN 1: default — avoid production. Native VLAN = unused dummy (e.g. VLAN 999) on trunks."
      />

      <h2 id="access-vs-trunk" style={S.h2}>Access Port vs Trunk Port</h2>
      <ComparisonTable
        title="Access Port vs Trunk Port"
        headers={["Parameter","Access Port","Trunk Port"]}
        rows={[
          ["VLANs carried",  "Exactly one",              "Multiple (configured list)"],
          ["Traffic",        "Untagged ingress/egress",  "802.1Q tagged"],
          ["Connected to",   "End device (PC, phone)",   "Switch, router, AP controller"],
          ["Device awareness","Device unaware of VLAN", "Switch/router reads VLAN tag"],
        ]}
        caption="IP Phone: access port mode — PC traffic untagged, phone traffic tagged Voice VLAN. One port, two VLANs."
      />

      <h2 id="dot1q-tagging" style={S.h2}>VLAN Tagging — IEEE 802.1Q</h2>
      <CodeBlock lang="text">
{`802.1Q Tag (4 bytes inserted after Source MAC):
  TPID (2B): 0x8100 — "tagged frame marker"
  TCI  (2B):
    PCP (3b): 802.1p CoS 0-7 (5=Voice, 7=Network Control)
    DEI (1b): Drop Eligible Indicator  [older spec: CFI]
    VID (12b): VLAN ID 1–4094  (0 and 4095 reserved)

Tagged frame max: 1522 bytes (1518 + 4 byte tag)
FCS recalculated after tag insertion.`}
      </CodeBlock>

      <h2 id="native-vlan" style={S.h2}>Native VLAN</h2>
      <Callout type="danger" title="Native VLAN Mismatch = VLAN Hopping Risk">
        Switch-A native VLAN 1, Switch-B native VLAN 10 → VLAN 1 traffic silently lands in VLAN 10. Security boundary violated. No error messages. Fix: both trunk ends must have same native VLAN. Best practice: native VLAN = unused dummy VLAN (e.g. VLAN 999) with no devices.
      </Callout>

      <h2 id="broadcast-domains" style={S.h2}>Broadcast Domains</h2>
      <p style={S.p}><strong>Broadcast = FF:FF:FF:FF:FF:FF:</strong> All same-VLAN devices process it. ARP requests, DHCP Discover. VLAN isolation: 200 devices flat = 200 process each broadcast. 4 VLANs of 50 = 50 only. 75% reduction.</p>

      <h2 id="ethernet-loops" style={S.h2}>Loop Problems in Ethernet</h2>
      <CodeBlock lang="text">
{`Why loops are catastrophic:
  IP (L3): TTL decrements each hop → packet dies on expiry
  Ethernet (L2): NO TTL equivalent → frames circulate infinitely

Loop scenario:
  Switch-A ──Cable-1──── Switch-B
           ──Cable-2────
  Broadcast sent → both cables → both received by Switch-B
  → flooded back → Switch-A floods again → EXPONENTIAL GROWTH
  → network useless in seconds

Tell-tale sign: MAC flapping in switch logs
Prevention: STP/RSTP on all switches + BPDU Guard on access ports`}
      </CodeBlock>

      <h2 id="stp" style={S.h2}>Spanning Tree Protocol (STP)</h2>
      <Figure caption="Fig 7 — STP election aur port states. RSTP (802.1w) sub-second convergence via Proposal/Agreement — modern enterprise standard.">
        <StpElection />
      </Figure>
      <p style={S.p}><strong>STP (IEEE 802.1D)</strong> spanning tree create karta hai — redundant paths block karo, failover pe unblock. Root Bridge election: Lowest Bridge ID (Priority + MAC). Default priority 32768 — manually set 4096 on desired root.</p>
      <Callout type="danger" title="STP Path Cost — Platform Verification Required">
        Path cost values (10M=100, 100M=19, 1G=4, 10G=2) represent the commonly used short path-cost method. Modern OS may support the IEEE long path-cost method with different values. Always verify from your target platform documentation.
      </Callout>
      <p style={S.p}><strong>PortFast:</strong> Access ports pe STP bypass — end device connected, no loop risk. <strong>BPDU Guard:</strong> PortFast port pe BPDU → err-disabled (unauthorized switch blocked). <strong>Root Guard:</strong> Prevents better-priority BPDU from overriding configured root.</p>

      <h2 id="rstp" style={S.h2}>Rapid Spanning Tree Protocol (RSTP)</h2>
      <p style={S.p}><strong>RSTP (IEEE 802.1w)</strong> — modern enterprise standard. 30-50 sec STP → sub-second. 3 states: Discarding/Learning/Forwarding. Alternate Port = pre-identified backup root port.</p>
      <p style={S.p}><strong>Proposal/Agreement:</strong> Switch-A sends Proposal → Switch-B syncs all ports Discarding (loop prevention) → Agreement sent → Switch-A port Forwarding immediately → cascades downstream. Milliseconds per link.</p>

      <h2 id="mstp" style={S.h2}>Multiple Spanning Tree Protocol (MSTP)</h2>
      <p style={S.p}><strong>MSTP (IEEE 802.1s)</strong> — multiple VLANs → one STP instance. Less CPU overhead than Cisco PVST+. MST Region = same Name + Revision + VLAN-to-instance map (all three must match exactly). Load balancing: different instances → different root bridges → both links active.</p>

      <h2 id="lacp" style={S.h2}>Link Aggregation — LACP</h2>
      <Figure caption="Fig 8 — EtherChannel/LACP: Multiple physical links → one logical. Deterministic hashing — same flow = same link always.">
        <EtherchannelLacp />
      </Figure>
      <p style={S.p}><strong>LACP (IEEE 802.1AX, formerly 802.3ad):</strong> Active+Active or Active+Passive = LAG forms. Passive+Passive = no LAG. Load balancing: deterministic hashing (src/dst MAC/IP/L4 ports) — NOT round-robin. Single large flow: max 1 link bandwidth — aggregate doesn&apos;t split single flows.</p>
      <Callout type="warning" title="LACP Hash Imbalance">
        One link at 80%+ while others idle despite LACP → hash imbalance. All traffic same src/dst = same hash = same link. Fix: change hash algorithm to src-dst-ip.
      </Callout>

      <h2 id="port-channel" style={S.h2}>Port Channel</h2>
      <p style={S.p}><strong>Port Channel</strong> = logical interface — 4×10G physical = 1×40G logical. Configuration, VLANs, STP — sab port channel pe, individual members pe nahi. Member ports requirements: same speed, same duplex, same VLAN, connected to same switch (or MLAG pair).</p>
      <Callout type="common-mistake" title="Port Channel Mistakes">
        (1) Member ports on different physical switches without MLAG = loop risk. (2) Individual port VLAN conflict with port-channel config. (3) Partial LACP config — ek side active, doosri static — behavior platform-dependent.
      </Callout>

      <h2 id="mlag" style={S.h2}>MLAG — Multi-Chassis Link Aggregation</h2>
      <Figure caption="Fig 9 — MLAG: Two physical switches as one logical LAG partner. Peer link for sync + data. Keepalive prevents split-brain.">
        <MlagArchitecture />
      </Figure>
      <p style={S.p}><strong>MLAG solves:</strong> Standard LACP requires sab member ports on one physical switch. Switch fail = LAG down. MLAG: two physical switches = one logical LAG partner. Switch fail → remaining switch handles all traffic.</p>
      <p style={S.p}><strong>Peer Link (ISL):</strong> Control plane sync (MAC, ARP, LACP state) + data forwarding path. <strong>Keepalive:</strong> Peer liveness check via separate link (management network). Peer link fail + keepalive reachable → secondary disables MLAG ports (split-brain prevented).</p>
      <ComparisonTable
        title="MLAG Vendor Terminology"
        headers={["Vendor","Name"]}
        rows={[
          ["Cisco Nexus","vPC — Virtual Port Channel"],
          ["Arista",     "MLAG"],
          ["Juniper",    "MC-LAG"],
          ["Dell OS10",  "VLT — Virtual Link Trunking"],
          ["HPE Aruba",  "VSX — Virtual Switching Extension"],
        ]}
        caption="Same concept, different vendor names. Implementation details vary — verify vendor documentation."
      />

      <h2 id="switch-stacking" style={S.h2}>Switch Stacking</h2>
      <p style={S.p}><strong>Stacking:</strong> Multiple physical switches → one logical device. Dedicated stacking cables (ring topology), one management IP, one CLI, one running config. Stack Master election: highest priority → longest uptime → lowest MAC. Maximum stack size platform-specific — verify datasheet.</p>
      <ComparisonTable
        title="Stacking vs MLAG"
        headers={["","Stacking","MLAG"]}
        rows={[
          ["Management",  "Single IP, single CLI",       "Two separate management planes"],
          ["Scope",       "Same model typically",        "Can be different models"],
          ["Distance",    "Meters (stack cables)",       "Network link — flexible"],
          ["Complexity",  "Lower",                       "Higher"],
          ["Use case",    "Enterprise access layer",     "DC aggregation"],
        ]}
        caption=""
      />

      <h2 id="l3-switching" style={S.h2}>Layer 3 Switching Basics</h2>
      <p style={S.p}><strong>L3 switch = L2 switching + hardware-accelerated IP routing.</strong> Traditional routers historically relied more heavily on CPU-based forwarding. L3 switches introduced ASIC routing — wire-speed inter-VLAN.</p>
      <p style={S.p}><strong>SVI (Switch Virtual Interface):</strong> Logical L3 interface per VLAN — virtual, no physical port. VLAN must exist + port up in VLAN + no shutdown. Acts as default gateway for devices in that VLAN.</p>

      <h2 id="inter-vlan-routing" style={S.h2}>Inter-VLAN Routing</h2>
      <ComparisonTable
        title="Inter-VLAN Routing Methods"
        headers={["Method","Performance","Enterprise Recommendation"]}
        rows={[
          ["Router-on-a-Stick", "Limited — single interface bottleneck + hairpin","Legacy/small deployments only"],
          ["L3 Switch (SVI)",   "Wire speed — ASIC hardware routing",             "Enterprise standard — always prefer"],
        ]}
        caption="SVI: first packet CPU routing → ASIC hardware entry created → subsequent packets ASIC-forwarded. No bottleneck."
      />
      <p style={S.p}><strong>FHRP — First Hop Redundancy:</strong> Virtual gateway shared by two L3 switches. VRRP = IETF standard (RFC 3768 v2, RFC 5798 v3). HSRP = Cisco proprietary. GLBP = Cisco proprietary (active-active). Switch fail → remaining switch takes virtual IP/MAC → devices unaffected.</p>

      {/* ══ SECTIONS 47–62 — ADVANCED FEATURES ══════════════════════════════ */}
      <h2 id="poe" style={S.h2}>Power over Ethernet (PoE)</h2>
      <Figure caption="Fig 10 — PoE Architecture: IEEE standards, detection, classification, power delivery, budget calculation.">
        <PoeArchitecture />
      </Figure>
      <Callout type="important" title="PoE Vendor Terminology — IEEE Standard Is Authoritative">
        Vendor trade names (UPoE, Hi-PoE, 4PPoE, UPOE+) vary. IEEE standard: 802.3bt Type 3 (60W) and 802.3bt Type 4 (90-100W). Use IEEE standard terminology for procurement specifications.
      </Callout>
      <CodeBlock lang="text">
{`PoE Budget Example:
  20 × IP Phones  (Class 3, ~7W)  = 140W
  10 × Cameras    (Class 3, ~10W) = 100W
   8 × APs        (Class 4, ~20W) = 160W
  Total device load:               = 400W
  + 20% headroom:                  = 480W minimum PoE budget needed

Switch documented PoE budget must exceed calculated total.
Cat6/Cat6A recommended for high-power PoE — lower resistance = less heat.`}
      </CodeBlock>

      <h2 id="jumbo-frames-mtu" style={S.h2}>Jumbo Frames aur MTU</h2>
      <p style={S.p}><strong>MTU (Maximum Transmission Unit):</strong> Maximum IP payload — standard <strong>1500 bytes (L3 payload only)</strong>. Frame size (1518/1522) includes L2 headers + FCS — MTU ≠ frame size. Jumbo frames: payload &gt;1500 bytes, commonly 9000/9216 bytes — implementation-dependent, not IEEE universal standard.</p>
      <Callout type="danger" title="MTU Mismatch — Silent Performance Killer">
        Jumbo frames partial config → large frames silently dropped → TCP retransmits → terrible large-file/iSCSI/NFS performance. Symptoms: ping works, large transfers terrible. Test: ping with DF flag large payload. Fix: configure ALL devices in path simultaneously. One misconfigured device = entire path broken.
      </Callout>

      <h2 id="qos" style={S.h2}>Quality of Service (QoS)</h2>
      <Figure caption="Fig 11 — QoS Processing Pipeline: Classification → Trust Boundary → Marking → Queuing → Policing/Shaping → Scheduling.">
        <QosTrafficClasses />
      </Figure>
      <Callout type="maintenance" title="QoS Is Platform/ASIC Dependent">
        Queue depth, scheduling algorithm, buffer implementation, hardware queues, QoS pipeline — platform and ASIC dependent. Concepts are universal; implementation varies by vendor/hardware. Verify vendor documentation for specific capabilities.
      </Callout>
      <p style={S.p}><strong>Trust boundary:</strong> User PCs — remark to DSCP 0 (don&apos;t trust). IP phones — trust CoS 5. Servers — may trust DSCP. Define at access switch.</p>
      <p style={S.p}><strong>Policing vs Shaping:</strong> Policing = excess dropped/remarked immediately. Shaping = excess buffered, smoothly released (adds latency). Policing: ingress rate limiting. Shaping: WAN egress.</p>
      <p style={S.p}><strong>DCB (Data Center Bridging):</strong> Priority-aware Ethernet. PFC (802.1Qbb) can enable lossless per traffic class where appropriately designed and supported — not every Ethernet deployment is or should be lossless.</p>

      <h2 id="multicast" style={S.h2}>Multicast on Switches</h2>
      <Callout type="best-practice" title="IGMP Snooping — Enable on All Managed Switches">
        IGMP Snooping disabled → multicast = broadcast flooding on all ports → bandwidth waste. Enable → switch tracks group membership → forward to subscribed ports only. Enable on virtually every managed switch — significant bandwidth savings.
      </Callout>

      <h2 id="security-features" style={S.h2}>Network Security Features</h2>
      <Figure caption="Fig 12 — Switch Security: Management, Control, Data Plane — defense in depth.">
        <SwitchSecurityArch />
      </Figure>
      <p style={S.p}><strong>DHCP Snooping:</strong> Rogue DHCP server block. Trusted ports: DHCP replies allowed. Untrusted: DHCP replies blocked. Binding table {'{'}MAC, IP, Port, VLAN{'}'} = basis for DAI + IP Source Guard.</p>
      <p style={S.p}><strong>DAI (Dynamic ARP Inspection):</strong> ARP spoofing prevent — ARP vs DHCP Snooping binding verify. Man-in-the-middle attacks blocked.</p>
      <p style={S.p}><strong>802.1X:</strong> Port-based NAC — Supplicant → Authenticator (switch) → RADIUS. Auth success → dynamic VLAN/ACL assignment. MAB for non-802.1X devices.</p>
      <p style={S.p}><strong>Storm Control:</strong> Broadcast/multicast/unknown unicast rate threshold → block or port shutdown. All access ports pe configure karo.</p>

      <h2 id="switch-management" style={S.h2}>Switch Management aur Monitoring</h2>
      <p style={S.p}><strong>Access methods:</strong> SSH v2 CLI (primary — no Telnet), SNMP v3 (no v1/v2c community strings — cleartext), REST API/NETCONF/gNMI (automation), web GUI (secondary). OOB management network mandatory for production.</p>
      <p style={S.p}><strong>LLDP (IEEE 802.1AB):</strong> Standard neighbor discovery. Disable on external/untrusted ports — prevents topology disclosure.</p>
      <p style={S.p}><strong>SPAN/RSPAN/ERSPAN:</strong> Port mirroring for Wireshark/IDS. RSPAN: across switches. ERSPAN: GRE-encapsulated to any IP destination.</p>
      <p style={S.p}><strong>NetFlow/sFlow/IPFIX:</strong> Traffic flow sampling — bandwidth analysis, top talkers, capacity planning, security anomaly detection.</p>

      <h2 id="logging-ntp" style={S.h2}>Logging aur Time Synchronization</h2>
      <p style={S.p}><strong>Syslog severity:</strong> 0-Emergency, 1-Alert, 2-Critical, 3-Error, 4-Warning, 5-Notice, 6-Info, 7-Debug. Production: Warning (4) ya Notice (5). Debug = massive volume — active troubleshooting only.</p>
      <Callout type="danger" title="NTP Not Configured = Incident Investigation Impossible">
        Wrong timestamps → log correlation impossible during incident → forensic timeline useless. NTP = mandatory day-1. Minimum 2 NTP servers. All switches → same servers. No exceptions for production switches.
      </Callout>

      <h2 id="config-management" style={S.h2}>Configuration Management aur Backup</h2>
      <p style={S.p}><strong>Golden rule:</strong> After every change → save config immediately. Forget karo → reload pe config lost. This is the #1 avoidable mistake in field operations.</p>
      <p style={S.p}><strong>Backup methods:</strong> SCP (preferred — encrypted), TFTP (unencrypted — internal only). Trigger: every change + daily scheduled + pre-upgrade mandatory.</p>
      <p style={S.p}><strong>Version control:</strong> Git-based config tracking. Diff shows exactly what changed. Rollback = revert commit + apply.</p>

      <h2 id="firmware-upgrade" style={S.h2}>Software Images, Firmware aur Upgrade Strategy</h2>
      <CodeBlock lang="text">
{`Pre-Upgrade Checklist:
  □ Release notes: breaking changes? Known issues?
  □ Compatibility: hardware modules supported?
  □ Config backup verified
  □ Two NOS images on flash (current + new)
  □ Boot variable updated correctly — VERIFY BEFORE RELOAD
  □ Lab test on same model first
  □ Maintenance window scheduled, stakeholders notified
  □ Console access ready (network may drop)
  □ Rollback plan documented

Post-Upgrade:
  □ Version correct?
  □ All interfaces up, VLANs present, routing intact?
  □ Keep old image until confirmed stable`}
      </CodeBlock>
      <Callout type="important" title="ISSU — In-Service Software Upgrade">
        ISSU depends on hardware architecture, supervisor redundancy, software release, aur supported upgrade paths. Not every platform or software version supports ISSU. Verify vendor documentation before planning in-service upgrade.
      </Callout>

      <h2 id="common-mistakes" style={S.h2}>Common Engineering Mistakes</h2>
      <ComparisonTable
        title="Top Engineering Mistakes aur Prevention"
        headers={["Mistake","Impact","Prevention"]}
        rows={[
          ["Wrong VLAN on access port",  "Device wrong network, security breach",      "Verify VLAN before cabling, acceptance test"],
          ["Native VLAN mismatch",       "Silent VLAN hop",                            "show interfaces trunk — both ends match"],
          ["Wrong optics",               "Port dead — delay, cost",                    "Verify fiber type, reach, vendor compat list"],
          ["Forgetting write memory",    "Config lost on reload",                      "Save immediately after every change"],
          ["STP disabled in DC",         "Loop = complete network outage",             "RSTP + BPDU Guard — never disable STP"],
          ["VTP domain mismatch",        "VLAN database wiped enterprise-wide",        "New switches: VTP transparent/client first"],
          ["BPDU Guard on trunk port",   "Trunk err-disabled = outage",                "PortFast + BPDU Guard = access ports ONLY"],
          ["Jumbo frames partial config","Silent performance degradation",             "Configure ALL path devices simultaneously"],
          ["NTP not configured",         "Log timestamps useless during incidents",    "NTP mandatory — day 1, verify, monitor"],
          ["Cable labeling skipped",     "Wrong cable pulled in incident",             "Label both ends before production"],
          ["Third-party SFP unverified", "Port disabled — delay, downtime",           "Check vendor supported optics list first"],
          ["Boot variable not updated",  "Switch boots old image post-upgrade",        "Verify boot variable before reload"],
        ]}
        caption=""
      />

      {/* ══ TROUBLESHOOTING ══════════════════════════════════════════════════ */}
      <h2 id="troubleshooting" style={S.h2}>Troubleshooting Framework</h2>
      <Figure caption="Fig 13 — Layer-by-layer switch troubleshooting. Start L1, confirm each layer before moving up. Syntax varies by platform.">
        <TroubleshootingFlow />
      </Figure>
      <Callout type="maintenance" title="CLI Command Syntax — Platform-Specific">
        Command syntax varies: Cisco IOS-XE, Cisco NX-OS, Arista EOS, Juniper Junos, Aruba AOS-CX, Dell OS10, SONiC. Commands shown are representative examples — consult vendor documentation for your NOS.
      </Callout>
      <ComparisonTable
        title="Interface Error Counters — Interpretation"
        headers={["Counter","Likely Cause","Action"]}
        rows={[
          ["CRC Errors",     "Bad cable, dirty fiber, bad SFP, EMI",          "Replace cable, clean fiber, swap SFP, DOM check"],
          ["Late Collisions","Duplex mismatch — strong indicator",             "Check duplex both ends"],
          ["Output Drops",   "Output congestion — buffer overflow",            "QoS tuning, upgrade link, load balance"],
          ["Giants",         "MTU mismatch or misconfigured device",           "Verify MTU end-to-end"],
          ["Runts (<64B)",   "Half-duplex collision or faulty NIC",            "Check duplex, NIC health"],
        ]}
        caption="CRC errors + late collisions = duplex mismatch high probability. Fix: auto-negotiate both sides or same hardcoded speed/duplex."
      />

      {/* ══ PRODUCTION SCENARIOS ══════════════════════════════════════════════ */}
      <h2 id="production-scenarios" style={S.h2}>Real Production Scenarios</h2>
      <h3 style={S.h3}>Scenario 1 — STP Loop Broadcast Storm</h3>
      <p style={S.p}>Floor network suddenly completely unresponsive. Switch logs: MAC flapping. Port utilization: 100%. Root cause: technician accidentally cabled both ends of a cable into same switch&apos;s two access ports — unintentional loop. Fix: rogue cable unplugged. PortFast + BPDU Guard implemented — next time port goes err-disabled instantly.</p>

      <h3 style={S.h3}>Scenario 2 — MLAG Peer Link Failure</h3>
      <p style={S.p}>50% traffic loss on MLAG pair servers — not full outage. Root cause: peer link fiber dirty connector — high CRC errors. Switch-B (secondary) disabled MLAG ports (split-brain prevention). Fix: fiber connector clean + replace. Lesson: peer link = highest quality cabling, DOM monitoring mandatory.</p>

      <h3 style={S.h3}>Scenario 3 — EtherChannel Hash Imbalance</h3>
      <p style={S.p}>4-link LACP — Link-3 at 87%, others &lt;10%. Root cause: src-dst-mac hash — majority traffic from same storage array (same src/dst MAC = same hash = same link). Fix: hash changed to src-dst-ip → balanced ~20-25% each link.</p>

      <h3 style={S.h3}>Scenario 4 — Firmware Upgrade — Switch Didn&apos;t Come Back</h3>
      <p style={S.p}>Upgrade attempt → switch never came back online. Root cause: boot variable still pointed to old image name. Old image deleted (space). New image filename slightly different — boot variable not updated. Recovery: ROMMON → TFTP boot new image. Lesson: update boot variable → verify → THEN reload. Never delete old image before confirming new boots.</p>

      <h3 style={S.h3}>Scenario 5 — PoE Budget Exceeded</h3>
      <p style={S.p}>Cameras randomly going offline. Root cause: 3 high-power cameras added without budget review. Total 728W / 740W budget. Brief peak → budget exceed → switch cuts lowest-priority device. Fix: PoE priority configured, 2 low-priority cameras moved to injectors, SNMP trap for budget monitoring.</p>

      <h3 style={S.h3}>Scenario 6 — MTU Black Hole (iSCSI Performance)</h3>
      <p style={S.p}>iSCSI performance terrible after new ToR switches deployed. Ping works, SSH works. Root cause: new ToR switches jumbo frames not configured (default 1500). Old switches had 9000 MTU. Large iSCSI I/O silently dropped → TCP retransmits → terrible throughput. Fix: jumbo frames all new switches simultaneously. Lesson: MTU = all-or-nothing per path.</p>

      {/* ══ O&M CHECKLIST ══════════════════════════════════════════════════════ */}
      <h2 id="om-checklist" style={S.h2}>Enterprise Operations aur O&amp;M Checklist</h2>
      <h3 style={S.h3}>Daily</h3>
      <ul style={S.ul}>
        <li>SNMP alerts/traps review — any critical overnight?</li>
        <li>Syslog review — errors, warnings, security violations?</li>
        <li>Interface utilization — sustained &gt;80%?</li>
        <li>CPU/memory utilization on critical switches</li>
        <li>PoE budget — ports near depletion?</li>
        <li>Physical walkthroughs — LED status on critical racks</li>
      </ul>
      <h3 style={S.h3}>Weekly</h3>
      <ul style={S.ul}>
        <li>Configuration backups verified</li>
        <li>Unauthorized config changes? (diff vs baseline)</li>
        <li>CRC/input error trending?</li>
        <li>STP topology stable? Unexpected topology changes?</li>
        <li>DOM/DDM optical power within spec on all critical links?</li>
        <li>Authentication failures review (SSH, 802.1X)</li>
      </ul>
      <h3 style={S.h3}>Monthly</h3>
      <ul style={S.ul}>
        <li>Port utilization trends — capacity planning input</li>
        <li>Physical inspection — LED, fan sounds, unusual smells</li>
        <li>PSU status — both PSUs healthy per switch?</li>
        <li>Network documentation current? Port mappings updated?</li>
        <li>All changes documented in change log?</li>
      </ul>
      <h3 style={S.h3}>Quarterly / Periodic</h3>
      <ul style={S.ul}>
        <li>CVE/security advisory review — current NOS version vulnerable?</li>
        <li>Unused ports disabled? Default credentials changed?</li>
        <li>SSH key rotation, management ACL review</li>
        <li>Hardware End-of-Support approaching? Plan replacement.</li>
        <li>Software End-of-Support approaching? Plan upgrade.</li>
        <li>Config restore test on lab switch (DR verification)</li>
        <li>MTBF note: statistical reliability metric — not expected operational life</li>
      </ul>

      {/* ══ BEST PRACTICES ══════════════════════════════════════════════════════ */}
      <h2 id="dc-best-practices" style={S.h2}>Data Center Best Practices</h2>
      <h3 style={S.h3}>Design Principles</h3>
      <ul style={S.ul}>
        <li>Spine-Leaf for DC — predictable latency, ECMP, East-West optimized</li>
        <li>Redundant uplinks from every leaf — no single switch failure = full outage</li>
        <li>Per-function VLANs — data, storage, management, backup, vMotion separate</li>
        <li>No production traffic on VLAN 1. Native VLAN = unused dummy on trunks</li>
        <li>Consistent naming: <code>[location]-[layer]-[number]</code> — e.g. DC1-SPINE-01</li>
        <li>Interface descriptions mandatory on every production port</li>
        <li>MLAG for dual-switch server connections — switch-level redundancy</li>
        <li>FHRP at distribution/aggregation — gateway redundancy mandatory</li>
        <li>QoS policy consistent from edge to core</li>
        <li>Jumbo frames: configure end-to-end or not at all</li>
      </ul>
      <h3 style={S.h3}>Security Hardening</h3>
      <ul style={S.ul}>
        <li>SSH v2 only — Telnet disabled globally</li>
        <li>AAA centralized — TACACS+/RADIUS, no local-only auth in production</li>
        <li>SNMPv3 only — no community strings</li>
        <li>VTY ACL — management stations only</li>
        <li>PortFast + BPDU Guard on all access ports</li>
        <li>Root Guard on distribution-facing ports</li>
        <li>DHCP Snooping + DAI on all access VLANs</li>
        <li>Storm Control on all access ports</li>
        <li>CoPP configured on all production switches</li>
        <li>CDP/LLDP disabled on external/untrusted ports</li>
        <li>Unused ports: shutdown + assign to dedicated unused VLAN</li>
      </ul>
      <p style={S.p}>Actual implementation depends on project requirements, vendor platform, organizational policies, and data center architecture.</p>

      {/* ══ INTERVIEW QUESTIONS ══════════════════════════════════════════════ */}
      <h2 id="interview-questions" style={S.h2}>Interview / Job Knowledge</h2>

      <h3 style={S.h3}>Q: Switch aur Hub mein kya fark hai?</h3>
      <p style={S.p}><strong>A:</strong> Hub Layer 1 device — dumb repeater, sab ports pe flood, ek shared collision domain, half-duplex. Switch Layer 2 — MAC learning (CAM table), sirf correct port pe forward, per-port dedicated collision domain, full-duplex. Hub enterprise mein dead hai.</p>

      <h3 style={S.h3}>Q: CAM table aur TCAM mein kya difference hai?</h3>
      <p style={S.p}><strong>A:</strong> CAM/FDB = MAC Address → Switch Port + VLAN mapping. Exact match. ASIC parallel lookup. TCAM = Ternary CAM — wildcards (0/1/X). ACLs, QoS policies, platform-dependent routing lookups. Both hardware — TCAM more expensive resource — monitor utilization.</p>

      <h3 style={S.h3}>Q: VLAN kya hai? Inter-VLAN routing kaise hoti hai?</h3>
      <p style={S.p}><strong>A:</strong> VLAN = logical network segment — ek physical switch pe multiple isolated broadcast domains. Inter-VLAN: L3 routing required. L3 switch pe SVI create karo per VLAN — SVI = default gateway. ASIC hardware-accelerated routing. Router-on-a-Stick = legacy single interface bottleneck. L3 Switch SVI = enterprise standard.</p>

      <h3 style={S.h3}>Q: STP kyun exist karta hai? RSTP se kya improve hua?</h3>
      <p style={S.p}><strong>A:</strong> Ethernet mein loops catastrophic — no TTL, infinite frames, broadcast storm. STP spanning tree create karta hai — redundant paths maintain karo, kuch ports block karo. STP convergence 30-50 seconds (timer-based). RSTP: Proposal/Agreement — sub-second convergence. Alternate Port = pre-identified backup. Modern enterprise: hamesha RSTP use karo.</p>

      <h3 style={S.h3}>Q: LACP mein load balancing kaise hoti hai?</h3>
      <p style={S.p}><strong>A:</strong> Deterministic hashing — NOT round-robin. Hash inputs (src/dst MAC, IP, L4 ports) → link selected. Same flow = same link always. Multiple flows = distributed across links. Single large TCP connection max 1 link bandwidth. Hash imbalance: ek link high → change hash algorithm (src-dst-ip better distribution).</p>

      <h3 style={S.h3}>Q: MLAG kya hai? vPC se kya relationship hai?</h3>
      <p style={S.p}><strong>A:</strong> MLAG = two physical switches as one logical LAG partner. Switch-level redundancy — switch fail ho, remaining switch handles traffic. Peer link: control sync + data forwarding. Keepalive: split-brain prevention. vPC = Cisco Nexus MLAG implementation. Arista → MLAG. Juniper → MC-LAG. Dell → VLT. Concept same, vendor names different.</p>

      <h3 style={S.h3}>Q: Spine-Leaf three-tier se better kyun hai?</h3>
      <p style={S.p}><strong>A:</strong> Three-tier problems: variable hops, STP blocking wasted bandwidth, Core bottleneck for East-West. Spine-Leaf: every leaf → every spine (within given fabric). Exactly 2 hops server-to-server. ECMP — all paths active (deterministic hashing). Horizontal scaling. Predictable latency. East-West dominant modern DC ke liye optimized.</p>

      <h3 style={S.h3}>Q: PoE budget kaise plan karein?</h3>
      <p style={S.p}><strong>A:</strong> Sab PoE devices list karo with power class (IEEE 802.3af/at/bt). Sum karo total expected load. 20% headroom add karo. Switch documented PoE budget must exceed total. Cat6/Cat6A for high-power PoE — less resistance, less heat. Budget monitoring via SNMP mandatory.</p>

      <h3 style={S.h3}>Q: MTU mismatch kaise troubleshoot karein?</h3>
      <p style={S.p}><strong>A:</strong> Symptom: ping works, large file transfers terrible. Detection: ping with DF flag aur large payload (Linux: ping -M do -s 8972). Timeout ya &quot;Frag needed&quot; = mismatch in path. Fix: all devices in path simultaneously configure. One misconfigured device = path broken.</p>

      <h3 style={S.h3}>Q: Interface err-disabled — cause aur recovery?</h3>
      <p style={S.p}><strong>A:</strong> Err-disabled = switch ne security violation pe port disable kiya. Common causes: BPDU Guard (switch connected to PortFast port), Port Security (MAC limit exceeded), Storm Control (threshold exceeded). Recovery: (1) Root cause fix karo FIRST. (2) shutdown → no shutdown = manual recovery. errdisable recovery timer = automatic — use carefully after root cause resolved.</p>

      <h3 style={S.h3}>Q: VRRP aur HSRP mein kya fark hai?</h3>
      <p style={S.p}><strong>A:</strong> VRRP = IETF standard (RFC 3768 v2, RFC 5798 v3) — multi-vendor support. HSRP = Cisco proprietary — Cisco-only environments. GLBP = Cisco proprietary — active-active (multiple active gateways). Dono virtual gateway IP provide karte hain — switch fail → virtual IP/MAC seamlessly to standby. VRRP preferred for multi-vendor environments.</p>

      <h3 style={S.h3}>Q: CRC errors kya indicate karte hain?</h3>
      <p style={S.p}><strong>A:</strong> Physical layer problem — bad cable, dirty fiber, bad SFP, EMI interference. Check DOM/DDM (RX power OK?), replace cable, clean fiber (approved tools), swap SFP. CRC errors + late collisions = duplex mismatch. Incrementing CRC: never ignore — physical issue will worsen.</p>

      <h3 style={S.h3}>Q: Data center mein 5 must-configure security features kaun se hain?</h3>
      <p style={S.p}><strong>A:</strong> (1) SSH-only management + VTY ACL. (2) PortFast + BPDU Guard on all access ports. (3) DHCP Snooping + DAI on all access VLANs. (4) Storm Control on access ports. (5) CoPP to protect switch CPU. Plus: SNMPv3, AAA centralized, unused ports shutdown + unused VLAN, Root Guard on distribution-facing ports.</p>

      <h3 style={S.h3}>Q: LACP vs Static EtherChannel — when to use?</h3>
      <p style={S.p}><strong>A:</strong> LACP always preferred — auto-negotiates, detects misconfigurations, standard. Static only when partner doesn&apos;t support LACP or specific legacy scenarios. Static risk: misconfigured end = silent broadcast loop (no LACP PDUs = no detection). LACP active+passive both sides: safe. Static both sides: verify manually.</p>

      <h3 style={S.h3}>Q: ISSU kya hai aur kab possible hai?</h3>
      <p style={S.p}><strong>A:</strong> ISSU = In-Service Software Upgrade — upgrade NOS without traffic interruption. Requires: redundant supervisor modules, NSF/SSO configured, supported upgrade path, specific hardware architecture. Not universally available — depends on platform, software release, aur vendor support. Always verify vendor documentation before planning ISSU.</p>

      {/* ══ KEY TAKEAWAYS ══════════════════════════════════════════════════════ */}
      <h2 id="key-takeaways" style={S.h2}>Key Takeaways</h2>
      <ul style={S.ul}>
        <li><strong>Switch = selective forwarder.</strong> CAM table — sirf correct port. Unknown unicast ≠ broadcast — same flooding, completely different reason.</li>
        <li><strong>ASIC = wire-speed forwarding.</strong> Nanoseconds. TCAM: ACL/QoS/policy — platform-dependent. CAM/FDB: L2 MAC forwarding. Different hardware, different purposes.</li>
        <li><strong>VLAN = broadcast isolation.</strong> Inter-VLAN: L3 required. Native VLAN mismatch = silent security risk. VLAN 1 avoid in production.</li>
        <li><strong>STP = loop prevention.</strong> Root bridge manually configure karo. RSTP (802.1w) = modern standard — sub-second. PortFast + BPDU Guard on access ports always.</li>
        <li><strong>LACP = link aggregation.</strong> IEEE 802.1AX. Deterministic hashing — not round-robin. MLAG: dual-switch LAG. Keepalive prevents split-brain.</li>
        <li><strong>Spine-Leaf = DC standard.</strong> 2 hops (within fabric). ECMP. East-West optimized. Horizontal scaling.</li>
        <li><strong>PoE budget planning mandatory.</strong> Sum devices + 20% headroom. IEEE 802.3bt standard — vendor names vary. Cat6/Cat6A for high-power PoE.</li>
        <li><strong>QoS: platform/ASIC dependent.</strong> Trust boundary at access. DSCP end-to-end. PFC: specifically engineered lossless designs only.</li>
        <li><strong>Security = defense in depth.</strong> DHCP Snooping + DAI + 802.1X + Port Security + Storm Control + CoPP + SSH-only + AAA.</li>
        <li><strong>MTU = end-to-end consistency.</strong> All or nothing per path. 1500 bytes standard MTU (L3 payload) ≠ frame size (1518/1522).</li>
        <li><strong>Fiber cleanliness = mandatory.</strong> Dirty connectors = #1 optical failure cause. Clean before every installation.</li>
        <li><strong>Write memory after every change.</strong> Two NOS images on flash always. Config backup mandatory before upgrade.</li>
        <li><strong>NTP = mandatory day 1.</strong> Wrong timestamps = incident investigation nightmare.</li>
        <li><strong>CLI syntax varies.</strong> Cisco IOS-XE ≠ NX-OS ≠ EOS ≠ Junos ≠ AOS-CX. Learn concepts — vendor docs for syntax.</li>
        <li><strong>VRRP = IETF standard (RFC 3768/5798).</strong> HSRP/GLBP = Cisco proprietary. FHRP at distribution = mandatory for gateway redundancy.</li>
      </ul>

      {/* ══ FAQ ════════════════════════════════════════════════════════════════ */}
      <h2 style={{ ...S.h2, marginTop: "3rem" }}>Frequently Asked Questions</h2>
      {faqs.map((item, i) => (
        <div key={i} style={{ marginBottom: "1.5rem", paddingBottom: "1.5rem", borderBottom: i < faqs.length - 1 ? "1px solid #e5e7eb" : "none" }}>
          <p style={{ ...S.p, fontWeight: 700, marginBottom: "0.4rem" }}>{item.q}</p>
          <p style={{ ...S.p, marginBottom: 0 }}>{item.a}</p>
        </div>
      ))}

      {/* ══ GLOSSARY & ABBREVIATIONS ════════════════════════════════════════ */}
      <h2 style={{ ...S.h2, marginTop: "3rem" }}>Glossary &amp; Abbreviations</h2>
      <p style={{ ...S.p, marginBottom: "1.5rem" }}>The complete glossary contains comprehensive definitions of the networking protocols, standards, acronyms, hardware components and enterprise terminology used throughout the Enterprise Network Switch article.</p>

      {/* Group A — Networking Fundamentals */}
      <ComparisonTable
        title="Networking Fundamentals"
        headers={["Abbreviation","Full Form","Meaning in Switch Context"]}
        rows={[
          ["ARP",      "Address Resolution Protocol",                "L3-to-L2 resolution — maps IP address to MAC address. ARP table on host/router; CAM table on switch. ARP request = broadcast; reply = unicast."],
          ["BGP",      "Border Gateway Protocol",                    "L3 routing protocol. In DC: used as underlay routing for Spine-Leaf fabrics (eBGP unnumbered) and as control plane for EVPN overlays."],
          ["BPDU",     "Bridge Protocol Data Unit",                  "STP/RSTP/MSTP control message. Switches exchange BPDUs to elect root bridge, determine port roles, maintain loop-free topology. Sent every 2 seconds (Hello timer) by default."],
          ["CAM",      "Content Addressable Memory",                 "Hardware used for the switch MAC address table (FDB). Parallel lookup — value in, location out. Enables wire-speed forwarding. Different from TCAM."],
          ["CoS",      "Class of Service",                           "L2 QoS marking. Uses 3-bit PCP field inside 802.1Q VLAN tag — values 0–7. Scope limited to L2 domain; lost when 802.1Q tag is stripped."],
          ["CRC",      "Cyclic Redundancy Check",                    "Error-detection field in Ethernet frame. Incrementing CRC errors on an interface = physical layer problem (bad cable, dirty fiber, bad transceiver, EMI)."],
          ["CSMA/CD",  "Carrier Sense Multiple Access / Collision Detection","Legacy half-duplex Ethernet collision-avoidance mechanism. Irrelevant in full-duplex switched environments — no collisions."],
          ["DHCP",     "Dynamic Host Configuration Protocol",        "IP address assignment protocol. DHCP Snooping on switch: distinguishes trusted (server-facing) from untrusted (client-facing) ports to block rogue DHCP servers."],
          ["DSCP",     "Differentiated Services Code Point",        "L3 QoS marking. 6-bit field in IP header DS byte. 64 possible values. Key values: EF (46) = voice, AF41 (34) = video, CS0 (0) = best-effort. End-to-end across IP network."],
          ["ECMP",     "Equal Cost Multi-Path",                      "Multiple equal-cost paths used simultaneously. In Spine-Leaf: all spine paths active. Traffic distributed via deterministic hashing — not round-robin."],
          ["EMI",      "Electromagnetic Interference",               "Electrical noise that corrupts signals. Can cause CRC errors on copper links. Mitigation: shielded cable, proper grounding, routing away from power cables."],
          ["EVPN",     "Ethernet VPN",                              "BGP-based control plane for VXLAN overlays. Used in modern DC fabrics to distribute MAC/IP reachability information across Spine-Leaf fabric."],
          ["FCS",      "Frame Check Sequence",                       "4-byte CRC at end of Ethernet frame. Switch checks FCS on ingress; recalculates on egress after any header modification (VLAN tag add/strip)."],
          ["FDB",      "Forwarding Database",                        "Switch MAC address table — same as CAM table. Stores MAC → Port + VLAN mappings. Entries age out (~300 sec default). Unknown MAC = flood same-VLAN ports."],
        ]}
        caption=""
      />

      {/* Group B — Layer 2 Protocols */}
      <ComparisonTable
        title="Layer 2 Protocols aur Standards"
        headers={["Abbreviation","Full Form","Meaning in Switch Context"]}
        rows={[
          ["802.1Q",   "IEEE 802.1Q",                               "VLAN tagging standard. Inserts 4-byte tag into Ethernet frame (TPID 0x8100 + TCI). Tagged frame max: 1522 bytes. Defines access ports (untagged) and trunk ports (tagged)."],
          ["802.1w",   "IEEE 802.1w",                               "Rapid Spanning Tree Protocol (RSTP). Sub-second convergence via Proposal/Agreement mechanism. 3 port states (Discarding/Learning/Forwarding). Backward compatible with 802.1D."],
          ["802.1s",   "IEEE 802.1s",                               "Multiple Spanning Tree Protocol (MSTP). Maps multiple VLANs to fewer STP instances. Reduces CPU/BPDU overhead vs per-VLAN STP. Requires Region Name + Revision + VLAN map to match."],
          ["802.1AX",  "IEEE 802.1AX (formerly 802.3ad)",          "Link Aggregation standard — LACP. Defines Link Aggregation Groups (LAG), LACP PDU exchange, Actor/Partner roles. Vendor-neutral. Absorbed from 802.3ad."],
          ["802.1AB",  "IEEE 802.1AB",                              "Link Layer Discovery Protocol (LLDP) standard. Devices advertise identity, capabilities, management address to directly connected neighbors. TLV-based."],
          ["802.1D",   "IEEE 802.1D",                               "Original Spanning Tree Protocol (STP) standard. Root bridge election, port roles (Root/Designated/Blocked), 5 port states. Convergence 30–50 seconds. Superseded by RSTP in modern networks."],
          ["DEI",      "Drop Eligible Indicator",                   "1-bit field in 802.1Q TCI. DEI=1: this frame may be dropped first during congestion. Supersedes the older CFI (Canonical Format Indicator) bit in same position."],
          ["ISL",      "Inter-Switch Link",                         "In MLAG context: dedicated high-speed peer link connecting the two MLAG switch members. Carries both control plane sync traffic and data plane overflow traffic."],
          ["LACP",     "Link Aggregation Control Protocol",         "IEEE 802.1AX protocol. Dynamically negotiates LAG between Actor and Partner. Modes: Active (initiates) and Passive (responds). Active+Passive or Active+Active forms LAG. Passive+Passive does not."],
          ["LAG",      "Link Aggregation Group",                    "Logical bundle of multiple physical links. Created by LACP or static config. Appears as one logical interface. Load-balances via deterministic hashing across member links."],
          ["LLDP",     "Link Layer Discovery Protocol",             "IEEE 802.1AB standard. Switch advertises hostname, port ID, capabilities, management IP to neighbors. Used for topology discovery, NMS mapping, LLDP-MED power negotiation for IP phones."],
          ["MLAG",     "Multi-Chassis Link Aggregation",            "Proprietary feature allowing two physical switches to act as one logical LAG partner. Server sees one switch; both switches active. Peer link syncs control plane; keepalive prevents split-brain. Also: vPC (Cisco Nexus), MC-LAG (Juniper), VLT (Dell), VSX (HPE)."],
          ["MSTP",     "Multiple Spanning Tree Protocol",           "IEEE 802.1s. Groups multiple VLANs into fewer STP instances. MST Region = same Name + Revision + VLAN-to-instance map. Load balancing possible across instances with different root bridges."],
          ["PCP",      "Priority Code Point",                       "3-bit CoS field inside 802.1Q TCI. Values 0–7. 5 = Voice (IP telephony), 7 = Network Control (highest). Defines 802.1p QoS priority at Layer 2."],
          ["RSTP",     "Rapid Spanning Tree Protocol",              "IEEE 802.1w. Replaces 802.1D STP. Sub-second convergence via Proposal/Agreement handshake. Adds Alternate Port (pre-identified backup root port) and Backup Port roles. Modern enterprise standard."],
          ["STP",      "Spanning Tree Protocol",                    "IEEE 802.1D. Prevents Layer 2 loops by creating loop-free logical topology. Elects Root Bridge (lowest Bridge ID). Port roles: Root, Designated, Blocked. Convergence: 30–50 seconds. Superseded by RSTP."],
          ["TPID",     "Tag Protocol Identifier",                   "2-byte field starting 802.1Q tag. Fixed value 0x8100 — receiver identifies this as a tagged Ethernet frame."],
          ["TCI",      "Tag Control Information",                   "2-byte field in 802.1Q tag following TPID. Contains PCP (3b), DEI (1b), and VID (12b)."],
          ["VID",      "VLAN Identifier",                           "12-bit VLAN ID field in 802.1Q TCI. Range 1–4094 usable. 0 and 4095 reserved. Identifies which VLAN a tagged frame belongs to."],
          ["VLAN",     "Virtual Local Area Network",                "Logical network segment on a physical switch. Each VLAN = separate broadcast domain. Inter-VLAN communication requires L3 routing. Configured per-port as access (one VLAN) or trunk (multiple VLANs, tagged)."],
          ["VTP",      "VLAN Trunking Protocol",                    "Cisco proprietary protocol for propagating VLAN database between switches. Risk: highest-revision-number switch overwrites domain VLAN database. Best practice: set new switches to Transparent or Client mode before connecting."],
          ["VXLAN",    "Virtual Extensible LAN",                    "L2-over-L3 overlay encapsulation. Extends VLANs across L3 boundaries in data center fabrics. Used with EVPN control plane. Enables large-scale multi-tenant DC networks."],
        ]}
        caption=""
      />

      {/* Group C — Layer 3 & Routing */}
      <ComparisonTable
        title="Layer 3 aur Routing"
        headers={["Abbreviation","Full Form","Meaning in Switch Context"]}
        rows={[
          ["AOS-CX",   "Aruba OS-CX",                               "Aruba (HPE) Network Operating System for enterprise switches. Relevant for CLI syntax differences in troubleshooting cross-platform environments."],
          ["CoPP",     "Control Plane Policing",                    "Switch feature that rate-limits CPU-bound traffic — STP BPDUs, OSPF hellos, SSH sessions, ICMP, ARP. Prevents CPU exhaustion attacks. Platform-specific configuration."],
          ["EOS",      "Extensible Operating System",               "Arista Networks NOS. Relevant for CLI syntax differences (e.g., show interfaces vs show interface)."],
          ["FHRP",     "First Hop Redundancy Protocol",             "Category of protocols providing virtual gateway redundancy: HSRP (Cisco proprietary), VRRP (IETF RFC 3768/5798), GLBP (Cisco proprietary active-active). Switch fail → standby takes virtual IP/MAC transparently."],
          ["GLBP",     "Gateway Load Balancing Protocol",           "Cisco proprietary FHRP. Unlike HSRP/VRRP (active/standby), GLBP provides active-active gateway load balancing — multiple switches simultaneously serve as default gateway for different hosts."],
          ["HSRP",     "Hot Standby Router Protocol",               "Cisco proprietary FHRP. Active switch holds virtual IP/MAC; standby monitors. Active failure → standby promotes. Not interoperable with non-Cisco equipment. VRRP is the IETF standard equivalent."],
          ["IGMP",     "Internet Group Management Protocol",        "Protocol for IPv4 multicast group membership. Host→Router: join/leave group. IGMPv1 (basic), IGMPv2 (explicit leave, querier election), IGMPv3 (source-specific). Switch uses IGMP Snooping to limit multicast flooding."],
          ["OSPF",     "Open Shortest Path First",                  "Link-state routing protocol. Used in enterprise distribution/core and DC underlay. On L3 switches: runs as control plane process for dynamic route exchange between SVIs and routers."],
          ["SPOF",     "Single Point of Failure",                   "A component whose failure causes entire system failure. Eliminated by redundancy: dual uplinks, dual switches (MLAG/stacking), dual PSUs, dual PDU feeds."],
          ["SVI",      "Switch Virtual Interface",                  "Logical L3 interface on L3 switch corresponding to a VLAN. No physical port — virtual. Acts as default gateway for devices in that VLAN. Used for inter-VLAN routing at wire speed via ASIC."],
          ["TCAM",     "Ternary Content Addressable Memory",        "Specialized hardware memory supporting 3-state matching (0, 1, X=don't-care). Stores ACLs, QoS policies, and platform-dependent routing lookups. Different from CAM/FDB. TCAM is a finite resource — monitor utilization."],
          ["TTL",      "Time to Live",                              "IP header field decremented by each router hop. Packet dropped when TTL reaches 0 — prevents infinite routing loops. No L2 equivalent — reason why Ethernet loops are catastrophic without STP."],
          ["VRRP",     "Virtual Router Redundancy Protocol",        "IETF standard FHRP (RFC 3768 v2, RFC 5798 v3). Multiple switches share virtual IP/MAC. Active (Master) switch holds virtual IP; backup monitors. Switch fail → backup promotes. Multi-vendor interoperable."],
        ]}
        caption=""
      />

      {/* Group D — QoS & Security */}
      <ComparisonTable
        title="QoS aur Security"
        headers={["Abbreviation","Full Form","Meaning in Switch Context"]}
        rows={[
          ["AAA",      "Authentication, Authorization, Accounting", "Security framework. Authentication: who are you? Authorization: what can you do? Accounting: what did you do? Implemented via RADIUS or TACACS+ integration. Centralized credential management for switch CLI access."],
          ["ACL",      "Access Control List",                       "Ordered list of permit/deny rules applied to switch ports or SVIs. MAC ACL (L2), Standard ACL (source IP), Extended ACL (src+dst IP+port+protocol). Stored in TCAM. Finite resource — monitor utilization."],
          ["DAI",      "Dynamic ARP Inspection",                    "Switch security feature. Inspects incoming ARP packets against DHCP Snooping binding table {MAC, IP, Port, VLAN}. Mismatch → ARP dropped. Prevents ARP spoofing / man-in-the-middle attacks. Requires DHCP Snooping enabled."],
          ["DCB",      "Data Center Bridging",                      "IEEE framework for priority-aware Ethernet. Components: PFC (802.1Qbb), ETS (802.1Qaz), DCBX (802.1AB extension), QCN (802.1Qau). Can enable lossless behavior for selected traffic classes where appropriately designed and supported."],
          ["MAB",      "MAC Authentication Bypass",                "802.1X fallback for non-802.1X devices (printers, cameras, VoIP phones). Switch uses device MAC address as credential to RADIUS. Less secure than 802.1X certificate/password auth."],
          ["PFC",      "Priority Flow Control",                    "IEEE 802.1Qbb. Per-priority flow control — PAUSE frames sent only for a specific CoS class, not all traffic. Used in specifically engineered lossless Ethernet designs (RoCE, FCoE). Not universally required."],
          ["PVST+",    "Per-VLAN Spanning Tree Plus",              "Cisco proprietary STP variant. Runs a separate STP instance per VLAN. Per-VLAN root bridge placement enables load balancing. Higher CPU/BPDU overhead than MSTP at scale."],
          ["QoS",      "Quality of Service",                       "Traffic management — classification, marking, queuing, scheduling to prioritize critical traffic during congestion. Mechanism: CoS (L2), DSCP (L3). Trust boundary defines where markings are accepted or overridden."],
          ["RADIUS",   "Remote Authentication Dial-In User Service","IETF standard (RFC 2865) AAA protocol. Switch sends authentication requests to RADIUS server (Cisco ISE, FreeRADIUS, Microsoft NPS). Used for SSH login, 802.1X port authentication, dynamic VLAN/ACL assignment."],
          ["TACACS+",  "Terminal Access Controller Access-Control System Plus","Cisco-developed AAA protocol. Separates Authentication, Authorization, Accounting — finer-grained per-command authorization. Encrypts entire packet body (vs RADIUS encrypting only password). Preferred for network device management."],
          ["VTY",      "Virtual Teletype",                         "Virtual terminal lines on switch — logical SSH/Telnet management sessions. VTY ACL restricts access to authorized management station IPs only. SSH v2 required — Telnet is cleartext."],
        ]}
        caption=""
      />

      {/* Group E — Hardware & Physical */}
      <ComparisonTable
        title="Hardware aur Physical Layer"
        headers={["Abbreviation","Full Form","Meaning in Switch Context"]}
        rows={[
          ["AOC",      "Active Optical Cable",                      "Fiber cable with active electro-optic conversion at both ends. EMI-immune, longer reach than DAC. Higher power/cost. Used for cross-row or EMI-sensitive runs where DAC is insufficient."],
          ["ASIC",     "Application Specific Integrated Circuit",   "Custom silicon chip that is the forwarding engine of a switch. Performs MAC lookup, VLAN processing, ACL matching, QoS queuing at wire speed. Enterprise switches use merchant silicon (Broadcom, Marvell) or vendor-designed ASICs — platform specific."],
          ["BMC",      "Baseboard Management Controller",           "Dedicated out-of-band management controller on servers and other supported infrastructure. In the data center network, BMC/IPMI traffic is typically placed on a separate management/OOB network."],
          ["CPU",      "Central Processing Unit",                   "Control plane processor on switch. Runs NOS, STP, routing protocols, management sessions. Not involved in normal data forwarding (handled by ASIC). CoPP protects CPU from rate exhaustion."],
          ["DAC",      "Direct Attach Copper",                      "Copper twinax cable with SFP/QSFP connectors. Passive DAC: no active electronics — lowest cost/power. Active DAC: includes signal conditioning electronics. Distance and performance vendor/platform/cable-type dependent."],
          ["DDM",      "Digital Diagnostics Monitoring",            "Synonym for DOM. Transceiver reports TX power, RX power, temperature, voltage, laser bias current in real time. Used for optical link health monitoring and fault diagnosis."],
          ["DOM",      "Digital Optical Monitoring",               "Real-time transceiver health reporting: TX power, RX power, temperature, voltage, laser bias current. Low RX power = dirty connector / bad fiber / distance. Low TX power = failing laser."],
          ["LC",       "Lucent Connector",                          "Small-form-factor fiber connector. Industry standard for SFP/SFP+/SFP28 transceivers. Duplex LC = two fibers (TX+RX). Single-fiber BiDi transceivers use single LC simplex."],
          ["LED",      "Light-Emitting Diode",                      "Visual status indicators on switch front/rear panel. Link LED (port status), SYS LED (system health), PSU LED, FAN LED, ALM (alarm). Colors and blink patterns are platform-specific."],
          ["MMF",      "Multi-Mode Fiber",                          "Fiber with larger core (50μm or 62.5μm). Multiple light modes. OM3/OM4 (aqua) standard in DC — up to ~300–400m at 10G. Uses low-cost VCSEL light source. EMI-immune. Shorter reach than SMF."],
          ["MPO/MTP",  "Multi-fiber Push On / Mechanical Transfer Push On","High-density fiber connector — 12 or 24 fibers in one connector. Used with QSFP+ (40G) and QSFP28 (100G) transceivers. Required for high-density DC cabling with pre-terminated trunk cables and patch panels."],
          ["MTBF",     "Mean Time Between Failures",               "Statistical reliability metric — average time a component operates between failures in a population. Not a guarantee of individual device lifespan. Use for comparative evaluation and spare planning — not as predicted operational life."],
          ["NIC",      "Network Interface Card",                    "Server network adapter. Dual-NIC servers: two physical NICs connected to two different switches (MLAG) for link and switch redundancy. NIC teaming/bonding = server-side LACP."],
          ["PHY",      "Physical Layer Transceiver",               "Chip that handles signal encoding/decoding between digital MAC layer and physical medium. Auto-negotiation behavior depends on PHY implementation, media type, and IEEE standard."],
          ["POST",     "Power-On Self Test",                        "Hardware diagnostic routine running at boot. Tests CPU, RAM, Flash, ASIC, fans, PSUs, temperature sensors. POST failure = boot stops, requires hardware intervention."],
          ["PSU",      "Power Supply Unit",                         "Switch power supply. Enterprise switches have dual redundant PSUs. Redundancy models: 1+1 (active/standby), N+1, load-sharing — platform-dependent. PSU-1 → PDU-A, PSU-2 → PDU-B for full power redundancy."],
          ["QSFP",     "Quad Small Form-factor Pluggable",          "Transceiver family. QSFP+: 40G (4×10G lanes). QSFP28: 100G (4×25G lanes). QSFP-DD: 200G/400G (8 lanes). Supported speeds depend on platform, hardware architecture, and transceiver type."],
          ["RJ45",     "Registered Jack 45",                        "8-pin modular connector for copper Ethernet (Cat5e/Cat6/Cat6A) and console management port. Standard for 1G/2.5G/10G copper switch ports."],
          ["ROMMON",   "ROM Monitor",                               "Low-level boot environment on switch. Accessible by interrupting normal boot. Used for password recovery, TFTP image boot when NOS is missing/corrupt, setting boot variable. Procedures are platform-specific."],
          ["SFP",      "Small Form-factor Pluggable",               "Transceiver module family. SFP: 1G. SFP+: 10G. SFP28: 25G. Hot-swappable. LC fiber (SR/LR/ER/ZR) or RJ45 copper. Always verify wavelength, fiber type, reach, and vendor compatibility before installing."],
          ["SMF",      "Single-Mode Fiber",                         "Fiber with 9μm core. Single light mode — no modal dispersion. OS2 (yellow) standard. Supports long distances (10km to 80km+ depending on transceiver). Uses laser diode light source. Higher transceiver cost than MMF."],
          ["T568B",    "TIA-568B Wiring Standard",                  "Most common RJ45 connector pin-out for copper Ethernet in enterprise environments. Defines wire color-to-pin mapping. Counterpart T568A also valid — consistency across an installation is what matters."],
          ["VCSEL",    "Vertical-Cavity Surface-Emitting Laser",   "Low-cost laser used in multi-mode SFP/SFP+/SFP28 (SR) transceivers. Drives OM3/OM4 multi-mode fiber. Lower cost and power vs laser diodes in SMF transceivers."],
        ]}
        caption=""
      />

      {/* Group F — Management, Monitoring & Operations */}
      <ComparisonTable
        title="Management, Monitoring aur Operations"
        headers={["Abbreviation","Full Form","Meaning in Switch Context"]}
        rows={[
          ["API",      "Application Programming Interface",         "Programmatic interface for switch configuration and monitoring. Modern switches support REST API, NETCONF, RESTCONF, and gNMI for automation and network management systems."],
          ["CLI",      "Command Line Interface",                    "Primary switch management interface. Accessed via SSH (secure, required) or console port. Syntax varies by NOS: Cisco IOS-XE, NX-OS, Arista EOS, Juniper Junos, Aruba AOS-CX, Dell OS10, SONiC."],
          ["ERSPAN",   "Encapsulated Remote SPAN",                  "Port mirroring variant. Captured traffic is GRE-encapsulated and forwarded to any IP destination — enables remote analysis across L3 boundaries. Used for cloud-based or geographically distant packet analyzers."],
          ["IDF",      "Intermediate Distribution Frame",           "Wiring closet / network room at floor or zone level. Access switches reside here. Connected via backbone fiber to MDF. Horizontal cabling from IDF to workstations."],

          ["ISSU",     "In-Service Software Upgrade",               "NOS upgrade without traffic interruption. Requires redundant supervisors, NSF/SSO configured, supported upgrade path, and specific hardware architecture. Availability depends on platform and software version — verify vendor documentation."],
          ["MDF",      "Main Distribution Frame",                   "Central wiring closet / data center network core. Core and distribution switches reside here. Backbone connects MDF to IDF. Campus backbone: MDF-to-building fiber."],
          ["NBD",      "Next Business Day",                         "Hardware replacement SLA. Faulty component replaced next business day. Less stringent than 4-hour or same-day replacement. Appropriate for non-critical access layer switches with spare strategy in place."],
          ["NETCONF",  "Network Configuration Protocol",            "IETF (RFC 6241) protocol for network device configuration management. XML-based. Uses YANG data models. Enables transactional configuration changes with rollback. Used by automation tools (Ansible, Nornir)."],
          ["NOS",      "Network Operating System",                  "Switch operating system software. Examples: Cisco IOS-XE (enterprise), NX-OS (DC), Arista EOS, Juniper Junos, Aruba AOS-CX, Dell OS10, SONiC. Manages hardware abstraction, forwarding tables, protocols, and management."],
          ["NSF",      "Non-Stop Forwarding",                       "Feature allowing data plane to continue forwarding during control plane restart or supervisor failover. Required with SSO for ISSU. Prevents traffic loss during planned or unplanned supervisor switchover."],
          ["NTP",      "Network Time Protocol",                     "Standard protocol for clock synchronization. Mandatory on all network switches. Stratum hierarchy: 0 = atomic/GPS, 1 = directly connected, 2+ = cascaded. Wrong timestamps = forensic timeline impossible during incidents."],
          ["OOB",      "Out-of-Band",                               "Separate management network isolated from production traffic. Switch management IPs accessible via OOB even if production network is down. Mandatory for production environments. Typically: dedicated management VRF or physical management ports."],
          ["RSPAN",    "Remote SPAN",                               "Port mirroring across switches. Source port/VLAN on one switch; analyzer on another switch. Transported via special RSPAN VLAN. Predecessor to ERSPAN (which removes L2 boundary restriction)."],
          ["SCP",      "Secure Copy Protocol",                      "SSH-based file transfer. Used for switch configuration backup/restore and NOS image transfer. Encrypted and authenticated. Preferred over TFTP (unencrypted) for production environments."],
          ["SNMP",     "Simple Network Management Protocol",        "Industry-standard monitoring protocol. SNMPv3 required in production (authentication + encryption). v1/v2c: community string = cleartext password — avoid. Operations: GET, GETNEXT, GETBULK, SET, TRAP, INFORM."],
          ["SPAN",     "Switched Port Analyzer",                    "Port mirroring on same switch. Source (port or VLAN) traffic copied to destination port where analyzer (Wireshark, IDS) is connected. Ingress, egress, or both directions. Impact varies by platform."],
          ["SSO",      "Stateful Switchover",                       "Supervisor redundancy mode where standby supervisor maintains synchronized state. On failover: seamless takeover with minimal or no traffic disruption. Required with NSF for ISSU."],
          ["TFTP",     "Trivial File Transfer Protocol",            "Simple UDP-based file transfer. No authentication, no encryption. Acceptable for internal lab/management networks. Use SCP for production config backup — TFTP sends config in cleartext."],
        ]}
        caption=""
      />

      {/* Group G — Data Center Architecture */}
      <ComparisonTable
        title="Data Center Architecture"
        headers={["Abbreviation","Full Form","Meaning in Switch Context"]}
        rows={[
          ["DC",       "Data Center",                               "Facility housing compute, storage, and networking infrastructure. Switching architecture inside DC typically Spine-Leaf (modern) or Three-Tier (legacy campus-derived)."],
          ["EoR",      "End-of-Row",                               "Switch deployment model: one or few switches at end of each server row. Longer copper runs (often needs fiber). Larger blast radius on failure vs ToR. Legacy approach in modern DC."],
          ["MoR",      "Middle-of-Row",                            "Switch deployment model: one switch per row middle serving multiple racks. Intermediate between ToR and EoR. Less common — niche use cases."],
          ["NAS",      "Network Attached Storage",                  "File-level storage accessed over network (NFS, SMB/CIFS). Connects to standard Ethernet switch. Switch role: dedicated Storage VLAN, jumbo frames (9000 MTU end-to-end), QoS prioritization."],
          ["PXE",      "Preboot Execution Environment",            "Network boot protocol. Servers boot from network instead of local disk. Requires DHCP + TFTP on network. Switch role: untagged PXE VLAN on server ports during provisioning."],
          ["ToR",      "Top-of-Rack",                              "Switch mounted at top (or bottom) of server rack. Industry-standard DC deployment. Short copper patch cables (0.5–3m) to servers. Isolated failure domain (one rack). Uplinks via fiber to aggregation/spine layer."],
        ]}
        caption=""
      />

      {/* Group H — Protocols, Standards & RFCs */}
      <ComparisonTable
        title="Protocols, Standards aur RFCs"
        headers={["Abbreviation","Full Form","Meaning in Switch Context"]}
        rows={[
          ["802.1Qbb",  "IEEE 802.1Qbb",                            "Priority Flow Control (PFC) standard. Per-priority PAUSE frames. Component of DCB framework. Enables lossless per-class Ethernet in specifically engineered designs."],
          ["802.3af",   "IEEE 802.3af",                             "First PoE standard. PSE max: 15.4W, PD receives: 12.95W. Class 0–3. Suitable for IP phones and basic cameras."],
          ["802.3at",   "IEEE 802.3at (PoE+)",                     "Enhanced PoE standard. PSE max: 30W, PD receives: 25.5W. Class 4. Suitable for PTZ cameras, advanced APs, video phones."],
          ["802.3bt",   "IEEE 802.3bt (PoE++ / 4PPoE)",            "High-power PoE standard. Type 3: PSE 60W / PD 51W (Class 5–6). Type 4: PSE 90–100W / PD 71.3W (Class 7–8). Vendor trade names (UPoE, Hi-PoE, 4PPoE) vary — IEEE terminology is authoritative."],
          ["802.3bq",   "IEEE 802.3bq",                             "25GBASE-T and 40GBASE-T standard for copper (Cat8). Max reach 30m. Used for short DC copper interconnects."],
          ["iSCSI",     "Internet Small Computer System Interface", "Block storage protocol — SCSI over TCP/IP. Uses standard Ethernet switches. Switch requirements: dedicated Storage VLAN, jumbo frames (9000 MTU end-to-end), QoS prioritization. Optional: lossless design with PFC."],
          ["MTU",       "Maximum Transmission Unit",               "Maximum IP payload size per link — standard: 1500 bytes (L3 payload only). ≠ Ethernet frame size (1518/1522 bytes which includes L2 headers + FCS). Jumbo frames: 9000/9216 bytes — implementation-dependent, not IEEE universal standard."],
          ["NFS",       "Network File System",                      "File-sharing protocol (IETF RFC 7530). File-level access over Ethernet. Switch role: dedicated Storage VLAN, jumbo frames, QoS prioritization for large sequential I/O workloads."],
          ["OSI",       "Open Systems Interconnection",             "7-layer network reference model. L1=Physical, L2=Data Link (switch), L3=Network (L3 switch/router), L4=Transport, L5-7=Session/Presentation/Application. Troubleshooting starts at L1 and works upward."],
          ["RFC",       "Request for Comments",                     "IETF standards document series. Defines internet protocols. Examples relevant to this article: RFC 3768 (VRRPv2), RFC 5798 (VRRPv3), RFC 2865 (RADIUS), RFC 6241 (NETCONF)."],
          ["TCP",       "Transmission Control Protocol",            "Reliable connection-oriented transport protocol. TCP congestion control (CWND) responds to packet drops — relevant for QoS (WRED, tail-drop) and ECN behavior on switches."],
          ["TIA",       "Telecommunications Industry Association",  "Standards body. TIA-568 = structured cabling standard (horizontal/backbone cabling, connectors, distances). Reference for enterprise copper/fiber cabling infrastructure design."],
        ]}
        caption=""
      />

      {/* ══ RELATED TOPICS ══════════════════════════════════════════════════ */}
      <h2 style={{ ...S.h2, marginTop: "3rem" }}>Related Topics — Learning Path</h2>
      <ul style={S.ul}>
        <li><TopicLink slug="router" variant="inline" /> — Router fundamentals, BGP, OSPF — how switch inter-VLAN routing complements router functionality.</li>
        <li><TopicLink slug="firewall" variant="inline" /> — Network security — firewall placement in DC architecture between switch layers.</li>
        <li><TopicLink slug="server-basics" variant="inline" /> — Server hardware — NIC, dual-homing, LACP bonding — physical server to switch port.</li>
        <li><TopicLink slug="virtualization" variant="inline" /> — VMware, vSwitch, vMotion network, VXLAN overlays — hypervisor networking to physical switches.</li>
        <li><TopicLink slug="san" variant="inline" /> — SAN Storage — iSCSI/FCoE VLANs, jumbo frames, lossless QoS on switches.</li>
        <li><TopicLink slug="nas" variant="inline" /> — NAS Storage — NFS/SMB VLANs, jumbo frames, file storage network design.</li>
        <li><TopicLink slug="backup" variant="inline" /> — Backup infrastructure — dedicated backup VLAN, bandwidth planning on switches.</li>
        <li><TopicLink slug="disaster-recovery" variant="inline" /> — DR network architecture — switch configuration at DR site, replication network VLANs.</li>
      </ul>
    </>
  );
}
