import type { MetadataRoute } from "next";
import { getAllNews, getTeams } from "@/lib/content";
import { locales } from "@/lib/locales";

const BASE = "https://handballcanada.ca";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPaths = [
    "",
    "/news",
    "/teams",
    "/competitions",
    "/competitions/national-championships",
    "/competitions/domestic",
    "/how-to-play",
    "/about",
    "/about/board",
    "/members",
    "/registration",
    "/contact",
  ];

  const newsPaths = getAllNews().map((item) => `/news/${item.slug}`);
  const teamPaths = getTeams().map((team) => `/teams/${team.slug}`);

  return [...staticPaths, ...newsPaths, ...teamPaths].flatMap((path) =>
    locales.map((locale) => ({
      url: `${BASE}/${locale}${path}`,
      lastModified: new Date(),
      alternates: {
        languages: Object.fromEntries(
          locales.map((l) => [l, `${BASE}/${l}${path}`])
        ),
      },
    }))
  );
}
