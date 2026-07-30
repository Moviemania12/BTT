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
          AWS (Amazon Web Services) duniya ka sabse bada public cloud platform hai jo hundreds of cloud services across compute, networking, storage, databases, security, analytics, AI/ML aur many other domains offer karta hai. Data Center engineer ke liye AWS samajhna do cheezein hain: traditional DC concepts ka cloud equivalent samajhna, aur real AWS workloads design, connect, secure, monitor aur troubleshoot karna.
        </p>
        <p style={S.p}>
          Yeh article AWS certification guide nahi hai. Yeh ek infrastructure engineer ka practical reference hai — VPC networking se lekar hybrid DC connectivity tak, Security Groups se IAM tak, Multi-AZ HA se troubleshooting tak.
        </p>
        <Callout type="important" title="Data Center Engineer Ka Perspective">
          AWS mein zyada concepts traditional DC se map karte hain — lekin exactly one-to-one nahi. EC2 ek virtual compute instance hai AWS virtualization infrastructure pe — physical server nahi. VPC ek logically isolated software-defined network hai — VLAN nahi. Public subnet routing pe dependent hai, sirf IP address pe nahi. Yeh distinctions article mein clearly explain kiye gaye hain.
        </Callout>
      </section>

      {/* ─── WHAT IS AWS ────────────────────────────────────────────────── */}
      <section id="what-is-aws">
        <h2 style={S.h2}>What Is AWS?</h2>
        <p style={S.p}>
          Amazon Web Services duniya ka sabse bada public cloud provider hai. AWS apne massive global data center network pe compute, storage, networking, databases, machine learning aur security services offer karta hai — on-demand, pay-as-you-go model pe.
        </p>
        <p style={S.p}>
          Infrastructure engineer ke liye key insight: AWS sirf ek tool hai. Traditional DC mein jo physical servers, switches, routers, storage arrays, firewalls aur load balancers hote hain — woh sab AWS mein virtualized, managed services ke roop mein milte hain. Physical layer AWS manage karta hai; logical configuration tumhari responsibility hai.
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
            Infrastructure engineer ke liye primary focus IaaS hai — EC2, VPC, EBS, storage. PaaS services (RDS, managed LBs) are also commonly used because they reduce operational overhead while still needing design decisions from you.
          </p>
        </section>

        <section id="shared-responsibility">
          <h3 style={S.h3}>Shared Responsibility Model</h3>
          <p style={S.p}>
            Responsibility service type ke saath vary karti hai — same rules EC2, RDS, Lambda pe alag apply hote hain:
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
            AWS ke infrastructure pe attack hue — AWS ki problem. Tumhara misconfigured Security Group ya leaked IAM key se breach hua — tumhari problem. Managed services mein tumhara responsibility surface kam hota hai lekin zero nahi. Shared responsibility clearly document karo apni org ke liye.
          </Callout>
        </section>
      </section>

      {/* ─── GLOBAL INFRASTRUCTURE ──────────────────────────────────────── */}
      <section id="global-infrastructure">
        <h2 style={S.h2}>AWS Global Infrastructure</h2>

        <section id="regions">
          <h3 style={S.h3}>Regions</h3>
          <p style={S.p}>
            AWS multiple independent geographic Regions mein operate karta hai — jaise <code>ap-south-1</code> (Mumbai), <code>us-east-1</code> (N. Virginia), <code>eu-west-1</code> (Ireland). Har Region completely independent hai — different data centers, different network, different services potentially.
          </p>
          <p style={S.p}>
            Data ek Region mein stay karta hai unless explicitly move kiya jaye. Compliance requirements (GDPR, India data residency, PCI DSS scope) ke liye Region selection critical hai.
          </p>
        </section>

        <section id="availability-zones">
          <h3 style={S.h3}>Availability Zones</h3>
          <p style={S.p}>
            Har Region mein multiple Availability Zones (AZs) hote hain — typically 3 ya zyada. AZ ek logically isolated failure domain hai — separate power infrastructure, separate cooling, separate network connectivity. AZs physically separated hain lekin same Region mein low-latency distance pe hain for replication.
          </p>
          <Callout type="warning" title="AZ ≠ Single Physical Building">
            AWS AZ ko exactly ek physical building guarantee nahi karta. AZ ek logically isolated failure domain hai jo physically separate aur independent hai. Architecture decisions mein is distinction ko mind karo — AZ failure scope samajhna zaroori hai, exact physical topology nahi.
          </Callout>
          <Figure caption="AWS Global Infrastructure: Regions and Availability Zones — har Region independent, har AZ isolated failure domain">
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
            AWS sirf Regions aur AZs nahi hai — global reach ke liye AWS ne multiple additional infrastructure tiers build ki hain:
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
            Region selection ek important architecture decision hai. Sirf latency dekh ke mat chuno — multiple factors matter karte hain:
          </p>
          <ul style={S.ul}>
            <li><strong>Data sovereignty:</strong> GDPR, India IT Act, financial regulations — data kahan store ho sakta hai?</li>
            <li><strong>Latency to users:</strong> Primary user base ke closest Region — measure karo, assume mat karo</li>
            <li><strong>Service availability:</strong> Kuch AWS services sirf specific Regions mein available hain</li>
            <li><strong>Disaster Recovery:</strong> DR Region primary se geographically separated lekin ideally compliant within same jurisdiction</li>
            <li><strong>Cost:</strong> Region pricing vary karta hai — same service different cost in different Regions</li>
          </ul>
          <Callout type="important" title="Multi-Region ≠ Automatic Active-Active">
            Multi-Region deployment complex hai — data synchronization, routing, consistency, latency sab manage karne padte hain. Active-passive DR bahut simpler starting point hai. Multi-region active-active design deliberate hai, default nahi.
          </Callout>
        </section>
      </section>

      {/* ─── VPC ─────────────────────────────────────────────────────────── */}
      <section id="vpc">
        <h2 style={S.h2}>VPC — Core Network Foundation</h2>

        <section id="vpc-concepts">
          <h3 style={S.h3}>VPC, CIDR and Subnets</h3>
          <p style={S.p}>
            VPC (Virtual Private Cloud) ek logically isolated, software-defined virtual network hai AWS mein jisme tumhare AWS resources run karte hain. Traditional DC analogy: apna private enterprise Layer-3 network — lekin VPC VLAN nahi hai. VLAN Layer 2 Ethernet construct hai; VPC pure Layer-3 logically isolated construct hai with its own routing, CIDR block, and software-defined control plane. No physical switches, no spanning tree, no broadcast domains.
          </p>
          <p style={S.p}>
            VPC ko ek CIDR block assign karte hain (e.g., <code>10.0.0.0/16</code>). Is range se subnets create karte hain (e.g., <code>10.0.1.0/24</code>, <code>10.0.2.0/24</code>). VPC ek Region ke andar hota hai aur multiple AZs span karta hai. Lekin ek subnet exactly ek AZ mein hoti hai — multi-AZ resiliency ke liye multiple subnets multiple AZs mein chahiye.
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
            Yeh ek critical misconception hai: public subnet woh subnet nahi hai jisme sirf public IPs hain. Subnet public ya private isliye nahi hoti kyunki instances mein public IPs hain — balki isliye ki us subnet ke Route Table mein Internet Gateway (IGW) ki taraf default route (<code>0.0.0.0/0 → igw-xxx</code>) hai ya nahi.
          </p>
          <p style={S.p}>
            <strong>Public subnet:</strong> Route Table mein <code>0.0.0.0/0 → igw-xxx</code> route hoti hai. Is subnet ke resources Internet se reachable ho sakte hain — subject to public IP assignment aur Security Group rules.
          </p>
          <p style={S.p}>
            <strong>Private subnet:</strong> Route Table mein IGW route nahi hoti. Resources Internet se directly reachable nahi hain. Lekin private subnet instances bhi Internet access kar sakte hain — outbound-only, NAT Gateway ke through.
          </p>
          <Callout type="warning" title="Public IP ≠ Internet Reachable — Routing Matters">
            Ek instance private subnet mein public IP le sakta hai — lekin agar route table mein IGW route absent hai, Internet connectivity nahi hogi. Public IP assignment aur routing dono zaroori hain inbound Internet access ke liye. Private subnet + NAT Gateway = outbound Internet access, lekin no unsolicited inbound traffic from Internet.
          </Callout>
        </section>

        <section id="route-table">
          <h3 style={S.h3}>Route Tables</h3>
          <p style={S.p}>
            Har subnet ek route table se associated hoti hai. Route table mein entries hoti hain:
          </p>
          <ul style={S.ul}>
            <li><strong>Local route:</strong> VPC CIDR (e.g., <code>10.0.0.0/16 → local</code>) — mandatory, always present, VPC ke andar traffic handle karta hai</li>
            <li><strong>IGW route:</strong> <code>0.0.0.0/0 → igw-xxx</code> — public subnets mein, Internet ke liye</li>
            <li><strong>NAT Gateway route:</strong> <code>0.0.0.0/0 → nat-xxx</code> — private subnets mein, outbound Internet ke liye</li>
            <li><strong>VPN/peering/TGW routes:</strong> Specific CIDRs for on-prem ya other VPCs</li>
          </ul>
          <p style={S.p}>
            Longest-prefix match applies — more specific route wins. AWS VPC router ki route selection behavior traditional physical routers se conceptually similar hai lekin exactly same nahi — AWS documentation se specific behavior verify karo jab edge cases matter karein.
          </p>
          <Figure caption="AWS VPC Architecture — subnets, route tables, IGW aur NAT Gateway ka layout across multiple AZs">
            <VpcArchitectureDiagram />
          </Figure>
        </section>

        <section id="vpc-advanced">
          <h3 style={S.h3}>VPC Advanced: Endpoints, Peering, PrivateLink</h3>
          <p style={S.p}>
            VPC ke bahar AWS services access karne ke multiple patterns hain — default Internet path se better alternatives:
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
            VPC Peering non-transitive hai — agar VPC-A peers with VPC-B, aur VPC-B peers with VPC-C, toh VPC-A aur VPC-C automatically connected nahi hain. Transit Gateway transitive routing support karta hai — preferred at scale.
          </p>
          <Figure caption="VPC advanced connectivity: endpoints, peering, Transit Gateway — multi-VPC architecture">
            <VpcAdvancedDiagram />
          </Figure>
        </section>

        <section id="cidr-planning">
          <h3 style={S.h3}>CIDR Planning and Multi-VPC Design</h3>
          <p style={S.p}>
            CIDR planning upfront critical hai — overlapping CIDRs peering aur Transit Gateway use impossible banate hain:
          </p>
          <ul style={S.ul}>
            <li>Har VPC ko unique non-overlapping CIDR assign karo — on-prem ranges bhi include karo comparison mein</li>
            <li>Common approach: <code>10.x.0.0/16</code> per VPC (x unique per VPC) — 256 VPCs easily accommodated</li>
            <li>Subnet sizing: too small = quickly exhaust IPs; AWS reserves 5 IPs per subnet (/28 = sirf 11 usable)</li>
            <li>Hub-and-Spoke design: central Transit Gateway + shared services VPC (AD, monitoring) + spoke VPCs per team/app</li>
            <li>IPv6: AWS allocates /56 to VPC, /64 to subnets — globally unique, no NAT needed; dual-stack possible</li>
          </ul>
          <Callout type="warning" title="Overlapping CIDRs = Peering Impossible">
            Agar VPC-A aur VPC-B dono 10.0.0.0/16 use karte hain — peering kabhi kaam nahi karega, TGW attachment bhi fail hoga. Plan karo pehle. Production mein change karna painful hai.
          </Callout>
        </section>
      </section>

      {/* ─── IGW AND NAT ────────────────────────────────────────────────── */}
      <section id="igw-nat">
        <h2 style={S.h2}>Internet Gateway and NAT Gateway</h2>

        <section id="igw">
          <h3 style={S.h3}>Internet Gateway</h3>
          <p style={S.p}>
            IGW ek horizontally scaled, redundant, managed VPC component hai. Yeh VPC level pe attach hota hai (ek VPC — ek IGW). IGW Internet traffic ko VPC mein aane aur jaane deta hai.
          </p>
          <p style={S.p}>
            IPv4 ke liye IGW address translation (public IP ↔ private IP mapping) karta hai — instance ki private IP aur assigned public IP ke beech. IPv6 ke liye generally no translation needed (global unicast addresses directly routable).
          </p>
          <p style={S.p}>
            Inbound Internet → instance ke liye requirements: instance pe public IP (Elastic IP ya auto-assigned) + route table mein <code>0.0.0.0/0 → IGW</code> + Security Group allow kare.
          </p>
        </section>

        <section id="nat-gateway">
          <h3 style={S.h3}>NAT Gateway</h3>
          <p style={S.p}>
            NAT Gateway private subnet instances ko outbound Internet access deta hai — bina unhe Internet se directly reachable banaye. Traffic flow: Private EC2 → private subnet route (<code>0.0.0.0/0 → NAT GW</code>) → NAT Gateway (public subnet mein) → IGW → Internet. Return traffic same path reverse karta hai.
          </p>
          <Callout type="warning" title="NAT Gateway: Outbound Initiated Only">
            NAT Gateway ke through Internet se unsolicited inbound connections private instances tak possible nahi hain. Yeh strictly outbound-initiated traffic ke liye hai — software updates, API calls, package downloads. NAT Gateway AWS-managed hai, per-AZ deployed hota hai; HA ke liye har AZ mein separate NAT Gateway best practice hai. Single NAT Gateway single AZ failure pe outage create karta hai.
          </Callout>
          <Figure caption="Internet traffic paths — inbound to public instance via IGW vs private outbound via NAT Gateway">
            <InternetTrafficDiagram />
          </Figure>
        </section>

        <section id="elastic-ip">
          <h3 style={S.h3}>Elastic IP and ENI</h3>
          <p style={S.p}>
            <strong>Elastic IP (EIP):</strong> Static public IPv4 address jo tumhare account se associated hai — instance se independent. Instance stop/start karne pe auto-assigned public IP change ho jaata hai; EIP nahi badalti. Use when: stable DNS/IP needed for partner whitelisting, NAT Gateway, EC2 failover scenarios.
          </p>
          <p style={S.p}>
            <strong>Elastic Network Interface (ENI):</strong> Virtual network interface — IP addresses (primary + secondary), MAC address, Security Groups carry karta hai. Multiple ENIs ek instance pe attach ho sakti hain. Secondary IPs ek ENI pe possible hain — useful for hosting multiple SSL certs or IP-specific routing. ENI independently exist kar sakti hai — instance se detach karke doosre instance pe attach possible hai (useful for quick failover).
          </p>
          <p style={S.p}>
            <strong>DNS Resolution in VPC:</strong> AWS-provided DNS (<code>169.254.169.253</code> ya VPC Base + 2) automatically kaam karta hai. Private hosted zones Route 53 mein VPC se associate kar sakte hain — internal DNS resolution. DHCP Option Sets DNS servers aur domain name configure karte hain.
          </p>
        </section>
      </section>

      {/* ─── SECURITY GROUP vs NACL ─────────────────────────────────────── */}
      <section id="security-group-nacl">
        <h2 style={S.h2}>Security Group vs Network ACL</h2>
        <p style={S.p}>
          AWS mein do complementary security layers hain — Security Group aur Network ACL. Inhe <TopicLink slug="firewall" variant="inline" /> se conceptually connect karo: dono traffic filter karte hain lekin different level pe aur different statefulness ke saath.
        </p>

        <section id="security-group">
          <h3 style={S.h3}>Security Group</h3>
          <p style={S.p}>
            Security Group instance-level (ENI-level) stateful virtual firewall hai. Yeh connection state track karta hai — ek allowed connection ki return traffic automatically permit hoti hai bina separate rule ke. Traditional firewall analogy: stateful inspection firewall jo connection table maintain karta hai.
          </p>
          <ul style={S.ul}>
            <li><strong>Stateful:</strong> Ek allowed inbound connection ki return traffic automatically allowed hai — koi separate outbound rule nahi chahiye for return packets</li>
            <li><strong>Allow rules only:</strong> Explicit DENY rules nahi hote; jo allow nahi hai woh implicitly denied hai</li>
            <li><strong>Source/destination flexibility:</strong> IP CIDR ya dusre Security Group IDs by ID specify kar sakte hain (SG referencing)</li>
            <li><strong>Default SG:</strong> All outbound allowed, all inbound denied from external (unless rules added)</li>
            <li><strong>Multiple SGs:</strong> Ek instance pe multiple Security Groups apply ho sakte hain — union of all rules</li>
          </ul>
        </section>

        <section id="nacl">
          <h3 style={S.h3}>Network ACL</h3>
          <p style={S.p}>
            Network ACL subnet-level stateless firewall hai. Yeh connection state nahi track karta — har packet independently evaluate hota hai. Traditional analogy: router ACL (permit/deny per direction, no state).
          </p>
          <ul style={S.ul}>
            <li><strong>Stateless:</strong> Inbound aur outbound dono explicitly allow karne padte hain — including ephemeral return ports (1024–65535) for response packets</li>
            <li><strong>Allow aur Deny:</strong> Explicit DENY rules possible hain — SGs se different</li>
            <li><strong>Numbered rules:</strong> Lowest rule number first evaluate hota hai; first match applies; no implicit allow</li>
            <li><strong>Default custom NACL:</strong> Deny all by default (both directions)</li>
            <li><strong>Default NACL:</strong> Allow all inbound and outbound</li>
          </ul>
          <Callout type="warning" title="NACL Stateless — Ephemeral Ports Critical">
            Agar Security Group pe port 443 inbound allow hai lekin NACL pe outbound ephemeral port range (1024-65535) allow nahi hai — client ko response nahi milega even though SG correct hai. NACL mein har direction explicitly check karo. Yeh ek common troubleshooting mistake hai.
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
            EC2 (Elastic Compute Cloud) AWS ka virtual compute instance service hai — EC2 ek virtual compute instance hai jo AWS ki virtualization infrastructure pe run karta hai, physical server nahi. Har instance ek AMI (Amazon Machine Image) se launch hota hai — AMI mein OS, pre-installed software aur configuration hota hai. AMI ek template hai — isse multiple identical instances launch kar sakte hain; Launch Templates AMI + configuration ko reusable banate hain.
          </p>
          <p style={S.p}>
            Instance type vCPU count, memory, network performance aur storage options define karta hai (e.g., <code>t3.medium</code>, <code>m6i.large</code>). Instance type choose karte time sirf interface bandwidth pe focus mat karo — encrypted throughput, packet rate, EBS bandwidth, network burst capacity sab matter karte hain.
          </p>
          <p style={S.p}>
            User Data: launch time pe automatically run hone wala script — OS configuration, software install, bootstrap karne ke liye. Instance Metadata Service v2 (IMDSv2): token-based, SSRF-safe; instance apne AMI, instance ID, IAM role credentials metadata endpoint se read karta hai.
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
            Spot Instances bahut saste hain lekin AWS 2-minute notice ke saath reclaim kar sakta hai. Spot ke liye workload design karo: stateless, checkpointing, SQS-based, Auto Scaling mixed. Spot Fleets multiple instance types + AZs mein request diversify karte hain.
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
            Instance store data stop pe lost hoti hai — terminate pe bhi. Instance stop karne pe instance different physical host pe restart ho sakta hai — instance store data survives reboot but NOT stop. Persistent data ke liye sirf EBS use karo.
          </Callout>
        </section>

        <section id="ec2-advanced">
          <h3 style={S.h3}>AMI, Launch Templates, Placement Groups</h3>
          <p style={S.p}>
            <strong>AMI (Amazon Machine Image):</strong> Snapshot-based template — OS, software, configuration. Custom AMI create karo: existing instance configure karo → create image → use across Regions (copy AMI). Encryption possible. AMI = EC2 ka "golden image" concept.
          </p>
          <p style={S.p}>
            <strong>Launch Template:</strong> Instance configuration reuse karne ke liye — AMI, instance type, key pair, SGs, user data sab store karta hai. Auto Scaling Groups Launch Templates consume karte hain. Versioning supported — rollback easy.
          </p>
          <p style={S.p}>
            <strong>Placement Groups:</strong> Physical placement control karte hain:
          </p>
          <ul style={S.ul}>
            <li><strong>Cluster:</strong> Low-latency networking — same rack, same AZ. HPC, tightly coupled. High bandwidth between instances. Single point of hardware failure.</li>
            <li><strong>Spread:</strong> Max hardware isolation — different racks, ideally different AZs. Max 7 instances per AZ per group. Critical instances.</li>
            <li><strong>Partition:</strong> Large distributed workloads (Hadoop, Cassandra, Kafka) — partitions isolated from each other on different racks.</li>
          </ul>
          <p style={S.p}>
            <strong>EC2 Auto Recovery:</strong> CloudWatch alarm trigger pe AWS automatically instance recover karta hai — same instance ID, same IP, same EBS. Instance store data lost, lekin instance continuity maintained.
          </p>
        </section>
      </section>

      {/* ─── STORAGE ──────────────────────────────────────────────────────── */}
      <section id="storage">
        <h2 style={S.h2}>Storage — EBS, S3, EFS, FSx</h2>

        <section id="ebs">
          <h3 style={S.h3}>EBS — Block Storage</h3>
          <p style={S.p}>
            EBS (Elastic Block Store) persistent, network-attached block storage hai — traditional DC mein SAN LUN (iSCSI) ki tarah samajho. EC2 instance se attach hota hai; instance stop ya terminate karne ke baad volume exist karta rehta hai (by default).
          </p>
          <ul style={S.ul}>
            <li>Standard EBS volume ek EC2 instance se ek time pe attached hota hai (io2 Block Express multi-attach supports, limited use cases)</li>
            <li>EBS volume aur EC2 instance same AZ mein hone chahiye — cross-AZ attachment nahi hoti</li>
            <li>Snapshots: point-in-time backup — S3 mein stored (managed), incremental. Cross-AZ aur cross-Region copy possible. EBS Snapshot Lifecycle Manager (DLM) automate karta hai</li>
            <li>Volume types: gp3 (general purpose, configurable IOPS/throughput), io2 (provisioned IOPS, high performance DB), st1/sc1 (HDD, throughput/cold storage)</li>
            <li>Encryption: KMS key se at rest aur in transit encrypted — snapshots bhi encrypted rahti hain</li>
          </ul>
        </section>

        <section id="s3">
          <h3 style={S.h3}>S3 — Object Storage</h3>
          <p style={S.p}>
            S3 (Simple Storage Service) object storage hai — massive key-value store at scale. S3 mein objects store hote hain buckets mein, API (HTTP/HTTPS) se access hota hai. S3 filesystem mount nahi hoti directly. Traditional DC mein object storage tier (like NetApp StorageGRID, Dell ECS) se compare karo.
          </p>
          <p style={S.p}>
            S3 data redundant storage across multiple devices and facilities within a Region mein maintain karta hai per AWS documentation. Features: versioning (every object version retained), Object Lock (WORM compliance), Cross-Region Replication, Transfer Acceleration (CloudFront edge for faster upload/download), Event Notifications (trigger Lambda/SQS/SNS on object events).
          </p>
          <p style={S.p}>
            <strong>S3 Storage Classes:</strong> Standard → Standard-IA (Infrequent Access) → One Zone-IA → Glacier Instant Retrieval → Glacier Flexible Retrieval → Glacier Deep Archive. Intelligent-Tiering auto-moves objects based on access patterns. Lifecycle Policies automate transitions — e.g., 30 days → Standard-IA, 90 days → Glacier.
          </p>
          <Callout type="important" title="EBS vs S3 — Fundamental Difference">
            EBS = block device, filesystem attach, low-latency random I/O, EC2-specific, AZ-scoped. S3 = object store, API access, high durability, no filesystem, not AZ-specific, internet-accessible with proper policy. Dono completely different use cases ke liye hain — confusion dangerous hai (e.g., S3 ko database ki tarah use karna wrong design).
          </Callout>
        </section>

        <section id="efs">
          <h3 style={S.h3}>EFS — File Storage</h3>
          <p style={S.p}>
            EFS (Elastic File System) AWS ka managed NFS service hai — traditional NAS ki tarah samajho. Multiple EC2 instances simultaneously mount kar sakti hain — shared filesystem. EFS multi-AZ capable hai (Regional EFS automatically multiple AZs mein stores). Automatically grows aur shrinks as files added/removed — no capacity planning needed.
          </p>
          <p style={S.p}>
            Use cases: shared content repositories, web serving, home directories, CMS content, DevOps build environments. EFS block storage alternative nahi hai — different use case hai.
          </p>
        </section>

        <section id="storage-advanced">
          <h3 style={S.h3}>FSx, Storage Gateway and Storage Classes</h3>
          <p style={S.p}>
            <strong>Amazon FSx:</strong> Managed file systems for specific workloads:
          </p>
          <ul style={S.ul}>
            <li><strong>FSx for Windows File Server:</strong> Managed Windows SMB file share — AD integration, DFS, shadow copies. Traditional DC Windows file server ka cloud equivalent.</li>
            <li><strong>FSx for Lustre:</strong> High-performance parallel file system — HPC, ML training, video processing. Sub-millisecond latency, hundreds GB/s throughput.</li>
            <li><strong>FSx for NetApp ONTAP:</strong> Multi-protocol (NFS, SMB, iSCSI) with ONTAP features — familiar to enterprises running NetApp.</li>
          </ul>
          <p style={S.p}>
            <strong>AWS Storage Gateway:</strong> On-premises appliance (software or hardware) jo on-prem storage workloads ko AWS se connect karta hai. Types: S3 File Gateway (NFS/SMB → S3), FSx File Gateway (cached FSx for Windows), Volume Gateway (iSCSI → S3/EBS), Tape Gateway (virtual tape library → S3/Glacier). Traditional DC se AWS storage hybrid bridge hai.
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
          AWS Elastic Load Balancing (ELB) managed load balancer service hai. <TopicLink slug="load-balancer" variant="inline" /> article mein core concepts cover hain — yahan AWS-specific implementation pe focus karte hain.
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
            Gateway Load Balancer ek powerful pattern hai: all VPC traffic GWLB se guzarti hai — woh traffic third-party virtual firewall/IDS appliances ke fleet ko bhejta hai → inspect hoti hai → wapas GWLB → destination. Centralized security inspection at scale, without changing routing for each service.
          </p>
        </section>

        <section id="target-groups">
          <h3 style={S.h3}>Target Groups and Health Checks</h3>
          <p style={S.p}>
            LB traffic target groups pe route karta hai. Target group mein registered targets hote hain — EC2 instances, IP addresses ya Lambda functions. Health checks target group level pe configure hote hain — LB sirf healthy targets pe traffic bhejta hai.
          </p>
          <p style={S.p}>
            Multi-AZ design: target group mein multiple AZs ke targets register karo. LB AZ-unhealthy targets automatically bypass karta hai aur healthy targets pe route karta hai — lekin application layer pe bhi stateless design zaroori hai.
          </p>
          <Callout type="important" title="Health Check ≠ Application Healthy">
            LB health check pass karna means target port pe response aa raha hai. Application logic correctly working hai ya nahi — health check endpoint design pe depend karta hai. Shallow health endpoint 200 return kar sakta hai while app broken ho. Meaningful health endpoints design karo.
          </Callout>
        </section>
      </section>

      {/* ─── AUTO SCALING ─────────────────────────────────────────────────── */}
      <section id="auto-scaling">
        <h2 style={S.h2}>Auto Scaling</h2>

        <section id="asg">
          <h3 style={S.h3}>Auto Scaling Group</h3>
          <p style={S.p}>
            Auto Scaling Group (ASG) automatically EC2 instances manage karta hai — min/desired/max capacity ke andar. Demand badhne pe instances add hote hain; demand kam hone pe reduce hote hain. ASG ek unhealthy instance detect karta hai (via EC2 health check ya LB health check) aur automatically replace karta hai.
          </p>
          <p style={S.p}>
            Scaling policies: Target Tracking (maintain metric at value, e.g., CPU 70%), Step Scaling (step adjustments based on alarm), Scheduled (predictable patterns), Predictive (ML-based forecast). Scale-out slow karna: warmup period; scale-in protect karna: scale-in protection pe specific instances.
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
            ASG sirf ek AZ mein configured hai toh AZ failure = complete outage — scaling regardless. Multi-AZ mein ASG configure karo. Scale karna aur HA dono complementary hain lekin alag cheezein hain.
          </Callout>
        </section>
      </section>

      {/* ─── ROUTE 53 ─────────────────────────────────────────────────────── */}
      <section id="dns-route53">
        <h2 style={S.h2}>DNS — Route 53</h2>
        <p style={S.p}>
          Route 53 AWS ka managed DNS service hai — traditional DC enterprise DNS (BIND, Microsoft DNS, Infoblox) ka cloud equivalent. Hosted zones mein DNS records configure hote hain (A, AAAA, CNAME, ALIAS, MX, TXT etc). Public hosted zones Internet-facing; private hosted zones VPC-internal.
        </p>
        <p style={S.p}>
          Routing policies: Simple (single value), Weighted (A/B testing or gradual migration), Latency-based (lowest latency endpoint per AWS measurement), Failover (primary/secondary with health checks), Geolocation (client geography-based), Geoproximity (geographic + bias), Multivalue (multiple IPs with health check filtering).
        </p>
        <p style={S.p}>
          Route 53 apne health checks bhi run kar sakta hai — endpoints ke against. Failover routing policy in health checks pe dependent hoti hai. LB health checks aur Route 53 health checks alag mechanisms hain — dono ka use case distinct hai.
        </p>
        <Callout type="important" title="DNS ≠ Inline Load Balancer">
          Route 53 DNS-based traffic steering provide karta hai — inline LB nahi. DNS TTL aur resolver/client caching failover timing affect karte hain. Route 53 failover LB health-check-based failover se slower ho sakta hai. DNS traffic distribution accurately model karna hard hai because of caching behavior. Inbound HTTP traffic ke liye LB preferred hai granular health checking aur fast failover ke liye.
        </Callout>
      </section>

      {/* ─── IAM ──────────────────────────────────────────────────────────── */}
      <section id="iam">
        <h2 style={S.h2}>IAM — Identity and Access Management</h2>

        <section id="iam-concepts">
          <h3 style={S.h3}>Users, Roles and Policies</h3>
          <p style={S.p}>
            IAM authentication aur authorization ke liye hai — do alag concepts:
          </p>
          <ul style={S.ul}>
            <li><strong>Authentication:</strong> Identity verify karna — "Kya tum ho jo kehte ho?" IAM user credentials ya role-assumed STS token se.</li>
            <li><strong>Authorization:</strong> Permission verify karna — "Kya tumhe yeh karne ki permission hai?" IAM policy evaluation se.</li>
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
            EC2 instance ya Lambda function ko AWS services access karne ke liye IAM Role attach karo — hard-coded access keys nahi. Role assume karne pe temporary credentials automatically rotate hote hain via STS. Application ko sirf instance metadata service (IMDSv2) se credentials read karni hoti hain.
          </p>
          <Callout type="warning" title="Access Keys in Code = Security Risk">
            Application code ya configuration mein AWS access key aur secret embed karna ek serious security risk hai. Leak hone pe — code repo, logs, error messages mein — attacker full access le sakta hai. IAM roles with temporary credentials use karo. Least privilege principle: sirf minimum required permissions grant karo.
          </Callout>
          <Figure caption="IAM: authentication vs authorization, users vs roles, least privilege and policy evaluation">
            <IamDiagram />
          </Figure>
        </section>

        <section id="iam-advanced">
          <h3 style={S.h3}>Permission Boundaries, Organizations and SCP</h3>
          <p style={S.p}>
            <strong>Permission Boundaries:</strong> IAM entity (user/role) pe set karta hai — maximum permissions jo woh ever receive kar sakta hai, regardless of what policies say. Useful for delegated admin scenarios: dev team ko IAM manage karne do lekin only within boundary.
          </p>
          <p style={S.p}>
            <strong>AWS Organizations:</strong> Multiple AWS accounts centrally manage karne ke liye. Organizational Units (OUs) account hierarchy banate hain. Service Control Policies (SCPs) OU/account pe set karte hain — maximum permission limit for entire account. SCP identity policies override nahi karta — ek account mein even Administrator cannot exceed SCP boundary.
          </p>
          <p style={S.p}>
            <strong>IAM Identity Center (SSO):</strong> Centralized SSO for multiple accounts — SAML/OIDC federation with corporate IdP (Active Directory, Okta, etc). Permission sets reuse karte hain across accounts — one place se manage karo. Traditional DC AD → AWS SSO integration common enterprise pattern.
          </p>
          <p style={S.p}>
            <strong>AWS Control Tower:</strong> Multi-account environment setup automate karta hai — landing zone, guardrails (preventive via SCPs, detective via Config Rules), Account Factory.
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
            Multi-AZ HA design ka typical pattern: Route 53 DNS → ALB (multi-AZ) → ASG (instances AZ-a, AZ-b, AZ-c) → RDS Multi-AZ. NAT Gateway har AZ mein separately (single NAT GW single AZ failure pe outage).
          </p>
          <Callout type="important" title="Multi-AZ ≠ Automatic HA">
            Resources multiple AZs mein hona zaroori hai lekin sufficient nahi. Application stateless hona chahiye ya shared state external store (ElastiCache, DynamoDB) mein. Database failover DNS-based hoti hai — application ko reconnect handle karna chahiye. Architecture ke har layer pe analyze karo ki single point of failure kahan hai.
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
          RDS (Relational Database Service) AWS ka managed relational database hai — MySQL, PostgreSQL, MariaDB, Oracle, SQL Server support karta hai. AWS OS patching, backups, hardware management karta hai. Tumhari responsibility: schema, queries, security group configuration, parameter group tuning.
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
            Multi-AZ standby sirf HA ke liye hai — reads ya writes ke liye use nahi hoti normal operation mein. Read Replicas read traffic distribute karte hain lekin automatic HA failover nahi hai by default. Dono ko mix mat karo.
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
          Key concepts: <strong>RTO</strong> (Recovery Time Objective — kitni der mein service restore honi chahiye) aur <strong>RPO</strong> (Recovery Point Objective — kitna data loss acceptable hai). Yeh business decisions hain — AWS tools inhe achieve karne mein help karte hain.
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
          AWS Backup: centralized backup policy across EC2, EBS, RDS, EFS, DynamoDB, FSx. Backup Vaults: immutable backup storage with vault lock (WORM). Cross-region backup copies: DR strategy requirement ke liye automate karo.
        </p>
        <Callout type="important" title="DR Testing Mandatory">
          DR plan jo tested nahi hua woh sirf theory hai. Production mein failover test karo — regularly. RTO aur RPO measure karo actual exercise mein. Assumptions challenge karo.
        </Callout>
      </section>

      {/* ─── OBSERVABILITY ────────────────────────────────────────────────── */}
      <section id="observability">
        <h2 style={S.h2}>Observability — CloudWatch and CloudTrail</h2>
        <p style={S.p}>
          Do fundamentally different services hain jo often confuse hote hain:
        </p>
        <ComparisonTable
          headers={["Service", "Purpose", "What It Answers", "Examples"]}
          rows={[
            ["CloudWatch", "Operational observability", "How is my system performing?", "EC2 CPU, LB 5xx rate, custom metrics, application logs, alarms"],
            ["CloudTrail", "API activity audit trail", "Who did what, when, from where?", "Who deleted S3 bucket, which role launched EC2, IAM key usage"],
          ]}
        />
        <p style={S.p}>
          CloudWatch metrics automatically collected hote hain AWS resources ke liye — CPU, network, disk. Application-level metrics custom namespace mein push kar sakte hain. Alarms configure karo — SNS notification ya Auto Scaling trigger. CloudWatch Logs mein application aur system logs store karo, query karo.
        </p>
        <p style={S.p}>
          CloudTrail by default Management Events log karta hai. S3 aur Lambda data events separately enable karne padte hain. Security investigation ke liye CloudTrail essential hai — unauthorized API calls, resource deletion, IAM changes sab yahan milte hain.
        </p>
        <Figure caption="CloudWatch (operational observability) vs CloudTrail (API audit trail) — do alag services, different purposes">
          <ObservabilityDiagram />
        </Figure>

        <section id="observability-advanced">
          <h3 style={S.h3}>VPC Flow Logs, EventBridge and X-Ray</h3>
          <p style={S.p}>
            <strong>VPC Flow Logs:</strong> Network-level packet metadata — source IP, destination IP, port, protocol, accept/reject. Network forensics aur security investigation ke liye critical. CloudWatch Logs ya S3 mein store karo. Traditional DC NetFlow/sFlow equivalent.
          </p>
          <p style={S.p}>
            <strong>AWS Config:</strong> Configuration compliance — resource configuration history, compliance rules (e.g., "all S3 buckets must be encrypted"), drift detection. Audit aur compliance use case. Not operational monitoring — configuration state tracking.
          </p>
          <p style={S.p}>
            <strong>Amazon EventBridge:</strong> Event-driven automation — AWS service events, custom events, scheduled rules → trigger Lambda, Step Functions, SQS, SNS. Decoupled architecture enable karta hai.
          </p>
          <p style={S.p}>
            <strong>AWS X-Ray:</strong> Distributed tracing — microservices request path trace karo across services. Latency bottleneck identify karo. Service map visualize karo. Traditional APM tool (Dynatrace, New Relic) ka AWS equivalent.
          </p>
        </section>
      </section>

      {/* ─── HYBRID CONNECTIVITY ──────────────────────────────────────────── */}
      <section id="hybrid-connectivity">
        <h2 style={S.h2}>Hybrid — On-Prem to AWS</h2>

        <section id="vpn-directconnect">
          <h3 style={S.h3}>Site-to-Site VPN and Direct Connect</h3>
          <p style={S.p}>
            On-prem data center ko AWS VPC se connect karne ke do primary approaches hain:
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
            Direct Connect ek dedicated private circuit hai — Internet se isolated — lekin traffic encrypted nahi hota by default. Encryption ke liye separate layer configure karo (jaise IPsec over Direct Connect). Compliance requirements ke liye explicitly verify karo. Connect karo <TopicLink slug="firewall" variant="inline" /> aur <TopicLink slug="router" variant="inline" /> concepts se — on-prem routing, BGP, aur firewall policies sab relevant hain.
          </Callout>
          <Figure caption="Hybrid connectivity — Site-to-Site VPN (encrypted over Internet) vs Direct Connect (private circuit, not encrypted by default)">
            <HybridConnectivityDiagram />
          </Figure>
        </section>

        <section id="transit-gateway">
          <h3 style={S.h3}>Transit Gateway and Hybrid DNS</h3>
          <p style={S.p}>
            Multiple VPCs aur on-prem connections point-to-point VPC peering se manage karna complex ho jaata hai at scale. Transit Gateway ek central hub hai — multiple VPCs aur on-prem connections (VPN, Direct Connect) ko centrally interconnect karta hai. Traditional DC mein core WAN router analogy — hub-and-spoke topology.
          </p>
          <p style={S.p}>
            <strong>Direct Connect Gateway:</strong> Single Direct Connect connection se multiple Regions ke VPCs tak connect possible hai. <strong>Transit VIF (Virtual Interface):</strong> Direct Connect pe Transit Gateway ke saath use karne ke liye. BGP on-prem se AWS tak routes advertise karta hai — <TopicLink slug="router" variant="inline" /> BGP concepts directly apply hote hain.
          </p>
          <p style={S.p}>
            <strong>Hybrid DNS:</strong> On-prem DNS server AWS private zones resolve nahi kar sakta directly. Route 53 Resolver Inbound Endpoint: on-prem se AWS private DNS queries forward karo. Route 53 Resolver Outbound Endpoint: AWS se on-prem DNS resolve karo. Dono milake bidirectional hybrid DNS resolution enable karte hain.
          </p>
        </section>
      </section>

      {/* ─── CONTAINERS ───────────────────────────────────────────────────── */}
      <section id="containers">
        <h2 style={S.h2}>Containers — ECS, EKS, Fargate</h2>

        <section id="what-are-containers">
          <h3 style={S.h3}>What Are Containers?</h3>
          <p style={S.p}>
            Container ek lightweight, portable application runtime hai — host OS kernel share karta hai lekin isolated filesystem, network aur process space rakhta hai. Traditional VM se fundamental difference: VM ek complete OS run karta hai (hypervisor pe); container sirf application aur its dependencies package karta hai, kernel OS se share karta hai.
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
            Traditional DC mein server consolidation ke liye VMs use hote the — containers zyada efficient hain same goal ke liye. "Build once, run anywhere" — dev laptop pe build karo, same container production pe run karo without environment differences.
          </p>
        </section>

        <section id="docker-fundamentals">
          <h3 style={S.h3}>Docker Fundamentals</h3>
          <p style={S.p}>
            Docker container ecosystem ka de-facto standard hai. Key concepts:
          </p>
          <ul style={S.ul}>
            <li><strong>Dockerfile:</strong> Text file jo container image build karne ke instructions define karta hai — base image, dependencies install, app copy, startup command</li>
            <li><strong>Container Image:</strong> Immutable snapshot — application + runtime + dependencies bundled. Registry mein stored.</li>
            <li><strong>Container:</strong> Running instance of an image — ephemeral by default, data container ke andar persist nahi hota restart pe (volume use karo)</li>
            <li><strong>Registry:</strong> Image store — ECR (AWS private), Docker Hub (public), GitHub Container Registry. ECR AWS native, IAM-integrated.</li>
            <li><strong>Container Runtime:</strong> Docker Engine, containerd — actual containers run karta hai. ECS aur EKS containerd use karte hain.</li>
          </ul>
          <Callout type="important" title="Container Images Immutable Hain">
            Running container mein changes container stop hone pe lost ho jaate hain. Persistent data ke liye volumes use karo (EBS, EFS). Configuration environment variables se inject karo — image mein hardcode mat karo.
          </Callout>
        </section>

        <section id="amazon-ecs">
          <h3 style={S.h3}>Amazon ECS</h3>
          <p style={S.p}>
            ECS (Elastic Container Service) AWS ka native container orchestration service hai. Key concepts:
          </p>
          <ul style={S.ul}>
            <li><strong>Task Definition:</strong> Blueprint — kaun sa container image, CPU/memory, ports, environment variables, IAM role, logging config. Version controlled.</li>
            <li><strong>Task:</strong> Running instance of a Task Definition — ek ya zyada containers together. Ephemeral ya long-running.</li>
            <li><strong>Service:</strong> Desired task count maintain karta hai — ek task fail ho toh replace karta hai. ALB ke saath integrate karta hai for traffic routing. Auto Scaling pe task count badhata/ghataata hai.</li>
            <li><strong>Cluster:</strong> Logical grouping of tasks/services. EC2 launch type mein: underlying EC2 instances cluster mein registered. Fargate mein: serverless, koi EC2 nahi.</li>
          </ul>
          <p style={S.p}>
            ECS Service → ALB integration: har task Fargate awsvpc mode mein apna private IP rakhta hai → ALB target group mein registered hota hai → traffic distribute hota hai. Health check fail karne pe ECS task replace karta hai aur ALB se deregister hota hai.
          </p>
        </section>

        <section id="amazon-eks">
          <h3 style={S.h3}>Amazon EKS</h3>
          <p style={S.p}>
            EKS (Elastic Kubernetes Service) AWS managed Kubernetes control plane hai. Kubernetes (K8s) ek open-source container orchestration platform hai — Google ne develop kiya, now CNCF. ECS se zyada complex lekin zyada portable aur ecosystem-rich.
          </p>
          <ul style={S.ul}>
            <li><strong>Control Plane:</strong> AWS manages — API server, etcd, scheduler. High availability guaranteed. You sirf worker nodes manage karte ho.</li>
            <li><strong>Worker Nodes:</strong> EC2 instances (managed node groups ya self-managed) ya Fargate pods</li>
            <li><strong>Pod:</strong> Kubernetes smallest deployable unit — ek ya zyada containers together, shared network namespace</li>
            <li><strong>Deployment:</strong> Desired replica count maintain karta hai — rolling updates, rollback</li>
            <li><strong>Service (K8s):</strong> Load balancing within cluster + external exposure via AWS LB Controller</li>
          </ul>
          <p style={S.p}>
            EKS choose karo jab: existing Kubernetes workloads migrate karna ho, multi-cloud portability chahiye, specific K8s ecosystem tools (Istio, Argo CD, Prometheus) use karne ho. ECS choose karo jab: AWS-native, simpler operations, no K8s expertise needed.
          </p>
        </section>

        <section id="aws-fargate">
          <h3 style={S.h3}>AWS Fargate</h3>
          <p style={S.p}>
            Fargate serverless compute engine hai containers ke liye — EC2 instances provision ya manage karne ki zaroorat nahi. ECS aur EKS dono Fargate use kar sakte hain.
          </p>
          <ul style={S.ul}>
            <li>No EC2 to patch, no cluster capacity to manage, no AMI updates</li>
            <li>Per-task billing: vCPU + memory per second — idle capacity pay nahi karo</li>
            <li>Each Fargate task apne dedicated micro-VM pe run karta hai (stronger isolation than shared EC2)</li>
            <li>awsvpc networking: each task ko own ENI, own private IP, own Security Group</li>
          </ul>
          <p style={S.p}>
            Fargate vs EC2 launch type: unpredictable burst workloads, batch jobs, event-driven tasks → Fargate. Steady-state high-density workloads, GPU requirement, specific EC2 features → EC2 launch type.
          </p>
        </section>

        <section id="container-networking">
          <h3 style={S.h3}>Container Networking</h3>
          <p style={S.p}>
            ECS awsvpc mode (recommended): har task ko VPC mein apna ENI milta hai — own private IP, own Security Group, independent network identity. Task IAM Role = fine-grained AWS permissions per task (not EC2 instance role).
          </p>
          <p style={S.p}>
            EKS networking: AWS VPC CNI plugin (recommended) — each pod gets real VPC IP from subnet. Security Groups for Pods: per-pod SG assign karo. ALB Ingress Controller: Kubernetes Ingress → AWS ALB automatically provision karta hai.
          </p>
          <p style={S.p}>
            ECR (Elastic Container Registry): private Docker registry, IAM-based access control, image scanning (Inspector integration), lifecycle policies (purge old images automatically). Traditional DC private Docker registry (Nexus, Harbor) ka AWS equivalent.
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
          Serverless architecture mein tum sirf application logic pe focus karte ho — infrastructure provision, patch, scale AWS automatically manage karta hai. Pay-per-use model: idle pe zero cost.
        </p>

        <section id="lambda-execution">
          <h3 style={S.h3}>Lambda Execution Model</h3>
          <p style={S.p}>
            Lambda event-triggered function-as-a-service hai. Trigger aata hai → Lambda invokes your function → execution completes → billing stops. Supported runtimes: Node.js, Python, Java, Go, Ruby, .NET, custom runtime (any binary).
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
            Cold start tab hota hai jab Lambda function pehli baar invoke hota hai ya long idle ke baad — AWS naya execution environment initialize karta hai: container download, runtime init, function handler load. Yeh 100ms se seconds tak lag sakta hai depending on runtime aur initialization code.
          </p>
          <ul style={S.ul}>
            <li><strong>Warm invocation:</strong> Existing container reuse — no cold start, fast (milliseconds)</li>
            <li><strong>Cold start factors:</strong> Runtime (Python/Node fast; Java/C# slow), package size, VPC ENI creation (biggest contributor for VPC Lambda), initialization code</li>
            <li><strong>Provisioned Concurrency:</strong> Pre-warm N containers always — eliminates cold starts for those N. Cost: you pay for warm containers even when not invoked</li>
            <li><strong>VPC Lambda:</strong> ENI creation badhata tha cold start; AWS ne Hyperplane ENIs se fix kiya hai — modern VPC Lambda cold starts significantly reduced</li>
          </ul>
          <Callout type="important" title="Cold Start vs Latency Requirements">
            User-facing synchronous APIs ke liye cold start matter karta hai — Provisioned Concurrency ya lightweight runtime use karo. Background async processing ke liye cold start generally acceptable hai.
          </Callout>
        </section>

        <section id="api-gateway">
          <h3 style={S.h3}>API Gateway</h3>
          <p style={S.p}>
            API Gateway fully managed service hai jo REST, HTTP aur WebSocket APIs create, publish, secure aur scale karta hai. Lambda ke saath pair karo → complete serverless API.
          </p>
          <ul style={S.ul}>
            <li><strong>REST API:</strong> Full-featured — usage plans, API keys, request/response transformation, custom authorizers</li>
            <li><strong>HTTP API:</strong> Newer, simpler, cheaper (lower latency) — JWT auth, Lambda proxy. Simple use cases ke liye preferred.</li>
            <li><strong>WebSocket API:</strong> Bi-directional communication — real-time chat, notifications, gaming</li>
            <li><strong>Authorizers:</strong> Lambda Authorizer (custom auth logic) ya Cognito User Pool (JWT validation) — IAM auth bhi possible</li>
            <li><strong>Throttling:</strong> Per-stage, per-method rate limits — DDoS protection, cost control</li>
          </ul>
          <p style={S.p}>
            Traditional DC mein: NGINX + uWSGI + Flask = API setup. AWS mein: API Gateway + Lambda = same without managing any server. Auto-scales to millions of requests, no capacity planning.
          </p>
        </section>

        <section id="step-functions">
          <h3 style={S.h3}>Step Functions</h3>
          <p style={S.p}>
            Step Functions serverless workflow orchestration service hai — Lambda functions aur AWS services ko complex workflows mein coordinate karta hai. State machine visual designer + JSON/YAML definition.
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
            Event-driven architecture mein services loosely coupled hain — ek service event produce karta hai, doosra consume karta hai, dono ko ek dusre ka directly pata nahi.
          </p>
          <ul style={S.ul}>
            <li><strong>EventBridge:</strong> Event bus — AWS services, custom apps, SaaS events route karo. Rules define karo: kaunsa event → kaunhi target (Lambda, SQS, Step Functions, etc)</li>
            <li><strong>SQS (Simple Queue Service):</strong> Message queue — producer ne message publish kiya, consumer pull karta hai apni pace pe. Decoupling + buffering. Standard (at-least-once) ya FIFO (exactly-once ordered).</li>
            <li><strong>SNS (Simple Notification Service):</strong> Pub/sub — ek message → multiple subscribers (Lambda, SQS, HTTP endpoints, email). Fan-out pattern.</li>
          </ul>
          <p style={S.p}>
            Classic pattern: S3 image upload → S3 event → SQS → Lambda (resize) → S3 (output) → EventBridge → SNS notification. Sab serverless, sab pay-per-use, zero idle cost.
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
            Manual AWS console clicks reproducible, auditable, version-controlled nahi hote. Koi bhi production environment eventually yeh problems face karta hai: "Yeh VPC kisne create kiya aur kyun?" "Staging environment production se kaise alag hai?" "Is S3 bucket ka encryption config kya hai?"
          </p>
          <p style={S.p}>
            IaC in problems solve karta hai — infrastructure define karo code mein, version control mein track karo, automate karo deployments. Benefits: repeatability (same template → same infra every time), drift detection, rollback, living documentation, GitOps (PR-based review), CI/CD integration.
          </p>
          <Callout type="important" title="IaC from Day One">
            Production AWS environments bina IaC ke eventually unmaintainable ho jaate hain. Console clicks track nahi hote, reproducible nahi hain. IaC adopt karo project start se — migration painful hai baad mein.
          </Callout>
        </section>

        <section id="cloudformation">
          <h3 style={S.h3}>AWS CloudFormation</h3>
          <p style={S.p}>
            CloudFormation AWS native IaC service hai — YAML ya JSON templates mein resources define karo, CloudFormation Stacks deploy karta hai. AWS Service directly managed — no additional tool install needed.
          </p>
          <ul style={S.ul}>
            <li><strong>Template:</strong> YAML/JSON file — Resources, Parameters, Outputs, Mappings, Conditions sections</li>
            <li><strong>Stack:</strong> Template se created resources ka group — create, update, delete atomically</li>
            <li><strong>Stack Sets:</strong> Multiple accounts + Regions mein same stack deploy — organization-wide infra</li>
            <li><strong>Change Sets:</strong> Preview karo kya change hoga before applying — production mein critical</li>
            <li><strong>Drift Detection:</strong> Console se manual changes detect karo — drift report generate karta hai</li>
            <li><strong>Rollback:</strong> Failed update pe automatic rollback previous successful state pe</li>
          </ul>
          <p style={S.p}>
            CloudFormation choose karo jab: AWS-only environment, no HashiCorp dependency, native AWS integration (StackSets for multi-account), serverless application model (SAM — CloudFormation extension for Lambda).
          </p>
        </section>

        <section id="terraform">
          <h3 style={S.h3}>Terraform</h3>
          <p style={S.p}>
            Terraform HashiCorp ka open-source IaC tool hai — multi-cloud, 1000+ providers ke saath (AWS, Azure, GCP, Kubernetes, databases). HCL (HashiCorp Configuration Language) mein resources define karo.
          </p>
          <ul style={S.ul}>
            <li><strong>Provider:</strong> AWS provider resources manage karta hai — aws_vpc, aws_instance, aws_rds_cluster etc</li>
            <li><strong>State File:</strong> Terraform current state track karta hai — remote state S3 + DynamoDB locking (team collaboration ke liye)</li>
            <li><strong>Plan:</strong> <code>terraform plan</code> → preview changes before apply (CloudFormation Change Sets equivalent)</li>
            <li><strong>Apply:</strong> <code>terraform apply</code> → changes execute karo</li>
            <li><strong>Modules:</strong> Reusable infrastructure components — VPC module, EC2 module. Terraform Registry se public modules available.</li>
          </ul>
          <p style={S.p}>
            Terraform choose karo jab: multi-cloud environment, existing Terraform skills/modules, Kubernetes + AWS together manage karna, strong community ecosystem needed.
          </p>
        </section>

        <section id="aws-cdk">
          <h3 style={S.h3}>AWS CDK</h3>
          <p style={S.p}>
            AWS CDK (Cloud Development Kit) code-first IaC approach hai — TypeScript, Python, Java, C#, Go mein infra define karo using real programming language constructs. CDK code CloudFormation templates mein compile hota hai.
          </p>
          <ul style={S.ul}>
            <li><strong>Constructs:</strong> Reusable CDK components — L1 (raw CloudFormation), L2 (opinionated defaults), L3 (complete patterns)</li>
            <li><strong>App:</strong> CDK application — ek ya zyada Stacks contain karta hai</li>
            <li><strong>Synth:</strong> <code>cdk synth</code> → CloudFormation template generate karo</li>
            <li><strong>Deploy:</strong> <code>cdk deploy</code> → synthesize + deploy</li>
            <li><strong>Benefit:</strong> Real language = loops, conditions, abstractions, unit tests on infra</li>
          </ul>
        </section>

        <section id="iac-change-management">
          <h3 style={S.h3}>IaC Change Management and Best Practices</h3>
          <ul style={S.ul}>
            <li><strong>Version Control:</strong> IaC code Git mein — every infrastructure change PR se approve ho</li>
            <li><strong>Branches:</strong> dev/staging/prod environments → separate branches or workspaces</li>
            <li><strong>CI/CD for IaC:</strong> PR → automated <code>plan</code> output → review → merge → auto <code>apply</code></li>
            <li><strong>State locking:</strong> Terraform: DynamoDB lock; CloudFormation: native stack locking</li>
            <li><strong>Secrets:</strong> IaC mein secrets hardcode mat karo — Secrets Manager ya Parameter Store reference karo</li>
            <li><strong>Modular structure:</strong> Networking, compute, database — separate modules/stacks. Dependencies explicit.</li>
            <li><strong>Tagging via IaC:</strong> IaC templates mein tags enforce karo — manual tagging unreliable</li>
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
            Traditional DC se AWS mein migrate karne ke multiple strategies hain — "7 Rs" framework. Har application alag strategy deserve karta hai:
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
            Bahut enterprises Rehost se start karte hain — quickly move to cloud, then Replatform/Refactor gradually. Refactor pehle karna expensive aur risky hota hai. Lift-and-shift first = faster results.
          </Callout>
        </section>

        <section id="migration-hub">
          <h3 style={S.h3}>AWS Migration Hub</h3>
          <p style={S.p}>
            Migration Hub single dashboard hai jo sab migration tools ki progress track karta hai — Application Migration Service, DMS, partner tools sab yahan aggregate hote hain. Application grouping, dependency mapping, migration status tracking.
          </p>
          <p style={S.p}>
            Migration Hub Strategy Recommendations: existing applications analyze karta hai (via AWS Collector agent) aur each application ke liye recommended migration strategy suggest karta hai.
          </p>
        </section>

        <section id="application-migration-service">
          <h3 style={S.h3}>AWS Application Migration Service (MGN)</h3>
          <p style={S.p}>
            MGN server replication + cutover tool hai — physical, virtual (VMware, Hyper-V) ya cloud servers ko EC2 pe continuously replicate karo. Cutover ke time minimal downtime.
          </p>
          <ul style={S.ul}>
            <li>AWS Replication Agent on-prem server pe install hota hai</li>
            <li>Continuous block-level replication to AWS (encrypted)</li>
            <li>Test launches → validate environment before actual cutover</li>
            <li>Cutover window: minutes (final delta sync + DNS change)</li>
            <li>Traditional DC se lift-and-shift ke liye yeh fastest tool hai</li>
          </ul>
        </section>

        <section id="database-migration-service">
          <h3 style={S.h3}>AWS Database Migration Service (DMS)</h3>
          <p style={S.p}>
            DMS source database se target database mein migrate karta hai — homogeneous (MySQL → RDS MySQL) ya heterogeneous (Oracle → Aurora PostgreSQL) migrations.
          </p>
          <ul style={S.ul}>
            <li><strong>Full Load:</strong> Existing data migrate karo — initial bulk load</li>
            <li><strong>CDC (Change Data Capture):</strong> Ongoing changes replicate karo — minimal downtime migration</li>
            <li><strong>Schema Conversion Tool (SCT):</strong> Heterogeneous: Oracle/SQL Server stored procedures, functions → PostgreSQL/MySQL compatible code mein convert</li>
            <li><strong>Replication Instance:</strong> DMS managed EC2 instance jo migration perform karta hai — size on data volume/rate depend karta hai</li>
          </ul>
        </section>

        <section id="snowball">
          <h3 style={S.h3}>AWS Snowball and Snowmobile</h3>
          <p style={S.p}>
            Internet se large data transfer impractical hai jab terabytes/petabytes migrate karne ho — bandwidth limitation aur time pe. Physical data transfer devices:
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
            Workflow: AWS Snowball device deliver karta hai → data copy karo → device wapas AWS ko → AWS S3/Glacier mein import karta hai. Encrypted at rest (AES-256) aur in transit. Traditional DC-to-DC data migration ke liye physical shipper equivalent.
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
          AWS security defense-in-depth approach follow karta hai — multiple layers, koi single layer perfect nahi. Traditional DC security layers ka cloud equivalent:
        </p>
        <Figure caption="AWS security layers: Organizations/SCP, WAF/Shield, VPC security, IAM, data protection, threat detection">
          <SecurityLayersDiagram />
        </Figure>

        <section id="kms">
          <h3 style={S.h3}>AWS KMS — Key Management Service</h3>
          <p style={S.p}>
            KMS managed cryptographic key service hai — encryption keys create, manage aur use karo without managing key material yourself. Traditional DC HSM (Hardware Security Module) ka cloud equivalent.
          </p>
          <ul style={S.ul}>
            <li><strong>CMK (Customer Master Key):</strong> Master key — directly data encrypt nahi karta, data keys generate karta hai (envelope encryption)</li>
            <li><strong>Envelope Encryption:</strong> KMS CMK → data key generate → data key se data encrypt → encrypted data key + ciphertext store karo. Decrypt: KMS se data key decrypt → data key se data decrypt</li>
            <li><strong>AWS Managed Keys:</strong> AWS services (S3, EBS, RDS) ke liye automatically create/rotate — no management needed</li>
            <li><strong>Customer Managed Keys:</strong> You control rotation, deletion, access policy — compliance requirements ke liye</li>
            <li><strong>Key Policies:</strong> IAM policies se different — KMS keys pe resource-based policy mandatory hai</li>
          </ul>
          <p style={S.p}>
            Integration: S3 SSE-KMS, EBS encryption, RDS encryption, Secrets Manager, CloudTrail log encryption — sab KMS use karte hain. KMS key deletion scheduled (7-30 days wait) — accidentally delete hone se protection.
          </p>
        </section>

        <section id="secrets-manager">
          <h3 style={S.h3}>AWS Secrets Manager</h3>
          <p style={S.p}>
            Secrets Manager sensitive credentials (database passwords, API keys, OAuth tokens) securely store aur automatically rotate karta hai. Traditional DC CyberArk / HashiCorp Vault equivalent.
          </p>
          <ul style={S.ul}>
            <li><strong>Storage:</strong> Encrypted with KMS; versioned; audit via CloudTrail</li>
            <li><strong>Automatic Rotation:</strong> Lambda function pe delegate — RDS passwords, OAuth tokens, custom secrets</li>
            <li><strong>Cross-account access:</strong> Resource policy se other accounts ke applications access kar sakte hain</li>
            <li><strong>Integration:</strong> RDS, Redshift, DocumentDB native rotation; custom Lambda for others</li>
          </ul>
          <p style={S.p}>
            Never hardcode credentials in code or environment variables. Secrets Manager reference karo from application — SDK call karo, fresh credentials milte hain. Rotation transparent hai application ko.
          </p>
        </section>

        <section id="acm">
          <h3 style={S.h3}>AWS Certificate Manager (ACM)</h3>
          <p style={S.p}>
            ACM TLS/SSL certificates provision, manage aur deploy karta hai — free public certificates, auto-renewal, direct ALB/CloudFront/API Gateway integration.
          </p>
          <ul style={S.ul}>
            <li><strong>Public Certificates:</strong> Free for AWS services — ALB, CloudFront, API Gateway. Auto-renewed before expiry.</li>
            <li><strong>Private CA (ACM PCA):</strong> Internal PKI — private certificates for internal services, mTLS, code signing</li>
            <li><strong>Validation:</strong> DNS validation (Route 53 auto-configure karta hai, recommended) ya email validation</li>
            <li><strong>Note:</strong> ACM certificates EC2 directly attach nahi hote — only with integrated AWS services. EC2 pe apne certs use karo (import karo ACM mein ya self-manage).</li>
          </ul>
          <p style={S.p}>
            Certificate expiry monitoring: ACM auto-renews managed certs. Imported certs: CloudWatch Events se expiry alert configure karo. Traditional DC mein cert expiry monitoring often manual hota hai — ACM yeh pain eliminate karta hai.
          </p>
        </section>

        <section id="guardduty">
          <h3 style={S.h3}>Amazon GuardDuty</h3>
          <p style={S.p}>
            GuardDuty intelligent threat detection service hai — CloudTrail, VPC Flow Logs, DNS logs, EKS audit logs analyze karta hai continuously. Machine learning + threat intelligence feeds se anomalies detect karta hai.
          </p>
          <ul style={S.ul}>
            <li><strong>Threat types:</strong> Unauthorized IAM activity, EC2 instance communicating with known malicious IPs, cryptocurrency mining, compromised credentials, data exfiltration patterns</li>
            <li><strong>No agent:</strong> Agentless — sirf logs analyze karta hai. Enable karo, bas.</li>
            <li><strong>Findings:</strong> Severity (low/medium/high), description, affected resource, recommended action</li>
            <li><strong>Integration:</strong> EventBridge → Lambda → auto-remediate (isolate instance, revoke credentials)</li>
            <li><strong>Multi-account:</strong> Organizations-wide GuardDuty — delegated admin account centrally manages</li>
          </ul>
          <p style={S.p}>
            Traditional DC SIEM pe threat intelligence feed + log correlation = similar concept, lekin GuardDuty AWS-aware hai — IAM activity patterns, AWS-specific attack vectors understand karta hai.
          </p>
        </section>

        <section id="inspector">
          <h3 style={S.h3}>Amazon Inspector</h3>
          <p style={S.p}>
            Inspector automated vulnerability assessment service hai — EC2 instances, container images (ECR), Lambda functions continuously scan karta hai CVEs aur network exposure ke liye.
          </p>
          <ul style={S.ul}>
            <li><strong>EC2:</strong> OS packages, application packages mein known CVEs scan karo</li>
            <li><strong>ECR:</strong> Container image push hone pe automatically scan — CI/CD pipeline mein integrate</li>
            <li><strong>Lambda:</strong> Function code + layers mein vulnerabilities</li>
            <li><strong>CVSS scoring:</strong> Prioritized findings — critical pehle fix karo</li>
            <li><strong>SSM Agent required:</strong> EC2 scanning ke liye SSM Agent installed hona chahiye</li>
          </ul>
          <p style={S.p}>
            Traditional DC vulnerability scanner (Nessus, Qualys, Tenable) ka equivalent — lekin agentless for containers, automatically integrated with ECR pipeline.
          </p>
        </section>

        <section id="security-hub">
          <h3 style={S.h3}>AWS Security Hub</h3>
          <p style={S.p}>
            Security Hub ek aggregator hai — GuardDuty, Inspector, Macie, IAM Access Analyzer, Firewall Manager, partner solutions sab ke findings ek jagah collect karta hai. CSPM (Cloud Security Posture Management) functionality bhi hai.
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
            <strong>AWS WAF (Web Application Firewall):</strong> Layer 7 HTTP/HTTPS traffic inspect aur filter karta hai. CloudFront, ALB, API Gateway, AppSync ke saath deploy hota hai.
          </p>
          <ul style={S.ul}>
            <li>Rules: SQLi protection, XSS protection, geo-blocking, IP reputation lists, rate limiting (per-IP), custom rules</li>
            <li>Managed Rule Groups: AWS aur 3rd party (Cloudflare, F5, Imperva) pre-built rules — immediately enable karo</li>
            <li>Bot Control: Automated bot traffic identify aur manage karo (crawlers, scrapers, credential stuffing)</li>
            <li>CAPTCHA integration: Suspicious requests pe CAPTCHA challenge</li>
          </ul>
          <p style={S.p}>
            <strong>AWS Shield:</strong> DDoS protection service.
          </p>
          <ul style={S.ul}>
            <li><strong>Shield Standard:</strong> Automatically enabled for all AWS customers — L3/L4 DDoS protection (SYN floods, UDP reflection, volumetric attacks). No additional cost.</li>
            <li><strong>Shield Advanced:</strong> L3/L4/L7 protection, DDoS Response Team (DRT) access 24/7, cost protection (AWS credits during attack), Global Accelerator aur Route 53 protection, real-time metrics. Annual commitment required.</li>
          </ul>
          <p style={S.p}>
            Traditional DC: on-path WAF appliance (F5 ASM, Imperva) + upstream DDoS scrubbing center (Akamai, Cloudflare). AWS mein: WAF + Shield = same protection, managed, auto-scale.
          </p>
        </section>

        <p style={S.p}>
          Multi-account security best practice: separate accounts for production, dev, security tooling, log archive. SCPs prevent anyone from disabling security services (GuardDuty, CloudTrail). Security Hub aggregates across accounts. Centralized log archive account mein CloudTrail logs write karo — tampering prevent karne ke liye.
        </p>
      </section>

      {/* ─── COST AWARENESS ───────────────────────────────────────────────── */}
      <section id="cost-awareness">
        <h2 style={S.h2}>Cost Optimization</h2>
        <p style={S.p}>
          Infrastructure engineers ke liye cloud cost awareness zaroori hai — architecture decisions directly cost affect karte hain. Current prices AWS pricing page pe hain (yahan provide nahi karte — prices change karte hain).
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
            Cost Explorer visual analytics tool hai — historical spend analyze karo, service-level breakdown dekho, future costs forecast karo. Filters: by service, linked account, region, tag, usage type.
          </p>
          <ul style={S.ul}>
            <li>Savings Plan purchase recommendations: based on past 7/14/30 days usage</li>
            <li>RI purchase recommendations: service + instance type + region specific</li>
            <li>Anomaly Detection: unexpected cost spikes automatically alert</li>
          </ul>

          <h3 style={S.h3}>AWS Budgets</h3>
          <p style={S.p}>
            Budget thresholds set karo — actual ya forecast spend pe alerts. Types: Cost budget (spend X se zyada hone pe alert), Usage budget (specific service usage pe), RI/SP utilization budget (reserved capacity under-utilized alert).
          </p>
          <p style={S.p}>
            Action: Budget breach pe automatically action trigger karo — IAM policy apply (restrict new resource creation), EC2/RDS instances stop, SNS notification → Lambda remediation.
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
            <li><strong>Compute Optimizer:</strong> CloudWatch metrics analyze karke EC2, ASG, EBS, Lambda ke liye right-size recommendations. Over-provisioned instances identify karo — downsize karke save karo.</li>
            <li><strong>Instance type changes:</strong> m5.xlarge → m6i.large (newer gen, same cost, better performance)</li>
            <li><strong>Graviton (ARM):</strong> Same workload, 20-40% cheaper. Java, Python, Go, .NET workloads well-supported.</li>
            <li><strong>Spot for appropriate workloads:</strong> Batch, CI/CD runners, dev environments — 60-90% savings</li>
          </ul>

          <h3 style={S.h3}>Storage Cost Optimization</h3>
          <ul style={S.ul}>
            <li><strong>S3 Intelligent-Tiering:</strong> Automatically move objects between tiers — zero retrieval cost for frequent access tier</li>
            <li><strong>EBS unattached volumes:</strong> EC2 terminate hone pe volumes often orphan ho jaate hain — regularly audit</li>
            <li><strong>EBS snapshot lifecycle:</strong> Old snapshots delete karo — DLM (Data Lifecycle Manager) automate karta hai</li>
            <li><strong>EBS gp2 → gp3 migration:</strong> gp3 same performance cheaper hai — existing gp2 volumes migrate karo</li>
          </ul>

          <h3 style={S.h3}>Trusted Advisor</h3>
          <p style={S.p}>
            Trusted Advisor automated best practice checks karta hai — five categories: Cost Optimization, Performance, Security, Fault Tolerance, Service Limits. Free tier: limited checks. Business/Enterprise support: all checks available.
          </p>
          <p style={S.p}>
            Cost Optimization checks: idle EC2 instances (CPU below threshold), unused Elastic IPs, underutilized EBS volumes, unused RIs. Security checks: open Security Groups, MFA on root. Action: recommendations implement karo → re-check.
          </p>

          <Callout type="important" title="FinOps from Day One">
            Cloud cost governance post-launch add karna hard hai. Tagging enforce karo from day one — AWS Config rules se. Budget alerts set karo pehle deploy se. Architecture review mein cost impact estimate karo. Cloud cost = engineering responsibility, sirf finance team nahi.
          </Callout>
        </section>
      </section>

      {/* ─── WELL-ARCHITECTED ─────────────────────────────────────────────── */}
      <section id="well-architected">
        <h2 style={S.h2}>AWS Well-Architected Framework</h2>
        <p style={S.p}>
          AWS Well-Architected Framework six pillars define karta hai jo cloud architecture quality measure karte hain. Infrastructure engineer ke liye yeh ek practical design checklist hai:
        </p>
        <Figure caption="AWS Well-Architected Framework: six pillars with practical examples for DC engineers">
          <WellArchitectedDiagram />
        </Figure>

        <section id="wa-operational-excellence">
          <h3 style={S.h3}>Pillar 1: Operational Excellence</h3>
          <p style={S.p}>
            Systems run karo, monitor karo, aur continuously improve karo. Operations ek code delivery ki tarah treat karo.
          </p>
          <ul style={S.ul}>
            <li><strong>IaC mandatory:</strong> All changes via code — no manual console clicks in production</li>
            <li><strong>Frequent small changes:</strong> Large infrequent deployments risky hain — CI/CD pipeline se small, reversible deployments</li>
            <li><strong>Runbooks:</strong> Documented procedures for routine operations — onboarding new team member, deployment, rollback</li>
            <li><strong>Postmortems (blameless):</strong> Every incident → root cause analysis → process improvement. Blame people ko nahi, systems ko fix karo.</li>
            <li><strong>CloudWatch dashboards:</strong> Real-time visibility — key metrics always visible to operations team</li>
          </ul>
        </section>

        <section id="wa-security">
          <h3 style={S.h3}>Pillar 2: Security</h3>
          <p style={S.p}>
            Har layer pe security — identity, infrastructure, data, applications, monitoring.
          </p>
          <ul style={S.ul}>
            <li><strong>Strong identity:</strong> IAM roles everywhere, MFA on all humans, no long-lived access keys in code</li>
            <li><strong>Enable traceability:</strong> CloudTrail + VPC Flow Logs + GuardDuty always on — turn off mat karo</li>
            <li><strong>Security at all layers:</strong> Edge (WAF/Shield) + Network (SG/NACL) + Instance (patching) + App + Data</li>
            <li><strong>Encrypt everything:</strong> S3 SSE-KMS, EBS encrypted, RDS encrypted, TLS in transit</li>
            <li><strong>Prepare for incidents:</strong> GuardDuty + Security Hub + automated response playbooks. Practice tabletop exercises.</li>
          </ul>
        </section>

        <section id="wa-reliability">
          <h3 style={S.h3}>Pillar 3: Reliability</h3>
          <p style={S.p}>
            System failures se automatically recover karo. Scale horizontally. Failure test karo regularly.
          </p>
          <ul style={S.ul}>
            <li><strong>Test recovery procedures:</strong> DR plan jo kabhi test nahi hua woh plan nahi — annually ya quarterly test karo</li>
            <li><strong>Scale horizontally:</strong> Single large server → multiple smaller servers behind LB. Single point of failure eliminate karo.</li>
            <li><strong>Stop guessing capacity:</strong> Auto Scaling se demand-driven scaling — over-provision mat karo</li>
            <li><strong>Manage change in automation:</strong> Manual changes = errors. IaC + CI/CD = predictable changes</li>
            <li><strong>Chaos Engineering:</strong> Production mein controlled failures inject karo (Chaos Monkey concept) — Netflix pioneered, AWS Fault Injection Simulator tool available</li>
          </ul>
        </section>

        <section id="wa-performance">
          <h3 style={S.h3}>Pillar 4: Performance Efficiency</h3>
          <p style={S.p}>
            Sahi resource type choose karo. Managed services use karo jab appropriate. Performance monitor karo.
          </p>
          <ul style={S.ul}>
            <li><strong>Right resource types:</strong> Memory-intensive workload → r-series EC2, not t-series. Choose correctly pehle, then optimize.</li>
            <li><strong>Use managed services:</strong> RDS instead of self-managed MySQL on EC2 — AWS patches, backs up, multi-AZ manages</li>
            <li><strong>Serverless where appropriate:</strong> Lambda for event-driven — no idle cost, auto-scale</li>
            <li><strong>Go global in minutes:</strong> CloudFront + multi-region deployment — users ke paas content deliver karo</li>
            <li><strong>Benchmark and experiment:</strong> CloudWatch metrics se performance baselines establish karo — changes ke impact measure karo</li>
          </ul>
        </section>

        <section id="wa-cost-optimization">
          <h3 style={S.h3}>Pillar 5: Cost Optimization</h3>
          <p style={S.p}>
            Sirf zaroori resources use karo. Right-size karo. Consumption model adopt karo.
          </p>
          <ul style={S.ul}>
            <li><strong>Adopt consumption model:</strong> Pay for what you use — dev environments nights/weekends band karo</li>
            <li><strong>Measure overall efficiency:</strong> Business outcome per dollar spend track karo — not just total spend</li>
            <li><strong>Avoid undifferentiated heavy lifting:</strong> Managed services use karo — self-managing Kafka on EC2 vs Amazon MSK</li>
            <li><strong>Analyze spend:</strong> Cost Explorer weekly review. Anomaly alerts. Team-level chargebacks via tags.</li>
            <li><strong>Reserved capacity:</strong> Steady-state workloads pe RIs/Savings Plans se 30-70% savings</li>
          </ul>
        </section>

        <section id="wa-sustainability">
          <h3 style={S.h3}>Pillar 6: Sustainability</h3>
          <p style={S.p}>
            Environmental impact minimize karo — cloud pe yeh resource efficiency maximize karne se hota hai.
          </p>
          <ul style={S.ul}>
            <li><strong>Managed services:</strong> Better hardware utilization than dedicated servers — AWS shared infrastructure more efficient</li>
            <li><strong>Right-size workloads:</strong> Oversized instances waste energy — Compute Optimizer recommendations follow karo</li>
            <li><strong>Graviton (ARM) processors:</strong> Same performance, 20-60% less energy than x86</li>
            <li><strong>Minimize data movement:</strong> Data transfer = energy. Same-region, same-AZ resources prefer karo where latency allows.</li>
            <li><strong>Region selection:</strong> AWS Regions differ in renewable energy use — sustainability-focused Regions exist (e.g., EU regions)</li>
          </ul>
        </section>

        <p style={S.p}>
          AWS Well-Architected Tool (free, in console) workloads ko review karta hai in six pillars ke against — questions answer karo, improvement recommendations milte hain. Milestones track karo — quarterly review recommended.
        </p>
      </section>

      {/* ─── ARCHITECTURE EXAMPLES ────────────────────────────────────────── */}
      <section id="architecture-examples">
        <h2 style={S.h2}>Architecture Examples</h2>

        <section id="small-web-app">
          <h3 style={S.h3}>Small Web Application</h3>
          <p style={S.p}>
            Simple web application — startup ya internal tool. Cost-optimized, low-complexity.
          </p>
          <ul style={S.ul}>
            <li><strong>Why this architecture:</strong> Low traffic, budget-conscious, single developer/small team. Simplicity over redundancy initially.</li>
            <li>Route 53 → CloudFront → ALB → single EC2 (t3.medium, AZ-a)</li>
            <li>RDS (single-AZ — cost saving for non-critical) in private subnet</li>
            <li>S3 for static assets (images, CSS, JS) — CloudFront se serve karo</li>
            <li>Certificate Manager → ALB HTTPS termination. No HTTP.</li>
            <li>CloudWatch basic monitoring + billing alarm</li>
            <li><strong>Limitation:</strong> Single-AZ = AZ failure → outage. Acceptable for non-critical internal tools. Production customer-facing → Multi-AZ upgrade karo.</li>
          </ul>
        </section>

        <section id="three-tier">
          <h3 style={S.h3}>Three-Tier Enterprise Application</h3>
          <p style={S.p}>
            Classic enterprise three-tier architecture AWS mein — HA, scalable, secure.
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
            <li><strong>Data synchronization challenge:</strong> Active-active mein write conflicts possible — application design carefully karo. DynamoDB Global Tables last-writer-wins by default.</li>
            <li><strong>Cost:</strong> 2x infrastructure + cross-region data transfer costs. Calculate ROI vs downtime cost.</li>
          </ul>
          <Callout type="warning" title="Multi-Region Complexity">
            Multi-region active-active ek advanced pattern hai — experienced teams ke liye. Start with single region HA, then consider multi-region DR. Multi-region active-active ke bina single-region HA bahut problems solve kar deta hai.
          </Callout>
        </section>

        <section id="hybrid-dc-example">
          <h3 style={S.h3}>Hybrid Data Center Integration</h3>
          <p style={S.p}>
            Enterprise hybrid pattern — on-prem DC aur AWS dono simultaneously. Most enterprise AWS journeys yahi se start karte hain.
          </p>
          <p style={S.p}>
            <strong>Why this architecture:</strong> On-prem aur AWS applications dono exist karein — gradual migration, compliance requirements for some data on-prem, latency-sensitive workloads on-prem.
          </p>
          <ul style={S.ul}>
            <li>Direct Connect (primary, 1Gbps) + Site-to-Site VPN (backup) → Transit Gateway → VPC attachments</li>
            <li>On-prem AD → AWS IAM Identity Center via SAML federation — single identity across both</li>
            <li>Route 53 Resolver Endpoints — bidirectional DNS between on-prem and AWS private zones</li>
            <li>Storage Gateway — on-prem file shares → S3 for archival aur backup</li>
            <li>AWS Outposts — latency-sensitive applications on-prem pe, same AWS APIs</li>
            <li>Centralized logging: CloudTrail + VPC Flow Logs → S3 (separate log archive account)</li>
            <li>Security Hub + GuardDuty across all AWS accounts → SIEM integration via EventBridge</li>
          </ul>
          <Callout type="important" title="Hybrid Network Path Analysis">
            Hybrid environment mein traffic path trace karo: on-prem router → DX/VPN → TGW → VPC route table → subnet route → SG check → NACL check → instance. Return path reverse karo. Asymmetric routing common issue hai — both directions explicitly verify karo.
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
          AWS troubleshooting ek systematic approach chahti hai — Identify → Verify → Isolate → Measure → Analyze → Fix → Validate → Monitor. Layers skip karna dangerous hai.
        </p>

        <section id="ts-sequence">
          <h3 style={S.h3}>Systematic Sequence</h3>
          <ol style={{ ...S.ul, listStyleType: "decimal" }}>
            <li><strong>DNS resolving correctly?</strong> <code>nslookup</code> / <code>dig</code> — Route 53 record exist karta hai? Correct IP? TTL cached old value?</li>
            <li><strong>Public/private connectivity design correct?</strong> IGW VPC se attached hai? Public subnet mein route hai IGW ke liye?</li>
            <li><strong>Route table correct?</strong> Subnet ka route table check karo — required route present hai?</li>
            <li><strong>IGW/NAT path correct?</strong> Public instance ke liye: IGW route + public IP. Private outbound: NAT GW route, NAT GW public subnet mein.</li>
            <li><strong>Security Group allows traffic?</strong> Stateful — inbound rule check karo. Source IP/SG correct hai? Protocol aur port exact match?</li>
            <li><strong>NACL allows traffic AND return path?</strong> Stateless — inbound aur outbound dono check karo. Ephemeral ports outbound allow hain?</li>
            <li><strong>Load Balancer healthy?</strong> LB status, listener rules, target group association, certificate valid?</li>
            <li><strong>Target registered and healthy?</strong> Target group health checks passing? Correct health check port/path configured?</li>
            <li><strong>EC2 instance running?</strong> Instance state Running — not stopped, terminated, pending.</li>
            <li><strong>OS/application listening?</strong> EC2 Running ≠ Application healthy. Port pe process sun raha hai? Application crashed hai? <code>ss -tlnp</code> ya <code>netstat</code>.</li>
            <li><strong>Return routing correct?</strong> Instance apna response correctly route kar sakta hai — asymmetric path issues? VPC Flow Logs verify karo.</li>
            <li><strong>IAM permissions relevant?</strong> AccessDenied error? IAM policy, role attachment, resource policy, SCP check karo. CloudTrail mein API error dekho.</li>
            <li><strong>CloudWatch logs/metrics?</strong> Application logs mein error pattern? Metrics mein anomaly? VPC Flow Logs mein REJECT entries?</li>
          </ol>
          <Figure caption="AWS troubleshooting layered diagnostic sequence — DNS se OS/application tak, layer by layer">
            <TroubleshootingFlowDiagram />
          </Figure>
          <p style={S.p}>
            <strong>EC2 Troubleshooting:</strong> Status checks (System check = AWS infrastructure; Instance check = OS). Failed system check = AWS responsibility. Failed instance check = OS/software issue. System Log aur Screenshot via console available without SSH.
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
          Yeh ek production-grade multi-AZ architecture hai jo sab covered concepts integrate karta hai:
        </p>
        <ul style={S.ul}>
          <li>Internet users Route 53 se domain resolve karte hain → CloudFront (CDN + WAF) → IGW → ALB (multi-AZ)</li>
          <li>ALB private subnets mein ASG-managed EC2 instances pe load balance karta hai</li>
          <li>Private instances outbound access ke liye NAT Gateway use karte hain (per-AZ)</li>
          <li>RDS Multi-AZ — synchronous standby AZ-b mein; ElastiCache Redis for session caching</li>
          <li>Security Groups per instance, NACLs per subnet, VPC Flow Logs enabled</li>
          <li>CloudWatch operational monitoring, CloudTrail API audit, GuardDuty threat detection</li>
          <li>IAM Roles EC2 pe — no embedded keys; Secrets Manager for DB credentials</li>
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
          <li><strong>Subnet:</strong> Exactly ek AZ; public = IGW route in RT; private = no IGW route but NAT outbound possible</li>
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
