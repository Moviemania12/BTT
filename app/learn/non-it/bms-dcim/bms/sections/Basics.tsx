"use client";

import { S, Callout, ComparisonTable, Figure } from "../shared";
import TopicLink from "@/components/TopicLink";
import BmsDcArchitecture from "../svg/BmsDcArchitecture";

export default function Basics() {
  return (
    <>
      {/* ── Quick Summary ───────────────────────────────────────────────── */}
      <div style={{ background: "#f0fdf4", border: "1px solid #bbf7d0", borderRadius: "10px", padding: "1.2rem 1.4rem", marginBottom: "2rem" }}>
        <p style={{ fontWeight: 700, color: "#14532d", marginBottom: "0.6rem", fontSize: "1rem" }}>📋 Quick Summary — BMS in 2 Minutes</p>
        <ul style={{ ...S.ul, marginBottom: 0 }}>
          <li><strong>BMS kya hai:</strong> Building Management System — ek centralized platform jo building ke mechanical aur electrical systems monitor karta hai aur jahan design kiya gaya ho, control bhi karta hai.</li>
          <li><strong>Sirf Data Center nahi:</strong> BMS hospitals, hotels, airports, malls, universities, industrial plants mein bhi use hota hai. Data Center mein sirf zyada critical aur granular use hota hai.</li>
          <li><strong>BMS vs DCIM:</strong> BMS building infrastructure monitor karta hai — HVAC, power, environment. DCIM IT assets, rack power, PUE aur capacity plan karta hai. Dono overlap karte hain lekin alag tools hain.</li>
          <li><strong>How data flows:</strong> Equipment → Sensor/Controller → Protocol (Modbus/BACnet/SNMP) → BMS Server → Database → Tag → HMI Graphic → Alarm/Trend.</li>
          <li><strong>Protocols:</strong> Modbus RTU (RS-485), Modbus TCP, BACnet MS/TP, BACnet/IP, SNMP common hain. Har protocol ki apni addressing, register/object structure aur troubleshooting hai.</li>
          <li><strong>Monitoring ≠ Control:</strong> Most BMS points read-only hote hain. Control points carefully designed, authorized aur protected hone chahiye — critical equipment pe especially.</li>
        </ul>
      </div>

      {/* ═══════════════════════════════════════════════════════════════
          SECTION 1 — WHAT IS BMS
      ═══════════════════════════════════════════════════════════════ */}
      <h2 id="what-is-bms" style={S.h2}>What Is a Building Management System?</h2>

      <p style={S.p}>
        Building Management System — ya BMS — ek centralized software aur hardware platform hai jo kisi
        bhi bade building ya facility ke mechanical, electrical aur environmental systems ko ek jagah se
        monitor karta hai. Jab BMS sirf monitoring karta hai to ye operator ko real-time visibility deta
        hai — kya chal raha hai, kab kuch galat hua, aur trend kya hai. Jab BMS control bhi karta hai
        to ye setpoints change kar sakta hai, sequences run kar sakta hai, aur equipment ko command de
        sakta hai — lekin sirf wahan jahan specifically design kiya gaya ho.
      </p>

      <p style={S.p}>
        BMS ka ek central principle hai centralization — har equipment ka apna local display hota hai,
        lekin BMS operator ko ek screen se poori facility ka view deta hai. Ek NOC engineer generator
        room mein gaye bina diesel level dekh sakta hai, UPS load check kar sakta hai, CRAC unit supply
        air temperature verify kar sakta hai — sab ek dashboard se.
      </p>

      <h3 style={S.h3}>BMS Across Industries — Not Just Data Centers</h3>

      <p style={S.p}>
        BMS sirf data center ka concept nahi hai. Ye technology commercially kaafi broader hai aur kai
        industry verticals mein use hota hai:
      </p>

      <ul style={S.ul}>
        <li><strong>Hospitals:</strong> OT temperature/humidity critical hai — BMS continuous monitoring aur alarm ensure karta hai.</li>
        <li><strong>Hotels:</strong> Per-room HVAC control, energy optimization, lobby environment aur kitchen ventilation.</li>
        <li><strong>Airports:</strong> Passenger areas ka temperature control, baggage area monitoring, large HVAC plants.</li>
        <li><strong>Shopping Malls:</strong> Central HVAC, lighting schedules, escalators aur energy reporting.</li>
        <li><strong>Industrial Plants:</strong> Equipment status monitoring, utility tracking, compressed air, cooling towers.</li>
        <li><strong>Campuses and Government Buildings:</strong> Multi-building energy management, utility sub-metering.</li>
        <li><strong>Data Centers:</strong> Critical infrastructure monitoring — power chain, cooling, environment, alarm management — where continuous operation and fast fault detection are essential.</li>
      </ul>

      <Callout type="important" title="BMS Is a Tool — Not a Replacement">
        BMS visibility aur alarm deta hai. Ye UPS, PAC, ya DG ka replacement nahi hai. Aur dedicated
        fire alarm, life-safety ya security systems ko BMS replace nahi karta. BMS in systems se sirf
        selected status/alarm points receive karta hai — monitoring ke liye — while those systems operate
        independently on their own controllers and logic.
      </Callout>

      <h3 style={S.h3}>What Makes a Data Center BMS Different</h3>

      <p style={S.p}>
        Data centers mein BMS ka use kuch specific reasons se zyada critical hai. 24/7 continuous
        operation mean karta hai ki koi bhi fault — chahe chota sa temperature drift ho ya UPS pe minor
        alarm — immediately visible hona chahiye. Data center mein multiple critical systems ek saath
        operate karte hain — power chain se cooling tak — aur in sab ka correlation BMS se milta hai.
        Client SLAs, compliance audits aur insurance requirements bhi documented monitoring evidence maangti hain.
      </p>

      <p style={S.p}>
        Data center BMS typically zyada points, stricter alarm configurations, longer trend retention
        aur tighter integration requirements have karta hai compared to a typical commercial building.
        High-density DC environments mein — jahan 50-100 kW racks chal rahe hain — real-time
        temperature aur power data ke bina operations blind hoti hain.
      </p>

      {/* ═══════════════════════════════════════════════════════════════
          SECTION 2 — WHY DATA CENTERS USE BMS
      ═══════════════════════════════════════════════════════════════ */}
      <h2 id="why-dc-uses-bms" style={S.h2}>Why Data Centers Use BMS</h2>

      <p style={S.p}>
        Data center ka har critical system — UPS, DG, ATS, CRAC, chiller, cooling tower, fuel tank —
        apne local controller pe operate karta hai. Ye systems independently stable hain. Problem tab
        hoti hai jab engineer ko yaar pata karna ho ki <em>right now, across the entire facility, kya
        ho raha hai</em> — aur kab correlated faults ek ek point se piece kar ke dekhne chahiye
        jaisi emergency mein. BMS ye correlation aur centralization provide karta hai.
      </p>

      <p style={S.p}>
        Alarm management BMS ka sabse important use case hai data centers mein. Ek CRAC unit ka
        filter alarm silently aata hai, acknowledge nahi hota, temperature drift shuru hoti hai —
        aur tab pata chalta hai jab servers thermal throttle karne lagte hain. BMS ke saath alarm
        priority, escalation, aur acknowledgement track hota hai. Trend data se pata chalta hai ki
        filter replacement kab se overdue tha.
      </p>

      <p style={S.p}>
        Compliance aur audit requirements bhi BMS ko drive karte hain. ISO 27001 physical environment
        monitoring require karta hai. Tier certification, insurance aur client contracts operational
        monitoring evidence maangte hain. BMS reports — daily temperature logs, UPS event history,
        power consumption trends — ye sab audit ke time production-ready documents hote hain. Manual
        logs se ye guarantee nahi milti.
      </p>

      <Callout type="best-practice" title="BMS Saves Money Through Trends">
        Data center energy cost ka bada hissa cooling aur power conditioning hai. BMS trend data se
        PUE (Power Usage Effectiveness) track hoti hai, cooling inefficiency spots dikhte hain, aur
        over-provisioned capacity identify hoti hai. Energy optimization ROI aksar BMS implementation
        cost se zyada hoti hai multi-year horizon pe.
      </Callout>

      {/* ═══════════════════════════════════════════════════════════════
          SECTION 3 — BMS vs EMS vs DCIM vs SCADA
      ═══════════════════════════════════════════════════════════════ */}
      <h2 id="bms-vs-dcim-ems-scada" style={S.h2}>BMS vs EMS vs DCIM vs SCADA</h2>

      <p style={S.p}>
        Ye four terms industry mein often overlap karte hain aur sometimes loosely interchange hote
        hain — lekin technically alag domains hain. Data center engineer ke liye ye distinction clear
        hona zaroori hai.
      </p>

      <h3 style={S.h3}>BMS — Building Management System</h3>
      <p style={S.p}>
        Building infrastructure ka central monitoring aur control platform. HVAC, electrical systems,
        environmental sensors, fire alarm integration (status only), lighting — ye sab BMS domain mein
        hain. Typically uses BACnet, Modbus, Lon protocol standards. Building automation industry se
        aaya hai.
      </p>

      <h3 style={S.h3}>EMS — Energy Management System</h3>
      <p style={S.p}>
        Energy consumption pe focus karta hai — utility meters, sub-metering, demand response, carbon
        footprint, energy reporting. BMS mein EMS capability build kiya ja sakta hai, ya separate EMS
        platform BMS se data lete hain. ISO 50001 energy management systems ek formal standard hai.
        Kuch vendors BMS aur EMS ko ek platform mein combine karte hain.
      </p>

      <h3 style={S.h3}>DCIM — Data Center Infrastructure Management</h3>
      <p style={S.p}>
        DCIM IT infrastructure pe focus karta hai — rack-level power consumption, IT asset inventory,
        capacity planning, PUE calculation, cooling optimization for IT load, cable management. DCIM
        PDU/UPS se per-rack power data leta hai, IT asset databases se integrate karta hai. BMS se
        environmental data DCIM pull kar sakta hai. Both exist together in enterprise data centers —
        they complement each other.
      </p>

      <h3 style={S.h3}>SCADA — Supervisory Control and Data Acquisition</h3>
      <p style={S.p}>
        Industrial process control ka term hai — oil refineries, power plants, water treatment. SCADA
        high-speed real-time control pe focus karta hai, often mission-critical process automation.
        Data centers mein SCADA typically use nahi hota — lekin kuch large facilities aur hyperscalers
        SCADA-heritage platforms use karte hain electrical aur cooling control ke liye. Terminologically
        BMS aur SCADA different engineering traditions se aate hain lekin functionally overlap karte hain.
      </p>

      <ComparisonTable
        title="BMS vs EMS vs DCIM vs SCADA — Key Differences"
        headers={["Dimension", "BMS", "EMS", "DCIM", "SCADA"]}
        rows={[
          ["Primary focus", "Building M&E systems", "Energy consumption", "IT infrastructure", "Industrial process control"],
          ["Typical protocols", "BACnet, Modbus, LON", "Modbus, DLMS/COSEM, API", "SNMP, IPMI, Modbus, REST API", "Modbus, DNP3, IEC 61850, OPC"],
          ["Data center use", "Very common", "Often built into BMS", "Common in enterprise DC", "Specialized / hyperscale"],
          ["Alarm management", "Core feature", "Basic / energy focused", "IT-focused alarms", "Core feature"],
          ["IT asset awareness", "No", "No", "Yes — core feature", "No"],
          ["PUE tracking", "Can contribute data", "Can calculate", "Core feature", "Possible"],
          ["Examples", "Schneider EcoStruxure, Siemens Desigo, JCI Metasys", "ISO 50001 platforms", "Vertiv Trellis, Nlyte, Sunbird", "Wonderware, Ignition, Rockwell"],
        ]}
        caption="Actual feature boundaries vary by vendor platform. Many enterprise solutions blend multiple functions."
      />

      <Callout type="maintenance" title="Vendor Marketing Blurs These Lines">
        Many BMS vendors add DCIM-like features to their platforms; DCIM vendors add BMS integration.
        When evaluating a platform, specify what you actually need — power chain monitoring, cooling
        monitoring, IT asset management, energy reporting — aur verify specific capabilities with
        the vendor rather than relying on category labels.
      </Callout>

      {/* Architecture Diagram */}
      <Figure caption="Fig 1 — Five-layer BMS architecture for a data center. Actual layer components and protocols depend on project design.">
        <BmsDcArchitecture />
      </Figure>
    </>
  );
}
