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
          Microsoft Azure duniya ka doosra sabse bada public cloud platform hai — especially enterprises ke liye, kyunki yeh Microsoft ke existing ecosystem (Windows Server, Active Directory, SQL Server, Office 365, Visual Studio) se deeply integrated hai. Data Center engineer ke liye Azure samajhna matlab hai: traditional DC concepts ko cloud mein map karna, Azure-specific architecture samajhna (VNet, NSG, ARM, Entra ID), aur hybrid DC-to-Azure connectivity design karna.
        </p>
        <p style={S.p}>
          Yeh article AWS article ka Azure counterpart hai — same depth, same engineering accuracy, same Hinglish style. AWS already padh chuke ho toh differences clearly highlight kiye hain. Azure fresh start se padh rahe ho toh complete foundation milegi.
        </p>
        <Callout type="important" title="Azure ≠ AWS in Terminology">
          Azure aur AWS dono public clouds hain lekin terminology significant different hai. AWS VPC = Azure VNet. AWS Security Group = Azure NSG (lekin behavior different). AWS IAM = Azure RBAC + Entra ID. AWS CloudFormation = Azure ARM Templates. Concepts map karte hain lekin implementation details vary karte hain — dono ko assume mat karo identical.
        </Callout>
      </section>

      {/* ─── WHAT IS AZURE ────────────────────────────────────────────────── */}
      <section id="what-is-azure">
        <h2 style={S.h2}>What Is Microsoft Azure?</h2>
        <p style={S.p}>
          Microsoft Azure Microsoft ka public cloud computing platform hai — compute, storage, networking, databases, AI/ML, IoT, security aur hundreds of other services globally available hain. Azure Microsoft ke massive worldwide data center network pe run karta hai.
        </p>
        <p style={S.p}>
          Azure ka primary competitive advantage hai Microsoft enterprise ecosystem integration — companies jo Windows Server, SQL Server, Active Directory, Office 365/M365 use karti hain, unke liye Azure natural extension hai. Hybrid cloud aur on-prem-to-cloud journeys mein Azure particularly strong hai.
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
            Azure 2010 mein "Windows Azure" ke roop mein launch hua — primarily Windows/.NET workloads ke liye. 2014 mein "Microsoft Azure" rename hua aur Linux/open-source support badhaya. Satya Nadella ke CEO banne ke baad Azure enterprise aur hybrid cloud pe focus kiya — yeh strategy bahut successful rahi.
          </p>
          <p style={S.p}>
            Azure exist karta hai kyunki Microsoft enterprise software ka dominant provider tha — on-prem. Jab enterprises cloud ki taraf move karne lage, Microsoft ko apne customers retain karne ke liye cloud platform chahiye tha. Azure ka DNA enterprise + hybrid hai — AWS ka DNA internet startups se hai. Yeh fundamental difference architecture aur feature priorities mein dikhta hai.
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
            Azure data center physical security = Microsoft responsibility. Tumhara Azure VM ka OS patch nahi hua = tumhari responsibility. Cosmos DB ka firewall rule galat = tumhari responsibility. Har service type ke liye responsibility boundary clearly samjho.
          </Callout>
        </section>
      </section>

      {/* ─── GLOBAL INFRASTRUCTURE ────────────────────────────────────────── */}
      <section id="global-infrastructure">
        <h2 style={S.h2}>Azure Global Infrastructure</h2>

        <section id="regions">
          <h3 style={S.h3}>Regions</h3>
          <p style={S.p}>
            Azure 60+ Regions worldwide mein operate karta hai (Microsoft continuously adding). Har Region ek specific geographic area mein Microsoft ka data center cluster hai — East US, Central India, West Europe, Southeast Asia etc. Regions independent hain — ek Region ke resources automatically doosre Region mein nahi jaate.
          </p>
          <p style={S.p}>
            Data residency: Azure Regions data sovereignty ke liye aligned hain. India mein data rakhna ho toh Central India ya South India Region choose karo. EU GDPR ke liye EU Regions. Resources ek Region mein deploy hote hain aur wahan rahte hain unless explicitly replicated.
          </p>
        </section>

        <section id="availability-zones">
          <h3 style={S.h3}>Availability Zones</h3>
          <p style={S.p}>
            AZ ek Region ke andar physically separate data center facility hai — independent power, cooling aur networking. Azure ke most Regions mein 3 AZs hain. Ek AZ fail ho toh doosri AZs unaffected rahti hain.
          </p>
          <p style={S.p}>
            Not all Azure Regions have AZs — older Regions ya smaller geographies mein AZ support absent ho sakti hai. Resources deploy karne se pehle us Region ka AZ support verify karo.
          </p>
        </section>

        <section id="region-pairs">
          <h3 style={S.h3}>Region Pairs — Azure ka Unique Concept</h3>
          <p style={S.p}>
            Azure Regions paired hain — har Region ka ek designated "pair Region" hai same geography mein (typically 300+ miles apart). Examples: East US ↔ West US, North Europe ↔ West Europe, Central India ↔ South India.
          </p>
          <ul style={S.ul}>
            <li><strong>Platform updates sequential:</strong> Microsoft dono paired Regions ko simultaneously update nahi karta — risk reduces</li>
            <li><strong>GRS replication:</strong> Geo-Redundant Storage automatically pair Region mein replicate karta hai</li>
            <li><strong>DR priority:</strong> Major disaster mein Azure paired Region ko recovery priority deta hai</li>
            <li><strong>Azure Site Recovery default:</strong> ASR default DR target paired Region hoti hai</li>
          </ul>
          <Callout type="important" title="Region Pairs ≠ AWS Analogy">
            AWS mein explicit "Region Pair" concept nahi hai — engineer khud DR Region choose karta hai. Azure mein Region Pairs Microsoft-defined hain aur platform updates + GRS replication directly linked hain. Architecture decision mein yeh factor karo.
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
            ARM Azure ka management layer hai — har operation (Portal, CLI, PowerShell, SDK, REST API) ARM ke through jaata hai. ARM resources authenticate karta hai, authorize karta hai (RBAC check), aur resource providers ko route karta hai. Traditional DC analogy: central management plane ya configuration management tool jaise Ansible Tower — lekin yeh Azure ka fundamental backbone hai.
          </p>
          <p style={S.p}>
            <strong>Control Plane vs Data Plane:</strong> ARM ek <em>control plane</em> hai — resources create/read/update/delete karna. <em>Data plane</em> alag hota hai — resource ke andar data operate karna. Example: Storage Account create karna = ARM (control plane). Storage mein blob upload/download = Storage Data Plane APIs (direct endpoint pe). RBAC role assignment bhi alag hai: <code>Microsoft.Storage/storageAccounts/write</code> = control plane permission. <code>Microsoft.Storage/storageAccounts/blobServices/containers/blobs/read</code> = data plane permission. Dono alag hain — kisi ko storage account manage karne ka RBAC access dena ≠ unhe data read karne ka access.
          </p>
          <p style={S.p}>
            <strong>Resource Providers:</strong> ARM specific resource types ke liye requests Resource Providers ko delegate karta hai. Har Azure service ek Resource Provider register karta hai: <code>Microsoft.Compute</code> (VMs), <code>Microsoft.Network</code> (VNet, NSG), <code>Microsoft.Storage</code> (Storage Accounts), <code>Microsoft.Sql</code> (SQL Databases). Subscription mein ek Resource Provider registered hona chahiye before us service ke resources create ho sakein. New subscriptions mein commonly-used providers auto-registered hote hain; niche services ke liye manually register karna pad sakta hai.
          </p>
          <p style={S.p}>
            ARM Templates: JSON/Bicep format mein infrastructure-as-code. Template describe karta hai desired state → ARM deploy karta hai. Idempotent — same template multiple times run karo, same result milta hai.
          </p>
        </section>

        <section id="resource-groups">
          <h3 style={S.h3}>Resource Groups</h3>
          <p style={S.p}>
            Resource Group ek logical container hai — related Azure resources together group karta hai. Key rules:
          </p>
          <ul style={S.ul}>
            <li>Har Azure resource exactly ek Resource Group mein hona chahiye</li>
            <li>Resource Group ek Region select karta hai — metadata storage ke liye (resources khud alag Regions mein ho sakte hain)</li>
            <li>Poora group delete karo → sab resources delete. Ek app ke sab resources ek RG mein rakhna lifecycle management simplify karta hai</li>
            <li>RBAC aur Azure Policy RG level pe assign kar sakte hain — inherited by all resources in group</li>
            <li>Billing: tags se cost tracking karo, RG se nahi (unless all resources same RG mein hain)</li>
          </ul>
        </section>

        <section id="subscriptions">
          <h3 style={S.h3}>Subscriptions</h3>
          <p style={S.p}>
            Subscription ek billing unit hai aur resources ka logical boundary hai. Ek subscription ke under resources deploy hote hain. Multiple subscriptions ek organization ke liye hona common hai — prod/dev/staging separation, team isolation, cost center separation.
          </p>
          <p style={S.p}>
            Subscription limits (quotas): har subscription mein service limits hain — jaise VM cores per region, VNets per subscription. Large deployments mein multiple subscriptions needed ho sakti hain.
          </p>
        </section>

        <section id="management-groups">
          <h3 style={S.h3}>Management Groups</h3>
          <p style={S.p}>
            Management Groups multiple Subscriptions ko hierarchically organize karte hain. Root → Management Groups → Subscriptions → Resource Groups → Resources. Azure Policy aur RBAC Management Group pe assign karo → automatically sabhi child subscriptions mein inherit hota hai. Enterprise governance ke liye essential.
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
            Microsoft Entra ID cloud-native identity aur access management service hai — web applications, APIs aur Microsoft 365 ke liye. Yeh traditional Active Directory Domain Services (AD DS) ka replacement nahi hai — yeh ek separate, complementary service hai.
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
            Entra ID ek cloud identity provider hai — on-prem AD ka cloud version nahi. On-prem AD maintain karna padega Windows domain-joined machines aur on-prem apps ke liye. Hybrid: Azure AD Connect tool dono sync karta hai.
          </Callout>
        </section>

        <section id="rbac">
          <h3 style={S.h3}>Azure RBAC</h3>
          <p style={S.p}>
            Azure RBAC (Role-Based Access Control) Azure resources pe authorization manage karta hai. Three elements: Security Principal (User/Group/Service Principal/Managed Identity) + Role Definition (permissions set) + Scope (Management Group → Subscription → RG → Resource).
          </p>
          <p style={S.p}>
            Built-in roles: Owner (full control + RBAC), Contributor (full control - RBAC), Reader (view only), + 200+ service-specific roles (Virtual Machine Contributor, Storage Blob Data Reader etc.). Custom roles: exact permissions define karo — enterprise fine-grained access ke liye.
          </p>
          <p style={S.p}>
            RBAC assignment inherited: parent scope pe assign karo → child scopes mein automatically applies. Management Group pe Reader assign kiya → that person can read in all subscriptions under it.
          </p>
        </section>

        <section id="managed-identity">
          <h3 style={S.h3}>Managed Identity</h3>
          <p style={S.p}>
            Managed Identity Azure resource (VM, Function, AKS pod) ko Entra ID identity deta hai — credentials code mein hardcode karne ki zaroorat nahi. Resource automatically tokens request karta hai Azure Instance Metadata Service se.
          </p>
          <ul style={S.ul}>
            <li><strong>System-assigned:</strong> Resource ke saath create/delete hoti hai. One-to-one relationship. Resource delete hone pe Entra ID mein corresponding Service Principal automatically remove hota hai — manual cleanup ki zaroorat nahi.</li>
            <li><strong>User-assigned:</strong> Independently managed, multiple resources pe assign possible. Resource delete hone pe MI exist karti rahti hai — manually delete karna padta hai. Recommended for shared identity patterns aur scenarios jahan same identity multiple resources pe chahiye.</li>
            <li><strong>Example:</strong> VM ko Key Vault se secrets read karne chahiye → Managed Identity enable karo → Key Vault pe RBAC role assign karo (Key Vault Secrets User) → no credentials needed in code.</li>
          </ul>
        </section>

        <section id="hybrid-identity">
          <h3 style={S.h3}>Hybrid Identity</h3>
          <p style={S.p}>
            On-prem AD + Entra ID together. Azure AD Connect (or newer Azure AD Connect Cloud Sync) on-prem AD se Entra ID mein users/groups sync karta hai. Auth options:
          </p>
          <ul style={S.ul}>
            <li><strong>Password Hash Sync (PHS):</strong> Password hash cloud mein — cloud authentication. Simplest, most resilient. On-prem down hone pe bhi cloud auth works.</li>
            <li><strong>Pass-through Authentication (PTA):</strong> Cloud auth request → on-prem agent → AD validates. Password cloud mein nahi jaata. Compliance requirement ke liye.</li>
            <li><strong>Federation (ADFS):</strong> On-prem ADFS handles auth. Most complex, most control. Usually for specific compliance scenarios.</li>
          </ul>
        </section>

        <Figure caption="Azure Identity: Entra ID, RBAC, Managed Identity aur Hybrid Identity — enterprise identity architecture">
          <AzureIdentityDiagram />
        </Figure>
      </section>

      {/* ─── NETWORKING ───────────────────────────────────────────────────── */}
      <section id="networking">
        <h2 style={S.h2}>Azure Networking</h2>

        <section id="vnet">
          <h3 style={S.h3}>Azure Virtual Network (VNet)</h3>
          <p style={S.p}>
            VNet Azure ka isolated virtual network hai — traditional DC ka private enterprise network equivalent. VNet ek Region mein hoti hai lekin multiple AZs span karti hai (subnet pe AZ pin karo VM ke through). VNet ko ek CIDR block assign karo (e.g., <code>10.0.0.0/16</code>).
          </p>
          <p style={S.p}>
            AWS VPC vs Azure VNet: conceptually same — isolated L3 network. Key difference: Azure VNet mein Internet connectivity by default partially available (outbound) unless specifically blocked. AWS VPC mein default deny. Azure NSG default rules: allow VNet inbound, allow Azure LB inbound, deny all Internet inbound — practically secure by default for inbound.
          </p>
        </section>

        <section id="subnets-nsg">
          <h3 style={S.h3}>Subnets and NSG</h3>
          <p style={S.p}>
            Subnet VNet ka subdivision hai. NSG (Network Security Group) subnet ya NIC pe attach hoti hai — stateful L3/L4 traffic filter. Default NSG rules: allow VNet traffic, allow Azure LB, deny Internet inbound.
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
            Azure mein NSG subnet pe aur NIC pe dono attach ho sakti hain. Evaluation order direction pe depend karta hai: <strong>Inbound traffic</strong> → subnet NSG pehle, phir NIC NSG. <strong>Outbound traffic</strong> → NIC NSG pehle, phir subnet NSG. Default NSG rules (auto-created, delete nahi kar sakte, sirf override karo): priority 65000 (AllowVnetInBound/AllowVnetOutBound), 65001 (AllowAzureLoadBalancerInBound), 65500 (DenyAllInBound/DenyAllOutBound). Outbound Internet by default allowed hai default NSG mein (priority 65001 AllowInternetOutBound). Custom rules 100–4096 priority range mein likho.
          </Callout>
        </section>

        <section id="routing">
          <h3 style={S.h3}>Route Tables and UDR</h3>
          <p style={S.p}>
            Azure mein har VNet ka implicit system route table hota hai — VNet traffic, Internet traffic, VPN/ExpressRoute routes automatically handle karta hai. User Defined Routes (UDR) custom routes add karte hain — traffic specific appliance (Azure Firewall, NVA) ke through force karne ke liye.
          </p>
          <p style={S.p}>
            Common UDR pattern: 0.0.0.0/0 → Azure Firewall IP. Sab outbound traffic Azure Firewall inspect kare. Traditional DC force routing via firewall concept same hai — lekin Azure mein UDR through implement hota hai.
          </p>
        </section>

        <section id="vnet-peering">
          <h3 style={S.h3}>VNet Peering and Service Endpoints</h3>
          <p style={S.p}>
            VNet Peering do VNets ko directly connect karta hai — same Region (local peering) ya different Region (global peering). Non-transitive: A↔B, B↔C but A↔C nahi (unless hub VNet ya Azure Virtual WAN use karo).
          </p>
          <p style={S.p}>
            Service Endpoints: VNet subnet se specific Azure services (Storage, SQL, Key Vault) ke liye optimized private route — traffic Azure backbone pe rehta hai. Service Endpoint → Azure service pe VNet-specific firewall rule add karo.
          </p>
        </section>

        <section id="private-link">
          <h3 style={S.h3}>Private Link and Private Endpoints</h3>
          <p style={S.p}>
            Private Endpoint Azure PaaS service (Storage, SQL, Cosmos DB, Key Vault) ka ek private IP address tumhare VNet mein create karta hai. Traffic Internet se isolated rehta hai — VNet ke andar private IP se service access hoti hai. DNS bhi private hona chahiye — Private DNS Zone configure karo.
          </p>
          <p style={S.p}>
            AWS PrivateLink se conceptually similar. Private Endpoint Service Endpoint se better security provide karta hai — traffic kisi bhi point pe Internet pe nahi jaata.
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
          Azure mein multiple load balancing services hain — har ek different use case ke liye. <TopicLink slug="load-balancer" variant="inline" /> article se core LB concepts connect karo.
        </p>

        <section id="azure-lb">
          <h3 style={S.h3}>Azure Load Balancer (L4)</h3>
          <p style={S.p}>
            Azure Load Balancer TCP/UDP L4 traffic distribute karta hai. Zone-redundant (Standard tier) ya zonal deploy ho sakta hai. Internal (private IP frontend) ya Public (public IP frontend). Backend pool: VMs, VMSS instances, IP addresses.
          </p>
          <p style={S.p}>
            Standard vs Basic tier: Standard = production (zone-redundant, SLA, NSG required), Basic = dev/test (no zone support, free). Production mein always Standard use karo.
          </p>
        </section>

        <section id="application-gateway">
          <h3 style={S.h3}>Application Gateway (L7)</h3>
          <p style={S.p}>
            Application Gateway HTTP/HTTPS L7 application delivery controller hai — SSL termination, URL-based routing, cookie-based session affinity, WAF (Web Application Firewall) integration.
          </p>
          <ul style={S.ul}>
            <li>URL path routing: <code>/api/*</code> → API backend pool, <code>/images/*</code> → static backend pool</li>
            <li>Multi-site hosting: multiple domain names → different backends on same gateway</li>
            <li>WAF (Application Gateway WAF v2): OWASP ruleset, custom rules, bot protection</li>
            <li>Autoscaling: demand ke saath scale — min/max instance count configurable</li>
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
            Azure Firewall managed, stateful network firewall service hai — L3 through L7, FQDN filtering, threat intelligence, centralized logging. Hub VNet mein deploy karo, sab spoke VNets ka traffic inspect karo via UDR.
          </p>
          <ul style={S.ul}>
            <li>DNAT rules: inbound traffic → internal VMs pe redirect</li>
            <li>Network rules: IP/port/protocol based L3/L4 filtering</li>
            <li>Application rules: FQDN-based outbound filtering (*.microsoft.com, etc.)</li>
            <li>Threat Intelligence: known malicious IPs/domains automatically block</li>
            <li>Premium tier: TLS inspection, IDPS, URL filtering</li>
          </ul>
          <Callout type="warning" title="Azure Firewall vs NSG">
            NSG free hai, basic subnet/NIC level filtering karta hai. Azure Firewall costly hai (hourly + data processed) lekin enterprise-grade — FQDN, threat intelligence, centralized policy. Production enterprise: dono use karo — NSG har subnet pe (defence in depth) + Azure Firewall hub pe (central enforcement).
          </Callout>
        </section>
      </section>

      {/* ─── CONNECTIVITY ─────────────────────────────────────────────────── */}
      <section id="connectivity">
        <h2 style={S.h2}>Hybrid Connectivity</h2>

        <section id="vpn-gateway">
          <h3 style={S.h3}>Azure VPN Gateway</h3>
          <p style={S.p}>
            Azure VPN Gateway on-prem network ko Azure VNet se IPsec/IKE VPN tunnel over Internet se connect karta hai. Two options:
          </p>
          <ul style={S.ul}>
            <li><strong>Site-to-Site VPN:</strong> On-prem VPN device (Cisco, Palo Alto, Fortinet etc.) ↔ Azure VPN Gateway. Encrypted. Internet dependent — variable latency.</li>
            <li><strong>Point-to-Site VPN:</strong> Individual clients → Azure VNet. Remote workers ke liye.</li>
          </ul>
          <p style={S.p}>
            VPN Gateway SKUs: Basic (dev/test), VpnGw1-5 (production, higher bandwidth/connections). Active-active configuration: two public IPs, higher availability. Connect to <TopicLink slug="router" variant="inline" /> article for BGP concepts used in VPN routing.
          </p>
        </section>

        <section id="expressroute">
          <h3 style={S.h3}>Azure ExpressRoute</h3>
          <p style={S.p}>
            ExpressRoute on-prem ko Azure ke saath private dedicated circuit se connect karta hai — connectivity provider (Tata, Airtel, Reliance Jio etc.) ke through. Internet pe nahi jaata.
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
            ExpressRoute dedicated private circuit hai — lekin traffic encrypted nahi hota by default. IPsec over ExpressRoute configure kar sakte hain encryption ke liye (provider circuits aur ExpressRoute Direct dono pe). MACsec (L2 encryption) sirf ExpressRoute Direct connections pe available hai (100Gbps dedicated ports), standard provider-based ExpressRoute circuits pe nahi. AWS Direct Connect ke same caveat hai.
          </Callout>
        </section>

        <section id="virtual-wan">
          <h3 style={S.h3}>Azure Virtual WAN</h3>
          <p style={S.p}>
            Virtual WAN Microsoft-managed hub-and-spoke network architecture hai — multiple branches, sites, VNets aur ExpressRoute/VPN circuits ko centrally connect karta hai. Traditional DC core WAN router equivalent. SD-WAN concepts apply — <TopicLink slug="sd-wan" variant="inline" /> article se connect karo.
          </p>
          <p style={S.p}>
            Basic tier: VNet connections only. Standard tier: VNet + VPN + ExpressRoute + inter-hub routing. Auto-provisioned managed hubs — Microsoft router infrastructure manage karta hai, you sirf attach karo.
          </p>
        </section>
      </section>

      {/* ─── COMPUTE ──────────────────────────────────────────────────────── */}
      <section id="compute">
        <h2 style={S.h2}>Azure Compute</h2>

        <section id="azure-vms">
          <h3 style={S.h3}>Azure Virtual Machines</h3>
          <p style={S.p}>
            Azure VM Hyper-V based virtual compute instance hai. Components: VM itself (size selection) + OS Disk (Managed Disk) + NIC (Network Interface Card) + optional Data Disks + Public IP (optional) + NSG. Yeh sab separate resources hain — VM delete karne pe by default attached resources delete nahi hote (except NIC aur OS disk by default delete hoti hai — configurable).
          </p>
          <p style={S.p}>
            VM sizes: B-series (burstable, dev/test), D-series (general purpose), E-series (memory optimized), F-series (compute optimized), L-series (storage optimized), N-series (GPU: NVIDIA T4, V100, A100), H-series (HPC). Confidential VMs bhi available hain.
          </p>
          <p style={S.p}>
            Purchasing options: Pay-as-you-go, Reserved Instances (1yr/3yr, 40-72% savings), Azure Spot VMs (60-90% savings, evictable), Azure Hybrid Benefit (bring Windows Server/SQL Server license — significant savings for existing Microsoft customers).
          </p>
          <Callout type="important" title="Azure Hybrid Benefit">
            Existing Windows Server aur SQL Server licenses Azure pe use karo — Azure Hybrid Benefit se VM costs significantly reduce ho jaate hain. AWS mein equivalent licensing flexibility limited hai. Enterprise Microsoft customers ke liye yeh major Azure advantage hai.
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
            Availability Set: Fault Domains (2-3, different racks/power) + Update Domains (up to 20, rolling update isolation). Region ke andar HA — AZ failure protect nahi karta. Older pattern — for new deployments, Availability Zones preferred.
          </p>
          <p style={S.p}>
            VMSS (VM Scale Set): identical VMs ka set, auto-scale horizontal. Load Balancer ya Application Gateway se attach karo. Zone-spanning VMSS = each AZ mein instances. AWS ASG (Auto Scaling Group) equivalent.
          </p>
        </section>

        <section id="app-service">
          <h3 style={S.h3}>Azure App Service (PaaS)</h3>
          <p style={S.p}>
            App Service managed platform for web applications, REST APIs aur mobile backends. Supported runtimes: .NET, Java, Python, Node.js, PHP, Ruby. OS nahi manage karna, runtime nahi patch karna — sirf code deploy karo.
          </p>
          <ul style={S.ul}>
            <li>App Service Plan: compute resources define karta hai (size + count). Multiple apps share ek plan.</li>
            <li>Deployment slots: staging slot pe deploy → validate → production slot swap (zero downtime)</li>
            <li>Custom domains + free SSL (App Service Managed Certificate)</li>
            <li>Scaling: scale up (bigger plan) ya scale out (more instances, autoscale rules)</li>
            <li>VNet Integration: App Service se VNet resources access karo (private endpoints, databases)</li>
          </ul>
          <p style={S.p}>
            AWS Elastic Beanstalk equivalent — lekin App Service zyada mature aur widely used hai Azure mein.
          </p>
        </section>

        <section id="aks">
          <h3 style={S.h3}>Azure Kubernetes Service (AKS)</h3>
          <p style={S.p}>
            AKS Azure ka managed Kubernetes service hai. Microsoft Kubernetes control plane manage karta hai — API server, etcd, scheduler. Tumhara responsibility: worker node pools (VM sizes, count, OS patching), Kubernetes manifests, networking config.
          </p>
          <ul style={S.ul}>
            <li><strong>Node Pools:</strong> System pool (cluster services) + User pools (app workloads). Different VM sizes per pool possible.</li>
            <li><strong>Azure CNI:</strong> Pods ko real VNet IPs milte hain — NSG directly pods pe apply. Kubenet: pod IPs VNet ke bahar, NAT required.</li>
            <li><strong>Cluster Autoscaler:</strong> Node pools automatically scale based on pending pods.</li>
            <li><strong>Managed Identity:</strong> AKS cluster ke liye Managed Identity — no credentials in cluster config.</li>
            <li><strong>Azure Monitor for containers:</strong> AKS metrics + logs automatically Log Analytics mein.</li>
            <li><strong>AGIC (Application Gateway Ingress Controller):</strong> Kubernetes Ingress → Application Gateway automatically configure karta hai.</li>
          </ul>
        </section>

        <section id="azure-functions">
          <h3 style={S.h3}>Azure Functions (Serverless)</h3>
          <p style={S.p}>
            Azure Functions event-driven serverless compute hai. Trigger define karo → code execute hota hai → billing per execution + duration. Supported triggers: HTTP, Timer, Blob Storage, Queue, Service Bus, Event Hub, Event Grid, Cosmos DB change feed.
          </p>
          <ul style={S.ul}>
            <li>Hosting plans: Consumption (pay-per-execution, scale-to-zero), Premium (pre-warmed instances, VNet integration), Dedicated (App Service Plan)</li>
            <li>Durable Functions: stateful orchestration — chaining, fan-out/fan-in, human approval workflows</li>
            <li>Cold starts: Consumption plan mein idle functions ke baad cold start. Premium plan eliminates this.</li>
            <li>VNet Integration: Functions se private VNet resources (databases, storage) access karna ho toh Premium plan required</li>
          </ul>
          <p style={S.p}>AWS Lambda equivalent. Azure Functions Consumption plan = Lambda. Azure Durable Functions = AWS Step Functions concepts.</p>
        </section>

        <section id="container-apps">
          <h3 style={S.h3}>Azure Container Instances and Container Apps</h3>
          <p style={S.p}>
            <strong>ACI (Azure Container Instances):</strong> Serverless containers — no cluster management. Per-second billing. Dev/test, batch jobs, event-driven burst. AWS Fargate equivalent.
          </p>
          <p style={S.p}>
            <strong>Azure Container Apps:</strong> Managed Kubernetes-based platform with KEDA (event-driven autoscaling) + Dapr (distributed app runtime) built-in. Microservices ke liye — K8s complexity without managing it. AWS App Runner ya ECS Fargate equivalent.
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
            Azure Blob Storage unstructured data object storage hai — images, videos, documents, backups, static websites, big data. Storage Account → Container → Blobs. Traditional DC object storage (NetApp StorageGRID, Dell ECS) equivalent.
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
            Azure Files fully managed file share service hai — SMB 3.0 (Windows/Linux/macOS) aur NFS 4.1 (Linux) support. Traditional NAS ka cloud equivalent. Multiple VMs simultaneously mount kar sakti hain.
          </p>
          <p style={S.p}>
            <strong>Azure File Sync:</strong> On-prem Windows Server pe Azure Files cache — cloud tiering se old files automatically Azure mein, hot files local pe rakhte hain. On-prem-to-cloud gradual file server migration ke liye useful.
          </p>
          <p style={S.p}>
            Authentication: Azure AD Kerberos authentication support karta hai — domain-joined VMs directly mount kar sakte hain credentials ke bina.
          </p>
        </section>

        <section id="queue-table">
          <h3 style={S.h3}>Queue Storage and Table Storage</h3>
          <p style={S.p}>
            <strong>Queue Storage:</strong> Simple message queue — producer/consumer pattern. Up to 64KB per message, 7-day retention (configurable up to 7 days). App components decouple karne ke liye. AWS SQS Standard equivalent (simpler features).
          </p>
          <p style={S.p}>
            <strong>Table Storage:</strong> NoSQL key-value store — schemaless entities, Partition Key + Row Key. Low cost, simple queries. Complex queries ya global distribution ke liye Cosmos DB better. AWS DynamoDB ka simpler, cheaper alternative for basic use cases.
          </p>
        </section>

        <section id="managed-disks">
          <h3 style={S.h3}>Managed Disks</h3>
          <p style={S.p}>
            Azure Managed Disks VM ke liye block storage hain — Microsoft storage infrastructure manage karta hai, you sirf disk create karo aur VM attach karo. Automatic 3-copy replication within Region (LRS) by default.
          </p>
          <ul style={S.ul}>
            <li><strong>Ultra Disk:</strong> Sub-ms latency, up to 160,000 IOPS — mission-critical databases</li>
            <li><strong>Premium SSD v2:</strong> High performance, granular IOPS/throughput control — production databases</li>
            <li><strong>Premium SSD:</strong> Reliable SSD — most production workloads</li>
            <li><strong>Standard SSD:</strong> Cost-effective SSD — dev/test, light production</li>
            <li><strong>Standard HDD:</strong> Lowest cost — backup, archival, infrequent access</li>
          </ul>
          <p style={S.p}>
            Snapshots: Managed Disk ka point-in-time copy. Incremental snapshots available. Cross-region copy possible. AWS EBS Snapshot equivalent.
          </p>
        </section>

        <section id="storage-advanced">
          <h3 style={S.h3}>Data Lake, NetApp Files and File Sync</h3>
          <p style={S.p}>
            <strong>Azure Data Lake Storage Gen2 (ADLS Gen2):</strong> Blob Storage pe built, hierarchical namespace enable karo. Big data analytics, Apache Spark, Databricks ke liye optimized. AWS S3 + hierarchical namespace equivalent.
          </p>
          <p style={S.p}>
            <strong>Azure NetApp Files:</strong> Managed NetApp ONTAP service — NFS/SMB, ultra-low latency, enterprise file services. SAP HANA, VDI, HPC workloads ke liye. Familiar to enterprises running on-prem NetApp — same APIs, same capabilities.
          </p>
        </section>

        <Figure caption="Azure Storage: Blob, Files, Queue, Table, Managed Disks — types, tiers aur DC engineer mapping">
          <AzureStorageDiagram />
        </Figure>
      </section>

      {/* ─── DATABASES ────────────────────────────────────────────────────── */}
      <section id="databases">
        <h2 style={S.h2}>Databases</h2>

        <section id="azure-sql">
          <h3 style={S.h3}>Azure SQL Database</h3>
          <p style={S.p}>
            Azure SQL Database fully managed SQL Server based relational database hai. Microsoft OS, database engine, patches, HA manage karta hai. Tumhari responsibility: schema, queries, security, data.
          </p>
          <ul style={S.ul}>
            <li><strong>Deployment options:</strong> Single Database (isolated), Elastic Pool (multiple DBs shared resources), Managed Instance (full SQL Server compatibility)</li>
            <li><strong>Service tiers:</strong> General Purpose (balanced), Business Critical (in-memory, high IOPS), Hyperscale (up to 100TB, fast backups)</li>
            <li><strong>HA built-in:</strong> Business Critical tier — Always On Availability Groups, 3 replicas. General Purpose — storage redundancy.</li>
            <li><strong>Geo-replication:</strong> Active Geo-Replication — readable secondaries in different Regions. Auto-Failover Groups — automatic failover with DNS endpoint update</li>
          </ul>
          <p style={S.p}>
            AWS RDS SQL Server equivalent — lekin Managed Instance SQL Server Migration ke liye much better compatibility hai (SQL Agent, CLR, cross-DB queries etc.).
          </p>
        </section>

        <section id="cosmos-db">
          <h3 style={S.h3}>Azure Cosmos DB</h3>
          <p style={S.p}>
            Cosmos DB globally distributed, multi-model NoSQL database hai. APIs: Core SQL (document), MongoDB, Cassandra, Gremlin (graph), Table. Single-digit ms latency globally. Multiple regions pe automatic write replication.
          </p>
          <ul style={S.ul}>
            <li><strong>Consistency levels:</strong> Strong, Bounded Staleness, Session, Consistent Prefix, Eventual — choose tradeoff</li>
            <li><strong>Global distribution:</strong> Any Region mein read/write — automatic replication</li>
            <li><strong>Serverless mode:</strong> Pay per request unit, no provisioned throughput</li>
            <li><strong>Partition key:</strong> Critical design decision — determines scalability</li>
          </ul>
          <p style={S.p}>
            AWS DynamoDB ka competitor — lekin Cosmos DB multi-API (MongoDB, Cassandra) support karta hai jo DynamoDB nahi. Legacy MongoDB/Cassandra workloads Azure pe migrate karna easier hai Cosmos DB ke saath.
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
            Azure mein HA ke liye do primary mechanisms hain VM level pe:
          </p>
          <ul style={S.ul}>
            <li><strong>Availability Set:</strong> Same Region/DC ke andar — different racks (Fault Domains, 2-3) aur different update waves (Update Domains, up to 20). Single AZ failure protect nahi karta. Legacy pattern — older deployments ke liye.</li>
            <li><strong>Availability Zones:</strong> Physically separate data centers within Region. AZ failure isolated. 99.99% SLA for VMs across AZs. Modern recommended approach.</li>
          </ul>
          <Callout type="important" title="Availability Set ≠ Availability Zone">
            Common misconception: Availability Set = zone-aware. Nahi! Availability Set same data center mein racks distribute karta hai. AZ failure (power loss in one DC) mein Availability Set ka protection nahi milta. Production workloads ke liye Availability Zones use karo.
          </Callout>
        </section>

        <section id="zone-redundant">
          <h3 style={S.h3}>Zone-Redundant Services</h3>
          <p style={S.p}>
            Many Azure services natively zone-redundant deploy ho sakte hain — single deployment, automatically spans AZs:
          </p>
          <ul style={S.ul}>
            <li>Azure Standard Load Balancer: zone-redundant by default (Standard tier)</li>
            <li>Azure Application Gateway v2: zone-redundant with zone pinning option</li>
            <li>Azure SQL Database Business Critical: zone-redundant replicas</li>
            <li>Azure Storage ZRS: 3 AZs mein synchronous replication</li>
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
            ASR VM replication aur orchestrated failover service hai. Azure VMs ko secondary Region mein continuously replicate karta hai. Physical servers aur VMware VMs bhi Azure mein replicate kar sakte hain (on-prem to Azure DR).
          </p>
          <ul style={S.ul}>
            <li>RPO: Azure VMs ke liye as low as 30 seconds</li>
            <li>RTO: minutes (automated recovery plans)</li>
            <li>Test failover: production traffic affect kiye bina DR validate karo</li>
            <li>Recovery Plans: ordered failover sequence define karo — multiple VMs, dependencies, pre/post scripts</li>
            <li>Reprotect: primary Region restore hone ke baad reverse replication + failback</li>
          </ul>
        </section>

        <section id="backup">
          <h3 style={S.h3}>Azure Backup</h3>
          <p style={S.p}>
            Azure Backup managed backup service hai — Recovery Services Vault ya Backup Vault mein store. Supports: Azure VMs, Managed Disks, Azure SQL, Azure Files, SAP HANA, on-prem servers (MARS agent).
          </p>
          <ul style={S.ul}>
            <li>Backup policies: retention rules define karo — daily/weekly/monthly/yearly</li>
            <li>Cross-region restore: GRS Vault se paired Region mein restore possible</li>
            <li>Soft delete: accidental deletion se 14 days protection (default)</li>
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
            Azure Monitor Azure ka central observability platform hai — metrics, logs, alerts, dashboards sab yahan. Traditional DC monitoring (SCOM, Nagios, SolarWinds) ka cloud equivalent.
          </p>
          <ul style={S.ul}>
            <li><strong>Metrics:</strong> Near-real-time numeric data (CPU %, network bytes, disk IOPS). 93 days retention. Automatically collected for Azure resources.</li>
            <li><strong>Alerts:</strong> Metric/log/activity alerts → Action Groups (email, SMS, webhook, ITSM ticketing, Logic App automation)</li>
            <li><strong>Azure Monitor Agent (AMA):</strong> VM pe install karo → logs aur custom metrics Log Analytics workspace mein</li>
            <li><strong>Activity Log:</strong> ARM-level API calls — who did what, when. CloudTrail equivalent. 90 days retention (send to Log Analytics for longer).</li>
          </ul>
        </section>

        <section id="log-analytics">
          <h3 style={S.h3}>Log Analytics and KQL</h3>
          <p style={S.p}>
            Log Analytics Workspace Azure Monitor mein log storage aur query engine hai. KQL (Kusto Query Language) se logs query karo. CloudWatch Logs Insights equivalent lekin zyada powerful aur expressive.
          </p>
          <ul style={S.ul}>
            <li>Data sources: VM logs (AMA), AKS container logs, NSG flow logs, Azure Firewall, App Service, SQL, custom sources</li>
            <li>Retention: configurable 30 days to 2 years (Interactive) + archive tier (up to 7 years)</li>
            <li>Workbooks: KQL queries + visualizations = interactive dashboards</li>
            <li>Application Insights: APM service — web apps ke liye request rates, failures, latency, user flows, distributed tracing. Log Analytics pe built.</li>
          </ul>
          <p style={S.p}>
            KQL practical examples — yeh queries Log Analytics mein directly run hoti hain:
          </p>
          <ul style={S.ul}>
            <li><code>{"Heartbeat | summarize count() by Computer, bin(TimeGenerated, 1h)"}</code> — VM heartbeat per hour (connectivity check)</li>
            <li><code>{"AzureActivity | where ActivityStatusValue == 'Failed' | project TimeGenerated, Caller, OperationName"}</code> — failed ARM operations (audit)</li>
            <li><code>{"AzureDiagnostics | where Category == 'AzureFirewallNetworkRule' and msg_s contains 'Deny'"}</code> — Azure Firewall blocked traffic</li>
            <li><code>{"Perf | where CounterName == '% Processor Time' | summarize avg(CounterValue) by Computer"}</code> — average CPU per VM</li>
          </ul>
          <p style={S.p}>
            KQL pipeline syntax: <code>TableName | where condition | project columns | summarize aggregation | order by column</code>. SQL se familiar ho toh KQL quickly pick up hoti hai — syntax different hai lekin concepts overlap karte hain.
          </p>
        </section>

        <section id="defender-cloud">
          <h3 style={S.h3}>Microsoft Defender for Cloud</h3>
          <p style={S.p}>
            Defender for Cloud (formerly Security Center + Azure Defender) combined CSPM + CWP platform hai. AWS GuardDuty + Security Hub combined equivalent.
          </p>
          <ul style={S.ul}>
            <li><strong>Secure Score:</strong> Security posture quantify — recommendations follow karo, score improve karo</li>
            <li><strong>Regulatory Compliance:</strong> CIS, NIST, PCI-DSS, ISO 27001 automated compliance dashboard</li>
            <li><strong>Defender plans:</strong> VMs (JIT, adaptive app controls, file integrity monitoring), SQL, Containers, Storage, Key Vault, App Service, DNS</li>
            <li><strong>Multi-cloud:</strong> AWS aur GCP resources bhi Defender for Cloud mein manage karo (via Azure Arc)</li>
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
            Key Vault secrets, keys aur certificates securely store aur manage karta hai. Traditional DC HSM + secret management (CyberArk, HashiCorp Vault) ka cloud equivalent.
          </p>
          <ul style={S.ul}>
            <li><strong>Secrets:</strong> Connection strings, passwords, API keys — version controlled, audit logged</li>
            <li><strong>Keys:</strong> Cryptographic keys — software-protected ya HSM-protected (Premium tier). Envelope encryption ke liye use karo (Azure Storage, Azure SQL encryption)</li>
            <li><strong>Certificates:</strong> TLS certificates store, auto-renew, deploy to App Service/Application Gateway</li>
            <li><strong>Access policies vs RBAC:</strong> RBAC preferred for Key Vault access (granular, audit trail)</li>
            <li><strong>Soft delete:</strong> Accidentally deleted secrets 90 days tak recover ho sakti hain</li>
          </ul>
          <p style={S.p}>
            Managed Identity + Key Vault = best practice. VM ya Function ko Key Vault mein secrets read karne chahiye → Managed Identity assign karo → Key Vault Secrets User RBAC role assign karo → no credentials in code.
          </p>
        </section>

        <section id="azure-sentinel">
          <h3 style={S.h3}>Microsoft Sentinel (SIEM/SOAR)</h3>
          <p style={S.p}>
            Microsoft Sentinel cloud-native SIEM (Security Information and Event Management) + SOAR (Security Orchestration, Automation and Response) platform hai. AWS Security Hub se zyada mature SIEM capabilities.
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
            ARM Templates JSON-based declarative IaC hain — Azure native. Complex, verbose JSON. <strong>Bicep</strong> Microsoft ka ARM Templates ke upar DSL (Domain-Specific Language) hai — much cleaner syntax, ARM JSON mein transpile hota hai. Both idempotent — same template run karo, same result.
          </p>
          <ul style={S.ul}>
            <li>Bicep: shorter syntax, type-safe, intellisense support, native Azure integration</li>
            <li>Template Specs: ARM/Bicep templates centrally store karo → reuse across org</li>
            <li>Deployment Stacks: group deployments, managed cleanup (delete stack → delete all resources)</li>
            <li>What-if: preview changes before deploying (CloudFormation Change Sets equivalent)</li>
          </ul>
        </section>

        <section id="terraform-azure">
          <h3 style={S.h3}>Terraform on Azure</h3>
          <p style={S.p}>
            Terraform HashiCorp Provider for Azure (<code>azurerm</code>) use karta hai — all Azure resources manage karne ke liye. Multi-cloud environments, existing Terraform skills, mature Terraform ecosystem ke liye preferred. Azure-specific features (Bicep) ka complete parity nahi hota immediately, lekin community active hai.
          </p>
          <p style={S.p}>
            Remote state: Azure Blob Storage mein store karo (state file) + Azure Blob lease-based locking (concurrent applies prevent karta hai) — team collaboration ke liye. <code>terraform plan</code> → review → <code>terraform apply</code>. Azure DevOps ya GitHub Actions se CI/CD mein integrate karo.
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
            Azure VM ko OS se shutdown karo (Stop inside OS) toh VM still running, still billed. Azure portal ya CLI se Deallocate karo — compute billing stops. Disk charges continue. Important distinction unlike AWS EC2 stop.
          </Callout>
        </section>

        <section id="cost-tools">
          <h3 style={S.h3}>Cost Management Tools</h3>
          <ul style={S.ul}>
            <li><strong>Azure Cost Management + Billing:</strong> Spend analysis, budgets, cost alerts, recommendations. AWS Cost Explorer equivalent.</li>
            <li><strong>Azure Advisor:</strong> Cost, performance, security, reliability, operational excellence recommendations. Idle VMs, underutilized resources identify karta hai. AWS Trusted Advisor equivalent.</li>
            <li><strong>Reserved Instances:</strong> 1yr/3yr commitment — up to 72% savings on VMs, SQL, Cosmos DB etc.</li>
            <li><strong>Azure Hybrid Benefit:</strong> Windows Server + SQL Server existing licenses Azure mein use karo — 40-85% savings for licensed workloads.</li>
            <li><strong>Azure Spot VMs:</strong> Unused Azure capacity — up to 90% discount. Azure 2-minute eviction notice deta hai (Scheduled Events via IMDS) — fault-tolerant workloads ke liye design karo.</li>
            <li><strong>Tagging strategy:</strong> Environment, Team, Application, CostCenter tags enforce karo — cost attribution ke liye mandatory.</li>
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
          Objective answer: Azure aur AWS both excellent platforms hain. <strong>Azure choose karo jab:</strong> existing Microsoft enterprise software (Windows, SQL, AD, M365) heavy use ho, hybrid cloud primary concern ho, .NET development team ho. <strong>AWS choose karo jab:</strong> cloud-native startup, widest service selection needed, largest global community needed.
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
            <li><strong>Security:</strong> NSG on each subnet, Azure Firewall hub VNet pe, Key Vault for secrets/certs, Defender for Cloud enabled</li>
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
        <p style={S.p}>Azure troubleshooting systematic approach chahta hai — resource → network → security → app. VM running ≠ application healthy.</p>
        <ol style={{ ...S.ul, listStyleType: "decimal" }}>
          <li><strong>DNS resolving?</strong> <code>nslookup / Resolve-DnsName</code> — Azure DNS, Private DNS Zone, custom DNS server check karo</li>
          <li><strong>VM state correct?</strong> Running? Not Deallocated/Stopped? Azure portal VM state check karo</li>
          <li><strong>NSG blocking?</strong> Azure portal → NSG → Effective Security Rules. Or use Network Watcher → IP Flow Verify.</li>
          <li><strong>Route correct?</strong> Network Watcher → Next Hop tool — packet actually kahan ja raha hai</li>
          <li><strong>Azure Firewall blocking?</strong> Firewall logs → Log Analytics → <code>AzureDiagnostics | where Category == "AzureFirewallNetworkRule"</code></li>
          <li><strong>Load Balancer health?</strong> Backend pool health check karo — probe port/path correct hai?</li>
          <li><strong>App Service errors?</strong> App Service Diagnostics → Log Stream, Application Insights failures</li>
          <li><strong>VM OS/app issue?</strong> Boot Diagnostics screenshot, Serial Console access, Azure Monitor Agent logs</li>
          <li><strong>RBAC / access denied?</strong> Azure portal → Resource → Access Control (IAM) → Check access. Activity Log mein 403 entries.</li>
          <li><strong>Key Vault access?</strong> Key Vault → Monitoring → Diagnostic Logs — deny events identify karo</li>
          <li><strong>Hybrid connectivity?</strong> VPN Gateway / ExpressRoute → Connection Monitor, BGP route tables check karo</li>
        </ol>
        <Callout type="important" title="Network Watcher — Azure ke Troubleshooting Swiss Army Knife">
          Azure Network Watcher: IP Flow Verify (NSG block check), Next Hop (routing check), Connection Monitor (continuous connectivity testing), Packet Capture (VM pe remote capture), NSG Flow Logs (VNet traffic audit). Troubleshooting shuru karne ka best tool hai.
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
          Data Center engineer ke liye recommended path: AZ-900 → AZ-104 → AZ-305. AZ-700 add karo agar networking primary focus hai. Azure certifications enterprise sector mein highly valued hain — especially AZ-104 aur AZ-305.
        </p>
        <p style={S.p}>
          Career opportunities: Azure Cloud Engineer, Azure Solutions Architect, Azure Network Engineer, Cloud Security Engineer, DevOps Engineer (Azure). India mein demand rapidly growing hai — especially Bangalore, Hyderabad, Pune mein IT services companies Azure heavily use kar rahi hain.
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
