import { getDictionary, isLocale } from "@/lib/i18n";
import { notFound } from "next/navigation";

export default async function HomePage({ params }: PageProps<"/[locale]">) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const dict = await getDictionary(locale);

  return (
    <div className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
      <h1 className="display-title text-6xl text-white">{dict.meta.siteName}</h1>
      <p className="mt-4 text-hc-mist">{dict.meta.tagline}</p>
    </div>
  );
}
