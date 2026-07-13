import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import CourtLines from "@/components/CourtLines";
import NewsCard from "@/components/NewsCard";
import { getAllNews, getNewsItem } from "@/lib/content";
import { formatDate } from "@/lib/format";
import { getDictionary, isLocale } from "@/lib/i18n";

export function generateStaticParams() {
  return getAllNews().map((item) => ({ slug: item.slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/[locale]/news/[slug]">): Promise<Metadata> {
  const { locale, slug } = await params;
  if (!isLocale(locale)) return {};
  const item = getNewsItem(slug);
  if (!item) return {};
  return { title: item[locale].title, description: item[locale].excerpt };
}

export default async function ArticlePage({
  params,
}: PageProps<"/[locale]/news/[slug]">) {
  const { locale, slug } = await params;
  if (!isLocale(locale)) notFound();
  const item = getNewsItem(slug);
  if (!item) notFound();
  const dict = await getDictionary(locale);
  const text = item[locale];
  const related = getAllNews()
    .filter((other) => other.slug !== item.slug)
    .slice(0, 3);

  return (
    <>
      <header className="grain relative overflow-hidden border-b border-white/10 bg-hc-maple-deep">
        {item.image && (
          <Image
            src={item.image}
            alt=""
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
        )}
        <div
          className={`spotlight absolute inset-0 bg-gradient-to-br ${
            item.image
              ? "from-hc-night/80 via-hc-maple-deep/70 to-hc-night/90"
              : "from-hc-maple/70 via-hc-maple-deep to-hc-night"
          }`}
          aria-hidden
        />
        <CourtLines className="absolute inset-y-0 right-0 h-full w-[55%] opacity-50" />
        <div className="relative mx-auto max-w-4xl px-4 pb-12 pt-20 sm:px-6 lg:px-8 lg:pb-16 lg:pt-28">
          <p className="kicker flex items-center gap-3 text-hc-red-bright">
            <span className="h-px w-10 bg-hc-red" aria-hidden />
            {dict.categories[item.category]}
          </p>
          <h1 className="display-title mt-4 text-3xl text-white sm:text-5xl">
            {text.title}
          </h1>
          <time dateTime={item.date} className="mt-5 block text-sm text-hc-steel">
            {formatDate(item.date, locale)}
          </time>
        </div>
      </header>

      <article className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
        <p className="border-l-2 border-hc-red pl-5 text-lg leading-relaxed text-white">
          {text.excerpt}
        </p>
        <div className="mt-8 space-y-6">
          {text.body.map((paragraph, i) => (
            <p key={i} className="leading-relaxed text-hc-mist">
              {paragraph}
            </p>
          ))}
        </div>
        <Link
          href={`/${locale}/news`}
          className="kicker mt-12 inline-flex items-center gap-2 text-hc-mist transition-colors hover:text-white"
        >
          <span aria-hidden className="text-hc-red">←</span>
          {dict.news.backToNews}
        </Link>
      </article>

      {related.length > 0 && (
        <section className="border-t border-white/10 bg-hc-ink/50">
          <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
            <h2 className="display-title mb-8 text-2xl text-white sm:text-3xl">
              {dict.news.relatedNews}
            </h2>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6">
              {related.map((other) => (
                <NewsCard key={other.slug} item={other} locale={locale} dict={dict} />
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
