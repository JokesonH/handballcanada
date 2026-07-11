import CourtLines from "@/components/CourtLines";

type Props = {
  kicker?: string;
  title: string;
  subtitle?: string;
  ghost?: string;
};

/**
 * Shared interior-page header: dark navy band with court markings and an
 * oversized display title, echoing the homepage hero.
 */
export default function PageHero({ kicker, title, subtitle, ghost }: Props) {
  return (
    <section className="relative overflow-hidden border-b border-white/10 bg-hc-navy-deep">
      <div
        className="absolute inset-0 bg-gradient-to-br from-hc-navy/70 via-hc-navy-deep to-hc-night"
        aria-hidden
      />
      <CourtLines className="absolute inset-y-0 right-0 h-full w-[55%] opacity-60" />
      {ghost && (
        <span
          aria-hidden
          className="ghost-text absolute -right-2 bottom-0 text-[16vw] leading-none lg:text-[9rem]"
        >
          {ghost}
        </span>
      )}
      <div className="relative mx-auto max-w-7xl px-4 pb-12 pt-20 sm:px-6 lg:px-8 lg:pb-16 lg:pt-28">
        {kicker && (
          <p className="kicker flex items-center gap-3 text-hc-red-bright">
            <span className="h-px w-10 bg-hc-red" aria-hidden />
            {kicker}
          </p>
        )}
        <h1 className="display-title mt-3 max-w-4xl text-4xl text-white sm:text-5xl lg:text-6xl">
          {title}
        </h1>
        {subtitle && (
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-hc-mist">
            {subtitle}
          </p>
        )}
      </div>
    </section>
  );
}
