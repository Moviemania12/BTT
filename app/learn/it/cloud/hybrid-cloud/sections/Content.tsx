"use client";

import { Callout, ComparisonTable, Figure, S } from "../shared";
import TopicLink from "@/components/TopicLink";
import { hybridCloudContent } from "@/content/hybrid-cloud";

import HybridCloudArchitectureDiagram from "../svg/HybridCloudArchitectureDiagram";
import HybridNetworkDiagram from "../svg/HybridNetworkDiagram";
import IdentityFederationDiagram from "../svg/IdentityFederationDiagram";
import StorageSyncDiagram from "../svg/StorageSyncDiagram";
import DisasterRecoveryDiagram from "../svg/DisasterRecoveryDiagram";
import HybridSecurityDiagram from "../svg/HybridSecurityDiagram";
import MigrationStrategyDiagram from "../svg/MigrationStrategyDiagram";
import OperationsMonitoringDiagram from "../svg/OperationsMonitoringDiagram";
import HybridVsMultiCloudDiagram from "../svg/HybridVsMultiCloudDiagram";

export default function Content() {
  return (
    <article>

      {/* ─── QUICK SUMMARY ────────────────────────────────────────────────── */}
      <section id="quick-summary">
        <h2 style={S.h2}>Quick Summary</h2>
        <p style={S.p}>
          Hybrid Cloud ka matlab hai on-premises data center aur public cloud ka ek coordinated, integrated architecture — dono milke ek system ki tarah kaam karte hain. Sirf cloud resources add karna hybrid cloud nahi banata; integration chahiye: shared network (VPN ya Interconnect), shared identity (AD Federation), unified monitoring, aur workloads jo dono environments mein seamlessly operate kar sakein.
        </p>
        <p style={S.p}>
          Yeh article DC engineer ke liye practical reference hai — not theory. Network design se leke identity federation, disaster recovery patterns se leke migration strategies, VMware hybrid se leke Kubernetes across environments. Har topic mein: kya hai, kyu chahiye, kaise implement karo, aur production mein kya galat ho sakta hai.
        </p>
        <Callout type="important" title="Hybrid Cloud ki Real Engineering Reality">
          90% enterprises already hybrid cloud mein hain — chahe deliberately plan kiya ho ya nahi. On-prem AD + Office 365 = hybrid identity. On-prem database + cloud application = hybrid data architecture. Hybrid cloud ek state hai jo phased cloud adoption mein automatically aata hai. Iska proper engineering karna — connectivity, security, identity, DR — woh cheez hai jo article teach karta hai.
        </Callout>
      </section>

      {/* ─── WHAT IS HYBRID CLOUD ─────────────────────────────────────────── */}
      <section id="what-is-hybrid-cloud">
        <h2 style={S.h2}>What Is Hybrid Cloud?</h2>
        <p style={S.p}>
          Hybrid Cloud ek architecture hai jisme on-premises private infrastructure aur public cloud services (AWS, Azure, GCP) ek integrated system ke roop mein kaam karte hain. Integration ka matlab hai shared network connectivity, unified identity, combined monitoring aur workloads jo boundaries cross kar sakein.
        </p>
        <p style={S.p}>
          Simple example: Mumbai mein ek bank ka on-prem data center jisme core banking system hai, aur Azure pe customer-facing web application — dono ExpressRoute se connected, Active Directory se shared identity, Azure Monitor se unified monitoring. Yeh hybrid cloud hai.
        </p>

        <section id="hybrid-vs-multicloud">
          <h3 style={S.h3}>Hybrid vs Multi-Cloud vs Private Cloud</h3>
          <ComparisonTable
            headers={["Architecture", "Definition", "Key Characteristic", "Best For"]}
            rows={[
              ["Private Cloud", "Dedicated infra, single tenant (on-prem ya hosted)", "Full control, no shared hardware", "Regulated sectors, classified data"],
              ["Public Cloud", "Shared AWS/Azure/GCP infrastructure", "Elastic, pay-as-you-go, no CapEx", "Cloud-native startups, variable workloads"],
              ["Hybrid Cloud", "On-prem + public cloud, integrated", "Workloads span environments seamlessly", "Most enterprises in cloud journey"],
              ["Multi-Cloud", "Multiple public clouds simultaneously", "AWS + Azure, or AWS + GCP", "Best-of-breed services, vendor lock-in avoidance"],
              ["Hybrid-Multi-Cloud", "On-prem + multiple public clouds", "Maximum flexibility, maximum complexity", "Large enterprises, global organizations"],
            ]}
          />
          <Callout type="important" title="Hybrid ≠ Multi-Cloud — Alag Concepts Hain">
            Hybrid Cloud on-prem ke baare mein hai. Multi-Cloud multiple public clouds ke baare mein hai. Dono simultaneously ho sakte hain. Bank jo on-prem core banking + AWS compute + Azure Active Directory use karta hai — woh hybrid aur multi-cloud dono hai. Dono ke alag engineering challenges hain.
          </Callout>
        </section>

        <Figure caption="Hybrid Cloud vs Multi-Cloud vs Private Cloud — decision guide for enterprise architects">
          <HybridVsMultiCloudDiagram />
        </Figure>

        <section id="why-hybrid-cloud">
          <h3 style={S.h3}>Why Hybrid Cloud — Real Engineering Reasons</h3>
          <p style={S.p}>
            "Cloud pe sab kuch migrate karo" — yeh advice sunne mein simple lagti hai lekin reality different hai. Production mein hybrid cloud isliye exist karta hai:
          </p>
          <ul style={S.ul}>
            <li><strong>Data Residency aur Regulatory Compliance:</strong> RBI guidelines, HIPAA, GDPR — specific data on-prem ya specific geography mein rakhna mandatory hota hai. Core banking data India mein rakhna RBI mandate hai — processing cloud pe ho sakti hai, data nahi ja sakta.</li>
            <li><strong>Legacy Applications:</strong> 20 saal purani mainframe application cloud-ready nahi hai. Refactor cost millions of hours. Hybrid architecture mein woh on-prem rahti hai while modern workloads cloud pe jaate hain.</li>
            <li><strong>Investment Protection:</strong> Company ne abhi 3 saal pehle Rs. 50 crore ka data center hardware kharida. Usse abandon karna CFO nahi manega. Cloud gradually adopt karo jaise hardware expires.</li>
            <li><strong>Performance Requirements:</strong> On-prem database se 1ms latency chahiye. Cloud pe same region mein bhi 5-10ms add hoti hai. Ultra-low latency workloads on-prem pe better perform karte hain.</li>
            <li><strong>Cost Optimization:</strong> Predictable baseline workloads on-prem pe cheaper hain (CapEx after 3 years), variable/burst workloads cloud pe — hybrid dono worlds ka best deta hai.</li>
          </ul>
        </section>

        <section id="data-gravity">
          <h3 style={S.h3}>Data Gravity — The Hidden Force</h3>
          <p style={S.p}>
            Data Gravity ek concept hai: jitna bada dataset hota hai, utna zyada woh apni location pe services attract karta hai. Large data move karna expensive hai (egress cost + time + bandwidth), isliye compute data ke paas jaata hai — data compute ke paas nahi.
          </p>
          <p style={S.p}>
            Practical example: ek retail company ka 500TB transactional database on-prem pe hai. Yeh data cloud mein move karne mein weeks lagenge aur Rs. 30+ lakh egress cost aayegi. Isliye analytics workloads bhi on-prem pe chalti hain — cloud pe sirf woh workloads jaate hain jahan naya data cloud mein generate hota hai.
          </p>
          <Callout type="warning" title="Data Gravity Hybrid Architecture Ko Drive Karta Hai">
            Cloud migration projects mein sabse bada underestimated factor data gravity hai. 100TB data move = approximately $8,000 egress cost at $0.08/GB. Plus time. Plus application downtime. Data gravity ke against fight karne ki bajay, data ke paas compute layer move karo — cloud bursting pattern.
          </Callout>
        </section>

        <section id="cloud-bursting">
          <h3 style={S.h3}>Cloud Bursting</h3>
          <p style={S.p}>
            Cloud Bursting = normal load on-prem handle karo, peak load cloud pe overflow karo. Pattern: on-prem 80% capacity tak handle kare, 80%+ cloud pe additional compute spin up ho.
          </p>
          <p style={S.p}>
            Real example: Income tax filing deadline — tax software company March mein 10x traffic dekhti hai. Year round on-prem infra maintain karna over-provisioning hai. Solution: baseline capacity on-prem, March mein cloud bursting via AWS Auto Scaling Groups jo VPN se on-prem database ko access kare.
          </p>
          <ul style={S.ul}>
            <li><strong>Requirements for Cloud Bursting:</strong> Low-latency connectivity (VPN minimum, Interconnect preferred), stateless application tier (state cloud pe ship karna avoid karo), shared identity, pre-built cloud templates (Terraform/Bicep ready)</li>
            <li><strong>What Cannot Burst:</strong> Stateful applications (RDBMS transaction coordinator), ultra-low latency processes, applications with on-prem hardware dependencies (FPGA, HSM)</li>
            <li><strong>Kubernetes Cloud Bursting:</strong> On-prem K8s cluster primary, cloud K8s cluster as burst target. Cluster Federation ya Virtual Kubelet se implement karo.</li>
          </ul>
        </section>

        <section id="workload-placement">
          <h3 style={S.h3}>Workload Placement Strategy</h3>
          <ComparisonTable
            headers={["Workload Type", "Recommended Placement", "Reason"]}
            rows={[
              ["Core banking / Financial ledger", "On-Prem", "Regulatory, ultra-low latency, data gravity"],
              ["Customer-facing web apps", "Public Cloud", "Elastic scaling, CDN, global reach"],
              ["ML/AI model training", "Public Cloud (GPU)", "Spot instances, TPUs/A100s on demand"],
              ["Internal ERP / HR systems", "Hybrid or SaaS", "Often moving to Workday/SAP on cloud"],
              ["Batch processing (ETL)", "Cloud Bursting", "Variable schedule, parallelizable"],
              ["Disaster Recovery target", "Public Cloud", "Pay only when needed, elastic on failover"],
              ["Compliance-sensitive PII data", "On-Prem or regulated cloud", "Data residency, audit, DPDPA compliance"],
              ["Dev/Test environments", "Public Cloud", "Ephemeral, cost savings on idle hours"],
            ]}
          />
        </section>
      </section>

      {/* ─── NETWORK DESIGN ───────────────────────────────────────────────── */}
      <section id="network-design">
        <h2 style={S.h2}>Hybrid Network Design</h2>
        <p style={S.p}>
          Hybrid network ka foundation hai on-prem private IP space aur cloud VPC/VNet — dono ek secure, low-latency link se connected. Yeh link choose karna aur design karna hybrid architecture ka most critical engineering decision hai.
        </p>

        <section id="connectivity-options">
          <h3 style={S.h3}>Connectivity Options: VPN vs Interconnect</h3>
          <ComparisonTable
            headers={["Feature", "IPsec VPN", "Dedicated Interconnect", "Partner Interconnect"]}
            rows={[
              ["Path", "Internet (encrypted)", "Private physical circuit", "Via ISP/carrier"],
              ["Bandwidth", "1–10Gbps per tunnel", "10Gbps or 100Gbps", "50Mbps–50Gbps"],
              ["Latency", "Variable (Internet)", "Consistent, low", "Medium, provider-dependent"],
              ["Encryption", "IPsec by default", "NOT encrypted by default", "NOT encrypted by default"],
              ["Setup time", "Hours", "Weeks to months", "Days to weeks"],
              ["Cost", "Lowest", "Highest", "Middle"],
              ["SLA", "99.9–99.99% (HA config)", "99.99% (dual circuits)", "99.99% (provider-dependent)"],
              ["AWS name", "Site-to-Site VPN", "AWS Direct Connect", "Direct Connect hosted"],
              ["Azure name", "VPN Gateway", "ExpressRoute Dedicated", "ExpressRoute via partner"],
              ["GCP name", "Cloud VPN (HA VPN)", "Dedicated Interconnect", "Partner Interconnect"],
            ]}
          />
        </section>

        <section id="vpn">
          <h3 style={S.h3}>IPsec VPN — Site to Cloud</h3>
          <p style={S.p}>
            VPN ek encrypted tunnel hai on-prem VPN device aur cloud VPN gateway ke beech — Internet pe travel karta hai. Simple, fast to setup, lower cost. Lekin Internet path hai isliye latency variable rehti hai aur bandwidth ceiling hoti hai.
          </p>
          <ul style={S.ul}>
            <li><strong>HA VPN:</strong> GCP HA VPN = 2 interfaces, 4 tunnels, 99.99% SLA. AWS = active-active tunnels. Azure = active-active VPN gateways. Always HA configure karo production mein.</li>
            <li><strong>BGP:</strong> Dynamic routing (BGP) prefer karo static routes ke over — on-prem routes automatically cloud mein advertise hote hain, CIDR changes propagate automatically.</li>
            <li><strong>Throughput limit:</strong> AWS VPN per-tunnel 1.25Gbps, multiple tunnels aggregate possible. Large data transfers ke liye VPN bottleneck ban sakta hai.</li>
            <li><strong>Dead Peer Detection (DPD):</strong> Always enable karo — tunnel silently fail hone pe automatic re-establishment.</li>
          </ul>
        </section>

        <section id="dedicated-interconnect">
          <h3 style={S.h3}>Direct Connect / ExpressRoute / Cloud Interconnect</h3>
          <p style={S.p}>
            Dedicated Interconnect physical private circuit hai — on-prem se cloud provider ke colocation facility (meet-me room) tak. Internet pe nahi jaata. Latency predictable aur low hoti hai. Bandwidth 10Gbps ya 100Gbps per circuit.
          </p>
          <ComparisonTable
            headers={["Feature", "AWS Direct Connect", "Azure ExpressRoute", "GCP Dedicated Interconnect"]}
            rows={[
              ["Bandwidth options", "1Gbps, 10Gbps, 100Gbps", "50Mbps–100Gbps (provider), 1–100Gbps (dedicated)", "10Gbps, 100Gbps per link"],
              ["Typical latency", "Sub-ms within region", "Sub-ms within region", "Sub-ms within region"],
              ["SLA (HA config)", "99.99% (dual connections, dual locations)", "99.95% single, 99.99% dual circuits", "99.99% (4 attachments, 2 metros)"],
              ["Encryption default", "NOT encrypted", "NOT encrypted", "NOT encrypted"],
              ["Encryption option", "IPsec over DX (MACsec on dedicated 10G+)", "IPsec over ER; MACsec on ER Direct", "IPsec over Interconnect; MACsec on Interconnect Direct"],
              ["BGP support", "Required (eBGP)", "Required (eBGP)", "Required (eBGP)"],
              ["Hosted/Partner option", "Hosted connections (50Mbps–10Gbps)", "ExpressRoute via partner providers", "Partner Interconnect (50Mbps–50Gbps)"],
              ["Failover to VPN", "BGP local-pref: DX higher, VPN lower", "BGP AS path: ER preferred, VPN fallback", "BGP MED: Interconnect preferred, VPN fallback"],
            ]}
          />
          <Callout type="warning" title="Dedicated Interconnect — Encryption Default Nahi Hai">
            AWS Direct Connect, Azure ExpressRoute, aur GCP Dedicated Interconnect — teeno by default encrypted nahi hain. Private circuit hai lekin shared carrier infrastructure se guzarta hai — eavesdropping at carrier level theoretically possible hai. Compliance (PCI-DSS, HIPAA, RBI) ke liye: IPsec over Interconnect configure karo (adds latency ~1-2ms), ya MACsec (L2 wire-speed encryption — Direct Connect dedicated 10G+, ExpressRoute Direct, aur GCP Interconnect Direct pe available). VPN + Interconnect combination = encrypted + private path + performance.
          </Callout>
          <ul style={S.ul}>
            <li><strong>HA Design — Non-negotiable for production:</strong> Minimum 2 circuits, different colocation facilities, different metro cities preferred. Single facility failure = connectivity loss with single circuit. AWS: dual DX (2 locations) + VPN backup. Azure: dual ExpressRoute circuits (2 providers or 2 peering locations). GCP: 4 VLAN attachments across 2 metros = 99.99% SLA.</li>
            <li><strong>BGP failover design:</strong> Interconnect pe higher BGP local-preference assign karo (e.g., 200) — traffic prefers Interconnect. VPN pe lower local-preference (e.g., 100) — automatic failover jab Interconnect BGP session drops. Failover time: BGP hold-timer = 90 seconds default (configure 10/30 for faster detection).</li>
            <li><strong>Bandwidth planning:</strong> Interconnect circuit dedicated bandwidth hai — traffic engineering needed. Peak traffic burst exceeds circuit capacity = packet drops (unlike Internet where ISP absorbs). Capacity planning: measure 95th percentile traffic + 30% headroom.</li>
            <li><strong>Partner/Hosted Interconnect:</strong> Dedicated physical circuit nahi — connectivity provider ke shared infrastructure se. Lower cost, faster procurement (days vs months). Bandwidth limitations. Good for: branch offices, secondary sites, lower bandwidth requirements (sub-1Gbps).</li>
          </ul>
        </section>

        <section id="sd-wan-hybrid">
          <h3 style={S.h3}>SD-WAN in Hybrid Architectures</h3>
          <p style={S.p}>
            <TopicLink slug="sd-wan" variant="inline" /> hybrid architecture mein branch offices aur on-prem sites ko cloud connect karne ke liye use hota hai. SD-WAN traditional MPLS + Internet ke upar overlay create karta hai, application-aware routing karta hai — business-critical apps best path pe, bulk transfers cheaper path pe.
          </p>
          <ul style={S.ul}>
            <li>Cloud connectivity ke saath integrate: Cisco Viptela, VMware SASE, Palo Alto Prisma SD-WAN → cloud VPN endpoints se directly connect</li>
            <li>GCP Network Connectivity Center: SD-WAN Router Appliances directly NCC hub se connect ho sakte hain</li>
            <li>Azure Virtual WAN: SD-WAN partner integrations (Barracuda, Versa, VMware) directly Virtual WAN hub se connect</li>
            <li>AWS: SD-WAN ke through TGW (Transit Gateway) se connect — centralized hub-and-spoke</li>
          </ul>
        </section>

        <section id="hybrid-dns">
          <h3 style={S.h3}>Hybrid DNS Design</h3>
          <p style={S.p}>
            DNS hybrid architecture ka unsung hero hai. On-prem resources ke liye DNS queries on-prem DNS resolve kare, cloud resources ke liye cloud DNS resolve kare — aur yeh seamlessly kaam kare dono sides se. DNS misconfiguration hybrid environments mein top-3 production issue hai.
          </p>
          <ul style={S.ul}>
            <li><strong>On-prem → Cloud DNS:</strong> On-prem DNS server (Windows DNS, BIND) pe conditional forwarder configure karo — <code>*.cloud.internal.company.com</code> queries → cloud DNS resolver IP forward karo. Cloud resolver IPs: Azure 168.63.129.16 (link-local, VNet-only), AWS Route 53 Resolver inbound endpoint (custom IP in VPC), GCP Cloud DNS forwarder IP.</li>
            <li><strong>Cloud → On-prem DNS:</strong> Cloud DNS forwarder/resolver rules — <code>corp.local</code>, <code>*.ad.company.com</code>, <code>*.dc.company.com</code> → on-prem DNS server IP (private IP accessible via VPN/Interconnect). Yeh IP VPN/Interconnect path pe accessible hona chahiye.</li>
            <li><strong>AWS Route 53 Resolver:</strong> Inbound endpoint (on-prem → VPC DNS) + Outbound endpoint (VPC → on-prem DNS). Resolver Rules define karte hain kaun se domains on-prem DNS pe forward hote hain. Highly available — multiple IPs across AZs.</li>
            <li><strong>Azure DNS Private Resolver:</strong> Fully managed resolver service — replaces need for custom DNS VMs. Inbound endpoint (on-prem se queries accept karo), Outbound endpoint (on-prem DNS pe forward karo). Subnet-level deployment, HA built-in, scales automatically.</li>
            <li><strong>GCP Cloud DNS Private Forwarding:</strong> Cloud DNS private zone pe forwarding rules — on-prem zones ke liye Cloud DNS outbound DNS forwarding. DNS Peering: ek VPC se doosre VPC ki private zone resolve karo.</li>
            <li><strong>Split-Horizon (Split-Brain) DNS:</strong> Same domain name alag responses internally vs externally. Example: <code>app.company.com</code> → external users: 1.2.3.4 (public IP/CDN). Internal users: 10.0.1.50 (private IP direct). Implementation: on-prem DNS ek zone serve kare (private), public DNS alag zone. Common issue: internal DNS zone aur external zone out-of-sync hone pe internal users wrong IP milta hai.</li>
            <li><strong>Private DNS Zones:</strong> Azure Private DNS zones VNet se link karo. AWS Route 53 Private Hosted Zones VPC se associate karo. GCP Cloud DNS private zones — Project-level. On-prem se access: forwarder → cloud resolver → private zone resolution.</li>
            <li><strong>DNS TTL aur hybrid failover:</strong> Low TTL (60 seconds) rakhna production DNS pe — disaster events mein fast DNS change propagation ke liye. High TTL (3600 seconds) = DNS failover slow. Pre-event TTL lowering (hours before planned maintenance) best practice hai.</li>
          </ul>
          <Callout type="warning" title="Azure Private DNS — 168.63.129.16 Sirf VNet Internal Hai">
            Azure ka DNS resolver IP 168.63.129.16 ek link-local address hai jo sirf Azure VNet ke andar se reachable hai. On-prem DNS server directly is IP se forward nahi kar sakta — VPN/ExpressRoute ke baad bhi nahi. Isliye Azure DNS Private Resolver deploy karo jo VNet mein real private IP pe listen kare, uski taraf on-prem conditional forwarder configure karo.
          </Callout>
        </section>

        <section id="cidr-planning">
          <h3 style={S.h3}>CIDR Planning — Non-Overlapping Networks</h3>
          <p style={S.p}>
            Hybrid architecture mein sabse avoidable aur sabse common mistake: overlapping IP address spaces. On-prem 10.0.0.0/8 use karta hai, cloud VPC bhi 10.0.0.0/16 use karta hai — VPC peering, Direct Connect routing sab fail ho jaata hai.
          </p>
          <ul style={S.ul}>
            <li><strong>Planning rule:</strong> On-prem CIDR space aur cloud CIDR space non-overlapping hone chahiye — not just current, lekin future expansion ko consider karo</li>
            <li><strong>Recommended split:</strong> On-prem: 10.0.0.0/8 (large org), Cloud Prod: 172.16.0.0/12, Cloud Dev: 192.168.0.0/16 — ya better, vendor-specific ranges</li>
            <li><strong>Multi-cloud:</strong> AWS VPCs, Azure VNets, GCP VPCs — sab alag non-overlapping ranges. Future-proof: allocate /16 minimum per cloud per region</li>
          </ul>
          <Callout type="danger" title="Overlapping CIDRs — Migration ka Sabse Bada Headache">
            CIDR overlap discover hone ke baad fix karna: existing VMs reIP karo, firewall rules update karo, routing reconfigure karo — weeks of work. Plan upfront. IP Address Management (IPAM) tool use karo: InfoBlox, Netbox, ya cloud-native IPAM.
          </Callout>
        </section>

        <Figure caption="Hybrid Network: VPN, Direct Connect, Partner Interconnect aur SD-WAN connectivity options with production recommendation">
          <HybridNetworkDiagram />
        </Figure>
      </section>

      {/* ─── IDENTITY ─────────────────────────────────────────────────────── */}
      <section id="identity">
        <h2 style={S.h2}>Hybrid Identity — SSO Across On-Prem and Cloud</h2>
        <p style={S.p}>
          Hybrid identity ka matlab hai: engineer ek baar login kare — on-prem Windows session, Azure Portal, AWS Console, Salesforce, aur company internal apps — sab access kare. Alag passwords, alag logins = user frustration + security weakness (weak/reused passwords).
        </p>

        <section id="active-directory">
          <h3 style={S.h3}>Active Directory and Microsoft Entra ID</h3>
          <p style={S.p}>
            Traditional enterprise mein on-prem Active Directory Domain Services (AD DS) sabkuch control karta hai — domain login, GPO, certificate distribution, LDAP/Kerberos authentication. Cloud mein Microsoft Entra ID (formerly Azure AD) cloud identity provider hai — OAuth2/OIDC/SAML pe based, web apps ke liye.
          </p>
          <ComparisonTable
            headers={["Aspect", "On-Prem AD DS", "Microsoft Entra ID"]}
            rows={[
              ["Protocol", "LDAP, Kerberos, NTLM", "OAuth 2.0, OIDC, SAML 2.0"],
              ["Purpose", "Domain-joined PCs, GPO, on-prem apps", "Cloud apps, SaaS, Microsoft 365"],
              ["Deployment", "Domain Controllers (physical/VM)", "Cloud service — no servers"],
              ["Authentication", "Domain Controller validates", "Entra cloud token service (STS)"],
              ["Device management", "GPO, domain join", "Intune, Conditional Access, BYOD"],
              ["Hybrid role", "Source of truth (existing users)", "Cloud reflection (sync from AD)"],
            ]}
          />
        </section>

        <section id="identity-sync-options">
          <h3 style={S.h3}>Federation vs Synchronization — Critical Distinction</h3>
          <p style={S.p}>
            Hybrid identity mein do fundamentally different concepts hain jo often confuse hote hain: <strong>Synchronization</strong> (objects copy karo cloud mein) aur <strong>Federation</strong> (trust relationship — cloud identity provider on-prem IdP pe authentication delegate karta hai). Dono simultaneously exist kar sakte hain.
          </p>
          <ul style={S.ul}>
            <li><strong>Synchronization (Azure AD Connect / Entra Connect Sync):</strong> On-prem AD objects (users, groups, devices) Entra ID mein copy hote hain. Cloud mein shadow objects create hote hain. User object cloud mein exist karta hai — authentication method alag se decide hoti hai (PHS, PTA, ya ADFS). Sync interval: default 30 minutes. Delta sync. Full sync weekly.</li>
            <li><strong>Federation (ADFS / Third-party IdP):</strong> Sync ke bawajood, actual authentication on-prem IdP pe hoti hai. Cloud identity provider user ko on-prem IdP pe redirect karta hai. SAML assertion return aati hai — cloud user ko logged in mark karta hai. Federation = authentication trust, not data copy.</li>
          </ul>
          <p style={S.p}>
            <strong>Authentication Protocols — kab kya use hota hai:</strong>
          </p>
          <ul style={S.ul}>
            <li><strong>LDAP (Lightweight Directory Access Protocol):</strong> On-prem applications AD se user authentication ke liye. Port 389 (LDAP), 636 (LDAPS). Cloud pe direct LDAP nahi hoti — Azure AD Domain Services (AADDS) LDAP provide karta hai cloud-native apps ke liye. Legacy apps jo LDAP require karte hain unhe on-prem mein rakhna ya AADDS use karna practical hai.</li>
            <li><strong>Kerberos:</strong> On-prem Windows domain authentication protocol. Domain-joined machines ticket-based authentication use karti hain — password network pe nahi jaata. Cloud pe Kerberos direct nahi hota. Hybrid Kerberos: Azure AD Kerberos extension enable karo — cloud users on-prem file shares ke liye Kerberos tickets get karte hain bina password prompt ke.</li>
            <li><strong>SAML 2.0 (Security Assertion Markup Language):</strong> XML-based federation protocol — enterprise SSO ke liye. ADFS, Okta, PingFederate SAML IdP banate hain. Cloud apps (AWS Console, Salesforce, ServiceNow) SAML SP (Service Provider) hain. Flow: User → SP → redirect to IdP → authenticate → SAML assertion → SP → logged in. Token lifetime: typically 1-8 hours. Refresh via re-authentication ya session extension.</li>
            <li><strong>OAuth 2.0:</strong> Authorization framework — authentication nahi (common misconception). Apps ko user data access karne ke liye delegated permission deta hai bina password share kiye. "Sign in with Google/GitHub" = OAuth2 + OIDC. Token types: Access token (short-lived, 1 hour typical), Refresh token (long-lived, days-months).</li>
            <li><strong>OpenID Connect (OIDC):</strong> OAuth 2.0 ke upar identity layer. "OAuth adds authorization, OIDC adds authentication." JWT ID token user identity contain karta hai. Modern apps ke liye preferred — REST/JSON based, mobile friendly. Entra ID, Okta, Google all support OIDC. Token lifetime: ID token 1 hour (configurable), access token short-lived.</li>
          </ul>
          <p style={S.p}>
            <strong>On-prem AD aur Entra ID connection ke 3 options:</strong>
          </p>
          <ul style={S.ul}>
            <li><strong>Password Hash Sync (PHS) — Recommended:</strong> On-prem AD password ka hash-of-hash cloud mein sync hota hai (plain text kabhi nahi). Authentication cloud pe hoti hai — on-prem DC up/down se independent. Simplest deployment, most resilient (on-prem outage mein bhi cloud auth works). Smart Lockout: cloud level pe brute force protection. 99% enterprises ke liye yahi optimal choice hai.</li>
            <li><strong>Pass-Through Authentication (PTA):</strong> Cloud authentication request on-prem lightweight agent ke through AD pe validate hoti hai. Password hash cloud mein stored nahi — specific compliance requirements (e.g., password must never leave org boundary) ke liye. Dependency: 3+ PTA agents on-prem running hone chahiye (HA ke liye). On-prem complete outage = cloud auth fail. Seamless SSO PTA ke saath bhi kaam karta hai.</li>
            <li><strong>Federation (ADFS):</strong> On-prem ADFS farm SAML/WS-Federation tokens issue karta hai — Entra ID trust relationship maintain karta hai. Maximum control: custom claim rules, custom authentication policies, smart card/certificate auth possible. Maximum complexity: ADFS farm deploy + maintain, SSL certs manage, WAP (Web Application Proxy) for external access. ADFS farm fail = cloud login fails. Recommended sirf jab PHS/PTA insufficient ho (custom claim transformation needed, specific compliance mandate).</li>
          </ul>
          <Callout type="important" title="Token Lifetime — Session Hijacking Risk">
            SAML tokens aur OAuth access tokens ka lifetime critical security consideration hai. Long token lifetime (e.g., 24 hours) = token stolen hone pe attacker longer window milta hai. Short lifetime (1 hour) = zyada re-authentication friction. Best practice: Access token short (1 hour), Refresh token longer (24 hours) + Conditional Access pe token binding + Continuous Access Evaluation (CAE) jo revocation near-real-time kare. ADFS token lifetime separately configure hota hai IdP level pe.
          </Callout>
        </section>

        <section id="iam-integration">
          <h3 style={S.h3}>AWS IAM Identity Center and GCP Cloud Identity</h3>
          <p style={S.p}>
            Multi-cloud enterprises ke liye sirf Entra ID enough nahi — AWS aur GCP ke apne identity systems hain jo integrate karne padte hain.
          </p>
          <ul style={S.ul}>
            <li><strong>AWS IAM Identity Center (SSO):</strong> Central SSO for AWS accounts. SAML 2.0 federation ke saath on-prem AD ya Entra ID se connect karo. SCIM provisioning: users/groups automatically sync hote hain. Result: corporate credentials se AWS Console aur CLI access.</li>
            <li><strong>GCP Cloud Identity / GCDS:</strong> Google Cloud Directory Sync — on-prem AD ya Entra ID se GCP Cloud Identity mein users sync karo. SAML federation for SSO. Workload Identity Federation: on-prem aur external identity providers (AWS, GitHub Actions) ke liye bina SA keys ke GCP access.</li>
            <li><strong>SCIM provisioning:</strong> Automatic user lifecycle management — Entra ID → AWS/GCP. User create/deactivate on-prem se automatically propagate hoti hai cloud identity.</li>
          </ul>
        </section>

        <section id="workload-identity">
          <h3 style={S.h3}>Workload Identity — Applications Without Passwords</h3>
          <p style={S.p}>
            Workload Identity ka principle: applications ko human credentials nahi chahiye. Machine identity use karo — cloud provider automatically tokens provide karta hai jo application use kare.
          </p>
          <ul style={S.ul}>
            <li><strong>AWS:</strong> EC2 Instance Profile, ECS Task Role, EKS IRSA (IAM Roles for Service Accounts) — application ko IAM credentials nahi chahiye</li>
            <li><strong>Azure:</strong> Managed Identity (system-assigned ya user-assigned) — VM ya Function ko Entra ID identity milti hai automatically</li>
            <li><strong>GCP:</strong> Compute Engine Service Account, GKE Workload Identity — pod ko GCP SA token automatically milta hai</li>
            <li><strong>On-prem to Cloud:</strong> Workload Identity Federation — on-prem K8s pods bina SA key file ke GCP APIs call kar sakti hain (OIDC token exchange)</li>
          </ul>
          <Callout type="best-practice" title="Production Rule: Zero Hardcoded Credentials">
            Application code, config files, environment variables mein AWS access keys, Azure credentials, GCP SA keys — kabhi mat rakho. Workload Identity use karo. Agar legacy hai: AWS Secrets Manager / Azure Key Vault / GCP Secret Manager se runtime pe fetch karo. Key rotation automated honi chahiye.
          </Callout>
        </section>

        <Figure caption="Hybrid Identity Federation: Active Directory → Entra ID sync → cloud apps SSO flow">
          <IdentityFederationDiagram />
        </Figure>
      </section>

      {/* ─── STORAGE SYNC ─────────────────────────────────────────────────── */}
      <section id="storage-sync">
        <h2 style={S.h2}>Storage Sync and Data Replication</h2>

        <section id="storage-patterns">
          <h3 style={S.h3}>Hybrid Storage Patterns</h3>
          <p style={S.p}>
            <TopicLink slug="nas" variant="inline" /> aur <TopicLink slug="san" variant="inline" /> on-prem pe hain, cloud pe object storage hai — teen fundamental storage types hain jinka hybrid bridge alag-alag hai.
          </p>
          <p style={S.p}><strong>Block Storage (SAN / iSCSI)</strong></p>
          <ul style={S.ul}>
            <li>On-prem block storage (SAN LUNs, VMDK) ko cloud mein replicate karna = VM-level replication most practical hai</li>
            <li><strong>Azure Site Recovery (ASR):</strong> On-prem VMware/Hyper-V VMs → Azure VMs. Continuous block-level replication via Mobility Agent. RPO as low as 30 seconds. Recovery point history configurable.</li>
            <li><strong>AWS DRS (Elastic Disaster Recovery):</strong> Agent on source server → continuous replication to staging area S3 → point-in-time recovery. Sub-second RPO.</li>
            <li><strong>Pure block sync limitation:</strong> Storage consistency group — dependent VMs (app + DB) same crash-consistent snapshot pe hone chahiye. Application-consistent snapshots = VSS/application agent coordination needed.</li>
          </ul>
          <p style={S.p}><strong>File Storage (NAS / SMB / NFS)</strong></p>
          <ul style={S.ul}>
            <li><strong>Azure File Sync:</strong> On-prem Windows Server file shares → Azure Files. Cloud tiering: recently accessed files local pe, older files cloud mein (tiered). Users locally access karte hain — cloud se transparently served. Multiple servers same Azure Files share se sync — distributed file system replacement.</li>
            <li><strong>DFS Replication (DFSR):</strong> On-prem DFS-R existing hai toh Azure File Sync ke saath coexist possible — but Azure File Sync gradually replace karo DFS-R ko. DFSR cloud-native nahi hai.</li>
            <li><strong>AWS Storage Gateway — File Gateway:</strong> On-prem NFS/SMB share → S3 backend. Local cache hot data. Use case: media files, backups, NAS to cloud tiering.</li>
            <li><strong>NFS/SMB cloud-native:</strong> Azure Files (SMB + NFS), AWS EFS (NFS), GCP Filestore (NFS) — multi-VM concurrent mount possible. On-prem se VPN/Interconnect pe mount karo.</li>
          </ul>
          <p style={S.p}><strong>Object Storage</strong></p>
          <ul style={S.ul}>
            <li><strong>On-prem → Cloud object sync:</strong> On-prem S3-compatible storage (MinIO, Ceph RADOS Gateway, NetApp StorageGRID) → AWS S3 / Azure Blob / GCS sync</li>
            <li><strong>AWS DataSync:</strong> On-prem NAS → S3/EFS/FSx. Up to 10Gbps per task. Checksums, retry, scheduling. Recommended for large migrations.</li>
            <li><strong>AzCopy:</strong> CLI tool, parallel uploads to Azure Blob. Supports on-prem → Azure sync with delta transfers.</li>
            <li><strong>gsutil rsync / Storage Transfer Service:</strong> GCP pe large-scale data transfer. Transfer Service: scheduled, managed service. gsutil: interactive/scripted.</li>
            <li><strong>rclone:</strong> Open-source multi-cloud sync tool — 70+ backends. Cross-cloud sync (S3 → Azure Blob, GCS → S3). Good for smaller volumes.</li>
          </ul>
          <p style={S.p}><strong>Large Data Migration — Bandwidth Considerations</strong></p>
          <ul style={S.ul}>
            <li>10TB at 1Gbps dedicated = ~22 hours. 100TB = 9+ days. 1PB = 90+ days. Online transfer often impractical for very large datasets.</li>
            <li><strong>AWS Snowball Edge:</strong> Physical appliance, 80TB usable. Ship to AWS → data loaded to S3. 100TB migration in days vs months online.</li>
            <li><strong>Azure Data Box:</strong> Similar — 80TB, 100TB, 1PB options. Ship to Microsoft DC.</li>
            <li><strong>Storage consistency during migration:</strong> Live data migration mein consistency window — initial seed copy + delta sync during cutover. Application quiesce at cutover or accept brief inconsistency window.</li>
          </ul>
        </section>

        <section id="database-replication">
          <h3 style={S.h3}>Database Replication Strategies</h3>
          <ComparisonTable
            headers={["Pattern", "Tool", "RPO", "Use Case"]}
            rows={[
              ["SQL Server Always On AG", "SQL AG with cloud replica", "Seconds", "On-prem SQL → Azure SQL DR replica"],
              ["MySQL/PostgreSQL Replication", "Native replication / DMS", "Seconds-minutes", "On-prem MySQL → RDS / Cloud SQL"],
              ["Oracle Data Guard", "Data Guard redo log shipping", "Seconds", "On-prem Oracle → Oracle on cloud"],
              ["AWS DMS (continuous)", "Database Migration Service", "Seconds-minutes", "Any DB → RDS continuous CDC"],
              ["Azure Database Migration", "Azure DMS", "Varies", "On-prem SQL → Azure SQL managed"],
              ["Striim / Attunity", "CDC streaming", "Sub-second", "Real-time data sync, event streaming"],
            ]}
          />
        </section>

        <section id="backup-cloud">
          <h3 style={S.h3}>Cloud Backup — 3-2-1-1 Rule and Advanced Patterns</h3>
          <p style={S.p}>
            Traditional 3-2-1 rule: 3 copies, 2 different media, 1 offsite. Modern ransomware reality ne 3-2-1-1 banaya: plus 1 immutable/air-gapped copy jo ransomware reach nahi kar sakta.
          </p>
          <ul style={S.ul}>
            <li><strong>On-prem primary backup:</strong> Local fast backup (Veeam, Commvault, Veritas) NAS/backup storage pe — fast restore, day-to-day operations. Recovery time: minutes to hours.</li>
            <li><strong>On-prem secondary:</strong> Tape ya secondary NAS (different media) — local ransomware se protection if isolated. Tape offline = air-gapped by nature.</li>
            <li><strong>Cloud offsite (cross-region):</strong> AWS S3 / Azure Blob / GCS — geographic diversity. Cross-region replication: S3 Cross-Region Replication (CRR), Azure Blob GRS/GZRS, GCS dual-region. Ransomware protection: Object Lock (WORM — Write Once Read Many). Even if attacker gains cloud credentials, immutable objects nahi delete ho sakte lock period ke dauran.</li>
            <li><strong>Cross-cloud backup:</strong> Primary cloud AWS → backup on Azure Blob / GCS. Extreme protection — single cloud provider compromise se independent. Complex management lekin maximum resilience. Veeam, Commvault, MSP360 cross-cloud backup support karte hain.</li>
            <li><strong>Air-gapped cloud backup:</strong> AWS S3 Object Lock Compliance mode — AWS admin bhi delete nahi kar sakta during lock period. Azure Immutable Blob Storage — time-based retention lock. GCS Object Lock. Yeh "virtual air gap" hai — logically air-gapped even though network-accessible during writes.</li>
          </ul>
          <p style={S.p}><strong>Backup Verification — Most Neglected Practice</strong></p>
          <ul style={S.ul}>
            <li><strong>SureBackup (Veeam):</strong> Automated backup testing — restore VM in isolated network, run application tests, verify it boots aur application responds. Every backup automatically verified.</li>
            <li><strong>Recovery drills:</strong> Quarterly actual restore from backup — not just check job status. "Backup complete" ≠ "restore will work." Test full application stack restore, not just individual files.</li>
            <li><strong>Checksum validation:</strong> DataSync, Azure Backup, AWS Backup — checksums verify backup integrity. Corrupted backup ka pata DR event pe na chale — regular integrity checks.</li>
            <li><strong>Retention testing:</strong> Verify 90-day-old backup actually accessible and restorable — long-term retention often untested until needed.</li>
          </ul>
          <ul style={S.ul}>
            <li><strong>Tools:</strong> Veeam B&R → Azure Blob (S3-compatible endpoint bhi), Commvault → multi-cloud, AWS Backup for cloud-native (EC2, RDS, DynamoDB, EFS), Azure Backup for VMs + on-prem via MARS/MABS agent, GCP Backup for GKE + Compute snapshots</li>
          </ul>
        </section>

        <Figure caption="Hybrid Storage Sync: on-prem storage to cloud patterns, tools and data gravity considerations">
          <StorageSyncDiagram />
        </Figure>
      </section>

      {/* ─── DISASTER RECOVERY ────────────────────────────────────────────── */}
      <section id="disaster-recovery">
        <h2 style={S.h2}>Disaster Recovery Patterns</h2>
        <p style={S.p}>
          DR planning ka starting point hamesha business requirements hain — technical implementation baad mein aata hai. Ek bank ke liye 1-minute RTO aur zero RPO acceptable hai. Ek internal HR portal ke liye 4-hour RTO aur 1-day RPO sufficient ho sakta hai.
        </p>

        <section id="rpo-rto">
          <h3 style={S.h3}>RPO and RTO — Engineering Definitions</h3>
          <p style={S.p}>
            <strong>RPO (Recovery Point Objective):</strong> Maximum data loss acceptable — "kitna purana data acceptable hai failover ke baad?" RPO 1 hour = maximum 1 hour ka data loss acceptable. Technically: replication frequency determine karta hai RPO.
          </p>
          <p style={S.p}>
            <strong>RTO (Recovery Time Objective):</strong> Maximum acceptable downtime — "kitne time mein system up hona chahiye?" RTO 30 minutes = within 30 minutes of disaster system operational hona chahiye. Technically: failover automation speed determine karta hai RTO.
          </p>
          <Callout type="important" title="RPO aur RTO Set Karne Ka Process">
            RPO/RTO business stakeholders se define hota hai, engineers se nahi. Engineers calculate karte hain kya achievable hai at what cost. Rs. 1 crore/hour revenue loss wale application ke liye Rs. 50 lakh/year DR investment justify hota hai. Internal email system ke liye 4-hour RTO at much lower cost. Yeh conversation CFO/CTO ke saath honi chahiye.
          </Callout>
        </section>

        <section id="cold-dr">
          <h3 style={S.h3}>Cold DR — Backup and Restore</h3>
          <p style={S.p}>
            Sabse simple aur cheapest DR pattern. Production pe disaster aaya → cloud mein resources spin up karo → backups se restore karo. Cloud pe normally kuch nahi chalta (except backup storage).
          </p>
          <ul style={S.ul}>
            <li>VM snapshots regularly cloud object storage mein store karo</li>
            <li>Database backups cloud pe copy karo (compressed, encrypted)</li>
            <li>Infrastructure as Code (Terraform/Bicep) templates ready rakho — ek command se environment recreate ho</li>
            <li>Tested restore procedure documented ho — DR event pe first time test mat karo</li>
            <li><strong>Limitation:</strong> RTO hours-to-days. Acceptable for non-critical systems only.</li>
          </ul>
        </section>

        <section id="pilot-light">
          <h3 style={S.h3}>Pilot Light</h3>
          <p style={S.p}>
            "Gaas ka chulha jiska pilot flame always on ho" — core components always running hain cloud mein (database replica, core DNS, minimal networking), lekin application servers nahi. Disaster pe: DB promote karo, application servers launch karo images se, DNS failover karo.
          </p>
          <ul style={S.ul}>
            <li>Database read replica continuously cloud mein running aur sync ho rahi hai</li>
            <li>AMIs/VM Images pre-baked ready hain (application layers already configured)</li>
            <li>VPC/VNet, subnets, security groups — already created, just no compute running</li>
            <li>Failover: DB promote + launch EC2/Azure VMs from images + Route 53/Traffic Manager DNS update</li>
            <li><strong>RTO:</strong> 30-60 minutes typical. <strong>RPO:</strong> Minutes (replication lag).</li>
          </ul>
        </section>

        <section id="warm-standby">
          <h3 style={S.h3}>Warm Standby</h3>
          <p style={S.p}>
            Scaled-down but fully functional replica cloud mein running hai. Application servers chal rahe hain (small instance sizes), database actively replicating. Disaster pe: instances scale up karo + promote DB + DNS failover.
          </p>
          <ul style={S.ul}>
            <li>Auto Scaling Groups / VMSS minimum instances set karo — application warm hai</li>
            <li>Load balancer configured hai lekin traffic route nahi ho raha (health check-based)</li>
            <li>Database: active-passive replica, near-zero lag</li>
            <li>Health check automation: DNS failover health check fails → traffic automatically shifts to cloud</li>
            <li><strong>RTO:</strong> Minutes. <strong>RPO:</strong> Seconds.</li>
          </ul>
        </section>

        <section id="active-active">
          <h3 style={S.h3}>Active-Active Architecture</h3>
          <p style={S.p}>
            Dono sites simultaneously traffic serve karte hain — on-prem aur cloud. Global Load Balancer (Route 53 latency routing, Azure Traffic Manager, GCP global LB) traffic distribute karta hai. Site failure pe remaining site poora traffic handle karta hai.
          </p>
          <ul style={S.ul}>
            <li>Database: most complex part — multi-master replication (CockroachDB, Cloud Spanner, Cassandra) ya write-to-primary with read replicas</li>
            <li>Session affinity: stateless application design mandatory ya sticky sessions global LB pe</li>
            <li>RTO/RPO: theoretically near-zero — LB health check fail → DNS TTL ke baad traffic rerouted. Critical: DNS TTL DR event se pehle lower karna padta hai (e.g., 60 seconds se pehle 3600 se). High TTL = slow failover even with health checks working.</li>
            <li>Cost: highest — double compute, double data transfer</li>
            <li><strong>Use when:</strong> Business cannot afford even minutes of downtime. Banking, healthcare, telecom. Requires significant architectural discipline.</li>
          </ul>
        </section>

        <section id="dr-decision">
          <h3 style={S.h3}>DR Pattern Decision Guide</h3>
          <ComparisonTable
            headers={["Pattern", "RTO", "RPO", "Monthly Cost", "Test Frequency", "Best For"]}
            rows={[
              ["Cold / Backup-Restore", "Hours-Days", "Hours", "Storage only ₹", "Quarterly", "Non-critical internal apps, dev tools"],
              ["Pilot Light", "30-60 min", "Minutes", "DB replica cost ₹₹", "Monthly", "Critical apps, most enterprises"],
              ["Warm Standby", "Minutes", "Seconds", "Scaled-down infra ₹₹₹", "Bi-weekly", "Business-critical, tier-1 apps"],
              ["Active-Active", "~Zero", "~Zero", "Double infra ₹₹₹₹", "Continuous", "Mission-critical: banking, telecom"],
            ]}
          />
        </section>

        <Figure caption="Disaster Recovery Patterns: Cold, Pilot Light, Warm Standby, Active-Active — cost vs RTO/RPO comparison">
          <DisasterRecoveryDiagram />
        </Figure>
      </section>

      {/* ─── HYBRID PLATFORMS ─────────────────────────────────────────────── */}
      <section id="hybrid-platforms">
        <h2 style={S.h2}>Hybrid Cloud Platforms and Tools</h2>

        <section id="vmware-hybrid">
          <h3 style={S.h3}>VMware Hybrid Cloud (vSphere + HCX)</h3>
          <p style={S.p}>
            VMware ka enterprise install base massive hai — most enterprises 10+ years se VMware pe chal rahe hain. VMware Hybrid Cloud Extensions (HCX) on-prem vSphere environment ko cloud VMware pe extend karta hai — VM migration without IP address change, without application downtime.
          </p>
          <ul style={S.ul}>
            <li><strong>VMware Cloud on AWS:</strong> AWS bare metal pe VMware SDDC run karo — same vCenter, same vSphere APIs, same networking. Migration: HCX cold/warm/live migration. Ek saptaah mein 100s VMs migrate possible.</li>
            <li><strong>Azure VMware Solution (AVS):</strong> Azure pe dedicated VMware SDDC. On-prem vCenter se direct ExpressRoute connection. M365/Azure native integration.</li>
            <li><strong>Google Cloud VMware Engine (GCVE):</strong> GCP pe VMware SDDC. Interconnect se on-prem connect karo.</li>
            <li><strong>HCX migration modes:</strong> Cold (shutdown → copy → startup), Warm (pre-copy then cutover), Live (vMotion across WAN — near zero downtime). Live migration requires low-latency link.</li>
          </ul>
          <Callout type="important" title="VMware Hybrid = Fastest Migration Path for Most Enterprises">
            VMware-to-cloud migration mein reIP, OS change, application testing — sab avoid ho jaata hai jab VMware Cloud solution use karo. Tradeoff: higher cost than native cloud VMs. Strategy: VMware Cloud as migration staging → then gradually replatform to native cloud services (RDS instead of SQL on VM).
          </Callout>
        </section>

        <section id="azure-arc">
          <h3 style={S.h3}>Azure Arc</h3>
          <p style={S.p}>
            Azure Arc software-based control plane extension hai — Azure management plane (ARM) on-prem machines, Kubernetes clusters, databases pe project karta hai. On-prem servers Azure Portal se dikhte hain, Azure Policy apply hoti hai, Defender for Cloud monitors karta hai.
          </p>
          <ul style={S.ul}>
            <li><strong>Arc-enabled servers:</strong> On-prem Windows/Linux servers ko Azure mein register karo — Azure Policy (OS patching compliance), Defender for Cloud (threat detection), Azure Monitor (metrics/logs), Update Manager</li>
            <li><strong>Arc-enabled Kubernetes:</strong> On-prem K8s clusters (Rancher, OpenShift, vanilla) Azure from manage karo — GitOps deployments (Flux), Azure Policy for K8s, Defender for Containers</li>
            <li><strong>Arc-enabled SQL Server:</strong> On-prem SQL Server instances Azure mein visible — licensing, security assessments, Defender for SQL</li>
            <li><strong>Key distinction:</strong> Arc management bridge hai, AWS Outposts hardware hai. Arc ke liye on-prem hardware tumhara, Arc agent install karo.</li>
          </ul>
        </section>

        <section id="aws-outposts">
          <h3 style={S.h3}>AWS Outposts</h3>
          <p style={S.p}>
            AWS Outposts ek managed hardware rack hai jo tumhare data center mein install hota hai. AWS EC2, EBS, EKS, RDS — same APIs, same console, same experience — on-prem pe run hote hain. Hardware AWS ka hota hai aur AWS maintain karta hai.
          </p>
          <ul style={S.ul}>
            <li>Use case: ultra-low latency AWS services on-prem pe chahiye (manufacturing floor automation, retail POS), ya data residency requires on-prem ke saath AWS-native services</li>
            <li>Network: Outpost AWS Region se backhaul connection pe dependent hai — Region connectivity fail = Outpost services degrade ho sakte hain</li>
            <li>Cost: significant — rack rental + AWS services. Justify karo only when latency ya residency requirements mandate it.</li>
            <li>Outposts Servers: smaller form factor — 1U/2U servers for edge locations, branch offices</li>
          </ul>
        </section>

        <section id="azure-stack-hci">
          <h3 style={S.h3}>Azure Stack HCI</h3>
          <p style={S.p}>
            Azure Stack HCI on-prem hyperconverged infrastructure hai jo Azure service ke roop mein manage hoti hai. Windows Server + Storage Spaces Direct + Azure Arc integration — standard hardware pe deploy karo, Azure portal se manage karo.
          </p>
          <ul style={S.ul}>
            <li>Windows VMs + Azure Kubernetes Service (AKS on HCI) on-prem pe run karo</li>
            <li>Azure benefits: monthly billing, Azure Hybrid Benefit for Windows licensing, Azure Monitor integration</li>
            <li>Connectivity: Azure pe registered hoti hai — Azure portal management plane ke liye Internet connectivity required</li>
            <li>Use case: Branch offices, retail stores, manufacturing sites — Azure-managed on-prem compute</li>
          </ul>
        </section>

        <section id="google-distributed-cloud">
          <h3 style={S.h3}>Google Distributed Cloud</h3>
          <p style={S.p}>
            Google Distributed Cloud (GDC) on-prem ya edge locations pe GCP services run karne ke liye. Air-gapped (no internet) ya connected options. Kubernetes-native — GKE clusters on-prem pe, Google-managed control plane.
          </p>
          <ul style={S.ul}>
            <li>GDC Hosted: Google-managed infrastructure tumhare facility mein — same as Outposts model</li>
            <li>GDC Edge: Smaller appliance for edge/branch deployments</li>
            <li>Air-gapped option: government, defence sectors ke liye — Internet connectivity nahi chahiye</li>
          </ul>
        </section>

        <section id="kubernetes-hybrid">
          <h3 style={S.h3}>Kubernetes in Hybrid Cloud</h3>
          <p style={S.p}>
            Kubernetes hybrid cloud ka natural execution platform hai — workloads portable hain, infrastructure abstracted hai. Same Kubernetes manifests on-prem pe aur cloud pe run ho sakte hain. Lekin "portable" workloads bhi networking, storage, aur identity differences ke saath wrestle karte hain.
          </p>
          <ul style={S.ul}>
            <li><strong>Multi-cluster pattern:</strong> On-prem cluster (baseline) + cloud cluster (burst). Ingress routing decide kare traffic kahan jaaye. Challenge: cross-cluster service discovery aur network connectivity managed karna padta hai.</li>
            <li><strong>EKS Anywhere:</strong> AWS-managed Kubernetes on-prem pe — bare metal ya VMware pe run karo. Same EKS APIs, same tooling. AWS support available. Connected mode: EKS Connector → EKS console se manage. Disconnected mode bhi possible (air-gapped). Use case: on-prem strict latency/data requirements lekin AWS tooling chahiye.</li>
            <li><strong>AKS Hybrid (AKS on Azure Stack HCI / Windows Server):</strong> Azure-managed Kubernetes on-prem pe. Azure Stack HCI ya Windows Server 2019/2022 pe AKS deploy karo. Azure portal se manage. Azure Monitor for containers integration. Arc-enabled — same Azure policies apply.</li>
            <li><strong>Cluster Federation vs Multi-cluster management:</strong> KubeFed (deprecated), Admiralty, Liqo — complex, limited adoption. Practical alternative: fleet management tools (Rancher Fleet, ArgoCD + ApplicationSets) multiple independent clusters centrally manage karte hain without federation complexity.</li>
            <li><strong>Cross-cluster networking:</strong> Submariner — cluster ke beech pod-to-pod connectivity across L3 boundaries. Cilium Cluster Mesh — multi-cluster service discovery + network policy. Service Mesh (Istio multicluster): mTLS across clusters, traffic management, observability.</li>
            <li><strong>GitOps for hybrid K8s:</strong> ArgoCD ApplicationSets — ek template se multiple clusters pe deploy. Flux Multi-Tenancy — Git repo se on-prem aur cloud clusters sync. Configuration drift automatically detect aur remediate hota hai.</li>
            <li><strong>Container image registry:</strong> On-prem registry (Harbor, JFrog Artifactory) → cloud registry replication. Avoid: cloud registry pull over Internet in production — latency, egress costs. Solution: on-prem registry mirror ya cloud registry pe replicate + VPN/Interconnect pe pull.</li>
          </ul>
        </section>

        <section id="openshift-anthos">
          <h3 style={S.h3}>Red Hat OpenShift and Google Anthos</h3>
          <p style={S.p}>
            <strong>Red Hat OpenShift Container Platform:</strong> Enterprise Kubernetes distribution — on-prem (bare metal, VMware, RHEL), AWS (ROSA), Azure (ARO), GCP, IBM Cloud pe run karo. Unified management console (OpenShift Console), built-in CI/CD (Tekton, ArgoCD), Service Mesh (Istio via OpenShift Service Mesh), monitoring (Prometheus stack built-in). Many large Indian enterprises (banks, telcos, PSUs) OpenShift pe hain — yeh cloud migration ke liye natural stepping stone hai: on-prem OpenShift → ROSA (managed AWS) ya ARO (managed Azure) with same tooling.
          </p>
          <p style={S.p}>
            <strong>Google Anthos / GKE Enterprise:</strong> GCP ka multi-cloud Kubernetes platform — on-prem (Anthos on bare metal, Anthos on VMware), AWS, Azure pe GKE-managed clusters. Components: Anthos Service Mesh (Istio-based, managed), Anthos Config Management (policy-as-code via Git — OPA/Gatekeeper), Cloud Monitoring + Logging integration. Anthos Config Management + Policy Controller = consistent security policies across all clusters. Use case: GCP-centric enterprises jo consistent policy enforcement across on-prem + cloud chahte hain.
          </p>
        </section>
      </section>

      {/* ─── SECURITY ─────────────────────────────────────────────────────── */}
      <section id="security">
        <h2 style={S.h2}>Hybrid Cloud Security</h2>
        <p style={S.p}>
          Hybrid cloud security traditional perimeter security se fundamentally different hai. "Network boundary" ab clear nahi hai — on-prem, VPN, cloud, internet traffic mix hoti hai. Perimeter-based model fail ho jaata hai.
        </p>

        <section id="zero-trust">
          <h3 style={S.h3}>Zero Trust Architecture</h3>
          <p style={S.p}>
            Zero Trust model: "Never trust, always verify." Network location se koi implicit trust nahi milti — VPN pe connected ho ya office mein baitho, har request identity + device health + context ke basis pe verify hoti hai.
          </p>
          <ul style={S.ul}>
            <li><strong>Identity as perimeter:</strong> Network boundary ki bajay identity boundary. Strong authentication (MFA, FIDO2) + conditional access (device compliance, location, risk score)</li>
            <li><strong>Device trust:</strong> Managed/compliant devices ko access milta hai, unmanaged devices ko limited ya no access. Intune/JAMF device compliance + Conditional Access enforce karo.</li>
            <li><strong>Just-in-time access:</strong> Privileged admin access permanently available nahi hona chahiye — JIT (Azure PIM, AWS IAM Identity Center temporary elevated access) se on-demand request karo.</li>
            <li><strong>Assume breach:</strong> Internal network pe bhi same suspicious mindset — lateral movement detection, anomaly alerting.</li>
            <li><strong>Products:</strong> Microsoft Entra ID + Conditional Access, Zscaler ZPA, Palo Alto Prisma Access, BeyondCorp (GCP) — "corporate VPN" replace karte hain.</li>
          </ul>
        </section>

        <section id="network-security">
          <h3 style={S.h3}>Network Security — Firewalls and Microsegmentation</h3>
          <ul style={S.ul}>
            <li><strong>Perimeter <TopicLink slug="firewall" variant="inline" />:</strong> On-prem NGFW (Palo Alto, Fortinet, Check Point) aur cloud-native firewall (AWS Network Firewall, Azure Firewall, GCP Cloud Armor) — dono maintain karo</li>
            <li><strong>Microsegmentation:</strong> East-west traffic (within data center ya cloud) bhi filter karo. Traditional firewall sirf north-south (Internet ↔ DC) dekhi. Microsegmentation: VMware NSX, AWS Security Groups (per-instance), Azure NSG (subnet/NIC), GCP Firewall Rules (VPC level, tag-based)</li>
            <li><strong>WAF (Web Application Firewall):</strong> OWASP Top 10 attacks filter karo — cloud-native WAF (AWS WAF, Azure WAF, Cloud Armor) prefer karo internet-facing applications ke liye</li>
            <li><strong>DDoS protection:</strong> Cloud-native DDoS (AWS Shield, Azure DDoS Protection, Cloud Armor Adaptive) on-prem DDoS (Radware, Arbor) se better scale karta hai — cloud pe traffic absorb hoti hai</li>
          </ul>
        </section>

        <section id="encryption">
          <h3 style={S.h3}>Encryption — Transit and Rest</h3>
          <ul style={S.ul}>
            <li><strong>In-transit:</strong> TLS 1.2+ minimum (TLS 1.3 preferred). mTLS for service-to-service (service mesh). IPsec for VPN tunnels. MACsec for Interconnect (L2 encryption). HTTPS everywhere — no plain HTTP in production.</li>
            <li><strong>At-rest:</strong> AES-256 minimum. Cloud storage encryption default enabled (AWS S3, Azure Blob, GCS — all encrypt by default). VM disk encryption: AWS EBS encrypted, Azure Managed Disk SSE, GCP PD CMEK.</li>
            <li><strong>Database encryption:</strong> Transparent Data Encryption (TDE) for SQL Server, Oracle. RDS encryption at rest — enable at creation (cannot enable after).</li>
            <li><strong>Email/data classification:</strong> Sensitive data (PII, financial) additional encryption layer — Microsoft Purview Information Protection, AWS Macie (discovery).</li>
          </ul>
        </section>

        <section id="key-management">
          <h3 style={S.h3}>Key Management and HSMs</h3>
          <p style={S.p}>
            Encryption keys khud ko protect karna encryption se equally important hai. Keys compromise hone pe encrypted data useless protection nahi rahi.
          </p>
          <ul style={S.ul}>
            <li><strong>Cloud KMS:</strong> AWS KMS, Azure Key Vault, GCP Cloud KMS — managed key storage, automatic rotation, audit logging. Default choice.</li>
            <li><strong>Customer-Managed Keys (CMEK/BYOK):</strong> Tumhara key, cloud provider ke KMS mein stored. Keys revoke karo → data inaccessible. Regulated industries ke liye.</li>
            <li><strong>Cloud HSM:</strong> AWS CloudHSM, Azure Dedicated HSM, GCP Cloud HSM — dedicated hardware security module. FIPS 140-2 Level 3 compliance. Most expensive, highest security.</li>
            <li><strong>On-prem HSM + cloud:</strong> Thales/Entrust on-prem HSM keys cloud KMS se external key manager (EKM/HYOK) se use karo. Keys never leave your HSM.</li>
            <li><strong>HashiCorp Vault:</strong> On-prem ya cloud-agnostic secrets management — multi-cloud consistent secret store, dynamic credentials (AWS IAM temporary creds on demand), PKI management.</li>
          </ul>
        </section>

        <section id="pam-bastion">
          <h3 style={S.h3}>PAM, Bastion Hosts and JIT Access</h3>
          <p style={S.p}>
            Privileged Access Management (PAM) hybrid cloud mein critical hai — admins ke paas on-prem servers, cloud VMs, databases, network devices sab pe access chahiye hoti hai. Yeh access unmanaged rehne pe biggest attack vector ban jaata hai.
          </p>
          <ul style={S.ul}>
            <li><strong>Privileged Access Workstation (PAW):</strong> Admin tasks ke liye dedicated hardened machine — regular Internet browsing/email iss machine se nahi. Separate identity, locked-down OS. On-prem aur cloud admin access sirf PAW se.</li>
            <li><strong>PAM Tools:</strong> CyberArk, BeyondTrust, Delinea (Thycotic) — password vaulting (admin passwords checked out, auto-rotated after session), session recording, privileged session monitoring. Cloud: Azure PIM (Privileged Identity Management), AWS IAM Identity Center temporary elevated access.</li>
            <li><strong>Bastion Hosts:</strong> Jump server — public Internet se directly SSH/RDP nahi, bastion pe pehle connect karo phir internal resources access karo. Cloud-native: AWS Systems Manager Session Manager (no open ports needed, IAM-authenticated), Azure Bastion (browser-based RDP/SSH via portal), GCP Identity-Aware Proxy (IAP) TCP forwarding. On-prem: hardened jump server, session logging mandatory.</li>
            <li><strong>Just-in-Time (JIT) Access:</strong> Admin access permanently available nahi hona chahiye — request karo, approved karo, time-limited access milta hai, automatically revoke hota hai. Azure PIM: eligible role assignment → activate when needed (1-8 hours, requires justification + MFA). AWS IAM Identity Center: temporary elevated permissions with time limit. CyberArk: password checkout → auto check-in + rotation after session.</li>
            <li><strong>No permanent admin accounts:</strong> Break-glass account (emergency) ek hai, vault mein, MFA required, access logged. Regular admins ke paas permanent admin rights nahi — JIT elevation always.</li>
          </ul>
        </section>

        <section id="certificate-lifecycle">
          <h3 style={S.h3}>Certificate Lifecycle and Secrets Management</h3>
          <p style={S.p}>
            Certificate expiry hybrid environments mein most preventable aur most common outage cause hai. Certificates on-prem servers, VPN gateways, ADFS, load balancers, cloud services — sabhi pe hain, aur track karna complex hai.
          </p>
          <ul style={S.ul}>
            <li><strong>Certificate inventory:</strong> Pehla step — sab certificates kahan hain woh jaano. Tools: Venafi, DigiCert CertCentral, Keyfactor — automated certificate discovery. Network scanners (Qualys, Nessus) certificate expiry scan karte hain.</li>
            <li><strong>Expiry monitoring:</strong> 90/60/30/7 day alerts — multiple channels (email + ITSM ticket). Certificate expiry sirf ek person ko pata nahi hona chahiye.</li>
            <li><strong>Auto-renewal:</strong> Public certs: ACME protocol (Let's Encrypt, ZeroSSL) — certbot, cert-manager (Kubernetes). Private PKI: on-prem CA (ADCS) auto-enrollment for domain-joined machines. Cloud: AWS Certificate Manager (ACM) auto-renews ACM-issued certs; Azure App Service managed certs auto-renew; GCP Certificate Manager.</li>
            <li><strong>VPN/ADFS certificates:</strong> These manually managed often — highest risk. ADFS token signing cert expiry = SSO completely fails. VPN cert expiry = hybrid connectivity fails. Both require maintenance window to renew. Calendar reminder + PAM process for renewal.</li>
            <li><strong>Secrets Management best practices:</strong> AWS Secrets Manager: automatic rotation (Lambda-based). Azure Key Vault: secret versioning + near-expiry alerts. GCP Secret Manager: secret versions, IAM per secret. HashiCorp Vault: dynamic secrets (credentials generated on-demand, automatically expire). Never store secrets in: environment variables (visible in process list), application config files (git history risk), container images.</li>
          </ul>
          <Callout type="warning" title="ADFS Certificate Expiry — Silent Business Killer">
            ADFS mein do certificate types hain: Token-Signing aur Token-Decrypting. Default validity 1 year. Auto-renewal on by default lekin relying parties (cloud apps) ko new cert fingerprint bhi update karna padta hai. Agar yeh sync miss hua toh ADFS cert renew hua, cloud app old cert expect kar raha hai → SSO broken, no login possible. Quarterly ADFS cert health check mandatory hai.
          </Callout>
        </section>

        <Figure caption="Hybrid Cloud Security: Zero Trust, network layers, encryption and key management">
          <HybridSecurityDiagram />
        </Figure>
      </section>

      {/* ─── OPERATIONS ───────────────────────────────────────────────────── */}
      <section id="operations">
        <h2 style={S.h2}>Operations — Monitoring, Logging and Governance</h2>

        <section id="unified-monitoring">
          <h3 style={S.h3}>Unified Monitoring Strategy</h3>
          <p style={S.p}>
            Hybrid cloud mein alag-alag tools hone se blind spots create hoti hain — on-prem Nagios kuchh dekh raha hai, CloudWatch kuchh aur, Zabbix alag. Single pane of glass mandatory hai production support ke liye.
          </p>
          <ul style={S.ul}>
            <li><strong>Option 1 — Vendor-agnostic:</strong> Prometheus + Grafana + Alertmanager — on-prem aur cloud dono pe metrics collect karo, central Grafana dashboards. Open source, highly customizable.</li>
            <li><strong>Option 2 — Commercial APM:</strong> Datadog, Dynatrace, New Relic — agents on-prem servers pe bhi, cloud resources pe bhi. Single console, ML-based anomaly detection. Expensive lekin mature.</li>
            <li><strong>Option 3 — Cloud-extend:</strong> Azure Monitor + Azure Arc = on-prem servers Azure Monitor pe. AWS CloudWatch agent on-prem servers pe. Native but tied to one cloud vendor.</li>
            <li><strong>SLO-based monitoring:</strong> Simply "CPU 90% alert" se zyada mature: define SLIs (request success rate, latency p99), SLOs (99.9% requests &lt;200ms), error budget tracking.</li>
          </ul>
        </section>

        <section id="cmdb-itsm">
          <h3 style={S.h3}>CMDB, ITSM and Incident Response</h3>
          <p style={S.p}>
            Configuration Management Database (CMDB) aur IT Service Management (ITSM) hybrid cloud mein specially important hain — assets on-prem + cloud + multiple accounts mein scattered hain, centralized visibility ke bina operational chaos hota hai.
          </p>
          <ul style={S.ul}>
            <li><strong>CMDB for hybrid:</strong> ServiceNow CMDB, BMC Helix, Freshservice — cloud resources automatically discover karo (AWS Service Catalog MDS, Azure CMDB sync, GCP Asset Inventory → CMDB integration). On-prem assets: agent-based discovery (ServiceNow MID Server). CMDB = single truth — "is server kahan hai? kiska hai? kya run ho raha hai?"</li>
            <li><strong>Cloud Asset Inventory:</strong> AWS Config — all resource configurations track karo, changes audit karo, compliance rules evaluate karo. Azure Resource Graph — cross-subscription resource queries. GCP Cloud Asset Inventory — org-wide asset snapshot. Yeh CMDB ke cloud-native supplements hain.</li>
            <li><strong>ITSM Integration:</strong> Alerts → ITSM ticket automatically. ServiceNow, Jira Service Management, Freshservice — monitoring alerts directly tickets create karte hain. Change management: cloud infrastructure changes bhi change tickets se governed hone chahiye (CAB approval for production changes).</li>
            <li><strong>Incident response in hybrid:</strong> On-call runbooks: hybrid-specific. Runbook step 1: is it on-prem ya cloud issue? Network layer check (VPN/Interconnect) → identity layer → application layer. War room: Slack/Teams channel per incident, video bridge, timeline document. Post-incident: blameless retrospective within 48 hours — root cause + action items.</li>
            <li><strong>On-call rotations:</strong> Hybrid = on-prem team + cloud team ka coordination needed. PagerDuty/OpsGenie escalation policies: first L1 SRE → 15 min no response → L2 cloud engineer → L3 architect. Cross-team war room for hybrid incidents mandatory.</li>
          </ul>
        </section>

        <section id="logging-strategy">
          <h3 style={S.h3}>Centralized Logging</h3>
          <ul style={S.ul}>
            <li><strong>Log aggregation:</strong> On-prem syslog → SIEM. Cloud logs → Cloud Logging / CloudWatch Logs. Bridge: Fluent Bit / Logstash → central log store (Elasticsearch, Splunk, Azure Log Analytics, Chronicle)</li>
            <li><strong>Retention policy:</strong> Security logs: 1 year minimum (PCI-DSS: 1yr, HIPAA: 6yr). Application logs: 90 days hot, 1 year cold storage. Archive to cloud object storage (cheap, durable).</li>
            <li><strong>Cloud Audit Logs mandatory:</strong> AWS CloudTrail (all APIs), Azure Activity Log, GCP Cloud Audit Logs (Admin Activity) — always enabled. These tell you who did what — forensics ke liye critical.</li>
            <li><strong>SIEM integration:</strong> Cloud logs → SIEM (Splunk, Sentinel, Chronicle) — correlate on-prem + cloud events for threat detection. Example: on-prem AD login + cloud API call from same user in 2 different countries simultaneously = alert.</li>
          </ul>
        </section>

        <section id="cost-management">
          <h3 style={S.h3}>Cost Management and FinOps</h3>
          <p style={S.p}>
            Hybrid cloud cost management on-prem CapEx + cloud OpEx = complex equation. FinOps (Financial Operations) practice: financial accountability + engineering efficiency + business value alignment — Cloud + Finance + Engineering teeno teams together.
          </p>
          <ul style={S.ul}>
            <li><strong>Tagging strategy:</strong> Environment, team, application, cost-center tags mandatory on ALL cloud resources — Org Policy / SCP enforce karo. Without tags, cost attribution impossible.</li>
            <li><strong>Cost visibility:</strong> AWS Cost Explorer, Azure Cost Management, GCP Billing + BigQuery export — daily reports. Anomaly alerts (sudden 50% cost spike). Unified view: CloudHealth, Apptio Cloudability, Spot.io tools multi-cloud cost consolidate karte hain.</li>
            <li><strong>Reserved/Committed capacity:</strong> Baseline compute → Reserved Instances / Azure Reserved VM / CUDs. Variable → On-demand. Spot/Preemptible → batch workloads. Right-mix saves 40-70%.</li>
            <li><strong>Network egress costs:</strong> Often underestimated. On-prem to cloud data transfer mostly free, cloud to on-prem (egress) = $0.08-0.09/GB. 100TB = $8,000+. Architecture mein data flows plan karo.</li>
            <li><strong>Idle resource cleanup:</strong> AWS Trusted Advisor, Azure Advisor, GCP Recommender — idle VMs, unattached disks, unused reserved capacity identify karo. Automated scheduler: dev/test VMs off after hours.</li>
          </ul>
          <p style={S.p}><strong>Chargeback vs Showback:</strong></p>
          <ul style={S.ul}>
            <li><strong>Showback:</strong> Business units ko unka cloud spend dikhao (report) — but billing centralized hai. Awareness badhta hai, behavior nahi necessarily change hota. Good starting point.</li>
            <li><strong>Chargeback:</strong> Business units actual cloud costs pay karte hain (internal billing). Behavior change hota hai — teams optimize karte hain jab unhe directly charge hoti hai. Requires mature tagging + cost allocation + internal billing system.</li>
            <li><strong>Implementation:</strong> Tags se cost centers map karo. AWS Cost Allocation Tags, Azure Cost Management cost allocation rules, GCP Billing labels. Monthly reports automatically business unit leads ko email karo.</li>
          </ul>
          <p style={S.p}><strong>License Optimization:</strong></p>
          <ul style={S.ul}>
            <li><strong>Azure Hybrid Benefit:</strong> Existing Windows Server + SQL Server on-prem licenses → Azure VMs pe use karo. 40-85% VM cost savings for Windows workloads. AHUB (Azure Hybrid Use Benefit) eligible licenses check karo.</li>
            <li><strong>AWS License-Included vs BYOL:</strong> RDS SQL Server license-included vs BYOL (Bring Your Own License). Large SQL estates ke liye BYOL cheaper if licenses available.</li>
            <li><strong>License Mobility:</strong> Microsoft SA (Software Assurance) wale licenses Azure pe move kar sakte hain. Dedicated hosts (AWS Dedicated Hosts, Azure Dedicated Hosts) pe existing per-core licenses use possible.</li>
            <li><strong>SaaS migration as license optimization:</strong> On-prem Exchange → Microsoft 365. Server licenses eliminate, per-user subscription. On-prem SQL → Azure SQL PaaS. SQL license embedded in PaaS pricing.</li>
            <li><strong>FinOps maturity model:</strong> Crawl (visibility — tagging, dashboards) → Walk (optimization — reserved capacity, right-sizing) → Run (automation — auto-scaling, scheduled shutdowns, anomaly-driven alerts).</li>
          </ul>
        </section>

        <section id="compliance-governance">
          <h3 style={S.h3}>Compliance and Governance</h3>
          <ul style={S.ul}>
            <li><strong>Policy as Code:</strong> AWS SCP (Service Control Policies) — Organization level resource restrictions. Azure Policy — resource creation rules, audit compliance. GCP Org Policies — same. Example: "No public S3 buckets allowed in prod account" — SCP enforce karo, not manual review.</li>
            <li><strong>Change management:</strong> IaC (Terraform/Bicep/CDK) pe sab infrastructure — Git history = audit trail. PRs = peer review = governance. No console-only changes in production.</li>
            <li><strong>Data classification:</strong> PII, PHI, financial data — labeling + DLP (Data Loss Prevention) policies. AWS Macie, Microsoft Purview, GCP DLP API automated discovery.</li>
          </ul>
          <p style={S.p}><strong>Compliance Frameworks — Hybrid Cloud Implications:</strong></p>
          <ComparisonTable
            headers={["Framework", "Scope", "Key Hybrid Cloud Requirements", "Cloud Attestation"]}
            rows={[
              ["ISO 27001", "Information Security Management System", "Asset inventory (cloud + on-prem), access control, incident response, business continuity", "AWS ISO 27001 certified; Azure ISO 27001; GCP ISO 27001 — shared responsibility docs available"],
              ["SOC 2 Type II", "Trust Service Criteria (security, availability, confidentiality)", "Evidence of controls over 6-12 months. Logging, access reviews, change management.", "Cloud providers SOC 2 reports — request via vendor portal. Your controls additional."],
              ["PCI-DSS", "Payment card data protection", "Network segmentation (CDE isolation), encryption in transit + rest, log retention 1yr, quarterly vulnerability scans", "AWS/Azure/GCP PCI-DSS Level 1 compliant — but your workloads need own assessment"],
              ["HIPAA", "US healthcare data (PHI)", "BAA (Business Associate Agreement) with cloud provider mandatory. Encryption, audit logs, access controls.", "AWS HIPAA eligible services; Azure HIPAA/HITECH; GCP HIPAA compliant"],
              ["GDPR", "EU personal data", "Data residency (EU Regions), right to erasure implementation, processor agreements (DPA), breach notification 72hr", "Cloud providers EU data processing agreements available. Data residency = Region selection critical."],
              ["India DPDPA", "India personal digital data", "Data localization requirements (sector-specific), consent management, grievance officer", "Emerging — sector-specific (RBI, SEBI, IRDAI) guidelines additional requirements"],
              ["RBI Guidelines", "Indian banking + NBFC", "Critical data on-prem in India, cloud risk framework, audit access, exit management", "Cloud adoption allowed with controls — RBI Master Direction on IT Governance"],
            ]}
          />
          <Callout type="important" title="Shared Responsibility ≠ Compliance Coverage">
            Cloud provider compliant hai toh tumhara workload automatically compliant nahi hai. PCI-DSS: AWS PCI-DSS certified hai lekin tumhara application architecture, code, access controls sab independently assessed hote hain. Cloud provider ke controls + tumhare controls + configuration = combined compliance posture. Annually QSA (Qualified Security Assessor) assessment mandatory for PCI-DSS Level 1.
          </Callout>
        </section>

        <Figure caption="Hybrid Cloud Operations: unified monitoring, centralized logging, cost management pipeline">
          <OperationsMonitoringDiagram />
        </Figure>
      </section>

      {/* ─── MIGRATION ────────────────────────────────────────────────────── */}
      <section id="migration">
        <h2 style={S.h2}>Migration Strategies — The 7 Rs</h2>
        <p style={S.p}>
          Cloud migration planning mein sabse useful framework hai "7 Rs" — har application ke liye ek strategy decide karo before writing any code. Blindly "lift and shift" karne se woh problems cloud pe bhi aati hain jo on-prem thi.
        </p>

        <section id="migration-7rs">
          <h3 style={S.h3}>Retire, Retain, Rehost, Relocate</h3>
          <ul style={S.ul}>
            <li><strong>Retire (Decommission):</strong> Application ki zaroorat hi nahi rahi. 20-30% applications typically retire candidates hain. License costs, maintenance burden — eliminate karo. Action: shutdown + data archive + notify users.</li>
            <li><strong>Retain (Keep on-prem):</strong> Cloud mein move nahi karna suitable hai — compliance, latency, dependency, recently purchased hardware. Explicitly decide karo retain karna hai — not "haven't gotten to it yet."</li>
            <li><strong>Rehost (Lift & Shift):</strong> VM as-is cloud pe move karo. Same OS, same app, same config — cloud VM pe. Fastest migration. No cloud optimization. Use when: fast migration needed, refactor later plan hai. Tools: AWS MGN, Azure Migrate, Google Migrate to VMs.</li>
            <li><strong>Relocate:</strong> VMware on-prem → VMware Cloud pe (same vCenter APIs). HCX migration. Minimal change, fast cutover. Use when: large VMware estate, time-critical migration.</li>
          </ul>
        </section>

        <section id="replatform-refactor">
          <h3 style={S.h3}>Replatform, Repurchase, Refactor</h3>
          <ul style={S.ul}>
            <li><strong>Replatform (Lift, Tinker & Shift):</strong> Minor changes to use cloud-managed services. Example: self-managed MySQL on VM → RDS MySQL (managed, automated backups, HA). Most common sweet spot — significant benefit, manageable effort.</li>
            <li><strong>Repurchase (Move to SaaS):</strong> On-prem software → SaaS equivalent. Exchange → Microsoft 365. On-prem CRM → Salesforce. On-prem SAP → SAP S/4HANA Cloud. License model change. Large upfront effort (data migration, retraining) but ongoing OpEx reduction.</li>
            <li><strong>Refactor (Re-architect):</strong> Fundamentally redesign for cloud. Monolith → microservices + containers + managed services. Highest effort, highest long-term ROI. Example: Java EAR file on JBoss → Spring Boot microservices on GKE with Cloud SQL and Pub/Sub.</li>
          </ul>
        </section>

        <section id="migration-plan">
          <h3 style={S.h3}>Migration Planning and Execution</h3>
          <ul style={S.ul}>
            <li><strong>Phase 1 — Discovery:</strong> Application portfolio assessment. Dependencies map karo (which app talks to which DB, which service). AWS Migration Hub, Azure Migrate, Google RISC (Rapid Infrastructure Software Compliance) + Migrate to VMs — automated discovery tools.</li>
            <li><strong>Phase 2 — Strategy:</strong> Har application ke liye 7R decision. Prioritize: quick wins first (retire + rehost simple apps), complex refactors later.</li>
            <li><strong>Phase 3 — Pilot:</strong> Non-production environment se shuru karo. Learn: networking, identity, monitoring setup. Mistakes yahan karo — not in production.</li>
            <li><strong>Phase 4 — Wave migrations:</strong> Groups of applications migrate karo (waves). Same dependencies wali apps same wave mein. Cutover plan: maintenance window, rollback procedure, user communication.</li>
            <li><strong>Phase 5 — Optimize:</strong> Post-migration: right-size instances (was over-provisioned on-prem), reserved capacity, delete unused resources, implement cloud-native services.</li>
          </ul>
          <Callout type="warning" title="Migration Project Ki Common Failure Mode">
            Team puri focus application migration pe lagaata hai, aur phir discover karta hai ki networking nahi bana, identity configure nahi, monitoring nahi, security policies missing, compliance requirements miss ho gayi. Pre-migration: connectivity, identity, monitoring, governance — sab ready hona chahiye before first application migration.
          </Callout>
        </section>

        <Figure caption="Migration Strategies: 7 Rs framework — Retire, Retain, Rehost, Relocate, Replatform, Repurchase, Refactor">
          <MigrationStrategyDiagram />
        </Figure>
      </section>

      {/* ─── ARCHITECTURE EXAMPLES ────────────────────────────────────────── */}
      <section id="architecture-examples">
        <h2 style={S.h2}>Architecture Examples</h2>

        <section id="enterprise-hybrid">
          <h3 style={S.h3}>Enterprise Hybrid Reference Architecture</h3>
          <p style={S.p}>
            Ek large Indian enterprise (manufacturing company, 5000 employees, 3 plants, Mumbai HQ) ke liye realistic hybrid architecture:
          </p>
          <ul style={S.ul}>
            <li><strong>Network:</strong> Mumbai HQ → Azure (ExpressRoute primary 1Gbps, VPN backup) + AWS (Direct Connect via same colo, VPN backup). Plant offices → MPLS → HQ → cloud.</li>
            <li><strong>Identity:</strong> On-prem AD DS (2 domain controllers) → Entra ID (Azure AD Connect PHS). AWS IAM Identity Center SAML se Entra ID se federated. Single login: Windows PC → Azure Portal → AWS Console → Salesforce.</li>
            <li><strong>ERP (SAP):</strong> Retained on-prem on VMware (compliance + performance). SAP Basis team existing skill set.</li>
            <li><strong>Customer-facing portal:</strong> Azure App Service + Azure SQL (replatform from on-prem IIS + SQL Server). Auto-scaling for campaigns.</li>
            <li><strong>DR:</strong> On-prem VMware → Azure Site Recovery replication. Pilot Light pattern. ExpressRoute for replication traffic. 30-min RTO, 5-min RPO.</li>
            <li><strong>Monitoring:</strong> Azure Monitor Agent on on-prem servers (via Arc) + Azure VMs. Microsoft Sentinel as SIEM — all logs centralized. Grafana dashboards for ops team.</li>
            <li><strong>Backup:</strong> Veeam on-prem → Azure Blob (LRS) daily, weekly offsite (GRS). 90-day retention. Object Lock for ransomware protection.</li>
          </ul>
        </section>

        <section id="hospital-hybrid">
          <h3 style={S.h3}>Healthcare Hybrid — Compliance-First</h3>
          <p style={S.p}>
            Hospital network (500 beds, PHI data) — compliance requirements drive architecture decisions completely:
          </p>
          <ul style={S.ul}>
            <li><strong>PHI Data:</strong> All patient records on-prem only (DPDPA, HIPAA-equivalent). On-prem SQL Server + NetApp storage. Zero cloud transfer of raw PHI.</li>
            <li><strong>Anonymized analytics:</strong> De-identified data → AWS (HIPAA-eligible services) for ML model training (readmission prediction, diagnosis assistance).</li>
            <li><strong>Cloud workloads:</strong> Appointment booking portal (Azure App Service), video consultation (Azure Communication Services), billing (separate tenant).</li>
            <li><strong>Connectivity:</strong> ExpressRoute for anonymized data transfer. Zero public Internet path for any data movement.</li>
            <li><strong>Encryption:</strong> On-prem: TDE for all databases. Cloud: CMEK with on-prem HSM (HYOK — patient data keys never in cloud).</li>
            <li><strong>Audit:</strong> All PHI access logged on-prem SIEM. Cloud audit logs separate. Quarterly compliance reports automated.</li>
          </ul>
        </section>

        <Figure caption="Enterprise Hybrid Cloud Architecture: on-prem data center connected to public cloud with all integration layers">
          <HybridCloudArchitectureDiagram />
        </Figure>
      </section>

      {/* ─── BEST PRACTICES ───────────────────────────────────────────────── */}
      <section id="best-practices">
        <h2 style={S.h2}>Best Practices</h2>
        <ComparisonTable
          headers={["Area", "Best Practice", "Why"]}
          rows={[
            ["Network", "Dedicated/Direct primary + VPN backup always", "99.99% connectivity SLA achievable"],
            ["CIDR", "Non-overlapping IP ranges planned upfront across all environments", "VPC peering + routing failures avoid karo"],
            ["DNS", "Conditional forwarders both directions — bi-directional DNS resolution", "Seamless name resolution across environments"],
            ["Identity", "Password Hash Sync (PHS) + MFA + Conditional Access", "Simplest + resilient + secure combination"],
            ["Workload Identity", "Zero hardcoded credentials — Managed Identity / IRSA always", "Secret leakage prevent karo"],
            ["DR", "Quarterly DR drills — test actual failover, not just planning", "Untested DR = No DR"],
            ["Storage", "Lifecycle policies + cloud tiering from day 1", "Storage costs don't surprise later"],
            ["Monitoring", "Single pane of glass before first workload migrates", "Blind spots = production incidents"],
            ["Security", "Zero Trust policies + microsegmentation from the start", "Retrofit karna much harder"],
            ["Cost", "Tags mandatory + Budget alerts + daily cost review", "Cloud bill shock common failure mode"],
            ["IaC", "Everything in Terraform/Bicep/CDK — no console-only changes", "Reproducibility + audit trail"],
            ["Migration", "Pilot migration first, then waves", "Learn from mistakes in non-production"],
          ]}
        />
      </section>

      {/* ─── COMMON MISTAKES ──────────────────────────────────────────────── */}
      <section id="common-mistakes">
        <h2 style={S.h2}>Common Engineering Mistakes</h2>
        <ComparisonTable
          headers={["Mistake", "Problem", "Correct Approach"]}
          rows={[
            ["Overlapping IP CIDRs", "VPC peering, routing fail completely", "Plan IPAM upfront — IPAM tool (Netbox, InfoBlox)"],
            ["Single VPN tunnel (no HA)", "VPN goes down → hybrid connectivity lost", "HA VPN (4 tunnels) + Dedicated Interconnect backup"],
            ["Dedicated Interconnect without encryption", "Compliance violation — carrier-level exposure possible", "IPsec over Interconnect OR MACsec (where available)"],
            ["Hardcoded cloud credentials in code", "Credential leak = full cloud account compromise", "Workload Identity / Managed Identity always"],
            ["DR plan never tested", "DR event = first time you discover it doesn't work", "Quarterly runbooks + automated failover tests"],
            ["Split DNS not configured", "Cloud resources unreachable from on-prem by name", "Conditional forwarders bi-directional from day 1"],
            ["Single AD Connect instance", "AD Connect fails = no new cloud auth", "HA: two AD Connect servers in staging mode"],
            ["No network monitoring baseline", "Can't detect performance degradation", "Baseline latency + throughput metrics before migration"],
            ["Cloud costs not monitored daily", "Month-end bill shock (₹50L unexpected)", "Budget alerts + anomaly detection from day 1"],
            ["Security policies retrofitted after migration", "Months of running without proper segmentation", "Security architecture designed before first workload migrates"],
            ["VPN bandwidth underestimated", "VPN becomes bottleneck for hybrid traffic", "Measure actual traffic volume, size accordingly or use Interconnect"],
            ["On-prem firewall rules not updated", "Cloud traffic blocked by on-prem FW", "Document all required firewall rules before migration"],
          ]}
        />
      </section>

      {/* ─── TROUBLESHOOTING ──────────────────────────────────────────────── */}
      <section id="troubleshooting">
        <h2 style={S.h2}>Troubleshooting Hybrid Cloud Issues</h2>
        <p style={S.p}>
          Hybrid cloud troubleshooting traditional networking se zyada complex hai — issue on-prem ho sakta hai, VPN/Interconnect mein, cloud network mein, identity plane mein, ya application layer mein. Systematic approach mandatory hai.
        </p>
        <ol style={S.ol}>
          <li><strong>Basic connectivity check:</strong> On-prem → cloud private IP reachable hai? <code>ping / traceroute / tracert</code>. Agar nahi — VPN/Interconnect tunnel check karo.</li>
          <li><strong>VPN tunnel status:</strong> Cloud console → VPN → tunnel status. BGP session up? Routes advertised/received? On-prem router BGP neighbor status check karo.</li>
          <li><strong>DNS resolution:</strong> <code>nslookup db.cloud.internal.company.com</code> on-prem se — private IP resolve ho raha hai ya public? Conditional forwarder check karo.</li>
          <li><strong>Firewall rules:</strong> On-prem NGFW logs check karo — traffic allowed? Cloud SG/NSG/Firewall Rules check karo. Network Intelligence Center (GCP) / Connectivity Tests run karo.</li>
          <li><strong>Identity/Auth failure:</strong> Azure AD Connect sync status check karo — sync errors? PTA agent running? AWS IAM Identity Center SAML response check karo (browser developer tools, SAML tracer extension).</li>
          <li><strong>Latency spike:</strong> <code>mtr</code> (My TraceRoute) run karo on-prem to cloud IP — where is latency added? VPN path vs Interconnect path compare karo.</li>
          <li><strong>Storage sync failure:</strong> Storage Gateway / DataSync job logs check karo — permissions? Connectivity? Bandwidth throttling?</li>
          <li><strong>Application-level:</strong> Application logs check karo — timeout waiting for on-prem response? Database connection timeout? Check latency budget.</li>
        </ol>
        <Callout type="important" title="Hybrid Troubleshooting — Always Start with Network Layer">
          90% hybrid cloud issues network layer se start hote hain — VPN tunnel, DNS resolution, firewall rule. Application layer dekhne se pehle: can machine A ping machine B? DNS resolve ho raha hai? Path symmetric hai (traffic same path se jaata aur aata hai)? Asymmetric routing hybrid environments mein common hidden issue hai.
        </Callout>
      </section>

      {/* ─── FAILURE SCENARIOS ────────────────────────────────────────────── */}
      <section id="failure-scenarios">
        <h2 style={S.h2}>Practical Failure Scenarios</h2>
        <p style={S.p}>
          Yeh scenarios real production environments mein hote hain — har ek ke saath symptoms, impact, detection method, recovery steps aur lesson learned.
        </p>

        <h3 style={S.h3}>Scenario 1: Direct Connect / ExpressRoute Circuit Failure</h3>
        <ul style={S.ul}>
          <li><strong>Symptom:</strong> On-prem se cloud VM reachable nahi. Application timeouts. Latency suddenly 10-50ms se 100-300ms (Internet path pe).</li>
          <li><strong>Impact:</strong> Agar VPN backup configured nahi — complete hybrid connectivity loss. Agar VPN backup hai — automatic BGP failover (90 seconds default, faster with BFD).</li>
          <li><strong>Detection:</strong> Network monitoring BGP session drop alert. CloudWatch/Azure Monitor VPN failover event. On-prem router log: neighbor down.</li>
          <li><strong>Recovery:</strong> If VPN backup: automatic. Verify BGP routes switched. Monitor bandwidth (VPN lower capacity than Interconnect — possible congestion). Contact circuit provider for Interconnect restoration (SLA: typically 4-24 hours).</li>
          <li><strong>Lesson learned:</strong> HA VPN backup mandatory. BGP hold timers tune karo (10/30 seconds instead of 60/180). BFD (Bidirectional Forwarding Detection) enable karo for sub-second failure detection. Traffic engineering: Interconnect capacity ke barabar VPN capacity configure karo toh failover seamless hoga.</li>
        </ul>

        <h3 style={S.h3}>Scenario 2: DNS Resolution Failure — Cloud Resources Unreachable</h3>
        <ul style={S.ul}>
          <li><strong>Symptom:</strong> On-prem se <code>db.cloud.internal.company.com</code> resolve nahi hota. Application "cannot connect to database" errors. Same private IP pe ping karo — works. Name se nahi.</li>
          <li><strong>Impact:</strong> Application down (DNS pe dependent hai, hardcoded IPs nahi). Scope: sirf on-prem to cloud name resolution affected.</li>
          <li><strong>Detection:</strong> <code>nslookup db.cloud.internal.company.com</code> on-prem se — timeout ya NXDOMAIN. Application logs: DNS resolution failure.</li>
          <li><strong>Recovery:</strong> On-prem DNS server pe conditional forwarder check karo — target IP reachable hai? Cloud DNS resolver IP ping karo on-prem se (Azure DNS Private Resolver endpoint, AWS Route 53 Resolver inbound endpoint). VPN/Interconnect tunnel up hai? DNS forwarder destination IP accessible hona chahiye private network pe.</li>
          <li><strong>Lesson learned:</strong> DNS monitoring: nightly automated nslookup checks for critical hostnames. DNS resolver endpoints HA deploy karo (multiple IPs across AZs). DNS change management: conditional forwarder changes change ticket se.</li>
        </ul>

        <h3 style={S.h3}>Scenario 3: Azure AD Connect Sync Failure</h3>
        <ul style={S.ul}>
          <li><strong>Symptom:</strong> New employee create kiya on-prem AD mein — cloud apps login nahi kar pa raha. Existing users unaffected. Password changes on-prem cloud mein reflect nahi ho rahi (PHS scenario).</li>
          <li><strong>Impact:</strong> New users cloud access se blocked. Password changes 30+ minutes delay. Deprovisioned users temporarily still have cloud access (security risk).</li>
          <li><strong>Detection:</strong> Entra ID portal → Health → AD Connect sync status — last sync time check karo. AD Connect server pe Synchronization Service Manager — errors visible. Entra ID admin email notification (if configured).</li>
          <li><strong>Recovery:</strong> AD Connect server pe service restart karo. AD Connect server reboot karo. Check Windows Event Logs — specific error code diagnose karo. Force delta sync: <code>Start-ADSyncSyncCycle -PolicyType Delta</code>. Escalation: AD Connect reinstall (last resort — staging server promote karo).</li>
          <li><strong>Lesson learned:</strong> Always HA: primary AD Connect + staging mode server. Staging server promote karo jab primary fails. Monitoring: ADConnectHealth agent → Entra ID portal alerts. Sync failure notification email + ITSM ticket. Max acceptable sync delay alert: 2 hours.</li>
        </ul>

        <h3 style={S.h3}>Scenario 4: ADFS Certificate Expiry — Complete SSO Failure</h3>
        <ul style={S.ul}>
          <li><strong>Symptom:</strong> Monday morning sab users cloud apps login nahi kar pa rahe. "Authentication failed" errors. On-prem domain login works. Azure Portal, Office 365, Salesforce — sab affected.</li>
          <li><strong>Impact:</strong> Business-wide cloud access loss. Revenue impact if customer-facing apps affected.</li>
          <li><strong>Detection:</strong> ADFS Event Log: token signing certificate errors. Entra ID: sign-in logs — ADFS federation errors. Browser: ADFS error page "Authentication failed."</li>
          <li><strong>Recovery:</strong> ADFS Token Signing certificate renew karo. Yeh sirf ADFS ke andar nahi — relying parties (Entra ID, Salesforce, etc.) ko new certificate fingerprint update karna padta hai. Emergency: Entra ID mein new ADFS cert update karo (Azure portal → External Identities → Federation). Timeline: typically 1-4 hours for full resolution.</li>
          <li><strong>Lesson learned:</strong> ADFS cert monitoring: 90/60/30 day expiry alerts — multiple recipients. Auto-renewal not possible for ADFS token certs (relying party sync needed). Calendar reminder + runbook for renewal. Consider migration from ADFS to PHS/PTA — eliminates this failure mode entirely.</li>
        </ul>

        <h3 style={S.h3}>Scenario 5: Storage Replication Lag → Split-Brain</h3>
        <ul style={S.ul}>
          <li><strong>Symptom:</strong> DR failover kiya lekin DR database ka data 2-hour-old version show kar raha hai. Primary restore karne ke baad conflict — dono environments ne 2 hours independently wrote kiya.</li>
          <li><strong>Impact:</strong> Data inconsistency. Manual reconciliation needed. Revenue/audit implications. Split-brain: two sources of truth simultaneously.</li>
          <li><strong>Detection:</strong> Replication lag monitoring — SQL AG dashboard, DMS replication lag metrics. Alert if lag exceeds threshold (e.g., 5 minutes for tier-1 apps).</li>
          <li><strong>Recovery:</strong> Split-brain resolution: determine authoritative source. Usually: whichever site had customers writing = authoritative. Manual data reconciliation from transaction logs. Business decision: which transactions to keep. This is why DR tests are critical — discover lag issues before real DR event.</li>
          <li><strong>Lesson learned:</strong> Replication lag = hidden RPO degradation. Monitor lag continuously, alert on breach. DR failover runbook: check replication lag first before initiating failover. Acceptable lag for each tier documented. For databases: synchronous replication for zero RPO but performance cost.</li>
        </ul>

        <ComparisonTable
          headers={["Scenario", "Symptom", "Detection Method", "Prevention"]}
          rows={[
            ["VPN tunnel failure (single tunnel)", "Hybrid connectivity lost", "BGP session drop alert", "HA VPN 4 tunnels + Interconnect backup"],
            ["Interconnect BGP down", "Latency spike, fallback to VPN", "BGP neighbor down event", "Dual circuits, dual metros, VPN backup"],
            ["DNS conditional forwarder broken", "Name resolution fails, IP works", "Automated nslookup health checks", "HA DNS resolvers, DNS change management"],
            ["AD Connect sync stopped", "New users blocked, password lag", "Sync status monitoring, last-sync alert", "Staging server, ADConnectHealth monitoring"],
            ["ADFS token cert expiry", "SSO completely broken", "Cert expiry monitoring 90/60/30 days", "Migrate to PHS; cert calendar reminders"],
            ["Storage replication lag", "DR data stale on failover", "Replication lag metrics + threshold alert", "Synchronous replication for critical DBs"],
            ["Certificate expiry (VPN)", "Hybrid connectivity fails", "VPN cert monitoring", "Auto-renewal pipeline, cert inventory"],
            ["Cloud egress bill spike", "Invoice 10x normal", "Daily cost anomaly alerts", "Egress cost alerts, architecture review"],
            ["Ransomware on-prem", "Backup encrypted too", "Security monitoring, backup failure alerts", "3-2-1-1 rule, immutable cloud backups"],
            ["JIT access not configured", "Admin compromised = full access", "Security posture review", "PAM + JIT from day 1, no permanent admin"],
          ]}
        />
      </section>

      {/* ─── CLOUD ADOPTION FRAMEWORK ────────────────────────────────────── */}
      <section id="cloud-adoption-framework">
        <h2 style={S.h2}>Cloud Adoption Framework — Hybrid Journey Roadmap</h2>
        <p style={S.p}>
          Cloud Adoption Framework (CAF) ek structured approach hai cloud journey ke liye. Microsoft, AWS, aur Google teeno ke apne CAF versions hain — lekin core phases similar hain. Hybrid cloud context mein yeh phases especially important hain kyunki on-prem se full cloud ya hybrid state tak structured progression chahiye.
        </p>

        <section id="caf-phases">
          <h3 style={S.h3}>CAF Phases — Hybrid Cloud Context</h3>
          <ComparisonTable
            headers={["Phase", "What Happens", "Hybrid Cloud Activities", "Key Output"]}
            rows={[
              ["1. Strategy", "Business case, motivation, expected outcomes define karo", "Why hybrid? Cost save? Compliance? DR? Innovation? Executive alignment.", "Cloud strategy document, stakeholder buy-in"],
              ["2. Plan", "Digital estate assessment, skills gaps, timeline", "Application portfolio — which 7R strategy? Dependency mapping. Skills assessment (cloud training needed).", "Migration backlog, skills roadmap, timeline"],
              ["3. Ready (Landing Zone)", "Cloud environment prepare karo before first migration", "Landing zone build: networking, identity, logging, security, governance baseline.", "Landing zone deployed, operational baseline ready"],
              ["4. Migrate", "First workloads cloud pe move karo", "Wave 1: simple, low-risk apps (Rehost). Validate landing zone. Iterate.", "Production workloads in cloud, learnings documented"],
              ["5. Innovate", "Cloud-native capabilities adopt karo", "PaaS adoption, microservices, serverless, ML/AI on cloud data", "New capabilities, competitive advantage"],
              ["6. Govern", "Ongoing policy, cost, security management", "Azure Policy/SCP/Org Policies mature, cost governance, compliance dashboards", "Governance framework, cost accountability"],
              ["7. Manage", "Operations at scale", "Unified monitoring, SRE practices, DR testing, lifecycle management", "Operational maturity, SLO-based ops"],
            ]}
          />
          <p style={S.p}>
            Hybrid cloud journey mein Phase 3 (Ready / Landing Zone) sabse common skipped phase hai — teams directly migration pe jump karte hain. Yeh disaster recipe hai. Landing Zone bina migrate karo toh: networking miss, identity miss, monitoring miss, security gaps, compliance failures. Phase 3 pehle complete karo.
          </p>
        </section>
      </section>

      {/* ─── LANDING ZONE ─────────────────────────────────────────────────── */}
      <section id="landing-zone">
        <h2 style={S.h2}>Landing Zone — Cloud Foundation Before First Migration</h2>
        <p style={S.p}>
          Landing Zone cloud ka foundation hai — sab workloads is foundation pe deploy honge. "Foundation pehle, workloads baad mein." Landing Zone bina cloud mein migrate karna — bina foundation ke building banana.
        </p>
        <p style={S.p}>
          Landing Zone ek pre-configured, policy-compliant cloud environment hai jisme networking, identity, security, logging aur governance baseline already configured hai. First workload migrate hone se pehle yeh ready hona chahiye.
        </p>

        <section id="landing-zone-components">
          <h3 style={S.h3}>Landing Zone Components</h3>
          <ul style={S.ul}>
            <li>
              <strong>Identity Foundation:</strong> AD Connect configured (PHS + Seamless SSO). Cloud admin roles defined (RBAC). MFA enforced. Break-glass accounts created (2, vaulted, monitored). Conditional Access policies baseline (require MFA for all cloud admin access). Service account inventory + workload identity setup.
            </li>
            <li>
              <strong>Network Foundation:</strong> Hub VNet/VPC created (connectivity hub). Spoke VNets for workloads. VPN Gateway (immediate) + Interconnect ordered (weeks lead time). CIDR ranges allocated (non-overlapping, documented). DNS Private Resolver / Route 53 Resolver deployed. Azure Firewall / AWS Network Firewall / GCP Cloud Armor in hub. Default deny + explicit allow rules.
            </li>
            <li>
              <strong>Shared Services:</strong> Cloud-native AD DS (if needed — Azure ADDS / AWS Managed AD) for LDAP-dependent workloads. PKI / Certificate Authority. NTP sync. SMTP relay. Patch management (Azure Update Manager, AWS Systems Manager Patch Manager).
            </li>
            <li>
              <strong>Logging and Audit:</strong> Cloud Audit Logs enabled (ALL regions, ALL services) — never disable. Log sink to central storage (immutable). SIEM integration configured. Log retention policy enforced. CloudTrail, Activity Log, Cloud Audit — all piped to central SIEM.
            </li>
            <li>
              <strong>Security Baseline:</strong> Defender for Cloud / AWS Security Hub / GCP SCC enabled. Secure Score baseline measured. CIS benchmark assessment. Vulnerability management agent deployed. No public buckets policy (SCP/Azure Policy). MFA for all privileged accounts enforced before any workload migrates.
            </li>
            <li>
              <strong>Management Baseline:</strong> Tagging policy enforced (mandatory tags or resource creation blocked). Budget alerts configured. Cost management workspace. Terraform state backend configured. CI/CD pipeline for IaC. Change management process for cloud resources documented.
            </li>
          </ul>
          <Callout type="important" title="Landing Zone = 4-8 Weeks, Not Optional">
            Landing Zone build typically 4-8 weeks lagta hai (network + identity + security baseline). Yeh skip karna ≠ time save. Yeh debt create karta hai — har migration ke baad security/networking retrofit karna padta hai. Enterprise teams: Cloud Center of Excellence (CCoE) Landing Zone maintain karta hai, business teams workloads deploy karte hain ready foundation pe. Landing Zone as code (Terraform Landing Zone, AWS Control Tower, Azure Landing Zone accelerator) available hai — custom build ki zaroorat nahi from scratch.
          </Callout>
        </section>
      </section>

      {/* ─── HYBRID VS MULTI-CLOUD DEEP DIVE ─────────────────────────────── */}
      <section id="hybrid-multicloud-deep">
        <h2 style={S.h2}>Hybrid Cloud vs Multi-Cloud — Engineering Deep Comparison</h2>
        <p style={S.p}>
          Surface level "hybrid = on-prem + cloud, multi-cloud = multiple clouds" se engineering decisions nahi hote. Real decision criteria alag hain — aur most enterprises dono simultaneously hain bina deliberately choosing.
        </p>
        <ComparisonTable
          headers={["Dimension", "Hybrid Cloud", "Multi-Cloud"]}
          rows={[
            ["Definition", "On-prem infrastructure + public cloud(s), integrated", "2+ public cloud providers simultaneously"],
            ["Primary driver", "Data residency, legacy apps, investment protection, latency", "Vendor lock-in avoidance, best-of-breed services, geographic coverage"],
            ["Network architecture", "VPN/Interconnect: on-prem ↔ cloud. Known topology.", "VPN/Interconnect + cloud-to-cloud (VPC peering, Transit). More complex."],
            ["Identity complexity", "AD → Entra ID + optionally AWS/GCP. One primary IdP.", "Multiple IdPs or federated hub (Okta, Ping). Cross-cloud SSO complex."],
            ["Operations complexity", "On-prem ops + cloud ops. Two skill sets.", "Cloud A ops + Cloud B ops + on-prem ops. Three+ skill sets."],
            ["Cost management", "On-prem CapEx + cloud OpEx. Two billing systems.", "Multiple cloud bills. Harder to consolidate. Multi-cloud FinOps tools needed."],
            ["Security governance", "Policies on-prem + cloud. Two security planes.", "AWS SCP + Azure Policy + GCP Org Policy. Three governance planes."],
            ["Latency", "On-prem ↔ cloud: 1-50ms (VPN/Interconnect). Known.", "Cloud-to-cloud latency depends on architecture. Can be high if via Internet."],
            ["Data transfer costs", "On-prem to cloud mostly free; egress from cloud.", "Cross-cloud data transfer = egress from cloud A + ingress to cloud B."],
            ["Disaster recovery", "On-prem primary → cloud DR (natural flow).", "Cloud A → Cloud B DR. More complex networking + identity for failover."],
            ["Kubernetes", "On-prem cluster + cloud cluster. AKS Hybrid, EKS Anywhere.", "EKS + AKS + GKE. Multi-cluster management tools needed (Anthos, Rancher)."],
            ["Compliance", "On-prem controls + cloud controls. Audit two environments.", "Audit three+ environments. More attack surface. Harder to demonstrate controls."],
            ["Best for", "90% enterprises in cloud journey. Regulated industries, legacy.", "Large global enterprises, SaaS companies needing best-of-breed."],
          ]}
        />
        <Callout type="important" title="Most 'Multi-Cloud' Is Actually Hybrid-Multi-Cloud">
          Reality: ek company AWS + Azure use kar rahi hai, aur on-prem bhi hai — yeh hybrid-multi-cloud hai. Pure multi-cloud (sirf multiple public clouds, no on-prem) rare hai. Complexity tripling pe zyada value justify karo. Common anti-pattern: team ne AWS aur Azure dono decide kiya kyunki koi standardize nahi kar saka — vendor evaluation mein decision made by committee ≠ intentional multi-cloud strategy.
        </Callout>
      </section>

      {/* ─── ENGINEERING DECISION MATRIX ──────────────────────────────────── */}
      <section id="decision-matrix">
        <h2 style={S.h2}>Engineering Decision Matrix — Where Should This Workload Go?</h2>
        <p style={S.p}>
          Har workload ke liye placement decision ek structured process se hona chahiye — gut feeling se nahi. Yeh matrix practical decision guide hai.
        </p>
        <ComparisonTable
          headers={["Criteria", "On-Prem", "Public Cloud", "Hybrid", "Multi-Cloud"]}
          rows={[
            ["Data sovereignty required", "✓ Best", "Only regulated regions", "Data on-prem, processing cloud", "✗ Complex"],
            ["Ultra-low latency (<1ms)", "✓ Best", "✗ Not possible", "On-prem primary", "✗ Not possible"],
            ["Unpredictable/bursty load", "✗ Overprovisioning needed", "✓ Best", "Cloud bursting ideal", "Possible but complex"],
            ["Legacy app (cannot refactor)", "✓ Keep here", "Only as Rehost", "Rehost + cloud DR", "✗ Unnecessary complexity"],
            ["Regulatory: data cannot leave DC", "✓ Mandatory", "✗ Not compliant", "Data on-prem, app on cloud", "✗ Both clouds same issue"],
            ["ML/AI training (GPU needed)", "Only if GPU owned", "✓ Best (spot GPUs)", "On-prem data → cloud training", "GCP TPUs + AWS GPU options"],
            ["Cost sensitivity (predictable)", "✓ CapEx amortized", "Reserved Instances", "Baseline on-prem + burst cloud", "High overhead, less efficient"],
            ["Global user base", "✗ Latency to remote users", "✓ Best (CDN, regions)", "Cloud front-end, on-prem backend", "Multiple clouds multiple regions"],
            ["Rapid deployment needed", "✗ Hardware procurement", "✓ Minutes", "Cloud for new workloads", "✓ If tools mature"],
            ["Compliance audit evidence", "Full control", "Shared responsibility", "Dual audit needed", "Triple audit — hardest"],
            ["Startup/greenfield", "✗ CapEx risk", "✓ Cloud-native from start", "Not needed typically", "Only if specific services needed"],
          ]}
        />
        <p style={S.p}><strong>Decision framework (in order):</strong></p>
        <ol style={S.ol}>
          <li><strong>Data regulation check:</strong> Kya data India/EU/specific geography mein mandatory hai? Agar haan → on-prem ya regulated cloud region only.</li>
          <li><strong>Latency requirement:</strong> Sub-millisecond latency chahiye? → On-prem only. 5-50ms acceptable? → Cloud possible.</li>
          <li><strong>Refactor feasibility:</strong> Application cloud-ready hai ya can be made cloud-ready reasonably? Agar nahi → Rehost ya Retain.</li>
          <li><strong>Load profile:</strong> Predictable aur constant → on-prem or Reserved cloud. Variable/bursty → public cloud or hybrid burst.</li>
          <li><strong>Dependency mapping:</strong> App kahan ke resources pe depend karta hai? Data gravity decide karta hai placement.</li>
          <li><strong>Total cost of ownership:</strong> 3-year TCO on-prem vs cloud vs hybrid — full picture (hardware refresh, power, cooling, staff, licenses).</li>
        </ol>
      </section>

      {/* ─── CERTIFICATIONS ───────────────────────────────────────────────── */}
      <section id="certifications">
        <h2 style={S.h2}>Certifications and Career</h2>
        <ComparisonTable
          headers={["Certification", "Provider", "Relevance", "Who Should Take"]}
          rows={[
            ["AWS Solutions Architect Associate/Pro", "AWS", "High — hybrid connectivity, DR, networking", "Cloud architects, DC engineers moving to cloud"],
            ["AZ-700: Azure Network Engineer", "Microsoft", "High — hybrid connectivity deep dive", "Network engineers specializing in Azure hybrid"],
            ["AZ-305: Azure Solutions Architect", "Microsoft", "High — hybrid architecture design", "Senior engineers, solution architects"],
            ["AZ-104: Azure Administrator", "Microsoft", "Medium-High — practical Azure ops", "Engineers in Azure hybrid operations"],
            ["Google Professional Cloud Architect", "Google", "High — hybrid design on GCP", "Senior engineers, architects"],
            ["CCNP Enterprise / Cloud", "Cisco", "High — SD-WAN, hybrid networking protocols", "Network engineers in hybrid environments"],
            ["VMware VCP-DCV", "VMware/Broadcom", "High — VMware hybrid cloud migration", "Engineers managing VMware estates"],
            ["HashiCorp Terraform Associate", "HashiCorp", "High — IaC for hybrid environments", "Any engineer doing infrastructure work"],
          ]}
        />
        <p style={S.p}>
          Hybrid cloud engineering career mein sabse valuable skill combination: deep networking (routing, VPN, BGP) + cloud architecture (AWS/Azure/GCP) + security (zero trust, encryption, IAM). Yeh combination rare hai aur highly compensated hai.
        </p>
        <p style={S.p}>
          India mein demand: BFSI (banking, insurance), healthcare, manufacturing — sabne cloud journey shuru ki hai, aur hybrid architecture engineers ki massive shortage hai. Cloud architect + on-prem experience = premium salary premium.
        </p>
      </section>

      {/* ─── KEY TAKEAWAYS ────────────────────────────────────────────────── */}
      <section id="key-takeaways">
        <h2 style={S.h2}>Key Takeaways</h2>
        <ul style={S.ul}>
          <li><strong>Hybrid Cloud = Integration:</strong> Network + Identity + Monitoring + Data — sirf compute cloud pe move karna hybrid nahi hai</li>
          <li><strong>Data Gravity:</strong> Large datasets apni location pe compute attract karte hain — architecture mein factor karo</li>
          <li><strong>Connectivity:</strong> Production = Dedicated Interconnect primary + HA VPN backup. Never single VPN tunnel only.</li>
          <li><strong>Encryption on Interconnect:</strong> Private circuit ≠ encrypted. IPsec over Interconnect ya MACsec explicitly configure karo.</li>
          <li><strong>Identity = PHS + MFA:</strong> Password Hash Sync simplest aur most resilient option hai. ADFS complexity avoid karo unless specific requirement.</li>
          <li><strong>Workload Identity:</strong> Zero hardcoded credentials. Managed Identity / IRSA / GKE Workload Identity always.</li>
          <li><strong>DR mein test karo:</strong> Quarterly actual failover drills. Untested DR = no DR. RTO/RTO business se define karalo first.</li>
          <li><strong>CIDR planning:</strong> Upfront non-overlapping IP space — retrofit karna nightmare hai.</li>
          <li><strong>Zero Trust:</strong> Network perimeter gone. Identity + device + context = new security boundary.</li>
          <li><strong>7 Rs Migration:</strong> Har application ke liye deliberate strategy. Blind lift-and-shift ≠ cloud optimization.</li>
          <li><strong>VMware Hybrid:</strong> Fastest migration path for VMware estates. HCX = live migration across WAN.</li>
          <li><strong>Azure Arc vs AWS Outposts:</strong> Arc = software management bridge. Outposts = AWS hardware on-prem.</li>
          <li><strong>Cost:</strong> Network egress costs underestimated. Tag everything. Budget alerts from day 1.</li>
          <li><strong>Operations:</strong> Single pane of glass before first migration. Log centralization mandatory.</li>
          <li><strong>Career:</strong> Networking + Cloud + Security combination = highest-demand hybrid cloud engineer profile.</li>
        </ul>
      </section>

      {/* ─── FAQ ──────────────────────────────────────────────────────────── */}
      <section id="faq" style={{ marginTop: "3rem" }}>
        <h2 style={S.h2}>Frequently Asked Questions</h2>
        {hybridCloudContent.faq.map((item, i) => (
          <div key={i} style={{ marginBottom: "2rem" }}>
            <h3 style={{ ...S.h3, color: "#111827" }}>{item.question}</h3>
            <p style={S.p}>{item.answer}</p>
          </div>
        ))}
      </section>

    </article>
  );
}
