import type { Metadata } from "next";
import { notFound } from "next/navigation";
import MatchExplorer from "@/components/MatchExplorer";
import PageHero from "@/components/PageHero";
import { getMatches } from "@/lib/content";
import { getDictionary, isLocale } from "@/lib/i18n";

export async function generateMetadata({
  params,
}: PageProps<"/[locale]/competitions/fixtures">): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const dict = await getDictionary(locale);
  return { title: dict.matches.title, description: dict.matches.subtitle };
}

export default async function FixturesPage({
  params,
}: PageProps<"/[locale]/competitions/fixtures">) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const dict = await getDictionary(locale);
  const matches = getMatches();

  return (
    <>
      <PageHero
        kicker={dict.competitions.title}
        title={dict.matches.title}
        subtitle={dict.matches.subtitle}
        ghost="Match"
      />
      <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
        <MatchExplorer matches={matches} locale={locale} dict={dict} />
      </div>
    </>
  );
}
