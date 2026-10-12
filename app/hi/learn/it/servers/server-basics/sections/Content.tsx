"use client";
import { S, Callout, ComparisonTable, Figure, CodeBlock } from "@/app/learn/it/servers/server-basics/shared";
import TopicLink from "@/components/TopicLink";
import ServerVsPc from "@/app/learn/it/servers/server-basics/svg/ServerVsPc";
import RackElevation from "@/app/learn/it/servers/server-basics/svg/RackElevation";
import DualPsuPower from "@/app/learn/it/servers/server-basics/svg/DualPsuPower";
import ServerBootFlow from "@/app/learn/it/servers/server-basics/svg/ServerBootFlow";
import ServerAnatomy from "@/app/learn/it/servers/server-basics/svg/ServerAnatomy";
import RackAirflow from "@/app/learn/it/servers/server-basics/svg/RackAirflow";
import ServerTroubleshootFlow from "@/app/learn/it/servers/server-basics/svg/ServerTroubleshootFlow";
import { faqs } from "../metadata";

export default function Content() {
  return (
    <>
      {/* Quick Summary */}
      <div style={{ background: "#eff6ff", border: "1px solid #bfdbfe", borderRadius: 10, padding: "1.2rem 1.4rem", marginBottom: "2rem" }}>
        <p style={{ fontWeight: 700, color: "#1e40af", marginBottom: "0.6rem", fontSize: "1rem" }}>📋 Quick Summary — Server Basics in 2 Minutes</p>
        <ul style={{ ...S.ul, marginBottom: 0 }}>
          <li><strong>Server kya hai:</strong> Ek dedicated computer jo network par doosre devices ko resources, data ya services deta hai — 24×7 chalne ke liye bana hota hai.</li>
          <li><strong>PC se alag kyun:</strong> ECC RAM, redundant PSU, hot-swap parts, remote management ke liye BMC aur rack-mount body. Sab kuch availability aur manageability ke liye.</li>
          <li><strong>Form factors:</strong> Tower, Rack (1U/2U/4U — data center ka standard), Blade aur Modular/Composable.</li>
          <li><strong>Rack Unit:</strong> 1U = 1.75 inch (44.45 mm). 42U rack mein 42 U jagah hai — lekin kitne server lagenge, ye power, cooling, weight aur cabling decide karte hain.</li>
          <li><strong>Power:</strong> Dual PSU ko alag A aur B feed se lagao. Plan aisa karo ki ek feed poore rack ka load utha sake.</li>
          <li><strong>Cooling:</strong> Front-to-back airflow, hot-aisle/cold-aisle layout, har khaali U mein blanking panel.</li>
          <li><strong>BMC:</strong> Standby power par chalne wala alag chhota computer. Server off ho ya OS crash ho, tab bhi kaam karta hai.</li>
          <li><strong>Engineer ka daily kaam:</strong> Rows mein amber LED dekhna, BMC event log padhna, kharab PSU/drive/fan badalna, firmware aur capacity track karna.</li>
          <li><strong>Tier III / IV view:</strong> Tier rating site ki hoti hai, server ki nahi. Lekin dual-corded server aur independent A/B path hi us design ko asli mein kaam karwate hain.</li>
          <li><strong>Golden field rule:</strong> Ek time par ek hi cheez badlo, change note karo, aur rollback hamesha ready rakho.</li>
        </ul>
      </div>

      {/* ══════════ 1. WHAT IS A SERVER ══════════ */}
      <h2 id="what-is-a-server" style={S.h2}>What Is a Server?</h2>
      <p style={S.p}>Jab aap YouTube par video dekhte hain, Google par search karte hain ya UPI payment karte hain — kahin ek computer aapki request par kaam kar raha hota hai. Wahi computer <strong>server</strong> hai.</p>
      <p style={S.p}>Server ek dedicated computer system hai jo network par doosre devices (clients) ko services, data ya compute power deta hai. "Server" ka matlab hi hai "serve karne wala".</p>
      <p style={S.p}>Isko <strong>client–server model</strong> kehte hain. Client maangta hai. Server jawab deta hai. Aapka phone client hai. Data center ki machine server hai.</p>
      <CodeBlock lang="text">
{`Client (phone / laptop / doosra server)
        |   request:  "mera account balance dikhao"
        v
   Network (switch → router → internet)
        |
        v
Server (application + database)
        |   response: "₹ 12,450"
        v
Client`}
      </CodeBlock>
      <p style={S.p}>Server sirf ek powerful PC nahi hai. Uska design goal alag hota hai. PC ek insaan ke liye fast hone ke liye bana hai. Server hazaaron users ke liye, saalon tak, <strong>chalte rehne</strong> ke liye bana hai — jab parts fail hote aur badle jaate hain, tab bhi.</p>
      <p style={S.p}>Data center engineer ke liye ye kyun zaroori hai? Kyunki building mein baaki sab kuch — UPS, generator, CRAC, fire system, network — in servers ko power dene, thanda rakhne, jodne aur bachane ke liye hi hai.</p>
      <Callout type="important" title="Server = Hardware + Role">
        "Server" shabd do tarah se use hota hai. <strong>Physical server</strong> woh hardware hai jo aap rack mein lagate ho. <strong>Logical server</strong> ek role hai — web server, database server — jo virtual machine bhi ho sakta hai. Is article mein "server" ka matlab zyadatar physical box hai. Virtual machines ke liye dekho <TopicLink slug="virtualization" variant="inline" />.
      </Callout>

      {/* ══════════ 2. ROLES ══════════ */}
      <h2 id="server-roles" style={S.h2}>Server Roles and Workload Types</h2>
      <p style={S.p}>Ek hi physical server alag-alag kaam kar sakta hai — ye us par chal rahe software par depend karta hai. Kaam hi decide karta hai ki CPU, RAM, storage aur network kaise configure honge.</p>
      <ComparisonTable
        title="Common Server Roles aur Unhe Sabse Zyada Kya Chahiye"
        headers={["Role", "Kya Karta Hai", "Sabse Zaroori Hardware"]}
        rows={[
          ["Web / API server", "Websites aur application requests serve karta hai", "CPU cores, network bandwidth"],
          ["Application server", "Business logic chalata hai (ERP, banking app)", "CPU, RAM"],
          ["Database server", "Structured data store aur query karta hai", "RAM size, fast NVMe storage, CPU clock/cache"],
          ["File / backup server", "Files aur backup copies rakhta hai", "Disk capacity, network throughput"],
          ["Virtualization host", "Bahut saari virtual machines chalata hai", "Core count, bada RAM, kai NICs"],
          ["DNS / DHCP / directory", "Network aur identity services", "Halka hardware — lekin highly available hona chahiye"],
          ["GPU / AI server", "AI models train aur run karta hai", "GPUs, PCIe lanes, bahut zyada power aur cooling"],
          ["Edge server", "User ya site ke paas compute", "Compact size, low power, remote management"],
        ]}
        caption="Ek hi server model kai roles ke liye configure ho sakta hai. Sizing hamesha workload se shuru hoti hai, box se nahi."
      />
      <p style={S.p}>Beginner ki common galti: server ko "kitna powerful hai" se size karna. Experienced engineer pehle poochta hai: workload kya hai, kitne users, kitna data, aur down hua to kya hoga?</p>
      <p style={S.p}>Database server ko 1 TB RAM chahiye ho sakti hai par CPU kam. Web server ko bahut cores chahiye par RAM kam. Backup server ko bade disks chahiye par CPU lagbhag nahi. Rack mein jagah same — build bilkul alag.</p>

      {/* ══════════ 3. SERVER VS PC ══════════ */}
      <h2 id="server-vs-pc" style={S.h2}>Server vs Personal Computer</h2>
      <p style={S.p}>"Server mein bhi CPU, RAM aur storage hota hai, to PC se alag kaise?" — sahi sawal hai. Farak un features mein hai jo use lagataar chalate rakhte hain.</p>
      <Figure caption="Fig 1 — Server vs PC: memory, power, storage, management aur form factor ke key hardware differences."><ServerVsPc /></Figure>
      <Callout type="important" title="Availability Poore System ki Property Hai, Sirf Server ki Nahi">
        Ek single server ke uptime claim ko dhyan se lo. Asli service availability server hardware, redundancy design, software, networking, power infrastructure aur operations process ke combination se aati hai. High availability system level par banti hai — sirf server box se nahi.
      </Callout>
      <h3 style={S.h3}>ECC RAM</h3>
      <p style={S.p}><strong>ECC (Error-Correcting Code)</strong> memory server ka standard hai. Memory bits electrical noise, ageing ya cosmic radiation se flip ho sakte hain. Ye kam hota hai, par data center scale par roz hota hai.</p>
      <p style={S.p}>Implementation ke hisaab se ECC single-bit errors detect aur correct kar sakta hai aur kuch multi-bit errors detect kar sakta hai. Consumer RAM mein aksar ye protection nahi hota. Detail: <TopicLink slug="ram" variant="inline" />.</p>
      <h3 style={S.h3}>Redundant PSU</h3>
      <p style={S.p}>Zyadatar servers mein do power supply hote hain. Ek fail ho jaye to doosra server chalata rehta hai. Mode — active-active load sharing ya active-standby — server model par depend karta hai.</p>
      <p style={S.p}>Best practice: har PSU alag electrical feed (A aur B) se jude. Tab poora power path fail ho jaye, tab bhi server nahi rukta.</p>
      <h3 style={S.h3}>Hot-Swap Components</h3>
      <p style={S.p}>Drives, PSU aur kai models mein fans server chalte hue badle ja sakte hain. Iske liye hardware support aur sahi OS/RAID configuration chahiye — ye apne aap nahi hota.</p>
      <h3 style={S.h3}>BMC — Remote Management</h3>
      <p style={S.p}>BMC motherboard par ek alag chhota computer hai jiska apna network port hota hai. OS mar bhi jaye to bhi aap power-cycle kar sakte ho, screen dekh sakte ho aur hardware health padh sakte ho. Poori detail aage article mein hai.</p>
      <h3 style={S.h3}>Design Philosophy — Ek Line Mein</h3>
      <p style={S.p}>PC poochta hai: "ek user ke liye isse sasta aur fast kaise banaun?" Server poochta hai: "kuch toot jaye to ise chalta kaise rakhun, aur service roke bina theek kaise karun?"</p>

      {/* ══════════ 4. FORM FACTORS ══════════ */}
      <h2 id="server-form-factors" style={S.h2}>Server Form Factors</h2>
      <ComparisonTable
        title="Server Form Factors — Comparison"
        headers={["Form Factor", "Physical Shape", "Data Center Use", "Key Characteristic"]}
        rows={[
          ["Tower", "Khada standalone box", "Kam — jagah waste hoti hai", "Self-contained, rack nahi chahiye"],
          ["Rack (1U/2U/4U)", "Horizontal, rack-mounted", "Standard — zyadatar DC servers", "Industry-standard 19-inch mounting"],
          ["Blade", "Shared chassis mein patla card", "High-density deployments", "Chassis mein shared power, cooling, networking"],
          ["Modular / Composable", "Alag-alag resource pools", "Large-scale aur evolving sites", "CPU/RAM/storage zaroorat ke hisaab se compose"],
          ["OCP / Hyperscale sled", "Open-rack sled, shared busbar power", "Hyperscale data centers", "Per-server PSU nahi; rack-level power shelf"],
        ]}
        caption="Form factor ka choice density target, budget, operating model aur existing infrastructure par depend karta hai."
      />
      <p style={S.p}><strong>Tower server:</strong> Chhote office ya lab ke liye standalone box. Ye standard rack mein nahi lagta, isliye data center mein jagah waste karta hai.</p>
      <p style={S.p}><strong>Rack server:</strong> Data center ka standard. 19-inch rack mein slide rails par lagta hai.</p>
      <p style={S.p}><strong>Blade server:</strong> Bahut saare patle server cards ek chassis share karte hain jo power, cooling aur network deta hai. Isse high density milti hai — dekho <TopicLink slug="blade-server" variant="inline" />.</p>
      <p style={S.p}><strong>Hyperscale/OCP:</strong> Cloud companies server ko simple bana deti hain — alag PSU nahi, fancy bezel nahi — aur sleds ko rack busbar se power dete hain. Bade scale par cost aur conversion loss kam hota hai.</p>

      {/* ══════════ 5. ANATOMY ══════════ */}
      <h2 id="server-anatomy" style={S.h2}>Inside a Server — Component Walkthrough</h2>
      <p style={S.p}>Chalo server ka dhakkan kholte hain. Har part yaad karna zaroori nahi, par ye pata hona chahiye ki har part kya karta hai aur uska failure kaisa dikhta hai.</p>
      <Figure caption="Fig 2 — 2-socket server ka block diagram: apne DIMM channels wale CPUs, PCIe devices, BMC, chipset, UEFI, redundant PSU aur fans. Simplified — exact topology CPU generation par depend karti hai."><ServerAnatomy /></Figure>
      <h3 style={S.h3}>Motherboard</h3>
      <p style={S.p}>CPU sockets, DIMM slots, PCIe slots, storage connectors, NIC aur BMC chip sab yahin hote hain. Server boards aam taur par ek ya do CPU sockets (1S ya 2S) support karte hain.</p>
      <h3 style={S.h3}>CPU</h3>
      <p style={S.p}>Compute engine. Intel Xeon aur AMD EPYC common hain; ARM-based CPUs badh rahe hain. Server CPUs mein zyada cores, zyada memory channels, zyada PCIe lanes aur reliability (RAS) features hote hain. Deep dive: <TopicLink slug="cpu" variant="inline" />.</p>
      <p style={S.p}>2-socket server mein har CPU ke paas kuch DIMMs aur PCIe slots hote hain. Doosre CPU ki memory access karna slow hota hai. Ise <strong>NUMA</strong> kehte hain, aur ye databases aur VMs ke liye important hai.</p>
      <h3 style={S.h3}>Memory (RAM)</h3>
      <p style={S.p}>Servers ECC RDIMM (ya bahut high capacity ke liye LRDIMM) use karte hain. Saare memory channels use karne ke liye slots ek specific pattern mein bhare jaate hain. Galat population pattern memory speed chupchaap kam kar sakta hai. Dekho <TopicLink slug="ram" variant="inline" />.</p>
      <h3 style={S.h3}>Storage</h3>
      <p style={S.p}>Front drive bays backplane ke through RAID controller ya HBA se jude hote hain. Drives SAS, SATA ya NVMe ho sakte hain. Kai servers mein OS ya hypervisor ke liye alag chhota mirrored M.2 module bhi hota hai, taaki data drives free rahein.</p>
      <p style={S.p}>RAID controller = cache wala hardware RAID. HBA = disks seedha OS ko deta hai software-defined storage ke liye. Aur detail: <TopicLink slug="das" variant="inline" />.</p>
      <h3 style={S.h3}>Network Interface Cards</h3>
      <p style={S.p}>Server mein kai network ports hote hain: ek-do production traffic ke liye, baaki storage, backup, live migration aur BMC ke liye. Modern sites mein 10/25/100 GbE common hai. Kai servers OCP 3.0 mezzanine NIC use karte hain. Dekho <TopicLink slug="switch" variant="inline" />.</p>
      <h3 style={S.h3}>Power Supplies aur Fans</h3>
      <p style={S.p}>Hot-swap PSU, jinki efficiency rating 80 Plus Platinum ya Titanium jaisi hoti hai. Fans hot-swap modules mein hote hain, aksar N+1 redundancy ke saath, aur unki speed temperature sensors control karte hain.</p>
      <h3 style={S.h3}>PCIe Cards, GPUs aur Risers</h3>
      <p style={S.p}>PCIe slots mein extra NIC, HBA, FPGA aur GPU lagte hain. GPU se power aur heat kaafi badhti hai — dekho <TopicLink slug="gpu" variant="inline" />. Card order karne se pehle check karo ki PSU, fans aur slot use support karte hain.</p>
      <h3 style={S.h3}>TPM aur Secure Boot</h3>
      <p style={S.p}><strong>TPM</strong> ek chhota security chip hai jo disk encryption aur platform integrity ke liye cryptographic keys store karta hai. <strong>Secure Boot</strong> sirf signed bootloader aur kernel ko chalne deta hai. Dono ko enable aur configure karna padta hai — sirf chip hona kaafi nahi.</p>

      {/* ══════════ 6. RACK MOUNT ══════════ */}
      <h2 id="rack-mount-deployment" style={S.h2}>Rack Mount Deployment — The Full Picture</h2>
      <p style={S.p}>Server deploy karna sirf plug karna nahi hai. Poore deployment mein physical mounting, power planning, cooling, cabling, management network aur documentation aate hain.</p>
      <Callout type="best-practice" title="19-Inch Rack Standard">
        Zyadatar data center IT equipment 19-inch (EIA-310) standard follow karta hai — mounting ears 482.6 mm chaude hote hain. Order karte waqt rack width, depth aur rail compatibility verify karo. Deep servers (800–1000 mm) ko deep rack aur peeche cables aur PSU ke liye extra jagah chahiye.
      </Callout>
      <p style={S.p}>Rack ek steel frame hai jisme vertical mounting rails hote hain, aksar front aur rear doors, cable management aur in-rack PDU ke saath. Kai data centers mein rack hi power aur cooling planning ki unit hai — "is rack ka 8 kW hai".</p>
      <p style={S.p}>Racks rows mein lagte hain. Rows front-to-front (cold aisle) aur back-to-back (hot aisle) face karti hain. Phir airflow management cold aur hot air ko mix hone se rokta hai — dekho <TopicLink slug="airflow-management" variant="inline" /> aur <TopicLink slug="containment" variant="inline" />.</p>

      {/* ══════════ 7. RACK UNIT ══════════ */}
      <h2 id="rack-u-explained" style={S.h2}>Rack Unit (U) Explained</h2>
      <p style={S.p}>Rack height <strong>U (Rack Units)</strong> mein naapi jaati hai. <strong>1U = 1.75 inch = 44.45 mm.</strong> Ye sirf height hai. Performance ke baare mein kuch nahi batata.</p>
      <ComparisonTable
        title="Common Rack Heights"
        headers={["Rack Height", "Total U Capacity", "Typical Use"]}
        rows={[
          ["42U", "42 U slots", "Sabse common data center standard rack"],
          ["45U", "45 U slots", "Kuch vendors, thoda lamba"],
          ["48U", "48 U slots", "Extended-capacity deployments"],
        ]}
        caption="Usable capacity kam hoti hai — PDU, switch, patch panel, cable manager aur blanking panel bhi U space lete hain."
      />
      <p style={S.p}><strong>1U server:</strong> Patla, kam drive bays, har U mein high density. Web servers, API servers aur network appliances ke liye. Chhote fans tez ghoomte hain, isliye zyada shor aur zyada fan power.</p>
      <p style={S.p}><strong>2U server:</strong> Sabse versatile aur enterprise sites mein sabse common. Zyada drive bays, bade fans (behtar cooling headroom) aur zyada PCIe slots. Databases, virtualization hosts aur general compute ke liye.</p>
      <p style={S.p}><strong>4U aur upar:</strong> Bade storage servers, 8-GPU AI servers, high-expansion systems. Rack mein bahut jagah leta hai par maximum expansion deta hai. AI servers 4U–10U ho sakte hain aur 100 kg se zyada ke.</p>
      <Figure caption="Fig 3 — Rack elevation: 1U aur 2U servers, network switches, patch panels, blanking panels aur PDUs, U positions ke saath. Sirf illustration ke liye — real deployments alag hote hain."><RackElevation /></Figure>
      <Callout type="warning" title="42U Rack ≠ 42 × 1U Servers">
        42U rack ka matlab ye nahi ki 42 servers lag jayenge. Asli count in cheezon se limit hota hai: <strong>Power</strong> — PDU rating aur breaker capacity. <strong>Cooling</strong> — room aur aisle kitni heat nikaal sakte hain. <strong>Weight</strong> — rack aur floor load rating. <strong>Network</strong> — switch ports aur patch panels. <strong>Cabling</strong> — cable management ki jagah. <strong>Redundancy</strong> — ek feed jaane par bhi load fit hona chahiye.
      </Callout>
      <h3 style={S.h3}>U Numbering Convention</h3>
      <p style={S.p}>U positions aam taur par neeche (U1) se upar (U42) ki taraf number hoti hain. Asset records mein likha hota hai "Rack C12, U20–U21". Hamesha apni site ki convention follow karo aur rack rails par label lagao — galat U number ka matlab technician galat server kheench sakta hai.</p>

      {/* ══════════ 8. RACK PLANNING ══════════ */}
      <h2 id="rack-planning" style={S.h2}>Practical Rack Planning</h2>
      <p style={S.p}><strong>Depth aur clearance:</strong> Servers aam taur par 600–900 mm deep hote hain. Rack itna deep ho ki server, cables aur PSU handles aa jayein. Rails par server bahar kheenchne ke liye front mein kaafi clearance rakho.</p>
      <p style={S.p}><strong>Rails:</strong> Zyadatar servers slide-rail kit use karte hain. Rails rack mein lagao, server andar slide karo, phir cable karo. Rails vendor aur rack type ke compatible hone chahiye. Tool-less rails time bachate hain, par har baar latch check karo.</p>
      <p style={S.p}><strong>Blanking panels:</strong> Har khaali U bharo. Inke bina peeche ki garam hawa ghoom kar aage aati hai aur server inlet temperature badha deti hai.</p>
      <Figure caption="Fig 4 — Rack ka side view. Servers front se cold-aisle ki hawa kheenchte hain aur hot aisle mein exhaust karte hain. Blanking panel ke bina khaali U se garam hawa wapas aage aa jaati hai."><RackAirflow /></Figure>
      <p style={S.p}><strong>Hot-aisle / cold-aisle orientation:</strong> Har server ek hi direction mein lagao — intake front mein cold aisle ki taraf, exhaust peeche. Ek ulta server cold aisle mein garam hawa phenkta hai. Airflow direction label hamesha check karo (kuch network switches dono directions mein aate hain).</p>
      <p style={S.p}><strong>Cable management:</strong> Power, network aur management cables alag, saaf aur labelled rakho. Kharab cabling airflow rokti hai, troubleshooting slow karti hai aur galti se cable nikalne ka risk badhati hai.</p>
      <Figure caption="Fig 5 — Redundant A/B power path: dual-PSU server alag A aur B rack PDUs se, independent electrical circuits par."><DualPsuPower /></Figure>
      <p style={S.p}><strong>A/B redundant power:</strong> PSU 1 ko PDU A se aur PSU 2 ko PDU B se jodo. Dono PDUs alag upstream paths se aane chahiye — alag UPS, breakers aur distribution. Tab poora path fail ho jaye to bhi server nahi rukta. Dekho <TopicLink slug="pdu" variant="inline" /> aur <TopicLink slug="ups" variant="inline" />.</p>
      <p style={S.p}><strong>Weight planning:</strong> Bhara hua 2U server 20–30 kg ya zyada ka ho sakta hai; AI servers 100 kg se zyada ke. Bhaari equipment rack mein neeche lagao taaki centre of gravity neeche rahe. Floor aur rack load rating check karo, aur bhaari units ke liye server lift use karo.</p>
      <p style={S.p}><strong>Growth ke liye jagah:</strong> Pehle din rack 100% mat bharo. Expansion ke liye jagah chhodo, lekin power aur cooling headroom bhi chhodo — jagah shaayad hi pehli limit hoti hai; power zyadatar hoti hai.</p>
      <ComparisonTable
        title="Rack Planning Checklist"
        headers={["Check", "Kya Poochna Hai", "Kyun Zaroori"]}
        rows={[
          ["Power", "Failover ke baad total load EK feed par fit hota hai?", "Dono feeds limit ke paas chalein to A/B redundancy fail ho jaati hai"],
          ["Cooling", "Rack apne kW cooling envelope ke andar hai?", "Hot spots server life kam karte hain aur throttling karwate hain"],
          ["Weight", "Rack + floor load rating kaafi hai?", "Safety aur structural limit"],
          ["Network", "Switch ports aur cable lengths available hain?", "Port nahi = service nahi"],
          ["Airflow", "Blanking panels aur brush strips lage hain?", "Recirculation rokta hai"],
          ["Labels", "Rack ID, U number, hostname, port labels?", "Tez aur galti-rahit troubleshooting"],
          ["Documentation", "DCIM / asset database mein entry hai?", "Jo record nahi, use manage nahi kar sakte"],
        ]}
        caption="Har naye server ya rack change request ke liye ye checklist use karo."
      />

      {/* ══════════ 9. POWER COOLING MATH ══════════ */}
      <h2 id="power-cooling-math" style={S.h2}>Power and Cooling Math for a Server</h2>
      <p style={S.p}>Server jitna watt kheenchta hai, wo sab heat ban jaata hai. IT equipment mein jaane wali electrical power lagbhag poori room mein heat ke roop mein nikalti hai. Isliye power planning aur cooling planning ek hi sikke ke do pehlu hain.</p>
      <h3 style={S.h3}>Typical Power Draw</h3>
      <ComparisonTable
        title="Rough Power Ranges (Sirf Indicative)"
        headers={["Server Type", "Typical Power Range", "Note"]}
        rows={[
          ["1U 2-socket general server", "300–800 W", "CPU, RAM aur drives par depend"],
          ["2U virtualization host (full RAM)", "500–1,000 W", "Bada RAM kaafi power badhata hai"],
          ["Storage-dense 4U server", "800–1,500 W", "Bahut saari spinning drives"],
          ["8-GPU AI server", "6,000–10,000+ W", "Very high-density power aur aksar liquid cooling chahiye"],
        ]}
        caption="Asli configuration ke liye hamesha vendor power calculator use karo. Nameplate power maximum hai, normal operating draw nahi."
      />
      <p style={S.p}><strong>Nameplate vs actual:</strong> PSU par likha label maximum rating hai. Server shaayad hi itna draw karta hai. Asli draw load par depend karta hai. BMC ya PDU ki measured values se plan karo aur margin rakho.</p>
      <h3 style={S.h3}>Worked Example — A/B Rack Power</h3>
      <p style={S.p}>Maan lo ek rack mein do 32 A, 230 V single-phase PDUs (A aur B) hain. Har PDU lagbhag 32 × 230 = 7.36 kVA de sakta hai.</p>
      <p style={S.p}>Electrical practice mein continuous load breaker rating ke lagbhag 80% tak limit rakha jaata hai. To har feed lagbhag 7.36 × 0.8 = 5.9 kVA continuously utha sakta hai.</p>
      <p style={S.p}>2N A/B design mein har server dono feeds se draw karta hai. Feed A fail ho to feed B ko <em>poora</em> rack uthana padta hai. To total rack load lagbhag 5.9 kVA se neeche rehna chahiye — 2 × 5.9 nahi. Normal operation mein har feed sirf aadha load uthata hai.</p>
      <CodeBlock lang="text">
{`Feed capacity (each)     : 32 A × 230 V        = 7.36 kVA
Continuous limit (80%)   : 7.36 × 0.8          = 5.9 kVA
Rack total ≤ 5.9 kVA     (taaki A fail ho to B sab utha sake)
Normal state             : A ≈ 2.9 kVA, B ≈ 2.9 kVA`}
      </CodeBlock>
      <Callout type="common-mistake" title="Classic A/B Trap">
        Engineers dono PDUs ko 70–80% tak load kar dete hain "kyunki do feeds hain". Feed fail hone par bacha hua PDU ko 140–160% uthana padega — uska breaker trip karega aur poora rack band. Redundancy tabhi hai jab ek feed sab kuch utha sake. Actual limits site design, breaker types aur local electrical codes par depend karte hain.
      </Callout>
      <h3 style={S.h3}>Power se Heat se Airflow</h3>
      <p style={S.p}>Kaam ke conversions: <strong>1 kW ≈ 3,412 BTU/hr</strong>. Aur 1 ton refrigeration = 12,000 BTU/hr ≈ 3.5 kW.</p>
      <p style={S.p}>Servers ko airflow bhi chahiye. Ek common rule of thumb hai <strong>CFM ≈ 3,160 × kW ÷ ΔT(°F)</strong>, jahan ΔT server inlet se exhaust tak temperature rise hai. 5 kW rack aur 20 °F ΔT ke liye rack se lagbhag 790 CFM hawa guzarni chahiye.</p>
      <p style={S.p}>Agar room servers ke kheenchne se kam hawa deta hai, to servers peeche ki garam exhaust hawa lene lagte hain — yahi recirculation hai. Isi liye airflow management itna important hai.</p>
      <p style={S.p}>ASHRAE server inlet temperature lagbhag 18–27 °C recommend karta hai. Kai sites energy bachane ke liye upper end par chalti hain, par tabhi jab airflow achhe se managed ho. Dekho <TopicLink slug="crac" variant="inline" /> aur <TopicLink slug="airflow-management" variant="inline" />.</p>
      <h3 style={S.h3}>Rack Density Practice Mein</h3>
      <p style={S.p}>Traditional enterprise racks lagbhag 4–10 kW par chalte hain. High-density racks achhe containment ke saath 15–30 kW tak jaate hain. AI/GPU racks 40–100+ kW tak jaate hain aur aksar rear-door heat exchangers ya direct-to-chip liquid cooling chahiye.</p>
      <p style={S.p}>Actual limits project design, cooling architecture aur utility capacity par depend karte hain.</p>

      {/* ══════════ 10. CABLING ══════════ */}
      <h2 id="cabling" style={S.h2}>Cabling — Power, Network and Management</h2>
      <p style={S.p}>Ek server mein chaar se das cables ho sakte hain. Rack mein 40 servers ho to cabling ek asli engineering topic ban jaata hai.</p>
      <ComparisonTable
        title="Typical Server par Cables"
        headers={["Cable", "Purpose", "Good Practice"]}
        rows={[
          ["Power ×2", "PSU 1 → PDU A, PSU 2 → PDU B", "Locking ya colour-coded cords (A aur B alag colour)"],
          ["Production network ×2", "Application traffic do alag switches par", "Redundancy ke liye do switches par bond/team"],
          ["Storage / backup network", "SAN, iSCSI, NFS ya backup traffic", "Alag VLAN ya physical network"],
          ["BMC / management ×1", "iDRAC / iLO / XCC dedicated port", "Sirf management VLAN — internet par kabhi expose nahi"],
          ["Console / USB (temporary)", "Local setup", "Commissioning ke baad hata do"],
        ]}
        caption="Cable counts design ke hisaab se alag hote hain. Site cabling standard follow karo aur dono ends par label lagao."
      />
      <p style={S.p}><strong>Labelling:</strong> Har cable ke dono ends par hostname, port aur destination ka label lagao. Ek common standard ANSI/TIA-606 hai. Labelled cable seconds mein trace hota hai; unlabelled mein ghanta aur risky guess lag sakta hai.</p>
      <p style={S.p}><strong>Copper vs fibre:</strong> Chhote links (rack ke andar, lagbhag 5 m tak) DAC (direct attach copper) cables use kar sakte hain. Lambe links fibre aur transceivers (SFP+/SFP28/QSFP) use karte hain. Fibre connectors ko dhyan se handle karo — end-face par dhool link errors ka bada reason hai.</p>
      <p style={S.p}><strong>Cable routing:</strong> Jahan ho sake power aur data cables alag sides par rakho. Server ka peeche ka hissa block mat karo — fans aur PSU ko free airflow chahiye, aur PSU nikalne ke liye jagah chahiye. Cable ko minimum bend radius se zyada mat modo.</p>
      <Callout type="best-practice" title="Engineer Tip — Do Feeds ke liye Do Colours">
        Feed A ke liye red power cords aur feed B ke liye blue use karo (ya jo site standard ho). Raat ke 3 baje emergency mein kisi ko cable trace karke feed pata nahi karni chahiye.
      </Callout>

      {/* ══════════ 11. BOOT FLOW ══════════ */}
      <h2 id="boot-flow" style={S.h2}>Server Boot Flow</h2>
      <Figure caption="Fig 6 — Server boot sequence: power applied, BMC init (standby power par), UEFI POST, boot device selection, bootloader, phir OS/hypervisor."><ServerBootFlow /></Figure>
      <p style={S.p}><strong>Step 1 — Power lagi, BMC start:</strong> AC connect hote hi PSU BMC ko standby power dete hain. BMC pehle boot hota hai aur hardware health dekhna shuru karta hai. Main CPU abhi off hai.</p>
      <p style={S.p}><strong>Step 2 — UEFI / BIOS POST:</strong> Firmware CPU, memory aur PCIe devices initialise karta hai aur Power-On Self-Test chalata hai. Problems error codes, LED patterns ya log entries ke roop mein dikhti hain. Bade RAM wale server par memory training mein kai minute lag sakte hain.</p>
      <p style={S.p}><strong>Step 3 — Boot device:</strong> Firmware boot order ka pehla valid device chunta hai: local drive, mirrored M.2/BOSS module, PXE (network), SAN boot ya USB. PXE se kai servers par OS apne aap install hota hai.</p>
      <p style={S.p}><strong>Step 4 — Bootloader se OS/hypervisor:</strong> GRUB, Windows Boot Manager ya hypervisor loader kernel start karta hai. Services up aati hain. Secure Boot on ho to har stage ka signature check hota hai.</p>
      <p style={S.p}>Boot time hardware, memory size, option ROMs aur OS par depend karta hai. Bade server ko OS tak pahunchne mein 3–10 minute lag sakte hain — isliye patching windows mein ye time hona chahiye.</p>
      <Callout type="maintenance" title="Field mein Ye Kyun Zaroori Hai">
        Agar server "boot nahi ho raha", to pata hona chahiye ki is sequence mein kahan ruka. BMC response nahi = power/standby problem. POST par atka = hardware (RAM, CPU, PCIe). Boot tak pahunchta hai par OS nahi = storage, boot order ya bootloader.
      </Callout>

      {/* ══════════ 12. BMC ══════════ */}
      <h2 id="bmc-management" style={S.h2}>BMC and Out-of-Band Management</h2>
      <p style={S.p}>Socho 500 servers hain aur raat ke 2 baje ek kharab ho gaya. Har fault ke liye keyboard-monitor leke data hall bhaagna practical nahi. BMC yahi problem solve karta hai.</p>
      <p style={S.p}><strong>Baseboard Management Controller</strong> server board par ek chhota, independent computer hai. Iska apna firmware aur apna dedicated network port hota hai, aam taur par alag management VLAN par.</p>
      <p style={S.p}>"Out-of-band" ka matlab management path production path se alag hai. OS crash ho ya production network down ho, BMC tab bhi reachable rehta hai. <strong>Ise standby power chahiye</strong> — poori tarah unplugged server ka BMC nahi hota.</p>
      <h3 style={S.h3}>BMC Kya Kar Sakta Hai</h3>
      <ul style={S.ul}>
        <li>Remote power on, off, reset aur power-cycle.</li>
        <li>Virtual console — network par keyboard, video aur mouse.</li>
        <li>Remote media — ISO mount karke bina site gaye OS install.</li>
        <li>Hardware health — temperatures, fans, PSU, drives, memory errors.</li>
        <li>System Event Log (SEL) — hardware events ka black-box record.</li>
        <li>Firmware aur BIOS updates, aur SNMP, syslog ya email se alerts.</li>
      </ul>
      <h3 style={S.h3}>Vendor Names aur Standards</h3>
      <ComparisonTable
        title="BMC Implementations"
        headers={["Vendor", "BMC Name", "Typical Tools"]}
        rows={[
          ["Dell", "iDRAC", "iDRAC web UI, racadm, OpenManage"],
          ["HPE", "iLO", "iLO web UI, ilorest, OneView"],
          ["Lenovo", "XCC (XClarity Controller)", "XCC UI, XClarity Administrator"],
          ["Supermicro", "IPMI / Redfish BMC", "Web UI, IPMIView, ipmitool"],
          ["Cisco", "CIMC / Intersight", "CIMC UI, Intersight"],
          ["Open / hyperscale", "OpenBMC", "Redfish API, custom tooling"],
        ]}
        caption="Names aur tools generation ke saath badalte hain. Current documentation vendor se verify karo."
      />
      <p style={S.p}><strong>IPMI v2.0</strong> purana standard hai. <strong>Redfish</strong> DMTF ka modern REST/JSON-based standard hai aur future direction hai. Kai sites transition mein dono use karti hain.</p>
      <h3 style={S.h3}>Useful BMC Commands</h3>
      <CodeBlock lang="bash" label="ipmitool — generic IPMI (password environment se, command line par type nahi)">
{`# Power state
ipmitool -I lanplus -H <bmc-ip> -U <user> -E chassis power status

# System event log padho
ipmitool -I lanplus -H <bmc-ip> -U <user> -E sel list

# Temperatures aur fans
ipmitool -I lanplus -H <bmc-ip> -U <user> -E sdr type Temperature
ipmitool -I lanplus -H <bmc-ip> -U <user> -E sdr type Fan`}
      </CodeBlock>
      <CodeBlock lang="bash" label="Redfish — vendor-neutral REST API">
{`curl -sk -u <user> https://<bmc-ip>/redfish/v1/Systems`}
      </CodeBlock>
      <Callout type="danger" title="BMC Secure Karo — Ye Ek Powerful Darwaza Hai">
        BMC server ko power-cycle kar sakta hai, media mount kar sakta hai aur firmware reflash kar sakta hai. BMC network ko kabhi public internet par mat rakho. Isolated management VLAN par rakho, commissioning par default credentials badlo, strong unique passwords ya directory login use karo, zaroorat na ho to IPMI-over-LAN disable karo, aur BMC firmware patched rakho.
      </Callout>

      {/* ══════════ 13. REDUNDANCY ══════════ */}
      <h2 id="redundancy" style={S.h2}>Redundancy in Servers</h2>
      <p style={S.p}>Redundancy ka matlab hai ki ek single failure service ko na roke. Servers ise kai levels par lagate hain.</p>
      <ComparisonTable
        title="Server ke Andar aur Aas-Paas Redundancy"
        headers={["Layer", "Mechanism", "Kis Se Bachata Hai"]}
        rows={[
          ["Power supply", "A/B feeds par 1+1 hot-swap PSU", "PSU failure ya ek power path ka jaana"],
          ["Cooling", "N+1 hot-swap fan modules", "Ek fan ka fail hona"],
          ["Memory", "ECC, saath mein optional mirroring/sparing modes", "Bit errors aur kharab hoti DIMM cells"],
          ["Storage", "RAID 1 / 5 / 6 / 10, hot spare", "Drive failure"],
          ["Network", "Do switches par NIC bonding / LACP", "NIC, cable ya switch failure"],
          ["Boot", "Mirrored M.2 / BOSS boot module", "OS drive failure"],
          ["Server level", "Clusters, VM failover, load balancers", "Poore server ka fail hona"],
        ]}
        caption="Exact features server model aur configuration par depend karte hain."
      />
      <p style={S.p}><strong>PSU redundancy:</strong> 1+1 common hai. Har PSU ko aise size karo ki ek akela poora server load utha sake. Active-active mode mein dono load share karte hain; active-standby mein ek sab uthata hai. OEM manual dekho.</p>
      <p style={S.p}><strong>Storage:</strong> RAID 1 do drives mirror karta hai. RAID 5 teen ya zyada drives par parity use karta hai. RAID 6 do failures survive karta hai. RAID 10 mirrored pairs ko stripe karta hai. <strong>RAID backup nahi hai</strong> — ye drive failure se bachata hai, delete, ransomware ya aag se nahi. Dekho <TopicLink slug="backup" variant="inline" />.</p>
      <p style={S.p}><strong>Network:</strong> Do NIC ports do alag switches par bond kiye jaate hain. Ek switch fail ya upgrade ho to traffic doosre par chalta rehta hai. Sirf configuration nahi, failover test bhi karo.</p>
      <p style={S.p}><strong>Ek server se aage:</strong> Koi bhi single server perfectly reliable nahi hota. Asli high availability kai servers se aati hai — clusters, load balancers aur VM failover. Dekho <TopicLink slug="load-balancer" variant="inline" /> aur <TopicLink slug="virtualization" variant="inline" />.</p>

      {/* ══════════ 14. TIER III / IV ══════════ */}
      <h2 id="tier-iii-iv-view" style={S.h2}>Servers in Tier III and Tier IV Data Centers</h2>
      <p style={S.p}>Ab server ko building se jodte hain. Pehle normal industry ka view, phir data center ka, phir Tier III aur Tier IV ka.</p>
      <ComparisonTable
        title="Same Server — Chaar Views"
        headers={["View", "Server Kya Hai", "Kya Matter Karta Hai"]}
        rows={[
          ["Normal office / IT room", "Desk ke neeche ya chhote rack mein ek box", "Cost, convenience; downtime chalta hai"],
          ["Data center", "Managed rack mein sainkdon mein se ek", "Rack power/cooling, remote management, labelled cabling"],
          ["Tier III site", "Concurrently maintainable infrastructure par dual-corded server", "Koi bhi ek power/cooling component maintenance ke liye nikaal sakte hain, IT par asar nahi"],
          ["Tier IV site", "Fault-tolerant infrastructure par dual-corded server", "Koi bhi ek unplanned failure — poora path bhi — IT par asar nahi dalta"],
        ]}
        caption="Tier classification (Uptime Institute) site infrastructure ke liye hai. Ye server ko rate nahi karta. Actual implementation project requirements, utility requirements, OEM design aur data center architecture par depend karti hai."
      />
      <h3 style={S.h3}>Tier III Design Philosophy</h3>
      <p style={S.p}>Tier III <strong>concurrently maintainable</strong> hota hai. Har capacity component aur distribution path ko planned maintenance ke liye service se hata sakte hain, bina IT equipment band kiye.</p>
      <p style={S.p}>Aam taur par N+1 design hota hai, multiple distribution paths ke saath, lekin typically ek path active aur doosra alternate hota hai. Uptime Institute Tier III ke liye lagbhag 99.982% availability batata hai (saal mein lagbhag 1.6 ghante downtime).</p>
      <p style={S.p}>Servers ke liye matlab: dual PSUs do independent PDUs se jude hote hain, taaki engineers ek path maintenance ke liye band kar sakein aur server doosre par chalta rahe. Isi liye A/B cabling discipline itna critical hai.</p>
      <h3 style={S.h3}>Tier IV Design Philosophy</h3>
      <p style={S.p}>Tier IV <strong>fault tolerant</strong> hota hai. Ise koi bhi single unplanned failure — poora power path bhi — bina IT impact ke survive karni chahiye. Ye aam taur par 2N ya 2(N+1) use karta hai, do simultaneously active paths aur compartmentalised (physically alag) systems ke saath. Uptime Institute lagbhag 99.995% availability batata hai (saal mein lagbhag 26 minute).</p>
      <p style={S.p}>Servers ke liye: dual-corded equipment zaroori hai. Single-corded server Tier IV building mein bhi single point of failure hai, kyunki wo sirf ek path par hai.</p>
      <Callout type="warning" title="Single-Corded Devices Design Tod Dete Hain">
        Kuch appliances aur purane devices mein sirf ek power cord hota hai. Unhe ek PDU mein lagake umeed mat rakho. Rack-level ya room-level static transfer switch (dekho <TopicLink slug="sts" variant="inline" />) ya automatic transfer switch use karo, taaki device ek path ke jaane par bhi survive kare. Aise devices ko exception ke roop mein document karo.
      </Callout>
      <h3 style={S.h3}>Tier III / IV ke liye Server Engineer Ko Kya Karna Hai</h3>
      <ul style={S.ul}>
        <li>Har dual-PSU server ko <strong>dono</strong> A aur B se cable karo — dono PSU ek PDU par kabhi nahi.</li>
        <li>Total rack load ko aisa rakho jo failover ke baad ek feed utha sake.</li>
        <li>Planned power maintenance se pehle check karo ki koi server galti se ek hi PSU par to nahi chal raha.</li>
        <li>Verify karo ki path hatane par PSU aur network failover alerts monitoring tak pahunchte hain.</li>
        <li>Workload replicas (cluster nodes) alag racks mein aur ho sake to alag power zones mein rakho.</li>
      </ul>
      <p style={S.p}>Infrastructure side ke liye dekho <TopicLink slug="ups" variant="inline" />, <TopicLink slug="pdu" variant="inline" /> aur <TopicLink slug="data-center-types" variant="inline" />.</p>

      {/* ══════════ 15. INSTALLATION ══════════ */}
      <h2 id="installation-commissioning" style={S.h2}>Installation and Commissioning</h2>
      <p style={S.p}>Achhi installation jaan-boojh kar dheemi aur boring hoti hai. Zyadatar field failures commissioning mein chhoote hue kisi step se trace hote hain.</p>
      <h3 style={S.h3}>Phase 1 — Server Aane Se Pehle</h3>
      <ul style={S.ul}>
        <li>Date, rack, U position aur rollback ke saath approved change request.</li>
        <li>Target rack ke liye power, cooling aur port capacity confirm.</li>
        <li>BMC aur OS ke liye IP addresses reserve; hostnames agreed.</li>
        <li>Rails, power cords, cables, transceivers aur labels ready.</li>
      </ul>
      <h3 style={S.h3}>Phase 2 — Receiving aur Inspection</h3>
      <p style={S.p}>Box mein shipping damage check karo. Serial numbers ko purchase order se match karo. Service tag aur serial asset database mein likho. DIMMs, drives aur PSUs inspect karo — transport ke baad loose parts hote hain.</p>
      <h3 style={S.h3}>Phase 3 — Racking</h3>
      <ol style={S.ul}>
        <li>Sahi U position par rails lagao aur lock karo.</li>
        <li>Server do log ya server lift se uthao. Bezel ke handles ya PSU se kabhi mat uthao.</li>
        <li>Latch click hone tak slide karo; ek baar andar-bahar slide karke test karo.</li>
        <li>Cable management arm tabhi lagao jab site standard allow kare (kuch airflow kam karte hain).</li>
      </ol>
      <h3 style={S.h3}>Phase 4 — Cabling</h3>
      <p style={S.p}>PSU 1 ko PDU A se aur PSU 2 ko PDU B se jodo. Network ports do alag switches se jodo. BMC port ko management switch se jodo. Har cable ke dono ends par label lagao. Link LEDs verify karo.</p>
      <h3 style={S.h3}>Phase 5 — First Power-On aur Baseline</h3>
      <ul style={S.ul}>
        <li>Power on karo aur BMC virtual console se POST dekho. Koi warning note karo.</li>
        <li>Default BMC credentials badlo, BMC IP, time (NTP) aur alert destinations set karo.</li>
        <li>Firmware ko approved baseline par update karo: BIOS/UEFI, BMC, NIC, RAID/HBA, drives.</li>
        <li>Design ke hisaab se RAID, boot order, power profile aur Secure Boot configure karo.</li>
        <li>OS ya hypervisor install karo (PXE ya remote media) aur standard build lagao.</li>
      </ul>
      <h3 style={S.h3}>Phase 6 — Testing aur Burn-In</h3>
      <ul style={S.ul}>
        <li><strong>Hardware check:</strong> memory count aur speed sahi, saare drives visible, BMC log mein koi error nahi.</li>
        <li><strong>Stress/burn-in:</strong> kai ghante CPU aur memory stress chalao aur temperatures aur fans dekho.</li>
        <li><strong>Redundancy test:</strong> approved procedure ke saath ek power cord nikalo, confirm karo ki server chalta raha aur alert aaya; wapas lagao aur alert clear hone do. Doosre PSU ke liye dohrao.</li>
        <li><strong>Network test:</strong> ek NIC link nikalo aur failover confirm karo.</li>
        <li><strong>Alerting test:</strong> confirm karo ki monitoring system ko BMC traps aur OS metrics mil rahe hain.</li>
      </ul>
      <Callout type="warning" title="Live Production Rack Par Bina Approval Redundancy Test Mat Karo">
        Power cord nikalna asli test hai, aur live rack par galat move se outage ho sakta hai. Ye naye, abhi live nahi hue server par karo, ya sirf approved Method of Procedure (MOP) ke saath aur sahi logon ko inform karke.
      </Callout>
      <h3 style={S.h3}>Phase 7 — Handover</h3>
      <p style={S.p}>DCIM aur asset database mein rack, U, serials, MAC addresses, IPs aur cable map update karo. Configuration baseline save karo. Sign-off record ke saath operations team ko handover do. Dekho <TopicLink slug="dcim" variant="inline" />.</p>

      {/* ══════════ 16. OPERATIONS ══════════ */}
      <h2 id="operations-monitoring" style={S.h2}>Daily Operations and Monitoring</h2>
      <h3 style={S.h3}>Operations Kaise Dikhte Hain</h3>
      <p style={S.p}>Server engineer ka din routine rounds, ticket handling aur planned changes ka mix hota hai. Achhi team chhoti cheezein jaldi pakad kar incidents rokti hai.</p>
      <h3 style={S.h3}>Shift Round Checklist</h3>
      <ul style={S.ul}>
        <li>Aisles mein ghoomo aur servers, PSU, fans aur drives par amber/red LEDs dekho.</li>
        <li>Ajeeb awaaz suno — fan fail ho raha ho ya full speed par ho.</li>
        <li>BMC/monitoring console mein naye hardware alerts dekho.</li>
        <li>Rack inlet temperature aur humidity ko limits se compare karo.</li>
        <li>Confirm karo ki koi khaali U blanking panel ke bina nahi hai aur koi cable dheela nahi.</li>
        <li>Findings shift log mein likho aur open items handover karo.</li>
      </ul>
      <h3 style={S.h3}>Kya Monitor Karna Hai</h3>
      <ComparisonTable
        title="Server Monitoring Layers"
        headers={["Layer", "Kya Dekhna Hai", "Source"]}
        rows={[
          ["Hardware health", "CPU/inlet temperature, fan RPM, PSU status, drive aur memory errors, SEL", "BMC via IPMI / Redfish / SNMP"],
          ["Power", "Watts per server, per rack, per feed", "BMC, intelligent PDU, DCIM"],
          ["OS metrics", "CPU, RAM, disk I/O, network, process health", "Agents (Prometheus node_exporter, Zabbix, etc.)"],
          ["Application", "Response time, error rate", "APM / application monitoring"],
          ["Environment", "Rack inlet temp, humidity, leak", "Sensors, BMS, DCIM"],
        ]}
        caption="Alerts aise insaan tak pahunchne chahiye jo action le sake. Jis alarm ko koi receive nahi karta, wo alarm na hone ke barabar hai."
      />
      <p style={S.p}><strong>Out-of-band alerts:</strong> BMC alerts SNMP traps, email ya syslog se OS crash ke baad bhi aap tak pahunchte hain. Ye sabse important hardware alerts hain.</p>
      <p style={S.p}><strong>Alert hygiene:</strong> Bahut zyada alarms se alarm fatigue hoti hai. Thresholds tune karo, alerts ko severity se group karo aur regularly review karo. Critical alert kam aani chahiye aur hamesha actionable.</p>
      <h3 style={S.h3}>Capacity Tracking</h3>
      <p style={S.p}>Har rack ki chaar capacities track karo: <strong>power</strong> (kW used vs limit), <strong>cooling</strong>, <strong>space</strong> (free U) aur <strong>network</strong> (free ports). Jo pehle khatam ho wahi asli limit hai — aksar power. Environmental monitoring ke liye dekho <TopicLink slug="bms" variant="inline" />.</p>
      <h3 style={S.h3}>Change aur Incident Discipline</h3>
      <p style={S.p}>Planned kaam change management se guzarta hai: description, risk, window, approval, rollback. Incidents ko ticket, severity, owner aur timeline milta hai. Ye aadat professional operation ko risky operation se alag karti hai.</p>

      {/* ══════════ 17. MAINTENANCE ══════════ */}
      <h2 id="maintenance" style={S.h2}>Preventive Maintenance and Firmware</h2>
      <h3 style={S.h3}>Physical Preventive Maintenance</h3>
      <ul style={S.ul}>
        <li>Server intakes aur rack filters/doors par dhool check karke saaf karo; dhool airflow rokti hai aur heat phansa leti hai.</li>
        <li>BMC se fan health dekho; jinka RPM badh raha ho ya errors hon, unhe badlo.</li>
        <li>PSU status aur cord seating check karo; confirm karo ki dono PSU expected load share kar rahe hain.</li>
        <li>Check karo ki blanking panels, brush strips aur rack doors laga hai.</li>
        <li>RAID cache battery/capacitor health aur drive predictive-failure alerts check karo.</li>
        <li>Critical spares site par rakho: PSU, fans, common drives, DIMMs, power cords, transceivers.</li>
      </ul>
      <h3 style={S.h3}>Firmware Lifecycle</h3>
      <p style={S.p}>Firmware har jagah hota hai: BIOS/UEFI, BMC, NIC, RAID/HBA, drives, backplane, PSU. Updates bugs aur security issues fix karte hain — lekin kharab update cheezein tod bhi sakta hai.</p>
      <ol style={S.ul}>
        <li>Vendor release notes aur compatibility matrix padho.</li>
        <li>Pehle non-production ya lab server par bundle test karo.</li>
        <li>Configuration backup lo aur rollback path confirm karo.</li>
        <li>Approved window mein production ko chhote batches mein update karo.</li>
        <li>Aage badhne se pehle har batch ke baad health aur performance verify karo.</li>
      </ol>
      <p style={S.p}>Vendors firmware bundles dete hain (jaise Dell repository bundles, HPE Service Pack for ProLiant, Lenovo update packs) jo saath mein tested hote hain. Components ek-ek karke update karne se vendor bundle safer hai.</p>
      <Callout type="warning" title="Firmware Update Kabhi Beech Mein Mat Rokna">
        BIOS/BMC/RAID firmware flash ke beech power loss ya reset component ko brick kar sakta hai. Check karo ki server stable power par hai, dono PSU live hain, aur completion message ka intezaar karo — chahe atka hua lage.
      </Callout>
      <h3 style={S.h3}>Support Contracts</h3>
      <p style={S.p}>Enterprise servers ke saath aksar OEM support hota hai — jaise next-business-day ya 4-hour on-site response. Apna contract level jaano, service tag haath mein rakho aur case raise karte waqt vendor ke diagnostic logs use karo.</p>

      {/* ══════════ 18. TROUBLESHOOTING ══════════ */}
      <h2 id="troubleshooting" style={S.h2}>Common Faults and Troubleshooting</h2>
      <p style={S.p}>Achhi troubleshooting ek method hai, trick nahi. Har baar same steps follow karo — tum tez bhi hoge aur safe bhi.</p>
      <Figure caption="Fig 7 — Saat-step troubleshooting flow: alert, scope, out-of-band check, physical check, isolate, fix aur verify, record."><ServerTroubleshootFlow /></Figure>
      <h3 style={S.h3}>Server Power On Nahi Ho Raha</h3>
      <p style={S.p}>PSU LEDs dekho aur check karo ki A aur B dono feeds live hain. BMC reachable hai? Haan to BMC se remote power-on try karo. BMC bhi band ho to AC feed, PDU outlet, power cord ya dono PSU suspect karo. PSU reseat karo aur known-good cord try karo.</p>
      <h3 style={S.h3}>Server Chal Raha Hai Par Reachable Nahi</h3>
      <p style={S.p}>BMC virtual console kholo. Shaayad kernel panic, hung OS ya frozen login dikhe. SEL mein hardware events dekho. Sirf network issue ho to NIC link lights, switch port status aur VLAN check karo. BMC se power cycle last resort hai, pehla step nahi.</p>
      <h3 style={S.h3}>Drive Failure Alert</h3>
      <p style={S.p}>Controller ya BMC aur bay LED se slot pehchano. RAID state dekho (degraded?). Confirm karo ki recent backup hai. Same type ki drive se failed drive hot-swap karo aur rebuild dekho. Rebuild ke dauran array zyada exposed hota hai — heavy changes se bacho. Aur detail: <TopicLink slug="das" variant="inline" />.</p>
      <h3 style={S.h3}>PSU Failure</h3>
      <p style={S.p}>BMC batayega kaun sa PSU. Redundant server chalta rehta hai. Check karo ki feed fail hua ya PSU — cord ko doosre outlet par lagao ya doosre PSU se compare karo. Kharab PSU hot-swap karo aur confirm karo ki dono PSU OK dikha rahe hain aur alert clear ho gaya.</p>
      <h3 style={S.h3}>Overheating aur Fan Faults</h3>
      <p style={S.p}>BMC se temperature aur fan sensors padho. Rack inlet temperature, missing blanking panels, blocked filters, ulta lagaya server aur server ke peeche cable bundles check karo. Failed fan modules badlo. Ek CPU doosre se bahut garam ho to heatsink seating bhi check karo.</p>
      <h3 style={S.h3}>Memory Errors aur Random Reboots</h3>
      <p style={S.p}>Correctable ECC errors log hote hain aur kam ginti mein harmless hote hain. Ek DIMM par badhti ginti early warning hai — planned window mein badal do. Uncorrectable errors server crash kar sakte hain.</p>
      <CodeBlock lang="bash" label="Linux — memory/CPU hardware errors dhoondo">
{`dmesg -T | grep -i -E "mce|edac|ecc|hardware error"
ipmitool sel elist
edac-util -v        # agar EDAC tools installed hain
dmidecode -t memory # DIMM slots, size, speed`}
      </CodeBlock>
      <h3 style={S.h3}>POST Error / Server Boot Nahi Ho Raha</h3>
      <p style={S.p}>BMC se POST message ya LED code capture karo. Typical causes: naya DIMM unseated ya incompatible, kharab PCIe card, bad firmware change ya failed boot drive. <em>Last change</em> ke baare mein socho aur pehle use undo karo.</p>
      <h3 style={S.h3}>Slow Performance</h3>
      <p style={S.p}>Check karo ki CPU thermal-throttle to nahi kar raha, memory expected se kam speed par to nahi, RAID cache battery fail hokar write-through to nahi kar rahi, ya network link kam speed par negotiate to nahi hua. "Software slowness" ka chhupa reason aksar hardware hota hai.</p>
      <ComparisonTable
        title="Symptom se First Check — Quick Table"
        headers={["Symptom", "Pehle Kya Check Karein", "Tool"]}
        rows={[
          ["Power nahi, LEDs nahi", "A/B feed, PDU outlet, cord, PSU", "Multimeter/PDU display, visual"],
          ["Power on par video nahi", "RAM seating, CPU, PCIe cards", "BMC console, POST code"],
          ["Amber system LED", "SEL mein hardware event", "BMC / ipmitool"],
          ["Fans full speed par", "Inlet temperature, failed fan, sensor", "BMC sensors"],
          ["Degraded RAID", "Failed ya nikali hui drive", "Controller CLI/BMC"],
          ["Network down", "Link light, bond, switch port, VLAN", "ethtool, switch CLI"],
        ]}
        caption="Sirf quick reference — hamesha logs aur last-change record ke saath use karo."
      />

      {/* ══════════ 19. FAILURE SCENARIOS ══════════ */}
      <h2 id="failure-scenarios" style={S.h2}>Real Failure Scenarios and RCA</h2>
      <p style={S.p}>Ye operating data centers mein dikhne wale typical scenarios hain. Naam aur numbers generic hain, par patterns asli hain.</p>
      <h3 style={S.h3}>Scenario 1 — Ek Feed Fail, Doosra Trip (The Domino)</h3>
      <p style={S.p}><strong>Kya hua:</strong> Upstream fault se feed A band ho gayi. Servers ne poora load feed B par shift kiya. B PDU ka breaker kuch seconds mein trip ho gaya aur poora rack band ho gaya.</p>
      <p style={S.p}><strong>Root cause:</strong> Dono feeds lagbhag 65–70% load par thi "kyunki do feeds hain". Failover ke baad B ko 130% se zyada uthana tha.</p>
      <p style={S.p}><strong>Prevention:</strong> Total rack load ko ek feed ki safe limit ke andar rakho. DCIM mein per-feed load monitor karo aur threshold par alert lagao (jaise 2N design mein har feed par 40–45%).</p>
      <h3 style={S.h3}>Scenario 2 — Dono PSU Ek Hi PDU Par</h3>
      <p style={S.p}><strong>Kya hua:</strong> Path A ke planned maintenance mein ek server band ho gaya jabki uske do PSU the.</p>
      <p style={S.p}><strong>Root cause:</strong> Jaldbaazi mein installation mein dono PSU PDU A se jod diye gaye. Server redundant dikhta tha par tha nahi.</p>
      <p style={S.p}><strong>Prevention:</strong> Colour-coded cords, installation ke baad audit, aur maintenance se pehle affected path par har server ka PSU status check.</p>
      <h3 style={S.h3}>Scenario 3 — "Chhote" Change Ke Baad Hot Spot</h3>
      <p style={S.p}><strong>Kya hua:</strong> Rack ke beech ka ek server raat ko throttle hua aur phir shutdown. BMC log mein inlet over-temperature dikha.</p>
      <p style={S.p}><strong>Root cause:</strong> Pichle din do servers hataye gaye aur blanking panels nahi lagaye gaye. Garam hawa khaali jagah se recirculate hui.</p>
      <p style={S.p}><strong>Prevention:</strong> "Blanking panel lagao" ko decommission checklist ka hissa banao. Rack-inlet temperature alarms lagao.</p>
      <h3 style={S.h3}>Scenario 4 — Memory Errors Ignore Kiye</h3>
      <p style={S.p}><strong>Kya hua:</strong> Database server machine-check error se crash hua. Mahino pehle SEL mein ek DIMM par sainkdon correctable errors dikhe the.</p>
      <p style={S.p}><strong>Root cause:</strong> Kisi ne correctable memory errors ko monitor ya act nahi kiya.</p>
      <p style={S.p}><strong>Prevention:</strong> DIMM error counts badhne par alert lagao aur module ko uncorrectable hone se pehle planned window mein badlo.</p>
      <h3 style={S.h3}>Scenario 5 — Firmware Update Ulta Pad Gaya</h3>
      <p style={S.p}><strong>Kya hua:</strong> RAID controller firmware update ek saath saare servers par push kiya gaya. Bug se kai servers par drives drop ho gayi.</p>
      <p style={S.p}><strong>Root cause:</strong> Staged rollout nahi tha aur ek non-production server par test nahi hua.</p>
      <p style={S.p}><strong>Prevention:</strong> Har firmware change ke liye staged rollout, release-note review aur rollback plan.</p>
      <Callout type="best-practice" title="Achha RCA Kaise Likhein">
        Events ki timeline, direct cause, root cause ("why" ke peeche ka "why"), impact, kya kaam kiya, kya nahi, corrective actions owner aur date ke saath. RCA blame ke liye nahi hota — ye ensure karne ke liye hota hai ki wahi failure dobara na ho.
      </Callout>

      {/* ══════════ 20. SAFETY ══════════ */}
      <h2 id="safety-practices" style={S.h2}>Safety Practices</h2>
      <p style={S.p}>Servers bhole dikhte hain, par data hall mein asli hazards hote hain: bijli, weight, heat, shor aur tez edges. Pehle apni site ke safety rules aur permit-to-work process follow karo. Neeche ke points general good practice hain.</p>
      <ComparisonTable
        title="Server Room Safety — Hazard aur Control"
        headers={["Hazard", "Risk", "Control"]}
        rows={[
          ["Bhaari equipment", "Kamar ki chot, haath kuchalna, server girna", "Do-person lift ya server lift; chassis se uthao, bezel/PSU se nahi"],
          ["Rack tipping", "Kai bhaari servers kheenchne par rack gir jaata hai", "Bhaari gear neeche lagao; stabiliser feet; ek time par ek hi server bahar kheencho"],
          ["Electrical", "PSU ya PDU ke andar shock, short circuit", "PSU mat kholo; PDU circuits par lockout/tagout; insulated tools"],
          ["Multiple power cords", "Ek cord nikalne par bhi server energised rehta hai", "Server kholne se pehle SAARE power cords nikalo"],
          ["Static discharge (ESD)", "DIMMs, CPUs, cards ko chupchaap damage", "ESD wrist strap ya mat, parts ko edges se pakdo, antistatic bags"],
          ["Hot surfaces", "Heatsinks, PSU, drives se jalna", "Garam parts ko thanda hone do; zaroorat ho to gloves"],
          ["Fibre optics", "Invisible laser light se aankh ko nuksan", "Fibre end ya transceiver mein kabhi mat dekho; unused ports cap karo"],
          ["Noise", "Shor wale data hall mein sunne ki kshati", "Site rules ke hisaab se hearing protection"],
          ["Working at height", "Ladder ya step se girna", "Approved steps, teen point of contact"],
          ["Fire / suppression", "Gas discharge ya smoke event", "Evacuation routes aur pre-discharge alarms jaano; site fire procedure dekho"],
        ]}
        caption="Ye general list hai aur aapki site ke safety rules, electrical regulations aur permit-to-work system ki jagah nahi leti."
      />
      <Callout type="danger" title="Live Electrical Equipment Par Akele Kaam Mat Karo">
        Redundant PSU wale servers mein ek se zyada power source hote hain. Ek cord nikalne se server kholne ke liye safe nahi ho jaata. Hamesha saare sources isolate karke verify karo, aur site ke lockout/tagout aur permit-to-work rules follow karo. Shak ho to ruko aur pooch lo.
      </Callout>
      <h3 style={S.h3}>Safe Hot-Swap Aadatein</h3>
      <ul style={S.ul}>
        <li>Failed part kheenchne <em>se pehle</em> part number aur slot confirm karo — andaze par kabhi mat kheencho.</li>
        <li>PSU ke liye: pehle confirm karo ki <em>doosra</em> PSU healthy hai aur uska feed live hai. Warna server band ho sakta hai.</li>
        <li>Drive ke liye: doosri drive nikalne se pehle RAID state check karo ki array pehle se degraded to nahi.</li>
        <li>Nikala hua part antistatic bag mein rakho aur vendor ko return ke liye tag karo.</li>
      </ul>

      {/* ══════════ 21. LIFECYCLE ══════════ */}
      <h2 id="server-lifecycle" style={S.h2}>Server Lifecycle</h2>
      <p style={S.p}>Server data center mein lagbhag teen se saat saal rehta hai, workload, warranty aur technology refresh policy ke hisaab se. Har stage ke apne risks hain.</p>
      <ComparisonTable
        title="Lifecycle Stages"
        headers={["Stage", "Main Activities", "Typical Risk"]}
        rows={[
          ["Planning", "Workload sizing, form factor, power budget, redundancy, vendor aur compatibility check", "Undersizing/oversizing; power aur cooling ko ignore karna"],
          ["Procurement", "Quotation, configuration, support contract, delivery schedule", "Galat part numbers, rails/cords miss"],
          ["Deployment", "Receiving, racking, cabling, firmware, OS, testing, handover", "Cabling errors, testing skip"],
          ["Operation", "Monitoring, patching, incident response, capacity tracking", "Ignored alerts, unplanned changes"],
          ["Maintenance", "Part replacement, firmware, preventive checks", "Bad update, jaldbaazi mein swaps"],
          ["Refresh / migration", "Workload ko naye hardware par le jaana", "Cutover mein data loss, downtime"],
          ["Decommissioning", "Data sanitise, systems se hatao, physically hatao, dispose", "Data leakage, orphaned records"],
        ]}
        caption="Refresh cycles organisation, warranty aur performance-per-watt gains ke hisaab se alag hote hain."
      />
      <h3 style={S.h3}>Decommissioning Checklist</h3>
      <ol style={S.ul}>
        <li>Owner se confirm karo ki workload migrate ya retire ho gaya — written approval lo.</li>
        <li>Policy ho to final backup lo aur verify karo.</li>
        <li>Server ko controlled tarike se shutdown karo; power aur network nikalo.</li>
        <li>Drives ko securely erase karo (NIST SP 800-88 guidelines follow karo) ya certificate ke saath destroy karo.</li>
        <li>Server ko monitoring, DCIM, DNS, IPAM, backup aur CMDB se hatao.</li>
        <li>Physically hatao, <strong>blanking panel lagao</strong>, aur rack documentation update karo.</li>
        <li>Return-to-vendor, resale ya certified recycling se dispose karo, local e-waste rules follow karke.</li>
      </ol>
      <Callout type="common-mistake" title="Records Bhool Jaana">
        Rack se nikala gaya par asset database aur monitoring mein bacha hua server "ghost" ban jaata hai — false alarms deta hai, licences waste karta hai aur capacity planning confuse karta hai. Paperwork band karna bhi kaam ka hissa hai.
      </Callout>

      {/* ══════════ 22. OEM ══════════ */}
      <h2 id="oem-reference" style={S.h2}>OEMs and Vendors — Reference</h2>
      <p style={S.p}>Kaun kya banata hai ye jaanna documentation padhne, parts order karne aur vendor support se baat karne mein madad karta hai. Current models hamesha vendor website par verify karo — lineups har generation badalti hain.</p>
      <ComparisonTable
        title="Major Server Vendors (Representative)"
        headers={["Vendor", "Rack Server Families", "BMC / Management", "Notes"]}
        rows={[
          ["Dell Technologies", "PowerEdge (R-series rack, XE for AI)", "iDRAC, OpenManage", "Enterprise data centers mein bahut common"],
          ["Hewlett Packard Enterprise", "ProLiant DL (rack), Synergy/BladeSystem (blade)", "iLO, OneView", "Enterprise aur blade mein strong"],
          ["Lenovo", "ThinkSystem SR series", "XCC, XClarity", "Enterprise aur HPC"],
          ["Supermicro", "SuperServer / GPU / storage-dense systems", "IPMI/Redfish BMC", "GPU aur custom builds ke liye popular"],
          ["Cisco", "UCS C-series rack, X-series modular", "CIMC, Intersight", "Networking ke saath strong tie"],
          ["Inspur / Huawei / others", "Regional enterprise aur cloud servers", "Vendor BMC", "Kuch regions mein strong"],
          ["ODM / OCP (Quanta, Wiwynn, Foxconn)", "Open-rack aur hyperscale sleds", "OpenBMC", "Cloud-scale deployments ke liye bane"],
        ]}
        caption="Sirf representative; endorsement nahi. Availability aur models region aur saal ke hisaab se alag hote hain."
      />
      <p style={S.p}><strong>CPU vendors:</strong> Intel (Xeon), AMD (EPYC) aur ARM-based CPUs (jaise AWS Graviton, Ampere) servers mein use hote hain. NVIDIA, AMD aur doosre GPUs aur accelerators dete hain — dekho <TopicLink slug="gpu" variant="inline" />.</p>
      <p style={S.p}><strong>Parts aur support:</strong> Jahan ho sake OEM-qualified drives, DIMMs aur optics use karo. Third-party parts chal sakte hain, par support tod sakte hain ya compatibility alerts la sakte hain. Vendor ki compatibility list dekho.</p>

      {/* ══════════ 23. MISCONCEPTIONS ══════════ */}
      <h2 id="misconceptions" style={S.h2}>Common Misconceptions</h2>
      <ComparisonTable
        title="Myth vs Reality"
        headers={["Common Belief", "Reality"]}
        rows={[
          ["Bada U number matlab faster server", "U sirf height hai. Ek 1U server purane 4U server se aage nikal sakta hai."],
          ["Do PSU ka matlab server kabhi down nahi hoga", "Sirf tab jab dono feeds independent hon aur ek feed poora load utha sake. Dono PSU ek PDU par ho to redundancy nahi."],
          ["RAID ek backup hai", "RAID sirf drive failure se bachata hai. Delete, ransomware aur site loss ke liye asli backup chahiye."],
          ["42U rack mein 42 servers aa sakte hain", "Power, cooling, weight aur cabling limit karte hain — aksar power pehle."],
          ["Power cord nikalne par bhi BMC chalta hai", "BMC ko standby power chahiye. AC nahi = BMC nahi."],
          ["Firmware updates hamesha safe hote hain", "Issues fix karte hain par naye bhi la sakte hain. Test karo aur stage karo."],
          ["Fans zor se chal rahe hain to server kisi bhi temperature par theek hai", "High inlet temperature life kam karta hai aur throttling karwata hai."],
          ["Tier IV site ka server apne aap Tier IV ho jaata hai", "Tier site ko describe karta hai. Single-corded ya galat cabled server phir bhi single point of failure ho sakta hai."],
        ]}
        caption="Ye myths jaldi saaf kar lo, baad mein asli downtime bachega."
      />

      {/* ══════════ 24. FUTURE TRENDS ══════════ */}
      <h2 id="future-trends" style={S.h2}>Future Trends</h2>
      <ul style={S.ul}>
        <li><strong>Rack density badhti rahegi:</strong> 40–100+ kW AI racks sites ko liquid cooling ki taraf dhakel rahe hain — rear-door heat exchangers aur direct-to-chip cold plates.</li>
        <li><strong>GPU/accelerator servers:</strong> 8-GPU nodes aur rack-scale systems power, weight aur cooling design badal dete hain. Dekho <TopicLink slug="gpu-cluster" variant="inline" /> aur <TopicLink slug="ai-data-center-basics" variant="inline" />.</li>
        <li><strong>DPUs / SmartNICs:</strong> Networking, storage aur security ka kaam CPU se hata kar NIC par dedicated processors ko dete hain.</li>
        <li><strong>CXL (Compute Express Link):</strong> Servers ko high-speed link par memory share aur expand karne deta hai, disaggregated aur composable designs ko support karta hai.</li>
        <li><strong>ARM aur custom silicon:</strong> Cloud workloads ke liye zyada power-efficient CPUs.</li>
        <li><strong>Higher-voltage aur busbar power:</strong> 48 V aur OCP-style rack busbars conversion losses kam karte hain.</li>
        <li><strong>Redfish aur automation:</strong> Zero-touch provisioning, infrastructure as code aur API-driven management manual configuration ki jagah le rahe hain.</li>
        <li><strong>Hardware mein security:</strong> Secure Boot, TPM attestation aur confidential computing (hardware-isolated VMs) standard expectation ban rahe hain.</li>
        <li><strong>Sustainability:</strong> Power capping, behtar PUE aur efficient hardware refresh total cost aur carbon kam karte hain.</li>
        <li><strong>Edge servers:</strong> Chhote, ruggedised servers jo users ke paas lagte hain, aksar remotely managed.</li>
      </ul>

      {/* ══════════ 25. LEARNING PATH ══════════ */}
      <h2 id="learning-path" style={S.h2}>Your Next Learning Steps</h2>
      <p style={S.p}>Server Basics servers track ka pehla step hai. Is order mein aage badho — har topic pichle par banta hai.</p>
      <ol style={S.ul}>
        <li><TopicLink slug="cpu" variant="inline" /> — server processors, cores, cache aur NUMA kaise kaam karte hain.</li>
        <li><TopicLink slug="ram" variant="inline" /> — ECC memory, channels, DIMM population aur memory errors.</li>
        <li><TopicLink slug="gpu" variant="inline" /> — AI aur HPC ke accelerators aur unka power/cooling impact.</li>
        <li><TopicLink slug="blade-server" variant="inline" /> — shared-chassis high-density compute.</li>
        <li><TopicLink slug="virtualization" variant="inline" /> — ek physical server par kai virtual machines.</li>
        <li><TopicLink slug="das" variant="inline" />, <TopicLink slug="nas" variant="inline" /> aur <TopicLink slug="san" variant="inline" /> — server ka data kahan rehta hai.</li>
        <li><TopicLink slug="switch" variant="inline" /> — servers network se kaise jude hote hain.</li>
        <li><TopicLink slug="pdu" variant="inline" /> aur <TopicLink slug="ups" variant="inline" /> — power side jo servers ko zinda rakhta hai.</li>
      </ol>

      {/* ══════════ 26. INTERVIEW QUESTIONS ══════════ */}
      <h2 id="interview-questions" style={S.h2}>Interview Questions</h2>
      <h3 style={S.h3}>Q1: Server aur PC ke key differences kya hain?</h3>
      <p style={S.p}><strong>Answer:</strong> ECC memory, redundant hot-swap PSU, hot-swap drives aur fans, BMC out-of-band management, rack-mount form factor aur continuous operation ke liye design. PC ek user ke liye bana hai aur downtime sah leta hai. Exact features server model par depend karte hain.</p>
      <h3 style={S.h3}>Q2: BMC kya hai aur kab reachable hota hai?</h3>
      <p style={S.p}><strong>Answer:</strong> Baseboard Management Controller ek independent microcontroller hai jiska apna network port hota hai. Ye standby power par chalta hai, isliye server off ho ya OS crash ho tab bhi reachable hai — bas AC connected ho. Ye power control, virtual console, health data aur event logs deta hai.</p>
      <h3 style={S.h3}>Q3: 42U rack mein kitne servers aate hain?</h3>
      <p style={S.p}><strong>Answer:</strong> Depend karta hai. Rack ka power, cooling capacity, weight, network ports, cabling aur ek feed ke andar redundancy rakhne ki zaroorat — sab count limit karte hain. Aksar power pehli limit hoti hai. 42U sirf jagah hai.</p>
      <h3 style={S.h3}>Q4: A/B redundant power example ke saath samjhao.</h3>
      <p style={S.p}><strong>Answer:</strong> PSU 1 PDU A par aur PSU 2 PDU B par jata hai, jo independent upstream paths se fed hote hain. Ek path fail ya maintenance mein ho to doosra server chalaye rakhta hai. Isse kaam karne ke liye total load ek feed ki capacity ke andar hona chahiye — jaise do 32 A / 230 V feeds ke saath rack ko lagbhag 5.9 kVA se neeche rakho.</p>
      <h3 style={S.h3}>Q5: Server par amber LED dikh rahi hai. Kya karoge?</h3>
      <p style={S.p}><strong>Answer:</strong> Pehchano kaun sa server aur LED ka matlab kya hai. BMC event log aur sensors dekho. Event ko physical check se match karo — PSU, fan, drive, DIMM. Recent changes dekho. Applicable ho to sahi hot-swap part se fix karo, alert clear hone ko confirm karo aur ticket mein record karo.</p>
      <h3 style={S.h3}>Q6: Blanking panels kyun important hain?</h3>
      <p style={S.p}><strong>Answer:</strong> Ye khaali rack units se garam exhaust hawa ko cold side par recirculate hone se rokte hain. Inke bina server inlet temperature badhta hai, fans zyada mehnat karte hain, efficiency girti hai aur servers throttle ya shutdown kar sakte hain.</p>
      <h3 style={S.h3}>Q7: Server ki "nameplate power" aur real draw mein kya farak hai?</h3>
      <p style={S.p}><strong>Answer:</strong> Nameplate PSU ya system ki maximum rating hai. Real draw asli load par depend karta hai aur aksar kaafi kam hota hai. BMC/PDU ki measured values se plan karo, margin rakho, aur exact configuration ke liye vendor ka power calculator use karo.</p>
      <h3 style={S.h3}>Q8: Production mein server firmware safely kaise update karte ho?</h3>
      <p style={S.p}><strong>Answer:</strong> Release notes aur compatibility matrix padho, non-production server par test karo, configuration backup lo, rollback plan rakho, approved window mein chhote batches mein update karo, flash kabhi interrupt mat karo, aur har batch ke baad health verify karo.</p>

      {/* ══════════ 27. KEY TAKEAWAYS ══════════ */}
      <h2 id="key-takeaways" style={S.h2}>Key Takeaways</h2>
      <ul style={S.ul}>
        <li>Server continuous operation ke liye bana hai — ECC RAM, redundant PSU, hot-swap parts aur BMC.</li>
        <li>1U = 1.75 inch (44.45 mm). U height naapta hai, performance nahi.</li>
        <li>42U rack apne aap 42 servers nahi rakh sakta — power aksar pehli limit hai, phir cooling, weight aur cabling.</li>
        <li>Asli A/B redundancy ke liye ek feed poora rack utha sake. Dono feeds ko high levels par load mat karo.</li>
        <li>Hamesha PSU 1 ko feed A aur PSU 2 ko feed B se jodo, aur har cable ke dono ends par label lagao.</li>
        <li>Achhe airflow ke liye blanking panels aur consistent front-to-back orientation mandatory hain.</li>
        <li>BMC standby power par chalta hai aur dead ya remote server ki khidki hai — ise isolated aur secured rakho.</li>
        <li>Tier ratings site ko describe karte hain; independent paths par dual-corded servers design ko kaam karwate hain.</li>
        <li>Testing ke saath commission karo, monitoring ke saath operate karo, staged firmware updates se maintain karo aur sab document karo.</li>
        <li>Safety pehle: saare power sources disconnect karo, ESD protection use karo, sahi tarike se uthao aur permit-to-work rules follow karo.</li>
        <li>Actual implementation project requirements, utility requirements, OEM design aur data center architecture par depend karti hai — hamesha vendor documentation se verify karo.</li>
      </ul>

      {/* FAQ — excluded from TOC */}
      <h2 style={{ ...S.h2, marginTop: "3rem" }}>Frequently Asked Questions</h2>
      {faqs.map((item, i) => (
        <div key={i} style={{ marginBottom: "1.5rem", paddingBottom: "1.5rem", borderBottom: i < faqs.length - 1 ? "1px solid #e5e7eb" : "none" }}>
          <p style={{ ...S.p, fontWeight: 700, marginBottom: "0.4rem" }}>{item.q}</p>
          <p style={{ ...S.p, marginBottom: 0 }}>{item.a}</p>
        </div>
      ))}

      <h2 style={{ ...S.h2, marginTop: "3rem" }}>Related Topics</h2>
      <ul style={S.ul}>
        <li><TopicLink slug="cpu" variant="inline" /> — Server ka compute engine — architecture, NUMA, selection.</li>
        <li><TopicLink slug="ram" variant="inline" /> — ECC, channels, DIMM population, memory troubleshooting.</li>
        <li><TopicLink slug="gpu" variant="inline" /> — Servers mein AI/HPC accelerators.</li>
        <li><TopicLink slug="blade-server" variant="inline" /> — High-density shared-chassis compute.</li>
        <li><TopicLink slug="virtualization" variant="inline" /> — Ek physical server par kai VMs.</li>
        <li><TopicLink slug="pdu" variant="inline" /> — Servers ke liye rack power distribution.</li>
      </ul>
    </>
  );
}
