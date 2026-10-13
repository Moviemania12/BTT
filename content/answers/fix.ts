// ═══════════════════════════════════════════════════════════════════════════
// content/answers/fix.ts
//
// Fix Answer pages for /answers/fix/[slug]. Every symptom/cause/step/
// escalation field below is carried over verbatim (or lightly reworded for
// a standalone page) from the matching entry in content/study/troubleshooting.ts
// — that data was already written and reviewed; this file reframes it as a
// direct-answer page, it does not invent new field experience, OEM
// procedures, or standards citations.
//
// SITE_URL base matches the convention used across the codebase
// (lib/schemas, calculatorRegistry, app/sitemap.ts).
// ═══════════════════════════════════════════════════════════════════════════

import type { FixAnswer } from "./types";

const REVIEWED_AT = "2026-10-13";

export const FIX_ANSWERS: Record<string, FixAnswer> = {
  "ups-bypass-load-unprotected": {
    slug: "ups-bypass-load-unprotected",
    sourceId: "ups-bypass",
    category: "Power",
    categoryColor: "#f97316",
    title: "UPS Keeps Going to Bypass — Causes and Fix",
    directAnswer:
      "A UPS drops to bypass mode because it has decided it can no longer safely run the load through its inverter — overload, an internal fault, or high internal temperature are the three most common reasons. On bypass, raw grid power reaches the load unconditioned, so the load is temporarily unprotected. Download the UPS event log first; the first 10 events usually show the root cause.",
    hazardous: true,
    safetyNote:
      "The UPS output is live either way, but the load has no power conditioning or battery backup while on bypass. Do not force the UPS back to inverter mode before you understand the root cause — doing so can cause a second trip or a brief power blip to the load. This is diagnostic guidance, not a substitute for your UPS OEM's own procedure.",
    symptoms: [
      "UPS front panel 'BYPASS' LED blinking or solid",
      "DCIM/BMS alarm: 'UPS in bypass mode'",
      "UPS input/output voltages same (no conversion happening)",
      "Battery not charging despite grid available",
    ],
    causes: [
      "UPS overloaded — load exceeds inverter capacity",
      "Inverter fault — IGBT failure, driver board fault",
      "Internal temperature high — cooling fan failure",
      "UPS firmware error — rare but possible after a firmware update",
      "Manual bypass switched accidentally during maintenance",
    ],
    verify: [
      "UPS event log download (LCD menu or SNMP trap history) — review last 50 events",
      "Note down front panel alarm codes — each code is a specific fault",
      "Load meter check: actual kW vs UPS rated kW capacity",
      "Ambient temperature around UPS — inlet vents blocked?",
      "Bypass switch position — manual bypass accidentally engaged?",
    ],
    steps: [
      "Safety first: inform ops team and the customer/stakeholder that the load is unprotected",
      "Grid power quality check: multimeter on UPS input — voltage stable? frequency 50Hz?",
      "UPS event log download — the first 10 events reveal the root cause about 90% of the time",
      "Load check: per-phase kW reading vs UPS rating — is it overloaded?",
      "Temperature check: UPS internal temperature (LCD or SNMP) — high temp auto-bypass triggers",
      "Contact OEM support with the event log data already downloaded",
      "Do not force a return to inverter mode without understanding the root cause",
      "If overload: identify a load shed — which non-critical loads can be moved",
      "OEM diagnostic session: remote access to the UPS for deeper fault analysis",
      "Document everything — timestamp, actions, communications",
    ],
    rootCause:
      "Most commonly overloading (after server additions without a capacity check) or inverter IGBT failure (capacitor aging in older units, typically after 5–7 years). Fan failure causing temperature-induced bypass is also frequent.",
    resolution:
      "Overload: immediate load shed plus a capacity planning review. Inverter fault: an OEM field engineer, with module replacement if it is a modular UPS. Temperature: clean the cooling path and replace fans. Return to inverter mode only after the root cause is resolved.",
    prevention: [
      "UPS load monitoring weekly — alert configured at 75% loading",
      "Annual battery test plus preventive maintenance (capacitor check at 5–7 years)",
      "Cooling path quarterly inspection — filter cleaning, fan check",
      "Load change control process — server additions need capacity approval",
      "SNMP traps to DCIM/BMS so a bypass alarm gives instant notification",
    ],
    escalation:
      "Escalate to OEM L2 support immediately. If there is a site safety concern or outage risk, escalate to the site manager and customer within 15 minutes of discovery.",
    siteExample:
      "At a Mumbai DC, a UPS went into bypass after midnight. The log check showed load at 98% on one phase (unbalanced) — three servers had been added that afternoon without a capacity check. Balancing the load across phases returned the UPS to inverter mode without a fault. A capacity check was added to the server deployment process afterward.",
    mistakes: [
      "Ignoring it or saying 'keep monitoring' — bypass state is an imminent outage risk",
      "Forcing a transfer back to inverter without a root cause — can cause a power blip",
      "Not downloading the event log before calling the OEM, which slows the diagnosis",
    ],
    whyThisHappens:
      "A double-conversion UPS runs the load continuously through its inverter (AC → DC → AC) so it can condition power and switch to battery instantly on a grid failure. Bypass is a built-in protection path: when the UPS detects it cannot run the inverter safely — too much load, a fault inside the inverter, or an internal temperature past its limit — it routes grid power straight to the load instead of risking an inverter failure that would drop the load completely. It trades conditioning and battery protection for keeping the load powered.",
    assumptions: [
      "Assumes a standard online double-conversion UPS; line-interactive and offline UPS designs behave differently on a grid fault.",
      "Exact alarm codes, event-log format, and bypass thresholds vary by UPS manufacturer and model — always confirm against your OEM's own fault-code list.",
      "\"Load shed\" options depend entirely on your site's actual non-critical load inventory, which this page cannot know.",
    ],
    relatedTopicSlug: "ups",
    relatedAnswerSlugs: ["dg-set-wont-start", "server-wont-post"],
    faqs: [
      {
        question: "Is the load still protected while a UPS is on bypass?",
        answer:
          "No. On bypass, grid power reaches the load directly, with no power conditioning and no battery backup. If the grid fails while the UPS is on bypass, the load loses power immediately.",
      },
      {
        question: "Should I force the UPS back to inverter mode myself?",
        answer:
          "Not before you know the root cause. Forcing a return to inverter mode without fixing an overload or fault condition can trip the UPS straight back to bypass, or cause a brief power interruption.",
      },
      {
        question: "What's the single most useful first step?",
        answer:
          "Download the UPS event log. In most real incidents, the first 10 logged events identify whether this is an overload, a temperature fault, or an internal inverter fault.",
      },
    ],
    seoTitle: "UPS Keeps Going to Bypass — Causes and Fix | Behind The Tech",
    seoDescription:
      "UPS in bypass mode: what it means, why it happens (overload, inverter fault, high temperature), and the exact steps to diagnose it safely before returning to inverter mode.",
    reviewedAt: REVIEWED_AT,
  },

  "dg-set-wont-start": {
    slug: "dg-set-wont-start",
    sourceId: "dg-fail-start",
    category: "Power",
    categoryColor: "#f97316",
    title: "DG Set Won't Start — Generator Fail-to-Start Checklist",
    directAnswer:
      "A diesel generator that won't crank on a start signal is almost always one of three things: a discharged starter battery, a fuel supply problem, or an engine-protection trip (low oil pressure, high coolant temperature) stopping it from starting on purpose. Check the starter battery voltage and the physical fuel level first — both are faster to check than they are to rule out from a control-panel alarm alone.",
    hazardous: true,
    safetyNote:
      "This involves fuel systems, a running engine, and starter-battery voltage. Do not attempt fuel system repairs, injector work, or any work beyond a basic voltage/level check yourself — call your DG OEM or service contractor for anything past the checks listed here. If this is happening during a real grid failure, your first priority is the UPS battery runtime remaining, not the generator.",
    symptoms: [
      "DG start signal sent from ATS but the engine doesn't crank",
      "Control panel shows a 'fail to start' alarm after multiple crank attempts",
      "ATS stays on grid position even after a grid failure",
      "No exhaust visible, no engine sound during the start attempt",
    ],
    causes: [
      "Battery for the DG starter motor discharged (trickle charger failure)",
      "Fuel starvation — low level, pump failure, or choked filters",
      "Engine lube oil pressure alarm — a safety protection preventing start",
      "Air filter blocked — especially in dusty environments",
      "Coolant temperature fault — coolant heater failure in cold weather",
      "Control board fault — start relay failure",
      "Water in fuel — especially if diesel has been stored over 6 months",
    ],
    verify: [
      "DG battery voltage: starter battery (typically a 24V system) — below 22V means depleted",
      "Fuel level gauge AND a physical dipstick check — gauges can be stuck",
      "Oil pressure indicator at the DG control panel",
      "Coolant temperature reading",
      "Control panel status LEDs — note the exact fault code",
      "Last successful test run log — when was it, and was it under load?",
    ],
    steps: [
      "Safety: inform the site team of the DG failure and note UPS battery time remaining — this is now the critical number",
      "Work two tracks at once: troubleshoot the DG and assess load-shedding options simultaneously",
      "DG control panel: any fault LED active? Note the exact alarm code before calling the OEM",
      "Starter battery check: voltmeter on the battery terminals",
      "Fuel: gauge reading plus a physical dip check — is the fuel inlet valve open?",
      "Oil level dipstick: low oil means the engine's own protection is preventing a start",
      "Coolant level check",
      "Attempt a manual crank at the local control panel — does the engine even attempt to crank?",
      "If it cranks but doesn't fire: suspect fuel delivery (pump, filter, injectors, or water in fuel)",
      "If it doesn't crank at all: suspect the starter motor or battery",
      "Contact the DG OEM or service contractor immediately with the fault code and findings ready",
      "Assess whether a rental DG makes sense if repair will take more than 30 minutes",
    ],
    rootCause:
      "Most commonly a discharged DG start battery from a trickle-charger failure. Second most common is a clogged fuel filter, especially with low-quality or old stored diesel. Skipped monthly test runs let batteries self-discharge unnoticed.",
    resolution:
      "Battery: jump-start with a portable battery pack immediately, then replace the starter battery. Fuel filter: replace it. Low fuel: refuel immediately. If an engine-protection trip caused this: resolve the underlying issue (oil, coolant), reset the protection, then retry.",
    prevention: [
      "Monthly DG test run under load — not just an idle spin",
      "Weekly DG start-battery voltage check",
      "Fuel quality check — a water-contamination test twice a year",
      "Fuel filter replacement per the OEM schedule (typically every 250–500 operating hours)",
      "Trickle-charger status verified monthly",
      "An OEM annual maintenance contract — treat this as mandatory, not optional",
    ],
    escalation:
      "If the DG fails to start during a real grid failure with less than 5 minutes of UPS battery remaining, escalate immediately to the site manager, the customer, the DG OEM's emergency service, and investigate a rental DG in parallel.",
    siteExample:
      "During a Hyderabad DC's quarterly test, the DG failed to start after three crank attempts with no ignition. Investigation found the trickle charger had failed three weeks earlier, and the starter battery was completely discharged. A portable jump pack gave an immediate start, followed by a proper battery replacement. A battery-charger check was added to the monthly maintenance checklist.",
    mistakes: [
      "Assuming the DG is fine because it started last month — batteries discharge between tests",
      "Checking only the fuel gauge, not the physical dipstick — gauges can be stuck or broken",
      "Not having an OEM emergency contact on speed dial before a real outage happens",
    ],
    whyThisHappens:
      "A diesel generator's control system will not let the engine start if a protection condition is active — low oil pressure, high coolant temperature, or (on many sets) low starter-battery voltage below the threshold the starter motor needs to turn the engine over fast enough to fire. These protections exist to stop the engine from starting in a state that would damage it, so a 'fail to start' alarm is usually the control system correctly refusing to start a generator that isn't ready — not a random fault.",
    assumptions: [
      "Assumes a standard diesel DG set with an automatic transfer switch (ATS) and a 24V starter battery system — exact voltage thresholds and alarm codes vary by OEM.",
      "Does not cover fuel system repair, injector diagnosis, or any work inside the engine — that is OEM/certified-technician work.",
      "Rental DG lead time and feasibility depend entirely on your location and contractor relationships, which this page cannot know.",
    ],
    relatedTopicSlug: "dg-set",
    relatedAnswerSlugs: ["ups-bypass-load-unprotected"],
    faqs: [
      {
        question: "What should I check first when a DG fails to start?",
        answer:
          "Starter battery voltage and the physical fuel dipstick — both take under a minute and rule out the two most common causes before you go further into the control panel's alarm history.",
      },
      {
        question: "The DG cranks but won't fire — what does that mean?",
        answer:
          "Cranking means the starter motor and battery are fine. If it cranks but doesn't fire, the problem is almost always fuel delivery — a clogged filter, a fuel pump issue, or water contamination in the fuel.",
      },
      {
        question: "Why does a DG with low oil refuse to start at all?",
        answer:
          "This is a deliberate engine protection, not a fault in the starting system. The control system will not let the engine start on low oil pressure or similar conditions, because starting it anyway risks serious engine damage.",
      },
    ],
    seoTitle: "DG Set Won't Start — Generator Fail-to-Start Checklist | Behind The Tech",
    seoDescription:
      "Diesel generator fails to start or won't crank: the real causes (battery, fuel, engine protection trips) and the exact checks to run before calling your DG OEM.",
    reviewedAt: REVIEWED_AT,
  },

  "crac-unit-fault-offline": {
    slug: "crac-unit-fault-offline",
    sourceId: "crac-fault",
    category: "Cooling",
    categoryColor: "#0284c7",
    title: "CRAC Unit Fault Alarm — Why It Trips and What to Do",
    directAnswer:
      "Most CRAC fault trips are a high-pressure trip on the refrigerant circuit, usually caused by a dirty or blocked condenser reducing heat rejection. Check whether other CRAC units in the same zone (N+1) can absorb the load first, then note the exact fault code before calling your cooling contractor — refrigerant work itself must be done by a licensed technician.",
    hazardous: true,
    safetyNote:
      "Refrigerant systems contain pressurized refrigerant. Do not attempt any refrigerant-circuit work yourself — leak checks beyond a visual inspection, recharging, or component replacement all require a licensed refrigerant technician. This page covers what you can safely check and when to escalate, not how to service the refrigerant circuit.",
    symptoms: [
      "CRAC unit fault alarm on BMS/DCIM",
      "CRAC unit fault LED active on the front panel",
      "CRAC supply air temperature rising (less cold than normal)",
      "Adjacent rack temperatures gradually increasing",
      "CRAC compressor not running (no sound, low power draw)",
    ],
    causes: [
      "High pressure trip — refrigerant circuit fault or condenser fouling",
      "Low pressure trip — low refrigerant charge or evaporator freeze",
      "High supply air temperature trip — coil icing or airflow restriction",
      "Compressor fault — electrical failure or mechanical seizure",
      "Fan failure — evaporator fan or condenser fan failure",
      "Power supply fault — a CRAC internal power issue",
    ],
    verify: [
      "CRAC front panel fault code — note the exact code before calling the OEM",
      "CRAC event log (if available) — last 20 events",
      "High/low pressure: pressure gauges on the CRAC if accessible",
      "Supply air temperature: below setpoint means working but less efficient, above setpoint means a fault",
      "Condenser unit (if split): is the condenser fan running? any visible damage?",
      "Power supply check: is CRAC main power on? is the circuit breaker intact?",
    ],
    steps: [
      "Check N+1 status: can other CRACs in the zone carry the increased load?",
      "Notify the team: cooling capacity is reduced and rack temperatures may rise — monitor closely",
      "CRAC front panel: what is the fault code? attempt a reset if the panel allows it",
      "If it resets: monitor for 30 minutes — does the fault recur?",
      "If it doesn't reset or recurs: note the fault code and call your cooling OEM/contractor",
      "Condenser check (split system): is the condenser fan running? are the fins clean?",
      "Refrigerant leak check: any ice or frost on the suction pipe, or oil staining around connections?",
      "Watch the temperature trend: if zone temperatures are rising rapidly, load shedding may be needed",
      "If remaining CRACs are above 75% load, flag the thermal risk and engage the contractor urgently",
    ],
    rootCause:
      "High-pressure trips are most common in hot climates — condenser fouling (dust on the fins reduces heat rejection), refrigerant overcharge, or a condenser location that recirculates hot air. A low-pressure trip usually points to a refrigerant leak.",
    resolution:
      "High pressure from condenser fouling: clean the condenser coils (specialist work). Low pressure from a refrigerant leak: leak detection, repair, and recharge by a licensed refrigerant technician. Fan failure: replacement. All refrigerant work must go through an OEM/certified contractor.",
    prevention: [
      "Quarterly condenser coil cleaning — especially in dusty environments",
      "Annual preventive maintenance by an OEM/certified contractor",
      "Monthly refrigerant pressure logging — trending helps predict failure",
      "Filter replacement per the OEM schedule (typically every 3–6 months)",
      "A CRAC runtime-hours log, with maintenance triggered by hours rather than calendar date",
    ],
    escalation:
      "If multiple CRACs are down simultaneously, or zone temperatures rise above 32°C, make an immediate emergency call to the cooling contractor and consider application load shedding if the thermal risk is high.",
    siteExample:
      "At a Noida DC, CRAC unit 3 alarmed at 3 PM with a high-pressure trip. Investigation found the outdoor condenser unit's fins were completely blocked with dust and debris from a nearby industrial area. Coil cleaning brought the unit back online within two hours — it had been running degraded for weeks beforehand. A quarterly cleaning schedule was established afterward.",
    mistakes: [
      "Attempting refrigerant work without certification — this is both illegal and dangerous",
      "Ignoring one CRAC fault because the zone has N+1 — a degraded state still needs urgent repair",
      "Not checking the condenser unit when an indoor CRAC shows a high-pressure fault",
    ],
    whyThisHappens:
      "A CRAC's compressor rejects the heat it removes from the room by pushing it into the refrigerant and then out through the condenser. If the condenser can't reject heat fast enough — dirty fins, poor airflow, hot recirculated air — refrigerant pressure on the high side climbs until the unit's own protection trips the compressor off, rather than let the refrigerant circuit or compressor be damaged by running at an unsafe pressure.",
    assumptions: [
      "Assumes a standard DX (direct expansion) CRAC with a high/low pressure trip; chilled-water CRAH units fail differently and are not covered by this page.",
      "Fault codes and reset procedures vary by CRAC manufacturer — confirm against your unit's own panel documentation.",
      "The 32°C escalation threshold is a general data-hall guideline, not a universal number — your site's own design temperature may differ.",
    ],
    relatedTopicSlug: "crac",
    relatedAnswerSlugs: [],
    faqs: [
      {
        question: "What's the single most common cause of a CRAC fault alarm?",
        answer:
          "A high-pressure trip from a dirty or blocked condenser. The condenser can't reject heat fast enough, pressure climbs, and the unit's protection trips the compressor off.",
      },
      {
        question: "Can I service the refrigerant circuit myself?",
        answer:
          "No. Refrigerant systems are pressurized and require a licensed refrigerant technician for anything beyond a basic visual check — this is both a safety and a legal requirement.",
      },
      {
        question: "Is one CRAC fault an emergency if the zone has N+1 redundancy?",
        answer:
          "It still needs urgent attention. N+1 means the zone can absorb one failure without an immediate temperature problem, but running degraded (N) for an extended period removes your safety margin if a second unit fails.",
      },
    ],
    seoTitle: "CRAC Unit Fault Alarm — Why It Trips and What to Do | Behind The Tech",
    seoDescription:
      "CRAC unit offline or showing a fault alarm: the real causes (high/low pressure trips, condenser fouling, fan failure), what to check safely, and when to call a refrigerant technician.",
    reviewedAt: REVIEWED_AT,
  },

  "vlan-servers-cant-reach-gateway": {
    slug: "vlan-servers-cant-reach-gateway",
    sourceId: "network-vlan",
    category: "Networking",
    categoryColor: "#7c3aed",
    title: "Servers Can't Reach Gateway on a VLAN — Fix Checklist",
    directAnswer:
      "If servers on one VLAN can't reach their gateway while other VLANs work fine, the VLAN is almost always missing from a trunk port somewhere between the server and its Layer 3 interface. Start with 'show vlan' and 'show interface trunk' to confirm the VLAN is both created and allowed on every trunk port in the path.",
    hazardous: false,
    symptoms: [
      "Servers in a specific VLAN can't ping their gateway",
      "ARP requests go unanswered (a packet capture shows no ARP reply)",
      "Inter-VLAN traffic fails but intra-VLAN traffic works",
      "The switch port shows up/up but no traffic is passing",
      "DHCP failures in that specific VLAN",
    ],
    causes: [
      "VLAN not configured on the trunk port between switches",
      "STP blocking the port for that specific VLAN",
      "Layer 3 switch: the interface VLAN was not created, or not set to 'no shutdown'",
      "Access port in the wrong VLAN (a misconfiguration during a rack move)",
      "Native VLAN mismatch between the two ends of a trunk",
      "An ACL blocking traffic between VLANs",
    ],
    verify: [
      "Show VLAN database: is the VLAN ID created? is the port in the correct VLAN?",
      "Show trunk: is the VLAN in the allowed list on the trunk ports?",
      "Show spanning-tree vlan X: are any ports in a blocking state?",
      "Layer 3: show interface vlan X — is it up/up? is the IP address correct?",
      "Packet capture on the server NIC: is ARP being sent, and is there any reply?",
    ],
    steps: [
      "Confirm the VLAN ID on the server's NIC configuration matches the switch configuration",
      "Check the switch port: access mode? correct VLAN? ('show interface GiX/X switchport')",
      "Trace the trunk path: do all trunk ports in the path allow the VLAN? ('show interface trunk')",
      "STP check: 'show spanning-tree vlan X' — review port states for any blocking",
      "Layer 3 SVI: 'show interface vlan X' — is it up, with the correct IP?",
      "Is the default gateway on the server correct, and on the same subnet as the VLAN SVI?",
      "Packet capture at the server: is the ARP request for the gateway's MAC getting a reply?",
      "Check ACLs: is any ACL on the VLAN interface blocking traffic?",
      "If this is a DHCP issue: 'show ip dhcp binding' — was an IP assigned? is the helper address set on the SVI?",
      "Compare a working VLAN's configuration against the broken VLAN's to find the difference",
    ],
    rootCause:
      "Most commonly, a VLAN was added to the server side but not propagated to every trunk port in the path. The second most common cause is an STP topology change after maintenance that left a port stuck in blocking.",
    resolution:
      "Add the VLAN to the trunk ports at both ends, verify the SVI is up, and check STP port states. If STP is blocking incorrectly, investigate root bridge placement and whether PortFast is set on access ports.",
    prevention: [
      "Change management: a VLAN addition should require documenting every trunk port it must traverse",
      "Keep a network diagram with VLAN-to-port mapping, updated after every change",
      "STP monitoring with a topology-change alert",
      "Make a post-change connectivity test a standard part of every network change",
    ],
    escalation:
      "Escalate to the network team (L2) after an initial assessment. If there is production impact, notify the application team of an ETA and involve NOC for monitoring.",
    siteExample:
      "After a server rack migration, three servers couldn't reach their gateway. A 45-minute debug found the new top-of-rack switch's trunk port was missing VLAN 40 from its allowed list — one command fixed it. The root cause was a migration checklist that didn't include 'verify VLAN trunk config on the destination switch', which was added afterward.",
    mistakes: [
      "Rebooting the server without checking the network first — a server reboot won't fix a switch configuration",
      "Checking only the access port without verifying the trunk ports upstream",
      "Missing a native VLAN mismatch — a subtle issue that causes intermittent, hard-to-reproduce behavior",
    ],
    whyThisHappens:
      "A VLAN only carries traffic across a link if that link's trunk configuration explicitly allows it. A switch port can be physically up and passing some traffic while still silently dropping frames for one specific VLAN, because 'the VLAN exists on the switch' and 'the VLAN is allowed on this particular trunk' are two separate configuration facts — adding a VLAN in one place does not automatically add it everywhere it needs to travel.",
    assumptions: [
      "Commands shown (show vlan, show interface trunk, show spanning-tree) are generic Cisco-style IOS syntax — exact commands vary by switch vendor and OS.",
      "Assumes a standard Layer 2/Layer 3 switched network with VLANs terminated on an SVI; a router-on-a-stick or pure-Layer-2 design will differ in where to check.",
      "ACL and DHCP-helper configuration specifics are site-dependent and not covered in detail here.",
    ],
    relatedTopicSlug: "switch",
    relatedAnswerSlugs: [],
    faqs: [
      {
        question: "Why does intra-VLAN traffic work but inter-VLAN traffic fail?",
        answer:
          "This points to the Layer 3 side — the VLAN's own switching is fine, but either its SVI (interface VLAN) is down or misconfigured, or something (an ACL, a missing route) is blocking traffic once it needs to leave that VLAN.",
      },
      {
        question: "What's the fastest way to find a missing VLAN on a trunk?",
        answer:
          "Compare 'show interface trunk' output on every switch in the path between the server and its gateway. The VLAN will be present in the allowed list everywhere except the one trunk port causing the problem.",
      },
      {
        question: "Could this be a server-side problem instead of the network?",
        answer:
          "It's possible, but check the network first. If a packet capture at the server shows an ARP request going out with no reply at all, the problem is almost always upstream, not on the server itself.",
      },
    ],
    seoTitle: "Servers Can't Reach Gateway on a VLAN — Fix Checklist | Behind The Tech",
    seoDescription:
      "VLAN connectivity failure: servers can't ping their gateway or get DHCP on one VLAN. The real causes (missing trunk VLAN, STP blocking, SVI down) and the exact commands to isolate it.",
    reviewedAt: REVIEWED_AT,
  },

  "server-wont-post": {
    slug: "server-wont-post",
    sourceId: "server-post-failure",
    category: "Servers",
    categoryColor: "#475569",
    title: "Server Won't POST or Boot — Diagnostic Checklist",
    directAnswer:
      "A server stuck at POST with no OS boot is most often a memory (DIMM) problem — either a failed module or one that isn't seated properly after maintenance. Note the exact error code on the front panel or in the iDRAC/iLO log before touching anything, then reseat the DIMMs and retry before escalating further.",
    hazardous: false,
    safetyNote:
      "Always power the server off and disconnect it from power before reseating components, and follow proper ESD (electrostatic discharge) precautions. CPU reseating should be left to an OEM engineer — the socket pins are very delicate and easy to damage without the right tools and training.",
    symptoms: [
      "Server powers on but no OS boot — stuck at the POST screen",
      "iDRAC/iLO shows POST error codes",
      "Physical error LEDs lit on the server's front panel",
      "Repeated reboot cycles without completing POST",
      "Memory failure codes shown on the server's LCD",
    ],
    causes: [
      "Memory module failure — a single DIMM failure or a memory-compatibility issue",
      "A DIMM not seated properly after maintenance",
      "CPU failure, or a CPU not seated correctly",
      "A PCIe device causing a POST hang (network card, storage controller)",
      "BIOS/UEFI corruption",
      "CMOS battery failure on the server board",
    ],
    verify: [
      "Server LCD/front-panel error code — note the exact code before resetting anything",
      "iDRAC/iLO system event log — what error was logged at the last power-on?",
      "Physical check: are all DIMMs seated? is the CPU socket cover installed?",
      "Was there any recent maintenance on this server, and what was done?",
      "POST beep codes: how many beeps, and what pattern?",
    ],
    steps: [
      "Note the exact error code from the front panel/LCD before resetting it",
      "Check the iDRAC/iLO system log for the last power-on events",
      "Power off, then reseat all DIMMs — remove and firmly reinstall each one",
      "Power on with minimal hardware: remove all PCIe cards except the essential ones",
      "Memory test: boot with one DIMM at a time to isolate the failed module",
      "Reset BIOS to defaults: BIOS/UEFI → Load Optimal Defaults",
      "Check the CMOS battery: if the server's date resets to 2000, the CMOS battery (CR2032) is flat",
      "If a CPU fault is suspected, this needs an OEM engineer — the CPU socket is very delicate",
      "Update server firmware (BIOS/iDRAC) if the other steps don't resolve it",
      "Contact the OEM with the exact error code if it's still unresolved",
    ],
    rootCause:
      "Memory module failure or poor seating after maintenance is the most common cause. A PCIe card conflict — a new card causing a POST hang — is the second most common. BIOS corruption is less common but requires a firmware reflash.",
    resolution:
      "Memory: replace the failed DIMM. PCIe conflict: remove cards one at a time to identify the offending one. BIOS corruption: follow the BIOS recovery procedure (varies by OEM — typically a USB recovery or a jumper reset).",
    prevention: [
      "Proper ESD procedures during any memory or hardware work",
      "Verify memory compatibility against the OEM's compatibility list before installing",
      "Record the server's configuration before maintenance, so it's easy to restore",
      "Back up the BIOS configuration before any firmware update",
    ],
    escalation:
      "A suspected CPU fault or motherboard fault needs an OEM engineer — this cannot be safely field-repaired without the proper tools and training.",
    siteExample:
      "A Dell R750 server failed POST after a RAM upgrade, showing code 'DIMM slot B1 failure'. Reseating the DIMM in the same slot didn't help, but moving it to a different slot worked — the original B1 slot had a damaged socket pin, and the server was RMA'd for the slot repair. A verification step was added: test each new DIMM in its designated slot before closing the server back up.",
    mistakes: [
      "Changing multiple things at once — this makes it impossible to isolate which change caused the POST failure",
      "Not noting the error code before attempting fixes — this loses diagnostic information",
      "Attempting CPU reseating without proper training — CPU socket pins are extremely delicate",
    ],
    whyThisHappens:
      "POST (Power-On Self-Test) runs a hardware check before the operating system ever loads. If it finds a component it can't verify as working — a DIMM that fails its memory test, a CPU the board can't detect correctly — it halts there deliberately rather than let an unstable system try to boot an OS on top of broken hardware, which could cause silent data corruption instead of an obvious failure.",
    assumptions: [
      "Error codes, beep patterns, and recovery procedures (BIOS reset, CMOS battery type) vary significantly by server OEM — this page describes the general diagnostic path, not any one vendor's exact codes.",
      "Assumes a standard rack or tower server with an out-of-band management controller (iDRAC/iLO or equivalent); bare servers without one will need a physical console instead.",
    ],
    relatedTopicSlug: "server-basics",
    relatedAnswerSlugs: ["ups-bypass-load-unprotected"],
    faqs: [
      {
        question: "What is the single most useful thing to do before trying any fix?",
        answer:
          "Note the exact error code from the front panel or the iDRAC/iLO log before resetting anything. Once you clear the alarm or power-cycle the server, that diagnostic information can be lost.",
      },
      {
        question: "The server boots fine with one DIMM removed — what does that mean?",
        answer:
          "It usually means that removed DIMM (or the slot it was in) is the problem. Testing one DIMM at a time, in its own designated slot, is the standard way to isolate a memory fault.",
      },
      {
        question: "Can I reseat the CPU myself to fix a POST failure?",
        answer:
          "This isn't recommended. CPU socket pins are extremely delicate and easy to bend or damage without the right tools and training — a suspected CPU fault should go to an OEM engineer.",
      },
    ],
    seoTitle: "Server Won't POST or Boot — Diagnostic Checklist | Behind The Tech",
    seoDescription:
      "Server stuck at POST with no OS boot: the real causes (memory, PCIe conflict, BIOS corruption), the exact diagnostic steps, and when a CPU fault needs an OEM engineer.",
    reviewedAt: REVIEWED_AT,
  },

  "vesda-alarm-what-to-do": {
    slug: "vesda-alarm-what-to-do",
    sourceId: "fire-vesda-alarm",
    category: "Fire",
    categoryColor: "#dc2626",
    title: "VESDA Alarm Went Off — What to Do Right Now",
    directAnswer:
      "Do not acknowledge and dismiss a VESDA alarm without physically checking the zone first. Send two people to visually inspect the area for smoke, a burning smell, or equipment with fault LEDs — VESDA is designed to detect smoke particles long before any of this would be visible, so even an 'Alert' level alarm deserves a real look, not a reset.",
    hazardous: true,
    safetyNote:
      "This is a fire-detection alarm. If you find any sign of actual smoke or burning, follow your site's fire emergency procedure immediately — evacuation and fire panel notification take priority over any troubleshooting. This page is about how to respond to a VESDA alarm safely; it is not a substitute for your site's fire emergency procedure, and it gives no instruction for operating fire-suppression equipment.",
    symptoms: [
      "VESDA panel showing an Alert or Action level alarm",
      "VESDA aspirating pipe shows an increased particle count",
      "A BMS alarm raised from the fire detection system",
      "VESDA Pre-alarm level activated (below the full alarm threshold)",
    ],
    causes: [
      "Actual overheating equipment — an incipient fire stage",
      "Dust contamination in the aspirating pipe, especially during nearby construction or work",
      "Chemical contamination — a solvent or cleaning product used near a pipe inlet",
      "Pest activity underfloor — rodent droppings near an inlet",
      "VESDA sensor aging — sensitivity drift over time",
    ],
    verify: [
      "Which VESDA zone, and which sampling pipe inlet point — narrow the location",
      "VESDA alarm level: Alert vs Action vs Fire alarm — this determines the urgency",
      "Visual inspection: walk the zone immediately — any visible smoke, or a burning smell?",
      "Server equipment: any fault LEDs or amber indicators in the zone?",
      "Temperature sensors in the zone: any elevated readings?",
    ],
    steps: [
      "Immediately send a two-person response to the VESDA zone — both people should assess before any action is taken",
      "Visually inspect the zone: any visible smoke? any burning smell? any equipment with fault indicators?",
      "Inspect server equipment: power supply LEDs, any sign of overheating components",
      "Check cables for any discoloration or burning odor",
      "If there is any sign of actual smoke: follow your emergency procedure — evacuation, fire panel notification",
      "If there's no visible smoke: the VESDA may be reacting to construction dust or cleaning chemicals",
      "Notify the fire safety officer per your site's procedure",
      "Call a VESDA engineer to inspect the system and identify the alarm source",
      "Do not acknowledge and ignore a VESDA alarm without a physical investigation",
      "Document the time, zone, observations, and actions taken",
    ],
    rootCause:
      "In data center environments, the real risk case is usually an overheating power supply (the most common actual cause behind a true alarm), while dust or chemical contamination is the most common cause of a false alarm. VESDA's sensitivity means it alarms well before any visible smoke — that early warning is its entire purpose.",
    resolution:
      "If there is an actual smoke source: power off the affected equipment, follow your fire emergency procedure, and notify the fire department if there is an actual fire. For dust or chemical contamination: clean the aspirating pipes and identify the contamination source. Even a VESDA false alarm still needs its root cause identified, not just a reset.",
    prevention: [
      "Negative-pressure work areas during construction, to stop dust entering the data hall",
      "A chemical-use restriction inside the DC without fire safety officer approval",
      "VESDA cleaning and calibration per the OEM schedule",
      "Server equipment health monitoring, so failing power supplies are caught before the VESDA alarm stage",
    ],
    escalation:
      "Any sign of actual smoke or burning means an immediate fire emergency response — evacuation, fire department notification, and fire panel activation. A VESDA Action-level alarm with no visible cause found still needs senior management and fire safety officer notification.",
    siteExample:
      "A VESDA Alert alarm went off at 11 PM in one pod. Two engineers investigated immediately and found a server in one row with an amber power-supply fault LED and a slight burning smell from the rear. The server was gracefully shut down — the power supply had a failing capacitor in its pre-failure stage. VESDA caught it hours before it would have become an actual fire, and the power supply was replaced.",
    mistakes: [
      "Acknowledging the VESDA alarm without a physical investigation — this is the single most dangerous mistake",
      "Sending one person to investigate alone — safety requires at least two",
      "Disabling a VESDA zone because of 'too many false alarms' without ever fixing the root cause",
    ],
    whyThisHappens:
      "VESDA (Very Early Smoke Detection Apparatus) continuously samples air through small pipes and detects individual smoke particles at concentrations far below what a person could see or smell. That sensitivity is the entire point — it is designed to raise an alert while a fault is still at an 'overheating component' stage, long before it would become a visible fire — but it also means dust, chemical vapor, or even pest activity near an inlet can trigger the same early alarm levels, which is why a physical check is always required to tell the two apart.",
    assumptions: [
      "Describes general VESDA / aspirating smoke detection behavior; exact alarm thresholds (Alert/Action/Fire) and response procedures are configured per site and must follow your own fire safety officer's documented procedure.",
      "Gives no instruction for operating fire suppression (FM-200, NOVEC, sprinklers) — that is a separate, site-specific emergency procedure.",
    ],
    relatedTopicSlug: "vesda",
    relatedAnswerSlugs: [],
    faqs: [
      {
        question: "Can I just reset a VESDA alarm if it's happened before?",
        answer:
          "No. Every VESDA alarm needs a physical investigation before it is acknowledged, even if that zone has had false alarms before. Dismissing an alarm without checking is the most dangerous mistake a site can make.",
      },
      {
        question: "What's the most common real cause of a VESDA alarm in a data center?",
        answer:
          "An overheating power supply in its early failure stage is the most common genuine cause. Dust or chemical contamination near a sampling pipe inlet is the most common cause of a false alarm.",
      },
      {
        question: "Why does VESDA alarm before anyone can see or smell smoke?",
        answer:
          "That's its purpose. VESDA detects individual smoke particles at concentrations far below human senses, giving an early warning while equipment is still at an overheating stage rather than an active fire.",
      },
    ],
    seoTitle: "VESDA Alarm Went Off — What to Do Right Now | Behind The Tech",
    seoDescription:
      "VESDA Alert or Action alarm in a data center: the real causes (overheating equipment vs dust/chemical contamination), the safe response steps, and why you should never reset it without checking.",
    reviewedAt: REVIEWED_AT,
  },
};

export const FIX_ANSWER_SLUGS = Object.keys(FIX_ANSWERS);
