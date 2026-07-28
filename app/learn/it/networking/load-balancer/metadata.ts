import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Load Balancer — Complete Data Center & Enterprise Guide | Behind The Tech",
  description:
    "Load Balancer kya hai — VIP, backend pools, health monitoring, algorithms, persistence, L7 content switching, TLS offload, GSLB, HA, troubleshooting aur data center integration — complete Hinglish Data Center engineer handbook.",
  keywords: [
    "load balancer", "data center load balancer", "VIP virtual IP", "backend pool",
    "health monitoring load balancer", "round robin algorithm", "least connections",
    "load balancer persistence", "cookie persistence", "source IP persistence",
    "L7 load balancing", "L4 load balancing", "load balancer HA", "GSLB",
    "global server load balancing", "TLS offload load balancer", "load balancer NAT",
    "SNAT load balancer", "direct server return DSR", "load balancer troubleshooting",
    "ADC application delivery controller", "load balancer hindi",
    "load balancer interview questions", "load balancer data center",
    "HTTP/2 load balancing", "load balancer certificate", "load balancer failover",
  ],
  openGraph: {
    title: "Load Balancer — Complete Data Center & Enterprise Guide",
    description:
      "VIP, backend pools, health monitoring, algorithms, persistence, L7 routing, TLS offload, GSLB, HA, troubleshooting — complete load balancer handbook.",
    url: "https://behindthetech.in/learn/it/networking/load-balancer",
    siteName: "Behind The Tech",
    type: "article",
    authors: ["Kumar Anil"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Load Balancer | Behind The Tech",
    description:
      "Complete load balancer guide — VIP, health checks, algorithms, persistence, TLS, GSLB, HA, troubleshooting — beginner to engineer level.",
  },
  alternates: { canonical: "https://behindthetech.in/learn/it/networking/load-balancer" },
};

export const faqs = [
  {
    q: "Load Balancer kya hota hai aur kyun use karte hain?",
    a: "Load Balancer ek device ya software hai jo incoming service traffic ko multiple backend servers ke beech distribute karta hai. Isko isliye use karte hain taaki koi ek server overloaded na ho, individual server failure service-level failure na bane, aur application independently scale kar sake. Client ek single address (VIP) se connect karta hai — backend complexity hide rehti hai.",
  },
  {
    q: "VIP kya hota hai Load Balancer mein?",
    a: "VIP (Virtual IP) woh address hai jis pe clients connect karte hain. Yeh kisi ek physical server ka address nahi hota — Load Balancer pe configured ek virtual service address hota hai. DNS domain ko VIP pe point karta hai. Clients VIP se connect karte hain, Load Balancer backend pool mein se ek eligible server select karke traffic forward karta hai. VIP ka implementation platform aur deployment architecture pe depend karta hai — interface address, software construct, cloud-managed frontend, ya anycast address ho sakta hai.",
  },
  {
    q: "Load Balancer aur Firewall mein kya farq hai?",
    a: "Firewall ka primary kaam security policy enforce karna hai — kaun sa traffic allowed hai aur kaun sa nahi. Load Balancer ka primary kaam service traffic ko available backend servers ke beech distribute karna hai. Dono ek hi network mein coexist karte hain aur alag functions serve karte hain. Kuch modern platforms dono capabilities include karte hain, lekin ye functionally alag concerns hain.",
  },
  {
    q: "Health check kyun zaroori hai Load Balancer mein?",
    a: "Without health check, Load Balancer failed ya unhealthy servers pe bhi traffic bhejta rahega. Health check periodically verify karta hai ki backend server actually traffic serve kar sakta hai ya nahi. TCP check se pata chalta hai port open hai; HTTP check se pata chalta hai server respond kar raha hai; application-aware check se pata chalta hai application correctly kaam kar rahi hai. Ek failed probe se backend ineligible nahi hota — fall threshold (consecutive failures) required hota hai.",
  },
  {
    q: "Round Robin load balancing algorithm kya guarantee karta hai?",
    a: "Round Robin sirf scheduling units (connection ya request — proxy mode aur protocol pe dependent) sequentially distribute karta hai. Yeh equal load guarantee nahi karta. Agar ek server ki requests zyada time lein (slow queries, long uploads), woh server bakiyon se zyada loaded ho sakta hai. Server capacity differences bhi affect karti hain. Algorithm selection use case pe depend karna chahiye.",
  },
  {
    q: "L4 aur L7 load balancing mein kya difference hai?",
    a: "L4 load balancing transport-layer information pe based hai — IP address, port, protocol. Content nahi dekhta. L7 load balancing application-layer content pe based hai — HTTP headers, URL path, Host header, cookies. L7 content-based routing enable karta hai (e.g., /api/* alag pool, /images/* alag pool). HTTPS ke liye HTTP-layer routing ke liye TLS termination zaroori hai; TLS metadata (SNI) routing alag hai — decryption ke bina bhi possible hai. Many products dono modes support karte hain.",
  },
  {
    q: "Load Balancer fail ho sakta hai kya?",
    a: "Haan. Load Balancer hardware failure, software crash, configuration error, ya capacity exhaustion se fail ho sakta hai. Isliye Load Balancers bhi HA pair mein deploy kiye jaate hain — ek active, ek standby. Active fail ho toh standby service responsibility assume karta hai — mechanism (address mobility, routing update, ya platform-specific method) platform/deployment pe depend karta hai. Session continuity failover pe platform aur session synchronization support pe depend karti hai.",
  },
  {
    q: "DNS load balancing aur Load Balancer mein kya farq hai?",
    a: "Standard DNS multi-A-record distribution bina health integration ke real-time backend health nahi jaanta, aur client DNS TTL se cache karta hai. Inline Load Balancer actively backends monitor karta hai, per-connection distribution karta hai, aur failed backend ko detection window ke baad bypass karta hai. GSLB (Global Server Load Balancing) DNS-based distribution ke saath health monitoring combine karta hai — simple multi-record DNS se zyada capable. DNS failover timing sirf TTL pe nahi — resolver caching, client caching, aur connection reuse bhi affect karte hain.",
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
