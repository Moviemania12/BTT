import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Enterprise Router — Complete Data Center & Enterprise Guide | Behind The Tech",
  description:
    "Enterprise Router kya hai — packet forwarding, RIB, FIB, LPM, OSPF, BGP, IS-IS, VRF, MPLS, NAT, IPsec, GRE, FHRP, VRRP, BFD, QoS, dual-ISP architecture, DC border router, commissioning, troubleshooting aur interview tips — complete Hinglish Data Center engineer handbook.",
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
    siteName: "Behind The Tech",
    type: "article",
    authors: ["Kumar Anil"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Enterprise Router | Behind The Tech",
    description: "Complete router guide — BGP, OSPF, VRF, MPLS, NAT, IPsec, VRRP, BFD, troubleshooting — beginner to engineer level.",
  },
  alternates: { canonical: "https://behindthetech.in/learn/it/networking/router" },
};

export const faqs = [
  {
    q: "Router aur Switch mein fundamental difference kya hai?",
    a: "Switch MAC addresses ke basis pe same L2 segment mein frames forward karta hai. Router IP addresses ke basis pe different IP networks ke beech packets forward karta hai. Router har hop pe Layer 2 header strip karta hai aur new L2 header likhta hai — IP packet end-to-end unchanged rehta hai (sirf TTL/Hop Limit decremented). Switch L2 header modify nahi karta normally.",
  },
  {
    q: "Routing Table aur Forwarding Table (FIB) mein kya difference hai?",
    a: "Routing Table (RIB — Routing Information Base) control plane ka database hai. All learned routes with full detail — source protocol, metric, AD/preference, next-hop stored hote hain. FIB (Forwarding Information Base) data plane ka forwarding table hai — RIB se derived, only active/selected routes, next-hop resolved, fast lookup ke liye optimized. FIB ka implementation platform-dependent hai — hardware TCAM, software, ya hybrid. Packets FIB se forward hote hain, RIB se nahi.",
  },
  {
    q: "BGP session Active state mein kyun stuck hai?",
    a: "Active state matlab TCP 179 connection fail ho raha hai. Check karo: (1) peer IP tak route hai? (2) ACL TCP 179 block kar raha hai? (3) MD5 authentication key match karta hai? (4) iBGP loopback peering ke liye update-source configured hai? (5) ASN correct hai? Systematic approach: pehle TCP reachability verify karo, phir BGP configuration.",
  },
  {
    q: "OSPF neighbor Full state mein kyun nahi aata?",
    a: "Most common causes: (1) Hello/Dead timer mismatch — both sides identical hone chahiye. (2) Area ID mismatch. (3) Authentication type ya key mismatch. (4) Network type mismatch (broadcast vs point-to-point). (5) MTU mismatch — DBD exchange ExStart/Exchange mein fail hota hai. (6) ACL blocking OSPF multicast 224.0.0.5/224.0.0.6 (OSPFv2). Systematic: timers check, area check, auth check, network type check, MTU check, then packet capture.",
  },
  {
    q: "ECMP kaise kaam karta hai aur traffic kaise distribute hoti hai?",
    a: "ECMP multiple equal-cost paths to same destination simultaneously install karta hai. Traffic distribution per-flow hashing se hoti hai — NOT round-robin per packet. Hash inputs (src IP, dst IP, src port, dst port, protocol — platform dependent) se ek flow hamesha same path use karta hai — in-order delivery ensure hoti hai. Max ECMP paths aur hash algorithm: platform/configuration dependent. Single large TCP flow ECMP se bandwidth aggregate nahi kar sakta — sirf ek path use hoti hai.",
  },
  {
    q: "NAT aur PAT mein kya difference hai?",
    a: "NAT (Network Address Translation) IP addresses translate karta hai — ek private IP ko ek public IP pe map karta hai. PAT (Port Address Translation / NAT Overload) multiple private hosts ko ek public IP share karne deta hai — source port numbers se differentiate karta hai. Enterprise internet pe mostly PAT use hota hai — ek public IP pe thousands of internal connections. NAT security mechanism nahi hai — sirf address translation karta hai.",
  },
  {
    q: "VRF kya hai aur VLAN se kaise alag hai?",
    a: "VRF (Virtual Routing and Forwarding) Layer 3 routing isolation provide karta hai — separate RIB, FIB, aur ARP table per VRF. Same IP prefix multiple VRFs mein bina conflict ke exist kar sakta hai. VLAN Layer 2 segmentation hai — separate broadcast domain. VRF ≠ VLAN: VRF routing isolation, VLAN frame isolation. Complementary lekin different layers pe operate karte hain.",
  },
  {
    q: "RPKI ROV kya karta hai aur BGP routing security mein kya role hai?",
    a: "RPKI (Resource Public Key Infrastructure) + ROV (Route Origin Validation) BGP routes ka origin AS cryptographically validate karta hai. ROA (Route Origin Authorization) mein IP prefix holder sign karta hai ki kaun sa AS us prefix ko originate kar sakta hai. ROV routes ko Valid, Invalid, ya NotFound classify karta hai. Invalid routes ko reject ya de-preference karna ek common defensive policy hai — lekin yeh operator ka routing-policy decision hai, RFC-mandated automatic behavior nahi. RPKI sirf origin AS validate karta hai — full AS_PATH validation ke liye BGPsec chahiye (widely deployed nahi).",
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
