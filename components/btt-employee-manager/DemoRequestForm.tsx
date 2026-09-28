"use client";

import { useState, type FormEvent } from "react";
import "./download.css";

// ═══════════════════════════════════════════════════════════════════════════
// components/btt-employee-manager/DemoRequestForm.tsx
//
// Collects the minimum needed to issue a 3-day demo licence and POSTs it to
// /api/demo-request. The server decides what happens next — this component
// never pretends a request went through: it shows exactly what the API said,
// and when the request channel is not configured it offers email instead.
// ═══════════════════════════════════════════════════════════════════════════

type Fields = { name: string; company: string; email: string; mobile: string; employees: string };
type Errors = Partial<Record<keyof Fields, string>>;

function validate(f: Fields): Errors {
  const e: Errors = {};
  if (f.name.trim().length < 2) e.name = "Please enter your name.";
  if (f.company.trim().length < 2) e.company = "Please enter your company name.";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(f.email.trim())) e.email = "Please enter a valid email address.";
  if (!/^\+?[0-9][0-9\s-]{8,15}$/.test(f.mobile.trim())) e.mobile = "Please enter a valid mobile number.";
  return e;
}

export default function DemoRequestForm() {
  const [f, setF] = useState<Fields>({ name: "", company: "", email: "", mobile: "", employees: "" });
  const [errors, setErrors] = useState<Errors>({});
  const [state, setState] = useState<"idle" | "sending" | "done" | "unavailable" | "error">("idle");
  const [message, setMessage] = useState("");
  const [creds, setCreds] = useState<{ username: string; temporaryPassword: string; emailed: boolean } | null>(null);
  const [website, setWebsite] = useState(""); // honeypot — real users never fill this

  const set = (k: keyof Fields) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) =>
    setF((p) => ({ ...p, [k]: e.target.value }));

  async function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const errs = validate(f);
    setErrors(errs);
    if (Object.keys(errs).length) return;
    setState("sending");
    try {
      const res = await fetch("/api/demo-request", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...f, website }),
      });
      const data = (await res.json().catch(() => ({}))) as {
        message?: string;
        username?: string;
        temporaryPassword?: string;
        emailed?: boolean;
      };
      if (res.ok) {
        setState("done");
        setMessage(data.message ?? "");
        if (data.username && data.temporaryPassword) {
          setCreds({ username: data.username, temporaryPassword: data.temporaryPassword, emailed: !!data.emailed });
        }
      } else if (res.status === 503) {
        setState("unavailable");
        setMessage(data.message ?? "");
      } else {
        setState("error");
        setMessage(data.message ?? "Something went wrong. Please try again.");
      }
    } catch {
      setState("error");
      setMessage("Could not reach the server. Please check your connection and try again.");
    }
  }

  if (state === "done") {
    return (
      <div className="bem-alert bem-alert--ok" role="status" aria-live="polite">
        <b>Request received.</b> {message || "We will verify the details and email your 3-day demo licence key."}
        {creds && (
          <div className="bem-creds">
            <p className="bem-creds-title">Your temporary demo login</p>
            <dl>
              <dt>Username</dt>
              <dd><code>{creds.username}</code></dd>
              <dt>Temporary password</dt>
              <dd><code>{creds.temporaryPassword}</code></dd>
            </dl>
            <p className="bem-creds-note">
              Save these now{creds.emailed ? " (we have also emailed them to you)" : ""}. Once we share the
              application with you, enter this username, temporary password and the licence key we send you. You
              will set your own password on first sign-in.
            </p>
          </div>
        )}
      </div>
    );
  }

  return (
    <form className="bem-form" onSubmit={submit} noValidate aria-describedby="bem-demo-note">
      <div className="bem-field">
        <label htmlFor="d-name">Name</label>
        <input id="d-name" autoComplete="name" value={f.name} onChange={set("name")} aria-invalid={!!errors.name} required />
        {errors.name && <span className="bem-field-error">{errors.name}</span>}
      </div>
      <div className="bem-field">
        <label htmlFor="d-company">Company</label>
        <input id="d-company" autoComplete="organization" value={f.company} onChange={set("company")} aria-invalid={!!errors.company} required />
        {errors.company && <span className="bem-field-error">{errors.company}</span>}
      </div>
      <div className="bem-field">
        <label htmlFor="d-email">Email</label>
        <input id="d-email" type="email" autoComplete="email" value={f.email} onChange={set("email")} aria-invalid={!!errors.email} required />
        {errors.email && <span className="bem-field-error">{errors.email}</span>}
      </div>
      <div className="bem-field">
        <label htmlFor="d-mobile">Mobile</label>
        <input id="d-mobile" type="tel" autoComplete="tel" inputMode="tel" value={f.mobile} onChange={set("mobile")} aria-invalid={!!errors.mobile} required />
        {errors.mobile && <span className="bem-field-error">{errors.mobile}</span>}
      </div>
      <div className="bem-field">
        <label htmlFor="d-emp">
          Number of employees <small>(optional)</small>
        </label>
        <select id="d-emp" value={f.employees} onChange={set("employees")}>
          <option value="">Select</option>
          <option>1–25</option>
          <option>26–100</option>
          <option>101–300</option>
          <option>301–1000</option>
          <option>1000+</option>
        </select>
      </div>
      <div aria-hidden="true" style={{ position: "absolute", left: "-9999px", width: 1, height: 1, overflow: "hidden" }}>
        <label htmlFor="d-website">Website</label>
        <input id="d-website" tabIndex={-1} autoComplete="off" value={website} onChange={(e) => setWebsite(e.target.value)} />
      </div>

      <button type="submit" className="bem-btn bem-btn--solid" disabled={state === "sending"}>
        {state === "sending" ? "Sending…" : "Start 3-Day Demo"}
      </button>

      {state === "unavailable" && (
        <div className="bem-alert bem-alert--warn" role="status">
          {message || "Online demo requests are not switched on yet. Please try again shortly."}
        </div>
      )}
      {state === "error" && (
        <div className="bem-alert bem-alert--warn" role="alert">
          {message}
        </div>
      )}

      <p id="bem-demo-note" className="bem-form-note">
        Your details are used only to set up and deliver your 3-day demo.
      </p>
    </form>
  );
}
