"use client";

import { S, Callout, ComparisonTable } from "../shared";
import TopicLink from "@/components/TopicLink";
import { faqs } from "../metadata";

export default function TroubleshootingAndClosing() {
  return (
    <>
      <h2 id="troubleshooting" style={S.h2}>Engineer Troubleshooting — Step-by-Step</h2>

      <h3 style={S.h3}>Fault 1: Visitor Management System Software/Server Not Accessible</h3>
      <p style={S.p}>
        <strong>First check:</strong> Ping the system server — is it reachable? Is the server powered on, services running?
      </p>
      <p style={S.p}>
        <strong>Next check:</strong> Web server service status (IIS, Apache, nginx depending on platform),
        database connectivity, disk space.
      </p>
      <p style={S.p}>
        <strong>Isolate:</strong> Is the database service running? Errors in the application log?
      </p>
      <p style={S.p}>
        <strong>Corrective action:</strong> Restart the services. Free up disk space if full. Check database health. If there is a server hardware fault — shift to failover or a temporary manual process. Maintain a manual register until the system is restored.
      </p>

      <h3 style={S.h3}>Fault 2: Pre-Registration Email / Host Notification Not Received</h3>
      <p style={S.p}>
        <strong>First check:</strong> System email configuration — are the SMTP settings correct? Send a test email from the system settings.
      </p>
      <p style={S.p}>
        <strong>Next check:</strong> Is the host email address correct in the system? Check the spam/junk folder. Email server connectivity — is the system server reaching the SMTP server?
      </p>
      <p style={S.p}>
        <strong>Corrective action:</strong> Verify the SMTP credentials and server address. Firewall — is the SMTP port (25/465/587) allowed outbound? Is DNS resolution working from the system server? Is the email template correctly configured? Check the email logs — delivery errors.
      </p>

      <h3 style={S.h3}>Fault 3: Badge Printer Not Working</h3>
      <p style={S.p}>
        <strong>First check:</strong> Physical: printer powered on, ribbon installed, card stock loaded, no
        paper jam?
      </p>
      <p style={S.p}>
        <strong>Next check:</strong> Printer driver on the PC/server — is the printer online? Test print from the driver settings.
      </p>
      <p style={S.p}>
        <strong>Corrective action:</strong> Reinstall the driver. Check the USB/network connection. Replace the ribbon/card stock. If hardware fault — temporary: print on paper and laminate, or use a backup printer. Keeping a spare printer ready at critical entry kiosks is good practice.
      </p>

      <h3 style={S.h3}>Fault 4: Visitor Credential Not Working at Door</h3>
      <p style={S.p}>
        <strong>First check:</strong> Is the visitor credential active in the access control system? Did the visitor management system-to-access control integration sync?
      </p>
      <p style={S.p}>
        <strong>Next check:</strong> Is the credential within the valid time window? Is the correct door assigned? Is the card type compatible with the reader?
      </p>
      <p style={S.p}>
        <strong>Isolate:</strong> Look at the visitor card attempt in the access control log — "card not found" or "access denied — schedule" or "access denied — door not assigned"?
      </p>
      <p style={S.p}>
        <strong>Corrective action:</strong> Re-provision from the system — manually force a sync. Verify the credential directly in access control — are the doors and schedule correct? If the integration is consistently failing — restart the integration service, verify the integration configuration. As an immediate workaround — security staff should manually verify and allow.
      </p>

      <h3 style={S.h3}>Fault 5: Visitor Credential Not Expiring / Still Active After Check-Out</h3>
      <p style={S.p}>
        <strong>First check:</strong> Did the visitor check out in the system? Is the check-out event logged?
      </p>
      <p style={S.p}>
        <strong>Next check:</strong> Credential status in the access control system — still active? Did the revocation message go from the system to access control?
      </p>
      <p style={S.p}>
        <strong>Corrective action:</strong> Manually disable the credential in the access control system immediately — security priority. Check the integration log — did the revocation API call fail? Network issue at time of check-out? Check integration service health. Is time-based expiry configured as a fallback? Configure it if not.
      </p>

      <h3 style={S.h3}>Fault 6: Visitor Attempting Access Outside Approved Area/Time</h3>
      <p style={S.p}>
        <strong>First check:</strong> Access control log — where and when was the denied attempt?
      </p>
      <p style={S.p}>
        <strong>Next check:</strong> CCTV footage — where did the visitor go? Were they with the escort?
      </p>
      <p style={S.p}>
        <strong>Corrective action:</strong> Follow the security protocol — verify the visitor's location (CCTV), contact the escort, escort the visitor to the authorized area. Log the incident. Root cause — did the visitor wander inadvertently or intentionally? Inform the host/escort. Was the visitor policy briefing inadequate? Improve the process.
      </p>

      <h3 style={S.h3}>Fault 7: Visitor Management System — Access Control Integration Sync Failure</h3>
      <p style={S.p}>
        <strong>First check:</strong> Integration service status — is it running? Are the visitor management system and access control server both reachable from each other?
      </p>
      <p style={S.p}>
        <strong>Next check:</strong> Integration logs — error messages? API timeout? Authentication failure?
      </p>
      <p style={S.p}>
        <strong>Corrective action:</strong> Restart the integration service. Verify API credentials — has the access control API key/password changed? Network connectivity between servers. Manually process pending provisioning/revocation commands in the queue. Escalate to visitor management system/access control vendor if persistent.
      </p>

      <ComparisonTable
        title="Visitor Management Troubleshooting Quick Reference"
        headers={["Symptom", "First Check", "Next Check", "Likely Cause", "Corrective Action"]}
        rows={[
          ["Visitor mgmt system server not accessible", "Server ping, services status", "DB connectivity, disk space", "Service crash or resource exhaustion", "Restart services, fix resources, manual fallback"],
          ["Host notification not received", "SMTP config, test email", "Spam folder, SMTP port", "Email misconfiguration or firewall", "Fix SMTP settings, check firewall"],
          ["Badge printer not working", "Power, ribbon, card stock", "Driver status, test print", "Hardware or driver issue", "Fix driver/connection, spare printer"],
          ["Visitor badge not working at door", "Credential active in AC?", "Door assignment, time window", "Integration sync failure", "Re-provision, manual allow as workaround"],
          ["Credential not expiring after checkout", "Check-out recorded in system?", "Revocation message to AC?", "Integration revocation failure", "Manually disable in AC immediately, fix integration"],
          ["Visitor outside approved area", "Access control denied log", "CCTV footage", "Unauthorized movement", "Security protocol, escort, incident log"],
          ["VMS-AC integration sync failure", "Integration service status", "API logs, network connectivity", "Service crash or API auth failure", "Restart service, fix credentials, process queue"],
        ]}
      />

      <h2 id="advantages-limitations" style={S.h2}>Advantages and Limitations</h2>

      <h3 style={S.h3}>Advantages</h3>
      <ul style={S.ul}>
        <li>Real-time visibility — who is in the facility at any moment</li>
        <li>Automated temporary credential provisioning and expiry — reduces manual error</li>
        <li>Complete audit trail — compliance and forensic evidence</li>
        <li>Integration with access control and CCTV — unified security picture</li>
        <li>Host notification and approval workflow — accountability on both sides</li>
        <li>Scalable — from small facilities to large enterprise data centers</li>
      </ul>

      <h3 style={S.h3}>Limitations</h3>
      <ul style={S.ul}>
        <li>Integration complexity — VMS-to-access control sync must be reliable; failure creates security gaps</li>
        <li>Process discipline required — system only works if staff consistently follow the process</li>
        <li>Data privacy obligations — visitor data is personal data requiring careful management</li>
        <li>Credential revocation latency — time between check-out and actual revocation in AC system must be minimal</li>
        <li>Paper-based fallback for system outages requires planning</li>
        <li>Cost and maintenance overhead</li>
      </ul>

      <h2 id="illustrative-scenario" style={S.h2}>Illustrative Scenario</h2>

      <Callout type="interview" title="Note: This is an illustrative scenario — not a reference to any documented real facility">
        The scenario below demonstrates the practical importance of VMS integration.
      </Callout>

      <p style={S.p}>
        During a quarterly compliance audit in a data center the auditor requested: "Show me all visitors who accessed Server Hall B in the last 90 days, with their identity verification records and corresponding CCTV footage." The VMS instantly exported 47 visitor records — name, company, ID type, host, access time, access control entry/exit events, and linked CCTV snapshots. The audit was completed in 30 minutes.
      </p>
      <p style={S.p}>
        That process also surfaced an anomaly — a vendor's credential showed that they had accessed Server Hall B, but their approved area was only the electrical room. The investigation found that a wrong zone had been assigned during credential provisioning — the process gap was fixed. Lesson: the VMS audit trail is not only for compliance — it also detects operational anomalies.
      </p>

      <h2 id="interview-questions" style={S.h2}>Interview Questions</h2>

      <h3 style={S.h3}>Q1: Why is a VMS better than a paper sign-in register?</h3>
      <p style={S.p}>
        <strong>Answer:</strong> A paper register only records name/time — no identity verification, no access control integration, no real-time visibility, no searchable audit trail. A VMS verifies identity, provisions a temporary credential, integrates with access control, ensures automatic expiry, and maintains a complete searchable audit trail. Digital visitor management systems provide measurably better accountability, auditability and integration capability than manual/paper-based processes.
      </p>

      <h3 style={S.h3}>Q2: How is visitor credential expiry ensured?</h3>
      <p style={S.p}>
        <strong>Answer:</strong> Time-based expiry: the credential is valid for the visit duration and expires automatically. Immediate revocation on check-out: when the visitor checks out, VMS → credential disabled in the access control system. End-of-day expiry as fallback: if the check-out was missed. Integration reliability is essential — the revocation message must reach access control. A manual override should also be available for the security team.
      </p>

      <h3 style={S.h3}>Q3: What immediate action should be taken on a VMS-access control integration failure?</h3>
      <p style={S.p}>
        <strong>Answer:</strong> Identify pending revocations — visitors who have already checked out but whose credential is still active. Disable them manually in access control — security priority. Have security staff physically monitor active visitors. Start a manual paper log. Fix the integration service — restart, verify API credentials, check the network. After the system is restored, manually process the pending sync.
      </p>

      <h2 id="key-takeaways" style={S.h2}>Key Takeaways</h2>
      <ul style={S.ul}>
        <li>The VMS manages the visitor lifecycle — from pre-registration to check-out and audit record.</li>
        <li>Temporary credentials must be provisioned for limited zones and time windows — principle of least privilege.</li>
        <li>VMS-to-access control integration reliability is critical — revocation failure = active credential after departure.</li>
        <li>The audit trail is essential for both compliance and forensic investigation — searchable, time-stamped records.</li>
        <li>Visitor data is sensitive personal data — privacy regulations and data retention policies apply.</li>
        <li>Process discipline is essential — technology only automates a structured process.</li>
        <li>Keep a manual fallback process ready for integration failure and quickly identify pending revocations.</li>
      </ul>

      <h2 style={{ ...S.h2, marginTop: "3rem" }}>Frequently Asked Questions</h2>
      {faqs.map((item, i) => (
        <div key={i} style={{ marginBottom: "1.5rem", paddingBottom: "1.5rem", borderBottom: i < faqs.length - 1 ? "1px solid #e5e7eb" : "none" }}>
          <p style={{ ...S.p, fontWeight: 700, marginBottom: "0.4rem" }}>{item.q}</p>
          <p style={{ ...S.p, marginBottom: 0 }}>{item.a}</p>
        </div>
      ))}

      <h2 style={{ ...S.h2, marginTop: "3rem" }}>Related Learning Topics</h2>
      <ul style={S.ul}>
        <li><TopicLink slug="access-control" variant="inline" /> — VMS temporary credentials are provisioned in the access control system.</li>
        <li><TopicLink slug="cctv" variant="inline" /> — visitor entry documentation and unauthorized movement detection.</li>
        <li><TopicLink slug="mantrap" variant="inline" /> — the visitor passes through the mantrap — controlled individual entry.</li>
        <li><TopicLink slug="biometrics" variant="inline" /> — visitor identity verification in high-security facilities.</li>
      </ul>
    </>
  );
}
