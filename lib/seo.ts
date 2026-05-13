import type { Metadata } from "next";
import type { Locale } from "./siteConfig";
import { branches, coaches, social } from "./siteConfig";

export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ||
  "https://landfitness.uz";

export const SITE_NAME = "LandFitness";

export const OG_LOCALE: Record<Locale, string> = {
  uz: "uz_UZ",
  ru: "ru_RU",
};

export function hreflangAlternates(path: string): Metadata["alternates"] {
  const clean = path.startsWith("/") ? path : `/${path}`;
  return {
    canonical: `/uz${clean === "/" ? "" : clean}`,
    languages: {
      "uz-UZ": `/uz${clean === "/" ? "" : clean}`,
      "ru-RU": `/ru${clean === "/" ? "" : clean}`,
      "x-default": `/uz${clean === "/" ? "" : clean}`,
    },
  };
}

/* ─── JSON-LD builders ─────────────────────────────────────── */

export function localBusinessJsonLd(locale: Locale) {
  const isUz = locale === "uz";
  return {
    "@context": "https://schema.org",
    "@type": ["LocalBusiness", "HealthClub", "SportsActivityLocation"],
    "@id": `${SITE_URL}/#organization`,
    name: SITE_NAME,
    alternateName: isUz ? "Land Fitness Toshkent" : "Лэнд Фитнес Ташкент",
    url: SITE_URL,
    logo: `${SITE_URL}/logo.jpg`,
    image: [`${SITE_URL}/logo.jpg`],
    description: isUz
      ? "LandFitness — Toshkentdagi zamonaviy premium fitnes markaz. 2 ta filial: Chilonzor va Sergeli. 24/7 ochiq."
      : "LandFitness — современный премиум фитнес-центр в Ташкенте. 2 филиала: Чиланзар и Сергели. Открыто 24/7.",
    priceRange: "70 000 – 4 200 000 UZS",
    currenciesAccepted: "UZS",
    paymentAccepted: isUz
      ? "Naqd pul, Bank kartasi, Payme, Click"
      : "Наличные, Банковская карта, Payme, Click",
    openingHours: "Mo-Su 00:00-23:59",
    sameAs: [social.instagram],
    address: {
      "@type": "PostalAddress",
      addressCountry: "UZ",
      addressLocality: isUz ? "Toshkent" : "Ташкент",
      addressRegion: isUz ? "Toshkent shahri" : "город Ташкент",
    },
    areaServed: {
      "@type": "City",
      name: isUz ? "Toshkent" : "Ташкент",
    },
    location: branches.map((b) => ({
      "@type": "SportsActivityLocation",
      "@id": `${SITE_URL}/${locale}/branches/${b.id}#location`,
      name: isUz ? b.nameUz : b.nameRu,
      telephone: b.phones,
      openingHours: "Mo-Su 00:00-23:59",
      hasMap: b.mapUrl,
      image: `${SITE_URL}${b.bgImage}`,
      url: `${SITE_URL}/${locale}/branches/${b.id}`,
    })),
    employee: coaches.map((c) => ({
      "@type": "Person",
      name: isUz ? c.nameUz : c.nameRu,
      image: `${SITE_URL}${c.image}`,
      jobTitle: isUz ? "Fitnes murabbiyi" : "Фитнес тренер",
      worksFor: { "@id": `${SITE_URL}/#organization` },
    })),
  };
}

export function breadcrumbJsonLd(
  items: { name: string; url: string }[]
) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((it, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: it.name,
      item: it.url.startsWith("http") ? it.url : `${SITE_URL}${it.url}`,
    })),
  };
}

export function branchJsonLd(
  branchId: string,
  locale: Locale
) {
  const b = branches.find((x) => x.id === branchId);
  if (!b) return null;
  const isUz = locale === "uz";
  const name = isUz ? b.nameUz : b.nameRu;
  return {
    "@context": "https://schema.org",
    "@type": ["HealthClub", "SportsActivityLocation", "LocalBusiness"],
    "@id": `${SITE_URL}/${locale}/branches/${b.id}#location`,
    name: `${SITE_NAME} — ${name}`,
    url: `${SITE_URL}/${locale}/branches/${b.id}`,
    image: [
      `${SITE_URL}${b.bgImage}`,
      ...b.images.slice(0, 6).map((img) => `${SITE_URL}${img}`),
    ],
    telephone: b.phones,
    openingHours: "Mo-Su 00:00-23:59",
    hasMap: b.mapUrl,
    priceRange: "70 000 – 4 200 000 UZS",
    currenciesAccepted: "UZS",
    address: {
      "@type": "PostalAddress",
      addressCountry: "UZ",
      addressLocality: isUz ? "Toshkent" : "Ташкент",
      addressRegion: b.id === "chilonzor"
        ? (isUz ? "Chilonzor tumani" : "Чиланзарский район")
        : (isUz ? "Sergeli tumani" : "Сергелийский район"),
    },
    parentOrganization: { "@id": `${SITE_URL}/#organization` },
  };
}

export function coachListJsonLd(locale: Locale) {
  const isUz = locale === "uz";
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: isUz ? "LandFitness murabbiylari" : "Тренеры LandFitness",
    itemListElement: coaches.map((c, i) => ({
      "@type": "ListItem",
      position: i + 1,
      item: {
        "@type": "Person",
        name: isUz ? c.nameUz : c.nameRu,
        image: `${SITE_URL}${c.image}`,
        jobTitle: isUz ? "Fitnes murabbiyi" : "Фитнес тренер",
        worksFor: {
          "@type": "HealthClub",
          name: SITE_NAME,
          "@id": `${SITE_URL}/#organization`,
        },
        workLocation: {
          "@type": "Place",
          name: isUz ? c.branchUz : c.branchRu,
        },
      },
    })),
  };
}
