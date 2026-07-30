"use client";
export default function ContainersServerlessDiagram() {
  return (
    <svg viewBox="0 0 820 360" xmlns="http://www.w3.org/2000/svg" role="img" aria-labelledby="cs-title">
      <title id="cs-title">AWS Containers and Serverless: ECS, EKS, Fargate, Lambda</title>
      <rect width="820" height="360" fill="#ffffff" />
      <text x="410" y="22" fontFamily="Arial,sans-serif" fontSize="12" fontWeight="700" fill="#0f172a" textAnchor="middle">CONTAINERS AND SERVERLESS ON AWS</text>

      {/* VM vs Container vs Serverless header */}
      <text x="20" y="42" fontFamily="Arial,sans-serif" fontSize="9" fontWeight="700" fill="#374151">ABSTRACTION LEVELS (manage less → pay per use):</text>

      {[
        { x: 20,  title: "EC2 (IaaS)", you: "OS, runtime, app", aws: "Hardware, hypervisor", color: "#475569", bg: "#f8fafc" },
        { x: 215, title: "ECS on EC2", you: "App containers, ECS tasks", aws: "EC2 + container orchestration", color: "#2563EB", bg: "#eff6ff" },
        { x: 410, title: "ECS/EKS Fargate", you: "Container image, task config", aws: "All infra, scaling", color: "#7c3aed", bg: "#faf5ff" },
        { x: 605, title: "Lambda (Serverless)", you: "Function code only", aws: "Everything else", color: "#16a34a", bg: "#f0fdf4" },
      ].map(({ x, title, you, aws, color, bg }) => (
        <g key={x}>
          <rect x={x} y={50} width={185} height={100} rx="6" fill={bg} stroke={color} strokeWidth="1.5" />
          <rect x={x} y={50} width={185} height={24} rx="5" fill={color} />
          <text x={x+92} y={66} fontFamily="Arial,sans-serif" fontSize="9.5" fontWeight="700" fill="#ffffff" textAnchor="middle">{title}</text>
          <text x={x+10} y={88} fontFamily="Arial,sans-serif" fontSize="8" fill="#374151">You manage:</text>
          <text x={x+10} y={102} fontFamily="Arial,sans-serif" fontSize="7.5" fill={color}>{you}</text>
          <text x={x+10} y={120} fontFamily="Arial,sans-serif" fontSize="8" fill="#374151">AWS manages:</text>
          <text x={x+10} y={134} fontFamily="Arial,sans-serif" fontSize="7.5" fill="#6b7280">{aws}</text>
        </g>
      ))}

      {/* ECS */}
      <rect x="20" y="164" width="375" height="168" rx="8" fill="#eff6ff" stroke="#2563EB" strokeWidth="2" />
      <text x="207" y="182" fontFamily="Arial,sans-serif" fontSize="11" fontWeight="700" fill="#1e40af" textAnchor="middle">AMAZON ECS (Elastic Container Service)</text>
      <rect x="36" y="192" width="343" height="32" rx="4" fill="#dbeafe" />
      <text x="207" y="207" fontFamily="Arial,sans-serif" fontSize="8.5" fill="#1e40af" textAnchor="middle">Task Definition → Service → Cluster → Task (running container)</text>
      <text x="207" y="219" fontFamily="Arial,sans-serif" fontSize="8" fill="#1d4ed8" textAnchor="middle">Service maintains desired task count; integrates with ALB for traffic routing</text>
      <rect x="36" y="232" width="163" height="36" rx="4" fill="#1e40af" />
      <text x="117" y="248" fontFamily="Arial,sans-serif" fontSize="8.5" fontWeight="700" fill="#ffffff" textAnchor="middle">EC2 Launch Type</text>
      <text x="117" y="262" fontFamily="Arial,sans-serif" fontSize="7.5" fill="#bfdbfe" textAnchor="middle">Manage EC2 + containers</text>
      <rect x="207" y="232" width="163" height="36" rx="4" fill="#7c3aed" />
      <text x="289" y="248" fontFamily="Arial,sans-serif" fontSize="8.5" fontWeight="700" fill="#ffffff" textAnchor="middle">Fargate Launch Type</text>
      <text x="289" y="262" fontFamily="Arial,sans-serif" fontSize="7.5" fill="#e9d5ff" textAnchor="middle">Serverless containers — no EC2</text>
      <rect x="36" y="276" width="343" height="48" rx="4" fill="#bfdbfe" />
      <text x="207" y="292" fontFamily="Arial,sans-serif" fontSize="8" fill="#1e40af" textAnchor="middle">Networking: awsvpc mode = each task gets own ENI, own SG, own IP</text>
      <text x="207" y="306" fontFamily="Arial,sans-serif" fontSize="8" fill="#1e40af" textAnchor="middle">IAM task role = container-level IAM, not EC2 host role</text>
      <text x="207" y="320" fontFamily="Arial,sans-serif" fontSize="8" fill="#1e40af" textAnchor="middle">EKS (Kubernetes) = same but Kubernetes API — more complex, more portable</text>

      {/* Lambda */}
      <rect x="425" y="164" width="375" height="168" rx="8" fill="#f0fdf4" stroke="#16a34a" strokeWidth="2" />
      <text x="612" y="182" fontFamily="Arial,sans-serif" fontSize="11" fontWeight="700" fill="#14532d" textAnchor="middle">AWS LAMBDA (Serverless)</text>
      <rect x="441" y="192" width="343" height="32" rx="4" fill="#dcfce7" />
      <text x="612" y="207" fontFamily="Arial,sans-serif" fontSize="8.5" fill="#14532d" textAnchor="middle">Event trigger → Lambda invoked → code executes → result returned/stored</text>
      <text x="612" y="219" fontFamily="Arial,sans-serif" fontSize="8" fill="#15803d" textAnchor="middle">Billed per request + execution duration (ms). Scale to zero.</text>
      <rect x="441" y="232" width="163" height="60" rx="4" fill="#16a34a" />
      <text x="522" y="250" fontFamily="Arial,sans-serif" fontSize="8.5" fontWeight="700" fill="#ffffff" textAnchor="middle">Execution Model:</text>
      <text x="522" y="266" fontFamily="Arial,sans-serif" fontSize="8" fill="#bbf7d0" textAnchor="middle">Cold start → warm container</text>
      <text x="522" y="280" fontFamily="Arial,sans-serif" fontSize="8" fill="#bbf7d0" textAnchor="middle">VPC Lambda needs ENI</text>
      <text x="522" y="294" fontFamily="Arial,sans-serif" fontSize="8" fill="#bbf7d0" textAnchor="middle">(cold start penalty)</text>
      <rect x="612" y="232" width="163" height="60" rx="4" fill="#14532d" />
      <text x="694" y="250" fontFamily="Arial,sans-serif" fontSize="8.5" fontWeight="700" fill="#ffffff" textAnchor="middle">Common Triggers:</text>
      <text x="694" y="266" fontFamily="Arial,sans-serif" fontSize="8" fill="#bbf7d0" textAnchor="middle">API Gateway, S3 events</text>
      <text x="694" y="280" fontFamily="Arial,sans-serif" fontSize="8" fill="#bbf7d0" textAnchor="middle">DynamoDB streams, SNS</text>
      <text x="694" y="294" fontFamily="Arial,sans-serif" fontSize="8" fill="#bbf7d0" textAnchor="middle">EventBridge, SQS</text>
      <rect x="441" y="300" width="343" height="24" rx="4" fill="#bbf7d0" />
      <text x="612" y="316" fontFamily="Arial,sans-serif" fontSize="8" fill="#14532d" textAnchor="middle">API Gateway + Lambda = serverless REST/HTTP API. Step Functions = Lambda orchestration workflow.</text>
    </svg>
  );
}
