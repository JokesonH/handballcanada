import type { SquadPlayer } from "@/lib/content";
import type { Dictionary } from "@/lib/i18n";
import type { Locale } from "@/lib/locales";

type Props = {
  player: SquadPlayer;
  groupIndex: number;
  locale: Locale;
  dict: Dictionary;
};

const groupGradients = [
  "from-hc-maple via-hc-maple-deep to-hc-night",
  "from-hc-maple-soft via-hc-ink to-hc-night",
  "from-hc-red-dark via-hc-maple-deep to-hc-night",
  "from-hc-maple via-hc-ink to-hc-night",
];

/** Simple jersey silhouette shown while a slot has no player photo. */
function Jersey({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 120 110" fill="none" aria-hidden className={className}>
      <path
        d="M38 8 L60 16 L82 8 L112 26 L100 48 L88 42 L88 104 L32 104 L32 42 L20 48 L8 26 Z"
        fill="rgba(255,255,255,0.06)"
        stroke="rgba(255,255,255,0.14)"
        strokeWidth="2"
      />
      <path d="M46 10 a14 9 0 0 0 28 0" stroke="rgba(255,255,255,0.14)" strokeWidth="2" />
    </svg>
  );
}

export default function PlayerCard({ player, groupIndex, locale, dict }: Props) {
  const named = player.name !== null;

  return (
    <article
      className={`group relative flex aspect-[3/4] flex-col justify-end overflow-hidden border border-white/10 bg-gradient-to-b p-4 transition-all hover:-translate-y-1 hover:border-hc-red ${groupGradients[groupIndex % groupGradients.length]}`}
    >
      <span aria-hidden className="absolute left-0 top-0 h-10 w-1 bg-hc-red" />
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/10 to-transparent transition-transform duration-700 group-hover:translate-x-full"
      />
      <span
        aria-hidden
        className="ghost-text absolute -right-1 -top-3 text-7xl leading-none sm:text-8xl"
      >
        {player.number}
      </span>
      <Jersey className="absolute left-1/2 top-1/2 w-24 -translate-x-1/2 -translate-y-1/2 sm:w-28" />

      <div className="relative">
        <p className="display-title text-sm text-hc-red-bright">#{player.number}</p>
        {named ? (
          <h3 className="display-title mt-1 text-xl leading-tight text-white">
            {player.name}
          </h3>
        ) : (
          <h3 className="display-title mt-1 text-xl leading-tight text-hc-steel">
            {dict.teams.tba}
          </h3>
        )}
        <p className="kicker mt-2 text-[0.6rem] text-hc-mist">
          {player.position[locale]}
        </p>
        {player.club && <p className="mt-1 text-xs text-hc-steel">{player.club}</p>}
      </div>
    </article>
  );
}
