export const multiCloudFaq = [
  {
    question: "What is the fundamental difference between Multi-Cloud and Hybrid Cloud?",
    answer:
      "Multi-Cloud = multiple public cloud providers simultaneously (AWS + Azure, AWS + GCP, or all three). On-premises infrastructure is optional — the focus is on using multiple public clouds. Hybrid Cloud = on-premises infrastructure + at least one public cloud, tightly integrated. On-prem is the defining characteristic of hybrid. In practice: if a company runs workloads on AWS, M365/AD on Azure and analytics on GCP — that is multi-cloud, even without any on-prem. If the same company also runs an on-prem data center, it is hybrid-multi-cloud. Multi-cloud engineering challenge: cross-cloud connectivity, unified identity, consistent governance. Hybrid engineering challenge: on-prem to cloud connectivity, legacy application integration.",
  },
  {
    question: "What is the strongest business case for adopting Multi-Cloud?",
    answer:
      "The three strongest business cases: (1) Vendor lock-in avoidance — being 100% dependent on one provider means losing negotiating power, and exit costs become high. Large enterprises deliberately maintain 2 providers for leverage. (2) Best-of-breed services — AWS database services are mature, Azure AD/M365 integration is the best, GCP BigQuery/AI/ML is unmatched. Different workloads run optimally on different providers. (3) Regulatory/geographic requirements — in some geographies a specific provider's region is not available, or the regulator may favour a specific provider. Real example: an Indian BFSI company uses the India region (AWS Mumbai) as primary for RBI, Azure West Europe for EU GDPR, and GCP for ML workloads — all three providers in one architecture.",
  },
  {
    question: "How does cross-cloud networking work — are the providers directly connected?",
    answer:
      "Cloud providers are not interconnected by default — traffic passes over the public Internet unless you explicitly connect them. Options for cross-cloud connectivity: (1) Site-to-Site VPN — AWS VGW ↔ Azure VPN Gateway, or AWS ↔ GCP HA VPN. Encrypted, over the Internet, variable latency, lower cost. (2) SD-WAN overlay — cross-cloud private fabric (Megaport, Equinix Fabric). Traffic travels over the cloud backbone or private exchanges. Better performance, higher cost. (3) Colocation fabric — terminate AWS Direct Connect + Azure ExpressRoute + GCP Interconnect in the same colo facility and connect the providers with a cross-connect (patch cable) — minimal latency, maximum control, maximum cost. Production recommendation: SD-WAN overlay or colocation cross-connect for production cross-cloud traffic. VPN for dev/test or low-bandwidth scenarios.",
  },
  {
    question: "How is Kubernetes federation managed in Multi-Cloud?",
    answer:
      "Primary approaches to multi-cluster Kubernetes management: (1) Anthos (GCP) — GKE-style managed clusters on AWS/Azure/on-prem as well. Unified policy, service mesh, config management. GCP-centric but genuinely multi-cloud. (2) Red Hat OpenShift — vendor-neutral, runs on AWS (ROSA), Azure (ARO), GCP, on-prem. Advanced Cluster Management (RHACM) manages multiple clusters. (3) Rancher — open-source, multi-cloud multi-cluster management. Downstream clusters: EKS, AKS, GKE or custom. (4) Cluster API — K8s-native cluster lifecycle management. Cross-cloud consistency. (5) ArgoCD + ApplicationSets — consistent deployment to multiple clusters through GitOps. Selection: existing GCP investment → Anthos. OpenShift already in place → RHACM. Vendor-neutral preference → Rancher or Cluster API.",
  },
  {
    question: "How do you implement federated identity in Multi-Cloud — one login for all clouds?",
    answer:
      "Establish a central Identity Provider (IdP) — all cloud providers federate with that IdP. The two primary approaches: (1) Microsoft Entra ID as central IdP — AWS IAM Identity Center federates with Entra ID via SAML, GCP Cloud Identity via SAML with Entra ID. Engineers access AWS Console + GCP Console + Azure Portal with a single Microsoft login. Best for Microsoft-heavy orgs. (2) Okta/Ping as neutral IdP — vendor-neutral, all three clouds connect via SAML/OIDC. Preferred by large enterprises (avoids Microsoft dependency for identity). IAM mapping is important: Entra ID groups → AWS IAM roles (via Permission Sets in Identity Center). GCP IAM roles mapped via group membership. Consistent naming: AWS PowerUserAccess = Azure Contributor = GCP Editor — map these carefully.",
  },
  {
    question: "How do you handle secret management in Multi-Cloud when each has a separate KMS?",
    answer:
      "Every cloud has its own KMS — AWS KMS, Azure Key Vault, GCP Cloud KMS — and they are not interoperable. Options for cross-cloud secret management: (1) HashiCorp Vault — cloud-agnostic, on-prem or cloud-hosted. Secrets are fetched from all clouds through one consistent API. Dynamic secrets: generates AWS credentials on-demand, which expire automatically. Best for multi-cloud consistency. (2) Provider-native + sync — AWS Secrets Manager → Azure Key Vault sync (custom Lambda/Function or third-party). Adds complexity and drift risk. (3) External Secrets Operator (Kubernetes) — pull secrets from the cloud provider into K8s and create a consistent Kubernetes Secret object. Recommendation: HashiCorp Vault for enterprise multi-cloud. Cloud-native tools if the architecture is single-primary-cloud-with-secondary.",
  },
  {
    question: "Multi-Cloud FinOps — how do you implement cost visibility and chargeback?",
    answer:
      "Cost management in multi-cloud is 3x more complex than in a single cloud — three billing systems, different cost models, different pricing terminology. Steps: (1) Tagging standardization — enforce the same tag schema across all providers (environment, team, application, cost-center). Enforce mandatory tag rules via AWS SCPs, Azure Policy, GCP Org Policies. (2) Unified cost aggregation — CloudHealth by VMware, Apptio Cloudability, Spot.io, or Kubecost (for K8s). These tools show the cost of all three clouds on one dashboard. (3) Showback first — show business units their cross-cloud spend (report only). This builds awareness. (4) Chargeback later — actual billing per business unit. Internal billing system + cross-cloud cost allocation. (5) Reserved capacity optimization — manage AWS RIs + Azure RVMs + GCP CUDs independently. Unified tools recommended across all three. Common mistake: optimizing one cloud while ignoring the others — total spend gets worse.",
  },
  {
    question: "What is the most complex part of Multi-Cloud disaster recovery?",
    answer:
      "Data consistency and split-brain are the most complex challenges in active-active multi-cloud DR. If the primary database is on AWS us-east-1 and the DR replica is on Azure West Europe — at failover time: (1) DNS cutover: lowering TTL in advance is mandatory. With a high TTL, failover stays stuck for hours. (2) Database promotion: promote the read replica to standalone — an irreversible step if the primary is recovering at the same time. Split-brain risk. (3) Application consistency: stateful sessions, cache, message queues — all may be invalidated. (4) Cross-cloud replication lag: AWS RDS → Azure SQL replication is not native — third-party tools (Attunity, Striim, pglogical) are needed. Lag monitoring is mandatory. Recommendation: for multi-cloud DR, the DNS failover + read replica promotion pattern is the most tested. Use an active-active globally distributed multi-cloud database (CockroachDB, Spanner) if budget allows — it eliminates the split-brain problem.",
  },
];
