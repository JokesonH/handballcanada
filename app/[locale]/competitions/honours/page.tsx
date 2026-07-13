import type { Metadata } from "next";
import { notFound } from "next/navigation";
import MapleLeaf from "@/components/MapleLeaf";
import PageHero from "@/components/PageHero";
import { getHonours } from "@/lib/content";
import { getDictionary, isLocale } from "@/lib/i18n";

export async function generateMetadata({
  params,
}: PageProps<"/[locale]/competitions/honours">): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const dict = await getDictionary(locale);
  return { title: dict.honours.title, description: dict.honours.subtitle };
}

export default async function HonoursPage({
  params,
}: PageProps<"/[locale]/competitions/honours">) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const dict = await getDictionary(locale);
  const honours = getHonours();

  return (
    <>
      <PageHero
        kicker={dict.competitions.title}
        title={dict.honours.title}
        subtitle={dict.honours.subtitle}
        ghost="1962"
      />

      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
        <h2 className="kicker mb-8 flex items-center gap-3 text-hc-red">
          <span className="h-px w-8 bg-hc-red" aria-hidden />
          {dict.honours.milestones}
        </h2>
        <div className="reveal grid gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6">
          {honours.milestones.map((milestone) => (
            <article
              key={milestone.year}
              className="group relative flex min-h-56 flex-col justify-end overflow-hidden border border-white/10 bg-gradient-to-b from-hc-maple via-hc-maple-deep to-hc-night p-6 transition-all hover:-translate-y-1 hover:border-hc-red"
            >
              <span
                aria-hidden
                className="ghost-text absolute -right-3 -top-6 text-[7rem] leading-none"
              >
                {milestone.year}
              </span>
              <MapleLeaf
                className="absolute left-5 top-5 h-8 w-8"
                stroke="none"
                fill="rgba(235,44,47,0.7)"
              />
              <div className="relative">
                <p className="display-title text-4xl text-hc-red-bright">
                  {milestone.year}
                </p>
                <h3 className="display-title mt-2 text-2xl text-white">
                  {milestone.title[locale]}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-hc-mist">
                  {milestone.detail[locale]}
                </p>
              </div>
            </article>
          ))}
        </div>

        <h2 className="kicker mb-6 mt-16 flex items-center gap-3 text-hc-red">
          <span className="h-px w-8 bg-hc-red" aria-hidden />
          {dict.honours.rollOfHonour}
        </h2>
        {honours.rollOfHonour.entries.length > 0 ? (
          <table className="w-full border-collapse text-sm">
            <thead>
              <tr className="border-b border-white/20 text-left">
                <th className="kicker py-3 pr-4 text-[0.65rem] text-hc-steel">
                  {dict.competitions.year}
                </th>
                <th className="kicker py-3 pr-4 text-[0.65rem] text-hc-steel">
                  {dict.honours.men}
                </th>
                <th className="kicker py-3 text-[0.65rem] text-hc-steel">
                  {dict.honours.women}
                </th>
              </tr>
            </thead>
            <tbody>
              {honours.rollOfHonour.entries.map((entry) => (
                <tr key={entry.year} className="border-b border-white/10">
                  <td className="display-title py-3 pr-4 text-hc-red">{entry.year}</td>
                  <td className="py-3 pr-4 text-white">{entry.men}</td>
                  <td className="py-3 text-white">{entry.women}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p className="border border-dashed border-white/20 p-6 text-sm text-hc-mist">
            {honours.rollOfHonour.note[locale]}
          </p>
        )}
      </div>
    </>
  );
}
