export const awsFaq = [
  {
    question: "What is the difference between an AWS Region and an Availability Zone?",
    answer:
      "A Region is an independent geographic location (e.g., ap-south-1 Mumbai). Every Region has multiple Availability Zones (AZs). An AZ is a logically isolated failure domain — separate power, cooling and connectivity — physically separated but within low-latency distance. An AZ does not guarantee a single physical building. In a multi-AZ design, the impact of a single AZ failure stays localized; a single Region failure is a wide-area event.",
  },
  {
    question: "What is the actual difference between a public subnet and a private subnet?",
    answer:
      "It is primarily a routing difference — the subnet-level designation depends more on the route table than on IP address assignment. A public subnet is one whose route table has a 0.0.0.0/0 route pointing to the Internet Gateway (IGW). A private subnet has no IGW route — a NAT Gateway is used for outbound Internet access. Public IP assignment and routing are separate concepts; having a public IP alone does not give Internet connectivity if the IGW route is absent from the route table.",
  },
  {
    question: "What is the difference between a Security Group and a Network ACL?",
    answer:
      "A Security Group is an instance-level, stateful firewall — return traffic for an allowed connection is permitted automatically; it has only ALLOW rules. A Network ACL is subnet-level and stateless — both inbound and outbound must be explicitly allowed, including ephemeral return ports; both ALLOW and DENY rules are possible; rules are evaluated in numbered order. Even if you allow an application on the Security Group, you must check both inbound and outbound on the NACL — this is a common mistake in troubleshooting.",
  },
  {
    question: "What does a NAT Gateway do and how is it different from an Internet Gateway?",
    answer:
      "An Internet Gateway (IGW) provides bidirectional Internet connectivity for public-facing resources — inbound and outbound. A NAT Gateway gives private subnet instances outbound Internet access without making them directly reachable from the Internet. A NAT Gateway is for outbound-initiated traffic — unsolicited inbound connections from the Internet to private instances are not possible through a NAT Gateway. The NAT Gateway itself is placed in a public subnet and goes out through the IGW.",
  },
  {
    question: "What is the difference between stopping and terminating an EC2 instance?",
    answer:
      "Stop: the instance halts, EBS volumes persist, billing stops for compute (storage is billed separately). On restart the instance may come up on a different physical host — instance store data is lost on stop. Terminate: the instance is permanently deleted; the root EBS volume is deleted by default (configurable). Reboot: the same instance restarts, generally on the same physical host, and instance store data survives. Instance store and EBS are not the same — instance store is ephemeral, EBS is persistent.",
  },
  {
    question: "Does a Multi-AZ deployment automatically guarantee high availability?",
    answer:
      "Not at the infrastructure level alone — application design matters too. Spread resources (instances, LB targets, RDS) across multiple AZs, but design the application to be stateless or to use shared state. Database Multi-AZ failover is DNS-based — the application must handle reconnects. Auto Scaling health replacement + LB health checks + multi-AZ targets — together they create HA. Just having resources in multiple AZs is not enough if there is a single point of failure at the application level.",
  },
  {
    question: "Should I choose AWS Direct Connect or Site-to-Site VPN?",
    answer:
      "VPN: IPsec tunnel over the Internet, encrypted, lower cost, fast setup, variable latency. Direct Connect: dedicated private circuit, predictable latency, higher bandwidth, NOT encrypted by default — a separate layer (such as IPsec) has to be configured for encryption. Moderate bandwidth + acceptable latency variability + security via encryption = VPN is suitable. High bandwidth + consistent latency + large data transfer = Direct Connect is better. Production environments often use Direct Connect as primary + VPN as backup.",
  },
  {
    question: "What is the difference between CloudWatch and CloudTrail?",
    answer:
      "CloudWatch is an operational observability platform — metrics (CPU, network, custom), logs (application, system), alarms and dashboards. How is the system performing right now? CloudTrail is the API activity audit trail in an AWS account — who made which API call, when, and from where. Security investigation, compliance, account activity history. Do not mix the two: use a CloudWatch alarm when EC2 CPU is high; use CloudTrail to track an unauthorized API call.",
  },
];
