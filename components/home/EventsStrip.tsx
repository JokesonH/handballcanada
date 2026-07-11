import Link from "next/link";
import SectionHeading from "@/components/SectionHeading";
import type { EventItem } from "@/lib/content";
import type { Dictionary } from "@/lib/i18n";
import type { Locale } from "@/lib/locales";

type Props = {
  events: EventItem[];
  locale: Locale;
  dict: Dictionary;
};

export default function EventsStrip({ events, locale, dict }: Props) {
  return (
    <section className="relative bg-hc-night">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
        <SectionHeading
          kicker={dict.events.upcoming}
          title={dict.home.upcomingEvents}
          href={`/${locale}/competitions`}
          linkLabel={dict.home.allCompetitions}
        />

        <div className="no-scrollbar reveal -mx-4 flex snap-x gap-4 overflow-x-auto px-4 sm:mx-0 sm:px-0 lg:grid lg:grid-cols-3 lg:gap-6">
          {events.map((event) => (
            <Link
              key={event.id}
              href={`/${locale}${event.href}`}
              className="group flex w-[85%] shrink-0 snap-start flex-col border border-white/10 bg-hc-ink p-6 transition-all hover:-translate-y-1 hover:border-hc-red sm:w-[45%] lg:w-auto"
            >
              <p className="kicker min-h-8 text-[0.65rem] text-hc-steel">
                {event.competition[locale]}
              </p>

              <div className="mt-5 flex items-center gap-4">
                <span className="display-title text-4xl text-white">
                  {event.matchup.home}
                </span>
                {event.matchup.away ? (
                  <>
                    <span className="display-title text-lg text-hc-red">VS</span>
                    <span className="display-title text-4xl text-hc-mist">
                      {event.matchup.away}
                    </span>
                  </>
                ) : (
                  <span
                    aria-hidden
                    className="h-1.5 w-14 bg-gradient-to-r from-hc-red to-transparent"
                  />
                )}
              </div>

              <p className="mt-4 text-sm text-hc-mist">{event.note[locale]}</p>

              <div className="mt-6 flex items-center justify-between border-t border-white/10 pt-4">
                <div>
                  <p className="text-xs font-medium text-white">
                    {event.dateLabel[locale]}
                  </p>
                  <p className="mt-0.5 text-xs text-hc-steel">{event.venue[locale]}</p>
                </div>
                <span className="kicker flex items-center gap-1.5 text-[0.65rem] text-hc-steel transition-colors group-hover:text-white">
                  {dict.events.details}
                  <span aria-hidden className="text-hc-red transition-transform group-hover:translate-x-1">
                    →
                  </span>
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
