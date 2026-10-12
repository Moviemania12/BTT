"use client";
import { S, Callout, ComparisonTable, Figure, CodeBlock, DiagramGuide } from "@/app/learn/it/servers/virtualization/shared";
import TopicLink from "@/components/TopicLink";
import HypervisorTypes from "@/app/learn/it/servers/virtualization/svg/HypervisorTypes";
import VirtualisationStack from "@/app/learn/it/servers/virtualization/svg/VirtualisationStack";
import VmArchitecture from "@/app/learn/it/servers/virtualization/svg/VmArchitecture";
import VcpuScheduling from "@/app/learn/it/servers/virtualization/svg/VcpuScheduling";
import MemoryOvercommitLadder from "@/app/learn/it/servers/virtualization/svg/MemoryOvercommitLadder";
import VirtualStoragePath from "@/app/learn/it/servers/virtualization/svg/VirtualStoragePath";
import VirtualNetworking from "@/app/learn/it/servers/virtualization/svg/VirtualNetworking";
import LiveMigrationSteps from "@/app/learn/it/servers/virtualization/svg/LiveMigrationSteps";
import VmClusterHa from "@/app/learn/it/servers/virtualization/svg/VmClusterHa";
import VirtTroubleshootFlow from "@/app/learn/it/servers/virtualization/svg/VirtTroubleshootFlow";
import { faqs } from "../metadata";

export default function Content() {
  return (
    <>
      {/* Quick Summary */}
      <div style={{ background: "#f0fdf4", border: "1px solid #bbf7d0", borderRadius: 10, padding: "1.2rem 1.4rem", marginBottom: "2rem" }}>
        <p style={{ fontWeight: 700, color: "#14532d", marginBottom: "0.6rem", fontSize: "1rem" }}>📋 Quick Summary — Virtualisation 2 minute mein</p>
        <ul style={{ ...S.ul, marginBottom: 0 }}>
          <li><strong>Kya hai:</strong> Ek physical server par kai virtual server (VM) chalana. Har VM ko lagta hai uska apna hardware hai; hypervisor asli CPU, RAM, storage aur network ko share aur isolate karta hai.</li>
          <li><strong>Hypervisor:</strong> Type 1 (ESXi, Hyper-V, KVM, Xen) seedha hardware par chalta hai — data center ka standard. Type 2 (VirtualBox, Workstation) host OS par chalta hai — laptop aur lab ke liye.</li>
          <li><strong>Hardware assist:</strong> Intel VT-x / AMD-V, EPT/NPT aur VT-d/IOMMU virtualisation ko fast banate hain. BIOS mein enable hona zaroori hai.</li>
          <li><strong>CPU:</strong> vCPU physical core ke liye line mein lagte hain. CPU ready time dekho, VM ko right-size karo aur NUMA node ke andar rakho.</li>
          <li><strong>Memory:</strong> Overcommit ek seedhi chadhti hai — ballooning, compression, phir swapping. Production ko seedhi ke top par rakho.</li>
          <li><strong>Storage aur network:</strong> Datastore shared pool hote hain; virtual switch VLAN aur 2 uplinks use karta hai. Har layer par latency naapo.</li>
          <li><strong>Snapshot backup nahi hai.</strong> Wo usi storage par rehta hai aur time ke saath VM ko slow karta hai.</li>
          <li><strong>HA aur live migration:</strong> HA host fail hone par VM restart karta hai; live migration chalti VM ko move karta hai. Dono ko spare capacity aur sahi network, storage, CPU compatibility chahiye.</li>
          <li><strong>Capacity:</strong> N+1 host failure ke hisaab se size karo; critical VM ko anti-affinity se alag host, rack aur chassis par failao.</li>
          <li><strong>Golden rule:</strong> Virtualisation hardware chhupata hai, physics nahi — har VM ko asli power, cooling, network aur storage chahiye.</li>
        </ul>
      </div>

      {/* ══════════ 1. WHY ══════════ */}
      <h2 id="why-virtualisation" style={S.h2}>Why Virtualisation?</h2>
      <p style={S.p}>Virtualisation se pehle ek application matlab ek physical server. 100 applications matlab 100 servers. Zyadatar apne CPU ka sirf 5–15% use karte the — baaki 85–95% idle padha rehta tha.</p>
      <p style={S.p}>Matlab hardware, power, jagah aur cooling ki barbaadi. Aur har naye application ke liye hafton ki procurement alag.</p>
      <p style={S.p}>Virtualisation ne ye theek kiya. Ek powerful server par kai VM chalao. Utilisation badhta hai, provisioning minutes mein hoti hai, VM ek-doosre se isolated rehte hain aur maintenance aasaan ho jaata hai.</p>
      <ComparisonTable
        title="Physical-Only vs Virtualised Data Center"
        headers={["Area", "Ek app = ek physical server", "Virtualised"]}
        rows={[
          ["Hardware utilisation", "Aksar 5–15%", "Aam taur par 40–70% (target policy par depend)"],
          ["Provisioning time", "Din se hafte", "Minutes (template se)"],
          ["Power aur cooling", "Har app ke liye poora server", "Same workload ke liye kam servers"],
          ["Failure recovery", "Server rebuild / restore", "HA doosre host par VM restart karta hai"],
          ["Maintenance", "Har server ka downtime", "VM live-migrate karo, host patch karo, app downtime nahi"],
          ["Isolation", "Physical", "Hypervisor se enforce"],
          ["Cost", "Hardware heavy", "Kam servers, par hypervisor licence aur management"],
        ]}
        caption="General pattern. Actual numbers workload mix, policy aur platform par depend karte hain."
      />
      <p style={S.p}>Aaj modern data center mein virtualisation default hai. Bare metal sirf wahan rakha jaata hai jahan chhota overhead bhi nahi chalta — kuch HPC, bahut latency-sensitive database, ya GPU-heavy AI nodes (dekho <TopicLink slug="gpu" variant="inline" />).</p>
      <p style={S.p}>Neeche ka physical host ek normal server hi hai — zarurat ho to pehle <TopicLink slug="server-basics" variant="inline" />, <TopicLink slug="cpu" variant="inline" /> aur <TopicLink slug="ram" variant="inline" /> padho. VM host karne wala high-density chassis: <TopicLink slug="blade-server" variant="inline" />.</p>

      {/* ══════════ 2. HYPERVISOR TYPES ══════════ */}
      <h2 id="hypervisor-types" style={S.h2}>Hypervisor — Type 1 and Type 2</h2>
      <p style={S.p}>Hypervisor (Virtual Machine Monitor) physical hardware aur VM ke beech ki software layer hai. Ye CPU, RAM, storage aur network ko abstract karta hai, har VM ko virtual hardware dikhata hai, resources schedule karta hai aur isolation enforce karta hai.</p>
      <Figure caption="Fig 1 — Type 1 bare-metal hypervisor (seedha hardware par) vs Type 2 hosted hypervisor (host OS par process ki tarah). KVM note included."><HypervisorTypes /></Figure>
      <DiagramGuide
        title="Fig 1 ko kaise padhein"
        steps={[
          "Left stack (Type 1): neeche se upar — physical hardware, uske upar seedha hypervisor, phir VMs. Beech mein koi general-purpose OS nahi, isliye overhead kam.",
          "Right stack (Type 2): hardware, phir normal host OS (Windows, Linux, macOS), phir hypervisor ek aam application ki tarah, phir VMs. Har VM request host OS se guzarti hai — extra layer, extra overhead.",
          "KVM note confusion door karta hai: KVM ek Linux kernel module hai jo Linux kernel ko hi Type 1 hypervisor bana deta hai. Ye Type 2 nahi hai.",
          "Takeaway: data center Type 1 use karte hain performance, density aur manageability ke liye. Type 2 developer laptop, lab aur demo ke liye hai.",
        ]}
      />
      <Callout type="important" title="KVM Architecture — Sahi Samajh">
        KVM (Kernel-based Virtual Machine) ek Linux kernel module hai jo Linux kernel ko Type 1 hypervisor bana deta hai. KVM Type 2 nahi hai — ye kernel ka hissa ban jaata hai aur hardware ko seedha access karta hai. Device emulation ke liye aam taur par QEMU saath use hota hai. KVM production mein bahut use hota hai — OpenStack, kai cloud providers.
      </Callout>
      <p style={S.p}><strong>Microsoft Hyper-V</strong> bhi Type 1 hai. Hyper-V role enable hone ke baad hypervisor seedha hardware par chalta hai aur Windows ek privileged VM (parent partition) ban jaata hai. Ye Type 2 nahi hai.</p>

      {/* ══════════ 3. HOW IT WORKS ══════════ */}
      <h2 id="how-virtualisation-works" style={S.h2}>How Virtualisation Works — CPU, Memory and I/O</h2>
      <p style={S.p}>OS ko ye yakeen dilane ke liye ki machine uski apni hai, hypervisor ko teen cheezein sambhalni padti hain: CPU, memory aur I/O devices. Modern CPU mein iske liye special hardware hota hai jo ye sasta bana deta hai.</p>
      <Figure caption="Fig 2 — Hardware-assisted virtualisation: (1) guest code natively chalta hai, privileged operation par VM exit hypervisor tak jaata hai; (2) memory ka translation CPU khud do level mein karta hai (EPT/NPT); (3) I/O emulated device, paravirtual driver ya direct passthrough se."><VirtualisationStack /></Figure>
      <DiagramGuide
        title="Fig 2 ko kaise padhein"
        steps={[
          "Left panel — CPU: guest OS aur uski applications processor par seedha native speed se chalti hain. Sirf sensitive operations (jaise hardware register chhoona) allow nahi ho sakte, isliye CPU VM exit (red arrow) trigger karta hai aur control hypervisor ke paas jaata hai.",
          "Hypervisor operation sambhalta hai, phir VM entry (green arrow) se guest ko wapas bhejta hai. VT-x (Intel) aur AMD-V is switch ko sasta banate hain. Jis workload mein bahut zyada exits hon, wo slow lagta hai.",
          "Middle panel — memory: application guest virtual address use karti hai, guest OS use guest physical address se map karta hai, aur hypervisor ki table use asli host physical address se map karti hai. Hardware (Intel par EPT, AMD par NPT) dono tables khud walk karta hai.",
          "Right panel — I/O: teen options slow se fast. Emulated device (compatible par slow), paravirtual driver jaise virtio ya VMXNET (guest ko pata hai ki wo virtual hai, fast), aur passthrough ya SR-IOV (VM IOMMU ke through asli device se baat karti hai, near-native speed par kam flexible).",
          "Bottom box: practical checklist — BIOS mein VT-x/AMD-V, EPT/NPT, VT-d/IOMMU enable karo, guest tools install karo, aur passthrough VM ke liye HA ka dhyan se plan karo.",
        ]}
      />
      <p style={S.p}><strong>CPU virtualisation:</strong> Hardware support se pehle hypervisor ko privileged instructions software mein rewrite ya trap karni padti thi — slow aur complicated. VT-x/AMD-V ke saath CPU ka special guest mode hota hai, isliye zyadatar code seedha chalta hai.</p>
      <p style={S.p}><strong>Memory virtualisation:</strong> EPT/NPT ke bina hypervisor ko software mein "shadow" page tables maintain karni padti thi. Ab hardware do-level translation karta hai. Huge pages (2 MB / 1 GB) cost aur kam karte hain aur database mein popular hain.</p>
      <p style={S.p}><strong>I/O virtualisation:</strong> Asli devices ko aasaani se share nahi kar sakte. Isliye hypervisor unhe emulate karta hai, paravirtual version deta hai, ya device (ya uska slice) seedha ek VM ko de deta hai. Passthrough section aage hai.</p>
      <Callout type="best-practice" title="Guest tools aur paravirtual drivers install karo">
        VMware Tools, Hyper-V Integration Services aur virtio drivers optional extra nahi hain. Inse efficient network aur disk driver, time sync, graceful shutdown aur balloon driver milte hain. Inke bina VM slow aur manage karna mushkil.
      </Callout>

      {/* ══════════ 4. VM ARCHITECTURE ══════════ */}
      <h2 id="vm-architecture" style={S.h2}>VM Architecture</h2>
      <Figure caption="Fig 3 — VM architecture: hypervisor wala physical host, teen VM jinme vCPU, vRAM, vDisk aur vNIC dikhaye gaye hain. Values illustrative."><VmArchitecture /></Figure>
      <DiagramGuide
        title="Fig 3 ko kaise padhein"
        steps={[
          "Sabse neeche ka block physical server hai: asli CPU, RAM, storage connection aur NIC.",
          "Uske upar hypervisor layer in asli resources ko virtual resources mein badalti hai.",
          "Har VM box mein wo chaar virtual devices dikhte hain jo har VM ko milte hain: vCPU, vRAM, vDisk aur vNIC. VM banate waqt yahi numbers aap choose karte ho.",
          "Dhyan do ki VM alag-alag size ke hain — VM host ka ek slice hi hai. Sab VM slices ka jod physical total se zyada ho sakta hai (overcommit) — aage aayega.",
        ]}
      />
      <p style={S.p}><strong>vCPU (Virtual CPU):</strong> VM ko virtual cores milte hain. Hypervisor har vCPU ko physical thread par schedule karta hai. 4 vCPU wali VM ke liye hypervisor ko 4 threads dhoondhne padte hain. NUMA topology ka dhyan rakhne se performance behtar hoti hai.</p>
      <p style={S.p}><strong>vRAM (Virtual RAM):</strong> VM ko assign memory, jo host RAM se backed hoti hai. Ye poori reserve hoti hai ya nahi, hypervisor settings par depend karta hai — reservation, limit, ballooning aur swapping alag se configure hote hain. Default mein poori vRAM physically reserve nahi hoti; hypervisor use dynamically manage karta hai.</p>
      <p style={S.p}><strong>vDisk (Virtual Disk):</strong> Ek file ya block device: VMDK (VMware), VHD/VHDX (Hyper-V), QCOW2 (KVM) ya raw. VM ko ye normal disk lagti hai. Thin provisioning use hone par space allocate karti hai; thick provisioning sab pehle se reserve karti hai.</p>
      <p style={S.p}><strong>vNIC (Virtual NIC):</strong> Virtual switch se judta hai aur normal network card jaisa dikhta hai. Ek VM mein alag VLAN ke liye kai vNIC ho sakte hain.</p>
      <p style={S.p}><strong>Baaki virtual hardware:</strong> virtual CD-ROM, serial, USB, TPM (vTPM), GPU (vGPU) aur virtual BIOS/UEFI. "VM hardware version" tay karti hai ki VM ko kaun se features dikhenge — upgrade sirf plan ke saath karo, kyunki purane hosts naye version nahi chala sakte.</p>

      {/* ══════════ 5. VCPU SCHEDULING ══════════ */}
      <h2 id="vcpu-scheduling" style={S.h2}>vCPU Scheduling, CPU Ready and NUMA</h2>
      <Figure caption="Fig 4 — vCPU scheduling: chhe vCPU chaar physical cores ko time slices mein share karte hain. Free core ka intezaar karta vCPU CPU ready time jama karta hai. Illustrative schedule."><VcpuScheduling /></Figure>
      <DiagramGuide
        title="Fig 4 ko kaise padhein"
        steps={[
          "Har row ek physical core hai; har coloured block wo vCPU hai jo us time slice mein core ka maalik hai. Time left se right chalta hai.",
          "6 vCPU (alag colour) hain par core sirf 4, isliye kisi bhi pal 2 vCPU intezaar mein hain. Ek hi colour ka vCPU rows ke beech ghoomta hai — hypervisor use kahin bhi move kar sakta hai.",
          "Red panel CPU ready time samjhata hai: wo time jab vCPU chalna chahta tha par free core nahi tha. Ye guest ke andar nahi dikhta — guest 'low CPU' dikha sakta hai jabki application slow ho.",
          "Yellow box design lessons deta hai: overcommit tabhi chalta hai jab VM ek saath peak par na jaayein, bade VM ko zyada intezaar karna padta hai, VM ko ek NUMA node ke andar rakho, aur hyperthread poora core nahi hota.",
        ]}
      />
      <p style={S.p}><strong>CPU ready time:</strong> Virtualisation ka sabse important CPU metric. High ready time ka matlab host overcommitted hai ya kuch VM bahut bade hain. Kai teams tab investigate karti hain jab ready per vCPU kuch percent se upar jaaye — thresholds platform aur workload par depend karte hain, isliye apna baseline banao.</p>
      <p style={S.p}><strong>Right-sizing:</strong> 16 vCPU wali VM jo sirf 2 use kare, 4 vCPU wali VM se buri hai. Badi VM ko ek saath kai free cores chahiye, isliye wo zyada wait karti hai. Chhota shuru karo aur evidence par badhao.</p>
      <p style={S.p}><strong>NUMA aur vNUMA:</strong> Modern server mein kai CPU sockets hote hain, har ek ki apni local memory — dekho <TopicLink slug="cpu" variant="inline" />. Jo VM sockets ke beech phaili ho, wo remote memory access karke slow ho jaati hai. Jahan ho sake VM ko ek NUMA node ke andar size karo, aur badi VM ko hypervisor se vNUMA present karne do.</p>
      <p style={S.p}><strong>Hyperthreading:</strong> Do threads ek core ke execution units share karte hain. Planning mein hyperthread ko poora core nahi, ek hissa maano.</p>
      <CodeBlock lang="bash" label="Linux KVM host — CPU aur NUMA layout ek nazar mein">
{`lscpu | grep -E "Model name|Socket|Thread|NUMA"
numactl --hardware
virsh vcpuinfo <vm-name>         # har vCPU kahan chal raha hai
virsh numatune <vm-name>         # VM ki NUMA memory policy`}
      </CodeBlock>

      {/* ══════════ 6. RESOURCE ALLOCATION ══════════ */}
      <h2 id="resource-allocation" style={S.h2}>Resource Allocation and Overcommit</h2>
      <p style={S.p}><strong>CPU overcommit:</strong> Physical threads se zyada vCPU assign karna. Ye isliye chalta hai kyunki sab VM ek saath peak nahi karte. Risk: ek saath heavy load se ready time badhta hai aur VM slow ho jaati hain. Sahi ratio workload mix par depend karta hai — monitor aur baseline karo.</p>
      <ComparisonTable
        title="Typical Resource Controls (naam platform ke hisaab se badalte hain)"
        headers={["Control", "Kya karta hai", "Kab use karo"]}
        rows={[
          ["Shares / weight", "Contention mein relative priority", "Production ko test se zyada do"],
          ["Reservation", "Guaranteed minimum CPU ya RAM", "Critical VM, latency-sensitive apps"],
          ["Limit", "Use par hard cap", "Kam hi — guest behaviour bigad sakta hai; right-sizing behtar"],
          ["Resource pool", "VMs ka group jo shares/reservation ka pool share karta hai", "Departments, tenants, environments"],
          ["CPU / NUMA pinning", "vCPU ko cores ya NUMA node par fix karna", "Latency-critical, telco, HPC"],
          ["Storage QoS / IOPS limit", "Disk I/O cap ya guarantee", "Noisy-neighbour control"],
        ]}
        caption="Reservation kam use karo: har reservation cluster ki overcommit capacity aur HA ke restart capacity ko ghatati hai."
      />
      <p style={S.p}><strong>Storage thin provisioning:</strong> 500 GB vDisk assign karo par sirf use hua space allocate ho. Efficient hai — par kul promised space asli capacity se zyada ho sakta hai. Datastore bharne par VM pause ya crash ho sakti hai. Datastore usage monitor karo aur alert lagao.</p>
      <Callout type="warning" title="Overcommit ek tool hai, free lunch nahi">
        CPU overcommit dheere-dheere bigadta hai (VM slow). Memory aur storage overcommit achanak fail ho sakta hai (swapping, paused VM). Har resource ko alag tareeke se treat karo aur production par conservative ratio rakho.
      </Callout>

      {/* ══════════ 7. MEMORY ══════════ */}
      <h2 id="memory-management" style={S.h2}>Memory Management — Ballooning, Compression, Swap</h2>
      <Figure caption="Fig 5 — Memory overcommit ladder: host RAM khatam hone par hypervisor page sharing aur large pages se ballooning, compression, hypervisor swapping aur aakhir mein outage tak jaata hai. Har step pichle se mehenga."><MemoryOvercommitLadder /></Figure>
      <DiagramGuide
        title="Fig 5 ko kaise padhein"
        steps={[
          "Upar (green) se neeche (red) padho. Har box ek stage hai jisse host guzarta hai jaise free memory girti hai. Right wala text VMs par asar batata hai.",
          "Stage 1: bahut memory — kuch dikhai nahi deta. Stage 2: ballooning — har VM ke andar ka driver guest se wo pages wapas maangta hai jo wo use nahi kar raha. Kya chhodna hai ye guest OS chunta hai, isliye asar kam.",
          "Stage 3: compression — hypervisor thande pages ko disk par bhejne ki jagah RAM mein compress karta hai. CPU lagta hai, par disk se bahut fast.",
          "Stage 4: hypervisor swapping — VM memory disk ke swap file mein likhi jaati hai. Disk RAM se sau-hazaar guna slow hai, isliye VM rengti hain.",
          "Stage 5: koi option nahi bacha — VM freeze ya kill. Production ko stage 1 par rakhne ka target rakho; baaki stages sirf chhote safety net ke liye.",
        ]}
      />
      <ul style={S.ul}>
        <li><strong>Memory ballooning:</strong> Guest ka driver (guest tools ke saath install) VM ke andar inflate hokar guest OS par pressure daalta hai ki wo unused pages chhod de, aur RAM host ko wapas mile.</li>
        <li><strong>Memory compression:</strong> Kam use hone wale pages ko RAM mein compress karta hai — swapping se sasta.</li>
        <li><strong>Hypervisor swapping:</strong> Aakhri raasta. VM memory host ke datastore par swap file mein jaati hai. Production mein bachao.</li>
        <li><strong>Transparent page sharing:</strong> VMs ke identical memory pages deduplicate hote hain. Security concerns ke baad kai platforms ise default mein restrict karte hain.</li>
        <li><strong>Large pages:</strong> Performance badhate hain, par sharing kam karte hain aur memory pressure hatana mushkil ho sakta hai.</li>
      </ul>
      <Callout type="warning" title="Memory Overcommit — Production Risk">
        Production mein memory overcommit ehtiyaat se use karo, ya mat karo. Swapping shuru hote hi VM performance gir jaati hai. Physical RAM VM memory ke jod plus hypervisor overhead ke hisaab se rakho, N+1 host headroom ke saath. Balloon activity aur host memory pressure par nazar rakho.
      </Callout>
      <p style={S.p}>Server memory ka behaviour <TopicLink slug="ram" variant="inline" /> mein hai: hypervisor ke neeche bhi ECC, NUMA aur channels matter karte hain.</p>

      {/* ══════════ 8. LIFECYCLE ══════════ */}
      <h2 id="vm-lifecycle" style={S.h2}>VM Lifecycle</h2>
      <ComparisonTable
        title="VM Lifecycle Stages"
        headers={["Stage", "Kya hota hai", "Aam galti"]}
        rows={[
          ["Request / design", "Size, network, storage, backup, owner, expiry tay karo", "Owner aur purpose record nahi"],
          ["Create", "Wizard, template ya automation se nayi VM — vCPU, vRAM, vDisk, network, OS type", "'Just in case' ke naam par oversized"],
          ["Provision", "OS install (ISO/PXE) ya image deploy; guest tools; patch; domain join", "Guest tools skip karna"],
          ["Run", "Power on; workload deploy; monitoring aur backup add", "Backup / monitoring mein add nahi kiya"],
          ["Maintain", "OS patch, VM hardware version upgrade, snapshot hygiene", "Snapshots hafton chhod dena"],
          ["Migrate", "Live migration, storage migration, cross-cluster move", "Compatibility aur network rules ignore karna"],
          ["Decommission", "Backup/retention confirm, shutdown, VM aur disks delete, DNS/IPAM/CMDB/monitoring se hatao", "VM sprawl — band VMs bhula di gayi"],
        ]}
        caption="Lifecycle discipline VM sprawl rokta hai — CPU, RAM, storage aur licence ki chupi hui barbaadi."
      />
      <p style={S.p}><strong>VM sprawl:</strong> VM banana aasaan hai, isliye ye badhti jaati hain. Purani test VM storage, backup space aur licence khati rehti hain. Naming standard, owner tag, expiry date aur periodic cleanup use karo.</p>

      {/* ══════════ 9. TEMPLATES ══════════ */}
      <h2 id="templates-cloning" style={S.h2}>Templates, Cloning and Images</h2>
      <p style={S.p}><strong>Templates (golden images):</strong> Pehle se configured, patched OS image. Nayi VM isi se deploy hoti hai — fast aur consistent. Template update karo to aage ki saari deployments update. Kam templates rakho, version karo aur regularly re-patch karo.</p>
      <p style={S.p}><strong>Cloning:</strong> VM ki exact copy. Full clone independent hota hai. Linked clone base ke disk blocks share karta hai — space bachata hai par base par depend karta hai. Clone ke baad customise karo (sysprep ya Linux equivalent) taaki hostname, IP aur machine identity unique ho.</p>
      <p style={S.p}><strong>Cloud-init aur automation:</strong> Linux aur cloud platforms par cloud-init pehle boot par hostname, keys aur network inject karta hai. Terraform, Ansible aur vendor APIs jaise infrastructure-as-code tools console mein click karne ki jagah VM repeatably banate hain.</p>
      <Callout type="best-practice" title="Template ko production code ki tarah treat karo">
        Purane password, unpatched OS ya leftover agent config wala template sainkdon baar copy hoga. Har template ko review, scan aur version karo.
      </Callout>

      {/* ══════════ 10. STORAGE ══════════ */}
      <h2 id="storage-datastores" style={S.h2}>Storage and Datastores</h2>
      <Figure caption="Fig 6 — Virtual disk I/O path: guest application → guest file system → virtual disk controller → hypervisor storage stack → host HBA/NIC → storage network → array → LUN/volume → datastore. Latency kai layers par naapi ja sakti hai."><VirtualStoragePath /></Figure>
      <DiagramGuide
        title="Fig 6 ko kaise padhein"
        steps={[
          "Top row left se right: request guest application se shuru hoti hai, guest file system aur driver se guzarti hai, phir virtual disk controller (paravirtual jaise PVSCSI, virtio-scsi ya NVMe) tak.",
          "Aage hypervisor ka storage stack — queues, multipathing aur VMDK/VHDX/QCOW2 file handling — phir host ka HBA ya NIC (FC, iSCSI, NFS ya NVMe-oF).",
          "Right side par request storage network se array ke controllers, cache aur disks tak jaati hai, jo LUN, volume ya share present karte hain.",
          "Bottom row us LUN/volume par bana datastore dikhati hai, jahan kai VM disks saath rehti hain.",
          "Red box latency samjhata hai: guest ko jo dikhta hai = hypervisor-kernel ka hissa + device (array) ka hissa. Isse pata chalta hai ki host queue dekhni hai ya array aur fabric.",
          "Neeche ke pointers: thin disks aur snapshots datastore bhar sakte hain, noisy neighbour IOPS kha jaate hain, aur dual paths storage ke liye wahi hain jo dual power feeds power ke liye.",
        ]}
      />
      <ComparisonTable
        title="Datastore Types"
        headers={["Type", "Kaise kaam karta hai", "Kiske liye achha", "Dhyan rakho"]}
        rows={[
          ["Block datastore (FC / iSCSI / NVMe-oF LUN)", "Host LUN ko cluster file system (VMFS, CSV, etc.) mein format karta hai", "Traditional enterprise arrays", "Zoning, multipath, queue depth, LUN size"],
          ["NFS / SMB datastore", "VM files file share par", "Simple management, file-level access", "Network design, locking, latency"],
          ["Hyper-converged / vSAN-style", "Hosts ki local disks pool hokar shared storage", "Scale-out, alag array nahi", "Network quality, failure-tolerance policy, rebuild traffic"],
          ["Local disk", "Host ke andar ki disks", "Edge, lab, scratch", "Shared storage nahi → HA / migration limited"],
        ]}
        caption="Choice platform, performance, skills aur budget par depend. SAN, NAS aur DAS articles dekho."
      />
      <p style={S.p}><strong>Thin vs thick disks:</strong> Thick space reserve karti hai aur predictable performance deti hai. Thin space bachati hai par monitoring maangti hai. Jo bhi use karo, datastore alert 70–80% par lagao aur expansion jaldi plan karo.</p>
      <p style={S.p}><strong>Performance:</strong> IOPS, throughput aur latency teeno matter karte hain. Database VM ko low latency chahiye; backup VM ko throughput. Alag workloads ko sahi tier (flash vs capacity) par rakho.</p>
      <p style={S.p}>Storage background: <TopicLink slug="san" variant="inline" />, <TopicLink slug="nas" variant="inline" />, <TopicLink slug="das" variant="inline" />.</p>

      {/* ══════════ 11. NETWORKING ══════════ */}
      <h2 id="virtual-networking" style={S.h2}>Virtual Networking</h2>
      <Figure caption="Fig 7 — Host ke andar virtual networking: VM vNIC virtual switch ke port groups se judte hain; do uplink NIC VLANs ko do top-of-rack switches tak trunk karte hain; management, live-migration aur storage traffic alag VLAN par."><VirtualNetworking /></Figure>
      <DiagramGuide
        title="Fig 7 ko kaise padhein"
        steps={[
          "Host ke andar top row: teen VM (Web, App, DB), har ek ka vNIC, aur management, live migration aur storage traffic ke liye 'host services'.",
          "Doosri row: port groups, har ek ka VLAN. VM ka vNIC port group se judta hai, jo uska VLAN aur policies tay karta hai.",
          "Yellow bar: virtual switch (standard ya distributed). Ye software mein frames switch karta hai, teaming aur security policy lagata hai aur sab kuch uplinks se jodta hai.",
          "Switch ke neeche: do uplink NIC, host ke physical ports.",
          "Blue lines do ToR switches tak jaati hain — trunk ports jo tagged VLANs le jaate hain. Do NIC do switches se = koi single NIC ya switch failure nahi.",
          "Neeche ka note: ek hi host par same VLAN mein VM-to-VM traffic host ke andar hi rehta hai — physical firewall use tab tak nahi dekhega jab tak microsegmentation na ho.",
        ]}
      />
      <p style={S.p}><strong>Virtual switch (vSwitch):</strong> Hypervisor ke andar software switch. Path: VM → vSwitch → physical NIC → physical switch.</p>
      <p style={S.p}><strong>Port groups aur VLANs:</strong> VM ko alag VLAN aur policies ke saath logical groups mein rakho. VM traffic ko management, live migration aur storage traffic se alag rakho.</p>
      <p style={S.p}><strong>NIC teaming / LACP:</strong> Redundancy aur bandwidth ke liye do ya zyada uplinks. Teaming policy physical switch se match honi chahiye (jaise LACP vs static). Mismatch se flapping aur drops hote hain.</p>
      <p style={S.p}><strong>Distributed switches:</strong> Ek virtual switch configuration jo kai hosts par centrally manage hoti hai — consistent policy aur behtar monitoring.</p>
      <p style={S.p}><strong>Overlay aur SDN:</strong> NSX ya open-source alternatives physical fabric ke upar virtual networks (VXLAN/Geneve) aur distributed firewalls banate hain. Isse microsegmentation aur fast network provisioning milti hai.</p>
      <p style={S.p}>Physical side: <TopicLink slug="switch" variant="inline" />, <TopicLink slug="firewall" variant="inline" />, <TopicLink slug="load-balancer" variant="inline" />.</p>
      <Callout type="common-mistake" title="Physical trunk par VLAN bhool jaana">
        Port group mein naya VLAN add kiya par physical switch trunk par allow nahi kiya — VM power on hogi par network nahi hoga. Virtual aur physical network hamesha saath badlo.
      </Callout>

      {/* ══════════ 12. SNAPSHOTS ══════════ */}
      <h2 id="snapshots-backups" style={S.h2}>Snapshots vs Backups</h2>
      <ComparisonTable
        title="Snapshot vs Backup — Critical Distinction"
        headers={["Aspect", "Snapshot", "Backup"]}
        rows={[
          ["Kya hai", "VM ka point-in-time state (disk, memory, settings)", "Data ki copy alag location par"],
          ["Storage location", "Wahi datastore — wahi storage device", "Alag storage, behtar ho alag location"],
          ["Purpose", "Risky change se pehle quick rollback", "Disaster recovery, long-term retention"],
          ["Storage fail ho to", "Lost (same device)", "Safe (alag location)"],
          ["Performance impact", "Time ke saath girta hai (delta disk growth)", "Chalti VM par nahi"],
          ["Application consistency", "Hamesha nahi — buffers flush na ho", "Consistency ke liye VSS/quiescing chahiye"],
          ["Kya ye backup hai?", "NAHI", "HAAN"],
        ]}
        caption="Snapshots backup NAHI hain. Production ko snapshot management ke saath proper backup solution chahiye."
      />
      <Callout type="danger" title="Snapshots Backup NAHI Hain">
        Snapshot usi datastore par rehta hai — storage fail hua to VM aur snapshot dono gaye. Lambe chalte snapshots VM performance girate hain aur delta disk badhti rehti hai. Production mein backup solution (Veeam, Commvault, Veritas, etc.) zaroori hai. Snapshot sirf planned changes ke liye temporary safety net hai.
      </Callout>
      <p style={S.p}><strong>Application consistency:</strong> Crash-consistent copy matlab power cord kheench dene jaisa; application-consistent copy in-flight writes flush karti hai (VSS ya quiescing). Database ke liye application-consistent backup lo — warna recovery fail ya data corrupt ho sakta hai.</p>
      <p style={S.p}><strong>Snapshot hygiene:</strong> Change se pehle lo, verify karke delete karo — ghanton ya dino mein, hafton nahi. Tay age se purane snapshots par alert lagao. Backups: <TopicLink slug="backup" variant="inline" />.</p>

      {/* ══════════ 13. LIVE MIGRATION ══════════ */}
      <h2 id="live-migration" style={S.h2}>Live Migration</h2>
      <p style={S.p}>Live migration chalti VM ko bina shutdown kiye ek host se doosre par le jaati hai. Applications chalti rehti hain. VMware vMotion, Hyper-V Live Migration aur KVM live migration aam implementations hain.</p>
      <Figure caption="Fig 8 — Live migration paanch steps mein: check, pre-copy memory, dirty pages ki iteration, chhota switch-over, clean-up. Memory dedicated migration network par jaati hai."><LiveMigrationSteps /></Figure>
      <DiagramGuide
        title="Fig 8 ko kaise padhein"
        steps={[
          "Top row left se right: paanch stages. Step 1 check karta hai ki destination VM chala sakta hai ya nahi — CPU features, RAM, network aur storage access.",
          "Step 2 (pre-copy): VM source par chalti rehti hai aur memory pages destination par copy hote hain. Step 3: is beech badle pages (dirty pages) phir copy hote hain; ye tab tak dohrata hai jab tak bacha hua set chhota na ho jaaye.",
          "Step 4 (switch-over): VM kuch der ke liye pause hoti hai — milliseconds se seconds — aakhri pages aur CPU state bheje jaate hain aur VM destination par resume hoti hai. Step 5: network naya location seekhta hai aur source memory free hoti hai. IP aur MAC wahi rehte hain.",
          "Middle row: source host (blue) aur destination host (green); moti arrow dedicated migration network dikhati hai.",
          "Bottom box: migration kab struggle karti hai — jab VM memory network ke copy karne se tez badalti hai, passthrough devices, CPU mismatch (compatibility mode jaise EVC chahiye), aur cross-storage migrations jo disks bhi copy karti hain.",
        ]}
      />
      <p style={S.p}><strong>Traditional requirements:</strong> Dono hosts ko accessible shared storage, compatible CPUs (ya compatibility mode), destination par enough resources aur hosts ke beech achha network.</p>
      <Callout type="important" title="Shared Storage Hamesha Mandatory Nahi">
        VMware Storage vMotion compute aur storage dono saath migrate kar sakta hai. KVM live migration storage copy ke saath local-to-local ho sakti hai. Hyper-V shared-nothing live migration bhi hai. Capabilities hypervisor version aur configuration par depend karti hain — "shared storage hamesha zaroori" sahi nahi hai. Vendor documentation verify karo.
      </Callout>
      <p style={S.p}><strong>Use cases:</strong> Host maintenance (maintenance mode VMs ko evacuate karta hai), load balancing (DRS), hardware refresh aur power-aware consolidation.</p>
      <CodeBlock lang="bash" label="KVM/libvirt — VM live migrate karna (example pattern)">
{`virsh migrate --live --persistent <vm-name> qemu+ssh://<dest-host>/system
# disks local hon to --copy-storage-all lagao (slower, network par heavy)
# progress dekhne ke liye:  virsh domjobinfo <vm-name>`}
      </CodeBlock>

      {/* ══════════ 14. HA ══════════ */}
      <h2 id="ha-clusters" style={S.h2}>HA and Cluster Architecture</h2>
      <Figure caption="Fig 9 — VM cluster HA: Host 1 fail hota hai, HA failure detect karke VM A, B aur C ko bache hue Host 2 aur 3 par restart karta hai. Shared storage VM disks ka access deta hai."><VmClusterHa /></Figure>
      <DiagramGuide
        title="Fig 9 ko kaise padhein"
        steps={[
          "Teen hosts ek cluster banate hain. Har host kuch VM chalata hai. Sab hosts neeche ka same shared storage dekhte hain.",
          "Host 1 fail hota hai (kata hua dikhaya gaya). Uski VM A, B aur C ruk jaati hain kyunki wo usi host par chal rahi thi.",
          "Cluster missing heartbeats se failure detect karta hai aur VM A, B, C ko Host 2 aur 3 par restart karta hai. Ye ho sakta hai kyunki wo shared storage par wahi VM disks padh sakte hain.",
          "Important baat: ye restart hai, continuation nahi. Guest OS dobara boot hone tak application outage dekhti hai — VM aur application ke hisaab se seconds se minutes.",
          "Capacity lesson: Host 2 aur 3 ke paas restart hui VM ke liye spare CPU aur RAM honi chahiye — admission control yahi reserve karta hai.",
        ]}
      />
      <p style={S.p}><strong>Cluster:</strong> Kai hosts ek pool ki tarah manage hote hain, aur HA, DRS aur live migration jaise features share karte hain. Hosts management network aur storage par heartbeat se ek-doosre ko check karte hain.</p>
      <p style={S.p}><strong>HA:</strong> Host fail → cluster detect karta hai → VM bache hosts par restart. Recovery time VM boot aur application start par depend. Koi universal fixed time sahi nahi hai.</p>
      <p style={S.p}><strong>Admission control:</strong> Capacity reserve karta hai taaki N hosts fail hon to bache hosts sab protected VM chala saken. Apni zarurat ke hisaab se failure tolerance set karo (1 host, 2 hosts ya percentage).</p>
      <p style={S.p}><strong>Split-brain aur isolation:</strong> Agar host management network kho de par storage dekhta rahe, to cluster ko tay karna hota hai ki uski VMs ko kahin aur restart kare ya nahi. Datastore heartbeating, isolation responses aur sahi network redundancy duplicate VMs rokte hain.</p>
      <p style={S.p}><strong>Fault Tolerance:</strong> VMware FT (aur similar) doosre host par lockstep shadow VM rakhta hai. Primary fail ho to shadow bina restart turant sambhal leta hai. Overhead kaafi hai, isliye sirf bahut critical VMs ke liye.</p>
      <p style={S.p}><strong>Application-level HA:</strong> Database aur middleware clusters (Always On, Patroni, Pacemaker etc.) tez failover dete hain aur guest OS failure se bhi bachate hain, jo hypervisor HA nahi dekh sakta. Critical services ke liye dono layers use karo.</p>

      {/* ══════════ 15. DRS ══════════ */}
      <h2 id="drs-affinity" style={S.h2}>DRS, Affinity and Resource Pools</h2>
      <p style={S.p}><strong>DRS (Distributed Resource Scheduler) aur similar schedulers:</strong> Cluster load dekhte hain aur hosts imbalanced hone par VM live-migrate karte hain. Nayi VM ko place bhi karte hain. Modes manual recommendations se fully automatic tak.</p>
      <ComparisonTable
        title="Placement Rules"
        headers={["Rule", "Matlab", "Example"]}
        rows={[
          ["VM-VM affinity", "VMs ko ek hi host par rakho", "App aur cache jo bahut baat karte hain"],
          ["VM-VM anti-affinity", "VMs ko alag hosts par rakho", "Database cluster ke do nodes, do domain controllers"],
          ["VM-Host affinity", "VM ko hosts ke group par pin karo", "Licence-bound VM licensed hosts par"],
          ["VM-Host anti-affinity", "VM ko kuch hosts se door rakho", "Limited network wale hosts se bachao"],
          ["Fault-domain aware", "Chassis, rack ya room ke hisaab se failao", "Blade ke liye cross-chassis placement"],
        ]}
        caption="Rules failure behaviour predictable banate hain par scheduling freedom kam karte hain; unhe regularly review karo."
      />
      <p style={S.p}>Racks, power feeds aur blade chassis (<TopicLink slug="blade-server" variant="inline" />) ke beech anti-affinity wahi tareeka hai jisse virtual layer physical failure domains ka samman karti hai.</p>
      <p style={S.p}><strong>Resource pools:</strong> VMs ko group karo taaki team ya tenant ko guaranteed share mile aur wo doosron ko bhookha na rakhe. Pools ko folder ki tarah use mat karo — nested pools mein shares ke surprising results aa sakte hain.</p>

      {/* ══════════ 16. MANAGEMENT ══════════ */}
      <h2 id="management-plane" style={S.h2}>Virtualisation Management Plane</h2>
      <p style={S.p}><strong>VMware vCenter Server:</strong> ESXi hosts, VMs, clusters aur datastores ka central management — HA, DRS, vMotion, permissions, templates. vCenter down ho to chalti VMs chalti rehti hain, par management operations (nayi VM, vMotion, kuch HA configuration) available nahi.</p>
      <p style={S.p}><strong>Microsoft SCVMM / Windows Admin Center / Failover Cluster Manager:</strong> Hyper-V environments ka management.</p>
      <p style={S.p}><strong>Proxmox, oVirt/RHV-style, OpenStack, CloudStack:</strong> KVM ke liye open-source ya open-core platforms — kai data centers inhe private cloud ke liye chalate hain.</p>
      <p style={S.p}>Management plane lifecycle, resource allocation, RBAC, monitoring, alerts aur compliance sambhalta hai. Uski availability plan karo: management servers ka HA, database/configuration ke tested backups, restricted network access aur strong authentication.</p>
      <Callout type="warning" title="Management plane ko domain controller ki tarah protect karo">
        Jo management plane control karta hai wo har VM control karta hai. MFA, alag admin accounts, management VLAN, logging aur tez patch schedule use karo.
      </Callout>

      {/* ══════════ 17. PLATFORMS ══════════ */}
      <h2 id="hypervisor-platforms" style={S.h2}>Hypervisor Platforms Compared</h2>
      <p style={S.p}>Zyadatar data centers mein inme se ek ya zyada platforms milte hain. Concepts same hain; tools, licensing aur management plane alag.</p>
      <ComparisonTable
        title="Common Platforms"
        headers={["Platform", "Type / basis", "Typical strengths", "Typical use"]}
        rows={[
          ["VMware ESXi + vCenter", "Type 1, proprietary", "Mature HA/DRS/vMotion, bada ecosystem, broad hardware aur storage support", "Enterprise aur colocation private cloud"],
          ["Microsoft Hyper-V", "Type 1, Windows-based", "Windows / Active Directory se tight integration, Failover Clustering, Storage Spaces Direct", "Windows-heavy enterprises"],
          ["KVM (+ libvirt / QEMU)", "Type 1 semantics, Linux kernel module", "Open source, flexible, zyadatar public clouds aur OpenStack ka base", "Cloud providers, Linux-centric teams"],
          ["Proxmox VE", "KVM + LXC web UI ke saath", "Low cost, built-in clustering, Ceph integration", "SMB, labs, cost-sensitive private cloud"],
          ["OpenStack / CloudStack", "KVM (ya others) ke upar cloud platform", "Self-service, multi-tenant, API driven", "Service providers, bade private clouds"],
          ["Xen / XCP-ng", "Type 1, microkernel style", "Strong isolation heritage, open source", "Hosting providers, kuch legacy clouds"],
          ["Nutanix AHV", "KVM-based, HCI", "Integrated compute + storage, simple management", "HCI deployments"],
        ]}
        caption="Platform choice existing skills, licensing, ecosystem aur support se tay hota hai — sirf features se nahi."
      />
      <Callout type="warning" title="Licensing aur packaging aksar badalte hain">
        Vendors products ke naam, editions aur licensing models regularly badalte rehte hain. Kisi bhi comparison ko starting point maano, aur platform choose karne se pehle current vendor documentation aur contracts check karo.
      </Callout>
      <p style={S.p}><strong>Hyperscalers:</strong> Public clouds (<TopicLink slug="aws" variant="inline" />, <TopicLink slug="azure" variant="inline" />, <TopicLink slug="gcp" variant="inline" />) apne hardware par customised hypervisors chalate hain aur VM ko instance ki tarah dete hain. Yahan seekhe concepts — vCPU, overcommit, live migration — wahan bhi lagte hain.</p>

      {/* ══════════ 18. PASSTHROUGH ══════════ */}
      <h2 id="hardware-passthrough" style={S.h2}>Passthrough, SR-IOV and vGPU</h2>
      <p style={S.p}>Normal mein hypervisor devices ko emulate karta hai, jisme CPU lagta hai aur latency badhti hai. Kuch workloads mein VM ko asli hardware seedha chahiye.</p>
      <p style={S.p}><strong>PCI passthrough (DirectPath I/O):</strong> Poora physical device VT-d / IOMMU se ek VM ko de diya jaata hai. VM ko near-native performance milti hai. Keemat: wo VM aam taur par freely live-migrate nahi ho sakti, aur device sirf usi ka hota hai.</p>
      <p style={S.p}><strong>SR-IOV:</strong> Ek physical NIC kai halke virtual functions (VF) dikhata hai. Har VM ko ek VF milta hai aur wo hardware se lagbhag seedha baat karti hai. Low-latency networking aur NFV ke liye badhiya, par kuch virtual-switch features bypass hote hain aur mobility limit ho sakti hai.</p>
      <p style={S.p}><strong>vGPU aur GPU partitioning:</strong> Ek physical <TopicLink slug="gpu" variant="inline" /> vendor virtualisation software se kai VMs mein share hota hai, ya hardware mein partition (jaise MIG-style slicing). VDI, AI inference aur shared development mein use hota hai.</p>
      <ComparisonTable
        title="I/O Method Choose Karna"
        headers={["Method", "Performance", "Sharing", "Live migration", "Typical use"]}
        rows={[
          ["Emulated device", "Sabse kam", "Kai VMs", "Aasaan", "Legacy / simple VMs"],
          ["Paravirtual (virtio, VMXNET3)", "High", "Kai VMs", "Aasaan", "Zyadatar VMs ka default"],
          ["SR-IOV", "Bahut high", "VF count se limited", "Restricted", "Low-latency network, NFV"],
          ["Passthrough", "Near native", "Ek device = ek VM", "Aam taur par nahi", "GPU, NVMe, special cards"],
          ["vGPU / partitioning", "High", "Kuch VMs", "Vendor support par depend", "VDI, AI inference"],
        ]}
        caption="Seedha access = zyada performance par kam flexibility — wo sabse kam seedha method chuno jo requirement poori kare."
      />
      <Callout type="common-mistake" title="Passthrough chupke se mobility tod deta hai">
        Passthrough VMs se bhara cluster hosts ko aasaani se evacuate nahi kar sakta, aur HA ko special handling chahiye ho sakti hai. In VMs ke liye maintenance windows aur capacity alag plan karo.
      </Callout>

      {/* ══════════ 19. CAPACITY ══════════ */}
      <h2 id="capacity-planning" style={S.h2}>Capacity Planning and Host Sizing</h2>
      <p style={S.p}>Capacity planning ek sawal ka jawab hai: kitne hosts, kis size ke chahiye — aaj aur 18 mahine baad — jabki failures bhi survive hon?</p>
      <h3 style={S.h3}>Step 1 — Workload ko jaano</h3>
      <p style={S.p}>Kam se kam poore business cycle (month-end peaks sahit) ke real CPU, memory, disk IOPS aur network numbers jama karo. Sirf VM settings se size mat karo; asli use naapo.</p>
      <h3 style={S.h3}>Step 2 — Consolidation ratio chuno</h3>
      <p style={S.p}>General servers ke liye vCPU:pCore 2:1 se 4:1 aam hai, latency-sensitive database ke liye kam, aur real-time ya GPU ko feed karne wale workloads ke liye 1:1. Production mein memory aam taur par 1:1 ke aas-paas size hoti hai.</p>
      <h3 style={S.h3}>Step 3 — Failure headroom jodo (N+1 / N+2)</h3>
      <p style={S.p}>Ek host fail ho to bache hosts ko load uthana hai. 6 hosts ka cluster jo 1 failure tolerate kare, use total capacity ke lagbhag 5/6 (kareeb 83%) se zyada nahi chalana chahiye — kisi aur buffer se pehle. Higher tiers ya bade failure domains (poora blade chassis, dekho <TopicLink slug="blade-server" variant="inline" />) ke liye aur reserve rakho.</p>
      <CodeBlock lang="text" label="Quick sizing example (illustrative numbers)">
{`Demand:   600 vCPUs at 4:1  -> 150 physical cores
          4 TB RAM (production, ~1:1)
Host:     2 sockets x 32 cores = 64 cores, 1 TB RAM
Raw need: cores 150/64 = 2.3 hosts ; RAM 4/1 = 4 hosts   -> RAM is the limit
N+1:      4 + 1 = 5 hosts (before growth)
Growth:   +25% over 18 months -> plan for 6 hosts`}
      </CodeBlock>
      <p style={S.p}>Dhyan do: yahan host count CPU ne nahi, RAM ne tay kiya. Ye aam hai — har host par sahi balance ke liye <TopicLink slug="ram" variant="inline" /> aur <TopicLink slug="cpu" variant="inline" /> dekho.</p>
      <p style={S.p}><strong>Ye bhi size karo:</strong> storage capacity aur IOPS, network uplinks (migration aur storage traffic), licences (per core ya per socket), aur final host count ke liye power aur cooling.</p>

      {/* ══════════ 20. BIOS ══════════ */}
      <h2 id="host-bios-settings" style={S.h2}>Host BIOS and Firmware Settings</h2>
      <p style={S.p}>Hypervisor wahi use kar sakta hai jo BIOS use dikhne deta hai. Galat settings "VM start nahi ho rahi" aur "performance kharab hai" ki bahut common wajah hain.</p>
      <ComparisonTable
        title="Hypervisor Install Karne Se Pehle Check Karne Wali Settings"
        headers={["Setting", "Kyun zaroori", "Typical choice"]}
        rows={[
          ["Intel VT-x / AMD-V", "Hardware CPU virtualisation. Iske bina 64-bit VMs nahi chalengi", "Enabled"],
          ["EPT / NPT (SLAT)", "Hardware memory virtualisation; bada speed-up", "Enabled"],
          ["VT-d / AMD-Vi (IOMMU)", "Passthrough aur safe DMA isolation ke liye", "Enabled"],
          ["SR-IOV", "Supported NIC par virtual functions", "Use ho to Enabled"],
          ["NUMA / Node interleaving", "Interleaving NUMA ko hypervisor se chhupa deta hai", "NUMA on, node interleaving off"],
          ["Power profile", "Power-saving states wake-up latency badhate hain", "Maximum performance ya OS/vendor-recommended"],
          ["Hyper-Threading / SMT", "Zyada logical CPUs; kuch security guidance disable bolti hai", "Vendor aur security policy ke hisaab se"],
          ["Boot mode / Secure Boot / TPM", "Kuch features aur attestation ke liye", "UEFI, hypervisor guidance ke hisaab se"],
          ["Firmware versions", "NIC, HBA aur BIOS bugs PSOD aur drops karte hain", "Vendor compatibility list se match"],
        ]}
        caption="Settings cluster ke saare hosts par consistent lagao — mixed settings se ajeeb migration aur performance problems aate hain."
      />
      <Callout type="best-practice" title="Host profile ya configuration baseline use karo">
        Sahi BIOS aur hypervisor settings ek baar capture karke har host par lagao. Hosts ke beech drift intermittent problems ki chupi wajah hai.
      </Callout>

      {/* ══════════ 21. POWER COOLING ══════════ */}
      <h2 id="power-cooling" style={S.h2}>Power, Cooling and Density</h2>
      <p style={S.p}>Virtualisation servers ki ginti kam karta hai, par bache hosts zyada garam chalte hain aur zyada power khinchte hain. Achhe load wale virtualisation hosts ka ek rack 10 se 20 kW ya zyada ho sakta hai.</p>
      <p style={S.p}><strong>Power:</strong> Har host mein do PSU alag feeds (A aur B) se, <TopicLink slug="pdu" variant="inline" /> units ke through jo <TopicLink slug="ups" variant="inline" /> se backed hon. Ek rack feed jaye to har host doosri par chalta rahe. N+1 ka hisaab yaad rakho: feed loss ke baad bache PSU ko poora load uthana hai.</p>
      <p style={S.p}><strong>Cooling:</strong> Dense hosts ko achha <TopicLink slug="airflow-management" variant="inline" /> aur <TopicLink slug="containment" variant="inline" /> chahiye. Consolidation se room ka total load gir sakta hai, par per rack heat badhti hai.</p>
      <p style={S.p}><strong>Power capping aur DPM:</strong> Distributed Power Management raat ko idle hosts band kar sakta hai. Energy bachti hai par HA restart slow ho sakta hai aur wake-up delay aata hai. Kai Tier III aur IV sites critical clusters ke liye ise band ya conservative rakhte hain.</p>
      <Callout type="important" title="Consolidation risk ko hilata hai, hatata nahi">
        Kam, bade hosts ka matlab har host failure zyada VMs ko asar karti hai. Host size aur rack distribution failure domain ko dhyan mein rakhkar chuno.
      </Callout>

      {/* ══════════ 22. INSTALLATION ══════════ */}
      <h2 id="installation-deployment" style={S.h2}>Installation and Cluster Build</h2>
      <p style={S.p}>Reliable build repeatable hota hai. Har baar wahi order follow karo aur jo kiya wo record karo.</p>
      <ol style={S.ul}>
        <li><strong>Design aur plan:</strong> Network VLANs aur IP plan, storage layout, naming, cluster size, licences, change approval.</li>
        <li><strong>Hardware tayyar karo:</strong> Rack, cabling (power A/B, management, data, storage), firmware update, baseline se BIOS options.</li>
        <li><strong>Hypervisor install:</strong> Vendor guidance ke hisaab se mirrored boot media ya SAN se boot; hostname, management IP, NTP aur DNS set karo.</li>
        <li><strong>Network:</strong> Virtual switches, uplinks, port groups aur VLANs banao; management, migration aur storage alag rakho.</li>
        <li><strong>Storage:</strong> Shared storage jodo ya HCI pool banao; multipathing verify karo aur ye bhi ki har host wahi datastores dekhta hai.</li>
        <li><strong>Management plane:</strong> Manager deploy aur secure karo, hosts add karo, cluster banao.</li>
        <li><strong>Cluster features:</strong> HA, DRS, anti-affinity rules, admission control enable karo; CPUs alag hon to EVC mode.</li>
        <li><strong>Templates aur standards:</strong> Golden images, tags, backup jobs aur monitoring banao.</li>
      </ol>
      <CodeBlock lang="bash" label="KVM host use karne se pehle sanity checks (example)">
{`egrep -c '(vmx|svm)' /proc/cpuinfo      # >0 means VT-x / AMD-V visible
lsmod | grep kvm                          # kvm_intel or kvm_amd loaded
dmesg | grep -i -e DMAR -e IOMMU          # IOMMU active
virsh nodeinfo                            # CPUs, memory as seen by libvirt`}
      </CodeBlock>

      {/* ══════════ 23. TESTING ══════════ */}
      <h2 id="testing-commissioning" style={S.h2}>Testing and Commissioning</h2>
      <p style={S.p}>Aisa cluster handover mat karo jiska test sirf tab hua jab sab kuch chal raha tha. Production se pehle failure paths ko jaan-boojhkar test karo.</p>
      <ComparisonTable
        title="Typical Commissioning Tests"
        headers={["Test", "Kya karte ho", "Kya expect karte ho"]}
        rows={[
          ["Live migration", "Test VMs ko har pair of hosts ke beech move karo", "Sessions drop nahi, sirf chhota pause"],
          ["Host failure (HA)", "Ek host controlled tareeke se power off ya isolate", "VMs design time ke andar doosre hosts par restart"],
          ["Maintenance mode", "Host evacuate, patch, wapas", "Service impact nahi"],
          ["Network path loss", "Ek uplink nikalo / ek ToR port disable", "Traffic doosre path par chalta rahe"],
          ["Storage path loss", "Ek storage path ya controller disable", "I/O chalta rahe, VM pause nahi"],
          ["Power feed loss", "Ek rack feed band (approval ke saath)", "Saare hosts doosre PSU par up"],
          ["Backup restore", "VM ko test location par restore", "VM boot ho; data intact; time naapa gaya"],
          ["Performance baseline", "Representative load chalao", "Latency aur ready time targets ke andar"],
        ]}
        caption="Test se pehle expected result likh lo; unplanned surprises findings hain."
      />
      <Callout type="important" title="Backup nahi, restore test karo">
        Hara dikhata backup job saboot nahi hai. Kam se kam kuch VMs restore karo aur time naapo. Wahi aapke asli RTO ka input hai.
      </Callout>

      {/* ══════════ 24. MONITORING ══════════ */}
      <h2 id="monitoring" style={S.h2}>Monitoring Virtual Infrastructure</h2>
      <p style={S.p}>Guest tools wahi dikhate hain jo VM ko dikhta hai. Host view bhi chahiye. Dono milkar asli kahani batate hain.</p>
      <ComparisonTable
        title="Key Metrics"
        headers={["Area", "Metric", "Chinta tab jab"]}
        rows={[
          ["CPU", "CPU ready / steal time", "Per vCPU kuch percent se upar lagataar (vendor guidance dekho)"],
          ["CPU", "Host utilisation", "Cluster ek host ka loss survive nahi kar sakta"],
          ["Memory", "Ballooning, compression, swap", "Koi bhi lagataar swap-in activity"],
          ["Memory", "Active vs consumed memory", "Consumed host capacity ke paas aur demand badhti"],
          ["Storage", "Read/write latency (guest aur datastore)", "Lagataar high, ya guest aur datastore ke beech bada gap"],
          ["Storage", "Datastore free space / snapshots", "Free space kam, snapshots tay dino se purane"],
          ["Network", "Dropped packets, uplink utilisation", "Drops ya ek uplink saturated"],
          ["Cluster", "HA state, alarms, host connectivity", "Koi host respond nahi kar raha ya HA disabled"],
        ]}
        caption="Trends aur thresholds par alert lagao, phir regularly review karo taaki alerts meaningful rahein."
      />
      <p style={S.p}>Events ko central logging aur wider monitoring stack mein bhejo — <TopicLink slug="dcim" variant="inline" /> aur <TopicLink slug="bms" variant="inline" /> — taaki host temperature alarm aur VM slowdown saath dikhe.</p>

      {/* ══════════ 25. MAINTENANCE ══════════ */}
      <h2 id="maintenance" style={S.h2}>Maintenance and Patching</h2>
      <p style={S.p}>Standard pattern rolling maintenance hai: ek-ek host lo, uski VMs hatao, patch karo, test karo aur wapas lagao.</p>
      <ol style={S.ul}>
        <li>Confirm karo ki cluster ek aur host kho sakta hai (HA admission control abhi bhi satisfy).</li>
        <li>Host ko maintenance mode mein daalo; VMs automatically live-migrate hongi.</li>
        <li>Validated list se hypervisor, firmware aur driver updates lagao.</li>
        <li>Reboot, connectivity, storage paths aur health verify karo, phir maintenance mode se bahar.</li>
        <li>Agle host par tabhi jao jab pichla stable ho.</li>
      </ol>
      <p style={S.p}><strong>Routine mein ye bhi:</strong> stale snapshots hatao, datastore free space check karo, backup reports dekho, HA ko periodically test karo, rules review karo, aur management plane aur guest tools patch karo.</p>
      <Callout type="maintenance" title="Patch rings mein karo">
        Updates pehle lab ya non-production cluster par, phir chhote production group par, phir baaki par. Compatibility matrices (hypervisor, firmware, driver, storage) saamne rakho.
      </Callout>

      {/* ══════════ 26. RPO RTO ══════════ */}
      <h2 id="rpo-rto" style={S.h2}>RPO, RTO and Disaster Recovery</h2>
      <p style={S.p}><strong>RPO (Recovery Point Objective):</strong> Kitna data kho sakte ho, time mein. RPO 15 minute matlab backup ya replication kam se kam har 15 minute mein.</p>
      <p style={S.p}><strong>RTO (Recovery Time Objective):</strong> Kitni der down reh sakte ho. RTO 1 ghanta matlab sab kuch 1 ghante mein wapas chalna chahiye.</p>
      <ComparisonTable
        title="Protection Methods"
        headers={["Method", "Typical RPO", "Typical RTO", "Notes"]}
        rows={[
          ["Local disk par image backup", "Ghante se ek din", "Ghante", "Sasta; same site"],
          ["Remote / immutable storage par backup", "Ghante se ek din", "Ghante", "Ransomware aur site loss se bachata hai"],
          ["Storage-level replication", "Minutes", "Minutes se ek ghanta", "Array-based; compatible arrays chahiye"],
          ["Hypervisor replication", "Minutes", "Minutes se ek ghanta", "Per-VM, flexible, async"],
          ["Stretched cluster / synchronous", "Lagbhag zero", "Minutes", "Low latency aur witness chahiye; complex"],
        ]}
        caption="Kam RPO/RTO = zyada cost aur design effort. Method ko business criticality se match karo."
      />
      <p style={S.p}>Backup aur DR bade topics hain — dekho <TopicLink slug="backup" variant="inline" /> aur <TopicLink slug="disaster-recovery" variant="inline" />. DR plan documented, saal mein kam se kam ek baar tested ho aur usme VMs start hone ka order ho (database pehle, applications baad mein).</p>

      {/* ══════════ 27. VM VS CONTAINERS ══════════ */}
      <h2 id="vm-vs-containers" style={S.h2}>VM vs Containers</h2>
      <p style={S.p}>VM hardware virtualise karti hai aur poora guest OS chalati hai. Container host kernel share karta hai aur processes ko isolate karta hai. Alag kaam ke liye alag tool.</p>
      <ComparisonTable
        title="VM vs Container"
        headers={["Aspect", "VM", "Container"]}
        rows={[
          ["Isolation", "Strong — alag kernel", "Kamzor — shared kernel"],
          ["Startup time", "Seconds se minutes", "Milliseconds se seconds"],
          ["Size", "GBs (poora OS)", "MBs (app + libraries)"],
          ["OS support", "Koi bhi guest OS", "Host jaisi kernel family"],
          ["Density per host", "Dahaiyan", "Sainkdon"],
          ["Typical use", "Legacy apps, multi-tenant, mixed OS", "Microservices, CI/CD, cloud-native"],
        ]}
        caption="Production mein aam taur par dono saath: isolation aur aasaan operations ke liye containers VM ke andar chalte hain."
      />
      <p style={S.p}>Zyadatar enterprises mein Kubernetes clusters virtual machines par chalte hain. VM layer tenant isolation, hardware abstraction aur live migration deti hai; container layer packaging aur fast scaling.</p>

      {/* ══════════ 28. SECURITY ══════════ */}
      <h2 id="security-isolation" style={S.h2}>Virtualisation Security and Isolation</h2>
      <p style={S.p}>Hypervisor ek high-value target hai: ye compromise hua to har VM tak pahunch ho sakti hai. Isolation strong hai, par jaadu nahi.</p>
      <ul style={S.ul}>
        <li><strong>VM escape:</strong> Rare vulnerability class jisme VM ke andar ka code hypervisor par attack karta hai. Jaldi patch karo aur attack surface kam rakho (unused virtual devices disable).</li>
        <li><strong>Side-channel attacks:</strong> Spectre, Meltdown jaise issues ek CPU share karne wali VMs ke beech data leak kar sakte hain. Mitigations (microcode, hypervisor aur guest patches, scheduler options) thodi performance kharch karte hain.</li>
        <li><strong>VM sprawl:</strong> Bhooli hui VMs patches miss karti hain aur entry point ban jaati hain. Ownership aur expiry track karo.</li>
        <li><strong>Snapshot aur backup exposure:</strong> Snapshots aur backups mein memory aur secrets hote hain. Unhe production data ki tarah protect karo.</li>
        <li><strong>Network segmentation:</strong> VLANs ke saath microsegmentation / distributed firewalls (<TopicLink slug="firewall" variant="inline" />) use karo taaki compromised VM side mein na ghoom sake.</li>
        <li><strong>Management access:</strong> MFA, role-based access, alag admin network, audit logs.</li>
        <li><strong>Trusted boot:</strong> Secure Boot, TPM aur virtual TPM (vTPM) attestation aur guests mein disk encryption support karte hain.</li>
        <li><strong>Immutable backups:</strong> Ransomware aksar pehle backup aur hypervisor management ko target karta hai; ek offline ya immutable copy rakho.</li>
      </ul>

      {/* ══════════ 29. TROUBLESHOOTING ══════════ */}
      <h2 id="troubleshooting" style={S.h2}>Troubleshooting Virtualisation</h2>
      <Figure caption="Fig 10 — Troubleshooting flow: pehle tay karo ki ek VM ya kai VM affected hain, guest check karo, phir host CPU, memory, storage aur network dekho, aur aakhir mein fix, validate aur document karo."><VirtTroubleshootFlow /></Figure>
      <DiagramGuide
        title="Fig 10 ko kaise padhein"
        steps={[
          "Red box se shuru karo: shikayat ki VM slow ya down hai. Pehla sawal (blue box) scope ka hai — ek VM ya host/cluster par kai VMs?",
          "Left path (ONE VM): pehle guest ke andar dekho — process CPU, memory, disk aur logs. Guest theek dikhe par phir bhi slow ho to wajah host side hai: ready time, ballooning ya storage latency.",
          "Right path (MANY): host aur cluster level par jao — events, alarms, HA state. Phir column upar se neeche chalo: CPU ready, memory pressure, storage latency aur space, aur aakhir mein network uplinks aur drops.",
          "Dono paths green box par khatam hote hain: fix karo, validate karo ki metrics baseline par wapas hain, aur wajah document karo taaki rok sako.",
          "Footer note: ready time, balloon aur datastore latency guest ke andar nahi dikhte, isliye host view hamesha dekho.",
        ]}
      />
      <ComparisonTable
        title="Symptom to Likely Cause"
        headers={["Symptom", "Likely cause", "Pehla check"]}
        rows={[
          ["VM slow, guest CPU low", "High CPU ready, noisy neighbour, NUMA spread", "Host CPU ready / steal time"],
          ["VM slow, disk heavy", "Datastore latency, snapshots, array queue", "Datastore latency, snapshot age"],
          ["VM freeze ya pause", "Datastore full ya storage path down", "Datastore free space, path state"],
          ["VM power on nahi hoti", "Insufficient resources, reservation, lock, missing disk", "Task / event log, host resources"],
          ["Migration fail", "CPU mismatch, network issue, passthrough device", "Compatibility mode, migration network"],
          ["HA ne VM restart nahi ki", "HA disabled, admission control, isolation settings", "Cluster HA status aur logs"],
          ["Random network drops", "VLAN mismatch, uplink flap, driver / firmware bug", "Uplink state, switch port logs"],
          ["Host purple screen / crash", "Hardware fault, driver bug, memory error", "Hardware logs, firmware list"],
        ]}
        caption="Symptoms se pehla check chuno, par kuch badalne se pehle metrics se confirm karo."
      />
      <h3 style={S.h3}>VM Slow Hai</h3>
      <p style={S.p}>Pehle guest ke andar runaway process dekho. Guest idle hai par slow, to host CPU ready time, memory ballooning ya swapping aur datastore latency dekho. Common root cause host overcommit ya purana snapshot hota hai.</p>
      <h3 style={S.h3}>VM Start Nahi Ho Rahi</h3>
      <p style={S.p}>Error padho. Typical wajah: reservation ke liye host memory kam, missing ya locked virtual disk, datastore full ya unreachable, ya compatibility issue. Wajah theek karo, sirf retry mat karo.</p>
      <h3 style={S.h3}>Live Migration Fail Ho Rahi Hai</h3>
      <p style={S.p}>CPU compatibility (EVC ya compatibility mode), migration network aur MTU, dono hosts par storage visibility, aur attached passthrough devices ya ISO files check karo.</p>
      <h3 style={S.h3}>HA Trigger Nahi Ho Raha</h3>
      <p style={S.p}>Confirm karo HA enabled hai, failed host sach mein failed detect hua (sirf isolated nahi), admission control restart allow karta hai, aur restart priority aur isolation response configured hain.</p>
      <h3 style={S.h3}>Datastore Full — VMs Pause Ho Rahi Hain</h3>
      <p style={S.p}>Thin-provisioned disks ya snapshot delta files capacity se zyada badh gaye. Turant: space free karo ya badhao, ya VMs doosre datastore par migrate karo, aur stale snapshots consolidate karo. Long term: capacity alerts aur snapshot policy.</p>
      <h3 style={S.h3}>High CPU Ready Time</h3>
      <p style={S.p}>VMs physical CPUs ka intezaar kar rahi hain. Overcommit kam karo, oversized VMs right-size karo (kam vCPU aksar fast hota hai), VMs ko kam loaded host par migrate karo, aur critical VMs ke liye shares ya reservation use karo.</p>
      <Callout type="interview" title="Ek kaam ka rule">
        VM slow hai aur guest theek dikhta hai, to problem lagbhag hamesha host side hoti hai: CPU ready, memory reclaim ya storage latency. Host view dekho.
      </Callout>

      {/* ══════════ 30. FAILURE SCENARIOS ══════════ */}
      <h2 id="failure-scenarios" style={S.h2}>Failure Scenarios</h2>
      <ComparisonTable
        title="Kuch Fail Ho To Kya Hota Hai"
        headers={["Failure", "Turant asar", "Kya hona chahiye", "Design lesson"]}
        rows={[
          ["Single host crash", "Us par ki VMs ruk jaati hain", "HA unhe doosre hosts par restart karta hai (minutes)", "N+1 capacity aur restart priorities"],
          ["Host ka network isolation", "Host zinda par kata hua", "Policy ke hisaab se isolation response (leave on / shut down / power off)", "Redundant uplinks aur heartbeat paths"],
          ["Stretched cluster mein split brain", "Dono sites sochti hain VMs unki hain", "Witness survivor tay karta hai", "Teesri site par witness aur clear tie-break rules"],
          ["Storage array / datastore failure", "Kai VMs ki disks gayab", "Replica par failover ya backup se restore", "Replication, multipath, arrays mein spread"],
          ["Management plane down", "Chalti VMs theek; changes nahi", "Manager backup se restore, HA chalta rahta hai", "Manager ko khud backup aur protect karo"],
          ["Datastore full", "VMs pause ya crash", "Space free karo, snapshots consolidate", "Capacity alarms aur thin-provisioning policy"],
          ["Snapshot storm", "Latency spikes, lambi consolidation", "Dheere-dheere consolidate", "Snapshot age limits, long-term snapshots nahi"],
          ["Management ke raste ransomware", "Mass encryption ya deletion", "Immutable backup se restore", "Isolated management, MFA, immutable copies"],
          ["Poora rack ya feed loss", "Rack ke saare hosts impact mein", "VMs failayi gayi hon to doosri jagah restart", "Racks aur feeds ke beech anti-affinity"],
        ]}
        caption="Har failure scenario ko documented runbook se map karo aur jahan ho sake test karo."
      />
      <p style={S.p}><strong>Restart storms:</strong> Bade failure ke baad sainkdon VMs ek saath boot hoti hain aur storage aur CPU par toot padti hain. Restart priorities, delays aur orchestration use karo taaki critical systems (directory, DNS, databases) pehle aayein.</p>

      {/* ══════════ 31. TIER III / IV ══════════ */}
      <h2 id="tier-iii-iv-view" style={S.h2}>Tier III and Tier IV View</h2>
      <p style={S.p}>Tier classification mostly physical facility ke baare mein hai, par virtualisation design ko usse match karna chahiye. Hypervisor layer concurrently maintainable ya fault-tolerant site ki kamzor kadi nahi banni chahiye.</p>
      <ComparisonTable
        title="Typical Design Approach"
        headers={["Area", "Tier III style", "Tier IV style"]}
        rows={[
          ["Host power", "A/B feeds par dual PSU; host maintenance bina VM impact", "Wahi, poori tarah independent fault-tolerant paths ke saath"],
          ["Cluster spare", "N+1 hosts, rolling maintenance", "N+1 ya N+2, independent zones mein spread"],
          ["Network", "Dual ToR, redundant uplinks", "Poori tarah independent fabrics A aur B"],
          ["Storage", "Redundant controllers aur paths", "Independent arrays ya zones ke beech synchronous replication"],
          ["Placement", "Hosts aur racks ke beech anti-affinity", "Rooms ya fault zones ke beech anti-affinity"],
          ["Management plane", "HA manager, tested backup", "Distributed ya multi-site management"],
          ["DR", "Tested replication wali doosri site", "Active-active ya tightly managed active-passive"],
        ]}
        caption="Sirf illustrative. Actual implementation depends on project requirements, utility requirements, OEM design and data center architecture — always verify with vendor documentation."
      />
      <p style={S.p}>Yaad rakho: Tier rating us application ko protect nahi karti jo ek single VM par install hai. Application design aur VM placement tay karte hain ki facility ki redundancy sach mein use hoti hai ya nahi.</p>

      {/* ══════════ 32. SAFETY ══════════ */}
      <h2 id="safety-practices" style={S.h2}>Safety and Change Discipline</h2>
      <p style={S.p}>Virtualisation safety mostly logon ko galtiyon se aur production ko changes se bachane ki baat hai.</p>
      <ul style={S.ul}>
        <li><strong>Change control:</strong> Har host, network ya storage change ke liye approval, rollback plan aur window.</li>
        <li><strong>Live clusters par akele kaam mat karo:</strong> Destructive actions — VMs, datastores ya snapshots delete — ko doosra insaan verify kare.</li>
        <li><strong>Maintenance mode se pehle check:</strong> Confirm karo cluster us host ko kho sakta hai aur koi passthrough ya pinned VM evacuation rok nahi rahi.</li>
        <li><strong>Target confirm karo:</strong> Kai outages milte-julte naam wali galat VM, datastore ya host par action se aate hain.</li>
        <li><strong>Physical safety:</strong> Rack mein hosts chhoote waqt site rules follow karo — uthana, ESD, aur power work ke liye lockout. Dekho <TopicLink slug="server-basics" variant="inline" />.</li>
        <li><strong>Risk se pehle backup:</strong> Upgrades se pehle verified backup, sirf snapshot nahi.</li>
        <li><strong>Least privilege:</strong> Read-only, operator aur administrator roles alag.</li>
      </ul>

      {/* ══════════ 33. MISCONCEPTIONS ══════════ */}
      <h2 id="misconceptions" style={S.h2}>Common Misconceptions</h2>
      <ul style={S.ul}>
        <li><strong>"VM sirf software hai, fail nahi ho sakti."</strong> Ye hosts, storage, network aur power par depend karti hai.</li>
        <li><strong>"HA matlab zero downtime."</strong> HA VM restart karta hai; minutes ka outage hota hai. Sirf FT ya application clustering isse bachate hain.</li>
        <li><strong>"Snapshots backup hain."</strong> Wo usi storage par rehte hain aur performance girate hain.</li>
        <li><strong>"Zyada vCPU = VM tez."</strong> Aksar ulta — badi VMs ko free cores ke liye zyada wait karna padta hai.</li>
        <li><strong>"Data center mein Type 2 hypervisor use hote hain."</strong> Production mein lagbhag kabhi nahi.</li>
        <li><strong>"Live migration ko hamesha shared storage chahiye."</strong> Kai platforms shared-nothing migration support karte hain.</li>
        <li><strong>"Containers VMs ko replace kar dete hain."</strong> Wo aam taur par VMs ke upar chalte hain.</li>
      </ul>

      {/* ══════════ 34. FUTURE ══════════ */}
      <h2 id="future-trends" style={S.h2}>Future Trends</h2>
      <ul style={S.ul}>
        <li><strong>DPUs aur SmartNICs:</strong> Virtual switching, storage aur security ko host CPUs se offload karte hain.</li>
        <li><strong>Confidential computing:</strong> VMs ki memory encryption taaki hypervisor bhi guest data na padh sake.</li>
        <li><strong>GPU virtualisation aur AI clusters:</strong> Accelerators ka sharing aur slicing — dekho <TopicLink slug="ai-gpu" variant="inline" /> aur <TopicLink slug="gpu-cluster" variant="inline" />.</li>
        <li><strong>Kubernetes-native virtualisation:</strong> Ek platform par VMs aur containers saath (KubeVirt style).</li>
        <li><strong>Hyperconverged aur composable infrastructure:</strong> Compute, storage aur network software mein pooled.</li>
        <li><strong>Automation:</strong> Infrastructure-as-code, policy-driven placement aur AI-assisted capacity planning.</li>
        <li><strong>Lightweight isolation:</strong> Fast, secure serverless workloads ke liye MicroVMs (Firecracker style).</li>
      </ul>

      {/* ══════════ 35. LEARNING PATH ══════════ */}
      <h2 id="learning-path" style={S.h2}>Learning Path</h2>
      <ol style={S.ul}>
        <li>Hardware samjho: <TopicLink slug="server-basics" variant="inline" />, <TopicLink slug="cpu" variant="inline" />, <TopicLink slug="ram" variant="inline" />.</li>
        <li>Storage kaise jodte hain seekho: <TopicLink slug="das" variant="inline" />, <TopicLink slug="nas" variant="inline" />, <TopicLink slug="san" variant="inline" />.</li>
        <li>Network seekho: <TopicLink slug="switch" variant="inline" />, <TopicLink slug="load-balancer" variant="inline" />.</li>
        <li>KVM ya Proxmox ka lab banao aur live migration aur snapshots try karo.</li>
        <li>HA, DR aur backup padho: <TopicLink slug="backup" variant="inline" />, <TopicLink slug="disaster-recovery" variant="inline" />.</li>
        <li>Cloud aur AI platforms par jao: <TopicLink slug="cloud-vs-data-center" variant="inline" />, <TopicLink slug="what-is-ai-infrastructure" variant="inline" />.</li>
      </ol>

      {/* ══════════ 36. INTERVIEW ══════════ */}
      <h2 id="interview-questions" style={S.h2}>Interview Questions</h2>
      <h3 style={S.h3}>Q1: Type 1 aur Type 2 hypervisor mein kya fark hai? KVM kahan fit hota hai?</h3>
      <p style={S.p}><strong>Answer:</strong> Type 1 seedha hardware par chalta hai — host OS nahi, kam overhead, data center standard (ESXi, Hyper-V, KVM). Type 2 host OS par process ki tarah chalta hai — VirtualBox, Workstation — dev/test ke liye. KVM Linux kernel module hai jo kernel ko Type 1 hypervisor bana deta hai. Hyper-V bhi Type 1 hai — Windows parent partition hypervisor ke upar privileged VM ki tarah chalta hai.</p>
      <h3 style={S.h3}>Q2: Snapshot aur backup mein kya fark hai?</h3>
      <p style={S.p}><strong>Answer:</strong> Snapshot usi storage par VM ka point-in-time state hai — risky change se pehle quick rollback ke liye. Wo storage fail ho to snapshot bhi gaya, aur lambe snapshots performance girate hain. Backup data ko alag location par copy karta hai disaster recovery ke liye. Production ko dono chahiye.</p>
      <h3 style={S.h3}>Q3: Live migration ke liye kaun si conditions chahiye?</h3>
      <p style={S.p}><strong>Answer:</strong> Traditional: shared storage, compatible CPUs (ya EVC mode), hosts ke beech network connectivity aur destination par enough resources. Shared storage universally mandatory nahi — Storage vMotion, KVM storage migration aur Hyper-V shared-nothing migration bhi hain. Vendor documentation check karo.</p>
      <h3 style={S.h3}>Q4: VM vs container — kab kya use karein?</h3>
      <p style={S.p}><strong>Answer:</strong> VM tab jab alag OS, strong isolation, legacy apps ya compliance requirements hon. Container cloud-native microservices, fast scaling aur lightweight workloads ke liye. Production mein containers aksar VMs par chalte hain.</p>
      <h3 style={S.h3}>Q5: CPU ready time kya hai aur kyun matter karta hai?</h3>
      <p style={S.p}><strong>Answer:</strong> Wo time jab vCPU chalne ko ready hai par physical core ka intezaar kar raha hai. High ready time matlab host overcommitted hai ya VMs oversized. Ye guest ke andar nahi dikhta, isliye host par padhte hain.</p>
      <h3 style={S.h3}>Q6: Memory ballooning kaise kaam karti hai?</h3>
      <p style={S.p}><strong>Answer:</strong> Host ke paas RAM kam ho to guest ka balloon driver guest OS se memory maangta hai; guest kam-use hone wale pages chhodta hai, aur hypervisor neeche ki physical memory dobara use karta hai. Host swapping se behtar hai, par memory pressure ka sign hai.</p>
      <h3 style={S.h3}>Q7: Cluster ko size kaise karoge?</h3>
      <p style={S.p}><strong>Answer:</strong> Real utilisation naapo, consolidation ratios chuno, CPU aur RAM ke liye host count nikalo (aksar RAM limit hoti hai), N+1 ya N+2 failure headroom jodo, phir growth, storage, network aur power.</p>
      <h3 style={S.h3}>Q8: HA aur Fault Tolerance mein kya fark hai?</h3>
      <p style={S.p}><strong>Answer:</strong> HA failed VMs ko chhote outage ke baad doosre host par restart karta hai. FT lockstep copy rakhta hai aur bina restart switch-over karta hai, extra resources aur VM size limits ki keemat par.</p>

      {/* ══════════ 37. KEY TAKEAWAYS ══════════ */}
      <h2 id="key-takeaways" style={S.h2}>Key Takeaways</h2>
      <ul style={S.ul}>
        <li>Virtualisation ek physical server par kai VMs chalata hai — behtar utilisation, fast provisioning, isolation barkarar.</li>
        <li>Type 1 hypervisors (ESXi, Hyper-V, KVM) data center standard hain; KVM aur Hyper-V Type 1 hain.</li>
        <li>Hardware assist (VT-x/AMD-V, EPT/NPT, VT-d) BIOS mein enable hona chahiye.</li>
        <li>CPU overcommit CPU ready time ki tarah dikhta hai; memory overcommit ballooning, compression aur swap ki tarah.</li>
        <li>Snapshots backup nahi hain. Unhe chhota rakho aur restore verify karo.</li>
        <li>Live migration ko aam taur par compatible CPUs aur achha network chahiye; shared storage common hai par hamesha mandatory nahi.</li>
        <li>HA host failure ke baad VMs restart karta hai; kaam karne ke liye capacity reserve (N+1) honi chahiye.</li>
        <li>VMs ko anti-affinity se failure domains mein failao; management plane ko apni protection chahiye.</li>
        <li>VM slow ho to hamesha host view dekho.</li>
        <li>VMs aur containers complementary hain; production mein dono saath chalte hain.</li>
      </ul>

      <h2 style={{ ...S.h2, marginTop: "3rem" }}>Frequently Asked Questions</h2>
      {faqs.map((item, i) => (
        <div key={i} style={{ marginBottom: "1.5rem", paddingBottom: "1.5rem", borderBottom: i < faqs.length - 1 ? "1px solid #e5e7eb" : "none" }}>
          <p style={{ ...S.p, fontWeight: 700, marginBottom: "0.4rem" }}>{item.q}</p>
          <p style={{ ...S.p, marginBottom: 0 }}>{item.a}</p>
        </div>
      ))}

      <h2 style={{ ...S.h2, marginTop: "3rem" }}>Related Topics</h2>
      <ul style={S.ul}>
        <li><TopicLink slug="server-basics" variant="inline" /> — Wo physical server architecture jo VMs host karta hai.</li>
        <li><TopicLink slug="cpu" variant="inline" /> — vCPU scheduling, VMs mein NUMA, virtualisation extensions.</li>
        <li><TopicLink slug="ram" variant="inline" /> — Memory capacity, channels aur overcommit limits.</li>
        <li><TopicLink slug="gpu" variant="inline" /> — GPU sharing, passthrough aur vGPU.</li>
        <li><TopicLink slug="blade-server" variant="inline" /> — Blade infrastructure par high-density VM hosting.</li>
        <li><TopicLink slug="san" variant="inline" /> — Shared storage jo clusters aur live migration ko practical banata hai.</li>
        <li><TopicLink slug="disaster-recovery" variant="inline" /> — Replication aur recovery planning.</li>
        <li><TopicLink slug="cloud-vs-data-center" variant="inline" /> — Cloud virtualisation vs on-premise.</li>
      </ul>
    </>
  );
}
