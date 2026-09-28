import type { Metadata } from "next";
import Link from "next/link";
import Footer from "@/components/Footer";
import DemoRequestForm from "@/components/btt-employee-manager/DemoRequestForm";
import { PRODUCT } from "@/lib/bttEmployeeManager";
import "@/components/btt-employee-manager/bem.css";

export const metadata: Metadata = {
  title: "Start 3-Day Demo — BTT Employee Manager",
  description:
    "Request a 3-day demo of BTT Employee Manager with unlimited employees: roster generation, attendance, leave, coverage and the Android employee app.",
  alternates: { canonical: PRODUCT.demoRoute },
};

export default function DemoPage() {
  return (
    <>
      <main className="bem-root" data-homepage-theme="light" style={{ paddingTop: 64 }}>
        <section className="bem-section bem-section--subtle" aria-labelledby="bem-demo-h">
          <div className="bem-container">
            <p style={{ marginBottom: 18 }}>
              <Link href={PRODUCT.route} className="hp-link">
                ← BTT Employee Manager
              </Link>
            </p>
            <div className="bem-form-wrap">
              <div>
                <p className="bem-eyebrow">Try BTT Employee Manager</p>
                <h1 id="bem-demo-h" className="bem-h2" style={{ fontSize: "clamp(28px,3.4vw,40px)" }}>
                  Start your 3-day demo
                </h1>
                <p className="bem-sub">{PRODUCT.demo.line}</p>

                <div className="bem-demo-offer" style={{ maxWidth: 420, marginBottom: 28 }}>
                  <div style={{ background: "var(--hp-surface)", borderColor: "var(--hp-border)" }}>
                    <b style={{ color: "var(--hp-text-primary)" }}>Unlimited</b>
                    <span style={{ color: "var(--hp-accent)" }}>Employees</span>
                  </div>
                  <div style={{ background: "var(--hp-surface)", borderColor: "var(--hp-border)" }}>
                    <b style={{ color: "var(--hp-text-primary)" }}>3 Days</b>
                    <span style={{ color: "var(--hp-accent)" }}>Free</span>
                  </div>
                </div>

                <h2 className="bem-h2" style={{ fontSize: 18 }}>How the demo works</h2>
                <ul className="bem-checklist" style={{ marginTop: 12 }}>
                  <li><span><b>Send the request</b> — name, company, email and mobile.</span></li>
                  <li><span><b>Get your temporary login</b> right away on this page (and by email).</span></li>
                  <li><span><b>Get the application</b> — we share the Windows software (and the Android app for your team) with your demo.</span></li>
                  <li><span><b>Activate</b> with the 3-day licence key we email after verification, then set your own password.</span></li>
                  <li><span><b>Use everything for 3 days</b> — roster generation, attendance, leave, coverage and reports, with no employee limit.</span></li>
                </ul>
              </div>
              <DemoRequestForm />
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
