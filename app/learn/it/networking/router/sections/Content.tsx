"use client";

import { S, Callout, ComparisonTable, Figure, CodeBlock } from "../shared";
import TopicLink from "@/components/TopicLink";
import RouterVsSwitchVsL3Switch    from "../svg/RouterVsSwitchVsL3Switch";
import PacketForwardingJourney     from "../svg/PacketForwardingJourney";
import ControlDataManagementPlanes from "../svg/ControlDataManagementPlanes";
import RibFibForwarding            from "../svg/RibFibForwarding";
import LongestPrefixMatch          from "../svg/LongestPrefixMatch";
import OspfArchitecture            from "../svg/OspfArchitecture";
import BgpPeeringModel             from "../svg/BgpPeeringModel";
import VrrpArchitecture            from "../svg/VrrpArchitecture";
import EcmpHashDistribution        from "../svg/EcmpHashDistribution";
import RouterInterfaceTypes        from "../svg/RouterInterfaceTypes";
import SubinterfaceRouterOnAStick  from "../svg/SubinterfaceRouterOnAStick";
import InterVlanRoutingArchitecture from "../svg/InterVlanRoutingArchitecture";
import AclPacketEvaluation         from "../svg/AclPacketEvaluation";
import NatPatTranslationFlow       from "../svg/NatPatTranslationFlow";
import DhcpRelayFlow               from "../svg/DhcpRelayFlow";
import RedistributionLoopRisk      from "../svg/RedistributionLoopRisk";
import MplsForwardingArchitecture  from "../svg/MplsForwardingArchitecture";
import RoutingSecurityArchitecture from "../svg/RoutingSecurityArchitecture";
import DualIspArchitecture         from "../svg/DualIspArchitecture";
import DcBorderArchitecture        from "../svg/DcBorderArchitecture";
import RouterCommissioningFlow     from "../svg/RouterCommissioningFlow";
import CommonEngineeringMistakes   from "../svg/CommonEngineeringMistakes";
import NsfSsoGrInteraction         from "../svg/NsfSsoGrInteraction";
import RoutingLoopNullRoute        from "../svg/RoutingLoopNullRoute";
import { faqs }                    from "../metadata";

export default function Content() {
  return (
    <>
      {/* QUICK SUMMARY */}
      <div id="quick-summary" style={{ background:"#f0fdf4", border:"1px solid #bbf7d0", borderRadius:10, padding:"1.2rem 1.4rem", marginBottom:"2rem" }}>
        <p style={{ fontWeight:700, color:"#15803d", marginBottom:"0.6rem", fontSize:"1rem" }}>Router in 2 Minutes</p>
        <ul style={{ ...S.ul, marginBottom:0 }}>
          <li><strong>Router kya karta hai:</strong> IP packets ko different networks ke beech forward karta hai. Destination IP &rarr; FIB (LPM) &rarr; next-hop &rarr; L2 rewrite &rarr; transmit. Har hop pe L2 header badal ta hai; IP packet end-to-end unchanged (sirf TTL/Hop Limit decrement).</li>
          <li><strong>RIB vs FIB:</strong> RIB = control plane routing database (all sources, full detail). FIB = data plane forwarding table (selected routes, optimized, platform-dependent). Packets FIB use karte hain.</li>
          <li><strong>Routing protocols:</strong> OSPF (link-state IGP, RFC 2328/5340) &middot; BGP (path-vector EGP, RFC 4271) &middot; IS-IS (link-state IGP). Dynamic routing = automatic convergence on topology change.</li>
          <li><strong>BGP:</strong> Internet routing protocol. iBGP vs eBGP. Best-path = policy-driven, implementation-variant. NEXT_HOP reachability prerequisite. Route Reflectors eliminate iBGP full-mesh.</li>
          <li><strong>OSPF:</strong> LSDB &rarr; SPF &rarr; routes &rarr; RIB &rarr; FIB. LSDB &ne; routing table. DR/BDR on multi-access segments. Hello/Dead timers must match. Router ID explicitly configure karo.</li>
          <li><strong>VRF:</strong> Layer 3 routing isolation &mdash; separate RIB/FIB per VRF. VRF &ne; VLAN.</li>
          <li><strong>MPLS:</strong> Label-based forwarding architecture &mdash; supports L2 and L3 services. Not simply Layer 2. MPLS &ne; encryption.</li>
          <li><strong>HA:</strong> VRRP (IETF standard) for gateway redundancy. NSF = local data-plane continuity. GR = protocol-level neighbor cooperation. SSO = supervisor state synchronization. All platform/NOS/version dependent.</li>
          <li><strong>RPKI ROV:</strong> Origin AS validation only. Valid/Invalid/NotFound &mdash; operator defines routing policy per state.</li>
          <li><strong>Production rule:</strong> Save configuration after every change. NTP Day-1. OOB management always maintained. Troubleshoot systematically: Physical &rarr; L2 &rarr; L3 &rarr; Routing &rarr; FIB &rarr; Policy &rarr; NAT &rarr; MTU.</li>
        </ul>
      </div>

      {/* SECTION 2 - ROUTER KYA HAI */}
      <h2 id="router-kya-hai" style={S.h2}>Enterprise Router Kya Hai</h2>
      <p style={S.p}><strong>Router ek Layer 3 networking device hai jo IP packets ko different IP networks ke beech forward karta hai.</strong> Switch same L2 segment ke devices connect karta hai &mdash; router alag networks ko.</p>
      <p style={S.p}>Simple analogy: Post office. Parcel aata hai &mdash; destination address check hota hai, right van mein daal dete hain. Destination tak multiple hops lagte hain. Har hop pe sirf destination IP check hota hai.</p>
      <p style={S.p}><strong>Router solves:</strong> Alag IP networks connect karna, broadcast isolation, multiple paths mein se best path select karna, different technologies interconnect karna, security boundary (ACLs, NAT, VRF).</p>
      <ComparisonTable title="Enterprise Router Use Cases"
        headers={["Location","Role"]}
        rows={[
          ["Branch office","WAN connectivity, local LAN gateway, VPN"],
          ["Enterprise WAN edge","ISP connectivity, BGP, dual-ISP failover"],
          ["Data center border","North-South traffic, internet/WAN handoff"],
          ["Campus core","Inter-VLAN routing, distribution"],
          ["SP/cloud handoff","BGP peering, MPLS label edge"],
        ]} caption="" />

      {/* SECTION 3 - ROUTER VS SWITCH */}
      <h2 id="router-vs-switch" style={S.h2}>Router vs Switch vs Layer 3 Switch</h2>
      <Figure caption="Fig D1 &mdash; Router vs L2 Switch vs L3 Switch: forwarding basis, capability comparison.">
        <RouterVsSwitchVsL3Switch />
      </Figure>
      <p style={S.p}>L3 switch aur router dono IP route karte hain &mdash; distinction purpose-built capability hai. L3 Switch preferred: high-density Ethernet, wire-speed inter-VLAN, DC fabric. Router preferred: WAN interface variety, complex BGP policy, VPN/MPLS primary function.</p>
      <Callout type="important" title="Platform Dependency">
        Capabilities shown are typical positioning &mdash; not universal rules. Every specific platform must be evaluated against datasheet, NOS version, and licensing.
      </Callout>

      {/* SECTION 4 - OSI LAYER 3 */}
      <h2 id="osi-packet-forwarding" style={S.h2}>OSI Layer 3 aur Packet Forwarding</h2>
      <p style={S.p}><strong>Frame (L2):</strong> Ek link pe ek hop ka container. Source MAC &rarr; Destination MAC. Sirf ek link pe valid &mdash; next router pe strip ho jaata hai.</p>
      <p style={S.p}><strong>Packet (L3):</strong> End-to-end container. Source IP &rarr; Destination IP. Poore path mein same rehta hai (barring NAT). Router L2 header strip karta hai, IP forwarding decision leta hai, new L2 header likhta hai.</p>
      <CodeBlock lang="text">{`Host-A -> Router-1 -> Router-2 -> Host-B

Hop 1: Frame: Src=HostA_MAC, Dst=Router1_MAC | Packet: Src=HostA_IP, Dst=HostB_IP TTL=64
Hop 2: Frame: Src=Router1_MAC, Dst=Router2_MAC (NEW) | Packet: same, TTL=63
Hop 3: Frame: Src=Router2_MAC, Dst=HostB_MAC (NEW) | Packet: same, TTL=62`}</CodeBlock>
      <p style={S.p}><strong>IPv4:</strong> Router header checksum recalculate karta hai after TTL decrement. <strong>IPv6:</strong> Base header mein checksum field nahi &mdash; sirf Hop Limit decrement, no checksum needed.</p>

      {/* SECTION 5 - PACKET JOURNEY */}
      <h2 id="packet-journey" style={S.h2}>Packet Journey Through a Router</h2>
      <Figure caption="Fig D2 &mdash; Complete packet forwarding journey: ingress to egress.">
        <PacketForwardingJourney />
      </Figure>
      <p style={S.p}><strong>Step 1 Physical:</strong> Signal arrives, PHY converts to bits, FCS validated.</p>
      <p style={S.p}><strong>Step 2 L2:</strong> Dst MAC = this router&apos;s interface MAC &rarr; L2 header stripped &rarr; IP payload extracted. (Specific hardware behavior is implementation dependent.)</p>
      <p style={S.p}><strong>Step 3 Destination check:</strong> Dst IP = router&apos;s own IP? &rarr; control plane/CPU (SSH, OSPF, BGP). Else &rarr; data plane forwarding. Transit packets should never reach CPU normally.</p>
      <p style={S.p}><strong>Step 4 FIB/LPM:</strong> Destination IP &rarr; FIB lookup &rarr; longest prefix match &rarr; next-hop + egress interface determined.</p>
      <p style={S.p}><strong>Step 5 TTL:</strong> IPv4: decrement &rarr; recalculate header checksum. IPv6: Hop Limit decrement only (no checksum). TTL/Hop Limit = 0 &rarr; drop &rarr; ICMP Time Exceeded to source.</p>
      <p style={S.p}><strong>Step 6 ARP/NDP:</strong> Next-hop MAC needed. ARP table check (IPv4) / Neighbor Cache (IPv6). Not found &rarr; ARP request / NS sent &rarr; packet queued.</p>
      <p style={S.p}><strong>Step 7 New L2 header:</strong> Src MAC = this router&apos;s egress interface MAC. Dst MAC = next-hop MAC. IP Src/Dst: UNCHANGED end-to-end.</p>
      <p style={S.p}><strong>Step 8 Outbound policy:</strong> ACL, QoS, NAT, MPLS label ops (if configured). Exact pipeline order: platform and configuration dependent &mdash; no universal sequence.</p>
      <Callout type="important" title="Data Plane vs Control Plane">
        Transit packets (data plane) &rarr; FIB/ASIC forwarding. Packets TO router (OSPF, SSH, BGP, ARP) &rarr; control/management plane CPU. CoPP / equivalent rate-limits CPU-bound traffic per type &mdash; protects routing protocols from flooding attacks.
      </Callout>

      {/* SECTION 6 - THREE PLANES */}
      <h2 id="three-planes" style={S.h2}>Control Plane, Data Plane aur Management Plane</h2>
      <Figure caption="Fig D3 &mdash; Three-plane functional model: not separate physical packet paths.">
        <ControlDataManagementPlanes />
      </Figure>
      <p style={S.p}><strong>Control Plane:</strong> Routing intelligence &mdash; OSPF, BGP, IS-IS, ARP/NDP adjacency handling. RIB maintain karta hai. Selected routes FIB mein program karta hai. Typically CPU pe. Relatively slow but routing decisions infrequently change.</p>
      <p style={S.p}><strong>Data Plane (Forwarding Plane):</strong> Actual packet forwarding &mdash; FIB lookup, LPM, TTL decrement, L2 rewrite, QoS, ACL, NAT. Hardware platforms pe NPU/ASIC &mdash; line-rate, CPU-independent. Software/virtual routers: CPU threads.</p>
      <p style={S.p}><strong>Management Plane:</strong> SSH, NETCONF, SNMP, syslog, NTP, AAA. CPU-bound &mdash; arrives on physical interfaces, processed by CPU. &ldquo;Management plane&rdquo; is a functional description &mdash; not a guaranteed separate physical packet path.</p>
      <p style={S.p}><strong>FIB implementation note:</strong> &ldquo;CEF&rdquo; (Cisco Express Forwarding) is one specific Cisco implementation &mdash; not a universal standard. Other vendors use different mechanisms.</p>

      {/* SECTION 7 - RIB AND FIB */}
      <h2 id="rib-fib" style={S.h2}>Routing Table &mdash; RIB aur FIB</h2>
      <Figure caption="Fig D4 &mdash; Protocol-specific state &rarr; RIB &rarr; FIB forwarding model (vendor-neutral).">
        <RibFibForwarding />
      </Figure>
      <p style={S.p}><strong>RIB (Routing Information Base):</strong> System-level routing table. Important: many routing protocols maintain their own protocol-specific databases.</p>
      <ul style={S.ul}>
        <li><strong>BGP:</strong> Adj-RIBs-In (received), Loc-RIB (best-path selected), Adj-RIBs-Out (to advertise) &mdash; conceptual information bases per BGP specification. Actual implementations may represent this routing state differently. BGP&apos;s internal best-path selection occurs before routes are offered to system RIB.</li>
        <li><strong>OSPF:</strong> LSDB (all LSAs) &rarr; SPF &rarr; computed routes offered to system RIB. LSDB &ne; routing table.</li>
        <li><strong>IS-IS:</strong> Similarly maintains topology database, computes routes for RIB.</li>
      </ul>
      <p style={S.p}><strong>Connected + Local routes:</strong> Interface pe IP configured + interface up &rarr; connected route automatically (e.g., 192.168.1.0/24 via Gi0/0) + local /32 route for interface&apos;s own IP. No routing protocol needed.</p>
      <p style={S.p}><strong>AD / Route Preference:</strong> Route-source preference mechanism &mdash; lower AD = more trusted source. Used when competing routes from different sources exist for same prefix. Values are vendor/platform specific &mdash; not a universal standard. AD &ne; routing metric.</p>
      <p style={S.p}><strong>FIB:</strong> Forwarding-optimized representation derived from selected RIB routes. May contain ECMP next-hops per prefix. Implementation: hardware TCAM, software table, or hybrid &mdash; platform dependent.</p>
      <p style={S.p}><strong>Recursive next-hop:</strong> BGP NEXT_HOP must be resolvable via IGP. If resolution fails &mdash; route may be ineligible for FIB. Traffic may use another matching route or default, or be dropped if no usable match. Common production problem: route in BGP table but not in routing table.</p>

      {/* SECTION 8 - LPM */}
      <h2 id="lpm" style={S.h2}>Longest Prefix Match</h2>
      <Figure caption="Fig D5 &mdash; Longest Prefix Match: overlapping FIB entries, three packet examples.">
        <LongestPrefixMatch />
      </Figure>
      <p style={S.p}><strong>LPM = forwarding-time FIB lookup.</strong> Most specific matching prefix wins. This is separate from route selection (RIB best-path process). /32 beats /24 beats /0. No match + no default &rarr; ICMP Destination Unreachable to source.</p>
      <p style={S.p}><strong>Engineering use:</strong> Inject more-specific route (/32 host route) to override general route for traffic engineering. Default route (0.0.0.0/0) = last resort, matches everything. Modern routers: hardware FIB (TCAM) enables nanosecond parallel matching.</p>

      {/* SECTION 9 - NEXT HOP */}
      <h2 id="next-hop-default" style={S.h2}>Next Hop, Default Route aur Default Gateway</h2>
      <p style={S.p}><strong>Next hop</strong> = IP address of next router where packet should go. Router decides next step &mdash; doesn&apos;t deliver directly to destination.</p>
      <p style={S.p}><strong>Default Route:</strong> 0.0.0.0/0 (IPv4) / ::/0 (IPv6). Used when no specific route matches. &ldquo;Gateway of last resort&rdquo; = router holding default route.</p>
      <p style={S.p}><strong>Default Gateway (host perspective):</strong> Router IP where host sends non-local traffic. Modern hosts maintain routing tables with connected routes, host routes, VPN routes, defaults &mdash; not just a single entry.</p>

      {/* SECTION 10 - ARP AND NDP */}
      <h2 id="arp-ndp" style={S.h2}>ARP, ICMPv6 aur IPv6 Neighbor Discovery</h2>
      <p style={S.p}>IP routing tells where to forward (next-hop IP). Ethernet needs MAC address. <strong>IPv4: ARP. IPv6: NDP &mdash; not ARP. IPv6 mein ARP exist nahi karta.</strong></p>
      <h3 style={S.h3}>ARP &mdash; IPv4</h3>
      <p style={S.p}>RFC 826. L2 broadcast: &ldquo;10.0.1.2 kaun hai? Apna MAC batao.&rdquo; Router ARP table (cache) maintains IP&rarr;MAC mappings. Gratuitous ARP: IP conflict detection, FHRP failover announcement.</p>
      <h3 style={S.h3}>IPv6 NDP</h3>
      <p style={S.p}><strong>NDP (RFC 4861):</strong> Neighbor resolution (NS/NA), router discovery (RS/RA), SLAAC, DAD, redirect. Uses ICMPv6 &mdash; cannot block wholesale.</p>
      <p style={S.p}><strong>Link-local addresses (FE80::/10):</strong> Auto-generated on every IPv6 interface. Required for NDP. Non-routable beyond link.</p>
      <p style={S.p}><strong>NS (Neighbor Solicitation):</strong> ARP Request equivalent. Uses solicited-node multicast &mdash; NOT broadcast (more efficient than IPv4 ARP). Source address: for address-resolution NS = appropriate assigned address per RFC 6724 source-address selection rules. For DAD (Duplicate Address Detection) = unspecified address (::).</p>
      <p style={S.p}><strong>RS/RA:</strong> Host sends RS (Router Solicitation) to FF02::2. Router responds with RA (Router Advertisement) &mdash; link prefix, default router, MTU, M/O flags. Router uses link-local source for RAs. RDNSS/DNSSL options (RFC 8106) can deliver DNS info without DHCPv6.</p>
      <p style={S.p}><strong>SLAAC:</strong> Host generates address from RA prefix. IID: modern OS typically stable/private (RFC 7217, RFC 8981) &mdash; NOT EUI-64 by default. EUI-64 is historical (embeds MAC &mdash; privacy concern). RA M/O flags suggest DHCPv6 behavior &mdash; host implementation dependent.</p>
      <p style={S.p}><strong>DHCPv6 relay:</strong> Clients use FF02::1:2 multicast. Relay agent sets <em>link-address field</em> in Relay-forward message header (not an option &mdash; it is a header field) to identify client&apos;s link. Configure separately from DHCPv4 relay.</p>

      {/* SECTION 11 - TTL AND ICMP */}
      <h2 id="ttl-icmp" style={S.h2}>TTL, Hop Limit aur ICMP</h2>
      <p style={S.p}><strong>TTL (IPv4):</strong> 8-bit, decremented each hop. 0 &rarr; drop + ICMP Time Exceeded. Prevents routing loops. Common defaults: Linux=64, Windows=128, Cisco IOS=255 (platform-specific).</p>
      <p style={S.p}><strong>Hop Limit (IPv6):</strong> Functional equivalent of TTL. Same behavior, accurate name. No IPv6 header checksum to recalculate after decrement.</p>
      <p style={S.p}><strong>ICMP not just errors:</strong> Echo (ping), Time Exceeded (traceroute), Destination Unreachable, Fragmentation Needed (PMTUD). ICMP error generation not guaranteed for every dropped packet &mdash; protocol exceptions, rate limiting, ACL filtering, implementation factors apply.</p>
      <p style={S.p}><strong>Traceroute:</strong> Send TTL=1 &rarr; first router drops &rarr; Time Exceeded &rarr; first hop revealed. Increment &rarr; reveals each hop. Asterisk (*) &ne; hop down &mdash; ICMP may be suppressed. Validate with end-to-end ping.</p>
      <p style={S.p}><strong>Ethernet MTU = 1500-byte Ethernet payload</strong> (carries IP packet up to 1500 bytes including IP header). Untagged frame = 1518 bytes (14B header + 1500B payload + 4B FCS). 802.1Q tagged = 1522 bytes. 1500-byte MTU does NOT mean 1500 bytes of application payload.</p>
      <p style={S.p}><strong>PMTUD vs PLPMTUD vs TCP MSS:</strong> Traditional PMTUD (RFC 1191/8201) relies on ICMP Fragmentation Needed / ICMPv6 Packet Too Big. IPv6 routers do NOT fragment forwarded packets &mdash; source responsible. IPv6 nodes not required to implement traditional PMTUD per RFC 8201. PLPMTUD (RFC 8899) = transport/packetization-layer probing without ICMP. TCP MSS = TCP option for segment sizing &mdash; NOT itself PLPMTUD. These are distinct mechanisms.</p>
      <Callout type="important" title="PMTUD Black Hole">
        If ICMP Fragmentation Needed / ICMPv6 Packet Too Big filtered &rarr; source never learns smaller MTU &rarr; large packets silently dropped. Symptom: small packets work, large transfers fail. Fix: permit these ICMP types end-to-end + MSS clamping for TCP.
      </Callout>

      {/* SECTION 12 - HARDWARE */}
      <h2 id="hardware-architecture" style={S.h2}>Router Hardware Architecture</h2>
      <ComparisonTable title="Key Hardware Components" headers={["Component","Function"]}
        rows={[
          ["CPU / Route Processor","Control plane: routing protocols, management, software processing"],
          ["RAM","RIB storage, BGP table, OSPF LSDB, running config, buffers"],
          ["Flash/Storage","NOS image, startup config, logs"],
          ["NPU / Forwarding ASIC","Data plane: line-rate packet forwarding, FIB lookups"],
          ["Switching Fabric","High-speed interconnect between line cards on modular platforms"],
          ["Management Port","Dedicated OOB management interface"],
          ["PSU","Redundant power supplies: dual PSU, separate feeds mandatory"],
        ]} caption="Architecture varies significantly across platforms." />
      <p style={S.p}><strong>Fixed platforms:</strong> All ports built-in. Lower cost, simpler. Branch/small enterprise. Limited upgrade path.</p>
      <p style={S.p}><strong>Modular platforms:</strong> Chassis with slots. Line cards swappable. High-end enterprise/SP. Dual supervisors for HA. Investment protection.</p>

      {/* SECTION 13 - INTERFACE TYPES */}
      <h2 id="interface-types" style={S.h2}>Interface Types aur Port Families</h2>
      <Figure caption="Fig D10 &mdash; Router interface types taxonomy with admin/operational state model.">
        <RouterInterfaceTypes />
      </Figure>
      <p style={S.p}>Physical: Ethernet (routed), management port, serial (legacy WAN). Logical: subinterface, loopback, tunnel, SVI, null. Types/naming/state behavior: platform and NOS dependent.</p>
      <p style={S.p}><strong>Admin vs Operational state:</strong> Admin state = operator configured (shutdown/no shutdown). Operational = hardware/protocol reports. Admin Up + Operational Down &rarr; physical or L2 problem. Admin Down &rarr; operator disabled &mdash; not a fault. Check both states before deeper troubleshooting.</p>

      {/* SECTION 14 - TRANSCEIVERS */}
      <h2 id="transceivers-fiber" style={S.h2}>Transceivers, Fiber aur Cabling</h2>
      <ComparisonTable title="Common Transceiver Families" headers={["Form Factor","Speeds","Use"]}
        rows={[
          ["SFP","1G","Legacy WAN, 1G Ethernet"],
          ["SFP+","10G","Enterprise WAN, DC uplinks"],
          ["SFP28","25G","Server-to-ToR, DC links"],
          ["QSFP28","100G (4x25G)","High-capacity router interfaces"],
          ["DAC/AOC","1G-400G","Short-range within rack/row"],
        ]} caption="Verify transceiver compatibility with router platform before installation." />
      <p style={S.p}><strong>DOM/DDM:</strong> Real-time TX/RX power, temperature, voltage, bias current. Trending degradation = pre-failure indicator. Check after insertion and monitor regularly.</p>

      {/* SECTION 15 - CONSOLE OOB */}
      <h2 id="console-oob" style={S.h2}>Console Port aur OOB Management</h2>
      <p style={S.p}><strong>Console port:</strong> Emergency access when network down. Terminal emulator, settings commonly 9600 or 115200 baud, 8N1 &mdash; verify platform documentation. Console server preferred for remote DC access.</p>
      <p style={S.p}><strong>OOB (Out-of-Band):</strong> Separate management network &mdash; SSH, SNMP, syslog. Must remain accessible when production network fails. Management VRF behavior: vendor/platform dependent.</p>

      {/* SECTION 16 - PSU FAN */}
      <h2 id="psu-fan-redundancy" style={S.h2}>PSU, Fan aur Redundancy</h2>
      <p style={S.p}><strong>Dual PSU mandatory:</strong> PSU-1 &rarr; PDU-A (Circuit 1, UPS-A). PSU-2 &rarr; PDU-B (Circuit 2, UPS-B). Separate physical circuits, separate UPS. Single PSU = single point of failure.</p>
      <p style={S.p}><strong>Fan direction:</strong> Must match rack hot/cold-aisle design. Mixed directions = hot spots = hardware failure.</p>

      {/* SECTION 17 - BOOT */}
      <h2 id="boot-process" style={S.h2}>Router Boot Process</h2>
      <CodeBlock lang="text">{`POST -> Hardware validation (CPU, RAM, storage, interfaces)
Boot Loader / ROMMON -> Load NOS from boot variable
NOS Loads -> Kernel, drivers, routing software
Startup Config Applied -> Interfaces, routing protocols, ACLs, policies
Interfaces Initialize -> Physical link detection, protocol negotiation
Routing Protocols Start -> OSPF neighbors, BGP sessions, RIB populates
Router READY`}</CodeBlock>
      <Callout type="important" title="Boot Variable Critical">
        Before any reload: verify boot variable points to correct, existing image. Keep old image on flash until new version confirmed stable.
      </Callout>

      {/* SECTION 18 - ROUTER TYPES */}
      <h2 id="router-types" style={S.h2}>Router Types aur Use Cases</h2>
      <ComparisonTable title="Router Deployment Categories" headers={["Type","Role","Key Requirements"]}
        rows={[
          ["Branch Router","WAN connectivity, local gateway, VPN","Small footprint, WAN interfaces, IPsec"],
          ["Enterprise WAN Edge","ISP connectivity, BGP, dual-ISP","BGP full table support, large FIB"],
          ["DC Border Router","North-South gateway, ISP peering","High throughput, BGP, policy, NAT"],
          ["Campus Core","Inter-VLAN, distribution","High port density, OSPF/BGP, HA"],
          ["SP/MPLS PE","Customer VPN edge","VRF, MP-BGP, MPLS, high scale"],
        ]} caption="Platform capabilities must be verified." />

      {/* SECTION 19 - SELECTION */}
      <h2 id="selection-guide" style={S.h2}>Router Selection Guide</h2>
      <p style={S.p}>Decision criteria: (1) Throughput (Gbps, ASIC-determined), (2) Route scale (FIB/TCAM capacity &mdash; internet full table requires large TCAM), (3) Protocol support (verify per NOS version), (4) Interface types (WAN, fiber, copper), (5) HA features (dual supervisor, NSF/SSO &mdash; platform/version dependent), (6) Licensing (feature licenses verify), (7) Support (TAC, hardware SLA).</p>

      {/* SECTION 20 - PROCUREMENT */}
      <h2 id="procurement-checklist" style={S.h2}>Procurement Checklist</h2>
      <ul style={S.ul}>
        <li>Throughput matches projection + 3-year growth headroom</li>
        <li>FIB capacity sufficient for route scale (internet full table if needed)</li>
        <li>Required interfaces available (WAN type, fiber, port count)</li>
        <li>Required features on target NOS version (BGP, MPLS, VPN, QoS, security)</li>
        <li>Dual PSU model confirmed</li>
        <li>Transceivers: vendor compatibility + fiber type match</li>
        <li>Support contract: hardware advance replacement, software TAC</li>
        <li>End-of-Sale/End-of-Support dates checked</li>
        <li>All required feature licenses included in quote</li>
        <li>Spare parts (critical platforms): spare PSU, transceivers</li>
      </ul>

      {/* SECTIONS 21-32 - INSTALLATION AND IP */}
      <h2 id="rack-installation" style={S.h2}>Rack Installation aur Physical Commissioning</h2>
      <p style={S.p}>Sequence: (1) Rails install, router mount (weight capacity verify). (2) Airflow direction &mdash; rack hot/cold aisle match. (3) PSU-1&rarr;PDU-A, PSU-2&rarr;PDU-B separate circuits. (4) Chassis grounding. (5) Console cable connect. (6) Production cables NOT yet &mdash; base config pehle.</p>

      <h2 id="console-access" style={S.h2}>Console Access aur Initial Login</h2>
      <p style={S.p}>Power on &rarr; POST output observe karo. Factory default state expected on new hardware. Terminal settings: 9600 or 115200 baud, 8N1 commonly (verify platform). No default credentials leave karna &mdash; change immediately.</p>

      <h2 id="initial-config" style={S.h2}>Initial Configuration Workflow</h2>
      <ol style={{ ...S.ul, listStyleType:"decimal" }}>
        <li><strong>Hostname + domain</strong></li>
        <li><strong>Enable secret / privileged access</strong> &mdash; strong credential, no vendor defaults</li>
        <li><strong>SSH v2</strong> &mdash; keys generated (2048-bit RSA minimum or platform equivalent), Telnet disabled, VTY: SSH only + source ACL</li>
        <li><strong>AAA</strong> &mdash; TACACS+/RADIUS + local fallback on console</li>
        <li><strong>NTP</strong> &mdash; minimum two servers, synchronized</li>
        <li><strong>Syslog</strong> &mdash; two remote servers, Warning or Informational (NOT Debug in production)</li>
        <li><strong>SNMPv3</strong> &mdash; authPriv with strong supported algorithms, no v1/v2c</li>
        <li><strong>Login banner</strong> &mdash; legal warning, no version/model info</li>
        <li><strong>Service hardening</strong> &mdash; disable HTTP, CDP/LLDP on external interfaces</li>
      </ol>

      <h2 id="management-ip" style={S.h2}>Management IP aur OOB Setup</h2>
      <p style={S.p}>Management interface ko production routing se isolate karo via management VRF (platform dependent) or separate OOB network. Management default route configure karo. SSH reachability from jump host verify karo before production interfaces connected.</p>

      <h2 id="ipv4-cidr" style={S.h2}>IPv4 Addressing aur CIDR</h2>
      <p style={S.p}>CIDR variable-length prefix notation: 192.168.1.0/24 = 24 network bits, 8 host bits, 256 addresses (254 usable). RFC 1918 private: 10.0.0.0/8, 172.16.0.0/12, 192.168.0.0/16 &mdash; not routed on public internet.</p>
      <CodeBlock lang="text">{`192.168.1.0/24: Network=192.168.1.0, Broadcast=192.168.1.255
First usable: 192.168.1.1, Last: 192.168.1.254, Usable: 254`}</CodeBlock>

      <h2 id="subnetting" style={S.h2}>Subnetting &mdash; Practical Router Perspective</h2>
      <p style={S.p}><strong>VLSM:</strong> Different subnets different sizes. P2P links: /30 (2 usable) or /31 (RFC 3021, platform support verify). Loopbacks: /32. Summarization: 10.1.0.0/24 + 10.1.1.0/24 + 10.1.2.0/24 + 10.1.3.0/24 = 10.1.0.0/22. Always install discard route for summary prefix to prevent loops.</p>

      <h2 id="ipv6-addressing" style={S.h2}>IPv6 Addressing</h2>
      <CodeBlock lang="text">{`Full:       2001:0db8:0000:0001:0000:0000:0000:0001
Compressed: 2001:db8:0:1::1
Link-local: FE80::1 (auto-generated on every IPv6 interface)
Default:    ::/0`}</CodeBlock>

      <h2 id="interface-config" style={S.h2}>Interface Configuration</h2>
      <p style={S.p}>Elements: IP address + prefix, description, MTU, admin state. Interface up &rarr; connected route + local route auto-added to RIB.</p>
      <h3 style={S.h3}>Loopback Interfaces</h3>
      <p style={S.p}>Logical &mdash; no physical port. Normally independent of physical link state (admin shutdown or platform conditions can bring down). Use cases: Router ID (OSPF/BGP), iBGP update-source (stable peering), management IP, diagnostics. Address: /32 (IPv4), /128 (IPv6). Loopback &ne; host loopback (127.0.0.1) &mdash; router loopback is routable.</p>
      <h3 style={S.h3}>Subinterfaces aur 802.1Q</h3>
      <p style={S.p}>Subinterface = logical child on physical. Each handles one VLAN with own IP. 802.1Q tag: 4 bytes (TPID 0x8100 + TCI with PCP/DEI/VID), inserted between Src MAC and EtherType. Tagged frame max: 1522 bytes. Subinterface state linked to parent. Native VLAN behavior varies by vendor.</p>
      <h3 style={S.h3}>SVIs aur Routed Ports</h3>
      <p style={S.p}><strong>SVI:</strong> Logical Layer-3 interface on platforms supporting L2+L3. VLAN-associated gateway. SVI operational state depends on VLAN database + port activity (common platform behavior, not universal). <strong>Routed port:</strong> Physical interface as Layer-3 &mdash; no VLAN, no L2 bridging, IP directly assigned. SVI &ne; subinterface &ne; routed port.</p>

      {/* STATIC ROUTING */}
      <h2 id="static-routing" style={S.h2}>Static Routing &mdash; Production Depth</h2>
      <ComparisonTable title="Static Route Types" headers={["Type","Use Case"]}
        rows={[
          ["Standard static","Fixed next-hop for specific prefix"],
          ["Floating static","Backup: higher AD than primary dynamic route"],
          ["Default (0.0.0.0/0)","Last-resort toward ISP"],
          ["Host (/32 or /128)","Specific host traffic engineering"],
          ["Null route","Black-hole aggregate, prevent loops"],
        ]} caption="" />
      <p style={S.p}><strong>Floating static:</strong> AD intentionally higher than primary dynamic. Normal: primary wins. Primary gone: floating activates. Simple dual-WAN failover.</p>
      <p style={S.p}><strong>Route tracking / active probes:</strong> Router probes target (ICMP/TCP/etc). Probe fail &rarr; route removed &rarr; backup activates. &ldquo;IP SLA&rdquo; = Cisco-specific terminology. Equivalent on other platforms under different names.</p>
      <Callout type="important" title="Null Route Engineering">
        Aggregate prefix advertise + null/discard route locally install. Traffic to unrouted sub-prefixes hits null route (local discard) &mdash; no loop. LPM ensures specific routes still win. ICMP Unreachable on null route: platform/configuration dependent.
      </Callout>

      <h2 id="admin-distance" style={S.h2}>Administrative Distance aur Route Preference</h2>
      <p style={S.p}><strong>AD</strong> = route-source preference mechanism. Used when competing routes from different sources for same prefix. Lower AD = more preferred. Values are vendor/platform specific &mdash; not universal. Common Cisco IOS values for reference (NOT universal): Connected=0, Static=1, OSPF=110, eBGP=20, iBGP=200. Other vendors use different naming and values. Always verify platform documentation.</p>

      <h2 id="routing-metrics" style={S.h2}>Routing Metrics</h2>
      <ComparisonTable title="Protocol Metrics" headers={["Protocol","Metric","Note"]}
        rows={[
          ["OSPF","Cost (ref-bw / interface-bw)","Set reference bandwidth consistently across all routers"],
          ["IS-IS","Metric (narrow: 0-63, wide: 0-16777215)","Wide metrics recommended"],
          ["BGP","Multiple attributes (not a simple metric)","Best-path via attributes: LOCAL_PREF, AS_PATH, etc."],
          ["RIP","Hop count (max 15)","Legacy &mdash; not used in modern enterprise"],
        ]} caption="Metrics from different protocols not directly comparable." />

      <h2 id="route-selection" style={S.h2}>Route Selection Process</h2>
      <p style={S.p}>Route selection is NOT a universal AD&rarr;metric&rarr;LPM sequence. Separate stages:</p>
      <ol style={{ ...S.ul, listStyleType:"decimal" }}>
        <li><strong>Per-protocol best-path:</strong> Within each protocol, metric-based, protocol-specific.</li>
        <li><strong>RIB candidacy:</strong> Protocol&apos;s selected route(s) offered to system RIB.</li>
        <li><strong>AD-based inter-source selection:</strong> Competing sources for same prefix &rarr; AD/preference decides.</li>
        <li><strong>FIB programming:</strong> Selected routes programmed into forwarding plane.</li>
        <li><strong>LPM forwarding:</strong> Packet arrival &rarr; FIB lookup &rarr; most-specific match wins.</li>
      </ol>

      {/* SECTION 33 - DYNAMIC ROUTING */}
      <h2 id="dynamic-routing" style={S.h2}>Dynamic Routing &mdash; Kyun aur Kab</h2>
      <p style={S.p}>500 routers, 2000 prefixes, daily changes &rarr; static = unmanageable. Dynamic routing: automated route learning, best path selection, automatic failover, convergence after topology change.</p>
      <ComparisonTable title="Routing Protocol Classification" headers={["Category","Protocols","Algorithm"]}
        rows={[
          ["Link-State IGP","OSPF, IS-IS","Topology database + SPF algorithm"],
          ["Path-Vector EGP","BGP","AS_PATH + attributes &rarr; policy-driven best-path"],
          ["Distance-Vector IGP","RIP (legacy), EIGRP (Cisco proprietary)","Routing table sharing with neighbors"],
        ]} caption="EIGRP is Cisco proprietary." />
      <p style={S.p}><strong>Convergence:</strong> All routers agree on current topology, consistent routing information. Convergence time depends on protocol design, timers, topology, hardware, BFD integration. No universal timing guarantee &mdash; measure in your environment.</p>

      {/* OSPF */}
      <h2 id="ospf-fundamentals" style={S.h2}>OSPF Fundamentals</h2>
      <Figure caption="Fig D6 &mdash; OSPF multi-area architecture: router roles, LSA types, LSDB vs routing table.">
        <OspfArchitecture />
      </Figure>
      <p style={S.p}><strong>OSPF:</strong> Link-state IGP (NOT distance-vector). OSPFv2 (RFC 2328): IPv4. OSPFv3 (RFC 5340): IPv6. LSDB &rarr; SPF &rarr; routes &rarr; RIB &rarr; FIB. LSDB &ne; routing table.</p>
      <p style={S.p}><strong>Router ID:</strong> 32-bit identifier (dotted-decimal) &mdash; NOT necessarily an active interface IP. Always configure explicitly (loopback IP). Derived Router IDs can change if source interface goes down &rarr; OSPF reconvergence.</p>
      <p style={S.p}><strong>Neighbor states:</strong> Down &rarr; Init &rarr; 2-Way &rarr; ExStart &rarr; Exchange &rarr; Loading &rarr; Full. On broadcast networks: DROthers reach 2-Way with each other &mdash; expected and correct. Full adjacency only between DROther and DR/BDR.</p>
      <ComparisonTable title="OSPF Network Types" headers={["Type","DR/BDR","Hello (common)","Dead (common)","Use"]}
        rows={[
          ["Broadcast","Yes","10s","40s","Ethernet multi-access"],
          ["Point-to-Point","No","10s","40s","P2P links"],
          ["Non-Broadcast","Yes","30s","120s","Legacy NBMA"],
          ["Point-to-Multipoint","No","30s","120s","Hub-and-spoke"],
        ]} caption="Timer defaults are common values &mdash; not universally fixed. HelloInterval and RouterDeadInterval must match between neighbors. Verify platform documentation." />
      <p style={S.p}><strong>DR/BDR election:</strong> Highest OSPF priority (default typically 1, 0=ineligible). Tie: highest Router ID. Non-preemptive under normal OSPF behavior.</p>
      <p style={S.p}><strong>OSPF Cost:</strong> Reference bandwidth / interface bandwidth. Default reference 100Mbps on many platforms &rarr; 1G, 10G, 100G all cost=1 (problematic). Set reference bandwidth consistently across all routers. Per-interface explicit cost overrides formula.</p>
      <p style={S.p}><strong>OSPFv3 authentication:</strong> RFC 4552 specifies IPv6 IPsec AH/ESP for authentication/confidentiality. RFC 7166 additionally defines Authentication Trailer as alternative &mdash; allows OSPFv3 packet authentication without IPsec. Authentication Trailer does not provide confidentiality. Platform support varies.</p>

      <h2 id="ospf-area-design" style={S.h2}>OSPF Area Design</h2>
      <p style={S.p}><strong>Area 0 (Backbone):</strong> All areas must connect to Area 0 &mdash; fundamental OSPF design requirement.</p>
      <ComparisonTable title="OSPF Area Types" headers={["Type","Blocks","Use Case"]}
        rows={[
          ["Regular","Nothing","Full LSA support"],
          ["Stub","Type 5 External","Single ABR, no ASBR &mdash; ABR injects default"],
          ["Totally Stubby","Type 3,4,5","Maximum simplification (Cisco feature name, concept broadly supported)"],
          ["NSSA","Type 5 (allows Type 7)","Area needs ASBR, no external Type 5"],
        ]} caption="Vendor-specific area terminology clearly labeled." />

      <h2 id="ospf-neighbor-troubleshoot" style={S.h2}>OSPF Neighbor Troubleshooting</h2>
      <p style={S.p}><strong>Not appearing:</strong> OSPF enabled on interface? Area ID match? Timers match? Auth match? Network type match? ACL blocking 224.0.0.5/224.0.0.6 (OSPFv2) or FF02::5/FF02::6 (OSPFv3)?</p>
      <p style={S.p}><strong>Stuck ExStart/Exchange:</strong> MTU mismatch most common. DBD packets carry MTU &mdash; mismatch &rarr; exchange fails.</p>
      <p style={S.p}><strong>Flapping:</strong> HelloInterval and RouterDeadInterval mismatch. CPU overload causing Hello delay. Physical instability.</p>
      <p style={S.p}><strong>Route missing despite Full adjacency:</strong> Check LSDB. Area filter or distribute-list? For Type 5: ASBR reachable? Stub area blocking? ABR summarization absorbing prefix?</p>

      {/* IS-IS */}
      <h2 id="isis-fundamentals" style={S.h2}>IS-IS Fundamentals</h2>
      <p style={S.p}><strong>IS-IS:</strong> Link-state IGP. Level-1 (intra-area), Level-2 (inter-area) hierarchy. ISO 10589, RFC 5308 for IPv6. Runs via own L2 encapsulation &mdash; not transported over IP. Common in SP networks and large DC fabrics (BGP-EVPN overlay often runs over IS-IS underlay).</p>

      {/* BGP */}
      <h2 id="bgp-fundamentals" style={S.h2}>BGP Fundamentals</h2>
      <Figure caption="Fig D7 &mdash; BGP peering model: iBGP, eBGP, Route Reflector, conceptual RIB model.">
        <BgpPeeringModel />
      </Figure>
      <p style={S.p}><strong>BGP (RFC 4271):</strong> Path-vector, TCP port 179. Policy-driven &mdash; NOT designed for fast convergence, designed for policy/scale/stability.</p>
      <p style={S.p}><strong>eBGP:</strong> Different ASes. AS_PATH appended at each AS boundary. Commonly directly connected &mdash; many implementations use one-hop TTL default for eBGP. Multihop requires explicit configuration. This is not a universal BGP protocol requirement &mdash; platform defaults vary. GTSM/TTL Security uses TTL/Hop-Limit 255 with receive-side validation.</p>
      <p style={S.p}><strong>iBGP loop-prevention rule:</strong> iBGP speaker does NOT re-advertise iBGP-learned routes to another iBGP peer &mdash; unless Route Reflector or confederation speaker. Requires full-mesh, route reflectors, or confederations.</p>
      <p style={S.p}><strong>BGP session states:</strong> Idle &rarr; Connect &rarr; Active &rarr; OpenSent &rarr; OpenConfirm &rarr; Established. Stuck in Active: TCP 179 connectivity failure &mdash; most common cause.</p>
      <p style={S.p}><strong>MP-BGP (RFC 4760):</strong> Carries multiple address families &mdash; IPv4, IPv6, VPNv4, VPNv6, EVPN. Capability negotiated in OPEN. Foundation of MPLS L3VPN and DC EVPN.</p>

      <h2 id="bgp-path-selection" style={S.h2}>BGP Path Selection</h2>
      <ComparisonTable title="Key BGP Path Attributes" headers={["Attribute","Type","Engineering Role"]}
        rows={[
          ["NEXT_HOP","Well-known mandatory","Must be resolvable &mdash; prerequisite (not a preference step)"],
          ["LOCAL_PREF","Well-known discretionary","Higher preferred. iBGP only. Primary outbound control knob."],
          ["AS_PATH","Well-known mandatory","Shorter commonly preferred. Loop prevention. Prepending manipulates."],
          ["ORIGIN","Well-known mandatory","IGP > EGP > Incomplete &mdash; low practical significance today"],
          ["MED","Optional non-transitive","Lower generally preferred. Comparison scope: implementation dependent."],
          ["Communities","Optional transitive","Policy tags &mdash; no routing meaning until policy acts"],
          ["Weight","Cisco-specific","NOT a standard BGP attribute. Higher preferred. Local only, not advertised."],
        ]} caption="Best-path selection sequence and tie-breakers vary by vendor/implementation. Never apply one vendor algorithm as universal BGP standard." />
      <Callout type="important" title="NEXT_HOP Is a Prerequisite">
        NEXT_HOP reachability is a prerequisite for route usability &mdash; not a preference step. Route with unresolvable NEXT_HOP is ineligible regardless of other attributes. BGP route in table but not in routing table &rarr; check NEXT_HOP recursive resolution first.
      </Callout>

      <h2 id="bgp-enterprise" style={S.h2}>BGP in the Enterprise</h2>
      <p style={S.p}><strong>Route Reflectors:</strong> Eliminates iBGP full-mesh. Clients peer only with RR. Loop prevention: ORIGINATOR_ID + CLUSTER_LIST. RR does not automatically guarantee optimal routing &mdash; placement matters. Deploy minimum two RRs.</p>
      <p style={S.p}><strong>BGP Graceful Shutdown (RFC 8326):</strong> Pre-maintenance traffic drain via GRACEFUL_SHUTDOWN community (0xFFFF0000). When community received, routing policy can assign low LOCAL_PREF. RFC 8326 recommends LOCAL_PREF 0 &mdash; actual behavior depends on platform and configuration. Required policy action does not occur automatically from receiving community alone.</p>
      <p style={S.p}><strong>BGP max-prefix:</strong> Configure on all eBGP sessions. Threshold violation &rarr; alert + configured protective action (warning-only, route rejection, or session shutdown/restart &mdash; platform/policy dependent).</p>
      <p style={S.p}><strong>Internet route scale:</strong> Default-only (minimal FIB) vs partial routes (targeted engineering) vs full BGP table (maximum control, requires large FIB). Full table size grows continuously &mdash; verify FIB/TCAM capacity. Monitor TCAM utilization.</p>

      {/* ECMP */}
      <h2 id="ecmp-load-sharing" style={S.h2}>ECMP aur Load Sharing</h2>
      <Figure caption="Fig D9 &mdash; ECMP per-flow hash distribution: not round-robin per packet.">
        <EcmpHashDistribution />
      </Figure>
      <p style={S.p}>ECMP occurs when routing/control-plane selection considers multiple paths to same prefix equally eligible as equal-cost next-hops. For a single IGP: commonly equal protocol metric/cost. ECMP definition is NOT &ldquo;same AD + same metric across protocols&rdquo; &mdash; AD is inter-source selection, not ECMP criteria.</p>
      <p style={S.p}><strong>Distribution:</strong> Per-flow hashing &mdash; NOT round-robin per packet. Hash inputs (src IP, dst IP, ports, protocol &mdash; platform dependent). Same flow always same path. Single large TCP flow does NOT aggregate bandwidth across ECMP paths.</p>
      <p style={S.p}><strong>BGP ECMP:</strong> ADD-PATH (RFC 7911) advertises multiple paths per prefix to peers &mdash; but does NOT itself cause ECMP. Local BGP multipath/ECMP installation is a separate configuration decision.</p>

      <h2 id="route-summarization" style={S.h2}>Route Summarization</h2>
      <p style={S.p}>Aggregate multiple specific prefixes into one summary. Benefits: smaller routing tables in neighbors, faster SPF, reduced churn. Risk: hides specific failures. Always install discard route for aggregate locally to prevent loops.</p>

      <h2 id="redistribution" style={S.h2}>Route Redistribution</h2>
      <Figure caption="Fig D16 &mdash; Route redistribution loop risk and prevention.">
        <RedistributionLoopRisk />
      </Figure>
      <p style={S.p}>Redistribution injects routing information between domains. Does NOT merge protocols or preserve original route semantics. New representation created in target protocol.</p>
      <p style={S.p}><strong>Seed metrics:</strong> Always explicitly set &mdash; never rely on platform defaults for production redistribution.</p>
      <p style={S.p}><strong>Loop prevention:</strong> Tag routes at entry + filter tagged at re-entry. Prefix-list filtering (never &ldquo;redistribute all&rdquo;). Minimize redistribution points. AD/preference behavior for redistributed routes is protocol and platform dependent &mdash; do not assume universally &ldquo;worse&rdquo; AD.</p>
      <p style={S.p}><strong>Route tags:</strong> Do not automatically prevent loops &mdash; they are policy tools requiring explicit filter rules referencing the tag. Tag implementation varies by protocol and platform.</p>

      <h2 id="pbr" style={S.h2}>Policy-Based Routing (PBR)</h2>
      <p style={S.p}>PBR overrides normal destination-based FIB forwarding for matching traffic. Match: source IP, protocol, port, DSCP, packet size, input interface. Action: set next-hop (overrides FIB) or set default next-hop (FIB takes precedence, PBR as fallback).</p>
      <p style={S.p}><strong>Caveats:</strong> Performance impact varies by platform. Asymmetric routing risk for stateful devices. PBR does not affect routing protocol behavior. Makes troubleshooting complex &mdash; document all PBR policies.</p>

      {/* VRF */}
      <h2 id="vrf" style={S.h2}>VRF &mdash; Virtual Routing and Forwarding</h2>
      <ComparisonTable title="VRF vs VLAN" headers={["","VRF","VLAN"]}
        rows={[
          ["Layer","Layer 3 &mdash; routing/forwarding isolation","Layer 2 &mdash; broadcast domain segmentation"],
          ["Contains","RIB, FIB, ARP/ND tables","MAC tables, L2 forwarding"],
          ["Scope","Router-level","Switch-level"],
        ]} caption="Complementary but different layers &mdash; VRF is not VLAN." />
      <p style={S.p}><strong>VRF-Lite:</strong> Multiple isolated routing domains on shared physical router (Corporate, Guest, OT, Management). No MPLS needed.</p>
      <p style={S.p}><strong>MPLS L3VPN:</strong> PE routers per-customer VRFs + MP-BGP (VPNv4/VPNv6) + MPLS transport. RD makes VPN routes globally unique. RT controls VRF import/export.</p>
      <p style={S.p}><strong>Route leaking:</strong> Controlled import from one VRF to another (shared services). Implementation platform dependent. Careful policy required &mdash; uncontrolled leaking breaks isolation.</p>

      {/* NAT */}
      <h2 id="nat-pat" style={S.h2}>NAT aur PAT</h2>
      <Figure caption="Fig D14 &mdash; NAT/PAT translation flow with translation table and return traffic.">
        <NatPatTranslationFlow />
      </Figure>
      <p style={S.p}><strong>NAT:</strong> Address translation mechanism. NOT a security mechanism. NOT required for IPv6. Inside/outside terminology = implementation/vendor convention, not universal NAT standard.</p>
      <p style={S.p}><strong>Static NAT:</strong> One private IP &harr; one public IP, permanent mapping. Configured mapping does not bypass routing, ACL, firewall, interface, or policy requirements.</p>
      <p style={S.p}><strong>Dynamic NAT:</strong> Pool of public IPs shared dynamically. When all mappings allocated &rarr; new translation may fail until one released. Exhaustion behavior: platform dependent.</p>
      <p style={S.p}><strong>PAT (NAT Overload/NAPT):</strong> Multiple hosts share one public IP via source ports. Return traffic: lookup translation table &rarr; reverse translate. Timeout: platform dependent (TCP longer, UDP shorter). NAT processing order relative to ACL/routing: platform dependent.</p>

      {/* DHCP RELAY */}
      <h2 id="dhcp-relay" style={S.h2}>DHCP Relay / IP Helper Concepts</h2>
      <Figure caption="Fig D15 &mdash; DHCP relay flow: client broadcast &rarr; relay agent &rarr; DHCP server &rarr; client.">
        <DhcpRelayFlow />
      </Figure>
      <p style={S.p}>DHCP client sends limited broadcast (dst 255.255.255.255, src 0.0.0.0) &mdash; broadcast does not cross routers. Relay agent: receives broadcast, sets giaddr (DHCPv4 giaddr field, RFC 2131 = relay agent&apos;s interface IP on client subnet &mdash; NOT the WAN address), forwards as unicast to server. Server uses giaddr to select address pool.</p>
      <p style={S.p}><strong>Option 82 (RFC 3046):</strong> Relay Agent Information &mdash; circuit-id, remote-id. Separate from giaddr. Not required for basic relay.</p>
      <p style={S.p}><strong>ip helper-address</strong> = Cisco IOS configuration command &mdash; not the protocol name. DHCPv6 relay uses different mechanism: <em>link-address field</em> in Relay-forward message header (a header field, not an option). Configure DHCPv4 and DHCPv6 relay separately.</p>

      {/* ACL */}
      <h2 id="acl-on-routers" style={S.h2}>ACL on Routers</h2>
      <Figure caption="Fig D13 &mdash; ACL packet evaluation: first-match, implicit deny, inbound/outbound context.">
        <AclPacketEvaluation />
      </Figure>
      <p style={S.p}>ACLs filter packets &mdash; not routing decisions. Stateless by default. &ldquo;Standard ACL&rdquo; (source-only match) and &ldquo;Extended ACL&rdquo; (multi-field match) are Cisco IOS terminology &mdash; other platforms use different naming. Implicit deny at end: Cisco IOS convention &mdash; not universal. ACL pipeline order relative to NAT/routing: platform dependent.</p>

      <h2 id="route-filtering" style={S.h2}>Route Filtering aur Prefix Lists</h2>
      <p style={S.p}><strong>Prefix lists:</strong> Most granular IP prefix filter. Matches prefixes with optional length ranges. More efficient than ACLs for routing policy. Distribute-list (ACL-like constructs in routing protocol context): route filtering, not data-plane packet filtering &mdash; do not conflate these two uses.</p>
      <p style={S.p}><strong>Internet edge inbound:</strong> Reject RFC 1918, bogons, own prefixes returned, overly-specific (filtering longer than /24 for IPv4 = common practice, not standard). Outbound: advertise only legitimately held prefixes.</p>

      <h2 id="route-policy" style={S.h2}>Route Policy aur Route Maps</h2>
      <p style={S.p}><strong>Route maps:</strong> Match conditions (prefix, AS_PATH, community, etc.) + set actions (LOCAL_PREF, MED, community, next-hop). Used for redistribution control, BGP attribute manipulation, PBR.</p>
      <p style={S.p}><strong>BGP communities:</strong> Policy tags &mdash; no inherent routing meaning until policy acts. Well-known: NO_EXPORT (0xFFFFFF01), NO_ADVERTISE (0xFFFFFF02). Large communities (RFC 8092): ASN:value1:value2.</p>

      {/* FHRP */}
      <h2 id="fhrp-vrrp" style={S.h2}>First-Hop Redundancy &mdash; VRRP aur Alternatives</h2>
      <Figure caption="Fig D8 &mdash; VRRP Master/Backup: virtual IP/MAC, failover sequence, tracking.">
        <VrrpArchitecture />
      </Figure>
      <p style={S.p}><strong>VRRP (IETF standard):</strong> VRRPv2 (RFC 3768) IPv4. VRRPv3 (RFC 5798) IPv4+IPv6. Master/Backup. Virtual MAC: IPv4 = 00:00:5E:00:01:{"{VRID}"}, IPv6 = 00:00:5E:00:02:{"{VRID}"}. Preemption enabled by default. Multi-vendor interoperable.</p>
      <p style={S.p}><strong>HSRP &mdash; Cisco proprietary:</strong> NOT an open standard. Active/Standby. Preemption disabled by default (important difference from VRRP). Not interoperable with non-Cisco as FHRP peer.</p>
      <p style={S.p}><strong>GLBP &mdash; Cisco proprietary:</strong> Active-active gateway redundancy. Not open standard.</p>
      <p style={S.p}><strong>Post-FHRP failover:</strong> Virtual MAC ownership moves to new Master &mdash; hosts continue using same virtual IP/MAC, no config change needed. Post-failover issues: investigate L2 FDB convergence toward new active router, upstream routing convergence, tracked uplink state, VLAN/trunk consistency, ACL/policy state.</p>

      {/* BFD */}
      <h2 id="bfd" style={S.h2}>BFD &mdash; Bidirectional Forwarding Detection</h2>
      <p style={S.p}><strong>BFD (RFC 5880):</strong> Rapid failure detection protocol &mdash; NOT a routing protocol. Detects forwarding-path failure. Notifies routing protocols/tracking mechanisms. OSPF Dead timer 40s, BGP Hold timer 90s &mdash; BFD detects much faster.</p>
      <p style={S.p}><strong>Detection time (simplified approximation):</strong> &asymp; negotiated transmit/receive interval &times; Detect Multiplier. Actual detection depends on negotiated intervals, remote Detect Multiplier, BFD mode, and implementation. Treat as estimate, not guaranteed.</p>
      <p style={S.p}><strong>BFD modes:</strong> Asynchronous (most common): both endpoints independently send BFD Control packets. Demand mode: periodic Control packets suppressed after establishment. Echo function (optional, separate): packets looped back by remote forwarding plane &mdash; support varies.</p>
      <p style={S.p}><strong>Single-hop BFD (RFC 5881):</strong> Transmit TTL/Hop Limit = 255. Received BFD Control packets expected with TTL/Hop Limit = 255 per RFC. Multi-hop BFD (RFC 5883): between non-adjacent routers.</p>
      <p style={S.p}><strong>BFD + GR interaction:</strong> Aggressive BFD can defeat GR if BFD session fails during control-plane restart. Whether BFD should trigger protocol teardown during restart depends on platform architecture. Verify before combining with GR designs.</p>

      {/* QOS */}
      <h2 id="qos-routers" style={S.h2}>QoS on Routers</h2>
      <ComparisonTable title="QoS Functions" headers={["Function","What It Does"]}
        rows={[
          ["Classification","Identify traffic type &mdash; ACL, DSCP, protocol, port"],
          ["Marking","Set DSCP/CoS &mdash; DSCP EF (46) for voice, AF classes for data"],
          ["Queuing","Multiple queues per interface &mdash; priority, weighted fair"],
          ["Shaping","Smooth traffic to configured rate &mdash; buffer excess"],
          ["Policing","Enforce rate limit &mdash; drop or remark excess (not buffer)"],
        ]} caption="QoS implementation varies by platform and ASIC. Trust boundary critical." />

      {/* MPLS */}
      <h2 id="mpls-fundamentals" style={S.h2}>MPLS Fundamentals</h2>
      <Figure caption="Fig D17 &mdash; MPLS forwarding: label push/swap/pop, LER/LSR roles, L3VPN.">
        <MplsForwardingArchitecture />
      </Figure>
      <p style={S.p}><strong>MPLS:</strong> Label-based forwarding architecture supporting L2 and L3 services. NOT simply Layer 2. Operates between L2 and L3. Labels forwarded; IP header not examined at transit LSRs. MPLS &ne; encryption.</p>
      <p style={S.p}><strong>32-bit label stack entry:</strong> [20-bit Label][3-bit TC][1-bit S (bottom-of-stack)][8-bit TTL]. Multiple labels stackable. LER (Label Edge Router): ingress pushes, egress pops. LSR (Label Switch Router): transit swap.</p>
      <p style={S.p}><strong>LDP:</strong> One option for establishing LSPs &mdash; not universally required. Segment Routing (SR) is a growing alternative.</p>
      <p style={S.p}><strong>PHP (Penultimate Hop Popping):</strong> Second-to-last LSR pops transport label. Common optimization &mdash; not universally mandated. Explicit Null used as alternative.</p>
      <p style={S.p}><strong>MPLS L3VPN:</strong> PE per-customer VRFs + MP-BGP (VPNv4/VPNv6) + MPLS backbone. CE doesn&apos;t need MPLS awareness. MPLS L3VPN provides traffic separation via VRF &mdash; NOT encryption. Add IPsec for confidentiality.</p>

      {/* VPN */}
      <h2 id="vpn-fundamentals" style={S.h2}>VPN Fundamentals</h2>
      <ComparisonTable title="VPN Categories" headers={["Category","Description","Examples"]}
        rows={[
          ["Provider-managed L3 VPN","Provider handles routing between sites","MPLS L3VPN"],
          ["Provider-managed L2 VPN","Transparent L2 between sites","VPLS, EVPN-VPWS"],
          ["Customer-managed overlay","Customer builds encrypted tunnels","IPsec, GRE/IPsec, SD-WAN"],
        ]} caption="Architecturally distinct &mdash; not interchangeable." />

      {/* IPSEC */}
      <h2 id="ipsec" style={S.h2}>IPsec</h2>
      <p style={S.p}><strong>IKEv2 (RFC 7296):</strong> Current standard &mdash; IKEv1 is legacy. IKEv2 flow: IKE_SA_INIT &rarr; IKE_AUTH &rarr; IKE SA established &rarr; CHILD SA / ESP-protected traffic. Do NOT use IKEv1 &ldquo;Phase 1/Phase 2&rdquo; terminology for IKEv2.</p>
      <p style={S.p}><strong>ESP (RFC 4303):</strong> Primary data-protection mechanism &mdash; confidentiality + integrity. Tunnel mode (most common for site-to-site): full original IP encrypted under new IP header. AH rarely used in modern deployments.</p>
      <p style={S.p}><strong>IPsec overhead:</strong> ~50-70+ bytes depending on cipher suite. Effective inner MTU reduced accordingly. Measure actual overhead for deployed configuration empirically.</p>

      {/* GRE */}
      <h2 id="gre-tunnels" style={S.h2}>GRE Tunnels</h2>
      <p style={S.p}><strong>GRE (RFC 2784):</strong> Encapsulates any L3 protocol in IP. Creates virtual P2P tunnel. Minimum overhead: 24 bytes (4B GRE + 20B outer IPv4). Used for routing protocol adjacency over IP, GRE over IPsec (routing adjacency + encryption).</p>
      <p style={S.p}><strong>MTU planning:</strong> Account for BOTH GRE and IPsec overhead. Determine actual overhead empirically for your specific config. MSS clamping for TCP. Permit ICMP Fragmentation Needed / Packet Too Big end-to-end.</p>
      <p style={S.p}><strong>DMVPN</strong> = Cisco-proprietary &mdash; not a multi-vendor standard.</p>

      {/* MULTICAST */}
      <h2 id="multicast-routing" style={S.h2}>Multicast Routing Fundamentals</h2>
      <p style={S.p}><strong>IGMP:</strong> IPv4 host membership protocol. Hosts join/leave multicast groups to local router. IGMPv3 supports source-specific multicast (SSM).</p>
      <p style={S.p}><strong>MLD:</strong> IPv6 equivalent of IGMP. ICMPv6-based. MLDv1 &asymp; IGMPv2. MLDv2 &asymp; IGMPv3.</p>
      <p style={S.p}><strong>PIM (Protocol Independent Multicast):</strong> Uses existing unicast routing table. PIM Sparse Mode (PIM-SM): receivers explicitly join via Rendezvous Point (RP). Dominant in enterprise/DC.</p>
      <p style={S.p}><strong>Router vs switch:</strong> Router: inter-subnet multicast routing, IGMP/MLD querier, PIM. Switch: IGMP/MLD Snooping &mdash; forward multicast only to interested ports (without snooping: flood = broadcast behavior).</p>

      {/* WAN AND DC */}
      <h2 id="wan-connectivity" style={S.h2}>WAN Connectivity aur Technologies</h2>
      <p style={S.p}><strong>Layer separation:</strong> Physical transport (fiber/copper) &ne; Layer-2 service (Metro Ethernet, MPLS) &ne; Layer-3 routing (BGP/OSPF/static). MPLS = label-based forwarding architecture &mdash; not &ldquo;just Layer 2.&rdquo;</p>
      <ComparisonTable title="Current WAN Types" headers={["Type","Service Layer","Notes"]}
        rows={[
          ["Metro Ethernet","Ethernet","Provider delivers Ethernet service between sites"],
          ["MPLS L3VPN","MPLS label-based forwarding","Provider manages routing; CE-PE via BGP/OSPF/static"],
          ["Internet VPN (IPsec)","IP","Encrypted tunnels over public internet"],
          ["SD-WAN","Various underlay","Software-defined overlay &mdash; vendor proprietary"],
          ["Dark fiber","Physical","Customer runs own L2/L3"],
        ]} caption="Legacy WAN (Frame Relay, ATM, serial) = historical context only." />

      <h2 id="dual-isp" style={S.h2}>Dual ISP Architecture</h2>
      <Figure caption="Fig D19 &mdash; Dual ISP: outbound control via LOCAL_PREF, inbound influence via AS_PATH.">
        <DualIspArchitecture />
      </Figure>
      <p style={S.p}><strong>Outbound &mdash; fully controllable:</strong> LOCAL_PREF, PBR, route preference. ISP-A LOCAL_PREF 200 &gt; ISP-B LOCAL_PREF 100 &rarr; ISP-A primary exit.</p>
      <p style={S.p}><strong>Inbound &mdash; limited and probabilistic:</strong> AS_PATH prepending, MED (hint to immediate neighbor only), provider communities. Cannot deterministically control inbound from internet &mdash; each AS makes independent decision. Asymmetric routing is normal.</p>
      <p style={S.p}><strong>Route scale:</strong> Default-only (minimal FIB) vs partial routes vs full table (verify FIB/TCAM capacity).</p>

      <h2 id="internet-edge" style={S.h2}>Internet Edge / Border Router</h2>
      <p style={S.p}><strong>RPKI ROV:</strong> ROA + Route Origin Validation. Classifies: Valid/Invalid/NotFound. Operator defines routing policy per state &mdash; common defensive approach de-preferences Invalid, accepts NotFound (NotFound &ne; Invalid). Origin validation only &mdash; NOT AS_PATH (BGPsec RFC 8205 for that, not widely deployed).</p>
      <p style={S.p}><strong>Prefix filtering mandatory:</strong> Inbound: reject RFC 1918, bogons, own prefixes returned. Outbound: advertise only legitimately held address space. IRR objects used to generate filter policies.</p>

      <h2 id="enterprise-wan" style={S.h2}>Enterprise WAN Router Design</h2>
      <p style={S.p}><strong>Hub-and-spoke:</strong> Central hub, branch spokes. All inter-branch via hub. Simple, centralized. Latency penalty spoke-to-spoke. Suitable for small branch count.</p>
      <p style={S.p}><strong>SD-WAN:</strong> Each vendor (Cisco Viptela, VMware VeloCloud, Fortinet, Palo Alto Prisma) has proprietary architecture. Traditional routing knowledge essential for troubleshooting &mdash; SD-WAN adds abstraction layer, doesn&apos;t eliminate routing fundamentals.</p>

      <h2 id="dc-border-router" style={S.h2}>Router in Modern Data Center</h2>
      <Figure caption="Fig D20 &mdash; DC border architecture: North-South vs East-West traffic paths.">
        <DcBorderArchitecture />
      </Figure>
      <p style={S.p}><strong>DC border router:</strong> BGP with ISPs, route policy, NAT, ACL/prefix filtering, QoS marking. Relationship with Spine-Leaf: default route injection into fabric OR BGP between border and spine/leaf &mdash; depends on architecture and traffic engineering requirements.</p>

      <h2 id="north-south" style={S.h2}>North-South Traffic aur DC Border</h2>
      <p style={S.p}><strong>North-South:</strong> Traffic entering/leaving DC (internet/WAN). All passes through border router. <strong>East-West:</strong> Server-to-server within DC fabric &mdash; stays in Spine-Leaf, does NOT traverse border router. East-West increasingly dominant in modern DC.</p>

      <h2 id="router-vs-l3switch-dc" style={S.h2}>Router vs L3 Switch in DC Core</h2>
      <ComparisonTable title="DC Border Decision" headers={["Consideration","Favors Router","Favors L3 Switch"]}
        rows={[
          ["WAN interface types","Yes","&mdash;"],
          ["Deep BGP policy","Yes","&mdash;"],
          ["IPsec/VPN termination","Yes","&mdash;"],
          ["Dense Ethernet port count","&mdash;","Yes"],
          ["High inter-VLAN throughput","&mdash;","Yes"],
          ["MPLS edge functions","Yes (typically)","&mdash;"],
        ]} caption="Modern DC border increasingly blurs this line. Internet edge with complex BGP: dedicated router generally preferred." />

      {/* SECURITY */}
      <h2 id="routing-security" style={S.h2}>Routing Security Fundamentals</h2>
      <Figure caption="Fig D18 &mdash; Routing security: RPKI ROV, max-prefix, prefix filters, CoPP.">
        <RoutingSecurityArchitecture />
      </Figure>
      <p style={S.p}><strong>BGP route hijacking:</strong> AS advertises prefixes it doesn&apos;t own. Real-world impact: traffic to major platforms redirected. Often misconfiguration, sometimes malicious. RPKI + ROV mitigates origin-based hijacking.</p>
      <p style={S.p}><strong>BGP security checklist:</strong> Max-prefix all eBGP sessions. MD5/TCP-AO authentication. Prefix filters inbound + outbound. RPKI ROV enabled. Inbound: reject RFC 1918, bogons, own prefixes, overly-specific.</p>

      <h2 id="control-plane-protection" style={S.h2}>Control Plane Protection</h2>
      <p style={S.p}><strong>CoPP (Cisco terminology) / equivalent on other platforms:</strong> Classifies and rate-limits CPU-bound traffic. Protects routing protocols + management. Does NOT affect transit data-plane forwarding. BGP sessions + OSPF hellos &rarr; guaranteed rate. ICMP to router &rarr; rate limited. Unknown &rarr; strict limit or drop. Rates and classes: platform and deployment dependent.</p>

      <h2 id="aaa-ssh" style={S.h2}>AAA, SSH aur Secure Management</h2>
      <p style={S.p}><strong>AAA:</strong> Authentication + Authorization + Accounting. TACACS+ (RFC 8907 informational, Cisco-developed, encrypts full body) vs RADIUS (RFC 2865 IETF standard, encrypts only password). TACACS+ common for network device CLI. Local fallback on console.</p>
      <p style={S.p}><strong>SSH v2 mandatory:</strong> No Telnet. Key length: minimum 2048-bit RSA or platform equivalent. VTY: SSH only + source ACL restricting management IPs.</p>

      <h2 id="routing-protocol-auth" style={S.h2}>Routing Protocol Authentication</h2>
      <p style={S.p}><strong>OSPF:</strong> OSPFv2 &mdash; Type 0 (none), Type 1 (cleartext, not recommended), Type 2 (MD5). OSPFv3 &mdash; RFC 4552 (IPv6 IPsec AH/ESP) AND RFC 7166 (Authentication Trailer &mdash; alternative without IPsec dependency; no confidentiality). Platform support varies.</p>
      <p style={S.p}><strong>BGP TCP authentication:</strong> MD5 (RFC 2385) most common. TCP-AO (RFC 5925) stronger, supports key rollover. Keys must match exactly on both sides. Key changes require coordination with peer &mdash; especially ISPs for eBGP sessions. Depending on platform, coordinated key rollover mechanisms may reduce or avoid session interruption.</p>

      {/* MONITORING */}
      <h2 id="snmp-syslog-telemetry" style={S.h2}>SNMP, Syslog aur Streaming Telemetry</h2>
      <p style={S.p}><strong>SNMPv3 USM (RFC 3414):</strong> Originally defines HMAC-MD5-96 and HMAC-SHA-96 authentication + CBC-DES privacy. AES privacy standardized separately (RFC 3826). Modern platforms may support newer SHA/AES variants. authPriv with currently supported strong algorithms recommended &mdash; MD5 and DES not recommended where stronger alternatives available.</p>
      <p style={S.p}><strong>SNMP operations:</strong> GET, GETBULK, SET, TRAP (unacknowledged &mdash; can be lost), INFORM (acknowledged &mdash; more reliable). Complement traps with polling or INFORM for critical state.</p>
      <p style={S.p}><strong>Syslog severity (RFC 5424):</strong> 0=Emergency, 1=Alert, 2=Critical, 3=Error, 4=Warning, 5=Notice, 6=Informational, 7=Debug. Production: Warning (4) or Informational (5). Debug = high CPU, fills buffers &mdash; disable immediately after troubleshooting.</p>
      <p style={S.p}><strong>Streaming Telemetry:</strong> Router pushes operational data. gNMI = open standard using gRPC. gRPC = RPC framework typically running over HTTP/2 (not simply a &ldquo;transport layer&rdquo;). NETCONF (RFC 6241) = configuration/state management &mdash; NOT synonymous with streaming telemetry. Resource impact depends on platform, subscription frequency, encoding &mdash; not universally lower than SNMP polling.</p>

      <h2 id="config-backup" style={S.h2}>Configuration Backup aur Change Management</h2>
      <p style={S.p}><strong>Backup:</strong> Running + startup config. After every change (immediately), daily scheduled, before any upgrade (mandatory). SCP preferred (encrypted). Git repository for version control &mdash; diff between versions, commit messages with context.</p>
      <p style={S.p}><strong>Change management:</strong> Pre-change backup. OOB access verified. One change at a time. Each step verified before proceeding. Post-change: routing table verified, config saved, record closed.</p>
      <Callout type="important" title="Configuration Rollback">
        Some platforms (Juniper Junos) support &ldquo;commit confirmed&rdquo; &mdash; auto-reverts if not confirmed within timeout. On other platforms: manual rollback &mdash; load backup and apply. Backup must exist before any change.
      </Callout>

      <h2 id="os-upgrade" style={S.h2}>OS/Firmware Upgrade Strategy</h2>
      <p style={S.p}><strong>Pre-upgrade:</strong> Read release notes completely (upgrade path, syntax changes, known issues). Lab validate. Pre-change backup. Record current state. Verify dual-image support. OOB access confirmed. Verify image integrity (MD5/SHA hash).</p>
      <p style={S.p}><strong>ISSU:</strong> Non-disruptive upgrade on dual-supervisor platforms with SSO. Platform, NOS version, feature, upgrade-path dependent &mdash; verify before planning. Not universally available.</p>
      <p style={S.p}><strong>Post-upgrade soak:</strong> 24-72h before deleting old image. PSIRT security advisories: subscribe, respond based on risk &mdash; not annual cycles.</p>

      {/* HA */}
      <h2 id="ha-redundancy" style={S.h2}>High Availability aur Redundancy</h2>
      <Figure caption="Fig D23 &mdash; NSF/SSO/GR interaction timeline during supervisor failover.">
        <NsfSsoGrInteraction />
      </Figure>
      <p style={S.p}><strong>NSF:</strong> Local mechanism &mdash; data plane continues using existing FIB during control-plane disruption. Does not require neighbor support. Operates on potentially stale FIB. Platform/NOS/architecture dependent.</p>
      <p style={S.p}><strong>SSO:</strong> Standby supervisor maintains synchronized state, takes over. Combined SSO + NSF + GR substantially reduces supervisor failover impact. Actual timings: platform/NOS/protocol/config dependent &mdash; not universal.</p>
      <p style={S.p}><strong>Graceful Restart (GR):</strong> Protocol-level mechanism &mdash; separate from NSF. Restarting router signals neighbors to retain routing state. OSPF GR (RFC 3623): planned &mdash; Grace-LSA originated before restart; unplanned &mdash; originated after control software recovery. Helper neighbors continue advertising restarting router as fully adjacent during grace period; topology changes can terminate GR &rarr; normal reconvergence. BGP GR (RFC 4724): capability in OPEN, End-of-RIB markers used. IS-IS GR (RFC 5306). Helper support required on both sides.</p>
      <p style={S.p}><strong>Dual-router active/standby:</strong> Both run full routing protocols independently. VRRP provides gateway redundancy. Overall disruption = slowest element (VRRP failover fast; BGP failover from ISPs slower).</p>

      {/* TROUBLESHOOTING METHODOLOGY */}
      <h2 id="troubleshooting-methodology" style={S.h2}>Router Troubleshooting Methodology</h2>
      <p style={S.p}><strong>Structured approach:</strong> (1) Define problem precisely &mdash; which traffic, between which hosts, when started, what changed. (2) Collect evidence before making changes. (3) Form specific hypothesis. (4) Test one change at a time. (5) Document everything &mdash; timestamp, commands, observations, changes.</p>
      <p style={S.p}><strong>OSI-layer sequence:</strong> Physical (cable, DOM/DDM, errors) &rarr; L2 (admin/operational state, CRC/FCS) &rarr; L3 addressing (IP, connected routes, ARP/ND) &rarr; Routing (route present, correct next-hop, neighbor state) &rarr; FIB (route in RIB but not FIB, TCAM exhaustion) &rarr; Policy (ACL, VRF, PBR) &rarr; NAT (translation table, return path) &rarr; MTU (large packets failing) &rarr; QoS (queue drops) &rarr; Application.</p>
      <Callout type="important" title="Never Reboot First">
        Production router ka first troubleshooting step kabhi reboot nahi hona chahiye. Reboot destroys diagnostic evidence. Diagnose first &mdash; then corrective action.
      </Callout>

      <h2 id="interface-down" style={S.h2}>Interface Down Troubleshooting</h2>
      <p style={S.p}><strong>First check admin state:</strong> Admin down = operator shutdown = not a fault. Only investigate if admin up + operational down.</p>
      <p style={S.p}><strong>Physical:</strong> Fiber connectors clean? Correct fiber type for transceiver? DOM/DDM: RX power below threshold &rarr; dirty connector, bad fiber, wrong type. TX power below threshold &rarr; failing laser.</p>
      <p style={S.p}><strong>Counters:</strong> CRC/FCS errors &rarr; start with physical path (cable, fiber cleanliness, transceiver health, optical levels). Runts: platform-specific interpretation. On modern switched full-duplex links: do NOT assume duplex mismatch solely from CRC/runt counters &mdash; diagnose with interface state and PHY information.</p>

      <h2 id="ip-connectivity" style={S.h2}>IP Connectivity Troubleshooting</h2>
      <p style={S.p}><strong>Ping:</strong> Source address matters &mdash; specify source explicitly for specific-interface testing. Extended ping: large packet + DF bit (MTU test), specific VRF.</p>
      <p style={S.p}><strong>Traceroute:</strong> Path taken, latency per hop. Asterisks (*) &ne; hop down &mdash; ICMP may be suppressed. Validate with end-to-end ping to final destination.</p>
      <p style={S.p}><strong>ARP/NDP:</strong> Incomplete ARP = L2 reachability failure. IPv6 neighbor cache: REACHABLE (confirmed), STALE (unconfirmed, will refresh), INCOMPLETE (not resolved).</p>
      <p style={S.p}><strong>MTU Black Hole:</strong> Ping works (small), large transfers fail. Test: large ICMP + DF bit. Fix: MSS clamping for TCP + correct inner MTU + permit ICMP Fragmentation Needed / ICMPv6 Packet Too Big end-to-end.</p>

      <h2 id="routing-table-troubleshoot" style={S.h2}>Routing Table Troubleshooting</h2>
      <p style={S.p}><strong>Route missing &mdash; pipeline:</strong> (1) Was route received? (2) Inbound policy filtering? (3) BGP decision selected it? (4) NEXT_HOP resolvable? (5) Accepted into system RIB? (6) FIB programmed? CLI representation differs by implementation &mdash; use platform documentation.</p>
      <p style={S.p}><strong>Wrong route:</strong> More-specific prefix from unexpected source (LPM). Redistribution feedback. Floating static wrong AD. OSPF E2 external with low cost competing with internal routes.</p>

      <h2 id="ospf-troubleshoot" style={S.h2}>OSPF Neighbor Troubleshooting</h2>
      <p style={S.p}><strong>2-Way between DROthers on broadcast networks &mdash; expected and correct.</strong> Full only between DROther and DR/BDR. Stuck ExStart/Exchange: MTU mismatch. Flapping: HelloInterval and RouterDeadInterval mismatch, CPU overload, physical instability. Route missing despite Full: check LSDB, area filter, distribute-list, ABR summarization.</p>

      <h2 id="bgp-troubleshoot" style={S.h2}>BGP Neighbor Troubleshooting</h2>
      <p style={S.p}><strong>Not establishing:</strong> TCP 179 reachable? ACL blocking? Authentication key match? Update-source for loopback peering? ASN correct?</p>
      <p style={S.p}><strong>Session up but no routes:</strong> Route received? Inbound policy filtering? BGP selected it? NEXT_HOP resolvable? Accepted in RIB? FIB programmed? Each stage requires platform-appropriate commands.</p>
      <p style={S.p}><strong>Prefix not advertised:</strong> iBGP split-horizon rule (RR needed). Outbound policy. NEXT_HOP reachability. NO_EXPORT community. Aggregate suppressing specific.</p>
      <p style={S.p}><strong>Session flapping:</strong> Hold timer expiry (CPU overload, path packet loss). TCP RST (ACL change, process restart). NOTIFICATION message (error code in syslog identifies reason).</p>

      <h2 id="nat-troubleshoot" style={S.h2}>NAT Troubleshooting</h2>
      <p style={S.p}><strong>Not translating:</strong> Interface inside/outside designation correct? Traffic matching NAT ACL/rule? Check active translation table.</p>
      <p style={S.p}><strong>Return traffic failing:</strong> Translation table entry present? Timeout expired? Asymmetric routing? If no matching state: behavior (drop, normal routing, logging) depends on platform and configuration.</p>
      <p style={S.p}><strong>Application broken:</strong> ALG needed (FTP, SIP)? Encrypted payload (ALG can&apos;t inspect)? PAT port exhaustion?</p>

      <h2 id="asymmetric-loops" style={S.h2}>Asymmetric Routing aur Routing Loops</h2>
      <Figure caption="Fig D24 &mdash; Routing loop detection via traceroute + null route prevention.">
        <RoutingLoopNullRoute />
      </Figure>
      <p style={S.p}><strong>Asymmetric routing &mdash; when problem:</strong> Stateful devices see only one direction &rarr; drop return traffic. Traceroute both directions &mdash; compare paths. Fix: route policy for symmetric path, firewall cluster with state sync, or stateless ACL.</p>
      <p style={S.p}><strong>Routing loop:</strong> Packets circulate &mdash; TTL prevents infinite. Detection: traceroute shows repeated hops. Common causes: redistribution feedback, default + summarization loop, static misconfiguration.</p>
      <p style={S.p}><strong>Black hole:</strong> Traffic forwarded but silently dropped. Causes: null route (intentional), PMTUD Black Hole (ICMP filtered), FIB inconsistency. Detection: traceroute to last responding hop, packet capture.</p>

      {/* PRODUCTION SCENARIOS */}
      <h2 id="production-scenarios" style={S.h2}>Real Production Scenarios</h2>
      <h3 style={S.h3}>Scenario 1 &mdash; ISP Partial Fiber Degradation</h3>
      <p style={S.p}><strong>Symptom:</strong> Some internet destinations unreachable, others work. BGP sessions up. Interface operational up. High CRC errors on ISP-A interface. DOM/DDM showed RX power below normal range.</p>
      <p style={S.p}><strong>Root cause:</strong> Partial fiber degradation &mdash; sufficient signal for BGP KEEPALIVE (smaller, higher probability of getting through), but packet loss causing data traffic failures. <strong>Lesson:</strong> BGP session up &ne; full traffic working. Physical-layer degradation doesn&apos;t always take BGP down. DOM/DDM and interface counters are essential monitoring.</p>
      <h3 style={S.h3}>Scenario 2 &mdash; Secondary OSPF Reconvergence After Reload</h3>
      <p style={S.p}><strong>Symptom:</strong> Expected outage during reload resolved. Brief second interruption 4 minutes later.</p>
      <p style={S.p}><strong>Root cause:</strong> Interface stabilization timing &mdash; two uplink interfaces completed L2 negotiation sequentially. Second interface&apos;s adjacency reaching Full triggered additional SPF with updated topology &rarr; second smaller reconvergence. <strong>Lesson:</strong> Post-reload OSPF reconvergence may not be singular &mdash; multiple SPF runs expected protocol behavior. Communicate in maintenance notifications.</p>
      <h3 style={S.h3}>Scenario 3 &mdash; VRF Route Leak Too Broad</h3>
      <p style={S.p}><strong>Symptom:</strong> Guest users reaching corporate servers &mdash; security violation.</p>
      <p style={S.p}><strong>Root cause:</strong> Route leak prefix-list included corporate subnets. <strong>Lesson:</strong> Route leaking requires precise prefix-list. Test full reachability after any leak policy change. Defense in depth &mdash; ACL/firewall as backup to route control.</p>
      <h3 style={S.h3}>Scenario 4 &mdash; GRE/IPsec MTU Black Hole</h3>
      <p style={S.p}><strong>Symptom:</strong> Branch to HQ: ping works, large transfers/RDP fail. Traceroute completes.</p>
      <p style={S.p}><strong>Root cause:</strong> GRE + IPsec encapsulation overhead reduced effective inner MTU significantly. ICMP Fragmentation Needed filtered at ISP edge firewall &rarr; PMTUD Black Hole. <strong>Resolution:</strong> Measured actual overhead empirically. Configured tunnel MTU to match validated effective inner path MTU. TCP MSS clamping (TCP only). Fixed firewall to permit ICMP Fragmentation Needed end-to-end. <strong>Lesson:</strong> MSS clamping alone insufficient &mdash; non-TCP large packets still need correct MTU.</p>
      <h3 style={S.h3}>Scenario 5 &mdash; BGP MD5 Key Rotation Coordination Failure</h3>
      <p style={S.p}><strong>Symptom:</strong> BGP session to ISP dropped immediately after key change.</p>
      <p style={S.p}><strong>Root cause:</strong> Key changed without coordinating with ISP. MD5 requires both sides same key simultaneously. <strong>Resolution:</strong> Reverted to old key. Coordinated with ISP for simultaneous change. Depending on platform, coordinated key rollover mechanisms may reduce or avoid session interruption; otherwise changing the TCP authentication key can reset or prevent session establishment.</p>

      {/* COMMISSIONING */}
      <h2 id="commissioning-checklist" style={S.h2}>Router Commissioning Checklist</h2>
      <Figure caption="Fig D21 &mdash; Router commissioning flow: 6 phases from physical to handover.">
        <RouterCommissioningFlow />
      </Figure>
      <ul style={S.ul}>
        <li><strong>Phase 1 &mdash; Physical:</strong> Hardware mounted (airflow correct), PSU-1&rarr;PDU-A / PSU-2&rarr;PDU-B (separate circuits), grounding verified, console connected, production cables NOT connected yet.</li>
        <li><strong>Phase 2 &mdash; Boot:</strong> POST completes (no hardware errors), NOS version verified, factory/clean state confirmed.</li>
        <li><strong>Phase 3 &mdash; Base config:</strong> Hostname, SSH v2, AAA + local fallback, management IP + OOB route, NTP synchronized, syslog (two remote servers), SNMPv3, service hardening, login banner.</li>
        <li><strong>Phase 4 &mdash; Interface + routing:</strong> Loopback0 + explicit Router ID, interfaces (IP, description, MTU), routing protocols up (OSPF Full, BGP Established), routing table matches expected.</li>
        <li><strong>Phase 5 &mdash; Verification:</strong> Ping all next-hops, traceroute correct path, BGP/OSPF verified, ACL tested, SNMP reachable, syslog at log server, NTP synced.</li>
        <li><strong>Phase 6 &mdash; Documentation:</strong> Config saved (startup + external SCP), version-controlled in Git, network diagram + IPAM updated, handover communication sent.</li>
      </ul>

      <h2 id="om-checklist" style={S.h2}>Preventive Maintenance aur O&amp;M Checklist</h2>
      <p style={S.p}><strong>Daily:</strong> Interface states (unexpected down?), BGP sessions (flapping?), OSPF adjacencies (all Full where expected?), CPU/memory (sustained high?), syslog review (errors, auth failures, hardware alerts).</p>
      <p style={S.p}><strong>Weekly:</strong> Config backup verified, BGP prefix count vs max-prefix limits, FIB/TCAM utilization on internet-facing routers, interface bandwidth utilization trends, DOM/DDM optical power trends, fan/PSU status.</p>
      <p style={S.p}><strong>Monthly:</strong> Security advisories (PSIRT) vs deployed NOS, NOS end-of-support dates, prefix filter currency (IRR updates), hardware EoS/EoL status.</p>
      <p style={S.p}><strong>Periodic:</strong> Config restore tested in lab (backup integrity). Recovery runbook reviewed. Credential rotation per policy. Certificate expiry check. 12-month capacity planning. FIB scale headroom for projected route growth.</p>

      <h2 id="dc-best-practices" style={S.h2}>Data Center Best Practices</h2>
      <p style={S.p}><strong>Redundancy:</strong> Minimum two border routers &mdash; different racks, different PDUs, different power feeds. Two ISPs via physically separate demarcation points. Same ISP diverse paths &ne; two ISPs.</p>
      <p style={S.p}><strong>BGP at DC edge:</strong> Never accept full BGP table without FIB capacity verification. Max-prefix all eBGP sessions. Prefix filters inbound + outbound. RPKI ROV enabled.</p>
      <p style={S.p}><strong>OSPF internal:</strong> Explicit Router ID on every router. Reference bandwidth consistent across all OSPF routers. Passive interface on non-router-facing interfaces. OSPF authentication on all adjacencies.</p>
      <p style={S.p}><strong>Change management:</strong> Pre-change backup. OOB access verified. One change at a time. Post-change: routing table verified, config saved, record closed.</p>

      {/* COMMON MISTAKES */}
      <h2 id="common-mistakes" style={S.h2}>Common Engineering Mistakes</h2>
      <Figure caption="Fig D22 &mdash; Common router engineering mistakes and prevention quick reference.">
        <CommonEngineeringMistakes />
      </Figure>
      <p style={S.p}><strong>1. Not saving config:</strong> Prevention: save immediately after every change + external backup.</p>
      <p style={S.p}><strong>2. ACL in wrong direction/interface:</strong> Prevention: trace traffic flow before applying, verify with hit counters.</p>
      <p style={S.p}><strong>3. Implicit deny blocking management:</strong> Prevention: include SSH permit first, verify from second session, maintain console access.</p>
      <p style={S.p}><strong>4. BGP next-hop-self missing on iBGP:</strong> iBGP peers can&apos;t resolve eBGP NEXT_HOP &rarr; routes in BGP table not in RIB. Prevention: configure next-hop-self on all edge iBGP sessions.</p>
      <p style={S.p}><strong>5. MTU mismatch on tunnel:</strong> Large transfers fail, ping works. Prevention: measure actual encapsulation overhead, set tunnel MTU accordingly, MSS clamping for TCP, permit ICMP Fragmentation Needed.</p>
      <p style={S.p}><strong>6. OSPF timer mismatch:</strong> Adjacency never forms. Prevention: verify HelloInterval and RouterDeadInterval match both sides.</p>
      <p style={S.p}><strong>7. Redistribution without filter:</strong> Feedback loop, routing instability. Prevention: tag + filter, unidirectional preferred, lab test first.</p>
      <p style={S.p}><strong>8. Debug left on:</strong> CPU consumed. Prevention: disable immediately after troubleshooting.</p>
      <p style={S.p}><strong>9. Wrong subnet mask on interface:</strong> Incorrect connected route. Prevention: double-check masks, verify connected route.</p>
      <p style={S.p}><strong>10. NTP not configured:</strong> Log correlation impossible. Prevention: NTP = Day-1, verify synchronization not just configuration.</p>

      {/* INTERVIEW */}
      <h2 id="interview-questions" style={S.h2}>Interview / Job Knowledge</h2>
      <h3 style={S.h3}>Fundamental Questions</h3>
      <p style={S.p}><strong>Q: Router aur switch mein fundamental difference?</strong> Switch MAC addresses ke basis pe same L2 segment mein frames forward karta hai. Router IP addresses ke basis pe different networks ke beech packets forward karta hai. Har hop pe L2 header strip + new L2 header write. IP packet end-to-end unchanged (sirf TTL/Hop Limit decrement).</p>
      <p style={S.p}><strong>Q: RIB aur FIB mein difference?</strong> RIB = control plane routing database, all sources, full detail, AD-based selection. FIB = data plane forwarding table, selected routes only, next-hop resolved, fast lookup optimized. Packets FIB use karte hain. FIB implementation platform-dependent.</p>
      <p style={S.p}><strong>Q: LPM kya hai?</strong> Forwarding-time FIB lookup &mdash; most specific matching prefix wins. /32 beats /24 beats /0. Separate from route selection (RIB best-path).</p>
      <p style={S.p}><strong>Q: Administrative Distance kya hai?</strong> Route-source preference mechanism &mdash; competing sources ke beech preference. Lower AD = more trusted. Values vendor/platform specific &mdash; not universal standard.</p>
      <h3 style={S.h3}>Protocol Questions</h3>
      <p style={S.p}><strong>Q: OSPF neighbor Full mein kyun nahi aata?</strong> Hello/Dead timer mismatch, area ID mismatch, authentication mismatch, network type mismatch, MTU mismatch (ExStart/Exchange stuck), ACL blocking OSPF multicast.</p>
      <p style={S.p}><strong>Q: DR/BDR kab elect hota hai?</strong> Multi-access networks pe (Ethernet broadcast). P2P links pe nahi. Election: highest OSPF priority (0=ineligible), tie: highest Router ID. Non-preemptive by default.</p>
      <p style={S.p}><strong>Q: iBGP aur eBGP mein difference?</strong> eBGP: different ASes, AS_PATH appended. iBGP: same AS, no AS_PATH modification, loop-prevention rule (no re-advertise without RR). Route Reflectors solve iBGP scaling.</p>
      <p style={S.p}><strong>Q: BGP session Active mein kyun stuck?</strong> TCP 179 connectivity fail. Check: route to peer, ACL blocking, MD5 key mismatch, update-source for loopback peering, ASN correct.</p>
      <p style={S.p}><strong>Q: LOCAL_PREF kya control karta hai?</strong> Outbound path selection &mdash; which exit from AS. Higher preferred. iBGP only, not sent to eBGP peers. Primary knob for engineering outbound across multiple ISPs.</p>
      <p style={S.p}><strong>Q: ECMP kaise kaam karta hai?</strong> Multiple equal-cost paths installed. Traffic via per-flow hashing &mdash; NOT round-robin. Same flow always same path. Single large TCP flow doesn&apos;t aggregate bandwidth.</p>
      <p style={S.p}><strong>Q: VRF kya hai aur VLAN se kaise alag?</strong> VRF = L3 routing isolation &mdash; separate RIB, FIB, ARP. Same IP prefix multiple VRFs mein. VLAN = L2 segmentation. Different layers, complementary.</p>
      <p style={S.p}><strong>Q: RPKI ROV kya karta hai?</strong> BGP routes ka origin AS validate karta hai via ROA. Valid/Invalid/NotFound. Operator defines policy &mdash; Invalid commonly de-preferred/rejected. NOT full AS_PATH validation (BGPsec for that, not widely deployed).</p>
      <p style={S.p}><strong>Q: Dual ISP mein inbound path control?</strong> Inbound = influence only (probabilistic): AS_PATH prepending, MED, provider communities. Outbound = fully controllable: LOCAL_PREF.</p>
      <p style={S.p}><strong>Q: BGP neighbor up but traffic nahi ja raha?</strong> BGP table check &rarr; RIB check &rarr; FIB check &rarr; policy (ACL, PBR, NAT, MTU) check. NEXT_HOP resolvable? next-hop-self configured? FIB programmed?</p>

      {/* KEY TAKEAWAYS */}
      <h2 id="key-takeaways" style={S.h2}>Key Takeaways</h2>
      <h3 style={S.h3}>Fundamentals</h3>
      <ul style={S.ul}>
        <li><strong>Router = Layer 3 forwarder.</strong> Destination IP &rarr; FIB LPM &rarr; next-hop &rarr; L2 rewrite &rarr; forward. L2 rewritten every hop. IP unchanged end-to-end (TTL/Hop Limit only).</li>
        <li><strong>Three planes.</strong> Control (OSPF/BGP/RIB) &rarr; Data (FIB/forwarding) &rarr; Management (SSH/SNMP). Transit packets never reach CPU normally. CoPP protects CPU.</li>
        <li><strong>RIB &rarr; FIB.</strong> Protocols &rarr; system RIB (AD selection) &rarr; FIB (forwarding). Route in RIB but not FIB doesn&apos;t forward traffic. FIB implementation platform-dependent.</li>
        <li><strong>LPM = forwarding-time lookup.</strong> Separate from route selection. Most specific match wins. No match + no default = ICMP Destination Unreachable.</li>
        <li><strong>Recursive next-hop.</strong> BGP NEXT_HOP must be resolvable. Most common BGP production problem: route in BGP table, not in routing table = NEXT_HOP unresolvable.</li>
        <li><strong>IPv6 NDP &ne; ARP.</strong> ICMPv6 mandatory. NS source: RFC 6724 selection rules. DAD source = :: (unspecified).</li>
        <li><strong>MTU = 1500-byte Ethernet payload</strong> (IP packet including IP header). Frame = 1518 bytes untagged. MSS, PMTUD, PLPMTUD are distinct mechanisms.</li>
      </ul>
      <h3 style={S.h3}>Protocols</h3>
      <ul style={S.ul}>
        <li><strong>OSPF: link-state IGP.</strong> LSDB &rarr; SPF &rarr; routes &rarr; RIB &rarr; FIB. LSDB &ne; routing table. Hello/Dead timers must match. Router ID explicitly configure karo. OSPFv2 (IPv4) and OSPFv3 (IPv6) distinct protocols.</li>
        <li><strong>BGP: path-vector, policy-driven.</strong> TCP port 179. iBGP loop-prevention rule. NEXT_HOP = prerequisite (not preference step). Best-path = implementation-variant. Route Reflectors for iBGP scale.</li>
        <li><strong>Route redistribution: precision tool.</strong> Never redistribute all. Always filter and tag. Seed metrics explicitly set. Bidirectional at multiple points = highest risk.</li>
        <li><strong>AD &ne; metric.</strong> AD = inter-source preference (vendor-specific). Metric = intra-protocol path cost. ECMP = equal-cost paths within one routing context.</li>
      </ul>
      <h3 style={S.h3}>Architecture and Security</h3>
      <ul style={S.ul}>
        <li><strong>VRF = L3 routing isolation.</strong> Separate RIB/FIB per VRF. VRF &ne; VLAN.</li>
        <li><strong>MPLS = label-based forwarding</strong> supporting L2 and L3 services. Not Layer 2. PHP common but not mandated. MPLS &ne; encryption.</li>
        <li><strong>DC border router:</strong> North-South gateway. East-West stays in Spine-Leaf fabric.</li>
        <li><strong>Dual ISP:</strong> LOCAL_PREF = outbound control (fully controllable). AS_PATH/MED/communities = inbound influence (probabilistic).</li>
        <li><strong>RPKI ROV = origin validation only.</strong> Operator defines policy per state. BGPsec for full AS_PATH validation.</li>
        <li><strong>CoPP / control plane protection:</strong> Rate-limits CPU-bound traffic. Without it: DoS &rarr; routing protocol failure.</li>
        <li><strong>NSF/SSO/GR all platform/NOS/version dependent.</strong> Aggressive BFD can defeat GR &mdash; design carefully.</li>
      </ul>
      <h3 style={S.h3}>Operations</h3>
      <ul style={S.ul}>
        <li><strong>Save configuration.</strong> After every change, immediately.</li>
        <li><strong>NTP = Day-1.</strong> Verify synchronization, not just configuration.</li>
        <li><strong>OOB management always maintained.</strong> Console server or dedicated OOB.</li>
        <li><strong>Troubleshoot systematically.</strong> Physical &rarr; L2 &rarr; L3 addressing &rarr; neighbor resolution &rarr; routing &rarr; RIB &rarr; FIB &rarr; policy &rarr; NAT &rarr; MTU &rarr; application. Evidence first, changes second.</li>
        <li><strong>Monitor FIB utilization</strong> on internet-facing routers. Resource exhaustion behavior: vendor/platform dependent. Monitor both resource utilization and route-programming failures.</li>
      </ul>

      {/* GLOSSARY */}
      <h2 id="glossary" style={S.h2}>Glossary &amp; Abbreviations</h2>
      <p style={S.p}>The complete glossary contains comprehensive definitions of the networking protocols, standards, acronyms, hardware components and enterprise networking terminology used throughout the Enterprise Router article.</p>

      <h3 style={S.h3}>Group A &mdash; Networking Fundamentals</h3>
      <ComparisonTable title="" headers={["Term","Full Form","Definition"]}
        rows={[
          ["ARP","Address Resolution Protocol","IPv4 protocol (RFC 826) resolving IP addresses to MAC addresses. Router maintains ARP cache for next-hop MAC resolution. ARP Request = broadcast; ARP Reply = unicast. IPv6 uses NDP instead &mdash; not ARP."],
          ["AS","Autonomous System","Collection of IP prefixes under common administrative control with unified routing policy. BGP routes between ASes; IGPs route within an AS."],
          ["ASN","Autonomous System Number","Numerical AS identifier. 16-bit (1&ndash;65535) and 32-bit (up to 4294967295). Private ASNs (64512&ndash;65535 for 16-bit) used internally."],
          ["CIDR","Classless Inter-Domain Routing","IP addressing using variable-length prefix notation (e.g., 192.168.1.0/24). Enables efficient allocation and route summarization."],
          ["ECMP","Equal Cost Multi-Path","Multiple equal-cost paths installed simultaneously. Traffic distributed via per-flow hashing &mdash; not round-robin per packet. Hash algorithm and inputs are platform dependent."],
          ["FCS","Frame Check Sequence","4-byte CRC appended to Ethernet frames. Checked on ingress for corruption detection. Router recalculates FCS on egress after L2 header rewrite."],
          ["FIB","Forwarding Information Base","Data plane forwarding table. Derived from selected routes in RIB. Implementation varies &mdash; hardware TCAM, software table, or hybrid &mdash; platform dependent. Packets use FIB, not RIB."],
          ["IGP","Interior Gateway Protocol","Routing protocol within an autonomous system. Examples: OSPF, IS-IS."],
          ["EGP","Exterior Gateway Protocol","Routing protocol between autonomous systems. BGP is the only widely deployed EGP today."],
          ["IP","Internet Protocol","Layer-3 network protocol. IPv4 (RFC 791): 32-bit addresses. IPv6 (RFC 8200): 128-bit addresses."],
          ["IPv4","Internet Protocol version 4","32-bit addressed IP. Standard for most enterprise networks."],
          ["IPv6","Internet Protocol version 6","128-bit addressed IP. Uses NDP instead of ARP. No header checksum field (unlike IPv4)."],
          ["LAN","Local Area Network","Network within a limited geographic area. Routers connect LANs to each other and to WANs."],
          ["LPM","Longest Prefix Match","Forwarding-time FIB lookup rule: most specific matching prefix wins. Distinct from route selection (RIB best-path process)."],
          ["MAC","Media Access Control","Layer-2 hardware address (48-bit EUI-48 for Ethernet). Routers rewrite Src and Dst MAC at each hop. L2 framing is hop-local."],
          ["MTU","Maximum Transmission Unit","Ethernet MTU = 1500 bytes &mdash; Ethernet payload capacity for IP packet (including IP header). Frame = 1518 bytes untagged (14B header + 1500B payload + 4B FCS). 1500-byte MTU does not mean 1500 bytes of application payload."],
          ["NAT","Network Address Translation","IP address translation mechanism &mdash; not a security feature. Extends IPv4 address space. NAT processing order relative to ACL/routing: platform dependent."],
          ["NDP","Neighbor Discovery Protocol","IPv6 protocol (RFC 4861) &mdash; NOT the same as ARP. NS/NA for address resolution, RS/RA for router discovery, SLAAC, DAD. Uses ICMPv6. Cannot block wholesale without breaking IPv6."],
          ["PAT","Port Address Translation","NAT variant (NAT Overload/NAPT). Multiple private hosts share one public IP via source port differentiation."],
          ["QoS","Quality of Service","Traffic management &mdash; classification, marking, queuing, scheduling, policing, shaping."],
          ["RIB","Routing Information Base","System-level routing table. Receives candidate routes from routing protocols (after their internal selection) and static/connected sources. AD/preference-based source selection. Programs selected forwarding information into FIB."],
          ["SLA","Service Level Agreement","Contracted performance guarantee between service provider and customer."],
          ["TTL","Time to Live","8-bit field in IPv4 header, decremented each router hop. 0 = drop + ICMP Time Exceeded to source. IPv6 equivalent = Hop Limit."],
          ["WAN","Wide Area Network","Network spanning large geographic areas. Routers deployed at WAN edges."],
        ]} caption="" />

      <h3 style={S.h3}>Group B &mdash; IP Addressing and Routing Protocols</h3>
      <ComparisonTable title="" headers={["Term","Full Form","Definition"]}
        rows={[
          ["ABR","Area Border Router","OSPF router with interfaces in multiple areas including Area 0. Generates Type-3 Summary LSAs. Can perform inter-area summarization."],
          ["AD","Administrative Distance","Route-source preference value &mdash; lower AD = more preferred source. Vendor/platform specific values &mdash; not a universal standard. AD &ne; routing metric."],
          ["AS_PATH","AS Path attribute","BGP well-known mandatory attribute listing ASes a route has traversed. Loop prevention (router rejects routes with own ASN). Shorter commonly preferred."],
          ["ASBR","AS Boundary Router","OSPF router redistributing routes from outside OSPF domain as Type-5 External LSAs."],
          ["BGP","Border Gateway Protocol","Inter-domain routing protocol (RFC 4271). Path-vector, TCP port 179. Policy-driven."],
          ["BFD","Bidirectional Forwarding Detection","Failure detection protocol (RFC 5880) &mdash; NOT a routing protocol. Detects forwarding-path failure. Detection time depends on configured timers and platform &mdash; not a guaranteed universal figure."],
          ["CE","Customer Edge","In MPLS L3VPN, customer router connecting to provider PE. No MPLS awareness needed."],
          ["DMVPN","Dynamic Multipoint VPN","Cisco-proprietary VPN architecture using GRE, mGRE, and NHRP. Not a multi-vendor standard."],
          ["DR","Designated Router","On OSPF multi-access (broadcast) segments &mdash; elected router for all Full adjacencies. Highest OSPF priority (0=ineligible), then highest Router ID. Non-preemptive by default."],
          ["BDR","Backup Designated Router","OSPF router monitoring DR, ready to take over. Full adjacency with all OSPF routers on segment."],
          ["eBGP","External BGP","BGP session between routers in different ASes. AS_PATH appended at boundaries. Commonly directly connected. Multihop requires explicit configuration. eBGP TTL default behavior is platform-specific &mdash; not a universal BGP protocol requirement."],
          ["EUI-64","Extended Unique Identifier 64-bit","Historical IPv6 IID generation from MAC address &mdash; privacy concern. Modern OS use stable/private IID methods instead."],
          ["FHRP","First Hop Redundancy Protocol","Category of protocols for virtual gateway redundancy. VRRP (IETF standard), HSRP (Cisco proprietary), GLBP (Cisco proprietary)."],
          ["GR","Graceful Restart","Routing-protocol-level mechanism allowing restarting router to signal neighbors to retain routing state. Requires both restarting and helper support. Distinct from NSF."],
          ["GRE","Generic Routing Encapsulation","Encapsulation protocol (RFC 2784). Minimum overhead: 24 bytes (4B GRE + 20B outer IPv4)."],
          ["GLBP","Gateway Load Balancing Protocol","Cisco-proprietary FHRP for active-active gateway redundancy. Not an open standard."],
          ["HSRP","Hot Standby Router Protocol","Cisco-proprietary FHRP (NOT an open standard). Active/Standby. Preemption disabled by default. Not interoperable with non-Cisco as FHRP peer."],
          ["iBGP","Internal BGP","BGP session within same AS. No AS_PATH modification. Loop-prevention rule: iBGP-learned routes not re-advertised to other iBGP peers (without RR/confederation)."],
          ["IID","Interface Identifier","Host portion of IPv6 address (lower 64 bits). Generated via EUI-64 (historical), randomly, or explicitly configured. OS and configuration dependent."],
          ["IS-IS","Intermediate System to Intermediate System","Link-state IGP (ISO 10589, RFC 5308 for IPv6). Level-1/Level-2 hierarchy. Runs via own L2 encapsulation &mdash; not over IP."],
          ["LDP","Label Distribution Protocol","MPLS signaling protocol &mdash; one option for LSP establishment. Not universally required; Segment Routing is a growing alternative."],
          ["LOCAL_PREF","Local Preference","Well-known discretionary BGP attribute. Higher preferred. iBGP only. Primary outbound path control mechanism."],
          ["LER","Label Edge Router","MPLS edge router. Ingress LER pushes labels; egress LER pops labels."],
          ["LSA","Link State Advertisement","OSPF information unit describing local topology. Different types (1&ndash;7+) carry different information."],
          ["LSDB","Link State Database","OSPF topology database &mdash; all LSAs within an area. LSDB &ne; routing table."],
          ["LSP","Label Switched Path","End-to-end unidirectional path through MPLS network."],
          ["LSR","Label Switch Router","Transit MPLS router performing label swap. Does not examine IP header for forwarding."],
          ["MED","Multi-Exit Discriminator","Optional non-transitive BGP attribute. Lower generally preferred. Comparison scope is implementation and configuration dependent."],
          ["MPLS","Multi-Protocol Label Switching","Label-based forwarding architecture supporting L2 and L3 services. NOT simply Layer 2. MPLS &ne; encryption. LDP not universally required."],
          ["MSS","Maximum Segment Size","TCP option for maximum payload size. MSS clamping at WAN/tunnel interfaces. Affects TCP only &mdash; NOT itself PLPMTUD."],
          ["MP-BGP","Multiprotocol BGP","BGP extended (RFC 4760) to carry multiple address families &mdash; IPv4, IPv6, VPNv4, VPNv6, EVPN."],
          ["NHRP","Next Hop Resolution Protocol","Used in DMVPN to enable spoke-to-spoke dynamic tunnel establishment. Cisco-proprietary context."],
          ["NSF","Non-Stop Forwarding","Local mechanism for data-plane continuity during control-plane disruption. Does not require neighbor support (unlike GR). Operates on potentially stale FIB. Platform dependent."],
          ["OSPF","Open Shortest Path First","Link-state IGP. OSPFv2 (RFC 2328): IPv4. OSPFv3 (RFC 5340): IPv6. LSDB &rarr; SPF &rarr; routes &rarr; RIB &rarr; FIB."],
          ["PBR","Policy-Based Routing","Routing decisions beyond destination IP &mdash; source, protocol, port, DSCP. Overrides normal FIB forwarding for matching traffic. Performance impact and implementation: platform dependent."],
          ["PE","Provider Edge","In MPLS L3VPN, provider router connecting to CE. Maintains per-customer VRFs. Exchanges routes via MP-BGP. MPLS-capable."],
          ["PHP","Penultimate Hop Popping","MPLS optimization &mdash; second-to-last LSR pops transport label. Common but not universally mandated."],
          ["PLPMTUD","Packetization Layer Path MTU Discovery","Path MTU discovery at transport/packetization layer (RFC 8899) &mdash; without relying solely on ICMP. Distinct from TCP MSS negotiation."],
          ["PMTUD","Path MTU Discovery","IPv4: ICMP Fragmentation Needed (RFC 1191). IPv6: ICMPv6 Packet Too Big (RFC 8201). Black Hole if these ICMP messages filtered. IPv6 nodes not required to implement traditional PMTUD."],
          ["RD","Route Distinguisher","8-byte value in MPLS L3VPN creating unique VPNv4/VPNv6 routes in MP-BGP. Prevents IP overlap conflicts."],
          ["ROA","Route Origin Authorization","Cryptographically signed statement in RPKI associating IP prefix with authorized originating AS."],
          ["ROV","Route Origin Validation","Checks BGP routes against RPKI ROA: Valid, Invalid, or NotFound. Validates origin AS only &mdash; not AS_PATH. Operator defines routing policy per state."],
          ["RPKI","Resource Public Key Infrastructure","Framework cryptographically associating IP address blocks and ASNs with legitimate holders. Used for ROV. Does not validate AS_PATH."],
          ["RSVP-TE","Resource Reservation Protocol &mdash; Traffic Engineering","Signaling for MPLS LSPs with explicit path and bandwidth reservation. Segment Routing is an increasingly common alternative."],
          ["RT","Route Target","BGP extended community in MPLS L3VPN controlling VRF import/export policy."],
          ["RR","Route Reflector","iBGP router reflecting iBGP-learned routes to clients &mdash; eliminates full-mesh. Loop prevention: ORIGINATOR_ID + CLUSTER_LIST."],
          ["SLAAC","Stateless Address Autoconfiguration","IPv6 host self-generates address from RA prefix. IID: random/stable-private (modern OS) or EUI-64 (historical). Method is OS and configuration dependent."],
          ["SPF","Shortest Path First","Dijkstra algorithm run by OSPF/IS-IS on local topology database. Each router runs independently. Output = best routes &rarr; system RIB."],
          ["SR","Segment Routing","Source routing architecture encoding path as segment identifier stack. SR-MPLS or SRv6. Growing LDP/RSVP-TE alternative."],
          ["SSO","Stateful Switchover","On dual-supervisor platforms: standby maintains synchronized state, takes over with minimal disruption. Platform/NOS/version dependent."],
          ["VPN","Virtual Private Network","Logically private network over shared/public infrastructure. Provider-managed (MPLS L3VPN) or customer-managed overlay (IPsec, GRE/IPsec, SD-WAN)."],
          ["VRRP","Virtual Router Redundancy Protocol","IETF standard FHRP. VRRPv2 (RFC 3768): IPv4. VRRPv3 (RFC 5798): IPv4+IPv6. Master/Backup. Virtual MAC IPv4 = 00:00:5E:00:01:{VRID}, IPv6 = 00:00:5E:00:02:{VRID}. Preemption enabled by default. Multi-vendor interoperable."],
          ["VRF","Virtual Routing and Forwarding","Independent L3 routing context &mdash; own RIB, FIB, ARP/ND tables. Multiple VRFs on one router with complete isolation. VRF &ne; VLAN."],
          ["VXLAN","Virtual Extensible LAN","Overlay encapsulation (RFC 7348) &mdash; encapsulates Ethernet frames in UDP/IP. Used with EVPN in DC fabrics."],
        ]} caption="" />

      <h3 style={S.h3}>Group C &mdash; Protocols, Standards and RFCs</h3>
      <ComparisonTable title="" headers={["Term","Full Form","Definition"]}
        rows={[
          ["ACL","Access Control List","Ordered permit/deny rules on router interfaces. Standard/Extended ACL = Cisco IOS terminology. Stateless by default. Implicit deny at end: Cisco IOS convention &mdash; not universal."],
          ["ALG","Application Layer Gateway","Inspects and rewrites application-layer payload for protocols embedding IP addresses (FTP, SIP). Cannot function on encrypted payloads."],
          ["DHCP","Dynamic Host Configuration Protocol","Automatic IP assignment. DHCPv4 (RFC 2131): client sends limited broadcast. Relay agent sets giaddr field. DHCPv6 (RFC 8415): different relay mechanism &mdash; link-address field in Relay-forward header."],
          ["DNS","Domain Name System","Resolves hostnames to IP addresses. Routers use DNS for their own management operations."],
          ["ESP","Encapsulating Security Payload","IPsec protocol (RFC 4303): confidentiality + integrity. Tunnel mode for site-to-site VPN. AH rarely used in modern deployments."],
          ["EVPN","Ethernet VPN","BGP-based control plane for L2/L3 service delivery. Uses MP-BGP. Used with VXLAN in DC fabrics."],
          ["ICMP","Internet Control Message Protocol","Diagnostic and error protocol for IPv4 (RFC 792). Ping, traceroute, PMTUD. Error generation not guaranteed for every dropped packet."],
          ["ICMPv6","Internet Control Message Protocol v6","IPv6 diagnostic, error, and signaling protocol (RFC 4443). Mandatory for IPv6 &mdash; carries NDP, MLD, error messages. Cannot block wholesale."],
          ["IKE","Internet Key Exchange","IPsec SA negotiation. IKEv2 (RFC 7296) is current standard. IKEv2 flow: IKE_SA_INIT &rarr; IKE_AUTH &rarr; IKE SA &rarr; CHILD SA. Do NOT use IKEv1 Phase 1/Phase 2 terminology for IKEv2."],
          ["IPsec","Internet Protocol Security","Suite for authentication and encryption. IKEv2 + ESP. Tunnel mode for site-to-site VPN. Overhead: ~50-70+ bytes depending on cipher suite."],
          ["IRR","Internet Routing Registry","Databases where operators register routing policies and prefix ownership. Used to generate BGP prefix-filter policies."],
          ["MD5","Message Digest 5","Used in OSPF Type 2 auth and BGP TCP session protection (RFC 2385). Not recommended for new deployments where stronger alternatives available."],
          ["MLD","Multicast Listener Discovery","IPv6 multicast host membership protocol (ICMPv6-based). MLDv1 &asymp; IGMPv2. MLDv2 &asymp; IGMPv3."],
          ["NA","Neighbor Advertisement","IPv6 NDP message &mdash; ARP Reply equivalent. Provides link-layer address of target."],
          ["NS","Neighbor Solicitation","IPv6 NDP message &mdash; ARP Request equivalent. Source for address-resolution NS: appropriate address per RFC 6724 source-address selection rules. DAD NS source = :: (unspecified)."],
          ["NTP","Network Time Protocol","Clock synchronization (RFC 5905). Mandatory on all production routers. Stratum = topological distance &mdash; not accuracy indicator. Authentication: NTS (RFC 8915) is stronger modern mechanism."],
          ["NTS","Network Time Security","Modern authenticated NTP mechanism (RFC 8915). Platform support varies."],
          ["PPP","Point-to-Point Protocol","L2 encapsulation for serial WAN links. Legacy."],
          ["RA","Router Advertisement","IPv6 NDP message &mdash; contains link prefix, default router, MTU, M/O flags. Source: router link-local. RDNSS/DNSSL (RFC 8106) for DNS without DHCPv6."],
          ["RS","Router Solicitation","IPv6 NDP message from host requesting RA. Sent to FF02::2 (all-routers multicast)."],
          ["SSH","Secure Shell","Encrypted router management protocol. SSHv2 required. Replaces Telnet."],
          ["TACACS+","Terminal Access Controller Access-Control System Plus","AAA protocol (RFC 8907 informational, Cisco-developed). Encrypts full packet body. Not a standards-track IETF protocol."],
          ["TCP","Transmission Control Protocol","Connection-oriented transport. BGP uses TCP port 179. MSS negotiated in handshake."],
          ["TCP-AO","TCP Authentication Option","Modern TCP session authentication (RFC 5925) &mdash; stronger than RFC 2385 MD5, supports key rollover. Platform support varies."],
          ["UDP","User Datagram Protocol","Connectionless transport. PAT handles UDP differently &mdash; shorter timeouts. No MSS equivalent."],
        ]} caption="" />

      <h3 style={S.h3}>Group D &mdash; Hardware and Physical Layer</h3>
      <ComparisonTable title="" headers={["Term","Full Form","Definition"]}
        rows={[
          ["ASIC","Application Specific Integrated Circuit","Custom hardware implementing forwarding-plane operations at wire speed."],
          ["CPU","Central Processing Unit","Router general-purpose processor &mdash; control plane protocols, management, software."],
          ["DAC","Direct Attach Copper","Twinax copper cable with integrated transceivers. Low latency/cost for short range."],
          ["DDM","Digital Diagnostics Monitoring","Transceiver real-time health reporting: TX/RX power, temperature, voltage, bias current. Synonym of DOM."],
          ["DOM","Digital Optical Monitoring","Transceiver real-time health via EEPROM. TX power, RX power, temperature, voltage, bias current."],
          ["GBIC","Gigabit Interface Converter","Legacy large-form-factor transceiver. Largely replaced by SFP."],
          ["MMF","Multi-Mode Fiber","Fiber with larger core (50&mu;m or 62.5&mu;m). Shorter range than SMF. OM3/OM4 in DC."],
          ["NPU","Network Processing Unit","Programmable packet-processing hardware for forwarding plane. More flexible than fixed-function ASIC."],
          ["PSU","Power Supply Unit","Router power supply. Production: dual PSU, separate circuits and UPS."],
          ["QSFP","Quad Small Form-factor Pluggable","High-density transceiver. QSFP+: 40G. QSFP28: 100G. QSFP-DD: 200G/400G."],
          ["SFP","Small Form-factor Pluggable","Compact transceiver family. SFP: 1G. SFP+: 10G. SFP28: 25G. Hot-swappable."],
          ["SMF","Single-Mode Fiber","Fiber with 9&mu;m core. Long range (10km to 80km+). OS2 yellow jacket standard."],
        ]} caption="" />

      <h3 style={S.h3}>Group E &mdash; Routing and Network Architecture</h3>
      <ComparisonTable title="" headers={["Term","Full Form","Definition"]}
        rows={[
          ["AAA","Authentication, Authorization, Accounting","Framework for router management security. Implemented via TACACS+ or RADIUS."],
          ["BGPsec","BGP Security","BGP extension (RFC 8205) for cryptographic AS_PATH validation. Not widely deployed. RPKI ROV validates origin AS only; BGPsec validates full path."],
          ["CoPP","Control Plane Policing","Cisco terminology for CPU-bound traffic rate-limiting. Equivalent on other platforms under different names. Does not affect transit data-plane forwarding."],
          ["DC","Data Center","Facility housing compute, storage, and networking. DC border routers handle North-South. East-West stays within DC fabric."],
          ["DSCP","Differentiated Services Code Point","6-bit field in IP header DS byte. EF (46) for voice. AF classes for assured forwarding. CS0 = best effort default."],
          ["DMZ","Demilitarized Zone","Network segment between internet (untrusted) and internal network (trusted)."],
          ["EoR","End-of-RIB","In BGP Graceful Restart (RFC 4724) &mdash; marker UPDATE message after peer finishes advertising initial route set."],
          ["GTSM","Generalized TTL Security Mechanism","RFC 5082. Uses TTL/Hop-Limit 255 for transmitted packets with receive-side validation. Relevant to eBGP session security."],
          ["HA","High Availability","System design eliminating single points of failure. All HA mechanisms are platform/NOS/version dependent."],
          ["ISP","Internet Service Provider","Provider of internet connectivity. Enterprise routers peer with ISPs via eBGP."],
          ["L3VPN","Layer-3 Virtual Private Network","Provider-managed WAN using MPLS. Customer routes in VRFs on PE + MP-BGP. CE doesn't need MPLS awareness."],
          ["OOB","Out-of-Band","Management network separate from production. Critical for incident response and maintenance."],
          ["PSIRT","Product Security Incident Response Team","Vendor teams managing security vulnerability disclosure. Monitor for deployed NOS versions."],
          ["RADIUS","Remote Authentication Dial-In User Service","IETF standard (RFC 2865) AAA. Encrypts only password field."],
          ["SD-WAN","Software-Defined WAN","Overlay architecture abstracting WAN underlay. Each vendor has proprietary architecture."],
          ["SIEM","Security Information and Event Management","Platform aggregating and correlating security events from router syslog and other sources."],
          ["SVI","Switch Virtual Interface","Logical Layer-3 interface on platforms supporting L2+L3 switching. VLAN-associated gateway. SVI &ne; subinterface &ne; routed port."],
          ["TCAM","Ternary Content Addressable Memory","Hardware memory for three-state matching (0, 1, X). Used for FIB, ACL, and policy lookups at wire speed. Finite &mdash; exhaustion behavior is vendor/platform dependent."],
        ]} caption="" />

      <h3 style={S.h3}>Group F &mdash; Operations and Management</h3>
      <ComparisonTable title="" headers={["Term","Full Form","Definition"]}
        rows={[
          ["API","Application Programming Interface","Programmatic interface for router configuration and telemetry. REST, NETCONF/RESTCONF, gNMI."],
          ["BGP-FS","BGP Flow Specification","BGP extension (RFC 8955) distributing DDoS mitigation and traffic filtering rules via BGP UPDATE messages."],
          ["CLI","Command Line Interface","Primary router management interface. SSH-based. Syntax varies by vendor and NOS."],
          ["gNMI","gRPC Network Management Interface","Open standard for network management and streaming telemetry. Uses gRPC. Platform support and data paths vary."],
          ["gRPC","gRPC Remote Procedure Call","Open-source RPC framework typically running over HTTP/2. Underlying transport for gNMI. Not simply a transport layer."],
          ["IPAM","IP Address Management","System tracking IP address allocations, router loopbacks, interface IPs, VRF subnets."],
          ["ISSU","In-Service Software Upgrade","Non-disruptive NOS upgrade on dual-supervisor platforms. Platform/NOS/version/upgrade-path dependent."],
          ["MIB","Management Information Base","Database of manageable SNMP objects. Each identified by OID. Standard MIBs: IF-MIB, IP-MIB, BGP4-MIB, OSPF-MIB."],
          ["NETCONF","Network Configuration Protocol","IETF protocol (RFC 6241) for structured configuration/state management via YANG. NOT synonymous with streaming telemetry."],
          ["NMS","Network Management System","Platform for SNMP polling, trap reception, performance visualization, and alerting."],
          ["NOS","Network Operating System","Software platform on router. Cisco IOS-XE, IOS-XR, NX-OS, Juniper Junos, Arista EOS, Aruba AOS-CX, Dell OS10, SONiC."],
          ["OID","Object Identifier","Hierarchical numeric identifier for a specific MIB object. Used in SNMP operations."],
          ["OSI","Open Systems Interconnection","7-layer reference model. Routers primarily at Layer 3. OSI-layer troubleshooting sequence is fundamental."],
          ["PTP","Precision Time Protocol","IEEE 1588 &mdash; high-precision time synchronization. Achievable accuracy depends on topology, hardware timestamping, implementation &mdash; not a guaranteed universal figure."],
          ["RIR","Regional Internet Registry","IP address allocation organizations (ARIN, RIPE NCC, APNIC, LACNIC, AFRINIC). RPKI ROAs signed via RIR certificate hierarchy."],
          ["REST","Representational State Transfer","Architectural style for web service APIs. RESTCONF (RFC 8040) for YANG-modeled device data."],
          ["SCP","Secure Copy Protocol","SSH-based encrypted file transfer. Preferred for router config backup and NOS image transfer."],
          ["SNMP","Simple Network Management Protocol","Industry-standard monitoring. SNMPv3 with authPriv required for new deployments. TRAP = unacknowledged (can be lost); INFORM = acknowledged."],
          ["TFTP","Trivial File Transfer Protocol","Simple UDP-based file transfer &mdash; no auth, no encryption. Use SCP for production."],
          ["USM","User-based Security Model","SNMPv3 security model (RFC 3414). Originally defines HMAC-MD5-96 and HMAC-SHA-96 auth; AES privacy in RFC 3826. MD5 and DES not recommended where stronger alternatives available."],
          ["YANG","Yet Another Next Generation","Data modeling language (RFC 6020, RFC 7950) for network device configuration and state. Used with NETCONF, RESTCONF, gNMI."],
        ]} caption="" />

      <h3 style={S.h3}>Group G &mdash; Security</h3>
      <ComparisonTable title="" headers={["Term","Full Form","Definition"]}
        rows={[
          ["AH","Authentication Header","IPsec protocol (RFC 4302): integrity and authentication without encryption. Rarely used in modern deployments &mdash; ESP provides both auth and encryption."],
          ["GTSM","Generalized TTL Security Mechanism","(See Group E &mdash; full definition there.)"],
          ["MD5","Message Digest 5","(See Group C &mdash; full definition there.)"],
          ["PKI","Public Key Infrastructure","Framework for certificate issuance, management, and validation. RPKI is the Internet routing-specific PKI."],
          ["RPKI","Resource Public Key Infrastructure","(See Group B &mdash; full definition there.)"],
          ["ROA","Route Origin Authorization","(See Group B &mdash; full definition there.)"],
          ["TCP-AO","TCP Authentication Option","(See Group C &mdash; full definition there.)"],
        ]} caption="" />

      <h3 style={S.h3}>Group H &mdash; Monitoring and Telemetry</h3>
      <ComparisonTable title="" headers={["Term","Full Form","Definition"]}
        rows={[
          ["INFORM","&mdash;","SNMP acknowledged notification &mdash; NMS sends acknowledgment upon receipt. More reliable than TRAP for critical state. Traps can be silently lost."],
          ["TRAP","&mdash;","SNMP unacknowledged notification sent by SNMP agent to NMS. Fire-and-forget &mdash; can be lost. Complement with polling or INFORM for critical events."],
        ]} caption="" />

      {/* FAQ */}
      <div style={{ marginTop:"3rem", borderTop:"2px solid #e5e7eb", paddingTop:"2rem" }}>
        <h2 style={S.h2}>Frequently Asked Questions</h2>
        {faqs.map((faq, idx) => (
          <details key={idx} style={{ marginBottom:"1rem", border:"1px solid #e5e7eb", borderRadius:8, padding:"0.8rem 1rem" }}>
            <summary style={{ fontWeight:600, fontSize:"1rem", cursor:"pointer", color:"#1f2937" }}>{faq.q}</summary>
            <p style={{ ...S.p, marginTop:"0.75rem", marginBottom:0 }}>{faq.a}</p>
          </details>
        ))}
      </div>
    </>
  );
}
