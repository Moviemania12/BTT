import Link from "next/link";
import { PRODUCT } from "@/lib/bttEmployeeManager";
import { getDownloads, type DownloadInfo } from "@/lib/bttDownloads";
import "./download.css";

// ═══════════════════════════════════════════════════════════════════════════
// components/btt-employee-manager/DownloadCards.tsx
// Windows installer + Android app download cards. Links come from env vars
// (lib/bttDownloads.ts); a missing link renders a disabled button, never a
// placeholder URL. Server Component.
// ═══════════════════════════════════════════════════════════════════════════

function Card({ d }: { d: DownloadInfo }) {
  const meta = [d.version && `Version ${d.version}`, d.size, d.fileType].filter(Boolean).join(" · ");
  return (
    <article className="bem-dl-card" aria-labelledby={`dl-${d.id}`}>
      <div className="bem-dl-head">
        <span className={`bem-dl-icon bem-dl-icon--${d.id}`} aria-hidden="true">
          {d.id === "windows" ? "⊞" : "▣"}
        </span>
        <div>
          <p className="bem-dl-platform">{d.platform}</p>
          <h3 id={`dl-${d.id}`}>{d.name}</h3>
        </div>
      </div>

      <p className="bem-dl-meta">{meta}</p>
      <p className="bem-dl-req">{d.requirements}</p>

      <Link href={PRODUCT.demoRoute} className="bem-btn bem-btn--solid bem-dl-btn">
        Request a Demo
      </Link>

    </article>
  );
}

export default function DownloadCards({ showDemoLink = true }: { showDemoLink?: boolean }) {
  const downloads = getDownloads();
  return (
    <>
      <div className="bem-dl-grid">
        {downloads.map((d) => (
          <Card key={d.id} d={d} />
        ))}
      </div>
      <p className="bem-dl-foot">
        The software needs a licence to run. The 3-day demo licence is free, with unlimited employees.
        {showDemoLink && (
          <>
            {" "}
            <Link href={PRODUCT.demoRoute} className="hp-link">
              Request your demo licence →
            </Link>
          </>
        )}
      </p>
    </>
  );
}
