import SectionHeading from "@/components/SectionHeading";
import type { VideoItem } from "@/lib/content";
import type { Dictionary } from "@/lib/i18n";
import type { Locale } from "@/lib/locales";

type Props = {
  videos: VideoItem[];
  locale: Locale;
  dict: Dictionary;
};

const railGradients = [
  "from-hc-maple to-hc-night",
  "from-hc-red-dark to-hc-ink",
  "from-hc-maple-soft to-hc-night",
];

export default function VideoRail({ videos, locale, dict }: Props) {
  return (
    <section className="slant-t grain spotlight relative overflow-hidden bg-hc-ink pt-10">
      <span
        aria-hidden
        className="ghost-text absolute right-0 top-16 text-[14vw] leading-none lg:text-[9rem]"
      >
        HC TV
      </span>
      <div className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
        <SectionHeading
          kicker="TV"
          title={dict.home.watch}
          href={`/${locale}/videos`}
          linkLabel={dict.common.discover}
        />
        <p className="-mt-4 mb-8 max-w-xl text-sm text-hc-mist lg:-mt-6">
          {dict.home.watchSub}
        </p>

        <div className="no-scrollbar -mx-4 flex snap-x gap-4 overflow-x-auto px-4 sm:mx-0 sm:px-0 lg:grid lg:grid-cols-3 lg:gap-6">
          {videos.map((video, i) => (
            <a
              key={video.id}
              href={video.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group w-[80%] shrink-0 snap-start sm:w-[45%] lg:w-auto"
            >
              <div
                className={`relative aspect-video overflow-hidden border border-white/10 bg-gradient-to-br ${railGradients[i % railGradients.length]}`}
              >
                <span className="ghost-text absolute -bottom-2 left-3 text-6xl">
                  PLAY
                </span>
                <span className="absolute inset-0 flex items-center justify-center">
                  <span className="flex h-14 w-14 items-center justify-center rounded-full bg-hc-red text-white transition-transform group-hover:scale-110">
                    <svg viewBox="0 0 24 24" fill="currentColor" className="ml-1 h-6 w-6" aria-hidden>
                      <path d="M8 5.5v13l11-6.5-11-6.5z" />
                    </svg>
                  </span>
                </span>
                {video.duration && (
                  <span className="absolute bottom-2 right-2 bg-hc-night/80 px-2 py-0.5 text-xs text-white">
                    {video.duration}
                  </span>
                )}
              </div>
              <h3 className="display-title mt-3 text-lg text-white transition-colors group-hover:text-hc-red-bright">
                {video.title[locale]}
              </h3>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
