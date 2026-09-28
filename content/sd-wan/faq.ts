export const sdWanFaq = [
  {
    question: "What does SD-WAN replace — does MPLS go away?",
    answer:
      "No. SD-WAN is an overlay that operates on top of the available transports. MPLS, Internet, LTE — all are underlay transports. SD-WAN does not replace them; it adds a policy and path selection layer on top of them. MPLS is still useful for quality-sensitive applications where latency predictability is important.",
  },
  {
    question: "The tunnel is up, so traffic is fine — is this thinking correct?",
    answer:
      "Completely wrong. Tunnel UP only establishes that a logical path exists between SD-WAN nodes. Latency, jitter, and packet loss can still be high. The application SLA can fail even with the tunnel UP. Tunnel state and path quality are two separate metrics — check both.",
  },
  {
    question: "Does all traffic stop when the controller goes down?",
    answer:
      "Generally no, but it depends on the platform. The data plane typically continues forwarding using already-distributed routing and policy state. But management functions (new policy push, configuration changes, zero-touch provisioning, monitoring) become unavailable. Understand the exact behavior of your platform — do not assume.",
  },
  {
    question: "Does an active-active dual link mean a 50/50 traffic split?",
    answer:
      "No. Traffic distribution depends on application policy and path quality. Voice traffic may go over MPLS, web traffic over the Internet. There is no equal split by default — it is policy-driven. Actual utilization is determined by per-application policy.",
  },
  {
    question: "What is the difference between a brownout and a blackout?",
    answer:
      "Blackout: the path is completely unavailable — link down, circuit failure. It is detected quickly. Brownout: the path is technically reachable but its quality has degraded — high latency, high jitter, or high packet loss. Traditional routing treats a brownout as 'link up' and keeps sending traffic. SD-WAN continuously measures path quality and can steer traffic when a brownout is detected.",
  },
  {
    question: "Does SD-WAN replace the Firewall?",
    answer:
      "Not automatically. SD-WAN provides networking features — path selection, overlay, traffic steering. Security needs a dedicated NGFW or an integrated security platform. Some vendors offer integrated SD-WAN + security platforms, but that is a deliberate architectural choice, not a default assumption.",
  },
  {
    question: "How fast is failover and do sessions survive?",
    answer:
      "Failover speed depends on detection time + switchover time — probe interval, failure type, and hold timers all matter. A physical link failure can be detected faster than quality degradation, but detection depends on failure type, probe configuration, timers and platform behavior. Session continuity is not guaranteed — some TCP sessions may reset during path change. Both platform capabilities and application type matter.",
  },
  {
    question: "Does Direct Internet Access (DIA) mean better for everyone?",
    answer:
      "Not for every situation. DIA reduces latency for SaaS and cloud applications and saves DC backhaul cost. But security controls are necessary locally — branch-level Firewall or cloud-delivered security. Private/sensitive traffic may still need to be routed through the DC. Security posture and application requirements decide the architecture.",
  },
];
