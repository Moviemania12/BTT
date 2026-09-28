"use client";

import { S, Callout, ComparisonTable } from "../shared";
import TopicLink from "@/components/TopicLink";

export default function AccessAndIntegration() {
  return (
    <>
      <h2 id="temporary-credentials" style={S.h2}>Temporary Credentials and Access Provisioning</h2>

      <p style={S.p}>
        After on-site registration the visitor gets a temporary credential — typically a printed badge with embedded card (RFID or barcode). This credential is provisioned from the visitor management system → access control system: the visitor's name, photo, valid zones (specific floors/rooms only), valid time window (visit duration only). Access provisioning must be real-time — it should be active in the access control system as soon as the badge is printed.
      </p>

      <p style={S.p}>
        The visitor badge must be visually distinct — different color (typically different from employee badges), "VISITOR" text prominently displayed, escort required indication. Physical distinctiveness enables facility staff to immediately identify that this is a visitor and whether they are with an escort or not.
      </p>

      <Callout type="best-practice" title="Principle of Least Privilege — Visitor Credentials">
        Give the visitor only the minimum necessary access. If a vendor has come to work in the UPS room, give only UPS room access — not server hall access. Set the time window tightly — a 4-hour credential for a 4-hour visit, not full-day. Over-provisioned visitor access is a significant security risk.
      </Callout>

      <h2 id="visitor-escort" style={S.h2}>Visitor Escort and Movement</h2>

      <p style={S.p}>
        In a data center visitors are typically escorted — unaccompanied movement is high-risk. Define the escort policy: who can escort (host employee only? security staff too?), when an escort can separate from the visitor, and which areas allow unescorted access (if any). Some facilities allow unescorted access in low-risk areas (lobby, conference rooms), but in data halls and critical areas visitor access must be strictly controlled and permitted only according to approved authorization, escort, access provisioning and site security policy.
      </p>

      <p style={S.p}>
        Escort-visitor pairing is possible in access control in some advanced systems — visitor access is valid only when the escort's credential has also been recently used in the same area. This is technically complex but valuable in high-security facilities.
      </p>

      <h2 id="checkout-expiry" style={S.h2}>Check-Out and Credential Expiry</h2>

      <p style={S.p}>
        When the visit is complete the visitor checks out — return the badge at reception, record the check-out in the system, the credential is revoked immediately. If a visitor leaves without a proper check-out — the system should handle it: time-based automatic expiry, end-of-day auto-expiry, or host notification. Taking the physical badge back is important — the credential is revoked, but the physical badge can be misused if found.
      </p>

      <p style={S.p}>
        For extended visits — multi-day vendor work — daily re-approval and per-day credential issuance is better security practice than a single long-duration credential. The credential expires at day end and is re-issued the next day — ensures daily accountability.
      </p>

      <h2 id="audit-trail" style={S.h2}>Audit Trail and Reporting</h2>

      <p style={S.p}>
        The audit trail of the visitor management system maintains the complete visitor record: pre-registration details, approval decision (who approved), on-site registration data, identity verification, access credential details, actual entry/exit times (from access control), check-out, escort details. This record is critical for compliance audits, security investigations and incident response.
      </p>

      <p style={S.p}>
        System reporting capabilities include: active visitors at any time, daily visitor summary, extended stay alerts (visitor should have checked out), frequent visitors, access by area. Integration with CCTV allows video evidence linked to specific visitor events — very powerful in forensic investigation.
      </p>

      <Callout type="maintenance" title="Regular Audit Log Review — Catch Anomalies">
        Just storing visitor management system logs does not do the job — regular review is essential. Weekly: extended stays, missed check-outs, visitors who accessed areas outside their approved zone. Monthly: visitor frequency patterns, hosts with unusually high visitor counts. Configure automated alerts for anomalous patterns.
      </Callout>

      <h2 id="integration" style={S.h2}>Integration with Access Control and CCTV</h2>

      <p style={S.p}>
        Visitor management system to access control integration is core functionality. Integration typically happens through a REST API, database connector or vendor-specific SDK. Provisioning: visitor management system credential data → access control system, real-time or near-real-time. Revocation: system signal on check-out or expiry → access control credential disabled. Audit sync: access control events (door opens, denied attempts) → linked to the visitor record.
      </p>

      <p style={S.p}>
        <TopicLink slug="cctv" variant="inline" /> integration triggers an automatic camera snapshot or recording on visitor entry. Comparison of the visitor's photo from the system and CCTV footage becomes possible. Instant CCTV review is enabled on unauthorized movement alerts (visitor access control violation).
      </p>

      <p style={S.p}>
        <TopicLink slug="mantrap" variant="inline" /> integration: the visitor badge is valid at the mantrap outer door, on successful authentication the visitor goes into the vestibule, and at the inner door there is additional verification or escort confirmation. The visitor's face is captured by the mantrap CCTV.
      </p>

      <h2 id="cybersecurity-privacy" style={S.h2}>Cybersecurity and Privacy Considerations</h2>

      <p style={S.p}>
        Visitor data — names, ID numbers, photos, visit purpose, company — is sensitive personal data. Database security is essential: encrypted storage, access-controlled system server, network segmentation. Server-side: strong authentication for system admin access, regular software updates, vulnerability management. Run visitor-facing kiosks in kiosk mode — no access to the underlying OS or previous visitor data.
      </p>

      <p style={S.p}>
        Privacy regulations — India's DPDP Act, GDPR for EU-related clients — apply restrictions on visitor data collection, storage and retention. Visitors typically have to be informed that their data is being collected and why. Define the retention period and systematically delete expired data. Verify jurisdiction-specific requirements with legal counsel.
      </p>

      <h2 id="preventive-maintenance" style={S.h2}>Preventive Maintenance and System Health</h2>

      <p style={S.p}>
        Below are example maintenance activities — adjust the actual schedule according to OEM recommendations and site policy.
      </p>

      <ul style={S.ul}>
        <li><strong>Daily:</strong> Active visitor dashboard check — overnight visitors, missed check-outs</li>
        <li><strong>Weekly:</strong> Badge printer supplies — ribbon, card stock, label stock</li>
        <li><strong>Weekly:</strong> Verify access control integration sync — recent visitor credentials correctly provisioned and revoked</li>
        <li><strong>Monthly:</strong> Visitor management system software updates check</li>
        <li><strong>Monthly:</strong> Database backup verify — visitor records backup restore test</li>
        <li><strong>Monthly:</strong> End-to-end process test — register a test visitor, print the badge, verify access, check out, verify revocation</li>
        <li><strong>Quarterly:</strong> User access audit — system admin accounts review</li>
        <li><strong>Quarterly:</strong> Data retention compliance — old records per policy purged?</li>
        <li><strong>Annually:</strong> Privacy compliance review — data collected, retention period, applicable regulations</li>
      </ul>
    </>
  );
}
