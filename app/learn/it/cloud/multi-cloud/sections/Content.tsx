"use client";

import { Callout, ComparisonTable, Figure, S } from "../shared";
import TopicLink from "@/components/TopicLink";
import { multiCloudContent } from "@/content/multi-cloud";

import MultiCloudArchitectureDiagram from "../svg/MultiCloudArchitectureDiagram";
import CrossCloudNetworkingDiagram from "../svg/CrossCloudNetworkingDiagram";
import FederatedIdentityDiagram from "../svg/FederatedIdentityDiagram";
import GlobalTrafficFlowDiagram from "../svg/GlobalTrafficFlowDiagram";
import StorageReplicationDiagram from "../svg/StorageReplicationDiagram";
import SecurityArchitectureDiagram from "../svg/SecurityArchitectureDiagram";
import ObservabilityStackDiagram from "../svg/ObservabilityStackDiagram";
import DeploymentPipelineDiagram from "../svg/DeploymentPipelineDiagram";
import DecisionMatrixDiagram from "../svg/DecisionMatrixDiagram";

export default function Content() {
  return (
    <article>

      {/* ── QUICK SUMMARY ─────────────────────────────────────────────────── */}
      <section id="quick-summary">
        <h2 style={S.h2}>Quick Summary</h2>
        <p style={S.p}>
          Multi-Cloud ka matlab hai ek organization simultaneously multiple public cloud providers use karna — AWS, Azure, GCP mein se do ya teeno. On-premises infrastructure optional hai (yahi hybrid cloud se farak hai). Multi-cloud deliberately choose kiya jaata hai vendor lock-in se bachne ke liye, best-of-breed services use karne ke liye, ya geographic/regulatory requirements fulfill karne ke liye.
        </p>
        <p style={S.p}>
          Engineering complexity single cloud se significantly higher hoti hai — cross-cloud networking (providers directly connected nahi hain), federated identity (teen alag IAM systems), unified observability (teen alag monitoring planes), aur FinOps (teen billing systems). Multi-cloud tab adopt karo jab clear business justification ho — sirf "backup plan" ke liye nahi.
        </p>
        <Callout type="important" title="Multi-Cloud Adopt Karne Ka Real Trigger">
          90% enterprises multi-cloud mein accidentally pahunche hain — AWS pe workloads hain aur Azure pe M365/Active Directory. Yeh accidental multi-cloud hai. Intentional multi-cloud ek deliberate architecture decision hai clear business drivers ke saath. Dono ko differently engineer karo — accidental multi-cloud needs integration, intentional needs full governance framework.
        </Callout>
      </section>

      {/* ── WHAT IS MULTI-CLOUD ───────────────────────────────────────────── */}
      <section id="what-is-multi-cloud">
        <h2 style={S.h2}>What Is Multi-Cloud?</h2>
        <p style={S.p}>
          Multi-Cloud ek cloud strategy hai jisme organization ek se zyada public cloud providers ke services simultaneously use karta hai. AWS pe databases, Azure pe identity aur M365, GCP pe BigQuery analytics — yeh multi-cloud hai. Key characteristic: multiple public clouds, not just multiple accounts on one cloud.
        </p>
        <p style={S.p}>
          Multi-cloud ka definition simple hai, lekin engineering implication complex hain. Har provider ka alag networking model hai (AWS VPC vs Azure VNet vs GCP Global VPC), alag IAM system hai, alag billing hai, alag monitoring tools hain. Inhe ek coherent architecture mein integrate karna — yahi multi-cloud engineering ka challenge hai.
        </p>

        <section id="multi-cloud-vs-hybrid">
          <h3 style={S.h3}>Multi-Cloud vs Hybrid Cloud</h3>
          <ComparisonTable
            headers={["Dimension", "Multi-Cloud", "Hybrid Cloud"]}
            rows={[
              ["Definition", "Multiple public clouds (AWS + Azure, etc.)", "On-prem + at least one public cloud"],
              ["Defining characteristic", "Provider diversity (2+ public clouds)", "On-premises integration"],
              ["On-prem required?", "No — optional", "Yes — mandatory"],
              ["Primary driver", "Vendor lock-in, best-of-breed, geo coverage", "Legacy apps, data residency, investment protection"],
              ["Network challenge", "Cross-cloud VPC connectivity", "On-prem to cloud connectivity"],
              ["Identity challenge", "Three+ IAM systems → federation", "AD to cloud identity sync"],
              ["Can be both?", "Yes — on-prem + AWS + Azure = hybrid-multi-cloud", "Yes — same architecture"],
              ["Engineering complexity", "High — three consoles, three billing systems", "Medium-High — dual environment ops"],
            ]}
          />
          <Callout type="important" title="Most Enterprises Are Both">
            Reality mein line blur hai. Ek company on-prem data center + AWS (primary) + Azure (for M365) use kar rahi hai — yeh hybrid-multi-cloud hai. Architecture decisions mein dono challenges address karne padte hain simultaneously.
          </Callout>
        </section>

        <section id="why-multi-cloud">
          <h3 style={S.h3}>Why Enterprises Adopt Multi-Cloud</h3>
          <p style={S.p}>
            Multi-cloud accidental ya intentional — dono reasons se adopt hota hai. Accidental: team A chose AWS, team B chose Azure, nobody standardized. Intentional: deliberate architecture decision with clear engineering rationale.
          </p>
          <ul style={S.ul}>
            <li><strong>Intentional adoption patterns:</strong> Best-of-breed (AWS compute + Azure identity + GCP analytics), Geographic coverage (provider per region), Regulatory compliance (specific provider per jurisdiction), DR diversification (cloud A primary, cloud B DR)</li>
            <li><strong>Accidental adoption patterns:</strong> M365/Azure AD already in use, new project team chose AWS, acquisition brought a different cloud stack, SaaS vendors run on different clouds</li>
          </ul>
        </section>

        <section id="business-drivers">
          <h3 style={S.h3}>Business Drivers — Real Engineering Reasons</h3>
          <ComparisonTable
            headers={["Driver", "Engineering Reality", "Typical Org"]}
            rows={[
              ["Vendor lock-in avoidance", "Maintain negotiating leverage. Exit cost control. No single-vendor dependency.", "Large enterprises, government"],
              ["Best-of-breed services", "AWS mature DBs, Azure best identity, GCP best ML/analytics. Mix consciously.", "Tech companies, data-driven orgs"],
              ["Geographic coverage", "Specific provider has better latency/presence in a target market.", "Global SaaS, multinational"],
              ["Regulatory compliance", "RBI: India region. GDPR: EU region. Some regulators prefer/restrict providers.", "BFSI, healthcare, government"],
              ["M&A integration", "Acquired company on different cloud. Cannot consolidate immediately.", "Large enterprises post-acquisition"],
              ["Disaster recovery", "Cross-cloud DR eliminates cloud provider single point of failure.", "Mission-critical workloads"],
              ["Price optimization", "Spot/preemptible pricing varies by provider. Best price at any time.", "Cost-sensitive high-compute"],
            ]}
          />
        </section>

        <section id="vendor-lock-in">
          <h3 style={S.h3}>Vendor Lock-In Avoidance</h3>
          <p style={S.p}>
            Vendor lock-in ka fear often multi-cloud ka stated reason hota hai — lekin reality nuanced hai. Kuch lock-in unavoidable hai (cloud-native managed services use karne ka matlab hai provider-specific APIs). Multi-cloud lock-in risk reduce karta hai lekin eliminate nahi karta.
          </p>
          <ul style={S.ul}>
            <li><strong>Real lock-in risks:</strong> Proprietary managed services (DynamoDB, Cosmos DB, Spanner — no cross-cloud equivalent), Proprietary ML pipelines (SageMaker, Azure ML, Vertex AI), Storage format dependencies, Networking constructs (VPC peering models differ)</li>
            <li><strong>Portability strategies:</strong> Kubernetes (run anywhere), PostgreSQL-compatible databases (RDS, Aurora, AlloyDB, Cloud SQL — schema portable), Object storage (S3-compatible APIs — most providers support), Terraform (same IaC tool across clouds)</li>
            <li><strong>Lock-in acceptance:</strong> Sometimes lock-in is intentional — GCP Spanner ka no equivalent elsewhere. Accept lock-in for services that provide genuine competitive advantage. Avoid lock-in for commodity services.</li>
          </ul>
        </section>

        <section id="best-of-breed">
          <h3 style={S.h3}>Best-of-Breed Strategy</h3>
          <ComparisonTable
            headers={["Service Category", "AWS Strength", "Azure Strength", "GCP Strength"]}
            rows={[
              ["Compute / EC2", "Widest instance variety, Graviton ARM, Spot market maturity", "Strong Windows VM support, HBv3 for HPC", "Custom Tau VMs, C3 high-performance"],
              ["Managed Kubernetes", "EKS — broadest enterprise adoption", "AKS — simplest managed experience", "GKE — most mature (K8s originated here)"],
              ["Relational Database", "Aurora (MySQL/PG compatible), RDS broad support", "Azure SQL (SQL Server native), Hyperscale", "Cloud Spanner (global consistency), AlloyDB"],
              ["Object Storage", "S3 — de facto standard, richest features", "Blob Storage — M365/Azure integration", "GCS — strong analytics integration"],
              ["Identity", "IAM mature, Identity Center for SSO", "Entra ID — enterprise AD gold standard", "Cloud IAM — clean RBAC, service accounts"],
              ["ML / AI", "SageMaker — broadest MLOps", "Azure OpenAI — GPT-4 access, Cognitive Services", "Vertex AI + TPUs — custom ML hardware"],
              ["Analytics", "Redshift — data warehouse maturity", "Synapse Analytics — Power BI integration", "BigQuery — serverless, fastest analytics"],
              ["Network", "Global backbone, CloudFront CDN maturity", "Global WAN, Express Route breadth", "Global VPC (unique — spans regions natively)"],
            ]}
          />
        </section>

        <section id="cloud-sovereignty">
          <h3 style={S.h3}>Cloud Sovereignty and Regulatory Requirements</h3>
          <p style={S.p}>
            Cloud sovereignty ka matlab hai ki data aur processing specific geographic boundary ke andar rahein, aur foreign government orders data access nahi kar sakein. Yeh increasingly important ho raha hai — EU GDPR, India DPDPA, China MLPS, Russia FSTEC.
          </p>
          <ul style={S.ul}>
            <li><strong>India DPDPA + RBI:</strong> Financial data India mein store karna mandatory. AWS Mumbai (ap-south-1), Azure India Central, GCP Mumbai (asia-south1) — teeno options hain. RBI master direction: critical data on-prem ya regulated cloud.</li>
            <li><strong>EU GDPR:</strong> EU personal data EU mein process honi chahiye. AWS eu-west-1/eu-central-1, Azure West Europe, GCP europe-west3 — choose per workload. Data transfer outside EU: Standard Contractual Clauses (SCCs) mandatory.</li>
            <li><strong>Multi-cloud sovereignty pattern:</strong> EU users → Azure West Europe (GDPR). India users → AWS Mumbai (RBI). US users → GCP us-central1 (no residency constraint). Global traffic manager routes based on user geography.</li>
          </ul>
        </section>
      </section>

      {/* ── ARCHITECTURE ──────────────────────────────────────────────────── */}
      <section id="architecture">
        <h2 style={S.h2}>Multi-Cloud Architecture Patterns</h2>
        <p style={S.p}>
          Multi-cloud architecture ka pattern workload requirements pe depend karta hai. Active-active, active-passive, ya geo-distributed — har pattern different complexity aur cost ke saath aata hai.
        </p>

        <Figure caption="Multi-Cloud Reference Architecture: AWS + Azure + GCP unified under common control plane">
          <MultiCloudArchitectureDiagram />
        </Figure>

        <section id="active-active">
          <h3 style={S.h3}>Active-Active Multi-Cloud</h3>
          <p style={S.p}>
            Dono (ya teeno) clouds simultaneously live traffic serve karte hain. Global Load Balancer traffic distribute karta hai. Ek cloud fail hone pe doosra remaining traffic handle karta hai.
          </p>
          <ul style={S.ul}>
            <li><strong>Requirements:</strong> Application stateless ya shared state (globally distributed DB). Cross-cloud replication near-real-time. DNS TTL low (60 seconds). Health checks every 30 seconds.</li>
            <li><strong>Database challenge:</strong> Single database cloud provider pe aur doosre cloud se access karo (cross-cloud latency add hoti hai) — ya globally distributed DB (CockroachDB, Google Spanner, Cassandra). Multi-master write conflict resolution complex.</li>
            <li><strong>Best for:</strong> Stateless web tiers, API layers, CDN-served content. Avoid for transactional databases without careful design.</li>
          </ul>
        </section>

        <section id="active-passive">
          <h3 style={S.h3}>Active-Passive and Pilot Light</h3>
          <p style={S.p}>
            Primary cloud normal operations handle karta hai. Secondary cloud standby mein hai — ya minimal resources running (pilot light) ya scaled-down replica (warm standby).
          </p>
          <ul style={S.ul}>
            <li><strong>Pilot Light (cross-cloud):</strong> Secondary cloud pe database read replica continuously running. Application servers ke AMIs/images ready lekin not running. Primary fail → DB promote + compute launch + DNS failover. RTO: 30-60 min.</li>
            <li><strong>Warm Standby:</strong> Secondary cloud pe scaled-down version running. Primary fail → scale up + promote DB + DNS. RTO: minutes.</li>
            <li><strong>DNS failover critical detail:</strong> TTL production DNS pe 60 seconds pre-set karo (weeks before DR event). High TTL = slow failover even with perfect automation. DNS propagation = real failover clock.</li>
          </ul>
        </section>

        <section id="geo-distributed">
          <h3 style={S.h3}>Geo-Distributed Global Architecture</h3>
          <p style={S.p}>
            Different cloud providers different geographic regions serve karte hain — not for DR, but for latency optimization aur regulatory compliance simultaneously.
          </p>
          <ul style={S.ul}>
            <li>India users → AWS ap-south-1 (Mumbai) — lowest latency from India, RBI compliant</li>
            <li>EU users → Azure West Europe (Amsterdam) — GDPR data residency, M365 integration</li>
            <li>US users → GCP us-central1 — BigQuery analytics co-location, ML workloads</li>
            <li>Global LB: Route 53 latency-based routing + Azure Traffic Manager + Cloudflare as overlay</li>
          </ul>

          <Figure caption="Global Traffic Flow: geo-distributed multi-cloud routing with health-based failover">
            <GlobalTrafficFlowDiagram />
          </Figure>
        </section>

        <section id="workload-placement">
          <h3 style={S.h3}>Workload Placement Strategy</h3>
          <p style={S.p}>
            Workload placement ek structured decision hai — gut feel se nahi. Pehle placement criteria evaluate karo, phir cloud choose karo. Six key criteria hain jo placement drive karte hain:
          </p>
          <ul style={S.ul}>
            <li><strong>Latency-based placement:</strong> User population ka geographic center identify karo. Target latency per application tier define karo (API: under 200ms, database: under 5ms within AZ). Provider ka region map us population ke sabse close ho — AWS ap-south-1 India users ke liye, Azure West Europe EU ke liye. Cross-cloud latency typically 50-150ms (inter-region, inter-provider) — stateful applications jo DB same cloud pe chahiye unhe same cloud pe rakhna mandatory hai.</li>
            <li><strong>Data locality placement:</strong> Primary database kahan hai wahi primary workload cloud hai — data gravity principle. 50TB+ dataset cloud A pe hai toh application bhi cloud A pe raho. Data transfer cross-cloud se avoid karo — $0.08/GB egress add ho jaata hai. Analytics workload GCP BigQuery pe hai toh data pipelines bhi GCP pe better hain.</li>
            <li><strong>Compliance placement:</strong> RBI mandate: India region mandatory for BFSI critical data (AWS Mumbai, Azure India Central). GDPR: EU region mandatory (Azure West Europe, AWS eu-central-1). HIPAA: AWS/Azure both HIPAA-eligible services (BAA sign karo). PCI-DSS: cardholder data environment isolated subnet mein, provider PCI-compliant certification verify karo. Government workloads: AWS GovCloud / Azure Government regions agar US-specific compliance.</li>
            <li><strong>Cost-based placement:</strong> Windows VMs → Azure (AHUB savings 40-85%). Spot/preemptible batch → whichever provider has lowest spot price at scheduling time (Spot.io arbitrage karta hai). Reserved capacity — calculate 3-year TCO per cloud for baseline workloads. Egress: avoid placing analytics workloads on cloud B agar source data is on cloud A.</li>
            <li><strong>GPU / AI workload placement:</strong> Training (large batch): AWS P4d/P5 (A100/H100), GCP A3 (H100), Azure NDv5 (H100) — spot pricing saves 70%. Inference (low latency): AWS Inferentia/Neuron (cheapest), GCP TPU v4 (TensorFlow-native), Azure NC series. Fine-tuning: Azure OpenAI (GPT model access), AWS Bedrock (foundation models), GCP Vertex AI (Gemini, PaLM). Edge AI: AWS Outposts/Graviton, GCP Distributed Cloud. Select by: model size + framework compatibility + latency SLA + cost per inference.</li>
            <li><strong>SaaS dependency placement:</strong> Salesforce data integration → AWS (Salesforce primary runs on AWS). GitHub Actions CI/CD → all clouds equal. Microsoft 365 data → Azure native (Graph API, SharePoint). Snowflake → multi-cloud (AWS, Azure, GCP all supported). SAP S/4HANA → all clouds certified, but SAP HANA Large Instances on Azure preferred. Workday → cloud-agnostic SaaS. ServiceNow → cloud-agnostic. Rule: co-locate application with the SaaS integration target to minimize egress aur latency.</li>
          </ul>
          <ComparisonTable
            headers={["Workload Type", "Recommended Cloud", "Primary Reason", "Secondary Consideration"]}
            rows={[
              ["Windows VMs / SQL Server", "Azure", "AHUB license savings 40-85%", "Native AD/Entra ID integration"],
              ["Linux compute / containers", "AWS (EKS) or GCP (GKE)", "Widest instance variety, mature K8s", "Spot market depth"],
              ["ML training (GPU/H100)", "AWS P5 or GCP A3 (H100)", "Best GPU availability, spot pricing", "Framework: TF→GCP, PyTorch→AWS"],
              ["AI inference (low latency)", "AWS Inferentia or GCP TPU", "Cheapest per-inference cost", "Model size determines choice"],
              ["GenAI / LLM access", "Azure OpenAI Service", "GPT-4 direct API access", "Azure Cognitive Services ecosystem"],
              ["Serverless analytics", "GCP BigQuery", "Serverless, fastest, per-query billing", "Native ML integration"],
              ["Enterprise data warehouse", "AWS Redshift or Azure Synapse", "Mature DW, Power BI integration", "Existing team skills"],
              ["Identity / M365 integration", "Azure", "Entra ID native, zero federation gap", "AHUB for Windows"],
              ["High-throughput object storage", "AWS S3", "Richest API, Transfer Acceleration", "S3 is de facto standard"],
              ["Compliance: India BFSI", "AWS Mumbai or Azure India", "RBI-compliant regions", "On-prem for core banking"],
              ["Compliance: EU GDPR", "Azure West Europe or AWS eu-central-1", "Data residency enforced", "SCCs for data transfers"],
              ["Dev/test ephemeral", "Lowest spot price (all clouds)", "Cost — no production SLA", "Spot.io for arbitrage"],
              ["Global front-end / CDN", "Cloudflare (provider-agnostic)", "No cloud lock-in, best edge network", "Avoid single-cloud CDN lock-in"],
              ["Batch processing (stateless)", "Cloud bursting — cheapest at time", "Spot/preemptible, auto-terminate", "GCP preemptible cheapest"],
            ]}
          />
          <Callout type="important" title="Workload Placement Decision Order">
            Compliance constraint pehle — agar data India mein rehna mandatory hai, cloud choice limited hai. Phir latency — user population se closest provider. Phir data gravity — primary DB kahan hai. Phir cost — given the above constraints, cheapest option. SaaS dependency last — optimize karo jo constraints ke baad bache. Is order se chalo, reverse nahi.
          </Callout>
        </section>
      </section>

      {/* ── NETWORKING ────────────────────────────────────────────────────── */}
      <section id="networking">
        <h2 style={S.h2}>Cross-Cloud Networking</h2>
        <p style={S.p}>
          Multi-cloud networking ka sabse important fact: AWS, Azure, aur GCP directly connected nahi hain. Traffic public Internet se jaata hai unless explicitly connected karo. Production cross-cloud traffic ke liye private connectivity mandatory hai.
        </p>

        <section id="connectivity-options">
          <h3 style={S.h3}>Connectivity Options — VPN vs Private Fabric</h3>
          <ComparisonTable
            headers={["Option", "Mechanism", "Bandwidth", "Latency", "Cost", "Use Case"]}
            rows={[
              ["Site-to-Site VPN", "IPsec over Internet (AWS VGW ↔ Azure VPN GW)", "1-10Gbps", "Variable (Internet)", "Low", "Dev/test, backup path, low bandwidth"],
              ["SD-WAN overlay", "Megaport / Equinix Fabric software-defined fabric", "1-100Gbps", "Low, consistent", "Medium", "Production cross-cloud traffic"],
              ["Colo cross-connect", "Physical cable AWS DX + Azure ER in same colo", "10-100Gbps", "Sub-ms", "High", "High-bandwidth, mission-critical"],
              ["Cloud backbone (AWS TGW + Azure vWAN)", "Provider-internal + cross-cloud VPN between them", "Variable", "Medium", "Medium", "Simple multi-account, lower bandwidth"],
            ]}
          />
          <Callout type="warning" title="VPN for Production Cross-Cloud — Acceptable Only With Caveats">
            Cross-cloud Site-to-Site VPN Internet pe run karta hai — latency variable rehti hai, bandwidth ceiling hai. Low-bandwidth, latency-tolerant workloads (async replication, batch, management traffic) ke liye acceptable. Real-time database access ya synchronous replication cross-cloud over VPN — avoid karo. Private fabric use karo.
          </Callout>
        </section>

        <section id="sd-wan-multicloud">
          <h3 style={S.h3}>SD-WAN and Exchange Fabrics</h3>
          <p style={S.p}>
            Exchange fabrics — Equinix Fabric, Megaport, PacketFabric — neutral third-party networks hain jo multiple cloud providers simultaneously connect karte hain. Cross-cloud bandwidth on-demand provision hoti hai.
          </p>
          <ul style={S.ul}>
            <li><strong>Megaport:</strong> Software-defined cross-cloud connections. AWS + Azure + GCP all available. Virtual Cross Connect (VXC) — minutes mein provision. Pricing per Mbps/month.</li>
            <li><strong>Equinix Fabric:</strong> Equinix data centers pe cloud providers ko connect karo. Equinix Metal (bare metal) bhi available — cloud-adjacent compute.</li>
            <li><strong><TopicLink slug="sd-wan" variant="inline" /> overlay:</strong> On-prem SD-WAN appliances cloud pe virtual form extend karo — Cisco vEdge, VMware SASE, Palo Alto Prisma. Intelligent path selection: cross-cloud via best available path.</li>
          </ul>

          <Figure caption="Cross-Cloud Networking: VPN, SD-WAN and exchange fabric options with CIDR planning">
            <CrossCloudNetworkingDiagram />
          </Figure>
        </section>

        <section id="cidr-dns">
          <h3 style={S.h3}>CIDR Planning and DNS Strategy</h3>
          <p style={S.p}>
            Multi-cloud CIDR planning single cloud se zyada critical hai — teen VPC/VNet stacks non-overlapping hone chahiye, current aur future expansion ke liye.
          </p>
          <ul style={S.ul}>
            <li><strong>Recommended allocation:</strong> AWS VPCs: 10.1.0.0/16 range. Azure VNets: 10.2.0.0/16 range. GCP VPCs: 10.3.0.0/16 range. On-prem: 10.0.0.0/16. Management: 10.100.0.0/16.</li>
            <li><strong>DNS cross-cloud:</strong> Conditional forwarding per domain. AWS Route 53 Resolver inbound endpoint → on-prem aur Azure DNS. Azure DNS Private Resolver → AWS. Custom DNS servers in each VPC forward to each other via VPN/fabric.</li>
            <li><strong>Global DNS:</strong> Cloudflare ya AWS Route 53 as authoritative DNS. Latency-based routing records → different cloud endpoints per user geography. Health check-based failover. TTL 60 seconds for production records.</li>
            <li><strong>IPAM tool mandatory:</strong> Netbox, InfoBlox, ya Azure IPAM — single source of truth for all IP allocations across clouds. Without IPAM, overlap errors are inevitable at scale.</li>
          </ul>
        </section>

        <section id="bgp-routing">
          <h3 style={S.h3}>BGP Route Advertisement and Advanced Networking</h3>
          <p style={S.p}>
            Multi-cloud BGP routing mein precise route advertisements critical hain — wrong advertisement se traffic black-hole ya routing loop ho sakta hai.
          </p>
          <ul style={S.ul}>
            <li><strong>BGP route advertisement strategy:</strong> Each cloud advertise kare sirf apni summary prefix — AWS advertise 10.1.0.0/16, Azure 10.2.0.0/16, GCP 10.3.0.0/16. Specific subnets advertise karna avoid karo (routing table bloat). Route summarization reduces BGP table size aur convergence time. AWS TGW + Azure VNG + GCP Cloud Router teeno BGP pe operate karte hain.</li>
            <li><strong>Overlapping CIDR remediation:</strong> CIDR overlap discover hone ke baad options: (1) NAT Gateway at boundary — translate overlapping ranges (complex, operational burden). (2) Cloud Migration: one VPC reIP karo (weeks of work, VM downtime). (3) AWS TGW overlapping attachment (limited support). Prevention always better — IPAM tool upfront mandatory. Discovery tool: AWS VPC IP Address Manager, Azure Virtual Network Manager, GCP Network Intelligence Center.</li>
            <li><strong>Route summarization:</strong> AWS TGW pe static routes summarize karo — 10.1.1.0/24 + 10.1.2.0/24 → advertise 10.1.0.0/16 to Azure. Reduces BGP updates. BGP prefix limit: most cloud BGP sessions have limits (AWS DX: 100 prefixes default per VIF — monitor usage).</li>
            <li><strong>Asymmetric routing problems:</strong> Traffic A→B AWS VPN se jaaye, B→A return path Azure ExpressRoute se — different paths. Firewall stateful inspection fails (return traffic doesn't match original session). Solution: symmetric routing enforce karo — same BGP local-preference on both ends. Troubleshoot: <code>traceroute</code> aur <code>mtr</code> from both sides — paths should mirror each other.</li>
            <li><strong>MTU and MSS clamping:</strong> VPN tunnels add overhead — IPsec reduces effective MTU. AWS Site-to-Site VPN: 1500 byte outer, effective inner MTU ~1399 bytes. Azure VPN: 1350 effective. GCP HA VPN: 1460 recommended. MSS clamping: configure on VPN/SD-WAN appliance — <code>ip tcp adjust-mss 1350</code> (Cisco). Without clamping: large packets fragmented or dropped → TCP slow, application hangs on large transfers.</li>
            <li><strong>Jumbo frames:</strong> AWS within same region/AZ: 9001 MTU supported (jumbo frames). Cross-cloud over VPN/Interconnect: jumbo frames NOT supported — standard 1500 MTU. HPC workloads requiring jumbo frames cannot efficiently run cross-cloud. Design: jumbo frame workloads single cloud mein raho.</li>
            <li><strong>NAT design:</strong> Cross-cloud NAT agar private CIDR overlap hai (legacy): NAT Gateway source translation at cloud boundary. AWS NAT GW for Internet, but cross-cloud NAT different — custom EC2-based NAT instance ya SD-WAN NAT. Azure NAT Gateway: outbound only, 64K SNAT ports per IP. Track NAT port exhaustion — high connection rate workloads.</li>
          </ul>
          <p style={S.p}><strong>Networking Troubleshooting Guide:</strong></p>
          <ul style={S.ul}>
            <li><strong>Step 1 — Layer 3 connectivity:</strong> Ping private IP from cloud A to cloud B. Fails → routing issue. Pass → proceed to Layer 4.</li>
            <li><strong>Step 2 — Routing table check:</strong> AWS: <code>aws ec2 describe-route-tables</code>. Azure: Effective routes. GCP: VPC routes. Is route to remote CIDR present? Correct next-hop?</li>
            <li><strong>Step 3 — VPN/BGP status:</strong> AWS: Site-to-Site VPN tunnel status. BGP neighbors: <code>show bgp neighbor</code> on SD-WAN. Azure: Virtual Network Gateway BGP peers. GCP: Cloud Router BGP session status.</li>
            <li><strong>Step 4 — Firewall/SG rules:</strong> AWS Security Group: inbound rule allows source CIDR + port? Azure NSG: effective rules on NIC. GCP: Firewall rule allows source range?</li>
            <li><strong>Step 5 — MTU/MSS:</strong> TCP connection establishes but large transfers fail/hang → MTU issue. Test: <code>ping -M do -s 1400 {"{target_ip}"}</code>. Reduce until ping succeeds — that's your effective MTU. Set MSS accordingly.</li>
            <li><strong>Step 6 — Asymmetric routing:</strong> Traceroute from both sides — paths symmetric? Firewall session table check: existing sessions? Stateful inspection dropping return packets?</li>
          </ul>
        </section>
      </section>

      {/* ── IDENTITY ──────────────────────────────────────────────────────── */}
      <section id="identity">
        <h2 style={S.h2}>Federated Identity and IAM</h2>
        <p style={S.p}>
          Multi-cloud identity ka core challenge: teen completely different IAM systems. AWS IAM (policy-based, JSON), Azure RBAC (role assignments at scope), GCP Cloud IAM (member-role-resource model). Inhe unify karna — aur single login se sab access — yahi federated identity ka goal hai.
        </p>

        <section id="central-idp">
          <h3 style={S.h3}>Central Identity Provider</h3>
          <p style={S.p}>
            Central IdP establish karo — sab cloud providers SAML/OIDC federation se us IdP pe trust karte hain. Two primary options:
          </p>
          <ul style={S.ul}>
            <li><strong>Microsoft Entra ID (Azure AD) as central IdP:</strong> AWS IAM Identity Center SAML federation se Entra ID se connect hota hai. GCP Cloud Identity SAML ya GCDS sync se Entra ID se. Best for: Microsoft-heavy orgs (M365, Windows, on-prem AD). Advantage: single plane for hybrid + multi-cloud identity.</li>
            <li><strong>Okta / Ping Identity (vendor-neutral):</strong> Cloud-agnostic IdP. AWS, Azure, GCP teeno SAML/OIDC se Okta se connect hote hain. Best for: orgs deliberately avoiding Microsoft lock-in, or complex multi-tenant requirements. Okta has pre-built connectors for all three major clouds.</li>
            <li><strong>SCIM provisioning:</strong> Automatic user lifecycle management. User create/deactivate central IdP pe → SCIM protocol → AWS Identity Center, GCP Cloud Identity automatically sync karte hain. Typical propagation: 30-40 minutes.</li>
          </ul>

          <Figure caption="Federated Identity: central IdP federating to AWS, Azure and GCP with group-to-role mapping">
            <FederatedIdentityDiagram />
          </Figure>
        </section>

        <section id="iam-mapping">
          <h3 style={S.h3}>IAM Mapping Across Providers</h3>
          <ComparisonTable
            headers={["Role Level", "AWS (IAM Identity Center)", "Azure (RBAC)", "GCP (Cloud IAM)"]}
            rows={[
              ["Full Admin", "AdministratorAccess (break-glass only)", "Owner (subscription)", "roles/owner (project)"],
              ["Power User / Dev", "PowerUserAccess", "Contributor", "roles/editor"],
              ["Read Only", "ReadOnlyAccess", "Reader", "roles/viewer"],
              ["Network Admin", "Custom network policy", "Network Contributor", "roles/compute.networkAdmin"],
              ["DB Admin", "DatabaseAdministrator", "SQL DB Contributor", "roles/cloudsql.admin"],
              ["Security Audit", "SecurityAudit", "Security Reader", "roles/iam.securityReviewer"],
              ["K8s Admin", "Custom EKS policy", "Azure Kubernetes Service Cluster Admin", "roles/container.admin"],
            ]}
          />
          <p style={S.p}>
            Consistent naming convention mandatory hai — agar group name "DevOps-Team" AWS pe PowerUserAccess milta hai, Azure pe Contributor milna chahiye, GCP pe roles/editor. Mapping document maintain karo aur IaC mein encode karo (Terraform aws_ssoadmin_permission_set + azurerm_role_assignment + google_project_iam_binding).
          </p>
        </section>

        <section id="workload-identity">
          <h3 style={S.h3}>Workload Identity and Secrets Management</h3>
          <p style={S.p}>
            Applications ke liye human credentials mat use karo. Workload identity — machine identity from cloud provider — prefer karo. Zero hardcoded credentials rule absolute hai.
          </p>
          <ul style={S.ul}>
            <li><strong>AWS:</strong> EC2 Instance Profile, ECS Task Role, EKS IRSA (IAM Roles for Service Accounts) — app ko credentials nahi chahiye, metadata service se token milta hai.</li>
            <li><strong>Azure:</strong> Managed Identity (System/User assigned) — VM ya Function ko Entra ID identity automatically. Key Vault access bina secrets ke.</li>
            <li><strong>GCP:</strong> Compute Engine Service Account, GKE Workload Identity — pod ko GCP SA token automatically. Workload Identity Federation: external OIDC tokens (GitHub Actions, AWS) ko GCP identity se exchange karo.</li>
            <li><strong>Cross-cloud secret management:</strong> HashiCorp Vault — cloud-agnostic, dynamic secrets (AWS credentials on-demand with auto-expiry), PKI, database credentials. External Secrets Operator (Kubernetes): ESO → Vault/AWS SM/Azure KV → K8s Secret object automatically sync.</li>
          </ul>
          <Callout type="best-practice" title="Cross-Cloud Secrets — HashiCorp Vault as Single Plane">
            Multi-cloud mein teen alag secret stores (AWS SM, Azure KV, GCP SM) manage karna operational burden hai. HashiCorp Vault ek consistent API provide karta hai — application ek Vault endpoint se secrets fetch kare regardless of cloud. Dynamic secrets: AWS temporary IAM credentials on-demand, auto-expire. Vault pe investment justified hai agar 2+ clouds use ho rahi hain.
          </Callout>
        </section>

        <section id="identity-lifecycle">
          <h3 style={S.h3}>SCIM Provisioning, Lifecycle Automation and JIT Access</h3>
          <p style={S.p}>
            Identity lifecycle — user onboard hona, role change hona, offboard hona — multi-cloud mein manually manage karna risky hai. Automation mandatory hai.
          </p>
          <ul style={S.ul}>
            <li><strong>SCIM provisioning deep-dive:</strong> System for Cross-domain Identity Management (SCIM 2.0) — standard protocol. Central IdP (Okta/Entra ID) SCIM push karta hai to: AWS IAM Identity Center (SCIM endpoint), GCP Cloud Identity (GCDS ya SCIM), Azure (native — Entra IS IdP). Attributes synchronized: displayName, email, groups, department, title. Group membership changes: IdP mein group change → SCIM push → all clouds updated. Typical latency: 5-40 minutes (configurable sync interval).</li>
            <li><strong>Lifecycle automation:</strong> Joiner: HR system creates employee → IdP user created automatically → SCIM push → all cloud accounts provisioned. Mover: employee changes department → group membership updated → permissions automatically adjust across all clouds. Leaver: HR marks terminated → IdP user disabled → SCIM push → all cloud access revoked within hours. Manual offboarding = security risk — automated via ITSM + IdP integration.</li>
            <li><strong>JIT (Just-in-Time) Access:</strong> Normal state: no admin access. Elevated access: request → approval → time-limited grant → auto-revoke. AWS: IAM Identity Center temporary elevated permissions. Azure: Privileged Identity Management (PIM) eligible role → activate → 1-8 hour window → MFA required → justification logged. GCP: no native PIM, use PAM tools (CyberArk, BeyondTrust) or custom workflow via Cloud IAM conditions. JIT reduces standing privilege exposure — compromised account = limited blast radius.</li>
            <li><strong>Azure PIM multi-cloud extension:</strong> Azure PIM manages Azure RBAC natively. For AWS: Entra ID SAML federation mein group membership time-limited PIM-managed → AWS Permission Sets via SCIM group. Ek PIM request → temporary Azure + AWS elevated access simultaneously.</li>
            <li><strong>Break-glass accounts:</strong> Emergency accounts independent of central IdP. One per cloud minimum (preferably two per cloud). AWS: local IAM user with AdministratorAccess. Azure: local Directory admin (not federated). GCP: emergency Service Account with Owner. Break-glass criteria: stored in PAM vault (CyberArk), dual-person integrity (two people needed to retrieve), usage triggers immediate alert, session recorded. Test quarterly — most critical accounts that should never need to be used.</li>
            <li><strong>Service Account governance:</strong> Inventory all service accounts per cloud. Per-SA purpose documentation. Least privilege: SA only needs permissions for its specific function. Unused SA detection: AWS IAM Access Analyzer, Azure Entra ID last sign-in, GCP Policy Analyzer. Key rotation: SA keys (where workload identity not possible) rotate every 90 days. Disable unused SAs — don't delete immediately (forensics). Alert: new SA creation outside IaC = potential unauthorized access.</li>
          </ul>
        </section>
      </section>

      {/* ── COMPUTE ───────────────────────────────────────────────────────── */}
      <section id="compute">
        <h2 style={S.h2}>Multi-Cloud Compute and Kubernetes</h2>

        <section id="kubernetes-multicloud">
          <h3 style={S.h3}>Kubernetes Multi-Cluster Management</h3>
          <p style={S.p}>
            Kubernetes multi-cloud ka natural execution platform hai — same manifests multiple clouds pe run ho sakte hain. Challenge: multi-cluster management, cross-cluster service discovery, consistent policies.
          </p>
          <ul style={S.ul}>
            <li><strong>EKS (AWS):</strong> Managed Kubernetes. EKS Anywhere: AWS-style K8s on-prem ya other clouds pe (VMware, bare metal). IRSA for pod-level AWS permissions.</li>
            <li><strong>AKS (Azure):</strong> Simplest managed K8s experience. Azure CNI, Entra ID RBAC integration, Azure Monitor for containers. AKS Hybrid: Azure Stack HCI pe.</li>
            <li><strong>GKE (GCP):</strong> Most mature managed K8s (K8s originated at Google). Autopilot mode: fully managed node provisioning. Workload Identity built-in.</li>
            <li><strong>Multi-cluster networking:</strong> Submariner: cross-cluster pod-to-pod connectivity. Cilium Cluster Mesh: multi-cluster service mesh. Istio multi-primary: mTLS across clusters, global service registry.</li>
            <li><strong>Cross-cluster DNS:</strong> CoreDNS federation ya Istio ServiceEntry — services in one cluster resolvable from another cluster by name.</li>
          </ul>
        </section>

        <section id="anthos-openshift">
          <h3 style={S.h3}>Anthos, OpenShift, Rancher, Crossplane and Karmada</h3>
          <ComparisonTable
            headers={["Platform", "Vendor", "Multi-Cloud Support", "Key Strength", "Best For"]}
            rows={[
              ["Google Anthos / GKE Enterprise", "Google", "AWS, Azure, GCP, on-prem", "Policy, service mesh (Istio), config sync", "GCP-primary orgs, consistent policy enforcement"],
              ["Red Hat OpenShift + RHACM", "Red Hat / IBM", "AWS (ROSA), Azure (ARO), GCP, on-prem", "Enterprise support, developer experience, GitOps", "Enterprise, regulated, existing OpenShift estate"],
              ["Rancher / SUSE", "SUSE", "EKS, AKS, GKE, on-prem, edge", "Vendor-neutral, multi-cloud fleet mgmt", "Neutral choice, cost-sensitive, edge deployments"],
              ["Cluster API (CAPI)", "CNCF", "All major providers", "K8s-native cluster lifecycle management", "Platform engineering, infrastructure-as-code K8s"],
              ["Karmada", "CNCF Sandbox", "Any K8s cluster", "Multi-cluster workload scheduling + propagation", "Cross-cluster workload distribution, failover"],
              ["Crossplane", "CNCF", "AWS, Azure, GCP, any provider", "Kubernetes-native infrastructure provisioning", "K8s-first IaC, cloud resource management via CRDs"],
              ["ArgoCD + ApplicationSets", "CNCF / Intuit", "Any K8s cluster", "GitOps, drift detection, multi-cluster deploy", "GitOps layer for any of above"],
            ]}
          />
          <p style={S.p}>
            Selection criteria: existing vendor relationships aur contracts, team familiarity, primary cloud preference. Anthos agar GCP already primary hai. RHACM agar OpenShift on-prem already deployed hai. Rancher agar vendor-neutral aur cost-sensitive hai.
          </p>
          <ul style={S.ul}>
            <li><strong>Cluster API (CAPI):</strong> K8s-native cluster lifecycle. CRDs define cluster desired state. Providers: AWS CAPA, Azure CAPZ, GCP CAPG. Cluster create/upgrade/delete through K8s objects — same GitOps workflow as application deployment. Platform teams Cluster API se cluster fleet manage karte hain — developers sirf cluster request karte hain.</li>
            <li><strong>Karmada:</strong> Multi-cluster workload distribution engine. "Propagation Policy" define karo — workload distribute karo across clusters by weight, affinity ya failover rules. Overrides: different replica count per cluster. Failover: primary cluster down → Karmada automatically reschedules to secondary cluster. Cross-cloud workload placement decisions automated karta hai.</li>
            <li><strong>Crossplane:</strong> K8s mein cloud resources manage karo (AWS RDS, Azure SQL, GCP Spanner) using Custom Resource Definitions (CRDs). <code>kubectl apply -f postgres.yaml</code> → Crossplane → AWS RDS instance create. Terraform alternative for K8s-native teams. Compositions: reusable multi-cloud "platform APIs" — developer requests "database" without specifying cloud provider details.</li>
            <li><strong>Istio multi-cluster federation:</strong> Multi-primary mode: each cluster has its own Istiod control plane. Service discovery shared: services from cluster A visible in cluster B. mTLS automatic between clusters. Traffic management: VirtualService/DestinationRule span clusters. Split traffic: 70% cluster A (AWS), 30% cluster B (GCP) — weighted routing cross-cloud.</li>
            <li><strong>SPIFFE/SPIRE for workload identity:</strong> SPIFFE (Secure Production Identity Framework for Everyone) — universal workload identity standard. SPIRE (SPIFFE Runtime Environment) — implementation. Each workload gets a cryptographic SVID (SPIFFE Verifiable Identity Document). Cross-cloud service-to-service: mTLS with SPIFFE SVIDs — no hardcoded secrets. SPIRE federated across AWS, Azure, GCP clusters — services verify each other's identity without cloud-specific credentials.</li>
            <li><strong>Container image replication strategy:</strong> Single authoritative registry → replicated to each cloud's native registry. Source: Harbor (on-prem) ya GitHub Container Registry. Replication: to ECR (AWS), ACR (Azure), GAR/GCR (GCP). Tools: Skopeo (copy images between registries), Crane, Harbor replication rules. Rationale: pull from local registry (same cloud) = faster pull + no egress cost. Cross-cloud image pull = egress fees + higher latency. Automation: CI/CD pushes to source → replication rules push to all cloud registries automatically.</li>
          </ul>
        </section>
      </section>

      {/* ── STORAGE ───────────────────────────────────────────────────────── */}
      <section id="storage">
        <h2 style={S.h2}>Storage and Data Replication</h2>

        <section id="object-replication">
          <h3 style={S.h3}>Object Storage Cross-Cloud Replication</h3>
          <p style={S.p}>
            Object storage cross-cloud replication native cloud tools se nahi hoti — third-party tools ya custom pipelines chahiye. Har provider ka apna object storage hai (S3, Blob, GCS) aur yeh natively interoperate nahi karte.
          </p>
          <ul style={S.ul}>
            <li><strong>rclone:</strong> Open-source, 70+ backends. <code>rclone sync s3:bucket gs:bucket</code> — simple aur effective for moderate volumes. Checksum verify karta hai.</li>
            <li><strong>AWS DataSync:</strong> Managed data transfer. On-prem ya S3 → Azure Blob/GCS possible (DataSync agents). Up to 10Gbps per task. Checksum, retry, scheduling included.</li>
            <li><strong>GCP Storage Transfer Service:</strong> Managed transfers from AWS S3, Azure Blob, HTTP sources. Scheduled batches ya continuous.</li>
            <li><strong>AzCopy:</strong> Microsoft CLI tool. S3 → Azure Blob direct transfer. Fast, parallel, resumable.</li>
            <li><strong>Immutability:</strong> Cross-cloud backup pe Object Lock / WORM enable karo. Ransomware protection — even if primary cloud compromised, secondary cloud backup untouched.</li>
          </ul>
        </section>

        <section id="database-replication">
          <h3 style={S.h3}>Database Replication — No Native Tool</h3>
          <p style={S.p}>
            Cross-cloud database replication native tool se nahi hoti — yeh multi-cloud ka most complex storage challenge hai. Change Data Capture (CDC) tools bridge karte hain.
          </p>
          <ul style={S.ul}>
            <li><strong>Striim:</strong> Real-time CDC streaming. On-prem aur cloud databases se change events stream karo → target database. SQL Server, Oracle, MySQL, PostgreSQL sources. Low latency.</li>
            <li><strong>Attunity Replicate (now Qlik Replicate):</strong> Enterprise CDC. AWS DMS competitor. Cross-cloud replication support.</li>
            <li><strong>pglogical / AWS DMS:</strong> PostgreSQL logical replication. AWS RDS → any PostgreSQL target including Azure Database for PostgreSQL.</li>
            <li><strong>Apache Kafka + Debezium:</strong> Open-source CDC. Debezium → Kafka → target connector. Complex but powerful. Cross-cloud Kafka (Confluent Cloud spans providers).</li>
            <li><strong>Active-active database challenge:</strong> Two-way replication = write conflict resolution needed. CockroachDB, YugabyteDB, Google Spanner — globally distributed, multi-region writes, built-in conflict resolution. Expensive but solves the problem architecturally.</li>
          </ul>
          <Callout type="warning" title="Replication Lag = Hidden RPO Degradation">
            Cross-cloud DB replication lag monitor karo continuously. High network latency cross-cloud (50-100ms inter-region) means replication lag zyada hoga than single-cloud. Alert if lag exceeds RPO threshold. DR failover se pehle current lag check karo — stale data se start karna data loss guarantee karta hai.
          </Callout>
        </section>

        <section id="data-gravity">
          <h3 style={S.h3}>Data Gravity and Migration</h3>
          <p style={S.p}>
            Large datasets apni location pe compute attract karte hain — yeh data gravity hai. Multi-cloud mein yeh decisions drive karta hai: primary cloud wo hoga jahan primary database hai.
          </p>
          <ul style={S.ul}>
            <li><strong>Migration approach by size:</strong> Under 1TB: online tools (rclone, DataSync). 1-100TB: seed copy via Snowball/Data Box phir CDC for ongoing sync. Over 100TB: compute moves to data — don't migrate data, run analytics at source.</li>
            <li><strong>Egress cost reality:</strong> $0.08-0.09/GB typical egress. 100TB cross-cloud = approximately $8,000 one-way. Architecture mein data flows plan karo — minimize unnecessary cross-cloud data movement.</li>
            <li><strong>Data localization:</strong> Once data is in a cloud, workloads naturally follow. Multi-cloud data distribution should match workload distribution — not scatter data everywhere.</li>
          </ul>
        </section>

        <section id="storage-rpo-rto">
          <h3 style={S.h3}>RPO, RTO and Storage Consistency</h3>
          <p style={S.p}>
            Multi-cloud storage mein RPO aur RTO define karna critical hai — especially cross-cloud replication ke saath. Yeh business decisions hain jो technical implementation drive karte hain.
          </p>
          <ComparisonTable
            headers={["Pattern", "RPO", "RTO", "Storage Method", "Cross-Cloud Cost"]}
            rows={[
              ["Active-Active (synchronous)", "~0 seconds", "~0 seconds", "CockroachDB, Spanner (global)", "Very High — sync writes cross-cloud"],
              ["Active-Active (async replication)", "Seconds-minutes", "Minutes", "CDC streaming (Striim/Debezium)", "High — continuous replication traffic"],
              ["Warm Standby (async + running)", "Minutes", "Minutes", "DB read replica + scaled-down compute", "Medium — replication + idle compute"],
              ["Pilot Light (DB only)", "Minutes", "30-60 min", "DB read replica only, no compute", "Low — only replication traffic"],
              ["Backup/Restore (cold)", "Hours-days", "Hours-days", "Scheduled backups to cloud storage", "Lowest — only backup storage"],
            ]}
          />
          <ul style={S.ul}>
            <li><strong>Object storage consistency:</strong> AWS S3: strong read-after-write consistency (since 2020). Azure Blob: strong consistency within region. GCS: strong global consistency. Cross-cloud replication mein: eventual consistency — source change hone ke baad destination update hone mein delay. Alert agar replication lag RPO exceed kare.</li>
            <li><strong>Eventual consistency implications:</strong> Cross-cloud replicated data mein stale reads possible. Read-your-writes pattern cross-cloud mein guaranteeable nahi. Design: writes always to primary cloud, reads from nearest (accept potential staleness). Cache invalidation: cross-cloud cache consistency very hard — prefer single-cloud caching layer.</li>
            <li><strong>Immutable backups and ransomware recovery:</strong> S3 Object Lock (Compliance mode): not even AWS admin can delete during retention period. Azure Immutable Blob: time-based retention + legal hold. GCS Object Lock: similar. Ransomware attack on primary cloud → backup on secondary cloud with Object Lock untouched → restore from immutable backup. Cross-cloud airgap = most effective ransomware protection. Test: quarterly backup restore drill, verify Object Lock actually prevents deletion.</li>
            <li><strong>Backup verification:</strong> "Backup complete" ≠ "restore will work." Verification mandatory: automated restore test (Veeam SureBackup, Azure Backup verification jobs). Checksum validation: DataSync/rclone checksum verify karo post-transfer. Recovery drill: quarterly full application restore drill from backup — timed, documented. Common failure: backup files corrupted ya missing, discovered only during actual DR event.</li>
            <li><strong>Archive strategy:</strong> Multi-cloud archive: S3 Glacier Deep Archive ($0.00099/GB/month), Azure Archive tier ($0.00099/GB/month), GCS Archive ($0.0012/GB/month). Policy: data older than 90 days → Glacier/Archive tier automatically. Retrieval time: Glacier Deep Archive 12-48 hours. Design: archive access ka plan banao — DR pe archive restore timeline ke andar fit hona chahiye.</li>
          </ul>

          <Figure caption="Storage Replication: object storage, database CDC, cross-cloud backup and data gravity decisions">
            <StorageReplicationDiagram />
          </Figure>
        </section>
      </section>

      {/* ── SECURITY ──────────────────────────────────────────────────────── */}
      <section id="security">
        <h2 style={S.h2}>Multi-Cloud Security</h2>
        <p style={S.p}>
          Multi-cloud security single cloud se harder hai kyunki attack surface tripled hai — teen consoles, teen IAM systems, teen network configurations, teen compliance planes. Weakest cloud = weakest link for entire organization.
        </p>

        <section id="zero-trust">
          <h3 style={S.h3}>Zero Trust Across All Clouds</h3>
          <p style={S.p}>
            Zero Trust multi-cloud mein especially critical hai — network perimeter concept exist nahi karta jab workloads three clouds mein hain. Identity + device + context = only trust signals.
          </p>
          <ul style={S.ul}>
            <li><strong>Consistent MFA:</strong> Central IdP pe MFA mandatory — sab clouds automatically inherit. Phishing-resistant MFA preferred: FIDO2/WebAuthn (hardware keys ya platform authenticators). SMS OTP avoid karo (SIM swap attacks).</li>
            <li><strong>Conditional Access:</strong> Entra ID Conditional Access / Okta Adaptive MFA — device compliance check, location risk, sign-in frequency. High-risk sign-in = step-up MFA or block.</li>
            <li><strong>Microsegmentation:</strong> AWS Security Groups + Azure NSGs + GCP Firewall Rules — each independently configured. Default deny, explicit allow. Cross-cloud traffic explicitly allowed at both ends.</li>
            <li><strong>Zero Trust Network Access (ZTNA):</strong> Zscaler ZPA, Palo Alto Prisma Access, Cloudflare Access — VPN replace karo. User identity + device posture = access decision, not network location.</li>
          </ul>
        </section>

        <section id="pam-secrets">
          <h3 style={S.h3}>PAM, Bastion Hosts and Secrets Management</h3>
          <ul style={S.ul}>
            <li><strong>PAM across clouds:</strong> CyberArk, BeyondTrust, Delinea — unified privileged access across on-prem + AWS + Azure + GCP. Admin passwords vaulted, sessions recorded, auto-rotated.</li>
            <li><strong>Cloud-native bastions:</strong> AWS Systems Manager Session Manager (no open ports, IAM-auth), Azure Bastion (browser RDP/SSH via portal), GCP Identity-Aware Proxy TCP tunneling. No SSH/RDP directly from Internet — ever.</li>
            <li><strong>JIT access:</strong> Azure PIM for Azure + AWS resources (via SAML). Eligible assignment → request elevation → time-limited (1-8 hours) → auto-revoke. Permanent admin rights = attack surface.</li>
            <li><strong>Certificate management:</strong> Multi-cloud multiplies certificates — VPN endpoints, API gateways, internal services. Centralized PKI (Vault PKI, DigiCert CertCentral) mandatory. Expiry monitoring: 90/60/30/7 day alerts. Auto-renewal where possible.</li>
          </ul>
        </section>

        <section id="encryption-kms">
          <h3 style={S.h3}>Encryption and KMS Differences</h3>
          <ComparisonTable
            headers={["Feature", "AWS KMS", "Azure Key Vault", "GCP Cloud KMS", "HashiCorp Vault"]}
            rows={[
              ["Type", "Managed KMS", "Managed KMS + secrets", "Managed KMS", "Software (self/managed)"],
              ["Key types", "Symmetric, Asymmetric, HMAC", "Symmetric, Asymmetric, certs", "Symmetric, Asymmetric, Mac", "All types, dynamic"],
              ["HSM option", "CloudHSM (FIPS 140-2 L3)", "Dedicated HSM", "Cloud HSM", "External HSM backend"],
              ["BYOK/CMEK", "Yes (external key material)", "Yes (BYOK)", "Yes (CMEK)", "Yes (external seal)"],
              ["Secret storage", "Secrets Manager (separate)", "Built-in secrets vault", "Secret Manager (separate)", "Native — primary use case"],
              ["Dynamic creds", "No (via Lambda rotation)", "No (via function rotation)", "No", "Yes — native feature"],
              ["Cross-cloud use", "AWS only (without Vault)", "Azure only", "GCP only", "All clouds, all environments"],
              ["Cost model", "Per key + per API call", "Per operation + HSM fixed", "Per version + per operation", "License (Enterprise) or free (OSS)"],
            ]}
          />
        </section>

        <section id="compliance">
          <h3 style={S.h3}>Compliance Across Multiple Clouds</h3>
          <p style={S.p}>
            Multi-cloud compliance = evidence from three environments simultaneously. Single cloud audit se 3x more complex.
          </p>
          <ul style={S.ul}>
            <li><strong>CSPM per cloud:</strong> AWS Security Hub + GuardDuty, Microsoft Defender for Cloud, GCP Security Command Center — each gives posture score for their cloud. Aggregate into central SIEM.</li>
            <li><strong>Unified CSPM:</strong> Orca Security, Wiz, Prisma Cloud (Palo Alto) — agentless, scans all three clouds from one console. Vulnerability findings, misconfiguration, identity risk across multi-cloud.</li>
            <li><strong>Policy as code multi-cloud:</strong> OPA (Open Policy Agent) — cloud-agnostic policy enforcement in K8s (Gatekeeper), CI/CD pipeline, infrastructure provisioning. Conftest: OPA-based Terraform plan validation pre-apply.</li>
            <li><strong>Audit evidence:</strong> CloudTrail + Azure Activity Log + GCP Audit Logs — all into central SIEM (Splunk, Microsoft Sentinel, Chronicle). Unified query: "show all IAM changes across all clouds in last 24 hours."</li>
          </ul>
        </section>

        <section id="cloud-security-posture">
          <h3 style={S.h3}>CSPM, CNAPP, CWPP and DSPM</h3>
          <p style={S.p}>
            Cloud security terminology confusing ho sakti hai — CSPM, CNAPP, CWPP, DSPM alag tools hain alag purposes ke saath. Multi-cloud mein sab relevant hain.
          </p>
          <ComparisonTable
            headers={["Tool Type", "Full Name", "What It Does", "Multi-Cloud Tools"]}
            rows={[
              ["CSPM", "Cloud Security Posture Management", "Misconfiguration detection: public buckets, overly permissive SGs, unencrypted storage", "Wiz, Orca, Prisma Cloud, Defender CSPM"],
              ["CWPP", "Cloud Workload Protection Platform", "Runtime protection for VMs/containers: threat detection, vulnerability scanning, behavioral analysis", "Crowdstrike Falcon, Sysdig, Aqua Security"],
              ["CNAPP", "Cloud-Native Application Protection Platform", "CSPM + CWPP + code scanning unified — full lifecycle from code to runtime", "Wiz (leading), Prisma Cloud, Microsoft Defender"],
              ["DSPM", "Data Security Posture Management", "Finds sensitive data (PII, PAN, PHI) across all clouds, classifies it, maps access", "Dig Security, Laminar, Microsoft Purview"],
              ["CIEM", "Cloud Infrastructure Entitlement Management", "Maps all IAM permissions across clouds, finds excess privileges, toxic combinations", "Ermetic, CyberArk, Sonrai, AWS IAM Analyzer"],
            ]}
          />
          <ul style={S.ul}>
            <li><strong>Prioritization:</strong> Wiz ya Orca — invest pehle. Agentless scanning (no agent deployment), all clouds simultaneously, risk prioritization (vuln + exposure + identity combined). Most important tool for multi-cloud security posture.</li>
            <li><strong>Certificate lifecycle management:</strong> Multi-cloud multiplies certificates — VPN certs, TLS certs for APIs/ingress, internal service certs, code signing certs. Inventory mandatory: Venafi, DigiCert CertCentral, HashiCorp Vault PKI. Expiry monitoring: 90/60/30/7 day alerts minimum, multiple recipients. Auto-renewal: Let's Encrypt / ACME for public certs (cert-manager in K8s). Internal PKI: Vault PKI with automated issuance. VPN/infrastructure certs: calendar-based renewal process with documented runbook — these cannot auto-renew easily.</li>
            <li><strong>HSM integration multi-cloud:</strong> AWS CloudHSM (FIPS 140-2 Level 3), Azure Dedicated HSM (Thales Luna), GCP Cloud HSM. Cross-cloud consistency: on-prem Thales/Entrust HSM as root of trust. Cloud HSMs as subordinate CAs. BYOK (Bring Your Own Key): keys generated in on-prem HSM, exported (key encryption key only) to cloud KMS. Keys never leave HSM in plaintext — only wrapped. HYOK (Hold Your Own Key): keys stay on-prem HSM permanently, cloud requests decryption each time. Highest security, highest latency.</li>
            <li><strong>Key rotation strategy:</strong> Symmetric keys: 90-day rotation recommended (NIST). AWS KMS: automatic rotation enable karo (1-year default, custom period via API). Azure Key Vault: rotation policy configure karo (alert at 80% lifetime). GCP Cloud KMS: rotation schedule per key. Rotation does NOT decrypt existing data — envelope encryption. Old key version retained for decryption, new version used for new encryptions. Rotation audit: every rotation logged — CloudTrail KMS events, Azure Key Vault diagnostic logs. Alert on manual rotation (outside schedule = potential incident).</li>
          </ul>
        </section>

        <Figure caption="Multi-Cloud Security: Zero Trust principle, encryption, PAM, network security and compliance layers">
          <SecurityArchitectureDiagram />
        </Figure>
      </section>

      {/* ── MONITORING ────────────────────────────────────────────────────── */}
      <section id="monitoring">
        <h2 style={S.h2}>Unified Monitoring and Observability</h2>

        <section id="metrics-logging">
          <h3 style={S.h3}>Metrics, Logging and Tracing</h3>
          <p style={S.p}>
            Multi-cloud observability ka primary challenge: teen separate monitoring planes. CloudWatch + Azure Monitor + GCP Cloud Monitoring — teeno alag dashboards, alag query languages, alag alert systems. Single pane of glass mandatory.
          </p>
          <ul style={S.ul}>
            <li><strong>Prometheus + Grafana (vendor-agnostic):</strong> Agents on all three clouds collect metrics → central Prometheus (ya Cortex/Thanos for scale) → Grafana dashboards. Cloud-agnostic, open source, highly customizable.</li>
            <li><strong>Commercial APM:</strong> Datadog, Dynatrace, New Relic — agents on all clouds, single SaaS console, ML-based anomaly detection. Expensive but mature multi-cloud support.</li>
            <li><strong>OpenTelemetry (OTEL):</strong> CNCF standard for traces, metrics, logs. Vendor-agnostic instrumentation — write once, export to any backend. W3C trace context propagation: trace ID follow request across AWS → Azure → GCP in single transaction.</li>
            <li><strong>Log aggregation:</strong> Fluent Bit (lightweight) → central Elasticsearch/Splunk/Azure Log Analytics/Chronicle. All cloud audit logs → SIEM. Unified query: single search across all cloud logs simultaneously.</li>
          </ul>
        </section>

        <section id="siem-incident">
          <h3 style={S.h3}>SIEM and Incident Management</h3>
          <ul style={S.ul}>
            <li><strong>Central SIEM options:</strong> Microsoft Sentinel (native Azure + AWS/GCP connectors), Splunk (broadest connectors), Google Chronicle (fast + cost-effective), IBM QRadar, Elastic SIEM.</li>
            <li><strong>Threat correlation:</strong> Single SIEM mein cross-cloud threat correlation possible. Example: AWS login from India + GCP admin API from Russia 5 seconds later = impossible travel alert. Without unified SIEM — missed by both individual cloud tools.</li>
            <li><strong>CMDB integration:</strong> ServiceNow MID Server → discovers cloud assets automatically. CMDB = single source of truth for all multi-cloud assets. Required for change management, ITSM, incident routing.</li>
            <li><strong>Incident response:</strong> Runbook mein first question: "Which cloud?" Multi-cloud incidents often cross-cloud (DNS issue affecting all, identity outage affecting all). War room: all three cloud teams + network team simultaneously.</li>
          </ul>
        </section>

        <section id="otel-architecture">
          <h3 style={S.h3}>OpenTelemetry Collector Architecture and Distributed Tracing</h3>
          <p style={S.p}>
            OpenTelemetry (OTEL) multi-cloud observability ka backbone hai — vendor-agnostic, CNCF standard, instrumentate once aur export anywhere.
          </p>
          <ul style={S.ul}>
            <li><strong>OTEL Collector architecture:</strong> Collector = agents + gateway. Agent collector: sidecar ya DaemonSet har K8s node pe, ya VM pe process. Collects: traces, metrics, logs. Exports to gateway collector. Gateway collector: central aggregation point per cloud/region. Processes: batch, sampling, enrichment (add cloud metadata). Routes to backends: Jaeger (traces), Prometheus (metrics), Elasticsearch (logs). Cross-cloud: each cloud's gateway exports to unified backend (Grafana Cloud, Datadog, Splunk Observability).</li>
            <li><strong>Distributed tracing cross-cloud:</strong> W3C Trace Context (traceparent header) propagation — trace ID generated at request entry (API gateway/CDN), propagated through every service hop. AWS Lambda → Azure API → GCP Pub/Sub → back to AWS RDS — single trace spans all four clouds. Jaeger, Zipkin, Tempo — trace backends accepting OTEL protocol. Sampling: head-based (decide at trace start) ya tail-based (decide at trace end, Grafana Tempo). Tail-based recommended: capture 100% of error traces regardless of rate.</li>
            <li><strong>Log normalization:</strong> Multi-cloud mein log formats alag hain: CloudWatch JSON, Azure Monitor JSON, GCP structured JSON — field names alag. Normalization: Fluent Bit/Logstash rewrite filter. Common schema: timestamp (ISO 8601), severity (INFO/WARN/ERROR), service name, trace ID, span ID, cloud provider, region. OpenTelemetry Log Bridge: existing logging libraries (log4j, winston, Python logging) bridge karo to OTEL semantic conventions. Result: single query cross-cloud works on normalized fields.</li>
            <li><strong>Metrics federation:</strong> Prometheus federation: child Prometheus (per cloud) → parent Prometheus (global). Recording rules on child reduce cardinality before federation. Thanos/Cortex: long-term storage, global view, cross-cluster PromQL queries. Exemplars: metrics linked to traces — spike in latency metric → click → trace that caused it. Cross-cloud metric correlation: same metric names + labels (cloud=aws/azure/gcp as label) → single Grafana panel shows all clouds.</li>
            <li><strong>SLI, SLO and SLA definitions:</strong> SLI (Service Level Indicator): measurable metric — request success rate, latency p99, error rate. SLO (Service Level Objective): internal target — "99.9% of requests succeed." Error budget: (1 - SLO) × time period = 43 minutes/month for 99.9%. SLA (Service Level Agreement): contractual commitment to customers — legal obligation. Multi-cloud SLO: each cloud's SLO separately tracked, plus end-to-end user-facing SLO. Cross-cloud dependency: if AWS down = end-to-end SLO violated even if Azure/GCP fine. Design SLOs at user-facing boundary, not per-cloud boundary.</li>
            <li><strong>Alert fatigue reduction:</strong> Multi-cloud = 3x more alerts without discipline. Strategies: (1) Alert on symptoms, not causes — "user login failing" not "CPU high." (2) Error budget alerts: alert when 5% of monthly error budget consumed in 1 hour (burn rate alerting). (3) Deduplication: PagerDuty/OpsGenie group related alerts from all clouds. (4) Noise reduction: 14-day baseline ML anomaly detection (Datadog APM) vs static thresholds. (5) Runbook links in every alert — no alert without a runbook. (6) Regular alert review: monthly alert audit — fire rate, action rate, false positive rate. Delete or tune alerts with zero action rate.</li>
            <li><strong>Synthetic monitoring:</strong> Proactive cross-cloud health checks — test user journeys before users complain. Datadog Synthetic Tests, Grafana k6, AWS CloudWatch Synthetics. Multi-step tests: login (IdP) → API call (cloud A) → data fetch (cloud B) → response validate. Run from multiple locations globally. Alert: test failure = real user impact. Baseline: run cross-cloud synthetic every 5 minutes.</li>
          </ul>

          <Figure caption="Observability Stack: data sources, collection, aggregation and alerting across all clouds">
            <ObservabilityStackDiagram />
          </Figure>
        </section>
      </section>

      {/* ── AUTOMATION ────────────────────────────────────────────────────── */}
      <section id="automation">
        <h2 style={S.h2}>Automation — IaC, GitOps and CI/CD</h2>

        <section id="terraform-multicloud">
          <h3 style={S.h3}>Terraform Multi-Cloud</h3>
          <p style={S.p}>
            Terraform multi-cloud IaC ka de facto standard hai — AWS, Azure, GCP teeno providers ke official providers available hain. Same toolchain, different provider configurations.
          </p>
          <ul style={S.ul}>
            <li><strong>Provider configuration:</strong> <code>provider "aws" {"{}"}</code>, <code>provider "azurerm" {"{}"}</code>, <code>provider "google" {"{}"}</code> — ek hi Terraform workspace mein teeno providers possible. Cross-provider references: <code>terraform_remote_state</code> se AWS VPN endpoint ID → Azure VPN config mein use karo.</li>
            <li><strong>State backends:</strong> Separate state backend per cloud recommended. AWS: S3 + DynamoDB locking. Azure: Azure Blob + lease locking. GCP: GCS + lock object. Cross-cloud module: orchestration Terraform state in one backend references others.</li>
            <li><strong>Module structure:</strong> <code>modules/aws-vpc/</code>, <code>modules/azure-vnet/</code>, <code>modules/gcp-vpc/</code> — reusable modules per cloud. Root module assembles multi-cloud architecture.</li>
            <li><strong>Atlantis / Terraform Cloud:</strong> Pull request automation. Plan on PR open, apply on merge. Approval gates for production. Cost estimation (Infracost) integrated in PR comments.</li>
            <li><strong>Security scanning:</strong> tfsec, Checkov, Terrascan — scan Terraform plans for misconfigurations pre-apply. "No public S3 bucket" rule catches mistakes before they reach production.</li>
          </ul>
        </section>

        <section id="gitops">
          <h3 style={S.h3}>GitOps with ArgoCD and Flux</h3>
          <ul style={S.ul}>
            <li><strong>ArgoCD ApplicationSets:</strong> Single ApplicationSet template → deploy to multiple clusters (EKS, AKS, GKE) simultaneously. Cluster selector: label-based. Environment matrix: dev/staging/prod × cloud provider.</li>
            <li><strong>Flux multi-tenancy:</strong> Fleet management — multiple clusters from single Git repo. Kustomize overlays per cluster/cloud. Image automation: new container image → PR → merge → all clusters update.</li>
            <li><strong>Config drift detection:</strong> ArgoCD/Flux continuously compare Git (desired state) vs cluster (live state). Drift detected → alert → auto-remediate or notify. Multi-cloud config consistency maintained automatically.</li>
            <li><strong>Ansible for non-K8s:</strong> VM configuration management across clouds. Ansible inventory: dynamic inventories from AWS, Azure, GCP simultaneously. Same playbook runs on EC2, Azure VM, GCE — cloud-agnostic OS configuration.</li>
          </ul>

          <Figure caption="Multi-Cloud Deployment Pipeline: Git → CI → approval → parallel Terraform apply across AWS, Azure, GCP">
            <DeploymentPipelineDiagram />
          </Figure>
        </section>
      </section>

      {/* ── FINOPS ────────────────────────────────────────────────────────── */}
      <section id="finops">
        <h2 style={S.h2}>FinOps and Cost Management</h2>
        <p style={S.p}>
          Multi-cloud FinOps single cloud se significantly complex hai — teen billing systems, alag pricing models, alag terminology (AWS "Reserved Instances" vs Azure "Reserved VM Instances" vs GCP "Committed Use Discounts"). Unified visibility mandatory hai.
        </p>

        <section id="cost-visibility">
          <h3 style={S.h3}>Cost Visibility — Unified Billing</h3>
          <ul style={S.ul}>
            <li><strong>Multi-cloud FinOps tools:</strong> CloudHealth by VMware, Apptio Cloudability, Spot.io, Kubecost (K8s-specific) — teeno clouds ka cost ek dashboard pe. AWS Cost Explorer + Azure Cost Management + GCP Billing alone insufficient — three tabs nahi, one dashboard.</li>
            <li><strong>Tagging standardization:</strong> Same tag schema teeno clouds pe enforce karo: <code>environment</code>, <code>team</code>, <code>application</code>, <code>cost-center</code>. AWS SCPs block untagged resource creation. Azure Policy deny untagged. GCP Org Policy label requirements. Without consistent tags — cost attribution impossible.</li>
            <li><strong>Daily anomaly alerts:</strong> 50% cost spike same day pe detect karo — not end of month. CloudHealth + AWS Cost Anomaly Detection + Azure Cost alerts + GCP Budget alerts all configured.</li>
            <li><strong>Reserved/Committed capacity:</strong> AWS RIs (1-3 year). Azure Reserved VMs (1-3 year). GCP CUDs (1-3 year). Independently managed — unified tool recommends optimal purchase per cloud based on usage patterns.</li>
          </ul>

          <p style={S.p}><strong>Reserved Capacity Deep-Dive — Per Cloud:</strong></p>
          <ComparisonTable
            headers={["Feature", "AWS", "Azure", "GCP"]}
            rows={[
              ["Product name", "Reserved Instances (RIs) + Savings Plans", "Azure Reservations + Savings Plan", "Committed Use Discounts (CUDs)"],
              ["Term options", "1-year, 3-year", "1-year, 3-year", "1-year, 3-year"],
              ["Discount range", "40-72% vs on-demand", "33-65% vs pay-as-you-go", "37-55% vs on-demand"],
              ["Flexibility", "Convertible RIs: family/size/region changeable", "Instance flexibility: family size exchange", "Resource-based: specific machine family"],
              ["Scope", "Account, region-specific, or Org-wide", "Subscription-specific or shared", "Project-specific"],
              ["Payment", "All upfront, partial, no upfront", "Upfront only (max discount)", "Upfront or monthly"],
              ["Coverage recommendations", "AWS Cost Explorer RI recommendations", "Azure Advisor reservation recommendations", "GCP Recommender CUD recommendations"],
              ["Savings Plans", "Compute Savings Plans (EC2+Lambda+Fargate)", "Azure Savings Plan for compute", "Not available (CUDs cover this)"],
            ]}
          />
          <ul style={S.ul}>
            <li><strong>Multi-cloud RI strategy:</strong> Baseline stable workloads → Reserved/CUDs (60-70% of compute). Variable workloads → On-demand. Experimental/batch → Spot/Preemptible. Unified tools (CloudHealth, Spot.io) recommend optimal RI purchases across all three clouds simultaneously — manual tracking across three portals is error-prone.</li>
            <li><strong>Cloud cost anomaly detection:</strong> AWS Cost Anomaly Detection: ML-based, per-service alerts. Threshold: custom minimum anomaly amount ($50 default). Azure Cost Alerts: budget alerts + anomaly detection in Cost Management. GCP Budget Alerts: threshold-based (50%, 90%, 100% of monthly budget). Multi-cloud: CloudHealth anomaly detection across all — single alert configuration for cross-cloud spend spike detection.</li>
            <li><strong>Tagging governance enforcement:</strong> Tag policy is only effective agar enforcement hai — awareness nahi kaafi. AWS SCP: <code>aws:RequestedRegion</code> + mandatory tag conditions. Azure Policy: deny effect on resource creation without required tags. GCP Org Policy: label enforcement. Reporting: weekly untagged resource report → team lead. Automated cleanup: untagged resources older than 7 days → auto-terminate in dev environments. "Cloud janitor" Lambda/Function: flag untagged, notify owner, terminate after grace period.</li>
            <li><strong>Spot/Preemptible arbitrage:</strong> Spot.io (NetApp) watches all three clouds' spot prices simultaneously. Batch workloads placed on cheapest available spot at any given time. Auto-migration: if AWS spot interrupted, workload moves to GCP preemptible automatically. Savings: 60-80% vs on-demand for interruptible workloads. Kubernetes: Karpenter (AWS), KEDA + cluster autoscaler (Azure/GCP) — spot node groups for batch pods.</li>
          </ul>
        </section>

        <section id="chargeback-showback">
          <h3 style={S.h3}>Chargeback and Showback</h3>
          <ul style={S.ul}>
            <li><strong>Showback:</strong> Business units ko unka total cross-cloud spend dikhao — AWS + Azure + GCP combined per team. Awareness drives voluntary optimization. Start here — no billing system changes needed.</li>
            <li><strong>Chargeback:</strong> Actual internal billing per business unit. Multi-cloud chargeback complex: currency normalization (different cloud bills in different cycles), shared service allocation (networking, identity costs split), cross-cloud data transfer attribution.</li>
            <li><strong>FinOps maturity:</strong> Crawl: tag everything, unified dashboard. Walk: reserved capacity, right-sizing alerts, idle resource cleanup. Run: auto-scaling optimization, spot/preemptible usage, automated rightsizing, waste prevention.</li>
          </ul>
        </section>

        <section id="license-optimization">
          <h3 style={S.h3}>License Optimization</h3>
          <ul style={S.ul}>
            <li><strong>Azure Hybrid Benefit:</strong> Existing Windows Server + SQL Server licenses → Azure VMs pe use karo. 40-85% cost reduction on Windows workloads. In multi-cloud context: Windows workloads Azure pe run karo for AHUB savings.</li>
            <li><strong>AWS License Manager:</strong> Track Microsoft, Oracle, SAP licenses across AWS. BYOL tracking, compliance enforcement. AWS Dedicated Hosts: existing per-core licenses use possible.</li>
            <li><strong>License portability:</strong> Microsoft Software Assurance (SA) → Azure License Mobility. Oracle: cloud pe BYOL allowed on dedicated compute. SAP: BYOL on all major clouds (certified cloud providers).</li>
            <li><strong>SaaS vs license:</strong> On-prem SQL Server (license + infra + DBA) vs Azure SQL PaaS (embedded license, managed) — multi-cloud context mein PaaS migration often cheaper even accounting for multi-cloud overhead.</li>
          </ul>
        </section>
      </section>

      {/* ── OPERATIONS ────────────────────────────────────────────────────── */}
      <section id="operations">
        <h2 style={S.h2}>Operations and Governance</h2>

        <section id="cmdb-itsm">
          <h3 style={S.h3}>CMDB, ITSM and Asset Discovery</h3>
          <ul style={S.ul}>
            <li><strong>Multi-cloud CMDB:</strong> ServiceNow CMDB — MID Server agents discover AWS, Azure, GCP assets automatically. All cloud resources (VMs, databases, K8s clusters, networking) in single CMDB. Asset ownership, cost allocation, dependency mapping.</li>
            <li><strong>Cloud-native asset inventory:</strong> AWS Config (all resource configurations, change history). Azure Resource Graph (cross-subscription queries). GCP Cloud Asset Inventory (org-wide snapshot). Feed all three into CMDB.</li>
            <li><strong>ITSM integration:</strong> Monitoring alert → ITSM ticket automatically. Change management: Terraform apply = change ticket. ServiceNow + Jira Service Management integration with all three cloud providers.</li>
            <li><strong>On-call:</strong> Multi-cloud incidents require coordinated escalation. PagerDuty/OpsGenie: L1 SRE → L2 cloud-specific engineer (AWS, Azure, or GCP) → L3 architect. War room: all cloud teams simultaneously for cross-cloud incidents.</li>
          </ul>
        </section>

        <section id="cmp">
          <h3 style={S.h3}>Cloud Management Platforms</h3>
          <ComparisonTable
            headers={["CMP", "Strengths", "Multi-Cloud Support", "Best For"]}
            rows={[
              ["CloudHealth (VMware)", "Cost optimization, governance, rightsizing", "AWS, Azure, GCP, on-prem", "FinOps-focused orgs, large enterprises"],
              ["Apptio Cloudability", "FinOps, chargeback, forecasting", "AWS, Azure, GCP", "Finance + IT alignment, chargebacks"],
              ["Spot.io (NetApp)", "Spot/preemptible optimization, autoscaling", "AWS, Azure, GCP", "High-compute workloads, cost reduction"],
              ["Morpheus Data", "Self-service provisioning, governance", "All major + on-prem", "Self-service cloud, governance enforcement"],
              ["Flexera One", "ITAM + FinOps + cloud governance", "All major + on-prem", "IT asset management + cloud combined"],
              ["HashiCorp Terraform Cloud", "IaC execution, drift detection, cost est.", "All providers", "Engineering-led, IaC governance"],
            ]}
          />
        </section>
      </section>

      {/* ── MIGRATION ─────────────────────────────────────────────────────── */}
      <section id="migration">
        <h2 style={S.h2}>Migration Strategy</h2>

        <section id="phased-migration">
          <h3 style={S.h3}>Phased Migration Approach</h3>
          <p style={S.p}>
            Multi-cloud migration single-cloud migration se complex hai — target environment itself complex hai. Phased approach mandatory.
          </p>
          <ol style={S.ol}>
            <li><strong>Phase 1 — Foundation:</strong> Multi-cloud networking (VPN/fabric), identity federation (central IdP), unified monitoring, IaC repository structure. Nothing migrates until foundation complete.</li>
            <li><strong>Phase 2 — Pilot workload:</strong> Non-critical application first cloud pe migrate karo. Validate: connectivity works, identity SSO works, monitoring data flowing, cost attribution tagged correctly.</li>
            <li><strong>Phase 3 — Wave migrations:</strong> Applications by dependency groups. Same-dependency apps same wave. Per-cloud target decided by workload placement strategy.</li>
            <li><strong>Phase 4 — Optimization:</strong> Right-sizing, reserved capacity, spot usage, multi-cloud cost rebalancing.</li>
          </ol>
        </section>

        <section id="rollback">
          <h3 style={S.h3}>Rollback Planning</h3>
          <ul style={S.ul}>
            <li><strong>DNS-based rollback:</strong> DNS TTL low karo. Cutover = DNS change. Rollback = DNS change back. Application traffic follows DNS — zero infrastructure change needed.</li>
            <li><strong>Database rollback:</strong> Source database still running during cutover window. Replication reversed if possible. Point-in-time recovery from backup if replication broken.</li>
            <li><strong>Blue-green across clouds:</strong> Old cloud = blue, new cloud = green. Traffic shift gradual (5% → 25% → 50% → 100%). Rollback = traffic shift back to blue. Both environments running simultaneously during transition.</li>
            <li><strong>Rollback decision window:</strong> Define explicitly: "We will decide to rollback or commit within 4 hours of cutover." Beyond window, rollback increasingly complex. Document explicitly before migration.</li>
          </ul>
        </section>
      </section>

      {/* ── FAILURE SCENARIOS ─────────────────────────────────────────────── */}
      <section id="failure-scenarios">
        <h2 style={S.h2}>Failure Scenarios</h2>

        <h3 style={S.h3}>Scenario 1: Cloud Provider Outage</h3>
        <ul style={S.ul}>
          <li><strong>Symptom:</strong> AWS ap-south-1 partial outage. Health checks fail for Mumbai endpoints. Route 53 latency-based routing stops receiving healthy responses.</li>
          <li><strong>Impact:</strong> India user traffic unserved agar multi-cloud DR configured nahi. With DR: traffic shifts to Azure West Europe + GCP Iowa — higher latency for India users but service available.</li>
          <li><strong>Detection:</strong> Route 53/Traffic Manager health checks fail → DNS failover triggers → CloudWatch/Datadog alert: "Mumbai endpoint unhealthy."</li>
          <li><strong>Recovery:</strong> DNS failover automatic (if TTL 60 seconds pre-set). Database: DR replica promoted. Applications: scale up on secondary cloud. Monitor primary cloud recovery — fail-back planned maintenance window.</li>
          <li><strong>Lesson:</strong> TTL kab bhi 300 seconds se zyada nahi hona chahiye production DNS pe. AWS outages documented — test failover quarterly before real event.</li>
        </ul>

        <h3 style={S.h3}>Scenario 2: Cross-Cloud DNS Resolution Failure</h3>
        <ul style={S.ul}>
          <li><strong>Symptom:</strong> AWS workloads suddenly cannot resolve Azure service names. GCP services timing out when calling AWS endpoints. Name resolution working per-cloud but cross-cloud broken.</li>
          <li><strong>Impact:</strong> Cross-cloud dependent services fail. Microservices calling cross-cloud APIs timeout. Replication tasks fail.</li>
          <li><strong>Detection:</strong> Application logs: DNS resolution errors. <code>nslookup service.azure.internal</code> from AWS EC2 — timeout. VPN connectivity check: IP-level reachability works, DNS broken.</li>
          <li><strong>Recovery:</strong> Cross-cloud DNS forwarder configuration check. VPN tunnel up but DNS forwarder misconfigured? Restart DNS resolver services. Verify conditional forwarding rules on both sides.</li>
          <li><strong>Lesson:</strong> DNS changes require testing on both sides. Automated DNS health checks every 5 minutes for cross-cloud resolution. Monitor: "can AWS resolve Azure private DNS?" synthetic check.</li>
        </ul>

        <h3 style={S.h3}>Scenario 3: IAM / Identity Outage</h3>
        <ul style={S.ul}>
          <li><strong>Symptom:</strong> Central IdP (Okta/Entra ID) degraded. Engineers cannot login to AWS Console, Azure Portal, GCP Console. Automated workloads using SAML federation also fail.</li>
          <li><strong>Impact:</strong> Ops team cannot manage any cloud resources. Automation tasks using federated identity fail. Full multi-cloud management lockout.</li>
          <li><strong>Detection:</strong> Login failures across all cloud consoles. IdP status page shows degraded. Monitoring alerts: "API call authentication failures spiking."</li>
          <li><strong>Recovery:</strong> Break-glass accounts — each cloud has independently configured emergency admin accounts (not IdP-federated). Local IAM users (AWS), Azure local admin, GCP emergency SA. Break-glass credentials vaulted (CyberArk), MFA on vault. Use break-glass for emergency ops until IdP recovers.</li>
          <li><strong>Lesson:</strong> Break-glass accounts are non-negotiable — test quarterly. Document break-glass procedure in printed runbook (if IdP down, digital runbooks may also be unreachable via SSO).</li>
        </ul>

        <h3 style={S.h3}>Scenario 4: Replication Lag and Split-Brain</h3>
        <ul style={S.ul}>
          <li><strong>Symptom:</strong> Primary AWS database failover triggered. Azure SQL DR replica promoted. Post-failover: data inconsistency detected — 45-minute gap in data.</li>
          <li><strong>Impact:</strong> Financial transactions in 45-minute window not in DR database. Reconciliation needed. Business impact proportional to transaction value in window.</li>
          <li><strong>Detection:</strong> Post-failover data audit. Replication lag metrics showed 45-minute lag — but alert was configured for 2-hour threshold (insufficient).</li>
          <li><strong>Recovery:</strong> Transaction logs from AWS primary (if accessible). Manual reconciliation of missing transactions. Business-side notification of potential data gap.</li>
          <li><strong>Lesson:</strong> Replication lag alert threshold = RPO / 2. If RPO is 15 minutes, alert if lag exceeds 7 minutes. Verify lag before initiating failover. Synchronous replication for zero-RPO critical data — accept performance cost.</li>
        </ul>

        <h3 style={S.h3}>Scenario 5: DNS Split-Brain</h3>
        <ul style={S.ul}>
          <li><strong>Symptom:</strong> Internal users (within cloud VPN) resolve <code>api.company.com</code> to internal IP 10.1.0.50. External users resolve to 1.2.3.4 (public IP). But internal users on AWS VPN start getting public IP — hitting Internet-facing WAF instead of internal service. Latency 5ms → 45ms. Some internal APIs that require private network access break.</li>
          <li><strong>Impact:</strong> Internal services that require private network (database APIs, admin endpoints) become inaccessible via public IP. Latency increase for all internal API calls. Security: traffic that should stay private now traversing Internet.</li>
          <li><strong>Detection:</strong> Application latency spike alert. <code>nslookup api.company.com</code> from internal IP — returns public IP (incorrect). DNS resolver config change audit: Route 53 Resolver rule modified?</li>
          <li><strong>Recovery:</strong> Route 53 Resolver inbound rule restore to original config. Verify conditional forwarder chain: internal DNS → private hosted zone → internal IP. Test from multiple subnets. Clear DNS cache on affected instances: <code>sudo systemd-resolve --flush-caches</code>.</li>
          <li><strong>Lesson:</strong> DNS split-brain = separate internal and external zones for same domain. Changes to either zone require testing from both internal and external perspectives. DNS change management: CAB review for all DNS changes. Automated test: synthetic monitor "from VPN: resolve api.company.com → expect 10.1.x.x" runs every 5 minutes.</li>
        </ul>

        <h3 style={S.h3}>Scenario 6: Certificate Expiry — Cross-Cloud Service Failure</h3>
        <ul style={S.ul}>
          <li><strong>Symptom:</strong> Monday morning 09:00 — multiple AWS Lambda functions fail when calling Azure API endpoint. Error: "SSL certificate expired." GCP services also failing to connect to same Azure endpoint. Azure service itself running fine — external callers failing.</li>
          <li><strong>Impact:</strong> All cross-cloud services calling this Azure API endpoint down. Revenue-impacting if customer-facing. AWS and GCP teams both report failures — root cause same.</li>
          <li><strong>Detection:</strong> Application logs: "certificate verify failed." Certificate monitoring tool (Venafi/Datadog SSL check) should have alerted — investigate why alert was missed. Azure API endpoint SSL cert: <code>openssl s_client -connect api.azure-service.internal:443 2&gt;/dev/null | openssl x509 -noout -dates</code>.</li>
          <li><strong>Recovery:</strong> Emergency cert renewal (Azure App Service managed cert auto-renews but only if DNS validation accessible). Manual renewal: generate CSR, get cert from CA, deploy to Azure Application Gateway/API Management. Cross-cloud impact: once Azure cert renewed, AWS and GCP callers automatically recover — no change needed on their end.</li>
          <li><strong>Lesson:</strong> Multi-cloud certificate inventory required — "which certs affect cross-cloud communication?" are highest priority. Expiry monitoring: Datadog SSL integration, Grafana agent SSL exporter, or custom Lambda/Function checking certs daily. Alerting: 90 days, 60 days, 30 days, 14 days, 7 days — escalating severity. Auto-renewal where possible (cert-manager in K8s, ACM for AWS-native endpoints).</li>
        </ul>

        <h3 style={S.h3}>Scenario 7: BGP Flap — Intermittent Cross-Cloud Connectivity</h3>
        <ul style={S.ul}>
          <li><strong>Symptom:</strong> Cross-cloud connectivity intermittent — applications report timeout errors randomly every few minutes. Ping cross-cloud shows periodic packet loss. Some TCP connections succeed, some fail. No clear pattern.</li>
          <li><strong>Impact:</strong> Application errors appear/disappear. Difficult to reproduce. Customer complaints intermittent. Root cause not immediately obvious — looks like application bug initially.</li>
          <li><strong>Detection:</strong> BGP session logs: "BGP session reset" events every few minutes. AWS VPN tunnel status fluctuating. SD-WAN console: path health score dropping intermittently. <code>show bgp neighbor x.x.x.x</code> on SD-WAN: flap count increasing.</li>
          <li><strong>Recovery:</strong> Identify BGP flap cause: hold-timer too aggressive? BFD misconfigured? ISP link quality degraded? SD-WAN appliance memory/CPU high? Fix: increase hold-timer (60 seconds minimum), check ISP SLA, hardware check on SD-WAN. Failover: ensure backup path (VPN fallback) activates when primary flaps. BGP dampening: penalize unstable routes to prevent rapid reconvergence loops.</li>
          <li><strong>Lesson:</strong> BGP flap monitoring: alert on BGP session state changes (up → down → up cycles). BGP hold-timer minimum 20-30 seconds — aggressive timers (10 seconds) cause flaps on loaded links. BFD (Bidirectional Forwarding Detection): enable for fast failure detection without aggressive BGP timers. Route dampening: suppress unstable prefixes automatically.</li>
        </ul>

        <h3 style={S.h3}>Scenario 8: Kubernetes Control Plane Failure</h3>
        <ul style={S.ul}>
          <li><strong>Symptom:</strong> EKS cluster in AWS — kubectl commands fail: "The connection to the server was refused." Running pods unaffected (existing workloads continue). New deployments impossible. HPA (auto-scaling) stops working. Node registration fails — new nodes cannot join.</li>
          <li><strong>Impact:</strong> Cannot deploy new versions. Cannot scale workloads. Cannot apply configuration changes. Existing running pods continue (data plane unaffected), but operations team locked out of management.</li>
          <li><strong>Detection:</strong> ArgoCD sync fails: "unable to reach cluster API server." <code>kubectl cluster-info</code>: connection refused. AWS EKS console: cluster status "DEGRADED" or "FAILED." CloudWatch EKS metrics: API server availability 0%.</li>
          <li><strong>Recovery:</strong> EKS (managed): AWS handles control plane recovery — open support ticket with urgency. Check: cluster VPC security groups, private endpoint access, EKS API server logs in CloudTrail. Interim: existing pods continue serving traffic — application not down, just unmanageable. For self-managed K8s (kops/kubespray): etcd backup restore, control plane VM recovery. Cross-cloud mitigation: Karmada/RHACM can reschedule workloads to healthy cluster (Azure AKS) if primary cluster control plane fails.</li>
          <li><strong>Lesson:</strong> Managed K8s (EKS/AKS/GKE) control plane SLA: 99.9%. Self-managed: you handle control plane HA. Control plane monitoring: separate from data plane — alert on kubectl API availability, not just pod health. Multi-cluster: design workloads for cluster failure — Karmada failover policy prevents complete outage when single cluster control plane fails.</li>
        </ul>

        <ComparisonTable
          headers={["Scenario", "Symptom", "Detection", "Prevention"]}
          rows={[
            ["Cloud provider outage", "Health checks fail, traffic loss", "Route 53/TM health check failure", "Multi-cloud DR configured, TTL 60s"],
            ["Cross-cloud DNS failure", "Name resolution broken cross-cloud", "Automated DNS synthetic checks", "Bi-directional DNS forwarders tested"],
            ["DNS split-brain", "Internal traffic hitting public endpoint", "Synthetic monitor: expect internal IP", "Separate zones, change management"],
            ["Certificate expiry", "SSL errors on cross-cloud calls", "Cert expiry monitoring 90/60/30 days", "Inventory, auto-renewal, escalating alerts"],
            ["Central IdP outage", "All cloud logins fail", "Login failure spike across clouds", "Break-glass accounts, quarterly test"],
            ["Replication lag / split-brain", "Data inconsistency post-failover", "Replication lag monitoring", "Lag alert = RPO/2. Check before failover."],
            ["Cross-cloud VPN failure", "Cross-cloud traffic drops", "BGP session down alert", "SD-WAN fabric + VPN backup"],
            ["BGP flap", "Intermittent cross-cloud connectivity", "BGP session state change alerts", "Hold-timer tuning, BFD, route dampening"],
            ["K8s control plane failure", "kubectl fails, deployments impossible", "ArgoCD sync fail, EKS status check", "Managed K8s (EKS/AKS/GKE), Karmada failover"],
            ["Storage corruption", "Checksums fail, data read errors", "DataSync/rclone checksum verification", "Object versioning + immutable backups"],
            ["IAM misconfiguration (deny)", "App cannot access cross-cloud resource", "403/401 errors in app logs", "IAM changes through PR + automated test"],
            ["Cost spike (egress)", "Bill 5x normal monthly", "Daily anomaly alert", "Architecture review, egress minimization"],
          ]}
        />
      </section>

      {/* ── DECISION MATRIX ───────────────────────────────────────────────── */}
      <section id="decision-matrix">
        <h2 style={S.h2}>Decision Matrix — When to Choose What</h2>
        <p style={S.p}>
          Cloud strategy decision structured process se hona chahiye — cost of complexity justify karo before committing to multi-cloud.
        </p>

        <Figure caption="Cloud Strategy Decision Matrix: single cloud, private cloud, hybrid, multi-cloud comparison">
          <DecisionMatrixDiagram />
        </Figure>

        <p style={S.p}><strong>Decision framework (in order):</strong></p>
        <ol style={S.ol}>
          <li><strong>Start with single cloud</strong> agar greenfield. Complexity earn karo — don't pre-optimize for problems you don't have yet.</li>
          <li><strong>Move to Hybrid</strong> jab legacy apps ya data residency on-prem rakhne force kare, ya on-prem investment protection needed ho.</li>
          <li><strong>Add Multi-Cloud</strong> jab: specific service gap (BigQuery, Azure AD, AWS mature DBs), geographic coverage, regulatory mandate, or vendor lock-in risk is quantifiable and unacceptable.</li>
          <li><strong>Avoid Multi-Cloud</strong> jab: small team (less than 50 engineers), early-stage product, single-region requirement, no clear cost-benefit.</li>
        </ol>

        <ComparisonTable
          headers={["Trigger", "Recommended Strategy", "Example"]}
          rows={[
            ["New startup, no legacy", "Single cloud (AWS or GCP preferred)", "E-commerce startup: all on AWS from day 1"],
            ["On-prem + one cloud", "Hybrid Cloud", "Bank: on-prem core banking + AWS for digital channels"],
            ["Already using M365/Azure AD + need compute", "Hybrid-Multi (Azure identity + AWS/GCP compute)", "Enterprise: Azure AD + AWS EC2 (most common pattern)"],
            ["Need BigQuery + AWS maturity", "Intentional Multi-Cloud (AWS + GCP)", "Analytics company: AWS for microservices, GCP BigQuery for analytics"],
            ["Multi-jurisdiction regulatory", "Multi-Cloud by geography", "Global bank: AWS India, Azure EU, GCP US"],
            ["Provider outage tolerance mandatory", "Active-Active Multi-Cloud", "Payment processor: zero downtime budget"],
            ["Acquisition brought different cloud", "Temporary Multi-Cloud → consolidate", "Post-merger: acquired company on Azure, parent on AWS"],
          ]}
        />
      </section>

      {/* ── CERTIFICATIONS ────────────────────────────────────────────────── */}
      <section id="certifications">
        <h2 style={S.h2}>Certifications and Career</h2>
        <ComparisonTable
          headers={["Certification", "Provider", "Multi-Cloud Relevance", "Who Should Take"]}
          rows={[
            ["AWS Solutions Architect Professional", "AWS", "High — advanced networking, DR, multi-account", "Senior cloud architects"],
            ["AZ-305: Azure Solutions Architect Expert", "Microsoft", "High — hybrid + Azure architecture", "Azure-primary architects"],
            ["Google Professional Cloud Architect", "Google", "High — GCP architecture, multi-region", "GCP-primary architects"],
            ["FinOps Certified Practitioner (FOCP)", "FinOps Foundation", "High — multi-cloud cost optimization", "Finance + engineering teams"],
            ["HashiCorp Terraform Associate/Professional", "HashiCorp", "High — IaC across all clouds", "Any engineer doing infra"],
            ["Certified Kubernetes Administrator (CKA)", "CNCF", "High — multi-cluster management", "Platform/SRE engineers"],
            ["CCNP Cloud / Enterprise", "Cisco", "High — SD-WAN, multi-cloud networking", "Network engineers"],
            ["Multi-Cloud Architecture (vendor-agnostic)", "Linux Foundation (LFCA)", "Medium — foundational concepts", "Beginners transitioning to cloud"],
          ]}
        />
        <p style={S.p}>
          Multi-cloud career path: single-cloud depth pehle (pick one: AWS, Azure, or GCP certifications). Phir second cloud add karo. Multi-cloud architect role = 5+ years single-cloud experience + networking depth + FinOps understanding. Rarest aur highest-paid profile in cloud industry.
        </p>
      </section>

      {/* ── ENTERPRISE BEST PRACTICES ─────────────────────────────────────── */}
      <section id="best-practices">
        <h2 style={S.h2}>Enterprise Best Practices</h2>
        <p style={S.p}>
          Yeh 20 recommendations real enterprise multi-cloud deployments se collected hain — har ek ek specific production failure ya lesson learned se aata hai.
        </p>
        <ComparisonTable
          headers={["#", "Best Practice", "Why It Matters"]}
          rows={[
            ["1", "Justify multi-cloud with quantifiable business driver before adopting", "Complexity cost is real — justify it upfront or you'll pay it later"],
            ["2", "Central IdP (Entra ID or Okta) from day 1 — retroactive federation = months", "Identity is hardest to retrofit; foundation must be laid first"],
            ["3", "IPAM tool (Netbox/InfoBlox) before allocating any CIDR range", "CIDR overlap discovered post-deploy = weeks of reIP work"],
            ["4", "Private fabric (Megaport/Equinix) for cross-cloud production traffic — not public VPN", "Internet VPN: variable latency, bandwidth ceiling, no SLA"],
            ["5", "BGP hold-timer minimum 20-30 seconds — never use 10 seconds", "Aggressive timers cause flaps on loaded links → intermittent outages"],
            ["6", "MSS clamping on VPN/SD-WAN appliances (1350 bytes recommended)", "Without clamping: large TCP transfers silently fail or hang"],
            ["7", "HashiCorp Vault for cross-cloud secrets — single API, dynamic credentials", "Three native KMS = three rotation schedules = three failure modes"],
            ["8", "Break-glass accounts per-cloud independent of central IdP — test quarterly", "IdP outage without break-glass = full management lockout"],
            ["9", "Unified CSPM (Wiz/Orca) not just per-cloud security tools", "Cross-cloud misconfigurations invisible to single-cloud tools"],
            ["10", "Certificate inventory + 90/60/30 day expiry alerts mandatory", "Cross-cloud cert expiry takes down ALL callers simultaneously"],
            ["11", "DNS TTL 60 seconds or less for production records — pre-lower before DR", "High TTL = slow failover regardless of automation quality"],
            ["12", "Synthetic monitoring: cross-cloud health checks every 5 minutes", "Know about outage before users — not after"],
            ["13", "Replication lag alert = RPO / 2. Check lag before initiating DR failover", "Stale data on failover = worse than extended downtime for some orgs"],
            ["14", "Container images replicated to each cloud's native registry — no cross-cloud pulls", "Cross-cloud image pull: egress cost + latency + single point of failure"],
            ["15", "Mandatory tags enforced via SCP/Azure Policy/GCP Org Policy — not just guidelines", "Voluntary tagging compliance below 60% in every org without enforcement"],
            ["16", "Reserved Instances/CUDs for baseline (60-70%), Spot for variable, On-demand for burst", "Without RIs on stable workloads: multi-cloud cost 2-3x higher than necessary"],
            ["17", "SLOs at user-facing boundary — not per-cloud internal metrics", "Per-cloud SLO can be green while user experience is broken"],
            ["18", "Terraform state backends separate per cloud — never single shared state for all clouds", "Single state file = blast radius of entire multi-cloud on one apply failure"],
            ["19", "OpenTelemetry W3C trace context end-to-end — cross-cloud distributed tracing", "Without trace ID propagation: cross-cloud latency root cause impossible to find"],
            ["20", "Quarterly multi-cloud DR drill — actual failover, not just planning review", "Untested multi-cloud DR = expensive fiction. Real failover always reveals gaps."],
          ]}
        />
      </section>

      {/* ── COMMON MISTAKES ───────────────────────────────────────────────── */}
      <section id="common-mistakes">
        <h2 style={S.h2}>Common Engineering Mistakes</h2>
        <p style={S.p}>
          Yeh mistakes engineers sabse zyada karte hain multi-cloud implementation mein — har ek real incident se documented hai.
        </p>
        <ComparisonTable
          headers={["#", "Mistake", "Consequence", "Correct Approach"]}
          rows={[
            ["1", "Overlapping CIDR ranges across clouds", "VPC peering/routing fails completely. Near-impossible to fix without downtime.", "IPAM tool upfront. AWS 10.1.x, Azure 10.2.x, GCP 10.3.x — non-overlapping from day 1."],
            ["2", "No central IdP — each cloud independent login", "Engineers maintain 3+ passwords. Offboarding incomplete. Audit trail fragmented.", "Entra ID or Okta as central IdP before first workload migrates."],
            ["3", "Hardcoded cloud credentials in application code", "Credential rotation breaks apps. Credentials leak via git history.", "Workload Identity everywhere. Vault for cross-cloud. Zero hardcoded credentials."],
            ["4", "No break-glass accounts per cloud", "Central IdP outage = full management lockout. Cannot respond to incidents.", "Per-cloud break-glass, vaulted, tested quarterly, monitored on use."],
            ["5", "Single Terraform state for all clouds", "One apply failure locks entire multi-cloud environment. State corruption catastrophic.", "Separate state backend per cloud per environment."],
            ["6", "No MSS clamping on VPN tunnels", "Large TCP transfers silently hang. Debugging takes days — looks like app bug.", "ip tcp adjust-mss 1350 on SD-WAN/VPN appliance immediately."],
            ["7", "Cross-cloud container image pulls", "Egress costs spike. Single cloud registry = cross-cloud dependency. Pull latency.", "Replicate images to ECR/ACR/GAR. Pull from local registry always."],
            ["8", "No SCIM provisioning — manual user creation in each cloud", "Offboarding incomplete — ex-employees retain access. Audit failures.", "SCIM from IdP to all clouds. Lifecycle automation mandatory."],
            ["9", "High DNS TTL (3600s) for production records", "DR failover takes 1+ hours despite perfect automation. Users without service.", "TTL 60 seconds for all production records. Lower weeks before DR."],
            ["10", "No replication lag monitoring before DR failover", "Failover with 45-minute data gap. Financial loss. Reconciliation weeks.", "Lag alert = RPO/2. Check lag before initiating failover."],
            ["11", "Voluntary tagging policy — no enforcement", "Cost attribution fails. FinOps impossible. Reserved capacity underutilized.", "SCP/Azure Policy/GCP Org Policy DENY untagged resource creation."],
            ["12", "Three separate CSPM tools, no unified view", "Cross-cloud attack paths invisible. Misconfiguration in cloud B not visible from cloud A console.", "Wiz or Orca — single agentless scan across all clouds."],
            ["13", "No alert fatigue management", "Alert volume triples. On-call team ignores alerts. Real incidents missed.", "Symptom-based alerting, error budget burn rate, monthly alert audit."],
            ["14", "Testing DR plan on paper only — never actual failover", "First real failover reveals 10+ gaps. Extended outage while debugging.", "Quarterly actual failover drill. Document learnings. Fix before next drill."],
            ["15", "Reserved Instances only on primary cloud, not secondary", "Secondary cloud workloads at on-demand pricing. Cost 2-3x higher.", "RI coverage per cloud independently optimized. Unified tool recommends."],
            ["16", "No certificate inventory for cross-cloud services", "Cert expiry discovered by external callers, not by cert owner. All cross-cloud calls fail.", "Venafi/Datadog SSL checks. Escalating expiry alerts. Auto-renewal where possible."],
            ["17", "OTEL instrumentation without W3C trace propagation", "Distributed tracing stops at cloud boundary. Cross-cloud latency issues unresolvable.", "Instrument all services with OTEL. Ensure traceparent header propagation end-to-end."],
            ["18", "Assuming cloud provider compliance = your workload compliant", "Audit failure. AWS PCI-compliant, but your app still needs separate assessment.", "Shared responsibility model. Your controls + cloud controls = combined posture."],
            ["19", "Asymmetric routing (different paths in/out)", "Stateful firewall drops return traffic. Connection failures, hard to debug.", "Same BGP local-preference on both ends. Traceroute from both sides. Symmetric routing verify."],
            ["20", "No egress cost architecture review", "Data-heavy workloads cross-cloud generate surprise $10,000+ monthly bills.", "Architecture review: minimize cross-cloud data movement. Analytics at data source."],
          ]}
        />
      </section>

      {/* ── TROUBLESHOOTING PLAYBOOK ───────────────────────────────────────── */}
      <section id="troubleshooting-playbook">
        <h2 style={S.h2}>Troubleshooting Playbook</h2>
        <p style={S.p}>
          Multi-cloud incidents mein sabse valuable skill hai systematic isolation — "which layer, which cloud, which component?" Yeh playbook woh framework hai.
        </p>

        <h3 style={S.h3}>Network Troubleshooting</h3>
        <ol style={S.ol}>
          <li><strong>Can machine A ping machine B private IP across clouds?</strong> No → routing issue. Check route tables both sides. BGP routes advertised? VPN/fabric up?</li>
          <li><strong>VPN/fabric status:</strong> AWS Site-to-Site VPN: both tunnels UP? Azure VPN GW: BGP status "Connected"? SD-WAN console: path health green?</li>
          <li><strong>BGP routes:</strong> AWS: <code>aws ec2 describe-route-tables --filter Name=route.state,Values=active</code>. Route to remote CIDR present? Correct next-hop?</li>
          <li><strong>Firewall/SG rules:</strong> AWS SG inbound: allows source CIDR + protocol + port? Azure NSG effective rules on target NIC? GCP FW rule: allows ingress from source IP?</li>
          <li><strong>TCP works but large transfers fail:</strong> MTU/MSS issue. Test: <code>ping -M do -s 1400 TARGET_IP</code> (Linux). Reduce -s until ping succeeds. Set MSS to that value minus 40.</li>
          <li><strong>Asymmetric routing suspect:</strong> Traceroute from A→B and B→A. Same number of hops? Same path? Firewall session table: stateful entry for connection?</li>
          <li><strong>BGP flap:</strong> BGP neighbor state history. Hold-timer too low? BFD misconfig? ISP link quality? Increase hold-timer, enable BFD, check physical link.</li>
        </ol>

        <h3 style={S.h3}>DNS Troubleshooting</h3>
        <ol style={S.ol}>
          <li><strong>From AWS EC2, resolve Azure private hostname:</strong> <code>nslookup service.azure.internal</code>. Returns? Private IP (correct) or public IP (split-brain) or NXDOMAIN (forwarder missing)?</li>
          <li><strong>Check DNS resolver on instance:</strong> <code>cat /etc/resolv.conf</code> — which DNS server is used? Is it the VPC resolver (169.254.169.253)?</li>
          <li><strong>Route 53 Resolver rules:</strong> AWS console → Route 53 → Resolver → Rules. Rule for Azure domain pointing to correct forwarder IP? Forwarder IP reachable?</li>
          <li><strong>Azure DNS Private Resolver:</strong> Inbound endpoint IP reachable from AWS via VPN? NSG on resolver subnet: allows UDP/TCP 53 from AWS CIDR?</li>
          <li><strong>Split-brain investigation:</strong> Compare internal vs external resolution: <code>dig @8.8.8.8 api.company.com</code> vs <code>dig @169.254.169.253 api.company.com</code>. Different? Split-brain confirmed.</li>
          <li><strong>DNS cache:</strong> Recent change not propagating? Flush: Linux <code>sudo systemd-resolve --flush-caches</code>. Windows <code>ipconfig /flushdns</code>. TTL check: <code>dig +nocmd api.company.com ANY +noall +answer</code>.</li>
        </ol>

        <h3 style={S.h3}>IAM Troubleshooting</h3>
        <ol style={S.ol}>
          <li><strong>403/401 from cloud API:</strong> Which identity is making the call? AWS: CloudTrail → filter by errorCode AccessDenied. Check principal ARN. What action was denied? What resource?</li>
          <li><strong>AWS IAM Policy Simulator:</strong> <code>aws iam simulate-principal-policy</code> — test if principal can perform action on resource. Shows allow/deny and which policy is responsible.</li>
          <li><strong>Azure RBAC:</strong> Portal → Resource → Access Control (IAM) → Check Access → enter principal name → shows role assignments and effective permissions. Azure Activity Log: denied operation entries.</li>
          <li><strong>GCP IAM troubleshooter:</strong> Console → IAM → Policy Troubleshooter. Enter principal, resource, permission — shows allow/deny reason and which binding caused it.</li>
          <li><strong>Service account issue:</strong> Pod not getting permissions? Check: K8s ServiceAccount → IAM annotation (IRSA/Workload Identity) correct? Token file mounted? <code>aws sts get-caller-identity</code> inside pod shows which role assumed.</li>
          <li><strong>SAML federation failure:</strong> SAML tracer browser extension (Firefox/Chrome) — capture SAML assertion. Decode base64 → check: Issuer matches? NameID format? Groups attribute present? AttributeStatement correct?</li>
        </ol>

        <h3 style={S.h3}>Storage Troubleshooting</h3>
        <ol style={S.ol}>
          <li><strong>Cross-cloud replication not working:</strong> rclone verbose mode: <code>rclone sync -vv s3:bucket gs:bucket</code>. Error message: permissions? Network? Checksum mismatch?</li>
          <li><strong>Object missing on destination:</strong> Source object exists? Replication rule active? IAM permissions for replication role? Check replication metrics: objects replicated vs failed.</li>
          <li><strong>Database replication lag high:</strong> CDC tool (Striim/Debezium) metrics: lag in seconds/records. Network latency cross-cloud elevated? CDC tool memory/CPU saturated? Source DB log retention sufficient?</li>
          <li><strong>Backup restore fails:</strong> Checksum validation on backup file before restore. Storage Transfer checksum report. Immutable backup: access from correct account (Object Lock may block certain principals).</li>
          <li><strong>Egress cost spike:</strong> VPC Flow Logs (AWS) or NSG Flow Logs (Azure) or GCP VPC Flow Logs — identify top talkers by bytes. Unexpected cross-cloud traffic source? Which service generating traffic?</li>
        </ol>

        <h3 style={S.h3}>Kubernetes Troubleshooting</h3>
        <ol style={S.ol}>
          <li><strong>Pod cannot reach cross-cloud service:</strong> DNS resolution from pod: <code>kubectl exec -it pod -- nslookup service.other-cloud.internal</code>. Network policy: <code>kubectl get networkpolicies</code> — egress allowed? Cross-cluster: Istio ServiceEntry configured?</li>
          <li><strong>Image pull failure:</strong> <code>kubectl describe pod POD_NAME</code> → Events: ImagePullBackOff. Registry accessible from cluster? Registry credentials (imagePullSecret) configured? Image exists in local registry (not cross-cloud pull required)?</li>
          <li><strong>ArgoCD sync failing:</strong> ArgoCD UI → Application → Sync Status. Error: connection refused? → API server issue. Resource diff? → drift detected. RBAC: ArgoCD service account permissions on target cluster?</li>
          <li><strong>Cluster API server unreachable:</strong> Managed K8s: provider console status. Self-managed: etcd health? Control plane VMs running? API server log: <code>journalctl -u kube-apiserver</code>.</li>
          <li><strong>SPIFFE/SPIRE identity issue:</strong> <code>spiffe-helper</code> logs: SVID received? SPIRE server connection? Trust bundle updated? Certificate expiry?</li>
        </ol>

        <h3 style={S.h3}>Monitoring Troubleshooting</h3>
        <ol style={S.ol}>
          <li><strong>Metrics not appearing in Grafana:</strong> Prometheus target UP? <code>/targets</code> page. Scrape errors? OTEL Collector pipeline: receiver → processor → exporter. Exporter errors in collector logs?</li>
          <li><strong>Traces not linking cross-cloud:</strong> traceparent header propagated? <code>curl -v</code> — inspect headers. OTEL SDK instrumentation on all services? Sampling rate: 100% for debugging, reduce for production.</li>
          <li><strong>Alert not firing when expected:</strong> AlertManager: <code>amtool alert query</code>. Rule file syntax: <code>promtool check rules alert_rules.yml</code>. Inhibition rules suppressing? Silence configured?</li>
          <li><strong>Log not appearing in SIEM:</strong> Fluent Bit tail plugin: file accessible? Permissions? Output plugin: SIEM endpoint reachable? TLS cert valid? SIEM ingestion rate limit hit?</li>
        </ol>
      </section>

      {/* ── KEY TAKEAWAYS ──────────────────────────────────────────────────── */}
      <section id="key-takeaways">
        <h2 style={S.h2}>Key Takeaways</h2>
        <ul style={S.ul}>
          <li><strong>Multi-Cloud ≠ Hybrid Cloud:</strong> Multi-cloud = multiple public clouds. Hybrid = on-prem + cloud. Both simultaneously possible.</li>
          <li><strong>Providers directly connected nahi hain:</strong> Cross-cloud traffic private fabric (Megaport/Equinix) ya VPN se — public Internet nahi for production.</li>
          <li><strong>CIDR planning upfront mandatory:</strong> AWS 10.1.x, Azure 10.2.x, GCP 10.3.x — overlapping = disaster. IPAM tool use karo.</li>
          <li><strong>Central IdP from day 1:</strong> Entra ID ya Okta → all clouds federate. SCIM provisioning. Break-glass accounts independently per cloud.</li>
          <li><strong>HashiCorp Vault for secrets:</strong> Three cloud KMS = three operational burdens. Vault = one API, dynamic credentials, all clouds.</li>
          <li><strong>Cross-cloud DB replication native nahi hai:</strong> CDC tools (Striim, Attunity, pglogical) needed. Lag monitoring = hidden RPO risk.</li>
          <li><strong>Data gravity matters:</strong> Large datasets move karna expensive. Compute moves to data, not opposite. Architecture accordingly design karo.</li>
          <li><strong>Terraform multi-cloud standard:</strong> Same tool, different providers. Cross-provider references via remote state. Security scanning (tfsec/Checkov) in CI/CD.</li>
          <li><strong>FinOps complexity 3x:</strong> Three billing systems, three pricing models. Unified tool (CloudHealth/Apptio) mandatory. Tag everything.</li>
          <li><strong>OpenTelemetry for observability:</strong> W3C trace context = cross-cloud distributed tracing. Single SIEM = cross-cloud threat correlation.</li>
          <li><strong>DNS TTL 60 seconds:</strong> Pre-lower production DNS TTL. High TTL = slow failover. Most impactful single change for DR readiness.</li>
          <li><strong>Start single, earn multi-cloud:</strong> Complexity justified karo before adoption. Single cloud mastered → second cloud → multi-cloud governance.</li>
        </ul>
      </section>

      {/* ── FAQ ────────────────────────────────────────────────────────────── */}
      <section id="faq" style={{ marginTop: "3rem" }}>
        <h2 style={S.h2}>Frequently Asked Questions</h2>
        {multiCloudContent.faq.map((item, i) => (
          <div key={i} style={{ marginBottom: "2rem" }}>
            <h3 style={{ ...S.h3, color: "#111827" }}>{item.question}</h3>
            <p style={S.p}>{item.answer}</p>
          </div>
        ))}
      </section>

    </article>
  );
}
