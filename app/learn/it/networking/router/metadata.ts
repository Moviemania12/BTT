import type { Metadata } from "next";
import { SITE_OG_IMAGE } from "@/lib/schemas";

export const metadata: Metadata = {
  title: "Enterprise Router — Complete Data Center & Enterprise Guide | Behind The Tech",
  description:
    "What is an enterprise router — packet forwarding, RIB, FIB, LPM, OSPF, BGP, IS-IS, VRF, MPLS, NAT, IPsec, GRE, FHRP, VRRP, BFD, QoS, dual-ISP architecture, DC border router, commissioning, troubleshooting and interview tips — the complete English Data Center engineer handbook.",
  keywords: [
    "enterprise router", "data center router", "routing table", "RIB FIB", "BGP routing",
    "OSPF routing", "IS-IS routing", "packet forwarding", "LPM longest prefix match",
    "VRF virtual routing", "MPLS L3VPN", "NAT PAT", "IPsec VPN", "GRE tunnel",
    "VRRP HSRP FHRP", "BFD detection", "dual ISP architecture", "DC border router",
    "router commissioning", "router troubleshooting", "BGP path selection",
    "route redistribution", "ECMP load sharing", "router security", "RPKI ROV",
    "network router hindi", "router interview questions", "router commissioning checklist",
  ],
  openGraph: {
    title: "Enterprise Router — Complete Data Center & Enterprise Guide",
    description: "Packet forwarding, RIB/FIB, OSPF, BGP, VRF, MPLS, NAT, IPsec, VRRP, BFD, dual-ISP, DC border router — complete router handbook.",
    url: "https://behindthetech.in/learn/it/networking/router",
    locale: "en_US",
    siteName: "Behind The Tech",
    type: "article",
    authors: ["Kumar Anil"], images: [SITE_OG_IMAGE],
  },
  twitter: {
    card: "summary_large_image",
    title: "Enterprise Router | Behind The Tech",
    description: "Complete router guide — BGP, OSPF, VRF, MPLS, NAT, IPsec, VRRP, BFD, troubleshooting — beginner to engineer level.", images: [SITE_OG_IMAGE.url],
  },
  alternates: {
    canonical: "https://behindthetech.in/learn/it/networking/router",
    languages: {
      en: "https://behindthetech.in/learn/it/networking/router",
      hi: "https://behindthetech.in/hi/learn/it/networking/router",
      "x-default": "https://behindthetech.in/learn/it/networking/router",
    },
  },
};

export const faqs = [
  {
    q: "What is the fundamental difference between a router and a switch?",
    a: "A switch forwards frames within the same L2 segment based on MAC addresses. A router forwards packets between different IP networks based on IP addresses. At every hop the router strips the Layer 2 header and writes a new L2 header — the IP packet remains unchanged end-to-end (only TTL/Hop Limit is decremented). A switch normally does not modify the L2 header.",
  },
  {
    q: "What is the difference between the Routing Table and the Forwarding Table (FIB)?",
    a: "The Routing Table (RIB — Routing Information Base) is the control plane's database. All learned routes are stored with full detail — source protocol, metric, AD/preference, next-hop. The FIB (Forwarding Information Base) is the data plane's forwarding table — derived from the RIB, containing only active/selected routes, with next-hops resolved, optimized for fast lookup. FIB implementation is platform-dependent — hardware TCAM, software, or hybrid. Packets are forwarded from the FIB, not the RIB.",
  },
  {
    q: "Why is a BGP session stuck in the Active state?",
    a: "The Active state means the TCP 179 connection is failing. Check: (1) Is there a route to the peer IP? (2) Is an ACL blocking TCP 179? (3) Does the MD5 authentication key match? (4) Is update-source configured for iBGP loopback peering? (5) Is the ASN correct? Systematic approach: first verify TCP reachability, then the BGP configuration.",
  },
  {
    q: "Why does an OSPF neighbor not reach the Full state?",
    a: "Most common causes: (1) Hello/Dead timer mismatch — both sides must be identical. (2) Area ID mismatch. (3) Authentication type or key mismatch. (4) Network type mismatch (broadcast vs point-to-point). (5) MTU mismatch — the DBD exchange fails in ExStart/Exchange. (6) ACL blocking OSPF multicast 224.0.0.5/224.0.0.6 (OSPFv2). Systematic: timers check, area check, auth check, network type check, MTU check, then packet capture.",
  },
  {
    q: "How does ECMP work, and how is traffic distributed?",
    a: "ECMP installs multiple equal-cost paths to the same destination simultaneously. Traffic is distributed by per-flow hashing — NOT round-robin per packet. Based on the hash inputs (src IP, dst IP, src port, dst port, protocol — platform dependent), a flow always uses the same path — ensuring in-order delivery. Max ECMP paths and hash algorithm: platform/configuration dependent. A single large TCP flow cannot aggregate bandwidth through ECMP — it uses only one path.",
  },
  {
    q: "What is the difference between NAT and PAT?",
    a: "NAT (Network Address Translation) translates IP addresses — it maps one private IP to one public IP. PAT (Port Address Translation / NAT Overload) lets multiple private hosts share one public IP — differentiating them by source port numbers. Enterprise internet access mostly uses PAT — thousands of internal connections on one public IP. NAT is not a security mechanism — it only performs address translation.",
  },
  {
    q: "What is a VRF, and how is it different from a VLAN?",
    a: "VRF (Virtual Routing and Forwarding) provides Layer 3 routing isolation — a separate RIB, FIB and ARP table per VRF. The same IP prefix can exist in multiple VRFs without conflict. A VLAN is Layer 2 segmentation — a separate broadcast domain. VRF ≠ VLAN: VRF is routing isolation, VLAN is frame isolation. They are complementary but operate at different layers.",
  },
  {
    q: "What does RPKI ROV do, and what is its role in BGP routing security?",
    a: "RPKI (Resource Public Key Infrastructure) + ROV (Route Origin Validation) cryptographically validates the origin AS of BGP routes. In a ROA (Route Origin Authorization), the IP prefix holder signs which AS is allowed to originate that prefix. ROV classifies routes as Valid, Invalid or NotFound. Rejecting or de-preferring Invalid routes is a common defensive policy — but this is the operator's routing-policy decision, not RFC-mandated automatic behavior. RPKI validates only the origin AS — full AS_PATH validation requires BGPsec (not widely deployed).",
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
