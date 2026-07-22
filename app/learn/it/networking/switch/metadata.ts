import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Enterprise Network Switch — Complete Engineer Guide | Behind The Tech",
  description:
    "Enterprise Network Switch kya hai — MAC learning, CAM table, ASIC, VLAN, STP, RSTP, LACP, MLAG, Spine-Leaf, PoE, QoS, 802.1Q, inter-VLAN routing, fiber, transceivers, physical installation, troubleshooting aur interview tips — complete Hinglish Data Center engineer handbook.",
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
    siteName: "Behind The Tech",
    type: "article",
    authors: ["Kumar Anil"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Enterprise Network Switch | Behind The Tech",
    description: "Complete switch guide — VLAN, STP, LACP, MLAG, Spine-Leaf, PoE, QoS, troubleshooting — beginner to engineer level.",
  },
  alternates: { canonical: "https://behindthetech.in/learn/it/networking/switch" },
};

export const faqs = [
  {
    q: "Network Switch kya hai aur Hub se kaise alag hai?",
    a: "Switch ek intelligent networking device hai jo MAC address table (CAM table) maintain karta hai aur frames sirf correct destination port pe forward karta hai. Hub ek dumb repeater tha — har port pe aaya signal sab ports pe flood karta tha, bandwidth share karta tha, aur sab devices ek collision domain mein the. Switch per-port isolated collision domain create karta hai, full-duplex operation enable karta hai, aur dedicated bandwidth provide karta hai. Hub enterprise mein dead hai — har modern network switch use karta hai.",
  },
  {
    q: "VLAN kya hai aur kyun zaroori hai?",
    a: "VLAN (Virtual Local Area Network) ek logical network segment hai jo physical infrastructure se independent hota hai. Ek hi physical switch pe multiple isolated virtual networks banata hai — har VLAN apna broadcast domain. Benefits: security isolation (HR traffic Finance tak nahi pahunchta), broadcast containment (ek VLAN ki storm doosre ko affect nahi karti), aur logical grouping. Inter-VLAN communication ke liye Layer 3 routing zaroori hai — switch Layer 2 pe different VLANs ke beech automatically forward nahi karta.",
  },
  {
    q: "STP kya karta hai aur kyun important hai?",
    a: "STP (Spanning Tree Protocol — IEEE 802.1D) Layer 2 network loops prevent karta hai. Ethernet frames mein IP ka TTL equivalent nahi hota — loop mein frames infinitely circulate karte hain, broadcast storm create karte hain, aur network crash hota hai. STP topology mein spanning tree create karta hai — redundant paths identify karta hai, kuch ports block karta hai, lekin fail hone pe unblock kar sakta hai. Modern enterprise mein RSTP (Rapid STP — IEEE 802.1w) use hota hai — sub-second to seconds convergence vs STP ka 30-50 seconds.",
  },
  {
    q: "LACP aur MLAG mein kya difference hai?",
    a: "LACP (Link Aggregation Control Protocol — IEEE 802.1AX) multiple physical links ko ek logical link mein bundle karta hai — combined bandwidth aur redundancy. Standard LACP mein sab member ports ek hi switch pe connected hone chahiye. MLAG (Multi-Chassis Link Aggregation) LACP ko extend karta hai — do physical switches ek logical LAG partner ki tarah behave karte hain. Isse dual-switch redundancy milti hai — ek switch fail ho, doosra seamlessly traffic handle karta hai. Cisco Nexus mein isse vPC kehte hain, Arista mein MLAG, Juniper mein MC-LAG.",
  },
  {
    q: "Spine-Leaf architecture kyun use karte hain traditional three-tier ki jagah?",
    a: "Three-tier (Access-Distribution-Core) East-West traffic ke liye inefficient hai. Modern data centers mein East-West traffic (server-to-server) dominant hai — virtualization, microservices, storage replication. Spine-Leaf mein har leaf switch har spine se connected hota hai — server A se server B tak hamesha exactly 2 hops (Leaf → Spine → Leaf). ECMP sab paths simultaneously use karta hai — deterministic hashing se. Horizontal scaling easy hai — naya leaf ya spine add karo. Predictable latency, no STP blocking, non-blocking ECMP fabric.",
  },
  {
    q: "PoE kya hai aur power budget kaise plan karein?",
    a: "PoE (Power over Ethernet) Ethernet cable ke through data aur electrical power simultaneously deliver karta hai — ek cable, do functions. IP phones, wireless APs, cameras, IoT devices — jahan AC power outlet nahi hota. Standards: IEEE 802.3af (15.4W), 802.3at/PoE+ (30W), 802.3bt Type 3 (60W), 802.3bt Type 4 (90-100W). Budget plan: sab PoE devices ki power class list karo, sum karo, 20% headroom add karo. Switch ka documented PoE budget us total se zyada hona chahiye.",
  },
  {
    q: "Interface err-disabled ho gayi — kya karein?",
    a: "Err-disabled = switch ne security violation pe port disable kiya. Common causes: BPDU Guard (PortFast port pe switch connect hua, BPDU receive hua), Port Security (MAC address limit exceed hua), Storm Control (broadcast/multicast threshold exceed). Recovery: (1) Root cause fix karo — rogue switch remove karo, unauthorized device remove karo. (2) Port manually recover karo: shutdown followed by no shutdown. Ya errdisable recovery cause configure karo with timer for automatic recovery — lekin yeh carefully karo, root cause fix pehle.",
  },
  {
    q: "MTU mismatch kaise detect karein aur fix karein?",
    a: "MTU mismatch ek silent performance killer hai — network kaam karta hai lekin large transfers bahut slow. Detection: ping with 'do not fragment' flag aur large payload size (Linux: ping -M do -s 8972 target_ip). Agar timeout ya 'Frag needed' aaye — path mein MTU mismatch hai. Fix: path ke har device pe MTU consistent configure karo. Jumbo frames (9000 bytes) ke liye: server NIC → ToR switch → aggregation → core → destination — sab ek saath configure karo. Ek misconfigured device = path broken.",
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
