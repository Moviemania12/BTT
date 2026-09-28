import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Load Balancer — Complete Data Center & Enterprise Guide | Behind The Tech",
  description:
    "What is a Load Balancer — VIP, backend pools, health monitoring, algorithms, persistence, L7 content switching, TLS offload, GSLB, HA, troubleshooting and data center integration — complete English Data Center engineer handbook.",
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
    locale: "en_US",
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
  alternates: {
    canonical: "https://behindthetech.in/learn/it/networking/load-balancer",
    languages: {
      en: "https://behindthetech.in/learn/it/networking/load-balancer",
      hi: "https://behindthetech.in/hi/learn/it/networking/load-balancer",
      "x-default": "https://behindthetech.in/learn/it/networking/load-balancer",
    },
  },
};

export const faqs = [
  {
    q: "What is a Load Balancer and why is it used?",
    a: "A Load Balancer is a device or software that distributes incoming service traffic across multiple backend servers. It is used so that no single server gets overloaded, an individual server failure does not become a service-level failure, and the application can scale independently. The client connects to a single address (VIP) — the backend complexity stays hidden.",
  },
  {
    q: "What is a VIP in a Load Balancer?",
    a: "A VIP (Virtual IP) is the address that clients connect to. It is not the address of any single physical server — it is a virtual service address configured on the Load Balancer. DNS points the domain to the VIP. Clients connect to the VIP, and the Load Balancer selects an eligible server from the backend pool and forwards the traffic. VIP implementation depends on the platform and deployment architecture — it can be an interface address, a software construct, a cloud-managed frontend, or an anycast address.",
  },
  {
    q: "What is the difference between a Load Balancer and a Firewall?",
    a: "A Firewall's primary job is to enforce security policy — which traffic is allowed and which is not. A Load Balancer's primary job is to distribute service traffic across available backend servers. Both coexist in the same network and serve different functions. Some modern platforms include both capabilities, but these are functionally separate concerns.",
  },
  {
    q: "Why is a health check necessary in a Load Balancer?",
    a: "Without a health check, the Load Balancer will keep sending traffic even to failed or unhealthy servers. A health check periodically verifies whether the backend server can actually serve traffic. A TCP check tells you the port is open; an HTTP check tells you the server is responding; an application-aware check tells you the application is working correctly. A single failed probe does not make a backend ineligible — a fall threshold (consecutive failures) is required.",
  },
  {
    q: "What does the Round Robin load balancing algorithm guarantee?",
    a: "Round Robin only distributes scheduling units (connections or requests — dependent on proxy mode and protocol) sequentially. It does not guarantee equal load. If one server's requests take longer (slow queries, long uploads), that server can become more loaded than the rest. Server capacity differences also have an effect. Algorithm selection should depend on the use case.",
  },
  {
    q: "What is the difference between L4 and L7 load balancing?",
    a: "L4 load balancing is based on transport-layer information — IP address, port, protocol. It does not look at content. L7 load balancing is based on application-layer content — HTTP headers, URL path, Host header, cookies. L7 enables content-based routing (e.g., /api/* to a separate pool, /images/* to a separate pool). For HTTPS, TLS termination is required for HTTP-layer routing; TLS metadata (SNI) routing is different — it is possible even without decryption. Many products support both modes.",
  },
  {
    q: "Can a Load Balancer fail?",
    a: "Yes. A Load Balancer can fail due to hardware failure, software crash, configuration error, or capacity exhaustion. That is why Load Balancers are also deployed in an HA pair — one active, one standby. If the active fails, the standby assumes service responsibility — the mechanism (address mobility, routing update, or a platform-specific method) depends on the platform/deployment. Session continuity on failover depends on the platform and session synchronization support.",
  },
  {
    q: "What is the difference between DNS load balancing and a Load Balancer?",
    a: "Standard DNS multi-A-record distribution without health integration does not know real-time backend health, and the client caches according to the DNS TTL. An inline Load Balancer actively monitors backends, distributes per connection, and bypasses a failed backend after the detection window. GSLB (Global Server Load Balancing) combines DNS-based distribution with health monitoring — more capable than simple multi-record DNS. DNS failover timing does not depend only on TTL — resolver caching, client caching, and connection reuse also have an effect.",
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
