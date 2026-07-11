import type { Locale } from "@/lib/locales";

export function formatDate(date: string, locale: Locale): string {
  return new Date(`${date}T12:00:00Z`).toLocaleDateString(
    locale === "fr" ? "fr-CA" : "en-CA",
    { year: "numeric", month: "long", day: "numeric" }
  );
}
