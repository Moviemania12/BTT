"use client";

// ═══════════════════════════════════════════════════════════════════════════
// app/learn/non-it/electrical/ups/sections/Operations.tsx
//
// Sections covering Bypass Modes, ECO Mode, Redundancy Architecture,
// Parallel UPS, Dual Bus & A-B Feed, Static Transfer Switch, PDU. Written
// to close the gap found during TOC/heading validation — every id below
// corresponds to an entry already declared in headings.ts that previously
// had no rendered section.
// ═══════════════════════════════════════════════════════════════════════════

import { S, Callout, ComparisonTable } from "../shared";
import TopicLink from "@/components/TopicLink";

export default function Operations() {
  return (
    <>
      <h2 id="bypass-modes" style={S.h2}>Bypass: Static / Maintenance / Internal</h2>

      <p style={S.p}>
        Bypass UPS ka safety net hai — agar inverter fail ho jaaye, overload ho jaaye, ya maintenance
        ke liye UPS ko isolate karna ho, bypass load ko continue power deta hai bina interruption ke.
        Teen alag bypass paths hote hain, har ek different purpose ke liye.
      </p>

      <ComparisonTable
        headers={["Bypass Type", "Trigger", "Transfer Time", "Use Case"]}
        rows={[
          ["Static Bypass", "Automatic — inverter fault/overload", "< 4 ms (thyristor-based)", "Fault protection, no manual action needed"],
          ["Maintenance Bypass", "Manual — operator switches it", "Brief interruption possible (mechanical)", "UPS servicing, full electrical isolation"],
          ["Internal Bypass", "Built into UPS cabinet, automatic or manual", "Varies by OEM design", "Compact installs without external bypass panel"],
        ]}
      />

      <Callout type="danger" title="Danger — Maintenance Bypass Required Before Servicing">
        Static bypass transfer ke liye hai, electrical isolation ke liye nahi — UPS internals still
        live rehte hain. Kabhi bhi UPS pe kaam karne se pehle Maintenance Bypass activate karo aur
        proper LOTO (Lock Out Tag Out) follow karo. Static bypass per se safe isolation nahi deta.
      </Callout>

      <p style={S.p}>
        Maintenance bypass typically ek separate physical switch/panel hota hai jo UPS ko poori
        tarah circuit se hata deta hai — input, output, aur battery sab disconnect ho jaate hain,
        load directly raw mains pe chala jaata hai. Yeh hi safe state hai servicing ke liye.
      </p>

      <Callout type="interview" title="Interview Tip">
        Agar poocha jaaye "Static bypass aur maintenance bypass mein kya farak hai?" — answer:{" "}
        <em>Static bypass automatic hai, fault response ke liye, milliseconds mein hota hai, lekin
        UPS electrically isolate nahi hota. Maintenance bypass manual hai, complete isolation deta
        hai, servicing ke liye use hota hai.</em>
      </Callout>

      <h2 id="eco-mode" style={S.h2}>ECO Mode</h2>

      <p style={S.p}>
        ECO Mode UPS ka high-efficiency operating state hai — load normally bypass path se power leta
        hai (raw mains, with minor filtering), inverter standby mein rehta hai. Agar grid quality
        kharab ho jaaye, UPS milliseconds mein inverter activate kar deta hai.
      </p>

      <ComparisonTable
        headers={["Mode", "Efficiency", "Output Quality", "Transfer Risk"]}
        rows={[
          ["Double Conversion (Online)", "94-96%", "Always clean, zero transfer time", "None — inverter always on"],
          ["ECO Mode", "Up to 99%", "Bypass quality normally, clean only during transfer", "Brief transfer if grid degrades (sub-cycle)"],
        ]}
      />

      <Callout type="best-practice" title="Best Practice — ECO Mode Trade-off">
        ECO mode significant energy savings deta hai (heat generation bhi kam hota hai, cooling load
        ghatata hai) — lekin yeh trade-off hai thoda transfer risk ke against. Critical Tier IV loads
        ke liye, kai operators ECO mode avoid karte hain pure double-conversion ke favor mein.
        Actual decision project requirements aur risk tolerance pe depend karta hai.
      </Callout>

      <h2 id="redundancy-architecture" style={S.h2}>Redundancy: N / N+1 / N+2 / 2N / 2(N+1)</h2>

      <p style={S.p}>
        Redundancy architecture decide karta hai ki kitne UPS modules chahiye aur kya happen hota hai
        agar ek ya zyada modules fail ho jaaye. Yeh Data Center design ka sabse critical decision hai.
      </p>

      <ComparisonTable
        headers={["Architecture", "Spare Capacity", "Fault Tolerance", "Typical Tier"]}
        rows={[
          ["N", "Zero — exact load match", "None — any failure = outage", "Tier I"],
          ["N+1", "One extra module", "Survives 1 module failure", "Tier II / III"],
          ["N+2", "Two extra modules", "Survives 2 simultaneous failures", "High-availability Tier III"],
          ["2N", "Full duplicate path", "Survives complete path loss", "Tier IV"],
          ["2(N+1)", "Two fully redundant N+1 paths", "Survives path loss AND module failure within a path", "Tier IV — highest resilience"],
        ]}
      />

      <p style={S.p}>
        Use the <strong>UPS Redundancy Calculator</strong> (linked at the end of this article) to
        calculate exact module counts, spare capacity, and utilization for your chosen architecture.
      </p>

      <Callout type="common-mistake" title="Common Mistake — Confusing 2N with N+1">
        2N ka matlab N+1 se zyada redundancy nahi hai sirf &quot;do guna&quot; — 2N ka matlab hai{" "}
        <strong>do completely independent paths</strong>, each capable of handling full load alone.
        N+1 ek hi path mein extra module hai. Inko mix karna design review mein common gotcha hai.
      </Callout>

      <h2 id="parallel-ups" style={S.h2}>Parallel UPS Systems</h2>

      <p style={S.p}>
        Jab single UPS unit required capacity ke liye insufficient ho, ya redundancy chahiye, multiple
        UPS units <strong>parallel</strong> mein operate karte hain — same output bus share karte hain,
        load proportionally split hota hai.
      </p>

      <ComparisonTable
        headers={["Parameter", "Requirement", "Why It Matters"]}
        rows={[
          ["Voltage sync", "All units must match output voltage/frequency/phase", "Mismatch causes circulating currents between units"],
          ["Load sharing", "Active load-sharing logic (master/slave or democratic)", "Prevents one unit from overloading while others idle"],
          ["Same OEM/model", "Strongly recommended", "Synchronization protocols are often proprietary between vendors"],
          ["Communication bus", "Inter-unit comms (CAN bus typical)", "Coordinates synchronization and fault response"],
        ]}
      />

      <Callout type="warning" title="Warning — Never Mix UPS Models in Parallel">
        Different UPS models/OEMs ko parallel mein chalana risky hai — synchronization aur
        load-sharing logic incompatible ho sakti hai. Same model series, same firmware version
        recommended hai parallel installations ke liye.
      </Callout>

      <h2 id="dual-bus-ab-feed" style={S.h2}>Dual Bus & A-B Feed Architecture</h2>

      <p style={S.p}>
        Dual Bus (ya A-B Feed) architecture mein Data Center ke har critical load ko{" "}
        <strong>do independent power paths</strong> se feed kiya jaata hai — Source A aur Source B.
        Yeh 2N redundancy ka physical implementation hai.
      </p>

      <ComparisonTable
        headers={["Component", "A Path", "B Path"]}
        rows={[
          ["Grid Feed", "Independent utility feeder/transformer", "Separate independent utility feeder/transformer"],
          ["UPS", "Dedicated UPS system A", "Dedicated UPS system B"],
          ["Battery", "Independent battery bank A", "Independent battery bank B"],
          ["PDU", "PDU-A", "PDU-B"],
          ["Server Connection", "Power Supply 1", "Power Supply 2 (dual-corded servers)"],
        ]}
      />

      <p style={S.p}>
        Dual-corded servers donon paths se simultaneously connect hote hain — agar A path completely
        fail ho jaaye (UPS failure, PDU failure, breaker trip), server B path se seamlessly power
        leta rehta hai, zero downtime.
      </p>

      <Callout type="important" title="Important — True Independence Required">
        Dual Bus tabhi effective hai jab A aur B paths{" "}
        <strong>genuinely independent</strong> hon — shared transformer, shared breaker, ya shared
        physical routing (same cable tray) single point of failure create kar deta hai jo poori 2N
        design ko defeat kar deta hai. Physical separation as important hai jitna electrical.
      </Callout>

      <h2 id="static-transfer-switch" style={S.h2}>Static Transfer Switch (STS)</h2>

      <p style={S.p}>
        STS dual-bus architecture mein critical component hai — yeh ek single-corded load (jo dual
        power input support nahi karta) ko A aur B sources ke beech sub-4ms mein transfer karta hai,
        thyristor-based switching use karke, koi mechanical moving parts nahi.
      </p>

      <ComparisonTable
        headers={["Parameter", "STS", "ATS (Automatic Transfer Switch)"]}
        rows={[
          ["Switching technology", "Thyristor (solid-state)", "Mechanical contactor/breaker"],
          ["Transfer time", "< 4 ms", "100-500 ms typical"],
          ["Suitable for IT loads?", "Yes — invisible to sensitive equipment", "Risky — can cause reboot/glitch"],
          ["Typical use", "Data Center single-corded load protection", "Generator changeover, building-level switching"],
        ]}
      />

      <Callout type="important" title="Important — STS Requires Phase Sync">
        STS phase synchronization detect nahi karta apne aap — donon sources (A aur B) ko upstream
        phase-synchronized hona chahiye for transfer ko truly seamless banane ke liye. Yeh design
        constraint hai jo UPS aur generator synchronization se directly connected hai.
      </Callout>

      <p style={S.p}>
        STS ka deeper coverage <TopicLink slug="sts" variant="inline" /> dedicated article mein
        milega.
      </p>

      <h2 id="pdu-distribution" style={S.h2}>Power Distribution Unit (PDU)</h2>

      <p style={S.p}>
        PDU UPS output ko individual racks tak distribute karta hai — final stage hai poore power
        path ka, jahan se server actually power leta hai.
      </p>

      <ComparisonTable
        headers={["PDU Type", "Function", "Best For"]}
        rows={[
          ["Floor-mount/Main PDU", "Receives UPS output, distributes via breakers to rack PDUs", "Centralized distribution in larger DCs"],
          ["Rack PDU (Basic)", "Simple outlet strip, no monitoring", "Small/non-critical racks"],
          ["Rack PDU (Metered)", "Per-outlet or per-inlet power monitoring", "Capacity planning, billing"],
          ["Rack PDU (Switched/Intelligent)", "Remote outlet control + monitoring, DCIM integration", "Critical racks, remote reboot capability"],
        ]}
      />

      <p style={S.p}>
        Dual-corded racks mein, server PDU-A aur PDU-B dono se connect hota hai — agar ek PDU/path
        fail ho jaaye, server doosre se chalta rehta hai. PDU level pe phase balance bhi monitor
        karna zaroori hai — unbalanced 3-phase loading cable aur breaker dono ko unnecessarily stress
        karta hai.
      </p>

      <p style={S.p}>
        PDU ka complete coverage <TopicLink slug="pdu" variant="inline" /> dedicated article mein
        milega.
      </p>
    </>
  );
}
