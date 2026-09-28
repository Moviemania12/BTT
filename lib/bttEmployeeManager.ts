// ═══════════════════════════════════════════════════════════════════════════
// lib/bttEmployeeManager.ts — single source of product copy for
// BTT Employee Manager (homepage showcase + product page + demo page).
//
// ACCURACY RULE: every feature listed here exists in the shipped Windows
// application (Data Center Manpower Roster Manager v0.11 + v0.14 mobile link)
// or the BTT Employee App (Android). Do not add a line here for something the
// software does not do.
// ═══════════════════════════════════════════════════════════════════════════

export const PRODUCT = {
  name: "BTT Employee Manager",
  tagline: "Employee, Roster & Attendance Management — Simplified.",
  headline: "From Roster Planning to Attendance — One Complete Employee Management System.",
  summary:
    "Create constraint-based rosters, manage employees, track attendance, handle leave and shift changes, and monitor workforce deployment from one platform.",
  route: "/products/btt-employee-manager",
  demoRoute: "/products/btt-employee-manager/demo",
  platforms: "Windows desktop application · Android employee app",
  demo: {
    days: 3,
    employees: "Unlimited employees",
    line: "Experience the complete platform for 3 days.",
  },
} as const;

export type Screen = {
  id: string;
  src: string;
  title: string;
  module: string;
  caption: string;
};

// Real screens captured from the Windows application running on a demo
// database (employee names anonymised as "Employee 01…", site renamed
// "Demo Data Center"). 1480 × 900 WebP.
export const SCREENS: Screen[] = [
  {
    id: "dashboard",
    src: "/images/btt-employee-manager/dashboard.webp",
    title: "Dashboard",
    module: "Overview",
    caption: "Today's deployment, coverage %, shortage, weekly offs, leave and the current quarter's penalty at a glance.",
  },
  {
    id: "monthly-roster",
    src: "/images/btt-employee-manager/monthly-roster.webp",
    title: "Monthly Roster",
    module: "Roster",
    caption: "Generated monthly roster with role-wise requirement rows, revision status, quality and shift-continuity scores.",
  },
  {
    id: "daily-coverage",
    src: "/images/btt-employee-manager/daily-coverage.webp",
    title: "Daily Deployment & Coverage",
    module: "Coverage",
    caption: "Required vs assigned manpower for every role and shift, with shortage and excess flagged per day.",
  },
  {
    id: "staff-master",
    src: "/images/btt-employee-manager/staff-master.webp",
    title: "Staff Master",
    module: "Employees",
    caption: "Employee master with role, regular/reliever, joining and exit dates, status, fixed weekly off and shift pattern.",
  },
  {
    id: "dhr-attendance",
    src: "/images/btt-employee-manager/dhr-attendance.webp",
    title: "DHR — Daily Deployment Register",
    module: "Attendance",
    caption: "Planned shift vs actual shift and attendance for each employee, with verify and lock steps.",
  },
  {
    id: "attendance",
    src: "/images/btt-employee-manager/attendance.webp",
    title: "Attendance Records",
    module: "Attendance",
    caption: "Attendance across a date range, with plan-vs-actual deviations and rule findings listed separately.",
  },
  {
    id: "leave",
    src: "/images/btt-employee-manager/leave.webp",
    title: "Leave & Availability",
    module: "Leave",
    caption: "Leave entry and leave requests, with the roster impact shown before anything changes.",
  },
  {
    id: "mobile-attendance-admin",
    src: "/images/btt-employee-manager/mobile-attendance-admin.webp",
    title: "Mobile Attendance (Admin View)",
    module: "Mobile link",
    caption: "Face + GPS verified attendance pulled from the employee app, with distance from site and DHR posting status.",
  },
  {
    id: "shift-change-approval",
    src: "/images/btt-employee-manager/shift-change-approval.webp",
    title: "Shift Change Approval",
    module: "Mobile link",
    caption: "Shift-change requests raised by employees in the app, approved or rejected by the manager.",
  },
  {
    id: "shift-rotation-policy",
    src: "/images/btt-employee-manager/shift-rotation-policy.webp",
    title: "Shift Rotation Policy",
    module: "Settings",
    caption: "Rotation sequence, weekly shift block, maximum consecutive working days and minimum rest between duties.",
  },
];

export const PROBLEMS = [
  "Manual roster preparation in Excel every month",
  "Shift rotation confusion and unfair night-shift load",
  "Leave suddenly affecting coverage",
  "Attendance scattered across registers, sheets and WhatsApp",
  "Difficulty spotting manpower shortages before they happen",
  "No clear employee-wise view of the roster",
  "Manual reporting at month and quarter end",
];

export type Feature = { title: string; description: string; icon: string; group: "plan" | "run" | "control" | "mobile" };

export const FEATURES: Feature[] = [
  { icon: "🧩", group: "plan", title: "Constraint-Based Roster Generation", description: "Builds the monthly roster from role-wise shift requirements, eligibility, weekly offs, leave and rest rules using an optimisation solver." },
  { icon: "👥", group: "plan", title: "Employee & Staff Master", description: "One record per employee: roles, reliever status, joining and exit dates, fixed weekly off and shift pattern." },
  { icon: "🔄", group: "plan", title: "Shift Rotation", description: "Configurable rotation sequence (e.g. S1 → S3 → S2 → G) in weekly blocks, continued from the previous month." },
  { icon: "🗓️", group: "plan", title: "Leave & Availability", description: "Leave entries and requests with balance tracking; the roster impact and replacement options are shown before changes." },
  { icon: "📊", group: "run", title: "Daily Deployment & Coverage", description: "Required vs assigned manpower for every role and shift, day by day, with shortage and excess highlighted." },
  { icon: "✅", group: "run", title: "Attendance Management", description: "Daily Deployment Register records planned vs actual shift and attendance, with verify, lock and audited corrections." },
  { icon: "🔁", group: "run", title: "Shift Change Requests", description: "Employees request a change from the app; the manager approves in Windows and the official roster updates." },
  { icon: "🛟", group: "run", title: "Reliever Management", description: "Relievers are tracked separately and allocated to cover vacancies, with a reliever allocation sheet in exports." },
  { icon: "⚠️", group: "control", title: "Penalty / Shortage Tracking", description: "Role-wise shortage calculation against contract requirements, penalty master and quarterly penalty reports." },
  { icon: "📑", group: "control", title: "Excel & PDF Reports", description: "Monthly roster, raw roster, daily deployment, coverage, reliever allocation, shortage & penalty and duty summary." },
  { icon: "🏢", group: "control", title: "Multi-Site Support", description: "Several sites in one installation, each with its own employees, requirements, roster and licence." },
  { icon: "🔐", group: "control", title: "Role-Based Access", description: "Super Admin, Site Admin, Roster Planner, HR, Attendance Admin, Supervisor, Viewer and Employee roles with site scope." },
  { icon: "🧾", group: "control", title: "Audit Trail", description: "Roster edits, overrides, attendance corrections, approvals and licence events are written to an audit log." },
  { icon: "📍", group: "mobile", title: "Mobile Employee Attendance", description: "Employees mark attendance in the Android app with face verification and GPS geofence check at the authorised site." },
  { icon: "📱", group: "mobile", title: "Employee Monthly Roster", description: "Each employee sees only their own shifts, weekly offs and leave for the month in the app." },
];

export const STEPS = [
  { n: "01", title: "Add Employees & Site", text: "Set up the site, contractual role-wise requirements, shifts and the employee master." },
  { n: "02", title: "Generate Roster", text: "Generate the monthly roster, review coverage and warnings, then lock it as the official plan." },
  { n: "03", title: "Employees View Shifts & Mark Attendance", text: "Employees see their own roster in the app and mark attendance with face + GPS at the site." },
  { n: "04", title: "Manager Monitors Attendance, Coverage & Reports", text: "Attendance flows into the DHR; coverage, shortages and reports are ready for the month and quarter." },
];

export const AUDIENCE = [
  "Data Center O&M teams",
  "Facility Management companies",
  "Manpower contractors",
  "Operations teams",
  "Security & facility teams",
  "Companies managing shift-based employees",
];

export const FAQ = [
  {
    q: "What does the 3-day demo include?",
    a: "The complete Windows application with no employee-count limit, licensed for 3 days. The demo licence is issued to your company after your request is verified.",
  },
  {
    q: "Is it cloud software or installed software?",
    a: "The main application is a Windows desktop program with its data stored on your PC. The optional employee app connects through a secure BTT server for mobile attendance and shift-change requests.",
  },
  {
    q: "Which phones does the employee app support?",
    a: "Android. Employees sign in with credentials issued by the manager and can only see their own roster and attendance.",
  },
  {
    q: "Can it handle more than one site?",
    a: "Yes. Sites, requirements, employees and rosters are kept per site, and user access can be limited to specific sites.",
  },
];
