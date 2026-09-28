"use client";
// Load Balancer — Complete Content (Phases 1-5)
// All corrections applied: P1-C1..C20, PC1..PC25, P3-C1..C40, P4-C1..C12, P5-C1..C20, FA-C1..FA-C5
import { Callout, ComparisonTable, Figure, CodeBlock, S } from "../shared";
import TopicLink from "@/components/TopicLink";
import { faqs } from "../metadata";
import LbTrafficJourney from "../svg/LbTrafficJourney";
import VipPoolMapping from "../svg/VipPoolMapping";
import HealthCheckFlow from "../svg/HealthCheckFlow";
import L4VsL7Lb from "../svg/L4VsL7Lb";
import LbPlacementModels from "../svg/LbPlacementModels";
import LbHaPair from "../svg/LbHaPair";
import DcLbPlacement from "../svg/DcLbPlacement";
import FullProxyModel from "../svg/FullProxyModel";
import PacketAddressJourney from "../svg/PacketAddressJourney";
import SnatReturnPath from "../svg/SnatReturnPath";
import DirectServerReturn from "../svg/DirectServerReturn";
import ConnectionStateTable from "../svg/ConnectionStateTable";
import E2eTrafficVerification from "../svg/E2eTrafficVerification";
import HealthDepthModel from "../svg/HealthDepthModel";
import HealthStateTransition from "../svg/HealthStateTransition";
import PersistenceVsAlgorithm from "../svg/PersistenceVsAlgorithm";
import CookiePersistenceFlow from "../svg/CookiePersistenceFlow";
import L7ContentRouting from "../svg/L7ContentRouting";
import DrainRampLifecycle from "../svg/DrainRampLifecycle";
import SelectionTsTree from "../svg/SelectionTsTree";
import TlsHandlingModes from "../svg/TlsHandlingModes";
import Http2Http3LbBehavior from "../svg/Http2Http3LbBehavior";
import GslbArchitecture from "../svg/GslbArchitecture";
import ObservabilityStack from "../svg/ObservabilityStack";
import TsFramework from "../svg/TsFramework";
import LbNetworkInterfaces from "../svg/LbNetworkInterfaces";
import LbSwitchingEnvironment from "../svg/LbSwitchingEnvironment";
import DcIntegrationFull from "../svg/DcIntegrationFull";

export default function Content() {
  return (
    <article>

      {/* ═══════════════════════════════ PHASE 1 ═══════════════════════════════ */}

      <section id="quick-summary">
        <h2 style={S.h2}>Quick Summary</h2>
        <p style={S.p}>A Load Balancer is a network device or software that distributes incoming service traffic across multiple backend servers. Its basic job is simple — forward requests arriving at a single address to eligible servers in a pool.</p>
        <p style={S.p}>Without a load balancer, a user request goes directly to one server. If that server fails, the service fails. If the server is overloaded, it is slow for everyone.</p>
        <Callout type="important" title="What You Will Learn in This Article">
          <ul style={S.ul}>
            <li>Phase 1: VIP, backend pools, health checks, algorithms, L4 vs L7, placement, HA basics</li>
            <li>Phase 2: Traffic processing, full proxy, SNAT, DSR, connection tables, return path</li>
            <li>Phase 3: Health monitoring depth, algorithms deep dive, persistence, L7 content routing, drain/ramp</li>
            <li>Phase 4: TLS offload, HTTP/2, HTTP/3, GSLB, observability stack</li>
            <li>Phase 5: Operations, troubleshooting, data center integration, firewall and switch interaction</li>
          </ul>
        </Callout>
      </section>

      <section id="lb-core-idea">
        <h2 style={S.h2}>Load Balancer — The Core Idea</h2>
        <p style={S.p}>A real example: an e-commerce application is running on just one server. On sale day, traffic goes up 10x. The server crashes. Every user gets an error.</p>
        <p style={S.p}>A Load Balancer is the solution. Users connect to a single address (VIP). The LB distributes the traffic across multiple backend servers. If one server fails, traffic is automatically redirected to the other servers.</p>
        <p style={S.p}>This is not just traffic distribution. The Load Balancer continuously monitors which servers are healthy, applies a selection algorithm, and creates a highly available single point of entry for the application.</p>
      </section>

      <section id="what-lb-does">
        <h2 style={S.h2}>What a Load Balancer Actually Does</h2>
        <ComparisonTable
          headers={["Function", "What it does", "Without LB"]}
          rows={[
            ["Virtual IP (VIP)", "Single stable address for clients", "Clients connect directly to servers"],
            ["Backend Pool", "Tracks eligible servers", "No abstraction — server = endpoint"],
            ["Health Monitoring", "Detects failed backends", "Failed server receives traffic"],
            ["Algorithm", "Decides traffic distribution", "No distribution"],
            ["Return path handling", "Ensures responses traverse correctly", "Must design anyway"],
          ]}
        />
      </section>

      <section id="traffic-journey">
        <h2 style={S.h2}>Basic Traffic Journey</h2>
        <p style={S.p}>The journey of a typical HTTPS request: the client makes a DNS query → DNS returns the VIP address → the client makes a TCP/TLS connection to the VIP → the LB receives the traffic → selects an eligible backend → forwards the traffic → the response comes back.</p>
        <Figure caption="The basic traffic journey of a Load Balancer — from DNS to the VIP, from the VIP to an eligible backend"><LbTrafficJourney /></Figure>
        <Callout type="important" title="Return Path">
          After the LB, the response path depends on the architecture. In full proxy, the LB is in the return path. In DSR, the backend responds directly to the client. Return path design is mandatory — do not assume it.
        </Callout>
      </section>

      <section id="core-terminology">
        <h2 style={S.h2}>Core Terminology</h2>
        <ComparisonTable
          headers={["Concept", "What it means", "Platform-specific names"]}
          rows={[
            ["VIP / Virtual Service", "Address clients connect to", "Virtual server, listener, frontend, virtual host"],
            ["Backend Pool", "Set of servers traffic can go to", "Server farm, upstream, target group, pool"],
            ["Pool Member", "Individual server in a pool", "Node, backend, real server, origin"],
            ["Health Monitor", "Periodic check on member health", "Probe, health check, monitor"],
            ["Algorithm", "Rule for selecting a member", "Load balancing method, scheduler"],
            ["Persistence", "Directing same client to same member", "Stickiness, affinity, session persistence"],
          ]}
        />
      </section>

      <section id="vip-virtual-service">
        <h2 style={S.h2}>VIP — Virtual IP / Virtual Service</h2>
        <p style={S.p}>The VIP is the address that clients connect to. It is not the address of any single backend server — it is a virtual service address configured on the LB.</p>
        <p style={S.p}>DNS points the domain to the VIP. The client resolves <code>app.example.com</code> → DNS returns the VIP address → the client connects to the VIP — the client does not know the backend servers exist.</p>
        <Figure caption="VIP → Virtual Service → Backend Pool mapping — from DNS to pool members"><VipPoolMapping /></Figure>
        <Callout type="warning" title="VIP Implementation">
          VIP implementation depends on the platform and deployment architecture — interface address, software construct, cloud provider managed frontend, anycast address, or other. There is no universal implementation.
        </Callout>
      </section>

      <section id="backend-pool">
        <h2 style={S.h2}>Backend Pool</h2>
        <p style={S.p}>A backend pool is the collection of servers that are eligible for a virtual service. Each member has an IP address and port configured.</p>
        <p style={S.p}>The LB continuously monitors pool members. Those that pass the health check are eligible. Those that fail are temporarily bypassed until they recover.</p>
        <p style={S.p}>One or more pools can be configured on a VIP — based on L7 routing, different pools can serve different requests.</p>
      </section>

      <section id="health-check-foundation">
        <h2 style={S.h2}>Health Check Foundation</h2>
        <p style={S.p}>A health check is the LB mechanism that verifies whether backend servers can actually serve traffic. Without it, traffic will keep going to a failed backend.</p>
        <Figure caption="Health check decision flow — teen levels of probe depth"><HealthCheckFlow /></Figure>
        <p style={S.p}>A single probe failure does not make a backend immediately ineligible. The backend is marked ineligible only after the fall threshold (the required count of consecutive failures) is reached.</p>
        <Callout type="warning" title="Health Check ≠ Health">
          A passing health check does not mean the backend is healthy. A shallow probe (TCP-only or a stub HTTP endpoint) only verifies that the port is open. Probe depth should match service requirements.
        </Callout>
      </section>

      <section id="algorithms-intro">
        <h2 style={S.h2}>Basic Load Balancing Algorithms</h2>
        <ComparisonTable
          headers={["Algorithm", "How it works", "Best for"]}
          rows={[
            ["Round Robin", "Sequential distribution", "Homogeneous servers, similar request types"],
            ["Weighted Round Robin", "Round Robin + proportional weight", "Mixed-capacity servers"],
            ["Least Connections", "Send to fewest-active-connections member", "Variable request durations"],
            ["Weighted Least Connections", "Least Connections + server weight", "Mixed capacity + variable requests"],
            ["Hash-based", "Hash of key → member", "Session consistency needs (with caveats)"],
          ]}
        />
        <Callout type="important" title="Algorithm Selection">
          The algorithm is only one factor — health eligibility, persistence and L7 policy all affect selection too. There is no universally best algorithm.
        </Callout>
      </section>

      <section id="l4-vs-l7">
        <h2 style={S.h2}>L4 vs L7 — Foundation</h2>
        <Figure caption="L4 vs L7 load balancing — decision basis and capabilities"><L4VsL7Lb /></Figure>
        <Callout type="important" title="TLS and L7 Visibility">
          To do HTTP-layer routing for HTTPS traffic, TLS must be terminated on the LB. TLS SNI (Server Name Indication) is different — it is TLS metadata, not HTTP content, and can be used for routing even without decryption.
        </Callout>
      </section>

      <section id="lb-vs-router">
        <h2 style={S.h2}>Load Balancer vs Router</h2>
        <p style={S.p}>A <TopicLink slug="router" variant="inline" /> forwards packets on the best path between networks. The router preserves the destination IP and decides the next hop from the routing table.</p>
        <p style={S.p}>A Load Balancer translates the destination IP — VIP → backend IP. It tracks backend health. It applies a selection algorithm.</p>
        <ComparisonTable
          headers={["Dimension", "Router", "Load Balancer"]}
          rows={[
            ["Primary function", "Inter-network packet forwarding", "Service traffic distribution"],
            ["Decision basis", "Destination IP, routing table", "Pool health, algorithm, persistence, policy"],
            ["Address behavior", "Preserves destination IP", "Translates VIP to backend IP"],
            ["Health awareness", "No backend health awareness", "Continuous backend health monitoring"],
          ]}
        />
      </section>

      <section id="lb-vs-firewall">
        <h2 style={S.h2}>Load Balancer vs Firewall</h2>
        <p style={S.p}>A <TopicLink slug="firewall" variant="inline" /> enforces security policy — which traffic is permitted and which is not.</p>
        <p style={S.p}>A Load Balancer distributes traffic — permitted traffic into the backend pool. These two are complementary functions. Typical: Internet → Firewall (security) → Load Balancer (distribution) → Application Servers.</p>
      </section>

      <section id="lb-vs-reverse-proxy">
        <h2 style={S.h2}>Load Balancer vs Reverse Proxy</h2>
        <p style={S.p}>A reverse proxy terminates the client-facing connection and creates a new request towards the backend. Full-proxy Load Balancers do the same — the architecture overlaps.</p>
        <p style={S.p}>The difference is in primary purpose: a reverse proxy focuses on caching/SSL/content modification; an LB on traffic distribution across a backend pool. Modern tools combine both.</p>
      </section>

      <section id="lb-vs-dns">
        <h2 style={S.h2}>Load Balancer vs DNS Load Balancing</h2>
        <p style={S.p}>Standard DNS can return multiple A records — but it does not know backend health. A failed server's record is also returned. The client uses the cached address until the TTL expires.</p>
        <p style={S.p}>An inline LB actively monitors backends. A failed backend is bypassed after the detection window. Selection happens per connection/per request.</p>
        <p style={S.p}>GSLB (Global Server Load Balancing) combines DNS-based distribution with health monitoring. DNS failover timing does not depend only on TTL — resolver caching, client caching and connection reuse all have an effect.</p>
      </section>

      <section id="one-arm-two-arm">
        <h2 style={S.h2}>One-Arm vs Two-Arm — Introduction</h2>
        <Figure caption="One-arm and two-arm LB placement models — return path engineering is required in both"><LbPlacementModels /></Figure>
        <Callout type="warning" title="Return Path">
          Placement alone does not guarantee the return path. Explicitly designing the return path and validating it with packet capture is mandatory.
        </Callout>
      </section>

      <section id="ha-foundation">
        <h2 style={S.h2}>High Availability Foundation</h2>
        <p style={S.p}>If the LB becomes a single point of failure, the whole service will go down. That is why LBs are also deployed in an HA pair — one active, one standby.</p>
        <Figure caption="LB HA pair — active/standby architecture"><LbHaPair /></Figure>
        <Callout type="important" title="Config Sync vs Session Sync">
          Configuration synchronization and runtime session state synchronization are separate mechanisms. Support for both depends on the platform.
        </Callout>
      </section>

      <section id="dc-placement">
        <h2 style={S.h2}>Data Center Placement</h2>
        <p style={S.p}>In an enterprise data center, the LB is typically placed between the firewall tier and the application tier.</p>
        <Figure caption="Data center tier architecture — LB position between the firewall and application servers"><DcLbPlacement /></Figure>
      </section>

      <section id="practical-example-p1">
        <h2 style={S.h2}>Practical Example</h2>
        <p style={S.p}><code>portal.example.com</code> → DNS → VIP <code>203.0.113.50:443</code>. On the LB: virtual service (HTTPS:443), pool with APP01/APP02/APP03 (port 8443), Least Connections algorithm, HTTP health monitor (<code>GET /health</code> → 200).</p>
        <p style={S.p}>User request → to the LB VIP → health-check-eligible members (APP03 failing) → Least Connections → APP02 selected → traffic forwarded → response to user.</p>
      </section>

      <section id="beginner-misconceptions">
        <h2 style={S.h2}>Common Beginner Misunderstandings</h2>
        <p style={S.p}><strong>"The LB automatically increases bandwidth."</strong> No. The LB distributes traffic — total capacity comes from the backends.</p>
        <p style={S.p}><strong>"Round Robin = equal load."</strong> No. If request processing time varies, the load will be unequal.</p>
        <p style={S.p}><strong>"The LB automatically handles return traffic."</strong> No. The return path has to be explicitly designed.</p>
        <p style={S.p}><strong>"Health check passing = backend healthy."</strong> No. A shallow probe only proves the port is open.</p>
      </section>

      <section id="p1-takeaways">
        <h2 style={S.h2}>Phase 1 Key Takeaways</h2>
        <ul style={S.ul}>
          <li>The LB distributes traffic arriving at a VIP to eligible members of the backend pool</li>
          <li>VIP implementation is platform/deployment dependent — not a universal pattern</li>
          <li>A fall threshold is required to avoid flipping on a single failure</li>
          <li>Algorithm selection depends on the use case — none is universally superior</li>
          <li>TLS termination is required for L7 routing; SNI routing is different</li>
          <li>The return path must be designed — placement alone does not guarantee it</li>
          <li>An HA pair prevents the LB from becoming a single point of failure</li>
        </ul>
      </section>

      {/* ═══════════════════════════════ PHASE 2 ═══════════════════════════════ */}

      <section id="p2-orientation">
        <h2 style={S.h2}>Phase 2 Orientation</h2>
        <p style={S.p}>In Phase 2 we will look at the internal mechanics of traffic processing — how packets are transformed at the address level, when SNAT is applied, when direct server return is used, and how connection state is managed.</p>
      </section>

      <section id="connection-flow">
        <h2 style={S.h2}>Connection Flow Foundation</h2>
        <p style={S.p}>The client connects to the LB VIP — the TCP handshake completes. The LB selects a backend and forwards the traffic to it. The return path must be explicitly routed. Failures must be handled gracefully.</p>
      </section>

      <section id="full-proxy">
        <h2 style={S.h2}>Full Proxy Architecture</h2>
        <p style={S.p}>In full proxy mode, the LB maintains two independent TCP connections: one with the client, one with the backend. The client does not talk to the backend directly.</p>
        <Figure caption="Full proxy model — two independent connection contexts"><FullProxyModel /></Figure>
        <Callout type="important" title="Full Proxy ≠ All LBs">
          Not all load balancers are full proxies. L4 forwarding architectures also exist. Capabilities (TLS termination, header modification, connection reuse) depend on the platform and configuration.
        </Callout>
      </section>

      <section id="forwarding-models">
        <h2 style={S.h2}>Forwarding / Non-Full-Proxy Models</h2>
        <p style={S.p}>In L4 forwarding architectures, the LB forwards traffic with destination translation — there is no full-proxy connection context. Lower overhead, but L7 visibility is limited or absent.</p>
      </section>

      <section id="packet-address-journey">
        <h2 style={S.h2}>Packet Address Journey</h2>
        <Figure caption="Packet address journey — address changes in SNAT and non-SNAT architectures"><PacketAddressJourney /></Figure>
        <Callout type="warning" title="Client IP Preservation">
          In full proxy, preserving the client IP at the network layer requires transparent proxy mode or a platform-specific capability — it is not the default. In forwarding architectures, the client IP is preserved at the network layer, but return routing has to be explicitly designed.
        </Callout>
      </section>

      <section id="destination-translation">
        <h2 style={S.h2}>Destination Translation Foundation</h2>
        <p style={S.p}>Client VIP:443 → LB translates the destination → backend:8443. On the return path, reverse translation — backend:8443 → VIP:443 so that the client receives a valid response.</p>
      </section>

      <section id="snat">
        <h2 style={S.h2}>Source NAT — SNAT</h2>
        <p style={S.p}>SNAT translates the source IP — in the backend request, the source IP becomes an LB-controlled address. The backend responds to that address → the response goes to the LB.</p>
        <Figure caption="SNAT return path — without vs with SNAT"><SnatReturnPath /></Figure>
        <Callout type="important" title="SNAT + Routing Together">
          SNAT and correct routing together solve the return path. SNAT alone cannot override incorrect routes.
        </Callout>
      </section>

      <section id="without-snat">
        <h2 style={S.h2}>Without SNAT</h2>
        <p style={S.p}>Without SNAT, the backend sees the original client IP and may send the response directly to the client — the LB can be bypassed.</p>
        <p style={S.p}>Prevention requires routing design: backend default gateway = LB, or static routes via the LB for client subnets. For Internet-facing applications, per-subnet static routes are impractical — the SNAT or default gateway approach is used.</p>
      </section>

      <section id="symmetric-asymmetric">
        <h2 style={S.h2}>Symmetric vs Asymmetric Traffic</h2>
        <p style={S.p}>Symmetric: both request and response go through the LB. DSR is intentionally asymmetric — request via the LB, response direct to the client. Stateful inspection on the return path is not possible with DSR.</p>
      </section>

      <section id="dsr">
        <h2 style={S.h2}>Direct Server Return — DSR</h2>
        <Figure caption="Direct Server Return — inbound via LB, return direct to client"><DirectServerReturn /></Figure>
        <p style={S.p}>DSR is useful when the response size is much larger than the request. LB limitations: the VIP has to be configured on the backend (OS-specific), ARP/ND suppression is required, L7 return-path inspection is impossible, TLS on the backend. DSR can maintain persistence on inbound traffic.</p>
      </section>

      <section id="one-arm-deep">
        <h2 style={S.h2}>One-Arm Traffic Flow — Deeper View</h2>
        <p style={S.p}>In one-arm, SNAT is typically preferred — minimal routing configuration on the backends. Tradeoff: client IP visibility at the backend.</p>
      </section>

      <section id="two-arm-deep">
        <h2 style={S.h2}>Inline / Two-Arm Traffic Flow — Deeper View</h2>
        <p style={S.p}>In two-arm, the return path must be explicitly routed. The backends' default gateway should be the LB, or there should be static routes for client subnets. Verify with packet capture — do not assume.</p>
      </section>

      <section id="connection-table">
        <h2 style={S.h2}>Connection Table / Flow State</h2>
        <p style={S.p}>The LB maintains the state of active connections. Finite capacity — resource limits are platform dependent. Table exhaustion → new connections rejected.</p>
        <Figure caption="LB connection/flow state table — conceptual representation"><ConnectionStateTable /></Figure>
      </section>

      <section id="tcp-handshake">
        <h2 style={S.h2}>TCP Connection Establishment</h2>
        <p style={S.p}>In full proxy, there are two TCP handshakes: client ↔ LB, then LB ↔ backend. These do not have to be serial — platforms preconnect or pool. In L4 forwarding, a single logical connection.</p>
      </section>

      <section id="connection-reuse">
        <h2 style={S.h2}>Connection Reuse / Multiplexing Foundation</h2>
        <p style={S.p}>In full proxy, the LB can pool backend connections. HTTP/1.1 keep-alive: sequential requests on one connection. HTTP/2 multiplexing: concurrent streams on one connection. Different mechanisms — platform, protocol and configuration matter.</p>
      </section>

      <section id="http-keepalive">
        <h2 style={S.h2}>HTTP Keep-Alive and Load Distribution</h2>
        <p style={S.p}>In per-connection selection, all requests of one connection go to the same backend — the algorithm runs only on a new connection. In per-request selection (L7 full proxy), each request can be independent.</p>
      </section>

      <section id="timeouts">
        <h2 style={S.h2}>Timeouts</h2>
        <p style={S.p}>Key timeout types (exact names platform-specific): client-side idle, server-side response, connection establishment, keep-alive idle. Server-side timeout too short → LB terminates before backend responds → client error.</p>
      </section>

      <section id="backend-failure-active">
        <h2 style={S.h2}>Backend Failure During Active Connection</h2>
        <p style={S.p}>If a backend fails during an active connection, detection: TCP RST, response timeout, health probe failure. Behavior after failure: retry (idempotent requests, platform dependent), RST to the client, or a graceful error. Automatic retry on non-idempotent operations is risky.</p>
      </section>

      <section id="rst-foundation">
        <h2 style={S.h2}>Connection Reset — RST Foundation</h2>
        <p style={S.p}>A TCP RST terminates the connection abruptly. RST source attribution is important in troubleshooting — packet capture at multiple points shows exactly where the RST originated.</p>
      </section>

      <section id="client-ip-preservation">
        <h2 style={S.h2}>Client IP Preservation</h2>
        <p style={S.p}>With SNAT, the client IP is hidden at the network layer. Solutions: X-Forwarded-For header (trust only from trusted LB infrastructure), PROXY Protocol (TCP level), transparent proxy mode (platform-specific).</p>
        <Callout type="important" title="Header Trust">
          RFC 7239 defines the Forwarded header. Format and order are platform-specific — do not trust blindly. Backends should accept headers only from trusted LB infrastructure.
        </Callout>
      </section>

      <section id="port-translation">
        <h2 style={S.h2}>Port Translation</h2>
        <p style={S.p}>The VIP and backend port can be different. Client VIP:443 → LB → backend:8443. Reverse on the return path. In full proxy, an LB-assigned source port is also used in the backend connection.</p>
      </section>

      <section id="return-path-ts">
        <h2 style={S.h2}>Return Path Troubleshooting Foundation</h2>
        <p style={S.p}>Return path failure is the most common deployment-day issue. Symptoms: request reaches the LB, backend selected, traffic forwarded, but the client gets no response. Root cause: the backend response is not passing through the LB. Multi-point packet capture locates it definitively.</p>
      </section>

      <section id="broken-return-path">
        <h2 style={S.h2}>Practical Scenario — Broken Return Path</h2>
        <p style={S.p}>Inline LB, no SNAT, backend default gateway = core router (not the LB). Problem: backend reply → core router → user directly — the LB is bypassed. Fix: apply SNAT, or backend default gateway = LB, or static routes for client subnets via the LB.</p>
      </section>

      <section id="p2-mistakes">
        <h2 style={S.h2}>Common Engineering Mistakes</h2>
        <p style={S.p}><strong>"Two-arm placement = return automatically through LB."</strong> No. Routing has to be explicitly ensured.</p>
        <p style={S.p}><strong>"SNAT applied, job done."</strong> SNAT + correct routing work together.</p>
        <p style={S.p}><strong>"Need to see the client IP, so remove SNAT."</strong> Consider X-Forwarded-For or PROXY Protocol instead.</p>
      </section>

      <section id="p2-takeaways">
        <h2 style={S.h2}>Phase 2 Key Takeaways</h2>
        <ul style={S.ul}>
          <li>Full proxy maintains two independent TCP connections</li>
          <li>SNAT solves the return path problem — the client IP gets hidden at the network layer</li>
          <li>DSR intentionally asymmetric — return path inspection impossible, backend VIP owns</li>
          <li>The connection state table has finite capacity — platform-specific limits</li>
          <li>Return path must be validated with packet capture</li>
          <li>Multiple mechanisms exist for client IP preservation — design the trust model carefully</li>
        </ul>
      </section>

      {/* ═══════════════════════════════ PHASE 3 ═══════════════════════════════ */}

      <section id="p3-orientation">
        <h2 style={S.h2}>Phase 3 Orientation</h2>
        <p style={S.p}>In Phase 3 we will go deeper: the depth of health monitoring, the real behavior of algorithms, the complete persistence model, L7 content routing, and backend lifecycle management.</p>
      </section>

      <section id="health-why">
        <h2 style={S.h2}>Health Monitoring — Why It Exists</h2>
        <p style={S.p}>Backend server failure is inevitable. Active monitoring ensures that degraded infrastructure does not silently affect users. Without monitoring, the LB will keep sending traffic to failed backends.</p>
      </section>

      <section id="monitor-types">
        <h2 style={S.h2}>Health Monitor Types</h2>
        <Figure caption="Health depth model — monitoring depth should match service requirements"><HealthDepthModel /></Figure>
      </section>

      <section id="tcp-monitor">
        <h2 style={S.h2}>TCP Health Monitor</h2>
        <p style={S.p}>A TCP monitor attempts a connection on the port. Port open → pass. Refuse/timeout → fail. It only proves that the port is listening — not application health.</p>
      </section>

      <section id="http-monitor">
        <h2 style={S.h2}>HTTP / HTTPS Health Monitor</h2>
        <p style={S.p}>An HTTP monitor sends a GET to a configured path and checks the response status. Success criteria are configured — typically 200/2xx, platform/config dependent.</p>
        <p style={S.p}>An HTTPS monitor establishes a TLS connection, then sends the HTTP request. TLS certificate validation behavior is platform and config specific. A health probe may pass even with an invalid user-facing certificate — strict validation may not be the default.</p>
        <Callout type="warning" title="HTTP 200 ≠ Application Healthy">
          A backend can return 200 while the application is completely broken — if the endpoint just returns a hardcoded "ok".
        </Callout>
      </section>

      <section id="app-aware-health">
        <h2 style={S.h2}>Application-Aware Health Check</h2>
        <p style={S.p}>An application-aware probe checks the response body or specific content. Most reliable — but it depends on the quality of the health endpoint implementation. For L7 content inspection, an HTTP monitor can see the HTTP body only after terminating TLS.</p>
      </section>

      <section id="active-passive-health">
        <h2 style={S.h2}>Active vs Passive Health Signals</h2>
        <p style={S.p}>Active: the LB sends probes periodically — explicit, scheduled. Passive: the LB observes actual user traffic behavior. Passive signals typically do not trigger a formal state change — platform-specific. Both are complementary.</p>
      </section>

      <section id="health-thresholds">
        <h2 style={S.h2}>Health Check Interval, Timeout and Thresholds</h2>
        <p style={S.p}>Interval: time between probes. Timeout: maximum wait for a probe response. Fall threshold: consecutive failures before ineligible. Rise threshold: consecutive successes before eligible again.</p>
        <Callout type="warning" title="No Universal Formula">
          Optimal values depend on service characteristics. Take guidance from platform-specific documentation.
        </Callout>
      </section>

      <section id="health-state-transitions">
        <h2 style={S.h2}>Health State Transitions</h2>
        <Figure caption="Backend health state transitions — fall/rise threshold based state machine"><HealthStateTransition /></Figure>
      </section>

      <section id="health-flapping">
        <h2 style={S.h2}>Health Check Flapping</h2>
        <p style={S.p}>Flapping: a backend repeatedly toggles between eligible and ineligible. Rise/fall thresholds reduce flapping. If it is happening — investigate the root cause, do not just increase the thresholds.</p>
      </section>

      <section id="algorithm-decision">
        <h2 style={S.h2}>Load Balancing Algorithm — Decision Model</h2>
        <p style={S.p}>The algorithm is one factor — health eligibility, persistence and L7 policy all affect selection too. The exact interaction is platform-specific.</p>
        <Figure caption="Persistence vs algorithm — conceptual interaction (not internal processing order)"><PersistenceVsAlgorithm /></Figure>
      </section>

      <section id="round-robin-deep">
        <h2 style={S.h2}>Round Robin — Deeper View</h2>
        <p style={S.p}>The scheduling unit — per connection or per request — depends on the proxy mode and protocol. With per-connection, a long-lived connection stays on the same backend. With per-request (L7 full proxy), each request is independent.</p>
        <Callout type="warning" title="Equal Load ≠ Round Robin">
          With variance in request duration, the load will be unequal. For variable durations, Least Connections is better.
        </Callout>
      </section>

      <section id="weighted-round-robin">
        <h2 style={S.h2}>Weighted Round Robin</h2>
        <p style={S.p}>Higher weight = more traffic (proportional, ratio illustrative — actual algorithm implementation varies). Useful for servers with different capacities.</p>
      </section>

      <section id="least-connections">
        <h2 style={S.h2}>Least Connections</h2>
        <p style={S.p}>Selects the eligible backend with the fewest active connections. Better than Round Robin for variable-duration requests. Health check connections are typically not counted (implementation varies). It does not know resource utilization (CPU/memory).</p>
      </section>

      <section id="weighted-least-conn">
        <h2 style={S.h2}>Weighted Least Connections</h2>
        <p style={S.p}>Least Connections + weight. For mixed-capacity servers — powerful servers receive proportionally more load.</p>
      </section>

      <section id="hash-selection">
        <h2 style={S.h2}>Hash-Based Selection</h2>
        <p style={S.p}>Hash of a configured key → backend selected. Hash ≠ persistence. A pool change disrupts the hash distribution. Consistent hashing reduces the disruption but does not eliminate it.</p>
        <Callout type="warning" title="Source IP Hash and NAT">
          In corporate NAT, thousands of users share one source IP. Source IP hash → heavy concentration on one backend. Evaluate carefully in NAT-heavy environments.
        </Callout>
      </section>

      <section id="algorithm-comparison">
        <h2 style={S.h2}>Algorithm Comparison</h2>
        <ComparisonTable
          headers={["Algorithm", "Best scenario", "Key caveat"]}
          rows={[
            ["Round Robin", "Homogeneous servers, uniform requests", "Equal requests ≠ equal load"],
            ["Weighted RR", "Different capacity servers", "Ratio illustrative — implementation varies"],
            ["Least Connections", "Variable duration requests", "Doesn't see CPU/memory"],
            ["Hash-based", "Deterministic routing key needed", "Pool changes disrupt distribution"],
          ]}
        />
      </section>

      <section id="algo-limits">
        <h2 style={S.h2}>What Algorithms Do Not Know</h2>
        <p style={S.p}>Basic algorithms do not know: backend CPU, memory pressure, request complexity, application queue depth, actual response time (unless a platform-specific algorithm considers it).</p>
      </section>

      <section id="persistence-why">
        <h2 style={S.h2}>Persistence / Stickiness — Why It Exists</h2>
        <p style={S.p}>Some applications store user session state on the local server. If subsequent requests go to a different backend, the session state will be missing. Persistence ensures that the same client's requests go to the same backend — while that backend is eligible.</p>
      </section>

      <section id="persistence-vs-algo">
        <h2 style={S.h2}>Persistence ≠ Load Balancing Algorithm</h2>
        <p style={S.p}>Persistence can influence or bypass algorithm selection — exact behavior is platform-specific. It only suggests a "preferred backend" when eligible. Heavy use of persistence can create distribution imbalance.</p>
      </section>

      <section id="source-ip-persistence">
        <h2 style={S.h2}>Source IP Persistence</h2>
        <p style={S.p}>Source IP as the affinity key. In NAT environments: thousands of users share one IP — few affinity entries = very heavy traffic concentration. Entry count does not reflect traffic volume. IPv6 privacy extensions also have an effect.</p>
      </section>

      <section id="cookie-persistence">
        <h2 style={S.h2}>Cookie-Based Persistence</h2>
        <p style={S.p}>The LB or the application sets a cookie that encodes backend affinity. LB-generated cookie: the value holds the backend identity in obscured form. Evaluate the Secure, HttpOnly and SameSite attributes based on application requirements.</p>
      </section>

      <section id="cookie-flow">
        <h2 style={S.h2}>Cookie Persistence Traffic Flow</h2>
        <Figure caption="Cookie persistence flow — first request cookie set, subsequent requests affinity"><CookiePersistenceFlow /></Figure>
        <Callout type="important" title="Cookie Implementation (FA-C1 applied)">
          Persistence implementation varies: server-side table entries (table-based) or client-side cookie encoding (cookie-based, no server-side table). The mechanism depends on the persistence type and platform.
        </Callout>
      </section>

      <section id="persisted-backend-fails">
        <h2 style={S.h2}>What If Persisted Backend Fails?</h2>
        <p style={S.p}>Fallback when the persisted backend fails: select a new backend via the algorithm, return an error, or pool-down behavior — platform and configuration dependent. Session state that was stored on the failed backend is permanently lost regardless of LB behavior.</p>
      </section>

      <section id="persistence-timeout">
        <h2 style={S.h2}>Persistence Timeout</h2>
        <p style={S.p}>An entry expires after inactivity. Too short → affinity lost mid-session. Too long → stale entries, distribution imbalance. In a server-side table, entries consume table space; client-side cookie encoding has different resource implications.</p>
      </section>

      <section id="persistence-app-design">
        <h2 style={S.h2}>Persistence and Application Design</h2>
        <p style={S.p}>Better approach: stateless application design — session state in a shared external store (Redis, database). Any backend can serve any request. WebSocket connections require persistence for the connection lifetime — different from generic HTTP persistence.</p>
      </section>

      <section id="l7-content-switching">
        <h2 style={S.h2}>L7 Content Switching</h2>
        <p style={S.p}>An L7 LB can route to different pools based on HTTP content — multiple services on a single VIP.</p>
        <Figure caption="L7 content routing — host and path based routing to different pools"><L7ContentRouting /></Figure>
        <Callout type="warning" title="TLS Termination Required">
          TLS must be terminated for Host header and path visibility. In TLS passthrough, HTTP content is invisible. SNI routing is different — possible without decryption.
        </Callout>
      </section>

      <section id="host-routing">
        <h2 style={S.h2}>Host-Based Routing</h2>
        <p style={S.p}>Routing based on the HTTP Host header (or the HTTP/2 <code>:authority</code> pseudo-header). Different backends on the same VIP:443 — <code>api.example.com</code> and <code>portal.example.com</code> in separate pools. H2 primarily uses <code>:authority</code>.</p>
      </section>

      <section id="path-routing">
        <h2 style={S.h2}>Path-Based Routing</h2>
        <p style={S.p}>Routing based on URL path — <code>/api/*</code> → API pool, <code>/images/*</code> → static pool. Matching order matters — verify the platform-specific evaluation order.</p>
      </section>

      <section id="header-routing">
        <h2 style={S.h2}>Header-Based Routing</h2>
        <p style={S.p}>Routing on specific HTTP headers.</p>
        <Callout type="warning" title="Header Trust">
          Client-controlled headers can contain arbitrary values. Use only validated/trusted headers for routing decisions.
        </Callout>
      </section>

      <section id="l7-policy-eval">
        <h2 style={S.h2}>L7 Policy Evaluation</h2>
        <p style={S.p}>L7 policies are typically ordered rules — first match wins or most-specific match (platform-specific). Configure a default/catch-all rule — without a catch-all, unmatched requests can error or be dropped.</p>
      </section>

      <section id="backend-draining">
        <h2 style={S.h2}>Backend Draining / Graceful Maintenance</h2>
        <Figure caption="Backend drain and ramp-up lifecycle — planned maintenance phases"><DrainRampLifecycle /></Figure>
        <p style={S.p}>Drain mode: new work is not admitted per drain semantics (semantics: protocol/platform specific). Existing work is allowed to complete or is terminated at the drain timeout.</p>
      </section>

      <section id="drain-vs-down">
        <h2 style={S.h2}>Draining vs Marking Down</h2>
        <p style={S.p}><strong>Drain:</strong> Planned, graceful — new work stops per drain semantics, existing completes. Operator-initiated.</p>
        <p style={S.p}><strong>Force Down:</strong> Immediate — all traffic stops. Health failure or emergency removal.</p>
      </section>

      <section id="slow-start">
        <h2 style={S.h2}>Slow Start / Ramp-Up</h2>
        <p style={S.p}>Gradually increases traffic to a new backend — lets the cold cache, JIT and connections warm up. Platform support and initiation mechanism vary — not universally supported.</p>
      </section>

      <section id="connection-limits">
        <h2 style={S.h2}>Connection Limits</h2>
        <p style={S.p}>Per-backend connection limits can be configured. Behavior when the limit is reached (queue, reject, route elsewhere) depends on the platform. Per-member rate limiting is distinct.</p>
      </section>

      <section id="priority-pools">
        <h2 style={S.h2}>Priority / Failover Pools</h2>
        <p style={S.p}>Primary pool empty → the fallback pool is used. It is a local failover mechanism — different from GSLB or full DR. On the same LB infrastructure. Pool-down fallback must be explicitly configured.</p>
      </section>

      <section id="practical-p3">
        <h2 style={S.h2}>Practical Application Example</h2>
        <p style={S.p}>3 app servers, Least Connections, cookie persistence. APP02 health fails — users with APP02 affinity get a fallback backend. APP02 recovers → rise threshold met → slow-start (if configured) → gradual re-admission. Illustrative — actual behavior depends on configuration.</p>
      </section>

      <section id="ts-health-selection">
        <h2 style={S.h2}>Troubleshooting Health vs Selection</h2>
        <Figure caption="Backend selection troubleshooting tree — systematic diagnostic sequence (not processing order)"><SelectionTsTree /></Figure>
      </section>

      <section id="p3-mistakes">
        <h2 style={S.h2}>Common Engineering Mistakes</h2>
        <p style={S.p}><strong>"Persistence = automatic session continuity."</strong> Backend fail → affinity disrupted, session state lost.</p>
        <p style={S.p}><strong>"Source IP persistence = solved."</strong> In NAT, thousands of users → one entry → one backend overloaded.</p>
        <p style={S.p}><strong>"Health check passing = all fine."</strong> A shallow endpoint does not catch application bugs.</p>
        <p style={S.p}><strong>"L7 routing without TLS terminate."</strong> TLS termination is required for HTTPS content visibility. SNI ≠ HTTP Host.</p>
      </section>

      <section id="p3-takeaways">
        <h2 style={S.h2}>Phase 3 Key Takeaways</h2>
        <ul style={S.ul}>
          <li>Health monitor depth should match service requirements</li>
          <li>Fall/rise thresholds prevent flapping</li>
          <li>Algorithms distribute load — they do not guarantee equal load</li>
          <li>Persistence suggests a preferred backend — on failure, the session is lost</li>
          <li>Cookie persistence is better than source IP in NAT environments</li>
          <li>TLS termination is required for L7 routing; SNI is different</li>
          <li>Drain for graceful maintenance; force-down for emergencies</li>
        </ul>
      </section>

      {/* ═══════════════════════════════ PHASE 4 ═══════════════════════════════ */}

      <section id="p4-orientation">
        <h2 style={S.h2}>Phase 4 Orientation</h2>
        <p style={S.p}>Phase 4 covers advanced LB topics: TLS handling modes, HTTP/2 and HTTP/3 behavior, GSLB, and the observability stack.</p>
      </section>

      <section id="tls-problem">
        <h2 style={S.h2}>TLS Offload — The Problem It Solves</h2>
        <p style={S.p}>TLS per-server: certificate management per server, CPU overhead per server, L7 inspection impossible at LB. TLS offload at LB: single cert management point, TLS processing centralized, L7 inspection possible.</p>
      </section>

      <section id="tls-modes">
        <h2 style={S.h2}>TLS Offload vs Re-Encryption vs Passthrough</h2>
        <Figure caption="TLS handling modes — offload, re-encryption, and passthrough"><TlsHandlingModes /></Figure>
        <ul style={S.ul}>
          <li><strong>TLS Offload:</strong> LB terminate → backend HTTP (plaintext). L7 visible, cert at LB.</li>
          <li><strong>TLS Re-encryption:</strong> LB terminate → naya TLS to backend. L7 visible, E2E encryption.</li>
          <li><strong>TLS Passthrough:</strong> No decrypt. L7 HTTP invisible. Backend TLS owns.</li>
        </ul>
        <p style={S.p}>Upstream TLS termination: in some architectures, TLS is terminated at a CDN, WAF, or upstream proxy before the LB. The LB receives plaintext, and L7 inspection is possible without terminating TLS — design return path encryption explicitly.</p>
      </section>

      <section id="cert-management">
        <h2 style={S.h2}>Certificate Management at the LB</h2>
        <p style={S.p}>SNI-based cert selection, expiry monitoring, chain completeness, HA pair sync — all of these are LB operations responsibilities when TLS terminates on the LB. Key security: private keys are sensitive — HSM in high-security environments.</p>
      </section>

      <section id="mtls">
        <h2 style={S.h2}>Client Certificate Authentication (mTLS)</h2>
        <p style={S.p}>In mTLS, the client certificate is also validated. The LB can forward the identity to the backend in a header.</p>
        <Callout type="warning" title="mTLS Header Trust">
          Accept identity headers only from trusted, controlled LB infrastructure — arbitrary client header injection can bypass authentication.
        </Callout>
      </section>

      <section id="http2-lb">
        <h2 style={S.h2}>HTTP/2 — What Changes for Load Balancing</h2>
        <Figure caption="HTTP/2 per-connection vs per-stream, and HTTP/3 QUIC behavior"><Http2Http3LbBehavior /></Figure>
        <p style={S.p}>Per-connection selection (common): all streams of a single client TCP connection go to the same backend. Per-stream (H2 proxy-aware): each stream is routed independently — platform support required.</p>
      </section>

      <section id="http3-quic">
        <h2 style={S.h2}>HTTP/3 and QUIC — Load Balancing Implications</h2>
        <p style={S.p}>HTTP/3 does not use TCP — QUIC over UDP. Integrated TLS 1.3, stream multiplexing, connection migration. 0-RTT replay risk — a security design decision. LB QUIC support varies — many block QUIC (forcing HTTP/2 fallback).</p>
      </section>

      <section id="gslb-foundation">
        <h2 style={S.h2}>GSLB — Global Server Load Balancing Foundation</h2>
        <Figure caption="GSLB architecture — health-aware DNS-based datacenter selection"><GslbArchitecture /></Figure>
        <p style={S.p}>GSLB ≠ local LB. GSLB routes to a datacenter; the local LB distributes within it. DNS failover: TTL, resolver caching, client caching and connection reuse all have an effect — never as fast as local health-check failover.</p>
      </section>

      <section id="gslb-policies">
        <h2 style={S.h2}>GSLB Routing Policies</h2>
        <ul style={S.ul}>
          <li><strong>Geographic:</strong> Client location. EDNS Client Subnet improves accuracy — accuracy varies.</li>
          <li><strong>Performance:</strong> Lowest measured latency (measurement method varies).</li>
          <li><strong>Health-based failover:</strong> Site health fail → traffic elsewhere.</li>
          <li><strong>Weighted:</strong> Proportional distribution across sites.</li>
        </ul>
      </section>

      <section id="gslb-ttl">
        <h2 style={S.h2}>GSLB and TTL Management</h2>
        <p style={S.p}>Low TTL = faster failover potential, higher DNS query rate. Some resolvers ignore ultra-low TTLs. Tradeoff: lower TTL = faster failover, less caching; higher TTL = slower failover, more caching.</p>
      </section>

      <section id="lb-metrics">
        <h2 style={S.h2}>Load Balancer Observability — Metrics</h2>
        <Figure caption="LB observability stack — metrics, access logs, health logs"><ObservabilityStack /></Figure>
        <p style={S.p}>Key metrics: active connections, connections/second, error rate per VIP/backend, backend response time, LB CPU, connection table fill percentage.</p>
      </section>

      <section id="lb-access-logs">
        <h2 style={S.h2}>Load Balancer Observability — Access Logs</h2>
        <p style={S.p}>Per-request detail: client IP (config-dependent — may be the SNAT address), VIP, backend, status, bytes, duration, persistence, TLS info. With SNAT, X-Forwarded-For integration is required for the original client IP.</p>
      </section>

      <section id="lb-health-logs">
        <h2 style={S.h2}>Load Balancer Observability — Health Check Logs</h2>
        <p style={S.p}>State change events: probe results, eligible/ineligible transitions, drain/admin events, timestamps. Critical for root cause analysis — exactly which backend failed and when.</p>
      </section>

      <section id="lb-alerting">
        <h2 style={S.h2}>Load Balancer Observability — Alerting</h2>
        <p style={S.p}>Alert on: backend state change, pool with fewer than N eligible members, error rate threshold, connection table utilization high, certificate expiry approaching. An unconfigured alert condition is invisible — review coverage regularly.</p>
      </section>

      <section id="distributed-tracing">
        <h2 style={S.h2}>Distributed Tracing at the LB</h2>
        <p style={S.p}>The LB can receive, preserve and forward trace headers (e.g., <code>traceparent</code>, <code>X-B3-TraceId</code>). The formats are examples — the specific format depends on the deployment and observability stack.</p>
      </section>

      <section id="observability-example">
        <h2 style={S.h2}>Practical Observability Example</h2>
        <p style={S.p}>Error rate metric spike. Access logs → APP03 5xx. Health logs → APP03 HTTPS probe failing (timeout). Root cause: application crash — TCP port alive but application not responding. The three-layer approach precisely locates the failure without manual server-by-server investigation.</p>
      </section>

      <section id="p4-mistakes">
        <h2 style={S.h2}>Common Engineering Mistakes</h2>
        <p style={S.p}><strong>"TLS offload = plaintext always."</strong> Re-encryption is also an option.</p>
        <p style={S.p}><strong>"HTTP/2 = better distribution automatically."</strong> With per-connection, the same client's streams go to the same backend.</p>
        <p style={S.p}><strong>"GSLB = fast failover."</strong> DNS-based failover is bounded by TTL/caching.</p>
        <p style={S.p}><strong>"Metrics enough."</strong> Per-backend issues show up in access logs. State changes in health logs.</p>
      </section>

      <section id="p4-takeaways">
        <h2 style={S.h2}>Phase 4 Key Takeaways</h2>
        <ul style={S.ul}>
          <li>Three TLS modes: offload, re-encrypt, passthrough — an architecture decision</li>
          <li>Certificate lifecycle is an LB operations responsibility when TLS terminates at the LB</li>
          <li>HTTP/2 per-connection LB ≠ per-request — architecture determines</li>
          <li>HTTP/3 is QUIC/UDP — TCP terminology does not apply</li>
          <li>GSLB ≠ local LB — DNS-based, site-level failover</li>
          <li>Three observability layers: metrics + access logs + health logs</li>
        </ul>
      </section>

      {/* ═══════════════════════════════ PHASE 5 ═══════════════════════════════ */}

      <section id="p5-orientation">
        <h2 style={S.h2}>Phase 5 Orientation</h2>
        <p style={S.p}>Phase 5 covers production operations, a troubleshooting framework, and data center integration alongside firewalls, switches, routers, and application tiers.</p>
      </section>

      <section id="ops-lifecycle">
        <h2 style={S.h2}>Operational Lifecycle Overview</h2>
        <ComparisonTable
          headers={["Domain", "What it involves"]}
          rows={[
            ["Configuration management", "VIP, pool, health, algorithm, persistence, certificate config kept accurate"],
            ["Health visibility", "Monitoring backend state, detecting degradation before users do"],
            ["Change control", "Safe addition/removal of backends, VIP changes, algorithm changes"],
            ["Incident response", "Diagnosing and resolving traffic failures"],
            ["Capacity management", "Ensuring LB and backend resources before saturation"],
          ]}
        />
        <p style={S.p}>A running LB without an operational process is simply being ignored until something breaks.</p>
      </section>

      <section id="config-management">
        <h2 style={S.h2}>Configuration Management</h2>
        <p style={S.p}>The configuration must stay accurate: virtual services, pools, health monitors, algorithms, persistence, certificates (and expiry), HA config, administrative state.</p>
        <p style={S.p}>Configuration drift risk: changes that do not reach both HA peers — manual one-sided changes, sync failures, or platform sync limitations. Verify sync success even on platforms with automatic configuration sync. The standby node enforces a different policy on failover — silent until disaster.</p>
        <p style={S.p}>With every change: change record, pre-change backup, post-change validation, rollback procedure documented beforehand.</p>
      </section>

      <section id="backend-addition">
        <h2 style={S.h2}>Backend Addition</h2>
        <CodeBlock lang="text">{`1. Verify backend is ready:
   - Application deployed and started, port listening
   - Health endpoint responding correctly
   - For HTTPS backends: verify TLS config (cert validity, chain,
     cipher) — health probe may pass even with invalid user-facing cert
   - Dependencies initialized

2. Add in administratively inactive state (where platform supports):
   - Prevents traffic before readiness confirmation
   - State name and pre-disabled support: platform-specific

3. Validate health monitor:
   - Eligibility: on first probe or multiple successes: platform-specific

4. Enable member (slow-start where platform supports)

5. Monitor: traffic arriving, error rate normal, unexpected health failures`}</CodeBlock>
      </section>

      <section id="backend-removal">
        <h2 style={S.h2}>Backend Removal — Planned Maintenance</h2>
        <CodeBlock lang="text">{`1. Drain state (where platform supports):
   - New work stops per drain semantics (protocol/platform dependent)
   - Existing connections are allowed to complete

2. Monitor drain: active connection count

3. Wait, or at drain timeout platform terminates remaining

4. Administratively disable or remove

5. Perform maintenance

6. Validate readiness before re-enabling (same as addition steps)

7. Re-enable with monitoring`}</CodeBlock>
      </section>

      <section id="emergency-removal">
        <h2 style={S.h2}>Emergency Backend Removal</h2>
        <CodeBlock lang="text">{`1. Assess scope: which backend? Is health monitoring detecting it?

2. Health monitoring NOT detecting:
   → Immediately administratively disable/force-down

3. Health monitoring detecting but threshold not reached:
   → Override threshold timing with admin disable

4. Verify: removed from backend pool, traffic no longer going there
5. Monitor remaining pool capacity
6. Investigate failed backend while offline`}</CodeBlock>
        <Callout type="warning" title="Detection Window">
          Health check detection window: a failing backend will keep receiving traffic until probe failures accumulate. Actual time depends on probe timing, failure type, platform scheduling. A manual override bypasses this window and is faster on confirmed failures.
        </Callout>
      </section>

      <section id="cert-operations">
        <h2 style={S.h2}>Certificate Operations</h2>
        <p style={S.p}>When TLS terminates on the LB, certificate lifecycle is an LB operations responsibility.</p>
        <p style={S.p}><strong>Expiry tracking:</strong> Configure alerts well in advance. Appropriate lead time depends on organizational process complexity — automated ACME renewal (shorter), enterprise PKI with approval processes (longer). The organization should define its own lead time.</p>
        <p style={S.p}><strong>Update procedure:</strong> Obtain new cert + chain → validate Subject/SAN/chain/expiry/CA → staging slot test (where supported; otherwise external TLS tool) → apply to production in a maintenance window → post-change TLS verify → monitor errors.</p>
        <p style={S.p}><strong>HA pair sync:</strong> Both nodes in a consistent state — inconsistency means an outage on failover.</p>
      </section>

      <section id="algo-persistence-ops">
        <h2 style={S.h2}>Algorithm and Persistence Changes</h2>
        <p style={S.p}>Algorithm changes affect new connection/request selection — existing sessions stay on their current backends and are not redistributed. Existing imbalance will persist until sessions close naturally, regardless of the new algorithm.</p>
        <p style={S.p}>Persistence changes: adding persistence creates new affinity — server-side table entries (table-based) or client-side cookie encoding (cookie-based, no server-side table). The mechanism depends on the persistence type and platform. Removing persistence: no new affinity, existing entries age out. Type change: old entries abandoned, new type begins.</p>
        <p style={S.p}>Changes are safest during low-traffic periods.</p>
      </section>

      <section id="ts-framework">
        <h2 style={S.h2}>Troubleshooting Framework</h2>
        <Figure caption="LB troubleshooting framework — three diagnostic zones (diagnostic sequence, not processing order)"><TsFramework /></Figure>
        <p style={S.p}><strong>Step 1 — Scope:</strong> All traffic to the VIP? → VIP-level. Specific backend? → Member. Specific clients? → Client/network. Specific requests? → L7/app. Intermittent under load? → Capacity.</p>
        <p style={S.p}><strong>Step 2 — Confirm LB view:</strong> Traffic in the logs? Virtual service active? Members eligible? Connection table entry?</p>
        <p style={S.p}><strong>Step 3 — Trace selected path.</strong></p>
        <p style={S.p}><strong>Step 4 — Locate failure layer:</strong> LB issue vs application vs network vs return path bypass.</p>
      </section>

      <section id="ts-vip-unreachable">
        <h2 style={S.h2}>Diagnosing No-Traffic / VIP Unreachable</h2>
        <CodeBlock lang="text">{`1. Network path to VIP functional?
2. Virtual service configured and active? Correct port/protocol?
3. Why is the pool ineligible? Health failures? Admin disabled?
   Zero members? Each has different fix.
4. Upstream firewall blocking VIP?
5. HA state — expected node active?
6. TLS (HTTPS): handshake fail? Cert issue, cipher mismatch?`}</CodeBlock>
      </section>

      <section id="ts-partial-failures">
        <h2 style={S.h2}>Diagnosing Partial Backend Failures</h2>
        <CodeBlock lang="text">{`1. Specific backend causing failures? Check per-backend error rates
2. Health monitoring detecting? Endpoint too shallow?
3. Load-related? Does the failure rate increase with traffic?
4. Persistence imbalance?
   NAT: few entries = many users (entry count does not reflect volume)
5. LB-to-specific-backend network issue?
6. Backend's own error logs?`}</CodeBlock>
      </section>

      <section id="ts-slow-response">
        <h2 style={S.h2}>Diagnosing Slow Response / Timeouts</h2>
        <CodeBlock lang="text">{`1. LB-side measurements: total and backend response time
2. One backend or all slow?
3. Where is the slowness? Backend processing? LB-backend network latency?
   LB-internal processing (full proxy TLS/L7/header manipulation)?
   Isolate each segment.
4. LB resource-constrained? CPU, connection table?
5. Downstream dependency timeout > LB server-side timeout?
6. LB timeout misconfiguration? Server-side too short?
7. At low traffic fast, high load slow? → Backend saturation`}</CodeBlock>
      </section>

      <section id="ts-health-failures">
        <h2 style={S.h2}>Diagnosing Health Check Failures</h2>
        <CodeBlock lang="text">{`1. Which probe type failing? TCP? HTTP? HTTPS? Content check?
   Reason: refused? non-2xx? timeout? content mismatch?
2. False alarm? Backend actually responding on probe port?
3. Network path issue?
   Probe path ≠ data path — different source IP, routing
   Firewall blocking probe-source but not VIP?
4. Threshold too aggressive? Timeout too short?
5. HTTPS probe: cert validation? cipher compatibility?
6. Content mismatch: endpoint format changed?
7. Flapping? Rise/fall thresholds appropriate?`}</CodeBlock>
      </section>

      <section id="network-integration">
        <h2 style={S.h2}>Network Integration — Physical and Logical Placement</h2>
        <p style={S.p}>Typical DC tiers: Internet → Edge routers → Firewall (security) → Load Balancer (service distribution) → Application servers → Database/storage.</p>
        <p style={S.p}>Typical inline LB interfaces: client-facing (inbound), server-facing (to app network), management (OOB — separate from data path), HA (control + state sync).</p>
        <Figure caption="LB network interface layout — four interface types separated"><LbNetworkInterfaces /></Figure>
      </section>

      <section id="vlan-design">
        <h2 style={S.h2}>VLAN Design for Load Balancing</h2>
        <p style={S.p}>Typical VLAN structure (illustrative — actual VLANs project-specific): VLAN 100 client-facing/DMZ, VLAN 200 server-facing/application, VLAN 300 management, VLAN 400 HA sync.</p>
        <Callout type="warning" title="VLAN Security">
          VLAN segmentation alone does not enforce security isolation. Inter-VLAN traffic depends on L3 routing. Segmentation is not effective unless a firewall or router enforces at VLAN boundaries. VLANs are a network segmentation mechanism — not security enforcement.
        </Callout>
      </section>

      <section id="routing-design">
        <h2 style={S.h2}>Routing Design Around the Load Balancer</h2>
        <p style={S.p}><strong>Model 1 — LB as default gateway:</strong> Simple, ensures return path via LB. All backend traffic goes through LB.</p>
        <p style={S.p}><strong>Model 2 — Static routes for client subnets:</strong> Client IP preserved at network layer — applies to forwarding/non-proxy architectures. In full-proxy, transparent proxy mode or platform capability required. Impractical for Internet-facing (entire internet addresses). Applicable for controlled environments.</p>
        <p style={S.p}><strong>Model 3 — SNAT:</strong> No backend routing config needed. Client IP not visible at network layer.</p>
        <Callout type="important" title="Validate with Capture">
          Validate the route design with packet capture before go-live — prove that return traffic is passing through the LB.
        </Callout>
      </section>

      <section id="firewall-interaction">
        <h2 style={S.h2}>Interaction with Firewalls</h2>
        <p style={S.p}>Firewall: security enforcement. LB: service distribution. Internet → Firewall → LB → Backends.</p>
        <p style={S.p}>Firewall permits: client traffic to the VIP, LB probe traffic to backends (probe source = LB address), LB-to-backend traffic, return traffic (stateless: explicit rules; stateful: established session return typically auto-permitted — verify), HA traffic, management access.</p>
        <ComparisonTable
          headers={["Problem", "Symptom", "Cause"]}
          rows={[
            ["Probe blocked", "Members ineligible without actual failure", "Firewall blocking probe from LB to backend"],
            ["SNAT unaccounted", "Traffic drops after LB", "Policy expects client IP, sees LB SNAT IP"],
            ["Return blocked", "Client gets nothing after backend responds", "Firewall blocking return path"],
            ["HA sync blocked", "HA pair out of sync", "Firewall blocking HA control/state traffic"],
          ]}
        />
        <p style={S.p}>Upstream TLS termination case (FA-C3): in some architectures, TLS is terminated at a CDN, WAF, or upstream proxy before the LB. The LB receives plaintext — L7 inspection is possible without terminating TLS. Plan return path encryption design explicitly.</p>
      </section>

      <section id="switch-interaction">
        <h2 style={S.h2}>Interaction with Switches</h2>
        <Figure caption="LB switching environment — STP, PortFast, LAG, HA failover MAC behavior"><LbSwitchingEnvironment /></Figure>
        <p style={S.p}><strong>PortFast/Edge Port:</strong> Configure on LB-facing ports — avoids STP transition delays. Terminology is vendor-specific.</p>
        <p style={S.p}><strong>LAG/LACP:</strong> Link redundancy. Verify LB and switch compatibility — LACP mode is platform-specific.</p>
        <p style={S.p}><strong>HA failover MAC:</strong> Some LB implementations send Gratuitous ARP (IPv4) or Unsolicited NA (IPv6) — adjacent switches update their MAC tables. Whether gARP/NA is sent and how quickly switches update: dependent on both LB and switch behavior. Verify in your specific environment.</p>
        <Callout type="warning" title="Switch Security Features">
          Static ARP entries prevent HA failover updates. Dynamic ARP Inspection (DAI) and similar features can restrict gARP processing. Verify switch security policies — they must not interfere with LB HA failover.
        </Callout>
      </section>

      <section id="virtual-cloud-lb">
        <h2 style={S.h2}>Load Balancer in Virtualized / Cloud Environments</h2>
        <p style={S.p}><strong>Virtual LB:</strong> Resource sharing, hypervisor scheduling latency, virtual NIC limits, live migration brief interruption. High-performance deployments: CPU pinning, NUMA topology, dedicated vCPUs for TLS — platform/hypervisor specific.</p>
        <p style={S.p}><strong>Cloud-native LB:</strong> No appliance to operate, auto-scale (where supported), HA provider-managed, options limited to provider's exposure. Deliberately plan consistent operational processes across on-premises and cloud environments.</p>
      </section>

      <section id="capacity-planning">
        <h2 style={S.h2}>Capacity Planning</h2>
        <ComparisonTable
          headers={["Resource", "LB side", "Backend side"]}
          rows={[
            ["Connection table", "State table exhaustion → new connections rejected", "Backend connection limits"],
            ["CPU", "Processing bottleneck (TLS, HTTP/2, inspection)", "Backend application CPU"],
            ["Throughput", "LB throughput ceiling", "Backend bandwidth"],
            ["New conn rate", "SYN handling limit", "Connection establishment rate"],
            ["TLS sessions", "Handshake capacity", "N/A (offloaded to LB)"],
            ["Persistence table", "Platform-specific limit", "N/A"],
          ]}
        />
        <p style={S.p}>Per dimension: understand current peak utilization, estimate growth, determine headroom for the failure scenario. The assessment is judgement-based — there is no universal formula. Validate with platform-specific documentation.</p>
      </section>

      <section id="e2e-tracing">
        <h2 style={S.h2}>End-to-End Request Tracing</h2>
        <p style={S.p}>Multi-point packet capture is the definitive tool when logs and metrics do not tell you.</p>
        <Figure caption="8-point end-to-end traffic verification method"><E2eTrafficVerification /></Figure>
        <p style={S.p}>Always filter by VIP + client IP combination — unfiltered captures produce an unusable volume. Most LBs' built-in capture is limited to the LB perspective — external capture on the backend or client is needed for the complete picture.</p>
      </section>

      <section id="dc-integration-example">
        <h2 style={S.h2}>Data Center Integration — Practical Example</h2>
        <Figure caption="Complete DC LB integration — from the internet to the database, realistic HTTPS request path"><DcIntegrationFull /></Figure>
        <p style={S.p}><strong>Traffic flow:</strong> Client → DNS → VIP 203.0.113.50:443 → Perimeter FW → VLAN 100 → LB (TLS handling per mode, L7 policy, Least Connections → APP02) → APP02:8443 via VLAN 200 (SNAT or routing — design dependent) → response via LB → Client.</p>
        <p style={S.p}><strong>Health monitoring:</strong> LB → probe → APP01/02/03:8443/health via VLAN 200. Firewall VLAN 200 policy must permit probe traffic from LB probe source address. Return probe responses must be permitted back.</p>
        <Callout type="important" title="Return Path Validation">
          Explicitly validate the return path (SNAT or routing) via packet capture — do not assume it from placement. This is a common architecture pattern, not a universal mandatory design.
        </Callout>
      </section>

      <section id="p5-mistakes">
        <h2 style={S.h2}>Common Operations Engineering Mistakes</h2>
        <p style={S.p}><strong>"Health check passing = backend healthy."</strong> A shallow probe proves the port, not the application. Match probe depth to the actual needs of the service.</p>
        <p style={S.p}><strong>"Health check failing = backend broken."</strong> Probe path, firewall, timeout and certificate are also causes. Distinguish before acting.</p>
        <p style={S.p}><strong>"LB healthy → service healthy."</strong> Application, database, CDN, DNS — all are independent of the LB. End-to-end validation is separate.</p>
        <p style={S.p}><strong>"No alerts = no problems."</strong> Unconfigured conditions are invisible. Review alert coverage regularly.</p>
        <p style={S.p}><strong>"Two backends = sufficient HA."</strong> Do a shared failure domain analysis — a shared dependency can fail both simultaneously.</p>
        <p style={S.p}><strong>"Emergency change, no record."</strong> Post-emergency documentation is mandatory — what, why, when.</p>
        <p style={S.p}><strong>"Persistence = session continuity guaranteed."</strong> Failed backend = affinity disrupted, session state lost regardless of LB behavior.</p>
        <p style={S.p}><strong>"Certificate renewal can wait."</strong> The renewal process can have delays. Define lead time based on organizational process.</p>
      </section>

      <section id="p5-takeaways">
        <h2 style={S.h2}>Phase 5 Key Takeaways</h2>
        <ul style={S.ul}>
          <li>Operations continue even after deployment</li>
          <li>Follow a defined sequence for backend addition/removal</li>
          <li>Verify health check failures — probe path, firewall and timeout are also causes</li>
          <li>Validate the return path with packet capture — do not assume it from placement</li>
          <li>Plan firewall and LB policy together — permit probe, HA and management traffic</li>
          <li>Switch configuration affects HA failover — test and verify</li>
          <li>Capacity planning per-dimension — no formula</li>
          <li>Multi-point capture definitive troubleshooting tool</li>
          <li>Application design and LB configuration must be consistent</li>
          <li>Certificate lifecycle is an LB operations responsibility when TLS terminates at the LB</li>
        </ul>
      </section>

      {/* ═══════════════════════════════ GLOSSARY ═══════════════════════════════ */}

      <section id="glossary" style={{ marginTop: "3rem" }}>
        <h2 style={S.h2}>Glossary — Key Terms</h2>
        <ComparisonTable
          headers={["Term", "Definition"]}
          rows={[
            ["VIP (Virtual IP)", "The address clients connect to — not a backend's direct address. Implementation is platform/deployment dependent."],
            ["Backend Pool", "The collection of eligible servers that serve a virtual service"],
            ["Fall Threshold", "Consecutive probe failures before backend marked ineligible"],
            ["Rise Threshold", "Consecutive successes before ineligible backend returns to eligible"],
            ["SNAT", "Source NAT — translates the source IP in backend requests to an LB-controlled address"],
            ["DSR", "Direct Server Return — inbound via LB, response direct to client"],
            ["Full Proxy", "The LB maintains two independent connections — with the client and with the backend"],
            ["L4 LB", "Balancing at the transport layer — based on IP, port, protocol"],
            ["L7 LB", "Balancing at the application layer — based on HTTP headers, URL, cookies"],
            ["HA Pair", "Two LB nodes — active + standby — to avoid a single point of failure"],
            ["GSLB", "Global Server Load Balancing — DNS-based multi-datacenter routing with health"],
            ["TLS Offload", "TLS terminated on the LB, the backend receives plaintext"],
            ["Drain State", "No new work per drain semantics; existing work is allowed to complete"],
            ["Config Drift", "Divergent config in an HA pair — a change did not reach one node"],
            ["Multi-point Capture", "Simultaneous capture at multiple network points — to locate the break"],
          ]}
        />
      </section>

      {/* ═══════════════════════════════ FAQ ═══════════════════════════════ */}

      <section id="faq" style={{ marginTop: "3rem" }}>
        <h2 style={S.h2}>Frequently Asked Questions</h2>
        {faqs.map((faq, i) => (
          <div key={i} style={{ marginBottom: "2rem" }}>
            <h3 style={{ ...S.h3, color: "#111827" }}>{faq.q}</h3>
            <p style={S.p}>{faq.a}</p>
          </div>
        ))}
      </section>

    </article>
  );
}
