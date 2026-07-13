import { getAllNews, getPage, getTeams } from "@/lib/content";
import type { Dictionary } from "@/lib/i18n";
import type { Locale } from "@/lib/locales";

export type SearchEntry = {
  group: "news" | "teams" | "pages";
  title: string;
  hint: string;
  href: string;
};

/** Static index assembled at build time and shipped to the search overlay. */
export function buildSearchIndex(locale: Locale, dict: Dictionary): SearchEntry[] {
  const news: SearchEntry[] = getAllNews().map((item) => ({
    group: "news",
    title: item[locale].title,
    hint: dict.categories[item.category],
    href: `/${locale}/news/${item.slug}`,
  }));

  const teams: SearchEntry[] = getTeams().map((team) => ({
    group: "teams",
    title: team.name[locale],
    hint: team.ageGroup[locale],
    href: `/${locale}/teams/${team.slug}`,
  }));

  const contentPages: { slug: string; path: string }[] = [
    { slug: "how-to-play", path: "/how-to-play" },
    { slug: "about", path: "/about" },
    { slug: "board", path: "/about/board" },
    { slug: "members", path: "/members" },
    { slug: "registration", path: "/registration" },
    { slug: "contact", path: "/contact" },
    { slug: "national-championships", path: "/competitions/national-championships" },
    { slug: "domestic-competitions", path: "/competitions/domestic" },
    { slug: "referees", path: "/referees" },
    { slug: "policies", path: "/about/policies" },
  ];

  const pages: SearchEntry[] = [
    ...contentPages.map((page) => ({
      group: "pages" as const,
      title: getPage(page.slug).title[locale],
      hint: dict.meta.siteName,
      href: `/${locale}${page.path}`,
    })),
    {
      group: "pages",
      title: dict.matches.title,
      hint: dict.competitions.title,
      href: `/${locale}/competitions/fixtures`,
    },
    {
      group: "pages",
      title: dict.honours.title,
      hint: dict.competitions.title,
      href: `/${locale}/competitions/honours`,
    },
    {
      group: "pages",
      title: dict.home.watch,
      hint: dict.meta.siteName,
      href: `/${locale}/videos`,
    },
    {
      group: "pages",
      title: dict.news.title,
      hint: dict.meta.siteName,
      href: `/${locale}/news`,
    },
    {
      group: "pages",
      title: dict.teams.title,
      hint: dict.meta.siteName,
      href: `/${locale}/teams`,
    },
  ];

  return [...news, ...teams, ...pages];
}
