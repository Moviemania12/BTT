/**
 * components/diagrams/RequestJourneyDiagram.tsx
 *
 * Standalone visual representation of the existing "Request Journey"
 * section. Does NOT replace, alter, or duplicate the article text —
 * it is an additional visual aid placed alongside the existing
 * FlowStep list.
 *
 * Flow: User Device → ISP → Internet → Data Center → Security Layer
 *       → Load Balancer → Server → Storage
 *
 * Uses only existing BTT CSS variables (--color-void, --color-neon-blue,
 * --color-neon-cyan, --color-text-primary, --color-text-secondary,
 * --color-text-muted, --font-display, --font-mono). No external
 * libraries. Pure inline SVG, responsive via viewBox + 100% width.
 */

interface JourneyStep {
  id: string;
  label: string;
}

const STEPS: JourneyStep[] = [
  { id: "user",     label: "User Device" },
  { id: "isp",      label: "ISP" },
  { id: "internet", label: "Internet" },
  { id: "dc",        label: "Data Center" },
  { id: "security", label: "Security Layer" },
  { id: "lb",        label: "Load Balancer" },
  { id: "server",   label: "Server" },
  { id: "storage",  label: "Storage" },
];

const ROW_HEIGHT = 64;
const NODE_W = 220;
const NODE_H = 40;
const VIEWBOX_W = 320;
const VIEWBOX_H = STEPS.length * ROW_HEIGHT - (ROW_HEIGHT - NODE_H) + 24;

export default function RequestJourneyDiagram() {
  return (
    <figure
      style={{ margin: "24px 0" }}
      aria-label="Request journey flow diagram: User Device to ISP to Internet to Data Center to Security Layer to Load Balancer to Server to Storage"
    >
      <div
        style={{
          background: "rgba(0,212,255,0.02)",
          border: "1px solid rgba(0,212,255,0.12)",
          borderRadius: 10,
          padding: "20px 16px",
        }}
      >
        <svg
          viewBox={`0 0 ${VIEWBOX_W} ${VIEWBOX_H}`}
          style={{ width: "100%", maxWidth: 360, height: "auto", display: "block", margin: "0 auto" }}
          role="img"
          aria-hidden="false"
        >
          <defs>
            <marker id="rjd-arrow" markerWidth="8" markerHeight="8" refX="4" refY="4" orient="auto">
              <path d="M0,0 L8,4 L0,8 Z" fill="var(--color-neon-blue)" />
            </marker>
          </defs>

          {STEPS.map((step, i) => {
            const cy = 12 + i * ROW_HEIGHT + NODE_H / 2;
            const cx = VIEWBOX_W / 2;
            const isLast = i === STEPS.length - 1;
            const nextCy = cy + ROW_HEIGHT;

            return (
              <g key={step.id}>
                {/* Connector to next node */}
                {!isLast && (
                  <line
                    x1={cx}
                    y1={cy + NODE_H / 2}
                    x2={cx}
                    y2={nextCy - NODE_H / 2 - 6}
                    stroke="var(--color-neon-blue)"
                    strokeWidth="1.5"
                    strokeOpacity="0.55"
                    markerEnd="url(#rjd-arrow)"
                  />
                )}

                {/* Node */}
                <rect
                  x={cx - NODE_W / 2}
                  y={cy - NODE_H / 2}
                  width={NODE_W}
                  height={NODE_H}
                  rx={6}
                  fill="rgba(0,212,255,0.05)"
                  stroke="var(--color-neon-blue)"
                  strokeOpacity="0.4"
                  strokeWidth="1.2"
                />

                {/* Step number */}
                <text
                  x={cx - NODE_W / 2 + 14}
                  y={cy + 4}
                  fontFamily="var(--font-mono)"
                  fontSize="10"
                  fill="var(--color-neon-cyan)"
                  textAnchor="start"
                >
                  {String(i + 1).padStart(2, "0")}
                </text>

                {/* Label */}
                <text
                  x={cx + 8}
                  y={cy + 5}
                  fontFamily="var(--font-display)"
                  fontSize="13"
                  letterSpacing="0.04em"
                  fill="var(--color-text-primary)"
                  textAnchor="middle"
                >
                  {step.label.toUpperCase()}
                </text>
              </g>
            );
          })}
        </svg>
      </div>

      <figcaption
        style={{
          fontFamily: "var(--font-mono)",
          fontSize: 10,
          letterSpacing: "0.08em",
          color: "var(--color-text-muted)",
          textAlign: "center" as const,
          marginTop: 10,
        }}
      >
        Request journey — from user device to storage
      </figcaption>
    </figure>
  );
}
