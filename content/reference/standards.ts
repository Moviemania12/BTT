// ─────────────────────────────────────────────────────────────────────────────
// content/reference/standards.ts
// Engineering standards reference. Add new standards here — page auto-renders.
// ─────────────────────────────────────────────────────────────────────────────

export interface Standard {
  id: string;
  name: string;
  fullName: string;
  body: string;
  category: string;
  categoryColor: string;
  what: string;
  whyMatters: string;
  whereUsed: string;
  keyRequirements: string[];
  dcExample: string;
  certificationRequired: boolean;
  aliases?: string[];
}

export const STANDARDS: Standard[] = [
  // ── FACILITY / TIER ──────────────────────────────────────────────────────────
  {
    id: "uptime-tier",
    name: "Uptime Institute Tier Standard",
    fullName: "Uptime Institute Tier Certification Standard (Tier I–IV)",
    body: "Uptime Institute",
    category: "Facility Design",
    categoryColor: "#f97316",
    what: "The Uptime Institute Tier Classification System defines four tiers of data center infrastructure reliability. Tier I (basic, 99.671% availability) through Tier IV (fault-tolerant, 99.995% availability). Each tier specifies requirements for power, cooling, network, and operational redundancy. Certification requires physical inspection and operational review by Uptime Institute assessors.",
    whyMatters: "Tier certification is the global standard for DC reliability benchmarking. Enterprise customers require Tier III or Tier IV certification from colocation providers. Design, operations, and capital expenditure decisions are fundamentally shaped by target Tier level. Tier III (concurrently maintainable) is the most common enterprise standard; Tier IV (fault-tolerant) required for financial exchanges and critical national infrastructure.",
    whereUsed: "Colocation facility marketing and contracts, enterprise DC design specifications, data center investment decisions, insurance assessments, regulatory filings. Uptime Institute awards three levels: Tier Certification of Design Documents, Tier Certification of Constructed Facility, and Tier Certification of Operational Sustainability (TCOS).",
    keyRequirements: [
      "Tier I: Single non-redundant distribution path. Susceptible to disruptions from planned and unplanned activity.",
      "Tier II: Redundant capacity components (N+1 UPS, cooling). Single non-redundant distribution path.",
      "Tier III: Multiple active power and cooling distribution paths with only one path active. All IT equipment dual-powered. Site is concurrently maintainable — any component can be maintained without shutting down IT load.",
      "Tier IV: All cooling equipment, power equipment, and distribution paths fully fault-tolerant (2N minimum). All paths simultaneously active. Any single fault — planned or unplanned — has no impact on IT load.",
      "Tier IV: 96-hour fuel storage minimum. Tier III: 12-hour minimum (OEM requirement).",
    ],
    dcExample: "A major Indian bank's primary DC in Mumbai is Tier IV certified (Uptime Institute). All power and cooling paths are 2N — two independent UPS systems, two independent chiller plants, two separate utility feeds from different substations. Annual TCOS audit verifies operational procedures match design intent. Cost per kW of installed capacity is approximately 2.5x higher than a comparable Tier III facility.",
    certificationRequired: true,
    aliases: ["Tier Certification", "Tier I II III IV", "Uptime Tier", "Tier Standard"],
  },
  {
    id: "tia-942",
    name: "ANSI/TIA-942",
    fullName: "ANSI/TIA-942: Telecommunications Infrastructure Standard for Data Centers",
    body: "Telecommunications Industry Association (TIA)",
    category: "Facility Design",
    categoryColor: "#f97316",
    what: "ANSI/TIA-942 is a US/international standard for data center telecommunications infrastructure design. It covers cabling topology, space and layout, environmental requirements (temperature, humidity, power distribution), fire protection, and physical security. TIA-942-B (2017 revision) introduced Rated-1 through Rated-4 classifications aligned conceptually with Uptime Institute Tiers.",
    whyMatters: "TIA-942 provides prescriptive requirements for structured cabling, power distribution, and physical layout — areas where Uptime Institute Tier standard is less specific. Many DC operators use TIA-942 for cabling and physical design, and Uptime Institute Tier for redundancy design. TIA-942 is mandatory reference for BICSI-certified data center designers.",
    whereUsed: "DC cabling design, physical layout specification, equipment room design, US government facility requirements, BICSI DCDC (Data Center Design Consultant) certification curriculum.",
    keyRequirements: [
      "Entrance room, main distribution area (MDA), horizontal distribution area (HDA), zone distribution area (ZDA) — defined topology.",
      "Cable pathway fill ratios, bend radius requirements, length limitations for copper and fiber.",
      "Temperature: 18-27°C (ASHRAE A1 class) for server rooms. Humidity: 40-55% RH.",
      "Rated-1 to Rated-4: availability classifications (R1=99.671%, R4=99.995%) analogous to Uptime Tiers.",
      "Raised floor requirements, clearance around equipment, aisle widths (minimum 900mm cold aisle, 1200mm hot aisle).",
    ],
    dcExample: "A new 5MW DC built for a cloud provider in Hyderabad used TIA-942-B as the cabling design specification: MDA with dual-redundant patch panels, HDA per zone, OM4 fiber throughout in-building with SMF for inter-building. The structured cabling installation was certified by a TIA-942 auditor.",
    certificationRequired: false,
    aliases: ["TIA-942", "TIA942", "ANSI TIA 942"],
  },

  // ── INFORMATION SECURITY ─────────────────────────────────────────────────────
  {
    id: "iso-27001",
    name: "ISO/IEC 27001",
    fullName: "ISO/IEC 27001: Information Security Management Systems (ISMS)",
    body: "International Organization for Standardization (ISO) / International Electrotechnical Commission (IEC)",
    category: "Information Security",
    categoryColor: "#dc2626",
    what: "ISO 27001 is the international standard for Information Security Management Systems (ISMS). It provides a framework for identifying security risks, implementing controls, and continuously improving information security across people, processes, and technology. The standard includes 114 controls across 14 categories (Annex A), covering physical security, access control, cryptography, incident management, business continuity, and supplier relationships.",
    whyMatters: "ISO 27001 certification is a market requirement for colocation providers, managed service providers, and cloud service providers selling to enterprise and regulated customers. It demonstrates a systematic approach to information security — not just point-in-time controls. For DCs: physical security controls, access logging, background checks, visitor management, and environmental controls are all part of ISO 27001 scope.",
    whereUsed: "Colocation contracts, cloud service provider SLAs, enterprise vendor qualification processes, regulated industry procurement requirements. Recognized globally — accepted as security baseline in Europe, India, APAC, Middle East.",
    keyRequirements: [
      "Risk assessment and risk treatment: systematic identification and treatment of information security risks.",
      "Annex A.11 (Physical and Environmental Security): equipment siting, clear desk policy, secure disposal, physical access control, cabling security.",
      "Annex A.12 (Operations Security): malware protection, backup, logging and monitoring, technical vulnerability management.",
      "Statement of Applicability (SoA): documents which of the 114 controls are applicable and why.",
      "Annual surveillance audit (years 1-2 after certification) and triennial recertification audit by accredited CB (Certification Body).",
    ],
    dcExample: "Equinix Mumbai DC maintains ISO 27001:2013 certification. The scope includes physical access control (biometric + card for all server halls), 24x7 CCTV with 90-day retention, visitor management system, background checks for all permanent staff, secure equipment disposal process, and annual penetration testing. Certification audit by BSI Group.",
    certificationRequired: true,
    aliases: ["ISO 27001", "ISMS", "Information Security Management"],
  },
  {
    id: "soc-2",
    name: "SOC 2",
    fullName: "SOC 2: Service Organization Control 2 Report",
    body: "American Institute of Certified Public Accountants (AICPA)",
    category: "Information Security",
    categoryColor: "#dc2626",
    what: "SOC 2 is an auditing standard for service organizations, examining controls related to Security, Availability, Processing Integrity, Confidentiality, and Privacy (Trust Services Criteria). Type I: point-in-time assessment of controls design. Type II: assessment of control operating effectiveness over a period (typically 6-12 months). SOC 2 Type II is the primary standard demanded by enterprise cloud and colocation customers.",
    whyMatters: "US enterprises and US-listed companies frequently require SOC 2 Type II from cloud and colo providers as part of vendor due diligence and audit requirements (Sarbanes-Oxley, etc.). SOC 2 provides an independent auditor's opinion on whether security controls actually operated effectively — not just whether they exist.",
    whereUsed: "US enterprise vendor qualification, cloud provider trust documentation, SaaS company compliance frameworks. AWS, Azure, GCP, and major colo providers all publish SOC 2 Type II reports.",
    keyRequirements: [
      "CC6 (Logical and Physical Access Controls): user provisioning, deprovisioning, MFA, physical access controls.",
      "CC7 (System Operations): monitoring, incident response, malware detection.",
      "CC8 (Change Management): authorised change process, testing before production.",
      "A1 (Availability): performance monitoring, disaster recovery, capacity planning.",
      "Annual SOC 2 Type II report covering 6-12 month period. Issued by licensed CPA firm.",
    ],
    dcExample: "A major Indian IT services company's colocation provider publishes an annual SOC 2 Type II report covering Security and Availability criteria. The report covers: physical access control testing (badge access logs verified for all 12 months), availability monitoring (uptime records), backup testing (restore verification logs), and incident response records. Enterprise customers receive the report under NDA as part of vendor qualification.",
    certificationRequired: true,
    aliases: ["SOC 2 Type II", "SOC2", "Service Organization Control"],
  },
  {
    id: "pci-dss",
    name: "PCI-DSS",
    fullName: "PCI-DSS: Payment Card Industry Data Security Standard",
    body: "PCI Security Standards Council (PCI SSC)",
    category: "Information Security",
    categoryColor: "#dc2626",
    what: "PCI-DSS is a set of security standards for organizations that handle payment card data. Any DC processing, storing, or transmitting cardholder data must comply. PCI-DSS v4.0 (2022) has 12 requirements covering network security, cardholder data protection, vulnerability management, access control, monitoring, and security testing. Non-compliance can result in card brand fines, loss of card processing ability.",
    whyMatters: "Mandatory for any infrastructure touching payment card data. Affects DC network design (CDE isolation), physical security (restricted access to CDE zones), monitoring (log retention minimum 12 months), and encryption (TLS 1.2+ mandatory). PCI-DSS drives specific DC architecture decisions: separate VLAN for CDE, physical access controls with audit logs, 90-day password rotation for system accounts.",
    whereUsed: "Banking, retail, e-commerce, payment processors. Any organization processing Visa/Mastercard/Amex/Discover transactions. PCI-DSS also applies to service providers (DCs hosting CDE) — Level 1 service providers must complete annual assessment by Qualified Security Assessor (QSA).",
    keyRequirements: [
      "Req 1: Install and maintain network security controls — firewall separating CDE from non-CDE.",
      "Req 7: Restrict access to system components and cardholder data by business need to know.",
      "Req 8: Identify users and authenticate access to system components — MFA mandatory for all non-console CDE access.",
      "Req 9: Restrict physical access to cardholder data — badge access, visitor log, camera, clear-desk.",
      "Req 10: Log and monitor all access to system components — audit logs, 12-month retention, 3-month online.",
    ],
    dcExample: "An Indian payment gateway hosted in a Mumbai colocation DC maintains PCI-DSS v4.0 Level 1 compliance. CDE is isolated in a dedicated cage with biometric + PIN access (no tailgating allowed). All CDE servers are on a separate VLAN with dedicated firewall rules. Quarterly internal vulnerability scans and annual external penetration test by QSA. Access logs retained 12 months. Annual assessment by approved QSA.",
    certificationRequired: true,
    aliases: ["PCI DSS", "PCI", "Payment Card Industry"],
  },

  // ── SERVICE MANAGEMENT ───────────────────────────────────────────────────────
  {
    id: "iso-20000",
    name: "ISO/IEC 20000",
    fullName: "ISO/IEC 20000: IT Service Management System (ITSM)",
    body: "ISO/IEC",
    category: "Service Management",
    categoryColor: "#7c3aed",
    what: "ISO 20000 is the international standard for IT Service Management Systems (ITSM). It specifies requirements for planning, establishing, implementing, operating, monitoring, reviewing, maintaining, and improving an ITSM system. Based on ITIL practices, it covers incident management, problem management, change management, service level management, capacity management, and availability management.",
    whyMatters: "ISO 20000 certification demonstrates that a service provider (DC operator, MSP) has systematic, audited processes for service delivery. It is frequently required alongside ISO 27001 for enterprise contracts. DC operators: change management process, incident management SLAs, capacity planning, and availability reporting are all within ISO 20000 scope.",
    whereUsed: "IT service providers, managed service providers, colocation operators, cloud providers. European government procurement frequently requires ISO 20000 alongside ISO 27001.",
    keyRequirements: [
      "Change management: authorised process for all changes, including emergency changes. Change Advisory Board (CAB) requirement.",
      "Incident management: classification, prioritisation, response time SLAs (P1-P4), escalation paths.",
      "Problem management: root cause analysis process, known error database, proactive problem management.",
      "Capacity management: planning process, performance monitoring, capacity reports.",
      "Service level management: SLA definition, monitoring, reporting, and review process.",
    ],
    dcExample: "A Tier III colocation provider in Bangalore holds ISO 20000-1:2018 certification. Their change management process requires CAB approval for all standard changes affecting production infrastructure, with 5-business-day notice to customers for scheduled maintenance. Incident response SLAs: P1 < 15 minutes, P2 < 1 hour, P3 < 4 hours. Monthly service review reports published to all customers. Annual ISO 20000 surveillance audit.",
    certificationRequired: true,
    aliases: ["ISO 20000", "ITSM Standard", "IT Service Management"],
  },
  {
    id: "iso-22301",
    name: "ISO 22301",
    fullName: "ISO 22301: Business Continuity Management Systems (BCMS)",
    body: "ISO",
    category: "Service Management",
    categoryColor: "#7c3aed",
    what: "ISO 22301 is the international standard for Business Continuity Management Systems (BCMS). It provides a framework for planning, establishing, implementing, operating, and testing business continuity capabilities. Requires Business Impact Analysis (BIA), Recovery Time Objectives (RTO), Recovery Point Objectives (RPO), and documented, tested continuity plans.",
    whyMatters: "For DC operators and enterprises dependent on DC infrastructure: ISO 22301 formalizes DR planning, testing requirements, and continual improvement. Many regulated industries (banking, insurance, healthcare) require ISO 22301 or equivalent from their critical infrastructure providers. Drives annual DR testing, documented runbooks, and staff training.",
    whereUsed: "Financial services, healthcare, government, critical national infrastructure. Enterprise customers require ISO 22301 from mission-critical service providers. Common alongside ISO 27001 for comprehensive risk management.",
    keyRequirements: [
      "Business Impact Analysis (BIA): identifies critical processes, maximum tolerable downtime, RTO/RPO.",
      "Business continuity strategy: defined approach for maintaining critical functions during disruption.",
      "Business continuity plan: documented procedures for response, recovery, and restoration.",
      "Exercising and testing: minimum annual test of continuity plans. Results documented and improvements made.",
      "Communication plan: defined stakeholder communication during and after disruption.",
    ],
    dcExample: "A national bank's DC team is ISO 22301 certified. Their BIA identified core banking as maximum tolerable downtime 4 hours (RTO 2 hours). Annual DR drill: simulated primary DC loss, DR site activated within RTO. Drill results: 118 minutes for core banking recovery — within 2-hour RTO. Improvements from drill: automated failover script reduced manual steps from 47 to 12.",
    certificationRequired: true,
    aliases: ["ISO 22301", "BCMS", "Business Continuity Standard"],
  },

  // ── FIRE SAFETY ──────────────────────────────────────────────────────────────
  {
    id: "nfpa-75",
    name: "NFPA 75",
    fullName: "NFPA 75: Standard for the Fire Protection of Information Technology Equipment",
    body: "National Fire Protection Association (NFPA)",
    category: "Fire Safety",
    categoryColor: "#dc2626",
    what: "NFPA 75 is the US standard covering fire protection requirements specifically for information technology equipment (ITE) and the rooms/areas containing it. It covers construction, suppression systems, detection systems, power control, and emergency procedures for IT equipment areas. In India, NFPA 75 is referenced in many DC design specifications even though local NBC (National Building Code) is the mandatory reference.",
    whyMatters: "NFPA 75 provides specific requirements for IT environments that general building fire codes do not address: clean agent suppression, pre-action sprinklers, VESDA-type early detection, underfloor fire protection, and power shutdown procedures. US-aligned customers often require NFPA 75 compliance from DC operators.",
    whereUsed: "US data centers (mandatory in many jurisdictions), international DCs designed to US standards. Often referenced alongside local regulations (India: NBC 2016, Part 4 Fire and Life Safety).",
    keyRequirements: [
      "Suppression: clean agent (FM200, Novec, inert gas) preferred for electronic equipment rooms. Pre-action sprinkler where clean agent impractical.",
      "Detection: NFPA 75 endorses very early smoke detection (VESDA-type) as appropriate for ITE areas.",
      "Power shutdown: automatic or manual power shutoff for IT areas where suppression is triggered.",
      "Underfloor: detection required in underfloor plenum where combustibles present.",
      "Inspection and testing: annual inspection of suppression system, quarterly inspection of detection.",
    ],
    dcExample: "A US-based hyperscale provider's India DC (built to US standards) follows NFPA 75 for fire protection: VESDA in server halls (underfloor and overhead), FM200 flooding per zone, pre-action in mechanical areas. Annual suppression system test by FM Global-approved contractor. Local compliance with NBC Part 4 maintained simultaneously.",
    certificationRequired: false,
    aliases: ["NFPA 75", "NFPA75"],
  },
  {
    id: "nfpa-76",
    name: "NFPA 76",
    fullName: "NFPA 76: Standard for the Fire Protection of Telecommunications Facilities",
    body: "National Fire Protection Association (NFPA)",
    category: "Fire Safety",
    categoryColor: "#dc2626",
    what: "NFPA 76 covers fire protection for telecommunications facilities — telephone central offices, carrier hotels, carrier-neutral exchange points, and colocation facilities. Similar in scope to NFPA 75 but specifically addressing telecom infrastructure characteristics. Addresses battery room requirements (hydrogen detection for vented batteries), cable plant protection, and facility configuration.",
    whyMatters: "Carrier-neutral colocation, internet exchange points, and facilities with significant telecom infrastructure are often referenced against NFPA 76 by insurance providers (FM Global, etc.) and US telecom carriers requiring space in the facility.",
    whereUsed: "Carrier hotels, carrier-neutral exchanges (Equinix, NTT, Digital Realty), facilities with significant telecom presence. US mandatory in some jurisdictions. Insurance FM Global specifications frequently reference NFPA 76.",
    keyRequirements: [
      "Battery room: hydrogen detection for vented lead-acid batteries. Ventilation requirements (prevent H2 accumulation above 25% of LEL).",
      "Cable plant: fire-resistant cable trays and conduit in key areas. Fire barriers between cable runs and equipment spaces.",
      "Suppression: zone-by-zone suppression — suppression in one zone must not inadvertently affect adjacent zones.",
      "Detection: must cover cable distribution frames, battery rooms, and UPS areas in addition to server spaces.",
    ],
    dcExample: "A carrier-neutral DC in Mumbai where major telecom operators colocate their equipment maintains NFPA 76 compliance for the telecom-intensive floors. Battery rooms (telecom batteries) have hydrogen detection with 25% LEL alarm threshold and automatic ventilation increase. Fire barriers rated 2 hours separate the telecom cable plant from the IT equipment floor.",
    certificationRequired: false,
    aliases: ["NFPA 76", "NFPA76", "Telecom Fire Protection"],
  },

  // ── COOLING / ENERGY ─────────────────────────────────────────────────────────
  {
    id: "ashrae-tc99",
    name: "ASHRAE TC9.9",
    fullName: "ASHRAE TC9.9: Mission Critical Facilities, Technology Spaces, and Electronic Equipment Thermal Guidelines",
    body: "American Society of Heating, Refrigerating and Air-Conditioning Engineers (ASHRAE)",
    category: "Cooling and Energy",
    categoryColor: "#0284c7",
    what: "ASHRAE TC9.9 publishes thermal guidelines for data center equipment environments. The primary publication is 'Thermal Guidelines for Data Processing Environments' (multiple editions). Defines equipment classes (A1-A4, B, C, H1-H4) with allowable temperature and humidity ranges. A1 class (15-32°C inlet, 20-80% RH) is the most common reference for enterprise DCs. A4 class (5-45°C) allows extreme temperature ranges for reduced cooling energy.",
    whyMatters: "ASHRAE TC9.9 guidelines are the design reference for DC cooling system temperature setpoints. As allowable temperature ranges expand (A2, A3, A4 classes), cooling systems can operate more efficiently — less mechanical cooling energy. Server hardware manufacturers specify which ASHRAE class their equipment supports. Misapplying the class = equipment warranty invalidation.",
    whereUsed: "DC cooling system design, server hardware procurement (ASHRAE class spec), energy efficiency audits, PUE improvement projects.",
    keyRequirements: [
      "A1 class: inlet 15-32°C, 20-80% RH, max dew point 17°C. Most enterprise servers.",
      "A2 class: inlet 10-35°C, 20-80% RH. Wider range — allows higher CRAC/CRAH supply temperatures.",
      "A3 class: inlet 5-40°C, 8-85% RH. High-efficiency DC operation — free cooling in many climates.",
      "A4 class: inlet 5-45°C, 8-90% RH. Designed for outdoor/extreme environments.",
      "Supply air temperature target: many DCs increase supply air from 16°C to 20-22°C → significant cooling energy reduction with A2 class equipment.",
    ],
    dcExample: "A Google-style hyperscale DC in a moderate climate operates at 27°C server inlet (ASHRAE A2 class). Supply air is 22°C — warmer than traditional 16°C. This allows the chiller to operate at a higher evaporator temperature → higher COP → less energy. Servers are specified to ASHRAE A2 class. PUE: 1.12 vs 1.45 for traditional cooler setpoints.",
    certificationRequired: false,
    aliases: ["ASHRAE TC9.9", "ASHRAE thermal guidelines", "ASHRAE A1", "ASHRAE A2", "Equipment class"],
  },

  // ── ELECTRICAL ───────────────────────────────────────────────────────────────
  {
    id: "iec-60364",
    name: "IEC 60364",
    fullName: "IEC 60364: Low-Voltage Electrical Installations",
    body: "International Electrotechnical Commission (IEC)",
    category: "Electrical",
    categoryColor: "#f59e0b",
    what: "IEC 60364 is the international standard series for low-voltage (≤1000V AC) electrical installation design, installation, verification, and maintenance. It defines earthing system types (TN-S, TN-C, TN-C-S, TT, IT), wiring methods, protective devices, and testing requirements. In India, IEC 60364 is referenced alongside IS:732 (Code of Practice for Electrical Wiring Installations) and IS:3043 (Earthing).",
    whyMatters: "DC electrical installations must comply with IEC 60364 (or national equivalent). Critical for DC engineers: earthing system type selection (TN-S mandatory for sensitive IT equipment), neutral conductor sizing for harmonic-rich loads, and protective device coordination.",
    whereUsed: "Electrical installation design worldwide. India: referenced alongside IS standards. Middle East: typically IEC 60364 directly. Europe: mandatory.",
    keyRequirements: [
      "Part 4-41: Protection against electric shock — earthing, bonding, RCD requirements.",
      "Part 4-43: Protection against overcurrent — circuit breaker sizing and coordination.",
      "Part 4-44: Protection against voltage disturbances — surge protection, power quality.",
      "Part 5-54: Earthing arrangements — TN-S, TN-C, TT, IT systems. TN-S required for sensitive IT loads.",
      "Part 6: Verification — initial verification and periodic inspection testing.",
    ],
    dcExample: "The LT electrical installation in a new 5MW DC in Noida was designed to IEC 60364 + IS:732. All IT load areas use TN-S earthing (separate neutral and protective earth conductors from main earthing terminal). Neutral conductors for server rows sized at 1.5× phase conductor (harmonic load). Initial verification testing: insulation resistance, continuity of protective conductors, polarity verification. Certificate issued by accredited electrical contractor.",
    certificationRequired: false,
    aliases: ["IEC 60364", "LV electrical standard", "Low voltage installation"],
  },
  {
    id: "ieee-standards",
    name: "IEEE Data Center Standards",
    fullName: "IEEE Standards Relevant to Data Centers (IEEE 1100, 3006, 3007 series)",
    body: "Institute of Electrical and Electronics Engineers (IEEE)",
    category: "Electrical",
    categoryColor: "#f59e0b",
    what: "IEEE publishes several standards directly applicable to DC power and electrical systems. IEEE 1100 (Emerald Book): powering and grounding sensitive electronic equipment. IEEE 3006: recommended practices for industrial and commercial power systems analysis. IEEE 3007 series: maintenance and operations of industrial and commercial power systems. IEEE 519: harmonic control in power systems.",
    whyMatters: "IEEE 1100 is the primary reference for power quality and grounding design in DC environments. IEEE 519 defines acceptable harmonic distortion limits — critical for UPS/VFD installations. IEEE 3007 series guides maintenance practices for DC electrical infrastructure.",
    whereUsed: "DC electrical engineering, power quality analysis, UPS system design, grounding system design. Referenced by US-standard-aligned DCs and their equipment OEMs.",
    keyRequirements: [
      "IEEE 1100: Dedicated equipment grounding conductors for sensitive loads. Clean ground reference. Isolated ground system where required.",
      "IEEE 519: Total harmonic distortion (THD) limits at point of common coupling. THD-V < 5% (IEEE 519-2014 for general systems).",
      "IEEE 3007.1: Recommended practice for the operation of industrial and commercial power systems.",
      "IEEE 3007.2: Recommended practice for the maintenance of industrial and commercial power systems.",
    ],
    dcExample: "A US-aligned DC in Hyderabad with high UPS density commissioned a harmonic analysis per IEEE 519. Findings: THD-I at LT panel was 28% (limit 15% for most DC scenarios). Mitigation: passive harmonic filters installed on UPS input feeders. Post-installation THD-I: 9%. Transformer derating and cable heating reduced. Annual power quality audit per IEEE 519.",
    certificationRequired: false,
    aliases: ["IEEE 1100", "Emerald Book", "IEEE 519", "IEEE power standards"],
  },

  // ── EUROPEAN ─────────────────────────────────────────────────────────────────
  {
    id: "en50600",
    name: "EN 50600",
    fullName: "EN 50600: Information Technology — Data Centre Facilities and Infrastructures",
    body: "European Committee for Electrotechnical Standardization (CENELEC)",
    category: "Facility Design",
    categoryColor: "#f97316",
    what: "EN 50600 is the European standard series for data center facilities and infrastructure. It covers building construction (EN 50600-2-1), power distribution (EN 50600-2-2), environmental control (EN 50600-2-3), telecommunications cabling (EN 50600-2-4), security systems (EN 50600-2-5), and management and operational information (EN 50600-3-1). Defines Classes 1-4 (analogous to Uptime Tiers 1-4) and classification methodology.",
    whyMatters: "Mandatory reference for DCs in EU/UK, increasingly referenced in MENA and India for European-aligned deployments. EN 50600-3-1 includes a comprehensive set of KPIs (PUE, WUE, CUE) for DC sustainability reporting — increasingly important for ESG compliance.",
    whereUsed: "European Union member states, UK post-Brexit (BSI BS EN 50600), European government DCs, European multinational DC deployments.",
    keyRequirements: [
      "Classes 1-4: Class 4 equivalent to Uptime Tier IV. Each class defines specific redundancy, availability, and maintainability requirements.",
      "EN 50600-2-2: Power distribution — earthing systems, UPS requirements, generator requirements, power quality.",
      "EN 50600-2-3: Environmental control — temperature, humidity, air cleanliness requirements per IT equipment class.",
      "EN 50600-3-1: Management and operational information — defines PUE, WUE (Water Usage Effectiveness), CUE (Carbon Usage Effectiveness), ERE (Energy Reuse Effectiveness).",
      "EN 50600-4 series: Metrics and performance — measurable KPIs for sustainability.",
    ],
    dcExample: "A European hyperscaler's Frankfurt DC (Class 4) complies with EN 50600 across all parts. Annual EN 50600-3-1 report published publicly: PUE 1.14 (annualised), WUE 0.3 L/kWh (waterside cooling with rainwater capture), CUE 0.08 kgCO2/kWh (92% renewable energy). EN 50600 compliance verified by independent assessor.",
    certificationRequired: false,
    aliases: ["EN 50600", "EN50600", "European DC standard"],
  },
];

/** Category list derived from data for filter UI */
export const STANDARDS_CATEGORIES = [
  ...new Set(STANDARDS.map((s) => s.category)),
].sort();
