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
          Google Cloud Platform (GCP) is the world's third-largest public cloud — but it is genuinely unique in some areas: Global VPC (a single VPC that spans the entire world), Cloud Spanner (the world's first globally distributed SQL database), Network Tiers (Google's private backbone vs the Internet), and Sustained Use Discounts (automatic, no commitment). For a Data Center engineer, understanding GCP means mapping AWS/Azure concepts to GCP terminology, and understanding GCP's genuinely different architectural choices.
        </p>
        <p style={S.p}>
          GCP's DNA comes from Google's own infrastructure — BigQuery, Kubernetes (built by Google, managed on GKE), TensorFlow, and a global fiber network. This article is a practical reference for the DC engineer — from Global VPC to hybrid connectivity, from IAM to troubleshooting.
        </p>
        <Callout type="important" title="Coming from AWS/Azure? Read the Key Differences First">
          GCP VPC = Global (AWS/Azure VPC = per Region). GCP Firewall Rules = VPC level, via network tags (AWS: Security Groups on NIC, NACLs on subnet). GCP has no Region Pairs (as Azure does) — you choose the DR Region. In GCP, Sustained Use Discounts are automatic — not in AWS/Azure. GCP Spot VMs = 30-second notice (AWS Spot = 2-minute notice). These differences directly impact architecture decisions.
        </Callout>
      </section>

      {/* ─── WHAT IS GCP ──────────────────────────────────────────────────── */}
      <section id="what-is-gcp">
        <h2 style={S.h2}>What Is Google Cloud Platform?</h2>
        <p style={S.p}>
          GCP is Google's public cloud platform — compute, storage, networking, databases, AI/ML, analytics — available globally. What makes GCP practically interesting: it runs on Google's own infrastructure — the same infrastructure on which Search, YouTube, Gmail and Maps operate. This is not marketing — it has a direct impact on network performance, global load balancing and Kubernetes maturity.
        </p>
        <p style={S.p}>
          GCP's strongest hand: globally distributed fiber (Premium Tier), BigQuery for analytics at scale, and services like Cloud Spanner that AWS or Azure do not directly have. For AI/ML, TPUs and Vertex AI also differentiate it. If your workload is Kubernetes-heavy or analytics-first, GCP is a natural fit.
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
            GCP started in 2008 with App Engine — Google's PaaS offering. Compute Engine launched in 2012 (IaaS). Google released Kubernetes as open source in 2014, and it became the foundation of cloud-native computing. In 2015 Google formally rebranded the platform as "Google Cloud Platform" and made an enterprise push.
          </p>
          <p style={S.p}>
            GCP exists because Google had one of the world's best distributed computing infrastructures — and the natural path to monetize it was external cloud services. Google's DNA is in search, analytics and large-scale distributed systems — and this clearly shows in GCP's strengths (BigQuery, Spanner, global network, AI/ML).
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
            GCP physical data center security = Google's responsibility. Your Compute Engine VM's OS was not patched = your responsibility. Cloud SQL authorized networks configured wrongly = your responsibility. Understand the boundary clearly for every service.
          </Callout>
        </section>
      </section>

      {/* ─── GLOBAL INFRASTRUCTURE ────────────────────────────────────────── */}
      <section id="global-infrastructure">
        <h2 style={S.h2}>GCP Global Infrastructure</h2>

        <section id="regions-zones">
          <h3 style={S.h3}>Regions and Zones</h3>
          <p style={S.p}>
            GCP operates in 40+ Regions globally (continuously expanding). Each Region is a specific geographic location — asia-south1 (Mumbai), us-central1 (Iowa), europe-west1 (Belgium) etc. Each Region typically has 3 Zones — named a, b, c (some Regions have more or different naming).
          </p>
          <p style={S.p}>
            A Zone is an isolated deployment area within a Region — a physically separate building with independent power, cooling, and networking. One Zone failure does not affect the other Zones. Always use multiple Zones for production workloads.
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
            In Azure, Region Pairs are Microsoft-defined — East US ↔ West US. GCP has no such concept. The engineer selects the DR Region themselves based on requirements: data residency, latency, available services, regulatory compliance.
          </p>
          <p style={S.p}>
            GCP Multi-region locations exist for Cloud Storage (US, EU, ASIA) — but this is separate from compute DR. For Compute Engine DR: store snapshots/images in a second Region, maintain MIG templates in the second Region, configure Cloud SQL cross-region replicas.
          </p>
          <Callout type="important" title="In GCP, DR = the Engineer's Design">
            In AWS and Azure too, the engineer designs DR — but in Azure, Region Pairs are pre-defined for platform updates and GRS storage replication. GCP has no such concept. GCP DR architecture must be completely engineer-designed. This gives more flexibility but also more responsibility.
          </Callout>
        </section>

        <section id="edge-network">
          <h3 style={S.h3}>Edge Network and Network Tiers</h3>
          <p style={S.p}>
            GCP Network Service Tiers are a unique concept — not present in AWS or Azure:
          </p>
          <ul style={S.ul}>
            <li><strong>Premium Tier (default):</strong> Traffic enters the Google backbone at the nearest PoP — lowest latency, highest reliability. For user-facing applications.</li>
            <li><strong>Standard Tier:</strong> Traffic travels over the public Internet — behavior similar to the AWS/Azure default. Lower cost, variable latency.</li>
          </ul>
          <p style={S.p}>
            Cloud CDN: CDN integrated with Cloud Load Balancing. Media CDN: high-scale video/media delivery. Cloud Armor: DDoS protection and WAF at the edge. Cloud Interconnect PoPs: Google's colocation facilities globally where dedicated circuits terminate.
          </p>
        </section>

        <section id="region-selection">
          <h3 style={S.h3}>Region Selection Strategy</h3>
          <ul style={S.ul}>
            <li><strong>Data residency/compliance:</strong> Indian IT Act, EU GDPR, financial data localization — primary driver</li>
            <li><strong>User proximity:</strong> Asia-South1 (Mumbai) for users in India, asia-southeast1 (Singapore) for SE Asia</li>
            <li><strong>Service availability:</strong> Not all services in all Regions — verify before committing</li>
            <li><strong>Zone availability:</strong> Production → 3-zone Region. Some Regions have fewer zones.</li>
            <li><strong>Pricing:</strong> Same service different cost in different Regions (e.g., us-central1 typically cheapest)</li>
            <li><strong>DR Region:</strong> Choose pair that satisfies data residency + distance + available services</li>
          </ul>
        </section>

        <Figure caption="GCP Global Infrastructure: Regions, Zones, Global VPC and edge network — key differences from AWS/Azure">
          <GcpGlobalDiagram />
        </Figure>
      </section>

      {/* ─── RESOURCE HIERARCHY ───────────────────────────────────────────── */}
      <section id="resource-hierarchy">
        <h2 style={S.h2}>GCP Resource Hierarchy</h2>

        <section id="org-folders-projects">
          <h3 style={S.h3}>Organization, Folders and Projects</h3>
          <p style={S.p}>
            GCP Resource Hierarchy: <strong>Organization → Folders → Projects → Resources</strong>. This structure is the backbone of IAM inheritance and policy enforcement.
          </p>
          <ul style={S.ul}>
            <li><strong>Organization:</strong> Root node — tied to a Google Workspace or Cloud Identity domain. Assign IAM policies here → all resources inherit them. AWS Organizations equivalent.</li>
            <li><strong>Folders:</strong> Logical grouping of Projects — organize by department or environment (Production, Development, Shared Services). Nested folders possible (up to 10 levels). IAM/Policy at Folder level → all Projects inside inherit.</li>
            <li><strong>Projects:</strong> GCP's fundamental unit — billing, resource management, API enablement. Every resource belongs to exactly one Project. Resources can be in different Regions within the same Project. AWS Account equivalent. Project ID is globally unique, immutable after creation.</li>
            <li><strong>Resources:</strong> Actual services — VMs, buckets, Cloud SQL instances etc. IAM at resource level is also possible — the narrowest scope.</li>
          </ul>
          <Callout type="important" title="IAM Inheritance — Top-Down Only">
            IAM bindings are inherited from parent to child. Assign a role at the Organization → it is inherited in the Folder, the Project, and all resources. You cannot REMOVE an inherited role at the child — you can only ADD. This is an important difference from AWS/Azure — in AWS, deny policies are effective at any level. In GCP, IAM Deny Policies (a newer feature) provide similar capability.
          </Callout>
        </section>

        <section id="billing-accounts">
          <h3 style={S.h3}>Billing Accounts</h3>
          <p style={S.p}>
            The Billing Account collects charges for GCP resources — it can be linked to one or multiple Projects. The Billing Account is managed separately from the Organization — a Project is linked directly to a Billing Account, not to the Organization.
          </p>
          <ul style={S.ul}>
            <li>Budget alerts: at Billing Account level or Project level — notification at spend thresholds</li>
            <li>Cost export: Cloud Billing data → BigQuery export → custom dashboards and analysis</li>
            <li>Committed Use Discounts: applied at the Billing Account level</li>
            <li>Multiple Billing Accounts: for separate business units, departments, client billing</li>
          </ul>
        </section>

        <section id="labels-tags">
          <h3 style={S.h3}>Labels, Tags and Org Policies</h3>
          <p style={S.p}>
            <strong>Labels:</strong> User-defined key-value pairs on resources — cost allocation, filtering, automation. Example: <code>{"environment=prod"}</code>, <code>{"team=networking"}</code>. AWS Tags equivalent.
          </p>
          <p style={S.p}>
            <strong>Tags (Network Tags):</strong> Strings on Compute Engine VMs — used as targets in Firewall Rules. Example: tag <code>web-server</code> on a VM → Firewall Rule allows 443 on VMs with the target tag <code>web-server</code>.
          </p>
          <p style={S.p}>
            <strong>Org Policies:</strong> Resource configuration constraints — separate from IAM permissions. Example: restrict which Regions resources can be created in, disable external IPs on VMs, require OS Login. AWS SCPs equivalent.
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
            In Cloud IAM, access is defined by the combination of WHO (principal) + WHAT (role/permissions) + WHERE (resource). Principal = the identity that makes the request.
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
            Role = a set of permissions. A role is assigned to a principal in the context of a resource. Three categories:
          </p>
          <ul style={S.ul}>
            <li><strong>Basic Roles (primitive):</strong> Owner, Editor, Viewer. Broad access at Project level. Avoid in production — they violate least privilege.</li>
            <li><strong>Predefined Roles:</strong> Google-managed, service-specific — <code>roles/compute.instanceAdmin</code>, <code>roles/storage.objectViewer</code>, <code>roles/container.developer</code> etc. 500+ predefined roles available.</li>
            <li><strong>Custom Roles:</strong> Define the exact permission set for your use case. Can be created at Project or Organization level. Maintenance is your responsibility — Google updates predefined roles automatically.</li>
          </ul>
          <p style={S.p}>
            IAM policy evaluation: Allow bindings are checked. IAM Deny Policies (newer feature): explicitly deny specific principals specific permissions — Deny policies override Allow bindings, meaning Deny wins even if an Allow binding exists. Policy Troubleshooter: a console/CLI tool that tells you why access was granted or denied — essential in production debugging.
          </p>
        </section>

        <section id="service-accounts">
          <h3 style={S.h3}>Service Accounts and Workload Identity</h3>
          <p style={S.p}>
            A Service Account is GCP's workload identity mechanism — for machines and applications, not for humans. Attach a Service Account to a Compute Engine VM → the VM can automatically call GCP APIs with that SA's permissions.
          </p>
          <ul style={S.ul}>
            <li><strong>Service Account key files:</strong> JSON private key — avoid wherever possible. Key file compromise = full SA access. Rotation manual, leak risk high.</li>
            <li><strong>Attached SA (Compute Engine):</strong> Attach an SA to the VM → automatic token from instance metadata. No key file. AWS IAM Instance Profile equivalent.</li>
            <li><strong>Workload Identity (GKE):</strong> K8s Service Account → GCP Service Account mapping. GKE pods automatically assume the GCP SA identity without any JSON key — token exchange happens transparently via the metadata server. Direct equivalent of AWS EKS IRSA (IAM Roles for Service Accounts). Note: "Workload Identity Federation" is a separate feature — for external identity providers (GitHub Actions, AWS, Azure), not GKE-specific.</li>
            <li><strong>SA impersonation:</strong> A user or SA can impersonate another SA — delegated access pattern.</li>
          </ul>
          <Callout type="best-practice" title="Service Account Keys — Last Resort Only">
            Always avoid SA key files — use a Compute Engine attached SA or Workload Identity Federation. If you must use a key file: 90-day rotation policy, store in Secret Manager, never in code/git, audit regularly via Cloud Audit Logs.
          </Callout>
        </section>

        <section id="iam-best-practices">
          <h3 style={S.h3}>IAM Best Practices</h3>
          <ul style={S.ul}>
            <li>Least privilege: only the required permissions. No Basic roles (Owner/Editor) in production.</li>
            <li>Group-based access: add users to groups, assign roles to groups — not individual users</li>
            <li>Service accounts: one SA per application/service — avoid shared SAs</li>
            <li>SA key rotation: prefer automated key rotation or Workload Identity Federation</li>
            <li>Org Policy: restrict resource creation to specific Regions, disable SA key creation where possible</li>
            <li>Audit: Cloud Audit Logs (Admin Activity always on) — regular IAM policy review</li>
            <li>IAM Recommender: Google's ML-based tool — identify and remove unused permissions</li>
          </ul>
        </section>

        <Figure caption="GCP Cloud IAM: Who (Principal) + What (Role) + Where (Resource), Service Accounts and Workload Identity">
          <GcpIamDiagram />
        </Figure>
      </section>

      {/* ─── NETWORKING ───────────────────────────────────────────────────── */}
      <section id="networking">
        <h2 style={S.h2}>GCP Networking — Global VPC</h2>

        <section id="global-vpc">
          <h3 style={S.h3}>Global VPC Architecture</h3>
          <p style={S.p}>
            The most important architectural difference of GCP VPC: <strong>VPC is GLOBAL</strong>. A single VPC spans multiple Regions automatically. In AWS, a VPC is Region-specific — multi-region connectivity requires VPC Peering or Transit Gateway. In Azure, a VNet is Region-specific. In GCP, create one VPC → Mumbai, Iowa, Belgium are all one network.
          </p>
          <p style={S.p}>
            Internal traffic from one Region to another within the same VPC is routed over the Google backbone automatically — no extra configuration. Mumbai VM → Iowa VM, same VPC — direct internal IP, no IGW needed.
          </p>
          <Callout type="important" title="Global VPC ≠ Global Free-for-All">
            The VPC is global but subnets are regional. You control which subnets are in which Regions. Firewall Rules are also VPC-wide — but targeted by network tags or SA. Apply a specific tag to any VM → specific firewall rules apply. No per-subnet security groups like AWS.
          </Callout>
        </section>

        <section id="subnets">
          <h3 style={S.h3}>Regional Subnets</h3>
          <p style={S.p}>
            A subnet is a Regional resource — you select a Region, but it spans all Zones of that Region. Example: create a subnet in asia-south1 → VMs on asia-south1-a, asia-south1-b, asia-south1-c can all take IPs from that subnet.
          </p>
          <p style={S.p}>
            In AWS a subnet is AZ-specific — one subnet = one AZ. In GCP, subnet = one Region (multiple AZs). This simplifies HA design — deploy VMs across multiple zones in one subnet.
          </p>
          <ul style={S.ul}>
            <li>Private Google Access: enable on the subnet → VMs can access Google APIs (googleapis.com) without a public IP</li>
            <li>Subnet secondary ranges: for alias IPs — commonly used for GKE pods</li>
            <li>Subnet expansion: the CIDR range can be expanded (not shrunk)</li>
          </ul>
        </section>

        <section id="firewall-rules">
          <h3 style={S.h3}>Firewall Rules</h3>
          <p style={S.p}>
            GCP Firewall Rules apply at the VPC level — not at the subnet level. This is different from AWS Security Groups (NIC-level) or NACLs (subnet-level). Rule targeting: source/destination by IP ranges, network tags, or Service Account identity.
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
            Network tags best practice: tag-based rules are far better than IP management. Add the tag <code>web-server</code> to a VM → the firewall rule applies automatically. When an IP changes, the rules do not need to be updated.
          </p>
        </section>

        <section id="routes">
          <h3 style={S.h3}>Routes and Cloud Router</h3>
          <p style={S.p}>
            A GCP VPC automatically has system-generated routes — traffic within the VPC, a default route for the Internet. You can add custom static routes — define specific next-hops (VM, VPN tunnel, etc.).
          </p>
          <p style={S.p}>
            <strong>Cloud Router:</strong> BGP-based dynamic routing — use with Cloud VPN or Cloud Interconnect. On-prem routes are automatically advertised into the VPC, and VPC routes to on-prem. Function equivalent to a traditional DC core router (routing protocol peering) — but it is a managed service.
          </p>
        </section>

        <section id="cloud-nat">
          <h3 style={S.h3}>Cloud NAT</h3>
          <p style={S.p}>
            Cloud NAT gives VMs with private IPs outbound Internet connectivity — without a public IP on the VM. Managed service — there is no NAT gateway VM to manage. AWS NAT Gateway equivalent.
          </p>
          <ul style={S.ul}>
            <li>Subnet-level configuration — enable NAT for specific subnets</li>
            <li>Manual NAT IP allocation or auto allocation</li>
            <li>Port allocation: per-VM port count configurable (affects max concurrent connections)</li>
            <li>Cloud NAT logs: connection logs in Cloud Logging — audit and troubleshoot outbound traffic</li>
          </ul>
        </section>

        <section id="vpc-peering-shared">
          <h3 style={S.h3}>VPC Peering and Shared VPC</h3>
          <p style={S.p}>
            <strong>VPC Peering:</strong> Connect two VPCs directly — same or different Projects, same or different Organizations. Non-transitive: A↔B, B↔C but not A↔C (unless you use Network Connectivity Center). Internal IP routing, no external traffic. AWS VPC Peering equivalent.
          </p>
          <p style={S.p}>
            <strong>Shared VPC:</strong> Share one Host Project's VPC with multiple Service Projects. Service Projects' resources (VMs etc.) are deployed in the Host Project's subnets. Centralized networking management — separate billing per project. Similar to the concepts of AWS Resource Access Manager (RAM) + Transit Gateway, but a simpler architecture.
          </p>
        </section>

        <section id="private-service-access">
          <h3 style={S.h3}>Private Service Access and Private Service Connect</h3>
          <p style={S.p}>
            <strong>Private Service Access:</strong> For managed services (Cloud SQL, Cloud Filestore, AlloyDB) — allocate a dedicated IP range in the VPC → the service becomes privately accessible from the Google-managed network. Cloud SQL's Private IP mode uses exactly this.
          </p>
          <p style={S.p}>
            <strong>Private Service Connect (PSC):</strong> Access Google managed services or third-party services through a private IP endpoint in the VPC — traffic never goes over the Internet. It is different from Private Service Access: PSC creates a specific endpoint object (IP address), while Private Service Access is based on VPC peering.
          </p>
          <p style={S.p}>
            Practical example: in a production environment, <code>storage.googleapis.com</code> must not be accessed over the public Internet. Create a PSC endpoint → VMs call GCS through an internal IP — no NAT, no Internet path. In BFSI and healthcare compliance, this pattern becomes mandatory.
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
          GCP Cloud Load Balancing is globally distributed — a single anycast IP, traffic is automatically routed to the nearest PoP. Traditional <TopicLink slug="load-balancer" variant="inline" /> concepts apply, but the implementation is globally distributed.
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
            The GCP LB differentiator: a global anycast LB with a single IP globally — traffic enters at the nearest Google PoP, then travels over the Google backbone to the backend. AWS ALB is regional, and Global Accelerator is a separate service. In GCP, the globally distributed LB is one product.
          </p>
        </section>

        <section id="cloud-armor">
          <h3 style={S.h3}>Cloud Armor and CDN</h3>
          <p style={S.p}>
            <strong>Cloud Armor:</strong> DDoS protection and WAF — directly integrated with the External HTTPS Load Balancer. OWASP Top 10 preconfigured rule sets, custom CEL-based rules, adaptive protection (ML-based DDoS mitigation), rate limiting per IP/region, bot management. Real example: an e-commerce site was hit by a volumetric DDoS attack on Black Friday — Cloud Armor Adaptive Protection automatically identified the traffic pattern and blocked the attack IPs, without manual intervention.
          </p>
          <p style={S.p}>
            <strong>Cloud CDN:</strong> CDN integrated with the External HTTPS LB — caches static content at Google edge PoPs. Origin-pull model. Cache invalidation via API. AWS CloudFront equivalent — but tightly integrated with the GCP LB, not a separate service.
          </p>
          <Callout type="warning" title="Cloud Interconnect Encryption">
            Cloud Interconnect (Dedicated or Partner) is NOT encrypted by default — the same caveat as AWS Direct Connect and Azure ExpressRoute. MACsec can be added on Dedicated Interconnect with additional configuration. For compliance requirements, explicitly plan an encryption layer.
          </Callout>
        </section>
      </section>

      {/* ─── HYBRID CONNECTIVITY ──────────────────────────────────────────── */}
      <section id="hybrid-connectivity">
        <h2 style={S.h2}>Hybrid Connectivity</h2>

        <section id="cloud-vpn">
          <h3 style={S.h3}>Cloud VPN (HA VPN)</h3>
          <p style={S.p}>
            Cloud VPN connects the on-prem network to the GCP VPC through an IPsec tunnel over the Internet. HA VPN recommended: 2 interfaces, 4 tunnels → 99.99% SLA.
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
            HA VPN + Cloud Router: BGP dynamic routing — on-prem routes are advertised/learned automatically. The BGP concepts of a traditional DC <TopicLink slug="router" variant="inline" /> apply.
          </p>
        </section>

        <section id="cloud-interconnect">
          <h3 style={S.h3}>Cloud Interconnect</h3>
          <p style={S.p}>
            Cloud Interconnect connects on-prem to GCP through a private dedicated circuit — not over the Internet. In a colocation facility, the Google network connects directly.
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
            Network Connectivity Center (NCC) is GCP's hub-and-spoke WAN fabric. Multiple on-prem sites, branch offices and VPCs connect through a central hub — no need to build a point-to-point mesh. GCP equivalent of AWS Transit Gateway.
          </p>
          <p style={S.p}>
            Spokes are of three types: HA VPN tunnels, Dedicated/Partner Interconnect attachments, and Router appliances (third-party <TopicLink slug="sd-wan" variant="inline" /> devices that peer with Cloud Router). Practical use case: a company's Mumbai HQ, Bangalore branch and GCP VPC — connect all three to the NCC hub, and they all become reachable from each other without per-site peering.
          </p>
        </section>

        <Figure caption="GCP Hybrid Connectivity: HA VPN, Dedicated Interconnect, Partner Interconnect and Network Tiers comparison">
          <GcpHybridDiagram />
        </Figure>
      </section>

      {/* ─── COMPUTE ──────────────────────────────────────────────────────── */}
      <section id="compute">
        <h2 style={S.h2}>Compute Services</h2>

        <section id="compute-engine">
          <h3 style={S.h3}>Compute Engine (VMs)</h3>
          <p style={S.p}>
            Compute Engine is GCP's IaaS virtual compute service — KVM-based VMs. VM = machine type + boot disk (Persistent Disk) + NICs (IPs from the VPC subnet). Public IP optional — internal IP mandatory (assigned from the VPC subnet).
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
            Live Migration: during GCP host maintenance, VMs are automatically migrated to another host — no downtime. No AWS/Azure equivalent — a GCP advantage for certain workloads.
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
          <Callout type="important" title="SUDs — GCP's Unique Advantage">
            Sustained Use Discounts are not available in AWS or Azure. GCP automatically gives a discount the longer a resource runs in a month. Run 100% of the month = ~30% discount — no action needed. In AWS, On-Demand pricing for a full month = full cost. Combine with CUDs for maximum savings on predictable baseline workloads.
          </Callout>
        </section>

        <section id="gke">
          <h3 style={S.h3}>Google Kubernetes Engine (GKE)</h3>
          <p style={S.p}>
            GKE is Google's managed Kubernetes service — Google built Kubernetes, and GKE is its most mature managed implementation. Google manages the control plane (API server, etcd, scheduler).
          </p>
          <ul style={S.ul}>
            <li><strong>GKE Standard:</strong> You manage node pools — machine type, count, OS, auto-upgrade settings. Full flexibility.</li>
            <li><strong>GKE Autopilot:</strong> Google manages the nodes — you only deploy pods. Billing per pod (requested CPU/memory). Recommended in prod for most teams — less operational overhead.</li>
            <li><strong>Cluster types:</strong> Zonal (single master zone, dev/test), Regional (3 control plane zones, 99.95% SLA — use for prod)</li>
            <li><strong>Workload Identity:</strong> Map K8s Service Account → GCP Service Account — pods access GCP APIs without a key file. Always use this.</li>
            <li><strong>GKE Autopilot limitations:</strong> DaemonSets allowed with restrictions, privileged pods restricted, some node-level configs not available. Check workload compatibility before migrating.</li>
          </ul>
        </section>

        <section id="cloud-run">
          <h3 style={S.h3}>Cloud Run</h3>
          <p style={S.p}>
            Cloud Run is a serverless container platform — deploy a container image, and Google manages scaling and infrastructure. For HTTP-triggered services. Scale-to-zero support — zero cost when idle. AWS Fargate (serverless mode) + Lambda Container Images equivalent.
          </p>
          <ul style={S.ul}>
            <li>CPU/memory allocations: 0.08–8 vCPU, 128MB–32GB per container instance</li>
            <li>Concurrency: one container instance can handle multiple requests (unlike Lambda)</li>
            <li>Cloud Run jobs: non-HTTP workloads, batch jobs — containerized, scheduled or triggered</li>
            <li>VPC connector / Direct VPC egress: access VPC private resources from Cloud Run</li>
            <li>Min instances: eliminate cold starts — maintain pre-warmed instances</li>
          </ul>
        </section>

        <section id="cloud-functions">
          <h3 style={S.h3}>Cloud Functions</h3>
          <p style={S.p}>
            Cloud Functions is event-driven FaaS (Functions-as-a-Service) — deploy code, and Google manages everything. AWS Lambda equivalent. Supported runtimes: Node.js, Python, Go, Java, Ruby, PHP, .NET.
          </p>
          <ul style={S.ul}>
            <li><strong>Triggers:</strong> HTTP, Pub/Sub, Cloud Storage, Firestore, Firebase, Cloud Scheduler, Eventarc</li>
            <li><strong>Gen 1 vs Gen 2:</strong> Gen 2 (Cloud Run based) — longer timeout (60 min), higher memory (32GB), concurrency support</li>
            <li><strong>Cold starts:</strong> Cold starts possible at Min instances = 0. Min instances &gt; 0 = warm instances, higher cost.</li>
            <li><strong>VPC connector:</strong> Access VPC private resources from Functions (Cloud SQL, Memorystore etc.)</li>
          </ul>
        </section>

        <Figure caption="GCP Compute: Compute Engine, GKE, Cloud Run, Cloud Functions — abstraction levels and DC mapping">
          <GcpComputeDiagram />
        </Figure>
      </section>

      {/* ─── STORAGE ──────────────────────────────────────────────────────── */}
      <section id="storage-services">
        <h2 style={S.h2}>Storage Services</h2>

        <section id="cloud-storage">
          <h3 style={S.h3}>Cloud Storage (GCS)</h3>
          <p style={S.p}>
            Cloud Storage is GCP's object storage service — Objects inside a Bucket. The hierarchy is simple: a bucket is created with a globally unique name, and inside it objects (files) are stored in key-value style. It is the cloud counterpart of object stores like NetApp StorageGRID or Dell ECS in a traditional DC — but because of its scale and durability (11 nines), a direct comparison is difficult.
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
            Persistent Disk is network-attached block storage — for Compute Engine VMs. AWS EBS equivalent. Traditional DC SAN LUN equivalent.
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
            Filestore is a managed NFS file storage service — multiple VMs can mount it simultaneously. Cloud equivalent of traditional DC NAS (Network Attached Storage). Connect the networking concepts from the <TopicLink slug="nas" variant="inline" /> article.
          </p>
          <ul style={S.ul}>
            <li><strong>Basic HDD/SSD:</strong> Zonal — dev/test, basic workloads</li>
            <li><strong>Enterprise:</strong> Regional, HA — production workloads</li>
            <li><strong>High Scale:</strong> High capacity, high throughput — ML training data, HPC</li>
            <li>NFS v3 and v4.1 support — broad client compatibility</li>
            <li>AWS EFS equivalent — but NFS only (no SMB like Azure Files)</li>
          </ul>
        </section>

        <Figure caption="GCP Storage: Cloud Storage, Persistent Disk, Filestore, Local SSD and Database services">
          <GcpStorageDiagram />
        </Figure>
      </section>

      {/* ─── DATABASES ────────────────────────────────────────────────────── */}
      <section id="databases">
        <h2 style={S.h2}>Database Services</h2>

        <section id="cloud-sql">
          <h3 style={S.h3}>Cloud SQL</h3>
          <p style={S.p}>
            Cloud SQL is a managed relational database service — it supports MySQL, PostgreSQL, and SQL Server. OS patches, database engine upgrades, automated backups — Google's job. Your job: schema design, queries, access control, and connection management. Most teams that are comfortable with RDS find Cloud SQL familiar — the core concepts are the same, the terminology slightly different.
          </p>
          <ul style={S.ul}>
            <li><strong>HA configuration:</strong> Primary instance + standby instance (different Zone) — automatic failover in case of zone failure (~60 seconds typically)</li>
            <li><strong>Read replicas:</strong> Readable replicas in the same Region or a different Region — read scaling + DR</li>
            <li><strong>Private IP:</strong> Private IP in the VPC via Private Service Access — do not expose a public IP in production</li>
            <li><strong>Backups:</strong> Automated daily backups + on-demand backups. Point-in-time recovery (PITR) with binary logging.</li>
            <li><strong>Cloud SQL Auth Proxy:</strong> Secure connection without IP allowlisting — auth via Cloud IAM, SSL tunnel automatic</li>
          </ul>
        </section>

        <section id="cloud-spanner">
          <h3 style={S.h3}>Cloud Spanner</h3>
          <p style={S.p}>
            Cloud Spanner is the world's first globally distributed, strongly consistent, horizontally scalable SQL database. It is a truly unique GCP service — AWS or Azure have no direct equivalent.
          </p>
          <ul style={S.ul}>
            <li>Global distribution: synchronous replication across multiple Regions + strong consistency — this seemed theoretically impossible (CAP theorem), but GCP implemented it with the Truetime API</li>
            <li>Horizontal scale: petabytes of data, millions of transactions per second — add nodes = more throughput</li>
            <li>ACID transactions globally — consistency not just in a single Region, but globally</li>
            <li>Use case: financial systems, global inventory, gaming leaderboards, global user databases</li>
            <li>Cost: premium — more than traditional databases. Justify it with: a global consistency requirement or extreme scale</li>
          </ul>
          <Callout type="important" title="Cloud Spanner vs Cloud SQL">
            Both are managed SQL databases but fundamentally different. Cloud SQL = traditional RDBMS, managed (scale-up). Cloud Spanner = globally distributed scale-out. Choose Spanner when: global consistency is needed, horizontal scale beyond a single server, multi-region active-active SQL. Choose Cloud SQL when: standard workloads, cost sensitivity, existing MySQL/PostgreSQL apps.
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
            AlloyDB ≠ Cloud SQL. AlloyDB is a separate product — columnar storage engine, AI/ML integration, 4x faster analytics than standard PostgreSQL. For production enterprise PostgreSQL workloads — more capable than Cloud SQL but more costly.
          </p>
        </section>
      </section>

      {/* ─── HIGH AVAILABILITY ────────────────────────────────────────────── */}
      <section id="high-availability">
        <h2 style={S.h2}>High Availability</h2>

        <section id="zone-regional-ha">
          <h3 style={S.h3}>Zonal vs Regional Resources</h3>
          <p style={S.p}>
            GCP resources are categorized as zonal, regional, or global:
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
            Production HA principle: deploy zonal resources across multiple zones. Regional resources are automatically multi-zone. Global resources do not need extra HA planning.
          </p>
        </section>

        <section id="migs">
          <h3 style={S.h3}>Managed Instance Groups (MIGs)</h3>
          <p style={S.p}>
            A MIG is a group of identical VMs — autoscaling, autohealing, rolling updates, multi-zone distribution. AWS Auto Scaling Group (ASG) equivalent. Azure VMSS equivalent.
          </p>
          <ul style={S.ul}>
            <li><strong>Zonal MIG:</strong> Single zone — simpler, lower cost</li>
            <li><strong>Regional MIG:</strong> Multiple zones in a Region — HA, survives a zone failure. Use for production.</li>
            <li><strong>Autoscaling:</strong> CPU utilization, LB capacity, custom metrics (Cloud Monitoring), scheduled — min/max instance count</li>
            <li><strong>Autohealing:</strong> Health check fail → instance automatically recreate. Application-level health, not just VM ping.</li>
            <li><strong>Rolling updates:</strong> Update the template → the MIG gradually updates instances — configurable max surge/unavailable</li>
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
            GCP has no single managed DR service (like Azure Site Recovery). The engineer designs DR using existing services.
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
            <li><strong>Cloud Storage:</strong> Create a dual-region bucket (e.g., asia-south1 + asia-southeast1) — objects automatically sync to both regions, zero extra config. If one region goes down, content is served seamlessly from the other region. Enable Turbo replication for a 15-minute RPO.</li>
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
            <strong>Cloud KMS (Key Management Service):</strong> Manage cryptographic keys — software-backed or HSM-backed (Cloud HSM). Envelope encryption: encrypt data with a DEK, encrypt the DEK with the KMS key. AWS KMS equivalent.
          </p>
          <ul style={S.ul}>
            <li>CMEK (Customer-Managed Encryption Keys): Cloud Storage, BigQuery, Cloud SQL, Compute Engine disk encryption with KMS keys</li>
            <li>Key rotation: automatic scheduled rotation</li>
            <li>External Key Manager (EKM): with keys outside GCP (on-prem HSM) — HYOK (Hold Your Own Key)</li>
          </ul>
          <p style={S.p}>
            <strong>Secret Manager:</strong> Securely store application secrets (API keys, passwords, certificates). Versioned, audited, IAM-controlled access. AWS Secrets Manager equivalent.
          </p>
          <ul style={S.ul}>
            <li>Versions: multiple versions per secret — rotate without app restart</li>
            <li>Automatic rotation: auto-rotate support via Cloud Functions trigger</li>
            <li>Access via API/SDK: Compute Engine VMs, Cloud Run, Cloud Functions — no credentials in code</li>
          </ul>
        </section>

        <section id="security-command-center">
          <h3 style={S.h3}>Security Command Center</h3>
          <p style={S.p}>
            Security Command Center (SCC) is GCP's centralized CSPM + threat detection platform. See the security posture of the entire GCP environment from one place — misconfigurations, active threats, compliance gaps, all in a consolidated view.
          </p>
          <ul style={S.ul}>
            <li><strong>Security Health Analytics:</strong> Detect misconfigurations — public buckets, overly permissive firewall rules (allow all ingress), exposed SA keys, unencrypted disks</li>
            <li><strong>Threat Detection:</strong> ML-based — cryptomining, data exfiltration, brute force, malware signals</li>
            <li><strong>Event Threat Detection:</strong> Cloud Logging streams analyze — anomalous IAM grants, suspicious logins, privilege escalation</li>
            <li><strong>Container Threat Detection:</strong> GKE runtime threat detection — suspicious binaries, libraries</li>
            <li><strong>Compliance:</strong> CIS Benchmarks, PCI-DSS, NIST, ISO 27001 — automated compliance reporting</li>
          </ul>
        </section>

        <section id="vpc-service-controls">
          <h3 style={S.h3}>VPC Service Controls</h3>
          <p style={S.p}>
            VPC Service Controls define a security perimeter around GCP managed services — preventing data exfiltration. Even with valid IAM credentials, access from outside the perimeter can be denied.
          </p>
          <p style={S.p}>
            Example: a BigQuery dataset — accessible only from the corporate VPC. An employee with rogue credentials cannot pull data out from outside. A Cloud Storage bucket — only from specific VPC sources. A critical feature for compliance (BFSI, healthcare).
          </p>
          <ul style={S.ul}>
            <li>Access Levels: define additional conditions (device policy, IP range, region)</li>
            <li>Ingress/Egress rules: fine-grained control on what can enter/leave perimeter</li>
            <li>Dry run mode: audit mode — log violations, do not deny — before enforcing</li>
          </ul>
          <Callout type="important" title="BeyondCorp Enterprise">
            BeyondCorp Enterprise is Google's zero-trust access product — access enterprise applications without a corporate VPN, based on user identity + device trust level + context (location, device compliance). Google first built this for its own employees — the "BeyondCorp" research papers have been publicly available since 2014. Network location (whether you are connected to the VPN or not) does not matter; device posture and user identity matter.
          </Callout>
        </section>
      </section>

      {/* ─── OPERATIONS ───────────────────────────────────────────────────── */}
      <section id="operations">
        <h2 style={S.h2}>Operations Suite (Observability)</h2>

        <section id="cloud-monitoring">
          <h3 style={S.h3}>Cloud Monitoring</h3>
          <p style={S.p}>
            Cloud Monitoring collects, visualizes and alerts on metrics of GCP infrastructure and applications — data from GCP resources arrives automatically, no additional configuration needed. You can also monitor AWS/Azure infra from the same workspace (deploy the multi-cloud agent).
          </p>
          <ul style={S.ul}>
            <li>GCP resource metrics auto-collected: Compute Engine CPU/disk/network, GKE node/pod, Cloud SQL queries etc.</li>
            <li>Custom metrics: push via the Monitoring API or OpenTelemetry</li>
            <li>Uptime checks: HTTP/TCP/HTTPS endpoint health checks — from global locations</li>
            <li>Alerting policies: metric threshold, absence of metric, metric ratio — notification channels (email, PagerDuty, Slack, Pub/Sub, webhook)</li>
            <li>Dashboards: pre-built + custom. Metrics Explorer: ad-hoc metric queries.</li>
            <li>SLO monitoring: define SLIs → track SLOs → monitor the error budget</li>
          </ul>
        </section>

        <section id="cloud-logging">
          <h3 style={S.h3}>Cloud Logging and Audit Logs</h3>
          <p style={S.p}>
            Cloud Logging is GCP's centralized log ingestion and querying platform. GCP services send logs automatically — Compute Engine (OS logs via Ops Agent), GKE, Cloud SQL, Cloud Run, Cloud Functions are all included. The Log Router receives all logs and decides where to store or export them.
          </p>
          <ul style={S.ul}>
            <li>Log Router: all logs arrive in Cloud Logging — the Log Router decides where to store/export</li>
            <li>Log sinks: export logs to Cloud Storage (archival), BigQuery (analytics), Pub/Sub (streaming), third-party SIEMs</li>
            <li>Log-based metrics: create custom metrics from logs → use them for alerting</li>
            <li>Log exclusions: exclude unnecessary logs — cost control</li>
          </ul>
          <p style={S.p}>
            <strong>Cloud Audit Logs — 4 types:</strong>
          </p>
          <ul style={S.ul}>
            <li><strong>Admin Activity:</strong> Resource configuration changes — ALWAYS on, cannot disable. "Who created/deleted/modified resource X."</li>
            <li><strong>Data Access:</strong> Data read/write — configurable (off by default for storage cost). "Who read object Y from bucket Z."</li>
            <li><strong>System Event:</strong> Google-automated actions — VM live migration, autoscaling events.</li>
            <li><strong>Policy Denied:</strong> VPC Service Controls or Org Policy violations.</li>
          </ul>
          <Callout type="best-practice" title="Audit Logs — Production Mandatory">
            Keeping Admin Activity logs always on is mandatory (they already can't be disabled). Enable Data Access logs in production for compliance — just monitor cost on high-volume services. BigQuery data access logs are especially important for data governance. Log sink to Cloud Storage for 7-year retention (financial compliance).
          </Callout>
        </section>

        <section id="trace-profiler">
          <h3 style={S.h3}>Cloud Trace and Profiler</h3>
          <p style={S.p}>
            <strong>Cloud Trace:</strong> Distributed tracing — trace request latency across microservices. GKE, App Engine, Cloud Run automatically integrated. AWS X-Ray equivalent. Identify bottlenecks: "Why is the Order API 500ms slow — is the database query slow or the network?"
          </p>
          <p style={S.p}>
            <strong>Cloud Profiler:</strong> Always-on CPU and heap profiler in production — low overhead (&lt;1%). Identify performance hotspots without separate profiling sessions. AWS CodeGuru Profiler equivalent.
          </p>
          <p style={S.p}>
            <strong>Error Reporting:</strong> Automatically detect and group application errors — stacktraces, first/last occurrence, user impact count. Auto-integrates with App Engine, Cloud Run, GKE.
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
            <strong>Terraform (HashiCorp):</strong> The <code>google</code> provider for GCP — for managing all GCP resources. Preferred for multi-cloud environments. State management: store the Terraform state file in a Cloud Storage bucket + enable GCS object versioning. State locking: GCP Cloud Storage object lock or separately Firestore/Datastore.
          </p>
          <p style={S.p}>
            <strong>Deployment Manager:</strong> GCP's native IaC — YAML/Python/Jinja2. Being superseded by Terraform and Config Connector for most use cases. You will see it in legacy projects.
          </p>
          <p style={S.p}>
            <strong>Config Connector:</strong> A Kubernetes operator that manages GCP resources as K8s custom resources — for GitOps workflows, in GKE clusters. Manage infra and app deployments from one Kubernetes manifest.
          </p>
          <ul style={S.ul}>
            <li>Terraform + Cloud Build: CI/CD pipeline — <code>terraform plan</code> on PR, <code>terraform apply</code> on merge</li>
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
            <li><strong>Budget Alerts:</strong> Define a budget at the Billing Account or Project level → alerts at 50%, 90%, 100% thresholds.</li>
            <li><strong>Cost Table / Cost Breakdown:</strong> Drill-down cost analysis by service, SKU, project, label.</li>
            <li><strong>Recommendations:</strong> Committed Use Discount recommendations, idle VM recommendations, oversized VM suggestions — Recommender API.</li>
            <li><strong>Pricing Calculator:</strong> cloud.google.com/products/calculator — estimate costs before deploying.</li>
            <li><strong>Labels strategy:</strong> environment, team, application, cost-center mandatory labels — enforce with Org Policy.</li>
            <li><strong>Resource hierarchy for billing:</strong> Design the Projects → Billing Accounts → reporting hierarchy upfront.</li>
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
          <strong>Choose GCP when:</strong> Analytics/BigQuery is the primary need, Kubernetes-native architecture, AI/ML workloads (TPUs, Vertex AI), global network performance premium tier required, cost-sensitive compute (SUDs advantage). <strong>Choose AWS when:</strong> Widest service selection, largest global community, most mature ecosystem, multi-cloud strategy. <strong>Choose Azure when:</strong> Heavy use of Microsoft enterprise software (Windows, SQL Server, AD, M365), hybrid cloud is the primary concern.
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
            <li>Cloud DNS private zones: hybrid DNS — forward GCP zones on the on-prem resolver</li>
            <li>Private Service Connect: from on-prem to GCP APIs (googleapis.com) → private IP access</li>
            <li>Cloud Identity: on-prem AD → Cloud Identity (GCDS sync) → GCP IAM</li>
            <li>Anthos / GKE Enterprise: centrally manage on-prem K8s clusters and GKE</li>
            <li>Cloud Storage Transfer Service: migrate on-prem data → GCS (initial + incremental)</li>
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
            ["MIGs", "Regional MIGs (not zonal) for production. Autohealing always.", "Survives zone failure"],
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
          <li><strong>DNS resolution?</strong> <code>nslookup / dig</code> from the VM — check the Cloud DNS resolver and private zone config</li>
          <li><strong>VM reachable?</strong> VM running status check: <code>gcloud compute instances describe</code>. SSH via IAP (no public IP needed): <code>gcloud compute ssh VM_NAME --tunnel-through-iap</code></li>
          <li><strong>Firewall blocking?</strong> Connectivity Tests tool (Network Intelligence Center) — simulate source to destination. Enable Firewall Rules Logging → check in Cloud Logging</li>
          <li><strong>Route issue?</strong> <code>gcloud compute routes list</code>. The Connectivity Tests tool verifies the next-hop.</li>
          <li><strong>IAM denied?</strong> Policy Troubleshooter (console or <code>gcloud policy-troubleshoot iam RESOURCE --principal EMAIL --permission PERMISSION</code>)</li>
          <li><strong>Cloud SQL unreachable?</strong> Private IP → Private Service Access peering check. Cloud SQL Auth Proxy running? Authorized networks (if public IP) check.</li>
          <li><strong>GKE pod issue?</strong> <code>kubectl describe pod</code>, <code>kubectl logs</code>, Events check. Workload Identity federation — SA permissions?</li>
          <li><strong>Cloud Storage access denied?</strong> IAM permissions on bucket (roles/storage.objectViewer), bucket ACLs, VPC Service Controls perimeter check.</li>
          <li><strong>High latency?</strong> Network Intelligence Center — topology, latency hops. Premium vs Standard Tier check. Inter-region traffic?</li>
          <li><strong>Cost spike?</strong> Cloud Billing → Cost Table → filter by Project/Service/Label. Unexpected resources (VMs left running, large storage).</li>
          <li><strong>Interconnect/VPN down?</strong> Cloud Router BGP session status. HA VPN tunnel status. Partner Interconnect → provider status.</li>
        </ol>
        <Callout type="important" title="Network Intelligence Center — GCP's Troubleshooting Platform">
          Network Intelligence Center tools: Connectivity Tests (end-to-end path simulation), Network Topology (live traffic visualization), Firewall Insights (unused rules, shadow rules), Performance Dashboard (packet loss, latency). Start troubleshooting with Connectivity Tests — it simulates without actual traffic.
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
          Recommended path for a Data Center engineer: Associate Cloud Engineer (ACE) → Professional Cloud Architect (PCA) → Professional Cloud Network Engineer (networking-focused). ACE tests practical skills — practising hands-on labs is a must (Cloud Skills Boost / Qwiklabs).
        </p>
        <p style={S.p}>
          Career opportunities: GCP Cloud Engineer, Cloud Architect, GKE/Platform Engineer, Data Engineer (BigQuery), ML Engineer (Vertex AI). In India, GCP demand is lower than AWS overall — but analytics, AI/ML and e-commerce companies are adopting GCP strongly. Multi-cloud skills (AWS + GCP or Azure + GCP) carry the highest value in the market.
        </p>
      </section>

      {/* ─── KEY TAKEAWAYS ────────────────────────────────────────────────── */}
      <section id="key-takeaways">
        <h2 style={S.h2}>Key Takeaways</h2>
        <ul style={S.ul}>
          <li><strong>Global VPC:</strong> GCP's #1 differentiator — single VPC across all Regions, subnets regional, no per-Region VPC needed</li>
          <li><strong>No Region Pairs:</strong> No Microsoft-defined pairing as in AWS/Azure — you design the DR Region</li>
          <li><strong>Firewall Rules:</strong> VPC-level, network tag/SA-based targeting (not subnet-level like AWS NACLs)</li>
          <li><strong>Resource Hierarchy:</strong> Org → Folder → Project → Resource. IAM inheritance top-down only.</li>
          <li><strong>Service Accounts:</strong> Workload identity — attached SA or Workload Identity Federation. Avoid JSON key files.</li>
          <li><strong>SUDs:</strong> Automatic discounts — no action required. No equivalent in AWS/Azure.</li>
          <li><strong>Spot VMs:</strong> 30-second notice (AWS = 2-minute). The application must handle graceful shutdown within 30 seconds.</li>
          <li><strong>Cloud Spanner:</strong> Globally distributed SQL — no AWS/Azure direct equivalent. Use when global consistency + horizontal scale needed.</li>
          <li><strong>Network Tiers:</strong> Premium (Google backbone) vs Standard (Internet) — unique GCP concept.</li>
          <li><strong>Interconnect:</strong> NOT encrypted by default — explicitly configure MACsec/IPsec.</li>
          <li><strong>Operations Suite:</strong> Cloud Monitoring + Logging + Trace + Profiler + Audit Logs — complete observability stack.</li>
          <li><strong>GKE Autopilot:</strong> Recommended in prod for most teams — Google manages nodes, per-pod billing.</li>
          <li><strong>Troubleshoot:</strong> Connectivity Tests (Network Intelligence Center) first — diagnose firewall, route and IAM issues.</li>
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
