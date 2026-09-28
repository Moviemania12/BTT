import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Enterprise Firewall — Complete Data Center & Enterprise Guide | Behind The Tech",
  description:
    "What is an enterprise firewall — stateful inspection, session table, security zones, NAT, VPN, IPsec, IKEv2, NGFW, TLS inspection, HA, failover, troubleshooting, commissioning and design — the complete English Data Center engineer handbook.",
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
    locale: "en_US",
    siteName: "Behind The Tech",
    type: "article",
    authors: ["Kumar Anil"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Enterprise Firewall | Behind The Tech",
    description: "Complete firewall guide — stateful inspection, NAT, VPN, NGFW, HA, troubleshooting, design — beginner to engineer level.",
  },
  alternates: {
    canonical: "https://behindthetech.in/learn/it/networking/firewall",
    languages: {
      en: "https://behindthetech.in/learn/it/networking/firewall",
      hi: "https://behindthetech.in/hi/learn/it/networking/firewall",
      "x-default": "https://behindthetech.in/learn/it/networking/firewall",
    },
  },
};

export const faqs = [
  {
    q: "What is the fundamental difference between a firewall and a router?",
    a: "A router's primary job is to forward IP packets along the best path — security is not its primary concern. A firewall's primary job is to enforce security policy — which traffic is permitted and which is not. You can apply ACLs on a router, but ACLs are stateless — every packet is evaluated independently and there is no connection tracking. A stateful firewall tracks connection-related state — return traffic for established sessions is permitted automatically, without a separate reverse rule.",
  },
  {
    q: "What does stateful inspection mean — is it just remembering connections?",
    a: "No — stateful inspection is much more than 'remembering connections'. The firewall tracks protocol-level state: a full state machine for TCP (SYN → ESTABLISHED → FIN), a tuple-based pseudo-session with an idle timeout for UDP (no protocol state), and type/identifier-based tracking for ICMP. Depth varies by platform — TCP flag validation, sequence number checking and protocol anomaly detection all depend on the platform and configuration. 'Tracking state' is an oversimplification.",
  },
  {
    q: "What is the relationship between NAT and the firewall — is it one function or separate?",
    a: "NAT and the firewall are separate functions. NAT performs address translation — private IP → public IP. The firewall enforces security policy — permit/deny. DNAT alone does not permit traffic — a security policy is required separately. The order of NAT and policy processing is platform-specific: some platforms apply DNAT first (the policy matches on the post-NAT address), while others evaluate the policy first. This is the most common source of misconfiguration — testing is mandatory.",
  },
  {
    q: "Does session state survive a failover in firewall HA?",
    a: "Depends on: (1) whether session state was synchronized to peer before failure, (2) session type supported for synchronization, (3) failover timing — very recent sessions may not have completed sync, (4) asymmetric routing — return path must encounter firewall with compatible state, (5) application protocol behavior. Stateful failover reduces disruption for supported sessions — it does not guarantee zero disruption. Not all platforms synchronize all state types. Config sync and session sync are separate mechanisms — both are required.",
  },
  {
    q: "What are Phase 1 and Phase 2 in IKEv2?",
    a: "Phase 1/Phase 2 terminology does not exist in IKEv2 — those are IKEv1 terms. In IKEv2: the IKE_SA_INIT exchange performs algorithm selection and establishes DH keying material (peers not yet authenticated). The IKE_AUTH exchange authenticates the peers and establishes the first CHILD SA. IKE SA = protects IKE control traffic. CHILD SA = carries the actual IPsec-protected data traffic. EAP authentication may involve additional exchanges before CHILD SA creation.",
  },
  {
    q: "How does TLS decryption work on a firewall, and what are the risks?",
    a: "Outbound TLS inspection: the firewall works like a forward proxy — one TLS connection with the client and a separate TLS connection with the server. The client must trust the firewall's CA (enterprise certificate management via GPO/MDM). The firewall validates the server's certificate. Decrypted traffic is made available to the inspection engines (IPS, URL, file). Risks: privacy (personal banking and healthcare traffic gets decrypted), certificate pinning breaks applications, performance overhead is significant, and QUIC/HTTP3 inspection is complex. In TLS 1.3 the server Certificate message is encrypted — a passive observer cannot see it. ECH (RFC 9849) encrypts the SNI as well. Decryption policy should be selective.",
  },
  {
    q: "What is the difference between split tunnel and full tunnel — which one is secure?",
    a: "Full tunnel: enterprise-configured traffic goes through the VPN (enterprise inspection/policy applies). Split tunnel: only specified enterprise destinations use the VPN, while the remaining traffic goes via the client's local path. Split tunneling is not inherently insecure — security depends on endpoint controls, split-tunnel policy design, and what needs to be protected. Exceptions can be configured even in a full tunnel. Trade-offs: full tunnel = more enterprise visibility but higher VPN bandwidth; split tunnel = lower VPN bandwidth but internet traffic does not pass through the enterprise. It is an architecture decision, not a universal security rule.",
  },
  {
    q: "Is throughput alone enough for firewall sizing, or what else should be considered?",
    a: "Throughput alone is never sufficient for firewall sizing. Required dimensions: (1) Threat-inspection throughput — significantly lower than baseline when IPS, app-ID and URL filtering are enabled, (2) TLS decryption throughput — separate measurable limit, (3) VPN throughput — encrypted tunnel capacity may be separate, (4) Concurrent sessions — session table size, (5) New session rate (connections/second) — burst handling, (6) Traffic mix — small packet PPS vs large flow differ, (7) Enabled security services — each adds processing overhead, (8) HA failure scenario — surviving peer must handle 100% load. Datasheet figures are measured under specific test conditions — validate against your intended production feature set.",
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
