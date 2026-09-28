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
          Hybrid Cloud means a coordinated, integrated architecture of an on-premises data center and the public cloud — the two work together as one system. Simply adding cloud resources does not make it hybrid cloud; integration is required: a shared network (VPN or Interconnect), shared identity (AD Federation), unified monitoring, and workloads that can operate seamlessly across both environments.
        </p>
        <p style={S.p}>
          This article is a practical reference for DC engineers — not theory. From network design to identity federation, from disaster recovery patterns to migration strategies, from VMware hybrid to Kubernetes across environments. For every topic: what it is, why it is needed, how to implement it, and what can go wrong in production.
        </p>
        <Callout type="important" title="The Real Engineering Reality of Hybrid Cloud">
          90% of enterprises are already in hybrid cloud — whether they planned it deliberately or not. On-prem AD + Office 365 = hybrid identity. On-prem database + cloud application = hybrid data architecture. Hybrid cloud is a state that arrives automatically with phased cloud adoption. Engineering it properly — connectivity, security, identity, DR — is what this article teaches.
        </Callout>
      </section>

      {/* ─── WHAT IS HYBRID CLOUD ─────────────────────────────────────────── */}
      <section id="what-is-hybrid-cloud">
        <h2 style={S.h2}>What Is Hybrid Cloud?</h2>
        <p style={S.p}>
          Hybrid Cloud is an architecture in which on-premises private infrastructure and public cloud services (AWS, Azure, GCP) work as one integrated system. Integration means shared network connectivity, unified identity, combined monitoring, and workloads that can cross boundaries.
        </p>
        <p style={S.p}>
          Simple example: a bank's on-prem data center in Mumbai running the core banking system, and a customer-facing web application on Azure — both connected via ExpressRoute, with shared identity through Active Directory and unified monitoring through Azure Monitor. This is hybrid cloud.
        </p>

        <section id="hybrid-vs-multicloud">
          <h3 style={S.h3}>Hybrid vs Multi-Cloud vs Private Cloud</h3>
          <ComparisonTable
            headers={["Architecture", "Definition", "Key Characteristic", "Best For"]}
            rows={[
              ["Private Cloud", "Dedicated infra, single tenant (on-prem or hosted)", "Full control, no shared hardware", "Regulated sectors, classified data"],
              ["Public Cloud", "Shared AWS/Azure/GCP infrastructure", "Elastic, pay-as-you-go, no CapEx", "Cloud-native startups, variable workloads"],
              ["Hybrid Cloud", "On-prem + public cloud, integrated", "Workloads span environments seamlessly", "Most enterprises in cloud journey"],
              ["Multi-Cloud", "Multiple public clouds simultaneously", "AWS + Azure, or AWS + GCP", "Best-of-breed services, vendor lock-in avoidance"],
              ["Hybrid-Multi-Cloud", "On-prem + multiple public clouds", "Maximum flexibility, maximum complexity", "Large enterprises, global organizations"],
            ]}
          />
          <Callout type="important" title="Hybrid ≠ Multi-Cloud — Different Concepts">
            Hybrid Cloud is about on-prem. Multi-Cloud is about multiple public clouds. Both can exist simultaneously. A bank that uses on-prem core banking + AWS compute + Azure Active Directory is both hybrid and multi-cloud. Each comes with its own engineering challenges.
          </Callout>
        </section>

        <Figure caption="Hybrid Cloud vs Multi-Cloud vs Private Cloud — decision guide for enterprise architects">
          <HybridVsMultiCloudDiagram />
        </Figure>

        <section id="why-hybrid-cloud">
          <h3 style={S.h3}>Why Hybrid Cloud — Real Engineering Reasons</h3>
          <p style={S.p}>
            "Migrate everything to the cloud" — this advice sounds simple, but reality is different. Hybrid cloud exists in production for these reasons:
          </p>
          <ul style={S.ul}>
            <li><strong>Data Residency and Regulatory Compliance:</strong> RBI guidelines, HIPAA, GDPR — keeping specific data on-prem or in a specific geography is mandatory. Keeping core banking data in India is an RBI mandate — processing can happen in the cloud, but the data cannot leave.</li>
            <li><strong>Legacy Applications:</strong> A 20-year-old mainframe application is not cloud-ready. Refactor cost: millions of hours. In a hybrid architecture it stays on-prem while modern workloads move to the cloud.</li>
            <li><strong>Investment Protection:</strong> The company bought Rs. 50 crore worth of data center hardware just 3 years ago. The CFO will not agree to abandon it. Adopt cloud gradually as the hardware expires.</li>
            <li><strong>Performance Requirements:</strong> You need 1ms latency from the on-prem database. In the cloud, even within the same region, 5-10ms gets added. Ultra-low latency workloads perform better on-prem.</li>
            <li><strong>Cost Optimization:</strong> Predictable baseline workloads are cheaper on-prem (CapEx after 3 years), variable/burst workloads go to the cloud — hybrid gives the best of both worlds.</li>
          </ul>
        </section>

        <section id="data-gravity">
          <h3 style={S.h3}>Data Gravity — The Hidden Force</h3>
          <p style={S.p}>
            Data Gravity is a concept: the bigger a dataset is, the more it attracts services to its location. Moving large data is expensive (egress cost + time + bandwidth), which is why compute goes to the data — not data to the compute.
          </p>
          <p style={S.p}>
            Practical example: a retail company has a 500TB transactional database on-prem. Moving this data to the cloud would take weeks and cost Rs. 30+ lakh in egress. That is why analytics workloads also run on-prem — only those workloads go to the cloud where new data is generated in the cloud.
          </p>
          <Callout type="warning" title="Data Gravity Drives Hybrid Architecture">
            The most underestimated factor in cloud migration projects is data gravity. Moving 100TB = approximately $8,000 egress cost at $0.08/GB. Plus time. Plus application downtime. Instead of fighting against data gravity, move the compute layer close to the data — the cloud bursting pattern.
          </Callout>
        </section>

        <section id="cloud-bursting">
          <h3 style={S.h3}>Cloud Bursting</h3>
          <p style={S.p}>
            Cloud Bursting = handle normal load on-prem, overflow peak load to the cloud. Pattern: on-prem handles up to 80% capacity; above 80%, additional compute spins up in the cloud.
          </p>
          <p style={S.p}>
            Real example: Income tax filing deadline — a tax software company sees 10x traffic in March. Maintaining on-prem infra for that year-round is over-provisioning. Solution: baseline capacity on-prem, and cloud bursting in March via AWS Auto Scaling Groups that access the on-prem database over VPN.
          </p>
          <ul style={S.ul}>
            <li><strong>Requirements for Cloud Bursting:</strong> Low-latency connectivity (VPN minimum, Interconnect preferred), stateless application tier (avoid shipping state to the cloud), shared identity, pre-built cloud templates (Terraform/Bicep ready)</li>
            <li><strong>What Cannot Burst:</strong> Stateful applications (RDBMS transaction coordinator), ultra-low latency processes, applications with on-prem hardware dependencies (FPGA, HSM)</li>
            <li><strong>Kubernetes Cloud Bursting:</strong> On-prem K8s cluster as primary, cloud K8s cluster as burst target. Implement it with Cluster Federation or Virtual Kubelet.</li>
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
          The foundation of a hybrid network is the on-prem private IP space and the cloud VPC/VNet — both connected by a secure, low-latency link. Choosing and designing this link is the most critical engineering decision in hybrid architecture.
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
            A VPN is an encrypted tunnel between the on-prem VPN device and the cloud VPN gateway — it travels over the Internet. Simple, fast to set up, lower cost. But because it is an Internet path, latency stays variable and there is a bandwidth ceiling.
          </p>
          <ul style={S.ul}>
            <li><strong>HA VPN:</strong> GCP HA VPN = 2 interfaces, 4 tunnels, 99.99% SLA. AWS = active-active tunnels. Azure = active-active VPN gateways. Always configure HA in production.</li>
            <li><strong>BGP:</strong> Prefer dynamic routing (BGP) over static routes — on-prem routes are automatically advertised into the cloud, and CIDR changes propagate automatically.</li>
            <li><strong>Throughput limit:</strong> AWS VPN is 1.25Gbps per tunnel; multiple tunnels can be aggregated. For large data transfers, the VPN can become a bottleneck.</li>
            <li><strong>Dead Peer Detection (DPD):</strong> Always enable it — automatic re-establishment when a tunnel fails silently.</li>
          </ul>
        </section>

        <section id="dedicated-interconnect">
          <h3 style={S.h3}>Direct Connect / ExpressRoute / Cloud Interconnect</h3>
          <p style={S.p}>
            Dedicated Interconnect is a physical private circuit — from on-prem to the cloud provider's colocation facility (meet-me room). It does not go over the Internet. Latency is predictable and low. Bandwidth is 10Gbps or 100Gbps per circuit.
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
          <Callout type="warning" title="Dedicated Interconnect — Encryption Is Not Default">
            AWS Direct Connect, Azure ExpressRoute, and GCP Dedicated Interconnect — none of the three are encrypted by default. It is a private circuit, but it passes through shared carrier infrastructure — eavesdropping at the carrier level is theoretically possible. For compliance (PCI-DSS, HIPAA, RBI): configure IPsec over Interconnect (adds latency ~1-2ms), or MACsec (L2 wire-speed encryption — available on Direct Connect dedicated 10G+, ExpressRoute Direct, and GCP Interconnect Direct). VPN + Interconnect combination = encrypted + private path + performance.
          </Callout>
          <ul style={S.ul}>
            <li><strong>HA Design — Non-negotiable for production:</strong> Minimum 2 circuits, different colocation facilities, different metro cities preferred. Single facility failure = connectivity loss with single circuit. AWS: dual DX (2 locations) + VPN backup. Azure: dual ExpressRoute circuits (2 providers or 2 peering locations). GCP: 4 VLAN attachments across 2 metros = 99.99% SLA.</li>
            <li><strong>BGP failover design:</strong> Assign a higher BGP local-preference on the Interconnect (e.g., 200) — traffic prefers the Interconnect. Assign a lower local-preference on the VPN (e.g., 100) — automatic failover when the Interconnect BGP session drops. Failover time: BGP hold-timer = 90 seconds default (configure 10/30 for faster detection).</li>
            <li><strong>Bandwidth planning:</strong> An Interconnect circuit is dedicated bandwidth — traffic engineering is needed. Peak traffic burst exceeds circuit capacity = packet drops (unlike the Internet, where the ISP absorbs it). Capacity planning: measure 95th percentile traffic + 30% headroom.</li>
            <li><strong>Partner/Hosted Interconnect:</strong> Not a dedicated physical circuit — connectivity goes over the provider's shared infrastructure. Lower cost, faster procurement (days vs months). Bandwidth limitations. Good for: branch offices, secondary sites, lower bandwidth requirements (sub-1Gbps).</li>
          </ul>
        </section>

        <section id="sd-wan-hybrid">
          <h3 style={S.h3}>SD-WAN in Hybrid Architectures</h3>
          <p style={S.p}>
            <TopicLink slug="sd-wan" variant="inline" /> is used in hybrid architecture to connect branch offices and on-prem sites to the cloud. SD-WAN creates an overlay on top of traditional MPLS + Internet and does application-aware routing — business-critical apps on the best path, bulk transfers on the cheaper path.
          </p>
          <ul style={S.ul}>
            <li>Integrate with cloud connectivity: Cisco Viptela, VMware SASE, Palo Alto Prisma SD-WAN → connect directly to cloud VPN endpoints</li>
            <li>GCP Network Connectivity Center: SD-WAN Router Appliances can connect directly to the NCC hub</li>
            <li>Azure Virtual WAN: SD-WAN partner integrations (Barracuda, Versa, VMware) connect directly to the Virtual WAN hub</li>
            <li>AWS: connect through SD-WAN via TGW (Transit Gateway) — centralized hub-and-spoke</li>
          </ul>
        </section>

        <section id="hybrid-dns">
          <h3 style={S.h3}>Hybrid DNS Design</h3>
          <p style={S.p}>
            DNS is the unsung hero of hybrid architecture. DNS queries for on-prem resources should be resolved by on-prem DNS, queries for cloud resources by cloud DNS — and this must work seamlessly from both sides. DNS misconfiguration is a top-3 production issue in hybrid environments.
          </p>
          <ul style={S.ul}>
            <li><strong>On-prem → Cloud DNS:</strong> Configure a conditional forwarder on the on-prem DNS server (Windows DNS, BIND) — forward <code>*.cloud.internal.company.com</code> queries → to the cloud DNS resolver IP. Cloud resolver IPs: Azure 168.63.129.16 (link-local, VNet-only), AWS Route 53 Resolver inbound endpoint (custom IP in VPC), GCP Cloud DNS forwarder IP.</li>
            <li><strong>Cloud → On-prem DNS:</strong> Cloud DNS forwarder/resolver rules — <code>corp.local</code>, <code>*.ad.company.com</code>, <code>*.dc.company.com</code> → on-prem DNS server IP (private IP accessible via VPN/Interconnect). This IP must be reachable over the VPN/Interconnect path.</li>
            <li><strong>AWS Route 53 Resolver:</strong> Inbound endpoint (on-prem → VPC DNS) + Outbound endpoint (VPC → on-prem DNS). Resolver Rules define which domains are forwarded to on-prem DNS. Highly available — multiple IPs across AZs.</li>
            <li><strong>Azure DNS Private Resolver:</strong> Fully managed resolver service — replaces the need for custom DNS VMs. Inbound endpoint (accepts queries from on-prem), Outbound endpoint (forwards to on-prem DNS). Subnet-level deployment, HA built-in, scales automatically.</li>
            <li><strong>GCP Cloud DNS Private Forwarding:</strong> Forwarding rules on a Cloud DNS private zone — Cloud DNS outbound DNS forwarding for on-prem zones. DNS Peering: resolve another VPC's private zone from one VPC.</li>
            <li><strong>Split-Horizon (Split-Brain) DNS:</strong> The same domain name gives different responses internally vs externally. Example: <code>app.company.com</code> → external users: 1.2.3.4 (public IP/CDN). Internal users: 10.0.1.50 (private IP direct). Implementation: on-prem DNS serves one zone (private), public DNS a separate zone. Common issue: when the internal DNS zone and external zone go out of sync, internal users get the wrong IP.</li>
            <li><strong>Private DNS Zones:</strong> Link Azure Private DNS zones to the VNet. Associate AWS Route 53 Private Hosted Zones with the VPC. GCP Cloud DNS private zones — Project-level. Access from on-prem: forwarder → cloud resolver → private zone resolution.</li>
            <li><strong>DNS TTL and hybrid failover:</strong> Keep a low TTL (60 seconds) on production DNS — for fast DNS change propagation during disaster events. High TTL (3600 seconds) = slow DNS failover. Pre-event TTL lowering (hours before planned maintenance) is best practice.</li>
          </ul>
          <Callout type="warning" title="Azure Private DNS — 168.63.129.16 Is VNet-Internal Only">
            Azure's DNS resolver IP 168.63.129.16 is a link-local address that is reachable only from inside an Azure VNet. The on-prem DNS server cannot forward directly to this IP — not even over VPN/ExpressRoute. That is why you deploy Azure DNS Private Resolver, which listens on a real private IP in the VNet, and point the on-prem conditional forwarder to it.
          </Callout>
        </section>

        <section id="cidr-planning">
          <h3 style={S.h3}>CIDR Planning — Non-Overlapping Networks</h3>
          <p style={S.p}>
            The most avoidable and most common mistake in hybrid architecture: overlapping IP address spaces. On-prem uses 10.0.0.0/8, the cloud VPC also uses 10.0.0.0/16 — VPC peering and Direct Connect routing all fail.
          </p>
          <ul style={S.ul}>
            <li><strong>Planning rule:</strong> On-prem CIDR space and cloud CIDR space must be non-overlapping — not just for current needs, but considering future expansion too</li>
            <li><strong>Recommended split:</strong> On-prem: 10.0.0.0/8 (large org), Cloud Prod: 172.16.0.0/12, Cloud Dev: 192.168.0.0/16 — or better, vendor-specific ranges</li>
            <li><strong>Multi-cloud:</strong> AWS VPCs, Azure VNets, GCP VPCs — all on separate non-overlapping ranges. Future-proof: allocate /16 minimum per cloud per region</li>
          </ul>
          <Callout type="danger" title="Overlapping CIDRs — The Biggest Migration Headache">
            Fixing a CIDR overlap after it is discovered: re-IP existing VMs, update firewall rules, reconfigure routing — weeks of work. Plan upfront. Use an IP Address Management (IPAM) tool: InfoBlox, Netbox, or cloud-native IPAM.
          </Callout>
        </section>

        <Figure caption="Hybrid Network: VPN, Direct Connect, Partner Interconnect and SD-WAN connectivity options with production recommendation">
          <HybridNetworkDiagram />
        </Figure>
      </section>

      {/* ─── IDENTITY ─────────────────────────────────────────────────────── */}
      <section id="identity">
        <h2 style={S.h2}>Hybrid Identity — SSO Across On-Prem and Cloud</h2>
        <p style={S.p}>
          Hybrid identity means: an engineer logs in once — and accesses everything: on-prem Windows session, Azure Portal, AWS Console, Salesforce, and company internal apps. Separate passwords and separate logins = user frustration + security weakness (weak/reused passwords).
        </p>

        <section id="active-directory">
          <h3 style={S.h3}>Active Directory and Microsoft Entra ID</h3>
          <p style={S.p}>
            In a traditional enterprise, on-prem Active Directory Domain Services (AD DS) controls everything — domain login, GPO, certificate distribution, LDAP/Kerberos authentication. In the cloud, Microsoft Entra ID (formerly Azure AD) is the cloud identity provider — based on OAuth2/OIDC/SAML, for web apps.
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
            Hybrid identity involves two fundamentally different concepts that are often confused: <strong>Synchronization</strong> (copying objects into the cloud) and <strong>Federation</strong> (a trust relationship — the cloud identity provider delegates authentication to the on-prem IdP). Both can exist simultaneously.
          </p>
          <ul style={S.ul}>
            <li><strong>Synchronization (Azure AD Connect / Entra Connect Sync):</strong> On-prem AD objects (users, groups, devices) are copied into Entra ID. Shadow objects are created in the cloud. The user object exists in the cloud — the authentication method is decided separately (PHS, PTA, or ADFS). Sync interval: default 30 minutes. Delta sync. Full sync weekly.</li>
            <li><strong>Federation (ADFS / Third-party IdP):</strong> Despite sync, the actual authentication happens at the on-prem IdP. The cloud identity provider redirects the user to the on-prem IdP. A SAML assertion comes back — the cloud marks the user as logged in. Federation = authentication trust, not data copy.</li>
          </ul>
          <p style={S.p}>
            <strong>Authentication Protocols — what is used when:</strong>
          </p>
          <ul style={S.ul}>
            <li><strong>LDAP (Lightweight Directory Access Protocol):</strong> Used by on-prem applications for user authentication against AD. Port 389 (LDAP), 636 (LDAPS). There is no direct LDAP in the cloud — Azure AD Domain Services (AADDS) provides LDAP for cloud-native apps. For legacy apps that require LDAP, keeping them on-prem or using AADDS is practical.</li>
            <li><strong>Kerberos:</strong> The on-prem Windows domain authentication protocol. Domain-joined machines use ticket-based authentication — the password never travels over the network. Kerberos does not work directly in the cloud. Hybrid Kerberos: enable the Azure AD Kerberos extension — cloud users get Kerberos tickets for on-prem file shares without a password prompt.</li>
            <li><strong>SAML 2.0 (Security Assertion Markup Language):</strong> XML-based federation protocol — for enterprise SSO. ADFS, Okta, PingFederate act as SAML IdPs. Cloud apps (AWS Console, Salesforce, ServiceNow) are SAML SPs (Service Providers). Flow: User → SP → redirect to IdP → authenticate → SAML assertion → SP → logged in. Token lifetime: typically 1-8 hours. Refresh via re-authentication or session extension.</li>
            <li><strong>OAuth 2.0:</strong> An authorization framework — not authentication (a common misconception). It gives apps delegated permission to access user data without sharing the password. "Sign in with Google/GitHub" = OAuth2 + OIDC. Token types: Access token (short-lived, 1 hour typical), Refresh token (long-lived, days-months).</li>
            <li><strong>OpenID Connect (OIDC):</strong> An identity layer on top of OAuth 2.0. "OAuth adds authorization, OIDC adds authentication." The JWT ID token contains the user identity. Preferred for modern apps — REST/JSON based, mobile friendly. Entra ID, Okta, Google all support OIDC. Token lifetime: ID token 1 hour (configurable), access token short-lived.</li>
          </ul>
          <p style={S.p}>
            <strong>3 options for connecting on-prem AD and Entra ID:</strong>
          </p>
          <ul style={S.ul}>
            <li><strong>Password Hash Sync (PHS) — Recommended:</strong> A hash-of-hash of the on-prem AD password is synced to the cloud (never plain text). Authentication happens in the cloud — independent of whether the on-prem DC is up or down. Simplest deployment, most resilient (cloud auth works even during an on-prem outage). Smart Lockout: brute force protection at the cloud level. This is the optimal choice for 99% of enterprises.</li>
            <li><strong>Pass-Through Authentication (PTA):</strong> The cloud authentication request is validated against AD through a lightweight on-prem agent. The password hash is not stored in the cloud — for specific compliance requirements (e.g., password must never leave org boundary). Dependency: 3+ PTA agents must be running on-prem (for HA). Complete on-prem outage = cloud auth fails. Seamless SSO also works with PTA.</li>
            <li><strong>Federation (ADFS):</strong> The on-prem ADFS farm issues SAML/WS-Federation tokens — Entra ID maintains a trust relationship. Maximum control: custom claim rules, custom authentication policies, smart card/certificate auth possible. Maximum complexity: deploy + maintain the ADFS farm, manage SSL certs, WAP (Web Application Proxy) for external access. ADFS farm fails = cloud login fails. Recommended only when PHS/PTA are insufficient (custom claim transformation needed, specific compliance mandate).</li>
          </ul>
          <Callout type="important" title="Token Lifetime — Session Hijacking Risk">
            The lifetime of SAML tokens and OAuth access tokens is a critical security consideration. Long token lifetime (e.g., 24 hours) = if a token is stolen, the attacker gets a longer window. Short lifetime (1 hour) = more re-authentication friction. Best practice: Access token short (1 hour), Refresh token longer (24 hours) + token binding in Conditional Access + Continuous Access Evaluation (CAE), which makes revocation near-real-time. ADFS token lifetime is configured separately at the IdP level.
          </Callout>
        </section>

        <section id="iam-integration">
          <h3 style={S.h3}>AWS IAM Identity Center and GCP Cloud Identity</h3>
          <p style={S.p}>
            For multi-cloud enterprises, Entra ID alone is not enough — AWS and GCP have their own identity systems that have to be integrated.
          </p>
          <ul style={S.ul}>
            <li><strong>AWS IAM Identity Center (SSO):</strong> Central SSO for AWS accounts. Connect it to on-prem AD or Entra ID with SAML 2.0 federation. SCIM provisioning: users/groups sync automatically. Result: AWS Console and CLI access with corporate credentials.</li>
            <li><strong>GCP Cloud Identity / GCDS:</strong> Google Cloud Directory Sync — sync users from on-prem AD or Entra ID into GCP Cloud Identity. SAML federation for SSO. Workload Identity Federation: GCP access for on-prem and external identity providers (AWS, GitHub Actions) without SA keys.</li>
            <li><strong>SCIM provisioning:</strong> Automatic user lifecycle management — Entra ID → AWS/GCP. User creation/deactivation on-prem propagates automatically to cloud identity.</li>
          </ul>
        </section>

        <section id="workload-identity">
          <h3 style={S.h3}>Workload Identity — Applications Without Passwords</h3>
          <p style={S.p}>
            The principle of Workload Identity: applications do not need human credentials. Use machine identity — the cloud provider automatically provides tokens that the application uses.
          </p>
          <ul style={S.ul}>
            <li><strong>AWS:</strong> EC2 Instance Profile, ECS Task Role, EKS IRSA (IAM Roles for Service Accounts) — the application does not need IAM credentials</li>
            <li><strong>Azure:</strong> Managed Identity (system-assigned or user-assigned) — the VM or Function gets an Entra ID identity automatically</li>
            <li><strong>GCP:</strong> Compute Engine Service Account, GKE Workload Identity — the pod gets a GCP SA token automatically</li>
            <li><strong>On-prem to Cloud:</strong> Workload Identity Federation — on-prem K8s pods can call GCP APIs without an SA key file (OIDC token exchange)</li>
          </ul>
          <Callout type="best-practice" title="Production Rule: Zero Hardcoded Credentials">
            Never keep AWS access keys, Azure credentials, or GCP SA keys in application code, config files, or environment variables. Use Workload Identity. If it is legacy: fetch them at runtime from AWS Secrets Manager / Azure Key Vault / GCP Secret Manager. Key rotation must be automated.
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
            <TopicLink slug="nas" variant="inline" /> and <TopicLink slug="san" variant="inline" /> are on-prem, and the cloud has object storage — these are three fundamental storage types, each with a different hybrid bridge.
          </p>
          <p style={S.p}><strong>Block Storage (SAN / iSCSI)</strong></p>
          <ul style={S.ul}>
            <li>Replicating on-prem block storage (SAN LUNs, VMDK) to the cloud = VM-level replication is the most practical</li>
            <li><strong>Azure Site Recovery (ASR):</strong> On-prem VMware/Hyper-V VMs → Azure VMs. Continuous block-level replication via Mobility Agent. RPO as low as 30 seconds. Recovery point history configurable.</li>
            <li><strong>AWS DRS (Elastic Disaster Recovery):</strong> Agent on source server → continuous replication to staging area S3 → point-in-time recovery. Sub-second RPO.</li>
            <li><strong>Pure block sync limitation:</strong> Storage consistency group — dependent VMs (app + DB) must be on the same crash-consistent snapshot. Application-consistent snapshots = VSS/application agent coordination needed.</li>
          </ul>
          <p style={S.p}><strong>File Storage (NAS / SMB / NFS)</strong></p>
          <ul style={S.ul}>
            <li><strong>Azure File Sync:</strong> On-prem Windows Server file shares → Azure Files. Cloud tiering: recently accessed files stay local, older files go to the cloud (tiered). Users access them locally — served transparently from the cloud. Multiple servers sync with the same Azure Files share — a distributed file system replacement.</li>
            <li><strong>DFS Replication (DFSR):</strong> If on-prem DFS-R already exists, it can coexist with Azure File Sync — but gradually replace DFS-R with Azure File Sync. DFSR is not cloud-native.</li>
            <li><strong>AWS Storage Gateway — File Gateway:</strong> On-prem NFS/SMB share → S3 backend. Local cache hot data. Use case: media files, backups, NAS to cloud tiering.</li>
            <li><strong>NFS/SMB cloud-native:</strong> Azure Files (SMB + NFS), AWS EFS (NFS), GCP Filestore (NFS) — multi-VM concurrent mount possible. Mount them from on-prem over VPN/Interconnect.</li>
          </ul>
          <p style={S.p}><strong>Object Storage</strong></p>
          <ul style={S.ul}>
            <li><strong>On-prem → Cloud object sync:</strong> On-prem S3-compatible storage (MinIO, Ceph RADOS Gateway, NetApp StorageGRID) → AWS S3 / Azure Blob / GCS sync</li>
            <li><strong>AWS DataSync:</strong> On-prem NAS → S3/EFS/FSx. Up to 10Gbps per task. Checksums, retry, scheduling. Recommended for large migrations.</li>
            <li><strong>AzCopy:</strong> CLI tool, parallel uploads to Azure Blob. Supports on-prem → Azure sync with delta transfers.</li>
            <li><strong>gsutil rsync / Storage Transfer Service:</strong> Large-scale data transfer on GCP. Transfer Service: scheduled, managed service. gsutil: interactive/scripted.</li>
            <li><strong>rclone:</strong> Open-source multi-cloud sync tool — 70+ backends. Cross-cloud sync (S3 → Azure Blob, GCS → S3). Good for smaller volumes.</li>
          </ul>
          <p style={S.p}><strong>Large Data Migration — Bandwidth Considerations</strong></p>
          <ul style={S.ul}>
            <li>10TB at 1Gbps dedicated = ~22 hours. 100TB = 9+ days. 1PB = 90+ days. Online transfer often impractical for very large datasets.</li>
            <li><strong>AWS Snowball Edge:</strong> Physical appliance, 80TB usable. Ship to AWS → data loaded to S3. 100TB migration in days vs months online.</li>
            <li><strong>Azure Data Box:</strong> Similar — 80TB, 100TB, 1PB options. Ship to Microsoft DC.</li>
            <li><strong>Storage consistency during migration:</strong> Live data migration has a consistency window — initial seed copy + delta sync during cutover. Quiesce the application at cutover or accept a brief inconsistency window.</li>
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
            Traditional 3-2-1 rule: 3 copies, 2 different media, 1 offsite. Modern ransomware reality turned it into 3-2-1-1: plus 1 immutable/air-gapped copy that ransomware cannot reach.
          </p>
          <ul style={S.ul}>
            <li><strong>On-prem primary backup:</strong> Local fast backup (Veeam, Commvault, Veritas) on NAS/backup storage — fast restore, day-to-day operations. Recovery time: minutes to hours.</li>
            <li><strong>On-prem secondary:</strong> Tape or secondary NAS (different media) — protection from local ransomware if isolated. Tape offline = air-gapped by nature.</li>
            <li><strong>Cloud offsite (cross-region):</strong> AWS S3 / Azure Blob / GCS — geographic diversity. Cross-region replication: S3 Cross-Region Replication (CRR), Azure Blob GRS/GZRS, GCS dual-region. Ransomware protection: Object Lock (WORM — Write Once Read Many). Even if an attacker gains cloud credentials, immutable objects cannot be deleted during the lock period.</li>
            <li><strong>Cross-cloud backup:</strong> Primary cloud AWS → backup on Azure Blob / GCS. Extreme protection — independent of a single cloud provider compromise. Complex management but maximum resilience. Veeam, Commvault, MSP360 support cross-cloud backup.</li>
            <li><strong>Air-gapped cloud backup:</strong> AWS S3 Object Lock Compliance mode — not even the AWS admin can delete during the lock period. Azure Immutable Blob Storage — time-based retention lock. GCS Object Lock. This is a "virtual air gap" — logically air-gapped even though network-accessible during writes.</li>
          </ul>
          <p style={S.p}><strong>Backup Verification — Most Neglected Practice</strong></p>
          <ul style={S.ul}>
            <li><strong>SureBackup (Veeam):</strong> Automated backup testing — restore the VM in an isolated network, run application tests, verify that it boots and the application responds. Every backup automatically verified.</li>
            <li><strong>Recovery drills:</strong> Quarterly actual restore from backup — not just check job status. "Backup complete" ≠ "restore will work." Test full application stack restore, not just individual files.</li>
            <li><strong>Checksum validation:</strong> DataSync, Azure Backup, AWS Backup — checksums verify backup integrity. You should not discover a corrupted backup during a DR event — run regular integrity checks.</li>
            <li><strong>Retention testing:</strong> Verify 90-day-old backup actually accessible and restorable — long-term retention often untested until needed.</li>
          </ul>
          <ul style={S.ul}>
            <li><strong>Tools:</strong> Veeam B&R → Azure Blob (S3-compatible endpoint too), Commvault → multi-cloud, AWS Backup for cloud-native (EC2, RDS, DynamoDB, EFS), Azure Backup for VMs + on-prem via MARS/MABS agent, GCP Backup for GKE + Compute snapshots</li>
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
          The starting point of DR planning is always business requirements — technical implementation comes later. For a bank, a 1-minute RTO and zero RPO is what is acceptable. For an internal HR portal, a 4-hour RTO and 1-day RPO may be sufficient.
        </p>

        <section id="rpo-rto">
          <h3 style={S.h3}>RPO and RTO — Engineering Definitions</h3>
          <p style={S.p}>
            <strong>RPO (Recovery Point Objective):</strong> Maximum acceptable data loss — "how old can the data be after failover?" RPO 1 hour = a maximum of 1 hour of data loss is acceptable. Technically: replication frequency determines RPO.
          </p>
          <p style={S.p}>
            <strong>RTO (Recovery Time Objective):</strong> Maximum acceptable downtime — "within how much time must the system be up?" RTO 30 minutes = the system must be operational within 30 minutes of the disaster. Technically: failover automation speed determines RTO.
          </p>
          <Callout type="important" title="The Process of Setting RPO and RTO">
            RPO/RTO are defined by business stakeholders, not by engineers. Engineers calculate what is achievable at what cost. For an application with Rs. 1 crore/hour revenue loss, a Rs. 50 lakh/year DR investment is justified. For an internal email system, a 4-hour RTO at much lower cost. This conversation must happen with the CFO/CTO.
          </Callout>
        </section>

        <section id="cold-dr">
          <h3 style={S.h3}>Cold DR — Backup and Restore</h3>
          <p style={S.p}>
            The simplest and cheapest DR pattern. A disaster hits production → spin up resources in the cloud → restore from backups. Normally nothing runs in the cloud (except backup storage).
          </p>
          <ul style={S.ul}>
            <li>Store VM snapshots regularly in cloud object storage</li>
            <li>Copy database backups to the cloud (compressed, encrypted)</li>
            <li>Keep Infrastructure as Code (Terraform/Bicep) templates ready — so the environment can be recreated with one command</li>
            <li>Have a tested restore procedure documented — do not test it for the first time during a DR event</li>
            <li><strong>Limitation:</strong> RTO hours-to-days. Acceptable for non-critical systems only.</li>
          </ul>
        </section>

        <section id="pilot-light">
          <h3 style={S.h3}>Pilot Light</h3>
          <p style={S.p}>
            "A gas stove whose pilot flame is always on" — core components are always running in the cloud (database replica, core DNS, minimal networking), but not the application servers. On disaster: promote the DB, launch application servers from images, fail over DNS.
          </p>
          <ul style={S.ul}>
            <li>A database read replica is continuously running and syncing in the cloud</li>
            <li>AMIs/VM Images are pre-baked and ready (application layers already configured)</li>
            <li>VPC/VNet, subnets, security groups — already created, just no compute running</li>
            <li>Failover: DB promote + launch EC2/Azure VMs from images + Route 53/Traffic Manager DNS update</li>
            <li><strong>RTO:</strong> 30-60 minutes typical. <strong>RPO:</strong> Minutes (replication lag).</li>
          </ul>
        </section>

        <section id="warm-standby">
          <h3 style={S.h3}>Warm Standby</h3>
          <p style={S.p}>
            A scaled-down but fully functional replica is running in the cloud. Application servers are running (small instance sizes), and the database is actively replicating. On disaster: scale up instances + promote DB + DNS failover.
          </p>
          <ul style={S.ul}>
            <li>Set minimum instances on Auto Scaling Groups / VMSS — the application stays warm</li>
            <li>The load balancer is configured but traffic is not being routed (health check-based)</li>
            <li>Database: active-passive replica, near-zero lag</li>
            <li>Health check automation: DNS failover health check fails → traffic automatically shifts to cloud</li>
            <li><strong>RTO:</strong> Minutes. <strong>RPO:</strong> Seconds.</li>
          </ul>
        </section>

        <section id="active-active">
          <h3 style={S.h3}>Active-Active Architecture</h3>
          <p style={S.p}>
            Both sites serve traffic simultaneously — on-prem and cloud. A Global Load Balancer (Route 53 latency routing, Azure Traffic Manager, GCP global LB) distributes traffic. On a site failure, the remaining site handles all the traffic.
          </p>
          <ul style={S.ul}>
            <li>Database: the most complex part — multi-master replication (CockroachDB, Cloud Spanner, Cassandra) or write-to-primary with read replicas</li>
            <li>Session affinity: stateless application design is mandatory, or sticky sessions on the global LB</li>
            <li>RTO/RPO: theoretically near-zero — LB health check fails → traffic is rerouted after the DNS TTL. Critical: the DNS TTL has to be lowered before the DR event (e.g., to 60 seconds from 3600 beforehand). High TTL = slow failover even with health checks working.</li>
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
            VMware's enterprise install base is massive — most enterprises have been running on VMware for 10+ years. VMware Hybrid Cloud Extensions (HCX) extends the on-prem vSphere environment to cloud VMware — VM migration without IP address change, without application downtime.
          </p>
          <ul style={S.ul}>
            <li><strong>VMware Cloud on AWS:</strong> Run a VMware SDDC on AWS bare metal — same vCenter, same vSphere APIs, same networking. Migration: HCX cold/warm/live migration. Migrating 100s of VMs in a week is possible.</li>
            <li><strong>Azure VMware Solution (AVS):</strong> A dedicated VMware SDDC on Azure. Direct ExpressRoute connection from on-prem vCenter. M365/Azure native integration.</li>
            <li><strong>Google Cloud VMware Engine (GCVE):</strong> A VMware SDDC on GCP. Connect to on-prem via Interconnect.</li>
            <li><strong>HCX migration modes:</strong> Cold (shutdown → copy → startup), Warm (pre-copy then cutover), Live (vMotion across WAN — near zero downtime). Live migration requires low-latency link.</li>
          </ul>
          <Callout type="important" title="VMware Hybrid = Fastest Migration Path for Most Enterprises">
            In VMware-to-cloud migration, re-IP, OS changes and application testing are all avoided when you use a VMware Cloud solution. Tradeoff: higher cost than native cloud VMs. Strategy: VMware Cloud as migration staging → then gradually replatform to native cloud services (RDS instead of SQL on VM).
          </Callout>
        </section>

        <section id="azure-arc">
          <h3 style={S.h3}>Azure Arc</h3>
          <p style={S.p}>
            Azure Arc is a software-based control plane extension — it projects the Azure management plane (ARM) onto on-prem machines, Kubernetes clusters and databases. On-prem servers appear in the Azure Portal, Azure Policy is applied, and Defender for Cloud monitors them.
          </p>
          <ul style={S.ul}>
            <li><strong>Arc-enabled servers:</strong> Register on-prem Windows/Linux servers in Azure — Azure Policy (OS patching compliance), Defender for Cloud (threat detection), Azure Monitor (metrics/logs), Update Manager</li>
            <li><strong>Arc-enabled Kubernetes:</strong> Manage on-prem K8s clusters (Rancher, OpenShift, vanilla) from Azure — GitOps deployments (Flux), Azure Policy for K8s, Defender for Containers</li>
            <li><strong>Arc-enabled SQL Server:</strong> On-prem SQL Server instances visible in Azure — licensing, security assessments, Defender for SQL</li>
            <li><strong>Key distinction:</strong> Arc is a management bridge, AWS Outposts is hardware. With Arc the on-prem hardware is yours; you install the Arc agent.</li>
          </ul>
        </section>

        <section id="aws-outposts">
          <h3 style={S.h3}>AWS Outposts</h3>
          <p style={S.p}>
            AWS Outposts is a managed hardware rack that is installed in your data center. AWS EC2, EBS, EKS, RDS — same APIs, same console, same experience — run on-prem. The hardware belongs to AWS and AWS maintains it.
          </p>
          <ul style={S.ul}>
            <li>Use case: when you need ultra-low latency AWS services on-prem (manufacturing floor automation, retail POS), or data residency requires AWS-native services alongside on-prem</li>
            <li>Network: an Outpost depends on the backhaul connection to the AWS Region — Region connectivity fails = Outpost services can degrade</li>
            <li>Cost: significant — rack rental + AWS services. Justify it only when latency or residency requirements mandate it.</li>
            <li>Outposts Servers: smaller form factor — 1U/2U servers for edge locations, branch offices</li>
          </ul>
        </section>

        <section id="azure-stack-hci">
          <h3 style={S.h3}>Azure Stack HCI</h3>
          <p style={S.p}>
            Azure Stack HCI is on-prem hyperconverged infrastructure that is managed as an Azure service. Windows Server + Storage Spaces Direct + Azure Arc integration — deploy on standard hardware, manage from the Azure portal.
          </p>
          <ul style={S.ul}>
            <li>Run Windows VMs + Azure Kubernetes Service (AKS on HCI) on-prem</li>
            <li>Azure benefits: monthly billing, Azure Hybrid Benefit for Windows licensing, Azure Monitor integration</li>
            <li>Connectivity: it is registered with Azure — Internet connectivity is required for the Azure portal management plane</li>
            <li>Use case: Branch offices, retail stores, manufacturing sites — Azure-managed on-prem compute</li>
          </ul>
        </section>

        <section id="google-distributed-cloud">
          <h3 style={S.h3}>Google Distributed Cloud</h3>
          <p style={S.p}>
            Google Distributed Cloud (GDC) is for running GCP services on-prem or at edge locations. Air-gapped (no internet) or connected options. Kubernetes-native — GKE clusters on-prem, with a Google-managed control plane.
          </p>
          <ul style={S.ul}>
            <li>GDC Hosted: Google-managed infrastructure in your facility — same as the Outposts model</li>
            <li>GDC Edge: Smaller appliance for edge/branch deployments</li>
            <li>Air-gapped option: for government and defence sectors — no Internet connectivity needed</li>
          </ul>
        </section>

        <section id="kubernetes-hybrid">
          <h3 style={S.h3}>Kubernetes in Hybrid Cloud</h3>
          <p style={S.p}>
            Kubernetes is the natural execution platform for hybrid cloud — workloads are portable and infrastructure is abstracted. The same Kubernetes manifests can run on-prem and in the cloud. But even "portable" workloads have to wrestle with networking, storage and identity differences.
          </p>
          <ul style={S.ul}>
            <li><strong>Multi-cluster pattern:</strong> On-prem cluster (baseline) + cloud cluster (burst). Ingress routing decides where traffic goes. Challenge: cross-cluster service discovery and network connectivity have to be managed.</li>
            <li><strong>EKS Anywhere:</strong> AWS-managed Kubernetes on-prem — run it on bare metal or VMware. Same EKS APIs, same tooling. AWS support available. Connected mode: EKS Connector → manage from the EKS console. Disconnected mode is also possible (air-gapped). Use case: strict on-prem latency/data requirements but AWS tooling is needed.</li>
            <li><strong>AKS Hybrid (AKS on Azure Stack HCI / Windows Server):</strong> Azure-managed Kubernetes on-prem. Deploy AKS on Azure Stack HCI or Windows Server 2019/2022. Managed from the Azure portal. Azure Monitor for containers integration. Arc-enabled — the same Azure policies apply.</li>
            <li><strong>Cluster Federation vs Multi-cluster management:</strong> KubeFed (deprecated), Admiralty, Liqo — complex, limited adoption. Practical alternative: fleet management tools (Rancher Fleet, ArgoCD + ApplicationSets) centrally manage multiple independent clusters without federation complexity.</li>
            <li><strong>Cross-cluster networking:</strong> Submariner — pod-to-pod connectivity between clusters across L3 boundaries. Cilium Cluster Mesh — multi-cluster service discovery + network policy. Service Mesh (Istio multicluster): mTLS across clusters, traffic management, observability.</li>
            <li><strong>GitOps for hybrid K8s:</strong> ArgoCD ApplicationSets — deploy to multiple clusters from one template. Flux Multi-Tenancy — sync on-prem and cloud clusters from a Git repo. Configuration drift is detected and remediated automatically.</li>
            <li><strong>Container image registry:</strong> On-prem registry (Harbor, JFrog Artifactory) → cloud registry replication. Avoid: cloud registry pull over the Internet in production — latency, egress costs. Solution: an on-prem registry mirror, or replicate to the cloud registry + pull over VPN/Interconnect.</li>
          </ul>
        </section>

        <section id="openshift-anthos">
          <h3 style={S.h3}>Red Hat OpenShift and Google Anthos</h3>
          <p style={S.p}>
            <strong>Red Hat OpenShift Container Platform:</strong> An enterprise Kubernetes distribution — runs on-prem (bare metal, VMware, RHEL), on AWS (ROSA), Azure (ARO), GCP, and IBM Cloud. Unified management console (OpenShift Console), built-in CI/CD (Tekton, ArgoCD), Service Mesh (Istio via OpenShift Service Mesh), monitoring (Prometheus stack built-in). Many large Indian enterprises (banks, telcos, PSUs) are on OpenShift — it is a natural stepping stone for cloud migration: on-prem OpenShift → ROSA (managed AWS) or ARO (managed Azure) with the same tooling.
          </p>
          <p style={S.p}>
            <strong>Google Anthos / GKE Enterprise:</strong> GCP's multi-cloud Kubernetes platform — GKE-managed clusters on-prem (Anthos on bare metal, Anthos on VMware), on AWS, and on Azure. Components: Anthos Service Mesh (Istio-based, managed), Anthos Config Management (policy-as-code via Git — OPA/Gatekeeper), Cloud Monitoring + Logging integration. Anthos Config Management + Policy Controller = consistent security policies across all clusters. Use case: GCP-centric enterprises that want consistent policy enforcement across on-prem + cloud.
          </p>
        </section>
      </section>

      {/* ─── SECURITY ─────────────────────────────────────────────────────── */}
      <section id="security">
        <h2 style={S.h2}>Hybrid Cloud Security</h2>
        <p style={S.p}>
          Hybrid cloud security is fundamentally different from traditional perimeter security. The "network boundary" is no longer clear — on-prem, VPN, cloud and internet traffic are mixed. The perimeter-based model fails.
        </p>

        <section id="zero-trust">
          <h3 style={S.h3}>Zero Trust Architecture</h3>
          <p style={S.p}>
            Zero Trust model: "Never trust, always verify." No implicit trust comes from network location — whether you are connected over VPN or sitting in the office, every request is verified on the basis of identity + device health + context.
          </p>
          <ul style={S.ul}>
            <li><strong>Identity as perimeter:</strong> An identity boundary instead of a network boundary. Strong authentication (MFA, FIDO2) + conditional access (device compliance, location, risk score)</li>
            <li><strong>Device trust:</strong> Managed/compliant devices get access, unmanaged devices get limited or no access. Enforce Intune/JAMF device compliance + Conditional Access.</li>
            <li><strong>Just-in-time access:</strong> Privileged admin access should not be permanently available — request it on demand through JIT (Azure PIM, AWS IAM Identity Center temporary elevated access).</li>
            <li><strong>Assume breach:</strong> The same suspicious mindset even on the internal network — lateral movement detection, anomaly alerting.</li>
            <li><strong>Products:</strong> Microsoft Entra ID + Conditional Access, Zscaler ZPA, Palo Alto Prisma Access, BeyondCorp (GCP) — these replace the "corporate VPN".</li>
          </ul>
        </section>

        <section id="network-security">
          <h3 style={S.h3}>Network Security — Firewalls and Microsegmentation</h3>
          <ul style={S.ul}>
            <li><strong>Perimeter <TopicLink slug="firewall" variant="inline" />:</strong> Maintain both on-prem NGFW (Palo Alto, Fortinet, Check Point) and cloud-native firewall (AWS Network Firewall, Azure Firewall, GCP Cloud Armor)</li>
            <li><strong>Microsegmentation:</strong> Filter east-west traffic (within the data center or cloud) too. A traditional firewall only looked at north-south (Internet ↔ DC). Microsegmentation: VMware NSX, AWS Security Groups (per-instance), Azure NSG (subnet/NIC), GCP Firewall Rules (VPC level, tag-based)</li>
            <li><strong>WAF (Web Application Firewall):</strong> Filter OWASP Top 10 attacks — prefer cloud-native WAF (AWS WAF, Azure WAF, Cloud Armor) for internet-facing applications</li>
            <li><strong>DDoS protection:</strong> Cloud-native DDoS (AWS Shield, Azure DDoS Protection, Cloud Armor Adaptive) scales better than on-prem DDoS (Radware, Arbor) — the traffic is absorbed in the cloud</li>
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
            Protecting the encryption keys themselves is as important as encryption. If the keys are compromised, encrypted data no longer has any useful protection.
          </p>
          <ul style={S.ul}>
            <li><strong>Cloud KMS:</strong> AWS KMS, Azure Key Vault, GCP Cloud KMS — managed key storage, automatic rotation, audit logging. Default choice.</li>
            <li><strong>Customer-Managed Keys (CMEK/BYOK):</strong> Your key, stored in the cloud provider's KMS. Revoke the keys → data becomes inaccessible. For regulated industries.</li>
            <li><strong>Cloud HSM:</strong> AWS CloudHSM, Azure Dedicated HSM, GCP Cloud HSM — dedicated hardware security module. FIPS 140-2 Level 3 compliance. Most expensive, highest security.</li>
            <li><strong>On-prem HSM + cloud:</strong> Use Thales/Entrust on-prem HSM keys from the cloud KMS via an external key manager (EKM/HYOK). Keys never leave your HSM.</li>
            <li><strong>HashiCorp Vault:</strong> On-prem or cloud-agnostic secrets management — multi-cloud consistent secret store, dynamic credentials (AWS IAM temporary creds on demand), PKI management.</li>
          </ul>
        </section>

        <section id="pam-bastion">
          <h3 style={S.h3}>PAM, Bastion Hosts and JIT Access</h3>
          <p style={S.p}>
            Privileged Access Management (PAM) is critical in hybrid cloud — admins need access to on-prem servers, cloud VMs, databases and network devices. When this access stays unmanaged, it becomes the biggest attack vector.
          </p>
          <ul style={S.ul}>
            <li><strong>Privileged Access Workstation (PAW):</strong> A dedicated hardened machine for admin tasks — no regular Internet browsing/email from this machine. Separate identity, locked-down OS. On-prem and cloud admin access only from the PAW.</li>
            <li><strong>PAM Tools:</strong> CyberArk, BeyondTrust, Delinea (Thycotic) — password vaulting (admin passwords checked out, auto-rotated after session), session recording, privileged session monitoring. Cloud: Azure PIM (Privileged Identity Management), AWS IAM Identity Center temporary elevated access.</li>
            <li><strong>Bastion Hosts:</strong> Jump server — no direct SSH/RDP from the public Internet; connect to the bastion first, then access internal resources. Cloud-native: AWS Systems Manager Session Manager (no open ports needed, IAM-authenticated), Azure Bastion (browser-based RDP/SSH via portal), GCP Identity-Aware Proxy (IAP) TCP forwarding. On-prem: hardened jump server, session logging mandatory.</li>
            <li><strong>Just-in-Time (JIT) Access:</strong> Admin access should not be permanently available — you request it, it gets approved, you receive time-limited access, and it is revoked automatically. Azure PIM: eligible role assignment → activate when needed (1-8 hours, requires justification + MFA). AWS IAM Identity Center: temporary elevated permissions with time limit. CyberArk: password checkout → auto check-in + rotation after session.</li>
            <li><strong>No permanent admin accounts:</strong> There is one break-glass account (emergency), in a vault, MFA required, access logged. Regular admins do not have permanent admin rights — JIT elevation always.</li>
          </ul>
        </section>

        <section id="certificate-lifecycle">
          <h3 style={S.h3}>Certificate Lifecycle and Secrets Management</h3>
          <p style={S.p}>
            Certificate expiry is the most preventable and most common cause of outages in hybrid environments. Certificates are on on-prem servers, VPN gateways, ADFS, load balancers and cloud services — everywhere, and tracking them is complex.
          </p>
          <ul style={S.ul}>
            <li><strong>Certificate inventory:</strong> First step — know where all your certificates are. Tools: Venafi, DigiCert CertCentral, Keyfactor — automated certificate discovery. Network scanners (Qualys, Nessus) scan for certificate expiry.</li>
            <li><strong>Expiry monitoring:</strong> 90/60/30/7 day alerts — multiple channels (email + ITSM ticket). Knowledge of certificate expiry should not rest with just one person.</li>
            <li><strong>Auto-renewal:</strong> Public certs: ACME protocol (Let's Encrypt, ZeroSSL) — certbot, cert-manager (Kubernetes). Private PKI: on-prem CA (ADCS) auto-enrollment for domain-joined machines. Cloud: AWS Certificate Manager (ACM) auto-renews ACM-issued certs; Azure App Service managed certs auto-renew; GCP Certificate Manager.</li>
            <li><strong>VPN/ADFS certificates:</strong> These manually managed often — highest risk. ADFS token signing cert expiry = SSO completely fails. VPN cert expiry = hybrid connectivity fails. Both require maintenance window to renew. Calendar reminder + PAM process for renewal.</li>
            <li><strong>Secrets Management best practices:</strong> AWS Secrets Manager: automatic rotation (Lambda-based). Azure Key Vault: secret versioning + near-expiry alerts. GCP Secret Manager: secret versions, IAM per secret. HashiCorp Vault: dynamic secrets (credentials generated on-demand, automatically expire). Never store secrets in: environment variables (visible in process list), application config files (git history risk), container images.</li>
          </ul>
          <Callout type="warning" title="ADFS Certificate Expiry — Silent Business Killer">
            ADFS has two certificate types: Token-Signing and Token-Decrypting. Default validity is 1 year. Auto-renewal is on by default, but relying parties (cloud apps) also have to update the new cert fingerprint. If this sync is missed, the ADFS cert gets renewed while the cloud app still expects the old cert → SSO broken, no login possible. A quarterly ADFS cert health check is mandatory.
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
            Having different tools in hybrid cloud creates blind spots — on-prem Nagios sees one thing, CloudWatch sees something else, Zabbix something different. A single pane of glass is mandatory for production support.
          </p>
          <ul style={S.ul}>
            <li><strong>Option 1 — Vendor-agnostic:</strong> Prometheus + Grafana + Alertmanager — collect metrics from both on-prem and cloud, central Grafana dashboards. Open source, highly customizable.</li>
            <li><strong>Option 2 — Commercial APM:</strong> Datadog, Dynatrace, New Relic — agents on on-prem servers as well as cloud resources. Single console, ML-based anomaly detection. Expensive but mature.</li>
            <li><strong>Option 3 — Cloud-extend:</strong> Azure Monitor + Azure Arc = on-prem servers in Azure Monitor. AWS CloudWatch agent on on-prem servers. Native but tied to one cloud vendor.</li>
            <li><strong>SLO-based monitoring:</strong> More mature than a simple "CPU 90% alert": define SLIs (request success rate, latency p99), SLOs (99.9% requests &lt;200ms), error budget tracking.</li>
          </ul>
        </section>

        <section id="cmdb-itsm">
          <h3 style={S.h3}>CMDB, ITSM and Incident Response</h3>
          <p style={S.p}>
            Configuration Management Database (CMDB) and IT Service Management (ITSM) are especially important in hybrid cloud — assets are scattered across on-prem + cloud + multiple accounts, and without centralized visibility there is operational chaos.
          </p>
          <ul style={S.ul}>
            <li><strong>CMDB for hybrid:</strong> ServiceNow CMDB, BMC Helix, Freshservice — discover cloud resources automatically (AWS Service Catalog MDS, Azure CMDB sync, GCP Asset Inventory → CMDB integration). On-prem assets: agent-based discovery (ServiceNow MID Server). CMDB = single truth — "where is this server? who owns it? what is running on it?"</li>
            <li><strong>Cloud Asset Inventory:</strong> AWS Config — track all resource configurations, audit changes, evaluate compliance rules. Azure Resource Graph — cross-subscription resource queries. GCP Cloud Asset Inventory — org-wide asset snapshot. These are cloud-native supplements to the CMDB.</li>
            <li><strong>ITSM Integration:</strong> Alerts → ITSM ticket automatically. ServiceNow, Jira Service Management, Freshservice — monitoring alerts create tickets directly. Change management: cloud infrastructure changes must also be governed through change tickets (CAB approval for production changes).</li>
            <li><strong>Incident response in hybrid:</strong> On-call runbooks: hybrid-specific. Runbook step 1: is it an on-prem or a cloud issue? Network layer check (VPN/Interconnect) → identity layer → application layer. War room: Slack/Teams channel per incident, video bridge, timeline document. Post-incident: blameless retrospective within 48 hours — root cause + action items.</li>
            <li><strong>On-call rotations:</strong> Hybrid = coordination needed between the on-prem team and the cloud team. PagerDuty/OpsGenie escalation policies: first L1 SRE → 15 min no response → L2 cloud engineer → L3 architect. A cross-team war room for hybrid incidents is mandatory.</li>
          </ul>
        </section>

        <section id="logging-strategy">
          <h3 style={S.h3}>Centralized Logging</h3>
          <ul style={S.ul}>
            <li><strong>Log aggregation:</strong> On-prem syslog → SIEM. Cloud logs → Cloud Logging / CloudWatch Logs. Bridge: Fluent Bit / Logstash → central log store (Elasticsearch, Splunk, Azure Log Analytics, Chronicle)</li>
            <li><strong>Retention policy:</strong> Security logs: 1 year minimum (PCI-DSS: 1yr, HIPAA: 6yr). Application logs: 90 days hot, 1 year cold storage. Archive to cloud object storage (cheap, durable).</li>
            <li><strong>Cloud Audit Logs mandatory:</strong> AWS CloudTrail (all APIs), Azure Activity Log, GCP Cloud Audit Logs (Admin Activity) — always enabled. These tell you who did what — critical for forensics.</li>
            <li><strong>SIEM integration:</strong> Cloud logs → SIEM (Splunk, Sentinel, Chronicle) — correlate on-prem + cloud events for threat detection. Example: on-prem AD login + cloud API call from same user in 2 different countries simultaneously = alert.</li>
          </ul>
        </section>

        <section id="cost-management">
          <h3 style={S.h3}>Cost Management and FinOps</h3>
          <p style={S.p}>
            Hybrid cloud cost management: on-prem CapEx + cloud OpEx = a complex equation. FinOps (Financial Operations) practice: financial accountability + engineering efficiency + business value alignment — all three teams, Cloud + Finance + Engineering, together.
          </p>
          <ul style={S.ul}>
            <li><strong>Tagging strategy:</strong> Environment, team, application, cost-center tags mandatory on ALL cloud resources — enforce with Org Policy / SCP. Without tags, cost attribution is impossible.</li>
            <li><strong>Cost visibility:</strong> AWS Cost Explorer, Azure Cost Management, GCP Billing + BigQuery export — daily reports. Anomaly alerts (sudden 50% cost spike). Unified view: CloudHealth, Apptio Cloudability, Spot.io tools consolidate multi-cloud cost.</li>
            <li><strong>Reserved/Committed capacity:</strong> Baseline compute → Reserved Instances / Azure Reserved VM / CUDs. Variable → On-demand. Spot/Preemptible → batch workloads. Right-mix saves 40-70%.</li>
            <li><strong>Network egress costs:</strong> Often underestimated. On-prem to cloud data transfer is mostly free, cloud to on-prem (egress) = $0.08-0.09/GB. 100TB = $8,000+. Plan data flows in the architecture.</li>
            <li><strong>Idle resource cleanup:</strong> AWS Trusted Advisor, Azure Advisor, GCP Recommender — identify idle VMs, unattached disks, unused reserved capacity. Automated scheduler: dev/test VMs off after hours.</li>
          </ul>
          <p style={S.p}><strong>Chargeback vs Showback:</strong></p>
          <ul style={S.ul}>
            <li><strong>Showback:</strong> Show business units their cloud spend (report) — but billing stays centralized. Awareness increases, but behavior does not necessarily change. Good starting point.</li>
            <li><strong>Chargeback:</strong> Business units pay their actual cloud costs (internal billing). Behavior changes — teams optimize when they are charged directly. Requires mature tagging + cost allocation + internal billing system.</li>
            <li><strong>Implementation:</strong> Map cost centers through tags. AWS Cost Allocation Tags, Azure Cost Management cost allocation rules, GCP Billing labels. Email monthly reports automatically to business unit leads.</li>
          </ul>
          <p style={S.p}><strong>License Optimization:</strong></p>
          <ul style={S.ul}>
            <li><strong>Azure Hybrid Benefit:</strong> Use existing on-prem Windows Server + SQL Server licenses → on Azure VMs. 40-85% VM cost savings for Windows workloads. Check which licenses are eligible for AHUB (Azure Hybrid Use Benefit).</li>
            <li><strong>AWS License-Included vs BYOL:</strong> RDS SQL Server license-included vs BYOL (Bring Your Own License). For large SQL estates, BYOL is cheaper if licenses are available.</li>
            <li><strong>License Mobility:</strong> Licenses with Microsoft SA (Software Assurance) can be moved to Azure. Existing per-core licenses can be used on dedicated hosts (AWS Dedicated Hosts, Azure Dedicated Hosts).</li>
            <li><strong>SaaS migration as license optimization:</strong> On-prem Exchange → Microsoft 365. Server licenses eliminate, per-user subscription. On-prem SQL → Azure SQL PaaS. SQL license embedded in PaaS pricing.</li>
            <li><strong>FinOps maturity model:</strong> Crawl (visibility — tagging, dashboards) → Walk (optimization — reserved capacity, right-sizing) → Run (automation — auto-scaling, scheduled shutdowns, anomaly-driven alerts).</li>
          </ul>
        </section>

        <section id="compliance-governance">
          <h3 style={S.h3}>Compliance and Governance</h3>
          <ul style={S.ul}>
            <li><strong>Policy as Code:</strong> AWS SCP (Service Control Policies) — Organization level resource restrictions. Azure Policy — resource creation rules, audit compliance. GCP Org Policies — same. Example: "No public S3 buckets allowed in prod account" — enforce it with an SCP, not manual review.</li>
            <li><strong>Change management:</strong> All infrastructure on IaC (Terraform/Bicep/CDK) — Git history = audit trail. PRs = peer review = governance. No console-only changes in production.</li>
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
            If the cloud provider is compliant, your workload is not automatically compliant. PCI-DSS: AWS is PCI-DSS certified, but your application architecture, code and access controls are all assessed independently. Cloud provider controls + your controls + configuration = combined compliance posture. An annual QSA (Qualified Security Assessor) assessment is mandatory for PCI-DSS Level 1.
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
          The most useful framework in cloud migration planning is the "7 Rs" — decide a strategy for each application before writing any code. Blind "lift and shift" carries the same problems that existed on-prem into the cloud.
        </p>

        <section id="migration-7rs">
          <h3 style={S.h3}>Retire, Retain, Rehost, Relocate</h3>
          <ul style={S.ul}>
            <li><strong>Retire (Decommission):</strong> The application is simply no longer needed. 20-30% of applications are typically retire candidates. License costs, maintenance burden — eliminate them. Action: shutdown + data archive + notify users.</li>
            <li><strong>Retain (Keep on-prem):</strong> Not moving it to the cloud is the suitable choice — compliance, latency, dependency, recently purchased hardware. Decide explicitly that you are retaining it — not "haven't gotten to it yet."</li>
            <li><strong>Rehost (Lift & Shift):</strong> Move the VM to the cloud as-is. Same OS, same app, same config — on a cloud VM. Fastest migration. No cloud optimization. Use when: fast migration is needed and a refactor is planned for later. Tools: AWS MGN, Azure Migrate, Google Migrate to VMs.</li>
            <li><strong>Relocate:</strong> VMware on-prem → onto VMware Cloud (same vCenter APIs). HCX migration. Minimal change, fast cutover. Use when: large VMware estate, time-critical migration.</li>
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
            <li><strong>Phase 1 — Discovery:</strong> Application portfolio assessment. Map dependencies (which app talks to which DB, which service). AWS Migration Hub, Azure Migrate, Google RISC (Rapid Infrastructure Software Compliance) + Migrate to VMs — automated discovery tools.</li>
            <li><strong>Phase 2 — Strategy:</strong> A 7R decision for every application. Prioritize: quick wins first (retire + rehost simple apps), complex refactors later.</li>
            <li><strong>Phase 3 — Pilot:</strong> Start with a non-production environment. Learn: networking, identity, monitoring setup. Make your mistakes here — not in production.</li>
            <li><strong>Phase 4 — Wave migrations:</strong> Migrate groups of applications (waves). Apps with the same dependencies go in the same wave. Cutover plan: maintenance window, rollback procedure, user communication.</li>
            <li><strong>Phase 5 — Optimize:</strong> Post-migration: right-size instances (was over-provisioned on-prem), reserved capacity, delete unused resources, implement cloud-native services.</li>
          </ul>
          <Callout type="warning" title="The Common Failure Mode of Migration Projects">
            The team puts its entire focus on application migration, and then discovers that networking has not been built, identity is not configured, there is no monitoring, security policies are missing, and compliance requirements were missed. Pre-migration: connectivity, identity, monitoring, governance — everything must be ready before the first application migration.
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
            A realistic hybrid architecture for a large Indian enterprise (manufacturing company, 5000 employees, 3 plants, Mumbai HQ):
          </p>
          <ul style={S.ul}>
            <li><strong>Network:</strong> Mumbai HQ → Azure (ExpressRoute primary 1Gbps, VPN backup) + AWS (Direct Connect via same colo, VPN backup). Plant offices → MPLS → HQ → cloud.</li>
            <li><strong>Identity:</strong> On-prem AD DS (2 domain controllers) → Entra ID (Azure AD Connect PHS). AWS IAM Identity Center federated with Entra ID via SAML. Single login: Windows PC → Azure Portal → AWS Console → Salesforce.</li>
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
            ["CIDR", "Non-overlapping IP ranges planned upfront across all environments", "Avoid VPC peering + routing failures"],
            ["DNS", "Conditional forwarders both directions — bi-directional DNS resolution", "Seamless name resolution across environments"],
            ["Identity", "Password Hash Sync (PHS) + MFA + Conditional Access", "Simplest + resilient + secure combination"],
            ["Workload Identity", "Zero hardcoded credentials — Managed Identity / IRSA always", "Prevent secret leakage"],
            ["DR", "Quarterly DR drills — test actual failover, not just planning", "Untested DR = No DR"],
            ["Storage", "Lifecycle policies + cloud tiering from day 1", "Storage costs don't surprise later"],
            ["Monitoring", "Single pane of glass before first workload migrates", "Blind spots = production incidents"],
            ["Security", "Zero Trust policies + microsegmentation from the start", "Retrofitting is much harder"],
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
          Hybrid cloud troubleshooting is more complex than traditional networking — the issue could be on-prem, in the VPN/Interconnect, in the cloud network, in the identity plane, or in the application layer. A systematic approach is mandatory.
        </p>
        <ol style={S.ol}>
          <li><strong>Basic connectivity check:</strong> Is the cloud private IP reachable from on-prem? <code>ping / traceroute / tracert</code>. If not — check the VPN/Interconnect tunnel.</li>
          <li><strong>VPN tunnel status:</strong> Cloud console → VPN → tunnel status. Is the BGP session up? Routes advertised/received? Check the BGP neighbor status on the on-prem router.</li>
          <li><strong>DNS resolution:</strong> <code>nslookup db.cloud.internal.company.com</code> from on-prem — is it resolving to a private IP or a public one? Check the conditional forwarder.</li>
          <li><strong>Firewall rules:</strong> Check the on-prem NGFW logs — is the traffic allowed? Check cloud SG/NSG/Firewall Rules. Run Network Intelligence Center (GCP) / Connectivity Tests.</li>
          <li><strong>Identity/Auth failure:</strong> Check the Azure AD Connect sync status — any sync errors? Is the PTA agent running? Check the AWS IAM Identity Center SAML response (browser developer tools, SAML tracer extension).</li>
          <li><strong>Latency spike:</strong> Run <code>mtr</code> (My TraceRoute) from on-prem to the cloud IP — where is the latency being added? Compare the VPN path vs the Interconnect path.</li>
          <li><strong>Storage sync failure:</strong> Check the Storage Gateway / DataSync job logs — permissions? Connectivity? Bandwidth throttling?</li>
          <li><strong>Application-level:</strong> Check the application logs — timeout waiting for on-prem response? Database connection timeout? Check the latency budget.</li>
        </ol>
        <Callout type="important" title="Hybrid Troubleshooting — Always Start with Network Layer">
          90% of hybrid cloud issues start at the network layer — VPN tunnel, DNS resolution, firewall rule. Before looking at the application layer: can machine A ping machine B? Is DNS resolving? Is the path symmetric (does traffic go and return on the same path)? Asymmetric routing is a common hidden issue in hybrid environments.
        </Callout>
      </section>

      {/* ─── FAILURE SCENARIOS ────────────────────────────────────────────── */}
      <section id="failure-scenarios">
        <h2 style={S.h2}>Practical Failure Scenarios</h2>
        <p style={S.p}>
          These scenarios happen in real production environments — each one with symptoms, impact, detection method, recovery steps and lesson learned.
        </p>

        <h3 style={S.h3}>Scenario 1: Direct Connect / ExpressRoute Circuit Failure</h3>
        <ul style={S.ul}>
          <li><strong>Symptom:</strong> Cloud VM not reachable from on-prem. Application timeouts. Latency suddenly jumps from 10-50ms to 100-300ms (on the Internet path).</li>
          <li><strong>Impact:</strong> If no VPN backup is configured — complete hybrid connectivity loss. If there is a VPN backup — automatic BGP failover (90 seconds default, faster with BFD).</li>
          <li><strong>Detection:</strong> Network monitoring BGP session drop alert. CloudWatch/Azure Monitor VPN failover event. On-prem router log: neighbor down.</li>
          <li><strong>Recovery:</strong> If VPN backup: automatic. Verify BGP routes switched. Monitor bandwidth (VPN lower capacity than Interconnect — possible congestion). Contact circuit provider for Interconnect restoration (SLA: typically 4-24 hours).</li>
          <li><strong>Lesson learned:</strong> HA VPN backup is mandatory. Tune BGP hold timers (10/30 seconds instead of 60/180). Enable BFD (Bidirectional Forwarding Detection) for sub-second failure detection. Traffic engineering: configure VPN capacity equal to the Interconnect capacity so that failover is seamless.</li>
        </ul>

        <h3 style={S.h3}>Scenario 2: DNS Resolution Failure — Cloud Resources Unreachable</h3>
        <ul style={S.ul}>
          <li><strong>Symptom:</strong> <code>db.cloud.internal.company.com</code> does not resolve from on-prem. Application "cannot connect to database" errors. Ping the same private IP — works. By name — does not.</li>
          <li><strong>Impact:</strong> Application down (it depends on DNS, not hardcoded IPs). Scope: only on-prem to cloud name resolution is affected.</li>
          <li><strong>Detection:</strong> <code>nslookup db.cloud.internal.company.com</code> from on-prem — timeout or NXDOMAIN. Application logs: DNS resolution failure.</li>
          <li><strong>Recovery:</strong> Check the conditional forwarder on the on-prem DNS server — is the target IP reachable? Ping the cloud DNS resolver IP from on-prem (Azure DNS Private Resolver endpoint, AWS Route 53 Resolver inbound endpoint). Is the VPN/Interconnect tunnel up? The DNS forwarder destination IP must be reachable on the private network.</li>
          <li><strong>Lesson learned:</strong> DNS monitoring: nightly automated nslookup checks for critical hostnames. Deploy DNS resolver endpoints with HA (multiple IPs across AZs). DNS change management: conditional forwarder changes go through a change ticket.</li>
        </ul>

        <h3 style={S.h3}>Scenario 3: Azure AD Connect Sync Failure</h3>
        <ul style={S.ul}>
          <li><strong>Symptom:</strong> A new employee was created in on-prem AD — but cannot log in to cloud apps. Existing users unaffected. Password changes on-prem are not being reflected in the cloud (PHS scenario).</li>
          <li><strong>Impact:</strong> New users blocked from cloud access. Password changes delayed by 30+ minutes. Deprovisioned users temporarily still have cloud access (security risk).</li>
          <li><strong>Detection:</strong> Entra ID portal → Health → AD Connect sync status — check the last sync time. Synchronization Service Manager on the AD Connect server — errors visible. Entra ID admin email notification (if configured).</li>
          <li><strong>Recovery:</strong> Restart the service on the AD Connect server. Reboot the AD Connect server. Check Windows Event Logs — diagnose the specific error code. Force delta sync: <code>Start-ADSyncSyncCycle -PolicyType Delta</code>. Escalation: AD Connect reinstall (last resort — promote the staging server).</li>
          <li><strong>Lesson learned:</strong> Always HA: primary AD Connect + staging mode server. Promote the staging server when the primary fails. Monitoring: ADConnectHealth agent → Entra ID portal alerts. Sync failure notification email + ITSM ticket. Max acceptable sync delay alert: 2 hours.</li>
        </ul>

        <h3 style={S.h3}>Scenario 4: ADFS Certificate Expiry — Complete SSO Failure</h3>
        <ul style={S.ul}>
          <li><strong>Symptom:</strong> Monday morning, all users are unable to log in to cloud apps. "Authentication failed" errors. On-prem domain login works. Azure Portal, Office 365, Salesforce — all affected.</li>
          <li><strong>Impact:</strong> Business-wide cloud access loss. Revenue impact if customer-facing apps affected.</li>
          <li><strong>Detection:</strong> ADFS Event Log: token signing certificate errors. Entra ID: sign-in logs — ADFS federation errors. Browser: ADFS error page "Authentication failed."</li>
          <li><strong>Recovery:</strong> Renew the ADFS Token Signing certificate. This is not just inside ADFS — relying parties (Entra ID, Salesforce, etc.) have to update the new certificate fingerprint. Emergency: update the new ADFS cert in Entra ID (Azure portal → External Identities → Federation). Timeline: typically 1-4 hours for full resolution.</li>
          <li><strong>Lesson learned:</strong> ADFS cert monitoring: 90/60/30 day expiry alerts — multiple recipients. Auto-renewal not possible for ADFS token certs (relying party sync needed). Calendar reminder + runbook for renewal. Consider migration from ADFS to PHS/PTA — eliminates this failure mode entirely.</li>
        </ul>

        <h3 style={S.h3}>Scenario 5: Storage Replication Lag → Split-Brain</h3>
        <ul style={S.ul}>
          <li><strong>Symptom:</strong> A DR failover was performed, but the DR database is showing a 2-hour-old version of the data. Conflict after restoring the primary — both environments wrote independently for 2 hours.</li>
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
          The Cloud Adoption Framework (CAF) is a structured approach to the cloud journey. Microsoft, AWS and Google each have their own CAF versions — but the core phases are similar. In the hybrid cloud context these phases are especially important, because a structured progression is needed from on-prem to a full cloud or hybrid state.
        </p>

        <section id="caf-phases">
          <h3 style={S.h3}>CAF Phases — Hybrid Cloud Context</h3>
          <ComparisonTable
            headers={["Phase", "What Happens", "Hybrid Cloud Activities", "Key Output"]}
            rows={[
              ["1. Strategy", "Define the business case, motivation, expected outcomes", "Why hybrid? Cost savings? Compliance? DR? Innovation? Executive alignment.", "Cloud strategy document, stakeholder buy-in"],
              ["2. Plan", "Digital estate assessment, skills gaps, timeline", "Application portfolio — which 7R strategy? Dependency mapping. Skills assessment (cloud training needed).", "Migration backlog, skills roadmap, timeline"],
              ["3. Ready (Landing Zone)", "Prepare the cloud environment before the first migration", "Landing zone build: networking, identity, logging, security, governance baseline.", "Landing zone deployed, operational baseline ready"],
              ["4. Migrate", "Move the first workloads to the cloud", "Wave 1: simple, low-risk apps (Rehost). Validate landing zone. Iterate.", "Production workloads in cloud, learnings documented"],
              ["5. Innovate", "Adopt cloud-native capabilities", "PaaS adoption, microservices, serverless, ML/AI on cloud data", "New capabilities, competitive advantage"],
              ["6. Govern", "Ongoing policy, cost, security management", "Azure Policy/SCP/Org Policies mature, cost governance, compliance dashboards", "Governance framework, cost accountability"],
              ["7. Manage", "Operations at scale", "Unified monitoring, SRE practices, DR testing, lifecycle management", "Operational maturity, SLO-based ops"],
            ]}
          />
          <p style={S.p}>
            In the hybrid cloud journey, Phase 3 (Ready / Landing Zone) is the most commonly skipped phase — teams jump directly to migration. This is a recipe for disaster. If you migrate without a Landing Zone: networking missing, identity missing, monitoring missing, security gaps, compliance failures. Complete Phase 3 first.
          </p>
        </section>
      </section>

      {/* ─── LANDING ZONE ─────────────────────────────────────────────────── */}
      <section id="landing-zone">
        <h2 style={S.h2}>Landing Zone — Cloud Foundation Before First Migration</h2>
        <p style={S.p}>
          The Landing Zone is the foundation of the cloud — all workloads will be deployed on this foundation. "Foundation first, workloads later." Migrating to the cloud without a Landing Zone is like constructing a building without a foundation.
        </p>
        <p style={S.p}>
          A Landing Zone is a pre-configured, policy-compliant cloud environment in which the networking, identity, security, logging and governance baseline is already configured. It must be ready before the first workload is migrated.
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
            A Landing Zone build typically takes 4-8 weeks (network + identity + security baseline). Skipping it ≠ saving time. It creates debt — after every migration, security/networking has to be retrofitted. Enterprise teams: the Cloud Center of Excellence (CCoE) maintains the Landing Zone, and business teams deploy workloads on the ready foundation. Landing Zone as code (Terraform Landing Zone, AWS Control Tower, Azure Landing Zone accelerator) is available — there is no need for a custom build from scratch.
          </Callout>
        </section>
      </section>

      {/* ─── HYBRID VS MULTI-CLOUD DEEP DIVE ─────────────────────────────── */}
      <section id="hybrid-multicloud-deep">
        <h2 style={S.h2}>Hybrid Cloud vs Multi-Cloud — Engineering Deep Comparison</h2>
        <p style={S.p}>
          Engineering decisions are not made from the surface-level "hybrid = on-prem + cloud, multi-cloud = multiple clouds". The real decision criteria are different — and most enterprises are both simultaneously without deliberately choosing.
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
          Reality: a company is using AWS + Azure and also has on-prem — this is hybrid-multi-cloud. Pure multi-cloud (only multiple public clouds, no on-prem) is rare. When complexity triples, justify it with more value. Common anti-pattern: the team chose both AWS and Azure because nobody could standardize — a decision made by committee during vendor evaluation ≠ an intentional multi-cloud strategy.
        </Callout>
      </section>

      {/* ─── ENGINEERING DECISION MATRIX ──────────────────────────────────── */}
      <section id="decision-matrix">
        <h2 style={S.h2}>Engineering Decision Matrix — Where Should This Workload Go?</h2>
        <p style={S.p}>
          The placement decision for each workload should come from a structured process — not from gut feeling. This matrix is a practical decision guide.
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
          <li><strong>Data regulation check:</strong> Is it mandatory for the data to stay in India/EU/a specific geography? If yes → on-prem or regulated cloud region only.</li>
          <li><strong>Latency requirement:</strong> Need sub-millisecond latency? → On-prem only. 5-50ms acceptable? → Cloud possible.</li>
          <li><strong>Refactor feasibility:</strong> Is the application cloud-ready, or can it reasonably be made cloud-ready? If not → Rehost or Retain.</li>
          <li><strong>Load profile:</strong> Predictable and constant → on-prem or Reserved cloud. Variable/bursty → public cloud or hybrid burst.</li>
          <li><strong>Dependency mapping:</strong> Which resources, and where, does the app depend on? Data gravity decides placement.</li>
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
          The most valuable skill combination in a hybrid cloud engineering career: deep networking (routing, VPN, BGP) + cloud architecture (AWS/Azure/GCP) + security (zero trust, encryption, IAM). This combination is rare and highly compensated.
        </p>
        <p style={S.p}>
          Demand in India: BFSI (banking, insurance), healthcare, manufacturing — all have started their cloud journey, and there is a massive shortage of hybrid architecture engineers. Cloud architect + on-prem experience = a premium salary.
        </p>
      </section>

      {/* ─── KEY TAKEAWAYS ────────────────────────────────────────────────── */}
      <section id="key-takeaways">
        <h2 style={S.h2}>Key Takeaways</h2>
        <ul style={S.ul}>
          <li><strong>Hybrid Cloud = Integration:</strong> Network + Identity + Monitoring + Data — just moving compute to the cloud is not hybrid</li>
          <li><strong>Data Gravity:</strong> Large datasets attract compute to their location — factor it into the architecture</li>
          <li><strong>Connectivity:</strong> Production = Dedicated Interconnect primary + HA VPN backup. Never single VPN tunnel only.</li>
          <li><strong>Encryption on Interconnect:</strong> Private circuit ≠ encrypted. Configure IPsec over Interconnect or MACsec explicitly.</li>
          <li><strong>Identity = PHS + MFA:</strong> Password Hash Sync is the simplest and most resilient option. Avoid ADFS complexity unless there is a specific requirement.</li>
          <li><strong>Workload Identity:</strong> Zero hardcoded credentials. Managed Identity / IRSA / GKE Workload Identity always.</li>
          <li><strong>Test your DR:</strong> Quarterly actual failover drills. Untested DR = no DR. Get RTO/RTO defined by the business first.</li>
          <li><strong>CIDR planning:</strong> Non-overlapping IP space upfront — retrofitting is a nightmare.</li>
          <li><strong>Zero Trust:</strong> Network perimeter gone. Identity + device + context = new security boundary.</li>
          <li><strong>7 Rs Migration:</strong> A deliberate strategy for each application. Blind lift-and-shift ≠ cloud optimization.</li>
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
