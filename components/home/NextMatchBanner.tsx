import Link from "next/link";
import Countdown from "@/components/Countdown";
import type { MatchItem } from "@/lib/content";
import type { Dictionary } from "@/lib/i18n";
import type { Locale } from "@/lib/locales";

type Props = {
  match: MatchItem;
  locale: Locale;
  dict: Dictionary;
};

/** PSG-style "next match" band with a live countdown. */
export default function NextMatchBanner({ match, locale, dict }: Props) {
  if (!match.startsAt) return null;

  return (
    <section className="border-b border-white/10 bg-hc-ink">
      <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-6 px-4 py-6 sm:px-6 lg:flex-row lg:items-center lg:px-8">
        <div>
          <p className="kicker flex items-center gap-3 text-[0.65rem] text-hc-red-bright">
            <span className="h-px w-8 bg-hc-red" aria-hidden />
            {dict.matches.nextMatch}
          </p>
          <div className="mt-2 flex items-center gap-4">
            <span className="display-title text-3xl text-white">
              {match.home.code}
            </span>
            <span className="display-title text-base text-hc-red">VS</span>
            <span className="display-title text-3xl text-hc-mist">
              {match.away?.code ?? dict.matches.tbd}
            </span>
          </div>
          <p className="mt-1 text-xs text-hc-steel">
            {match.competition[locale]} · {match.venue[locale]} ·{" "}
            {match.dateLabel[locale]}
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-6 lg:gap-10">
          <Countdown target={match.startsAt} dict={dict} />
          <Link
            href={`/${locale}/competitions/fixtures`}
            className="kicker bg-hc-red px-6 py-3.5 text-[0.7rem] text-white transition-colors hover:bg-hc-red-dark"
          >
            {dict.matches.fullSchedule}
          </Link>
        </div>
      </div>
    </section>
  );
}
