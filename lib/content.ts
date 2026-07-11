import fs from "node:fs";
import path from "node:path";
import type { Locale } from "@/lib/locales";

const contentDir = path.join(process.cwd(), "content");

export type Localized<T = string> = Record<Locale, T>;

export type NewsCategory =
  | "national-teams"
  | "beach"
  | "federation"
  | "competitions"
  | "development";

export type NewsItem = {
  slug: string;
  date: string;
  category: NewsCategory;
  featured?: boolean;
  image?: string;
  todo?: string;
  en: { title: string; excerpt: string; body: string[] };
  fr: { title: string; excerpt: string; body: string[] };
};

export type EventItem = {
  id: string;
  competition: Localized;
  matchup: { home: string; away: string | null };
  dateLabel: Localized;
  venue: Localized;
  note: Localized;
  href: string;
  todo?: string;
};

export type SquadPlayer = {
  number: number;
  /** null renders as a "to be announced" slot */
  name: string | null;
  position: Localized;
  club: string | null;
};

export type SquadGroup = {
  key: string;
  label: Localized;
  players: SquadPlayer[];
};

export type Squad = {
  season: string;
  groups: SquadGroup[];
};

export type TeamItem = {
  slug: string;
  code: string;
  discipline: "indoor" | "beach";
  gender: "men" | "women";
  order: number;
  name: Localized;
  ageGroup: Localized;
  summary: Localized;
  program: Localized<string[]>;
  highlight?: Localized;
  roster: { number: number; name: string; position: string; club: string }[];
  squad?: Squad;
  todo?: string;
};

export type VideoItem = {
  id: string;
  title: Localized;
  duration: string | null;
  url: string;
  todo?: string;
};

function readJson<T>(relativePath: string): T {
  const raw = fs.readFileSync(path.join(contentDir, relativePath), "utf8");
  return JSON.parse(raw) as T;
}

export function getAllNews(): NewsItem[] {
  const dir = path.join(contentDir, "news");
  return fs
    .readdirSync(dir)
    .filter((file) => file.endsWith(".json"))
    .map((file) => readJson<NewsItem>(path.join("news", file)))
    .sort((a, b) => b.date.localeCompare(a.date));
}

export function getNewsItem(slug: string): NewsItem | undefined {
  return getAllNews().find((item) => item.slug === slug);
}

export function getFeaturedNews(): NewsItem {
  const all = getAllNews();
  return all.find((item) => item.featured) ?? all[0];
}

export function getEvents(): EventItem[] {
  return readJson<EventItem[]>("events.json");
}

export function getVideos(): VideoItem[] {
  return readJson<VideoItem[]>("videos.json");
}

export function getTeams(): TeamItem[] {
  const dir = path.join(contentDir, "teams");
  return fs
    .readdirSync(dir)
    .filter((file) => file.endsWith(".json"))
    .map((file) => readJson<TeamItem>(path.join("teams", file)))
    .sort((a, b) => a.order - b.order);
}

export function getTeam(slug: string): TeamItem | undefined {
  return getTeams().find((team) => team.slug === slug);
}

export type PageSection = {
  heading?: Localized;
  paragraphs?: Localized<string[]>;
  list?: Localized<string[]>;
};

export type PageContent = {
  slug: string;
  ghost?: string;
  title: Localized;
  subtitle?: Localized;
  sections: PageSection[];
  cta?: { label: Localized; href: string; external?: boolean };
  todo?: string;
};

export function getPage(slug: string): PageContent {
  return readJson<PageContent>(path.join("pages", `${slug}.json`));
}
