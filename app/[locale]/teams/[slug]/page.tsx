import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import PageHero from "@/components/PageHero";
import { getTeam, getTeams } from "@/lib/content";
import { getDictionary, isLocale } from "@/lib/i18n";

export function generateStaticParams() {
  return getTeams().map((team) => ({ slug: team.slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/[locale]/teams/[slug]">): Promise<Metadata> {
  const { locale, slug } = await params;
  if (!isLocale(locale)) return {};
  const team = getTeam(slug);
  if (!team) return {};
  return { title: team.name[locale], description: team.summary[locale] };
}

export default async function TeamPage({
  params,
}: PageProps<"/[locale]/teams/[slug]">) {
  const { locale, slug } = await params;
  if (!isLocale(locale)) notFound();
  const team = getTeam(slug);
  if (!team) notFound();
  const dict = await getDictionary(locale);

  const others = getTeams().filter((other) => other.slug !== team.slug);

  return (
    <>
      <PageHero
        kicker={`${dict.teams.title} · ${
          team.discipline === "indoor" ? dict.teams.indoor : dict.teams.beach
        }`}
        title={team.name[locale]}
        subtitle={team.summary[locale]}
        ghost={team.code}
      />

      <div className="mx-auto grid max-w-7xl gap-12 px-4 py-12 sm:px-6 lg:grid-cols-[2fr_1fr] lg:px-8 lg:py-16">
        <div>
          {team.highlight && (
            <p className="mb-8 border-l-2 border-hc-red bg-hc-ink p-5 text-white">
              <span className="kicker mb-1 block text-[0.65rem] text-hc-red-bright">
                {dict.events.upcoming}
              </span>
              {team.highlight[locale]}
            </p>
          )}

          <h2 className="display-title mb-5 text-2xl text-white sm:text-3xl">
            {dict.teams.program}
          </h2>
          <div className="space-y-5">
            {team.program[locale].map((paragraph, i) => (
              <p key={i} className="leading-relaxed text-hc-mist">
                {paragraph}
              </p>
            ))}
          </div>

          <h2 className="display-title mb-5 mt-12 text-2xl text-white sm:text-3xl">
            {dict.teams.roster}
          </h2>
          {team.squad ? (
            <Link
              href={`/${locale}/teams/${team.slug}/squad`}
              className="group flex items-center justify-between border border-white/10 bg-hc-ink px-6 py-5 transition-colors hover:border-hc-red"
            >
              <span>
                <span className="kicker block text-[0.65rem] text-hc-steel">
                  {dict.teams.season} {team.squad.season}
                </span>
                <span className="display-title mt-1 block text-xl text-white transition-colors group-hover:text-hc-red-bright">
                  {dict.teams.viewSquad}
                </span>
              </span>
              <span
                aria-hidden
                className="text-2xl text-hc-red transition-transform group-hover:translate-x-2"
              >
                →
              </span>
            </Link>
          ) : team.roster.length > 0 ? (
            <table className="w-full border-collapse text-sm">
              <thead>
                <tr className="border-b border-white/20 text-left">
                  <th className="kicker py-3 pr-4 text-[0.65rem] text-hc-steel">
                    {dict.teams.number}
                  </th>
                  <th className="kicker py-3 pr-4 text-[0.65rem] text-hc-steel">
                    {dict.teams.name}
                  </th>
                  <th className="kicker py-3 pr-4 text-[0.65rem] text-hc-steel">
                    {dict.teams.position}
                  </th>
                  <th className="kicker py-3 text-[0.65rem] text-hc-steel">
                    {dict.teams.club}
                  </th>
                </tr>
              </thead>
              <tbody>
                {team.roster.map((player) => (
                  <tr key={player.number} className="border-b border-white/10">
                    <td className="display-title py-3 pr-4 text-hc-red">
                      {player.number}
                    </td>
                    <td className="py-3 pr-4 font-medium text-white">{player.name}</td>
                    <td className="py-3 pr-4 text-hc-mist">{player.position}</td>
                    <td className="py-3 text-hc-mist">{player.club}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p className="border border-dashed border-white/20 p-5 text-sm text-hc-mist">
              {dict.teams.rosterTbd}
            </p>
          )}
        </div>

        <aside>
          <h2 className="kicker mb-5 flex items-center gap-3 text-hc-red">
            <span className="h-px w-8 bg-hc-red" aria-hidden />
            {dict.teams.title}
          </h2>
          <ul className="space-y-2">
            {others.map((other) => (
              <li key={other.slug}>
                <Link
                  href={`/${locale}/teams/${other.slug}`}
                  className="group flex items-center justify-between border border-white/10 bg-hc-ink px-4 py-3 transition-colors hover:border-hc-red"
                >
                  <span className="text-sm text-hc-mist transition-colors group-hover:text-white">
                    {other.name[locale]}
                  </span>
                  <span className="display-title text-sm text-hc-steel transition-colors group-hover:text-hc-red">
                    {other.code}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </aside>
      </div>
    </>
  );
}
