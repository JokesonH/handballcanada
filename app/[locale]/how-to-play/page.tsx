import type { Metadata } from "next";
import { notFound } from "next/navigation";
import PageHero from "@/components/PageHero";
import PageSections from "@/components/PageSections";
import { getPage } from "@/lib/content";
import { getDictionary, isLocale } from "@/lib/i18n";

export async function generateMetadata({
  params,
}: PageProps<"/[locale]/how-to-play">): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const page = getPage("how-to-play");
  return { title: page.title[locale], description: page.subtitle?.[locale] };
}

export default async function HowToPlayPage({
  params,
}: PageProps<"/[locale]/how-to-play">) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const dict = await getDictionary(locale);
  const page = getPage("how-to-play");

  return (
    <>
      <PageHero
        kicker={dict.meta.siteName}
        title={page.title[locale]}
        subtitle={page.subtitle?.[locale]}
        ghost={page.ghost}
      />
      <PageSections page={page} locale={locale} />
    </>
  );
}
