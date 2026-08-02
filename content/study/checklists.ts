import type { Checklist } from "./types";

// ─────────────────────────────────────────────────────────────────────────────
// content/study/checklists.ts
// All checklist data. Add new checklists here — page auto-renders.
// ─────────────────────────────────────────────────────────────────────────────

export const CHECKLISTS: Checklist[] = [
  // ── DAILY ──────────────────────────────────────────────────────────────────
  {
    id: "daily-ops",
    title: "Daily Operations Checklist",
    color: "#2563EB",
    freq: "Every Shift / Daily",
    duration: "30-45 min",
    desc: "Shift engineer walkthrough — visual inspection, equipment status, alarm review. Non-negotiable routine every shift. Start shift with this, end shift confirming all clear.",
    sections: [
      {
        heading: "Power Infrastructure",
        items: [
          { text: "UPS status — all units in Normal mode (not bypass, not fault)", critical: true },
          { text: "UPS battery status — on charge, no cell alarms", critical: true },
          { text: "UPS load reading — record per-phase kW and compare to yesterday", note: "Alert if >20% deviation without explanation" },
          { text: "ATS position — Grid or DG active? Note if DG is running", critical: true },
          { text: "PDU circuit breaker status — any tripped breakers?" },
          { text: "Generator fuel level — above 75%? Record exact percentage", critical: true },
          { text: "Generator status — Standby/Auto mode (not Manual/Off)", critical: true },
          { text: "Generator oil level and coolant level — visual check" },
          { text: "Generator starter battery voltage — record reading (24-27V for 24V system)" },
          { text: "HT yard inspection (if applicable) — outdoor equipment, breaker positions" },
        ],
      },
      {
        heading: "Cooling",
        items: [
          { text: "All CRAC/CRAH/PAC units — operational, no fault alarms", critical: true },
          { text: "CRAC/PAC supply temperature — within setpoint ±2°C" },
          { text: "CRAC/PAC return temperature — within design range" },
          { text: "Chiller plant (if applicable) — status, CHW supply temp, flow rate" },
          { text: "Cooling tower (if applicable) — fan running, water level, drift eliminators intact" },
          { text: "DCIM thermal map — any red zones (>28°C inlet)?", critical: true },
          { text: "Hot aisle containment — no open panels, missing doors, visible air bypass" },
        ],
      },
      {
        heading: "IT Equipment and Server Hall",
        items: [
          { text: "Walk all aisles — any amber/red indicator lights on servers or network equipment?" },
          { text: "Physical security — all cage/suite doors secured, no unauthorized access", critical: true },
          { text: "Cable management — no cables on floor, no trip hazards" },
          { text: "Fire suppression panel — normal mode, no faults or activations", critical: true },
          { text: "Water leak detection sensors — no alarms" },
          { text: "Smoke detectors — no active alarms, no fault indicators" },
        ],
      },
      {
        heading: "BMS / DCIM / Monitoring",
        items: [
          { text: "BMS alarm review — clear active alarms or categorize with action plan", critical: true },
          { text: "DCIM dashboard — PUE reading noted and trended" },
          { text: "Monitoring system — all agents reporting, no stale data" },
          { text: "Previous shift handover review — any pending items?" },
          { text: "Shift log entry — record all readings, observations, anomalies" },
        ],
      },
    ],
  },

  // ── WEEKLY ─────────────────────────────────────────────────────────────────
  {
    id: "weekly-ops",
    title: "Weekly Operations Checklist",
    color: "#7c3aed",
    freq: "Weekly",
    duration: "1-2 hours",
    desc: "Deeper weekly health check — equipment inspection, cleaning, log review, trend analysis. Go beyond daily visual checks to catch slow-developing issues.",
    sections: [
      {
        heading: "Power",
        items: [
          { text: "UPS weekly event log review — any recurring faults, battery warnings?" },
          { text: "UPS load trend — week-on-week comparison. Growing?" },
          { text: "Generator starter battery voltage — record and trend", note: "Replace if consistently below 24V for 24V system" },
          { text: "Generator fuel consumption check — calculate usage vs expected" },
          { text: "PDU circuit loading review — any circuits above 80%?" },
          { text: "MLTDB/LT panel: Check for warm spots with infrared thermometer on all connections" },
        ],
      },
      {
        heading: "Cooling",
        items: [
          { text: "CRAC/PAC filter status inspection — dirty? Schedule replacement if needed" },
          { text: "CRAC/PAC supply air temperature trend — week-on-week" },
          { text: "Cooling tower water level and chemical dosing check (if applicable)" },
          { text: "Cold aisle temperature uniformity check — any racks significantly different?" },
          { text: "Containment hardware — any damaged panels, bent doors, open gaps?" },
        ],
      },
      {
        heading: "IT and Network",
        items: [
          { text: "Network interface error counters — any switch ports with increasing CRC errors?" },
          { text: "Core switch CPU and memory utilization trend" },
          { text: "Firewall session table utilization — not approaching maximum?" },
          { text: "Bandwidth utilization — any WAN links consistently above 70%?" },
          { text: "Server hardware health — any servers with persistent amber LEDs or IPMI warnings?" },
        ],
      },
      {
        heading: "Documentation",
        items: [
          { text: "Open ticket review — any tickets open >7 days without update?" },
          { text: "Planned maintenance for coming week — resources confirmed?" },
          { text: "Deferred maintenance register — anything overdue?" },
          { text: "Customer complaint log — any patterns requiring escalation?" },
        ],
      },
    ],
  },

  // ── UPS MONTHLY ─────────────────────────────────────────────────────────────
  {
    id: "ups-monthly",
    title: "UPS Monthly Maintenance Checklist",
    color: "#f97316",
    freq: "Monthly",
    duration: "1-2 hours",
    desc: "Monthly UPS health check — battery inspection, load measurement, alarm audit. Do this before monsoon season (humidity) and before summer (temperature impact on batteries).",
    sections: [
      {
        heading: "Before You Start",
        items: [
          { text: "Maintenance window approved — no workload activity during check", critical: true },
          { text: "PPE ready — insulated gloves, safety glasses, arc flash gear", critical: true },
          { text: "Maintenance bypass plan confirmed — know bypass procedure before starting" },
          { text: "OEM contact number available — in case of issue during maintenance" },
          { text: "DCIM/BMS monitoring — someone watching alarms during maintenance" },
          { text: "Permit to work issued if required by site procedure", critical: true },
        ],
      },
      {
        heading: "UPS Status Review",
        items: [
          { text: "UPS event log download — review last 30 days" },
          { text: "Battery runtime test — record minutes at current load", note: "Compare to last month — declining runtime = battery degrading" },
          { text: "Per-phase load balance — phases within 10% of each other?" },
          { text: "Input voltage and frequency — within spec (415V ±10%, 50Hz ±1Hz)" },
          { text: "Output voltage — within spec (415V ±5%)" },
          { text: "UPS efficiency — compare to rated efficiency at current load" },
        ],
      },
      {
        heading: "Battery Inspection",
        items: [
          { text: "Battery string voltage — overall and per-string", critical: true },
          { text: "Battery float voltage — each string within OEM spec" },
          { text: "Battery temperature — each string within 5°C of ambient", note: "Hot batteries = imminent failure. 30°C+ VRLA = significant life reduction" },
          { text: "Physical inspection — any bulging, leaking, corrosion on terminals?", critical: true },
          { text: "Battery room/cabinet temperature — 20-25°C for VRLA" },
          { text: "Battery age — note date, flag if >4 years VRLA for replacement consideration" },
          { text: "Battery terminal torque — check per OEM spec" },
        ],
      },
      {
        heading: "Physical Inspection",
        items: [
          { text: "Filter/ventilation — clean cooling vents of dust" },
          { text: "Fan operation — all internal fans running, no abnormal noise" },
          { text: "Cable insulation — inspect accessible wiring, no discoloration" },
          { text: "Capacitor visual — no bulging or leakage in UPS cabinet" },
          { text: "No burnt smell inside UPS cabinet" },
          { text: "Bypass contacts — clean, no oxidation on manual bypass switch" },
        ],
      },
      {
        heading: "Documentation",
        items: [
          { text: "Record all readings in maintenance log with date and engineer name" },
          { text: "Compare with last 3 months — any concerning trends?" },
          { text: "Update CMDB with current battery status, next recommended replacement date" },
          { text: "Open ticket for any findings needing follow-up" },
        ],
      },
    ],
  },

  // ── DG MONTHLY ──────────────────────────────────────────────────────────────
  {
    id: "dg-monthly",
    title: "DG Set Monthly Test Checklist",
    color: "#dc2626",
    freq: "Monthly (loaded test quarterly)",
    duration: "45-60 min",
    desc: "Monthly test run. Loaded test quarterly minimum — DG must actually carry DC load, not just spin. Many failures only surface under real load.",
    sections: [
      {
        heading: "Pre-Start Checks",
        items: [
          { text: "Fuel level — >75% minimum before test. Top up if needed", critical: true },
          { text: "Engine oil level — dipstick check, within min-max marks", critical: true },
          { text: "Coolant level — radiator header tank at MAX mark" },
          { text: "Air filter — visual cleanliness check" },
          { text: "Starter battery voltage — 24-27V for 24V system", critical: true },
          { text: "Battery charger operation — green LED, trickle charging" },
          { text: "Exhaust system — clear of obstructions" },
          { text: "Fuel lines — no visible leaks, fuel solenoid valve in auto position" },
          { text: "Control panel — in AUTO mode for remote/ATS start" },
          { text: "E-Stop buttons — none activated, all released" },
        ],
      },
      {
        heading: "During Test Run",
        items: [
          { text: "Manual start test — DG starts within 10 seconds", note: "More than 10s start time = investigate" },
          { text: "Output voltage — 415V ±10% before load transfer" },
          { text: "Output frequency — 50Hz ±2Hz", critical: true },
          { text: "Run unloaded 5 minutes — oil pressure and temperature stabilize" },
          { text: "Oil pressure reading — within OEM spec (typically 3-5 bar)" },
          { text: "Coolant temperature — rising normally, not overheating" },
          { text: "Exhaust color — no black smoke (rich mixture) or white smoke (coolant)" },
          { text: "Vibration — no abnormal vibration, anti-vibration mounts intact" },
          { text: "Loaded test (quarterly only) — ATS transfer, voltage stable under load" },
        ],
      },
      {
        heading: "Post-Test",
        items: [
          { text: "Unload DG before shutdown — cool-down 5 minutes at no-load" },
          { text: "Return ATS to grid position" },
          { text: "Return DG to AUTO/standby mode", critical: true },
          { text: "Post-run oil and coolant levels — any consumption?" },
          { text: "Any alarms or faults during run?" },
          { text: "Run hours meter reading — note for maintenance schedule" },
          { text: "Record fuel consumption during test" },
          { text: "Log entry: date, duration, results, findings, engineer name" },
        ],
      },
    ],
  },

  // ── CRAC MONTHLY ────────────────────────────────────────────────────────────
  {
    id: "crac-monthly",
    title: "CRAC / PAC Monthly Maintenance Checklist",
    color: "#0284c7",
    freq: "Monthly",
    duration: "30-45 min per unit",
    desc: "Monthly precision cooling unit inspection. Done on all units in rotation. Cooling failure is the #2 cause of DC downtime after power issues.",
    sections: [
      {
        heading: "Operational Parameters",
        items: [
          { text: "Supply air temperature — within setpoint ±2°C" },
          { text: "Return air temperature — within expected range" },
          { text: "Temperature differential (delta-T) — compare to baseline" },
          { text: "Power consumption — compare to baseline (high = efficiency issue)" },
          { text: "Operating hours counter — note for filter/maintenance scheduling" },
        ],
      },
      {
        heading: "Physical Inspection",
        items: [
          { text: "Air filter condition — dirty? Replace if visual inspection fails", critical: true },
          { text: "Evaporator coil — frost or ice present? (Low refrigerant or airflow issue)", critical: true },
          { text: "Drain pan — clean, no debris, drain line not blocked" },
          { text: "Blower fan — unusual noise? Vibration? Bearing sound?" },
          { text: "Cabinet — all panels secured, no gaps" },
          { text: "Electrical connections — any loose connections, discoloration?" },
        ],
      },
      {
        heading: "Refrigerant Circuit (Visual Only)",
        items: [
          { text: "Suction line insulation — intact, no gaps or damage" },
          { text: "Any oil staining around pipe connections — possible refrigerant leak indicator" },
          { text: "Condenser unit (if split system) — fins clean, fan running, no debris" },
          { text: "No frost on suction line at compressor — indicates low refrigerant" },
        ],
      },
      {
        heading: "Documentation",
        items: [
          { text: "Record all readings with date and engineer name" },
          { text: "Note any anomalies for follow-up with cooling contractor" },
          { text: "Update maintenance history log" },
          { text: "Filter replacement recorded with date and filter part number" },
        ],
      },
    ],
  },

  // ── NETWORK MONTHLY ─────────────────────────────────────────────────────────
  {
    id: "network-monthly",
    title: "Network Health Monthly Checklist",
    color: "#7c3aed",
    freq: "Monthly",
    duration: "1-2 hours",
    desc: "Monthly network health review — capacity trends, error rates, security config drift. Proactive review catches issues before they become incidents.",
    sections: [
      {
        heading: "Core Switch / Spine",
        items: [
          { text: "CPU utilization — >60% sustained is concerning, >80% critical" },
          { text: "Memory utilization — trend month-on-month" },
          { text: "Interface error counters — CRC errors, input errors, output drops?", note: "Non-zero increasing counters = investigate immediately" },
          { text: "Interface utilization — any links consistently >70% peak?" },
          { text: "STP topology — no unexpected topology changes in log" },
          { text: "Routing table size — normal? Any unexpected routes?" },
          { text: "BGP/OSPF neighbor status — all established, stable uptime?" },
          { text: "Firmware version — current? Any security CVEs outstanding?" },
        ],
      },
      {
        heading: "Firewalls / Security",
        items: [
          { text: "Session table utilization — not approaching maximum?" },
          { text: "CPU/memory within normal range" },
          { text: "Rule base review — any temporary rules that became permanent?" },
          { text: "Security log review — any intrusion attempts, blocked suspicious traffic?" },
          { text: "VPN tunnel status — all configured tunnels UP?" },
          { text: "Certificate expiry check — VPN certs, management interface certs" },
          { text: "Threat intelligence signatures — current?" },
        ],
      },
      {
        heading: "WAN / Internet",
        items: [
          { text: "ISP bandwidth utilization — monthly 95th percentile peak" },
          { text: "Latency to key destinations — within SLA?" },
          { text: "BGP routes from ISP — correct AS-PATH?" },
          { text: "Dual ISP failover test — quarterly minimum", note: "Test failover, confirm traffic switches, confirm restoration" },
        ],
      },
      {
        heading: "Documentation",
        items: [
          { text: "Network diagram update — any changes since last review?" },
          { text: "IP allocation registry (IPAM) — up to date?" },
          { text: "Unused ports — identify and disable (security hygiene)" },
          { text: "Configuration backup — latest backup stored securely?" },
        ],
      },
    ],
  },

  // ── SERVER HEALTH MONTHLY ───────────────────────────────────────────────────
  {
    id: "server-health-monthly",
    title: "Server Health Monthly Checklist",
    color: "#475569",
    freq: "Monthly",
    duration: "1-2 hours",
    desc: "Monthly server fleet health review — hardware alerts, disk health, resource utilization trends. Catch hardware failures before they cause unplanned downtime.",
    sections: [
      {
        heading: "Hardware Health",
        items: [
          { text: "iDRAC/iLO system event log review — all servers. Any hardware faults?", critical: true },
          { text: "Storage controller event log — any disk errors, RAID rebuilds, predictive failures?" },
          { text: "Memory status — any correctable/uncorrectable error counts increasing?" },
          { text: "CPU health — any thermal alerts, throttling events?" },
          { text: "Fan status — all fans reported healthy by IPMI?" },
          { text: "Power supply status — all PSUs healthy? Both PSUs in dual-corded servers?" },
          { text: "Physical LED inspection — walkthrough for any amber/red indicators" },
        ],
      },
      {
        heading: "Disk Health",
        items: [
          { text: "SMART status for all disks — any drives reporting Pre-fail?" },
          { text: "RAID group status — all groups Optimal? Any Degraded?" },
          { text: "Disk temperature — all disks within OEM spec?" },
          { text: "Disk age — any drives approaching 5+ years? Flag for replacement planning" },
          { text: "Hot spare status — hot spare present and ready for each RAID group?" },
        ],
      },
      {
        heading: "Resource Utilization",
        items: [
          { text: "CPU utilization trend — month-on-month. Any server consistently >80%?" },
          { text: "Memory utilization trend — any servers running low?" },
          { text: "Disk I/O trends — latency or throughput issues?" },
          { text: "VM consolidation ratio — healthy? Over-committed?" },
          { text: "Growth projection — will current capacity sustain next 6 months?" },
        ],
      },
      {
        heading: "Firmware and Patching",
        items: [
          { text: "OS patching status — all servers current per patch policy?" },
          { text: "BIOS/UEFI firmware version — any security updates outstanding?" },
          { text: "iDRAC/iLO firmware — current?" },
          { text: "Driver versions — NIC, HBA, storage controller drivers current?" },
        ],
      },
    ],
  },

  // ── FIRE SYSTEM MONTHLY ─────────────────────────────────────────────────────
  {
    id: "fire-monthly",
    title: "Fire Detection and Suppression Monthly Checklist",
    color: "#dc2626",
    freq: "Monthly",
    duration: "45-60 min",
    desc: "Monthly fire system health check. Fire system is life safety — any degradation must be escalated immediately. Never defer fire system maintenance.",
    sections: [
      {
        heading: "Fire Panel",
        items: [
          { text: "Fire panel — in normal mode, no faults or active alarms", critical: true },
          { text: "All zones shown as normal — no disabled zones without documented justification" },
          { text: "Fire panel event log review — last 30 days. Any spurious alarms?" },
          { text: "Fire panel battery test — standby battery holding charge?", critical: true },
        ],
      },
      {
        heading: "VESDA System",
        items: [
          { text: "VESDA panel in normal mode — no alert or alarm levels active" },
          { text: "Sampling pipe flow rates — within OEM specified range" },
          { text: "VESDA event log — any alarm history in last 30 days?" },
          { text: "Filter cartridge condition — replacement due?" },
          { text: "VESDA sampling points accessible — none blocked or obstructed" },
        ],
      },
      {
        heading: "Smoke Detectors",
        items: [
          { text: "Conventional smoke detectors — no fault indicators on panel" },
          { text: "Detector LED test (where possible without discharge) — responding?" },
          { text: "Detectors physically intact — no missing covers, damage, vandalism" },
          { text: "Under-floor detectors (if installed) — accessible and not obstructed" },
        ],
      },
      {
        heading: "Clean Agent Suppression",
        items: [
          { text: "Cylinder pressure gauges — all within green zone", critical: true },
          { text: "Cylinder weight check — compare to last check. Any loss?" },
          { text: "Discharge nozzles — not obstructed, physically intact" },
          { text: "Room integrity — any new penetrations not sealed?" },
          { text: "Suppression system in AUTO mode", critical: true },
          { text: "Manual release buttons — clearly labeled, accessible, not obscured" },
        ],
      },
    ],
  },

  // ── BMS MONTHLY ─────────────────────────────────────────────────────────────
  {
    id: "bms-monthly",
    title: "BMS (Building Management System) Monthly Checklist",
    color: "#0369a1",
    freq: "Monthly",
    duration: "1 hour",
    desc: "Monthly BMS health check — system performance, point accuracy, alarm quality, integration verification. BMS is the nervous system of the DC facility.",
    sections: [
      {
        heading: "BMS System Health",
        items: [
          { text: "BMS server — online, services running, database not full" },
          { text: "BMS controller communication — all field controllers responsive" },
          { text: "BACnet/Modbus network status — no communication errors" },
          { text: "BMS backup — recent backup of configuration and database completed?" },
          { text: "BMS software license — valid, not expiring within 90 days?" },
        ],
      },
      {
        heading: "Alarm Quality",
        items: [
          { text: "Nuisance alarm rate — calculate % of alarms that required no action" },
          { text: "Any alarm that has been in acknowledged/suppressed state >7 days? Document reason", critical: true },
          { text: "Alarm thresholds review — are setpoints appropriate for current conditions?" },
          { text: "Alarm escalation procedures — are mobile alerts/emails going to correct personnel?" },
        ],
      },
      {
        heading: "Point Accuracy",
        items: [
          { text: "Temperature sensor spot-check — compare 5 BMS readings to handheld thermometer" },
          { text: "Humidity sensor spot-check — compare to calibrated hygrometer" },
          { text: "Power meter accuracy — compare to UPS panel reading" },
          { text: "Any analog points showing stuck values (same reading for hours)?" },
        ],
      },
      {
        heading: "Integration",
        items: [
          { text: "DCIM integration — BMS data flowing to DCIM system correctly?" },
          { text: "UPS SNMP data in BMS — current and accurate?" },
          { text: "Generator status points — updating correctly?" },
          { text: "Trend data collection — all configured trends recording?" },
        ],
      },
    ],
  },

  // ── ACCESS CONTROL MONTHLY ──────────────────────────────────────────────────
  {
    id: "access-control-monthly",
    title: "Access Control Monthly Checklist",
    color: "#64748b",
    freq: "Monthly",
    duration: "1-2 hours",
    desc: "Monthly physical security and access control review. Access control hygiene prevents unauthorized access — often more important than cyber security in DC environments.",
    sections: [
      {
        heading: "Access Control System",
        items: [
          { text: "ACS server — online, services running, database backup current" },
          { text: "Card reader status — all readers online and responding" },
          { text: "Door status monitoring — no doors propped open in restricted areas", critical: true },
          { text: "Forced entry alarms in last 30 days — any events? Investigated?" },
        ],
      },
      {
        heading: "Access Rights Review",
        items: [
          { text: "Leavers: All departed employees access revoked within 24 hours of exit?", critical: true },
          { text: "Contractor access — all temporary access for this month's vendors valid?" },
          { text: "Dormant cards — any cards not used in 90+ days? Review and potentially revoke" },
          { text: "Privileged access (DC hall, critical rooms) — list verified against need-to-access" },
          { text: "Default/master codes changed after any contractor work?" },
        ],
      },
      {
        heading: "CCTV",
        items: [
          { text: "All cameras operational — no offline cameras" },
          { text: "Recording storage — sufficient capacity for retention period?" },
          { text: "Camera coverage — any blind spots introduced by new equipment?" },
          { text: "Image quality spot-check — can you identify persons clearly?" },
          { text: "Retention period compliance — footage retained per policy (min 30-90 days)?" },
        ],
      },
      {
        heading: "Physical Security",
        items: [
          { text: "Perimeter security hardware — gates, barriers, locks in working order" },
          { text: "Visitor log review — all visitors signed in, escorted, signed out?" },
          { text: "Security incident log review — any tailgating, forced entry, or anomalies?" },
          { text: "Alarm panel (intruder) — all zones armed/normal, no faults" },
        ],
      },
    ],
  },

  // ── QUARTERLY ───────────────────────────────────────────────────────────────
  {
    id: "quarterly-ops",
    title: "Quarterly Operations and Maintenance Checklist",
    color: "#16a34a",
    freq: "Quarterly",
    duration: "Full day",
    desc: "Quarterly deep maintenance — more thorough than monthly. Includes tests, calibrations, and reviews that monthly checks don't cover. Plan a full shift for this.",
    sections: [
      {
        heading: "Power",
        items: [
          { text: "UPS battery capacity test (discharge test) — actual runtime vs expected", critical: true },
          { text: "Generator loaded test — full load transfer, sustained operation under actual DC load", critical: true },
          { text: "ATS transfer test — complete sequence: grid fail → DG start → transfer → restoration" },
          { text: "UPS parallel operation test (if applicable) — verify load sharing" },
          { text: "Thermographic survey of all HT/LT panels — hot spots indicate connection issues", critical: true },
          { text: "Grounding and earthing continuity test — per IS:3043" },
        ],
      },
      {
        heading: "Cooling",
        items: [
          { text: "Full CRAC/PAC service — filter replacement, coil cleaning, drain cleaning" },
          { text: "Cooling tower chemical treatment and blowdown (if applicable)" },
          { text: "Chiller compressor check (if applicable) — oil level, vibration, refrigerant" },
          { text: "Thermal imaging of server hall — comprehensive survey of all rows" },
          { text: "Airflow balance measurement — anemometer readings at perforated tiles" },
          { text: "Free cooling test (if installed) — verify economizer operation in available ambient" },
        ],
      },
      {
        heading: "Fire and Safety",
        items: [
          { text: "Fire suppression cylinder weighing — verify charge level by weight", critical: true },
          { text: "Fire detector function test — smoke test on all detectors" },
          { text: "VESDA calibration check — verify sensitivity against OEM specification" },
          { text: "Fire drill — all staff participate, evacuation timed" },
          { text: "Fire extinguisher inspection — all charged, no expiry, accessible" },
          { text: "Emergency lighting test — all emergency lights functioning on battery" },
        ],
      },
      {
        heading: "DR and Business Continuity",
        items: [
          { text: "DR runbook review — current and accurate?" },
          { text: "DR test or tabletop exercise — complete specific scenario" },
          { text: "Backup restoration test — restore from backup, verify data integrity", critical: true },
          { text: "Emergency contact list review — all contacts current?" },
          { text: "Communications test — alternate communication channels work?" },
        ],
      },
    ],
  },

  // ── ANNUAL ──────────────────────────────────────────────────────────────────
  {
    id: "annual-ops",
    title: "Annual DC Review and Maintenance Checklist",
    color: "#6b21a8",
    freq: "Annual",
    duration: "Multiple days",
    desc: "Annual comprehensive DC audit and maintenance. Full infrastructure review, capacity planning update, regulatory compliance check, and strategic planning. Plan 2-3 days minimum.",
    sections: [
      {
        heading: "Infrastructure Assessment",
        items: [
          { text: "Complete thermographic survey (all electrical panels, connections, cables)", critical: true },
          { text: "UPS battery replacement assessment — age, capacity test results, decision" },
          { text: "Full generator overhaul (per OEM schedule — typically 1000-2000 hours)" },
          { text: "HT/LT switchgear inspection and insulation resistance testing", critical: true },
          { text: "Transformer oil analysis (if oil-cooled) — DGA test" },
          { text: "Full cooling system service — compressor oil, refrigerant check, all coils cleaned" },
          { text: "VESDA full recalibration and pipe system inspection" },
          { text: "Fire suppression system full service — OEM certification", critical: true },
        ],
      },
      {
        heading: "Capacity Review",
        items: [
          { text: "Power capacity utilization report — actual vs allocated vs available" },
          { text: "Cooling capacity assessment — headroom for next 12-24 months?" },
          { text: "Space utilization report — rack space, floor loading headroom" },
          { text: "Network capacity assessment — bandwidth, port utilization" },
          { text: "3-year capacity forecast based on business growth plans" },
          { text: "CAPEX planning for any capacity additions needed" },
        ],
      },
      {
        heading: "Compliance and Certification",
        items: [
          { text: "Electrical installation test and inspection report (if required)" },
          { text: "ISO 27001/SOC 2 certification renewal (if applicable)" },
          { text: "PCI-DSS compliance review (if applicable)" },
          { text: "Earth resistance testing (per IS:3043)", critical: true },
          { text: "Lightning protection testing and inspection" },
          { text: "Regulatory reporting — all mandatory reports filed?" },
        ],
      },
      {
        heading: "Documentation Update",
        items: [
          { text: "As-built drawings update — reflect any changes from the year" },
          { text: "O&M manuals current — latest versions from all OEMs?" },
          { text: "Emergency procedures review and update" },
          { text: "Staff training records — all engineers current on required training?" },
          { text: "Contract review — all service contracts current, renewal dates noted?" },
          { text: "Insurance renewal and policy review" },
        ],
      },
    ],
  },

  // ── PRE-SHUTDOWN ────────────────────────────────────────────────────────────
  {
    id: "pre-shutdown",
    title: "Pre-Planned Shutdown Checklist",
    color: "#6b21a8",
    freq: "As Needed",
    duration: "Per plan",
    desc: "Before any planned power shutdown — partial or full. Review weeks before AND day of execution. This checklist prevents the most common shutdown errors.",
    sections: [
      {
        heading: "Weeks Before: Planning",
        items: [
          { text: "Scope document — exactly what shuts down, what stays live?", critical: true },
          { text: "Customer notification — SLA-required notice period met? Written confirmation?" },
          { text: "Redundant path available during maintenance?" },
          { text: "Application team graceful shutdown procedures confirmed" },
          { text: "Rollback plan documented — if maintenance fails, how to restore? Decision criteria?" },
          { text: "OEM/vendor presence — required vendors scheduled?" },
          { text: "Risk assessment — single points of failure during maintenance window?" },
          { text: "Post-maintenance test plan — what confirms successful restoration?" },
        ],
      },
      {
        heading: "Day Before",
        items: [
          { text: "Stakeholder reminder notification sent" },
          { text: "All tools and spares on site and verified" },
          { text: "Emergency contacts list confirmed and accessible to all team members" },
          { text: "Step-by-step shutdown sequence documented" },
          { text: "Power-up sequence documented (reverse of shutdown)" },
          { text: "Alternative communication plan — if LAN down during work, how does team communicate?" },
        ],
      },
      {
        heading: "Day Of: Before Start",
        items: [
          { text: "Customer final go/no-go written confirmation received", critical: true },
          { text: "Application teams started graceful shutdown sequence" },
          { text: "All team members briefed on scope, sequence, safety", critical: true },
          { text: "Emergency contacts posted in operations room and in hand" },
          { text: "Fire suppression system inhibited if work near detection zones", note: "Must be re-enabled immediately after work complete" },
          { text: "Permit to work issued and signed", critical: true },
          { text: "Isolation points confirmed and LOTO applied", critical: true },
        ],
      },
      {
        heading: "Restoration",
        items: [
          { text: "Restoration in reverse shutdown sequence" },
          { text: "All interlocks and protections re-enabled before energization", critical: true },
          { text: "Fire suppression re-enabled immediately after work", critical: true },
          { text: "Full facility walkthrough — no tools left, no temp jumpers, all panels closed" },
          { text: "Application team: all systems verified running, performance normal" },
          { text: "Monitoring — all DCIM/BMS alarms cleared, systems in normal state" },
          { text: "Customer sign-off received" },
          { text: "Maintenance report written within 24 hours" },
        ],
      },
    ],
  },

  // ── COMMISSIONING ───────────────────────────────────────────────────────────
  {
    id: "commissioning",
    title: "New Equipment Commissioning Checklist",
    color: "#16a34a",
    freq: "One-Time (New Install)",
    duration: "Varies by equipment",
    desc: "Before any new equipment goes live in production. More issues are caught in commissioning than anywhere else. Systematic, not rushed. Customer witnessing is often required.",
    sections: [
      {
        heading: "Documentation Verification",
        items: [
          { text: "Factory Acceptance Test (FAT) certificate received and reviewed" },
          { text: "As-built drawings match actual installation" },
          { text: "Cable schedule — all cables labeled per schedule" },
          { text: "Equipment manuals and warranty documents filed" },
          { text: "Spare parts list — initial spares on site?" },
        ],
      },
      {
        heading: "Physical Verification",
        items: [
          { text: "Equipment installed per approved drawings — location, clearances" },
          { text: "Earthing/grounding — all equipment earthed, continuity tested", critical: true },
          { text: "Cable terminations — all tight, correct lugs, no exposed conductors" },
          { text: "Labeling — all panels, equipment, cables labeled correctly" },
          { text: "Fire stopping — all cable penetrations sealed", critical: true },
          { text: "Structural integrity — equipment properly bolted/secured" },
        ],
      },
      {
        heading: "Functional Tests",
        items: [
          { text: "Energization sequence — step-by-step with protection relays active", critical: true },
          { text: "No-load test — equipment operates correctly without full load" },
          { text: "Load test — under rated load conditions, all parameters within spec" },
          { text: "Protection relay tests — simulate faults, verify relay operation", critical: true },
          { text: "ATS operation test (if applicable) — simulate supply failure, verify transfer" },
          { text: "Alarm verification — all BMS/DCIM points mapped correctly and triggering" },
          { text: "SNMP integration test — device visible in monitoring system" },
        ],
      },
      {
        heading: "Handover",
        items: [
          { text: "Customer witness test — customer present for key tests" },
          { text: "Operations team training — O&M team trained on new equipment" },
          { text: "Site Acceptance Test (SAT) signed off by customer", critical: true },
          { text: "Defect list (snagging) — all items resolved or schedule agreed" },
          { text: "Warranty start date confirmed" },
          { text: "O&M manual issued to operations team" },
        ],
      },
    ],
  },

  // ── EMERGENCY ───────────────────────────────────────────────────────────────
  {
    id: "emergency-response",
    title: "Emergency Response Checklist",
    color: "#dc2626",
    freq: "On Emergency",
    duration: "Immediate",
    desc: "Not a maintenance checklist — an emergency decision guide. Post this on the operations room wall. Laminate it. It must be accessible when systems are failing and stress is high.",
    sections: [
      {
        heading: "First 60 Seconds",
        items: [
          { text: "STAY CALM — do not rush, panicked actions cause more damage", critical: true },
          { text: "Identify: What system? What alarm? What is the visible symptom?" },
          { text: "Communicate: Inform ops team lead immediately", critical: true },
          { text: "Do NOT take recovery action until you understand what happened" },
          { text: "Check: Are personnel safe? Any fire, smoke, electrical hazard?", critical: true },
        ],
      },
      {
        heading: "Power Emergency",
        items: [
          { text: "Grid failure + UPS on battery: Note battery time remaining, note time", critical: true },
          { text: "Generator start signal sent? ATS response? If no DG after 60 seconds: investigate" },
          { text: "If UPS in bypass: Load unprotected. Notify customer immediately." },
          { text: "If battery <5 minutes: Begin controlled load shedding, non-critical first" },
          { text: "OEM hotline: Call NOW, not after you've tried everything else" },
        ],
      },
      {
        heading: "Cooling Emergency",
        items: [
          { text: "Identify zone affected: Which rows/racks affected?" },
          { text: "Available cooling capacity: Can remaining units carry load?" },
          { text: "Server inlet temperatures: At what rate rising?" },
          { text: "If temperatures approaching 30°C: Alert application teams, prepare for graceful shutdown" },
          { text: "If >35°C: Application teams must begin controlled shutdown" },
          { text: "Cooling contractor: Emergency call immediately" },
        ],
      },
      {
        heading: "Fire Emergency",
        items: [
          { text: "ACTIVATE FIRE ALARM immediately if smoke or fire confirmed", critical: true },
          { text: "EVACUATE all personnel from affected area", critical: true },
          { text: "Call fire department (101)", critical: true },
          { text: "Fire suppression: Will activate automatically — do not attempt to stop" },
          { text: "DO NOT re-enter until fire brigade declares safe" },
          { text: "Notify site management and customer simultaneously" },
        ],
      },
      {
        heading: "After Stabilization",
        items: [
          { text: "System status: Document current state, timestamp" },
          { text: "Customer update: Proactive communication every 30 minutes until resolved" },
          { text: "Begin RCA data collection: Logs, timestamps, alarm records" },
          { text: "Management escalation if SLA breach likely" },
          { text: "Record all actions taken with timestamps in operations log" },
        ],
      },
    ],
  },

  // ── AUDIT CHECKLIST ─────────────────────────────────────────────────────────
  {
    id: "dc-audit",
    title: "Data Center Audit Checklist",
    color: "#0369a1",
    freq: "As Needed (Audit)",
    duration: "1-2 days",
    desc: "For auditing a DC facility — internal audit, vendor audit, or compliance assessment. Systematic approach to identifying gaps before they become incidents.",
    sections: [
      {
        heading: "Physical Infrastructure",
        items: [
          { text: "Single points of failure mapping — compare design to actual installed" },
          { text: "Redundancy verification — actual components vs documented N+1/2N" },
          { text: "Maintenance records review — all critical equipment serviced per schedule?" },
          { text: "Preventive maintenance compliance — % of scheduled maintenance completed on time" },
          { text: "Deferred maintenance register — any critical items deferred?" },
        ],
      },
      {
        heading: "Operational Processes",
        items: [
          { text: "Change management: Process documented? Recent changes followed process?" },
          { text: "Incident response: Process documented? Recent incidents followed process?" },
          { text: "Emergency procedure documentation — current and accessible?" },
          { text: "Training records — all operations staff trained on procedures?" },
          { text: "Visitor management — log reviewed, all visitors properly handled?" },
        ],
      },
      {
        heading: "Compliance",
        items: [
          { text: "Access control audit — who has access, when last used it, is access appropriate?" },
          { text: "Environmental monitoring data — temperature/humidity within spec consistently?" },
          { text: "Regulatory compliance (PCI-DSS, ISO 27001, SOC 2 if applicable)" },
          { text: "Insurance requirements — all required measures implemented?" },
          { text: "Fire safety compliance — all statutory inspections current?" },
        ],
      },
      {
        heading: "Documentation",
        items: [
          { text: "As-built drawings match actual installation — random sample check" },
          { text: "CMDB accuracy — spot-check 10 assets, verify against physical" },
          { text: "Service contracts current — all critical equipment under support?" },
          { text: "Emergency contacts current — tested recently?" },
          { text: "O&M manuals accessible to operations team?" },
        ],
      },
    ],
  },

  // ── TRANSFORMER CHECKLIST ───────────────────────────────────────────────────
  {
    id: "transformer-annual",
    title: "Transformer Annual Maintenance Checklist",
    color: "#f97316",
    freq: "Annual (or per OEM schedule)",
    duration: "Half day",
    desc: "Annual transformer health check. Transformer failure is catastrophic and can be long to repair. Preventive maintenance is the only reliable protection.",
    sections: [
      {
        heading: "Visual Inspection",
        items: [
          { text: "Oil level (oil-cooled) — within sight glass limits" },
          { text: "Oil color (oil-cooled) — clear to light yellow (dark = contamination)" },
          { text: "Oil leaks — any oil staining under transformer or on body?" },
          { text: "Buchholz relay (oil-cooled) — no gas accumulation" },
          { text: "Silica gel breather — active (blue, not pink/white which = saturated)" },
          { text: "Conservator tank (oil-cooled) — oil level correct" },
          { text: "Cooling fans (if ONAF) — all running during load" },
          { text: "Physical damage — dents, cracks, damaged bushings" },
        ],
      },
      {
        heading: "Electrical Tests (Qualified Personnel Only)",
        items: [
          { text: "Insulation resistance test (megger) — HV and LV windings to earth", critical: true },
          { text: "Turns ratio test — verify transformation ratio matches nameplate" },
          { text: "Winding resistance measurement — compare to baseline" },
          { text: "Oil dielectric strength test (oil-cooled) — >30kV per OEM spec" },
          { text: "Oil DGA (Dissolved Gas Analysis) — annual for critical transformers", note: "DGA detects incipient faults before failure — highly recommended" },
          { text: "Thermographic imaging of HV/LV connections and bushing tops" },
        ],
      },
      {
        heading: "Protective Devices",
        items: [
          { text: "Over-temperature trip test — simulate and verify trip" },
          { text: "Over-current protection relay — calibration test" },
          { text: "Buchholz relay function test (oil-cooled)" },
          { text: "OLTC (On-Load Tap Changer) operation test — if fitted" },
        ],
      },
      {
        heading: "Documentation",
        items: [
          { text: "All test results recorded with date and test equipment serial numbers" },
          { text: "Compare to baseline and previous years — any trends?" },
          { text: "OEM service certificate issued" },
          { text: "Next maintenance date scheduled" },
        ],
      },
    ],
  },

  // ── PAC QUARTERLY ───────────────────────────────────────────────────────────
  {
    id: "pac-quarterly",
    title: "Precision Air Conditioner (PAC) Quarterly Service Checklist",
    color: "#0284c7",
    freq: "Quarterly",
    duration: "2-3 hours per unit",
    desc: "Quarterly PAC service — deeper than monthly inspection. Filter replacement, coil cleaning, condensate system check, refrigerant health assessment. Done by cooling technician.",
    sections: [
      {
        heading: "Air Circuit",
        items: [
          { text: "Air filter replacement — new filter fitted, part number recorded" },
          { text: "Evaporator coil inspection and cleaning — fins straightened if bent" },
          { text: "Blower fan blade — clean, balanced, no cracks" },
          { text: "Blower motor — bearing noise? Current draw within spec?" },
          { text: "Air flow measurement — confirm design airflow (CFM/CMH)" },
        ],
      },
      {
        heading: "Condensate System",
        items: [
          { text: "Drain pan — clean, no biological growth, no blockage" },
          { text: "Drain pipe — flush with water, confirm clear" },
          { text: "Drain pump (if fitted) — operational test" },
          { text: "High water level switch — test function" },
        ],
      },
      {
        heading: "Refrigerant Circuit",
        items: [
          { text: "Operating pressures — suction and discharge within expected range" },
          { text: "Superheat and subcooling — within spec" },
          { text: "Compressor amp draw — within nameplate" },
          { text: "Electronic expansion valve (EEV) — correct operation" },
          { text: "Leak check — electronic leak detector around all connections" },
        ],
      },
      {
        heading: "Electrical",
        items: [
          { text: "All electrical connections — checked and tightened" },
          { text: "Contactor contacts — check for pitting or burning" },
          { text: "Capacitors — visual check for bulging or leakage" },
          { text: "Control board — no burn marks, all indicators correct" },
        ],
      },
      {
        heading: "Documentation",
        items: [
          { text: "Service report completed with all readings" },
          { text: "OEM warranty — service completed per OEM requirements" },
          { text: "Next service date scheduled" },
          { text: "Any recommendations for corrective work noted" },
        ],
      },
    ],
  },
];

// ── ADDITIONAL CHECKLISTS ───────────────────────────────────────────────────

const ADDITIONAL_CHECKLISTS: Checklist[] = [
  {
    id: "server-deployment",
    title: "New Server Deployment Checklist",
    color: "#475569",
    freq: "As Needed (New Deploy)",
    duration: "2-4 hours",
    desc: "Every new server deployment — from rack installation to production handover. Zero shortcuts. Every step prevents future incidents.",
    sections: [
      {
        heading: "Physical Installation",
        items: [
          { text: "Rack space reserved and documented in CMDB before deployment", critical: true },
          { text: "Rack capacity check: power (kW) and weight within limits", critical: true },
          { text: "Server physically installed in rack — rails seated correctly, screws tightened" },
          { text: "Dual power cables connected: PSU-A to PDU-A, PSU-B to PDU-B", critical: true },
          { text: "Network cables: management NIC to management switch, production NIC to ToR switch" },
          { text: "All cable labels applied: server name, port, VLAN" },
          { text: "Serial number recorded in asset management system" },
        ],
      },
      {
        heading: "BIOS/UEFI Configuration",
        items: [
          { text: "iDRAC/iLO IP address configured on management VLAN", critical: true },
          { text: "iDRAC/iLO default credentials changed immediately", critical: true },
          { text: "iDRAC/iLO LDAP authentication configured (if applicable)" },
          { text: "Boot order configured: network first (PXE) then local disk" },
          { text: "BIOS power management: performance mode for production servers" },
          { text: "Secure Boot enabled if required by policy" },
          { text: "iDRAC added to monitoring system (SNMP/IPMI)" },
        ],
      },
      {
        heading: "Network Configuration",
        items: [
          { text: "Access VLAN configured on ToR switch port (correct production VLAN)", critical: true },
          { text: "VLAN verified: server can ping gateway" },
          { text: "DNS record created: hostname → IP" },
          { text: "Reverse DNS (PTR) record created: IP → hostname" },
          { text: "IP allocated in IPAM system" },
          { text: "Firewall rules created if required" },
        ],
      },
      {
        heading: "OS and Monitoring",
        items: [
          { text: "OS installed and patched to current baseline" },
          { text: "Monitoring agent installed: server visible in monitoring system" },
          { text: "Hardware health monitoring: iDRAC/iLO integrated with monitoring" },
          { text: "Log shipping configured to central SIEM/log server" },
          { text: "Backup agent installed and backup job configured" },
          { text: "Server added to correct CMDBgroup for change management" },
        ],
      },
    ],
  },
  {
    id: "network-change",
    title: "Network Change Checklist",
    color: "#7c3aed",
    freq: "Per Change",
    duration: "Variable",
    desc: "Any significant network configuration change — VLAN, firewall rule, routing, physical port change. Use before AND after every change.",
    sections: [
      {
        heading: "Pre-Change",
        items: [
          { text: "Change ticket approved (CAB or standard change)", critical: true },
          { text: "Maintenance window scheduled and customers notified" },
          { text: "Backup of current configuration taken (before state)", critical: true },
          { text: "Rollback plan documented — exact commands to reverse the change" },
          { text: "Impact assessment: which systems/customers affected?" },
          { text: "Test plan: how will you verify the change worked?" },
        ],
      },
      {
        heading: "During Change",
        items: [
          { text: "Follow change steps exactly as documented — no ad-hoc additions" },
          { text: "Second engineer watching/verifying each step" },
          { text: "If unexpected issues appear: rollback immediately, don't continue" },
          { text: "Time each step — if taking longer than planned, escalate decision" },
        ],
      },
      {
        heading: "Post-Change Verification",
        items: [
          { text: "Test all items in test plan — don't assume change worked", critical: true },
          { text: "Ping test: connectivity from multiple sources" },
          { text: "Application test: end-to-end service functioning" },
          { text: "Monitoring: no new alerts generated" },
          { text: "Error counters: no new CRC errors or drops on changed interfaces" },
          { text: "Customer sign-off if customer-impacting change" },
          { text: "Configuration backup taken (after state)" },
          { text: "Change ticket updated with outcome and lessons learned" },
        ],
      },
    ],
  },
  {
    id: "dc-handover",
    title: "Shift Handover Checklist",
    color: "#0369a1",
    freq: "Every Shift Change",
    duration: "15-20 min",
    desc: "Structured handover between shifts. The outgoing engineer must brief the incoming engineer on every open item. No verbal-only handovers — everything in writing.",
    sections: [
      {
        heading: "Outgoing Engineer Responsibilities",
        items: [
          { text: "Complete shift log with all readings, incidents, and actions", critical: true },
          { text: "All open incidents documented with current status and next action", critical: true },
          { text: "Any equipment in abnormal state documented with reason" },
          { text: "Any alarms in acknowledged/suppressed state documented with reason", critical: true },
          { text: "Scheduled maintenance for incoming shift noted" },
          { text: "Any pending customer communications or escalations" },
        ],
      },
      {
        heading: "Incoming Engineer Checks",
        items: [
          { text: "Read shift log — any questions clarified with outgoing engineer" },
          { text: "Open incidents understood and ownership accepted", critical: true },
          { text: "Abnormal equipment states acknowledged and understood" },
          { text: "BMS active alarms reviewed" },
          { text: "UPS status: all normal? Battery level?" },
          { text: "Generator status: standby/auto mode? Fuel level?" },
          { text: "Cooling status: all units operational?" },
        ],
      },
      {
        heading: "Sign-Off",
        items: [
          { text: "Outgoing engineer signature on shift log", critical: true },
          { text: "Incoming engineer signature confirming handover received", critical: true },
          { text: "Shift handover time recorded" },
        ],
      },
    ],
  },
  {
    id: "battery-replacement",
    title: "UPS Battery Replacement Checklist",
    color: "#f97316",
    freq: "Every 4 Years / As Needed",
    duration: "4-8 hours (size dependent)",
    desc: "UPS battery string replacement. High-risk work — batteries store significant energy. Requires OEM or qualified engineer. Follow exact OEM procedure.",
    sections: [
      {
        heading: "Pre-Work Safety",
        items: [
          { text: "Maintenance window approved, customers notified", critical: true },
          { text: "OEM engineer or qualified battery specialist on site", critical: true },
          { text: "PPE: insulated gloves (Class 0 minimum), safety glasses, arc flash clothing", critical: true },
          { text: "Permit to work issued and signed", critical: true },
          { text: "Spill kit available (acid neutralizer for VRLA)", critical: true },
          { text: "Fire extinguisher (CO2) immediately accessible" },
          { text: "First aid kit accessible, emergency contact numbers posted" },
        ],
      },
      {
        heading: "Battery Work",
        items: [
          { text: "UPS battery isolation switch opened before any battery work", critical: true },
          { text: "Battery voltage verified zero at work point (multimeter)", critical: true },
          { text: "LOTO applied on battery isolation", critical: true },
          { text: "Old batteries removed one string at a time — never cross-circuit" },
          { text: "Battery cabinet cleaned before new battery installation" },
          { text: "New batteries installed per OEM torque specifications on terminals", note: "Under-torqued = high resistance + heat. Over-torqued = terminal damage." },
          { text: "Correct polarity verified before reconnecting each battery", critical: true },
          { text: "All inter-battery links installed and torqued" },
        ],
      },
      {
        heading: "Testing and Documentation",
        items: [
          { text: "String voltage verified with all batteries installed" },
          { text: "Battery charger reconnected and float charging verified" },
          { text: "UPS battery runtime test after 12 hours charging", note: "New batteries may need 24-48 hours before full capacity" },
          { text: "Battery date label applied to each battery with installation date" },
          { text: "CMDB updated: battery type, install date, expected replacement date" },
          { text: "Old batteries disposed per e-waste regulations — lead-acid is hazardous waste" },
          { text: "OEM service certificate issued" },
        ],
      },
    ],
  },
  {
    id: "fiber-installation",
    title: "Fiber Optic Cabling Checklist",
    color: "#6b21a8",
    freq: "Per Installation",
    duration: "Variable",
    desc: "Structured cabling installation. Fiber is the single most common source of network issues in DC. Most problems are contamination and poor connector quality.",
    sections: [
      {
        heading: "Pre-Installation",
        items: [
          { text: "Fiber type confirmed: SMF (inter-building) or OM4 MMF (within DC)", critical: true },
          { text: "Connector type confirmed: LC, SC, MTP/MPO — correct for equipment", critical: true },
          { text: "Cable length calculated with 20% slack margin" },
          { text: "Installation path surveyed — no bend radius violations" },
          { text: "Dust caps kept on all connectors until moment of connection" },
        ],
      },
      {
        heading: "Installation",
        items: [
          { text: "Minimum bend radius maintained throughout installation (SMF: 30mm, MMF: 20mm)" },
          { text: "No kinks or sharp bends in cable — inspect full run" },
          { text: "Cable labeled both ends before connection", critical: true },
          { text: "Fiber end-face inspected with microscope before connection", critical: true, note: "Never touch end-face with fingers — fingerprint oil causes attenuation" },
          { text: "Fiber end-face cleaned with one-click cleaner before connection" },
          { text: "Connector seated firmly — click felt or latch engaged" },
        ],
      },
      {
        heading: "Testing",
        items: [
          { text: "Link light verified on both ends after connection", critical: true },
          { text: "Optical power level measured (SFP: 'show interface transceiver')", note: "Rx power within OEM spec for SFP in use" },
          { text: "No CRC errors on interface after traffic flow established" },
          { text: "End-to-end connectivity tested (ping, application test)" },
          { text: "Test results recorded in cable schedule" },
        ],
      },
    ],
  },
];

CHECKLISTS.push(...ADDITIONAL_CHECKLISTS);
