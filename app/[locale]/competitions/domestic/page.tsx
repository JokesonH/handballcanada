import type { Metadata } from "next";
import { notFound } from "next/navigation";
import PageHero from "@/components/PageHero";
import PageSections from "@/components/PageSections";
import { getPage } from "@/lib/content";
import { getDictionary, isLocale } from "@/lib/i18n";

export async function generateMetadata({
  params,
}: PageProps<"/[locale]/competitions/domestic">): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const page = getPage("domestic-competitions");
  return { title: page.title[locale], description: page.subtitle?.[locale] };
}

export default async function DomesticCompetitionsPage({
  params,
}: PageProps<"/[locale]/competitions/domestic">) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const dict = await getDictionary(locale);
  const page = getPage("domestic-competitions");

  return (
    <>
      <PageHero
        kicker={dict.competitions.title}
        title={page.title[locale]}
        subtitle={page.subtitle?.[locale]}
        ghost={page.ghost}
      />
      <PageSections page={page} locale={locale} />
    </>
  );
}
