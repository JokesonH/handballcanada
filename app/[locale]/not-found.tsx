import Link from "next/link";
import CourtLines from "@/components/CourtLines";

/**
 * Rendered inside the locale layout. not-found pages receive no params in
 * Next.js, so the copy is intentionally bilingual.
 */
export default function NotFound() {
  return (
    <section className="relative overflow-hidden">
      <CourtLines className="absolute inset-y-0 right-0 h-full w-[60%] opacity-50" />
      <div className="relative mx-auto flex min-h-[60vh] max-w-7xl flex-col items-start justify-center px-4 py-24 sm:px-6 lg:px-8">
        <p className="ghost-text text-8xl leading-none sm:text-9xl">404</p>
        <h1 className="display-title mt-4 text-4xl text-white sm:text-5xl">
          Out of bounds · Hors limites
        </h1>
        <p className="mt-4 max-w-xl text-hc-mist">
          The page you are looking for does not exist or has moved. ·{" "}
          <span lang="fr">
            La page que vous cherchez n&apos;existe pas ou a été déplacée.
          </span>
        </p>
        <div className="mt-8 flex gap-3">
          <Link
            href="/en"
            className="kicker bg-hc-red px-6 py-3.5 text-white transition-colors hover:bg-hc-red-dark"
          >
            Back to home
          </Link>
          <Link
            href="/fr"
            lang="fr"
            className="kicker border border-white/25 px-6 py-3.5 text-white transition-colors hover:border-white"
          >
            Retour à l&apos;accueil
          </Link>
        </div>
      </div>
    </section>
  );
}
