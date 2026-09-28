export const gcpFaq = [
  {
    question: "What is the difference between a GCP Region and a Zone, and how does it compare with AWS/Azure?",
    answer:
      "A GCP Region is a geographic location (e.g., asia-south1 Mumbai) that contains multiple Zones. A Zone is an isolated failure domain — separate power, cooling, network. In AWS, Regions contain Availability Zones (same concept). In Azure, Regions contain Availability Zones + Region Pairs. Key GCP difference: typically 3 Zones per Region, named a/b/c. GCP has no AWS-style 'Region Pair' concept — the engineer chooses the DR Region themselves. Single Zone failure → only that Zone affected; Regional failure rare but possible.",
  },
  {
    question: "What is the biggest architectural difference between a GCP VPC and an AWS VPC?",
    answer:
      "The biggest difference: a GCP VPC is GLOBAL — a single VPC spans multiple Regions automatically. An AWS VPC is Region-specific (one VPC covers only one Region). In GCP, subnets are regional (one subnet belongs to one Region, but spans multiple Zones in that Region). In AWS, subnets are AZ-specific. GCP does not need the complexity of VPC Peering or Transit Gateway just for single-VPC multi-region connectivity — but if multiple VPCs are needed, VPC Peering or Shared VPC is used. GCP Firewall Rules are at the VPC level, not the subnet level (unlike AWS NACLs).",
  },
  {
    question: "What are the primary differences between GCP IAM and AWS IAM?",
    answer:
      "In GCP IAM, permissions are based on the Resource Hierarchy — Organization → Folder → Project → Resource. Roles are inherited downward. In AWS IAM, Accounts are managed in a flat structure — Organizations add SCPs. GCP has three role types: Basic (primitive, avoid in prod), Predefined (service-specific), Custom. GCP Service Accounts are the equivalent of AWS IAM Roles — for workloads, not for humans. Workload Identity Federation is the equivalent of AWS IAM Roles for Service Accounts — external workloads can access GCP resources without a Service Account key.",
  },
  {
    question: "What is the difference between Preemptible VMs and Spot VMs in GCP?",
    answer:
      "Preemptible VMs: GCP's original low-cost option — fixed 24-hour maximum runtime, 30-second shutdown notice, Google can reclaim them at any time. Spot VMs: newer model — no fixed 24-hour limit (run as long as capacity is available), same 30-second notice, same interruption behavior but potentially longer runtime. AWS Spot = 2-minute notice. GCP Spot = 30-second notice — design accordingly. Both are suited for fault-tolerant, stateless, batch workloads. Cost savings: up to 60-91% vs on-demand. Important: the application must handle graceful shutdown within 30 seconds.",
  },
  {
    question: "Which should you choose — Cloud Interconnect or Cloud VPN?",
    answer:
      "Cloud VPN: IPsec tunnel over the Internet, encrypted by default, lower cost, variable latency, fast setup. Dedicated Interconnect: dedicated private circuit directly to Google, NOT encrypted by default, 10Gbps or 100Gbps, predictable latency, higher cost. Partner Interconnect: lower bandwidth options (50Mbps–50Gbps) via connectivity providers — good for lower bandwidth needs. Choice: variable latency OK, moderate bandwidth → Cloud VPN. High bandwidth, consistent latency, large data transfer → Dedicated Interconnect. Medium bandwidth → Partner Interconnect. Cloud Interconnect HA configuration: dual connections in different metro facilities for a 99.99% SLA.",
  },
  {
    question: "What is the difference between Sustained Use Discounts and Committed Use Discounts?",
    answer:
      "Sustained Use Discounts (SUDs): automatic, no commitment. The more a VM runs in a month, the bigger the discount — run it 25% of the month and you get ~0%, run it 100% and you get ~30% discount. No action required. AWS and Azure have no equivalent — a unique GCP advantage. Committed Use Discounts (CUDs): 1-year or 3-year commitment for specific vCPU/memory — up to 57% (1yr) or 70% (3yr). Both resource-based and spend-based are available. Equivalent of AWS Reserved Instances. Engineering decision: predictable baseline workloads → CUDs maximize savings. Variable workloads → SUDs give automatic protection. The two can be combined.",
  },
  {
    question: "Which should you choose — GKE Autopilot or Standard mode?",
    answer:
      "GKE Standard: Full control over node configuration, machine types, OS, node pools. You manage nodes (scaling, upgrades, patching optional). Useful when: specific hardware is needed (GPU, high memory), custom node configs, existing K8s expertise. GKE Autopilot: Google manages nodes completely — you only deploy pods. Node provisioning, scaling and security are automatic. Billing per pod (CPU/memory requested), not per node. Useful when: simplicity is a priority, variable workloads, per-pod billing is beneficial. Limitation: some privileged workloads and DaemonSets are restricted. For new GKE users and most production workloads: Autopilot recommended — less operational overhead.",
  },
  {
    question: "What are VPC Service Controls and when should you use them?",
    answer:
      "VPC Service Controls define a security perimeter around GCP managed services (Cloud Storage, BigQuery, Cloud SQL) — preventing data exfiltration. Even if IAM allows access, VPC Service Controls can deny access from outside the perimeter. Use case: regulated industries (banking, healthcare) where keeping sensitive data within a specific network boundary is a compliance requirement. Example: BigQuery accessible only from the corporate VPC, not from the Internet or unknown networks — even with valid credentials. In AWS a comparable concept is approximated with a combination of VPC Endpoints + S3 Bucket Policies, but the centralized perimeter concept is GCP-specific.",
  },
];
