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
        <p style={S.p}>Load Balancer ek network device ya software hai jo incoming service traffic ko multiple backend servers ke beech distribute karta hai. Iska basic kaam simple hai — ek single address pe aane wale requests ko pool mein se eligible servers pe forward karna.</p>
        <p style={S.p}>Without a load balancer, ek user request directly ek server ko jaati hai. Woh server fail ho toh service fail. Server overloaded ho toh sabke liye slow.</p>
        <Callout type="important" title="Is Article Mein Kya Sikhoge">
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
        <p style={S.p}>Ek real example: e-commerce application sirf ek server pe chal raha hai. Sale ke din traffic 10x ho gayi. Server crash. Sab users ko error.</p>
        <p style={S.p}>Load Balancer solution hai. Users ek single address (VIP) se connect karte hain. LB traffic ko multiple backend servers pe distribute karta hai. Ek server fail ho toh traffic automatically doosre servers pe redirect hoti hai.</p>
        <p style={S.p}>Yeh sirf traffic distribution nahi hai. Load Balancer continuously monitor karta hai ki kaun se servers healthy hain, selection algorithm apply karta hai, aur application ke liye ek highly available single point of entry create karta hai.</p>
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
        <p style={S.p}>Typical HTTPS request ka journey: client DNS query karta hai → DNS VIP address return karta hai → client VIP pe TCP/TLS connect karta hai → LB traffic receive karta hai → eligible backend select karta hai → traffic forward karta hai → response wapas aati hai.</p>
        <Figure caption="Load Balancer ka basic traffic journey — DNS se VIP tak, VIP se eligible backend tak"><LbTrafficJourney /></Figure>
        <Callout type="important" title="Return Path">
          LB ke baad response ka path architecture pe depend karta hai. Full proxy mein LB return path mein hota hai. DSR mein backend directly client ko respond karta hai. Return path design mandatory hai — assume mat karo.
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
        <p style={S.p}>VIP woh address hai jis pe clients connect karte hain. Yeh kisi ek backend server ka address nahi hota — LB pe configured virtual service address hai.</p>
        <p style={S.p}>DNS domain ko VIP pe point karta hai. Client <code>app.example.com</code> resolve karta hai → DNS VIP address return karta hai → client VIP pe connect karta hai — backend servers ka existence client ko pata nahi hota.</p>
        <Figure caption="VIP → Virtual Service → Backend Pool mapping — DNS se pool members tak"><VipPoolMapping /></Figure>
        <Callout type="warning" title="VIP Implementation">
          VIP ka implementation platform aur deployment architecture pe depend karta hai — interface address, software construct, cloud provider managed frontend, anycast address, ya other. Universal implementation nahi hai.
        </Callout>
      </section>

      <section id="backend-pool">
        <h2 style={S.h2}>Backend Pool</h2>
        <p style={S.p}>Backend pool un servers ka collection hai jo ek virtual service ke liye eligible hain. Har member ka IP address aur port configured hota hai.</p>
        <p style={S.p}>LB pool members ko continuously monitor karta hai. Health check pass karne wale eligible hain. Fail karne wale temporarily bypass kiye jaate hain jab tak recovery nahi hoti.</p>
        <p style={S.p}>Ek VIP pe ek ya zyada pools configured ho sakti hain — L7 routing pe based alag pools alag requests serve kar sakti hain.</p>
      </section>

      <section id="health-check-foundation">
        <h2 style={S.h2}>Health Check Foundation</h2>
        <p style={S.p}>Health check LB ka woh mechanism hai jo verify karta hai ki backend servers actually traffic serve kar sakte hain ya nahi. Without it, failed backend pe traffic jaati rahegi.</p>
        <Figure caption="Health check decision flow — teen levels of probe depth"><HealthCheckFlow /></Figure>
        <p style={S.p}>Ek single probe failure se backend immediately ineligible nahi hota. Fall threshold (consecutive failures ki required count) reach hone ke baad hi backend ineligible mark hota hai.</p>
        <Callout type="warning" title="Health Check ≠ Health">
          Health check passing ka matlab backend healthy nahi hai. Shallow probe (TCP-only ya stub HTTP endpoint) sirf port open hona verify karta hai. Probe depth service requirements se match karna chahiye.
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
          Algorithm sirf ek factor hai — health eligibility, persistence, L7 policy sab bhi selection affect karte hain. Koi universally best algorithm nahi hai.
        </Callout>
      </section>

      <section id="l4-vs-l7">
        <h2 style={S.h2}>L4 vs L7 — Foundation</h2>
        <Figure caption="L4 vs L7 load balancing — decision basis aur capabilities"><L4VsL7Lb /></Figure>
        <Callout type="important" title="TLS aur L7 Visibility">
          HTTPS traffic ke liye HTTP-layer routing karne ke liye TLS LB pe terminate karna zaroori hai. TLS SNI (Server Name Indication) alag hai — yeh TLS metadata hai, HTTP content nahi, aur decryption ke bina bhi routing ke liye use ho sakta hai.
        </Callout>
      </section>

      <section id="lb-vs-router">
        <h2 style={S.h2}>Load Balancer vs Router</h2>
        <p style={S.p}><TopicLink slug="router" variant="inline" /> packets ko best path pe forward karta hai between networks. Router destination IP preserve karta hai aur routing table se next hop decide karta hai.</p>
        <p style={S.p}>Load Balancer destination IP translate karta hai — VIP → backend IP. Backend health track karta hai. Selection algorithm apply karta hai.</p>
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
        <p style={S.p}><TopicLink slug="firewall" variant="inline" /> security policy enforce karta hai — kaun sa traffic permitted hai aur kaun sa nahi.</p>
        <p style={S.p}>Load Balancer traffic distribute karta hai — permitted traffic ko backend pool mein. Yeh dono complementary functions hain. Typical: Internet → Firewall (security) → Load Balancer (distribution) → Application Servers.</p>
      </section>

      <section id="lb-vs-reverse-proxy">
        <h2 style={S.h2}>Load Balancer vs Reverse Proxy</h2>
        <p style={S.p}>Reverse proxy client-facing connection terminate karta hai aur backend ki taraf naya request create karta hai. Full-proxy Load Balancers bhi yehi karte hain — architecture overlap karta hai.</p>
        <p style={S.p}>Difference primary purpose mein hai: reverse proxy caching/SSL/content modification pe focus karta hai; LB traffic distribution across backend pool pe. Modern tools dono combine karte hain.</p>
      </section>

      <section id="lb-vs-dns">
        <h2 style={S.h2}>Load Balancer vs DNS Load Balancing</h2>
        <p style={S.p}>Standard DNS multiple A records return kar sakta hai — lekin backend health nahi jaanta. Failed server ka record bhi return hota hai. Client TTL expire hone tak cached address use karta hai.</p>
        <p style={S.p}>Inline LB actively backends monitor karta hai. Failed backend detection window ke baad bypass hota hai. Per-connection/per-request selection hota hai.</p>
        <p style={S.p}>GSLB (Global Server Load Balancing) DNS-based distribution ke saath health monitoring combine karta hai. DNS failover timing sirf TTL pe nahi — resolver caching, client caching, connection reuse sab affect karte hain.</p>
      </section>

      <section id="one-arm-two-arm">
        <h2 style={S.h2}>One-Arm vs Two-Arm — Introduction</h2>
        <Figure caption="One-arm aur two-arm LB placement models — return path engineering zaroori hai dono mein"><LbPlacementModels /></Figure>
        <Callout type="warning" title="Return Path">
          Placement alone return path guarantee nahi karta. Return path explicitly design karna aur packet capture se validate karna mandatory hai.
        </Callout>
      </section>

      <section id="ha-foundation">
        <h2 style={S.h2}>High Availability Foundation</h2>
        <p style={S.p}>Agar LB single point of failure ban jaaye toh saari service down ho jaayegi. Isliye LB bhi HA pair mein deploy kiye jaate hain — ek active, ek standby.</p>
        <Figure caption="LB HA pair — active/standby architecture"><LbHaPair /></Figure>
        <Callout type="important" title="Config Sync vs Session Sync">
          Configuration synchronization aur runtime session state synchronization alag mechanisms hain. Dono ki support platform pe depend karti hai.
        </Callout>
      </section>

      <section id="dc-placement">
        <h2 style={S.h2}>Data Center Placement</h2>
        <p style={S.p}>Enterprise data center mein LB typically firewall tier aur application tier ke beech placed hota hai.</p>
        <Figure caption="Data center tier architecture — LB ka position firewall aur application servers ke beech"><DcLbPlacement /></Figure>
      </section>

      <section id="practical-example-p1">
        <h2 style={S.h2}>Practical Example</h2>
        <p style={S.p}><code>portal.example.com</code> → DNS → VIP <code>203.0.113.50:443</code>. LB pe: virtual service (HTTPS:443), pool with APP01/APP02/APP03 (port 8443), Least Connections algorithm, HTTP health monitor (<code>GET /health</code> → 200).</p>
        <p style={S.p}>User request → LB VIP pe → health check eligible members (APP03 failing) → Least Connections → APP02 selected → traffic forward → response to user.</p>
      </section>

      <section id="beginner-misconceptions">
        <h2 style={S.h2}>Common Beginner Misunderstandings</h2>
        <p style={S.p}><strong>"LB automatically bandwidth increase karta hai."</strong> Nahi. LB traffic distribute karta hai — total capacity backends se aati hai.</p>
        <p style={S.p}><strong>"Round Robin = equal load."</strong> Nahi. Request processing time vary kare toh load unequal hoga.</p>
        <p style={S.p}><strong>"LB automatically return traffic handle karta hai."</strong> Nahi. Return path explicitly design karna padta hai.</p>
        <p style={S.p}><strong>"Health check passing = backend healthy."</strong> Nahi. Shallow probe sirf port open prove karta hai.</p>
      </section>

      <section id="p1-takeaways">
        <h2 style={S.h2}>Phase 1 Key Takeaways</h2>
        <ul style={S.ul}>
          <li>LB ek VIP pe traffic ko backend pool ke eligible members pe distribute karta hai</li>
          <li>VIP implementation platform/deployment dependent — universal pattern nahi</li>
          <li>Fall threshold required hai single-failure flip se bachne ke liye</li>
          <li>Algorithm selection use case pe depend karta hai — koi universally superior nahi</li>
          <li>L7 routing ke liye TLS termination required; SNI routing alag hai</li>
          <li>Return path must be designed — placement alone guarantee nahi karta</li>
          <li>HA pair LB ko single point of failure banne se bachata hai</li>
        </ul>
      </section>

      {/* ═══════════════════════════════ PHASE 2 ═══════════════════════════════ */}

      <section id="p2-orientation">
        <h2 style={S.h2}>Phase 2 Orientation</h2>
        <p style={S.p}>Phase 2 mein hum traffic processing ka internal mechanics dekhenge — packets address level pe kaise transform hote hain, SNAT kab apply hoti hai, direct server return kab use hota hai, aur connection state kaisi manage hoti hai.</p>
      </section>

      <section id="connection-flow">
        <h2 style={S.h2}>Connection Flow Foundation</h2>
        <p style={S.p}>Client LB VIP pe connect karta hai — TCP handshake complete hota hai. LB backend select karta hai aur backend ko traffic forward karta hai. Return path explicitly route hona chahiye. Failures gracefully handle honi chahiye.</p>
      </section>

      <section id="full-proxy">
        <h2 style={S.h2}>Full Proxy Architecture</h2>
        <p style={S.p}>Full proxy mode mein LB do independent TCP connections maintain karta hai: ek client ke saath, ek backend ke saath. Client directly backend se nahi baat karta.</p>
        <Figure caption="Full proxy model — two independent connection contexts"><FullProxyModel /></Figure>
        <Callout type="important" title="Full Proxy ≠ All LBs">
          Sab load balancers full proxy nahi hote. L4 forwarding architectures bhi exist karti hain. Capabilities (TLS termination, header modification, connection reuse) platform aur configuration pe depend karti hain.
        </Callout>
      </section>

      <section id="forwarding-models">
        <h2 style={S.h2}>Forwarding / Non-Full-Proxy Models</h2>
        <p style={S.p}>L4 forwarding architectures mein LB destination translation ke saath traffic forward karta hai — full proxy connection context nahi hota. Lower overhead lekin L7 visibility limited ya absent hoti hai.</p>
      </section>

      <section id="packet-address-journey">
        <h2 style={S.h2}>Packet Address Journey</h2>
        <Figure caption="Packet address journey — SNAT aur non-SNAT architectures mein address changes"><PacketAddressJourney /></Figure>
        <Callout type="warning" title="Client IP Preservation">
          Full-proxy mein client IP preservation at network layer ke liye transparent proxy mode ya platform-specific capability required — default nahi hai. Forwarding architectures mein client IP network layer pe preserve hoti hai lekin return routing explicitly design karna padta hai.
        </Callout>
      </section>

      <section id="destination-translation">
        <h2 style={S.h2}>Destination Translation Foundation</h2>
        <p style={S.p}>Client VIP:443 → LB destination translates → backend:8443. Return path mein reverse translation — backend:8443 → VIP:443 taaki client ko valid response milti hai.</p>
      </section>

      <section id="snat">
        <h2 style={S.h2}>Source NAT — SNAT</h2>
        <p style={S.p}>SNAT source IP translate karta hai — backend request mein source IP LB-controlled address ban jaati hai. Backend us address pe respond karta hai → response LB ko jaati hai.</p>
        <Figure caption="SNAT return path — without vs with SNAT"><SnatReturnPath /></Figure>
        <Callout type="important" title="SNAT + Routing Together">
          SNAT aur correct routing dono milke return path solve karte hain. SNAT akela incorrect routes override nahi kar sakta.
        </Callout>
      </section>

      <section id="without-snat">
        <h2 style={S.h2}>Without SNAT</h2>
        <p style={S.p}>SNAT nahi hai toh backend original client IP dekhta hai aur response directly client ko bhej sakta hai — LB bypass ho sakta hai.</p>
        <p style={S.p}>Prevention ke liye routing design required: backend default gateway = LB, ya client subnets ke liye static routes via LB. Internet-facing applications ke liye per-subnet static routes impractical hain — SNAT ya default gateway approach use hoti hai.</p>
      </section>

      <section id="symmetric-asymmetric">
        <h2 style={S.h2}>Symmetric vs Asymmetric Traffic</h2>
        <p style={S.p}>Symmetric: request aur response dono LB se. DSR intentionally asymmetric hai — request via LB, response direct to client. Stateful inspection return path pe possible nahi hoti DSR mein.</p>
      </section>

      <section id="dsr">
        <h2 style={S.h2}>Direct Server Return — DSR</h2>
        <Figure caption="Direct Server Return — inbound via LB, return direct to client"><DirectServerReturn /></Figure>
        <p style={S.p}>DSR useful hai jab response size request se bahut zyada ho. LB limitations: VIP backend pe configure karni padti hai (OS-specific), ARP/ND suppression required, L7 return-path inspection impossible, TLS backend pe. DSR persistence inbound traffic pe maintain kar sakta hai.</p>
      </section>

      <section id="one-arm-deep">
        <h2 style={S.h2}>One-Arm Traffic Flow — Deeper View</h2>
        <p style={S.p}>One-arm mein SNAT typically preferred hai — routing configuration backends pe minimal. Tradeoff: client IP visibility at backend.</p>
      </section>

      <section id="two-arm-deep">
        <h2 style={S.h2}>Inline / Two-Arm Traffic Flow — Deeper View</h2>
        <p style={S.p}>Two-arm mein return path explicitly route hona chahiye. Backends ka default gateway LB hona chahiye ya client subnets ke liye static routes. Packet capture se verify karo — assume mat karo.</p>
      </section>

      <section id="connection-table">
        <h2 style={S.h2}>Connection Table / Flow State</h2>
        <p style={S.p}>LB active connections ka state maintain karta hai. Finite capacity — resource limits platform pe dependent. Table exhaustion → new connections rejected.</p>
        <Figure caption="LB connection/flow state table — conceptual representation"><ConnectionStateTable /></Figure>
      </section>

      <section id="tcp-handshake">
        <h2 style={S.h2}>TCP Connection Establishment</h2>
        <p style={S.p}>Full proxy mein do TCP handshakes: client ↔ LB, phir LB ↔ backend. Yeh serial hona zaroori nahi — platforms preconnect ya pool karte hain. L4 forwarding mein single logical connection.</p>
      </section>

      <section id="connection-reuse">
        <h2 style={S.h2}>Connection Reuse / Multiplexing Foundation</h2>
        <p style={S.p}>Full proxy mein LB backend connections pool kar sakta hai. HTTP/1.1 keep-alive: ek connection pe sequential requests. HTTP/2 multiplexing: ek connection pe concurrent streams. Different mechanisms — platform, protocol, configuration matter karte hain.</p>
      </section>

      <section id="http-keepalive">
        <h2 style={S.h2}>HTTP Keep-Alive and Load Distribution</h2>
        <p style={S.p}>Per-connection-selection mein ek connection ke sab requests same backend — algorithm only new connection pe. Per-request selection (L7 full proxy) mein har request independent ho sakti hai.</p>
      </section>

      <section id="timeouts">
        <h2 style={S.h2}>Timeouts</h2>
        <p style={S.p}>Key timeout types (exact names platform-specific): client-side idle, server-side response, connection establishment, keep-alive idle. Server-side timeout too short → LB terminates before backend responds → client error.</p>
      </section>

      <section id="backend-failure-active">
        <h2 style={S.h2}>Backend Failure During Active Connection</h2>
        <p style={S.p}>Active connection ke dauran backend fail ho toh detection: TCP RST, response timeout, health probe failure. Failure ke baad behavior: retry (idempotent requests, platform dependent), RST to client, ya graceful error. Non-idempotent operations pe automatic retry risky.</p>
      </section>

      <section id="rst-foundation">
        <h2 style={S.h2}>Connection Reset — RST Foundation</h2>
        <p style={S.p}>TCP RST connection abruptly terminate karta hai. RST source attribution troubleshooting mein important — packet capture at multiple points se exactly kahan RST originate hua pata chalta hai.</p>
      </section>

      <section id="client-ip-preservation">
        <h2 style={S.h2}>Client IP Preservation</h2>
        <p style={S.p}>SNAT ke saath network layer pe client IP hidden hoti hai. Solutions: X-Forwarded-For header (trust sirf trusted LB infrastructure se), PROXY Protocol (TCP level), transparent proxy mode (platform-specific).</p>
        <Callout type="important" title="Header Trust">
          RFC 7239 Forwarded header define karta hai. Format aur order platform-specific — blind trust mat karo. Backends sirf trusted LB infrastructure se headers accept karein.
        </Callout>
      </section>

      <section id="port-translation">
        <h2 style={S.h2}>Port Translation</h2>
        <p style={S.p}>VIP aur backend port different ho sakte hain. Client VIP:443 → LB → backend:8443. Return path mein reverse. Full proxy mein LB-assigned source port bhi use hota hai backend connection mein.</p>
      </section>

      <section id="return-path-ts">
        <h2 style={S.h2}>Return Path Troubleshooting Foundation</h2>
        <p style={S.p}>Return path failure most common deployment-day issue. Symptoms: request LB pe, backend selected, traffic forward, lekin client ko response nahi. Root cause: backend response LB se nahi guzar raha. Multi-point packet capture definitively locate karta hai.</p>
      </section>

      <section id="broken-return-path">
        <h2 style={S.h2}>Practical Scenario — Broken Return Path</h2>
        <p style={S.p}>Inline LB, SNAT nahi, backend default gateway = core router (not LB). Problem: backend reply → core router → user directly — LB bypass. Fix: SNAT apply, ya backend default gateway = LB, ya static routes for client subnets via LB.</p>
      </section>

      <section id="p2-mistakes">
        <h2 style={S.h2}>Common Engineering Mistakes</h2>
        <p style={S.p}><strong>"Two-arm placement = return automatically through LB."</strong> Nahi. Routing explicitly ensure karna padta hai.</p>
        <p style={S.p}><strong>"SNAT apply kiya, kaam ho gaya."</strong> SNAT + correct routing together work karta hai.</p>
        <p style={S.p}><strong>"Client IP dekhna hai, SNAT hatao."</strong> X-Forwarded-For ya PROXY Protocol consider karo instead.</p>
      </section>

      <section id="p2-takeaways">
        <h2 style={S.h2}>Phase 2 Key Takeaways</h2>
        <ul style={S.ul}>
          <li>Full proxy do independent TCP connections maintain karta hai</li>
          <li>SNAT return path problem solve karta hai — client IP hidden hoti hai network layer pe</li>
          <li>DSR intentionally asymmetric — return path inspection impossible, backend VIP owns</li>
          <li>Connection state table finite capacity hai — platform-specific limits</li>
          <li>Return path must be validated with packet capture</li>
          <li>Client IP preservation ke multiple mechanisms — trust model carefully design karo</li>
        </ul>
      </section>

      {/* ═══════════════════════════════ PHASE 3 ═══════════════════════════════ */}

      <section id="p3-orientation">
        <h2 style={S.h2}>Phase 3 Orientation</h2>
        <p style={S.p}>Phase 3 mein deeper jaayenge: health monitoring ki depth, algorithms ka real behavior, persistence ka complete model, L7 content routing, aur backend lifecycle management.</p>
      </section>

      <section id="health-why">
        <h2 style={S.h2}>Health Monitoring — Why It Exists</h2>
        <p style={S.p}>Backend server failure inevitable hai. Active monitoring ensures degraded infrastructure silently users ko affect nahi karta. Bina monitoring ke, LB failed backends pe traffic bhejta rahega.</p>
      </section>

      <section id="monitor-types">
        <h2 style={S.h2}>Health Monitor Types</h2>
        <Figure caption="Health depth model — monitoring depth service requirements se match karna chahiye"><HealthDepthModel /></Figure>
      </section>

      <section id="tcp-monitor">
        <h2 style={S.h2}>TCP Health Monitor</h2>
        <p style={S.p}>TCP monitor port pe connection attempt karta hai. Port open → pass. Refuse/timeout → fail. Sirf proves karta hai ki port listening hai — application health nahi.</p>
      </section>

      <section id="http-monitor">
        <h2 style={S.h2}>HTTP / HTTPS Health Monitor</h2>
        <p style={S.p}>HTTP monitor configured path pe GET karta hai, response status check karta hai. Success criteria configured — typical 200/2xx, platform/config dependent.</p>
        <p style={S.p}>HTTPS monitor TLS connection establish karta hai phir HTTP request. TLS certificate validation behavior platform aur config specific hai. Health probe may pass even with invalid user-facing certificate — strict validation may not be default.</p>
        <Callout type="warning" title="HTTP 200 ≠ Application Healthy">
          Backend 200 return kar sakta hai while application completely broken hai — agar endpoint sirf hardcoded "ok" return karta hai.
        </Callout>
      </section>

      <section id="app-aware-health">
        <h2 style={S.h2}>Application-Aware Health Check</h2>
        <p style={S.p}>Application-aware probe response body ya specific content check karta hai. Most reliable — lekin health endpoint implementation quality pe depend karta hai. L7 content inspection ke liye HTTP monitor TLS terminate karne ke baad hi HTTP body dekh sakta hai.</p>
      </section>

      <section id="active-passive-health">
        <h2 style={S.h2}>Active vs Passive Health Signals</h2>
        <p style={S.p}>Active: LB periodically probe send karta hai — explicit, scheduled. Passive: LB observe karta hai actual user traffic behavior. Passive signals typically formal state change trigger nahi karte — platform-specific. Dono complementary hain.</p>
      </section>

      <section id="health-thresholds">
        <h2 style={S.h2}>Health Check Interval, Timeout and Thresholds</h2>
        <p style={S.p}>Interval: probes ke beech time. Timeout: probe response ka maximum wait. Fall threshold: consecutive failures before ineligible. Rise threshold: consecutive successes before eligible wapas.</p>
        <Callout type="warning" title="No Universal Formula">
          Optimal values service characteristics pe depend karte hain. Platform-specific documentation se guidance lo.
        </Callout>
      </section>

      <section id="health-state-transitions">
        <h2 style={S.h2}>Health State Transitions</h2>
        <Figure caption="Backend health state transitions — fall/rise threshold based state machine"><HealthStateTransition /></Figure>
      </section>

      <section id="health-flapping">
        <h2 style={S.h2}>Health Check Flapping</h2>
        <p style={S.p}>Flapping: backend repeatedly eligible/ineligible toggle. Rise/fall thresholds reduce karte hain flapping. Agar ho raha hai — root cause investigate karo, sirf thresholds increase mat karo.</p>
      </section>

      <section id="algorithm-decision">
        <h2 style={S.h2}>Load Balancing Algorithm — Decision Model</h2>
        <p style={S.p}>Algorithm ek factor hai — health eligibility, persistence, L7 policy sab bhi selection affect karte hain. Exact interaction platform-specific hai.</p>
        <Figure caption="Persistence vs algorithm — conceptual interaction (not internal processing order)"><PersistenceVsAlgorithm /></Figure>
      </section>

      <section id="round-robin-deep">
        <h2 style={S.h2}>Round Robin — Deeper View</h2>
        <p style={S.p}>Scheduling unit — per-connection ya per-request — proxy mode aur protocol pe depend karta hai. Per-connection mein long-lived connection same backend pe. Per-request (L7 full proxy) mein har request independent.</p>
        <Callout type="warning" title="Equal Load ≠ Round Robin">
          Request duration variance ke saath load unequal hoga. Variable durations ke liye Least Connections better hai.
        </Callout>
      </section>

      <section id="weighted-round-robin">
        <h2 style={S.h2}>Weighted Round Robin</h2>
        <p style={S.p}>Higher weight = more traffic (proportional, ratio illustrative — actual algorithm implementation varies). Different capacity servers ke liye useful.</p>
      </section>

      <section id="least-connections">
        <h2 style={S.h2}>Least Connections</h2>
        <p style={S.p}>Fewest active connections wale eligible backend ko select karta hai. Variable duration requests ke liye better than Round Robin. Health check connections typically count nahi hote (implementation varies). Resource utilization (CPU/memory) nahi jaanta.</p>
      </section>

      <section id="weighted-least-conn">
        <h2 style={S.h2}>Weighted Least Connections</h2>
        <p style={S.p}>Least Connections + weight. Mixed capacity servers ke liye — powerful servers proportionally more load receive karte hain.</p>
      </section>

      <section id="hash-selection">
        <h2 style={S.h2}>Hash-Based Selection</h2>
        <p style={S.p}>Configured key ka hash → backend select. Hash ≠ persistence. Pool change hash distribution disrupt karta hai. Consistent hashing disruption reduce karta hai lekin eliminate nahi.</p>
        <Callout type="warning" title="Source IP Hash aur NAT">
          Corporate NAT mein thousands users ek source IP share karte hain. Source IP hash → heavy concentration on one backend. NAT-heavy environments mein carefully evaluate karo.
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
        <p style={S.p}>Basic algorithms nahi jaante: backend CPU, memory pressure, request complexity, application queue depth, actual response time (unless platform-specific algorithm considers it).</p>
      </section>

      <section id="persistence-why">
        <h2 style={S.h2}>Persistence / Stickiness — Why It Exists</h2>
        <p style={S.p}>Kuch applications user session state local server pe store karti hain. Agar subsequent requests different backend ko jaayein, session state missing hogi. Persistence ensure karta hai same client ke requests same backend ko jaayein — jab woh backend eligible ho.</p>
      </section>

      <section id="persistence-vs-algo">
        <h2 style={S.h2}>Persistence ≠ Load Balancing Algorithm</h2>
        <p style={S.p}>Persistence algorithm selection ko influence ya bypass kar sakta hai — exact behavior platform-specific. Sirf "preferred backend" suggest karta hai when eligible. Heavy persistence use distribution imbalance create kar sakta hai.</p>
      </section>

      <section id="source-ip-persistence">
        <h2 style={S.h2}>Source IP Persistence</h2>
        <p style={S.p}>Source IP affinity key ke roop mein. NAT environments mein: thousands users ek IP share karte hain — few affinity entries = very heavy traffic concentration. Entry count traffic volume reflect nahi karta. IPv6 privacy extensions bhi affect karte hain.</p>
      </section>

      <section id="cookie-persistence">
        <h2 style={S.h2}>Cookie-Based Persistence</h2>
        <p style={S.p}>LB ya application cookie set karta hai jo backend affinity encode karta hai. LB-generated cookie: value backend identity obscure form mein. Evaluate: Secure, HttpOnly, SameSite attributes application requirements ke basis pe.</p>
      </section>

      <section id="cookie-flow">
        <h2 style={S.h2}>Cookie Persistence Traffic Flow</h2>
        <Figure caption="Cookie persistence flow — first request cookie set, subsequent requests affinity"><CookiePersistenceFlow /></Figure>
        <Callout type="important" title="Cookie Implementation (FA-C1 applied)">
          Persistence implementation varies: server-side table entries (table-based) ya client-side cookie encoding (cookie-based, no server-side table). Mechanism persistence type aur platform pe depend karta hai.
        </Callout>
      </section>

      <section id="persisted-backend-fails">
        <h2 style={S.h2}>What If Persisted Backend Fails?</h2>
        <p style={S.p}>Persisted backend fail hone pe fallback: new backend select via algorithm, error return, ya pool-down behavior — platform aur configuration dependent. Session state jo failed backend pe stored thi permanently lost hai regardless of LB behavior.</p>
      </section>

      <section id="persistence-timeout">
        <h2 style={S.h2}>Persistence Timeout</h2>
        <p style={S.p}>Entry expire hoti hai inactivity ke baad. Too short → affinity lost mid-session. Too long → stale entries, distribution imbalance. Server-side table mein entries table space consume karte hain; cookie-based client-side encoding mein different resource implications.</p>
      </section>

      <section id="persistence-app-design">
        <h2 style={S.h2}>Persistence and Application Design</h2>
        <p style={S.p}>Better approach: stateless application design — session state shared external store mein (Redis, database). Any backend any request serve kar sakta hai. WebSocket connections persistence require karte hain connection lifetime ke liye — different from generic HTTP persistence.</p>
      </section>

      <section id="l7-content-switching">
        <h2 style={S.h2}>L7 Content Switching</h2>
        <p style={S.p}>L7 LB HTTP content ke basis pe alag pools pe route kar sakta hai — single VIP pe multiple services.</p>
        <Figure caption="L7 content routing — host aur path based routing to different pools"><L7ContentRouting /></Figure>
        <Callout type="warning" title="TLS Termination Required">
          HTTP Host header aur path visibility ke liye TLS terminate hona zaroori hai. TLS passthrough mein HTTP content invisible. SNI routing alag hai — decryption ke bina possible.
        </Callout>
      </section>

      <section id="host-routing">
        <h2 style={S.h2}>Host-Based Routing</h2>
        <p style={S.p}>HTTP Host header (ya HTTP/2 <code>:authority</code> pseudo-header) ke basis pe routing. Same VIP:443 pe alag backends — <code>api.example.com</code> aur <code>portal.example.com</code> alag pools. H2 primarily <code>:authority</code> use karta hai.</p>
      </section>

      <section id="path-routing">
        <h2 style={S.h2}>Path-Based Routing</h2>
        <p style={S.p}>URL path ke basis pe routing — <code>/api/*</code> → API pool, <code>/images/*</code> → static pool. Matching order matters — platform-specific evaluation order verify karo.</p>
      </section>

      <section id="header-routing">
        <h2 style={S.h2}>Header-Based Routing</h2>
        <p style={S.p}>Specific HTTP headers pe routing.</p>
        <Callout type="warning" title="Header Trust">
          Client-controlled headers arbitrary values contain kar sakte hain. Routing decisions ke liye sirf validated/trusted headers use karo.
        </Callout>
      </section>

      <section id="l7-policy-eval">
        <h2 style={S.h2}>L7 Policy Evaluation</h2>
        <p style={S.p}>L7 policies typically ordered rules — first match wins ya most-specific match (platform-specific). Default/catch-all rule configure karo — bina catch-all ke unmatched requests error ya drop ho sakti hain.</p>
      </section>

      <section id="backend-draining">
        <h2 style={S.h2}>Backend Draining / Graceful Maintenance</h2>
        <Figure caption="Backend drain aur ramp-up lifecycle — planned maintenance phases"><DrainRampLifecycle /></Figure>
        <p style={S.p}>Drain mode: new work admitted nahi hota per drain semantics (semantics: protocol/platform specific). Existing work complete hone diya jaata hai ya drain timeout pe terminate hota hai.</p>
      </section>

      <section id="drain-vs-down">
        <h2 style={S.h2}>Draining vs Marking Down</h2>
        <p style={S.p}><strong>Drain:</strong> Planned, graceful — new work stops per drain semantics, existing completes. Operator-initiated.</p>
        <p style={S.p}><strong>Force Down:</strong> Immediate — all traffic stops. Health failure ya emergency removal.</p>
      </section>

      <section id="slow-start">
        <h2 style={S.h2}>Slow Start / Ramp-Up</h2>
        <p style={S.p}>Naye backend pe traffic gradually increase karta hai — cold cache, JIT, connections warm hone deta hai. Platform support aur initiation mechanism vary karte hain — universally supported nahi.</p>
      </section>

      <section id="connection-limits">
        <h2 style={S.h2}>Connection Limits</h2>
        <p style={S.p}>Per-backend connection limits configure kiye ja sakte hain. Limit reach hone pe behavior (queue, reject, route elsewhere) platform pe depend karta hai. Per-member rate limiting distinct hai.</p>
      </section>

      <section id="priority-pools">
        <h2 style={S.h2}>Priority / Failover Pools</h2>
        <p style={S.p}>Primary pool empty → fallback pool use hoti hai. Local failover mechanism hai — GSLB ya full DR se different. Same LB infrastructure pe. Pool-down fallback explicitly configured hona chahiye.</p>
      </section>

      <section id="practical-p3">
        <h2 style={S.h2}>Practical Application Example</h2>
        <p style={S.p}>3 app servers, Least Connections, cookie persistence. APP02 health fails — users with APP02 affinity get fallback backend. APP02 recovers → rise threshold met → slow-start (if configured) → gradual re-admission. Illustrative — actual behavior configuration pe dependent.</p>
      </section>

      <section id="ts-health-selection">
        <h2 style={S.h2}>Troubleshooting Health vs Selection</h2>
        <Figure caption="Backend selection troubleshooting tree — systematic diagnostic sequence (not processing order)"><SelectionTsTree /></Figure>
      </section>

      <section id="p3-mistakes">
        <h2 style={S.h2}>Common Engineering Mistakes</h2>
        <p style={S.p}><strong>"Persistence = automatic session continuity."</strong> Backend fail → affinity disrupted, session state lost.</p>
        <p style={S.p}><strong>"Source IP persistence = solved."</strong> NAT mein thousands users → one entry → one backend overloaded.</p>
        <p style={S.p}><strong>"Health check passing = all fine."</strong> Shallow endpoint application bugs catch nahi karta.</p>
        <p style={S.p}><strong>"L7 routing without TLS terminate."</strong> HTTPS content visibility ke liye TLS termination required. SNI ≠ HTTP Host.</p>
      </section>

      <section id="p3-takeaways">
        <h2 style={S.h2}>Phase 3 Key Takeaways</h2>
        <ul style={S.ul}>
          <li>Health monitor depth service requirements match karna chahiye</li>
          <li>Fall/rise thresholds flapping prevent karte hain</li>
          <li>Algorithms load distribute karte hain — equal load guarantee nahi</li>
          <li>Persistence preferred backend suggest karta hai — failure par session lost</li>
          <li>Cookie persistence NAT environments mein better than source IP</li>
          <li>L7 routing ke liye TLS termination required; SNI different hai</li>
          <li>Drain graceful maintenance; force-down emergency ke liye</li>
        </ul>
      </section>

      {/* ═══════════════════════════════ PHASE 4 ═══════════════════════════════ */}

      <section id="p4-orientation">
        <h2 style={S.h2}>Phase 4 Orientation</h2>
        <p style={S.p}>Phase 4 covers advanced LB topics: TLS handling modes, HTTP/2 aur HTTP/3 behavior, GSLB, aur observability stack.</p>
      </section>

      <section id="tls-problem">
        <h2 style={S.h2}>TLS Offload — The Problem It Solves</h2>
        <p style={S.p}>TLS per-server: certificate management per server, CPU overhead per server, L7 inspection impossible at LB. TLS offload at LB: single cert management point, TLS processing centralized, L7 inspection possible.</p>
      </section>

      <section id="tls-modes">
        <h2 style={S.h2}>TLS Offload vs Re-Encryption vs Passthrough</h2>
        <Figure caption="TLS handling modes — offload, re-encryption, aur passthrough"><TlsHandlingModes /></Figure>
        <ul style={S.ul}>
          <li><strong>TLS Offload:</strong> LB terminate → backend HTTP (plaintext). L7 visible, cert at LB.</li>
          <li><strong>TLS Re-encryption:</strong> LB terminate → naya TLS to backend. L7 visible, E2E encryption.</li>
          <li><strong>TLS Passthrough:</strong> No decrypt. L7 HTTP invisible. Backend TLS owns.</li>
        </ul>
        <p style={S.p}>Upstream TLS termination: kuch architectures mein CDN, WAF, ya upstream proxy pe TLS terminate hoti hai LB se pehle. LB plaintext receive karta hai aur L7 inspection bina TLS terminate kiye possible hai — return path encryption design karo explicitly.</p>
      </section>

      <section id="cert-management">
        <h2 style={S.h2}>Certificate Management at the LB</h2>
        <p style={S.p}>SNI-based cert selection, expiry monitoring, chain completeness, HA pair sync — sab LB operations responsibility jab TLS LB pe terminate hoti hai. Key security: private keys sensitive — HSM high-security environments mein.</p>
      </section>

      <section id="mtls">
        <h2 style={S.h2}>Client Certificate Authentication (mTLS)</h2>
        <p style={S.p}>mTLS mein client certificate bhi validate hota hai. LB identity backend ko header mein forward kar sakta hai.</p>
        <Callout type="warning" title="mTLS Header Trust">
          Identity headers sirf trusted, controlled LB infrastructure se accept karein — arbitrary client header injection authentication bypass kar sakta hai.
        </Callout>
      </section>

      <section id="http2-lb">
        <h2 style={S.h2}>HTTP/2 — What Changes for Load Balancing</h2>
        <Figure caption="HTTP/2 per-connection vs per-stream, aur HTTP/3 QUIC behavior"><Http2Http3LbBehavior /></Figure>
        <p style={S.p}>Per-connection selection (common): single client TCP connection ke sab streams same backend. Per-stream (H2 proxy-aware): har stream independently route — platform support required.</p>
      </section>

      <section id="http3-quic">
        <h2 style={S.h2}>HTTP/3 and QUIC — Load Balancing Implications</h2>
        <p style={S.p}>HTTP/3 TCP use nahi karta — QUIC over UDP. Integrated TLS 1.3, stream multiplexing, connection migration. 0-RTT replay risk — security design decision. LB QUIC support varies — many block QUIC (HTTP/2 fallback force).</p>
      </section>

      <section id="gslb-foundation">
        <h2 style={S.h2}>GSLB — Global Server Load Balancing Foundation</h2>
        <Figure caption="GSLB architecture — health-aware DNS-based datacenter selection"><GslbArchitecture /></Figure>
        <p style={S.p}>GSLB ≠ local LB. GSLB routes to datacenter; local LB distributes within. DNS failover: TTL, resolver caching, client caching, connection reuse sab affect karte hain — never as fast as local health-check failover.</p>
      </section>

      <section id="gslb-policies">
        <h2 style={S.h2}>GSLB Routing Policies</h2>
        <ul style={S.ul}>
          <li><strong>Geographic:</strong> Client location. EDNS Client Subnet accuracy improve karta hai — accuracy varies.</li>
          <li><strong>Performance:</strong> Lowest measured latency (measurement method varies).</li>
          <li><strong>Health-based failover:</strong> Site health fail → traffic elsewhere.</li>
          <li><strong>Weighted:</strong> Proportional distribution across sites.</li>
        </ul>
      </section>

      <section id="gslb-ttl">
        <h2 style={S.h2}>GSLB and TTL Management</h2>
        <p style={S.p}>Low TTL = faster failover potential, higher DNS query rate. Ultra-low TTL some resolvers ignore karte hain. Tradeoff: lower TTL = faster failover, less caching; higher TTL = slower failover, more caching.</p>
      </section>

      <section id="lb-metrics">
        <h2 style={S.h2}>Load Balancer Observability — Metrics</h2>
        <Figure caption="LB observability stack — metrics, access logs, health logs"><ObservabilityStack /></Figure>
        <p style={S.p}>Key metrics: active connections, connections/second, error rate per VIP/backend, backend response time, LB CPU, connection table fill percentage.</p>
      </section>

      <section id="lb-access-logs">
        <h2 style={S.h2}>Load Balancer Observability — Access Logs</h2>
        <p style={S.p}>Per-request detail: client IP (config-dependent — may be SNAT address), VIP, backend, status, bytes, duration, persistence, TLS info. SNAT ke saath original client IP ke liye X-Forwarded-For integration required.</p>
      </section>

      <section id="lb-health-logs">
        <h2 style={S.h2}>Load Balancer Observability — Health Check Logs</h2>
        <p style={S.p}>State change events: probe results, eligible/ineligible transitions, drain/admin events, timestamps. Root cause analysis ke liye critical — exactly kaun sa backend fail hua aur kab.</p>
      </section>

      <section id="lb-alerting">
        <h2 style={S.h2}>Load Balancer Observability — Alerting</h2>
        <p style={S.p}>Alert on: backend state change, pool with fewer than N eligible members, error rate threshold, connection table utilization high, certificate expiry approaching. Unconfigured alert condition invisible — regular coverage review karo.</p>
      </section>

      <section id="distributed-tracing">
        <h2 style={S.h2}>Distributed Tracing at the LB</h2>
        <p style={S.p}>LB trace headers (e.g., <code>traceparent</code>, <code>X-B3-TraceId</code>) receive, preserve, forward kar sakta hai. Formats examples hain — specific format deployment aur observability stack pe depend karta hai.</p>
      </section>

      <section id="observability-example">
        <h2 style={S.h2}>Practical Observability Example</h2>
        <p style={S.p}>Error rate metric spike. Access logs → APP03 5xx. Health logs → APP03 HTTPS probe failing (timeout). Root cause: application crash — TCP port alive lekin application not responding. Three-layer approach precisely locates failure without manual server-by-server investigation.</p>
      </section>

      <section id="p4-mistakes">
        <h2 style={S.h2}>Common Engineering Mistakes</h2>
        <p style={S.p}><strong>"TLS offload = plaintext always."</strong> Re-encryption bhi option hai.</p>
        <p style={S.p}><strong>"HTTP/2 = better distribution automatically."</strong> Per-connection mein same client ke streams same backend.</p>
        <p style={S.p}><strong>"GSLB = fast failover."</strong> DNS-based failover TTL/caching se bounded.</p>
        <p style={S.p}><strong>"Metrics enough."</strong> Per-backend issues access logs mein hote hain. State changes health logs mein.</p>
      </section>

      <section id="p4-takeaways">
        <h2 style={S.h2}>Phase 4 Key Takeaways</h2>
        <ul style={S.ul}>
          <li>TLS teen modes: offload, re-encrypt, passthrough — architecture decision</li>
          <li>Certificate lifecycle LB operations responsibility jab TLS terminates at LB</li>
          <li>HTTP/2 per-connection LB ≠ per-request — architecture determines</li>
          <li>HTTP/3 is QUIC/UDP — TCP terminology apply nahi hoti</li>
          <li>GSLB ≠ local LB — DNS-based, site-level failover</li>
          <li>Three observability layers: metrics + access logs + health logs</li>
        </ul>
      </section>

      {/* ═══════════════════════════════ PHASE 5 ═══════════════════════════════ */}

      <section id="p5-orientation">
        <h2 style={S.h2}>Phase 5 Orientation</h2>
        <p style={S.p}>Phase 5 covers production operations, troubleshooting framework, aur data center integration alongside firewalls, switches, routers, aur application tiers.</p>
      </section>

      <section id="ops-lifecycle">
        <h2 style={S.h2}>Operational Lifecycle Overview</h2>
        <ComparisonTable
          headers={["Domain", "What it involves"]}
          rows={[
            ["Configuration management", "VIP, pool, health, algorithm, persistence, certificate config accurate rakhna"],
            ["Health visibility", "Backend state monitor, degradation detect before users"],
            ["Change control", "Safe addition/removal of backends, VIP changes, algorithm changes"],
            ["Incident response", "Traffic failures diagnose aur resolve karna"],
            ["Capacity management", "LB aur backend resources saturation se pehle ensure karna"],
          ]}
        />
        <p style={S.p}>Chalta hua LB bina operational process ke sirf ignore ho raha hai jab tak kuch break nahi karta.</p>
      </section>

      <section id="config-management">
        <h2 style={S.h2}>Configuration Management</h2>
        <p style={S.p}>Configuration mein accurate rehna chahiye: virtual services, pools, health monitors, algorithms, persistence, certificates (aur expiry), HA config, administrative state.</p>
        <p style={S.p}>Configuration drift risk: changes jo dono HA peers tak nahi pahunchte — manual one-sided changes, sync failures, ya platform sync limitations. Automatic configuration sync platforms pe bhi sync success verify karo. Standby node failover pe different policy enforce karta hai — silent until disaster.</p>
        <p style={S.p}>Har change ke saath: change record, pre-change backup, post-change validation, rollback procedure documented pehle.</p>
      </section>

      <section id="backend-addition">
        <h2 style={S.h2}>Backend Addition</h2>
        <CodeBlock lang="text">{`1. Backend ready verify karo:
   - Application deployed aur started, port listening
   - Health endpoint responding correctly
   - For HTTPS backends: TLS config verify karo (cert validity, chain,
     cipher) — health probe may pass even with invalid user-facing cert
   - Dependencies initialized

2. Administratively inactive state mein add karo (where platform supports):
   - Traffic before readiness confirmation rokta hai
   - State name aur pre-disabled support: platform-specific

3. Health monitor validate karo:
   - Eligibility: first probe pe ya multiple successes: platform-specific

4. Member enable karo (slow-start where platform supports)

5. Monitor: traffic arriving, error rate normal, unexpected health failures`}</CodeBlock>
      </section>

      <section id="backend-removal">
        <h2 style={S.h2}>Backend Removal — Planned Maintenance</h2>
        <CodeBlock lang="text">{`1. Drain state (where platform supports):
   - New work per drain semantics stop (protocol/platform dependent)
   - Existing connections complete hone diya jaata hai

2. Monitor drain: active connection count

3. Wait ya drain timeout pe platform terminates remaining

4. Administratively disable ya remove

5. Maintenance perform karo

6. Re-enable se pehle readiness validate karo (same as addition steps)

7. Re-enable with monitoring`}</CodeBlock>
      </section>

      <section id="emergency-removal">
        <h2 style={S.h2}>Emergency Backend Removal</h2>
        <CodeBlock lang="text">{`1. Scope assess: kaun sa backend? Health monitoring detect kar raha hai?

2. Health monitoring NOT detecting:
   → Immediately administratively disable/force-down

3. Health monitoring detecting but threshold not reached:
   → Admin disable se threshold timing override karo

4. Verify: backend pool se removed, traffic no longer going there
5. Monitor remaining pool capacity
6. Investigate failed backend while offline`}</CodeBlock>
        <Callout type="warning" title="Detection Window">
          Health check detection window: failing backend probe failures accumulate karne tak traffic receive karta rahega. Actual time: probe timing, failure type, platform scheduling pe dependent. Manual override is window bypass karta hai aur faster hota hai confirmed failures pe.
        </Callout>
      </section>

      <section id="cert-operations">
        <h2 style={S.h2}>Certificate Operations</h2>
        <p style={S.p}>Jab TLS LB pe terminate hoti hai, certificate lifecycle LB operations responsibility hai.</p>
        <p style={S.p}><strong>Expiry tracking:</strong> Alert configure karo well in advance. Appropriate lead time organizational process complexity pe dependent — automated ACME renewal (shorter), enterprise PKI with approval processes (longer). Organization apna lead time define kare.</p>
        <p style={S.p}><strong>Update procedure:</strong> New cert + chain obtain → Subject/SAN/chain/expiry/CA validate → staging slot test (where supported; otherwise external TLS tool) → production apply maintenance window mein → post-change TLS verify → errors monitor.</p>
        <p style={S.p}><strong>HA pair sync:</strong> Dono nodes consistent state — inconsistency failover pe outage.</p>
      </section>

      <section id="algo-persistence-ops">
        <h2 style={S.h2}>Algorithm and Persistence Changes</h2>
        <p style={S.p}>Algorithm changes new connection/request selection affect karte hain — existing sessions current backends pe rahte hain, redistribute nahi hote. Existing imbalance natural session close hone tak persist karega regardless of new algorithm.</p>
        <p style={S.p}>Persistence changes: adding persistence creates new affinity — server-side table entries (table-based) ya client-side cookie encoding (cookie-based, no server-side table). Mechanism persistence type aur platform pe depend karta hai. Removing persistence: no new affinity, existing entries age out. Type change: old entries abandoned, new type begins.</p>
        <p style={S.p}>Changes safest hain low-traffic periods mein.</p>
      </section>

      <section id="ts-framework">
        <h2 style={S.h2}>Troubleshooting Framework</h2>
        <Figure caption="LB troubleshooting framework — three diagnostic zones (diagnostic sequence, not processing order)"><TsFramework /></Figure>
        <p style={S.p}><strong>Step 1 — Scope:</strong> Sab traffic VIP? → VIP-level. Specific backend? → Member. Specific clients? → Client/network. Specific requests? → L7/app. Intermittent under load? → Capacity.</p>
        <p style={S.p}><strong>Step 2 — Confirm LB view:</strong> Logs mein traffic? Virtual service active? Members eligible? Connection table entry?</p>
        <p style={S.p}><strong>Step 3 — Trace selected path.</strong></p>
        <p style={S.p}><strong>Step 4 — Locate failure layer:</strong> LB issue vs application vs network vs return path bypass.</p>
      </section>

      <section id="ts-vip-unreachable">
        <h2 style={S.h2}>Diagnosing No-Traffic / VIP Unreachable</h2>
        <CodeBlock lang="text">{`1. Network path to VIP functional?
2. Virtual service configured aur active? Correct port/protocol?
3. Pool ineligible kyon? Health failures? Admin disabled?
   Zero members? Each has different fix.
4. Upstream firewall blocking VIP?
5. HA state — expected node active?
6. TLS (HTTPS): handshake fail? Cert issue, cipher mismatch?`}</CodeBlock>
      </section>

      <section id="ts-partial-failures">
        <h2 style={S.h2}>Diagnosing Partial Backend Failures</h2>
        <CodeBlock lang="text">{`1. Specific backend causing failures? Per-backend error rates check karo
2. Health monitoring detecting? Endpoint too shallow?
3. Load-related? Failure rate traffic se increase hota hai?
4. Persistence imbalance?
   NAT: few entries = many users (entry count volume reflect nahi karta)
5. LB-to-specific-backend network issue?
6. Backend's own error logs?`}</CodeBlock>
      </section>

      <section id="ts-slow-response">
        <h2 style={S.h2}>Diagnosing Slow Response / Timeouts</h2>
        <CodeBlock lang="text">{`1. LB-side measurements: total aur backend response time
2. One backend ya all slow?
3. Slowness kahan se? Backend processing? LB-backend network latency?
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
          VLAN segmentation akela security isolation enforce nahi karta. Inter-VLAN traffic L3 routing pe depend karta hai. Firewall ya router VLAN boundaries pe enforce kare bina segmentation effective nahi. VLANs network segmentation mechanism hain — security enforcement nahi.
        </Callout>
      </section>

      <section id="routing-design">
        <h2 style={S.h2}>Routing Design Around the Load Balancer</h2>
        <p style={S.p}><strong>Model 1 — LB as default gateway:</strong> Simple, ensures return path via LB. All backend traffic goes through LB.</p>
        <p style={S.p}><strong>Model 2 — Static routes for client subnets:</strong> Client IP preserved at network layer — applies to forwarding/non-proxy architectures. In full-proxy, transparent proxy mode ya platform capability required. Internet-facing ke liye impractical (entire internet addresses). Controlled environments ke liye applicable.</p>
        <p style={S.p}><strong>Model 3 — SNAT:</strong> No backend routing config needed. Client IP not visible at network layer.</p>
        <Callout type="important" title="Validate with Capture">
          Route design go-live se pehle packet capture se validate karo — return traffic LB se guzar raha hai yeh prove karo.
        </Callout>
      </section>

      <section id="firewall-interaction">
        <h2 style={S.h2}>Interaction with Firewalls</h2>
        <p style={S.p}>Firewall: security enforcement. LB: service distribution. Internet → Firewall → LB → Backends.</p>
        <p style={S.p}>Firewall permit karo: client traffic to VIP, LB probe traffic to backends (probe source = LB address), LB-to-backend traffic, return traffic (stateless: explicit rules; stateful: established session return typically auto-permitted — verify), HA traffic, management access.</p>
        <ComparisonTable
          headers={["Problem", "Symptom", "Cause"]}
          rows={[
            ["Probe blocked", "Members ineligible without actual failure", "Firewall blocking probe from LB to backend"],
            ["SNAT unaccounted", "Traffic drops after LB", "Policy expects client IP, sees LB SNAT IP"],
            ["Return blocked", "Client gets nothing after backend responds", "Firewall blocking return path"],
            ["HA sync blocked", "HA pair out of sync", "Firewall blocking HA control/state traffic"],
          ]}
        />
        <p style={S.p}>Upstream TLS termination case (FA-C3): kuch architectures mein CDN, WAF, ya upstream proxy pe TLS terminate hoti hai LB se pehle. LB plaintext receive karta hai — L7 inspection possible bina TLS terminate kiye. Return path encryption design explicitly plan karo.</p>
      </section>

      <section id="switch-interaction">
        <h2 style={S.h2}>Interaction with Switches</h2>
        <Figure caption="LB switching environment — STP, PortFast, LAG, HA failover MAC behavior"><LbSwitchingEnvironment /></Figure>
        <p style={S.p}><strong>PortFast/Edge Port:</strong> LB-facing ports pe configure karo — STP transition delays avoid. Terminology vendor-specific.</p>
        <p style={S.p}><strong>LAG/LACP:</strong> Link redundancy. LB aur switch compatibility verify karo — LACP mode platform-specific.</p>
        <p style={S.p}><strong>HA failover MAC:</strong> Kuch LB implementations Gratuitous ARP (IPv4) ya Unsolicited NA (IPv6) send karte hain — adjacent switches MAC table update karte hain. Whether gARP/NA sent aur how quickly switches update: both LB aur switch behavior pe dependent. Specific environment mein verify karo.</p>
        <Callout type="warning" title="Switch Security Features">
          Static ARP entries HA failover updates prevent karte hain. Dynamic ARP Inspection (DAI) aur similar features gARP processing restrict kar sakte hain. Switch security policies verify karo — LB HA failover interference nahi hona chahiye.
        </Callout>
      </section>

      <section id="virtual-cloud-lb">
        <h2 style={S.h2}>Load Balancer in Virtualized / Cloud Environments</h2>
        <p style={S.p}><strong>Virtual LB:</strong> Resource sharing, hypervisor scheduling latency, virtual NIC limits, live migration brief interruption. High-performance deployments: CPU pinning, NUMA topology, dedicated vCPUs for TLS — platform/hypervisor specific.</p>
        <p style={S.p}><strong>Cloud-native LB:</strong> No appliance to operate, auto-scale (where supported), HA provider-managed, options limited to provider's exposure. On-premises aur cloud environments ke beech consistent operational processes deliberately plan karo.</p>
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
        <p style={S.p}>Per dimension: current peak utilization samjho, growth estimate, headroom determine karo failure scenario ke liye. Assessment judgement-based hai — koi universal formula nahi. Platform-specific documentation se validate karo.</p>
      </section>

      <section id="e2e-tracing">
        <h2 style={S.h2}>End-to-End Request Tracing</h2>
        <p style={S.p}>Multi-point packet capture definitive tool hai jab logs aur metrics nahi batate.</p>
        <Figure caption="8-point end-to-end traffic verification method"><E2eTrafficVerification /></Figure>
        <p style={S.p}>Always filter by VIP + client IP combination — unfiltered captures unusable volume. Most LBs ka built-in capture LB-perspective tak limited — backend ya client pe external capture needed for complete picture.</p>
      </section>

      <section id="dc-integration-example">
        <h2 style={S.h2}>Data Center Integration — Practical Example</h2>
        <Figure caption="Complete DC LB integration — internet se database tak, realistic HTTPS request path"><DcIntegrationFull /></Figure>
        <p style={S.p}><strong>Traffic flow:</strong> Client → DNS → VIP 203.0.113.50:443 → Perimeter FW → VLAN 100 → LB (TLS handling per mode, L7 policy, Least Connections → APP02) → APP02:8443 via VLAN 200 (SNAT or routing — design dependent) → response via LB → Client.</p>
        <p style={S.p}><strong>Health monitoring:</strong> LB → probe → APP01/02/03:8443/health via VLAN 200. Firewall VLAN 200 policy must permit probe traffic from LB probe source address. Return probe responses must be permitted back.</p>
        <Callout type="important" title="Return Path Validation">
          Return path (SNAT or routing) explicitly validate karo via packet capture — placement se assume mat karo. Yeh ek common architecture pattern hai, not a universal mandatory design.
        </Callout>
      </section>

      <section id="p5-mistakes">
        <h2 style={S.h2}>Common Operations Engineering Mistakes</h2>
        <p style={S.p}><strong>"Health check passing = backend healthy."</strong> Shallow probe port proves, not application. Probe depth service ke actual needs se match karo.</p>
        <p style={S.p}><strong>"Health check failing = backend broken."</strong> Probe path, firewall, timeout, certificate bhi causes hain. Distinguish before acting.</p>
        <p style={S.p}><strong>"LB healthy → service healthy."</strong> Application, database, CDN, DNS — sab LB ke baad independent hain. End-to-end validation separate hai.</p>
        <p style={S.p}><strong>"No alerts = no problems."</strong> Unconfigured conditions invisible. Regular alert coverage review karo.</p>
        <p style={S.p}><strong>"Two backends = sufficient HA."</strong> Shared failure domain analysis karo — shared dependency simultaneously fail kar sakta hai.</p>
        <p style={S.p}><strong>"Emergency change, no record."</strong> Post-emergency documentation mandatory — kya, kyun, kab.</p>
        <p style={S.p}><strong>"Persistence = session continuity guaranteed."</strong> Failed backend = affinity disrupted, session state lost regardless of LB behavior.</p>
        <p style={S.p}><strong>"Certificate renewal can wait."</strong> Renewal process delays ho sakti hain. Lead time organizational process pe based define karo.</p>
      </section>

      <section id="p5-takeaways">
        <h2 style={S.h2}>Phase 5 Key Takeaways</h2>
        <ul style={S.ul}>
          <li>Operations deployment ke baad bhi continuous hain</li>
          <li>Backend addition/removal defined sequence follow karo</li>
          <li>Health check failures verify karo — probe path, firewall, timeout bhi causes hain</li>
          <li>Return path validate karo with packet capture — placement se assume mat karo</li>
          <li>Firewall aur LB policy together plan karo — probe, HA, management sab permit</li>
          <li>Switch configuration HA failover affect karta hai — test aur verify karo</li>
          <li>Capacity planning per-dimension — no formula</li>
          <li>Multi-point capture definitive troubleshooting tool</li>
          <li>Application design aur LB configuration consistent hone chahiye</li>
          <li>Certificate lifecycle LB operations responsibility jab TLS terminates at LB</li>
        </ul>
      </section>

      {/* ═══════════════════════════════ GLOSSARY ═══════════════════════════════ */}

      <section id="glossary" style={{ marginTop: "3rem" }}>
        <h2 style={S.h2}>Glossary — Key Terms</h2>
        <ComparisonTable
          headers={["Term", "Definition"]}
          rows={[
            ["VIP (Virtual IP)", "Address jis pe clients connect karte hain — backend ka direct address nahi. Implementation platform/deployment dependent."],
            ["Backend Pool", "Eligible servers ka collection jo ek virtual service serve karte hain"],
            ["Fall Threshold", "Consecutive probe failures before backend marked ineligible"],
            ["Rise Threshold", "Consecutive successes before ineligible backend returns to eligible"],
            ["SNAT", "Source NAT — backend requests mein source IP translate to LB-controlled address"],
            ["DSR", "Direct Server Return — inbound via LB, response direct to client"],
            ["Full Proxy", "LB do independent connections maintain karta hai — client aur backend ke saath"],
            ["L4 LB", "Transport layer pe balancing — IP, port, protocol basis pe"],
            ["L7 LB", "Application layer pe balancing — HTTP headers, URL, cookies basis pe"],
            ["HA Pair", "Two LB nodes — active + standby — single point of failure avoid karne ke liye"],
            ["GSLB", "Global Server Load Balancing — DNS-based multi-datacenter routing with health"],
            ["TLS Offload", "LB pe TLS terminate, backend plaintext receive karta hai"],
            ["Drain State", "No new work per drain semantics; existing work complete hone diya jaata hai"],
            ["Config Drift", "HA pair mein divergent config — one node changes reach nahi hua"],
            ["Multi-point Capture", "Multiple network points pe simultaneous capture — break locate karne ke liye"],
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
