import type { Metadata } from "next";
import { notFound } from "next/navigation";
import PageHero from "@/components/PageHero";
import PageSections from "@/components/PageSections";
import site from "@/content/site.json";
import { getPage } from "@/lib/content";
import { getDictionary, isLocale } from "@/lib/i18n";

export async function generateMetadata({
  params,
}: PageProps<"/[locale]/contact">): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const page = getPage("contact");
  return { title: page.title[locale], description: page.subtitle?.[locale] };
}

export default async function ContactPage({
  params,
}: PageProps<"/[locale]/contact">) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const dict = await getDictionary(locale);
  const page = getPage("contact");

  return (
    <>
      <PageHero
        kicker={dict.meta.siteName}
        title={page.title[locale]}
        subtitle={page.subtitle?.[locale]}
        ghost={page.ghost}
      />
      <PageSections page={page} locale={locale} />
      <div className="mx-auto max-w-4xl px-4 pb-16 sm:px-6 lg:px-8">
        <h2 className="kicker mb-4 flex items-center gap-3 text-hc-red">
          <span className="h-px w-8 bg-hc-red" aria-hidden />
          {dict.footer.followUs}
        </h2>
        <div className="flex flex-wrap gap-3">
          {site.socials.map((social) => (
            <a
              key={social.name}
              href={social.url}
              target="_blank"
              rel="noopener noreferrer"
              className="kicker border border-white/15 px-5 py-3 text-[0.7rem] text-hc-mist transition-colors hover:border-hc-red hover:text-white"
            >
              {social.name}
            </a>
          ))}
        </div>
      </div>
    </>
  );
}
