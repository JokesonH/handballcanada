import Link from "next/link";
import type { PageContent } from "@/lib/content";
import type { Locale } from "@/lib/locales";

type Props = {
  page: PageContent;
  locale: Locale;
};

/**
 * Renders the body of a long-form content page (sections of headings,
 * paragraphs and lists) plus an optional call-to-action.
 */
export default function PageSections({ page, locale }: Props) {
  return (
    <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
      {page.sections.map((section, i) => (
        <section key={i} className="mb-10 last:mb-0">
          {section.heading && (
            <h2 className="display-title mb-4 text-2xl text-white sm:text-3xl">
              {section.heading[locale]}
            </h2>
          )}
          {section.paragraphs?.[locale].map((paragraph, j) => (
            <p key={j} className="mb-4 leading-relaxed text-hc-mist">
              {paragraph}
            </p>
          ))}
          {section.list && (
            <ul className="mt-2 space-y-2">
              {section.list[locale].map((item, j) => (
                <li key={j} className="flex items-baseline gap-3 text-hc-mist">
                  <span aria-hidden className="h-2 w-2 shrink-0 translate-y-0.5 bg-hc-red" />
                  {item}
                </li>
              ))}
            </ul>
          )}
        </section>
      ))}

      {page.cta &&
        (page.cta.external ? (
          <a
            href={page.cta.href}
            target="_blank"
            rel="noopener noreferrer"
            className="kicker mt-4 inline-block bg-hc-red px-7 py-4 text-white transition-colors hover:bg-hc-red-dark"
          >
            {page.cta.label[locale]}
          </a>
        ) : (
          <Link
            href={`/${locale}${page.cta.href}`}
            className="kicker mt-4 inline-block bg-hc-red px-7 py-4 text-white transition-colors hover:bg-hc-red-dark"
          >
            {page.cta.label[locale]}
          </Link>
        ))}
    </div>
  );
}
