import type { Metadata } from "next";
import { locales, defaultLocale, coaches } from "@/lib/siteConfig";
import type { Locale } from "@/lib/siteConfig";
import { t } from "@/lib/i18n";
import {
  hreflangAlternates,
  coachListJsonLd,
  breadcrumbJsonLd,
  OG_LOCALE,
  SITE_URL,
} from "@/lib/seo";
import Coaches from "@/components/Coaches";

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale: rawLocale } = await params;
  const locale: Locale = locales.includes(rawLocale as Locale)
    ? (rawLocale as Locale)
    : defaultLocale;
  const isUz = locale === "uz";

  const title = isUz
    ? "Murabbiylar — Professional fitnes trenerlar | LandFitness Toshkent"
    : "Тренеры — Профессиональные фитнес-тренеры | LandFitness Ташкент";

  const description = isUz
    ? "LandFitness murabbiylari — sertifikatlangan va tajribali fitnes trenerlar. Chilonzor va Sergeli filiallarida individual va guruh mashg'ulotlari. Ish kunlari va ish jadvallarini ko'ring."
    : "Тренеры LandFitness — сертифицированные и опытные фитнес-тренеры. Индивидуальные и групповые тренировки в филиалах Чиланзар и Сергели. Смотрите расписание и рабочие дни.";

  return {
    title,
    description,
    keywords: [
      isUz ? "fitnes murabbiy" : "фитнес тренер",
      isUz ? "shaxsiy murabbiy Toshkent" : "персональный тренер Ташкент",
      isUz ? "trener Chilonzor" : "тренер Чиланзар",
      isUz ? "trener Sergeli" : "тренер Сергели",
      "landfitness",
    ],
    alternates: hreflangAlternates("/coaches"),
    openGraph: {
      type: "website",
      title,
      description,
      url: `/${locale}/coaches`,
      siteName: "LandFitness",
      locale: OG_LOCALE[locale],
      images: coaches.slice(0, 4).map((c) => ({
        url: c.image,
        alt: isUz ? c.nameUz : c.nameRu,
      })),
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [coaches[0]?.image ?? "/logo.jpg"],
    },
  };
}

export default async function CoachesPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: rawLocale } = await params;
  const locale: Locale = locales.includes(rawLocale as Locale)
    ? (rawLocale as Locale)
    : defaultLocale;
  const tr = t(locale);
  const isUz = locale === "uz";

  const itemList = coachListJsonLd(locale);
  const breadcrumb = breadcrumbJsonLd([
    { name: "LandFitness", url: `${SITE_URL}/${locale}` },
    {
      name: isUz ? "Murabbiylar" : "Тренеры",
      url: `${SITE_URL}/${locale}/coaches`,
    },
  ]);

  return (
    <div className="pt-16">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemList) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }}
      />

      {/* Page hero */}
      <div
        className="section-pad px-5 sm:px-8"
        style={{
          background: "linear-gradient(135deg, var(--bg-2) 0%, var(--bg) 100%)",
          borderBottom: "1px solid var(--border)",
        }}
      >
        <div className="max-w-6xl mx-auto">
          <p className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: "var(--gold)" }}>
            LandFitness
          </p>
          <h1 className="text-5xl sm:text-6xl font-black mb-3" style={{ color: "var(--fg)" }}>
            {tr.coaches.titleAccent}
          </h1>
          <p className="text-base" style={{ color: "var(--fg-muted)" }}>{tr.coaches.subtitle}</p>
        </div>
      </div>

      {/* Coaches grid — reuse the same component but without section padding */}
      <Coaches locale={locale} data={coaches} tr={tr.coaches} />
    </div>
  );
}
