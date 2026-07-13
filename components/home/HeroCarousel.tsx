"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Hero from "@/components/home/Hero";
import type { NewsItem } from "@/lib/content";
import type { Dictionary } from "@/lib/i18n";
import type { Locale } from "@/lib/locales";

const SLIDE_MS = 7000;

type Props = {
  items: NewsItem[];
  locale: Locale;
  dict: Dictionary;
};

export default function HeroCarousel({ items, locale, dict }: Props) {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const goTo = useCallback(
    (next: number) => setIndex(((next % items.length) + items.length) % items.length),
    [items.length]
  );

  useEffect(() => {
    if (paused || items.length < 2) return;
    timer.current = setTimeout(() => goTo(index + 1), SLIDE_MS);
    return () => {
      if (timer.current) clearTimeout(timer.current);
    };
  }, [index, paused, items.length, goTo]);

  if (items.length === 0) return null;
  if (items.length === 1) return <Hero item={items[0]} locale={locale} dict={dict} />;

  return (
    <div
      className="group/carousel relative"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      aria-roledescription="carousel"
    >
      {/* Remount per slide so the staggered entrance replays */}
      <Hero key={items[index].slug} item={items[index]} locale={locale} dict={dict} />

      <div className="absolute bottom-5 right-4 z-10 flex items-center gap-4 sm:right-6 lg:right-8">
        <button
          type="button"
          onClick={() => goTo(index - 1)}
          aria-label={dict.home.previous}
          className="flex h-10 w-10 items-center justify-center border border-white/25 text-white transition-colors hover:border-hc-red hover:bg-hc-red"
        >
          <span aria-hidden>←</span>
        </button>

        <div className="flex items-center gap-2">
          {items.map((item, i) => (
            <button
              key={item.slug}
              type="button"
              onClick={() => goTo(i)}
              aria-label={`${i + 1} / ${items.length}`}
              aria-current={i === index}
              className="relative h-1 w-10 overflow-hidden bg-white/25 sm:w-14"
            >
              {i === index ? (
                <span
                  key={`${item.slug}-fill`}
                  className="absolute inset-y-0 left-0 bg-hc-red"
                  style={{
                    animation: `progress ${SLIDE_MS}ms linear both`,
                    animationPlayState: paused ? "paused" : "running",
                  }}
                />
              ) : (
                i < index && <span className="absolute inset-0 bg-white/50" />
              )}
            </button>
          ))}
        </div>

        <button
          type="button"
          onClick={() => goTo(index + 1)}
          aria-label={dict.home.next}
          className="flex h-10 w-10 items-center justify-center border border-white/25 text-white transition-colors hover:border-hc-red hover:bg-hc-red"
        >
          <span aria-hidden>→</span>
        </button>
      </div>
    </div>
  );
}
