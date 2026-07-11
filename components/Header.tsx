"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import type { Dictionary } from "@/lib/i18n";
import type { Locale } from "@/lib/locales";

type Props = {
  locale: Locale;
  dict: Dictionary;
};

function navItems(locale: Locale, dict: Dictionary) {
  return [
    { href: `/${locale}/news`, label: dict.nav.news },
    { href: `/${locale}/teams`, label: dict.nav.teams },
    { href: `/${locale}/competitions`, label: dict.nav.competitions },
    { href: `/${locale}/how-to-play`, label: dict.nav.howToPlay },
    { href: `/${locale}/about`, label: dict.nav.about },
  ];
}

function switchLocalePath(pathname: string, target: Locale) {
  const stripped = pathname.replace(/^\/(en|fr)(?=\/|$)/, "");
  return `/${target}${stripped}` || `/${target}`;
}

export default function Header({ locale, dict }: Props) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const items = navItems(locale, dict);
  const otherLocale: Locale = locale === "en" ? "fr" : "en";

  // Close the mobile menu on navigation
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-hc-night/90 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-7xl items-center gap-6 px-4 sm:px-6 lg:h-[4.5rem] lg:px-8">
        <Link
          href={`/${locale}`}
          className="flex shrink-0 items-center gap-3"
          aria-label={dict.meta.siteName}
        >
          <Image
            src="/logo.png"
            alt=""
            width={44}
            height={44}
            priority
            className="h-10 w-10 lg:h-11 lg:w-11"
          />
          <span className="display-title text-lg leading-none text-white lg:text-xl">
            Handball
            <span className="block text-hc-red">Canada</span>
          </span>
        </Link>

        <nav className="ml-4 hidden flex-1 items-center gap-1 lg:flex" aria-label="Main">
          {items.map((item) => {
            const active = pathname.startsWith(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`kicker relative px-3 py-2 text-[0.8rem] transition-colors ${
                  active ? "text-white" : "text-hc-mist hover:text-white"
                }`}
              >
                {item.label}
                <span
                  className={`absolute inset-x-3 -bottom-[calc(2.25rem-50%)] hidden h-0.5 lg:block ${
                    active ? "bg-hc-red" : "bg-transparent"
                  }`}
                />
              </Link>
            );
          })}
        </nav>

        <div className="ml-auto hidden items-center gap-3 lg:flex">
          <Link
            href={`/${locale}/members`}
            className="kicker border border-white/25 px-4 py-2.5 text-[0.7rem] text-white transition-colors hover:border-white hover:bg-white hover:text-hc-night"
          >
            {dict.nav.findAClub}
          </Link>
          <Link
            href={`/${locale}/registration`}
            className="kicker bg-hc-red px-4 py-2.5 text-[0.7rem] text-white transition-colors hover:bg-hc-red-dark"
          >
            {dict.nav.register}
          </Link>
          <Link
            href={switchLocalePath(pathname, otherLocale)}
            className="kicker ml-2 border-l border-white/15 py-1 pl-4 text-[0.7rem] text-hc-steel transition-colors hover:text-white"
            lang={otherLocale}
          >
            {otherLocale.toUpperCase()}
          </Link>
        </div>

        <button
          type="button"
          onClick={() => setOpen(!open)}
          className="ml-auto flex h-10 w-10 flex-col items-center justify-center gap-1.5 lg:hidden"
          aria-expanded={open}
          aria-label={open ? dict.nav.close : dict.nav.menu}
        >
          <span
            className={`h-0.5 w-6 bg-white transition-transform ${
              open ? "translate-y-1 rotate-45" : ""
            }`}
          />
          <span className={`h-0.5 w-6 bg-white transition-opacity ${open ? "opacity-0" : ""}`} />
          <span
            className={`h-0.5 w-6 bg-white transition-transform ${
              open ? "-translate-y-3 -rotate-45" : ""
            }`}
          />
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="fixed inset-x-0 top-16 bottom-0 z-40 overflow-y-auto bg-hc-night lg:hidden">
          <nav className="flex flex-col px-6 py-8" aria-label="Mobile">
            {items.map((item, i) => (
              <Link
                key={item.href}
                href={item.href}
                className="display-title border-b border-white/10 py-4 text-3xl text-white"
                style={{ animationDelay: `${i * 40}ms` }}
              >
                {item.label}
              </Link>
            ))}
            <div className="mt-8 flex flex-col gap-3">
              <Link
                href={`/${locale}/registration`}
                className="kicker bg-hc-red px-4 py-4 text-center text-white"
              >
                {dict.nav.register}
              </Link>
              <Link
                href={`/${locale}/members`}
                className="kicker border border-white/25 px-4 py-4 text-center text-white"
              >
                {dict.nav.findAClub}
              </Link>
              <Link
                href={switchLocalePath(pathname, otherLocale)}
                className="kicker mt-4 px-4 py-2 text-center text-hc-steel"
                lang={otherLocale}
              >
                {otherLocale === "fr" ? "Français" : "English"}
              </Link>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
