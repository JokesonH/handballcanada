"use client";

import { useState } from "react";
import PlayerCard from "@/components/PlayerCard";
import type { Squad } from "@/lib/content";
import type { Dictionary } from "@/lib/i18n";
import type { Locale } from "@/lib/locales";

type Props = {
  squad: Squad;
  locale: Locale;
  dict: Dictionary;
};

export default function SquadExplorer({ squad, locale, dict }: Props) {
  const [active, setActive] = useState<string | null>(null);

  const visibleGroups = active
    ? squad.groups.filter((group) => group.key === active)
    : squad.groups;

  return (
    <div>
      <div
        className="mb-10 flex flex-wrap gap-2"
        role="group"
        aria-label={dict.teams.squad}
      >
        <button
          type="button"
          onClick={() => setActive(null)}
          className={`kicker px-4 py-2.5 text-[0.7rem] transition-colors ${
            active === null
              ? "bg-hc-red text-white"
              : "border border-white/15 text-hc-mist hover:border-white/40 hover:text-white"
          }`}
        >
          {dict.teams.all}
        </button>
        {squad.groups.map((group) => (
          <button
            key={group.key}
            type="button"
            onClick={() => setActive(group.key === active ? null : group.key)}
            className={`kicker px-4 py-2.5 text-[0.7rem] transition-colors ${
              active === group.key
                ? "bg-hc-red text-white"
                : "border border-white/15 text-hc-mist hover:border-white/40 hover:text-white"
            }`}
          >
            {group.label[locale]}
          </button>
        ))}
      </div>

      {visibleGroups.map((group) => {
        const groupIndex = squad.groups.findIndex((g) => g.key === group.key);
        return (
          <section key={group.key} className="mb-12 last:mb-0">
            <h2 className="kicker mb-6 flex items-center gap-3 text-hc-red">
              <span className="h-px w-8 bg-hc-red" aria-hidden />
              {group.label[locale]}
              <span className="text-hc-steel">({group.players.length})</span>
            </h2>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-4 lg:gap-6">
              {group.players.map((player) => (
                <PlayerCard
                  key={`${group.key}-${player.number}`}
                  player={player}
                  groupIndex={groupIndex}
                  locale={locale}
                  dict={dict}
                />
              ))}
            </div>
          </section>
        );
      })}
    </div>
  );
}
