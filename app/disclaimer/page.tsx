import type { Metadata } from "next";
import PolicyLayout from "@/components/PolicyLayout";

export const metadata: Metadata = {
  title: "Disclaimer — Behind The Tech",
  description:
    "Behind The Tech content disclaimer — educational purpose, engineering accuracy limits, aur professional advice ke baare mein.",
  alternates: { canonical: "https://behindthetech.in/disclaimer" },
  robots: { index: true, follow: true },
  openGraph: {
    title: "Disclaimer — Behind The Tech",
    url: "https://behindthetech.in/disclaimer",
    siteName: "Behind The Tech",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Disclaimer — Behind The Tech",
    description: "Educational content disclaimer — what this site is and isn't.",
  },
};

export default function DisclaimerPage() {
  return (
    <PolicyLayout eyebrow="Legal" title="Disclaimer" lastUpdated="July 2025">
      <h2>Educational Purpose</h2>
      <p>
        Behind The Tech publishes engineering education content — articles, calculators, diagrams,
        and interactive tools — to help students and professionals understand data center
        infrastructure. All content is produced for learning purposes.
      </p>
      <p>
        Nothing on this site constitutes professional engineering advice, a formal engineering report,
        or a substitute for site-specific design work conducted by qualified engineers.
      </p>

      <h2>Technical Content</h2>
      <p>
        Articles on this site explain how systems work in general terms — how a UPS topology
        functions, how a chiller plant is configured, what a Buchholz relay does. These explanations
        are based on common industry practice and published standards.
      </p>
      <p>
        Actual implementation always depends on the specific project: utility supply characteristics,
        local electrical codes, OEM requirements, client specifications, and site conditions. An
        article that says &ldquo;a Tier III facility requires N+1 cooling redundancy&rdquo; is
        describing the Uptime Institute definition — your actual project may have requirements that
        exceed or differ from that baseline.
      </p>
      <p>
        <strong>
          Do not use content from this site as the sole basis for engineering decisions on live
          projects.
        </strong>{" "}
        Verify against applicable standards, manufacturer documentation, and the judgment of a
        licensed engineer.
      </p>

      <h2>Calculator Tools</h2>
      <p>
        Calculators on this site are designed for quick estimation and learning — not for formal
        design calculations. They use simplified models and standard assumptions. Real UPS sizing,
        cable sizing, cooling load calculations, and similar engineering tasks require full project
        data and qualified review.
      </p>

      <h2>Product and Brand References</h2>
      <p>
        Where we mention specific products — Schneider Galaxy UPS, Vertiv Liebert, Cummins generators,
        and so on — we do so for educational illustration only. We are not endorsing those products
        over alternatives, nor are we affiliated with those manufacturers unless explicitly stated.
        Specifications change; always refer to the manufacturer&rsquo;s current documentation.
      </p>

      <h2>Third-Party Content</h2>
      <p>
        We link to external sources — standards bodies, manufacturer sites, industry publications —
        for reference. We do not control those resources and cannot guarantee their accuracy or
        continued availability.
      </p>

      <h2>Accuracy and Updates</h2>
      <p>
        Data center technology, standards, and best practices change. We update content when we become
        aware of significant inaccuracies. If you spot an error, use our{" "}
        <a href="/correction-policy">Correction Policy</a> page to report it.
      </p>

      <h2>Contact</h2>
      <p>
        Questions: <a href="mailto:hello@behindthetech.in">hello@behindthetech.in</a>
      </p>
    </PolicyLayout>
  );
}
