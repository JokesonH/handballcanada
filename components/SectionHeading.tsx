import Link from "next/link";

type Props = {
  title: string;
  href?: string;
  linkLabel?: string;
  kicker?: string;
};

export default function SectionHeading({ title, href, linkLabel, kicker }: Props) {
  return (
    <div className="mb-8 flex items-end justify-between gap-6 lg:mb-10">
      <div>
        {kicker && (
          <p className="kicker mb-2 flex items-center gap-2 text-hc-red">
            <span className="h-px w-8 bg-hc-red" aria-hidden />
            {kicker}
          </p>
        )}
        <h2 className="display-title text-3xl text-white sm:text-4xl lg:text-5xl">
          {title}
        </h2>
      </div>
      {href && linkLabel && (
        <Link
          href={href}
          className="kicker group hidden shrink-0 items-center gap-2 pb-1 text-hc-mist transition-colors hover:text-white sm:flex"
        >
          {linkLabel}
          <span
            aria-hidden
            className="text-hc-red transition-transform group-hover:translate-x-1"
          >
            →
          </span>
        </Link>
      )}
    </div>
  );
}
