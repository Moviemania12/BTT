"use client";

import { Callout, ComparisonTable, Figure, S } from "../shared";
import TopicLink from "@/components/TopicLink";
import { sdWanContent } from "@/content/sd-wan";

import UnderlayOverlayDiagram from "../svg/UnderlayOverlayDiagram";
import ArchitecturePlanesDiagram from "../svg/ArchitecturePlanesDiagram";
import AppPathSelectionDiagram from "../svg/AppPathSelectionDiagram";
import SlaPathQualityDiagram from "../svg/SlaPathQualityDiagram";
import TroubleshootingFlowDiagram from "../svg/TroubleshootingFlowDiagram";
import BranchDcArchDiagram from "../svg/BranchDcArchDiagram";
import FinalArchitectureDiagram from "../svg/FinalArchitectureDiagram";

export default function Content() {
  return (
    <article>

      {/* ─── QUICK SUMMARY ─────────────────────────────────────────────── */}
      <section id="quick-summary">
        <h2 style={S.h2}>Quick Summary</h2>
        <p style={S.p}>
          SD-WAN (Software-Defined Wide Area Network) ek overlay architecture hai jo available WAN transports — MPLS, Internet broadband, LTE/5G — ke upar ek policy-driven, centrally managed network create karta hai. Physical transports replace nahi hote; SD-WAN unke upar operate karta hai.
        </p>
        <p style={S.p}>
          Key value: application-aware path selection, continuous path quality measurement (latency, jitter, packet loss), aur brownout detection — jo traditional routing provide nahi karta.
        </p>
        <Callout type="important" title="Is Article Ka Scope">
          Yeh article SD-WAN concepts vendor-neutral explain karta hai. Specific platform behavior, configuration commands, aur implementation details vary karte hain — official platform documentation always consult karo.
        </Callout>
      </section>

      {/* ─── FOUNDATION ────────────────────────────────────────────────── */}
      <section id="what-is-sdwan">
        <h2 style={S.h2}>What Is SD-WAN?</h2>
        <p style={S.p}>
          Traditional enterprise networking mein WAN connections — MPLS, leased lines, Internet — independently manage hote the, alag-alag hardware configurations ke saath, branch-by-branch. Routing decisions link state, routing protocol metrics, BFD/IP-SLA, ya policy-based routing pe based ho sakte the. Lekin yeh mechanisms typically application-level business intent ya real-time path quality (latency, jitter, loss) ke basis pe traffic steer karna inherently nahi support karte.
        </p>
        <p style={S.p}>
          SD-WAN iska approach fundamentally change karta hai. Yeh ek software layer hai jo WAN transport selection ko centrally policy-driven banata hai, continuously path quality measure karta hai, aur traffic ko application requirements aur business intent ke hisaab se best available path pe steer karta hai — application/business-policy-aware steering across available transports.
        </p>

        <section id="traditional-wan-limits">
          <h3 style={S.h3}>Traditional WAN Limitations</h3>
          <ComparisonTable
            headers={["Limitation", "Impact"]}
            rows={[
              ["Manual branch-by-branch configuration", "Slow deployment, inconsistent policy"],
              ["Link up/down binary visibility", "No brownout detection — degraded quality invisible"],
              ["Static routing decisions", "No application-aware path selection"],
              ["Single active path (with failover)", "WAN bandwidth underutilized"],
              ["No centralized visibility", "Difficult to correlate issues across sites"],
              ["MPLS-only for quality", "Expensive, long provisioning times"],
            ]}
          />
        </section>

        <section id="what-sdwan-provides">
          <h3 style={S.h3}>What SD-WAN Provides</h3>
          <ul style={S.ul}>
            <li>Centralized policy management across all sites</li>
            <li>Multiple transport types simultaneously (MPLS + Internet + LTE)</li>
            <li>Continuous path quality measurement (latency, jitter, loss)</li>
            <li>Application-aware traffic steering per policy</li>
            <li>Brownout detection — quality-based path avoidance</li>
            <li>Simplified branch deployment (zero-touch provisioning on some platforms)</li>
            <li>Centralized visibility and analytics</li>
          </ul>
          <Callout type="warning" title="SD-WAN Physical Transport Replace Nahi Karta">
            SD-WAN ek overlay hai. Physical WAN connections — MPLS circuit, Internet broadband, LTE SIM — abhi bhi exist karte hain. SD-WAN unhe replace nahi karta; unke upar ek intelligent control aur policy layer add karta hai. Underlay fail ho toh overlay paths affected hote hain.
          </Callout>
        </section>
      </section>

      {/* ─── UNDERLAY vs OVERLAY ───────────────────────────────────────── */}
      <section id="underlay-vs-overlay">
        <h2 style={S.h2}>Underlay vs Overlay</h2>
        <p style={S.p}>
          SD-WAN samajhne ke liye yeh distinction critical hai. Do separate layers hain — physical/transport layer (underlay) aur SD-WAN ki logical layer (overlay).
        </p>

        <Figure caption="SD-WAN underlay transports (physical) aur SD-WAN overlay (logical policy layer) — dono distinct layers hain">
          <UnderlayOverlayDiagram />
        </Figure>

        <section id="underlay">
          <h3 style={S.h3}>The Underlay</h3>
          <p style={S.p}>
            Underlay woh actual physical/logical transport connections hain jo sites ke beech data carry karte hain. Common underlay types:
          </p>
          <ComparisonTable
            headers={["Underlay Type", "Characteristics", "Typical Use"]}
            rows={[
              ["MPLS", "Private network, provider-managed QoS, predictable latency, expensive", "Primary path for latency-sensitive apps"],
              ["Internet (DIA)", "Public routing, variable quality, high bandwidth, cost-effective", "Secondary or primary with quality monitoring"],
              ["LTE/5G", "Wireless, mobile, typically higher latency, lower bandwidth", "Backup, remote sites, temporary connectivity"],
              ["Leased Line / P2P", "Dedicated physical circuit, fixed bandwidth, predictable", "High-reliability point-to-point links"],
            ]}
          />
          <p style={S.p}>
            Underlay failure — jaise ISP circuit down ho jaana ya physical link cut ho jaana — overlay ko directly affect karta hai. SD-WAN woh path ke upar kaam nahi kar sakta jo exist hi nahi karta.
          </p>
        </section>

        <section id="overlay">
          <h3 style={S.h3}>The Overlay</h3>
          <p style={S.p}>
            SD-WAN overlay ek logical network hai jo physical transports ke upar establish hota hai. SD-WAN edge devices tunnels ya logical paths create karte hain jo available underlay transports use karte hain.
          </p>
          <p style={S.p}>
            Overlay ke through: routing, policy enforcement, path quality monitoring, aur traffic steering hoti hai. Overlay "tunnel UP" hona iska matlab nahi hai ki path application-usable quality ka hai — underlay quality continuously monitor hoti hai.
          </p>
          <Callout type="important" title="Overlay Health ≠ Underlay Perfect">
            SD-WAN overlay tunnel establish ho sakta hai even when underlay quality degraded ho. Tunnel UP sirf logical connectivity prove karta hai. Actual latency, jitter, aur packet loss values separately measure hote hain — aur yeh values determine karte hain ki path application ke liye usable hai ya nahi.
          </Callout>
        </section>
      </section>

      {/* ─── ARCHITECTURE ──────────────────────────────────────────────── */}
      <section id="sdwan-architecture">
        <h2 style={S.h2}>SD-WAN Architecture</h2>
        <p style={S.p}>
          SD-WAN solutions typically three functional planes mein organize hoti hain — lekin actual implementation, co-location, aur terminology significantly vary karte hain platform to platform.
        </p>

        <Figure caption="SD-WAN ka three-plane model — Management, Control, aur Data planes. Actual co-location aur distribution platform-specific hai">
          <ArchitecturePlanesDiagram />
        </Figure>

        <section id="three-planes">
          <h3 style={S.h3}>Three Planes</h3>
          <ComparisonTable
            headers={["Plane", "Function", "What Fails if Unavailable"]}
            rows={[
              ["Management Plane", "Configuration, monitoring, zero-touch provisioning, analytics, software lifecycle", "New configs can't be pushed; monitoring blind; ZTP broken"],
              ["Control Plane", "Route distribution, policy distribution, path computation, tunnel orchestration", "New paths/routes may not converge; depends on architecture"],
              ["Data Plane", "Actual packet forwarding, tunnel operation, path measurement, policy enforcement", "Forwarding disrupted — this is the critical plane; impact depends on architecture"],
            ]}
          />
          <Callout type="important" title="Plane Separation Varies">
            Kuch platforms mein Control Plane centralized controller pe hoti hai. Dusron mein distributed edge devices pe. Kuch platforms Data aur Control Plane combine karte hain edges pe. Control/controller connectivity issues route or policy distribution aur related functions ko affect kar sakti hain — architecture pe depend karta hai. Management/orchestrator failure configuration, monitoring, visibility aur ZTP ko affect karta hai. Na Control Plane failure na Management Plane failure automatically existing data plane forwarding immediately rokti hai — exact behavior platform-specific hai. Platform documentation se specific behavior samjho.
          </Callout>
        </section>

        <section id="key-components">
          <h3 style={S.h3}>Key Components</h3>
          <p style={S.p}>
            <strong>SD-WAN Edge:</strong> Customer site pe physical ya virtual device jo WAN interfaces connect karta hai, tunnels establish karta hai, aur policy enforce karta hai. Edges typically branch, Data Center, hub ya cloud locations pe deploy hote hain — design pe depend karta hai.
          </p>
          <p style={S.p}>
            <strong>Controller / Control Component:</strong> Route distribution, policy distribution, aur path computation handle karta hai. Centralized ya distributed ho sakta hai.
          </p>
          <p style={S.p}>
            <strong>Orchestrator / Management System:</strong> Centralized configuration management, monitoring dashboard, aur analytics. Often cloud-hosted, on-premises bhi possible.
          </p>
          <p style={S.p}>
            <strong>Analytics / Monitoring:</strong> Path quality metrics, application performance data, aur flow logs. Kuch platforms separate analytics component rakhte hain.
          </p>
        </section>
      </section>

      {/* ─── SD-WAN EDGE ───────────────────────────────────────────────── */}
      <section id="sdwan-edge">
        <h2 style={S.h2}>SD-WAN Edge</h2>
        <p style={S.p}>
          SD-WAN Edge device woh point hai jahan physical WAN connectivity, SD-WAN overlay, aur LAN network meet karte hain. Yeh Data Plane ka core component hai.
        </p>

        <section id="branch-edge">
          <h3 style={S.h3}>Branch Edge</h3>
          <p style={S.p}>
            Branch edge pe typically multiple WAN interfaces hote hain (MPLS, Internet, LTE), ek ya zyada LAN interfaces, aur SD-WAN software. Functions may include:
          </p>
          <ul style={S.ul}>
            <li>WAN link monitoring aur path quality measurement</li>
            <li>Tunnel establishment over available underlays</li>
            <li>Application classification aur traffic steering</li>
            <li>Local routing (OSPF/BGP with LAN side)</li>
            <li>NAT for Internet-destined traffic (where configured)</li>
            <li>Local security functions (platform-dependent)</li>
            <li>Direct Internet Access (DIA) for designated traffic</li>
          </ul>
        </section>

        <section id="dc-edge">
          <h3 style={S.h3}>Data Center Edge</h3>
          <p style={S.p}>
            DC edge typically higher-capacity device hota hai jo multiple branch tunnels terminate karta hai aur DC internal network se connect karta hai. DC edge ke baad typically dedicated <TopicLink slug="firewall" variant="inline" /> hota hai security inspection ke liye.
          </p>
          <p style={S.p}>
            <strong>Virtual/Cloud Edge:</strong> Public cloud environments (AWS, Azure) mein virtual SD-WAN edge appliances cloud workloads ko SD-WAN fabric mein integrate karti hain. Yeh platform-specific capability hai.
          </p>
          <Callout type="warning" title="Edge Functions Vary">
            Har SD-WAN edge device har function provide nahi karta. Security services, routing protocols, aur NAT capabilities platform aur model pe depend karti hain. Platform documentation verify karo.
          </Callout>
        </section>
      </section>

      {/* ─── TUNNELS AND ROUTING ───────────────────────────────────────── */}
      <section id="tunnels-routing">
        <h2 style={S.h2}>Tunnels and Routing</h2>

        <section id="overlay-paths">
          <h3 style={S.h3}>Overlay Paths</h3>
          <p style={S.p}>
            SD-WAN edges available underlay transports pe logical overlay paths establish karte hain. Yeh paths typically:
          </p>
          <ul style={S.ul}>
            <li>Tunnel endpoints edge devices ke addresses hote hain</li>
            <li>Encapsulation traffic ko wrap karta hai underlay transport ke liye</li>
            <li>Encryption many platforms pe available hai (verify your platform)</li>
            <li>Multiple paths simultaneously active ho sakte hain — MPLS over one tunnel, Internet over another</li>
            <li>Continuous quality probing per path hoti hai</li>
          </ul>
          <Callout type="important" title="Tunnel Protocol Universal Nahi">
            Different SD-WAN vendors different protocols use karte hain — some use IPSec, some proprietary tunneling, some combinations. Ek universal SD-WAN tunnel standard nahi hai. Platform documentation refer karo.
          </Callout>
        </section>

        <section id="routing-in-sdwan">
          <h3 style={S.h3}>Routing in SD-WAN</h3>
          <p style={S.p}>
            SD-WAN routing eliminate nahi karta — <TopicLink slug="router" variant="inline" /> article ke concepts yahan bhi apply hote hain. SD-WAN routing ka ek additional layer add karta hai.
          </p>
          <ComparisonTable
            headers={["Routing Layer", "Where It Operates", "Examples"]}
            rows={[
              ["Underlay routing", "Physical ISP/provider networks", "ISP BGP peering, MPLS provider routing"],
              ["SD-WAN edge-to-LAN", "Between edge device and branch LAN", "OSPF with branch switches/routers, static routes"],
              ["SD-WAN overlay routing", "Between SD-WAN edges over tunnels", "Route exchange via overlay control plane"],
              ["DC integration routing", "SD-WAN edge into DC network", "BGP with DC core, static routes to server subnets"],
            ]}
          />
          <p style={S.p}>
            Common scenarios: branch mein static default route to SD-WAN edge, edge OSPF ya BGP run karta hai LAN side mein, DC edge BGP peer karta hai DC core routers ke saath. Exact design site requirements pe depend karta hai.
          </p>
          <Callout type="warning" title="Route Processing Order">
            SD-WAN path selection aur routing protocol route learning alag functions hain. Platform-specific documentation se samjho ki routing decisions kaise interact karte hain SD-WAN policy ke saath.
          </Callout>
        </section>
      </section>

      {/* ─── APPLICATION-AWARE STEERING ────────────────────────────────── */}
      <section id="app-aware-steering">
        <h2 style={S.h2}>Application-Aware Traffic Steering</h2>
        <p style={S.p}>
          Yeh SD-WAN ka central differentiation hai traditional routing se. Applications ke alag-alag quality requirements hote hain — aur SD-WAN har application type ke liye best available path select kar sakta hai.
        </p>

        <Figure caption="Application classification se path selection tak — policy engine eligible paths evaluate karta hai current quality ke against">
          <AppPathSelectionDiagram />
        </Figure>

        <section id="application-classification">
          <h3 style={S.h3}>Application Classification</h3>
          <p style={S.p}>
            Traffic steer karne se pehle SD-WAN edge ko identify karna hota hai ki traffic kis application se belong karta hai. Classification methods vary by platform:
          </p>
          <ul style={S.ul}>
            <li><strong>Deep Packet Inspection (DPI):</strong> Packet content analyze karke application identify karta hai</li>
            <li><strong>IP/Port based:</strong> Well-known ports aur destination IPs se classification</li>
            <li><strong>URL / Domain:</strong> DNS hostname ya URL path based classification</li>
            <li><strong>Custom signatures:</strong> Administrator-defined application definitions</li>
            <li><strong>DSCP markings:</strong> Upstream marking se inherit karna</li>
          </ul>
          <Callout type="warning" title="First-Packet Classification">
            Kuch platforms first packet se application classify kar lete hain; dusron ko kaafi packets ya full flow analysis chahiye. Encrypted traffic (TLS) classification IP/port, SNI/domain metadata (jahan visible ho), flow signatures, flow characteristics, aur platform-specific application intelligence ka combination use kar sakti hai. ECH jaise mechanisms SNI visibility bhi reduce kar sakte hain. Platform capabilities aur encryption handling verify karo.
          </Callout>
        </section>

        <section id="steering-policy-example">
          <h3 style={S.h3}>Steering Policy Example</h3>
          <ComparisonTable
            headers={["Application", "Requirement", "Preferred Path", "Fallback"]}
            rows={[
              ["Voice / Video (UC)", "Acceptable latency, jitter aur packet loss per configured application SLA", "MPLS (predictable quality)", "Internet if MPLS within SLA"],
              ["ERP / Banking apps", "Privacy, reliability — latency less critical", "MPLS only", "No fallback to Internet (security policy)"],
              ["Web browsing / Updates", "Bandwidth, not latency-sensitive", "Internet (DIA from branch)", "MPLS as backup"],
              ["SaaS (Office 365, Salesforce)", "Direct cloud access preferred", "DIA from branch", "Via DC if local breakout unavailable"],
              ["Backup / Bulk transfer", "Bandwidth, cost-conscious", "Internet (lowest priority queue)", "LTE if available, low priority"],
            ]}
          />
          <p style={S.p}>
            Yeh policies administrator define karta hai. SD-WAN policy engine continuously path quality check karta hai aur eligible paths mein se current conditions ke based best option select karta hai.
          </p>
        </section>
      </section>

      {/* ─── SLA AND PATH QUALITY ──────────────────────────────────────── */}
      <section id="sla-path-quality">
        <h2 style={S.h2}>SLA and Path Quality</h2>

        <Figure caption="Link UP state aur application-usable path quality ka distinction — brownout detection SD-WAN ka key advantage hai">
          <SlaPathQualityDiagram />
        </Figure>

        <section id="what-is-measured">
          <h3 style={S.h3}>What SD-WAN Measures</h3>
          <ComparisonTable
            headers={["Metric", "What It Means", "Impact on Applications"]}
            rows={[
              ["Latency (RTT)", "Time for packet to travel and return", "High latency: voice choppy, web slow, VDI unusable"],
              ["Jitter", "Variation in latency between packets", "High jitter: voice breaks up, video freezes"],
              ["Packet Loss", "Percentage of packets not received", "Even 1-2% loss severely degrades voice; video artifacts"],
              ["Reachability", "Can the remote endpoint be reached at all?", "Zero = path completely down"],
            ]}
          />
          <p style={S.p}>
            SD-WAN edges typically probes bhejte hain — regular test packets — each path pe yeh metrics measure karne ke liye. Measurement frequency aur probe mechanism platform-specific hai.
          </p>
          <Callout type="warning" title="No Universal Thresholds">
            "Voice ke liye latency 150ms se kam honi chahiye" jaise statements general guidelines hain, SD-WAN platform requirements nahi. Apne specific applications aur platform SLA configuration se thresholds determine karo.
          </Callout>
        </section>

        <section id="link-up-vs-usable">
          <h3 style={S.h3}>Link UP vs Application-Usable</h3>
          <p style={S.p}>
            Traditional routing ke liye: link UP = traffic bhejo. Yeh sirf blackout (link completely down) detect karta hai.
          </p>
          <p style={S.p}>
            SD-WAN: link UP + path quality within configured SLA = traffic bhejo. Agar path UP hai lekin latency 200ms, jitter 80ms, ya loss 5% hai — SD-WAN us path ko voice traffic ke liye avoid kar sakta hai, even though link technically UP hai.
          </p>
          <p style={S.p}>
            Yeh <strong>brownout detection</strong> hai — aur yeh traditional routing pe major advantage hai.
          </p>
        </section>

        <section id="dynamic-path-selection">
          <h3 style={S.h3}>Dynamic Path Selection</h3>
          <p style={S.p}>
            Conceptual decision model (actual processing platform-specific hai):
          </p>
          <ol style={{ ...S.ul, listStyle: "decimal" }}>
            <li>Traffic arrives at SD-WAN edge</li>
            <li>Application identified via classification</li>
            <li>Matching policy determined</li>
            <li>Policy-eligible paths evaluated</li>
            <li>Current quality metrics per path checked</li>
            <li>Best eligible path selected</li>
            <li>Traffic forwarded — platform may continuously or periodically monitor path quality; whether existing sessions move on path change is platform/policy dependent</li>
          </ol>
        </section>
      </section>

      {/* ─── FAILOVER ──────────────────────────────────────────────────── */}
      <section id="failover">
        <h2 style={S.h2}>Failover</h2>
        <p style={S.p}>
          Branch mein MPLS + Internet hai. MPLS pe voice traffic preferred hai. Agar MPLS fail ya degrade ho jaaye — SD-WAN eligible voice traffic Internet path pe steer kar sakta hai (agar policy allow karta hai).
        </p>

        <section id="blackout-brownout">
          <h3 style={S.h3}>Blackout vs Brownout</h3>
          <ComparisonTable
            headers={["Event Type", "What Happens", "Traditional Routing", "SD-WAN"]}
            rows={[
              ["Blackout", "Path completely unavailable — link down, circuit failure", "Detected via routing protocol down/timeout", "Detected via link down or probe failure — speed depends on failure type, probes and timers"],
              ["Brownout", "Path UP but quality degraded — high loss, latency, jitter", "Not detected — traffic continues on degraded path", "Detected via SLA metrics — traffic steered to better path"],
            ]}
          />
          <p style={S.p}>
            Brownout detection SD-WAN ka important advantage hai. Internet link pe ISP congestion 3% packet loss create kar raha hai — voice immediately degrade ho jaayegi. SD-WAN yeh detect karke MPLS pe steer kar sakta hai before users notice.
          </p>
        </section>

        <section id="active-active">
          <h3 style={S.h3}>Active-Active Links</h3>
          <p style={S.p}>
            SD-WAN multiple WAN links simultaneously use kar sakta hai — dono links traffic carry karte hain concurrently. Lekin yeh equal split guarantee nahi karta.
          </p>
          <p style={S.p}>
            Example: Voice traffic MPLS pe, web traffic Internet pe — dono simultaneously active. Actual bandwidth utilization per link application policy pe depend karta hai, 50/50 split by default nahi hota.
          </p>
          <Callout type="warning" title="Failover Guarantees">
            Failover speed detection time + switchover time pe depend karti hai — probe intervals, failure type, aur hold timers sab matter karte hain. Physical link failure quality degradation se faster detect ho sakti hai, lekin detection failure type, probe configuration, timers aur platform behavior pe depend karti hai. Session continuity (existing TCP connections) guaranteed nahi hai — path change pe kuch sessions reset ho sakte hain. Platform aur application type dono matter karte hain.
          </Callout>
        </section>
      </section>

      {/* ─── HYBRID WAN ────────────────────────────────────────────────── */}
      <section id="hybrid-wan">
        <h2 style={S.h2}>Hybrid WAN — MPLS, Internet, LTE/5G</h2>
        <p style={S.p}>
          Real-world SD-WAN deployments typically multiple transport types combine karte hain. Common designs:
        </p>
        <ComparisonTable
          headers={["Design", "Links", "Use Case"]}
          rows={[
            ["MPLS Primary + Internet Secondary", "MPLS active, Internet standby failover", "Quality-sensitive enterprise; MPLS preferred, Internet for failover only"],
            ["Dual Internet Active-Active", "Two ISPs, both active simultaneously", "Cost-optimized; brownout/blackout protection via provider diversity"],
            ["MPLS + Internet Active-Active", "Both carry traffic per policy", "Common enterprise hybrid; MPLS for voice/ERP, Internet for web/SaaS"],
            ["Internet + LTE Backup", "Internet primary, LTE failover", "Smaller sites; LTE typically more expensive per GB"],
            ["Triple Hybrid", "MPLS + Internet + LTE all active", "Critical branches; maximum redundancy and flexibility"],
          ]}
        />
        <p style={S.p}>
          <strong>Trade-offs consider karo:</strong> MPLS more expensive hai, long provisioning time (weeks/months), predictable quality. Internet cheaper hai, faster provisioning, variable quality. LTE/5G mobile friendly, typically higher latency aur cost per GB, good for backup.
        </p>
        <p style={S.p}>
          Provider diversity important hai HA ke liye — dono Internet links ek hi ISP se lene pe single provider outage dono fail kar sakta hai. Physical diversity bhi consider karo (different cable entry points).
        </p>
      </section>

      {/* ─── BRANCH TO DC ──────────────────────────────────────────────── */}
      <section id="branch-to-dc">
        <h2 style={S.h2}>Branch to Data Center Architecture</h2>
        <p style={S.p}>
          Enterprise SD-WAN deployment mein branch users → SD-WAN overlay → DC edge → internal DC stack ka typical flow:
        </p>

        <Figure caption="Branch-to-DC traffic flow: SD-WAN overlay, multiple transports, DC edge, Firewall, Load Balancer, Application servers">
          <BranchDcArchDiagram />
        </Figure>

        <p style={S.p}>
          <strong>Responsibilities at each layer:</strong> SD-WAN handles WAN path selection aur overlay; <TopicLink slug="firewall" variant="inline" /> security policy enforce karta hai DC ingress pe; <TopicLink slug="load-balancer" variant="inline" /> application tier traffic distribute karta hai. SD-WAN Firewall replace nahi karta — dono separate functions hain.
        </p>

        <section id="direct-internet-access">
          <h3 style={S.h3}>Direct Internet Access (DIA)</h3>
          <p style={S.p}>
            Traditional design: Branch → DC → Internet (DC pe centralized Internet breakout).
          </p>
          <p style={S.p}>
            SD-WAN possible design: Branch Internet traffic directly local ISP connection se bahar — DC backhaul avoid karta hai. Benefits for SaaS applications (Office 365, Salesforce) jahan DC routing adds unnecessary latency.
          </p>
          <Callout type="warning" title="DIA Security Implication">
            Direct Internet breakout ke liye local security controls necessary hain — branch-level <TopicLink slug="firewall" variant="inline" /> ya cloud-delivered security (SASE). Sensitive/private traffic still DC route kar sakte ho policy se. DIA automatically better nahi hai — security posture aur application requirements architecture decide karte hain.
          </Callout>
        </section>
      </section>

      {/* ─── CLOUD AND SAAS ────────────────────────────────────────────── */}
      <section id="cloud-saas">
        <h2 style={S.h2}>Cloud and SaaS Connectivity</h2>
        <p style={S.p}>
          SD-WAN cloud aur SaaS applications ke liye connectivity improve kar sakta hai, lekin important limitations hain.
        </p>
        <ul style={S.ul}>
          <li>DIA from branch SaaS latency reduce karta hai DC backhaul eliminate karke</li>
          <li>Some platforms cloud on-ramp features provide karte hain — cloud provider PoPs se connectivity optimize karta hai</li>
          <li>Virtual SD-WAN edges public cloud (AWS/Azure/GCP) mein deploy ho sakte hain cloud workloads ke liye</li>
        </ul>
        <Callout type="important" title="SD-WAN Internet Control Nahi Karta">
          SD-WAN branch se Internet entry point tak optimize kar sakta hai, lekin SaaS provider ke servers tak ka complete Internet path SD-WAN control mein nahi hai. Provider network congestion, BGP routing, aur SaaS infrastructure SD-WAN ke bahar hain. "End-to-end SaaS performance guarantee" claim karne wale vendors se carefully evaluate karo.
        </Callout>
      </section>

      {/* ─── SECURITY ──────────────────────────────────────────────────── */}
      <section id="sdwan-security">
        <h2 style={S.h2}>SD-WAN Security</h2>
        <p style={S.p}>
          SD-WAN networking features provide karta hai — security SD-WAN ke saath separate ya integrated hoti hai.
        </p>
        <ComparisonTable
          headers={["SD-WAN Feature", "Security Function", "Separate NGFW Function"]}
          rows={[
            ["Encrypted tunnels", "Transit encryption (branch-to-branch/DC)", "Deep packet inspection, threat prevention"],
            ["Device authentication", "Only trusted edges join fabric", "Identity-based access control"],
            ["Overlay segmentation", "Logical traffic separation", "Application-layer security policy"],
            ["Management plane security", "Controller access control", "Not applicable"],
            ["DIA with policy", "Policy-controlled breakout", "NGFW/CASB inspection at breakout point"],
          ]}
        />

        <section id="segmentation">
          <h3 style={S.h3}>Segmentation</h3>
          <p style={S.p}>
            SD-WAN logical segmentation support kar sakta hai — different traffic types ya user groups ko isolated logical networks pe:
          </p>
          <ul style={S.ul}>
            <li>Corporate users vs Guest WiFi</li>
            <li>Voice network vs Data network</li>
            <li>PCI/compliance-scope traffic vs general corporate</li>
            <li>Management network isolation</li>
          </ul>
          <p style={S.p}>
            Implementation mechanisms vary — VRFs, VPNs, segments, policy constructs — platform-specific. Segmentation verify karo actual testing se, assume mat karo.
          </p>
        </section>

        <section id="sdwan-firewall">
          <h3 style={S.h3}>SD-WAN and Firewall</h3>
          <p style={S.p}>
            <strong>Architecture Option 1: SD-WAN Edge + Separate Firewall</strong> — SD-WAN edge WAN path handling karta hai; dedicated <TopicLink slug="firewall" variant="inline" /> traffic inspect karta hai. Clear separation of responsibilities. DC edge ke baad NGFW common hai.
          </p>
          <p style={S.p}>
            <strong>Architecture Option 2: Integrated SD-WAN/Security Platform</strong> — Kuch vendors SD-WAN + NGFW features ek device mein combine karte hain. Simpler for small branches, lekin capabilities separate dedicated appliances jitni nahi hoti.
          </p>
          <p style={S.p}>
            Neither approach universally superior. Branch size, security requirements, aur existing infrastructure determine karte hain.
          </p>
        </section>
      </section>

      {/* ─── HIGH AVAILABILITY ─────────────────────────────────────────── */}
      <section id="high-availability">
        <h2 style={S.h2}>High Availability</h2>
        <p style={S.p}>
          SD-WAN HA multiple layers pe consider hoti hai:
        </p>
        <ComparisonTable
          headers={["HA Layer", "Mechanism", "What It Protects Against"]}
          rows={[
            ["Dual SD-WAN edges (DC)", "Active/Standby or Active/Active edge pair", "Single edge device failure"],
            ["Dual WAN providers", "Provider diversity per site", "Single ISP or circuit failure"],
            ["Dual underlay paths", "MPLS + Internet simultaneously", "Single transport type failure"],
            ["Controller redundancy", "Redundant controller instances", "Control plane unavailability"],
            ["Power redundancy", "Dual PSUs, UPS, generator", "Power failure at site"],
            ["Physical path diversity", "Different cable entry, different physical paths", "Physical infrastructure failure"],
          ]}
        />
        <Callout type="warning" title="Dual Links ≠ Complete HA">
          Two WAN links hona SD-WAN HA guarantee nahi karta. Agar dono links ek hi provider se hain, provider outage both fail kar sakta hai. Agar SD-WAN edge single point of failure hai, edge failure site down kar sakta hai. Failure domains analyze karo — har HA layer independently.
        </Callout>

        <section id="controller-failure">
          <h3 style={S.h3}>Controller Failure Behavior</h3>
          <p style={S.p}>
            Important concept: Management/Control Plane unavailability ≠ Data Plane immediately stops.
          </p>
          <p style={S.p}>
            Typically: edges apni existing forwarding state (routes, policies, tunnel state) maintain karte hain even when controller unreachable ho. Existing traffic continue hoti hai per last known state.
          </p>
          <p style={S.p}>
            What stops when controller unavailable: new configuration pushes, policy updates, zero-touch provisioning for new sites, centralized monitoring, new path calculations (platform-dependent).
          </p>
          <Callout type="warning" title="Platform-Specific Behavior">
            Controller failure behavior significantly platform se vary karta hai. Kuch platforms edges pe more autonomous behavior support karte hain; dusron ko connectivity required hai certain functions ke liye. Apne platform ka exact behavior test karo — assume mat karo.
          </Callout>
        </section>
      </section>

      {/* ─── NAT AND QOS ───────────────────────────────────────────────── */}
      <section id="nat-qos">
        <h2 style={S.h2}>NAT and QoS</h2>
        <p style={S.p}>
          <strong>NAT:</strong> Internet transports ya local breakout ke saath NAT typically exist karta hai — branch private IPs Internet-routable addresses pe translate hote hain. NAT placement (edge pe ya separate device pe) aur processing architecture platform-specific hai. Deep NAT theory <TopicLink slug="firewall" variant="inline" /> article mein hai.
        </p>
        <p style={S.p}>
          <strong>QoS:</strong> SD-WAN local policy mein traffic classification, queuing, aur bandwidth management support kar sakta hai. Lekin important limitation: SD-WAN local QoS policy provider network ke andar end-to-end QoS guarantee nahi karta.
        </p>
        <Callout type="warning" title="QoS Limitations">
          SD-WAN branch edge pe DSCP mark kar sakta hai, lekin Internet providers typically DSCP markings ignore karte hain ya erase karte hain. MPLS providers SLA-based QoS offer karte hain lekin specific configuration required hoti hai. "QoS = quality guarantee" nahi hai — local policy + provider support dono necessary hain.
        </Callout>
      </section>

      {/* ─── PERFORMANCE AND MONITORING ────────────────────────────────── */}
      <section id="performance-monitoring">
        <h2 style={S.h2}>Performance and Monitoring</h2>
        <p style={S.p}>
          <strong>Sizing factors</strong> (interface bandwidth se beyond): Encrypted throughput (hardware acceleration varies), packet rate (small packets more CPU-intensive), concurrent tunnel count, number of sites/peers, security services if integrated, logging/telemetry load, HA requirements.
        </p>
        <p style={S.p}>
          <strong>Key monitoring signals:</strong>
        </p>
        <ul style={S.ul}>
          <li>WAN link state per interface</li>
          <li>Tunnel state per underlay path</li>
          <li>Per-path latency, jitter, packet loss values</li>
          <li>Bandwidth utilization per link and per application</li>
          <li>Path change events (when traffic steered)</li>
          <li>Failover events (what triggered, when, recovery time)</li>
          <li>Controller connectivity status</li>
          <li>Application experience metrics (where platform provides)</li>
          <li>Device health: CPU, memory, license status</li>
        </ul>
        <Callout type="important" title="Alert Configuration">
          Unconfigured monitoring = invisible problems. Meaningful alerts configure karo: link down, path quality SLA violated, tunnel down, high packet loss threshold crossed, controller unreachable. Default dashboards dekho, lekin active alerting explicitly set karo.
        </Callout>
      </section>

      {/* ─── TROUBLESHOOTING ───────────────────────────────────────────── */}
      <section id="troubleshooting">
        <h2 style={S.h2}>Troubleshooting</h2>
        <p style={S.p}>
          SD-WAN troubleshooting ka core principle: multiple distinct layers hain, aur problems ek ya zyada layers mein ho sakti hain simultaneously. Systematically isolate karo.
        </p>

        <Figure caption="SD-WAN troubleshooting sequence — 13 steps: underlay se application tak. Har step pass karo toh aage badho; fail karo toh us layer investigate karo">
          <TroubleshootingFlowDiagram />
        </Figure>

        <section id="ts-layers">
          <h3 style={S.h3}>Troubleshooting Layers</h3>
          <ComparisonTable
            headers={["Layer", "What to Check", "Key Questions"]}
            rows={[
              ["Underlay", "Physical interfaces, ISP connectivity, provider reachability", "Is the physical link up? Can I reach ISP gateway? Ping succeeds?"],
              ["Overlay", "Tunnel state, control plane connectivity, path establishment", "Are tunnels established? Which paths active?"],
              ["Routing", "Route table on edge and DC, overlay route exchange", "Are routes present? Correct next-hop? Return routing?"],
              ["Policy", "Application classification, policy hit counters, flow logs", "Is traffic classified correctly? Which policy matches?"],
              ["Path quality", "Latency, jitter, loss per path, SLA compliance", "Are path quality metrics within configured SLA?"],
              ["Security", "Firewall allow/deny logs, NAT session table", "Is Firewall passing traffic? NAT translating correctly?"],
              ["Application", "Application-level connectivity, DNS, app server health", "Does the application work when accessed directly?"],
            ]}
          />
        </section>

        <section id="ts-sequence">
          <h3 style={S.h3}>Systematic Sequence</h3>
          <ol style={{ ...S.ul, listStyle: "decimal" }}>
            <li>Edge device healthy? (CPU, memory, processes, licenses)</li>
            <li>Physical/WAN interfaces UP? (line protocol, errors, counters)</li>
            <li>Underlay reachability? (ISP gateway ping, provider traceroute)</li>
            <li>Overlay tunnels established? (tunnel state per underlay path)</li>
            <li>Expected routes present? (route table, overlay route exchange)</li>
            <li>Traffic classified correctly? (application identification match)</li>
            <li>Correct policy matching? (policy hit counters, flow logs)</li>
            <li>Eligible paths available? (eligible path list per policy)</li>
            <li>Path quality within SLA? (latency, jitter, loss per path)</li>
            <li>Traffic steering event? (path change log, steering events)</li>
            <li>Return routing correct? (DC/remote end — asymmetric routing check)</li>
            <li>Firewall/NAT passing? (deny logs, NAT session table)</li>
            <li>Application itself works? (direct DC test, application logs)</li>
          </ol>
          <Callout type="important" title="Core Principle">
            TUNNEL UP ≠ APPLICATION WORKING. Tunnel state, path quality, routing, policy, security, aur application — yeh sab separate layers hain. Ek layer ka OK hona doosri layer guarantee nahi karta.
          </Callout>
        </section>
      </section>

      {/* ─── FAILURE SCENARIOS ─────────────────────────────────────────── */}
      <section id="failure-scenarios">
        <h2 style={S.h2}>Practical Failure Scenarios</h2>
        <ComparisonTable
          headers={["Scenario", "Symptom", "Likely Layer", "Verification Approach"]}
          rows={[
            ["MPLS circuit down", "MPLS-dependent apps fail or shift to Internet", "Underlay", "Check MPLS interface state, ISP contact, path state in SD-WAN"],
            ["Internet circuit down", "Internet-dependent apps fail; DIA broken", "Underlay", "Internet interface state, ISP ping, tunnel state over Internet path"],
            ["Brownout — high packet loss", "Voice degrades; apps slow; traffic may or may not steer", "Underlay quality + SLA", "Check path quality metrics: latency/jitter/loss values, compare to SLA thresholds"],
            ["Tunnel down while underlay works", "Overlay connectivity lost despite physical link up", "Overlay", "Check tunnel state, control plane connectivity, firewall blocking tunnel ports/protocols"],
            ["Wrong route", "Traffic not reaching destination", "Routing", "Check route table on edge and DC edge; overlay route exchange; return routing"],
            ["Wrong traffic policy", "Traffic taking unexpected path; application misbehaving", "Policy", "Check policy hit counters, flow logs, application classification output"],
            ["Application misclassification", "Voice traffic steered to Internet instead of MPLS", "Policy + Classification", "Verify DPI signature match; check classification output for affected flows"],
            ["Asymmetric return path", "Connection works one way; timeouts", "Routing", "Trace return path from DC to branch; check DC edge routing, Firewall state"],
            ["Firewall/NAT blocking", "Connectivity fails despite correct tunnel/routing", "Security", "Check Firewall deny logs; NAT session table; application-level port permit rules"],
            ["Controller unreachable", "Monitoring down; new configs can't push; existing traffic typically continues", "Management Plane", "Check controller connectivity; verify data plane still forwarding per existing state"],
            ["Single SD-WAN edge failure (DC)", "Branch-to-DC connectivity fails if no HA", "Hardware/HA", "Check edge health; HA failover if pair; verify standby took over"],
          ]}
        />
      </section>

      {/* ─── OPERATIONS ────────────────────────────────────────────────── */}
      <section id="operations">
        <h2 style={S.h2}>Operations and Maintenance</h2>
        <ComparisonTable
          headers={["Operation", "Key Considerations"]}
          rows={[
            ["WAN link/provider changes", "Update SD-WAN underlay config; verify new path appears in overlay; test quality measurement; update monitoring"],
            ["Edge device maintenance", "Graceful drain: steer traffic away before maintenance; verify failover works before taking device down"],
            ["Software upgrades", "Test on non-production edges first; upgrade edges in sequence (not all simultaneously); validate tunnel re-establishment post-upgrade"],
            ["Policy changes", "Understand impact before applying: what traffic will steer differently? Test in lab/staging first; monitor path changes after"],
            ["New branch onboarding", "ZTP workflow (if supported); pre-stage config; verify underlay connectivity before overlay; validate application steering"],
            ["Failover testing", "Regularly test — actually disconnect links; verify traffic steers as expected; measure failover time; verify recovery"],
            ["Configuration backup", "Before any change; offsite storage; test restore periodically"],
            ["Certificate/license lifecycle", "Track expiry dates; alert well before expiry; SD-WAN edge or controller license expiry can affect functionality"],
          ]}
        />
        <p style={S.p}>
          Failover testing particularly important hai — many deployments "assume" failover works but never actually test it. Actual link disconnect karo, measure karo, document karo.
        </p>
      </section>

      {/* ─── MISCONCEPTIONS ────────────────────────────────────────────── */}
      <section id="misconceptions">
        <h2 style={S.h2}>Common Misconceptions</h2>
        <ComparisonTable
          headers={["Misconception", "Reality"]}
          rows={[
            ["SD-WAN MPLS replace karta hai", "SD-WAN MPLS ke upar operate karta hai overlay ke roop mein. MPLS abhi bhi useful hai quality-sensitive apps ke liye. SD-WAN architecture mein MPLS ek underlay option hai."],
            ["Tunnel UP matlab traffic theek hai", "Tunnel UP sirf logical path existence prove karta hai. Latency, jitter, loss still poor ho sakte hain. Application layer alag check karo."],
            ["Two links = complete HA", "Agar dono links same provider se hain, provider outage both fail kar sakta hai. Failure domain analysis required hai."],
            ["Controller down = traffic stops", "Existing forwarding aur kuch local path decisions locally available state, policy aur measurements ke basis pe continue ho sakte hain. Management functions unavailable hote hain. Exact behavior platform aur architecture pe depend karta hai."],
            ["Active-active = 50/50 split", "Traffic distribution application policy pe depend karta hai. Voice MPLS pe, web Internet pe — equal split by default nahi."],
            ["SD-WAN automatically zero packet loss deta hai", "SD-WAN better path select karta hai, lekin cannot improve underlying transport quality ya compensate for physical issues beyond capabilities."],
            ["SD-WAN Firewall replace karta hai", "SD-WAN networking features provide karta hai. Security ke liye dedicated NGFW ya integrated security platform required hai."],
            ["SD-WAN Internet ka poora path control karta hai", "SD-WAN edge se Internet entry point tak optimize kar sakta hai. SaaS provider tak complete Internet path SD-WAN control mein nahi hai."],
            ["DIA sabke liye automatically better hai", "DIA latency reduce karta hai SaaS ke liye lekin local security controls require karta hai. Sensitive traffic still DC route karna appropriate ho sakta hai."],
            ["Failover always seamless hoti hai", "Path change pe kuch TCP sessions reset ho sakte hain. Failover speed detection + switchover time pe depend karti hai. Test karo, assume mat karo."],
          ]}
        />
      </section>

      {/* ─── FINAL ARCHITECTURE ────────────────────────────────────────── */}
      <section id="final-architecture">
        <h2 style={S.h2}>Final Integrated Architecture</h2>
        <p style={S.p}>
          Complete enterprise SD-WAN deployment — multiple branches, multiple transport types, SD-WAN overlay, redundant DC infrastructure, aur management plane:
        </p>

        <Figure caption="Complete SD-WAN enterprise architecture: branches, underlay transports, SD-WAN overlay, DC edge HA pair, Firewall, Load Balancer, aur application servers">
          <FinalArchitectureDiagram />
        </Figure>

        <p style={S.p}>
          Management plane (Orchestrator) typically cloud-hosted ya on-premises centralized system hai jo dashed lines se edges aur controllers se connect karta hai — visibility aur configuration ke liye, data plane forwarding ke liye nahi.
        </p>
        <p style={S.p}>
          DC mein: SD-WAN edge HA pair branch tunnels terminate karta hai → Firewall security inspect karta hai → <TopicLink slug="load-balancer" variant="inline" /> application tier pe distribute karta hai → Application servers requests serve karte hain.
        </p>
        <Callout type="warning" title="Design Caveat">
          Yeh ek common reference architecture hai, universal mandatory design nahi. Actual HA configuration, controller placement, edge count, aur path design requirements, platform capabilities, aur budget pe depend karta hai.
        </Callout>
      </section>

      {/* ─── KEY TAKEAWAYS ─────────────────────────────────────────────── */}
      <section id="key-takeaways">
        <h2 style={S.h2}>Key Takeaways</h2>
        <ul style={S.ul}>
          <li>SD-WAN ek overlay hai — physical transports (MPLS/Internet/LTE) underlay hain, replace nahi hote</li>
          <li>Routing abhi bhi matter karta hai — SD-WAN routing ke upar policy layer add karta hai, eliminate nahi</li>
          <li>Path selection application classification + policy + measured path quality pe based hai</li>
          <li>Link UP ≠ application-quality path — latency, jitter, loss separately measure hote hain</li>
          <li>Brownout detection SD-WAN ka key advantage hai — quality-based path avoidance, sirf link state nahi</li>
          <li>Failover automatically session-preserving ya instantaneous nahi hai — platform aur failure type matter karte hain</li>
          <li>Controller down hone pe data plane typically existing state se continue karta hai — management functions unavailable</li>
          <li>SD-WAN Firewall automatically replace nahi karta — different functions, complementary hai</li>
          <li>Troubleshooting mein underlay, overlay, routing, policy, security, aur application layers separately isolate karo</li>
          <li>Tunnel UP ≠ application working — yeh sabse important principle hai</li>
        </ul>
      </section>

      {/* ─── FAQ ───────────────────────────────────────────────────────── */}
      <section id="faq" style={{ marginTop: "3rem" }}>
        <h2 style={S.h2}>Frequently Asked Questions</h2>
        {sdWanContent.faq.map((item, i) => (
          <div key={i} style={{ marginBottom: "2rem" }}>
            <h3 style={{ ...S.h3, color: "#111827" }}>{item.question}</h3>
            <p style={S.p}>{item.answer}</p>
          </div>
        ))}
      </section>

    </article>
  );
}
