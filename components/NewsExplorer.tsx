"use client";

import { useMemo, useState } from "react";
import NewsCard from "@/components/NewsCard";
import type { NewsCategory, NewsItem } from "@/lib/content";
import type { Dictionary } from "@/lib/i18n";
import type { Locale } from "@/lib/locales";

type Props = {
  items: NewsItem[];
  locale: Locale;
  dict: Dictionary;
};

export default function NewsExplorer({ items, locale, dict }: Props) {
  const [category, setCategory] = useState<NewsCategory | null>(null);

  const categories = useMemo(
    () => [...new Set(items.map((item) => item.category))],
    [items]
  );
  const visible = category
    ? items.filter((item) => item.category === category)
    : items;

  return (
    <div>
      <div className="mb-8 flex flex-wrap gap-2" role="group" aria-label={dict.news.title}>
        <button
          type="button"
          onClick={() => setCategory(null)}
          className={`kicker px-4 py-2.5 text-[0.7rem] transition-colors ${
            category === null
              ? "bg-hc-red text-white"
              : "border border-white/15 text-hc-mist hover:border-white/40 hover:text-white"
          }`}
        >
          {dict.news.allCategories}
        </button>
        {categories.map((c) => (
          <button
            key={c}
            type="button"
            onClick={() => setCategory(c === category ? null : c)}
            className={`kicker px-4 py-2.5 text-[0.7rem] transition-colors ${
              category === c
                ? "bg-hc-red text-white"
                : "border border-white/15 text-hc-mist hover:border-white/40 hover:text-white"
            }`}
          >
            {dict.categories[c]}
          </button>
        ))}
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6">
        {visible.map((item, i) => (
          <NewsCard key={item.slug} item={item} locale={locale} dict={dict} priority={i < 3} />
        ))}
      </div>
    </div>
  );
}
