"use client";

import { Callout, ComparisonTable, Figure, S } from "../shared";
import TopicLink from "@/components/TopicLink";
import { gcpContent } from "@/content/gcp";

import GcpGlobalDiagram from "../svg/GcpGlobalDiagram";
import GcpResourceHierarchyDiagram from "../svg/GcpResourceHierarchyDiagram";
import GcpVpcDiagram from "../svg/GcpVpcDiagram";
import GcpIamDiagram from "../svg/GcpIamDiagram";
import GcpComputeDiagram from "../svg/GcpComputeDiagram";
import GcpStorageDiagram from "../svg/GcpStorageDiagram";
import GcpHybridDiagram from "../svg/GcpHybridDiagram";
import GcpOperationsDiagram from "../svg/GcpOperationsDiagram";
import GcpVsCloudsDiagram from "../svg/GcpVsCloudsDiagram";

export default function Content() {
  return (
    <article>

      {/* ─── QUICK SUMMARY ────────────────────────────────────────────────── */}
      <section id="quick-summary">
        <h2 style={S.h2}>Quick Summary</h2>
        <p style={S.p}>
          Google Cloud Platform (GCP) duniya ka teesra sabse bada public cloud hai — lekin kuch areas mein genuinely unique hai: Global VPC (single VPC jो poori duniya mein span karta hai), Cloud Spanner (duniya ka pehla globally distributed SQL database), Network Tiers (Google ka private backbone vs Internet), aur Sustained Use Discounts (automatic, koi commitment nahi). Data Center engineer ke liye GCP samajhna matlab hai: AWS/Azure ke concepts ko GCP terminology mein map karna, aur GCP ke genuinely different architectural choices ko samajhna.
        </p>
        <p style={S.p}>
          GCP ka DNA Google ke own infrastructure se aaya hai — BigQuery, Kubernetes (Google ne banaya, GKE pe managed), TensorFlow, aur global fiber network. Yeh article DC engineer ka practical reference hai — Global VPC se hybrid connectivity tak, IAM se troubleshooting tak.
        </p>
        <Callout type="important" title="AWS/Azure se Coming? Key Differences Pehle Padho">
          GCP VPC = Global (AWS/Azure VPC = per Region). GCP Firewall Rules = VPC level, network tags se (AWS: Security Groups on NIC, NACLs on subnet). GCP mein koi Region Pairs nahi (Azure jaise) — DR Region tum choose karo. GCP mein Sustained Use Discounts automatic hain — AWS/Azure mein nahi. GCP Spot VMs = 30-second notice (AWS Spot = 2-minute notice). Yeh differences architecture decisions pe directly impact karte hain.
        </Callout>
      </section>

      {/* ─── WHAT IS GCP ──────────────────────────────────────────────────── */}
      <section id="what-is-gcp">
        <h2 style={S.h2}>What Is Google Cloud Platform?</h2>
        <p style={S.p}>
          GCP Google ka public cloud platform hai — compute, storage, networking, databases, AI/ML, analytics — globally available. Jo cheez GCP ko practically interesting banati hai: yeh Google ke own infrastructure pe chalta hai — wahi infrastructure jis pe Search, YouTube, Gmail aur Maps operate karte hain. Yeh marketing nahi hai — iska direct impact network performance, global load balancing aur Kubernetes maturity pe hota hai.
        </p>
        <p style={S.p}>
          GCP ki strongest hand: globally distributed fiber (Premium Tier), BigQuery for analytics at scale, aur Cloud Spanner jaise services jo AWS ya Azure ke paas directly nahi hain. AI/ML ke liye TPUs aur Vertex AI bhi differentiate karte hain. Agar tumhara workload Kubernetes-heavy hai ya analytics-first hai, GCP naturally fit hoti hai.
        </p>
        <ComparisonTable
          headers={["Traditional DC Component", "GCP Equivalent", "Key Note"]}
          rows={[
            ["Physical server", "Compute Engine VM", "KVM-based, live migration support"],
            ["SAN LUN", "Persistent Disk / Hyperdisk", "Network-attached block storage"],
            ["NAS (NFS)", "Filestore", "Managed NFS v3/v4.1"],
            ["Object storage", "Cloud Storage (GCS)", "Multi-region, dual-region, regional"],
            ["Enterprise L3 network", "VPC (Global)", "Single VPC spans all Regions — unique"],
            ["Physical firewall", "Firewall Rules (VPC-level)", "Tags/SA-based, not IP-only"],
            ["Hardware LB (F5)", "Cloud Load Balancing", "Global anycast, single anycast IP"],
            ["Core WAN router", "Cloud Router + Cloud VPN / Interconnect", "BGP-based, dynamic routing"],
            ["Enterprise DNS", "Cloud DNS + Private Zones", "Managed, high-availability DNS"],
            ["AD / LDAP", "Cloud Identity / IAM", "OAuth2/SAML, not LDAP"],
            ["Monitoring (Nagios, SolarWinds)", "Cloud Monitoring + Cloud Logging", "Operations Suite (ex-Stackdriver)"],
            ["DR tool", "Cloud Storage backups + MIG failover", "No single managed DR service"],
          ]}
        />

        <section id="gcp-history">
          <h3 style={S.h3}>History and Why GCP Exists</h3>
          <p style={S.p}>
            GCP 2008 mein App Engine se shuru hua — Google ki PaaS offering. 2012 mein Compute Engine launch hua (IaaS). Google ne Kubernetes 2014 mein open-source release kiya, jo cloud-native computing ka foundation ban gaya. 2015 mein Google ne platform formally "Google Cloud Platform" ke roop mein rebrand kiya aur enterprise push kiya.
          </p>
          <p style={S.p}>
            GCP exist karta hai kyunki Google ke paas duniya ka ek best distributed computing infrastructure tha — aur isse monetize karne ka natural path external cloud services tha. Google ka DNA search, analytics aur large-scale distributed systems se hai — yeh GCP ke strengths mein clearly dikhta hai (BigQuery, Spanner, global network, AI/ML).
          </p>
        </section>

        <section id="service-models">
          <h3 style={S.h3}>IaaS, PaaS, SaaS on GCP</h3>
          <ComparisonTable
            headers={["Model", "GCP Provides", "You Manage", "Examples"]}
            rows={[
              ["IaaS", "Virtual compute, VPC, raw storage", "OS, runtime, app, config, patches", "Compute Engine, VPC, Persistent Disk"],
              ["PaaS", "Managed runtime + infrastructure", "App code, data, configuration", "App Engine, Cloud SQL, GKE control plane"],
              ["SaaS", "Complete application", "Data + user access", "Google Workspace (Gmail, Drive, Docs)"],
            ]}
          />
        </section>

        <section id="shared-responsibility">
          <h3 style={S.h3}>Shared Responsibility Model</h3>
          <ComparisonTable
            headers={["Service Type", "Google Manages", "You Manage"]}
            rows={[
              ["Compute Engine (IaaS)", "Physical hardware, KVM hypervisor, data center", "Guest OS patches, runtime, app, security config, firewall rules"],
              ["Cloud SQL (PaaS)", "Hardware, OS, database engine patches, HA, backups infra", "Schema, queries, firewall, user permissions, data classification"],
              ["Cloud Run (Serverless)", "All infra, OS, runtime, container scheduling, scaling", "Container image, IAM, env vars, service config"],
              ["Cloud Storage", "Hardware, replication, service availability", "IAM/ACLs, encryption keys, lifecycle policies, data"],
            ]}
          />
          <Callout type="important" title="Shared Responsibility in Data Center Context">
            GCP physical data center security = Google responsibility. Tumhara Compute Engine VM ka OS patch nahi hua = tumhari responsibility. Cloud SQL ka authorized networks galat configure kiya = tumhari responsibility. Har service ke liye boundary clearly samjho.
          </Callout>
        </section>
      </section>

      {/* ─── GLOBAL INFRASTRUCTURE ────────────────────────────────────────── */}
      <section id="global-infrastructure">
        <h2 style={S.h2}>GCP Global Infrastructure</h2>

        <section id="regions-zones">
          <h3 style={S.h3}>Regions and Zones</h3>
          <p style={S.p}>
            GCP 40+ Regions mein operate karta hai globally (continuously expanding). Har Region ek specific geographic location hai — asia-south1 (Mumbai), us-central1 (Iowa), europe-west1 (Belgium) etc. Har Region mein typically 3 Zones hain — named a, b, c (some Regions have more or different naming).
          </p>
          <p style={S.p}>
            Zone ek isolated deployment area hai within a Region — physically separate building with independent power, cooling, aur networking. Ek Zone failure doosri Zones ko affect nahi karta. Production workloads ke liye always multiple Zones use karo.
          </p>
          <ComparisonTable
            headers={["Level", "GCP", "AWS Equivalent", "Azure Equivalent"]}
            rows={[
              ["Highest", "Region (e.g., asia-south1)", "Region (e.g., ap-south-1)", "Region (e.g., Central India)"],
              ["Mid", "Zone (e.g., asia-south1-a)", "Availability Zone (e.g., ap-south-1a)", "Availability Zone"],
              ["Cross-region HA", "Multi-region deployment (engineer decides)", "Multi-Region (engineer decides)", "Region Pairs (Microsoft-defined)"],
              ["Network", "Global VPC (spans all Regions)", "VPC per Region", "VNet per Region"],
              ["Subnet", "Regional (spans Zones in Region)", "AZ-specific", "Regional (spans AZs)"],
            ]}
          />
        </section>

        <section id="no-region-pairs">
          <h3 style={S.h3}>No Region Pairs — DR Is Your Choice</h3>
          <p style={S.p}>
            Azure mein Region Pairs Microsoft-defined hain — East US ↔ West US. GCP mein aisa concept nahi hai. Engineer khud DR Region select karta hai based on requirements: data residency, latency, available services, regulatory compliance.
          </p>
          <p style={S.p}>
            GCP Multi-region locations exist karte hain Cloud Storage ke liye (US, EU, ASIA) — lekin yeh compute DR se alag hai. Compute Engine DR ke liye: snapshots/images second Region mein store karo, MIG templates second Region mein maintain karo, Cloud SQL cross-region replicas configure karo.
          </p>
          <Callout type="important" title="GCP mein DR = Engineer ka Design">
            AWS aur Azure mein bhi engineer DR design karta hai — lekin Azure mein Region Pairs platform updates aur GRS storage replication ke liye pre-defined hain. GCP mein yeh concept nahi hai. GCP DR architecture completely engineer-designed hona chahiye. Yeh zyada flexibility deta hai lekin zyada responsibility bhi.
          </Callout>
        </section>

        <section id="edge-network">
          <h3 style={S.h3}>Edge Network and Network Tiers</h3>
          <p style={S.p}>
            GCP Network Service Tiers ek unique concept hai — AWS ya Azure mein nahi hai:
          </p>
          <ul style={S.ul}>
            <li><strong>Premium Tier (default):</strong> Traffic Google backbone pe enter karta hai nearest PoP pe — lowest latency, highest reliability. User-facing applications ke liye.</li>
            <li><strong>Standard Tier:</strong> Traffic public Internet pe travel karta hai — AWS/Azure default jaisi behavior. Lower cost, variable latency.</li>
          </ul>
          <p style={S.p}>
            Cloud CDN: Cloud Load Balancing ke saath integrated CDN. Media CDN: high-scale video/media delivery. Cloud Armor: DDoS protection aur WAF at edge. Cloud Interconnect PoPs: Google's colocation facilities globally jahan dedicated circuits terminate hote hain.
          </p>
        </section>

        <section id="region-selection">
          <h3 style={S.h3}>Region Selection Strategy</h3>
          <ul style={S.ul}>
            <li><strong>Data residency/compliance:</strong> Indian IT Act, EU GDPR, financial data localization — primary driver</li>
            <li><strong>User proximity:</strong> Asia-South1 (Mumbai) India ke users ke liye, asia-southeast1 (Singapore) SE Asia ke liye</li>
            <li><strong>Service availability:</strong> Not all services in all Regions — verify before committing</li>
            <li><strong>Zone availability:</strong> Production → 3-zone Region. Some Regions have fewer zones.</li>
            <li><strong>Pricing:</strong> Same service different cost in different Regions (e.g., us-central1 typically cheapest)</li>
            <li><strong>DR Region:</strong> Choose pair that satisfies data residency + distance + available services</li>
          </ul>
        </section>

        <Figure caption="GCP Global Infrastructure: Regions, Zones, Global VPC aur edge network — AWS/Azure se key differences">
          <GcpGlobalDiagram />
        </Figure>
      </section>

      {/* ─── RESOURCE HIERARCHY ───────────────────────────────────────────── */}
      <section id="resource-hierarchy">
        <h2 style={S.h2}>GCP Resource Hierarchy</h2>

        <section id="org-folders-projects">
          <h3 style={S.h3}>Organization, Folders and Projects</h3>
          <p style={S.p}>
            GCP Resource Hierarchy: <strong>Organization → Folders → Projects → Resources</strong>. Yeh structure IAM inheritance aur policy enforcement ka backbone hai.
          </p>
          <ul style={S.ul}>
            <li><strong>Organization:</strong> Root node — Google Workspace ya Cloud Identity domain se tied. IAM policies yahan assign karo → sab resources inherit karte hain. AWS Organizations equivalent.</li>
            <li><strong>Folders:</strong> Logical grouping of Projects — department ya environment se organize karo (Production, Development, Shared Services). Nested folders possible (up to 10 levels). IAM/Policy at Folder level → all Projects inside inherit.</li>
            <li><strong>Projects:</strong> GCP ka fundamental unit — billing, resource management, API enablement. Har resource exactly ek Project mein. Resources different Regions mein ho sakte hain same Project mein. AWS Account equivalent. Project ID globally unique, immutable after creation.</li>
            <li><strong>Resources:</strong> Actual services — VMs, buckets, Cloud SQL instances etc. IAM at resource level bhi possible — narrowest scope.</li>
          </ul>
          <Callout type="important" title="IAM Inheritance — Top-Down Only">
            IAM bindings parent se child mein inherit hote hain. Organization pe role assign kiya → Folder mein, Project mein, sab resources mein inherited. Child pe inherited role ko REMOVE nahi kar sakte — sirf ADD kar sakte hain. Yeh AWS/Azure se important difference hai — AWS mein deny policies kisi bhi level pe effective hain. GCP mein IAM Deny Policies (newer feature) similar capability provide karti hain.
          </Callout>
        </section>

        <section id="billing-accounts">
          <h3 style={S.h3}>Billing Accounts</h3>
          <p style={S.p}>
            Billing Account GCP resources ke charges collect karta hai — ek ya multiple Projects se linked ho sakta hai. Billing Account Organization se alag manage hota hai — Project directly Billing Account se linked hota hai, Organization se nahi.
          </p>
          <ul style={S.ul}>
            <li>Budget alerts: Billing Account level ya Project level — spend thresholds pe notification</li>
            <li>Cost export: Cloud Billing data → BigQuery export → custom dashboards aur analysis</li>
            <li>Committed Use Discounts: Billing Account level pe apply hote hain</li>
            <li>Multiple Billing Accounts: alag business units, departments, client billing ke liye</li>
          </ul>
        </section>

        <section id="labels-tags">
          <h3 style={S.h3}>Labels, Tags and Org Policies</h3>
          <p style={S.p}>
            <strong>Labels:</strong> User-defined key-value pairs on resources — cost allocation, filtering, automation. Example: <code>{"environment=prod"}</code>, <code>{"team=networking"}</code>. AWS Tags equivalent.
          </p>
          <p style={S.p}>
            <strong>Tags (Network Tags):</strong> Strings on Compute Engine VMs — Firewall Rules mein target pe use. Example: VM pe tag <code>web-server</code> → Firewall Rule target <code>web-server</code> tag wale VMs pe allow 443.
          </p>
          <p style={S.p}>
            <strong>Org Policies:</strong> Resource configuration constraints — IAM permissions se alag. Example: restrict which Regions resources can be created in, disable external IPs on VMs, require OS Login. AWS SCPs equivalent.
          </p>
        </section>

        <section id="gcp-console-tools">
          <h3 style={S.h3}>Console, CLI and Cloud Shell</h3>
          <ComparisonTable
            headers={["Tool", "Use Case", "When to Use"]}
            rows={[
              ["Google Cloud Console", "Web GUI at console.cloud.google.com", "Exploration, one-off tasks, monitoring"],
              ["gcloud CLI", "Primary command-line tool", "Scripting, automation, all GCP services"],
              ["gsutil", "Cloud Storage operations (legacy)", "Bucket/object operations (bq for BigQuery)"],
              ["bq", "BigQuery command-line", "BigQuery queries and management"],
              ["Cloud Shell", "Browser-based shell with gcloud pre-installed", "Quick tasks, no local install needed"],
              ["Terraform (azurerm provider → google provider)", "Multi-cloud IaC", "Repeatable infra, version controlled"],
              ["Deployment Manager", "GCP-native IaC (YAML/Python/Jinja2)", "GCP-only, being superseded by Terraform/Config Connector"],
            ]}
          />
        </section>

        <Figure caption="GCP Resource Hierarchy: Organization → Folders → Projects → Resources, IAM inheritance top-down">
          <GcpResourceHierarchyDiagram />
        </Figure>
      </section>

      {/* ─── IAM ──────────────────────────────────────────────────────────── */}
      <section id="iam">
        <h2 style={S.h2}>Cloud IAM — Identity and Access</h2>

        <section id="iam-principals">
          <h3 style={S.h3}>Principals: Users, Groups, Service Accounts</h3>
          <p style={S.p}>
            Cloud IAM mein access WHO (principal) + WHAT (role/permissions) + WHERE (resource) combination se define hota hai. Principal = identity jo request karti hai.
          </p>
          <ComparisonTable
            headers={["Principal Type", "Description", "Use Case"]}
            rows={[
              ["Google Account", "Individual user (engineer@company.com)", "Human users, developers"],
              ["Service Account", "Non-human identity for workloads", "VMs, applications, GKE pods — machine identity"],
              ["Google Group", "Collection of users/service accounts", "Team-level access management"],
              ["Google Workspace Domain", "All users in domain (company.com)", "Organization-wide broad access"],
              ["Cloud Identity Domain", "Non-Google-Workspace Google identity", "Enterprises not using Workspace"],
              ["allAuthenticatedUsers", "Any Google-authenticated user", "Avoid in production — too broad"],
              ["allUsers", "Anyone (anonymous included)", "Public read-only content only"],
            ]}
          />
        </section>

        <section id="iam-roles">
          <h3 style={S.h3}>Roles: Basic, Predefined, Custom</h3>
          <p style={S.p}>
            Role = permissions ka set. Principal ko role assign hota hai ek resource ke context mein. Three categories:
          </p>
          <ul style={S.ul}>
            <li><strong>Basic Roles (primitive):</strong> Owner, Editor, Viewer. Project level pe broad access. Production mein avoid karo — least privilege violate karte hain.</li>
            <li><strong>Predefined Roles:</strong> Google-managed, service-specific — <code>roles/compute.instanceAdmin</code>, <code>roles/storage.objectViewer</code>, <code>roles/container.developer</code> etc. 500+ predefined roles available.</li>
            <li><strong>Custom Roles:</strong> Exact permission set define karo for your use case. Project ya Organization level pe create possible. Maintenance responsibility tumhari — Google updates predefined roles automatically.</li>
          </ul>
          <p style={S.p}>
            IAM policy evaluation: Allow bindings check hoti hain. IAM Deny Policies (newer feature): explicitly deny specific principals specific permissions — Deny policies Allow bindings ko override karti hain, matlab Deny wins even if Allow binding exists. Policy Troubleshooter: console/CLI tool jo batata hai why access was granted or denied — production debugging mein essential.
          </p>
        </section>

        <section id="service-accounts">
          <h3 style={S.h3}>Service Accounts and Workload Identity</h3>
          <p style={S.p}>
            Service Account GCP ka workload identity mechanism hai — machines aur applications ke liye, humans ke liye nahi. Compute Engine VM ko Service Account attach karo → VM automatically that SA ke permissions se GCP APIs call kar sakti hai.
          </p>
          <ul style={S.ul}>
            <li><strong>Service Account key files:</strong> JSON private key — avoid wherever possible. Key file compromise = full SA access. Rotation manual, leak risk high.</li>
            <li><strong>Attached SA (Compute Engine):</strong> VM ko SA attach karo → instance metadata se automatic token. No key file. AWS IAM Instance Profile equivalent.</li>
            <li><strong>Workload Identity (GKE):</strong> K8s Service Account → GCP Service Account mapping. GKE pods automatically assume GCP SA identity without any JSON key — token exchange happens transparently via metadata server. AWS EKS IRSA (IAM Roles for Service Accounts) ka direct equivalent. Note: "Workload Identity Federation" alag feature hai — external identity providers (GitHub Actions, AWS, Azure) ke liye, not GKE-specific.</li>
            <li><strong>SA impersonation:</strong> User ya SA ek doosri SA ka impersonate kar sakti hai — delegated access pattern.</li>
          </ul>
          <Callout type="best-practice" title="Service Account Keys — Last Resort Only">
            SA key files hamesha avoid karo — Compute Engine attached SA ya Workload Identity Federation use karo. Agar key file must use karo: 90-day rotation policy, Secret Manager mein store, never in code/git, audit regularly via Cloud Audit Logs.
          </Callout>
        </section>

        <section id="iam-best-practices">
          <h3 style={S.h3}>IAM Best Practices</h3>
          <ul style={S.ul}>
            <li>Least privilege: sirf required permissions. Basic roles (Owner/Editor) production mein nahi.</li>
            <li>Group-based access: users ko groups mein add karo, groups ko roles assign karo — not individual users</li>
            <li>Service accounts: ek SA per application/service — shared SAs avoid karo</li>
            <li>SA key rotation: automated key rotation ya Workload Identity Federation prefer karo</li>
            <li>Org Policy: restrict resource creation to specific Regions, disable SA key creation where possible</li>
            <li>Audit: Cloud Audit Logs (Admin Activity always on) — regular IAM policy review</li>
            <li>IAM Recommender: Google ka ML-based tool — unused permissions identify karo aur remove karo</li>
          </ul>
        </section>

        <Figure caption="GCP Cloud IAM: Who (Principal) + What (Role) + Where (Resource), Service Accounts aur Workload Identity">
          <GcpIamDiagram />
        </Figure>
      </section>

      {/* ─── NETWORKING ───────────────────────────────────────────────────── */}
      <section id="networking">
        <h2 style={S.h2}>GCP Networking — Global VPC</h2>

        <section id="global-vpc">
          <h3 style={S.h3}>Global VPC Architecture</h3>
          <p style={S.p}>
            GCP VPC ka sabse important architectural difference: <strong>VPC is GLOBAL</strong>. Ek single VPC multiple Regions span karta hai automatically. AWS mein VPC Region-specific hai — multi-region connectivity ke liye VPC Peering ya Transit Gateway chahiye. Azure mein VNet Region-specific hai. GCP mein ek VPC create karo → Mumbai, Iowa, Belgium sab ek network.
          </p>
          <p style={S.p}>
            Internal traffic ek Region se doosre Region mein same VPC ke andar: Google backbone pe route hota hai automatically — no extra configuration. Mumbai VM → Iowa VM, same VPC — direct internal IP, no IGW needed.
          </p>
          <Callout type="important" title="Global VPC ≠ Global Free-for-All">
            VPC global hai lekin subnets regional hain. Tum control karte ho ki kaun se subnets kaun se Regions mein hain. Firewall Rules bhi VPC-wide hain — lekin target by network tags ya SA. Kisi bhi VM pe specific tag lagao → specific firewall rules apply. No per-subnet security groups jaise AWS.
          </Callout>
        </section>

        <section id="subnets">
          <h3 style={S.h3}>Regional Subnets</h3>
          <p style={S.p}>
            Subnet ek Regional resource hai — ek Region select karte hain, lekin us Region ke sab Zones span karta hai. Example: asia-south1 mein subnet create karo → asia-south1-a, asia-south1-b, asia-south1-c — sab pe VMs us subnet se IPs le sakte hain.
          </p>
          <p style={S.p}>
            AWS mein subnet AZ-specific hota hai — ek subnet = ek AZ. GCP mein subnet = ek Region (multiple AZs). Yeh HA design simplify karta hai — ek subnet mein VMs across multiple zones deploy karo.
          </p>
          <ul style={S.ul}>
            <li>Private Google Access: subnet pe enable karo → VMs public IP ke bina Google APIs access kar sakti hain (googleapis.com)</li>
            <li>Subnet secondary ranges: alias IPs ke liye — GKE pods ke liye commonly used</li>
            <li>Subnet expansion: CIDR range expand kar sakte hain (shrink nahi)</li>
          </ul>
        </section>

        <section id="firewall-rules">
          <h3 style={S.h3}>Firewall Rules</h3>
          <p style={S.p}>
            GCP Firewall Rules VPC-level pe apply hote hain — not subnet-level. AWS Security Groups (NIC-level) ya NACLs (subnet-level) se different hai. Rule targeting: source/destination by IP ranges, network tags, ya Service Account identity.
          </p>
          <ComparisonTable
            headers={["Feature", "GCP Firewall Rules", "AWS Security Groups", "Azure NSG"]}
            rows={[
              ["Level", "VPC-level", "NIC-level (instance)", "Subnet OR NIC"],
              ["Targeting", "Network tags / Service Account", "IP ranges only", "IP ranges / Service Tags"],
              ["Allow + Deny", "Both (deny rules available)", "Allow only", "Both"],
              ["Default (implied)", "Deny all ingress (65535), allow all egress (65535) — implied rules, cannot delete", "Deny all inbound", "Deny Internet inbound"],
              ["Priority", "0–65535 (lower = higher priority)", "N/A (union of allows)", "100–4096"],
              ["Statefulness", "Stateful", "Stateful", "Stateful"],
            ]}
          />
          <p style={S.p}>
            Network tags best practice: tag-based rules IP management se far better hain. VM pe tag add karo <code>web-server</code> → automatically firewall rule apply. IP change hone pe rules update nahi karne padte.
          </p>
        </section>

        <section id="routes">
          <h3 style={S.h3}>Routes and Cloud Router</h3>
          <p style={S.p}>
            GCP VPC mein automatically system-generated routes hote hain — VPC ke andar traffic, Internet ke liye default route. Custom static routes add kar sakte hain — specific next-hops define karo (VM, VPN tunnel, etc.).
          </p>
          <p style={S.p}>
            <strong>Cloud Router:</strong> BGP-based dynamic routing — Cloud VPN ya Cloud Interconnect ke saath use karo. On-prem routes automatically VPC mein advertise hote hain, VPC routes on-prem ko. Traditional DC core router equivalent function (routing protocol peering) — lekin managed service hai.
          </p>
        </section>

        <section id="cloud-nat">
          <h3 style={S.h3}>Cloud NAT</h3>
          <p style={S.p}>
            Cloud NAT VMs ko private IPs ke saath Internet outbound connectivity deta hai — without public IP on VM. Managed service — no NAT gateway VM manage karna nahi padta. AWS NAT Gateway equivalent.
          </p>
          <ul style={S.ul}>
            <li>Subnet-level configuration — specific subnets ko NAT enable karo</li>
            <li>Manual NAT IP allocation ya auto allocation</li>
            <li>Port allocation: per-VM port count configurable (affects max concurrent connections)</li>
            <li>Cloud NAT logs: connection logs Cloud Logging mein — audit, troubleshoot outbound traffic</li>
          </ul>
        </section>

        <section id="vpc-peering-shared">
          <h3 style={S.h3}>VPC Peering and Shared VPC</h3>
          <p style={S.p}>
            <strong>VPC Peering:</strong> Do VPCs ko directly connect karo — same ya different Projects, same ya different Organizations. Non-transitive: A↔B, B↔C but A↔C nahi (unless Network Connectivity Center use karo). Internal IP routing, no external traffic. AWS VPC Peering equivalent.
          </p>
          <p style={S.p}>
            <strong>Shared VPC:</strong> Ek Host Project ka VPC multiple Service Projects ke saath share karo. Service Projects ke resources (VMs etc.) Host Project ke subnets mein deploy hote hain. Centralized networking management — separate billing per project. AWS Resource Access Manager (RAM) + Transit Gateway ke concepts similar hai lekin simpler architecture.
          </p>
        </section>

        <section id="private-service-access">
          <h3 style={S.h3}>Private Service Access and Private Service Connect</h3>
          <p style={S.p}>
            <strong>Private Service Access:</strong> Managed services (Cloud SQL, Cloud Filestore, AlloyDB) ke liye — VPC mein dedicated IP range allocate karo → service Google-managed network se accessible hoti hai privately. Cloud SQL ka Private IP mode yahi use karta hai.
          </p>
          <p style={S.p}>
            <strong>Private Service Connect (PSC):</strong> Google managed services ya third-party services ko VPC mein ek private IP endpoint se access karo — traffic kabhi Internet pe nahi jaata. Private Service Access se alag hai: PSC ek specific endpoint object create karta hai (IP address), Private Service Access VPC peering pe based hai.
          </p>
          <p style={S.p}>
            Practical example: production environment mein <code>storage.googleapis.com</code> ko public Internet se access nahi karni. PSC endpoint create karo → VMs ek internal IP se GCS call karein — NAT bhi nahi, Internet path bhi nahi. BFSI aur healthcare compliance mein yeh pattern mandatory ho jaata hai.
          </p>
        </section>

        <Figure caption="GCP Global VPC: regional subnets, firewall rules (network tags), Cloud NAT, Private Service Access">
          <GcpVpcDiagram />
        </Figure>
      </section>

      {/* ─── LOAD BALANCING ───────────────────────────────────────────────── */}
      <section id="load-balancing">
        <h2 style={S.h2}>Load Balancing</h2>
        <p style={S.p}>
          GCP Cloud Load Balancing globally distributed hai — single anycast IP, traffic automatically nearest PoP pe route hota hai. Traditional <TopicLink slug="load-balancer" variant="inline" /> concepts apply karte hain lekin implementation globally distributed hai.
        </p>

        <section id="cloud-lb-types">
          <h3 style={S.h3}>Cloud Load Balancing Types</h3>
          <ComparisonTable
            headers={["Type", "Protocol", "Scope", "Use Case"]}
            rows={[
              ["External Global HTTPS LB", "HTTP/HTTPS, gRPC", "Global anycast", "Web apps, APIs — user-facing global"],
              ["External Regional HTTPS LB", "HTTP/HTTPS", "Regional", "Regional web apps"],
              ["External Network TCP/UDP LB", "TCP/UDP/ICMP", "Regional", "Non-HTTP external traffic"],
              ["External Global TCP Proxy LB", "TCP", "Global", "Non-HTTP global TCP (port 80/443 non-HTTP)"],
              ["Internal HTTP(S) LB", "HTTP/HTTPS", "Regional (cross-region possible)", "Internal microservices, east-west"],
              ["Internal TCP/UDP LB", "TCP/UDP", "Regional", "Internal non-HTTP services"],
              ["External HTTPS LB (Classic)", "HTTP/HTTPS", "Global (older)", "Legacy pattern — use new External LB"],
            ]}
          />
          <p style={S.p}>
            GCP LB ka differentiator: Global anycast LB single IP globally — traffic nearest Google PoP pe enter karta hai, phir Google backbone pe backend tak. AWS ALB regional hai, Global Accelerator alag service hai. GCP mein globally distributed LB ek product hai.
          </p>
        </section>

        <section id="cloud-armor">
          <h3 style={S.h3}>Cloud Armor and CDN</h3>
          <p style={S.p}>
            <strong>Cloud Armor:</strong> DDoS protection aur WAF — External HTTPS Load Balancer ke saath directly integrated. OWASP Top 10 preconfigured rule sets, custom CEL-based rules, adaptive protection (ML-based DDoS mitigation), rate limiting per IP/region, bot management. Real example: ek e-commerce site pe Black Friday ke din volumetric DDoS attack aaya — Cloud Armor Adaptive Protection ne automatically traffic pattern identify kiya aur attack IPs block kiye, bina manual intervention ke.
          </p>
          <p style={S.p}>
            <strong>Cloud CDN:</strong> External HTTPS LB ke saath integrated CDN — cache static content Google edge PoPs pe. Origin-pull model. Cache invalidation API se. AWS CloudFront equivalent — lekin tightly integrated with GCP LB not a separate service.
          </p>
          <Callout type="warning" title="Cloud Interconnect Encryption">
            Cloud Interconnect (Dedicated ya Partner) NOT encrypted by default — same caveat as AWS Direct Connect aur Azure ExpressRoute. MACsec add kar sakte hain Dedicated Interconnect pe additional configuration se. Compliance requirements ke liye explicitly encryption layer plan karo.
          </Callout>
        </section>
      </section>

      {/* ─── HYBRID CONNECTIVITY ──────────────────────────────────────────── */}
      <section id="hybrid-connectivity">
        <h2 style={S.h2}>Hybrid Connectivity</h2>

        <section id="cloud-vpn">
          <h3 style={S.h3}>Cloud VPN (HA VPN)</h3>
          <p style={S.p}>
            Cloud VPN on-prem network ko GCP VPC se IPsec tunnel over Internet se connect karta hai. HA VPN recommended: 2 interfaces, 4 tunnels → 99.99% SLA.
          </p>
          <ComparisonTable
            headers={["Feature", "HA VPN", "Classic VPN"]}
            rows={[
              ["Interfaces", "2 (redundant)", "1"],
              ["Tunnels", "4 (2 per interface)", "1–4"],
              ["SLA", "99.99%", "99.9%"],
              ["BGP", "Required (dynamic routing)", "Static or dynamic"],
              ["AWS equivalent", "AWS Site-to-Site VPN (active-active)", "AWS Site-to-Site VPN (single tunnel)"],
            ]}
          />
          <p style={S.p}>
            HA VPN + Cloud Router: BGP dynamic routing — on-prem routes automatically advertise/learn. Traditional DC <TopicLink slug="router" variant="inline" /> ke BGP concepts apply hote hain.
          </p>
        </section>

        <section id="cloud-interconnect">
          <h3 style={S.h3}>Cloud Interconnect</h3>
          <p style={S.p}>
            Cloud Interconnect on-prem ko GCP ke saath private dedicated circuit se connect karta hai — Internet se nahi. Colocation facility mein Google network directly connect hota hai.
          </p>
          <ComparisonTable
            headers={["Feature", "Dedicated Interconnect", "Partner Interconnect"]}
            rows={[
              ["Path", "Direct to Google colocation facility", "Via connectivity provider"],
              ["Bandwidth", "10Gbps or 100Gbps per link", "50Mbps – 50Gbps"],
              ["SLA (HA config)", "99.99% (4 connections, 2 metro)", "99.99% (provider-dependent)"],
              ["Encryption", "NOT by default — MACsec optional", "NOT by default"],
              ["Setup time", "Weeks-months (physical circuit)", "Days-weeks (provider provisions)"],
              ["AWS equiv.", "AWS Direct Connect (dedicated)", "AWS Direct Connect (hosted)"],
            ]}
          />
        </section>

        <section id="network-connectivity-center">
          <h3 style={S.h3}>Network Connectivity Center</h3>
          <p style={S.p}>
            Network Connectivity Center (NCC) GCP ka hub-and-spoke WAN fabric hai. Multiple on-prem sites, branch offices aur VPCs ek central hub se connect ho jaate hain — point-to-point mesh banane ki zaroorat nahi. AWS Transit Gateway ka GCP equivalent.
          </p>
          <p style={S.p}>
            Spokes teen types ke hote hain: HA VPN tunnels, Dedicated/Partner Interconnect attachments, aur Router appliances (third-party <TopicLink slug="sd-wan" variant="inline" /> devices jo Cloud Router se peer karte hain). Practical use case: company ke Mumbai HQ, Bangalore branch aur GCP VPC — teeno NCC hub se connect karo, sab ek dusre se reachable ho jaate hain bina per-site peering ke.
          </p>
        </section>

        <Figure caption="GCP Hybrid Connectivity: HA VPN, Dedicated Interconnect, Partner Interconnect aur Network Tiers comparison">
          <GcpHybridDiagram />
        </Figure>
      </section>

      {/* ─── COMPUTE ──────────────────────────────────────────────────────── */}
      <section id="compute">
        <h2 style={S.h2}>Compute Services</h2>

        <section id="compute-engine">
          <h3 style={S.h3}>Compute Engine (VMs)</h3>
          <p style={S.p}>
            Compute Engine GCP ka IaaS virtual compute service hai — KVM-based VMs. VM = machine type + boot disk (Persistent Disk) + NICs (VPC subnet se IPs). Public IP optional — internal IP mandatory (VPC subnet se assigned).
          </p>
          <p style={S.p}>
            Machine families:
          </p>
          <ul style={S.ul}>
            <li><strong>E2:</strong> General purpose, cost-effective — dev/test, web servers, small databases</li>
            <li><strong>N2, N2D, N4:</strong> Balanced — most production workloads</li>
            <li><strong>C3, C3D:</strong> Compute-optimized — high-CPU apps, gaming, HPC</li>
            <li><strong>M3:</strong> Memory-optimized — large in-memory databases (SAP HANA)</li>
            <li><strong>A3:</strong> GPU-optimized — NVIDIA H100 — AI/ML training</li>
            <li><strong>T2A:</strong> Arm-based (Ampere Altra) — scale-out, cost-sensitive</li>
          </ul>
          <p style={S.p}>
            Live Migration: GCP ke host maintenance ke dauran VMs automatically migrate hote hain doosre host pe — downtime nahi. AWS/Azure equivalent nahi — GCP advantage for certain workloads.
          </p>
        </section>

        <section id="vm-pricing">
          <h3 style={S.h3}>VM Pricing: SUDs and CUDs</h3>
          <ComparisonTable
            headers={["Pricing Model", "How It Works", "Savings", "Commitment"]}
            rows={[
              ["On-demand", "Pay per second/minute", "0%", "None"],
              ["Sustained Use Discount (SUD)", "Automatic — more usage in month = more discount", "Up to ~30%", "None — automatic"],
              ["Committed Use Discount — Resource CUD", "1yr/3yr commit to specific vCPU/memory", "Up to 57%/70%", "1yr or 3yr"],
              ["Committed Use Discount — Spend CUD", "1yr/3yr commit to dollar amount in specific region/family", "Up to 70%", "1yr or 3yr"],
              ["Spot VMs", "Spare capacity — preemptible anytime, 30-sec notice", "60–91%", "None — but interruptible"],
              ["Preemptible VMs (legacy)", "Same as Spot but max 24hr runtime", "60–91%", "None — interruptible, 24hr max"],
            ]}
          />
          <Callout type="important" title="SUDs — GCP Ka Unique Advantage">
            Sustained Use Discounts AWS ya Azure mein nahi hain. GCP automatically discount deta hai jitna zyada ek resource ek month mein run karta hai. 100% of month run = ~30% discount — koi action nahi chahiye. AWS mein On-Demand pricing full month pe = full cost. CUDs ke saath combine karo for maximum savings on predictable baseline workloads.
          </Callout>
        </section>

        <section id="gke">
          <h3 style={S.h3}>Google Kubernetes Engine (GKE)</h3>
          <p style={S.p}>
            GKE Google ka managed Kubernetes service hai — Google ne Kubernetes banaya, GKE uska most mature managed implementation hai. Control plane (API server, etcd, scheduler) Google manage karta hai.
          </p>
          <ul style={S.ul}>
            <li><strong>GKE Standard:</strong> Node pools tum manage karo — machine type, count, OS, auto-upgrade settings. Full flexibility.</li>
            <li><strong>GKE Autopilot:</strong> Google nodes manage karta hai — tum sirf pods deploy karo. Billing per pod (requested CPU/memory). Prod mein recommended for most teams — less operational overhead.</li>
            <li><strong>Cluster types:</strong> Zonal (single master zone, dev/test), Regional (3 control plane zones, 99.95% SLA — use for prod)</li>
            <li><strong>Workload Identity:</strong> K8s Service Account → GCP Service Account map karo — pods bina key file ke GCP APIs access karte hain. Always use this.</li>
            <li><strong>GKE Autopilot limitations:</strong> DaemonSets allowed with restrictions, privileged pods restricted, some node-level configs not available. Check workload compatibility before migrating.</li>
          </ul>
        </section>

        <section id="cloud-run">
          <h3 style={S.h3}>Cloud Run</h3>
          <p style={S.p}>
            Cloud Run serverless container platform hai — container image deploy karo, Google scaling aur infrastructure manage karta hai. HTTP-triggered services ke liye. Scale-to-zero support — idle pe cost zero. AWS Fargate (serverless mode) + Lambda Container Images equivalent.
          </p>
          <ul style={S.ul}>
            <li>CPU/memory allocations: 0.08–8 vCPU, 128MB–32GB per container instance</li>
            <li>Concurrency: ek container instance multiple requests handle kar sakta hai (unlike Lambda)</li>
            <li>Cloud Run jobs: non-HTTP workloads, batch jobs — containerized, scheduled or triggered</li>
            <li>VPC connector / Direct VPC egress: Cloud Run se VPC private resources access karo</li>
            <li>Min instances: cold start eliminate karo — pre-warmed instances maintain karo</li>
          </ul>
        </section>

        <section id="cloud-functions">
          <h3 style={S.h3}>Cloud Functions</h3>
          <p style={S.p}>
            Cloud Functions event-driven FaaS (Functions-as-a-Service) hai — code deploy karo, Google sab manage karta hai. AWS Lambda equivalent. Supported runtimes: Node.js, Python, Go, Java, Ruby, PHP, .NET.
          </p>
          <ul style={S.ul}>
            <li><strong>Triggers:</strong> HTTP, Pub/Sub, Cloud Storage, Firestore, Firebase, Cloud Scheduler, Eventarc</li>
            <li><strong>Gen 1 vs Gen 2:</strong> Gen 2 (Cloud Run based) — longer timeout (60 min), higher memory (32GB), concurrency support</li>
            <li><strong>Cold starts:</strong> Min instances = 0 pe cold start possible. Min instances &gt; 0 = warm instances, higher cost.</li>
            <li><strong>VPC connector:</strong> Functions se VPC private resources access (Cloud SQL, Memorystore etc.)</li>
          </ul>
        </section>

        <Figure caption="GCP Compute: Compute Engine, GKE, Cloud Run, Cloud Functions — abstraction levels aur DC mapping">
          <GcpComputeDiagram />
        </Figure>
      </section>

      {/* ─── STORAGE ──────────────────────────────────────────────────────── */}
      <section id="storage-services">
        <h2 style={S.h2}>Storage Services</h2>

        <section id="cloud-storage">
          <h3 style={S.h3}>Cloud Storage (GCS)</h3>
          <p style={S.p}>
            Cloud Storage GCP ka object storage service hai — Bucket ke andar Objects. Hierarchy simple hai: bucket ek globally unique name se create hota hai, uske andar objects (files) key-value style mein store hote hain. Traditional DC mein NetApp StorageGRID ya Dell ECS jaise object stores ka yeh cloud counterpart hai — lekin scale aur durability (11 nines) ki wajah se comparison karna mushkil hai.
          </p>
          <ul style={S.ul}>
            <li><strong>Location types:</strong> Regional (single region, lowest latency), Dual-region (two specific regions, 99.99% availability), Multi-region (large geo area, US/EU/ASIA — highest availability, content global)</li>
            <li><strong>Storage classes:</strong> Standard (frequent), Nearline (1 month min, monthly access), Coldline (3 month min, quarterly access), Archive (1 year min, rarely accessed — cheapest, hours retrieval)</li>
            <li><strong>Lifecycle policies:</strong> Automatically change storage class or delete objects based on age/access — cost optimization</li>
            <li><strong>Object versioning:</strong> Retain previous versions — accidental delete/overwrite protection</li>
            <li><strong>CMEK:</strong> Customer-Managed Encryption Keys via Cloud KMS — your key, your control</li>
            <li><strong>Retention policies + Object Lock (WORM):</strong> Compliance — objects cannot be deleted before retention period</li>
          </ul>
        </section>

        <section id="persistent-disk">
          <h3 style={S.h3}>Persistent Disk and Hyperdisk</h3>
          <p style={S.p}>
            Persistent Disk network-attached block storage hai — Compute Engine VMs ke liye. AWS EBS equivalent. Traditional DC SAN LUN equivalent.
          </p>
          <ComparisonTable
            headers={["Disk Type", "IOPS / Throughput", "Latency", "Use Case"]}
            rows={[
              ["Standard (pd-standard)", "Up to 3000 IOPS / 1200 MB/s", "Higher", "Dev/test, cold data, backup"],
              ["Balanced (pd-balanced)", "Up to 80,000 IOPS / 1200 MB/s", "Medium", "Most production workloads"],
              ["SSD (pd-ssd)", "Up to 100,000 IOPS / 2400 MB/s", "Low", "High-performance apps, databases"],
              ["Extreme (pd-extreme)", "Up to 120,000 IOPS", "Very low", "Highest performance databases"],
              ["Hyperdisk Extreme", "Higher IOPS, configurable", "Lowest", "Mission-critical, Oracle, SAP"],
              ["Hyperdisk Balanced", "Flexible IOPS/throughput", "Low-medium", "Flexible production workloads"],
              ["Local SSD", "Millions of IOPS, NVMe", "Microseconds", "Ephemeral cache, temp compute — NOT persistent"],
            ]}
          />
          <p style={S.p}>
            Disk snapshots: incremental, stored in Cloud Storage. Cross-region copy possible. Schedule automatic snapshots. Regional PD: 2-zone synchronous replication — higher availability, automatic failover.
          </p>
        </section>

        <section id="filestore">
          <h3 style={S.h3}>Filestore</h3>
          <p style={S.p}>
            Filestore managed NFS file storage service hai — multiple VMs simultaneously mount kar sakti hain. Traditional DC NAS (Network Attached Storage) ka cloud equivalent. <TopicLink slug="nas" variant="inline" /> article se networking concepts connect karo.
          </p>
          <ul style={S.ul}>
            <li><strong>Basic HDD/SSD:</strong> Zonal — dev/test, basic workloads</li>
            <li><strong>Enterprise:</strong> Regional, HA — production workloads</li>
            <li><strong>High Scale:</strong> High capacity, high throughput — ML training data, HPC</li>
            <li>NFS v3 aur v4.1 support — broad client compatibility</li>
            <li>AWS EFS equivalent — lekin only NFS (no SMB like Azure Files)</li>
          </ul>
        </section>

        <Figure caption="GCP Storage: Cloud Storage, Persistent Disk, Filestore, Local SSD aur Database services">
          <GcpStorageDiagram />
        </Figure>
      </section>

      {/* ─── DATABASES ────────────────────────────────────────────────────── */}
      <section id="databases">
        <h2 style={S.h2}>Database Services</h2>

        <section id="cloud-sql">
          <h3 style={S.h3}>Cloud SQL</h3>
          <p style={S.p}>
            Cloud SQL managed relational database service hai — MySQL, PostgreSQL, aur SQL Server support karta hai. OS patches, database engine upgrades, automated backups — Google ka kaam. Tumhara kaam: schema design, queries, access control, aur connection management. Zyaadatar teams jo RDS pe comfortable hain unhe Cloud SQL familiar lagta hai — core concepts same hain, terminology thodi alag.
          </p>
          <ul style={S.ul}>
            <li><strong>HA configuration:</strong> Primary instance + standby instance (different Zone) — automatic failover in case of zone failure (~60 seconds typically)</li>
            <li><strong>Read replicas:</strong> Same Region ya different Region pe readable replicas — read scaling + DR</li>
            <li><strong>Private IP:</strong> Private Service Access se VPC mein private IP — public IP expose mat karo production mein</li>
            <li><strong>Backups:</strong> Automated daily backups + on-demand backups. Point-in-time recovery (PITR) with binary logging.</li>
            <li><strong>Cloud SQL Auth Proxy:</strong> Secure connection without IP allowlisting — Cloud IAM se auth, SSL tunnel automatic</li>
          </ul>
        </section>

        <section id="cloud-spanner">
          <h3 style={S.h3}>Cloud Spanner</h3>
          <p style={S.p}>
            Cloud Spanner duniya ka pehla globally distributed, strongly consistent, horizontally scalable SQL database hai. Yeh GCP ka truly unique service hai — AWS ya Azure mein direct equivalent nahi hai.
          </p>
          <ul style={S.ul}>
            <li>Global distribution: multiple Regions pe synchronous replication + strong consistency — yeh theoretically impossible lagta tha (CAP theorem) lekin GCP ne Truetime API se implement kiya</li>
            <li>Horizontal scale: petabytes of data, millions of transactions per second — add nodes = more throughput</li>
            <li>ACID transactions globally — consistency sirf single Region mein nahi, globally</li>
            <li>Use case: financial systems, global inventory, gaming leaderboards, global user databases</li>
            <li>Cost: premium — traditional databases se zyada. Justify karo: global consistency requirement ya extreme scale</li>
          </ul>
          <Callout type="important" title="Cloud Spanner vs Cloud SQL">
            Dono managed SQL databases hain lekin fundamentally different. Cloud SQL = traditional RDBMS managed (scale-up). Cloud Spanner = globally distributed scale-out. Spanner choose karo when: global consistency needed, horizontal scale beyond single server, multi-region active-active SQL. Cloud SQL choose karo when: standard workloads, cost sensitivity, existing MySQL/PostgreSQL apps.
          </Callout>
        </section>

        <section id="bigtable-firestore">
          <h3 style={S.h3}>Bigtable, Firestore and AlloyDB</h3>
          <ComparisonTable
            headers={["Service", "Type", "Use Case", "AWS Equiv."]}
            rows={[
              ["Bigtable", "Wide-column NoSQL (HBase API)", "Time-series, IoT, analytics — billions of rows, low ms latency", "DynamoDB (conceptually, different model)"],
              ["Firestore", "Document NoSQL (collections/documents)", "Mobile/web apps, real-time sync, hierarchical data", "DynamoDB / MongoDB Atlas"],
              ["Firestore in Datastore mode", "NoSQL (legacy Datastore API)", "Migration from legacy Datastore apps", "DynamoDB (Datastore model)"],
              ["AlloyDB", "PostgreSQL-compatible + columnar engine", "Enterprise PostgreSQL, analytics + OLTP, AI-ready", "Amazon Aurora PostgreSQL (closer comparison)"],
              ["Memorystore", "Managed Redis / Memcached", "Session cache, rate limiting, leaderboard, real-time queues", "Amazon ElastiCache"],
              ["BigQuery", "Serverless data warehouse + analytics", "SQL analytics on petabytes, BI, data lake", "Amazon Redshift / Athena"],
            ]}
          />
          <p style={S.p}>
            AlloyDB ≠ Cloud SQL. AlloyDB ek alag product hai — columnar storage engine, AI/ML integration, 4x faster analytics than standard PostgreSQL. Production enterprise PostgreSQL workloads ke liye — Cloud SQL se zyada capable lekin zyada costly.
          </p>
        </section>
      </section>

      {/* ─── HIGH AVAILABILITY ────────────────────────────────────────────── */}
      <section id="high-availability">
        <h2 style={S.h2}>High Availability</h2>

        <section id="zone-regional-ha">
          <h3 style={S.h3}>Zonal vs Regional Resources</h3>
          <p style={S.p}>
            GCP resources categorize hote hain zonal, regional, ya global:
          </p>
          <ComparisonTable
            headers={["Resource Type", "Scope", "HA Pattern", "Example"]}
            rows={[
              ["Zonal", "Single Zone", "Deploy in multiple zones manually", "Compute Engine VM, Zonal PD"],
              ["Regional", "Region (all Zones)", "Automatically spans Zones", "Regional MIG, Regional PD, Subnet"],
              ["Global", "All Regions", "N/A — inherently HA", "VPC, Global LB, Cloud Armor, IAM"],
              ["Multi-regional", "Multiple Regions", "Automatically multi-region", "Cloud Storage Multi-region, Spanner"],
            ]}
          />
          <p style={S.p}>
            Production HA principle: zonal resources ko multiple zones mein deploy karo. Regional resources automatically multi-zone hain. Global resources extra HA planning nahi chahte.
          </p>
        </section>

        <section id="migs">
          <h3 style={S.h3}>Managed Instance Groups (MIGs)</h3>
          <p style={S.p}>
            MIG identical VMs ka group hai — autoscaling, autohealing, rolling updates, multi-zone distribution. AWS Auto Scaling Group (ASG) equivalent. Azure VMSS equivalent.
          </p>
          <ul style={S.ul}>
            <li><strong>Zonal MIG:</strong> Single zone — simpler, lower cost</li>
            <li><strong>Regional MIG:</strong> Multiple zones in Region — HA, zone failure survive karta hai. Production ke liye use karo.</li>
            <li><strong>Autoscaling:</strong> CPU utilization, LB capacity, custom metrics (Cloud Monitoring), scheduled — min/max instance count</li>
            <li><strong>Autohealing:</strong> Health check fail → instance automatically recreate. Application-level health, not just VM ping.</li>
            <li><strong>Rolling updates:</strong> Template update karo → MIG gradually instances update karta hai — configurable max surge/unavailable</li>
            <li><strong>Stateless vs stateful MIGs:</strong> Stateful — per-instance config (disk, IP preserved) — database-like workloads</li>
          </ul>
        </section>
      </section>

      {/* ─── DISASTER RECOVERY ────────────────────────────────────────────── */}
      <section id="disaster-recovery">
        <h2 style={S.h2}>Disaster Recovery</h2>

        <section id="dr-patterns">
          <h3 style={S.h3}>DR Patterns and Backup</h3>
          <p style={S.p}>
            GCP mein koi single managed DR service nahi hai (like Azure Site Recovery). DR engineer design karta hai using existing services.
          </p>
          <ComparisonTable
            headers={["Pattern", "RTO", "RPO", "Cost", "Approach"]}
            rows={[
              ["Cold Backup", "Hours", "Hours/days", "Lowest", "Snapshots + Cloud Storage backup → restore in DR Region on event"],
              ["Pilot Light", "Minutes-hours", "Minutes", "Low", "Minimal DR resources (DB read replica), scale up on DR event"],
              ["Warm Standby", "Minutes", "Near-zero", "Medium", "Scaled-down MIG in DR Region, promote DB replica, update DNS"],
              ["Hot Standby / Active-Active", "Near-zero", "Near-zero", "Highest", "Global LB routes to both Regions simultaneously"],
            ]}
          />
          <ul style={S.ul}>
            <li><strong>VM backups:</strong> Disk snapshots (scheduled policies), machine images (VM + disk + metadata)</li>
            <li><strong>Cloud SQL:</strong> Cross-region read replicas → promote to standalone on DR. Automated backups + PITR.</li>
            <li><strong>Cloud Storage:</strong> Dual-region bucket (e.g., asia-south1 + asia-southeast1) create karo — objects automatically dono regions mein sync hote hain, zero extra config. Ek region down ho toh doosri region se seamless serve hota hai. Turbo replication enable karo 15-minute RPO ke liye.</li>
            <li><strong>Cloud Spanner:</strong> Multi-region configuration — globally distributed instances survive regional failures</li>
            <li><strong>DNS failover:</strong> Cloud DNS health checks + routing policies for automatic failover</li>
          </ul>
        </section>
      </section>

      {/* ─── SECURITY SERVICES ────────────────────────────────────────────── */}
      <section id="security-services">
        <h2 style={S.h2}>Security Services</h2>

        <section id="cloud-kms">
          <h3 style={S.h3}>Cloud KMS and Secret Manager</h3>
          <p style={S.p}>
            <strong>Cloud KMS (Key Management Service):</strong> Cryptographic keys manage karo — software-backed ya HSM-backed (Cloud HSM). Envelope encryption: data encrypt karo DEK se, DEK encrypt karo KMS key se. AWS KMS equivalent.
          </p>
          <ul style={S.ul}>
            <li>CMEK (Customer-Managed Encryption Keys): Cloud Storage, BigQuery, Cloud SQL, Compute Engine disk encryption KMS keys se</li>
            <li>Key rotation: automatic scheduled rotation</li>
            <li>External Key Manager (EKM): keys outside GCP (on-prem HSM) se — HYOK (Hold Your Own Key)</li>
          </ul>
          <p style={S.p}>
            <strong>Secret Manager:</strong> Application secrets (API keys, passwords, certificates) securely store karo. Versioned, audited, IAM-controlled access. AWS Secrets Manager equivalent.
          </p>
          <ul style={S.ul}>
            <li>Versions: multiple versions per secret — rotate without app restart</li>
            <li>Automatic rotation: Cloud Functions trigger pe auto-rotate support</li>
            <li>Access via API/SDK: Compute Engine VMs, Cloud Run, Cloud Functions — no credentials in code</li>
          </ul>
        </section>

        <section id="security-command-center">
          <h3 style={S.h3}>Security Command Center</h3>
          <p style={S.p}>
            Security Command Center (SCC) GCP ka centralized CSPM + threat detection platform hai. Ek jagah se pura GCP environment ka security posture dekho — misconfigurations, active threats, compliance gaps sab consolidated view mein.
          </p>
          <ul style={S.ul}>
            <li><strong>Security Health Analytics:</strong> Misconfigurations detect karo — public buckets, overly permissive firewall rules (allow all ingress), exposed SA keys, unencrypted disks</li>
            <li><strong>Threat Detection:</strong> ML-based — cryptomining, data exfiltration, brute force, malware signals</li>
            <li><strong>Event Threat Detection:</strong> Cloud Logging streams analyze — anomalous IAM grants, suspicious logins, privilege escalation</li>
            <li><strong>Container Threat Detection:</strong> GKE runtime threat detection — suspicious binaries, libraries</li>
            <li><strong>Compliance:</strong> CIS Benchmarks, PCI-DSS, NIST, ISO 27001 — automated compliance reporting</li>
          </ul>
        </section>

        <section id="vpc-service-controls">
          <h3 style={S.h3}>VPC Service Controls</h3>
          <p style={S.p}>
            VPC Service Controls ek security perimeter define karta hai GCP managed services ke around — data exfiltration prevent karo. Even with valid IAM credentials, perimeter ke bahar se access deny ho sakti hai.
          </p>
          <p style={S.p}>
            Example: BigQuery dataset — sirf corporate VPC se accessible. Employee rogue credentials se bahar se data nahi nikal sakta. Cloud Storage bucket — sirf specific VPC sources se. Compliance ke liye (BFSI, healthcare) critical feature.
          </p>
          <ul style={S.ul}>
            <li>Access Levels: additional conditions define karo (device policy, IP range, region)</li>
            <li>Ingress/Egress rules: fine-grained control on what can enter/leave perimeter</li>
            <li>Dry run mode: audit mode — violations log karo, deny nahi karo — before enforcing</li>
          </ul>
          <Callout type="important" title="BeyondCorp Enterprise">
            BeyondCorp Enterprise Google ka zero-trust access product hai — corporate VPN ke bina enterprise applications access karo, based on user identity + device trust level + context (location, device compliance). Google ne yeh apne own employees ke liye pehle build kiya tha — "BeyondCorp" research papers 2014 se publicly available hain. Network location (VPN connected hai ya nahi) matter nahi karta, device posture aur user identity matter karta hai.
          </Callout>
        </section>
      </section>

      {/* ─── OPERATIONS ───────────────────────────────────────────────────── */}
      <section id="operations">
        <h2 style={S.h2}>Operations Suite (Observability)</h2>

        <section id="cloud-monitoring">
          <h3 style={S.h3}>Cloud Monitoring</h3>
          <p style={S.p}>
            Cloud Monitoring GCP infrastructure aur applications ke metrics collect, visualize aur alert karta hai — GCP resources ka data automatically aata hai, additional configuration nahi chahiye. AWS/Azure infra bhi monitor kar sakte ho same workspace se (multi-cloud agent deploy karo).
          </p>
          <ul style={S.ul}>
            <li>GCP resource metrics auto-collected: Compute Engine CPU/disk/network, GKE node/pod, Cloud SQL queries etc.</li>
            <li>Custom metrics: Monitoring API ya OpenTelemetry se push karo</li>
            <li>Uptime checks: HTTP/TCP/HTTPS endpoint health checks — global locations se</li>
            <li>Alerting policies: metric threshold, absence of metric, metric ratio — notification channels (email, PagerDuty, Slack, Pub/Sub, webhook)</li>
            <li>Dashboards: pre-built + custom. Metrics Explorer: ad-hoc metric queries.</li>
            <li>SLO monitoring: SLI define karo → SLO track karo → error budget monitor karo</li>
          </ul>
        </section>

        <section id="cloud-logging">
          <h3 style={S.h3}>Cloud Logging and Audit Logs</h3>
          <p style={S.p}>
            Cloud Logging GCP ka centralized log ingestion aur querying platform hai. GCP services automatically logs bhejte hain — Compute Engine (OS logs via Ops Agent), GKE, Cloud SQL, Cloud Run, Cloud Functions sab included. Log Router sab logs receive karta hai aur decide karta hai kahan store karna hai ya export karna hai.
          </p>
          <ul style={S.ul}>
            <li>Log Router: sab logs Cloud Logging mein aate hain — Log Router decides where to store/export</li>
            <li>Log sinks: export logs to Cloud Storage (archival), BigQuery (analytics), Pub/Sub (streaming), third-party SIEMs</li>
            <li>Log-based metrics: logs se custom metrics create karo → alerting pe use karo</li>
            <li>Log exclusions: unnecessary logs exclude karo — cost control</li>
          </ul>
          <p style={S.p}>
            <strong>Cloud Audit Logs — 4 types:</strong>
          </p>
          <ul style={S.ul}>
            <li><strong>Admin Activity:</strong> Resource configuration changes — ALWAYS on, cannot disable. "Who created/deleted/modified resource X."</li>
            <li><strong>Data Access:</strong> Data read/write — configurable (off by default for storage cost). "Who read object Y from bucket Z."</li>
            <li><strong>System Event:</strong> Google-automated actions — VM live migration, autoscaling events.</li>
            <li><strong>Policy Denied:</strong> VPC Service Controls ya Org Policy violations.</li>
          </ul>
          <Callout type="best-practice" title="Audit Logs — Production Mandatory">
            Admin Activity logs always on rakhna mandatory hai (already can't disable). Data Access logs production mein enable karo for compliance — sirf high-volume services pe cost monitor karo. BigQuery data access logs especially important for data governance. Log sink to Cloud Storage for 7-year retention (financial compliance).
          </Callout>
        </section>

        <section id="trace-profiler">
          <h3 style={S.h3}>Cloud Trace and Profiler</h3>
          <p style={S.p}>
            <strong>Cloud Trace:</strong> Distributed tracing — request ke latency across microservices trace karo. GKE, App Engine, Cloud Run automatically integrated. AWS X-Ray equivalent. Bottlenecks identify karo: "Order API 500ms slow kyu hai — database query slow hai ya network?"
          </p>
          <p style={S.p}>
            <strong>Cloud Profiler:</strong> Production mein always-on CPU aur heap profiler — low overhead (&lt;1%). Performance hotspots identify karo without separate profiling sessions. AWS CodeGuru Profiler equivalent.
          </p>
          <p style={S.p}>
            <strong>Error Reporting:</strong> Application errors automatically detect aur group karo — stacktraces, first/last occurrence, user impact count. App Engine, Cloud Run, GKE se auto-integrate.
          </p>
        </section>

        <Figure caption="GCP Operations Suite: Cloud Monitoring, Logging, Audit Logs, Trace, Profiler — complete observability stack">
          <GcpOperationsDiagram />
        </Figure>
      </section>

      {/* ─── IaC ──────────────────────────────────────────────────────────── */}
      <section id="iac-gcp">
        <h2 style={S.h2}>Infrastructure as Code on GCP</h2>

        <section id="deployment-manager-tf">
          <h3 style={S.h3}>Terraform and Deployment Manager</h3>
          <p style={S.p}>
            <strong>Terraform (HashiCorp):</strong> GCP ke liye <code>google</code> provider — all GCP resources manage karne ke liye. Multi-cloud environments ke liye preferred. State management: Cloud Storage bucket mein Terraform state file store karo + GCS object versioning enable karo. State locking: GCP Cloud Storage object lock ya separately Firestore/Datastore.
          </p>
          <p style={S.p}>
            <strong>Deployment Manager:</strong> GCP ka native IaC — YAML/Python/Jinja2. Being superseded by Terraform aur Config Connector for most use cases. Legacy projects mein dikhega.
          </p>
          <p style={S.p}>
            <strong>Config Connector:</strong> Kubernetes operator jo GCP resources ko K8s custom resources se manage karta hai — GitOps workflows ke liye, GKE clusters mein. Infra aur app deployments ek Kubernetes manifest se manage karo.
          </p>
          <ul style={S.ul}>
            <li>Terraform + Cloud Build: CI/CD pipeline — PR pe <code>terraform plan</code>, merge pe <code>terraform apply</code></li>
            <li>Terraform modules: reusable modules for GCP patterns (VPC, GKE cluster, Cloud SQL)</li>
            <li>Google-provided modules: <code>terraform-google-modules</code> GitHub organization — production-ready</li>
          </ul>
        </section>
      </section>

      {/* ─── PRICING ──────────────────────────────────────────────────────── */}
      <section id="pricing-gcp">
        <h2 style={S.h2}>GCP Pricing and Cost Management</h2>

        <section id="pricing-model">
          <h3 style={S.h3}>Pricing Model and Discounts</h3>
          <ComparisonTable
            headers={["Cost Driver", "Billing Basis", "Engineering Implication"]}
            rows={[
              ["Compute Engine", "Per second (minimum 1 minute)", "Stop VM = compute billing stops (disk continues)"],
              ["Persistent Disk", "Per GB-month (provisioned)", "Delete unused disks — they bill whether attached or not"],
              ["Cloud Storage", "Per GB-month + operations + network egress", "Lifecycle policies for tiering, minimize inter-region egress"],
              ["Cloud SQL", "Per instance-hour + storage + backup", "Pause dev/test Cloud SQL when not in use"],
              ["GKE", "Cluster management fee (1 cluster free/project) + node VM costs", "GKE Autopilot: per-pod billing can be cheaper for variable loads"],
              ["Network egress", "Per GB (Internet egress + inter-region)", "Keep traffic within Region/Zone where possible"],
              ["Cloud Load Balancing", "Per rule-hour + data processed", "Consolidate backends, minimize rule count"],
              ["Cloud Logging", "Per GB ingested beyond free tier", "Log exclusions for noisy sources, export to GCS for archive"],
            ]}
          />
        </section>

        <section id="cost-tools">
          <h3 style={S.h3}>Cost Management Tools</h3>
          <ul style={S.ul}>
            <li><strong>Cloud Billing:</strong> Cost reports, invoice management, payment profiles. Export to BigQuery for custom analysis.</li>
            <li><strong>Budget Alerts:</strong> Billing Account ya Project level pe budget define karo → alerts at 50%, 90%, 100% thresholds.</li>
            <li><strong>Cost Table / Cost Breakdown:</strong> Service, SKU, project, label pe drill-down cost analysis.</li>
            <li><strong>Recommendations:</strong> Committed Use Discount recommendations, idle VM recommendations, oversized VM suggestions — Recommender API.</li>
            <li><strong>Pricing Calculator:</strong> cloud.google.com/products/calculator — estimate costs before deploying.</li>
            <li><strong>Labels strategy:</strong> environment, team, application, cost-center mandatory labels — enforce with Org Policy.</li>
            <li><strong>Resource hierarchy for billing:</strong> Projects → Billing Accounts → reporting hierarchy design karo upfront.</li>
          </ul>
        </section>
      </section>

      {/* ─── GCP VS CLOUDS ────────────────────────────────────────────────── */}
      <section id="gcp-vs-clouds">
        <h2 style={S.h2}>GCP vs AWS vs Azure</h2>
        <Figure caption="GCP vs AWS vs Azure: complete 22-category service mapping for data center engineers">
          <GcpVsCloudsDiagram />
        </Figure>
        <ComparisonTable
          headers={["Dimension", "GCP Advantage", "AWS Advantage", "Azure Advantage"]}
          rows={[
            ["Network", "Global VPC, Premium Tier (Google backbone)", "Most mature, widest PoP coverage", "ExpressRoute global reach, Virtual WAN"],
            ["Kubernetes", "GKE (original K8s creator), Autopilot, mature", "EKS broad ecosystem", "AKS simpler Day 2"],
            ["Big Data / Analytics", "BigQuery, Dataflow, Dataproc — best-in-class", "EMR, Redshift mature", "Synapse Analytics, Fabric"],
            ["AI / ML", "TPUs, Vertex AI, Gemini models", "Bedrock, SageMaker, widest model choice", "Azure OpenAI, Copilot integration"],
            ["Unique DB", "Cloud Spanner (globally distributed SQL)", "Aurora Serverless v2", "Cosmos DB (multi-model)"],
            ["Pricing", "SUDs (automatic), per-second billing", "Most mature RI/Savings Plans ecosystem", "Hybrid Benefit (Windows/SQL shops)"],
            ["Enterprise", "Google Workspace, GKE Enterprise, Anthos", "Largest enterprise adoption, widest services", "Microsoft 365, Active Directory, Teams"],
            ["Open Source", "Strong (K8s, TensorFlow, Istio all originated at Google)", "Large OpenSearch, RDS open-source", "Strong .NET, PostgreSQL, MariaDB"],
          ]}
        />
        <p style={S.p}>
          <strong>GCP choose karo jab:</strong> Analytics/BigQuery primary need ho, Kubernetes-native architecture, AI/ML workloads (TPUs, Vertex AI), global network performance premium tier required, cost-sensitive compute (SUDs advantage). <strong>AWS choose karo jab:</strong> Widest service selection, largest global community, most mature ecosystem, multi-cloud strategy. <strong>Azure choose karo jab:</strong> Microsoft enterprise software heavy use (Windows, SQL Server, AD, M365), hybrid cloud primary concern.
        </p>
      </section>

      {/* ─── ARCHITECTURE EXAMPLES ────────────────────────────────────────── */}
      <section id="architecture-examples">
        <h2 style={S.h2}>Architecture Examples</h2>

        <section id="three-tier-gcp">
          <h3 style={S.h3}>Three-Tier Enterprise Application on GCP</h3>
          <ul style={S.ul}>
            <li><strong>DNS + Edge:</strong> Cloud DNS → External Global HTTPS Load Balancer (anycast) → Cloud Armor (WAF + DDoS) → Cloud CDN</li>
            <li><strong>Web tier:</strong> Backend service → Regional MIG (web VMs, asia-south1, 3 zones, autoscaling). Firewall rule: tag <code>web-server</code> → allow 443 from LB health check ranges.</li>
            <li><strong>App tier:</strong> Internal HTTPS LB → Regional MIG (app VMs, private subnet). Firewall: allow 8080 from web tier SA only.</li>
            <li><strong>Data tier:</strong> Cloud SQL PostgreSQL (HA, private IP via Private Service Access) + Memorystore Redis (cache)</li>
            <li><strong>Security:</strong> Service Accounts per tier, VPC Service Controls perimeter, Cloud KMS CMEK for SQL, Secret Manager for credentials</li>
            <li><strong>Monitoring:</strong> Ops Agent on VMs → Cloud Monitoring + Cloud Logging. Uptime checks on LB. Alerting policies → PagerDuty.</li>
            <li><strong>IaC:</strong> Terraform modules, Cloud Build CI/CD pipeline</li>
          </ul>
        </section>

        <section id="hybrid-gcp">
          <h3 style={S.h3}>Hybrid DC to GCP</h3>
          <ul style={S.ul}>
            <li>Dedicated Interconnect (primary, 10Gbps) + HA VPN (backup) → Cloud Router (BGP) → VPC</li>
            <li>Shared VPC: centralized networking project → multiple service projects use its subnets</li>
            <li>Cloud DNS private zones: hybrid DNS — on-prem resolver pe GCP zones forward karo</li>
            <li>Private Service Connect: on-prem se GCP APIs (googleapis.com) → private IP access</li>
            <li>Cloud Identity: on-prem AD → Cloud Identity (GCDS sync) → GCP IAM</li>
            <li>Anthos / GKE Enterprise: on-prem K8s clusters aur GKE centrally manage karo</li>
            <li>Cloud Storage Transfer Service: on-prem data → GCS migrate karo (initial + incremental)</li>
          </ul>
        </section>
      </section>

      {/* ─── BEST PRACTICES ───────────────────────────────────────────────── */}
      <section id="best-practices">
        <h2 style={S.h2}>Best Practices</h2>
        <ComparisonTable
          headers={["Area", "Best Practice", "Why"]}
          rows={[
            ["Resource naming", "consistent: env-region-type-name (e.g., prod-as1-vm-web01)", "Identify resources instantly"],
            ["Labels", "environment, team, application, cost-center mandatory + Org Policy enforce", "Cost attribution, automation"],
            ["IAM", "Predefined/Custom roles only (no Basic). Group-based assignment.", "Least privilege"],
            ["Service Accounts", "One SA per workload. Attached SA or Workload Identity — no key files.", "Security + auditability"],
            ["VPC design", "Shared VPC for org, non-overlapping CIDRs globally planned upfront", "Scalability, no future conflict"],
            ["Firewall rules", "Tag-based, deny-by-default explicitly. Remove default rules.", "Principle of least privilege"],
            ["Private IPs", "Cloud SQL, Memorystore, all PaaS via Private Service Access — no public IPs", "Reduce attack surface"],
            ["MIGs", "Regional MIGs (not zonal) for production. Autohealing always.", "Zone failure survive"],
            ["GCS versioning", "Enable on critical buckets + lifecycle policy for cost control", "Accidental delete protection + cost"],
            ["Audit logs", "Admin Activity always on. Data Access enable for sensitive services.", "Compliance, forensics"],
            ["CUDs", "Analyze 3-month usage → purchase CUDs for predictable baseline", "30–70% savings"],
            ["Terraform", "Remote state in GCS + versioning. Modules for reuse. CI/CD pipeline.", "Reproducible, auditable infra"],
          ]}
        />
      </section>

      {/* ─── COMMON MISTAKES ──────────────────────────────────────────────── */}
      <section id="common-mistakes">
        <h2 style={S.h2}>Common Engineering Mistakes</h2>
        <ComparisonTable
          headers={["Mistake", "Problem", "Correct Approach"]}
          rows={[
            ["VM stopped but not deleted", "Disk billing continues", "Delete unused VMs completely OR snapshot + delete disk"],
            ["SA key files in code/config", "Secret exposure in git, logs", "Attached SA, Workload Identity, or Secret Manager"],
            ["Basic roles (Owner/Editor) in prod", "Excessive permissions, audit nightmare", "Predefined or Custom roles, least privilege"],
            ["Single-zone MIG", "Zone failure = downtime", "Regional MIG across 3 zones always"],
            ["Public IP on Cloud SQL", "Direct Internet exposure", "Private IP via Private Service Access, Cloud SQL Auth Proxy"],
            ["Overlapping VPC CIDRs across projects", "VPC Peering / Shared VPC impossible", "Plan CIDR space globally upfront"],
            ["No Firewall rules (allow all)", "Open attack surface", "Deny all default, allow specific ports/tags"],
            ["Ignoring SUDs", "Missing automatic discounts", "SUDs are automatic — but understand them for CUD planning"],
            ["Not setting budget alerts", "Bill shock", "Budget alerts at 50%, 90%, 100% from day 1"],
            ["No label strategy", "Cost attribution impossible", "Mandatory labels enforced via Org Policy"],
            ["Cloud Storage buckets public", "Data exposed", "allUsers / allAuthenticatedUsers = never in production"],
            ["Ignoring network egress costs", "Unexpected high bills", "Inter-region egress costly — keep traffic within region where possible"],
          ]}
        />
      </section>

      {/* ─── TROUBLESHOOTING ──────────────────────────────────────────────── */}
      <section id="troubleshooting">
        <h2 style={S.h2}>Troubleshooting</h2>
        <p style={S.p}>GCP troubleshooting systematic approach: connectivity → firewall → IAM → app → monitoring data.</p>
        <ol style={{ ...S.ul, listStyleType: "decimal" }}>
          <li><strong>DNS resolution?</strong> <code>nslookup / dig</code> from VM — Cloud DNS resolver, private zone config check karo</li>
          <li><strong>VM reachable?</strong> VM running status check: <code>gcloud compute instances describe</code>. SSH via IAP (no public IP needed): <code>gcloud compute ssh VM_NAME --tunnel-through-iap</code></li>
          <li><strong>Firewall blocking?</strong> Connectivity Tests tool (Network Intelligence Center) — source to destination simulate karo. Firewall Rules Logging enable karo → Cloud Logging mein check karo</li>
          <li><strong>Route issue?</strong> <code>gcloud compute routes list</code>. Connectivity Tests tool next-hop verify karta hai.</li>
          <li><strong>IAM denied?</strong> Policy Troubleshooter (console ya <code>gcloud policy-troubleshoot iam RESOURCE --principal EMAIL --permission PERMISSION</code>)</li>
          <li><strong>Cloud SQL unreachable?</strong> Private IP → Private Service Access peering check. Cloud SQL Auth Proxy running? Authorized networks (if public IP) check.</li>
          <li><strong>GKE pod issue?</strong> <code>kubectl describe pod</code>, <code>kubectl logs</code>, Events check. Workload Identity federation — SA permissions?</li>
          <li><strong>Cloud Storage access denied?</strong> IAM permissions on bucket (roles/storage.objectViewer), bucket ACLs, VPC Service Controls perimeter check.</li>
          <li><strong>High latency?</strong> Network Intelligence Center — topology, latency hops. Premium vs Standard Tier check. Inter-region traffic?</li>
          <li><strong>Cost spike?</strong> Cloud Billing → Cost Table → filter by Project/Service/Label. Unexpected resources (VMs left running, large storage).</li>
          <li><strong>Interconnect/VPN down?</strong> Cloud Router BGP session status. HA VPN tunnel status. Partner Interconnect → provider status.</li>
        </ol>
        <Callout type="important" title="Network Intelligence Center — GCP ka Troubleshooting Platform">
          Network Intelligence Center tools: Connectivity Tests (end-to-end path simulation), Network Topology (live traffic visualization), Firewall Insights (unused rules, shadow rules), Performance Dashboard (packet loss, latency). Troubleshooting shuru karo Connectivity Tests se — yeh simulate karta hai bina actual traffic ke.
        </Callout>
      </section>

      {/* ─── FAILURE SCENARIOS ────────────────────────────────────────────── */}
      <section id="failure-scenarios">
        <h2 style={S.h2}>Practical Failure Scenarios</h2>
        <ComparisonTable
          headers={["Scenario", "Symptom", "Layer", "Diagnose / Fix"]}
          rows={[
            ["VM unreachable (SSH/app)", "Connection timeout", "Firewall / network", "Connectivity Tests, Firewall logs, VM status"],
            ["Firewall rule missing", "Traffic blocked unexpectedly", "Security", "Firewall Rules Logging, Connectivity Tests"],
            ["SA permissions insufficient", "403 API calls from app", "IAM", "Policy Troubleshooter, Cloud Audit Logs"],
            ["Workload Identity misconfigured", "GKE pod cannot call GCP API", "IAM / K8s", "kubectl describe pod, SA annotation, IAM binding"],
            ["Cloud SQL private IP unreachable", "DB connection refused", "Networking", "Private Service Access peering, Cloud SQL Auth Proxy"],
            ["GCS bucket access denied", "403 from app", "IAM / VPC SC", "IAM roles, VPC Service Controls perimeter"],
            ["MIG autoscaling not working", "VMs not scaling under load", "Compute", "Autoscaling policy, health check, quota limits"],
            ["Cloud Run cold start latency", "First request slow (seconds)", "Serverless", "Min instances = 1+, check CPU allocation"],
            ["Interconnect BGP session down", "Hybrid connectivity lost", "Networking", "Cloud Router BGP status, VPN backup path"],
            ["Cloud Monitoring alert not firing", "Issue not detected", "Observability", "Alert policy condition, notification channel, metric latency"],
            ["GKE nodes not joining cluster", "Pods pending, insufficient resources", "Compute / K8s", "Node status, quotas, firewall rules for node-to-master"],
            ["Spot VM eviction", "Batch job interrupted", "Compute", "30-sec notice — checkpoint logic, MIG will recreate"],
          ]}
        />
      </section>

      {/* ─── CERTIFICATIONS ───────────────────────────────────────────────── */}
      <section id="certifications">
        <h2 style={S.h2}>GCP Certifications and Career</h2>
        <ComparisonTable
          headers={["Certification", "Level", "Focus", "Who Should Take"]}
          rows={[
            ["Cloud Digital Leader", "Foundational", "Business/cloud concepts overview", "Non-technical stakeholders, managers"],
            ["Associate Cloud Engineer (ACE)", "Associate", "Deploy/monitor/manage GCP solutions", "Engineers starting GCP journey — first target"],
            ["Professional Cloud Architect (PCA)", "Professional", "Design, plan, manage GCP solutions", "Senior engineers, solution architects"],
            ["Professional Cloud Network Engineer", "Professional", "GCP networking deep dive", "Network engineers specializing in GCP"],
            ["Professional Cloud Security Engineer", "Professional", "GCP security design and management", "Security engineers"],
            ["Professional Data Engineer", "Professional", "Data pipelines, BigQuery, ML", "Data engineers, analytics"],
            ["Professional Cloud DevOps Engineer", "Professional", "SRE, CI/CD, GKE, monitoring", "DevOps / SRE engineers"],
          ]}
        />
        <p style={S.p}>
          Data Center engineer ke liye recommended path: Associate Cloud Engineer (ACE) → Professional Cloud Architect (PCA) → Professional Cloud Network Engineer (networking-focused). ACE practical skills test karta hai — hands-on labs mandatory practice karo (Cloud Skills Boost / Qwiklabs).
        </p>
        <p style={S.p}>
          Career opportunities: GCP Cloud Engineer, Cloud Architect, GKE/Platform Engineer, Data Engineer (BigQuery), ML Engineer (Vertex AI). India mein GCP demand AWS se kam hai overall — lekin analytics, AI/ML aur e-commerce companies strong GCP adoption kar rahi hain. Multi-cloud skills (AWS + GCP ya Azure + GCP) highest value dete hain market mein.
        </p>
      </section>

      {/* ─── KEY TAKEAWAYS ────────────────────────────────────────────────── */}
      <section id="key-takeaways">
        <h2 style={S.h2}>Key Takeaways</h2>
        <ul style={S.ul}>
          <li><strong>Global VPC:</strong> GCP ka #1 differentiator — single VPC all Regions, subnets regional, no per-Region VPC needed</li>
          <li><strong>No Region Pairs:</strong> AWS/Azure jaisa Microsoft-defined pairing nahi — DR Region tum design karo</li>
          <li><strong>Firewall Rules:</strong> VPC-level, network tag/SA-based targeting (not subnet-level like AWS NACLs)</li>
          <li><strong>Resource Hierarchy:</strong> Org → Folder → Project → Resource. IAM inheritance top-down only.</li>
          <li><strong>Service Accounts:</strong> Workload identity — attached SA ya Workload Identity Federation. JSON key files avoid karo.</li>
          <li><strong>SUDs:</strong> Automatic discounts — no action required. AWS/Azure mein equivalent nahi.</li>
          <li><strong>Spot VMs:</strong> 30-second notice (AWS = 2-minute). Application ko graceful shutdown 30 seconds mein handle karna chahiye.</li>
          <li><strong>Cloud Spanner:</strong> Globally distributed SQL — no AWS/Azure direct equivalent. Use when global consistency + horizontal scale needed.</li>
          <li><strong>Network Tiers:</strong> Premium (Google backbone) vs Standard (Internet) — unique GCP concept.</li>
          <li><strong>Interconnect:</strong> NOT encrypted by default — MACsec/IPsec explicitly configure karo.</li>
          <li><strong>Operations Suite:</strong> Cloud Monitoring + Logging + Trace + Profiler + Audit Logs — complete observability stack.</li>
          <li><strong>GKE Autopilot:</strong> Prod mein recommended for most teams — Google nodes manage karta hai, per-pod billing.</li>
          <li><strong>Troubleshoot:</strong> Connectivity Tests (Network Intelligence Center) pehle — firewall, route, IAM issues diagnose karo.</li>
          <li><strong>Cost:</strong> SUDs automatic. CUDs for baseline. Labels mandatory. Budget alerts from day 1.</li>
          <li><strong>IaC:</strong> Terraform (google provider) preferred. State in GCS. CI/CD via Cloud Build.</li>
        </ul>
      </section>

      {/* ─── FAQ ──────────────────────────────────────────────────────────── */}
      <section id="faq" style={{ marginTop: "3rem" }}>
        <h2 style={S.h2}>Frequently Asked Questions</h2>
        {gcpContent.faq.map((item, i) => (
          <div key={i} style={{ marginBottom: "2rem" }}>
            <h3 style={{ ...S.h3, color: "#111827" }}>{item.question}</h3>
            <p style={S.p}>{item.answer}</p>
          </div>
        ))}
      </section>

    </article>
  );
}
