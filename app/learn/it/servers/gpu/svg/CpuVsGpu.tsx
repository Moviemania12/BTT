"use client";
export default function CpuVsGpu() {
  return (
    <svg viewBox="0 0 800 340" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="CPU vs GPU architectural comparison showing few powerful cores vs many simpler cores">
      <rect width="800" height="340" fill="#fff"/>
      <text x="400" y="24" textAnchor="middle" fontFamily="Arial,sans-serif" fontSize="14" fontWeight="700" fill="#111827">CPU vs GPU — Architectural Design Philosophy</text>
      {/* CPU side */}
      <rect x="10" y="38" width="370" height="280" rx="10" fill="#eff6ff" stroke="#2563eb" strokeWidth="2"/>
      <text x="195" y="62" textAnchor="middle" fontFamily="Arial,sans-serif" fontSize="12" fontWeight="700" fill="#1e40af">CPU — Few Powerful Cores</text>
      {[0,1,2,3].map(i=>{
        const x=26+i*88; return(<g key={i}>
          <rect x={x} y="74" width="78" height="90" rx="6" fill="#bfdbfe" stroke="#2563eb" strokeWidth="1.5"/>
          <text x={x+39} y="96" textAnchor="middle" fontFamily="Arial,sans-serif" fontSize="9" fontWeight="700" fill="#1e40af">Core {i}</text>
          <rect x={x+6} y="102" width="66" height="14" rx="2" fill="#93c5fd"/>
          <text x={x+39} y="113" textAnchor="middle" fontFamily="Arial,sans-serif" fontSize="7.5" fill="#1e40af">Branch Predictor</text>
          <rect x={x+6} y="120" width="66" height="14" rx="2" fill="#93c5fd"/>
          <text x={x+39} y="131" textAnchor="middle" fontFamily="Arial,sans-serif" fontSize="7.5" fill="#1e40af">Out-of-Order Exec</text>
          <rect x={x+6} y="138" width="66" height="14" rx="2" fill="#dbeafe"/>
          <text x={x+39} y="149" textAnchor="middle" fontFamily="Arial,sans-serif" fontSize="7.5" fill="#1e40af">L1 + L2 Cache</text>
        </g>);
      })}
      <rect x="24" y="176" width="342" height="22" rx="4" fill="#dbeafe" stroke="#2563eb"/>
      <text x="195" y="191" textAnchor="middle" fontFamily="Arial,sans-serif" fontSize="9" fontWeight="700" fill="#1e40af">Large L3 Cache (Shared)</text>
      <rect x="24" y="204" width="342" height="22" rx="4" fill="#eff6ff" stroke="#2563eb"/>
      <text x="195" y="219" textAnchor="middle" fontFamily="Arial,sans-serif" fontSize="9" fill="#1e40af">Memory Controller → System RAM</text>
      {["✓ Complex sequential tasks","✓ Branch-heavy code","✓ Low-latency single-thread","✓ OS and application control"].map((t,i)=>(
        <text key={i} x="26" y={240+i*14} fontFamily="Arial,sans-serif" fontSize="9.5" fill="#166534">{t}</text>
      ))}
      {/* GPU side */}
      <rect x="420" y="38" width="370" height="280" rx="10" fill="#faf5ff" stroke="#7c3aed" strokeWidth="2"/>
      <text x="605" y="62" textAnchor="middle" fontFamily="Arial,sans-serif" fontSize="12" fontWeight="700" fill="#6b21a8">GPU — Many Simpler Cores</text>
      {Array.from({length:24},(_,i)=>{
        const col=i%6; const row=Math.floor(i/6); const x=432+col*58; const y=72+row*44;
        return(<rect key={i} x={x} y={y} width="48" height="34" rx="3" fill="#e9d5ff" stroke="#7c3aed" strokeWidth="1"/>);
      })}
      <text x="605" y="256" textAnchor="middle" fontFamily="Arial,sans-serif" fontSize="8" fill="#6b21a8">× thousands more in real GPU (shown illustratively)</text>
      <rect x="432" y="260" width="346" height="20" rx="4" fill="#e9d5ff" stroke="#7c3aed"/>
      <text x="605" y="274" textAnchor="middle" fontFamily="Arial,sans-serif" fontSize="8.5" fontWeight="700" fill="#6b21a8">VRAM (dedicated high-bandwidth memory)</text>
      {["✓ Massive parallel throughput","✓ Matrix multiplication (AI/ML core)","✓ Image / pixel processing","✓ Scientific simulations"].map((t,i)=>(
        <text key={i} x="432" y={292+i*11} fontFamily="Arial,sans-serif" fontSize="9" fill="#6b21a8">{t}</text>
      ))}
      <text x="400" y="330" textAnchor="middle" fontFamily="Arial,sans-serif" fontSize="8.5" fill="#94a3b8">Core counts shown illustratively. Actual GPU architectures vary significantly by vendor, model and generation.</text>
    </svg>
  );
}
