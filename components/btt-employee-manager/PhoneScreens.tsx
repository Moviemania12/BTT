// ═══════════════════════════════════════════════════════════════════════════
// components/btt-employee-manager/PhoneScreens.tsx
//
// HTML recreations of the BTT Employee App (Android) screens, using the same
// fields, labels and colours as the real Jetpack Compose screens, filled with
// demo data. Used because the app sets FLAG_SECURE (Android blocks
// screenshots of it). Labelled "Screen preview" wherever shown.
// ═══════════════════════════════════════════════════════════════════════════

export function PhoneFrame({ children, label }: { children: React.ReactNode; label: string }) {
  return (
    <div className="bem-phone" role="img" aria-label={label}>
      <div className="bem-phone-screen">
        <span className="bem-phone-notch" aria-hidden="true" />
        {children}
      </div>
    </div>
  );
}

export function TodayScreen() {
  return (
    <PhoneFrame label="BTT Employee App — Today screen preview">
      <div className="bem-app-head">
        Today <small>Logout</small>
      </div>
      <div className="bem-app-body">
        <div className="bem-app-hello">Hello, Employee 09</div>
        <div className="bem-app-card">
          <div className="bem-app-row"><span>Date</span><b>27 Sep, Sun</b></div>
          <div className="bem-app-row"><span>Today&apos;s Shift</span><b>S1 - Shift 1</b></div>
          <div className="bem-app-row"><span>Shift Timing</span><b>06:00 - 14:30</b></div>
          <div className="bem-app-row"><span>Site</span><b>Demo Data Center</b></div>
          <div className="bem-app-row"><span>Attendance</span><b className="bem-g">MARKED (05:58)</b></div>
        </div>
        <div className="bem-app-note">Attendance marked at 05:58.</div>
        <div className="bem-app-btn" style={{ opacity: 0.55 }}>MARK ATTENDANCE</div>
        <div className="bem-app-split">
          <div className="bem-app-btn bem-app-btn--outline">My Roster</div>
          <div className="bem-app-btn bem-app-btn--outline">Shift Change</div>
        </div>
      </div>
    </PhoneFrame>
  );
}

const ROSTER_ROWS: Array<[string, string, string]> = [
  ["24 Sep, Thu", "S1", "06:00 - 14:30"],
  ["25 Sep, Fri", "S1", "06:00 - 14:30"],
  ["26 Sep, Sat", "WO", "Weekly Off"],
  ["27 Sep, Sun", "S1", "06:00 - 14:30"],
  ["28 Sep, Mon", "S3", "22:00 - 06:30"],
  ["29 Sep, Tue", "S3", "22:00 - 06:30"],
  ["30 Sep, Wed", "L", "Leave"],
];

export function RosterScreen() {
  return (
    <PhoneFrame label="BTT Employee App — My Roster screen preview">
      <div className="bem-app-head">
        My Roster <small>September 2026</small>
      </div>
      <div className="bem-app-body">
        <div className="bem-app-list">
          {ROSTER_ROWS.map(([d, c, t]) => (
            <div key={d} className={`bem-app-li${d.startsWith("27") ? " bem-app-li--today" : ""}`}>
              <span>
                {d}
                <br />
                <span className="bem-app-time">{t}</span>
              </span>
              <span className={`bem-code${c === "WO" ? " bem-code--wo" : c === "L" ? " bem-code--l" : ""}`}>{c}</span>
            </div>
          ))}
        </div>
      </div>
    </PhoneFrame>
  );
}

export function AttendanceScreen() {
  return (
    <PhoneFrame label="BTT Employee App — Mark Attendance (face + GPS) screen preview">
      <div className="bem-app-head">Mark Attendance</div>
      <div className="bem-app-body">
        <div className="bem-app-cam" aria-hidden="true" />
        <div className="bem-app-status">Now BLINK your eyes</div>
        <div className="bem-app-note" style={{ textAlign: "center" }}>
          Face check + GPS location inside the site radius are both required.
        </div>
        <div className="bem-app-btn bem-app-btn--outline">Cancel</div>
      </div>
    </PhoneFrame>
  );
}

export function ShiftChangeScreen() {
  return (
    <PhoneFrame label="BTT Employee App — Request Shift Change screen preview">
      <div className="bem-app-head">Shift Change</div>
      <div className="bem-app-body">
        <div className="bem-app-field"><span>Date</span>06 Oct, Tue (now S1)</div>
        <div className="bem-app-note">Current shift on this date: S1</div>
        <div className="bem-app-field"><span>Choose new shift</span>Change to S2</div>
        <div className="bem-app-field"><span>Reason (required)</span>Family function in the morning</div>
        <div className="bem-app-btn bem-app-btn--navy">SEND REQUEST</div>
        <div className="bem-app-li">
          <span>06 Oct: S1 → S2</span>
          <span className="bem-pill bem-pill--amber">PENDING</span>
        </div>
        <div className="bem-app-li">
          <span>02 Oct: S3 → S1</span>
          <span className="bem-pill bem-pill--green">APPROVED</span>
        </div>
      </div>
    </PhoneFrame>
  );
}
