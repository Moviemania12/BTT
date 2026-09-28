"use client";
import { S, Callout, ComparisonTable } from "../shared";
import TopicLink from "@/components/TopicLink";
import { faqs } from "../metadata";

export default function SoftwareAndClosing() {
  return (
    <>
      <h2 id="dcim-software" style={S.h2}>DCIM Software Platforms</h2>
      <Callout type="important" title="Vendor Claims — Always Verify with Current Documentation">
        DCIM platforms rapidly evolve. Features, editions, pricing and capabilities change frequently. The overview given below is for general understanding — for a specific project verify with current vendor documentation, product datasheets and a demo. Do not rely solely on this article for procurement decisions.
      </Callout>

      <h3 style={S.h3}>Vertiv Trellis</h3>
      <p style={S.p}>Vertiv Trellis is an enterprise DCIM platform — it focuses on asset management, capacity planning, power chain visualization, environmental monitoring and intelligent PDU integration. Integration with Vertiv equipment (Geist intelligent PDUs, Liebert UPS) is typically tighter — third-party equipment support depends on the integration design. The platform has rack elevation, floor plan views, power/space/cooling capacity dashboards, and reporting capabilities. The Vertiv portfolio and product tiers keep evolving — verify current active product names, editions and feature sets from current Vertiv documentation.</p>
      <p style={S.p}>Vertiv Environet and the Geist ecosystem are separate Vertiv offerings for monitoring — alerting and monitoring of environmental sensors, power equipment and devices. Verify actual product names, relationships and capabilities from current Vertiv documentation — the product portfolio changes over time.</p>

      <h3 style={S.h3}>Athenta</h3>
      <p style={S.p}>Athenta is a DCIM and facility monitoring platform that focuses on data center infrastructure monitoring, dashboards, alerts and reporting. The platform claims to provide power monitoring, environmental monitoring and integration capabilities — verify the actual feature set, supported protocols, editions and deployment options from current official Athenta documentation. This article makes no specific deployment claim or regional availability claim about Athenta — refer to Athenta's official resources for current accurate information.</p>

      <h3 style={S.h3}>Schneider Electric EcoStruxure IT</h3>
      <p style={S.p}>Schneider Electric's EcoStruxure IT (previously known as StruxureWare Data Center Expert and related products) provides data center monitoring and DCIM capabilities. Native integration is strong with APC intelligent PDUs, NetShelter racks, Schneider UPS. Both on-premises and cloud-based monitoring components are available in the EcoStruxure IT portfolio — verify product names, architecture and deployment options with Schneider documentation because the portfolio keeps evolving. Integration with Schneider's broader EcoStruxure ecosystem — EcoStruxure Building Operation (BMS) — is possible where specifically designed.</p>

      <h3 style={S.h3}>Sunbird dcTrack</h3>
      <p style={S.p}>Sunbird dcTrack focuses on asset management and DCIM — rack elevation, floor plan, cable management, capacity planning. Sunbird Power IQ is a related offering for power monitoring — verify packaging, integration and bundling from current Sunbird documentation. API integration capabilities depend on the current product version. Verify features and capabilities from current Sunbird documentation.</p>

      <h3 style={S.h3}>Nlyte Software</h3>
      <p style={S.p}>Nlyte is a DCIM platform for enterprise data centers — asset management, capacity planning, MAC workflows, energy management capabilities. Nlyte's focus is on larger enterprise environments. It has had a partnership history with IBM. Verify the current product status and ownership structure — DCIM market consolidation is common.</p>

      <h3 style={S.h3}>OpenDCIM</h3>
      <p style={S.p}>OpenDCIM is an open-source DCIM tool — primarily for asset management and rack documentation. A cost-effective option for smaller deployments. Real-time monitoring capabilities are limited compared to commercial platforms. Self-hosted, community-supported. Suitable as a starting point or supplementary tool.</p>

      <ComparisonTable
        title="DCIM Platform Overview — High Level (Verify with Current Vendor Documentation)"
        headers={["Platform","Vendor","Core Strength","Integration","Note"]}
        rows={[
          ["Trellis","Vertiv","Asset mgmt, power chain, Geist PDU integration","SNMP, Modbus, proprietary","Strong with Vertiv ecosystem; third-party depends on integration"],
          ["Athenta","Athenta","Facility monitoring, dashboards, alerts","SNMP, Modbus, API (verify current docs)","Verify all capabilities with current Athenta documentation"],
          ["EcoStruxure IT","Schneider Electric","APC/Schneider ecosystem integration","SNMP, API, BMS integration","Strong with Schneider hardware"],
          ["dcTrack + Power IQ","Sunbird","Asset mgmt + power monitoring tools","SNMP, Modbus, API (verify current)","Good cable management; packaging/API verify with current docs"],
          ["Nlyte","Nlyte","Enterprise asset + capacity + MAC","SNMP, API, third-party","Enterprise focus, verify current status"],
          ["OpenDCIM","Community","Asset documentation, rack mgmt","Limited real-time monitoring","Open source, self-hosted"],
        ]}
        caption="All capability claims should be verified with current vendor documentation, product datasheets and evaluation."
      />

      <h2 id="preventive-maintenance" style={S.h2}>Preventive Maintenance</h2>
      <p style={S.p}>Below is an example frequency schedule — the actual frequency depends on site policy, vendor recommendations, platform criticality and contractual requirements. <strong>Example monthly checks:</strong> all monitored devices online — communication status dashboard. Sample 10-20 device readings vs actual (spot check). Alarm log review — missed alarms, false positives. Asset changes since last month — is DCIM updated? <strong>Example quarterly:</strong> full asset audit walkthrough — do physical and DCIM records match? Capacity reports review. Report generation test. User access audit. <strong>Example annual:</strong> software updates (per change management). Integration test — are all data sources active? Historian storage capacity review. Data retention compliance check. API keys rotation where applicable.</p>

      <h2 id="troubleshooting" style={S.h2}>Engineer Troubleshooting — DCIM Data Issues</h2>
      <h3 style={S.h3}>Device Offline in DCIM</h3>
      <p style={S.p}><strong>First:</strong> Network — ping device IP from DCIM server. Firewall rule UDP 161 open (SNMP)? TCP 502 open (Modbus)? <strong>Next:</strong> SNMP — community string correct? v3 credentials match? Device SNMP agent enabled? <strong>Fix:</strong> Network/firewall fix. SNMP reconfigure. If device IP changed — update in DCIM.</p>
      <h3 style={S.h3}>Missing Asset Data / Asset Not in DCIM</h3>
      <p style={S.p}>Discovery scan miss kiya? Manually add asset. Asset record incomplete — bulk import from spreadsheet. Asset in wrong location — verify physical vs DCIM rack/U position.</p>
      <h3 style={S.h3}>Wrong Power Values</h3>
      <p style={S.p}>Scaling error — PDU SNMP value in mA, DCIM expecting A? Conversion factor missing? CT ratio wrong (if metered)? Verify OEM MIB units vs DCIM unit config. Compare with intelligent PDU local display.</p>
      <h3 style={S.h3}>Duplicate Devices</h3>
      <p style={S.p}>Discovery ran multiple times — merge or delete duplicates. Same device with different IP (DHCP change) — consolidate. Naming convention inconsistent — standardize.</p>
      <h3 style={S.h3}>Capacity Calculation Wrong</h3>
      <p style={S.p}>Asset records stale — equipment removed but not updated in DCIM? Nameplate vs actual: DCIM using nameplate for unmetered equipment — actual will differ. Check power allocation rules — allocated vs actual consumed.</p>
      <h3 style={S.h3}>SNMP Failure</h3>
      <p style={S.p}>Wrong SNMP version. Community string mismatch. SNMP agent not running on device. Firewall blocking UDP 161. DCIM IP not in device SNMP access list (some devices configure an explicit ACL).</p>

      <ComparisonTable
        title="DCIM Troubleshooting Quick Reference"
        headers={["Symptom","First Check","Next Check","Likely Cause","Corrective Action"]}
        rows={[
          ["Device offline","Ping device from DCIM server","SNMP walk from CLI?","Network/firewall or SNMP config","Fix network, correct SNMP creds"],
          ["Wrong power value","OEM MIB unit vs DCIM config","Scaling/conversion factor","Unit mismatch (mA vs A, W vs kW)","Fix scaling in DCIM point config"],
          ["Asset not in DCIM","Discovery scan run?","Physical location vs DCIM","Asset not discovered or added","Manual add or re-run discovery"],
          ["Duplicate devices","Same IP? Same serial?","Discovery history","Multiple discovery runs","Merge or delete duplicates"],
          ["Stale/frozen value","Device comm active?","Polling interval, timeout","Comm issue or device fault","Fix comm, check device"],
          ["Capacity report wrong","Asset records current?","Nameplate vs actual power","Stale assets or wrong allocation","Update asset records, verify metering"],
          ["Report mismatch","Report date range correct?","Data completeness (gaps?)","Historian gap or wrong filter","Rerun with correct params"],
          ["SNMP not working","SNMP version/community?","Device SNMP ACL?","Auth mismatch or ACL block","Fix credentials or add DCIM IP to ACL"],
        ]}
      />

      <h2 id="illustrative-scenario" style={S.h2}>Illustrative Scenario</h2>
      <Callout type="interview" title="Note: Illustrative scenario — not a documented real facility event">
        An enterprise DC operations team noticed that new servers needed to be added in Hall C, but a physical walkthrough suggested that 30% of the racks looked "empty". A capacity report was run in DCIM — 18 racks had less than 60% power consumption compared to nameplate capacity. Detailed DCIM analysis found that 6 racks had decommissioned servers still in the asset records (physically removed but DCIM had not been updated). And in 8 racks the servers were underutilized — consolidation was possible. DCIM-driven planning identified space to accommodate 12 new servers without additional rack procurement. Asset accuracy was the foundation of DCIM value.
      </Callout>

      <h2 id="interview-questions" style={S.h2}>Interview Questions</h2>
      <h3 style={S.h3}>Q1: How is power capacity calculated in DCIM?</h3>
      <p style={S.p}><strong>Answer:</strong> Rack power capacity compares three values: Allocated (nameplate sum of planned equipment), Actual measured (real-time kW from intelligent PDU or metering), and Available (UPS/PDU rated capacity minus allocated/actual). DCIM models the power chain — from UPS capacity trickling down to rack level. If actual metering is available it is accurate; without metering the nameplate estimate is conservative. Capacity = Available headroom at each level in the chain.</p>
      <h3 style={S.h3}>Q2: What is the difference between DCIM and NMS?</h3>
      <p style={S.p}><strong>Answer:</strong> An NMS (Network Management System) manages network devices — switches, routers, firewalls: network topology, bandwidth utilization, interface status, BGP/OSPF routing. DCIM focuses on physical IT infrastructure — asset records, rack positions, power consumption, cooling, cable connectivity. An NMS typically monitors network devices over SNMP or NETCONF for operational visibility; DCIM is for physical infrastructure inventory and capacity management. In the enterprise there are two separate tools that integrate through APIs.</p>
      <h3 style={S.h3}>Q3: What is Athenta?</h3>
      <p style={S.p}><strong>Answer:</strong> Athenta is a DCIM and facility monitoring platform that provides dashboards, real-time monitoring, alerts and reporting for data center infrastructure. It claims power monitoring, environmental monitoring and integration capabilities — verify the specific feature set, protocol support and deployment options from current official Athenta documentation.</p>

      <h2 id="key-takeaways" style={S.h2}>Key Takeaways</h2>
      <ul style={S.ul}>
        <li>DCIM = the single source of truth for IT infrastructure — assets, racks, power chain, capacity, environment.</li>
        <li>Asset data quality determines DCIM effectiveness — an update on every MAC is essential.</li>
        <li>Power capacity planning has three dimensions: space, power (kW), cooling — plan all of them simultaneously.</li>
        <li>Actual metering (intelligent PDU) is much more accurate than nameplate estimation for capacity planning.</li>
        <li>DCIM integration southbound (devices) and northbound (BMS, EMS, NMS) — data normalization is critical.</li>
        <li>Vendor capabilities vary significantly — Vertiv Trellis, Athenta, Schneider EcoStruxure IT, Sunbird, Nlyte all have different strengths.</li>
        <li>When troubleshooting SNMP: ping → community string → v3 creds → ACL → port 161 → MIB.</li>
      </ul>

      <h2 style={{...S.h2,marginTop:"3rem"}}>Frequently Asked Questions</h2>
      {faqs.map((item,i)=>(
        <div key={i} style={{marginBottom:"1.5rem",paddingBottom:"1.5rem",borderBottom:i<faqs.length-1?"1px solid #e5e7eb":"none"}}>
          <p style={{...S.p,fontWeight:700,marginBottom:"0.4rem"}}>{item.q}</p>
          <p style={{...S.p,marginBottom:0}}>{item.a}</p>
        </div>
      ))}

      <h2 style={{...S.h2,marginTop:"3rem"}}>Related Topics</h2>
      <ul style={S.ul}>
        <li><TopicLink slug="bms" variant="inline"/> — building M&E data from the BMS that integrates with DCIM.</li>
        <li><TopicLink slug="ems" variant="inline"/> — energy analytics used inside or alongside DCIM.</li>
        <li><TopicLink slug="ups" variant="inline"/> — the UPS is DCIM's primary power monitoring target.</li>
        <li><TopicLink slug="pdu" variant="inline"/> — intelligent PDUs are DCIM's outlet-level data source.</li>
        <li><TopicLink slug="sensors" variant="inline"/> — environmental sensors feed the DCIM environmental layer.</li>
      </ul>
    </>
  );
}
