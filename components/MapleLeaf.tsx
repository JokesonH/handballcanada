/**
 * Stylized maple leaf used as a decorative motif (hero backdrop, separators).
 * Intentionally simplified — not the official flag leaf.
 */
export default function MapleLeaf({
  className = "",
  stroke = "rgba(255,255,255,0.09)",
  fill = "none",
}: {
  className?: string;
  stroke?: string;
  fill?: string;
}) {
  return (
    <svg viewBox="-100 -105 200 195" aria-hidden className={className}>
      <path
        d="M0 -100 L12 -62 L38 -80 L30 -42 L68 -54 L48 -18 L88 -8 L52 10 L66 40 L26 28 L6 34 L6 86 L-6 86 L-6 34 L-26 28 L-66 40 L-52 10 L-88 -8 L-48 -18 L-68 -54 L-30 -42 L-38 -80 L-12 -62 Z"
        fill={fill}
        stroke={stroke}
        strokeWidth="2.5"
        strokeLinejoin="round"
      />
    </svg>
  );
}
