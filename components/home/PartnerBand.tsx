import Image from "next/image";
import site from "@/content/site.json";
import type { Dictionary } from "@/lib/i18n";

type Partner = {
  name: string;
  url: string;
  /** Optional path under /public, e.g. /images/partners/sport-canada.svg */
  logo?: string;
};

type Props = {
  dict: Dictionary;
};

/** PSG-style partner strip shown on the homepage above the footer. */
export default function PartnerBand({ dict }: Props) {
  const partners = site.partners as Partner[];

  return (
    <section className="border-t border-white/10 bg-hc-night">
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <p className="kicker mb-6 text-center text-[0.6rem] text-hc-steel">
          {dict.footer.partners}
        </p>
        <div className="flex flex-wrap items-center justify-center gap-x-12 gap-y-6">
          {partners.map((partner) => (
            <a
              key={partner.name}
              href={partner.url}
              target="_blank"
              rel="noopener noreferrer"
              className="opacity-60 transition-opacity hover:opacity-100"
            >
              {partner.logo ? (
                <Image
                  src={partner.logo}
                  alt={partner.name}
                  width={140}
                  height={48}
                  className="h-10 w-auto object-contain"
                />
              ) : (
                <span className="display-title text-lg text-hc-ice">
                  {partner.name}
                </span>
              )}
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
