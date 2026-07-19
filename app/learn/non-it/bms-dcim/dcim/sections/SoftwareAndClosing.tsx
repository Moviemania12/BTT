"use client";
import { S, Callout, ComparisonTable } from "../shared";
import TopicLink from "@/components/TopicLink";
import { faqs } from "../metadata";

export default function SoftwareAndClosing() {
  return (
    <>
      <h2 id="dcim-software" style={S.h2}>DCIM Software Platforms</h2>
      <Callout type="important" title="Vendor Claims — Always Verify with Current Documentation">
        DCIM platforms rapidly evolve. Features, editions, pricing aur capabilities change frequently. Neeche diya gaya overview general understanding ke liye hai — specific project ke liye current vendor documentation, product datasheets aur demo se verify karo. Do not rely solely on this article for procurement decisions.
      </Callout>

      <h3 style={S.h3}>Vertiv Trellis</h3>
      <p style={S.p}>Vertiv Trellis ek enterprise DCIM platform hai — asset management, capacity planning, power chain visualization, environmental monitoring aur intelligent PDU integration pe focus karta hai. Vertiv equipment (Geist intelligent PDUs, Liebert UPS) ke saath integration typically tighter hoti hai — third-party equipment support integration design pe depend karta hai. Platform mein rack elevation, floor plan views, power/space/cooling capacity dashboards, aur reporting capabilities hain. Vertiv portfolio aur product tiers evolve karte rehte hain — current active product names, editions aur feature sets current Vertiv documentation se verify karo.</p>
      <p style={S.p}>Vertiv Environet aur Geist ecosystem monitoring ke liye Vertiv ke separate offerings hain — environmental sensors, power equipment aur devices ka alerting aur monitoring. Actual product names, relationships aur capabilities current Vertiv documentation se verify karo — product portfolio changes over time.</p>

      <h3 style={S.h3}>Athenta</h3>
      <p style={S.p}>Athenta ek DCIM aur facility monitoring platform hai jo data center infrastructure monitoring, dashboards, alerts aur reporting pe focus karta hai. Platform power monitoring, environmental monitoring aur integration capabilities provide karne ka claim karta hai — actual feature set, supported protocols, editions aur deployment options current official Athenta documentation se verify karo. Is article mein Athenta ke baare mein koi specific deployment claim ya regional availability claim nahi ki ja rahi — current accurate information ke liye Athenta ke official resources reference karo.</p>

      <h3 style={S.h3}>Schneider Electric EcoStruxure IT</h3>
      <p style={S.p}>Schneider Electric ka EcoStruxure IT (previously known as StruxureWare Data Center Expert aur related products) data center monitoring aur DCIM capabilities provide karta hai. APC intelligent PDUs, NetShelter racks, Schneider UPS ke saath native integration strong hoti hai. EcoStruxure IT portfolio mein on-premises aur cloud-based monitoring components dono available hain — product names, architecture aur deployment options Schneider documentation ke saath verify karo kyunki portfolio evolve karta rehta hai. Schneider broader EcoStruxure ecosystem ke saath integration — EcoStruxure Building Operation (BMS) — possible hai where specifically designed.</p>

      <h3 style={S.h3}>Sunbird dcTrack</h3>
      <p style={S.p}>Sunbird dcTrack asset management aur DCIM pe focus karta hai — rack elevation, floor plan, cable management, capacity planning. Sunbird Power IQ power monitoring ke liye ek related offering hai — packaging, integration aur bundling current Sunbird documentation se verify karo. API integration capabilities current product version pe depend karti hain. Features and capabilities current Sunbird documentation se verify karo.</p>

      <h3 style={S.h3}>Nlyte Software</h3>
      <p style={S.p}>Nlyte enterprise data centers ke liye DCIM platform hai — asset management, capacity planning, MAC workflows, energy management capabilities. Nlyte ka focus larger enterprise environments pe hai. IBM ke saath partnership history rahi hai. Current product status aur ownership structure verify karo — DCIM market consolidation common hai.</p>

      <h3 style={S.h3}>OpenDCIM</h3>
      <p style={S.p}>OpenDCIM ek open-source DCIM tool hai — primarily asset management aur rack documentation ke liye. Cost-effective option smaller deployments ke liye. Real-time monitoring capabilities limited hain compared to commercial platforms. Self-hosted, community-supported. Suitable as a starting point ya supplementary tool.</p>

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
      <p style={S.p}>Neeche ek example frequency schedule hai — actual frequency site policy, vendor recommendations, platform criticality aur contractual requirements pe depend karta hai. <strong>Example monthly checks:</strong> all monitored devices online — communication status dashboard. Sample 10-20 device readings vs actual (spot check). Alarm log review — missed alarms, false positives. Asset changes since last month — DCIM updated? <strong>Example quarterly:</strong> full asset audit walkthrough — physical vs DCIM records match? Capacity reports review. Report generation test. User access audit. <strong>Example annual:</strong> software updates (per change management). Integration test — all data sources active? Historian storage capacity review. Data retention compliance check. API keys rotation where applicable.</p>

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
      <p style={S.p}>Wrong SNMP version. Community string mismatch. SNMP agent not running on device. Firewall blocking UDP 161. DCIM IP not in device SNMP access list (kuch devices explicit ACL configure karte hain).</p>

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
        Ek enterprise DC operations team ko notice hua ki Hall C mein naye servers add karna ho raha hai lekin physical walkthrough suggest kar raha tha ki 30% racks "empty" lag rahe the. DCIM mein capacity report run kiya — 18 racks mein 60% se kam power consumption tha compared to nameplate capacity. Detailed DCIM analysis se pata chala ki 6 racks decommissioned servers still in asset records mein the (physically removed lekin DCIM update nahi hua). Aur 8 racks mein servers underutilized the — consolidation possible tha. DCIM-driven planning ne 12 naye servers accommodate karne ki space identify ki without additional rack procurement. Asset accuracy DCIM value ka foundation tha.
      </Callout>

      <h2 id="interview-questions" style={S.h2}>Interview Questions</h2>
      <h3 style={S.h3}>Q1: DCIM mein power capacity kaise calculate hoti hai?</h3>
      <p style={S.p}><strong>Answer:</strong> Rack power capacity teen values compare karti hai: Allocated (planned equipment ka nameplate sum), Actual measured (intelligent PDU ya metering se real-time kW), aur Available (UPS/PDU rated capacity minus allocated/actual). DCIM power chain model karta hai — UPS capacity se trickle down rack level tak. Actual metering available ho to accurate; bina metering nameplate estimate conservative hota hai. Capacity = Available headroom at each level in the chain.</p>
      <h3 style={S.h3}>Q2: DCIM aur NMS mein kya difference hai?</h3>
      <p style={S.p}><strong>Answer:</strong> NMS (Network Management System) network devices — switches, routers, firewalls — manage karta hai: network topology, bandwidth utilization, interface status, BGP/OSPF routing. DCIM physical IT infrastructure pe focus karta hai — asset records, rack positions, power consumption, cooling, cable connectivity. NMS typically SNMP ya NETCONF se network devices monitor karta hai operational visibility ke liye; DCIM physical infrastructure inventory aur capacity management ke liye. Enterprise mein dono separate tools hote hain jo APIs se integrate karte hain.</p>
      <h3 style={S.h3}>Q3: Athenta kya hai?</h3>
      <p style={S.p}><strong>Answer:</strong> Athenta ek DCIM aur facility monitoring platform hai jo data center infrastructure ke liye dashboards, real-time monitoring, alerts aur reporting provide karta hai. Power monitoring, environmental monitoring aur integration capabilities karne ka claim karta hai — specific feature set, protocol support aur deployment options current official Athenta documentation se verify karo.</p>

      <h2 id="key-takeaways" style={S.h2}>Key Takeaways</h2>
      <ul style={S.ul}>
        <li>DCIM = IT infrastructure ka single source of truth — assets, racks, power chain, capacity, environment.</li>
        <li>Asset data quality DCIM ki effectiveness determine karta hai — every MAC update zaroori hai.</li>
        <li>Power capacity planning teen dimensions: space, power (kW), cooling — sab simultaneously plan karo.</li>
        <li>Actual metering (intelligent PDU) much more accurate hai than nameplate estimation for capacity planning.</li>
        <li>DCIM integration southbound (devices) aur northbound (BMS, EMS, NMS) — data normalization critical hai.</li>
        <li>Vendor capabilities significantly vary — Vertiv Trellis, Athenta, Schneider EcoStruxure IT, Sunbird, Nlyte sab different strengths hain.</li>
        <li>SNMP troubleshoot karte time: ping → community string → v3 creds → ACL → port 161 → MIB.</li>
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
        <li><TopicLink slug="bms" variant="inline"/> — BMS building M&E data jo DCIM ke saath integrate hota hai.</li>
        <li><TopicLink slug="ems" variant="inline"/> — Energy analytics jo DCIM ke andar ya saath use hoti hai.</li>
        <li><TopicLink slug="ups" variant="inline"/> — UPS DCIM ka primary power monitoring target hai.</li>
        <li><TopicLink slug="pdu" variant="inline"/> — Intelligent PDUs DCIM ka outlet-level data source hain.</li>
        <li><TopicLink slug="sensors" variant="inline"/> — Environmental sensors DCIM environmental layer ko feed karte hain.</li>
      </ul>
    </>
  );
}
