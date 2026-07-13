import type { Metadata } from "next";
import { notFound } from "next/navigation";
import PageHero from "@/components/PageHero";
import site from "@/content/site.json";
import { getVideos } from "@/lib/content";
import { getDictionary, isLocale } from "@/lib/i18n";

export async function generateMetadata({
  params,
}: PageProps<"/[locale]/videos">): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const dict = await getDictionary(locale);
  return { title: dict.home.watch, description: dict.home.watchSub };
}

const gradients = [
  "from-hc-maple to-hc-night",
  "from-hc-red-dark to-hc-ink",
  "from-hc-maple-soft to-hc-night",
];

export default async function VideosPage({ params }: PageProps<"/[locale]/videos">) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const dict = await getDictionary(locale);
  const videos = getVideos();

  return (
    <>
      <PageHero
        kicker={dict.meta.siteName}
        title={dict.home.watch}
        subtitle={dict.home.watchSub}
        ghost="HC TV"
      />

      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {videos.map((video, i) =>
            video.youtubeId ? (
              <figure key={video.id}>
                <div className="relative aspect-video overflow-hidden border border-white/10">
                  <iframe
                    src={`https://www.youtube-nocookie.com/embed/${video.youtubeId}`}
                    title={video.title[locale]}
                    allow="accelerometer; encrypted-media; picture-in-picture"
                    allowFullScreen
                    loading="lazy"
                    className="absolute inset-0 h-full w-full"
                  />
                </div>
                <figcaption className="display-title mt-3 text-lg text-white">
                  {video.title[locale]}
                </figcaption>
              </figure>
            ) : (
              <a
                key={video.id}
                href={video.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group"
              >
                <div
                  className={`relative aspect-video overflow-hidden border border-white/10 bg-gradient-to-br ${gradients[i % gradients.length]}`}
                >
                  <span className="ghost-text absolute -bottom-2 left-3 text-6xl">
                    PLAY
                  </span>
                  <span className="absolute inset-0 flex items-center justify-center">
                    <span className="flex h-14 w-14 items-center justify-center rounded-full bg-hc-red text-white transition-transform group-hover:scale-110">
                      <svg
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        className="ml-1 h-6 w-6"
                        aria-hidden
                      >
                        <path d="M8 5.5v13l11-6.5-11-6.5z" />
                      </svg>
                    </span>
                  </span>
                </div>
                <h2 className="display-title mt-3 text-lg text-white transition-colors group-hover:text-hc-red-bright">
                  {video.title[locale]}
                </h2>
              </a>
            )
          )}
        </div>

        <a
          href={site.youtubeUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="kicker mt-12 inline-block bg-hc-red px-7 py-4 text-white transition-colors hover:bg-hc-red-dark"
        >
          {dict.home.moreVideos}
        </a>
      </div>
    </>
  );
}
