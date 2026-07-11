import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import PageHero from "@/components/PageHero";
import { getTeams } from "@/lib/content";
import { getDictionary, isLocale } from "@/lib/i18n";

export async function generateMetadata({
  params,
}: PageProps<"/[locale]/teams">): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const dict = await getDictionary(locale);
  return { title: dict.teams.title, description: dict.teams.subtitle };
}

export default async function TeamsPage({ params }: PageProps<"/[locale]/teams">) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const dict = await getDictionary(locale);
  const teams = getTeams();

  const disciplines = [
    { key: "indoor" as const, label: dict.teams.indoor },
    { key: "beach" as const, label: dict.teams.beach },
  ];

  return (
    <>
      <PageHero
        kicker={dict.meta.siteName}
        title={dict.teams.title}
        subtitle={dict.teams.subtitle}
        ghost="Teams"
      />
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
        {disciplines.map((discipline) => {
          const group = teams.filter((team) => team.discipline === discipline.key);
          if (group.length === 0) return null;
          return (
            <section key={discipline.key} className="mb-14 last:mb-0">
              <h2 className="kicker mb-6 flex items-center gap-3 text-hc-red">
                <span className="h-px w-8 bg-hc-red" aria-hidden />
                {discipline.label}
              </h2>
              <div className="grid gap-4 sm:grid-cols-2 lg:gap-6">
                {group.map((team) => (
                  <Link
                    key={team.slug}
                    href={`/${locale}/teams/${team.slug}`}
                    className="group relative flex min-h-44 flex-col justify-between overflow-hidden border border-white/10 bg-hc-ink p-6 transition-all hover:-translate-y-1 hover:border-hc-red"
                  >
                    <span
                      aria-hidden
                      className="ghost-text absolute -right-3 -top-4 text-8xl"
                    >
                      {team.code}
                    </span>
                    <div className="relative">
                      <p className="kicker text-[0.65rem] text-hc-steel">
                        {team.ageGroup[locale]}
                      </p>
                      <h3 className="display-title mt-2 text-3xl text-white transition-colors group-hover:text-hc-red-bright">
                        {team.name[locale]}
                      </h3>
                    </div>
                    <span className="kicker relative mt-6 flex items-center gap-2 text-[0.65rem] text-hc-steel transition-colors group-hover:text-white">
                      {dict.teams.viewTeam}
                      <span
                        aria-hidden
                        className="text-hc-red transition-transform group-hover:translate-x-1"
                      >
                        →
                      </span>
                    </span>
                  </Link>
                ))}
              </div>
            </section>
          );
        })}
      </div>
    </>
  );
}
