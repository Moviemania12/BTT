// ─────────────────────────────────────────────────────────────────────────────
// content/reference/downloads.ts
// Downloadable template and form catalog. Templates rendered as printable HTML.
// ─────────────────────────────────────────────────────────────────────────────

export interface DownloadItem {
  id: string;
  title: string;
  description: string;
  category: string;
  categoryColor: string;
  format: "PDF-ready" | "Excel" | "Word";
  pages: number;
  fields: string[];
  /** Template content rows/sections for preview and print generation */
  sections: DownloadSection[];
}

export interface DownloadSection {
  heading: string;
  rows: DownloadRow[];
}

export interface DownloadRow {
  label: string;
  type: "text" | "checkbox" | "yesno" | "reading" | "signature" | "date";
  note?: string;
  critical?: boolean;
}

export const DOWNLOAD_ITEMS: DownloadItem[] = [
  {
    id: "ups-maintenance-sheet",
    title: "UPS Monthly Maintenance Report",
    description: "Comprehensive UPS inspection and performance record. Covers battery health, load balance, event log review, and OEM PM verification. Used by DC engineers and OEM service teams.",
    category: "Power",
    categoryColor: "#f97316",
    format: "PDF-ready",
    pages: 2,
    fields: ["Site name", "UPS tag", "Date", "Engineer name", "OEM representative"],
    sections: [
      {
        heading: "Site and Equipment Details",
        rows: [
          { label: "Site / DC name", type: "text" },
          { label: "UPS asset tag / equipment ID", type: "text" },
          { label: "UPS make / model", type: "text" },
          { label: "UPS rating (kVA / kW)", type: "text" },
          { label: "Installation date", type: "date" },
          { label: "Date of this inspection", type: "date" },
          { label: "Engineer name and signature", type: "signature" },
        ],
      },
      {
        heading: "UPS Status and Load",
        rows: [
          { label: "UPS operating mode (Normal / Bypass / ECO)", type: "text", critical: true },
          { label: "Input voltage L1-N / L2-N / L3-N (V)", type: "reading" },
          { label: "Input frequency (Hz)", type: "reading" },
          { label: "Output voltage L1-N / L2-N / L3-N (V)", type: "reading" },
          { label: "Output frequency (Hz)", type: "reading" },
          { label: "Load — Phase 1 / Phase 2 / Phase 3 (kW)", type: "reading" },
          { label: "Total load (% of rated)", type: "reading" },
          { label: "UPS efficiency (%)", type: "reading" },
          { label: "Any phase above 80% loading?", type: "yesno", critical: true },
        ],
      },
      {
        heading: "Battery Status",
        rows: [
          { label: "Battery string voltage (total)", type: "reading", critical: true },
          { label: "Float voltage — String A / B / C / D", type: "reading" },
          { label: "Battery temperature (°C)", type: "reading" },
          { label: "Any string below nominal float voltage?", type: "yesno", critical: true },
          { label: "Battery age (years)", type: "reading" },
          { label: "Battery installation date", type: "date" },
          { label: "Physical inspection — any bulging, leakage, corrosion?", type: "yesno", critical: true },
          { label: "Estimated runtime at current load (minutes)", type: "reading" },
        ],
      },
      {
        heading: "Event Log and Alarms",
        rows: [
          { label: "UPS event log downloaded?", type: "checkbox", critical: true },
          { label: "Number of events in last 30 days", type: "reading" },
          { label: "Any bypass events in last 30 days?", type: "yesno", critical: true },
          { label: "Any battery alarms in last 30 days?", type: "yesno", critical: true },
          { label: "Active alarms cleared?", type: "yesno" },
        ],
      },
      {
        heading: "Physical Inspection",
        rows: [
          { label: "Cooling fans operational (no abnormal noise)?", type: "yesno" },
          { label: "Ventilation inlets clean and unobstructed?", type: "checkbox" },
          { label: "No burning smell in UPS cabinet?", type: "checkbox", critical: true },
          { label: "All cable connections tight (no visual looseness)?", type: "checkbox" },
          { label: "Bypass switch in correct position?", type: "checkbox", critical: true },
        ],
      },
      {
        heading: "Sign-Off",
        rows: [
          { label: "Engineer signature", type: "signature" },
          { label: "Supervisor / site manager signature", type: "signature" },
          { label: "OEM representative (if applicable)", type: "signature" },
          { label: "Next scheduled service date", type: "date" },
        ],
      },
    ],
  },
  {
    id: "dg-test-report",
    title: "Generator Monthly Test Report",
    description: "Standard DG set test record for monthly and quarterly test runs. Records pre-start checks, running parameters, load transfer, and post-run readings. Suitable for OEM warranty documentation.",
    category: "Power",
    categoryColor: "#f97316",
    format: "PDF-ready",
    pages: 2,
    fields: ["Site name", "DG tag", "Date", "Engineer name", "Run hours"],
    sections: [
      {
        heading: "Equipment Details",
        rows: [
          { label: "Site / DC name", type: "text" },
          { label: "Generator asset tag / equipment ID", type: "text" },
          { label: "Generator make / model / rating (kVA)", type: "text" },
          { label: "Date and time of test", type: "date" },
          { label: "Test type (Monthly no-load / Quarterly loaded / Annual)", type: "text" },
          { label: "Engineer name and signature", type: "signature" },
        ],
      },
      {
        heading: "Pre-Start Checks",
        rows: [
          { label: "Fuel level (%)", type: "reading", critical: true },
          { label: "Fuel level above 75%?", type: "yesno", critical: true },
          { label: "Engine oil level", type: "text" },
          { label: "Coolant level (header tank)", type: "text" },
          { label: "Starter battery voltage (V)", type: "reading", critical: true },
          { label: "Battery charger operational?", type: "yesno", critical: true },
          { label: "Air filter — visual cleanliness check", type: "text" },
          { label: "Exhaust path clear?", type: "checkbox" },
          { label: "Control panel in AUTO mode?", type: "checkbox", critical: true },
          { label: "All E-stop buttons released?", type: "checkbox", critical: true },
        ],
      },
      {
        heading: "Test Run — During Operation",
        rows: [
          { label: "Start mode used (Auto via ATS / Manual local)", type: "text", critical: true, note: "Must be Auto via ATS for monthly test — not manual pushbutton" },
          { label: "Time from start signal to DG ready (seconds)", type: "reading" },
          { label: "Output voltage L1-L2 / L2-L3 / L1-L3 (V)", type: "reading" },
          { label: "Output frequency (Hz)", type: "reading", critical: true },
          { label: "Oil pressure (bar)", type: "reading" },
          { label: "Coolant temperature (°C)", type: "reading" },
          { label: "Exhaust colour (clear / grey / black / white)", type: "text" },
          { label: "Run duration (minutes)", type: "reading" },
          { label: "Load transferred from grid to DG (loaded test only)?", type: "yesno" },
          { label: "DG kW output under load", type: "reading" },
          { label: "Any alarms or faults during run?", type: "yesno", critical: true },
        ],
      },
      {
        heading: "Post-Run",
        rows: [
          { label: "Cool-down unloaded (5 minutes minimum)?", type: "checkbox" },
          { label: "ATS returned to grid position?", type: "checkbox", critical: true },
          { label: "DG returned to AUTO/Standby mode?", type: "checkbox", critical: true },
          { label: "Run hours meter reading (post-test)", type: "reading" },
          { label: "Fuel consumed during test (litres)", type: "reading" },
          { label: "Post-run oil level check", type: "text" },
          { label: "Post-run coolant level check", type: "text" },
        ],
      },
      {
        heading: "Sign-Off",
        rows: [
          { label: "Test result (Pass / Fail / Conditional)", type: "text", critical: true },
          { label: "If fail: corrective action taken", type: "text" },
          { label: "Next test due date", type: "date" },
          { label: "Engineer signature", type: "signature" },
          { label: "Site manager signature", type: "signature" },
        ],
      },
    ],
  },
  {
    id: "battery-inspection-form",
    title: "UPS Battery String Inspection Form",
    description: "Detailed battery string inspection for VRLA and Li-Ion battery systems. Records per-string voltage, temperature, physical condition, and replacement decision. Use annually and at any battery alarm event.",
    category: "Power",
    categoryColor: "#f97316",
    format: "PDF-ready",
    pages: 3,
    fields: ["UPS asset tag", "Battery type", "Install date", "Inspector name"],
    sections: [
      {
        heading: "Battery System Details",
        rows: [
          { label: "UPS asset tag", type: "text" },
          { label: "Battery type (VRLA AGM / VRLA Gel / Li-Ion)", type: "text" },
          { label: "Number of strings", type: "text" },
          { label: "Cells per string", type: "text" },
          { label: "Nominal string voltage (V)", type: "text" },
          { label: "Battery installation date", type: "date" },
          { label: "Age at inspection (years)", type: "reading" },
          { label: "Date of last capacity test", type: "date" },
          { label: "Result of last capacity test (%)", type: "reading" },
          { label: "PPE worn: insulated gloves, safety glasses?", type: "checkbox", critical: true },
        ],
      },
      {
        heading: "String Measurements (repeat per string)",
        rows: [
          { label: "String ID (A / B / C / D)", type: "text" },
          { label: "Total string voltage at float (V)", type: "reading", critical: true },
          { label: "String voltage deviation from nominal (%)", type: "reading" },
          { label: "String temperature at mid-point (°C)", type: "reading" },
          { label: "Temperature above ambient by more than 5°C?", type: "yesno", critical: true },
          { label: "Terminal torque check (per OEM spec)", type: "checkbox" },
          { label: "Any terminal corrosion or oxidation visible?", type: "yesno", critical: true },
        ],
      },
      {
        heading: "Physical Inspection",
        rows: [
          { label: "Any battery cases bulging?", type: "yesno", critical: true },
          { label: "Any electrolyte leakage (wet patches, salt deposits)?", type: "yesno", critical: true },
          { label: "Any burned or overheated terminals?", type: "yesno", critical: true },
          { label: "Battery room / cabinet temperature (°C)", type: "reading" },
          { label: "Battery room temperature within 20-25°C?", type: "yesno" },
        ],
      },
      {
        heading: "Replacement Decision",
        rows: [
          { label: "Recommend replacement? (Yes / No / Within 6 months)", type: "text", critical: true },
          { label: "Basis for recommendation", type: "text" },
          { label: "If Yes: target replacement date", type: "date" },
        ],
      },
      {
        heading: "Sign-Off",
        rows: [
          { label: "Inspector name and signature", type: "signature" },
          { label: "Site manager signature", type: "signature" },
          { label: "OEM representative (if applicable)", type: "signature" },
          { label: "Date of next inspection", type: "date" },
        ],
      },
    ],
  },
  {
    id: "rack-audit-sheet",
    title: "Rack Audit Sheet",
    description: "Physical rack audit for asset verification, power reading, cable management, and blanking panel status. Used during quarterly audits and before capacity additions.",
    category: "Operations",
    categoryColor: "#475569",
    format: "PDF-ready",
    pages: 1,
    fields: ["Rack ID", "Zone", "Auditor", "Date"],
    sections: [
      {
        heading: "Rack Identity",
        rows: [
          { label: "Rack ID / asset tag", type: "text" },
          { label: "Zone / row / position", type: "text" },
          { label: "Assigned customer / team", type: "text" },
          { label: "Date of audit", type: "date" },
          { label: "Auditor name", type: "signature" },
        ],
      },
      {
        heading: "Power",
        rows: [
          { label: "PDU-A asset tag", type: "text" },
          { label: "PDU-A current draw (A per phase)", type: "reading" },
          { label: "PDU-A kW reading", type: "reading" },
          { label: "PDU-B asset tag (if dual-corded)", type: "text" },
          { label: "PDU-B current draw (A per phase)", type: "reading" },
          { label: "PDU-B kW reading", type: "reading" },
          { label: "Total rack power draw (kW)", type: "reading" },
          { label: "Power draw matches CMDB allocation?", type: "yesno" },
        ],
      },
      {
        heading: "Asset Inventory",
        rows: [
          { label: "Rack Units occupied (U)", type: "reading" },
          { label: "Rack Units empty (U)", type: "reading" },
          { label: "All empty Us have blanking panels?", type: "yesno", critical: true },
          { label: "All assets have asset tags?", type: "checkbox" },
          { label: "Assets in rack match CMDB records?", type: "yesno" },
          { label: "Any unidentified equipment?", type: "yesno", critical: true },
        ],
      },
      {
        heading: "Cable Management",
        rows: [
          { label: "Front airflow unobstructed by cables?", type: "yesno", critical: true },
          { label: "All cables labeled at both ends?", type: "checkbox" },
          { label: "No cables on floor of rack or in walkway?", type: "checkbox" },
          { label: "Velcro / cable ties used (not cable cutters for removal)?", type: "checkbox" },
        ],
      },
      {
        heading: "Thermal",
        rows: [
          { label: "Rack inlet temperature (°C)", type: "reading" },
          { label: "Inlet temperature within 18-27°C?", type: "yesno", critical: true },
          { label: "Any servers with amber/red fault LEDs?", type: "yesno", critical: true },
        ],
      },
    ],
  },
  {
    id: "incident-report-template",
    title: "Incident Report Template",
    description: "Standard incident report for DC operational events. Covers timeline, impact, immediate actions, root cause, and corrective actions. Suitable for P1-P3 incidents and customer reporting.",
    category: "Operations",
    categoryColor: "#475569",
    format: "PDF-ready",
    pages: 2,
    fields: ["Incident ID", "Date/Time", "Category", "Severity", "Resolver"],
    sections: [
      {
        heading: "Incident Summary",
        rows: [
          { label: "Incident ID / ticket number", type: "text" },
          { label: "Date and time of detection", type: "date" },
          { label: "Date and time of resolution", type: "date" },
          { label: "Duration (minutes)", type: "reading" },
          { label: "Severity (P1 / P2 / P3 / P4)", type: "text", critical: true },
          { label: "Category (Power / Cooling / Network / Server / Fire / Security / Cloud)", type: "text" },
          { label: "Incident title (one line)", type: "text" },
          { label: "Systems affected", type: "text" },
          { label: "Customers affected", type: "text" },
          { label: "SLA breach? (Yes / No)", type: "yesno", critical: true },
        ],
      },
      {
        heading: "Timeline of Events",
        rows: [
          { label: "Detection time and method (monitoring / customer / engineer)", type: "text" },
          { label: "First response action and time", type: "text" },
          { label: "Escalation time and to whom", type: "text" },
          { label: "Customer notification time", type: "text" },
          { label: "Resolution action and time", type: "text" },
          { label: "Service restoration confirmed time", type: "text" },
          { label: "Post-incident communication sent", type: "text" },
        ],
      },
      {
        heading: "Root Cause Analysis",
        rows: [
          { label: "Immediate cause", type: "text" },
          { label: "Root cause (5 Whys)", type: "text" },
          { label: "Contributing factors", type: "text" },
        ],
      },
      {
        heading: "Corrective and Preventive Actions",
        rows: [
          { label: "Immediate corrective action taken", type: "text" },
          { label: "Preventive action 1 (owner / due date)", type: "text" },
          { label: "Preventive action 2 (owner / due date)", type: "text" },
          { label: "Preventive action 3 (owner / due date)", type: "text" },
          { label: "Monitoring improvement (if applicable)", type: "text" },
        ],
      },
      {
        heading: "Sign-Off",
        rows: [
          { label: "Incident manager signature", type: "signature" },
          { label: "Operations manager signature", type: "signature" },
          { label: "Customer sign-off (if P1 SLA breach)", type: "signature" },
          { label: "Report date", type: "date" },
        ],
      },
    ],
  },
  {
    id: "rca-template",
    title: "Root Cause Analysis (RCA) Template",
    description: "Structured RCA for DC incidents using 5 Whys, fishbone analysis, and timeline. Produces a professional RCA document suitable for management review and customer sharing.",
    category: "Operations",
    categoryColor: "#475569",
    format: "PDF-ready",
    pages: 3,
    fields: ["Incident reference", "RCA lead", "Date of RCA", "Review date"],
    sections: [
      {
        heading: "Incident Reference",
        rows: [
          { label: "Incident ID", type: "text" },
          { label: "Incident date and time", type: "date" },
          { label: "RCA lead name and role", type: "text" },
          { label: "RCA team members", type: "text" },
          { label: "RCA completion date", type: "date" },
        ],
      },
      {
        heading: "Incident Summary",
        rows: [
          { label: "What happened? (2-3 sentences)", type: "text" },
          { label: "What was the impact?", type: "text" },
          { label: "How was it detected?", type: "text" },
          { label: "How was it resolved?", type: "text" },
        ],
      },
      {
        heading: "5 Whys Analysis",
        rows: [
          { label: "Problem statement", type: "text", critical: true },
          { label: "Why #1: Why did the problem occur?", type: "text" },
          { label: "Why #2: Why did that happen?", type: "text" },
          { label: "Why #3: Why did that happen?", type: "text" },
          { label: "Why #4: Why did that happen?", type: "text" },
          { label: "Why #5: Why did that happen?", type: "text" },
          { label: "Root cause statement", type: "text", critical: true },
        ],
      },
      {
        heading: "Action Items",
        rows: [
          { label: "Corrective action 1: description / owner / due date", type: "text" },
          { label: "Corrective action 2: description / owner / due date", type: "text" },
          { label: "Preventive action 1: description / owner / due date", type: "text" },
          { label: "Preventive action 2: description / owner / due date", type: "text" },
          { label: "Detective action (monitoring improvement): description / owner / due date", type: "text" },
        ],
      },
      {
        heading: "Approval",
        rows: [
          { label: "RCA lead signature", type: "signature" },
          { label: "Operations manager signature", type: "signature" },
          { label: "Management review date", type: "date" },
        ],
      },
    ],
  },
  {
    id: "change-management-form",
    title: "Change Management Request Form",
    description: "Standard Change Request Form (RFC) for DC infrastructure changes. Covers impact assessment, rollback plan, CAB approval, and post-change verification. Aligned with ITIL and ISO 20000 change management practices.",
    category: "Operations",
    categoryColor: "#475569",
    format: "PDF-ready",
    pages: 2,
    fields: ["RFC number", "Requester", "System affected", "Requested date"],
    sections: [
      {
        heading: "Change Request Details",
        rows: [
          { label: "RFC number (auto-generated by ITSM)", type: "text" },
          { label: "Change title", type: "text" },
          { label: "Change type (Standard / Normal / Emergency)", type: "text", critical: true },
          { label: "Requested by (name and role)", type: "text" },
          { label: "System(s) affected", type: "text" },
          { label: "Proposed change date and time", type: "date" },
          { label: "Estimated duration", type: "text" },
          { label: "Maintenance window required?", type: "yesno" },
        ],
      },
      {
        heading: "Change Description",
        rows: [
          { label: "Reason for change", type: "text" },
          { label: "Description of change (step-by-step)", type: "text", critical: true },
          { label: "Configuration items (CIs) affected", type: "text" },
          { label: "Systems / customers impacted during change", type: "text" },
          { label: "Expected service impact (downtime / degradation / none)", type: "text" },
        ],
      },
      {
        heading: "Risk and Rollback",
        rows: [
          { label: "Change risk (Low / Medium / High / Critical)", type: "text", critical: true },
          { label: "Risk justification", type: "text" },
          { label: "Rollback plan — exact steps to reverse change", type: "text", critical: true },
          { label: "Decision point: if X occurs → rollback immediately", type: "text", critical: true },
          { label: "Backup of current configuration taken?", type: "checkbox", critical: true },
        ],
      },
      {
        heading: "Approval",
        rows: [
          { label: "Requester signature", type: "signature" },
          { label: "Technical reviewer signature", type: "signature" },
          { label: "CAB / change manager approval", type: "signature", critical: true },
          { label: "Customer notification sent (if applicable)", type: "checkbox" },
          { label: "CAB approval date", type: "date" },
        ],
      },
      {
        heading: "Post-Change Verification",
        rows: [
          { label: "Change implemented as planned? (Yes / No / Partial)", type: "text" },
          { label: "Verification steps completed?", type: "checkbox", critical: true },
          { label: "Any issues encountered during implementation?", type: "yesno" },
          { label: "Configuration backup taken (post-change)?", type: "checkbox" },
          { label: "Change closed: success / rollback / escalation", type: "text" },
          { label: "Implementer signature", type: "signature" },
          { label: "Change close date", type: "date" },
        ],
      },
    ],
  },
  {
    id: "capacity-planning-sheet",
    title: "DC Capacity Planning Worksheet",
    description: "Power, cooling, space, and network capacity tracking worksheet for quarterly capacity reviews. Shows installed vs allocated vs measured vs available capacity across all dimensions.",
    category: "Planning",
    categoryColor: "#16a34a",
    format: "PDF-ready",
    pages: 2,
    fields: ["DC name", "Quarter", "Capacity planner", "Review date"],
    sections: [
      {
        heading: "Review Details",
        rows: [
          { label: "DC name / zone", type: "text" },
          { label: "Review quarter and year", type: "text" },
          { label: "Capacity planner name", type: "text" },
          { label: "Review date", type: "date" },
        ],
      },
      {
        heading: "Power Capacity",
        rows: [
          { label: "UPS rated capacity (kW)", type: "reading" },
          { label: "Power installed — total nameplate (kW)", type: "reading" },
          { label: "Power allocated (kW)", type: "reading" },
          { label: "Power measured — actual draw (kW)", type: "reading", critical: true },
          { label: "Power available (kW) = Rated × 0.8 − Allocated", type: "reading" },
          { label: "Power utilisation (%) = Measured / Rated", type: "reading" },
          { label: "Stranded capacity (kW) = Allocated − Measured", type: "reading" },
          { label: "Months at current growth rate until 80% capacity", type: "reading" },
        ],
      },
      {
        heading: "Cooling Capacity",
        rows: [
          { label: "Total cooling capacity installed (kW)", type: "reading" },
          { label: "Cooling capacity available at N+1 (kW)", type: "reading" },
          { label: "Current IT load requiring cooling (kW)", type: "reading" },
          { label: "Cooling utilisation (%) at N+1", type: "reading" },
          { label: "Months until cooling constraint (at N+1)", type: "reading" },
        ],
      },
      {
        heading: "Space Capacity",
        rows: [
          { label: "Total rack positions", type: "reading" },
          { label: "Racks installed", type: "reading" },
          { label: "Racks allocated (customer committed)", type: "reading" },
          { label: "Racks available", type: "reading" },
          { label: "Space utilisation (%)", type: "reading" },
        ],
      },
      {
        heading: "Planning Actions",
        rows: [
          { label: "Constraint identified (Power / Cooling / Space / Network)", type: "text" },
          { label: "Months to constraint at current growth rate", type: "reading" },
          { label: "Recommended capacity expansion action", type: "text" },
          { label: "Target date for expansion", type: "date" },
          { label: "CAPEX estimate for expansion", type: "text" },
          { label: "Approved by", type: "signature" },
        ],
      },
    ],
  },
];

export const DOWNLOAD_CATEGORIES = [
  ...new Set(DOWNLOAD_ITEMS.map((d) => d.category)),
].sort();
