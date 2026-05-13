import type { Metadata } from "next";
import { locales, defaultLocale } from "@/lib/siteConfig";
import type { Locale } from "@/lib/siteConfig";
import { t } from "@/lib/i18n";
import { branches, pricing, coaches } from "@/lib/siteConfig";
import { hreflangAlternates, localBusinessJsonLd, OG_LOCALE } from "@/lib/seo";
import Hero        from "@/components/Hero";
import Marquee     from "@/components/Marquee";
import WhyUs       from "@/components/WhyUs";
import Branches    from "@/components/Branches";
import Pricing     from "@/components/Pricing";
import HowToJoin   from "@/components/HowToJoin";
import Coaches     from "@/components/Coaches";
import ContactForm from "@/components/ContactForm";

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
    ? "LandFitness — Premium Fitnes Klub Toshkent | Chilonzor & Sergeli 24/7"
    : "LandFitness — Премиум фитнес-клуб в Ташкенте | Чиланзар и Сергели 24/7";

  const description = isUz
    ? "LandFitness — Toshkentdagi zamonaviy premium fitnes markaz. 2 ta filial: Chilonzor va Sergeli. 24/7 ochiq, professional murabbiylar, zamonaviy jihozlar, hamyonbop abonementlar — erkak va ayollar uchun."
    : "LandFitness — современный премиум фитнес-центр в Ташкенте. 2 филиала: Чиланзар и Сергели. Открыто 24/7, профессиональные тренеры, новейшее оборудование, доступные абонементы для мужчин и женщин.";

  return {
    title,
    description,
    alternates: hreflangAlternates("/"),
    openGraph: {
      type: "website",
      title,
      description,
      url: `/${locale}`,
      siteName: "LandFitness",
      locale: OG_LOCALE[locale],
      alternateLocale: locales.filter((l) => l !== locale).map((l) => OG_LOCALE[l]),
      images: [
        {
          url: "/logo.jpg",
          width: 1200,
          height: 630,
          alt: "LandFitness — Toshkent",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: ["/logo.jpg"],
    },
  };
}

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: rawLocale } = await params;
  const locale: Locale = locales.includes(rawLocale as Locale)
    ? (rawLocale as Locale)
    : defaultLocale;
  const tr = t(locale);

  const jsonLd = localBusinessJsonLd(locale);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Hero        locale={locale} hero={tr.hero} />
      <Marquee />
      <WhyUs       tr={tr.whyUs} />
      <Branches    locale={locale} data={branches} tr={tr.branches} />
      <Pricing     locale={locale} data={pricing}  tr={tr.pricing} />
      <HowToJoin   tr={tr.howToJoin} />
      <Coaches     locale={locale} data={coaches}  tr={tr.coaches} />
      <ContactForm locale={locale} tr={tr.contact} />
    </>
  );
}
