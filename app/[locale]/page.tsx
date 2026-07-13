import { notFound } from "next/navigation";
import NewsCard from "@/components/NewsCard";
import SectionHeading from "@/components/SectionHeading";
import Ticker from "@/components/Ticker";
import EventsStrip from "@/components/home/EventsStrip";
import HeroCarousel from "@/components/home/HeroCarousel";
import NextMatchBanner from "@/components/home/NextMatchBanner";
import PromoCards from "@/components/home/PromoCards";
import VideoRail from "@/components/home/VideoRail";
import {
  getAllNews,
  getEvents,
  getFeaturedNews,
  getNextMatch,
  getVideos,
} from "@/lib/content";
import { getDictionary, isLocale } from "@/lib/i18n";

export default async function HomePage({ params }: PageProps<"/[locale]">) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const dict = await getDictionary(locale);

  const featured = getFeaturedNews();
  const all = getAllNews();
  const heroItems = [featured, ...all.filter((i) => i.slug !== featured.slug)].slice(0, 3);
  const news = all.filter((item) => item.slug !== featured.slug).slice(0, 3);
  const events = getEvents();
  const videos = getVideos();
  const nextMatch = getNextMatch();

  return (
    <>
      <HeroCarousel items={heroItems} locale={locale} dict={dict} />
      {nextMatch && (
        <NextMatchBanner match={nextMatch} locale={locale} dict={dict} />
      )}
      <Ticker items={getAllNews()} locale={locale} dict={dict} />
      <EventsStrip events={events} locale={locale} dict={dict} />

      <section className="bg-hc-night">
        <div className="mx-auto max-w-7xl px-4 pb-16 sm:px-6 lg:px-8 lg:pb-20">
          <SectionHeading
            kicker="News"
            title={dict.home.latestNews}
            href={`/${locale}/news`}
            linkLabel={dict.home.allNews}
          />
          <div className="reveal grid gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6">
            {news.map((item) => (
              <NewsCard key={item.slug} item={item} locale={locale} dict={dict} />
            ))}
          </div>
        </div>
      </section>

      <VideoRail videos={videos} locale={locale} dict={dict} />
      <PromoCards locale={locale} dict={dict} />
    </>
  );
}
