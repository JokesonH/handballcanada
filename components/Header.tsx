"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import SearchOverlay from "@/components/SearchOverlay";
import type { Dictionary } from "@/lib/i18n";
import type { Locale } from "@/lib/locales";
import type { SearchEntry } from "@/lib/searchIndex";

type NavChild = { href: string; label: string };
type NavItem = { href: string; label: string; children?: NavChild[] };

type Props = {
  locale: Locale;
  dict: Dictionary;
  teamLinks: NavChild[];
  searchEntries: SearchEntry[];
};

function navItems(locale: Locale, dict: Dictionary, teamLinks: NavChild[]): NavItem[] {
  return [
    { href: `/${locale}/news`, label: dict.nav.news },
    {
      href: `/${locale}/teams`,
      label: dict.nav.teams,
      children: [
        { href: `/${locale}/teams`, label: dict.nav.allTeams },
        ...teamLinks,
      ],
    },
    {
      href: `/${locale}/competitions`,
      label: dict.nav.competitions,
      children: [
        { href: `/${locale}/competitions/fixtures`, label: dict.matches.title },
        {
          href: `/${locale}/competitions/national-championships`,
          label: dict.nav.nationalChampionships,
        },
        {
          href: `/${locale}/competitions/domestic`,
          label: dict.nav.domesticCompetitions,
        },
        { href: `/${locale}/competitions/honours`, label: dict.honours.title },
      ],
    },
    { href: `/${locale}/videos`, label: dict.nav.tv },
    {
      href: `/${locale}/how-to-play`,
      label: dict.nav.howToPlay,
      children: [
        { href: `/${locale}/how-to-play`, label: dict.nav.howToPlay },
        { href: `/${locale}/referees`, label: dict.nav.referees },
        { href: `/${locale}/members`, label: dict.nav.findAClub },
      ],
    },
    {
      href: `/${locale}/about`,
      label: dict.nav.about,
      children: [
        { href: `/${locale}/about`, label: dict.nav.about },
        { href: `/${locale}/about/board`, label: dict.nav.board },
        { href: `/${locale}/about/policies`, label: dict.nav.policies },
        { href: `/${locale}/contact`, label: dict.nav.contact },
      ],
    },
  ];
}

function switchLocalePath(pathname: string, target: Locale) {
  const stripped = pathname.replace(/^\/(en|fr)(?=\/|$)/, "");
  return `/${target}${stripped}` || `/${target}`;
}

function SearchIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      className="h-4.5 w-4.5"
      aria-hidden
    >
      <circle cx="11" cy="11" r="7" />
      <line x1="16.5" y1="16.5" x2="21" y2="21" />
    </svg>
  );
}

export default function Header({ locale, dict, teamLinks, searchEntries }: Props) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const items = navItems(locale, dict, teamLinks);
  const otherLocale: Locale = locale === "en" ? "fr" : "en";

  // Close the mobile menu on navigation
  useEffect(() => {
    setOpen(false);
    setSearchOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  // ⌘K / Ctrl+K opens search
  useEffect(() => {
    function onKey(event: KeyboardEvent) {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        setSearchOpen((current) => !current);
      }
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-hc-night/90 backdrop-blur">
      {/* Utility topbar */}
      <div className="hidden border-b border-white/10 bg-hc-night lg:block">
        <div className="mx-auto flex h-9 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <p className="kicker text-[0.6rem] text-hc-steel">{dict.meta.official}</p>
          <div className="flex items-center gap-6">
            <Link
              href={`/${locale}/members`}
              className="kicker text-[0.6rem] text-hc-steel transition-colors hover:text-white"
            >
              {dict.nav.findAClub}
            </Link>
            <Link
              href={`/${locale}/registration`}
              className="kicker text-[0.6rem] text-hc-steel transition-colors hover:text-white"
            >
              {dict.nav.registration}
            </Link>
            <Link
              href={`/${locale}/contact`}
              className="kicker text-[0.6rem] text-hc-steel transition-colors hover:text-white"
            >
              {dict.nav.contact}
            </Link>
            <span className="kicker text-[0.6rem] text-hc-red">
              {dict.footer.founded}
            </span>
          </div>
        </div>
      </div>

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

        <nav className="ml-2 hidden flex-1 items-center xl:flex" aria-label="Main">
          {items.map((item) => {
            const active = pathname.startsWith(item.href);
            return (
              <div key={item.href} className="group relative">
                <Link
                  href={item.href}
                  className={`font-display relative flex items-center gap-1.5 whitespace-nowrap px-2.5 py-2 text-[0.78rem] font-medium uppercase tracking-[0.14em] transition-colors ${
                    active ? "text-white" : "text-hc-mist hover:text-white"
                  }`}
                >
                  {item.label}
                  {item.children && (
                    <span
                      aria-hidden
                      className="text-[0.5rem] text-hc-red transition-transform group-hover:rotate-180"
                    >
                      ▼
                    </span>
                  )}
                  <span
                    className={`absolute inset-x-2.5 bottom-0 h-0.5 ${
                      active ? "bg-hc-red" : "bg-transparent"
                    }`}
                  />
                </Link>

                {item.children && (
                  <div className="invisible absolute left-0 top-full min-w-60 border border-white/10 bg-hc-ink opacity-0 shadow-2xl shadow-black/50 transition-all group-focus-within:visible group-focus-within:opacity-100 group-hover:visible group-hover:opacity-100">
                    <span aria-hidden className="block h-0.5 bg-hc-red" />
                    <ul className="py-2">
                      {item.children.map((child) => (
                        <li key={child.href}>
                          <Link
                            href={child.href}
                            className="block px-5 py-2.5 text-sm text-hc-mist transition-colors hover:bg-hc-night hover:text-white"
                          >
                            {child.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            );
          })}
        </nav>

        <div className="ml-auto hidden items-center gap-3 xl:flex">
          <button
            type="button"
            onClick={() => setSearchOpen(true)}
            aria-label={dict.search.label}
            title={`${dict.search.label} (⌘K)`}
            className="flex h-10 w-10 items-center justify-center border border-white/25 text-white transition-colors hover:border-hc-red hover:bg-hc-red"
          >
            <SearchIcon />
          </button>
          <Link
            href={`/${locale}/registration`}
            className="kicker whitespace-nowrap bg-hc-red px-4 py-2.5 text-[0.7rem] text-white transition-colors hover:bg-hc-red-dark"
          >
            {dict.nav.register}
          </Link>
          <Link
            href={switchLocalePath(pathname, otherLocale)}
            className="kicker ml-1 border-l border-white/15 py-1 pl-3.5 text-[0.7rem] text-hc-steel transition-colors hover:text-white"
            lang={otherLocale}
          >
            {otherLocale.toUpperCase()}
          </Link>
        </div>

        <div className="ml-auto flex items-center gap-2 xl:hidden">
          <button
            type="button"
            onClick={() => setSearchOpen(true)}
            aria-label={dict.search.label}
            className="flex h-10 w-10 items-center justify-center text-white"
          >
            <SearchIcon />
          </button>
          <button
            type="button"
            onClick={() => setOpen(!open)}
            className="flex h-10 w-10 flex-col items-center justify-center gap-1.5"
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
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="fixed inset-x-0 top-16 bottom-0 z-40 overflow-y-auto bg-hc-night lg:top-[6.75rem] xl:hidden">
          <nav className="flex flex-col px-6 py-8" aria-label="Mobile">
            {items.map((item) => (
              <div key={item.href} className="border-b border-white/10">
                <Link
                  href={item.href}
                  className="display-title block py-4 text-3xl text-white"
                >
                  {item.label}
                </Link>
                {item.children && (
                  <div className="flex flex-col gap-1 pb-4 pl-4">
                    {item.children.map((child) => (
                      <Link
                        key={child.href}
                        href={child.href}
                        className="py-1.5 text-sm text-hc-mist"
                      >
                        {child.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
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

      <SearchOverlay
        entries={searchEntries}
        dict={dict}
        open={searchOpen}
        onClose={() => setSearchOpen(false)}
      />
    </header>
  );
}
