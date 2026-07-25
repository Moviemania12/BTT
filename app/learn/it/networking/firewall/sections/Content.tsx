"use client";
// Enterprise Firewall — Complete Content (Phases 1-8)
import { Callout, ComparisonTable, Figure, CodeBlock, S } from "../shared";
import TopicLink from "@/components/TopicLink";
import { faqs } from "../metadata";
import FwVsRouterVsL3Switch from "../svg/FwVsRouterVsL3Switch";
import StatefulPacketJourney from "../svg/StatefulPacketJourney";
import SessionTableFiveTuple from "../svg/SessionTableFiveTuple";
import SecurityPolicyEvaluation from "../svg/SecurityPolicyEvaluation";
import SecurityZonesArch from "../svg/SecurityZonesArch";
import DcFirewallPlacement from "../svg/DcFirewallPlacement";
import HaFirewallPair from "../svg/HaFirewallPair";
import SnatPatFlow from "../svg/SnatPatFlow";
import DnatServerPublish from "../svg/DnatServerPublish";
import NatPolicyInteraction from "../svg/NatPolicyInteraction";
import IpsInspectionFlow from "../svg/IpsInspectionFlow";
import TlsVisibility from "../svg/TlsVisibility";
import TlsDecryptionOutbound from "../svg/TlsDecryptionOutbound";
import SiteToSiteVpnArch from "../svg/SiteToSiteVpnArch";
import Ikev2NegotiationFlow from "../svg/Ikev2NegotiationFlow";
import FourPointPacketMethod from "../svg/FourPointPacketMethod";
import HaFailoverTimeline from "../svg/HaFailoverTimeline";
import SplitBrainCondition from "../svg/SplitBrainCondition";
import FirewallSizingDimensions from "../svg/FirewallSizingDimensions";
import DmzTrafficArch from "../svg/DmzTrafficArch";

export default function Content() {
  return (
    <article>

      <section id="quick-summary">
        <h2 style={S.h2}>Quick Summary</h2>
        <p style={S.p}>Enterprise Firewall ek security enforcement point hai jo network traffic ko security policy ke basis pe permit ya deny karta hai. Yeh sirf ek router nahi hai — router packets forward karta hai, firewall security decide karta hai.</p>
        <Callout type="important" title="Is Article Mein Kya Sikhoge">
          <ul style={S.ul}>
            <li>Stateful inspection — sessions, 5-tuple, TCP/UDP/ICMP handling</li>
            <li>Security zones, policy evaluation, NAT (SNAT/DNAT/PAT)</li>
            <li>NGFW: application identification, IPS, URL filtering, TLS inspection</li>
            <li>VPN: IPsec, IKEv2, NAT-T, site-to-site aur remote access</li>
            <li>High Availability: active/passive, session sync, failover, split-brain</li>
            <li>Troubleshooting: logs, session table, packet capture, four-point method</li>
            <li>Design, sizing, selection aur commissioning</li>
          </ul>
        </Callout>
      </section>

      <section id="fw-what">
        <h2 style={S.h2}>Firewall Kya Hota Hai?</h2>
        <p style={S.p}>Firewall ek network security device hai — physical appliance ya software — jo incoming aur outgoing network traffic ko security rules ke basis pe inspect karke decide karta hai: permit karo ya block karo.</p>
        <p style={S.p}>Simple definition: <strong>Firewall network ke do ya zyada segments ke beech ek controlled checkpoint hai</strong> jahan policy decide karti hai kaun sa traffic cross kar sakta hai.</p>
        <p style={S.p}>Modern enterprise firewalls sirf packet filter nahi hote. Yeh stateful connection tracking, application-level inspection, threat prevention, VPN termination, aur logging bhi provide karte hain.</p>
      </section>

      <section id="fw-need">
        <h2 style={S.h2}>Firewall Ki Need — Router Se Kya Different Hai?</h2>
        <p style={S.p}><TopicLink slug="router" variant="inline" /> ka primary job hai IP packets ko best path pe forward karna. Security uska primary concern nahi hai. Router pe ACL laga sakte hain, lekin ACL stateless hota hai — har packet independently evaluate hota hai, connection tracking nahi hota.</p>
        <p style={S.p}>Firewall ka primary job hai security policy enforce karna. Yeh connection state track karta hai — return traffic automatically permitted hoti hai established sessions ke liye bina separate reverse rule ke.</p>
        <Callout type="warning" title="ACL vs Stateful Firewall">
          Router ACL pe DENY inbound → internet se traffic block. Lekin agar engineer return traffic ka bhi DENY laga de, toh internally initiated HTTPS bhi fail ho jaata hai. Stateful firewall yeh automatically handle karta hai — outbound permit → return automatically allowed for established session.
        </Callout>
      </section>

      <section id="fw-vs-router">
        <h2 style={S.h2}>Firewall vs Router vs L3 Switch</h2>
        <Figure caption="Firewall, Router aur L2 Switch ke primary capabilities ka comparison — boundaries overlap in modern platforms"><FwVsRouterVsL3Switch /></Figure>
      </section>

      <section id="stateless-stateful">
        <h2 style={S.h2}>Stateless vs Stateful Firewall</h2>
        <ComparisonTable
          headers={["Dimension","Stateless / Packet Filter","Stateful Firewall"]}
          rows={[
            ["What it evaluates","Each packet independently","Connection state + packet attributes"],
            ["Return traffic","Needs explicit reverse rule","Automatically permitted for established flows"],
            ["Session awareness","None","Full session table maintained"],
            ["Security","Basic — easily bypassed","Stronger — protocol state validated"],
          ]}
        />
      </section>

      <section id="stateful-inspection">
        <h2 style={S.h2}>How Stateful Inspection Actually Works</h2>
        <p style={S.p}>Stateful inspection sirf connections yaad rakhna nahi hai — yeh protocol-level state validation hai.</p>
        <ul style={S.ul}>
          <li><strong>TCP:</strong> Full state machine — SYN, SYN-ACK, ESTABLISHED, FIN, RST. Depth of validation varies by platform and configuration.</li>
          <li><strong>UDP:</strong> No inherent connection state — firewall creates a pseudo-session with idle timer based on the tuple. Additional tracking may occur depending on platform/protocol.</li>
          <li><strong>ICMP:</strong> Protocol-specific keys — type, code, identifier. No transport ports involved.</li>
        </ul>
        <Callout type="warning" title="Stateful ≠ Simply Remembering Connections">
          TCP flag validation, sequence number checking, protocol anomaly detection — yeh sab platform aur configuration dependent hain. Actual depth of inspection varies significantly by platform and enabled features.
        </Callout>
        <Figure caption="Stateful firewall packet processing — new flow vs existing session. Exact pipeline is platform-dependent."><StatefulPacketJourney /></Figure>
      </section>

      <section id="five-tuple">
        <h2 style={S.h2}>5-Tuple and Session Table</h2>
        <p style={S.p}>TCP/UDP flows ke liye firewall typically 5 fields se flow identify karta hai: Source IP, Source Port, Destination IP, Destination Port, Protocol. ICMP aur other non-port protocols protocol-specific keys use karte hain.</p>
        <Figure caption="Session/flow table — 5-tuple based flow identification with state, NAT, and counters"><SessionTableFiveTuple /></Figure>
        <Callout type="important" title="Session Table Exhaustion">
          Har platform ka maximum concurrent session limit hota hai. Table full → new connections rejected even if policy permits. Session table capacity is a critical sizing metric.
        </Callout>
      </section>

      <section id="tcp-udp-icmp">
        <h2 style={S.h2}>TCP, UDP and ICMP Session Handling</h2>
        <ComparisonTable
          headers={["Protocol","Session Key","State Tracking","Timeout"]}
          rows={[
            ["TCP","5-tuple","Full state machine (SYN→EST→FIN/RST) — depth platform dependent","Long (platform default varies)"],
            ["UDP","5-tuple","Pseudo-session / idle timer — no protocol state. Additional tracking platform-dependent.","Short idle timer — platform dependent"],
            ["ICMP","Src IP + Dst IP + Type + Code + Identifier","Short-lived tracking — no transport ports","Short — platform dependent"],
          ]}
        />
      </section>

      <section id="packet-processing">
        <h2 style={S.h2}>Firewall Packet Processing Journey</h2>
        <p style={S.p}>Jab ek packet firewall pe arrive karta hai (exact order is platform-dependent):</p>
        <CodeBlock lang="text">{"1. Ingress interface pe packet receive\n2. Flow/session state lookup (5-tuple match)\n   MATCH → existing session — validate + process per platform logic\n   NO MATCH → new flow — full evaluation begins\n3. NAT evaluation (order relative to policy: platform-specific)\n4. Security policy evaluation → DENY: drop/reject | PERMIT: proceed\n5. Security profile inspection (where configured — IPS, URL, file)\n6. Session state entry created (new flow, permit)\n7. Forward on egress interface\n\nNote: Exact processing order is platform-dependent."}</CodeBlock>
      </section>

      <section id="security-zones">
        <h2 style={S.h2}>Security Zones</h2>
        <p style={S.p}>Zone-based policy models mein, firewall interfaces ko logical zones mein assign kiya jaata hai jo trust levels represent karte hain. Policy zone-pairs ke beech define hoti hai.</p>
        <Figure caption="Security zone architecture — conceptual zone model. Names are examples, not universal mandatory terminology."><SecurityZonesArch /></Figure>
      </section>

      <section id="policy-anatomy">
        <h2 style={S.h2}>Security Policy / Rule Anatomy</h2>
        <ComparisonTable
          headers={["Element","Description","Example"]}
          rows={[
            ["Source zone/interface","Traffic kahan se aa raha hai","Trust zone"],
            ["Destination zone/interface","Traffic kahan ja raha hai","Untrust zone"],
            ["Source address","Source IP / object / group","10.10.10.0/24"],
            ["Destination address","Destination IP / object / group","any"],
            ["Service","Protocol + port","TCP/443 (HTTPS)"],
            ["Application (NGFW)","Identified application where supported","web-browsing"],
            ["Action","What happens on match","Permit / Deny"],
            ["Security profile","Post-permit inspection (NGFW)","IPS profile, URL filter"],
            ["Logging","What to log","Traffic + threat logs"],
          ]}
        />
      </section>

      <section id="rule-evaluation">
        <h2 style={S.h2}>Rule Evaluation and Default/Implicit Action</h2>
        <Figure caption="Security policy evaluation — ordered first-match model (common; verify your platform)"><SecurityPolicyEvaluation /></Figure>
        <Callout type="danger" title="Implicit Deny / Default Action">
          Many enterprise platforms deny all unmatched traffic by default — but this is not universal. Verify per platform. Configure an explicit default rule for clarity and logging even if an implicit deny exists. Shadowed rules: a broader rule before a specific one prevents the specific rule from ever matching.
        </Callout>
      </section>

      <section id="return-traffic">
        <h2 style={S.h2}>Return Traffic Kaise Handle Hota Hai?</h2>
        <p style={S.p}>Return traffic in stateful firewalls is matched to the existing permitted session/flow state and processed according to the platform&apos;s stateful forwarding behavior. Normally not treated as an unrelated new flow requiring fresh policy evaluation — exact handling is platform-dependent.</p>
        <CodeBlock lang="text">{"User 10.10.10.25:54321 → 1.2.3.4:443 TCP\n\n1. No existing session → security policy: Trust→Untrust HTTPS → PERMIT\n2. Session entry created\n3. Return: 1.2.3.4:443 → 10.10.10.25:54321\n4. Lookup → MATCH existing session\n5. Processed per stateful session handling → forwarded to client\n\nNo separate reverse rule needed in stateful firewall."}</CodeBlock>
      </section>

      <section id="nat-relationship">
        <h2 style={S.h2}>NAT Ka Firewall Processing Se Basic Relationship</h2>
        <p style={S.p}>NAT aur firewall policy are separate functions. NAT addresses translate karta hai. Policy permit/deny decide karti hai. <strong>NAT karna automatically traffic permit nahi karta.</strong> Processing order — NAT pehle ya policy pehle — platform-specific hai.</p>
      </section>

      <section id="ns-ew-intro">
        <h2 style={S.h2}>North-South vs East-West Firewalling</h2>
        <p style={S.p}><strong>North-South:</strong> Traffic crossing the perimeter — internet se internal, external user to application.</p>
        <p style={S.p}><strong>East-West:</strong> Traffic within the DC or internal network — server to server, app to database, VM to VM. Traditional perimeter firewalls north-south traffic control karte hain. East-west control ke liye separate architecture required hai.</p>
      </section>

      <section id="fw-placement-dc">
        <h2 style={S.h2}>Data Center Mein Firewall Kahan Lagta Hai?</h2>
        <Figure caption="Data center firewall placement — common patterns. Actual topology varies by architecture."><DcFirewallPlacement /></Figure>
        <Callout type="danger" title="Firewall Cannot Enforce Bypass Traffic">
          Firewall sirf wahi traffic enforce kar sakta hai jo usse traverse kare. Routing must be explicitly designed to ensure intended traffic traverses the firewall.
        </Callout>
      </section>

      <section id="basic-ha">
        <h2 style={S.h2}>Basic Firewall HA Concept</h2>
        <Figure caption="HA firewall pair — Active/Passive. Failover sequence is platform-dependent."><HaFirewallPair /></Figure>
        <p style={S.p}>HA removes the firewall node as a single point of failure. It does NOT eliminate all surrounding SPOFs. Phase 6 mein complete HA architecture cover hota hai.</p>
      </section>

      <section id="practical-p1">
        <h2 style={S.h2}>Practical Example: User to Firewall to Web Server</h2>
        <CodeBlock lang="text">{"User 10.10.10.25 → https://example.com (1.2.3.4:443)\n\n1. TCP SYN → 1.2.3.4:443 arrives at firewall (Trust zone)\n2. Session table lookup: no existing session\n3. Policy: Trust→Untrust HTTPS → PERMIT\n4. Session state created\n5. SNAT: src 10.10.10.25 → 198.51.100.50\n6. Packet forwarded toward internet\n\nReturn (SYN-ACK from 1.2.3.4:443):\n7. Reverse NAT lookup → 10.10.10.25:54321\n8. Session state match → existing permitted flow\n9. Processed per stateful handling → forwarded to user\n\nNote: NAT and policy processing order is platform-dependent."}</CodeBlock>
      </section>

      <section id="beginner-misconceptions">
        <h2 style={S.h2}>Common Beginner Misunderstandings</h2>
        <ComparisonTable
          headers={["Misconception","Reality"]}
          rows={[
            ["Firewall = Router with rules","Firewall = stateful security enforcement. Router = best-path forwarder. Different primary jobs."],
            ["NAT = Security","NAT is address translation. Security = policy. They are separate."],
            ["Firewall UP = Application UP","Firewall node health ≠ service/application health. Full path must work."],
            ["ALLOW log = traffic reached server","ALLOW = firewall recorded a permit decision. Server may not respond. Application may fail."],
            ["HA = Zero downtime","HA reduces downtime. Detection, failover, convergence all take time. Sessions may reset."],
          ]}
        />
      </section>

      <section id="p1-takeaways">
        <h2 style={S.h2}>Phase 1 Key Takeaways</h2>
        <ul style={S.ul}>
          <li>Firewall = security enforcement. Router = forwarder. Different primary jobs.</li>
          <li>Stateful inspection tracks protocol-level connection state — not just &quot;remembers connections&quot;</li>
          <li>5-tuple identifies TCP/UDP flows. ICMP uses protocol-specific keys.</li>
          <li>Return traffic: automatically handled by session state — no reverse rule needed</li>
          <li>NAT and security policy are separate functions — NAT alone does not permit traffic</li>
          <li>Firewall UP ≠ application UP. Device health ≠ service health.</li>
          <li>Routing must send traffic through firewall — bypass = no enforcement</li>
        </ul>
      </section>

      {/* Phase 2 — NAT, Objects & Advanced Policy */}
      <section id="network-objects">
        <h2 style={S.h2}>Network Objects and Address Objects</h2>
        <p style={S.p}>Policy rules mein har jagah raw IP addresses likhna operational nightmare hai. Address objects ek naam se multiple IPs ya subnets reference karte hain — ek jagah update karo, sab rules update ho jaate hain.</p>
        <CodeBlock lang="text">{"Address Object:\n  Name: DC-App-Servers\n  Value: 10.20.20.0/24\n\nPolicy Rule:\n  Src: Trust-Users → Dst: DC-App-Servers → HTTPS → PERMIT\n\n(If subnet changes: update DC-App-Servers once → all rules updated)"}</CodeBlock>
      </section>

      <section id="service-objects">
        <h2 style={S.h2}>Service Objects</h2>
        <p style={S.p}>Service objects protocol + port combinations define karte hain. Common services pre-defined hote hain; custom services create kar sakte hain.</p>
        <CodeBlock lang="text">{"Built-in: HTTPS = TCP/443, SSH = TCP/22, DNS = UDP+TCP/53\n\nCustom Service Object:\n  Name: App-Backend-API\n  Protocol: TCP\n  Destination Port: 8443"}</CodeBlock>
      </section>

      <section id="snat">
        <h2 style={S.h2}>Source NAT (SNAT)</h2>
        <p style={S.p}>Why SNAT is commonly used for Internet access: RFC 1918 private addresses are not globally routable on the public Internet. In a typical enterprise Internet-edge design, the firewall translates the private source address to a globally routable address before forwarding the traffic externally. SNAT is not inherently required for every private-address communication scenario — private networks connected through routing, VPNs, or other controlled address realms may communicate without NAT.</p>
        <p style={S.p}>SNAT changes the source address of a flow. Depending on the design, source translation may be static one-to-one, dynamic using an address pool, or many-to-one when combined with port translation (PAT/NAPT).</p>
        <Figure caption="SNAT/PAT — multiple internal hosts sharing one public IP via port differentiation"><SnatPatFlow /></Figure>
      </section>

      <section id="pat">
        <h2 style={S.h2}>PAT / Port Address Translation</h2>
        <p style={S.p}>PAT (NAPT) ek form of SNAT hai jahan multiple internal hosts ek single public IP share karte hain via unique port assignments. The usable translated-port pool per public address is implementation- and configuration-dependent. PAT port exhaustion can occur when available translation tuples for a public address/pool are consumed.</p>
      </section>

      <section id="dnat">
        <h2 style={S.h2}>Destination NAT (DNAT)</h2>
        <p style={S.p}>DNAT publicly accessible IP pe incoming traffic ko internal server pe redirect karta hai.</p>
        <Figure caption="DNAT server publishing — packet transformation. DNAT ≠ traffic permitted. Security policy required separately."><DnatServerPublish /></Figure>
      </section>

      <section id="nat-comparison">
        <h2 style={S.h2}>Static NAT vs Dynamic NAT vs PAT</h2>
        <ComparisonTable
          headers={["Type","Translation","Common Use","Inbound possible?"]}
          rows={[
            ["Static NAT","Fixed 1:1 mapping","Server publishing with dedicated IP","Yes, when static mapping/policy configured to support inbound"],
            ["Dynamic NAT","From address pool","Outbound with multiple public IPs","Generally no — return only"],
            ["PAT/NAPT","Port-differentiated many:1","Most common internet access","No — return only for active sessions"],
            ["DNAT","Destination address translated","Inbound server publishing","Yes — that is its purpose"],
          ]}
        />
      </section>

      <section id="nat-table">
        <h2 style={S.h2}>NAT Translation Table</h2>
        <p style={S.p}>The firewall maintains NAT translation state that maps original flow information to translated addresses/ports so reverse translation can be performed for return traffic. Whether NAT translation state and security session state are stored in separate structures or integrated internally is platform-dependent.</p>
        <p style={S.p}>For a stateful firewall flow that requires NAT, the platform must retain the state necessary to associate return traffic with both the permitted flow and its translation. How that state is represented internally is implementation-dependent.</p>
      </section>

      <section id="nat-policy-interaction">
        <h2 style={S.h2}>NAT and Security Policy Interaction</h2>
        <Figure caption="NAT + security policy interaction — processing order is platform-specific. Most common misconfiguration source."><NatPolicyInteraction /></Figure>
      </section>

      <section id="hairpin-nat">
        <h2 style={S.h2}>Hairpin / U-Turn NAT</h2>
        <p style={S.p}>Internal host jo public IP pe published server access karna chahta hai — same firewall se both traffic enter aur exit karte hain — U-shaped path. Depending on the topology and routing, the translated server may have a return path directly toward the client instead of through the firewall, preventing the required reverse translation. Other hairpin failures are also possible depending on platform NAT, routing, and same-interface forwarding behavior.</p>
      </section>

      <section id="no-nat">
        <h2 style={S.h2}>No-NAT / NAT Exemption</h2>
        <p style={S.p}>Traffic jo naturally SNAT rule match karta hai lekin translate nahi hona chahiye — VPN traffic, inter-site routed traffic — ke liye explicit NAT exemption / no-NAT rule required hota hai. Verify whether the VPN design requires traffic to remain untranslated. The exact no-NAT mechanism is platform and design dependent.</p>
      </section>

      <section id="practical-nat-example">
        <h2 style={S.h2}>Policy Objects and NAT Practical Example</h2>
        <CodeBlock lang="text">{"Scenario: User VLAN → Internet (HTTPS)\n\nAddress Objects: User-Networks: 10.10.0.0/16\nService Objects: HTTPS: TCP/443\n\nSNAT Rule: Src: User-Networks → Dst: Internet → Translate src to 198.51.100.50\n\nSecurity Policy Rule:\n  Zone: Trust → Untrust | Src: User-Networks | Service: HTTPS | Action: PERMIT\n  Profile: URL-Filter + IPS\n\nFlow:\n  10.10.10.25:54321 → 1.2.3.4:443\n  SNAT → 198.51.100.50:10001 → 1.2.3.4:443\n  Policy: Trust→Untrust HTTPS PERMIT → session created\n  Return: 1.2.3.4:443 → 198.51.100.50:10001 → reverse NAT → 10.10.10.25:54321"}</CodeBlock>
      </section>

      <section id="app-aware-policy">
        <h2 style={S.h2}>Application-Aware Policy</h2>
        <p style={S.p}>An application-aware policy attempts to identify traffic by application characteristics rather than relying only on the transport port. Depending on the platform, application definition, encryption state, inspection capability, and policy configuration, an application may be identified even when it uses a non-standard port. <strong>TCP/443 ≠ HTTPS.</strong></p>
      </section>

      <section id="identity-aware-policy">
        <h2 style={S.h2}>User / Identity-Aware Policy</h2>
        <p style={S.p}>NGFW platforms may integrate with identity sources (Active Directory, LDAP, RADIUS, captive portal) to use user or group membership as a policy match criterion. This is an optional capability — not a universal NGFW requirement.</p>
      </section>

      <section id="schedule-policy">
        <h2 style={S.h2}>Time / Schedule-Based Policy</h2>
        <p style={S.p}>Some platforms support time-based policy rules — traffic permitted only during specific hours or days. Requires accurate NTP synchronization. Schedule feature availability is platform-dependent.</p>
      </section>

      <section id="policy-logging">
        <h2 style={S.h2}>Policy Logging</h2>
        <Callout type="warning" title="Deny Log Strategy">
          Log security-relevant denies according to the environment&apos;s monitoring and logging strategy. High-volume expected deny traffic may require rate limiting, aggregation, selective logging, or other platform-specific controls to avoid excessive log volume.
        </Callout>
      </section>

      <section id="hit-counters">
        <h2 style={S.h2}>Policy Hit Counters and Rule Usage</h2>
        <p style={S.p}>Where reliable policy hit counters are available, a rule showing no observed matches despite expected traffic is evidence that the rule may not be selected. Possible causes: rule ordering/shadowing, incorrect match criteria, traffic using another path, or counter/reset/visibility behavior. Confirm with traffic logs or policy-match diagnostics.</p>
      </section>

      <section id="policy-best-practices">
        <h2 style={S.h2}>Policy Design Best Practices</h2>
        <ul style={S.ul}>
          <li>Start specific, end general — more specific rules at top</li>
          <li>Use address and service objects — never raw IPs in every rule</li>
          <li>Explicit default rule with logging — even if implicit deny exists</li>
          <li>Minimize overly broad rules (any→any)</li>
          <li>Review and remove stale rules regularly</li>
          <li>Test after every change — validate both intended and adjacent traffic</li>
        </ul>
      </section>

      <section id="nat-policy-mistakes">
        <h2 style={S.h2}>Common NAT and Policy Mistakes</h2>
        <ComparisonTable
          headers={["Mistake","Symptom","Fix"]}
          rows={[
            ["DNAT without security policy","NAT counter increments, policy never matches","Write security policy for correct address representation per platform"],
            ["Missing NAT exemption for VPN","VPN traffic gets SNAT'd to public IP","Add no-NAT rule above SNAT for VPN destinations"],
            ["Wrong NAT rule order","Correct NAT rule exists but not matching","Check NAT rule evaluation order — more specific rules higher"],
            ["Return routing broken","DNAT works for server, replies go direct","Server must route back through firewall for reverse DNAT"],
          ]}
        />
      </section>

      <section id="troubleshooting-flow">
        <h2 style={S.h2}>Phase 2 Practical Troubleshooting Flow</h2>
        <CodeBlock lang="text">{"Traffic not working — systematic check:\n\n1. Check traffic logs: Does firewall see the flow? Which rule matched?\n   DENY → identify why: wrong zone? Wrong address? Wrong service? Shadowed rule?\n   ALLOW → proceed to step 2\n\n2. Check NAT table: Is expected translation present?\n   No entry → NAT rule not matching — check rule, order, conditions\n   Wrong translation → NAT rule mismatch\n\n3. Check routing: Valid route for translated/forwarded destination?\n   No route → traffic forwarded to wrong interface or dropped\n\n4. Check return: Is return traffic arriving at firewall?\n   No → investigate server-side routing and return path\n\nWork systematically. Do not assume a universal NAT-versus-policy evaluation order."}</CodeBlock>
      </section>

      <section id="phase2-takeaways">
        <h2 style={S.h2}>Phase 2 Key Takeaways</h2>
        <ul style={S.ul}>
          <li>Address and service objects: use them always</li>
          <li>SNAT changes source; DNAT changes destination; PAT is SNAT with port differentiation</li>
          <li>NAT processing order relative to policy: platform-specific — verify and test</li>
          <li>DNAT ≠ traffic permitted — security policy required separately</li>
          <li>No-NAT exemption required for VPN traffic that must preserve original addresses</li>
          <li>Hit counters: zero hits = investigate shadow, wrong match criteria, or different path</li>
        </ul>
      </section>

      {/* Phase 3 — NGFW, Threat Inspection & Encrypted Traffic */}
      <section id="ngfw-adds">
        <h2 style={S.h2}>NGFW Kya Add Karta Hai?</h2>
        <p style={S.p}>Traditional stateful firewall ka core job tha: connection state track karo, policy pe match karo, permit ya deny karo. NGFW commonly adds: application awareness, deeper traffic inspection, IPS/threat prevention, URL/category controls, malware/file inspection, identity integration, encrypted-traffic inspection capabilities.</p>
        <Callout type="warning" title="NGFW is a Product Category, Not a Protocol Standard">
          "NGFW" is an industry and marketing product category — not a formal protocol standard or universally fixed definition. Feature sets, implementation depth, and capabilities differ significantly by vendor and platform.
        </Callout>
      </section>

      <section id="inspection-levels">
        <h2 style={S.h2}>Packet Inspection Levels</h2>
        <ComparisonTable
          headers={["Level","What firewall sees","Processing overhead"]}
          rows={[
            ["Header inspection","Src/dst IP, protocol, port, TTL","Minimal"],
            ["Stateful/session","Connection state, directionality, TCP state (depth varies)","Low"],
            ["Application-aware","Identified application (where determinable)","Moderate"],
            ["Content/threat","Payload patterns, file types, URLs, malicious signatures","Higher"],
          ]}
        />
      </section>

      <section id="app-identification">
        <h2 style={S.h2}>Application Identification</h2>
        <p style={S.p}>Firewalls may use combinations of techniques to identify applications. <strong>Application identification is probabilistic — not guaranteed.</strong> Encrypted traffic significantly limits what can be identified without decryption. TCP/443 ≠ HTTPS.</p>
      </section>

      <section id="app-control">
        <h2 style={S.h2}>Application Control</h2>
        <p style={S.p}>Port-based policy: PERMIT TCP/443 → allows any application on that port — no differentiation. Application-aware policy: attempts to allow only identified approved applications. Application identification is a layer on top — not a replacement for port controls.</p>
      </section>

      <section id="ids-ips-firewall">
        <h2 style={S.h2}>IDS vs IPS vs Firewall</h2>
        <ComparisonTable
          headers={["","Firewall","IDS","IPS"]}
          rows={[
            ["Primary function","Access control — permit/deny based on policy","Detect and alert on suspicious/malicious activity","Detect and actively block/respond to threats"],
            ["Traffic path","Inline (traffic passes through)","Inline or out-of-band (copy/tap)","Typically inline"],
            ["Blocking capability","Yes — core function","Alert only (in passive/out-of-band mode)","Yes — can drop/block"],
          ]}
        />
      </section>

      <section id="ips">
        <h2 style={S.h2}>Intrusion Prevention System (IPS)</h2>
        <p style={S.p}>Conceptually, IPS inspection is applied to traffic that is eligible for threat inspection under the firewall's policy and processing architecture. Exact processing order and integration are platform-dependent.</p>
        <Figure caption="IPS inspection flow — conceptual. Signature matching is not the only detection technique."><IpsInspectionFlow /></Figure>
      </section>

      <section id="ips-signatures">
        <h2 style={S.h2}>IPS Signatures and Updates</h2>
        <ComparisonTable
          headers={["","Definition","Engineering implication"]}
          rows={[
            ["False positive","Legitimate traffic detected as malicious","Unnecessary blocks, application disruption — requires tuning"],
            ["False negative","Malicious traffic not detected","Threat passes through uninspected — signatures may not cover new/unknown attacks"],
          ]}
        />
        <Callout type="warning" title="Latest Signatures ≠ Complete Security">
          Signatures only detect known patterns. Zero-day exploits, novel techniques, heavily obfuscated/encrypted threats may not be detected. IPS is one layer in defense-in-depth.
        </Callout>
      </section>

      <section id="protocol-decoding">
        <h2 style={S.h2}>Protocol Decoding and Anomaly Detection</h2>
        <p style={S.p}>Protocol decoding understands the structure of a specific protocol and validates that traffic actually conforms to it. Protocol decoders are not identical across platforms — which protocols are decoded, depth of analysis, accuracy, and performance vary by product and version.</p>
      </section>

      <section id="url-filtering">
        <h2 style={S.h2}>URL Filtering</h2>
        <p style={S.p}>URL filtering controls web destinations by domain, URL, or content category maintained in vendor databases. For ordinary HTTPS without TLS decryption, the HTTP request path is encrypted and unavailable to HTTP/URL-path inspection. Domain context may be inferred from DNS, IP/reputation, or TLS metadata where available.</p>
      </section>

      <section id="dns-security">
        <h2 style={S.h2}>DNS Security / Domain Controls</h2>
        <p style={S.p}>DNS provides a control opportunity — many threats depend on domain resolution to locate infrastructure. Blocking at DNS layer can stop threats before a TCP connection is established.</p>
        <Callout type="warning" title="Encrypted DNS Bypasses Firewall DNS Inspection">
          If clients use DoH (DNS over HTTPS) to external resolvers, an on-path firewall that does not decrypt or identify that DoH traffic may not have visibility into individual DNS queries. DNS architecture must account for this.
        </Callout>
      </section>

      <section id="file-inspection">
        <h2 style={S.h2}>File and Malware Inspection</h2>
        <p style={S.p}>When a file is transferred over a protocol the firewall can inspect and the traffic is not encrypted (or has been decrypted), the firewall may extract and inspect the file using: signature matching, file type identification, reputation, static analysis, or sandbox integration. In predominantly TLS environments, file inspection requires decryption.</p>
      </section>

      <section id="sandboxing">
        <h2 style={S.h2}>Sandboxing</h2>
        <p style={S.p}>Sandboxing attempts to analyze unknown or suspicious files by executing them in a controlled environment and observing behavior. Sandbox analysis takes time — verdict timing affects whether blocking is pre- or post-delivery. Sandboxing adds meaningful detection capability — it is not a guaranteed detection mechanism.</p>
      </section>

      <section id="tls-challenge">
        <h2 style={S.h2}>TLS/SSL Encryption Challenge</h2>
        <Figure caption="TLS visibility without decryption — what is and is not available to a passive on-path firewall"><TlsVisibility /></Figure>
      </section>

      <section id="tls-decryption-outbound">
        <h2 style={S.h2}>TLS/SSL Decryption / Outbound Inspection</h2>
        <Figure caption="Outbound TLS decryption — forward proxy architecture requiring client CA trust"><TlsDecryptionOutbound /></Figure>
      </section>

      <section id="tls-inspection-inbound">
        <h2 style={S.h2}>Inbound TLS Inspection</h2>
        <p style={S.p}>Inbound TLS inspection applies to traffic arriving from the internet toward an internal or DMZ server. Implementation approaches vary — not every method requires importing the server private key directly to the firewall. Available mechanisms depend on platform, deployment architecture, and certificate management policies.</p>
      </section>

      <section id="tls-limitations">
        <h2 style={S.h2}>TLS Inspection Limitations and Risks</h2>
        <ComparisonTable
          headers={["Area","Concern"]}
          rows={[
            ["Privacy","Firewall reads user communications — personal banking, healthcare. Jurisdiction-specific regulations apply."],
            ["Certificate pinning","Apps embedding specific expected certificate will reject firewall substitute — must be exempted or will break."],
            ["Performance impact","TLS decryption and advanced inspection consume additional resources. Magnitude depends on hardware, cipher suites, traffic mix, enabled profiles."],
            ["QUIC/HTTP3","QUIC uses UDP with integrated TLS — TCP-based TLS inspection approaches do not directly apply."],
            ["Regulatory/compliance","In some industries/jurisdictions, decrypting certain traffic may require explicit consent or may be restricted."],
          ]}
        />
        <p style={S.p}><strong>Decryption should be policy-driven, not &quot;decrypt everything.&quot;</strong> Financial, healthcare, personal, and authentication traffic may require exemption.</p>
      </section>

      <section id="threat-journey">
        <h2 style={S.h2}>Threat Prevention Packet Journey</h2>
        <Callout type="warning" title="Conceptual Teaching Flow">
          This is a conceptual flow for teaching purposes. Actual processing architecture, stage order, and implementation details are platform-dependent.
        </Callout>
        <CodeBlock lang="text">{"Scenario: HTTPS + TLS decryption + threat prevention (conceptual)\n\n1. SESSION ARRIVES → zone/interface assignment, session table lookup\n2. INITIAL POLICY / SESSION EVALUATION\n3. TLS HANDLING → decryption policy: decrypt / bypass / block\n4. APPLICATION IDENTIFICATION\n5. SECURITY PROFILE INSPECTION: IPS, URL, File, DNS\n6. VERDICT: Clean → continue | Threat → drop/reset/alert\n7. SESSION + LOG UPDATE\n8. FORWARD OR BLOCK\n\nNote: Exact processing order and stages are platform-dependent."}</CodeBlock>
      </section>

      <section id="ngfw-troubleshooting">
        <h2 style={S.h2}>Common NGFW Troubleshooting</h2>
        <ComparisonTable
          headers={["Symptom","Possible Cause","Engineering Check"]}
          rows={[
            ["Application shows unknown","Not in database; encrypted; insufficient traffic","Check if decryption active; check database updates"],
            ["Website fails with TLS inspection","Certificate pinning; client doesn't trust FW CA","Check browser cert error; confirm FW CA in trust store"],
            ["IPS false positive","Signature too broad for environment","Identify specific signature ID; create exception or tune to alert"],
            ["High CPU during inspection","TLS decryption overhead; high session rate","Check CPU by feature; verify sizing for enabled features"],
            ["Encrypted DNS bypassing DNS visibility","Clients using DoH/DoT","Block or redirect unauthorized encrypted DNS; enforce internal resolver"],
          ]}
        />
      </section>

      <section id="phase3-takeaways">
        <h2 style={S.h2}>Phase 3 Key Takeaways</h2>
        <ul style={S.ul}>
          <li>NGFW adds context/inspection beyond basic port filtering — it is a product category, not a protocol standard</li>
          <li>Application identification is probabilistic — not guaranteed. Encryption limits identification without decryption. TCP/443 ≠ HTTPS.</li>
          <li>IPS detects and blocks in permitted traffic — signatures, protocol anomaly, behavioral techniques. Not signatures alone.</li>
          <li>TLS encryption limits content visibility. SNI and certificate info NOT universally visible. ECH (RFC 9849) encrypts SNI when negotiated.</li>
          <li>TLS decryption adds visibility but adds performance overhead, privacy considerations, certificate trust management, and troubleshooting complexity. Deploy selectively.</li>
        </ul>
      </section>

      {/* Phase 5 — VPN, IPsec */}
      <section id="vpn-what">
        <h2 style={S.h2}>VPN Kya Hota Hai?</h2>
        <p style={S.p}>VPN (Virtual Private Network) ek protected connectivity mechanism hai jo untrusted ya shared network (typically internet) ke across communicating endpoints ke beech security properties provide karta hai.</p>
        <ComparisonTable
          headers={["Property","What it provides"]}
          rows={[
            ["Confidentiality","Traffic content unauthorized parties ke liye unreadable — through encryption"],
            ["Integrity/Authenticity","Traffic in transit tampered nahi kiya gaya — through cryptographic integrity checks"],
            ["Peer/User Authentication","Communication ka dusra end actually wahi hai jo claim kar raha hai"],
          ]}
        />
        <Callout type="warning" title="VPN ≠ Automatic Trust">
          <ul style={S.ul}>
            <li>VPN ≠ anonymous internet access — VPN gateway ko source pata hota hai</li>
            <li>VPN ≠ completely trusted traffic — VPN-delivered traffic bhi inspect hona chahiye</li>
            <li>VPN ≠ malware-free traffic — encrypted malware bhi VPN se travel kar sakta hai</li>
          </ul>
        </Callout>
      </section>

      <section id="site-to-site">
        <h2 style={S.h2}>Site-to-Site VPN Architecture</h2>
        <Figure caption="Site-to-site VPN architecture — gateway-to-gateway. Exact processing order is platform-dependent."><SiteToSiteVpnArch /></Figure>
        <p style={S.p}>Protected internal traffic is carried through an encrypted tunnel between VPN gateways. Endpoints communicate using their internal addresses — gateways handle VPN processing transparently. Routing, NAT, and tunnel behavior depend on design and platform architecture.</p>
      </section>

      <section id="remote-access">
        <h2 style={S.h2}>Remote-Access VPN Architecture</h2>
        <p style={S.p}>Remote employees ya mobile users enterprise resources securely access karte hain via VPN. Remote-access VPN may use IPsec, TLS-based tunnel mechanisms, or vendor-specific technologies. Do not equate remote-access VPN universally with "SSL VPN" — that is one implementation approach, not the category definition.</p>
      </section>

      <section id="ipsec-arch">
        <h2 style={S.h2}>IPsec Architecture</h2>
        <p style={S.p}>IPsec is a <strong>suite of mechanisms</strong> — not a single protocol.</p>
        <ComparisonTable
          headers={["Component","Role"]}
          rows={[
            ["ESP (Encapsulating Security Payload)","Primary data protection — confidentiality, integrity/authentication, anti-replay. Used in modern enterprise VPN."],
            ["AH (Authentication Header)","Authentication/integrity without confidentiality. Rarely used in modern enterprise VPN — NAT compatibility issues."],
            ["IKE (Internet Key Exchange)","Peer authentication, algorithm negotiation, Security Association management"],
            ["Security Associations (SA)","Negotiated state defining algorithms, keys, parameters for one direction of protected traffic"],
          ]}
        />
      </section>

      <section id="esp">
        <h2 style={S.h2}>ESP — Encapsulating Security Payload</h2>
        <p style={S.p}>ESP can provide, depending on negotiated security services and algorithms: confidentiality (through encryption where negotiated), data-origin authentication and integrity (through dedicated integrity algorithm or combined AEAD mode), and anti-replay protection (when applicable sequence-number window is used). For AEAD algorithms such as AES-GCM, authentication and encryption are combined — no separate integrity algorithm is required or negotiated.</p>
      </section>

      <section id="tunnel-transport">
        <h2 style={S.h2}>Tunnel Mode vs Transport Mode</h2>
        <ComparisonTable
          headers={["","Tunnel Mode","Transport Mode"]}
          rows={[
            ["What is protected","Entire original IP packet (header + payload) — under new outer IP","For ESP in transport mode: IP payload protected. Original IP header not encrypted by ESP."],
            ["Outer header","New outer IP header added by gateway","Original IP header used (with modifications)"],
            ["Common use","Gateway-to-gateway / site-to-site VPN","Host-to-host or specific encapsulation designs"],
          ]}
        />
      </section>

      <section id="ike">
        <h2 style={S.h2}>IKE Kya Karta Hai?</h2>
        <p style={S.p}>IKE (Internet Key Exchange) peer authentication aur cryptographic negotiation handle karta hai. IKE ke bina, dono VPN gateways ko manually keys aur parameters share karne padte — which doesn&apos;t scale and carries operational risk.</p>
        <ComparisonTable
          headers={["","IKE SA","CHILD SA / IPsec SA"]}
          rows={[
            ["What it secures","IKE control traffic between peers","Actual user/application data traffic"],
            ["Established by","IKE_SA_INIT establishes keying material; IKE_AUTH completes authenticated SA","After IKE SA established — normally in IKE_AUTH exchange"],
            ["Purpose","Protects IKE negotiation messages","Carries ESP-protected data"],
          ]}
        />
      </section>

      <section id="ikev2-flow">
        <h2 style={S.h2}>IKEv2 Connection Flow</h2>
        <Callout type="danger" title="IKEv2 ≠ IKEv1 Phase 1/Phase 2">
          IKEv2 does NOT use IKEv1&apos;s Phase 1/Phase 2 terminology. These terms apply to IKEv1 only. Using them for IKEv2 is technically incorrect.
        </Callout>
        <Figure caption="IKEv2 negotiation flow — IKE_SA_INIT then IKE_AUTH. SA lifetime is locally configured per peer — not a negotiated IKEv2 parameter."><Ikev2NegotiationFlow /></Figure>
      </section>

      <section id="psk-certs">
        <h2 style={S.h2}>Authentication: PSK vs Certificates</h2>
        <ComparisonTable
          headers={["","Pre-Shared Key (PSK)","Certificate / Public Key"]}
          rows={[
            ["Setup complexity","Low — configure same key on both ends","Higher — requires PKI, certificate issuance, distribution"],
            ["Scale","Poor — key distribution/rotation across many peers is operationally difficult","Better — identity managed through PKI"],
            ["Compromised credential","Affects all sessions using that key","Revoke that certificate via CRL/OCSP — does not affect others"],
          ]}
        />
      </section>

      <section id="crypto-algorithms">
        <h2 style={S.h2}>Cryptographic Algorithms</h2>
        <ComparisonTable
          headers={["Category","Modern examples","Legacy/deprecated"]}
          rows={[
            ["Encryption","AES-GCM-128/256, AES-CBC-128/256","DES, 3DES (weak/deprecated)"],
            ["Integrity/Auth","HMAC-SHA-256/384/512; AES-GCM integrates this","HMAC-MD5, HMAC-SHA-1 (deprecated per modern guidance)"],
            ["DH/ECDH groups","Group 14 (2048-bit), Group 19 (P-256), Group 20 (P-384)","Groups 1, 2, 5 (weak — avoid in new deployments)"],
          ]}
        />
        <p style={S.p}>Algorithm suitability evolves as cryptographic research advances. Consult current NIST, NCSC, or equivalent authority guidance for your jurisdiction. Do not configure deprecated algorithms in new deployments.</p>
      </section>

      <section id="security-associations">
        <h2 style={S.h2}>Security Associations (SA)</h2>
        <p style={S.p}>An SA represents negotiated security state for one direction of IPsec-protected communication. A bidirectional IPsec session requires a pair of SAs — one for each direction, independent keys and sequence numbers. Receiving peer uses destination IP + security protocol (ESP/AH) + SPI to look up applicable SA in Security Association Database (SAD). SPI is locally significant to receiving peer — not globally unique.</p>
      </section>

      <section id="traffic-selectors">
        <h2 style={S.h2}>Interesting Traffic / Traffic Selectors</h2>
        <p style={S.p}>Traffic selectors define which source/destination combinations should be protected by a particular IPsec SA. Selector mismatch is a common VPN failure — CHILD SA may fail, may be narrowed, or may appear established but not protect the intended traffic.</p>
        <CodeBlock lang="text">{"Example:\n  Branch TS: 10.10.10.0/24\n  DC TS:     10.20.20.0/24\n\nTraffic from 10.10.10.25 → 10.20.20.50:\n  → Matches both selectors → enters VPN\n\nTraffic from 10.10.10.25 → 8.8.8.8:\n  → Does not match DC TS → takes normal routing path"}</CodeBlock>
      </section>

      <section id="routing-vpn">
        <h2 style={S.h2}>Routing and VPN</h2>
        <Callout type="danger" title="VPN Established ≠ Traffic Reaches Destination">
          A cryptographically established tunnel does not automatically mean traffic reaches its destination. Routing must direct the right traffic into the VPN, and return routing must work at the remote end.
        </Callout>
      </section>

      <section id="nat-ipsec">
        <h2 style={S.h2}>NAT and IPsec</h2>
        <p style={S.p}>Common problem: traffic intended for VPN accidentally matches an internet-bound SNAT rule and gets translated instead of encrypted. Fix: NAT exemption / no-NAT rule for VPN-bound traffic. Verify whether the VPN design requires traffic to remain untranslated. NAT/VPN processing order is platform-dependent.</p>
      </section>

      <section id="nat-t">
        <h2 style={S.h2}>NAT Traversal (NAT-T)</h2>
        <p style={S.p}>Native IPsec ESP (IP protocol 50) does not carry TCP/UDP ports, which creates practical challenges for NAT devices attempting to maintain per-flow translation state. NAT-T encapsulates ESP in UDP to address this. In IKEv2, NAT detection uses NAT_DETECTION_SOURCE_IP and NAT_DETECTION_DESTINATION_IP notifications during IKE_SA_INIT. When NAT detected, IKE and UDP-encapsulated ESP move to UDP 4500.</p>
      </section>

      <section id="split-full-tunnel">
        <h2 style={S.h2}>Split Tunnel vs Full Tunnel</h2>
        <ComparisonTable
          headers={["","Full Tunnel","Split Tunnel"]}
          rows={[
            ["Traffic routing","Enterprise-configured/default traffic via VPN","Only specified enterprise destinations via VPN; rest: local path per policy"],
            ["Enterprise visibility","More traffic subject to enterprise policy","Only VPN-bound traffic inspected by enterprise"],
            ["Bandwidth","Higher on VPN link","Lower on VPN link"],
          ]}
        />
        <p style={S.p}>Split tunneling is not inherently insecure. Security depends on endpoint controls, split-tunnel policy design, and what the VPN is protecting.</p>
      </section>

      <section id="rekey-antireplay">
        <h2 style={S.h2}>VPN Rekey, Lifetime and Anti-Replay</h2>
        <p style={S.p}>IPsec SA lifetimes are locally configured on each peer. In IKEv2, SA lifetime is not a negotiated protocol parameter — each peer applies its own locally configured lifetime policy and initiates rekey independently. Anti-replay uses a sliding window — does not drop every out-of-order packet. The sliding window allows for packets arriving slightly out of order within window bounds.</p>
      </section>

      <section id="vpn-troubleshooting">
        <h2 style={S.h2}>VPN Troubleshooting Workflow</h2>
        <ComparisonTable
          headers={["Symptom","Likely Area","Engineering Check"]}
          rows={[
            ["IKE SA not establishing","Peer reachability / UDP blocked","Verify peer IP reachability; check UDP 500 not blocked; UDP 4500 if NAT-T expected"],
            ["Authentication failure","PSK mismatch / cert issue","Verify PSK matches exactly; check cert validity/trust chain"],
            ["Proposal mismatch","Incompatible IKE or IPsec proposals","Compare encryption/integrity/DH proposals on both peers"],
            ["IKE SA up, no CHILD SA","Traffic selector mismatch / IPsec proposal mismatch","Check TS/selector definitions both sides"],
            ["Tunnel up but no traffic","Routing wrong / NAT interference / selector mismatch","Check route; check NAT exemption; verify encap counters"],
            ["One-way traffic","Return route missing; selector/policy; asymmetric routing","Verify routing at remote end; confirm selectors cover both directions"],
          ]}
        />
      </section>

      <section id="phase5-takeaways">
        <h2 style={S.h2}>Phase 5 Key Takeaways</h2>
        <ul style={S.ul}>
          <li>VPN provides protected connectivity — not automatic trust, not anonymity</li>
          <li>IPsec is a protocol suite — ESP carries protected data; IKE handles peer auth and negotiation</li>
          <li>IKEv2: IKE_SA_INIT (proposals + DH keying) → IKE_AUTH (authentication + first CHILD SA). Not IKEv1 Phase 1/Phase 2.</li>
          <li>SAs are directional — one per direction. Inbound SA identified by destination IP + ESP/AH + SPI.</li>
          <li>Tunnel established ≠ traffic reaches destination. Routing and selectors must also be correct.</li>
          <li>ESP = IP Protocol 50. AH = IP Protocol 51. NAT-T uses UDP encapsulation when NAT detected.</li>
        </ul>
      </section>

      {/* Phase 4 — HA Architecture Deep Dive */}
      <section id="fw-ha-why">
        <h2 style={S.h2}>Firewall HA Kyu Chahiye?</h2>
        <p style={S.p}>Single firewall = single point of failure for everything it protects. Hardware failure, software crash, power event, or forced maintenance window — aur us firewall pe dependent har cheez impact ho jaati hai: internet egress/ingress, inter-zone traffic, inbound published services, VPN tunnels.</p>
        <p style={S.p}><strong>HA ka objective:</strong> Firewall node ko topology mein single point of failure hone se bachao. Ek peer fail ho — dusra peer required forwarding responsibility assume kare — service continuity maximum ho.</p>
        <Callout type="danger" title="HA eliminates firewall SPOF — not all surrounding SPOFs">
          Two healthy firewall appliances still do not guarantee service availability if both share: the same upstream switch, the same downstream switch, the same UPS/power feed, the same ISP handoff, or the same configuration error. Design HA end-to-end — not just the firewall pair.
        </Callout>
      </section>

      <section id="ha-pair-arch">
        <h2 style={S.h2}>HA Pair Basic Architecture</h2>
        <p style={S.p}>Conceptual two-firewall architecture: both peers have connectivity toward relevant upstream and downstream networks. They maintain a peer relationship — sharing configuration state, health signals, and where supported, runtime/session state. The logical service they provide (the security enforcement point) continues even if one peer loses forwarding capability.</p>
        <Figure caption="HA Firewall Pair — Active/Passive architecture. Failover sequence is platform-dependent."><HaFirewallPair /></Figure>
        <p style={S.p}><strong>What HA pair provides as a logical unit:</strong> shared security policy enforcement, shared address/routing presence (mechanism varies by platform/design), coordinated state where synchronized. <strong>What it does not automatically provide:</strong> redundant upstream/downstream connectivity, recovery from shared configuration errors applied to both peers.</p>
      </section>

      <section id="ha-heartbeat">
        <h2 style={S.h2}>HA Control Link aur Heartbeat</h2>
        <p style={S.p}>Peers need a mechanism to determine each other&apos;s health, coordinate roles, and detect failure. This is typically called a heartbeat, control link, or HA control channel. Information it needs to convey: &quot;I am alive and healthy,&quot; current role (Active/Standby), health of monitored interfaces/paths, synchronization status, and failure/degradation events.</p>
        <Callout type="warning" title="No Universal HA Protocol or Timer">
          The protocol used, packet format, timers, detection intervals, and failure-detection logic are platform-specific. Timer tuning affects how quickly failover occurs (fast detection vs. false-positive risk) and is a deliberate design choice. A single HA link is itself a potential SPOF — many platforms support redundant HA control paths.
        </Callout>
      </section>

      <section id="failover-triggers">
        <h2 style={S.h2}>What Triggers Firewall Failover?</h2>
        <ComparisonTable
          headers={["Condition","Description"]}
          rows={[
            ["Peer/node failure","Active peer crashes, reboots, or loses power"],
            ["HA heartbeat/control link loss","Active peer becomes unreachable via HA control mechanism"],
            ["Monitored interface failure","Interface configured as HA-critical goes down"],
            ["Monitored path failure","Active probe to configured target fails (where supported)"],
            ["Process/service health failure","Critical internal process fails on Active peer"],
            ["Manual failover","Engineer manually initiates role transition for maintenance"],
          ]}
        />
        <Callout type="important" title="Platform and Configuration Dependent">
          Actual monitored conditions, detection thresholds, failure weights, and failover logic are platform and configuration dependent. The same physical event may or may not trigger failover depending on what is monitored and what threshold is configured. Design HA monitoring explicitly — do not rely on defaults without understanding what they detect.
        </Callout>
      </section>

      <section id="ha-link-failure">
        <h2 style={S.h2}>HA Link Failure Impact</h2>
        <ComparisonTable
          headers={["Link type","Purpose","Failure consequence"]}
          rows={[
            ["HA control / heartbeat link","Peer health signals, role coordination","Loss may trigger failover detection after timeout — depends on redundancy and platform"],
            ["State synchronization link","Session/NAT/runtime state replication","Loss may stop state sync — new sessions may not sync — failover continuity reduced"],
            ["Data / production links","Actual forwarding interfaces","Failure may trigger monitored-interface failover if configured"],
          ]}
        />
        <p style={S.p}>Loss or degradation of a state-synchronization path may reduce or stop replication of new/updated runtime state to the peer. Production forwarding may continue, but stateful failover capability can be degraded. <strong>This degraded-but-not-failed condition must be monitored and alerted.</strong></p>
      </section>

      <section id="upstream-downstream-design">
        <h2 style={S.h2}>Upstream and Downstream Network Design</h2>
        <p style={S.p}>A firewall HA pair provides firewall-node redundancy. The surrounding network must be equally resilient or the firewalls&apos; redundancy provides limited operational benefit.</p>
        <CodeBlock lang="text">{"Resilient reference architecture:\n\nISP-A        ISP-B\n  ↓            ↓\nEdge-Router-A  Edge-Router-B\n       ↓     ↓\n  Upstream Switch/Router pair (redundant)\n       ↓     ↓\n  Firewall A   Firewall B  ← HA pair\n       ↓     ↓\n  Downstream Switch/Router pair (redundant)\n       ↓     ↓\n  Data center networks\n\nEach layer should be at least as resilient as the firewall HA pair."}</CodeBlock>
      </section>

      <section id="l2-l3-ha">
        <h2 style={S.h2}>Layer 2 vs Layer 3 HA Connectivity</h2>
        <ComparisonTable
          headers={["Model","Description","Consideration"]}
          rows={[
            ["Shared L2 segment","Both firewall peers connect to same broadcast domain upstream/downstream","Simpler virtual IP/ARP failover; shared L2 has its own redundancy requirements"],
            ["Routed L3 interfaces","Each firewall peer routes independently; no shared L2","More complex failover address mechanics; routing must converge; more flexible placement"],
            ["Mixed","L2 downstream, L3 upstream (or vice versa)","Per-segment design"],
          ]}
        />
        <p style={S.p}>HA does not require L2 adjacency between peers or between peers and the surrounding network. Many enterprise and data center deployments use routed L3 designs with dynamic routing to handle failover path updates. The appropriate model depends on the network architecture, platform capability, and operational requirements.</p>
      </section>

      <section id="asymmetric-routing-ha">
        <h2 style={S.h2}>Asymmetric Routing in HA</h2>
        <p style={S.p}>Asymmetric routing is a particular concern in multi-firewall designs because different firewalls may see different directions of the same flow.</p>
        <CodeBlock lang="text">{"Example asymmetric scenario:\n\nForward path:\nClient → upstream → Firewall A → downstream → Server\n\nReturn path:\nServer → downstream → Firewall B → upstream → Client\n\nFirewall A: has session state (saw the SYN)\nFirewall B: no session state — only sees return packets\n\nOutcome depends on architecture:\n  No state sync → Firewall B drops return → session fails\n  State sync active → Firewall B has state from sync → may handle correctly\n  Platform with asymmetric flow support → behavior documented per platform"}</CodeBlock>
        <p style={S.p}>Asymmetric routing does not universally fail — outcome depends on whether the receiving peer has compatible state through synchronization or platform capability. Symmetric design is operationally simpler because state is always local; asymmetric handling is an explicitly designed exception.</p>
      </section>

      <section id="ha-testing">
        <h2 style={S.h2}>HA Testing — Not Just Configuring</h2>
        <Callout type="danger" title="Configured HA ≠ Working HA">
          Configured redundancy that is never tested cannot be trusted. HA failover testing should be performed under an approved maintenance/change procedure with monitoring in place, a defined rollback plan, and stakeholder communication.
        </Callout>
        <ul style={S.ul}>
          <li><strong>Planned failover test:</strong> Manually initiate failover — verify traffic continues, verify roles transition as expected, verify failback behavior</li>
          <li><strong>Failure simulation:</strong> Simulate failure of an interface/path configured as HA-critical — verify expected failover condition is triggered</li>
          <li><strong>HA link failure test:</strong> Disconnect HA control/sync link — does split-brain protection work? Does sync recover when link restored?</li>
          <li><strong>State sync verification:</strong> Establish sessions through active peer → initiate failover → verify which sessions survived</li>
          <li><strong>New session test:</strong> After failover, verify new sessions work through new active peer</li>
          <li><strong>Failback test:</strong> Verify automatic vs manual failback behavior — unexpected automatic failback can cause disruption</li>
        </ul>
      </section>

      <section id="phase4-takeaways">
        <h2 style={S.h2}>Phase 4 Key Takeaways</h2>
        <ul style={S.ul}>
          <li>Single firewall = SPOF for all traffic it enforces. HA removes the firewall node as a SPOF — not every SPOF in the network.</li>
          <li>HA design must extend to power, switching, and routing — not just appliance redundancy.</li>
          <li>HA control link is itself a potential SPOF — design redundant HA paths.</li>
          <li>Failover triggers, timers, and detection logic are platform and configuration dependent.</li>
          <li>Sync link loss = production forwarding may continue but stateful failover capability degrades — must be monitored.</li>
          <li>Asymmetric routing: symmetric design is simpler for stateful firewalls; asymmetric handling requires explicit design.</li>
          <li>HA must be tested under change control — configured ≠ working.</li>
        </ul>
      </section>

      {/* Phase 6 — HA */}
      <section id="fw-ha-what">
        <h2 style={S.h2}>Firewall High Availability Kya Hai?</h2>
        <p style={S.p}>High Availability (HA) uses multiple firewall nodes so failure of one node does not necessarily remove the security gateway service. HA reduces the duration and frequency of outages — it does not eliminate them. Failover involves detection delay, role-transition processing, neighbor/routing convergence, and potential session disruption.</p>
      </section>

      <section id="ha-why">
        <h2 style={S.h2}>Why Firewall HA Is Required</h2>
        <Callout type="danger" title="Hidden SPOFs Around the HA Pair">
          Two healthy firewall appliances still do not guarantee service availability if both share: the same upstream switch, the same downstream switch, the same UPS/power feed, the same ISP handoff, or the same configuration error. HA engineering principle: remove the firewall as a SPOF without creating hidden SPOFs around it.
        </Callout>
      </section>

      <section id="active-passive">
        <h2 style={S.h2}>Active/Passive Architecture</h2>
        <p style={S.p}>One peer handles production forwarding; the other stays ready. Forwarding ownership is unambiguous at any time. State synchronization direction is clear (Active → Passive). Passive does not always mean completely idle — may handle management/HA traffic depending on platform and design.</p>
      </section>

      <section id="active-active">
        <h2 style={S.h2}>Active/Active Architecture</h2>
        <p style={S.p}>Both nodes actively process traffic. Active/active is NOT universally "50/50 load balancing" and does NOT automatically double throughput. Traffic distribution models, session ownership, state synchronization scope, and failure behavior are platform-specific. Surviving peer absorbs all traffic — sizing must accommodate.</p>
      </section>

      <section id="ha-control">
        <h2 style={S.h2}>HA Control Link, Heartbeat and Peer Health</h2>
        <p style={S.p}>Peers need a mechanism to monitor each other's health, coordinate roles, and exchange state. No universal HA protocol, port, timer, or packet format — these are vendor/platform-specific. A single HA link is itself a potential SPOF. Many platforms support redundant HA control/heartbeat paths.</p>
      </section>

      <section id="config-sync">
        <h2 style={S.h2}>Configuration Synchronization</h2>
        <p style={S.p}>Configuration synchronization ensures both peers apply consistent security policy. What may NOT synchronize automatically (platform-dependent): management interface addressing, device certificates/node identity, private keys, local routing state, licensing state.</p>
        <Callout type="danger" title="Never Assume Sync — Verify">
          After any policy change, verify synchronization completed successfully on both peers. Configuration drift means different policy enforcement after failover.
        </Callout>
      </section>

      <section id="session-sync">
        <h2 style={S.h2}>Session / State Synchronization</h2>
        <p style={S.p}>Configuration synchronization alone is insufficient for seamless failover. Session state synchronization attempts to replicate runtime flow information to the standby peer. Not all state types always synchronized. Session sync increases continuity for supported session types — does not guarantee every connection continues.</p>
      </section>

      <section id="stateful-stateless-failover">
        <h2 style={S.h2}>Stateful vs Stateless Failover</h2>
        <ComparisonTable
          headers={["","Stateful Failover","Stateless Failover"]}
          rows={[
            ["Session state on new active","Relevant runtime state replicated","No prior session state available"],
            ["Existing sessions","Supported sessions may continue with reduced interruption — depends on sync completeness, failover timing, network convergence, application behavior","Sessions must re-establish"],
            ["Operational complexity","Higher — sync mechanism must work correctly","Lower — peer simply starts forwarding"],
          ]}
        />
      </section>

      <section id="failover-sequence">
        <h2 style={S.h2}>What Actually Happens During Failover?</h2>
        <Figure caption="HA failover timeline — conceptual. Timing and exact order are platform-dependent. Some stages may overlap."><HaFailoverTimeline /></Figure>
        <CodeBlock lang="text">{"Conceptual failover sequence (platform-dependent):\n\n1. FAILURE CONDITION DETECTED\n2. HA DECISION (platform-specific arbitration)\n3. ROLE TRANSITION — passive transitions to active\n4. INTERFACE/ADDRESS OWNERSHIP — new active assumes IP/MAC\n5. NEIGHBOR/L2 UPDATES + ROUTING CONVERGENCE (may occur in parallel)\n6. SESSION HANDLING\n   Synchronized: may continue with brief disruption\n   Unsynchronized: reset — app must reconnect\n7. TRAFFIC STABILIZES"}</CodeBlock>
      </section>

      <section id="address-mac-neighbor">
        <h2 style={S.h2}>IP Address, MAC and Neighbor Update During Failover</h2>
        <ul style={S.ul}>
          <li><strong>IPv4 — ARP Announcement:</strong> New active peer sends ARP announcement for shared IP. Adjacent devices update ARP caches.</li>
          <li><strong>IPv6 — Unsolicited Neighbor Advertisement:</strong> RFC 4861; RFC 9131 updates for proactive unsolicited NAs. Not an unconditional cache rewrite.</li>
          <li><strong>Routed L3 designs:</strong> Routing protocol convergence is the primary mechanism, not L2 ARP/ND.</li>
        </ul>
      </section>

      <section id="routing-failover">
        <h2 style={S.h2}>Routing During Firewall Failover</h2>
        <p style={S.p}>Firewall role transition and routing convergence are separate but interacting events. Routing adjacency and routing-state behavior across an HA transition is platform- and architecture-dependent. Do not assume routing-protocol state or adjacencies are synchronized between HA peers unless the platform documentation explicitly confirms it.</p>
      </section>

      <section id="nat-failover">
        <h2 style={S.h2}>NAT State During Failover</h2>
        <p style={S.p}>If the new active peer lacks state to associate return packet with the existing translated flow, transparent continuation may fail — traffic may be dropped, re-evaluated, or application reconnection required (platform/protocol dependent). Whether NAT translation state and security session state are stored in separate or integrated structures is platform-dependent.</p>
      </section>

      <section id="vpn-failover">
        <h2 style={S.h2}>VPN State During Failover</h2>
        <ComparisonTable
          headers={["State Component","Relevance to Failover"]}
          rows={[
            ["IKE SA state","If not synced: full IKE renegotiation required"],
            ["CHILD SA / IPsec SA state","If not synced: IPsec renegotiation required"],
            ["Anti-replay / sequence state","Gap or reset may cause anti-replay drops on remote peer"],
            ["Routing","Must be valid on new active peer"],
          ]}
        />
        <p style={S.p}>VPN state synchronization capability varies widely by platform. Some platforms synchronize IKE and IPsec SA state fully; some only tunnel configuration; some do not synchronize VPN state at all.</p>
      </section>

      <section id="split-brain">
        <h2 style={S.h2}>Split-Brain / Dual-Active Condition</h2>
        <Figure caption="Split-brain / dual-active condition — causes, consequences, and prevention concepts"><SplitBrainCondition /></Figure>
      </section>

      <section id="link-path-monitoring">
        <h2 style={S.h2}>Link and Path Monitoring</h2>
        <p style={S.p}>A firewall node being alive and healthy does not mean the network path through it is serviceable. A WAN link failure, upstream switch failure, or monitored gateway being unreachable — node can show healthy while service is unavailable.</p>
        <p style={S.p}><strong>The monitoring balance problem:</strong> Aggressive monitoring detects failures faster but risks false positives. Conservative monitoring misses real failures. Design monitoring thresholds to match actual failure domains — then test in controlled scenarios.</p>
      </section>

      <section id="ha-troubleshooting">
        <h2 style={S.h2}>Firewall HA Testing and Troubleshooting</h2>
        <ComparisonTable
          headers={["Symptom","Likely Area","Engineering Check"]}
          rows={[
            ["Peer shows as down","HA control link; peer hardware/software","Check HA link physical status; check peer via OOB"],
            ["Config out of sync","Failed sync; per-node item; sync fault","Compare config between peers; verify last sync timestamp"],
            ["Failover occurred but traffic still down","Neighbor/MAC/routing not updated","Check ARP/ND on adjacent devices; check routing table"],
            ["Only some sessions broke","Certain session types not in sync scope","Identify common characteristics; compare against platform sync scope"],
            ["NAT sessions fail after takeover","NAT state not synchronized","Check NAT table on new active; verify NAT sync was operational"],
            ["VPN tunnels renegotiate","IKE/CHILD SA state not synced","Check VPN SA table on new active; verify platform VPN HA capability"],
            ["Duplicate IP/MAC symptoms","Split-brain","Check both peers' HA roles immediately; isolate one peer per change-control procedure"],
          ]}
        />
        <Callout type="danger" title="HA Must Be Tested — Not Just Configured">
          Configured redundancy that is never tested cannot be trusted. Test under approved maintenance/change procedure: HA control-link failure, production interface failure, monitored path failure, active-node reboot, manual failover, session continuity verification.
        </Callout>
      </section>

      <section id="phase6-takeaways">
        <h2 style={S.h2}>Phase 6 Key Takeaways</h2>
        <ul style={S.ul}>
          <li>HA removes/reduces firewall-node SPOF — not every surrounding SPOF (switch, power, ISP, routing)</li>
          <li>Active/Passive: simpler, unambiguous forwarding ownership. Active/Active: more utilization, significantly more complex design.</li>
          <li>Configuration sync and session/state sync are different mechanisms solving different problems. Both needed for good failover.</li>
          <li>Stateful failover improves session continuity for supported sessions — not zero disruption guaranteed</li>
          <li>Firewall role transition, neighbor/MAC updates, and routing convergence are separate events</li>
          <li>NAT state matters for existing translated flows — without it, return traffic cannot be correctly processed</li>
          <li>Split-brain is often worse than clean single-node failure — treat it as a priority incident</li>
          <li>Node health ≠ path health. HA must be tested — configured redundancy ≠ working redundancy</li>
        </ul>
      </section>

      {/* Phase 7 — Ops, Troubleshooting */}
      <section id="fw-ops-meaning">
        <h2 style={S.h2}>Firewall Operations Ka Real Meaning</h2>
        <ComparisonTable
          headers={["Responsibility","What it involves"]}
          rows={[
            ["Availability","Firewall aur HA health, failover readiness"],
            ["Traffic visibility","Logs, sessions, captures — understanding what is flowing and what is not"],
            ["Performance monitoring","CPU, sessions, throughput, connection rate — are we within capacity?"],
            ["Incident troubleshooting","Systematic diagnosis when something is broken"],
            ["Change control","Safe policy changes with rollback and validation"],
            ["Software lifecycle","OS/firmware currency, security advisories, end-of-support"],
          ]}
        />
        <Callout type="danger" title="Device UP ≠ Application UP">
          A firewall can show status as operational — while the application a user depends on is completely broken. Device health ≠ service health. The firewall is one node in a path that includes client, network, switches, server, application, database, and return path.
        </Callout>
      </section>

      <section id="fw-logs-what">
        <h2 style={S.h2}>Firewall Logs Kya Batate Hain?</h2>
        <ComparisonTable
          headers={["Log category","What evidence it provides"]}
          rows={[
            ["Traffic/Session logs","What flows were permitted or denied — source, destination, service, policy, action, bytes"],
            ["Threat/Security logs","IPS detections, malware findings, URL category blocks, application violations"],
            ["System logs","Firewall node events — process starts/stops, hardware events, temperature, resource alerts"],
            ["VPN logs","IKE/IPsec SA events, tunnel establishment, rekeying, authentication failures"],
            ["HA logs","Failover events, peer health changes, sync status, role transitions"],
            ["Configuration/Audit logs","Admin changes — who changed what rule, when, from where"],
          ]}
        />
      </section>

      <section id="reading-traffic-log">
        <h2 style={S.h2}>Traffic Log Ko Kaise Padhein?</h2>
        <CodeBlock lang="text">{"Conceptual traffic log entry (field names: platform-specific, illustrative only):\n\nTimestamp:    2024-03-15 14:23:45\nSource:       10.10.10.25:54321\nDestination:  10.20.20.50:443\nRule matched: Allow-Internal-HTTPS\nAction:       ALLOW\nNAT applied:  src → 198.51.100.50:60001\nBytes TX/RX:  1,240 / 48,320\n\nInterpretation:\n  Action=ALLOW: firewall recorded a permit decision.\n  Bytes RX=48,320: return traffic observed — positive evidence of server response.\n  Session end reason: exact labels and interpretation are platform-specific."}</CodeBlock>
      </section>

      <section id="allow-vs-deny-log">
        <h2 style={S.h2}>Allow Log vs Drop/Deny Log</h2>
        <p style={S.p}><strong>ALLOW log</strong> — the firewall recorded a permit decision. It does NOT prove: server received the request, server responded, application processed successfully, TLS handshake completed, or return traffic reached client.</p>
        <p style={S.p}><strong>DENY/DROP log</strong> — firewall did not forward per policy. A deny may be correct enforcement or a misconfiguration — context determines which.</p>
        <Callout type="danger" title="Core Operational Lesson">
          "Allowed by firewall" ≠ "application healthy." "Denied by firewall" ≠ "firewall is the root cause" — the deny may be correct enforcement.
        </Callout>
      </section>

      <section id="session-table">
        <h2 style={S.h2}>Session Table: Most Important Troubleshooting Evidence</h2>
        <CodeBlock lang="text">{"Session for 10.10.10.25:54321 → 10.20.20.50:443 TCP:\n\n  State:     ESTABLISHED (conceptual)\n  Rule:      Allow-Internal-HTTPS\n  NAT:       src → 198.51.100.50:60001\n  TX (→ server):   4,320 bytes  ← incrementing\n  RX (← server):      0 bytes  ← not incrementing\n  Timeout:   3,580s remaining\n\nAnalysis:\n  TX incrementing → outbound traffic progressing. Counter semantics: verify per platform.\n  No return traffic → investigate downstream/server/return path.\n  Use packet capture when actual forwarding beyond firewall must be proven."}</CodeBlock>
      </section>

      <section id="packet-capture">
        <h2 style={S.h2}>Packet Capture on a Firewall</h2>
        <CodeBlock lang="text">{"Capture point comparison:\n\nIngress → Firewall → Egress\nReturn-Ingress → Firewall → Return-Egress\n\nInterpretation:\n  P-ingress seen, P-egress NOT seen:\n    → Investigate FW processing — policy, routing, NAT, inspection,\n      or capture-point/filter limitations.\n      (absence ≠ proven internal drop — verify capture architecture and filters)\n\n  Return NOT at return-ingress:\n    → Failure beyond firewall egress — server/downstream/return-path issue.\n\n  Return at return-ingress but NOT return-egress:\n    → Firewall return-flow processing issue — stateful mismatch/policy."}</CodeBlock>
      </section>

      <section id="four-point-method">
        <h2 style={S.h2}>The Four-Point Packet Method</h2>
        <Figure caption="Four-Point Packet Method — conceptual troubleshooting model for isolating failure domain"><FourPointPacketMethod /></Figure>
      </section>

      <section id="policy-troubleshooting">
        <h2 style={S.h2}>Troubleshooting Policy Problems</h2>
        <ComparisonTable
          headers={["Check","What to verify"]}
          rows={[
            ["Source address","Traffic source matches rule's source specification?"],
            ["Destination address","Verify which address representation the platform uses for policy matching — original or post-translation. Confirm against platform documentation."],
            ["Service/port/protocol","Does service match exactly? TCP/443 ≠ UDP/443"],
            ["Ingress zone/interface","Traffic entering from expected zone? Wrong ingress = wrong rules evaluated"],
            ["Rule order","In first-match model, preceding rule matching same traffic can prevent later rule from being selected"],
            ["Matched rule","Which rule actually matched? Check log for rule name — may be different from expected"],
          ]}
        />
      </section>

      <section id="routing-troubleshooting">
        <h2 style={S.h2}>Troubleshooting Routing Problems</h2>
        <ComparisonTable
          headers={["Check","Why it matters"]}
          rows={[
            ["Route exists for destination","Without route, firewall cannot forward the packet"],
            ["Correct next-hop","Route present but pointing to wrong gateway"],
            ["Default route present/correct","Is last-resort route valid? Correct next-hop?"],
            ["Return route","Does server-side have route back toward client via firewall? Common failure point."],
          ]}
        />
      </section>

      <section id="nat-troubleshooting">
        <h2 style={S.h2}>Troubleshooting NAT Problems</h2>
        <ComparisonTable
          headers={["Check","What to look for"]}
          rows={[
            ["Expected NAT rule matched","Check NAT policy hit counters — intended NAT rule matching?"],
            ["Translation actually created","Entry in NAT/translation table for this flow?"],
            ["Overlapping NAT rules","More-specific or earlier NAT rule intercepting before intended rule?"],
            ["VPN traffic accidentally NATed","Verify whether VPN design requires traffic to remain untranslated"],
            ["DNAT route/policy","After DNAT translates destination, route and policy for translated address?"],
          ]}
        />
      </section>

      <section id="vpn-troubleshooting-ref">
        <h2 style={S.h2}>Troubleshooting VPN Problems</h2>
        <p style={S.p}>VPN diagnostic ladder:</p>
        <CodeBlock lang="text">{"Peer IP reachability\n↓ IKE_SA_INIT / cryptographic proposal compatibility\n  (IKE normally UDP 500; NAT-T → UDP 4500)\n↓ Peer authentication / IKE_AUTH\n↓ IKE SA authentication completed\n↓ CHILD SA / IPsec SA established\n↓ Traffic selectors matching\n↓ Routing toward protected network\n↓ Security policy / NAT exemption\n↓ Encap/decap counters incrementing\n↓ Application reachable\n\nTunnel UP ≠ application reachable. Work through every layer."}</CodeBlock>
      </section>

      <section id="ha-troubleshooting-ref">
        <h2 style={S.h2}>Troubleshooting HA Problems</h2>
        <ul style={S.ul}>
          <li>Current HA roles on both peers — expected active/standby configuration?</li>
          <li>Both peers reachable via management/OOB?</li>
          <li>HA/control links healthy?</li>
          <li>Configuration synchronized — last sync time/status?</li>
          <li>Did the new active node assume expected address/forwarding ownership?</li>
          <li>Adjacent ARP/ND/MAC tables updated?</li>
          <li>Routing converged on current active?</li>
          <li>Any split-brain/dual-active evidence?</li>
        </ul>
      </section>

      <section id="health-metrics">
        <h2 style={S.h2}>Firewall Health and Performance Metrics</h2>
        <ComparisonTable
          headers={["Metric group","What to monitor"]}
          rows={[
            ["CPU","Overall utilization; per-core where supported; spikes vs sustained"],
            ["Memory","Used vs available; session table memory; inspection engine memory"],
            ["Concurrent sessions","Used vs platform maximum; growth trend"],
            ["New session rate","Connections-per-second; spikes during attacks or flash traffic"],
            ["Throughput","Mbps/Gbps through firewall; compare to rated capacity"],
            ["HA status","Peer health; sync status; role"],
            ["VPN tunnel count/state","Active tunnels; renegotiating; failed"],
          ]}
        />
        <Callout type="warning" title="Baseline First — Then Alert">
          Do not apply invented alert thresholds. Alert on deviation from established baseline. Baselines must be evaluated against vendor capacity guidance, resource headroom, and operational requirements.
        </Callout>
      </section>

      <section id="session-capacity">
        <h2 style={S.h2}>Session Capacity and Connection Rate</h2>
        <ComparisonTable
          headers={["","Concurrent Sessions","New Session / Connection Rate (CPS)"]}
          rows={[
            ["Measures","Sessions simultaneously active at one moment","New sessions being created per second"],
            ["Platform limit","Maximum entries in session table","Maximum new sessions platform can create per second"],
            ["Failure mode","Table full → new sessions rejected","Burst exceeded → session creation degrades"],
          ]}
        />
        <p style={S.p}>A firewall can have substantial free session-table capacity yet still experience stress during a sudden burst of new connection attempts if session-setup/inspection capacity becomes the limiting resource.</p>
      </section>

      <section id="monitoring-siem">
        <h2 style={S.h2}>Monitoring, SNMP, Syslog and SIEM</h2>
        <p style={S.p}><strong>SNMP/Telemetry:</strong> Health and performance metrics. SNMP InformRequest (RFC 3416) notifications receive a Response-PDU — providing confirmed delivery semantics but this does not guarantee eventual delivery. SNMPv3 provides authentication and privacy.</p>
        <p style={S.p}><strong>Syslog:</strong> RFC 5424 defines syslog message format (transport-independent). RFC 5426: UDP — connectionless, messages may be lost. RFC 5425: TLS-secured syslog. RFC 6587: legacy TCP framing (Historic document). Transport reliability must be evaluated per implementation.</p>
        <p style={S.p}><strong>SIEM:</strong> Central collection, correlation, and historical analysis. For troubleshooting a specific live session, firewall-native tools often provide evidence that a centralized SIEM may not expose at the same processing granularity.</p>
      </section>

      <section id="change-management">
        <h2 style={S.h2}>Change Management and Configuration Safety</h2>
        <CodeBlock lang="text">{"Production firewall change process:\n\n1. Define requirement\n2. Capture current state — logs, sessions, policy snapshot\n3. Identify affected traffic — intended and unintended\n4. Review security impact — unintended access opened? Existing access broken?\n5. Peer review / approval\n6. Ensure known-good recoverable configuration/state available per org change procedure\n7. Define rollback — exact rollback action + who authorizes\n8. Implement in approved window\n9. Validate intended traffic works\n10. Validate unrelated critical services unaffected\n11. Monitor — watch logs, sessions, alerts\n12. Document — what changed, why, when, who, what validated\n\nSuccess = intended service works + no unintended exposure + no unintended breakage."}</CodeBlock>
      </section>

      <section id="lifecycle-mgmt">
        <h2 style={S.h2}>Backup, Upgrade and Lifecycle Management</h2>
        <p style={S.p}>Maintain recoverable configuration backups according to organizational policy. Configuration backup alone is not sufficient for complete disaster recovery — recovery may also require: correct software/OS version, private keys and certificates, license entitlements, external authentication integration, HA configuration.</p>
        <p style={S.p}><strong>Software upgrades:</strong> Read full release notes. Verify upgrade path. Follow the platform-supported HA upgrade sequence and compatibility requirements. Post-upgrade validation mandatory.</p>
        <p style={S.p}><strong>Lifecycle terms</strong> such as End of Sale, End of Support, and End of Life are vendor-specific and their abbreviations are not universally consistent. Track platform-specific vendor lifecycle dates and plan refresh before applicable dates.</p>
      </section>

      <section id="phase7-takeaways">
        <h2 style={S.h2}>Phase 7 Key Takeaways</h2>
        <ul style={S.ul}>
          <li>Device UP ≠ application UP. Service health requires the full path to work.</li>
          <li>ALLOW log = firewall recorded a permit decision. Actual forwarding and application success require additional evidence.</li>
          <li>Session table shows what is actually happening to a specific flow — often more useful than policy config alone</li>
          <li>Packet capture: compare ingress vs egress in both directions. Missing packet narrows failure domain — verify capture semantics before concluding.</li>
          <li>Four-point method: systematically identify which segment contains the failure</li>
          <li>Troubleshoot policy, routing, NAT, VPN, HA as separate diagnostic layers</li>
          <li>Baseline your environment. Alert on deviation from baseline — not invented thresholds.</li>
          <li>Every production change needs a rollback plan and post-change validation.</li>
        </ul>
      </section>

      {/* Phase 8 — Design, Sizing, Selection, Commissioning */}
      <section id="design-requirements">
        <h2 style={S.h2}>Firewall Design Requirement Se Start Hota Hai</h2>
        <p style={S.p}>Common engineering mistake: pehle firewall model select karo, phir design karo. Yeh backwards hai. <strong>Correct sequence:</strong> Requirements → Architecture → Sizing → Selection → Deployment.</p>
        <Callout type="danger" title="Architecture First — Product Later">
          A firewall selected before requirements are defined will either be undersized, oversized, or functionally wrong. The mismatch will be discovered in production.
        </Callout>
      </section>

      <section id="traffic-flows">
        <h2 style={S.h2}>Understand Traffic Flows Before Designing</h2>
        <CodeBlock lang="text">{"For each significant flow, capture:\n\nSource: zone, network, user group, application\nDestination: zone, server, service, internet\nProtocol/service: TCP, UDP, port, application\nDirection: initiator, expected return path\nVolume (estimated): bandwidth, session rate\nSecurity requirement: inspection, logging, encryption\nNAT requirement: SNAT, DNAT, no-NAT\nVPN: encrypted tunnel required?\n\nExample flows:\n  Users → Internet: TCP/443 | SNAT | URL filter + IPS\n  Internet → DMZ Reverse Proxy: TCP/443 | DNAT to 10.10.1.50\n  DMZ → App Server: TCP/8080 | No NAT | specific port only\n  App Server → Database: TCP/5432 | No NAT | specific port only\n\nIf traffic flows are unknown → security policy design becomes guesswork."}</CodeBlock>
      </section>

      <section id="fw-placement">
        <h2 style={S.h2}>Firewall Placement in Enterprise/Data Center</h2>
        <ComparisonTable
          headers={["Placement","What it protects/enforces"]}
          rows={[
            ["Internet edge","Traffic between internet (untrusted) and internal/DMZ networks"],
            ["DC perimeter","Traffic entering/leaving the DC environment"],
            ["DMZ boundary","Traffic between DMZ and internal server/application tiers"],
            ["Internal segmentation","East-west traffic between internal zones"],
            ["Management boundary","Access to management plane of network devices and servers"],
          ]}
        />
        <Callout type="danger" title="Bypass = No Enforcement">
          A firewall can only enforce traffic that actually traverses it. Routing design and firewall placement must be designed together — they are mutually dependent.
        </Callout>
      </section>

      <section id="ns-ew">
        <h2 style={S.h2}>North-South vs East-West Firewalling (Design)</h2>
        <p style={S.p}><strong>North-South:</strong> Traffic crossing the perimeter. Traditional perimeter firewalls are designed for this.</p>
        <p style={S.p}><strong>East-West:</strong> Lateral traffic between workloads. A breach via phishing or credential theft leaves an attacker with east-west access to every system on the same internal segment if no east-west controls exist. East-west enforcement options: routing through perimeter firewall, dedicated internal segmentation firewall, hypervisor/virtual firewall, cloud security groups, zero-trust network access.</p>
      </section>

      <section id="security-zones-design">
        <h2 style={S.h2}>Security Zones and Trust Boundaries</h2>
        <ComparisonTable
          headers={["Conceptual zone","Typical contents"]}
          rows={[
            ["Outside/Untrusted","Internet, public-facing, untrusted external"],
            ["DMZ","Public-facing services: reverse proxy, web, mail, DNS"],
            ["Users/Campus","End-user devices, workstations"],
            ["Servers/Application","Internal application servers"],
            ["Database","Database tier — typically most restricted"],
            ["Management","Network device management, firewall management"],
          ]}
        />
        <p style={S.p}>These are conceptual examples — not universal mandatory zone names. VLANs create network segments but don&apos;t enforce security policy. A firewall with explicit zone-pair policies enforces security segmentation. Both typically used together.</p>
      </section>

      <section id="dmz-arch">
        <h2 style={S.h2}>DMZ Architecture</h2>
        <Figure caption="DMZ traffic architecture — multi-tier with explicit blocks. DMZ is not inherently secure."><DmzTrafficArch /></Figure>
        <Callout type="danger" title="DMZ ≠ Automatically Secure">
          DMZ is an architectural principle — not an inherently secure zone. Its protection depends entirely on what traffic is permitted into and out of it, the hardening of systems within it, the quality of monitoring, and the architecture of the boundaries around it.
        </Callout>
      </section>

      <section id="mgmt-plane-design">
        <h2 style={S.h2}>Management Plane Design</h2>
        <ComparisonTable
          headers={["Area","Design consideration"]}
          rows={[
            ["Network isolation","Dedicated management interface or management VRF where supported; separate management network/VLAN"],
            ["Source restriction","Management access only from approved management networks and hosts"],
            ["Authentication","Strong authentication for admin access; MFA where supported"],
            ["Logging","All admin actions logged; log to central server, not just local storage"],
            ["Encryption","SSH v2, HTTPS — no Telnet, no HTTP management"],
          ]}
        />
      </section>

      <section id="interface-planning">
        <h2 style={S.h2}>Interface and Connectivity Planning</h2>
        <ComparisonTable
          headers={["Planning area","Key questions"]}
          rows={[
            ["Required interfaces","Upstream, DMZ, internal, management, HA — how many physical interfaces needed?"],
            ["Speed","1G, 10G, 25G, 40G, 100G? Match to connected switch capability"],
            ["Media","Copper vs fiber? SMF vs MMF? Match to cable plant"],
            ["Transceivers","SFP/SFP+/SFP28/QSFP28? Vendor-compatible optics?"],
          ]}
        />
        <p style={S.p}><strong>An interface with correct port count but wrong speed, wrong media, or incompatible transceiver is not a deployable solution.</strong></p>
      </section>

      <section id="routing-arch">
        <h2 style={S.h2}>Routing Architecture Around the Firewall</h2>
        <ComparisonTable
          headers={["Question","Why it matters"]}
          rows={[
            ["Static or dynamic routing?","Static: simple, predictable, requires manual intervention when topology changes. Dynamic: automatic convergence, but requires careful configuration."],
            ["Default route","Where does unmatched traffic go? Correct ISP or WAN path?"],
            ["Asymmetric path risk","Could both directions of a flow use different paths? Stateful firewall impact?"],
            ["HA interaction","Does routing reconverge correctly after HA failover?"],
          ]}
        />
      </section>

      <section id="nat-arch">
        <h2 style={S.h2}>NAT Architecture Planning</h2>
        <ComparisonTable
          headers={["NAT type","Design question"]}
          rows={[
            ["Outbound SNAT","Which internal zones require SNAT? How many public IPs in pool? PAT or address pool?"],
            ["Inbound DNAT","Which public services need publishing? Shared or dedicated public IPs per service?"],
            ["No-NAT/exemption","Which traffic must preserve original addressing — VPN, internal routed zones?"],
            ["VPN interaction","Does SNAT accidentally affect VPN-bound traffic? Exemptions in place?"],
          ]}
        />
      </section>

      <section id="vpn-arch">
        <h2 style={S.h2}>VPN Architecture Planning</h2>
        <ComparisonTable
          headers={["Area","Design question"]}
          rows={[
            ["Site-to-site","How many peer sites? Peer equipment compatibility? Authentication model?"],
            ["Remote access","Expected concurrent remote users? Growth? Authentication? MFA? Split or full tunnel?"],
            ["Redundancy","Dual-ISP VPN failover?"],
            ["HA behavior","Does VPN state survive HA failover? Renegotiation expected?"],
          ]}
        />
      </section>

      <section id="ha-arch-planning">
        <h2 style={S.h2}>High Availability Architecture Planning</h2>
        <ComparisonTable
          headers={["Area","Design question"]}
          rows={[
            ["Model","Active/passive or active/active? Platform support?"],
            ["Power","Separate PDUs/UPS for each firewall? Separate circuits?"],
            ["Switch paths","Independent upstream/downstream switches for each peer?"],
            ["HA links","How many HA control/sync links? Dedicated or shared? Media?"],
            ["Testing","When and how will HA be tested? Change control?"],
          ]}
        />
        <Callout type="danger" title="End-to-End HA Design Required">
          Two firewalls sharing a single failed upstream switch, power feed, or other critical shared dependency are not end-to-end highly available. Identify failure scenarios that represent unacceptable risk and ensure those specific dependencies are redundant.
        </Callout>
      </section>

      <section id="sizing">
        <h2 style={S.h2}>Firewall Sizing: Throughput Is Not Enough</h2>
        <Figure caption="Firewall sizing requires multiple dimensions. No arbitrary performance numbers — validate against vendor specs for your actual feature set."><FirewallSizingDimensions /></Figure>
        <ComparisonTable
          headers={["Dimension","Why it matters"]}
          rows={[
            ["Firewall throughput","Baseline packet forwarding — typically measured under idealized lab conditions"],
            ["Threat-inspection/NGFW throughput","Performance with IPS, app-ID, URL filtering, malware inspection enabled — typically lower than baseline"],
            ["TLS decryption throughput","Performance with TLS inspection enabled — significant additional overhead, separate metric"],
            ["VPN throughput","Encrypted VPN tunnel capacity — may be a separate limit"],
            ["Concurrent sessions","Maximum simultaneous tracked connections"],
            ["New session rate (CPS)","Session setup rate under burst or attack — can limit even when session table has headroom"],
            ["HA/failure scenario","Surviving peer must handle 100% traffic after partner failure — size for single-peer load"],
          ]}
        />
        <p style={S.p}><strong>Datasheet throughput numbers are typically measured under specific test conditions.</strong> Actual production performance depends on enabled features, traffic mix, and packet size profile.</p>
      </section>

      <section id="capacity-headroom">
        <h2 style={S.h2}>Capacity Headroom and Growth</h2>
        <p style={S.p}>Sizing exactly at today's measured peak is an engineering risk. In an active/passive HA design, the surviving peer must handle the entire production traffic load when the other peer fails. If the platform is sized for near-maximum utilization under normal dual-peer operation, single-peer failure will immediately push the surviving node beyond its rated capacity.</p>
        <Callout type="warning" title="No Universal Headroom Percentage">
          No universal capacity headroom percentage applies to all deployments. Generic rules like "always buy 2x" or "leave 30% headroom" are not substitutes for engineering analysis.
        </Callout>
      </section>

      <section id="fw-selection">
        <h2 style={S.h2}>How to Select an Enterprise Firewall</h2>
        <ComparisonTable
          headers={["Criterion","What to evaluate"]}
          rows={[
            ["Security capability","Required inspection features actually available and functionally correct"],
            ["Performance under required features","Vendor test results for specific enabled feature combination"],
            ["HA capability","Supported HA modes, state sync scope, tested failover behavior"],
            ["Interface options","Required port types, speeds, media; expansion options"],
            ["Management/visibility","Management UI/API capability, log detail, native troubleshooting tools"],
            ["Support model","Vendor TAC responsiveness, hardware replacement SLA"],
            ["Lifecycle","Hardware/software EoS/EoL dates; software long-term support versions"],
            ["TCO","Hardware, licenses, subscriptions, support, training, management overhead"],
          ]}
        />
        <Callout type="warning" title="No Vendor Ranking — No Best Firewall">
          No vendor is ranked here. No "best firewall" exists universally. The best product is the product that meets the validated architecture and operational requirements within the organization's support capability and budget.
        </Callout>
      </section>

      <section id="bom">
        <h2 style={S.h2}>Firewall Bill of Materials / Hidden Requirements</h2>
        <ComparisonTable
          headers={["Category","Items"]}
          rows={[
            ["Appliances","Firewall node(s) — correct model/specification"],
            ["Transceivers/optics","SFPs, QSFPs — correct speed, media, vendor-compatible"],
            ["Cables","Fiber patch cables, copper, console, HA cables"],
            ["Licenses","OS/software license, security subscription, feature license, VPN capacity"],
            ["Support contract","Hardware advance replacement, TAC access, software update entitlement"],
            ["Rack/power","Rack unit space, rails, power cables, independent PDU/UPS feeds where required"],
            ["Certificates","TLS management cert, VPN endpoint cert, TLS inspection CA cert"],
          ]}
        />
        <p style={S.p}><strong>A correctly selected firewall model with missing dependencies is not a deployable solution.</strong> BOM review should be completed before procurement order.</p>
      </section>

      <section id="pre-deployment-review">
        <h2 style={S.h2}>Pre-Deployment Design Review</h2>
        <p style={S.p}>Before any production installation begins, conduct a design review. Finding design errors at this stage is far less costly than discovering them during cutover.</p>
        <ComparisonTable
          headers={["Area","Check"]}
          rows={[
            ["Architecture diagram","Current, accurate, approved?"],
            ["Traffic flow matrix","All required flows documented?"],
            ["Routing","Static/dynamic routing designed? Return routes explicitly confirmed? Asymmetric routing risk identified?"],
            ["NAT","All SNAT/DNAT/no-NAT rules designed? Translations documented?"],
            ["Security zones","All zones defined? Zone-pair policies planned?"],
            ["VPN","Peer parameters documented? Authentication materials ready?"],
            ["HA design","Model? HA links planned? Power independence?"],
            ["Certificates","Management, VPN, TLS CA — all required certs available?"],
            ["Licensing","All required licenses purchased and ready for activation?"],
            ["Rollback/migration plan","Existing device? Cutover plan? Rollback procedure documented?"],
          ]}
        />
      </section>

      <section id="commissioning">
        <h2 style={S.h2}>Firewall Commissioning and Acceptance Testing</h2>
        <Callout type="important" title="Commissioning Phase Overview">
          Commissioning is ordered, phased validation. Exact sequence may vary by deployment and change plan.
        </Callout>
        <ComparisonTable
          headers={["Phase","Key validation"]}
          rows={[
            ["1. Physical installation","Hardware mounted; transceivers/cables installed; power connected to independent feeds"],
            ["2. Power and redundancy","PSU-A and PSU-B operational; power from independent circuits; fans confirmed"],
            ["3. Interface and link verification","All interfaces at expected operational state; speed negotiated correctly"],
            ["4. Management access","Management IP accessible; SSH/HTTPS login; NTP synchronized; DNS resolving; syslog forwarding confirmed"],
            ["5. HA verification","Both peers operational; HA peer relationship established; config synchronized; HA links healthy"],
            ["6. Routing verification","Expected routes present; default route confirmed; return routes confirmed"],
            ["7. Policy verification","Representative positive tests (expected-permitted flows succeed); negative tests (expected-blocked flows denied and logged)"],
            ["8. NAT verification","SNAT translations created; DNAT translations created; no-NAT exemptions verified"],
            ["9. VPN verification","IKE SA and CHILD SAs established; traffic selectors correct; protected traffic flowing"],
            ["10. Logging/monitoring","Traffic logs appearing in SIEM; HA and system events visible; SNMP/monitoring reachable"],
            ["11. HA failover test","Manual failover; peer assumes active role; traffic continues per sync scope; failback tested"],
            ["12. Application and service testing","Each required production service tested end-to-end; positive and negative tests"],
            ["13. Backup and recovery","Configuration backup completed, stored securely; backup file verified recoverable"],
          ]}
        />
        <Callout type="danger" title="Ping Is Not Application Acceptance">
          A ping confirms basic ICMP reachability. It does not validate TCP session establishment, TLS handshake, application-layer response, NAT correctness, security policy completeness, or logging. Each production service must be tested at the application level before declaring commissioning complete.
        </Callout>
      </section>

      <section id="phase8-takeaways">
        <h2 style={S.h2}>Enterprise Firewall Final Engineering Takeaways</h2>
        <ul style={S.ul}>
          <li>Start with requirements and traffic flows — not model selection. Architecture precedes product.</li>
          <li>Placement follows security/trust boundaries. A firewall only enforces traffic that traverses it.</li>
          <li>North-south (perimeter) and east-west (lateral) are different design problems requiring separate consideration.</li>
          <li>DMZ is an architectural principle — not an inherently secure zone.</li>
          <li>Management plane requires deliberate protection separate from production traffic exposure.</li>
          <li>Routing design determines whether traffic reaches the firewall at all.</li>
          <li>NAT, VPN, routing, and HA must be designed together — they interact significantly.</li>
          <li>HA architecture must extend to power, switching, and routing — not just appliance redundancy.</li>
          <li>Throughput alone cannot size a firewall. Threat-inspection throughput, VPN throughput, concurrent sessions, new session rate, traffic mix, and enabled service overhead all matter.</li>
          <li>Datasheet metrics are measured under specific test conditions — validate against your intended production feature set.</li>
          <li>Commissioning must validate actual application flows — not just connectivity. Include positive and negative tests.</li>
          <li>Documentation and rollback are engineering requirements — not optional steps.</li>
        </ul>
        <Callout type="important" title="Final Engineering Principle">
          A well-designed firewall is not simply a security appliance placed in a rack. It is an enforcement point engineered into the network architecture, traffic paths, availability model, and operational process. The firewall's effectiveness is bounded by the quality of its placement, configuration, policy, monitoring, and operational discipline — not by the brand on the chassis.
        </Callout>

        <h2 style={{ ...S.h2, marginTop: "3rem" }}>Frequently Asked Questions</h2>
        <div>
          {faqs.map((f, i) => (
            <details key={i} style={{ marginBottom: "1rem", borderBottom: "1px solid #e5e7eb", paddingBottom: "1rem" }}>
              <summary style={{ ...S.p, fontWeight: 600, cursor: "pointer", marginBottom: 0 }}>{f.q}</summary>
              <p style={{ ...S.p, marginTop: "0.75rem", paddingLeft: "1rem" }}>{f.a}</p>
            </details>
          ))}
        </div>

        <div style={{ marginTop: "3rem", padding: "1.5rem", background: "#f0f9ff", borderRadius: "8px", border: "1px solid #0ea5e9" }}>
          <h3 style={S.h3}>Aage Kya Padhein?</h3>
          <ul style={S.ul}>
            <li><TopicLink slug="load-balancer" variant="inline" /> — Load distribution aur application delivery</li>
            <li><TopicLink slug="router" variant="inline" /> — Routing fundamentals aur WAN connectivity</li>
            <li><TopicLink slug="switch" variant="inline" /> — L2 switching aur VLAN design</li>
          </ul>
        </div>
      </section>

    </article>
  );
}
