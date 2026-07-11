import type { Metadata } from "next";
import { notFound } from "next/navigation";
import PageHero from "@/components/PageHero";
import PageSections from "@/components/PageSections";
import { getPage } from "@/lib/content";
import { getDictionary, isLocale } from "@/lib/i18n";

export async function generateMetadata({
  params,
}: PageProps<"/[locale]/competitions/national-championships">): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const page = getPage("national-championships");
  return { title: page.title[locale], description: page.subtitle?.[locale] };
}

export default async function NationalChampionshipsPage({
  params,
}: PageProps<"/[locale]/competitions/national-championships">) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const dict = await getDictionary(locale);
  const page = getPage("national-championships");

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
