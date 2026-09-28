import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Enterprise Network Switch — Complete Engineer Guide | Behind The Tech",
  description:
    "What is an enterprise network switch — MAC learning, CAM table, ASIC, VLAN, STP, RSTP, LACP, MLAG, Spine-Leaf, PoE, QoS, 802.1Q, inter-VLAN routing, fiber, transceivers, physical installation, troubleshooting and interview tips — the complete English Data Center engineer handbook.",
  keywords: [
    "enterprise network switch", "managed switch", "layer 2 switch", "layer 3 switch",
    "data center switch", "VLAN", "trunk port", "STP spanning tree", "RSTP", "MSTP",
    "LACP link aggregation", "MLAG", "spine leaf architecture", "ToR switch",
    "PoE power over ethernet", "QoS", "802.1Q", "inter-VLAN routing", "SVI",
    "switch hardware ASIC", "CAM table", "TCAM", "switch troubleshooting",
    "fiber optic transceiver SFP QSFP", "DAC AOC cable", "network switch hindi",
  ],
  openGraph: {
    title: "Enterprise Network Switch — Complete Engineer Guide",
    description: "MAC learning, VLAN, STP, LACP, MLAG, Spine-Leaf, PoE, QoS, transceivers, physical installation — complete switch handbook.",
    url: "https://behindthetech.in/learn/it/networking/switch",
    locale: "en_US",
    siteName: "Behind The Tech",
    type: "article",
    authors: ["Kumar Anil"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Enterprise Network Switch | Behind The Tech",
    description: "Complete switch guide — VLAN, STP, LACP, MLAG, Spine-Leaf, PoE, QoS, troubleshooting — beginner to engineer level.",
  },
  alternates: {
    canonical: "https://behindthetech.in/learn/it/networking/switch",
    languages: {
      en: "https://behindthetech.in/learn/it/networking/switch",
      hi: "https://behindthetech.in/hi/learn/it/networking/switch",
      "x-default": "https://behindthetech.in/learn/it/networking/switch",
    },
  },
};

export const faqs = [
  {
    q: "What is a network switch, and how is it different from a hub?",
    a: "A switch is an intelligent networking device that maintains a MAC address table (CAM table) and forwards frames only to the correct destination port. A hub was a dumb repeater — it flooded the signal arriving on any port out of all ports, shared the bandwidth, and all devices were in one collision domain. A switch creates an isolated collision domain per port, enables full-duplex operation and provides dedicated bandwidth. The hub is dead in the enterprise — every modern network uses switches.",
  },
  {
    q: "What is a VLAN, and why is it needed?",
    a: "A VLAN (Virtual Local Area Network) is a logical network segment that is independent of the physical infrastructure. It creates multiple isolated virtual networks on a single physical switch — each VLAN is its own broadcast domain. Benefits: security isolation (HR traffic does not reach Finance), broadcast containment (a storm in one VLAN does not affect another), and logical grouping. Inter-VLAN communication requires Layer 3 routing — a switch does not automatically forward between different VLANs at Layer 2.",
  },
  {
    q: "What does STP do, and why is it important?",
    a: "STP (Spanning Tree Protocol — IEEE 802.1D) prevents Layer 2 network loops. Ethernet frames have no equivalent of the IP TTL — in a loop, frames circulate infinitely, create a broadcast storm, and the network crashes. STP creates a spanning tree in the topology — it identifies redundant paths and blocks some ports, but can unblock them on failure. Modern enterprises use RSTP (Rapid STP — IEEE 802.1w) — sub-second to seconds convergence vs 30-50 seconds for STP.",
  },
  {
    q: "What is the difference between LACP and MLAG?",
    a: "LACP (Link Aggregation Control Protocol — IEEE 802.1AX) bundles multiple physical links into one logical link — combined bandwidth and redundancy. In standard LACP, all member ports must be connected to a single switch. MLAG (Multi-Chassis Link Aggregation) extends LACP — two physical switches behave as one logical LAG partner. This provides dual-switch redundancy — if one switch fails, the other seamlessly handles the traffic. Cisco Nexus calls it vPC, Arista calls it MLAG, and Juniper calls it MC-LAG.",
  },
  {
    q: "Why use Spine-Leaf architecture instead of the traditional three-tier?",
    a: "Three-tier (Access-Distribution-Core) is inefficient for East-West traffic. In modern data centers East-West traffic (server-to-server) is dominant — virtualization, microservices, storage replication. In Spine-Leaf, every leaf switch is connected to every spine — from server A to server B is always exactly 2 hops (Leaf → Spine → Leaf). ECMP uses all paths simultaneously — through deterministic hashing. Horizontal scaling is easy — just add a new leaf or spine. Predictable latency, no STP blocking, non-blocking ECMP fabric.",
  },
  {
    q: "What is PoE, and how do you plan the power budget?",
    a: "PoE (Power over Ethernet) delivers data and electrical power simultaneously over an Ethernet cable — one cable, two functions. IP phones, wireless APs, cameras, IoT devices — wherever there is no AC power outlet. Standards: IEEE 802.3af (15.4W), 802.3at/PoE+ (30W), 802.3bt Type 3 (60W), 802.3bt Type 4 (90-100W). Budget plan: list the power class of all PoE devices, sum them, and add 20% headroom. The switch's documented PoE budget must be greater than that total.",
  },
  {
    q: "An interface has gone err-disabled — what should you do?",
    a: "Err-disabled = the switch disabled the port due to a security violation. Common causes: BPDU Guard (a switch was connected to a PortFast port and a BPDU was received), Port Security (MAC address limit exceeded), Storm Control (broadcast/multicast threshold exceeded). Recovery: (1) Fix the root cause — remove the rogue switch, remove the unauthorized device. (2) Recover the port manually: shutdown followed by no shutdown. Or configure an errdisable recovery cause with a timer for automatic recovery — but do this carefully, fix the root cause first.",
  },
  {
    q: "How do you detect and fix an MTU mismatch?",
    a: "An MTU mismatch is a silent performance killer — the network works, but large transfers are very slow. Detection: ping with the 'do not fragment' flag and a large payload size (Linux: ping -M do -s 8972 target_ip). If you get a timeout or 'Frag needed' — there is an MTU mismatch in the path. Fix: configure a consistent MTU on every device in the path. For jumbo frames (9000 bytes): server NIC → ToR switch → aggregation → core → destination — configure them all together. One misconfigured device = path broken.",
  },
];

export const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: { "@type": "Answer", text: f.a },
  })),
};
