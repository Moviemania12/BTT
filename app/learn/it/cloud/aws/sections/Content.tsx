"use client";

import { Callout, ComparisonTable, Figure, S } from "../shared";
import TopicLink from "@/components/TopicLink";
import { awsContent } from "@/content/aws";

import AwsGlobalDiagram from "../svg/AwsGlobalDiagram";
import AwsEdgeInfraDiagram from "../svg/AwsEdgeInfraDiagram";
import VpcArchitectureDiagram from "../svg/VpcArchitectureDiagram";
import VpcAdvancedDiagram from "../svg/VpcAdvancedDiagram";
import InternetTrafficDiagram from "../svg/InternetTrafficDiagram";
import SgNaclDiagram from "../svg/SgNaclDiagram";
import Ec2StorageDiagram from "../svg/Ec2StorageDiagram";
import Ec2PurchasingDiagram from "../svg/Ec2PurchasingDiagram";
import StorageComprehensiveDiagram from "../svg/StorageComprehensiveDiagram";
import MultiAzHaDiagram from "../svg/MultiAzHaDiagram";
import HybridConnectivityDiagram from "../svg/HybridConnectivityDiagram";
import IamDiagram from "../svg/IamDiagram";
import SecurityLayersDiagram from "../svg/SecurityLayersDiagram";
import ObservabilityDiagram from "../svg/ObservabilityDiagram";
import ContainersServerlessDiagram from "../svg/ContainersServerlessDiagram";
import WellArchitectedDiagram from "../svg/WellArchitectedDiagram";
import TroubleshootingFlowDiagram from "../svg/TroubleshootingFlowDiagram";
import FinalArchitectureDiagram from "../svg/FinalArchitectureDiagram";

export default function Content() {
  return (
    <article>

      {/* ─── QUICK SUMMARY ─────────────────────────────────────────────── */}
      <section id="quick-summary">
        <h2 style={S.h2}>Quick Summary</h2>
        <p style={S.p}>
          AWS (Amazon Web Services) is the world's largest public cloud platform, offering hundreds of cloud services across compute, networking, storage, databases, security, analytics, AI/ML and many other domains. For a Data Center engineer, understanding AWS means two things: understanding the cloud equivalents of traditional DC concepts, and designing, connecting, securing, monitoring and troubleshooting real AWS workloads.
        </p>
        <p style={S.p}>
          This article is not an AWS certification guide. It is a practical reference for an infrastructure engineer — from VPC networking to hybrid DC connectivity, from Security Groups to IAM, from Multi-AZ HA to troubleshooting.
        </p>
        <Callout type="important" title="The Data Center Engineer's Perspective">
          Most concepts in AWS map to a traditional DC — but not exactly one-to-one. EC2 is a virtual compute instance on AWS virtualization infrastructure — not a physical server. A VPC is a logically isolated software-defined network — not a VLAN. Whether a subnet is public depends on routing, not just on the IP address. These distinctions are explained clearly in this article.
        </Callout>
      </section>

      {/* ─── WHAT IS AWS ────────────────────────────────────────────────── */}
      <section id="what-is-aws">
        <h2 style={S.h2}>What Is AWS?</h2>
        <p style={S.p}>
          Amazon Web Services is the world's largest public cloud provider. AWS offers compute, storage, networking, databases, machine learning and security services on its massive global data center network — on an on-demand, pay-as-you-go model.
        </p>
        <p style={S.p}>
          The key insight for an infrastructure engineer: AWS is just a tool. The physical servers, switches, routers, storage arrays, firewalls and load balancers found in a traditional DC — all of them are available in AWS as virtualized, managed services. AWS manages the physical layer; the logical configuration is your responsibility.
        </p>
        <ComparisonTable
          headers={["Traditional DC Component", "AWS Equivalent", "Key Difference"]}
          rows={[
            ["Physical server", "EC2 instance", "Virtualized; shared hardware; on-demand"],
            ["SAN LUN (iSCSI)", "EBS volume", "Network-attached block storage, AZ-scoped"],
            ["NAS (NFS share)", "EFS", "Managed NFS, multi-AZ, serverless scaling"],
            ["Object storage", "S3", "Unlimited scale, API-based, not a filesystem"],
            ["Enterprise L3 network", "VPC", "Software-defined, no physical switches needed"],
            ["Physical firewall", "Security Groups + NACLs", "Distributed, virtual, per-ENI and per-subnet"],
            ["Hardware LB (F5, Citrix)", "ELB (ALB/NLB)", "Managed, auto-scales, multi-AZ"],
            ["Core WAN router", "Transit Gateway", "Hub for all VPCs and on-prem connections"],
            ["Enterprise DNS (BIND, AD)", "Route 53", "Managed, global, programmable routing"],
            ["Enterprise monitoring", "CloudWatch", "Metrics, logs, alarms, dashboards"],
            ["Identity platform (AD, LDAP)", "IAM + IAM Identity Center", "Policy-based, API-driven, fine-grained"],
          ]}
        />

        <section id="service-models">
          <h3 style={S.h3}>IaaS, PaaS, SaaS</h3>
          <ComparisonTable
            headers={["Model", "What AWS Provides", "What You Manage", "Examples"]}
            rows={[
              ["IaaS", "Virtual compute, network, raw storage", "OS, runtime, app, data, config", "EC2, VPC, EBS, S3"],
              ["PaaS", "Managed runtime + infrastructure", "Application code, data", "RDS, Elastic Beanstalk, Lambda"],
              ["SaaS", "Complete application", "Data and user access only", "Amazon WorkMail, Chime"],
            ]}
          />
          <p style={S.p}>
            For an infrastructure engineer the primary focus is IaaS — EC2, VPC, EBS, storage. PaaS services (RDS, managed LBs) are also commonly used because they reduce operational overhead while still needing design decisions from you.
          </p>
        </section>

        <section id="shared-responsibility">
          <h3 style={S.h3}>Shared Responsibility Model</h3>
          <p style={S.p}>
            Responsibility varies with the service type — the same rules apply differently to EC2, RDS and Lambda:
          </p>
          <ComparisonTable
            headers={["AWS Service", "AWS Manages", "You Manage"]}
            rows={[
              ["EC2 (IaaS)", "Physical hardware, hypervisor, network fabric", "OS patching, runtime, app, security config, SGs, data"],
              ["RDS (PaaS)", "Hardware, OS, DB engine patching, backups infra", "Schema, queries, parameter groups, SGs, data encryption"],
              ["Lambda (Serverless)", "All infrastructure, OS, runtime, scaling", "Function code, IAM permissions, environment variables"],
              ["S3 (Managed)", "Hardware, replication, availability", "Bucket policy, encryption settings, access control, data"],
            ]}
          />
          <Callout type="important" title="Shared Responsibility Practical Implication">
            If AWS's infrastructure is attacked — that is AWS's problem. If a breach happens through your misconfigured Security Group or a leaked IAM key — that is your problem. With managed services your responsibility surface is smaller, but not zero. Document the shared responsibility clearly for your organization.
          </Callout>
        </section>
      </section>

      {/* ─── GLOBAL INFRASTRUCTURE ──────────────────────────────────────── */}
      <section id="global-infrastructure">
        <h2 style={S.h2}>AWS Global Infrastructure</h2>

        <section id="regions">
          <h3 style={S.h3}>Regions</h3>
          <p style={S.p}>
            AWS operates in multiple independent geographic Regions — such as <code>ap-south-1</code> (Mumbai), <code>us-east-1</code> (N. Virginia), <code>eu-west-1</code> (Ireland). Every Region is completely independent — different data centers, different network, and potentially different services.
          </p>
          <p style={S.p}>
            Data stays in a Region unless it is explicitly moved. Region selection is critical for compliance requirements (GDPR, India data residency, PCI DSS scope).
          </p>
        </section>

        <section id="availability-zones">
          <h3 style={S.h3}>Availability Zones</h3>
          <p style={S.p}>
            Every Region has multiple Availability Zones (AZs) — typically 3 or more. An AZ is a logically isolated failure domain — separate power infrastructure, separate cooling, separate network connectivity. AZs are physically separated but sit within low-latency distance in the same Region for replication.
          </p>
          <Callout type="warning" title="AZ ≠ Single Physical Building">
            AWS does not guarantee that an AZ is exactly one physical building. An AZ is a logically isolated failure domain that is physically separate and independent. Keep this distinction in mind in architecture decisions — what matters is understanding the AZ failure scope, not the exact physical topology.
          </Callout>
          <Figure caption="AWS Global Infrastructure: Regions and Availability Zones — every Region independent, every AZ an isolated failure domain">
            <AwsGlobalDiagram />
          </Figure>
        </section>

        <section id="failure-scope">
          <h3 style={S.h3}>Failure Scope: Single vs Multi-AZ vs Multi-Region</h3>
          <ComparisonTable
            headers={["Deployment", "Failure Scope", "Use Case"]}
            rows={[
              ["Single instance, single AZ", "Instance or AZ failure = outage", "Dev/test only"],
              ["Multi-instance, single AZ", "AZ failure = outage", "Better compute HA, limited AZ resilience"],
              ["Multi-AZ", "Single AZ failure isolated, service continues", "Production workloads standard design"],
              ["Multi-Region", "Regional failure, geographic DR, global latency", "Critical workloads, compliance, global scale"],
            ]}
          />
        </section>

        <section id="edge-infrastructure">
          <h3 style={S.h3}>Edge Locations, Local Zones and Outposts</h3>
          <p style={S.p}>
            AWS is not just Regions and AZs — for global reach, AWS has built multiple additional infrastructure tiers:
          </p>
          <ComparisonTable
            headers={["Infrastructure", "What It Is", "Use Case", "DC Engineer Analogy"]}
            rows={[
              ["Edge Location", "CDN PoP (450+) — CloudFront, Route 53", "Content caching, DNS close to users", "CDN Point of Presence"],
              ["Local Zone", "AWS micro-DC in metro area", "Single-digit ms latency for games, media", "AWS satellite facility in your city"],
              ["Wavelength Zone", "AWS infra inside telecom 5G network", "Ultra-low latency to 5G devices", "Edge compute on carrier network"],
              ["AWS Outposts", "AWS rack installed in your DC", "Regulatory/latency on-prem requirements", "AWS hardware in your own facility"],
              ["Global Accelerator", "Anycast + AWS backbone routing", "Network path optimization, fast failover", "BGP anycast with SLA-backed backbone"],
            ]}
          />
          <Figure caption="AWS extended infrastructure: Edge Locations, Local Zones, Wavelength, Outposts, Global Accelerator">
            <AwsEdgeInfraDiagram />
          </Figure>
        </section>

        <section id="region-selection">
          <h3 style={S.h3}>Region Selection Strategy</h3>
          <p style={S.p}>
            Region selection is an important architecture decision. Do not choose based on latency alone — multiple factors matter:
          </p>
          <ul style={S.ul}>
            <li><strong>Data sovereignty:</strong> GDPR, India IT Act, financial regulations — where can the data be stored?</li>
            <li><strong>Latency to users:</strong> The Region closest to the primary user base — measure it, do not assume</li>
            <li><strong>Service availability:</strong> Some AWS services are available only in specific Regions</li>
            <li><strong>Disaster Recovery:</strong> DR Region geographically separated from the primary, but ideally compliant within the same jurisdiction</li>
            <li><strong>Cost:</strong> Region pricing varies — the same service costs differently in different Regions</li>
          </ul>
          <Callout type="important" title="Multi-Region ≠ Automatic Active-Active">
            Multi-Region deployment is complex — data synchronization, routing, consistency and latency all have to be managed. Active-passive DR is a much simpler starting point. A multi-region active-active design is deliberate, not a default.
          </Callout>
        </section>
      </section>

      {/* ─── VPC ─────────────────────────────────────────────────────────── */}
      <section id="vpc">
        <h2 style={S.h2}>VPC — Core Network Foundation</h2>

        <section id="vpc-concepts">
          <h3 style={S.h3}>VPC, CIDR and Subnets</h3>
          <p style={S.p}>
            A VPC (Virtual Private Cloud) is a logically isolated, software-defined virtual network in AWS in which your AWS resources run. Traditional DC analogy: your own private enterprise Layer-3 network — but a VPC is not a VLAN. A VLAN is a Layer 2 Ethernet construct; a VPC is a pure Layer-3 logically isolated construct with its own routing, CIDR block, and software-defined control plane. No physical switches, no spanning tree, no broadcast domains.
          </p>
          <p style={S.p}>
            A VPC is assigned a CIDR block (e.g., <code>10.0.0.0/16</code>). Subnets are created from this range (e.g., <code>10.0.1.0/24</code>, <code>10.0.2.0/24</code>). A VPC lives inside a Region and spans multiple AZs. But a subnet sits in exactly one AZ — for multi-AZ resiliency you need multiple subnets in multiple AZs.
          </p>
          <ComparisonTable
            headers={["Concept", "Traditional DC", "AWS VPC"]}
            rows={[
              ["Network boundary", "Physical rack/VLAN (L2)", "Logical VPC (L3 software-defined)"],
              ["IP addressing", "Manually assigned, VLAN-based", "CIDR block, subnet allocation"],
              ["Routing", "Physical routers, routing protocols", "VPC router (implicit), route tables"],
              ["Span", "Physical location", "Region-wide, multiple AZs"],
              ["Security", "Firewall, ACLs", "Security Groups (stateful) + NACLs (stateless)"],
              ["Internet", "Upstream ISP router", "Internet Gateway (managed, redundant)"],
              ["Isolation", "VLANs, physical segmentation", "Logically isolated by default — no cross-VPC traffic"],
            ]}
          />
        </section>

        <section id="public-private-subnet">
          <h3 style={S.h3}>Public vs Private Subnet</h3>
          <p style={S.p}>
            This is a critical misconception: a public subnet is not simply a subnet that has public IPs. A subnet is public or private not because its instances have public IPs — but because of whether that subnet's Route Table has a default route (<code>0.0.0.0/0 → igw-xxx</code>) pointing to the Internet Gateway (IGW).
          </p>
          <p style={S.p}>
            <strong>Public subnet:</strong> The Route Table has a <code>0.0.0.0/0 → igw-xxx</code> route. Resources in this subnet can be reachable from the Internet — subject to public IP assignment and Security Group rules.
          </p>
          <p style={S.p}>
            <strong>Private subnet:</strong> The Route Table has no IGW route. Resources are not directly reachable from the Internet. But private subnet instances can still access the Internet — outbound-only, through a NAT Gateway.
          </p>
          <Callout type="warning" title="Public IP ≠ Internet Reachable — Routing Matters">
            An instance in a private subnet can get a public IP — but if the IGW route is absent from the route table, there will be no Internet connectivity. Both public IP assignment and routing are required for inbound Internet access. Private subnet + NAT Gateway = outbound Internet access, but no unsolicited inbound traffic from the Internet.
          </Callout>
        </section>

        <section id="route-table">
          <h3 style={S.h3}>Route Tables</h3>
          <p style={S.p}>
            Every subnet is associated with a route table. The route table contains entries:
          </p>
          <ul style={S.ul}>
            <li><strong>Local route:</strong> VPC CIDR (e.g., <code>10.0.0.0/16 → local</code>) — mandatory, always present, handles traffic inside the VPC</li>
            <li><strong>IGW route:</strong> <code>0.0.0.0/0 → igw-xxx</code> — in public subnets, for the Internet</li>
            <li><strong>NAT Gateway route:</strong> <code>0.0.0.0/0 → nat-xxx</code> — in private subnets, for outbound Internet</li>
            <li><strong>VPN/peering/TGW routes:</strong> Specific CIDRs for on-prem or other VPCs</li>
          </ul>
          <p style={S.p}>
            Longest-prefix match applies — the more specific route wins. The AWS VPC router's route selection behavior is conceptually similar to traditional physical routers but not exactly the same — verify the specific behavior in the AWS documentation when edge cases matter.
          </p>
          <Figure caption="AWS VPC Architecture — subnets, route tables, IGW and NAT Gateway layout across multiple AZs">
            <VpcArchitectureDiagram />
          </Figure>
        </section>

        <section id="vpc-advanced">
          <h3 style={S.h3}>VPC Advanced: Endpoints, Peering, PrivateLink</h3>
          <p style={S.p}>
            There are multiple patterns for accessing AWS services outside the VPC — better alternatives to the default Internet path:
          </p>
          <ComparisonTable
            headers={["Mechanism", "What It Does", "Use Case", "Cost"]}
            rows={[
              ["Gateway Endpoint", "S3/DynamoDB access via private route, no NAT", "Avoid NAT GW charges for S3/DDB", "Free"],
              ["Interface Endpoint (PrivateLink)", "Private IP for AWS service API in your VPC", "EC2 API, STS, SSM, Secrets Manager", "Per hour + per GB"],
              ["VPC Peering", "Direct private routing between two VPCs", "Two VPCs, same or cross-account", "Data transfer charges"],
              ["Transit Gateway", "Hub routing for many VPCs + on-prem", "Multi-VPC, multi-account, hybrid", "Per attachment + data"],
            ]}
          />
          <p style={S.p}>
            VPC Peering is non-transitive — if VPC-A peers with VPC-B, and VPC-B peers with VPC-C, then VPC-A and VPC-C are not automatically connected. Transit Gateway supports transitive routing — preferred at scale.
          </p>
          <Figure caption="VPC advanced connectivity: endpoints, peering, Transit Gateway — multi-VPC architecture">
            <VpcAdvancedDiagram />
          </Figure>
        </section>

        <section id="cidr-planning">
          <h3 style={S.h3}>CIDR Planning and Multi-VPC Design</h3>
          <p style={S.p}>
            Upfront CIDR planning is critical — overlapping CIDRs make peering and Transit Gateway use impossible:
          </p>
          <ul style={S.ul}>
            <li>Assign every VPC a unique non-overlapping CIDR — include on-prem ranges in the comparison too</li>
            <li>Common approach: <code>10.x.0.0/16</code> per VPC (x unique per VPC) — 256 VPCs easily accommodated</li>
            <li>Subnet sizing: too small = IPs exhausted quickly; AWS reserves 5 IPs per subnet (/28 = only 11 usable)</li>
            <li>Hub-and-Spoke design: central Transit Gateway + shared services VPC (AD, monitoring) + spoke VPCs per team/app</li>
            <li>IPv6: AWS allocates /56 to VPC, /64 to subnets — globally unique, no NAT needed; dual-stack possible</li>
          </ul>
          <Callout type="warning" title="Overlapping CIDRs = Peering Impossible">
            If VPC-A and VPC-B both use 10.0.0.0/16 — peering will never work, and a TGW attachment will fail too. Plan first. Changing it in production is painful.
          </Callout>
        </section>
      </section>

      {/* ─── IGW AND NAT ────────────────────────────────────────────────── */}
      <section id="igw-nat">
        <h2 style={S.h2}>Internet Gateway and NAT Gateway</h2>

        <section id="igw">
          <h3 style={S.h3}>Internet Gateway</h3>
          <p style={S.p}>
            An IGW is a horizontally scaled, redundant, managed VPC component. It attaches at the VPC level (one VPC — one IGW). The IGW lets Internet traffic enter and leave the VPC.
          </p>
          <p style={S.p}>
            For IPv4 the IGW performs address translation (public IP ↔ private IP mapping) — between the instance's private IP and its assigned public IP. For IPv6 generally no translation is needed (global unicast addresses are directly routable).
          </p>
          <p style={S.p}>
            Requirements for inbound Internet → instance: a public IP on the instance (Elastic IP or auto-assigned) + <code>0.0.0.0/0 → IGW</code> in the route table + the Security Group must allow it.
          </p>
        </section>

        <section id="nat-gateway">
          <h3 style={S.h3}>NAT Gateway</h3>
          <p style={S.p}>
            A NAT Gateway gives private subnet instances outbound Internet access — without making them directly reachable from the Internet. Traffic flow: Private EC2 → private subnet route (<code>0.0.0.0/0 → NAT GW</code>) → NAT Gateway (in the public subnet) → IGW → Internet. Return traffic follows the same path in reverse.
          </p>
          <Callout type="warning" title="NAT Gateway: Outbound Initiated Only">
            Unsolicited inbound connections from the Internet to private instances are not possible through a NAT Gateway. It is strictly for outbound-initiated traffic — software updates, API calls, package downloads. The NAT Gateway is AWS-managed and deployed per AZ; for HA, a separate NAT Gateway in every AZ is best practice. A single NAT Gateway creates an outage on a single AZ failure.
          </Callout>
          <Figure caption="Internet traffic paths — inbound to public instance via IGW vs private outbound via NAT Gateway">
            <InternetTrafficDiagram />
          </Figure>
        </section>

        <section id="elastic-ip">
          <h3 style={S.h3}>Elastic IP and ENI</h3>
          <p style={S.p}>
            <strong>Elastic IP (EIP):</strong> A static public IPv4 address associated with your account — independent of the instance. When an instance is stopped/started, the auto-assigned public IP changes; an EIP does not change. Use when: stable DNS/IP needed for partner whitelisting, NAT Gateway, EC2 failover scenarios.
          </p>
          <p style={S.p}>
            <strong>Elastic Network Interface (ENI):</strong> A virtual network interface — it carries IP addresses (primary + secondary), a MAC address and Security Groups. Multiple ENIs can be attached to one instance. Secondary IPs are possible on an ENI — useful for hosting multiple SSL certs or IP-specific routing. An ENI can exist independently — it can be detached from one instance and attached to another (useful for quick failover).
          </p>
          <p style={S.p}>
            <strong>DNS Resolution in VPC:</strong> AWS-provided DNS (<code>169.254.169.253</code> or VPC Base + 2) works automatically. Private hosted zones in Route 53 can be associated with a VPC — internal DNS resolution. DHCP Option Sets configure DNS servers and the domain name.
          </p>
        </section>
      </section>

      {/* ─── SECURITY GROUP vs NACL ─────────────────────────────────────── */}
      <section id="security-group-nacl">
        <h2 style={S.h2}>Security Group vs Network ACL</h2>
        <p style={S.p}>
          AWS has two complementary security layers — the Security Group and the Network ACL. Connect them conceptually with the <TopicLink slug="firewall" variant="inline" />: both filter traffic, but at different levels and with different statefulness.
        </p>

        <section id="security-group">
          <h3 style={S.h3}>Security Group</h3>
          <p style={S.p}>
            A Security Group is an instance-level (ENI-level) stateful virtual firewall. It tracks connection state — return traffic for an allowed connection is permitted automatically without a separate rule. Traditional firewall analogy: a stateful inspection firewall that maintains a connection table.
          </p>
          <ul style={S.ul}>
            <li><strong>Stateful:</strong> Return traffic for an allowed inbound connection is automatically allowed — no separate outbound rule is needed for return packets</li>
            <li><strong>Allow rules only:</strong> There are no explicit DENY rules; whatever is not allowed is implicitly denied</li>
            <li><strong>Source/destination flexibility:</strong> You can specify an IP CIDR or other Security Group IDs by ID (SG referencing)</li>
            <li><strong>Default SG:</strong> All outbound allowed, all inbound denied from external (unless rules added)</li>
            <li><strong>Multiple SGs:</strong> Multiple Security Groups can be applied to one instance — union of all rules</li>
          </ul>
        </section>

        <section id="nacl">
          <h3 style={S.h3}>Network ACL</h3>
          <p style={S.p}>
            A Network ACL is a subnet-level stateless firewall. It does not track connection state — every packet is evaluated independently. Traditional analogy: a router ACL (permit/deny per direction, no state).
          </p>
          <ul style={S.ul}>
            <li><strong>Stateless:</strong> Both inbound and outbound must be explicitly allowed — including ephemeral return ports (1024–65535) for response packets</li>
            <li><strong>Allow and Deny:</strong> Explicit DENY rules are possible — different from SGs</li>
            <li><strong>Numbered rules:</strong> The lowest rule number is evaluated first; the first match applies; no implicit allow</li>
            <li><strong>Default custom NACL:</strong> Deny all by default (both directions)</li>
            <li><strong>Default NACL:</strong> Allow all inbound and outbound</li>
          </ul>
          <Callout type="warning" title="NACL Stateless — Ephemeral Ports Critical">
            If port 443 inbound is allowed on the Security Group but the outbound ephemeral port range (1024-65535) is not allowed on the NACL — the client will not get a response even though the SG is correct. Check every direction explicitly on the NACL. This is a common troubleshooting mistake.
          </Callout>
        </section>

        <section id="sg-nacl-comparison">
          <h3 style={S.h3}>Comparison and Common Mistakes</h3>
          <ComparisonTable
            headers={["Property", "Security Group", "Network ACL"]}
            rows={[
              ["Level", "Instance (ENI)", "Subnet"],
              ["Statefulness", "Stateful — tracks connections", "Stateless — per packet"],
              ["Rule types", "Allow only", "Allow and Deny"],
              ["Rule evaluation", "All rules evaluated (union)", "Numbered order, first match"],
              ["Return traffic", "Automatically allowed", "Must be explicitly allowed (ephemeral ports)"],
              ["Default behavior", "Deny all inbound, allow all outbound", "Allow all (default NACL); deny all (custom NACL)"],
              ["Traditional analogy", "Stateful host firewall", "Router ACL (stateless)"],
            ]}
          />
          <Figure caption="Security Group (stateful, instance-level) vs Network ACL (stateless, subnet-level) — critical differences for troubleshooting">
            <SgNaclDiagram />
          </Figure>
        </section>
      </section>

      {/* ─── EC2 ─────────────────────────────────────────────────────────── */}
      <section id="ec2">
        <h2 style={S.h2}>EC2 — Compute</h2>

        <section id="ec2-fundamentals">
          <h3 style={S.h3}>Instance Fundamentals</h3>
          <p style={S.p}>
            EC2 (Elastic Compute Cloud) is AWS's virtual compute instance service — an EC2 instance is a virtual compute instance running on AWS's virtualization infrastructure, not a physical server. Every instance is launched from an AMI (Amazon Machine Image) — the AMI contains the OS, pre-installed software and configuration. An AMI is a template — multiple identical instances can be launched from it; Launch Templates make AMI + configuration reusable.
          </p>
          <p style={S.p}>
            The instance type defines vCPU count, memory, network performance and storage options (e.g., <code>t3.medium</code>, <code>m6i.large</code>). When choosing an instance type, do not focus only on interface bandwidth — encrypted throughput, packet rate, EBS bandwidth and network burst capacity all matter.
          </p>
          <p style={S.p}>
            User Data: a script that runs automatically at launch time — for OS configuration, software install and bootstrapping. Instance Metadata Service v2 (IMDSv2): token-based, SSRF-safe; the instance reads its AMI, instance ID and IAM role credentials from the metadata endpoint.
          </p>
        </section>

        <section id="ec2-families">
          <h3 style={S.h3}>Instance Families and Purchasing Options</h3>
          <Figure caption="EC2 instance families (by workload type) and purchasing options (by commitment level)">
            <Ec2PurchasingDiagram />
          </Figure>
          <ComparisonTable
            headers={["Purchase Option", "Best For", "Discount vs On-Demand", "Risk"]}
            rows={[
              ["On-Demand", "Unpredictable, short-term workloads", "0% (full price)", "None — no commitment"],
              ["Reserved Instances (1yr)", "Steady-state production", "Up to ~40%", "Commit to instance type in Region"],
              ["Reserved Instances (3yr)", "Long-term stable workloads", "Up to ~60-72%", "Long commitment, less flexibility"],
              ["Savings Plans", "Flexible compute commitment ($/hr)", "Similar to RI", "$/hr commit, flexible instance type"],
              ["Spot Instances", "Fault-tolerant, flexible workloads", "Up to ~90%", "Can be interrupted with 2min notice"],
              ["Dedicated Host", "License/regulatory isolation", "Varies (higher cost)", "Physical server dedicated to you"],
            ]}
          />
          <Callout type="important" title="Spot Interruption Planning">
            Spot Instances are very cheap, but AWS can reclaim them with a 2-minute notice. Design workloads for Spot: stateless, checkpointing, SQS-based, Auto Scaling mixed. Spot Fleets diversify requests across multiple instance types + AZs.
          </Callout>
        </section>

        <section id="ec2-lifecycle">
          <h3 style={S.h3}>Instance Lifecycle</h3>
          <ComparisonTable
            headers={["Action", "What Happens", "EBS Data", "Instance Store Data", "Billing"]}
            rows={[
              ["Stop", "Instance halts, released from physical host", "Persists", "LOST — data gone", "Compute stops, storage billed"],
              ["Start", "Instance starts, may launch on different physical host", "Available", "Empty (new)", "Compute billed again"],
              ["Reboot", "OS restart, same physical host generally", "Persists", "Survives reboot", "Continuous"],
              ["Terminate", "Instance permanently deleted", "Root EBS deleted by default*", "LOST", "Stops"],
              ["Hibernate", "RAM saved to EBS, instance stopped", "Persists + RAM saved", "LOST", "Compute stops, EBS billed"],
            ]}
          />
          <p style={S.p}>
            *Root EBS deletion on terminate configurable. Additional EBS volumes by default persist after terminate — explicitly configure DeleteOnTermination per volume.
          </p>
          <Callout type="warning" title="Stop ≠ Data Safety for Instance Store">
            Instance store data is lost on stop — and on terminate as well. When an instance is stopped, it may restart on a different physical host — instance store data survives reboot but NOT stop. Use only EBS for persistent data.
          </Callout>
        </section>

        <section id="ec2-advanced">
          <h3 style={S.h3}>AMI, Launch Templates, Placement Groups</h3>
          <p style={S.p}>
            <strong>AMI (Amazon Machine Image):</strong> A snapshot-based template — OS, software, configuration. Create a custom AMI: configure an existing instance → create image → use across Regions (copy AMI). Encryption is possible. AMI = the "golden image" concept for EC2.
          </p>
          <p style={S.p}>
            <strong>Launch Template:</strong> For reusing instance configuration — it stores the AMI, instance type, key pair, SGs and user data. Auto Scaling Groups consume Launch Templates. Versioning is supported — rollback is easy.
          </p>
          <p style={S.p}>
            <strong>Placement Groups:</strong> Control physical placement:
          </p>
          <ul style={S.ul}>
            <li><strong>Cluster:</strong> Low-latency networking — same rack, same AZ. HPC, tightly coupled. High bandwidth between instances. Single point of hardware failure.</li>
            <li><strong>Spread:</strong> Max hardware isolation — different racks, ideally different AZs. Max 7 instances per AZ per group. Critical instances.</li>
            <li><strong>Partition:</strong> Large distributed workloads (Hadoop, Cassandra, Kafka) — partitions isolated from each other on different racks.</li>
          </ul>
          <p style={S.p}>
            <strong>EC2 Auto Recovery:</strong> When a CloudWatch alarm triggers, AWS automatically recovers the instance — same instance ID, same IP, same EBS. Instance store data is lost, but instance continuity is maintained.
          </p>
        </section>
      </section>

      {/* ─── STORAGE ──────────────────────────────────────────────────────── */}
      <section id="storage">
        <h2 style={S.h2}>Storage — EBS, S3, EFS, FSx</h2>

        <section id="ebs">
          <h3 style={S.h3}>EBS — Block Storage</h3>
          <p style={S.p}>
            EBS (Elastic Block Store) is persistent, network-attached block storage — think of it like a SAN LUN (iSCSI) in a traditional DC. It attaches to an EC2 instance; the volume continues to exist after the instance is stopped or terminated (by default).
          </p>
          <ul style={S.ul}>
            <li>A standard EBS volume is attached to one EC2 instance at a time (io2 Block Express supports multi-attach, limited use cases)</li>
            <li>The EBS volume and EC2 instance must be in the same AZ — cross-AZ attachment is not possible</li>
            <li>Snapshots: point-in-time backup — stored in S3 (managed), incremental. Cross-AZ and cross-Region copy possible. EBS Snapshot Lifecycle Manager (DLM) automates them</li>
            <li>Volume types: gp3 (general purpose, configurable IOPS/throughput), io2 (provisioned IOPS, high performance DB), st1/sc1 (HDD, throughput/cold storage)</li>
            <li>Encryption: encrypted at rest and in transit with a KMS key — snapshots also stay encrypted</li>
          </ul>
        </section>

        <section id="s3">
          <h3 style={S.h3}>S3 — Object Storage</h3>
          <p style={S.p}>
            S3 (Simple Storage Service) is object storage — a massive key-value store at scale. In S3, objects are stored in buckets and accessed via API (HTTP/HTTPS). S3 is not mounted directly as a filesystem. Compare it with the object storage tier in a traditional DC (like NetApp StorageGRID, Dell ECS).
          </p>
          <p style={S.p}>
            S3 maintains data in redundant storage across multiple devices and facilities within a Region, per AWS documentation. Features: versioning (every object version retained), Object Lock (WORM compliance), Cross-Region Replication, Transfer Acceleration (CloudFront edge for faster upload/download), Event Notifications (trigger Lambda/SQS/SNS on object events).
          </p>
          <p style={S.p}>
            <strong>S3 Storage Classes:</strong> Standard → Standard-IA (Infrequent Access) → One Zone-IA → Glacier Instant Retrieval → Glacier Flexible Retrieval → Glacier Deep Archive. Intelligent-Tiering auto-moves objects based on access patterns. Lifecycle Policies automate transitions — e.g., 30 days → Standard-IA, 90 days → Glacier.
          </p>
          <Callout type="important" title="EBS vs S3 — Fundamental Difference">
            EBS = block device, filesystem attach, low-latency random I/O, EC2-specific, AZ-scoped. S3 = object store, API access, high durability, no filesystem, not AZ-specific, internet-accessible with proper policy. The two are for completely different use cases — confusing them is dangerous (e.g., using S3 like a database is the wrong design).
          </Callout>
        </section>

        <section id="efs">
          <h3 style={S.h3}>EFS — File Storage</h3>
          <p style={S.p}>
            EFS (Elastic File System) is AWS's managed NFS service — think of it like a traditional NAS. Multiple EC2 instances can mount it simultaneously — a shared filesystem. EFS is multi-AZ capable (Regional EFS automatically stores across multiple AZs). It automatically grows and shrinks as files are added/removed — no capacity planning needed.
          </p>
          <p style={S.p}>
            Use cases: shared content repositories, web serving, home directories, CMS content, DevOps build environments. EFS is not an alternative to block storage — it is a different use case.
          </p>
        </section>

        <section id="storage-advanced">
          <h3 style={S.h3}>FSx, Storage Gateway and Storage Classes</h3>
          <p style={S.p}>
            <strong>Amazon FSx:</strong> Managed file systems for specific workloads:
          </p>
          <ul style={S.ul}>
            <li><strong>FSx for Windows File Server:</strong> Managed Windows SMB file share — AD integration, DFS, shadow copies. The cloud equivalent of a traditional DC Windows file server.</li>
            <li><strong>FSx for Lustre:</strong> High-performance parallel file system — HPC, ML training, video processing. Sub-millisecond latency, hundreds GB/s throughput.</li>
            <li><strong>FSx for NetApp ONTAP:</strong> Multi-protocol (NFS, SMB, iSCSI) with ONTAP features — familiar to enterprises running NetApp.</li>
          </ul>
          <p style={S.p}>
            <strong>AWS Storage Gateway:</strong> An on-premises appliance (software or hardware) that connects on-prem storage workloads to AWS. Types: S3 File Gateway (NFS/SMB → S3), FSx File Gateway (cached FSx for Windows), Volume Gateway (iSCSI → S3/EBS), Tape Gateway (virtual tape library → S3/Glacier). It is the hybrid bridge from a traditional DC to AWS storage.
          </p>
        </section>

        <section id="storage-comparison">
          <h3 style={S.h3}>Storage Comparison</h3>
          <Figure caption="AWS storage services comprehensive comparison: Instance Store, EBS, EFS, FSx, S3 — persistence, protocol, use case">
            <StorageComprehensiveDiagram />
          </Figure>
        </section>
      </section>

      {/* ─── LOAD BALANCING ───────────────────────────────────────────────── */}
      <section id="load-balancing">
        <h2 style={S.h2}>Load Balancing</h2>
        <p style={S.p}>
          AWS Elastic Load Balancing (ELB) is a managed load balancer service. The core concepts are covered in the <TopicLink slug="load-balancer" variant="inline" /> article — here we focus on the AWS-specific implementation.
        </p>

        <section id="elb-types">
          <h3 style={S.h3}>ALB, NLB and GWLB</h3>
          <ComparisonTable
            headers={["Type", "Layer", "Use Case", "Features", "DC Analogy"]}
            rows={[
              ["ALB (Application LB)", "L7 — HTTP/HTTPS", "Web apps, microservices, API", "Host/path routing, WAF integration, gRPC, WebSocket, Lambda targets", "F5 / Citrix L7 ADC"],
              ["NLB (Network Load Balancer)", "L4 — TCP/UDP/TLS", "High throughput, static IP, non-HTTP", "Extreme performance, static IPs, TLS passthrough, PrivateLink", "F5 / Citrix L4"],
              ["GWLB (Gateway LB)", "L3 gateway", "Third-party virtual appliances (FW, IDS)", "Inline inspection of all traffic via appliance fleet", "Inline firewall farm with ECMP"],
            ]}
          />
          <p style={S.p}>
            Gateway Load Balancer is a powerful pattern: all VPC traffic passes through the GWLB — it sends that traffic to a fleet of third-party virtual firewall/IDS appliances → the traffic is inspected → back to the GWLB → destination. Centralized security inspection at scale, without changing routing for each service.
          </p>
        </section>

        <section id="target-groups">
          <h3 style={S.h3}>Target Groups and Health Checks</h3>
          <p style={S.p}>
            The LB routes traffic to target groups. A target group contains registered targets — EC2 instances, IP addresses or Lambda functions. Health checks are configured at the target group level — the LB sends traffic only to healthy targets.
          </p>
          <p style={S.p}>
            Multi-AZ design: register targets from multiple AZs in the target group. The LB automatically bypasses AZ-unhealthy targets and routes to healthy targets — but a stateless design at the application layer is also necessary.
          </p>
          <Callout type="important" title="Health Check ≠ Application Healthy">
            Passing an LB health check means a response is coming from the target port. Whether the application logic is working correctly depends on the health check endpoint design. A shallow health endpoint can return 200 while the app is broken. Design meaningful health endpoints.
          </Callout>
        </section>
      </section>

      {/* ─── AUTO SCALING ─────────────────────────────────────────────────── */}
      <section id="auto-scaling">
        <h2 style={S.h2}>Auto Scaling</h2>

        <section id="asg">
          <h3 style={S.h3}>Auto Scaling Group</h3>
          <p style={S.p}>
            An Auto Scaling Group (ASG) automatically manages EC2 instances — within min/desired/max capacity. When demand rises, instances are added; when demand falls, they are reduced. The ASG detects an unhealthy instance (via EC2 health check or LB health check) and automatically replaces it.
          </p>
          <p style={S.p}>
            Scaling policies: Target Tracking (maintain metric at value, e.g., CPU 70%), Step Scaling (step adjustments based on alarm), Scheduled (predictable patterns), Predictive (ML-based forecast). To slow scale-out: warmup period; to protect scale-in: scale-in protection on specific instances.
          </p>
          <ComparisonTable
            headers={["Concept", "Auto Scaling Group", "Load Balancer"]}
            rows={[
              ["Primary function", "Manages EC2 instance count", "Distributes traffic to instances"],
              ["Scale trigger", "CPU, custom metrics, schedule, predictive", "Health checks only"],
              ["HA contribution", "Replace failed instances, multi-AZ spread", "Route away from unhealthy targets"],
              ["Relationship", "ASG registers instances to LB target group", "LB distributes to ASG instances"],
            ]}
          />
          <Callout type="warning" title="Scaling ≠ High Availability">
            If the ASG is configured in only one AZ, then AZ failure = complete outage — regardless of scaling. Configure the ASG across multiple AZs. Scaling and HA are complementary, but they are different things.
          </Callout>
        </section>
      </section>

      {/* ─── ROUTE 53 ─────────────────────────────────────────────────────── */}
      <section id="dns-route53">
        <h2 style={S.h2}>DNS — Route 53</h2>
        <p style={S.p}>
          Route 53 is AWS's managed DNS service — the cloud equivalent of traditional DC enterprise DNS (BIND, Microsoft DNS, Infoblox). DNS records are configured in hosted zones (A, AAAA, CNAME, ALIAS, MX, TXT etc). Public hosted zones are Internet-facing; private hosted zones are VPC-internal.
        </p>
        <p style={S.p}>
          Routing policies: Simple (single value), Weighted (A/B testing or gradual migration), Latency-based (lowest latency endpoint per AWS measurement), Failover (primary/secondary with health checks), Geolocation (client geography-based), Geoproximity (geographic + bias), Multivalue (multiple IPs with health check filtering).
        </p>
        <p style={S.p}>
          Route 53 can also run its own health checks — against endpoints. The failover routing policy depends on these health checks. LB health checks and Route 53 health checks are separate mechanisms — each has a distinct use case.
        </p>
        <Callout type="important" title="DNS ≠ Inline Load Balancer">
          Route 53 provides DNS-based traffic steering — it is not an inline LB. DNS TTL and resolver/client caching affect failover timing. Route 53 failover can be slower than LB health-check-based failover. Modeling DNS traffic distribution accurately is hard because of caching behavior. For inbound HTTP traffic an LB is preferred for granular health checking and fast failover.
        </Callout>
      </section>

      {/* ─── IAM ──────────────────────────────────────────────────────────── */}
      <section id="iam">
        <h2 style={S.h2}>IAM — Identity and Access Management</h2>

        <section id="iam-concepts">
          <h3 style={S.h3}>Users, Roles and Policies</h3>
          <p style={S.p}>
            IAM is for authentication and authorization — two separate concepts:
          </p>
          <ul style={S.ul}>
            <li><strong>Authentication:</strong> Verifying identity — "Are you who you say you are?" Via IAM user credentials or a role-assumed STS token.</li>
            <li><strong>Authorization:</strong> Verifying permission — "Are you allowed to do this?" Via IAM policy evaluation.</li>
          </ul>
          <ComparisonTable
            headers={["IAM Entity", "What It Is", "Credential Type", "Use Case"]}
            rows={[
              ["User", "Long-term identity for a person or service", "Access key + secret (long-lived)", "Console access, CLI by humans"],
              ["Role", "Assumable identity with temporary credentials", "STS temporary token (short-lived)", "EC2, Lambda, cross-account, federated"],
              ["Policy", "JSON permission document", "Not a credential — attached to user/role", "Define Allow/Deny on actions+resources"],
              ["Group", "Collection of users sharing policies", "N/A", "Manage permissions at team level"],
            ]}
          />
          <p style={S.p}>
            IAM Policy Evaluation: Explicit Deny → wins always (even with allow). No Allow → implicit deny (deny by default). Multiple policies merged: union of allows, any deny wins. Resource policies (S3 bucket policy, KMS key policy) + identity policies both evaluated.
          </p>
        </section>

        <section id="iam-best-practices">
          <h3 style={S.h3}>Roles vs Long-Lived Keys</h3>
          <p style={S.p}>
            To let an EC2 instance or Lambda function access AWS services, attach an IAM Role — not hard-coded access keys. When a role is assumed, temporary credentials rotate automatically via STS. The application only needs to read credentials from the instance metadata service (IMDSv2).
          </p>
          <Callout type="warning" title="Access Keys in Code = Security Risk">
            Embedding an AWS access key and secret in application code or configuration is a serious security risk. If it leaks — in a code repo, logs or error messages — an attacker can gain full access. Use IAM roles with temporary credentials. Least privilege principle: grant only the minimum required permissions.
          </Callout>
          <Figure caption="IAM: authentication vs authorization, users vs roles, least privilege and policy evaluation">
            <IamDiagram />
          </Figure>
        </section>

        <section id="iam-advanced">
          <h3 style={S.h3}>Permission Boundaries, Organizations and SCP</h3>
          <p style={S.p}>
            <strong>Permission Boundaries:</strong> Set on an IAM entity (user/role) — the maximum permissions it can ever receive, regardless of what policies say. Useful for delegated admin scenarios: let the dev team manage IAM, but only within the boundary.
          </p>
          <p style={S.p}>
            <strong>AWS Organizations:</strong> For managing multiple AWS accounts centrally. Organizational Units (OUs) form the account hierarchy. Service Control Policies (SCPs) are set on an OU/account — the maximum permission limit for the entire account. An SCP is not overridden by identity policies — in an account, even an Administrator cannot exceed the SCP boundary.
          </p>
          <p style={S.p}>
            <strong>IAM Identity Center (SSO):</strong> Centralized SSO for multiple accounts — SAML/OIDC federation with a corporate IdP (Active Directory, Okta, etc). Permission sets are reused across accounts — manage them from one place. Traditional DC AD → AWS SSO integration is a common enterprise pattern.
          </p>
          <p style={S.p}>
            <strong>AWS Control Tower:</strong> Automates multi-account environment setup — landing zone, guardrails (preventive via SCPs, detective via Config Rules), Account Factory.
          </p>
        </section>
      </section>

      {/* ─── HIGH AVAILABILITY ────────────────────────────────────────────── */}
      <section id="high-availability">
        <h2 style={S.h2}>High Availability Architecture</h2>

        <section id="ha-vs-ft-dr">
          <h3 style={S.h3}>HA vs Fault Tolerance vs Disaster Recovery</h3>
          <ComparisonTable
            headers={["Concept", "Definition", "Example", "Target"]}
            rows={[
              ["High Availability (HA)", "System minimizes downtime — failover within seconds-minutes", "Multi-AZ ALB + ASG + RDS Multi-AZ", "99.9%–99.99% uptime"],
              ["Fault Tolerance (FT)", "System continues without interruption despite component failure", "S3 (automatic, no failover needed), DynamoDB", "Zero disruption"],
              ["Disaster Recovery (DR)", "Recovery after major event — RTO/RPO driven", "Cross-region backup, Pilot Light, Warm Standby", "Business continuity"],
            ]}
          />
          <p style={S.p}>
            The typical Multi-AZ HA design pattern: Route 53 DNS → ALB (multi-AZ) → ASG (instances AZ-a, AZ-b, AZ-c) → RDS Multi-AZ. A NAT Gateway separately in every AZ (a single NAT GW means an outage on a single AZ failure).
          </p>
          <Callout type="important" title="Multi-AZ ≠ Automatic HA">
            Having resources in multiple AZs is necessary but not sufficient. The application should be stateless, or keep shared state in an external store (ElastiCache, DynamoDB). Database failover is DNS-based — the application must handle reconnects. Analyze every layer of the architecture to find where the single point of failure is.
          </Callout>
        </section>
        <Figure caption="Multi-AZ HA architecture — Route 53, ALB, ASG across AZs, RDS Multi-AZ">
          <MultiAzHaDiagram />
        </Figure>
      </section>

      {/* ─── RDS ──────────────────────────────────────────────────────────── */}
      <section id="rds">
        <h2 style={S.h2}>RDS — Managed Database</h2>
        <p style={S.p}>
          RDS (Relational Database Service) is AWS's managed relational database — it supports MySQL, PostgreSQL, MariaDB, Oracle and SQL Server. AWS handles OS patching, backups and hardware management. Your responsibility: schema, queries, security group configuration, parameter group tuning.
        </p>

        <section id="rds-multiaz">
          <h3 style={S.h3}>Multi-AZ vs Read Replicas</h3>
          <ComparisonTable
            headers={["Feature", "Multi-AZ", "Read Replica"]}
            rows={[
              ["Purpose", "High Availability — HA", "Read scaling — performance"],
              ["Replication", "Synchronous to standby", "Asynchronous from primary"],
              ["Standby readable?", "No — not accessible for reads", "Yes — separate endpoint for reads"],
              ["Failover", "Automatic, DNS-based", "Manual promotion if needed"],
              ["Failover time", "Varies by failure type and DB engine; refer to AWS docs", "Not automatic"],
              ["Cost", "Higher (2x instance cost)", "Additional instance per replica"],
            ]}
          />
          <Callout type="warning" title="Multi-AZ ≠ Read Scaling">
            The Multi-AZ standby is only for HA — it is not used for reads or writes in normal operation. Read Replicas distribute read traffic but do not provide automatic HA failover by default. Do not mix the two.
          </Callout>
        </section>

        <section id="aurora-dynamodb">
          <h3 style={S.h3}>Aurora, DynamoDB and ElastiCache</h3>
          <ComparisonTable
            headers={["Service", "Type", "Key Characteristic", "Use Case", "DC Analogy"]}
            rows={[
              ["Aurora", "MySQL/PostgreSQL compatible", "Distributed storage (6 copies across 3 AZs), faster failover than RDS", "High-performance relational workloads", "High-end clustered RDBMS"],
              ["DynamoDB", "NoSQL (key-value + document)", "Serverless, auto-scale, single-digit ms at any scale", "Shopping cart, gaming, IoT, session store", "Cassandra/MongoDB managed"],
              ["ElastiCache (Redis)", "In-memory cache", "Microsecond latency, pub/sub, data structures", "Session cache, leaderboard, real-time analytics", "Redis/Memcached on dedicated servers"],
              ["ElastiCache (Memcached)", "In-memory cache", "Simple multi-threading, horizontal scale", "Simple object cache", "Memcached on servers"],
            ]}
          />
          <p style={S.p}>
            Database selection guide: structured, relational, ACID → RDS/Aurora. High-scale key-value, flexible schema → DynamoDB. Microsecond cache, session data → ElastiCache Redis. Search → OpenSearch. Time series → Timestream. Data warehouse → Redshift.
          </p>
        </section>
      </section>

      {/* ─── BACKUP AND DR ────────────────────────────────────────────────── */}
      <section id="dr-backup">
        <h2 style={S.h2}>Backup and Disaster Recovery</h2>
        <p style={S.p}>
          Key concepts: <strong>RTO</strong> (Recovery Time Objective — how quickly the service must be restored) and <strong>RPO</strong> (Recovery Point Objective — how much data loss is acceptable). These are business decisions — AWS tools help achieve them.
        </p>
        <ComparisonTable
          headers={["DR Pattern", "RTO", "RPO", "Cost", "Approach"]}
          rows={[
            ["Backup/Restore", "Hours", "Hours-days", "Lowest", "EBS/RDS snapshots, S3 backups — restore to new infra when needed"],
            ["Pilot Light", "Minutes-hours", "Minutes", "Low", "Minimal infrastructure running (DB replicated), scale up on DR event"],
            ["Warm Standby", "Minutes", "Near-zero", "Medium", "Scaled-down replica always running — scale to full on DR"],
            ["Active-Passive", "Minutes (failover)", "Near-zero (sync replication)", "High", "Full capacity in DR region, passive until failover"],
            ["Active-Active", "Near-zero", "Near-zero", "Highest", "Full capacity both regions, traffic split normally"],
          ]}
        />
        <p style={S.p}>
          AWS Backup: centralized backup policy across EC2, EBS, RDS, EFS, DynamoDB, FSx. Backup Vaults: immutable backup storage with vault lock (WORM). Cross-region backup copies: automate them as required by the DR strategy.
        </p>
        <Callout type="important" title="DR Testing Mandatory">
          A DR plan that has not been tested is just theory. Test failover in production — regularly. Measure RTO and RPO in an actual exercise. Challenge your assumptions.
        </Callout>
      </section>

      {/* ─── OBSERVABILITY ────────────────────────────────────────────────── */}
      <section id="observability">
        <h2 style={S.h2}>Observability — CloudWatch and CloudTrail</h2>
        <p style={S.p}>
          These are two fundamentally different services that are often confused:
        </p>
        <ComparisonTable
          headers={["Service", "Purpose", "What It Answers", "Examples"]}
          rows={[
            ["CloudWatch", "Operational observability", "How is my system performing?", "EC2 CPU, LB 5xx rate, custom metrics, application logs, alarms"],
            ["CloudTrail", "API activity audit trail", "Who did what, when, from where?", "Who deleted S3 bucket, which role launched EC2, IAM key usage"],
          ]}
        />
        <p style={S.p}>
          CloudWatch metrics are collected automatically for AWS resources — CPU, network, disk. Application-level metrics can be pushed to a custom namespace. Configure alarms — SNS notification or Auto Scaling trigger. Store and query application and system logs in CloudWatch Logs.
        </p>
        <p style={S.p}>
          By default CloudTrail logs Management Events. S3 and Lambda data events have to be enabled separately. CloudTrail is essential for security investigation — unauthorized API calls, resource deletion and IAM changes are all found here.
        </p>
        <Figure caption="CloudWatch (operational observability) vs CloudTrail (API audit trail) — two separate services, different purposes">
          <ObservabilityDiagram />
        </Figure>

        <section id="observability-advanced">
          <h3 style={S.h3}>VPC Flow Logs, EventBridge and X-Ray</h3>
          <p style={S.p}>
            <strong>VPC Flow Logs:</strong> Network-level packet metadata — source IP, destination IP, port, protocol, accept/reject. Critical for network forensics and security investigation. Store them in CloudWatch Logs or S3. Equivalent of traditional DC NetFlow/sFlow.
          </p>
          <p style={S.p}>
            <strong>AWS Config:</strong> Configuration compliance — resource configuration history, compliance rules (e.g., "all S3 buckets must be encrypted"), drift detection. Audit and compliance use case. Not operational monitoring — configuration state tracking.
          </p>
          <p style={S.p}>
            <strong>Amazon EventBridge:</strong> Event-driven automation — AWS service events, custom events, scheduled rules → trigger Lambda, Step Functions, SQS, SNS. Enables a decoupled architecture.
          </p>
          <p style={S.p}>
            <strong>AWS X-Ray:</strong> Distributed tracing — trace the request path of microservices across services. Identify latency bottlenecks. Visualize the service map. The AWS equivalent of a traditional APM tool (Dynatrace, New Relic).
          </p>
        </section>
      </section>

      {/* ─── HYBRID CONNECTIVITY ──────────────────────────────────────────── */}
      <section id="hybrid-connectivity">
        <h2 style={S.h2}>Hybrid — On-Prem to AWS</h2>

        <section id="vpn-directconnect">
          <h3 style={S.h3}>Site-to-Site VPN and Direct Connect</h3>
          <p style={S.p}>
            There are two primary approaches for connecting an on-prem data center to an AWS VPC:
          </p>
          <ComparisonTable
            headers={["Feature", "Site-to-Site VPN", "Direct Connect"]}
            rows={[
              ["Path", "Internet (IPsec tunnel)", "Dedicated private circuit"],
              ["Encryption", "Encrypted by default (IPsec)", "NOT encrypted by default"],
              ["Latency", "Variable (Internet-dependent)", "Predictable, consistent"],
              ["Bandwidth", "Limited (Internet bandwidth)", "High (1Gbps, 10Gbps, 100Gbps options)"],
              ["Setup time", "Hours (software config)", "Weeks-months (physical circuit)"],
              ["Cost", "Lower", "Higher (port + provider circuit)"],
              ["Use case", "Dev/test, backup path, quick setup", "Production, high bandwidth, latency-sensitive"],
            ]}
          />
          <Callout type="warning" title="Direct Connect: NOT Encrypted by Default">
            Direct Connect is a dedicated private circuit — isolated from the Internet — but traffic is not encrypted by default. Configure a separate layer for encryption (such as IPsec over Direct Connect). Verify this explicitly for compliance requirements. Connect it with the <TopicLink slug="firewall" variant="inline" /> and <TopicLink slug="router" variant="inline" /> concepts — on-prem routing, BGP, and firewall policies are all relevant.
          </Callout>
          <Figure caption="Hybrid connectivity — Site-to-Site VPN (encrypted over Internet) vs Direct Connect (private circuit, not encrypted by default)">
            <HybridConnectivityDiagram />
          </Figure>
        </section>

        <section id="transit-gateway">
          <h3 style={S.h3}>Transit Gateway and Hybrid DNS</h3>
          <p style={S.p}>
            Managing multiple VPCs and on-prem connections with point-to-point VPC peering becomes complex at scale. Transit Gateway is a central hub — it interconnects multiple VPCs and on-prem connections (VPN, Direct Connect) centrally. The analogy in a traditional DC is the core WAN router — hub-and-spoke topology.
          </p>
          <p style={S.p}>
            <strong>Direct Connect Gateway:</strong> Makes it possible to connect a single Direct Connect connection to VPCs in multiple Regions. <strong>Transit VIF (Virtual Interface):</strong> For use with a Transit Gateway over Direct Connect. BGP advertises routes from on-prem to AWS — <TopicLink slug="router" variant="inline" /> BGP concepts apply directly.
          </p>
          <p style={S.p}>
            <strong>Hybrid DNS:</strong> An on-prem DNS server cannot resolve AWS private zones directly. Route 53 Resolver Inbound Endpoint: forward AWS private DNS queries from on-prem. Route 53 Resolver Outbound Endpoint: resolve on-prem DNS from AWS. Together they enable bidirectional hybrid DNS resolution.
          </p>
        </section>
      </section>

      {/* ─── CONTAINERS ───────────────────────────────────────────────────── */}
      <section id="containers">
        <h2 style={S.h2}>Containers — ECS, EKS, Fargate</h2>

        <section id="what-are-containers">
          <h3 style={S.h3}>What Are Containers?</h3>
          <p style={S.p}>
            A container is a lightweight, portable application runtime — it shares the host OS kernel but keeps an isolated filesystem, network and process space. The fundamental difference from a traditional VM: a VM runs a complete OS (on a hypervisor); a container packages only the application and its dependencies and shares the kernel with the OS.
          </p>
          <ComparisonTable
            headers={["Property", "Virtual Machine", "Container"]}
            rows={[
              ["Startup time", "Minutes (full OS boot)", "Milliseconds (process start)"],
              ["Size", "GBs (OS + app)", "MBs (app + dependencies only)"],
              ["Isolation", "Full hardware-level isolation", "Process-level isolation (same kernel)"],
              ["Density", "Tens per host", "Hundreds per host"],
              ["Portability", "Hypervisor-dependent", "Runs anywhere with container runtime"],
              ["Overhead", "Higher (full OS)", "Lower (shared kernel)"],
            ]}
          />
          <p style={S.p}>
            In a traditional DC, VMs were used for server consolidation — containers are more efficient for the same goal. "Build once, run anywhere" — build on a dev laptop, run the same container in production without environment differences.
          </p>
        </section>

        <section id="docker-fundamentals">
          <h3 style={S.h3}>Docker Fundamentals</h3>
          <p style={S.p}>
            Docker is the de-facto standard of the container ecosystem. Key concepts:
          </p>
          <ul style={S.ul}>
            <li><strong>Dockerfile:</strong> A text file that defines the instructions for building a container image — base image, dependency install, app copy, startup command</li>
            <li><strong>Container Image:</strong> Immutable snapshot — application + runtime + dependencies bundled. Stored in a registry.</li>
            <li><strong>Container:</strong> Running instance of an image — ephemeral by default; data inside the container does not persist across restarts (use a volume)</li>
            <li><strong>Registry:</strong> Image store — ECR (AWS private), Docker Hub (public), GitHub Container Registry. ECR AWS native, IAM-integrated.</li>
            <li><strong>Container Runtime:</strong> Docker Engine, containerd — runs the actual containers. ECS and EKS use containerd.</li>
          </ul>
          <Callout type="important" title="Container Images Are Immutable">
            Changes in a running container are lost when the container stops. Use volumes for persistent data (EBS, EFS). Inject configuration through environment variables — do not hardcode it in the image.
          </Callout>
        </section>

        <section id="amazon-ecs">
          <h3 style={S.h3}>Amazon ECS</h3>
          <p style={S.p}>
            ECS (Elastic Container Service) is AWS's native container orchestration service. Key concepts:
          </p>
          <ul style={S.ul}>
            <li><strong>Task Definition:</strong> Blueprint — which container image, CPU/memory, ports, environment variables, IAM role, logging config. Version controlled.</li>
            <li><strong>Task:</strong> Running instance of a Task Definition — one or more containers together. Ephemeral or long-running.</li>
            <li><strong>Service:</strong> Maintains the desired task count — if a task fails, it replaces it. Integrates with the ALB for traffic routing. Increases/decreases the task count with Auto Scaling.</li>
            <li><strong>Cluster:</strong> Logical grouping of tasks/services. In the EC2 launch type: the underlying EC2 instances are registered in the cluster. In Fargate: serverless, no EC2.</li>
          </ul>
          <p style={S.p}>
            ECS Service → ALB integration: each task in Fargate awsvpc mode has its own private IP → it is registered in the ALB target group → traffic is distributed. When a health check fails, ECS replaces the task and it is deregistered from the ALB.
          </p>
        </section>

        <section id="amazon-eks">
          <h3 style={S.h3}>Amazon EKS</h3>
          <p style={S.p}>
            EKS (Elastic Kubernetes Service) is the AWS managed Kubernetes control plane. Kubernetes (K8s) is an open-source container orchestration platform — developed by Google, now CNCF. More complex than ECS but more portable and ecosystem-rich.
          </p>
          <ul style={S.ul}>
            <li><strong>Control Plane:</strong> AWS manages it — API server, etcd, scheduler. High availability guaranteed. You manage only the worker nodes.</li>
            <li><strong>Worker Nodes:</strong> EC2 instances (managed node groups or self-managed) or Fargate pods</li>
            <li><strong>Pod:</strong> The smallest deployable unit in Kubernetes — one or more containers together, shared network namespace</li>
            <li><strong>Deployment:</strong> Maintains the desired replica count — rolling updates, rollback</li>
            <li><strong>Service (K8s):</strong> Load balancing within cluster + external exposure via AWS LB Controller</li>
          </ul>
          <p style={S.p}>
            Choose EKS when: you need to migrate existing Kubernetes workloads, you need multi-cloud portability, or you need specific K8s ecosystem tools (Istio, Argo CD, Prometheus). Choose ECS when: AWS-native, simpler operations, no K8s expertise needed.
          </p>
        </section>

        <section id="aws-fargate">
          <h3 style={S.h3}>AWS Fargate</h3>
          <p style={S.p}>
            Fargate is a serverless compute engine for containers — there is no need to provision or manage EC2 instances. Both ECS and EKS can use Fargate.
          </p>
          <ul style={S.ul}>
            <li>No EC2 to patch, no cluster capacity to manage, no AMI updates</li>
            <li>Per-task billing: vCPU + memory per second — you do not pay for idle capacity</li>
            <li>Each Fargate task runs on its own dedicated micro-VM (stronger isolation than shared EC2)</li>
            <li>awsvpc networking: each task gets its own ENI, own private IP, own Security Group</li>
          </ul>
          <p style={S.p}>
            Fargate vs EC2 launch type: unpredictable burst workloads, batch jobs, event-driven tasks → Fargate. Steady-state high-density workloads, GPU requirement, specific EC2 features → EC2 launch type.
          </p>
        </section>

        <section id="container-networking">
          <h3 style={S.h3}>Container Networking</h3>
          <p style={S.p}>
            ECS awsvpc mode (recommended): every task gets its own ENI in the VPC — own private IP, own Security Group, independent network identity. Task IAM Role = fine-grained AWS permissions per task (not EC2 instance role).
          </p>
          <p style={S.p}>
            EKS networking: AWS VPC CNI plugin (recommended) — each pod gets a real VPC IP from the subnet. Security Groups for Pods: assign a per-pod SG. ALB Ingress Controller: Kubernetes Ingress → provisions an AWS ALB automatically.
          </p>
          <p style={S.p}>
            ECR (Elastic Container Registry): private Docker registry, IAM-based access control, image scanning (Inspector integration), lifecycle policies (purge old images automatically). The AWS equivalent of a traditional DC private Docker registry (Nexus, Harbor).
          </p>
        </section>

        <section id="container-use-cases">
          <h3 style={S.h3}>Enterprise Container Use Cases</h3>
          <ComparisonTable
            headers={["Use Case", "Recommended Service", "Why"]}
            rows={[
              ["Microservices API", "ECS Fargate + ALB", "Simple, AWS-native, no K8s overhead"],
              ["ML model serving", "ECS EC2 (GPU)", "GPU instance type needed, not available on Fargate"],
              ["Batch processing", "ECS/EKS Fargate", "Scale to zero, pay only during run"],
              ["Lift & shift from K8s", "EKS", "Minimal manifest changes needed"],
              ["Multi-cloud K8s portability", "EKS", "Standard Kubernetes API"],
              ["CI/CD pipeline", "ECS Fargate / CodeBuild", "Ephemeral runners, pay per job"],
              ["Legacy monolith containers", "ECS EC2", "Full control, specific OS tuning"],
            ]}
          />
        </section>

        <Figure caption="Containers and serverless: ECS, EKS, Fargate, Lambda — abstraction levels and use cases">
          <ContainersServerlessDiagram />
        </Figure>
      </section>

      {/* ─── SERVERLESS ───────────────────────────────────────────────────── */}
      <section id="serverless">
        <h2 style={S.h2}>Serverless — Lambda, API Gateway</h2>
        <p style={S.p}>
          In a serverless architecture you focus only on application logic — AWS automatically manages infrastructure provisioning, patching and scaling. Pay-per-use model: zero cost when idle.
        </p>

        <section id="lambda-execution">
          <h3 style={S.h3}>Lambda Execution Model</h3>
          <p style={S.p}>
            Lambda is event-triggered function-as-a-service. A trigger arrives → Lambda invokes your function → execution completes → billing stops. Supported runtimes: Node.js, Python, Java, Go, Ruby, .NET, custom runtime (any binary).
          </p>
          <ComparisonTable
            headers={["Aspect", "Lambda Behavior", "Engineering Consideration"]}
            rows={[
              ["Invocation", "Synchronous (API GW) or Async (S3, SNS, SQS)", "Async failures → DLQ (Dead Letter Queue)"],
              ["Concurrency", "Parallel invocations automatically scale", "Account limit; Reserved concurrency = guarantee + limit"],
              ["Timeout", "Max 15 minutes per invocation", "Long-running → ECS Fargate or Step Functions"],
              ["Memory", "128MB to 10GB configurable", "CPU proportional to memory — increase memory = faster CPU"],
              ["IAM", "Execution role = what Lambda can access", "Least-privilege per function, not shared roles"],
              ["Logging", "stdout/stderr → CloudWatch Logs", "Structured JSON logging recommended for query"],
              ["Deployment", "ZIP or container image (up to 10GB)", "Container image for large dependencies"],
            ]}
          />
        </section>

        <section id="cold-starts">
          <h3 style={S.h3}>Cold Starts</h3>
          <p style={S.p}>
            A cold start happens when a Lambda function is invoked for the first time or after a long idle period — AWS initializes a new execution environment: container download, runtime init, function handler load. This can take from 100ms to seconds depending on the runtime and initialization code.
          </p>
          <ul style={S.ul}>
            <li><strong>Warm invocation:</strong> Existing container reuse — no cold start, fast (milliseconds)</li>
            <li><strong>Cold start factors:</strong> Runtime (Python/Node fast; Java/C# slow), package size, VPC ENI creation (biggest contributor for VPC Lambda), initialization code</li>
            <li><strong>Provisioned Concurrency:</strong> Pre-warm N containers always — eliminates cold starts for those N. Cost: you pay for warm containers even when not invoked</li>
            <li><strong>VPC Lambda:</strong> ENI creation used to increase cold start; AWS has fixed this with Hyperplane ENIs — modern VPC Lambda cold starts are significantly reduced</li>
          </ul>
          <Callout type="important" title="Cold Start vs Latency Requirements">
            Cold start matters for user-facing synchronous APIs — use Provisioned Concurrency or a lightweight runtime. For background async processing, cold start is generally acceptable.
          </Callout>
        </section>

        <section id="api-gateway">
          <h3 style={S.h3}>API Gateway</h3>
          <p style={S.p}>
            API Gateway is a fully managed service that creates, publishes, secures and scales REST, HTTP and WebSocket APIs. Pair it with Lambda → a complete serverless API.
          </p>
          <ul style={S.ul}>
            <li><strong>REST API:</strong> Full-featured — usage plans, API keys, request/response transformation, custom authorizers</li>
            <li><strong>HTTP API:</strong> Newer, simpler, cheaper (lower latency) — JWT auth, Lambda proxy. Preferred for simple use cases.</li>
            <li><strong>WebSocket API:</strong> Bi-directional communication — real-time chat, notifications, gaming</li>
            <li><strong>Authorizers:</strong> Lambda Authorizer (custom auth logic) or Cognito User Pool (JWT validation) — IAM auth is also possible</li>
            <li><strong>Throttling:</strong> Per-stage, per-method rate limits — DDoS protection, cost control</li>
          </ul>
          <p style={S.p}>
            In a traditional DC: NGINX + uWSGI + Flask = API setup. In AWS: API Gateway + Lambda = the same without managing any server. Auto-scales to millions of requests, no capacity planning.
          </p>
        </section>

        <section id="step-functions">
          <h3 style={S.h3}>Step Functions</h3>
          <p style={S.p}>
            Step Functions is a serverless workflow orchestration service — it coordinates Lambda functions and AWS services into complex workflows. State machine visual designer + JSON/YAML definition.
          </p>
          <ul style={S.ul}>
            <li><strong>States:</strong> Task (Lambda/service call), Choice (conditional branching), Parallel (concurrent branches), Wait (delay), Map (iterate over array), Catch/Retry (error handling)</li>
            <li><strong>Standard Workflows:</strong> Long-running (up to 1 year), at-most-once execution, audit history stored</li>
            <li><strong>Express Workflows:</strong> Short-duration (up to 5 min), high-volume, at-least-once, lower cost</li>
          </ul>
          <p style={S.p}>
            Use case: Order processing pipeline — validate order → check inventory → charge payment → send confirmation → update fulfillment. Each step Lambda, orchestration Step Functions, retry logic built-in, audit trail automatic.
          </p>
        </section>

        <section id="event-driven">
          <h3 style={S.h3}>Event-Driven Architecture</h3>
          <p style={S.p}>
            In an event-driven architecture services are loosely coupled — one service produces an event, another consumes it, and neither knows about the other directly.
          </p>
          <ul style={S.ul}>
            <li><strong>EventBridge:</strong> Event bus — route AWS service, custom app and SaaS events. Define rules: which event → which target (Lambda, SQS, Step Functions, etc)</li>
            <li><strong>SQS (Simple Queue Service):</strong> Message queue — the producer publishes a message, the consumer pulls it at its own pace. Decoupling + buffering. Standard (at-least-once) or FIFO (exactly-once ordered).</li>
            <li><strong>SNS (Simple Notification Service):</strong> Pub/sub — one message → multiple subscribers (Lambda, SQS, HTTP endpoints, email). Fan-out pattern.</li>
          </ul>
          <p style={S.p}>
            Classic pattern: S3 image upload → S3 event → SQS → Lambda (resize) → S3 (output) → EventBridge → SNS notification. All serverless, all pay-per-use, zero idle cost.
          </p>

          <section id="serverless-use-cases">
            <h3 style={S.h3}>Enterprise Serverless Use Cases</h3>
            <ComparisonTable
              headers={["Use Case", "Pattern", "Why Serverless"]}
              rows={[
                ["REST API", "API Gateway + Lambda", "No server management; auto-scale to traffic spikes"],
                ["Image/video processing", "S3 trigger → Lambda", "Event-driven, pay only when processing"],
                ["Scheduled jobs (cron)", "EventBridge scheduled rule → Lambda", "No always-on EC2 for periodic tasks"],
                ["Data pipeline", "Kinesis/SQS → Lambda → DynamoDB/S3", "Elastic, pay per record processed"],
                ["Webhooks", "API Gateway → Lambda → action", "Lightweight, scales to burst events"],
                ["Auth flow", "Cognito triggers → Lambda", "Custom auth logic without servers"],
                ["Notifications", "EventBridge → SNS → SQS → Lambda", "Fan-out, guaranteed delivery"],
              ]}
            />
          </section>
        </section>
      </section>

      {/* ─── INFRASTRUCTURE AS CODE ───────────────────────────────────────── */}
      <section id="infrastructure-as-code">
        <h2 style={S.h2}>Infrastructure as Code</h2>

        <section id="iac-why">
          <h3 style={S.h3}>Why Infrastructure as Code</h3>
          <p style={S.p}>
            Manual AWS console clicks are not reproducible, auditable or version-controlled. Every production environment eventually faces these problems: "Who created this VPC and why?" "How is the staging environment different from production?" "What is the encryption config of this S3 bucket?"
          </p>
          <p style={S.p}>
            IaC solves these problems — define infrastructure in code, track it in version control, automate deployments. Benefits: repeatability (same template → same infra every time), drift detection, rollback, living documentation, GitOps (PR-based review), CI/CD integration.
          </p>
          <Callout type="important" title="IaC from Day One">
            Production AWS environments without IaC eventually become unmaintainable. Console clicks are not tracked and not reproducible. Adopt IaC from the start of the project — migrating later is painful.
          </Callout>
        </section>

        <section id="cloudformation">
          <h3 style={S.h3}>AWS CloudFormation</h3>
          <p style={S.p}>
            CloudFormation is AWS's native IaC service — define resources in YAML or JSON templates, and CloudFormation deploys Stacks. Directly managed as an AWS service — no additional tool install needed.
          </p>
          <ul style={S.ul}>
            <li><strong>Template:</strong> YAML/JSON file — Resources, Parameters, Outputs, Mappings, Conditions sections</li>
            <li><strong>Stack:</strong> A group of resources created from a template — created, updated and deleted atomically</li>
            <li><strong>Stack Sets:</strong> Deploy the same stack across multiple accounts + Regions — organization-wide infra</li>
            <li><strong>Change Sets:</strong> Preview what will change before applying — critical in production</li>
            <li><strong>Drift Detection:</strong> Detect manual changes made from the console — generates a drift report</li>
            <li><strong>Rollback:</strong> On a failed update, automatic rollback to the previous successful state</li>
          </ul>
          <p style={S.p}>
            Choose CloudFormation when: AWS-only environment, no HashiCorp dependency, native AWS integration (StackSets for multi-account), serverless application model (SAM — CloudFormation extension for Lambda).
          </p>
        </section>

        <section id="terraform">
          <h3 style={S.h3}>Terraform</h3>
          <p style={S.p}>
            Terraform is HashiCorp's open-source IaC tool — multi-cloud, with 1000+ providers (AWS, Azure, GCP, Kubernetes, databases). Resources are defined in HCL (HashiCorp Configuration Language).
          </p>
          <ul style={S.ul}>
            <li><strong>Provider:</strong> The AWS provider manages resources — aws_vpc, aws_instance, aws_rds_cluster etc</li>
            <li><strong>State File:</strong> Terraform tracks the current state — remote state in S3 + DynamoDB locking (for team collaboration)</li>
            <li><strong>Plan:</strong> <code>terraform plan</code> → preview changes before apply (CloudFormation Change Sets equivalent)</li>
            <li><strong>Apply:</strong> <code>terraform apply</code> → execute the changes</li>
            <li><strong>Modules:</strong> Reusable infrastructure components — VPC module, EC2 module. Public modules available from the Terraform Registry.</li>
          </ul>
          <p style={S.p}>
            Choose Terraform when: multi-cloud environment, existing Terraform skills/modules, managing Kubernetes + AWS together, strong community ecosystem needed.
          </p>
        </section>

        <section id="aws-cdk">
          <h3 style={S.h3}>AWS CDK</h3>
          <p style={S.p}>
            AWS CDK (Cloud Development Kit) is a code-first IaC approach — define infra in TypeScript, Python, Java, C# or Go using real programming language constructs. CDK code compiles into CloudFormation templates.
          </p>
          <ul style={S.ul}>
            <li><strong>Constructs:</strong> Reusable CDK components — L1 (raw CloudFormation), L2 (opinionated defaults), L3 (complete patterns)</li>
            <li><strong>App:</strong> CDK application — contains one or more Stacks</li>
            <li><strong>Synth:</strong> <code>cdk synth</code> → generate the CloudFormation template</li>
            <li><strong>Deploy:</strong> <code>cdk deploy</code> → synthesize + deploy</li>
            <li><strong>Benefit:</strong> Real language = loops, conditions, abstractions, unit tests on infra</li>
          </ul>
        </section>

        <section id="iac-change-management">
          <h3 style={S.h3}>IaC Change Management and Best Practices</h3>
          <ul style={S.ul}>
            <li><strong>Version Control:</strong> IaC code in Git — every infrastructure change approved through a PR</li>
            <li><strong>Branches:</strong> dev/staging/prod environments → separate branches or workspaces</li>
            <li><strong>CI/CD for IaC:</strong> PR → automated <code>plan</code> output → review → merge → auto <code>apply</code></li>
            <li><strong>State locking:</strong> Terraform: DynamoDB lock; CloudFormation: native stack locking</li>
            <li><strong>Secrets:</strong> Do not hardcode secrets in IaC — reference Secrets Manager or Parameter Store</li>
            <li><strong>Modular structure:</strong> Networking, compute, database — separate modules/stacks. Dependencies explicit.</li>
            <li><strong>Tagging via IaC:</strong> Enforce tags in IaC templates — manual tagging is unreliable</li>
          </ul>
          <ComparisonTable
            headers={["Tool", "AWS Native?", "Language", "State Management", "Best For"]}
            rows={[
              ["CloudFormation", "Yes", "JSON / YAML", "AWS managed (no state file)", "AWS-only, StackSets, SAM"],
              ["Terraform", "No (multi-cloud)", "HCL", "State file (S3 + DynamoDB)", "Multi-cloud, large ecosystem"],
              ["AWS CDK", "Yes (generates CF)", "Python, TypeScript, Java...", "AWS managed (via CF)", "Code-first, developer teams"],
            ]}
          />
        </section>
      </section>

      {/* ─── MIGRATION ────────────────────────────────────────────────────── */}
      <section id="migration">
        <h2 style={S.h2}>Migration Strategies</h2>

        <section id="migration-6r">
          <h3 style={S.h3}>7 Rs Migration Framework</h3>
          <p style={S.p}>
            There are multiple strategies for migrating from a traditional DC to AWS — the "7 Rs" framework. Every application deserves its own strategy:
          </p>
          <ComparisonTable
            headers={["Strategy", "What It Means", "Effort", "Cloud Benefit", "When to Choose"]}
            rows={[
              ["Retire", "Decommission unused applications", "None", "Cost savings immediately", "Application no longer needed"],
              ["Retain", "Keep on-premises", "None", "Risk avoidance", "Compliance, latency, not ready"],
              ["Rehost (Lift & Shift)", "Move to EC2 as-is, minimal changes", "Low", "Fast, operational savings", "Speed over optimization, legacy apps"],
              ["Replatform (Lift & Tinker)", "Minor optimization (RDS instead of self-managed DB)", "Medium", "Managed service benefits", "Some cloud benefit without re-arch"],
              ["Repurchase", "Move to SaaS", "Medium", "Zero infrastructure", "HR, CRM, email — commodity software"],
              ["Refactor/Re-architect", "Redesign for cloud-native", "High", "Max scalability/agility", "Strategic applications, long-term"],
              ["Relocate", "VMware Cloud on AWS", "Low", "Same tools, cloud location", "Existing VMware investment"],
            ]}
          />
          <Callout type="important" title="Rehost First, Optimize Later">
            Many enterprises start with Rehost — move to the cloud quickly, then Replatform/Refactor gradually. Refactoring first is expensive and risky. Lift-and-shift first = faster results.
          </Callout>
        </section>

        <section id="migration-hub">
          <h3 style={S.h3}>AWS Migration Hub</h3>
          <p style={S.p}>
            Migration Hub is a single dashboard that tracks the progress of all migration tools — Application Migration Service, DMS and partner tools are all aggregated here. Application grouping, dependency mapping, migration status tracking.
          </p>
          <p style={S.p}>
            Migration Hub Strategy Recommendations: analyzes existing applications (via the AWS Collector agent) and suggests a recommended migration strategy for each application.
          </p>
        </section>

        <section id="application-migration-service">
          <h3 style={S.h3}>AWS Application Migration Service (MGN)</h3>
          <p style={S.p}>
            MGN is a server replication + cutover tool — continuously replicate physical, virtual (VMware, Hyper-V) or cloud servers to EC2. Minimal downtime at cutover time.
          </p>
          <ul style={S.ul}>
            <li>The AWS Replication Agent is installed on the on-prem server</li>
            <li>Continuous block-level replication to AWS (encrypted)</li>
            <li>Test launches → validate environment before actual cutover</li>
            <li>Cutover window: minutes (final delta sync + DNS change)</li>
            <li>This is the fastest tool for lift-and-shift from a traditional DC</li>
          </ul>
        </section>

        <section id="database-migration-service">
          <h3 style={S.h3}>AWS Database Migration Service (DMS)</h3>
          <p style={S.p}>
            DMS migrates from a source database to a target database — homogeneous (MySQL → RDS MySQL) or heterogeneous (Oracle → Aurora PostgreSQL) migrations.
          </p>
          <ul style={S.ul}>
            <li><strong>Full Load:</strong> Migrate existing data — initial bulk load</li>
            <li><strong>CDC (Change Data Capture):</strong> Replicate ongoing changes — minimal downtime migration</li>
            <li><strong>Schema Conversion Tool (SCT):</strong> Heterogeneous: converts Oracle/SQL Server stored procedures and functions into PostgreSQL/MySQL compatible code</li>
            <li><strong>Replication Instance:</strong> A DMS managed EC2 instance that performs the migration — its size depends on data volume/rate</li>
          </ul>
        </section>

        <section id="snowball">
          <h3 style={S.h3}>AWS Snowball and Snowmobile</h3>
          <p style={S.p}>
            Large data transfer over the Internet is impractical when terabytes/petabytes need to be migrated — due to bandwidth limitations and time. Physical data transfer devices:
          </p>
          <ComparisonTable
            headers={["Device", "Capacity", "Use Case", "Compute"]}
            rows={[
              ["Snowball Edge Storage Optimized", "80TB usable", "Petabyte-scale migration", "Limited (EC2-compatible workloads)"],
              ["Snowball Edge Compute Optimized", "28TB usable + GPU option", "Edge compute + data transfer", "Full EC2 + optional GPU"],
              ["Snowcone", "8TB HDD / 14TB SSD", "Small, rugged, remote locations", "2 vCPU, 4GB RAM"],
              ["Snowmobile", "100 PB (literal 45-foot shipping container + truck)", "Exabyte-scale DC migration", "None — pure storage"],
            ]}
          />
          <p style={S.p}>
            Workflow: AWS delivers a Snowball device → copy the data → ship the device back to AWS → AWS imports it into S3/Glacier. Encrypted at rest (AES-256) and in transit. The physical shipper equivalent for traditional DC-to-DC data migration.
          </p>
        </section>

        <section id="migration-workflow">
          <h3 style={S.h3}>Enterprise Migration Workflow</h3>
          <p style={S.p}>
            Typical enterprise migration project phases:
          </p>
          <ol style={{ ...S.ul, listStyleType: "decimal" }}>
            <li><strong>Assess:</strong> Discovery — application inventory, dependency mapping, TCO analysis. Tools: Migration Hub, Application Discovery Service, 3rd party (Cloudamize, Movere).</li>
            <li><strong>Mobilize:</strong> Landing Zone setup — multi-account structure (Control Tower), networking (Transit Gateway, DX), security baseline (SCPs, GuardDuty). IaC templates ready.</li>
            <li><strong>Migrate:</strong> Wave-based migration — prioritize by risk/complexity. Rehost first (MGN). Validate each wave. Parallel run period.</li>
            <li><strong>Optimize:</strong> Right-size EC2 (Compute Optimizer), Reserved Instances, modernize (Replatform/Refactor selected apps), cost governance.</li>
          </ol>
        </section>
      </section>

      {/* ─── SECURITY ADVANCED ────────────────────────────────────────────── */}
      <section id="security-advanced">
        <h2 style={S.h2}>Security — Defense in Depth</h2>
        <p style={S.p}>
          AWS security follows a defense-in-depth approach — multiple layers, no single layer is perfect. The cloud equivalent of traditional DC security layers:
        </p>
        <Figure caption="AWS security layers: Organizations/SCP, WAF/Shield, VPC security, IAM, data protection, threat detection">
          <SecurityLayersDiagram />
        </Figure>

        <section id="kms">
          <h3 style={S.h3}>AWS KMS — Key Management Service</h3>
          <p style={S.p}>
            KMS is a managed cryptographic key service — create, manage and use encryption keys without managing the key material yourself. The cloud equivalent of a traditional DC HSM (Hardware Security Module).
          </p>
          <ul style={S.ul}>
            <li><strong>CMK (Customer Master Key):</strong> Master key — it does not encrypt data directly; it generates data keys (envelope encryption)</li>
            <li><strong>Envelope Encryption:</strong> KMS CMK → generate data key → encrypt data with the data key → store the encrypted data key + ciphertext. Decrypt: decrypt the data key via KMS → decrypt the data with the data key</li>
            <li><strong>AWS Managed Keys:</strong> Created/rotated automatically for AWS services (S3, EBS, RDS) — no management needed</li>
            <li><strong>Customer Managed Keys:</strong> You control rotation, deletion, access policy — for compliance requirements</li>
            <li><strong>Key Policies:</strong> Different from IAM policies — a resource-based policy is mandatory on KMS keys</li>
          </ul>
          <p style={S.p}>
            Integration: S3 SSE-KMS, EBS encryption, RDS encryption, Secrets Manager, CloudTrail log encryption — all use KMS. KMS key deletion is scheduled (7-30 days wait) — protection against accidental deletion.
          </p>
        </section>

        <section id="secrets-manager">
          <h3 style={S.h3}>AWS Secrets Manager</h3>
          <p style={S.p}>
            Secrets Manager securely stores and automatically rotates sensitive credentials (database passwords, API keys, OAuth tokens). Equivalent of traditional DC CyberArk / HashiCorp Vault.
          </p>
          <ul style={S.ul}>
            <li><strong>Storage:</strong> Encrypted with KMS; versioned; audit via CloudTrail</li>
            <li><strong>Automatic Rotation:</strong> Delegated to a Lambda function — RDS passwords, OAuth tokens, custom secrets</li>
            <li><strong>Cross-account access:</strong> Applications in other accounts can access secrets via a resource policy</li>
            <li><strong>Integration:</strong> RDS, Redshift, DocumentDB native rotation; custom Lambda for others</li>
          </ul>
          <p style={S.p}>
            Never hardcode credentials in code or environment variables. Reference Secrets Manager from the application — make an SDK call and you get fresh credentials. Rotation is transparent to the application.
          </p>
        </section>

        <section id="acm">
          <h3 style={S.h3}>AWS Certificate Manager (ACM)</h3>
          <p style={S.p}>
            ACM provisions, manages and deploys TLS/SSL certificates — free public certificates, auto-renewal, direct ALB/CloudFront/API Gateway integration.
          </p>
          <ul style={S.ul}>
            <li><strong>Public Certificates:</strong> Free for AWS services — ALB, CloudFront, API Gateway. Auto-renewed before expiry.</li>
            <li><strong>Private CA (ACM PCA):</strong> Internal PKI — private certificates for internal services, mTLS, code signing</li>
            <li><strong>Validation:</strong> DNS validation (Route 53 auto-configures it, recommended) or email validation</li>
            <li><strong>Note:</strong> ACM certificates cannot be attached directly to EC2 — only with integrated AWS services. On EC2, use your own certs (import them into ACM or self-manage).</li>
          </ul>
          <p style={S.p}>
            Certificate expiry monitoring: ACM auto-renews managed certs. Imported certs: configure expiry alerts via CloudWatch Events. In a traditional DC, cert expiry monitoring is often manual — ACM eliminates this pain.
          </p>
        </section>

        <section id="guardduty">
          <h3 style={S.h3}>Amazon GuardDuty</h3>
          <p style={S.p}>
            GuardDuty is an intelligent threat detection service — it continuously analyzes CloudTrail, VPC Flow Logs, DNS logs and EKS audit logs. It detects anomalies using machine learning + threat intelligence feeds.
          </p>
          <ul style={S.ul}>
            <li><strong>Threat types:</strong> Unauthorized IAM activity, EC2 instance communicating with known malicious IPs, cryptocurrency mining, compromised credentials, data exfiltration patterns</li>
            <li><strong>No agent:</strong> Agentless — it only analyzes logs. Enable it, and that is it.</li>
            <li><strong>Findings:</strong> Severity (low/medium/high), description, affected resource, recommended action</li>
            <li><strong>Integration:</strong> EventBridge → Lambda → auto-remediate (isolate instance, revoke credentials)</li>
            <li><strong>Multi-account:</strong> Organizations-wide GuardDuty — delegated admin account centrally manages</li>
          </ul>
          <p style={S.p}>
            Threat intelligence feed + log correlation on a traditional DC SIEM = a similar concept, but GuardDuty is AWS-aware — it understands IAM activity patterns and AWS-specific attack vectors.
          </p>
        </section>

        <section id="inspector">
          <h3 style={S.h3}>Amazon Inspector</h3>
          <p style={S.p}>
            Inspector is an automated vulnerability assessment service — it continuously scans EC2 instances, container images (ECR) and Lambda functions for CVEs and network exposure.
          </p>
          <ul style={S.ul}>
            <li><strong>EC2:</strong> Scan OS packages and application packages for known CVEs</li>
            <li><strong>ECR:</strong> Automatic scan when a container image is pushed — integrate into the CI/CD pipeline</li>
            <li><strong>Lambda:</strong> Vulnerabilities in function code + layers</li>
            <li><strong>CVSS scoring:</strong> Prioritized findings — fix critical ones first</li>
            <li><strong>SSM Agent required:</strong> The SSM Agent must be installed for EC2 scanning</li>
          </ul>
          <p style={S.p}>
            The equivalent of a traditional DC vulnerability scanner (Nessus, Qualys, Tenable) — but agentless for containers, automatically integrated with the ECR pipeline.
          </p>
        </section>

        <section id="security-hub">
          <h3 style={S.h3}>AWS Security Hub</h3>
          <p style={S.p}>
            Security Hub is an aggregator — it collects findings from GuardDuty, Inspector, Macie, IAM Access Analyzer, Firewall Manager and partner solutions in one place. It also has CSPM (Cloud Security Posture Management) functionality.
          </p>
          <ul style={S.ul}>
            <li><strong>Security Standards:</strong> CIS AWS Foundations, AWS Foundational Security Best Practices, PCI DSS — automated compliance checks</li>
            <li><strong>Findings Aggregation:</strong> Multi-account, multi-region — centralized SOC view</li>
            <li><strong>Insights:</strong> Pre-built queries — "EC2 instances with critical findings", "IAM users without MFA"</li>
            <li><strong>EventBridge integration:</strong> Findings → automated remediation workflows</li>
          </ul>
        </section>

        <section id="waf-shield">
          <h3 style={S.h3}>AWS WAF and AWS Shield</h3>
          <p style={S.p}>
            <strong>AWS WAF (Web Application Firewall):</strong> Inspects and filters Layer 7 HTTP/HTTPS traffic. Deployed with CloudFront, ALB, API Gateway, AppSync.
          </p>
          <ul style={S.ul}>
            <li>Rules: SQLi protection, XSS protection, geo-blocking, IP reputation lists, rate limiting (per-IP), custom rules</li>
            <li>Managed Rule Groups: pre-built rules from AWS and 3rd parties (Cloudflare, F5, Imperva) — enable them immediately</li>
            <li>Bot Control: Identify and manage automated bot traffic (crawlers, scrapers, credential stuffing)</li>
            <li>CAPTCHA integration: CAPTCHA challenge on suspicious requests</li>
          </ul>
          <p style={S.p}>
            <strong>AWS Shield:</strong> DDoS protection service.
          </p>
          <ul style={S.ul}>
            <li><strong>Shield Standard:</strong> Automatically enabled for all AWS customers — L3/L4 DDoS protection (SYN floods, UDP reflection, volumetric attacks). No additional cost.</li>
            <li><strong>Shield Advanced:</strong> L3/L4/L7 protection, DDoS Response Team (DRT) access 24/7, cost protection (AWS credits during attack), Global Accelerator and Route 53 protection, real-time metrics. Annual commitment required.</li>
          </ul>
          <p style={S.p}>
            Traditional DC: on-path WAF appliance (F5 ASM, Imperva) + upstream DDoS scrubbing center (Akamai, Cloudflare). In AWS: WAF + Shield = the same protection, managed, auto-scale.
          </p>
        </section>

        <p style={S.p}>
          Multi-account security best practice: separate accounts for production, dev, security tooling, log archive. SCPs prevent anyone from disabling security services (GuardDuty, CloudTrail). Security Hub aggregates across accounts. Write CloudTrail logs to a centralized log archive account — to prevent tampering.
        </p>
      </section>

      {/* ─── COST AWARENESS ───────────────────────────────────────────────── */}
      <section id="cost-awareness">
        <h2 style={S.h2}>Cost Optimization</h2>
        <p style={S.p}>
          Cloud cost awareness is essential for infrastructure engineers — architecture decisions directly affect cost. Current prices are on the AWS pricing page (we do not provide them here — prices change).
        </p>
        <ComparisonTable
          headers={["Cost Driver", "Billing Basis", "Engineering Implication"]}
          rows={[
            ["EC2 compute", "Per hour/second (instance type)", "Stop unused instances; right-size; Spot for fault-tolerant"],
            ["EBS storage", "Per GB-month (volume type)", "Delete unused volumes; snapshots accumulate cost"],
            ["S3 storage", "Per GB-month + request count + data transfer out", "Lifecycle policies for archival; CRR costly"],
            ["NAT Gateway", "Per hour + per GB processed", "High-volume: Gateway endpoints for S3/DDB, VPC endpoints"],
            ["Data transfer", "Internet egress, cross-AZ, cross-region", "Cross-AZ has per-GB cost — place resources same AZ where possible"],
            ["Load Balancer", "Per hour + LCUs (capacity units)", "Idle LBs still billed — consolidate"],
            ["RDS", "Per hour + storage + I/O + backup storage", "Multi-AZ = 2x instance cost; Reserved Instances for savings"],
          ]}
        />

        <section id="cost-tools">
          <h3 style={S.h3}>Cost Explorer</h3>
          <p style={S.p}>
            Cost Explorer is a visual analytics tool — analyze historical spend, view the service-level breakdown, forecast future costs. Filters: by service, linked account, region, tag, usage type.
          </p>
          <ul style={S.ul}>
            <li>Savings Plan purchase recommendations: based on past 7/14/30 days usage</li>
            <li>RI purchase recommendations: service + instance type + region specific</li>
            <li>Anomaly Detection: unexpected cost spikes automatically alert</li>
          </ul>

          <h3 style={S.h3}>AWS Budgets</h3>
          <p style={S.p}>
            Set budget thresholds — alerts on actual or forecast spend. Types: Cost budget (alert when spend exceeds X), Usage budget (on specific service usage), RI/SP utilization budget (alert when reserved capacity is under-utilized).
          </p>
          <p style={S.p}>
            Action: automatically trigger an action on a budget breach — apply an IAM policy (restrict new resource creation), stop EC2/RDS instances, SNS notification → Lambda remediation.
          </p>

          <h3 style={S.h3}>Reserved Instances and Savings Plans</h3>
          <ComparisonTable
            headers={["Commitment Type", "Flexibility", "Discount", "Best For"]}
            rows={[
              ["On-Demand", "Maximum — no commitment", "0%", "Unpredictable, short workloads"],
              ["Standard RI (1yr)", "Instance type in Region locked", "~40%", "Steady EC2, specific instance family"],
              ["Convertible RI (1yr)", "Can exchange for different type", "~30%", "Steady EC2, some flexibility needed"],
              ["Compute Savings Plan (1yr)", "Any EC2, Lambda, Fargate", "~66%", "Flexible compute mix"],
              ["EC2 Instance Savings Plan (1yr)", "Specific instance family in Region", "~72%", "Predictable EC2 family usage"],
              ["Standard RI (3yr)", "Locked, 3yr commitment", "~60-72%", "Very long-term steady state"],
            ]}
          />

          <h3 style={S.h3}>Rightsizing and Compute Optimization</h3>
          <ul style={S.ul}>
            <li><strong>Compute Optimizer:</strong> Analyzes CloudWatch metrics to give right-size recommendations for EC2, ASG, EBS, Lambda. Identify over-provisioned instances — downsize them and save.</li>
            <li><strong>Instance type changes:</strong> m5.xlarge → m6i.large (newer gen, same cost, better performance)</li>
            <li><strong>Graviton (ARM):</strong> Same workload, 20-40% cheaper. Java, Python, Go, .NET workloads well-supported.</li>
            <li><strong>Spot for appropriate workloads:</strong> Batch, CI/CD runners, dev environments — 60-90% savings</li>
          </ul>

          <h3 style={S.h3}>Storage Cost Optimization</h3>
          <ul style={S.ul}>
            <li><strong>S3 Intelligent-Tiering:</strong> Automatically move objects between tiers — zero retrieval cost for frequent access tier</li>
            <li><strong>EBS unattached volumes:</strong> When EC2 is terminated, volumes are often orphaned — audit regularly</li>
            <li><strong>EBS snapshot lifecycle:</strong> Delete old snapshots — DLM (Data Lifecycle Manager) automates this</li>
            <li><strong>EBS gp2 → gp3 migration:</strong> gp3 gives the same performance cheaper — migrate existing gp2 volumes</li>
          </ul>

          <h3 style={S.h3}>Trusted Advisor</h3>
          <p style={S.p}>
            Trusted Advisor performs automated best practice checks — five categories: Cost Optimization, Performance, Security, Fault Tolerance, Service Limits. Free tier: limited checks. Business/Enterprise support: all checks available.
          </p>
          <p style={S.p}>
            Cost Optimization checks: idle EC2 instances (CPU below threshold), unused Elastic IPs, underutilized EBS volumes, unused RIs. Security checks: open Security Groups, MFA on root. Action: implement the recommendations → re-check.
          </p>

          <Callout type="important" title="FinOps from Day One">
            Adding cloud cost governance post-launch is hard. Enforce tagging from day one — via AWS Config rules. Set budget alerts before the first deploy. Estimate cost impact in architecture reviews. Cloud cost = engineering responsibility, not just the finance team's.
          </Callout>
        </section>
      </section>

      {/* ─── WELL-ARCHITECTED ─────────────────────────────────────────────── */}
      <section id="well-architected">
        <h2 style={S.h2}>AWS Well-Architected Framework</h2>
        <p style={S.p}>
          The AWS Well-Architected Framework defines six pillars that measure cloud architecture quality. For an infrastructure engineer this is a practical design checklist:
        </p>
        <Figure caption="AWS Well-Architected Framework: six pillars with practical examples for DC engineers">
          <WellArchitectedDiagram />
        </Figure>

        <section id="wa-operational-excellence">
          <h3 style={S.h3}>Pillar 1: Operational Excellence</h3>
          <p style={S.p}>
            Run systems, monitor them, and continuously improve them. Treat operations like code delivery.
          </p>
          <ul style={S.ul}>
            <li><strong>IaC mandatory:</strong> All changes via code — no manual console clicks in production</li>
            <li><strong>Frequent small changes:</strong> Large infrequent deployments are risky — small, reversible deployments via a CI/CD pipeline</li>
            <li><strong>Runbooks:</strong> Documented procedures for routine operations — onboarding new team member, deployment, rollback</li>
            <li><strong>Postmortems (blameless):</strong> Every incident → root cause analysis → process improvement. Do not blame people; fix the systems.</li>
            <li><strong>CloudWatch dashboards:</strong> Real-time visibility — key metrics always visible to operations team</li>
          </ul>
        </section>

        <section id="wa-security">
          <h3 style={S.h3}>Pillar 2: Security</h3>
          <p style={S.p}>
            Security at every layer — identity, infrastructure, data, applications, monitoring.
          </p>
          <ul style={S.ul}>
            <li><strong>Strong identity:</strong> IAM roles everywhere, MFA on all humans, no long-lived access keys in code</li>
            <li><strong>Enable traceability:</strong> CloudTrail + VPC Flow Logs + GuardDuty always on — never turn them off</li>
            <li><strong>Security at all layers:</strong> Edge (WAF/Shield) + Network (SG/NACL) + Instance (patching) + App + Data</li>
            <li><strong>Encrypt everything:</strong> S3 SSE-KMS, EBS encrypted, RDS encrypted, TLS in transit</li>
            <li><strong>Prepare for incidents:</strong> GuardDuty + Security Hub + automated response playbooks. Practice tabletop exercises.</li>
          </ul>
        </section>

        <section id="wa-reliability">
          <h3 style={S.h3}>Pillar 3: Reliability</h3>
          <p style={S.p}>
            Recover automatically from system failures. Scale horizontally. Test failure regularly.
          </p>
          <ul style={S.ul}>
            <li><strong>Test recovery procedures:</strong> A DR plan that has never been tested is not a plan — test it annually or quarterly</li>
            <li><strong>Scale horizontally:</strong> Single large server → multiple smaller servers behind an LB. Eliminate the single point of failure.</li>
            <li><strong>Stop guessing capacity:</strong> Demand-driven scaling with Auto Scaling — do not over-provision</li>
            <li><strong>Manage change in automation:</strong> Manual changes = errors. IaC + CI/CD = predictable changes</li>
            <li><strong>Chaos Engineering:</strong> Inject controlled failures in production (Chaos Monkey concept) — Netflix pioneered it, AWS Fault Injection Simulator tool available</li>
          </ul>
        </section>

        <section id="wa-performance">
          <h3 style={S.h3}>Pillar 4: Performance Efficiency</h3>
          <p style={S.p}>
            Choose the right resource type. Use managed services when appropriate. Monitor performance.
          </p>
          <ul style={S.ul}>
            <li><strong>Right resource types:</strong> Memory-intensive workload → r-series EC2, not t-series. Choose correctly first, then optimize.</li>
            <li><strong>Use managed services:</strong> RDS instead of self-managed MySQL on EC2 — AWS patches, backs up, multi-AZ manages</li>
            <li><strong>Serverless where appropriate:</strong> Lambda for event-driven — no idle cost, auto-scale</li>
            <li><strong>Go global in minutes:</strong> CloudFront + multi-region deployment — deliver content close to users</li>
            <li><strong>Benchmark and experiment:</strong> Establish performance baselines with CloudWatch metrics — measure the impact of changes</li>
          </ul>
        </section>

        <section id="wa-cost-optimization">
          <h3 style={S.h3}>Pillar 5: Cost Optimization</h3>
          <p style={S.p}>
            Use only the resources you need. Right-size. Adopt a consumption model.
          </p>
          <ul style={S.ul}>
            <li><strong>Adopt consumption model:</strong> Pay for what you use — shut down dev environments on nights/weekends</li>
            <li><strong>Measure overall efficiency:</strong> Track business outcome per dollar spent — not just total spend</li>
            <li><strong>Avoid undifferentiated heavy lifting:</strong> Use managed services — self-managing Kafka on EC2 vs Amazon MSK</li>
            <li><strong>Analyze spend:</strong> Cost Explorer weekly review. Anomaly alerts. Team-level chargebacks via tags.</li>
            <li><strong>Reserved capacity:</strong> 30-70% savings with RIs/Savings Plans on steady-state workloads</li>
          </ul>
        </section>

        <section id="wa-sustainability">
          <h3 style={S.h3}>Pillar 6: Sustainability</h3>
          <p style={S.p}>
            Minimize environmental impact — in the cloud this is achieved by maximizing resource efficiency.
          </p>
          <ul style={S.ul}>
            <li><strong>Managed services:</strong> Better hardware utilization than dedicated servers — AWS shared infrastructure more efficient</li>
            <li><strong>Right-size workloads:</strong> Oversized instances waste energy — follow Compute Optimizer recommendations</li>
            <li><strong>Graviton (ARM) processors:</strong> Same performance, 20-60% less energy than x86</li>
            <li><strong>Minimize data movement:</strong> Data transfer = energy. Prefer same-region, same-AZ resources where latency allows.</li>
            <li><strong>Region selection:</strong> AWS Regions differ in renewable energy use — sustainability-focused Regions exist (e.g., EU regions)</li>
          </ul>
        </section>

        <p style={S.p}>
          The AWS Well-Architected Tool (free, in console) reviews workloads against these six pillars — answer the questions and you get improvement recommendations. Track milestones — a quarterly review is recommended.
        </p>
      </section>

      {/* ─── ARCHITECTURE EXAMPLES ────────────────────────────────────────── */}
      <section id="architecture-examples">
        <h2 style={S.h2}>Architecture Examples</h2>

        <section id="small-web-app">
          <h3 style={S.h3}>Small Web Application</h3>
          <p style={S.p}>
            A simple web application — a startup or an internal tool. Cost-optimized, low-complexity.
          </p>
          <ul style={S.ul}>
            <li><strong>Why this architecture:</strong> Low traffic, budget-conscious, single developer/small team. Simplicity over redundancy initially.</li>
            <li>Route 53 → CloudFront → ALB → single EC2 (t3.medium, AZ-a)</li>
            <li>RDS (single-AZ — cost saving for non-critical) in private subnet</li>
            <li>S3 for static assets (images, CSS, JS) — serve them via CloudFront</li>
            <li>Certificate Manager → ALB HTTPS termination. No HTTP.</li>
            <li>CloudWatch basic monitoring + billing alarm</li>
            <li><strong>Limitation:</strong> Single-AZ = AZ failure → outage. Acceptable for non-critical internal tools. For production customer-facing workloads → upgrade to Multi-AZ.</li>
          </ul>
        </section>

        <section id="three-tier">
          <h3 style={S.h3}>Three-Tier Enterprise Application</h3>
          <p style={S.p}>
            The classic enterprise three-tier architecture in AWS — HA, scalable, secure.
          </p>
          <p style={S.p}>
            <strong>Why this architecture:</strong> Production workload, customer-facing, SLA requirement. Each tier independently scalable, failure isolated.
          </p>
          <ul style={S.ul}>
            <li><strong>Presentation tier:</strong> CloudFront (CDN, WAF) → ALB → EC2 web instances (AZ-a, AZ-b) in public subnets. SG: port 443 inbound from CloudFront IPs. ASG min 2.</li>
            <li><strong>Application tier:</strong> Internal ALB → EC2 app instances in private subnets (AZ-a, AZ-b). SG: port 8080 from web tier SG only. No public IP. ASG min 2.</li>
            <li><strong>Data tier:</strong> RDS Multi-AZ (primary AZ-a, standby AZ-b) in DB private subnets. ElastiCache Redis (Multi-AZ) for session/cache. SG: DB port from app tier SG only.</li>
            <li><strong>Connectivity:</strong> Route 53 → CloudFront → ALB. NAT Gateway per AZ for outbound. VPN/DX to on-prem if needed.</li>
            <li><strong>Security:</strong> WAF on CloudFront. Security Groups tiered (no direct internet → app, no app → DB except app SG). KMS encryption at rest. Secrets Manager for DB passwords.</li>
            <li><strong>Observability:</strong> CloudWatch alarms on all tiers (CPU, LB 5xx, DB connections). VPC Flow Logs. CloudTrail. Application logs → CloudWatch Logs via Agent. GuardDuty enabled.</li>
          </ul>
        </section>

        <section id="highly-available-production">
          <h3 style={S.h3}>Highly Available Production Architecture</h3>
          <p style={S.p}>
            Maximum HA within a single Region — designed for 99.99% uptime target. Failure domain isolation at every layer.
          </p>
          <p style={S.p}>
            <strong>Why this architecture:</strong> Financial services, e-commerce, healthcare — any downtime has major business impact. Cost higher but business requirement justifies it.
          </p>
          <ul style={S.ul}>
            <li>3 AZs — all tiers spread across AZ-a, AZ-b, AZ-c</li>
            <li>NAT Gateway per AZ (3 NAT GWs) — no cross-AZ dependency</li>
            <li>Aurora Multi-AZ cluster (3 copies of data across 3 AZs) — faster failover than RDS Multi-AZ</li>
            <li>ElastiCache Redis cluster mode — sharded + replicated across AZs</li>
            <li>ASG min 3 (one per AZ), health check on LB</li>
            <li>Route 53 health checks → failover routing as extra layer</li>
            <li>CloudFront → always serves cached content during origin issues</li>
            <li>AWS Backup → daily automated backups with cross-region copy</li>
          </ul>
        </section>

        <section id="multi-region-architecture">
          <h3 style={S.h3}>Multi-Region Architecture</h3>
          <p style={S.p}>
            Multi-region deployment — geographic DR + global latency reduction.
          </p>
          <p style={S.p}>
            <strong>Why this architecture:</strong> Global users (US + India + EU simultaneously), regulatory data residency, RPO/RTO near-zero requirement.
          </p>
          <ul style={S.ul}>
            <li><strong>Active-Passive DR:</strong> Primary Region (ap-south-1) fully active. DR Region (us-east-1) Pilot Light/Warm Standby. Route 53 failover routing. RDS cross-region read replica (manual promote on DR).</li>
            <li><strong>Active-Active global:</strong> Route 53 latency-based routing → nearest Region. DynamoDB Global Tables (multi-region sync). S3 Cross-Region Replication. Application stateless with global DB. Much more complex to manage.</li>
            <li><strong>Data synchronization challenge:</strong> Write conflicts are possible in active-active — design the application carefully. DynamoDB Global Tables are last-writer-wins by default.</li>
            <li><strong>Cost:</strong> 2x infrastructure + cross-region data transfer costs. Calculate ROI vs downtime cost.</li>
          </ul>
          <Callout type="warning" title="Multi-Region Complexity">
            Multi-region active-active is an advanced pattern — for experienced teams. Start with single region HA, then consider multi-region DR. Even without multi-region active-active, single-region HA solves a lot of problems.
          </Callout>
        </section>

        <section id="hybrid-dc-example">
          <h3 style={S.h3}>Hybrid Data Center Integration</h3>
          <p style={S.p}>
            The enterprise hybrid pattern — on-prem DC and AWS running simultaneously. Most enterprise AWS journeys start here.
          </p>
          <p style={S.p}>
            <strong>Why this architecture:</strong> Both on-prem and AWS applications exist — gradual migration, compliance requirements to keep some data on-prem, latency-sensitive workloads on-prem.
          </p>
          <ul style={S.ul}>
            <li>Direct Connect (primary, 1Gbps) + Site-to-Site VPN (backup) → Transit Gateway → VPC attachments</li>
            <li>On-prem AD → AWS IAM Identity Center via SAML federation — single identity across both</li>
            <li>Route 53 Resolver Endpoints — bidirectional DNS between on-prem and AWS private zones</li>
            <li>Storage Gateway — on-prem file shares → S3 for archival and backup</li>
            <li>AWS Outposts — latency-sensitive applications on-prem, with the same AWS APIs</li>
            <li>Centralized logging: CloudTrail + VPC Flow Logs → S3 (separate log archive account)</li>
            <li>Security Hub + GuardDuty across all AWS accounts → SIEM integration via EventBridge</li>
          </ul>
          <Callout type="important" title="Hybrid Network Path Analysis">
            In a hybrid environment, trace the traffic path: on-prem router → DX/VPN → TGW → VPC route table → subnet route → SG check → NACL check → instance. Trace the return path in reverse. Asymmetric routing is a common issue — verify both directions explicitly.
          </Callout>
        </section>
      </section>

      {/* ─── BEST PRACTICES ───────────────────────────────────────────────── */}
      <section id="best-practices">
        <h2 style={S.h2}>Operational Best Practices</h2>
        <ComparisonTable
          headers={["Area", "Best Practice", "Why"]}
          rows={[
            ["Naming", "Consistent naming: env-region-service-tier (e.g., prod-ap1-app-sg)", "Identify resources instantly; required for cost attribution"],
            ["Tagging", "Mandatory: Environment, Team, Application, CostCenter, Project tags", "Cost allocation, automation, access control by tag"],
            ["Multi-Account", "Separate accounts: prod/dev/staging/security/log-archive", "Blast radius reduction, clear billing, easier SCPs"],
            ["IaC", "All infra in CloudFormation/Terraform from day one", "Reproducible, auditable, version controlled"],
            ["Least Privilege", "Start with minimum permissions; expand as needed", "Breach impact minimized; compliance"],
            ["MFA", "MFA on root account + all human users; hardware token for root", "Credential compromise protection"],
            ["Encryption", "Encrypt at rest (KMS) + in transit (TLS) by default", "Data protection, compliance baseline"],
            ["Backup", "Automated backups + tested restore + cross-region copy", "DR readiness — untested backup is not a backup"],
            ["Monitoring", "CloudWatch alarms on all critical metrics + on-call runbooks", "Detect before users do"],
            ["Patch", "EC2 patching via Systems Manager Patch Manager; automated", "Security hygiene; compliance"],
          ]}
        />
      </section>

      {/* ─── COMMON MISTAKES ──────────────────────────────────────────────── */}
      <section id="common-mistakes">
        <h2 style={S.h2}>Common Engineering Mistakes</h2>
        <ComparisonTable
          headers={["Mistake", "Problem", "Correct Approach"]}
          rows={[
            ["Overlapping VPC CIDRs", "VPC peering / TGW impossible", "Plan CIDR ranges upfront; reserve unique /16 per VPC"],
            ["Public database", "RDS in public subnet, Security Group too open", "DB always in private subnet; SG only from app tier SG"],
            ["Overly permissive SG", "0.0.0.0/0 on port 22, 3389, DB ports", "Specific source IPs/SGs; use Systems Manager Session Manager instead of SSH"],
            ["Hardcoded credentials", "Access key in code/config/environment", "IAM roles everywhere; Secrets Manager for remaining secrets"],
            ["No Multi-AZ", "Single AZ = single AZ failure = full outage", "Multi-AZ for all stateful components in production"],
            ["No monitoring/alerting", "Problems detected by users first", "CloudWatch alarms with realistic thresholds from day one"],
            ["No backup testing", "Backups exist but restore never tested", "Test restore quarterly; measure actual RTO"],
            ["Missing NACL return rules", "Traffic works inbound but response drops", "NACL: always add ephemeral port range outbound"],
            ["Single NAT Gateway", "One NAT GW = single AZ dependency", "NAT GW per AZ for HA"],
            ["Root account in use", "Powerful credentials at risk", "MFA on root; lock it; use IAM users/roles for everything"],
            ["No IaC", "Console-created infra: untracked, not reproducible", "IaC from day one; console only for exploration"],
            ["Instance Store for persistent data", "Data lost on stop/terminate", "Always use EBS for persistent storage"],
          ]}
        />
      </section>

      {/* ─── TROUBLESHOOTING ──────────────────────────────────────────────── */}
      <section id="troubleshooting">
        <h2 style={S.h2}>Troubleshooting</h2>
        <p style={S.p}>
          AWS troubleshooting needs a systematic approach — Identify → Verify → Isolate → Measure → Analyze → Fix → Validate → Monitor. Skipping layers is dangerous.
        </p>

        <section id="ts-sequence">
          <h3 style={S.h3}>Systematic Sequence</h3>
          <ol style={{ ...S.ul, listStyleType: "decimal" }}>
            <li><strong>DNS resolving correctly?</strong> <code>nslookup</code> / <code>dig</code> — Does the Route 53 record exist? Correct IP? Is an old value cached due to TTL?</li>
            <li><strong>Public/private connectivity design correct?</strong> Is the IGW attached to the VPC? Does the public subnet have a route to the IGW?</li>
            <li><strong>Route table correct?</strong> Check the subnet's route table — is the required route present?</li>
            <li><strong>IGW/NAT path correct?</strong> For a public instance: IGW route + public IP. Private outbound: NAT GW route, NAT GW in the public subnet.</li>
            <li><strong>Security Group allows traffic?</strong> Stateful — check the inbound rule. Is the source IP/SG correct? Do protocol and port match exactly?</li>
            <li><strong>NACL allows traffic AND return path?</strong> Stateless — check both inbound and outbound. Are ephemeral ports allowed outbound?</li>
            <li><strong>Load Balancer healthy?</strong> LB status, listener rules, target group association, certificate valid?</li>
            <li><strong>Target registered and healthy?</strong> Target group health checks passing? Correct health check port/path configured?</li>
            <li><strong>EC2 instance running?</strong> Instance state Running — not stopped, terminated, pending.</li>
            <li><strong>OS/application listening?</strong> EC2 Running ≠ Application healthy. Is a process listening on the port? Has the application crashed? <code>ss -tlnp</code> or <code>netstat</code>.</li>
            <li><strong>Return routing correct?</strong> Can the instance route its response correctly — asymmetric path issues? Verify with VPC Flow Logs.</li>
            <li><strong>IAM permissions relevant?</strong> AccessDenied error? Check the IAM policy, role attachment, resource policy, SCP. Look for the API error in CloudTrail.</li>
            <li><strong>CloudWatch logs/metrics?</strong> Error pattern in application logs? Anomaly in metrics? REJECT entries in VPC Flow Logs?</li>
          </ol>
          <Figure caption="AWS troubleshooting layered diagnostic sequence — from DNS to OS/application, layer by layer">
            <TroubleshootingFlowDiagram />
          </Figure>
          <p style={S.p}>
            <strong>EC2 Troubleshooting:</strong> Status checks (System check = AWS infrastructure; Instance check = OS). Failed system check = AWS responsibility. Failed instance check = OS/software issue. System Log and Screenshot are available via the console without SSH.
          </p>
          <p style={S.p}>
            <strong>Storage Troubleshooting:</strong> EBS performance degraded → CloudWatch volume metrics (BurstBalance, IOps, Throughput). S3 access denied → bucket policy + IAM policy + ACL interaction check. EFS mount fails → Security Group (NFS port 2049), subnet routing.
          </p>
          <p style={S.p}>
            <strong>Hybrid Troubleshooting:</strong> DX/VPN path issues → BGP route advertisement, route table propagation, TGW route table, Security Groups from on-prem CIDRs, NACL return paths.
          </p>
        </section>
      </section>

      {/* ─── FAILURE SCENARIOS ────────────────────────────────────────────── */}
      <section id="failure-scenarios">
        <h2 style={S.h2}>Practical Failure Scenarios</h2>
        <ComparisonTable
          headers={["Scenario", "Symptom", "Layer", "What to Verify"]}
          rows={[
            ["EC2 stopped", "Connection refused/timeout", "Compute", "Instance state in console"],
            ["Security Group block", "Connection timeout (inbound blocked)", "Security", "SG inbound rules — protocol, port, source"],
            ["NACL blocks return", "Request received, no response", "Security", "NACL outbound rules — ephemeral port range (1024-65535)"],
            ["Wrong route table", "No route to host / timeout", "Network", "Subnet route table — required route present?"],
            ["Missing IGW", "Public instance unreachable", "Network", "IGW attached to VPC? Route table has IGW entry?"],
            ["NAT GW issue", "Private EC2 outbound fails", "Network", "NAT GW in public subnet, route in private subnet RT"],
            ["LB target unhealthy", "502 Bad Gateway / 503", "LB", "Target group health, health check port/path, app running"],
            ["DNS misconfigured", "Cannot resolve domain", "DNS", "Route 53 record, hosted zone, TTL, resolvers"],
            ["IAM AccessDenied", "403 Forbidden in API response", "IAM", "IAM policy, role attached, SCP boundary, resource policy"],
            ["Single AZ failure", "Partial degradation (multi-AZ design)", "Infrastructure", "ASG replacing in surviving AZ, LB routing away"],
            ["RDS failover", "DB connection drop then reconnect", "Database", "Application reconnect logic, DNS TTL for RDS endpoint"],
            ["Application crash", "HTTP 500 / no response", "Application", "EC2 Running ≠ App healthy. Check application logs, CW logs"],
            ["EBS burst exhausted", "IO slowdown, high latency", "Storage", "CloudWatch BurstBalance for gp2; switch to gp3 provisioned IOPS"],
            ["Spot interruption", "Instance terminated suddenly", "Compute", "2-min warning via metadata; design for interruption"],
            ["Certificate expired", "TLS handshake failure, browser error", "TLS", "ACM cert expiry; LB listener certificate; auto-renewal"],
          ]}
        />
      </section>

      {/* ─── FINAL ARCHITECTURE ───────────────────────────────────────────── */}
      <section id="final-architecture">
        <h2 style={S.h2}>Final AWS Architecture</h2>
        <p style={S.p}>
          This is a production-grade multi-AZ architecture that integrates all the concepts covered:
        </p>
        <ul style={S.ul}>
          <li>Internet users resolve the domain via Route 53 → CloudFront (CDN + WAF) → IGW → ALB (multi-AZ)</li>
          <li>The ALB load balances across ASG-managed EC2 instances in private subnets</li>
          <li>Private instances use a NAT Gateway (per-AZ) for outbound access</li>
          <li>RDS Multi-AZ — synchronous standby in AZ-b; ElastiCache Redis for session caching</li>
          <li>Security Groups per instance, NACLs per subnet, VPC Flow Logs enabled</li>
          <li>CloudWatch operational monitoring, CloudTrail API audit, GuardDuty threat detection</li>
          <li>IAM Roles on EC2 — no embedded keys; Secrets Manager for DB credentials</li>
          <li>On-prem connectivity: Direct Connect (primary) + VPN (backup) → Transit Gateway</li>
          <li>All infra in CloudFormation/Terraform; tagging enforced; budgets set</li>
        </ul>
        <Figure caption="Final integrated AWS architecture — internet, Route 53, IGW, ALB, multi-AZ EC2, RDS, NAT GW, hybrid connectivity">
          <FinalArchitectureDiagram />
        </Figure>
      </section>

      {/* ─── KEY TAKEAWAYS ────────────────────────────────────────────────── */}
      <section id="key-takeaways">
        <h2 style={S.h2}>Key Takeaways</h2>
        <ul style={S.ul}>
          <li><strong>AWS:</strong> Hundreds of services across compute, network, storage, DB, security, ML — not just EC2</li>
          <li><strong>Region/AZ:</strong> Region = independent geography; AZ = isolated failure domain; AZ ≠ single building</li>
          <li><strong>VPC:</strong> Layer-3 logically isolated software-defined network — NOT a VLAN; no broadcast domain</li>
          <li><strong>Subnet:</strong> Exactly one AZ; public = IGW route in RT; private = no IGW route but NAT outbound possible</li>
          <li><strong>Routing:</strong> Route table explicit; local route mandatory; longest-prefix match</li>
          <li><strong>IGW vs NAT:</strong> IGW = bidirectional public; NAT GW = outbound-initiated private only</li>
          <li><strong>Security Group:</strong> Stateful, instance-level, allow only; tracks connection state</li>
          <li><strong>NACL:</strong> Stateless, subnet-level, allow+deny; return traffic explicitly allow (ephemeral ports)</li>
          <li><strong>EC2:</strong> Virtual compute instance; instance store ephemeral; EBS persistent; stop ≠ terminate</li>
          <li><strong>Storage:</strong> EBS (block/SAN), S3 (object), EFS (file/NAS), FSx (managed FS), Instance Store (ephemeral)</li>
          <li><strong>LB vs ASG:</strong> LB traffic distributes; ASG instance count manages — complementary, not same</li>
          <li><strong>HA vs FT vs DR:</strong> Different concepts, different requirements, different architectures</li>
          <li><strong>IAM Roles:</strong> Temporary credentials preferred over long-lived keys; least privilege; SCP = account boundary</li>
          <li><strong>Direct Connect:</strong> NOT encrypted by default — add encryption layer explicitly</li>
          <li><strong>CloudWatch ≠ CloudTrail:</strong> Operational metrics vs API audit trail — both needed</li>
          <li><strong>IaC:</strong> All infra in code from day one — console-only = unmaintainable at scale</li>
          <li><strong>Troubleshoot layered:</strong> DNS → Route → IGW/NAT → SG → NACL → LB → Compute → App — EC2 Running ≠ App Healthy</li>
        </ul>
      </section>

      {/* ─── FAQ ─────────────────────────────────────────────────────────── */}
      <section id="faq" style={{ marginTop: "3rem" }}>
        <h2 style={S.h2}>Frequently Asked Questions</h2>
        {awsContent.faq.map((item, i) => (
          <div key={i} style={{ marginBottom: "2rem" }}>
            <h3 style={{ ...S.h3, color: "#111827" }}>{item.question}</h3>
            <p style={S.p}>{item.answer}</p>
          </div>
        ))}
      </section>

    </article>
  );
}
