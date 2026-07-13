import Image from "next/image";
import Link from "next/link";
import MapleLeaf from "@/components/MapleLeaf";
import type { NewsItem } from "@/lib/content";
import { formatDate } from "@/lib/format";
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
    <section className="grain relative overflow-hidden bg-hc-maple-deep">
      {item.image && (
        <Image
          src={item.image}
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
      )}
      {/* Arena wash: maple red into night, under stadium lights */}
      <div
        className={`spotlight absolute inset-0 bg-gradient-to-br ${
          item.image
            ? "from-hc-night/75 via-hc-maple-deep/60 to-hc-night/90"
            : "from-hc-maple via-hc-maple-deep to-hc-night"
        }`}
        aria-hidden
      />
      {/* Giant leaf motif, cropped off the right edge */}
      <MapleLeaf
        className="rise-in absolute -right-24 top-1/2 h-[130%] w-auto -translate-y-1/2 rotate-12 sm:-right-16"
        stroke="rgba(255,255,255,0.10)"
        fill="rgba(14,11,12,0.25)"
      />
      <span
        aria-hidden
        className="ghost-text absolute -left-4 top-6 text-[18vw] leading-none lg:text-[11rem]"
      >
        Canada
      </span>
      {/* Flag blades: red with a snow-white pinstripe */}
      <div
        aria-hidden
        className="absolute -right-20 top-0 h-[130%] w-36 -rotate-12 bg-gradient-to-b from-hc-red to-hc-red-dark opacity-90"
      />
      <div
        aria-hidden
        className="absolute -right-24 top-0 h-[130%] w-2 -rotate-12 bg-hc-ice/70"
      />

      <div className="relative mx-auto flex min-h-[78vh] max-w-7xl flex-col justify-end px-4 pb-16 pt-40 sm:px-6 lg:px-8 lg:pb-20">
        <p
          className="kicker rise-in flex items-center gap-3 text-hc-red-bright"
          style={{ animationDelay: "0.05s" }}
        >
          <span className="h-px w-10 bg-hc-red" aria-hidden />
          {dict.home.heroKicker} · {dict.categories[item.category]}
        </p>
        <h1
          className="display-title rise-in mt-4 max-w-4xl text-4xl text-white sm:text-6xl lg:text-7xl"
          style={{ animationDelay: "0.15s" }}
        >
          {text.title}
        </h1>
        <p
          className="rise-in mt-6 max-w-2xl text-base leading-relaxed text-hc-mist sm:text-lg"
          style={{ animationDelay: "0.28s" }}
        >
          {text.excerpt}
        </p>
        <div
          className="rise-in mt-8 flex flex-wrap items-center gap-5"
          style={{ animationDelay: "0.4s" }}
        >
          <Link
            href={`/${locale}/news/${item.slug}`}
            className="kicker bg-hc-red px-7 py-4 text-white transition-all hover:-translate-y-0.5 hover:bg-hc-red-dark"
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
