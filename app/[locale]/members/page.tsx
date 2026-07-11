import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import PageHero from "@/components/PageHero";
import PageSections from "@/components/PageSections";
import site from "@/content/site.json";
import { getPage } from "@/lib/content";
import { getDictionary, isLocale } from "@/lib/i18n";

export async function generateMetadata({
  params,
}: PageProps<"/[locale]/members">): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const page = getPage("members");
  return { title: page.title[locale], description: page.subtitle?.[locale] };
}

export default async function MembersPage({
  params,
}: PageProps<"/[locale]/members">) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const dict = await getDictionary(locale);
  const page = getPage("members");

  return (
    <>
      <PageHero
        kicker={dict.meta.siteName}
        title={page.title[locale]}
        subtitle={page.subtitle?.[locale]}
        ghost={page.ghost}
      />
      <PageSections page={page} locale={locale} />

      <div className="mx-auto max-w-7xl px-4 pb-16 sm:px-6 lg:px-8">
        <h2 className="kicker mb-6 flex items-center gap-3 text-hc-red">
          <span className="h-px w-8 bg-hc-red" aria-hidden />
          {dict.footer.memberFederations}
        </h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6">
          {site.memberFederations.map((federation) => (
            <div
              key={federation.province}
              className="group relative flex min-h-36 flex-col justify-between overflow-hidden border border-white/10 bg-hc-ink p-6 transition-colors hover:border-hc-red"
            >
              <span aria-hidden className="ghost-text absolute -right-2 -top-6 text-8xl">
                {federation.province}
              </span>
              <h3 className="display-title relative max-w-56 text-xl text-white">
                {federation[locale as "en" | "fr"]}
              </h3>
              <p className="kicker relative mt-4 text-[0.65rem] text-hc-steel">
                {federation.province}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-12 border border-white/10 bg-hc-navy-deep p-8 sm:p-10">
          <h2 className="display-title text-2xl text-white sm:text-3xl">
            {dict.home.getInvolved}
          </h2>
          <p className="mt-3 max-w-xl text-sm text-hc-mist">
            {dict.home.getInvolvedSub}
          </p>
          <Link
            href={`/${locale}/registration`}
            className="kicker mt-6 inline-block bg-hc-red px-7 py-4 text-white transition-colors hover:bg-hc-red-dark"
          >
            {dict.nav.register}
          </Link>
        </div>
      </div>
    </>
  );
}
