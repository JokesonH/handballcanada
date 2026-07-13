import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import MapleLeaf from "@/components/MapleLeaf";
import { getTeam, getTeams, type SquadPlayer, type TeamItem } from "@/lib/content";
import { getDictionary, isLocale } from "@/lib/i18n";
import { locales } from "@/lib/locales";

export const dynamicParams = false;

/**
 * Profile pages exist only for named players — TBA slots never generate a
 * route. Pages appear automatically as squads are filled in content/teams.
 */
export function generateStaticParams() {
  return getTeams().flatMap((team) =>
    (team.squad?.groups ?? []).flatMap((group) =>
      group.players
        .filter((player) => player.name !== null)
        .map((player) => ({ slug: team.slug, player: String(player.number) }))
    )
  );
}

function findPlayer(
  team: TeamItem | undefined,
  number: string
): SquadPlayer | undefined {
  return team?.squad?.groups
    .flatMap((group) => group.players)
    .find((player) => String(player.number) === number && player.name !== null);
}

export async function generateMetadata({
  params,
}: PageProps<"/[locale]/teams/[slug]/players/[player]">): Promise<Metadata> {
  const { locale, slug, player: number } = await params;
  if (!isLocale(locale)) return {};
  const team = getTeam(slug);
  const player = findPlayer(team, number);
  if (!team || !player) return {};
  return {
    title: `${player.name} — ${team.name[locale]}`,
    description: `${player.position[locale]} · ${team.name[locale]}`,
  };
}

export default async function PlayerPage({
  params,
}: PageProps<"/[locale]/teams/[slug]/players/[player]">) {
  const { locale, slug, player: number } = await params;
  if (!isLocale(locale)) notFound();
  const team = getTeam(slug);
  const player = findPlayer(team, number);
  if (!team || !player) notFound();
  const dict = await getDictionary(locale);

  const facts = [
    { label: dict.teams.position, value: player.position[locale] },
    { label: dict.teams.club, value: player.club },
    { label: dict.teams.height, value: player.height },
    { label: dict.teams.birthplace, value: player.birthplace },
    {
      label: dict.teams.caps,
      value: player.caps !== undefined ? String(player.caps) : null,
    },
  ].filter((fact) => fact.value);

  return (
    <>
      <section className="grain relative overflow-hidden border-b border-white/10 bg-hc-maple-deep">
        <div
          className="spotlight absolute inset-0 bg-gradient-to-br from-hc-maple via-hc-maple-deep to-hc-night"
          aria-hidden
        />
        <span
          aria-hidden
          className="ghost-text absolute -right-4 bottom-0 text-[24vw] leading-none lg:text-[16rem]"
        >
          {player.number}
        </span>

        <div className="relative mx-auto grid max-w-7xl gap-8 px-4 pb-12 pt-20 sm:px-6 lg:grid-cols-[auto_1fr] lg:items-end lg:px-8 lg:pb-16 lg:pt-28">
          <div className="relative aspect-[3/4] w-48 overflow-hidden border border-white/15 bg-hc-ink sm:w-56">
            {player.photo ? (
              <Image
                src={player.photo}
                alt={player.name ?? ""}
                fill
                priority
                sizes="224px"
                className="object-cover object-top"
              />
            ) : (
              <MapleLeaf
                className="absolute left-1/2 top-1/2 h-24 w-24 -translate-x-1/2 -translate-y-1/2"
                stroke="rgba(255,255,255,0.2)"
              />
            )}
          </div>

          <div>
            <p className="kicker flex items-center gap-3 text-hc-red-bright">
              <span className="h-px w-10 bg-hc-red" aria-hidden />
              {dict.teams.profile} · {team.name[locale]}
            </p>
            <h1 className="display-title mt-3 text-5xl text-white sm:text-6xl">
              <span className="mr-4 text-hc-red">#{player.number}</span>
              {player.name}
            </h1>
            <p className="kicker mt-4 text-hc-mist">{player.position[locale]}</p>
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
        <dl className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
          {facts.map((fact) => (
            <div
              key={fact.label}
              className="border border-white/10 bg-hc-ink p-5"
            >
              <dt className="kicker text-[0.65rem] text-hc-steel">{fact.label}</dt>
              <dd className="display-title mt-2 text-2xl text-white">
                {fact.value}
              </dd>
            </div>
          ))}
        </dl>

        <Link
          href={`/${locale}/teams/${team.slug}/squad`}
          className="kicker mt-10 inline-flex items-center gap-2 text-hc-mist transition-colors hover:text-white"
        >
          <span aria-hidden className="text-hc-red">←</span>
          {dict.teams.backToSquad}
        </Link>
      </div>
    </>
  );
}
