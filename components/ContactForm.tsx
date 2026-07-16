"use client";

import { useState, type FormEvent } from "react";

type FormState = {
  name: string;
  email: string;
  type: string;
  message: string;
};

const ENQUIRY_TYPES = [
  "Business & Collaboration",
  "Suggest a Topic",
  "Report an Issue",
  "Newsletter Signup",
  "General Enquiry",
];

export default function ContactForm() {
  const [form, setForm] = useState<FormState>({
    name: "",
    email: "",
    type: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    // No backend — simulate submission delay
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 800);
  }

  if (submitted) {
    return (
      <div
        className="hp-card hp-card--padded"
        style={{ textAlign: "center", padding: "48px 32px" }}
        role="status"
        aria-live="polite"
      >
        <div style={{ fontSize: "40px", marginBottom: "16px" }}>✅</div>
        <h2
          className="hp-h2"
          style={{ marginBottom: "12px" }}
        >
          Message Received!
        </h2>
        <p style={{ fontSize: "15px", color: "var(--hp-text-secondary)", marginBottom: "24px" }}>
          Shukriya — hum jald hi reply karenge. LinkedIn pe bhi connect kar sakte ho faster response ke liye.
        </p>
        <button
          type="button"
          className="hp-btn hp-btn--secondary"
          onClick={() => {
            setSubmitted(false);
            setForm({ name: "", email: "", type: "", message: "" });
          }}
        >
          Send Another Message
        </button>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="hp-card hp-card--padded"
      style={{ display: "flex", flexDirection: "column", gap: "16px" }}
      noValidate
    >
      <div>
        <span className="hp-eyebrow">Contact Form</span>
        <h2 className="hp-h2" style={{ marginTop: "4px" }}>
          Send a Message
        </h2>
      </div>

      {/* Name */}
      <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
        <label
          htmlFor="cf-name"
          style={{ fontSize: "13px", fontWeight: 600, color: "var(--hp-text-primary)" }}
        >
          Name <span aria-hidden="true" style={{ color: "var(--hp-danger, #ef4444)" }}>*</span>
        </label>
        <input
          id="cf-name"
          name="name"
          type="text"
          required
          autoComplete="name"
          value={form.name}
          onChange={handleChange}
          placeholder="Aapka naam"
          style={{
            width: "100%",
            padding: "10px 14px",
            border: "1px solid var(--hp-border)",
            borderRadius: "var(--hp-radius-control)",
            background: "var(--hp-bg)",
            color: "var(--hp-text-primary)",
            fontSize: "14px",
            fontFamily: "var(--hp-font-body)",
            outline: "none",
            boxSizing: "border-box",
          }}
        />
      </div>

      {/* Email */}
      <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
        <label
          htmlFor="cf-email"
          style={{ fontSize: "13px", fontWeight: 600, color: "var(--hp-text-primary)" }}
        >
          Email <span aria-hidden="true" style={{ color: "var(--hp-danger, #ef4444)" }}>*</span>
        </label>
        <input
          id="cf-email"
          name="email"
          type="email"
          required
          autoComplete="email"
          value={form.email}
          onChange={handleChange}
          placeholder="aap@email.com"
          style={{
            width: "100%",
            padding: "10px 14px",
            border: "1px solid var(--hp-border)",
            borderRadius: "var(--hp-radius-control)",
            background: "var(--hp-bg)",
            color: "var(--hp-text-primary)",
            fontSize: "14px",
            fontFamily: "var(--hp-font-body)",
            outline: "none",
            boxSizing: "border-box",
          }}
        />
      </div>

      {/* Enquiry type */}
      <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
        <label
          htmlFor="cf-type"
          style={{ fontSize: "13px", fontWeight: 600, color: "var(--hp-text-primary)" }}
        >
          Enquiry Type
        </label>
        <select
          id="cf-type"
          name="type"
          value={form.type}
          onChange={handleChange}
          style={{
            width: "100%",
            padding: "10px 14px",
            border: "1px solid var(--hp-border)",
            borderRadius: "var(--hp-radius-control)",
            background: "var(--hp-bg)",
            color: form.type ? "var(--hp-text-primary)" : "var(--hp-text-muted)",
            fontSize: "14px",
            fontFamily: "var(--hp-font-body)",
            outline: "none",
            boxSizing: "border-box",
            cursor: "pointer",
          }}
        >
          <option value="">Select enquiry type</option>
          {ENQUIRY_TYPES.map((t) => (
            <option key={t} value={t}>
              {t}
            </option>
          ))}
        </select>
      </div>

      {/* Message */}
      <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
        <label
          htmlFor="cf-message"
          style={{ fontSize: "13px", fontWeight: 600, color: "var(--hp-text-primary)" }}
        >
          Message <span aria-hidden="true" style={{ color: "var(--hp-danger, #ef4444)" }}>*</span>
        </label>
        <textarea
          id="cf-message"
          name="message"
          required
          rows={5}
          value={form.message}
          onChange={handleChange}
          placeholder="Aapka message yahan likhein..."
          style={{
            width: "100%",
            padding: "10px 14px",
            border: "1px solid var(--hp-border)",
            borderRadius: "var(--hp-radius-control)",
            background: "var(--hp-bg)",
            color: "var(--hp-text-primary)",
            fontSize: "14px",
            fontFamily: "var(--hp-font-body)",
            outline: "none",
            boxSizing: "border-box",
            resize: "vertical",
            minHeight: "120px",
          }}
        />
      </div>

      <button
        type="submit"
        disabled={loading || !form.name || !form.email || !form.message}
        className="hp-btn hp-btn--primary"
        style={{ alignSelf: "flex-start", opacity: loading ? 0.7 : 1, cursor: loading ? "wait" : "pointer" }}
      >
        {loading ? "Sending…" : "Send Message →"}
      </button>

      <p style={{ fontSize: "12px", color: "var(--hp-text-muted)", margin: 0 }}>
        Your data is not stored or shared. This form is for contact purposes only.
      </p>
    </form>
  );
}
