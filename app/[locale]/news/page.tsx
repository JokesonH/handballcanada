import type { Metadata } from "next";
import { notFound } from "next/navigation";
import NewsExplorer from "@/components/NewsExplorer";
import PageHero from "@/components/PageHero";
import { getAllNews } from "@/lib/content";
import { getDictionary, isLocale } from "@/lib/i18n";

export async function generateMetadata({
  params,
}: PageProps<"/[locale]/news">): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const dict = await getDictionary(locale);
  return { title: dict.news.title, description: dict.news.subtitle };
}

export default async function NewsPage({ params }: PageProps<"/[locale]/news">) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const dict = await getDictionary(locale);
  const items = getAllNews();

  return (
    <>
      <PageHero
        kicker={dict.meta.siteName}
        title={dict.news.title}
        subtitle={dict.news.subtitle}
        ghost="News"
      />
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
        <NewsExplorer items={items} locale={locale} dict={dict} />
      </div>
    </>
  );
}
