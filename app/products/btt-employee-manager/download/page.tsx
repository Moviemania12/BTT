import type { Metadata } from "next";
import Link from "next/link";
import Footer from "@/components/Footer";
import DownloadCards from "@/components/btt-employee-manager/DownloadCards";
import { PRODUCT } from "@/lib/bttEmployeeManager";
import { DOWNLOAD_ROUTE } from "@/lib/bttDownloads";
import "@/components/btt-employee-manager/bem.css";

export const metadata: Metadata = {
  title: "Download — BTT Employee Manager (Windows & Android)",
  description:
    "Download BTT Employee Manager for Windows and the BTT Employee App for Android. Free 3-day demo, unlimited employees.",
  alternates: { canonical: DOWNLOAD_ROUTE },
};

export default function DownloadPage() {
  return (
    <>
      <main className="bem-root" data-homepage-theme="light" style={{ paddingTop: 64 }}>
        <section className="bem-section bem-section--subtle" aria-labelledby="bem-dl-h">
          <div className="bem-container">
            <p style={{ marginBottom: 18 }}>
              <Link href={PRODUCT.route} className="hp-link">
                ← BTT Employee Manager
              </Link>
            </p>
            <div className="bem-center">
              <p className="bem-eyebrow">Download</p>
              <h1 id="bem-dl-h" className="bem-h2" style={{ fontSize: "clamp(28px,3.4vw,40px)" }}>
                Get BTT Employee Manager
              </h1>
              <p className="bem-sub">Windows software for the manager, Android app for employees.</p>
            </div>

            <ul className="bem-dl-what" aria-label="What it does">
              <li><b>Roster &amp; shifts</b>Generate the monthly roster from your contract&apos;s requirements and rules.</li>
              <li><b>Attendance &amp; leave</b>Face + GPS attendance, leave with a coverage plan, shift-change requests.</li>
              <li><b>Employees &amp; reports</b>Employee records, daily coverage, shortage and Excel/PDF reports.</li>
            </ul>

            <DownloadCards showDemoLink={false} />

            <div className="bem-dl-demo">
              <div>
                <h2>3-day demo · Unlimited employees</h2>
                <p>Request the demo to get your temporary login. Your licence key follows by email.</p>
              </div>
              <Link href={PRODUCT.demoRoute} className="bem-btn">
                Start 3-Day Demo
              </Link>
            </div>

            <p className="bem-dl-support">
              Need help? <Link href={PRODUCT.demoRoute} className="hp-link">Request a demo</Link> and we&apos;ll get in touch.
            </p>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
