import Link from "next/link";
import MapleLeaf from "@/components/MapleLeaf";
import type { NewsItem } from "@/lib/content";
import type { Dictionary } from "@/lib/i18n";
import type { Locale } from "@/lib/locales";

type Props = {
  items: NewsItem[];
  locale: Locale;
  dict: Dictionary;
};

/** PSG-style scrolling headline band. Pauses on hover. */
export default function Ticker({ items, locale, dict }: Props) {
  return (
    <div className="relative overflow-hidden border-y border-hc-red-dark bg-hc-red">
      <div className="marquee-track flex w-max">
        {[0, 1].map((dup) => (
          <div
            key={dup}
            aria-hidden={dup === 1}
            className="flex items-center gap-8 pr-8"
          >
            <span className="kicker ml-8 shrink-0 text-[0.65rem] text-white/70">
              {dict.home.tickerLabel}
            </span>
            {items.map((item) => (
              <Link
                key={item.slug}
                href={`/${locale}/news/${item.slug}`}
                tabIndex={dup === 1 ? -1 : 0}
                className="display-title flex shrink-0 items-center gap-8 py-3 text-lg text-white transition-opacity hover:opacity-70"
              >
                <MapleLeaf
                  className="h-4 w-4 shrink-0"
                  stroke="none"
                  fill="rgba(255,255,255,0.55)"
                />
                {item[locale].title}
              </Link>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
