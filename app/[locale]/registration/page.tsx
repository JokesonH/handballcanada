import type { Metadata } from "next";
import { notFound } from "next/navigation";
import PageHero from "@/components/PageHero";
import PageSections from "@/components/PageSections";
import { getPage } from "@/lib/content";
import { getDictionary, isLocale } from "@/lib/i18n";

export async function generateMetadata({
  params,
}: PageProps<"/[locale]/registration">): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const page = getPage("registration");
  return { title: page.title[locale], description: page.subtitle?.[locale] };
}

export default async function RegistrationPage({
  params,
}: PageProps<"/[locale]/registration">) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const dict = await getDictionary(locale);
  const page = getPage("registration");

  return (
    <>
      <PageHero
        kicker={dict.nav.register}
        title={page.title[locale]}
        subtitle={page.subtitle?.[locale]}
        ghost={page.ghost}
      />
      <PageSections page={page} locale={locale} />
      <p className="mx-auto -mt-8 max-w-4xl px-4 pb-16 text-xs text-hc-steel sm:px-6 lg:px-8">
        {dict.common.externalRegistration}
      </p>
    </>
  );
}
