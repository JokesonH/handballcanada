import type { Metadata } from "next";
import { Archivo, Oswald } from "next/font/google";
import { notFound } from "next/navigation";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { getTeams } from "@/lib/content";
import { getDictionary, isLocale, locales, type Locale } from "@/lib/i18n";
import { buildSearchIndex } from "@/lib/searchIndex";
import "../globals.css";

const oswald = Oswald({
  subsets: ["latin"],
  variable: "--font-oswald",
  weight: ["400", "500", "600", "700"],
});

const archivo = Archivo({
  subsets: ["latin"],
  variable: "--font-archivo",
});

export const dynamicParams = false;

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: LayoutProps<"/[locale]">): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const dict = await getDictionary(locale);
  return {
    metadataBase: new URL("https://handballcanada.ca"),
    title: {
      default: `${dict.meta.siteName} — ${dict.meta.tagline}`,
      template: `%s | ${dict.meta.siteName}`,
    },
    description: dict.meta.description,
    alternates: {
      languages: { en: "/en", fr: "/fr" },
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: LayoutProps<"/[locale]">) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const dict = await getDictionary(locale as Locale);
  const teamLinks = getTeams().map((team) => ({
    href: `/${locale}/teams/${team.slug}`,
    label: team.name[locale as Locale],
  }));
  const searchEntries = buildSearchIndex(locale as Locale, dict);

  return (
    <html lang={locale} className={`${oswald.variable} ${archivo.variable}`}>
      <body>
        <Header
          locale={locale as Locale}
          dict={dict}
          teamLinks={teamLinks}
          searchEntries={searchEntries}
        />
        <main>{children}</main>
        <Footer locale={locale as Locale} dict={dict} />
      </body>
    </html>
  );
}
