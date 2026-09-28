"use client";

import Image from "next/image";
import { S, Callout, ComparisonTable } from "../shared";
import TopicLink from "@/components/TopicLink";

export default function Basics() {
  return (
    <>
      <h2 id="what-is-vms" style={S.h2}>What Is Visitor Management?</h2>

      <p style={S.p}>
        A Visitor Management System (referred to here as "visitor management system" or the system, to distinguish from Video Management System/VMS used elsewhere on this platform) is the process and technology that systematically registers, verifies, authorizes, monitors and tracks non-employees coming into the data center — vendors, contractors, client representatives, auditors, delivery personnel. A structured visitor management system ensures that before any visitor enters the facility, their identity is verified, the host has approved, temporary access is provisioned and everything is in an auditable record.
      </p>

      <p style={S.p}>
        A digital visitor management system is fundamentally different from paper-based sign-in registers in that it integrates with <TopicLink slug="access-control" variant="inline" /> — the visitor gets an actual temporary credential that gives access to specific doors in a specific time window. When the visit is complete or the time expires, the credential is automatically revoked.
      </p>

      <figure style={{ margin: "2rem 0" }}>
        <div style={{ border: "1px solid #e2e8f0", borderRadius: "12px", overflow: "hidden" }}>
          <Image
            src="/images/articles/visitor-management/visitor-management-datacenter.svg"
            alt="Data center visitor management reception area showing visitor kiosk, badge printer and security desk with ID verification"
            width={1200}
            height={675}
            style={{ width: "100%", height: "auto", display: "block" }}
            priority
          />
        </div>
        <figcaption style={{ fontSize: "0.85rem", color: "#4b5563", marginTop: "0.6rem", textAlign: "center", fontStyle: "italic" }}>
          Data Center visitor management — reception kiosk, ID verification and badge printing station.
        </figcaption>
      </figure>

      <h2 id="why-required" style={S.h2}>Why Visitor Management Is Required in a Data Center</h2>

      <p style={S.p}>
        Employees are a relatively stable population — permanent credentials, trained, background checked. Visitors are a different category — unfamiliar with the facility, varied purposes, potentially unknown risk level. Without structured visitor management, a facility cannot account for who is inside at any given time, cannot demonstrate controlled access to auditors, and cannot revoke access precisely when a visit ends.
      </p>

      <p style={S.p}>
        Compliance requirements specifically address visitor controls. Visitor access management is included in ISO 27001 physical security controls. PCI-DSS Requirement 9 specifies visitor identification and escort requirements. Client contracts often define specific visitor process requirements. Actual requirements depend on the applicable framework and client — verify them.
      </p>

      <Callout type="important" title="Visitor Accountability — At Every Moment">
        A common question in a compliance audit: "Right now, who is in your data center?" A robust visitor management system shows active visitors on a real-time dashboard — name, host, areas, arrival time. Without a VMS, answering this question from a paper log is difficult and unreliable.
      </Callout>

      <h2 id="visitor-lifecycle" style={S.h2}>Visitor Lifecycle — End-to-End</h2>

      <p style={S.p}>
        The flow of the visitor lifecycle: <strong>Pre-registration → Approval → On-site arrival → Identity verification → Badge/credential issue → Escort → Supervised access → Check-out → Credential expiry → Audit record retention.</strong> A gap at any step creates a security risk or compliance gap.
      </p>

      <ComparisonTable
        title="Visitor Lifecycle Steps — Key Controls"
        headers={["Step", "What Happens", "Key Control", "If Missing"]}
        rows={[
          ["Pre-registration", "Host submits visitor details in advance", "Approval workflow, advance notice", "Walk-in visitors — no advance verification"],
          ["Approval", "Authorized approver accepts/rejects", "Role-based approval, NDA if needed", "Unauthorized visits possible"],
          ["Identity verification", "Government ID checked at reception", "ID scan/photo capture", "No assurance person is who they claim"],
          ["Badge/credential issue", "Temporary badge printed, access provisioned", "Limited zones, time-bound", "Overprovision of access"],
          ["Escort", "Host or designated escort accompanies", "Escort policy enforced", "Visitor can move unmonitored"],
          ["Check-out", "Visitor sign out, badge returned", "Credential revoked", "Visitor access persists after departure"],
          ["Record retention", "Visit log stored per policy", "Searchable audit trail", "No forensic evidence available"],
        ]}
      />

      <h2 id="pre-registration" style={S.h2}>Pre-Registration and Approval Workflow</h2>

      <p style={S.p}>
        Pre-registration gives advance notice — the security team is ready, the host is available, and the credential is pre-provisioned. The host employee submits visitor details in the system portal: visitor name, company, government ID type, purpose, expected time, areas to be visited. The approval workflow — manager or security team — approves or rejects the visit. Pre-approved visitors go through a faster on-site registration process.
      </p>

      <p style={S.p}>
        Walk-in visitors — without prior registration — require a longer process: contact the host, confirm, get approval, then registration. Walk-ins carry a higher security risk — advance verification was not possible. Define stricter controls for walk-in visitors in the data center policy.
      </p>

      <h2 id="on-site-registration" style={S.h2}>On-Site Registration and Identity Verification</h2>

      <p style={S.p}>
        On arrival, registration happens at the reception desk or a self-service kiosk. Government ID — Aadhaar, passport, driving license — scan or manual entry. Photo capture — of the visitor. Vehicle details if applicable. NDA or safety briefing acknowledgment if required. Host notification — an automatic alert goes to the host.
      </p>

      <p style={S.p}>
        The identity verification level depends on site policy — from a basic ID check by manual inspection to automated ID document verification software. Biometric capture (photo comparison) in advanced deployments. Visitor data is stored in the system database — according to the retention policy.
      </p>

      <figure style={{ margin: "2rem 0" }}>
        <div style={{ border: "1px solid #e2e8f0", borderRadius: "12px", overflow: "hidden" }}>
          <Image
            src="/images/articles/visitor-management/visitor-management-workflow.svg"
            alt="Visitor management workflow diagram showing pre-registration, approval, on-site check-in, badge issue, access provisioning, escort and check-out steps"
            width={1200}
            height={600}
            style={{ width: "100%", height: "auto", display: "block" }}
          />
        </div>
        <figcaption style={{ fontSize: "0.85rem", color: "#4b5563", marginTop: "0.6rem", textAlign: "center", fontStyle: "italic" }}>
          Visitor management workflow — pre-registration to check-out, with access control integration
        </figcaption>
      </figure>
    </>
  );
}
