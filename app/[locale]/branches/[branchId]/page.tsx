import { notFound } from "next/navigation";
import { locales, defaultLocale, branches } from "@/lib/siteConfig";
import type { Locale } from "@/lib/siteConfig";
import { t } from "@/lib/i18n";
import BranchDetail from "@/components/BranchDetail";
import type { Metadata } from "next";
import {
  hreflangAlternates,
  branchJsonLd,
  breadcrumbJsonLd,
  OG_LOCALE,
  SITE_URL,
  SITE_NAME,
} from "@/lib/seo";

export function generateStaticParams() {
  return locales.flatMap((locale) =>
    branches.map((b) => ({ locale, branchId: b.id }))
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; branchId: string }>;
}): Promise<Metadata> {
  const { locale: rawLocale, branchId } = await params;
  const locale: Locale = locales.includes(rawLocale as Locale)
    ? (rawLocale as Locale)
    : defaultLocale;
  const branch = branches.find((b) => b.id === branchId);
  if (!branch) return {};
  const isUz = locale === "uz";
  const name = isUz ? branch.nameUz : branch.nameRu;
  const districtUz = branch.id === "chilonzor" ? "Chilonzor tumani" : "Sergeli tumani";
  const districtRu = branch.id === "chilonzor" ? "Чиланзарский район" : "Сергелийский район";
  const district = isUz ? districtUz : districtRu;

  const title = isUz
    ? `${name} — Fitnes Klub ${districtUz}, Toshkent | ${SITE_NAME}`
    : `${name} — Фитнес-клуб, ${districtRu}, Ташкент | ${SITE_NAME}`;

  const description = isUz
    ? `LandFitness ${name} — ${district} hududidagi zamonaviy fitnes markaz. 24/7 ochiq, professional murabbiylar, yangi sport jihozlari. Telefon: ${branch.phones.join(", ")}. Manzilni Yandex Xaritada ko'rish mumkin.`
    : `LandFitness ${name} — современный фитнес-центр в ${district}е, Ташкент. Открыто 24/7, профессиональные тренеры, новейшее оборудование. Телефон: ${branch.phones.join(", ")}. Адрес доступен в Яндекс Картах.`;

  const keywords = [
    "landfitness",
    name,
    `fitnes ${branch.id === "chilonzor" ? "Chilonzor" : "Sergeli"}`,
    `gym ${branch.id === "chilonzor" ? "Chilonzor" : "Sergeli"}`,
    `sport zal ${branch.id === "chilonzor" ? "Chilonzor" : "Sergeli"}`,
    "24/7 fitnes Toshkent",
    "premium fitnes",
    "shaxsiy murabbiy",
    "abonement",
  ];

  return {
    title,
    description,
    keywords,
    alternates: hreflangAlternates(`/branches/${branch.id}`),
    openGraph: {
      type: "website",
      title,
      description,
      url: `/${locale}/branches/${branch.id}`,
      siteName: SITE_NAME,
      locale: OG_LOCALE[locale],
      alternateLocale: locales.filter((l) => l !== locale).map((l) => OG_LOCALE[l]),
      images: [
        {
          url: branch.bgImage,
          width: 1200,
          height: 630,
          alt: name,
        },
        ...branch.images.slice(0, 4).map((img) => ({ url: img, alt: name })),
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [branch.bgImage],
    },
  };
}

export default async function BranchPage({
  params,
}: {
  params: Promise<{ locale: string; branchId: string }>;
}) {
  const { locale: rawLocale, branchId } = await params;
  const locale: Locale = locales.includes(rawLocale as Locale)
    ? (rawLocale as Locale)
    : defaultLocale;

  const branch = branches.find((b) => b.id === branchId);
  if (!branch) notFound();

  const tr = t(locale);
  const isUz = locale === "uz";
  const name = isUz ? branch.nameUz : branch.nameRu;

  const jsonLd = branchJsonLd(branch.id, locale);
  const breadcrumb = breadcrumbJsonLd([
    { name: SITE_NAME, url: `${SITE_URL}/${locale}` },
    {
      name: isUz ? "Filiallar" : "Филиалы",
      url: `${SITE_URL}/${locale}#branches`,
    },
    { name, url: `${SITE_URL}/${locale}/branches/${branch.id}` },
  ]);

  return (
    <>
      {jsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      )}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }}
      />
      <BranchDetail branch={branch} locale={locale} tr={tr.branches} />
    </>
  );
}
