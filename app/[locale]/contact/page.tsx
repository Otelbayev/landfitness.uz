import type { Metadata } from "next";
import { locales, defaultLocale, branches } from "@/lib/siteConfig";
import type { Locale } from "@/lib/siteConfig";
import { t } from "@/lib/i18n";
import {
  hreflangAlternates,
  breadcrumbJsonLd,
  OG_LOCALE,
  SITE_URL,
  SITE_NAME,
} from "@/lib/seo";
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
    ? "Aloqa — LandFitness Toshkent | Chilonzor & Sergeli telefon, manzil"
    : "Контакты — LandFitness Ташкент | Чиланзар и Сергели телефон, адрес";

  const description = isUz
    ? "LandFitness bilan bog'laning: telefon raqamlari, ikkala filial (Chilonzor & Sergeli) manzili, ish vaqti 24/7. Onlayn ro'yxatdan o'tish formasi."
    : "Свяжитесь с LandFitness: телефоны, адреса двух филиалов (Чиланзар и Сергели), часы работы 24/7. Онлайн-форма записи.";

  return {
    title,
    description,
    alternates: hreflangAlternates("/contact"),
    openGraph: {
      type: "website",
      title,
      description,
      url: `/${locale}/contact`,
      siteName: SITE_NAME,
      locale: OG_LOCALE[locale],
      images: [{ url: "/logo.jpg", alt: SITE_NAME }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: ["/logo.jpg"],
    },
  };
}

export default async function ContactPage({
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

  const contactPointsLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${SITE_URL}/#organization`,
    name: SITE_NAME,
    url: SITE_URL,
    contactPoint: branches.flatMap((b) =>
      b.phones.map((phone) => ({
        "@type": "ContactPoint",
        telephone: phone,
        contactType: "customer service",
        areaServed: "UZ",
        availableLanguage: ["uz", "ru"],
        contactOption: "TollFree",
        hoursAvailable: "Mo-Su 00:00-23:59",
      }))
    ),
  };

  const breadcrumb = breadcrumbJsonLd([
    { name: SITE_NAME, url: `${SITE_URL}/${locale}` },
    {
      name: isUz ? "Aloqa" : "Контакты",
      url: `${SITE_URL}/${locale}/contact`,
    },
  ]);

  return (
    <div className="pt-16">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(contactPointsLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }}
      />

      {/* Page hero */}
      <div
        className="py-16 sm:py-20 px-5 sm:px-8"
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
            {tr.contact.titleAccent}
          </h1>
          <p className="text-base max-w-lg" style={{ color: "var(--fg-muted)" }}>{tr.contact.subtitle}</p>
        </div>
      </div>

      <ContactForm locale={locale} tr={tr.contact} />
    </div>
  );
}
