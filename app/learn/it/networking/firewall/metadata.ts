import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Enterprise Firewall — Complete Data Center & Enterprise Guide | Behind The Tech",
  description:
    "Enterprise Firewall kya hai — stateful inspection, session table, security zones, NAT, VPN, IPsec, IKEv2, NGFW, TLS inspection, HA, failover, troubleshooting, commissioning aur design — complete Hinglish Data Center engineer handbook.",
  keywords: [
    "enterprise firewall", "data center firewall", "stateful inspection", "firewall policy",
    "security zones", "NAT firewall", "PAT firewall", "DNAT", "SNAT", "IPsec VPN",
    "IKEv2", "site-to-site VPN", "remote access VPN", "NGFW", "next-generation firewall",
    "TLS inspection", "SSL inspection", "IPS intrusion prevention", "URL filtering",
    "firewall HA", "firewall high availability", "active passive firewall",
    "firewall troubleshooting", "packet capture firewall", "firewall commissioning",
    "firewall sizing", "firewall design", "DMZ architecture", "east west firewalling",
    "north south firewalling", "firewall hindi", "firewall interview questions",
  ],
  openGraph: {
    title: "Enterprise Firewall — Complete Data Center & Enterprise Guide",
    description: "Stateful inspection, session table, zones, NAT, VPN, IPsec, IKEv2, NGFW, TLS inspection, HA, failover, troubleshooting, design — complete firewall handbook.",
    url: "https://behindthetech.in/learn/it/networking/firewall",
    siteName: "Behind The Tech",
    type: "article",
    authors: ["Kumar Anil"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Enterprise Firewall | Behind The Tech",
    description: "Complete firewall guide — stateful inspection, NAT, VPN, NGFW, HA, troubleshooting, design — beginner to engineer level.",
  },
  alternates: { canonical: "https://behindthetech.in/learn/it/networking/firewall" },
};

export const faqs = [
  {
    q: "Firewall aur Router mein fundamental difference kya hai?",
    a: "Router ka primary job hai IP packets ko best path pe forward karna — security uska primary concern nahi hai. Firewall ka primary job hai security policy enforce karna — kaun sa traffic permitted hai aur kaun sa nahi. Router pe ACL laga sakte hain lekin ACL stateless hai — har packet independently evaluate hota hai, connection tracking nahi hota. Stateful firewall connection-related state track karta hai — return traffic automatically permitted hoti hai established sessions ke liye bina separate reverse rule ke.",
  },
  {
    q: "Stateful inspection ka matlab kya hai — sirf connections yaad rakhna hai?",
    a: "Nahi — stateful inspection sirf 'connections yaad rakhna' se bahut zyada hai. Firewall protocol-level state track karta hai: TCP ke liye full state machine (SYN → ESTABLISHED → FIN), UDP ke liye tuple-based pseudo-session with idle timeout (no protocol state), ICMP ke liye type/identifier based tracking. Depth varies by platform — TCP flag validation, sequence number checking, protocol anomaly detection — yeh sab platform aur configuration dependent hai. 'State track karna' ek oversimplification hai.",
  },
  {
    q: "NAT aur Firewall ka kya relationship hai — ek kaam hai ya alag?",
    a: "NAT aur firewall separate functions hain. NAT address translation karta hai — private IP → public IP. Firewall security policy enforce karta hai — permit/deny. DNAT alone traffic permit nahi karta — security policy separately required hai. NAT aur policy processing order platform-specific hai: kuch platforms DNAT pehle apply karte hain (policy post-NAT address pe match karti hai), kuch policy pehle evaluate karte hain. Yeh most common misconfiguration source hai — testing mandatory hai.",
  },
  {
    q: "Firewall HA mein session state survive karta hai failover ke baad?",
    a: "Depends on: (1) whether session state was synchronized to peer before failure, (2) session type supported for synchronization, (3) failover timing — very recent sessions may not have completed sync, (4) asymmetric routing — return path must encounter firewall with compatible state, (5) application protocol behavior. Stateful failover reduces disruption for supported sessions — it does not guarantee zero disruption. Not all platforms synchronize all state types. Config sync aur session sync alag mechanisms hain — dono zaroori hain.",
  },
  {
    q: "IKEv2 mein Phase 1 aur Phase 2 kya hota hai?",
    a: "IKEv2 mein Phase 1/Phase 2 terminology exist nahi karti — yeh IKEv1 ke terms hain. IKEv2 mein: IKE_SA_INIT exchange algorithm selection aur DH keying material establish karta hai (peers not yet authenticated). IKE_AUTH exchange peers authenticate karta hai aur first CHILD SA establish karta hai. IKE SA = IKE control traffic protect karta hai. CHILD SA = actual IPsec protected data traffic carry karta hai. EAP authentication ke liye additional exchanges ho sakte hain before CHILD SA creation.",
  },
  {
    q: "TLS decryption firewall pe kaise kaam karta hai aur kya risks hain?",
    a: "Outbound TLS inspection: firewall forward-proxy ki tarah kaam karta hai — client se ek TLS connection, server se alag TLS connection. Client ko firewall ki CA trust karni padti hai (enterprise certificate management via GPO/MDM). Server ka certificate firewall validate karta hai. Decrypted traffic inspection engines (IPS, URL, file) ko available hoti hai. Risks: privacy (personal banking, healthcare decrypt hota hai), certificate pinning breaks applications, performance overhead significant hai, QUIC/HTTP3 inspection complex hai. TLS 1.3 mein server Certificate message encrypted hoti hai — passive observer nahi dekh sakta. ECH (RFC 9849) SNI bhi encrypt karta hai. Decryption policy selective honi chahiye.",
  },
  {
    q: "Split tunnel aur full tunnel mein kya difference hai — kaunsa secure hai?",
    a: "Full tunnel: enterprise-configured traffic VPN se jaata hai (enterprise inspection/policy apply hoti hai). Split tunnel: sirf specified enterprise destinations VPN use karte hain, baaki traffic client ke local path se jaata hai. Split tunneling inherently insecure nahi hai — security depends on endpoint controls, split-tunnel policy design, aur kya protect karna hai. Full tunnel mein bhi exceptions configured ho sakte hain. Trade-offs: full tunnel = more enterprise visibility but higher VPN bandwidth; split tunnel = lower VPN bandwidth but internet traffic enterprise se nahi guzarta. Architecture decision hai, not a universal security rule.",
  },
  {
    q: "Firewall sizing mein sirf throughput kafi hai ya aur kya dekhna chahiye?",
    a: "Throughput alone is never sufficient for firewall sizing. Required dimensions: (1) Threat-inspection throughput — IPS, app-ID, URL filtering enabled pe significantly lower than baseline, (2) TLS decryption throughput — separate measurable limit, (3) VPN throughput — encrypted tunnel capacity may be separate, (4) Concurrent sessions — session table size, (5) New session rate (connections/second) — burst handling, (6) Traffic mix — small packet PPS vs large flow differ, (7) Enabled security services — each adds processing overhead, (8) HA failure scenario — surviving peer must handle 100% load. Datasheet figures are measured under specific test conditions — validate against your intended production feature set.",
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
