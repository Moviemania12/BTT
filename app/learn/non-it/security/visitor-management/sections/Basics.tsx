"use client";

import Image from "next/image";
import { S, Callout, ComparisonTable } from "../shared";
import TopicLink from "@/components/TopicLink";

export default function Basics() {
  return (
    <>
      <h2 id="what-is-vms" style={S.h2}>What Is Visitor Management?</h2>

      <p style={S.p}>
        Visitor Management System (referred to here as "visitor management system" or the system, to distinguish from Video Management System/VMS used elsewhere on this platform) wo process aur technology hai jo data center mein aane wale
        non-employees — vendors, contractors, client representatives, auditors, delivery personnel —
        ko systematically register, verify, authorize, monitor aur track karta hai. Ek structured visitor management system
        ensure karta hai ki koi bhi visitor facility mein enter kare to pehle identity verified ho,
        host approved ho, temporary access provisioned ho aur sab kuch auditable record mein ho.
      </p>

      <p style={S.p}>
        Paper-based sign-in registers se digital visitor management system fundamentally different hai ki ye <TopicLink slug="access-control" variant="inline" /> ke
        saath integrate hota hai — visitor ko actual temporary credential milti hai jisse specific
        doors pe specific time window mein access milta hai. Visit complete hone pe ya time expire
        hone pe credential automatically revoke ho jaata hai.
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
          Data Center visitor management — reception kiosk, ID verification aur badge printing station.
        </figcaption>
      </figure>

      <h2 id="why-required" style={S.h2}>Why Visitor Management Is Required in a Data Center</h2>

      <p style={S.p}>
        Employees relatively stable population hain — permanent credentials, trained, background
        checked. Visitors different category hain — unfamiliar with facility, varied purposes, potentially
        unknown risk level. Without structured visitor management, a facility cannot account for who is
        inside at any given time, cannot demonstrate controlled access to auditors, aur cannot revoke
        access precisely when a visit ends.
      </p>

      <p style={S.p}>
        Compliance requirements specifically visitor controls address karte hain. ISO 27001 physical
        security controls mein visitor access management included hai. PCI-DSS Requirement 9 visitor
        identification aur escort requirements specify karta hai. Client contracts often specific visitor
        process requirements define karte hain. Actual requirements applicable framework aur client
        pe depend karte hain — verify karo.
      </p>

      <Callout type="important" title="Visitor Accountability — Har Moment Mein">
        Compliance audit mein ek common question: "Right now, who is in your data center?" Ek robust visitor management system
        real-time dashboard pe active visitors show karta hai — name, host, areas, arrival time. Without
        VMS, ye question paper log se answer karna difficult aur unreliable hota hai.
      </Callout>

      <h2 id="visitor-lifecycle" style={S.h2}>Visitor Lifecycle — End-to-End</h2>

      <p style={S.p}>
        Visitor lifecycle ka flow: <strong>Pre-registration → Approval → On-site arrival → Identity
        verification → Badge/credential issue → Escort → Supervised access → Check-out → Credential
        expiry → Audit record retention.</strong> Har step mein gap security risk ya compliance gap
        create karta hai.
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
        Pre-registration advance notice deta hai — security team ready hoti hai, host available hoti
        hai, aur credential pre-provisioned hoti hai. Host employee system portal mein visitor details
        submit karta hai: visitor name, company, government ID type, purpose, expected time, areas to
        be visited. Approval workflow — manager ya security team — visit approve ya reject karta hai.
        Pre-approved visitors faster on-site registration process se guzarte hain.
      </p>

      <p style={S.p}>
        Walk-in visitors — bina prior registration ke — longer process require karte hain: host contact
        karo, confirm karo, approval get karo, phir registration. Walk-ins security risk higher hote
        hain — advance verification possible nahi thi. Data center policy mein walk-in visitors ke
        liye stricter controls define karo.
      </p>

      <h2 id="on-site-registration" style={S.h2}>On-Site Registration and Identity Verification</h2>

      <p style={S.p}>
        Arrival pe reception desk ya self-service kiosk pe registration hoti hai. Government ID —
        Aadhaar, passport, driving license — scan ya manual entry. Photo capture — visitor ka. Vehicle
        details agar applicable. NDA ya safety briefing acknowledgment if required. Host notification
        — automatic alert jata hai host ko.
      </p>

      <p style={S.p}>
        Identity verification level site policy pe depend karta hai — basic ID check from manual
        inspection to automated ID document verification software. Biometric capture (photo comparison)
        advanced deployments mein. Visitor data system database mein store hota hai — retention
        policy ke hisaab se.
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
