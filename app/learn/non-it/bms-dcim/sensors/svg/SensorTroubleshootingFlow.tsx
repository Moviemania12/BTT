"use client";
export default function SensorTroubleshootingFlow() {
  return (
    <svg viewBox="0 0 820 460" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Sensor troubleshooting flow starting with BMS showing wrong or no value, checking sensor power, signal wire, controller input, scaling, and BMS point configuration">
      <rect width="820" height="460" fill="#fff"/>
      <text x="410" y="24" textAnchor="middle" fontFamily="Arial,sans-serif" fontSize="14" fontWeight="700" fill="#111827">Sensor Troubleshooting — Systematic Approach</text>
      {/* Start */}
      <rect x="310" y="40" width="200" height="44" rx="22" fill="#1e293b"/>
      <text x="410" y="57" textAnchor="middle" fontFamily="Arial,sans-serif" fontSize="11" fontWeight="700" fill="#f1f5f9">BMS showing wrong value</text>
      <text x="410" y="73" textAnchor="middle" fontFamily="Arial,sans-serif" fontSize="10" fill="#94a3b8">or no value / frozen</text>
      <line x1="410" y1="84" x2="410" y2="108" stroke="#374151" strokeWidth="2" markerEnd="url(#sArr)"/>
      {/* Step 1 */}
      <rect x="260" y="110" width="300" height="50" rx="8" fill="#fef3c7" stroke="#f59e0b" strokeWidth="1.5"/>
      <text x="410" y="131" textAnchor="middle" fontFamily="Arial,sans-serif" fontSize="11" fontWeight="700" fill="#78350f">1. Check Sensor / Physical</text>
      <text x="410" y="147" textAnchor="middle" fontFamily="Arial,sans-serif" fontSize="9.5" fill="#374151">Physical presence OK? Sensor powered? Any visible damage?</text>
      {/* Branch: Is physical OK? */}
      <line x1="410" y1="160" x2="410" y2="184" stroke="#374151" strokeWidth="2" markerEnd="url(#sArr)"/>
      {/* Step 2 */}
      <rect x="260" y="186" width="300" height="50" rx="8" fill="#e0f2fe" stroke="#0ea5e9" strokeWidth="1.5"/>
      <text x="410" y="207" textAnchor="middle" fontFamily="Arial,sans-serif" fontSize="11" fontWeight="700" fill="#0c4a6e">2. Check Signal / Wiring</text>
      <text x="410" y="223" textAnchor="middle" fontFamily="Arial,sans-serif" fontSize="9.5" fill="#374151">Multimeter: 4-20mA range? 0-10V range? DI state? Continuity?</text>
      <line x1="410" y1="236" x2="410" y2="260" stroke="#374151" strokeWidth="2" markerEnd="url(#sArr)"/>
      {/* Step 3 */}
      <rect x="260" y="262" width="300" height="50" rx="8" fill="#f0fdf4" stroke="#16a34a" strokeWidth="1.5"/>
      <text x="410" y="283" textAnchor="middle" fontFamily="Arial,sans-serif" fontSize="11" fontWeight="700" fill="#14532d">3. Check Controller Input</text>
      <text x="410" y="299" textAnchor="middle" fontFamily="Arial,sans-serif" fontSize="9.5" fill="#374151">Controller raw input value correct? Loop power OK? Input type match?</text>
      <line x1="410" y1="312" x2="410" y2="336" stroke="#374151" strokeWidth="2" markerEnd="url(#sArr)"/>
      {/* Step 4 */}
      <rect x="260" y="338" width="300" height="50" rx="8" fill="#ede9fe" stroke="#7c3aed" strokeWidth="1.5"/>
      <text x="410" y="359" textAnchor="middle" fontFamily="Arial,sans-serif" fontSize="11" fontWeight="700" fill="#4c1d95">4. Check Scaling / BMS Config</text>
      <text x="410" y="375" textAnchor="middle" fontFamily="Arial,sans-serif" fontSize="9.5" fill="#374151">Min/max engineering value correct? Unit configured? Point binding?</text>

      {/* Side branches */}
      {/* Physical fault */}
      <line x1="260" y1="135" x2="180" y2="135" stroke="#ef4444" strokeWidth="1.5" strokeDasharray="5,3"/>
      <rect x="30" y="112" width="148" height="46" rx="6" fill="#fee2e2" stroke="#ef4444" strokeWidth="1.5"/>
      <text x="104" y="131" textAnchor="middle" fontFamily="Arial,sans-serif" fontSize="9.5" fontWeight="700" fill="#7f1d1d">Physical fault</text>
      <text x="104" y="145" textAnchor="middle" fontFamily="Arial,sans-serif" fontSize="8.5" fill="#374151">Replace sensor / fix power</text>

      {/* Wiring fault */}
      <line x1="260" y1="211" x2="180" y2="211" stroke="#ef4444" strokeWidth="1.5" strokeDasharray="5,3"/>
      <rect x="30" y="188" width="148" height="46" rx="6" fill="#fee2e2" stroke="#ef4444" strokeWidth="1.5"/>
      <text x="104" y="207" textAnchor="middle" fontFamily="Arial,sans-serif" fontSize="9.5" fontWeight="700" fill="#7f1d1d">Wiring fault</text>
      <text x="104" y="221" textAnchor="middle" fontFamily="Arial,sans-serif" fontSize="8.5" fill="#374151">Fix cable / polarity / loop power</text>

      {/* Controller fault */}
      <line x1="560" y1="287" x2="640" y2="287" stroke="#ef4444" strokeWidth="1.5" strokeDasharray="5,3"/>
      <rect x="642" y="264" width="158" height="46" rx="6" fill="#fee2e2" stroke="#ef4444" strokeWidth="1.5"/>
      <text x="721" y="283" textAnchor="middle" fontFamily="Arial,sans-serif" fontSize="9.5" fontWeight="700" fill="#7f1d1d">Controller I/O fault</text>
      <text x="721" y="297" textAnchor="middle" fontFamily="Arial,sans-serif" fontSize="8.5" fill="#374151">Check input type / replace module</text>

      {/* Config fault */}
      <line x1="560" y1="363" x2="640" y2="363" stroke="#ef4444" strokeWidth="1.5" strokeDasharray="5,3"/>
      <rect x="642" y="340" width="158" height="46" rx="6" fill="#fee2e2" stroke="#ef4444" strokeWidth="1.5"/>
      <text x="721" y="359" textAnchor="middle" fontFamily="Arial,sans-serif" fontSize="9.5" fontWeight="700" fill="#7f1d1d">Config / scaling error</text>
      <text x="721" y="373" textAnchor="middle" fontFamily="Arial,sans-serif" fontSize="8.5" fill="#374151">Fix BMS point config / formula</text>

      <text x="410" y="450" textAnchor="middle" fontFamily="Arial,sans-serif" fontSize="9" fill="#94a3b8">Isolate at each layer before moving to next — do not skip steps</text>
      <defs><marker id="sArr" markerWidth="7" markerHeight="7" refX="6" refY="3.5" orient="auto"><polygon points="0 0,7 3.5,0 7" fill="#374151"/></marker></defs>
    </svg>
  );
}
