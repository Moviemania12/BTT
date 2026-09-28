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
          SD-WAN (Software-Defined Wide Area Network) is an overlay architecture that creates a policy-driven, centrally managed network on top of the available WAN transports — MPLS, Internet broadband, LTE/5G. The physical transports are not replaced; SD-WAN operates on top of them.
        </p>
        <p style={S.p}>
          Key value: application-aware path selection, continuous path quality measurement (latency, jitter, packet loss), and brownout detection — which traditional routing does not provide.
        </p>
        <Callout type="important" title="Scope of This Article">
          This article explains SD-WAN concepts in a vendor-neutral way. Specific platform behavior, configuration commands, and implementation details vary — always consult the official platform documentation.
        </Callout>
      </section>

      {/* ─── FOUNDATION ────────────────────────────────────────────────── */}
      <section id="what-is-sdwan">
        <h2 style={S.h2}>What Is SD-WAN?</h2>
        <p style={S.p}>
          In traditional enterprise networking, WAN connections — MPLS, leased lines, Internet — were managed independently, with separate hardware configurations, branch by branch. Routing decisions could be based on link state, routing protocol metrics, BFD/IP-SLA, or policy-based routing. But these mechanisms typically do not inherently support steering traffic based on application-level business intent or real-time path quality (latency, jitter, loss).
        </p>
        <p style={S.p}>
          SD-WAN fundamentally changes this approach. It is a software layer that makes WAN transport selection centrally policy-driven, continuously measures path quality, and steers traffic to the best available path according to application requirements and business intent — application/business-policy-aware steering across available transports.
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
          <Callout type="warning" title="SD-WAN Does Not Replace Physical Transport">
            SD-WAN is an overlay. The physical WAN connections — MPLS circuit, Internet broadband, LTE SIM — still exist. SD-WAN does not replace them; it adds an intelligent control and policy layer on top of them. If the underlay fails, the overlay paths are affected.
          </Callout>
        </section>
      </section>

      {/* ─── UNDERLAY vs OVERLAY ───────────────────────────────────────── */}
      <section id="underlay-vs-overlay">
        <h2 style={S.h2}>Underlay vs Overlay</h2>
        <p style={S.p}>
          This distinction is critical to understanding SD-WAN. There are two separate layers — the physical/transport layer (underlay) and the SD-WAN logical layer (overlay).
        </p>

        <Figure caption="SD-WAN underlay transports (physical) and SD-WAN overlay (logical policy layer) — two distinct layers">
          <UnderlayOverlayDiagram />
        </Figure>

        <section id="underlay">
          <h3 style={S.h3}>The Underlay</h3>
          <p style={S.p}>
            The underlay is the actual physical/logical transport connections that carry data between sites. Common underlay types:
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
            An underlay failure — such as an ISP circuit going down or a physical link being cut — directly affects the overlay. SD-WAN cannot work over a path that does not exist.
          </p>
        </section>

        <section id="overlay">
          <h3 style={S.h3}>The Overlay</h3>
          <p style={S.p}>
            The SD-WAN overlay is a logical network established on top of the physical transports. SD-WAN edge devices create tunnels or logical paths that use the available underlay transports.
          </p>
          <p style={S.p}>
            Routing, policy enforcement, path quality monitoring, and traffic steering happen through the overlay. An overlay "tunnel UP" does not mean the path is of application-usable quality — underlay quality is monitored continuously.
          </p>
          <Callout type="important" title="Overlay Health ≠ Underlay Perfect">
            An SD-WAN overlay tunnel can be established even when underlay quality is degraded. Tunnel UP only proves logical connectivity. The actual latency, jitter, and packet loss values are measured separately — and these values determine whether the path is usable for the application.
          </Callout>
        </section>
      </section>

      {/* ─── ARCHITECTURE ──────────────────────────────────────────────── */}
      <section id="sdwan-architecture">
        <h2 style={S.h2}>SD-WAN Architecture</h2>
        <p style={S.p}>
          SD-WAN solutions are typically organized into three functional planes — but the actual implementation, co-location, and terminology vary significantly from platform to platform.
        </p>

        <Figure caption="The SD-WAN three-plane model — Management, Control, and Data planes. Actual co-location and distribution are platform-specific">
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
            On some platforms the Control Plane sits on a centralized controller. On others it is on distributed edge devices. Some platforms combine the Data and Control Plane on the edges. Control/controller connectivity issues can affect route or policy distribution and related functions — it depends on the architecture. Management/orchestrator failure affects configuration, monitoring, visibility and ZTP. Neither a Control Plane failure nor a Management Plane failure automatically stops existing data plane forwarding immediately — the exact behavior is platform-specific. Understand the specific behavior from the platform documentation.
          </Callout>
        </section>

        <section id="key-components">
          <h3 style={S.h3}>Key Components</h3>
          <p style={S.p}>
            <strong>SD-WAN Edge:</strong> A physical or virtual device at the customer site that connects WAN interfaces, establishes tunnels, and enforces policy. Edges are typically deployed at branch, Data Center, hub or cloud locations — depending on the design.
          </p>
          <p style={S.p}>
            <strong>Controller / Control Component:</strong> Handles route distribution, policy distribution, and path computation. Can be centralized or distributed.
          </p>
          <p style={S.p}>
            <strong>Orchestrator / Management System:</strong> Centralized configuration management, monitoring dashboard, and analytics. Often cloud-hosted; on-premises is also possible.
          </p>
          <p style={S.p}>
            <strong>Analytics / Monitoring:</strong> Path quality metrics, application performance data, and flow logs. Some platforms have a separate analytics component.
          </p>
        </section>
      </section>

      {/* ─── SD-WAN EDGE ───────────────────────────────────────────────── */}
      <section id="sdwan-edge">
        <h2 style={S.h2}>SD-WAN Edge</h2>
        <p style={S.p}>
          The SD-WAN Edge device is the point where physical WAN connectivity, the SD-WAN overlay, and the LAN network meet. It is the core component of the Data Plane.
        </p>

        <section id="branch-edge">
          <h3 style={S.h3}>Branch Edge</h3>
          <p style={S.p}>
            A branch edge typically has multiple WAN interfaces (MPLS, Internet, LTE), one or more LAN interfaces, and the SD-WAN software. Functions may include:
          </p>
          <ul style={S.ul}>
            <li>WAN link monitoring and path quality measurement</li>
            <li>Tunnel establishment over available underlays</li>
            <li>Application classification and traffic steering</li>
            <li>Local routing (OSPF/BGP with LAN side)</li>
            <li>NAT for Internet-destined traffic (where configured)</li>
            <li>Local security functions (platform-dependent)</li>
            <li>Direct Internet Access (DIA) for designated traffic</li>
          </ul>
        </section>

        <section id="dc-edge">
          <h3 style={S.h3}>Data Center Edge</h3>
          <p style={S.p}>
            The DC edge is typically a higher-capacity device that terminates multiple branch tunnels and connects to the DC internal network. After the DC edge there is typically a dedicated <TopicLink slug="firewall" variant="inline" /> for security inspection.
          </p>
          <p style={S.p}>
            <strong>Virtual/Cloud Edge:</strong> In public cloud environments (AWS, Azure), virtual SD-WAN edge appliances integrate cloud workloads into the SD-WAN fabric. This is a platform-specific capability.
          </p>
          <Callout type="warning" title="Edge Functions Vary">
            Not every SD-WAN edge device provides every function. Security services, routing protocols, and NAT capabilities depend on the platform and model. Verify the platform documentation.
          </Callout>
        </section>
      </section>

      {/* ─── TUNNELS AND ROUTING ───────────────────────────────────────── */}
      <section id="tunnels-routing">
        <h2 style={S.h2}>Tunnels and Routing</h2>

        <section id="overlay-paths">
          <h3 style={S.h3}>Overlay Paths</h3>
          <p style={S.p}>
            SD-WAN edges establish logical overlay paths over the available underlay transports. These paths typically:
          </p>
          <ul style={S.ul}>
            <li>Tunnel endpoints are the addresses of the edge devices</li>
            <li>Encapsulation wraps traffic for the underlay transport</li>
            <li>Encryption is available on many platforms (verify your platform)</li>
            <li>Multiple paths can be active simultaneously — MPLS over one tunnel, Internet over another</li>
            <li>Continuous quality probing happens per path</li>
          </ul>
          <Callout type="important" title="Tunnel Protocol Is Not Universal">
            Different SD-WAN vendors use different protocols — some use IPSec, some proprietary tunneling, some combinations. There is no single universal SD-WAN tunnel standard. Refer to the platform documentation.
          </Callout>
        </section>

        <section id="routing-in-sdwan">
          <h3 style={S.h3}>Routing in SD-WAN</h3>
          <p style={S.p}>
            SD-WAN does not eliminate routing — the concepts from the <TopicLink slug="router" variant="inline" /> article apply here too. SD-WAN adds an additional layer on top of routing.
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
            Common scenarios: a static default route to the SD-WAN edge in the branch, the edge runs OSPF or BGP on the LAN side, the DC edge peers BGP with the DC core routers. The exact design depends on site requirements.
          </p>
          <Callout type="warning" title="Route Processing Order">
            SD-WAN path selection and routing protocol route learning are separate functions. Understand from the platform-specific documentation how routing decisions interact with SD-WAN policy.
          </Callout>
        </section>
      </section>

      {/* ─── APPLICATION-AWARE STEERING ────────────────────────────────── */}
      <section id="app-aware-steering">
        <h2 style={S.h2}>Application-Aware Traffic Steering</h2>
        <p style={S.p}>
          This is the central differentiation of SD-WAN from traditional routing. Applications have different quality requirements — and SD-WAN can select the best available path for each application type.
        </p>

        <Figure caption="From application classification to path selection — the policy engine evaluates eligible paths against current quality">
          <AppPathSelectionDiagram />
        </Figure>

        <section id="application-classification">
          <h3 style={S.h3}>Application Classification</h3>
          <p style={S.p}>
            Before steering traffic, the SD-WAN edge has to identify which application the traffic belongs to. Classification methods vary by platform:
          </p>
          <ul style={S.ul}>
            <li><strong>Deep Packet Inspection (DPI):</strong> Identifies the application by analyzing packet content</li>
            <li><strong>IP/Port based:</strong> Classification by well-known ports and destination IPs</li>
            <li><strong>URL / Domain:</strong> Classification based on DNS hostname or URL path</li>
            <li><strong>Custom signatures:</strong> Administrator-defined application definitions</li>
            <li><strong>DSCP markings:</strong> Inheriting from upstream marking</li>
          </ul>
          <Callout type="warning" title="First-Packet Classification">
            Some platforms classify the application from the first packet; others need several packets or full flow analysis. Encrypted traffic (TLS) classification can use a combination of IP/port, SNI/domain metadata (where visible), flow signatures, flow characteristics, and platform-specific application intelligence. Mechanisms such as ECH can also reduce SNI visibility. Verify platform capabilities and encryption handling.
          </Callout>
        </section>

        <section id="steering-policy-example">
          <h3 style={S.h3}>Steering Policy Example</h3>
          <ComparisonTable
            headers={["Application", "Requirement", "Preferred Path", "Fallback"]}
            rows={[
              ["Voice / Video (UC)", "Acceptable latency, jitter and packet loss per configured application SLA", "MPLS (predictable quality)", "Internet if MPLS within SLA"],
              ["ERP / Banking apps", "Privacy, reliability — latency less critical", "MPLS only", "No fallback to Internet (security policy)"],
              ["Web browsing / Updates", "Bandwidth, not latency-sensitive", "Internet (DIA from branch)", "MPLS as backup"],
              ["SaaS (Office 365, Salesforce)", "Direct cloud access preferred", "DIA from branch", "Via DC if local breakout unavailable"],
              ["Backup / Bulk transfer", "Bandwidth, cost-conscious", "Internet (lowest priority queue)", "LTE if available, low priority"],
            ]}
          />
          <p style={S.p}>
            These policies are defined by the administrator. The SD-WAN policy engine continuously checks path quality and selects the best option among eligible paths based on current conditions.
          </p>
        </section>
      </section>

      {/* ─── SLA AND PATH QUALITY ──────────────────────────────────────── */}
      <section id="sla-path-quality">
        <h2 style={S.h2}>SLA and Path Quality</h2>

        <Figure caption="The distinction between Link UP state and application-usable path quality — brownout detection is a key advantage of SD-WAN">
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
            SD-WAN edges typically send probes — regular test packets — on each path to measure these metrics. Measurement frequency and probe mechanism are platform-specific.
          </p>
          <Callout type="warning" title="No Universal Thresholds">
            Statements like "latency for voice should be below 150ms" are general guidelines, not SD-WAN platform requirements. Determine thresholds from your specific applications and platform SLA configuration.
          </Callout>
        </section>

        <section id="link-up-vs-usable">
          <h3 style={S.h3}>Link UP vs Application-Usable</h3>
          <p style={S.p}>
            For traditional routing: link UP = send traffic. This only detects a blackout (link completely down).
          </p>
          <p style={S.p}>
            SD-WAN: link UP + path quality within configured SLA = send traffic. If the path is UP but latency is 200ms, jitter is 80ms, or loss is 5% — SD-WAN can avoid that path for voice traffic, even though the link is technically UP.
          </p>
          <p style={S.p}>
            This is <strong>brownout detection</strong> — and it is a major advantage over traditional routing.
          </p>
        </section>

        <section id="dynamic-path-selection">
          <h3 style={S.h3}>Dynamic Path Selection</h3>
          <p style={S.p}>
            Conceptual decision model (actual processing is platform-specific):
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
          The branch has MPLS + Internet. Voice traffic is preferred on MPLS. If MPLS fails or degrades — SD-WAN can steer eligible voice traffic to the Internet path (if policy allows).
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
            Brownout detection is an important advantage of SD-WAN. ISP congestion on the Internet link is creating 3% packet loss — voice will degrade immediately. SD-WAN can detect this and steer to MPLS before users notice.
          </p>
        </section>

        <section id="active-active">
          <h3 style={S.h3}>Active-Active Links</h3>
          <p style={S.p}>
            SD-WAN can use multiple WAN links simultaneously — both links carry traffic concurrently. But this does not guarantee an equal split.
          </p>
          <p style={S.p}>
            Example: Voice traffic on MPLS, web traffic on Internet — both active simultaneously. Actual bandwidth utilization per link depends on application policy; there is no 50/50 split by default.
          </p>
          <Callout type="warning" title="Failover Guarantees">
            Failover speed depends on detection time + switchover time — probe intervals, failure type, and hold timers all matter. A physical link failure can be detected faster than quality degradation, but detection depends on failure type, probe configuration, timers and platform behavior. Session continuity (existing TCP connections) is not guaranteed — some sessions may reset on path change. Both platform and application type matter.
          </Callout>
        </section>
      </section>

      {/* ─── HYBRID WAN ────────────────────────────────────────────────── */}
      <section id="hybrid-wan">
        <h2 style={S.h2}>Hybrid WAN — MPLS, Internet, LTE/5G</h2>
        <p style={S.p}>
          Real-world SD-WAN deployments typically combine multiple transport types. Common designs:
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
          <strong>Consider the trade-offs:</strong> MPLS is more expensive, with long provisioning time (weeks/months) and predictable quality. Internet is cheaper, with faster provisioning and variable quality. LTE/5G is mobile friendly, typically with higher latency and cost per GB, good for backup.
        </p>
        <p style={S.p}>
          Provider diversity is important for HA — if both Internet links come from the same ISP, a single provider outage can fail both. Consider physical diversity too (different cable entry points).
        </p>
      </section>

      {/* ─── BRANCH TO DC ──────────────────────────────────────────────── */}
      <section id="branch-to-dc">
        <h2 style={S.h2}>Branch to Data Center Architecture</h2>
        <p style={S.p}>
          In an enterprise SD-WAN deployment, the typical flow is branch users → SD-WAN overlay → DC edge → internal DC stack:
        </p>

        <Figure caption="Branch-to-DC traffic flow: SD-WAN overlay, multiple transports, DC edge, Firewall, Load Balancer, Application servers">
          <BranchDcArchDiagram />
        </Figure>

        <p style={S.p}>
          <strong>Responsibilities at each layer:</strong> SD-WAN handles WAN path selection and overlay; the <TopicLink slug="firewall" variant="inline" /> enforces security policy at DC ingress; the <TopicLink slug="load-balancer" variant="inline" /> distributes application tier traffic. SD-WAN does not replace the Firewall — they are two separate functions.
        </p>

        <section id="direct-internet-access">
          <h3 style={S.h3}>Direct Internet Access (DIA)</h3>
          <p style={S.p}>
            Traditional design: Branch → DC → Internet (centralized Internet breakout at the DC).
          </p>
          <p style={S.p}>
            Possible SD-WAN design: Branch Internet traffic goes out directly via the local ISP connection — avoiding DC backhaul. Benefits for SaaS applications (Office 365, Salesforce) where DC routing adds unnecessary latency.
          </p>
          <Callout type="warning" title="DIA Security Implication">
            Direct Internet breakout requires local security controls — a branch-level <TopicLink slug="firewall" variant="inline" /> or cloud-delivered security (SASE). Sensitive/private traffic can still be routed via the DC by policy. DIA is not automatically better — security posture and application requirements decide the architecture.
          </Callout>
        </section>
      </section>

      {/* ─── CLOUD AND SAAS ────────────────────────────────────────────── */}
      <section id="cloud-saas">
        <h2 style={S.h2}>Cloud and SaaS Connectivity</h2>
        <p style={S.p}>
          SD-WAN can improve connectivity for cloud and SaaS applications, but there are important limitations.
        </p>
        <ul style={S.ul}>
          <li>DIA from the branch reduces SaaS latency by eliminating DC backhaul</li>
          <li>Some platforms provide cloud on-ramp features — optimizing connectivity via cloud provider PoPs</li>
          <li>Virtual SD-WAN edges can be deployed in public cloud (AWS/Azure/GCP) for cloud workloads</li>
        </ul>
        <Callout type="important" title="SD-WAN Does Not Control the Internet">
          SD-WAN can optimize from the branch to the Internet entry point, but the complete Internet path to the SaaS provider's servers is not under SD-WAN control. Provider network congestion, BGP routing, and SaaS infrastructure are outside SD-WAN. Evaluate vendors claiming an "end-to-end SaaS performance guarantee" carefully.
        </Callout>
      </section>

      {/* ─── SECURITY ──────────────────────────────────────────────────── */}
      <section id="sdwan-security">
        <h2 style={S.h2}>SD-WAN Security</h2>
        <p style={S.p}>
          SD-WAN provides networking features — security is separate from or integrated with SD-WAN.
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
            SD-WAN can support logical segmentation — putting different traffic types or user groups on isolated logical networks:
          </p>
          <ul style={S.ul}>
            <li>Corporate users vs Guest WiFi</li>
            <li>Voice network vs Data network</li>
            <li>PCI/compliance-scope traffic vs general corporate</li>
            <li>Management network isolation</li>
          </ul>
          <p style={S.p}>
            Implementation mechanisms vary — VRFs, VPNs, segments, policy constructs — platform-specific. Verify segmentation through actual testing; do not assume.
          </p>
        </section>

        <section id="sdwan-firewall">
          <h3 style={S.h3}>SD-WAN and Firewall</h3>
          <p style={S.p}>
            <strong>Architecture Option 1: SD-WAN Edge + Separate Firewall</strong> — The SD-WAN edge handles the WAN path; a dedicated <TopicLink slug="firewall" variant="inline" /> inspects traffic. Clear separation of responsibilities. An NGFW after the DC edge is common.
          </p>
          <p style={S.p}>
            <strong>Architecture Option 2: Integrated SD-WAN/Security Platform</strong> — Some vendors combine SD-WAN + NGFW features in one device. Simpler for small branches, but capabilities are not equal to separate dedicated appliances.
          </p>
          <p style={S.p}>
            Neither approach is universally superior. Branch size, security requirements, and existing infrastructure determine the choice.
          </p>
        </section>
      </section>

      {/* ─── HIGH AVAILABILITY ─────────────────────────────────────────── */}
      <section id="high-availability">
        <h2 style={S.h2}>High Availability</h2>
        <p style={S.p}>
          SD-WAN HA is considered at multiple layers:
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
          Having two WAN links does not guarantee SD-WAN HA. If both links come from the same provider, a provider outage can fail both. If the SD-WAN edge is a single point of failure, an edge failure can take the site down. Analyze failure domains — each HA layer independently.
        </Callout>

        <section id="controller-failure">
          <h3 style={S.h3}>Controller Failure Behavior</h3>
          <p style={S.p}>
            Important concept: Management/Control Plane unavailability ≠ Data Plane immediately stops.
          </p>
          <p style={S.p}>
            Typically: edges maintain their existing forwarding state (routes, policies, tunnel state) even when the controller is unreachable. Existing traffic continues per the last known state.
          </p>
          <p style={S.p}>
            What stops when controller unavailable: new configuration pushes, policy updates, zero-touch provisioning for new sites, centralized monitoring, new path calculations (platform-dependent).
          </p>
          <Callout type="warning" title="Platform-Specific Behavior">
            Controller failure behavior varies significantly by platform. Some platforms support more autonomous behavior on the edges; others require connectivity for certain functions. Test the exact behavior of your platform — do not assume.
          </Callout>
        </section>
      </section>

      {/* ─── NAT AND QOS ───────────────────────────────────────────────── */}
      <section id="nat-qos">
        <h2 style={S.h2}>NAT and QoS</h2>
        <p style={S.p}>
          <strong>NAT:</strong> NAT typically exists with Internet transports or local breakout — branch private IPs are translated to Internet-routable addresses. NAT placement (on the edge or on a separate device) and processing architecture are platform-specific. Deep NAT theory is in the <TopicLink slug="firewall" variant="inline" /> article.
        </p>
        <p style={S.p}>
          <strong>QoS:</strong> SD-WAN can support traffic classification, queuing, and bandwidth management in local policy. But an important limitation: SD-WAN local QoS policy does not guarantee end-to-end QoS inside the provider network.
        </p>
        <Callout type="warning" title="QoS Limitations">
          SD-WAN can mark DSCP at the branch edge, but Internet providers typically ignore or erase DSCP markings. MPLS providers offer SLA-based QoS, but specific configuration is required. "QoS = quality guarantee" is not true — both local policy and provider support are necessary.
        </Callout>
      </section>

      {/* ─── PERFORMANCE AND MONITORING ────────────────────────────────── */}
      <section id="performance-monitoring">
        <h2 style={S.h2}>Performance and Monitoring</h2>
        <p style={S.p}>
          <strong>Sizing factors</strong> (beyond interface bandwidth): Encrypted throughput (hardware acceleration varies), packet rate (small packets more CPU-intensive), concurrent tunnel count, number of sites/peers, security services if integrated, logging/telemetry load, HA requirements.
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
          Unconfigured monitoring = invisible problems. Configure meaningful alerts: link down, path quality SLA violated, tunnel down, high packet loss threshold crossed, controller unreachable. Look at the default dashboards, but set up active alerting explicitly.
        </Callout>
      </section>

      {/* ─── TROUBLESHOOTING ───────────────────────────────────────────── */}
      <section id="troubleshooting">
        <h2 style={S.h2}>Troubleshooting</h2>
        <p style={S.p}>
          The core principle of SD-WAN troubleshooting: there are multiple distinct layers, and problems can exist in one or more layers simultaneously. Isolate systematically.
        </p>

        <Figure caption="SD-WAN troubleshooting sequence — 13 steps: from underlay to application. If a step passes, move on; if it fails, investigate that layer">
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
            TUNNEL UP ≠ APPLICATION WORKING. Tunnel state, path quality, routing, policy, security, and application — these are all separate layers. One layer being OK does not guarantee another.
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
          Failover testing is particularly important — many deployments "assume" failover works but never actually test it. Actually disconnect the link, measure, and document.
        </p>
      </section>

      {/* ─── MISCONCEPTIONS ────────────────────────────────────────────── */}
      <section id="misconceptions">
        <h2 style={S.h2}>Common Misconceptions</h2>
        <ComparisonTable
          headers={["Misconception", "Reality"]}
          rows={[
            ["SD-WAN replaces MPLS", "SD-WAN operates on top of MPLS as an overlay. MPLS is still useful for quality-sensitive apps. In SD-WAN architecture, MPLS is one underlay option."],
            ["Tunnel UP means traffic is fine", "Tunnel UP only proves logical path existence. Latency, jitter and loss can still be poor. Check the application layer separately."],
            ["Two links = complete HA", "If both links are from the same provider, a provider outage can fail both. Failure domain analysis is required."],
            ["Controller down = traffic stops", "Existing forwarding and some local path decisions can continue based on locally available state, policy and measurements. Management functions become unavailable. Exact behavior depends on platform and architecture."],
            ["Active-active = 50/50 split", "Traffic distribution depends on application policy. Voice on MPLS, web on Internet — no equal split by default."],
            ["SD-WAN automatically gives zero packet loss", "SD-WAN selects a better path, but cannot improve underlying transport quality or compensate for physical issues beyond its capabilities."],
            ["SD-WAN replaces the Firewall", "SD-WAN provides networking features. A dedicated NGFW or integrated security platform is required for security."],
            ["SD-WAN controls the entire Internet path", "SD-WAN can optimize from the edge to the Internet entry point. The complete Internet path to the SaaS provider is not under SD-WAN control."],
            ["DIA is automatically better for everyone", "DIA reduces latency for SaaS but requires local security controls. Routing sensitive traffic via the DC can still be appropriate."],
            ["Failover is always seamless", "Some TCP sessions may reset on path change. Failover speed depends on detection + switchover time. Test it, do not assume."],
          ]}
        />
      </section>

      {/* ─── FINAL ARCHITECTURE ────────────────────────────────────────── */}
      <section id="final-architecture">
        <h2 style={S.h2}>Final Integrated Architecture</h2>
        <p style={S.p}>
          A complete enterprise SD-WAN deployment — multiple branches, multiple transport types, SD-WAN overlay, redundant DC infrastructure, and management plane:
        </p>

        <Figure caption="Complete SD-WAN enterprise architecture: branches, underlay transports, SD-WAN overlay, DC edge HA pair, Firewall, Load Balancer, and application servers">
          <FinalArchitectureDiagram />
        </Figure>

        <p style={S.p}>
          The management plane (Orchestrator) is typically a cloud-hosted or on-premises centralized system that connects to edges and controllers via dashed lines — for visibility and configuration, not for data plane forwarding.
        </p>
        <p style={S.p}>
          In the DC: the SD-WAN edge HA pair terminates branch tunnels → the Firewall performs security inspection → the <TopicLink slug="load-balancer" variant="inline" /> distributes to the application tier → Application servers serve the requests.
        </p>
        <Callout type="warning" title="Design Caveat">
          This is a common reference architecture, not a universal mandatory design. Actual HA configuration, controller placement, edge count, and path design depend on requirements, platform capabilities, and budget.
        </Callout>
      </section>

      {/* ─── KEY TAKEAWAYS ─────────────────────────────────────────────── */}
      <section id="key-takeaways">
        <h2 style={S.h2}>Key Takeaways</h2>
        <ul style={S.ul}>
          <li>SD-WAN is an overlay — physical transports (MPLS/Internet/LTE) are the underlay and are not replaced</li>
          <li>Routing still matters — SD-WAN adds a policy layer on top of routing, it does not eliminate it</li>
          <li>Path selection is based on application classification + policy + measured path quality</li>
          <li>Link UP ≠ application-quality path — latency, jitter and loss are measured separately</li>
          <li>Brownout detection is a key advantage of SD-WAN — quality-based path avoidance, not just link state</li>
          <li>Failover is not automatically session-preserving or instantaneous — platform and failure type matter</li>
          <li>When the controller is down, the data plane typically continues from existing state — management functions unavailable</li>
          <li>SD-WAN does not automatically replace the Firewall — different functions, complementary</li>
          <li>In troubleshooting, isolate the underlay, overlay, routing, policy, security, and application layers separately</li>
          <li>Tunnel UP ≠ application working — this is the most important principle</li>
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
