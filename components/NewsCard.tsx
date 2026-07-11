import Image from "next/image";
import Link from "next/link";
import { categoryStyles } from "@/lib/categories";
import type { NewsItem } from "@/lib/content";
import { formatDate } from "@/lib/format";
import type { Dictionary } from "@/lib/i18n";
import type { Locale } from "@/lib/locales";

type Props = {
  item: NewsItem;
  locale: Locale;
  dict: Dictionary;
  priority?: boolean;
};

export default function NewsCard({ item, locale, dict, priority }: Props) {
  const style = categoryStyles[item.category];
  const text = item[locale];

  return (
    <article className="group relative flex flex-col overflow-hidden border border-white/10 bg-hc-ink transition-colors hover:border-white/25">
      <div className="relative aspect-[16/10] overflow-hidden">
        {item.image ? (
          <Image
            src={item.image}
            alt=""
            fill
            priority={priority}
            sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div
            className={`absolute inset-0 bg-gradient-to-br ${style.gradient} transition-transform duration-500 group-hover:scale-105`}
          >
            <span className="ghost-text absolute -right-2 bottom-0 text-[5.5rem] leading-none">
              {style.watermark}
            </span>
            <span className="absolute left-4 top-4 h-10 w-1 bg-hc-red" aria-hidden />
          </div>
        )}
        <span className="kicker absolute bottom-0 left-0 bg-hc-red px-3 py-1.5 text-[0.65rem] text-white">
          {dict.categories[item.category]}
        </span>
      </div>

      <div className="flex flex-1 flex-col p-5">
        <time dateTime={item.date} className="text-xs text-hc-steel">
          {formatDate(item.date, locale)}
        </time>
        <h3 className="display-title mt-2 text-xl text-white transition-colors group-hover:text-hc-red-bright">
          <Link href={`/${locale}/news/${item.slug}`} className="after:absolute after:inset-0">
            {text.title}
          </Link>
        </h3>
        <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-hc-mist">
          {text.excerpt}
        </p>
        <span className="kicker mt-auto flex items-center gap-2 pt-4 text-[0.65rem] text-hc-steel transition-colors group-hover:text-white">
          {dict.news.readMore}
          <span aria-hidden className="text-hc-red transition-transform group-hover:translate-x-1">
            →
          </span>
        </span>
      </div>
    </article>
  );
}
