"use client";

const rows: [string, string, string][] = [
  ["Memory",      "ECC RAM — detects/corrects bit errors",                "Standard RAM — no error correction"],
  ["Power",       "Redundant PSUs — one fails, server continues",          "Single PSU — fails = system off"],
  ["Storage",     "Hot-swap bays — replace drives without shutdown",       "Fixed drives — shutdown to replace"],
  ["Remote Mgmt", "BMC/iDRAC/iLO — OS-independent access",                "None — requires physical access"],
  ["Cooling",     "High-RPM fans, front-to-back airflow, DC rated",        "Quiet fans, case-optimised cooling"],
  ["Form Factor", "Rack-mount (1U/2U/4U) or blade for DC density",         "Tower, laptop — home/office placement"],
  ["CPU",         "Intel Xeon / AMD EPYC — multi-socket, more PCIe lanes", "Consumer desktop/laptop CPUs"],
  ["Avail. Goal", "Designed for continuous operation with redundancy",     "Occasional downtime acceptable"],
];

export default function ServerVsPc() {
  return (
    <div className="svpc-wrap">
      <table
        className="svpc-table"
        role="table"
        aria-label="Server vs Personal Computer — key hardware differences"
      >
        <caption className="svpc-caption">
          Server vs Personal Computer — Key Differences
        </caption>
        <colgroup>
          <col className="svpc-col-label" />
          <col className="svpc-col-server" />
          <col className="svpc-col-pc" />
        </colgroup>
        <thead>
          <tr>
            <th className="svpc-th-label" scope="col" />
            <th className="svpc-th-server" scope="col">Server</th>
            <th className="svpc-th-pc"     scope="col">Personal Computer</th>
          </tr>
        </thead>
        <tbody>
          {rows.map(([label, sv, pc], i) => (
            <tr key={i} className="svpc-tr">
              <td className="svpc-td-label">{label}</td>
              <td className="svpc-td-server">{sv}</td>
              <td className="svpc-td-pc">{pc}</td>
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr>
            <td className="svpc-footer" colSpan={3}>
              Specific capabilities depend on server model, generation and configuration
            </td>
          </tr>
        </tfoot>
      </table>
    </div>
  );
}
