import type { MetadataRoute } from "next";
import { getAllNews, getTeams } from "@/lib/content";
import { locales } from "@/lib/locales";

const BASE = "https://handballcanada.ca";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPaths = [
    "",
    "/news",
    "/teams",
    "/videos",
    "/competitions",
    "/competitions/fixtures",
    "/competitions/honours",
    "/competitions/national-championships",
    "/competitions/domestic",
    "/how-to-play",
    "/referees",
    "/about",
    "/about/board",
    "/about/policies",
    "/members",
    "/registration",
    "/contact",
  ];

  const newsPaths = getAllNews().map((item) => `/news/${item.slug}`);
  const teams = getTeams();
  const teamPaths = [
    ...teams.map((team) => `/teams/${team.slug}`),
    ...teams.filter((team) => team.squad).map((team) => `/teams/${team.slug}/squad`),
    ...teams.flatMap((team) =>
      (team.squad?.groups ?? []).flatMap((group) =>
        group.players
          .filter((player) => player.name !== null)
          .map((player) => `/teams/${team.slug}/players/${player.number}`)
      )
    ),
  ];

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
