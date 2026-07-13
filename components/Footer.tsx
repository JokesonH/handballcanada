import Image from "next/image";
import Link from "next/link";
import NewsletterSignup from "@/components/NewsletterSignup";
import site from "@/content/site.json";
import type { Dictionary } from "@/lib/i18n";
import type { Locale } from "@/lib/locales";

type Props = {
  locale: Locale;
  dict: Dictionary;
};

const socialIcons: Record<string, React.ReactNode> = {
  Facebook: (
    <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5" aria-hidden>
      <path d="M13.5 21v-7h2.4l.4-3h-2.8V9.1c0-.9.2-1.5 1.5-1.5h1.4V4.9c-.3 0-1.2-.1-2.3-.1-2.3 0-3.9 1.4-3.9 4V11H7.8v3h2.4v7h3.3z" />
    </svg>
  ),
  Instagram: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="h-5 w-5" aria-hidden>
      <rect x="3.5" y="3.5" width="17" height="17" rx="4.5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.2" cy="6.8" r="1" fill="currentColor" stroke="none" />
    </svg>
  ),
  YouTube: (
    <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5" aria-hidden>
      <path d="M21.6 7.2a2.5 2.5 0 0 0-1.8-1.8C18.3 5 12 5 12 5s-6.3 0-7.8.4A2.5 2.5 0 0 0 2.4 7.2 26 26 0 0 0 2 12a26 26 0 0 0 .4 4.8 2.5 2.5 0 0 0 1.8 1.8c1.5.4 7.8.4 7.8.4s6.3 0 7.8-.4a2.5 2.5 0 0 0 1.8-1.8A26 26 0 0 0 22 12a26 26 0 0 0-.4-4.8zM10 15.2V8.8L15.6 12 10 15.2z" />
    </svg>
  ),
};

export default function Footer({ locale, dict }: Props) {
  const year = new Date().getFullYear();

  const federationLinks = [
    { href: `/${locale}/about`, label: dict.nav.about },
    { href: `/${locale}/about/board`, label: dict.nav.board },
    { href: `/${locale}/about/policies`, label: dict.nav.policies },
    { href: `/${locale}/news`, label: dict.nav.news },
    { href: `/${locale}/contact`, label: dict.nav.contact },
  ];
  const involvedLinks = [
    { href: `/${locale}/how-to-play`, label: dict.nav.howToPlay },
    { href: `/${locale}/referees`, label: dict.nav.referees },
    { href: `/${locale}/members`, label: dict.nav.findAClub },
    { href: `/${locale}/registration`, label: dict.nav.register },
    { href: `/${locale}/competitions`, label: dict.nav.competitions },
  ];

  return (
    <footer className="relative mt-24 border-t border-white/10 bg-hc-ink">
      {/* Red accent line, PSG-style */}
      <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-hc-red via-hc-red-bright to-hc-maple" />

      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="mb-14">
          <NewsletterSignup dict={dict} />
        </div>

        <div className="grid gap-12 lg:grid-cols-[2fr_1fr_1fr_1.5fr]">
          <div>
            <Link href={`/${locale}`} className="flex items-center gap-4">
              <Image src="/logo.png" alt="" width={64} height={64} className="h-16 w-16" />
              <span className="display-title text-2xl text-white">
                Handball
                <span className="block text-hc-red">Canada</span>
              </span>
            </Link>
            <p className="mt-5 max-w-sm text-sm leading-relaxed text-hc-mist">
              {dict.meta.tagline}. {dict.footer.founded}.
            </p>
            <div className="mt-6 flex items-center gap-3">
              {site.socials.map((social) => (
                <a
                  key={social.name}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.name}
                  className="flex h-10 w-10 items-center justify-center border border-white/15 text-hc-mist transition-colors hover:border-hc-red hover:bg-hc-red hover:text-white"
                >
                  {socialIcons[social.name]}
                </a>
              ))}
            </div>
          </div>

          <nav aria-label={dict.footer.federationLinks}>
            <h2 className="kicker text-hc-steel">{dict.footer.federationLinks}</h2>
            <ul className="mt-5 space-y-3">
              {federationLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-hc-mist transition-colors hover:text-white"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label={dict.footer.getInvolved}>
            <h2 className="kicker text-hc-steel">{dict.footer.getInvolved}</h2>
            <ul className="mt-5 space-y-3">
              {involvedLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-hc-mist transition-colors hover:text-white"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <h2 className="kicker text-hc-steel">{dict.footer.memberFederations}</h2>
            <ul className="mt-5 grid grid-cols-1 gap-2">
              {site.memberFederations.map((federation) => (
                <li key={federation.province} className="flex items-baseline gap-2 text-sm text-hc-mist">
                  <span className="display-title w-7 shrink-0 text-xs text-hc-red">
                    {federation.province}
                  </span>
                  {federation[locale]}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-14 border-t border-white/10 pt-8">
          <h2 className="kicker text-hc-steel">{dict.footer.partners}</h2>
          <div className="mt-4 flex flex-wrap gap-x-8 gap-y-3">
            {site.partners.map((partner) => (
              <a
                key={partner.name}
                href={partner.url}
                target="_blank"
                rel="noopener noreferrer"
                className="display-title text-base text-hc-mist/70 transition-colors hover:text-white"
              >
                {partner.name}
              </a>
            ))}
          </div>
        </div>

        <p className="mt-10 text-xs text-hc-steel">
          © {year} {dict.footer.legal}
        </p>
      </div>
    </footer>
  );
}
