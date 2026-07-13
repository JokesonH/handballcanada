"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import type { MatchItem } from "@/lib/content";
import type { Dictionary } from "@/lib/i18n";
import type { Locale } from "@/lib/locales";

type Props = {
  matches: MatchItem[];
  locale: Locale;
  dict: Dictionary;
};

function TeamBlock({ code, label }: { code: string; label: string }) {
  return (
    <div className="flex flex-col items-center gap-2">
      <span className="display-title flex h-14 w-14 items-center justify-center border border-white/15 bg-hc-ink text-lg text-white sm:h-16 sm:w-16 sm:text-xl">
        {code}
      </span>
      <span className="hidden max-w-24 text-center text-xs text-hc-steel sm:block">
        {label}
      </span>
    </div>
  );
}

export default function MatchExplorer({ matches, locale, dict }: Props) {
  const [tab, setTab] = useState<"upcoming" | "results">("upcoming");
  const [competition, setCompetition] = useState<string | null>(null);

  const competitions = useMemo(
    () => [...new Set(matches.map((match) => match.competition.en))],
    [matches]
  );

  const visible = matches.filter(
    (match) =>
      (tab === "results" ? match.score !== null : match.score === null) &&
      (competition === null || match.competition.en === competition)
  );

  const chip = (active: boolean) =>
    `kicker px-4 py-2.5 text-[0.7rem] transition-colors ${
      active
        ? "bg-hc-red text-white"
        : "border border-white/15 text-hc-mist hover:border-white/40 hover:text-white"
    }`;

  return (
    <div>
      <div className="mb-4 flex gap-2" role="tablist" aria-label={dict.matches.title}>
        {(["upcoming", "results"] as const).map((key) => (
          <button
            key={key}
            type="button"
            role="tab"
            aria-selected={tab === key}
            onClick={() => setTab(key)}
            className={chip(tab === key)}
          >
            {dict.matches[key]}
          </button>
        ))}
      </div>

      {competitions.length > 1 && (
        <div className="mb-8 flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => setCompetition(null)}
            className={chip(competition === null)}
          >
            {dict.matches.allCompetitions}
          </button>
          {competitions.map((name) => {
            const localized = matches.find((m) => m.competition.en === name)!
              .competition[locale];
            return (
              <button
                key={name}
                type="button"
                onClick={() => setCompetition(name === competition ? null : name)}
                className={chip(competition === name)}
              >
                {localized}
              </button>
            );
          })}
        </div>
      )}

      {visible.length === 0 ? (
        <p className="border border-dashed border-white/20 p-8 text-center text-sm text-hc-mist">
          {tab === "upcoming"
            ? dict.matches.emptyUpcoming
            : dict.matches.emptyResults}
        </p>
      ) : (
        <ul className="space-y-4">
          {visible.map((match) => {
            const row = (
              <div className="grid items-center gap-6 border border-white/10 bg-hc-ink/60 p-6 transition-colors hover:border-hc-red sm:grid-cols-[1fr_auto_1fr]">
                <div>
                  <p className="kicker text-[0.65rem] text-hc-red-bright">
                    {match.competition[locale]}
                  </p>
                  <p className="mt-1 text-xs text-hc-steel">
                    {match.stage[locale]}
                  </p>
                </div>

                <div className="flex items-start justify-center gap-5">
                  <TeamBlock code={match.home.code} label={match.home.name[locale]} />
                  <span className="display-title mt-4 text-xl text-hc-red">
                    {match.score
                      ? `${match.score.home} – ${match.score.away}`
                      : "VS"}
                  </span>
                  <TeamBlock
                    code={match.away?.code ?? "—"}
                    label={match.away?.name[locale] ?? dict.matches.tbd}
                  />
                </div>

                <div className="text-left sm:text-right">
                  <p className="text-sm font-medium text-white">
                    {match.dateLabel[locale]}
                  </p>
                  <p className="mt-1 text-xs text-hc-steel">{match.venue[locale]}</p>
                </div>
              </div>
            );
            return (
              <li key={match.id}>
                {match.href ? (
                  <Link href={`/${locale}${match.href}`} className="block">
                    {row}
                  </Link>
                ) : (
                  row
                )}
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
