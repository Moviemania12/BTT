"use client";

import { Callout, ComparisonTable, Figure, S } from "../shared";
import TopicLink from "@/components/TopicLink";
import { azureContent } from "@/content/azure";

import AzureGlobalDiagram from "../svg/AzureGlobalDiagram";
import AzureResourceHierarchyDiagram from "../svg/AzureResourceHierarchyDiagram";
import AzureNetworkingDiagram from "../svg/AzureNetworkingDiagram";
import AzureComputeDiagram from "../svg/AzureComputeDiagram";
import AzureStorageDiagram from "../svg/AzureStorageDiagram";
import AzureIdentityDiagram from "../svg/AzureIdentityDiagram";
import AzureHaDrDiagram from "../svg/AzureHaDrDiagram";
import AzureMonitoringDiagram from "../svg/AzureMonitoringDiagram";
import AzureVsAwsDiagram from "../svg/AzureVsAwsDiagram";

export default function Content() {
  return (
    <article>

      {/* ─── QUICK SUMMARY ────────────────────────────────────────────────── */}
      <section id="quick-summary">
        <h2 style={S.h2}>Quick Summary</h2>
        <p style={S.p}>
          Microsoft Azure is the world's second-largest public cloud platform — especially for enterprises, because it is deeply integrated with Microsoft's existing ecosystem (Windows Server, Active Directory, SQL Server, Office 365, Visual Studio). For a Data Center engineer, understanding Azure means: mapping traditional DC concepts to the cloud, understanding Azure-specific architecture (VNet, NSG, ARM, Entra ID), and designing hybrid DC-to-Azure connectivity.
        </p>
        <p style={S.p}>
          This article is the Azure counterpart of the AWS article — same depth, same engineering accuracy, same style. If you have already read the AWS article, the differences are clearly highlighted. If you are starting fresh with Azure, you will get a complete foundation.
        </p>
        <Callout type="important" title="Azure ≠ AWS in Terminology">
          Azure and AWS are both public clouds, but their terminology differs significantly. AWS VPC = Azure VNet. AWS Security Group = Azure NSG (but the behavior is different). AWS IAM = Azure RBAC + Entra ID. AWS CloudFormation = Azure ARM Templates. The concepts map to each other, but implementation details vary — do not assume the two are identical.
        </Callout>
      </section>

      {/* ─── WHAT IS AZURE ────────────────────────────────────────────────── */}
      <section id="what-is-azure">
        <h2 style={S.h2}>What Is Microsoft Azure?</h2>
        <p style={S.p}>
          Microsoft Azure is Microsoft's public cloud computing platform — compute, storage, networking, databases, AI/ML, IoT, security and hundreds of other services are available globally. Azure runs on Microsoft's massive worldwide data center network.
        </p>
        <p style={S.p}>
          Azure's primary competitive advantage is integration with the Microsoft enterprise ecosystem — for companies that use Windows Server, SQL Server, Active Directory, Office 365/M365, Azure is a natural extension. Azure is particularly strong in hybrid cloud and on-prem-to-cloud journeys.
        </p>
        <ComparisonTable
          headers={["Traditional DC Component", "Azure Equivalent", "Key Note"]}
          rows={[
            ["Physical server", "Azure Virtual Machine", "Hyper-V based virtualization"],
            ["SAN LUN", "Azure Managed Disk", "Microsoft manages storage infra"],
            ["NAS (NFS/SMB)", "Azure Files", "SMB 3.0 + NFS 4.1 support"],
            ["Object storage", "Azure Blob Storage", "LRS/ZRS/GRS/GZRS redundancy"],
            ["Enterprise L3 network", "Azure Virtual Network (VNet)", "Software-defined, Region-wide"],
            ["Physical firewall", "NSG + Azure Firewall", "NSG = stateful basic; Azure FW = enterprise"],
            ["Hardware LB (F5)", "Azure Load Balancer + App Gateway", "L4 + L7 separately"],
            ["Core WAN router", "Azure Virtual WAN", "Hub-spoke managed globally"],
            ["Enterprise DNS", "Azure DNS + Private DNS Zones", "Fully managed, private zones in VNet"],
            ["AD / LDAP", "Microsoft Entra ID + RBAC", "Cloud-native identity, OAuth2/OIDC"],
            ["Monitoring (SCOM, Splunk)", "Azure Monitor + Log Analytics", "KQL query language"],
            ["DR tool", "Azure Site Recovery (ASR)", "VM replication cross-region"],
          ]}
        />

        <section id="azure-history">
          <h3 style={S.h3}>History and Why Azure Exists</h3>
          <p style={S.p}>
            Azure launched in 2010 as "Windows Azure" — primarily for Windows/.NET workloads. In 2014 it was renamed "Microsoft Azure" and Linux/open-source support was expanded. After Satya Nadella became CEO, Azure focused on enterprise and hybrid cloud — this strategy proved very successful.
          </p>
          <p style={S.p}>
            Azure exists because Microsoft was the dominant provider of enterprise software — on-prem. When enterprises began moving toward the cloud, Microsoft needed a cloud platform to retain its customers. Azure's DNA is enterprise + hybrid — AWS's DNA comes from internet startups. This fundamental difference shows in architecture and feature priorities.
          </p>
        </section>

        <section id="service-models">
          <h3 style={S.h3}>IaaS, PaaS, SaaS on Azure</h3>
          <ComparisonTable
            headers={["Model", "Azure Provides", "You Manage", "Examples"]}
            rows={[
              ["IaaS", "Virtual compute, VNet, raw storage", "OS, runtime, app, config, patches", "Azure VMs, VNet, Managed Disks"],
              ["PaaS", "Managed runtime + infrastructure", "App code, data, configuration", "App Service, Azure SQL, AKS control plane"],
              ["SaaS", "Complete application", "Data + user access only", "Microsoft 365, Dynamics 365"],
            ]}
          />
        </section>

        <section id="shared-responsibility">
          <h3 style={S.h3}>Shared Responsibility Model</h3>
          <ComparisonTable
            headers={["Service Type", "Microsoft Manages", "You Manage"]}
            rows={[
              ["Azure VM (IaaS)", "Physical hardware, Hyper-V hypervisor, host OS, data center", "Guest OS patches, runtime, app, security config, NSG, disk encryption"],
              ["Azure SQL PaaS", "Hardware, OS, database engine patches, HA, backups infra", "Schema, queries, firewall rules, data classification, connection security"],
              ["Azure Functions", "All infrastructure, OS, runtime, scaling, availability", "Function code, IAM permissions, environment variables, triggers"],
              ["Azure Blob Storage", "Hardware, replication, service availability", "Access control (RBAC/SAS), encryption keys, lifecycle policies, data"],
            ]}
          />
          <Callout type="important" title="Shared Responsibility in Practice">
            Azure data center physical security = Microsoft's responsibility. Your Azure VM's OS not being patched = your responsibility. A wrong Cosmos DB firewall rule = your responsibility. Understand the responsibility boundary clearly for every service type.
          </Callout>
        </section>
      </section>

      {/* ─── GLOBAL INFRASTRUCTURE ────────────────────────────────────────── */}
      <section id="global-infrastructure">
        <h2 style={S.h2}>Azure Global Infrastructure</h2>

        <section id="regions">
          <h3 style={S.h3}>Regions</h3>
          <p style={S.p}>
            Azure operates in 60+ Regions worldwide (Microsoft is continuously adding more). Each Region is a Microsoft data center cluster in a specific geographic area — East US, Central India, West Europe, Southeast Asia etc. Regions are independent — resources in one Region do not automatically move to another Region.
          </p>
          <p style={S.p}>
            Data residency: Azure Regions are aligned for data sovereignty. If data must stay in India, choose the Central India or South India Region. For EU GDPR, EU Regions. Resources are deployed in one Region and stay there unless explicitly replicated.
          </p>
        </section>

        <section id="availability-zones">
          <h3 style={S.h3}>Availability Zones</h3>
          <p style={S.p}>
            An AZ is a physically separate data center facility within a Region — independent power, cooling and networking. Most Azure Regions have 3 AZs. If one AZ fails, the other AZs remain unaffected.
          </p>
          <p style={S.p}>
            Not all Azure Regions have AZs — AZ support may be absent in older Regions or smaller geographies. Verify the Region's AZ support before deploying resources.
          </p>
        </section>

        <section id="region-pairs">
          <h3 style={S.h3}>Region Pairs — A Unique Azure Concept</h3>
          <p style={S.p}>
            Azure Regions are paired — each Region has a designated "pair Region" in the same geography (typically 300+ miles apart). Examples: East US ↔ West US, North Europe ↔ West Europe, Central India ↔ South India.
          </p>
          <ul style={S.ul}>
            <li><strong>Platform updates sequential:</strong> Microsoft does not update both paired Regions simultaneously — risk reduces</li>
            <li><strong>GRS replication:</strong> Geo-Redundant Storage automatically replicates to the pair Region</li>
            <li><strong>DR priority:</strong> In a major disaster, Azure gives the paired Region recovery priority</li>
            <li><strong>Azure Site Recovery default:</strong> The ASR default DR target is the paired Region</li>
          </ul>
          <Callout type="important" title="Region Pairs ≠ AWS Analogy">
            AWS has no explicit "Region Pair" concept — the engineer chooses the DR Region themselves. In Azure, Region Pairs are Microsoft-defined, and platform updates + GRS replication are directly linked to them. Factor this into architecture decisions.
          </Callout>
        </section>

        <section id="edge-locations">
          <h3 style={S.h3}>Edge Locations and Specialized Infrastructure</h3>
          <ComparisonTable
            headers={["Infrastructure", "What It Is", "Use Case"]}
            rows={[
              ["Azure CDN / Front Door PoPs", "450+ edge locations globally", "Content caching, WAF at edge, global LB"],
              ["Azure Edge Zones", "Azure micro-DC in carrier/metro", "Ultra-low latency, 5G workloads"],
              ["Azure Private Edge Zones", "Azure Stack Edge in your facility", "On-prem Azure services"],
              ["Azure Stack Hub", "Azure appliance in your DC", "Disconnected/sovereign scenarios"],
              ["Azure Arc", "Manage on-prem/multi-cloud from Azure portal", "Hybrid management plane"],
            ]}
          />
        </section>

        <section id="region-selection">
          <h3 style={S.h3}>Region Selection Strategy</h3>
          <ul style={S.ul}>
            <li><strong>Data residency/compliance:</strong> GDPR, India IT Act, financial regulations — primary driver for many enterprises</li>
            <li><strong>Proximity to users:</strong> Latency matters — use Azure Speed Test to measure, then choose</li>
            <li><strong>Service availability:</strong> Not every Azure service is in every Region — verify your required services first</li>
            <li><strong>AZ availability:</strong> Production workloads → choose Region with AZ support</li>
            <li><strong>Paired Region for DR:</strong> Choose primary Region whose pair is also acceptable for DR</li>
            <li><strong>Cost:</strong> Same service can cost differently in different Regions</li>
          </ul>
        </section>

        <Figure caption="Azure Global Infrastructure: Regions, Availability Zones and Region Pairs — unique Azure concept">
          <AzureGlobalDiagram />
        </Figure>
      </section>

      {/* ─── RESOURCE MANAGEMENT ──────────────────────────────────────────── */}
      <section id="resource-management">
        <h2 style={S.h2}>Azure Resource Management</h2>

        <section id="arm">
          <h3 style={S.h3}>Azure Resource Manager (ARM)</h3>
          <p style={S.p}>
            ARM is Azure's management layer — every operation (Portal, CLI, PowerShell, SDK, REST API) goes through ARM. ARM authenticates, authorizes (RBAC check), and routes requests to resource providers. Traditional DC analogy: a central management plane or a configuration management tool like Ansible Tower — but this is Azure's fundamental backbone.
          </p>
          <p style={S.p}>
            <strong>Control Plane vs Data Plane:</strong> ARM is a <em>control plane</em> — creating/reading/updating/deleting resources. The <em>data plane</em> is separate — operating on data inside the resource. Example: creating a Storage Account = ARM (control plane). Uploading/downloading a blob in storage = Storage Data Plane APIs (on a direct endpoint). RBAC role assignments are also separate: <code>Microsoft.Storage/storageAccounts/write</code> = control plane permission. <code>Microsoft.Storage/storageAccounts/blobServices/containers/blobs/read</code> = data plane permission. The two are separate — giving someone RBAC access to manage a storage account ≠ giving them access to read its data.
          </p>
          <p style={S.p}>
            <strong>Resource Providers:</strong> ARM delegates requests for specific resource types to Resource Providers. Every Azure service registers a Resource Provider: <code>Microsoft.Compute</code> (VMs), <code>Microsoft.Network</code> (VNet, NSG), <code>Microsoft.Storage</code> (Storage Accounts), <code>Microsoft.Sql</code> (SQL Databases). A Resource Provider must be registered in the subscription before resources of that service can be created. In new subscriptions, commonly-used providers are auto-registered; niche services may need to be registered manually.
          </p>
          <p style={S.p}>
            ARM Templates: infrastructure-as-code in JSON/Bicep format. The template describes the desired state → ARM deploys it. Idempotent — run the same template multiple times and you get the same result.
          </p>
        </section>

        <section id="resource-groups">
          <h3 style={S.h3}>Resource Groups</h3>
          <p style={S.p}>
            A Resource Group is a logical container — it groups related Azure resources together. Key rules:
          </p>
          <ul style={S.ul}>
            <li>Every Azure resource must be in exactly one Resource Group</li>
            <li>A Resource Group selects a Region — for metadata storage (the resources themselves can be in different Regions)</li>
            <li>Delete the whole group → all resources are deleted. Keeping all of an app's resources in one RG simplifies lifecycle management</li>
            <li>RBAC and Azure Policy can be assigned at the RG level — inherited by all resources in the group</li>
            <li>Billing: track costs using tags, not RGs (unless all resources are in the same RG)</li>
          </ul>
        </section>

        <section id="subscriptions">
          <h3 style={S.h3}>Subscriptions</h3>
          <p style={S.p}>
            A Subscription is a billing unit and a logical boundary for resources. Resources are deployed under a subscription. It is common for one organization to have multiple subscriptions — prod/dev/staging separation, team isolation, cost center separation.
          </p>
          <p style={S.p}>
            Subscription limits (quotas): every subscription has service limits — such as VM cores per region, VNets per subscription. Large deployments may need multiple subscriptions.
          </p>
        </section>

        <section id="management-groups">
          <h3 style={S.h3}>Management Groups</h3>
          <p style={S.p}>
            Management Groups organize multiple Subscriptions hierarchically. Root → Management Groups → Subscriptions → Resource Groups → Resources. Assign Azure Policy and RBAC at the Management Group → automatically inherited by all child subscriptions. Essential for enterprise governance.
          </p>
        </section>

        <section id="azure-portal-cli">
          <h3 style={S.h3}>Portal, CLI and PowerShell</h3>
          <ComparisonTable
            headers={["Tool", "Use Case", "When to Use"]}
            rows={[
              ["Azure Portal", "Web GUI at portal.azure.com", "Exploration, one-off tasks, monitoring dashboards"],
              ["Azure CLI", "Cross-platform command-line (az command)", "Scripting, automation, Linux/Mac environments"],
              ["Azure PowerShell", "PowerShell cmdlets (Az module)", "Windows automation, existing PS scripts"],
              ["ARM Templates / Bicep", "Declarative IaC (JSON/Bicep)", "Repeatable deployments, version controlled"],
              ["Terraform", "Multi-cloud IaC", "Multi-cloud, HashiCorp ecosystem"],
              ["Azure Cloud Shell", "Browser-based shell (CLI + PS)", "Quick tasks without local install"],
            ]}
          />
        </section>

        <Figure caption="Azure Resource Hierarchy: Management Groups → Subscriptions → Resource Groups → Resources, all managed via ARM">
          <AzureResourceHierarchyDiagram />
        </Figure>
      </section>

      {/* ─── IDENTITY ─────────────────────────────────────────────────────── */}
      <section id="identity">
        <h2 style={S.h2}>Identity — Microsoft Entra ID and RBAC</h2>

        <section id="entra-id">
          <h3 style={S.h3}>Microsoft Entra ID (formerly Azure AD)</h3>
          <p style={S.p}>
            Microsoft Entra ID is a cloud-native identity and access management service — for web applications, APIs and Microsoft 365. It is not a replacement for traditional Active Directory Domain Services (AD DS) — it is a separate, complementary service.
          </p>
          <ComparisonTable
            headers={["Aspect", "Traditional AD DS", "Microsoft Entra ID"]}
            rows={[
              ["Protocol", "LDAP, Kerberos, NTLM", "OAuth 2.0, OIDC, SAML 2.0"],
              ["Purpose", "Domain-joined devices, GPO, on-prem apps", "Cloud apps, web APIs, SaaS, Microsoft 365"],
              ["Structure", "OU hierarchy, domain, forest", "Flat tenant structure"],
              ["Authentication", "Domain controller", "Cloud token service (STS)"],
              ["Device management", "GPO, domain join", "Intune, Azure AD Join, Conditional Access"],
            ]}
          />
          <Callout type="important" title="Entra ID = Cloud IdP, Not Domain Controller">
            Entra ID is a cloud identity provider — not a cloud version of on-prem AD. You will still need to maintain on-prem AD for Windows domain-joined machines and on-prem apps. Hybrid: the Azure AD Connect tool syncs the two.
          </Callout>
        </section>

        <section id="rbac">
          <h3 style={S.h3}>Azure RBAC</h3>
          <p style={S.p}>
            Azure RBAC (Role-Based Access Control) manages authorization on Azure resources. Three elements: Security Principal (User/Group/Service Principal/Managed Identity) + Role Definition (permissions set) + Scope (Management Group → Subscription → RG → Resource).
          </p>
          <p style={S.p}>
            Built-in roles: Owner (full control + RBAC), Contributor (full control - RBAC), Reader (view only), + 200+ service-specific roles (Virtual Machine Contributor, Storage Blob Data Reader etc.). Custom roles: define exact permissions — for enterprise fine-grained access.
          </p>
          <p style={S.p}>
            RBAC assignments are inherited: assign at a parent scope → automatically applies to child scopes. Reader assigned at a Management Group → that person can read in all subscriptions under it.
          </p>
        </section>

        <section id="managed-identity">
          <h3 style={S.h3}>Managed Identity</h3>
          <p style={S.p}>
            Managed Identity gives an Azure resource (VM, Function, AKS pod) an Entra ID identity — no need to hardcode credentials in code. The resource automatically requests tokens from the Azure Instance Metadata Service.
          </p>
          <ul style={S.ul}>
            <li><strong>System-assigned:</strong> Created/deleted along with the resource. One-to-one relationship. When the resource is deleted, the corresponding Service Principal in Entra ID is removed automatically — no manual cleanup needed.</li>
            <li><strong>User-assigned:</strong> Independently managed, can be assigned to multiple resources. The MI continues to exist after the resource is deleted — it must be deleted manually. Recommended for shared identity patterns and scenarios where the same identity is needed on multiple resources.</li>
            <li><strong>Example:</strong> A VM needs to read secrets from Key Vault → enable Managed Identity → assign an RBAC role on Key Vault (Key Vault Secrets User) → no credentials needed in code.</li>
          </ul>
        </section>

        <section id="hybrid-identity">
          <h3 style={S.h3}>Hybrid Identity</h3>
          <p style={S.p}>
            On-prem AD + Entra ID together. Azure AD Connect (or the newer Azure AD Connect Cloud Sync) syncs users/groups from on-prem AD into Entra ID. Auth options:
          </p>
          <ul style={S.ul}>
            <li><strong>Password Hash Sync (PHS):</strong> Password hash in the cloud — cloud authentication. Simplest, most resilient. Cloud auth works even when on-prem is down.</li>
            <li><strong>Pass-through Authentication (PTA):</strong> Cloud auth request → on-prem agent → AD validates. The password does not go to the cloud. For compliance requirements.</li>
            <li><strong>Federation (ADFS):</strong> On-prem ADFS handles auth. Most complex, most control. Usually for specific compliance scenarios.</li>
          </ul>
        </section>

        <Figure caption="Azure Identity: Entra ID, RBAC, Managed Identity and Hybrid Identity — enterprise identity architecture">
          <AzureIdentityDiagram />
        </Figure>
      </section>

      {/* ─── NETWORKING ───────────────────────────────────────────────────── */}
      <section id="networking">
        <h2 style={S.h2}>Azure Networking</h2>

        <section id="vnet">
          <h3 style={S.h3}>Azure Virtual Network (VNet)</h3>
          <p style={S.p}>
            A VNet is Azure's isolated virtual network — the equivalent of a traditional DC's private enterprise network. A VNet lives in one Region but spans multiple AZs (pin the AZ at the VM level, per subnet). Assign the VNet a CIDR block (e.g., <code>10.0.0.0/16</code>).
          </p>
          <p style={S.p}>
            AWS VPC vs Azure VNet: conceptually the same — an isolated L3 network. Key difference: in an Azure VNet, Internet connectivity is partially available by default (outbound) unless specifically blocked. In AWS VPC, default deny. Azure NSG default rules: allow VNet inbound, allow Azure LB inbound, deny all Internet inbound — practically secure by default for inbound.
          </p>
        </section>

        <section id="subnets-nsg">
          <h3 style={S.h3}>Subnets and NSG</h3>
          <p style={S.p}>
            A Subnet is a subdivision of a VNet. An NSG (Network Security Group) is attached to a subnet or NIC — a stateful L3/L4 traffic filter. Default NSG rules: allow VNet traffic, allow Azure LB, deny Internet inbound.
          </p>
          <ComparisonTable
            headers={["Feature", "Azure NSG", "AWS Security Group"]}
            rows={[
              ["Level", "Subnet OR NIC (both possible)", "NIC (instance) level only"],
              ["Statefulness", "Stateful", "Stateful"],
              ["Allow + Deny", "Both (priority-based)", "Allow only"],
              ["Rule evaluation", "Priority number (100–4096), lower = higher priority", "All rules evaluated (union of allows)"],
              ["Default deny", "Implicit deny after all rules", "Implicit deny (no match = deny)"],
              ["Inbound default", "Deny Internet inbound, allow VNet + LB", "Deny all inbound (custom SG)"],
            ]}
          />
          <Callout type="warning" title="NSG on Both Subnet AND NIC — Evaluation Order Matters">
            In Azure, NSGs can be attached to both the subnet and the NIC. The evaluation order depends on direction: <strong>Inbound traffic</strong> → subnet NSG first, then NIC NSG. <strong>Outbound traffic</strong> → NIC NSG first, then subnet NSG. Default NSG rules (auto-created, cannot be deleted, only overridden): priority 65000 (AllowVnetInBound/AllowVnetOutBound), 65001 (AllowAzureLoadBalancerInBound), 65500 (DenyAllInBound/DenyAllOutBound). Outbound Internet is allowed by default in the default NSG (priority 65001 AllowInternetOutBound). Write custom rules in the 100–4096 priority range.
          </Callout>
        </section>

        <section id="routing">
          <h3 style={S.h3}>Route Tables and UDR</h3>
          <p style={S.p}>
            In Azure, every VNet has an implicit system route table — it automatically handles VNet traffic, Internet traffic and VPN/ExpressRoute routes. User Defined Routes (UDR) add custom routes — to force traffic through a specific appliance (Azure Firewall, NVA).
          </p>
          <p style={S.p}>
            Common UDR pattern: 0.0.0.0/0 → Azure Firewall IP. Azure Firewall inspects all outbound traffic. The traditional DC concept of force-routing via a firewall is the same — but in Azure it is implemented through UDR.
          </p>
        </section>

        <section id="vnet-peering">
          <h3 style={S.h3}>VNet Peering and Service Endpoints</h3>
          <p style={S.p}>
            VNet Peering connects two VNets directly — same Region (local peering) or different Region (global peering). Non-transitive: A↔B, B↔C but not A↔C (unless you use a hub VNet or Azure Virtual WAN).
          </p>
          <p style={S.p}>
            Service Endpoints: an optimized private route from a VNet subnet to specific Azure services (Storage, SQL, Key Vault) — traffic stays on the Azure backbone. Service Endpoint → add a VNet-specific firewall rule on the Azure service.
          </p>
        </section>

        <section id="private-link">
          <h3 style={S.h3}>Private Link and Private Endpoints</h3>
          <p style={S.p}>
            A Private Endpoint creates a private IP address for an Azure PaaS service (Storage, SQL, Cosmos DB, Key Vault) inside your VNet. Traffic stays isolated from the Internet — the service is accessed via a private IP inside the VNet. DNS must also be private — configure a Private DNS Zone.
          </p>
          <p style={S.p}>
            Conceptually similar to AWS PrivateLink. A Private Endpoint provides better security than a Service Endpoint — traffic does not go onto the Internet at any point.
          </p>
        </section>

        <Figure caption="Azure VNet architecture: subnets, NSG layers, hub subnet, peering, service endpoints">
          <AzureNetworkingDiagram />
        </Figure>
      </section>

      {/* ─── LOAD BALANCING ───────────────────────────────────────────────── */}
      <section id="load-balancing">
        <h2 style={S.h2}>Load Balancing and Application Delivery</h2>
        <p style={S.p}>
          Azure has multiple load balancing services — each for a different use case. Connect the core LB concepts from the <TopicLink slug="load-balancer" variant="inline" /> article.
        </p>

        <section id="azure-lb">
          <h3 style={S.h3}>Azure Load Balancer (L4)</h3>
          <p style={S.p}>
            Azure Load Balancer distributes TCP/UDP L4 traffic. It can be deployed zone-redundant (Standard tier) or zonal. Internal (private IP frontend) or Public (public IP frontend). Backend pool: VMs, VMSS instances, IP addresses.
          </p>
          <p style={S.p}>
            Standard vs Basic tier: Standard = production (zone-redundant, SLA, NSG required), Basic = dev/test (no zone support, free). Always use Standard in production.
          </p>
        </section>

        <section id="application-gateway">
          <h3 style={S.h3}>Application Gateway (L7)</h3>
          <p style={S.p}>
            Application Gateway is an HTTP/HTTPS L7 application delivery controller — SSL termination, URL-based routing, cookie-based session affinity, WAF (Web Application Firewall) integration.
          </p>
          <ul style={S.ul}>
            <li>URL path routing: <code>/api/*</code> → API backend pool, <code>/images/*</code> → static backend pool</li>
            <li>Multi-site hosting: multiple domain names → different backends on same gateway</li>
            <li>WAF (Application Gateway WAF v2): OWASP ruleset, custom rules, bot protection</li>
            <li>Autoscaling: scales with demand — min/max instance count configurable</li>
          </ul>
          <p style={S.p}>
            AWS ALB equivalent. Application Gateway + WAF = AWS ALB + AWS WAF combined.
          </p>
        </section>

        <section id="front-door">
          <h3 style={S.h3}>Azure Front Door and Traffic Manager</h3>
          <p style={S.p}>
            <strong>Azure Front Door:</strong> Global HTTP/HTTPS load balancer + CDN + WAF at Azure's edge network. Anycast routing → nearest Front Door PoP → origin. SSL offload, caching, URL rewrite, custom rules. AWS CloudFront + Global Accelerator combined analogy.
          </p>
          <p style={S.p}>
            <strong>Traffic Manager:</strong> DNS-based global traffic routing. Routing methods: Performance, Weighted, Priority, Geographic, Subnet, Multivalue. Health checks on endpoints. DNS-based routing — failover speed limited by TTL + DNS caching. AWS Route 53 routing policies equivalent.
          </p>
        </section>

        <section id="firewall">
          <h3 style={S.h3}>Azure Firewall</h3>
          <p style={S.p}>
            Azure Firewall is a managed, stateful network firewall service — L3 through L7, FQDN filtering, threat intelligence, centralized logging. Deploy it in the hub VNet and inspect traffic from all spoke VNets via UDR.
          </p>
          <ul style={S.ul}>
            <li>DNAT rules: redirect inbound traffic → to internal VMs</li>
            <li>Network rules: IP/port/protocol based L3/L4 filtering</li>
            <li>Application rules: FQDN-based outbound filtering (*.microsoft.com, etc.)</li>
            <li>Threat Intelligence: known malicious IPs/domains automatically block</li>
            <li>Premium tier: TLS inspection, IDPS, URL filtering</li>
          </ul>
          <Callout type="warning" title="Azure Firewall vs NSG">
            NSG is free and does basic subnet/NIC level filtering. Azure Firewall is costly (hourly + data processed) but enterprise-grade — FQDN, threat intelligence, centralized policy. Production enterprise: use both — NSG on every subnet (defence in depth) + Azure Firewall at the hub (central enforcement).
          </Callout>
        </section>
      </section>

      {/* ─── CONNECTIVITY ─────────────────────────────────────────────────── */}
      <section id="connectivity">
        <h2 style={S.h2}>Hybrid Connectivity</h2>

        <section id="vpn-gateway">
          <h3 style={S.h3}>Azure VPN Gateway</h3>
          <p style={S.p}>
            Azure VPN Gateway connects the on-prem network to an Azure VNet through an IPsec/IKE VPN tunnel over the Internet. Two options:
          </p>
          <ul style={S.ul}>
            <li><strong>Site-to-Site VPN:</strong> On-prem VPN device (Cisco, Palo Alto, Fortinet etc.) ↔ Azure VPN Gateway. Encrypted. Internet dependent — variable latency.</li>
            <li><strong>Point-to-Site VPN:</strong> Individual clients → Azure VNet. For remote workers.</li>
          </ul>
          <p style={S.p}>
            VPN Gateway SKUs: Basic (dev/test), VpnGw1-5 (production, higher bandwidth/connections). Active-active configuration: two public IPs, higher availability. Connect to <TopicLink slug="router" variant="inline" /> article for BGP concepts used in VPN routing.
          </p>
        </section>

        <section id="expressroute">
          <h3 style={S.h3}>Azure ExpressRoute</h3>
          <p style={S.p}>
            ExpressRoute connects on-prem to Azure over a private dedicated circuit — through a connectivity provider (Tata, Airtel, Reliance Jio etc.). It does not go over the Internet.
          </p>
          <ComparisonTable
            headers={["Feature", "VPN Gateway", "ExpressRoute"]}
            rows={[
              ["Path", "Internet (IPsec)", "Dedicated private circuit"],
              ["Encryption", "IPsec by default", "NOT encrypted by default — add MACsec/IPsec separately"],
              ["Bandwidth", "Up to ~10 Gbps (GW SKU)", "50 Mbps to 100 Gbps"],
              ["Latency", "Variable (Internet)", "Predictable, consistent"],
              ["SLA", "99.9–99.99% (GW)", "99.95% (Standard), 99.99% (Premium)"],
              ["Cost", "Lower", "Higher (GW + circuit + provider)"],
            ]}
          />
          <Callout type="warning" title="ExpressRoute: NOT Encrypted by Default">
            ExpressRoute is a dedicated private circuit — but traffic is not encrypted by default. You can configure IPsec over ExpressRoute for encryption (on both provider circuits and ExpressRoute Direct). MACsec (L2 encryption) is available only on ExpressRoute Direct connections (100Gbps dedicated ports), not on standard provider-based ExpressRoute circuits. AWS Direct Connect has the same caveat.
          </Callout>
        </section>

        <section id="virtual-wan">
          <h3 style={S.h3}>Azure Virtual WAN</h3>
          <p style={S.p}>
            Virtual WAN is a Microsoft-managed hub-and-spoke network architecture — it centrally connects multiple branches, sites, VNets and ExpressRoute/VPN circuits. The equivalent of a traditional DC core WAN router. SD-WAN concepts apply — connect with the <TopicLink slug="sd-wan" variant="inline" /> article.
          </p>
          <p style={S.p}>
            Basic tier: VNet connections only. Standard tier: VNet + VPN + ExpressRoute + inter-hub routing. Auto-provisioned managed hubs — Microsoft manages the router infrastructure, you just attach.
          </p>
        </section>
      </section>

      {/* ─── COMPUTE ──────────────────────────────────────────────────────── */}
      <section id="compute">
        <h2 style={S.h2}>Azure Compute</h2>

        <section id="azure-vms">
          <h3 style={S.h3}>Azure Virtual Machines</h3>
          <p style={S.p}>
            An Azure VM is a Hyper-V based virtual compute instance. Components: the VM itself (size selection) + OS Disk (Managed Disk) + NIC (Network Interface Card) + optional Data Disks + Public IP (optional) + NSG. These are all separate resources — deleting a VM does not delete attached resources by default (except the NIC and OS disk, which are deleted by default — configurable).
          </p>
          <p style={S.p}>
            VM sizes: B-series (burstable, dev/test), D-series (general purpose), E-series (memory optimized), F-series (compute optimized), L-series (storage optimized), N-series (GPU: NVIDIA T4, V100, A100), H-series (HPC). Confidential VMs are also available.
          </p>
          <p style={S.p}>
            Purchasing options: Pay-as-you-go, Reserved Instances (1yr/3yr, 40-72% savings), Azure Spot VMs (60-90% savings, evictable), Azure Hybrid Benefit (bring Windows Server/SQL Server license — significant savings for existing Microsoft customers).
          </p>
          <Callout type="important" title="Azure Hybrid Benefit">
            Use existing Windows Server and SQL Server licenses on Azure — Azure Hybrid Benefit significantly reduces VM costs. Equivalent licensing flexibility in AWS is limited. For enterprise Microsoft customers this is a major Azure advantage.
          </Callout>
        </section>

        <section id="vm-availability">
          <h3 style={S.h3}>VM Availability: Sets, Zones, VMSS</h3>
          <ComparisonTable
            headers={["Option", "What It Does", "SLA", "Use Case"]}
            rows={[
              ["Single VM (Premium SSD)", "No redundancy", "99.9%", "Dev, single-instance non-critical"],
              ["Availability Set", "Spread across Fault Domains (racks) + Update Domains", "99.95%", "Legacy, single-DC HA"],
              ["Availability Zones", "Spread across 3 physical AZs", "99.99%", "Production HA, modern approach"],
              ["VM Scale Set (VMSS)", "Auto-scale identical VMs, zone-aware", "Up to 99.99%", "Elastic compute, auto-scaling"],
            ]}
          />
          <p style={S.p}>
            Availability Set: Fault Domains (2-3, different racks/power) + Update Domains (up to 20, rolling update isolation). HA within a Region — does not protect against AZ failure. Older pattern — for new deployments, Availability Zones are preferred.
          </p>
          <p style={S.p}>
            VMSS (VM Scale Set): a set of identical VMs, horizontal auto-scale. Attach it to a Load Balancer or Application Gateway. Zone-spanning VMSS = instances in each AZ. Equivalent to AWS ASG (Auto Scaling Group).
          </p>
        </section>

        <section id="app-service">
          <h3 style={S.h3}>Azure App Service (PaaS)</h3>
          <p style={S.p}>
            App Service is a managed platform for web applications, REST APIs and mobile backends. Supported runtimes: .NET, Java, Python, Node.js, PHP, Ruby. No OS to manage, no runtime to patch — just deploy code.
          </p>
          <ul style={S.ul}>
            <li>App Service Plan: defines compute resources (size + count). Multiple apps share one plan.</li>
            <li>Deployment slots: deploy to the staging slot → validate → swap with the production slot (zero downtime)</li>
            <li>Custom domains + free SSL (App Service Managed Certificate)</li>
            <li>Scaling: scale up (bigger plan) or scale out (more instances, autoscale rules)</li>
            <li>VNet Integration: access VNet resources from App Service (private endpoints, databases)</li>
          </ul>
          <p style={S.p}>
            Equivalent to AWS Elastic Beanstalk — but App Service is more mature and more widely used in Azure.
          </p>
        </section>

        <section id="aks">
          <h3 style={S.h3}>Azure Kubernetes Service (AKS)</h3>
          <p style={S.p}>
            AKS is Azure's managed Kubernetes service. Microsoft manages the Kubernetes control plane — API server, etcd, scheduler. Your responsibility: worker node pools (VM sizes, count, OS patching), Kubernetes manifests, networking config.
          </p>
          <ul style={S.ul}>
            <li><strong>Node Pools:</strong> System pool (cluster services) + User pools (app workloads). Different VM sizes per pool possible.</li>
            <li><strong>Azure CNI:</strong> Pods get real VNet IPs — NSG applies directly to pods. Kubenet: pod IPs outside the VNet, NAT required.</li>
            <li><strong>Cluster Autoscaler:</strong> Node pools automatically scale based on pending pods.</li>
            <li><strong>Managed Identity:</strong> Managed Identity for the AKS cluster — no credentials in cluster config.</li>
            <li><strong>Azure Monitor for containers:</strong> AKS metrics + logs automatically in Log Analytics.</li>
            <li><strong>AGIC (Application Gateway Ingress Controller):</strong> Kubernetes Ingress → automatically configures Application Gateway.</li>
          </ul>
        </section>

        <section id="azure-functions">
          <h3 style={S.h3}>Azure Functions (Serverless)</h3>
          <p style={S.p}>
            Azure Functions is event-driven serverless compute. Define a trigger → code executes → billing per execution + duration. Supported triggers: HTTP, Timer, Blob Storage, Queue, Service Bus, Event Hub, Event Grid, Cosmos DB change feed.
          </p>
          <ul style={S.ul}>
            <li>Hosting plans: Consumption (pay-per-execution, scale-to-zero), Premium (pre-warmed instances, VNet integration), Dedicated (App Service Plan)</li>
            <li>Durable Functions: stateful orchestration — chaining, fan-out/fan-in, human approval workflows</li>
            <li>Cold starts: in the Consumption plan, cold starts occur after functions have been idle. The Premium plan eliminates this.</li>
            <li>VNet Integration: the Premium plan is required if Functions need to access private VNet resources (databases, storage)</li>
          </ul>
          <p style={S.p}>AWS Lambda equivalent. Azure Functions Consumption plan = Lambda. Azure Durable Functions = AWS Step Functions concepts.</p>
        </section>

        <section id="container-apps">
          <h3 style={S.h3}>Azure Container Instances and Container Apps</h3>
          <p style={S.p}>
            <strong>ACI (Azure Container Instances):</strong> Serverless containers — no cluster management. Per-second billing. Dev/test, batch jobs, event-driven burst. AWS Fargate equivalent.
          </p>
          <p style={S.p}>
            <strong>Azure Container Apps:</strong> Managed Kubernetes-based platform with KEDA (event-driven autoscaling) + Dapr (distributed app runtime) built-in. For microservices — K8s benefits without managing its complexity. Equivalent to AWS App Runner or ECS Fargate.
          </p>
        </section>

        <Figure caption="Azure Compute: VMs, App Service, AKS, Functions — abstraction levels and DC engineer mapping">
          <AzureComputeDiagram />
        </Figure>
      </section>

      {/* ─── STORAGE ──────────────────────────────────────────────────────── */}
      <section id="storage">
        <h2 style={S.h2}>Azure Storage</h2>

        <section id="blob-storage">
          <h3 style={S.h3}>Blob Storage</h3>
          <p style={S.p}>
            Azure Blob Storage is object storage for unstructured data — images, videos, documents, backups, static websites, big data. Storage Account → Container → Blobs. Equivalent to traditional DC object storage (NetApp StorageGRID, Dell ECS).
          </p>
          <ul style={S.ul}>
            <li><strong>Block Blob:</strong> General-purpose files, images, videos — most common</li>
            <li><strong>Append Blob:</strong> Log file streaming — append-optimized</li>
            <li><strong>Page Blob:</strong> VHD files (Azure VM disks in unmanaged format)</li>
            <li><strong>Access tiers:</strong> Hot (frequent access) → Cool (infrequent, 30-day min) → Cold (rare, 90-day min) → Archive (offline, hours retrieval, 180-day min)</li>
            <li><strong>Lifecycle Management policies:</strong> Automatically tier down based on last access time</li>
          </ul>
        </section>

        <section id="azure-files">
          <h3 style={S.h3}>Azure Files</h3>
          <p style={S.p}>
            Azure Files is a fully managed file share service — supports SMB 3.0 (Windows/Linux/macOS) and NFS 4.1 (Linux). The cloud equivalent of a traditional NAS. Multiple VMs can mount it simultaneously.
          </p>
          <p style={S.p}>
            <strong>Azure File Sync:</strong> Azure Files cache on an on-prem Windows Server — with cloud tiering, old files automatically move to Azure while hot files are kept locally. Useful for gradual on-prem-to-cloud file server migration.
          </p>
          <p style={S.p}>
            Authentication: supports Azure AD Kerberos authentication — domain-joined VMs can mount directly without credentials.
          </p>
        </section>

        <section id="queue-table">
          <h3 style={S.h3}>Queue Storage and Table Storage</h3>
          <p style={S.p}>
            <strong>Queue Storage:</strong> Simple message queue — producer/consumer pattern. Up to 64KB per message, 7-day retention (configurable up to 7 days). For decoupling app components. Equivalent to AWS SQS Standard (simpler features).
          </p>
          <p style={S.p}>
            <strong>Table Storage:</strong> NoSQL key-value store — schemaless entities, Partition Key + Row Key. Low cost, simple queries. Cosmos DB is better for complex queries or global distribution. A simpler, cheaper alternative to AWS DynamoDB for basic use cases.
          </p>
        </section>

        <section id="managed-disks">
          <h3 style={S.h3}>Managed Disks</h3>
          <p style={S.p}>
            Azure Managed Disks are block storage for VMs — Microsoft manages the storage infrastructure, you just create the disk and attach it to the VM. Automatic 3-copy replication within the Region (LRS) by default.
          </p>
          <ul style={S.ul}>
            <li><strong>Ultra Disk:</strong> Sub-ms latency, up to 160,000 IOPS — mission-critical databases</li>
            <li><strong>Premium SSD v2:</strong> High performance, granular IOPS/throughput control — production databases</li>
            <li><strong>Premium SSD:</strong> Reliable SSD — most production workloads</li>
            <li><strong>Standard SSD:</strong> Cost-effective SSD — dev/test, light production</li>
            <li><strong>Standard HDD:</strong> Lowest cost — backup, archival, infrequent access</li>
          </ul>
          <p style={S.p}>
            Snapshots: a point-in-time copy of a Managed Disk. Incremental snapshots available. Cross-region copy possible. Equivalent to AWS EBS Snapshot.
          </p>
        </section>

        <section id="storage-advanced">
          <h3 style={S.h3}>Data Lake, NetApp Files and File Sync</h3>
          <p style={S.p}>
            <strong>Azure Data Lake Storage Gen2 (ADLS Gen2):</strong> Built on Blob Storage — enable the hierarchical namespace. Optimized for big data analytics, Apache Spark, Databricks. Equivalent to AWS S3 + hierarchical namespace.
          </p>
          <p style={S.p}>
            <strong>Azure NetApp Files:</strong> Managed NetApp ONTAP service — NFS/SMB, ultra-low latency, enterprise file services. For SAP HANA, VDI, HPC workloads. Familiar to enterprises running on-prem NetApp — same APIs, same capabilities.
          </p>
        </section>

        <Figure caption="Azure Storage: Blob, Files, Queue, Table, Managed Disks — types, tiers and DC engineer mapping">
          <AzureStorageDiagram />
        </Figure>
      </section>

      {/* ─── DATABASES ────────────────────────────────────────────────────── */}
      <section id="databases">
        <h2 style={S.h2}>Databases</h2>

        <section id="azure-sql">
          <h3 style={S.h3}>Azure SQL Database</h3>
          <p style={S.p}>
            Azure SQL Database is a fully managed, SQL Server based relational database. Microsoft manages the OS, database engine, patches and HA. Your responsibility: schema, queries, security, data.
          </p>
          <ul style={S.ul}>
            <li><strong>Deployment options:</strong> Single Database (isolated), Elastic Pool (multiple DBs shared resources), Managed Instance (full SQL Server compatibility)</li>
            <li><strong>Service tiers:</strong> General Purpose (balanced), Business Critical (in-memory, high IOPS), Hyperscale (up to 100TB, fast backups)</li>
            <li><strong>HA built-in:</strong> Business Critical tier — Always On Availability Groups, 3 replicas. General Purpose — storage redundancy.</li>
            <li><strong>Geo-replication:</strong> Active Geo-Replication — readable secondaries in different Regions. Auto-Failover Groups — automatic failover with DNS endpoint update</li>
          </ul>
          <p style={S.p}>
            Equivalent to AWS RDS SQL Server — but Managed Instance has much better compatibility for SQL Server migration (SQL Agent, CLR, cross-DB queries etc.).
          </p>
        </section>

        <section id="cosmos-db">
          <h3 style={S.h3}>Azure Cosmos DB</h3>
          <p style={S.p}>
            Cosmos DB is a globally distributed, multi-model NoSQL database. APIs: Core SQL (document), MongoDB, Cassandra, Gremlin (graph), Table. Single-digit ms latency globally. Automatic write replication across multiple regions.
          </p>
          <ul style={S.ul}>
            <li><strong>Consistency levels:</strong> Strong, Bounded Staleness, Session, Consistent Prefix, Eventual — choose tradeoff</li>
            <li><strong>Global distribution:</strong> Read/write in any Region — automatic replication</li>
            <li><strong>Serverless mode:</strong> Pay per request unit, no provisioned throughput</li>
            <li><strong>Partition key:</strong> Critical design decision — determines scalability</li>
          </ul>
          <p style={S.p}>
            A competitor to AWS DynamoDB — but Cosmos DB supports multiple APIs (MongoDB, Cassandra), which DynamoDB does not. Migrating legacy MongoDB/Cassandra workloads to Azure is easier with Cosmos DB.
          </p>
        </section>

        <section id="other-databases">
          <h3 style={S.h3}>Other Managed Databases</h3>
          <ComparisonTable
            headers={["Service", "Type", "Use Case", "AWS Equivalent"]}
            rows={[
              ["Azure Database for PostgreSQL", "Managed PostgreSQL", "Open-source relational", "Amazon RDS PostgreSQL / Aurora PostgreSQL"],
              ["Azure Database for MySQL", "Managed MySQL", "Web apps, WordPress", "Amazon RDS MySQL / Aurora MySQL"],
              ["Azure Cache for Redis", "Managed Redis", "Session cache, leaderboard, pub/sub", "Amazon ElastiCache Redis"],
              ["Azure Synapse Analytics", "Data warehouse + analytics", "Enterprise BI, big data", "Amazon Redshift"],
              ["Azure Database for MariaDB", "Managed MariaDB", "MariaDB workloads", "Amazon RDS MariaDB"],
            ]}
          />
        </section>
      </section>

      {/* ─── HIGH AVAILABILITY ────────────────────────────────────────────── */}
      <section id="high-availability">
        <h2 style={S.h2}>High Availability</h2>

        <section id="ha-options">
          <h3 style={S.h3}>Availability Sets vs Availability Zones</h3>
          <p style={S.p}>
            In Azure there are two primary mechanisms for HA at the VM level:
          </p>
          <ul style={S.ul}>
            <li><strong>Availability Set:</strong> Within the same Region/DC — different racks (Fault Domains, 2-3) and different update waves (Update Domains, up to 20). Does not protect against a single AZ failure. Legacy pattern — for older deployments.</li>
            <li><strong>Availability Zones:</strong> Physically separate data centers within Region. AZ failure isolated. 99.99% SLA for VMs across AZs. Modern recommended approach.</li>
          </ul>
          <Callout type="important" title="Availability Set ≠ Availability Zone">
            Common misconception: Availability Set = zone-aware. No! An Availability Set distributes across racks in the same data center. In an AZ failure (power loss in one DC), the Availability Set gives no protection. Use Availability Zones for production workloads.
          </Callout>
        </section>

        <section id="zone-redundant">
          <h3 style={S.h3}>Zone-Redundant Services</h3>
          <p style={S.p}>
            Many Azure services can be deployed natively zone-redundant — a single deployment automatically spans AZs:
          </p>
          <ul style={S.ul}>
            <li>Azure Standard Load Balancer: zone-redundant by default (Standard tier)</li>
            <li>Azure Application Gateway v2: zone-redundant with zone pinning option</li>
            <li>Azure SQL Database Business Critical: zone-redundant replicas</li>
            <li>Azure Storage ZRS: synchronous replication across 3 AZs</li>
            <li>Azure Kubernetes Service: node pools across AZs</li>
            <li>Azure Cache for Redis: zone-redundant Premium tier</li>
          </ul>
        </section>

        <Figure caption="Azure HA and Disaster Recovery: Availability Zones, ASR, cross-region patterns">
          <AzureHaDrDiagram />
        </Figure>
      </section>

      {/* ─── DISASTER RECOVERY ────────────────────────────────────────────── */}
      <section id="disaster-recovery">
        <h2 style={S.h2}>Disaster Recovery</h2>

        <section id="azure-site-recovery">
          <h3 style={S.h3}>Azure Site Recovery (ASR)</h3>
          <p style={S.p}>
            ASR is a VM replication and orchestrated failover service. It continuously replicates Azure VMs to a secondary Region. It can also replicate physical servers and VMware VMs into Azure (on-prem to Azure DR).
          </p>
          <ul style={S.ul}>
            <li>RPO: as low as 30 seconds for Azure VMs</li>
            <li>RTO: minutes (automated recovery plans)</li>
            <li>Test failover: validate DR without affecting production traffic</li>
            <li>Recovery Plans: define an ordered failover sequence — multiple VMs, dependencies, pre/post scripts</li>
            <li>Reprotect: reverse replication + failback after the primary Region is restored</li>
          </ul>
        </section>

        <section id="backup">
          <h3 style={S.h3}>Azure Backup</h3>
          <p style={S.p}>
            Azure Backup is a managed backup service — stored in a Recovery Services Vault or Backup Vault. Supports: Azure VMs, Managed Disks, Azure SQL, Azure Files, SAP HANA, on-prem servers (MARS agent).
          </p>
          <ul style={S.ul}>
            <li>Backup policies: define retention rules — daily/weekly/monthly/yearly</li>
            <li>Cross-region restore: restore to the paired Region from a GRS Vault is possible</li>
            <li>Soft delete: 14 days of protection against accidental deletion (default)</li>
            <li>Immutable Vault: ransomware protection — backup data tamper-proof</li>
          </ul>
        </section>

        <section id="dr-patterns">
          <h3 style={S.h3}>DR Patterns</h3>
          <ComparisonTable
            headers={["Pattern", "RTO", "RPO", "Cost", "Approach"]}
            rows={[
              ["Backup/Restore", "Hours", "Hours", "Lowest", "Azure Backup → restore in DR Region when needed"],
              ["Pilot Light", "Minutes-hours", "Minutes", "Low", "ASR replication + minimal DR infra (DB only), scale on DR"],
              ["Warm Standby", "Minutes", "Near-zero", "Medium", "ASR + scaled-down replica always running in DR Region"],
              ["Hot Standby / Active-Active", "Near-zero", "Near-zero", "Highest", "Traffic Manager / Front Door routes to both Regions"],
            ]}
          />
        </section>
      </section>

      {/* ─── MONITORING ───────────────────────────────────────────────────── */}
      <section id="monitoring">
        <h2 style={S.h2}>Monitoring and Observability</h2>

        <section id="azure-monitor">
          <h3 style={S.h3}>Azure Monitor</h3>
          <p style={S.p}>
            Azure Monitor is Azure's central observability platform — metrics, logs, alerts, dashboards all in one place. The cloud equivalent of traditional DC monitoring (SCOM, Nagios, SolarWinds).
          </p>
          <ul style={S.ul}>
            <li><strong>Metrics:</strong> Near-real-time numeric data (CPU %, network bytes, disk IOPS). 93 days retention. Automatically collected for Azure resources.</li>
            <li><strong>Alerts:</strong> Metric/log/activity alerts → Action Groups (email, SMS, webhook, ITSM ticketing, Logic App automation)</li>
            <li><strong>Azure Monitor Agent (AMA):</strong> Install on the VM → logs and custom metrics go to the Log Analytics workspace</li>
            <li><strong>Activity Log:</strong> ARM-level API calls — who did what, when. CloudTrail equivalent. 90 days retention (send to Log Analytics for longer).</li>
          </ul>
        </section>

        <section id="log-analytics">
          <h3 style={S.h3}>Log Analytics and KQL</h3>
          <p style={S.p}>
            Log Analytics Workspace is the log storage and query engine in Azure Monitor. Query logs with KQL (Kusto Query Language). Equivalent to CloudWatch Logs Insights, but more powerful and expressive.
          </p>
          <ul style={S.ul}>
            <li>Data sources: VM logs (AMA), AKS container logs, NSG flow logs, Azure Firewall, App Service, SQL, custom sources</li>
            <li>Retention: configurable 30 days to 2 years (Interactive) + archive tier (up to 7 years)</li>
            <li>Workbooks: KQL queries + visualizations = interactive dashboards</li>
            <li>Application Insights: APM service — request rates, failures, latency, user flows and distributed tracing for web apps. Built on Log Analytics.</li>
          </ul>
          <p style={S.p}>
            KQL practical examples — these queries run directly in Log Analytics:
          </p>
          <ul style={S.ul}>
            <li><code>{"Heartbeat | summarize count() by Computer, bin(TimeGenerated, 1h)"}</code> — VM heartbeat per hour (connectivity check)</li>
            <li><code>{"AzureActivity | where ActivityStatusValue == 'Failed' | project TimeGenerated, Caller, OperationName"}</code> — failed ARM operations (audit)</li>
            <li><code>{"AzureDiagnostics | where Category == 'AzureFirewallNetworkRule' and msg_s contains 'Deny'"}</code> — Azure Firewall blocked traffic</li>
            <li><code>{"Perf | where CounterName == '% Processor Time' | summarize avg(CounterValue) by Computer"}</code> — average CPU per VM</li>
          </ul>
          <p style={S.p}>
            KQL pipeline syntax: <code>TableName | where condition | project columns | summarize aggregation | order by column</code>. If you are familiar with SQL, you will pick up KQL quickly — the syntax is different but the concepts overlap.
          </p>
        </section>

        <section id="defender-cloud">
          <h3 style={S.h3}>Microsoft Defender for Cloud</h3>
          <p style={S.p}>
            Defender for Cloud (formerly Security Center + Azure Defender) is a combined CSPM + CWP platform. Equivalent to AWS GuardDuty + Security Hub combined.
          </p>
          <ul style={S.ul}>
            <li><strong>Secure Score:</strong> Quantifies security posture — follow the recommendations, improve the score</li>
            <li><strong>Regulatory Compliance:</strong> CIS, NIST, PCI-DSS, ISO 27001 automated compliance dashboard</li>
            <li><strong>Defender plans:</strong> VMs (JIT, adaptive app controls, file integrity monitoring), SQL, Containers, Storage, Key Vault, App Service, DNS</li>
            <li><strong>Multi-cloud:</strong> Manage AWS and GCP resources in Defender for Cloud too (via Azure Arc)</li>
          </ul>
        </section>

        <Figure caption="Azure Monitor, Log Analytics, Defender for Cloud — three-layer observability and security stack">
          <AzureMonitoringDiagram />
        </Figure>
      </section>

      {/* ─── SECURITY ─────────────────────────────────────────────────────── */}
      <section id="security">
        <h2 style={S.h2}>Azure Security Services</h2>

        <section id="key-vault">
          <h3 style={S.h3}>Azure Key Vault</h3>
          <p style={S.p}>
            Key Vault securely stores and manages secrets, keys and certificates. The cloud equivalent of traditional DC HSM + secret management (CyberArk, HashiCorp Vault).
          </p>
          <ul style={S.ul}>
            <li><strong>Secrets:</strong> Connection strings, passwords, API keys — version controlled, audit logged</li>
            <li><strong>Keys:</strong> Cryptographic keys — software-protected or HSM-protected (Premium tier). Use them for envelope encryption (Azure Storage, Azure SQL encryption)</li>
            <li><strong>Certificates:</strong> TLS certificates store, auto-renew, deploy to App Service/Application Gateway</li>
            <li><strong>Access policies vs RBAC:</strong> RBAC preferred for Key Vault access (granular, audit trail)</li>
            <li><strong>Soft delete:</strong> Accidentally deleted secrets can be recovered for up to 90 days</li>
          </ul>
          <p style={S.p}>
            Managed Identity + Key Vault = best practice. A VM or Function needs to read secrets from Key Vault → assign a Managed Identity → assign the Key Vault Secrets User RBAC role → no credentials in code.
          </p>
        </section>

        <section id="azure-sentinel">
          <h3 style={S.h3}>Microsoft Sentinel (SIEM/SOAR)</h3>
          <p style={S.p}>
            Microsoft Sentinel is a cloud-native SIEM (Security Information and Event Management) + SOAR (Security Orchestration, Automation and Response) platform. More mature SIEM capabilities than AWS Security Hub.
          </p>
          <ul style={S.ul}>
            <li>Data connectors: Azure services, Microsoft 365, AWS, third-party security tools, custom</li>
            <li>Analytics rules: built-in ML rules + custom KQL rules for threat detection</li>
            <li>Incidents: correlated alerts → incidents → investigation graph</li>
            <li>Playbooks: Logic Apps-based automated response (block IP, disable user, create ticket)</li>
            <li>Threat hunting: KQL queries across all data for proactive hunting</li>
          </ul>
        </section>

        <section id="ddos-waf">
          <h3 style={S.h3}>DDoS Protection and WAF</h3>
          <p style={S.p}>
            <strong>Azure DDoS Protection:</strong> Basic tier (free, always on for Azure infrastructure) vs Network Protection tier (enhanced, per VNet charge, DDoS rapid response team access, cost protection). AWS Shield Standard/Advanced equivalent.
          </p>
          <p style={S.p}>
            <strong>Azure WAF:</strong> L7 web application firewall — available on Application Gateway (regional), Azure Front Door (global), CDN. OWASP Core Rule Set, custom rules, bot protection, rate limiting. AWS WAF equivalent — but Azure WAF more tightly integrated with App Gateway.
          </p>
        </section>
      </section>

      {/* ─── IaC ──────────────────────────────────────────────────────────── */}
      <section id="iac">
        <h2 style={S.h2}>Infrastructure as Code on Azure</h2>

        <section id="arm-templates">
          <h3 style={S.h3}>ARM Templates and Bicep</h3>
          <p style={S.p}>
            ARM Templates are JSON-based declarative IaC — Azure native. Complex, verbose JSON. <strong>Bicep</strong> is Microsoft's DSL (Domain-Specific Language) on top of ARM Templates — much cleaner syntax, transpiled into ARM JSON. Both are idempotent — run the same template, get the same result.
          </p>
          <ul style={S.ul}>
            <li>Bicep: shorter syntax, type-safe, intellisense support, native Azure integration</li>
            <li>Template Specs: store ARM/Bicep templates centrally → reuse across the org</li>
            <li>Deployment Stacks: group deployments, managed cleanup (delete stack → delete all resources)</li>
            <li>What-if: preview changes before deploying (CloudFormation Change Sets equivalent)</li>
          </ul>
        </section>

        <section id="terraform-azure">
          <h3 style={S.h3}>Terraform on Azure</h3>
          <p style={S.p}>
            Terraform uses the HashiCorp Provider for Azure (<code>azurerm</code>) — to manage all Azure resources. Preferred for multi-cloud environments, existing Terraform skills and the mature Terraform ecosystem. It does not always have immediate complete parity with Azure-specific features (Bicep), but the community is active.
          </p>
          <p style={S.p}>
            Remote state: store it in Azure Blob Storage (state file) + Azure Blob lease-based locking (prevents concurrent applies) — for team collaboration. <code>terraform plan</code> → review → <code>terraform apply</code>. Integrate into CI/CD with Azure DevOps or GitHub Actions.
          </p>
        </section>
      </section>

      {/* ─── PRICING ──────────────────────────────────────────────────────── */}
      <section id="pricing">
        <h2 style={S.h2}>Azure Pricing and Cost Management</h2>

        <section id="pricing-model">
          <h3 style={S.h3}>Pricing Model</h3>
          <ComparisonTable
            headers={["Cost Driver", "Billing Basis", "Engineering Implication"]}
            rows={[
              ["VM compute", "Per minute/second (VM size)", "Deallocate (stop) unused VMs — stopped VMs still billed if not deallocated"],
              ["Managed Disks", "Per GB-month (disk type)", "Delete unattached disks — they accrue cost"],
              ["Blob Storage", "Per GB-month + operations + egress", "Lifecycle policies for tiering, minimize egress"],
              ["Azure SQL", "Per vCore-hour or DTU-hour + storage", "Serverless tier: pause when idle — auto-billing stops"],
              ["Azure Firewall", "Per deployment-hour + per GB processed", "Shared Firewall for multiple VNets (hub design) reduces cost"],
              ["VNet Peering", "Per GB transferred (local + global)", "Cross-region peering more expensive than local"],
              ["ExpressRoute", "Circuit + Gateway (per hour) + data transfer", "Plan bandwidth tiers carefully"],
              ["Load Balancer", "Per rule-hour (Standard) + data processed", "Consolidate rules where possible"],
            ]}
          />
          <Callout type="warning" title="Deallocate vs Stop">
            If you shut down an Azure VM from the OS (Stop inside OS), the VM is still running and still billed. Deallocate it from the Azure portal or CLI — compute billing stops. Disk charges continue. An important distinction, unlike AWS EC2 stop.
          </Callout>
        </section>

        <section id="cost-tools">
          <h3 style={S.h3}>Cost Management Tools</h3>
          <ul style={S.ul}>
            <li><strong>Azure Cost Management + Billing:</strong> Spend analysis, budgets, cost alerts, recommendations. AWS Cost Explorer equivalent.</li>
            <li><strong>Azure Advisor:</strong> Cost, performance, security, reliability, operational excellence recommendations. Identifies idle VMs and underutilized resources. Equivalent to AWS Trusted Advisor.</li>
            <li><strong>Reserved Instances:</strong> 1yr/3yr commitment — up to 72% savings on VMs, SQL, Cosmos DB etc.</li>
            <li><strong>Azure Hybrid Benefit:</strong> Use existing Windows Server + SQL Server licenses in Azure — 40-85% savings for licensed workloads.</li>
            <li><strong>Azure Spot VMs:</strong> Unused Azure capacity — up to 90% discount. Azure gives a 2-minute eviction notice (Scheduled Events via IMDS) — design for fault-tolerant workloads.</li>
            <li><strong>Tagging strategy:</strong> Enforce Environment, Team, Application, CostCenter tags — mandatory for cost attribution.</li>
          </ul>
        </section>
      </section>

      {/* ─── AZURE vs AWS ─────────────────────────────────────────────────── */}
      <section id="azure-vs-aws">
        <h2 style={S.h2}>Azure vs AWS</h2>
        <Figure caption="Azure vs AWS: complete service mapping for data center engineers">
          <AzureVsAwsDiagram />
        </Figure>
        <ComparisonTable
          headers={["Dimension", "Azure Advantage", "AWS Advantage"]}
          rows={[
            ["Enterprise integration", "Microsoft 365, AD, SQL Server, Visual Studio native", "Broader ecosystem, more services overall"],
            ["Hybrid cloud", "Azure Arc, Azure Stack, ExpressRoute, AD integration", "AWS Outposts, LocalZones mature"],
            ["Identity", "Entra ID deep integration, RBAC mature", "IAM mature, more granular policies"],
            ["Kubernetes", "AKS simpler Day 2 ops, AGIC, Azure CNI", "EKS more mature, larger K8s ecosystem"],
            ["Pricing flexibility", "Azure Hybrid Benefit (massive savings for MS shops)", "More diverse instance types, spot market"],
            ["Global reach", "60+ Regions, strong Europe/India presence", "More Regions total, longer track record"],
            ["Certification ecosystem", "AZ-900/104/305 well-recognized in enterprise", "AWS certs most recognized globally"],
            ["Documentation", "Improving rapidly, quality inconsistent", "Generally more consistent, deeper"],
          ]}
        />
        <p style={S.p}>
          Objective answer: Azure and AWS are both excellent platforms. <strong>Choose Azure when:</strong> you heavily use existing Microsoft enterprise software (Windows, SQL, AD, M365), hybrid cloud is the primary concern, or you have a .NET development team. <strong>Choose AWS when:</strong> cloud-native startup, widest service selection needed, largest global community needed.
        </p>
      </section>

      {/* ─── ARCHITECTURE EXAMPLES ────────────────────────────────────────── */}
      <section id="architecture-examples">
        <h2 style={S.h2}>Architecture Examples</h2>

        <section id="three-tier-azure">
          <h3 style={S.h3}>Three-Tier Enterprise Application on Azure</h3>
          <ul style={S.ul}>
            <li><strong>DNS + CDN:</strong> Azure DNS → Azure Front Door (global CDN + WAF) → origin</li>
            <li><strong>Web tier:</strong> Application Gateway (L7 LB + WAF) → VMSS (web VMs, AZ-spanning, Standard SSD)</li>
            <li><strong>App tier:</strong> Internal Azure Load Balancer → VMSS (app VMs, private subnet)</li>
            <li><strong>Data tier:</strong> Azure SQL Business Critical (zone-redundant, multi-AZ replicas) + Azure Cache for Redis</li>
            <li><strong>Security:</strong> NSG on each subnet, Azure Firewall on the hub VNet, Key Vault for secrets/certs, Defender for Cloud enabled</li>
            <li><strong>Identity:</strong> Managed Identity on VMs → Key Vault, Storage, SQL access</li>
            <li><strong>Monitoring:</strong> Azure Monitor Agent on all VMs → Log Analytics Workspace. Application Insights for web app. Alerts → Action Groups.</li>
            <li><strong>IaC:</strong> Bicep templates, deployed via Azure DevOps pipeline</li>
          </ul>
        </section>

        <section id="hybrid-azure">
          <h3 style={S.h3}>Hybrid DC to Azure</h3>
          <ul style={S.ul}>
            <li>ExpressRoute (primary, 1Gbps) + VPN Gateway (backup) → Azure Virtual WAN hub</li>
            <li>Hub VNet: Azure Firewall (central policy) + DNS Resolver (hybrid DNS)</li>
            <li>Spoke VNets: app workloads, peered to hub via Virtual WAN</li>
            <li>On-prem AD → Azure AD Connect → Microsoft Entra ID (hybrid identity)</li>
            <li>Azure File Sync: on-prem file servers → Azure Files (gradual migration)</li>
            <li>Azure Arc: on-prem VMs/Kubernetes managed from Azure portal</li>
            <li>Azure Site Recovery: on-prem VMware VMs replicated to Azure (DR)</li>
          </ul>
        </section>
      </section>

      {/* ─── BEST PRACTICES ───────────────────────────────────────────────── */}
      <section id="best-practices">
        <h2 style={S.h2}>Best Practices</h2>
        <ComparisonTable
          headers={["Area", "Best Practice", "Why"]}
          rows={[
            ["Resource naming", "Consistent: env-region-type-name (e.g., prod-eastus-vm-web01)", "Identify resources instantly"],
            ["Tagging", "Environment, Team, Application, CostCenter mandatory", "Cost attribution, automation, RBAC"],
            ["Management Groups", "Prod/NonProd/Sandbox MGs with SCPs via Azure Policy", "Guardrails at org level"],
            ["Managed Identity", "Every workload uses Managed Identity — no credentials in code", "Security + simplicity"],
            ["NSG everywhere", "NSG on every subnet + Defender for Cloud recommendations", "Defence in depth"],
            ["Availability Zones", "All production resources zone-redundant or zone-spanning", "AZ failure isolation"],
            ["Bicep/Terraform IaC", "All infra in code, version controlled, pipeline-deployed", "Reproducible, auditable"],
            ["Key Vault", "All secrets, keys, certs in Key Vault — not in app config", "Secret rotation, audit"],
            ["Azure Backup policies", "Backup all VMs, databases, file shares — test restore quarterly", "DR readiness"],
            ["Cost alerts", "Budget alerts + Advisor recommendations acted on regularly", "Cost control"],
          ]}
        />
      </section>

      {/* ─── COMMON MISTAKES ──────────────────────────────────────────────── */}
      <section id="common-mistakes">
        <h2 style={S.h2}>Common Engineering Mistakes</h2>
        <ComparisonTable
          headers={["Mistake", "Problem", "Correct Approach"]}
          rows={[
            ["VM stopped (OS shutdown) not Deallocated", "Compute still billed", "Deallocate from Azure Portal/CLI — not OS shutdown"],
            ["Availability Set used for AZ-level HA", "AZ failure still causes outage", "Use Availability Zones for modern HA"],
            ["NSG too permissive (allow *.*)", "Open attack surface", "Specific source IPs/SGs, deny all by default"],
            ["Secrets hardcoded in app config", "Exposed in code, logs, git", "Azure Key Vault + Managed Identity"],
            ["Single-region, no DR plan", "Region failure = extended outage", "ASR to paired Region + Azure Backup"],
            ["No tagging strategy", "Cost attribution impossible", "Enforce tags via Azure Policy at Management Group"],
            ["Public IP on database VMs", "Direct Internet exposure", "Private subnet, no public IP, NSG restrict"],
            ["Basic tier LB in production", "No zone support, no SLA, limited features", "Always Standard tier for production"],
            ["Overlapping VNet CIDRs", "Peering impossible", "Plan CIDRs upfront — unique /16 per VNet"],
            ["No monitoring/alerts", "Problems detected by users", "Azure Monitor alerts from day one"],
            ["ARM Templates instead of Bicep", "Verbose JSON, error-prone", "Use Bicep — cleaner, type-safe, IDE support"],
            ["ExpressRoute without VPN backup", "ExpressRoute outage = no hybrid connectivity", "VPN Gateway as backup path"],
          ]}
        />
      </section>

      {/* ─── TROUBLESHOOTING ──────────────────────────────────────────────── */}
      <section id="troubleshooting">
        <h2 style={S.h2}>Troubleshooting</h2>
        <p style={S.p}>Azure troubleshooting needs a systematic approach — resource → network → security → app. VM running ≠ application healthy.</p>
        <ol style={{ ...S.ul, listStyleType: "decimal" }}>
          <li><strong>DNS resolving?</strong> <code>nslookup / Resolve-DnsName</code> — check Azure DNS, Private DNS Zone, custom DNS server</li>
          <li><strong>VM state correct?</strong> Running? Not Deallocated/Stopped? Check the VM state in the Azure portal</li>
          <li><strong>NSG blocking?</strong> Azure portal → NSG → Effective Security Rules. Or use Network Watcher → IP Flow Verify.</li>
          <li><strong>Route correct?</strong> Network Watcher → Next Hop tool — where is the packet actually going?</li>
          <li><strong>Azure Firewall blocking?</strong> Firewall logs → Log Analytics → <code>AzureDiagnostics | where Category == "AzureFirewallNetworkRule"</code></li>
          <li><strong>Load Balancer health?</strong> Check backend pool health — is the probe port/path correct?</li>
          <li><strong>App Service errors?</strong> App Service Diagnostics → Log Stream, Application Insights failures</li>
          <li><strong>VM OS/app issue?</strong> Boot Diagnostics screenshot, Serial Console access, Azure Monitor Agent logs</li>
          <li><strong>RBAC / access denied?</strong> Azure portal → Resource → Access Control (IAM) → Check access. 403 entries in the Activity Log.</li>
          <li><strong>Key Vault access?</strong> Key Vault → Monitoring → Diagnostic Logs — identify deny events</li>
          <li><strong>Hybrid connectivity?</strong> VPN Gateway / ExpressRoute → check Connection Monitor, BGP route tables</li>
        </ol>
        <Callout type="important" title="Network Watcher — The Swiss Army Knife of Azure Troubleshooting">
          Azure Network Watcher: IP Flow Verify (NSG block check), Next Hop (routing check), Connection Monitor (continuous connectivity testing), Packet Capture (remote capture on a VM), NSG Flow Logs (VNet traffic audit). It is the best tool to start troubleshooting with.
        </Callout>
      </section>

      {/* ─── FAILURE SCENARIOS ────────────────────────────────────────────── */}
      <section id="failure-scenarios">
        <h2 style={S.h2}>Practical Failure Scenarios</h2>
        <ComparisonTable
          headers={["Scenario", "Symptom", "Layer", "Verify"]}
          rows={[
            ["VM deallocated not stopped", "Connection refused, VM not responding", "Compute", "Azure portal VM state — Start VM"],
            ["NSG blocks inbound", "Connection timeout, unreachable", "Network/Security", "NSG Effective Rules, Network Watcher IP Flow Verify"],
            ["UDR sending traffic wrong path", "Reachable but slow/broken", "Routing", "Network Watcher Next Hop, route table check"],
            ["Azure Firewall FQDN block", "Specific outbound destinations fail", "Security", "AzureDiagnostics logs, Firewall policy check"],
            ["Private Endpoint DNS not configured", "Private endpoint resolves to public IP", "DNS", "Private DNS Zone linked to VNet? nslookup from VM"],
            ["LB probe failing", "502/503 from LB", "LB", "Backend pool health, probe port/path, NSG allows probe"],
            ["App Service cold start", "First request slow", "App", "Scale-out, Always On setting, Deployment slot warm"],
            ["Cosmos DB throttling", "429 Too Many Requests", "Database", "RU consumption, scale provisioned throughput"],
            ["Key Vault access denied", "Secret retrieval fails", "IAM/Security", "Managed Identity enabled? RBAC role assigned? Firewall?"],
            ["ExpressRoute down", "Hybrid connectivity lost", "Connectivity", "VPN Gateway backup path? Circuit provider status?"],
            ["Azure SQL failover", "Connection drops, reconnect needed", "Database", "Auto-Failover Group? App connection retry logic?"],
            ["ARM deployment fails", "Resource creation error", "IaC", "Activity Log → Failed operation → error details"],
          ]}
        />
      </section>

      {/* ─── CERTIFICATIONS ───────────────────────────────────────────────── */}
      <section id="certifications">
        <h2 style={S.h2}>Azure Certifications and Career</h2>
        <ComparisonTable
          headers={["Certification", "Level", "Focus", "Who Should Take"]}
          rows={[
            ["AZ-900: Azure Fundamentals", "Beginner", "Cloud concepts, Azure services overview", "Anyone starting Azure journey"],
            ["AZ-104: Azure Administrator", "Intermediate", "VMs, VNet, storage, identity, monitoring", "DC/system admins moving to Azure"],
            ["AZ-305: Azure Solutions Architect", "Advanced", "Architecture design, best practices, HA/DR", "Senior engineers, architects"],
            ["AZ-500: Azure Security", "Intermediate", "Security services, identity, compliance", "Security engineers"],
            ["AZ-700: Azure Network Engineer", "Intermediate", "Networking deep dive: VNet, ExpressRoute, VPN", "Network engineers"],
            ["AZ-204: Azure Developer", "Intermediate", "App development on Azure", "Developers"],
            ["AZ-400: DevOps Engineer", "Advanced", "Azure DevOps, CI/CD, IaC", "DevOps engineers"],
          ]}
        />
        <p style={S.p}>
          Recommended path for a Data Center engineer: AZ-900 → AZ-104 → AZ-305. Add AZ-700 if networking is your primary focus. Azure certifications are highly valued in the enterprise sector — especially AZ-104 and AZ-305.
        </p>
        <p style={S.p}>
          Career opportunities: Azure Cloud Engineer, Azure Solutions Architect, Azure Network Engineer, Cloud Security Engineer, DevOps Engineer (Azure). Demand in India is growing rapidly — especially in Bangalore, Hyderabad and Pune, where IT services companies are using Azure heavily.
        </p>
      </section>

      {/* ─── KEY TAKEAWAYS ────────────────────────────────────────────────── */}
      <section id="key-takeaways">
        <h2 style={S.h2}>Key Takeaways</h2>
        <ul style={S.ul}>
          <li><strong>Azure strengths:</strong> Microsoft enterprise ecosystem, hybrid cloud, AD integration, Windows/SQL workloads</li>
          <li><strong>Region Pairs:</strong> Azure-unique concept — platform updates sequential, GRS replication, DR priority</li>
          <li><strong>ARM:</strong> All Azure operations go through ARM — Portal, CLI, PowerShell, all ARM calls</li>
          <li><strong>Resource Groups:</strong> Logical container for same-lifecycle resources — delete group = delete all resources</li>
          <li><strong>Entra ID ≠ AD DS:</strong> Cloud identity provider, not domain controller — OAuth2/OIDC, not LDAP/Kerberos</li>
          <li><strong>Managed Identity:</strong> Zero-credential workload identity — always use instead of embedded keys</li>
          <li><strong>VNet:</strong> Region-wide, L3 isolated — subnets span AZs (via zone-aware VMs)</li>
          <li><strong>NSG:</strong> Stateful, allow+deny, subnet AND NIC — both can apply simultaneously</li>
          <li><strong>Availability Set ≠ Availability Zone:</strong> AZ for modern HA, Availability Set for legacy scenarios</li>
          <li><strong>ExpressRoute:</strong> NOT encrypted by default — add MACsec/IPsec explicitly</li>
          <li><strong>VM Deallocate:</strong> Stop (OS) ≠ Deallocate — Deallocate stops compute billing</li>
          <li><strong>Azure Hybrid Benefit:</strong> Existing Windows/SQL licenses → massive Azure cost savings</li>
          <li><strong>Key Vault:</strong> All secrets/keys/certs here — with Managed Identity, zero credentials in code</li>
          <li><strong>Troubleshoot:</strong> Network Watcher first — IP Flow Verify, Next Hop, Connection Monitor</li>
          <li><strong>IaC:</strong> Bicep for Azure-native, Terraform for multi-cloud — always version controlled</li>
        </ul>
      </section>

      {/* ─── FAQ ──────────────────────────────────────────────────────────── */}
      <section id="faq" style={{ marginTop: "3rem" }}>
        <h2 style={S.h2}>Frequently Asked Questions</h2>
        {azureContent.faq.map((item, i) => (
          <div key={i} style={{ marginBottom: "2rem" }}>
            <h3 style={{ ...S.h3, color: "#111827" }}>{item.question}</h3>
            <p style={S.p}>{item.answer}</p>
          </div>
        ))}
      </section>

    </article>
  );
}
