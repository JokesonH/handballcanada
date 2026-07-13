import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import PageHero from "@/components/PageHero";
import EventsStrip from "@/components/home/EventsStrip";
import { getEvents, getPage } from "@/lib/content";
import { getDictionary, isLocale } from "@/lib/i18n";

export async function generateMetadata({
  params,
}: PageProps<"/[locale]/competitions">): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const dict = await getDictionary(locale);
  return { title: dict.competitions.title };
}

export default async function CompetitionsPage({
  params,
}: PageProps<"/[locale]/competitions">) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const dict = await getDictionary(locale);
  const events = getEvents();

  const nationals = getPage("national-championships");
  const domestic = getPage("domestic-competitions");
  const cards = [
    {
      href: `/${locale}/competitions/fixtures`,
      title: dict.matches.title,
      subtitle: dict.matches.subtitle,
      code: "VS",
    },
    {
      href: `/${locale}/competitions/national-championships`,
      title: nationals.title[locale],
      subtitle: nationals.subtitle?.[locale],
      code: "NC",
    },
    {
      href: `/${locale}/competitions/domestic`,
      title: domestic.title[locale],
      subtitle: domestic.subtitle?.[locale],
      code: "DC",
    },
    {
      href: `/${locale}/competitions/honours`,
      title: dict.honours.title,
      subtitle: dict.honours.subtitle,
      code: "62",
    },
  ];

  return (
    <>
      <PageHero
        kicker={dict.meta.siteName}
        title={dict.competitions.title}
        ghost="Compete"
      />
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
        <div className="grid gap-4 sm:grid-cols-2 lg:gap-6">
          {cards.map((card) => (
            <Link
              key={card.href}
              href={card.href}
              className="group relative flex min-h-52 flex-col justify-between overflow-hidden border border-white/10 bg-hc-ink p-7 transition-all hover:-translate-y-1 hover:border-hc-red"
            >
              <span aria-hidden className="ghost-text absolute -right-3 -top-5 text-9xl">
                {card.code}
              </span>
              <div className="relative">
                <h2 className="display-title text-3xl text-white transition-colors group-hover:text-hc-red-bright">
                  {card.title}
                </h2>
                {card.subtitle && (
                  <p className="mt-3 max-w-md text-sm leading-relaxed text-hc-mist">
                    {card.subtitle}
                  </p>
                )}
              </div>
              <span className="kicker relative mt-6 flex items-center gap-2 text-[0.65rem] text-hc-steel transition-colors group-hover:text-white">
                {dict.common.discover}
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
      </div>
      <EventsStrip events={events} locale={locale} dict={dict} />
    </>
  );
}
