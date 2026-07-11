import Link from "next/link";
import CourtLines from "@/components/CourtLines";
import { formatDate, type NewsItem } from "@/lib/content";
import type { Dictionary } from "@/lib/i18n";
import type { Locale } from "@/lib/locales";

type Props = {
  item: NewsItem;
  locale: Locale;
  dict: Dictionary;
};

export default function Hero({ item, locale, dict }: Props) {
  const text = item[locale];

  return (
    <section className="relative overflow-hidden bg-hc-navy-deep">
      {/* Layered backdrop: gradient wash, court markings, ghost wordmark */}
      <div
        className="absolute inset-0 bg-gradient-to-br from-hc-navy via-hc-navy-deep to-hc-night"
        aria-hidden
      />
      <CourtLines className="absolute inset-y-0 right-0 h-full w-[70%] opacity-90" />
      <span
        aria-hidden
        className="ghost-text absolute -left-4 top-6 text-[18vw] leading-none lg:text-[11rem]"
      >
        Canada
      </span>
      {/* Diagonal red blade, PSG-style accent */}
      <div
        aria-hidden
        className="absolute -right-24 top-0 h-[130%] w-40 -rotate-12 bg-gradient-to-b from-hc-red to-hc-red-dark opacity-90"
      />

      <div className="relative mx-auto flex min-h-[72vh] max-w-7xl flex-col justify-end px-4 pb-16 pt-40 sm:px-6 lg:px-8 lg:pb-20">
        <p className="kicker flex items-center gap-3 text-hc-red-bright">
          <span className="h-px w-10 bg-hc-red" aria-hidden />
          {dict.home.heroKicker} · {dict.categories[item.category]}
        </p>
        <h1 className="display-title mt-4 max-w-4xl text-4xl text-white sm:text-6xl lg:text-7xl">
          {text.title}
        </h1>
        <p className="mt-6 max-w-2xl text-base leading-relaxed text-hc-mist sm:text-lg">
          {text.excerpt}
        </p>
        <div className="mt-8 flex flex-wrap items-center gap-5">
          <Link
            href={`/${locale}/news/${item.slug}`}
            className="kicker bg-hc-red px-7 py-4 text-white transition-colors hover:bg-hc-red-dark"
          >
            {dict.home.heroCta}
          </Link>
          <time dateTime={item.date} className="text-sm text-hc-steel">
            {formatDate(item.date, locale)}
          </time>
        </div>
      </div>
    </section>
  );
}
