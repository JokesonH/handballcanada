import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import PageHero from "@/components/PageHero";
import SquadExplorer from "@/components/SquadExplorer";
import { getTeam, getTeams } from "@/lib/content";
import { getDictionary, isLocale } from "@/lib/i18n";

export function generateStaticParams() {
  return getTeams()
    .filter((team) => team.squad)
    .map((team) => ({ slug: team.slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/[locale]/teams/[slug]/squad">): Promise<Metadata> {
  const { locale, slug } = await params;
  if (!isLocale(locale)) return {};
  const team = getTeam(slug);
  if (!team?.squad) return {};
  const dict = await getDictionary(locale);
  return {
    title: `${team.name[locale]} — ${dict.teams.squad}`,
    description: team.summary[locale],
  };
}

export default async function SquadPage({
  params,
}: PageProps<"/[locale]/teams/[slug]/squad">) {
  const { locale, slug } = await params;
  if (!isLocale(locale)) notFound();
  const team = getTeam(slug);
  if (!team?.squad) notFound();
  const dict = await getDictionary(locale);

  return (
    <>
      <PageHero
        kicker={`${team.name[locale]} · ${dict.teams.season} ${team.squad.season}`}
        title={dict.teams.squad}
        subtitle={team.summary[locale]}
        ghost={team.code}
      />

      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
        <SquadExplorer
          squad={team.squad}
          teamSlug={team.slug}
          locale={locale}
          dict={dict}
        />

        <p className="mt-12 border border-dashed border-white/20 p-5 text-sm text-hc-mist">
          {dict.teams.rosterTbd}
        </p>

        <Link
          href={`/${locale}/teams/${team.slug}`}
          className="kicker mt-8 inline-flex items-center gap-2 text-hc-mist transition-colors hover:text-white"
        >
          <span aria-hidden className="text-hc-red">←</span>
          {dict.teams.backToTeam}
        </Link>
      </div>
    </>
  );
}
