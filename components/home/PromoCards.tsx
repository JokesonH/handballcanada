import Link from "next/link";
import SectionHeading from "@/components/SectionHeading";
import type { Dictionary } from "@/lib/i18n";
import type { Locale } from "@/lib/locales";

type Props = {
  locale: Locale;
  dict: Dictionary;
};

export default function PromoCards({ locale, dict }: Props) {
  const cards = [
    {
      href: `/${locale}/how-to-play`,
      label: dict.nav.howToPlay,
      className: "bg-hc-red text-white hover:bg-hc-red-dark",
      arrow: "text-white",
    },
    {
      href: `/${locale}/members`,
      label: dict.nav.findAClub,
      className: "bg-hc-navy text-white hover:bg-hc-navy-soft",
      arrow: "text-hc-red-bright",
    },
    {
      href: `/${locale}/registration`,
      label: dict.nav.register,
      className:
        "border border-white/15 bg-hc-ink text-white hover:border-hc-red",
      arrow: "text-hc-red",
    },
    {
      href: `/${locale}/competitions`,
      label: dict.nav.competitions,
      className:
        "border border-white/15 bg-hc-ink text-white hover:border-hc-red",
      arrow: "text-hc-red",
    },
  ];

  return (
    <section className="bg-hc-night">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
        <SectionHeading kicker="Canada" title={dict.home.getInvolved} />
        <p className="-mt-4 mb-8 max-w-xl text-sm text-hc-mist lg:-mt-6">
          {dict.home.getInvolvedSub}
        </p>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
          {cards.map((card) => (
            <Link
              key={card.href}
              href={card.href}
              className={`group flex min-h-40 flex-col justify-between p-6 transition-all hover:-translate-y-1 ${card.className}`}
            >
              <span className="display-title max-w-40 text-2xl leading-tight">
                {card.label}
              </span>
              <span
                aria-hidden
                className={`self-end text-3xl transition-transform group-hover:translate-x-2 ${card.arrow}`}
              >
                →
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
