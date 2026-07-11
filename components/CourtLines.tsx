/**
 * Abstract handball court markings (goal area + free-throw arcs) used as a
 * decorative backdrop. Purely presentational.
 */
export default function CourtLines({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 900 600"
      fill="none"
      aria-hidden
      className={className}
      preserveAspectRatio="xMaxYMid slice"
    >
      {/* 6m goal-area arc */}
      <path
        d="M900 60 A 340 340 0 0 0 900 540"
        stroke="rgba(255,255,255,0.09)"
        strokeWidth="3"
      />
      {/* 9m free-throw arc (dashed, like the real court) */}
      <path
        d="M900 -40 A 460 460 0 0 0 900 640"
        stroke="rgba(255,255,255,0.06)"
        strokeWidth="3"
        strokeDasharray="28 22"
      />
      {/* Goal line */}
      <line
        x1="898"
        y1="150"
        x2="898"
        y2="450"
        stroke="rgba(235,44,47,0.55)"
        strokeWidth="5"
      />
      {/* 7m penalty mark */}
      <line
        x1="620"
        y1="285"
        x2="620"
        y2="315"
        stroke="rgba(255,255,255,0.16)"
        strokeWidth="4"
      />
      {/* Centre-court hint, far left */}
      <line
        x1="40"
        y1="0"
        x2="40"
        y2="600"
        stroke="rgba(255,255,255,0.05)"
        strokeWidth="2"
      />
      <circle cx="40" cy="300" r="90" stroke="rgba(255,255,255,0.05)" strokeWidth="2" />
    </svg>
  );
}
